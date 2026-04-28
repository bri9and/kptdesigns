"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";
import { Fraunces, Inter, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], axes: ["opsz", "SOFT"], display: "swap" });
const inter = Inter({ subsets: ["latin"], weight: ["300", "400", "500", "700"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const PAPER = "#F4F1EB";
const INK = "#1A1A22";
const ORANGE = "#FF5E1A";
const SAGE = "#7B8E6F";
const VOID = "#0B0B0F";

type Stat = { label: string; target: number; prefix: string; suffix: string; unit: string; barWidth: string; sub: string };

const STATS: Stat[] = [
  { label: "Experience", target: 20, prefix: "", suffix: "+", unit: "Yrs", barWidth: "92%", sub: "Since 2004" },
  { label: "Load Time", target: 1, prefix: "<", suffix: "", unit: "s", barWidth: "88%", sub: "Target < 1.0s" },
  { label: "Ownership", target: 100, prefix: "", suffix: "", unit: "%", barWidth: "99%", sub: "Your code, forever" },
  { label: "PageSpeed", target: 95, prefix: "", suffix: "+", unit: "pts", barWidth: "76%", sub: "Google Lighthouse" },
];

function AnimatedCounter({ target, prefix = "", suffix = "", isInView }: { target: number; prefix?: string; suffix?: string; isInView: boolean }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    if (!isInView) return;
    const duration = 1800;
    const startTime = performance.now();
    let raf = 0;
    function update(now: number) {
      const progress = Math.min((now - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Math.round(target * eased));
      if (progress < 1) raf = requestAnimationFrame(update);
    }
    raf = requestAnimationFrame(update);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target]);
  return <span>{prefix}{display}{suffix}</span>;
}

const STRIATIONS: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  backgroundImage: `repeating-linear-gradient(180deg, transparent 0 119px, rgba(26,26,34,0.05) 119px 120px)`,
  pointerEvents: "none",
};

const EDGE_FADE: React.CSSProperties = {
  position: "absolute",
  inset: 0,
  background: `radial-gradient(ellipse at center, rgba(11,11,15,0) 38%, rgba(11,11,15,0.18) 70%, ${VOID} 100%)`,
  pointerEvents: "none",
};

export default function TelemetryPlane() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { margin: "-15%", amount: 0.3 });

  return (
    <section
      ref={ref}
      className={inter.className}
      style={{
        position: "relative",
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        background: PAPER,
        color: INK,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        overflow: "hidden",
        padding: "clamp(48px, 6vh, 80px) clamp(24px, 5vw, 64px)",
      }}
      aria-labelledby="strata-telemetry-title"
    >
      <div aria-hidden style={STRIATIONS} />
      <div aria-hidden style={EDGE_FADE} />

      <div style={{ position: "relative", width: "100%", maxWidth: 1240, margin: "0 auto", zIndex: 2 }}>
        <header style={{ display: "flex", alignItems: "center", gap: 18, marginBottom: "clamp(20px, 3vh, 32px)" }}>
          <span className={mono.className} style={{ fontSize: 11, letterSpacing: "0.32em", textTransform: "uppercase", color: ORANGE, fontWeight: 600 }}>
            Stratum 04 · Telemetry
          </span>
          <span aria-hidden style={{ flex: 1, height: 1, background: ORANGE, opacity: 0.6 }} />
          <span className={mono.className} style={{ fontSize: 10, letterSpacing: "0.32em", textTransform: "uppercase", color: SAGE }}>
            <span aria-hidden style={{ display: "inline-block", width: 7, height: 7, borderRadius: 999, background: SAGE, marginRight: 8, boxShadow: `0 0 8px ${SAGE}` }} />
            LIVE · ALL SYSTEMS NOMINAL
          </span>
        </header>

        <h2
          id="strata-telemetry-title"
          className={fraunces.className}
          style={{
            margin: 0,
            fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)",
            fontWeight: 300,
            lineHeight: 0.98,
            letterSpacing: "-0.02em",
            fontVariationSettings: '"opsz" 144, "SOFT" 50',
            color: INK,
            marginBottom: "clamp(28px, 4vh, 44px)",
          }}
        >
          Real numbers. <em style={{ fontStyle: "italic", color: ORANGE, fontWeight: 300 }}>No fluff.</em>
        </h2>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, minmax(0, 1fr))", border: "1px solid rgba(26,26,34,0.14)", background: "rgba(26,26,34,0.04)" }}>
          {STATS.map((stat, i) => (
            <div key={stat.label} style={{ padding: "clamp(20px, 2.6vh, 32px) clamp(16px, 1.6vw, 26px)", borderRight: i < STATS.length - 1 ? "1px solid rgba(26,26,34,0.14)" : "none", position: "relative" }}>
              <div className={mono.className} style={{ fontSize: 9, letterSpacing: "0.3em", textTransform: "uppercase", color: INK, opacity: 0.55, marginBottom: 10 }}>
                {stat.label}
              </div>
              <div className={fraunces.className} style={{ fontSize: "clamp(2.4rem, 3.8vw, 3.4rem)", fontWeight: 500, letterSpacing: "-0.025em", lineHeight: 1, color: INK, fontVariationSettings: '"opsz" 144' }}>
                <AnimatedCounter target={stat.target} prefix={stat.prefix} suffix={stat.suffix} isInView={isInView} />
                <span className={mono.className} style={{ fontSize: "0.34em", fontWeight: 500, color: ORANGE, marginLeft: 6, letterSpacing: "0.1em", verticalAlign: "middle" }}>
                  {stat.unit}
                </span>
              </div>
              <div style={{ marginTop: 14, height: 2, background: "rgba(26,26,34,0.12)", position: "relative", overflow: "hidden" }}>
                <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: isInView ? stat.barWidth : "0%", background: ORANGE, transition: "width 1.6s cubic-bezier(0.16, 1, 0.3, 1)" }} />
              </div>
              <div className={mono.className} style={{ marginTop: 8, fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: INK, opacity: 0.45 }}>
                {stat.sub}
              </div>
            </div>
          ))}
        </div>

        {/* Trace SVG — sage-stroked editorial cousin of the page.tsx M0,60 path */}
        <div style={{ marginTop: 14, border: "1px solid rgba(26,26,34,0.14)", background: "rgba(26,26,34,0.04)", padding: "clamp(20px, 2.6vh, 28px) clamp(20px, 2vw, 32px)", position: "relative", height: "clamp(120px, 18vh, 150px)", overflow: "hidden" }}>
          <div className={mono.className} style={{ position: "absolute", top: 12, left: 20, fontSize: 9, letterSpacing: "0.28em", textTransform: "uppercase", color: INK, opacity: 0.55 }}>
            Performance trace · last 60s
          </div>
          <svg style={{ width: "100%", height: "100%", display: "block" }} viewBox="0 0 1000 60" preserveAspectRatio="none" aria-hidden>
            <defs>
              <linearGradient id="strata-traceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor={ORANGE} stopOpacity="0.28" />
                <stop offset="100%" stopColor={ORANGE} stopOpacity="0" />
              </linearGradient>
            </defs>
            <path d="M0,60 L0,35 Q50,38 100,30 Q150,22 200,28 Q250,34 300,20 Q350,6 400,15 Q450,24 500,12 Q550,0 600,8 Q650,16 700,10 Q750,4 800,18 Q850,32 900,22 Q950,12 1000,25 L1000,60 Z" fill="url(#strata-traceGrad)" />
            <path
              d="M0,35 Q50,38 100,30 Q150,22 200,28 Q250,34 300,20 Q350,6 400,15 Q450,24 500,12 Q550,0 600,8 Q650,16 700,10 Q750,4 800,18 Q850,32 900,22 Q950,12 1000,25"
              fill="none"
              stroke={ORANGE}
              strokeWidth="1.4"
              opacity="0.75"
              strokeDasharray="2200"
              strokeDashoffset={isInView ? "0" : "2200"}
              style={{ transition: "stroke-dashoffset 2.8s ease-out" }}
            />
          </svg>
          <div style={{ position: "absolute", left: 20, bottom: 8, display: "flex", justifyContent: "space-between", right: 20 }}>
            <span className={mono.className} style={{ fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: INK, opacity: 0.45 }}>T-60s</span>
            <span className={mono.className} style={{ fontSize: 9, letterSpacing: "0.24em", textTransform: "uppercase", color: INK, opacity: 0.45 }}>Now</span>
          </div>
        </div>
      </div>
    </section>
  );
}
