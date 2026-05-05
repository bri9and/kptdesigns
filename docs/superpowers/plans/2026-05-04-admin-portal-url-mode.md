# Admin Portal — URL Mode (Plan 1 of 2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Sebastian (and any future Clerk user with `publicMetadata.role === "admin"`) can navigate to `/admin`, paste a URL, and trigger the existing scrape→build pipeline. On success, they land on `/preview/<jobId>`.

**Architecture:** Server component at `/admin/page.tsx` calls a `requireAdmin()` helper that redirects non-admins. Client form posts to the existing public `POST /api/start` route — no API change. The role gate is page-level only; `/api/start` stays open (matches the existing public spike flow). Mode B (no-URL: uploads + social + Google) is Plan 2 and reuses this scaffold.

**Tech Stack:**
- Next.js 16.1.6 App Router (server + client components)
- Clerk v7 (`@clerk/nextjs`) — `currentUser()` + `publicMetadata.role`
- Existing shadcn components: `Input`, `Textarea`, `Button`, `Label`
- TypeScript strict; verification via `eslint` + `tsc --noEmit` + browser check (no test runner in main branch)

---

## File Structure

| Path | Responsibility |
|---|---|
| `src/lib/auth/admin.ts` (create) | `requireAdmin()` server helper — redirects unauthenticated users to `/sign-in` and non-admins to `/`. Also exports `isAdmin(user)` for boolean checks. |
| `src/app/admin/page.tsx` (create) | Server component. Calls `requireAdmin()`, renders heading + email + the client form. |
| `src/app/admin/_components/AdminBuildForm.tsx` (create) | Client component. URL + business name + notes inputs, POSTs to `/api/start`, redirects to `/preview/<id>`. |
| `src/middleware.ts` (no change) | Already auth-protects everything not in the public-route allowlist; `/admin` is not listed there, so Clerk auth is enforced automatically. The role check is page-level. |

**Rationale for page-level guard (vs. middleware):** One route, one role. Adding role logic to middleware couples it to Clerk's session-claims shape and complicates future role expansion. Keep middleware doing one job (auth gate); put authorization (role) at the page boundary.

---

### Task 1: Add the admin role helper

**Files:**
- Create: `src/lib/auth/admin.ts`

- [ ] **Step 1: Confirm `src/lib/auth/` does not exist yet**

Run: `ls /Users/cbas-mini/projects/kptdesigns/src/lib/auth 2>/dev/null || echo "ok, will create"`
Expected: `ok, will create`

- [ ] **Step 2: Create the helper file**

Create `src/lib/auth/admin.ts` with this exact content:

```ts
/**
 * Admin authorization helpers.
 *
 * Admin status is stored in Clerk's `publicMetadata.role`. To grant a user
 * admin access, set `{ "role": "admin" }` on their public metadata via the
 * Clerk dashboard (Users → user → Metadata → Public).
 *
 * Page-level usage:
 *   const user = await requireAdmin();   // redirects non-admins
 *   <p>Signed in as {user.emailAddresses[0]?.emailAddress}</p>
 *
 * Conditional usage:
 *   const user = await currentUser();
 *   if (!isAdmin(user)) return null;
 */
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import type { User } from "@clerk/nextjs/server";

export function isAdmin(user: User | null | undefined): boolean {
  if (!user) return false;
  const role = user.publicMetadata?.role;
  return role === "admin";
}

export async function requireAdmin(): Promise<User> {
  const user = await currentUser();
  if (!user) redirect("/sign-in?redirect_url=/admin");
  if (!isAdmin(user)) redirect("/");
  return user;
}
```

- [ ] **Step 3: Typecheck the file**

