import type { CSSProperties } from "react";
import { Crimson_Pro, UnifrakturCook, Cormorant_Garamond } from "next/font/google";

const crimson = Crimson_Pro({ subsets: ["latin"], weight: ["400", "500", "600", "700"], style: ["normal", "italic"], display: "swap" });
const fraktur = UnifrakturCook({ subsets: ["latin"], weight: ["700"], display: "swap" });
const cormorant = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["italic", "normal"], display: "swap" });

const VELLUM = "#F2E8D5";
const INK = "#1B1410";
const VERMILLION = "#C72A1F";
const ULTRAMARINE = "#2845A8";
const GOLD = "#D4A04A";
const MULBERRY = "#5C2D5E";
const INK_FADE = "rgba(27, 20, 16, 0.62)";

const tinyCaps: CSSProperties = { fontSize: 10.5, letterSpacing: "0.32em", textTransform: "uppercase", fontWeight: 600 };
const smallCap: CSSProperties = { fontVariant: "small-caps", letterSpacing: "0.04em" };

const MARGINALIA: { n: string; text: string; muted?: boolean }[] = [
  { n: "i.", text: "The four crafts, bound as one quire — registrar, host, designer, builder." },
  { n: "ii.", text: "Cf. KPT Agents — the answering spirits, est. MMXXVI." },
  { n: "iii.", text: "Of the patron's domain: kept in his name; never tenant, ever owner." },
  { n: "iv.", text: "No templates, no themes, no third-party page-builders. Hand-set, line by line." },
  { n: "v.", text: "See further: Folio II (Philosophy).", muted: true },
];

