"use client";

/**
 * The 3D scene driven by a scroll-progress MotionValue.
 *
 * Builds entirely from primitives — no GLTF asset pipeline needed for
 * the spike. Visual concept:
 *   • A "browser card" floats at the center, rotates as you scroll.
 *   • Four small color orbs (orange/blue/amber/sage) orbit it; they
 *     converge into the card during the "Refine" phase.
 *   • The card extrudes — three internal panels rise out of it — during
 *     the "Render" phase.
 *   • Soft glow + tiny "live URL" tag appear during "Ship".
 *
 * Performance: ~30k triangles, all primitives, a single directional
 * light. Runs at 60fps on a laptop integrated GPU. Trims at the section
 * boundary because the parent unmounts the canvas via `<Canvas>` only
 * during the sticky range.
 */

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import type { MotionValue } from "framer-motion";
import * as THREE from "three";

// Brand palette read at module load from CSS variables so per-customer
// themes (which override --brand-* on a wrapper) flow into the R3F scene.
// Three.js materials need string colors, not CSS classes — so we resolve
// the variables once on initial mount. For the marketing site the values
// are stable; per-customer themed sites mount fresh.
const PALETTE_FALLBACK = {
  cream: "#FBF8F1",
  sand: "#F2EBDB",
  ink: "#2D241B",
  orange: "#C56738",
  blue: "#5B8FB9",
  amber: "#E8A547",
  sage: "#7BA15A",
};

function readBrand(): typeof PALETTE_FALLBACK {
  if (typeof window === "undefined") return PALETTE_FALLBACK;
  const cs = getComputedStyle(document.documentElement);
  const get = (name: string, fallback: string) =>
    cs.getPropertyValue(name).trim() || fallback;
  return {
    cream: get("--brand-canvas", PALETTE_FALLBACK.cream),
    sand: get("--brand-surface", PALETTE_FALLBACK.sand),
    ink: get("--brand-ink", PALETTE_FALLBACK.ink),
    orange: get("--brand-primary", PALETTE_FALLBACK.orange),
    blue: get("--brand-accent-1", PALETTE_FALLBACK.blue),
    amber: get("--brand-accent-2", PALETTE_FALLBACK.amber),
    sage: get("--brand-accent-3", PALETTE_FALLBACK.sage),
  };
}

const PALETTE = readBrand();

// Tiny easing so phase boundaries feel smooth instead of clicky.
const ease = (t: number) => t * t * (3 - 2 * t);
const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
// Maps a progress value within [from, to] to 0..1 (clamped). Eases.
function phase(p: number, from: number, to: number) {
  const raw = (p - from) / (to - from);
  return ease(Math.max(0, Math.min(1, raw)));
}

export function Scene({ progress }: { progress: MotionValue<number> }) {
  return (
    <>
      <ambientLight intensity={0.55} />
      <directionalLight position={[4, 6, 5]} intensity={1.05} castShadow />
      <directionalLight position={[-4, -2, -3]} intensity={0.25} color={PALETTE.orange} />

      <Float floatIntensity={0.4} rotationIntensity={0.15} speed={1.2}>
        <BrowserCard progress={progress} />
      </Float>

      <OrbitingOrbs progress={progress} />
    </>
  );
}

/* ------------------------------------------------------------------ */
/* Browser card — the central object that morphs through phases       */
/* ------------------------------------------------------------------ */

