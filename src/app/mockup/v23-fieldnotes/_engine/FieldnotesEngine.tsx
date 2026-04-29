"use client";

/**
 * FieldnotesEngine — V23 Field Notes
 *
 * A landscape-design pocket notebook on kraft cover stock.
 * Dot-grid pages, rubber-stamped section heads, graphite headlines,
 * chalk-flag accents. The site is the working artifact.
 */

import { useState } from "react";

const FLAGS: Record<string, string> = {
  pink: "#E94B7E",
  orange: "#F08A3E",
  blue: "#3D7FB5",
  green: "#5C8A3A",
  yellow: "#F2D04B",
};

const ENTRIES = [
  { date: "04 / 22", site: "Glenview — rear yard", flag: "pink", note: "Stake bed line 6' off patio. 14 Hakonechloa @ 18\" o.c." },
  { date: "04 / 23", site: "Brookline — driveway edge", flag: "blue", note: "Belgard Dimensions sample on tailgate. Owner picks Charcoal." },
  { date: "04 / 24", site: "Newton — canopy lift", flag: "orange", note: "Lift two reds to 14'. Mulch ring 4' radius. No volcano." },
  { date: "04 / 25", site: "Wellesley — stake & flag", flag: "green", note: "Walk with owner. Acer 'October Glory' at corner. Spec'd to plan." },
  { date: "04 / 26", site: "Needham — install day", flag: "yellow", note: "Mulch on Friday. Edge-and-blow before noon." },
];

const SOFTSCAPE = [
  { latin: "Hakonechloa macra 'Aureola'", common: "Japanese forest grass", qty: 14, spacing: "18\" o.c.", note: "shade band, mass plant" },
  { latin: "Acer rubrum 'October Glory'", common: "red maple", qty: 1, spacing: "single specimen", note: "lift canopy at install" },
  { latin: "Hydrangea paniculata 'Limelight'", common: "panicle hydrangea", qty: 6, spacing: "5' o.c.", note: "bed-line repeat" },
  { latin: "Pennisetum 'Hameln'", common: "dwarf fountain grass", qty: 22, spacing: "24\" o.c.", note: "front-of-bed rhythm" },
  { latin: "Geranium 'Rozanne'", common: "cranesbill", qty: 18, spacing: "16\" o.c.", note: "groundcover, full sun" },
];

const HARDSCAPE = [
  { item: "BELGARD DIMENSIONS — CHARCOAL", qty: "412 SF", note: "RUNNING BOND, 1/8\" JOINT" },
  { item: "TECHO-BLOC BLU 60 — SHALE GREY", qty: "180 SF", note: "PATIO FIELD" },
  { item: "GRANITE COBBLE BORDER — 4x6", qty: "84 LF", note: "DRIVEWAY EDGE" },
  { item: "CORTEN STEEL EDGER — 1/4\" x 4\"", qty: "126 LF", note: "BED-TO-LAWN EDGE" },
  { item: "DOUBLE-SHRED HARDWOOD MULCH", qty: "9 CY", note: "4\" RING, NO VOLCANO" },
];

const CALENDAR_MONTHS = [
  { num: "01", name: "JAN", task: "Tool service. Sharpen blades. Order stock for shade-tree division." },
  { num: "02", name: "FEB", task: "Pruning window — apples, pears, late-winter cuts before sap rise." },
  { num: "03", name: "MAR", task: "Spring cleanup. Pre-emergent on lawn. Soil tests pulled." },
  { num: "04", name: "APR", task: "Bed edges cut. First mulch lay-down. Annuals staked at design walk." },
  { num: "05", name: "MAY", task: "Install windows open. Stone yard runs daily. Mulch on Friday." },
  { num: "06", name: "JUN", task: "Edge-and-blow rhythm. Deadhead spent annuals. Irrigation audits." },
  { num: "07", name: "JUL", task: "Mid-summer pruning on hedges. Watch for dewpoint days; defer planting." },
  { num: "08", name: "AUG", task: "Mid-summer fertilizing. Re-mulch worn beds. Owner walk-throughs." },
  { num: "09", name: "SEP", task: "Fall planting window opens. Bulb pre-orders placed. Aerate cool-season turf." },
  { num: "10", name: "OCT", task: "Lift canopy on hardwoods. Bulbs in. Final mow at 2.75\"." },
  { num: "11", name: "NOV", task: "Leaf cleanup. Wrap tender stock. Drain and blow irrigation lines." },
  { num: "12", name: "DEC", task: "Books closed. Plan walk on next year's installs. Stamp the ledger." },
];

