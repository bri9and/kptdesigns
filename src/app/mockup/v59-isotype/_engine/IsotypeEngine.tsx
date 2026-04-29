"use client";

/**
 * IsotypeEngine — V59 Isotype
 *
 * Otto Neurath ISOTYPE — quantities visualized as repeating Vienna-red
 * pictograms on cream cotton. Hover/focus a glyph reveals the underlying
 * unit; counts animate up on viewport entry. Reduced motion presents
 * final counts immediately.
 */

import { useEffect, useRef, useState } from "react";

const VIENNA_RED = "#B83321";
const ISOTYPE_BLACK = "#0E0E0E";
const CREAM = "#EDE7D9";
const CREAM_DEEP = "#E1DBC8";

const HERO_COUNT = 280; // visual block; representational, captioned as 4,200

const TRADES: { code: string; name: string; count: number; unit: string }[] = [
  { code: "ELEC", name: "Electricians", count: 18, unit: "techs" },
  { code: "PLMB", name: "Plumbers", count: 14, unit: "techs" },
  { code: "FRMR", name: "Framers", count: 22, unit: "techs" },
  { code: "MASN", name: "Masons", count: 9, unit: "techs" },
  { code: "ROOF", name: "Roofers", count: 12, unit: "techs" },
  { code: "DRYW", name: "Drywall", count: 15, unit: "techs" },
  { code: "HVAC", name: "HVAC", count: 11, unit: "techs" },
  { code: "PNTR", name: "Painters", count: 10, unit: "techs" },
];

const PROJECT_BLOCKS: { label: string; size: string; figures: number; sf: string }[] = [
  { label: "Tenant fit-out · 4,800 SF", size: "S", figures: 1, sf: "4,800" },
  { label: "Light commercial · 12,000 SF", size: "M", figures: 3, sf: "12,000" },
  { label: "Multi-family · 38,000 SF", size: "L", figures: 8, sf: "38,000" },
  { label: "Mixed-use · 110,000 SF", size: "XL", figures: 22, sf: "110,000" },
];

const STATS_HERO = [
  { value: "4,200", caption: "calls answered (FY)" },
  { value: "1,180", caption: "punch-out passes" },
  { value: "12", caption: "trades on speed dial" },
  { value: "97.4%", caption: "on-schedule delivery" },
];

function PhoneGlyph({ size = 14, color = VIENNA_RED }: { size?: number; color?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      aria-hidden
      style={{ display: "inline-block" }}
    >
      <path
        d="M5 4.5C5 3.67 5.67 3 6.5 3h11C18.33 3 19 3.67 19 4.5v15c0 .83-.67 1.5-1.5 1.5h-11c-.83 0-1.5-.67-1.5-1.5v-15zM12 19.5a1 1 0 100-2 1 1 0 000 2zM7 5h10v12H7V5z"
        fill={color}
      />
    </svg>
  );
}

function PersonGlyph({ size = 22, color = VIENNA_RED }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 32" width={size} height={size * 1.4} aria-hidden style={{ display: "inline-block" }}>
      <circle cx="12" cy="6" r="4.5" fill={color} />
      <path d="M5 32c0-6 3-10 7-10s7 4 7 10z" fill={color} />
      <rect x="11" y="14" width="2" height="10" fill={color} />
    </svg>
  );
}

function HouseGlyph({ size = 22, color = VIENNA_RED }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 32 32" width={size} height={size} aria-hidden style={{ display: "inline-block" }}>
      <path d="M2 16L16 4l14 12v2H2z" fill={color} />
      <rect x="6" y="16" width="20" height="14" fill={color} />
      <rect x="13" y="20" width="6" height="10" fill={CREAM} />
    </svg>
  );
}

function RfiGlyph({ size = 18, color = VIENNA_RED }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden style={{ display: "inline-block" }}>
      <rect x="4" y="3" width="16" height="18" fill={color} />
      <rect x="6" y="6" width="12" height="1.5" fill={CREAM} />
      <rect x="6" y="9" width="12" height="1.5" fill={CREAM} />
      <rect x="6" y="12" width="9" height="1.5" fill={CREAM} />
      <rect x="6" y="15" width="12" height="1.5" fill={CREAM} />
    </svg>
  );
}

