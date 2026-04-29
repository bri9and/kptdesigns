"use client";

/**
 * TitleblockEngine — V48 Titleblock
 *
 * The site IS one architectural sheet. Vellum field with a fixed titleblock
 * margin (right and bottom). Sheet flips swap the drawing field. Revision
 * triangles pop the change-log on hover. Trade: General Contractors.
 */

import { useState } from "react";

const SHEETS = [
  {
    no: "A-001",
    title: "COVER · KPT GENERAL CONTRACTING",
    body: "RFP. Submittals. RFI. Punch list. Closed out clean.",
  },
  {
    no: "A-101",
    title: "SHEET INDEX · SERVICES",
    body: "Commercial fit-outs, ground-up, tenant turnover. Each scope sheeted.",
  },
  {
    no: "A-201",
    title: "RECENT WORK · PLAN VIEW",
    body: "Selected projects, plotted at 1/8\" = 1'-0\". Notes margin-set right.",
  },
  {
    no: "A-301",
    title: "REVISIONS · CHANGE-LOG",
    body: "Triangle revisions tracked across the live job. Hover a triangle.",
  },
];

const SERVICES = [
  { code: "01-110", name: "PRE-CONSTRUCTION", note: "GMP. Constructibility review. Trade pre-qualification." },
  { code: "02-220", name: "GROUND-UP", note: "Class A & B commercial. Concrete to dry-in to TCO." },
  { code: "03-330", name: "FIT-OUTS", note: "Commercial tenant work, occupied buildings, after-hours." },
  { code: "04-440", name: "RENOVATIONS", note: "Adaptive reuse. Selective demo. Phased turnover." },
  { code: "05-550", name: "CLOSE-OUT", note: "Punch lists, O&M binders, warranty walks at 11 months." },
];

const PROJECTS = [
  { id: "23-018", name: "ALBANY ST · OFFICE FIT-OUT", sf: "12,400 SF", duration: "14 wks", state: "TCO" },
  { id: "23-027", name: "WAVERLY MEDICAL · GROUND-UP", sf: "31,800 SF", duration: "62 wks", state: "DRY-IN" },
  { id: "24-004", name: "MASS AVE · ADAPTIVE REUSE", sf: "8,900 SF", duration: "22 wks", state: "PUNCH" },
  { id: "24-011", name: "RIVERSIDE LAB · TENANT WORK", sf: "5,600 SF", duration: "9 wks", state: "CLOSED" },
];

const REVISIONS = [
  { tri: "1", date: "23.04.12", note: "Issued for permit. Owner: J. Halverson, AIA." },
  { tri: "2", date: "23.05.07", note: "RFI 014 — slab depression at MRI. Resolved by SE." },
  { tri: "3", date: "23.06.21", note: "Change order 7 — added cold-rolled at curtain head." },
  { tri: "4", date: "23.08.02", note: "Punch list issued. 41 items. Closed out 23.09.18." },
];

