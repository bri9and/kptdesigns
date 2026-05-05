# Clerk Dev → Production Migration Runbook

**Date:** 2026-05-05  
**Scope:** Switch kptdesigns Vercel project from Clerk Development instance (`pk_test_*` / `sk_test_*`) to a new Production instance (`pk_live_*` / `sk_live_*`).  
**Who performs:** Sebastian (manual dashboard clicks + env var swap).

---

## 1. Impact Audit

### Env vars referenced in codebase

No source file hardcodes `CLERK_` env var names directly — Clerk's SDK reads them automatically via convention. The two vars that must be swapped in Vercel are:

| Vercel env var name | Current value pattern | Required prod pattern |
|---|---|---|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | `pk_test_*` | `pk_live_*` |
| `CLERK_SECRET_KEY` | `sk_test_*` | `sk_live_*` |

No other `CLERK_*` vars exist in the project.

### Files importing from `@clerk/nextjs`

**Client-side (`@clerk/nextjs`)** — 14 files:
- `src/app/layout.tsx` — `ClerkProvider` wraps the entire app
- `src/app/sign-in/[[...sign-in]]/page.tsx` — `useSignIn`
- `src/app/sign-in/sso-callback/page.tsx` — `AuthenticateWithRedirectCallback`
- `src/app/sign-up/[[...sign-up]]/page.tsx` — `useSignUp`, `useAuth`
- `src/app/sign-up/sso-callback/page.tsx` — `AuthenticateWithRedirectCallback`
- `src/app/complete-profile/page.tsx` — `useUser`
- `src/app/dashboard/layout.tsx` — `useUser`
- `src/app/dashboard/page.tsx` — `useUser`
- `src/app/dashboard/account/page.tsx` — `useUser`, `useClerk`
- `src/app/domains/page.tsx` — `useAuth`, `useUser`
- `src/app/domains/success/page.tsx` — `useAuth`
- `src/app/pricing/page.tsx` — `useAuth`
- `src/components/header.tsx` — `useAuth`
- `src/components/user-menu.tsx` — `useUser`, `useClerk`
- `src/components/earthy/nav.tsx` — `useAuth`
- `src/lib/useSupabase.ts` — `useSession` (Clerk session token passed to Supabase)

**Server-side (`@clerk/nextjs/server`)** — 12 files:
- `src/middleware.ts` — `clerkMiddleware`, `createRouteMatcher`
- `src/lib/auth/admin.ts` — `currentUser` + `User` type; admin check reads `publicMetadata.role === "admin"`
- `src/app/api/admin/start/route.ts` — `currentUser` → `isAdmin` check → 403 if not admin
- `src/app/api/admin/uploads/route.ts` — `currentUser` → `isAdmin` check
- `src/app/api/ai/commit/route.ts` — `auth`
- `src/app/api/ai/draft/[id]/route.ts` — `auth`
- `src/app/api/ai/generate/route.ts` — `auth`
- `src/app/api/ai/preview/[id]/route.ts` — `auth`
- `src/app/api/domains/checkout/route.ts` — `auth`
- `src/app/api/domains/session/route.ts` — `auth`
- `src/app/api/hosting/checkout/route.ts` — `auth`
- `src/app/api/hosting/manage/route.ts` — `auth`
- `src/app/api/provision/route.ts` — `auth`
- `src/app/api/provision/vercel/route.ts` — `auth`
- `src/app/api/provision/github/route.ts` — `auth`
- `src/app/api/provision/dns/route.ts` — `auth`

### Middleware behavior

`src/middleware.ts` uses `clerkMiddleware` with an explicit public-routes allowlist. All routes NOT in that list call `auth.protect()`, which under dev keys produces a `dev-browser-missing` redirect instead of a clean 307 to `/sign-in`. Under prod keys, `auth.protect()` will correctly 307 to `/sign-in`.

Protected routes include: `/admin`, `/dashboard`, `/api/admin/*`, `/api/ai/*`, `/api/provision/*`, `/api/hosting/checkout`, `/api/hosting/manage`, `/api/domains/checkout`.

### Dev-keyed assumptions

- No hardcoded `pk_test_*` or `sk_test_*` strings found in source.
- `src/app/layout.tsx` has `ClerkProvider` with a custom dark-theme `appearance` object — this is instance-agnostic and will work unchanged with prod keys.
- `metadataBase` in `layout.tsx` is `kptdesigns.vercel.app` (stale) — not Clerk-related but should eventually be updated to `kptdesigns.com`.

---

## 2. Pre-Migration Prep (dashboard clicks)

Estimated time: 20–30 minutes.

