"use client";

/**
 * SnapLineEngine — V44 Snap Line
 *
 * Roofer's tarpaper-black ground with chalk-blue snap lines as the layout
 * grid. Each section is a course of shingles laid up the slope. Hover on a
 * course reveals the manufacturer swatch.
 */

import { useEffect, useRef, useState } from "react";

const COURSES = [
  {
    no: "01",
    title: "STARTER COURSE",
    headline: "Drip edge under ice-and-water at the eave.",
    body:
      "Aluminum drip edge first, then 6 ft of ice-and-water riding up from the eave on every house we touch. Starter strip nailed 1 inch from the edge — never the field shingle nail line. Eave kicked clean before the first course goes up.",
    spec: "ASTM D1970 · 6 nail starter",
    mfg: { name: "GAF", color: "#3F3F47", warranty: "GAF Golden Pledge — 50 yr non-prorated" },
  },
  {
    no: "02",
    title: "FIELD COURSE",
    headline: "Six-nail every shingle. Snap a line every fifth course.",
    body:
      "Six-nail pattern, 1 inch in from each edge and 1 inch above each cutout. Chalk lines snapped on the fifth course so the offset never wanders. Crew-lead checks 'on the line' from the ground every two bundles.",
    spec: "6-nail · 5⅝\" exposure",
    mfg: { name: "Owens Corning", color: "#E84C8C", warranty: "OC Platinum Protection — 50 yr" },
  },
  {
    no: "03",
    title: "VALLEY METAL",
    headline: "Closed-cut, ice-and-water full bed.",
    body:
      "Pre-bent 24-gauge metal in the valley over a full bed of ice-and-water. Field shingles run through, then cut back 2 inches from valley center on the cold side. No exposed nails within 6 inches of valley center — a code book habit, not a rule we forget.",
    spec: "24 ga. · 2\" trim back",
    mfg: { name: "CertainTeed", color: "#1F1F1F", warranty: "CT SureStart Plus — 50 yr SureStart" },
  },
  {
    no: "04",
    title: "RIDGE & CAP",
    headline: "Ridge vent cut to 7/8\". Cap before sundown.",
    body:
      "Ridge slot opened to 7/8 inch each side. CertaintTeed Filtervent or GAF Cobra continuous ridge vent stapled in. Cap shingles installed last, before the magnet-sweep makes its final pass.",
    spec: "Ridge slot 7/8\" / side",
    mfg: { name: "Malarkey", color: "#7B5C2A", warranty: "Malarkey Platinum — 50 yr" },
  },
];

const PENETRATIONS = [
  { type: "Pipe boot", make: "Oatey No-Calk", note: "Neoprene gasket — replaced even on tear-overs." },
  { type: "Step flashing", make: "5x7 aluminum", note: "Bent on-site, woven into every course of siding." },
  { type: "Skylight", make: "Velux flashing kit", note: "Manufacturer kit only — no field-bent skylight." },
  { type: "Chimney", make: "Counter-flash + saddle", note: "Counter-flashed into mortar joint with butyl." },
  { type: "Plumbing vent", make: "Lifetime Tool Aluma-Boot", note: "Aluminum collar over high-temp gasket." },
  { type: "Kick-out", make: "DryFlekt", note: "Every wall-to-roof termination. Always." },
];

const ADDRESSES = [
  { address: "44 Wachusett Drive · Concord, MA", sf: "2,840 SF", pitch: "8/12", color: "Charcoal Black" },
  { address: "207 Beacon Street · Boston, MA", sf: "1,920 SF", pitch: "12/12", color: "Slatestone Gray" },
  { address: "8 Hayfield Lane · Lincoln, MA", sf: "3,420 SF", pitch: "10/12", color: "Weathered Wood" },
  { address: "112 Great Plain Ave · Needham, MA", sf: "2,160 SF", pitch: "6/12", color: "Hickory" },
];

