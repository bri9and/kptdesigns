"use client";

/**
 * V7 Recursive Zoom Engine — 8 levels at 8× per step (8^7 ≈ 2.1M, tractable;
 * 80^7 ≈ 2T is not). Levels: Hero 1×, Phil 8×, Stack 64×, Telem 512×,
 * Work 4K×, Proc 32K×, FAQ 262K×, Atom 2.1M×. Pure CSS+framer-motion.
 * Includes keyboard nav, scroll dots, top bar, reduced-motion + mobile
 * fallback (vertical stacked sections).
 */

import {
  JSX,
  useEffect,
  useRef,
  useCallback,
  useSyncExternalStore,
} from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
  MotionValue,
} from "framer-motion";

import * as HeroModule from "../_sections/HeroLevel";
import * as PhilosophyModule from "../_sections/PhilosophyLevel";
import * as StackModule from "../_sections/StackLevel";
import * as TelemetryModule from "../_sections/TelemetryLevel";
import * as PortfolioModule from "../_sections/PortfolioLevel";
import * as ProcessModule from "../_sections/ProcessLevel";
import * as FaqModule from "../_sections/FaqLevel";
import * as FinaleModule from "../_sections/FinaleLevel";

type Anchor = { x: number; y: number };
const FALLBACK: Anchor = { x: 0.5, y: 0.5 };
const a = (m: { ANCHOR_POINT?: Anchor }): Anchor => m.ANCHOR_POINT ?? FALLBACK;

type LevelDef = { Component: () => JSX.Element; anchor: Anchor; code: string; name: string };

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
const SCROLL_VH = (T + 2) * 100; // 900vh

const PAPER = "#FCFCFA";
const INK = "#0A0A0A";
const RED = "#FF1E1E";
const GREY = "#9A9A9A";
const MONO = '"JetBrains Mono", ui-monospace, SFMono-Regular, Menlo, monospace';

function tw(i: number): [number, number] {
  const PAD = 0.05;
  const usable = 1 - 2 * PAD;
  const each = usable / T;
  const start = PAD + i * each;
  return [start, start + each];
}

