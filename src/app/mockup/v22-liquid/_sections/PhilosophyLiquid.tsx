"use client";

/**
 * PhilosophyLiquid — V22 §02 DOCTRINE
 *
 * Heavy/light Inter contrast — "No templates. No shortcuts." pull-quote in
 * Inter 200 italic. Companion paragraph in mid-tone chrome.
 */

import { motion } from "framer-motion";
import {
  ChromeText, ChromePanel, ChromeHairline, MonoKicker,
  PALETTE, riseUp, stagger,
} from "../_engine/chrome";

export default function PhilosophyLiquid() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.4 }}
      variants={stagger}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 1180,
        margin: "0 auto",
      }}
    >
      <motion.div variants={riseUp} style={{ marginBottom: 18 }}>
        <MonoKicker>§ 02 / DOCTRINE</MonoKicker>
      </motion.div>

      <motion.h2
        variants={riseUp}
        style={{
          margin: 0,
          lineHeight: 0.95,
          maxWidth: 1100,
        }}
      >
        <ChromeText
          size="clamp(48px, 7.4vw, 110px)"
          weight={900}
          tracking="-0.04em"
          style={{ display: "inline" }}
        >
          No templates.{" "}
        </ChromeText>
        <ChromeText
          size="clamp(48px, 7.4vw, 110px)"
          weight={200}
          tracking="-0.02em"
          italic
          sweepDelay={0.4}
          style={{ display: "inline" }}
        >
          No shortcuts.
        </ChromeText>
      </motion.h2>

      <motion.div variants={riseUp} style={{ marginTop: 28 }}>
        <ChromeHairline width={140} />
      </motion.div>

      <div
        style={{
          marginTop: 56,
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 56,
          alignItems: "start",
        }}
        className="v22-philos-grid"
      >
        <motion.div variants={riseUp}>
          <p
            style={{
              fontFamily: "var(--v22-display), system-ui",
              fontWeight: 300,
              fontSize: "clamp(16px, 1.5vw, 19px)",
              color: PALETTE.hi,
              lineHeight: 1.75,
              maxWidth: 540,
              margin: 0,
            }}
          >
            We forge modern, lightning-fast websites that actually convert
            visitors into customers. Every site is{" "}
            <strong style={{ color: PALETTE.mirror, fontWeight: 600 }}>
              hand-coded from scratch
            </strong>
            {" "}— no templates, no page builders, no WordPress.
            <br /><br />
            You get the complete source code. No lock-in. No proprietary platforms.{" "}
            <strong style={{ color: PALETTE.mirror, fontWeight: 600 }}>
              Your website. Your code. Forever.
            </strong>
          </p>
        </motion.div>

        <motion.div variants={riseUp}>
          <ChromePanel
            style={{
              padding: "32px 36px",
              borderLeft: `2px solid ${PALETTE.blue}`,
              borderRadius: "2px 6px 6px 2px",
            }}
          >
            <blockquote
              style={{
                margin: 0,
                fontFamily: "var(--v22-display), system-ui",
                fontStyle: "italic",
                fontWeight: 200,
                fontSize: "clamp(18px, 1.7vw, 22px)",
                lineHeight: 1.55,
                color: PALETTE.mirror,
              }}
            >
              &ldquo;The metal arrives unmarked. We pour it into a mold of your
              business. Polish until it reflects you, then{" "}
              <span style={{ color: PALETTE.cyan, fontStyle: "normal", fontWeight: 600 }}>
                hand it over
              </span>
              {" "}— ingot, hallmark, and source code.&rdquo;
            </blockquote>
            <cite
              style={{
                display: "block",
                marginTop: 22,
                fontFamily: "var(--v22-mono), monospace",
                fontStyle: "normal",
                fontSize: 10,
                letterSpacing: "0.32em",
                color: PALETTE.blue,
                textTransform: "uppercase",
              }}
            >
              — KPT Foundry · Doctrine 01
            </cite>
          </ChromePanel>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .v22-philos-grid {
            grid-template-columns: 1fr !important;
            gap: 28px !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
