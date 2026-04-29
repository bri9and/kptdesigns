"use client";

/**
 * NeuralVisuals — R3F primitives for V21 Neural.
 *
 * - buildNetwork()   : 6-layer / ~124-neuron / sparse-fanout edge graph
 * - NeuronField      : instanced spheres + additive glow billboards
 * - EdgeField        : per-edge LineBasicMaterial bundle, layer-aware fire
 * - CameraRig        : progressRef-driven dolly + cursor parallax
 *
 * Each tick reads activeLayerRef + transitFireRef (mutable refs the engine
 * updates each frame) so the scene never re-renders.
 */

import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

import { NEURAL_PALETTE } from "./NeuralShared";

export type Neuron = { pos: [number, number, number]; layer: number; size: number; hue: number };
export type Edge = { a: number; b: number; weight: number };

export const CAMERA_Z_START = 12;
export const CAMERA_Z_END = -12;

export function buildNetwork(): { neurons: Neuron[]; edges: Edge[] } {
  const neurons: Neuron[] = [];
  const layers = [12, 22, 28, 28, 22, 12];
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

export function NeuronField({
  neurons,
  activeLayerRef,
  transitFireRef,
  reducedMotion,
}: {
  neurons: Neuron[];
  activeLayerRef: React.MutableRefObject<number>;
  transitFireRef: React.MutableRefObject<number>;
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
    const activeLayer = activeLayerRef.current;
    const fireBoost = transitFireRef.current;
    neurons.forEach((n, i) => {
      const distToActive = Math.abs(n.layer - activeLayer);
      const proximity = Math.max(0, 1 - distToActive / 2);
      const phase = t * 0.9 - n.layer * 0.7;
      const pulse = 0.5 + 0.5 * Math.sin(phase);
      const intensity = 0.25 + proximity * 0.75 * pulse + fireBoost * 0.45 * proximity;

      tmpColor.copy(colorLatent).lerp(colorCyan, n.hue);
      if (n.layer === 5) tmpColor.copy(colorPink);
      tmpColor.multiplyScalar(0.5 + intensity);
      instRef.current.setColorAt(i, tmpColor);

      const glowScale = n.size * (5 + proximity * 4 + pulse * 2 + fireBoost * 3 * proximity);
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
      <instancedMesh ref={instRef} args={[undefined, undefined, neurons.length]}>
        <sphereGeometry args={[1, 12, 12]} />
        <meshBasicMaterial toneMapped={false} />
      </instancedMesh>
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

export function EdgeField({
  edges,
  neurons,
  activeLayerRef,
  transitFireRef,
  reducedMotion,
}: {
  edges: Edge[];
  neurons: Neuron[];
  activeLayerRef: React.MutableRefObject<number>;
  transitFireRef: React.MutableRefObject<number>;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    if (reducedMotion || !groupRef.current) return;
    const t = state.clock.getElapsedTime();
    const activeLayer = activeLayerRef.current;
    const fireBoost = transitFireRef.current;
    groupRef.current.children.forEach((child, i) => {
      const edge = edges[i];
      if (!edge) return;
      const sourceLayer = neurons[edge.a].layer;
      const distToActive = Math.abs(sourceLayer - activeLayer);
      const isActive = distToActive <= 1;
      const proximity = Math.max(0, 1 - distToActive / 2);
      const phase = t * 1.4 - sourceLayer * 0.5 + i * 0.02;
      const fire = isActive ? 0.5 + 0.5 * Math.sin(phase) : 0;
      const baseOpacity = 0.04 + edge.weight * 0.08;
      const mat = (child as THREE.Mesh).material as THREE.LineBasicMaterial;
      if (mat) {
        const transitFlare = fireBoost * 0.5 * proximity * edge.weight;
        mat.opacity = baseOpacity + fire * 0.55 * edge.weight + transitFlare;
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

export function CameraRig({
  progressRef,
  reducedMotion,
}: {
  progressRef: React.MutableRefObject<number>;
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
    const p = progressRef.current;
    const z = CAMERA_Z_START + (CAMERA_Z_END - CAMERA_Z_START) * p;
    const y = -p * 0.6;
    const camX = reducedMotion ? 0 : target.current.x;
    const camY = reducedMotion ? 0 : -target.current.y;
    state.camera.position.lerp(new THREE.Vector3(camX, camY + y, z), 0.06);
    state.camera.lookAt(0, 0, z - 3);
  });
  return null;
}
