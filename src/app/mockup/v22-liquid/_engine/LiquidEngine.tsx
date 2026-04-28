"use client";

/**
 * LiquidEngine — V22 Liquid Metal
 *
 * One fixed-position R3F Canvas with a fullscreen plane running a custom
 * GLSL fragment shader (FBM noise → normal → procedural chrome reflection).
 * Section uniforms morph color/scale/ripple as the user scrolls. HTML
 * sections are sticky overlays; scroll progress drives both shader and
 * section opacities.
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
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
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
  uniform float uSection;     // 0..7 continuous
  uniform vec2  uMouse;       // -1..1
  uniform vec2  uResolution;
  uniform float uIntensity;   // 0..1, kicked on section change for ripples

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

    // section-driven flow
    float sec = uSection;
    float ripple = 0.55 + 0.35 * sin(sec * 0.9 + uTime * 0.18) + uIntensity * 0.6;
    float scale = 1.6 + 0.55 * sin(sec * 0.6) + uScroll * 0.4;

    // mouse + scroll add subtle swirl
    vec2 m = uMouse * 0.35;
    vec2 q = p * scale + vec2(uScroll * 0.6, -uScroll * 0.4) + m;

    // domain-warp for fluid feel
    vec2 warp = vec2(
      fbm(q + vec2(0.0, uTime * 0.05)),
      fbm(q + vec2(5.2, -uTime * 0.04))
    );
    vec2 q2 = q + warp * (1.1 + ripple * 0.4);

    // base height field
    float h = fbm(q2);
    h += 0.35 * abs(fbm(q2 * 2.4 - 1.7));

    // gradient → normal
    float e = 0.0025;
    float hx = fbm(q2 + vec2(e, 0.0)) - fbm(q2 - vec2(e, 0.0));
    float hy = fbm(q2 + vec2(0.0, e)) - fbm(q2 - vec2(0.0, e));
    vec3 n = normalize(vec3(-hx, -hy, 0.55 + uIntensity * 0.35));

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

    // electric blue / cyan accent on ridges
    float plasma = smoothstep(0.55, 0.95, h) * (0.4 + 0.6 * uIntensity);
    vec3 accent = mix(vec3(0.239, 0.545, 1.0), vec3(0.0, 0.898, 1.0), 0.5 + 0.5 * sin(sec * 0.7));
    col = mix(col, accent, plasma * 0.22);

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
    const target = sectionRef.current;
    const cur = u.uSection.value as number;
    u.uSection.value = cur + (target - cur) * Math.min(1, dt * 1.4);

    const sCur = u.uScroll.value as number;
    u.uScroll.value = sCur + (scrollRef.current - sCur) * Math.min(1, dt * 3.0);

    const iCur = u.uIntensity.value as number;
    u.uIntensity.value = iCur + (intensityRef.current - iCur) * Math.min(1, dt * 2.4);
    intensityRef.current = Math.max(0, intensityRef.current - dt * 0.7);

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
  activeIndex, onJump, sections,
}: {
  activeIndex: number; onJump: (i: number) => void; sections: SectionDef[];
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
              boxShadow: active
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
   Section opacity hook
   ============================================================================ */

function useSectionOpacity(
  scrollYProgress: MotionValue<number>, index: number, total: number, ramp = 0.04,
): MotionValue<number> {
  const slice = 1 / total;
  const start = index * slice;
  const end = (index + 1) * slice;
  const isFirst = index === 0;
  const isLast = index === total - 1;
  const points = [
    isFirst ? 0 : Math.max(0, start - ramp),
    isFirst ? 0 : start + ramp * 0.5,
    isLast ? 1 : end - ramp * 0.5,
    isLast ? 1 : Math.min(1, end + ramp),
  ];
  return useTransform(scrollYProgress, points, [
    isFirst ? 1 : 0, 1, 1, isLast ? 1 : 0,
  ]);
}

