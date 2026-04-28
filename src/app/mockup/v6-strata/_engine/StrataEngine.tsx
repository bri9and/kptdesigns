"use client";

import { useRef, useEffect, useState, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  type MotionValue,
} from "framer-motion";

import HeroPlane from "../_sections/HeroPlane";
import PhilosophyPlane from "../_sections/PhilosophyPlane";
import StackPlane from "../_sections/StackPlane";
import TelemetryPlane from "../_sections/TelemetryPlane";
import PortfolioPlane from "../_sections/PortfolioPlane";
import ProcessPlane from "../_sections/ProcessPlane";
import FaqPlane from "../_sections/FaqPlane";
import FinalePlane from "../_sections/FinalePlane";

/* V6 — STRATA · 8-plane edition.
   Tall scroll (800vh) drives a sticky 100vh viewport with perspective.
   Each plane is sharp + opaque only at Z=0; adjacent planes blur + fade
   so the active plane reads as the foreground while depth is the backdrop. */

const PALETTE = {
  void: "#0B0B0F",
  paper: "#F4F1EB",
  molten: "#FF5E1A",
  sage: "#7B8E6F",
  ink: "#1A1A22",
} as const;

const PLANES = [
  { id: "hero", label: "Origin", Component: HeroPlane },
  { id: "philosophy", label: "Philosophy", Component: PhilosophyPlane },
  { id: "stack", label: "Stack", Component: StackPlane },
  { id: "telemetry", label: "Telemetry", Component: TelemetryPlane },
  { id: "portfolio", label: "Field", Component: PortfolioPlane },
  { id: "process", label: "Process", Component: ProcessPlane },
  { id: "faq", label: "FAQ", Component: FaqPlane },
  { id: "finale", label: "Signal", Component: FinalePlane },
] as const;

const TOTAL = PLANES.length;
const MONO = "ui-monospace, 'JetBrains Mono', SFMono-Regular, Menlo, monospace";

/* Per-plane transforms: Z -1400 → 0 (sharp) → 600. Blur 8 → 0 → 6. */
function usePlaneTransforms(progress: MotionValue<number>, index: number, total: number) {
  const span = 1 / total;
  const center = span * (index + 0.5);
  const enter = Math.max(0, center - span * 1.05);
  const exit = Math.min(1, center + span * 1.05);

  const z = useTransform(progress, [enter, center, exit], [-1400, 0, 600]);
  const scale = useTransform(progress, [enter, center, exit], [0.8, 1, 1.32]);
  const opacity = useTransform(
    progress,
    [enter, enter + (center - enter) * 0.5, center, center + (exit - center) * 0.55, exit],
    [0.2, 1, 1, 1, 0],
  );
  const rotateX = useTransform(progress, [enter, center, exit], [1.2, 0, -1]);
  const blurPx = useTransform(
    progress,
    [enter, enter + (center - enter) * 0.7, center, center + (exit - center) * 0.3, exit],
    [8, 0, 0, 0, 6],
  );
  const filter = useTransform(blurPx, (v) => `blur(${v.toFixed(2)}px)`);

  return { z, scale, opacity, rotateX, filter };
}

function Plane({
  progress,
  index,
  total,
  children,
}: {
  progress: MotionValue<number>;
  index: number;
  total: number;
  children: React.ReactNode;
}) {
  const { z, scale, opacity, rotateX, filter } = usePlaneTransforms(progress, index, total);
  return (
    <motion.div
      style={{
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transformStyle: "preserve-3d",
        translateZ: z,
        scale,
        rotateX,
        opacity,
        filter,
        willChange: "transform, opacity, filter",
      }}
    >
      <div style={{ width: "min(1280px, 92vw)", height: "min(820px, 88vh)", position: "relative" }}>
        {children}
      </div>
    </motion.div>
  );
}

