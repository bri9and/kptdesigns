"use client";

/**
 * StackLiquid — V22 §03 STACK
 *
 * 6 tech tools + 7th "KPT Agents" highlighted. Each tool rendered as a
 * chrome chip with electric blue active state. KPT Agents pulses plasma cyan.
 */

import { motion } from "framer-motion";
import {
  ChromeText, ChromePanel, ChromeHairline, MonoKicker,
  PALETTE, riseUp, stagger, staggerSlow,
} from "../_engine/chrome";

const TOOLS = [
  { num: "01", name: "Next.js 16",     spec: "App Router · RSC · Edge",       desc: "Server-side rendering at the edge. Pages load instantly with built-in SEO." },
  { num: "02", name: "React 19",       spec: "Hooks · Suspense · RSC",        desc: "Component architecture built for scale. Interactive UIs that update fluidly." },
  { num: "03", name: "Tailwind v4",    spec: "JIT · Tree-shaken · <10KB",     desc: "Utility-first styling with zero dead CSS. Pixel-perfect responsive." },
  { num: "04", name: "TypeScript",     spec: "Strict · End-to-End",           desc: "Full type safety from database to DOM. Bugs caught at build time." },
  { num: "05", name: "Vercel Edge",    spec: "194 PoPs · 99.99% Uptime",      desc: "Global edge deployment. Built-in SSL, DDoS, and analytics." },
  { num: "06", name: "Custom Code",    spec: "Zero Templates · Hand-Crafted", desc: "Every line written for your business. Source code is yours forever." },
];

const AGENT = {
  num: "07",
  name: "KPT Agents",
  spec: "AI Inbound · 24/7 · Sister Brand",
  desc: "AI inbound phone agents that answer, qualify, and route in real time.",
};

