"use client";

/**
 * LiquidEngine — V22 Liquid Metal (snap-to-station, NOT continuous scrub)
 *
 * Architecture (matches V5 Tunnel canonical pattern):
 *   ┌───────────────────────────────────────────┐
 *   │ 100vh wrapper, overflow:hidden            │  ← single viewport (NO page scroll)
 *   │  ├─ fixed <Canvas>            (z 0)       │  ← molten chrome SHADER backdrop
 *   │  ├─ overlay panel layer       (z 10)      │  ← 8 absolutely-positioned panels
 *   │  └─ fixed HUD chrome          (z 30+)     │  ← progress, dots, prev/next, hint
 *   └───────────────────────────────────────────┘
 *
 * Discrete page snap:
 *   - `targetStationRef` : integer 0..N-1, the station the user wants to be on
 *   - `progressRef`      : 0..1, lerped toward `targetStation/(N-1)`
 *   - `sectionUniformRef`: progressRef * (N-1), feeds shader uSection (continuous morph)
 *   - Wheel : any deltaY past WHEEL_NOTCH advances ±1, then 1.5s FIXED cooldown
 *   - Touch : per-swipe distance threshold — one swipe == one station
 *   - Keys  : Arrow/PageDn/Space → +1 ; Arrow/PageUp → -1 ; Home/Esc → 0 ; End → N-1
 *   - Dots  : click → set targetStation directly
 *
 * Forward-flight (V22-specific):
 *   - On each advance, intensityRef spikes to 1.2 (violent ripple during transit)
 *   - Shader uSection lerps slowly (~0.7s) toward target — feels like a forge-shift
 *   - Settled state: ripples dampen to 0, surface becomes calm chrome with locked tint
 *
 * Settled detection:
 *   When |progress - target/(N-1)| < 0.005 AND no input for 100ms, the active
 *   panel becomes FULLY INTERACTIVE (pointer-events:auto, blue settle outline).
 *
 * Mobile (<768px) → CSS chrome gradient fallback.
 * Reduced-motion → frozen shader, simple vertical layout.
 */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Inter, JetBrains_Mono } from "next/font/google";
import { motionValue, useReducedMotion, useTransform, motion, type MotionValue } from "framer-motion";
import * as THREE from "three";

import HeroLiquid from "../_sections/HeroLiquid";
import PhilosophyLiquid from "../_sections/PhilosophyLiquid";
import StackLiquid from "../_sections/StackLiquid";
import TelemetryLiquid from "../_sections/TelemetryLiquid";
import PortfolioLiquid from "../_sections/PortfolioLiquid";
import ProcessLiquid from "../_sections/ProcessLiquid";
import FaqLiquid from "../_sections/FaqLiquid";
import CtaLiquid from "../_sections/CtaLiquid";

/* --------------------------------- fonts --------------------------------- */

const display = Inter({
  subsets: ["latin"],
  weight: ["100", "200", "400", "700", "800", "900"],
  style: ["normal", "italic"],
  variable: "--v22-display",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--v22-mono",
});
const FONT_VARS = `${mono.variable} ${display.variable}`;

const PALETTE = {
  void: "#020306",
  shadow: "#1A1F2A",
  mid: "#5A6878",
  hi: "#C8D4E0",
  mirror: "#EAF1FA",
  blue: "#3D8BFF",
  cyan: "#00E5FF",
  warm: "#FFD7B5",
};

/* ---------- snap / settle tunables (match V5 Tunnel canonical) ---------- */
const WHEEL_NOTCH = 50;            // any meaningful scroll triggers advance
const WHEEL_COOLDOWN_MS = 1500;    // FIXED lockout between advances
const TOUCH_THRESHOLD = 80;        // px swipe distance per station
const SETTLE_EPSILON = 0.005;
const SETTLE_IDLE_MS = 100;
const LERP_FACTOR = 0.055;         // slow forge-shift feel — ~0.7s morph

type SectionDef = {
  id: string;
  num: string;
  label: string;
  long: string;
  Component: React.ComponentType;
};

