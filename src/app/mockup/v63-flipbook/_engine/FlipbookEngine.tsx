"use client";

/**
 * FlipbookEngine — V63 Flipbook
 *
 * Engineering-pad green graph-paper. Each section is a "page" with a
 * corner-curl on hover/focus. Pencil-margin doodles act as nav. A small
 * thaumatrope-style margin doodle animates as the visitor flips.
 * Trade showcase: carpenters (custom millwork).
 */

import { useState } from "react";

const PAGES = [
  { num: "01", title: "Sketch", caption: "Site walk Tuesday. Closet flange 17 1/4 off the corner. Ledger rim flush." },
  { num: "02", title: "Story pole", caption: "Burned roman numerals on a 1x4 — the part nobody re-measures." },
  { num: "03", title: "Mockup", caption: "Two off-cuts of poplar, joined at the show-face. Reveal the dado." },
  { num: "04", title: "Cut list", caption: "1/16 proud of the line. Crown the joist. Toenail at the hidden seam." },
  { num: "05", title: "Reveal", caption: "Scribed to the wall, returns square, no shims showing on either side." },
];

const CUT_LIST = [
  { tag: "A", part: "Stile, L", stock: "8/4 white oak", dim: '34 1/2" × 2 1/4" × 1 1/2"', note: "scribe to wall" },
  { tag: "B", part: "Stile, R", stock: "8/4 white oak", dim: '34 1/2" × 2 1/4" × 1 1/2"', note: "scribe to wall" },
  { tag: "C", part: "Top rail", stock: "8/4 white oak", dim: '38" × 3" × 1 1/2"', note: "miter, dowel x2" },
  { tag: "D", part: "Bot rail", stock: "8/4 white oak", dim: '38" × 4" × 1 1/2"', note: "miter, dowel x2" },
  { tag: "E", part: "Panel", stock: "5/8 QSWO veneer", dim: '34" × 30 1/2"', note: "1/8 reveal, float" },
  { tag: "F", part: "Backer", stock: "1/2 baltic birch", dim: '34 1/4" × 30 3/4"', note: "rabbet to fit" },
  { tag: "G", part: "Plug", stock: "8/4 white oak", dim: '3/8" Φ × 1 1/4"', note: "grain run x12" },
];

const DOODLES = [
  { id: "saw", label: "saw-horse", path: "M14 64 L40 28 L66 64 M22 64 L22 76 M58 64 L58 76 M14 64 L66 64" },
  { id: "clamp", label: "bar clamp", path: "M8 38 L72 38 L72 46 L62 46 L62 50 L18 50 L18 46 L8 46 Z M62 50 L62 60 M68 60 L56 60" },
  { id: "rule", label: "folding rule", path: "M8 28 L28 28 L28 36 L8 36 Z M28 28 L48 32 L48 40 L28 36 Z M48 32 L70 28 L70 36 L48 40 Z" },
  { id: "pencil", label: "flat pencil", path: "M10 44 L52 44 L62 48 L52 52 L10 52 Z M52 44 L52 52" },
];