Run: `cd /Users/cbas-mini/projects/kptdesigns && npx tsc --noEmit`
Expected: no errors mentioning `src/lib/auth/admin.ts`. (Pre-existing errors elsewhere are not introduced by this task — note them but don't fix.)

- [ ] **Step 4: Commit**

```bash
cd /Users/cbas-mini/projects/kptdesigns
git add src/lib/auth/admin.ts
git commit -m "feat(admin): add requireAdmin() Clerk role helper"
```

---

### Task 2: Create the admin landing page

**Files:**
- Create: `src/app/admin/page.tsx`

- [ ] **Step 1: Create the page**

Create `src/app/admin/page.tsx` with this exact content:

```tsx
import { requireAdmin } from "@/lib/auth/admin";
import { AdminBuildForm } from "./_components/AdminBuildForm";

export const metadata = {
  title: "Admin — KPT Designs",
};

export default async function AdminPage() {
  const user = await requireAdmin();
  const email = user.emailAddresses[0]?.emailAddress ?? "(no email)";

  return (
    <main className="mx-auto max-w-2xl px-6 py-16">
      <header className="mb-10">
        <p className="text-sm uppercase tracking-widest text-stone-500">
          Admin
        </p>
        <h1 className="mt-2 text-4xl font-semibold tracking-tight">
          Build a site
        </h1>
        <p className="mt-3 text-stone-600">
          Paste a customer URL and we'll run the discovery → synthesis →
          building pipeline. You'll land on the preview when it's done.
        </p>
        <p className="mt-2 text-xs text-stone-500">Signed in as {email}</p>
      </header>

      <AdminBuildForm />
    </main>
  );
}
```

- [ ] **Step 2: Typecheck**

Run: `cd /Users/cbas-mini/projects/kptdesigns && npx tsc --noEmit`
Expected: no NEW errors mentioning `src/app/admin/page.tsx`. (`AdminBuildForm` will fail to resolve until Task 3 — that's expected; do NOT commit yet.)

---

### Task 3: Create the client build form

**Files:**
- Create: `src/app/admin/_components/AdminBuildForm.tsx`

- [ ] **Step 1: Create the form component**

Create `src/app/admin/_components/AdminBuildForm.tsx` with this exact content:

```tsx
"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type StartResponse = {
  id?: string;
  status?: string;
  error?: string;
};

export function AdminBuildForm() {
  const router = useRouter();
  const [url, setUrl] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [notes, setNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    try {
      const res = await fetch("/api/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: url.trim(),
          businessName: businessName.trim(),
          notes: notes.trim(),
        }),
      });
      const data = (await res.json()) as StartResponse;

      if (!res.ok || !data.id) {
        setError(data.error ?? `Pipeline failed (${res.status})`);
        setBusy(false);
        return;
      }

      router.push(`/preview/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="admin-url">Customer URL</Label>
        <Input
          id="admin-url"
          type="url"
          placeholder="acmeplumbing.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          disabled={busy}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="admin-business">Business name (optional)</Label>
        <Input
          id="admin-business"
          type="text"
          placeholder="Acme Plumbing"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          disabled={busy}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="admin-notes">Notes for the pipeline (optional)</Label>
        <Textarea
          id="admin-notes"
          rows={4}
          placeholder="Anything we should know — service area, voice, photos to highlight…"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          disabled={busy}
        />
      </div>

      {error && (
        <p
          role="alert"
          className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
        >
          {error}
        </p>
      )}

      <Button type="submit" disabled={busy || !url.trim()} className="w-full">
        {busy ? "Starting pipeline…" : "Build a refreshed site"}
      </Button>

      <p className="text-xs text-stone-500">
        Pipeline takes ~5–10 minutes. The preview link opens automatically when
        ready.
      </p>
    </form>
  );
}
```

- [ ] **Step 2: Verify shadcn imports resolve**

Run: `ls /Users/cbas-mini/projects/kptdesigns/src/components/ui/{input,textarea,button,label}.tsx`
Expected: all four files print without errors.

- [ ] **Step 3: Lint + typecheck the new files**

Run: `cd /Users/cbas-mini/projects/kptdesigns && npm run lint && npx tsc --noEmit`
Expected: no NEW errors in `src/app/admin/**` or `src/lib/auth/**`. (Pre-existing errors elsewhere are out of scope.)

- [ ] **Step 4: Commit**

```bash
cd /Users/cbas-mini/projects/kptdesigns
git add src/app/admin
git commit -m "feat(admin): add /admin URL-mode build form gated by Clerk role"
```

---

### Task 4: Set Sebastian as admin in Clerk

This is a one-time manual step — there's no code change, but the gate doesn't work without it. Do not skip the verification.

- [ ] **Step 1: Open Clerk dashboard**

Visit `https://dashboard.clerk.com`. Pick the project that matches `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` in `.env.local` (likely `kptdesigns` or similar).

- [ ] **Step 2: Find the user**

Users → search `sebastian.kiely@gmail.com`. If the user doesn't exist yet, sign in once at `http://localhost:3000/sign-in` to create the Clerk account, then return.

- [ ] **Step 3: Set public metadata**

Click the user → Metadata tab → **Public metadata** → Edit. Set the JSON to exactly:

```json
{
  "role": "admin"
}
```

Save.

- [ ] **Step 4: Verify via curl-style probe (no code change)**

Start the dev server in another terminal: `cd /Users/cbas-mini/projects/kptdesigns && npm run dev`

Wait for the server to log `Ready in ...`. Skip to Task 5 for the browser test.

---

### Task 5: End-to-end browser verification

This is the load-bearing check. Per project policy (`CLAUDE.md`), code changes affecting the UI are not "done" until verified in a browser.

- [ ] **Step 1: Anonymous visit redirects**

In a private/incognito window, navigate to `http://localhost:3000/admin`.
Expected: redirect to `/sign-in?redirect_url=/admin`.

- [ ] **Step 2: Non-admin user redirects**

Sign in as any non-admin user (or temporarily remove Sebastian's `role: "admin"` metadata to test). Navigate to `/admin`.
Expected: redirect to `/`.
After this check, **restore Sebastian's `role: "admin"` metadata** before continuing.

- [ ] **Step 3: Admin user sees the form**

Sign in as `sebastian.kiely@gmail.com` (with `role: "admin"` set). Navigate to `/admin`.
Expected: page renders with heading "Build a site", the signed-in email, and the URL form.

- [ ] **Step 4: Form submission kicks off the pipeline**

Enter `https://example.com` in the URL field, click "Build a refreshed site".
Expected:
- Button changes to "Starting pipeline…"
- After ~10–60 seconds, the page navigates to `/preview/<some-uuid>`
- The preview page shows pipeline progress (or already-completed output if the pipeline was fast)

If submission errors:
- Open DevTools → Network → inspect the `/api/start` response. The error body's `error` field is now in the form's red error block.
- Check the dev-server terminal for any thrown errors in the pipeline runner.
- Confirm `GOOGLE_API_KEY` and `LINODE_STORAGE_*` env vars are set in `.env.local`.

- [ ] **Step 5: Empty URL is blocked**

Clear the URL field. The submit button should be disabled.
Expected: button shows "Build a refreshed site" but is grayed and unclickable.

- [ ] **Step 6: Validation errors render inline**

Enter `not a real url` in the URL field, submit.
Expected: native browser validation rejects (input has `type="url"`), or the API responds with an error that renders in the red alert block. Either is acceptable.

---

### Task 6: Final lint + typecheck + commit checkpoint

- [ ] **Step 1: Full project lint**

Run: `cd /Users/cbas-mini/projects/kptdesigns && npm run lint`
Expected: no NEW lint errors in `src/app/admin/**` or `src/lib/auth/**`. (Pre-existing errors elsewhere are out of scope; do not fix in this plan.)

- [ ] **Step 2: Full project typecheck**

Run: `cd /Users/cbas-mini/projects/kptdesigns && npx tsc --noEmit`
Expected: no NEW type errors in the new files.

- [ ] **Step 3: Confirm git status is clean**

Run: `cd /Users/cbas-mini/projects/kptdesigns && git status`
Expected: working tree clean (Tasks 1 and 3 commits already landed; Tasks 4 and 5 had no code changes).

- [ ] **Step 4: Push branch + open PR (optional)**

If working on a feature branch (e.g. `feat/admin-portal`):

```bash
cd /Users/cbas-mini/projects/kptdesigns
git push -u origin HEAD
gh pr create --title "Admin portal — URL mode" --body "$(cat <<'EOF'
## Summary
- Adds `/admin` page gated by Clerk `publicMetadata.role === "admin"`
- Reuses the existing `POST /api/start` pipeline; no API change
- Sebastian set as the first admin via Clerk dashboard

## Test plan
- [x] Anonymous visit to `/admin` redirects to `/sign-in?redirect_url=/admin`
- [x] Non-admin signed-in user redirects to `/`
- [x] Admin user sees the form
- [x] Form submission creates a job and lands on `/preview/<id>`
- [x] Empty URL disables submit
- [x] Lint + typecheck clean for new files

## Out of scope
- Mode B (no-URL: uploads + social + Google) — see Plan 2 of 2
- Locking down `/api/start` (still public; matches existing spike)
EOF
)"
```

---

## Known Gaps (intentional, deferred to follow-ups)

1. **`/api/start` is still publicly callable.** Anyone with the URL can fire jobs. Matches the existing spike flow at `/start`. If admin-only API is required, add a `requireAdmin` check inside `src/app/api/start/route.ts` — out of scope here.
2. **No rate limiting on `/admin` form.** Admins are trusted; if you ever expand the role list, revisit.
3. **No "list of in-flight admin jobs" UI.** Admins only see the preview page after kicking off. A jobs index is a separate small task — not in this plan.
4. **No Mode B (file uploads, social, Google).** That's Plan 2. The form here covers Mode A only. Plan 2 will extend `AdminBuildForm` with a tab/toggle for the no-URL path and add the new discovery agents.

---

## Self-Review

- **Spec coverage:** (1) Clerk admin role — Tasks 1, 4. (2) `/admin` route — Task 2. (3) URL form → existing pipeline — Task 3 + Task 5 step 4. (4) Sebastian as first admin — Task 4. ✅ All four user requirements covered.
- **Placeholder scan:** No `TBD` / `implement later` / "appropriate error handling" phrases. Each step has either exact code or an exact command + expected output.
- **Type consistency:** `requireAdmin()` returns `User` from `@clerk/nextjs/server` in Task 1; consumed in Task 2 as `await requireAdmin()` and `.emailAddresses[0]?.emailAddress` is read — matches Clerk's `User` shape. `StartResponse` type in Task 3 mirrors `src/app/api/start/route.ts` JSON output (`id`, `status`, `error`).
- **No test runner in main branch:** confirmed by `find` — vitest only exists in a worktree. Verification is manual browser check + `eslint` + `tsc --noEmit`. This matches the existing project conventions.
