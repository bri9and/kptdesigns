"use client";

/**
 * TunnelEngine — V5 Tunnel (scroll-IN, NOT scroll-down)
 *
 * Architecture:
 *   ┌───────────────────────────────────────────┐
 *   │ 100vh wrapper, overflow:hidden            │  ← single viewport (NO page scroll)
 *   │  ├─ fixed <Canvas>            (z 0)       │  ← cosmic tunnel BACKDROP
 *   │  ├─ overlay panel layer       (z 10)      │  ← 8 absolutely-positioned panels
 *   │  └─ fixed HUD chrome          (z 30+)     │  ← progress, dots, pill
 *   └───────────────────────────────────────────┘
 *
 * Wheel / touch / keyboard input is captured on the wrapper and converted to
 * a `progress` value (0..1) representing camera position through the tunnel.
 * The viewport NEVER scrolls vertically — the user is "flying" forward.
 *
 * Each of the 8 checkpoint panels lives at a station progress (0/8, 1/8, ...
 * 7/8). As progress approaches a station, that panel scales 0.78 → 1, fades
 * in, and is fully readable when at its station. As progress passes, the
 * panel scales to 1.18 and fades out — giving a "panel flew past me"
 * sensation that combines with the camera dolly behind it.
 *
 * - Mobile (<768px): R3F dropped, sections render as a normal vertical page.
 * - Reduced-motion : camera frozen, sections render as a normal stack.
 *
 * Scene primitives live in ./TunnelVisuals.
 * HUD chrome lives in ./TunnelHud.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import { JetBrains_Mono, Inter } from "next/font/google";
import {
  motionValue,
  useReducedMotion,
} from "framer-motion";
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
  CameraDolly,
} from "./TunnelVisuals";
import {
  ProgressBar,
  SectionPill,
  ScrollDots,
  CornerHud,
  skipLinkStyle,
  type CheckpointDef as HudCheckpointDef,
} from "./TunnelHud";

/* --------------------------------- fonts --------------------------------- */

const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--v5-mono",
});
const display = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
  variable: "--v5-display",
});

const PALETTE = {
  void: "#000812",
  cyan: "#00E5FF",
  white: "#E8F1FF",
  amber: "#FFB000",
  magenta: "#FF00AA",
};

/* checkpoint catalogue — drives sections, dots, pill */
type CheckpointDef = HudCheckpointDef & { Component: React.ComponentType };

const CHECKPOINTS: CheckpointDef[] = [
  { id: "hero",       num: "01", label: "ENTRY",       longLabel: "ENTRY VECTOR LOCKED",       Component: HeroCheckpoint },
  { id: "philosophy", num: "02", label: "PHILOSOPHY",  longLabel: "DOCTRINE · OWNED OUTRIGHT", Component: PhilosophyCheckpoint },
  { id: "stack",      num: "03", label: "STACK",       longLabel: "STACK · INBOUND VECTOR",    Component: StackCheckpoint },
  { id: "telemetry",  num: "04", label: "TELEMETRY",   longLabel: "TELEMETRY · LIVE DATA",     Component: TelemetryCheckpoint },
  { id: "portfolio",  num: "05", label: "ARCHIVE",     longLabel: "ARCHIVE · 47 SPECIMENS",    Component: PortfolioCheckpoint },
  { id: "process",    num: "06", label: "PROCESS",     longLabel: "PROCESS · PATH OF FOUR",    Component: ProcessCheckpoint },
  { id: "faq",        num: "07", label: "FAQ",         longLabel: "KNOWN QUERIES · OPEN",      Component: FaqCheckpoint },
  { id: "finale",     num: "08", label: "TERMINUS",    longLabel: "TERMINUS · LAUNCH READY",   Component: FinaleCheckpoint },
];

const N = CHECKPOINTS.length;

/* ===================================================================== */
/* MOBILE FALLBACK                                                        */
/* ===================================================================== */