function TopChrome({ progress, activeIndex }: { progress: MotionValue<number>; activeIndex: number }) {
  const fillX = useTransform(progress, (v) => `${(v * 100).toFixed(2)}%`);
  const depthRead = useTransform(progress, (v) => v.toFixed(2));
  const plane = PLANES[activeIndex];
  const idx = String(activeIndex + 1).padStart(2, "0");
  const total = String(TOTAL).padStart(2, "0");

  return (
    <>
      <div aria-hidden style={{ position: "fixed", top: 0, left: 0, right: 0, height: 2, background: "rgba(244,241,235,0.06)", zIndex: 60, pointerEvents: "none" }}>
        <motion.div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: fillX, background: PALETTE.molten, boxShadow: `0 0 12px ${PALETTE.molten}` }} />
      </div>

      <div style={{ position: "fixed", top: 18, left: 24, zIndex: 55, fontFamily: MONO, fontSize: 11, letterSpacing: "0.2em", color: PALETTE.paper, mixBlendMode: "difference", pointerEvents: "none" }}>
        <span style={{ color: PALETTE.molten, fontWeight: 600 }}>KPT // STRATA v6</span>
        <span style={{ opacity: 0.55, marginLeft: 12 }}>EST. 2004</span>
      </div>

      <div
        role="status"
        aria-live="polite"
        style={{
          position: "fixed",
          top: 14,
          left: "50%",
          translate: "-50% 0",
          zIndex: 55,
          padding: "8px 16px",
          background: "rgba(11,11,15,0.7)",
          border: `1px solid rgba(255,94,26,0.35)`,
          borderRadius: 999,
          backdropFilter: "blur(6px)",
          fontFamily: MONO,
          fontSize: 10,
          letterSpacing: "0.28em",
          color: PALETTE.paper,
          textTransform: "uppercase",
          pointerEvents: "none",
          display: "flex",
          gap: 10,
          alignItems: "center",
        }}
      >
        <span style={{ color: PALETTE.molten, fontWeight: 700 }}>STRATUM {idx}</span>
        <span style={{ opacity: 0.4 }}>/</span>
        <span>{plane.label.toUpperCase()}</span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ opacity: 0.7 }}>
          DEPTH <motion.span style={{ color: PALETTE.molten, fontVariantNumeric: "tabular-nums" }}>{depthRead}</motion.span>
        </span>
        <span style={{ opacity: 0.4 }}>·</span>
        <span style={{ opacity: 0.6 }}>{idx} / {total}</span>
      </div>
    </>
  );
}

function ScrollDotNav({ activeIndex, onJump }: { activeIndex: number; onJump: (i: number) => void }) {
  return (
    <nav
      aria-label="Plane navigation"
      style={{ position: "fixed", right: 22, top: "50%", translate: "0 -50%", zIndex: 55, display: "flex", flexDirection: "column", gap: 14, alignItems: "flex-end" }}
    >
      {PLANES.map((p, i) => {
        const active = i === activeIndex;
        return (
          <button
            key={p.id}
            type="button"
            aria-label={`Jump to ${p.label} plane`}
            aria-current={active ? "true" : undefined}
            onClick={() => onJump(i)}
            className="strata-dot"
            style={{
              position: "relative",
              display: "inline-flex",
              alignItems: "center",
              gap: 10,
              padding: 0,
              border: "none",
              background: "transparent",
              cursor: "pointer",
              fontFamily: MONO,
              fontSize: 9,
              letterSpacing: "0.24em",
              color: active ? PALETTE.molten : "rgba(244,241,235,0.45)",
              textTransform: "uppercase",
              transition: "color 200ms ease",
            }}
          >
            <span
              className="strata-dot-label"
              style={{ opacity: active ? 1 : 0, transition: "opacity 200ms ease", pointerEvents: "none" }}
            >
              {String(i + 1).padStart(2, "0")} · {p.label}
            </span>
            <span
              aria-hidden
              style={{
                width: active ? 12 : 8,
                height: active ? 12 : 8,
                borderRadius: 999,
                background: active ? PALETTE.molten : "rgba(244,241,235,0.35)",
                boxShadow: active ? `0 0 12px ${PALETTE.molten}` : "none",
                transition: "all 220ms ease",
                border: `1px solid ${active ? PALETTE.molten : "rgba(244,241,235,0.5)"}`,
              }}
            />
          </button>
        );
      })}
      <style>{`
        .strata-dot:hover .strata-dot-label { opacity: 1 !important; }
        .strata-dot:focus-visible { outline: 2px solid ${PALETTE.molten}; outline-offset: 4px; }
      `}</style>
    </nav>
  );
}

function BackgroundField({ progress }: { progress: MotionValue<number> }) {
  const hatchY = useTransform(progress, [0, 1], ["0px", "-220px"]);
  const sageOpacity = useTransform(progress, [0, 0.5, 1], [0.18, 0.32, 0.12]);

  return (
    <div aria-hidden style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none", background: PALETTE.void, overflow: "hidden" }}>
      <motion.div
        style={{
          position: "absolute",
          inset: "-10% -10%",
          backgroundImage: [
            `repeating-linear-gradient(45deg, rgba(244,241,235,0.045) 0 1px, transparent 1px 14px)`,
            `repeating-linear-gradient(-45deg, rgba(244,241,235,0.035) 0 1px, transparent 1px 14px)`,
          ].join(", "),
          y: hatchY,
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          left: "12%",
          top: "30%",
          width: "55vmax",
          height: "55vmax",
          background: `radial-gradient(circle at center, ${PALETTE.sage} 0%, transparent 60%)`,
          filter: "blur(80px)",
          opacity: sageOpacity,
          mixBlendMode: "screen",
        }}
      />
      <motion.div
        style={{
          position: "absolute",
          right: "-10%",
          bottom: "-10%",
          width: "45vmax",
          height: "45vmax",
          background: `radial-gradient(circle at center, ${PALETTE.molten} 0%, transparent 55%)`,
          filter: "blur(100px)",
          opacity: 0.18,
          mixBlendMode: "screen",
        }}
      />
      <div style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse at center, transparent 50%, rgba(0,0,0,0.65) 100%)" }} />
    </div>
  );
}