export default function FlipbookEngine() {
  const [activeDoodle, setActiveDoodle] = useState<string>("saw");
  const [openPage, setOpenPage] = useState<string>("01");

  return (
    <>
      <style>{css}</style>
      <div className="fb-shell">
        <div className="fb-grid" aria-hidden />

        {/* TOP / NAV */}
        <header className="fb-top">
          <div className="fb-mark">
            <span className="fb-mark-pencil">KPT &amp; SON</span>
            <span className="fb-mark-rule">CUSTOM MILLWORK · EST 04 / 26 / 26</span>
          </div>
          <nav className="fb-nav" aria-label="Page nav">
            {DOODLES.map((d) => (
              <button
                key={d.id}
                className={`fb-doodle${activeDoodle === d.id ? " on" : ""}`}
                onMouseEnter={() => setActiveDoodle(d.id)}
                onFocus={() => setActiveDoodle(d.id)}
                aria-pressed={activeDoodle === d.id}
                aria-label={`See ${d.label}`}
              >
                <svg viewBox="0 0 80 84" aria-hidden>
                  <path d={d.path} />
                </svg>
                <span className="fb-doodle-label">{d.label}</span>
              </button>
            ))}
          </nav>
        </header>

        {/* HERO */}
        <section className="fb-hero">
          <div className="fb-page fb-page-hero">
            <span className="fb-corner" aria-hidden />
            <div className="fb-pencil-tag">PG. 01 — TITLE</div>
            <h1 className="fb-headline">
              From sketch
              <br />
              to scribed reveal,
              <br />
              <span className="fb-headline-em">page by page.</span>
            </h1>
            <p className="fb-sub">
              Custom carpentry — we draft the part on the pad, then we cut it
              on the saw, and the page after that is the one we hand over.
            </p>
            <div className="fb-cta-row">
              <a className="fb-cta fb-cta-primary" href="#build">Flip to the build</a>
              <a className="fb-cta fb-cta-secondary" href="#doodles">See the doodles</a>
            </div>
            <div className="fb-margin-doodle" aria-hidden>
              <svg viewBox="0 0 80 84">
                <path d={DOODLES.find((d) => d.id === activeDoodle)?.path ?? DOODLES[0].path} />
              </svg>
              <span className="fb-margin-arrow" aria-hidden>↻</span>
            </div>
          </div>
        </section>

        {/* PAGE BY PAGE */}
        <section id="build" className="fb-section">
          <div className="fb-section-head">
            <span className="fb-stamp">PAGE BY PAGE</span>
            <span className="fb-rule" aria-hidden />
            <span className="fb-pencil-note">flip a corner →</span>
          </div>
          <div className="fb-pages-row">
            {PAGES.map((p) => (
              <button
                key={p.num}
                className={`fb-page fb-page-card${openPage === p.num ? " open" : ""}`}
                onMouseEnter={() => setOpenPage(p.num)}
                onFocus={() => setOpenPage(p.num)}
                aria-pressed={openPage === p.num}
              >
                <span className="fb-corner" aria-hidden />
                <div className="fb-pencil-tag">PG. {p.num}</div>
                <h3 className="fb-page-title">{p.title}</h3>
                <p className="fb-page-caption">{p.caption}</p>
                <span className="fb-page-foot" aria-hidden>flip</span>
              </button>
            ))}
          </div>
        </section>

        {/* MARGIN DOODLES */}
        <section id="doodles" className="fb-section">
          <div className="fb-section-head">
            <span className="fb-stamp">MARGIN DOODLES</span>
            <span className="fb-rule" aria-hidden />
            <span className="fb-pencil-note">7am, before coffee</span>
          </div>
          <div className="fb-doodle-grid">
            {DOODLES.map((d) => (
              <figure
                key={d.id}
                className={`fb-doodle-card${activeDoodle === d.id ? " on" : ""}`}
                onMouseEnter={() => setActiveDoodle(d.id)}
                onFocus={() => setActiveDoodle(d.id)}
                tabIndex={0}
              >
                <svg viewBox="0 0 80 84" aria-hidden>
                  <path d={d.path} />
                </svg>
                <figcaption>{d.label}</figcaption>
              </figure>
            ))}
          </div>
          <p className="fb-doodle-aside">
            The doodle is the warm-up. Two minutes of pencil, then the real
            drawing starts. Hover one — it loops the way we drew it.
          </p>
        </section>

        {/* CUT LIST */}
        <section id="cutlist" className="fb-section">
          <div className="fb-section-head">
            <span className="fb-stamp">THE CUT LIST</span>
            <span className="fb-rule" aria-hidden />
            <span className="fb-pencil-note">poplar &amp; QSWO</span>
          </div>
          <div className="fb-page fb-page-cutlist">
            <span className="fb-corner" aria-hidden />
            <div className="fb-cut-head">
              <span>TAG</span>
              <span>PART</span>
              <span>STOCK</span>
              <span>DIMENSION</span>
              <span>NOTE</span>
            </div>
            {CUT_LIST.map((c) => (
              <div key={c.tag} className="fb-cut-row" tabIndex={0}>
                <span className="fb-cut-tag">{c.tag}</span>
                <span>{c.part}</span>
                <span>{c.stock}</span>
                <span className="fb-cut-dim">{c.dim}</span>
                <span className="fb-cut-note">— {c.note}</span>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="fb-section fb-section-cta">
          <div className="fb-page fb-page-cta">
            <span className="fb-corner" aria-hidden />
            <div className="fb-pencil-tag">PG. 47 — HAND-OFF</div>
            <h2 className="fb-cta-headline">
              The page after the cut <br />
              is the one we hand over.
            </h2>
            <p className="fb-cta-body">
              Built-ins, paneled rooms, and freestanding casework. Drawn by
              hand, cut on the saw, scribed to your wall. We&rsquo;ll bring
              the pad to the walk-through.
            </p>
            <div className="fb-cta-row">
              <a className="fb-cta fb-cta-primary" href="#">Book a walk-through</a>
              <a className="fb-cta fb-cta-secondary" href="#">See last commission</a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="fb-footer">
          <span className="fb-footer-stamp">SHOP — PG. 47</span>
          <span>112 SAWHORSE LN · ZONE 6A · 04 / 26 / 26</span>
          <span>WARRANTY: TWO-YEAR ON JOINTS, LIFETIME ON THE FINISH</span>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Caveat:wght@400;600&family=Inter:wght@400;500;700&family=JetBrains+Mono:wght@400;700&display=swap');

.fb-shell {
  min-height: 100vh;
  background: #C2D6B6;
  background-image: linear-gradient(180deg, #C8DABE 0%, #BBD0AD 100%);
  padding: 28px 24px 64px;
  color: #2C2C2A;
  font-family: 'Inter', system-ui, sans-serif;
  position: relative;
  overflow-x: hidden;
}
.fb-grid {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image:
    linear-gradient(rgba(44, 44, 42, 0.10) 1px, transparent 1px),
    linear-gradient(90deg, rgba(44, 44, 42, 0.10) 1px, transparent 1px),
    linear-gradient(rgba(178, 42, 42, 0.06) 1px, transparent 1px);
  background-size: 24px 24px, 24px 24px, 120px 100%;
}
.fb-shell > * { position: relative; z-index: 1; }

.fb-top {
  display: grid;
  grid-template-columns: auto 1fr;
  align-items: end;
  gap: 24px;
  padding: 8px 4px 18px;
  border-bottom: 2px solid #B22A2A;
  margin-bottom: 36px;
}
.fb-mark { font-family: 'Caveat', cursive; line-height: 1; }
.fb-mark-pencil {
  display: block;
  font-size: 38px;
  color: #2C2C2A;
  letter-spacing: 0.01em;
  text-shadow: 0 0 1px rgba(44, 44, 42, 0.5);
}
.fb-mark-rule {
  display: block;
  margin-top: 4px;
  font-family: 'Special Elite', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: #525252;
}

.fb-nav {
  display: flex;
  justify-content: flex-end;
  gap: 18px;
  flex-wrap: wrap;
}
.fb-doodle {
  background: transparent;
  border: 1.5px solid transparent;
  padding: 8px 10px;
  font-family: 'Caveat', cursive;
  color: #2C2C2A;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
}
.fb-doodle svg {
  width: 60px;
  height: 60px;
  fill: none;
  stroke: #2C2C2A;
  stroke-width: 1.6;
  stroke-linejoin: round;
  stroke-linecap: round;
}
.fb-doodle-label {
  font-size: 16px;
  letter-spacing: 0.02em;
  color: #525252;
}
.fb-doodle:hover, .fb-doodle:focus-visible, .fb-doodle.on {
  outline: none;
  background: rgba(255, 255, 255, 0.4);
  border-color: #B22A2A;
  transform: rotate(-2deg);
}
.fb-doodle:hover svg, .fb-doodle:focus-visible svg, .fb-doodle.on svg {
  stroke: #B22A2A;
  animation: fb-trace 1.1s ease-in-out infinite alternate;
}
@keyframes fb-trace {
  0% { stroke-dasharray: 4 8; stroke-dashoffset: 0; }
  100% { stroke-dasharray: 4 8; stroke-dashoffset: 18; }
}
@media (prefers-reduced-motion: reduce) {
  .fb-doodle, .fb-doodle:hover, .fb-doodle.on { transition: none; transform: none; }
  .fb-doodle:hover svg, .fb-doodle.on svg { animation: none; }
}

.fb-hero { padding: 18px 0 48px; }
.fb-page {
  position: relative;
  background: #FBFBF1;
  border: 1px solid rgba(44, 44, 42, 0.4);
  padding: 42px 44px 52px;
  background-image:
    linear-gradient(rgba(44, 44, 42, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(44, 44, 42, 0.08) 1px, transparent 1px);
  background-size: 24px 24px;
  box-shadow: 4px 6px 0 rgba(44, 44, 42, 0.18);
  transition: transform 320ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 320ms ease;
}
.fb-page::before {
  content: '';
  position: absolute;
  left: 60px;
  top: 0;
  bottom: 0;
  width: 1.5px;
  background: rgba(178, 42, 42, 0.65);
}
.fb-page-hero { max-width: 980px; margin: 0 auto; }
.fb-corner {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 0 38px 38px;
  border-color: transparent transparent rgba(44, 44, 42, 0.18) transparent;
  transition: border-width 280ms cubic-bezier(0.4, 0, 0.2, 1), border-color 280ms ease;
}
.fb-page:hover, .fb-page:focus-visible {
  outline: none;
  transform: translate(-2px, -3px) rotate(-0.4deg);
  box-shadow: 7px 10px 0 rgba(44, 44, 42, 0.22);
}
.fb-page:hover .fb-corner, .fb-page:focus-visible .fb-corner {
  border-width: 0 0 70px 70px;
  border-color: transparent transparent rgba(178, 42, 42, 0.45) transparent;
}
@media (prefers-reduced-motion: reduce) {
  .fb-page, .fb-corner { transition: none; }
  .fb-page:hover, .fb-page:focus-visible { transform: none; }
}

.fb-pencil-tag {
  font-family: 'Special Elite', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: #B22A2A;
  margin-bottom: 18px;
  padding-left: 80px;
}

.fb-headline {
  font-family: 'Caveat', cursive;
  font-weight: 600;
  font-size: clamp(48px, 8vw, 112px);
  line-height: 0.96;
  margin: 0 0 22px;
  color: #2C2C2A;
  padding-left: 80px;
}
.fb-headline-em { color: #B22A2A; }

.fb-sub {
  font-family: 'Inter', sans-serif;
  font-size: 19px;
  line-height: 1.5;
  color: #2C2C2A;
  max-width: 560px;
  margin: 0 0 28px;
  padding-left: 80px;
}

.fb-cta-row {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  padding-left: 80px;
}
.fb-cta {
  font-family: 'Special Elite', monospace;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  padding: 13px 22px;
  text-decoration: none;
  border: 1.5px solid #2C2C2A;
  transition: transform 200ms ease, background 200ms ease, color 200ms ease;
}
.fb-cta-primary { background: #2C2C2A; color: #FBFBF1; }
.fb-cta-primary:hover, .fb-cta-primary:focus-visible {
  outline: none;
  background: #B22A2A; border-color: #B22A2A; color: #FBFBF1;
  transform: translate(-1px, -1px);
}
.fb-cta-secondary { background: transparent; color: #2C2C2A; }
.fb-cta-secondary:hover, .fb-cta-secondary:focus-visible {
  outline: none;
  background: rgba(44, 44, 42, 0.08);
  transform: translate(-1px, -1px);
}
@media (prefers-reduced-motion: reduce) { .fb-cta { transition: none; } }

.fb-margin-doodle {
  position: absolute;
  right: 36px;
  top: 38px;
  width: 110px;
  height: 110px;
  display: grid;
  place-items: center;
  border-left: 1px dashed rgba(44, 44, 42, 0.35);
  padding-left: 14px;
}
.fb-margin-doodle svg {
  width: 84px;
  height: 84px;
  fill: none;
  stroke: #2C2C2A;
  stroke-width: 1.6;
  stroke-linejoin: round;
  stroke-linecap: round;
  animation: fb-thauma 1.6s ease-in-out infinite alternate;
}
.fb-margin-arrow {
  position: absolute;
  right: 6px;
  bottom: -2px;
  font-family: 'Special Elite', monospace;
  font-size: 14px;
  color: #B22A2A;
}
@keyframes fb-thauma {
  0% { transform: translateX(-2px) rotate(-2deg); }
  100% { transform: translateX(2px) rotate(2deg); }
}
@media (prefers-reduced-motion: reduce) {
  .fb-margin-doodle svg { animation: none; }
}

.fb-section {
  padding: 36px 0 56px;
  position: relative;
}
.fb-section-head {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 26px;
  flex-wrap: wrap;
}
.fb-stamp {
  font-family: 'Special Elite', monospace;
  font-size: 12px;
  letter-spacing: 0.22em;
  border: 1.5px solid #2C2C2A;
  padding: 7px 12px;
  background: #FBFBF1;
  transform: rotate(-1.5deg);
}
.fb-rule {
  flex: 1;
  height: 1px;
  background: repeating-linear-gradient(90deg, #B22A2A 0px, #B22A2A 6px, transparent 6px, transparent 12px);
}
.fb-pencil-note {
  font-family: 'Caveat', cursive;
  font-size: 22px;
  color: #525252;
}

.fb-pages-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 22px;
}
.fb-page-card {
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: inherit;
  padding: 28px 28px 36px;
}
.fb-page-card .fb-pencil-tag { padding-left: 52px; }
.fb-page-card .fb-page-title {
  font-family: 'Caveat', cursive;
  font-weight: 600;
  font-size: 36px;
  margin: 0 0 8px;
  padding-left: 52px;
  color: #2C2C2A;
  line-height: 1;
}
.fb-page-card .fb-page-caption {
  font-family: 'Inter', sans-serif;
  font-size: 15px;
  line-height: 1.5;
  color: #2C2C2A;
  margin: 0 0 16px;
  padding-left: 52px;
}
.fb-page-card .fb-page-foot {
  position: absolute;
  right: 18px;
  bottom: 12px;
  font-family: 'Special Elite', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: #B22A2A;
}
.fb-page-card.open {
  transform: translate(-2px, -3px) rotate(-0.4deg);
  box-shadow: 7px 10px 0 rgba(44, 44, 42, 0.22);
}
.fb-page-card.open .fb-corner {
  border-width: 0 0 70px 70px;
  border-color: transparent transparent rgba(178, 42, 42, 0.45) transparent;
}
.fb-page-card::before { left: 36px; }

.fb-doodle-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 16px;
  margin-bottom: 16px;
}
.fb-doodle-card {
  background: #FBFBF1;
  border: 1px solid rgba(44, 44, 42, 0.3);
  padding: 22px 22px 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  outline: none;
  transition: transform 240ms ease, border-color 240ms ease;
}
.fb-doodle-card svg {
  width: 110px;
  height: 110px;
  fill: none;
  stroke: #2C2C2A;
  stroke-width: 1.5;
  stroke-linejoin: round;
  stroke-linecap: round;
}
.fb-doodle-card figcaption {
  font-family: 'Caveat', cursive;
  font-size: 22px;
  color: #2C2C2A;
}
.fb-doodle-card:hover, .fb-doodle-card:focus-visible, .fb-doodle-card.on {
  border-color: #B22A2A;
  transform: rotate(-1deg) translateY(-2px);
}
.fb-doodle-card:hover svg, .fb-doodle-card:focus-visible svg, .fb-doodle-card.on svg {
  stroke: #B22A2A;
  animation: fb-trace 1.1s ease-in-out infinite alternate;
}
@media (prefers-reduced-motion: reduce) {
  .fb-doodle-card { transition: none; }
  .fb-doodle-card:hover, .fb-doodle-card.on { transform: none; }
  .fb-doodle-card svg { animation: none; }
}
.fb-doodle-aside {
  font-family: 'Caveat', cursive;
  font-size: 22px;
  color: #525252;
  margin: 14px 0 0;
}

.fb-page-cutlist { padding: 32px 32px 36px; }
.fb-cut-head, .fb-cut-row {
  display: grid;
  grid-template-columns: 50px 1.4fr 1.4fr 1.6fr 2fr;
  gap: 12px;
  font-family: 'JetBrains Mono', 'Special Elite', monospace;
  font-size: 13px;
  letter-spacing: 0.04em;
  padding: 10px 0;
  border-bottom: 1px solid rgba(44, 44, 42, 0.2);
}
.fb-cut-head {
  color: #B22A2A;
  letter-spacing: 0.18em;
  font-size: 11px;
  font-weight: 700;
  border-bottom: 1.5px solid rgba(44, 44, 42, 0.5);
  padding-bottom: 8px;
}
.fb-cut-row { color: #2C2C2A; transition: background 180ms ease; outline: none; }
.fb-cut-row:hover, .fb-cut-row:focus-visible { background: rgba(178, 42, 42, 0.08); }
.fb-cut-tag {
  font-weight: 700;
  background: #2C2C2A;
  color: #FBFBF1;
  display: inline-block;
  width: 26px;
  text-align: center;
  padding: 2px 0;
}
.fb-cut-dim { color: #2C2C2A; }
.fb-cut-note { color: #525252; font-style: italic; }

.fb-section-cta { padding-bottom: 80px; }
.fb-page-cta { max-width: 880px; margin: 0 auto; padding: 56px 56px 64px; }
.fb-cta-headline {
  font-family: 'Caveat', cursive;
  font-weight: 600;
  font-size: clamp(40px, 5.5vw, 72px);
  margin: 0 0 18px;
  color: #2C2C2A;
  line-height: 1;
  padding-left: 80px;
}
.fb-cta-body {
  font-family: 'Inter', sans-serif;
  font-size: 18px;
  line-height: 1.55;
  color: #2C2C2A;
  max-width: 560px;
  margin: 0 0 28px;
  padding-left: 80px;
}

.fb-footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  border-top: 2px solid #B22A2A;
  padding: 18px 4px 4px;
  font-family: 'Special Elite', monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: #525252;
}
.fb-footer-stamp {
  border: 1.5px solid #2C2C2A;
  color: #2C2C2A;
  padding: 5px 10px;
  transform: rotate(-1deg);
  display: inline-block;
}

@media (max-width: 800px) {
  .fb-margin-doodle { display: none; }
  .fb-pencil-tag, .fb-headline, .fb-sub, .fb-cta-row, .fb-cta-headline, .fb-cta-body { padding-left: 60px; }
  .fb-cut-head, .fb-cut-row { grid-template-columns: 36px 1fr 1fr; }
  .fb-cut-head span:nth-child(4), .fb-cut-head span:nth-child(5),
  .fb-cut-row .fb-cut-dim, .fb-cut-row .fb-cut-note { grid-column: 1 / -1; padding-left: 36px; }
}
`;
