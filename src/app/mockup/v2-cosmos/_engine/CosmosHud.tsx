"use client";

/**
 * CosmosHud — fixed-position chrome for the V2 Cosmos snap-to-station engine.
 * Mirrors the V5 Tunnel HUD architecture but recolored for the Cosmos palette
 * (plasma-violet + nebula-pink + solar-amber over deep void).
 *
 * - ProgressBar : top-of-viewport scroll-progress bar (violet → pink gradient)
 * - SectionPill : top-center pill showing § number / label
 * - ScrollDots  : right-side dot navigation w/ click + hover label
 * - CornerHud   : ambient corner brackets + bottom hint
 * - skipLinkStyle : a11y skip-to-content link styling
 */

import { motion, useTransform, type MotionValue } from "framer-motion";

const PALETTE = {
  void: "#02030A",
  navy: "#0A0E27",
  violet: "#7B5BFF",
  pink: "#FF6BC1",
  amber: "#FF8000",
  star: "#F8F8FF",
  grey: "#9BA3C7",
};

export type CheckpointDef = {
  id: string;
  num: string;
  label: string;
  longLabel: string;
};

export const skipLinkStyle: React.CSSProperties = {
  position: "absolute",
  left: -9999,
  top: 8,
  zIndex: 100,
  background: PALETTE.violet,
  color: PALETTE.star,
  padding: "8px 14px",
  fontFamily: "var(--v2-mono), monospace",
  fontSize: 11,
  letterSpacing: "0.24em",
  textTransform: "uppercase",
  textDecoration: "none",
  fontWeight: 600,
};

export function ProgressBar({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: 2,
        zIndex: 60,
        background: `${PALETTE.violet}1f`,
        pointerEvents: "none",
      }}
    >
      <motion.div
        style={{
          height: "100%",
          background: `linear-gradient(90deg, ${PALETTE.violet} 0%, ${PALETTE.pink} 60%, ${PALETTE.amber} 100%)`,
          transformOrigin: "left",
          scaleX,
          boxShadow: `0 0 14px ${PALETTE.violet}aa`,
        }}
      />
    </div>
  );
}

