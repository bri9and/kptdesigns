"use client";

/**
 * NeuralEngine — V21 Neural (snap-to-station, NOT continuous scroll)
 *
 * Mirrors the canonical V5 Tunnel pattern (TunnelEngine.tsx):
 *   - 100vh fixed wrapper, overflow:hidden, NO page scroll
 *   - Wheel / touch / keyboard hijacked → discrete station advances
 *   - WHEEL_NOTCH=50 · WHEEL_COOLDOWN_MS=1500 (FIXED, no refresh)
 *   - TOUCH_THRESHOLD=80 · SETTLE_EPSILON=0.005 · SETTLE_IDLE_MS=100
 *   - LERP_FACTOR=0.055  (~0.7s settle = real flight feel)
 *   - Settled panel becomes pointer-events:auto with cyan settle outline
 *   - Internal panel scroll honoured (FAQ etc.)
 *
 * V21 mechanic — "forward flight through neural network":
 *   - Same 6-layer / ~124-neuron / instanced graph as before
 *   - Camera Z range EXTENDED to z=12 → z=-12 (24 units) so each station
 *     advance covers ~3.4 units of dolly = visible flight through layers
 *   - During TRANSIT (not settled) edges fire BRIGHTER, layer-aware
 *   - On SETTLE the activations relax to ambient pulse
 *   - Active layer derived from progress (0..5) so the cascade tracks the
 *     camera as it crosses each plane
 *
 * Fallbacks (mobile <768px, prefers-reduced-motion) collapse to the same
 * simple vertical stack the previous implementation used.
 *
 * Files:
 *   ./NeuralShared  — palette + sections registry
 *   ./NeuralVisuals — buildNetwork, NeuronField, EdgeField, CameraRig
 *   ./NeuralHud     — ProgressBar, SectionPill, DotNav, StaticBackdrop
 */

