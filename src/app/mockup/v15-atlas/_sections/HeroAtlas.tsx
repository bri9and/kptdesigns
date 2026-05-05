"use client";

import { EB_Garamond, JetBrains_Mono } from "next/font/google";
import { motion } from "framer-motion";
import type { CSSProperties } from "react";

const garamond = EB_Garamond({ subsets: ["latin"], weight: ["400", "700", "800"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "600"], display: "swap" });

const PAPER = "#F4EFE3";
const PAPER_DEEP = "#EDE5D2";
const INK = "#3D2817";
const FOREST = "#2D5A3F";
const OCEAN = "#3D6E94";
const RUST = "#A0432A";

type Anchor = "tl" | "tr" | "bl" | "br";
type Region = { label: string; elev: string; coord: string; x: number; y: number; anchor: Anchor };

const REGIONS: Region[] = [
  { label: "REGISTRAR", elev: "0050M", coord: "41°N · 12°W", x: 22, y: 32, anchor: "tl" },
  { label: "HOST",      elev: "0250M", coord: "37°N · 04°E", x: 70, y: 26, anchor: "tr" },
  { label: "DESIGN",    elev: "0680M", coord: "29°N · 07°W", x: 30, y: 68, anchor: "bl" },
  { label: "AGENTS",    elev: "1240M", coord: "52°N · 18°E", x: 76, y: 70, anchor: "br" },
];

type Ring = { rx: number; ry: number; rot: number; label?: string; color: string; fill?: string; accent?: boolean };
type IslandSpec = { cx: number; cy: number; rings: Ring[]; wobble: number };

const ISLANDS: IslandSpec[] = [
  { cx: 460, cy: 420, wobble: 1, rings: [
    { rx: 360, ry: 240, rot: -8, label: "0",     color: OCEAN },
    { rx: 320, ry: 210, rot: -6, label: "100",   color: INK,  fill: "rgba(45,90,63,0.10)" },
    { rx: 270, ry: 180, rot: -4, label: "250",   color: INK,  fill: "rgba(45,90,63,0.18)" },
    { rx: 215, ry: 145, rot: -2, label: "500",   color: INK },
    { rx: 160, ry: 108, rot:  0, label: "750",   color: INK },
    { rx: 105, ry:  72, rot:  2, label: "1000m", color: RUST, accent: true },
    { rx:  55, ry:  38, rot:  4,                 color: RUST, accent: true },
  ]},
  { cx: 1180, cy: 520, wobble: 2, rings: [
    { rx: 320, ry: 280, rot: 12, label: "0",     color: OCEAN },
    { rx: 280, ry: 240, rot: 10, label: "100",   color: INK,  fill: "rgba(45,90,63,0.10)" },
    { rx: 235, ry: 200, rot:  8, label: "250",   color: INK,  fill: "rgba(45,90,63,0.18)" },
    { rx: 185, ry: 160, rot:  6, label: "500",   color: INK },
    { rx: 135, ry: 118, rot:  4, label: "750",   color: INK },
    { rx:  85, ry:  76, rot:  2, label: "1000m", color: RUST, accent: true },
    { rx:  42, ry:  38, rot:  0,                 color: RUST, accent: true },
  ]},
  { cx: 820, cy: 820, wobble: 0.6, rings: [
    { rx: 180, ry: 90, rot: 22, label: "0",   color: OCEAN },
    { rx: 145, ry: 72, rot: 22, label: "100", color: INK,  fill: "rgba(61,110,148,0.08)" },
    { rx: 105, ry: 52, rot: 22,               color: INK },
    { rx:  62, ry: 32, rot: 22,               color: RUST, accent: true },
  ]},
  { cx: 780, cy: 170, wobble: 0.6, rings: [
    { rx: 220, ry: 70, rot: -18, label: "0",   color: OCEAN },
    { rx: 170, ry: 52, rot: -18, label: "100", color: INK,  fill: "rgba(45,90,63,0.10)" },
    { rx: 115, ry: 36, rot: -18,               color: INK },
    { rx:  60, ry: 22, rot: -18,               color: RUST, accent: true },
  ]},
];

