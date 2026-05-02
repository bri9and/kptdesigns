/**
 * /preview/[id] — the AI-generated boutique website preview.
 *
 * This is the payoff of the self-serve intake funnel. The customer
 * arrives from /start after their site has been scraped + composed by
 * Claude into a Puck content tree stored in Supabase Storage. We fetch
 * that tree, render it as a real scrollable page, sandwich a "Preview"
 * banner on top + a "Make this mine — $500" CTA on bottom, and let the
 * boutique-quality blocks do the selling.
 *
 * Server Component so the Supabase fetch happens on the edge, no JS
 * waterfall. The actual <Render /> call is delegated to a tiny client
 * component because Puck uses React contexts internally.
 */
import type { Metadata } from "next";

import { readIntakeJob, type IntakeJob } from "@/lib/intake-store";
import { BtnPrimary } from "@/components/earthy/button";
import { CtaSection } from "@/components/earthy/cta-section";
import { PreviewRenderer } from "./PreviewRenderer";

type PageProps = { params: Promise<{ id: string }> };

/**
 * For in-progress states we want the page to auto-poll without JS.
 * generateMetadata runs per-request so we can decide whether to inject
 * the meta refresh based on the current job status.
 */
/** Defensive read — Supabase Storage can throw on transient network or
 * bucket-creation failures. We want those to land in the "not found"
 * branch (which still 200s) instead of bubbling to a 500. */
async function safeReadIntakeJob(id: string): Promise<IntakeJob | null> {
  try {
    return await readIntakeJob(id);
  } catch {
    return null;
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const job = await safeReadIntakeJob(id);
  const inProgress =
    job && (job.status === "pending" || job.status === "scraping" || job.status === "generating");
  const titleBase = job?.business_name || job?.source_url || "Your preview";
  return {
    title: job?.status === "ready" ? `${titleBase} — Preview` : "Preparing your preview…",
    robots: { index: false, follow: false },
    ...(inProgress
      ? { other: { refresh: "2" } }
      : {}),
  };
}

export default async function PreviewPage({ params }: PageProps) {
  const { id } = await params;
  const job = await safeReadIntakeJob(id);

  // ----- A) Job missing / null -------------------------------------------
  if (!job) {
    return <PreviewNotFound />;
  }

  // ----- B) Job not ready (pending / scraping / generating / failed) ----
  if (job.status !== "ready" || !job.puck_data) {
    return <PreviewStatus job={job} />;
  }

  // ----- C) Ready: render the preview -----------------------------------
  const headerLabel = job.source_url || job.business_name || "Your preview";
  const claimHref = `/contact?from=preview&id=${id}`;

  return (
    <>
      {/* Sticky preview banner — sits just below the global EarthyNav (h-16) */}
      <div className="sticky top-16 z-40 border-b border-earthy-orange-dark bg-earthy-orange/95 text-earthy-cream backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="font-[family-name:var(--font-earthy-mono)] text-[11px] uppercase tracking-[0.18em] text-earthy-cream/85">
              Preview
            </span>
            <span className="truncate font-[family-name:var(--font-earthy-display)] text-[14px] text-earthy-cream">
              {headerLabel}
            </span>
          </div>
          <BtnPrimary
            href={claimHref}
            className="bg-earthy-ink text-earthy-cream hover:bg-earthy-stone-700 hover:shadow-none"
          >
            Make this mine — $500
          </BtnPrimary>
        </div>
      </div>

      {/* The actual generated tree */}
      <main>
        <PreviewRenderer data={job.puck_data} />
      </main>

      {/* Final big CTA */}
      <CtaSection
        label="Like what you see?"
        title="Make this site yours, today."
        body="$500 to claim this preview, unlock the editor, register your domain, and ship to production. No subscription required — host with us or take the code anywhere."
        primary={{ href: claimHref, label: "Claim this preview" }}
        secondary={{ href: "/start", label: "Try a different URL" }}
      />

      {/* Quiet disclosure */}
      <p className="mx-auto max-w-[720px] px-6 py-12 text-center font-[family-name:var(--font-earthy-body)] text-sm leading-relaxed text-earthy-stone-700">
        This preview was AI-generated from your existing site in about 30 seconds. The real version
        we ship is hand-finished, custom-coded, and built around what your customers actually do.
      </p>
    </>
  );
}

/* ----------------------------------------------------------------- */
/* States A + B — small inline server components                     */
/* ----------------------------------------------------------------- */

function PreviewNotFound() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-earthy-cream px-6">
      <div className="w-full max-w-[480px] rounded-2xl border border-earthy-stone-200 bg-earthy-cream p-10 text-center shadow-[0_1px_2px_rgba(45,36,27,0.04)]">
        <h1 className="mb-3 font-[family-name:var(--font-earthy-serif)] text-[clamp(1.6rem,3vw,2.25rem)] font-normal leading-tight text-earthy-ink">
          Preview not found
        </h1>
        <p className="mb-7 text-[1rem] text-earthy-stone-600">
          It may have expired, or the link&rsquo;s wrong.
        </p>
        <div className="flex justify-center">
          <BtnPrimary href="/start">Build a new preview</BtnPrimary>
        </div>
      </div>
    </div>
  );
}

const STATUS_COPY: Record<IntakeJob["status"], { title: string; body?: string }> = {
  pending: { title: "Just a moment…" },
  scraping: { title: "Reading your site…" },
  generating: { title: "Composing your preview…" },
  failed: { title: "Something went wrong." },
  ready: { title: "Ready" },
};

const DOT_DELAYS = ["0s", "0.2s", "0.4s", "0.6s"] as const;
const DOT_COLORS = [
  "bg-earthy-orange",
  "bg-earthy-blue",
  "bg-earthy-amber",
  "bg-earthy-sage",
] as const;

function PreviewStatus({ job }: { job: IntakeJob }) {
  const copy = STATUS_COPY[job.status];
  const isFailed = job.status === "failed";

  return (
    <div className="flex min-h-screen items-center justify-center bg-earthy-cream px-6">
      <div className="w-full max-w-[520px] rounded-2xl border border-earthy-stone-200 bg-earthy-cream p-10 text-center shadow-[0_1px_2px_rgba(45,36,27,0.04)]">
        <h1 className="mb-4 font-[family-name:var(--font-earthy-serif)] text-[clamp(1.6rem,3vw,2.25rem)] font-normal italic leading-tight text-earthy-ink">
          {copy.title}
        </h1>
        {!isFailed ? (
          <p className="mb-2 text-[1rem] text-earthy-stone-600">
            We&rsquo;ll auto-refresh as soon as it&rsquo;s ready.
          </p>
        ) : null}
        {isFailed && job.error ? (
          <p className="mb-6 break-words font-[family-name:var(--font-earthy-mono)] text-sm text-earthy-stone-500">
            {job.error}
          </p>
        ) : null}
        {isFailed ? (
          <div className="mt-6 flex justify-center">
            <BtnPrimary href="/start">Try again</BtnPrimary>
          </div>
        ) : (
          <div className="mt-8 inline-flex justify-center gap-1.5">
            {DOT_COLORS.map((color, i) => (
              <span
                key={color}
                className={`block h-2 w-2 rounded-full ${color}`}
                style={{
                  animation: `earthyLoadPulse 1.2s ease-in-out ${DOT_DELAYS[i]} infinite`,
                }}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