const SECTIONS: SectionDef[] = [
  { id: "hero",       num: "01", label: "INGOT",      long: "INGOT 01 / FORGE",       Component: HeroLiquid },
  { id: "philosophy", num: "02", label: "DOCTRINE",   long: "INGOT 02 / DOCTRINE",    Component: PhilosophyLiquid },
  { id: "stack",      num: "03", label: "STACK",      long: "INGOT 03 / STACK",       Component: StackLiquid },
  { id: "telemetry",  num: "04", label: "TELEMETRY",  long: "INGOT 04 / TELEMETRY",   Component: TelemetryLiquid },
  { id: "portfolio",  num: "05", label: "ARCHIVE",    long: "INGOT 05 / ARCHIVE",     Component: PortfolioLiquid },
  { id: "process",    num: "06", label: "PROCESS",    long: "INGOT 06 / FORGING",     Component: ProcessLiquid },
  { id: "faq",        num: "07", label: "QUERIES",    long: "INGOT 07 / QUERIES",     Component: FaqLiquid },
  { id: "cta",        num: "08", label: "DELIVERY",   long: "INGOT 08 / DELIVERY",    Component: CtaLiquid },
];
const N = SECTIONS.length;

/* ============================================================================
   GLSL SHADER — chrome / mercury surface
   ============================================================================ */

const VERT = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

// FBM-driven warped UV → gradient → procedural sky reflection + specular.
// Section uniform shifts hue, noise scale, ripple amplitude.
const FRAG = /* glsl */ `
  precision highp float;
  varying vec2 vUv;
  uniform float uTime;
  uniform float uScroll;
  uniform float uSection;     // 0..7 continuous (lerped toward target)
  uniform vec2  uMouse;       // -1..1
  uniform vec2  uResolution;
  uniform float uIntensity;   // 0..1.2, kicked on station advance for violent ripples

  // hash + value noise
  vec2 hash22(vec2 p) {
    p = vec2(dot(p, vec2(127.1, 311.7)), dot(p, vec2(269.5, 183.3)));
    return -1.0 + 2.0 * fract(sin(p) * 43758.5453123);
  }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    vec2 u = f*f*(3.0-2.0*f);
    return mix(
      mix(dot(hash22(i+vec2(0,0)), f-vec2(0,0)),
          dot(hash22(i+vec2(1,0)), f-vec2(1,0)), u.x),
      mix(dot(hash22(i+vec2(0,1)), f-vec2(0,1)),
          dot(hash22(i+vec2(1,1)), f-vec2(1,1)), u.x),
      u.y);
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    mat2 r = mat2(0.8, -0.6, 0.6, 0.8);
    for (int i = 0; i < 5; i++) {
      v += a * noise(p);
      p = r * p * 2.05 + vec2(uTime * 0.04, -uTime * 0.03);
      a *= 0.5;
    }
    return v;
  }

  // procedural chrome sky based on warped normal
  vec3 chromeSky(vec3 n, float sec) {
    float y = clamp(n.y * 0.5 + 0.5, 0.0, 1.0);
    vec3 sky    = vec3(0.784, 0.831, 0.878);   // C8D4E0
    vec3 horiz  = vec3(0.353, 0.408, 0.470);   // 5A6878
    vec3 ground = vec3(0.102, 0.122, 0.165);   // 1A1F2A
    vec3 col = mix(ground, horiz, smoothstep(0.0, 0.5, y));
    col = mix(col, sky, smoothstep(0.45, 1.0, y));

    // section tint — drift between cool blue, plasma, warm reflection
    float s = mod(sec, 8.0) / 8.0;
    vec3 tintA = vec3(0.239, 0.545, 1.0);    // 3D8BFF
    vec3 tintB = vec3(0.0, 0.898, 1.0);      // 00E5FF
    vec3 tintC = vec3(1.0, 0.843, 0.710);    // FFD7B5
    vec3 tintD = vec3(0.918, 0.945, 0.980);  // EAF1FA
    vec3 tint = mix(tintA, tintB, smoothstep(0.0, 0.33, s));
    tint = mix(tint, tintC, smoothstep(0.33, 0.66, s));
    tint = mix(tint, tintD, smoothstep(0.66, 1.0, s));
    col = mix(col, col * 1.05 + tint * 0.18, 0.55);
    return col;
  }

  void main() {
    vec2 uv = vUv;
    vec2 p = (uv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0);

    // section-driven flow — ripple amplifies dramatically during transit
    float sec = uSection;
    float ripple = 0.55 + 0.35 * sin(sec * 0.9 + uTime * 0.18) + uIntensity * 0.95;
    float scale = 1.6 + 0.55 * sin(sec * 0.6) + uScroll * 0.4;

    // mouse + scroll add subtle swirl, intensity kicks the warp harder
    vec2 m = uMouse * 0.35;
    vec2 q = p * scale + vec2(uScroll * 0.6, -uScroll * 0.4) + m;

    // domain-warp for fluid feel — violent during transit
    vec2 warp = vec2(
      fbm(q + vec2(0.0, uTime * 0.05)),
      fbm(q + vec2(5.2, -uTime * 0.04))
    );
    vec2 q2 = q + warp * (1.1 + ripple * 0.55);

    // base height field
    float h = fbm(q2);
    h += 0.35 * abs(fbm(q2 * 2.4 - 1.7));

    // gradient → normal (intensity puffs up the surface during dive)
    float e = 0.0025;
    float hx = fbm(q2 + vec2(e, 0.0)) - fbm(q2 - vec2(e, 0.0));
    float hy = fbm(q2 + vec2(0.0, e)) - fbm(q2 - vec2(0.0, e));
    vec3 n = normalize(vec3(-hx, -hy, 0.55 + uIntensity * 0.55));

    // base reflection
    vec3 col = chromeSky(n, sec);

    // specular — sharp
    float spec = pow(max(0.0, n.y * 0.6 + n.z * 0.7), 22.0);
    col += vec3(0.95, 0.97, 1.0) * spec * 0.55;

    // anisotropic streaks — chrome bands
    float band = 0.5 + 0.5 * sin((q2.y * 6.0) + (q2.x * 1.4) + uTime * 0.25);
    band = pow(band, 3.0);
    col += vec3(0.18, 0.22, 0.30) * band * 0.18;

    // chromatic dispersion on highlights — prismatic
    float disp = pow(max(0.0, spec), 1.6);
    col.r += disp * 0.10;
    col.b += disp * 0.06;

    // electric blue / cyan accent on ridges — louder during transit
    float plasma = smoothstep(0.55, 0.95, h) * (0.4 + 0.8 * uIntensity);
    vec3 accent = mix(vec3(0.239, 0.545, 1.0), vec3(0.0, 0.898, 1.0), 0.5 + 0.5 * sin(sec * 0.7));
    col = mix(col, accent, plasma * 0.28);

    // vignette
    float r = length(p);
    col *= smoothstep(1.35, 0.35, r);

    // base void darkening so type reads
    col *= 0.86;

    // gentle film grain
    float grain = (fract(sin(dot(uv * uResolution, vec2(12.9898,78.233))) * 43758.5453) - 0.5) * 0.018;
    col += grain;

    gl_FragColor = vec4(col, 1.0);
  }
`;

