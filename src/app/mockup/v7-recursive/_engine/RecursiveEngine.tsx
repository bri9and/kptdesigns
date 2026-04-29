"use client";

/**
 * V7 Recursive Zoom Engine — snap-to-station (mirrors V5 Tunnel pattern).
 * Single 100vh viewport, no page scroll. Discrete targetStation (0..N-1) +
 * lerped progressRef drive recursive ×8 zoom (each level emerges from an
 * anchored detail inside the previous). Wheel: 50px notch + fixed 1500ms
 * cooldown. Settle: |Δ|<0.005 + 100ms idle → pointer-events auto + red
 * outline; internal scroll honoured. Mobile/reduced-motion → vertical stack.
 */

import {
  JSX,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motionValue, useReducedMotion } from "framer-motion";

import * as HeroModule from "../_sections/HeroLevel";
import * as PhilosophyModule from "../_sections/PhilosophyLevel";
import * as StackModule from "../_sections/StackLevel";
import * as TelemetryModule from "../_sections/TelemetryLevel";
import * as PortfolioModule from "../_sections/PortfolioLevel";
import * as ProcessModule from "../_sections/ProcessLevel";
import * as FaqModule from "../_sections/FaqLevel";
import * as FinaleModule from "../_sections/FinaleLevel";

import {
  EngineStyles,
  PrevNextNav,
  Reticle,
  ScrollDots,
  ScrollHint,
  SkipLink,
  TopProgress,
  ZoomHUD,
} from "./RecursiveHud";
import { FallbackStack } from "./RecursiveFallback";

/* ---------- types & constants ---------- */

type Anchor = { x: number; y: number };
const FALLBACK: Anchor = { x: 0.5, y: 0.5 };
const a = (m: { ANCHOR_POINT?: Anchor }): Anchor => m.ANCHOR_POINT ?? FALLBACK;

type LevelDef = {
  Component: () => JSX.Element;
  anchor: Anchor;
  code: string;
  name: string;
};

const LEVELS: LevelDef[] = [
  { Component: HeroModule.default,       anchor: a(HeroModule),       code: "01", name: "SURFACE"    },
  { Component: PhilosophyModule.default, anchor: a(PhilosophyModule), code: "02", name: "PHILOSOPHY" },
  { Component: StackModule.default,      anchor: a(StackModule),      code: "03", name: "STACK"      },
  { Component: TelemetryModule.default,  anchor: a(TelemetryModule),  code: "04", name: "TELEMETRY"  },
  { Component: PortfolioModule.default,  anchor: a(PortfolioModule),  code: "05", name: "WORK"       },
  { Component: ProcessModule.default,    anchor: a(ProcessModule),    code: "06", name: "PROCESS"    },
  { Component: FaqModule.default,        anchor: a(FaqModule),        code: "07", name: "FAQ"        },
  { Component: FinaleModule.default,     anchor: a(FinaleModule),     code: "08", name: "ATOMIC"     },
];

const ZOOM_STEP = 8;
const N = LEVELS.length;
const T = N - 1;
const ZOOM_LEVELS = LEVELS.map((_, i) => Math.pow(ZOOM_STEP, i));

/* ---------- snap / settle tunables (V5-matched) ---------- */
const WHEEL_NOTCH = 50;
const WHEEL_COOLDOWN_MS = 1500;
const TOUCH_THRESHOLD = 80;
const SETTLE_EPSILON = 0.005;
const SETTLE_IDLE_MS = 100;
const LERP_FACTOR = 0.055;

const PAPER = "#FCFCFA";
const INK = "#0A0A0A";

/* ---------- segment math ---------- */
function tw(i: number): [number, number] {
  const PAD = 0.05;
  const usable = 1 - 2 * PAD;
  const each = usable / T;
  const start = PAD + i * each;
  return [start, start + each];
}

function liveZoomFactor(p: number): number {
  if (p <= tw(0)[0]) return 1;
  if (p >= tw(T - 1)[1]) return ZOOM_LEVELS[ZOOM_LEVELS.length - 1];
  for (let i = 0; i < T; i++) {
    const [s, e] = tw(i);
    if (p >= s && p <= e) {
      return ZOOM_LEVELS[i] * Math.pow(ZOOM_STEP, (p - s) / (e - s));
    }
    if (p < s) return ZOOM_LEVELS[i];
  }
  return 1;
}

function levelScale(p: number, level: number): number {
  const out = level < N - 1 ? tw(level) : null;
  const inc = level > 0 ? tw(level - 1) : null;
  if (inc && p < inc[0]) return 1 / ZOOM_STEP;
  if (inc && p <= inc[1]) {
    const t = (p - inc[0]) / (inc[1] - inc[0]);
    return Math.pow(ZOOM_STEP, t - 1);
  }
  if (out && p >= out[0] && p <= out[1]) {
    const t = (p - out[0]) / (out[1] - out[0]);
    return Math.pow(ZOOM_STEP, t);
  }
  if (out && p > out[1]) return ZOOM_STEP;
  return 1;
}

function levelOpacity(p: number, level: number): number {
  const out = level < N - 1 ? tw(level) : null;
  const inc = level > 0 ? tw(level - 1) : null;
  if (inc && p < inc[0]) return 0;
  if (inc && p <= inc[1]) {
    const t = (p - inc[0]) / (inc[1] - inc[0]);
    const start = 0.42;
    return t < start ? 0 : (t - start) / (1 - start);
  }
  if (out && p >= out[0] && p <= out[1]) {
    const t = (p - out[0]) / (out[1] - out[0]);
    const end = 0.58;
    return t > end ? 0 : 1 - t / end;
  }
  if (out && p > out[1]) return 0;
  return 1;
}

