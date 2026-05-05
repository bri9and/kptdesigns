"use client";

/**
 * BenchGrainEngine — V46 Bench Grain
 *
 * Hardwood end-grain hero (SVG ring composition). Layout follows growth rings.
 * Wood-burn section headers. Hover on a ring expands a year. Custom hardwood
 * furniture / built-ins, native to fine carpentry.
 */

import { useEffect, useRef, useState } from "react";

const RINGS = [
  {
    year: "2026",
    label: "Sapwood",
    title: "Live-edge walnut credenza, Newton MA",
    body:
      "Slab cut from a Pennsylvania-grown black walnut, dried to 7%. Two-piece book-match across a 96-inch span, hand-fit half-blind dovetails on the side gables. Rubio Monocoat 'Smoke 5%' over raw fiber.",
    species: "Juglans nigra",
  },
  {
    year: "2025",
    label: "Outer ring",
    title: "Quartersawn white-oak library, Brookline",
    body:
      "Floor-to-ceiling cabinetry in 2,500 board-feet of QSWO. Frame-and-panel doors, hand-cut mortise-and-tenon, ammonia-fumed for the Stickley tone the client wanted to read at midnight.",
    species: "Quercus alba",
  },
  {
    year: "2024",
    label: "Mid ring",
    title: "Cherry kitchen, Concord",
    body:
      "American cherry inset cabinets across a 22-foot run. Drawer boxes in soft maple with through-dovetailed corners. 1/16 reveal at every door — measured, not guessed.",
    species: "Prunus serotina",
  },
  {
    year: "2023",
    label: "Heart edge",
    title: "Maple butcher-block, Cambridge",
    body:
      "End-grain hard-rock maple, 2¼ inch thick, 56 inches long. Feet rabbeted under for clearance, food-safe mineral oil and beeswax finish. Owner's mother's bread board (1962) used as the dimensioning reference.",
    species: "Acer saccharum",
  },
  {
    year: "2022",
    label: "Heart",
    title: "Walnut entry bench, Lincoln",
    body:
      "First commission of the new shop. Solid walnut bench seat, hand-planed top, through-tenon legs wedged with maple keys. Still in the entryway. Still moving with the seasons exactly as it should.",
    species: "Juglans nigra",
  },
];

const SPECIES = [
  { name: "Black Walnut", latin: "Juglans nigra", hex: "#4D2E1B", note: "Heart purplish-brown, sapwood pale; planes glossy, glues clean, tightens with age." },
  { name: "White Oak", latin: "Quercus alba", hex: "#8C5A36", note: "Closed-cell, water-tight; quartersawn flecks the medullary ray. Fumes brown with ammonia." },
  { name: "American Cherry", latin: "Prunus serotina", hex: "#9C4A2E", note: "Fine even grain, photo-darkens to deep amber. Burns under a dull blade — keep them sharp." },
  { name: "Hard Maple", latin: "Acer saccharum", hex: "#D8B57A", note: "1450 Janka. Closed pores. Curl and bird's-eye command a premium; figure reads under shellac." },
  { name: "White Ash", latin: "Fraxinus americana", hex: "#C8A572", note: "Open ring-porous; bends with steam, planes clean. Listen for a baseball bat tone when you tap a slab." },
];

const JOINERY = [
  { name: "Through dovetail", spec: "1:6 softwood · 1:8 hardwood", note: "Cut by hand with a dovetail saw and chisels. Pins narrower than tails, by eye." },
  { name: "Mortise & tenon", spec: "Tenon ⅓ stock thickness", note: "Drawbored with a slightly-offset peg. Pulled tight, stays tight, even when the wood moves." },
  { name: "Half-blind dovetail", spec: "Drawer-front standard", note: "Hidden from the front. The trade-mark of a properly made drawer — no metal, no glue lines." },
  { name: "Sliding dovetail", spec: "Bottom & shelf housing", note: "A dado that locks. Cut with a router and a hand-fit final pass for the slip-fit feel." },
];

