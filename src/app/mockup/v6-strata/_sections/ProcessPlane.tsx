"use client";

import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], axes: ["opsz", "SOFT"], style: ["normal", "italic"], display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const PAPER = "#F4F1EB";
const INK = "#1A1A22";
const ORANGE = "#FF5E1A";
const SAGE = "#7B8E6F";
const VOID = "#0B0B0F";

const STEPS = [
  { number: "01", name: "Discovery", desc: "A focused conversation about your goals, audience, and timeline. No drawn-out meetings — just clarity.", rule: "orange" as const },
  { number: "02", name: "Build", desc: "We design and code your site from scratch. You see progress early and often. Revisions included.", rule: "sage" as const },
  { number: "03", name: "Review", desc: "We iterate until you love it. Then deploy, configure analytics, and verify everything runs clean.", rule: "orange" as const },
  { number: "04", name: "Delivery", desc: "Complete source code and repository delivered. No lock-in. No proprietary platforms. It is yours.", rule: "sage" as const },
];

const STRIATIONS: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage: `repeating-linear-gradient(180deg, transparent 0 119px, rgba(26,26,34,0.05) 119px 120px)`,
  pointerEvents: "none",
};

const EDGE_FADE: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: `radial-gradient(ellipse at center, rgba(11,11,15,0) 38%, rgba(11,11,15,0.18) 70%, ${VOID} 100%)`,
  pointerEvents: "none",
};

export default function ProcessPlane() {
  return (
    <section
      className={inter.className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        background: PAPER,
        color: INK,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        padding: "clamp(48px, 6vh, 80px) clamp(24px, 5vw, 64px)",
      }}
      aria-labelledby="strata-process-title"
    >
      <div aria-hidden style={STRIATIONS} />
      <div aria-hidden style={EDGE_FADE} />

      <div style={{ position: "relative", width: "100%", maxWidth: 1240, margin: "0 auto", zIndex: 2 }}>
        <header style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: "clamp(20px, 3vh, 32px)" }}>
          <span className={mono.className} style={{ fontSize: 11, letterSpacing: "0.32em", textTransform: "uppercase", color: ORANGE, fontWeight: 600 }}>
            Stratum 06 · Process
          </span>
          <span aria-hidden style={{ flex: 1, height: 1, background: ORANGE, opacity: 0.6 }} />
          <span className={mono.className} style={{ fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: INK, opacity: 0.55 }}>
            04 STEPS
          </span>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: "clamp(20px, 3vw, 40px)", alignItems: "end", marginBottom: "clamp(28px, 4vh, 44px)" }}>
          <h2
            id="strata-process-title"
            className={fraunces.className}
            style={{
              margin: 0,
              fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)",
              fontWeight: 300,
              lineHeight: 0.98,
              letterSpacing: "-0.02em",
              fontVariationSettings: '"opsz" 144, "SOFT" 50',
              color: INK,
            }}
          >
            How it <em style={{ fontStyle: "italic", color: ORANGE, fontWeight: 300 }}>works.</em>
          </h2>
          <p style={{ fontSize: "clamp(12px, 1vw, 14px)", lineHeight: 1.65, color: INK, opacity: 0.7, maxWidth: 320, fontWeight: 300, margin: 0 }}>
            Tell us what you need and we build it. Four steps from idea to live site.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", border: "1px solid rgba(26,26,34,0.14)", background: "rgba(26,26,34,0.04)" }}>
          {STEPS.map((step, i) => {
            const ruleColor = step.rule === "orange" ? ORANGE : SAGE;
            return (
              <article
                key={step.number}
                style={{
                  position: "relative",
                  padding: "clamp(28px, 4vh, 44px) clamp(20px, 1.8vw, 30px) clamp(24px, 3vh, 36px)",
                  borderRight: i < STEPS.length - 1 ? "1px solid rgba(26,26,34,0.14)" : "none",
                  background: PAPER,
                  display: "flex",
                  flexDirection: "column",
                  gap: 10,
                  minHeight: "clamp(220px, 28vh, 280px)",
                }}
              >
                <span aria-hidden style={{ position: "absolute", top: 0, left: 0, height: 2, width: "44%", background: ruleColor }} />
                <div
                  className={fraunces.className}
                  aria-hidden
                  style={{
                    fontSize: "clamp(72px, 8vw, 110px)",
                    fontWeight: 200,
                    lineHeight: 0.85,
                    color: ruleColor,
                    opacity: 0.85,
                    letterSpacing: "-0.04em",
                    fontVariationSettings: '"opsz" 144, "SOFT" 100',
                    fontStyle: "italic",
                    margin: 0,
                  }}
                >
                  {step.number}
                </div>
                <div style={{ marginTop: "auto" }}>
                  <h3 className={fraunces.className} style={{ margin: 0, fontSize: "clamp(1.05rem, 1.5vw, 1.4rem)", fontWeight: 500, letterSpacing: "-0.015em", color: INK, marginBottom: 8 }}>
                    {step.name}
                  </h3>
                  <span aria-hidden style={{ display: "block", width: 32, height: 1, background: ruleColor, marginBottom: 10, opacity: 0.85 }} />
                  <p style={{ margin: 0, fontSize: "clamp(11.5px, 0.92vw, 13px)", lineHeight: 1.55, color: INK, opacity: 0.75, fontWeight: 300 }}>
                    {step.desc}
                  </p>
                </div>
                <span className={mono.className} style={{ position: "absolute", top: 14, right: 14, fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: INK, opacity: 0.4 }}>
                  S06 · {step.number}
                </span>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
