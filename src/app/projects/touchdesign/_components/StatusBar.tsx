"use client";

/**
 * StatusBar — slim strip below the timeline. Hint text + zoom + pan coords.
 */

interface Props {
  zoom: number;
  panX: number;
  panY: number;
  selectedName: string | null;
  hoverHint: string;
}

export default function StatusBar({ zoom, panX, panY, selectedName, hoverHint }: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      style={{
        position: "absolute",
        bottom: 0, left: 0, right: 0,
        height: 24,
        background: "#101010",
        borderTop: "1px solid #2a2a2a",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 12px",
        zIndex: 23,
        fontFamily: "var(--td-mono), monospace",
        fontSize: 9,
        color: "#666",
        letterSpacing: 1.4,
      }}
    >
      <div style={{ display: "flex", gap: 14 }}>
        <span>zoom: <span style={{ color: "#cfcfcf" }}>{zoom.toFixed(2)}×</span></span>
        <span>pan: <span style={{ color: "#cfcfcf" }}>{Math.round(panX)},{Math.round(panY)}</span></span>
        {selectedName && (
          <span>op: <span style={{ color: "#FFB000" }}>{selectedName}</span></span>
        )}
      </div>
      <div style={{ color: "#888" }}>
        {hoverHint}
      </div>
      <div style={{ color: "#444" }}>
        {"// drag · wheel-zoom · 1-7 type · h home · esc deselect"}
      </div>
    </div>
  );
}
