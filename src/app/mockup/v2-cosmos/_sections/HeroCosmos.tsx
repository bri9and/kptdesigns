"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import { motion } from "framer-motion";
import { Inter, JetBrains_Mono } from "next/font/google";
import * as THREE from "three";

const inter = Inter({ subsets: ["latin"], weight: ["200", "400", "700", "800"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const STAR_COUNT = 5000;
const FIELD_RADIUS = 60;
const EASE = [0.16, 1, 0.3, 1] as const;

function generateStars(count: number, radius: number) {
  const positions = new Float32Array(count * 3);
  const sizes = new Float32Array(count);
  const colors = new Float32Array(count * 3);
  const palette = [
    new THREE.Color("#F8F8FF"),
    new THREE.Color("#9BA3C7"),
    new THREE.Color("#7B5BFF"),
    new THREE.Color("#FF6BC1"),
    new THREE.Color("#FF8000"),
  ];
  const weights = [0.62, 0.22, 0.1, 0.04, 0.02];
  for (let i = 0; i < count; i++) {
    const theta = 2 * Math.PI * Math.random();
    const phi = Math.acos(2 * Math.random() - 1);
    const r = radius * Math.cbrt(Math.random()) * (0.35 + Math.random() * 0.65);
    positions[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    positions[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
    positions[i * 3 + 2] = r * Math.cos(phi);
    sizes[i] = Math.random() < 0.04 ? 1.6 + Math.random() * 1.4 : 0.25 + Math.random() * 0.85;
    const roll = Math.random();
    let acc = 0;
    let idx = 0;
    for (let k = 0; k < weights.length; k++) {
      acc += weights[k];
      if (roll <= acc) { idx = k; break; }
    }
    const c = palette[idx];
    const f = 0.7 + Math.random() * 0.3;
    colors[i * 3] = c.r * f;
    colors[i * 3 + 1] = c.g * f;
    colors[i * 3 + 2] = c.b * f;
  }
  return { positions, sizes, colors };
}

function pickConstellations(positions: Float32Array, max: number) {
  const anchors: number[] = [];
  const stride = Math.floor(STAR_COUNT / 140);
  for (let i = 0; i < STAR_COUNT && anchors.length < 140; i += stride) anchors.push(i);
  const segs: [THREE.Vector3, THREE.Vector3][] = [];
  for (const a of anchors) {
    const ax = positions[a * 3], ay = positions[a * 3 + 1], az = positions[a * 3 + 2];
    const dists: { idx: number; d: number }[] = [];
    for (const b of anchors) {
      if (b === a) continue;
      const dx = positions[b * 3] - ax, dy = positions[b * 3 + 1] - ay, dz = positions[b * 3 + 2] - az;
      dists.push({ idx: b, d: dx * dx + dy * dy + dz * dz });
    }
    dists.sort((p, q) => p.d - q.d);
    for (const t of dists.slice(0, 2)) {
      if (t.d > 36) continue;
      segs.push([
        new THREE.Vector3(ax, ay, az),
        new THREE.Vector3(positions[t.idx * 3], positions[t.idx * 3 + 1], positions[t.idx * 3 + 2]),
      ]);
      if (segs.length >= max) return segs;
    }
  }
  return segs;
}

function Starfield({ pointerRef }: { pointerRef: React.RefObject<{ x: number; y: number }> }) {
  const groupRef = useRef<THREE.Group>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { positions, sizes, colors } = useMemo(() => generateStars(STAR_COUNT, FIELD_RADIUS), []);
  const constellations = useMemo(() => pickConstellations(positions, 36), [positions]);

  const geometry = useMemo(() => {
    const g = new THREE.BufferGeometry();
    g.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    g.setAttribute("size", new THREE.BufferAttribute(sizes, 1));
    g.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    return g;
  }, [positions, sizes, colors]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uPixelRatio: { value: typeof window !== "undefined" ? Math.min(window.devicePixelRatio, 2) : 1 },
    }),
    []
  );

  useFrame((state, delta) => {
    const group = groupRef.current;
    const cam = state.camera;
    const mat = materialRef.current;
    if (!group || !mat) return;
    group.rotation.y += 0.0005;
    const p = pointerRef.current;
    const tx = p.y * 0.1, ty = p.x * 0.1;
    const k = Math.min(1, delta * 1.4);
    cam.rotation.x += (tx - cam.rotation.x) * k;
    cam.rotation.y += (ty - cam.rotation.y) * k;
    mat.uniforms.uTime.value = state.clock.elapsedTime;
  });

  return (
    <group ref={groupRef}>
      <points geometry={geometry}>
        <shaderMaterial
          ref={materialRef}
          uniforms={uniforms}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          vertexShader={`
            attribute float size; attribute vec3 color;
            varying vec3 vColor; uniform float uTime; uniform float uPixelRatio;
            void main() {
              vColor = color;
              vec4 mv = modelViewMatrix * vec4(position, 1.0);
              float twinkle = 0.85 + 0.15 * sin(uTime * 0.6 + position.x * 1.7 + position.y * 0.9);
              gl_PointSize = size * 12.0 * uPixelRatio * twinkle * (1.0 / -mv.z * 28.0);
              gl_Position = projectionMatrix * mv;
            }`}
          fragmentShader={`
            varying vec3 vColor;
            void main() {
              vec2 c = gl_PointCoord - vec2(0.5);
              float d = length(c);
              float core = smoothstep(0.5, 0.0, d);
              float halo = smoothstep(0.5, 0.15, d) * 0.35;
              float i = pow(core, 2.4) + halo;
              if (i < 0.01) discard;
              gl_FragColor = vec4(vColor * i, i);
            }`}
        />
      </points>
      {constellations.map((seg, i) => (
        <Line key={i} points={[seg[0], seg[1]]} color="#7B5BFF" opacity={0.08} transparent lineWidth={0.6} />
      ))}
      <fog attach="fog" args={["#02030A", 30, 90]} />
    </group>
  );
}

export default function HeroCosmos() {
  const pointerRef = useRef({ x: 0, y: 0 });
  const [signal, setSignal] = useState(4);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      pointerRef.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      pointerRef.current.y = (e.clientY / window.innerHeight) * 2 - 1;
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const id = setInterval(() => setSignal(3 + Math.floor(Math.random() * 3)), 2200);
    return () => clearInterval(id);
  }, []);

  const hudLabel = "text-[11px] uppercase tracking-[0.3em] text-[#9BA3C7]/60";
  const hudValue = "text-[12px] tracking-[0.18em] text-[#F8F8FF]";
  const cornerTick = `${mono.className} mt-[-2px] text-[10px] uppercase tracking-[0.3em] text-[#9BA3C7]/50`;
  const barHeights = [4, 7, 10, 13, 16];

  return (
    <section
      className={`${inter.className} relative isolate min-h-screen w-full overflow-hidden bg-[#02030A] text-[#F8F8FF]`}
      style={{ paddingTop: "clamp(96px, 12vh, 140px)" }}
    >
      <div className="fixed inset-0 z-0">
        <Canvas
          camera={{ position: [0, 0, 1], fov: 70 }}
          dpr={[1, 2]}
          gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
          onCreated={({ gl }) => gl.setClearColor(new THREE.Color("#02030A"), 1)}
        >
          <Starfield pointerRef={pointerRef} />
        </Canvas>
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at 50% 60%, rgba(123,91,255,0.18) 0%, rgba(255,107,193,0.06) 28%, rgba(2,3,10,0) 60%), radial-gradient(circle at 12% 18%, rgba(255,128,0,0.08) 0%, transparent 30%)",
          }}
        />
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 mix-blend-soft-light opacity-[0.08]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          }}
        />
      </div>

      <div className="relative z-10 flex min-h-[calc(100vh-clamp(96px,12vh,140px))] flex-col items-center justify-between px-6 pb-10 sm:px-10">
        <div aria-hidden className="pointer-events-none absolute inset-0">
          <div className="absolute left-6 top-[clamp(96px,12vh,140px)] flex items-start gap-2">
            <div className="flex flex-col items-start gap-1">
              <div className="h-px w-8 bg-[#9BA3C7]/35" />
              <div className="h-8 w-px bg-[#9BA3C7]/35" />
            </div>
            <span className={cornerTick}>N &middot; 00</span>
          </div>
          <div className="absolute right-6 top-[clamp(96px,12vh,140px)] flex flex-row-reverse items-start gap-2">
            <div className="flex flex-col items-end gap-1">
              <div className="h-px w-8 bg-[#9BA3C7]/35" />
              <div className="h-8 w-px bg-[#9BA3C7]/35" />
            </div>
            <span className={cornerTick}>REC &middot; 7B5B</span>
          </div>
        </div>

        <div className="flex w-full max-w-[1500px] flex-1 flex-col items-center justify-center pt-6">
          <motion.div
            initial={{ opacity: 0, letterSpacing: "0.05em" }}
            animate={{ opacity: 1, letterSpacing: "0.18em" }}
            transition={{ duration: 2.4, ease: EASE, delay: 0.2 }}
            className={`${mono.className} mb-8 text-[10px] uppercase text-[#9BA3C7]/70 sm:text-[11px]`}
          >
            <span className="text-[#7B5BFF]">/</span> sector_07 &middot; cartography of the modern web
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.0, ease: EASE, delay: 0.35 }}
            className="text-center font-extrabold leading-[0.92] text-[#F8F8FF]"
            style={{ fontSize: "clamp(80px, 14vw, 220px)", letterSpacing: "0.06em", textShadow: "0 0 80px rgba(123,91,255,0.18)" }}
          >
            <span className="block">KPT</span>
            <span className="relative inline-block">
              <span className="block">DESIGNS</span>
              <motion.span
                aria-hidden
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ duration: 2.6, ease: EASE, delay: 1.0 }}
                className="absolute -bottom-3 left-0 right-0 block h-[3px] origin-left rounded-full sm:-bottom-4 sm:h-[4px]"
                style={{
                  background:
                    "linear-gradient(90deg, transparent 0%, #7B5BFF 18%, #FF6BC1 52%, #FF8000 82%, transparent 100%)",
                  filter: "drop-shadow(0 0 14px rgba(123,91,255,0.55))",
                }}
              />
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 2.0, ease: EASE, delay: 1.4 }}
            className="mt-10 text-center font-extralight uppercase text-[#9BA3C7] sm:mt-14"
            style={{ fontSize: "clamp(15px, 1.4vw, 22px)", letterSpacing: "0.4em" }}
          >
            We map the modern web.
          </motion.p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.2, ease: EASE, delay: 1.7 }}
          className="mt-12 flex w-full max-w-[1500px] flex-col items-stretch gap-3 sm:mt-16"
        >
          <div className={`${mono.className} grid w-full grid-cols-1 gap-2 border-y border-[#9BA3C7]/15 py-4 sm:grid-cols-3 sm:gap-6`}>
            <div className="flex items-center gap-3 text-[#9BA3C7]">
              <span className="flex items-center gap-1.5">
                <span className="h-1 w-1 rounded-full bg-[#7B5BFF]" />
                <span className="h-1 w-3 bg-[#7B5BFF]/40" />
              </span>
              <span className={hudLabel}>COORD</span>
              <span className={hudValue}>
                LAT 40.4406&deg;N <span className="text-[#7B5BFF]">&middot;</span> LON 79.9959&deg;W
              </span>
            </div>

            <div className="flex items-center gap-3 text-[#9BA3C7] sm:justify-center">
              <span className={hudLabel}>SIGNAL</span>
              <span className="flex items-end gap-[3px]">
                {barHeights.map((h, i) => (
                  <span
                    key={i}
                    style={{ height: `${h}px` }}
                    className={`w-[3px] transition-colors duration-700 ${i < signal ? "bg-[#F8F8FF]" : "bg-[#9BA3C7]/20"}`}
                  />
                ))}
              </span>
              <span className={hudValue}>
                {(signal * 17 + 23).toString().padStart(3, "0")} <span className="text-[#9BA3C7]/60">dBm</span>
              </span>
            </div>

            <div className="flex items-center gap-3 text-[#9BA3C7] sm:justify-end">
              <span className={hudLabel}>UPLINK</span>
              <span className={hudValue}>APR 2026</span>
              <span className="flex items-center gap-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#FF8000]/60" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#FF8000]" />
                </span>
                <span className="text-[11px] uppercase tracking-[0.3em] text-[#FF8000]">NOMINAL</span>
              </span>
            </div>
          </div>

          <div className="flex items-center justify-center pt-4 pb-2">
            <div className="flex flex-col items-center gap-2">
              <span className={`${mono.className} text-[10px] uppercase tracking-[0.5em] text-[#9BA3C7]/55`}>descend</span>
              <span className="relative block h-10 w-px overflow-hidden bg-[#9BA3C7]/15">
                <motion.span
                  initial={{ y: -40 }}
                  animate={{ y: 40 }}
                  transition={{ duration: 2.6, ease: EASE, repeat: Infinity }}
                  className="absolute left-0 block h-6 w-px bg-gradient-to-b from-transparent via-[#7B5BFF] to-transparent"
                />
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
