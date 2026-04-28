"use client";

import { VT323 } from "next/font/google";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";

const vt = VT323({ subsets: ["latin"], weight: "400" });

// V18 receipt palette
const RECEIPT_WHITE = "#FBFBFB";
const INK = "#1A1A1A";
const CARBON_RED = "#B53D3D";

type Step = { no: string; title: string; detail: string };

const STEPS: Step[] = [
  { no: "01", title: "DISCOVERY", detail: "30 MIN CALL" },
  { no: "02", title: "BUILD", detail: "7 - 30 DAYS" },
  { no: "03", title: "REVIEW", detail: "ITERATE TIL CORRECT" },
  { no: "04", title: "DELIVERY", detail: "SOURCE TRANSFERRED" },
];

// Thermal paper background — speckle + faint print bands.
const paperStyle: CSSProperties = {
  background: RECEIPT_WHITE,
  backgroundImage: [
    "radial-gradient(rgba(0,0,0,0.025) 1px, transparent 1px)",
    "repeating-linear-gradient(180deg, rgba(0,0,0,0.018) 0 1px, transparent 1px 3px)",
  ].join(","),
  backgroundSize: "3px 3px, 100% 3px",
  boxShadow:
    "0 0 0 1px rgba(0,0,0,0.04), 0 30px 60px -30px rgba(0,0,0,0.25), 0 8px 18px -10px rgba(0,0,0,0.18)",
};

const inkFade = (intensity = 1): CSSProperties => ({
  color: INK,
  opacity: 0.78 + 0.18 * intensity,
  textShadow: "0 0 0.6px rgba(0,0,0,0.35)",
  filter: "contrast(1.05)",
});

// Roller-feed jitter — staggered per-line vertical jiggle.
const jitter = (i: number) => ({
  initial: { opacity: 0, y: -6 },
  whileInView: {
    opacity: 1,
    y: [-6 + i * 0.4, 0.6, -0.4, 0],
    x: [0, 0.4, -0.3, 0],
  },
  viewport: { once: true, margin: "-10% 0px" },
  transition: {
    duration: 0.55 + i * 0.05,
    delay: 0.18 + i * 0.12,
    ease: [0.2, 0.8, 0.2, 1] as [number, number, number, number],
  },
});

const fillerDots: CSSProperties = {
  flex: 1,
  overflow: "hidden",
  whiteSpace: "nowrap",
  color: INK,
  opacity: 0.55,
};

export default function ProcessReceipt() {
  return (
    <section
      aria-label="Service order — process"
      className={vt.className}
      style={{ position: "relative", padding: "96px 16px 120px" }}
    >
      <motion.div
        initial={{ opacity: 0, y: -24, scaleY: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scaleY: 1 }}
        viewport={{ once: true, margin: "-8% 0px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: "relative",
          maxWidth: 460,
          margin: "0 auto",
          padding: "26px 22px 30px",
          transformOrigin: "top center",
          ...paperStyle,
        }}
      >
        <motion.h2
          {...jitter(0)}
          style={{
            margin: 0,
            textAlign: "center",
            fontSize: 26,
            letterSpacing: "0.18em",
            lineHeight: 1.05,
            ...inkFade(0.9),
          }}
        >
          *** SERVICE ORDER ***
        </motion.h2>

        <motion.p
          {...jitter(1)}
          style={{
            margin: "6px 0 18px",
            textAlign: "center",
            fontSize: 16,
            letterSpacing: "0.32em",
            ...inkFade(0.55),
          }}
        >
          KPT DESIGNS &nbsp;//&nbsp; EST. 2004
        </motion.p>

        <motion.div
          {...jitter(2)}
          style={{
            borderTop: `1px dashed ${INK}`,
            opacity: 0.55,
            margin: "8px 0 18px",
          }}
        />

        <ul
          style={{
            listStyle: "none",
            padding: 0,
            margin: 0,
            display: "flex",
            flexDirection: "column",
            gap: 14,
          }}
        >
          {STEPS.map((s, i) => (
            <motion.li key={s.no} {...jitter(3 + i)}>
              <div
                style={{
                  display: "flex",
                  alignItems: "baseline",
                  gap: 6,
                  fontSize: 22,
                  lineHeight: 1,
                  letterSpacing: "0.06em",
                  ...inkFade(0.85),
                }}
              >
                <span>STEP {s.no}</span>
                <span aria-hidden style={fillerDots}>
                  {".".repeat(60)}
                </span>
                <span style={{ letterSpacing: "0.12em" }}>{s.title}</span>
                <span aria-hidden style={fillerDots}>
                  {".".repeat(60)}
                </span>
                <motion.span
                  initial={{ opacity: 0, scale: 0.6, rotate: -14 }}
                  whileInView={{ opacity: 0.78, scale: 1, rotate: -6 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.35,
                    delay: 0.55 + i * 0.18,
                    ease: [0.2, 1.4, 0.4, 1],
                  }}
                  style={{
                    color: CARBON_RED,
                    fontSize: 26,
                    lineHeight: 1,
                    display: "inline-block",
                    filter: "blur(0.3px) contrast(0.92)",
                    textShadow:
                      "0.4px 0 0 rgba(181,61,61,0.35), -0.4px 0 0 rgba(181,61,61,0.35)",
                  }}
                >
                  {"✓"}
                </motion.span>
              </div>
              <div
                style={{
                  marginTop: 4,
                  paddingLeft: 84,
                  fontSize: 18,
                  letterSpacing: "0.14em",
                  ...inkFade(0.45),
                }}
              >
                {s.detail}
              </div>
            </motion.li>
          ))}
        </ul>

        <motion.div
          {...jitter(8)}
          style={{
            borderTop: `1px dashed ${INK}`,
            opacity: 0.55,
            margin: "22px 0 14px",
          }}
        />

        <motion.div
          {...jitter(9)}
          style={{
            display: "flex",
            alignItems: "baseline",
            gap: 6,
            fontSize: 24,
            letterSpacing: "0.08em",
            ...inkFade(1),
          }}
        >
          <span>TOTAL ELAPSED</span>
          <span aria-hidden style={fillerDots}>
            {".".repeat(80)}
          </span>
          <span style={{ letterSpacing: "0.12em" }}>47 DAYS AVG.</span>
        </motion.div>

        <motion.p
          {...jitter(10)}
          style={{
            margin: "18px 0 0",
            textAlign: "center",
            fontSize: 16,
            letterSpacing: "0.28em",
            ...inkFade(0.5),
          }}
        >
          THANK YOU &mdash; KEEP THIS RECEIPT
        </motion.p>

        <motion.p
          {...jitter(11)}
          style={{
            margin: "4px 0 0",
            textAlign: "center",
            fontSize: 14,
            letterSpacing: "0.4em",
            ...inkFade(0.32),
          }}
        >
          NO. 0042-KPT &nbsp;//&nbsp; REG 04
        </motion.p>
      </motion.div>
    </section>
  );
}
