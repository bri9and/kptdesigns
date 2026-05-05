"use client";

/**
 * Viewport — the small "live" thumbnail at the top of each operator.
 *
 * Each `vp` kind is a tiny self-animating SVG/CSS gadget. They share one
 * shared rAF tick provided via the `t` prop (seconds since mount). This keeps
 * the network at a single tick — no per-component timers — and stays cheap
 * even with 16+ operators on screen.
 *
 * `frozen` (reduced-motion) freezes them to a static composition.
 */

import { OP_COLORS, type OpType } from "../_engine/palette";
import type { Operator } from "../_engine/operators";

interface Props {
  op: Operator;
  /** seconds since mount, drives all animation */
  t: number;
  /** stop animating */
  frozen?: boolean;
}

const W = 152;
const H = 52;

export default function Viewport({ op, t, frozen }: Props) {
  const time = frozen ? 0 : t;
  const color = OP_COLORS[op.type];

  return (
    <div
      style={{
        width: "100%",
        height: 60,
        background: "#0d0d0d",
        borderBottom: "1px solid rgba(255,255,255,0.04)",
        position: "relative",
        overflow: "hidden",
      }}
      aria-hidden
    >
      <Inner op={op} time={time} color={color} />

      {/* hairline crosshair like a real viewport */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
          backgroundSize: "16px 16px",
          mixBlendMode: "screen",
          pointerEvents: "none",
        }}
      />
    </div>
  );
}

function Inner({ op, time, color }: { op: Operator; time: number; color: string }) {
  switch (op.vp) {
    case "tex_gradient":   return <TexGradient time={time} color={color} type={op.type} />;
    case "tex_grid":       return <TexGrid time={time} color={color} />;
    case "tex_portfolio":  return <TexPortfolio time={time} />;
    case "tex_logo":       return <TexLogo />;
    case "chop_wave":      return <ChopWave time={time} color={color} />;
    case "chop_multi":     return <ChopMulti time={time} color={color} />;
    case "chop_steps":     return <ChopSteps time={time} color={color} />;
    case "chop_uptime":    return <ChopUptime time={time} color={color} />;
    case "sop_wire":       return <SopWire time={time} color={color} />;
    case "mat_sphere":     return <MatSphere color={color} />;
    case "dat_table":      return <DatTable time={time} />;
    case "dat_calls":      return <DatCalls time={time} />;
    case "dat_domains":    return <DatDomains time={time} />;
    case "dat_kv":         return <DatKv />;
    case "dat_faq":        return <DatFaq />;
    case "comp_subnet":    return <CompSubnet time={time} color={color} />;
    case "comp_logo":      return <CompLogo />;
    case "exec_run":       return <ExecRun time={time} />;
    default:               return null;
  }
}

/* -------------------- TOPs -------------------- */

function TexGradient({ time, color }: { time: number; color: string; type: OpType }) {
  // Slowly shifting magenta gradient — feels like a generative TOP cooking.
  const a = (Math.sin(time * 0.7) + 1) / 2;
  const b = (Math.cos(time * 0.5) + 1) / 2;
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `radial-gradient(ellipse at ${30 + a * 40}% ${30 + b * 40}%, ${color}cc 0%, ${color}33 35%, #0d0d0d 80%)`,
      }}
    />
  );
}

function TexGrid({ time, color }: { time: number; color: string }) {
  // Tailwind-y checker that pulses
  const op = 0.35 + 0.25 * Math.sin(time * 1.3);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        background: `
          linear-gradient(135deg, ${color}40, ${color}10),
          repeating-linear-gradient(0deg, ${color}${Math.round(op * 60).toString(16).padStart(2,"0")} 0 1px, transparent 1px 8px),
          repeating-linear-gradient(90deg, ${color}${Math.round(op * 60).toString(16).padStart(2,"0")} 0 1px, transparent 1px 8px)
        `,
      }}
    />
  );
}