const draw = {
  hidden: { pathLength: 0, opacity: 0 },
  show: (i: number) => ({
    pathLength: 1, opacity: 0.85,
    transition: {
      pathLength: { duration: 1.6, delay: i * 0.08, ease: [0.22, 0.61, 0.36, 1] as [number, number, number, number] },
      opacity: { duration: 0.4, delay: i * 0.08 },
    },
  }),
};

export default function HeroAtlas() {
  return (
    <section className={garamond.className} style={sectionStyle}>
      <div aria-hidden style={grainStyle} />
      <div aria-hidden style={vignetteStyle} />
      <div aria-hidden style={foldV(33.33)} />
      <div aria-hidden style={foldV(66.66)} />
      <div aria-hidden style={foldH(50)} />

      <header style={topRowStyle}>
        <div className={mono.className} style={editionStyle}>
          <span style={{ color: RUST, letterSpacing: "0.18em" }}>PLATE I</span>
          <span style={tickStyle} /><span>KPT · CARTOGRAPHIC EDITION</span>
          <span style={tickStyle} /><span style={{ color: FOREST }}>MMXXVI</span>
        </div>
        <CompassRose />
      </header>

      <div style={plateWrapStyle}>
        <div style={plateBorderStyle}>
          {(["tl","tr","bl","br"] as Anchor[]).map((p) => <CornerTick key={p} pos={p} />)}
          <div style={mapInnerStyle}>
            <TopoMap />
            <div style={wordmarkWrapStyle} aria-hidden>
              <span className={garamond.className} style={wordmarkStyle}>KPT</span>
            </div>
            {REGIONS.map((r, i) => <RegionPin key={r.label} region={r} index={i} />)}
          </div>
        </div>

        <div className={mono.className} style={taglineStyle}>
          <span style={{ color: FOREST, letterSpacing: "0.42em" }}>AN  ATLAS  OF  MODERN  WEB</span>
        </div>

        <div className={mono.className} style={legendStyle}>
          <LegendCell label="SCALE" value="1 : 24,000" />
          <LegendCell label="CONTOUR INTERVAL" value="50 M" />
          <LegendCell label="DATUM" value="WGS · 2026" />
          <LegendCell label="PROJECTION" value="MERCATOR" muted />
          <LegendCell label="SHEET" value="01 / 04" muted />
        </div>
      </div>
    </section>
  );
}

/* -------- Topographic SVG -------- */
function TopoMap() {
  return (
    <motion.svg
      viewBox="0 0 1600 1000"
      preserveAspectRatio="xMidYMid slice"
      style={{ position: "absolute", inset: 0, width: "100%", height: "100%", display: "block" }}
      initial="hidden" animate="show"
    >
      <defs>
        <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke={OCEAN} strokeWidth="0.6" opacity="0.18" />
        </pattern>
      </defs>

      <rect x="0" y="0" width="220" height="1000" fill="url(#hatch)" opacity="0.7" />
      <rect x="1380" y="0" width="220" height="1000" fill="url(#hatch)" opacity="0.7" />

      <g stroke={INK} strokeWidth="0.6" opacity="0.10">
        {Array.from({ length: 9 }).map((_, i) => <line key={`lat-${i}`} x1="0" x2="1600" y1={(i+1)*100} y2={(i+1)*100} />)}
        {Array.from({ length: 15 }).map((_, i) => <line key={`lon-${i}`} y1="0" y2="1000" x1={(i+1)*100} x2={(i+1)*100} />)}
      </g>

      {ISLANDS.map((spec, idx) => <Island key={idx} {...spec} />)}

      <motion.path d="M 240 720 C 380 660, 520 720, 640 660 S 880 600, 1000 660 S 1240 700, 1380 640"
        stroke={OCEAN} strokeWidth="1.4" fill="none" strokeDasharray="3 4" opacity="0.55"
        initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2.4, delay: 0.6, ease: "easeInOut" }} />

      {[[120,180],[160,880],[1500,240],[1470,780],[80,540]].map(([x,y], i) => (
        <g key={i} fill={OCEAN} opacity="0.55">
          <circle cx={x} cy={y} r="1.6" />
          <text x={x + 8} y={y + 4} fontSize="11" fontFamily="ui-monospace, monospace">
            −{(40 + i * 17).toString().padStart(3, "0")}
          </text>
        </g>
      ))}
    </motion.svg>
  );
}

