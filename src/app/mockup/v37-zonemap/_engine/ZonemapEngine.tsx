"use client";

/**
 * ZonemapEngine — V37 Zone Map
 *
 * USDA Hardiness Zone map as full-bleed background. Banded gradient from Zone
 * 3a violet to Zone 11b coral. Hero sits inside the user's zone (no real
 * geolocation — falls back to Zone 6b). Earned, not metaphorical.
 */

import { useState } from "react";

const ZONES = [
  { code: "3a", color: "#3F2F6A", min: -40, max: -35 },
  { code: "3b", color: "#4B3779", min: -35, max: -30 },
  { code: "4a", color: "#3D5A86", min: -30, max: -25 },
  { code: "4b", color: "#3A6E8D", min: -25, max: -20 },
  { code: "5a", color: "#3D8593", min: -20, max: -15 },
  { code: "5b", color: "#3F9D90", min: -15, max: -10 },
  { code: "6a", color: "#52A988", min: -10, max: -5 },
  { code: "6b", color: "#5BB6D9", min: -5, max: 0 },
  { code: "7a", color: "#7DBE6F", min: 0, max: 5 },
  { code: "7b", color: "#A4C661", min: 5, max: 10 },
  { code: "8a", color: "#C7C75A", min: 10, max: 15 },
  { code: "8b", color: "#E2B651", min: 15, max: 20 },
  { code: "9a", color: "#E89C4A", min: 20, max: 25 },
  { code: "9b", color: "#E48346", min: 25, max: 30 },
  { code: "10a", color: "#E26B45", min: 30, max: 35 },
  { code: "10b", color: "#E15546", min: 35, max: 40 },
  { code: "11a", color: "#DD4747", min: 40, max: 45 },
  { code: "11b", color: "#E2624A", min: 45, max: 50 },
];

const ZONE_SERVICES = [
  {
    title: "Stake-and-flag walks",
    body: "Property walked with the owner. Bed lines staked. Plant spec drawn against your last-frost date, not a national catalog.",
  },
  {
    title: "Spec & Install — softscape",
    body: "Plants picked from cultivars proven in your zone. Plant Friday after last frost. Mulch ring 4', no volcano.",
  },
  {
    title: "Hardscape — patios & walks",
    body: "Belgard, Techo-Bloc, granite cobble. Frost-line set per your zone — 36\" footings in 6b, 48\" in 4b and colder.",
  },
  {
    title: "Maintain — by season",
    body: "Edge-and-blow rhythm Apr–Oct. Pre-emergent timed to soil temp. Dormant prune in late winter, before sap rise.",
  },
];

const PROJECTS = [
  { id: "p1", zone: "5b", name: "Lake George — long driveway", note: "Belgard Dimensions, 4,200 SF. Frost set 48\".", x: 36, y: 32 },
  { id: "p2", zone: "6b", name: "Brookline — rear yard", note: "Hakonechloa mass plant; Acer 'October Glory'.", x: 78, y: 38 },
  { id: "p3", zone: "7a", name: "Charlottesville — campus", note: "Pennisetum repeat; granite cobble border 320 LF.", x: 70, y: 56 },
  { id: "p4", zone: "8a", name: "Charleston — courtyard", note: "Tabby aggregate, palmetto specimen, oyster shell mulch.", x: 76, y: 70 },
  { id: "p5", zone: "9a", name: "Savannah — historic district", note: "Magnolia 'Little Gem' anchored; bermuda overseed.", x: 75, y: 78 },
  { id: "p6", zone: "10a", name: "St. Augustine — coastal", note: "Salt-tolerant palette: muhly, lantana, sabal.", x: 81, y: 86 },
];

const CULTIVARS = [
  { name: "Acer rubrum 'October Glory'", zones: "4–9", note: "Reliable scarlet through Zone 7. North of 5, prune late winter only." },
  { name: "Hakonechloa macra 'Aureola'", zones: "5–9", note: "Shade band performer. In 5b, mulch heavily for winter; in 8a, irrigate." },
  { name: "Hydrangea paniculata 'Limelight'", zones: "3–8", note: "The widest-zone shrub on the truck. Dormant prune to a fist." },
  { name: "Pennisetum 'Hameln'", zones: "5–9", note: "Front-of-bed rhythm. Cut to 4\" in March before new growth pushes." },
  { name: "Sabal palmetto", zones: "8–11", note: "Specimen palmetto for coastal southern installs. Salt-tolerant; full sun." },
];

