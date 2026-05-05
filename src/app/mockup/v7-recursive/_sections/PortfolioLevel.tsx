"use client";

import Image from "next/image";
import { Inter, JetBrains_Mono } from "next/font/google";
import { portfolio } from "@/lib/portfolio";

const inter = Inter({ subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

const C = { paper: "#FCFCFA", ink: "#0A0A0A", red: "#FF1E1E", grey: "#9A9A9A" };

// next-level zoom anchor (EST. 2004 stamp at footer, normalized 0..1)
export const ANCHOR_POINT = { x: 0.5, y: 0.92 };

export default function PortfolioLevel() {
  const items = portfolio.slice(0, 6);

  return (
    <section
      className={inter.className}
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100%",
        padding: "clamp(40px, 6vw, 96px) clamp(20px, 4vw, 64px)",
        background: C.paper,
        color: C.ink,
        overflow: "hidden",
        letterSpacing: "-0.01em",
      }}
    >
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          background:
            "radial-gradient(ellipse at 50% 20%, rgba(10,10,10,0.04) 0%, transparent 60%), repeating-linear-gradient(0deg, rgba(10,10,10,0.02) 0px, rgba(10,10,10,0.02) 1px, transparent 1px, transparent 4px)",
          pointerEvents: "none",
        }}
      />

      <header
        style={{
          position: "relative",
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "space-between",
          gap: 24,
          marginBottom: "clamp(28px, 4vw, 56px)",
          flexWrap: "wrap",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <span
            className={mono.className}
            style={{ fontSize: 11, letterSpacing: "0.22em", textTransform: "uppercase", color: C.grey }}
          >
            LVL_05 / DEPTH 4096× / SCOPE: ENGAGEMENT
          </span>
          <h2
            className={mono.className}
            style={{
              margin: 0,
              fontSize: "clamp(28px, 5vw, 56px)",
              letterSpacing: "0.02em",
              textTransform: "uppercase",
              fontWeight: 500,
              lineHeight: 0.95,
            }}
          >
            ZOOM 4096× — <span style={{ color: C.red }}>WORK</span>
          </h2>
          <p style={{ margin: 0, maxWidth: 560, fontSize: 14, lineHeight: 1.5, color: "#3A3A3A" }}>
            You&apos;ve zoomed into a single client engagement. From this seat you see every other site we&apos;ve owned end-to-end — pinned to the studio wall like contact sheets.
          </p>
        </div>
        <div
          className={mono.className}
          style={{
            fontSize: 10,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: C.grey,
            textAlign: "right",
            lineHeight: 1.6,
          }}
        >
          <div>FRAME 05 / 08</div>
          <div style={{ color: C.ink }}>06 OF {portfolio.length} SHOWN</div>
        </div>
      </header>

      <div
        aria-hidden
        style={{
          position: "relative",
          height: 2,
          background: C.red,
          marginBottom: "clamp(28px, 4vw, 48px)",
          boxShadow: `0 0 18px ${C.red}55`,
        }}
      />

      <div
        style={{
          position: "relative",
          display: "grid",
          gap: "clamp(14px, 1.6vw, 22px)",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
        }}
      >
        {items.map((p, i) => {
          const link = p.href ?? `https://${p.url}`;
          const external = !p.href;
          return (
            <a
              key={p.url}
              href={link}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="kpt-card"
              style={{
                position: "relative",
                display: "block",
                aspectRatio: "4 / 5",
                overflow: "hidden",
                borderRadius: 2,
                background: "#1a1a1a",
                color: C.paper,
                textDecoration: "none",
                isolation: "isolate",
                transition:
                  "transform 600ms cubic-bezier(0.16,1,0.3,1), box-shadow 600ms cubic-bezier(0.16,1,0.3,1)",
              }}
            >
              {p.image ? (
                <Image
                  src={p.image}
                  alt={p.name}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: "cover", transition: "transform 1.2s cubic-bezier(0.16,1,0.3,1)" }}
                />
              ) : null}
              <div
                aria-hidden
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(0,0,0,0.15) 0%, rgba(0,0,0,0.05) 35%, rgba(0,0,0,0.85) 100%)",
                }}
              />
              <span
                className={mono.className}
                style={{ position: "absolute", top: 14, left: 14, fontSize: 10, letterSpacing: "0.2em", color: C.paper, opacity: 0.85 }}
              >
                {String(i + 1).padStart(2, "0")} / 06
              </span>
              <span
                className={mono.className}
                style={{
                  position: "absolute",
                  top: 14,
                  right: 14,
                  fontSize: 10,
                  letterSpacing: "0.22em",
                  textTransform: "uppercase",
                  color: C.red,
                  fontWeight: 500,
                }}
              >
                {p.category}
              </span>
              <div style={{ position: "absolute", left: 16, right: 16, bottom: 16, display: "flex", flexDirection: "column", gap: 6 }}>
                <h3 style={{ margin: 0, fontSize: "clamp(17px, 1.6vw, 22px)", fontWeight: 500, letterSpacing: "-0.01em", lineHeight: 1.15 }}>
                  {p.name}
                </h3>
                <p
                  style={{
                    margin: 0,
                    fontSize: 12.5,
                    lineHeight: 1.4,
                    color: "rgba(252,252,250,0.78)",
                    display: "-webkit-box",
                    WebkitLineClamp: 1,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                  }}
                >
                  {p.desc}
                </p>
              </div>
              <span aria-hidden className="kpt-ring" />
            </a>
          );
        })}
      </div>

      <div style={{ position: "relative", marginTop: "clamp(40px, 6vw, 80px)", display: "flex", justifyContent: "center" }}>
        <div
          data-anchor="zoom-target"
          className={mono.className}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 16px",
            border: `1px solid ${C.ink}`,
            borderRadius: 999,
            fontSize: 10,
            letterSpacing: "0.32em",
            textTransform: "uppercase",
            color: C.ink,
            background: "rgba(252,252,250,0.6)",
            transform: "rotate(-1.2deg)",
            boxShadow: "0 0 0 4px rgba(252,252,250,0.6)",
          }}
        >
          <span style={{ width: 6, height: 6, borderRadius: 999, background: C.red, boxShadow: `0 0 8px ${C.red}` }} />
          EST. 2004
          <span style={{ color: C.grey }}>· KPT STUDIO WALL</span>
        </div>
      </div>

      <style jsx>{`
        .kpt-card:hover {
          transform: scale(1.025);
          box-shadow: 0 30px 60px -20px rgba(10, 10, 10, 0.35);
        }
        .kpt-card :global(img) { transform: scale(1.02); }
        .kpt-card:hover :global(img) { transform: scale(1.08); }
        .kpt-ring {
          position: absolute;
          inset: 8px;
          border: 1.5px solid ${C.red};
          border-radius: 2px;
          opacity: 0;
          transform: scale(0.94);
          transition: opacity 500ms cubic-bezier(0.16,1,0.3,1), transform 700ms cubic-bezier(0.16,1,0.3,1), inset 700ms cubic-bezier(0.16,1,0.3,1);
          pointer-events: none;
        }
        .kpt-card:hover .kpt-ring { opacity: 1; transform: scale(1); inset: -2px; }
      `}</style>
    </section>
  );
}
