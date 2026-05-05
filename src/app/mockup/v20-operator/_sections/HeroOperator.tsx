import Link from "next/link";
import { IBM_Plex_Mono, IBM_Plex_Sans, IBM_Plex_Serif } from "next/font/google";

const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-op-mono" });
const sans = IBM_Plex_Sans({ subsets: ["latin"], weight: ["300", "400", "500", "600", "700"], variable: "--font-op-sans" });
const serif = IBM_Plex_Serif({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], variable: "--font-op-serif" });

const CREAM = "#F4EFE0";
const INK = "#1A1A1A";
const IBM_BLUE = "#1D5CB6";
const RED = "#A4262C";
const AMBER = "#C9A30D";
const FAINT = "#6B6256";

const SUBSYSTEMS: { id: string; name: string; rev: string }[] = [
  { id: "REG", name: "REGISTRAR", rev: "R.04" },
  { id: "HST", name: "HOST", rev: "R.07" },
  { id: "DSN", name: "DESIGN", rev: "R.12" },
  { id: "AGT", name: "AGENTS", rev: "R.02" },
];

const TOC: { num: string; title: string; folio: string }[] = [
  { num: "1.0", title: "PHILOSOPHY", folio: "§02" },
  { num: "2.0", title: "SYSTEMS", folio: "§03" },
  { num: "3.0", title: "WORK SAMPLES", folio: "§04" },
  { num: "4.0", title: "PROCEDURES", folio: "§05" },
  { num: "5.0", title: "SUMMARY", folio: "§06" },
];

const DOC_ROWS: [string, string, boolean?][] = [
  ["DOC NO.", "KPT-2026-1"],
  ["REVISION", "C", true],
  ["DISTRIBUTION", "PUBLIC"],
  ["DATE OF ISSUE", "28 APR 2026"],
  ["SUPERSEDES", "KPT-2024-9 (REV. B)"],
  ["CLASSIFICATION", "UNCLASSIFIED"],
  ["FORM", "GA-2026-1"],
];

const FOOT_ROWS: [string, string][] = [
  ["VERSION", "2026.04.28-C"],
  ["BUILD", "NEXT 16 / R19 / TWv4"],
  ["PRESS RUN", "00001 OF 00001"],
  ["FILE", "KPT.WEB/HERO/01"],
];

const Rule = ({ w = 1, c = INK, mt = 0, mb = 0 }: { w?: number; c?: string; mt?: number; mb?: number }) => (
  <div aria-hidden style={{ height: w, background: c, marginTop: mt, marginBottom: mb }} />
);