function activeLevelFromP(p: number): number {
  for (let i = 0; i < T; i++) {
    const [s, e] = tw(i);
    if (p < (s + e) / 2) return i;
  }
  return N - 1;
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

function useLevelScale(progress: MotionValue<number>, level: number) {
  return useTransform(progress, (p) => {
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
  });
}

function useLevelOpacity(progress: MotionValue<number>, level: number) {
  return useTransform(progress, (p) => {
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
  });
}

function useAnchorOffset(progress: MotionValue<number>, level: number, anchor: Anchor) {
  const out = level < N - 1 ? tw(level) : null;
  const compute = (p: number, axis: "x" | "y") => {
    if (!out) return 0;
    const v = anchor[axis];
    if (p < out[0]) return 0;
    if (p > out[1]) return -(v - 0.5) * 100 * ZOOM_STEP;
    const t = (p - out[0]) / (out[1] - out[0]);
    return -(v - 0.5) * 100 * Math.pow(ZOOM_STEP, t);
  };
  return {
    tx: useTransform(progress, (p) => compute(p, "x")),
    ty: useTransform(progress, (p) => compute(p, "y")),
  };
}

// Per-level wrapper -------------------------------------------------------

function Level({
  level, anchor, progress, children,
}: { level: number; anchor: Anchor; progress: MotionValue<number>; children: JSX.Element }) {
  const scale = useLevelScale(progress, level);
  const opacity = useLevelOpacity(progress, level);
  const { tx, ty } = useAnchorOffset(progress, level, anchor);
  const sScale = useSpring(scale, { stiffness: 240, damping: 40, mass: 0.55 });
  const sTx = useSpring(tx, { stiffness: 240, damping: 40, mass: 0.55 });
  const sTy = useSpring(ty, { stiffness: 240, damping: 40, mass: 0.55 });
  return (
    <motion.div
      style={{
        position: "absolute", inset: 0, display: "flex",
        alignItems: "center", justifyContent: "center",
        scale: sScale, x: sTx, y: sTy, opacity,
        transformOrigin: `${anchor.x * 100}% ${anchor.y * 100}%`,
        willChange: "transform, opacity", backfaceVisibility: "hidden",
      }}
    >
      {children}
    </motion.div>
  );
}

// Zoom HUD -----------------------------------------------------------------

function formatZoom(z: number): string {
  if (z < 1000) return `${Math.round(z)}×`;
  if (z < 1_000_000) return `${(z / 1000).toFixed(z < 10_000 ? 1 : 0)}K×`;
  return `${(z / 1_000_000).toFixed(2)}M×`;
}

function ZoomHUD({ progress }: { progress: MotionValue<number> }) {
  const active = useTransform(progress, activeLevelFromP);
  const zoomText = useTransform(progress, (p) => formatZoom(liveZoomFactor(p)));
  const sectionLabel = useTransform(active, (i) => `§ ${LEVELS[i].code} / ${LEVELS[i].name}`);
  const breadcrumbZoom = useTransform(active, (i) => `ZOOM ${formatZoom(ZOOM_LEVELS[i])}`);
  const scrollPct = useTransform(progress, (p) => `SCROLL ${(p * 100).toFixed(1)}%`);

  const pillS: React.CSSProperties = {
    position: "fixed", top: 18, left: "50%", transform: "translateX(-50%)",
    zIndex: 110, pointerEvents: "none", display: "inline-flex",
    alignItems: "center", gap: 12, padding: "8px 16px",
    background: INK, color: PAPER, fontFamily: MONO, fontSize: 10.5,
    letterSpacing: "0.32em", textTransform: "uppercase", borderRadius: 999,
    boxShadow: "0 14px 40px rgba(10,10,10,0.18)",
  };
  const cornerS: React.CSSProperties = {
    position: "fixed", top: 0, left: 0, right: 0, zIndex: 100, pointerEvents: "none",
    padding: "20px 28px", display: "flex", justifyContent: "space-between",
    alignItems: "flex-start", fontFamily: MONO, fontSize: 11,
    letterSpacing: "0.08em", color: INK,
  };

  return (
    <>
      <motion.div style={pillS}>
        <span aria-hidden style={{ width: 6, height: 6, borderRadius: "50%", background: RED, boxShadow: `0 0 10px ${RED}` }} />
        <motion.span>{sectionLabel}</motion.span>
        <span style={{ color: GREY }}>·</span>
        <motion.span style={{ color: RED }}>{breadcrumbZoom}</motion.span>
      </motion.div>
      <div style={cornerS}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ width: 8, height: 8, background: RED, borderRadius: "50%", boxShadow: "0 0 0 2px rgba(255,30,30,0.18)" }} />
            <span style={{ fontWeight: 600, letterSpacing: "0.18em" }}>KPT — RECURSIVE ZOOM / V7</span>
          </div>
          <div style={{ display: "flex", gap: 10, flexWrap: "wrap", maxWidth: 520 }}>
            {ZOOM_LEVELS.map((z, i) => (
              <TierBadge key={i} label={formatZoom(z)} index={i} active={active} />
            ))}
          </div>
        </div>
        <div style={{ textAlign: "right", display: "flex", flexDirection: "column", gap: 6, minWidth: 200 }}>
          <div style={{ fontSize: 10, opacity: 0.55, letterSpacing: "0.22em" }}>ZOOM LEVEL</div>
          <motion.div style={{ fontSize: 22, fontWeight: 600, letterSpacing: "0.04em", lineHeight: 1, color: RED, fontVariantNumeric: "tabular-nums" }}>
            {zoomText}
          </motion.div>
          <motion.div style={{ fontSize: 10, opacity: 0.55, letterSpacing: "0.18em", fontVariantNumeric: "tabular-nums" }}>
            {useMotionTemplate`${scrollPct}`}
          </motion.div>
        </div>
      </div>
    </>
  );
}

function TierBadge({ label, index, active }: { label: string; index: number; active: MotionValue<number> }) {
  const opacity = useTransform(active, (a) => (a === index ? 1 : 0.32));
  const dot = useTransform(active, (a) => (a === index ? RED : GREY));
  return (
    <motion.div style={{ display: "flex", alignItems: "center", gap: 6, opacity }}>
      <motion.span style={{ width: 4, height: 4, borderRadius: "50%", background: dot }} />
      <span style={{ fontVariantNumeric: "tabular-nums" }}>{label}</span>
    </motion.div>
  );
}

