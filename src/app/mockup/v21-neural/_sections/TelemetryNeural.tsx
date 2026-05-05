"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const PALETTE = {
  void: "#02030A",
  latent: "#8B5CF6",
  cyan: "#00E5FF",
  pink: "#FF0080",
  amber: "#FFB000",
  text: "#F1F5FF",
  grey: "#9BA3C7",
};

const STATS = [
  { label: "EXPERIENCE", target: 20, prefix: "", suffix: "+", unit: "YRS", sub: "Since 2004", tone: "cyan" as const, ring: 0.92 },
  { label: "LOAD TIME", target: 1, prefix: "<", suffix: "", unit: "S", sub: "Target sub-second", tone: "latent" as const, ring: 0.88 },
  { label: "OWNERSHIP", target: 100, prefix: "", suffix: "", unit: "%", sub: "Your code, forever", tone: "pink" as const, ring: 0.99 },
  { label: "PAGESPEED", target: 95, prefix: "", suffix: "+", unit: "PTS", sub: "Lighthouse score", tone: "amber" as const, ring: 0.95 },
];

function Counter({ target, prefix, suffix, active }: { target: number; prefix: string; suffix: string; active: boolean }) {
  const [v, setV] = useState(0);
  useEffect(() => {
    if (!active) return;
    const dur = 1800;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const p = Math.min(1, (now - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, target]);
  return <>{prefix}{v}{suffix}</>;
}

function MetricNeuron({
  label,
  target,
  prefix,
  suffix,
  unit,
  sub,
  tone,
  ring,
  index,
  active,
}: typeof STATS[number] & { index: number; active: boolean }) {
  const color =
    tone === "cyan" ? PALETTE.cyan :
    tone === "latent" ? PALETTE.latent :
    tone === "pink" ? PALETTE.pink : PALETTE.amber;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.9, delay: 0.08 * index, ease: [0.16, 1, 0.3, 1] }}
      className="relative p-6 md:p-8 backdrop-blur-md"
      style={{
        background: "rgba(2,3,10,0.55)",
        borderRight: index < 3 ? "1px solid rgba(155,163,199,0.1)" : undefined,
      }}
    >
      <div
        className="font-mono uppercase mb-4"
        style={{ fontSize: 10, letterSpacing: "0.32em", color: PALETTE.grey }}
      >
        <span style={{ color }}>●</span> {label}
      </div>

      {/* Pulsing ring + value */}
      <div className="relative flex items-center gap-4">
        <svg width="56" height="56" aria-hidden className="shrink-0">
          <circle cx="28" cy="28" r="22" stroke="rgba(155,163,199,0.12)" strokeWidth="2" fill="none" />
          <motion.circle
            cx="28"
            cy="28"
            r="22"
            stroke={color}
            strokeWidth="2"
            fill="none"
            strokeLinecap="round"
            transform="rotate(-90 28 28)"
            strokeDasharray={`${2 * Math.PI * 22}`}
            initial={{ strokeDashoffset: 2 * Math.PI * 22 }}
            animate={{ strokeDashoffset: active ? 2 * Math.PI * 22 * (1 - ring) : 2 * Math.PI * 22 }}
            transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 + 0.05 * index }}
            style={{ filter: `drop-shadow(0 0 6px ${color})` }}
          />
          <motion.circle
            cx="28"
            cy="28"
            r="6"
            fill={color}
            animate={active ? { opacity: [0.6, 1, 0.6] } : { opacity: 0.4 }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            style={{ filter: `drop-shadow(0 0 8px ${color})` }}
          />
        </svg>
        <div>
          <div
            style={{
              fontSize: 38,
              fontWeight: 800,
              letterSpacing: "-0.02em",
              lineHeight: 1,
              color: PALETTE.text,
            }}
          >
            <Counter target={target} prefix={prefix} suffix={suffix} active={active} />
            <span
              className="font-mono"
              style={{ fontSize: 11, marginLeft: 6, color, letterSpacing: "0.16em" }}
            >
              {unit}
            </span>
          </div>
        </div>
      </div>

      <div
        className="font-mono uppercase mt-4"
        style={{ fontSize: 10, letterSpacing: "0.24em", color: PALETTE.grey }}
      >
        {sub}
      </div>
    </motion.div>
  );
}

