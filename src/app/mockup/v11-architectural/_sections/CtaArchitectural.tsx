import Link from "next/link";
import { Roboto, Roboto_Mono } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: ["400", "700", "900"], display: "swap" });
const robotoMono = Roboto_Mono({ subsets: ["latin"], weight: ["400", "500", "700"], display: "swap" });

const BLUEPRINT = "#0E1E2E";
const BLUEPRINT_DEEP = "#091523";
const DRAFTING = "#E8EAEC";
const CYAN_DIM = "#3D8DBF";
const RED = "#D03030";
const RED_DEEP = "#A82020";

const SIGNED = [
  { label: "DRAWN BY", value: "KPT" },
  { label: "CHECKED BY", value: "YOU" },
  { label: "APPROVED BY", value: "___" },
];

export default function CtaArchitectural() {
  return (
    <section className="relative isolate overflow-hidden" style={{ background: BLUEPRINT, color: DRAFTING }}>
      {/* faint cyan grid */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.18]"
        style={{
          backgroundImage: `linear-gradient(${CYAN_DIM} 1px, transparent 1px), linear-gradient(90deg, ${CYAN_DIM} 1px, transparent 1px)`,
          backgroundSize: "48px 48px, 48px 48px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.22]"
        style={{
          backgroundImage: `linear-gradient(${CYAN_DIM} 1px, transparent 1px), linear-gradient(90deg, ${CYAN_DIM} 1px, transparent 1px)`,
          backgroundSize: "240px 240px, 240px 240px",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{ background: `radial-gradient(ellipse at 50% 50%, transparent 0%, ${BLUEPRINT_DEEP} 80%)` }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 sm:px-10 py-24 sm:py-32">
        <div className="relative border" style={{ borderColor: CYAN_DIM, borderWidth: "1px" }}>
          {/* Title strip */}
          <div className="flex items-stretch border-b" style={{ borderColor: CYAN_DIM }}>
            <div
              className={`${robotoMono.className} flex items-center px-4 sm:px-6 py-3 border-r`}
              style={{ borderColor: CYAN_DIM, color: DRAFTING, letterSpacing: "0.32em", fontSize: "11px", fontWeight: 700 }}
            >
              SHEET A-006
            </div>
            <div
              className={`${robotoMono.className} flex flex-1 items-center px-4 sm:px-6 py-3`}
              style={{ color: CYAN_DIM, letterSpacing: "0.32em", fontSize: "11px", fontWeight: 500 }}
            >
              CALL FOR PROPOSALS
            </div>
            <div
              className={`${robotoMono.className} hidden sm:flex items-center px-6 py-3 border-l`}
              style={{ borderColor: CYAN_DIM, color: CYAN_DIM, letterSpacing: "0.28em", fontSize: "11px" }}
            >
              SCALE 1:1
            </div>
          </div>
          <div style={{ height: "3px", background: RED }} />

          {/* Headline */}
          <div className="relative px-4 sm:px-12 py-16 sm:py-24">
            <div
              aria-hidden
              className={`${robotoMono.className} absolute left-4 sm:left-10 top-10 hidden sm:flex items-center gap-2`}
              style={{ color: RED, fontSize: "11px", letterSpacing: "0.18em" }}
            >
              <span style={{ display: "inline-block", width: 14, height: 1, background: RED }} />
              48mm
              <span style={{ display: "inline-block", width: 14, height: 1, background: RED }} />
            </div>
            <div
              aria-hidden
              className={`${robotoMono.className} absolute right-4 sm:right-10 bottom-10 hidden sm:flex items-center gap-2`}
              style={{ color: RED, fontSize: "11px", letterSpacing: "0.18em" }}
            >
              <span style={{ display: "inline-block", width: 14, height: 1, background: RED }} />
              48mm
              <span style={{ display: "inline-block", width: 14, height: 1, background: RED }} />
            </div>

            <h2
              className={`${roboto.className} text-center`}
              style={{
                fontWeight: 900,
                color: DRAFTING,
                fontSize: "clamp(120px, 22vw, 220px)",
                lineHeight: 0.86,
                letterSpacing: "-0.04em",
              }}
            >
              BUILD
            </h2>

            <p
              className={`${robotoMono.className} mt-10 sm:mt-14 text-center uppercase`}
              style={{ color: CYAN_DIM, letterSpacing: "0.36em", fontSize: "11px", fontWeight: 500 }}
            >
              Issued for Construction <span style={{ color: RED }}>·</span> KPT.WEB <span style={{ color: RED }}>·</span> 2026
            </p>

            {/* Stamp buttons */}
            <div className="mt-12 sm:mt-14 flex flex-col sm:flex-row items-stretch justify-center gap-4 sm:gap-5">
              <Link
                href="/start"
                className={`${robotoMono.className} group relative inline-flex items-center justify-center px-10 py-5 transition-colors duration-300`}
                style={{
                  background: RED,
                  color: DRAFTING,
                  letterSpacing: "0.32em",
                  fontSize: "12px",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  borderRadius: 0,
                  minWidth: "240px",
                }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: RED_DEEP }}
                />
                <span className="relative">Get Started</span>
              </Link>

              <Link
                href="/pricing"
                className={`${robotoMono.className} group relative inline-flex items-center justify-center px-10 py-5 transition-colors duration-300`}
                style={{
                  background: "transparent",
                  color: DRAFTING,
                  border: `1px solid ${CYAN_DIM}`,
                  letterSpacing: "0.32em",
                  fontSize: "12px",
                  fontWeight: 500,
                  textTransform: "uppercase",
                  borderRadius: 0,
                  minWidth: "240px",
                }}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  style={{ background: CYAN_DIM }}
                />
                <span
                  className="relative transition-colors duration-300 group-hover:text-[color:var(--bp)]"
                  style={{ ["--bp" as string]: BLUEPRINT }}
                >
                  View Pricing
                </span>
              </Link>
            </div>
          </div>

          {/* Signed-by block */}
          <div className="grid grid-cols-1 sm:grid-cols-3 border-t" style={{ borderColor: CYAN_DIM }}>
            {SIGNED.map((cell, i) => (
              <div
                key={cell.label}
                className={`${robotoMono.className} flex items-center justify-between gap-4 px-5 sm:px-6 py-4 ${
                  i < 2 ? "sm:border-r" : ""
                } ${i > 0 ? "border-t sm:border-t-0" : ""}`}
                style={{ borderColor: CYAN_DIM }}
              >
                <span style={{ color: CYAN_DIM, letterSpacing: "0.32em", fontSize: "10px", fontWeight: 500 }}>
                  {cell.label}
                </span>
                <span style={{ color: DRAFTING, letterSpacing: "0.28em", fontSize: "13px", fontWeight: 700 }}>
                  {cell.value}
                </span>
              </div>
            ))}
          </div>

          <div style={{ height: "1px", background: RED }} />
        </div>

        <div
          className={`${robotoMono.className} mt-6 flex flex-wrap items-center justify-between gap-3`}
          style={{ color: CYAN_DIM, letterSpacing: "0.28em", fontSize: "10px" }}
        >
          <span>REV 06 / 06</span>
          <span>DOC No. KPT-A-006-CFP</span>
          <span>END OF SET</span>
        </div>
      </div>
    </section>
  );
}
