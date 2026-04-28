"use client";

import { Inter, Caveat, VT323 } from "next/font/google";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "600", "700"] });
const vt323 = VT323({ subsets: ["latin"], weight: ["400"] });

const WALNUT = "#3D2817";
const WALNUT_DEEP = "#2A1A0E";
const TAPE_BROWN = "#8B5A2B";
const TAPE_BROWN_DARK = "#6B4220";
const IVORY = "#F5EBD0";
const IVORY_DIM = "#E8DBB6";
const LED_RED = "#FF2D2D";
const OXIDE = "#0F0A05";

const woodgrain = `
  repeating-linear-gradient(92deg,
    rgba(0,0,0,0.18) 0px, rgba(0,0,0,0.18) 1px,
    transparent 1px, transparent 4px,
    rgba(255,210,160,0.04) 4px, rgba(255,210,160,0.04) 6px,
    transparent 6px, transparent 11px),
  radial-gradient(ellipse at 30% 20%, rgba(180,120,70,0.22), transparent 55%),
  radial-gradient(ellipse at 75% 80%, rgba(60,30,10,0.55), transparent 60%),
  linear-gradient(180deg, ${WALNUT} 0%, ${WALNUT_DEEP} 100%)
`;

const paperTexture = `
  radial-gradient(circle at 18% 22%, rgba(255,235,200,0.07) 0%, transparent 28%),
  radial-gradient(circle at 82% 78%, rgba(0,0,0,0.22) 0%, transparent 35%),
  repeating-linear-gradient(3deg, rgba(255,235,200,0.02) 0px, rgba(255,235,200,0.02) 1px, transparent 1px, transparent 3px),
  repeating-linear-gradient(93deg, rgba(0,0,0,0.04) 0px, rgba(0,0,0,0.04) 1px, transparent 1px, transparent 2px),
  linear-gradient(168deg, ${TAPE_BROWN} 0%, ${TAPE_BROWN_DARK} 100%)
`;

function Hole({ side }: { side: "left" | "right" }) {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        top: 10,
        [side]: 10,
        width: 6,
        height: 6,
        borderRadius: 999,
        background: OXIDE,
        boxShadow: "0 1px 0 rgba(255,235,208,0.18)",
      }}
    />
  );
}

function KMonogram({ inView }: { inView: boolean }) {
  return (
    <motion.div
      aria-hidden
      initial={{ opacity: 0, scale: 0.85, rotate: -18 }}
      animate={inView ? { opacity: 1, scale: 1, rotate: -8 } : { opacity: 0 }}
      transition={{ duration: 0.7, delay: 0.9 }}
      style={{ position: "absolute", bottom: 56, right: 18, width: 56, height: 56, pointerEvents: "none" }}
    >
      <svg viewBox="0 0 60 60" style={{ width: "100%", height: "100%" }}>
        <path
          d="M30 6 C 49 6, 54 22, 54 30 C 54 44, 44 54, 30 54 C 14 54, 6 42, 6 30 C 6 16, 14 6, 30 6 Z"
          fill="none" stroke={IVORY} strokeWidth="1.4" strokeLinecap="round" opacity="0.85"
        />
        <path d="M22 18 L22 42 M22 30 L36 18 M22 30 L37 43" fill="none" stroke={IVORY} strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M40 46 L46 44" fill="none" stroke={IVORY} strokeWidth="1.2" strokeLinecap="round" opacity="0.7" />
      </svg>
    </motion.div>
  );
}