export default function ZonemapEngine() {
  const [selectedZone, setSelectedZone] = useState<string>("6b");
  const [hoveredProject, setHoveredProject] = useState<string | null>(null);

  const zoneObj = ZONES.find((z) => z.code === selectedZone) ?? ZONES[7];

  // banded gradient stops (north violet → south coral)
  const gradientCss = ZONES
    .slice()
    .map((z, i) => {
      const start = (i / ZONES.length) * 100;
      const end = ((i + 1) / ZONES.length) * 100;
      return `${z.color} ${start.toFixed(2)}% ${end.toFixed(2)}%`;
    })
    .join(", ");

  return (
    <>
      <style>{css}</style>
      <style>{`
        .zm-bands {
          background: linear-gradient(
            to bottom,
            ${gradientCss}
          );
        }
      `}</style>

      <div className="zm-shell">
        {/* Banded gradient backdrop */}
        <div className="zm-bands" aria-hidden />
        <div className="zm-bands-grain" aria-hidden />

        {/* TOP */}
        <header className="zm-top">
          <div className="zm-mark">
            <span className="zm-mark-dot" style={{ background: zoneObj.color }} aria-hidden />
            <span className="zm-mark-text">KPT — LAND DESIGN</span>
            <span className="zm-mark-zone">ZONE {selectedZone.toUpperCase()}</span>
          </div>
          <nav className="zm-nav" aria-label="Primary">
            <a className="zm-nav-link" href="#yourzone">Your zone</a>
            <a className="zm-nav-link" href="#bymap">By zone</a>
            <a className="zm-nav-link" href="#crossings">Zone crossings</a>
            <a className="zm-nav-link zm-nav-cta" href="#plan">Plan for my zone</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="zm-hero">
          <div className="zm-hero-lock">
            <p className="zm-hero-cite">USDA HARDINESS — 2026 REVISION</p>
            <h1 className="zm-headline">
              Zone <span className="zm-headline-num">{selectedZone}</span>.
              <br />
              Last frost <span className="zm-headline-mark">May 11</span>.
              <br />
              We plant on May 14.
            </h1>
            <p className="zm-sub">
              Residential and commercial landscape design and install — every
              spec checked against your hardiness zone, not a national catalog.
            </p>
            <div className="zm-cta-row">
              <a href="#plan" className="zm-cta zm-cta-primary">Plan for my zone</a>
              <a href="#bymap" className="zm-cta zm-cta-secondary">See zone-by-zone work</a>
            </div>
            <dl className="zm-hero-data">
              <div>
                <dt>Zone</dt>
                <dd>{selectedZone.toUpperCase()}</dd>
              </div>
              <div>
                <dt>Min winter</dt>
                <dd>{zoneObj.min}°F</dd>
              </div>
              <div>
                <dt>Last frost</dt>
                <dd>May 11</dd>
              </div>
              <div>
                <dt>Plant date</dt>
                <dd>May 14</dd>
              </div>
            </dl>
          </div>

          {/* Zone band picker */}
          <aside className="zm-picker" aria-label="Hardiness zone picker">
            <p className="zm-picker-label">PICK YOUR ZONE</p>
            <div className="zm-picker-bands">
              {ZONES.map((z) => (
                <button
                  type="button"
                  key={z.code}
                  className={`zm-picker-band${selectedZone === z.code ? " is-selected" : ""}`}
                  style={{ background: z.color }}
                  onClick={() => setSelectedZone(z.code)}
                  onMouseEnter={() => setSelectedZone(z.code)}
                  onFocus={() => setSelectedZone(z.code)}
                  aria-pressed={selectedZone === z.code}
                  aria-label={`Zone ${z.code}, minimum ${z.min} degrees`}
                >
                  <span className="zm-picker-band-code">{z.code}</span>
                  <span className="zm-picker-band-temp">{z.min}°F</span>
                </button>
              ))}
            </div>
          </aside>
        </section>

        {/* YOUR ZONE */}
        <section className="zm-section" id="yourzone">
          <header className="zm-section-head">
            <span className="zm-section-num">§ 01</span>
            <h2 className="zm-section-title">Your zone — services</h2>
            <p className="zm-section-kicker">
              Zone {selectedZone.toUpperCase()} services and timing. Pick a
              different zone above to see what changes.
            </p>
          </header>

          <ul className="zm-services">
            {ZONE_SERVICES.map((s, i) => (
              <li key={s.title} className="zm-service" style={{ "--accent": zoneObj.color } as React.CSSProperties}>
                <span className="zm-service-num">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="zm-service-title">{s.title}</h3>
                <p className="zm-service-body">{s.body}</p>
                <span className="zm-service-zone">ZONE {selectedZone.toUpperCase()}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* BY ZONE — SVG map with project dots */}
        <section className="zm-section" id="bymap">
          <header className="zm-section-head">
            <span className="zm-section-num">§ 02</span>
            <h2 className="zm-section-title">By zone — recent installs</h2>
            <p className="zm-section-kicker">
              Past projects as dots dropped onto the map. Hover or focus a dot
              to read the install.
            </p>
          </header>

          <div className="zm-map">
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="zm-map-svg" aria-hidden>
              {/* Banded gradient inside SVG so it scales */}
              {ZONES.map((z, i) => (
                <rect
                  key={z.code}
                  x="0"
                  y={(i / ZONES.length) * 100}
                  width="100"
                  height={100 / ZONES.length}
                  fill={z.color}
                />
              ))}
              {/* faint coastline-style lines */}
              <path d="M 6 28 Q 18 30 24 38 T 28 58 T 22 82 L 22 96" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="0.4" />
              <path d="M 92 14 Q 88 30 90 46 T 86 70 T 88 92" fill="none" stroke="rgba(0,0,0,0.18)" strokeWidth="0.4" />
            </svg>
            {/* zone code labels */}
            <div className="zm-map-labels" aria-hidden>
              {ZONES.map((z, i) => (
                <span
                  key={z.code}
                  className="zm-map-label"
                  style={{ top: `${((i + 0.5) / ZONES.length) * 100}%` }}
                >
                  {z.code}
                </span>
              ))}
            </div>

            {PROJECTS.map((p) => (
              <button
                type="button"
                key={p.id}
                className={`zm-pin${hoveredProject === p.id ? " is-hover" : ""}`}
                style={{ left: `${p.x}%`, top: `${p.y}%` }}
                onMouseEnter={() => setHoveredProject(p.id)}
                onMouseLeave={() => setHoveredProject((c) => (c === p.id ? null : c))}
                onFocus={() => setHoveredProject(p.id)}
                onBlur={() => setHoveredProject((c) => (c === p.id ? null : c))}
                aria-label={`${p.name}, Zone ${p.zone}`}
              >
                <span className="zm-pin-dot" />
                <span className="zm-pin-card" role="tooltip">
                  <span className="zm-pin-zone">ZONE {p.zone.toUpperCase()}</span>
                  <span className="zm-pin-name">{p.name}</span>
                  <span className="zm-pin-note">{p.note}</span>
                </span>
              </button>
            ))}
          </div>
        </section>

        {/* ZONE CROSSINGS */}
        <section className="zm-section" id="crossings">
          <header className="zm-section-head">
            <span className="zm-section-num">§ 03</span>
            <h2 className="zm-section-title">Zone crossings</h2>
            <p className="zm-section-kicker">
              Cultivars that span multiple zones. The serial type lists the
              range; our notes follow.
            </p>
          </header>

          <ul className="zm-cultivars">
            {CULTIVARS.map((c) => (
              <li key={c.name} className="zm-cultivar">
                <div className="zm-cultivar-meta">
                  <p className="zm-cultivar-zones">ZONES {c.zones}</p>
                  <h4 className="zm-cultivar-name">{c.name}</h4>
                </div>
                <p className="zm-cultivar-note">{c.note}</p>
              </li>
            ))}
          </ul>
        </section>

        {/* FOOTER */}
        <footer className="zm-foot" id="plan">
          <div className="zm-foot-credit">
            <p className="zm-foot-credit-line">
              Zone bands derived from USDA Plant Hardiness Zone Map, 2026
              revision. Frost dates from local NOAA cooperative observers.
            </p>
          </div>
          <div className="zm-foot-grid">
            <div>
              <p className="zm-foot-label">Designer</p>
              <p className="zm-foot-value">A. Halloran, ASLA — KPT Land Design</p>
            </div>
            <div>
              <p className="zm-foot-label">Affiliations</p>
              <p className="zm-foot-value">ASLA · Mass NLA · ISA arborist</p>
            </div>
            <div>
              <p className="zm-foot-label">Service area</p>
              <p className="zm-foot-value">Zones 5b–7a — Northeast corridor</p>
            </div>
            <div>
              <p className="zm-foot-label">Plan for my zone</p>
              <p className="zm-foot-value">
                <a className="zm-foot-link" href="#plan">zone@kpt-design.work</a>
              </p>
            </div>
          </div>
          <p className="zm-foot-rule">
            © KPT Land Design 2026 — Zone-checked. Frost-aware.
            Mulched to the property line.
          </p>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Archivo:wght@400;500;700;800&family=JetBrains+Mono:wght@400;500;700&family=Spectral:ital,wght@0,400;0,500;1,400&display=swap');

:root, .zm-shell {
  --void: #0E1B26;
  --void-2: #142634;
  --paper: #F2F5EF;
  --paper-soft: rgba(242,245,239,0.78);
  --paper-mute: rgba(242,245,239,0.45);
  --rule: rgba(242,245,239,0.18);
}

.zm-shell {
  position: relative;
  font-family: 'Archivo', system-ui, sans-serif;
  color: var(--paper);
  background: var(--void);
  max-width: 1320px;
  margin: 0 auto;
  padding: 32px 40px 80px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
}

.zm-bands {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  width: 18%;
  pointer-events: none;
  opacity: 0.95;
  animation: zm-bands-in 1500ms ease-out both;
}
@keyframes zm-bands-in {
  0% { opacity: 0; transform: translateX(40px); }
  100% { opacity: 0.95; transform: translateX(0); }
}
.zm-bands-grain {
  position: absolute;
  top: 0; right: 0; bottom: 0;
  width: 18%;
  pointer-events: none;
  background-image: radial-gradient(rgba(0,0,0,0.18) 1px, transparent 1px);
  background-size: 5px 5px;
  opacity: 0.4;
  mix-blend-mode: multiply;
}

/* TOP */
.zm-top {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 16px;
  border-bottom: 1px solid var(--rule);
  z-index: 2;
}
.zm-mark {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.16em;
}
.zm-mark-dot {
  width: 14px; height: 14px;
  border-radius: 50%;
  border: 1px solid rgba(0,0,0,0.4);
}
.zm-mark-zone {
  background: rgba(242,245,239,0.12);
  padding: 2px 8px;
  font-weight: 700;
  letter-spacing: 0.12em;
}
.zm-nav {
  display: flex;
  gap: 24px;
  font-size: 13px;
  font-weight: 500;
}
.zm-nav-link {
  color: var(--paper);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 2px;
  transition: border-color 160ms, color 160ms;
}
.zm-nav-link:hover, .zm-nav-link:focus-visible {
  border-bottom-color: var(--paper);
  outline: none;
}
.zm-nav-cta {
  background: var(--paper);
  color: var(--void);
  padding: 8px 14px;
  border-bottom: none;
  font-weight: 700;
}
.zm-nav-cta:hover, .zm-nav-cta:focus-visible {
  background: #FFFFFF;
  color: var(--void);
}

/* HERO */
.zm-hero {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 240px;
  gap: 48px;
  margin-top: 48px;
  margin-bottom: 96px;
  z-index: 2;
}
@media (max-width: 880px) { .zm-hero { grid-template-columns: 1fr; } }

.zm-hero-lock { max-width: 760px; }
.zm-hero-cite {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.2em;
  color: var(--paper-soft);
  margin: 0 0 18px;
  font-weight: 700;
}
.zm-headline {
  font-family: 'Archivo', sans-serif;
  font-weight: 800;
  font-stretch: 130%;
  font-size: clamp(46px, 7vw, 96px);
  line-height: 0.96;
  letter-spacing: -0.02em;
  margin: 0 0 26px;
  text-transform: uppercase;
}
.zm-headline-num {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-stretch: normal;
  display: inline-block;
  background: var(--paper);
  color: var(--void);
  padding: 0 12px;
  letter-spacing: 0.04em;
  font-size: 0.78em;
  vertical-align: 8px;
  text-transform: uppercase;
}
.zm-headline-mark {
  font-family: 'Spectral', Georgia, serif;
  font-style: italic;
  font-weight: 400;
  font-stretch: normal;
  text-transform: none;
  letter-spacing: -0.01em;
}
.zm-sub {
  font-family: 'Spectral', Georgia, serif;
  font-size: 18px;
  line-height: 1.55;
  max-width: 56ch;
  margin: 0 0 28px;
  color: var(--paper-soft);
}
.zm-cta-row { display: flex; gap: 14px; margin-bottom: 32px; flex-wrap: wrap; }
.zm-cta {
  font-family: 'Archivo', sans-serif;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.06em;
  text-decoration: none;
  padding: 12px 18px;
  border: 1.5px solid var(--paper);
  transition: background 160ms, color 160ms, transform 160ms;
}
.zm-cta-primary { background: var(--paper); color: var(--void); }
.zm-cta-primary:hover, .zm-cta-primary:focus-visible {
  background: transparent;
  color: var(--paper);
  outline: none;
  transform: translate(-2px, -2px);
}
.zm-cta-secondary { background: transparent; color: var(--paper); }
.zm-cta-secondary:hover, .zm-cta-secondary:focus-visible {
  background: var(--paper);
  color: var(--void);
  outline: none;
  transform: translate(-2px, -2px);
}

.zm-hero-data {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 18px 32px;
  border-top: 1px solid var(--rule);
  padding-top: 18px;
  margin: 0;
  font-family: 'JetBrains Mono', monospace;
}
.zm-hero-data dt {
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--paper-mute);
  text-transform: uppercase;
  margin-bottom: 4px;
}
.zm-hero-data dd {
  font-size: 18px;
  font-weight: 700;
  margin: 0;
}

/* PICKER */
.zm-picker {
  border: 1px solid var(--rule);
  background: rgba(14,27,38,0.6);
  backdrop-filter: blur(4px);
  padding: 16px;
}
.zm-picker-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  margin: 0 0 12px;
  color: var(--paper-soft);
  font-weight: 700;
}
.zm-picker-bands {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0,0,0,0.5);
}
.zm-picker-band {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: center;
  padding: 7px 10px;
  border: 0;
  cursor: pointer;
  font: inherit;
  text-align: left;
  color: rgba(0,0,0,0.78);
  transition: filter 160ms, padding 160ms;
}
.zm-picker-band:hover, .zm-picker-band:focus-visible {
  filter: brightness(1.12);
  outline: none;
  padding-left: 16px;
}
.zm-picker-band.is-selected {
  outline: 2px solid var(--paper);
  outline-offset: -2px;
  z-index: 2;
  padding-left: 16px;
}
.zm-picker-band-code {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.08em;
}
.zm-picker-band-temp {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.06em;
}

/* SECTIONS */
.zm-section { position: relative; margin-bottom: 96px; z-index: 2; }
.zm-section-head {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 24px 36px;
  align-items: baseline;
  margin-bottom: 36px;
  border-top: 1px solid var(--rule);
  padding-top: 24px;
}
.zm-section-num {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.16em;
  color: var(--paper-soft);
}
.zm-section-title {
  font-family: 'Archivo', sans-serif;
  font-weight: 800;
  font-stretch: 130%;
  font-size: clamp(28px, 4vw, 44px);
  letter-spacing: -0.01em;
  margin: 0;
  text-transform: uppercase;
}
.zm-section-kicker {
  grid-column: 2;
  font-family: 'Spectral', Georgia, serif;
  font-size: 16px;
  line-height: 1.55;
  max-width: 60ch;
  color: var(--paper-soft);
  margin: 0;
}

/* SERVICES */
.zm-services {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 24px;
}
@media (max-width: 720px) { .zm-services { grid-template-columns: 1fr; } }
.zm-service {
  position: relative;
  border: 1px solid var(--rule);
  padding: 24px 26px 22px;
  background: rgba(14,27,38,0.6);
  display: grid;
  grid-template-columns: auto 1fr;
  grid-template-rows: auto auto;
  column-gap: 16px;
  row-gap: 8px;
  transition: border-color 200ms, box-shadow 200ms;
}
.zm-service::before {
  content: "";
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  width: 4px;
  background: var(--accent, var(--paper));
  transition: width 200ms;
}
.zm-service:hover, .zm-service:focus-within {
  border-color: var(--accent, var(--paper));
  box-shadow: 0 0 0 1px var(--accent, var(--paper));
}
.zm-service:hover::before, .zm-service:focus-within::before { width: 8px; }
.zm-service-num {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--accent, var(--paper));
  align-self: center;
}
.zm-service-title {
  font-family: 'Archivo', sans-serif;
  font-weight: 700;
  font-size: 20px;
  margin: 0;
  letter-spacing: -0.01em;
}
.zm-service-body {
  grid-column: 2;
  font-family: 'Spectral', Georgia, serif;
  font-size: 15px;
  line-height: 1.55;
  color: var(--paper-soft);
  margin: 0;
}
.zm-service-zone {
  grid-column: 2;
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  color: var(--accent, var(--paper));
  font-weight: 700;
  align-self: end;
}

