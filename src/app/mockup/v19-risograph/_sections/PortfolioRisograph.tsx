"use client";

import { Anybody, Stardos_Stencil, Caveat } from "next/font/google";
import { portfolio } from "@/lib/portfolio";

const stencil = Stardos_Stencil({ subsets: ["latin"], weight: ["400", "700"] });
const anybody = Anybody({ subsets: ["latin"], weight: ["400", "700"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

const PINK = "#FF48B0";
const TEAL = "#00B7A8";
const YELLOW = "#FFE100";
const INK = "#1A1A1A";
const PAPER = "#F5F0E1";

const TINTS = [PINK, TEAL, YELLOW, PINK, TEAL, YELLOW] as const;
const ROTATIONS = [-1.6, 1.2, -0.8, 1.8, -2.0, 0.6] as const;
const DOTS = [0, 3, 6, 2, 5, 1] as const;

const NOISE_BG =
  "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0 0.1 0 0 0 0.18 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

export default function PortfolioRisograph() {
  const flyers = portfolio.slice(0, 6);

  return (
    <section
      style={{
        position: "relative",
        padding: "120px 24px 140px",
        background: PAPER,
        backgroundImage: `radial-gradient(ellipse at 20% 30%, rgba(255,72,176,0.06), transparent 55%), radial-gradient(ellipse at 80% 70%, rgba(0,183,168,0.07), transparent 55%), repeating-linear-gradient(0deg, rgba(26,26,26,0.04) 0 1px, transparent 1px 3px), repeating-linear-gradient(90deg, rgba(26,26,26,0.025) 0 1px, transparent 1px 3px)`,
        overflow: "hidden",
      }}
    >
      <style>{`
        .riso-grid { display: grid; grid-template-columns: 1fr; gap: 36px; }
        @media (min-width: 640px) { .riso-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 900px) { .riso-grid { grid-template-columns: 1fr 1fr 1fr; } }
        @keyframes risoPulse { 0%,100% { background-size: 6px 6px; opacity: .55 } 50% { background-size: 9px 9px; opacity: .78 } }
        .riso-flyer { transition: transform 380ms cubic-bezier(.2,.8,.2,1); }
        .riso-flyer:hover { transform: rotate(0deg) scale(1.02) !important; }
        .riso-flyer:hover .riso-a { transform: translate(5px,-3px) !important; }
        .riso-flyer:hover .riso-b { transform: translate(-4px,4px) !important; }
        .riso-flyer:hover .riso-title { text-shadow: 5px -2px 0 ${PINK}, -5px 3px 0 ${TEAL} !important; }
        .riso-flyer:hover .riso-dots { animation: risoPulse 900ms ease-in-out infinite; }
      `}</style>

      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: NOISE_BG, mixBlendMode: "multiply", opacity: 0.55, pointerEvents: "none" }} />

      <header style={{ position: "relative", maxWidth: 1280, margin: "0 auto 64px" }}>
        <div className={anybody.className} style={{ fontSize: 12, letterSpacing: "0.4em", color: INK, opacity: 0.7, marginBottom: 12 }}>
          ROSTER · 2004—FOREVER · ALL AGES
        </div>
        <h2
          className={stencil.className}
          style={{
            margin: 0,
            fontSize: "clamp(48px, 9vw, 132px)",
            lineHeight: 0.88,
            letterSpacing: "-0.01em",
            color: INK,
            textShadow: `3px 0 0 ${PINK}, -3px 2px 0 ${TEAL}`,
          }}
        >
          DEPLOYED FLYERS
        </h2>
        <div
          className={caveat.className}
          style={{ marginTop: 18, fontSize: 22, color: INK, transform: "rotate(-1.4deg)", display: "inline-block", borderTop: `2px solid ${INK}`, paddingTop: 6 }}
        >
          six sites pulled fresh off the press —
        </div>
      </header>

      <ul className="riso-grid" style={{ position: "relative", maxWidth: 1280, margin: "0 auto", padding: 0, listStyle: "none" }}>
        {flyers.map((p, i) => {
          const tint = TINTS[i];
          const link = p.href ?? `https://${p.url}`;
          const external = !p.href;
          return (
            <li key={p.name} style={{ margin: 0 }}>
              <a
                href={link}
                {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                className="riso-flyer"
                style={{
                  position: "relative",
                  display: "block",
                  aspectRatio: "4 / 5",
                  transform: `rotate(${ROTATIONS[i]}deg)`,
                  background: PAPER,
                  border: `2px solid ${INK}`,
                  boxShadow: `6px 6px 0 ${INK}`,
                  overflow: "hidden",
                  textDecoration: "none",
                }}
              >
                {p.image && (
                  <div
                    aria-hidden
                    className="riso-a"
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url(${p.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "contrast(1.55) saturate(0) brightness(1.05)",
                      mixBlendMode: "multiply",
                      transition: "transform 380ms cubic-bezier(.2,.8,.2,1)",
                    }}
                  />
                )}
                <div aria-hidden style={{ position: "absolute", inset: 0, background: tint, mixBlendMode: "screen", opacity: 0.85 }} />
                <div
                  aria-hidden
                  className="riso-b"
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: p.image ? `url(${p.image})` : undefined,
                    background: !p.image ? tint : undefined,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    filter: "contrast(1.6) saturate(0)",
                    mixBlendMode: "multiply",
                    opacity: 0.55,
                    transition: "transform 380ms cubic-bezier(.2,.8,.2,1)",
                  }}
                />
                <div
                  aria-hidden
                  className="riso-dots"
                  style={{
                    position: "absolute",
                    inset: 0,
                    backgroundImage: `radial-gradient(${INK} 1px, transparent 1.4px)`,
                    backgroundSize: "6px 6px",
                    backgroundPosition: `${DOTS[i]}px ${DOTS[i]}px`,
                    mixBlendMode: "multiply",
                    opacity: 0.55,
                    pointerEvents: "none",
                  }}
                />
                <div aria-hidden style={{ position: "absolute", inset: 0, background: `linear-gradient(180deg, transparent 40%, ${YELLOW} 140%)`, mixBlendMode: "multiply", opacity: 0.4 }} />

                <div className={anybody.className} style={{ position: "absolute", top: 12, left: 14, fontSize: 12, letterSpacing: "0.3em", color: PAPER, background: INK, padding: "4px 8px" }}>
                  TRK·{String(i + 1).padStart(2, "0")}
                </div>
                <div
                  className={anybody.className}
                  style={{
                    position: "absolute",
                    top: 12,
                    right: 14,
                    fontSize: 11,
                    letterSpacing: "0.25em",
                    color: INK,
                    background: YELLOW,
                    padding: "4px 8px",
                    border: `1.5px solid ${INK}`,
                    transform: "rotate(2deg)",
                  }}
                >
                  {p.category.toUpperCase()}
                </div>

                <div style={{ position: "absolute", left: 14, right: 14, bottom: 14, padding: "14px 14px 12px", background: PAPER, border: `2px solid ${INK}`, boxShadow: `4px 4px 0 ${tint}` }}>
                  <div
                    className={`${stencil.className} riso-title`}
                    style={{
                      fontSize: "clamp(20px, 2.4vw, 30px)",
                      lineHeight: 0.94,
                      color: INK,
                      textShadow: `3px 0 0 ${PINK}, -3px 2px 0 ${TEAL}`,
                      textTransform: "uppercase",
                      letterSpacing: "-0.005em",
                      transition: "text-shadow 380ms ease",
                      wordBreak: "break-word",
                    }}
                  >
                    {p.name}
                  </div>
                  <div className={caveat.className} style={{ marginTop: 8, fontSize: 17, lineHeight: 1.2, color: INK, opacity: 0.92 }}>
                    {p.desc}
                  </div>
                  <div
                    className={anybody.className}
                    style={{
                      marginTop: 10,
                      paddingTop: 8,
                      borderTop: `1.5px dashed ${INK}`,
                      display: "flex",
                      justifyContent: "space-between",
                      fontSize: 10,
                      letterSpacing: "0.22em",
                      color: INK,
                      opacity: 0.85,
                    }}
                  >
                    <span>{p.url}</span>
                    <span>↗ TONIGHT</span>
                  </div>
                </div>
              </a>
            </li>
          );
        })}
      </ul>

      <div
        className={anybody.className}
        style={{
          position: "relative",
          maxWidth: 1280,
          margin: "56px auto 0",
          paddingTop: 18,
          borderTop: `2px solid ${INK}`,
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          letterSpacing: "0.3em",
          color: INK,
          opacity: 0.75,
        }}
      >
        <span>PRINTED ON RECYCLED STOCK</span>
        <span>EDITION 6 / ∞</span>
        <span>KPT DESIGNS · EST. 2004</span>
      </div>
    </section>
  );
}
