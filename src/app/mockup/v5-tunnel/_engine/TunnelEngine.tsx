"use client";

/**
 * TunnelEngine — V5 Tunnel (snap-to-station, NOT continuous scrub)
 *
 * Architecture:
 *   ┌───────────────────────────────────────────┐
 *   │ 100vh wrapper, overflow:hidden            │  ← single viewport (NO page scroll)
 *   │  ├─ fixed <Canvas>            (z 0)       │  ← cosmic tunnel BACKDROP
 *   │  ├─ overlay panel layer       (z 10)      │  ← 8 absolutely-positioned panels
 *   │  └─ fixed HUD chrome          (z 30+)     │  ← progress, dots, prev/next, hint
 *   └───────────────────────────────────────────┘
 *
 * Navigation model — DISCRETE pages, cinematic flight between:
 *   - `targetStationRef`  : integer 0..N-1, the station the user wants to be on
 *   - `progressRef`       : 0..1, lerped toward `targetStation/(N-1)` for camera/panel
 *   - Wheel : accumulator with notch threshold + cooldown — one tick == one station
 *   - Touch : per-swipe distance threshold — one swipe == one station
 *   - Keys  : Arrow/PageDn/Space → +1 ; Arrow/PageUp → -1 ; Home/Esc → 0 ; End → N-1
 *   - Dots  : click → set targetStation directly
 *
 * Settled detection:
 *   When |progress - target/(N-1)| < 0.005 AND no input for 150ms, the active
 *   panel becomes FULLY INTERACTIVE (pointer-events:auto, cyan settle outline).
 *   Internal scroll (e.g. FAQ overflow) is honoured: wheel events inside an
 *   overflowing scrollable panel scroll natively until they hit the boundary,
 *   then the next notch advances the station.
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
import { motionValue, useReducedMotion } from "framer-motion";
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

/* ---------- snap / settle tunables ---------- */
const WHEEL_NOTCH = 100;          // |accumulator| to advance one station
const WHEEL_COOLDOWN_MS = 500;    // ignore wheel after a station change
const TOUCH_THRESHOLD = 80;       // px swipe distance per station
const SETTLE_EPSILON = 0.005;     // |progress - target| considered "arrived"
const SETTLE_IDLE_MS = 150;       // idle time after arrival before "settled"
const LERP_FACTOR = 0.035;        // cinematic glide

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

/* ===================================================================== */
/* DESKTOP TUNNEL — snap-to-station, settle-aware interactivity           */
/* ===================================================================== */

