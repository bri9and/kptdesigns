"use client";

import { useEffect, useRef, useState } from "react";
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

type Stat = {
  label: string;
  target: number;
  prefix?: string;
  suffix?: string;
  unit: string;
  bar: string;
  sub: string;
};

const STATS: Stat[] = [
  { label: "Experience", target: 20, suffix: "+", unit: "Yrs", bar: "92%", sub: "Since 2004" },
  { label: "Load Time", target: 1, prefix: "<", unit: "s", bar: "88%", sub: "Target < 1.0s" },
  { label: "Ownership", target: 100, unit: "%", bar: "99%", sub: "Your code, forever" },
  { label: "PageSpeed", target: 95, suffix: "+", unit: "pts", bar: "76%", sub: "Lighthouse" },
];

/**
 * TelemetryCheckpoint — checkpoint 04 of 08
 *
 * 4 animated counter stats + a fake "trace" SVG line chart that draws on view.
 * Pure HTML overlay — sits on top of the tunnel canvas.
 */
export default function TelemetryCheckpoint() {
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
        <span>{"//"} CHECKPOINT 04 · TELEMETRY</span>
        <span style={{ color: C.amber, display: "inline-flex", gap: 8, alignItems: "center" }}>
          <span
            aria-hidden
            style={{
              width: 7, height: 7, borderRadius: 999, background: C.amber,
              boxShadow: `0 0 8px ${C.amber}`, animation: "kpt-blink 1.4s ease-in-out infinite",
            }}
          />
          LIVE · ALL SYSTEMS NOMINAL
        </span>
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
        Live <span style={{ color: C.cyan, fontWeight: 700 }}>Data.</span>
      </h2>
      <p
        className={mono.className}
        style={{
          marginTop: 12,
          fontSize: 12,
          letterSpacing: "0.05em",
          color: `${C.white}aa`,
          maxWidth: 520,
        }}
      >
        Real numbers from real projects. No fluff.
      </p>

      {/* stats row */}
      <div
        style={{
          marginTop: 28,
          display: "grid",
          gridTemplateColumns: "repeat(4, minmax(0, 1fr))",
          gap: 0,
          border: `1px solid ${C.cyan}30`,
          background: "rgba(0,8,18,0.55)",
        }}
        className="kpt-tel-grid"
      >
        {STATS.map((s, i) => (
          <StatCell key={s.label} s={s} active={inView} index={i} />
        ))}
      </div>

      {/* trace chart */}
      <div
        style={{
          marginTop: 14,
          padding: "18px 20px 8px",
          border: `1px solid ${C.cyan}30`,
          background: "rgba(0,8,18,0.55)",
          position: "relative",
        }}
      >
        <div
          className={mono.className}
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 10,
            letterSpacing: "0.28em",
            color: `${C.cyan}aa`,
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          <span>TRACE · t-60s → now</span>
          <span style={{ color: C.amber }}>VECTOR STREAM</span>
        </div>
        <svg viewBox="0 0 1000 80" preserveAspectRatio="none" style={{ display: "block", width: "100%", height: 70 }}>
          <defs>
            <linearGradient id="kpt-trace-fill" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor={C.cyan} stopOpacity="0.32" />
              <stop offset="100%" stopColor={C.cyan} stopOpacity="0" />
            </linearGradient>
            <linearGradient id="kpt-trace-stroke" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor={C.cyan} />
              <stop offset="60%" stopColor={C.blue} />
              <stop offset="100%" stopColor={C.magenta} />
            </linearGradient>
          </defs>
          {/* gridlines */}
          {[20, 40, 60].map((y) => (
            <line key={y} x1="0" x2="1000" y1={y} y2={y} stroke={`${C.cyan}1a`} strokeDasharray="2 6" />
          ))}
          <path
            d="M0,80 L0,55 Q50,58 100,50 Q150,42 200,48 Q250,54 300,40 Q350,26 400,35 Q450,44 500,32 Q550,20 600,28 Q650,36 700,30 Q750,24 800,38 Q850,52 900,42 Q950,32 1000,45 L1000,80 Z"
            fill="url(#kpt-trace-fill)"
          />
          <motion.path
            d="M0,55 Q50,58 100,50 Q150,42 200,48 Q250,54 300,40 Q350,26 400,35 Q450,44 500,32 Q550,20 600,28 Q650,36 700,30 Q750,24 800,38 Q850,52 900,42 Q950,32 1000,45"
            fill="none"
            stroke="url(#kpt-trace-stroke)"
            strokeWidth="1.5"
            initial={{ pathLength: 0 }}
            animate={inView ? { pathLength: 1 } : {}}
            transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          />
        </svg>
        <div
          className={mono.className}
          style={{
            display: "flex",
            justifyContent: "space-between",
            fontSize: 9,
            letterSpacing: "0.28em",
            color: `${C.cyan}66`,
            textTransform: "uppercase",
            paddingTop: 4,
          }}
        >
          <span>T-60s</span>
          <span>NOW</span>
        </div>
      </div>

      <style>{`
        @keyframes kpt-blink { 0%,100% { opacity:1 } 50% { opacity:0.35 } }
        @media (max-width: 760px) {
          .kpt-tel-grid { grid-template-columns: repeat(2, minmax(0,1fr)) !important; }
        }
        @media (max-width: 420px) {
          .kpt-tel-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function StatCell({ s, active, index }: { s: Stat; active: boolean; index: number }) {
  return (
    <div
      style={{
        padding: 20,
        borderRight: `1px solid ${C.cyan}1a`,
        position: "relative",
      }}
    >
      <div
        className={mono.className}
        style={{
          fontSize: 10,
          letterSpacing: "0.28em",
          color: `${C.cyan}cc`,
          textTransform: "uppercase",
          marginBottom: 10,
        }}
      >
        {s.label}
      </div>
      <div
        style={{
          fontSize: 38,
          fontWeight: 700,
          letterSpacing: "-0.02em",
          lineHeight: 1,
          color: C.white,
        }}
      >
        <Counter target={s.target} prefix={s.prefix} suffix={s.suffix} active={active} delayMs={index * 120} />
        <span
          className={mono.className}
          style={{
            fontSize: 12,
            fontWeight: 500,
            color: C.amber,
            marginLeft: 6,
            letterSpacing: "0.06em",
          }}
        >
          {s.unit}
        </span>
      </div>
      <div
        style={{
          marginTop: 14,
          height: 2,
          background: `${C.cyan}1a`,
          overflow: "hidden",
        }}
      >
        <div
          style={{
            height: "100%",
            width: active ? s.bar : "0%",
            background: `linear-gradient(90deg, ${C.cyan} 0%, ${C.magenta} 100%)`,
            transition: `width 1.6s cubic-bezier(0.16, 1, 0.3, 1) ${index * 120}ms`,
            boxShadow: `0 0 10px ${C.cyan}66`,
          }}
        />
      </div>
      <div
        className={mono.className}
        style={{
          marginTop: 8,
          fontSize: 10,
          letterSpacing: "0.18em",
          color: `${C.grey}cc`,
        }}
      >
        {s.sub}
      </div>
    </div>
  );
}

function Counter({
  target, prefix = "", suffix = "", active, delayMs = 0,
}: {
  target: number; prefix?: string; suffix?: string; active: boolean; delayMs?: number;
}) {
  const [val, setVal] = useState(0);
  useEffect(() => {
    if (!active) return;
    let raf = 0;
    const start = performance.now() + delayMs;
    const dur = 1800;
    const step = (now: number) => {
      const t = Math.max(0, now - start);
      const p = Math.min(t / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setVal(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [active, target, delayMs]);
  return (
    <span style={{ fontVariantNumeric: "tabular-nums" }}>
      {prefix}{val}{suffix}
    </span>
  );
}
