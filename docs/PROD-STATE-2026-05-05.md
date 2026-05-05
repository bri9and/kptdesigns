# Production State: Post Admin Portal Merge
**Date:** 2026-05-05  
**Merge Commit:** 9652072  
**PR:** #1 (Admin Portal Feature)

---

## 1. What Just Shipped

### Admin Portal Feature (PR #1, merged 2026-05-05 05:50Z)

**Endpoint:** `/admin` (Clerk-gated by `publicMetadata.role === "admin"`)

**Dual-mode intake:**
- **URL Paste Mode:** Existing pipeline (brand discovery + synthesis)
- **From Scratch Mode:** Multi-file uploads + social media URLs + Google Places search

**New API Endpoints:**
- `POST /api/admin/start` — Initialize intake job (URL or from-scratch mode)
- `POST /api/admin/uploads` — Handle file uploads for from-scratch jobs

**New Discovery Agent:**
- `src/lib/pipeline/agents/discovery/google.ts` — Google Places API integration
- Fetches business details, reviews, photos, operational hours

**Type System Extensions:**
- `src/lib/pipeline/types.ts` additions:
  - `googlePlace` — Google Places Business Profile shape
  - `uploadedAssetKeys` — Array of uploaded file keys (Linode Object Storage)
  - `"google"` StageId — New discovery phase

**Synthesis & Branding Prompt Updates:**
- `src/lib/pipeline/brand-profile.ts` — Includes Google Place facts in brand synthesis
- `src/lib/pipeline/freeform.ts` — Includes Google Place + social media data in prompt context

---

## 2. Deployment Status

| Domain | Vercel Project | Auto-Deploy from main? | Deployment ID | Status |
|--------|---|---|---|---|
| **kptdesigns.com** | quantum-eebbd020/kptdesigns | NO (repo not connected) | dpl_J1ood9HAzdgA8qNiDASJUcYCEWZS | ✓ Deployed via `vercel deploy --prod` from worktree |
| **egowebdesign.com** | quantum-eebbd020/ewd | YES (repo: bri9and/kptdesigns) | (auto-deployed) | ⚠ Auto-deployed but incomplete env vars (only 4 set, not 26) |

**Live URL:** `kptdesigns-iycgop305-quantum-eebbd020.vercel.app`

---

## 3. Environment Variables

### kptdesigns Vercel Project
- **GOOGLE_PLACES_API_KEY** — ✓ Added to Production + Preview environments
- **All other vars** (CLERK_*, LINODE_*, STRIPE_*, GOOGLE_API_KEY, etc.) — Assumed present (26 total)
  - *Verification:* Run `vercel env ls --scope quantum-eebbd020 kptdesigns` to confirm

### ewd Vercel Project
- ⚠ **Only 4 environment variables set** — lacks CLERK_*, LINODE_*, STRIPE_*, GOOGLE_*, etc.
- **Risk:** Runtime 500 errors when accessing features requiring unset vars (auth, storage, payments, API calls)

---

## 4. Authentication & Admin Role

**Clerk Instance:** Development (`ins_3D2SEVnkbRQqIrUR5ZjPFyI3gl0`)

**Vercel env vars:** `pk_test_*` / `sk_test_*` (test keys, not production)

**Admin Role:**
- **Sebastian Kiely** (`sebastian.kiely@gmail.com`): `publicMetadata.role: "admin"` ✓ Set on Development instance
- Only the Development Clerk instance has this role assignment

**⚠ Future Work:** Migration to Clerk Production instance requires:
1. Switch Vercel env vars to `pk_live_*` / `sk_live_*`
2. Re-assign `role: "admin"` on Production Clerk instance

---

## 5. Pending Actions (with Ownership)

### [ ] Browser Verification (USER)
- **Task:** Test `/admin` end-to-end on kptdesigns.com
  - Sign in with Development Clerk credentials
  - Try URL paste → watch pipeline run
  - Try from-scratch → upload files, enter socials, search Google Places
- **Blocker:** Requires Sebastian's active session

### [ ] Google Places API Key Security (USER)
- **Current:** `AIzaSyC8_OV4F1ymnUCflm9myJtTP_UCnzxhzFo` visible in chat history
- **Action:** Rotate immediately
  1. Create new key in Google Cloud Console
  2. Add to Vercel kptdesigns project
  3. Delete old key
- **Restriction:** Set API restrictions to "Places API (New)" only (no app restrictions needed for server-side)

### [ ] ewd Auto-Deploy Resolution (USER)
- **Problem:** egowebdesign.com auto-deployed with admin code but missing env vars
- **Options:**
  1. Disconnect auto-deploy from ewd project (safer for separate app)
  2. Add missing env vars to ewd (if ewd should run full kptdesigns code)
  3. Roll back ewd to prior stable deployment
- **Decision required** before prod access

### [ ] Clerk Production Migration (USER)
- When ready to migrate off Clerk Development:
  1. Create/configure Production Clerk instance
  2. Create new `pk_live_*` / `sk_live_*` keys
  3. Add to Vercel kptdesigns Production env
  4. Assign `role: "admin"` on Production instance
  5. Test `/admin` sign-in flow

---

## 6. Known Gaps (Not in Scope of This PR)

- **Social Media Content Crawling:** URLs are stored; live fetch from Facebook/Instagram/Yelp not implemented
- **File Preview Thumbnails:** Admin form accepts uploads but no inline preview
- **Presigned URL Flow:** Single multipart endpoint works for ≤12 files; per-job presigned URLs deferred
- **Admin Job Index/Status Page:** View job history not yet built
- **Rate Limiting:** `/api/admin/*` endpoints open to authenticated admins (no per-user limits)

---

## 7. Quick Test Commands (For Re-Verification)

```bash
# Test 1: Anon /admin should 404 or redirect
curl -sI https://kptdesigns.com/admin

# Test 2: /api/admin/start unsigned should 403
curl -sI -X POST https://kptdesigns.com/api/admin/start \
  -H "Content-Type: application/json" \
  -d '{}'

# Test 3: Verify latest deploys
vercel ls --scope quantum-eebbd020 kptdesigns | head -5

# Test 4: Verify Google Places API is set (kptdesigns only)
vercel env ls --scope quantum-eebbd020 kptdesigns | grep GOOGLE_PLACES
vercel env ls --scope quantum-eebbd020 ewd | grep GOOGLE_PLACES  # Should be absent
```

---

## Commit History (Context)

| Commit | Message |
|--------|---------|
| 9652072 | Merge pull request #1 from bri9and/worktree-feat-admin-portal |
| de7a17b | feat(pipeline): include Google Place facts in freeform builder prompt |
| eeda577 | feat(pipeline): include Google Place + socials in brand-profile prompt |

---

**Next Review:** Post-verification by USER when `/admin` is tested end-to-end and security decisions (API key rotation, ewd resolution, Clerk migration timeline) are finalized.