export default function HeroCodex() {
  return (
    <section
      className={crimson.className}
      style={{
        position: "relative", background: VELLUM, color: INK, overflow: "hidden", isolation: "isolate", minHeight: "100vh",
        padding: "clamp(96px,12vh,160px) clamp(24px,5vw,80px) clamp(64px,9vh,128px)",
      }}
    >
      <VellumTexture />
      <InkBleedEdges />

      {/* Top rubrication */}
      <div style={{ position: "relative", borderTop: `1px solid ${VERMILLION}`, borderBottom: `0.5px solid ${VERMILLION}`, padding: "10px 0 9px", display: "flex", alignItems: "center", justifyContent: "center", gap: 18, color: VERMILLION, ...tinyCaps }}>
        <Ornament />
        <span>Codex KPT</span><span style={{ color: GOLD }}>·</span>
        <span>Liber Primus</span><span style={{ color: GOLD }}>·</span>
        <span>Anno MMIV</span>
        <Ornament flip />
      </div>

      <div className="codex-grid" style={{ display: "grid", gridTemplateColumns: "minmax(0,9fr) minmax(0,3fr)", gap: "clamp(28px,4vw,72px)", marginTop: "clamp(48px,7vh,96px)", alignItems: "start", position: "relative" }}>
        <div style={{ position: "relative", minWidth: 0 }}>
          {/* Chapter heading */}
          <div style={{ marginBottom: "clamp(28px,4vh,52px)", textAlign: "center" }}>
            <div style={{ ...tinyCaps, color: VERMILLION, marginBottom: 14 }}>Capitulum I</div>
            <h1 className={fraktur.className} style={{ margin: 0, color: INK, fontSize: "clamp(42px,5.4vw,76px)", lineHeight: 1.05, fontWeight: 700 }}>
              <span style={{ color: VERMILLION }}>O</span>f the Studio Entire
            </h1>
            <div aria-hidden style={{ margin: "18px auto 0", width: "min(360px,60%)", height: 12 }}><DividerKnot /></div>
          </div>

          {/* Drop-cap body */}
          <div style={{ position: "relative", fontSize: "clamp(17px,1.25vw,20px)", lineHeight: 1.62, color: INK, textAlign: "justify", hyphens: "auto", fontFeatureSettings: '"liga" 1, "dlig" 1, "kern" 1, "onum" 1', maxWidth: "62ch", margin: "0 auto" }}>
            <IlluminatedK />
            <p style={{ margin: 0 }}>
              f designs hand-set in code, of domains kept and hosts maintained, of agents that answer in your stead by night and by day &mdash; <em style={{ color: MULBERRY }}>KPT</em> presents the modern enterprise of web in <span style={{ color: VERMILLION, fontWeight: 600 }}>five chapters</span>. Herein shall be inscribed the manner of our craft: the <span style={{ ...smallCap, color: ULTRAMARINE }}>registrar</span>, the <span style={{ ...smallCap, color: ULTRAMARINE }}>host</span>, the <span style={{ ...smallCap, color: ULTRAMARINE }}>designer</span>, and the <span style={{ ...smallCap, color: ULTRAMARINE }}>builder</span> &mdash; bound together as one workshop, under one ledger, attended by one hand. Established in the year of our Lord two thousand and four; not lately come, nor briefly to remain.
            </p>
            <p style={{ margin: "clamp(22px,3vh,32px) 0 0", textIndent: "1.4em" }}>
              And in the <span style={smallCap}>year of our Lord</span> two thousand and twenty-six, a sister-house was entered &mdash; <em style={{ color: MULBERRY }}>KPT Agents</em> &mdash; whereby the telephone is answered, day or night, by reasoning spirits trained to the patron&rsquo;s tongue. So shall the merchant sleep, and yet his door not be unattended.
            </p>
          </div>

          {/* Pull quote */}
          <figure style={{ margin: "clamp(40px,6vh,72px) auto 0", maxWidth: "60ch", display: "grid", gridTemplateColumns: "auto 1fr", gap: 18, alignItems: "start", borderTop: `0.5px solid ${VERMILLION}`, borderBottom: `0.5px solid ${VERMILLION}`, padding: "clamp(20px,3vh,28px) clamp(8px,2vw,20px)" }}>
            <span aria-hidden style={{ fontSize: "clamp(34px,3.4vw,46px)", lineHeight: 1, color: VERMILLION }}>☞</span>
            <blockquote style={{ margin: 0, fontStyle: "italic", fontSize: "clamp(20px,1.7vw,28px)", lineHeight: 1.32, color: MULBERRY, fontWeight: 500 }}>
              <span aria-hidden style={{ color: VERMILLION, marginRight: "0.15em" }}>&ldquo;</span>
              One process, one bill, one team. Owned outright, and bound in our own hand &mdash; not leased from <span style={smallCap}>strangers</span>.
              <span aria-hidden style={{ color: VERMILLION, marginLeft: "0.05em" }}>&rdquo;</span>
            </blockquote>
          </figure>

          {/* Sigil */}
          <div style={{ display: "flex", justifyContent: "center", marginTop: "clamp(48px,7vh,84px)" }}><SigilK /></div>
        </div>

        {/* Marginalia gutter */}
        <aside className="codex-margin" style={{ position: "relative", paddingTop: "clamp(20px,3vh,40px)", paddingLeft: "clamp(8px,1.4vw,18px)", borderLeft: `1px dashed ${INK_FADE}`, color: INK_FADE }}>
          {MARGINALIA.map((m) => (
            <div key={m.n} className={cormorant.className} style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 8, marginBottom: 14, fontStyle: "italic", fontSize: "clamp(13px,1vw,15px)", lineHeight: 1.4, color: m.muted ? INK_FADE : INK, opacity: m.muted ? 0.75 : 1 }}>
              <span style={{ color: VERMILLION, fontStyle: "normal", fontWeight: 600 }}>{m.n}</span>
              <span>{m.text}</span>
            </div>
          ))}

          <div style={{ marginTop: "clamp(28px,4vh,44px)", paddingTop: 14, borderTop: `0.5px solid ${INK_FADE}` }}>
            <div style={{ ...tinyCaps, color: VERMILLION, fontSize: 9 }}>Calls to the Reader</div>
            <div style={{ marginTop: 14, display: "flex", flexDirection: "column", gap: 12 }}>
              <CodexLink href="/start" primary label="Commission a Folio" sub="Begin thy brief" />
              <CodexLink href="/pricing" label="Read the Tariff" sub="Of pricing & terms" />
            </div>
          </div>
        </aside>
      </div>

      {/* Folio bar */}
      <div style={{ position: "relative", marginTop: "clamp(56px,9vh,112px)", paddingTop: 14, borderTop: `1px solid ${VERMILLION}`, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 16, ...tinyCaps, color: INK_FADE, fontSize: 10 }}>
        <span><span style={{ color: VERMILLION }}>§</span>&nbsp;&nbsp;Set by hand &middot; vermillion &amp; gold leaf</span>
        <span style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Ornament tiny />
          <span style={{ color: INK }}>Fol. <span style={{ color: VERMILLION }}>1</span><span style={{ color: GOLD }}>r</span></span>
        </span>
      </div>

      <style>{`
        .codex-grid::before { content:""; position:absolute; left:50%; top:0; bottom:0; width:1px; background: linear-gradient(to bottom, transparent, ${INK_FADE} 12%, ${INK_FADE} 88%, transparent); opacity:.18; pointer-events:none; }
        @media (max-width: 880px) {
          .codex-grid { grid-template-columns: minmax(0,1fr) !important; }
          .codex-grid::before { display:none; }
          .codex-margin { border-left:none !important; padding-left:0 !important; border-top:1px dashed ${INK_FADE}; padding-top:24px !important; margin-top:12px; }
        }
        @keyframes codex-ink-bleed { 0%,100%{opacity:.55} 50%{opacity:.78} }
      `}</style>
    </section>
  );
}

