# Linode Bucket Migration Runbook

Move kptdesigns data from the shared `kptagents-dev` bucket into a dedicated `kptdesigns-prod` bucket.

---

## 1. Current State Audit

### Env vars consumed (all five must be set)

| Var | Purpose |
|-----|---------|
| `LINODE_STORAGE_ACCESS_KEY` | S3 access key |
| `LINODE_STORAGE_SECRET_KEY` | S3 secret key |
| `LINODE_STORAGE_ENDPOINT` | Regional endpoint URL e.g. `https://us-southeast-1.linodeobjects.com` |
| `LINODE_STORAGE_REGION` | Region string e.g. `us-southeast-1` (falls back to `us-east-1`) |
| `LINODE_STORAGE_BUCKET_NAME` | Currently `kptagents-dev` |

### Object layout inside `kptagents-dev`

All kptdesigns data sits under a `kptdesigns/` top-level prefix:

```
kptagents-dev/
  kptdesigns/
    intake-jobs/<id>.json          # intake-store.ts PROJECT_PREFIX = "kptdesigns/intake-jobs"
    customer-<jobId>/logo.<ext>    # customer-storage.ts PROJECT_PREFIX = "kptdesigns"
    customer-<jobId>/assets/<sha8>.<ext>
    customer-<jobId>/uploads/<sha8>.<ext>  # admin uploads route
```

### Code locations with hardcoded `kptdesigns` prefix

| File | Line | Constant / value |
|------|------|-----------------|
| `src/lib/intake-store.ts` | 35 | `const PROJECT_PREFIX = "kptdesigns/intake-jobs"` |
| `src/lib/pipeline/customer-storage.ts` | 23 | `const PROJECT_PREFIX = "kptdesigns"` |
| `src/app/api/asset/[...key]/route.ts` | 25 | `const PROJECT_PREFIX = "kptdesigns/"` (scope guard) |
| `src/app/api/admin/uploads/route.ts` | 30 | `const PROJECT_PREFIX = "kptdesigns"` (local, inline) |
| `src/app/api/edit/[id]/upload/route.ts` | 22 | `const PROJECT_PREFIX = "kptdesigns"` (local, inline) |

### The asset proxy route

`GET /api/asset/[...key]` — signs a presigned GET URL (5-minute TTL) and 302-redirects the browser. It reads `LINODE_STORAGE_*` credentials at runtime. The prefix scope guard at line 64 currently rejects any key that does not start with `kptdesigns/`. **This guard must be updated when the prefix changes** — see §4.

### What `customer-storage.ts` note says about ACLs

Line 89: "Linode S3 doesn't implement per-object ACLs. Public read needs to be configured on the bucket itself." The new bucket must have public-read set at bucket level if `publicUrl` is used directly — but because the `/api/asset` proxy route now gates all loads with presigned URLs, **the new bucket can remain private**. Verify that no code bypasses the proxy and uses `publicUrl` directly in `<img src>`.

---

## 2. New Bucket Creation (user runs in Linode Cloud Manager)

1. Go to **cloud.linode.com → Object Storage → Buckets → Create Bucket**
2. **Label:** `kptdesigns-prod`
3. **Region:** same as current — `us-southeast-1` (Jakarta) — for latency parity with existing Vercel deployment region
4. **Access:** Private (NOT public-read) — the asset proxy signs all URLs
5. Click **Create Bucket**

Generate dedicated access keys:

1. **Object Storage → Access Keys → Create Access Key**
2. Label: `kptdesigns-prod-access`
3. Enable "Limited Access" → grant **Read/Write** to `kptdesigns-prod` only (no access to `kptagents-dev`)
4. Copy the **Access Key** and **Secret Key** — these are shown only once

---

## 3. Data Migration (optional — decide before proceeding)

**Option A — migrate existing data** (if demo jobs should be preserved):

Install `rclone`, configure two remotes in `~/.config/rclone/rclone.conf`:

```ini
[linode-old]
type = s3
provider = Ceph
env_auth = false
access_key_id = <OLD_ACCESS_KEY>
secret_access_key = <OLD_SECRET_KEY>
endpoint = https://us-southeast-1.linodeobjects.com
region = us-southeast-1

[linode-new]
type = s3
provider = Ceph
env_auth = false
access_key_id = <NEW_ACCESS_KEY>
secret_access_key = <NEW_SECRET_KEY>
endpoint = https://us-southeast-1.linodeobjects.com
region = us-southeast-1
```

Then run:

```bash
rclone sync \
  linode-old:kptagents-dev/kptdesigns/ \
  linode-new:kptdesigns-prod/ \
  --progress
```

This maps `kptagents-dev/kptdesigns/intake-jobs/…` → `kptdesigns-prod/intake-jobs/…`, which aligns with the new prefix constants in §4.

**Option B — start fresh** (recommended for initial prod cutover with no real customers): skip the sync entirely. Existing demo job IDs will 404 after the switch; that is acceptable.

---

## 4. Code Changes Required (I'll make these once bucket exists)

All five `PROJECT_PREFIX` constants must change. With a dedicated bucket the `kptdesigns/` top-level namespace is no longer needed — kptdesigns data owns the whole bucket.