export default function SnapLineEngine() {
  const [snapped, setSnapped] = useState<Set<number>>(new Set());
  const courseRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number(e.target.getAttribute("data-course-idx"));
          if (e.isIntersecting) {
            setSnapped((prev) => {
              if (prev.has(idx)) return prev;
              const next = new Set(prev);
              next.add(idx);
              return next;
            });
          }
        });
      },
      { threshold: 0.25 }
    );
    courseRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="sl-shell">
        <div className="sl-felt" aria-hidden />
        <div className="sl-magnet" aria-hidden />

        <header className="sl-top">
          <div className="sl-mark">
            <span className="sl-mark-mast">RIDGEPOLE</span>
            <span className="sl-mark-sub">ROOFING CO.</span>
          </div>
          <nav className="sl-nav" aria-label="Primary">
            <a href="#course">Course</a>
            <a href="#mfg">Manufacturer</a>
            <a href="#pen">Penetrations</a>
            <a href="#book" className="sl-nav-cta">SCHEDULE A ROOF</a>
          </nav>
        </header>

        <section className="sl-hero">
          <div className="sl-hero-snap sl-snap" style={{ top: "18%" }} aria-hidden />
          <div className="sl-hero-snap sl-snap" style={{ top: "44%" }} aria-hidden />
          <div className="sl-hero-snap sl-snap" style={{ top: "70%" }} aria-hidden />
          <div className="sl-hose" aria-hidden>
            <div className="sl-hose-line" />
            <div className="sl-hose-nailer">
              <span className="sl-hose-bar" />
              <span className="sl-hose-grip" />
            </div>
          </div>

          <div className="sl-hero-content">
            <div className="sl-hero-tag">04 / 28 · DRY-IN SEASON · NEW ENGLAND</div>
            <h1 className="sl-hero-h1">
              Snap a line.<br />
              Lay a course.<br />
              <span className="sl-hero-h1-blue">Six-nail every shingle.</span>
            </h1>
            <p className="sl-hero-sub">
              Residential and light commercial roofing — straight courses, valley
              metal, ice-and-water at every penetration. GAF Master Elite, magnetic-
              sweep guarantee, dump-trailer on the curb before the first tear-off
              shingle hits the tarp.
            </p>
            <div className="sl-cta-row">
              <a id="book" href="#course" className="sl-cta sl-cta-primary">
                SCHEDULE A ROOF
              </a>
              <a href="#course" className="sl-cta sl-cta-ghost">
                READ THE SPEC ▸
              </a>
            </div>
            <ul className="sl-hero-stats">
              <li><strong>5⅝"</strong><span>Standard exposure</span></li>
              <li><strong>6/shingle</strong><span>Nail pattern, every shingle</span></li>
              <li><strong>50 yr</strong><span>Non-prorated, transferable</span></li>
            </ul>
          </div>
        </section>

        <section id="course" className="sl-course-block">
          <header className="sl-h2-row">
            <span className="sl-h2-label">SCROLL = ONE COURSE PER SNAP</span>
            <h2 className="sl-h2">THE COURSE</h2>
          </header>
          {COURSES.map((c, i) => (
            <article
              key={c.no}
              ref={(el) => {
                courseRefs.current[i] = el;
              }}
              data-course-idx={i}
              className={`sl-course${snapped.has(i) ? " in" : ""}`}
              tabIndex={0}
            >
              <div className="sl-course-snap" aria-hidden />
              <div className="sl-course-grid">
                <div className="sl-course-num">
                  <span className="sl-course-no">{c.no}</span>
                  <span className="sl-course-title">{c.title}</span>
                </div>
                <div className="sl-course-text">
                  <h3 className="sl-course-headline">{c.headline}</h3>
                  <p className="sl-course-body">{c.body}</p>
                  <span className="sl-course-spec">SPEC · {c.spec}</span>
                </div>
                <aside className="sl-mfg" aria-label={`Manufacturer · ${c.mfg.name}`}>
                  <span className="sl-mfg-label">HOVER FOR MFG</span>
                  <div className="sl-mfg-card" style={{ ["--mfg" as string]: c.mfg.color }}>
                    <span className="sl-mfg-swatch" aria-hidden />
                    <span className="sl-mfg-name">{c.mfg.name}</span>
                    <span className="sl-mfg-warranty">{c.mfg.warranty}</span>
                  </div>
                </aside>
              </div>
            </article>
          ))}
        </section>

        <section id="mfg" className="sl-recent">
          <header className="sl-h2-row">
            <span className="sl-h2-label">2026 SEASON · IN PROGRESS</span>
            <h2 className="sl-h2">RECENT TEAR-OFFS</h2>
          </header>
          <div className="sl-recent-list">
            {ADDRESSES.map((a) => (
              <div key={a.address} className="sl-recent-row">
                <span className="sl-recent-addr">{a.address}</span>
                <span className="sl-recent-sf">{a.sf}</span>
                <span className="sl-recent-pitch">{a.pitch}</span>
                <span className="sl-recent-color">{a.color}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="pen" className="sl-pen">
          <header className="sl-h2-row">
            <span className="sl-h2-label">EVERY HOLE THROUGH THE DECK</span>
            <h2 className="sl-h2">PENETRATIONS</h2>
          </header>
          <div className="sl-pen-grid">
            {PENETRATIONS.map((p) => (
              <div key={p.type} className="sl-pen-card">
                <svg className="sl-pen-icon" viewBox="0 0 64 64" aria-hidden>
                  <rect x="6" y="8" width="52" height="48" fill="none" stroke="#4F8AB6" strokeWidth="1.4" />
                  <circle cx="32" cy="32" r="11" fill="none" stroke="#4F8AB6" strokeWidth="1.4" />
                  <circle cx="32" cy="32" r="5" fill="#4F8AB6" />
                  <line x1="6" y1="56" x2="58" y2="56" stroke="#E5E2DA" strokeWidth="1.6" />
                </svg>
                <div className="sl-pen-type">{p.type}</div>
                <div className="sl-pen-make">{p.make}</div>
                <p className="sl-pen-note">{p.note}</p>
              </div>
            ))}
          </div>
        </section>

        <footer className="sl-footer">
          <div className="sl-foot-snap" aria-hidden />
          <div className="sl-foot-grid">
            <div>
              <div className="sl-foot-label">DISPATCH</div>
              <div>(617) 555-0188 · 7am – 6pm</div>
              <div>Storm-tarp line · 24 hr</div>
            </div>
            <div>
              <div className="sl-foot-label">YARD</div>
              <div>92 Industrial Way · Woburn, MA</div>
              <div>Open to homeowners · Sat 8 – 12</div>
            </div>
            <div>
              <div className="sl-foot-label">CERT</div>
              <div>GAF Master Elite · #1018-4422</div>
              <div>OC Platinum · CertainTeed SELECT</div>
            </div>
          </div>
          <div className="sl-foot-mark">
            RIDGEPOLE ROOFING · MAGNET-SWEEPS THE LAWN BEFORE WE LEAVE · MMXXVI
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Archivo:wght@400;600;800;900&display=swap');

  .sl-shell {
    --bg: #0F0F12;
    --paper: #E5E2DA;
    --chalk: #4F8AB6;
    --chalk-bright: #7BB6E0;
    --nail: #6E6E70;
    --warm: #C66A2C;
    position: relative; min-height: 100vh; overflow: hidden;
    font-family: 'Inter', system-ui, sans-serif;
    background: var(--bg); color: var(--paper);
  }
  .sl-felt {
    position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.6;
    background-image:
      radial-gradient(rgba(40,40,46,0.9) 1px, transparent 1px),
      radial-gradient(rgba(80,80,90,0.4) 1px, transparent 1px);
    background-size: 5px 5px, 11px 11px;
  }
  .sl-magnet {
    position: fixed; bottom: 0; left: 0; right: 0; height: 80px;
    z-index: 0; pointer-events: none;
    background-image: repeating-linear-gradient(
      85deg,
      transparent 0 18px,
      rgba(110,110,112,0.18) 18px 19px,
      transparent 19px 30px
    );
    -webkit-mask-image: linear-gradient(to top, black, transparent);
    mask-image: linear-gradient(to top, black, transparent);
  }

  .sl-top {
    position: relative; z-index: 3;
    display: flex; justify-content: space-between; align-items: center;
    padding: 22px 36px; border-bottom: 1px solid #1F1F25;
  }
  .sl-mark {
    display: flex; flex-direction: column; line-height: 1;
    font-family: 'Archivo', sans-serif;
  }
  .sl-mark-mast {
    font-weight: 900; font-size: 22px; letter-spacing: 0.04em; color: var(--paper);
  }
  .sl-mark-sub {
    font-weight: 600; font-size: 11px; letter-spacing: 0.32em;
    color: var(--chalk); margin-top: 4px;
  }
  .sl-nav { display: flex; gap: 28px; align-items: center; }
  .sl-nav a {
    color: #9C9DA1; text-decoration: none; font-size: 14px;
    letter-spacing: 0.06em;
    border-bottom: 1px solid transparent;
    transition: color 180ms ease, border-color 180ms ease;
  }
  .sl-nav a:hover, .sl-nav a:focus-visible {
    color: var(--chalk-bright); border-bottom-color: var(--chalk);
    outline: none;
  }
  .sl-nav-cta {
    border: 1px solid var(--chalk) !important; padding: 9px 16px;
    color: var(--paper) !important; letter-spacing: 0.18em !important;
    font-family: 'Archivo', sans-serif; font-weight: 800; font-size: 12px !important;
  }
  .sl-nav-cta:hover, .sl-nav-cta:focus-visible {
    background: var(--chalk); color: var(--bg) !important;
  }

  .sl-hero {
    position: relative;
    padding: 110px 48px 100px;
    max-width: 1280px; margin: 0 auto;
  }
  .sl-snap {
    position: absolute; left: 0; right: 0; height: 1px;
    background: var(--chalk); opacity: 0;
    transform-origin: 0 50%;
    box-shadow: 0 0 6px rgba(79,138,182,0.6);
    animation: sl-snap-in 700ms ease forwards;
  }
  .sl-hero-snap:nth-of-type(1) { animation-delay: 200ms; }
  .sl-hero-snap:nth-of-type(2) { animation-delay: 380ms; }
  .sl-hero-snap:nth-of-type(3) { animation-delay: 540ms; }
  @keyframes sl-snap-in {
    0% { transform: scaleX(0); opacity: 0; }
    60% { transform: scaleX(1); opacity: 1; }
    100% { transform: scaleX(1); opacity: 0.6; }
  }

  .sl-hose {
    position: absolute; right: 36px; top: 0; bottom: 0; width: 86px;
    pointer-events: none;
  }
  .sl-hose-line {
    position: absolute; top: 0; left: 50%; width: 6px; height: 78%;
    background: linear-gradient(to bottom, #C66A2C, #6B3815);
    transform: translateX(-50%) rotate(-3deg);
    border-radius: 3px;
    box-shadow: -2px 0 4px rgba(0,0,0,0.4);
  }
  .sl-hose-nailer {
    position: absolute; bottom: 12%; left: 6px; width: 64px; height: 80px;
    transform: rotate(8deg);
  }
  .sl-hose-bar {
    position: absolute; top: 4px; left: 8px; width: 48px; height: 22px;
    background: linear-gradient(180deg, #2F2F33, #18181B);
    border-radius: 4px;
    box-shadow: inset 0 1px 0 rgba(255,255,255,0.08), 0 4px 8px rgba(0,0,0,0.4);
  }
  .sl-hose-grip {
    position: absolute; top: 28px; left: 16px; width: 30px; height: 48px;
    background: #C66A2C;
    border-radius: 0 0 8px 8px;
    box-shadow: inset -3px 0 0 rgba(0,0,0,0.25);
  }

  .sl-hero-content { position: relative; z-index: 2; max-width: 780px; }
  .sl-hero-tag {
    font-family: 'Archivo', sans-serif; font-size: 12px; letter-spacing: 0.32em;
    color: var(--chalk); margin-bottom: 28px;
  }
  .sl-hero-h1 {
    font-family: 'Archivo', sans-serif; font-weight: 800;
    font-size: clamp(46px, 7vw, 92px); line-height: 0.95;
    letter-spacing: -0.01em; margin: 0 0 24px;
    color: var(--paper);
  }
  .sl-hero-h1-blue { color: var(--chalk-bright); }
  .sl-hero-sub {
    font-size: 18px; line-height: 1.65; max-width: 580px;
    color: #B7B7BD; margin: 0 0 32px;
  }
  .sl-cta-row { display: flex; gap: 16px; flex-wrap: wrap; margin-bottom: 40px; }
  .sl-cta {
    display: inline-flex; align-items: center;
    padding: 14px 22px; text-decoration: none;
    font-family: 'Archivo', sans-serif; font-weight: 800;
    letter-spacing: 0.18em; font-size: 13px;
    border: 1px solid var(--chalk);
    transition: background 180ms ease, color 180ms ease, transform 180ms ease;
  }
  .sl-cta-primary { background: var(--chalk); color: var(--bg); }
  .sl-cta-primary:hover, .sl-cta-primary:focus-visible {
    background: var(--chalk-bright); transform: translateY(-2px);
    outline: none;
  }
  .sl-cta-ghost { color: var(--paper); background: transparent; }
  .sl-cta-ghost:hover, .sl-cta-ghost:focus-visible {
    background: rgba(79,138,182,0.18); transform: translateY(-2px);
    outline: none;
  }

  .sl-hero-stats {
    list-style: none; padding: 0; margin: 0;
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px; padding-top: 24px;
    border-top: 1px solid #1F1F25;
  }
  .sl-hero-stats li { display: flex; flex-direction: column; gap: 4px; }
  .sl-hero-stats strong {
    font-family: 'Archivo', sans-serif; font-weight: 800; font-size: 26px;
    color: var(--chalk-bright); letter-spacing: 0.02em;
  }
  .sl-hero-stats span {
    font-size: 12px; letter-spacing: 0.18em; color: #8B8B92;
    text-transform: uppercase;
  }

  .sl-h2-row {
    max-width: 1280px; margin: 0 auto;
    display: flex; gap: 18px; align-items: baseline;
    padding: 0 48px 18px; border-bottom: 1px dashed #2A2A30;
    margin-bottom: 26px;
  }
  .sl-h2 {
    font-family: 'Archivo', sans-serif; font-weight: 900;
    font-size: clamp(28px, 4vw, 44px); letter-spacing: 0.02em; margin: 0;
    color: var(--paper);
  }
  .sl-h2-label {
    margin-left: auto; order: 2;
    font-size: 11px; letter-spacing: 0.28em; color: var(--chalk);
    font-family: 'Archivo', sans-serif; font-weight: 600;
  }

  .sl-course-block { padding: 80px 0; position: relative; }
  .sl-course {
    position: relative;
    max-width: 1280px; margin: 0 auto 18px;
    padding: 28px 48px;
    border-top: 1px solid #1F1F25;
    border-bottom: 1px solid #1F1F25;
    background: linear-gradient(180deg, rgba(20,20,22,0.5), rgba(15,15,18,0.2));
    transition: transform 200ms ease, background 200ms ease;
    outline: none;
  }
  .sl-course:hover, .sl-course:focus-visible {
    background: linear-gradient(180deg, rgba(28,28,32,0.7), rgba(15,15,18,0.4));
    transform: translateX(2px);
  }
  .sl-course-snap {
    position: absolute; top: 0; left: 0; right: 0; height: 1px;
    background: var(--chalk); transform: scaleX(0); transform-origin: 0 50%;
    transition: transform 800ms ease;
    box-shadow: 0 0 4px rgba(79,138,182,0.5);
  }
  .sl-course.in .sl-course-snap { transform: scaleX(1); }
  .sl-course-grid {
    display: grid; grid-template-columns: 100px 1fr 240px;
    gap: 32px; align-items: start;
  }
  .sl-course-num { display: flex; flex-direction: column; gap: 6px; }
  .sl-course-no {
    font-family: 'Archivo', sans-serif; font-weight: 900; font-size: 56px;
    color: var(--chalk); line-height: 0.9; letter-spacing: -0.02em;
  }
  .sl-course-title {
    font-family: 'Archivo', sans-serif; font-weight: 700; font-size: 11px;
    letter-spacing: 0.24em; color: #B7B7BD;
  }
  .sl-course-headline {
    font-family: 'Archivo', sans-serif; font-weight: 800;
    font-size: 26px; line-height: 1.15; margin: 0 0 12px;
    color: var(--paper);
  }
  .sl-course-body {
    font-size: 15px; line-height: 1.65; color: #B7B7BD; margin: 0 0 14px;
    max-width: 56ch;
  }
  .sl-course-spec {
    display: inline-block;
    font-family: 'Archivo', sans-serif; font-weight: 600;
    font-size: 11px; letter-spacing: 0.24em;
    color: var(--chalk); padding: 4px 10px;
    border: 1px solid var(--chalk);
  }
  .sl-mfg { position: relative; min-height: 110px; }
  .sl-mfg-label {
    font-family: 'Archivo', sans-serif; font-size: 10px; letter-spacing: 0.28em;
    color: #6E6E76; display: block; margin-bottom: 10px;
  }
  .sl-mfg-card {
    background: #16161A;
    border: 1px solid var(--mfg);
    padding: 14px 16px;
    transition: transform 220ms ease, border-color 220ms ease, background 220ms ease;
    cursor: default;
  }
  .sl-course:hover .sl-mfg-card,
  .sl-course:focus-within .sl-mfg-card {
    transform: translateY(-3px);
    background: linear-gradient(180deg, rgba(255,255,255,0.04), rgba(0,0,0,0));
  }
  .sl-mfg-swatch {
    display: inline-block; width: 100%; height: 24px;
    background: var(--mfg); margin-bottom: 10px;
  }
  .sl-mfg-name {
    display: block;
    font-family: 'Archivo', sans-serif; font-weight: 800; font-size: 16px;
    color: var(--paper); margin-bottom: 4px;
  }
  .sl-mfg-warranty {
    font-size: 12px; color: #B7B7BD; line-height: 1.4;
  }

  .sl-recent { padding: 80px 0; }
  .sl-recent-list {
    max-width: 1280px; margin: 0 auto;
    padding: 0 48px;
    border-top: 1px solid #2A2A30;
  }
  .sl-recent-row {
    display: grid;
    grid-template-columns: 2fr 1fr 0.6fr 1fr;
    gap: 18px; padding: 16px 0;
    border-bottom: 1px solid #1F1F25;
    font-size: 14px;
    transition: background 180ms ease, padding-left 180ms ease;
  }
  .sl-recent-row:hover {
    background: rgba(79,138,182,0.06); padding-left: 8px;
  }
  .sl-recent-addr { color: var(--paper); font-weight: 600; }
  .sl-recent-sf, .sl-recent-pitch { color: #B7B7BD; font-variant-numeric: tabular-nums; }
  .sl-recent-color { color: var(--chalk); font-style: italic; }

  .sl-pen { padding: 80px 0; }
  .sl-pen-grid {
    max-width: 1280px; margin: 0 auto;
    padding: 0 48px;
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 18px;
  }
  .sl-pen-card {
    background: #15151A; border: 1px solid #2A2A30;
    padding: 22px 22px;
    transition: border-color 200ms ease, transform 200ms ease;
  }
  .sl-pen-card:hover, .sl-pen-card:focus-within {
    border-color: var(--chalk);
    transform: translateY(-3px);
  }
  .sl-pen-icon { width: 60px; height: 60px; margin-bottom: 14px; }
  .sl-pen-type {
    font-family: 'Archivo', sans-serif; font-weight: 800; font-size: 18px;
    color: var(--paper); margin-bottom: 4px;
  }
  .sl-pen-make {
    font-size: 12px; letter-spacing: 0.18em; color: var(--chalk);
    text-transform: uppercase; margin-bottom: 10px;
  }
  .sl-pen-note { font-size: 14px; line-height: 1.6; color: #B7B7BD; margin: 0; }

  .sl-footer {
    margin-top: 64px;
    background: #08080A;
    padding-bottom: 18px;
    position: relative;
    border-top: 1px solid #1F1F25;
  }
  .sl-foot-snap {
    height: 1px; background: var(--chalk); margin-bottom: 28px;
    box-shadow: 0 0 6px rgba(79,138,182,0.6);
  }
  .sl-foot-grid {
    max-width: 1280px; margin: 0 auto;
    padding: 0 48px;
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 32px;
    color: #B7B7BD;
    font-size: 14px; line-height: 1.65;
  }
  .sl-foot-label {
    font-family: 'Archivo', sans-serif; font-size: 11px; letter-spacing: 0.28em;
    color: var(--chalk); margin-bottom: 6px;
  }
  .sl-foot-mark {
    text-align: center; padding-top: 28px; margin-top: 28px;
    border-top: 1px dashed #1F1F25;
    font-family: 'Archivo', sans-serif; font-size: 11px;
    letter-spacing: 0.28em; color: #6E6E76;
  }

  @media (max-width: 880px) {
    .sl-course-grid { grid-template-columns: 1fr; }
    .sl-recent-row { grid-template-columns: 1fr; gap: 4px; }
    .sl-pen-grid, .sl-foot-grid { grid-template-columns: 1fr; }
    .sl-hero { padding: 64px 24px; }
    .sl-h2-row, .sl-course, .sl-recent-list, .sl-pen-grid, .sl-foot-grid { padding-left: 24px; padding-right: 24px; }
    .sl-hose { display: none; }
  }

  @media (prefers-reduced-motion: reduce) {
    .sl-snap { animation: none; opacity: 0.6; transform: scaleX(1); }
    .sl-course-snap { transition: none; transform: scaleX(1); }
    .sl-course:hover, .sl-course:focus-visible { transform: none; }
    .sl-mfg-card, .sl-cta { transition: none; }
    .sl-course:hover .sl-mfg-card,
    .sl-course:focus-within .sl-mfg-card { transform: none; }
  }
`;
