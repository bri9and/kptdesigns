"use client";

/**
 * ParameterPanel — right-edge sidebar showing the selected operator's parameters.
 *
 * Mirrors TouchDesigner's parameter dialog: dense rows of label + value with
 * type-specific widgets (toggle, pulse, menu, float, int, string).
 *
 * Some parameters are interactive:
 *  - Toggle  → flips ON/OFF locally (visual only)
 *  - Pulse   → triggers a "cook" flash on the operator (handled by parent via onPulse)
 *  - Menu    → cycles through options
 *
 * Read-only params (`ro: true`) render as static text.
 */

import { useState, useCallback } from "react";
import { OP_COLORS } from "../_engine/palette";
import type { Operator, Param } from "../_engine/operators";

interface Props {
  op: Operator | null;
  onClose: () => void;
  onPulse: (id: string) => void;
  /** opens the deep-dive overlay */
  onOpen: () => void;
}

export default function ParameterPanel({ op, onClose, onPulse, onOpen }: Props) {
  // Per-op local state for ephemeral toggles & menus. Keyed by op.id so we
  // don't need a reset effect — switching ops just reads a different bucket.
  const [bag, setBag] = useState<Record<string, Record<string, string>>>({});
  const opId = op?.id ?? null;
  const local = opId ? bag[opId] ?? {} : {};

  const setVal = useCallback((k: string, v: string) => {
    if (!opId) return;
    setBag((b) => ({
      ...b,
      [opId]: { ...(b[opId] ?? {}), [k]: v },
    }));
  }, [opId]);

  if (!op) {
    return (
      <aside
        aria-label="Parameter panel — empty"
        style={panelStyle}
      >
        <div style={emptyStyle}>
          <div style={{ fontSize: 10, letterSpacing: 2, color: "#555", marginBottom: 8 }}>
            NO OPERATOR
          </div>
          <div style={{ fontSize: 11, color: "#777", lineHeight: 1.6 }}>
            Click any operator to view its parameters.
            <br />
            Double-click to open its deep view.
          </div>
        </div>
      </aside>
    );
  }

  const color = OP_COLORS[op.type];

  return (
    <aside aria-label={`Parameters: ${op.name}`} style={panelStyle}>
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "10px 12px",
          borderBottom: "1px solid #2a2a2a",
          background: "#161616",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              padding: "2px 6px",
              background: color,
              color: op.type === "DAT" || op.type === "CHOP" || op.type === "EXEC" ? "#0a0a0a" : "#fff",
              fontSize: 9, fontWeight: 700, letterSpacing: 1.4,
              borderRadius: 2,
              fontFamily: "var(--td-mono), monospace",
            }}
          >
            {op.type}
          </span>
          <span style={{ fontFamily: "var(--td-mono), monospace", fontSize: 12, color: "#e8e8e8", letterSpacing: 0.6 }}>
            {op.name}
          </span>
        </div>
        <button
          onClick={onClose}
          aria-label="Close parameter panel"
          style={{
            background: "transparent", border: "none", color: "#888", cursor: "pointer",
            fontFamily: "var(--td-mono), monospace", fontSize: 14, lineHeight: 1,
          }}
        >
          ×
        </button>
      </div>

      <div style={{ padding: "8px 0", flex: 1, overflowY: "auto" }}>
        {/* description / blurb */}
        {op.deep?.blurb && (
          <div
            style={{
              padding: "10px 12px",
              fontSize: 11,
              color: "#aaa",
              lineHeight: 1.6,
              borderBottom: "1px dashed #232323",
              fontFamily: "var(--td-display), system-ui, sans-serif",
            }}
          >
            {op.deep.blurb}
          </div>
        )}

        {/* params */}
        <div style={{ padding: "8px 0" }}>
          {op.params.map((p) => (
            <ParamRow
              key={p.key}
              param={p}
              value={local[p.key] ?? p.value}
              onChange={(v) => setVal(p.key, v)}
              onPulse={() => onPulse(op.id)}
              accent={color}
            />
          ))}
        </div>

        {/* deep-view trigger */}
        <div style={{ padding: "12px 12px 16px", borderTop: "1px dashed #232323", marginTop: 8 }}>
          <button
            onClick={onOpen}
            style={{
              width: "100%",
              padding: "9px 10px",
              background: "#0a0a0a",
              border: `1px solid ${color}`,
              color,
              fontFamily: "var(--td-mono), monospace",
              fontSize: 10,
              letterSpacing: 2,
              cursor: "pointer",
              borderRadius: 3,
            }}
          >
            ◇ OPEN DEEP VIEW
          </button>
          <div style={{ marginTop: 6, fontSize: 9, color: "#555", letterSpacing: 1.4, textAlign: "center" }}>
            (or double-click the operator)
          </div>
        </div>
      </div>
    </aside>
  );
}