const SKIP_LINK_STYLE: React.CSSProperties = {
  position: "fixed",
  left: -9999,
  top: 0,
  background: PALETTE.molten,
  color: PALETTE.paper,
  padding: "10px 16px",
  zIndex: 100,
  fontFamily: MONO,
  fontSize: 11,
  textTransform: "uppercase",
  letterSpacing: "0.2em",
};

function SkipLink() {
  return (
    <a
      href="#strata-content"
      style={SKIP_LINK_STYLE}
      onFocus={(e) => {
        e.currentTarget.style.left = "16px";
        e.currentTarget.style.top = "16px";
      }}
      onBlur={(e) => {
        e.currentTarget.style.left = "-9999px";
      }}
    >
      Skip to content
    </a>
  );
}

function StaticStack() {
  return (
    <main style={{ background: PALETTE.void, color: PALETTE.paper, minHeight: "100vh" }}>
      <SkipLink />
      <div id="strata-content">
        {PLANES.map((p) => {
          const C = p.Component;
          return (
            <section key={p.id} id={`stratum-${p.id}`} style={{ position: "relative", minHeight: "100vh" }}>
              <C />
            </section>
          );
        })}
      </div>
    </main>
  );
}

export default function StrataEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 110, damping: 28, mass: 0.45, restDelta: 0.0005 });

  useEffect(() => {
    const unsub = smoothProgress.on("change", (v) => {
      const i = Math.min(TOTAL - 1, Math.max(0, Math.floor(v * TOTAL)));
      setActiveIndex(i);
    });
    return () => unsub();
  }, [smoothProgress]);

  const jumpTo = useCallback(
    (i: number) => {
      const target = containerRef.current;
      if (!target) return;
      const rect = target.getBoundingClientRect();
      const totalScrollable = target.offsetHeight - window.innerHeight;
      const t = (i + 0.5) / TOTAL;
      const targetY = window.scrollY + rect.top + totalScrollable * t;
      window.scrollTo({ top: targetY, behavior: reduceMotion ? "auto" : "smooth" });
    },
    [reduceMotion],
  );

  useEffect(() => {
    if (reduceMotion || isMobile) return;
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        jumpTo(Math.min(TOTAL - 1, activeIndex + 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        jumpTo(Math.max(0, activeIndex - 1));
      } else if (e.key === "Escape") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "Home") {
        e.preventDefault();
        jumpTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        jumpTo(TOTAL - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, jumpTo, reduceMotion, isMobile]);

  if (reduceMotion || isMobile) return <StaticStack />;

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: "800vh", background: PALETTE.void, color: PALETTE.paper }}>
      <SkipLink />
      <BackgroundField progress={smoothProgress} />
      <TopChrome progress={smoothProgress} activeIndex={activeIndex} />
      <ScrollDotNav activeIndex={activeIndex} onJump={jumpTo} />

      <div
        id="strata-content"
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          width: "100%",
          overflow: "hidden",
          perspective: "1500px",
          perspectiveOrigin: "50% 45%",
          zIndex: 1,
        }}
      >
        <div aria-hidden style={{ position: "absolute", inset: 28, border: `1px solid rgba(244,241,235,0.06)`, zIndex: 2, pointerEvents: "none" }} />
        <div
          aria-hidden
          style={{
            position: "absolute",
            left: "50%",
            top: 28,
            bottom: 28,
            width: 1,
            background: "linear-gradient(180deg, transparent 0%, rgba(244,241,235,0.06) 20%, rgba(244,241,235,0.06) 80%, transparent 100%)",
            zIndex: 2,
            pointerEvents: "none",
          }}
        />

        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          {PLANES.map((plane, i) => {
            const C = plane.Component;
            return (
              <Plane key={plane.id} progress={smoothProgress} index={i} total={TOTAL}>
                <C />
              </Plane>
            );
          })}
        </div>
      </div>
    </div>
  );
}