export default function TitleblockEngine() {
  const [sheetIdx, setSheetIdx] = useState(0);
  const [openTri, setOpenTri] = useState<string | null>(null);
  const sheet = SHEETS[sheetIdx];

  return (
    <>
      <style>{css}</style>
      <div className="tb-shell">
        <div className="tb-sheet">
          {/* Drawing field */}
          <section className={`tb-field tb-field-${sheetIdx}`} key={sheet.no}>
            <div className="tb-field-grid" aria-hidden />

            {/* HERO sheet */}
            <header className="tb-hero">
              <div className="tb-hero-meta">
                <span className="tb-hero-meta-row">SHEET {sheet.no}</span>
                <span className="tb-hero-meta-row">SCALE 1/8" = 1'-0"</span>
                <span className="tb-hero-meta-row">REV. 4 · 23.08.02</span>
              </div>
              <h1 className="tb-h1">{sheet.body}</h1>
              <p className="tb-sub">
                General contracting on commercial fit-outs and ground-up — every
                project a complete sheet set, not a slide deck.
              </p>
              <div className="tb-cta-row">
                <button className="tb-cta tb-cta-primary" type="button">
                  Open a sheet set
                </button>
                <button className="tb-cta tb-cta-ghost" type="button">
                  See the revisions
                </button>
              </div>
            </header>

            {/* SHEET INDEX */}
            <section className="tb-section">
              <h2 className="tb-h2">SHEET INDEX</h2>
              <ol className="tb-index">
                {SERVICES.map((s) => (
                  <li key={s.code} className="tb-index-row" tabIndex={0}>
                    <span className="tb-index-code">{s.code}</span>
                    <span className="tb-index-name">{s.name}</span>
                    <span className="tb-index-note">{s.note}</span>
                  </li>
                ))}
              </ol>
            </section>

            {/* THE DRAWING */}
            <section className="tb-section">
              <h2 className="tb-h2">THE DRAWING — RECENT WORK</h2>
              <div className="tb-drawing-grid">
                {PROJECTS.map((p, i) => (
                  <article key={p.id} className="tb-card" tabIndex={0}>
                    <div className="tb-card-plan" aria-hidden>
                      <PlanSvg seed={i} />
                    </div>
                    <div className="tb-card-meta">
                      <span className="tb-card-id">JOB {p.id}</span>
                      <span className="tb-card-state">{p.state}</span>
                    </div>
                    <h3 className="tb-card-title">{p.name}</h3>
                    <dl className="tb-card-dl">
                      <div><dt>AREA</dt><dd>{p.sf}</dd></div>
                      <div><dt>DURATION</dt><dd>{p.duration}</dd></div>
                    </dl>
                  </article>
                ))}
              </div>
            </section>

            {/* REVISIONS */}
            <section className="tb-section">
              <h2 className="tb-h2">REVISIONS</h2>
              <ul className="tb-revisions">
                {REVISIONS.map((r) => (
                  <li
                    key={r.tri}
                    className={`tb-rev ${openTri === r.tri ? "is-open" : ""}`}
                    onMouseEnter={() => setOpenTri(r.tri)}
                    onMouseLeave={() => setOpenTri(null)}
                    onFocus={() => setOpenTri(r.tri)}
                    onBlur={() => setOpenTri(null)}
                    tabIndex={0}
                    aria-label={`Revision ${r.tri}, ${r.date}, ${r.note}`}
                  >
                    <span className="tb-tri" aria-hidden>
                      <span className="tb-tri-shape" />
                      <span className="tb-tri-num">{r.tri}</span>
                    </span>
                    <span className="tb-rev-date">{r.date}</span>
                    <span className="tb-rev-note">{r.note}</span>
                  </li>
                ))}
              </ul>
            </section>
          </section>

          {/* Right margin titleblock */}
          <aside className="tb-margin-r" aria-label="Titleblock margin">
            <div className="tb-tb-cell">
              <span className="tb-tb-label">PROJECT</span>
              <span className="tb-tb-value">KPT GC · 24-011</span>
            </div>
            <div className="tb-tb-cell">
              <span className="tb-tb-label">CLIENT</span>
              <span className="tb-tb-value">RIVERSIDE LAB HOLDINGS</span>
            </div>
            <div className="tb-tb-cell">
              <span className="tb-tb-label">ARCHITECT OF RECORD</span>
              <span className="tb-tb-value">HALVERSON KIM AIA</span>
            </div>
            <div className="tb-tb-cell">
              <span className="tb-tb-label">DRAWN BY</span>
              <span className="tb-tb-value">KPT</span>
            </div>
            <div className="tb-tb-cell">
              <span className="tb-tb-label">CHECKED</span>
              <span className="tb-tb-value">M.S.</span>
            </div>
            <div className="tb-tb-cell tb-tb-cell-tall">
              <span className="tb-tb-label">SHEET INDEX</span>
              <ul className="tb-tb-sheets">
                {SHEETS.map((s, i) => (
                  <li key={s.no}>
                    <button
                      type="button"
                      className={`tb-sheet-btn ${i === sheetIdx ? "is-active" : ""}`}
                      onClick={() => setSheetIdx(i)}
                      aria-current={i === sheetIdx}
                    >
                      <span className="tb-sheet-no">{s.no}</span>
                      <span className="tb-sheet-title">{s.title}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div className="tb-tb-cell tb-tb-cell-stamp">
              <span className="tb-tb-label">SHEET</span>
              <span className="tb-tb-sheet-no">{sheet.no}</span>
              <span className="tb-tb-of">OF {SHEETS.length.toString().padStart(3, "0")}</span>
            </div>
          </aside>

          {/* Bottom margin titleblock */}
          <footer className="tb-margin-b" aria-label="Titleblock footer">
            <div className="tb-foot-cell">
              <span className="tb-tb-label">FIRM</span>
              <span className="tb-tb-value">KPT GENERAL CONTRACTING LLC</span>
            </div>
            <div className="tb-foot-cell">
              <span className="tb-tb-label">LICENSE</span>
              <span className="tb-tb-value">CSL 091184 · MA-DPS</span>
            </div>
            <div className="tb-foot-cell">
              <span className="tb-tb-label">AIA</span>
              <span className="tb-tb-value">ASSOCIATE MEMBER · BSA/AIA</span>
            </div>
            <div className="tb-foot-cell">
              <span className="tb-tb-label">DATE</span>
              <span className="tb-tb-value">23.08.02</span>
            </div>
            <div className="tb-foot-cell">
              <span className="tb-tb-label">CONTACT</span>
              <span className="tb-tb-value">jobs@kpt.gc · 617.555.0142</span>
            </div>
          </footer>

          {/* Floating revision card */}
          {openTri && (
            <div className="tb-rev-pop" role="status" aria-live="polite">
              <strong>REV {openTri}</strong>
              <span>{REVISIONS.find((r) => r.tri === openTri)?.note}</span>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

function PlanSvg({ seed }: { seed: number }) {
  // four hand-tuned plan diagrams
  const plans = [
    <g key="p0">
      <rect x="6" y="6" width="108" height="60" fill="none" stroke="#181816" strokeWidth="1.4" />
      <line x1="6" y1="30" x2="114" y2="30" stroke="#181816" strokeWidth="0.6" />
      <line x1="60" y1="6" x2="60" y2="66" stroke="#181816" strokeWidth="0.6" />
      <rect x="12" y="34" width="20" height="14" fill="none" stroke="#BF2A1F" strokeWidth="0.8" />
      <text x="14" y="44" fontSize="5" fill="#181816">CONF</text>
      <text x="64" y="20" fontSize="5" fill="#181816">OPEN OFFICE</text>
    </g>,
    <g key="p1">
      <rect x="6" y="6" width="108" height="60" fill="none" stroke="#181816" strokeWidth="1.4" />
      <rect x="14" y="14" width="40" height="44" fill="none" stroke="#181816" strokeWidth="0.6" />
      <rect x="60" y="14" width="46" height="20" fill="none" stroke="#181816" strokeWidth="0.6" />
      <rect x="60" y="38" width="46" height="20" fill="none" stroke="#181816" strokeWidth="0.6" />
      <circle cx="86" cy="48" r="4" fill="none" stroke="#BF2A1F" strokeWidth="0.8" />
    </g>,
    <g key="p2">
      <rect x="6" y="6" width="108" height="60" fill="none" stroke="#181816" strokeWidth="1.4" />
      <path d="M6 36 L60 12 L114 36 L114 66 L6 66 Z" fill="none" stroke="#181816" strokeWidth="0.8" />
      <line x1="60" y1="36" x2="60" y2="66" stroke="#181816" strokeWidth="0.6" />
      <text x="36" y="58" fontSize="5" fill="#181816">RETAIL</text>
      <text x="74" y="58" fontSize="5" fill="#181816">STORAGE</text>
    </g>,
    <g key="p3">
      <rect x="6" y="6" width="108" height="60" fill="none" stroke="#181816" strokeWidth="1.4" />
      <line x1="40" y1="6" x2="40" y2="66" stroke="#181816" strokeWidth="0.6" />
      <line x1="80" y1="6" x2="80" y2="66" stroke="#181816" strokeWidth="0.6" />
      <line x1="6" y1="36" x2="114" y2="36" stroke="#181816" strokeWidth="0.6" />
      <rect x="46" y="42" width="28" height="20" fill="none" stroke="#BF2A1F" strokeWidth="0.8" />
      <text x="50" y="54" fontSize="5" fill="#181816">LAB-2</text>
    </g>,
  ];
  return (
    <svg viewBox="0 0 120 72" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
      {plans[seed % plans.length]}
    </svg>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500;700&display=swap');

  .tb-shell {
    --vellum: #F2EEDD;
    --ink: #181816;
    --rev: #BF2A1F;
    --grid: #C9C2A6;
    font-family: 'JetBrains Mono', ui-monospace, Menlo, monospace;
    color: var(--ink);
    background: var(--vellum);
    min-height: 100vh;
    padding: 28px;
    box-sizing: border-box;
  }
  .tb-sheet {
    position: relative;
    background: var(--vellum);
    border: 1.5px solid var(--ink);
    box-shadow: 0 0 0 4px var(--vellum), 0 0 0 5px rgba(24,24,22,0.18);
    display: grid;
    grid-template-columns: 1fr 240px;
    grid-template-rows: 1fr 96px;
    min-height: calc(100vh - 56px);
  }
  .tb-field {
    grid-column: 1; grid-row: 1;
    padding: 36px 44px 56px 44px;
    border-right: 1.5px solid var(--ink);
    border-bottom: 1.5px solid var(--ink);
    position: relative;
    overflow: hidden;
    animation: tb-flip 480ms cubic-bezier(0.22, 0.96, 0.32, 1);
  }
  @keyframes tb-flip {
    0% { transform: translateX(28px); opacity: 0; clip-path: inset(0 100% 0 0); }
    100% { transform: translateX(0); opacity: 1; clip-path: inset(0 0 0 0); }
  }
  @media (prefers-reduced-motion: reduce) {
    .tb-field { animation: none; }
  }
  .tb-field-grid {
    position: absolute; inset: 0;
    background:
      repeating-linear-gradient(0deg, transparent 0 39px, rgba(24,24,22,0.06) 39px 40px),
      repeating-linear-gradient(90deg, transparent 0 39px, rgba(24,24,22,0.06) 39px 40px);
    pointer-events: none;
  }
  .tb-hero {
    position: relative;
    padding: 24px 0 60px 0;
    border-bottom: 1px solid rgba(24,24,22,0.4);
    margin-bottom: 56px;
  }
  .tb-hero-meta {
    display: flex; gap: 24px; flex-wrap: wrap;
    font-size: 11px; letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(24,24,22,0.7);
    margin-bottom: 28px;
  }
  .tb-h1 {
    font-size: clamp(36px, 5.4vw, 76px);
    line-height: 1.02;
    margin: 0 0 18px 0;
    font-weight: 700;
    letter-spacing: -0.01em;
    max-width: 18ch;
  }
  .tb-sub {
    font-size: 15px;
    line-height: 1.5;
    max-width: 64ch;
    color: rgba(24,24,22,0.82);
    margin: 0 0 28px 0;
  }
  .tb-cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
  .tb-cta {
    font: inherit;
    font-size: 12px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    padding: 12px 22px;
    border: 1.5px solid var(--ink);
    background: transparent;
    color: var(--ink);
    cursor: pointer;
    transition: background 140ms, color 140ms, transform 140ms;
  }
  .tb-cta-primary { background: var(--ink); color: var(--vellum); }
  .tb-cta:hover, .tb-cta:focus-visible {
    background: var(--rev);
    color: var(--vellum);
    border-color: var(--rev);
    outline: none;
    transform: translateY(-1px);
  }

  .tb-section { position: relative; margin-bottom: 64px; }
  .tb-h2 {
    font-size: 11px;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin: 0 0 18px 0;
    border-bottom: 1px solid var(--ink);
    padding-bottom: 8px;
    font-weight: 700;
  }
  .tb-index { list-style: none; margin: 0; padding: 0; }
  .tb-index-row {
    display: grid;
    grid-template-columns: 88px 200px 1fr;
    gap: 18px;
    padding: 10px 0;
    border-bottom: 1px dashed rgba(24,24,22,0.26);
    font-size: 13px;
    align-items: baseline;
    cursor: pointer;
    transition: background 120ms, padding 120ms;
  }
  .tb-index-row:hover, .tb-index-row:focus-visible {
    background: rgba(191,42,31,0.08);
    padding-left: 8px;
    outline: none;
  }
  .tb-index-code { color: var(--rev); font-weight: 700; letter-spacing: 0.08em; }
  .tb-index-name { font-weight: 700; letter-spacing: 0.06em; }
  .tb-index-note { color: rgba(24,24,22,0.72); }

  .tb-drawing-grid {
    display: grid; grid-template-columns: repeat(2, 1fr); gap: 24px;
  }
  .tb-card {
    border: 1.2px solid var(--ink);
    padding: 14px 16px 18px 16px;
    background: rgba(255,255,255,0.4);
    transition: transform 140ms, box-shadow 140ms;
    cursor: pointer;
  }
  .tb-card:hover, .tb-card:focus-visible {
    transform: translateY(-2px);
    box-shadow: 4px 4px 0 var(--ink);
    outline: none;
  }
  .tb-card-plan {
    height: 140px;
    margin-bottom: 14px;
    border: 1px dashed rgba(24,24,22,0.4);
    background:
      linear-gradient(0deg, rgba(24,24,22,0.02), rgba(24,24,22,0.02)),
      repeating-linear-gradient(0deg, transparent 0 11px, rgba(24,24,22,0.05) 11px 12px),
      repeating-linear-gradient(90deg, transparent 0 11px, rgba(24,24,22,0.05) 11px 12px);
    padding: 6px;
  }
  .tb-card-meta {
    display: flex; justify-content: space-between;
    font-size: 10px; letter-spacing: 0.16em; text-transform: uppercase;
    color: rgba(24,24,22,0.7);
    margin-bottom: 6px;
  }
  .tb-card-state { color: var(--rev); font-weight: 700; }
  .tb-card-title {
    font-size: 14px; margin: 0 0 10px 0; font-weight: 700;
    letter-spacing: 0.04em;
  }
  .tb-card-dl {
    display: flex; gap: 22px; margin: 0;
    font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase;
  }
  .tb-card-dl div { display: flex; flex-direction: column; }
  .tb-card-dl dt { color: rgba(24,24,22,0.6); font-weight: 400; }
  .tb-card-dl dd { margin: 0; font-weight: 700; }

  .tb-revisions { list-style: none; margin: 0; padding: 0; }
  .tb-rev {
    display: grid;
    grid-template-columns: 56px 88px 1fr;
    align-items: center;
    gap: 18px;
    padding: 12px 8px;
    border-bottom: 1px dashed rgba(24,24,22,0.26);
    cursor: pointer;
    transition: background 120ms;
    font-size: 13px;
  }
  .tb-rev:hover, .tb-rev:focus-visible, .tb-rev.is-open {
    background: rgba(191,42,31,0.1);
    outline: none;
  }
  .tb-tri {
    position: relative;
    width: 36px; height: 32px;
    display: inline-grid; place-items: center;
  }
  .tb-tri-shape {
    position: absolute; inset: 0;
    background: var(--rev);
    clip-path: polygon(50% 4%, 96% 92%, 4% 92%);
    transition: transform 180ms;
  }
  .tb-rev:hover .tb-tri-shape, .tb-rev.is-open .tb-tri-shape, .tb-rev:focus-visible .tb-tri-shape {
    transform: rotate(-6deg) scale(1.06);
  }
  .tb-tri-num {
    position: relative; color: var(--vellum);
    font-weight: 700; font-size: 12px; line-height: 1;
    padding-top: 8px;
  }
  .tb-rev-date { font-weight: 700; letter-spacing: 0.08em; color: rgba(24,24,22,0.8); }
  .tb-rev-note { color: rgba(24,24,22,0.86); }

  .tb-rev-pop {
    position: fixed;
    right: 280px; bottom: 132px;
    background: var(--ink);
    color: var(--vellum);
    padding: 12px 16px;
    font-size: 12px;
    letter-spacing: 0.06em;
    display: flex; flex-direction: column; gap: 4px;
    z-index: 12;
    pointer-events: none;
    box-shadow: 4px 4px 0 var(--rev);
    max-width: 320px;
  }
  .tb-rev-pop strong { color: var(--rev); letter-spacing: 0.18em; }

  /* RIGHT MARGIN */
  .tb-margin-r {
    grid-column: 2; grid-row: 1 / 3;
    border-left: 1.5px solid var(--ink);
    background: var(--vellum);
    display: flex; flex-direction: column;
  }
  .tb-tb-cell {
    border-bottom: 1.5px solid var(--ink);
    padding: 12px 14px;
    display: flex; flex-direction: column; gap: 4px;
  }
  .tb-tb-cell-tall { flex: 1; }
  .tb-tb-cell-stamp {
    background: var(--ink); color: var(--vellum);
    padding: 14px;
    text-align: center;
  }
  .tb-tb-cell-stamp .tb-tb-label { color: rgba(242,238,221,0.6); }
  .tb-tb-label {
    font-size: 9px; letter-spacing: 0.18em; text-transform: uppercase;
    color: rgba(24,24,22,0.6);
  }
  .tb-tb-value {
    font-size: 13px; font-weight: 700; letter-spacing: 0.04em;
  }
  .tb-tb-sheets { list-style: none; margin: 6px 0 0 0; padding: 0; display: flex; flex-direction: column; gap: 2px; }
  .tb-sheet-btn {
    width: 100%;
    background: transparent;
    border: 1px solid transparent;
    padding: 8px 10px;
    font: inherit;
    font-size: 11px;
    text-align: left;
    cursor: pointer;
    color: var(--ink);
    display: flex; flex-direction: column; gap: 2px;
    transition: background 120ms, border-color 120ms;
  }
  .tb-sheet-btn:hover, .tb-sheet-btn:focus-visible {
    background: rgba(191,42,31,0.1);
    border-color: var(--rev);
    outline: none;
  }
  .tb-sheet-btn.is-active {
    background: var(--ink); color: var(--vellum); border-color: var(--ink);
  }
  .tb-sheet-no {
    font-weight: 700; letter-spacing: 0.08em; color: var(--rev);
  }
  .tb-sheet-btn.is-active .tb-sheet-no { color: var(--vellum); }
  .tb-sheet-title {
    font-size: 9px; letter-spacing: 0.1em; opacity: 0.85;
  }
  .tb-tb-sheet-no {
    display: block;
    font-size: 36px; font-weight: 700; letter-spacing: 0.04em;
    margin-top: 4px;
  }
  .tb-tb-of {
    font-size: 9px; letter-spacing: 0.16em; opacity: 0.7;
  }

  /* BOTTOM MARGIN */
  .tb-margin-b {
    grid-column: 1; grid-row: 2;
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    border-top: 1.5px solid var(--ink);
  }
  .tb-foot-cell {
    border-right: 1.5px solid var(--ink);
    padding: 14px 18px;
    display: flex; flex-direction: column; gap: 4px;
  }
  .tb-foot-cell:last-child { border-right: none; }

  @media (max-width: 900px) {
    .tb-sheet { grid-template-columns: 1fr; grid-template-rows: 1fr auto auto; }
    .tb-margin-r { grid-column: 1; grid-row: 2; border-left: none; border-top: 1.5px solid var(--ink); }
    .tb-margin-b { grid-row: 3; grid-template-columns: repeat(2, 1fr); }
    .tb-drawing-grid { grid-template-columns: 1fr; }
    .tb-rev-pop { display: none; }
  }
`;
