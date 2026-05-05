# Admin Portal — No-URL Mode (Plan 2 of 2)

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** When the customer has no website, an admin at `/admin` can switch into "from scratch" mode, upload a logo + photos, paste any social URLs they have, enter the business name + location, and trigger the pipeline. The pipeline pulls public business data from Google Places, treats uploaded files as the customer's photo library, and runs the existing synthesis + building phases against this enriched-findings payload.

**Architecture:**
- New gated route `POST /api/admin/start` accepts the no-URL payload (mode + uploads + socials + Google-lookup hints) and runs the same `runPipeline` as the public `/api/start`. Mode A (URL) keeps using the existing public `/api/start` route untouched.
- New `POST /api/admin/uploads` accepts multipart files, writes them to Linode under `kptdesigns/customer-<jobId>/uploads/`, returns the resulting keys. Admin-gated.
- New `googleAgent` (replaces stub if any, or new file) calls Google Places API (Text Search → Place Details) when a businessName + location are provided. Writes `findings.googlePlace` and pushes Place photos into `findings.assetKeys`.
- `social` discovery agent stays a stub for v1 (matches the user's "simple for now" instruction) — admin-pasted social URLs are stored in `findings.socials` only. Agent that actually crawls them is a follow-up.
- Crawler agent's existing "no-URL → fabricate one notes page" branch is widened to also incorporate the Google Place description + admin notes into its synthesized text page so the brand-profile agent has something to read.
- Form UI gains a two-state mode toggle ("I have a URL" / "From scratch") rendered as two custom tab buttons (shadcn ships no Tabs component in this repo).

**Tech Stack:**
- Next.js 16 App Router (server actions for upload + form submit, or REST routes — plan uses REST routes for parity with existing `/api/start`)
- Clerk v7 for admin role gate (reusing `requireAdmin()` from Plan 1)
- Google Places API v1 (`places:searchText` + `places.GET`) — needs `GOOGLE_PLACES_API_KEY` env var
- Linode S3 via existing `customer-storage.ts` helpers

---

## Prerequisites (must verify before starting)

- [ ] **Plan 1 has been merged or is on the same working branch.** This plan extends `src/app/admin/_components/AdminBuildForm.tsx` and depends on `src/lib/auth/admin.ts`.
- [ ] **`GOOGLE_PLACES_API_KEY` is set in `.env.local`.** Get one at https://console.cloud.google.com → APIs & Services → enable "Places API (New)" → create API key. Restrict it to the Places API + your IP for safety. Cost: ~$17 / 1000 Place Details calls; first $200/mo is free.
- [ ] **Linode bucket has the `kptdesigns/customer-*/uploads/` prefix accepting writes.** Should be automatic since the bucket is shared with existing `assets/` and `logo` writes.

If any prerequisite is missing, surface it before dispatching subagents.

---

## File Structure

| Path | Responsibility |
|---|---|
| `src/lib/pipeline/types.ts` (modify) | Extend `Findings` with `googlePlace` + `uploadedAssetKeys`; extend `StageId` with `"google"`; remove `"social"` from the active union or keep it as the existing stub. |
| `src/lib/pipeline/agents/discovery/google.ts` (create) | New agent. Calls Google Places API when `businessName + serviceArea` is on the input. Stores structured Place data + downloads photos into Linode. |
| `src/lib/pipeline/agents/index.ts` (modify) | Register `googleAgent` in `allAgents`. Remove `domainStubAgent` from registration if you want — out of scope, leave it. |
| `src/app/api/admin/uploads/route.ts` (create) | `POST` admin-gated multipart endpoint. Accepts `multipart/form-data` with `files[]` and `jobId` (or generates one). Writes each file to Linode at `kptdesigns/customer-<jobId>/uploads/<sha8>.<ext>`. Returns `{ jobId, keys: string[] }`. |
| `src/app/api/admin/start/route.ts` (create) | `POST` admin-gated endpoint. Accepts `{ mode: "url" \| "scratch", url?, businessName?, serviceArea?, notes?, socials?, uploadKeys?, jobId? }`. Wraps `createIntakeJob` + `runPipeline` (already used by `/api/start`). Differs from `/api/start` only by being admin-gated and accepting the richer payload. |
| `src/app/admin/_components/AdminBuildForm.tsx` (modify) | Add a two-state mode toggle. URL mode is the existing form, unchanged. Scratch mode renders a richer form (business name, location, description, social URLs, file picker). On submit, scratch mode POSTs to `/api/admin/start` with the new payload. |
| `src/lib/pipeline/agents/discovery/crawler.ts` (modify) | Widen the no-URL branch: when `socials` or `googlePlace` is in findings (after their agents run), fold the relevant text into the fabricated `intake://notes` page so brand-profile has more to chew on. (This change is small — ~10 lines.) |
| `src/lib/pipeline/runner.ts` (no change expected) | Already orchestrates `discovery → synthesis → building`. New `google` agent is just another discovery agent; runner picks it up automatically when registered. |
| `src/lib/pipeline/agents/synthesis/brand-profile.ts` (modify) | Update the user-prompt builder to include `googlePlace` + uploaded assets + `socials` URLs in the LLM prompt, so the brand profile reflects them. |
| `src/lib/pipeline/agents/building/freeform.ts` (modify) | Update the user-prompt builder to surface Google Place facts (hours, phone, address, reviews-derived voice) so the bespoke HTML can include them in headers/footers. |

---

### Task 1: Extend the `Findings` type for Google + uploads

**Files:**
- Modify: `src/lib/pipeline/types.ts:23-44` (the `StageId` union) and `src/lib/pipeline/types.ts:116-142` (the `Findings` type)

- [ ] **Step 1: Add the `google` stage**

In `src/lib/pipeline/types.ts`, find the `StageId` union (around line 23-44) and add `"google"` after `"domain"` in the discovery section:

```ts
export type StageId =
  // discovery
  | "crawl"
  | "logo"
  | "assets"
  | "palette"
  | "voice"
  | "stack"
  | "social"
  | "domain"
  | "google"
  // synthesis
  | "brand-profile"
  // ... (rest unchanged)
```

- [ ] **Step 2: Add the new fields to `Findings`**

Find the `Findings` type and add these fields immediately after `domainAge`:

```ts
  /** Structured business data from the Google Places API — only populated
   *  when the no-URL admin flow provides a businessName + serviceArea. */
  googlePlace?: {
    placeId: string;
    name: string;
    formattedAddress?: string;
    phone?: string;
    website?: string;
    hours?: string[];           // weekday text lines, e.g. "Monday: 9 AM – 5 PM"
    rating?: number;
    userRatingCount?: number;
    photoKeys?: string[];        // Linode keys for photos we downloaded from Place
    editorialSummary?: string;
    primaryType?: string;        // "plumber", "restaurant", etc — useful for brand-profile
  };

  /** Linode keys for files an admin uploaded directly via /api/admin/uploads. */
  uploadedAssetKeys?: string[];
```

- [ ] **Step 3: Typecheck**

Run: `cd /Users/cbas-mini/projects/kptdesigns/.claude/worktrees/feat-admin-portal && npx tsc --noEmit 2>&1 | grep -E "src/lib/pipeline/types\.ts" || echo "no type errors in types.ts"`
Expected: `no type errors in types.ts`. (Other files may now flag missing fields when they read these — we fix as we touch them.)

- [ ] **Step 4: Commit**

```bash
git add src/lib/pipeline/types.ts
git commit -m "feat(pipeline): add google + uploadedAssetKeys to Findings, google StageId"
```

---

### Task 2: Build the admin upload endpoint

**Files:**
- Create: `src/app/api/admin/uploads/route.ts`

- [ ] **Step 1: Create the route**

Create `src/app/api/admin/uploads/route.ts` with this exact content:

```ts
/**
 * POST /api/admin/uploads
 *
 * Multipart endpoint for admin-uploaded customer assets in the no-URL flow.
 * Files land at kptdesigns/customer-<jobId>/uploads/<sha8>.<ext> in Linode.
 *
 * Request: multipart/form-data with
 *   - jobId?: string         (optional — when omitted, a fresh UUID is generated)
 *   - files: File[]          (one or many)
 *
 * Response: { jobId: string, keys: string[] }
 *
 * Limits:
 *   - 5MB per file (Linode helper enforces)
 *   - 12 files per request (avoid one admin paralyzing the pipeline)
 *   - Only image/* mimetypes accepted in v1
 */
import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import crypto from "node:crypto";
import { isAdmin } from "@/lib/auth/admin";
import { currentUser } from "@clerk/nextjs/server";

export const runtime = "nodejs";
export const maxDuration = 60;

const MAX_FILES = 12;
const MAX_BYTES = 5 * 1024 * 1024;
const PROJECT_PREFIX = "kptdesigns";

function unq(s?: string): string | undefined {
  return s?.replace(/^"|"$/g, "");
}

function pickExt(contentType: string, fileName: string): string {
  if (contentType.includes("svg")) return ".svg";
  if (contentType.includes("png")) return ".png";
  if (contentType.includes("jpeg") || contentType.includes("jpg")) return ".jpg";
  if (contentType.includes("webp")) return ".webp";
  if (contentType.includes("gif")) return ".gif";
  if (contentType.includes("avif")) return ".avif";
  const m = fileName.match(/\.[a-z0-9]{2,5}$/i);
  return m ? m[0].toLowerCase() : ".bin";
}

function shortHash(buf: Buffer): string {
  return crypto.createHash("sha1").update(buf).digest("hex").slice(0, 10);
}

export async function POST(req: Request) {
  const user = await currentUser();
  if (!isAdmin(user)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const accessKeyId = unq(process.env.LINODE_STORAGE_ACCESS_KEY);
  const secretAccessKey = unq(process.env.LINODE_STORAGE_SECRET_KEY);
  const endpoint = unq(process.env.LINODE_STORAGE_ENDPOINT);
  const region = unq(process.env.LINODE_STORAGE_REGION) || "us-east-1";
  const bucket = unq(process.env.LINODE_STORAGE_BUCKET_NAME);
  if (!accessKeyId || !secretAccessKey || !endpoint || !bucket) {
    return NextResponse.json(
      { error: "Linode storage not configured" },
      { status: 500 },
    );
  }

  let form: FormData;
  try {
    form = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Expected multipart/form-data" },
      { status: 400 },
    );
  }

  const jobId =
    (form.get("jobId") as string | null)?.trim() || randomUUID();
  const files = form.getAll("files").filter((v): v is File => v instanceof File);

  if (files.length === 0) {
    return NextResponse.json({ error: "No files in request" }, { status: 400 });
  }
  if (files.length > MAX_FILES) {
    return NextResponse.json(
      { error: `Too many files (max ${MAX_FILES})` },
      { status: 400 },
    );
  }

  const client = new S3Client({
    region,
    endpoint,
    credentials: { accessKeyId, secretAccessKey },
    forcePathStyle: true,
  });

  const keys: string[] = [];
  for (const file of files) {
    if (!file.type.startsWith("image/")) {
      return NextResponse.json(
        { error: `Only image uploads supported (got ${file.type || "unknown"})` },
        { status: 400 },
      );
    }
    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: `${file.name} exceeds ${MAX_BYTES} bytes` },
        { status: 400 },
      );
    }
    const buffer = Buffer.from(await file.arrayBuffer());
    const ext = pickExt(file.type, file.name);
    const key = `${PROJECT_PREFIX}/customer-${jobId}/uploads/${shortHash(buffer)}${ext}`;

    await client.send(
      new PutObjectCommand({
        Bucket: bucket,
        Key: key,
        Body: buffer,
        ContentType: file.type,
        CacheControl: "public, max-age=86400",
      }),
    );
    keys.push(key);
  }

  return NextResponse.json({ jobId, keys });
}
```

- [ ] **Step 2: Add to middleware public-route allowlist? — NO**

The route is admin-gated by the route handler itself (`isAdmin(user)` check). The middleware allowlist already requires authentication for any unlisted route, which is correct. No middleware change needed.

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit 2>&1 | grep -E "uploads/route\.ts" || echo "no errors in uploads route"`
Expected: `no errors in uploads route`.

- [ ] **Step 4: Commit**

```bash
git add src/app/api/admin/uploads/route.ts
git commit -m "feat(admin): add admin-gated POST /api/admin/uploads endpoint"
```

---

### Task 3: Build the Google Places discovery agent

**Files:**
- Create: `src/lib/pipeline/agents/discovery/google.ts`
- Modify: `src/lib/pipeline/agents/index.ts` (register the agent)

- [ ] **Step 1: Create the agent**

Create `src/lib/pipeline/agents/discovery/google.ts`:

```ts
/**
 * Discovery — Google Places agent.
 *
 * Runs ONLY when input has businessName + serviceArea (the no-URL admin flow).
 * Calls the Places API "Text Search" endpoint, picks the top match, then
 * fetches Place Details for hours/phone/photos/etc. Photos are downloaded
 * to Linode under kptdesigns/customer-<jobId>/places/<sha8>.<ext> and added
 * to findings.assetKeys so the curator + freeform builder treat them like
 * any other customer asset.
 *
 * Falls back gracefully:
 *   - No GOOGLE_PLACES_API_KEY → reports "skipped" and returns {}
 *   - No businessName/serviceArea on input → reports "skipped" and returns {}
 *   - API error → reports the error, returns {} (degrades, doesn't kill pipeline)
 */
import type { Agent } from "../types";
import { uploadFromUrl } from "../../customer-storage";

const PLACES_BASE = "https://places.googleapis.com/v1";
const PHOTO_FIELDS =
  "places.id,places.displayName,places.formattedAddress,places.nationalPhoneNumber,places.websiteUri,places.regularOpeningHours,places.rating,places.userRatingCount,places.editorialSummary,places.primaryType,places.photos";

const DETAILS_FIELDS =
  "id,displayName,formattedAddress,nationalPhoneNumber,websiteUri,regularOpeningHours.weekdayDescriptions,rating,userRatingCount,editorialSummary,primaryType,photos";

const MAX_PHOTOS = 6;

export const googleAgent: Agent = {
  stage: "google",
  phase: "discovery",
  label: "Looking up Google business profile",

  async run({ jobId, input, report }) {
    const apiKey = process.env.GOOGLE_PLACES_API_KEY?.replace(/^"|"$/g, "");
    if (!apiKey) {
      await report("GOOGLE_PLACES_API_KEY not set — skipping");
      return {};
    }
    if (!input.businessName) {
      await report("No business name provided — skipping");
      return {};
    }

    const query = [input.businessName, input.notes ?? ""].filter(Boolean).join(" ");

    await report(`Searching Google Places for "${input.businessName}"`);

    let placeId: string | undefined;
    try {
      const searchRes = await fetch(`${PLACES_BASE}/places:searchText`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": PHOTO_FIELDS,
        },
        body: JSON.stringify({ textQuery: query, maxResultCount: 3 }),
      });
      if (!searchRes.ok) {
        await report(`Places searchText HTTP ${searchRes.status}`);
        return {};
      }
      const searchJson = (await searchRes.json()) as {
        places?: Array<{ id: string }>;
      };
      placeId = searchJson.places?.[0]?.id;
      if (!placeId) {
        await report("No matching place found");
        return {};
      }
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await report(`Places search failed: ${msg}`);
      return {};
    }

    let details: PlaceDetails | undefined;
    try {
      const detailRes = await fetch(`${PLACES_BASE}/places/${placeId}`, {
        headers: {
          "X-Goog-Api-Key": apiKey,
          "X-Goog-FieldMask": DETAILS_FIELDS,
        },
      });
      if (!detailRes.ok) {
        await report(`Places details HTTP ${detailRes.status}`);
        return {};
      }
      details = (await detailRes.json()) as PlaceDetails;
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      await report(`Places details failed: ${msg}`);
      return {};
    }

    const photoKeys: string[] = [];
    if (details.photos && details.photos.length > 0) {
      const slice = details.photos.slice(0, MAX_PHOTOS);
      await report(`Downloading ${slice.length} Place photos`);
      for (const photo of slice) {
        const photoUrl = `${PLACES_BASE}/${photo.name}/media?maxHeightPx=1200&maxWidthPx=1600&key=${apiKey}`;
        const stored = await uploadFromUrl(jobId, photoUrl, { kind: "asset" });
        if (stored) photoKeys.push(stored.key);
      }
    }

    const place = {
      placeId: details.id,
      name: details.displayName?.text ?? input.businessName,
      formattedAddress: details.formattedAddress,
      phone: details.nationalPhoneNumber,
      website: details.websiteUri,
      hours: details.regularOpeningHours?.weekdayDescriptions,
      rating: details.rating,
      userRatingCount: details.userRatingCount,
      photoKeys,
      editorialSummary: details.editorialSummary?.text,
      primaryType: details.primaryType,
    };

    await report(`Found ${place.name} (${place.rating ?? "no rating"})`);

    return {
      googlePlace: place,
      // Also append to assetKeys so curator + freeform see Place photos as
      // first-class customer assets.
      assetKeys: photoKeys,
    };
  },
};

