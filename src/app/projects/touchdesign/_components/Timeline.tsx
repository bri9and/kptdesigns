"use client";

/**
 * Timeline — bottom strip with frame counter, transport, sparkline.
 */

import { useState } from "react";

interface Props {
  frame: number;
  fps: number;
  cookSparkline: number[];
  playing: boolean;
  onTogglePlay: () => void;
  onStop: () => void;
}

export default function Timeline({
  frame, fps, cookSparkline, playing, onTogglePlay, onStop,
}: Props) {
  const [scrub, setScrub] = useState(false);

  // sparkline polyline points
  const W = 220, H = 28;
  const max = Math.max(0.001, ...cookSparkline);
  const pts = cookSparkline
    .map((v, i) => {
      const x = (i / Math.max(1, cookSparkline.length - 1)) * W;
      const y = H - 2 - (v / max) * (H - 4);
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <div
      role="region"
      aria-label="Timeline"
      style={{
        position: "absolute",
        bottom: 24,
        left: 0, right: 0,
        height: 44,
        background: "rgba(20,20,20,0.96)",
        borderTop: "1px solid #2a2a2a",
        display: "flex",
        alignItems: "center",
        padding: "0 12px",
        gap: 14,
        zIndex: 24,
        backdropFilter: "blur(8px)",
        fontFamily: "var(--td-mono), monospace",
      }}
    >
      {/* transport */}
      <div style={{ display: "flex", gap: 4 }}>
        <TransportButton onClick={onTogglePlay} active={playing} aria-label={playing ? "Pause" : "Play"}>
          {playing ? "❚❚" : "▶"}
        </TransportButton>
        <TransportButton onClick={onStop} aria-label="Stop">■</TransportButton>
      </div>

      {/* frame counter */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 9, color: "#666", letterSpacing: 1.5 }}>FRAME</span>
        <span
          style={{
            fontSize: 13, color: "#FFB000", letterSpacing: 1.5, minWidth: 78,
            textShadow: "0 0 8px rgba(255,176,0,0.35)",
          }}
        >
          {String(frame).padStart(7, "0")}
        </span>
      </div>

      {/* scrub bar */}
      <div
        style={{
          flex: 1, height: 6, background: "#0d0d0d", borderRadius: 1,
          position: "relative", cursor: "pointer", border: "1px solid #2a2a2a",
        }}
        onMouseDown={() => setScrub(true)}
        onMouseUp={() => setScrub(false)}
        onMouseLeave={() => setScrub(false)}
        aria-hidden
      >
        <div
          style={{
            position: "absolute",
            top: 0, bottom: 0, left: 0,
            width: `${((frame % 600) / 600) * 100}%`,
            background: "linear-gradient(90deg, #FFB000aa, #FFD700)",
            borderRadius: 1,
            opacity: scrub ? 1 : 0.7,
          }}
        />
      </div>

      {/* cook-time sparkline */}
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <span style={{ fontSize: 9, color: "#666", letterSpacing: 1.5 }}>COOK</span>
        <svg width={W} height={H} style={{ background: "#0d0d0d", border: "1px solid #2a2a2a", borderRadius: 1 }}>
          <polyline points={pts} fill="none" stroke="#7FFF00" strokeWidth={1.2} opacity={0.95} />
        </svg>
      </div>

      {/* fps + perf */}
      <div style={{ display: "flex", gap: 14, fontSize: 10, color: "#666", letterSpacing: 1.4 }}>
        <span>fps: <span style={{ color: "#7FFF00" }}>{fps.toFixed(1)}</span></span>
        <span>gpu: <span style={{ color: "#cfcfcf" }}>12%</span></span>
        <span>cpu: <span style={{ color: "#cfcfcf" }}>4%</span></span>
      </div>
    </div>
  );
}

function TransportButton({
  children, onClick, active, ...rest
}: React.ButtonHTMLAttributes<HTMLButtonElement> & { active?: boolean }) {
  return (
    <button
      onClick={onClick}
      {...rest}
      style={{
        width: 28, height: 22,
        background: active ? "#FFB000" : "#0d0d0d",
        border: `1px solid ${active ? "#FFB000" : "#2a2a2a"}`,
        color: active ? "#0a0a0a" : "#cfcfcf",
        fontSize: 10,
        fontFamily: "var(--td-mono), monospace",
        cursor: "pointer",
        borderRadius: 2,
        display: "grid",
        placeItems: "center",
      }}
    >
      {children}
    </button>
  );
}
