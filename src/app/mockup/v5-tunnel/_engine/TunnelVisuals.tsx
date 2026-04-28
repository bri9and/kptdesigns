"use client";

/**
 * TunnelVisuals — R3F scene primitives for the V5 Tunnel
 *
 * - TunnelWalls   : segmented cylinder w/ procedural cyan grid texture
 * - TunnelRings   : magenta/cyan/blue torus accents drifting along Z
 * - BloomSprites  : large additive halos along the tunnel
 * - DriftingLights: 3 pulsing point lights (cyan, magenta, blue)
 *
 * All accept `frozen` to support reduced-motion (no drift updates).
 */

import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

const TUNNEL_LENGTH = 360;
const TUNNEL_RADIUS = 6;

const PALETTE = {
  void: "#000812",
  cyan: "#00E5FF",
  blue: "#0066FF",
  white: "#E8F1FF",
  amber: "#FFB000",
  magenta: "#FF00AA",
};

export const VISUAL_CONFIG = {
  TUNNEL_LENGTH,
  TUNNEL_RADIUS,
  PALETTE,
};

/* ----------------------------- textures --------------------------------- */

function makeGridTexture(): THREE.CanvasTexture {
  const size = 512;
  const c = document.createElement("canvas");
  c.width = size;
  c.height = size;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#000812";
  ctx.fillRect(0, 0, size, size);
  ctx.strokeStyle = "rgba(0, 229, 255, 0.55)";
  ctx.lineWidth = 1;
  const step = 32;
  for (let x = 0; x <= size; x += step) {
    ctx.beginPath();
    ctx.moveTo(x + 0.5, 0);
    ctx.lineTo(x + 0.5, size);
    ctx.stroke();
  }
  for (let y = 0; y <= size; y += step) {
    ctx.beginPath();
    ctx.moveTo(0, y + 0.5);
    ctx.lineTo(size, y + 0.5);
    ctx.stroke();
  }
  ctx.fillStyle = "rgba(255, 0, 170, 0.7)";
  for (let i = 0; i < 14; i++) {
    const x = Math.floor(Math.random() * (size / step)) * step;
    const y = Math.floor(Math.random() * (size / step)) * step;
    ctx.fillRect(x - 1, y - 1, 3, 3);
  }
  ctx.fillStyle = "rgba(255, 176, 0, 0.6)";
  for (let i = 0; i < 8; i++) {
    const x = Math.floor(Math.random() * (size / step)) * step;
    const y = Math.floor(Math.random() * (size / step)) * step;
    ctx.fillRect(x - 1, y - 1, 2, 2);
  }
  const tex = new THREE.CanvasTexture(c);
  tex.wrapS = THREE.RepeatWrapping;
  tex.wrapT = THREE.RepeatWrapping;
  tex.repeat.set(8, TUNNEL_LENGTH / 8);
  tex.anisotropy = 8;
  return tex;
}

function makeRadialSprite(color: string): THREE.CanvasTexture {
  const s = 256;
  const c = document.createElement("canvas");
  c.width = s;
  c.height = s;
  const ctx = c.getContext("2d")!;
  const grad = ctx.createRadialGradient(s / 2, s / 2, 0, s / 2, s / 2, s / 2);
  grad.addColorStop(0, color);
  grad.addColorStop(0.4, color + "55");
  grad.addColorStop(1, "rgba(0,0,0,0)");
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, s, s);
  return new THREE.CanvasTexture(c);
}

/* ----------------------------- visuals ---------------------------------- */

export function TunnelWalls({ frozen }: { frozen: boolean }) {
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const texture = useMemo(() => makeGridTexture(), []);
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (matRef.current) matRef.current.opacity = 0.45 + Math.sin(t * 1.4) * 0.14;
    if (!frozen) {
      // R3F drives Three.js objects by mutation each frame — canonical pattern.
      /* eslint-disable react-hooks/immutability */
      texture.offset.y -= 0.0009;
      texture.offset.x = Math.sin(t * 0.18) * 0.04;
      /* eslint-enable react-hooks/immutability */
    }
  });
  return (
    <mesh rotation={[Math.PI / 2, 0, 0]} position={[0, 0, -TUNNEL_LENGTH / 2 + 10]}>
      <cylinderGeometry args={[TUNNEL_RADIUS, TUNNEL_RADIUS, TUNNEL_LENGTH, 64, 240, true]} />
      <meshBasicMaterial
        ref={matRef}
        map={texture}
        side={THREE.BackSide}
        transparent
        opacity={0.65}
        color={PALETTE.white}
        toneMapped={false}
      />
    </mesh>
  );
}

