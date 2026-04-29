"use client";

/**
 * CosmosFallbacks — non-desktop / reduced-motion fallbacks for V2 Cosmos.
 *
 * - MobileFallback        : <768px viewport, normal vertical page (no engine)
 * - ReducedMotionFallback : prefers-reduced-motion, frozen static backdrop
 *
 * Mirrors the v5-tunnel fallback architecture. The CHECKPOINTS array is the
 * single source of truth for what sections exist and their HUD metadata; both
 * the desktop engine and these fallbacks consume it.
 */

import { useEffect } from "react";
import { useLenis } from "lenis/react";

import HeroCosmos from "../_sections/HeroCosmos";
import PhilosophyCosmos from "../_sections/PhilosophyCosmos";
import StackCosmos from "../_sections/StackCosmos";
import PortfolioCosmos from "../_sections/PortfolioCosmos";
import ProcessCosmos from "../_sections/ProcessCosmos";
import CtaCosmos from "../_sections/CtaCosmos";

import { skipLinkStyle, type CheckpointDef as HudCheckpointDef } from "./CosmosHud";

export const PALETTE = {
  void: "#02030A",
  navy: "#0A0E27",
  violet: "#7B5BFF",
  pink: "#FF6BC1",
  amber: "#FF8000",
  star: "#F8F8FF",
  grey: "#9BA3C7",
};

type CheckpointDef = HudCheckpointDef & { Component: React.ComponentType };

export const CHECKPOINTS: CheckpointDef[] = [
  { id: "hero",       num: "01", label: "ENTRY",       longLabel: "ENTRY · CARTOGRAPHY ONLINE",  Component: HeroCosmos },
  { id: "philosophy", num: "02", label: "PHILOSOPHY",  longLabel: "DOCTRINE · OWNED OUTRIGHT",   Component: PhilosophyCosmos },
  { id: "stack",      num: "03", label: "STACK",       longLabel: "STACK · INSTRUMENTS ONLINE",  Component: StackCosmos },
  { id: "portfolio",  num: "04", label: "ARCHIVE",     longLabel: "ARCHIVE · OBSERVED SPECIMENS", Component: PortfolioCosmos },
  { id: "process",    num: "05", label: "PROCESS",     longLabel: "PROCESS · PATH OF FOUR",      Component: ProcessCosmos },
  { id: "cta",        num: "06", label: "TRANSMIT",    longLabel: "TRANSMIT · OPEN CHANNEL",     Component: CtaCosmos },
];

/**
 * CosmicBackdrop — fixed (or absolutely-positioned) ambient void layer.
 *
 * Used by the desktop engine as the static "Option B" forward-flight ambience
 * AND by the mobile / reduced-motion fallbacks. Render-once, no animation.
 *
 *   anchor="absolute"  → fits inside a `position:relative/fixed` parent (engine)
 *   anchor="fixed"     → pins to viewport (mobile / reduced-motion)
 *   vignette           → adds an inner radial darkening (engine only)
 */
