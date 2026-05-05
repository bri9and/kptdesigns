"use client";

import { EB_Garamond, JetBrains_Mono } from "next/font/google";
import { motion } from "framer-motion";
import { portfolio, type PortfolioItem } from "@/lib/portfolio";

const garamond = EB_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["normal", "italic"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const PAPER = "#F4EFE3";
const CONTOUR = "#3D2817";
const FOREST = "#2D5A3F";
const OCEAN = "#3D6E94";
const RUST = "#A0432A";

// fake lat/lng plot positions on a 1000 x 580 viewBox map
const PINS: { x: number; y: number; elev: string; coord: string }[] = [
  { x: 220, y: 200, elev: "1,240 ft", coord: "40.4406° N · 79.9959° W" },
  { x: 380, y: 290, elev: "  860 ft", coord: "40.5187° N · 80.2228° W" },
  { x: 555, y: 175, elev: "2,015 ft", coord: "41.4993° N · 81.6944° W" },
  { x: 700, y: 360, elev: "  410 ft", coord: "33.4484° N · 112.0740° W" },
  { x: 470, y: 415, elev: "1,604 ft", coord: "39.7392° N · 104.9903° W" },
  { x: 825, y: 245, elev: "  640 ft", coord: "29.7604° N · 95.3698° W" },
];

const colorFor = (cat: string): string => {
  const c = cat.toLowerCase();
  if (c.includes("golf") || c.includes("plumb") || c.includes("roof") || c.includes("home") || c.includes("cleaning")) return FOREST;
  if (c.includes("electric") || c.includes("realty") || c.includes("law") || c.includes("real estate") || c.includes("therapy")) return OCEAN;
  return RUST;
};

const hrefFor = (p: PortfolioItem) => p.href ?? `https://${p.url}`;

export default function PortfolioAtlas() {
  const entries = portfolio.slice(0, 6);

  return (
    <section
      id="atlas-portfolio"
      className={`${garamond.className} relative overflow-hidden`}
      style={{ background: PAPER, color: CONTOUR, padding: "8rem 0 9rem" }}
    >
      {/* contour-paper grain overlay */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.10] mix-blend-multiply"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.24  0 0 0 0 0.16  0 0 0 0 0.09  0 0 0 0.55 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
          backgroundSize: "240px 240px",
        }}
      />

      <div className="relative mx-auto max-w-[1280px] px-6 md:px-12">
        {/* section header */}
        <header className="mb-10 md:mb-14">
          <div className="flex items-end justify-between gap-6 flex-wrap">
            <span
              className={`${mono.className} text-[11px] md:text-[12px] uppercase`}
              style={{ color: CONTOUR, letterSpacing: "0.32em" }}
            >
              § PROJECTS · PINNED ON THE MAP
            </span>
            <span className={`${mono.className} text-[10.5px]`} style={{ color: `${CONTOUR}AA`, letterSpacing: "0.22em" }}>
              SHEET 04 / SCALE 1 : 4,250,000
            </span>
          </div>
          <span aria-hidden className="mt-4 block h-px w-full" style={{ background: `${CONTOUR}66` }} />
          <span aria-hidden className="mt-[3px] block h-px w-full" style={{ background: `${CONTOUR}33` }} />
        </header>

        {/* THE MAP */}
        <div
          className="relative w-full overflow-hidden"
          style={{
            aspectRatio: "1000 / 580",
            background: "radial-gradient(ellipse at 50% 38%, #FBF6E8 0%, #F4EFE3 55%, #ECE3D0 100%)",
            border: `1px solid ${CONTOUR}33`,
            boxShadow: "inset 0 0 0 6px rgba(244,239,227,0.6), inset 0 0 0 7px rgba(61,40,23,0.18)",
          }}
        >
          <svg viewBox="0 0 1000 580" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
            <defs>
              <pattern id="atlas-grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke={`${CONTOUR}`} strokeOpacity="0.07" strokeWidth="0.6" />
              </pattern>
            </defs>
            <rect width="1000" height="580" fill="url(#atlas-grid)" />

            {/* abstract continent silhouette + concentric contour lines */}
            <g fill="none" stroke={CONTOUR} strokeLinejoin="round" strokeLinecap="round">
              {[
                { d: "M 90 320 C 140 200, 260 140, 380 150 C 470 158, 530 110, 640 120 C 770 132, 870 200, 910 290 C 940 360, 880 430, 760 460 C 640 488, 520 470, 410 488 C 290 506, 160 460, 110 410 C 80 380, 70 350, 90 320 Z", w: 1.2, o: 0.55 },
                { d: "M 130 320 C 180 220, 280 170, 390 178 C 470 184, 530 148, 630 158 C 750 170, 840 230, 870 300 C 895 360, 840 415, 740 440 C 640 462, 530 448, 420 462 C 310 478, 200 440, 155 398 C 130 372, 120 348, 130 320 Z", w: 1, o: 0.4 },
                { d: "M 170 320 C 215 240, 295 200, 395 208 C 470 213, 530 184, 615 192 C 720 202, 805 252, 830 312 C 850 360, 800 402, 720 420 C 640 437, 540 425, 430 437 C 330 449, 240 420, 200 386 C 178 365, 165 343, 170 320 Z", w: 0.9, o: 0.32 },
                { d: "M 210 322 C 250 262, 315 228, 400 235 C 470 240, 530 218, 600 226 C 690 234, 770 274, 790 322 C 805 360, 760 392, 695 405 C 630 418, 545 408, 445 418 C 350 427, 280 405, 245 376 C 222 358, 210 342, 210 322 Z", w: 0.8, o: 0.26 },
                { d: "M 255 325 C 290 280, 345 254, 410 260 C 470 264, 530 248, 590 254 C 660 260, 730 290, 750 328 C 760 358, 720 380, 670 388 C 615 397, 550 390, 460 397 C 380 404, 320 388, 290 365 C 268 350, 255 340, 255 325 Z", w: 0.7, o: 0.2 },
                { d: "M 300 328 C 330 296, 380 278, 425 282 C 470 285, 530 274, 580 278 C 630 282, 680 304, 700 332 C 705 354, 680 370, 640 376 C 595 383, 550 378, 480 382 C 420 386, 360 376, 335 358 C 318 346, 305 340, 300 328 Z", w: 0.6, o: 0.15 },
              ].map((c, i) => (
                <path key={i} d={c.d} strokeWidth={c.w} strokeOpacity={c.o} />
              ))}
            </g>

            {/* a couple of "rivers" — thin ocean blue lines */}
            <g fill="none" stroke={OCEAN} strokeOpacity="0.55" strokeLinecap="round">
              <path d="M 120 360 C 220 350, 300 410, 420 405 C 520 401, 600 440, 720 430" strokeWidth="1.1" strokeDasharray="0" />
              <path d="M 540 175 C 555 230, 530 280, 555 330 C 580 380, 560 420, 600 470" strokeWidth="0.9" />
            </g>

            {/* compass rose */}
            <g transform="translate(900,485)" fill="none" stroke={CONTOUR} strokeOpacity="0.7">
              <circle r="34" strokeWidth="0.8" />
              <circle r="22" strokeWidth="0.5" strokeOpacity="0.4" />
              <path d="M 0 -34 L 4 0 L 0 34 L -4 0 Z" fill={CONTOUR} fillOpacity="0.85" stroke="none" />
              <path d="M -34 0 L 0 4 L 34 0 L 0 -4 Z" fill={CONTOUR} fillOpacity="0.4" stroke="none" />
              <text y="-40" textAnchor="middle" fontSize="9" fill={CONTOUR} fontFamily="monospace" letterSpacing="2">N</text>
            </g>

            {/* scale bar */}
            <g transform="translate(60,520)" stroke={CONTOUR} fill={CONTOUR}>
              <line x1="0" y1="0" x2="120" y2="0" strokeWidth="1" />
              <line x1="0" y1="-4" x2="0" y2="4" strokeWidth="1" />
              <line x1="60" y1="-3" x2="60" y2="3" strokeWidth="1" />
              <line x1="120" y1="-4" x2="120" y2="4" strokeWidth="1" />
              <text x="0" y="18" fontSize="9" fontFamily="monospace" letterSpacing="1.5">0</text>
              <text x="120" y="18" fontSize="9" fontFamily="monospace" letterSpacing="1.5">500 MI</text>
            </g>
          </svg>

          {/* PINS overlay — absolutely positioned in % */}
          {entries.map((p, i) => {
            const pin = PINS[i];
            const color = colorFor(p.category);
            const left = `${(pin.x / 1000) * 100}%`;
            const top = `${(pin.y / 580) * 100}%`;
            const flipLeft = pin.x > 700;
            return (
              <motion.a
                key={p.url}
                href={hrefFor(p)}
                target="_blank"
                rel="noopener noreferrer"
                className="group absolute z-10 outline-none"
                style={{ left, top, transform: "translate(-50%,-100%)" }}
                initial={{ opacity: 0, y: -40, scale: 0.6 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ delay: i * 0.1, duration: 0.55, ease: [0.2, 1.1, 0.4, 1] }}
              >
                {/* the pin */}
                <svg width="34" height="44" viewBox="0 0 34 44" className="drop-shadow-[0_3px_2px_rgba(61,40,23,0.35)]">
                  <path
                    d="M17 2 C 9 2, 4 7, 4 15 C 4 24, 17 40, 17 40 C 17 40, 30 24, 30 15 C 30 7, 25 2, 17 2 Z"
                    fill={color}
                    stroke={CONTOUR}
                    strokeWidth="1.2"
                  />
                  <circle cx="17" cy="15" r="4.5" fill={PAPER} stroke={CONTOUR} strokeWidth="0.8" />
                </svg>
                {/* base shadow ellipse */}
                <span
                  aria-hidden
                  className="absolute left-1/2 -translate-x-1/2 rounded-[50%]"
                  style={{ bottom: "-3px", width: "16px", height: "5px", background: "rgba(61,40,23,0.35)", filter: "blur(1.5px)" }}
                />
                {/* HOVER POPUP */}
                <div
                  className={`pointer-events-none absolute z-20 w-[230px] opacity-0 -translate-y-1 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0 group-focus:opacity-100 group-focus:translate-y-0`}
                  style={{
                    bottom: "calc(100% + 8px)",
                    left: flipLeft ? "auto" : "50%",
                    right: flipLeft ? "0" : "auto",
                    transform: flipLeft ? "none" : "translateX(-50%)",
                  }}
                >
                  <div
                    className="relative px-4 py-3"
                    style={{
                      background: PAPER,
                      border: `1px solid ${CONTOUR}`,
                      boxShadow: "4px 4px 0 rgba(61,40,23,0.18)",
                    }}
                  >
                    <span className={`${mono.className} block text-[9.5px] uppercase`} style={{ color, letterSpacing: "0.24em" }}>
                      {p.category}
                    </span>
                    <span className={`${garamond.className} mt-1 block text-[18px] leading-[1.15] italic`} style={{ color: CONTOUR, fontWeight: 500 }}>
                      {p.name}
                    </span>
                    <span className={`${mono.className} mt-1 block text-[9px]`} style={{ color: `${CONTOUR}AA`, letterSpacing: "0.12em" }}>
                      ELEV {pin.elev} · {pin.coord}
                    </span>
                    <p className="mt-2 text-[12.5px] leading-snug" style={{ color: `${CONTOUR}DD` }}>
                      {p.desc.length > 90 ? p.desc.slice(0, 88) + "…" : p.desc}
                    </p>
                    <span className={`${mono.className} mt-2 inline-flex items-center gap-1 text-[10px] uppercase`} style={{ color, letterSpacing: "0.2em" }}>
                      → VISIT
                    </span>
                  </div>
                </div>
                {/* coordinate label always visible under pin */}
                <span
                  className={`${mono.className} absolute left-1/2 -translate-x-1/2 whitespace-nowrap text-[8.5px]`}
                  style={{ top: "44px", color: `${CONTOUR}99`, letterSpacing: "0.14em" }}
                >
                  {String(i + 1).padStart(2, "0")} · {p.name.split(" ").slice(0, 2).join(" ").toUpperCase()}
                </span>
              </motion.a>
            );
          })}
        </div>

        {/* Legend */}
        <div className={`${mono.className} mt-6 flex flex-wrap items-center gap-x-8 gap-y-2 text-[10.5px]`} style={{ color: `${CONTOUR}CC`, letterSpacing: "0.18em" }}>
          <span className="uppercase">Legend —</span>
          <LegendDot color={FOREST} label="TRADES & TURF" />
          <LegendDot color={OCEAN} label="LAW · REALTY · CARE" />
          <LegendDot color={RUST} label="MISC. INDUSTRY" />
        </div>

        {/* Horizontal scroll list of compact cards */}
        <div className="mt-12">
          <span className={`${mono.className} text-[11px] uppercase`} style={{ color: CONTOUR, letterSpacing: "0.28em" }}>
            INDEX · 01 — 06
          </span>
          <span aria-hidden className="mt-2 block h-px w-full" style={{ background: `${CONTOUR}33` }} />
          <ol
            className="mt-5 flex gap-4 overflow-x-auto pb-3"
            style={{ scrollSnapType: "x mandatory", scrollbarWidth: "thin", scrollbarColor: `${CONTOUR}55 transparent` }}
          >
            {entries.map((p, i) => {
              const color = colorFor(p.category);
              return (
                <li
                  key={`card-${p.url}`}
                  className="shrink-0"
                  style={{ width: "min(78vw, 280px)", scrollSnapAlign: "start" }}
                >
                  <a
                    href={hrefFor(p)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block h-full p-4 transition-colors"
                    style={{
                      background: "rgba(251,246,232,0.6)",
                      border: `1px solid ${CONTOUR}33`,
                      borderLeft: `3px solid ${color}`,
                    }}
                  >
                    <div className="flex items-center justify-between">
                      <span className={`${mono.className} text-[10px]`} style={{ color: `${CONTOUR}99`, letterSpacing: "0.22em" }}>
                        № {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className={`${mono.className} text-[9.5px] uppercase`} style={{ color, letterSpacing: "0.2em" }}>
                        {p.category}
                      </span>
                    </div>
                    <h3 className={`${garamond.className} mt-2 text-[19px] leading-[1.15] italic`} style={{ color: CONTOUR, fontWeight: 500 }}>
                      {p.name}
                    </h3>
                    <p className="mt-1.5 text-[12.5px] leading-snug line-clamp-2" style={{ color: `${CONTOUR}CC` }}>
                      {p.desc}
                    </p>
                    <span className={`${mono.className} mt-3 inline-block text-[10px] uppercase`} style={{ color, letterSpacing: "0.22em" }}>
                      → {p.url}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}

function LegendDot({ color, label }: { color: string; label: string }) {
  return (
    <span className="inline-flex items-center gap-2 uppercase">
      <span className="inline-block h-[10px] w-[10px] rounded-full" style={{ background: color, border: `1px solid ${CONTOUR}` }} />
      {label}
    </span>
  );
}
