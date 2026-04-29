"use client";

/**
 * ZoningOverlayEngine — V62 Zoning Overlay
 *
 * Municipal GIS zoning composition. Hatched parcel fields (R-1 yellow, M-2
 * plum, I-3 olive, C-2 sage), parcel boundaries, district codes. Hovering
 * a parcel pops a property card with zoning-driven scope. Reduced motion
 * holds the fill in place rather than west-to-east painting.
 */

import { useEffect, useState } from "react";

const RES = "#F4D75E";
const COMM = "#A8C36F";
const IND = "#6B3A6E";
const GREEN = "#8B9A4F";
const PARCEL_INK = "#1B1A18";
const PAPER = "#F4EFE3";

type Parcel = {
  id: string;
  name: string;
  district: "R-1" | "C-2" | "M-2" | "I-3" | "OS";
  address: string;
  parapet: string;
  setback: string;
  scope: string;
  x: number; y: number; w: number; h: number;
};

const PARCELS: Parcel[] = [
  { id: "P-014", name: "Tilt-Up Logistics Hub", district: "I-3", address: "1240 Industrial Blvd.", parapet: "42 in. min", setback: "25 ft front · 15 ft side", scope: "TPO mech-fastened · 24 sq · drains x6", x: 4, y: 6, w: 26, h: 22 },
  { id: "P-022", name: "Eastside Self-Storage", district: "M-2", address: "880 Rail St.", parapet: "36 in.", setback: "20 ft", scope: "EPDM ballasted · 18 sq · scupper rebuild", x: 32, y: 6, w: 18, h: 18 },
  { id: "P-031", name: "Strip Center · Forest Glen", district: "C-2", address: "44 Glen Ave.", parapet: "30 in. (legal nonconf.)", setback: "10 ft", scope: "TPO mech-fastened · 9 sq · 6 RTU curbs", x: 52, y: 6, w: 22, h: 14 },
  { id: "P-040", name: "Maple Court Townhomes", district: "R-1", address: "12-22 Maple Ct.", parapet: "n/a (pitched)", setback: "30 ft front", scope: "Asphalt arch shingle · 28 sq · ice & water", x: 76, y: 6, w: 20, h: 18 },
  { id: "P-103", name: "City Salt Shed", district: "OS", address: "Public Works Yd.", parapet: "n/a (gable)", setback: "n/a", scope: "Standing seam metal · 14 sq · municipal", x: 4, y: 30, w: 14, h: 16 },
  { id: "P-117", name: "Westgate Industrial Park · A", district: "I-3", address: "5400 Westgate Rd.", parapet: "48 in.", setback: "30 ft", scope: "TPO mech-fastened · 62 sq · gas-fired UH", x: 20, y: 30, w: 30, h: 26 },
  { id: "P-122", name: "Holiday Inn (8-story)", district: "C-2", address: "200 Forrester Pkwy.", parapet: "60 in. (height var.)", setback: "15 ft", scope: "PVC fully adhered · 18 sq · roof access", x: 52, y: 22, w: 22, h: 16 },
  { id: "P-145", name: "Forrester Heights · Block 4", district: "R-1", address: "44–88 Heights Dr.", parapet: "n/a (gable)", setback: "30 ft", scope: "Synthetic slate · 41 sq · valley metal", x: 76, y: 26, w: 20, h: 18 },
  { id: "P-201", name: "Greenway Parcel · Soccer", district: "OS", address: "Forrester Greenway", parapet: "—", setback: "—", scope: "(unbuilt · not in scope)", x: 4, y: 48, w: 22, h: 20 },
  { id: "P-218", name: "DPW Mech Yard", district: "M-2", address: "1100 Yard Rd.", parapet: "30 in.", setback: "10 ft", scope: "Mod-bit cap-sheet · 12 sq · ladder up", x: 28, y: 58, w: 18, h: 12 },
  { id: "P-227", name: "Eastfield Industrial · Phase II", district: "I-3", address: "5500 Eastfield Way", parapet: "48 in.", setback: "30 ft", scope: "TPO mech-fastened · 88 sq · phased", x: 48, y: 40, w: 26, h: 30 },
  { id: "P-240", name: "Forrester Heights · Block 5", district: "R-1", address: "112–148 Heights Dr.", parapet: "n/a (gable)", setback: "30 ft", scope: "Asphalt impact-rated · 58 sq", x: 76, y: 46, w: 20, h: 22 },
];

