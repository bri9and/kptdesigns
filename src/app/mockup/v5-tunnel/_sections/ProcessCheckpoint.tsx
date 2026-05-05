"use client";

import { useRef } from "react";
import { Inter, JetBrains_Mono } from "next/font/google";
import { motion, useInView } from "framer-motion";

const inter = Inter({ subsets: ["latin"], weight: ["200", "400", "500", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

const C = {
  void: "#000812",
  cyan: "#00E5FF",
  blue: "#0066FF",
  white: "#E8F1FF",
  amber: "#FFB000",
  magenta: "#FF00AA",
  grey: "#9BA3C7",
} as const;

const STEPS = [
  {
    n: "01", name: "Discovery Call",
    desc: "A focused conversation about your goals, audience, and timeline. No drawn-out meetings — just clarity.",
  },
  {
    n: "02", name: "Design & Build",
    desc: "We design and code your site from scratch. You see progress early and often. Revisions included.",
  },
  {
    n: "03", name: "Review & Launch",
    desc: "We iterate until you love it. Then deploy, configure analytics, and verify everything runs clean.",
  },
  {
    n: "04", name: "Delivery & Ownership",
    desc: "Complete source code and repository delivered. No lock-in. No proprietary platforms. It's yours.",
  },
];

// Constellation node positions (in 0..100 svg coords) for a 4-node path.
// 1180 wide x 220 tall viewBox — drawn in % to be responsive.
const NODE_X = [10, 36.5, 63.5, 90]; // even spacing across width
const NODE_Y = [60, 30, 70, 40];     // gentle wave so the line feels like a path

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * ProcessCheckpoint — checkpoint 06 of 08
 *
 * 4-step process visualised as a constellation. Nodes light up in sequence
 * when the section is in view; description cards sit below.
 */
export default function ProcessCheckpoint() {
  const ref = useRef<HTMLDivElement | null>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <div
      ref={ref}
      className={inter.className}
      style={{
        position: "relative",
        width: "min(1180px, 94vw)",
        margin: "0 auto",
        padding: "clamp(20px, 3vw, 36px)",
        background: "rgba(0,8,18,0.62)",
        backdropFilter: "blur(14px) saturate(120%)",
        WebkitBackdropFilter: "blur(14px) saturate(120%)",
        border: `1px solid ${C.cyan}33`,
        boxShadow: `inset 0 0 0 1px rgba(0,229,255,0.06), 0 0 60px rgba(0,8,18,0.55)`,
        color: C.white,
      }}
    >
      <div
        className={mono.className}
        style={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 12,
          fontSize: 11,
          letterSpacing: "0.26em",
          color: C.cyan,
          textTransform: "uppercase",
          marginBottom: 18,
        }}
      >
        <span>{"//"} CHECKPOINT 06 · PROCESS_PATH</span>
        <span style={{ color: C.amber }}>4 STEPS · IDEA → LIVE</span>
      </div>

      <h2
        style={{
          fontWeight: 200,
          fontSize: "clamp(32px, 4.6vw, 60px)",
          lineHeight: 1.04,
          letterSpacing: "-0.02em",
          margin: 0,
          color: C.white,
        }}
      >
        How it{" "}
        <span style={{ color: C.cyan, fontWeight: 700 }}>works.</span>
      </h2>
      <p
        className={mono.className}
        style={{
          marginTop: 12,
          fontSize: 12,
          letterSpacing: "0.05em",
          color: `${C.white}aa`,
          maxWidth: 540,
        }}
      >
        Tell us what you need, we build it. A clear path from idea to live site.
      </p>

      {/* constellation */}
      <div
        style={{
          marginTop: 28,
          position: "relative",
          height: 200,
          border: `1px solid ${C.cyan}24`,
          background: "rgba(0,8,18,0.55)",
        }}
      >
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}
        >
          {/* faint star dust */}
          {Array.from({ length: 22 }).map((_, i) => {
            // deterministic pseudo-random
            const x = ((i * 37) % 100) + (i % 3) * 0.7;
            const y = ((i * 53) % 100);
            const op = 0.18 + ((i * 7) % 5) * 0.06;
            return <circle key={i} cx={x} cy={y} r={0.35} fill={C.cyan} opacity={op} />;
          })}

          {/* connecting path drawn through 4 nodes */}
          <motion.path
            d={`M${NODE_X[0]},${NODE_Y[0]} Q${(NODE_X[0] + NODE_X[1]) / 2},${NODE_Y[0] - 8} ${NODE_X[1]},${NODE_Y[1]} T${NODE_X[2]},${NODE_Y[2]} T${NODE_X[3]},${NODE_Y[3]}`}
            fill="none"
            stroke={C.cyan}
            strokeWidth="0.4"
            strokeDasharray="1.2 1.6"
            opacity={0.65}
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 2.4, ease: EASE }}
            vectorEffect="non-scaling-stroke"
          />

          {/* nodes */}
          {NODE_X.map((x, i) => (
            <g key={i}>
              {/* halo */}
              <motion.circle
                cx={x}
                cy={NODE_Y[i]}
                r={3}
                fill={C.cyan}
                opacity={0.18}
                initial={{ scale: 0, opacity: 0 }}
                animate={inView ? { scale: [0, 1.6, 1], opacity: [0, 0.4, 0.18] } : {}}
                transition={{ duration: 1.6, ease: EASE, delay: 0.4 + i * 0.35 }}
                style={{ transformOrigin: `${x}% ${NODE_Y[i]}%` }}
              />
              {/* core */}
              <motion.circle
                cx={x}
                cy={NODE_Y[i]}
                r={1.4}
                fill={C.cyan}
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 1 } : {}}
                transition={{ duration: 0.6, ease: EASE, delay: 0.5 + i * 0.35 }}
                style={{ filter: `drop-shadow(0 0 1.5px ${C.cyan})` }}
              />
              {/* number above each node */}
              <motion.text
                x={x}
                y={NODE_Y[i] - 6}
                fontSize="2.4"
                fill={C.amber}
                fontFamily="var(--font-jetbrains, monospace)"
                textAnchor="middle"
                initial={{ opacity: 0 }}
                animate={inView ? { opacity: 0.85 } : {}}
                transition={{ duration: 0.8, ease: EASE, delay: 0.7 + i * 0.35 }}
                letterSpacing="0.4"
              >
                {STEPS[i].n}
              </motion.text>
            </g>
          ))}
        </svg>
      </div>

      {/* step descriptions */}
      <div
        style={{
          marginTop: 14,
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 10,
        }}
        className="kpt-proc-grid"
      >
        {STEPS.map((s, i) => (
          <motion.article
            key={s.n}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 1.2, ease: EASE, delay: 0.4 + i * 0.18 }}
            style={{
              padding: 16,
              background: "rgba(0,8,18,0.55)",
              border: `1px solid ${C.cyan}24`,
              boxShadow: `inset 0 0 0 1px ${C.cyan}10`,
              position: "relative",
            }}
          >
            <div
              className={mono.className}
              style={{
                fontSize: 28,
                fontWeight: 200,
                color: C.amber,
                opacity: 0.55,
                lineHeight: 1,
                marginBottom: 12,
                letterSpacing: "0.04em",
              }}
            >
              {s.n}
            </div>
            <h3
              style={{
                margin: 0,
                fontSize: 15,
                fontWeight: 600,
                color: C.white,
                letterSpacing: "0.02em",
              }}
            >
              {s.name}
            </h3>
            <p
              style={{
                marginTop: 8,
                marginBottom: 0,
                fontSize: 12,
                lineHeight: 1.6,
                color: C.grey,
                fontWeight: 300,
              }}
            >
              {s.desc}
            </p>
          </motion.article>
        ))}
      </div>

      <style>{`
        @media (max-width: 920px) {
          .kpt-proc-grid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
        }
        @media (max-width: 520px) {
          .kpt-proc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
