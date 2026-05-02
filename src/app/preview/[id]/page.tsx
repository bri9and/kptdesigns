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
import { buildThemeVars, buildGoogleFontsHref } from "@/lib/pipeline/agents/building/theme";
import { allAgents } from "@/lib/pipeline/agents";
import type { StageId, StageStatus } from "@/lib/pipeline/types";
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
    job && (
      job.status === "pending" ||
      job.status === "running" ||
      job.status === "scraping" ||
      job.status === "generating"
    );
  const titleBase = job?.business_name || job?.source_url || "Your preview";
  return {
    title: job?.status === "ready" ? `${titleBase} — Preview` : "Preparing your preview…",
    robots: { index: false, follow: false },
    ...(inProgress
      ? { other: { refresh: "3" } }
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

  // Apply the customer's brand: theme vars override the brand-* CSS variables
  // for the rendered Puck tree (the surrounding chrome stays in the KPT
  // earthy palette by leaving the page-level :root values untouched).
  const profile = job.findings?.brandProfile;
  const themeStyle = profile
    ? buildThemeVars(profile.palette, profile.fonts)
    : null;
  const fontsHref = profile ? buildGoogleFontsHref(profile.fonts) : null;

  return (
    <>
      {fontsHref ? (
        <link
          rel="stylesheet"
          href={fontsHref}
          // eslint-disable-next-line @next/next/no-css-tags
          key={fontsHref}
        />
      ) : null}

      {/* Sticky preview banner — KPT chrome, NOT customer brand. Sits just
          below the global EarthyNav (h-16). */}
      <div className="sticky top-16 z-40 border-b border-brand-primary-strong bg-brand-primary/95 text-brand-canvas backdrop-blur-sm">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <span className="font-[family-name:var(--brand-mono-font)] text-[11px] uppercase tracking-[0.18em] text-brand-canvas/85">
              Preview
            </span>
            <span className="truncate font-[family-name:var(--brand-display-font)] text-[14px] text-brand-canvas">
              {headerLabel}
            </span>
          </div>
          <BtnPrimary
            href={claimHref}
            className="bg-brand-ink text-brand-canvas hover:bg-brand-text-strong hover:shadow-none"
          >
            Make this mine — $500
          </BtnPrimary>
        </div>
      </div>

      {/* The actual generated tree, wrapped with the customer's brand vars
          so every brand-* token inside resolves to THEIR colors and fonts. */}
      <main
        className="customer-brand-themed"
        style={themeStyle as React.CSSProperties | undefined}
      >
        <PreviewRenderer data={job.puck_data} />
      </main>

      {/* Final big CTA — back to KPT brand */}
      <CtaSection
        label="Like what you see?"
        title="Make this site yours, today."
        body="$500 to claim this preview, unlock the editor, register your domain, and ship to production. No subscription required — host with us or take the code anywhere."
        primary={{ href: claimHref, label: "Claim this preview" }}
        secondary={{ href: "/start", label: "Try a different URL" }}
      />

      {/* Quiet disclosure */}
      <p className="mx-auto max-w-[720px] px-6 py-12 text-center font-[family-name:var(--brand-body-font)] text-sm leading-relaxed text-brand-text-strong">
        Preview generated by our discovery + synthesis + building agents. The real version
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
    <div className="flex min-h-screen items-center justify-center bg-brand-canvas px-6">
      <div className="w-full max-w-[480px] rounded-2xl border border-brand-divider bg-brand-canvas p-10 text-center shadow-[0_1px_2px_rgba(45,36,27,0.04)]">
        <h1 className="mb-3 font-[family-name:var(--brand-serif-font)] text-[clamp(1.6rem,3vw,2.25rem)] font-normal leading-tight text-brand-ink">
          Preview not found
        </h1>
        <p className="mb-7 text-[1rem] text-brand-text">
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
  running: { title: "Building your preview…" },
  scraping: { title: "Reading your site…" },
  generating: { title: "Composing your preview…" },
  failed: { title: "Something went wrong." },
  ready: { title: "Ready" },
};

const PHASE_COPY: Record<string, string> = {
  discovery: "Discovery — sending agents to read your site",
  synthesis: "Synthesis — building your brand profile",
  building: "Building — composing the new site",
};

const DOT_DELAYS = ["0s", "0.2s", "0.4s", "0.6s"] as const;
const DOT_COLORS = [
  "bg-brand-primary",
  "bg-brand-accent-1",
  "bg-brand-accent-2",
  "bg-brand-accent-3",
] as const;

function PreviewStatus({ job }: { job: IntakeJob }) {
  const copy = STATUS_COPY[job.status];
  const isFailed = job.status === "failed";
  const phaseLabel = job.phase ? PHASE_COPY[job.phase] ?? null : null;

  return (
    <div className="flex min-h-screen items-center justify-center bg-brand-canvas px-6 py-16">
      <div className="w-full max-w-[640px] rounded-2xl border border-brand-divider bg-brand-canvas p-10 text-center shadow-[0_1px_2px_rgba(45,36,27,0.04)]">
        <h1 className="mb-4 font-[family-name:var(--brand-serif-font)] text-[clamp(1.6rem,3vw,2.25rem)] font-normal italic leading-tight text-brand-ink">
          {copy.title}
        </h1>
        {phaseLabel && !isFailed ? (
          <p className="mb-6 font-[family-name:var(--brand-mono-font)] text-[11px] uppercase tracking-[0.2em] text-brand-primary">
            {phaseLabel}
          </p>
        ) : null}
        {!isFailed ? (
          <p className="mb-6 text-[1rem] text-brand-text">
            We&rsquo;ll auto-refresh as the agents finish.
          </p>
        ) : null}
        {isFailed && job.error ? (
          <p className="mb-6 break-words font-[family-name:var(--brand-mono-font)] text-sm text-brand-text-muted">
            {job.error}
          </p>
        ) : null}

        {!isFailed && job.stages ? (
          <StageList stages={job.stages} />
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

function StageList({ stages }: { stages: Partial<Record<StageId, StageStatus>> }) {
  return (
    <ul className="mx-auto mt-4 flex max-w-[480px] flex-col gap-2 text-left">
      {allAgents.map((agent) => {
        const s = stages[agent.stage];
        const state = s?.state ?? "pending";
        return (
          <li
            key={agent.stage}
            className="flex items-center justify-between gap-3 rounded-lg border border-brand-divider-soft bg-brand-canvas px-3 py-2"
          >
            <div className="min-w-0 flex-1">
              <p className="truncate text-[13px] font-medium text-brand-ink">
                {agent.label}
              </p>
              {s?.note ? (
                <p className="truncate text-[11px] text-brand-text-muted">{s.note}</p>
              ) : null}
              {s?.error ? (
                <p className="truncate text-[11px] text-brand-text-muted">{s.error}</p>
              ) : null}
            </div>
            <StageBadge state={state} />
          </li>
        );
      })}
    </ul>
  );
}

function StageBadge({ state }: { state: StageStatus["state"] }) {
  const map: Record<StageStatus["state"], { dot: string; label: string }> = {
    pending: { dot: "bg-brand-divider", label: "Waiting" },
    running: { dot: "bg-brand-accent-1 animate-pulse", label: "Working" },
    done: { dot: "bg-brand-accent-3", label: "Done" },
    skipped: { dot: "bg-brand-divider", label: "Skipped" },
    failed: { dot: "bg-brand-primary", label: "Failed" },
  };
  const { dot, label } = map[state];
  return (
    <span className="flex shrink-0 items-center gap-1.5 font-[family-name:var(--brand-mono-font)] text-[10px] uppercase tracking-[0.15em] text-brand-text-muted">
      <span className={`block h-1.5 w-1.5 rounded-full ${dot}`} />
      {label}
    </span>
  );
}
