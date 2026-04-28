"use client";

import { Fraunces, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const MALTED = "#7A2D26";
const INK = "#0A0A0A";
const SPECIMEN = "#FAFAFA";

const monoLabel: React.CSSProperties = {
  fontSize: "10px",
  letterSpacing: "0.22em",
  textTransform: "uppercase",
  fontWeight: 500,
  fontVariantNumeric: "lining-nums",
};

export default function PhilosophySpecimen() {
  return (
    <section
      className={`${fraunces.className} relative w-full`}
      aria-labelledby="specimen-section-02"
      style={{
        background: SPECIMEN,
        color: INK,
        paddingTop: "clamp(72px, 9vw, 144px)",
        paddingBottom: "clamp(96px, 12vw, 192px)",
        fontFeatureSettings: '"lnum" 1, "kern" 1, "liga" 1',
      }}
    >
      {/* SECTION HEADER */}
      <header className="mx-auto" style={{ maxWidth: "1180px", paddingInline: "clamp(20px, 5vw, 64px)" }}>
        <div aria-hidden style={{ height: "2px", background: MALTED, marginBottom: "18px" }} />
        <div
          id="specimen-section-02"
          className={mono.className}
          style={{
            ...monoLabel,
            color: MALTED,
            fontSize: "11px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            gap: "24px",
          }}
        >
          <span>§ 02 — Statement</span>
          <span style={{ color: INK, opacity: 0.55 }}>Fraunces · opsz 9–144 · book / italic</span>
        </div>
      </header>

      {/* BODY GRID */}
      <div
        className="specimen-grid mx-auto"
        style={{
          maxWidth: "1180px",
          paddingInline: "clamp(20px, 5vw, 64px)",
          marginTop: "clamp(56px, 7vw, 104px)",
          display: "grid",
          gridTemplateColumns: "minmax(0, 1fr) minmax(0, 220px)",
          columnGap: "clamp(32px, 5vw, 88px)",
          alignItems: "start",
        }}
      >
        {/* COLUMN 1 — STATEMENT */}
        <article style={{ maxWidth: "700px", justifySelf: "end", width: "100%" }}>
          <div
            className={mono.className}
            style={{ ...monoLabel, color: INK, opacity: 0.45, marginBottom: "28px" }}
          >
            Folio 02 · Specimen No. 12 · Set in <em style={{ fontStyle: "italic" }}>Fraunces</em>
          </div>

          <p
            style={{
              fontWeight: 400,
              fontSize: "clamp(18px, 1.45vw, 22px)",
              lineHeight: 1.55,
              textAlign: "justify",
              hyphens: "auto",
              WebkitHyphens: "auto",
              color: INK,
              fontVariantNumeric: "lining-nums",
              fontFeatureSettings: '"lnum" 1, "kern" 1, "liga" 1, "calt" 1',
              textRendering: "optimizeLegibility",
            }}
          >
            <span
              aria-hidden
              className={fraunces.className}
              style={{
                float: "left",
                color: MALTED,
                fontWeight: 900,
                fontSize: "clamp(160px, 17.5vw, 248px)",
                lineHeight: 0.82,
                paddingRight: "18px",
                paddingTop: "10px",
                marginBottom: "-12px",
                letterSpacing: "-0.04em",
              }}
            >
              T
            </span>
            <span style={{ fontVariant: "small-caps", letterSpacing: "0.04em" }}>ype</span>{" "}
            is the most patient interface. Set badly, it argues with the reader for a lifetime;
            set well, it disappears. We hand-set every site in{" "}
            <em style={{ fontStyle: "italic" }}>code</em>, never in{" "}
            <em style={{ fontStyle: "italic" }}>templates</em>. We compose with the rigour a{" "}
            <em style={{ fontStyle: "italic" }}>punch-cutter</em> brought to brass. The
            repository — the type itself — is delivered to you on completion. No lock-in. No
            proprietary <em style={{ fontStyle: "italic" }}>kerning</em>.
          </p>

          {/* PULL QUOTE */}
          <figure style={{ marginTop: "clamp(56px, 6vw, 88px)", marginBottom: 0, position: "relative" }}>
            <span
              aria-hidden
              className={fraunces.className}
              style={{
                position: "absolute",
                left: "-0.55em",
                top: "-0.18em",
                color: MALTED,
                fontStyle: "italic",
                fontWeight: 500,
                fontSize: "clamp(72px, 7vw, 110px)",
                lineHeight: 1,
                opacity: 0.9,
              }}
            >
              “
            </span>
            <blockquote
              className={fraunces.className}
              style={{
                margin: 0,
                color: MALTED,
                fontStyle: "italic",
                fontWeight: 400,
                fontSize: "clamp(28px, 3.2vw, 44px)",
                lineHeight: 1.18,
                letterSpacing: "-0.012em",
                fontFeatureSettings: '"kern" 1, "liga" 1, "dlig" 1',
              }}
            >
              The page does not need decoration. The setting{" "}
              <span style={{ fontStyle: "normal", fontVariant: "small-caps", letterSpacing: "0.06em" }}>is</span>{" "}
              the decoration.
            </blockquote>
            <figcaption
              className={mono.className}
              style={{ ...monoLabel, color: INK, opacity: 0.55, marginTop: "22px" }}
            >
              — KPT, House Note · Est. 2004
            </figcaption>
          </figure>

          <div aria-hidden style={{ marginTop: "clamp(56px, 6vw, 88px)", height: "1px", width: "64px", background: MALTED }} />
          <div
            className={mono.className}
            style={{ ...monoLabel, color: INK, opacity: 0.5, marginTop: "14px", letterSpacing: "0.2em" }}
          >
            set in 1 column · 700 px measure · leading 1.55
          </div>
        </article>

        {/* COLUMN 2 — MARGINALIA */}
        <aside
          aria-label="Foundry references"
          className="specimen-marginalia"
          style={{
            position: "sticky",
            top: "calc(var(--nav-height, 80px) + 32px)",
            justifySelf: "start",
            paddingTop: "6px",
          }}
        >
          <div
            className={mono.className}
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              color: MALTED,
              fontSize: "10px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              fontWeight: 500,
              whiteSpace: "nowrap",
              fontVariantNumeric: "lining-nums",
              lineHeight: 1,
            }}
          >
            v. Akzidenz-Grotesk · Berthold · 1898 · Cf. Doves Type · 1900 · Kennerley · 1911
          </div>
        </aside>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .specimen-grid { grid-template-columns: 1fr !important; }
          .specimen-marginalia { display: none !important; }
        }
      `}</style>
    </section>
  );
}
