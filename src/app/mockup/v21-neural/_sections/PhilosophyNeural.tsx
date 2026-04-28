"use client";

import { motion } from "framer-motion";

const PALETTE = {
  latent: "#8B5CF6",
  cyan: "#00E5FF",
  pink: "#FF0080",
  text: "#F1F5FF",
  grey: "#9BA3C7",
};

export default function PhilosophyNeural() {
  return (
    <div className="relative w-full min-h-screen flex items-center px-6 md:px-16 lg:px-24 py-20">
      <div className="w-full max-w-6xl mx-auto grid lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5">
          <motion.div
            initial={{ opacity: 0, x: -10 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono uppercase mb-5"
            style={{ fontSize: 11, letterSpacing: "0.32em", color: PALETTE.grey }}
          >
            <span style={{ color: PALETTE.cyan }}>§ 02</span> · LAYER 00 · PHILOSOPHY
          </motion.div>

          <motion.h2
            id="sec-1-title"
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
            style={{
              fontSize: "clamp(40px, 6.4vw, 88px)",
              fontWeight: 800,
              letterSpacing: "0.04em",
              lineHeight: 0.98,
              color: PALETTE.text,
            }}
          >
            No templates.
            <br />
            <span
              style={{
                backgroundImage: `linear-gradient(120deg, ${PALETTE.cyan}, ${PALETTE.latent} 60%, ${PALETTE.pink})`,
                WebkitBackgroundClip: "text",
                backgroundClip: "text",
                color: "transparent",
              }}
            >
              No shortcuts.
            </span>
          </motion.h2>

          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.4, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
            className="origin-left mt-8"
            style={{
              height: 1,
              width: 200,
              background: `linear-gradient(90deg, ${PALETTE.cyan}, ${PALETTE.latent}, transparent)`,
            }}
          />
        </div>

        <div className="lg:col-span-7 space-y-8">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontSize: "clamp(18px, 1.4vw, 22px)",
              lineHeight: 1.7,
              fontWeight: 300,
              color: PALETTE.text,
            }}
          >
            We build modern, lightning-fast websites that actually convert.
            Every site is{" "}
            <strong style={{ color: PALETTE.cyan, fontWeight: 600 }}>
              hand-coded from scratch
            </strong>{" "}
            — no templates, no page builders, no WordPress. You get the complete
            source code. No lock-in. No proprietary platforms.{" "}
            <strong style={{ color: PALETTE.latent, fontWeight: 600 }}>
              Your site. Your code. Forever.
            </strong>
          </motion.p>

          <motion.figure
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="relative pl-8 py-2"
            style={{
              borderLeft: `2px solid ${PALETTE.latent}`,
            }}
          >
            <blockquote
              style={{
                fontSize: "clamp(20px, 2.4vw, 32px)",
                fontWeight: 300,
                fontStyle: "italic",
                color: PALETTE.text,
                lineHeight: 1.4,
                letterSpacing: "0.005em",
              }}
            >
              &ldquo;Hand-coded weights only.&rdquo;
            </blockquote>
            <figcaption
              className="font-mono uppercase mt-4"
              style={{ fontSize: 10, letterSpacing: "0.32em", color: PALETTE.grey }}
            >
              <span style={{ color: PALETTE.cyan }}>—</span> THE PROMISE
            </figcaption>
          </motion.figure>

          {/* Inline neural fragment */}
          <motion.svg
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 2, delay: 0.6 }}
            viewBox="0 0 400 80"
            className="w-full max-w-md"
            aria-hidden
          >
            <defs>
              <linearGradient id="phil-edge" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor={PALETTE.cyan} />
                <stop offset="100%" stopColor={PALETTE.latent} />
              </linearGradient>
            </defs>
            {[40, 120, 200, 280, 360].map((x, i) => (
              <g key={i}>
                {i < 4 && (
                  <line
                    x1={x}
                    y1={40}
                    x2={x + 80}
                    y2={40}
                    stroke="url(#phil-edge)"
                    strokeWidth={1}
                    opacity={0.4}
                  />
                )}
                <circle cx={x} cy={40} r={6} fill={PALETTE.latent} opacity={0.3} />
                <circle cx={x} cy={40} r={3} fill={PALETTE.cyan} />
              </g>
            ))}
          </motion.svg>
        </div>
      </div>
    </div>
  );
}
