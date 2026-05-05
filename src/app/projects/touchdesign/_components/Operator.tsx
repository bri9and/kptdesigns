"use client";

/**
 * Operator — a single rounded-rectangle node on the canvas.
 *
 * Layout (top → bottom):
 *  ┌────────────────────────────┐
 *  │ ░░ COLORED HEADER BAR ░░░ │ ← op type color, type label on left, comment right
 *  ├────────────────────────────┤
 *  │ [ live viewport thumbnail ] │ ← <Viewport/>
 *  │   kpt_agents                │ ← name in mono caps small
 *  └────────────────────────────┘
 *  Ports:  ports on left edge = inputs;  ports on right edge = outputs
 *
 * The component renders ABSOLUTELY positioned on the canvas (left/top come
 * from `op.x/op.y`). Network applies the pan/zoom transform to the parent
 * layer, so this stays naive about the camera.
 */

import { memo, useMemo } from "react";
import {
  OP_COLORS, OP_GLOW, OP_W, OP_H, OP_RADIUS, OP_HEADER_H, SELECT_YELLOW,
} from "../_engine/palette";
import type { Operator as Op } from "../_engine/operators";
import Viewport from "./Viewport";

interface Props {
  op: Op;
  selected: boolean;
  dimmed: boolean;
  /** flash when a wire's source is hovered */
  highlighted: boolean;
  /** rAF time in seconds (drives viewport thumbnails). */
  t: number;
  frozen?: boolean;
  onSelect: (id: string) => void;
  onOpen: (id: string) => void;
}