/* --------------------------------- plane --------------------------------- */

function ShaderPlane({
  scrollRef,
  sectionRef,
  intensityRef,
  mouseRef,
  frozen,
}: {
  scrollRef: React.MutableRefObject<number>;
  sectionRef: React.MutableRefObject<number>;
  intensityRef: React.MutableRefObject<number>;
  mouseRef: React.MutableRefObject<{ x: number; y: number }>;
  frozen?: boolean;
}) {
  const { size } = useThree();
  const matRef = useRef<THREE.ShaderMaterial>(null);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uScroll: { value: 0 },
      uSection: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uIntensity: { value: 0 },
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  );

  useEffect(() => {
    if (matRef.current) {
      (matRef.current.uniforms.uResolution.value as THREE.Vector2).set(size.width, size.height);
    }
  }, [size]);

  useFrame((_, dt) => {
    if (!matRef.current) return;
    const u = matRef.current.uniforms;
    if (!frozen) {
      u.uTime.value += dt;
    }
    // uSection lerps slowly (~0.7s) — matches the "forge-shift" feel.
    const target = sectionRef.current;
    const cur = u.uSection.value as number;
    u.uSection.value = cur + (target - cur) * Math.min(1, dt * 1.4);

    const sCur = u.uScroll.value as number;
    u.uScroll.value = sCur + (scrollRef.current - sCur) * Math.min(1, dt * 3.0);

    // Intensity rises fast, decays slowly so ripples linger violently during
    // transit and only dampen once the user has settled.
    const iCur = u.uIntensity.value as number;
    u.uIntensity.value = iCur + (intensityRef.current - iCur) * Math.min(1, dt * 2.4);
    intensityRef.current = Math.max(0, intensityRef.current - dt * 0.55);

    const mv = u.uMouse.value as THREE.Vector2;
    mv.x += (mouseRef.current.x - mv.x) * Math.min(1, dt * 2.5);
    mv.y += (mouseRef.current.y - mv.y) * Math.min(1, dt * 2.5);
  });

  return (
    <mesh frustumCulled={false}>
      <planeGeometry args={[2, 2]} />
      <shaderMaterial
        ref={matRef}
        vertexShader={VERT}
        fragmentShader={FRAG}
        uniforms={uniforms}
        depthTest={false}
        depthWrite={false}
      />
    </mesh>
  );
}

