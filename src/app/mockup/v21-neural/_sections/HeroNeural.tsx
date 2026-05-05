"use client";

import { motion } from "framer-motion";

const PALETTE = {
  void: "#02030A",
  latent: "#8B5CF6",
  cyan: "#00E5FF",
  pink: "#FF0080",
  amber: "#FFB000",
  text: "#F1F5FF",
  grey: "#9BA3C7",
};

const SERVICES = ["REGISTRAR", "HOST", "BUILDER", "AGENTS"];

export default function HeroNeural() {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center px-6">
      {/* HUD top-left */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-8 left-8 hidden md:flex items-center gap-3 font-mono uppercase"
        style={{ fontSize: 11, letterSpacing: "0.32em", color: PALETTE.grey }}
      >
        <span className="relative flex h-2 w-2">
          <span
            className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping"
            style={{ background: PALETTE.cyan }}
          />
          <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: PALETTE.cyan }} />
        </span>
        <span style={{ color: PALETTE.cyan }}>INFERENCE ACTIVE</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>LATENCY 2.4ms</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ color: PALETTE.amber }}>CONFIDENCE 99.7%</span>
      </motion.div>

      {/* HUD top-right */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        className="absolute top-8 right-8 hidden md:flex items-center gap-2 font-mono uppercase"
        style={{ fontSize: 10, letterSpacing: "0.28em", color: PALETTE.grey }}
      >
        <span>NODE 0xKPT · </span>
        <span style={{ color: PALETTE.latent }}>v21·NEURAL</span>
      </motion.div>

      {/* preamble */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="font-mono uppercase mb-8"
        style={{ fontSize: 11, letterSpacing: "0.4em", color: PALETTE.grey }}
      >
        <span style={{ color: PALETTE.cyan }}>// </span>
        EST. 2004 · PITTSBURGH + PHOENIX
        <span style={{ color: PALETTE.cyan }}> //</span>
      </motion.div>

      {/* WORDMARK */}
      <motion.h1
        id="sec-0-title"
        initial={{ opacity: 0, y: 24, letterSpacing: "0.2em" }}
        animate={{ opacity: 1, y: 0, letterSpacing: "0.04em" }}
        transition={{ duration: 1.6, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="text-center font-extrabold relative"
        style={{
          fontSize: "clamp(64px, 13vw, 220px)",
          lineHeight: 0.9,
          fontWeight: 900,
          letterSpacing: "0.04em",
          backgroundImage: `linear-gradient(120deg, ${PALETTE.cyan} 0%, ${PALETTE.latent} 45%, ${PALETTE.pink} 100%)`,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          color: "transparent",
          textShadow: `0 0 80px rgba(139,92,246,0.18)`,
          filter: "drop-shadow(0 0 32px rgba(0,229,255,0.18))",
        }}
      >
        KPT DESIGNS
      </motion.h1>

      {/* underline glow scan */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ duration: 2, delay: 1.5, ease: [0.16, 1, 0.3, 1] }}
        className="origin-center mt-1"
        style={{
          height: 1,
          width: "min(72vw, 880px)",
          background: `linear-gradient(90deg, transparent, ${PALETTE.cyan}, ${PALETTE.latent}, ${PALETTE.pink}, transparent)`,
          boxShadow: `0 0 16px ${PALETTE.cyan}80`,
        }}
      />

      {/* subhead */}
      <motion.p
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.1, ease: [0.16, 1, 0.3, 1] }}
        className="text-center mt-10 max-w-3xl"
        style={{
          fontSize: "clamp(18px, 2.2vw, 28px)",
          fontWeight: 300,
          color: PALETTE.text,
          letterSpacing: "0.005em",
          lineHeight: 1.5,
        }}
      >
        <span style={{ color: PALETTE.cyan, fontWeight: 500 }}>We answer.</span>{" "}
        <span style={{ color: PALETTE.text }}>We build.</span>{" "}
        <span style={{ color: PALETTE.text }}>We host.</span>{" "}
        <span style={{ color: PALETTE.text }}>We register.</span>
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.6, delay: 1.4 }}
        className="text-center mt-3 max-w-xl mx-auto"
        style={{ fontSize: 14, color: PALETTE.grey, fontWeight: 300, lineHeight: 1.7 }}
      >
        One process. One bill. One team. Owned outright.
      </motion.p>

      {/* Services pill */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 1.6, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 inline-flex items-stretch rounded-full backdrop-blur-md border overflow-hidden"
        style={{
          background: "rgba(2,3,10,0.55)",
          borderColor: "rgba(0,229,255,0.25)",
          boxShadow: `0 0 28px rgba(0,229,255,0.12), inset 0 0 12px rgba(139,92,246,0.08)`,
        }}
      >
        {SERVICES.map((s, i) => (
          <span key={s} className="flex items-center">
            <span
              className="px-5 py-2.5 font-mono uppercase"
              style={{
                fontSize: 11,
                letterSpacing: "0.32em",
                color: i === 3 ? PALETTE.cyan : PALETTE.text,
                fontWeight: i === 3 ? 600 : 400,
              }}
            >
              {i === 3 ? <span style={{ marginRight: 6, color: PALETTE.pink }}>★</span> : null}
              {s}
            </span>
            {i < SERVICES.length - 1 && (
              <span
                aria-hidden
                className="self-stretch w-px"
                style={{
                  background: `linear-gradient(180deg, transparent, ${PALETTE.cyan}88, transparent)`,
                }}
              />
            )}
          </span>
        ))}
      </motion.div>

      {/* metrics row */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.9 }}
        className="mt-10 hidden md:flex items-center gap-8 font-mono uppercase"
        style={{ fontSize: 10, letterSpacing: "0.28em", color: PALETTE.grey }}
      >
        <span>
          <span style={{ color: PALETTE.cyan }}>47+</span> SHIPPED
        </span>
        <span style={{ opacity: 0.3 }}>·</span>
        <span>
          <span style={{ color: PALETTE.latent }}>20+</span> YRS
        </span>
        <span style={{ opacity: 0.3 }}>·</span>
        <span>
          <span style={{ color: PALETTE.pink }}>0</span> TEMPLATES
        </span>
      </motion.div>

      {/* scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: PALETTE.grey }}
      >
        <span
          className="font-mono uppercase"
          style={{ fontSize: 9, letterSpacing: "0.4em", opacity: 0.7 }}
        >
          ↓ ACTIVATE
        </span>
        <motion.span
          animate={{ height: [16, 28, 16] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: 1, background: `linear-gradient(180deg, ${PALETTE.cyan}, transparent)` }}
        />
      </motion.div>
    </div>
  );
}
