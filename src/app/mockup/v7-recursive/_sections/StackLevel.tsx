"use client";

import { Inter, JetBrains_Mono } from "next/font/google";

const display = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--v7-display",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--v7-mono",
});

const OFF_WHITE = "#FCFCFA";
const INK = "#0A0A0A";
const RED = "#FF1E1E";
const GOLD = "#FFC700";
const GREY = "#9A9A9A";

// next-level zoom anchor — the central "147 sites" disc, where TelemetryLevel
// will emerge from.
export const ANCHOR_POINT = { x: 0.5, y: 0.55 };

type StackEntry = {
  num: string;
  code: string;
  title: string;
  sub: string;
  body: string;
  meta: string;
  accent?: string;
};

const STACK: StackEntry[] = [
  { num: "01", code: "NXT", title: "Next.js 16", sub: "app router · rsc · edge",
    body: "Server-rendered, statically optimized, edge-deployable. Ships HTML before the JS lands.",
    meta: "App Router · RSC · Edge" },
  { num: "02", code: "RCT", title: "React 19", sub: "components, suspense, actions",
    body: "Component architecture built for scale. Suspense boundaries and Server Actions out of the box.",
    meta: "Hooks · Suspense · Server Components" },
  { num: "03", code: "TWC", title: "Tailwind v4", sub: "utility-first, zero dead css",
    body: "Tree-shaken, JIT-compiled styles under 10KB. Pixel-perfect responsive on every device.",
    meta: "JIT · < 10KB · A11y AA" },
  { num: "04", code: "TS",  title: "TypeScript", sub: "strict, end-to-end",
    body: "Type safety from database to DOM. Bugs caught at build time, not by your customers.",
    meta: "Strict · End-to-End" },
  { num: "05", code: "VRC", title: "Vercel Edge", sub: "194 PoPs, 99.99% uptime",
    body: "Global edge so your site loads fast no matter where visitors live. Built-in SSL and DDoS protection.",
    meta: "194 PoPs · 99.99 SLO" },
  { num: "06", code: "KPT", title: "Custom Code", sub: "no templates, no page builders",
    body: "Every line written for your business. You receive the full source — it's yours forever.",
    meta: "Zero Templates · Hand-Crafted" },
  { num: "07", code: "AGT", title: "KPT Agents", sub: "ai inbound phone agents",
    body: "Voice agents that answer, qualify and book appointments. Trained on your docs. Hand-off to a human in one ring.",
    meta: "kpt-agents.ai · sister studio", accent: GOLD },
];

