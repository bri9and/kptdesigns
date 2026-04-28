"use client";

/**
 * TunnelFallbacks — non-desktop / reduced-motion fallbacks for V5 Tunnel.
 *
 * - MobileFallback        : <768px viewport, no R3F, normal vertical page.
 * - ReducedMotionFallback : prefers-reduced-motion, frozen canvas backdrop.
 *
 * Extracted from TunnelEngine to keep that file focused on the snap-to-
 * station desktop experience and stay within line budget.
 */

import { useEffect } from "react";
import { Canvas } from "@react-three/fiber";
import { useLenis } from "lenis/react";

import HeroCheckpoint from "../_sections/HeroCheckpoint";
import PhilosophyCheckpoint from "../_sections/PhilosophyCheckpoint";
import StackCheckpoint from "../_sections/StackCheckpoint";
import TelemetryCheckpoint from "../_sections/TelemetryCheckpoint";
import PortfolioCheckpoint from "../_sections/PortfolioCheckpoint";
import ProcessCheckpoint from "../_sections/ProcessCheckpoint";
import FaqCheckpoint from "../_sections/FaqCheckpoint";
import FinaleCheckpoint from "../_sections/FinaleCheckpoint";

import {
  TunnelWalls,
  TunnelRings,
  BloomSprites,
  DriftingLights,
} from "./TunnelVisuals";
import { skipLinkStyle, type CheckpointDef as HudCheckpointDef } from "./TunnelHud";

export const PALETTE = {
  void: "#000812",
  cyan: "#00E5FF",
  white: "#E8F1FF",
  amber: "#FFB000",
  magenta: "#FF00AA",
};

type CheckpointDef = HudCheckpointDef & { Component: React.ComponentType };

export const CHECKPOINTS: CheckpointDef[] = [
  { id: "hero",       num: "01", label: "ENTRY",       longLabel: "ENTRY VECTOR LOCKED",       Component: HeroCheckpoint },
  { id: "philosophy", num: "02", label: "PHILOSOPHY",  longLabel: "DOCTRINE · OWNED OUTRIGHT", Component: PhilosophyCheckpoint },
  { id: "stack",      num: "03", label: "STACK",       longLabel: "STACK · INBOUND VECTOR",    Component: StackCheckpoint },
  { id: "telemetry",  num: "04", label: "TELEMETRY",   longLabel: "TELEMETRY · LIVE DATA",     Component: TelemetryCheckpoint },
  { id: "portfolio",  num: "05", label: "ARCHIVE",     longLabel: "ARCHIVE · 47 SPECIMENS",    Component: PortfolioCheckpoint },
  { id: "process",    num: "06", label: "PROCESS",     longLabel: "PROCESS · PATH OF FOUR",    Component: ProcessCheckpoint },
  { id: "faq",        num: "07", label: "FAQ",         longLabel: "KNOWN QUERIES · OPEN",      Component: FaqCheckpoint },
  { id: "finale",     num: "08", label: "TERMINUS",    longLabel: "TERMINUS · LAUNCH READY",   Component: FinaleCheckpoint },
];

export function MobileFallback({ fontVars }: { fontVars: string }) {
  return (
    <div
      className={fontVars}
      style={{
        background: PALETTE.void,
        color: PALETTE.white,
        minHeight: "100vh",
        fontFamily: "var(--v5-display), system-ui",
        position: "relative",
        overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          background: `
            radial-gradient(ellipse 60% 40% at 50% 30%, rgba(0,229,255,0.10) 0%, transparent 60%),
            radial-gradient(ellipse 80% 60% at 50% 80%, rgba(255,0,170,0.08) 0%, transparent 70%),
            ${PALETTE.void}
          `,
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: "fixed",
          inset: 0,
          backgroundImage: `linear-gradient(${PALETTE.cyan}1a 1px, transparent 1px), linear-gradient(90deg, ${PALETTE.cyan}1a 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage: "radial-gradient(ellipse 90% 70% at 50% 50%, #000 30%, transparent 80%)",
          opacity: 0.5,
          zIndex: 0,
          pointerEvents: "none",
        }}
      />
      <header
        style={{
          position: "sticky", top: 0, zIndex: 50,
          padding: "12px 16px",
          background: "rgba(0,8,18,0.92)",
          borderBottom: `1px solid ${PALETTE.cyan}30`,
          fontFamily: "var(--v5-mono), monospace",
          fontSize: 10, letterSpacing: "0.18em",
          color: PALETTE.cyan,
          display: "flex", justifyContent: "space-between",
          textTransform: "uppercase",
        }}
      >
        <span>KPT // TUNNEL · MOBILE</span>
        <span style={{ color: PALETTE.amber }}>EST. 2004</span>
      </header>
      <a href="#mobile-main" className="kpt-skip" style={skipLinkStyle}>Skip to content</a>
      <main id="mobile-main" style={{ position: "relative", zIndex: 1 }}>
        {CHECKPOINTS.map((cp, i) => (
          <section
            key={cp.id}
            id={cp.id}
            aria-label={cp.label}
            style={{ padding: "60px 16px", borderTop: i > 0 ? `1px dashed ${PALETTE.cyan}24` : "none" }}
          >
            <div
              style={{
                fontFamily: "var(--v5-mono), monospace",
                fontSize: 10, letterSpacing: "0.28em",
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
        color: PALETTE.white,
        minHeight: "100vh",
        position: "relative",
        fontFamily: "var(--v5-display), system-ui",
      }}
    >
      <div
        style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: PALETTE.void }}
        aria-hidden
      >
        <Canvas
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          dpr={[1, 2]}
          camera={{ position: [0, 0, 4], fov: 70, near: 0.1, far: 600 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <color attach="background" args={[PALETTE.void]} />
          <fog attach="fog" args={[PALETTE.void, 18, 90]} />
          <TunnelWalls frozen />
          <TunnelRings frozen />
          <BloomSprites frozen />
          <DriftingLights frozen />
        </Canvas>
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at center, rgba(0,8,18,0) 45%, rgba(0,8,18,0.85) 100%)",
          }}
        />
      </div>
      <a href="#rm-main" style={skipLinkStyle} className="kpt-skip">Skip to content</a>
      <main id="rm-main" style={{ position: "relative", zIndex: 1 }}>
        {CHECKPOINTS.map((cp, i) => (
          <section
            key={cp.id}
            id={cp.id}
            aria-label={cp.label}
            style={{ padding: "100px 16px", borderTop: i > 0 ? `1px dashed ${PALETTE.cyan}24` : "none" }}
          >
            <div
              style={{
                fontFamily: "var(--v5-mono), monospace",
                fontSize: 10, letterSpacing: "0.32em",
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
