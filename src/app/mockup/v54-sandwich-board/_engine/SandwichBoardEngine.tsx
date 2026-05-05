"use client";

/**
 * SandwichBoardEngine — V54 Sandwich Board
 *
 * A sidewalk A-frame chalkboard at full size — slate ground, hand-lettered
 * chalk type, smudge-ghosts of last week's lettering still visible under
 * this week's, terracotta sandbag at the foot. Agnostic skin with a
 * landscaping showcase.
 *
 * No Tailwind. Inline <style> only. Reduced-motion presents the finished
 * board with no draw-in or wind-cycle lean.
 */

import { useEffect, useState } from "react";

const THREE_LINES = [
  {
    label: "DESIGN",
    line2: "stake & flag walks · CAD plans",
    price: "FREE 1ST WALK",
    icon: "stake",
  },
  {
    label: "INSTALL",
    line2: "pavers · plantings · mulch ring",
    price: "BY THE PROJECT",
    icon: "shovel",
  },
  {
    label: "MAINTAIN",
    line2: "edge & blow · seasonal cleanup",
    price: "SEASONAL · $185/MO",
    icon: "mower",
  },
] as const;

const SPECIALS = [
  { item: "SPRING CLEANUP", price: "$285" },
  { item: "MULCH REFRESH · 6 YDS", price: "$540" },
  { item: "PAVER RE-LEVEL · 80 SF", price: "$640" },
  { item: "STAKE & FLAG WALK", price: "FREE" },
  { item: "EDGE & BLOW · WEEKLY", price: "$95/VISIT" },
];

const PROJECTS = [
  { addr: "112 ALDER", date: "MAR 22", note: "DRY-LAID FLAGSTONE WALK" },
  { addr: "44 SYCAMORE", date: "APR 04", note: "MULCH RING · 6 OAKS" },
  { addr: "08 RIVERSIDE", date: "APR 11", note: "PAVER TERRACE 280 SF" },
  { addr: "27 ELM CT", date: "APR 18", note: "SPRING CLEANUP" },
  { addr: "61 BIRCH", date: "APR 25", note: "STAKE & FLAG, NEW BED" },
];

