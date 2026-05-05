"use client";

/**
 * Toolbar — top bar with operator-type tabs + breadcrumb + build info.
 * Clicking a type tab sets the type filter; clicking again clears it.
 */

import { OP_COLORS, OP_TYPE_ORDER, type OpType } from "../_engine/palette";

interface Props {
  filter: OpType | null;
  onFilter: (t: OpType | null) => void;
  onHome: () => void;
  build: number;
}

export default function Toolbar({ filter, onFilter, onHome, build }: Props) {
  return (
    <div
      role="toolbar"
      aria-label="Operator types and breadcrumb"
      style={{
        position: "absolute",
        top: 0, left: 0, right: 0,
        height: 40,
        background: "rgba(20,20,20,0.96)",
        borderBottom: "1px solid #2a2a2a",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 12px",
        zIndex: 30,
        backdropFilter: "blur(8px)",
        fontFamily: "var(--td-mono), monospace",
      }}
    >
      {/* left: brand + breadcrumb */}
      <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
        <button
          onClick={onHome}
          aria-label="Home — recenter and clear filters"
          style={{
            display: "flex", alignItems: "center", gap: 6,
            background: "transparent", border: "1px solid #2a2a2a",
            padding: "4px 10px", borderRadius: 3,
            color: "#FFB000", fontSize: 10, letterSpacing: 2,
            fontFamily: "var(--td-mono), monospace", cursor: "pointer",
          }}
        >
          KPT
        </button>
        <span style={{ fontSize: 10, color: "#666", letterSpacing: 1.4 }}>
          /project1/<span style={{ color: "#cfcfcf" }}>kpt_web</span>
        </span>
      </div>

      {/* center: type tabs */}
      <div style={{ display: "flex", gap: 2 }}>
        {OP_TYPE_ORDER.map((t) => {
          const active = filter === t;
          return (
            <button
              key={t}
              onClick={() => onFilter(active ? null : t)}
              aria-pressed={active}
              aria-label={`Filter by ${t}`}
              style={{
                background: active ? OP_COLORS[t] : "transparent",
                border: `1px solid ${active ? OP_COLORS[t] : "#2a2a2a"}`,
                color: active
                  ? (t === "DAT" || t === "CHOP" || t === "EXEC" ? "#0a0a0a" : "#fff")
                  : OP_COLORS[t],
                padding: "5px 11px",
                fontSize: 10, fontWeight: 700, letterSpacing: 2,
                fontFamily: "var(--td-mono), monospace",
                cursor: "pointer",
                borderRadius: 3,
                transition: "background 160ms, color 160ms",
              }}
            >
              {t}
            </button>
          );
        })}
      </div>

      {/* right: build info */}
      <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 10, color: "#666", letterSpacing: 1.5 }}>
        <span>kpt_designs</span>
        <span style={{ color: "#FFB000" }}>2026.30000</span>
        <span>BUILD {String(build).padStart(2, "0")}</span>
      </div>
    </div>
  );
}
