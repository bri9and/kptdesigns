"use client";

import { Anybody, Stardos_Stencil } from "next/font/google";
import type { CSSProperties } from "react";

const anybody = Anybody({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
});

const stencil = Stardos_Stencil({
  subsets: ["latin"],
  weight: ["400", "700"],
});

// Riso palette
const PINK = "#FF48B0";
const TEAL = "#00B7A8";
const YELLOW = "#FFE100";
const INK = "#1A1A1A";
const PAPER = "#F5F0E1";

type Step = {
  no: string;
  name: string;
  body: string;
  bg: string;
  ink: string;
  side: "L" | "R";
  rot: number;
};

const STEPS: Step[] = [
  { no: "01", name: "TALK", body: "we listen / 30 min / no pressure", bg: PINK, ink: INK, side: "L", rot: -2.4 },
  { no: "02", name: "BUILD", body: "we code / show you weekly / fix til right", bg: TEAL, ink: INK, side: "R", rot: 1.8 },
  { no: "03", name: "LAUNCH", body: "private beta / your call / public deploy", bg: YELLOW, ink: INK, side: "L", rot: -1.4 },
  { no: "04", name: "OWN IT", body: "code in your hands / no rent / no lock-in", bg: INK, ink: PAPER, side: "R", rot: 2.2 },
];

// Halftone overlay generator — concentric dot pattern in a tinted color
function halftoneBg(color: string, size = 6): CSSProperties {
  return {
    backgroundImage: `radial-gradient(${color} 28%, transparent 30%)`,
    backgroundSize: `${size}px ${size}px`,
  };
}

// Newsprint paper background with halftone speckle
const paperStyle: CSSProperties = {
  backgroundColor: PAPER,
  backgroundImage: [
    "radial-gradient(rgba(26,26,26,0.10) 1px, transparent 1.4px)",
    "radial-gradient(rgba(26,26,26,0.06) 1px, transparent 1.6px)",
    "repeating-linear-gradient(91deg, rgba(0,183,168,0.03) 0 2px, transparent 2px 7px)",
    "repeating-linear-gradient(178deg, rgba(255,72,176,0.025) 0 2px, transparent 2px 9px)",
  ].join(","),
  backgroundSize: "4px 4px, 7px 7px, auto, auto",
  backgroundPosition: "0 0, 2px 2px, 0 0, 0 0",
};

// Hand-drawn arrow SVG — wobbly, organic
function ZineArrow({ direction, color }: { direction: "down-right" | "down-left"; color: string }) {
  const flip = direction === "down-left";
  return (
    <svg
      viewBox="0 0 200 160"
      width="100%"
      height="100%"
      preserveAspectRatio="none"
      style={{ transform: flip ? "scaleX(-1)" : "none", overflow: "visible" }}
      aria-hidden="true"
    >
      {/* misregistered shadow */}
      <path
        d="M 18 14 C 40 38, 28 64, 70 76 S 130 92, 152 130"
        fill="none"
        stroke={PINK}
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.55"
        transform="translate(3 2)"
      />
      <path
        d="M 20 12 C 42 36, 30 62, 72 74 S 132 90, 154 128"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* arrow head */}
      <path
        d="M 138 118 L 156 132 L 134 138"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* tiny scribble */}
      <path
        d="M 60 30 q 6 -8 12 0 t 12 0"
        fill="none"
        stroke={TEAL}
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.7"
      />
    </svg>
  );
}

function StepCard({ step }: { step: Step }) {
  const accent = step.bg === INK ? YELLOW : INK;
  return (
    <div
      style={{
        position: "relative",
        backgroundColor: step.bg,
        color: step.ink,
        border: `3px solid ${INK}`,
        boxShadow: `8px 8px 0 ${INK}, 8px 8px 0 4px ${step.bg === PINK ? TEAL : PINK}`,
        transform: `rotate(${step.rot}deg)`,
        padding: "28px 26px 30px",
        overflow: "hidden",
      }}
    >
      {/* halftone overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          ...halftoneBg("rgba(26,26,26,0.18)", 5),
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      />
      {/* perforation strip */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: 10,
          left: 10,
          right: 10,
          height: 0,
          borderTop: `2px dashed ${step.ink}`,
          opacity: 0.45,
        }}
      />

      {/* massive misregistered number */}
      <div style={{ position: "relative", lineHeight: 0.78, marginBottom: 8 }}>
        <span
          className={stencil.className}
          style={{
            position: "absolute",
            inset: 0,
            fontSize: "clamp(96px, 14vw, 168px)",
            fontWeight: 700,
            color: PINK,
            transform: "translate(-3px, 2px)",
            opacity: 0.85,
          }}
        >
          {step.no}
        </span>
        <span
          className={stencil.className}
          style={{
            position: "absolute",
            inset: 0,
            fontSize: "clamp(96px, 14vw, 168px)",
            fontWeight: 700,
            color: TEAL,
            transform: "translate(3px, -2px)",
            opacity: 0.7,
            mixBlendMode: "multiply",
          }}
        >
          {step.no}
        </span>
        <span
          className={stencil.className}
          style={{
            position: "relative",
            display: "block",
            fontSize: "clamp(96px, 14vw, 168px)",
            fontWeight: 700,
            color: step.ink,
            letterSpacing: "-0.02em",
          }}
        >
          {step.no}
        </span>
      </div>

      <div
        className={stencil.className}
        style={{
          fontSize: "clamp(28px, 3.4vw, 42px)",
          fontWeight: 700,
          letterSpacing: "0.04em",
          color: step.ink,
          borderTop: `3px solid ${accent}`,
          paddingTop: 10,
          marginTop: 6,
        }}
      >
        {step.name}
      </div>

      <p
        className={anybody.className}
        style={{
          marginTop: 12,
          fontSize: "clamp(15px, 1.4vw, 18px)",
          fontStyle: "italic",
          fontWeight: 400,
          lineHeight: 1.35,
          color: step.ink,
          opacity: 0.95,
        }}
      >
        {step.body}
      </p>

      {/* corner staple/tape */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          top: -10,
          right: 18,
          width: 64,
          height: 22,
          background: "rgba(255,225,0,0.78)",
          border: `1.5px solid ${INK}`,
          transform: "rotate(8deg)",
          boxShadow: `0 4px 0 rgba(0,0,0,0.18)`,
        }}
      />
    </div>
  );
}