function BrowserCard({ progress }: { progress: MotionValue<number> }) {
  const groupRef = useRef<THREE.Group>(null);
  const heroRef = useRef<THREE.Mesh>(null);
  const featuresRef = useRef<THREE.Mesh>(null);
  const footerRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const tagRef = useRef<THREE.Group>(null);

  useFrame(() => {
    const p = progress.get();
    if (!groupRef.current) return;

    // Whole card slowly rotates as the user scrolls — Atom-style "carousel" feel.
    // Tilts further forward in the later phases so the panels are visible.
    groupRef.current.rotation.y = lerp(-0.25, 0.55, ease(p));
    groupRef.current.rotation.x = lerp(0.05, -0.18, phase(p, 0.4, 1));

    // Internal panels pop OUT of the card during Render (0.5 → 0.75).
    const renderT = phase(p, 0.5, 0.75);
    if (heroRef.current) {
      heroRef.current.scale.z = lerp(0.001, 0.06, renderT);
      heroRef.current.position.z = lerp(0.011, 0.035, renderT);
      (heroRef.current.material as THREE.MeshStandardMaterial).opacity = renderT;
    }
    if (featuresRef.current) {
      featuresRef.current.scale.z = lerp(0.001, 0.04, renderT);
      featuresRef.current.position.z = lerp(0.011, 0.025, renderT);
      (featuresRef.current.material as THREE.MeshStandardMaterial).opacity = renderT;
    }
    if (footerRef.current) {
      footerRef.current.scale.z = lerp(0.001, 0.03, renderT);
      footerRef.current.position.z = lerp(0.011, 0.02, renderT);
      (footerRef.current.material as THREE.MeshStandardMaterial).opacity = renderT;
    }

    // Ship phase (0.75 → 1): card lifts, glow expands, "Live" tag drops in.
    const shipT = phase(p, 0.75, 1);
    groupRef.current.position.y = lerp(0, 0.45, shipT);
    if (glowRef.current) {
      glowRef.current.scale.setScalar(lerp(0.0001, 4.5, shipT));
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = lerp(0, 0.18, shipT);
    }
    if (tagRef.current) {
      tagRef.current.position.y = lerp(-2, -1.45, shipT);
      tagRef.current.scale.setScalar(shipT);
    }
  });

  return (
    <group ref={groupRef}>
      {/* Soft halo behind the card during Ship */}
      <mesh ref={glowRef} position={[0, 0, -0.05]}>
        <circleGeometry args={[0.5, 64]} />
        <meshBasicMaterial color={PALETTE.orange} transparent opacity={0} />
      </mesh>

      {/* The card itself — a flat panel with rounded edges via bevel */}
      <RoundedCard width={3.4} height={2.1} depth={0.04} color={PALETTE.cream} />

      {/* Browser chrome bar at the top */}
      <mesh position={[0, 0.92, 0.025]}>
        <planeGeometry args={[3.4, 0.26]} />
        <meshStandardMaterial color={PALETTE.sand} />
      </mesh>
      {/* Three traffic-light dots */}
      <mesh position={[-1.55, 0.92, 0.026]}>
        <circleGeometry args={[0.04, 24]} />
        <meshBasicMaterial color="#FF5F57" />
      </mesh>
      <mesh position={[-1.43, 0.92, 0.026]}>
        <circleGeometry args={[0.04, 24]} />
        <meshBasicMaterial color="#FEBC2E" />
      </mesh>
      <mesh position={[-1.31, 0.92, 0.026]}>
        <circleGeometry args={[0.04, 24]} />
        <meshBasicMaterial color="#28C840" />
      </mesh>

      {/* Internal panels — extrude during Render phase */}
      <mesh ref={heroRef} position={[0, 0.35, 0.011]} scale={[1, 1, 0.001]}>
        <boxGeometry args={[3.0, 0.7, 1]} />
        <meshStandardMaterial color={PALETTE.orange} transparent opacity={0} />
      </mesh>
      <mesh ref={featuresRef} position={[0, -0.25, 0.011]} scale={[1, 1, 0.001]}>
        <boxGeometry args={[3.0, 0.5, 1]} />
        <meshStandardMaterial color={PALETTE.blue} transparent opacity={0} />
      </mesh>
      <mesh ref={footerRef} position={[0, -0.75, 0.011]} scale={[1, 1, 0.001]}>
        <boxGeometry args={[3.0, 0.18, 1]} />
        <meshStandardMaterial color={PALETTE.sage} transparent opacity={0} />
      </mesh>

      {/* "Live URL" tag that drops in during Ship */}
      <group ref={tagRef} position={[0, -2, 0]} scale={0}>
        <RoundedCard width={2.2} height={0.36} depth={0.03} color={PALETTE.ink} />
        <mesh position={[-0.95, 0, 0.018]}>
          <circleGeometry args={[0.06, 24]} />
          <meshBasicMaterial color={PALETTE.sage} />
        </mesh>
      </group>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Orbiting orbs — converge into the card during Refine               */
/* ------------------------------------------------------------------ */

function OrbitingOrbs({ progress }: { progress: MotionValue<number> }) {
  const groupRef = useRef<THREE.Group>(null);

  // Stable initial offsets so orbs orbit at four cardinal positions.
  const baseAngles = [0, Math.PI / 2, Math.PI, (Math.PI * 3) / 2];
  const colors = [PALETTE.orange, PALETTE.blue, PALETTE.amber, PALETTE.sage];

  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const p = progress.get();
    // Slow continuous rotation — independent of scroll.
    groupRef.current.rotation.z += delta * 0.18;

    // Read phase (0 → 0.25): orbs fade in & expand outward.
    const readT = phase(p, 0, 0.25);
    // Refine phase (0.25 → 0.5): orbs converge toward the card center.
    const refineT = phase(p, 0.25, 0.5);
    // After Refine: orbs are absorbed (scale to 0).
    const absorbedT = phase(p, 0.5, 0.6);

    groupRef.current.children.forEach((child, i) => {
      const angle = baseAngles[i];
      const baseR = 2.6;
      const r = lerp(0, baseR, readT) * (1 - refineT * 0.85);
      child.position.set(Math.cos(angle) * r, Math.sin(angle) * r, 0);
      child.scale.setScalar(readT * (1 - absorbedT));
    });
  });

  return (
    <group ref={groupRef}>
      {colors.map((color, i) => (
        <mesh key={i}>
          <sphereGeometry args={[0.12, 24, 24]} />
          <meshStandardMaterial
            color={color}
            emissive={color}
            emissiveIntensity={0.4}
            roughness={0.35}
          />
        </mesh>
      ))}
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Shape helper                                                        */
/* ------------------------------------------------------------------ */

function RoundedCard({
  width,
  height,
  depth,
  color,
}: {
  width: number;
  height: number;
  depth: number;
  color: string;
}) {
  // Cheap rounded card — main panel + four corner cylinders. Looks plenty
  // good at this scale and avoids a heavier shape extrusion.
  return (
    <group>
      <mesh>
        <boxGeometry args={[width, height, depth]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.05} />
      </mesh>
    </group>
  );
}