function ChangeGlyph({ size = 18, color = VIENNA_RED }: { size?: number; color?: string }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden style={{ display: "inline-block" }}>
      <path d="M6 12L12 4l6 8-3 0v8h-6v-8z" fill={color} />
    </svg>
  );
}

const YEAR_PANELS: {
  label: string;
  unit: string;
  total: number;
  display: string;
  glyph: "phone" | "rfi" | "change" | "person";
  cellsPerRow: number;
  rows: number;
  ratio: string;
}[] = [
  { label: "Calls answered", unit: "calls", total: 4200, display: "4,200", glyph: "phone", cellsPerRow: 28, rows: 10, ratio: "1 phone = 15 calls" },
  { label: "RFIs logged", unit: "RFIs", total: 612, display: "612", glyph: "rfi", cellsPerRow: 18, rows: 6, ratio: "1 sheet = 6 RFIs" },
  { label: "Change orders priced", unit: "COs", total: 184, display: "184", glyph: "change", cellsPerRow: 16, rows: 4, ratio: "1 mark = 3 COs" },
  { label: "Trades dispatched", unit: "techs", total: 111, display: "111", glyph: "person", cellsPerRow: 18, rows: 4, ratio: "1 figure = 1 tech" },
];

function Glyph({ kind, size, color }: { kind: "phone" | "rfi" | "change" | "person"; size?: number; color?: string }) {
  if (kind === "phone") return <PhoneGlyph size={size ?? 14} color={color} />;
  if (kind === "rfi") return <RfiGlyph size={size ?? 16} color={color} />;
  if (kind === "change") return <ChangeGlyph size={size ?? 16} color={color} />;
  return <PersonGlyph size={size ?? 16} color={color} />;
}