export default function ProcessRisograph() {
  return (
    <section
      style={{
        ...paperStyle,
        position: "relative",
        padding: "clamp(64px, 9vw, 120px) clamp(20px, 5vw, 64px)",
        overflow: "hidden",
        borderTop: `3px solid ${INK}`,
        borderBottom: `3px solid ${INK}`,
      }}
    >
      {/* Section header — misregistered */}
      <header style={{ position: "relative", marginBottom: "clamp(48px, 7vw, 96px)", textAlign: "center" }}>
        <div style={{ position: "relative", display: "inline-block", lineHeight: 0.85 }}>
          <span
            className={stencil.className}
            style={{
              position: "absolute",
              inset: 0,
              fontSize: "clamp(56px, 9vw, 132px)",
              fontWeight: 700,
              color: PINK,
              transform: "translate(-4px, 3px)",
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            HOW IT WORKS
          </span>
          <span
            className={stencil.className}
            style={{
              position: "absolute",
              inset: 0,
              fontSize: "clamp(56px, 9vw, 132px)",
              fontWeight: 700,
              color: TEAL,
              transform: "translate(4px, -3px)",
              letterSpacing: "0.02em",
              mixBlendMode: "multiply",
              whiteSpace: "nowrap",
            }}
          >
            HOW IT WORKS
          </span>
          <span
            className={stencil.className}
            style={{
              position: "relative",
              display: "block",
              fontSize: "clamp(56px, 9vw, 132px)",
              fontWeight: 700,
              color: INK,
              letterSpacing: "0.02em",
              whiteSpace: "nowrap",
            }}
          >
            HOW IT WORKS
          </span>
        </div>
        <p
          className={anybody.className}
          style={{
            marginTop: 18,
            fontSize: "clamp(13px, 1.2vw, 16px)",
            fontStyle: "italic",
            color: INK,
            opacity: 0.8,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
          }}
        >
          a four-step zine // how to start a band &middot; how to ship a site
        </p>
      </header>

      {/* zigzag steps */}
      <div
        style={{
          position: "relative",
          maxWidth: 1100,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          rowGap: "clamp(48px, 7vw, 96px)",
        }}
      >
        {STEPS.map((step, idx) => {
          const isLast = idx === STEPS.length - 1;
          const arrowDir = step.side === "L" ? "down-right" : "down-left";
          const arrowColor = idx % 2 === 0 ? TEAL : PINK;
          return (
            <div
              key={step.no}
              className="riso-step-row"
              data-side={step.side}
              style={{ position: "relative" }}
            >
              <div className="riso-step-card">
                <StepCard step={step} />
              </div>
              {!isLast && (
                <div
                  aria-hidden
                  className="riso-arrow"
                  data-dir={arrowDir}
                >
                  <ZineArrow direction={arrowDir} color={arrowColor} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      <style>{`
        .riso-step-row {
          display: grid;
          grid-template-columns: 1fr;
          align-items: start;
        }
        .riso-step-card {
          width: 100%;
          max-width: 560px;
          margin: 0 auto;
        }
        .riso-arrow {
          width: 70%;
          max-width: 280px;
          height: 110px;
          margin: 12px auto -28px;
        }
        @media (min-width: 768px) {
          .riso-step-row {
            grid-template-columns: 1fr 1fr;
            column-gap: clamp(24px, 4vw, 64px);
          }
          .riso-step-row[data-side="L"] .riso-step-card { grid-column: 1; margin-left: 0; }
          .riso-step-row[data-side="R"] .riso-step-card { grid-column: 2; margin-right: 0; }
          .riso-arrow {
            position: absolute;
            top: 62%;
            width: 38%;
            max-width: 320px;
            height: 140px;
            margin: 0;
          }
          .riso-arrow[data-dir="down-right"] { left: 44%; }
          .riso-arrow[data-dir="down-left"] { right: 44%; }
        }
      `}</style>
    </section>
  );
}