| File | Old value | New value |
|------|-----------|-----------|
| `src/lib/intake-store.ts:35` | `"kptdesigns/intake-jobs"` | `"intake-jobs"` |
| `src/lib/pipeline/customer-storage.ts:23` | `"kptdesigns"` | `""` |
| `src/app/api/asset/[...key]/route.ts:25` | `"kptdesigns/"` | `""` (remove scope guard or change to empty-string pass-through) |
| `src/app/api/admin/uploads/route.ts:30` | `"kptdesigns"` | `""` |
| `src/app/api/edit/[id]/upload/route.ts:22` | `"kptdesigns"` | `""` |

Key path results after change:

```
intake-jobs/<id>.json
customer-<jobId>/logo.<ext>
customer-<jobId>/assets/<sha8>.<ext>
customer-<jobId>/uploads/<sha8>.<ext>
```

Note: `customer-storage.ts` builds the key as `` `${PROJECT_PREFIX}/customer-${jobId}/…` `` — when `PROJECT_PREFIX` is `""` that becomes `"/customer-…"` (leading slash). The key builder needs a guard: use `PROJECT_PREFIX ? \`${PROJECT_PREFIX}/customer-\` : \`customer-\`` or similar. I'll handle this when making the changes.

The `/api/asset` scope guard at route.ts:64 checks `fullKey.startsWith(PROJECT_PREFIX)`. With an empty prefix every key passes — acceptable since the bucket is now dedicated and private. Alternatively, change it to a no-op passthrough with a comment.

---

## 5. Vercel Env Var Swap (user runs OR delegates)

### Via Vercel dashboard

1. Go to **vercel.com → kptdesigns project → Settings → Environment Variables → Production**
2. Edit `LINODE_STORAGE_BUCKET_NAME` → `kptdesigns-prod`
3. Edit `LINODE_STORAGE_ACCESS_KEY` → new access key from §2
4. Edit `LINODE_STORAGE_SECRET_KEY` → new secret key from §2
5. `LINODE_STORAGE_ENDPOINT` and `LINODE_STORAGE_REGION` stay the same (same region)
6. Redeploy: **Deployments → Redeploy** (or push a commit)

### Via Vercel CLI (alternative)

```bash
vercel env rm LINODE_STORAGE_BUCKET_NAME production --yes
echo "kptdesigns-prod" | vercel env add LINODE_STORAGE_BUCKET_NAME production

vercel env rm LINODE_STORAGE_ACCESS_KEY production --yes
echo "<NEW_ACCESS_KEY>" | vercel env add LINODE_STORAGE_ACCESS_KEY production

vercel env rm LINODE_STORAGE_SECRET_KEY production --yes
echo "<NEW_SECRET_KEY>" | vercel env add LINODE_STORAGE_SECRET_KEY production

vercel deploy --prod --yes
```

---

## 6. Verification

After deploying with updated code + new env vars:

1. **Trigger a new intake job** via `/admin?url=https://example.com`
2. **Check Linode dashboard** → Object Storage → `kptdesigns-prod` → object listing. Confirm `intake-jobs/<id>.json` appears.
3. **Open `/preview/<jobId>`** — logo and photos should load via the `/api/asset` proxy. A 200 redirect (302 → signed URL → 200) confirms signing works.
4. **Check old bucket** → `kptagents-dev` → confirm no new objects appear under `kptdesigns/` after the deploy.
5. **Check `/api/admin/uploads`** — upload a test image in the admin UI; confirm it lands in `kptdesigns-prod`, not `kptagents-dev`.

---

## 7. Rollback

Vercel keeps env var version history. To revert:

1. Vercel dashboard → Settings → Environment Variables → Production
2. Restore `LINODE_STORAGE_BUCKET_NAME` to `kptagents-dev`
3. Restore `LINODE_STORAGE_ACCESS_KEY` and `LINODE_STORAGE_SECRET_KEY` to old values
4. Redeploy

Code changes (prefix constants) can be reverted via `git revert` on the commit that made them.

---

## 8. Risks

**Asset proxy scope guard** (`/api/asset/[...key]/route.ts:64`): Currently blocks any key not starting with `kptdesigns/`. When `PROJECT_PREFIX` becomes `""` the guard becomes a no-op. Since the new bucket is private and dedicated to kptdesigns, this is fine — but verify no other product shares credentials before removing the guard.

**`publicUrl` direct usage**: `customer-storage.ts` builds a `publicUrl` using the bucket subdomain form. If any code path renders this URL directly in an `<img src>` (bypassing `/api/asset`), it will 403 on a private bucket. Grep for `publicUrl` usage before going live.

```bash
grep -rn "publicUrl\|publicHost" --include="*.ts" --include="*.tsx" src/
```

**Stale intake-job blobs**: Any job written before the migration references the old key paths (e.g. `kptdesigns/intake-jobs/<id>.json`). After the bucket switch, those job IDs simply won't exist in the new bucket — `/preview/<id>` will 404. Acceptable for a fresh prod cutover; document it for the team.

**Bookmarked preview URLs**: Existing `/preview/<id>` links held by beta testers will break. Notify testers before switching.

**Old access key revocation**: Do NOT revoke the old `kptagents-dev` access key until confirmed that the kptagents product no longer uses the same key pair. Verify with the kptagents team first.

---

## 9. Decisions Needed Before Starting

| Decision | Proposal |
|----------|----------|
| New bucket name | `kptdesigns-prod` |
| Migrate existing data? | No — start fresh (no real customers yet) |
| Revoke old access keys after? | Yes, but only the kptdesigns-specific key if it's scoped; confirm with kptagents team first |

---

*Generated: 2026-05-05*
