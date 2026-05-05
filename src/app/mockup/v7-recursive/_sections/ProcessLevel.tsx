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

// next-level zoom anchor — final step's red dot, where the FAQ accordion lives.
export const ANCHOR_POINT = { x: 0.84, y: 0.62 };

type Step = {
  num: string;
  name: string;
  desc: string;
};

const STEPS: Step[] = [
  {
    num: "01",
    name: "Discovery Call",
    desc: "A focused conversation about your goals, audience, and timeline. No drawn-out meetings — just clarity.",
  },
  {
    num: "02",
    name: "Design & Build",
    desc: "We design and code your site from scratch. You see progress early and often. Revisions included.",
  },
  {
    num: "03",
    name: "Review & Launch",
    desc: "We iterate until you love it. Then deploy, configure analytics, and verify everything runs clean.",
  },
  {
    num: "04",
    name: "Delivery & Ownership",
    desc: "Complete source code and repository delivered. No lock-in. No proprietary platforms. It's yours.",
  },
];

/**
 * V7 — Recursive Zoom · Level 06 (Process).
 * Pulled from "05 / Process". Each step is rendered as a nested zoom — Step 02
 * is "inside" Step 01, etc. Reinforces the recursive theme.
 */
const SYS_MONO = "ui-monospace, SFMono-Regular, Menlo, monospace";

export default function ProcessLevel() {
  return (
    <section
      className={inter.className}
      style={{
        position: "relative", width: "100%", height: "100%", minHeight: "100vh",
        background: OFF_WHITE, color: INK,
        padding: "clamp(40px, 5vw, 80px) clamp(20px, 4vw, 64px)",
        overflow: "hidden", display: "flex", flexDirection: "column",
      }}
    >
      <header
        className={mono.className}
        style={{ display: "flex", justifyContent: "space-between", fontSize: 11, letterSpacing: "0.22em", color: GREY, textTransform: "uppercase" }}
      >
        <span><span style={{ color: RED }}>●</span>&nbsp;LVL 06 — PROCESS</span>
        <span>kpt/process.recursive</span>
        <span>SCALE ×32K</span>
      </header>

      <div style={{ marginTop: 28, marginBottom: 28, display: "grid", gridTemplateColumns: "minmax(0, 1fr) auto", alignItems: "end", gap: 24 }}>
        <h2 style={{ margin: 0, fontSize: "clamp(36px, 5.2vw, 76px)", lineHeight: 0.92, letterSpacing: "-0.045em", fontWeight: 600 }}>
          <span
            className={mono.className}
            style={{ display: "block", fontSize: "clamp(11px, 0.9vw, 13px)", fontWeight: 500, letterSpacing: "0.32em", color: RED, marginBottom: 14, textTransform: "uppercase" }}
          >
            05 / Process
          </span>
          Four steps.<br />
          <span style={{ color: GREY }}>One </span>
          <span style={{ borderBottom: `4px solid ${RED}`, paddingBottom: 4 }}>recursion</span>
          <span style={{ color: GREY }}>.</span>
        </h2>
        <p
          className={mono.className}
          style={{ fontSize: 11.5, letterSpacing: "0.05em", color: GREY, margin: 0, maxWidth: "44ch", lineHeight: 1.6 }}
        >
          Each step nests inside the previous — discovery contains design,
          design contains review, review contains delivery. Same fractal.
        </p>
      </div>

      <div style={{ flex: 1, display: "grid", placeItems: "center", minHeight: 360, padding: "12px 0" }}>
        <NestedFrame steps={STEPS} depth={0} />
      </div>

      <div className={mono.className} style={{ marginTop: 18, display: "flex", justifyContent: "space-between", fontSize: 10, letterSpacing: "0.22em", color: GREY, textTransform: "uppercase" }}>
        <span>scale 1 : 8</span>
        <span style={{ color: INK }}>↳ anchor → faq level</span>
        <span>frame 06 / 08</span>
      </div>
    </section>
  );
}

function NestedFrame({ steps, depth }: { steps: Step[]; depth: number }) {
  if (steps.length === 0) return null;
  const [head, ...rest] = steps;
  const accent = depth === 0 ? RED : INK;
  const isLeaf = rest.length === 0;
  const pad = `clamp(${Math.max(8, 24 - depth * 5)}px, ${Math.max(1.0, 2.6 - depth * 0.5)}vw, ${Math.max(14, 40 - depth * 8)}px)`;

  return (
    <div
      data-anchor={isLeaf ? "zoom-target" : undefined}
      style={{
        position: "relative",
        border: `1px solid ${depth === 0 ? INK : INK + "33"}`,
        padding: pad, width: "100%",
        maxWidth: depth === 0 ? 1080 : "100%",
        background: depth === 0 ? OFF_WHITE : "transparent",
        boxShadow: depth === 0 ? `0 30px 60px ${INK}11` : "none",
      }}
    >
      <header style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: depth === 0 ? 16 : 10 }}>
        <span style={{ fontFamily: SYS_MONO, fontSize: depth === 0 ? 24 : 14, fontWeight: 500, color: accent, letterSpacing: "-0.02em" }}>
          {head.num}
        </span>
        <span style={{ fontSize: depth === 0 ? 22 : 14, fontWeight: 600, letterSpacing: "-0.018em", color: INK }}>
          {head.name}
        </span>
        {isLeaf ? (
          <span aria-hidden style={{ marginLeft: "auto", width: 10, height: 10, borderRadius: "50%", background: RED, boxShadow: `0 0 12px ${RED}` }} />
        ) : null}
      </header>

      <p style={{ margin: 0, fontSize: depth === 0 ? 14 : 11.5, lineHeight: 1.5, color: depth === 0 ? INK : INK + "AA", maxWidth: "70ch", marginBottom: rest.length > 0 ? 14 : 0 }}>
        {head.desc}
      </p>

      {rest.length > 0 ? (
        <div style={{ marginTop: 6 }}>
          <span
            style={{ fontFamily: SYS_MONO, fontSize: 9, letterSpacing: "0.28em", color: GREY, textTransform: "uppercase", marginBottom: 8, display: "inline-block" }}
          >
            ↳ contains step {rest[0].num}
          </span>
          <NestedFrame steps={rest} depth={depth + 1} />
        </div>
      ) : null}
    </div>
  );
}
