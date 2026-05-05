"use client";

/**
 * ProcessLiquid — V22 §06 PROCESS
 *
 * 4 phases of forging — Cast → Form → Polish → Hand off
 * Heavy/light Inter mix.
 */

import { motion } from "framer-motion";
import {
  ChromeText, ChromePanel, ChromeHairline, MonoKicker,
  PALETTE, riseUp, stagger,
} from "../_engine/chrome";

const PHASES = [
  {
    num: "01",
    phase: "CAST",
    name: "Cast — Discovery",
    desc: "A focused conversation about your goals, audience, and timeline. We pour the molten metal into a mold of your business.",
  },
  {
    num: "02",
    phase: "FORM",
    name: "Form — Design & Build",
    desc: "We design and code your site from scratch. You see progress early and often. Revisions included until the form is right.",
  },
  {
    num: "03",
    phase: "POLISH",
    name: "Polish — Review & Launch",
    desc: "We iterate until the surface mirrors you. Then deploy, configure analytics, and verify every reflection runs clean.",
  },
  {
    num: "04",
    phase: "HAND OFF",
    name: "Hand Off — Delivery",
    desc: "Complete source code and repository delivered. The ingot is yours — no lock-in, no proprietary platforms, no monthly toll.",
  },
];

export default function ProcessLiquid() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={stagger}
      style={{ position: "relative", width: "100%", maxWidth: 1280, margin: "0 auto" }}
    >
      <motion.div variants={riseUp} style={{ marginBottom: 18 }}>
        <MonoKicker>§ 06 / PROCESS · 4 PHASES OF FORGING</MonoKicker>
      </motion.div>

      <motion.h2 variants={riseUp} style={{ margin: 0, lineHeight: 0.95 }}>
        <ChromeText size="clamp(40px, 6vw, 88px)" weight={900} tracking="-0.04em" style={{ display: "inline" }}>
          Cast.
        </ChromeText>{" "}
        <ChromeText size="clamp(40px, 6vw, 88px)" weight={200} italic tracking="-0.02em" sweepDelay={0.3} style={{ display: "inline" }}>
          Form.
        </ChromeText>{" "}
        <ChromeText size="clamp(40px, 6vw, 88px)" weight={900} tracking="-0.04em" sweepDelay={0.6} style={{ display: "inline" }}>
          Polish.
        </ChromeText>{" "}
        <ChromeText size="clamp(40px, 6vw, 88px)" weight={200} italic tracking="-0.02em" sweepDelay={0.9} style={{ display: "inline" }}>
          Hand off.
        </ChromeText>
      </motion.h2>

      <motion.div variants={riseUp} style={{ marginTop: 24, marginBottom: 28 }}>
        <ChromeHairline width={120} />
      </motion.div>

      <motion.div
        variants={stagger}
        className="v22-proc-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
        }}
      >
        {PHASES.map((p, i) => (
          <motion.div key={p.num} variants={riseUp}>
            <ChromePanel style={{ padding: 22, height: "100%", position: "relative", overflow: "hidden" }}>
              {/* phase number — huge, ultra-thin */}
              <div
                aria-hidden
                style={{
                  fontFamily: "var(--v22-display), system-ui",
                  fontWeight: 100,
                  fontSize: 84,
                  lineHeight: 1,
                  letterSpacing: "-0.04em",
                  color: "transparent",
                  WebkitTextStroke: `1px ${PALETTE.hi}55`,
                  marginBottom: 16,
                }}
              >
                {p.num}
              </div>

              <span
                style={{
                  display: "inline-block",
                  fontFamily: "var(--v22-mono), monospace",
                  fontSize: 10,
                  letterSpacing: "0.32em",
                  color: PALETTE.blue,
                  textTransform: "uppercase",
                  marginBottom: 8,
                }}
              >
                PHASE · {p.phase}
              </span>

              <h3
                style={{
                  margin: "0 0 8px",
                  fontFamily: "var(--v22-display), system-ui",
                  fontWeight: 700,
                  fontSize: 18,
                  color: PALETTE.mirror,
                  letterSpacing: "-0.01em",
                }}
              >
                {p.name}
              </h3>

              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--v22-display), system-ui",
                  fontWeight: 300,
                  fontSize: 13,
                  lineHeight: 1.6,
                  color: PALETTE.hi,
                }}
              >
                {p.desc}
              </p>

              {/* connector line on right edge */}
              {i < PHASES.length - 1 && (
                <div
                  aria-hidden
                  className="v22-proc-connector"
                  style={{
                    position: "absolute",
                    top: "50%",
                    right: -8,
                    width: 16,
                    height: 1,
                    background: `linear-gradient(90deg, ${PALETTE.hi}88, transparent)`,
                  }}
                />
              )}
            </ChromePanel>
          </motion.div>
        ))}
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .v22-proc-grid { grid-template-columns: 1fr 1fr !important; }
          .v22-proc-connector { display: none; }
        }
        @media (max-width: 540px) {
          .v22-proc-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  );
}
