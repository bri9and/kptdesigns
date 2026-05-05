"use client";

/**
 * StorypoleEngine — V39 Story Pole
 *
 * Vertical 1x4 maple rail down the left edge with Roman numerals burned in
 * at every height. Sections indexed by mark; scroll progress moves a tick
 * up the pole. Cabinet-shop quiet, Editorial-italic typography.
 */

import { useEffect, useRef, useState } from "react";

const MARKS = [
  { id: "I", title: "Bring a drawing", short: "Hello" },
  { id: "II", title: "By the mark", short: "Marks" },
  { id: "III", title: "Scribe and fit", short: "Scribe" },
  { id: "IV", title: "The shop", short: "Shop" },
  { id: "V", title: "Get a number", short: "Quote" },
];

const RUNS = [
  {
    mark: "II.i",
    title: "Mudroom built-in",
    where: "Newton Highlands",
    note: "Ten lockers off one stick. Hooks at IV. Bench seat at II. Cubbies at VI. The pole walked from foyer to mudroom; nothing measured twice.",
  },
  {
    mark: "II.ii",
    title: "Library wall",
    where: "Lexington",
    note: "Fifteen-foot run, three reveal heights. Crown returned at every column. The pole's burned numerals lined up to a 1/16 across all three bays.",
  },
  {
    mark: "II.iii",
    title: "Pantry banks",
    where: "Cambridge",
    note: "Out-of-square room (3/8 over 12'). Pole drawn from the corner stud, marks transferred to each face frame; reveals scribed at install.",
  },
];

const SCRIBES = [
  {
    label: "Crown to a settled ceiling",
    note: "Scribed 5/16 over a six-foot run. Sanded back to the line, no caulk in the joint.",
  },
  {
    label: "Base to a 1908 plaster wall",
    note: "Walked the pencil along the wall belly. Scribed and back-cut at 4°. Closes tight.",
  },
  {
    label: "Face frame to brick",
    note: "Stone wall, no two courses true. Pole marked the high spots; frame planed to suit.",
  },
];

const PENCILS = [
  { brand: "Pentel P205", lead: "0.5mm 2H", use: "Layout — clean line, no smudge under steel" },
  { brand: "Flat carpenter", lead: "soft graphite", use: "Stud bay & rough framing — sharpens with a knife" },
  { brand: "Blackwing 602", lead: "firm/balanced", use: "Story pole numerals — burns dark, erases clean" },
  { brand: "Mitsubishi 9800", lead: "HB", use: "Joinery cut lines — fine point holds at the saw" },
];

