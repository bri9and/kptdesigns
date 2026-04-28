"use client";

import { Stardos_Stencil, Anybody } from "next/font/google";

const stencil = Stardos_Stencil({ subsets: ["latin"], weight: ["400", "700"] });
const anybody = Anybody({ subsets: ["latin"], weight: ["400", "700", "900"] });

// Riso palette
const PAPER = "#F5F0E1";
const PINK = "#FF48B0";
const CYAN = "#00B7A8";
const YELLOW = "#FFE100";
const INK = "#1A1A1A";

type Tool = {
  name: string;
  desc: string;
  size: number;        // vw-ish factor
  rot: number;         // degrees
  color: string;
  underline: string;
};

const LINEUP: Tool[] = [
  { name: "NEXT.JS 16",   desc: "framework headliner",        size: 11.5, rot: -2.4, color: PINK,   underline: CYAN },
  { name: "REACT 19",     desc: "components",                 size: 8.6,  rot: 1.8,  color: INK,    underline: PINK },
  { name: "TAILWIND 4",   desc: "utility-first",              size: 7.4,  rot: -1.4, color: CYAN,   underline: YELLOW },
  { name: "TYPESCRIPT",   desc: "strict types",               size: 6.6,  rot: 2.2,  color: YELLOW, underline: INK },
  { name: "VERCEL EDGE",  desc: "194 venues worldwide",       size: 5.8,  rot: -1.0, color: PINK,   underline: INK },
  { name: "KPT AGENTS",   desc: "live inbound, every set",    size: 5.2,  rot: 1.4,  color: INK,    underline: CYAN },
];

// --- Hand-drawn SVG doodles ---------------------------------------------
const Asterisk = ({ color = INK, size = 40, rot = 0 }: { color?: string; size?: number; rot?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{ transform: `rotate(${rot}deg)` }} aria-hidden>
    <g stroke={color} strokeWidth="3.2" strokeLinecap="round" fill="none">
      <path d="M20 6 L20 34" />
      <path d="M7 13 L33 27" />
      <path d="M7 27 L33 13" />
    </g>
  </svg>
);

const Bang = ({ color = INK, size = 60 }: { color?: string; size?: number }) => (
  <svg width={size * 0.5} height={size} viewBox="0 0 30 60" aria-hidden>
    <path d="M11 4 Q14 2 19 5 L17 38 Q15 42 13 38 Z" fill={color} />
    <circle cx="15" cy="50" r="4.5" fill={color} />
  </svg>
);

const Scribble = ({ color = INK, w = 140, h = 30 }: { color?: string; w?: number; h?: number }) => (
  <svg width={w} height={h} viewBox="0 0 140 30" aria-hidden>
    <path d="M4 22 Q18 4 32 16 T62 14 Q78 22 92 8 T128 18 L136 12"
      fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </svg>
);

// halftone dot underline — dotted line of solid circles
const HalftoneUnderline = ({ color = INK, w = 320 }: { color?: string; w?: number }) => {
  const dots = Math.max(8, Math.floor(w / 10));
  return (
    <svg width={w} height={14} viewBox={`0 0 ${w} 14`} aria-hidden style={{ display: "block" }}>
      {Array.from({ length: dots }).map((_, i) => {
        const x = (i + 0.5) * (w / dots);
        const r = i % 3 === 0 ? 3.4 : i % 2 === 0 ? 2.4 : 1.7;
        const y = 7 + (i % 4 === 0 ? -1.2 : i % 4 === 2 ? 1.4 : 0);
        return <circle key={i} cx={x} cy={y} r={r} fill={color} />;
      })}
    </svg>
  );
};

const halftone = (color: string, size: number) =>
  `radial-gradient(${color} ${Math.max(0.6, size * 0.18)}px, transparent ${size * 0.22}px) 0 0 / ${size}px ${size}px`;

