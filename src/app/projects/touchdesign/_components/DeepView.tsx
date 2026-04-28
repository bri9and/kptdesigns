"use client";

/**
 * DeepView — full-overlay deep-dive for an operator.
 *
 * Triggered by double-clicking an operator OR clicking "OPEN DEEP VIEW" in
 * the parameter panel. Esc closes.
 *
 * Renders rich content per operator:
 *  - blurb (always)
 *  - rows  (key/value table)
 *  - list  (bulleted lines or call log)
 *  - faq   (accordion)
 *  - portfolio (grid of projects from /lib/portfolio)
 *  - channels (CHOP-style live readouts)
 *  - steps    (process diagram)
 */

import { useEffect, useState } from "react";
import Link from "next/link";
import { OP_COLORS } from "../_engine/palette";
import type { Operator } from "../_engine/operators";
import { portfolio } from "@/lib/portfolio";

interface Props {
  op: Operator | null;
  onClose: () => void;
}

export default function DeepView({ op, onClose }: Props) {
  useEffect(() => {
    if (!op) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [op, onClose]);

  if (!op) return null;
  const color = OP_COLORS[op.type];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={`Deep view: ${op.name}`}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 60,
        background: "rgba(8,8,8,0.78)",
        backdropFilter: "blur(10px)",
        display: "grid",
        placeItems: "center",
        padding: 32,
        animation: "td-deep-in 220ms ease-out",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        style={{
          width: "min(960px, 100%)",
          maxHeight: "calc(100vh - 64px)",
          background: "#161616",
          border: `1px solid ${color}`,
          borderRadius: 6,
          boxShadow: `0 0 0 1px rgba(0,0,0,0.6), 0 30px 80px rgba(0,0,0,0.6), 0 0 60px ${color}30`,
          overflow: "hidden",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* header */}
        <div
          style={{
            display: "flex", alignItems: "center", justifyContent: "space-between",
            padding: "12px 18px",
            borderBottom: `1px solid #2a2a2a`,
            background: "#0f0f0f",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <span
              style={{
                padding: "3px 8px",
                background: color,
                color: op.type === "DAT" || op.type === "CHOP" || op.type === "EXEC" ? "#0a0a0a" : "#fff",
                fontSize: 10, fontWeight: 700, letterSpacing: 1.6,
                fontFamily: "var(--td-mono), monospace",
                borderRadius: 2,
              }}
            >
              {op.type}
            </span>
            <span style={{ fontFamily: "var(--td-mono), monospace", fontSize: 16, color: "#fff", letterSpacing: 1 }}>
              {op.name}
            </span>
            <span style={{ fontFamily: "var(--td-mono), monospace", fontSize: 10, color: "#666", letterSpacing: 1 }}>
              {op.comment}
            </span>
          </div>
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              background: "transparent", border: "1px solid #2a2a2a",
              color: "#888", padding: "4px 10px", cursor: "pointer", borderRadius: 3,
              fontFamily: "var(--td-mono), monospace", fontSize: 11, letterSpacing: 1.5,
            }}
          >
            ESC ×
          </button>
        </div>

        {/* body */}
        <div style={{ padding: "22px 28px 28px", overflowY: "auto", color: "#cfcfcf" }}>
          {op.deep?.blurb && (
            <p
              style={{
                fontSize: 16,
                lineHeight: 1.65,
                color: "#e8e8e8",
                fontFamily: "var(--td-display), system-ui, sans-serif",
                margin: 0,
                maxWidth: "70ch",
              }}
            >
              {op.deep.blurb}
            </p>
          )}

          {op.deep?.rows && (
            <div style={{ marginTop: 22 }}>
              <SectionLabel color={color}>{"// parameters"}</SectionLabel>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                gap: 0,
                marginTop: 8,
                border: "1px solid #2a2a2a",
                borderRadius: 3,
                background: "#0d0d0d",
              }}>
                {op.deep.rows.map((r, i) => (
                  <div
                    key={r.k}
                    style={{
                      padding: "10px 14px",
                      fontFamily: "var(--td-mono), monospace",
                      fontSize: 11,
                      borderRight: i % 3 < 2 ? "1px solid #232323" : undefined,
                      borderBottom: "1px solid #232323",
                    }}
                  >
                    <div style={{ color: "#666", letterSpacing: 1.4, fontSize: 9 }}>{r.k}</div>
                    <div style={{ color: "#fff", marginTop: 3, letterSpacing: 0.4 }}>{r.v}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {op.deep?.channels && (
            <div style={{ marginTop: 22 }}>
              <SectionLabel color={color}>{"// channels"}</SectionLabel>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 0,
                marginTop: 8,
                border: "1px solid #2a2a2a",
                background: "#0d0d0d",
                borderRadius: 3,
              }}>
                {op.deep.channels.map((c, i) => (
                  <div
                    key={c.label}
                    style={{
                      padding: "16px 16px",
                      fontFamily: "var(--td-mono), monospace",
                      borderRight: i < op.deep!.channels!.length - 1 ? "1px solid #232323" : undefined,
                    }}
                  >
                    <div style={{ color: "#666", fontSize: 9, letterSpacing: 1.5 }}>{c.label}</div>
                    <div style={{ color: "#fff", fontSize: 28, marginTop: 6, letterSpacing: -0.5 }}>
                      {c.value}
                      <span style={{ fontSize: 11, color, marginLeft: 4, letterSpacing: 1 }}>{c.unit}</span>
                    </div>
                    <div style={{ color: "#555", fontSize: 9, letterSpacing: 1, marginTop: 4 }}>{c.sub}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {op.deep?.list && (
            <div style={{ marginTop: 22 }}>
              <SectionLabel color={color}>{"// log"}</SectionLabel>
              <div
                style={{
                  marginTop: 8,
                  background: "#0a0a0a",
                  border: "1px solid #2a2a2a",
                  borderRadius: 3,
                  padding: "12px 14px",
                  fontFamily: "var(--td-mono), monospace",
                  fontSize: 11,
                  color: "#cfcfcf",
                  lineHeight: 1.85,
                  maxHeight: 220,
                  overflowY: "auto",
                }}
              >
                {op.deep.list.map((line, i) => (
                  <div
                    key={i}
                    style={{
                      borderBottom: i < op.deep!.list!.length - 1 ? "1px dashed #1f1f1f" : undefined,
                      padding: "3px 0",
                    }}
                  >
                    {line}
                  </div>
                ))}
              </div>
            </div>
          )}

          {op.deep?.steps && (
            <div style={{ marginTop: 22 }}>
              <SectionLabel color={color}>{"// process"}</SectionLabel>
              <div style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
                gap: 0,
                marginTop: 8,
                border: "1px solid #2a2a2a",
                borderRadius: 3,
                background: "#0d0d0d",
              }}>
                {op.deep.steps.map((s, i) => (
                  <div
                    key={s.n}
                    style={{
                      padding: "16px 14px",
                      borderRight: i < op.deep!.steps!.length - 1 ? "1px solid #232323" : undefined,
                    }}
                  >
                    <div style={{ color, fontFamily: "var(--td-mono), monospace", fontSize: 24, opacity: 0.5 }}>{s.n}</div>
                    <div style={{ color: "#fff", marginTop: 6, fontSize: 13, letterSpacing: 0.5 }}>{s.name}</div>
                    <div style={{ color: "#888", marginTop: 6, fontSize: 11, lineHeight: 1.55 }}>{s.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {op.deep?.faq && (
            <div style={{ marginTop: 22 }}>
              <SectionLabel color={color}>{"// faq"}</SectionLabel>
              <div style={{ marginTop: 8 }}>
                {op.deep.faq.map((f, i) => <FaqItem key={f.q} q={f.q} a={f.a} last={i === op.deep!.faq!.length - 1} />)}
              </div>
            </div>
          )}

          {op.deep?.portfolio && (
            <div style={{ marginTop: 22 }}>
              <SectionLabel color={color}>{"// archive · 47 specimens"}</SectionLabel>
              <div
                style={{
                  marginTop: 10,
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
                  gap: 12,
                }}
              >
                {portfolio.slice(0, 12).map((p) => (
                  <a
                    key={p.url}
                    href={p.href ?? `https://${p.url}`}
                    target={p.href ? undefined : "_blank"}
                    rel={p.href ? undefined : "noopener noreferrer"}
                    style={{
                      display: "block",
                      background: "#0d0d0d",
                      border: "1px solid #232323",
                      borderRadius: 3,
                      overflow: "hidden",
                      textDecoration: "none",
                      transition: "border-color 220ms, transform 220ms",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = color;
                      e.currentTarget.style.transform = "translateY(-1px)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#232323";
                      e.currentTarget.style.transform = "translateY(0)";
                    }}
                  >
                    <div
                      style={{
                        height: 84,
                        background: p.image
                          ? `linear-gradient(rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url(${p.image}) center/cover`
                          : `linear-gradient(135deg, ${color}22, ${color}06)`,
                      }}
                    />
                    <div style={{ padding: "10px 12px", fontFamily: "var(--td-mono), monospace" }}>
                      <div style={{ color, fontSize: 9, letterSpacing: 1.6, textTransform: "uppercase" }}>
                        {p.category}
                      </div>
                      <div style={{ color: "#e8e8e8", fontSize: 12, marginTop: 4, letterSpacing: 0.4 }}>
                        {p.name}
                      </div>
                      <div style={{ color: "#666", fontSize: 9, marginTop: 4, letterSpacing: 1 }}>
                        {p.url}
                      </div>
                    </div>
                  </a>
                ))}
              </div>
              <div style={{ marginTop: 10, color: "#666", fontSize: 10, fontFamily: "var(--td-mono), monospace", letterSpacing: 1.4 }}>
                showing 12 / {portfolio.length} — full archive on the homepage
              </div>
            </div>
          )}

          {op.deep?.cta && (
            <div style={{ marginTop: 24, display: "flex", justifyContent: "flex-end" }}>
              <Link
                href={op.deep.cta.href}
                style={{
                  padding: "10px 18px",
                  background: color,
                  color: "#0a0a0a",
                  fontFamily: "var(--td-mono), monospace",
                  fontSize: 11,
                  letterSpacing: 2,
                  fontWeight: 700,
                  borderRadius: 3,
                  textDecoration: "none",
                }}
              >
                {op.deep.cta.label}
              </Link>
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes td-deep-in {
          from { opacity: 0; transform: scale(0.985); }
          to   { opacity: 1; transform: scale(1); }
        }
      `}</style>
    </div>
  );
}

function SectionLabel({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <div
      style={{
        fontFamily: "var(--td-mono), monospace",
        fontSize: 10,
        color,
        letterSpacing: 2,
        textTransform: "uppercase",
        opacity: 0.85,
      }}
    >
      {children}
    </div>
  );
}

function FaqItem({ q, a, last }: { q: string; a: string; last: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ borderBottom: last ? undefined : "1px solid #232323" }}>
      <button
        onClick={() => setOpen((s) => !s)}
        style={{
          width: "100%",
          textAlign: "left",
          background: "transparent",
          border: "none",
          padding: "12px 0",
          color: "#e8e8e8",
          fontSize: 13,
          fontFamily: "var(--td-display), system-ui, sans-serif",
          cursor: "pointer",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          letterSpacing: 0.3,
        }}
      >
        <span>{q}</span>
        <span style={{ color: "#666", fontFamily: "var(--td-mono), monospace", fontSize: 11 }}>
          {open ? "[-]" : "[+]"}
        </span>
      </button>
      {open && (
        <p style={{
          margin: "0 0 12px",
          color: "#888",
          fontSize: 12,
          lineHeight: 1.7,
          fontFamily: "var(--td-display), system-ui, sans-serif",
          maxWidth: "75ch",
        }}>
          {a}
        </p>
      )}
    </div>
  );
}