const LEGEND = [
  { code: "R-1", color: RES, name: "Residential · Single-family", hatch: "dots" },
  { code: "C-2", color: COMM, name: "Commercial · Strip / Hospitality", hatch: "diag" },
  { code: "M-2", color: IND, name: "Mixed-use · Light Industrial", hatch: "diag-r" },
  { code: "I-3", color: GREEN, name: "Industrial · Heavy", hatch: "cross" },
  { code: "OS",  color: "#C5D2C0", name: "Open Space / Parks", hatch: "dot-loose" },
];

const SETBACKS = [
  { dist: "R-1", front: "30 ft", side: "10 ft", rear: "20 ft", parapet: "n/a (pitched)" },
  { dist: "C-2", front: "10 ft", side: "5 ft", rear: "10 ft", parapet: "30 in. min" },
  { dist: "M-2", front: "20 ft", side: "10 ft", rear: "15 ft", parapet: "36 in. min" },
  { dist: "I-3", front: "30 ft", side: "15 ft", rear: "20 ft", parapet: "42 in. min" },
];

function fillForDistrict(d: Parcel["district"]): string {
  switch (d) {
    case "R-1": return RES;
    case "C-2": return COMM;
    case "M-2": return IND;
    case "I-3": return GREEN;
    case "OS":  return "#C5D2C0";
  }
}

function patternIdFor(d: Parcel["district"]): string {
  switch (d) {
    case "R-1": return "p-r1";
    case "C-2": return "p-c2";
    case "M-2": return "p-m2";
    case "I-3": return "p-i3";
    case "OS":  return "p-os";
  }
}