export function CosmicBackdrop({
  anchor = "fixed",
  vignette = false,
}: {
  anchor?: "fixed" | "absolute";
  vignette?: boolean;
}) {
  const base: React.CSSProperties = { position: anchor, inset: 0, zIndex: 0, pointerEvents: "none" };
  return (
    <>
      <div aria-hidden style={{ ...base, background: PALETTE.void }} />
      <div
        aria-hidden
        style={{
          ...base,
          background: `
            radial-gradient(ellipse 70% 50% at 50% 30%, rgba(123,91,255,0.18) 0%, transparent 60%),
            radial-gradient(ellipse 80% 60% at 50% 80%, rgba(255,107,193,0.10) 0%, transparent 70%),
            radial-gradient(circle at 12% 18%, rgba(255,128,0,0.08) 0%, transparent 30%)
          `,
        }}
      />
      <div
        aria-hidden
        style={{
          ...base,
          backgroundImage: `linear-gradient(${PALETTE.violet}1a 1px, transparent 1px), linear-gradient(90deg, ${PALETTE.violet}1a 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 50%, #000 30%, transparent 80%)",
          WebkitMaskImage: "radial-gradient(ellipse 90% 70% at 50% 50%, #000 30%, transparent 80%)",
          opacity: anchor === "absolute" ? 0.32 : 0.35,
        }}
      />
      {vignette ? (
        <div
          aria-hidden
          style={{
            ...base,
            background: "radial-gradient(ellipse at center, rgba(2,3,10,0) 40%, rgba(2,3,10,0.85) 100%)",
          }}
        />
      ) : null}
      <div
        aria-hidden
        style={{
          ...base,
          mixBlendMode: "soft-light",
          opacity: 0.06,
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
        }}
      />
    </>
  );
}

export function MobileFallback({ fontVars }: { fontVars: string }) {
  return (
    <div
      className={fontVars}
      style={{
        background: PALETTE.void,
        color: PALETTE.star,
        minHeight: "100vh",
        fontFamily: "var(--v2-display), system-ui",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <CosmicBackdrop anchor="fixed" />
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "12px 16px",
          background: "rgba(2,3,10,0.92)",
          borderBottom: `1px solid ${PALETTE.violet}30`,
          fontFamily: "var(--v2-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.18em",
          color: PALETTE.violet,
          display: "flex",
          justifyContent: "space-between",
          textTransform: "uppercase",
        }}
      >
        <span>KPT // COSMOS · MOBILE</span>
        <span style={{ color: PALETTE.amber }}>SECTOR · 07</span>
      </header>
      <a href="#mobile-main" className="kpt-skip" style={skipLinkStyle}>Skip to content</a>
      <main id="mobile-main" style={{ position: "relative", zIndex: 1 }}>
        {CHECKPOINTS.map((cp, i) => (
          <section
            key={cp.id}
            id={cp.id}
            aria-label={cp.label}
            style={{ padding: "60px 16px", borderTop: i > 0 ? `1px dashed ${PALETTE.violet}24` : "none" }}
          >
            <div
              style={{
                fontFamily: "var(--v2-mono), monospace",
                fontSize: 10,
                letterSpacing: "0.28em",
                color: PALETTE.amber,
                marginBottom: 14,
                textTransform: "uppercase",
              }}
            >
              §{cp.num} / {cp.label}
            </div>
            <cp.Component />
          </section>
        ))}
      </main>
    </div>
  );
}

export function ReducedMotionFallback({ fontVars }: { fontVars: string }) {
  const lenis = useLenis();
  useEffect(() => {
    if (lenis && typeof lenis.destroy === "function") lenis.destroy();
  }, [lenis]);
  return (
    <div
      className={fontVars}
      style={{
        background: PALETTE.void,
        color: PALETTE.star,
        minHeight: "100vh",
        position: "relative",
        fontFamily: "var(--v2-display), system-ui",
      }}
    >
      <CosmicBackdrop anchor="fixed" />
      <a href="#rm-main" style={skipLinkStyle} className="kpt-skip">Skip to content</a>
      <main id="rm-main" style={{ position: "relative", zIndex: 1 }}>
        {CHECKPOINTS.map((cp, i) => (
          <section
            key={cp.id}
            id={cp.id}
            aria-label={cp.label}
            style={{ padding: "100px 16px", borderTop: i > 0 ? `1px dashed ${PALETTE.violet}24` : "none" }}
          >
            <div
              style={{
                fontFamily: "var(--v2-mono), monospace",
                fontSize: 10,
                letterSpacing: "0.32em",
                color: PALETTE.amber,
                textAlign: "center",
                marginBottom: 24,
                textTransform: "uppercase",
              }}
            >
              §{cp.num} / {cp.label}
            </div>
            <cp.Component />
          </section>
        ))}
      </main>
    </div>
  );
}