function levelOffset(p: number, level: number, anchor: Anchor): { tx: number; ty: number } {
  const out = level < N - 1 ? tw(level) : null;
  const axis = (v: number) => {
    if (!out || p < out[0]) return 0;
    if (p > out[1]) return -(v - 0.5) * 100 * ZOOM_STEP;
    const t = (p - out[0]) / (out[1] - out[0]);
    return -(v - 0.5) * 100 * Math.pow(ZOOM_STEP, t);
  };
  return { tx: axis(anchor.x), ty: axis(anchor.y) };
}

/* ---------- DEFAULT EXPORT ---------- */

export default function RecursiveEngine() {
  const [mobile, setMobile] = useState<boolean | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (mobile === null) {
    return <div style={{ background: PAPER, width: "100%", height: "100vh" }} />;
  }
  if (mobile || reduceMotion) {
    return <FallbackStack levels={LEVELS} zoomLevels={ZOOM_LEVELS} />;
  }
  return <DesktopRecursive />;
}

/* ---------- DESKTOP — snap-to-station, settle-aware, recursion-zoom ---------- */

function DesktopRecursive() {
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

  /* ---------- wheel ---------- */
  useEffect(() => {
    const el = wrapperRef.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // Honour internal scroll on the settled level.
      if (settledIdxRef.current !== null) {
        const target = e.target as HTMLElement | null;
        const overlay = overlayRef.current;
        if (target && overlay) {
          const panel = overlay.querySelector<HTMLElement>(
            `[data-level="${settledIdxRef.current}"]`
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

  /* ---------- touch ---------- */
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
      const dy = touchStartYRef.current - y;
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

      // Settled detection.
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

      // Imperative per-level styling.
      const overlay = overlayRef.current;
      if (overlay) {
        const wraps = overlay.querySelectorAll<HTMLElement>("[data-level]");
        const settledNow = settledIdxRef.current;
        wraps.forEach((el) => {
          const lvl = Number(el.dataset.level);
          const anchor = LEVELS[lvl].anchor;
          const isSettled = settledNow === lvl;

          let scale: number;
          let opacity: number;
          let tx: number;
          let ty: number;
          if (isSettled) {
            scale = 1;
            opacity = 1;
            tx = 0;
            ty = 0;
          } else {
            scale = levelScale(clamped, lvl);
            opacity = levelOpacity(clamped, lvl);
            const off = levelOffset(clamped, lvl, anchor);
            tx = off.tx;
            ty = off.ty;
          }

          el.style.opacity = String(opacity);
          el.style.transform = `translate(${tx.toFixed(3)}%, ${ty.toFixed(3)}%) scale(${scale.toFixed(6)})`;
          el.style.transformOrigin = `${anchor.x * 100}% ${anchor.y * 100}%`;
          el.style.pointerEvents = isSettled ? "auto" : "none";
          el.style.visibility = opacity > 0.005 || isSettled ? "visible" : "hidden";
        });
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrollYProgress]);

  const settledLabel =
    settledIndex !== null
      ? `${LEVELS[settledIndex].code} ${LEVELS[settledIndex].name}`
      : null;
  const atFirst = activeIndex === 0;
  const atLast = activeIndex === N - 1;

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: PAPER,
        backgroundImage:
          "radial-gradient(1200px 800px at 50% 50%, rgba(10,10,10,0.025), transparent 70%)",
        color: INK,
        overscrollBehavior: "none",
        touchAction: "none",
      }}
    >
      <SkipLink />
      <Reticle />

      {/* overlay level layer */}
      <div
        id="v7-content"
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          perspective: "1400px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {LEVELS.map((l, i) => (
          <div
            key={l.code}
            data-level={i}
            aria-label={l.name}
            aria-hidden={settledIndex !== null && settledIndex !== i}
            className={`v7-level${settledIndex === i ? " v7-level-settled" : ""}`}
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              willChange: "transform, opacity",
              backfaceVisibility: "hidden",
              overflow: "hidden",
              // Default: invisible until rAF tick applies styles. Non-active
              // levels remain hidden via rAF. The active level's React class
              // (.v7-level-settled) overrides this in the inline <style>.
              opacity: settledIndex === i ? 1 : 0,
              visibility: settledIndex === i ? "visible" : "hidden",
              pointerEvents: settledIndex === i ? "auto" : "none",
              transform: settledIndex === i ? "translate(0%, 0%) scale(1)" : "scale(0.001)",
            }}
          >
            <l.Component />
          </div>
        ))}
      </div>

      {/* HUD */}
      <TopProgress progress={scrollYProgress} />
      <ZoomHUD
        progress={scrollYProgress}
        activeIndex={activeIndex}
        levels={LEVELS}
        zoomLevels={ZOOM_LEVELS}
        liveZoom={liveZoomFactor}
      />
      <ScrollDots
        activeIndex={activeIndex}
        settledIndex={settledIndex}
        levels={LEVELS}
        onJump={setStation}
      />

      <PrevNextNav
        atFirst={atFirst}
        atLast={atLast}
        onPrev={() => advanceStation(-1)}
        onNext={() => advanceStation(1)}
      />

      <ScrollHint visible={settledIndex !== null && !atLast} />

      {/* ARIA live region */}
      <div role="status" aria-live="polite" aria-atomic="true" className="v7-sr-only">
        {settledLabel ? `Active level: ${settledLabel}` : ""}
      </div>

      <EngineStyles />
    </div>
  );
}