function DesktopTunnel() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Camera dolly + HUD read this each frame.
  const progressRef = useRef(0);
  // Discrete target station (0..N-1). NOT a continuous scrubber.
  const targetStationRef = useRef(0);
  // Wheel notch accumulator + cooldown to dampen flick scrolls.
  const wheelAccumRef = useRef(0);
  const wheelCooldownUntilRef = useRef(0);
  // Touch tracking — distance accumulated per single touch sequence.
  const touchStartYRef = useRef<number | null>(null);
  const touchAccumRef = useRef(0);
  const touchFiredRef = useRef(false);
  // Last input timestamp — used for settle detection.
  const lastInputAtRef = useRef(0);
  // Settled-state ref (read by rAF) mirrored to React state for re-renders.
  const settledIdxRef = useRef<number | null>(null);

  // MotionValue mirror — drives ProgressBar / SectionPill (HUD reads MV).
  const scrollYProgress = useMemo(() => motionValue(0), []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [settledIndex, setSettledIndex] = useState<number | null>(0);

  // Kill global Lenis (would hijack window scroll).
  const lenis = useLenis();
  useEffect(() => {
    if (lenis && typeof lenis.destroy === "function") lenis.destroy();
  }, [lenis]);

  /* ---------- station mutators ---------- */
  const setStation = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(N - 1, i));
    if (clamped !== targetStationRef.current) {
      targetStationRef.current = clamped;
      // Reset wheel accumulator + start cooldown so a flick doesn't skip.
      wheelAccumRef.current = 0;
      wheelCooldownUntilRef.current = performance.now() + WHEEL_COOLDOWN_MS;
    }
    lastInputAtRef.current = performance.now();
    // Clear settled state — we're transitioning again.
    if (settledIdxRef.current !== null) {
      settledIdxRef.current = null;
      setSettledIndex(null);
    }
  }, []);

  const advanceStation = useCallback(
    (delta: number) => setStation(targetStationRef.current + delta),
    [setStation]
  );

  /* ---------- wheel: notch accumulator + internal-scroll honour ---------- */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // If wheel happens inside the active settled panel AND that panel
      // can still scroll in the wheel direction, let it scroll natively.
      if (settledIdxRef.current !== null) {
        const target = e.target as HTMLElement | null;
        const overlay = overlayRef.current;
        if (target && overlay) {
          const panel = overlay.querySelector<HTMLElement>(
            `[data-panel="${settledIdxRef.current}"]`
          );
          if (panel && panel.contains(target)) {
            // Walk up from target → panel root looking for a scrollable
            // ancestor with remaining room in the wheel direction.
            let node: HTMLElement | null = target;
            while (node && node !== panel.parentElement) {
              const cs = window.getComputedStyle(node);
              const scrollable =
                /(auto|scroll|overlay)/.test(cs.overflowY) &&
                node.scrollHeight > node.clientHeight + 1;
              if (scrollable) {
                const atTop = node.scrollTop <= 0;
                const atBot =
                  node.scrollTop + node.clientHeight >= node.scrollHeight - 1;
                const wantsDown = e.deltaY > 0;
                const wantsUp = e.deltaY < 0;
                if ((wantsDown && !atBot) || (wantsUp && !atTop)) {
                  // Native scroll — record input so settle stays sticky.
                  lastInputAtRef.current = performance.now();
                  return;
                }
              }
              node = node.parentElement;
            }
          }
        }
      }

      e.preventDefault();
      lastInputAtRef.current = performance.now();

      const now = performance.now();
      if (now < wheelCooldownUntilRef.current) {
        // During cooldown, swallow input but don't accumulate (prevents
        // a single flick from queueing 3 stations).
        wheelAccumRef.current = 0;
        return;
      }

      wheelAccumRef.current += e.deltaY;
      if (wheelAccumRef.current >= WHEEL_NOTCH) {
        advanceStation(1);
      } else if (wheelAccumRef.current <= -WHEEL_NOTCH) {
        advanceStation(-1);
      }
    };

    el.addEventListener("wheel", onWheel, { passive: false });
    return () => el.removeEventListener("wheel", onWheel);
  }, [advanceStation]);

  /* ---------- touch: per-swipe distance threshold ---------- */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onTouchStart = (e: TouchEvent) => {
      touchStartYRef.current = e.touches[0]?.clientY ?? null;
      touchAccumRef.current = 0;
      touchFiredRef.current = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const y = e.touches[0]?.clientY;
      if (y === undefined) return;
      const dy = touchStartYRef.current - y; // +ve = swipe up = next
      touchAccumRef.current = dy;
      lastInputAtRef.current = performance.now();
      e.preventDefault();
      if (touchFiredRef.current) return;
      if (Math.abs(dy) >= TOUCH_THRESHOLD) {
        advanceStation(dy > 0 ? 1 : -1);
        touchFiredRef.current = true;
      }
    };
    const onTouchEnd = () => {
      touchStartYRef.current = null;
      touchAccumRef.current = 0;
      touchFiredRef.current = false;
    };
    el.addEventListener("touchstart", onTouchStart, { passive: true });
    el.addEventListener("touchmove", onTouchMove, { passive: false });
    el.addEventListener("touchend", onTouchEnd, { passive: true });
    return () => {
      el.removeEventListener("touchstart", onTouchStart);
      el.removeEventListener("touchmove", onTouchMove);
      el.removeEventListener("touchend", onTouchEnd);
    };
  }, [advanceStation]);

  /* ---------- keyboard ---------- */
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        advanceStation(1);
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        advanceStation(-1);
      } else if (e.key === "Escape" || e.key === "Home") {
        e.preventDefault();
        setStation(0);
      } else if (e.key === "End") {
        e.preventDefault();
        setStation(N - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [advanceStation, setStation]);

  /* ---------- main animation loop ---------- */
  useEffect(() => {
    let raf = 0;
    let lastIdx = -1;

    const tick = () => {
      const cur = progressRef.current;
      const tgt = targetStationRef.current / (N - 1);
      const next = cur + (tgt - cur) * LERP_FACTOR;
      const clamped = Math.max(0, Math.min(1, next));
      progressRef.current = clamped;
      scrollYProgress.set(clamped);

      // Active station for HUD = currently-targeted station.
      const idx = targetStationRef.current;
      if (idx !== lastIdx) {
        lastIdx = idx;
        setActiveIndex(idx);
      }

      // Settled detection: lerp arrived AND idle window passed.
      const arrived = Math.abs(clamped - tgt) < SETTLE_EPSILON;
      const idleMs = performance.now() - lastInputAtRef.current;
      const shouldSettle = arrived && idleMs > SETTLE_IDLE_MS;
      const currentSettle = settledIdxRef.current;
      if (shouldSettle && currentSettle !== idx) {
        settledIdxRef.current = idx;
        setSettledIndex(idx);
      } else if (!shouldSettle && currentSettle !== null) {
        settledIdxRef.current = null;
        setSettledIndex(null);
      }

      // Imperative panel styling — from |progress - station|.
      const overlay = overlayRef.current;
      if (overlay) {
        const panels = overlay.querySelectorAll<HTMLElement>("[data-panel]");
        const settledNow = settledIdxRef.current;
        panels.forEach((el) => {
          const stationIdx = Number(el.dataset.panel);
          const stationP = stationIdx / (N - 1);
          const d = clamped - stationP;
          const ad = Math.abs(d);
          const half = 1 / (N - 1) / 2;
          const t = Math.max(0, 1 - ad / (half * 1.4));
          const opacity = t * t * (3 - 2 * t);

          let scale: number;
          if (d <= 0) {
            const a = Math.min(1, Math.max(0, 1 + d / (half * 1.6)));
            scale = 0.78 + a * 0.22;
          } else {
            const a = Math.min(1, Math.max(0, d / (half * 1.6)));
            scale = 1 + a * 0.18;
          }
          const blur = d < 0 ? Math.min(8, ad * 60) : 0;

          const isSettled = settledNow === stationIdx;
          el.style.opacity = isSettled ? "1" : String(opacity);
          el.style.transform = `translate(-50%, -50%) scale(${(isSettled ? 1 : scale).toFixed(4)})`;
          el.style.filter = !isSettled && blur > 0.4 ? `blur(${blur.toFixed(2)}px)` : "none";
          // Only the settled panel takes pointer events — flying panels don't.
          el.style.pointerEvents = isSettled ? "auto" : "none";
          el.style.visibility = opacity > 0.01 || isSettled ? "visible" : "hidden";
        });
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrollYProgress]);

  const settledLabel =
    settledIndex !== null ? CHECKPOINTS[settledIndex]?.label : null;
  const atFirst = activeIndex === 0;
  const atLast = activeIndex === N - 1;

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
        overscrollBehavior: "none",
        touchAction: "none",
      }}
    >
      <a href="#tunnel-content" className="kpt-skip" style={skipLinkStyle}>Skip to content</a>

      {/* fixed canvas backdrop */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
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
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at center, rgba(0,8,18,0) 40%, rgba(0,8,18,0.85) 100%)",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            background: "repeating-linear-gradient(0deg, rgba(0,229,255,0.02) 0px, rgba(0,229,255,0.02) 1px, transparent 1px, transparent 3px)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* overlay panel layer */}
      <div
        id="tunnel-content"
        ref={overlayRef}
        style={{
          position: "absolute", inset: 0, zIndex: 10,
          perspective: "1400px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {CHECKPOINTS.map((cp, i) => {
          const isSettled = settledIndex === i;
          return (
            <div
              key={cp.id}
              id={cp.id}
              data-panel={i}
              aria-label={cp.label}
              aria-hidden={settledIndex !== null && !isSettled}
              className={isSettled ? "kpt-panel-settled" : undefined}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%) scale(0.78)",
                width: "min(1200px, 92vw)",
                maxHeight: "86vh",
                // FAQ etc. can grow tall; allow internal scroll when settled.
                overflowY: "auto",
                overflowX: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                willChange: "transform, opacity, filter",
                opacity: 0,
                transformStyle: "preserve-3d",
                // Pointer events flipped imperatively in rAF.
                pointerEvents: "none",
                // Custom cyan settle outline (CSS class adds glow).
                borderRadius: 6,
              }}
            >
              {i === 0 ? <h1 className="kpt-sr-only">KPT Designs — Tunnel</h1> : null}
              <cp.Component />
            </div>
          );
        })}
      </div>

      {/* HUD chrome */}
      <ProgressBar scrollYProgress={scrollYProgress} />
      <SectionPill scrollYProgress={scrollYProgress} activeIndex={activeIndex} checkpoints={CHECKPOINTS} />
      <ScrollDots activeIndex={activeIndex} onJump={setStation} checkpoints={CHECKPOINTS} settledIndex={settledIndex} />
      <CornerHud />

      {/* prev / next overlay buttons (top-right) */}
      <div
        style={{
          position: "fixed",
          top: 56,
          right: 56,
          zIndex: 56,
          display: "flex",
          gap: 8,
        }}
      >
        <button
          type="button"
          onClick={() => advanceStation(-1)}
          disabled={atFirst}
          aria-label="Previous station"
          className="kpt-nav-btn"
          style={{ opacity: atFirst ? 0.32 : 1, cursor: atFirst ? "default" : "pointer" }}
        >
          ↑
        </button>
        <button
          type="button"
          onClick={() => advanceStation(1)}
          disabled={atLast}
          aria-label="Next station"
          className="kpt-nav-btn"
          style={{ opacity: atLast ? 0.32 : 1, cursor: atLast ? "default" : "pointer" }}
        >
          ↓
        </button>
      </div>

      {/* bottom-center "scroll for next" hint — only when settled & not last */}
      <div
        aria-hidden
        className={`kpt-next-hint ${settledIndex !== null && !atLast ? "is-on" : ""}`}
        style={{
          position: "fixed",
          bottom: 38,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 51,
          fontFamily: "var(--v5-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: PALETTE.cyan,
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          gap: 10,
          pointerEvents: "none",
        }}
      >
        <span>SCROLL FOR NEXT</span>
        <span className="kpt-next-arrow">↓</span>
      </div>

      {/* ARIA live region — announces settled station for AT */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="kpt-sr-only"
      >
        {settledLabel ? `Active: ${settledLabel}` : ""}
      </div>

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
        html, body { overflow: hidden !important; height: 100%; }

        /* Settled panel: cyan glow ring + smooth in. Avoids blur; lets
           inner accordions expand and links/cards click cleanly. */
        .kpt-panel-settled {
          box-shadow:
            0 0 0 1px ${PALETTE.cyan}66,
            0 0 28px ${PALETTE.cyan}33,
            0 0 80px ${PALETTE.cyan}1a;
          transition: box-shadow 360ms ease-out;
        }

        /* Top-right prev/next buttons */
        .kpt-nav-btn {
          all: unset;
          width: 36px; height: 36px;
          display: inline-flex;
          align-items: center; justify-content: center;
          border: 1px solid ${PALETTE.cyan}55;
          background: rgba(0,8,18,0.78);
          color: ${PALETTE.cyan};
          font-family: var(--v5-mono), monospace;
          font-size: 16px;
          letter-spacing: 0.04em;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          transition: background 200ms, border-color 200ms, transform 200ms, box-shadow 200ms;
        }
        .kpt-nav-btn:hover:not(:disabled) {
          background: ${PALETTE.cyan}1a;
          border-color: ${PALETTE.cyan};
          box-shadow: 0 0 14px ${PALETTE.cyan}66;
          transform: translateY(-1px);
        }
        .kpt-nav-btn:focus-visible {
          outline: none;
          box-shadow: 0 0 0 2px ${PALETTE.amber}, 0 0 14px ${PALETTE.cyan}66;
        }
        .kpt-nav-btn:disabled { cursor: default; }

        /* Scroll-for-next hint: fade in 600ms after settling */
        .kpt-next-hint {
          opacity: 0;
          transition: opacity 600ms ease-out;
        }
        .kpt-next-hint.is-on { opacity: 0.85; }
        .kpt-next-arrow {
          display: inline-block;
          animation: kpt-bounce 1.6s ease-in-out infinite;
        }
        @keyframes kpt-bounce {
          0%, 100% { transform: translateY(0); opacity: 0.6; }
          50%      { transform: translateY(4px); opacity: 1; }
        }

        /* Scrollbar styling for overflowing settled panels (FAQ etc.) */
        [data-panel]::-webkit-scrollbar { width: 6px; }
        [data-panel]::-webkit-scrollbar-track { background: transparent; }
        [data-panel]::-webkit-scrollbar-thumb {
          background: ${PALETTE.cyan}33;
          border-radius: 3px;
        }
        [data-panel]::-webkit-scrollbar-thumb:hover { background: ${PALETTE.cyan}66; }

        @media (prefers-reduced-motion: reduce) {
          .kpt-next-arrow { animation: none; }
        }
      `}</style>
    </div>
  );
}
