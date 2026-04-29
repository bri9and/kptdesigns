"use client";

/**
 * CosmosEngine — V2 Cosmos (snap-to-station, NOT continuous scrub).
 *
 * Architecture mirrors v5-tunnel/_engine/TunnelEngine exactly: 100vh fixed
 * wrapper · overflow:hidden · 3 layers (backdrop / panels / HUD) · all input
 * (wheel, touch, keyboard) hijacked into discrete station advances.
 *
 * Forward-flight (Option B): no 3D camera dolly. Each panel zooms
 * 0.92 → 1.00 → 1.08 as we "pass through" it; the cosmic backdrop is a
 * static gradient/grid/grain stack; HeroCosmos's own fixed starfield Canvas
 * paints over it while the hero panel is visible, hidden via parent
 * visibility:hidden afterward.
 *
 * Tunables — locked to V5 values: WHEEL_NOTCH=50, WHEEL_COOLDOWN_MS=1500
 * (fixed, no refresh), TOUCH_THRESHOLD=80, SETTLE_EPSILON=0.005,
 * SETTLE_IDLE_MS=100, LERP_FACTOR=0.055.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { JetBrains_Mono, Inter } from "next/font/google";
import { motionValue, useReducedMotion } from "framer-motion";
import { useLenis } from "lenis/react";

import {
  ProgressBar,
  SectionPill,
  ScrollDots,
  CornerHud,
  skipLinkStyle,
} from "./CosmosHud";
import {
  CHECKPOINTS,
  CosmicBackdrop,
  MobileFallback,
  PALETTE,
  ReducedMotionFallback,
} from "./CosmosFallbacks";

/* --------------------------------- fonts --------------------------------- */
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--v2-mono",
});
const display = Inter({
  subsets: ["latin"],
  weight: ["200", "400", "700"],
  variable: "--v2-display",
});
const FONT_VARS = `${mono.variable} ${display.variable}`;

/* ---------- snap / settle tunables (LOCKED to V5 values) ---------- */
const WHEEL_NOTCH = 50;
const WHEEL_COOLDOWN_MS = 1500; // fixed lockout — does NOT refresh on continued input
const TOUCH_THRESHOLD = 80;
const SETTLE_EPSILON = 0.005;
const SETTLE_IDLE_MS = 100;
const LERP_FACTOR = 0.055;

const N = CHECKPOINTS.length;

/* ===================================================================== */
/* DEFAULT EXPORT — picks variant for viewport + motion prefs             */
/* ===================================================================== */

export default function CosmosEngine() {
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
  return <DesktopCosmos />;
}

/* ===================================================================== */
/* DESKTOP COSMOS — snap-to-station, settle-aware interactivity           */
/* ===================================================================== */