function Island({ cx, cy, rings, wobble }: IslandSpec) {
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {rings.map((r, i) => {
        const path = wobblyEllipse(r.rx, r.ry, wobble + i * 0.3, i);
        return (
          <g key={i} transform={`rotate(${r.rot})`}>
            {r.fill && <path d={path} fill={r.fill} />}
            <motion.path
              d={path} stroke={r.color} strokeWidth={r.accent ? 1.4 : 0.9} fill="none"
              custom={i} variants={draw} opacity={r.accent ? 0.95 : 0.7}
            />
            {r.label && (
              <g>
                <rect x={r.rx - 22} y={-8} width={r.label.length * 7 + 8} height={14} fill={PAPER} opacity="0.85" />
                <text x={r.rx - 18} y={3} fontSize="10" fontFamily="ui-monospace, monospace"
                  fill={r.accent ? RUST : INK} letterSpacing="0.04em" opacity="0.85">
                  {r.label}
                </text>
              </g>
            )}
          </g>
        );
      })}
    </g>
  );
}

function wobblyEllipse(rx: number, ry: number, amp: number, seed: number) {
  const N = 64;
  let d = "";
  for (let i = 0; i < N; i++) {
    const t = (i / N) * Math.PI * 2;
    const noise = Math.sin(t * 3 + seed) * amp + Math.cos(t * 5 + seed * 1.7) * amp * 0.6;
    const x = (rx + noise) * Math.cos(t);
    const y = (ry + noise) * Math.sin(t);
    d += (i === 0 ? "M" : "L") + x.toFixed(2) + " " + y.toFixed(2) + " ";
  }
  return d + "Z";
}

