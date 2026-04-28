"use client";

/**
 * TunnelEngine — V5 Tunnel (scroll-IN)
 *
 * Architecture:
 *   ┌───────────────────────────────────────────┐
 *   │ fixed <Canvas>            (z-index 0)     │  ← cosmic tunnel BACKDROP
 *   │ fixed HUD chrome          (z-index 30+)   │  ← progress, dots, pill
 *   │ scrollable 800vh stack    (z-index 10)    │  ← 8 sticky sections, HTML
 *   └───────────────────────────────────────────┘
 *
 * The tunnel is the spectacle. Content is plain HTML on top so it stays
 * razor-sharp. Scroll progress drives BOTH the R3F camera advance AND
 * per-section opacity fades.
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
  useRef,
  useState,
} from "react";
import { Canvas } from "@react-three/fiber";
import { JetBrains_Mono, Inter } from "next/font/google";
import {
  useScroll,
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

/* --------------------------- smooth scroll helper ------------------------ */

let smoothScrollRaf = 0;

/**
 * rAF-driven smooth scroll that bypasses any global smooth-scroll lib that
 * might have hijacked `window.scrollTo`. We use `document.documentElement.scrollTop`
 * directly each frame because that property assignment can't be intercepted
 * the same way the scrollTo function calls can.
 */
function smoothScrollTo(targetY: number, durationMs = 700) {
  const startY = window.scrollY;
  const delta = targetY - startY;
  if (Math.abs(delta) < 1) return;
  const startT = performance.now();
  const ease = (t: number) => 1 - Math.pow(1 - t, 3);
  cancelAnimationFrame(smoothScrollRaf);
  const step = (now: number) => {
    const elapsed = now - startT;
    const t = Math.min(1, elapsed / durationMs);
    const y = startY + delta * ease(t);
    // Set scrollTop on both root candidates — covers Webkit + Gecko + any
    // patched window.scrollTo wrapper.
    document.documentElement.scrollTop = y;
    document.body.scrollTop = y;
    if (t < 1) smoothScrollRaf = requestAnimationFrame(step);
  };
  smoothScrollRaf = requestAnimationFrame(step);
}

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
/* CONTENT LAYER — sticky sections w/ opacity tied to scroll progress    */
/* ===================================================================== */

/**
 * Each section is sticky inside its own 100vh parent — the parent's scroll
 * range determines when the section is visible. No per-section opacity
 * transform (an earlier version used `useTransform` per child but that
 * crashed under Turbopack production minification — `e.on is not a function`
 * during render). Sticky positioning handles the visibility transitions.
 */
function ContentSection({
  cp,
  isFirst,
}: {
  cp: CheckpointDef;
  isFirst: boolean;
}) {
  return (
    <section
      id={cp.id}
      aria-label={cp.label}
      style={{ position: "relative", height: "100vh", width: "100%" }}
    >
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "calc(env(safe-area-inset-top) + 70px) 16px 70px",
        }}
      >
        {isFirst ? <h1 className="kpt-sr-only">KPT Designs — Tunnel</h1> : null}
        <cp.Component />
      </div>
    </section>
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

/* ------------------------ desktop: full tunnel --------------------------- */

function DesktopTunnel() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef(0);

  // If a global Lenis instance is still alive (it might be from before the
  // route changed), destroy it so native scroll APIs work. Lenis hijacks
  // window.scrollTo / scrollTop but releases them on .destroy().
  const lenis = useLenis();
  useEffect(() => {
    if (lenis && typeof lenis.destroy === "function") {
      lenis.destroy();
    }
  }, [lenis]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // mirror scroll progress into a ref for the R3F render loop
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      progressRef.current = v;
    });
  }, [scrollYProgress]);

  // active section index — for pill + dots
  const [activeIndex, setActiveIndex] = useState(0);
  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const i = Math.min(N - 1, Math.max(0, Math.floor(v * N)));
      setActiveIndex(i);
    });
  }, [scrollYProgress]);

  // Jump to a checkpoint with a custom JS-driven smooth scroll. We avoid the
  // platform smooth-scroll APIs because some other smooth-scroll lib higher
  // in the tree (e.g. Lenis) can swallow the call even after it nominally
  // unmounts. A plain rAF tween always works.
  const jumpToById = useCallback((i: number) => {
    const clamped = Math.min(N - 1, Math.max(0, i));
    const cp = CHECKPOINTS[clamped];
    if (!cp) return;
    const el = document.getElementById(cp.id);
    let target = 0;
    if (el) {
      target = el.getBoundingClientRect().top + window.scrollY;
    } else if (containerRef.current) {
      const c = containerRef.current;
      const total = c.scrollHeight - window.innerHeight;
      target = c.offsetTop + (clamped / N) * total;
    }
    smoothScrollTo(target);
  }, []);

  // keyboard navigation
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        jumpToById(Math.min(N - 1, activeIndex + 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        jumpToById(Math.max(0, activeIndex - 1));
      } else if (e.key === "Escape" || e.key === "Home") {
        e.preventDefault();
        smoothScrollTo(0);
      } else if (e.key === "End") {
        e.preventDefault();
        jumpToById(N - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, jumpToById]);

  return (
    <div
      className={`${mono.variable} ${display.variable}`}
      style={{
        position: "relative",
        background: PALETTE.void,
        color: PALETTE.white,
        fontFamily: "var(--v5-display), system-ui",
      }}
    >
      <a href="#tunnel-content" className="kpt-skip" style={skipLinkStyle}>Skip to content</a>

      {/* fixed canvas backdrop */}
      <div
        aria-hidden
        style={{
          position: "fixed",
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

      {/* scrollable content layer — 800vh */}
      <div ref={containerRef} id="tunnel-content" style={{ position: "relative", zIndex: 10 }}>
        {CHECKPOINTS.map((cp, i) => (
          <ContentSection key={cp.id} cp={cp} isFirst={i === 0} />
        ))}
      </div>

      {/* HUD chrome */}
      <ProgressBar scrollYProgress={scrollYProgress} />
      <SectionPill scrollYProgress={scrollYProgress} activeIndex={activeIndex} checkpoints={CHECKPOINTS} />
      <ScrollDots activeIndex={activeIndex} onJump={jumpToById} checkpoints={CHECKPOINTS} />
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
      `}</style>
    </div>
  );
}