function TexPortfolio({ time }: { time: number }) {
  // 3×4 grid of mini tiles
  const tiles = Array.from({ length: 12 });
  const palette = ["#FF8000", "#3D8BFF", "#1FCFB6", "#FF00AA", "#7FFF00"];
  return (
    <div
      style={{
        position: "absolute",
        inset: 4,
        display: "grid",
        gridTemplateColumns: "repeat(4,1fr)",
        gridTemplateRows: "repeat(3,1fr)",
        gap: 2,
      }}
    >
      {tiles.map((_, i) => {
        const flicker = (Math.sin(time * 1.7 + i * 0.6) + 1) / 2;
        const color = palette[i % palette.length];
        return (
          <div
            key={i}
            style={{
              background: `linear-gradient(135deg, ${color}${Math.round(40 + flicker * 100).toString(16)}, #1a1a1a)`,
              borderRadius: 1,
            }}
          />
        );
      })}
    </div>
  );
}

function TexLogo() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        background: "radial-gradient(ellipse at center, rgba(255,176,0,0.20), transparent 65%)",
      }}
    >
      <span style={{ fontFamily: "var(--td-mono), monospace", fontSize: 10, letterSpacing: 4, color: "#FFB000", fontWeight: 700 }}>
        KPT
      </span>
    </div>
  );
}

/* -------------------- CHOPs -------------------- */

function ChopWave({ time, color }: { time: number; color: string }) {
  // single noisy sine wave
  const pts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const x = (i / 40) * W;
    const y =
      H / 2 +
      Math.sin(i * 0.32 + time * 2.2) * (H / 3) +
      Math.sin(i * 0.81 + time * 3.1) * (H / 9);
    pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth={1.2} opacity={0.95} />
    </svg>
  );
}

function ChopMulti({ time, color }: { time: number; color: string }) {
  // 4 stacked waveforms
  const channels = 4;
  const polylines = Array.from({ length: channels }).map((_, c) => {
    const yMid = ((c + 0.5) / channels) * H;
    const amp = (H / channels) * 0.38;
    const freq = 0.25 + c * 0.18;
    const phase = c * 1.7;
    const pts: string[] = [];
    for (let i = 0; i <= 32; i++) {
      const x = (i / 32) * W;
      const y = yMid + Math.sin(i * freq + time * (1.4 + c * 0.4) + phase) * amp;
      pts.push(`${x.toFixed(1)},${y.toFixed(1)}`);
    }
    return pts.join(" ");
  });
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      {polylines.map((p, i) => (
        <polyline key={i} points={p} fill="none" stroke={color} strokeWidth={1} opacity={0.45 + i * 0.13} />
      ))}
    </svg>
  );
}

function ChopSteps({ time, color }: { time: number; color: string }) {
  // 4-stage stairstep + a moving cursor
  const cursor = ((time * 0.4) % 1) * W;
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <polyline
        points={[[0,42],[38,42],[38,30],[76,30],[76,18],[114,18],[114,8],[152,8]].map((p) => p.join(",")).join(" ")}
        fill="none"
        stroke={color}
        strokeWidth={1.4}
      />
      <line x1={cursor} y1={0} x2={cursor} y2={H} stroke="#FFD700" strokeWidth={0.7} opacity={0.9} />
    </svg>
  );
}

function ChopUptime({ time, color }: { time: number; color: string }) {
  // 99.99% — flat near top with tiny jitter every few frames
  const pts: string[] = [];
  for (let i = 0; i <= 40; i++) {
    const x = (i / 40) * W;
    const j = Math.sin(i * 1.7 + time * 6) > 0.92 ? 4 : 0;
    pts.push(`${x.toFixed(1)},${(8 + j).toFixed(1)}`);
  }
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <polyline points={pts.join(" ")} fill="none" stroke={color} strokeWidth={1.2} />
      <text x={W - 4} y={H - 4} fill={color} fontSize={8} textAnchor="end" fontFamily="var(--td-mono), monospace" opacity={0.85}>
        99.99%
      </text>
    </svg>
  );
}