export function SectionPill({
  scrollYProgress,
  activeIndex,
  checkpoints,
}: {
  scrollYProgress: MotionValue<number>;
  activeIndex: number;
  checkpoints: CheckpointDef[];
}) {
  const opacity = useTransform(scrollYProgress, [0, 0.02, 1], [0.85, 1, 1]);
  const cp = checkpoints[activeIndex] ?? checkpoints[0];
  return (
    <motion.div
      aria-live="polite"
      style={{
        position: "fixed",
        top: 14,
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 55,
        padding: "8px 16px",
        border: `1px solid ${PALETTE.violet}55`,
        background: "rgba(2,3,10,0.78)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        fontFamily: "var(--v2-mono), monospace",
        fontSize: 11,
        letterSpacing: "0.28em",
        color: PALETTE.violet,
        textTransform: "uppercase",
        opacity,
        boxShadow: `inset 0 0 0 1px ${PALETTE.violet}22, 0 0 26px ${PALETTE.violet}33`,
        pointerEvents: "none",
        whiteSpace: "nowrap",
        maxWidth: "min(640px, 92vw)",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      § <span style={{ color: PALETTE.star }}>{cp.num}</span> / {cp.label}{" "}
      <span style={{ color: `${PALETTE.violet}55` }}>·</span>{" "}
      <span style={{ color: PALETTE.amber }}>{cp.longLabel}</span>
    </motion.div>
  );
}

export function ScrollDots({
  activeIndex,
  onJump,
  checkpoints,
  settledIndex = null,
}: {
  activeIndex: number;
  onJump: (i: number) => void;
  checkpoints: CheckpointDef[];
  settledIndex?: number | null;
}) {
  return (
    <nav
      aria-label="Cosmos checkpoints"
      style={{
        position: "fixed",
        right: 20,
        top: "50%",
        transform: "translateY(-50%)",
        zIndex: 55,
        display: "flex",
        flexDirection: "column",
        gap: 14,
      }}
    >
      {checkpoints.map((cp, i) => {
        const active = i === activeIndex;
        const settled = i === settledIndex;
        return (
          <button
            key={cp.id}
            type="button"
            onClick={() => onJump(i)}
            aria-label={`Skip to ${cp.label} section`}
            aria-current={active ? "true" : undefined}
            className={`kpt-cdot${settled ? " kpt-cdot--settled" : ""}`}
            style={{
              all: "unset",
              cursor: "pointer",
              width: 10,
              height: 10,
              borderRadius: 999,
              border: `1px solid ${active ? PALETTE.violet : `${PALETTE.violet}55`}`,
              background: active ? PALETTE.violet : "transparent",
              boxShadow: active
                ? `0 0 10px ${PALETTE.violet}, 0 0 22px ${PALETTE.pink}66`
                : "none",
              position: "relative",
              transition: "background 280ms, border-color 280ms, box-shadow 280ms",
              outline: "none",
            }}
          >
            <span
              className="kpt-cdot-label"
              style={{
                position: "absolute",
                right: 18,
                top: "50%",
                transform: "translateY(-50%)",
                padding: "5px 10px",
                background: "rgba(2,3,10,0.92)",
                border: `1px solid ${PALETTE.violet}55`,
                fontFamily: "var(--v2-mono), monospace",
                fontSize: 10,
                letterSpacing: "0.24em",
                color: PALETTE.violet,
                textTransform: "uppercase",
                whiteSpace: "nowrap",
                opacity: 0,
                pointerEvents: "none",
                transition: "opacity 240ms",
              }}
            >
              {cp.num} / {cp.label}
            </span>
          </button>
        );
      })}
      <style>{`
        .kpt-cdot:hover .kpt-cdot-label, .kpt-cdot:focus-visible .kpt-cdot-label { opacity: 1; }
        .kpt-cdot:focus-visible { box-shadow: 0 0 0 3px ${PALETTE.violet}55, 0 0 14px ${PALETTE.pink}; }
        .kpt-cdot--settled::after {
          content: "";
          position: absolute;
          inset: -6px;
          border-radius: 999px;
          border: 1px solid ${PALETTE.violet}88;
          animation: kpt-cdot-pulse 1.8s ease-out infinite;
          pointer-events: none;
        }
        @keyframes kpt-cdot-pulse {
          0%   { transform: scale(0.6); opacity: 0.9; }
          80%  { transform: scale(1.4); opacity: 0;   }
          100% { transform: scale(1.4); opacity: 0;   }
        }
        @media (prefers-reduced-motion: reduce) {
          .kpt-cdot--settled::after { animation: none; opacity: 0.5; }
        }
      `}</style>
    </nav>
  );
}

export function CornerHud() {
  const positions: Array<{ top?: number; bottom?: number; left?: number; right?: number }> = [
    { top: 26, left: 14 },
    { top: 26, right: 14 },
    { bottom: 18, left: 14 },
    { bottom: 18, right: 14 },
  ];
  return (
    <>
      {positions.map((pos, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            position: "fixed",
            zIndex: 50,
            width: 14,
            height: 14,
            borderTop: pos.top !== undefined ? `1px solid ${PALETTE.violet}66` : "none",
            borderBottom: pos.bottom !== undefined ? `1px solid ${PALETTE.violet}66` : "none",
            borderLeft: pos.left !== undefined ? `1px solid ${PALETTE.violet}66` : "none",
            borderRight: pos.right !== undefined ? `1px solid ${PALETTE.violet}66` : "none",
            ...pos,
            pointerEvents: "none",
          }}
        />
      ))}
      <div
        aria-hidden
        style={{
          position: "fixed",
          bottom: 14,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 50,
          fontFamily: "var(--v2-mono), monospace",
          fontSize: 9,
          letterSpacing: "0.36em",
          color: `${PALETTE.violet}88`,
          textTransform: "uppercase",
          pointerEvents: "none",
          whiteSpace: "nowrap",
        }}
      >
        SCROLL · ARROW KEYS · DOTS → ADVANCE
      </div>
    </>
  );
}
