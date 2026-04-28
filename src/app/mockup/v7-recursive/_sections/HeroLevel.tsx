"use client";

import { Inter, JetBrains_Mono } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700", "800", "900"],
  display: "swap",
});
const mono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
});

// Next-level zoom anchor — the dot above the lowercase "i" in "Designs".
// Centred horizontally because the wordmark is centred on screen; biased a bit
// above mid-line because that's where the wordmark sits in the layout.
export const ANCHOR_POINT = { x: 0.5, y: 0.52 };

/**
 * V7 — Recursive Zoom · Level 1 (Hero, outermost).
 * Engine owns scroll/scale. The data-anchor="zoom-target" element is the
 * dot above the "i" in "Designs". At scale 1 it's a glossy red dot with
 * faint internal texture; at ~80x its 2x2 grid (R/H/B/A) resolves into
 * the four-services panel of Level 2.
 */
export default function HeroLevel() {
  return (
    <section
      className={`${inter.className} relative w-full h-full min-h-screen overflow-hidden`}
      style={{ background: "#FCFCFA", color: "#0A0A0A" }}
    >
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none opacity-[0.045]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0A0A0A 1px, transparent 1px), linear-gradient(to bottom, #0A0A0A 1px, transparent 1px)",
          backgroundSize: "96px 96px",
        }}
      />

      <header
        className={`${mono.className} absolute top-0 left-0 right-0 z-20 flex items-center justify-between px-8 md:px-14 pt-7 text-[11px] tracking-[0.18em] uppercase`}
        style={{ color: "#0A0A0A" }}
      >
        <span className="flex items-center gap-2">
          <span
            className="inline-block w-1.5 h-1.5 rounded-full"
            style={{ background: "#FF1E1E" }}
          />
          KPT/DESIGNS — EST. 2004
        </span>
        <span className="hidden md:inline" style={{ color: "#9A9A9A" }}>
          LVL 01 · SURFACE
        </span>
        <span style={{ color: "#9A9A9A" }}>SCALE 1.000×</span>
      </header>

      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 md:px-12">
        <div className="w-full max-w-[1480px] mx-auto">
          <div
            className={`${mono.className} flex items-center gap-3 mb-8 md:mb-10 text-[11px] tracking-[0.32em] uppercase`}
            style={{ color: "#9A9A9A" }}
          >
            <span
              className="inline-block h-px w-10"
              style={{ background: "#0A0A0A" }}
            />
            <span>Powers of Ten · Scroll to Zoom In</span>
          </div>

          <h1
            className="leading-[0.82] font-black select-none"
            style={{
              fontWeight: 900,
              letterSpacing: "-0.055em",
              fontSize: "clamp(4.5rem, 17vw, 17rem)",
            }}
          >
            <span className="block">KPT</span>
            <span className="relative block">
              <span>Des</span>

              {/* Stylised lowercase i: stem + zoom-target dot */}
              <span
                className="relative inline-block align-baseline"
                style={{ width: "0.42em", margin: "0 0.02em" }}
              >
                <span
                  aria-hidden
                  className="absolute"
                  style={{
                    left: "50%",
                    transform: "translateX(-50%)",
                    bottom: 0,
                    height: "0.62em",
                    width: "0.18em",
                    background: "#0A0A0A",
                    borderRadius: "0.02em",
                  }}
                />
                <span
                  data-anchor="zoom-target"
                  className="absolute"
                  style={{
                    left: "50%",
                    top: "0.04em",
                    transform: "translateX(-50%)",
                    width: "0.22em",
                    height: "0.22em",
                  }}
                >
                  <ZoomTargetDot />
                </span>
              </span>

              <span>gns</span>

              <span
                aria-hidden
                className="absolute left-0"
                style={{
                  bottom: "-0.04em",
                  height: "0.045em",
                  background: "#FF1E1E",
                  width: "38%",
                }}
              />
            </span>
          </h1>

          <div className="mt-10 md:mt-14 flex flex-col md:flex-row md:items-end md:justify-between gap-8">
            <p
              className="max-w-xl text-balance"
              style={{
                fontSize: "clamp(1.05rem, 1.5vw, 1.4rem)",
                lineHeight: 1.35,
                letterSpacing: "-0.012em",
              }}
            >
              Zoom in. We have all the depth you need.
            </p>

            <div
              className={`${mono.className} inline-flex items-center self-start md:self-auto rounded-full border px-4 py-2 text-[10.5px] tracking-[0.22em] uppercase`}
              style={{ borderColor: "#0A0A0A", color: "#0A0A0A" }}
            >
              <span style={{ color: "#FF1E1E" }}>●</span>
              <span className="ml-2">
                Registrar · Host · Builder · Agents
              </span>
            </div>
          </div>
        </div>
      </div>

      <footer
        className={`${mono.className} absolute bottom-0 left-0 right-0 z-20 flex items-end justify-between px-8 md:px-14 pb-7 text-[11px] tracking-[0.18em] uppercase`}
        style={{ color: "#9A9A9A" }}
      >
        <span>One process · One bill · One team</span>
        <span className="flex items-center gap-2">
          <span style={{ color: "#0A0A0A" }}>SCROLL</span>
          <span
            aria-hidden
            className="inline-block w-6 h-px"
            style={{ background: "#0A0A0A" }}
          />
          <span>10×</span>
          <span
            aria-hidden
            className="inline-block w-3 h-px"
            style={{ background: "#0A0A0A", opacity: 0.5 }}
          />
          <span style={{ opacity: 0.6 }}>100×</span>
          <span
            aria-hidden
            className="inline-block w-2 h-px"
            style={{ background: "#0A0A0A", opacity: 0.25 }}
          />
          <span style={{ opacity: 0.35 }}>1000×</span>
        </span>
      </footer>
    </section>
  );
}

function ZoomTargetDot() {
  // 2x2 micro-grid that becomes Level 2's four service panels at zoom.
  const cells: { label: string; color: string }[] = [
    { label: "R", color: "#FF1E1E" },
    { label: "H", color: "#0A0A0A" },
    { label: "B", color: "#0A0A0A" },
    { label: "A", color: "#FFC700" },
  ];
  return (
    <span
      className="relative block w-full h-full rounded-full overflow-hidden"
      style={{
        background: "#FF1E1E",
        boxShadow:
          "0 0 0 0.012em #FCFCFA inset, 0 0.01em 0.04em rgba(10,10,10,0.35)",
      }}
    >
      <span
        aria-hidden
        className="absolute inset-[12%] grid grid-cols-2 grid-rows-2 gap-[2%] rounded-full overflow-hidden"
      >
        {cells.map((c) => (
          <span
            key={c.label}
            className="block"
            style={{ background: c.color, opacity: c.label === "R" ? 1 : 0.92 }}
          />
        ))}
      </span>
      <span
        aria-hidden
        className="absolute rounded-full"
        style={{
          top: "8%",
          left: "16%",
          width: "30%",
          height: "30%",
          background:
            "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.85), rgba(255,255,255,0) 70%)",
        }}
      />
    </span>
  );
}
