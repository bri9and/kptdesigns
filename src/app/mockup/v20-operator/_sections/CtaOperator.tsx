"use client";

import Link from "next/link";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--v20-cta-mono",
});

const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--v20-cta-sans",
});

const plexSerif = IBM_Plex_Serif({
  subsets: ["latin"],
  weight: ["400", "600"],
  variable: "--v20-cta-serif",
});

const CREAM = "#F4EFE0";
const INK = "#1A1A1A";
const IBM_BLUE = "#1D5CB6";
const IBM_BLUE_DEEP = "#13407F";
const SUB_RED = "#A4262C";
const AMBER = "#C9A30D";

export default function CtaOperator() {
  return (
    <section
      className={`${plexMono.variable} ${plexSans.variable} ${plexSerif.variable} relative w-full`}
      style={{ background: CREAM, color: INK }}
      aria-labelledby="v20-cta-heading"
    >
      {/* faint paper grain via layered radial gradients */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 30%, #1A1A1A 1px, transparent 1px), radial-gradient(circle at 70% 80%, #1A1A1A 1px, transparent 1px)",
          backgroundSize: "3px 3px, 5px 5px",
        }}
      />

      <div className="relative mx-auto max-w-3xl px-6 py-24 md:px-10 md:py-32">
        {/* page chrome — folio mark */}
        <div
          className="mb-10 flex items-center justify-between font-[family-name:var(--v20-cta-mono)] text-[11px] uppercase tracking-[0.18em]"
          style={{ color: INK, opacity: 0.6 }}
        >
          <span>KPT-2026-1 / FOLIO V</span>
          <span>SECTION 5.0</span>
          <span>PAGE 0042</span>
        </div>

        {/* Section header */}
        <header className="mb-10">
          <div
            className="mb-3 font-[family-name:var(--v20-cta-mono)] text-[11px] uppercase tracking-[0.22em]"
            style={{ color: SUB_RED }}
          >
            CHAPTER FIVE · CLOSING
          </div>
          <h2
            id="v20-cta-heading"
            className="font-[family-name:var(--v20-cta-sans)] text-2xl font-bold leading-tight md:text-3xl"
            style={{ color: INK, letterSpacing: "-0.005em" }}
          >
            5.0 SUMMARY · NEXT STEPS
          </h2>
          <div
            className="mt-4 h-[3px] w-full"
            style={{ background: IBM_BLUE }}
          />
          <div
            className="mt-[2px] h-[1px] w-full"
            style={{ background: IBM_BLUE, opacity: 0.4 }}
          />
        </header>

        {/* Body — manual prose */}
        <div className="font-[family-name:var(--v20-cta-serif)] text-[15px] leading-[1.75] md:text-base">
          <h3
            className="mb-4 font-[family-name:var(--v20-cta-sans)] text-base font-bold uppercase tracking-[0.06em]"
            style={{ color: INK }}
          >
            5.1 ACTION REQUIRED
          </h3>

          <p className="mb-5" style={{ color: INK }}>
            The Operator should now schedule an initial consultation. Two
            pathways are available:
          </p>

          <ol className="space-y-3 pl-0" style={{ color: INK }}>
            <li className="flex gap-4">
              <span
                className="font-[family-name:var(--v20-cta-mono)] text-sm font-semibold"
                style={{ color: IBM_BLUE, minWidth: "1.75rem" }}
              >
                (A)
              </span>
              <span>
                Initiate a new project. —{" "}
                <Link
                  href="/start"
                  className="underline decoration-1 underline-offset-[3px] transition-colors"
                  style={{ color: IBM_BLUE }}
                >
                  Link to /start
                </Link>
              </span>
            </li>
            <li className="flex gap-4">
              <span
                className="font-[family-name:var(--v20-cta-mono)] text-sm font-semibold"
                style={{ color: IBM_BLUE, minWidth: "1.75rem" }}
              >
                (B)
              </span>
              <span>
                Review pricing structure first. —{" "}
                <Link
                  href="/pricing"
                  className="underline decoration-1 underline-offset-[3px] transition-colors"
                  style={{ color: IBM_BLUE }}
                >
                  Link to /pricing
                </Link>
              </span>
            </li>
          </ol>
        </div>

        {/* Action buttons — IBM technical-doc style, square corners */}
        <div className="mt-12 flex flex-col gap-3 sm:flex-row sm:items-stretch">
          <Link
            href="/start"
            className="group inline-flex items-center justify-between gap-6 px-7 py-4 font-[family-name:var(--v20-cta-sans)] text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-150"
            style={{
              background: IBM_BLUE,
              color: CREAM,
              border: `1px solid ${IBM_BLUE}`,
              borderRadius: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = IBM_BLUE_DEEP;
              e.currentTarget.style.borderColor = IBM_BLUE_DEEP;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = IBM_BLUE;
              e.currentTarget.style.borderColor = IBM_BLUE;
            }}
          >
            <span>Get Started</span>
            <span aria-hidden className="font-[family-name:var(--v20-cta-mono)] text-xs">
              [A] →
            </span>
          </Link>

          <Link
            href="/pricing"
            className="group inline-flex items-center justify-between gap-6 px-7 py-4 font-[family-name:var(--v20-cta-sans)] text-sm font-semibold uppercase tracking-[0.14em] transition-colors duration-150"
            style={{
              background: "transparent",
              color: IBM_BLUE,
              border: `1px solid ${IBM_BLUE}`,
              borderRadius: 0,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = IBM_BLUE;
              e.currentTarget.style.color = CREAM;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = IBM_BLUE;
            }}
          >
            <span>View Pricing</span>
            <span aria-hidden className="font-[family-name:var(--v20-cta-mono)] text-xs">
              [B] →
            </span>
          </Link>
        </div>

        {/* Margin warning rule */}
        <div className="mt-16 flex items-center gap-3">
          <div className="h-[1px] flex-1" style={{ background: INK, opacity: 0.25 }} />
          <span
            className="font-[family-name:var(--v20-cta-mono)] text-[10px] uppercase tracking-[0.3em]"
            style={{ color: AMBER }}
          >
            ◆ END OF SECTION 5.0 ◆
          </span>
          <div className="h-[1px] flex-1" style={{ background: INK, opacity: 0.25 }} />
        </div>

        {/* Document termination footer */}
        <footer
          className="mt-12 border-t border-b py-6 font-[family-name:var(--v20-cta-mono)] text-[11px] uppercase leading-[2] tracking-[0.18em]"
          style={{ borderColor: INK, color: INK, opacity: 0.85 }}
        >
          <div className="flex flex-col gap-1">
            <div>END OF DOCUMENT KPT-2026-1</div>
            <div>DISTRIBUTION: PUBLIC</div>
            <div>NEXT REVIEW: 2027-04-28</div>
            <div style={{ color: SUB_RED }}>© KPT DESIGNS · MMIV — MMXXVI</div>
          </div>
        </footer>

        {/* Filing stamp */}
        <div
          aria-hidden
          className="mt-8 inline-block font-[family-name:var(--v20-cta-mono)] text-[10px] uppercase tracking-[0.2em]"
          style={{
            color: SUB_RED,
            border: `1.5px solid ${SUB_RED}`,
            padding: "6px 12px",
            transform: "rotate(-2deg)",
            opacity: 0.85,
          }}
        >
          FILED · 2026-04-28 · OPERATOR DESK
        </div>
      </div>
    </section>
  );
}
