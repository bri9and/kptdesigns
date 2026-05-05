"use client";

/**
 * StencilYardEngine — V43 Stencil Yard
 *
 * DOT-spec paving company. Highway Gothic stenciled headlines on dust-gray
 * ground, hi-vis-orange cone-stripe loaders, ANSI Z535 placard sections.
 * Stencil-on entrance for headings; cone-stripe scroll loaders.
 */

import { useEffect, useRef, useState } from "react";

const SPEC_PAGES = [
  {
    section: "401.03",
    title: "MAT TEMPERATURE",
    body:
      "Compaction window opens at 290°F mat behind the screed and closes by the time the rear roller crosses the joint. Probe taken in the windrow every 200 feet of paved length and at every load-truck transition.",
    bullets: ["Probe at windrow centerline", "Three temps per truck logged", "12 mph crosswind = abort"],
  },
  {
    section: "401.07",
    title: "JOINT DENSITY",
    body:
      "Longitudinal joints cored at 250-foot intervals on every shift. Density target 92.0% Gmm minimum, full-depth core in the cold lane within four inches of the seam. Failed cores trigger a notch-and-wedge correction by morning.",
    bullets: ["≥ 92.0% Gmm at the joint", "Cores at 250 ft on-shift", "Notch-wedge if failed"],
  },
  {
    section: "402.11",
    title: "TACK COAT",
    body:
      "CSS-1h emulsion at 0.05 gal/SY on milled surfaces, 0.03 gal/SY on existing pavement. Distributor calibrated weekly. No traffic on tack until break is full and the sheen has gone matte under the inspector's torch.",
    bullets: ["CSS-1h, distributor-applied", "Weekly calibration on file", "Inspector torch-test prior to mat"],
  },
  {
    section: "403.05",
    title: "MILL & FILL",
    body:
      "Standard mill depth 2 inches with milled-surface texture verified before tack. Recovered RAP returned to the plant under load ticket. Storm grates raised, manholes plated and warning-marked before traffic restoration.",
    bullets: ["2.0 in. mill standard", "RAP returned by ticket", "Castings raised same day"],
  },
];

const FLEET = [
  { make: "LeeBoy", model: "8520C", serial: "LB-8520-7741", lastCert: "MAR 17 — 2026", note: "Commercial-duty paver, 10-foot screed, dual extension." },
  { make: "Asphalt Zipper", model: "AZ480", serial: "AZ-480-2218", lastCert: "FEB 02 — 2026", note: "Reclaimer / stabilizer for full-depth pulverization." },
  { make: "Caterpillar", model: "CB-44B", serial: "CAT-44B-9914", lastCert: "MAR 30 — 2026", note: "Tandem vibratory roller, intelligent compaction package." },
  { make: "Etnyre", model: "Black Topper", serial: "ETN-BTP-3306", lastCert: "JAN 22 — 2026", note: "8,500-gal distributor, computer-rate-controlled tack." },
  { make: "Volvo", model: "DD120C", serial: "VOL-120-1183", lastCert: "FEB 14 — 2026", note: "Articulated tandem, 84-inch drum for mainline mat." },
  { make: "Bomag", model: "BW 24RH", serial: "BOM-24R-4072", lastCert: "MAR 09 — 2026", note: "Pneumatic-tire roller, finish kneading on shoulder pulls." },
];

const Z535 = [
  { color: "#FBD200", header: "CAUTION", body: "Hot mix surface — surface temperature exceeds 290°F at delivery. PPE required within 10 ft of windrow." },
  { color: "#FF7B1F", header: "WARNING", body: "Active screed — operator on platform. Ground crew remains in line-of-sight at all times. Spotter required at every transition." },
  { color: "#C8302E", header: "DANGER", body: "Roller drum — pinch and crush hazard. Drum offset reduces by 6 in. on every pass; no foot traffic in offset shadow." },
];

