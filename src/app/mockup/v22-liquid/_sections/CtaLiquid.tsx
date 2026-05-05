"use client";

/**
 * CtaLiquid — V22 §08 DELIVERY
 *
 * Headline: "Forge it." Two buttons:
 * "Get Started" → /start (chrome filled)
 * "View Pricing" → /pricing (ghost chrome border)
 */

import Link from "next/link";
import { motion } from "framer-motion";
import {
  ChromeText, ChromeHairline, MonoKicker,
  PALETTE, riseUp, stagger, EASE_LIQUID,
} from "../_engine/chrome";

export default function CtaLiquid() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
      variants={stagger}
      style={{
        position: "relative",
        width: "100%",
        maxWidth: 1080,
        margin: "0 auto",
        textAlign: "center",
      }}
    >
      <motion.div variants={riseUp} style={{ marginBottom: 18 }}>
        <MonoKicker color={PALETTE.cyan}>§ 08 / DELIVERY · INGOT READY</MonoKicker>
      </motion.div>

      <motion.h2
        variants={riseUp}
        style={{ margin: 0, lineHeight: 0.86 }}
      >
        <ChromeText size="clamp(80px, 13vw, 200px)" weight={900} tracking="-0.05em" style={{ display: "block" }}>
          Forge it.
        </ChromeText>
      </motion.h2>

      <motion.p
        variants={riseUp}
        style={{
          marginTop: 28,
          fontFamily: "var(--v22-display), system-ui",
          fontWeight: 200,
          fontStyle: "italic",
          fontSize: "clamp(16px, 1.7vw, 22px)",
          color: PALETTE.hi,
          lineHeight: 1.55,
          maxWidth: 680,
          marginLeft: "auto",
          marginRight: "auto",
        }}
      >
        Your competitors already have modern websites. Let&apos;s make sure
        yours{" "}
        <span style={{ color: PALETTE.mirror, fontStyle: "normal", fontWeight: 600 }}>
          reflects better.
        </span>{" "}
        No commitment — just a conversation.
      </motion.p>

      <motion.div variants={riseUp} style={{ display: "flex", justifyContent: "center", marginTop: 32 }}>
        <ChromeHairline width={140} />
      </motion.div>

      <motion.div
        variants={riseUp}
        style={{
          marginTop: 44,
          display: "flex",
          gap: 16,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <Link
          href="/start"
          className="v22-btn-primary"
          style={{
            position: "relative",
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 30px",
            fontFamily: "var(--v22-mono), monospace",
            fontSize: 12,
            fontWeight: 600,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: PALETTE.void,
            background: `linear-gradient(180deg, ${PALETTE.mirror} 0%, ${PALETTE.hi} 50%, ${PALETTE.mid} 100%)`,
            border: `1px solid ${PALETTE.blue}`,
            borderRadius: 4,
            textDecoration: "none",
            boxShadow: `
              inset 0 1px 0 ${PALETTE.mirror},
              inset 0 -2px 4px ${PALETTE.shadow}88,
              0 8px 22px -6px ${PALETTE.blue}88,
              0 0 0 3px ${PALETTE.blue}22
            `,
            transition: "all 600ms cubic-bezier(0.16,1,0.3,1)",
            overflow: "hidden",
          }}
        >
          <span style={{ position: "relative", zIndex: 2 }}>Get Started</span>
          <span aria-hidden style={{ position: "relative", zIndex: 2, fontSize: 14 }}>→</span>
          {/* sweep highlight */}
          <span
            aria-hidden
            className="v22-btn-shine"
            style={{
              position: "absolute",
              inset: 0,
              background: `linear-gradient(115deg, transparent 30%, ${PALETTE.mirror}aa 50%, transparent 70%)`,
              transform: "translateX(-100%)",
              transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1)",
              pointerEvents: "none",
            }}
          />
        </Link>

        <Link
          href="/pricing"
          className="v22-btn-ghost"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 12,
            padding: "16px 30px",
            fontFamily: "var(--v22-mono), monospace",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: PALETTE.hi,
            background: "rgba(2,3,6,0.55)",
            border: `1px solid ${PALETTE.hi}55`,
            borderRadius: 4,
            textDecoration: "none",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            transition: "all 480ms cubic-bezier(0.16,1,0.3,1)",
            boxShadow: `inset 0 1px 0 ${PALETTE.mirror}10`,
          }}
        >
          <span>View Pricing</span>
        </Link>
      </motion.div>

      <motion.div
        variants={riseUp}
        style={{
          marginTop: 60,
          display: "inline-flex",
          gap: 28,
          flexWrap: "wrap",
          justifyContent: "center",
          fontFamily: "var(--v22-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.32em",
          color: PALETTE.mid,
          textTransform: "uppercase",
        }}
      >
        <span>EST. 2004</span>
        <span style={{ color: `${PALETTE.hi}33` }}>·</span>
        <span>PITTSBURGH + PHOENIX</span>
        <span style={{ color: `${PALETTE.hi}33` }}>·</span>
        <span>OWNED OUTRIGHT</span>
      </motion.div>

      <style>{`
        .v22-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow:
            inset 0 1px 0 ${PALETTE.mirror},
            inset 0 -2px 4px ${PALETTE.shadow}88,
            0 14px 36px -8px ${PALETTE.blue},
            0 0 0 4px ${PALETTE.blue}33,
            0 0 28px ${PALETTE.blue}66;
        }
        .v22-btn-primary:hover .v22-btn-shine { transform: translateX(100%); }
        .v22-btn-primary:focus-visible { outline: 3px solid ${PALETTE.cyan}; outline-offset: 3px; }
        .v22-btn-ghost:hover {
          color: ${PALETTE.mirror};
          border-color: ${PALETTE.cyan};
          box-shadow: 0 0 0 2px ${PALETTE.cyan}33, inset 0 1px 0 ${PALETTE.mirror}20;
          transform: translateY(-2px);
        }
        .v22-btn-ghost:focus-visible { outline: 2px solid ${PALETTE.blue}; outline-offset: 3px; }

        @keyframes v22-cta-pulse {
          0%, 100% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}</style>
    </motion.div>
  );
}
