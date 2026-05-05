import { EB_Garamond, JetBrains_Mono } from "next/font/google";

const garamond = EB_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"] });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"] });

const INK = "#3D2817";
const PAPER = "#F4EFE3";
const FOREST = "#2D5A3F";
const OCEAN = "#3D6E94";
const RUST = "#A0432A";

type Tool = {
  name: string;
  desc: string;
  spec: string;
  elev: string;
  color: string;
  glyph: "square" | "triangle" | "hex" | "dotted" | "hatched" | "contour";
};

const TOOLS: Tool[] = [
  {
    name: "Next.js 16",
    desc: "The framework foundation. App Router, RSC streaming, edge-aware routing — the bedrock every site is plotted on.",
    spec: "ELEV. 1600 · APP ROUTER · RSC · EDGE",
    elev: "1600",
    color: FOREST,
    glyph: "square",
  },
  {
    name: "React 19",
    desc: "Component logic and interactivity. Server actions, transitions, and the new compiler — declarative UI that scales.",
    spec: "ELEV. 1247 · ACTIONS · COMPILER · SUSPENSE",
    elev: "1247",
    color: FOREST,
    glyph: "triangle",
  },
  {
    name: "Tailwind 4",
    desc: "Atomic styling without abandoning the cascade. CSS-first config, lightning compile, design tokens as variables.",
    spec: "ELEV. 0980 · OXIDE · TOKENS · CASCADE",
    elev: "0980",
    color: OCEAN,
    glyph: "hex",
  },
  {
    name: "TypeScript",
    desc: "Static contracts on every boundary. Catch the broken thing before it leaves the workshop.",
    spec: "ELEV. 0750 · STRICT · INFER · SAFE",
    elev: "0750",
    color: OCEAN,
    glyph: "dotted",
  },
  {
    name: "Vercel Edge",
    desc: "Global delivery from the highest summit. Sub-50ms TTFB on every continent — the site is fast everywhere or it isn't fast.",
    spec: "ELEV. 2400 · GLOBAL · STREAMING · CACHED",
    elev: "2400",
    color: RUST,
    glyph: "hatched",
  },
  {
    name: "KPT Agents",
    desc: "Inbound AI phone agents from our sister company. Always-on receptionist, qualifier, and dispatcher — above the weather.",
    spec: "ELEV. ∞ · ALWAYS-ON · INBOUND · ABOVE",
    elev: "∞",
    color: RUST,
    glyph: "contour",
  },
];

function Glyph({ kind, color }: { kind: Tool["glyph"]; color: string }) {
  const stroke = color;
  const common = { width: 56, height: 56, viewBox: "0 0 56 56" } as const;
  switch (kind) {
    case "square":
      return (
        <svg {...common} aria-hidden>
          <rect x="12" y="12" width="32" height="32" fill="none" stroke={stroke} strokeWidth="1.4" />
          <rect x="20" y="20" width="16" height="16" fill={stroke} fillOpacity="0.18" />
          <circle cx="28" cy="28" r="1.6" fill={stroke} />
        </svg>
      );
    case "triangle":
      return (
        <svg {...common} aria-hidden>
          <polygon points="28,10 46,44 10,44" fill="none" stroke={stroke} strokeWidth="1.4" />
          <polygon points="28,20 39,40 17,40" fill={stroke} fillOpacity="0.18" />
          <circle cx="28" cy="34" r="1.6" fill={stroke} />
        </svg>
      );
    case "hex":
      return (
        <svg {...common} aria-hidden>
          <polygon points="28,8 46,18 46,38 28,48 10,38 10,18" fill="none" stroke={stroke} strokeWidth="1.4" />
          <polygon points="28,16 38,22 38,34 28,40 18,34 18,22" fill={stroke} fillOpacity="0.18" />
        </svg>
      );
    case "dotted":
      return (
        <svg {...common} aria-hidden>
          <line x1="8" y1="20" x2="48" y2="20" stroke={stroke} strokeWidth="1.4" strokeDasharray="2 4" />
          <line x1="8" y1="28" x2="48" y2="28" stroke={stroke} strokeWidth="1.4" strokeDasharray="2 4" />
          <line x1="8" y1="36" x2="48" y2="36" stroke={stroke} strokeWidth="1.4" strokeDasharray="2 4" />
          <circle cx="28" cy="28" r="2" fill={stroke} />
        </svg>
      );
    case "hatched":
      return (
        <svg {...common} aria-hidden>
          <rect x="10" y="10" width="36" height="36" fill="none" stroke={stroke} strokeWidth="1.4" />
          {[14, 20, 26, 32, 38].map((y) => (
            <line key={y} x1={10} y1={y} x2={46} y2={y - 4} stroke={stroke} strokeWidth="1" />
          ))}
        </svg>
      );
    case "contour":
      return (
        <svg {...common} aria-hidden>
          {[22, 17, 12, 7].map((r, i) => (
            <ellipse
              key={r}
              cx="28"
              cy="28"
              rx={r}
              ry={r * 0.72}
              fill="none"
              stroke={stroke}
              strokeWidth="1.2"
              strokeOpacity={0.5 + i * 0.15}
            />
          ))}
          <circle cx="28" cy="28" r="1.6" fill={stroke} />
        </svg>
      );
  }
}

