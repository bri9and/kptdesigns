"use client";

/**
 * chrome.tsx — small shared primitives used by every section:
 * - PALETTE constants
 * - <ChromeText>          chrome-clipped text with animated sweep
 * - <ChromePanel>         backdrop scrim panel for legibility over the shader
 * - <RisingLine>          word-by-word rise + reflection sweep
 * - <ChromeChip>          chrome pill / hairline-bordered chip
 * - <ChromeHairline>      decorative hairline divider
 * - common motion presets
 */

import { motion, type HTMLMotionProps, type Variants } from "framer-motion";
import type { ReactNode, CSSProperties } from "react";

export const PALETTE = {
  void: "#020306",
  shadow: "#1A1F2A",
  mid: "#5A6878",
  hi: "#C8D4E0",
  mirror: "#EAF1FA",
  blue: "#3D8BFF",
  cyan: "#00E5FF",
  warm: "#FFD7B5",
};

export const EASE_LIQUID = [0.16, 1, 0.3, 1] as const;

export const riseUp: Variants = {
  hidden: { opacity: 0, y: 36, filter: "blur(12px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 1.6, ease: EASE_LIQUID },
  },
};

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

export const staggerSlow: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.14, delayChildren: 0.05 } },
};

/* -------------------------------------------------------------------------- */

export function ChromeText({
  children,
  className,
  style,
  size = 96,
  weight = 900,
  tracking = "-0.04em",
  italic = false,
  sweepDelay = 0,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  size?: number | string;
  weight?: number;
  tracking?: string;
  italic?: boolean;
  sweepDelay?: number;
}) {
  return (
    <span
      className={`v22-chrome-text ${className ?? ""}`}
      style={{
        fontFamily: "var(--v22-display), system-ui",
        fontWeight: weight,
        fontStyle: italic ? "italic" : "normal",
        fontSize: typeof size === "number" ? `${size}px` : size,
        letterSpacing: tracking,
        lineHeight: 0.92,
        display: "inline-block",
        backgroundImage: `linear-gradient(110deg,
          ${PALETTE.hi}  0%,
          ${PALETTE.mirror} 18%,
          ${PALETTE.mid} 38%,
          ${PALETTE.mirror} 55%,
          ${PALETTE.hi}  72%,
          ${PALETTE.warm} 86%,
          ${PALETTE.hi}  100%)`,
        backgroundSize: "260% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        WebkitTextStroke: `0.5px ${PALETTE.mid}30`,
        animation: `v22-sweep 7s ${EASE_LIQUID.join(",")} ${sweepDelay}s infinite`,
        textShadow: `0 1px 0 ${PALETTE.mid}30, 0 -1px 0 ${PALETTE.mirror}25`,
        ...style,
      }}
    >
      {children}
      <style>{`
        @keyframes v22-sweep {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </span>
  );
}

/* -------------------------------------------------------------------------- */

export function ChromePanel({
  children,
  className,
  style,
  ...rest
}: HTMLMotionProps<"div"> & { children: ReactNode; style?: CSSProperties; className?: string }) {
  return (
    <motion.div
      className={`v22-panel ${className ?? ""}`}
      style={{
        background:
          `linear-gradient(180deg, rgba(2,3,6,0.55) 0%, rgba(26,31,42,0.45) 100%)`,
        border: `1px solid ${PALETTE.hi}1a`,
        boxShadow:
          `inset 0 1px 0 ${PALETTE.mirror}10,
           inset 0 -1px 0 ${PALETTE.shadow}aa,
           0 24px 60px -20px rgba(2,3,6,0.85),
           0 0 0 1px ${PALETTE.shadow}55`,
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        borderRadius: 4,
        ...style,
      }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

/* -------------------------------------------------------------------------- */

export function ChromeChip({
  children,
  active = false,
  pulse = false,
  style,
}: {
  children: ReactNode;
  active?: boolean;
  pulse?: boolean;
  style?: CSSProperties;
}) {
  return (
    <span
      className={pulse ? "v22-chip-pulse" : ""}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        padding: "8px 14px",
        fontFamily: "var(--v22-mono), monospace",
        fontSize: 11,
        letterSpacing: "0.22em",
        textTransform: "uppercase",
        color: active ? PALETTE.mirror : PALETTE.hi,
        background: active
          ? `linear-gradient(180deg, ${PALETTE.mid}40 0%, ${PALETTE.shadow}80 100%)`
          : `linear-gradient(180deg, ${PALETTE.shadow}80 0%, ${PALETTE.void}cc 100%)`,
        border: `1px solid ${active ? PALETTE.blue : `${PALETTE.hi}33`}`,
        borderRadius: 999,
        boxShadow: active
          ? `0 0 0 3px ${PALETTE.blue}22, inset 0 1px 0 ${PALETTE.mirror}30, 0 6px 16px -8px ${PALETTE.blue}cc`
          : `inset 0 1px 0 ${PALETTE.mirror}15`,
        whiteSpace: "nowrap",
        ...style,
      }}
    >
      {children}
      <style>{`
        @keyframes v22-pulse {
          0%, 100% { box-shadow: 0 0 0 0 ${PALETTE.cyan}55, inset 0 1px 0 ${PALETTE.mirror}30; }
          50%      { box-shadow: 0 0 0 5px ${PALETTE.cyan}10, 0 0 18px ${PALETTE.cyan}66, inset 0 1px 0 ${PALETTE.mirror}45; }
        }
        .v22-chip-pulse { animation: v22-pulse 2.6s ${EASE_LIQUID.join(",")} infinite; }
      `}</style>
    </span>
  );
}

/* -------------------------------------------------------------------------- */

export function ChromeHairline({ width = 60, style }: { width?: number | string; style?: CSSProperties }) {
  return (
    <div
      style={{
        width,
        height: 1,
        background: `linear-gradient(90deg, transparent 0%, ${PALETTE.hi}aa 50%, transparent 100%)`,
        ...style,
      }}
    />
  );
}

/* -------------------------------------------------------------------------- */
/* Section wrapper that gives content a chrome scrim + max-width frame        */

export function SectionFrame({
  children,
  width = 1180,
  align = "left",
  style,
}: {
  children: ReactNode;
  width?: number | string;
  align?: "left" | "center";
  style?: CSSProperties;
}) {
  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        maxWidth: width,
        margin: "0 auto",
        textAlign: align,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/* Tiny mono kicker label                                                     */

export function MonoKicker({
  children, color, style,
}: { children: ReactNode; color?: string; style?: CSSProperties }) {
  return (
    <span
      style={{
        fontFamily: "var(--v22-mono), monospace",
        fontSize: 11,
        letterSpacing: "0.32em",
        color: color ?? PALETTE.blue,
        textTransform: "uppercase",
        ...style,
      }}
    >
      {children}
    </span>
  );
}
