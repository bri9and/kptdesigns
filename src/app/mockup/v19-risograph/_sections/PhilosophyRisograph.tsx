"use client";

import { Anybody, Stardos_Stencil } from "next/font/google";

const anybody = Anybody({
  subsets: ["latin"],
  weight: ["400", "700", "900"],
});
const stencil = Stardos_Stencil({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const PINK = "#FF48B0";
const TEAL = "#00B7A8";
const YELLOW = "#FFE100";
const INK = "#1A1A1A";
const PAPER = "#F5F0E1";

// Newsprint: tan paper + subtle halftone dot grid + faint fiber noise.
const newsprintBg = `
  radial-gradient(circle at 1px 1px, rgba(26,26,26,0.10) 1px, transparent 1.4px),
  radial-gradient(circle at 6px 6px, rgba(26,26,26,0.05) 0.6px, transparent 1.2px),
  repeating-linear-gradient(37deg, rgba(26,26,26,0.018) 0 2px, transparent 2px 5px),
  radial-gradient(ellipse at 20% 0%, rgba(255,72,176,0.06), transparent 55%),
  radial-gradient(ellipse at 90% 100%, rgba(0,183,168,0.06), transparent 50%),
  linear-gradient(180deg, #F1ECDB 0%, ${PAPER} 50%, #EFE8D2 100%)
`;
const newsprintSize = "8px 8px, 12px 12px, auto, auto, auto, auto";

const lines: { text: string; rot: number; color: string }[] = [
  { text: "WE HAND-CODE", rot: -2, color: PINK },
  { text: "WE DON'T STEAL", rot: 1, color: TEAL },
  { text: "WE DON'T LOCK-IN", rot: -1, color: PINK },
  { text: "YOUR SOURCE = YOUR PROPERTY", rot: 2, color: TEAL },
  { text: "FROM 2004", rot: -1, color: PINK },
];

// Hand-drawn doodles, all line-only, slightly wobbly.
function ArrowDoodle({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 120 60" width="120" height="60" className={className} style={style} aria-hidden>
      <path d="M4 38 C 28 18, 60 50, 92 22" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <path d="M84 14 L 96 22 L 86 32" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function AsteriskDoodle({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 60 60" width="60" height="60" className={className} style={style} aria-hidden>
      <g stroke={INK} strokeWidth="2.6" strokeLinecap="round" fill="none">
        <path d="M30 8 L 30 52" />
        <path d="M10 18 L 50 42" />
        <path d="M50 18 L 10 42" />
        <path d="M8 30 L 52 30" />
      </g>
    </svg>
  );
}

function BoltDoodle({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 60 100" width="60" height="100" className={className} style={style} aria-hidden>
      <path d="M34 6 L 12 54 L 28 54 L 18 94 L 50 38 L 34 38 L 42 6 Z"
        stroke={INK} strokeWidth="2.6" fill="none" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

// Halftone-dot underline strip, fluorescent.
function HalftoneUnderline({ color }: { color: string }) {
  return (
    <span
      aria-hidden
      style={{
        display: "block",
        height: "10px",
        width: "100%",
        marginTop: "4px",
        backgroundImage: `radial-gradient(circle, ${color} 38%, transparent 42%)`,
        backgroundSize: "9px 9px",
        backgroundPosition: "0 0",
        filter: "drop-shadow(1px 0 0 rgba(0,183,168,0.55))",
        opacity: 0.92,
      }}
    />
  );
}

// Hand-drawn quotation mark (open / close mirrored).
function QuoteMark({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      viewBox="0 0 80 80"
      width="64"
      height="64"
      aria-hidden
      style={{ transform: flip ? "scaleX(-1)" : undefined, display: "inline-block" }}
    >
      <g stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 50 C 8 34, 22 16, 34 14" />
        <path d="M22 56 C 14 40, 28 22, 40 20" />
        <path d="M44 50 C 38 34, 52 16, 64 14" />
        <path d="M52 56 C 44 40, 58 22, 70 20" />
      </g>
    </svg>
  );
}

export default function PhilosophyRisograph() {
  return (
    <section
      aria-label="Manifesto"
      className={anybody.className}
      style={{
        position: "relative",
        width: "100%",
        background: newsprintBg,
        backgroundSize: newsprintSize,
        color: INK,
        padding: "120px 24px 140px",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      {/* Margin doodles */}
      <ArrowDoodle style={{ position: "absolute", top: "80px", left: "4%", transform: "rotate(-12deg)", opacity: 0.85 }} />
      <AsteriskDoodle style={{ position: "absolute", top: "180px", right: "6%", transform: "rotate(14deg)", opacity: 0.9 }} />
      <BoltDoodle style={{ position: "absolute", bottom: "120px", left: "5%", transform: "rotate(-18deg)", opacity: 0.85 }} />
      <AsteriskDoodle style={{ position: "absolute", bottom: "60px", right: "8%", transform: "rotate(-22deg) scale(0.85)", opacity: 0.85 }} />
      <ArrowDoodle style={{ position: "absolute", top: "44%", right: "3%", transform: "rotate(168deg) scale(0.7)", opacity: 0.7 }} />
      <BoltDoodle style={{ position: "absolute", top: "30%", left: "2.5%", transform: "rotate(28deg) scale(0.6)", opacity: 0.75 }} />

      {/* MANIFESTO header — stencil with teal misregistration */}
      <div style={{ maxWidth: "1100px", margin: "0 auto", position: "relative" }}>
        <h2
          className={stencil.className}
          style={{
            position: "relative",
            margin: 0,
            fontSize: "clamp(72px, 14vw, 188px)",
            lineHeight: 0.88,
            letterSpacing: "0.02em",
            fontWeight: 700,
            color: PINK,
            textAlign: "center",
            transform: "rotate(-1.2deg)",
            // Teal misregistration ghost + faint black ink-bleed.
            textShadow: `4px -3px 0 ${TEAL}, -1px 1px 0 rgba(26,26,26,0.18), 0 0 1px rgba(255,72,176,0.6)`,
            mixBlendMode: "multiply",
          }}
        >
          MANIFESTO
        </h2>

        {/* hand-drawn underline scribble under header */}
        <svg
          viewBox="0 0 800 24"
          preserveAspectRatio="none"
          width="100%"
          height="22"
          aria-hidden
          style={{ display: "block", marginTop: "8px", marginBottom: "8px", transform: "rotate(-0.6deg)" }}
        >
          <path
            d="M6 14 C 120 4, 240 22, 380 10 S 640 22, 794 8"
            stroke={TEAL}
            strokeWidth="3.4"
            fill="none"
            strokeLinecap="round"
            style={{ filter: `drop-shadow(2px 1px 0 ${PINK})` }}
          />
        </svg>

        {/* Manifesto lines */}
        <ul
          style={{
            listStyle: "none",
            margin: "56px auto 0",
            padding: 0,
            maxWidth: "880px",
            display: "flex",
            flexDirection: "column",
            gap: "30px",
            alignItems: "center",
          }}
        >
          {lines.map((l) => (
            <li
              key={l.text}
              style={{
                transform: `rotate(${l.rot}deg)`,
                width: "fit-content",
                maxWidth: "100%",
              }}
            >
              <span
                style={{
                  display: "inline-block",
                  fontSize: "clamp(28px, 5.4vw, 64px)",
                  fontWeight: 900,
                  letterSpacing: "-0.01em",
                  color: INK,
                  lineHeight: 1.02,
                  textTransform: "uppercase",
                  // Faint ink-bleed: pink+teal smudge behind black body text.
                  textShadow: `2px 1px 0 ${l.color}55, -1px 0 0 ${TEAL}33`,
                  paddingBottom: "2px",
                }}
              >
                {l.text}
              </span>
              <HalftoneUnderline color={l.color} />
            </li>
          ))}
        </ul>

        {/* Pull quote — stencil yellow with hand-drawn quotation marks */}
        <figure
          style={{
            margin: "110px auto 0",
            maxWidth: "1000px",
            position: "relative",
            transform: "rotate(-1.4deg)",
            textAlign: "center",
          }}
        >
          <div style={{ position: "absolute", top: "-18px", left: "2%" }}>
            <QuoteMark />
          </div>
          <div style={{ position: "absolute", bottom: "-10px", right: "2%" }}>
            <QuoteMark flip />
          </div>
          <blockquote
            className={stencil.className}
            style={{
              margin: 0,
              padding: "0 72px",
              fontSize: "clamp(54px, 10vw, 132px)",
              lineHeight: 0.94,
              fontWeight: 700,
              letterSpacing: "0.01em",
              color: YELLOW,
              // Pink misregistration + dark outline so yellow reads on cream.
              textShadow: `
                3px 3px 0 ${PINK},
                -2px 0 0 ${TEAL},
                0 0 1px ${INK},
                1px 1px 0 ${INK}
              `,
              WebkitTextStroke: `1.5px ${INK}`,
              mixBlendMode: "multiply",
            }}
          >
            TEMPLATES ARE FOR COWARDS
          </blockquote>
          <figcaption
            style={{
              marginTop: "26px",
              fontSize: "13px",
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: INK,
              opacity: 0.7,
              transform: "rotate(0.8deg)",
            }}
          >
            — KPT designs / dept. of refusal / est. 2004 —
          </figcaption>
        </figure>
      </div>
    </section>
  );
}
