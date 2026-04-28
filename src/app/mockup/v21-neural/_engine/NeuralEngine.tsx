"use client";

import { Suspense, useEffect, useMemo, useRef, useState, useCallback } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  useMotionValueEvent,
} from "framer-motion";
import * as THREE from "three";
import { Inter, JetBrains_Mono } from "next/font/google";

import HeroNeural from "../_sections/HeroNeural";
import PhilosophyNeural from "../_sections/PhilosophyNeural";
import StackNeural from "../_sections/StackNeural";
import TelemetryNeural from "../_sections/TelemetryNeural";
import PortfolioNeural from "../_sections/PortfolioNeural";
import ProcessNeural from "../_sections/ProcessNeural";
import FaqNeural from "../_sections/FaqNeural";
import CtaNeural from "../_sections/CtaNeural";

const inter = Inter({ subsets: ["latin"], weight: ["200", "300", "400", "500", "600", "700", "800", "900"], variable: "--n-sans" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["300", "400", "500", "600"], variable: "--n-mono" });

export const NEURAL_PALETTE = {
  void: "#02030A",
  latent: "#8B5CF6",
  cyan: "#00E5FF",
  pink: "#FF0080",
  amber: "#FFB000",
  text: "#F1F5FF",
  grey: "#9BA3C7",
  edgeDim: "rgba(139,92,246,0.18)",
};

const SECTIONS: { id: string; name: string; layer: string; activation: string }[] = [
  { id: "hero", name: "INFERENCE", layer: "INPUT", activation: "0.99" },
  { id: "philosophy", name: "PHILOSOPHY", layer: "L00", activation: "0.71" },
  { id: "stack", name: "STACK", layer: "L01", activation: "0.84" },
  { id: "telemetry", name: "TELEMETRY", layer: "L02", activation: "0.92" },
  { id: "portfolio", name: "PORTFOLIO", layer: "L03", activation: "0.78" },
  { id: "process", name: "PROCESS", layer: "L04", activation: "0.66" },
  { id: "faq", name: "QUERIES", layer: "L05", activation: "0.58" },
  { id: "cta", name: "OUTPUT", layer: "OUT", activation: "1.00" },
];

/* ── Network composition ── */
type Neuron = { pos: [number, number, number]; layer: number; size: number; hue: number };
type Edge = { a: number; b: number; weight: number };

function buildNetwork(): { neurons: Neuron[]; edges: Edge[] } {
  const neurons: Neuron[] = [];
  const layers = [12, 22, 28, 28, 22, 12]; // 6 layers, ~124 neurons
  const xSpacing = 2.4;
  let idx = 0;
  const layerOffsets: number[] = [];
  layers.forEach((count, li) => {
    layerOffsets[li] = idx;
    const x = (li - (layers.length - 1) / 2) * xSpacing;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const r = 1.6 + Math.random() * 1.2;
      const y = Math.sin(angle) * r + (Math.random() - 0.5) * 0.6;
      const z = Math.cos(angle) * r + (Math.random() - 0.5) * 0.6;
      const isOutput = li === layers.length - 1 && i === 0;
      neurons.push({
        pos: [x + (Math.random() - 0.5) * 0.4, y, z],
        layer: li,
        size: isOutput ? 0.18 : 0.05 + Math.random() * 0.07,
        hue: li / (layers.length - 1),
      });
      idx++;
    }
  });

  // edges between adjacent layers — sparse fan-out
  const edges: Edge[] = [];
  for (let li = 0; li < layers.length - 1; li++) {
    const aStart = layerOffsets[li];
    const aCount = layers[li];
    const bStart = layerOffsets[li + 1];
    const bCount = layers[li + 1];
    for (let i = 0; i < aCount; i++) {
      const fanOut = 2 + Math.floor(Math.random() * 3);
      for (let f = 0; f < fanOut; f++) {
        const j = Math.floor(Math.random() * bCount);
        edges.push({
          a: aStart + i,
          b: bStart + j,
          weight: 0.15 + Math.random() * 0.85,
        });
      }
    }
  }
  return { neurons, edges };
}