/* -------- Compass -------- */
function CompassRose() {
  return (
    <motion.svg width="92" height="92" viewBox="0 0 100 100" style={{ flexShrink: 0 }}
      initial={{ rotate: -8, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}>
      <circle cx="50" cy="50" r="44" fill="none" stroke={INK} strokeWidth="0.6" opacity="0.5" />
      <circle cx="50" cy="50" r="36" fill="none" stroke={INK} strokeWidth="0.4" opacity="0.35" />
      {Array.from({ length: 32 }).map((_, i) => {
        const long = i % 4 === 0;
        return (
          <line key={i} x1="50" y1={long ? 8 : 11} x2="50" y2={long ? 14 : 13}
            transform={`rotate(${(i * 360) / 32} 50 50)`}
            stroke={INK} strokeWidth={long ? 1 : 0.5} opacity="0.65" />
        );
      })}
      <polygon points="50,12 54,52 50,46 46,52" fill={RUST} opacity="0.9" />
      <polygon points="50,88 46,48 50,54 54,48" fill={INK} opacity="0.7" />
      <polygon points="12,50 52,46 46,50 52,54" fill={INK} opacity="0.35" />
      <polygon points="88,50 48,54 54,50 48,46" fill={INK} opacity="0.35" />
      <g fontFamily="ui-monospace, monospace" fontSize="6.5" fill={INK} textAnchor="middle">
        <text x="50" y="6" fill={RUST} fontWeight="700">N</text>
        <text x="50" y="98">S</text><text x="6" y="52">W</text><text x="94" y="52">E</text>
      </g>
      <circle cx="50" cy="50" r="2.2" fill={INK} />
    </motion.svg>
  );
}

/* -------- Pins / legend / corner -------- */
const ANCHOR_OFFSET: Record<Anchor, CSSProperties> = {
  tl: { transform: "translate(12px, -100%)" },
  tr: { transform: "translate(calc(-100% - 12px), -100%)" },
  bl: { transform: "translate(12px, 12px)" },
  br: { transform: "translate(calc(-100% - 12px), 12px)" },
};

function RegionPin({ region, index }: { region: Region; index: number }) {
  return (
    <motion.div
      style={{ position: "absolute", left: `${region.x}%`, top: `${region.y}%` }}
      initial={{ opacity: 0, y: -14 }} animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.2 + index * 0.18, type: "spring", stiffness: 220, damping: 18 }}>
      <svg width="28" height="28" viewBox="0 0 28 28" style={{ position: "absolute", left: -14, top: -14 }}>
        <circle cx="14" cy="14" r="11" fill="none" stroke={RUST} strokeWidth="1" opacity="0.85" />
        <circle cx="14" cy="14" r="5" fill="none" stroke={RUST} strokeWidth="1" />
        <line x1="14" y1="0" x2="14" y2="28" stroke={RUST} strokeWidth="0.6" opacity="0.6" />
        <line x1="0" y1="14" x2="28" y2="14" stroke={RUST} strokeWidth="0.6" opacity="0.6" />
        <circle cx="14" cy="14" r="1.8" fill={RUST} />
      </svg>
      <div className={mono.className} style={{ ...badgeStyle, ...ANCHOR_OFFSET[region.anchor] }}>
        <div style={badgeTopStyle}>
          <span style={{ color: FOREST, fontWeight: 600, letterSpacing: "0.16em" }}>{region.label}</span>
          <span style={{ color: RUST, fontWeight: 600 }}>↑ {region.elev}</span>
        </div>
        <div style={badgeBottomStyle}>{region.coord}</div>
      </div>
    </motion.div>
  );
}

function LegendCell({ label, value, muted }: { label: string; value: string; muted?: boolean }) {
  return (
    <div style={{ ...legendCellStyle, opacity: muted ? 0.45 : 1 }}>
      <span style={{ color: FOREST, letterSpacing: "0.18em" }}>{label}</span>
      <span style={{ color: INK, letterSpacing: "0.06em" }}>{value}</span>
    </div>
  );
}

function CornerTick({ pos }: { pos: Anchor }) {
  const map: Record<Anchor, CSSProperties> = {
    tl: { top: -1, left: -1, borderWidth: "1.5px 0 0 1.5px" },
    tr: { top: -1, right: -1, borderWidth: "1.5px 1.5px 0 0" },
    bl: { bottom: -1, left: -1, borderWidth: "0 0 1.5px 1.5px" },
    br: { bottom: -1, right: -1, borderWidth: "0 1.5px 1.5px 0" },
  };
  return <div aria-hidden style={{ position: "absolute", width: 22, height: 22, borderColor: INK, borderStyle: "solid", opacity: 0.7, ...map[pos] }} />;
}

