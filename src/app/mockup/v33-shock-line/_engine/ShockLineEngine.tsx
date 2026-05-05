"use client";

/**
 * ShockLineEngine — V33 Shock Line
 *
 * Two type systems married: Brady heat-shrink labels (crisp black-on-white sans)
 * and NEC code-book body (tight serif, small-caps article heads). Klein-handle
 * orange is the only accent. No lightning bolts. No sparks. No "we'll keep the
 * lights on" jokes.
 */

import { useState } from "react";

const HEAT_SHRINK = [
  {
    id: "panel",
    front: "PANELS — KIT",
    back: "200A service. Square-D QO or Eaton CH. AFCI on every bedroom branch.",
    article: "Article 408",
  },
  {
    id: "service",
    front: "SVC UPGRADE — KIT",
    back: "Mast, meter, main breaker swap. Coordinated with the POCO. One day, one shutoff.",
    article: "Article 230",
  },
  {
    id: "ev",
    front: "EV CHARGER — KIT",
    back: "60A circuit, NEMA 14-50 or hard-wired Wallbox. Sized for a 48A continuous draw.",
    article: "Article 625",
  },
  {
    id: "trim",
    front: "DEVICES — KIT",
    back: "Tamper-resistant receptacles. Decora switches. Pigtail-wired, never back-stabbed.",
    article: "Article 406",
  },
  {
    id: "ground",
    front: "GROUNDING — KIT",
    back: "Ground rod pair. Bonded water main. Intersystem bonding bar at the meter.",
    article: "Article 250",
  },
  {
    id: "low",
    front: "LOW-VOLT — KIT",
    back: "Cat6, RG6, doorbell pro, smoke/CO interconnect. Pulled before drywall, labeled at both ends.",
    article: "Article 800",
  },
];

const NEC_NOTES = [
  {
    article: "Article 210",
    title: "Branch Circuits",
    body:
      "Bedrooms get AFCI. Kitchens get GFCI on countertops, plus a dedicated 20A small-appliance pair. Bathrooms get a dedicated 20A. We do not share the powder room with the master vanity, no matter how short the home run looks.",
    margin: "AFCI on every bedroom branch — no exception, no override.",
  },
  {
    article: "Article 250",
    title: "Grounding & Bonding",
    body:
      "Two ground rods six feet apart, bonded with #6 bare copper. Water main bonded inside the meter cabinet. Intersystem bonding bar provided for cable, telco, and the alarm panel — they bond there, not to the rod.",
    margin: "Bonded water main inside the meter cab — checked, not assumed.",
  },
  {
    article: "Article 408",
    title: "Switchboards & Panelboards",
    body:
      "Working clearance is 36\" deep and 30\" wide minimum. We will not bury a panel behind a water heater. Directory is filled in pencil on day one and inked on day two — by the electrician, not by the homeowner.",
    margin: "Directory inked on day two — draftsman's hand, all caps.",
  },
];

const DIRECTORY = [
  ["1", "DISHWASHER", "20A", "POS", "MR-1"],
  ["2", "DISPOSAL", "15A", "POS", "MR-1"],
  ["3", "FRIDGE — DEDICATED", "20A", "POS", "MR-1"],
  ["4", "MICRO — DEDICATED", "20A", "POS", "MR-1"],
  ["5,7", "RANGE — 240V", "50A", "2P", "MR-1"],
  ["6", "KIT COUNTER A", "20A GFCI", "POS", "MR-1"],
  ["8", "KIT COUNTER B", "20A GFCI", "POS", "MR-1"],
  ["9", "BATH — POWDER", "20A GFCI", "POS", "MR-1"],
  ["10", "BATH — MASTER", "20A GFCI", "POS", "MR-1"],
  ["11", "BR-1 RECEPS", "15A AFCI", "POS", "MR-1"],
  ["12", "BR-1 LIGHTS", "15A AFCI", "POS", "MR-1"],
  ["13", "BR-2 RECEPS", "15A AFCI", "POS", "MR-1"],
  ["14", "BR-2 LIGHTS", "15A AFCI", "POS", "MR-1"],
  ["15", "LR / DR RECEPS", "15A AFCI", "POS", "MR-1"],
  ["16", "LR / DR LIGHTS", "15A AFCI", "POS", "MR-1"],
  ["17", "LAUNDRY", "20A", "POS", "MR-1"],
  ["18,20", "DRYER — 240V", "30A", "2P", "MR-1"],
  ["19", "FAU AIR HANDLER", "15A", "POS", "MR-1"],
  ["21,23", "EV CHARGER", "60A", "2P", "MR-1"],
  ["22", "GARAGE RECEPS", "20A GFCI", "POS", "MR-1"],
  ["24", "EXT RECEPS", "20A GFCI WR", "POS", "MR-1"],
];