/* ============================================================================
   HUD chrome
   ============================================================================ */

function ProgressBar({ scrollYProgress }: { scrollYProgress: MotionValue<number> }) {
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);
  return (
    <div
      aria-hidden
      style={{
        position: "fixed", top: 0, left: 0, right: 0, height: 2, zIndex: 60,
        background: `${PALETTE.hi}1a`, pointerEvents: "none",
      }}
    >
      <motion.div
        style={{
          height: "100%",
          background: `linear-gradient(90deg, ${PALETTE.hi} 0%, ${PALETTE.blue} 60%, ${PALETTE.cyan} 100%)`,
          transformOrigin: "left",
          scaleX,
          boxShadow: `0 0 14px ${PALETTE.blue}aa`,
        }}
      />
    </div>
  );
}

function SectionPill({
  activeIndex, sections,
}: {
  activeIndex: number; sections: SectionDef[];
}) {
  const cp = sections[activeIndex] ?? sections[0];
  return (
    <div
      aria-live="polite"
      style={{
        position: "fixed", top: 14, left: "50%", transform: "translateX(-50%)",
        zIndex: 55, padding: "8px 16px",
        border: `1px solid ${PALETTE.hi}40`,
        background: "rgba(2,3,6,0.55)",
        backdropFilter: "blur(10px)",
        WebkitBackdropFilter: "blur(10px)",
        fontFamily: "var(--v22-mono), monospace",
        fontSize: 11, letterSpacing: "0.28em",
        color: PALETTE.hi, textTransform: "uppercase",
        boxShadow: `inset 0 0 0 1px ${PALETTE.hi}10, 0 8px 30px rgba(0,0,0,0.55)`,
        pointerEvents: "none", whiteSpace: "nowrap",
        maxWidth: "min(640px, 92vw)",
      }}
    >
      § <span style={{ color: PALETTE.mirror }}>{cp.num}</span> / {cp.label}{" "}
      <span style={{ color: `${PALETTE.hi}55` }}>·</span>{" "}
      <span style={{ color: PALETTE.blue }}>{cp.long} · {String(activeIndex + 1).padStart(2, "0")}/{String(N).padStart(2, "0")}</span>
    </div>
  );
}

