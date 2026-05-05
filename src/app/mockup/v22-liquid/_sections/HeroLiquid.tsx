"use client";

/**
 * HeroLiquid — V22 §01 INGOT
 *
 * MASSIVE chrome wordmark "KPT DESIGNS" with animated chrome reflection sweep.
 * Below: ultra-thin Inter 200 italic line — riffing on the metal metaphor.
 * HUD chrome: "FORGED · 2004 · PITTSBURGH"
 * Services pill: "REGISTRAR · HOST · BUILDER · AGENTS"
 */

import { motion } from "framer-motion";
import {
  ChromeText, ChromePanel, ChromeChip, ChromeHairline, MonoKicker,
  PALETTE, EASE_LIQUID, riseUp, stagger,
} from "../_engine/chrome";

export default function HeroLiquid() {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={stagger}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 1280,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <h1
        className="kpt-sr-only"
        style={{
          position: "absolute", width: 1, height: 1,
          margin: -1, padding: 0, overflow: "hidden",
          clip: "rect(0,0,0,0)", whiteSpace: "nowrap", border: 0,
        }}
      >
        KPT Designs — Liquid Metal
      </h1>

      {/* top kicker */}
      <motion.div variants={riseUp} style={{ marginBottom: 22 }}>
        <MonoKicker color={PALETTE.blue}>
          <span style={{ color: PALETTE.hi }}>// </span>
          KPT DESIGNS
          <span style={{ color: PALETTE.hi }}> //</span>
          {" "}<span style={{ color: PALETTE.mid }}>· FORGED · 2004 · PITTSBURGH</span>
        </MonoKicker>
      </motion.div>

      {/* dual chrome wordmark */}
      <motion.div
        variants={riseUp}
        style={{
          margin: 0,
          lineHeight: 0.86,
          letterSpacing: "-0.045em",
          textAlign: "center",
        }}
        aria-hidden
      >
        <ChromeText
          size="clamp(96px, 16vw, 240px)"
          weight={900}
          tracking="-0.05em"
          style={{ display: "block" }}
        >
          KPT
        </ChromeText>
        <ChromeText
          size="clamp(48px, 9vw, 144px)"
          weight={200}
          tracking="0.02em"
          style={{ display: "block", marginTop: 4 }}
          sweepDelay={0.6}
        >
          DESIGNS
        </ChromeText>
      </motion.div>

      {/* whisper line */}
      <motion.p
        variants={riseUp}
        style={{
          marginTop: 40,
          fontFamily: "var(--v22-display), system-ui",
          fontWeight: 200,
          fontStyle: "italic",
          fontSize: "clamp(16px, 2.2vw, 26px)",
          color: PALETTE.hi,
          letterSpacing: "0.01em",
          lineHeight: 1.4,
          maxWidth: 720,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Cast in code. Polished by hand.{" "}
        <span style={{ color: PALETTE.mid }}>Handed off as a finished ingot.</span>
      </motion.p>

      <motion.div variants={riseUp} style={{ display: "flex", justifyContent: "center", marginTop: 26 }}>
        <ChromeHairline width={120} />
      </motion.div>

      {/* services pill */}
      <motion.div
        variants={riseUp}
        style={{
          marginTop: 36,
          display: "flex",
          justifyContent: "center",
        }}
      >
        <ChromePanel
          style={{
            display: "inline-flex",
            alignItems: "center",
            padding: "10px 18px",
            gap: 14,
            borderRadius: 999,
            border: `1px solid ${PALETTE.blue}55`,
          }}
        >
          {["REGISTRAR", "HOST", "BUILDER", "AGENTS"].map((label, i, arr) => (
            <span key={label} style={{ display: "inline-flex", alignItems: "center", gap: 14 }}>
              <span
                style={{
                  fontFamily: "var(--v22-mono), monospace",
                  fontSize: 11,
                  letterSpacing: "0.28em",
                  color: i === 3 ? PALETTE.cyan : PALETTE.mirror,
                  textTransform: "uppercase",
                  textShadow: i === 3 ? `0 0 12px ${PALETTE.cyan}aa` : "none",
                }}
              >
                {label}
              </span>
              {i < arr.length - 1 && (
                <span style={{ color: `${PALETTE.hi}55`, fontSize: 10 }}>·</span>
              )}
            </span>
          ))}
        </ChromePanel>
      </motion.div>

      {/* HUD readouts */}
      <motion.div
        variants={riseUp}
        style={{
          marginTop: 48,
          display: "flex",
          justifyContent: "center",
          gap: 14,
          flexWrap: "wrap",
        }}
      >
        {[
          { k: "SERIAL", v: "KPT-22-LIQ" },
          { k: "ALLOY",  v: "Ag·Hg / Mercury" },
          { k: "ORIGIN", v: "PIT + PHX" },
          { k: "GRADE",  v: "Owned Outright" },
        ].map((x) => (
          <ChromeChip key={x.k}>
            <span style={{ color: PALETTE.mid }}>{x.k}</span>
            <span style={{ color: `${PALETTE.hi}66` }}>·</span>
            <span style={{ color: PALETTE.mirror }}>{x.v}</span>
          </ChromeChip>
        ))}
      </motion.div>

      {/* scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1, ease: EASE_LIQUID }}
        style={{
          marginTop: 52,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 8,
        }}
        aria-hidden
      >
        <span
          style={{
            fontFamily: "var(--v22-mono), monospace",
            fontSize: 9,
            letterSpacing: "0.4em",
            color: `${PALETTE.hi}88`,
            textTransform: "uppercase",
          }}
        >
          DESCEND THROUGH THE METAL
        </span>
        <div
          style={{
            width: 1,
            height: 36,
            background: `linear-gradient(180deg, ${PALETTE.hi}aa, transparent)`,
          }}
        />
      </motion.div>
    </motion.div>
  );
}
