"use client";

/**
 * SawLineEngine — V30 Saw Line
 *
 * Plywood-tone ground, snapped chalk-blue line cutting across the hero,
 * pencil-tick measurements down the right margin. GT America Mono headings,
 * dimensions footnoted in inches. Carpenter-true.
 */

import { useState } from "react";

const CUT_LIST = [
  { no: "001", job: "Glenview — kitchen wall remove + reframe", dim: "12' 4\" × 8' 1\"", cut: "PT 2x6 sole, KD 2x4 plates, 2x6 hdr (king+jack)", note: "header bears on doubled 2x4 trimmer; nail schedule per IRC R602.7" },
  { no: "002", job: "Wellesley — addition floor frame", dim: "16' 0\" × 22' 0\"", cut: "2x10 #2 SPF @ 16\" o.c., 3/4\" T&G subfloor", note: "joist crown up, glued and screwed; cantilever 24\" max" },
  { no: "003", job: "Brookline — interior partition", dim: "9' 8\" × 8' 6\"", cut: "2x4 KD @ 16\" o.c., header 2-2x6", note: "rack the wall on the floor; lift it square; no toenail to the slab" },
  { no: "004", job: "Cambridge — stair stringers (3)", dim: "rise 7-3/8\" × tread 10-1/2\"", cut: "2x12 PT, mortised, no notch under the throat", note: "skirts hand-routed; risers nailed before treads" },
  { no: "005", job: "Newton — rafter set", dim: "8/12 pitch, 14' run", cut: "2x10 #1 hem-fir, ridge 2-1/2\" thick", note: "birdsmouth notched 1/3 max; metal hangers at flush beam" },
];

const JIGS = [
  { name: "Stair-stringer template", body: "1/4\" Baltic ply, brass corners. Lays out a 7-3/8 × 10-1/2 stringer in two passes." },
  { name: "Rafter birdsmouth jig", body: "Plywood with hardwood fence. Cuts the seat and the heel in one pass on the chop saw." },
  { name: "Story-pole holder", body: "Fits any 1×4. Pole rides in a track at the bench so it doesn't roll while we mark." },
  { name: "Crown-coping fixture", body: "Holds molding spring-out, lets the coping saw ride upside-down. Saves the second man." },
  { name: "Plumb-cut block", body: "45° offcut bolted to a sled. Plumb cuts at the saw, every time." },
  { name: "Scribe block — divider mount", body: "Holds dividers off a bench dog. Frees both hands for the cabinet back." },
];

const CREW = [
  { name: "Mike B.", role: "Lead — frames + finish", years: 22, line: "Crowns the joist. Does not toenail." },
  { name: "Dani G.", role: "Lead — millwork + cabinets", years: 14, line: "Story-poles every job. Hand-cuts every cope." },
  { name: "Tim R.", role: "Apprentice", years: 3, line: "Pulls the tape. Reads the tape. Calls it twice." },
  { name: "Sara P.", role: "Apprentice", years: 2, line: "Sharpens the pencils. Loads the saws. Marks the studs." },
];

