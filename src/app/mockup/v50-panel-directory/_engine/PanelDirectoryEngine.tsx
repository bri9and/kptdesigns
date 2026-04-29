"use client";

/**
 * PanelDirectoryEngine — V50 Panel Directory
 *
 * The site is a residential breaker-panel directory at full size — a ruled
 * grid of circuits, hand-lettered loads in tight all-caps draftsman's hand,
 * red AFCI rosette stamps, pencil marginalia where the panel was rebalanced.
 * Trade: electricians.
 *
 * No Tailwind. Inline <style> only. Reduced-motion presents the directory
 * as a finished sheet (no per-character draw-in, no rosette thumps).
 */

import { useEffect, useState } from "react";

type Row = {
  no: number;
  load: string;
  amps: string;
  detail: string;
  afci?: boolean;
  notes?: string;
};

const ROWS: Row[] = [
  { no: 1, load: "KIT GFCI · COUNTER", amps: "20A", detail: "DISHWASHER, COFFEE", afci: true },
  { no: 2, load: "KIT FRIDGE", amps: "20A", detail: "DEDICATED RUN" },
  { no: 3, load: "KIT DISPOSAL", amps: "15A", detail: "SWITCH UNDER SINK" },
  { no: 4, load: "KIT MICRO", amps: "20A", detail: "OTR HOOD", afci: true },
  { no: 5, load: "DINING REC", amps: "15A", detail: "WALL DUPLEX × 4", afci: true },
  { no: 6, load: "LIVING REC", amps: "15A", detail: "TV WALL + LAMPS", afci: true },
  { no: 7, load: "FRONT PORCH", amps: "15A", detail: "GFCI EXTERIOR", notes: "REBAL 03/22" },
  { no: 8, load: "GARAGE DOOR", amps: "20A", detail: "OPENER + CEILING" },
  { no: 9, load: "LAUNDRY", amps: "20A", detail: "WASHER ONLY", afci: true },
  { no: 10, load: "DRYER", amps: "30A", detail: "240V · NEMA 14-30" },
  { no: 11, load: "FURN / AHU", amps: "15A", detail: "CONTROL BOARD" },
  { no: 12, load: "AC CONDENSER", amps: "30A", detail: "240V · 2-POLE" },
  { no: 13, load: "WATER HEATER", amps: "30A", detail: "240V · ELEC" },
  { no: 14, load: "BATH GFCI", amps: "20A", detail: "PRIMARY VANITY", afci: true },
  { no: 15, load: "BATH 2 GFCI", amps: "20A", detail: "HALL BATH", afci: true },
  { no: 16, load: "BR1 REC + LT", amps: "15A", detail: "MASTER", afci: true },
  { no: 17, load: "BR2 REC + LT", amps: "15A", detail: "GUEST", afci: true },
  { no: 18, load: "BR3 REC + LT", amps: "15A", detail: "OFFICE", afci: true, notes: "ADD CKT 02/26" },
  { no: 19, load: "HALL LIGHTS", amps: "15A", detail: "RECESSED × 6" },
  { no: 20, load: "ATTIC FAN", amps: "15A", detail: "SUMMER ONLY" },
  { no: 21, load: "EV CHARGER", amps: "50A", detail: "240V · NEMA 14-50" },
  { no: 22, load: "SUMP PUMP", amps: "15A", detail: "BSMT GFCI" },
  { no: 23, load: "BSMT REC", amps: "15A", detail: "WORKSHOP", afci: true },
  { no: 24, load: "BSMT LIGHTS", amps: "15A", detail: "FLUOR + STAIR" },
  { no: 25, load: "EXT LIGHTS", amps: "15A", detail: "DUSK PHOTO" },
  { no: 26, load: "POOL PUMP", amps: "20A", detail: "GFCI · 240V" },
  { no: 27, load: "SHED", amps: "20A", detail: "DETACHED · GFCI" },
  { no: 28, load: "SOLAR DISC", amps: "60A", detail: "BACKFEED · 240V" },
  { no: 29, load: "SPARE", amps: "—", detail: "AVAILABLE" },
  { no: 30, load: "SPARE", amps: "—", detail: "AVAILABLE" },
];

