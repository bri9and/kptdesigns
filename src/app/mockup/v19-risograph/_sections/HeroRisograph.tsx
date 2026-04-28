"use client";

import { Stardos_Stencil, Anybody } from "next/font/google";
import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";

const stencil = Stardos_Stencil({ subsets: ["latin"], weight: ["400", "700"] });
const anybody = Anybody({ subsets: ["latin"], weight: ["400", "700", "900"] });

const PAPER = "#F5F0E1";
const PINK = "#FF48B0";
const CYAN = "#00B7A8";
const YELLOW = "#FFE100";
const INK = "#1A1A1A";
const SERVICES = ["REGISTRAR", "HOST", "DESIGNER", "AGENTS"];

// Hand-drawn SVG doodles -------------------------------------------------
const Asterisk = ({ color = INK, size = 40, rot = 0 }: { color?: string; size?: number; rot?: number }) => (
  <svg width={size} height={size} viewBox="0 0 40 40" style={{ transform: `rotate(${rot}deg)` }} aria-hidden>
    <g stroke={color} strokeWidth="3.2" strokeLinecap="round" fill="none">
      <path d="M20 6 L20 34" /><path d="M7 13 L33 27" /><path d="M7 27 L33 13" />
      <path d="M20 11 L20 29" opacity="0.55" />
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
    <path d="M4 22 Q18 4 32 16 T62 14 Q78 22 92 8 T128 18 L136 12" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" />
  </svg>
);
const Star4 = ({ color = INK, size = 36, rot = 0 }: { color?: string; size?: number; rot?: number }) => (
  <svg width={size} height={size} viewBox="0 0 36 36" style={{ transform: `rotate(${rot}deg)` }} aria-hidden>
    <path d="M18 2 Q20 16 34 18 Q20 20 18 34 Q16 20 2 18 Q16 16 18 2 Z" fill={color} />
  </svg>
);

const halftone = (color: string, size: number) =>
  `radial-gradient(${color} ${Math.max(0.6, size * 0.18)}px, transparent ${size * 0.22}px) 0 0 / ${size}px ${size}px`;