/* MAP */
.zm-map {
  position: relative;
  height: 500px;
  border: 1px solid var(--rule);
  overflow: hidden;
  background: var(--void-2);
}
.zm-map-svg { position: absolute; inset: 0; width: 100%; height: 100%; opacity: 0.92; }
.zm-map-labels {
  position: absolute;
  inset: 0;
  pointer-events: none;
}
.zm-map-label {
  position: absolute;
  left: 12px;
  transform: translateY(-50%);
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.08em;
  color: rgba(0,0,0,0.65);
  background: rgba(255,255,255,0.5);
  padding: 1px 6px;
}
.zm-pin {
  position: absolute;
  transform: translate(-50%, -50%);
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  font: inherit;
}
.zm-pin:focus-visible { outline: none; }
.zm-pin-dot {
  display: block;
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: var(--paper);
  border: 2px solid var(--void);
  box-shadow: 0 0 0 1px rgba(255,255,255,0.6);
  transition: transform 200ms, box-shadow 200ms;
}
.zm-pin:hover .zm-pin-dot, .zm-pin:focus-visible .zm-pin-dot, .zm-pin.is-hover .zm-pin-dot {
  transform: scale(1.4);
  box-shadow: 0 0 0 4px rgba(255,255,255,0.4), 0 0 16px rgba(255,255,255,0.5);
}
.zm-pin-card {
  position: absolute;
  bottom: calc(100% + 14px);
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  gap: 6px;
  width: 240px;
  background: var(--void);
  border: 1px solid var(--paper);
  padding: 14px 16px;
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms, transform 200ms;
}
.zm-pin:hover .zm-pin-card, .zm-pin:focus-visible .zm-pin-card, .zm-pin.is-hover .zm-pin-card {
  opacity: 1;
  transform: translateX(-50%) translateY(-4px);
}
.zm-pin-zone {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  color: var(--paper-soft);
  font-weight: 700;
}
.zm-pin-name {
  font-family: 'Archivo', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: -0.01em;
}
.zm-pin-note {
  font-family: 'Spectral', Georgia, serif;
  font-size: 13px;
  line-height: 1.45;
  color: var(--paper-soft);
}

