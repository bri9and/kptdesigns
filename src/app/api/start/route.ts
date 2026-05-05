/**
 * POST /api/start — kicks off the multi-agent preview pipeline.
 *
 *   1. Validates input (URL or notes required).
 *   2. Creates an anonymous intake job.
 *   3. Kicks off the pipeline runner. The runner orchestrates the
 *      three phases (discovery → synthesis → building) across the
 *      registered agents and updates the job's `phase` + `stages`
 *      fields as it goes.
 *   4. Returns the job id immediately. Client polls /api/start/[id]
 *      (or just reads /preview/[id]) to watch progress and pick up
 *      the final puck_data.
 *
 * Pipeline runs synchronously inside the function for now — Vercel's
 * 300s default ceiling is enough for the current path. When we add
 * Playwright + image processing the wall-clock will exceed that and
 * we'll move the runner to a Vercel Sandbox or Queue worker.
 */
import { NextResponse } from "next/server";

import { createIntakeJob, updateIntakeJob } from "@/lib/intake-store";
import { runPipeline } from "@/lib/pipeline/runner";

export const maxDuration = 300;
export const runtime = "nodejs";

type StartRequestBody = {
  url?: string;
  businessName?: string;
  notes?: string;
};

export async function POST(req: Request) {
  let body: StartRequestBody;
  try {
    body = (await req.json()) as StartRequestBody;
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const url = typeof body.url === "string" ? body.url.trim() : "";
  const businessName =
    typeof body.businessName === "string" ? body.businessName.trim() : "";
  const notes = typeof body.notes === "string" ? body.notes.trim() : "";

  if (!url && !notes) {
    return NextResponse.json(
      {
        error:
          "Need at least a URL or a description of your business to build a preview.",
      },
      { status: 400 },
    );
  }

  let job: Awaited<ReturnType<typeof createIntakeJob>>;
  try {
    job = await createIntakeJob({
      source_url: url || undefined,
      business_name: businessName || undefined,
      notes: notes || undefined,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Could not create intake job.";
    return NextResponse.json(
      { status: "failed", error: message },
      { status: 500 },
    );
  }

  try {
    // Synchronous run for now — see header doc.
    await runPipeline(job.id, { awaitCompletion: true });
    return NextResponse.json({ id: job.id, status: "ready" }, { status: 200 });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Pipeline failed before producing a preview.";
    try {
      await updateIntakeJob(job.id, { status: "failed", error: message });
    } catch {
      /* swallow */
    }
    return NextResponse.json(
      { id: job.id, status: "failed", error: message },
      { status: 500 },
    );
  }
}