export function TunnelRings({ frozen }: { frozen: boolean }) {
  const group = useRef<THREE.Group>(null);
  const rings = useMemo(
    () => new Array(40).fill(0).map((_, i) => ({
      z: -i * (TUNNEL_LENGTH / 40),
      hue: i % 3,
    })),
    []
  );
  useFrame(({ clock }) => {
    if (!group.current) return;
    const t = clock.getElapsedTime();
    group.current.children.forEach((m, i) => {
      if (!frozen) {
        m.position.z += 0.06;
        if (m.position.z > 10) m.position.z -= TUNNEL_LENGTH;
        m.rotation.z = t * 0.12 + i * 0.21;
      }
      const mat = (m as THREE.Mesh).material as THREE.MeshBasicMaterial;
      mat.opacity = 0.3 + Math.sin(t * 2 + i) * 0.14;
    });
  });
  return (
    <group ref={group}>
      {rings.map((r, i) => {
        const color =
          r.hue === 0 ? PALETTE.cyan : r.hue === 1 ? PALETTE.blue : PALETTE.magenta;
        return (
          <mesh key={i} position={[0, 0, r.z]}>
            <torusGeometry args={[TUNNEL_RADIUS - 0.05, 0.012, 8, 96]} />
            <meshBasicMaterial color={color} transparent opacity={0.5} toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
}

export function BloomSprites({ frozen }: { frozen: boolean }) {
  const cyanTex = useMemo(() => makeRadialSprite(PALETTE.cyan), []);
  const magentaTex = useMemo(() => makeRadialSprite(PALETTE.magenta), []);
  const sprites = useMemo(() => {
    const seeded = (n: number) => {
      const x = Math.sin(n * 12.9898) * 43758.5453;
      return x - Math.floor(x);
    };
    return new Array(20).fill(0).map((_, i) => ({
      z: -i * (TUNNEL_LENGTH / 20) - seeded(i + 1) * 6,
      tex: i % 2 === 0 ? cyanTex : magentaTex,
      scale: 4 + seeded(i + 17) * 3.5,
    }));
  }, [cyanTex, magentaTex]);
  const groupRef = useRef<THREE.Group>(null);
  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.children.forEach((s, i) => {
      if (!frozen) {
        s.position.z += 0.04;
        if (s.position.z > 10) s.position.z -= TUNNEL_LENGTH;
      }
      const mat = (s as THREE.Sprite).material as THREE.SpriteMaterial;
      mat.opacity = 0.3 + Math.sin(t * 1.2 + i) * 0.1;
    });
  });
  return (
    <group ref={groupRef}>
      {sprites.map((s, i) => (
        <sprite key={i} position={[0, 0, s.z]} scale={[s.scale, s.scale, 1]}>
          <spriteMaterial
            map={s.tex}
            transparent
            blending={THREE.AdditiveBlending}
            depthWrite={false}
            opacity={0.4}
            toneMapped={false}
          />
        </sprite>
      ))}
    </group>
  );
}

export function DriftingLights({ frozen }: { frozen: boolean }) {
  const cyanRef = useRef<THREE.PointLight>(null);
  const magentaRef = useRef<THREE.PointLight>(null);
  const blueRef = useRef<THREE.PointLight>(null);
  useFrame(({ clock }) => {
    if (frozen) return;
    const t = clock.getElapsedTime();
    if (cyanRef.current) {
      cyanRef.current.position.x = Math.cos(t * 0.6) * 2;
      cyanRef.current.position.y = Math.sin(t * 0.7) * 2;
      cyanRef.current.position.z = ((t * 8) % TUNNEL_LENGTH) - TUNNEL_LENGTH;
    }
    if (magentaRef.current) {
      magentaRef.current.position.x = Math.sin(t * 0.5 + 1.4) * 2.4;
      magentaRef.current.position.y = Math.cos(t * 0.9 + 1.4) * 1.6;
      magentaRef.current.position.z =
        ((t * 6 + TUNNEL_LENGTH * 0.5) % TUNNEL_LENGTH) - TUNNEL_LENGTH;
    }
    if (blueRef.current) {
      blueRef.current.position.x = Math.cos(t * 0.4 + 2.7) * 1.5;
      blueRef.current.position.y = Math.sin(t * 0.55 + 2.7) * 2.2;
      blueRef.current.position.z =
        ((t * 10 + TUNNEL_LENGTH * 0.25) % TUNNEL_LENGTH) - TUNNEL_LENGTH;
    }
  });
  return (
    <>
      <pointLight ref={cyanRef} color={PALETTE.cyan} intensity={28} distance={28} decay={1.6} />
      <pointLight ref={magentaRef} color={PALETTE.magenta} intensity={22} distance={24} decay={1.6} />
      <pointLight ref={blueRef} color={PALETTE.blue} intensity={18} distance={22} decay={1.6} />
      <ambientLight intensity={0.2} color={PALETTE.white} />
    </>
  );
}

/* CameraDolly — reads scroll progress from a shared ref each frame */
export function CameraDolly({
  progressRef,
  frozen,
}: {
  progressRef: React.MutableRefObject<number>;
  frozen: boolean;
}) {
  useFrame(({ camera, clock }, delta) => {
    if (frozen) {
      camera.position.set(0, 0, 4);
      camera.lookAt(0, 0, -1);
      return;
    }
    const p = progressRef.current; // 0..1
    const eased = 1 - Math.pow(1 - p, 1.8);
    const targetZ = 4 - eased * (TUNNEL_LENGTH - 30);
    camera.position.z += (targetZ - camera.position.z) * Math.min(1, delta * 4);
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.22) * 0.18;
    camera.position.y = Math.cos(t * 0.18) * 0.14;
    camera.rotation.z = Math.sin(t * 0.13) * 0.012;
  });
  return null;
}
