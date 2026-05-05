"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const STEPS = [
  { n: "01", title: "Discovery Call", desc: "A focused conversation about your goals, audience, and timeline." },
  { n: "02", title: "Design & Build", desc: "Designed and coded from scratch. See progress early and often." },
  { n: "03", title: "Review & Launch", desc: "Iterate until you love it. Deploy and verify." },
  { n: "04", title: "Delivery & Ownership", desc: "Complete source code delivered. No lock-in." },
];

const NODES_D = [{ x: 150, y: 200 }, { x: 500, y: 90 }, { x: 850, y: 230 }, { x: 1100, y: 110 }];
const PATH_D = "M 150 200 C 280 200, 360 90, 500 90 S 720 230, 850 230 S 1020 110, 1100 110";
const NODES_M = [{ x: 80, y: 110 }, { x: 240, y: 340 }, { x: 80, y: 570 }, { x: 240, y: 800 }];
const PATH_M = "M 80 110 C 80 220, 240 230, 240 340 S 80 460, 80 570 S 240 690, 240 800";

export default function ProcessCosmos() {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 80%", "end 60%"] });
  const pathLength = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const [active, setActive] = useState<number | null>(null);

  return (
    <section
      ref={ref}
      style={{
        position: "relative",
        background:
          "radial-gradient(ellipse 80% 60% at 20% 0%, rgba(123,91,255,0.10), transparent 60%), radial-gradient(ellipse 70% 50% at 90% 100%, rgba(255,107,193,0.08), transparent 65%), #02030A",
        padding: "140px 24px 160px",
        overflow: "hidden",
        fontFamily: "Inter, sans-serif",
        color: "#F8F8FF",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, opacity: 0.6, pointerEvents: "none",
          backgroundImage:
            "radial-gradient(1px 1px at 12% 24%, rgba(248,248,255,0.45), transparent), radial-gradient(1px 1px at 78% 18%, rgba(248,248,255,0.35), transparent), radial-gradient(1px 1px at 38% 70%, rgba(248,248,255,0.30), transparent), radial-gradient(1px 1px at 88% 82%, rgba(248,248,255,0.40), transparent), radial-gradient(1px 1px at 56% 44%, rgba(248,248,255,0.25), transparent)",
        }}
      />
      <div style={{ maxWidth: 1280, margin: "0 auto", position: "relative" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ marginBottom: 96 }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24 }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, letterSpacing: "0.32em", color: "#7B5BFF", textTransform: "uppercase" }}>
              § 05 / TRAJECTORY
            </span>
            <span style={{ flex: 1, height: 1, background: "linear-gradient(90deg, #7B5BFF, transparent)" }} />
          </div>
          <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", fontWeight: 200, letterSpacing: "-0.02em", lineHeight: 1.05, margin: 0, maxWidth: 880 }}>
            Four waypoints.{" "}
            <span style={{ color: "#9BA3C7", fontStyle: "italic", fontWeight: 200 }}>One trajectory from idea to orbit.</span>
          </h2>
        </motion.div>

        {/* Desktop */}
        <div style={{ position: "relative", display: "none" }} className="cosmos-desktop">
          <svg viewBox="0 0 1200 320" preserveAspectRatio="none" style={{ width: "100%", height: 320, display: "block", overflow: "visible" }}>
            <defs>
              <linearGradient id="trajGrad" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor="#7B5BFF" />
                <stop offset="50%" stopColor="#FF6BC1" />
                <stop offset="100%" stopColor="#FF8000" />
              </linearGradient>
              <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
                <feGaussianBlur stdDeviation="6" result="b" />
                <feMerge><feMergeNode in="b" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>
            <path d={PATH_D} fill="none" stroke="rgba(123,91,255,0.18)" strokeWidth={1} strokeDasharray="2 6" />
            <motion.path d={PATH_D} fill="none" stroke="url(#trajGrad)" strokeWidth={1.5} strokeLinecap="round" style={{ pathLength, filter: "drop-shadow(0 0 6px rgba(123,91,255,0.6))" }} />
            {NODES_D.map((node, i) => (
              <g key={i} filter="url(#nodeGlow)">
                <circle cx={node.x} cy={node.y} r={active === i ? 14 : 10} fill="#02030A" stroke={active === i ? "#FF8000" : "#7B5BFF"} strokeWidth={1.5} style={{ transition: "all 400ms ease" }} />
                <circle cx={node.x} cy={node.y} r={3} fill="#F8F8FF" />
              </g>
            ))}
          </svg>
          <div style={{ position: "absolute", inset: 0, pointerEvents: "none" }}>
            {STEPS.map((s, i) => {
              const node = NODES_D[i];
              const above = i % 2 === 1;
              return (
                <NodeCard
                  key={s.n} step={s} index={i} active={active === i} setActive={setActive}
                  style={{
                    position: "absolute",
                    left: `${(node.x / 1200) * 100}%`,
                    top: `${(node.y / 320) * 100}%`,
                    transform: `translate(-50%, ${above ? "calc(-100% - 32px)" : "32px"})`,
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Mobile */}
        <div style={{ position: "relative" }} className="cosmos-mobile">
          <svg viewBox="0 0 320 900" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%", overflow: "visible" }}>
            <defs>
              <linearGradient id="trajGradV" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#7B5BFF" />
                <stop offset="50%" stopColor="#FF6BC1" />
                <stop offset="100%" stopColor="#FF8000" />
              </linearGradient>
            </defs>
            <path d={PATH_M} fill="none" stroke="rgba(123,91,255,0.18)" strokeWidth={1} strokeDasharray="2 6" />
            <motion.path d={PATH_M} fill="none" stroke="url(#trajGradV)" strokeWidth={1.5} strokeLinecap="round" style={{ pathLength, filter: "drop-shadow(0 0 6px rgba(123,91,255,0.6))" }} />
            {NODES_M.map((node, i) => (
              <g key={i}>
                <circle cx={node.x} cy={node.y} r={10} fill="#02030A" stroke="#7B5BFF" strokeWidth={1.5} />
                <circle cx={node.x} cy={node.y} r={3} fill="#F8F8FF" />
              </g>
            ))}
          </svg>
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 56, padding: "40px 0" }}>
            {STEPS.map((s, i) => (
              <div key={s.n} style={{ display: "flex", justifyContent: i % 2 === 0 ? "flex-end" : "flex-start", padding: i % 2 === 0 ? "0 16px 0 0" : "0 0 0 16px" }}>
                <NodeCard step={s} index={i} active={active === i} setActive={setActive} style={{ maxWidth: 220 }} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (min-width: 768px) {
          :global(.cosmos-desktop) { display: block !important; }
          :global(.cosmos-mobile) { display: none !important; }
        }
      `}</style>
    </section>
  );
}

function NodeCard({ step, index, active, setActive, style }: {
  step: { n: string; title: string; desc: string };
  index: number; active: boolean; setActive: (i: number | null) => void; style?: React.CSSProperties;
}) {
  return (
    <motion.button
      type="button"
      onMouseEnter={() => setActive(index)} onMouseLeave={() => setActive(null)}
      onFocus={() => setActive(index)} onBlur={() => setActive(null)}
      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 1, delay: 0.15 * index, ease: [0.16, 1, 0.3, 1] }}
      style={{
        pointerEvents: "auto", textAlign: "left", width: 240, padding: "16px 18px",
        background: active ? "rgba(26,33,72,0.85)" : "rgba(10,14,39,0.7)",
        border: `1px solid ${active ? "#7B5BFF" : "rgba(123,91,255,0.25)"}`,
        color: "#F8F8FF", cursor: "pointer", backdropFilter: "blur(2px)",
        boxShadow: active ? "0 0 32px rgba(123,91,255,0.35)" : "0 0 0 rgba(0,0,0,0)",
        transition: "background 400ms ease, border-color 400ms ease, box-shadow 600ms ease",
        ...style,
      }}
    >
      <div style={{ display: "flex", alignItems: "baseline", gap: 10, marginBottom: 8 }}>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 28, fontWeight: 500, color: active ? "#FF8000" : "#7B5BFF", letterSpacing: "-0.02em", transition: "color 400ms ease" }}>
          {step.n}
        </span>
        <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 9, letterSpacing: "0.3em", color: "#9BA3C7", textTransform: "uppercase" }}>
          ─ waypoint
        </span>
      </div>
      <div style={{ fontSize: 16, fontWeight: 400, letterSpacing: "-0.01em", marginBottom: 6 }}>{step.title}</div>
      <div style={{ fontSize: 13, lineHeight: 1.5, color: "#9BA3C7" }}>{step.desc}</div>
    </motion.button>
  );
}
