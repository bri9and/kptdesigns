"use client";

import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({ subsets: ["latin"], weight: ["200", "400", "500", "700"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

const C = {
  cyan: "#00E5FF",
  blue: "#0066FF",
  white: "#E8F1FF",
  amber: "#FFB000",
  magenta: "#FF00AA",
  grey: "#9BA3C7",
} as const;

/**
 * PhilosophyCheckpoint — checkpoint 02 of 08
 *
 * "No Templates. No Shortcuts."
 * Content-only HTML. No R3F. Designed to render on top of the tunnel canvas
 * with a high-contrast plate so the body copy stays sharply legible.
 */
export default function PhilosophyCheckpoint() {
  return (
    <div
      className={inter.className}
      style={{
        position: "relative",
        width: "min(960px, 92vw)",
        margin: "0 auto",
        padding: "clamp(24px, 4vw, 48px)",
        // legibility plate behind the content — frosted void
        background: "rgba(0, 8, 18, 0.62)",
        backdropFilter: "blur(14px) saturate(120%)",
        WebkitBackdropFilter: "blur(14px) saturate(120%)",
        border: `1px solid ${C.cyan}33`,
        boxShadow: `inset 0 0 0 1px rgba(0,229,255,0.06), 0 0 60px rgba(0,8,18,0.5)`,
        color: C.white,
      }}
    >
      {/* corner brackets */}
      {(["tl", "tr", "bl", "br"] as const).map((c) => (
        <span key={c} aria-hidden style={cornerStyle(c)} />
      ))}

      {/* eyebrow */}
      <div
        className={mono.className}
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: "1.4ch",
          alignItems: "center",
          fontSize: 11,
          letterSpacing: "0.28em",
          color: C.cyan,
          textTransform: "uppercase",
          marginBottom: 18,
        }}
      >
        <span style={{ color: `${C.cyan}66` }}>{"//"}</span>
        <span>CHECKPOINT 02</span>
        <span style={{ color: `${C.cyan}33` }}>·</span>
        <span style={{ color: C.amber }}>PHILOSOPHY · CORE_DOCTRINE</span>
      </div>

      <h2
        style={{
          fontWeight: 200,
          fontSize: "clamp(34px, 5vw, 64px)",
          lineHeight: 1.02,
          letterSpacing: "-0.02em",
          margin: 0,
          color: C.white,
        }}
      >
        No Templates.{" "}
        <span
          style={{
            fontWeight: 700,
            backgroundImage: `linear-gradient(95deg, ${C.cyan} 0%, ${C.magenta} 100%)`,
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            color: "transparent",
            WebkitTextFillColor: "transparent",
          }}
        >
          No Shortcuts.
        </span>
      </h2>

      {/* hairline */}
      <div
        aria-hidden
        style={{
          height: 1,
          margin: "28px 0",
          background: `linear-gradient(90deg, ${C.cyan} 0%, ${C.cyan}33 60%, transparent 100%)`,
        }}
      />

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0, 1.2fr) minmax(0, 0.8fr)",
          gap: "clamp(20px, 3vw, 40px)",
          alignItems: "start",
        }}
        className="kpt-philo-grid"
      >
        <div
          style={{
            fontSize: "clamp(15px, 1.6vw, 17px)",
            lineHeight: 1.7,
            color: C.white,
            fontWeight: 300,
          }}
        >
          We build modern, lightning-fast websites that actually convert
          visitors into customers. Every site is{" "}
          <strong style={{ color: C.cyan, fontWeight: 600 }}>
            hand-coded from scratch
          </strong>
          {" "}— no templates, no page builders, no WordPress.
          <br />
          <br />
          You get the complete source code. No lock-in. No proprietary
          platforms.{" "}
          <strong
            style={{
              fontWeight: 600,
              backgroundImage: `linear-gradient(95deg, ${C.cyan} 0%, ${C.amber} 100%)`,
              WebkitBackgroundClip: "text",
              backgroundClip: "text",
              color: "transparent",
              WebkitTextFillColor: "transparent",
            }}
          >
            Your website. Your code. Forever.
          </strong>
        </div>

        <aside
          style={{
            position: "relative",
            padding: "26px 28px",
            background: "rgba(0,8,18,0.55)",
            borderLeft: `2px solid ${C.cyan}`,
            boxShadow: `inset 0 0 0 1px ${C.cyan}1a, 0 0 24px ${C.cyan}11`,
          }}
        >
          <blockquote
            style={{
              margin: 0,
              fontSize: 15,
              lineHeight: 1.65,
              color: C.grey,
              fontStyle: "italic",
              fontWeight: 300,
            }}
          >
            &ldquo;We use modern frameworks like Next.js, React, and Tailwind
            CSS. Your site will be fast, secure, and built with the same tools
            used by top tech companies.&rdquo;
          </blockquote>
          <cite
            className={mono.className}
            style={{
              display: "block",
              marginTop: 16,
              fontSize: 10,
              letterSpacing: "0.32em",
              textTransform: "uppercase",
              color: C.amber,
              fontStyle: "normal",
            }}
          >
            — OUR PROMISE
          </cite>
        </aside>
      </div>

      {/* footer chips */}
      <div
        className={mono.className}
        style={{
          marginTop: 32,
          display: "flex",
          flexWrap: "wrap",
          gap: "1.6ch",
          fontSize: 10,
          letterSpacing: "0.28em",
          color: `${C.white}80`,
          textTransform: "uppercase",
        }}
      >
        <span><span style={{ color: C.cyan }}>◆</span> HAND-CODED</span>
        <span><span style={{ color: C.cyan }}>◆</span> NO LOCK-IN</span>
        <span><span style={{ color: C.cyan }}>◆</span> SOURCE DELIVERED</span>
        <span style={{ marginLeft: "auto", color: C.magenta }}>EST. 2004</span>
      </div>

      <style>{`
        @media (max-width: 760px) {
          .kpt-philo-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function cornerStyle(c: "tl" | "tr" | "bl" | "br"): React.CSSProperties {
  const base: React.CSSProperties = {
    position: "absolute",
    width: 14,
    height: 14,
    borderColor: C.cyan,
    borderStyle: "solid",
    borderWidth: 0,
    pointerEvents: "none",
  };
  if (c === "tl") return { ...base, top: -1, left: -1, borderTopWidth: 2, borderLeftWidth: 2 };
  if (c === "tr") return { ...base, top: -1, right: -1, borderTopWidth: 2, borderRightWidth: 2 };
  if (c === "bl") return { ...base, bottom: -1, left: -1, borderBottomWidth: 2, borderLeftWidth: 2 };
  return { ...base, bottom: -1, right: -1, borderBottomWidth: 2, borderRightWidth: 2 };
}
