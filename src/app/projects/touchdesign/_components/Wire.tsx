"use client";

/**
 * Wire — a curved bezier between two ports on the canvas.
 *
 * Rendered inside one shared <svg> in <Network/>, so we don't pay for one SVG
 * per wire. Drawn in a coordinate space matching the canvas (svg viewBox grows
 * with the network). The pan/zoom transform is applied to the parent group.
 */

import { OP_COLORS, OP_GLOW, type OpType } from "../_engine/palette";

interface Props {
  id: string;
  x1: number; y1: number;
  x2: number; y2: number;
  type: OpType;
  highlighted: boolean;
  dimmed: boolean;
  flowOffset: number;       // animates dashes
  hovered: boolean;
  onHover: (id: string | null) => void;
}

export default function Wire({
  id, x1, y1, x2, y2, type, highlighted, dimmed, flowOffset, hovered, onHover,
}: Props) {
  const color = OP_COLORS[type];
  const glow  = OP_GLOW[type];
  const dx = Math.max(60, Math.abs(x2 - x1) * 0.55);

  // standard horizontal-bezier (TD style — wires go right out of source, left into dest)
  const d = `M ${x1} ${y1} C ${x1 + dx} ${y1}, ${x2 - dx} ${y2}, ${x2} ${y2}`;

  const baseOpacity = dimmed ? 0.18 : highlighted || hovered ? 1 : 0.78;
  const widthBase   = highlighted ? 2.2 : 1.6;

  return (
    <g
      onMouseEnter={() => onHover(id)}
      onMouseLeave={() => onHover(null)}
      style={{ cursor: "crosshair" }}
    >
      {/* underglow when highlighted */}
      {(highlighted || hovered) && (
        <path
          d={d}
          fill="none"
          stroke={glow}
          strokeWidth={6}
          strokeLinecap="round"
          opacity={0.5}
          style={{ filter: "blur(2px)" }}
        />
      )}
      {/* invisible thick line for hover */}
      <path
        d={d}
        fill="none"
        stroke="transparent"
        strokeWidth={14}
        pointerEvents="stroke"
      />
      {/* base line */}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={widthBase}
        strokeLinecap="round"
        opacity={baseOpacity}
      />
      {/* animated data flow */}
      <path
        d={d}
        fill="none"
        stroke={color}
        strokeWidth={widthBase + 0.5}
        strokeLinecap="round"
        opacity={dimmed ? 0.22 : 0.85}
        strokeDasharray="6 14"
        strokeDashoffset={-flowOffset}
        style={{ mixBlendMode: "screen" }}
      />
    </g>
  );
}
