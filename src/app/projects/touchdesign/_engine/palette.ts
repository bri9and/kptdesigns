/**
 * TouchDesigner-style palette + design tokens.
 * Every operator type has a signature header bar color (matches actual TD UI).
 */

export type OpType = "TOP" | "CHOP" | "SOP" | "MAT" | "DAT" | "COMP" | "EXEC";

export const OP_COLORS: Record<OpType, string> = {
  TOP:  "#FF00AA", // Texture     — magenta
  CHOP: "#7FFF00", // Channel     — lime
  SOP:  "#3D8BFF", // Surface     — cobalt
  MAT:  "#1FCFB6", // Material    — teal
  DAT:  "#E0E0E0", // Data        — off-white
  COMP: "#888888", // Component   — slate
  EXEC: "#FFB000", // Executable  — amber (KPT brand)
};

/** Slightly muted variants for deselected wire glow / shadow accents. */
export const OP_GLOW: Record<OpType, string> = {
  TOP:  "rgba(255,0,170,0.55)",
  CHOP: "rgba(127,255,0,0.55)",
  SOP:  "rgba(61,139,255,0.55)",
  MAT:  "rgba(31,207,182,0.55)",
  DAT:  "rgba(224,224,224,0.45)",
  COMP: "rgba(136,136,136,0.45)",
  EXEC: "rgba(255,176,0,0.65)",
};

export const OP_TYPE_ORDER: OpType[] = [
  "TOP", "CHOP", "SOP", "MAT", "DAT", "COMP", "EXEC",
];

export const CANVAS_BG    = "#1a1a1a";
export const CANVAS_BG_2  = "#141414";
export const CANVAS_GRID  = "#262626";
export const CANVAS_LINE  = "rgba(255,255,255,0.04)";

export const SELECT_YELLOW = "#FFD700";
export const PANEL_BG      = "#1f1f1f";
export const PANEL_BORDER  = "#2a2a2a";
export const TEXT_DIM      = "#888";
export const TEXT_DIMMER   = "#555";
export const TEXT_BRIGHT   = "#e8e8e8";

export const OP_W = 168;
export const OP_H = 116;
export const OP_RADIUS = 8;
export const OP_HEADER_H = 18;
export const OP_VIEWPORT_H = 60;
export const PORT_R = 4;

export const GRID = 24;

/** Min/max zoom for the canvas. */
export const ZOOM_MIN = 0.3;
export const ZOOM_MAX = 2.5;
