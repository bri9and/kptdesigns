"use client";

/**
 * GridNorthEngine — V34 Grid North
 *
 * Survey-plat composition for landscaping. Bearings, monuments, north arrow,
 * parcel hatch. Cadastral, exact, legal — borrows the artifact the property
 * owner already trusts.
 */

import { useState } from "react";

const BEARINGS = [
  {
    bearing: "N 17°42' E",
    distance: "184.6'",
    name: "Stake-and-flag",
    note: "Property walks with the owner. Bed lines staked, every plant location flagged before a shovel breaks ground.",
  },
  {
    bearing: "S 64°05' E",
    distance: "112.3'",
    name: "Spec & Install",
    note: "Drawn to plan. Hardscape set against the actual lot, not a marketing rendering. Softscape spec'd to the hardiness zone.",
  },
  {
    bearing: "S 22°18' W",
    distance: "227.9'",
    name: "Maintain",
    note: "Edge-and-blow rhythm. Mid-summer prune. Bed-line truing at the start of every season.",
  },
];

const MONUMENTS = [
  {
    label: "M-1",
    name: "Brookline — Rear yard",
    type: "Hardscape + softscape",
    sf: "1,840 SF",
    note: "Belgard Dimensions in Charcoal. Hakonechloa mass plant, Acer 'October Glory' specimen.",
  },
  {
    label: "M-2",
    name: "Wellesley — Driveway edge",
    type: "Hardscape — granite cobble",
    sf: "84 LF",
    note: "Granite cobble border, Corten steel bed-to-lawn edge. Owner-spec'd in stone yard, May 4.",
  },
  {
    label: "M-3",
    name: "Newton — Canopy lift",
    type: "Tree work + softscape",
    sf: "0.6 AC",
    note: "Two reds lifted to 14'. Mulch ring 4' radius. No volcano. Bed-line trued.",
  },
  {
    label: "M-4",
    name: "Needham — Install day",
    type: "Softscape — full install",
    sf: "3,210 SF",
    note: "412 SF patio, 9 CY mulch, 22 Pennisetum at front-of-bed rhythm. Mulch on Friday.",
  },
];

const PARCELS = [
  { id: "P-01", soft: 64, hard: 28, lawn: 8 },
  { id: "P-02", soft: 41, hard: 47, lawn: 12 },
  { id: "P-03", soft: 78, hard: 14, lawn: 8 },
  { id: "P-04", soft: 52, hard: 32, lawn: 16 },
  { id: "P-05", soft: 39, hard: 51, lawn: 10 },
  { id: "P-06", soft: 71, hard: 18, lawn: 11 },
];

