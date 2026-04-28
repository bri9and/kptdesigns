"use client";

import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "900"],
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

// Inside the dot above the "i" of "Designs", there's a tiny serif crystal —
// at the next zoom we'll dive into its central cell. The "01" plaque sits
// where the next level (StackLevel) will appear from.
export const ANCHOR_POINT = { x: 0.5, y: 0.55 };

/**
 * V7 — Recursive Zoom · Level 02 (Philosophy).
 * Pulled from "01 / Philosophy" on live homepage. Two-column with drop cap.
 */
export default function PhilosophyLevel() {
  return (
    <section
      className={inter.className}
      style={{
        position: "relative", width: "100%", height: "100%", minHeight: "100vh",
        background: OFF_WHITE, color: INK,
        padding: "clamp(48px, 6vw, 96px) clamp(24px, 5vw, 96px)",
        overflow: "hidden", display: "flex", alignItems: "center",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          backgroundImage: `linear-gradient(${GREY}14 1px, transparent 1px)`,
          backgroundSize: "100% 28px", opacity: 0.5, pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", width: "100%", maxWidth: 1280, margin: "0 auto" }}>
        <header
          className={mono.className}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", fontSize: 11, letterSpacing: "0.22em", color: GREY, textTransform: "uppercase", marginBottom: 36 }}
        >
          <span><span style={{ color: RED }}>●</span>&nbsp;&nbsp;LVL 02 · PHILOSOPHY</span>
          <span>§ 01 / 06 — KPT MANIFESTO</span>
          <span>SCALE 8×</span>
        </header>

        <div style={{ display: "grid", gridTemplateColumns: "minmax(0, 6fr) minmax(0, 5fr)", gap: "clamp(28px, 5vw, 80px)", alignItems: "start" }}>
          <div>
            <span
              className={mono.className}
              style={{ display: "inline-block", fontSize: 11, letterSpacing: "0.32em", color: RED, textTransform: "uppercase", marginBottom: 20 }}
            >
              01 / Philosophy
            </span>
            <h2 style={{ margin: 0, fontSize: "clamp(40px, 6vw, 88px)", lineHeight: 0.92, letterSpacing: "-0.045em", fontWeight: 700, color: INK }}>
              No templates.<br />
              <span style={{ color: GREY }}>No </span>
              <span style={{ borderBottom: `4px solid ${RED}`, paddingBottom: 4 }}>shortcuts</span>
              <span style={{ color: GREY }}>.</span>
            </h2>
            <div
              style={{ marginTop: 32, display: "grid", gap: 20, fontSize: "clamp(15px, 1.3vw, 18px)", lineHeight: 1.6, color: INK, letterSpacing: "-0.005em", maxWidth: "62ch" }}
            >
              <p style={{ margin: 0 }}>
                <span
                  style={{ float: "left", fontSize: "clamp(72px, 9vw, 132px)", lineHeight: 0.78, fontWeight: 900, color: RED, paddingRight: 14, paddingTop: 4, letterSpacing: "-0.06em" }}
                >
                  W
                </span>
                e build modern, lightning-fast websites that actually convert
                visitors into customers. Every site is{" "}
                <strong style={{ color: RED, fontWeight: 600 }}>hand-coded from scratch</strong>
                {" "}— no templates, no page builders, no WordPress, no proprietary lock-in.
              </p>
              <p style={{ margin: 0 }}>
                You receive the complete source code on day one. No hostage
                situations, no surprise vendor invoices.{" "}
                <strong style={{ color: INK, fontWeight: 600 }}>Your website. Your code. Forever.</strong>
              </p>
            </div>
          </div>

          <aside style={{ position: "relative", borderLeft: `2px solid ${RED}`, paddingLeft: "clamp(20px, 2vw, 32px)", paddingTop: 8 }}>
            <span
              className={mono.className}
              style={{ display: "block", fontSize: 10, letterSpacing: "0.32em", color: GREY, textTransform: "uppercase", marginBottom: 18 }}
            >
              KPT / Promise
            </span>
            <blockquote style={{ margin: 0, fontSize: "clamp(18px, 1.7vw, 24px)", fontStyle: "italic", fontWeight: 400, lineHeight: 1.5, color: INK, letterSpacing: "-0.012em" }}>
              &ldquo;The same hands that register your domain ship your code,
              host your edge, and answer your phones. One process. One bill.
              One team. Owned outright.&rdquo;
            </blockquote>
            <cite
              className={mono.className}
              style={{ display: "block", marginTop: 24, fontSize: 11, letterSpacing: "0.28em", color: RED, textTransform: "uppercase", fontStyle: "normal" }}
            >
              — Est. 2004 · Pittsburgh, PA
            </cite>

            <div
              data-anchor="zoom-target"
              style={{ marginTop: 36, padding: "14px 16px", background: INK, color: OFF_WHITE, display: "inline-flex", alignItems: "center", gap: 12, cursor: "zoom-in" }}
            >
              <span aria-hidden style={{ width: 8, height: 8, borderRadius: "50%", background: RED, boxShadow: `0 0 10px ${RED}` }} />
              <span className={mono.className} style={{ fontSize: 10.5, letterSpacing: "0.32em", textTransform: "uppercase" }}>
                next ×8 — the stack
              </span>
            </div>
          </aside>
        </div>

        <footer
          className={mono.className}
          style={{ marginTop: 56, display: "flex", justifyContent: "space-between", fontSize: 10, letterSpacing: "0.22em", color: GREY, textTransform: "uppercase" }}
        >
          <span>scale 1 : 8</span>
          <span style={{ color: INK }}>↳ anchor → stack level</span>
          <span>frame 02 / 08</span>
        </footer>
      </div>
    </section>
  );
}