export default function BenchGrainEngine() {
  const [activeYear, setActiveYear] = useState<string | null>(null);
  const ringRefs = useRef<(HTMLElement | null)[]>([]);
  const [reveal, setReveal] = useState<Set<number>>(new Set());

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number(e.target.getAttribute("data-ring-idx"));
          if (e.isIntersecting) {
            setReveal((prev) => {
              if (prev.has(idx)) return prev;
              const next = new Set(prev);
              next.add(idx);
              return next;
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    ringRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="bg-shell">
        <div className="bg-grain" aria-hidden />

        <header className="bg-top">
          <div className="bg-mark">
            <span className="bg-mark-stamp" aria-hidden>★</span>
            <span className="bg-mark-name">BENCHGRAIN</span>
            <span className="bg-mark-trade">Cabinetry &amp; Built-Ins</span>
          </div>
          <nav className="bg-nav" aria-label="Primary">
            <a href="#rings">Years</a>
            <a href="#species">Species</a>
            <a href="#joinery">Joinery</a>
            <a href="#commission" className="bg-nav-cta">COMMISSION A PIECE</a>
          </nav>
        </header>

        <section className="bg-hero">
          <svg className="bg-rings" viewBox="0 0 800 800" aria-hidden>
            <defs>
              <radialGradient id="bg-heart" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#3A1F0F" />
                <stop offset="60%" stopColor="#5A331C" />
                <stop offset="100%" stopColor="#8C5A36" />
              </radialGradient>
            </defs>
            <rect width="800" height="800" fill="url(#bg-heart)" />
            {Array.from({ length: 28 }).map((_, i) => {
              const r = 30 + i * 14;
              const stroke = i % 4 === 0 ? "#2A1606" : "#4A2B17";
              const w = i % 7 === 0 ? 1.6 : 0.7;
              const dx = Math.sin(i * 0.6) * 12;
              const dy = Math.cos(i * 0.4) * 8;
              return (
                <ellipse
                  key={i}
                  cx={400 + dx}
                  cy={400 + dy}
                  rx={r * 1.05}
                  ry={r * 0.95}
                  fill="none"
                  stroke={stroke}
                  strokeWidth={w}
                  opacity={0.55 + (i % 3) * 0.12}
                />
              );
            })}
            {Array.from({ length: 9 }).map((_, i) => {
              const a = (i * 360) / 9 + 12;
              const x2 = 400 + Math.cos((a * Math.PI) / 180) * 420;
              const y2 = 400 + Math.sin((a * Math.PI) / 180) * 420;
              return (
                <line
                  key={i}
                  x1={400}
                  y1={400}
                  x2={x2}
                  y2={y2}
                  stroke="#2A1606"
                  strokeWidth={0.6}
                  opacity={0.4}
                />
              );
            })}
          </svg>

          <div className="bg-hero-content">
            <span className="bg-hero-mark">EST 2014 · SHOP NO. 47 · WORCESTER</span>
            <h1 className="bg-hero-h1">
              <span className="bg-hero-burn">Heart, sapwood,</span><br />
              <span className="bg-hero-burn">and the year</span><br />
              <span className="bg-hero-burn">you started.</span>
            </h1>
            <p className="bg-hero-sub">
              Custom hardwood furniture and built-ins — every piece dimensioned from
              the rings out, finishes that move with the wood. Hand-cut joinery,
              one-shop, one bench, no MDF carcass under a veneered face.
            </p>
            <div className="bg-cta-row">
              <a href="#commission" className="bg-cta bg-cta-primary">
                Commission a piece
              </a>
              <a href="#rings" className="bg-cta bg-cta-ghost">
                Read the wood diary
              </a>
            </div>
          </div>
        </section>

        <section id="rings" className="bg-rings-section">
          <header className="bg-section-head">
            <span className="bg-eye">RING BY RING · 2022 → 2026</span>
            <h2 className="bg-h2">A diary, told outward from the heart.</h2>
            <p className="bg-section-sub">
              Recent commissions, sapwood-out. Hover or focus a year to expand the
              entry; the rings widen with the season.
            </p>
          </header>
          <div className="bg-ring-list">
            {RINGS.map((r, i) => (
              <article
                key={r.year}
                ref={(el) => {
                  ringRefs.current[i] = el;
                }}
                data-ring-idx={i}
                className={`bg-ring${reveal.has(i) ? " in" : ""}${activeYear === r.year ? " open" : ""}`}
                onMouseEnter={() => setActiveYear(r.year)}
                onMouseLeave={() => setActiveYear(null)}
                onFocus={() => setActiveYear(r.year)}
                onBlur={() => setActiveYear(null)}
                tabIndex={0}
                aria-label={`${r.year} ${r.title}`}
              >
                <div className="bg-ring-side">
                  <span className="bg-ring-year">{r.year}</span>
                  <span className="bg-ring-label">{r.label}</span>
                  <span className="bg-ring-bar" aria-hidden />
                </div>
                <div className="bg-ring-text">
                  <h3 className="bg-ring-title">{r.title}</h3>
                  <p className="bg-ring-body">{r.body}</p>
                  <span className="bg-ring-species">{r.species}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="species" className="bg-species-section">
          <header className="bg-section-head">
            <span className="bg-eye">SPECIES INDEX · END-GRAIN SWATCHES</span>
            <h2 className="bg-h2">What we cut, and what it tells you.</h2>
          </header>
          <div className="bg-species-grid">
            {SPECIES.map((s) => (
              <article key={s.name} className="bg-species-card" style={{ ["--sp" as string]: s.hex }}>
                <div className="bg-species-swatch" aria-hidden>
                  <svg viewBox="0 0 100 100" width="100%" height="100%">
                    {Array.from({ length: 9 }).map((_, i) => (
                      <ellipse
                        key={i}
                        cx="50"
                        cy="50"
                        rx={6 + i * 4.5}
                        ry={5 + i * 4.2}
                        fill="none"
                        stroke="rgba(20,10,4,0.55)"
                        strokeWidth={i % 3 === 0 ? 1.4 : 0.6}
                      />
                    ))}
                  </svg>
                </div>
                <div className="bg-species-name">{s.name}</div>
                <div className="bg-species-latin">{s.latin}</div>
                <p className="bg-species-note">{s.note}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="joinery" className="bg-joinery-section">
          <header className="bg-section-head">
            <span className="bg-eye">THE JOINERY · NO METAL FASTENERS</span>
            <h2 className="bg-h2">The piece is held together by the cuts.</h2>
          </header>
          <div className="bg-joinery-list">
            {JOINERY.map((j) => (
              <article key={j.name} className="bg-joinery">
                <div className="bg-joinery-name">{j.name}</div>
                <div className="bg-joinery-spec">{j.spec}</div>
                <p className="bg-joinery-note">{j.note}</p>
              </article>
            ))}
          </div>
        </section>

        <footer id="commission" className="bg-footer">
          <div className="bg-foot-burn">
            <svg viewBox="0 0 200 60" aria-hidden>
              <text x="100" y="38" textAnchor="middle" fontFamily="serif" fontWeight="800" fontSize="22" fill="#2A1606" letterSpacing="3">BENCHGRAIN</text>
              <line x1="40" y1="48" x2="160" y2="48" stroke="#2A1606" strokeWidth="1" />
              <text x="100" y="58" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="9" fill="#5A331C" letterSpacing="2">commissions accepted · Mar – Oct</text>
            </svg>
          </div>
          <div className="bg-foot-grid">
            <div>
              <div className="bg-foot-label">Shop</div>
              <div>47 Beaver Street · Worcester, MA 01609</div>
              <div>Open by appointment · Sat 9 – 12</div>
            </div>
            <div>
              <div className="bg-foot-label">Lead time</div>
              <div>Furniture · 6 – 9 weeks</div>
              <div>Built-ins · 12 – 18 weeks</div>
            </div>
            <div>
              <div className="bg-foot-label">Finish warranty</div>
              <div>10-year structural · joinery</div>
              <div>2-year finish · refresh in shop</div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,800;9..144,900&family=Inter:wght@400;500;600&display=swap');

  .bg-shell {
    --sap: #E0CFA1;
    --heart: #4D2E1B;
    --bark: #2A1606;
    --warmth: #8C5A36;
    --char: #1B0E04;
    --cream: #F1E5C2;
    position: relative; min-height: 100vh; overflow: hidden;
    font-family: 'Inter', system-ui, sans-serif;
    background: var(--sap); color: #2A1A0E;
  }
  .bg-grain {
    position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.22;
    background-image:
      repeating-linear-gradient(
        2deg,
        rgba(74,43,23,0.7) 0 1px,
        transparent 1px 9px,
        rgba(74,43,23,0.5) 9px 10px,
        transparent 10px 24px
      );
  }

  .bg-top {
    position: relative; z-index: 3;
    display: flex; justify-content: space-between; align-items: center;
    padding: 20px 36px;
    border-bottom: 1px solid rgba(43,16,4,0.25);
  }
  .bg-mark { display: flex; align-items: center; gap: 12px; }
  .bg-mark-stamp {
    font-family: 'Fraunces', serif; color: var(--bark); font-size: 24px;
  }
  .bg-mark-name {
    font-family: 'Fraunces', serif; font-weight: 900;
    letter-spacing: 0.16em; font-size: 18px; color: var(--bark);
  }
  .bg-mark-trade {
    font-family: 'Fraunces', serif; font-style: italic;
    color: rgba(43,16,4,0.65); font-size: 14px;
  }
  .bg-nav { display: flex; gap: 28px; align-items: center; }
  .bg-nav a {
    color: rgba(43,16,4,0.78); text-decoration: none; font-size: 14px;
    border-bottom: 1px solid transparent; padding-bottom: 2px;
    transition: color 180ms ease, border-color 180ms ease;
  }
  .bg-nav a:hover, .bg-nav a:focus-visible {
    color: var(--bark); border-bottom-color: var(--bark); outline: none;
  }
  .bg-nav-cta {
    background: var(--bark) !important; color: var(--sap) !important;
    padding: 10px 18px; letter-spacing: 0.18em; font-size: 12px !important;
    font-family: 'Fraunces', serif; font-weight: 800;
    border: 1px solid var(--bark);
  }
  .bg-nav-cta:hover, .bg-nav-cta:focus-visible {
    background: var(--char) !important;
  }

  .bg-hero {
    position: relative;
    min-height: 720px;
    display: grid;
    grid-template-columns: 1fr 1fr;
    overflow: hidden;
  }
  .bg-rings {
    position: absolute; right: -10%; top: 50%; transform: translateY(-50%);
    width: 720px; max-width: 60vw; height: auto;
    z-index: 1; pointer-events: none;
    animation: bg-ring-in 1400ms ease 200ms both;
    filter: drop-shadow(0 20px 40px rgba(43,16,4,0.4));
  }
  @keyframes bg-ring-in {
    0% { transform: translateY(-50%) scale(0.4); opacity: 0; }
    100% { transform: translateY(-50%) scale(1); opacity: 1; }
  }
  .bg-hero-content {
    position: relative; z-index: 2;
    grid-column: 1 / -1;
    max-width: 760px;
    padding: 100px 48px 120px;
  }
  .bg-hero-mark {
    font-family: 'Fraunces', serif; font-style: italic;
    color: rgba(43,16,4,0.7); font-size: 13px; letter-spacing: 0.18em;
    display: block; margin-bottom: 28px;
  }
  .bg-hero-h1 {
    font-family: 'Fraunces', serif; font-weight: 800;
    font-size: clamp(48px, 7vw, 100px);
    line-height: 0.98; letter-spacing: -0.02em;
    margin: 0 0 28px;
    color: var(--bark);
  }
  .bg-hero-burn {
    display: inline-block; position: relative;
    background: linear-gradient(180deg, #2A1606 0%, #4A2B17 100%);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    text-shadow: 0 1px 0 rgba(255,235,180,0.4);
  }
  .bg-hero-sub {
    font-family: 'Fraunces', serif;
    font-size: 18px; line-height: 1.65; max-width: 520px;
    color: rgba(43,16,4,0.85); margin: 0 0 36px;
  }
  .bg-cta-row { display: flex; gap: 16px; flex-wrap: wrap; }
  .bg-cta {
    display: inline-flex; align-items: center;
    padding: 14px 24px; text-decoration: none;
    font-family: 'Fraunces', serif; font-weight: 800;
    letter-spacing: 0.06em; font-size: 15px;
    transition: transform 200ms ease, background 200ms ease, color 200ms ease;
  }
  .bg-cta-primary {
    background: var(--bark); color: var(--sap);
  }
  .bg-cta-primary:hover, .bg-cta-primary:focus-visible {
    background: var(--char); transform: translateY(-2px); outline: none;
  }
  .bg-cta-ghost {
    color: var(--bark); border: 1px solid var(--bark);
  }
  .bg-cta-ghost:hover, .bg-cta-ghost:focus-visible {
    background: rgba(43,16,4,0.08); transform: translateY(-2px); outline: none;
  }

  .bg-section-head {
    max-width: 1100px; margin: 0 auto 48px;
    padding: 0 48px;
  }
  .bg-eye {
    display: block;
    font-family: 'Fraunces', serif; font-style: italic;
    font-size: 13px; letter-spacing: 0.18em; color: var(--warmth);
    margin-bottom: 14px;
  }
  .bg-h2 {
    font-family: 'Fraunces', serif; font-weight: 800;
    font-size: clamp(32px, 5vw, 56px); letter-spacing: -0.01em;
    line-height: 1.05; margin: 0 0 18px; color: var(--bark);
  }
  .bg-section-sub {
    font-family: 'Fraunces', serif; font-size: 17px; line-height: 1.65;
    max-width: 580px; color: rgba(43,16,4,0.78); margin: 0;
  }

  .bg-rings-section { padding: 100px 0; position: relative; z-index: 2; background: var(--sap); }
  .bg-ring-list { max-width: 1100px; margin: 0 auto; padding: 0 48px; }
  .bg-ring {
    display: grid; grid-template-columns: 200px 1fr;
    gap: 36px; padding: 28px 0;
    border-top: 1px solid rgba(43,16,4,0.18);
    opacity: 0; transform: translateY(20px);
    transition: opacity 700ms ease, transform 700ms ease, padding 220ms ease, background 220ms ease;
    outline: none;
  }
  .bg-ring.in { opacity: 1; transform: translateY(0); }
  .bg-ring:last-child { border-bottom: 1px solid rgba(43,16,4,0.18); }
  .bg-ring:hover, .bg-ring:focus-within {
    background: rgba(43,16,4,0.04);
    padding-left: 12px;
  }
  .bg-ring-side {
    display: flex; flex-direction: column; gap: 8px;
    padding-top: 6px;
  }
  .bg-ring-year {
    font-family: 'Fraunces', serif; font-weight: 800;
    font-size: 44px; line-height: 1; color: var(--bark);
    letter-spacing: -0.02em;
  }
  .bg-ring-label {
    font-family: 'Fraunces', serif; font-style: italic;
    font-size: 14px; color: var(--warmth);
  }
  .bg-ring-bar {
    display: block; width: 80px; height: 3px;
    background: linear-gradient(90deg, var(--bark), var(--warmth));
    transition: width 380ms ease;
  }
  .bg-ring.open .bg-ring-bar { width: 140px; }
  .bg-ring-text { max-width: 60ch; padding-top: 6px; }
  .bg-ring-title {
    font-family: 'Fraunces', serif; font-weight: 800;
    font-size: 26px; line-height: 1.2; margin: 0 0 12px;
    color: var(--bark);
  }
  .bg-ring-body {
    font-family: 'Fraunces', serif; font-size: 16px; line-height: 1.7;
    color: rgba(43,16,4,0.82); margin: 0 0 14px;
  }
  .bg-ring-species {
    font-family: 'Fraunces', serif; font-style: italic;
    font-size: 13px; color: var(--warmth); letter-spacing: 0.04em;
  }

  .bg-species-section { padding: 100px 0; background: linear-gradient(180deg, var(--sap), #D6C492); position: relative; z-index: 2; }
  .bg-species-grid {
    max-width: 1100px; margin: 0 auto; padding: 0 48px;
    display: grid; grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 22px;
  }
  .bg-species-card {
    background: var(--cream);
    border: 1px solid rgba(43,16,4,0.18);
    padding: 18px;
    transition: transform 200ms ease, border-color 200ms ease;
  }
  .bg-species-card:hover, .bg-species-card:focus-within {
    transform: translateY(-3px); border-color: var(--bark);
  }
  .bg-species-swatch {
    width: 100%; aspect-ratio: 1;
    background: var(--sp);
    margin-bottom: 14px;
  }
  .bg-species-name {
    font-family: 'Fraunces', serif; font-weight: 800;
    font-size: 18px; color: var(--bark); margin-bottom: 2px;
  }
  .bg-species-latin {
    font-family: 'Fraunces', serif; font-style: italic;
    font-size: 13px; color: var(--warmth); margin-bottom: 10px;
  }
  .bg-species-note {
    font-family: 'Fraunces', serif; font-size: 13px; line-height: 1.55;
    color: rgba(43,16,4,0.78); margin: 0;
  }

  .bg-joinery-section { padding: 100px 0; position: relative; z-index: 2; background: var(--sap); }
  .bg-joinery-list {
    max-width: 1100px; margin: 0 auto; padding: 0 48px;
    display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 22px;
  }
  .bg-joinery {
    background: rgba(43,16,4,0.05);
    border-left: 4px solid var(--bark);
    padding: 22px 24px;
    transition: transform 200ms ease, background 200ms ease;
  }
  .bg-joinery:hover, .bg-joinery:focus-within {
    background: rgba(43,16,4,0.1); transform: translateX(4px);
  }
  .bg-joinery-name {
    font-family: 'Fraunces', serif; font-weight: 800; font-size: 22px;
    color: var(--bark); margin-bottom: 4px;
  }
  .bg-joinery-spec {
    font-family: 'Fraunces', serif; font-style: italic;
    font-size: 13px; color: var(--warmth); margin-bottom: 12px;
    letter-spacing: 0.04em;
  }
  .bg-joinery-note {
    font-family: 'Fraunces', serif; font-size: 15px; line-height: 1.65;
    color: rgba(43,16,4,0.85); margin: 0;
  }

  .bg-footer {
    padding: 80px 48px 48px;
    background: linear-gradient(180deg, #C9B581, #B59E68);
    border-top: 1px solid rgba(43,16,4,0.25);
    position: relative; z-index: 2;
  }
  .bg-foot-burn {
    width: 280px; margin: 0 auto 32px;
  }
  .bg-foot-burn svg { width: 100%; height: auto; }
  .bg-foot-grid {
    max-width: 1080px; margin: 0 auto;
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 32px; text-align: center;
    font-family: 'Fraunces', serif; font-size: 15px; line-height: 1.7;
    color: var(--bark);
  }
  .bg-foot-label {
    font-style: italic; font-size: 13px; color: var(--warmth);
    margin-bottom: 8px; letter-spacing: 0.06em;
  }

  @media (max-width: 880px) {
    .bg-hero { grid-template-columns: 1fr; }
    .bg-hero-content { padding: 64px 24px; }
    .bg-rings { display: none; }
    .bg-ring { grid-template-columns: 1fr; gap: 12px; }
    .bg-joinery-list, .bg-foot-grid { grid-template-columns: 1fr; }
    .bg-section-head, .bg-ring-list, .bg-species-grid, .bg-joinery-list {
      padding-left: 24px; padding-right: 24px;
    }
  }

  @media (prefers-reduced-motion: reduce) {
    .bg-rings { animation: none; transform: translateY(-50%) scale(1); }
    .bg-ring { transition: none; opacity: 1; transform: none; }
    .bg-ring:hover, .bg-ring:focus-within { padding-left: 0; }
    .bg-ring-bar { transition: none; }
    .bg-cta:hover, .bg-cta:focus-visible { transform: none; }
    .bg-species-card:hover, .bg-joinery:hover { transform: none; }
  }
`;