export default function GridNorthEngine() {
  const [hoveredBearing, setHoveredBearing] = useState<number | null>(null);
  const [openMonument, setOpenMonument] = useState<number | null>(0);

  return (
    <>
      <style>{css}</style>
      <div className="gn-shell">
        {/* Plat margin grid */}
        <div className="gn-margin" aria-hidden>
          <div className="gn-margin-tick" style={{ top: "10%" }} />
          <div className="gn-margin-tick" style={{ top: "30%" }} />
          <div className="gn-margin-tick" style={{ top: "50%" }} />
          <div className="gn-margin-tick" style={{ top: "70%" }} />
          <div className="gn-margin-tick" style={{ top: "90%" }} />
        </div>

        {/* TOP TITLEBLOCK */}
        <header className="gn-top">
          <div className="gn-stamp">
            <span className="gn-stamp-line">REGISTERED</span>
            <span className="gn-stamp-line gn-stamp-bold">LAND DESIGN</span>
            <span className="gn-stamp-line">EST. 2014 — N 42° 19'</span>
          </div>
          <nav className="gn-nav" aria-label="Primary">
            <a className="gn-nav-link" href="#bearings">Bearings</a>
            <a className="gn-nav-link" href="#monuments">Monuments</a>
            <a className="gn-nav-link" href="#parcels">Parcel detail</a>
            <a className="gn-nav-link gn-nav-cta" href="#cta">Plat my property</a>
          </nav>

          {/* North arrow rosette */}
          <div className="gn-rose" role="img" aria-label="North arrow, true north">
            <svg viewBox="0 0 100 100" width="68" height="68" aria-hidden>
              <circle cx="50" cy="50" r="46" fill="none" stroke="#0B0D10" strokeWidth="1" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="#0B0D10" strokeWidth="0.5" strokeDasharray="2 2" />
              {/* compass points */}
              <line x1="50" y1="6" x2="50" y2="14" stroke="#0B0D10" strokeWidth="1" />
              <line x1="50" y1="86" x2="50" y2="94" stroke="#0B0D10" strokeWidth="1" />
              <line x1="6" y1="50" x2="14" y2="50" stroke="#0B0D10" strokeWidth="1" />
              <line x1="86" y1="50" x2="94" y2="50" stroke="#0B0D10" strokeWidth="1" />
              {/* arrow */}
              <polygon points="50,12 56,52 50,46 44,52" fill="#0B0D10" />
              <polygon points="50,88 56,52 50,58 44,52" fill="none" stroke="#0B0D10" strokeWidth="1" />
              <text x="50" y="22" textAnchor="middle" fontFamily="Inter, sans-serif" fontWeight="700" fontSize="9" fill="#B8377A">N</text>
            </svg>
          </div>
        </header>

        {/* HERO — bearings draw across the page */}
        <section className="gn-hero">
          <svg className="gn-hero-bearings" viewBox="0 0 1200 600" preserveAspectRatio="none" aria-hidden>
            <defs>
              <pattern id="hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
                <line x1="0" y1="0" x2="0" y2="6" stroke="#B8377A" strokeWidth="1" opacity="0.55" />
              </pattern>
            </defs>
            {/* parcel polygon */}
            <polygon
              points="180,60 1080,90 1100,520 220,490"
              fill="url(#hatch)"
              stroke="#0B0D10"
              strokeWidth="1.5"
              opacity="0.85"
            />
            <polygon
              points="180,60 1080,90 1100,520 220,490"
              fill="none"
              stroke="#B8377A"
              strokeWidth="2"
            />
            {/* bearing arrows */}
            <line x1="180" y1="60" x2="1080" y2="90" stroke="#0B0D10" strokeWidth="0.75" />
            <line x1="1080" y1="90" x2="1100" y2="520" stroke="#0B0D10" strokeWidth="0.75" />
            <line x1="1100" y1="520" x2="220" y2="490" stroke="#0B0D10" strokeWidth="0.75" />
            <line x1="220" y1="490" x2="180" y2="60" stroke="#0B0D10" strokeWidth="0.75" />
            {/* monument markers */}
            <circle cx="180" cy="60" r="5" fill="#0B0D10" />
            <circle cx="1080" cy="90" r="5" fill="#0B0D10" />
            <circle cx="1100" cy="520" r="5" fill="#0B0D10" />
            <circle cx="220" cy="490" r="5" fill="#0B0D10" />
          </svg>

          <div className="gn-hero-content">
            <p className="gn-hero-cite">PLAT OF SURVEY — JOB 2026-047</p>
            <h1 className="gn-headline">
              Spec&rsquo;d to plan.
              <br />
              Mulched to the property line.
              <br />
              <span className="gn-headline-mark">Bearings true</span> to the monument.
            </h1>
            <p className="gn-sub">
              Landscape installs that survey, stake, and stay — designed
              against the actual lot, not a marketing rendering.
            </p>
            <div className="gn-cta-row">
              <a href="#cta" className="gn-cta gn-cta-primary">Plat my property</a>
              <a href="#bearings" className="gn-cta gn-cta-secondary">See bearings</a>
            </div>

            <dl className="gn-hero-data">
              <div>
                <dt>Lot</dt><dd>0.47 AC</dd>
              </div>
              <div>
                <dt>Frontage</dt><dd>184.6'</dd>
              </div>
              <div>
                <dt>Zone</dt><dd>R-1 (single-family)</dd>
              </div>
              <div>
                <dt>Hardiness</dt><dd>6b</dd>
              </div>
            </dl>
          </div>
        </section>

        {/* BEARINGS */}
        <section className="gn-section" id="bearings">
          <header className="gn-section-head">
            <span className="gn-section-num">§ 01</span>
            <h2 className="gn-section-title">Bearings</h2>
            <p className="gn-section-kicker">
              Three named services as bearing-and-distance lines. Hover or
              focus a bearing to drive the project at the end of the line.
            </p>
          </header>

          <div className="gn-bearings">
            <div className="gn-bearings-list">
              {BEARINGS.map((b, i) => (
                <button
                  type="button"
                  key={i}
                  className={`gn-bearing-row${hoveredBearing === i ? " is-active" : ""}`}
                  onMouseEnter={() => setHoveredBearing(i)}
                  onMouseLeave={() =>
                    setHoveredBearing((cur) => (cur === i ? null : cur))
                  }
                  onFocus={() => setHoveredBearing(i)}
                  onBlur={() =>
                    setHoveredBearing((cur) => (cur === i ? null : cur))
                  }
                  aria-pressed={hoveredBearing === i}
                >
                  <span className="gn-bearing-meta">
                    <span className="gn-bearing-tag">{b.bearing}</span>
                    <span className="gn-bearing-dist">{b.distance}</span>
                  </span>
                  <span className="gn-bearing-name">{b.name}</span>
                  <span className="gn-bearing-arrow" aria-hidden>→</span>
                </button>
              ))}
            </div>
            <aside className="gn-bearings-detail" aria-live="polite">
              <p className="gn-bearings-label">END OF LINE</p>
              <h3 className="gn-bearings-title">
                {hoveredBearing != null
                  ? BEARINGS[hoveredBearing].name
                  : "Hover a bearing"}
              </h3>
              <p className="gn-bearings-note">
                {hoveredBearing != null
                  ? BEARINGS[hoveredBearing].note
                  : "Each line runs from a corner monument to a project at its terminus. Three services, three bearings."}
              </p>
              <div className="gn-bearings-key">
                <span className="gn-bearings-key-row">
                  <span className="gn-bearings-key-marker" aria-hidden />
                  Monument cap (brass)
                </span>
                <span className="gn-bearings-key-row">
                  <span className="gn-bearings-key-line" aria-hidden />
                  Bearing line
                </span>
                <span className="gn-bearings-key-row">
                  <span className="gn-bearings-key-hatch" aria-hidden />
                  Project parcel (hatched)
                </span>
              </div>
            </aside>
          </div>
        </section>

        {/* MONUMENTS */}
        <section className="gn-section" id="monuments">
          <header className="gn-section-head">
            <span className="gn-section-num">§ 02</span>
            <h2 className="gn-section-title">Monuments</h2>
            <p className="gn-section-kicker">
              Past jobs as monument markers along a section line. Click to
              pop the project card.
            </p>
          </header>

          <div className="gn-monuments">
            <div className="gn-section-line" aria-hidden>
              <div className="gn-section-line-rule" />
              {MONUMENTS.map((m, i) => (
                <button
                  type="button"
                  key={m.label}
                  className={`gn-monument-pin${openMonument === i ? " is-open" : ""}`}
                  style={{ left: `${10 + i * 26}%` }}
                  onClick={() => setOpenMonument((cur) => (cur === i ? null : i))}
                  aria-label={`${m.label} ${m.name}`}
                >
                  <span className="gn-monument-cap" aria-hidden />
                  <span className="gn-monument-label">{m.label}</span>
                </button>
              ))}
            </div>

            <div className="gn-monument-cards">
              {MONUMENTS.map((m, i) => (
                <article
                  key={m.label}
                  className={`gn-monument-card${openMonument === i ? " is-open" : ""}`}
                  aria-hidden={openMonument !== i}
                >
                  <header className="gn-monument-card-head">
                    <span className="gn-monument-card-label">{m.label}</span>
                    <span className="gn-monument-card-sf">{m.sf}</span>
                  </header>
                  <h4 className="gn-monument-card-name">{m.name}</h4>
                  <p className="gn-monument-card-type">{m.type}</p>
                  <p className="gn-monument-card-note">{m.note}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* PARCEL DETAIL */}
        <section className="gn-section" id="parcels">
          <header className="gn-section-head">
            <span className="gn-section-num">§ 03</span>
            <h2 className="gn-section-title">Parcel Detail</h2>
            <p className="gn-section-kicker">
              Hatched parcels showing softscape, hardscape, and lawn
              distribution per project.
            </p>
          </header>

          <ul className="gn-parcels">
            {PARCELS.map((p) => (
              <li key={p.id} className="gn-parcel">
                <div className="gn-parcel-frame" tabIndex={0}>
                  <span
                    className="gn-parcel-band gn-parcel-soft"
                    style={{ flex: p.soft }}
                    title={`Softscape ${p.soft}%`}
                  />
                  <span
                    className="gn-parcel-band gn-parcel-hard"
                    style={{ flex: p.hard }}
                    title={`Hardscape ${p.hard}%`}
                  />
                  <span
                    className="gn-parcel-band gn-parcel-lawn"
                    style={{ flex: p.lawn }}
                    title={`Lawn ${p.lawn}%`}
                  />
                </div>
                <div className="gn-parcel-meta">
                  <span className="gn-parcel-id">{p.id}</span>
                  <span className="gn-parcel-pct">
                    SOFT {p.soft}% · HARD {p.hard}% · LAWN {p.lawn}%
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* TITLEBLOCK FOOTER */}
        <footer className="gn-foot" id="cta">
          <div className="gn-foot-block">
            <div className="gn-foot-stamp">
              <p className="gn-foot-stamp-title">SURVEYOR&rsquo;S NOTE</p>
              <p className="gn-foot-stamp-body">
                All bearings shown are referenced to grid north (NAD83). All
                distances are horizontal and in U.S. Survey Feet. Designed
                against the deed, not the rendering.
              </p>
            </div>
            <div className="gn-foot-grid">
              <div>
                <p className="gn-foot-label">Designed by</p>
                <p className="gn-foot-value">KPT Land Design — A. Halloran, ASLA</p>
              </div>
              <div>
                <p className="gn-foot-label">Survey collaborator</p>
                <p className="gn-foot-value">B. Marquez, R.L.S. #44218</p>
              </div>
              <div>
                <p className="gn-foot-label">Service area</p>
                <p className="gn-foot-value">Greater Boston — N 42° 19'</p>
              </div>
              <div>
                <p className="gn-foot-label">Plat my property</p>
                <p className="gn-foot-value">
                  <a className="gn-foot-link" href="#cta">walk@kpt-design.work</a>
                </p>
              </div>
            </div>
          </div>
          <div className="gn-foot-scale" aria-hidden>
            <span className="gn-foot-scale-num">0</span>
            <span className="gn-foot-scale-bar gn-foot-scale-bar-black" />
            <span className="gn-foot-scale-bar gn-foot-scale-bar-white" />
            <span className="gn-foot-scale-bar gn-foot-scale-bar-black" />
            <span className="gn-foot-scale-bar gn-foot-scale-bar-white" />
            <span className="gn-foot-scale-num">40'</span>
            <span className="gn-foot-scale-label">SCALE 1&quot; = 20 FT</span>
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;800&family=JetBrains+Mono:wght@400;500;700&family=Spectral:ital,wght@0,400;0,500;0,600;1,400&display=swap');

:root, .gn-shell {
  --plat: #F8F5EE;
  --plat-2: #EFEBDF;
  --ink: #0B0D10;
  --ink-soft: #2C2F35;
  --magenta: #B8377A;
  --magenta-soft: rgba(184,55,122,0.18);
  --rule: #1F2126;
}

.gn-shell {
  position: relative;
  font-family: 'Inter', system-ui, sans-serif;
  color: var(--ink);
  background: var(--plat);
  max-width: 1280px;
  margin: 0 auto;
  padding: 28px 56px 80px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
}
.gn-shell::before {
  content: "";
  position: absolute;
  inset: 16px;
  border: 1px solid var(--ink);
  pointer-events: none;
}
.gn-shell::after {
  content: "";
  position: absolute;
  inset: 22px;
  border: 1px dashed var(--ink-soft);
  pointer-events: none;
  opacity: 0.45;
}
.gn-margin { position: absolute; inset: 22px 14px 22px auto; width: 8px; pointer-events: none; }
.gn-margin-tick {
  position: absolute;
  width: 8px;
  height: 1px;
  background: var(--ink);
}

/* TOP */
.gn-top {
  display: grid;
  grid-template-columns: 1fr auto auto;
  gap: 32px;
  align-items: center;
  padding-bottom: 16px;
  margin-bottom: 32px;
  border-bottom: 1px solid var(--ink);
}
.gn-stamp {
  display: inline-flex;
  flex-direction: column;
  align-items: flex-start;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--ink);
  border: 1.5px solid var(--ink);
  padding: 8px 14px;
  line-height: 1.4;
  text-transform: uppercase;
}
.gn-stamp-bold { font-weight: 700; font-size: 13px; letter-spacing: 0.14em; }
.gn-nav {
  display: flex;
  gap: 24px;
  font-size: 13px;
  font-weight: 500;
}
.gn-nav-link {
  color: var(--ink);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 2px;
  transition: border-color 160ms, color 160ms;
}
.gn-nav-link:hover, .gn-nav-link:focus-visible {
  border-bottom-color: var(--magenta);
  color: var(--magenta);
  outline: none;
}
.gn-nav-cta {
  background: var(--ink);
  color: var(--plat);
  padding: 8px 14px;
  border-bottom: none;
}
.gn-nav-cta:hover, .gn-nav-cta:focus-visible {
  background: var(--magenta);
  color: var(--plat);
}

.gn-rose {
  width: 68px;
  height: 68px;
  display: grid;
  place-items: center;
}

/* HERO */
.gn-hero {
  position: relative;
  min-height: 540px;
  margin-bottom: 96px;
  border: 1px solid var(--ink);
  background: var(--plat);
  overflow: hidden;
}
.gn-hero-bearings {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}
.gn-hero-content {
  position: relative;
  padding: 56px 56px 48px;
  max-width: 760px;
}
.gn-hero-cite {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: var(--magenta);
  margin: 0 0 18px;
  font-weight: 700;
}
.gn-headline {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: clamp(40px, 6.4vw, 76px);
  line-height: 1.0;
  letter-spacing: -0.02em;
  margin: 0 0 24px;
  font-stretch: 110%;
}
.gn-headline-mark {
  background: var(--magenta);
  color: var(--plat);
  padding: 0 8px;
  display: inline-block;
}
.gn-sub {
  font-family: 'Spectral', Georgia, serif;
  font-size: 19px;
  line-height: 1.5;
  max-width: 56ch;
  margin: 0 0 28px;
}
.gn-cta-row { display: flex; gap: 14px; margin-bottom: 32px; flex-wrap: wrap; }
.gn-cta {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.05em;
  text-decoration: none;
  padding: 12px 18px;
  border: 1.5px solid var(--ink);
  transition: background 160ms, color 160ms, transform 160ms;
}
.gn-cta-primary { background: var(--ink); color: var(--plat); }
.gn-cta-primary:hover, .gn-cta-primary:focus-visible {
  background: var(--magenta);
  border-color: var(--magenta);
  outline: none;
  transform: translate(-1px, -1px);
}
.gn-cta-secondary { background: var(--plat); color: var(--ink); }
.gn-cta-secondary:hover, .gn-cta-secondary:focus-visible {
  background: var(--ink);
  color: var(--plat);
  outline: none;
  transform: translate(-1px, -1px);
}

.gn-hero-data {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px 24px;
  border-top: 1px solid var(--ink);
  padding-top: 18px;
  margin: 0;
  font-family: 'JetBrains Mono', monospace;
}
.gn-hero-data dt {
  font-size: 10px;
  letter-spacing: 0.16em;
  color: #555;
  text-transform: uppercase;
  margin-bottom: 4px;
}
.gn-hero-data dd {
  font-size: 16px;
  font-weight: 700;
  margin: 0;
}

/* SECTIONS */
.gn-section { margin-bottom: 96px; }
.gn-section-head {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 24px 36px;
  align-items: baseline;
  margin-bottom: 36px;
  border-top: 1px solid var(--ink);
  padding-top: 24px;
}
.gn-section-num {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.16em;
}
.gn-section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 800;
  font-size: clamp(28px, 4vw, 44px);
  letter-spacing: -0.01em;
  margin: 0;
  font-stretch: 115%;
  text-transform: uppercase;
}
.gn-section-kicker {
  grid-column: 2;
  font-family: 'Spectral', Georgia, serif;
  font-size: 16px;
  line-height: 1.5;
  max-width: 60ch;
  color: var(--ink-soft);
  margin: 0;
}

/* BEARINGS */
.gn-bearings {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 36px;
}
@media (max-width: 880px) {
  .gn-bearings { grid-template-columns: 1fr; }
}
.gn-bearings-list {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--ink);
}
.gn-bearing-row {
  display: grid;
  grid-template-columns: 200px 1fr 30px;
  gap: 16px;
  align-items: center;
  width: 100%;
  background: transparent;
  border: 0;
  border-bottom: 1px solid var(--ink);
  padding: 22px 0;
  text-align: left;
  cursor: pointer;
  font: inherit;
  color: var(--ink);
  transition: background 160ms, color 160ms;
}
.gn-bearing-row:hover, .gn-bearing-row:focus-visible, .gn-bearing-row.is-active {
  background: var(--magenta-soft);
  outline: none;
}
.gn-bearing-row.is-active .gn-bearing-arrow,
.gn-bearing-row:hover .gn-bearing-arrow,
.gn-bearing-row:focus-visible .gn-bearing-arrow {
  color: var(--magenta);
  transform: translateX(8px);
}
.gn-bearing-meta {
  font-family: 'JetBrains Mono', monospace;
  display: flex;
  flex-direction: column;
  gap: 2px;
}
.gn-bearing-tag {
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.08em;
  color: var(--magenta);
}
.gn-bearing-dist { font-size: 11px; color: var(--ink-soft); letter-spacing: 0.08em; }
.gn-bearing-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 22px;
  letter-spacing: -0.01em;
}
.gn-bearing-arrow {
  font-size: 22px;
  font-weight: 400;
  text-align: right;
  transition: transform 200ms, color 200ms;
}

.gn-bearings-detail {
  background: var(--plat-2);
  border: 1px solid var(--ink);
  padding: 28px;
  align-self: start;
}
.gn-bearings-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--magenta);
  margin: 0 0 8px;
  font-weight: 700;
}
.gn-bearings-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 26px;
  letter-spacing: -0.01em;
  margin: 0 0 14px;
}
.gn-bearings-note {
  font-family: 'Spectral', Georgia, serif;
  font-size: 15px;
  line-height: 1.55;
  margin: 0 0 20px;
  color: var(--ink-soft);
}
.gn-bearings-key {
  display: flex;
  flex-direction: column;
  gap: 6px;
  border-top: 1px dashed var(--ink-soft);
  padding-top: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
}
.gn-bearings-key-row { display: inline-flex; align-items: center; gap: 10px; }
.gn-bearings-key-marker {
  width: 10px; height: 10px; border-radius: 50%;
  background: var(--ink); border: 1px solid var(--ink);
}
.gn-bearings-key-line {
  width: 18px; height: 1px; background: var(--ink);
}
.gn-bearings-key-hatch {
  width: 18px; height: 12px;
  background-image: repeating-linear-gradient(45deg, var(--magenta) 0 1px, transparent 1px 4px);
  border: 1px solid var(--magenta);
}