import {
  Suspense,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import { motionValue, useReducedMotion } from "framer-motion";
import { Inter, JetBrains_Mono } from "next/font/google";

import { NEURAL_PALETTE, SECTIONS } from "./NeuralShared";
import {
  buildNetwork,
  CameraRig,
  CAMERA_Z_START,
  EdgeField,
  NeuronField,
} from "./NeuralVisuals";
import { DotNav, ProgressBar, SectionPill, StaticBackdrop } from "./NeuralHud";

const inter = Inter({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--n-sans",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--n-mono",
});

// Re-export so existing importers (page-level wrappers, etc.) keep working.
export { NEURAL_PALETTE };

const N = SECTIONS.length;

/* ---------- snap / settle tunables (match V5 Tunnel exactly) ---------- */
const WHEEL_NOTCH = 50;
const WHEEL_COOLDOWN_MS = 1500;
const TOUCH_THRESHOLD = 80;
const SETTLE_EPSILON = 0.005;
const SETTLE_IDLE_MS = 100;
const LERP_FACTOR = 0.055;

/* ===================================================================== */
/* DEFAULT EXPORT — chooses appropriate variant                           */
/* ===================================================================== */
export default function NeuralEngine() {
  const reducedMotion = useReducedMotion() ?? false;
  const [mobile, setMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const check = () => setMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (mobile === null) {
    return (
      <div
        className={`${inter.variable} ${mono.variable}`}
        style={{ background: NEURAL_PALETTE.void, width: "100%", height: "100vh" }}
      />
    );
  }
  if (mobile || reducedMotion) return <StackedFallback />;
  return <DesktopNeural />;
}

/* Mobile / reduced-motion: vertical stack, static backdrop. */
function StackedFallback() {
  return (
    <div
      className={`${inter.variable} ${mono.variable}`}
      style={{ fontFamily: "var(--n-sans), system-ui", position: "relative", zIndex: 1 }}
    >
      <a
        href="#neural-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-3 focus:py-2 focus:bg-black focus:text-white focus:rounded"
      >
        Skip to content
      </a>
      <StaticBackdrop />
      <div id="neural-main" style={{ paddingTop: 64, position: "relative", zIndex: 1 }}>
        {SECTIONS.map((s) => {
          const C = s.Component;
          return <C key={s.id} />;
        })}
      </div>
    </div>
  );
}

/* ===================================================================== */
/* DESKTOP — snap-to-station, settle-aware, forward flight                */
/* ===================================================================== */
function DesktopNeural() {
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

  // Refs the R3F frame loop reads each tick (no re-render churn).
  const activeLayerRef = useRef(0);
  const transitFireRef = useRef(0);

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

  /* ---------- wheel: notch + cooldown + internal-scroll honour ---------- */
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
      if (wheelAccumRef.current >= WHEEL_NOTCH) advanceStation(1);
      else if (wheelAccumRef.current <= -WHEEL_NOTCH) advanceStation(-1);
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

      // Active layer (0..5) tracks the camera as it crosses each plane.
      activeLayerRef.current = Math.min(5, Math.max(0, Math.round(clamped * 5)));

      // Transit boost: 0 settled, →1 mid-flight (8x scale: dist 0.125 → full).
      transitFireRef.current = Math.min(1, Math.abs(clamped - tgt) * 8);

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
          el.style.pointerEvents = isSettled ? "auto" : "none";
          el.style.visibility = opacity > 0.01 || isSettled ? "visible" : "hidden";
        });
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [scrollYProgress]);

  const network = useMemo(() => buildNetwork(), []);

  const atFirst = activeIndex === 0;
  const atLast = activeIndex === N - 1;
  const settledLabel = settledIndex !== null ? SECTIONS[settledIndex]?.name : null;

  return (
    <div
      ref={wrapperRef}
      className={`${inter.variable} ${mono.variable}`}
      style={{
        position: "fixed",
        inset: 0,
        width: "100vw",
        height: "100vh",
        overflow: "hidden",
        background: NEURAL_PALETTE.void,
        color: NEURAL_PALETTE.text,
        fontFamily: "var(--n-sans), system-ui",
        overscrollBehavior: "none",
        touchAction: "none",
      }}
    >
      <a href="#neural-main" className="kpt-n-skip">Skip to content</a>

      {/* fixed canvas backdrop */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 0,
          pointerEvents: "none",
          background: NEURAL_PALETTE.void,
        }}
      >
        <Canvas
          camera={{ position: [0, 0, CAMERA_Z_START], fov: 55 }}
          gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
          dpr={[1, 2]}
          style={{ position: "absolute", inset: 0, background: NEURAL_PALETTE.void }}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.4} />
            <CameraRig progressRef={progressRef} reducedMotion={false} />
            <NeuronField
              neurons={network.neurons}
              activeLayerRef={activeLayerRef}
              transitFireRef={transitFireRef}
              reducedMotion={false}
            />
            <EdgeField
              edges={network.edges}
              neurons={network.neurons}
              activeLayerRef={activeLayerRef}
              transitFireRef={transitFireRef}
              reducedMotion={false}
            />
            <mesh position={[0, 0, 7]}>
              <planeGeometry args={[40, 25]} />
              <meshBasicMaterial
                color={NEURAL_PALETTE.void}
                transparent
                opacity={0.35}
                depthWrite={false}
              />
            </mesh>
          </Suspense>
        </Canvas>
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            background:
              "radial-gradient(ellipse at center, rgba(2,3,10,0) 40%, rgba(2,3,10,0.85) 100%)",
          }}
        />
      </div>

      {/* overlay panel layer */}
      <div
        id="neural-main"
        ref={overlayRef}
        style={{
          position: "absolute",
          inset: 0,
          zIndex: 10,
          perspective: "1400px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {SECTIONS.map((s, i) => {
          const isSettled = settledIndex === i;
          const C = s.Component;
          return (
            <div
              key={s.id}
              id={s.id}
              data-panel={i}
              aria-label={s.name}
              aria-hidden={settledIndex !== null && !isSettled}
              className={`kpt-n-panel${isSettled ? " kpt-n-panel-settled" : ""}`}
              style={{
                position: "absolute",
                top: "50%",
                left: "50%",
                width: "min(1280px, 96vw)",
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
              <C />
            </div>
          );
        })}
      </div>

      {/* HUD chrome */}
      <ProgressBar progress={scrollYProgress} />
      <SectionPill index={activeIndex} />
      <DotNav index={activeIndex} settledIndex={settledIndex} onJump={setStation} />

      {/* prev / next overlay buttons (top-right) */}
      <div style={{ position: "fixed", top: 56, right: 56, zIndex: 56, display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={() => advanceStation(-1)}
          disabled={atFirst}
          aria-label="Previous section"
          className="kpt-n-nav-btn"
          style={{ opacity: atFirst ? 0.32 : 1, cursor: atFirst ? "default" : "pointer" }}
        >
          ↑
        </button>
        <button
          type="button"
          onClick={() => advanceStation(1)}
          disabled={atLast}
          aria-label="Next section"
          className="kpt-n-nav-btn"
          style={{ opacity: atLast ? 0.32 : 1, cursor: atLast ? "default" : "pointer" }}
        >
          ↓
        </button>
      </div>

      {/* bottom-center "scroll for next" hint */}
      <div
        aria-hidden
        className={`kpt-n-next-hint ${settledIndex !== null && !atLast ? "is-on" : ""}`}
      >
        <span>SCROLL FOR NEXT</span>
        <span className="kpt-n-next-arrow">↓</span>
      </div>

      <div role="status" aria-live="polite" aria-atomic="true" className="kpt-n-sr-only">
        {settledLabel ? `Active: ${settledLabel}` : ""}
      </div>

      <style>{`
        .kpt-n-sr-only { position: absolute !important; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        .kpt-n-skip { position: absolute; left: -9999px; top: 8px; z-index: 100; background: ${NEURAL_PALETTE.cyan}; color: ${NEURAL_PALETTE.void}; padding: 8px 14px; font-family: var(--n-mono), monospace; font-size: 11px; letter-spacing: 0.24em; text-transform: uppercase; text-decoration: none; font-weight: 600; }
        .kpt-n-skip:focus { left: 8px; outline: 2px solid ${NEURAL_PALETTE.amber}; }
        html, body { overflow: hidden !important; height: 100%; }
        .kpt-n-panel-settled { box-shadow: 0 0 0 1px ${NEURAL_PALETTE.cyan}66, 0 0 28px ${NEURAL_PALETTE.cyan}33, 0 0 80px ${NEURAL_PALETTE.cyan}1a; transition: box-shadow 360ms ease-out; }
        .kpt-n-nav-btn { all: unset; width: 36px; height: 36px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid ${NEURAL_PALETTE.cyan}55; background: rgba(2,3,10,0.78); color: ${NEURAL_PALETTE.cyan}; font-family: var(--n-mono), monospace; font-size: 16px; letter-spacing: 0.04em; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); transition: background 200ms, border-color 200ms, transform 200ms, box-shadow 200ms; }
        .kpt-n-nav-btn:hover:not(:disabled) { background: ${NEURAL_PALETTE.cyan}1a; border-color: ${NEURAL_PALETTE.cyan}; box-shadow: 0 0 14px ${NEURAL_PALETTE.cyan}66; transform: translateY(-1px); }
        .kpt-n-nav-btn:focus-visible { outline: none; box-shadow: 0 0 0 2px ${NEURAL_PALETTE.amber}, 0 0 14px ${NEURAL_PALETTE.cyan}66; }
        .kpt-n-nav-btn:disabled { cursor: default; }
        .kpt-n-next-hint { position: fixed; bottom: 38px; left: 50%; transform: translateX(-50%); z-index: 51; font-family: var(--n-mono), monospace; font-size: 10px; letter-spacing: 0.32em; text-transform: uppercase; color: ${NEURAL_PALETTE.cyan}; white-space: nowrap; display: flex; align-items: center; gap: 10px; pointer-events: none; opacity: 0; transition: opacity 600ms ease-out; }
        .kpt-n-next-hint.is-on { opacity: 0.85; }
        .kpt-n-next-arrow { display: inline-block; animation: kpt-n-bounce 1.6s ease-in-out infinite; }
        @keyframes kpt-n-bounce { 0%, 100% { transform: translateY(0); opacity: 0.6; } 50% { transform: translateY(4px); opacity: 1; } }
        [data-panel]::-webkit-scrollbar { width: 6px; }
        [data-panel]::-webkit-scrollbar-track { background: transparent; }
        [data-panel]::-webkit-scrollbar-thumb { background: ${NEURAL_PALETTE.cyan}33; border-radius: 3px; }
        [data-panel]::-webkit-scrollbar-thumb:hover { background: ${NEURAL_PALETTE.cyan}66; }
        .kpt-n-dot--settled::after {
          content: "";
          position: absolute;
          right: -6px;
          top: 50%;
          transform: translateY(-50%);
          width: 22px;
          height: 22px;
          border-radius: 999px;
          border: 1px solid ${NEURAL_PALETTE.cyan}88;
          animation: kpt-n-dot-pulse 1.8s ease-out infinite;
          pointer-events: none;
        }
        @keyframes kpt-n-dot-pulse {
          0%   { transform: translateY(-50%) scale(0.6); opacity: 0.9; }
          80%  { transform: translateY(-50%) scale(1.4); opacity: 0;   }
          100% { transform: translateY(-50%) scale(1.4); opacity: 0;   }
        }
        @media (prefers-reduced-motion: reduce) {
          .kpt-n-next-arrow { animation: none; }
          .kpt-n-dot--settled::after { animation: none; opacity: 0.5; }
        }
      `}</style>
    </div>
  );
}
