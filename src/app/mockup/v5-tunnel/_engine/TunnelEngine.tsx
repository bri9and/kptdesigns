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
 * Fallbacks (mobile, reduced-motion) live in ./TunnelFallbacks.
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
} from "./TunnelHud";
import {
  CHECKPOINTS,
  MobileFallback,
  PALETTE,
  ReducedMotionFallback,
} from "./TunnelFallbacks";

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
const FONT_VARS = `${mono.variable} ${display.variable}`;

/* ---------- snap / settle tunables ---------- */
// Always-accept model: any wheel event past the (low) notch triggers an
// advance. After advance, FIXED 1.5s cooldown expires no matter what — no
// refresh on continued input. Once expired, the very next scroll advances.
const WHEEL_NOTCH = 50;            // any meaningful scroll triggers advance
const WHEEL_COOLDOWN_MS = 1500;    // fixed lockout between advances
const TOUCH_THRESHOLD = 80;        // px swipe distance per station
const SETTLE_EPSILON = 0.005;
const SETTLE_IDLE_MS = 100;
const LERP_FACTOR = 0.085;

const N = CHECKPOINTS.length;

/* ===================================================================== */
/* DEFAULT EXPORT — chooses appropriate variant                           */
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
  if (mobile) return <MobileFallback fontVars={FONT_VARS} />;
  if (reduceMotion) return <ReducedMotionFallback fontVars={FONT_VARS} />;
  return <DesktopTunnel />;
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
        // FIXED cooldown — does NOT refresh. We just discard input until
        // the lockout expires. Once expired, the very next scroll advances.
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
      touchFiredRef.current = false;
    };
    const onTouchMove = (e: TouchEvent) => {
      if (touchStartYRef.current === null) return;
      const y = e.touches[0]?.clientY;
      if (y === undefined) return;
      const dy = touchStartYRef.current - y; // +ve = swipe up = next
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
      className={FONT_VARS}
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
              className={`kpt-panel${isSettled ? " kpt-panel-settled" : ""}`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "min(1200px, 92vw)",
                maxHeight: "86vh",
                // FAQ etc. can grow tall; allow internal scroll when settled.
                overflowY: "auto",
                overflowX: "hidden",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                willChange: "transform, opacity, filter",
                transformStyle: "preserve-3d",
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
      <div style={{ position: "fixed", top: 56, right: 56, zIndex: 56, display: "flex", gap: 8 }}>
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
      <div role="status" aria-live="polite" aria-atomic="true" className="kpt-sr-only">
        {settledLabel ? `Active: ${settledLabel}` : ""}
      </div>

      <style>{`
        .kpt-sr-only { position: absolute !important; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        .kpt-skip:focus { left: 8px !important; outline: 2px solid ${PALETTE.amber}; }
        html, body { overflow: hidden !important; height: 100%; }
        .kpt-panel-settled { box-shadow: 0 0 0 1px ${PALETTE.cyan}66, 0 0 28px ${PALETTE.cyan}33, 0 0 80px ${PALETTE.cyan}1a; transition: box-shadow 360ms ease-out; }
        .kpt-nav-btn { all: unset; width: 36px; height: 36px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid ${PALETTE.cyan}55; background: rgba(0,8,18,0.78); color: ${PALETTE.cyan}; font-family: var(--v5-mono), monospace; font-size: 16px; letter-spacing: 0.04em; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); transition: background 200ms, border-color 200ms, transform 200ms, box-shadow 200ms; }
        .kpt-nav-btn:hover:not(:disabled) { background: ${PALETTE.cyan}1a; border-color: ${PALETTE.cyan}; box-shadow: 0 0 14px ${PALETTE.cyan}66; transform: translateY(-1px); }
        .kpt-nav-btn:focus-visible { outline: none; box-shadow: 0 0 0 2px ${PALETTE.amber}, 0 0 14px ${PALETTE.cyan}66; }
        .kpt-nav-btn:disabled { cursor: default; }
        .kpt-next-hint { opacity: 0; transition: opacity 600ms ease-out; }
        .kpt-next-hint.is-on { opacity: 0.85; }
        .kpt-next-arrow { display: inline-block; animation: kpt-bounce 1.6s ease-in-out infinite; }
        @keyframes kpt-bounce { 0%, 100% { transform: translateY(0); opacity: 0.6; } 50% { transform: translateY(4px); opacity: 1; } }
        [data-panel]::-webkit-scrollbar { width: 6px; }
        [data-panel]::-webkit-scrollbar-track { background: transparent; }
        [data-panel]::-webkit-scrollbar-thumb { background: ${PALETTE.cyan}33; border-radius: 3px; }
        [data-panel]::-webkit-scrollbar-thumb:hover { background: ${PALETTE.cyan}66; }
        @media (prefers-reduced-motion: reduce) { .kpt-next-arrow { animation: none; } }
      `}</style>
    </div>
  );
}
