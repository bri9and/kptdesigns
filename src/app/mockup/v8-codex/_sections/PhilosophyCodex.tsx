"use client";

import { Crimson_Pro, UnifrakturCook, Cormorant_Garamond } from "next/font/google";

const body = Crimson_Pro({ subsets: ["latin"], weight: ["400", "500", "600"], style: ["normal", "italic"], display: "swap" });
const head = UnifrakturCook({ subsets: ["latin"], weight: ["700"], display: "swap" });
const margin = Cormorant_Garamond({ subsets: ["latin"], weight: ["400", "500"], style: ["italic", "normal"], display: "swap" });

const INK = "#1B1410";
const VERMILLION = "#C72A1F";
const GOLD = "#D4A04A";
const MULBERRY = "#5C2D5E";
const ULTRAMARINE = "#2845A8";

const MARGINALIA = [
  { l: "i.", t: "vide. JOHANNES GUTENBERG", s: "Mainz, A.D. mcdliv" },
  { l: "ii.", t: "cf. ALDUS MANUTIUS", s: "Venetiis, A.D. mcdxcix" },
  { l: "iii.", t: "de officio scriptoris", s: "quod manu sua scribit" },
  { l: "iv.", t: "“nullum templatum”", s: "ex consuetudine domus" },
  { l: "v.", t: "cf. KELMSCOTT PRESS", s: "Hammersmith, A.D. mdcccxci" },
];

export default function PhilosophyCodex() {
  return (
    <section className={body.className} style={{ position: "relative", background: "#F2E8D5", color: INK, padding: "8rem 0 9rem", overflow: "hidden" }}>
      <div aria-hidden style={{ position: "absolute", inset: 0, background: "radial-gradient(ellipse 70% 60% at 50% 50%, transparent 55%, rgba(90,55,20,0.18) 88%, rgba(40,20,8,0.32) 100%), repeating-radial-gradient(circle at 23% 41%, rgba(90,55,20,0.04) 0 1px, transparent 1px 3px), repeating-radial-gradient(circle at 77% 64%, rgba(60,35,12,0.05) 0 1px, transparent 1px 4px)", mixBlendMode: "multiply", pointerEvents: "none" }} />
      <div aria-hidden style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 12% 18%, rgba(120,75,30,0.18) 0 1.5px, transparent 2px), radial-gradient(circle at 84% 22%, rgba(140,90,40,0.12) 0 1px, transparent 2px), radial-gradient(circle at 38% 78%, rgba(100,60,25,0.14) 0 1.5px, transparent 2px), radial-gradient(circle at 67% 88%, rgba(140,90,40,0.10) 0 1px, transparent 2px)", opacity: 0.7, pointerEvents: "none" }} />

      <div style={{ position: "relative", maxWidth: "76rem", margin: "0 auto", padding: "0 2.5rem" }}>
        <div style={{ height: 1, background: VERMILLION, width: "100%", marginBottom: "1.25rem", boxShadow: `0 1px 0 ${VERMILLION}33` }} />

        <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", gap: "2rem", marginBottom: "0.5rem" }}>
          <span className={margin.className} style={folioLabel}>Folio II · recto</span>
          <span className={margin.className} style={folioLabel}>de arte fabricandi · ii</span>
        </div>

        <h2 className={head.className} style={{ fontSize: "clamp(3rem, 7vw, 5.75rem)", lineHeight: 0.95, color: INK, margin: "0 0 0.35em", letterSpacing: "0.005em" }}>
          <span style={{ color: VERMILLION, marginRight: "0.35em" }}>Chapter II</span>
          <span style={{ color: `${INK}55` }}>·</span> <span>Of Method</span>
        </h2>
        <div style={{ height: 1, background: `${INK}40`, width: "100%", marginBottom: "3rem" }} />

        <div style={{ display: "grid", gridTemplateColumns: "1fr 14rem", gap: "3rem", alignItems: "start" }}>
          <article style={{ columnCount: 2, columnGap: "2.5rem", columnRule: `1px solid ${INK}1F`, fontSize: "1.18rem", lineHeight: 1.72, textAlign: "justify", hyphens: "auto", color: INK }}>
            <p style={{ margin: 0 }}>
              <span aria-hidden className={head.className} style={{ float: "left", fontSize: "5.6em", lineHeight: 0.78, padding: "0.06em 0.14em 0 0", marginRight: "0.04em", color: VERMILLION, textShadow: `2px 2px 0 ${GOLD}, 3px 3px 0 ${GOLD}66`, fontWeight: 700 }}>W</span>
              e hand-set every site in code, no templates, no proxies of design. Each markup is set with the rigour a scribe gives parchment — for spacing, for rhythm, for voice. The page is not assembled; it is composed, glyph by glyph, until the measure breathes.
            </p>
            <p style={{ marginTop: "1em", textIndent: "1.4em" }}>
              Upon completion the source is delivered in full. No lock-in. No proprietary craft withheld behind a vendor&rsquo;s seal. The codex passes wholly into the keeper&rsquo;s hands — registrar, host, design and build, with our sister-house of agents at the gate — under one team, one bill, one process, owned outright. <em>In perpetuum.</em>
            </p>
            <p style={{ marginTop: "1em", textIndent: "1.4em" }}>
              Your codex. Your code. In perpetuity. We sign no work we would not show a master, and we ship no folio whose every line we have not weighed against the gutter and the page.
            </p>
          </article>

          <aside className={margin.className} style={{ fontSize: "0.92rem", lineHeight: 1.55, color: `${INK}B0`, borderLeft: `1px solid ${INK}26`, paddingLeft: "1.25rem", fontStyle: "italic" }}>
            {MARGINALIA.map((m) => (
              <div key={m.l} style={{ marginBottom: "1.5rem" }}>
                <span style={{ color: VERMILLION, marginRight: "0.4em", fontStyle: "normal" }}>{m.l}</span>
                <span style={{ display: "block", marginTop: 2 }}>{m.t}</span>
                <span style={{ display: "block", fontSize: "0.78rem", letterSpacing: "0.14em", textTransform: "uppercase", color: `${INK}80`, marginTop: 2, fontStyle: "normal" }}>{m.s}</span>
              </div>
            ))}
          </aside>
        </div>

        <div style={{ display: "flex", justifyContent: "center", margin: "3.5rem 0 2.5rem" }} aria-hidden>
          <Sigil />
        </div>

        <figure style={{ maxWidth: "44rem", margin: "0 auto", textAlign: "center", padding: "1rem 1.5rem" }}>
          <blockquote className={body.className} style={{ fontStyle: "italic", fontSize: "clamp(1.6rem, 3.2vw, 2.4rem)", lineHeight: 1.25, color: MULBERRY, margin: 0, letterSpacing: "0.005em" }}>
            <span style={{ color: VERMILLION, fontStyle: "normal" }}>&ldquo;</span>
            Templatum est inimicus boni
            <span style={{ color: VERMILLION, fontStyle: "normal" }}>&rdquo;</span>
          </blockquote>
          <figcaption className={margin.className} style={{ marginTop: "0.85rem", fontStyle: "italic", fontSize: 13, letterSpacing: "0.22em", textTransform: "uppercase", color: `${INK}88` }}>
            &mdash; proverb of the house, anno fundationis mmiv
          </figcaption>
        </figure>

        <div style={{ height: 1, background: `${VERMILLION}80`, width: "32%", margin: "3.5rem auto 0" }} />
      </div>
    </section>
  );
}