export default function HeroRisograph() {
  const [flicker, setFlicker] = useState(false);

  return (
    <section
      className={anybody.className}
      onMouseMove={() => !flicker && setFlicker(true)}
      onMouseLeave={() => setFlicker(false)}
      style={{
        position: "relative", minHeight: "100vh",
        paddingTop: "calc(var(--nav-height, 80px) + clamp(20px, 4vh, 56px))",
        paddingBottom: "clamp(60px, 10vh, 120px)",
        paddingLeft: "clamp(20px, 4vw, 56px)", paddingRight: "clamp(20px, 4vw, 56px)",
        background: PAPER, color: INK, overflow: "hidden", isolation: "isolate",
      }}
    >
      <style>{`
        @keyframes riso-grain { 0%,100% { transform: translate(0,0) } 25% { transform: translate(-3px,2px) } 50% { transform: translate(2px,-3px) } 75% { transform: translate(-2px,-2px) } }
        @keyframes riso-halftone-drift { 0% { background-position: 0 0 } 100% { background-position: 200px 200px } }
        @keyframes riso-cyan-flicker { 0%,100% { transform: translate(4px,2px) } 50% { transform: translate(5px,3px) } }
        .kpt-cyan-layer { transition: filter 380ms ease, transform 380ms cubic-bezier(.4,1.6,.5,1); }
        .kpt-hero:hover .kpt-cyan-layer { filter: hue-rotate(-22deg) saturate(1.3); transform: translate(7px, 4px); }
        @media (max-width: 760px) {
          .kpt-halftone-pink, .kpt-halftone-cyan { display: none; }
          .kpt-cyan-layer { display: none; }
          .kpt-doodle-extra { display: none; }
          .kpt-diagonal-banner { transform: rotate(-6deg) translateY(20px) !important; }
        }
      `}</style>

      <div aria-hidden className="kpt-halftone-pink" style={{ position: "absolute", inset: 0, background: halftone("rgba(255,72,176,0.32)", 9), mixBlendMode: "multiply", animation: "riso-halftone-drift 60s linear infinite", pointerEvents: "none", zIndex: 1 }} />
      <div aria-hidden className="kpt-halftone-cyan" style={{ position: "absolute", inset: 0, background: halftone("rgba(0,183,168,0.22)", 11), mixBlendMode: "multiply", backgroundPosition: "3px 4px", pointerEvents: "none", zIndex: 1 }} />

      <motion.div
        aria-hidden
        animate={{ opacity: [0.18, 0.26, 0.2] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{
          position: "absolute", inset: -20,
          backgroundImage: "radial-gradient(rgba(26,26,26,0.5) 0.5px, transparent 0.6px), radial-gradient(rgba(26,26,26,0.4) 0.4px, transparent 0.5px)",
          backgroundSize: "3px 3px, 7px 7px", backgroundPosition: "0 0, 1px 1px",
          mixBlendMode: "multiply", animation: "riso-grain 0.9s steps(4) infinite",
          pointerEvents: "none", zIndex: 2,
        }}
      />

      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 55%, rgba(26,26,26,0.18) 100%)", pointerEvents: "none", zIndex: 3 }} />

      {/* Top zine masthead */}
      <div style={{ position: "relative", zIndex: 10, display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 16, flexWrap: "wrap", marginBottom: "clamp(20px, 4vh, 60px)" }}>
        <div className={stencil.className} style={{ fontSize: 13, letterSpacing: "0.32em", color: INK, lineHeight: 1.3 }}>
          ISSUE №26 · SPRING<br /><span style={{ color: PINK }}>VOL. ONE · KPT.WEB</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <Asterisk color={PINK} size={28} rot={20} />
          <Asterisk color={CYAN} size={36} rot={-15} />
          <Asterisk color={INK} size={24} rot={45} />
        </div>
        <div className={stencil.className} style={{ fontSize: 13, letterSpacing: "0.3em", color: INK, textAlign: "right", lineHeight: 1.3 }}>
          PRINTED · NOT PIXELED<br /><span style={{ color: CYAN }}>RUN OF 1 / 1</span>
        </div>
      </div>

      {/* Massive KPT — misregistered duotone */}
      <div className="kpt-hero" style={{ position: "relative", zIndex: 10, marginTop: "clamp(8px, 2vh, 30px)", textAlign: "center" }}>
        <div style={{ position: "relative", display: "inline-block", lineHeight: 0.82 }}>
          <div aria-hidden className={`${stencil.className} kpt-cyan-layer`}
            style={{
              position: "absolute", inset: 0, color: CYAN, transform: "translate(4px, 2px)",
              fontSize: "clamp(120px, 28vw, 380px)", fontWeight: 700, letterSpacing: "-0.02em",
              mixBlendMode: "multiply",
              animation: flicker ? "riso-cyan-flicker 0.18s steps(2) infinite" : undefined,
            }}>KPT</div>
          <div className={stencil.className}
            style={{
              position: "relative", color: PINK, fontSize: "clamp(120px, 28vw, 380px)",
              fontWeight: 700, letterSpacing: "-0.02em", mixBlendMode: "multiply",
              textShadow: "1px 0 0 rgba(255,72,176,0.6)",
            }}>KPT</div>

          <div className="kpt-doodle-extra" style={{ position: "absolute", top: -30, left: -50 }}><Star4 color={YELLOW} size={48} rot={20} /></div>
          <div className="kpt-doodle-extra" style={{ position: "absolute", top: -10, right: -20 }}><Bang color={INK} size={70} /></div>
          <div className="kpt-doodle-extra" style={{ position: "absolute", bottom: -10, left: 0 }}><Scribble color={CYAN} w={120} h={26} /></div>
        </div>

        {/* DESIGNS rotated, yellow w/ ink-black shadow */}
        <div style={{ position: "relative", marginTop: "clamp(-30px, -4vh, -10px)", display: "flex", justifyContent: "center" }}>
          <div className="kpt-diagonal-banner" style={{ transform: "rotate(-3deg)", display: "inline-block", position: "relative" }}>
            <div aria-hidden className={stencil.className}
              style={{
                position: "absolute", inset: 0, color: INK, fontSize: "clamp(64px, 14vw, 180px)",
                fontWeight: 700, letterSpacing: "0.04em", transform: "translate(6px, 6px)",
                mixBlendMode: "multiply",
              }}>DESIGNS</div>
            <div className={stencil.className}
              style={{
                position: "relative", color: YELLOW, WebkitTextStroke: `2px ${INK}`,
                fontSize: "clamp(64px, 14vw, 180px)", fontWeight: 700, letterSpacing: "0.04em",
              }}>DESIGNS</div>
            <div className="kpt-doodle-extra" style={{ position: "absolute", top: -25, right: -40 }}><Asterisk color={PINK} size={42} rot={-10} /></div>
          </div>
        </div>
      </div>

      {/* Diagonal banner */}
      <div aria-hidden
        style={{
          position: "absolute", top: "44%", left: "-10%", right: "-10%",
          transform: "rotate(-14deg)", background: INK, padding: "6px 0",
          zIndex: 8, mixBlendMode: "multiply", boxShadow: `0 0 0 2px ${INK}, 4px 4px 0 ${PINK}`,
        }}>
        <div className={stencil.className}
          style={{
            color: PAPER, fontSize: "clamp(14px, 1.6vw, 22px)", letterSpacing: "0.5em",
            textAlign: "center", whiteSpace: "nowrap", overflow: "hidden",
          }}>
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} style={{ marginRight: 36 }}>★ PRINTED IN PITTSBURGH 2026 ★ KPT.WEB ★ ONE-OFF RUN ★</span>
          ))}
        </div>
      </div>

      {/* Services wraparound */}
      <div style={{ position: "relative", zIndex: 10, marginTop: "clamp(60px, 10vh, 120px)", textAlign: "center" }}>
        <div style={{ position: "relative", display: "inline-block" }}>
          <div aria-hidden className={`${stencil.className} kpt-cyan-layer`}
            style={{
              position: "absolute", inset: 0, color: CYAN, transform: "translate(3px, 2px)",
              fontSize: "clamp(18px, 2.6vw, 36px)", letterSpacing: "0.28em", fontWeight: 700,
              mixBlendMode: "multiply", whiteSpace: "nowrap",
            }}>{SERVICES.join("  ·  ")}</div>
          <div className={stencil.className}
            style={{
              position: "relative", color: PINK, fontSize: "clamp(18px, 2.6vw, 36px)",
              letterSpacing: "0.28em", fontWeight: 700, mixBlendMode: "multiply", whiteSpace: "nowrap",
            }}>{SERVICES.join("  ·  ")}</div>
        </div>
      </div>

      {/* Tagline + CTAs */}
      <div style={{ position: "relative", zIndex: 10, marginTop: 36, display: "flex", flexWrap: "wrap", gap: "clamp(18px, 4vw, 48px)", alignItems: "center", justifyContent: "center" }}>
        <p className={anybody.className} style={{ fontSize: "clamp(15px, 1.6vw, 19px)", maxWidth: 460, lineHeight: 1.45, color: INK, letterSpacing: "0.01em" }}>
          We hand-press websites the way zines hand-press posters — <em style={{ background: YELLOW, padding: "0 4px", fontStyle: "normal" }}>one ink layer at a time</em>, off-register on purpose, alive.
        </p>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href="/start" className={stencil.className}
            style={{
              display: "inline-block", padding: "16px 28px", background: PINK, color: INK,
              fontSize: 16, letterSpacing: "0.18em", fontWeight: 700, border: `3px solid ${INK}`,
              boxShadow: `5px 5px 0 ${CYAN}, 5px 5px 0 1px ${INK}`, textDecoration: "none",
              transform: "rotate(-1.5deg)", transition: "transform 180ms ease, box-shadow 180ms ease",
            }}
            onMouseEnter={(e) => { e.currentTarget.style.transform = "rotate(0.5deg) translate(-2px,-2px)"; e.currentTarget.style.boxShadow = `7px 7px 0 ${CYAN}, 7px 7px 0 1px ${INK}`; }}
            onMouseLeave={(e) => { e.currentTarget.style.transform = "rotate(-1.5deg)"; e.currentTarget.style.boxShadow = `5px 5px 0 ${CYAN}, 5px 5px 0 1px ${INK}`; }}>
            START A SITE →
          </Link>
          <Link href="/pricing" className={stencil.className}
            style={{
              display: "inline-block", padding: "16px 28px", background: PAPER, color: INK,
              fontSize: 16, letterSpacing: "0.18em", fontWeight: 700, border: `3px solid ${INK}`,
              boxShadow: `5px 5px 0 ${YELLOW}, 5px 5px 0 1px ${INK}`, textDecoration: "none",
              transform: "rotate(1.2deg)",
            }}>SEE PRICING</Link>
        </div>
      </div>

      {/* Floating doodles */}
      <div className="kpt-doodle-extra" style={{ position: "absolute", top: "20%", left: "4%", zIndex: 9 }}><Bang color={CYAN} size={80} /></div>
      <div className="kpt-doodle-extra" style={{ position: "absolute", top: "18%", right: "5%", zIndex: 9 }}><Star4 color={PINK} size={44} rot={-30} /></div>
      <div className="kpt-doodle-extra" style={{ position: "absolute", bottom: "22%", left: "8%", zIndex: 9 }}><Scribble color={YELLOW} w={170} h={32} /></div>
      <div className="kpt-doodle-extra" style={{ position: "absolute", bottom: "15%", right: "7%", zIndex: 9 }}><Asterisk color={INK} size={56} rot={15} /></div>
      <div className="kpt-doodle-extra" style={{ position: "absolute", top: "55%", left: "3%", zIndex: 9 }}><Asterisk color={CYAN} size={32} rot={60} /></div>
    </section>
  );
}