// Scroll dots --------------------------------------------------------------

function ScrollDots({ progress, onJump }: { progress: MotionValue<number>; onJump: (l: number) => void }) {
  const active = useTransform(progress, activeLevelFromP);
  return (
    <nav
      aria-label="Zoom level navigation"
      style={{
        position: "fixed", right: 28, top: "50%", transform: "translateY(-50%)",
        zIndex: 110, display: "flex", flexDirection: "column", gap: 14, alignItems: "center",
      }}
    >
      {LEVELS.map((l, i) => (
        <Dot key={l.code} index={i} name={`${l.code} ${l.name}`} active={active} onJump={onJump} />
      ))}
    </nav>
  );
}

function Dot({ index, name, active, onJump }: {
  index: number; name: string; active: MotionValue<number>; onJump: (l: number) => void;
}) {
  const bg = useTransform(active, (a) => (a === index ? RED : "rgba(10,10,10,0.28)"));
  const scale = useTransform(active, (a) => (a === index ? 1.45 : 1));
  const ring = useTransform(active, (a) =>
    a === index ? "0 0 0 4px rgba(255,30,30,0.18)" : "0 0 0 0 rgba(0,0,0,0)",
  );
  return (
    <button
      type="button"
      aria-label={`Jump to level ${name}`}
      onClick={() => onJump(index)}
      style={{ all: "unset", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center", width: 18, height: 18 }}
    >
      <motion.span
        style={{
          width: 8, height: 8, borderRadius: "50%", background: bg, scale,
          boxShadow: ring, display: "block", transition: "background 200ms ease",
        }}
      />
    </button>
  );
}

// Progress bar / hint / reticle -------------------------------------------

function TopProgress({ progress }: { progress: MotionValue<number> }) {
  const width = useTransform(progress, (p) => `${p * 100}%`);
  return (
    <div style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 120, pointerEvents: "none", background: "rgba(10,10,10,0.06)" }}>
      <motion.div style={{ height: "100%", width, background: RED, boxShadow: `0 0 12px rgba(255,30,30,0.55)` }} />
    </div>
  );
}

function ScrollHint({ progress }: { progress: MotionValue<number> }) {
  const opacity = useTransform(progress, [0, 0.03, 0.06], [1, 1, 0]);
  return (
    <motion.div
      style={{
        position: "fixed", bottom: 36, left: "50%", transform: "translateX(-50%)",
        zIndex: 90, pointerEvents: "none", fontFamily: MONO, fontSize: 10,
        letterSpacing: "0.32em", color: INK, opacity,
        display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
      }}
    >
      <span>SCROLL · ↓ / PgDn / Esc</span>
      <motion.span
        animate={{ y: [0, 6, 0] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        style={{ width: 1, height: 22, background: RED }}
      />
    </motion.div>
  );
}

function Reticle() {
  const c = (extra: React.CSSProperties): React.CSSProperties => ({
    position: "absolute", width: 18, height: 18, borderColor: INK,
    opacity: 0.5, pointerEvents: "none", zIndex: 90, ...extra,
  });
  const B = "1px solid";
  return (
    <>
      <div style={c({ top: 16, left: 16, borderTop: B, borderLeft: B })} />
      <div style={c({ top: 16, right: 16, borderTop: B, borderRight: B })} />
      <div style={c({ bottom: 16, left: 16, borderBottom: B, borderLeft: B })} />
      <div style={c({ bottom: 16, right: 16, borderBottom: B, borderRight: B })} />
      <div style={{ position: "absolute", top: "50%", left: "50%", width: 28, height: 28, transform: "translate(-50%, -50%)", pointerEvents: "none", zIndex: 91, opacity: 0.18 }}>
        <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 1, background: RED }} />
        <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: 1, background: RED }} />
      </div>
    </>
  );
}

// Reduced-motion / mobile fallback ----------------------------------------