/* ── Neuron sprites (instanced + additive glow) ── */
function NeuronField({
  neurons,
  activeLayer,
  reducedMotion,
}: {
  neurons: Neuron[];
  activeLayer: number;
  reducedMotion: boolean;
}) {
  const instRef = useRef<THREE.InstancedMesh>(null!);
  const glowRef = useRef<THREE.InstancedMesh>(null!);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const colorCyan = useMemo(() => new THREE.Color(NEURAL_PALETTE.cyan), []);
  const colorLatent = useMemo(() => new THREE.Color(NEURAL_PALETTE.latent), []);
  const colorPink = useMemo(() => new THREE.Color(NEURAL_PALETTE.pink), []);
  const tmpColor = useMemo(() => new THREE.Color(), []);

  useEffect(() => {
    neurons.forEach((n, i) => {
      dummy.position.set(...n.pos);
      dummy.scale.setScalar(n.size);
      dummy.updateMatrix();
      instRef.current.setMatrixAt(i, dummy.matrix);

      dummy.scale.setScalar(n.size * 6);
      dummy.updateMatrix();
      glowRef.current.setMatrixAt(i, dummy.matrix);
    });
    instRef.current.instanceMatrix.needsUpdate = true;
    glowRef.current.instanceMatrix.needsUpdate = true;
  }, [neurons, dummy]);

  useFrame((state) => {
    if (reducedMotion) return;
    const t = state.clock.getElapsedTime();
    neurons.forEach((n, i) => {
      const distToActive = Math.abs(n.layer - activeLayer);
      const proximity = Math.max(0, 1 - distToActive / 2);
      // pulse cascade per layer
      const phase = t * 0.9 - n.layer * 0.7;
      const pulse = 0.5 + 0.5 * Math.sin(phase);
      const intensity = 0.25 + proximity * 0.75 * pulse;

      // mix colors by hue
      tmpColor.copy(colorLatent).lerp(colorCyan, n.hue);
      if (n.layer === 5) tmpColor.copy(colorPink);
      tmpColor.multiplyScalar(0.5 + intensity);
      instRef.current.setColorAt(i, tmpColor);

      // glow
      const glowScale = n.size * (5 + proximity * 4 + pulse * 2);
      dummy.position.set(...n.pos);
      dummy.scale.setScalar(glowScale);
      dummy.updateMatrix();
      glowRef.current.setMatrixAt(i, dummy.matrix);

      tmpColor.copy(colorLatent).lerp(colorCyan, n.hue).multiplyScalar(0.4 * intensity);
      if (n.layer === 5) tmpColor.copy(colorPink).multiplyScalar(0.6 * intensity);
      glowRef.current.setColorAt(i, tmpColor);
    });
    if (instRef.current.instanceColor) instRef.current.instanceColor.needsUpdate = true;
    if (glowRef.current.instanceColor) glowRef.current.instanceColor.needsUpdate = true;
    glowRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <>
      {/* cores */}
      <instancedMesh ref={instRef} args={[undefined, undefined, neurons.length]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
      {/* additive glow billboards */}
      <instancedMesh ref={glowRef} args={[undefined, undefined, neurons.length]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial
          transparent
          opacity={0.18}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </instancedMesh>
    </>
  );
}

/* ── Edge bundle ── */
function EdgeField({
  edges,
  neurons,
  activeLayer,
  reducedMotion,
}: {
  edges: Edge[];
  neurons: Neuron[];
  activeLayer: number;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    groupRef.current.children.forEach((child, i) => {
      const edge = edges[i];
      if (!edge) return;
      const sourceLayer = neurons[edge.a].layer;
      const distToActive = Math.abs(sourceLayer - activeLayer);
      const isActive = distToActive <= 1;
      const phase = t * 1.4 - sourceLayer * 0.5 + i * 0.02;
      const fire = isActive ? 0.5 + 0.5 * Math.sin(phase) : 0;
      const baseOpacity = 0.04 + edge.weight * 0.08;
      const mat = (child as THREE.Mesh).material as THREE.LineBasicMaterial;
      if (mat) {
        mat.opacity = baseOpacity + fire * 0.55 * edge.weight;
      }
    });
  });

  return (
    <group ref={groupRef}>
      {edges.map((e, i) => {
        const a = neurons[e.a];
        const b = neurons[e.b];
        const sourceLayer = a.layer;
        const color =
          sourceLayer >= 4
            ? NEURAL_PALETTE.pink
            : sourceLayer >= 2
            ? NEURAL_PALETTE.cyan
            : NEURAL_PALETTE.latent;
        return (
          <Line
            key={i}
            points={[a.pos, b.pos]}
            color={color}
            lineWidth={0.5}
            transparent
            opacity={0.12}
          />
        );
      })}
    </group>
  );
}

/* ── Camera rig: dolly + parallax ── */
function CameraRig({
  scrollProgress,
  reducedMotion,
}: {
  scrollProgress: { get: () => number };
  reducedMotion: boolean;
}) {
  const target = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (reducedMotion) return;
    const onMove = (e: PointerEvent) => {
      target.current.x = ((e.clientX / window.innerWidth) - 0.5) * 0.05;
      target.current.y = ((e.clientY / window.innerHeight) - 0.5) * 0.05;
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [reducedMotion]);

  useFrame((state) => {
    const p = scrollProgress.get();
    // Dolly forward through 6 layers across the scroll. start at z=10, end at z=-2.
    const z = 9.5 - p * 11;
    const y = -p * 0.6;
    const camX = reducedMotion ? 0 : target.current.x;
    const camY = reducedMotion ? 0 : -target.current.y;
    state.camera.position.lerp(new THREE.Vector3(camX, camY + y, z), 0.06);
    state.camera.lookAt(0, 0, z - 3);
  });
  return null;
}

/* ── HUD chrome ── */
function ProgressBar({ progress }: { progress: { get: () => number } }) {
  const width = useTransform({ get: () => progress.get() } as never, (v: number) => `${(v as number) * 100}%`);
  return (
    <div className="fixed top-0 left-0 right-0 h-[2px] z-50 bg-white/[0.04]" aria-hidden>
      <motion.div
        className="h-full"
        style={{
          width,
          background: `linear-gradient(90deg, ${NEURAL_PALETTE.cyan}, ${NEURAL_PALETTE.latent}, ${NEURAL_PALETTE.pink})`,
          boxShadow: `0 0 10px ${NEURAL_PALETTE.cyan}80`,
        }}
      />
    </div>
  );
}

function SectionPill({ index }: { index: number }) {
  const s = SECTIONS[index] ?? SECTIONS[0];
  return (
    <div
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 px-4 py-2 rounded-full backdrop-blur-md border"
      style={{
        background: "rgba(2,3,10,0.55)",
        borderColor: "rgba(139,92,246,0.25)",
        boxShadow: "0 0 24px rgba(0,229,255,0.08)",
      }}
    >
      <span
        className="font-mono uppercase"
        style={{ fontSize: 11, letterSpacing: "0.32em", color: NEURAL_PALETTE.text }}
      >
        <span style={{ color: NEURAL_PALETTE.cyan }}>§ {String(index + 1).padStart(2, "0")}</span>
        <span style={{ color: NEURAL_PALETTE.grey, margin: "0 10px" }}>/</span>
        {s.name}
        <span style={{ color: NEURAL_PALETTE.grey, margin: "0 10px" }}>·</span>
        <span style={{ color: NEURAL_PALETTE.latent }}>{s.layer}</span>
        <span style={{ color: NEURAL_PALETTE.grey, margin: "0 10px" }}>·</span>
        <span style={{ color: NEURAL_PALETTE.amber }}>α {s.activation}</span>
      </span>
    </div>
  );
}

function DotNav({
  index,
  onJump,
}: {
  index: number;
  onJump: (i: number) => void;
}) {
  return (
    <nav
      aria-label="Section navigation"
      className="fixed right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col gap-3"
    >
      {SECTIONS.map((s, i) => {
        const active = i === index;
        return (
          <button
            key={s.id}
            type="button"
            aria-label={`Jump to ${s.name}`}
            aria-current={active ? "true" : undefined}
            onClick={() => onJump(i)}
            className="group relative flex items-center gap-3 outline-none"
          >
            <span
              className="font-mono uppercase opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
              style={{
                fontSize: 10,
                letterSpacing: "0.28em",
                color: NEURAL_PALETTE.text,
              }}
            >
              {s.name}
            </span>
            <span
              className="block rounded-full transition-all"
              style={{
                width: active ? 12 : 6,
                height: active ? 12 : 6,
                background: active ? NEURAL_PALETTE.cyan : "rgba(155,163,199,0.35)",
                boxShadow: active ? `0 0 14px ${NEURAL_PALETTE.cyan}` : "none",
                outline: active ? `1px solid ${NEURAL_PALETTE.cyan}40` : "none",
                outlineOffset: 4,
              }}
            />
          </button>
        );
      })}
    </nav>
  );
}

/* ── Static fallback for mobile / reduced-motion ── */
function StaticBackdrop() {
  return (
    <div
      className="fixed inset-0 z-0 pointer-events-none"
      aria-hidden
      style={{
        background: `
          radial-gradient(ellipse 60% 50% at 18% 30%, rgba(139,92,246,0.22), transparent 60%),
          radial-gradient(ellipse 70% 60% at 82% 65%, rgba(0,229,255,0.18), transparent 60%),
          radial-gradient(ellipse 40% 40% at 50% 90%, rgba(255,0,128,0.12), transparent 60%),
          ${NEURAL_PALETTE.void}
        `,
      }}
    >
      <svg className="absolute inset-0 w-full h-full opacity-40" viewBox="0 0 1200 800" preserveAspectRatio="xMidYMid slice">
        <defs>
          <radialGradient id="dot" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor={NEURAL_PALETTE.cyan} stopOpacity="0.8" />
            <stop offset="100%" stopColor={NEURAL_PALETTE.cyan} stopOpacity="0" />
          </radialGradient>
        </defs>
        {Array.from({ length: 60 }).map((_, i) => {
          const x = (i * 137.5) % 1200;
          const y = ((i * 89) % 800);
          const r = 6 + (i % 4) * 4;
          return <circle key={i} cx={x} cy={y} r={r} fill="url(#dot)" opacity={0.4 + ((i % 5) / 10)} />;
        })}
      </svg>
    </div>
  );
}

/* ── Engine root ── */
export default function NeuralEngine() {
  const containerRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion() ?? false;
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 22, mass: 0.4 });

  useMotionValueEvent(smoothProgress, "change", (v) => {
    const i = Math.min(SECTIONS.length - 1, Math.max(0, Math.floor(v * SECTIONS.length)));
    if (i !== activeIndex) setActiveIndex(i);
  });

  // Keyboard nav
  const jumpTo = useCallback((i: number) => {
    const el = containerRef.current;
    if (!el) return;
    const target = (el.offsetTop) + (i / SECTIONS.length) * el.offsetHeight + 10;
    window.scrollTo({ top: target, behavior: reducedMotion ? "auto" : "smooth" });
  }, [reducedMotion]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.target && (e.target as HTMLElement).closest("input,textarea,button,a,[contenteditable]")) {
        // allow space on buttons; only intercept when no interactive focus owns it
        if (["INPUT", "TEXTAREA"].includes((e.target as HTMLElement).tagName)) return;
      }
      if (e.key === "ArrowDown" || e.key === "PageDown") {
        e.preventDefault();
        jumpTo(Math.min(SECTIONS.length - 1, activeIndex + 1));
      } else if (e.key === " " && !(e.target as HTMLElement)?.closest("button,a")) {
        e.preventDefault();
        jumpTo(Math.min(SECTIONS.length - 1, activeIndex + 1));
      } else if (e.key === "ArrowUp" || e.key === "PageUp") {
        e.preventDefault();
        jumpTo(Math.max(0, activeIndex - 1));
      } else if (e.key === "Escape") {
        window.scrollTo({ top: 0, behavior: reducedMotion ? "auto" : "smooth" });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [activeIndex, jumpTo, reducedMotion]);

  const network = useMemo(() => buildNetwork(), []);

  // Map scrollProgress → activeLayer (0..5)
  const [activeLayer, setActiveLayer] = useState(0);
  useMotionValueEvent(smoothProgress, "change", (v) => {
    setActiveLayer(Math.min(5, Math.floor(v * 6)));
  });

  // Section overlay opacity + transform per index
  const sectionRange = (i: number): [number, number, number, number] => {
    const segment = 1 / SECTIONS.length;
    const start = i * segment;
    const fadeIn = start + segment * 0.1;
    const fadeOut = start + segment * 0.85;
    const end = start + segment;
    return [start, fadeIn, fadeOut, end];
  };

  return (
    <div className={`${inter.variable} ${mono.variable}`} style={{ fontFamily: "var(--n-sans), system-ui" }}>
      {/* Skip link */}
      <a
        href="#neural-main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:px-3 focus:py-2 focus:bg-black focus:text-white focus:rounded"
      >
        Skip to content
      </a>

      <ProgressBar progress={smoothProgress} />
      <SectionPill index={activeIndex} />
      <DotNav index={activeIndex} onJump={jumpTo} />

      {/* Static backdrop (mobile + reduced motion) */}
      {(isMobile || reducedMotion) && <StaticBackdrop />}

      {/* Three.js canvas — desktop only, motion enabled */}
      {!isMobile && !reducedMotion && (
        <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden>
          <Canvas
            camera={{ position: [0, 0, 9.5], fov: 55 }}
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            dpr={[1, 2]}
            style={{ background: NEURAL_PALETTE.void }}
          >
            <Suspense fallback={null}>
              <ambientLight intensity={0.4} />
              <CameraRig scrollProgress={smoothProgress} reducedMotion={reducedMotion} />
              <NeuronField neurons={network.neurons} activeLayer={activeLayer} reducedMotion={reducedMotion} />
              <EdgeField edges={network.edges} neurons={network.neurons} activeLayer={activeLayer} reducedMotion={reducedMotion} />
              {/* haze plane */}
              <mesh position={[0, 0, 7]}>
                <planeGeometry args={[40, 25]} />
                <meshBasicMaterial color={NEURAL_PALETTE.void} transparent opacity={0.35} depthWrite={false} />
              </mesh>
            </Suspense>
          </Canvas>
        </div>
      )}

      {/* Scroll-driven container — desktop with R3F */}
      {!isMobile && !reducedMotion ? (
        <div ref={containerRef} style={{ height: "800vh", position: "relative" }} id="neural-main">
          <div className="sticky top-0 h-screen w-full overflow-hidden">
            {SECTIONS.map((s, i) => {
              const [r0, r1, r2, r3] = sectionRange(i);
              return (
                <SectionOverlay key={s.id} progress={smoothProgress} range={[r0, r1, r2, r3]} index={i}>
                  {i === 0 && <HeroNeural />}
                  {i === 1 && <PhilosophyNeural />}
                  {i === 2 && <StackNeural />}
                  {i === 3 && <TelemetryNeural />}
                  {i === 4 && <PortfolioNeural />}
                  {i === 5 && <ProcessNeural />}
                  {i === 6 && <FaqNeural />}
                  {i === 7 && <CtaNeural />}
                </SectionOverlay>
              );
            })}
          </div>
        </div>
      ) : (
        // Fallback: normal vertical scroll
        <div id="neural-main" style={{ position: "relative", zIndex: 1 }}>
          <div style={{ paddingTop: 64 }}>
            <HeroNeural />
            <PhilosophyNeural />
            <StackNeural />
            <TelemetryNeural />
            <PortfolioNeural />
            <ProcessNeural />
            <FaqNeural />
            <CtaNeural />
          </div>
        </div>
      )}
    </div>
  );
}

function SectionOverlay({
  progress,
  range,
  index,
  children,
}: {
  progress: { get: () => number } & ReturnType<typeof useSpring>;
  range: [number, number, number, number];
  index: number;
  children: React.ReactNode;
}) {
  const [r0, r1, r2, r3] = range;
  const opacity = useTransform(progress, [r0, r1, r2, r3], [0, 1, 1, 0]);
  const y = useTransform(progress, [r0, r1, r2, r3], [40, 0, 0, -40]);
  return (
    <motion.section
      aria-labelledby={`sec-${index}-title`}
      style={{ opacity, y }}
      className="absolute inset-0 flex items-center justify-center pointer-events-none"
    >
      <div className="w-full h-full overflow-y-auto pointer-events-auto" style={{ scrollbarWidth: "none" }}>
        {children}
      </div>
    </motion.section>
  );
}
