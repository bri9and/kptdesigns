"use client";

import { Inter, Caveat } from "next/font/google";
import { portfolio } from "@/lib/portfolio";

const inter = Inter({ subsets: ["latin"], weight: ["400", "700", "900"] });
const caveat = Caveat({ subsets: ["latin"], weight: ["400", "700"] });

const ROTATIONS = [-3, 2, -1, 4, -2, 3];

export default function PortfolioCassette() {
  const tapes = portfolio.slice(0, 6);

  return (
    <section
      className={inter.className}
      style={{
        position: "relative",
        padding: "120px 24px 160px",
        background:
          "radial-gradient(ellipse at 30% 10%, #5A3A22 0%, #3D2817 45%, #1F1208 100%)",
        overflow: "hidden",
      }}
    >
      {/* Walnut woodgrain overlay */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: [
            "repeating-linear-gradient(91deg, rgba(15,10,5,0.35) 0px, rgba(15,10,5,0) 2px, rgba(255,220,170,0.04) 4px, rgba(15,10,5,0) 7px)",
            "repeating-linear-gradient(89deg, rgba(0,0,0,0.18) 0px, rgba(0,0,0,0) 14px, rgba(255,200,140,0.05) 28px, rgba(0,0,0,0) 42px)",
            "radial-gradient(ellipse at 70% 80%, rgba(0,0,0,0.55), transparent 60%)",
          ].join(","),
          mixBlendMode: "multiply",
          pointerEvents: "none",
        }}
      />
      {/* Grain */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(255,255,255,0.025) 1px, transparent 1px)",
          backgroundSize: "3px 3px",
          pointerEvents: "none",
        }}
      />

      <header
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto 64px",
          display: "flex",
          alignItems: "baseline",
          justifyContent: "space-between",
          gap: 24,
          flexWrap: "wrap",
          borderBottom: "1px solid rgba(245,235,208,0.18)",
          paddingBottom: 20,
        }}
      >
        <h2
          className={caveat.className}
          style={{
            fontSize: "clamp(34px, 5vw, 58px)",
            color: "#F5EBD0",
            margin: 0,
            letterSpacing: "0.5px",
            textShadow: "0 2px 0 rgba(0,0,0,0.5), 0 0 28px rgba(255,200,140,0.15)",
          }}
        >
          TAPE LIBRARY · 47 IN COLLECTION · 6 SHOWN
        </h2>
        <span
          style={{
            fontFamily: "ui-monospace, 'SFMono-Regular', Menlo, monospace",
            fontSize: 11,
            letterSpacing: "0.22em",
            color: "#FF2D2D",
            textTransform: "uppercase",
            padding: "6px 12px",
            border: "1px solid rgba(255,45,45,0.4)",
            borderRadius: 2,
            background: "rgba(0,0,0,0.35)",
            boxShadow: "inset 0 0 8px rgba(255,45,45,0.15)",
          }}
        >
          ● REC · SIDE A
        </span>
      </header>

      <div
        style={{
          position: "relative",
          maxWidth: 1200,
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "1fr",
          gap: "56px 32px",
          perspective: "1400px",
        }}
        className="cassette-grid"
      >
        {tapes.map((p, i) => {
          const href = p.href ?? `https://${p.url}`;
          const external = !p.href;
          const rot = ROTATIONS[i % ROTATIONS.length];
          return (
            <a
              key={p.url}
              href={href}
              target={external ? "_blank" : undefined}
              rel={external ? "noopener noreferrer" : undefined}
              className="cassette"
              style={
                {
                  display: "block",
                  textDecoration: "none",
                  transformStyle: "preserve-3d",
                  transform: `rotate(${rot}deg)`,
                  transition:
                    "transform 600ms cubic-bezier(0.16, 1, 0.3, 1), filter 600ms",
                  willChange: "transform",
                  ["--rot" as string]: `${rot}deg`,
                } as React.CSSProperties
              }
            >
              {/* Cassette case */}
              <div
                style={{
                  position: "relative",
                  aspectRatio: "5 / 3.15",
                  borderRadius: "10px",
                  background:
                    "linear-gradient(168deg, #1A1208 0%, #0F0A05 35%, #050302 100%)",
                  boxShadow: [
                    "0 1px 0 rgba(255,255,255,0.06) inset",
                    "0 -2px 0 rgba(0,0,0,0.6) inset",
                    "0 30px 50px -20px rgba(0,0,0,0.85)",
                    "0 12px 22px -12px rgba(0,0,0,0.7)",
                  ].join(","),
                  padding: "16px",
                  overflow: "hidden",
                }}
              >
                {/* Top screws */}
                <Screw style={{ top: 8, left: 8 }} />
                <Screw style={{ top: 8, right: 8 }} />
                <Screw style={{ bottom: 8, left: 8 }} />
                <Screw style={{ bottom: 8, right: 8 }} />

                {/* Window frame */}
                <div
                  style={{
                    position: "relative",
                    height: "100%",
                    borderRadius: "4px",
                    background:
                      "linear-gradient(180deg, rgba(0,0,0,0.55), rgba(0,0,0,0.15))",
                    boxShadow:
                      "0 1px 0 rgba(255,255,255,0.05) inset, 0 -1px 0 rgba(0,0,0,0.7) inset, 0 0 0 1px rgba(0,0,0,0.7)",
                    padding: "10px 14px",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  {/* J-card insert */}
                  <div
                    style={{
                      position: "relative",
                      flex: 1,
                      borderRadius: "2px",
                      background:
                        "linear-gradient(180deg, #F5EBD0 0%, #EDDFB8 60%, #DCC894 100%)",
                      boxShadow:
                        "0 1px 0 rgba(255,255,255,0.6) inset, 0 -2px 6px rgba(0,0,0,0.25) inset, 0 4px 8px rgba(0,0,0,0.35)",
                      padding: "14px 16px 12px",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      overflow: "hidden",
                    }}
                  >
                    {/* Paper grain */}
                    <div
                      aria-hidden
                      style={{
                        position: "absolute",
                        inset: 0,
                        backgroundImage:
                          "repeating-linear-gradient(0deg, rgba(139,90,43,0.04) 0 1px, transparent 1px 4px)",
                        pointerEvents: "none",
                      }}
                    />
                    {/* Header bar */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        gap: 8,
                        borderBottom: "1px dashed rgba(15,10,5,0.4)",
                        paddingBottom: 6,
                        marginBottom: 8,
                      }}
                    >
                      <span
                        style={{
                          fontFamily:
                            "ui-monospace, 'SFMono-Regular', Menlo, monospace",
                          fontSize: 9,
                          letterSpacing: "0.2em",
                          color: "#0F0A05",
                          opacity: 0.75,
                        }}
                      >
                        TDK · TYPE II · 90
                      </span>
                      <span
                        style={{
                          fontFamily:
                            "ui-monospace, 'SFMono-Regular', Menlo, monospace",
                          fontSize: 9,
                          letterSpacing: "0.18em",
                          color: "#8B5A2B",
                        }}
                      >
                        №{String(i + 1).padStart(2, "0")} / 47
                      </span>
                    </div>

                    {/* Project name */}
                    <div style={{ position: "relative", zIndex: 1 }}>
                      <h3
                        style={{
                          fontFamily: inter.style.fontFamily,
                          fontWeight: 900,
                          fontSize: "clamp(15px, 1.6vw, 19px)",
                          lineHeight: 1.05,
                          color: "#0F0A05",
                          margin: 0,
                          letterSpacing: "-0.01em",
                          textTransform: "uppercase",
                        }}
                      >
                        {p.name}
                      </h3>
                      <p
                        className={caveat.className}
                        style={{
                          margin: "8px 0 0",
                          fontSize: 22,
                          color: "#8B5A2B",
                          lineHeight: 1,
                          transform: "rotate(-1.5deg)",
                          transformOrigin: "left center",
                        }}
                      >
                        {p.category}
                      </p>
                    </div>

                    {/* Reels */}
                    <div
                      aria-hidden
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginTop: 12,
                        paddingTop: 10,
                        borderTop: "1px solid rgba(15,10,5,0.18)",
                      }}
                    >
                      <Reel />
                      <div
                        style={{
                          flex: 1,
                          margin: "0 10px",
                          height: 6,
                          background:
                            "linear-gradient(180deg, #6B4423 0%, #8B5A2B 50%, #5A3A1E 100%)",
                          borderRadius: 1,
                          boxShadow:
                            "0 1px 0 rgba(255,220,170,0.2) inset, 0 -1px 0 rgba(0,0,0,0.4) inset",
                        }}
                      />
                      <Reel />
                    </div>
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>

      <style jsx>{`
        @media (min-width: 640px) {
          .cassette-grid {
            grid-template-columns: 1fr 1fr;
          }
        }
        @media (min-width: 900px) {
          .cassette-grid {
            grid-template-columns: 1fr 1fr 1fr;
          }
        }
        .cassette:hover {
          transform: rotate(var(--rot)) translateY(-10px) rotateY(5deg)
            rotateX(-2deg) !important;
          filter: brightness(1.08);
          z-index: 2;
        }
      `}</style>
    </section>
  );
}

function Screw({ style }: { style: React.CSSProperties }) {
  return (
    <span
      aria-hidden
      style={{
        position: "absolute",
        width: 8,
        height: 8,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 35% 30%, #C8C8CC 0%, #6A6A70 55%, #1A1A1F 100%)",
        boxShadow:
          "0 0 0 1px rgba(0,0,0,0.6), 0 1px 1px rgba(255,255,255,0.1) inset",
        ...style,
      }}
    />
  );
}

function Reel() {
  return (
    <span
      aria-hidden
      style={{
        position: "relative",
        width: 32,
        height: 32,
        borderRadius: "50%",
        background:
          "radial-gradient(circle at 50% 50%, #1A1208 0 28%, #2A1B0F 28% 50%, #0F0A05 50% 100%)",
        boxShadow:
          "0 0 0 1px rgba(0,0,0,0.7), 0 1px 0 rgba(255,255,255,0.25) inset, 0 -1px 2px rgba(0,0,0,0.6) inset",
        display: "inline-flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 35% 30%, #D8D8DC, #8A8A90 60%, #2A2A2F)",
          boxShadow: "0 0 0 1px rgba(0,0,0,0.6)",
        }}
      />
    </span>
  );
}