/* CULTIVARS */
.zm-cultivars {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 0;
  border-top: 1px solid var(--rule);
}
.zm-cultivar {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 32px;
  padding: 22px 0;
  border-bottom: 1px solid var(--rule);
  transition: background 200ms;
}
.zm-cultivar:hover { background: rgba(242,245,239,0.04); }
.zm-cultivar-meta { display: flex; flex-direction: column; gap: 6px; }
.zm-cultivar-zones {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: var(--paper-soft);
  margin: 0;
  font-weight: 700;
}
.zm-cultivar-name {
  font-family: 'Spectral', Georgia, serif;
  font-style: italic;
  font-size: 22px;
  font-weight: 500;
  margin: 0;
  letter-spacing: -0.01em;
}
.zm-cultivar-note {
  font-family: 'Spectral', Georgia, serif;
  font-size: 15px;
  line-height: 1.6;
  color: var(--paper-soft);
  margin: 0;
}

/* FOOTER */
.zm-foot {
  position: relative;
  border-top: 4px solid var(--paper);
  padding-top: 36px;
  margin-top: 24px;
  z-index: 2;
}
.zm-foot-credit { margin-bottom: 28px; }
.zm-foot-credit-line {
  font-family: 'Spectral', Georgia, serif;
  font-style: italic;
  font-size: 14px;
  line-height: 1.6;
  color: var(--paper-soft);
  margin: 0;
  max-width: 60ch;
}
.zm-foot-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 28px;
}
@media (max-width: 720px) { .zm-foot-grid { grid-template-columns: repeat(2, 1fr); } }
.zm-foot-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--paper-soft);
  margin: 0 0 6px;
  font-weight: 700;
  text-transform: uppercase;
}
.zm-foot-value {
  font-family: 'Archivo', sans-serif;
  font-size: 14px;
  font-weight: 500;
  margin: 0;
  color: var(--paper);
}
.zm-foot-link {
  color: var(--paper);
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 3px;
}
.zm-foot-link:hover, .zm-foot-link:focus-visible { color: #FFFFFF; outline: none; }
.zm-foot-rule {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--paper-mute);
  border-top: 1px solid var(--rule);
  padding-top: 14px;
  margin: 0;
  letter-spacing: 0.06em;
}

@media (prefers-reduced-motion: reduce) {
  .zm-bands { animation: none !important; }
  .zm-pin-dot, .zm-pin-card, .zm-cta, .zm-nav-link, .zm-service, .zm-cultivar, .zm-picker-band {
    transition: none !important;
  }
}
`;