type PlaceDetails = {
  id: string;
  displayName?: { text?: string };
  formattedAddress?: string;
  nationalPhoneNumber?: string;
  websiteUri?: string;
  regularOpeningHours?: { weekdayDescriptions?: string[] };
  rating?: number;
  userRatingCount?: number;
  editorialSummary?: { text?: string };
  primaryType?: string;
  photos?: Array<{ name: string }>;
};
```

- [ ] **Step 2: Register the agent**

In `src/lib/pipeline/agents/index.ts`, add the import and entry:

```ts
import { googleAgent } from "./discovery/google";
```

And add it to the `allAgents` discovery section:

```ts
export const allAgents: Agent[] = [
  // discovery
  crawlerAgent,
  logoAgent,
  assetsAgent,
  paletteAgent,
  voiceAgent,
  stackStubAgent,
  socialStubAgent,
  domainStubAgent,
  googleAgent,            // ← add this line
  // synthesis
  // ... unchanged
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit 2>&1 | grep -E "google\.ts|agents/index\.ts" || echo "no errors in agent files"`
Expected: `no errors in agent files`.

- [ ] **Step 4: Commit**

```bash
git add src/lib/pipeline/agents/discovery/google.ts src/lib/pipeline/agents/index.ts
git commit -m "feat(pipeline): add Google Places discovery agent"
```

---

### Task 4: Build the admin-gated /api/admin/start route

**Files:**
- Create: `src/app/api/admin/start/route.ts`

- [ ] **Step 1: Create the route**

Create `src/app/api/admin/start/route.ts`:

```ts
/**
 * POST /api/admin/start
 *
 * Admin-gated counterpart to the public /api/start. Accepts the richer
 * no-URL admin payload and runs the same pipeline.
 *
 * Modes:
 *   - "url"      → standard scrape→build flow. Only `url` (and optional
 *                  businessName/notes) is read from the body.
 *   - "scratch"  → no source URL. The crawler agent fabricates a notes
 *                  page from `notes`; the google agent looks up the business
 *                  by name + serviceArea; uploadKeys are folded into
 *                  findings.uploadedAssetKeys for the freeform builder.
 *
 * Always admin-gated. The public /api/start stays open for the spike.
 */
import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/auth/admin";
import { currentUser } from "@clerk/nextjs/server";
import {
  createIntakeJob,
  updateIntakeJob,
  readIntakeJob,
} from "@/lib/intake-store";
import { runPipeline } from "@/lib/pipeline/runner";

export const maxDuration = 300;
export const runtime = "nodejs";

type Body = {
  mode?: "url" | "scratch";
  jobId?: string;
  url?: string;
  businessName?: string;
  serviceArea?: string;
  notes?: string;
  socials?: {
    facebook?: string;
    instagram?: string;
    google?: string;
    yelp?: string;
    linkedin?: string;
  };
  uploadKeys?: string[];
};

export async function POST(req: Request) {
  const user = await currentUser();
  if (!isAdmin(user)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  let body: Body;
  try {
    body = (await req.json()) as Body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const mode = body.mode === "scratch" ? "scratch" : "url";
  const url = body.url?.trim() ?? "";
  const businessName = body.businessName?.trim() ?? "";
  const serviceArea = body.serviceArea?.trim() ?? "";
  const notes = body.notes?.trim() ?? "";
  const uploadKeys = (body.uploadKeys ?? []).filter(
    (k): k is string => typeof k === "string" && k.length > 0,
  );

  if (mode === "url" && !url) {
    return NextResponse.json(
      { error: "URL mode requires a `url`" },
      { status: 400 },
    );
  }
  if (mode === "scratch" && !businessName) {
    return NextResponse.json(
      { error: "Scratch mode requires a `businessName`" },
      { status: 400 },
    );
  }

  // For scratch mode, we may have pre-uploaded files. The /api/admin/uploads
  // endpoint generated a jobId at upload time; if the caller passed it back,
  // re-use the same job so the uploaded files are co-located.
  let job = body.jobId ? await readIntakeJob(body.jobId) : null;
  if (!job) {
    job = await createIntakeJob({
      source_url: url || undefined,
      business_name: businessName || undefined,
      notes: [notes, serviceArea ? `Service area: ${serviceArea}` : ""]
        .filter(Boolean)
        .join("\n\n") || undefined,
    });
  }

  // Seed findings with admin-provided socials + uploaded asset keys before
  // the pipeline starts. Discovery agents merge into findings; pre-seeding
  // means brand-profile/freeform see them even though no agent "produced"
  // them.
  const seededFindings = {
    ...(job.findings ?? {}),
    socials: body.socials,
    uploadedAssetKeys: uploadKeys.length > 0 ? uploadKeys : undefined,
    // Also expose uploads as assetKeys so the curator treats them as
    // customer photos.
    assetKeys: [...(job.findings?.assetKeys ?? []), ...uploadKeys],
  };
  await updateIntakeJob(job.id, { findings: seededFindings });

  try {
    await runPipeline(job.id, { awaitCompletion: true });
    return NextResponse.json({ id: job.id, status: "ready" }, { status: 200 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Pipeline failed before producing a preview.";
    await updateIntakeJob(job.id, { status: "failed", error: message }).catch(
      () => {},
    );
    return NextResponse.json(
      { id: job.id, status: "failed", error: message },
      { status: 500 },
    );
  }
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit 2>&1 | grep -E "admin/start/route\.ts" || echo "no errors"`
Expected: `no errors`.

- [ ] **Step 3: Commit**

```bash
git add src/app/api/admin/start/route.ts
git commit -m "feat(admin): add admin-gated POST /api/admin/start route"
```

---

### Task 5: Update the admin form with mode toggle + scratch fields

**Files:**
- Modify: `src/app/admin/_components/AdminBuildForm.tsx`

This is the largest UI change. It rewrites the existing form to support two modes via a tab toggle. The URL mode preserves the exact existing behavior (POSTing to public `/api/start`). The scratch mode renders new fields and POSTs to `/api/admin/start`.

- [ ] **Step 1: Replace the entire file**

Replace `src/app/admin/_components/AdminBuildForm.tsx` with:

```tsx
"use client";

import { useState, type FormEvent, type ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

type StartResponse = {
  id?: string;
  status: string;
  error?: string;
};

type UploadResponse = {
  jobId?: string;
  keys?: string[];
  error?: string;
};

type Mode = "url" | "scratch";

export function AdminBuildForm() {
  const router = useRouter();
  const [mode, setMode] = useState<Mode>("url");

  // shared state
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // URL mode
  const [url, setUrl] = useState("");

  // scratch mode
  const [businessName, setBusinessName] = useState("");
  const [serviceArea, setServiceArea] = useState("");
  const [scratchNotes, setScratchNotes] = useState("");
  const [facebook, setFacebook] = useState("");
  const [instagram, setInstagram] = useState("");
  const [yelp, setYelp] = useState("");
  const [linkedin, setLinkedin] = useState("");
  const [files, setFiles] = useState<File[]>([]);
  const [uploadedKeys, setUploadedKeys] = useState<string[]>([]);
  const [scratchJobId, setScratchJobId] = useState<string | null>(null);

  // ---- URL mode ----
  async function onSubmitUrl(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const res = await fetch("/api/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: url.trim() }),
      });
      const data = (await res.json()) as StartResponse;
      if (!res.ok || !data.id) {
        setError(data.error ?? `Pipeline failed (${res.status})`);
        setBusy(false);
        return;
      }
      setBusy(false);
      router.push(`/preview/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
      setBusy(false);
    }
  }

  // ---- Scratch mode: file upload pre-step ----
  async function onFilesChange(e: ChangeEvent<HTMLInputElement>) {
    const incoming = Array.from(e.target.files ?? []);
    setFiles(incoming);
    setUploadedKeys([]); // reset; previous uploads no longer match selection
  }

  async function uploadFiles(): Promise<{ jobId: string; keys: string[] } | null> {
    if (files.length === 0) return { jobId: scratchJobId ?? "", keys: [] };
    const form = new FormData();
    if (scratchJobId) form.set("jobId", scratchJobId);
    files.forEach((f) => form.append("files", f));

    const res = await fetch("/api/admin/uploads", {
      method: "POST",
      body: form,
    });
    const data = (await res.json()) as UploadResponse;
    if (!res.ok || !data.jobId || !data.keys) {
      setError(data.error ?? `Upload failed (${res.status})`);
      return null;
    }
    setScratchJobId(data.jobId);
    setUploadedKeys(data.keys);
    return { jobId: data.jobId, keys: data.keys };
  }

  async function onSubmitScratch(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setBusy(true);
    setError(null);

    // 1. Upload files if any are selected and not yet uploaded
    let uploadResult = uploadedKeys.length > 0
      ? { jobId: scratchJobId ?? "", keys: uploadedKeys }
      : null;
    if (files.length > 0 && uploadedKeys.length === 0) {
      uploadResult = await uploadFiles();
      if (!uploadResult) {
        setBusy(false);
        return;
      }
    }

    // 2. Submit the no-URL pipeline kickoff
    try {
      const res = await fetch("/api/admin/start", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode: "scratch",
          jobId: uploadResult?.jobId || undefined,
          businessName: businessName.trim(),
          serviceArea: serviceArea.trim(),
          notes: scratchNotes.trim(),
          socials: {
            facebook: facebook.trim() || undefined,
            instagram: instagram.trim() || undefined,
            yelp: yelp.trim() || undefined,
            linkedin: linkedin.trim() || undefined,
          },
          uploadKeys: uploadResult?.keys ?? [],
        }),
      });
      const data = (await res.json()) as StartResponse;
      if (!res.ok || !data.id) {
        setError(data.error ?? `Pipeline failed (${res.status})`);
        setBusy(false);
        return;
      }
      setBusy(false);
      router.push(`/preview/${data.id}`);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Network error");
      setBusy(false);
    }
  }

  // ---- shared error block ----
  const errorBlock = error ? (
    <p
      role="alert"
      className="rounded border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-800"
    >
      {error}
    </p>
  ) : null;

  return (
    <div className="space-y-8">
      {/* Mode toggle */}
      <div className="flex gap-2 border-b border-stone-200">
        <button
          type="button"
          onClick={() => {
            setMode("url");
            setError(null);
          }}
          disabled={busy}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            mode === "url"
              ? "border-b-2 border-stone-900 text-stone-900"
              : "text-stone-500 hover:text-stone-700"
          }`}
        >
          I have a URL
        </button>
        <button
          type="button"
          onClick={() => {
            setMode("scratch");
            setError(null);
          }}
          disabled={busy}
          className={`px-4 py-2 text-sm font-medium transition-colors ${
            mode === "scratch"
              ? "border-b-2 border-stone-900 text-stone-900"
              : "text-stone-500 hover:text-stone-700"
          }`}
        >
          From scratch
        </button>
      </div>

      {/* URL mode form */}
      {mode === "url" && (
        <form onSubmit={onSubmitUrl} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="admin-url">Customer URL</Label>
            <Input
              id="admin-url"
              type="url"
              placeholder="https://acmeplumbing.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={busy}
              required
            />
          </div>

          {errorBlock}

          <Button
            type="submit"
            disabled={busy || !url.trim()}
            className="w-full"
          >
            {busy ? "Starting pipeline…" : "Build a refreshed site"}
          </Button>
        </form>
      )}

      {/* Scratch mode form */}
      {mode === "scratch" && (
        <form onSubmit={onSubmitScratch} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="scratch-business">Business name</Label>
            <Input
              id="scratch-business"
              type="text"
              placeholder="Acme Plumbing"
              value={businessName}
              onChange={(e) => setBusinessName(e.target.value)}
              disabled={busy}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="scratch-area">Service area</Label>
            <Input
              id="scratch-area"
              type="text"
              placeholder="South Hills, Pittsburgh"
              value={serviceArea}
              onChange={(e) => setServiceArea(e.target.value)}
              disabled={busy}
            />
            <p className="text-xs text-stone-500">
              Helps Google Places find the right business.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="scratch-notes">What does the business do?</Label>
            <Textarea
              id="scratch-notes"
              rows={4}
              placeholder="Family-owned plumbing, 24/7 emergency, trenchless sewer specialty…"
              value={scratchNotes}
              onChange={(e) => setScratchNotes(e.target.value)}
              disabled={busy}
            />
          </div>

          <fieldset className="space-y-3 rounded border border-stone-200 p-4">
            <legend className="px-1 text-xs uppercase tracking-widest text-stone-500">
              Social URLs (optional)
            </legend>
            <div className="space-y-2">
              <Label htmlFor="scratch-fb">Facebook</Label>
              <Input
                id="scratch-fb"
                type="url"
                placeholder="https://facebook.com/acmeplumbing"
                value={facebook}
                onChange={(e) => setFacebook(e.target.value)}
                disabled={busy}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scratch-ig">Instagram</Label>
              <Input
                id="scratch-ig"
                type="url"
                placeholder="https://instagram.com/acmeplumbing"
                value={instagram}
                onChange={(e) => setInstagram(e.target.value)}
                disabled={busy}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scratch-yelp">Yelp</Label>
              <Input
                id="scratch-yelp"
                type="url"
                value={yelp}
                onChange={(e) => setYelp(e.target.value)}
                disabled={busy}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="scratch-li">LinkedIn</Label>
              <Input
                id="scratch-li"
                type="url"
                value={linkedin}
                onChange={(e) => setLinkedin(e.target.value)}
                disabled={busy}
              />
            </div>
          </fieldset>

          <div className="space-y-2">
            <Label htmlFor="scratch-files">Upload photos / logo</Label>
            <input
              id="scratch-files"
              type="file"
              accept="image/*"
              multiple
              onChange={onFilesChange}
              disabled={busy}
              className="block w-full text-sm text-stone-700 file:mr-4 file:rounded-md file:border-0 file:bg-stone-100 file:px-4 file:py-2 file:text-sm file:font-medium file:text-stone-800 hover:file:bg-stone-200 disabled:opacity-50"
            />
            {files.length > 0 && (
              <p className="text-xs text-stone-500">
                {files.length} file{files.length === 1 ? "" : "s"} selected
                {uploadedKeys.length > 0 && ` · ${uploadedKeys.length} uploaded`}
              </p>
            )}
          </div>

          {errorBlock}

          <Button
            type="submit"
            disabled={busy || !businessName.trim()}
            className="w-full"
          >
            {busy ? "Starting pipeline…" : "Build from scratch"}
          </Button>

          <p className="text-xs text-stone-500">
            Pipeline takes ~5–10 minutes. The preview link opens automatically
            when ready.
          </p>
        </form>
      )}
    </div>
  );
}
```

- [ ] **Step 2: Lint + typecheck**

Run: `npm run lint && npx tsc --noEmit 2>&1 | grep -E "AdminBuildForm" || echo "no errors in form"`
Expected: `no errors in form`. If lint flags `react/no-unescaped-entities` apostrophes, replace with `&apos;` (same approach as Plan 1).

- [ ] **Step 3: Commit**

```bash
git add src/app/admin/_components/AdminBuildForm.tsx
git commit -m "feat(admin): add scratch-mode form (uploads + socials + Google) to /admin"
```

---

### Task 6: Wire Google Place data + uploads into the brand-profile prompt

**Files:**
- Modify: `src/lib/pipeline/agents/synthesis/brand-profile.ts` (the `buildPrompt` function only)

- [ ] **Step 1: Find the function**

Open `src/lib/pipeline/agents/synthesis/brand-profile.ts` and find the `buildPrompt` function (it builds the user prompt for Gemini from `findings`).

- [ ] **Step 2: Add Google Place + socials sections**

In `buildPrompt`, after the `findings.detectedVoice` block and before `findings.pages`, insert:

```ts
  if (findings.googlePlace) {
    const gp = findings.googlePlace;
    lines.push(`\nGoogle Place data:`);
    lines.push(`  Name: ${gp.name}`);
    if (gp.primaryType) lines.push(`  Type: ${gp.primaryType}`);
    if (gp.formattedAddress) lines.push(`  Address: ${gp.formattedAddress}`);
    if (gp.phone) lines.push(`  Phone: ${gp.phone}`);
    if (gp.hours?.length) {
      lines.push(`  Hours:`);
      gp.hours.forEach((h) => lines.push(`    ${h}`));
    }
    if (gp.rating) lines.push(`  Rating: ${gp.rating} (${gp.userRatingCount ?? 0} reviews)`);
    if (gp.editorialSummary) lines.push(`  Editorial summary: ${gp.editorialSummary}`);
  }

  if (findings.socials) {
    const s = findings.socials;
    const lines2: string[] = [];
    if (s.facebook) lines2.push(`Facebook: ${s.facebook}`);
    if (s.instagram) lines2.push(`Instagram: ${s.instagram}`);
    if (s.yelp) lines2.push(`Yelp: ${s.yelp}`);
    if (s.linkedin) lines2.push(`LinkedIn: ${s.linkedin}`);
    if (lines2.length > 0) {
      lines.push(`\nSocial profiles (URLs only, content not yet scraped):`);
      lines2.forEach((l) => lines.push(`  ${l}`));
    }
  }
```

- [ ] **Step 3: Typecheck**

Run: `npx tsc --noEmit 2>&1 | grep -E "brand-profile\.ts" || echo "no errors"`
Expected: `no errors`.

- [ ] **Step 4: Commit**

```bash
git add src/lib/pipeline/agents/synthesis/brand-profile.ts
git commit -m "feat(pipeline): include Google Place + socials in brand-profile prompt"
```

---

### Task 7: Wire Google Place data into the freeform building prompt

**Files:**
- Modify: `src/lib/pipeline/agents/building/freeform.ts` (the `buildUserPrompt` function only)

- [ ] **Step 1: Add Google Place section**

In `buildUserPrompt`, after the `## Brand` JSON block and before the `## Available assets` block, insert:

```ts
  if (findings.googlePlace) {
    const gp = findings.googlePlace;
    lines.push(`## Public business data (Google)`);
    lines.push("");
    lines.push(`Use these facts in headers, footers, and contact sections. Do NOT invent contact info beyond what's listed here.`);
    lines.push("");
    if (gp.formattedAddress) lines.push(`- Address: ${gp.formattedAddress}`);
    if (gp.phone) lines.push(`- Phone: ${gp.phone}`);
    if (gp.website) lines.push(`- Website: ${gp.website}`);
    if (gp.hours?.length) {
      lines.push(`- Hours:`);
      gp.hours.forEach((h) => lines.push(`  - ${h}`));
    }
    if (gp.rating)
      lines.push(`- Rating: ${gp.rating}/5 from ${gp.userRatingCount ?? 0} reviews`);
    if (gp.editorialSummary) lines.push(`- Editorial summary: ${gp.editorialSummary}`);
    lines.push("");
  }
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit 2>&1 | grep -E "freeform\.ts" || echo "no errors"`
Expected: `no errors`.

- [ ] **Step 3: Commit**

```bash
git add src/lib/pipeline/agents/building/freeform.ts
git commit -m "feat(pipeline): include Google Place facts in freeform builder prompt"
```

---

### Task 8: End-to-end browser verification (USER)

This task cannot be done by a subagent — it requires your Clerk session, file picker, and browser.

**Pre-flight:**
- Plan 1 verification (URL mode) passed
- `GOOGLE_PLACES_API_KEY` is set in `.env.local`
- `npm run dev` is running

- [ ] **Step 1: URL mode regression**

Open `/admin`. Click "I have a URL". Submit `https://example.com`.
Expected: still works exactly as in Plan 1 — lands on `/preview/<id>`.

- [ ] **Step 2: Scratch mode — minimal**

Click "From scratch". Fill in:
- Business name: any local business you can verify on Google (e.g. "Cirigliano Plumbing")
- Service area: their city
- Leave socials + uploads empty

Submit.

Expected:
- Lands on `/preview/<id>` after pipeline runs
- The preview shows real address + phone from Google
- The preview shows photos sourced from Google Places (download verifiable in Linode under `customer-<id>/assets/`)

- [ ] **Step 3: Scratch mode — with uploads**

Repeat Step 2 but also upload 3 photos and a logo. Submit.

Expected:
- Files upload first (you'll see "3 uploaded" near the file picker)
- Pipeline runs
- Preview HTML uses the uploaded photos via `/api/asset/...` URLs
- Linode has the files at `customer-<id>/uploads/`

- [ ] **Step 4: Scratch mode — non-existent business**

Enter a fake business name + fake address (e.g. "Florbnar Quim" in "Mars").

Expected:
- Pipeline still completes (Google agent reports "no matching place" and degrades)
- Preview is sparser but renders something based on the notes
- No 500 error

- [ ] **Step 5: Admin gate**

In an incognito window, try `POST /api/admin/uploads` and `POST /api/admin/start` directly with `curl`.

```bash
curl -X POST http://localhost:3000/api/admin/start \
  -H "Content-Type: application/json" \
  -d '{"mode":"scratch","businessName":"Test"}' -i
```

Expected: HTTP 403 (Forbidden) — admin gate working.

---

## Self-Review

- **Spec coverage:**
  - (1) Two-mode admin form — Task 5
  - (2) File uploads — Tasks 2, 5, 8 step 3
  - (3) Google Places integration — Tasks 1, 3, 6, 7, 8 steps 2–4
  - (4) Social URLs (simple, store-only) — Tasks 5, 6
  - (5) Admin gate on new endpoints — Tasks 2, 4
  - (6) Synthesis + building prompts updated — Tasks 6, 7
  ✅ All requirements covered.

- **Placeholder scan:** No `TBD` / `implement later` / "appropriate handling" phrases. Every code step shows the exact code; every command step shows the exact command + expected output.

- **Type consistency:** `Findings.googlePlace` shape (Task 1) is read by `brand-profile.ts` (Task 6) and `freeform.ts` (Task 7) — fields match. `uploadedAssetKeys` field name (Task 1) is consumed by `/api/admin/start` (Task 4). The form's `uploadKeys` body field (Task 5) maps to `Body.uploadKeys` in the route handler (Task 4) — names align.

---

## Known Gaps (intentional)

1. **Social media is store-only in v1.** No actual Facebook/Instagram/Yelp content fetching — admin pasting a URL only stores it for the brand-profile prompt to mention. A real `socialAgent` is a follow-up. Matches the user's "simple for now" instruction.
2. **`/api/admin/uploads` is a single endpoint, not a per-job presigned-URL flow.** Suitable for ~12 files at a time. If admins start uploading hundreds of photos, switch to presigned PUT URLs.
3. **No image preview thumbnails in the form.** Admins see only the file count, not previews. Easy follow-up if needed.
4. **No "delete uploaded file" action.** If an admin uploads the wrong photo, they can't undo within the form — they'd cancel and start over. Fine for v1.
5. **Google Places photos counted as `assetKeys`.** They go through the same curator + freeform asset whitelist as crawled images. This is intentional but means a customer with no photos still gets Place photos in their bespoke site. If a customer specifically doesn't want those, the brand-profile/freeform prompt would need a rule.
6. **Crawler agent's no-URL branch was NOT widened in this plan** (it was originally Task 7 in my draft but I cut it — the brand-profile + freeform prompt updates already pull from `findings.googlePlace` and `findings.socials` directly, so the crawler's notes-page fabrication doesn't need to mirror them).