export default function StorypoleEngine() {
  const [progress, setProgress] = useState(0);
  const [activeMark, setActiveMark] = useState(0);
  const sectionRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const scrollable = h.scrollHeight - h.clientHeight;
      const p = scrollable > 0 ? Math.min(1, Math.max(0, h.scrollTop / scrollable)) : 0;
      setProgress(p);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            const idx = Number(e.target.getAttribute("data-mark-idx"));
            if (!isNaN(idx)) setActiveMark(idx);
          }
        });
      },
      { rootMargin: "-40% 0px -40% 0px" }
    );
    sectionRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="sp-shell">
        {/* The Pole — vertical maple rail */}
        <aside className="sp-pole" aria-hidden>
          <div className="sp-pole-grain" />
          <div className="sp-pole-marks">
            {MARKS.map((m, i) => (
              <div key={m.id} className={`sp-pole-mark${i <= activeMark ? " burned" : ""}`}>
                <span className="sp-pole-numeral">{m.id}</span>
                <span className="sp-pole-tick" />
                <span className="sp-pole-label">{m.short}</span>
              </div>
            ))}
          </div>
          <div
            className="sp-pole-tracker"
            style={{ top: `calc(8% + ${progress * 84}%)` }}
          >
            <span className="sp-pole-arrow">▸</span>
          </div>
          <div className="sp-pole-base">
            <svg viewBox="0 0 60 80" className="sp-pencil" aria-hidden>
              <polygon points="30,4 22,18 38,18" fill="#463125" />
              <rect x="22" y="18" width="16" height="50" fill="#E5CDA0" stroke="#463125" strokeWidth="0.5" />
              <rect x="22" y="68" width="16" height="6" fill="#463125" />
              <rect x="22" y="74" width="16" height="3" fill="#A1856A" />
            </svg>
          </div>
        </aside>

        {/* CONTENT COLUMN */}
        <div className="sp-content">
          <header className="sp-top">
            <div className="sp-mark-mini">
              <span className="sp-mark-roman">SP</span>
              <span className="sp-mark-name">Story Pole Cabinetry</span>
            </div>
            <nav className="sp-nav">
              {MARKS.map((m, i) => (
                <a key={m.id} href={`#mark-${m.id.toLowerCase()}`} className={i === activeMark ? "active" : ""}>
                  <span className="sp-nav-num">{m.id}</span>
                  <span className="sp-nav-lbl">{m.short}</span>
                </a>
              ))}
            </nav>
          </header>

          {/* HERO — Mark I */}
          <section
            id="mark-i"
            className="sp-hero"
            data-mark-idx="0"
            ref={(el) => { sectionRefs.current[0] = el; }}
          >
            <div className="sp-mark-tag">
              <span className="sp-mark-burn">I</span>
              <span className="sp-mark-rule" aria-hidden />
              <span className="sp-mark-text">at the height of mark VI</span>
            </div>
            <h1 className="sp-h1">
              <em>Cabinet runs</em> from one stick.
              <br />
              <span className="sp-h1-2">Plumb to the wall.</span>
            </h1>
            <p className="sp-sub">
              Finish carpentry and built-ins — every height transferred from a story
              pole, every reveal scribed to the room. We measure the room once, the
              stick stays true forever.
            </p>
            <div className="sp-ctas">
              <a className="sp-cta primary" href="#mark-v">Bring a drawing</a>
              <a className="sp-cta ghost" href="#mark-ii">See the millwork</a>
            </div>

            <div className="sp-hero-meta">
              <span><em>Established</em> &nbsp;MMVII</span>
              <span className="sep" />
              <span><em>Shop</em> &nbsp;Watertown, MA</span>
              <span className="sep" />
              <span><em>By</em> &nbsp;appointment</span>
            </div>
          </section>

          {/* MARK II — By the Mark */}
          <section
            id="mark-ii"
            className="sp-section"
            data-mark-idx="1"
            ref={(el) => { sectionRefs.current[1] = el; }}
          >
            <div className="sp-mark-tag">
              <span className="sp-mark-burn">II</span>
              <span className="sp-mark-rule" aria-hidden />
              <span className="sp-mark-text">By the mark</span>
            </div>
            <h2 className="sp-h2"><em>Recent runs</em>, indexed by where the pole said so.</h2>
            <ol className="sp-runs" role="list">
              {RUNS.map((r) => (
                <li key={r.mark} className="sp-run" tabIndex={0}>
                  <div className="sp-run-mark">{r.mark}</div>
                  <div>
                    <div className="sp-run-title">{r.title}</div>
                    <div className="sp-run-where">{r.where}</div>
                    <p className="sp-run-note">{r.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>

          {/* MARK III — Scribe and Fit */}
          <section
            id="mark-iii"
            className="sp-section"
            data-mark-idx="2"
            ref={(el) => { sectionRefs.current[2] = el; }}
          >
            <div className="sp-mark-tag">
              <span className="sp-mark-burn">III</span>
              <span className="sp-mark-rule" aria-hidden />
              <span className="sp-mark-text">Scribe and fit</span>
            </div>
            <h2 className="sp-h2"><em>Old houses</em> aren't square. We meet them where they are.</h2>

            <ul className="sp-scribes" role="list">
              {SCRIBES.map((s) => (
                <li key={s.label} className="sp-scribe" tabIndex={0}>
                  <svg viewBox="0 0 120 60" className="sp-scribe-svg" aria-hidden>
                    <path d="M 6 30 Q 30 18 60 30 T 114 30" fill="none" stroke="currentColor" strokeWidth="1.5" />
                    <path d="M 6 32 L 114 32" fill="none" stroke="currentColor" strokeWidth="0.6" strokeDasharray="2 3" />
                  </svg>
                  <div className="sp-scribe-label"><em>{s.label}</em></div>
                  <p className="sp-scribe-note">{s.note}</p>
                </li>
              ))}
            </ul>
          </section>

          {/* MARK IV — The Shop */}
          <section
            id="mark-iv"
            className="sp-section"
            data-mark-idx="3"
            ref={(el) => { sectionRefs.current[3] = el; }}
          >
            <div className="sp-mark-tag">
              <span className="sp-mark-burn">IV</span>
              <span className="sp-mark-rule" aria-hidden />
              <span className="sp-mark-text">The shop</span>
            </div>
            <h2 className="sp-h2"><em>Pencils, named</em> by job.</h2>
            <p className="sp-shop-intro">
              We argue about pencils. Religious intensity, friendly tone. Here's the
              loadout, picked by task — not by what's on sale at the hardware store.
            </p>
            <ul className="sp-pencils" role="list">
              {PENCILS.map((p) => (
                <li key={p.brand} className="sp-pencil-row" tabIndex={0}>
                  <div className="sp-pencil-brand">{p.brand}</div>
                  <div className="sp-pencil-lead"><em>{p.lead}</em></div>
                  <div className="sp-pencil-use">{p.use}</div>
                </li>
              ))}
            </ul>
          </section>

          {/* MARK V — CTA */}
          <section
            id="mark-v"
            className="sp-cta-block"
            data-mark-idx="4"
            ref={(el) => { sectionRefs.current[4] = el; }}
          >
            <div className="sp-mark-tag">
              <span className="sp-mark-burn">V</span>
              <span className="sp-mark-rule" aria-hidden />
              <span className="sp-mark-text">Get a number</span>
            </div>
            <h2 className="sp-h2-big"><em>Bring a drawing.</em><br />Or a napkin. We can work from either.</h2>
            <p className="sp-cta-sub">
              Send a sketch and a few room photos. We'll come walk it, draw the pole,
              and put a number on the wood within a week.
            </p>
            <div className="sp-ctas">
              <a className="sp-cta primary" href="#mark-v">Bring a drawing</a>
              <a className="sp-cta ghost" href="#mark-iv">See the shop</a>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="sp-foot">
            <div className="sp-foot-row">
              <div>
                <div className="sp-foot-h"><em>Story Pole</em></div>
                <div>Cabinetry &amp; finish carpentry</div>
              </div>
              <div>
                <div className="sp-foot-h"><em>Shop</em></div>
                <div>96 Galen Street, Watertown MA</div>
                <div>Tue–Fri by appointment</div>
              </div>
              <div>
                <div className="sp-foot-h"><em>Reach</em></div>
                <div>shop@storypole.test</div>
                <div>(617) 555-0162</div>
              </div>
              <div>
                <div className="sp-foot-h"><em>Warranty</em></div>
                <div>Cabinets warrantied for life of the home. Hardware adjustment first year, free.</div>
              </div>
            </div>
            <div className="sp-foot-burn" aria-hidden>
              ▸ POLE-DRAWN · SCRIBED-TO-ROOM · MMVII
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,400;1,500&family=Cormorant:ital,wght@0,400;1,300;1,400&family=IBM+Plex+Mono:wght@400;500&display=swap');

  .sp-shell {
    --maple: #E5CDA0;
    --maple-dark: #C9AD80;
    --burn: #463125;
    --char: #2A1C13;
    --black: #181816;
    --paper: #F4E8CD;
    font-family: 'Cormorant Garamond', Georgia, serif;
    color: var(--maple);
    background: var(--black);
    min-height: 100vh;
    display: grid;
    grid-template-columns: 84px 1fr;
    position: relative;
  }
  @media (max-width: 720px) { .sp-shell { grid-template-columns: 56px 1fr; } }

  /* POLE */
  .sp-pole {
    position: sticky; top: 0;
    height: 100vh;
    overflow: hidden;
    background:
      linear-gradient(90deg, rgba(0,0,0,0.35), transparent 18%, transparent 82%, rgba(0,0,0,0.5)),
      linear-gradient(180deg, #E5CDA0, #C9AD80 50%, #B89464 100%);
    border-right: 1.5px solid #463125;
  }
  .sp-pole-grain {
    position: absolute; inset: 0;
    background-image:
      repeating-linear-gradient(180deg, rgba(70,49,37,0.08) 0px, rgba(70,49,37,0.08) 1px, transparent 1px, transparent 4px),
      repeating-linear-gradient(180deg, rgba(70,49,37,0.16) 0 1px, transparent 1px 22px),
      radial-gradient(ellipse at 30% 16%, rgba(70,49,37,0.45) 0 6px, transparent 9px),
      radial-gradient(ellipse at 70% 56%, rgba(70,49,37,0.55) 0 8px, transparent 12px),
      radial-gradient(ellipse at 40% 82%, rgba(70,49,37,0.40) 0 5px, transparent 8px);
    mix-blend-mode: multiply;
    opacity: 0.85;
  }
  .sp-pole-marks {
    position: relative;
    height: 100%;
    display: flex; flex-direction: column;
    justify-content: space-between;
    padding: 8% 0 14%;
  }
  .sp-pole-mark {
    display: flex; flex-direction: column; align-items: center;
    color: rgba(70,49,37,0.35);
    transition: color 600ms ease-out, text-shadow 600ms ease-out;
  }
  .sp-pole-mark.burned {
    color: #2A1C13;
    text-shadow: 0 0 1px rgba(70,49,37,0.55), 0 0 4px rgba(0,0,0,0.25);
  }
  .sp-pole-numeral {
    font-family: 'Cormorant', serif;
    font-style: italic;
    font-weight: 400;
    font-size: clamp(20px, 2.4vw, 28px);
    line-height: 1;
  }
  .sp-pole-tick { display: none; }
  .sp-pole-label {
    margin-top: 4px;
    font-family: 'IBM Plex Mono', monospace;
    font-size: 9px;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    writing-mode: vertical-rl;
    transform: rotate(180deg);
  }
  .sp-pole-tracker {
    position: absolute;
    left: 0; right: 0;
    transition: top 250ms ease-out;
    pointer-events: none;
  }
  .sp-pole-arrow {
    display: block;
    text-align: center;
    color: var(--char);
    font-size: 18px;
    line-height: 1;
    text-shadow: 0 0 1px rgba(0,0,0,0.6), 0 -1px 0 rgba(255,235,200,0.3);
    animation: sp-tracker-pulse 1.6s ease-in-out infinite;
  }
  @keyframes sp-tracker-pulse {
    0%, 100% { transform: translateX(0); }
    50% { transform: translateX(2px); }
  }
  .sp-pole-base {
    position: absolute; bottom: 8px; left: 50%;
    transform: translateX(-50%) rotate(-6deg);
    width: 36px; height: 56px;
  }
  .sp-pencil { width: 100%; height: 100%; }

  /* CONTENT */
  .sp-content { min-width: 0; padding: 0 56px; }
  @media (max-width: 720px) { .sp-content { padding: 0 22px; } }

  .sp-top {
    display: flex; align-items: center; justify-content: space-between;
    padding: 26px 0 22px;
    border-bottom: 1px solid rgba(229,205,160,0.18);
  }
  .sp-mark-mini { display: flex; align-items: baseline; gap: 12px; }
  .sp-mark-roman {
    font-family: 'Cormorant', serif; font-style: italic;
    font-size: 30px; color: var(--maple);
  }
  .sp-mark-name {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--maple-dark);
  }
  .sp-nav { display: flex; gap: 16px; }
  .sp-nav a {
    display: flex; flex-direction: column; align-items: center; gap: 2px;
    color: var(--maple-dark);
    text-decoration: none;
    padding: 4px 6px;
    border-bottom: 1px solid transparent;
    transition: color 180ms, border-color 180ms;
  }
  .sp-nav a:hover, .sp-nav a:focus-visible, .sp-nav a.active {
    color: var(--paper); border-bottom-color: var(--paper); outline: none;
  }
  .sp-nav-num {
    font-family: 'Cormorant', serif; font-style: italic; font-size: 16px;
  }
  .sp-nav-lbl {
    font-family: 'IBM Plex Mono', monospace; font-size: 9px; letter-spacing: 0.18em;
    text-transform: uppercase;
  }

  .sp-mark-tag {
    display: flex; align-items: baseline; gap: 14px;
    margin-bottom: 24px;
    padding-top: 18px;
  }
  .sp-mark-burn {
    font-family: 'Cormorant', serif; font-style: italic;
    font-size: 44px; line-height: 1;
    color: #C9AD80;
    text-shadow: 0 0 0.3px #463125, 1px 1px 0 rgba(70,49,37,0.6);
  }
  .sp-mark-rule { flex: 1; height: 1px; background: linear-gradient(90deg, var(--maple-dark), transparent); }
  .sp-mark-text {
    font-family: 'IBM Plex Mono', monospace; font-size: 11px;
    letter-spacing: 0.22em; text-transform: uppercase; color: var(--maple-dark);
  }

  .sp-hero { padding: 56px 0 110px; }
  .sp-h1 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
    font-size: clamp(46px, 6.6vw, 102px);
    line-height: 1.0;
    letter-spacing: -0.005em;
    margin: 0 0 28px 0;
    color: var(--paper);
  }
  .sp-h1 em { font-style: italic; font-weight: 300; color: var(--maple); }
  .sp-h1-2 { display: inline; }
  .sp-sub {
    font-family: 'Cormorant Garamond', serif;
    font-size: clamp(18px, 1.4vw, 22px);
    line-height: 1.5;
    color: #D9C29A;
    max-width: 56ch;
    margin: 0 0 28px 0;
  }
  .sp-ctas { display: flex; gap: 16px; flex-wrap: wrap; }

  .sp-cta {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 12px;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    padding: 14px 22px;
    text-decoration: none;
    border: 1px solid var(--maple);
    color: var(--maple);
    transition: background 200ms, color 200ms, border-color 200ms;
    cursor: pointer;
  }
  .sp-cta.primary { background: var(--maple); color: var(--char); }
  .sp-cta.primary:hover, .sp-cta.primary:focus-visible {
    background: var(--paper); color: var(--char); outline: none;
  }
  .sp-cta.ghost:hover, .sp-cta.ghost:focus-visible {
    background: rgba(229,205,160,0.10);
    border-color: var(--paper); color: var(--paper); outline: none;
  }

  .sp-hero-meta {
    margin-top: 52px;
    display: flex; flex-wrap: wrap; gap: 14px; align-items: center;
    font-size: 14px; color: var(--maple-dark);
  }
  .sp-hero-meta em { font-style: italic; color: var(--maple); margin-right: 4px; }
  .sp-hero-meta .sep { width: 1px; height: 14px; background: var(--maple-dark); display: block; }

  .sp-section { padding: 28px 0 90px; }
  .sp-h2 {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
    font-size: clamp(28px, 3.4vw, 44px);
    line-height: 1.12;
    margin: 0 0 32px 0;
    color: var(--paper);
    max-width: 24ch;
  }
  .sp-h2 em { font-style: italic; color: var(--maple); }
  .sp-h2-big {
    font-family: 'Cormorant Garamond', serif;
    font-weight: 400;
    font-size: clamp(32px, 4.6vw, 64px);
    line-height: 1.05;
    margin: 0 0 20px 0;
    color: var(--paper);
  }
  .sp-h2-big em { font-style: italic; color: var(--maple); }

  .sp-runs {
    list-style: none; padding: 0; margin: 0;
    display: flex; flex-direction: column; gap: 0;
  }
  .sp-run {
    display: grid; grid-template-columns: 80px 1fr;
    gap: 24px;
    padding: 22px 0;
    border-top: 1px solid rgba(229,205,160,0.20);
    cursor: default;
    transition: background 200ms;
  }
  .sp-run:hover, .sp-run:focus-visible {
    background: rgba(229,205,160,0.05); outline: none;
  }
  .sp-run-mark {
    font-family: 'Cormorant', serif; font-style: italic;
    font-size: 30px; color: var(--maple-dark);
  }
  .sp-run:hover .sp-run-mark, .sp-run:focus-visible .sp-run-mark { color: var(--paper); }
  .sp-run-title {
    font-size: 22px; color: var(--paper); line-height: 1.15;
  }
  .sp-run-where {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 10px; letter-spacing: 0.22em; text-transform: uppercase;
    color: var(--maple-dark);
    margin-top: 2px; margin-bottom: 8px;
  }
  .sp-run-note { font-size: 16px; line-height: 1.55; margin: 0; color: #D9C29A; }

  .sp-scribes {
    list-style: none; padding: 0; margin: 0;
    display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
    gap: 20px;
  }
  .sp-scribe {
    padding: 22px 20px;
    background: linear-gradient(180deg, rgba(229,205,160,0.04), transparent);
    border-top: 1px solid rgba(229,205,160,0.30);
    color: var(--maple-dark);
    cursor: default;
    transition: color 200ms, border-color 200ms, background 200ms;
  }
  .sp-scribe:hover, .sp-scribe:focus-visible {
    color: var(--paper);
    border-top-color: var(--paper);
    background: linear-gradient(180deg, rgba(229,205,160,0.08), transparent);
    outline: none;
  }
  .sp-scribe-svg { width: 100%; height: 56px; color: var(--maple); margin-bottom: 8px; }
  .sp-scribe-label { font-size: 19px; color: var(--paper); }
  .sp-scribe-label em { font-style: italic; }
  .sp-scribe-note { font-size: 14.5px; line-height: 1.55; margin-top: 4px; margin-bottom: 0; }

  .sp-shop-intro {
    font-size: 17px; line-height: 1.55; color: #D9C29A;
    max-width: 60ch; margin: 0 0 28px 0;
  }
  .sp-pencils {
    list-style: none; padding: 0; margin: 0;
    border-top: 1px dashed rgba(229,205,160,0.28);
  }
  .sp-pencil-row {
    display: grid;
    grid-template-columns: 1.2fr 1fr 2fr;
    gap: 16px;
    padding: 16px 6px;
    border-bottom: 1px dashed rgba(229,205,160,0.20);
    color: #D9C29A;
    cursor: default;
    transition: background 200ms;
  }
  @media (max-width: 720px) {
    .sp-pencil-row { grid-template-columns: 1fr; gap: 4px; }
  }
  .sp-pencil-row:hover, .sp-pencil-row:focus-visible {
    background: rgba(229,205,160,0.06); outline: none;
  }
  .sp-pencil-brand {
    font-family: 'IBM Plex Mono', monospace;
    font-size: 13px;
    letter-spacing: 0.04em;
    color: var(--paper);
  }
  .sp-pencil-lead { font-size: 15px; }
  .sp-pencil-use { font-size: 14.5px; line-height: 1.45; }

  .sp-cta-block {
    padding: 80px 0 110px;
    border-top: 1px solid rgba(229,205,160,0.20);
  }
  .sp-cta-sub {
    font-size: 17px; line-height: 1.55; color: #D9C29A;
    max-width: 56ch; margin: 0 0 28px 0;
  }

  .sp-foot {
    padding: 48px 0 36px;
    border-top: 1px solid var(--maple-dark);
  }
  .sp-foot-row {
    display: grid; grid-template-columns: repeat(4, 1fr); gap: 24px;
    font-size: 14px; line-height: 1.55; color: #D9C29A;
  }
  @media (max-width: 880px) { .sp-foot-row { grid-template-columns: repeat(2, 1fr); } }
  @media (max-width: 520px) { .sp-foot-row { grid-template-columns: 1fr; } }
  .sp-foot-h {
    font-family: 'Cormorant', serif; font-style: italic; font-size: 22px;
    color: var(--paper); margin-bottom: 6px;
  }
  .sp-foot-burn {
    margin-top: 32px; padding-top: 18px;
    border-top: 1px dashed rgba(229,205,160,0.28);
    font-family: 'IBM Plex Mono', monospace;
    font-size: 11px; letter-spacing: 0.32em;
    color: var(--maple-dark);
    text-align: center;
  }

  @media (prefers-reduced-motion: reduce) {
    .sp-pole-arrow { animation: none; }
    .sp-pole-tracker { transition: none; }
    .sp-pole-mark { transition: none; }
    .sp-cta, .sp-run, .sp-scribe, .sp-pencil-row, .sp-nav a { transition: none; }
  }
`;