export default function StackLiquid() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={stagger}
      style={{ position: "relative", width: "100%", maxWidth: 1280, margin: "0 auto" }}
    >
      <motion.div variants={riseUp} style={{ marginBottom: 18 }}>
        <MonoKicker>§ 03 / STACK · 7 ALLOYS</MonoKicker>
      </motion.div>

      <motion.h2
        variants={riseUp}
        style={{ margin: 0, lineHeight: 0.95 }}
      >
        <ChromeText size="clamp(40px, 6vw, 88px)" weight={900} tracking="-0.04em" style={{ display: "inline" }}>
          The alloys
        </ChromeText>
        {" "}
        <ChromeText size="clamp(40px, 6vw, 88px)" weight={200} italic tracking="-0.02em" sweepDelay={0.5} style={{ display: "inline" }}>
          we forge with.
        </ChromeText>
      </motion.h2>

      <motion.p
        variants={riseUp}
        style={{
          marginTop: 18,
          maxWidth: 620,
          fontFamily: "var(--v22-display), system-ui",
          fontWeight: 300,
          fontSize: "clamp(15px, 1.3vw, 17px)",
          color: PALETTE.hi,
          lineHeight: 1.7,
        }}
      >
        Six core tools. One sister brand of inbound AI agents. Same team owns
        the registry, the host, the build, and the phone calls.
      </motion.p>

      <motion.div variants={riseUp} style={{ marginTop: 24 }}>
        <ChromeHairline width={120} />
      </motion.div>

      <motion.div
        variants={staggerSlow}
        className="v22-stack-grid"
        style={{
          marginTop: 36,
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 14,
        }}
      >
        {TOOLS.map((t, i) => (
          <motion.div key={t.num} variants={riseUp}>
            <ChromePanel
              style={{
                padding: "20px 18px",
                minHeight: 168,
                position: "relative",
                overflow: "hidden",
                cursor: "default",
              }}
            >
              <div
                aria-hidden
                style={{
                  position: "absolute", top: 0, left: 0, right: 0, height: 1,
                  background: i === 0
                    ? `linear-gradient(90deg, transparent, ${PALETTE.blue}, transparent)`
                    : `linear-gradient(90deg, transparent, ${PALETTE.hi}55, transparent)`,
                }}
              />
              <span
                style={{
                  fontFamily: "var(--v22-mono), monospace",
                  fontSize: 10, letterSpacing: "0.28em",
                  color: PALETTE.blue,
                }}
              >
                {t.num}
              </span>
              <h3
                style={{
                  margin: "8px 0 4px",
                  fontFamily: "var(--v22-display), system-ui",
                  fontWeight: 700,
                  fontSize: 19,
                  letterSpacing: "-0.01em",
                  color: PALETTE.mirror,
                }}
              >
                {t.name}
              </h3>
              <p
                style={{
                  margin: 0,
                  fontFamily: "var(--v22-display), system-ui",
                  fontWeight: 300,
                  fontSize: 13,
                  lineHeight: 1.55,
                  color: PALETTE.hi,
                }}
              >
                {t.desc}
              </p>
              <div
                style={{
                  marginTop: 14,
                  paddingTop: 12,
                  borderTop: `1px solid ${PALETTE.hi}1a`,
                  fontFamily: "var(--v22-mono), monospace",
                  fontSize: 9,
                  letterSpacing: "0.2em",
                  color: PALETTE.mid,
                  textTransform: "uppercase",
                }}
              >
                {t.spec}
              </div>
            </ChromePanel>
          </motion.div>
        ))}

        {/* KPT Agents — 2-col plasma chip */}
        <motion.div variants={riseUp} style={{ gridColumn: "span 2" }}>
          <ChromePanel
            className="v22-agent-card"
            style={{
              padding: "24px 24px",
              minHeight: 168,
              position: "relative",
              overflow: "hidden",
              border: `1px solid ${PALETTE.cyan}55`,
              boxShadow: `0 0 0 1px ${PALETTE.cyan}22 inset, 0 12px 40px -10px ${PALETTE.cyan}55`,
            }}
          >
            <div
              aria-hidden
              style={{
                position: "absolute", top: 0, left: 0, right: 0, height: 1,
                background: `linear-gradient(90deg, transparent, ${PALETTE.cyan}, transparent)`,
                animation: "v22-agent-line 3.4s ease-in-out infinite",
              }}
            />
            <div
              aria-hidden
              style={{
                position: "absolute", inset: 0,
                background: `radial-gradient(ellipse 80% 60% at 90% 0%, ${PALETTE.cyan}22 0%, transparent 60%)`,
                pointerEvents: "none",
              }}
            />
            <span
              style={{
                fontFamily: "var(--v22-mono), monospace",
                fontSize: 10, letterSpacing: "0.28em",
                color: PALETTE.cyan,
                textShadow: `0 0 10px ${PALETTE.cyan}88`,
              }}
            >
              {AGENT.num} · SISTER BRAND
            </span>
            <h3
              style={{
                margin: "8px 0 4px",
                fontFamily: "var(--v22-display), system-ui",
                fontWeight: 800,
                fontSize: 28,
                letterSpacing: "-0.02em",
                color: PALETTE.mirror,
              }}
            >
              {AGENT.name}
              <span
                aria-hidden
                style={{
                  display: "inline-block",
                  marginLeft: 10,
                  width: 8, height: 8, borderRadius: 999,
                  background: PALETTE.cyan,
                  boxShadow: `0 0 14px ${PALETTE.cyan}, 0 0 30px ${PALETTE.cyan}aa`,
                  animation: "v22-agent-pulse 1.6s ease-in-out infinite",
                  verticalAlign: "middle",
                }}
              />
            </h3>
            <p
              style={{
                margin: 0,
                fontFamily: "var(--v22-display), system-ui",
                fontWeight: 300,
                fontSize: 14,
                lineHeight: 1.6,
                color: PALETTE.hi,
                maxWidth: 460,
              }}
            >
              {AGENT.desc} One process, one bill, one team — owned outright.
            </p>
            <div
              style={{
                marginTop: 14,
                paddingTop: 12,
                borderTop: `1px solid ${PALETTE.cyan}33`,
                fontFamily: "var(--v22-mono), monospace",
                fontSize: 9,
                letterSpacing: "0.22em",
                color: PALETTE.cyan,
                textTransform: "uppercase",
              }}
            >
              {AGENT.spec}
            </div>
          </ChromePanel>
        </motion.div>
      </motion.div>

      <style>{`
        @keyframes v22-agent-line {
          0%, 100% { opacity: 0.3; }
          50% { opacity: 1; }
        }
        @keyframes v22-agent-pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.7; }
        }
        @media (max-width: 1100px) {
          .v22-stack-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .v22-stack-grid > div:last-child { grid-column: span 2 !important; }
        }
        @media (max-width: 640px) {
          .v22-stack-grid { grid-template-columns: 1fr !important; }
          .v22-stack-grid > div:last-child { grid-column: span 1 !important; }
        }
      `}</style>
    </motion.div>
  );
}