export default function HeroOperator() {
  return (
    <section
      className={`${mono.variable} ${sans.variable} ${serif.variable} relative w-full overflow-hidden`}
      style={{ background: CREAM, color: INK, paddingTop: "var(--nav-height, 80px)" }}
    >
      {/* Paper-weave grain */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          mixBlendMode: "multiply",
          opacity: 0.55,
          backgroundImage: [
            "repeating-linear-gradient(0deg, rgba(26,26,26,0.035) 0px, rgba(26,26,26,0.035) 1px, transparent 1px, transparent 3px)",
            "repeating-linear-gradient(90deg, rgba(26,26,26,0.035) 0px, rgba(26,26,26,0.035) 1px, transparent 1px, transparent 3px)",
            "radial-gradient(rgba(26,26,26,0.06) 0.6px, transparent 0.6px)",
          ].join(", "),
          backgroundSize: "3px 3px, 3px 3px, 5px 5px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, transparent 55%, rgba(60,40,15,0.12) 100%)" }}
      />

      {/* IBM-blue header band */}
      <div
        className="relative w-full"
        style={{ background: IBM_BLUE, color: "#FFFFFF", fontFamily: "var(--font-op-sans)", borderBottom: `2px solid ${INK}` }}
      >
        <div className="mx-auto flex w-full max-w-[1280px] flex-col gap-2 px-5 py-3 md:flex-row md:items-center md:justify-between md:px-8 md:py-2.5">
          <div className="flex items-center gap-3">
            <span aria-hidden className="inline-flex flex-col gap-[3px]">
              {Array.from({ length: 7 }).map((_, i) => (
                <span key={i} style={{ display: "block", width: 26, height: 2, background: "#FFFFFF" }} />
              ))}
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-[0.22em] md:text-[11px]">
              KPT.WEB OPERATOR MANUAL · 2026 EDITION · GA-2026-1
            </span>
          </div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[9.5px] uppercase tracking-[0.22em] md:text-[10px]">
            <span style={{ opacity: 0.75 }}>SUBSYSTEMS:</span>
            {SUBSYSTEMS.map((s, i) => (
              <span key={s.id} className="flex items-center gap-1.5">
                <span style={{ fontFamily: "var(--font-op-mono)", fontWeight: 700 }}>{s.id}</span>
                <span style={{ opacity: 0.7 }}>{s.name}</span>
                <span style={{ opacity: 0.5 }}>{s.rev}</span>
                {i < SUBSYSTEMS.length - 1 && <span aria-hidden style={{ opacity: 0.45 }}>·</span>}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Document body */}
      <div className="relative mx-auto w-full max-w-[1280px] px-5 md:px-8">
        {/* Form-number strip */}
        <div className="mt-5 flex items-center justify-between text-[10px] uppercase tracking-[0.22em]" style={{ fontFamily: "var(--font-op-mono)", color: FAINT }}>
          <span>FORM GA-2026-1 · FILE NO. KPT.WEB.001</span>
          <span className="hidden sm:inline">PAGE 1 OF VI · COVER</span>
          <span>PRINTED IN PA · USA</span>
        </div>
        <Rule mt={6} />
        <Rule w={2} mt={2} />

        {/* Cover */}
        <div className="relative mt-8 md:mt-10">
          <div className="flex flex-wrap items-center gap-3">
            <span
              className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.28em]"
              style={{ background: INK, color: CREAM, fontFamily: "var(--font-op-mono)" }}
            >
              UNCLASSIFIED · DISTRIBUTION: PUBLIC
            </span>
            <span className="hidden text-[10px] uppercase tracking-[0.22em] md:inline" style={{ fontFamily: "var(--font-op-mono)", color: AMBER }}>
              ▲ HANDLE WITH NORMAL CARE
            </span>
          </div>

          <p className="mt-6 text-[11px] uppercase tracking-[0.4em]" style={{ fontFamily: "var(--font-op-mono)", color: FAINT }}>
            INTERNATIONAL BUSINESS MACHINES — KPT EDITION · SYSTEM/360-370 OPERATOR REFERENCE
          </p>

          <h1
            className="mt-3 leading-[0.82]"
            style={{
              fontFamily: "var(--font-op-sans)",
              fontWeight: 700,
              fontSize: "clamp(96px, 18vw, 200px)",
              letterSpacing: "-0.035em",
              color: INK,
            }}
          >
            KPT<span style={{ color: IBM_BLUE }}>.</span>WEB
          </h1>

          <p
            className="mt-4 max-w-[720px]"
            style={{
              fontFamily: "var(--font-op-serif)",
              fontStyle: "italic",
              fontSize: "clamp(20px, 2.4vw, 30px)",
              lineHeight: 1.25,
              color: "#2a2a2a",
            }}
          >
            An Operator&rsquo;s Manual for Modern Web —
            <span style={{ color: FAINT }}> Procedures, Systems, &amp; Specifications.</span>
          </p>

          {/* double rule */}
          <div aria-hidden className="my-2">
            <div style={{ height: 1, background: INK }} />
            <div style={{ height: 2 }} />
            <div style={{ height: 1, background: INK }} />
          </div>

          <div className="mt-6 grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-10">
            {/* Document control */}
            <aside className="md:col-span-5">
              <p className="text-[10px] uppercase tracking-[0.28em]" style={{ fontFamily: "var(--font-op-mono)", color: RED }}>
                ── DOCUMENT CONTROL ──
              </p>
              <div
                className="mt-2 border p-4"
                style={{ borderColor: INK, background: "rgba(255,255,255,0.35)", fontFamily: "var(--font-op-mono)", fontSize: 12.5, lineHeight: 1.7 }}
              >
                {DOC_ROWS.map(([k, v, accent], i) => (
                  <div
                    key={k}
                    className="flex items-baseline justify-between gap-3"
                    style={{ borderBottom: i === DOC_ROWS.length - 1 ? "none" : `1px dotted ${FAINT}`, padding: "4px 0" }}
                  >
                    <span className="text-[10px] uppercase tracking-[0.22em]" style={{ color: FAINT, fontWeight: 500 }}>{k}</span>
                    <span className="text-[13px]" style={{ color: accent ? IBM_BLUE : INK, fontWeight: 700, letterSpacing: "0.04em" }}>{v}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 grid grid-cols-2 gap-3 text-[10px] uppercase tracking-[0.18em]" style={{ fontFamily: "var(--font-op-mono)", color: FAINT }}>
                {[
                  ["PREPARED BY", "K. P. T. EDITORIAL"],
                  ["APPROVED BY", "OFFICE OF THE PARTNER"],
                ].map(([label, line]) => (
                  <div key={label} className="border p-2" style={{ borderColor: INK, background: "rgba(255,255,255,0.25)" }}>
                    <div style={{ color: FAINT, fontSize: 9.5 }}>{label}</div>
                    <div aria-hidden style={{ height: 22, borderBottom: `1px solid ${INK}`, marginTop: 6, marginBottom: 4 }} />
                    <div style={{ color: INK, fontSize: 10, fontWeight: 700, letterSpacing: "0.18em" }}>{line}</div>
                  </div>
                ))}
              </div>
            </aside>

            {/* TOC */}
            <div className="md:col-span-7">
              <p className="text-[10px] uppercase tracking-[0.28em]" style={{ fontFamily: "var(--font-op-mono)", color: RED }}>
                ── TABLE OF CONTENTS ──
              </p>
              <h2 className="mt-1" style={{ fontFamily: "var(--font-op-sans)", fontWeight: 600, fontSize: 22, letterSpacing: "-0.01em" }}>
                Contents
              </h2>
              <Rule mt={6} mb={2} />

              <ol className="mt-2" style={{ fontFamily: "var(--font-op-mono)" }}>
                {TOC.map((item) => (
                  <li key={item.num} className="flex items-baseline gap-3 py-2" style={{ borderBottom: `1px dotted ${FAINT}` }}>
                    <span className="shrink-0 text-[12px]" style={{ color: IBM_BLUE, fontWeight: 700, letterSpacing: "0.05em" }}>{item.num}</span>
                    <span className="text-[13px] uppercase tracking-[0.16em]" style={{ color: INK, fontWeight: 600 }}>{item.title}</span>
                    <span
                      aria-hidden
                      className="mx-2 flex-1 truncate"
                      style={{ color: FAINT, letterSpacing: "0.2em", whiteSpace: "nowrap", overflow: "hidden" }}
                    >
                      ················································································
                    </span>
                    <span className="shrink-0 text-[12px]" style={{ color: INK, fontWeight: 600 }}>{item.folio}</span>
                  </li>
                ))}
              </ol>

              <div
                className="mt-5 border-l-4 px-4 py-3"
                style={{
                  borderColor: AMBER,
                  background: "rgba(201,163,13,0.08)",
                  fontFamily: "var(--font-op-serif)",
                  fontSize: 13.5,
                  lineHeight: 1.5,
                  color: "#2a2a2a",
                }}
              >
                <span className="mr-2 align-middle text-[10px] font-bold uppercase tracking-[0.22em]" style={{ fontFamily: "var(--font-op-mono)", color: AMBER }}>
                  ▲ NOTE
                </span>
                This volume describes the operating procedures for KPT.WEB — the vertically integrated registrar, host,
                design, and agents subsystem operated by KPT Designs since 2004. Read §1.0 before commissioning a new
                project.
              </div>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link
                  href="/start"
                  className="inline-flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.22em]"
                  style={{ background: INK, color: CREAM, fontFamily: "var(--font-op-mono)", fontWeight: 700, border: `1px solid ${INK}` }}
                >
                  <span style={{ color: AMBER }}>▶</span> COMMENCE PROCEDURE / START
                </Link>
                <Link
                  href="/pricing"
                  className="inline-flex items-center gap-2 px-4 py-2 text-[11px] uppercase tracking-[0.22em]"
                  style={{ background: "transparent", color: INK, fontFamily: "var(--font-op-mono)", fontWeight: 700, border: `1px solid ${INK}` }}
                >
                  ◇ APPENDIX A — RATE SCHEDULE
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-12 md:mt-16">
          <Rule w={2} />
          <div className="mt-3 flex flex-col gap-3 pb-4 md:flex-row md:items-end md:justify-between" style={{ fontFamily: "var(--font-op-mono)", color: INK }}>
            <div className="flex items-center gap-4">
              <span aria-hidden className="inline-flex flex-col gap-[3px]">
                {Array.from({ length: 8 }).map((_, i) => (
                  <span key={i} style={{ display: "block", width: 56, height: 4, background: i % 2 === 0 ? IBM_BLUE : "transparent" }} />
                ))}
              </span>
              <div>
                <div className="text-[22px] font-bold tracking-[0.18em]" style={{ fontFamily: "var(--font-op-sans)", color: IBM_BLUE }}>
                  KPT
                </div>
                <div className="text-[10px] uppercase tracking-[0.22em]" style={{ color: FAINT }}>
                  Designs Co. · Pittsburgh, PA · Est. 2004
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-1 text-[10px] uppercase tracking-[0.2em] md:text-right">
              {FOOT_ROWS.map(([k, v]) => (
                <span key={k} style={{ display: "contents" }}>
                  <span style={{ color: FAINT }}>{k}</span>
                  <span style={{ fontWeight: 700 }}>{v}</span>
                </span>
              ))}
            </div>
          </div>
          <Rule />
          <div className="flex items-center justify-between py-2 text-[9.5px] uppercase tracking-[0.22em]" style={{ fontFamily: "var(--font-op-mono)", color: FAINT }}>
            <span>© 2004–2026 KPT DESIGNS · ALL RIGHTS RESERVED</span>
            <span className="hidden sm:inline">CONTINUED ON FOLIO §02 — PHILOSOPHY ▶</span>
            <span>GA-2026-1</span>
          </div>
        </div>
      </div>
    </section>
  );
}