function DesktopCosmos() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  const progressRef = useRef(0);
  const targetStationRef = useRef(0);
  const wheelAccumRef = useRef(0);
  const wheelCooldownUntilRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const touchFiredRef = useRef(false);
  const lastInputAtRef = useRef(0);
  const settledIdxRef = useRef<number | null>(null);

  const scrollYProgress = useMemo(() => motionValue(0), []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [settledIndex, setSettledIndex] = useState<number | null>(0);

  // Kill global Lenis (would hijack window scroll & fight our wheel listener).
  const lenis = useLenis();
  useEffect(() => {
    if (lenis && typeof lenis.destroy === "function") lenis.destroy();
  }, [lenis]);

  /* ---------- station mutators ---------- */
  const setStation = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(N - 1, i));
    if (clamped !== targetStationRef.current) {
      targetStationRef.current = clamped;
      wheelAccumRef.current = 0;
      wheelCooldownUntilRef.current = performance.now() + WHEEL_COOLDOWN_MS;
    }
    lastInputAtRef.current = performance.now();
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
        // FIXED cooldown — discard input until the lockout expires.
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

      // Imperative panel styling — forward-flight via scale 0.92 → 1.00 → 1.08.
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

          // Forward-flight: behind-the-camera panels start small and grow,
          // ahead-of-camera panels grow past as we "fly through" them.
          let scale: number;
          if (d <= 0) {
            const a = Math.min(1, Math.max(0, 1 + d / (half * 1.6)));
            scale = 0.92 + a * 0.08; // 0.92 → 1.00
          } else {
            const a = Math.min(1, Math.max(0, d / (half * 1.6)));
            scale = 1 + a * 0.08; // 1.00 → 1.08
          }
          const blur = d < 0 ? Math.min(6, ad * 50) : 0;

          const isSettled = settledNow === stationIdx;
          el.style.opacity = isSettled ? "1" : String(opacity);
          el.style.transform = `translate(-50%, -50%) scale(${(isSettled ? 1 : scale).toFixed(4)})`;
          el.style.filter = !isSettled && blur > 0.4 ? `blur(${blur.toFixed(2)}px)` : "none";
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
        color: PALETTE.star,
        fontFamily: "var(--v2-display), system-ui",
        overscrollBehavior: "none",
        touchAction: "none",
      }}
    >
      <a href="#cosmos-content" className="kpt-skip" style={skipLinkStyle}>Skip to content</a>

      {/* fixed cosmic backdrop (Option B forward-flight ambience) */}
      <CosmicBackdrop anchor="absolute" vignette />

      {/* overlay panel layer */}
      <div
        id="cosmos-content"
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
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
              className={`kpt-cpanel${isSettled ? " kpt-cpanel-settled" : ""}`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "min(1500px, 96vw)",
                maxHeight: "92vh",
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
              {i === 0 ? <h1 className="kpt-sr-only">KPT Designs — Cosmos</h1> : null}
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
          className="kpt-cnav-btn"
          style={{ opacity: atFirst ? 0.32 : 1, cursor: atFirst ? "default" : "pointer" }}
        >
          ↑
        </button>
        <button
          type="button"
          onClick={() => advanceStation(1)}
          disabled={atLast}
          aria-label="Next station"
          className="kpt-cnav-btn"
          style={{ opacity: atLast ? 0.32 : 1, cursor: atLast ? "default" : "pointer" }}
        >
          ↓
        </button>
      </div>

      {/* bottom-center "scroll for next" hint — only when settled & not last */}
      <div
        aria-hidden
        className={`kpt-cnext-hint ${settledIndex !== null && !atLast ? "is-on" : ""}`}
        style={{
          position: "fixed",
          bottom: 38,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 51,
          fontFamily: "var(--v2-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: PALETTE.violet,
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          gap: 10,
          pointerEvents: "none",
        }}
      >
        <span>SCROLL FOR NEXT</span>
        <span className="kpt-cnext-arrow">↓</span>
      </div>

      {/* ARIA live region — announces settled station for AT */}
      <div role="status" aria-live="polite" aria-atomic="true" className="kpt-sr-only">
        {settledLabel ? `Active: ${settledLabel}` : ""}
      </div>

      <style>{`
        .kpt-sr-only { position: absolute !important; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        .kpt-skip:focus { left: 8px !important; outline: 2px solid ${PALETTE.amber}; }
        html, body { overflow: hidden !important; height: 100%; }
        .kpt-cpanel-settled { box-shadow: 0 0 0 1px ${PALETTE.violet}66, 0 0 28px ${PALETTE.violet}33, 0 0 80px ${PALETTE.pink}1f; transition: box-shadow 360ms ease-out; }
        .kpt-cnav-btn { all: unset; width: 36px; height: 36px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid ${PALETTE.violet}55; background: rgba(2,3,10,0.78); color: ${PALETTE.violet}; font-family: var(--v2-mono), monospace; font-size: 16px; letter-spacing: 0.04em; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); transition: background 200ms, border-color 200ms, transform 200ms, box-shadow 200ms; }
        .kpt-cnav-btn:hover:not(:disabled) { background: ${PALETTE.violet}1a; border-color: ${PALETTE.violet}; box-shadow: 0 0 14px ${PALETTE.pink}66; transform: translateY(-1px); }
        .kpt-cnav-btn:focus-visible { outline: none; box-shadow: 0 0 0 2px ${PALETTE.amber}, 0 0 14px ${PALETTE.violet}66; }
        .kpt-cnav-btn:disabled { cursor: default; }
        .kpt-cnext-hint { opacity: 0; transition: opacity 600ms ease-out; }
        .kpt-cnext-hint.is-on { opacity: 0.85; }
        .kpt-cnext-arrow { display: inline-block; animation: kpt-cbounce 1.6s ease-in-out infinite; }
        @keyframes kpt-cbounce { 0%, 100% { transform: translateY(0); opacity: 0.6; } 50% { transform: translateY(4px); opacity: 1; } }
        [data-panel]::-webkit-scrollbar { width: 6px; }
        [data-panel]::-webkit-scrollbar-track { background: transparent; }
        [data-panel]::-webkit-scrollbar-thumb { background: ${PALETTE.violet}33; border-radius: 3px; }
        [data-panel]::-webkit-scrollbar-thumb:hover { background: ${PALETTE.violet}66; }
        @media (prefers-reduced-motion: reduce) { .kpt-cnext-arrow { animation: none; } }
      `}</style>
    </div>
  );
}
