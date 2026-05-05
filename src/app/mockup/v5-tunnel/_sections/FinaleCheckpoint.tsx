"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["200", "400", "700", "900"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

const C = {
  cyan: "#00E5FF",
  amber: "#FFB000",
  magenta: "#FF00AA",
  white: "#E8F1FF",
  void: "#000812",
} as const;

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * FinaleCheckpoint — checkpoint 08 of 08
 *
 * Tunnel terminus. Lightweight content overlay (no full-page background)
 * because the engine layers it on top of the canvas. Adds a soft local halo
 * to feel like a frame ring at the exit.
 */
export default function FinaleCheckpoint() {
  return (
    <div
      className={inter.className}
      style={{
        position: "relative",
        width: "min(960px, 92vw)",
        margin: "0 auto",
        padding: "clamp(28px, 5vw, 64px)",
        textAlign: "center",
        color: C.white,
      }}
    >
      {/* local halo ring — feels like the bright tunnel exit frame */}
      <motion.div
        aria-hidden
        initial={{ opacity: 0, scale: 0.92 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 1.8, ease: EASE }}
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          width: "min(620px, 86vw)",
          aspectRatio: "1 / 1",
          transform: "translate(-50%, -50%)",
          borderRadius: "50%",
          pointerEvents: "none",
          boxShadow:
            "0 0 0 1px rgba(0,229,255,0.35), 0 0 80px 8px rgba(0,229,255,0.22), inset 0 0 100px 16px rgba(255,0,170,0.12)",
          background:
            "radial-gradient(circle at center, rgba(255,255,255,0.07) 0%, rgba(0,229,255,0.10) 26%, rgba(255,0,170,0.05) 55%, rgba(0,8,18,0) 75%)",
        }}
      />

      <div style={{ position: "relative", zIndex: 1 }}>
        <motion.div
          className={mono.className}
          initial={{ opacity: 0, y: 6 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.6 }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{
            fontSize: 11,
            letterSpacing: "0.4em",
            textTransform: "uppercase",
            color: `${C.cyan}cc`,
            marginBottom: 18,
          }}
        >
          {"//"} CHECKPOINT 08 — TERMINUS
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 26, letterSpacing: "0.04em" }}
          whileInView={{ opacity: 1, y: 0, letterSpacing: "-0.04em" }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.8, ease: EASE }}
          style={{
            margin: 0,
            fontWeight: 900,
            fontSize: "clamp(56px, 11vw, 144px)",
            lineHeight: 0.92,
            backgroundImage: `linear-gradient(95deg, ${C.cyan} 0%, ${C.white} 38%, ${C.magenta} 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
            filter: `drop-shadow(0 0 28px ${C.cyan}55)`,
          }}
        >
          Ready to launch?
        </motion.h2>

        <motion.p
          className={mono.className}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.2 }}
          style={{
            margin: "26px auto 0",
            maxWidth: 560,
            fontSize: 13,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            lineHeight: 1.7,
            color: `${C.white}c0`,
            fontWeight: 500,
          }}
        >
          One process. Domain to AI agent. We handle it.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.4 }}
          style={{
            marginTop: 40,
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "center",
            gap: 14,
          }}
        >
          <Link
            href="/start"
            className={mono.className}
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 36px",
              border: `1px solid ${C.cyan}`,
              background: C.cyan,
              color: C.void,
              fontSize: 12,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              fontWeight: 500,
              textDecoration: "none",
              clipPath:
                "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
              boxShadow: `0 0 24px ${C.cyan}66`,
              transition: "transform 360ms cubic-bezier(0.16,1,0.3,1)",
            }}
          >
            <span>Get Started</span>
            <span aria-hidden style={{ color: `${C.void}aa` }}>→</span>
          </Link>

          <Link
            href="/pricing"
            className={mono.className}
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              padding: "16px 36px",
              border: `1px solid ${C.cyan}`,
              background: "transparent",
              color: C.cyan,
              fontSize: 12,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              fontWeight: 500,
              textDecoration: "none",
              clipPath:
                "polygon(0 0, calc(100% - 10px) 0, 100% 10px, 100% 100%, 10px 100%, 0 calc(100% - 10px))",
              transition: "background 360ms cubic-bezier(0.16,1,0.3,1), color 360ms",
            }}
          >
            <span>View Pricing</span>
            <span aria-hidden style={{ opacity: 0.7 }}>↗</span>
          </Link>
        </motion.div>

        <motion.div
          className={mono.className}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.4, ease: EASE, delay: 0.7 }}
          style={{
            marginTop: 48,
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            fontSize: 10,
            letterSpacing: "0.42em",
            textTransform: "uppercase",
            color: `${C.white}77`,
          }}
        >
          <span
            aria-hidden
            style={{
              width: 7, height: 7, borderRadius: 999, background: C.amber,
              boxShadow: `0 0 8px ${C.amber}`, animation: "kpt-blink 1.4s ease-in-out infinite",
            }}
          />
          <span>EST. 2004 · TUNNEL TERMINUS · 8.0 / 8.0</span>
        </motion.div>
      </div>

      <style>{`
        @keyframes kpt-blink { 0%,100% { opacity:1 } 50% { opacity:0.35 } }
      `}</style>
    </div>
  );
}