function IlluminatedK() {
  return (
    <span aria-hidden style={{ float: "left", width: "clamp(120px,14vw,164px)", height: "clamp(120px,14vw,164px)", marginRight: 14, marginBottom: 4, marginTop: 4, shapeOutside: "margin-box" }}>
      <svg viewBox="0 0 200 200" width="100%" height="100%" style={{ display: "block" }}>
        <defs>
          <pattern id="codex-vine" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M0 10 Q5 4 10 10 T20 10" stroke={GOLD} strokeWidth="0.7" fill="none" opacity="0.7" />
          </pattern>
          <linearGradient id="codex-gold" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0" stopColor="#E8B65C" /><stop offset="0.5" stopColor={GOLD} /><stop offset="1" stopColor="#A77A2E" />
          </linearGradient>
        </defs>
        <rect x="2" y="2" width="196" height="196" fill={VERMILLION} />
        <rect x="6" y="6" width="188" height="188" fill="none" stroke="url(#codex-gold)" strokeWidth="1.6" />
        <rect x="10" y="10" width="180" height="180" fill="url(#codex-vine)" opacity="0.55" />
        <rect x="22" y="22" width="156" height="156" fill={ULTRAMARINE} />
        {[[22, 22], [178, 22], [22, 178], [178, 178]].map(([cx, cy], i) => (
          <g key={i} transform={`translate(${cx} ${cy})`}>
            <circle r="6" fill="url(#codex-gold)" /><circle r="2.4" fill={VERMILLION} />
          </g>
        ))}
        <g stroke={GOLD} strokeWidth="0.9" fill="none" opacity="0.85">
          <path d="M30 60 Q60 30 100 50 T170 60" />
          <path d="M30 140 Q60 170 100 150 T170 140" />
          <path d="M40 100 Q70 80 100 100 T160 100" opacity="0.55" />
        </g>
        <Floret cx={60} cy={50} /><Floret cx={140} cy={150} /><Floret cx={100} cy={100} large />
        <text x="100" y="146" textAnchor="middle" fontFamily="UnifrakturCook, serif" fontSize="160" fontWeight="700" fill={VERMILLION} opacity="0.55" transform="translate(2 2)">K</text>
        <text x="100" y="146" textAnchor="middle" fontFamily="UnifrakturCook, serif" fontSize="160" fontWeight="700" fill="url(#codex-gold)" stroke={INK} strokeWidth="0.6">K</text>
      </svg>
    </span>
  );
}

function Floret({ cx, cy, large }: { cx: number; cy: number; large?: boolean }) {
  const r = large ? 8 : 5;
  return (
    <g transform={`translate(${cx} ${cy})`}>
      {[0, 60, 120, 180, 240, 300].map((deg) => (
        <ellipse key={deg} rx={r * 0.45} ry={r} fill={GOLD} opacity="0.9" transform={`rotate(${deg})`} />
      ))}
      <circle r={r * 0.5} fill={VERMILLION} />
    </g>
  );
}