/* MONUMENTS */
.gn-monuments { display: flex; flex-direction: column; gap: 32px; }
.gn-section-line {
  position: relative;
  height: 80px;
  border: 1px solid var(--ink);
  background: var(--plat);
  background-image:
    repeating-linear-gradient(90deg, transparent 0 24px, rgba(11,13,16,0.08) 24px 25px);
}
.gn-section-line-rule {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 1px;
  background: var(--ink);
}
.gn-monument-pin {
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  background: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  font: inherit;
  color: var(--ink);
}
.gn-monument-pin:focus-visible { outline: 2px solid var(--magenta); outline-offset: 4px; }
.gn-monument-cap {
  width: 16px; height: 16px; border-radius: 50%;
  background: var(--ink); border: 2px solid var(--plat);
  box-shadow: 0 0 0 1px var(--ink);
  transition: transform 160ms, background 160ms, box-shadow 160ms;
}
.gn-monument-pin:hover .gn-monument-cap,
.gn-monument-pin.is-open .gn-monument-cap {
  background: var(--magenta);
  transform: scale(1.25);
  box-shadow: 0 0 0 2px var(--magenta);
}
.gn-monument-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.16em;
}
.gn-monument-pin:hover .gn-monument-label,
.gn-monument-pin.is-open .gn-monument-label {
  color: var(--magenta);
}