function FallbackStack() {
  return (
    <main id="v7-content" style={{ background: PAPER, color: INK }}>
      <SkipLink />
      {LEVELS.map((l, i) => {
        const Comp = l.Component;
        return (
          <section
            key={l.code}
            id={`level-${l.code}`}
            aria-label={`${l.name} — zoom ${formatZoom(ZOOM_LEVELS[i])}`}
            style={{ position: "relative", borderTop: i === 0 ? "none" : `1px solid ${RED}` }}
          >
            <span
              aria-hidden
              style={{
                position: "absolute", top: 16, right: 16, zIndex: 50,
                fontFamily: MONO, fontSize: 10, letterSpacing: "0.28em",
                color: INK, background: PAPER, border: `1px solid ${INK}`,
                padding: "4px 8px", textTransform: "uppercase",
              }}
            >
              ZOOM {formatZoom(ZOOM_LEVELS[i])}
            </span>
            <Comp />
          </section>
        );
      })}
    </main>
  );
}

function SkipLink() {
  return (
    <a
      href="#v7-content"
      style={{ position: "absolute", top: -100, left: 0, padding: 12, background: INK, color: PAPER, zIndex: 200 }}
      onFocus={(e) => { e.currentTarget.style.top = "8px"; }}
      onBlur={(e) => { e.currentTarget.style.top = "-100px"; }}
    >
      Skip to content
    </a>
  );
}

// SSR-safe media query + mounted flag -------------------------------------

const subscribeMobile = (cb: () => void) => {
  const mq = window.matchMedia("(max-width: 767px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
};
const getMobileSnapshot = () => window.matchMedia("(max-width: 767px)").matches;
const subscribeMounted = () => () => {};

// Engine -------------------------------------------------------------------

export default function RecursiveEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();
  const isMobile = useSyncExternalStore(subscribeMobile, getMobileSnapshot, () => false);
  const mounted = useSyncExternalStore(subscribeMounted, () => true, () => false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Jump: rest point for a level is midway between its incoming end and
  // outgoing start. Boundary cases pin to 0 / 1.
  const jumpToLevel = useCallback((level: number) => {
    const el = containerRef.current;
    if (!el) return;
    const total = el.offsetHeight - window.innerHeight;
    let p: number;
    if (level === 0) p = 0;
    else if (level === N - 1) p = 1;
    else p = (tw(level - 1)[1] + tw(level)[0]) / 2;
    window.scrollTo({ top: el.offsetTop + p * total, behavior: "smooth" });
  }, []);

  // Track current level for keyboard nav (ref-only, no rerender).
  const currentLevelRef = useRef(0);
  useEffect(() => {
    const unsub = scrollYProgress.on("change", (p) => {
      currentLevelRef.current = activeLevelFromP(p);
    });
    return unsub;
  }, [scrollYProgress]);

  useEffect(() => {
    if (reduced || isMobile) return;
    function onKey(e: KeyboardEvent) {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA")) return;
      const cur = currentLevelRef.current;
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        jumpToLevel(Math.min(N - 1, cur + 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        jumpToLevel(Math.max(0, cur - 1));
      } else if (e.key === "Escape" || e.key === "Home") {
        e.preventDefault();
        jumpToLevel(0);
      } else if (e.key === "End") {
        e.preventDefault();
        jumpToLevel(N - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [reduced, isMobile, jumpToLevel]);

  if (mounted && (reduced || isMobile)) return <FallbackStack />;

  return (
    <div ref={containerRef} style={{ position: "relative", height: `${SCROLL_VH}vh`, background: PAPER, color: INK }}>
      <SkipLink />
      <div
        id="v7-content"
        style={{
          position: "sticky", top: 0, height: "100vh", overflow: "hidden", background: PAPER,
          backgroundImage: "radial-gradient(1200px 800px at 50% 50%, rgba(10,10,10,0.025), transparent 70%)",
        }}
      >
        <Reticle />
        {LEVELS.map((l, i) => (
          <Level key={l.code} level={i} anchor={l.anchor} progress={scrollYProgress}>
            <l.Component />
          </Level>
        ))}
        <TopProgress progress={scrollYProgress} />
        <ZoomHUD progress={scrollYProgress} />
        <ScrollDots progress={scrollYProgress} onJump={jumpToLevel} />
        <ScrollHint progress={scrollYProgress} />
      </div>
    </div>
  );
}
