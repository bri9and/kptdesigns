"use client";

import { Roboto, Roboto_Mono } from "next/font/google";
import { motion } from "framer-motion";

const mono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const sans = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  display: "swap",
});

const BLUEPRINT = "#0E1E2E";
const DRAFTING = "#E8EAEC";
const CYAN_DIM = "#3D8DBF";
const RED = "#D03030";
const PAPER = "#F5F2E8";

const TITLE_BLOCK: { label: string; value: string }[] = [
  { label: "PROJECT", value: "KPT.WEB" },
  { label: "SHEET", value: "A-001" },
  { label: "SCALE", value: "1:1" },
  { label: "DATE", value: "04.28.26" },
  { label: "DRAWN BY", value: "KPT" },
];

const FLOORS: { code: string; name: string; depth: string }[] = [
  { code: "L-04", name: "AGENTS", depth: "TOP" },
  { code: "L-03", name: "DESIGN", depth: "—" },
  { code: "L-02", name: "HOST", depth: "—" },
  { code: "L-01", name: "REGISTRAR", depth: "GRD" },
];

// Stroke draw-on transition (used for technical line reveal).
const drawTransition = (delay: number) => ({
  duration: 1.6,
  ease: [0.65, 0, 0.35, 1] as const,
  delay,
});

export default function HeroArchitectural() {
  return (
    <section
      className={`${sans.className} relative overflow-hidden`}
      style={{ background: BLUEPRINT, color: DRAFTING, minHeight: "100vh" }}
    >
      {/* Faint cyan drafting grid background */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(to right, ${CYAN_DIM}1A 1px, transparent 1px),
            linear-gradient(to bottom, ${CYAN_DIM}1A 1px, transparent 1px),
            linear-gradient(to right, ${CYAN_DIM}33 1px, transparent 1px),
            linear-gradient(to bottom, ${CYAN_DIM}33 1px, transparent 1px)
          `,
          backgroundSize: "24px 24px, 24px 24px, 120px 120px, 120px 120px",
          opacity: 0.5,
        }}
      />
      {/* Vignette */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 40%, ${BLUEPRINT} 95%)`,
        }}
      />

      {/* Outer drafting frame */}
      <div className="relative mx-4 my-4 sm:mx-6 sm:my-6" style={{ border: `1px solid ${DRAFTING}55` }}>
        {/* corner registration ticks */}
        <Tick className="absolute -top-1 -left-1" />
        <Tick className="absolute -top-1 -right-1" />
        <Tick className="absolute -bottom-1 -left-1" />
        <Tick className="absolute -bottom-1 -right-1" />

        {/* TITLE BLOCK */}
        <div
          className={`${mono.className} grid grid-cols-2 sm:grid-cols-5`}
          style={{ borderBottom: `1px solid ${DRAFTING}55` }}
        >
          {TITLE_BLOCK.map((cell, i) => (
            <div
              key={cell.label}
              className="flex flex-col gap-1 px-3 py-2 sm:px-4 sm:py-3"
              style={{
                borderRight: i < TITLE_BLOCK.length - 1 ? `1px solid ${DRAFTING}33` : "none",
                background: i === 0 ? `${DRAFTING}08` : "transparent",
              }}
            >
              <span style={{ color: `${DRAFTING}88`, fontSize: 9, letterSpacing: "0.2em" }}>
                {cell.label}
              </span>
              <span
                style={{ color: DRAFTING, fontSize: 12, letterSpacing: "0.16em", fontWeight: 500 }}
              >
                {cell.value}
              </span>
            </div>
          ))}
        </div>

        {/* MAIN PLATE */}
        <div className="relative grid grid-cols-1 lg:grid-cols-12 gap-0">
          {/* LEFT: massive technical KPT */}
          <div className="relative lg:col-span-8 px-4 sm:px-8 pt-10 pb-16 lg:pt-16 lg:pb-24">
            {/* Sheet meta */}
            <div className={`${mono.className} flex items-baseline justify-between mb-6`}>
              <div className="flex items-center gap-3" style={{ fontSize: 10, letterSpacing: "0.24em" }}>
                <span style={{ color: `${DRAFTING}66` }}>ELEVATION</span>
                <span style={{ color: DRAFTING }}>/</span>
                <span style={{ color: DRAFTING }}>NORTH</span>
              </div>
              <div className="flex items-center gap-2">
                <span style={{ color: RED, fontFamily: "inherit", fontSize: 10, letterSpacing: "0.24em" }}>
                  REV.&nbsp;C
                </span>
                <span
                  className={mono.className}
                  style={{
                    color: RED,
                    fontSize: 10,
                    letterSpacing: "0.24em",
                    border: `1px solid ${RED}`,
                    padding: "3px 6px",
                  }}
                >
                  ISSUED FOR CONSTRUCTION
                </span>
              </div>
            </div>

            {/* The drawing */}
            <div className="relative">
              <svg
                viewBox="0 0 800 360"
                width="100%"
                height="auto"
                role="img"
                aria-label="Technical line drawing of letters K P T"
                style={{ display: "block" }}
              >
                {/* Baseline + cap-height construction lines */}
                <motion.line
                  x1="20" y1="60" x2="780" y2="60"
                  stroke={CYAN_DIM} strokeWidth="0.5" strokeDasharray="4 6"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={drawTransition(0.05)}
                />
                <motion.line
                  x1="20" y1="300" x2="780" y2="300"
                  stroke={CYAN_DIM} strokeWidth="0.5" strokeDasharray="4 6"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={drawTransition(0.1)}
                />
                {/* Cap-height label */}
                <g className={mono.className}>
                  <text x="24" y="56" fill={CYAN_DIM} fontSize="9" letterSpacing="2" fontFamily="inherit">CAP-HEIGHT</text>
                  <text x="24" y="316" fill={CYAN_DIM} fontSize="9" letterSpacing="2" fontFamily="inherit">BASELINE</text>
                </g>

                {/* "K" — outlined as joined strokes */}
                <motion.path
                  d="M 80 60 L 80 300 M 80 300 L 80 60 M 110 60 L 110 300 M 80 180 L 200 60 M 80 180 L 200 300 M 110 180 L 200 80 M 110 180 L 200 280"
                  fill="none" stroke={DRAFTING} strokeWidth="2" strokeLinecap="square"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={drawTransition(0.2)}
                />
                {/* "P" — outline */}
                <motion.path
                  d="M 260 60 L 260 300 M 290 60 L 290 300 M 260 60 L 380 60 M 260 180 L 380 180 M 380 60 L 410 90 L 410 150 L 380 180 M 290 90 L 380 90 L 380 150 L 290 150"
                  fill="none" stroke={DRAFTING} strokeWidth="2" strokeLinecap="square"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={drawTransition(0.45)}
                />
                {/* "T" — outline */}
                <motion.path
                  d="M 460 60 L 700 60 M 460 90 L 700 90 M 565 60 L 565 300 M 595 60 L 595 300 M 565 300 L 595 300"
                  fill="none" stroke={DRAFTING} strokeWidth="2" strokeLinecap="square"
                  initial={{ pathLength: 0 }} animate={{ pathLength: 1 }}
                  transition={drawTransition(0.7)}
                />

                {/* Dimension callout: K width */}
                <motion.g
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 1.4, duration: 0.6 }}
                  fontFamily="inherit"
                >
                  <line x1="80" y1="320" x2="200" y2="320" stroke={RED} strokeWidth="0.75" />
                  <line x1="80" y1="314" x2="80" y2="326" stroke={RED} strokeWidth="0.75" />
                  <line x1="200" y1="314" x2="200" y2="326" stroke={RED} strokeWidth="0.75" />
                  <text x="140" y="338" fill={RED} fontSize="10" textAnchor="middle" letterSpacing="2">
                    120MM
                  </text>
                </motion.g>

                {/* Dimension callout: P aperture, leader line */}
                <motion.g
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 1.55, duration: 0.6 }}
                  fontFamily="inherit"
                >
                  <line x1="335" y1="120" x2="450" y2="40" stroke={RED} strokeWidth="0.75" />
                  <circle cx="335" cy="120" r="2.5" fill={RED} />
                  <text x="455" y="38" fill={RED} fontSize="10" letterSpacing="2">
                    R = 30MM · 0.25MM HAIRLINE
                  </text>
                </motion.g>

                {/* Dimension callout: T cap */}
                <motion.g
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 1.7, duration: 0.6 }}
                  fontFamily="inherit"
                >
                  <line x1="460" y1="50" x2="700" y2="50" stroke={CYAN_DIM} strokeWidth="0.5" />
                  <line x1="460" y1="44" x2="460" y2="56" stroke={CYAN_DIM} strokeWidth="0.5" />
                  <line x1="700" y1="44" x2="700" y2="56" stroke={CYAN_DIM} strokeWidth="0.5" />
                  <text x="580" y="42" fill={CYAN_DIM} fontSize="9" textAnchor="middle" letterSpacing="2">
                    240MM
                  </text>
                </motion.g>

                {/* Dimension callout: stroke weight */}
                <motion.g
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 1.85, duration: 0.6 }}
                  fontFamily="inherit"
                >
                  <line x1="595" y1="200" x2="700" y2="220" stroke={RED} strokeWidth="0.75" />
                  <circle cx="595" cy="200" r="2.5" fill={RED} />
                  <text x="704" y="224" fill={RED} fontSize="10" letterSpacing="2">
                    STROKE 2.0PT
                  </text>
                </motion.g>
              </svg>

              {/* Subtitle / project description */}
              <div
                className={`${mono.className} mt-10 max-w-2xl`}
                style={{ color: `${DRAFTING}cc`, fontSize: 12, lineHeight: 1.7, letterSpacing: "0.06em" }}
              >
                <div style={{ color: DRAFTING, letterSpacing: "0.24em", fontSize: 10, marginBottom: 8 }}>
                  // SPECIFICATION
                </div>
                <p>
                  KPT DESIGNS IS A FOUR-DISCIPLINE STUDIO FOR THE MODERN WEB.
                  REGISTRAR. HOST. DESIGNER. AGENTS. ONE STRUCTURE — DRAWN,
                  DIMENSIONED AND ISSUED FROM A SINGLE SET.
                </p>
              </div>
            </div>
          </div>

          {/* RIGHT: axonometric "building" of services */}
          <aside
            className="relative lg:col-span-4 px-4 sm:px-6 pt-10 pb-12 lg:pt-16 lg:pb-24"
            style={{ borderLeft: `1px solid ${DRAFTING}33` }}
          >
            <div className={`${mono.className} flex items-baseline justify-between mb-4`}>
              <span style={{ fontSize: 10, letterSpacing: "0.24em", color: `${DRAFTING}88` }}>
                AXONOMETRIC
              </span>
              <span style={{ fontSize: 10, letterSpacing: "0.24em", color: `${DRAFTING}88` }}>
                DETAIL · A-002
              </span>
            </div>

            <svg viewBox="0 0 320 420" width="100%" role="img" aria-label="Axonometric of KPT services">
              {/* Ground line */}
              <line x1="20" y1="380" x2="300" y2="380" stroke={CYAN_DIM} strokeWidth="0.5" strokeDasharray="2 4" />
              {FLOORS.map((floor, i) => {
                const baseY = 340 - i * 70;
                return (
                  <motion.g
                    key={floor.code}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 + i * 0.18, duration: 0.7, ease: "easeOut" }}
                  >
                    {/* iso footprint (parallelogram, lines only) */}
                    <polygon
                      points={`60,${baseY} 220,${baseY - 40} 280,${baseY - 20} 120,${baseY + 20}`}
                      fill="none" stroke={DRAFTING} strokeWidth="1.25"
                    />
                    {/* "walls" — only edges */}
                    <line x1="60" y1={baseY} x2="60" y2={baseY - 28} stroke={DRAFTING} strokeWidth="1.25" />
                    <line x1="220" y1={baseY - 40} x2="220" y2={baseY - 68} stroke={DRAFTING} strokeWidth="1.25" />
                    <line x1="280" y1={baseY - 20} x2="280" y2={baseY - 48} stroke={DRAFTING} strokeWidth="1.25" />
                    <line x1="120" y1={baseY + 20} x2="120" y2={baseY - 8} stroke={DRAFTING} strokeWidth="1.25" />
                    {/* internal partition (suggesting "rooms") */}
                    <line
                      x1={140} y1={baseY + 5}
                      x2={250} y2={baseY - 30}
                      stroke={CYAN_DIM} strokeWidth="0.5" strokeDasharray="2 3"
                    />
                    {/* leader + label */}
                    <line x1="285" y1={baseY - 10} x2="312" y2={baseY - 10} stroke={RED} strokeWidth="0.75" />
                    <circle cx="285" cy={baseY - 10} r="1.5" fill={RED} />
                  </motion.g>
                );
              })}

              {/* Floor labels (HTML-side overlay would be cleaner, but kept inline for SVG fidelity) */}
              {FLOORS.map((floor, i) => {
                const y = 340 - i * 70 - 10;
                return (
                  <g key={`lbl-${floor.code}`} fontFamily="inherit">
                    <text x="14" y={y - 14} fill={CYAN_DIM} fontSize="8" letterSpacing="2">
                      {floor.code}
                    </text>
                    <text x="14" y={y - 4} fill={DRAFTING} fontSize="10" letterSpacing="2" fontWeight={500}>
                      {floor.name}
                    </text>
                  </g>
                );
              })}

              {/* North arrow */}
              <g transform="translate(280, 400)" fontFamily="inherit">
                <circle r="14" fill="none" stroke={DRAFTING} strokeWidth="0.75" />
                <line x1="0" y1="-12" x2="0" y2="6" stroke={DRAFTING} strokeWidth="1" />
                <polygon points="0,-14 -4,-6 4,-6" fill={DRAFTING} />
                <text x="0" y="-18" textAnchor="middle" fill={DRAFTING} fontSize="8" letterSpacing="2">N</text>
              </g>
            </svg>

            {/* legend */}
            <ul
              className={`${mono.className} mt-4 space-y-1.5`}
              style={{ fontSize: 10, letterSpacing: "0.18em", color: `${DRAFTING}cc` }}
            >
              {FLOORS.map((f) => (
                <li key={f.code} className="flex items-center justify-between gap-3">
                  <span style={{ color: CYAN_DIM, width: 36 }}>{f.code}</span>
                  <span className="flex-1" style={{ color: DRAFTING }}>{f.name}</span>
                  <span style={{ color: `${DRAFTING}66` }}>{f.depth}</span>
                </li>
              ))}
            </ul>
          </aside>
        </div>

        {/* BOTTOM SHEET STRIP */}
        <div
          className={`${mono.className} flex flex-col sm:flex-row items-stretch`}
          style={{ borderTop: `1px solid ${DRAFTING}55` }}
        >
          <div
            className="flex-1 px-4 py-2 sm:py-3"
            style={{ borderRight: `1px solid ${DRAFTING}33`, fontSize: 10, letterSpacing: "0.24em", color: `${DRAFTING}aa` }}
          >
            DO NOT SCALE FROM DRAWING · ALL DIMENSIONS IN MM · VERIFY ON SITE
          </div>
          <div
            className="px-4 py-2 sm:py-3 flex items-center gap-2"
            style={{ fontSize: 10, letterSpacing: "0.24em", color: PAPER }}
          >
            <span style={{ display: "inline-block", width: 8, height: 8, background: RED, borderRadius: 9999 }} />
            <span>SHEET 01 / 06</span>
          </div>
        </div>
      </div>
    </section>
  );
}

function Tick({ className }: { className?: string }) {
  return (
    <span
      aria-hidden
      className={className}
      style={{
        width: 8,
        height: 8,
        borderTop: `1px solid ${DRAFTING}`,
        borderLeft: `1px solid ${DRAFTING}`,
        display: "block",
      }}
    />
  );
}