function OperatorImpl({
  op, selected, dimmed, highlighted, t, frozen, onSelect, onOpen,
}: Props) {
  const color = OP_COLORS[op.type];
  const glow = OP_GLOW[op.type];

  const portSpacing = (n: number, idx: number) => {
    // distribute n ports across the operator height (excluding header).
    const usable = OP_H - OP_HEADER_H - 12;
    if (n === 1) return OP_HEADER_H + usable / 2 + 6;
    return OP_HEADER_H + 8 + (idx * usable) / Math.max(1, n - 1);
  };

  const inputs  = useMemo(() => Array.from({ length: op.inputs }), [op.inputs]);
  const outputs = useMemo(() => Array.from({ length: op.outputs }), [op.outputs]);

  return (
    <div
      role="button"
      tabIndex={0}
      aria-label={`${op.type} ${op.name}${selected ? " (selected)" : ""}`}
      onClick={(e) => { e.stopPropagation(); onSelect(op.id); }}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault(); onSelect(op.id);
        }
        if (e.key === "Enter" && e.shiftKey) onOpen(op.id);
      }}
      onDoubleClick={(e) => { e.stopPropagation(); onOpen(op.id); }}
      style={{
        position: "absolute",
        left: op.x,
        top: op.y,
        width: OP_W,
        height: OP_H,
        background: "#1a1a1a",
        border: `1px solid ${selected ? SELECT_YELLOW : op.flagship ? "#3a3a3a" : "#2a2a2a"}`,
        borderRadius: OP_RADIUS,
        boxShadow: selected
          ? `0 0 0 1px ${SELECT_YELLOW}, 0 0 24px rgba(255,215,0,0.35)`
          : highlighted
            ? `0 0 0 1px ${color}, 0 0 18px ${glow}`
            : op.flagship
              ? `0 0 0 1px rgba(255,176,0,0.2), 0 0 28px rgba(255,176,0,0.15)`
              : `0 1px 0 rgba(0,0,0,0.6)`,
        opacity: dimmed ? 0.35 : 1,
        transition: "opacity 220ms, box-shadow 220ms, border-color 220ms",
        cursor: "pointer",
        userSelect: "none",
        outline: "none",
      }}
    >
      {/* header bar */}
      <div
        style={{
          height: OP_HEADER_H,
          background: color,
          borderTopLeftRadius: OP_RADIUS,
          borderTopRightRadius: OP_RADIUS,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 8px",
          fontFamily: "var(--td-mono), monospace",
          fontSize: 9,
          fontWeight: 700,
          letterSpacing: 1.2,
          color: op.type === "DAT" || op.type === "CHOP" || op.type === "EXEC" ? "#0a0a0a" : "#fff",
        }}
      >
        <span>{op.type}</span>
        <span style={{ opacity: 0.6, fontWeight: 500, letterSpacing: 0.5 }}>
          {op.comment ?? ""}
        </span>
      </div>

      {/* viewport */}
      <Viewport op={op} t={t} frozen={frozen} />

      {/* name strip */}
      <div
        style={{
          position: "absolute",
          left: 0, right: 0, bottom: 0,
          height: OP_H - OP_HEADER_H - 60,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 10px",
          fontFamily: "var(--td-mono), monospace",
          fontSize: 11,
          color: "#dcdcdc",
          letterSpacing: 0.8,
          background: "linear-gradient(180deg, #1a1a1a 0%, #161616 100%)",
        }}
      >
        <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
          {op.name}
        </span>
        {op.flagship && (
          <span
            aria-hidden
            style={{
              fontSize: 8,
              letterSpacing: 1.5,
              padding: "1px 5px",
              border: "1px solid rgba(255,176,0,0.4)",
              color: "#FFB000",
              borderRadius: 2,
            }}
          >
            FLAG
          </span>
        )}
      </div>

      {/* corner highlight (top-left "L") when selected — TD style */}
      {selected && (
        <>
          <span aria-hidden style={cornerStyle("tl")} />
          <span aria-hidden style={cornerStyle("tr")} />
          <span aria-hidden style={cornerStyle("bl")} />
          <span aria-hidden style={cornerStyle("br")} />
        </>
      )}

      {/* INPUT PORTS (left edge) */}
      {inputs.map((_, i) => (
        <span
          key={`in-${i}`}
          aria-hidden
          style={{
            position: "absolute",
            left: -4,
            top: portSpacing(op.inputs, i) - 4,
            width: 8, height: 8,
            background: "#0d0d0d",
            border: `1.5px solid ${color}`,
            borderRadius: "50%",
          }}
        />
      ))}
      {/* OUTPUT PORTS (right edge) */}
      {outputs.map((_, i) => (
        <span
          key={`out-${i}`}
          aria-hidden
          style={{
            position: "absolute",
            right: -4,
            top: portSpacing(op.outputs, i) - 4,
            width: 8, height: 8,
            background: color,
            border: `1.5px solid ${color}`,
            borderRadius: "50%",
            boxShadow: `0 0 6px ${glow}`,
          }}
        />
      ))}
    </div>
  );
}

function cornerStyle(corner: "tl"|"tr"|"bl"|"br"): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 10, height: 10,
    border: "0 solid #FFD700",
    pointerEvents: "none",
  };
  if (corner === "tl") return { ...base, top: -2, left: -2, borderTopWidth: 2, borderLeftWidth: 2 };
  if (corner === "tr") return { ...base, top: -2, right: -2, borderTopWidth: 2, borderRightWidth: 2 };
  if (corner === "bl") return { ...base, bottom: -2, left: -2, borderBottomWidth: 2, borderLeftWidth: 2 };
  return { ...base, bottom: -2, right: -2, borderBottomWidth: 2, borderRightWidth: 2 };
}

/** Compute port world position (canvas-space) for wire endpoints. */
export function portPosition(op: Op, side: "in" | "out", idx: number) {
  const usable = OP_H - OP_HEADER_H - 12;
  const total = side === "in" ? op.inputs : op.outputs;
  let y: number;
  if (total === 1) y = OP_HEADER_H + usable / 2 + 6;
  else y = OP_HEADER_H + 8 + (idx * usable) / Math.max(1, total - 1);
  return {
    x: side === "in" ? op.x : op.x + OP_W,
    y: op.y + y,
  };
}

export default memo(OperatorImpl);