export default function SawLineEngine() {
  const [hovered, setHovered] = useState<string | null>(null);

  return (
    <>
      <style>{css}</style>
      <div className="sl-shell">
        <div className="sl-grain" aria-hidden />
        <div className="sl-margin" aria-hidden>
          <div className="sl-margin-rule" />
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className={`sl-tick${i % 4 === 0 ? " sl-tick-major" : ""}`}>
              <span>{i % 4 === 0 ? `${i / 4 + 1}"` : ""}</span>
            </div>
          ))}
        </div>

        <header className="sl-nav">
          <div className="sl-mark">
            <span className="sl-mark-name">KPT &mdash; CARPENTRY</span>
            <span className="sl-mark-sub">FRAMING / FINISH / MILLWORK</span>
          </div>
          <nav aria-label="Primary">
            <a href="#cutlist">Cut List</a>
            <a href="#jig">The Jig</a>
            <a href="#crews">Crews</a>
            <a href="#contact">Spec a build</a>
          </nav>
        </header>

        <section className="sl-hero">
          <div className="sl-hero-line" aria-hidden>
            <div className="sl-hero-line-dust" aria-hidden />
            <div className="sl-hero-line-stroke" aria-hidden />
            <span className="sl-hero-line-tag">CHALK SNAP &middot; ¹⁄₁₆ TRUE</span>
          </div>

          <div className="sl-hero-meta">
            <span>SHOP NO. 014</span>
            <span>WATERTOWN, MA</span>
            <span>04 / 28 / 2026</span>
          </div>

          <h1 className="sl-hero-headline">
            Crown the joist.<br />
            Toenail it.<br />
            Rack the wall.
          </h1>

          <p className="sl-hero-sub">
            Framing and finish carpentry, dimensioned to the sixteenth — proud where you want it, shy where
            you don't. We square it on the floor and we lift it true.
          </p>

          <div className="sl-hero-ctas">
            <a className="sl-cta sl-cta-primary" href="#cutlist">Spec a build &rarr;</a>
            <a className="sl-cta sl-cta-ghost" href="#jig">See the cut list</a>
          </div>

          <div className="sl-hero-foot">
            <div className="sl-hero-foot-row">
              <span>SECTION</span>
              <span>R602 — WOOD WALL FRAMING</span>
            </div>
            <div className="sl-hero-foot-row">
              <span>FOOTNOTE</span>
              <span>Dimensions in inches. Tolerance: ¹⁄₁₆".</span>
            </div>
          </div>
        </section>

        <section id="cutlist" className="sl-section">
          <div className="sl-section-head">
            <div className="sl-section-num">01</div>
            <div>
              <h2>Cut List</h2>
              <p>Past jobs as cut-list rows. Hover a measurement and a tick mark extends to its dimension.</p>
            </div>
          </div>

          <div className="sl-table">
            <div className="sl-table-head">
              <span>NO.</span>
              <span>JOB</span>
              <span>DIM</span>
              <span>CUT</span>
            </div>
            {CUT_LIST.map((row) => (
              <div
                key={row.no}
                className={`sl-row${hovered === row.no ? " sl-row-on" : ""}`}
                onMouseEnter={() => setHovered(row.no)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(row.no)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
                aria-label={`Cut list ${row.no}: ${row.job} — ${row.dim}`}
              >
                <span className="sl-row-no">{row.no}</span>
                <span className="sl-row-job">
                  <span>{row.job}</span>
                  <span className="sl-row-note">{row.note}</span>
                </span>
                <span className="sl-row-dim">
                  <span className="sl-tick-extend" aria-hidden />
                  {row.dim}
                </span>
                <span className="sl-row-cut">{row.cut}</span>
              </div>
            ))}
          </div>

          <div className="sl-table-foot">
            <span>FOOTNOTE: dimensions field-verified. Lumber stock per shop ledger 04-2026.</span>
            <span>* tolerance ¹⁄₁₆"</span>
          </div>
        </section>

        <section id="jig" className="sl-section sl-section-alt">
          <div className="sl-section-head">
            <div className="sl-section-num">02</div>
            <div>
              <h2>The Jig</h2>
              <p>Repeatable shop patterns. Hover a card — the kerf line extends.</p>
            </div>
          </div>

          <div className="sl-jigs">
            {JIGS.map((j, i) => (
              <article
                key={j.name}
                className="sl-jig"
                onMouseEnter={() => setHovered(`jig-${i}`)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(`jig-${i}`)}
                onBlur={() => setHovered(null)}
                tabIndex={0}
              >
                <div className={`sl-jig-kerf${hovered === `jig-${i}` ? " sl-jig-kerf-on" : ""}`} aria-hidden />
                <div className="sl-jig-num">JIG &middot; {String(i + 1).padStart(2, "0")}</div>
                <h3>{j.name}</h3>
                <p>{j.body}</p>
                <div className="sl-jig-foot">
                  <span>SHOP-MADE</span>
                  <span>BALTIC BIRCH</span>
                  <span>2024</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="crews" className="sl-section">
          <div className="sl-section-head">
            <div className="sl-section-num">03</div>
            <div>
              <h2>Crews</h2>
              <p>Story-pole credentials. Years on the wall, not in the office.</p>
            </div>
          </div>

          <div className="sl-crews">
            {CREW.map((c) => (
              <article key={c.name} className="sl-crew">
                <div className="sl-crew-bag" aria-hidden>
                  <svg viewBox="0 0 80 100" width="100%" height="100%">
                    <path d="M20 18 L60 18 L66 32 L72 90 L8 90 L14 32 Z" fill="#7A5A30" stroke="#2A2A2A" strokeWidth="1.4" />
                    <rect x="22" y="32" width="36" height="14" fill="#2A2A2A" opacity="0.18" />
                    <line x1="20" y1="18" x2="60" y2="18" stroke="#2A2A2A" strokeWidth="2" />
                    <circle cx="30" cy="62" r="3" fill="#325E80" />
                    <circle cx="50" cy="62" r="3" fill="#B14B2A" />
                    <line x1="14" y1="76" x2="66" y2="76" stroke="#2A2A2A" strokeWidth="0.8" strokeDasharray="3 3" />
                  </svg>
                </div>
                <div className="sl-crew-meta">
                  <h3>{c.name}</h3>
                  <div className="sl-crew-role">{c.role}</div>
                  <div className="sl-crew-years">YRS &middot; {String(c.years).padStart(2, "0")}</div>
                  <p>{c.line}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="sl-cta-band">
          <div className="sl-cta-band-line" aria-hidden />
          <div className="sl-cta-band-inner">
            <div>
              <h3>Got a wall? We'll bring the level.</h3>
              <p>Spec a build. We'll walk it, story-pole it, and send a cut list before we lift a saw.</p>
            </div>
            <a className="sl-cta sl-cta-primary" href="mailto:shop@kptcarpentry.com">Spec a build &rarr;</a>
          </div>
        </section>

        <footer className="sl-footer">
          <div className="sl-footer-cols">
            <div>
              <div className="sl-footer-mark">KPT — CARPENTRY</div>
              <div className="sl-footer-tag">SHOP NO. 014 &middot; SAW LINE TRUE</div>
            </div>
            <div className="sl-footer-stencil">
              <span>WATERTOWN, MA</span>
              <span>(617) 555-0144</span>
              <span>shop@kptcarpentry.com</span>
            </div>
            <div className="sl-footer-pencil">
              <span>BY HAND, BY MIKE B.</span>
              <span>04 / 28 / 2026</span>
            </div>
          </div>
          <div className="sl-footer-line" aria-hidden />
          <div className="sl-footer-tiny">
            CSL-091873 &middot; insured &middot; AWI member &middot; dimensions ± ¹⁄₁₆".
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap');

  .sl-shell {
    --ply: #D9C9A6;
    --ply-deep: #C9B98E;
    --chalk: #325E80;
    --chalk-light: #4F82AC;
    --lead: #2A2A2A;
    --lead-soft: #4A4A4A;
    --pencil: #1A1A1A;
    --kraft: #B6A074;
    font-family: 'JetBrains Mono', 'GT America Mono', ui-monospace, SF Mono, Consolas, monospace;
    color: var(--lead);
    background: var(--ply);
    position: relative;
    overflow-x: hidden;
  }
  .sl-shell h1, .sl-shell h2, .sl-shell h3 {
    font-family: 'JetBrains Mono', 'GT America Mono', ui-monospace, monospace;
    font-weight: 700;
  }

  /* Plywood grain */
  .sl-grain {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      repeating-linear-gradient(
        90deg,
        transparent 0 4px,
        rgba(120,90,40,0.04) 4px 5px,
        transparent 5px 12px,
        rgba(140,100,50,0.06) 12px 13px,
        transparent 13px 24px,
        rgba(110,80,40,0.05) 24px 25px,
        transparent 25px 40px
      ),
      repeating-linear-gradient(
        178deg,
        transparent 0 80px,
        rgba(120,90,40,0.06) 80px 82px,
        transparent 82px 240px
      );
    z-index: 1;
  }
  .sl-shell > *:not(.sl-grain):not(.sl-margin) { position: relative; z-index: 3; }

  /* Right margin tick rule */
  .sl-margin {
    position: absolute; top: 96px; right: 24px; bottom: 0; width: 56px;
    z-index: 2; pointer-events: none;
    display: flex; flex-direction: column; gap: 0;
  }
  .sl-margin-rule {
    position: absolute; right: 14px; top: 0; bottom: 0; width: 1px; background: var(--lead);
    opacity: 0.55;
  }
  .sl-tick {
    position: relative; height: 64px; width: 100%;
    display: flex; align-items: flex-start; justify-content: flex-end;
  }
  .sl-tick::after {
    content: ""; position: absolute; right: 14px; top: 0; height: 1px; width: 6px; background: var(--lead); opacity: 0.6;
  }
  .sl-tick-major::after { width: 16px; opacity: 0.85; }
  .sl-tick span { font-size: 9px; padding-right: 36px; padding-top: 0; color: var(--lead-soft); letter-spacing: 0.05em; }

  /* NAV */
  .sl-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 22px 56px 18px 56px;
    border-bottom: 1.5px solid var(--lead);
    margin-right: 80px;
  }
  .sl-mark { display: flex; flex-direction: column; }
  .sl-mark-name { font-size: 16px; letter-spacing: 0.08em; font-weight: 700; }
  .sl-mark-sub { font-size: 11px; letter-spacing: 0.18em; color: var(--lead-soft); }
  .sl-nav nav { display: flex; gap: 24px; }
  .sl-nav nav a {
    color: var(--lead); text-decoration: none; font-size: 13px;
    letter-spacing: 0.08em; padding-bottom: 2px; border-bottom: 1.5px solid transparent;
    transition: border-color 200ms, color 200ms;
  }
  .sl-nav nav a:hover, .sl-nav nav a:focus-visible { color: var(--chalk); border-bottom-color: var(--chalk); outline: none; }

  /* HERO */
  .sl-hero {
    padding: 56px 56px 88px 56px;
    margin-right: 80px;
    position: relative;
  }
  .sl-hero-line {
    position: relative; height: 32px; margin-bottom: 28px;
  }
  .sl-hero-line-stroke {
    position: absolute; left: 0; top: 16px; right: 0; height: 3px;
    background: var(--chalk);
    box-shadow: 0 1px 0 0 rgba(50,94,128,0.35);
    animation: sl-snap 1500ms cubic-bezier(0.18,0.85,0.34,1) 200ms 1 backwards;
    transform-origin: left center;
  }
  .sl-hero-line-dust {
    position: absolute; left: 0; right: 0; top: 6px; height: 22px; pointer-events: none;
    background:
      radial-gradient(circle at 12% 50%, rgba(50,94,128,0.18) 0 2px, transparent 3px),
      radial-gradient(circle at 26% 30%, rgba(50,94,128,0.15) 0 1.5px, transparent 2px),
      radial-gradient(circle at 42% 70%, rgba(50,94,128,0.16) 0 1.5px, transparent 2px),
      radial-gradient(circle at 60% 40%, rgba(50,94,128,0.15) 0 1.5px, transparent 2px),
      radial-gradient(circle at 78% 60%, rgba(50,94,128,0.16) 0 1.5px, transparent 2px),
      radial-gradient(circle at 92% 30%, rgba(50,94,128,0.15) 0 1.5px, transparent 2px);
    opacity: 0; animation: sl-dust 2000ms ease-out 1100ms 1 forwards;
  }
  .sl-hero-line-tag {
    position: absolute; right: 0; top: -22px;
    font-size: 11px; letter-spacing: 0.16em; color: var(--chalk);
  }
  @keyframes sl-snap { 0% { transform: scaleX(0); } 100% { transform: scaleX(1); } }
  @keyframes sl-dust { 0% { opacity: 0; transform: translateY(-2px); } 30% { opacity: 0.85; } 100% { opacity: 0; transform: translateY(2px); } }

  .sl-hero-meta {
    display: flex; gap: 28px; font-size: 11px; letter-spacing: 0.16em; color: var(--lead-soft); margin-bottom: 22px;
  }
  .sl-hero-headline {
    font-size: clamp(48px, 7vw, 96px); line-height: 0.96; margin: 0 0 22px;
    letter-spacing: -0.02em;
    text-transform: uppercase;
  }
  .sl-hero-sub {
    font-family: 'Inter', system-ui, sans-serif;
    font-size: 18px; line-height: 1.55; max-width: 620px; color: var(--lead);
    margin-bottom: 28px;
  }
  .sl-hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; margin-bottom: 36px; }
  .sl-hero-foot { border-top: 1px dashed rgba(42,42,42,0.5); padding-top: 16px; max-width: 700px; }
  .sl-hero-foot-row { display: grid; grid-template-columns: 96px 1fr; gap: 20px; font-size: 12px; line-height: 1.6; color: var(--lead-soft); letter-spacing: 0.06em; }

  /* CTAs */
  .sl-cta {
    display: inline-block; padding: 14px 22px; font-size: 13px;
    text-decoration: none; letter-spacing: 0.14em; text-transform: uppercase;
    border: 1.5px solid; transition: background 200ms, color 200ms, transform 200ms;
  }
  .sl-cta-primary { background: var(--lead); color: var(--ply); border-color: var(--lead); }
  .sl-cta-primary:hover, .sl-cta-primary:focus-visible { background: var(--chalk); border-color: var(--chalk); outline: none; transform: translateY(-1px); }
  .sl-cta-ghost { background: transparent; color: var(--lead); border-color: var(--lead); }
  .sl-cta-ghost:hover, .sl-cta-ghost:focus-visible { background: var(--lead); color: var(--ply); outline: none; }

  /* SECTIONS */
  .sl-section { padding: 56px 56px 72px 56px; margin-right: 80px; border-top: 1.5px solid var(--lead); }
  .sl-section-alt { background: var(--ply-deep); }
  .sl-section-head { display: grid; grid-template-columns: 70px 1fr; gap: 20px; align-items: start; margin-bottom: 32px; }
  .sl-section-num { font-size: 40px; font-weight: 700; color: var(--chalk); line-height: 1; }
  .sl-section-head h2 { font-size: 30px; margin: 0 0 6px; letter-spacing: -0.01em; text-transform: uppercase; }
  .sl-section-head p { font-family: 'Inter', sans-serif; font-size: 15px; color: var(--lead-soft); margin: 0; max-width: 620px; }

  /* CUT LIST TABLE */
  .sl-table { border-top: 1.5px solid var(--lead); border-bottom: 1.5px solid var(--lead); }
  .sl-table-head, .sl-row {
    display: grid; grid-template-columns: 70px 1.5fr 1fr 1.4fr; gap: 16px;
    padding: 12px 16px; align-items: start;
  }
  .sl-table-head {
    font-size: 11px; letter-spacing: 0.18em; color: var(--lead-soft);
    border-bottom: 1px solid var(--lead);
  }
  .sl-row {
    font-size: 13px; line-height: 1.5;
    border-bottom: 1px dashed rgba(42,42,42,0.3);
    cursor: default;
    transition: background 200ms;
    outline: none;
    position: relative;
  }
  .sl-row:last-child { border-bottom: 0; }
  .sl-row:hover, .sl-row:focus-visible { background: rgba(50,94,128,0.08); }
  .sl-row-on { background: rgba(50,94,128,0.1); }
  .sl-row-no { font-weight: 700; color: var(--chalk); letter-spacing: 0.08em; }
  .sl-row-job { display: flex; flex-direction: column; gap: 4px; }
  .sl-row-note { font-family: 'Inter', sans-serif; font-size: 12px; color: var(--lead-soft); font-style: italic; }
  .sl-row-dim { position: relative; font-weight: 500; color: var(--pencil); }
  .sl-tick-extend {
    position: absolute; right: -28px; top: 8px; height: 1px; width: 0;
    background: var(--chalk);
    transition: width 280ms ease;
  }
  .sl-row-on .sl-tick-extend, .sl-row:hover .sl-tick-extend, .sl-row:focus-visible .sl-tick-extend { width: 24px; }
  .sl-row-cut { font-family: 'Inter', sans-serif; font-size: 13px; color: var(--lead); }
  .sl-table-foot { display: flex; justify-content: space-between; padding: 12px 16px 0; font-size: 11px; color: var(--lead-soft); letter-spacing: 0.06em; flex-wrap: wrap; gap: 8px; }

  /* JIG GRID */
  .sl-jigs { display: grid; grid-template-columns: repeat(3, 1fr); gap: 16px; }
  .sl-jig {
    background: rgba(255,250,235,0.45);
    border: 1.5px solid var(--lead);
    padding: 22px 22px 18px;
    position: relative;
    transition: background 200ms;
    outline: none;
  }
  .sl-jig:focus-visible { background: rgba(255,250,235,0.85); box-shadow: 0 0 0 2px var(--chalk); }
  .sl-jig-kerf {
    position: absolute; top: 0; left: 0; height: 3px; width: 0;
    background: var(--chalk);
    transition: width 320ms ease;
  }
  .sl-jig-kerf-on, .sl-jig:hover .sl-jig-kerf, .sl-jig:focus-visible .sl-jig-kerf { width: 100%; }
  .sl-jig-num { font-size: 11px; letter-spacing: 0.18em; color: var(--chalk); margin-bottom: 8px; }
  .sl-jig h3 { font-size: 18px; margin: 0 0 10px; letter-spacing: -0.01em; }
  .sl-jig p { font-family: 'Inter', sans-serif; font-size: 14px; line-height: 1.55; color: var(--lead); margin: 0 0 14px; }
  .sl-jig-foot { display: flex; gap: 10px; font-size: 10px; letter-spacing: 0.16em; color: var(--lead-soft); flex-wrap: wrap; }

  /* CREWS */
  .sl-crews { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
  .sl-crew {
    background: rgba(255,250,235,0.4);
    border: 1.5px solid var(--lead);
    padding: 18px;
    display: grid; grid-template-columns: 64px 1fr; gap: 14px;
  }
  .sl-crew-bag { width: 64px; height: 80px; }
  .sl-crew-meta { display: flex; flex-direction: column; gap: 2px; }
  .sl-crew h3 { font-size: 16px; margin: 0; letter-spacing: -0.01em; }
  .sl-crew-role { font-family: 'Inter', sans-serif; font-size: 12px; color: var(--lead-soft); }
  .sl-crew-years { font-size: 10px; color: var(--chalk); letter-spacing: 0.16em; margin-top: 2px; }
  .sl-crew p { font-family: 'Inter', sans-serif; font-size: 12px; line-height: 1.45; color: var(--lead); margin: 6px 0 0; font-style: italic; }

  /* CTA BAND */
  .sl-cta-band { padding: 48px 56px 56px; margin-right: 80px; background: var(--lead); color: var(--ply); position: relative; }
  .sl-cta-band-line {
    position: absolute; top: 18px; left: 0; right: 0; height: 3px;
    background: var(--chalk-light);
  }
  .sl-cta-band-inner { display: grid; grid-template-columns: 1fr auto; gap: 24px; align-items: end; padding-top: 18px; }
  .sl-cta-band h3 { font-size: clamp(28px, 3.4vw, 40px); margin: 0 0 10px; letter-spacing: -0.01em; text-transform: uppercase; }
  .sl-cta-band p { font-family: 'Inter', sans-serif; font-size: 16px; color: rgba(217,201,166,0.78); margin: 0; max-width: 540px; line-height: 1.55; }
  .sl-cta-band .sl-cta-primary { background: var(--chalk); color: #FFF; border-color: var(--chalk); }
  .sl-cta-band .sl-cta-primary:hover, .sl-cta-band .sl-cta-primary:focus-visible { background: var(--chalk-light); border-color: var(--chalk-light); }

  /* FOOTER */
  .sl-footer { padding: 36px 56px 28px; margin-right: 80px; background: var(--ply); border-top: 1.5px solid var(--lead); }
  .sl-footer-cols { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 24px; padding-bottom: 22px; align-items: start; }
  .sl-footer-mark { font-size: 18px; font-weight: 700; letter-spacing: 0.06em; }
  .sl-footer-tag { font-size: 11px; letter-spacing: 0.18em; color: var(--chalk); margin-top: 4px; }
  .sl-footer-stencil { display: flex; flex-direction: column; gap: 6px; font-size: 12px; letter-spacing: 0.06em; color: var(--lead); }
  .sl-footer-pencil { display: flex; flex-direction: column; gap: 6px; font-size: 12px; color: var(--lead-soft); font-family: 'Inter', sans-serif; font-style: italic; }
  .sl-footer-line { height: 1px; background: var(--lead); margin-bottom: 10px; }
  .sl-footer-tiny { font-size: 11px; letter-spacing: 0.06em; color: var(--lead-soft); }

  @media (max-width: 980px) {
    .sl-margin { display: none; }
    .sl-nav, .sl-hero, .sl-section, .sl-cta-band, .sl-footer { margin-right: 0; padding-left: 24px; padding-right: 24px; }
    .sl-table-head, .sl-row { grid-template-columns: 1fr; gap: 4px; }
    .sl-table-head { display: none; }
    .sl-row { padding: 14px 0; }
    .sl-jigs { grid-template-columns: 1fr; }
    .sl-crews { grid-template-columns: 1fr; }
    .sl-cta-band-inner { grid-template-columns: 1fr; }
    .sl-footer-cols { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .sl-hero-line-stroke, .sl-hero-line-dust { animation: none; }
    .sl-hero-line-stroke { transform: scaleX(1); }
    .sl-tick-extend, .sl-jig-kerf, .sl-row, .sl-jig, .sl-cta, .sl-nav nav a {
      transition: none !important;
    }
  }
`;
