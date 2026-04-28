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

const STEPS = [
  { num: "01", name: "Discovery", desc: "Focused conversation. Goals, audience, timeline. No drawn-out meetings." },
  { num: "02", name: "Build", desc: "Designed and coded from scratch. You see progress early. Revisions included." },
  { num: "03", name: "Review", desc: "We iterate until you love it. Then deploy, configure analytics, verify clean." },
  { num: "04", name: "Delivery", desc: "Complete source code and repository delivered. No lock-in. It is yours." },
];

export default function ProcessNeural() {
  return (
    <div className="relative w-full min-h-screen flex items-center px-6 md:px-12 py-20">
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          className="font-mono uppercase mb-4"
          style={{ fontSize: 11, letterSpacing: "0.32em", color: PALETTE.grey }}
        >
          <span style={{ color: PALETTE.cyan }}>§ 06</span> · LAYER 04 · FORWARD PASS
        </motion.div>

        <motion.h2
          id="sec-5-title"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          style={{
            fontSize: "clamp(36px, 5.4vw, 72px)",
            fontWeight: 800,
            letterSpacing: "0.04em",
            lineHeight: 1,
            color: PALETTE.text,
            marginBottom: 12,
          }}
        >
          Idea → live site.
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ fontSize: 16, color: PALETTE.grey, fontWeight: 300, maxWidth: 540, lineHeight: 1.7 }}
          className="mb-16"
        >
          Tell us what you need. Four nodes from raw input to deployed signal.
        </motion.p>

        {/* Connected nodes */}
        <div className="relative">
          {/* Connecting edges (desktop) */}
          <svg
            className="absolute top-[28px] left-[8%] right-[8%] h-3 hidden md:block pointer-events-none"
            viewBox="0 0 1000 12"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <linearGradient id="proc-edge" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={PALETTE.cyan} />
                <stop offset="100%" stopColor={PALETTE.pink} />
              </linearGradient>
            </defs>
            <motion.line
              x1="0"
              y1="6"
              x2="1000"
              y2="6"
              stroke="url(#proc-edge)"
              strokeWidth="1"
              strokeDasharray="6 8"
              initial={{ pathLength: 0 }}
              whileInView={{ pathLength: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
              style={{ filter: `drop-shadow(0 0 4px ${PALETTE.cyan})` }}
            />
          </svg>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-3">
            {STEPS.map((s, i) => {
              const colors = [PALETTE.cyan, PALETTE.latent, PALETTE.pink, PALETTE.amber];
              const c = colors[i];
              return (
                <motion.div
                  key={s.num}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 1, delay: 0.15 * i, ease: [0.16, 1, 0.3, 1] }}
                  className="relative"
                >
                  {/* Node circle */}
                  <div className="relative flex items-center md:justify-start mb-5">
                    <motion.div
                      className="relative z-10 flex items-center justify-center rounded-full backdrop-blur-md border"
                      style={{
                        width: 56,
                        height: 56,
                        background: "rgba(2,3,10,0.7)",
                        borderColor: c,
                        boxShadow: `0 0 24px ${c}55, inset 0 0 12px ${c}22`,
                      }}
                      animate={{ boxShadow: [`0 0 18px ${c}33`, `0 0 32px ${c}77`, `0 0 18px ${c}33`] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.3 * i }}
                    >
                      <span
                        className="font-mono"
                        style={{
                          fontSize: 14,
                          fontWeight: 600,
                          letterSpacing: "0.08em",
                          color: c,
                        }}
                      >
                        {s.num}
                      </span>
                    </motion.div>
                  </div>

                  <div
                    className="p-5 rounded-lg border backdrop-blur-md"
                    style={{
                      background: "rgba(2,3,10,0.55)",
                      borderColor: "rgba(155,163,199,0.12)",
                    }}
                  >
                    <h3
                      style={{
                        fontSize: 18,
                        fontWeight: 700,
                        letterSpacing: "0.01em",
                        color: PALETTE.text,
                        marginBottom: 8,
                      }}
                    >
                      {s.name}
                    </h3>
                    <p style={{ fontSize: 13, lineHeight: 1.65, color: PALETTE.grey, fontWeight: 300 }}>
                      {s.desc}
                    </p>
                    <div
                      className="font-mono uppercase mt-4"
                      style={{ fontSize: 9, letterSpacing: "0.32em", color: c }}
                    >
                      ● ACTIVATED
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
