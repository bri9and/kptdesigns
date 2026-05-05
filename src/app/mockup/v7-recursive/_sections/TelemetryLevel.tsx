"use client";

import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const OFF_WHITE = "#FCFCFA";
const INK = "#0A0A0A";
const RED = "#FF1E1E";
const GREY = "#9A9A9A";

// next-level zoom anchor — the "147 sites shipped" headline number, where
// PortfolioLevel emerges from the studio's contact-sheet wall.
export const ANCHOR_POINT = { x: 0.18, y: 0.42 };

type Stat = {
  label: string;
  value: string;
  unit: string;
  bar: string; // % width
  sub: string;
};

const STATS: Stat[] = [
  { label: "Experience", value: "20+", unit: "Yrs", bar: "92%", sub: "Since 2004" },
  { label: "Load Time",  value: "<1",  unit: "s",   bar: "88%", sub: "Target < 1.0s" },
  { label: "Ownership",  value: "100", unit: "%",   bar: "99%", sub: "Your code, forever" },
  { label: "PageSpeed",  value: "95+", unit: "pts", bar: "76%", sub: "Google Lighthouse" },
];

/**
 * V7 — Recursive Zoom · Level 04 (Telemetry).
 * Pulled from "03 / Telemetry". Four stats with electric-red accents and a
 * mock waveform trace.
 */
export default function TelemetryLevel() {
  return (
    <section
      className={inter.className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        background: OFF_WHITE,
        color: INK,
        padding: "clamp(40px, 5vw, 80px) clamp(20px, 4vw, 64px)",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <header
        className={mono.className}
        style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 11, letterSpacing: "0.22em", color: GREY, textTransform: "uppercase" }}
      >
        <span><span style={{ color: RED }}>●</span>&nbsp;LIVE — ALL SYSTEMS NOMINAL</span>
        <span>kpt/system.telemetry</span>
        <span>SCALE ×512</span>
      </header>

      <div style={{ marginTop: 32, marginBottom: 28, display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", alignItems: "end", gap: 24 }}>
        <h2 style={{ margin: 0, fontSize: "clamp(36px, 5vw, 76px)", lineHeight: 0.92, letterSpacing: "-0.045em", fontWeight: 600 }}>
          <span
            className={mono.className}
            style={{ display: "block", fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 500, letterSpacing: "0.32em", color: RED, marginBottom: 14, textTransform: "uppercase" }}
          >
            03 / Telemetry
          </span>
          Real numbers.<br />
          <span style={{ color: GREY }}>Real </span>
          <span style={{ borderBottom: `4px solid ${RED}`, paddingBottom: 4 }}>projects</span>
          <span style={{ color: GREY }}>.</span>
        </h2>
        <p
          className={mono.className}
          style={{ fontSize: 11.5, letterSpacing: "0.05em", color: GREY, margin: 0, maxWidth: "44ch", lineHeight: 1.6 }}
        >
          The plaque resolved into a flight-deck panel. Four readouts, no
          fluff. Each bar is calibrated to the same scale.
        </p>
      </div>

      <div style={{ flex: 1, display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", border: `1px solid ${INK}1A`, minHeight: 280 }}>
        {STATS.map((s, i) => (
          <div
            key={s.label}
            data-anchor={i === 0 ? "zoom-target" : undefined}
            style={{ padding: "clamp(20px, 2.4vw, 36px)", borderRight: i < STATS.length - 1 ? `1px solid ${INK}1A` : "none", display: "flex", flexDirection: "column", gap: 10, position: "relative" }}
          >
            <div className={mono.className} style={{ fontSize: 10, letterSpacing: "0.28em", color: GREY, textTransform: "uppercase" }}>
              {String(i + 1).padStart(2, "0")} · {s.label}
            </div>
            <div style={{ fontSize: "clamp(40px, 4vw, 64px)", fontWeight: 700, lineHeight: 0.95, letterSpacing: "-0.04em", color: INK, fontVariantNumeric: "tabular-nums" }}>
              {s.value}
              <span className={mono.className} style={{ fontSize: 14, fontWeight: 500, color: RED, marginLeft: 6, letterSpacing: "0.04em" }}>{s.unit}</span>
            </div>
            <div style={{ height: 2, background: `${INK}11`, position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", inset: 0, width: s.bar, background: RED, boxShadow: `0 0 8px ${RED}88` }} />
            </div>
            <div className={mono.className} style={{ fontSize: 10, color: GREY, letterSpacing: "0.16em" }}>{s.sub}</div>
            {i === 0 ? (
              <span aria-hidden style={{ position: "absolute", top: 8, right: 8, fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace", fontSize: 9, letterSpacing: "0.2em", color: RED }}>
                ↳ ZOOM
              </span>
            ) : null}
          </div>
        ))}
      </div>

      <div style={{ marginTop: 18, height: 80, border: `1px solid ${INK}1A`, padding: "10px 16px", position: "relative" }}>
        <span className={mono.className} style={{ position: "absolute", top: 8, left: 16, fontSize: 9, letterSpacing: "0.22em", color: GREY, textTransform: "uppercase" }}>T-60s</span>
        <span className={mono.className} style={{ position: "absolute", top: 8, right: 16, fontSize: 9, letterSpacing: "0.22em", color: GREY, textTransform: "uppercase" }}>NOW</span>
        <svg viewBox="0 0 1000 60" preserveAspectRatio="none" style={{ width: "100%", height: "100%" }}>
          <defs>
            <linearGradient id="v7TelemTrace" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={RED} stopOpacity="0.25" />
              <stop offset="100%" stopColor={RED} stopOpacity="0" />
            </linearGradient>
          </defs>
          <path d="M0,60 L0,35 Q50,38 100,30 Q150,22 200,28 Q250,34 300,20 Q350,6 400,15 Q450,24 500,12 Q550,0 600,8 Q650,16 700,10 Q750,4 800,18 Q850,32 900,22 Q950,12 1000,25 L1000,60 Z" fill="url(#v7TelemTrace)" />
          <path d="M0,35 Q50,38 100,30 Q150,22 200,28 Q250,34 300,20 Q350,6 400,15 Q450,24 500,12 Q550,0 600,8 Q650,16 700,10 Q750,4 800,18 Q850,32 900,22 Q950,12 1000,25" fill="none" stroke={RED} strokeWidth={1.5} opacity={0.9} />
        </svg>
      </div>

      <div className={mono.className} style={{ marginTop: 18, display: "flex", justifyContent: "space-between", fontSize: 10, letterSpacing: "0.22em", color: GREY, textTransform: "uppercase" }}>
        <span>scale 1 : 8</span>
        <span style={{ color: INK }}>↳ anchor → portfolio level</span>
        <span>frame 04 / 08</span>
      </div>
    </section>
  );
}
