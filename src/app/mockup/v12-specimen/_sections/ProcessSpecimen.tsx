"use client";

import { Fraunces, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  style: ["normal", "italic"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// V12 Specimen palette
const PAPER = "#FAFAFA";
const INK = "#0A0A0A";
const MALTED = "#7A2D26";
const HAIRLINE = "rgba(10,10,10,0.14)";
const HAIRLINE_SOFT = "rgba(10,10,10,0.06)";

type Stage = {
  num: string; label: string; word: string;
  weight: number; body: string; glyph: string; dur: string;
};

const STAGES: Stage[] = [
  { num: "01", label: "DISCOVERY", word: "LISTEN",  weight: 200, body: "we listen briefly",       glyph: "Aa", dur: "1 WK"   },
  { num: "02", label: "BUILD",     word: "BUILD",   weight: 400, body: "we design and code",      glyph: "Bb", dur: "3-5 WK" },
  { num: "03", label: "REVIEW",    word: "REVIEW",  weight: 600, body: "you read every page",     glyph: "Rr", dur: "1 WK"   },
  { num: "04", label: "DELIVERY",  word: "DELIVER", weight: 900, body: "we hand over the source", glyph: "Dd", dur: "1 DAY" },
];

const RAMP = [200, 300, 400, 500, 600, 700, 800, 900] as const;

const monoLabel: React.CSSProperties = {
  fontSize: 10,
  letterSpacing: "0.28em",
  textTransform: "uppercase",
  fontWeight: 500,
};

export default function ProcessSpecimen() {
  return (
    <section
      className={fraunces.className}
      style={{ background: PAPER, color: INK, padding: "140px 0 160px", overflow: "hidden", position: "relative" }}
    >
      {/* Section header: malted-red rule + § 05 — STAGES */}
      <header style={{ maxWidth: 1320, margin: "0 auto 80px", padding: "0 48px" }}>
        <div aria-hidden style={{ height: 2, background: MALTED, width: "100%" }} />
        <div
          className={mono.className}
          style={{
            ...monoLabel,
            color: MALTED,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            paddingTop: 14,
            flexWrap: "wrap",
            gap: 16,
            letterSpacing: "0.32em",
            fontSize: 11,
          }}
        >
          <span>§ 05 &mdash; STAGES</span>
          <span style={{ color: INK, opacity: 0.5 }}>FRAUNCES · OPSZ 9&ndash;144 · WT 200&ndash;900</span>
          <span style={{ color: INK, opacity: 0.5 }}>FOUR WEIGHTS / FOUR STEPS</span>
        </div>
        <p
          style={{
            margin: "48px 0 0",
            fontStyle: "italic",
            fontWeight: 300,
            fontSize: "clamp(22px, 2.4vw, 30px)",
            lineHeight: 1.35,
            maxWidth: 740,
            letterSpacing: "-0.01em",
          }}
        >
          The KPT process, set as a specimen &mdash; each stage rendered at a progressively heavier weight, from{" "}
          <span style={{ fontWeight: 200 }}>thin</span> to <span style={{ fontWeight: 900 }}>ultra</span>.
        </p>
      </header>

      {/* Stage rows */}
      <div style={{ maxWidth: 1320, margin: "0 auto", padding: "0 48px", borderTop: `1px solid ${HAIRLINE}` }}>
        {STAGES.map((s) => (
          <article
            key={s.num}
            style={{
              display: "grid",
              gridTemplateColumns: "120px minmax(0,1fr) 200px",
              gap: 40,
              alignItems: "center",
              padding: "44px 0 40px",
              borderBottom: `1px solid ${HAIRLINE}`,
            }}
          >
            {/* LEFT: stage label + glyph specimen */}
            <div>
              <div className={mono.className} style={{ ...monoLabel, color: MALTED, letterSpacing: "0.32em" }}>
                STAGE {s.num}
              </div>
              <div
                className={mono.className}
                style={{ ...monoLabel, color: INK, opacity: 0.7, marginTop: 6, letterSpacing: "0.32em" }}
              >
                {s.label}
              </div>
              <div
                aria-hidden
                style={{
                  marginTop: 22,
                  fontWeight: s.weight,
                  fontSize: 72,
                  lineHeight: 0.9,
                  letterSpacing: "-0.04em",
                  fontVariationSettings: `"opsz" 144`,
                }}
              >
                {s.glyph}
              </div>
            </div>

            {/* CENTER: weight progression line + italic body */}
            <div style={{ minWidth: 0 }}>
              <div
                aria-hidden
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: "clamp(4px, 0.6vw, 12px)",
                  fontSize: "clamp(28px, 5.4vw, 78px)",
                  lineHeight: 0.95,
                  letterSpacing: "-0.045em",
                  overflow: "hidden",
                }}
              >
                {RAMP.map((wt, i) => (
                  <span
                    key={wt}
                    style={{
                      fontWeight: wt,
                      opacity: wt <= s.weight ? 1 : 0.16,
                      fontVariationSettings: `"opsz" 144`,
                    }}
                  >
                    {s.word.charAt(i % s.word.length)}
                  </span>
                ))}
                <span
                  style={{
                    marginLeft: "clamp(8px, 1.4vw, 24px)",
                    fontWeight: s.weight,
                    fontVariationSettings: `"opsz" 144`,
                  }}
                >
                  {s.word}
                </span>
              </div>
              <p
                style={{
                  margin: "22px 0 0",
                  fontStyle: "italic",
                  fontWeight: 400,
                  fontSize: 16,
                  lineHeight: 1.4,
                  opacity: 0.78,
                  letterSpacing: "-0.005em",
                }}
              >
                <span
                  className={mono.className}
                  style={{
                    fontStyle: "normal",
                    fontSize: 10,
                    letterSpacing: "0.28em",
                    textTransform: "uppercase",
                    color: MALTED,
                    marginRight: 12,
                    verticalAlign: "1px",
                  }}
                >
                  &mdash;
                </span>
                {s.body}.
              </p>
            </div>

            {/* RIGHT: technical metadata */}
            <div
              className={mono.className}
              style={{
                ...monoLabel,
                display: "flex",
                flexDirection: "column",
                gap: 6,
                letterSpacing: "0.22em",
                borderLeft: `1px solid ${HAIRLINE_SOFT}`,
                paddingLeft: 20,
              }}
            >
              {([["WT", String(s.weight)], ["OPSZ", "144"], ["DUR", s.dur]] as const).map(([k, v]) => (
                <div key={k} style={{ display: "flex", justifyContent: "space-between", gap: 16 }}>
                  <span style={{ opacity: 0.5 }}>{k}</span>
                  <span>{v}</span>
                </div>
              ))}
              <div style={{ height: 1, background: HAIRLINE_SOFT, margin: "8px 0 6px" }} />
              <div style={{ display: "flex", justifyContent: "space-between", color: MALTED }}>
                <span>STEP</span>
                <span>{s.num} / 04</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      {/* Foundry footer */}
      <footer
        className={mono.className}
        style={{
          ...monoLabel,
          maxWidth: 1320,
          margin: "56px auto 0",
          padding: "0 48px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
          opacity: 0.55,
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <span>KPT TYPE FOUNDRY &mdash; PROCESS SPECIMEN</span>
        <span style={{ color: MALTED, opacity: 1 }}>SET IN FRAUNCES</span>
        <span>SHEET 05 / 06</span>
      </footer>
    </section>
  );
}