function ScrollDots({
  activeIndex, settledIndex, onJump, sections,
}: {
  activeIndex: number; settledIndex: number | null; onJump: (i: number) => void; sections: SectionDef[];
}) {
  return (
    <nav
      aria-label="Liquid sections"
      style={{
        position: "fixed", right: 22, top: "50%", transform: "translateY(-50%)",
        zIndex: 55, display: "flex", flexDirection: "column", gap: 14,
      }}
    >
      {sections.map((cp, i) => {
        const active = i === activeIndex;
        const settled = i === settledIndex;
        return (
          <button
            key={cp.id}
            type="button"
            onClick={() => onJump(i)}
            aria-label={`Jump to ${cp.label}`}
            aria-current={active ? "true" : undefined}
            className="kpt-dot22"
            style={{
              all: "unset",
              cursor: "pointer",
              width: 11, height: 11,
              borderRadius: 999,
              border: `1px solid ${active ? PALETTE.blue : `${PALETTE.hi}55`}`,
              background: active
                ? `radial-gradient(circle at 30% 30%, ${PALETTE.mirror}, ${PALETTE.mid})`
                : "transparent",
              boxShadow: settled
                ? `0 0 0 3px ${PALETTE.blue}55, 0 0 18px ${PALETTE.blue}cc`
                : active
                ? `0 0 0 3px ${PALETTE.blue}33, 0 0 14px ${PALETTE.blue}aa`
                : "none",
              position: "relative",
              transition: "all 320ms cubic-bezier(0.16, 1, 0.3, 1)",
              outline: "none",
            }}
          >
            <span
              className="kpt-dot22-label"
              style={{
                position: "absolute", right: 20, top: "50%", transform: "translateY(-50%)",
                padding: "5px 10px",
                background: "rgba(2,3,6,0.92)",
                border: `1px solid ${PALETTE.hi}55`,
                fontFamily: "var(--v22-mono), monospace",
                fontSize: 10, letterSpacing: "0.24em",
                color: PALETTE.hi, textTransform: "uppercase",
                whiteSpace: "nowrap",
                opacity: 0, pointerEvents: "none",
                transition: "opacity 240ms",
              }}
            >
              {cp.num} / {cp.label}
            </span>
          </button>
        );
      })}
      <style>{`
        .kpt-dot22:hover .kpt-dot22-label,
        .kpt-dot22:focus-visible .kpt-dot22-label { opacity: 1; }
        .kpt-dot22:focus-visible {
          box-shadow: 0 0 0 3px ${PALETTE.blue}55, 0 0 18px ${PALETTE.blue};
        }
      `}</style>
    </nav>
  );
}

function CornerHud() {
  const positions: Array<{ top?: number; bottom?: number; left?: number; right?: number }> = [
    { top: 26, left: 16 }, { top: 26, right: 16 },
    { bottom: 18, left: 16 }, { bottom: 18, right: 16 },
  ];
  return (
    <>
      {positions.map((pos, i) => (
        <span
          key={i}
          aria-hidden
          style={{
            position: "fixed", zIndex: 50,
            width: 14, height: 14,
            borderTop: pos.top !== undefined ? `1px solid ${PALETTE.hi}55` : "none",
            borderBottom: pos.bottom !== undefined ? `1px solid ${PALETTE.hi}55` : "none",
            borderLeft: pos.left !== undefined ? `1px solid ${PALETTE.hi}55` : "none",
            borderRight: pos.right !== undefined ? `1px solid ${PALETTE.hi}55` : "none",
            ...pos, pointerEvents: "none",
          }}
        />
      ))}
      <div
        aria-hidden
        style={{
          position: "fixed", bottom: 14, left: "50%", transform: "translateX(-50%)",
          zIndex: 50,
          fontFamily: "var(--v22-mono), monospace",
          fontSize: 9, letterSpacing: "0.36em",
          color: `${PALETTE.hi}88`, textTransform: "uppercase",
          pointerEvents: "none", whiteSpace: "nowrap",
        }}
      >
        SCROLL · ARROW KEYS · DOTS → ADVANCE
      </div>
    </>
  );
}

const skipLinkStyle: React.CSSProperties = {
  position: "absolute", left: -9999, top: 8, zIndex: 100,
  background: PALETTE.blue, color: PALETTE.void,
  padding: "8px 14px",
  fontFamily: "var(--v22-mono), monospace",
  fontSize: 11, letterSpacing: "0.24em",
  textTransform: "uppercase", textDecoration: "none", fontWeight: 600,
};

/* ============================================================================
   Mobile fallback (no Canvas) — vertical scroll, untouched from prior version
   ============================================================================ */