export default function ZoningOverlayEngine() {
  const [active, setActive] = useState<string | null>(null);
  const [reduced, setReduced] = useState(false);
  const [filter, setFilter] = useState<Parcel["district"] | "ALL">("ALL");

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  const visibleParcels = filter === "ALL" ? PARCELS : PARCELS.filter((p) => p.district === filter);
  const activeParcel = PARCELS.find((p) => p.id === active) ?? null;

  return (
    <>
      <style>{css}</style>
      <div className="zo-shell">
        {/* MASTHEAD */}
        <header className="zo-mast">
          <div className="zo-mark">
            <span className="zo-mark-stamp" aria-hidden>
              <svg viewBox="0 0 64 64" width="40" height="40">
                <circle cx="32" cy="32" r="28" fill="none" stroke={PARCEL_INK} strokeWidth="1.4" />
                <circle cx="32" cy="32" r="22" fill="none" stroke={PARCEL_INK} strokeWidth="0.8" strokeDasharray="2 2" />
                <text x="32" y="36" textAnchor="middle" fontSize="9" fontFamily="monospace" fill={PARCEL_INK}>GIS</text>
              </svg>
            </span>
            <div>
              <span className="zo-mark-name">FORRESTER ROOFING CO.</span>
              <span className="zo-mark-est">Commercial · industrial · permitted</span>
            </div>
          </div>
          <nav className="zo-nav" aria-label="Primary">
            <a href="#by-district">By district</a>
            <a href="#setbacks">The setback</a>
            <a href="#map">The map</a>
            <a href="#contact">Bid request</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="zo-hero">
          <div className="zo-eyebrow">CITY OF FORRESTER · ZONING OVERLAY · DRAWN AT 1:600 · REV. 14</div>
          <h1 className="zo-headline">
            Permitted use.<br />
            Setback.<br />
            Parapet height.<br />
            <span className="zo-headline-emph">Roof load to code.</span>
          </h1>
          <p className="zo-sub">
            Commercial roofing on tilt-up, retail, and industrial — every spec
            checked against the zoning overlay before we bid. Architects send
            us the parcel, we send back the scope your AHJ will sign.
          </p>
          <div className="zo-cta-row">
            <a className="zo-cta zo-cta-primary" href="#map">Check my zone</a>
            <a className="zo-cta" href="#by-district">Read the overlay</a>
          </div>

          <div className="zo-legend">
            <span className="zo-legend-title">LEGEND · CITY MUNICIPAL CODE § 14.04</span>
            <ul>
              {LEGEND.map((l) => (
                <li key={l.code}>
                  <span className="zo-legend-swatch" style={{ background: l.color }} aria-hidden />
                  <span className="zo-legend-code">{l.code}</span>
                  <span className="zo-legend-name">{l.name}</span>
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* THE MAP */}
        <section id="map" className="zo-map-section">
          <div className="zo-h2-row">
            <h2 className="zo-h2">The map</h2>
            <span className="zo-aside">Hover or focus a parcel — the property card pops.</span>
          </div>

          <div className="zo-map-controls">
            <span className="zo-control-label">FILTER · DISTRICT</span>
            {(["ALL", "R-1", "C-2", "M-2", "I-3", "OS"] as const).map((k) => (
              <button
                key={k}
                type="button"
                className={`zo-filter${filter === k ? " is-on" : ""}`}
                onClick={() => setFilter(k)}
                aria-pressed={filter === k}
              >
                {k}
              </button>
            ))}
          </div>

          <div className="zo-map-frame">
            <svg viewBox="0 0 100 75" preserveAspectRatio="none" className={reduced ? "zo-map zo-map-reduced" : "zo-map"} role="img" aria-labelledby="map-title">
              <title id="map-title">Forrester zoning overlay with twelve parcels</title>
              <defs>
                <pattern id="p-r1" patternUnits="userSpaceOnUse" width="2" height="2">
                  <rect width="2" height="2" fill={RES} />
                  <circle cx="0.5" cy="0.5" r="0.18" fill="rgba(0,0,0,0.55)" />
                </pattern>
                <pattern id="p-c2" patternUnits="userSpaceOnUse" width="2" height="2" patternTransform="rotate(45)">
                  <rect width="2" height="2" fill={COMM} />
                  <line x1="0" x2="2" y1="0" y2="0" stroke="rgba(0,0,0,0.45)" strokeWidth="0.18" />
                </pattern>
                <pattern id="p-m2" patternUnits="userSpaceOnUse" width="2" height="2" patternTransform="rotate(-45)">
                  <rect width="2" height="2" fill={IND} />
                  <line x1="0" x2="2" y1="0" y2="0" stroke="rgba(255,255,255,0.45)" strokeWidth="0.22" />
                </pattern>
                <pattern id="p-i3" patternUnits="userSpaceOnUse" width="2" height="2">
                  <rect width="2" height="2" fill={GREEN} />
                  <line x1="0" x2="2" y1="0" y2="0" stroke="rgba(0,0,0,0.4)" strokeWidth="0.18" />
                  <line x1="0" x2="0" y1="0" y2="2" stroke="rgba(0,0,0,0.4)" strokeWidth="0.18" />
                </pattern>
                <pattern id="p-os" patternUnits="userSpaceOnUse" width="3" height="3">
                  <rect width="3" height="3" fill="#C5D2C0" />
                  <circle cx="1.5" cy="1.5" r="0.18" fill="rgba(0,0,0,0.32)" />
                </pattern>
                <clipPath id="reveal-mask">
                  <rect className="zo-reveal" x="0" y="0" width="100" height="75" />
                </clipPath>
              </defs>

              <rect x="0" y="0" width="100" height="75" fill={PAPER} />

              <g clipPath={reduced ? undefined : "url(#reveal-mask)"}>
                {PARCELS.map((p) => {
                  const isActive = active === p.id;
                  const isFiltered = filter !== "ALL" && p.district !== filter;
                  return (
                    <g key={p.id} className={`zo-parcel${isActive ? " is-active" : ""}${isFiltered ? " is-dim" : ""}`}>
                      <rect
                        x={p.x}
                        y={p.y}
                        width={p.w}
                        height={p.h}
                        fill={`url(#${patternIdFor(p.district)})`}
                        stroke={PARCEL_INK}
                        strokeWidth={isActive ? 0.5 : 0.22}
                      />
                      <text
                        x={p.x + p.w / 2}
                        y={p.y + p.h / 2 + 0.6}
                        fontSize="2"
                        fontFamily="Söhne, Inter, system-ui"
                        fontWeight="700"
                        textAnchor="middle"
                        fill={p.district === "M-2" ? "#FFF8EE" : PARCEL_INK}
                        style={{ pointerEvents: "none", letterSpacing: "0.06em" }}
                      >
                        {p.id} · {p.district}
                      </text>
                      <rect
                        x={p.x}
                        y={p.y}
                        width={p.w}
                        height={p.h}
                        fill="transparent"
                        style={{ cursor: "pointer", pointerEvents: "all" }}
                        tabIndex={0}
                        onMouseEnter={() => setActive(p.id)}
                        onMouseLeave={() => setActive((cur) => (cur === p.id ? null : cur))}
                        onFocus={() => setActive(p.id)}
                        onBlur={() => setActive((cur) => (cur === p.id ? null : cur))}
                      >
                        <title>{p.name} · {p.district}</title>
                      </rect>
                    </g>
                  );
                })}
              </g>

              {/* Compass + scale */}
              <g transform="translate(2 65)" style={{ pointerEvents: "none" }}>
                <text x="0" y="0" fontSize="1.6" fill={PARCEL_INK} fontFamily="monospace">N</text>
                <line x1="1.4" y1="-0.4" x2="1.4" y2="-3.4" stroke={PARCEL_INK} strokeWidth="0.22" />
                <polygon points="1.4,-3.6 1.0,-2.8 1.8,-2.8" fill={PARCEL_INK} />
              </g>
              <g transform="translate(80 70)" style={{ pointerEvents: "none" }}>
                <line x1="0" y1="0" x2="14" y2="0" stroke={PARCEL_INK} strokeWidth="0.22" />
                <line x1="0" y1="-0.6" x2="0" y2="0.6" stroke={PARCEL_INK} strokeWidth="0.22" />
                <line x1="7" y1="-0.4" x2="7" y2="0.4" stroke={PARCEL_INK} strokeWidth="0.22" />
                <line x1="14" y1="-0.6" x2="14" y2="0.6" stroke={PARCEL_INK} strokeWidth="0.22" />
                <text x="0" y="2.2" fontSize="1.4" fill={PARCEL_INK} fontFamily="monospace">0</text>
                <text x="13" y="2.2" fontSize="1.4" fill={PARCEL_INK} fontFamily="monospace">600 ft</text>
              </g>
            </svg>

            {activeParcel && (
              <aside className="zo-card" role="status" aria-live="polite">
                <div className="zo-card-head">
                  <span className="zo-card-id">{activeParcel.id}</span>
                  <span className="zo-card-dist" style={{ background: fillForDistrict(activeParcel.district) }}>
                    {activeParcel.district}
                  </span>
                </div>
                <h3>{activeParcel.name}</h3>
                <span className="zo-card-addr">{activeParcel.address}</span>
                <dl>
                  <dt>Parapet</dt><dd>{activeParcel.parapet}</dd>
                  <dt>Setback</dt><dd>{activeParcel.setback}</dd>
                  <dt>Scope</dt><dd>{activeParcel.scope}</dd>
                </dl>
              </aside>
            )}
          </div>
        </section>

        {/* BY DISTRICT */}
        <section id="by-district" className="zo-district-section">
          <div className="zo-h2-row">
            <h2 className="zo-h2">By district</h2>
            <span className="zo-aside">Past projects, grouped by zoning.</span>
          </div>
          <div className="zo-district-grid">
            {LEGEND.filter((l) => l.code !== "OS").map((l) => {
              const projects = PARCELS.filter((p) => p.district === l.code);
              return (
                <article key={l.code} className="zo-district-card">
                  <header>
                    <span className="zo-district-swatch" style={{ background: l.color }} aria-hidden />
                    <span className="zo-district-code">{l.code}</span>
                    <span className="zo-district-name">{l.name}</span>
                  </header>
                  <ul>
                    {projects.map((p) => (
                      <li key={p.id}>
                        <span className="zo-pid">{p.id}</span>
                        <span className="zo-pname">{p.name}</span>
                        <span className="zo-pscope">{p.scope}</span>
                      </li>
                    ))}
                    {projects.length === 0 && <li className="zo-empty">— No active scope in this district —</li>}
                  </ul>
                </article>
              );
            })}
          </div>
        </section>

        {/* THE SETBACK */}
        <section id="setbacks" className="zo-setback-section">
          <div className="zo-h2-row">
            <h2 className="zo-h2">The setback</h2>
            <span className="zo-aside">Zoning constrains the roof — every district draws differently.</span>
          </div>
          <div className="zo-setback-grid">
            <table className="zo-setback-table">
              <thead>
                <tr>
                  <th>District</th>
                  <th>Front</th>
                  <th>Side</th>
                  <th>Rear</th>
                  <th>Parapet</th>
                </tr>
              </thead>
              <tbody>
                {SETBACKS.map((s) => (
                  <tr key={s.dist}>
                    <td><span className="zo-tag-cell">{s.dist}</span></td>
                    <td>{s.front}</td>
                    <td>{s.side}</td>
                    <td>{s.rear}</td>
                    <td>{s.parapet}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="zo-setback-diagram" aria-hidden>
              <svg viewBox="0 0 220 140">
                <rect x="0" y="0" width="220" height="140" fill="#FAF6EC" stroke={PARCEL_INK} strokeWidth="0.6" />
                <rect x="60" y="40" width="100" height="60" fill={fillForDistrict("I-3")} stroke={PARCEL_INK} strokeWidth="0.8" />
                <text x="110" y="74" textAnchor="middle" fontSize="9" fontFamily="monospace" fontWeight="700">PARCEL · I-3</text>
                <line x1="0" y1="40" x2="220" y2="40" stroke={PARCEL_INK} strokeWidth="0.4" strokeDasharray="2 2" />
                <line x1="0" y1="100" x2="220" y2="100" stroke={PARCEL_INK} strokeWidth="0.4" strokeDasharray="2 2" />
                <line x1="60" y1="0" x2="60" y2="140" stroke={PARCEL_INK} strokeWidth="0.4" strokeDasharray="2 2" />
                <line x1="160" y1="0" x2="160" y2="140" stroke={PARCEL_INK} strokeWidth="0.4" strokeDasharray="2 2" />
                <text x="30" y="22" fontSize="8" fontFamily="monospace">FRONT 30&apos;</text>
                <text x="180" y="22" fontSize="8" fontFamily="monospace">SIDE 15&apos;</text>
                <text x="30" y="120" fontSize="8" fontFamily="monospace">FRONT 30&apos;</text>
                <text x="180" y="120" fontSize="8" fontFamily="monospace">REAR 20&apos;</text>
                <line x1="60" y1="40" x2="60" y2="30" stroke="#A23116" strokeWidth="1.2" />
                <text x="64" y="32" fontSize="7" fontFamily="monospace" fill="#A23116">PARAPET 42&quot;</text>
              </svg>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="zo-foot">
          <div className="zo-foot-rule" aria-hidden />
          <div className="zo-foot-grid">
            <div>
              <span className="zo-foot-tag">FORRESTER ROOFING CO.</span>
              <span>14 Concord Way</span>
              <span>Forrester, MA · 01505</span>
            </div>
            <div>
              <span className="zo-foot-tag">LICENSE</span>
              <span>MA HIC #178204</span>
              <span>NRCA · CertainTeed Master</span>
            </div>
            <div>
              <span className="zo-foot-tag">JURISDICTION</span>
              <span>City of Forrester · AHJ</span>
              <span>IBC 2021 · IECC 2021</span>
            </div>
            <div>
              <span className="zo-foot-tag">BID</span>
              <span>+1 (978) 555-0167</span>
              <span>bids@forrester-roofing.example</span>
            </div>
          </div>
          <div className="zo-foot-stamp">[ DRAWN BY · FORRESTER ROOFING · GIS REV. 14 · APPROVED FOR BID ]</div>
        </footer>
      </div>
    </>
  );
}

const css = `
  .zo-shell {
    --paper: ${PAPER};
    --paper-2: #FAF6EC;
    --ink: ${PARCEL_INK};
    --ink-soft: rgba(27,26,24,0.7);
    --rule: rgba(27,26,24,0.22);
    --res: ${RES};
    --comm: ${COMM};
    --ind: ${IND};
    --green: ${GREEN};
    background: var(--paper);
    color: var(--ink);
    min-height: 100vh;
    font-family: "Söhne", "Söhne Buch", Inter, "Helvetica Neue", system-ui, sans-serif;
    padding: clamp(24px, 4vw, 56px);
    box-sizing: border-box;
  }

  .zo-mast {
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    border-bottom: 2px solid var(--ink);
    padding-bottom: 14px;
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 16px;
  }
  .zo-mark { display: flex; gap: 12px; align-items: center; }
  .zo-mark-stamp { display: inline-flex; }
  .zo-mark-name { display: block; font-weight: 700; letter-spacing: 0.14em; font-size: 14px; text-transform: uppercase; }
  .zo-mark-est { display: block; font-size: 11px; color: var(--ink-soft); letter-spacing: 0.06em; }

  .zo-nav { display: flex; gap: 22px; flex-wrap: wrap; }
  .zo-nav a {
    color: var(--ink);
    text-decoration: none;
    font-size: 13px;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    border-bottom: 2px solid transparent;
    padding-bottom: 2px;
    transition: border-color 160ms ease, color 160ms ease;
  }
  .zo-nav a:hover, .zo-nav a:focus-visible { border-color: var(--ind); color: var(--ind); outline: none; }

  .zo-hero {
    border: 2px solid var(--ink);
    background: var(--paper-2);
    padding: clamp(22px, 4vw, 44px);
    margin-bottom: 36px;
    box-shadow: 8px 8px 0 var(--ink);
  }
  .zo-eyebrow {
    font-size: 11px;
    letter-spacing: 0.18em;
    color: var(--ink-soft);
    text-transform: uppercase;
    font-family: monospace;
    margin-bottom: 22px;
  }
  .zo-headline {
    font-family: "Söhne Breit Halbfett", "Söhne", Inter, system-ui, sans-serif;
    font-weight: 700;
    font-size: clamp(36px, 5.6vw, 84px);
    line-height: 0.96;
    letter-spacing: -0.02em;
    margin: 0 0 20px;
  }
  .zo-headline-emph {
    background: var(--res);
    padding: 0 8px;
    box-shadow: 0 0 0 2px var(--ink);
  }
  .zo-sub {
    font-size: 17px;
    line-height: 1.5;
    max-width: 60ch;
    color: #2A2925;
    margin: 0 0 28px;
  }
  .zo-cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 28px; }
  .zo-cta {
    display: inline-block;
    padding: 12px 22px;
    background: transparent;
    color: var(--ink);
    border: 2px solid var(--ink);
    text-decoration: none;
    font-weight: 700;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    font-size: 12px;
    transition: transform 140ms ease, background 140ms ease, color 140ms ease;
  }
  .zo-cta:hover, .zo-cta:focus-visible { background: var(--ink); color: var(--paper); transform: translate(-2px,-2px); box-shadow: 4px 4px 0 var(--ind); outline: none; }
  .zo-cta-primary { background: var(--ind); color: #FFF; border-color: var(--ind); }
  .zo-cta-primary:hover, .zo-cta-primary:focus-visible { background: #4D2A50; }

  .zo-legend { border-top: 1px solid var(--rule); padding-top: 16px; }
  .zo-legend-title {
    display: block;
    font-family: monospace;
    font-size: 11px;
    letter-spacing: 0.16em;
    color: var(--ink-soft);
    margin-bottom: 12px;
  }
  .zo-legend ul { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 6px 16px; }
  .zo-legend li { display: flex; align-items: center; gap: 8px; font-size: 13px; }
  .zo-legend-swatch { width: 14px; height: 14px; border: 1px solid var(--ink); }
  .zo-legend-code { font-family: monospace; font-weight: 700; letter-spacing: 0.08em; min-width: 32px; }
  .zo-legend-name { color: var(--ink-soft); font-size: 12px; }

  .zo-h2-row { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; flex-wrap: wrap; margin-bottom: 14px; }
  .zo-h2 {
    font-family: "Söhne Breit Halbfett", "Söhne", Inter, system-ui, sans-serif;
    font-weight: 700;
    font-size: clamp(24px, 3.4vw, 40px);
    margin: 0;
    letter-spacing: -0.01em;
  }
  .zo-aside { font-size: 12px; color: var(--ink-soft); letter-spacing: 0.06em; }

  .zo-map-section { padding: 24px 0; border-top: 1px solid var(--rule); margin-bottom: 28px; }
  .zo-map-controls { display: flex; flex-wrap: wrap; gap: 6px; align-items: center; margin-bottom: 14px; }
  .zo-control-label { font-family: monospace; font-size: 11px; letter-spacing: 0.16em; color: var(--ink-soft); margin-right: 4px; }
  .zo-filter {
    background: var(--paper-2);
    border: 1.5px solid var(--ink);
    padding: 6px 12px;
    font-family: monospace;
    letter-spacing: 0.1em;
    font-size: 12px;
    cursor: pointer;
    color: var(--ink);
    transition: background 140ms ease, color 140ms ease;
  }
  .zo-filter:hover, .zo-filter:focus-visible { background: var(--ink); color: var(--paper); outline: none; }
  .zo-filter.is-on { background: var(--ind); color: #FFF; border-color: var(--ind); }

  .zo-map-frame {
    position: relative;
    border: 2px solid var(--ink);
    background: var(--paper-2);
    box-shadow: 6px 6px 0 var(--ink);
  }
  .zo-map { display: block; width: 100%; height: auto; aspect-ratio: 100 / 75; }
  .zo-reveal { animation: zo-reveal 1500ms cubic-bezier(0.4, 0, 0.2, 1) both; transform-origin: 0 50%; }
  @keyframes zo-reveal {
    0% { transform: scaleX(0); }
    100% { transform: scaleX(1); }
  }
  @media (prefers-reduced-motion: reduce) {
    .zo-reveal { animation: none; }
  }
  .zo-map-reduced .zo-reveal { animation: none; }

  .zo-parcel { transition: opacity 200ms ease; }
  .zo-parcel.is-dim { opacity: 0.18; }
  .zo-parcel.is-active rect { filter: drop-shadow(0 0 1.2px ${PARCEL_INK}); }
  .zo-parcel rect[tabindex]:focus { outline: 2px solid var(--ind); outline-offset: -1px; }

  .zo-card {
    position: absolute;
    top: 16px;
    right: 16px;
    width: clamp(220px, 28%, 320px);
    background: var(--paper);
    border: 2px solid var(--ink);
    padding: 12px 14px;
    box-shadow: 4px 4px 0 var(--ink);
    font-size: 13px;
    pointer-events: none;
  }
  .zo-card-head { display: flex; gap: 10px; align-items: center; margin-bottom: 6px; }
  .zo-card-id { font-family: monospace; font-weight: 700; letter-spacing: 0.1em; }
  .zo-card-dist {
    font-family: monospace;
    font-weight: 700;
    letter-spacing: 0.06em;
    padding: 2px 6px;
    border: 1.5px solid var(--ink);
    color: var(--ink);
  }
  .zo-card h3 { margin: 0 0 4px; font-size: 16px; line-height: 1.2; }
  .zo-card-addr { color: var(--ink-soft); font-size: 12px; display: block; margin-bottom: 8px; }
  .zo-card dl { margin: 0; display: grid; grid-template-columns: 80px 1fr; gap: 4px 8px; font-size: 12px; }
  .zo-card dt { font-family: monospace; color: var(--ink-soft); letter-spacing: 0.06em; text-transform: uppercase; }
  .zo-card dd { margin: 0; }

  .zo-district-section { padding: 24px 0; border-top: 1px solid var(--rule); margin-bottom: 28px; }
  .zo-district-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    gap: 18px;
  }
  .zo-district-card {
    background: var(--paper);
    border: 1.5px solid var(--ink);
    padding: 16px;
    transition: transform 200ms ease, box-shadow 200ms ease;
  }
  .zo-district-card:hover, .zo-district-card:focus-within {
    transform: translate(-2px,-2px);
    box-shadow: 4px 4px 0 var(--ink);
  }
  .zo-district-card header { display: flex; align-items: center; gap: 8px; padding-bottom: 8px; border-bottom: 2px solid var(--ink); margin-bottom: 10px; }
  .zo-district-swatch { width: 14px; height: 14px; border: 1px solid var(--ink); }
  .zo-district-code { font-family: monospace; font-weight: 700; letter-spacing: 0.08em; }
  .zo-district-name { font-size: 12px; color: var(--ink-soft); margin-left: auto; text-align: right; }
  .zo-district-card ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 6px; }
  .zo-district-card li {
    display: grid;
    grid-template-columns: 56px 1fr;
    grid-template-rows: auto auto;
    gap: 2px 10px;
    padding: 6px 0;
    border-bottom: 1px dashed var(--rule);
    font-size: 13px;
  }
  .zo-district-card li:last-child { border-bottom: none; }
  .zo-pid { grid-row: 1 / span 2; font-family: monospace; font-weight: 700; color: var(--ink); }
  .zo-pname { font-weight: 600; }
  .zo-pscope { font-size: 12px; color: var(--ink-soft); }
  .zo-empty { font-style: italic; color: var(--ink-soft); }

  .zo-setback-section { padding: 24px 0; border-top: 1px solid var(--rule); margin-bottom: 32px; }
  .zo-setback-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 22px; align-items: stretch; }
  @media (max-width: 760px) { .zo-setback-grid { grid-template-columns: 1fr; } }
  .zo-setback-table {
    width: 100%;
    border-collapse: collapse;
    font-size: 13px;
    background: var(--paper);
    border: 1.5px solid var(--ink);
  }
  .zo-setback-table th, .zo-setback-table td {
    border-bottom: 1px solid var(--rule);
    border-right: 1px dashed var(--rule);
    padding: 10px 12px;
    text-align: left;
  }
  .zo-setback-table th {
    background: var(--ink);
    color: var(--paper);
    font-family: monospace;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    font-size: 11px;
    font-weight: 600;
  }
  .zo-tag-cell {
    display: inline-block;
    padding: 2px 8px;
    border: 1.5px solid var(--ink);
    font-family: monospace;
    font-weight: 700;
    letter-spacing: 0.08em;
  }
  .zo-setback-table tr:hover td { background: var(--paper-2); }
  .zo-setback-diagram {
    background: var(--paper-2);
    border: 1.5px solid var(--ink);
    padding: 12px;
  }
  .zo-setback-diagram svg { width: 100%; height: auto; display: block; }

  .zo-foot {
    border-top: 2px solid var(--ink);
    padding-top: 20px;
    margin-top: 16px;
  }
  .zo-foot-rule {
    height: 8px;
    background: repeating-linear-gradient(90deg, var(--ind) 0 12px, var(--paper) 12px 18px);
    margin-bottom: 22px;
  }
  .zo-foot-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
    gap: 22px;
    font-size: 13px;
    line-height: 1.55;
    margin-bottom: 22px;
  }
  .zo-foot-grid > div { display: flex; flex-direction: column; gap: 4px; }
  .zo-foot-tag {
    font-family: monospace;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ind);
    font-size: 11px;
    margin-bottom: 4px;
    font-weight: 700;
  }
  .zo-foot-stamp {
    font-family: monospace;
    text-align: center;
    font-size: 12px;
    letter-spacing: 0.18em;
    color: var(--ink-soft);
    border-top: 1px dashed var(--rule);
    padding-top: 16px;
  }
`;