function SigilK() {
  return (
    <svg width="120" height="120" viewBox="0 0 120 120" aria-hidden>
      <defs>
        <radialGradient id="sigil-gold" cx="0.5" cy="0.45" r="0.55">
          <stop offset="0" stopColor="#F0CB7A" /><stop offset="0.55" stopColor={GOLD} /><stop offset="1" stopColor="#8C5F22" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="48" fill="none" stroke={VERMILLION} strokeWidth="1" opacity="0.6" />
      <circle cx="60" cy="60" r="42" fill="none" stroke={GOLD} strokeWidth="0.6" opacity="0.85" />
      {[0, 45, 90, 135, 180, 225, 270, 315].map((deg) => (
        <g key={deg} transform={`rotate(${deg} 60 60)`}>
          <path d="M60 12 L62 18 L60 22 L58 18 Z" fill={GOLD} opacity="0.8" />
        </g>
      ))}
      <text x="60" y="78" textAnchor="middle" fontFamily="UnifrakturCook, serif" fontSize="60" fontWeight="700" fill="url(#sigil-gold)" stroke={INK} strokeWidth="0.4">K</text>
      <circle cx="60" cy="60" r="2" fill={VERMILLION} />
    </svg>
  );
}

function Ornament({ flip, tiny }: { flip?: boolean; tiny?: boolean }) {
  const w = tiny ? 28 : 56;
  return (
    <svg width={w} height={tiny ? 8 : 12} viewBox="0 0 56 12" aria-hidden style={{ transform: flip ? "scaleX(-1)" : undefined }}>
      <path d="M0 6 Q8 0 16 6 T32 6 T48 6" stroke="currentColor" strokeWidth="0.8" fill="none" />
      <circle cx="48" cy="6" r="1.4" fill={GOLD} />
      <circle cx="32" cy="6" r="1" fill={GOLD} opacity="0.7" />
      <circle cx="16" cy="6" r="1" fill={GOLD} opacity="0.5" />
    </svg>
  );
}

function DividerKnot() {
  return (
    <svg viewBox="0 0 360 12" width="100%" height="12" aria-hidden preserveAspectRatio="none">
      <path d="M0 6 H140" stroke={VERMILLION} strokeWidth="0.7" />
      <path d="M220 6 H360" stroke={VERMILLION} strokeWidth="0.7" />
      <g transform="translate(180 6)">
        <circle r="5" fill="none" stroke={GOLD} strokeWidth="1" />
        <circle r="2" fill={VERMILLION} />
        <circle cx="-12" r="1.4" fill={GOLD} />
        <circle cx="12" r="1.4" fill={GOLD} />
      </g>
    </svg>
  );
}

function CodexLink({ href, label, sub, primary }: { href: string; label: string; sub: string; primary?: boolean }) {
  return (
    <a href={href} style={{ display: "block", textDecoration: "none", color: INK, padding: "10px 12px", borderTop: `0.5px solid ${primary ? VERMILLION : INK_FADE}`, borderBottom: `0.5px solid ${primary ? VERMILLION : INK_FADE}`, background: primary ? "rgba(199,42,31,0.04)" : "transparent" }}>
      <div style={{ ...tinyCaps, fontSize: 9, color: primary ? VERMILLION : INK_FADE, marginBottom: 4 }}>{sub}</div>
      <div style={{ fontSize: "clamp(15px,1.1vw,17px)", fontStyle: "italic", color: primary ? VERMILLION : INK, fontWeight: 500 }}>
        {label} <span style={{ color: GOLD }}>&rarr;</span>
      </div>
    </a>
  );
}

function VellumTexture() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0, opacity: 0.85, mixBlendMode: "multiply",
      backgroundImage: "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='320' height='320'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.55' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.32   0 0 0 0 0.22   0 0 0 0 0.10   0 0 0 0.14 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>\")",
      backgroundSize: "320px 320px" }} />
  );
}

function InkBleedEdges() {
  return (
    <div aria-hidden style={{ position: "absolute", inset: 0, pointerEvents: "none", zIndex: 0,
      background: "radial-gradient(circle at 0% 0%, rgba(60,40,20,0.22), transparent 38%), radial-gradient(circle at 100% 0%, rgba(60,40,20,0.18), transparent 42%), radial-gradient(circle at 0% 100%, rgba(60,40,20,0.20), transparent 40%), radial-gradient(circle at 100% 100%, rgba(60,40,20,0.24), transparent 44%), radial-gradient(ellipse 80% 50% at 50% 50%, transparent 45%, rgba(40,25,12,0.10) 100%)",
      animation: "codex-ink-bleed 14s ease-in-out infinite" }} />
  );
}