const PROJECTS = [
  { ref: "PROJ 26-441", owner: "Worcester DPW", scope: "Mill-and-fill, 2.0 in., 4-lane arterial, 1.4 mi.", traffic: "Night shifts, single-lane shed", price: "—" },
  { ref: "PROJ 26-388", owner: "Hampshire County", scope: "Full-depth reclaim 12 in., 2.5 in. base lift + 1.5 in. surface, 2.6 mi.", traffic: "Detour with flagger", price: "—" },
  { ref: "PROJ 26-217", owner: "Mass DOT D2", scope: "Joint-density rehab, longitudinal saw-and-seal, 8.1 mi.", traffic: "Mobile lane closure", price: "—" },
  { ref: "PROJ 26-099", owner: "Town of Holden", scope: "Lot pave + sealcoat, 86,000 SF, 4 in. binder + 1.5 in. top.", traffic: "Off-hours phasing", price: "—" },
];

export default function StencilYardEngine() {
  const [stencilOn, setStencilOn] = useState(false);
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const t = setTimeout(() => setStencilOn(true), 250);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number(e.target.getAttribute("data-spec-idx"));
          if (e.isIntersecting) {
            setRevealed((prev) => {
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
    sectionRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="sy-shell">
        <div className="sy-grit" aria-hidden />
        <div className="sy-cone-band" aria-hidden />

        <header className="sy-top">
          <div className="sy-prequal">
            <span className="sy-prequal-label">PREQUAL</span>
            <span className="sy-prequal-num">DOT-D2 / Cls. 5 / 26-A</span>
          </div>
          <div className="sy-placard" role="img" aria-label="Road crew working — stencils approved placard">
            <span className="sy-placard-line">ROAD CREW WORKING</span>
            <span className="sy-placard-sub">STENCILS APPROVED · 04 · 28</span>
          </div>
        </header>

        <section className="sy-hero">
          <div className="sy-hero-tag">
            <span className="sy-hero-tag-mark" aria-hidden />
            <span>SPEC BOOK · SECTION 400 — HMA PAVING</span>
            <span className="sy-hero-tag-mark" aria-hidden />
          </div>
          <h1 className={`sy-hero-h1${stencilOn ? " on" : ""}`}>
            <span className="sy-stencil-line">MILL AND FILL.</span>
            <span className="sy-stencil-line">TACK COAT.</span>
            <span className="sy-stencil-line">JOINT DENSITY HOLDS AT 92.</span>
          </h1>
          <p className="sy-hero-sub">
            Public-works paving and large-scale lots — DOT-spec mat, density tested,
            signed and sealed by the project engineer. Mass DOT prequalified, NAPA
            member, MUTCD-certified flag crew on every shift.
          </p>
          <div className="sy-cta-row">
            <a href="#quote" className="sy-cta sy-cta-primary">
              <span className="sy-cta-flash" aria-hidden />
              QUOTE A COUNTY JOB
            </a>
            <a href="#spec" className="sy-cta sy-cta-secondary">
              READ THE SPEC ▸
            </a>
          </div>
          <ul className="sy-hero-meta" aria-label="Yard credentials">
            <li><strong>92.4%</strong> avg. joint density · 2025 season</li>
            <li><strong>11</strong> Mass DOT D2 contracts active</li>
            <li><strong>0</strong> non-conformance reports · 36 mo.</li>
          </ul>
        </section>

        <section id="spec" className="sy-spec">
          <h2 className="sy-h2">
            <span className="sy-h2-rule" aria-hidden />
            SPEC BOOK
            <span className="sy-h2-meta">FHWA SERIES E · CONDENSED</span>
          </h2>
          <div className="sy-spec-grid">
            {SPEC_PAGES.map((p, i) => (
              <article
                key={p.section}
                ref={(el) => {
                  sectionRefs.current[i] = el;
                }}
                data-spec-idx={i}
                className={`sy-spec-page${revealed.has(i) ? " in" : ""}`}
              >
                <header className="sy-spec-head">
                  <span className="sy-spec-section">§ {p.section}</span>
                  <span className="sy-spec-title">{p.title}</span>
                </header>
                <p className="sy-spec-body">{p.body}</p>
                <ul className="sy-spec-list">
                  {p.bullets.map((b) => (
                    <li key={b}>
                      <span className="sy-spec-tick" aria-hidden />
                      {b}
                    </li>
                  ))}
                </ul>
                <footer className="sy-spec-foot">
                  <span>SHEET 4 OF 12</span>
                  <span>REV C · 26-04</span>
                </footer>
              </article>
            ))}
          </div>
        </section>

        <section className="sy-yard">
          <h2 className="sy-h2">
            <span className="sy-h2-rule" aria-hidden />
            THE YARD
            <span className="sy-h2-meta">FLEET REGISTER · LAST CERT ON FILE</span>
          </h2>
          <div className="sy-yard-grid">
            {FLEET.map((f) => (
              <div key={f.serial} className="sy-fleet">
                <div className="sy-fleet-head">
                  <span className="sy-fleet-make">{f.make}</span>
                  <span className="sy-fleet-cert">CERT {f.lastCert}</span>
                </div>
                <div className="sy-fleet-model">{f.model}</div>
                <div className="sy-fleet-serial">SN · {f.serial}</div>
                <p className="sy-fleet-note">{f.note}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="sy-z535">
          <h2 className="sy-h2">
            <span className="sy-h2-rule" aria-hidden />
            Z535 INDEX
            <span className="sy-h2-meta">ANSI · SAFE WORK ON THE MAT</span>
          </h2>
          <div className="sy-z535-grid">
            {Z535.map((p) => (
              <div key={p.header} className="sy-placard-card" style={{ ["--z" as string]: p.color }}>
                <header className="sy-placard-head">
                  <span className="sy-placard-tri" aria-hidden>▲</span>
                  {p.header}
                </header>
                <p className="sy-placard-body">{p.body}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="quote" className="sy-projects">
          <h2 className="sy-h2">
            <span className="sy-h2-rule" aria-hidden />
            ON THE MAT
            <span className="sy-h2-meta">2026 SEASON · ACTIVE TICKETS</span>
          </h2>
          <table className="sy-table">
            <thead>
              <tr>
                <th>REF</th>
                <th>OWNER</th>
                <th>SCOPE</th>
                <th>TRAFFIC</th>
              </tr>
            </thead>
            <tbody>
              {PROJECTS.map((row) => (
                <tr key={row.ref}>
                  <td className="sy-table-ref">{row.ref}</td>
                  <td>{row.owner}</td>
                  <td>{row.scope}</td>
                  <td className="sy-table-traffic">{row.traffic}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>

        <footer className="sy-footer">
          <div className="sy-cone-band sy-cone-band-foot" aria-hidden />
          <div className="sy-foot-grid">
            <div>
              <div className="sy-foot-label">YARD ADDRESS</div>
              <div>148 Industrial Drive · Worcester, MA 01604</div>
            </div>
            <div>
              <div className="sy-foot-label">DISPATCH</div>
              <div>(508) 555-0144 · 24-hour storm line</div>
            </div>
            <div>
              <div className="sy-foot-label">CREDENTIALS</div>
              <div>Mass DOT D2-Cls 5 · NAPA · NECA flag-cert</div>
            </div>
          </div>
          <div className="sy-foot-stencil">
            STENCILS APPROVED · WORCESTER PAVING CO. · MMXXVI
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600&display=swap');

  .sy-shell {
    --bg: #B8B5AC;
    --ink: #181612;
    --hi: #FF7B1F;
    --yel: #FBD200;
    --black: #0E0E0F;
    --rule: #2C2A26;
    --paper: #E5E0D2;
    position: relative;
    min-height: 100vh;
    font-family: 'Inter', system-ui, sans-serif;
    color: var(--ink);
    background: var(--bg);
    overflow: hidden;
  }
  .sy-grit {
    position: fixed; inset: 0; pointer-events: none; z-index: 0; opacity: 0.18;
    background-image:
      radial-gradient(rgba(20,18,14,0.45) 1px, transparent 1px),
      radial-gradient(rgba(255,255,255,0.06) 1px, transparent 1px);
    background-size: 4px 4px, 7px 7px;
    background-position: 0 0, 2px 3px;
  }
  .sy-cone-band {
    position: relative;
    height: 18px;
    background-image: repeating-linear-gradient(
      135deg,
      var(--hi) 0 22px,
      var(--black) 22px 44px
    );
    z-index: 1;
  }
  .sy-cone-band-foot { margin-top: 24px; }

  .sy-top {
    position: relative; z-index: 2;
    display: flex; justify-content: space-between; align-items: center;
    padding: 18px 36px;
    background: var(--black);
    color: var(--yel);
    border-bottom: 4px solid var(--hi);
  }
  .sy-prequal {
    display: flex; gap: 14px; align-items: center;
    font-family: 'Oswald', sans-serif; letter-spacing: 0.18em; font-size: 12px;
  }
  .sy-prequal-label {
    background: var(--yel); color: var(--black);
    padding: 3px 8px; border-radius: 1px; font-weight: 700;
  }
  .sy-prequal-num { color: #DBD5C6; font-weight: 600; }
  .sy-placard {
    background: var(--yel); color: var(--black);
    border: 3px solid var(--black);
    padding: 6px 14px; text-align: center; transform: rotate(-1.4deg);
    box-shadow: 4px 4px 0 var(--hi);
  }
  .sy-placard-line {
    display: block; font-family: 'Oswald', sans-serif; font-weight: 700;
    letter-spacing: 0.12em; font-size: 14px;
  }
  .sy-placard-sub {
    display: block; font-size: 10px; letter-spacing: 0.2em; margin-top: 2px;
  }

  .sy-hero {
    position: relative; z-index: 2;
    padding: 92px 48px 72px;
    max-width: 1280px; margin: 0 auto;
  }
  .sy-hero-tag {
    display: inline-flex; gap: 14px; align-items: center;
    font-family: 'Oswald', sans-serif; font-size: 13px; letter-spacing: 0.22em;
    color: var(--rule); margin-bottom: 24px;
  }
  .sy-hero-tag-mark {
    width: 28px; height: 14px;
    background-image: repeating-linear-gradient(
      135deg, var(--hi) 0 6px, var(--black) 6px 12px
    );
  }
  .sy-hero-h1 {
    font-family: 'Oswald', sans-serif; font-weight: 700;
    font-size: clamp(48px, 8vw, 110px); line-height: 0.92;
    letter-spacing: 0.02em; color: var(--black);
    margin: 0 0 28px;
  }
  .sy-stencil-line {
    display: block; opacity: 0;
    background-image: repeating-linear-gradient(
      90deg, transparent 0 18px, rgba(184,181,172,0.7) 18px 22px
    );
    background-clip: text;
    -webkit-background-clip: text;
    color: var(--black);
    transition: opacity 700ms ease;
  }
  .sy-hero-h1.on .sy-stencil-line { opacity: 1; animation: sy-paint 1100ms ease both; }
  .sy-hero-h1.on .sy-stencil-line:nth-child(2) { animation-delay: 220ms; }
  .sy-hero-h1.on .sy-stencil-line:nth-child(3) { animation-delay: 440ms; }
  @keyframes sy-paint {
    0% { filter: blur(2px); transform: translateY(6px); }
    60% { filter: blur(0); transform: translateY(0); }
    100% { filter: blur(0); transform: translateY(0); }
  }
  .sy-hero-sub {
    font-size: 19px; line-height: 1.55; max-width: 640px;
    color: #2A271F; margin: 0 0 36px;
  }
  .sy-cta-row { display: flex; gap: 18px; flex-wrap: wrap; margin-bottom: 40px; }
  .sy-cta {
    position: relative;
    display: inline-flex; align-items: center;
    padding: 16px 26px;
    font-family: 'Oswald', sans-serif; font-weight: 700;
    letter-spacing: 0.16em; font-size: 14px;
    text-decoration: none;
    border: 3px solid var(--black);
    transition: transform 180ms ease, background 180ms ease, color 180ms ease;
    overflow: hidden;
  }
  .sy-cta-primary {
    background: var(--hi); color: var(--black);
  }
  .sy-cta-secondary {
    background: transparent; color: var(--black); border-color: var(--black);
  }
  .sy-cta:hover, .sy-cta:focus-visible {
    transform: translate(-2px, -2px);
    box-shadow: 4px 4px 0 var(--black);
    outline: none;
  }
  .sy-cta-primary:hover, .sy-cta-primary:focus-visible {
    animation: sy-flash 600ms ease 1;
  }
  @keyframes sy-flash {
    0% { background: var(--hi); }
    33% { background: var(--yel); }
    66% { background: var(--hi); }
    100% { background: var(--hi); }
  }
  .sy-cta-flash {
    position: absolute; inset: 0; pointer-events: none;
  }

  .sy-hero-meta {
    list-style: none; margin: 0; padding: 22px 0 0;
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
    border-top: 2px dashed var(--rule);
  }
  .sy-hero-meta li {
    font-family: 'Oswald', sans-serif; font-weight: 500;
    font-size: 14px; letter-spacing: 0.04em; color: var(--rule);
  }
  .sy-hero-meta strong {
    display: block; font-size: 32px; color: var(--black); letter-spacing: 0;
  }

  .sy-h2 {
    display: flex; gap: 16px; align-items: baseline;
    font-family: 'Oswald', sans-serif; font-weight: 700;
    font-size: 28px; letter-spacing: 0.18em; color: var(--black);
    margin: 0 0 28px; text-transform: uppercase;
  }
  .sy-h2-rule {
    flex: 1; max-width: 80px; height: 14px;
    background-image: repeating-linear-gradient(
      135deg, var(--yel) 0 6px, var(--black) 6px 12px
    );
  }
  .sy-h2-meta {
    margin-left: auto; font-size: 11px; letter-spacing: 0.22em;
    color: var(--rule); font-weight: 500;
  }

  .sy-spec, .sy-yard, .sy-z535, .sy-projects {
    position: relative; z-index: 2;
    padding: 56px 48px; max-width: 1280px; margin: 0 auto;
  }

  .sy-spec-grid {
    display: grid; grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 22px;
  }
  .sy-spec-page {
    background: var(--paper); border: 3px solid var(--black);
    padding: 22px 24px; opacity: 0; transform: translateY(14px);
    transition: opacity 700ms ease, transform 700ms ease;
    box-shadow: 6px 6px 0 var(--black);
  }
  .sy-spec-page.in { opacity: 1; transform: translateY(0); }
  .sy-spec-head {
    display: flex; gap: 14px; align-items: baseline;
    border-bottom: 2px solid var(--black); padding-bottom: 10px; margin-bottom: 14px;
  }
  .sy-spec-section {
    font-family: 'Oswald', sans-serif; font-weight: 700; letter-spacing: 0.12em;
    background: var(--black); color: var(--yel); padding: 4px 8px; font-size: 13px;
  }
  .sy-spec-title {
    font-family: 'Oswald', sans-serif; font-weight: 700;
    font-size: 22px; letter-spacing: 0.06em;
  }
  .sy-spec-body {
    font-size: 15px; line-height: 1.6; margin: 0 0 14px; color: #2A271F;
  }
  .sy-spec-list { list-style: none; margin: 0; padding: 0; }
  .sy-spec-list li {
    display: flex; gap: 10px; align-items: flex-start;
    font-size: 14px; padding: 4px 0; border-bottom: 1px dotted #9C9789;
    font-family: 'Oswald', sans-serif; font-weight: 500; letter-spacing: 0.06em;
  }
  .sy-spec-list li:last-child { border-bottom: none; }
  .sy-spec-tick {
    display: inline-block; width: 10px; height: 10px;
    background: var(--hi); margin-top: 5px;
    transform: rotate(45deg); flex-shrink: 0;
  }
  .sy-spec-foot {
    display: flex; justify-content: space-between;
    margin-top: 16px; padding-top: 10px; border-top: 1px solid var(--black);
    font-family: 'Oswald', sans-serif; font-size: 11px; letter-spacing: 0.2em;
    color: var(--rule);
  }

  .sy-yard-grid {
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }
  .sy-fleet {
    background: var(--black); color: var(--paper);
    border-left: 6px solid var(--hi); padding: 18px 20px;
    transition: transform 200ms ease, border-color 200ms ease;
  }
  .sy-fleet:hover, .sy-fleet:focus-within {
    transform: translateX(4px); border-left-color: var(--yel);
  }
  .sy-fleet-head {
    display: flex; justify-content: space-between; align-items: baseline;
    margin-bottom: 6px;
  }
  .sy-fleet-make {
    font-family: 'Oswald', sans-serif; font-weight: 700;
    letter-spacing: 0.16em; color: var(--yel); font-size: 14px;
  }
  .sy-fleet-cert {
    font-family: 'Oswald', sans-serif; font-size: 11px;
    letter-spacing: 0.2em; color: var(--hi);
  }
  .sy-fleet-model {
    font-family: 'Oswald', sans-serif; font-weight: 700;
    font-size: 26px; letter-spacing: 0.04em; color: var(--paper);
  }
  .sy-fleet-serial {
    font-family: 'Oswald', sans-serif; font-size: 11px;
    letter-spacing: 0.2em; color: #9C9789; margin: 4px 0 10px;
  }
  .sy-fleet-note {
    font-size: 13px; line-height: 1.5; color: #C8C2B3; margin: 0;
  }

  .sy-z535-grid {
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 18px;
  }
  .sy-placard-card {
    background: var(--z); color: var(--black);
    border: 4px solid var(--black); padding: 16px 18px;
    transition: transform 200ms ease;
  }
  .sy-placard-card:hover, .sy-placard-card:focus-within {
    transform: rotate(-0.6deg) translateY(-2px);
    box-shadow: 5px 5px 0 var(--black);
  }
  .sy-placard-head {
    display: flex; gap: 10px; align-items: center;
    font-family: 'Oswald', sans-serif; font-weight: 700;
    font-size: 22px; letter-spacing: 0.18em;
    border-bottom: 3px solid var(--black); padding-bottom: 8px; margin-bottom: 10px;
  }
  .sy-placard-tri { font-size: 22px; }
  .sy-placard-body { font-size: 14px; line-height: 1.55; margin: 0; }

  .sy-table {
    width: 100%; border-collapse: collapse;
    background: var(--paper); border: 3px solid var(--black);
  }
  .sy-table th, .sy-table td {
    padding: 14px 16px; text-align: left;
    border-bottom: 1px dotted var(--rule);
    font-size: 14px;
  }
  .sy-table th {
    background: var(--black); color: var(--yel);
    font-family: 'Oswald', sans-serif; letter-spacing: 0.2em; font-size: 11px;
  }
  .sy-table tr:hover { background: rgba(251,210,0,0.18); }
  .sy-table tr:last-child td { border-bottom: none; }
  .sy-table-ref {
    font-family: 'Oswald', sans-serif; font-weight: 700;
    color: var(--hi); letter-spacing: 0.14em;
  }
  .sy-table-traffic { color: var(--rule); font-style: italic; }

  .sy-footer {
    position: relative; z-index: 2;
    background: var(--black); color: var(--paper);
    padding-bottom: 20px; margin-top: 64px;
  }
  .sy-foot-grid {
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 24px; padding: 32px 48px 8px; max-width: 1280px; margin: 0 auto;
  }
  .sy-foot-label {
    font-family: 'Oswald', sans-serif; font-size: 11px; letter-spacing: 0.22em;
    color: var(--yel); margin-bottom: 4px;
  }
  .sy-foot-stencil {
    font-family: 'Oswald', sans-serif; font-weight: 700;
    text-align: center; padding: 18px 0; letter-spacing: 0.32em;
    font-size: 12px; color: var(--hi);
    background-image: repeating-linear-gradient(
      90deg, transparent 0 18px, rgba(255,123,31,0.18) 18px 22px
    );
  }

  @media (max-width: 880px) {
    .sy-spec-grid, .sy-yard-grid, .sy-z535-grid, .sy-foot-grid,
    .sy-hero-meta { grid-template-columns: 1fr; }
    .sy-hero { padding: 48px 24px; }
    .sy-spec, .sy-yard, .sy-z535, .sy-projects { padding: 40px 24px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .sy-stencil-line, .sy-hero-h1.on .sy-stencil-line { animation: none; opacity: 1; }
    .sy-spec-page { transition: none; opacity: 1; transform: none; }
    .sy-cta:hover, .sy-cta:focus-visible { transform: none; }
    .sy-cta-primary:hover, .sy-cta-primary:focus-visible { animation: none; }
  }
`;