.gn-monument-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}
@media (max-width: 720px) { .gn-monument-cards { grid-template-columns: 1fr; } }
.gn-monument-card {
  background: var(--plat);
  border: 1px solid var(--ink);
  padding: 22px 26px;
  opacity: 0.45;
  transition: opacity 220ms, border-color 220ms, box-shadow 220ms;
}
.gn-monument-card.is-open {
  opacity: 1;
  border-color: var(--magenta);
  box-shadow: 4px 4px 0 0 var(--magenta);
}
.gn-monument-card-head {
  display: flex;
  justify-content: space-between;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  margin-bottom: 10px;
}
.gn-monument-card-label { color: var(--magenta); font-weight: 700; }
.gn-monument-card-sf { color: var(--ink-soft); }
.gn-monument-card-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 20px;
  letter-spacing: -0.01em;
  margin: 0 0 6px;
}
.gn-monument-card-type {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  margin: 0 0 12px;
  text-transform: uppercase;
  color: var(--ink-soft);
}
.gn-monument-card-note {
  font-family: 'Spectral', Georgia, serif;
  font-size: 14px;
  line-height: 1.55;
  margin: 0;
}

/* PARCELS */
.gn-parcels {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px 24px;
}
@media (max-width: 880px) { .gn-parcels { grid-template-columns: repeat(2, 1fr); } }
.gn-parcel { display: flex; flex-direction: column; gap: 8px; }
.gn-parcel-frame {
  display: flex;
  height: 96px;
  border: 1px solid var(--ink);
  overflow: hidden;
  cursor: default;
  transition: box-shadow 200ms;
}
.gn-parcel-frame:hover, .gn-parcel-frame:focus-visible {
  box-shadow: 4px 4px 0 0 var(--magenta);
  outline: none;
}
.gn-parcel-band { display: block; }
.gn-parcel-soft { background: #2c4d3a; }
.gn-parcel-hard { background-image: repeating-linear-gradient(45deg, #0B0D10 0 2px, var(--plat-2) 2px 8px); }
.gn-parcel-lawn { background: #c8d8a3; }
.gn-parcel-meta {
  display: flex;
  justify-content: space-between;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.1em;
  color: var(--ink-soft);
}
.gn-parcel-id { color: var(--magenta); font-weight: 700; }

/* FOOTER */
.gn-foot {
  border-top: 4px solid var(--ink);
  padding-top: 32px;
  display: grid;
  gap: 32px;
}
.gn-foot-block { display: grid; grid-template-columns: 320px 1fr; gap: 36px; }
@media (max-width: 880px) { .gn-foot-block { grid-template-columns: 1fr; } }
.gn-foot-stamp {
  border: 2px solid var(--ink);
  padding: 18px 22px;
  background: var(--plat-2);
  font-family: 'JetBrains Mono', monospace;
}
.gn-foot-stamp-title {
  font-size: 11px;
  letter-spacing: 0.16em;
  font-weight: 700;
  color: var(--magenta);
  margin: 0 0 8px;
}
.gn-foot-stamp-body {
  font-family: 'Spectral', Georgia, serif;
  font-size: 13px;
  line-height: 1.55;
  margin: 0;
  color: var(--ink);
}
.gn-foot-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px 24px;
}
.gn-foot-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--ink-soft);
  margin: 0 0 4px;
  text-transform: uppercase;
}
.gn-foot-value {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
}
.gn-foot-link {
  color: var(--magenta);
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 3px;
}
.gn-foot-link:hover, .gn-foot-link:focus-visible { color: var(--ink); outline: none; }
.gn-foot-scale {
  display: flex;
  align-items: center;
  gap: 0;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.12em;
  color: var(--ink);
  border-top: 1px solid var(--ink);
  padding-top: 12px;
}
.gn-foot-scale-num { padding: 0 8px; font-weight: 700; }
.gn-foot-scale-bar { display: inline-block; width: 50px; height: 8px; border: 1px solid var(--ink); }
.gn-foot-scale-bar-black { background: var(--ink); }
.gn-foot-scale-bar-white { background: var(--plat); }
.gn-foot-scale-label { margin-left: 16px; color: var(--ink-soft); }

@media (prefers-reduced-motion: reduce) {
  .gn-bearing-row, .gn-bearing-arrow, .gn-monument-cap, .gn-monument-card,
  .gn-cta, .gn-nav-link, .gn-parcel-frame {
    transition: none !important;
  }
}
`;