export default function StackAtlas() {
  const contour = `radial-gradient(ellipse 1200px 700px at 18% 28%, rgba(61,40,23,0.06), transparent 55%), radial-gradient(ellipse 900px 500px at 78% 72%, rgba(61,110,148,0.05), transparent 55%), repeating-radial-gradient(circle at 30% 35%, transparent 0 38px, rgba(61,40,23,0.05) 38px 39px), repeating-radial-gradient(circle at 72% 65%, transparent 0 46px, rgba(61,40,23,0.04) 46px 47px)`;

  return (
    <section
      className={garamond.className}
      style={{ background: PAPER, color: INK, position: "relative", padding: "120px 0 140px" }}
    >
      <div style={{ position: "absolute", inset: 0, background: contour, pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: 1240, margin: "0 auto", padding: "0 32px" }}>
        <header style={{ display: "flex", alignItems: "baseline", gap: 24, paddingBottom: 14, borderBottom: `1px solid ${INK}`, marginBottom: 8 }}>
          <span className={mono.className} style={{ fontSize: 12, letterSpacing: "0.22em", color: INK, textTransform: "uppercase" }}>
            § STACK · MAP KEY
          </span>
          <span className={mono.className} style={{ fontSize: 11, letterSpacing: "0.18em", color: OCEAN, marginLeft: "auto", textTransform: "uppercase" }}>
            SHEET 03 / 06 · SCALE 1:24,000
          </span>
        </header>
        <div style={{ height: 4, borderTop: `1px solid ${INK}`, opacity: 0.35, marginBottom: 56 }} />

        <div style={{ display: "flex", flexWrap: "wrap", alignItems: "flex-end", gap: 32, marginBottom: 64 }}>
          <h2 style={{ fontFamily: "var(--font-eb-garamond)", fontWeight: 500, fontSize: "clamp(40px, 5.4vw, 72px)", lineHeight: 1.02, letterSpacing: "-0.01em", margin: 0, maxWidth: 760 }}>
            Six instruments.<br />
            <em style={{ fontStyle: "italic", color: RUST }}>One survey crew.</em>
          </h2>
          <p className={mono.className} style={{ fontSize: 11, letterSpacing: "0.16em", color: OCEAN, textTransform: "uppercase", maxWidth: 280, lineHeight: 1.7, marginLeft: "auto" }}>
            ↳ Read clockwise from NW. Elevation given in feet above base camp. Symbols defined below.
          </p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 460px), 1fr))", borderTop: `1px solid ${INK}`, borderLeft: `1px solid ${INK}` }}>
          {TOOLS.map((t, i) => (
            <article
              key={t.name}
              style={{
                borderRight: `1px solid ${INK}`,
                borderBottom: `1px solid ${INK}`,
                padding: "32px 28px 30px",
                display: "grid",
                gridTemplateColumns: "72px 1fr auto",
                gap: 20,
                alignItems: "start",
                background: i % 2 === 0 ? "transparent" : "rgba(61,40,23,0.02)",
                position: "relative",
              }}
            >
              <span className={mono.className} style={{ position: "absolute", top: 10, left: 12, fontSize: 9, letterSpacing: "0.2em", color: INK, opacity: 0.45 }}>
                K-{String(i + 1).padStart(2, "0")}
              </span>

              <div style={{ paddingTop: 4 }}>
                <Glyph kind={t.glyph} color={t.color} />
              </div>

              <div>
                <h3 style={{ fontFamily: "var(--font-eb-garamond)", fontWeight: 500, fontSize: 22, lineHeight: 1.15, margin: "0 0 8px", color: INK }}>
                  {t.name}
                </h3>
                <p style={{ fontWeight: 400, fontSize: 15.5, lineHeight: 1.55, margin: "0 0 14px", color: INK, opacity: 0.86, maxWidth: "44ch" }}>
                  {t.desc}
                </p>
                <p className={mono.className} style={{ fontSize: 10.5, letterSpacing: "0.18em", color: OCEAN, textTransform: "uppercase", margin: 0 }}>
                  {t.spec}
                </p>
              </div>

              <div style={{ textAlign: "right", paddingTop: 4 }}>
                <div className={mono.className} style={{ fontSize: 9, letterSpacing: "0.2em", color: INK, opacity: 0.55, textTransform: "uppercase", marginBottom: 4 }}>
                  ELEV.
                </div>
                <div style={{ fontFamily: "var(--font-eb-garamond)", fontWeight: 500, fontStyle: "italic", fontSize: 30, lineHeight: 1, color: t.color }}>
                  {t.elev}
                </div>
                <div className={mono.className} style={{ fontSize: 9, letterSpacing: "0.18em", color: INK, opacity: 0.45, marginTop: 4 }}>
                  FT
                </div>
              </div>
            </article>
          ))}
        </div>

        <footer style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 28, paddingTop: 14, borderTop: `1px solid ${INK}`, opacity: 0.7 }}>
          <span className={mono.className} style={{ fontSize: 10, letterSpacing: "0.2em", color: INK, textTransform: "uppercase" }}>
            ◇ KPT SURVEY · EST. 2004 · ALL ELEV. NAVD88
          </span>
          <span className={mono.className} style={{ fontSize: 10, letterSpacing: "0.2em", color: RUST, textTransform: "uppercase" }}>
            ↳ CONT. SHEET 04 — PORTFOLIO
          </span>
        </footer>
      </div>
    </section>
  );
}