export default function StackLevel() {
  return (
    <section
      className={`${display.variable} ${mono.variable}`}
      style={{
        background: OFF_WHITE, color: INK, width: "100%", height: "100%",
        minHeight: "100vh", padding: "clamp(40px, 5vw, 80px) clamp(20px, 4vw, 64px)",
        fontFamily: "var(--v7-display), system-ui, sans-serif",
        position: "relative", overflow: "hidden", display: "flex", flexDirection: "column",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(${GREY}11 1px, transparent 1px), linear-gradient(90deg, ${GREY}11 1px, transparent 1px)`,
          backgroundSize: "48px 48px",
          maskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
          WebkitMaskImage: "radial-gradient(ellipse at center, #000 30%, transparent 75%)",
          pointerEvents: "none",
        }}
      />

      <header
        style={{
          display: "flex", justifyContent: "space-between", alignItems: "baseline",
          fontFamily: "var(--v7-mono), monospace", fontSize: 11,
          letterSpacing: "0.18em", color: GREY, textTransform: "uppercase",
          position: "relative", zIndex: 2,
        }}
      >
        <span><span style={{ color: RED }}>×64</span>&nbsp;LVL 03 — STACK</span>
        <span>kpt/services.stack</span>
        <span><span style={{ color: RED }}>●</span>&nbsp;recording zoom</span>
      </header>

      <div
        style={{
          position: "relative", zIndex: 2, marginTop: 24, marginBottom: 18,
          display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto",
          alignItems: "end", gap: 24,
        }}
      >
        <h2 style={{ fontSize: "clamp(32px, 5.2vw, 76px)", lineHeight: 0.92, letterSpacing: "-0.045em", fontWeight: 500, margin: 0 }}>
          Seven systems.<br />
          <span style={{ color: GREY }}>One </span>
          <span style={{ borderBottom: `3px solid ${RED}`, paddingBottom: 2 }}>stack</span>
          <span style={{ color: GREY }}>.</span>
        </h2>
        <p style={{ fontFamily: "var(--v7-mono), monospace", fontSize: 12, letterSpacing: "0.06em", color: GREY, margin: 0, maxWidth: "44ch" }}>
          What looked like a black plaque is, up close, the seven systems that
          ship every KPT engagement — converging on one anchor.
        </p>
      </div>

      <div
        style={{
          position: "relative", zIndex: 2, flex: 1, display: "grid",
          gap: "clamp(8px, 1vw, 14px)",
          gridTemplateColumns: "repeat(4, 1fr)", gridTemplateRows: "repeat(2, 1fr)",
          minHeight: 360, marginTop: 18,
        }}
      >
        {STACK.slice(0, 6).map((q, i) => <Cell key={q.code} q={q} idx={i} />)}
        <Cell q={STACK[6]} idx={6} tall />
        <div
          data-anchor="zoom-target"
          style={{
            position: "absolute", left: "50%", top: "50%", transform: "translate(-50%, -50%)",
            width: 124, height: 124, borderRadius: "50%",
            background: OFF_WHITE, border: `1.5px solid ${INK}`,
            boxShadow: `0 0 0 8px ${OFF_WHITE}, 0 0 0 9px ${INK}11, 0 30px 60px ${INK}22`,
            display: "grid", placeItems: "center", cursor: "zoom-in", zIndex: 3,
          }}
        >
          <div style={{ textAlign: "center", lineHeight: 1 }}>
            <div style={{ fontFamily: "var(--v7-mono), monospace", fontSize: 9, letterSpacing: "0.22em", color: GREY, textTransform: "uppercase" }}>next ×8</div>
            <div style={{ fontSize: 38, fontWeight: 600, letterSpacing: "-0.05em", marginTop: 4, color: INK }}>
              <span style={{ color: RED }}>147</span>
            </div>
            <div style={{ fontFamily: "var(--v7-mono), monospace", fontSize: 9, letterSpacing: "0.18em", color: INK, textTransform: "uppercase", marginTop: 2 }}>
              live telemetry
            </div>
          </div>
        </div>
      </div>

      <div
        style={{
          position: "relative", zIndex: 2, marginTop: 18,
          display: "flex", justifyContent: "space-between",
          fontFamily: "var(--v7-mono), monospace", fontSize: 10,
          letterSpacing: "0.18em", color: GREY, textTransform: "uppercase",
        }}
      >
        <span>scale 1 : 8</span>
        <span style={{ color: INK }}>↳ anchor → telemetry level</span>
        <span>frame 03 / 08</span>
      </div>
    </section>
  );
}

function Cell({ q, idx, tall = false }: { q: StackEntry; idx: number; tall?: boolean }) {
  const accent = q.accent ?? RED;
  return (
    <article
      style={{
        position: "relative",
        gridColumn: tall ? "4 / 5" : undefined,
        gridRow: tall ? "1 / 3" : undefined,
        padding: "clamp(12px, 1.4vw, 20px)",
        display: "flex", flexDirection: "column", gap: 8,
        background: tall ? INK : "transparent",
        color: tall ? OFF_WHITE : INK,
        border: `1px solid ${tall ? INK : INK + "1A"}`,
        minWidth: 0, overflow: "hidden",
      }}
    >
      <div style={{ fontFamily: "var(--v7-mono), monospace", fontSize: 10, letterSpacing: "0.22em", color: GREY, textTransform: "uppercase", display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ color: accent }}>{q.num}</span>
        <span>· {q.code}</span>
      </div>
      <h3 style={{ fontSize: "clamp(16px, 1.8vw, 24px)", fontWeight: 600, letterSpacing: "-0.025em", margin: 0, lineHeight: 1.05, color: tall ? OFF_WHITE : INK }}>
        {q.title}
      </h3>
      <div style={{ fontFamily: "var(--v7-mono), monospace", fontSize: 10.5, letterSpacing: "0.04em", opacity: 0.7, textTransform: "lowercase" }}>
        {q.sub}
      </div>
      <p style={{ fontSize: 12.5, lineHeight: 1.45, margin: 0, opacity: 0.92, minWidth: 0 }}>{q.body}</p>
      <div style={{ marginTop: "auto", fontFamily: "var(--v7-mono), monospace", fontSize: 9, letterSpacing: "0.2em", color: GREY, textTransform: "uppercase", borderTop: `1px solid ${tall ? GREY + "33" : INK + "22"}`, paddingTop: 6 }}>
        {q.meta}
      </div>
      <span aria-hidden style={{ position: "absolute", top: 6, right: 8, fontFamily: "var(--v7-mono), monospace", fontSize: 8, letterSpacing: "0.2em", color: accent, opacity: 0.6 }}>
        {String(idx + 1).padStart(2, "0")}
      </span>
    </article>
  );
}