export default function TelemetryNeural() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <div className="relative w-full min-h-screen flex items-center px-6 md:px-12 py-20" ref={ref}>
      <div className="w-full max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1 }}
          className="font-mono uppercase mb-4"
          style={{ fontSize: 11, letterSpacing: "0.32em", color: PALETTE.grey }}
        >
          <span style={{ color: PALETTE.cyan }}>§ 04</span> · LAYER 02 · TELEMETRY
        </motion.div>

        <motion.h2
          id="sec-3-title"
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
            marginBottom: 36,
          }}
        >
          Live signal.
        </motion.h2>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.2 }}
          className="rounded-lg border backdrop-blur-md overflow-hidden"
          style={{
            background: "rgba(2,3,10,0.55)",
            borderColor: "rgba(139,92,246,0.22)",
          }}
        >
          {/* header */}
          <div
            className="flex items-center justify-between px-6 py-4 border-b"
            style={{
              borderColor: "rgba(155,163,199,0.1)",
              background: "rgba(139,92,246,0.04)",
            }}
          >
            <div className="flex items-center gap-3">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping" style={{ background: PALETTE.cyan }} />
                <span className="relative inline-flex h-2 w-2 rounded-full" style={{ background: PALETTE.cyan }} />
              </span>
              <span
                className="font-mono uppercase"
                style={{ fontSize: 11, letterSpacing: "0.32em", color: PALETTE.text }}
              >
                NETWORK · TELEMETRY STREAM
              </span>
            </div>
            <span
              className="font-mono uppercase"
              style={{ fontSize: 10, letterSpacing: "0.28em", color: PALETTE.amber }}
            >
              ALL NEURONS NOMINAL
            </span>
          </div>

          {/* grid */}
          <div className="grid grid-cols-2 lg:grid-cols-4">
            {STATS.map((s, i) => (
              <MetricNeuron key={s.label} {...s} index={i} active={inView} />
            ))}
          </div>

          {/* trace */}
          <div className="relative h-[140px] px-6 pt-6 pb-3 border-t" style={{ borderColor: "rgba(155,163,199,0.1)" }}>
            <svg className="absolute inset-x-6 top-6 bottom-6 w-[calc(100%-3rem)] h-[100px]" viewBox="0 0 1000 80" preserveAspectRatio="none">
              <defs>
                <linearGradient id="traceFill" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor={PALETTE.cyan} stopOpacity="0.3" />
                  <stop offset="100%" stopColor={PALETTE.latent} stopOpacity="0" />
                </linearGradient>
                <linearGradient id="traceStroke" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor={PALETTE.cyan} />
                  <stop offset="50%" stopColor={PALETTE.latent} />
                  <stop offset="100%" stopColor={PALETTE.pink} />
                </linearGradient>
              </defs>
              <path
                d="M0,80 L0,50 Q60,52 120,42 Q180,32 240,38 Q300,44 360,28 Q420,12 480,22 Q540,32 600,18 Q660,4 720,14 Q780,24 840,16 Q900,8 960,28 L1000,32 L1000,80 Z"
                fill="url(#traceFill)"
              />
              <motion.path
                d="M0,50 Q60,52 120,42 Q180,32 240,38 Q300,44 360,28 Q420,12 480,22 Q540,32 600,18 Q660,4 720,14 Q780,24 840,16 Q900,8 960,28 L1000,32"
                fill="none"
                stroke="url(#traceStroke)"
                strokeWidth="1.5"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: inView ? 1 : 0 }}
                transition={{ duration: 3, ease: [0.16, 1, 0.3, 1] }}
                style={{ filter: `drop-shadow(0 0 6px ${PALETTE.cyan})` }}
              />
            </svg>
            <span
              className="absolute bottom-2 left-6 font-mono uppercase"
              style={{ fontSize: 9, letterSpacing: "0.32em", color: PALETTE.grey }}
            >
              T-60s
            </span>
            <span
              className="absolute bottom-2 right-6 font-mono uppercase"
              style={{ fontSize: 9, letterSpacing: "0.32em", color: PALETTE.cyan }}
            >
              NOW
            </span>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