const folioLabel: React.CSSProperties = { fontStyle: "italic", fontSize: 14, letterSpacing: "0.18em", color: `${INK}99`, textTransform: "uppercase" };

function Sigil() {
  return (
    <svg width="180" height="46" viewBox="0 0 180 46" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g stroke={INK} strokeWidth="0.9" fill="none" strokeLinecap="round">
        <path d="M2 23 L60 23" />
        <path d="M120 23 L178 23" />
        <path d="M55 23 C 62 10, 72 10, 78 23 C 84 36, 94 36, 100 23 C 106 10, 116 10, 122 23" />
        <circle cx="90" cy="23" r="6" stroke={VERMILLION} strokeWidth="1.2" />
        <circle cx="90" cy="23" r="2.2" fill={GOLD} stroke="none" />
        <path d="M82 8 L90 14 L98 8" stroke={ULTRAMARINE} />
        <path d="M82 38 L90 32 L98 38" stroke={ULTRAMARINE} />
        <path d="M30 18 Q 36 12 42 18" stroke={GOLD} />
        <path d="M30 28 Q 36 34 42 28" stroke={GOLD} />
        <path d="M138 18 Q 144 12 150 18" stroke={GOLD} />
        <path d="M138 28 Q 144 34 150 28" stroke={GOLD} />
        <circle cx="14" cy="23" r="1.4" fill={VERMILLION} stroke="none" />
        <circle cx="166" cy="23" r="1.4" fill={VERMILLION} stroke="none" />
      </g>
    </svg>
  );
}
