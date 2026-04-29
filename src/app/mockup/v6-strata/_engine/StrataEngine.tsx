"use client";

/**
 * StrataEngine — V6 Strata (snap-to-station, NOT continuous scrub)
 *
 * Mirrors the V5 Tunnel snap-to-station pattern exactly. Identity-defining
 * mechanic preserved: 8 Z-stacked 2D planes traveling through depth via CSS
 * perspective. The continuous scrollYProgress driver is replaced by a
 * discrete `targetStationRef` (0..N-1) plus a lerped `progressRef`, giving
 * the same forward-flight feel as V5 Tunnel — one wheel notch == one plane.
 *
 * Architecture:
 *   ┌───────────────────────────────────────────┐
 *   │ 100vh wrapper, overflow:hidden            │  ← single viewport (NO page scroll)
 *   │  ├─ fixed BackgroundField     (z 0)       │  ← void hatching + sage/molten glows
 *   │  ├─ overlay plane layer       (z 10)      │  ← 8 absolutely-positioned planes
 *   │  └─ fixed HUD chrome          (z 30+)     │  ← top bar, dot nav, prev/next, hint
 *   └───────────────────────────────────────────┘
 *
 * Per-plane motion (forward-flight): each plane translates in Z from
 * -2400 (deep behind camera) → 0 (sharp + interactive) → +1400 (rushing
 * past camera). With LERP_FACTOR 0.055 the lerp settles in ~0.7s, giving
 * a real flight per advance over a doubled depth range vs the old engine.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { motionValue, useReducedMotion } from "framer-motion";

import HeroPlane from "../_sections/HeroPlane";
import PhilosophyPlane from "../_sections/PhilosophyPlane";
import StackPlane from "../_sections/StackPlane";
import TelemetryPlane from "../_sections/TelemetryPlane";
import PortfolioPlane from "../_sections/PortfolioPlane";
import ProcessPlane from "../_sections/ProcessPlane";
import FaqPlane from "../_sections/FaqPlane";
import FinalePlane from "../_sections/FinalePlane";

import {
  BackgroundField,
  MONO,
  NavButtons,
  NextHint,
  PALETTE,
  ScrollDotNav,
  StaticStack,
  StrataStyles,
  TopChrome,
  type PlaneDef,
} from "./StrataHud";

const PLANES: readonly PlaneDef[] = [
  { id: "hero", label: "Origin", Component: HeroPlane },
  { id: "philosophy", label: "Philosophy", Component: PhilosophyPlane },
  { id: "stack", label: "Stack", Component: StackPlane },
  { id: "telemetry", label: "Telemetry", Component: TelemetryPlane },
  { id: "portfolio", label: "Field", Component: PortfolioPlane },
  { id: "process", label: "Process", Component: ProcessPlane },
  { id: "faq", label: "FAQ", Component: FaqPlane },
  { id: "finale", label: "Signal", Component: FinalePlane },
];

const N = PLANES.length;

/* ---------- snap / settle tunables (match V5 Tunnel exactly) ---------- */
const WHEEL_NOTCH = 50;
const WHEEL_COOLDOWN_MS = 1500;
const TOUCH_THRESHOLD = 80;
const SETTLE_EPSILON = 0.005;
const SETTLE_IDLE_MS = 100;
const LERP_FACTOR = 0.055;

/* ---------- depth tunables (V6 forward-flight) ---------- */
const Z_BACK = -2400; // plane's Z when one full station behind active
const Z_FORWARD = 1400; // plane's Z when one full station past active
const BLUR_BACK_MAX = 12; // max blur on planes behind active (was 8)
const BLUR_FORWARD_MAX = 8; // max blur on planes past active (was 6)

/* ===================================================================== */
/* DEFAULT EXPORT — chooses appropriate variant                           */
/* ===================================================================== */

export default function StrataEngine() {
  const [mobile, setMobile] = useState<boolean | null>(null);
  const reduceMotion = useReducedMotion() ?? false;

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (mobile === null) return <div style={{ background: PALETTE.void, width: "100%", height: "100vh" }} />;
  if (mobile || reduceMotion) return <StaticStack planes={PLANES} />;
  return <DesktopStrata />;
}

/* ===================================================================== */
/* DESKTOP STRATA — snap-to-station, settle-aware interactivity           */
/* ===================================================================== */