/* -------- Styles -------- */
const sectionStyle: CSSProperties = {
  position: "relative", background: PAPER, color: INK, minHeight: "100vh",
  paddingTop: "calc(var(--nav-height, 80px) + clamp(8px, 2vh, 24px))",
  paddingBottom: "clamp(32px, 6vh, 80px)",
  paddingInline: "clamp(16px, 3.5vw, 56px)",
  overflow: "hidden", isolation: "isolate",
};
const grainStyle: CSSProperties = {
  position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
  backgroundImage: "radial-gradient(rgba(61,40,23,0.10) 1px, transparent 1px), radial-gradient(rgba(61,40,23,0.05) 1px, transparent 1px)",
  backgroundSize: "3px 3px, 7px 7px", backgroundPosition: "0 0, 1px 2px",
  mixBlendMode: "multiply", opacity: 0.55,
};
const vignetteStyle: CSSProperties = {
  position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
  background: `radial-gradient(120% 90% at 50% 40%, transparent 55%, ${PAPER_DEEP} 100%)`,
};
const foldV = (pct: number): CSSProperties => ({
  position: "absolute", top: 0, bottom: 0, left: `${pct}%`, width: 1, pointerEvents: "none", zIndex: 0,
  background: "linear-gradient(to bottom, transparent, rgba(61,40,23,0.10), transparent)",
});
const foldH = (pct: number): CSSProperties => ({
  position: "absolute", left: 0, right: 0, top: `${pct}%`, height: 1, pointerEvents: "none", zIndex: 0,
  background: "linear-gradient(to right, transparent, rgba(61,40,23,0.10), transparent)",
});
const topRowStyle: CSSProperties = {
  position: "relative", zIndex: 2, display: "flex", alignItems: "flex-start",
  justifyContent: "space-between", gap: 16, marginBottom: "clamp(12px, 2vh, 22px)",
};
const editionStyle: CSSProperties = {
  display: "flex", alignItems: "center", gap: 14, flexWrap: "wrap",
  fontSize: "clamp(10px, 1.1vw, 12px)", letterSpacing: "0.12em",
  textTransform: "uppercase", color: INK, paddingTop: 6,
};
const tickStyle: CSSProperties = { width: 10, height: 1, background: INK, opacity: 0.4, display: "inline-block" };
const plateWrapStyle: CSSProperties = { position: "relative", zIndex: 2, display: "flex", flexDirection: "column", gap: 12 };
const plateBorderStyle: CSSProperties = {
  position: "relative", border: `1.5px solid ${INK}`, outline: `1px solid ${INK}`, outlineOffset: "5px",
  background: PAPER, height: "clamp(420px, 64vh, 720px)", overflow: "hidden",
  boxShadow: "0 30px 60px -40px rgba(61,40,23,0.35), inset 0 0 80px rgba(61,40,23,0.06)",
};
const mapInnerStyle: CSSProperties = { position: "absolute", inset: 0 };
const wordmarkWrapStyle: CSSProperties = { position: "absolute", inset: 0, display: "grid", placeItems: "center", pointerEvents: "none" };
const wordmarkStyle: CSSProperties = {
  fontSize: "clamp(160px, 26vw, 380px)", lineHeight: 0.82, fontWeight: 800,
  letterSpacing: "-0.04em", color: INK, opacity: 0.42, mixBlendMode: "multiply",
  WebkitTextStroke: `1px ${INK}`,
};
const taglineStyle: CSSProperties = {
  display: "flex", justifyContent: "center", alignItems: "center", gap: 14,
  fontSize: "clamp(10px, 1.05vw, 13px)", textTransform: "uppercase", paddingTop: 4,
};
const legendStyle: CSSProperties = {
  display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
  border: `1px solid ${INK}`, fontSize: "clamp(9px, 0.85vw, 11px)", textTransform: "uppercase",
};
const legendCellStyle: CSSProperties = {
  display: "flex", justifyContent: "space-between", alignItems: "center",
  padding: "10px 14px", borderRight: `1px solid rgba(61,40,23,0.25)`,
  background: PAPER, gap: 12, whiteSpace: "nowrap",
};
const badgeStyle: CSSProperties = {
  position: "absolute", left: 0, top: 0, background: PAPER, border: `1px solid ${INK}`,
  padding: "8px 12px", fontSize: "clamp(9px, 0.85vw, 11px)", textTransform: "uppercase",
  boxShadow: "0 8px 20px -14px rgba(61,40,23,0.5)", minWidth: 168,
};
const badgeTopStyle: CSSProperties = { display: "flex", justifyContent: "space-between", gap: 14 };
const badgeBottomStyle: CSSProperties = { marginTop: 4, color: "rgba(61,40,23,0.65)", letterSpacing: "0.06em" };
