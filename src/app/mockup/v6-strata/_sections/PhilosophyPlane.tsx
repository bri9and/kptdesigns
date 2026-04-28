"use client";

import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({
  subsets: ["latin"],
  axes: ["opsz", "SOFT"],
  style: ["normal", "italic"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

const PAPER = "#F4F1EB";
const INK = "#1A1A22";
const ORANGE = "#FF5E1A";
const SAGE = "#7B8E6F";
const VOID = "#0B0B0F";

export default function PhilosophyPlane() {
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
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
        padding: "clamp(60px, 8vh, 100px) clamp(24px, 6vw, 80px)",
      }}
      aria-labelledby="strata-philosophy-title"
    >
      {/* Strata striations */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `repeating-linear-gradient(180deg, transparent 0 119px, rgba(26,26,34,0.05) 119px 120px)`,
          pointerEvents: "none",
        }}
      />
      {/* Edge fade */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(ellipse at center, rgba(11,11,15,0) 38%, rgba(11,11,15,0.18) 70%, ${VOID} 100%)`,
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", width: "100%", maxWidth: 1180, zIndex: 2 }}>
        {/* Header rule */}
        <header style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: "clamp(40px, 6vh, 64px)" }}>
          <span
            className={mono.className}
            style={{
              fontSize: 11,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: ORANGE,
              fontWeight: 600,
            }}
          >
            Stratum 02 · Philosophy
          </span>
          <span aria-hidden style={{ flex: 1, height: 1, background: ORANGE, opacity: 0.6 }} />
          <span
            className={mono.className}
            style={{
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: INK,
              opacity: 0.55,
            }}
          >
            02 / 08
          </span>
        </header>

        {/* Headline */}
        <h2
          id="strata-philosophy-title"
          className={fraunces.className}
          style={{
            margin: 0,
            fontSize: "clamp(2.6rem, 6vw, 5.4rem)",
            fontWeight: 300,
            lineHeight: 0.96,
            letterSpacing: "-0.025em",
            fontVariationSettings: '"opsz" 144, "SOFT" 50',
            color: INK,
            marginBottom: "clamp(36px, 5vh, 56px)",
          }}
        >
          No Templates.{" "}
          <em style={{ fontStyle: "italic", color: ORANGE, fontWeight: 300 }}>No Shortcuts.</em>
        </h2>

        {/* 2-col body + pull quote */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1.1fr 1fr",
            gap: "clamp(28px, 4vw, 56px)",
            alignItems: "start",
          }}
        >
          <div
            style={{
              fontSize: "clamp(15px, 1.4vw, 18px)",
              lineHeight: 1.75,
              color: INK,
              opacity: 0.82,
              fontWeight: 300,
            }}
          >
            We build modern, lightning-fast websites that actually convert
            visitors into customers. Every site is{" "}
            <strong style={{ color: ORANGE, fontWeight: 500 }}>
              hand-coded from scratch
            </strong>{" "}
            — no templates, no page builders, no WordPress.
            <br />
            <br />
            You get the complete source code. No lock-in, no proprietary
            platforms.{" "}
            <strong style={{ color: ORANGE, fontWeight: 500 }}>
              Your website. Your code. Forever.
            </strong>
          </div>

          {/* Pull quote — sage-bordered editorial card */}
          <aside
            style={{
              position: "relative",
              padding: "clamp(28px, 3.5vw, 44px)",
              background: "rgba(26,26,34,0.04)",
              borderLeft: `2px solid ${SAGE}`,
            }}
          >
            <span
              aria-hidden
              className={fraunces.className}
              style={{
                position: "absolute",
                top: -8,
                left: 18,
                fontStyle: "italic",
                fontSize: 80,
                lineHeight: 1,
                color: ORANGE,
                opacity: 0.18,
                fontWeight: 700,
              }}
            >
              &ldquo;
            </span>
            <blockquote
              className={fraunces.className}
              style={{
                margin: 0,
                fontStyle: "italic",
                fontSize: "clamp(1.05rem, 1.4vw, 1.25rem)",
                lineHeight: 1.55,
                color: INK,
                fontWeight: 400,
                fontVariationSettings: '"opsz" 96, "SOFT" 80',
              }}
            >
              We use modern frameworks like Next.js, React, and Tailwind CSS.
              Your site will be fast, secure, and built with the same tools used
              by top tech companies.
            </blockquote>
            <cite
              className={mono.className}
              style={{
                display: "block",
                marginTop: 22,
                fontStyle: "normal",
                fontSize: 10,
                letterSpacing: "0.3em",
                textTransform: "uppercase",
                color: ORANGE,
                fontWeight: 500,
              }}
            >
              — Our Promise
            </cite>
          </aside>
        </div>

        {/* Footer ornament */}
        <footer style={{ marginTop: "clamp(48px, 6vh, 72px)", display: "flex", alignItems: "center", gap: 14 }}>
          <span aria-hidden style={{ flex: 1, height: 1, background: SAGE, opacity: 0.45 }} />
          <span
            className={mono.className}
            style={{
              fontSize: 10,
              letterSpacing: "0.3em",
              textTransform: "uppercase",
              color: INK,
              opacity: 0.55,
            }}
          >
            cont. stratum 03 → stack
          </span>
          <span aria-hidden style={{ flex: 1, height: 1, background: SAGE, opacity: 0.45 }} />
        </footer>
      </div>
    </section>
  );
}
