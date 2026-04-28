import type { CSSProperties } from "react";
import { Fraunces, JetBrains_Mono } from "next/font/google";

const fraunces = Fraunces({ subsets: ["latin"], axes: ["opsz", "SOFT", "WONK"], display: "swap" });
const mono = JetBrains_Mono({ subsets: ["latin"], weight: ["400", "500"], display: "swap" });

const PAPER = "#F5F1EA";
const INK = "#0F0F0F";
const TERRA = "#C56738";
const HAIRLINE = "rgba(15,15,15,0.12)";
const HAIRLINE_SOFT = "rgba(15,15,15,0.08)";
const GRAPHITE = "#5C5852";

const monoLabel: CSSProperties = { fontSize: "10.5px", letterSpacing: "0.22em", textTransform: "uppercase", color: GRAPHITE };
const monoTiny: CSSProperties = { ...monoLabel, fontSize: 10 };

const TOC = [
  { n: "01", label: "Hand-Coded", meta: "No builders" },
  { n: "02", label: "Custom Type", meta: "Set, not picked" },
  { n: "03", label: "Performance", meta: "Sub 1s" },
  { n: "04", label: "Owned Outright", meta: "Domain · Repo" },
  { n: "05", label: "Established", meta: "MMIV" },
] as const;

export default function HeroEditorial() {
  return (
    <section
      className={fraunces.className}
      style={{
        position: "relative",
        background: PAPER,
        color: INK,
        padding: "clamp(96px,12vh,160px) clamp(20px,4vw,56px) clamp(48px,8vh,120px)",
        overflow: "hidden",
        isolation: "isolate",
      }}
    >
      <PaperGrain />

      <div
        className={mono.className}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
          padding: "14px 0",
          borderTop: `1px solid ${TERRA}`,
          ...monoLabel,
          color: INK,
        }}
      >
        <span style={{ color: TERRA, fontWeight: 500 }}>Volume 01</span>
        <span style={{ color: HAIRLINE }}>—</span>
        <span style={{ color: GRAPHITE }}>Established 2004</span>
        <span aria-hidden style={{ flex: 1, height: 1, background: HAIRLINE_SOFT, marginInline: 8 }} />
        <span>KPT Designs</span>
        <span style={{ color: HAIRLINE }}>·</span>
        <span style={{ color: GRAPHITE }}>A Monograph</span>
      </div>

      <div
        className="hero-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "minmax(0,8fr) minmax(0,4fr)",
          gap: "clamp(24px,4vw,64px)",
          alignItems: "start",
          marginTop: "clamp(32px,6vh,88px)",
          position: "relative",
        }}
      >
        <div style={{ position: "relative", minWidth: 0 }}>
          <span className={mono.className} style={{ ...monoLabel, display: "block", marginBottom: 20 }}>
            <span style={{ color: TERRA }}>§</span>&nbsp;&nbsp;The Studio · Folio I
          </span>

          <h1
            aria-label="KPT"
            style={{
              margin: 0,
              color: INK,
              fontSize: "clamp(160px,28vw,460px)",
              fontWeight: 900,
              lineHeight: 0.82,
              letterSpacing: "-0.055em",
              fontVariationSettings: '"opsz" 144, "SOFT" 30, "WONK" 0',
              fontFeatureSettings: '"kern" 1, "liga" 1, "calt" 1, "ss01" 1',
              textRendering: "geometricPrecision",
              marginLeft: "-0.06em",
            }}
          >
            <span aria-hidden>K</span>
            <span aria-hidden style={{ display: "inline-block", marginLeft: "-0.045em" }}>P</span>
            <span aria-hidden style={{ display: "inline-block", marginLeft: "-0.02em" }}>T</span>
          </h1>

          <div style={{ display: "flex", alignItems: "baseline", gap: "clamp(16px,2.5vw,32px)", marginTop: "clamp(8px,1.5vh,18px)", paddingLeft: "0.04em" }}>
            <span style={{ fontStyle: "italic", fontSize: "clamp(44px,6vw,92px)", lineHeight: 1, letterSpacing: "-0.02em", fontVariationSettings: '"opsz" 96, "SOFT" 100, "WONK" 1' }}>
              Designs<span style={{ color: TERRA }}>.</span>
            </span>
            <span aria-hidden style={{ flex: 1, height: 1, background: HAIRLINE_SOFT, transform: "translateY(-0.6em)" }} />
            <span className={mono.className} style={{ ...monoLabel, whiteSpace: "nowrap", transform: "translateY(-0.4em)" }}>Plate I</span>
          </div>

          <p style={{ maxWidth: "44ch", marginTop: "clamp(32px,5vh,56px)", marginBottom: 0, fontSize: "clamp(15px,1.05vw,17px)", lineHeight: 1.55, color: GRAPHITE, fontVariationSettings: '"opsz" 14' }}>
            <span style={{ float: "left", fontSize: "3.4em", lineHeight: 0.86, paddingRight: 10, paddingTop: 4, color: INK, fontWeight: 500, fontVariationSettings: '"opsz" 144' }}>A</span>
            studio of one, building considered websites for businesses that prefer quiet excellence to loud features. Each project is set by hand, line by line, in a single editor — the way books used to be made.
          </p>
        </div>

        <aside className="hero-toc" style={{ position: "relative", border: `1px solid ${HAIRLINE}`, background: "rgba(255,253,247,0.55)", padding: "clamp(20px,2.2vw,32px)", marginTop: "clamp(20px,4vw,48px)", boxShadow: "0 1px 0 rgba(15,15,15,0.02)" }}>
          <div className={mono.className} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", ...monoTiny, paddingBottom: 14, borderBottom: `1px solid ${HAIRLINE_SOFT}` }}>
            <span>Contents</span>
            <span style={{ color: TERRA }}>I — V</span>
          </div>

          <ol style={{ listStyle: "none", margin: "8px 0 0", padding: 0 }}>
            {TOC.map((item, i) => (
              <li key={item.n} style={{ display: "grid", gridTemplateColumns: "auto 1fr auto", alignItems: "baseline", gap: 14, padding: "14px 0", borderBottom: i === TOC.length - 1 ? "none" : `1px solid ${HAIRLINE_SOFT}` }}>
                <span className={mono.className} style={{ fontSize: 10, letterSpacing: "0.2em", color: TERRA, fontWeight: 500 }}>{item.n}</span>
                <span style={{ fontSize: "clamp(17px,1.4vw,21px)", fontWeight: 500, letterSpacing: "-0.012em", fontVariationSettings: '"opsz" 36' }}>{item.label}</span>
                <span className={mono.className} style={{ ...monoTiny, letterSpacing: "0.16em", whiteSpace: "nowrap" }}>{item.meta}</span>
              </li>
            ))}
          </ol>

          <p style={{ fontStyle: "italic", fontSize: "clamp(15px,1.1vw,18px)", lineHeight: 1.45, color: INK, margin: "20px 0 0", paddingTop: 18, borderTop: `1px solid ${HAIRLINE_SOFT}`, fontVariationSettings: '"opsz" 24, "SOFT" 100', letterSpacing: "-0.005em" }}>
            <span style={{ color: TERRA, marginRight: "0.15em" }}>“</span>A studio of one. By appointment.<span style={{ color: TERRA, marginLeft: "0.05em" }}>”</span>
          </p>
          <div className={mono.className} style={{ display: "flex", justifyContent: "space-between", marginTop: 16, ...monoTiny, letterSpacing: "0.2em" }}>
            <span>Ledger</span>
            <span><span style={{ color: TERRA }}>+44</span>&nbsp;·&nbsp;Remote</span>
          </div>
        </aside>

        <ConnectingArrow />
      </div>

      <div className="hero-pull" style={{ marginTop: "clamp(80px,16vh,200px)", display: "grid", gridTemplateColumns: "minmax(0,1fr) minmax(0,11fr)", gap: "clamp(16px,3vw,48px)", alignItems: "start" }}>
        <span className={mono.className} style={{ ...monoLabel, paddingTop: 18, borderTop: `1px solid ${TERRA}`, display: "block" }}>
          <span style={{ color: TERRA }}>¶</span> Manifesto
        </span>
        <blockquote style={{ margin: 0, padding: 0, maxWidth: 750, fontStyle: "italic", fontSize: "clamp(40px,6.4vw,92px)", lineHeight: 1.02, letterSpacing: "-0.022em", color: INK, fontVariationSettings: '"opsz" 96, "SOFT" 80, "WONK" 1', textIndent: "-0.42em" }}>
          <span aria-hidden style={{ color: TERRA, marginRight: "0.04em" }}>“</span>
          We don&rsquo;t ship templates. We set type<span style={{ color: TERRA }}>.</span>
          <span aria-hidden style={{ color: TERRA, marginLeft: "0.02em" }}>”</span>
        </blockquote>
      </div>

      <div className={mono.className} style={{ marginTop: "clamp(56px,10vh,120px)", paddingTop: 16, borderTop: `1px solid ${HAIRLINE_SOFT}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16 }}>
        <span style={monoLabel}><span style={{ color: TERRA }}>§</span>&nbsp;&nbsp;Folio I — Hero · Set in Fraunces &amp; JetBrains Mono</span>
        <span style={{ ...monoLabel, color: INK, letterSpacing: "0.24em" }}>001 <span style={{ color: TERRA }}>/</span> KPT</span>
      </div>

      <style>{`
        .hero-grid::after { content:""; position:absolute; left:66.66%; top:-8px; bottom:-8px; width:1px; background:${HAIRLINE_SOFT}; pointer-events:none; }
        @media (max-width: 900px) {
          .hero-grid, .hero-pull { grid-template-columns: minmax(0,1fr) !important; }
          .hero-grid::after, .hero-arrow { display: none !important; }
          .hero-toc { margin-top: 8px !important; }
        }
      `}</style>
    </section>
  );
}

function ConnectingArrow() {
  const stroke = { fill: "none", stroke: "currentColor", strokeWidth: 1.4, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg className="hero-arrow" aria-hidden viewBox="0 0 320 200" preserveAspectRatio="none"
      style={{ position: "absolute", left: "54%", top: "8%", width: "min(22vw,320px)", height: "min(14vw,200px)", pointerEvents: "none", color: TERRA, opacity: 0.85 }}>
      <path d="M 8 168 C 60 160, 92 178, 134 142 S 210 70, 268 44" {...stroke} />
      <path d="M 252 36 L 274 40 L 264 60" {...stroke} />
    </svg>
  );
}

function PaperGrain() {
  return (
    <div aria-hidden style={{
      position: "absolute", inset: 0, pointerEvents: "none", opacity: 0.5, mixBlendMode: "multiply", zIndex: 0,
      backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='240' height='240'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.06   0 0 0 0 0.06   0 0 0 0 0.06   0 0 0 0.18 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      backgroundSize: "240px 240px",
    }} />
  );
}
