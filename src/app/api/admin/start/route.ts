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

  const seededFindings = {
    ...(job.findings ?? {}),
    socials: body.socials,
    uploadedAssetKeys: uploadKeys.length > 0 ? uploadKeys : undefined,
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