/* -------------------- SOPs -------------------- */

function SopWire({ time, color }: { time: number; color: string }) {
  // simple rotating cube wireframe (orthographic)
  const a = time * 0.7;
  const cs = Math.cos(a), sn = Math.sin(a);
  const cx = W / 2, cy = H / 2;
  const r = 18;
  const pts = [
    [-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],
    [-1,-1, 1],[1,-1, 1],[1,1, 1],[-1,1, 1],
  ].map(([x,y,z]) => {
    const xr = x * cs - z * sn;
    const zr = x * sn + z * cs;
    const yr = y * 0.85 + zr * 0.18;
    return [cx + xr * r, cy + yr * r];
  });
  const edges: [number,number][] = [
    [0,1],[1,2],[2,3],[3,0],
    [4,5],[5,6],[6,7],[7,4],
    [0,4],[1,5],[2,6],[3,7],
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      {edges.map(([a,b], i) => (
        <line
          key={i}
          x1={pts[a][0]} y1={pts[a][1]}
          x2={pts[b][0]} y2={pts[b][1]}
          stroke={color} strokeWidth={0.9} opacity={0.85}
        />
      ))}
    </svg>
  );
}

/* -------------------- MATs -------------------- */

function MatSphere({ color }: { color: string }) {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
      }}
    >
      <div
        style={{
          width: 38,
          height: 38,
          borderRadius: "50%",
          background: `radial-gradient(circle at 30% 30%, #fff 0%, ${color} 35%, #0a0a0a 90%)`,
          boxShadow: `0 0 16px ${color}66`,
        }}
      />
    </div>
  );
}

/* -------------------- DATs -------------------- */

function DatTable({ time }: { time: number }) {
  // generic mono rows scrolling
  const rows = ["row_001  OK", "row_002  OK", "row_003  OK", "row_004  COOK", "row_005  OK", "row_006  OK"];
  const offset = Math.floor(time * 6) % rows.length;
  const visible = [...rows.slice(offset), ...rows.slice(0, offset)];
  return (
    <div style={{ position: "absolute", inset: 6, fontFamily: "var(--td-mono), monospace", fontSize: 8, color: "#cfcfcf", lineHeight: "1.5" }}>
      {visible.slice(0, 5).map((r, i) => <div key={i}>{r}</div>)}
    </div>
  );
}

function DatCalls({ time }: { time: number }) {
  // inbound calls — keep stable display; scroll feel
  const calls = [
    "+1.412  47s  Q",
    "+1.602  1m   M",
    "+1.215  22s  R",
    "+1.412  3m   Q",
    "+1.928  41s  AH",
  ];
  const offset = Math.floor(time * 0.8) % calls.length;
  const visible = [...calls.slice(offset), ...calls.slice(0, offset)];
  return (
    <div style={{ position: "absolute", inset: 6, fontFamily: "var(--td-mono), monospace", fontSize: 8, lineHeight: "1.6" }}>
      {visible.slice(0, 5).map((r, i) => (
        <div key={i} style={{ color: i === 0 ? "#FFB000" : "#cfcfcf", opacity: 1 - i * 0.14 }}>
          {r}
        </div>
      ))}
    </div>
  );
}

function DatDomains({ time }: { time: number }) {
  const rows = [
    [".com  AVAILABLE",   "#7FFF00"],
    [".io   AVAILABLE",   "#7FFF00"],
    [".dev  AVAILABLE",   "#7FFF00"],
    [".ai   PREMIUM",     "#FFB000"],
    [".net  TAKEN",       "#FF4040"],
  ] as const;
  const blink = Math.floor(time * 2) % 2;
  return (
    <div style={{ position: "absolute", inset: 6, fontFamily: "var(--td-mono), monospace", fontSize: 8, lineHeight: "1.55" }}>
      {rows.map(([txt, col], i) => (
        <div key={i} style={{ color: col, opacity: i === 3 && blink ? 0.4 : 1 }}>{txt}</div>
      ))}
    </div>
  );
}

