"use client";

/**
 * TunnelHud — fixed-position chrome that lives on top of everything:
 * - ProgressBar : scroll-progress bar pinned to the top of the viewport
 * - SectionPill : top-center pill showing § number / label
 * - ScrollDots  : right-side dot navigation w/ click + hover label
 * - CornerHud   : ambient corner brackets + bottom hint
 * - SkipLink    : a11y skip-to-content link
 */

import { motion, useTransform, type MotionValue } from "framer-motion";

const PALETTE = {
  void: "#000812",
  cyan: "#00E5FF",
  white: "#E8F1FF",
  amber: "#FFB000",
  magenta: "#FF00AA",
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
  background: PALETTE.cyan,
  color: PALETTE.void,
  padding: "8px 14px",
  fontFamily: "var(--v5-mono), monospace",
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
        background: `${PALETTE.cyan}1a`,
        pointerEvents: "none",
      }}
    >
      <motion.div
        style={{
          height: "100%",
          background: `linear-gradient(90deg, ${PALETTE.cyan} 0%, ${PALETTE.magenta} 100%)`,
          transformOrigin: "left",
          scaleX,
          boxShadow: `0 0 12px ${PALETTE.cyan}aa`,
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
        border: `1px solid ${PALETTE.cyan}55`,
        background: "rgba(0,8,18,0.78)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        fontFamily: "var(--v5-mono), monospace",
        fontSize: 11,
        letterSpacing: "0.28em",
        color: PALETTE.cyan,
        textTransform: "uppercase",
        opacity,
        boxShadow: `inset 0 0 0 1px ${PALETTE.cyan}11, 0 0 24px ${PALETTE.cyan}22`,
        pointerEvents: "none",
        whiteSpace: "nowrap",
        maxWidth: "min(640px, 92vw)",
        overflow: "hidden",
        textOverflow: "ellipsis",
      }}
    >
      § <span style={{ color: PALETTE.white }}>{cp.num}</span> / {cp.label}{" "}
      <span style={{ color: `${PALETTE.cyan}55` }}>·</span>{" "}
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
      aria-label="Tunnel checkpoints"
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
            className={`kpt-dot${settled ? " kpt-dot--settled" : ""}`}
            style={{
              all: "unset",
              cursor: "pointer",
              width: 10,
              height: 10,
              borderRadius: 999,
              border: `1px solid ${active ? PALETTE.cyan : `${PALETTE.cyan}55`}`,
              background: active ? PALETTE.cyan : "transparent",
              boxShadow: active
                ? `0 0 10px ${PALETTE.cyan}, 0 0 22px ${PALETTE.cyan}66`
                : "none",
              position: "relative",
              transition: "background 280ms, border-color 280ms, box-shadow 280ms",
              outline: "none",
            }}
          >
            <span
              className="kpt-dot-label"
              style={{
                position: "absolute",
                right: 18,
                top: "50%",
                transform: "translateY(-50%)",
                padding: "5px 10px",
                background: "rgba(0,8,18,0.92)",
                border: `1px solid ${PALETTE.cyan}55`,
                fontFamily: "var(--v5-mono), monospace",
                fontSize: 10,
                letterSpacing: "0.24em",
                color: PALETTE.cyan,
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
        .kpt-dot:hover .kpt-dot-label, .kpt-dot:focus-visible .kpt-dot-label { opacity: 1; }
        .kpt-dot:focus-visible { box-shadow: 0 0 0 3px ${PALETTE.cyan}55, 0 0 12px ${PALETTE.cyan}; }
        .kpt-dot--settled::after {
          content: "";
          position: absolute;
          inset: -6px;
          border-radius: 999px;
          border: 1px solid ${PALETTE.cyan}88;
          animation: kpt-dot-pulse 1.8s ease-out infinite;
          pointer-events: none;
        }
        @keyframes kpt-dot-pulse {
          0%   { transform: scale(0.6); opacity: 0.9; }
          80%  { transform: scale(1.4); opacity: 0;   }
          100% { transform: scale(1.4); opacity: 0;   }
        }
        @media (prefers-reduced-motion: reduce) {
          .kpt-dot--settled::after { animation: none; opacity: 0.5; }
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
            borderTop: pos.top !== undefined ? `1px solid ${PALETTE.cyan}66` : "none",
            borderBottom: pos.bottom !== undefined ? `1px solid ${PALETTE.cyan}66` : "none",
            borderLeft: pos.left !== undefined ? `1px solid ${PALETTE.cyan}66` : "none",
            borderRight: pos.right !== undefined ? `1px solid ${PALETTE.cyan}66` : "none",
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
          fontFamily: "var(--v5-mono), monospace",
          fontSize: 9,
          letterSpacing: "0.36em",
          color: `${PALETTE.cyan}88`,
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
