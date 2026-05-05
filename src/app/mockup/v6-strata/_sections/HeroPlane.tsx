"use client";

import { Fraunces, JetBrains_Mono } from "next/font/google";

// Fraunces stands in for Migra (ultra-bold display) — opsz 144 for big optical size.
const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});
const jbm = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500", "700"] });

const PAPER = "#F4F1EB";
const OFFBLACK = "#0B0B0F";
const INK = "#1A1A22";
const ORANGE = "#FF5E1A";
const SAGE = "#7B8E6F";

const PILLARS = ["REGISTRAR", "HOST", "BUILDER", "AGENTS"];

// Tiny inline SVG noise — turbulence baked into a data URI so it renders as a tiled grain
// without an extra network request. Subtle (opacity 0.06) over the paper.
const NOISE_DATA_URI =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' width='220' height='220'>
       <filter id='n'>
         <feTurbulence type='fractalNoise' baseFrequency='0.92' numOctaves='2' stitchTiles='stitch'/>
         <feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 0.55 0'/>
       </filter>
       <rect width='100%' height='100%' filter='url(#n)' opacity='0.55'/>
     </svg>`
  );

const S = {
  plane: {
    position: "relative",
    width: "100%",
    height: "100%",
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: PAPER,
    color: INK,
    overflow: "hidden",
    isolation: "isolate",
  },
  grain: {
    position: "absolute",
    inset: 0,
    backgroundImage: `url("${NOISE_DATA_URI}")`,
    backgroundRepeat: "repeat",
    backgroundSize: "220px 220px",
    opacity: 0.18,
    mixBlendMode: "multiply" as const,
    pointerEvents: "none",
    zIndex: 1,
  },
  // Radial mask — fade plane edges to off-black so each pane melts into the void.
  edgeFade: {
    position: "absolute",
    inset: 0,
    background: `radial-gradient(ellipse at center, rgba(11,11,15,0) 38%, rgba(11,11,15,0.18) 62%, rgba(11,11,15,0.72) 86%, ${OFFBLACK} 100%)`,
    pointerEvents: "none",
    zIndex: 2,
  },
  // Faint horizontal rules — strata striations across the plane.
  strataLines: {
    position: "absolute",
    inset: 0,
    backgroundImage: `repeating-linear-gradient(180deg, transparent 0 119px, rgba(26,26,34,0.05) 119px 120px)`,
    pointerEvents: "none",
    zIndex: 1,
  },
  content: {
    position: "relative",
    zIndex: 3,
    width: "min(1240px, 92vw)",
    padding: "0 24px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    textAlign: "center",
  },
  topRule: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    fontSize: 11,
    letterSpacing: "0.36em",
    textTransform: "uppercase" as const,
    color: `${INK}99`,
    marginBottom: "clamp(36px, 6vh, 64px)",
  },
  topRuleAccent: { color: ORANGE, fontWeight: 700 },
  wordmark: {
    fontVariationSettings: "'opsz' 144, 'SOFT' 0, 'WONK' 0",
    fontWeight: 900,
    fontSize: "clamp(200px, 34vw, 400px)",
    lineHeight: 0.82,
    letterSpacing: "-0.045em",
    margin: 0,
    color: ORANGE,
    // Molten ink: a touch of bleed + faint warm halo to feel like wet pigment on paper.
    textShadow: `0 1px 0 rgba(255,94,26,0.25), 0 0 36px rgba(255,94,26,0.18)`,
  },
  designs: {
    fontVariationSettings: "'opsz' 72",
    fontWeight: 400,
    fontStyle: "italic",
    fontSize: "clamp(40px, 6.4vw, 96px)",
    lineHeight: 1,
    margin: "clamp(8px, 1.4vh, 16px) 0 0",
    color: INK,
    letterSpacing: "-0.01em",
  },
  designsDot: { color: ORANGE },
  // Long horizontal hairline below "Designs."
  hairline: {
    width: "min(720px, 78vw)",
    height: 1,
    margin: "clamp(36px, 6vh, 56px) 0 clamp(28px, 4vh, 44px)",
    background: `linear-gradient(90deg, transparent 0%, ${INK}55 14%, ${INK}55 86%, transparent 100%)`,
  },
  subhead: {
    fontSize: 12,
    letterSpacing: "0.42em",
    textTransform: "uppercase" as const,
    color: INK,
    margin: 0,
  },
  subheadFade: { color: `${INK}66` },
  subheadInk: { color: ORANGE, fontWeight: 700 },
  pillBar: {
    marginTop: "clamp(40px, 6vh, 64px)",
    display: "inline-flex",
    alignItems: "stretch",
    border: `1px solid ${INK}22`,
    borderRadius: 999,
    background: "rgba(244,241,235,0.6)",
    boxShadow: `inset 0 0 0 1px ${PAPER}, 0 1px 0 ${INK}10`,
    overflow: "hidden",
  },
  pill: {
    padding: "12px 22px",
    fontSize: 10,
    letterSpacing: "0.34em",
    color: INK,
    textTransform: "uppercase" as const,
    display: "inline-flex",
    alignItems: "center",
    gap: 10,
    whiteSpace: "nowrap" as const,
  },
  pillDot: {
    width: 6,
    height: 6,
    borderRadius: 999,
    background: SAGE,
    boxShadow: `0 0 0 2px ${SAGE}22`,
  },
  divider: {
    width: 1,
    alignSelf: "stretch",
    background: `linear-gradient(180deg, transparent, ${INK}22, transparent)`,
  },
  bottomHint: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: "clamp(28px, 5vh, 56px)",
    zIndex: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "1.4ch",
    fontSize: 10,
    letterSpacing: "0.42em",
    color: `${INK}80`,
    textTransform: "uppercase" as const,
  },
  bracket: { color: ORANGE, fontWeight: 700 },
  // Corner ticks — quietly mark the plane as a discrete slide.
  cornerTick: {
    position: "absolute",
    width: 18,
    height: 18,
    borderColor: `${INK}55`,
    zIndex: 3,
  },
} satisfies Record<string, React.CSSProperties>;

export default function HeroPlane() {
  return (
    <div className={fraunces.className} style={S.plane}>
      <div aria-hidden style={S.strataLines} />
      <div aria-hidden style={S.grain} />
      <div aria-hidden style={S.edgeFade} />

      {/* Corner ticks — top-left, top-right, bottom-left, bottom-right */}
      <span aria-hidden style={{ ...S.cornerTick, top: 24, left: 24, borderTop: `1px solid ${INK}55`, borderLeft: `1px solid ${INK}55` }} />
      <span aria-hidden style={{ ...S.cornerTick, top: 24, right: 24, borderTop: `1px solid ${INK}55`, borderRight: `1px solid ${INK}55` }} />
      <span aria-hidden style={{ ...S.cornerTick, bottom: 24, left: 24, borderBottom: `1px solid ${INK}55`, borderLeft: `1px solid ${INK}55` }} />
      <span aria-hidden style={{ ...S.cornerTick, bottom: 24, right: 24, borderBottom: `1px solid ${INK}55`, borderRight: `1px solid ${INK}55` }} />

      <div style={S.content}>
        <div className={jbm.className} style={S.topRule}>
          <span>
            <span style={S.topRuleAccent}>[</span> KPT/STRATA <span style={S.topRuleAccent}>]</span>
          </span>
          <span>VERTICALLY INTEGRATED · EST. 2004</span>
          <span>
            <span style={S.topRuleAccent}>[</span> PLANE 01 / 08 <span style={S.topRuleAccent}>]</span>
          </span>
        </div>

        <h1 style={S.wordmark}>KPT</h1>
        <p style={S.designs}>
          Designs<span style={S.designsDot}>.</span>
        </p>

        <div aria-hidden style={S.hairline} />

        <p className={jbm.className} style={S.subhead}>
          <span style={S.subheadFade}>scroll</span>{" "}
          <span style={S.subheadInk}>IN</span>
          <span style={S.subheadFade}>, not down</span>
        </p>

        <div className={jbm.className} style={S.pillBar}>
          {PILLARS.map((label, i) => (
            <span key={label} style={{ display: "inline-flex", alignItems: "stretch" }}>
              <span style={S.pill}>
                <span aria-hidden style={S.pillDot} />
                {label}
              </span>
              {i < PILLARS.length - 1 && <span aria-hidden style={S.divider} />}
            </span>
          ))}
        </div>
      </div>

      <div className={jbm.className} style={S.bottomHint}>
        <span>
          <span style={S.bracket}>[</span> DEPTH 1 / 8 <span style={S.bracket}>]</span>
        </span>
        <span style={{ color: `${INK}33` }}>·</span>
        <span>SCROLL TO ADVANCE</span>
      </div>
    </div>
  );
}