export default function SandwichBoardEngine() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return (
    <div className="sb-root">
      <style>{css}</style>

      {/* HERO — A-frame chalkboard */}
      <header className="sb-hero">
        <div className={`sb-frame${reduced ? " sb-frame-still" : ""}`}>
          <div className="sb-board">
            {/* smudge ghosts */}
            <div className="sb-ghost sb-ghost-1" aria-hidden>SPRING IS NEAR</div>
            <div className="sb-ghost sb-ghost-2" aria-hidden>OPEN HOUSE SAT</div>
            <div className="sb-ghost sb-ghost-3" aria-hidden>HELLO MARCH</div>

            <div className="sb-eyebrow">EST. 2014 &middot; DESIGN-BUILD LANDSCAPE</div>
            <h1 className="sb-headline">
              <span className="sb-line sb-line-1">Design</span>
              <span className="sb-slash">/</span>
              <span className="sb-line sb-line-2">Install</span>
              <span className="sb-slash">/</span>
              <span className="sb-line sb-line-3">Maintain</span>
            </h1>
            <p className="sb-sub">
              Design-build landscape for owners who want the same crew through the whole season &mdash; stake, pour, plant, mow, and the mulch ring done right.
            </p>
            <div className="sb-cta-row">
              <a className="sb-btn sb-btn-primary" href="#three-lines">Walk the property</a>
              <a className="sb-btn sb-btn-ghost" href="#projects">See this season&rsquo;s installs</a>
            </div>

            {/* small printed credit */}
            <div className="sb-credit">EST. 2014 &middot; DESIGN-BUILD &middot; LIC LCO-2218</div>
          </div>

          {/* sandbag */}
          <div className="sb-sandbag" aria-hidden>
            <span>40 LB</span>
          </div>
          <div className="sb-sandbag sb-sandbag-r" aria-hidden>
            <span>40 LB</span>
          </div>
        </div>
      </header>

      {/* THREE LINES */}
      <section id="three-lines" className="sb-section">
        <div className="sb-section-head">
          <span className="sb-tag">LINE 01 &middot; THE THREE BOARDS</span>
          <h2>Design / Install / Maintain</h2>
          <p>Three boards stacked vertically. Hover redraws the chalk fresh.</p>
        </div>

        <div className="sb-three-grid">
          {THREE_LINES.map((b, i) => (
            <article key={b.label} className="sb-three" tabIndex={0}>
              <div className="sb-three-icon" aria-hidden>
                {b.icon === "stake" ? <Stake /> : b.icon === "shovel" ? <Shovel /> : <Mower />}
              </div>
              <h3 className="sb-three-label">{b.label}</h3>
              <div className="sb-three-line2">{b.line2}</div>
              <div className="sb-three-price">{b.price}</div>
              <div className="sb-three-num">0{i + 1}</div>
            </article>
          ))}
        </div>
      </section>

      {/* TODAY'S SPECIALS */}
      <section className="sb-section">
        <div className="sb-section-head">
          <span className="sb-tag">LINE 02 &middot; TODAY&rsquo;S BOARD</span>
          <h2>This season&rsquo;s specials</h2>
          <p>Bistro-style. Mouseover swipes and rewrites the price.</p>
        </div>
        <ul className="sb-specials">
          {SPECIALS.map((s) => (
            <li key={s.item} tabIndex={0}>
              <span className="sb-special-item">{s.item}</span>
              <span className="sb-special-dots" aria-hidden>
                ·····················································
              </span>
              <span className="sb-special-price">{s.price}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* THE WALK */}
      <section id="projects" className="sb-section">
        <div className="sb-section-head">
          <span className="sb-tag">LINE 03 &middot; THE WALK</span>
          <h2>This season, on the route</h2>
          <p>Each property as an A-frame chalkboard caption, dated, hand-lettered.</p>
        </div>
        <div className="sb-walk">
          {PROJECTS.map((p) => (
            <article key={p.addr} className="sb-walk-card" tabIndex={0}>
              <div className="sb-walk-date">{p.date}</div>
              <div className="sb-walk-addr">{p.addr}</div>
              <div className="sb-walk-note">{p.note}</div>
            </article>
          ))}
        </div>
      </section>

      <footer className="sb-foot">
        <div className="sb-foot-card" aria-hidden>
          <div>KPT LANDSCAPE</div>
          <div>(555) 014-0200</div>
          <div>USDA ZONE 6b</div>
          <div className="sb-foot-tack" />
        </div>
        <div>DESIGN &middot; INSTALL &middot; MAINTAIN &middot; LIC LCO-2218</div>
      </footer>
    </div>
  );
}

function Stake() {
  return (
    <svg viewBox="0 0 64 64" width="44" height="44" aria-hidden>
      <line x1="16" y1="14" x2="44" y2="14" stroke="#F0EBDC" strokeWidth="2" />
      <polygon points="16,14 44,14 38,22 22,22" fill="#B6553B" stroke="#F0EBDC" strokeWidth="1.5" />
      <line x1="30" y1="14" x2="30" y2="56" stroke="#F0EBDC" strokeWidth="2" />
      <line x1="22" y1="56" x2="38" y2="56" stroke="#F0EBDC" strokeWidth="2" />
    </svg>
  );
}
function Shovel() {
  return (
    <svg viewBox="0 0 64 64" width="44" height="44" aria-hidden>
      <line x1="32" y1="6" x2="32" y2="38" stroke="#F0EBDC" strokeWidth="2" />
      <rect x="28" y="6" width="8" height="6" stroke="#F0EBDC" strokeWidth="1.5" fill="none" />
      <path d="M 18 38 Q 32 60 46 38 Z" fill="#B6553B" stroke="#F0EBDC" strokeWidth="1.5" />
    </svg>
  );
}
function Mower() {
  return (
    <svg viewBox="0 0 64 64" width="44" height="44" aria-hidden>
      <rect x="12" y="22" width="40" height="20" fill="#B6553B" stroke="#F0EBDC" strokeWidth="1.5" />
      <line x1="20" y1="22" x2="20" y2="14" stroke="#F0EBDC" strokeWidth="2" />
      <line x1="44" y1="22" x2="44" y2="14" stroke="#F0EBDC" strokeWidth="2" />
      <line x1="20" y1="14" x2="44" y2="14" stroke="#F0EBDC" strokeWidth="2" />
      <circle cx="20" cy="48" r="6" fill="none" stroke="#F0EBDC" strokeWidth="2" />
      <circle cx="44" cy="48" r="6" fill="none" stroke="#F0EBDC" strokeWidth="2" />
    </svg>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Caveat:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap');

  .sb-root {
    --slate: #1B1F1D;
    --slate-deep: #11141A;
    --chalk: #F0EBDC;
    --chalk-dim: rgba(240,235,220,0.6);
    --terra: #B6553B;
    --terra-deep: #8C3F2A;
    --oak: #6B4A2D;
    background: var(--slate);
    color: var(--chalk);
    min-height: 100vh;
    font-family: 'Inter', system-ui, sans-serif;
    line-height: 1.55;
  }
  .sb-root *, .sb-root *::before, .sb-root *::after { box-sizing: border-box; }

  /* slate texture */
  .sb-root::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    z-index: 0;
    background-image:
      radial-gradient(circle at 30% 30%, rgba(240,235,220,0.04) 0%, transparent 40%),
      radial-gradient(circle at 70% 70%, rgba(240,235,220,0.03) 0%, transparent 50%),
      repeating-linear-gradient(0deg, rgba(240,235,220,0.018) 0 1px, transparent 1px 5px);
  }

  .sb-hero {
    position: relative;
    z-index: 1;
    padding: clamp(40px, 5vw, 80px) clamp(20px, 4vw, 60px) 0;
    display: flex;
    justify-content: center;
  }

  .sb-frame {
    position: relative;
    max-width: 1100px;
    width: 100%;
    padding: 28px 28px 64px;
    border: 8px solid var(--oak);
    border-radius: 4px;
    background: linear-gradient(180deg, #15181A 0%, #0F1214 100%);
    box-shadow:
      inset 0 0 60px rgba(0,0,0,0.5),
      0 24px 60px -28px rgba(0,0,0,0.7);
    transform-origin: 50% 100%;
    animation: sb-lean 8s ease-in-out infinite;
  }
  .sb-frame-still { animation: none; }
  @keyframes sb-lean {
    0%, 100% { transform: rotate(-0.3deg); }
    50% { transform: rotate(0.6deg); }
  }
  @media (prefers-reduced-motion: reduce) {
    .sb-frame { animation: none; }
  }

  .sb-board {
    position: relative;
    padding: 28px 32px;
    border: 1px solid rgba(240,235,220,0.18);
    background:
      radial-gradient(circle at 20% 20%, rgba(240,235,220,0.04) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(240,235,220,0.03) 0%, transparent 60%),
      var(--slate);
    overflow: hidden;
  }
  .sb-board::before {
    content: "";
    position: absolute;
    inset: 0;
    pointer-events: none;
    background-image: repeating-linear-gradient(45deg, rgba(240,235,220,0.02) 0 1px, transparent 1px 5px);
    opacity: 0.7;
  }

  /* smudge ghosts */
  .sb-ghost {
    position: absolute;
    font-family: 'Caveat', cursive;
    font-weight: 600;
    color: rgba(240,235,220,0.07);
    pointer-events: none;
    text-transform: uppercase;
    transform: rotate(-4deg);
    letter-spacing: 0.04em;
    user-select: none;
  }
  .sb-ghost-1 { top: 18px; right: 20px; font-size: 38px; transform: rotate(-7deg); }
  .sb-ghost-2 { bottom: 84px; left: 28px; font-size: 30px; transform: rotate(3deg); }
  .sb-ghost-3 { bottom: 36px; right: 36px; font-size: 26px; transform: rotate(-2deg); }

  .sb-eyebrow {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--chalk-dim);
    margin-bottom: 12px;
    border-bottom: 1px dashed rgba(240,235,220,0.2);
    padding-bottom: 6px;
    display: inline-block;
  }

  .sb-headline {
    font-family: 'Caveat', cursive;
    font-weight: 700;
    font-size: clamp(64px, 12vw, 156px);
    line-height: 0.94;
    margin: 6px 0 18px;
    color: var(--chalk);
    text-shadow:
      0 0 0.5px rgba(240,235,220,0.6),
      1px 0 0 rgba(240,235,220,0.18),
      -1px 0 0 rgba(240,235,220,0.18);
    display: flex;
    flex-wrap: wrap;
    gap: 10px 18px;
    align-items: baseline;
  }
  .sb-line {
    display: inline-block;
    animation: sb-draw 700ms ease both;
  }
  .sb-line-1 { animation-delay: 100ms; }
  .sb-line-2 { animation-delay: 380ms; color: #FAD2C2; }
  .sb-line-3 { animation-delay: 660ms; }
  .sb-slash {
    font-size: 0.7em;
    color: var(--terra);
    transform: translateY(-0.05em);
  }
  @keyframes sb-draw {
    from { opacity: 0; transform: translateY(8px) rotate(-2deg); filter: blur(2px); }
    to { opacity: 1; transform: none; filter: blur(0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .sb-line { animation: none; opacity: 1; }
  }

  .sb-sub {
    font-family: 'Caveat', cursive;
    font-size: clamp(20px, 2vw, 26px);
    color: var(--chalk-dim);
    margin: 0 0 18px;
    max-width: 720px;
    line-height: 1.4;
  }

  .sb-cta-row { display: flex; gap: 10px; flex-wrap: wrap; margin-bottom: 12px; }
  .sb-btn {
    display: inline-flex;
    padding: 10px 20px;
    font-family: 'Caveat', cursive;
    font-size: 22px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-decoration: none;
    border: 2px solid var(--chalk);
    border-radius: 24px;
    transition: background 140ms ease, color 140ms ease, transform 140ms ease;
  }
  .sb-btn-primary { background: var(--chalk); color: var(--slate); }
  .sb-btn-primary:hover, .sb-btn-primary:focus-visible {
    background: var(--terra);
    color: var(--chalk);
    border-color: var(--terra);
    transform: translateY(-2px) rotate(-1deg);
    outline: none;
  }
  .sb-btn-ghost { background: transparent; color: var(--chalk); }
  .sb-btn-ghost:hover, .sb-btn-ghost:focus-visible {
    background: var(--chalk); color: var(--slate); transform: translateY(-2px) rotate(1deg); outline: none;
  }

  .sb-credit {
    position: absolute;
    bottom: 6px;
    left: 28px;
    font-family: 'Inter', sans-serif;
    font-size: 10px;
    letter-spacing: 0.22em;
    color: var(--chalk-dim);
    text-transform: uppercase;
  }

  /* sandbags */
  .sb-sandbag {
    position: absolute;
    bottom: -22px;
    left: 12%;
    width: 130px;
    height: 70px;
    background: linear-gradient(160deg, #C2654A 0%, #8C3F2A 60%, #5C2A1B 100%);
    border-radius: 60% 40% 50% 50% / 60% 60% 40% 40%;
    box-shadow: 0 6px 18px -6px rgba(0,0,0,0.5);
    display: flex;
    align-items: center;
    justify-content: center;
    transform: rotate(-3deg);
  }
  .sb-sandbag-r {
    left: auto;
    right: 12%;
    transform: rotate(2deg);
  }
  .sb-sandbag span {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    color: rgba(255,255,255,0.7);
  }

  /* SECTIONS */
  .sb-section {
    position: relative;
    z-index: 1;
    max-width: 1100px;
    margin: 0 auto;
    padding: clamp(50px, 6vw, 96px) clamp(20px, 4vw, 48px);
  }
  .sb-section-head { margin-bottom: 28px; }
  .sb-tag {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--terra);
    display: inline-block;
    margin-bottom: 10px;
  }
  .sb-section-head h2 {
    font-family: 'Caveat', cursive;
    font-weight: 700;
    font-size: clamp(40px, 5vw, 72px);
    margin: 0 0 6px;
    color: var(--chalk);
  }
  .sb-section-head p {
    font-family: 'Caveat', cursive;
    font-size: clamp(18px, 1.8vw, 22px);
    color: var(--chalk-dim);
  }

  /* THREE LINES grid */
  .sb-three-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 16px;
  }
  .sb-three {
    position: relative;
    border: 1.5px solid rgba(240,235,220,0.4);
    background: rgba(0,0,0,0.2);
    padding: 24px 22px 28px;
    transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
    cursor: default;
  }
  .sb-three:hover, .sb-three:focus-visible {
    transform: translateY(-4px) rotate(-0.6deg);
    border-color: var(--terra);
    background: rgba(0,0,0,0.35);
    outline: none;
  }
  .sb-three-icon { margin-bottom: 14px; }
  .sb-three-label {
    font-family: 'Caveat', cursive;
    font-weight: 700;
    font-size: 56px;
    line-height: 0.95;
    margin: 0 0 6px;
    color: var(--chalk);
  }
  .sb-three-line2 {
    font-family: 'Caveat', cursive;
    font-size: 22px;
    color: var(--chalk-dim);
    margin-bottom: 18px;
  }
  .sb-three-price {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--terra);
    border-top: 1px dashed rgba(240,235,220,0.25);
    padding-top: 10px;
  }
  .sb-three-num {
    position: absolute;
    top: 12px;
    right: 14px;
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    color: var(--chalk-dim);
    letter-spacing: 0.18em;
  }

  /* SPECIALS */
  .sb-specials { list-style: none; margin: 0; padding: 0; }
  .sb-specials li {
    display: grid;
    grid-template-columns: max-content 1fr max-content;
    align-items: baseline;
    gap: 12px;
    padding: 12px 0;
    border-bottom: 1px dashed rgba(240,235,220,0.2);
    transition: color 140ms ease;
    cursor: default;
  }
  .sb-specials li:hover, .sb-specials li:focus-visible {
    color: var(--terra);
    outline: none;
  }
  .sb-special-item {
    font-family: 'Caveat', cursive;
    font-weight: 700;
    font-size: clamp(22px, 2.4vw, 32px);
  }
  .sb-special-dots {
    font-family: 'Inter', sans-serif;
    color: rgba(240,235,220,0.35);
    overflow: hidden;
    white-space: nowrap;
    letter-spacing: 0.4em;
  }
  .sb-special-price {
    font-family: 'Caveat', cursive;
    font-weight: 700;
    font-size: clamp(22px, 2.4vw, 32px);
    color: var(--terra);
    transition: transform 140ms ease;
  }
  .sb-specials li:hover .sb-special-price { transform: scale(1.06); }

  /* WALK */
  .sb-walk {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 14px;
  }
  .sb-walk-card {
    border: 1.5px solid rgba(240,235,220,0.35);
    padding: 18px 20px;
    background: rgba(0,0,0,0.2);
    transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
    cursor: default;
  }
  .sb-walk-card:nth-child(odd) { transform: rotate(-0.5deg); }
  .sb-walk-card:nth-child(even) { transform: rotate(0.4deg); }
  .sb-walk-card:hover, .sb-walk-card:focus-visible {
    transform: translateY(-3px) rotate(0deg);
    border-color: var(--terra);
    background: rgba(0,0,0,0.3);
    outline: none;
  }
  .sb-walk-date {
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--terra);
    margin-bottom: 4px;
  }
  .sb-walk-addr {
    font-family: 'Caveat', cursive;
    font-weight: 700;
    font-size: 32px;
    line-height: 1.05;
    color: var(--chalk);
  }
  .sb-walk-note {
    font-family: 'Caveat', cursive;
    font-size: 20px;
    color: var(--chalk-dim);
    margin-top: 4px;
  }

  /* FOOTER */
  .sb-foot {
    position: relative;
    z-index: 1;
    border-top: 1px dashed rgba(240,235,220,0.2);
    padding: 28px clamp(20px, 4vw, 48px);
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    flex-wrap: wrap;
    gap: 16px;
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--chalk-dim);
  }
  .sb-foot-card {
    position: relative;
    background: #F2EBD7;
    color: var(--slate);
    padding: 10px 14px;
    transform: rotate(-4deg);
    box-shadow: 0 6px 14px -8px rgba(0,0,0,0.5);
    font-family: 'Inter', sans-serif;
    font-size: 11px;
    line-height: 1.5;
    letter-spacing: 0.14em;
  }
  .sb-foot-tack {
    position: absolute;
    top: -6px;
    left: 50%;
    width: 12px;
    height: 12px;
    background: radial-gradient(circle at 30% 30%, #FF6A4A 0%, #B6553B 60%, #5C2A1B 100%);
    border-radius: 50%;
    box-shadow: 0 1px 2px rgba(0,0,0,0.4);
  }

  @media (max-width: 720px) {
    .sb-headline { font-size: clamp(56px, 16vw, 110px); }
    .sb-special-dots { display: none; }
    .sb-sandbag { width: 90px; height: 50px; }
  }
`;