const AFCI_STORIES = [
  { ckt: "01", room: "KITCHEN GFCI", year: "2023", reason: "KITCHEN REMODEL" },
  { ckt: "06", room: "LIVING ROOM REC", year: "2024", reason: "INSURANCE INSPECTION" },
  { ckt: "09", room: "LAUNDRY", year: "2025", reason: "WASHER UPGRADE" },
  { ckt: "14", room: "BATH GFCI", year: "2024", reason: "VANITY REMODEL" },
  { ckt: "16-18", room: "BEDROOMS", year: "2024", reason: "NEC 210.12 RETROFIT" },
];

export default function PanelDirectoryEngine() {
  const [reduced, setReduced] = useState(false);
  const [hover, setHover] = useState<number | null>(null);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  return (
    <div className="pd-root">
      <style>{css}</style>

      <header className="pd-hero">
        <div className="pd-hero-side">
          <div className="pd-nameplate">
            <div className="pd-nameplate-line">PANEL · MAIN</div>
            <div className="pd-nameplate-addr">2218 ELM ST</div>
            <div className="pd-nameplate-spec">200A · 30 SLOT · CU BUS</div>
          </div>
          <div className="pd-pencil-clip" aria-hidden>
            <div className="pd-pencil" />
          </div>
          <div className="pd-eyebrow">FOREMAN · M. K. · LIC EC-08812</div>
          <h1 className="pd-headline">
            Every breaker labeled.
            <br />
            <em>Every load known.</em>
          </h1>
          <p className="pd-sub">
            Residential and light-commercial electrical for owners who want to
            open the panel and recognize their own house.
          </p>
          <div className="pd-cta">
            <a className="pd-btn pd-btn-primary" href="#directory">Schedule a panel walk</a>
            <a className="pd-btn pd-btn-ghost" href="#afci">See a directory</a>
          </div>
        </div>

        <div id="directory" className="pd-directory">
          <div className="pd-dir-head">
            <span>CIRCUIT</span>
            <span>LOAD</span>
            <span>A</span>
            <span>NOTES</span>
          </div>
          <ol className="pd-dir-grid">
            {ROWS.map((r, i) => {
              const delay = reduced ? 0 : Math.min(i * 60, 1400);
              const isHover = hover === r.no;
              return (
                <li
                  key={r.no}
                  className={`pd-row${reduced ? " pd-row-static" : ""}${isHover ? " pd-row-hover" : ""}`}
                  style={{ animationDelay: `${delay}ms` }}
                  onMouseEnter={() => setHover(r.no)}
                  onMouseLeave={() => setHover(null)}
                  onFocus={() => setHover(r.no)}
                  onBlur={() => setHover(null)}
                  tabIndex={0}
                >
                  <span className="pd-no">{String(r.no).padStart(2, "0")}</span>
                  <span className="pd-load">{r.load}</span>
                  <span className="pd-amps">{r.amps}</span>
                  <span className="pd-detail">
                    {r.detail}
                    {r.notes ? <em className="pd-marg"> &mdash; {r.notes}</em> : null}
                  </span>
                  {r.afci ? <span className="pd-rosette" aria-label="AFCI">AFCI</span> : null}
                </li>
              );
            })}
          </ol>
        </div>
      </header>

      <section id="afci" className="pd-section">
        <div className="pd-section-head">
          <span className="pd-tag">SECTION 02 · UPGRADES</span>
          <h2>AFCI / GFCI retrofits, by circuit</h2>
          <p>Per NEC 210.12 — every habitable room added or modified gets the protection. Stamped here when finished, signed off by the foreman.</p>
        </div>
        <ul className="pd-upgrade-list">
          {AFCI_STORIES.map((s, i) => (
            <li key={i} style={{ animationDelay: `${i * 120}ms` }}>
              <span className="pd-up-ckt">CKT {s.ckt}</span>
              <span className="pd-up-room">{s.room}</span>
              <span className="pd-up-year">{s.year}</span>
              <span className="pd-up-reason">{s.reason}</span>
              <span className="pd-rosette pd-rosette-list">AFCI</span>
            </li>
          ))}
        </ul>
      </section>

      <section className="pd-section">
        <div className="pd-section-head">
          <span className="pd-tag">SECTION 03 · HOME-RUN MAP</span>
          <h2>The pulls back to the panel</h2>
          <p>Drawn in graphite. Just the runs &mdash; not the energized circuit, not the schematic.</p>
        </div>

        <div className="pd-iso">
          <svg viewBox="0 0 600 320" width="100%" height="auto" role="img" aria-label="Isometric home-run map">
            <defs>
              <pattern id="pd-graph" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#1A1A18" strokeWidth="0.4" opacity="0.18" />
              </pattern>
            </defs>
            <rect width="600" height="320" fill="url(#pd-graph)" />
            {/* panel */}
            <rect x="40" y="120" width="60" height="120" fill="#ECE6D2" stroke="#1A1A18" strokeWidth="1.6" />
            <text x="70" y="190" textAnchor="middle" fontFamily="ui-monospace" fontSize="10" fill="#1A1A18" letterSpacing="2">PANEL</text>

            {/* runs */}
            <g stroke="#1A1A18" strokeWidth="1.4" fill="none" strokeLinecap="square">
              <path d="M100 140 L200 140 L200 80 L320 80" />
              <path d="M100 160 L260 160 L260 220 L380 220" />
              <path d="M100 180 L180 180 L180 270 L420 270" />
              <path d="M100 200 L240 200 L240 60 L500 60" />
              <path d="M100 220 L300 220 L300 130 L520 130" />
              <path d="M100 240 L340 240 L340 180 L540 180" />
            </g>

            {/* room nodes */}
            <g fontFamily="ui-monospace" fontSize="9" fill="#1A1A18" letterSpacing="1.2">
              <circle cx="320" cy="80" r="5" fill="#B0241B" />
              <text x="332" y="84">CKT 04 · MICRO</text>
              <circle cx="380" cy="220" r="5" fill="#1A1A18" />
              <text x="392" y="224">CKT 09 · LAUNDRY</text>
              <circle cx="420" cy="270" r="5" fill="#1A1A18" />
              <text x="432" y="274">CKT 21 · EV CHG</text>
              <circle cx="500" cy="60" r="5" fill="#B0241B" />
              <text x="476" y="50">CKT 14 · BATH GFCI</text>
              <circle cx="520" cy="130" r="5" fill="#1A1A18" />
              <text x="466" y="124">CKT 16 · BR1</text>
              <circle cx="540" cy="180" r="5" fill="#B0241B" />
              <text x="486" y="174">CKT 18 · BR3</text>
            </g>
          </svg>
        </div>
      </section>

      <footer className="pd-foot">
        <div>KPT &middot; ELECTRIC &middot; LIC EC-08812</div>
        <div>NEC 210.12 / 240.4 / 408.4</div>
        <div>BRADY &middot; (555) 014 &middot; 0200</div>
      </footer>
    </div>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&family=Special+Elite&family=Inter:wght@400;500;600;700&display=swap');

  .pd-root {
    --cream: #ECE6D2;
    --cream-deep: #DAD2B8;
    --ink: #1A1A18;
    --ink-soft: #2C2C28;
    --afci: #B0241B;
    --pencil: #4D4D48;
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    font-family: 'Inter', system-ui, sans-serif;
    line-height: 1.5;
  }
  .pd-root *, .pd-root *::before, .pd-root *::after { box-sizing: border-box; }

  /* dead-front cream texture */
  .pd-root::before {
    content: "";
    position: fixed;
    inset: 0;
    pointer-events: none;
    background-image:
      radial-gradient(circle at 30% 20%, rgba(218,210,184,0.6) 0%, transparent 40%),
      radial-gradient(circle at 75% 60%, rgba(218,210,184,0.45) 0%, transparent 50%),
      repeating-linear-gradient(0deg, rgba(26,26,24,0.025) 0 1px, transparent 1px 4px);
    z-index: 0;
  }

  .pd-hero {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(280px, 360px) 1fr;
    gap: clamp(32px, 4vw, 60px);
    padding: clamp(40px, 5vw, 80px) clamp(20px, 4vw, 60px);
  }
  @media (max-width: 900px) { .pd-hero { grid-template-columns: 1fr; } }

  .pd-hero-side { position: relative; }
  .pd-nameplate {
    display: inline-block;
    padding: 12px 18px;
    background: linear-gradient(180deg, #C9A65A 0%, #A6822F 100%);
    color: var(--ink);
    border: 1px solid #6F5320;
    border-radius: 2px;
    font-family: 'JetBrains Mono', monospace;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.4), 0 4px 0 rgba(0,0,0,0.4);
    margin-bottom: 28px;
  }
  .pd-nameplate-line { font-size: 12px; opacity: 0.85; }
  .pd-nameplate-addr { font-size: 18px; font-weight: 700; margin: 4px 0; }
  .pd-nameplate-spec { font-size: 10px; letter-spacing: 0.18em; opacity: 0.85; }

  .pd-pencil-clip {
    position: absolute;
    top: 12px;
    right: 0;
    width: 6px;
    height: 110px;
    transform: rotate(8deg);
  }
  .pd-pencil {
    width: 6px;
    height: 110px;
    background: linear-gradient(180deg, #E8C257 0%, #C8A23B 60%, #A88029 100%);
    border-radius: 1px;
    box-shadow: inset -1px 0 0 rgba(0,0,0,0.25), 0 2px 4px rgba(0,0,0,0.25);
  }
  .pd-pencil::after {
    content: "";
    position: absolute;
    bottom: -8px;
    left: -1px;
    width: 8px;
    height: 12px;
    background: linear-gradient(180deg, #4D4D48 0%, #1A1A18 100%);
    border-radius: 1px;
  }

  .pd-eyebrow {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--ink-soft);
    margin-bottom: 8px;
  }
  .pd-headline {
    font-family: 'Special Elite', 'JetBrains Mono', monospace;
    font-weight: 400;
    font-size: clamp(34px, 4.6vw, 56px);
    line-height: 1.05;
    letter-spacing: 0;
    margin: 0 0 14px;
    color: var(--ink);
    text-transform: uppercase;
  }
  .pd-headline em {
    font-style: normal;
    border-bottom: 3px solid var(--afci);
    padding-bottom: 2px;
  }
  .pd-sub {
    font-size: 15px;
    color: var(--ink-soft);
    max-width: 360px;
    margin: 0 0 22px;
  }
  .pd-cta { display: flex; gap: 10px; flex-wrap: wrap; }
  .pd-btn {
    display: inline-flex;
    padding: 12px 18px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.16em;
    text-transform: uppercase;
    text-decoration: none;
    border: 1px solid var(--ink);
    border-radius: 2px;
    transition: background 140ms ease, color 140ms ease, transform 140ms ease;
  }
  .pd-btn-primary { background: var(--ink); color: var(--cream); }
  .pd-btn-primary:hover, .pd-btn-primary:focus-visible {
    background: var(--afci);
    color: var(--cream);
    border-color: var(--afci);
    transform: translateY(-1px);
    outline: none;
  }
  .pd-btn-ghost { background: transparent; color: var(--ink); }
  .pd-btn-ghost:hover, .pd-btn-ghost:focus-visible {
    background: var(--ink);
    color: var(--cream);
    transform: translateY(-1px);
    outline: none;
  }

  /* ── DIRECTORY ─────────────────────────────────────────────────── */
  .pd-directory {
    background: rgba(255,255,255,0.55);
    border: 1px solid rgba(26,26,24,0.45);
    box-shadow: 0 18px 40px -28px rgba(0,0,0,0.45);
    background-image: repeating-linear-gradient(0deg, rgba(26,26,24,0.05) 0 1px, transparent 1px 32px);
  }
  .pd-dir-head {
    display: grid;
    grid-template-columns: 60px 1fr 60px 1.2fr;
    gap: 12px;
    padding: 10px 16px;
    border-bottom: 2px solid var(--ink);
    background: var(--ink);
    color: var(--cream);
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
  }

  .pd-dir-grid {
    list-style: none;
    margin: 0;
    padding: 0;
    counter-reset: ckt;
  }
  .pd-row {
    display: grid;
    grid-template-columns: 60px 1fr 60px 1.2fr;
    gap: 12px;
    padding: 8px 16px;
    border-bottom: 1px solid rgba(26,26,24,0.18);
    font-family: 'Special Elite', 'JetBrains Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    position: relative;
    cursor: default;
    opacity: 0;
    transform: translateY(2px);
    animation: pd-rowin 360ms ease forwards;
    transition: background 140ms ease;
  }
  .pd-row-static { animation: none; opacity: 1; transform: none; }
  .pd-row:hover, .pd-row.pd-row-hover, .pd-row:focus-visible {
    background: rgba(176,36,27,0.08);
    outline: none;
  }
  .pd-row:focus-visible::after {
    content: "";
    position: absolute;
    inset: 0;
    border: 1.5px solid var(--afci);
    pointer-events: none;
  }
  @keyframes pd-rowin {
    from { opacity: 0; transform: translateY(2px); }
    to { opacity: 1; transform: none; }
  }
  @media (prefers-reduced-motion: reduce) {
    .pd-row { animation: none; opacity: 1; transform: none; }
  }
  .pd-no { color: var(--ink); font-weight: 700; }
  .pd-load { color: var(--ink); }
  .pd-amps { color: var(--ink-soft); }
  .pd-detail { color: var(--ink-soft); font-size: 12px; }
  .pd-marg {
    font-style: normal;
    font-family: 'Special Elite', monospace;
    color: var(--pencil);
    font-size: 11px;
  }

  .pd-rosette {
    position: absolute;
    right: 8px;
    top: 6px;
    background: var(--afci);
    color: var(--cream);
    font-family: 'JetBrains Mono', monospace;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.18em;
    padding: 3px 6px;
    border: 1.5px solid var(--afci);
    border-radius: 2px;
    transform: rotate(-6deg);
    box-shadow: 0 0 0 2px rgba(255,255,255,0.6) inset;
    animation: pd-stamp 240ms cubic-bezier(0.34, 1.56, 0.64, 1) both;
    animation-delay: 600ms;
  }
  .pd-rosette-list {
    position: relative;
    right: auto;
    top: auto;
    align-self: center;
  }
  @keyframes pd-stamp {
    0% { opacity: 0; transform: rotate(-12deg) scale(1.6); }
    60% { opacity: 1; transform: rotate(-4deg) scale(0.92); }
    100% { opacity: 1; transform: rotate(-6deg) scale(1); }
  }
  @media (prefers-reduced-motion: reduce) {
    .pd-rosette { animation: none; }
  }

  /* ── SECTIONS ──────────────────────────────────────────────────── */
  .pd-section {
    position: relative;
    z-index: 1;
    max-width: 1180px;
    margin: 0 auto;
    padding: clamp(40px, 5vw, 80px) clamp(20px, 4vw, 48px);
    border-top: 1px dashed rgba(26,26,24,0.25);
  }
  .pd-section-head { margin-bottom: 24px; max-width: 720px; }
  .pd-tag {
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.22em;
    color: var(--afci);
    text-transform: uppercase;
    display: inline-block;
    margin-bottom: 10px;
  }
  .pd-section-head h2 {
    font-family: 'Special Elite', monospace;
    font-weight: 400;
    font-size: clamp(24px, 3vw, 36px);
    margin: 0 0 8px;
    text-transform: uppercase;
  }
  .pd-section-head p { font-size: 14px; color: var(--ink-soft); }

  .pd-upgrade-list {
    list-style: none;
    margin: 0;
    padding: 0;
    border: 1px solid rgba(26,26,24,0.35);
    background: rgba(255,255,255,0.55);
  }
  .pd-upgrade-list li {
    display: grid;
    grid-template-columns: 90px 1fr 80px 1.4fr 60px;
    gap: 16px;
    align-items: center;
    padding: 12px 16px;
    border-bottom: 1px solid rgba(26,26,24,0.15);
    font-family: 'JetBrains Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    transition: background 140ms ease;
    opacity: 0;
    animation: pd-rowin 400ms ease forwards;
  }
  .pd-upgrade-list li:last-child { border-bottom: none; }
  .pd-upgrade-list li:hover { background: rgba(176,36,27,0.06); }
  @media (prefers-reduced-motion: reduce) {
    .pd-upgrade-list li { animation: none; opacity: 1; }
  }
  .pd-up-ckt { color: var(--afci); font-weight: 700; }
  .pd-up-room { color: var(--ink); }
  .pd-up-year { color: var(--ink-soft); }
  .pd-up-reason { color: var(--ink-soft); font-size: 11px; }

  .pd-iso {
    background: var(--cream);
    border: 1px solid rgba(26,26,24,0.3);
    padding: 16px;
  }

  .pd-foot {
    position: relative;
    z-index: 1;
    border-top: 2px solid var(--ink);
    padding: 18px clamp(20px, 4vw, 48px);
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    gap: 12px;
    font-family: 'JetBrains Mono', monospace;
    font-size: 11px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--ink-soft);
  }

  @media (max-width: 720px) {
    .pd-dir-head, .pd-row { grid-template-columns: 40px 1fr 40px; }
    .pd-detail { display: none; }
    .pd-upgrade-list li { grid-template-columns: 60px 1fr 60px; }
    .pd-up-reason { display: none; }
    .pd-rosette-list { grid-column: 3 / span 1; }
  }
`;
