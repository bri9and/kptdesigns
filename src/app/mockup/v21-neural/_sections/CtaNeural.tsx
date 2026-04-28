"use client";

import Link from "next/link";
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

export default function CtaNeural() {
  // Generate a static node burst converging
  const nodes = Array.from({ length: 36 }).map((_, i) => {
    const angle = (i / 36) * Math.PI * 2;
    const r = 180 + Math.random() * 140;
    const x = Math.cos(angle) * r;
    const y = Math.sin(angle) * r * 0.6;
    return { x, y, delay: Math.random() * 0.6 };
  });

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center px-6 py-20 overflow-hidden">
      {/* Convergence burst */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none" aria-hidden>
        <svg viewBox="-400 -300 800 600" className="w-full h-full max-w-[1200px]">
          <defs>
            <radialGradient id="cta-out-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor={PALETTE.cyan} stopOpacity="1" />
              <stop offset="40%" stopColor={PALETTE.cyan} stopOpacity="0.4" />
              <stop offset="100%" stopColor={PALETTE.cyan} stopOpacity="0" />
            </radialGradient>
            <linearGradient id="cta-edge" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor={PALETTE.latent} stopOpacity="0.05" />
              <stop offset="100%" stopColor={PALETTE.cyan} stopOpacity="0.7" />
            </linearGradient>
          </defs>

          {/* edges to center */}
          {nodes.map((n, i) => (
            <motion.line
              key={`e${i}`}
              x1={n.x}
              y1={n.y}
              x2={0}
              y2={0}
              stroke="url(#cta-edge)"
              strokeWidth={0.5 + Math.random() * 0.6}
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 0.7 }}
              viewport={{ once: true }}
              transition={{ duration: 1.6 + Math.random() * 0.8, delay: n.delay, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}

          {/* nodes */}
          {nodes.map((n, i) => (
            <motion.circle
              key={`n${i}`}
              cx={n.x}
              cy={n.y}
              r={2 + Math.random() * 2}
              fill={i % 3 === 0 ? PALETTE.pink : i % 2 === 0 ? PALETTE.cyan : PALETTE.latent}
              initial={{ opacity: 0, scale: 0 }}
              whileInView={{ opacity: 0.7, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: n.delay, ease: [0.16, 1, 0.3, 1] }}
            />
          ))}

          {/* output node */}
          <circle cx="0" cy="0" r="80" fill="url(#cta-out-glow)" />
          <motion.circle
            cx="0"
            cy="0"
            r="14"
            fill={PALETTE.cyan}
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 1.4, ease: [0.16, 1, 0.3, 1] }}
            style={{ filter: `drop-shadow(0 0 14px ${PALETTE.cyan})` }}
          />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1 }}
        className="relative z-10 font-mono uppercase mb-6"
        style={{ fontSize: 11, letterSpacing: "0.32em", color: PALETTE.grey }}
      >
        <span style={{ color: PALETTE.cyan }}>§ 08</span> · OUTPUT LAYER · ACTIVATE
      </motion.div>

      <motion.h2
        id="sec-7-title"
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center"
        style={{
          fontSize: "clamp(48px, 8vw, 120px)",
          fontWeight: 900,
          letterSpacing: "0.04em",
          lineHeight: 0.95,
          color: PALETTE.text,
        }}
      >
        Ask the{" "}
        <span
          style={{
            backgroundImage: `linear-gradient(120deg, ${PALETTE.cyan}, ${PALETTE.latent} 50%, ${PALETTE.pink})`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            filter: `drop-shadow(0 0 24px rgba(0,229,255,0.3))`,
          }}
        >
          network.
        </span>
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, delay: 0.3 }}
        className="relative z-10 text-center mt-8 max-w-xl"
        style={{ fontSize: 17, color: PALETTE.grey, fontWeight: 300, lineHeight: 1.7 }}
      >
        Your competitors already have modern websites. Let&apos;s make sure
        yours is better. No commitment — just a conversation.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 mt-10 flex flex-wrap items-center justify-center gap-4"
      >
        <Link
          href="/start"
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-mono uppercase transition-all duration-300"
          style={{
            fontSize: 12,
            letterSpacing: "0.32em",
            color: PALETTE.void,
            background: PALETTE.cyan,
            fontWeight: 600,
            border: `1px solid ${PALETTE.cyan}`,
            boxShadow: `0 0 28px rgba(0,229,255,0.35)`,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 32px rgba(0,229,255,0.5), 0 0 48px ${PALETTE.pink}66`;
            (e.currentTarget as HTMLElement).style.borderColor = PALETTE.pink;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.boxShadow = `0 0 28px rgba(0,229,255,0.35)`;
            (e.currentTarget as HTMLElement).style.borderColor = PALETTE.cyan;
          }}
        >
          GET STARTED
          <span aria-hidden style={{ fontSize: 14 }}>→</span>
        </Link>

        <Link
          href="/pricing"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-full font-mono uppercase transition-colors"
          style={{
            fontSize: 12,
            letterSpacing: "0.32em",
            color: PALETTE.text,
            background: "transparent",
            border: "1px solid rgba(155,163,199,0.3)",
            fontWeight: 500,
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = PALETTE.latent;
            (e.currentTarget as HTMLElement).style.color = PALETTE.latent;
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.borderColor = "rgba(155,163,199,0.3)";
            (e.currentTarget as HTMLElement).style.color = PALETTE.text;
          }}
        >
          VIEW PRICING
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 1.2, delay: 0.8 }}
        className="relative z-10 mt-12 flex items-center gap-4 font-mono uppercase"
        style={{ fontSize: 10, letterSpacing: "0.32em", color: PALETTE.grey }}
      >
        <span style={{ color: PALETTE.cyan }}>●</span>
        <span>KPT DESIGNS · EST. 2004</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span>PITTSBURGH + PHOENIX</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ color: PALETTE.pink }}>47+ SHIPPED</span>
      </motion.div>
    </div>
  );
}