function MobileFallback() {
  return (
    <div
      className={FONT_VARS}
      style={{
        background: PALETTE.void, color: PALETTE.mirror,
        minHeight: "100vh",
        fontFamily: "var(--v22-display), system-ui",
        position: "relative", overflow: "hidden",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          background: `
            linear-gradient(135deg, ${PALETTE.shadow} 0%, ${PALETTE.mid} 35%, ${PALETTE.hi} 50%, ${PALETTE.mid} 65%, ${PALETTE.shadow} 100%)
          `,
          backgroundSize: "200% 200%",
          animation: "v22-chrome-drift 18s ease-in-out infinite alternate",
          opacity: 0.4,
        }}
      />
      <header
        style={{
          position: "sticky", top: 0, zIndex: 50,
          padding: "12px 16px",
          background: "rgba(2,3,6,0.88)",
          borderBottom: `1px solid ${PALETTE.hi}30`,
          fontFamily: "var(--v22-mono), monospace",
          fontSize: 10, letterSpacing: "0.18em",
          color: PALETTE.hi,
          display: "flex", justifyContent: "space-between", textTransform: "uppercase",
        }}
      >
        <span>KPT // LIQUID · MOBILE</span>
        <span style={{ color: PALETTE.blue }}>EST. 2004</span>
      </header>
      <a href="#m-main" className="kpt-skip" style={skipLinkStyle}>Skip to content</a>
      <main id="m-main" style={{ position: "relative", zIndex: 1 }}>
        {SECTIONS.map((cp, i) => (
          <section
            key={cp.id} id={cp.id} aria-label={cp.label}
            style={{
              padding: "60px 16px",
              borderTop: i > 0 ? `1px dashed ${PALETTE.hi}24` : "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--v22-mono), monospace",
                fontSize: 10, letterSpacing: "0.28em",
                color: PALETTE.blue, marginBottom: 14, textTransform: "uppercase",
              }}
            >
              §{cp.num} / {cp.label}
            </div>
            <cp.Component />
          </section>
        ))}
      </main>
      <style>{`
        @keyframes v22-chrome-drift {
          0%   { background-position: 0% 0%; }
          100% { background-position: 100% 100%; }
        }
      `}</style>
    </div>
  );
}

/* ============================================================================
   Reduced-motion fallback — vertical stack
   ============================================================================ */