export default function PhilosophyCassette() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12% 0px -12% 0px" });

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        padding: "clamp(80px, 12vw, 140px) 20px",
        background: WALNUT,
        backgroundImage: woodgrain,
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.55) 100%)",
          pointerEvents: "none",
        }}
      />

      <div style={{ position: "relative", maxWidth: 720, margin: "0 auto", display: "flex", justifyContent: "center" }}>
        <motion.article
          initial={{ opacity: 0, y: 24, rotate: 0 }}
          animate={inView ? { opacity: 1, y: 0, rotate: 1 } : { opacity: 0, y: 24, rotate: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: "relative",
            width: "100%",
            maxWidth: 560,
            background: TAPE_BROWN,
            backgroundImage: paperTexture,
            color: IVORY,
            padding: "clamp(28px, 5vw, 44px) clamp(24px, 5vw, 42px) clamp(22px, 4vw, 32px)",
            boxShadow: "0 1px 0 rgba(255,235,208,0.08) inset, 0 -1px 0 rgba(0,0,0,0.35) inset, 0 22px 50px -18px rgba(0,0,0,0.75), 0 6px 12px -6px rgba(0,0,0,0.55)",
            border: "1px solid rgba(0,0,0,0.35)",
            borderRadius: 2,
          }}
        >
          <Hole side="left" />
          <Hole side="right" />

          {/* Tape on top edge */}
          <span
            aria-hidden
            style={{
              position: "absolute", top: -2, left: 28, width: 38, height: 14,
              background: "linear-gradient(180deg, rgba(245,235,208,0.85), rgba(245,235,208,0.55))",
              borderRadius: 1, transform: "rotate(-2deg)",
              boxShadow: "0 2px 4px rgba(0,0,0,0.35)", opacity: 0.55,
            }}
          />

          {/* SIDE A · LINER NOTES */}
          <div
            className={caveat.className}
            style={{
              fontSize: "clamp(26px, 4.4vw, 34px)", fontWeight: 700, color: IVORY,
              letterSpacing: 0.5, transform: "rotate(-1.5deg)", marginBottom: 18,
              textShadow: "0 1px 0 rgba(0,0,0,0.35)",
              display: "flex", alignItems: "baseline", gap: 10, lineHeight: 1,
            }}
          >
            <span>SIDE A</span>
            <span aria-hidden style={{ fontSize: "0.55em", color: IVORY_DIM, letterSpacing: 4 }}>·</span>
            <span style={{ fontStyle: "italic", color: IVORY_DIM }}>liner notes</span>
          </div>

          {/* Hand-drawn divider */}
          <svg aria-hidden viewBox="0 0 400 8" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 8, marginBottom: 22, opacity: 0.55 }}>
            <path d="M2 4 Q 60 1, 120 4 T 240 5 T 360 3 T 398 4" fill="none" stroke={IVORY} strokeWidth="1.4" strokeLinecap="round" />
          </svg>

          {/* Body */}
          <div className={inter.className} style={{ fontSize: "clamp(14.5px, 1.6vw, 15.5px)", lineHeight: 1.7, color: IVORY, fontWeight: 400 }}>
            <p style={{ margin: 0 }}>
              Hand-cut. Hand-coded. Every site we ship is recorded fresh — no compilation tape,
              no rerun, no rip from a template.
            </p>

            <motion.blockquote
              initial={{ opacity: 0, x: -8 }}
              animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
              transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={caveat.className}
              style={{
                margin: "clamp(20px, 3vw, 28px) 0",
                padding: "6px 0 6px 18px",
                borderLeft: `2px solid ${IVORY}`,
                fontSize: "clamp(24px, 3.6vw, 32px)", lineHeight: 1.15,
                fontWeight: 600, fontStyle: "italic", color: IVORY,
                transform: "rotate(-0.6deg)",
                textShadow: "0 1px 0 rgba(0,0,0,0.3)",
              }}
            >
              &ldquo;templates are mixtapes someone else made&rdquo;
            </motion.blockquote>

            <p style={{ margin: 0 }}>
              You receive the master. We keep no copy. Once your project ships, the tape is yours
              to duplicate or remix.
            </p>
          </div>

          <KMonogram inView={inView} />

          {/* Mfg specs */}
          <div
            className={vt323.className}
            style={{
              marginTop: 28, paddingTop: 14,
              borderTop: "1px dashed rgba(245,235,208,0.25)",
              fontSize: 14, letterSpacing: 1.5, color: LED_RED,
              textShadow: `0 0 6px ${LED_RED}55`,
              display: "flex", gap: 10, flexWrap: "wrap", alignItems: "center",
            }}
          >
            <span>TAPE NO. 047</span>
            <span style={{ opacity: 0.6 }}>·</span>
            <span>DOLBY B</span>
            <span style={{ opacity: 0.6 }}>·</span>
            <span>CHROMIUM</span>
            <span
              aria-hidden
              style={{
                marginLeft: "auto", width: 6, height: 6, borderRadius: 999,
                background: LED_RED, boxShadow: `0 0 8px ${LED_RED}`,
                animation: "kpt-cassette-blink 1.6s steps(2, end) infinite",
              }}
            />
          </div>
        </motion.article>
      </div>

      <style jsx>{`
        @keyframes kpt-cassette-blink {
          0%, 60% { opacity: 1; }
          61%, 100% { opacity: 0.25; }
        }
        @media (max-width: 640px) {
          section :global(article) { max-width: 100% !important; }
        }
      `}</style>
    </section>
  );
}