function MobileFallback() {
  return (
    <div
      className={`${mono.variable} ${display.variable}`}
      style={{
        background: PALETTE.void,
        color: PALETTE.white,
        minHeight: "100vh",
        fontFamily: "var(--v5-display), system-ui",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* CSS starfield background — tunnel-flavoured */}
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
      {/* hairline grid */}
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
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "12px 16px",
          background: "rgba(0,8,18,0.92)",
          borderBottom: `1px solid ${PALETTE.cyan}30`,
          fontFamily: "var(--v5-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.18em",
          color: PALETTE.cyan,
          display: "flex",
          justifyContent: "space-between",
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
            style={{
              padding: "60px 16px",
              borderTop: i > 0 ? `1px dashed ${PALETTE.cyan}24` : "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--v5-mono), monospace",
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

/* ===================================================================== */
/* DEFAULT EXPORT                                                         */
/* ===================================================================== */

export default function TunnelEngine() {
  const [mobile, setMobile] = useState<boolean | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (mobile === null) {
    return <div style={{ background: PALETTE.void, width: "100%", height: "100vh" }} />;
  }
  if (mobile) return <MobileFallback />;
  if (reduceMotion) return <ReducedMotionFallback />;
  return <DesktopTunnel />;
}

/* ----------------- reduced-motion: vertical, frozen canvas --------------- */

function ReducedMotionFallback() {
  const lenis = useLenis();
  useEffect(() => {
    if (lenis && typeof lenis.destroy === "function") lenis.destroy();
  }, [lenis]);
  return (
    <div
      className={`${mono.variable} ${display.variable}`}
      style={{
        background: PALETTE.void,
        color: PALETTE.white,
        minHeight: "100vh",
        position: "relative",
        fontFamily: "var(--v5-display), system-ui",
      }}
    >
      <div
        style={{
          position: "fixed",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: PALETTE.void,
        }}
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
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(0,8,18,0) 45%, rgba(0,8,18,0.85) 100%)",
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
            style={{
              padding: "100px 16px",
              borderTop: i > 0 ? `1px dashed ${PALETTE.cyan}24` : "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--v5-mono), monospace",
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

/* ===================================================================== */
/* DESKTOP TUNNEL — input-driven progress, single 100vh viewport         */
/* ===================================================================== */

/**
 * Smooth tunnel progress driven by wheel / touch / keyboard input. The page
 * never scrolls vertically; instead, input increments a `target` progress
 * value (0..1), and a rAF loop lerps `current` toward it for inertia.
 */
function DesktopTunnel() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);
  // Camera dolly reads this each frame.
  const progressRef = useRef(0);
  // Target = where the user wants to be; current = lerps toward it.
  const targetRef = useRef(0);
  // Touch tracking
  const touchYRef = useRef<number | null>(null);

  // MotionValue mirror — drives ProgressBar / SectionPill (so we don't have
  // to refactor the HUD components). Updated each rAF tick from the lerped
  // `progressRef`.
  const scrollYProgress = useMemo(() => motionValue(0), []);

  // active section index — for pill + dots
  const [activeIndex, setActiveIndex] = useState(0);

  // If a global Lenis instance is alive, kill it. Lenis hijacks window scroll
  // and would conflict with our own wheel handling.
  const lenis = useLenis();
  useEffect(() => {
    if (lenis && typeof lenis.destroy === "function") {
      lenis.destroy();
    }
  }, [lenis]);

  // ---------- input → target progress ----------
  const setTarget = useCallback((v: number) => {
    targetRef.current = Math.max(0, Math.min(1, v));
  }, []);
  const nudgeTarget = useCallback((delta: number) => {
    targetRef.current = Math.max(0, Math.min(1, targetRef.current + delta));
  }, []);

  // wheel — captured on the wrapper, prevents page scroll
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const onWheel = (e: WheelEvent) => {
      e.preventDefault();
      // Each wheel notch (~100 deltaY) → ~1/12 of total tunnel.
      // 0.0008 yields a comfortable advance per notch.
      nudgeTarget(e.deltaY * 0.0008);
    };
    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [nudgeTarget]);

  // touch (mobile-ish, but desktop gets it free)
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;
    const onTouchStart = (e: TouchEvent) => {
      touchYRef.current = e.touches[0]?.clientY ?? null;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchYRef.current === null) return;
      const y = e.touches[0]?.clientY;
      if (y === undefined) return;
      const dy = touchYRef.current - y;
      touchYRef.current = y;
      // touch deltas are smaller than wheel; tune multiplier higher
      nudgeTarget(dy * 0.0018);
      e.preventDefault();
    };
    const onTouchEnd = () => {
      touchYRef.current = null;
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [nudgeTarget]);

  // keyboard — global listeners; jump to specific stations
  const jumpToStation = useCallback(
    (i: number) => {
      const clamped = Math.min(N - 1, Math.max(0, i));
      // Each station occupies a slice of [0, 1] — center the camera on the
      // station's progress fraction. Station i lives at i/(N-1).
      setTarget(clamped / (N - 1));
    },
    [setTarget]
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        jumpToStation(activeIndex + 1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        jumpToStation(activeIndex - 1);
      } else if (e.key === "Escape" || e.key === "Home") {
        e.preventDefault();
        setTarget(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setTarget(1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, jumpToStation, setTarget]);

  // ---------- main animation loop ----------
  // Lerps progress → target each frame, updates motionValue + DOM styles
  // imperatively. We avoid framer-motion's per-child useTransform because it
  // crashed Turbopack production builds previously.
  useEffect(() => {
    let raf = 0;
    let lastIdx = -1;

    const tick = () => {
      const cur = progressRef.current;
      const tgt = targetRef.current;
      // Critically damped-ish lerp; per-frame factor 0.07 is a comfortable
      // momentum. Stop micro-updates near zero diff.
      const next = cur + (tgt - cur) * 0.07;
      const clamped = Math.max(0, Math.min(1, next));
      progressRef.current = clamped;
      scrollYProgress.set(clamped);

      // active station = nearest checkpoint by progress fraction
      const idx = Math.min(
        N - 1,
        Math.max(0, Math.round(clamped * (N - 1)))
      );
      if (idx !== lastIdx) {
        lastIdx = idx;
        setActiveIndex(idx);
      }

      // Imperative panel styling — by far the cheapest path. Each panel's
      // dataset has its station index; we compute scale/opacity/translateZ
      // from |progress - station|.
      const overlay = overlayRef.current;
      if (overlay) {
        const panels = overlay.querySelectorAll<HTMLElement>("[data-panel]");
        panels.forEach((el) => {
          const stationIdx = Number(el.dataset.panel);
          const stationP = stationIdx / (N - 1);
          const d = clamped - stationP; // signed: negative=approaching, positive=passed
          const ad = Math.abs(d);
          // Window of visibility — half a station-width (1 / (N-1) / 2).
          const half = 1 / (N - 1) / 2;
          // soft falloff
          const t = Math.max(0, 1 - ad / (half * 1.4));
          // ease-out-quad on opacity
          const opacity = t * t * (3 - 2 * t);

          // Scale: when approaching (d < 0) we grow from 0.78 → 1; when
          // passing (d > 0) we grow further 1 → 1.18. This sells "panel
          // flying past the camera".
          let scale: number;
          if (d <= 0) {
            // approach: -half → 0 maps to 0.78 → 1
            const a = Math.min(1, Math.max(0, 1 + d / (half * 1.6)));
            scale = 0.78 + a * 0.22;
          } else {
            // pass: 0 → +half maps to 1 → 1.18
            const a = Math.min(1, Math.max(0, d / (half * 1.6)));
            scale = 1 + a * 0.18;
          }

          // translateZ-ish blur for depth — only on approaching panels far
          // out (subtle, performant).
          const blur = d < 0 ? Math.min(8, ad * 60) : 0;

          el.style.opacity = String(opacity);
          el.style.transform = `translate(-50%, -50%) scale(${scale.toFixed(4)})`;
          el.style.filter = blur > 0.4 ? `blur(${blur.toFixed(2)}px)` : "none";
          // Off-screen panels don't consume input
          el.style.pointerEvents = opacity > 0.5 ? "auto" : "none";
          // Hide entirely below threshold to skip painting
          el.style.visibility = opacity > 0.01 ? "visible" : "hidden";
        });
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrollYProgress]);

  return (
    <div
      ref={wrapperRef}
      className={`${mono.variable} ${display.variable}`}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: PALETTE.void,
        color: PALETTE.white,
        fontFamily: "var(--v5-display), system-ui",
        // Disable native scroll chaining
        overscrollBehavior: "none",
        touchAction: "none",
      }}
    >
      <a href="#tunnel-content" className="kpt-skip" style={skipLinkStyle}>Skip to content</a>

      {/* fixed canvas backdrop */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: PALETTE.void,
        }}
      >
        <Canvas
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          dpr={[1, 2]}
          camera={{ position: [0, 0, 4], fov: 70, near: 0.1, far: 600 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <color attach="background" args={[PALETTE.void]} />
          <fog attach="fog" args={[PALETTE.void, 18, 90]} />
          <CameraDolly progressRef={progressRef} frozen={false} />
          <TunnelWalls frozen={false} />
          <TunnelRings frozen={false} />
          <BloomSprites frozen={false} />
          <DriftingLights frozen={false} />
        </Canvas>

        {/* edge vignette */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(0,8,18,0) 40%, rgba(0,8,18,0.85) 100%)",
          }}
        />
        {/* scanline grain */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "repeating-linear-gradient(0deg, rgba(0,229,255,0.02) 0px, rgba(0,229,255,0.02) 1px, transparent 1px, transparent 3px)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* overlay panel layer — 8 absolutely-positioned panels, transformed by rAF */}
      <div
        id="tunnel-content"
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          // perspective gives the transform stack a real 3D feel
          perspective: "1400px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {CHECKPOINTS.map((cp, i) => (
          <div
            key={cp.id}
            id={cp.id}
            data-panel={i}
            aria-label={cp.label}
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              // initial transform — rAF loop overwrites this immediately
              transform: "translate(-50%, -50%) scale(0.78)",
              width: "min(1200px, 92vw)",
              maxHeight: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              willChange: "transform, opacity, filter",
              // start hidden — rAF reveals on first tick
              opacity: 0,
              transformStyle: "preserve-3d",
            }}
          >
            {i === 0 ? <h1 className="kpt-sr-only">KPT Designs — Tunnel</h1> : null}
            <cp.Component />
          </div>
        ))}
      </div>

      {/* HUD chrome */}
      <ProgressBar scrollYProgress={scrollYProgress} />
      <SectionPill scrollYProgress={scrollYProgress} activeIndex={activeIndex} checkpoints={CHECKPOINTS} />
      <ScrollDots activeIndex={activeIndex} onJump={jumpToStation} checkpoints={CHECKPOINTS} />
      <CornerHud />

      <style>{`
        .kpt-sr-only {
          position: absolute !important;
          width: 1px; height: 1px;
          margin: -1px; padding: 0;
          overflow: hidden;
          clip: rect(0,0,0,0);
          white-space: nowrap;
          border: 0;
        }
        .kpt-skip:focus { left: 8px !important; outline: 2px solid ${PALETTE.amber}; }
        /* Prevent body from scrolling when this view is mounted */
        html, body { overflow: hidden !important; height: 100%; }
      `}</style>
    </div>
  );
}