function ReducedMotionFallback() {
  return (
    <div
      className={FONT_VARS}
      style={{
        background: PALETTE.void, color: PALETTE.mirror,
        minHeight: "100vh", position: "relative",
        fontFamily: "var(--v22-display), system-ui",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          background: `
            radial-gradient(ellipse at center, ${PALETTE.mid}40 0%, ${PALETTE.shadow}aa 60%, ${PALETTE.void} 100%)
          `,
        }}
      />
      <a href="#rm-main" style={skipLinkStyle} className="kpt-skip">Skip to content</a>
      <main id="rm-main" style={{ position: "relative", zIndex: 1 }}>
        {SECTIONS.map((cp, i) => (
          <section
            key={cp.id} id={cp.id} aria-label={cp.label}
            style={{
              padding: "100px 16px",
              borderTop: i > 0 ? `1px dashed ${PALETTE.hi}24` : "none",
            }}
          >
            <div
              style={{
                fontFamily: "var(--v22-mono), monospace",
                fontSize: 10, letterSpacing: "0.32em",
                color: PALETTE.blue, textAlign: "center",
                marginBottom: 24, textTransform: "uppercase",
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

/* ============================================================================
   Desktop — snap-to-station, settle-aware interactivity
   ============================================================================ */

function DesktopLiquid() {
  const wrapperRef = useRef<HTMLDivElement | null>(null);
  const overlayRef = useRef<HTMLDivElement | null>(null);

  // Shader uniform refs
  const scrollProgressRef = useRef(0);          // 0..1 (lerped, mirrors progressRef)
  const sectionUniformRef = useRef(0);          // 0..N-1 (continuous shader morph target)
  const intensityRef = useRef(0);               // 0..1.2 spike on advance
  const mouseRef = useRef({ x: 0, y: 0 });

  // Discrete navigation refs (V5 pattern)
  const progressRef = useRef(0);                // 0..1, lerped each frame
  const targetStationRef = useRef(0);           // integer 0..N-1
  const wheelAccumRef = useRef(0);
  const wheelCooldownUntilRef = useRef(0);
  const touchStartYRef = useRef<number | null>(null);
  const touchFiredRef = useRef(false);
  const lastInputAtRef = useRef(0);
  const settledIdxRef = useRef<number | null>(null);

  // MotionValue mirror for ProgressBar
  const scrollYProgress = useMemo(() => motionValue(0), []);

  const [activeIndex, setActiveIndex] = useState(0);
  const [settledIndex, setSettledIndex] = useState<number | null>(0);

  /* ---------- station mutators ---------- */
  const setStation = useCallback((i: number) => {
    const clamped = Math.max(0, Math.min(N - 1, i));
    if (clamped !== targetStationRef.current) {
      targetStationRef.current = clamped;
      // Spike intensity for forward-flight ripple violence
      intensityRef.current = 1.2;
      // Reset wheel accumulator + start FIXED cooldown
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
      // If wheel happens inside settled panel AND that panel can still scroll
      // in the wheel direction, let it scroll natively.
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
        // FIXED cooldown — discard input until lockout expires.
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

  /* ---------- mouse parallax for shader ---------- */
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -((e.clientY / window.innerHeight) * 2 - 1);
      mouseRef.current.x = x;
      mouseRef.current.y = y;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

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

      // Feed shader: scroll = 0..1, section = 0..N-1 continuous
      scrollProgressRef.current = clamped;
      sectionUniformRef.current = clamped * (N - 1);

      const idx = targetStationRef.current;
      if (idx !== lastIdx) {
        lastIdx = idx;
        setActiveIndex(idx);
      }

      // Settled detection
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

      // Imperative panel styling — opacity / scale / blur from |progress - station|
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

  const settledLabel =
    settledIndex !== null ? SECTIONS[settledIndex]?.label : null;
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
        color: PALETTE.mirror,
        fontFamily: "var(--v22-display), system-ui",
        overscrollBehavior: "none",
        touchAction: "none",
      }}
    >
      <a href="#liquid-main" className="kpt-skip" style={skipLinkStyle}>Skip to content</a>

      {/* fixed shader backdrop */}
      <div
        aria-hidden
        style={{
          position: "absolute", inset: 0, zIndex: 0, pointerEvents: "none",
          background: PALETTE.void,
        }}
      >
        <Canvas
          gl={{ antialias: false, alpha: false, powerPreference: "high-performance" }}
          dpr={[1, 1.5]}
          camera={{ position: [0, 0, 1], near: 0.1, far: 10 }}
          style={{ position: "absolute", inset: 0 }}
        >
          <ShaderPlane
            scrollRef={scrollProgressRef}
            sectionRef={sectionUniformRef}
            intensityRef={intensityRef}
            mouseRef={mouseRef}
          />
        </Canvas>
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0,
            background: "radial-gradient(ellipse at center, rgba(2,3,6,0) 45%, rgba(2,3,6,0.78) 100%)",
          }}
        />
        <div
          aria-hidden
          style={{
            position: "absolute", inset: 0, opacity: 0.4,
            background: "repeating-linear-gradient(0deg, rgba(234,241,250,0.018) 0px, rgba(234,241,250,0.018) 1px, transparent 1px, transparent 3px)",
            mixBlendMode: "screen",
          }}
        />
      </div>

      {/* overlay panel layer */}
      <div
        id="liquid-main"
        ref={overlayRef}
        style={{
          position: "absolute", inset: 0, zIndex: 10,
          perspective: "1400px",
          perspectiveOrigin: "50% 50%",
        }}
      >
        {SECTIONS.map((cp, i) => {
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
              {i === 0 ? <h1 className="kpt-sr-only">KPT Designs — Liquid Metal</h1> : null}
              <cp.Component />
            </div>
          );
        })}
      </div>

      {/* HUD chrome */}
      <ProgressBar scrollYProgress={scrollYProgress} />
      <SectionPill activeIndex={activeIndex} sections={SECTIONS} />
      <ScrollDots activeIndex={activeIndex} settledIndex={settledIndex} onJump={setStation} sections={SECTIONS} />
      <CornerHud />

      {/* prev / next overlay buttons (top-right) */}
      <div style={{ position: "fixed", top: 56, right: 56, zIndex: 56, display: "flex", gap: 8 }}>
        <button
          type="button"
          onClick={() => advanceStation(-1)}
          disabled={atFirst}
          aria-label="Previous station"
          className="kpt-nav-btn22"
          style={{ opacity: atFirst ? 0.32 : 1, cursor: atFirst ? "default" : "pointer" }}
        >
          ↑
        </button>
        <button
          type="button"
          onClick={() => advanceStation(1)}
          disabled={atLast}
          aria-label="Next station"
          className="kpt-nav-btn22"
          style={{ opacity: atLast ? 0.32 : 1, cursor: atLast ? "default" : "pointer" }}
        >
          ↓
        </button>
      </div>

      {/* bottom-center "scroll for next" hint — only when settled & not last */}
      <div
        aria-hidden
        className={`kpt-next-hint22 ${settledIndex !== null && !atLast ? "is-on" : ""}`}
        style={{
          position: "fixed",
          bottom: 38,
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 51,
          fontFamily: "var(--v22-mono), monospace",
          fontSize: 10,
          letterSpacing: "0.32em",
          textTransform: "uppercase",
          color: PALETTE.blue,
          whiteSpace: "nowrap",
          display: "flex",
          alignItems: "center",
          gap: 10,
          pointerEvents: "none",
        }}
      >
        <span>SCROLL FOR NEXT</span>
        <span className="kpt-next-arrow22">↓</span>
      </div>

      {/* ARIA live region — announces settled station */}
      <div role="status" aria-live="polite" aria-atomic="true" className="kpt-sr-only">
        {settledLabel ? `Active: ${settledLabel}` : ""}
      </div>

      <style>{`
        .kpt-sr-only { position: absolute !important; width: 1px; height: 1px; margin: -1px; padding: 0; overflow: hidden; clip: rect(0,0,0,0); white-space: nowrap; border: 0; }
        .kpt-skip:focus { left: 8px !important; outline: 2px solid ${PALETTE.blue}; }
        html, body { overflow: hidden !important; height: 100%; }
        .kpt-panel-settled { box-shadow: 0 0 0 1px ${PALETTE.blue}66, 0 0 28px ${PALETTE.blue}33, 0 0 80px ${PALETTE.blue}1a; transition: box-shadow 360ms ease-out; }
        .kpt-nav-btn22 { all: unset; width: 36px; height: 36px; display: inline-flex; align-items: center; justify-content: center; border: 1px solid ${PALETTE.blue}55; background: rgba(2,3,6,0.78); color: ${PALETTE.blue}; font-family: var(--v22-mono), monospace; font-size: 16px; letter-spacing: 0.04em; backdrop-filter: blur(8px); -webkit-backdrop-filter: blur(8px); transition: background 200ms, border-color 200ms, transform 200ms, box-shadow 200ms; }
        .kpt-nav-btn22:hover:not(:disabled) { background: ${PALETTE.blue}1a; border-color: ${PALETTE.blue}; box-shadow: 0 0 14px ${PALETTE.blue}66; transform: translateY(-1px); }
        .kpt-nav-btn22:focus-visible { outline: none; box-shadow: 0 0 0 2px ${PALETTE.cyan}, 0 0 14px ${PALETTE.blue}66; }
        .kpt-nav-btn22:disabled { cursor: default; }
        .kpt-next-hint22 { opacity: 0; transition: opacity 600ms ease-out; }
        .kpt-next-hint22.is-on { opacity: 0.85; }
        .kpt-next-arrow22 { display: inline-block; animation: kpt-bounce22 1.6s ease-in-out infinite; }
        @keyframes kpt-bounce22 { 0%, 100% { transform: translateY(0); opacity: 0.6; } 50% { transform: translateY(4px); opacity: 1; } }
        [data-panel]::-webkit-scrollbar { width: 6px; }
        [data-panel]::-webkit-scrollbar-track { background: transparent; }
        [data-panel]::-webkit-scrollbar-thumb { background: ${PALETTE.blue}33; border-radius: 3px; }
        [data-panel]::-webkit-scrollbar-thumb:hover { background: ${PALETTE.blue}66; }
        @media (prefers-reduced-motion: reduce) { .kpt-next-arrow22 { animation: none; } }
      `}</style>
    </div>
  );
}

/* ============================================================================
   default export — picks variant
   ============================================================================ */

export default function LiquidEngine() {
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
  return <DesktopLiquid />;
}