export default function ShockLineEngine() {
  const [flipped, setFlipped] = useState<string | null>(null);
  const [openArticle, setOpenArticle] = useState<string | null>("Article 210");

  return (
    <>
      <style>{css}</style>
      <div className="sl-shell">
        {/* TOP BAR */}
        <header className="sl-top">
          <div className="sl-mark">
            <span className="sl-mark-stripe" aria-hidden />
            <span className="sl-mark-text">KPT — LIC. C-10 #874213</span>
          </div>
          <nav className="sl-nav" aria-label="Primary">
            <a className="sl-nav-link" href="#index">Heat-Shrink Index</a>
            <a className="sl-nav-link" href="#notes">Code Notes</a>
            <a className="sl-nav-link" href="#directory">Panel Directory</a>
            <a className="sl-nav-link sl-nav-cta" href="#walk">
              Schedule a panel walk
            </a>
          </nav>
        </header>

        {/* HERO */}
        <section className="sl-hero">
          <aside className="sl-hero-meta" aria-hidden>
            <p className="sl-hero-volume">Vol. 13 — Article 210</p>
            <p className="sl-hero-edition">2026 NEC, as adopted</p>
          </aside>

          <div className="sl-hero-stack">
            <div className="sl-shrink sl-shrink-hero">
              <span className="sl-shrink-edge" aria-hidden />
              HEADLINE — KIT
              <span className="sl-shrink-edge sl-shrink-edge-r" aria-hidden />
            </div>
            <h1 className="sl-headline">
              Home runs.
              <br />
              Pigtails.
              <br />
              <span className="sl-headline-orange">AFCI</span> on every bedroom branch.
            </h1>
            <p className="sl-sub">
              Residential and light-commercial electric — panels, service
              upgrades, EV chargers, and the kind of pull box you don&apos;t
              have to open twice.
            </p>
            <div className="sl-cta-row">
              <a className="sl-cta sl-cta-primary" href="#walk">
                Schedule a panel walk
              </a>
              <a className="sl-cta sl-cta-secondary" href="#notes">
                Read the NEC notes
              </a>
            </div>
            <p className="sl-hero-foot">
              <span className="sl-hero-foot-tag">FIG. 1</span>
              Stacked composition. Brady label stock, heat-shrink polyolefin,
              NFPA&nbsp;70 code-book paper, Klein-handle orange dip.
            </p>
          </div>
        </section>

        {/* HEAT-SHRINK INDEX */}
        <section className="sl-section" id="index">
          <header className="sl-section-head">
            <span className="sl-section-num">§ 01</span>
            <h2 className="sl-section-title">Heat-Shrink Index</h2>
            <p className="sl-section-kicker">
              Services labeled like wires in a panel. Hover or focus a callout
              to flip it to its back side and read the termination.
            </p>
          </header>

          <ul className="sl-shrink-grid">
            {HEAT_SHRINK.map((item) => {
              const isFlipped = flipped === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    className={`sl-shrink-tile${isFlipped ? " is-flipped" : ""}`}
                    onMouseEnter={() => setFlipped(item.id)}
                    onMouseLeave={() => setFlipped((c) => (c === item.id ? null : c))}
                    onFocus={() => setFlipped(item.id)}
                    onBlur={() => setFlipped((c) => (c === item.id ? null : c))}
                    onClick={() =>
                      setFlipped((c) => (c === item.id ? null : item.id))
                    }
                    aria-pressed={isFlipped}
                    aria-label={`${item.front} — ${item.back}`}
                  >
                    <span className="sl-shrink-card sl-shrink-front">
                      <span className="sl-shrink-edge" aria-hidden />
                      <span className="sl-shrink-label">{item.front}</span>
                      <span className="sl-shrink-edge sl-shrink-edge-r" aria-hidden />
                    </span>
                    <span className="sl-shrink-card sl-shrink-back">
                      <span className="sl-shrink-back-article">
                        {item.article}
                      </span>
                      <span className="sl-shrink-back-text">{item.back}</span>
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* CODE NOTES — fold-open thumb tabs */}
        <section className="sl-section" id="notes">
          <header className="sl-section-head">
            <span className="sl-section-num">§ 02</span>
            <h2 className="sl-section-title">Code Notes</h2>
            <p className="sl-section-kicker">
              NEC layout. Small-caps article heads. Our notes margin-set in
              heat-shrink labels.
            </p>
          </header>

          <div className="sl-notes">
            {NEC_NOTES.map((n) => {
              const open = openArticle === n.article;
              return (
                <article
                  key={n.article}
                  className={`sl-note${open ? " is-open" : ""}`}
                >
                  <button
                    type="button"
                    className="sl-note-tab"
                    onClick={() =>
                      setOpenArticle((cur) => (cur === n.article ? null : n.article))
                    }
                    aria-expanded={open}
                    aria-controls={`note-${n.article.replace(/\W/g, "-")}`}
                  >
                    <span className="sl-note-tab-num">{n.article}</span>
                    <span className="sl-note-tab-title">{n.title}</span>
                    <span className="sl-note-tab-mark" aria-hidden>
                      {open ? "—" : "+"}
                    </span>
                  </button>

                  <div
                    className="sl-note-body"
                    id={`note-${n.article.replace(/\W/g, "-")}`}
                    aria-hidden={!open}
                  >
                    <div className="sl-note-prose">
                      <p className="sl-note-text">{n.body}</p>
                    </div>
                    <aside className="sl-note-margin">
                      <div className="sl-note-margin-shrink">
                        <span className="sl-shrink-edge" aria-hidden />
                        OUR NOTE
                        <span className="sl-shrink-edge sl-shrink-edge-r" aria-hidden />
                      </div>
                      <p>{n.margin}</p>
                    </aside>
                  </div>
                </article>
              );
            })}
          </div>
        </section>

        {/* PANEL DIRECTORY */}
        <section className="sl-section" id="directory">
          <header className="sl-section-head">
            <span className="sl-section-num">§ 03</span>
            <h2 className="sl-section-title">Panel Directory</h2>
            <p className="sl-section-kicker">
              Sample directory from a recent service upgrade — Glendale, 200A
              main, draftsman&apos;s hand on day two.
            </p>
          </header>

          <div className="sl-dir">
            <header className="sl-dir-head">
              <span className="sl-dir-stamp">MR-1 · 200A · 42-CKT</span>
              <span className="sl-dir-date">04 / 16 / 26</span>
            </header>
            <table className="sl-dir-table">
              <thead>
                <tr>
                  <th scope="col">CKT</th>
                  <th scope="col">DESCRIPTION</th>
                  <th scope="col">SIZE</th>
                  <th scope="col">POS</th>
                  <th scope="col">PNL</th>
                </tr>
              </thead>
              <tbody>
                {DIRECTORY.map((row, i) => (
                  <tr key={i}>
                    {row.map((cell, j) => (
                      <td key={j} className={j === 1 ? "sl-dir-desc" : ""}>
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="sl-dir-foot">
              Inked on day two. Pencil revisions welcome — the breaker is the
              source of truth, not the label.
            </p>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="sl-foot" id="walk">
          <div className="sl-foot-shrink">
            <span className="sl-shrink-edge" aria-hidden />
            CREDIT — KIT
            <span className="sl-shrink-edge sl-shrink-edge-r" aria-hidden />
          </div>
          <div className="sl-foot-cols">
            <div>
              <p className="sl-foot-label">Master electrician</p>
              <p className="sl-foot-value">M. Reyes — CA C-10 #874213</p>
            </div>
            <div>
              <p className="sl-foot-label">IBEW Local</p>
              <p className="sl-foot-value">Local 11 — Los Angeles</p>
            </div>
            <div>
              <p className="sl-foot-label">Service area</p>
              <p className="sl-foot-value">LA / Glendale / Burbank / Pasadena</p>
            </div>
            <div>
              <p className="sl-foot-label">Schedule</p>
              <p className="sl-foot-value">
                <a className="sl-foot-link" href="#walk">
                  panel-walk@kpt.work
                </a>
              </p>
            </div>
          </div>
          <p className="sl-foot-rule">
            © KPT Electric 2026 — Brady labels stay on. NEC stays in the truck.
          </p>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=IBM+Plex+Sans:wght@400;500;700&family=IBM+Plex+Mono:wght@500;700&family=Source+Serif+4:ital,wght@0,400;0,600;1,400&display=swap');

:root, .sl-shell {
  --brady: #F4F4EE;
  --brady-2: #ECECE5;
  --nec: #131313;
  --orange: #E8643C;
  --orange-deep: #C04E27;
  --rule: #1F1F1F;
}

.sl-shell {
  font-family: 'Source Serif 4', Georgia, serif;
  color: var(--nec);
  background: var(--brady);
  max-width: 1280px;
  margin: 0 auto;
  padding: 32px 40px 80px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  font-feature-settings: "ss01", "ss02";
}

/* TOP */
.sl-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 2px solid var(--rule);
  padding-bottom: 16px;
  margin-bottom: 56px;
}
.sl-mark {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.12em;
}
.sl-mark-stripe {
  display: inline-block;
  width: 28px;
  height: 14px;
  background: var(--orange);
  box-shadow: inset 0 0 0 2px var(--nec);
}
.sl-nav {
  display: flex;
  gap: 28px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
}
.sl-nav-link {
  color: var(--nec);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 2px;
  transition: border-color 160ms, color 160ms;
}
.sl-nav-link:hover, .sl-nav-link:focus-visible {
  border-bottom-color: var(--orange);
  color: var(--orange-deep);
  outline: none;
}
.sl-nav-cta {
  background: var(--nec);
  color: var(--brady);
  padding: 8px 14px;
  border-bottom: none;
}
.sl-nav-cta:hover, .sl-nav-cta:focus-visible {
  background: var(--orange);
  color: var(--nec);
  border-bottom: none;
}

/* HERO */
.sl-hero {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 48px;
  margin-bottom: 96px;
  border-top: 1px solid var(--rule);
  padding-top: 32px;
}
.sl-hero-meta {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: #555;
  border-right: 1px solid #cfcfc5;
  padding-right: 24px;
}
.sl-hero-volume { margin: 0 0 6px; color: var(--nec); font-weight: 700; }
.sl-hero-edition { margin: 0; }

.sl-hero-stack { max-width: 820px; }
.sl-headline {
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 700;
  font-size: clamp(48px, 7vw, 92px);
  line-height: 0.96;
  letter-spacing: -0.02em;
  margin: 16px 0 24px;
  text-transform: none;
}
.sl-headline-orange { color: var(--orange-deep); }
.sl-sub {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 18px;
  line-height: 1.55;
  max-width: 56ch;
  margin: 0 0 28px;
}
.sl-cta-row {
  display: flex;
  gap: 14px;
  margin-bottom: 32px;
  flex-wrap: wrap;
}
.sl-cta {
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-decoration: none;
  padding: 12px 18px;
  border: 2px solid var(--nec);
  transition: background 160ms, color 160ms, transform 160ms;
}
.sl-cta-primary { background: var(--nec); color: var(--brady); }
.sl-cta-primary:hover, .sl-cta-primary:focus-visible {
  background: var(--orange);
  color: var(--nec);
  outline: none;
  transform: translate(-1px, -1px);
}
.sl-cta-secondary { background: transparent; color: var(--nec); }
.sl-cta-secondary:hover, .sl-cta-secondary:focus-visible {
  background: var(--nec);
  color: var(--brady);
  outline: none;
  transform: translate(-1px, -1px);
}

.sl-hero-foot {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: #666;
  border-top: 1px solid #cfcfc5;
  padding-top: 12px;
  display: flex;
  gap: 14px;
  align-items: baseline;
}
.sl-hero-foot-tag {
  background: var(--orange);
  color: var(--nec);
  padding: 2px 6px;
  font-weight: 700;
  letter-spacing: 0.12em;
}

/* SECTIONS */
.sl-section {
  border-top: 2px solid var(--rule);
  padding-top: 36px;
  margin-bottom: 88px;
}
.sl-section-head {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 24px 36px;
  align-items: baseline;
  margin-bottom: 36px;
}
.sl-section-num {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.12em;
}
.sl-section-title {
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 700;
  font-size: clamp(28px, 4vw, 44px);
  letter-spacing: -0.01em;
  margin: 0;
  font-variant: small-caps;
}
.sl-section-kicker {
  grid-column: 2;
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 16px;
  line-height: 1.55;
  max-width: 60ch;
  color: #2a2a2a;
  margin: 0;
}

/* HEAT-SHRINK label primitive — used in hero, grid, and notes margin */
.sl-shrink {
  display: inline-flex;
  align-items: center;
  gap: 0;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.16em;
  background: #ffffff;
  color: var(--nec);
  padding: 6px 14px;
  position: relative;
  border: 1px solid var(--nec);
  box-shadow: 0 1px 0 0 rgba(0,0,0,0.06);
  text-transform: uppercase;
}
.sl-shrink-edge {
  position: absolute;
  top: -3px;
  bottom: -3px;
  left: -10px;
  width: 14px;
  background: repeating-linear-gradient(
    90deg,
    var(--nec) 0 1px,
    transparent 1px 3px
  );
  opacity: 0.7;
}
.sl-shrink-edge-r { left: auto; right: -10px; }
.sl-shrink-hero {
  font-size: 13px;
  padding: 8px 18px;
  margin-bottom: 12px;
}

/* HEAT-SHRINK INDEX GRID */
.sl-shrink-grid {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px 28px;
}
@media (max-width: 880px) {
  .sl-shrink-grid { grid-template-columns: repeat(2, 1fr); }
}
.sl-shrink-tile {
  position: relative;
  width: 100%;
  height: 132px;
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  perspective: 900px;
  text-align: left;
  font: inherit;
}
.sl-shrink-tile:focus-visible { outline: 2px solid var(--orange); outline-offset: 4px; }

.sl-shrink-card {
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  backface-visibility: hidden;
  transition: transform 380ms cubic-bezier(.4,.2,.2,1);
  background: #ffffff;
  border: 1px solid var(--nec);
  box-shadow: 0 1px 0 0 rgba(0,0,0,0.06);
}
.sl-shrink-front .sl-shrink-label {
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
}
.sl-shrink-back {
  transform: rotateY(180deg);
  background: var(--nec);
  color: var(--brady);
  padding: 18px 22px;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 8px;
}
.sl-shrink-back-article {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--orange);
  font-weight: 700;
}
.sl-shrink-back-text {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 14px;
  line-height: 1.45;
}
.sl-shrink-tile.is-flipped .sl-shrink-front { transform: rotateY(180deg); }
.sl-shrink-tile.is-flipped .sl-shrink-back { transform: rotateY(360deg); }
.sl-shrink-tile:hover .sl-shrink-card { box-shadow: 0 2px 0 0 var(--orange); }

/* CODE NOTES */
.sl-notes {
  border-top: 1px solid #cfcfc5;
}
.sl-note { border-bottom: 1px solid #cfcfc5; }
.sl-note-tab {
  width: 100%;
  display: grid;
  grid-template-columns: 160px 1fr 24px;
  gap: 24px;
  align-items: baseline;
  background: transparent;
  border: 0;
  padding: 18px 0;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: var(--nec);
  transition: background 160ms;
}
.sl-note-tab:hover, .sl-note-tab:focus-visible {
  background: rgba(232,100,60,0.08);
  outline: none;
}
.sl-note-tab-num {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  color: var(--orange-deep);
}
.sl-note-tab-title {
  font-family: 'Source Serif 4', Georgia, serif;
  font-variant: small-caps;
  font-weight: 600;
  font-size: 22px;
  letter-spacing: 0.02em;
}
.sl-note-tab-mark {
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  font-size: 18px;
  text-align: right;
  color: var(--orange-deep);
}
.sl-note-body {
  display: grid;
  grid-template-columns: 1fr 280px;
  gap: 36px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 280ms cubic-bezier(.5,.1,.3,1), padding 200ms;
  padding: 0;
}
.sl-note.is-open .sl-note-body {
  max-height: 600px;
  padding-bottom: 28px;
}
@media (max-width: 880px) {
  .sl-note-body, .sl-note.is-open .sl-note-body { grid-template-columns: 1fr; }
}
.sl-note-text {
  font-family: 'Source Serif 4', Georgia, serif;
  font-size: 17px;
  line-height: 1.6;
  margin: 0;
  max-width: 60ch;
  text-indent: 2em;
}
.sl-note-margin {
  border-left: 2px solid var(--orange);
  padding: 0 0 0 16px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 13px;
  line-height: 1.5;
  color: var(--nec);
}
.sl-note-margin-shrink {
  display: inline-flex;
  position: relative;
  background: #ffffff;
  border: 1px solid var(--nec);
  padding: 4px 10px;
  margin-bottom: 10px;
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 0.16em;
}

/* DIRECTORY */
.sl-dir {
  background: #ffffff;
  border: 2px solid var(--nec);
  padding: 24px 28px;
  font-family: 'IBM Plex Mono', monospace;
}
.sl-dir-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  font-size: 12px;
  letter-spacing: 0.12em;
  font-weight: 700;
  border-bottom: 1px solid var(--nec);
  padding-bottom: 12px;
  margin-bottom: 12px;
}
.sl-dir-stamp { color: var(--orange-deep); }
.sl-dir-table {
  width: 100%;
  border-collapse: collapse;
  font-size: 12px;
  letter-spacing: 0.05em;
}
.sl-dir-table th, .sl-dir-table td {
  padding: 8px 10px;
  text-align: left;
  border-bottom: 1px dashed #cfcfc5;
}
.sl-dir-table th {
  font-size: 10px;
  letter-spacing: 0.16em;
  color: #555;
  border-bottom: 1px solid var(--nec);
}
.sl-dir-table tr:hover td { background: rgba(232,100,60,0.07); }
.sl-dir-table tr:hover .sl-dir-desc { color: var(--orange-deep); }
.sl-dir-foot {
  font-family: 'Source Serif 4', Georgia, serif;
  font-style: italic;
  font-size: 13px;
  margin: 14px 0 0;
  color: #555;
}

/* FOOTER */
.sl-foot {
  border-top: 4px solid var(--nec);
  padding-top: 36px;
  margin-top: 24px;
}
.sl-foot-shrink {
  position: relative;
  display: inline-flex;
  background: #ffffff;
  border: 1px solid var(--nec);
  padding: 6px 18px;
  font-family: 'IBM Plex Sans', sans-serif;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.18em;
  margin-bottom: 28px;
}
.sl-foot-cols {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 32px;
}
@media (max-width: 720px) {
  .sl-foot-cols { grid-template-columns: repeat(2, 1fr); }
}
.sl-foot-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: #555;
  margin: 0 0 6px;
  text-transform: uppercase;
}
.sl-foot-value {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}
.sl-foot-link {
  color: var(--orange-deep);
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 3px;
}
.sl-foot-link:hover, .sl-foot-link:focus-visible { color: var(--nec); outline: none; }
.sl-foot-rule {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  color: #555;
  border-top: 1px solid #cfcfc5;
  padding-top: 14px;
  margin: 0;
  letter-spacing: 0.06em;
}

@media (prefers-reduced-motion: reduce) {
  .sl-shrink-card, .sl-note-body, .sl-cta, .sl-nav-link {
    transition: none !important;
  }
}
`;