export default function FieldnotesEngine() {
  const [emphasized, setEmphasized] = useState<"soft" | "hard">("soft");

  return (
    <>
      <style>{css}</style>
      <div className="fn-shell">
        <div className="fn-paper">
          <div className="fn-dotgrid" aria-hidden />

          {/* TOP STRIP — left clip, right book pocket */}
          <header className="fn-top">
            <div className="fn-top-left">
              <div className="fn-stamp">
                <span className="fn-stamp-arc">KPT &middot; LANDSCAPE STUDIO</span>
                <span className="fn-stamp-mid">FIELD</span>
                <span className="fn-stamp-arc fn-stamp-arc-bottom">EST. 2018 &middot; ZONE 6A</span>
              </div>
              <div className="fn-datestamp">
                <span>NO.</span>
                <span className="fn-datestamp-num">047</span>
                <span>&middot;</span>
                <span>04 / 26 / 26</span>
              </div>
              <div className="fn-clip" aria-hidden>
                <div className="fn-clip-flag" />
              </div>
            </div>
            <nav className="fn-nav">
              <a href="#today" className="fn-link">Today's walk</a>
              <a href="#specs" className="fn-link">Specs</a>
              <a href="#calendar" className="fn-link">Calendar</a>
              <a href="#book" className="fn-link">Field journal</a>
            </nav>
          </header>

          {/* HERO */}
          <section className="fn-hero">
            <div className="fn-hero-left">
              <div className="fn-hero-stamp">PROJECT NOTES &mdash; SPRING ROUND</div>
              <p className="fn-hero-meta">DRAFTED IN THE TRUCK CAB &middot; 7:14 AM</p>
              <ul className="fn-hero-list">
                <li>Stake the bed line.</li>
                <li>Walk with the owner.</li>
                <li>Mulch on Friday.</li>
              </ul>
            </div>
            <div className="fn-hero-right">
              <h1 className="fn-headline">
                Stake-and-flag walks.
                <br />
                Spec&rsquo;d to plan.
                <br />
                Mulch on Friday.
              </h1>
              <p className="fn-sub">
                A landscape designer&rsquo;s pocket book &mdash; the notes that
                survive a drizzle and end up as installs.
              </p>
              <div className="fn-cta-row">
                <a href="#today" className="fn-cta fn-cta-primary">Walk a property</a>
                <a href="#book" className="fn-cta fn-cta-secondary">See the field journal</a>
              </div>
            </div>
          </section>

          {/* TODAY'S WALK */}
          <section id="today" className="fn-section">
            <div className="fn-section-head">
              <span className="fn-stamp-block">TODAY&rsquo;S WALK</span>
              <span className="fn-rule" aria-hidden />
              <span className="fn-pencil-note">scroll &rarr; entries</span>
            </div>
            <div className="fn-entries" role="list">
              {ENTRIES.map((e) => (
                <article
                  key={e.date}
                  className="fn-entry"
                  data-flag={e.flag}
                  role="listitem"
                  tabIndex={0}
                >
                  <header className="fn-entry-head">
                    <span className="fn-entry-date">{e.date}</span>
                    <span className="fn-entry-flag" aria-hidden style={{ background: FLAGS[e.flag] }}>
                      <span className="fn-entry-flag-stick" />
                    </span>
                  </header>
                  <h3 className="fn-entry-site">{e.site}</h3>
                  <p className="fn-entry-note">{e.note}</p>
                  <p className="fn-entry-flag-name" aria-hidden>
                    flag: <span style={{ color: FLAGS[e.flag] }}>{e.flag}</span>
                  </p>
                </article>
              ))}
            </div>
          </section>

          {/* SPECS */}
          <section id="specs" className="fn-section">
            <div className="fn-section-head">
              <span className="fn-stamp-block">SPECS &mdash; SOFTSCAPE / HARDSCAPE</span>
              <span className="fn-rule" aria-hidden />
              <div className="fn-toggle" role="tablist" aria-label="Emphasize column">
                <button type="button"
                  role="tab"
                  aria-selected={emphasized === "soft"}
                  className={`fn-toggle-btn${emphasized === "soft" ? " on" : ""}`}
                  onClick={() => setEmphasized("soft")}
                >
                  softscape
                </button>
                <button type="button"
                  role="tab"
                  aria-selected={emphasized === "hard"}
                  className={`fn-toggle-btn${emphasized === "hard" ? " on" : ""}`}
                  onClick={() => setEmphasized("hard")}
                >
                  HARDSCAPE
                </button>
              </div>
            </div>
            <div className="fn-ledger">
              <div className={`fn-ledger-col fn-soft${emphasized === "soft" ? " emph" : ""}`}>
                <h4 className="fn-col-head">Softscape &mdash; nursery tag</h4>
                <ul className="fn-soft-list">
                  {SOFTSCAPE.map((p) => (
                    <li key={p.latin} className="fn-soft-row">
                      <em className="fn-latin">{p.latin}</em>
                      <span className="fn-common">{p.common}</span>
                      <span className="fn-qty">{p.qty} ea.</span>
                      <span className="fn-spacing">{p.spacing}</span>
                      <span className="fn-pencil">&mdash; {p.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className={`fn-ledger-col fn-hard${emphasized === "hard" ? " emph" : ""}`}>
                <h4 className="fn-col-head">HARDSCAPE &mdash; STAMPED</h4>
                <ul className="fn-hard-list">
                  {HARDSCAPE.map((h) => (
                    <li key={h.item} className="fn-hard-row">
                      <span className="fn-hard-item">{h.item}</span>
                      <span className="fn-hard-qty">{h.qty}</span>
                      <span className="fn-hard-note">{h.note}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* MAINTENANCE CALENDAR */}
          <section id="calendar" className="fn-section">
            <div className="fn-section-head">
              <span className="fn-stamp-block">MAINTENANCE CALENDAR</span>
              <span className="fn-rule" aria-hidden />
              <span className="fn-pencil-note">edge &amp; blow rhythm</span>
            </div>
            <div className="fn-cal-grid">
              {CALENDAR_MONTHS.map((m) => (
                <div key={m.num} className="fn-cal-page" tabIndex={0}>
                  <div className="fn-cal-head">
                    <span className="fn-cal-num">{m.num}</span>
                    <span className="fn-cal-name">{m.name}</span>
                  </div>
                  <div className="fn-cal-dot" aria-hidden />
                  <p className="fn-cal-task">{m.task}</p>
                  <span className="fn-cal-corner" aria-hidden />
                </div>
              ))}
            </div>
          </section>

          {/* FIELD JOURNAL CTA */}
          <section id="book" className="fn-section fn-section-cta">
            <div className="fn-cta-card">
              <div className="fn-cta-stamp">FIELD JOURNAL</div>
              <h2 className="fn-cta-headline">Walk a property with us.</h2>
              <p className="fn-cta-body">
                We come out with a clipboard, a Lufkin red folding rule, and a
                bag of chalk flags. Forty minutes on the property. You get a
                hand-drawn plan and a price the same week.
              </p>
              <div className="fn-cta-row">
                <a href="#" className="fn-cta fn-cta-primary">Schedule a walk</a>
                <a href="#" className="fn-cta fn-cta-secondary">See last week&rsquo;s notes</a>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="fn-footer">
            <div className="fn-footer-row">
              <span className="fn-footer-stamp">DRAFTED IN THE TRUCK CAB</span>
              <span className="fn-footer-zone">USDA HARDINESS ZONE 6A</span>
              <span className="fn-footer-date">&copy; 04 / 26 / 26 KPT LANDSCAPE STUDIO</span>
            </div>
            <p className="fn-footer-note">
              All entries hand-numbered. All flags returned. Notebook lives in
              the back pocket of every designer in the field.
            </p>
          </footer>
        </div>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Special+Elite&family=Caveat:wght@400;600&family=Inter:wght@400;500;700&family=EB+Garamond:ital@0;1&display=swap');

.fn-shell {
  min-height: 100vh;
  background: #C7B58B;
  background-image:
    radial-gradient(circle at 12% 18%, rgba(110, 86, 50, 0.10) 0px, transparent 60px),
    radial-gradient(circle at 88% 72%, rgba(60, 42, 18, 0.08) 0px, transparent 80px),
    repeating-linear-gradient(94deg, rgba(120, 92, 56, 0.04) 0px, rgba(120, 92, 56, 0.04) 1px, transparent 1px, transparent 4px),
    linear-gradient(180deg, #CAB890 0%, #C0AE82 100%);
  padding: 28px 24px 64px;
  color: #1A1A14;
  font-family: 'Inter', system-ui, sans-serif;
}

.fn-paper {
  max-width: 1240px;
  margin: 0 auto;
}

.fn-dotgrid {
  position: fixed;
  inset: 0;
  background-image: radial-gradient(circle, rgba(38, 30, 16, 0.16) 0.7px, transparent 0.9px);
  background-size: 18px 18px;
  pointer-events: none;
  z-index: 0;
  opacity: 0.55;
  mix-blend-mode: multiply;
}

.fn-top {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 36px;
  align-items: flex-start;
  border-bottom: 1px dashed rgba(26, 26, 20, 0.35);
  padding: 12px 8px 22px;
  margin-bottom: 36px;
}

.fn-top-left {
  display: flex;
  align-items: flex-start;
  gap: 24px;
  position: relative;
}

.fn-stamp {
  width: 132px;
  height: 132px;
  border-radius: 50%;
  border: 2.5px solid #1A1A14;
  position: relative;
  display: grid;
  place-items: center;
  color: #1A1A14;
  transform: rotate(-7deg);
  flex-shrink: 0;
  font-family: 'Special Elite', 'Inter', monospace;
  background:
    radial-gradient(circle, transparent 60%, rgba(26, 26, 20, 0.06) 100%),
    rgba(199, 181, 139, 0.15);
  box-shadow: inset 0 0 0 6px rgba(199, 181, 139, 0.6), inset 0 0 0 7px #1A1A14;
  filter: contrast(1.05);
}
.fn-stamp::before {
  content: '';
  position: absolute;
  inset: -3px;
  border-radius: 50%;
  background: repeating-conic-gradient(rgba(199, 181, 139, 0.6) 0deg 6deg, transparent 6deg 9deg);
  mask: radial-gradient(circle, transparent 62%, #000 64%, #000 70%, transparent 72%);
  pointer-events: none;
  opacity: 0.4;
}
.fn-stamp-mid {
  font-size: 24px;
  font-weight: 400;
  letter-spacing: 0.18em;
}
.fn-stamp-arc {
  position: absolute;
  top: 14px;
  left: 0;
  right: 0;
  text-align: center;
  font-size: 9px;
  letter-spacing: 0.16em;
}
.fn-stamp-arc-bottom { top: auto; bottom: 14px; }

.fn-datestamp {
  font-family: 'Special Elite', monospace;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
  margin-top: 6px;
  font-size: 12px;
  letter-spacing: 0.08em;
  color: #1A1A14;
}
.fn-datestamp-num {
  font-size: 28px;
  letter-spacing: 0.04em;
  color: #525258;
}

.fn-clip {
  position: absolute;
  top: -36px;
  left: 60px;
  width: 30px;
  height: 90px;
  background: linear-gradient(180deg, #b3b3b3 0%, #888 50%, #5a5a5a 100%);
  border: 1px solid #2c2c2c;
  border-radius: 4px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.18);
}
.fn-clip-flag {
  position: absolute;
  top: 60px;
  left: 7px;
  width: 16px;
  height: 26px;
  background: ${FLAGS.pink};
  clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%);
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.25);
}

.fn-nav {
  display: flex;
  flex-wrap: wrap;
  gap: 22px 28px;
  justify-content: flex-end;
  align-items: flex-end;
  font-family: 'Caveat', cursive;
  font-size: 24px;
  color: #2A2A2A;
}
.fn-link {
  color: inherit;
  text-decoration: none;
  position: relative;
  padding-bottom: 4px;
  transition: color 180ms ease;
}
.fn-link::after {
  content: '';
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1.5px;
  background: #525258;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 280ms cubic-bezier(0.7, 0, 0.3, 1);
}
.fn-link:hover, .fn-link:focus-visible {
  color: #1A1A14;
  outline: none;
}
.fn-link:hover::after, .fn-link:focus-visible::after { transform: scaleX(1); }
@media (prefers-reduced-motion: reduce) {
  .fn-link::after { transition: none; }
}

.fn-hero {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 56px;
  padding: 12px 8px 80px;
  border-bottom: 1px dashed rgba(26, 26, 20, 0.35);
  margin-bottom: 56px;
}

.fn-hero-stamp {
  display: inline-block;
  font-family: 'Special Elite', monospace;
  letter-spacing: 0.18em;
  font-size: 11px;
  color: #1A1A14;
  border: 1.5px solid #1A1A14;
  padding: 6px 10px;
  transform: rotate(-2deg);
  margin-bottom: 14px;
}
.fn-hero-meta {
  font-family: 'Special Elite', monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: #525258;
  margin: 0 0 18px;
}
.fn-hero-list {
  list-style: none;
  padding: 0;
  margin: 0;
  font-family: 'Caveat', cursive;
  font-size: 28px;
  color: #1A1A14;
  line-height: 1.2;
}
.fn-hero-list li {
  border-bottom: 1px solid rgba(82, 82, 88, 0.32);
  padding: 8px 0;
}
.fn-hero-list li::before {
  content: '\\2713  ';
  color: #5C8A3A;
  font-weight: 700;
}

.fn-headline {
  font-family: 'Caveat', cursive;
  font-weight: 600;
  font-size: clamp(54px, 8.6vw, 124px);
  line-height: 0.94;
  margin: 0 0 28px;
  color: #1A1A14;
  letter-spacing: -0.01em;
  text-shadow: 0 0 1px rgba(26, 26, 20, 0.6);
}
.fn-sub {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 22px;
  line-height: 1.45;
  color: #2A2A2A;
  max-width: 520px;
  margin: 0 0 32px;
}

.fn-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
}
.fn-cta {
  font-family: 'Special Elite', monospace;
  font-size: 13px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  padding: 14px 22px;
  text-decoration: none;
  border: 1.5px solid #1A1A14;
  position: relative;
  transition: transform 200ms ease, background 200ms ease, color 200ms ease;
}
.fn-cta-primary {
  background: #1A1A14;
  color: #F0E8CF;
}
.fn-cta-primary:hover, .fn-cta-primary:focus-visible {
  outline: none;
  background: #5C8A3A;
  color: #FFFFFF;
  border-color: #5C8A3A;
  transform: translate(-1px, -1px);
}
.fn-cta-secondary {
  background: transparent;
  color: #1A1A14;
}
.fn-cta-secondary:hover, .fn-cta-secondary:focus-visible {
  outline: none;
  background: rgba(26, 26, 20, 0.08);
  transform: translate(-1px, -1px);
}
@media (prefers-reduced-motion: reduce) {
  .fn-cta { transition: none; }
}

.fn-section {
  position: relative;
  z-index: 2;
  padding: 16px 8px 80px;
}

.fn-section-head {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 28px;
  flex-wrap: wrap;
}
.fn-stamp-block {
  font-family: 'Special Elite', monospace;
  letter-spacing: 0.2em;
  font-size: 12px;
  border: 1.5px solid #1A1A14;
  padding: 7px 12px;
  background: rgba(26, 26, 20, 0.04);
  transform: rotate(-1.5deg);
}
.fn-rule {
  flex: 1;
  height: 1px;
  background: repeating-linear-gradient(90deg, #525258 0px, #525258 6px, transparent 6px, transparent 11px);
}
.fn-pencil-note {
  font-family: 'Caveat', cursive;
  font-size: 20px;
  color: #525258;
}

.fn-toggle {
  display: flex;
  border: 1.5px solid #1A1A14;
  font-family: 'Special Elite', monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
}
.fn-toggle-btn {
  background: transparent;
  border: 0;
  padding: 8px 14px;
  cursor: pointer;
  color: #1A1A14;
  font: inherit;
  letter-spacing: inherit;
  transition: background 180ms ease, color 180ms ease;
}
.fn-toggle-btn.on {
  background: #1A1A14;
  color: #F0E8CF;
}
.fn-toggle-btn:focus-visible {
  outline: 2px solid #5C8A3A;
  outline-offset: 2px;
}

.fn-entries {
  display: flex;
  gap: 18px;
  overflow-x: auto;
  padding: 8px 0 24px;
  scroll-snap-type: x mandatory;
  scrollbar-width: thin;
}
.fn-entries::-webkit-scrollbar { height: 6px; }
.fn-entries::-webkit-scrollbar-thumb { background: #525258; border-radius: 3px; }
.fn-entries::-webkit-scrollbar-track { background: rgba(26, 26, 20, 0.08); }

.fn-entry {
  flex: 0 0 320px;
  background: #F0E8CF;
  border: 1px solid rgba(26, 26, 20, 0.35);
  padding: 18px 18px 22px;
  scroll-snap-align: start;
  position: relative;
  box-shadow: 2px 3px 0 rgba(26, 26, 20, 0.18);
  transition: transform 220ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 220ms ease;
  outline: none;
  background-image:
    repeating-linear-gradient(transparent 0px, transparent 24px, rgba(26, 26, 20, 0.08) 25px),
    radial-gradient(circle, rgba(82, 82, 88, 0.12) 0.6px, transparent 0.8px);
  background-size: auto, 12px 12px;
}
.fn-entry:hover, .fn-entry:focus-visible {
  transform: translate(-2px, -3px) rotate(-0.4deg);
  box-shadow: 5px 7px 0 rgba(26, 26, 20, 0.22);
}
.fn-entry:focus-visible {
  border-color: #5C8A3A;
  border-width: 2px;
}
@media (prefers-reduced-motion: reduce) {
  .fn-entry { transition: none; }
  .fn-entry:hover, .fn-entry:focus-visible { transform: none; }
}

.fn-entry-head {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: 8px;
}
.fn-entry-date {
  font-family: 'Special Elite', monospace;
  font-size: 14px;
  letter-spacing: 0.08em;
  color: #1A1A14;
}
.fn-entry-flag {
  position: relative;
  width: 22px;
  height: 30px;
  clip-path: polygon(0 0, 100% 0, 100% 70%, 50% 100%, 0 70%);
  display: inline-block;
}
.fn-entry-flag-stick {
  position: absolute;
  left: 50%;
  bottom: -10px;
  width: 1.5px;
  height: 18px;
  background: #1A1A14;
}
.fn-entry-site {
  font-family: 'Caveat', cursive;
  font-weight: 600;
  font-size: 26px;
  margin: 0 0 10px;
  color: #1A1A14;
  line-height: 1.05;
}
.fn-entry-note {
  font-family: 'EB Garamond', serif;
  font-size: 16px;
  line-height: 1.4;
  color: #2A2A2A;
  margin: 0 0 14px;
}
.fn-entry-flag-name {
  font-family: 'Special Elite', monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  margin: 0;
  text-transform: lowercase;
  color: #525258;
  opacity: 0;
  transform: translateY(4px);
  transition: opacity 220ms ease, transform 220ms ease;
}
.fn-entry:hover .fn-entry-flag-name,
.fn-entry:focus-visible .fn-entry-flag-name {
  opacity: 1;
  transform: translateY(0);
}
@media (prefers-reduced-motion: reduce) {
  .fn-entry-flag-name { transition: none; opacity: 1; transform: none; }
}

.fn-ledger {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 36px;
  align-items: flex-start;
}
.fn-ledger-col {
  background: #F0E8CF;
  border: 1px solid rgba(26, 26, 20, 0.3);
  padding: 22px 22px 28px;
  transition: opacity 280ms ease, transform 280ms ease;
}
.fn-ledger-col:not(.emph) { opacity: 0.55; }
.fn-ledger-col.emph { opacity: 1; transform: translateY(-2px); box-shadow: 4px 5px 0 rgba(26, 26, 20, 0.2); }
@media (prefers-reduced-motion: reduce) {
  .fn-ledger-col { transition: none; }
}

.fn-col-head {
  font-family: 'Special Elite', monospace;
  font-size: 13px;
  letter-spacing: 0.16em;
  margin: 0 0 16px;
  padding-bottom: 8px;
  border-bottom: 1px dashed rgba(26, 26, 20, 0.4);
  color: #1A1A14;
}

.fn-soft-list, .fn-hard-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
}
.fn-soft-row {
  display: grid;
  grid-template-columns: 1fr;
  padding: 12px 0;
  border-bottom: 1px solid rgba(26, 26, 20, 0.18);
  font-family: 'EB Garamond', serif;
  font-size: 16px;
  line-height: 1.45;
}
.fn-latin {
  font-style: italic;
  font-weight: 600;
  color: #1A1A14;
  font-size: 17px;
}
.fn-common {
  font-style: normal;
  color: #525258;
  margin-top: 1px;
  font-size: 13px;
  letter-spacing: 0.04em;
}
.fn-qty, .fn-spacing {
  display: inline-block;
  margin-right: 12px;
  font-family: 'Special Elite', monospace;
  font-size: 12px;
  color: #1A1A14;
  letter-spacing: 0.06em;
  margin-top: 4px;
}
.fn-pencil {
  font-family: 'Caveat', cursive;
  font-size: 19px;
  color: #525258;
  display: block;
  margin-top: 4px;
}

.fn-hard-row {
  display: grid;
  grid-template-columns: 1.4fr 0.5fr 1fr;
  gap: 8px;
  padding: 14px 0;
  border-bottom: 1px solid rgba(26, 26, 20, 0.18);
  font-family: 'Special Elite', monospace;
  font-size: 12px;
  letter-spacing: 0.1em;
  color: #1A1A14;
  align-items: center;
}
.fn-hard-item { font-weight: 700; }
.fn-hard-qty { color: #525258; }
.fn-hard-note { color: #2A2A2A; font-size: 11px; }

.fn-cal-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
}
.fn-cal-page {
  background: #F0E8CF;
  border: 1px solid rgba(26, 26, 20, 0.25);
  padding: 16px 16px 22px;
  position: relative;
  transition: transform 240ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 240ms ease;
  cursor: default;
  outline: none;
  min-height: 162px;
  background-image: repeating-linear-gradient(transparent 0px, transparent 22px, rgba(26, 26, 20, 0.07) 23px);
}
.fn-cal-page:hover, .fn-cal-page:focus-visible {
  transform: translate(-1px, -3px) rotate(-0.6deg);
  box-shadow: 4px 5px 0 rgba(26, 26, 20, 0.18);
}
.fn-cal-page:focus-visible { border-color: #5C8A3A; }
.fn-cal-corner {
  position: absolute;
  top: 0;
  right: 0;
  width: 0;
  height: 0;
  border-style: solid;
  border-width: 0 18px 18px 0;
  border-color: transparent rgba(26, 26, 20, 0.18) transparent transparent;
  transition: border-width 220ms ease;
}
.fn-cal-page:hover .fn-cal-corner,
.fn-cal-page:focus-visible .fn-cal-corner {
  border-width: 0 28px 28px 0;
  border-color: transparent rgba(92, 138, 58, 0.55) transparent transparent;
}
@media (prefers-reduced-motion: reduce) {
  .fn-cal-page, .fn-cal-corner { transition: none; }
  .fn-cal-page:hover, .fn-cal-page:focus-visible { transform: none; }
}

.fn-cal-head {
  display: flex;
  align-items: baseline;
  gap: 8px;
  margin-bottom: 8px;
  border-bottom: 1px dashed rgba(26, 26, 20, 0.3);
  padding-bottom: 6px;
}
.fn-cal-num {
  font-family: 'Special Elite', monospace;
  font-size: 22px;
  color: #1A1A14;
}
.fn-cal-name {
  font-family: 'Special Elite', monospace;
  font-size: 12px;
  letter-spacing: 0.16em;
  color: #525258;
}
.fn-cal-dot { display: none; }
.fn-cal-task {
  font-family: 'EB Garamond', serif;
  font-size: 15px;
  line-height: 1.45;
  color: #2A2A2A;
  margin: 0;
}

.fn-section-cta { padding-bottom: 96px; }
.fn-cta-card {
  background: #F0E8CF;
  border: 2px solid #1A1A14;
  padding: 48px 48px 56px;
  position: relative;
  box-shadow: 6px 8px 0 rgba(26, 26, 20, 0.2);
}
.fn-cta-stamp {
  display: inline-block;
  font-family: 'Special Elite', monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  border: 1.5px solid #1A1A14;
  padding: 6px 12px;
  margin-bottom: 18px;
  transform: rotate(-1.5deg);
}
.fn-cta-headline {
  font-family: 'Caveat', cursive;
  font-weight: 600;
  font-size: clamp(36px, 5vw, 64px);
  margin: 0 0 14px;
  color: #1A1A14;
  line-height: 1;
}
.fn-cta-body {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 19px;
  line-height: 1.5;
  color: #2A2A2A;
  max-width: 560px;
  margin: 0 0 28px;
}

.fn-footer {
  border-top: 1px dashed rgba(26, 26, 20, 0.4);
  padding: 24px 8px 8px;
  font-family: 'Special Elite', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: #525258;
}
.fn-footer-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 12px;
  margin-bottom: 10px;
}
.fn-footer-stamp {
  border: 1.5px solid #1A1A14;
  color: #1A1A14;
  padding: 5px 10px;
  transform: rotate(-1deg);
  display: inline-block;
}
.fn-footer-zone, .fn-footer-date { color: #1A1A14; }
.fn-footer-note {
  font-family: 'Caveat', cursive;
  font-size: 17px;
  font-weight: 400;
  letter-spacing: 0;
  color: #525258;
  margin: 0;
}

@media (max-width: 880px) {
  .fn-hero { grid-template-columns: 1fr; gap: 28px; }
  .fn-top { grid-template-columns: 1fr; }
  .fn-nav { justify-content: flex-start; }
  .fn-ledger { grid-template-columns: 1fr; }
}
`;
