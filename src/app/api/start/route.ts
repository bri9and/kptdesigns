/**
 * POST /api/start
 *
 * Drives the self-serve preview pipeline:
 *   1. Create an anonymous intake job
 *   2. Scrape the URL (or skip if from-scratch)
 *   3. Generate a Puck content tree with Claude
 *   4. Persist + return the job id
 *
 * Synchronous because Vercel function timeout is 300s by default,
 * which gives Claude plenty of room.
 */
import { NextResponse } from "next/server";

import { scrape, ScrapeError } from "@/lib/scraper";
import { generateSite } from "@/lib/ai/site-generator";
import {
  createIntakeJob,
  updateIntakeJob,
  type ScrapedSnapshot,
} from "@/lib/intake-store";

// Give the function the full headroom — Claude can take 30-60s per call.
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
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 },
    );
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

  // Create the job first so we have an id to attach errors to.
  // If even this fails (e.g. Supabase unreachable), there's no job id yet —
  // surface a clean JSON error instead of letting Next.js 500 with no body.
  let job: Awaited<ReturnType<typeof createIntakeJob>>;
  try {
    job = await createIntakeJob({
      source_url: url || undefined,
      business_name: businessName || undefined,
      notes: notes || undefined,
    });
  } catch (err) {
    const message =
      err instanceof Error ? err.message : "Could not create intake job.";
    return NextResponse.json(
      { status: "failed", error: message },
      { status: 500 },
    );
  }

  try {
    let scraped: ScrapedSnapshot;

    if (url) {
      await updateIntakeJob(job.id, { status: "scraping" });
      scraped = await scrape(url);
      await updateIntakeJob(job.id, { scraped, status: "generating" });
    } else {
      // From-scratch path — no source site to scrape, just feed the AI
      // the customer's free-text description as the "page content".
      scraped = {
        url: "",
        finalUrl: "",
        status: 0,
        title: businessName || undefined,
        description: undefined,
        ogImage: undefined,
        textSummary: notes,
        headings: [],
        links: [],
        images: [],
      };
      await updateIntakeJob(job.id, {
        scraped,
        status: "generating",
      });
    }

    const result = await generateSite(scraped, {
      businessName: businessName || undefined,
      notes: notes || undefined,
    });

    await updateIntakeJob(job.id, {
      puck_data: result.puckData,
      business_summary: result.businessSummary,
      raw_ai: result.raw,
      status: "ready",
    });

    return NextResponse.json({ id: job.id, status: "ready" }, { status: 200 });
  } catch (err) {
    const message =
      err instanceof ScrapeError
        ? err.message
        : err instanceof Error
          ? err.message
          : "Something went wrong generating your preview.";

    // Best-effort persist the failure — don't let a write error mask the original.
    try {
      await updateIntakeJob(job.id, { status: "failed", error: message });
    } catch {
      // swallow — we still want to surface the original error to the client
    }

    return NextResponse.json(
      { id: job.id, status: "failed", error: message },
      { status: 500 },
    );
  }
}