export default function StackRisograph() {
  return (
    <section
      className={anybody.className}
      style={{
        position: "relative",
        padding: "clamp(80px, 12vh, 140px) clamp(20px, 4vw, 56px)",
        background: PAPER,
        color: INK,
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <style>{`
        @keyframes riso-stack-grain { 0%,100% { transform: translate(0,0) } 25% { transform: translate(-3px,2px) } 50% { transform: translate(2px,-3px) } 75% { transform: translate(-2px,-2px) } }
        @keyframes riso-stack-drift { 0% { background-position: 0 0 } 100% { background-position: 220px 220px } }
        .stack-row { transition: transform 240ms cubic-bezier(.4,1.6,.5,1), filter 240ms ease; cursor: default; }
        .stack-row:hover { transform: translate(-3px, -2px) rotate(0deg) !important; filter: saturate(1.15); }
        .stack-row:hover .stack-cyan { transform: translate(7px, 4px) !important; }
        .stack-cyan { transition: transform 240ms ease; }
        @media (max-width: 760px) {
          .kpt-stack-doodle { display: none; }
          .stack-row { text-align: left !important; }
        }
      `}</style>

      {/* Halftone overlays */}
      <div aria-hidden style={{ position: "absolute", inset: 0, background: halftone("rgba(255,72,176,0.22)", 9), mixBlendMode: "multiply", animation: "riso-stack-drift 80s linear infinite", pointerEvents: "none", zIndex: 1 }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, background: halftone("rgba(0,183,168,0.16)", 12), mixBlendMode: "multiply", backgroundPosition: "3px 4px", pointerEvents: "none", zIndex: 1 }} />
      <div aria-hidden style={{ position: "absolute", inset: -20, backgroundImage: "radial-gradient(rgba(26,26,26,0.45) 0.5px, transparent 0.6px), radial-gradient(rgba(26,26,26,0.35) 0.4px, transparent 0.5px)", backgroundSize: "3px 3px, 7px 7px", backgroundPosition: "0 0, 1px 1px", mixBlendMode: "multiply", animation: "riso-stack-grain 0.9s steps(4) infinite", opacity: 0.22, pointerEvents: "none", zIndex: 2 }} />

      {/* Section header — TOOLS LINEUP, misregistered pink + cyan */}
      <div style={{ position: "relative", zIndex: 10, textAlign: "center", marginBottom: "clamp(50px, 8vh, 90px)" }}>
        <div className={stencil.className} style={{ fontSize: 12, letterSpacing: "0.4em", color: INK, marginBottom: 14 }}>
          ★ ONE NIGHT ONLY · DOORS AT BUILD-TIME ★
        </div>
        <div style={{ position: "relative", display: "inline-block", lineHeight: 0.9 }}>
          <div aria-hidden className={stencil.className} style={{ position: "absolute", inset: 0, color: CYAN, transform: "translate(5px, 3px)", fontSize: "clamp(48px, 9vw, 120px)", fontWeight: 700, letterSpacing: "0.02em", mixBlendMode: "multiply", whiteSpace: "nowrap" }}>
            TOOLS LINEUP
          </div>
          <div className={stencil.className} style={{ position: "relative", color: PINK, fontSize: "clamp(48px, 9vw, 120px)", fontWeight: 700, letterSpacing: "0.02em", mixBlendMode: "multiply", whiteSpace: "nowrap" }}>
            TOOLS LINEUP
          </div>
          <div className="kpt-stack-doodle" style={{ position: "absolute", top: -28, left: -52 }}><Asterisk color={YELLOW} size={42} rot={20} /></div>
          <div className="kpt-stack-doodle" style={{ position: "absolute", top: -18, right: -36 }}><Bang color={INK} size={56} /></div>
        </div>
      </div>

      {/* Lineup — vertical stack of band names */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 1100, margin: "0 auto", display: "flex", flexDirection: "column", gap: "clamp(18px, 3.6vh, 42px)" }}>
        {LINEUP.map((tool, i) => {
          const fontSize = `clamp(${tool.size * 2.6}px, ${tool.size}vw, ${tool.size * 12}px)`;
          const align = i % 2 === 0 ? "flex-start" : "flex-end";
          const textAlign = i % 2 === 0 ? "left" : "right";
          const headliner = i === 0;
          return (
            <div
              key={tool.name}
              className="stack-row"
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: align,
                transform: `rotate(${tool.rot}deg)`,
                paddingLeft: i % 2 === 0 ? `${i * 1.2}%` : 0,
                paddingRight: i % 2 === 1 ? `${i * 1.2}%` : 0,
              }}
            >
              <div style={{ position: "relative", display: "inline-block", lineHeight: 0.88 }}>
                {/* misregistration under-layer (cyan) */}
                <div
                  aria-hidden
                  className={`${stencil.className} stack-cyan`}
                  style={{
                    position: "absolute", inset: 0,
                    color: tool.color === CYAN ? PINK : CYAN,
                    transform: `translate(${headliner ? 6 : 4}px, ${headliner ? 3 : 2}px)`,
                    fontSize,
                    fontWeight: 700,
                    letterSpacing: headliner ? "-0.01em" : "0.005em",
                    mixBlendMode: "multiply",
                    whiteSpace: "nowrap",
                  }}
                >
                  {tool.name}
                </div>
                {/* main color top layer */}
                <div
                  className={stencil.className}
                  style={{
                    position: "relative",
                    color: tool.color,
                    fontSize,
                    fontWeight: 700,
                    letterSpacing: headliner ? "-0.01em" : "0.005em",
                    mixBlendMode: "multiply",
                    whiteSpace: "nowrap",
                    WebkitTextStroke: tool.color === YELLOW ? `2px ${INK}` : undefined,
                    textShadow: tool.color !== YELLOW ? `1px 0 0 ${tool.color}` : undefined,
                  }}
                >
                  {tool.name}
                </div>
                {/* halftone dot underline */}
                <div style={{ marginTop: 4, opacity: 0.92 }}>
                  <HalftoneUnderline color={tool.underline} w={Math.min(680, tool.size * 60 + 120)} />
                </div>
              </div>
              {/* description in Anybody hand-feel */}
              <div
                className={anybody.className}
                style={{
                  marginTop: 8,
                  fontSize: `clamp(13px, ${1.05 + tool.size * 0.04}vw, 18px)`,
                  letterSpacing: "0.06em",
                  color: INK,
                  textAlign: textAlign as "left" | "right",
                  fontStyle: "italic",
                  fontWeight: 500,
                }}
              >
                {headliner && <span style={{ background: YELLOW, padding: "1px 6px", marginRight: 8, fontStyle: "normal", letterSpacing: "0.18em", fontSize: "0.85em", border: `1.5px solid ${INK}` }}>HEADLINER</span>}
                — {tool.desc} —
              </div>
            </div>
          );
        })}
      </div>

      {/* Footer ticket strip */}
      <div style={{ position: "relative", zIndex: 10, maxWidth: 900, margin: "clamp(60px, 9vh, 110px) auto 0", padding: "14px 22px", border: `2.5px dashed ${INK}`, transform: "rotate(-0.6deg)", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 16, flexWrap: "wrap", background: PAPER }}>
        <div className={stencil.className} style={{ fontSize: 12, letterSpacing: "0.32em" }}>ADMIT ONE</div>
        <div className={anybody.className} style={{ fontSize: 13, letterSpacing: "0.05em", fontStyle: "italic" }}>six tools · one stage · zero downtime · all ages</div>
        <div className={stencil.className} style={{ fontSize: 12, letterSpacing: "0.32em", color: PINK }}>NO REFUNDS</div>
      </div>

      {/* Floating doodles */}
      <div className="kpt-stack-doodle" style={{ position: "absolute", top: "12%", left: "5%", zIndex: 9 }}><Asterisk color={CYAN} size={48} rot={30} /></div>
      <div className="kpt-stack-doodle" style={{ position: "absolute", top: "30%", right: "4%", zIndex: 9 }}><Bang color={PINK} size={70} /></div>
      <div className="kpt-stack-doodle" style={{ position: "absolute", bottom: "22%", left: "6%", zIndex: 9 }}><Scribble color={YELLOW} w={150} h={28} /></div>
      <div className="kpt-stack-doodle" style={{ position: "absolute", bottom: "10%", right: "8%", zIndex: 9 }}><Asterisk color={INK} size={40} rot={-15} /></div>
      <div className="kpt-stack-doodle" style={{ position: "absolute", top: "60%", left: "3%", zIndex: 9 }}><Asterisk color={PINK} size={28} rot={50} /></div>
      <div className="kpt-stack-doodle" style={{ position: "absolute", top: "70%", right: "3%", zIndex: 9 }}><Bang color={CYAN} size={54} /></div>
    </section>
  );
}