const panelStyle: React.CSSProperties = {
  position: "absolute",
  top: 40, right: 0, bottom: 92,
  width: 300,
  background: "#1a1a1a",
  borderLeft: "1px solid #2a2a2a",
  display: "flex",
  flexDirection: "column",
  zIndex: 25,
  boxShadow: "-4px 0 30px rgba(0,0,0,0.5)",
};

const emptyStyle: React.CSSProperties = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "0 24px",
  textAlign: "center",
  fontFamily: "var(--td-mono), monospace",
};

/* -------------------- Param row widgets -------------------- */

function ParamRow({
  param, value, onChange, onPulse, accent,
}: {
  param: Param;
  value: string;
  onChange: (v: string) => void;
  onPulse: () => void;
  accent: string;
}) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "100px 1fr",
        alignItems: "center",
        padding: "5px 12px",
        fontFamily: "var(--td-mono), monospace",
        fontSize: 10,
      }}
    >
      <span style={{ color: "#777", letterSpacing: 1, textTransform: "lowercase" }}>
        {param.label}
      </span>
      <Widget param={param} value={value} onChange={onChange} onPulse={onPulse} accent={accent} />
    </div>
  );
}

function Widget({
  param, value, onChange, onPulse, accent,
}: {
  param: Param;
  value: string;
  onChange: (v: string) => void;
  onPulse: () => void;
  accent: string;
}) {
  if (param.kind === "toggle") {
    const on = value === "ON";
    return (
      <button
        onClick={() => !param.ro && onChange(on ? "OFF" : "ON")}
        disabled={param.ro}
        style={{
          justifySelf: "start",
          padding: "3px 9px",
          background: on ? accent : "#0d0d0d",
          color: on
            ? (accent === "#E0E0E0" || accent === "#7FFF00" || accent === "#FFB000" ? "#0a0a0a" : "#fff")
            : "#888",
          border: `1px solid ${on ? accent : "#2a2a2a"}`,
          fontSize: 9, fontWeight: 700, letterSpacing: 1.4,
          fontFamily: "var(--td-mono), monospace",
          borderRadius: 2,
          cursor: param.ro ? "default" : "pointer",
        }}
      >
        {value}
      </button>
    );
  }

  if (param.kind === "pulse") {
    return (
      <button
        onClick={() => { onPulse(); }}
        style={{
          justifySelf: "start",
          padding: "3px 11px",
          background: "transparent",
          border: `1px solid ${accent}`,
          color: accent,
          fontSize: 9, fontWeight: 700, letterSpacing: 1.4,
          fontFamily: "var(--td-mono), monospace",
          borderRadius: 2,
          cursor: "pointer",
        }}
      >
        {value}
      </button>
    );
  }

  if (param.kind === "menu") {
    const opts = param.options ?? [value];
    const idx = Math.max(0, opts.indexOf(value));
    return (
      <button
        onClick={() => onChange(opts[(idx + 1) % opts.length])}
        style={{
          justifySelf: "start",
          padding: "3px 9px",
          background: "#0d0d0d",
          border: "1px solid #2a2a2a",
          color: "#cfcfcf",
          fontSize: 10,
          letterSpacing: 0.5,
          fontFamily: "var(--td-mono), monospace",
          borderRadius: 2,
          cursor: "pointer",
        }}
        title="Click to cycle"
      >
        {value} ▾
      </button>
    );
  }

  if (param.ro) {
    return (
      <span style={{ color: "#cfcfcf", letterSpacing: 0.4 }}>
        {value}
      </span>
    );
  }

  // float / int / string editable
  return (
    <input
      defaultValue={value}
      onBlur={(e) => onChange(e.currentTarget.value)}
      onKeyDown={(e) => {
        if (e.key === "Enter") (e.currentTarget as HTMLInputElement).blur();
      }}
      style={{
        background: "#0d0d0d",
        border: "1px solid #2a2a2a",
        color: "#cfcfcf",
        padding: "3px 8px",
        fontSize: 10,
        fontFamily: "var(--td-mono), monospace",
        borderRadius: 2,
        outline: "none",
        width: "100%",
        boxSizing: "border-box",
      }}
    />
  );
}