export default function IsotypeEngine() {
  const [reduced, setReduced] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const yearRef = useRef<HTMLDivElement | null>(null);
  const [yearVisible, setYearVisible] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
  }, []);

  useEffect(() => {
    if (!yearRef.current) return;
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setYearVisible(true)),
      { threshold: 0.18 }
    );
    obs.observe(yearRef.current);
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="iso-shell">
        {/* MASTHEAD */}
        <header className="iso-mast">
          <div className="iso-mark">
            <span className="iso-mark-block" aria-hidden />
            <span className="iso-mark-name">QUANTUM CONSTRUCTION CO.</span>
          </div>
          <nav className="iso-nav" aria-label="Primary">
            <a href="#year">The year</a>
            <a href="#trades">By trade</a>
            <a href="#projects">By size</a>
            <a href="#contact">Contact</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="iso-hero">
          <div className="iso-eyebrow">
            <span className="iso-eyebrow-rule" /> ISOTYPE · INTERNATIONAL SYSTEM OF TYPOGRAPHIC PICTURE EDUCATION · FY 2025
          </div>
          <h1 className="iso-headline">
            4,200 calls answered.<br />
            1,180 punch-out passes.<br />
            12 trades on speed dial.
          </h1>
          <p className="iso-sub">
            General contracting at the volume where the spreadsheet stops
            helping — isotype keeps the count honest. One glyph for one unit;
            the page reads as straight as a tally.
          </p>

          <div className="iso-hero-grid" aria-label="4,200 calls answered, visualized">
            <div className="iso-isotype-block">
              {Array.from({ length: HERO_COUNT }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  className="iso-glyph"
                  aria-label="15 calls"
                  onMouseEnter={() => setActive(`hero-${i}`)}
                  onMouseLeave={() => setActive(null)}
                  onFocus={() => setActive(`hero-${i}`)}
                  onBlur={() => setActive(null)}
                  data-active={active === `hero-${i}` ? "1" : undefined}
                >
                  <PhoneGlyph size={13} />
                </button>
              ))}
            </div>
            <div className="iso-hero-key">
              <div className="iso-key-row">
                <PhoneGlyph size={20} />
                <span>= 15 calls</span>
              </div>
              <div className="iso-key-row">
                <span className="iso-key-block" aria-hidden />
                <span>1 row = 420 calls</span>
              </div>
              <div className="iso-key-note">Vienna red on Cream. <br />After Otto Neurath, Gerd Arntz, 1925–34.</div>
              {active && (
                <div className="iso-key-tip" role="status" aria-live="polite">
                  + 15 calls · field rep, sub coordination, owner update
                </div>
              )}
            </div>
          </div>

          <div className="iso-cta-row">
            <a className="iso-cta iso-cta-primary" href="#year">Count the work</a>
            <a className="iso-cta" href="#projects">See the year</a>
          </div>

          <dl className="iso-hero-stats">
            {STATS_HERO.map((s) => (
              <div key={s.value} className="iso-hero-stat">
                <dt>{s.caption}</dt>
                <dd>{s.value}</dd>
              </div>
            ))}
          </dl>
        </section>

        {/* THE YEAR IN GLYPHS */}
        <section id="year" className="iso-year" ref={yearRef}>
          <h2 className="iso-h2">
            <span className="iso-h2-tick">II.</span> The year in glyphs
          </h2>
          <p className="iso-section-sub">
            Every number on this page is a count, not a forecast. The legend
            sets the unit; the block does the rest.
          </p>

          <div className="iso-year-grid">
            {YEAR_PANELS.map((p) => (
              <article key={p.label} className="iso-year-card">
                <header className="iso-year-head">
                  <h3>{p.label}</h3>
                  <span className="iso-year-total" aria-label={`${p.display} ${p.unit}`}>
                    {yearVisible || reduced ? p.display : "0"}
                  </span>
                </header>
                <div className="iso-year-block">
                  {Array.from({ length: p.cellsPerRow * p.rows }).map((_, i) => {
                    const showAt = (i / (p.cellsPerRow * p.rows)) * 1400;
                    const visible = reduced || yearVisible;
                    return (
                      <span
                        key={i}
                        className="iso-year-glyph"
                        style={{
                          opacity: visible ? 1 : 0,
                          transition: reduced ? "none" : `opacity 240ms ease ${showAt}ms`,
                        }}
                      >
                        <Glyph kind={p.glyph} size={p.glyph === "phone" ? 12 : p.glyph === "person" ? 14 : 13} />
                      </span>
                    );
                  })}
                </div>
                <footer className="iso-year-foot">
                  <span className="iso-year-key" aria-hidden>
                    <Glyph kind={p.glyph} size={12} />
                  </span>
                  <span>{p.ratio}</span>
                </footer>
              </article>
            ))}
          </div>
        </section>

        {/* BY TRADE */}
        <section id="trades" className="iso-trades">
          <h2 className="iso-h2">
            <span className="iso-h2-tick">III.</span> By trade
          </h2>
          <p className="iso-section-sub">
            Sub-trades dispatched in the last twelve months. Hover the row to
            reveal the partners; one figure equals one tech, never rounded.
          </p>
          <ul className="iso-trade-list" role="list">
            {TRADES.map((t) => (
              <li key={t.code} className="iso-trade-row">
                <span className="iso-trade-code">{t.code}</span>
                <span className="iso-trade-name">{t.name}</span>
                <span className="iso-trade-figs" aria-label={`${t.count} ${t.unit}`}>
                  {Array.from({ length: t.count }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      className="iso-fig-btn"
                      aria-label={`${t.name} tech`}
                    >
                      <PersonGlyph size={18} />
                    </button>
                  ))}
                </span>
                <span className="iso-trade-count">{t.count}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* BY PROJECT SIZE */}
        <section id="projects" className="iso-projects">
          <h2 className="iso-h2">
            <span className="iso-h2-tick">IV.</span> By project size
          </h2>
          <p className="iso-section-sub">
            Project mass, drawn as proportional figure-blocks. One house glyph
            holds 5,000 SF. The bigger the block, the bigger the job.
          </p>
          <div className="iso-proj-grid">
            {PROJECT_BLOCKS.map((p) => (
              <article key={p.label} className="iso-proj-card">
                <header>
                  <span className="iso-proj-size">{p.size}</span>
                  <span className="iso-proj-label">{p.label}</span>
                </header>
                <div className="iso-proj-block">
                  {Array.from({ length: p.figures }).map((_, i) => (
                    <span key={i} className="iso-proj-fig"><HouseGlyph size={28} /></span>
                  ))}
                </div>
                <footer>{p.sf} SF total · ⌐ 1 glyph = 5,000 SF</footer>
              </article>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer id="contact" className="iso-foot">
          <div className="iso-foot-rule" aria-hidden />
          <div className="iso-foot-grid">
            <div>
              <span className="iso-foot-label">QUANTUM CONSTRUCTION CO.</span>
              <span>Vienna-rule member · AIA / AGC accredited</span>
              <span>Fiscal year disclosed in compliance with the&nbsp;construction-data convention.</span>
            </div>
            <div>
              <span className="iso-foot-label">METHOD</span>
              <span>One sign per unit. Rounded to the nearest unit, never to look pretty.</span>
            </div>
            <div>
              <span className="iso-foot-label">CALL OR WRITE</span>
              <span>+1 (617) 555-0142</span>
              <span>field@quantum-co.example</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
  .iso-shell {
    --cream: ${CREAM};
    --cream-deep: ${CREAM_DEEP};
    --red: ${VIENNA_RED};
    --ink: ${ISOTYPE_BLACK};
    --rule: rgba(14,14,14,0.18);
    background: var(--cream);
    color: var(--ink);
    min-height: 100vh;
    font-family: "Futura PT", Futura, "Trebuchet MS", "Helvetica Neue", system-ui, sans-serif;
    padding: clamp(20px, 4vw, 56px);
    box-sizing: border-box;
    background-image:
      radial-gradient(rgba(14,14,14,0.045) 1px, transparent 1px),
      radial-gradient(rgba(14,14,14,0.025) 1px, transparent 1px);
    background-size: 6px 6px, 11px 11px;
    background-position: 0 0, 3px 3px;
  }

  .iso-mast {
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding-bottom: 18px;
    border-bottom: 3px solid var(--ink);
    margin-bottom: 28px;
    flex-wrap: wrap;
    gap: 16px;
  }
  .iso-mark { display: flex; gap: 12px; align-items: center; }
  .iso-mark-block {
    display: inline-block;
    width: 28px; height: 28px;
    background: var(--red);
  }
  .iso-mark-name {
    font-weight: 700;
    letter-spacing: 0.18em;
    font-size: 15px;
  }
  .iso-nav { display: flex; gap: 22px; flex-wrap: wrap; }
  .iso-nav a {
    color: var(--ink);
    text-decoration: none;
    font-size: 13px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border-bottom: 2px solid transparent;
    padding-bottom: 2px;
    transition: border-color 160ms ease, color 160ms ease;
  }
  .iso-nav a:hover, .iso-nav a:focus-visible { border-color: var(--red); outline: none; color: var(--red); }

  .iso-hero {
    border: 2px solid var(--ink);
    background: var(--cream);
    padding: clamp(22px, 4vw, 48px);
    margin-bottom: 40px;
    box-shadow: 8px 8px 0 var(--ink);
  }
  .iso-eyebrow {
    font-size: 11px;
    letter-spacing: 0.22em;
    color: var(--red);
    text-transform: uppercase;
    font-weight: 700;
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 24px;
  }
  .iso-eyebrow-rule {
    height: 8px;
    width: 36px;
    background: var(--red);
  }
  .iso-headline {
    font-family: "Futura PT", Futura, "Trebuchet MS", system-ui, sans-serif;
    font-weight: 700;
    font-size: clamp(40px, 6vw, 96px);
    line-height: 0.96;
    letter-spacing: -0.02em;
    color: var(--ink);
    margin: 0 0 24px;
    text-transform: none;
  }
  .iso-sub {
    font-size: 17px;
    line-height: 1.45;
    max-width: 56ch;
    color: #1A1A1A;
    margin: 0 0 32px;
  }

  .iso-hero-grid {
    display: grid;
    grid-template-columns: 1fr 220px;
    gap: 28px;
    align-items: start;
    border-top: 1px solid var(--rule);
    border-bottom: 1px solid var(--rule);
    padding: 22px 0;
    margin-bottom: 28px;
  }
  @media (max-width: 720px) { .iso-hero-grid { grid-template-columns: 1fr; } }

  .iso-isotype-block {
    display: grid;
    grid-template-columns: repeat(28, 1fr);
    gap: 1px 2px;
  }
  .iso-glyph {
    background: transparent;
    border: none;
    padding: 1px;
    cursor: pointer;
    line-height: 0;
    transition: transform 120ms ease, background 120ms ease;
  }
  .iso-glyph:hover, .iso-glyph[data-active="1"], .iso-glyph:focus-visible {
    background: rgba(184,51,33,0.18);
    transform: scale(1.4);
    outline: none;
  }
  .iso-glyph:focus-visible { box-shadow: 0 0 0 1.5px var(--red); }

  .iso-hero-key {
    display: flex;
    flex-direction: column;
    gap: 10px;
    border-left: 2px solid var(--ink);
    padding-left: 18px;
    font-size: 13px;
    line-height: 1.4;
  }
  .iso-key-row { display: flex; align-items: center; gap: 8px; font-weight: 600; }
  .iso-key-block { display: inline-block; width: 16px; height: 6px; background: var(--red); }
  .iso-key-note {
    margin-top: 8px;
    color: #444;
    font-size: 11px;
    line-height: 1.45;
    letter-spacing: 0.04em;
  }
  .iso-key-tip {
    margin-top: 8px;
    background: var(--red);
    color: var(--cream);
    padding: 8px 10px;
    font-size: 12px;
    letter-spacing: 0.06em;
  }

  .iso-cta-row { display: flex; gap: 12px; flex-wrap: wrap; margin-bottom: 28px; }
  .iso-cta {
    display: inline-block;
    padding: 12px 22px;
    background: var(--cream-deep);
    color: var(--ink);
    border: 2px solid var(--ink);
    text-decoration: none;
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    font-size: 12px;
    transition: transform 120ms ease, background 120ms ease, color 120ms ease;
  }
  .iso-cta:hover, .iso-cta:focus-visible { transform: translate(-2px, -2px); box-shadow: 4px 4px 0 var(--ink); outline: none; }
  .iso-cta-primary { background: var(--red); color: var(--cream); border-color: var(--ink); }
  .iso-cta-primary:hover, .iso-cta-primary:focus-visible { background: #8E2519; }

  .iso-hero-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
    gap: 0;
    margin: 0;
    border-top: 2px solid var(--ink);
  }
  .iso-hero-stat {
    border-right: 1px solid var(--rule);
    padding: 16px 18px 6px;
    display: flex;
    flex-direction: column-reverse;
    gap: 4px;
  }
  .iso-hero-stat:last-child { border-right: none; }
  .iso-hero-stat dt { font-size: 11px; letter-spacing: 0.18em; color: #555; text-transform: uppercase; }
  .iso-hero-stat dd {
    font-size: 32px;
    font-weight: 700;
    color: var(--red);
    margin: 0;
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
  }

  .iso-h2 {
    font-family: "Futura PT", Futura, system-ui, sans-serif;
    font-weight: 700;
    font-size: clamp(24px, 3.4vw, 38px);
    letter-spacing: -0.01em;
    margin: 0 0 4px;
    display: flex;
    align-items: baseline;
    gap: 14px;
  }
  .iso-h2-tick { color: var(--red); font-size: 0.55em; letter-spacing: 0.16em; }
  .iso-section-sub { color: #333; max-width: 60ch; margin: 0 0 24px; font-size: 14px; line-height: 1.45; }

  .iso-year { padding-top: 24px; padding-bottom: 16px; border-top: 1px solid var(--rule); margin-bottom: 40px; }
  .iso-year-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
    gap: 20px;
  }
  .iso-year-card {
    background: var(--cream);
    border: 1.5px solid var(--ink);
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }
  .iso-year-head { display: flex; justify-content: space-between; align-items: baseline; gap: 12px; }
  .iso-year-head h3 { margin: 0; font-size: 15px; letter-spacing: 0.06em; text-transform: uppercase; }
  .iso-year-total {
    font-weight: 700;
    font-size: 28px;
    color: var(--red);
    font-variant-numeric: tabular-nums;
    letter-spacing: -0.02em;
  }
  .iso-year-block {
    display: flex;
    flex-wrap: wrap;
    gap: 1px;
    line-height: 0;
    padding: 6px 0;
    border-top: 1px dashed var(--rule);
    border-bottom: 1px dashed var(--rule);
  }
  .iso-year-glyph { display: inline-block; padding: 1px; }
  .iso-year-foot { display: flex; align-items: center; gap: 8px; font-size: 12px; color: #444; }
  .iso-year-key { display: inline-flex; }

  .iso-trades { padding-top: 24px; border-top: 1px solid var(--rule); margin-bottom: 40px; }
  .iso-trade-list { list-style: none; padding: 0; margin: 0; }
  .iso-trade-row {
    display: grid;
    grid-template-columns: 64px 160px 1fr 60px;
    gap: 16px;
    align-items: center;
    padding: 10px 0;
    border-bottom: 1px solid var(--rule);
    transition: background 140ms ease;
  }
  .iso-trade-row:hover, .iso-trade-row:focus-within {
    background: var(--cream-deep);
  }
  .iso-trade-code {
    font-weight: 700;
    color: var(--red);
    letter-spacing: 0.14em;
    font-size: 12px;
  }
  .iso-trade-name { font-weight: 600; font-size: 14px; }
  .iso-trade-figs { display: inline-flex; flex-wrap: wrap; gap: 1px; }
  .iso-fig-btn {
    background: transparent;
    border: none;
    padding: 0;
    line-height: 0;
    cursor: pointer;
    transition: transform 120ms ease;
  }
  .iso-fig-btn:hover, .iso-fig-btn:focus-visible {
    transform: translateY(-2px);
    outline: none;
    filter: drop-shadow(0 1px 0 var(--ink));
  }
  .iso-trade-count {
    text-align: right;
    font-weight: 700;
    color: var(--ink);
    font-variant-numeric: tabular-nums;
  }

  @media (max-width: 720px) {
    .iso-trade-row { grid-template-columns: 56px 1fr 56px; }
    .iso-trade-figs { grid-column: 1 / -1; }
  }

  .iso-projects { padding-top: 24px; border-top: 1px solid var(--rule); margin-bottom: 40px; }
  .iso-proj-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 18px;
  }
  .iso-proj-card {
    border: 1.5px solid var(--ink);
    background: var(--cream);
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 12px;
    transition: transform 160ms ease, background 160ms ease;
  }
  .iso-proj-card:hover, .iso-proj-card:focus-within { transform: translate(-2px,-2px); background: var(--cream-deep); box-shadow: 4px 4px 0 var(--ink); }
  .iso-proj-card header { display: flex; gap: 12px; align-items: baseline; }
  .iso-proj-size {
    background: var(--ink); color: var(--cream);
    padding: 2px 8px;
    font-weight: 700;
    letter-spacing: 0.14em;
    font-size: 11px;
  }
  .iso-proj-label { font-weight: 600; font-size: 14px; }
  .iso-proj-block { display: flex; flex-wrap: wrap; gap: 4px; padding: 8px 0; border-top: 1px dashed var(--rule); border-bottom: 1px dashed var(--rule); min-height: 60px; }
  .iso-proj-card footer { font-size: 12px; color: #444; }

  .iso-foot {
    border-top: 3px solid var(--ink);
    padding-top: 24px;
    margin-top: 16px;
  }
  .iso-foot-rule {
    height: 8px;
    background: repeating-linear-gradient(90deg, var(--red) 0 18px, var(--cream) 18px 24px);
    margin-bottom: 22px;
  }
  .iso-foot-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
    gap: 22px;
    font-size: 13px;
    line-height: 1.5;
  }
  .iso-foot-grid > div { display: flex; flex-direction: column; gap: 6px; }
  .iso-foot-label {
    font-weight: 700;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--red);
    font-size: 11px;
  }
`;
