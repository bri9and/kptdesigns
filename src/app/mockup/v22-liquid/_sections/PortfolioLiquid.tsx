"use client";

/**
 * PortfolioLiquid — V22 §05 ARCHIVE
 *
 * 6 entries from @/lib/portfolio. Each as a "polished plate" — image with
 * a chrome-frame treatment (multi-stop CSS box-shadow). Hover lifts and
 * rotates slightly toward the viewer.
 */

import { motion } from "framer-motion";
import { portfolio } from "@/lib/portfolio";
import {
  ChromeText, ChromePanel, ChromeHairline, MonoKicker,
  PALETTE, riseUp, stagger,
} from "../_engine/chrome";

const PICKED = portfolio.slice(0, 6);

export default function PortfolioLiquid() {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.2 }}
      variants={stagger}
      style={{ position: "relative", width: "100%", maxWidth: 1280, margin: "0 auto" }}
    >
      <motion.div variants={riseUp} style={{ marginBottom: 18 }}>
        <MonoKicker>§ 05 / ARCHIVE · 6 OF MANY</MonoKicker>
      </motion.div>

      <motion.h2 variants={riseUp} style={{ margin: 0, lineHeight: 0.95 }}>
        <ChromeText size="clamp(40px, 6vw, 88px)" weight={900} tracking="-0.04em" style={{ display: "inline" }}>
          Polished
        </ChromeText>{" "}
        <ChromeText size="clamp(40px, 6vw, 88px)" weight={200} italic tracking="-0.02em" sweepDelay={0.5} style={{ display: "inline" }}>
          plates.
        </ChromeText>
      </motion.h2>

      <motion.p
        variants={riseUp}
        style={{
          marginTop: 14,
          maxWidth: 580,
          fontFamily: "var(--v22-display), system-ui",
          fontWeight: 300,
          fontSize: "clamp(15px, 1.3vw, 17px)",
          color: PALETTE.hi,
          lineHeight: 1.7,
        }}
      >
        Real projects for real businesses. Every site hand-coded, mobile-responsive,
        and built to perform — owned outright by the client.
      </motion.p>

      <motion.div variants={riseUp} style={{ marginTop: 22, marginBottom: 28 }}>
        <ChromeHairline width={120} />
      </motion.div>

      <motion.div
        variants={stagger}
        className="v22-port-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 18,
        }}
      >
        {PICKED.map((p) => (
          <motion.a
            key={p.url}
            variants={riseUp}
            href={p.href ?? `https://${p.url}`}
            {...(p.href ? {} : { target: "_blank", rel: "noopener noreferrer" })}
            className="v22-plate"
            style={{ textDecoration: "none", display: "block" }}
          >
            <ChromePanel
              style={{
                padding: 0,
                overflow: "hidden",
                position: "relative",
                isolation: "isolate",
                boxShadow: `
                  inset 0 1px 0 ${PALETTE.mirror}22,
                  inset 0 -1px 0 ${PALETTE.shadow},
                  0 1px 0 ${PALETTE.shadow},
                  0 24px 48px -16px rgba(0,0,0,0.7),
                  0 0 0 1px ${PALETTE.hi}10
                `,
              }}
            >
              <div
                style={{
                  position: "relative",
                  height: 200,
                  borderBottom: `1px solid ${PALETTE.hi}1a`,
                  background: p.image
                    ? `url(${p.image}) center/cover`
                    : `linear-gradient(135deg, ${PALETTE.shadow}, ${PALETTE.mid}aa)`,
                  overflow: "hidden",
                }}
              >
                <div
                  aria-hidden
                  style={{
                    position: "absolute", inset: 0,
                    background: `linear-gradient(180deg, rgba(2,3,6,0.15) 0%, rgba(2,3,6,0.55) 100%)`,
                  }}
                />
                {/* chrome frame highlight */}
                <div
                  aria-hidden
                  style={{
                    position: "absolute", inset: 0,
                    boxShadow: `inset 0 1px 0 ${PALETTE.mirror}30, inset 0 -1px 0 ${PALETTE.shadow}cc`,
                    pointerEvents: "none",
                  }}
                />
                {p.logo && (
                  <img
                    src={p.logo}
                    alt={`${p.name} logo`}
                    style={{
                      position: "absolute",
                      top: "50%", left: "50%",
                      transform: "translate(-50%, -50%)",
                      maxHeight: 64, maxWidth: 140,
                      filter: "drop-shadow(0 6px 18px rgba(0,0,0,0.5))",
                      objectFit: "contain",
                    }}
                  />
                )}
                {/* corner ticks */}
                {[
                  { top: 6, left: 6 }, { top: 6, right: 6 },
                  { bottom: 6, left: 6 }, { bottom: 6, right: 6 },
                ].map((pos, i) => (
                  <span
                    key={i}
                    aria-hidden
                    style={{
                      position: "absolute", width: 8, height: 8,
                      borderTop: pos.top !== undefined ? `1px solid ${PALETTE.hi}aa` : "none",
                      borderBottom: pos.bottom !== undefined ? `1px solid ${PALETTE.hi}aa` : "none",
                      borderLeft: pos.left !== undefined ? `1px solid ${PALETTE.hi}aa` : "none",
                      borderRight: pos.right !== undefined ? `1px solid ${PALETTE.hi}aa` : "none",
                      ...pos,
                    }}
                  />
                ))}
              </div>
              <div style={{ padding: "16px 20px 18px" }}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginBottom: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--v22-mono), monospace",
                      fontSize: 9,
                      letterSpacing: "0.28em",
                      color: PALETTE.blue,
                      textTransform: "uppercase",
                      padding: "4px 8px",
                      border: `1px solid ${PALETTE.blue}33`,
                      borderRadius: 2,
                    }}
                  >
                    {p.category}
                  </span>
                  <span
                    aria-hidden
                    style={{
                      fontFamily: "var(--v22-mono), monospace",
                      fontSize: 9,
                      color: PALETTE.mid,
                      letterSpacing: "0.18em",
                    }}
                  >
                    →
                  </span>
                </div>
                <h3
                  style={{
                    margin: 0,
                    fontFamily: "var(--v22-display), system-ui",
                    fontWeight: 700,
                    fontSize: 17,
                    color: PALETTE.mirror,
                    letterSpacing: "-0.005em",
                  }}
                >
                  {p.name}
                </h3>
                <p
                  style={{
                    margin: "6px 0 0",
                    fontFamily: "var(--v22-display), system-ui",
                    fontWeight: 300,
                    fontSize: 13,
                    lineHeight: 1.55,
                    color: PALETTE.hi,
                  }}
                >
                  {p.desc}
                </p>
              </div>
            </ChromePanel>
          </motion.a>
        ))}
      </motion.div>

      <style>{`
        .v22-plate { transition: transform 700ms cubic-bezier(0.16,1,0.3,1); will-change: transform; transform: perspective(1200px); }
        .v22-plate:hover { transform: perspective(1200px) translateY(-6px) rotateX(2deg); }
        .v22-plate:focus-visible { outline: 2px solid ${PALETTE.blue}; outline-offset: 4px; }
        @media (max-width: 1100px) {
          .v22-port-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 640px) {
          .v22-port-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </motion.div>
  );
}
