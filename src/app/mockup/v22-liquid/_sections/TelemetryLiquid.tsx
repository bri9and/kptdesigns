"use client";

/**
 * TelemetryLiquid — V22 §04 TELEMETRY
 *
 * 4 stats with chrome counters (Inter 100 huge numerals).
 * SVG trace as polished metal contour.
 */

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import {
  ChromeText, ChromePanel, ChromeHairline, MonoKicker,
  PALETTE, riseUp, stagger,
} from "../_engine/chrome";

const STATS = [
  { label: "EXPERIENCE", target: 20,  prefix: "",  suffix: "+", unit: "Yrs",  bar: 92, sub: "Since 2004" },
  { label: "LOAD TIME",  target: 1,   prefix: "<", suffix: "",  unit: "s",    bar: 88, sub: "Target < 1.0s" },
  { label: "OWNERSHIP",  target: 100, prefix: "",  suffix: "",  unit: "%",    bar: 99, sub: "Your code, forever" },
  { label: "PAGESPEED",  target: 95,  prefix: "",  suffix: "+", unit: "pts",  bar: 76, sub: "Lighthouse" },
];

function ChromeCounter({ target, prefix, suffix }: { target: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: false, margin: "-30%" });
  const [v, setV] = useState(0);

  useEffect(() => {
    if (!isInView) return;
    const dur = 1900;
    const start = performance.now();
    let raf = 0;
    const tick = (t: number) => {
      const p = Math.min(1, (t - start) / dur);
      const eased = 1 - Math.pow(1 - p, 3);
      setV(Math.round(target * eased));
      if (p < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [isInView, target]);

  return (
    <span ref={ref} style={{ display: "inline-block" }}>
      <ChromeText size="clamp(56px, 8vw, 110px)" weight={100} tracking="-0.04em">
        {prefix}{v}{suffix}
      </ChromeText>
    </span>
  );
}

export default function TelemetryLiquid() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-20%" });

  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={stagger}
      style={{ position: "relative", width: "100%", maxWidth: 1280, margin: "0 auto" }}
    >
      <motion.div variants={riseUp} style={{ marginBottom: 18 }}>
        <MonoKicker>§ 04 / TELEMETRY · LIVE · ALL SYSTEMS NOMINAL</MonoKicker>
      </motion.div>

      <motion.h2 variants={riseUp} style={{ margin: 0, lineHeight: 0.95 }}>
        <ChromeText size="clamp(40px, 6vw, 88px)" weight={900} tracking="-0.04em" style={{ display: "inline" }}>
          Live data.
        </ChromeText>{" "}
        <ChromeText size="clamp(40px, 6vw, 88px)" weight={200} italic tracking="-0.02em" sweepDelay={0.5} style={{ display: "inline" }}>
          No fluff.
        </ChromeText>
      </motion.h2>

      <motion.div variants={riseUp} style={{ marginTop: 24, marginBottom: 28 }}>
        <ChromeHairline width={120} />
      </motion.div>

      <motion.div variants={riseUp} ref={ref}>
        <ChromePanel style={{ padding: 0, overflow: "hidden" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              padding: "14px 22px",
              borderBottom: `1px solid ${PALETTE.hi}1a`,
              background: `linear-gradient(180deg, ${PALETTE.shadow}aa, transparent)`,
            }}
          >
            <span
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 10,
                fontFamily: "var(--v22-mono), monospace",
                fontSize: 11,
                letterSpacing: "0.28em",
                color: PALETTE.hi,
                textTransform: "uppercase",
              }}
            >
              <span
                aria-hidden
                style={{
                  width: 8, height: 8, borderRadius: 999,
                  background: PALETTE.blue,
                  boxShadow: `0 0 12px ${PALETTE.blue}, 0 0 24px ${PALETTE.blue}88`,
                  animation: "v22-tel-blink 1.6s ease-in-out infinite",
                }}
              />
              SYSTEM TELEMETRY
            </span>
            <span
              style={{
                fontFamily: "var(--v22-mono), monospace",
                fontSize: 10,
                letterSpacing: "0.24em",
                color: PALETTE.cyan,
                textTransform: "uppercase",
              }}
            >
              LIVE · ALL SYSTEMS NOMINAL
            </span>
          </div>

          <div
            className="v22-tel-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0,
            }}
          >
            {STATS.map((s, i) => (
              <div
                key={s.label}
                style={{
                  padding: "28px 22px 32px",
                  borderRight: i < STATS.length - 1 ? `1px solid ${PALETTE.hi}10` : "none",
                  position: "relative",
                  background: i % 2 === 0 ? "transparent" : `${PALETTE.shadow}22`,
                }}
              >
                <div
                  style={{
                    fontFamily: "var(--v22-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.32em",
                    color: PALETTE.mid,
                    marginBottom: 14,
                  }}
                >
                  {s.label}
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "baseline",
                    gap: 6,
                    minHeight: 100,
                  }}
                >
                  <ChromeCounter target={s.target} prefix={s.prefix} suffix={s.suffix} />
                  <span
                    style={{
                      fontFamily: "var(--v22-display), system-ui",
                      fontWeight: 400,
                      fontSize: 14,
                      letterSpacing: "0.1em",
                      color: PALETTE.blue,
                    }}
                  >
                    {s.unit}
                  </span>
                </div>
                <div
                  style={{
                    marginTop: 14,
                    height: 2,
                    background: `${PALETTE.shadow}`,
                    borderRadius: 1,
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      height: "100%",
                      width: inView ? `${s.bar}%` : "0%",
                      background: `linear-gradient(90deg, ${PALETTE.hi}, ${PALETTE.blue})`,
                      boxShadow: `0 0 8px ${PALETTE.blue}66`,
                      transition: "width 1.8s cubic-bezier(0.16,1,0.3,1)",
                    }}
                  />
                </div>
                <div
                  style={{
                    marginTop: 8,
                    fontFamily: "var(--v22-mono), monospace",
                    fontSize: 10,
                    letterSpacing: "0.16em",
                    color: PALETTE.mid,
                  }}
                >
                  {s.sub}
                </div>
              </div>
            ))}
          </div>

          {/* SVG trace */}
          <div
            style={{
              padding: "20px 22px 18px",
              borderTop: `1px solid ${PALETTE.hi}10`,
              position: "relative",
              height: 130,
              overflow: "hidden",
            }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1000 80"
              preserveAspectRatio="none"
              style={{ display: "block" }}
            >
              <defs>
                <linearGradient id="v22-trace-grad" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor={PALETTE.blue} stopOpacity="0.45" />
                  <stop offset="100%" stopColor={PALETTE.blue} stopOpacity="0" />
                </linearGradient>
                <linearGradient id="v22-trace-line" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor={PALETTE.hi} />
                  <stop offset="50%" stopColor={PALETTE.mirror} />
                  <stop offset="100%" stopColor={PALETTE.cyan} />
                </linearGradient>
              </defs>
              <path
                d="M0,80 L0,48 Q50,52 100,40 Q150,28 200,36 Q250,44 300,28 Q350,12 400,22 Q450,32 500,18 Q550,4 600,12 Q650,20 700,14 Q750,8 800,24 Q850,40 900,28 Q950,16 1000,32 L1000,80 Z"
                fill="url(#v22-trace-grad)"
              />
              <path
                d="M0,48 Q50,52 100,40 Q150,28 200,36 Q250,44 300,28 Q350,12 400,22 Q450,32 500,18 Q550,4 600,12 Q650,20 700,14 Q750,8 800,24 Q850,40 900,28 Q950,16 1000,32"
                fill="none"
                stroke="url(#v22-trace-line)"
                strokeWidth="1.5"
                strokeDasharray="1500"
                strokeDashoffset={inView ? 0 : 1500}
                style={{ transition: "stroke-dashoffset 3s ease-out" }}
              />
            </svg>
            <span
              style={{
                position: "absolute", bottom: 8, left: 22,
                fontFamily: "var(--v22-mono), monospace",
                fontSize: 9, letterSpacing: "0.28em",
                color: PALETTE.mid, textTransform: "uppercase",
              }}
            >T-60s</span>
            <span
              style={{
                position: "absolute", bottom: 8, right: 22,
                fontFamily: "var(--v22-mono), monospace",
                fontSize: 9, letterSpacing: "0.28em",
                color: PALETTE.mid, textTransform: "uppercase",
              }}
            >NOW</span>
          </div>
        </ChromePanel>
      </motion.div>

      <style>{`
        @keyframes v22-tel-blink {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.85); }
        }
        @media (max-width: 900px) {
          .v22-tel-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .v22-tel-grid > div:nth-child(2) { border-right: none !important; }
        }
        @media (max-width: 540px) {
          .v22-tel-grid {
            grid-template-columns: 1fr !important;
          }
          .v22-tel-grid > div { border-right: none !important; border-bottom: 1px solid ${PALETTE.hi}10 !important; }
        }
      `}</style>
    </motion.div>
  );
}