function ContentSection({
  cp, index, scrollYProgress,
}: {
  cp: SectionDef; index: number; scrollYProgress: MotionValue<number>;
}) {
  const opacity = useSectionOpacity(scrollYProgress, index, N);
  return (
    <section
      id={cp.id}
      aria-label={cp.label}
      style={{ position: "relative", height: "100vh", width: "100%" }}
    >
      <motion.div
        style={{
          position: "sticky", top: 0, height: "100vh",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "calc(env(safe-area-inset-top) + 80px) 24px 80px",
          opacity, willChange: "opacity",
        }}
      >
        <cp.Component />
      </motion.div>
    </section>
  );
}

/* ============================================================================
   Mobile fallback (no Canvas)
   ============================================================================ */

function MobileFallback() {
  return (
    <div
      className={`${mono.variable} ${display.variable}`}
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
   Reduced-motion fallback
   ============================================================================ */

function ReducedMotionFallback() {
  return (
    <div
      className={`${mono.variable} ${display.variable}`}
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
   Desktop — full liquid metal
   ============================================================================ */

function DesktopLiquid() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const scrollProgressRef = useRef(0);
  const sectionUniformRef = useRef(0);
  const intensityRef = useRef(0);
  const mouseRef = useRef({ x: 0, y: 0 });

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  useEffect(() => scrollYProgress.on("change", (v) => {
    scrollProgressRef.current = v;
    sectionUniformRef.current = v * (N - 1);
  }), [scrollYProgress]);

  const [activeIndex, setActiveIndex] = useState(0);
  const lastIndexRef = useRef(0);
  useEffect(() => scrollYProgress.on("change", (v) => {
    const i = Math.min(N - 1, Math.max(0, Math.round(v * (N - 1))));
    if (i !== lastIndexRef.current) {
      lastIndexRef.current = i;
      intensityRef.current = 1.0;
      setActiveIndex(i);
    }
  }), [scrollYProgress]);

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

  const jumpTo = useCallback((i: number) => {
    const clamped = Math.min(N - 1, Math.max(0, i));
    const cp = SECTIONS[clamped];
    if (!cp) return;
    const el = document.getElementById(cp.id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const t = e.target as HTMLElement | null;
      if (t && (t.tagName === "INPUT" || t.tagName === "TEXTAREA" || t.isContentEditable)) return;
      if (e.key === "ArrowDown" || e.key === "PageDown" || e.key === " ") {
        e.preventDefault();
        jumpTo(Math.min(N - 1, activeIndex + 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        jumpTo(Math.max(0, activeIndex - 1));
      } else if (e.key === "Escape" || e.key === "Home") {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      } else if (e.key === "End") {
        e.preventDefault();
        jumpTo(N - 1);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, jumpTo]);

  return (
    <div
      className={`${mono.variable} ${display.variable}`}
      style={{
        position: "relative",
        background: PALETTE.void, color: PALETTE.mirror,
        fontFamily: "var(--v22-display), system-ui",
      }}
    >
      <a href="#liquid-main" className="kpt-skip" style={skipLinkStyle}>Skip to content</a>

      <div
        aria-hidden
        style={{
          position: "fixed", inset: 0, zIndex: 0,
          pointerEvents: "none", background: PALETTE.void,
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

      <main ref={containerRef} id="liquid-main" style={{ position: "relative", zIndex: 10 }}>
        {SECTIONS.map((cp, i) => (
          <ContentSection key={cp.id} cp={cp} index={i} scrollYProgress={scrollYProgress} />
        ))}
      </main>

      <ProgressBar scrollYProgress={scrollYProgress} />
      <SectionPill activeIndex={activeIndex} sections={SECTIONS} />
      <ScrollDots activeIndex={activeIndex} onJump={jumpTo} sections={SECTIONS} />
      <CornerHud />

      <style>{`
        .kpt-skip:focus { left: 8px !important; outline: 2px solid ${PALETTE.blue}; }
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