1. **Go to** [dashboard.clerk.com](https://dashboard.clerk.com) and sign in.
2. **Select the KPT Designs app** from the application list (top-left switcher).
3. **Create the Production instance:**
   - Click the instance switcher (shows "Development") in the top navigation bar.
   - Select **"Create instance"** → choose **"Production"**.
   - Name it (e.g. "KPT Designs Production") → click **Create**.
4. **Configure the production domain:**
   - In the new production instance, go to **Settings → Domains**.
   - Set primary domain to `kptdesigns.com`.
   - Add `www.kptdesigns.com` as an alternate (optional but recommended).
   - Clerk will provide DNS records (CNAME) to add at your DNS provider (Porkbun). Add them before going live.
5. **Copy the production API keys:**
   - Go to **Configure → API Keys** (left sidebar).
   - Copy `Publishable key` (starts `pk_live_`) and `Secret key` (starts `sk_live_`) to a secure location (1Password, etc.).
6. **Configure Google OAuth for the production instance:**
   - Go to **Configure → SSO connections → Google**.
   - Option A (quickest): copy the Client ID and Client Secret from the dev instance's Google OAuth config.
   - Option B (clean): go to [console.cloud.google.com](https://console.cloud.google.com), open the OAuth 2.0 client for KPT Designs, and add the prod Clerk redirect URI shown in the dashboard (format: `https://clerk.kptdesigns.com/v1/oauth_callback`). Copy the same Client ID/Secret into the prod Clerk instance.
7. **Note:** The production user database starts empty. Sebastian must sign in at least once on the prod instance before the admin role can be set (see Section 2 of post-migration checklist).

---

## 3. Vercel Env Var Swap

**Option A — Vercel Dashboard (manual, safer):**
1. Go to [vercel.com](https://vercel.com) → KPT Designs project → **Settings → Environment Variables**.
2. Find `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` → click **Edit** → replace `pk_test_*` value with `pk_live_*` for **Production** environment only.
3. Find `CLERK_SECRET_KEY` → click **Edit** → replace `sk_test_*` value with `sk_live_*` for **Production** environment only.
4. Trigger a new production deployment (push any commit, or click **Redeploy** on the latest production deployment).

**Option B — Vercel CLI (delegate to me):**
```bash
vercel env rm NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production --yes
vercel env rm CLERK_SECRET_KEY production --yes
echo "<pk_live_value>" | vercel env add NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY production
echo "<sk_live_value>" | vercel env add CLERK_SECRET_KEY production
vercel deploy --prod --yes
```

---

## 4. Post-Migration Verification

Run these checks after the new production deployment is live.

**4a. Middleware redirect check (unauthenticated):**
```bash
curl -sI https://kptdesigns.com/admin
```
Expected: `HTTP/2 307` (or 302) with `Location: https://kptdesigns.com/sign-in?redirect_url=%2Fadmin`.  
Previous behavior under dev keys: `404` with `dev-browser-missing` diagnostic header.

**4b. Admin API protection check (unsigned request):**
```bash
curl -s -X POST https://kptdesigns.com/api/admin/start \
  -H "Content-Type: application/json" \
  -d '{"url":"https://example.com"}'
```
Expected: `HTTP 403` `{"error":"Forbidden"}`.  
Previous behavior under dev keys: Clerk dev-mode 404 rewrite (never reached the route handler).

**4c. Manual sign-in + admin role grant:**
1. Open `https://kptdesigns.com/sign-in` in an incognito window.
2. Sign in with `sebastian.kiely@gmail.com` via Google OAuth.
3. After successful sign-in, go to Clerk Dashboard → Production instance → **Users** → find `sebastian.kiely@gmail.com`.
4. Click the user → **Metadata** tab → **Public** → paste `{"role":"admin"}` → **Save**.
5. Return to browser → navigate to `https://kptdesigns.com/admin`.
6. Verify the admin form renders and the email shown is `sebastian.kiely@gmail.com`.

---

## 5. Rollback Plan

All steps are reversible:
1. **Vercel env vars:** Go to Vercel → Project → Settings → Environment Variables → edit `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` back to the `pk_test_*` / `sk_test_*` values → redeploy.
2. Vercel keeps a full history of env var changes — click the var name to see previous values.
3. The dev Clerk instance is untouched throughout; no data is lost there.

---

## 6. Known Risks

| Risk | Mitigation |
|---|---|
| Dev-instance user records (test sign-ups) do not migrate to prod instance | Expected and acceptable. No customer data was collected on dev. |
| Google OAuth callback URL must be updated to the prod Clerk redirect URI | See step 6 of Pre-Migration Prep. Failing this breaks all Google sign-ins. |
| `_clerk_db_jwt` cookie is scoped to dev domain — may cause auth loops in the browser session | Clear all site cookies at `kptdesigns.com` before testing prod sign-in. |
| Clerk DNS CNAME records must propagate before prod instance is fully active | Check propagation with `dig CNAME clerk.kptdesigns.com` — wait for TTL. |
| Admin role must be manually re-granted on prod instance after first sign-in | Documented in Section 4c above. |

---

## 7. Decision Needed Before Starting

**Are any dev-instance users important to preserve?**

- **No (expected answer):** Proceed freely. The dev instance was only used for internal testing.
- **Yes:** Use the [Clerk User Export API](https://clerk.com/docs/reference/backend-api/tag/Users#operation/GetUserList) to pull user records before migrating. Note: passwords cannot be exported; only metadata and profile fields. Users will need to reset passwords or re-authenticate via OAuth on the prod instance.

No action needed if the answer is "No."
