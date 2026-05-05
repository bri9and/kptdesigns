/**
 * PATCH /api/edit/[id]
 *
 * Persists the studio editor's edited HTML back onto the intake job's
 * `generated_html` field. Body: { html: string }.
 *
 * No auth gate yet — same anonymous flow as /api/start. When we wire
 * Clerk-based "claim" we'll require ownership.
 */
import { NextResponse } from "next/server";
import { readIntakeJob, updateIntakeJob } from "@/lib/intake-store";

export const runtime = "nodejs";

const MAX_HTML_BYTES = 200_000; // 200KB ceiling — generated sites are typically 10–30KB

export async function PATCH(
  req: Request,
  ctx: { params: Promise<{ id: string }> },
) {
  const { id } = await ctx.params;

  let body: { html?: string; brandProfile?: Record<string, unknown> };
  try {
    body = (await req.json()) as typeof body;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  if (!body.html || typeof body.html !== "string") {
    return NextResponse.json({ error: "html is required" }, { status: 400 });
  }
  if (body.html.length > MAX_HTML_BYTES) {
    return NextResponse.json(
      { error: `html too large (${body.html.length} > ${MAX_HTML_BYTES} bytes)` },
      { status: 413 },
    );
  }

  const job = await readIntakeJob(id);
  if (!job) {
    return NextResponse.json({ error: "Job not found" }, { status: 404 });
  }
  if (job.status !== "ready") {
    return NextResponse.json(
      { error: "Site not ready to edit" },
      { status: 409 },
    );
  }

  const findings = job.findings ?? {};
  // Merge any brand profile edits (business name / palette / fonts / voice)
  // alongside the HTML so a reload of the studio reflects the user's changes
  // in the sidebar as well as the canvas.
  const mergedProfile = body.brandProfile
    ? deepMerge(findings.brandProfile ?? {}, body.brandProfile)
    : findings.brandProfile;

  await updateIntakeJob(id, {
    generated_html: body.html,
    business_name:
      typeof body.brandProfile?.businessName === "string"
        ? (body.brandProfile.businessName as string)
        : job.business_name,
    findings: {
      ...findings,
      generatedHtml: body.html,
      ...(mergedProfile ? { brandProfile: mergedProfile as typeof findings.brandProfile } : {}),
    },
  });

  return NextResponse.json({ ok: true });
}

function deepMerge<T extends Record<string, unknown>>(base: T, patch: Record<string, unknown>): T {
  const out: Record<string, unknown> = { ...base };
  for (const [k, v] of Object.entries(patch)) {
    if (v === undefined) continue;
    if (
      v !== null &&
      typeof v === "object" &&
      !Array.isArray(v) &&
      typeof out[k] === "object" &&
      out[k] !== null &&
      !Array.isArray(out[k])
    ) {
      out[k] = deepMerge(out[k] as Record<string, unknown>, v as Record<string, unknown>);
    } else {
      out[k] = v;
    }
  }
  return out as T;
}
