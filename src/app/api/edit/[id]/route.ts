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

  let body: { html?: string };
  try {
    body = (await req.json()) as { html?: string };
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

  await updateIntakeJob(id, {
    generated_html: body.html,
    findings: { ...(job.findings ?? {}), generatedHtml: body.html },
  });

  return NextResponse.json({ ok: true });
}