function DesktopStrata() {
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
                  node.scrollTop + node.clientHeight >=
                  node.scrollHeight - 1;
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
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.isContentEditable)
      )
        return;
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

      // Imperative plane styling — Z-translate forward-flight.
      const overlay = overlayRef.current;
      if (overlay) {
        const planes = overlay.querySelectorAll<HTMLElement>("[data-panel]");
        const settledNow = settledIdxRef.current;
        const stationP = clamped * (N - 1); // current camera position in station-space
        planes.forEach((el) => {
          const stationIdx = Number(el.dataset.panel);
          const d = stationP - stationIdx;
          const ad = Math.abs(d);

          // Z-translation: linear in d.
          // Negative d (camera behind plane) → plane far ahead in -Z (deep).
          // Positive d (camera past plane) → plane behind us in +Z (rushing).
          let z: number;
          if (d <= 0) {
            const a = Math.min(1, -d);
            z = a * Z_BACK;
          } else {
            const a = Math.min(1, d);
            z = a * Z_FORWARD;
          }

          // Opacity: peak at d=0, fades over ~1 station distance.
          const t = Math.max(0, 1 - ad / 1.05);
          const opacity = t * t * (3 - 2 * t);

          // Blur: stronger when behind, lighter when past.
          const blur =
            d < 0
              ? Math.min(BLUR_BACK_MAX, ad * BLUR_BACK_MAX)
              : Math.min(BLUR_FORWARD_MAX, ad * BLUR_FORWARD_MAX);

          // Subtle rotateX for parallax feel.
          const rotateX =
            d < 0 ? Math.min(1.2, ad * 1.2) : -Math.min(1, ad);

          const isSettled = settledNow === stationIdx;
          el.style.opacity = isSettled ? "1" : String(opacity);
          el.style.transform = `translate3d(-50%, -50%, ${z.toFixed(
            2
          )}px) rotateX(${rotateX.toFixed(3)}deg)`;
          el.style.filter =
            !isSettled && blur > 0.4 ? `blur(${blur.toFixed(2)}px)` : "none";
          el.style.pointerEvents = isSettled ? "auto" : "none";
          el.style.visibility = opacity > 0.01 || isSettled ? "visible" : "hidden";
        });
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrollYProgress]);

  const atFirst = activeIndex === 0;
  const atLast = activeIndex === N - 1;
  const settledLabel =
    settledIndex !== null ? PLANES[settledIndex]?.label : null;

  return (
    <div
      ref={wrapperRef}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: PALETTE.void,
        color: PALETTE.paper,
        fontFamily: MONO,
        overscrollBehavior: "none",
        touchAction: "none",
      }}
    >
      <a href="#strata-content" className="strata-skip">
        Skip to content
      </a>

      {/* fixed background field */}
      <BackgroundField progress={scrollYProgress} />

      {/* frame chrome */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 28,
          border: `1px solid rgba(244,241,235,0.06)`,
          zIndex: 2,
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden
        style={{
          position: "absolute",
          left: "50%",
          top: 28,
          bottom: 28,
          width: 1,
          background:
            "linear-gradient(180deg, transparent 0%, rgba(244,241,235,0.06) 20%, rgba(244,241,235,0.06) 80%, transparent 100%)",
          zIndex: 2,
          pointerEvents: "none",
        }}
      />

      {/* overlay plane layer */}
      <div
        id="strata-content"
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          perspective: "1500px",
          perspectiveOrigin: "50% 45%",
          transformStyle: "preserve-3d",
        }}
      >
        {PLANES.map((p, i) => {
          const isSettled = settledIndex === i;
          const C = p.Component;
          return (
            <div
              key={p.id}
              id={`stratum-${p.id}`}
              data-panel={i}
              aria-label={p.label}
              aria-hidden={settledIndex !== null && !isSettled}
              className={`strata-panel${
                isSettled ? " strata-panel-settled" : ""
              }`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "min(1280px, 92vw)",
                maxHeight: "86vh",
                overflowY: "auto",
                overflowX: "hidden",
                willChange: "transform, opacity, filter",
                transformStyle: "preserve-3d",
                borderRadius: 6,
              }}
            >
              {i === 0 ? (
                <h1 className="strata-sr-only">KPT Designs — Strata</h1>
              ) : null}
              <C />
            </div>
          );
        })}
      </div>

      {/* HUD chrome */}
      <TopChrome
        progress={scrollYProgress}
        activeIndex={activeIndex}
        planes={PLANES}
      />
      <ScrollDotNav
        activeIndex={activeIndex}
        settledIndex={settledIndex}
        onJump={setStation}
        planes={PLANES}
      />

      <NavButtons
        onPrev={() => advanceStation(-1)}
        onNext={() => advanceStation(1)}
        atFirst={atFirst}
        atLast={atLast}
      />

      <NextHint visible={settledIndex !== null && !atLast} />

      {/* ARIA live region */}
      <div
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="strata-sr-only"
      >
        {settledLabel ? `Active: ${settledLabel}` : ""}
      </div>

      <StrataStyles />
    </div>
  );
}