function DatKv() {
  const rows = [
    ["no_templates",   "TRUE"],
    ["owned_outright", "TRUE"],
    ["lock_in",        "FALSE"],
    ["page_builders",  "FALSE"],
  ];
  return (
    <div style={{ position: "absolute", inset: 6, fontFamily: "var(--td-mono), monospace", fontSize: 8, lineHeight: "1.55" }}>
      {rows.map(([k, v], i) => (
        <div key={i} style={{ color: "#cfcfcf", display: "flex", justifyContent: "space-between" }}>
          <span style={{ color: "#888" }}>{k}</span>
          <span style={{ color: v === "TRUE" ? "#7FFF00" : "#FF4040" }}>{v}</span>
        </div>
      ))}
    </div>
  );
}

function DatFaq() {
  const rows = ["Q: timeline?", "Q: ownership?", "Q: stack?", "Q: SEO?"];
  return (
    <div style={{ position: "absolute", inset: 6, fontFamily: "var(--td-mono), monospace", fontSize: 8, lineHeight: "1.6", color: "#cfcfcf" }}>
      {rows.map((r, i) => <div key={i}>{r}</div>)}
    </div>
  );
}

/* -------------------- COMPs -------------------- */

function CompSubnet({ time, color }: { time: number; color: string }) {
  // tiny 3-node subnetwork
  const nodes: [number,number][] = [
    [22 + Math.sin(time) * 3, 16],
    [76, 38 + Math.cos(time * 1.3) * 3],
    [128 + Math.sin(time * 0.8) * 3, 18],
  ];
  return (
    <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
      <line x1={nodes[0][0]} y1={nodes[0][1]} x2={nodes[1][0]} y2={nodes[1][1]} stroke={color} strokeWidth={0.8} opacity={0.7} />
      <line x1={nodes[1][0]} y1={nodes[1][1]} x2={nodes[2][0]} y2={nodes[2][1]} stroke={color} strokeWidth={0.8} opacity={0.7} />
      {nodes.map(([x, y], i) => (
        <rect key={i} x={x - 8} y={y - 5} width={16} height={10} rx={2} fill="#1a1a1a" stroke={color} strokeWidth={0.8} />
      ))}
    </svg>
  );
}

function CompLogo() {
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        background: "radial-gradient(circle, rgba(255,176,0,0.12), transparent 70%)",
      }}
    >
      <div style={{ fontFamily: "var(--td-mono), monospace", fontSize: 9, letterSpacing: 3, color: "#FFB000", fontWeight: 700 }}>
        KPT_WEB
      </div>
      <div style={{ fontFamily: "var(--td-mono), monospace", fontSize: 7, letterSpacing: 2, color: "#666", marginTop: 2 }}>
        EST.2004
      </div>
    </div>
  );
}

/* -------------------- EXEC -------------------- */

function ExecRun({ time }: { time: number }) {
  const pulse = 0.5 + 0.5 * Math.sin(time * 3.4);
  return (
    <div
      style={{
        position: "absolute",
        inset: 0,
        display: "grid",
        placeItems: "center",
        background: `radial-gradient(circle at center, rgba(255,176,0,${0.18 + 0.12 * pulse}), transparent 70%)`,
      }}
    >
      <div
        style={{
          fontFamily: "var(--td-mono), monospace",
          fontSize: 11,
          letterSpacing: 2,
          color: "#FFB000",
          fontWeight: 700,
          textShadow: `0 0 ${4 + pulse * 6}px rgba(255,176,0,${0.5 + pulse * 0.5})`,
        }}
      >
        {"// RUN"}
      </div>
    </div>
  );
}
