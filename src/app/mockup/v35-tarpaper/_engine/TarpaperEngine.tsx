"use client";

/**
 * TarpaperEngine — V35 Tarpaper
 *
 * Full-bleed black 30# felt with visible grain. Chalk-blue snap line slashes
 * across the upper third. OC pink bundle wrapper as a tonal stripe. Druk Wide
 * for the headline. Brutalist, jobsite-true.
 */

import { useState } from "react";

const COURSES = [
  {
    label: "01 — TEAR-OFF",
    head: "Tear-off Tuesday.",
    body:
      "Strip to the deck. Sheath any rot we find before underlayment. We tarp the landscaping; we sweep the driveway twice.",
    spec: "Two dump trailers staged. Magnetic sweep at the start of every break.",
  },
  {
    label: "02 — DRY-IN",
    head: "Dry-in by Friday.",
    body:
      "Synthetic underlayment, 6\" overlap, cap-nailed at the edges. Ice-and-water at every valley, eave, and around every penetration.",
    spec: "Tri-Built TX or GAF Tiger Paw. 36\" ice-and-water at eaves on slopes < 6/12.",
  },
  {
    label: "03 — SHINGLE",
    head: "Course up the slope.",
    body:
      "Starter strip set true to the chalk line. 6-nail pattern in high-wind zones. Step flashing woven, not face-nailed.",
    spec: "GAF Timberline HDZ or OC Duration. Step flash kicked out at every wall termination.",
  },
  {
    label: "04 — RIDGE CAP",
    head: "Ridge cap before the rain.",
    body:
      "Ridge vent set. Cap shingles single-bundled. Magnetic sweeper across the lawn before the truck pulls out.",
    spec: "GAF TimberTex or OC ProEdge. Final mag sweep — ten-yard grid, two passes.",
  },
];

const BUNDLES = [
  { name: "GAF — Charcoal", color: "#2A2A2C", note: "Timberline HDZ. Algae-resistant. 30-yr ltd transferable." },
  { name: "OC — Owens Corning", color: "#E794AC", note: "Duration. SureNail strip. ProEdge ridge cap." },
  { name: "CertainTeed — Black Pearl", color: "#1A1A1B", note: "Landmark Pro. StreakFighter. SureStart Plus." },
  { name: "TAMKO — Slate", color: "#46484C", note: "Heritage. Algae-cleaner free of charge for 10 years." },
];

const ROOFS = [
  {
    addr: "127 Pine Street",
    bundles: "32 sq",
    pitch: "8/12",
    note: "Tear-off and dry-in in one day. Ridge cap Friday afternoon. Owner sent steaks.",
  },
  {
    addr: "418 Birch Lane",
    bundles: "24 sq",
    pitch: "6/12",
    note: "Step flashing replaced at the chimney. New pipe boots in graduated sizes. Mag swept twice.",
  },
  {
    addr: "82 Oak Hollow",
    bundles: "44 sq",
    pitch: "10/12",
    note: "Two-day tear-off. Synthetic underlayment, ice-and-water at every valley. Architectural laminate, charcoal.",
  },
  {
    addr: "501 Cedar Court",
    bundles: "28 sq",
    pitch: "5/12",
    note: "Low slope; double-coverage 90# at the eaves. Ridge vent retrofit. Insurance-approved scope.",
  },
];

export default function TarpaperEngine() {
  const [openCourse, setOpenCourse] = useState<number | null>(0);
  const [activeBundle, setActiveBundle] = useState<number | null>(null);

  return (
    <>
      <style>{css}</style>
      <div className="tp-shell">
        {/* Felt grain */}
        <div className="tp-grain" aria-hidden />

        {/* TOP STRIP */}
        <header className="tp-top">
          <div className="tp-mark">
            <span className="tp-mark-strip tp-mark-strip-1" aria-hidden />
            <span className="tp-mark-strip tp-mark-strip-2" aria-hidden />
            <span className="tp-mark-strip tp-mark-strip-3" aria-hidden />
            <span className="tp-mark-text">KPT — ROOFING DIV.</span>
          </div>
          <nav className="tp-nav" aria-label="Primary">
            <a className="tp-nav-link" href="#underlayment">Underlayment</a>
            <a className="tp-nav-link" href="#bundles">Bundles</a>
            <a className="tp-nav-link" href="#recent">Recent roofs</a>
            <a className="tp-nav-link tp-nav-cta" href="#tearoff">Schedule a tear-off</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="tp-hero">
          {/* Chalk snap line */}
          <div className="tp-chalk" aria-hidden>
            <div className="tp-chalk-line" />
            <div className="tp-chalk-dust" />
          </div>

          {/* OC pink bundle wrapper at right margin */}
          <div className="tp-pink" aria-hidden>
            <span className="tp-pink-stamp">OC</span>
            <span className="tp-pink-stamp tp-pink-stamp-rotated">OWENS</span>
            <span className="tp-pink-stamp">CORNING</span>
            <span className="tp-pink-stamp tp-pink-stamp-rotated">DURATION</span>
            <span className="tp-pink-stamp">OC</span>
          </div>

          <div className="tp-hero-content">
            <p className="tp-hero-cite">DECK MARK · 6/12 — N SLOPE</p>
            <h1 className="tp-headline">
              Tear-off Tuesday.
              <br />
              Dry-in by Friday.
              <br />
              <span className="tp-headline-mark">Ridge cap</span> before the rain.
            </h1>
            <p className="tp-sub">
              Roofing crews who lay underlayment in straight courses and
              mag-sweep the driveway before we leave.
            </p>
            <div className="tp-cta-row">
              <a href="#tearoff" className="tp-cta tp-cta-primary">Schedule a tear-off</a>
              <a href="#underlayment" className="tp-cta tp-cta-secondary">See the underlayment spec</a>
            </div>

            <div className="tp-stamps">
              <div className="tp-stamp">
                <p className="tp-stamp-key">CERTS</p>
                <p className="tp-stamp-val">GAF Master Elite</p>
              </div>
              <div className="tp-stamp">
                <p className="tp-stamp-key">EXP</p>
                <p className="tp-stamp-val">22 years on roofs</p>
              </div>
              <div className="tp-stamp">
                <p className="tp-stamp-key">WARRANTY</p>
                <p className="tp-stamp-val">Lifetime ltd transferable</p>
              </div>
              <div className="tp-stamp">
                <p className="tp-stamp-key">SWEEP</p>
                <p className="tp-stamp-val">Mag &times; 2 every job</p>
              </div>
            </div>
          </div>
        </section>

        {/* UNDERLAYMENT — courses */}
        <section className="tp-section" id="underlayment">
          <header className="tp-section-head">
            <span className="tp-section-num">§ 01</span>
            <h2 className="tp-section-title">Underlayment</h2>
            <p className="tp-section-kicker">
              Course-by-course service rows. Click a course to lay it up the
              slope. Each course is what the crew is doing on that day.
            </p>
          </header>

          <ol className="tp-courses">
            {COURSES.map((c, i) => {
              const open = openCourse === i;
              return (
                <li key={c.label} className={open ? "is-open" : ""}>
                  <button
                    type="button"
                    className={`tp-course${open ? " is-open" : ""}`}
                    onClick={() => setOpenCourse((cur) => (cur === i ? null : i))}
                    aria-expanded={open}
                  >
                    <span className="tp-course-label">{c.label}</span>
                    <span className="tp-course-head">{c.head}</span>
                    <span className="tp-course-mark" aria-hidden>{open ? "—" : "+"}</span>
                  </button>
                  <div className="tp-course-body" aria-hidden={!open}>
                    <p className="tp-course-text">{c.body}</p>
                    <p className="tp-course-spec">
                      <span className="tp-course-spec-tag">SPEC</span>
                      {c.spec}
                    </p>
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        {/* BUNDLES */}
        <section className="tp-section" id="bundles">
          <header className="tp-section-head">
            <span className="tp-section-num">§ 02</span>
            <h2 className="tp-section-title">Bundles</h2>
            <p className="tp-section-kicker">
              Manufacturer swatches as bundle-wrap stripes. Hover to read
              what we&apos;re running this season.
            </p>
          </header>

          <div className="tp-bundles">
            {BUNDLES.map((b, i) => (
              <button
                type="button"
                key={b.name}
                className={`tp-bundle${activeBundle === i ? " is-active" : ""}`}
                onMouseEnter={() => setActiveBundle(i)}
                onMouseLeave={() =>
                  setActiveBundle((cur) => (cur === i ? null : cur))
                }
                onFocus={() => setActiveBundle(i)}
                onBlur={() =>
                  setActiveBundle((cur) => (cur === i ? null : cur))
                }
                aria-pressed={activeBundle === i}
              >
                <span
                  className="tp-bundle-strip"
                  style={{ background: b.color }}
                  aria-hidden
                />
                <span className="tp-bundle-name">{b.name}</span>
                <span className="tp-bundle-note">{b.note}</span>
              </button>
            ))}
          </div>
        </section>

        {/* RECENT ROOFS */}
        <section className="tp-section" id="recent">
          <header className="tp-section-head">
            <span className="tp-section-num">§ 03</span>
            <h2 className="tp-section-title">Recent roofs</h2>
            <p className="tp-section-kicker">
              Project cards mounted on the felt. Hover briefly reveals the
              decking grain underneath.
            </p>
          </header>

          <ul className="tp-roofs">
            {ROOFS.map((r) => (
              <li key={r.addr} className="tp-roof">
                <div className="tp-roof-deck" aria-hidden />
                <div className="tp-roof-card">
                  <header className="tp-roof-head">
                    <span className="tp-roof-addr">{r.addr}</span>
                    <span className="tp-roof-pitch">{r.pitch}</span>
                  </header>
                  <p className="tp-roof-bundles">{r.bundles}</p>
                  <p className="tp-roof-note">{r.note}</p>
                </div>
              </li>
            ))}
          </ul>
        </section>

        {/* FOOTER */}
        <footer className="tp-foot" id="tearoff">
          <div className="tp-foot-snap" aria-hidden>
            <div className="tp-foot-snap-line" />
          </div>
          <div className="tp-foot-grid">
            <div>
              <p className="tp-foot-label">Crew lead</p>
              <p className="tp-foot-value">D. Tomasi — 22 yrs on roofs</p>
            </div>
            <div>
              <p className="tp-foot-label">Manufacturer certs</p>
              <p className="tp-foot-value">GAF Master Elite · OC Platinum Preferred</p>
            </div>
            <div>
              <p className="tp-foot-label">Magnetic sweep</p>
              <p className="tp-foot-value">Two passes, every job, included</p>
            </div>
            <div>
              <p className="tp-foot-label">Schedule</p>
              <p className="tp-foot-value">
                <a className="tp-foot-link" href="#tearoff">tear-off@kpt-roofs.work</a>
              </p>
            </div>
          </div>
          <p className="tp-foot-rule">
            © KPT Roofing 2026 — Felt is canvas. Chalk lines are gospel.
            Ridge cap before the rain.
          </p>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Archivo+Black&family=Archivo+Narrow:wght@400;500;600;700&family=JetBrains+Mono:wght@500;700&display=swap');

:root, .tp-shell {
  --felt: #0F0F11;
  --felt-2: #15161A;
  --decking: #2A2017;
  --chalk: #4F87B0;
  --chalk-bright: #6FA8CF;
  --pink: #E794AC;
  --pink-deep: #BE6B86;
  --paper: #F2EFEA;
  --paper-soft: #C8C5BD;
  --rule: #2B2D31;
}

.tp-shell {
  position: relative;
  font-family: 'Archivo Narrow', sans-serif;
  color: var(--paper);
  background: var(--felt);
  max-width: 1320px;
  margin: 0 auto;
  padding: 32px 40px 80px;
  line-height: 1.5;
  -webkit-font-smoothing: antialiased;
  overflow: hidden;
}

/* Felt grain — multi-layer noise simulating asphalt-saturated felt */
.tp-grain {
  position: absolute;
  inset: 0;
  pointer-events: none;
  opacity: 0.55;
  mix-blend-mode: overlay;
  background-image:
    radial-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
    radial-gradient(rgba(0,0,0,0.18) 1px, transparent 1px),
    repeating-linear-gradient(
      35deg,
      rgba(255,255,255,0.015) 0 1px,
      transparent 1px 4px
    ),
    repeating-linear-gradient(
      125deg,
      rgba(0,0,0,0.08) 0 1px,
      transparent 1px 5px
    );
  background-size: 5px 5px, 7px 7px, auto, auto;
  background-position: 0 0, 2px 3px, 0 0, 0 0;
}

/* TOP */
.tp-top {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px dashed var(--paper-soft);
  padding-bottom: 16px;
  margin-bottom: 0;
  z-index: 2;
}
.tp-mark {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.16em;
}
.tp-mark-strip {
  width: 14px;
  height: 22px;
  display: inline-block;
}
.tp-mark-strip-1 { background: #2A2A2C; border: 1px solid #3a3a3c; }
.tp-mark-strip-2 { background: var(--pink); }
.tp-mark-strip-3 { background: #1A1A1B; border: 1px solid #2a2a2b; }
.tp-mark-text { margin-left: 10px; }
.tp-nav {
  display: flex;
  gap: 24px;
  font-size: 13px;
  font-weight: 600;
  letter-spacing: 0.04em;
}
.tp-nav-link {
  color: var(--paper);
  text-decoration: none;
  border-bottom: 1px solid transparent;
  padding-bottom: 2px;
  transition: border-color 160ms, color 160ms;
}
.tp-nav-link:hover, .tp-nav-link:focus-visible {
  border-bottom-color: var(--chalk-bright);
  color: var(--chalk-bright);
  outline: none;
}
.tp-nav-cta {
  background: var(--pink);
  color: var(--felt);
  padding: 8px 14px;
  border-bottom: none;
  font-weight: 700;
}
.tp-nav-cta:hover, .tp-nav-cta:focus-visible {
  background: var(--paper);
  color: var(--felt);
  border-bottom: none;
}

/* HERO */
.tp-hero {
  position: relative;
  min-height: 620px;
  padding: 80px 0 60px;
  margin-bottom: 100px;
}
.tp-chalk {
  position: absolute;
  top: 18%;
  left: -40px;
  right: -40px;
  height: 18px;
  pointer-events: none;
}
.tp-chalk-line {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  height: 2px;
  background: linear-gradient(
    90deg,
    transparent 0%,
    rgba(79,135,176,0.85) 4%,
    rgba(111,168,207,1) 50%,
    rgba(79,135,176,0.85) 96%,
    transparent 100%
  );
  box-shadow: 0 0 6px rgba(111,168,207,0.6);
}
.tp-chalk-dust {
  position: absolute;
  inset: 0;
  background-image:
    radial-gradient(circle, rgba(111,168,207,0.12) 1px, transparent 2px);
  background-size: 9px 9px;
  opacity: 0.7;
  animation: tp-chalk-fade 1400ms ease-out 1 both;
}
@keyframes tp-chalk-fade {
  0% { opacity: 0; }
  20% { opacity: 0.95; }
  100% { opacity: 0.7; }
}

.tp-pink {
  position: absolute;
  top: 0;
  right: -40px;
  bottom: 0;
  width: 96px;
  background:
    repeating-linear-gradient(
      0deg,
      var(--pink) 0 22px,
      var(--pink-deep) 22px 24px,
      var(--pink) 24px 60px
    );
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding: 28px 0;
  pointer-events: none;
}
.tp-pink-stamp {
  font-family: 'Archivo Black', sans-serif;
  font-size: 18px;
  letter-spacing: 0.05em;
  color: rgba(15,15,17,0.85);
  text-transform: uppercase;
}
.tp-pink-stamp-rotated { writing-mode: vertical-rl; transform: rotate(180deg); font-size: 16px; }

.tp-hero-content { position: relative; max-width: 880px; }
.tp-hero-cite {
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.2em;
  color: var(--chalk-bright);
  margin: 0 0 24px;
  font-weight: 700;
}
.tp-headline {
  font-family: 'Archivo Black', sans-serif;
  font-weight: 900;
  font-size: clamp(48px, 8vw, 108px);
  line-height: 0.92;
  letter-spacing: -0.015em;
  margin: 0 0 28px;
  text-transform: uppercase;
  color: var(--paper);
  font-stretch: 125%;
}
.tp-headline-mark {
  background: var(--pink);
  color: var(--felt);
  padding: 0 12px;
  display: inline-block;
}
.tp-sub {
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 19px;
  line-height: 1.5;
  max-width: 56ch;
  margin: 0 0 32px;
  color: var(--paper-soft);
}
.tp-cta-row { display: flex; gap: 14px; margin-bottom: 40px; flex-wrap: wrap; }
.tp-cta {
  font-family: 'Archivo Narrow', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 14px 22px;
  border: 2px solid var(--paper);
  transition: background 160ms, color 160ms, transform 160ms;
}
.tp-cta-primary { background: var(--pink); color: var(--felt); border-color: var(--pink); }
.tp-cta-primary:hover, .tp-cta-primary:focus-visible {
  background: var(--paper);
  color: var(--felt);
  border-color: var(--paper);
  outline: none;
  transform: translate(-2px, -2px);
}
.tp-cta-secondary { background: transparent; color: var(--paper); }
.tp-cta-secondary:hover, .tp-cta-secondary:focus-visible {
  background: var(--paper);
  color: var(--felt);
  outline: none;
  transform: translate(-2px, -2px);
}

.tp-stamps {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px 32px;
  border-top: 1px dashed var(--paper-soft);
  padding-top: 22px;
  max-width: 760px;
}
@media (max-width: 720px) { .tp-stamps { grid-template-columns: repeat(2, 1fr); } }
.tp-stamp-key {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  color: var(--chalk-bright);
  margin: 0 0 4px;
  font-weight: 700;
}
.tp-stamp-val {
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: var(--paper);
}

/* SECTIONS */
.tp-section {
  position: relative;
  margin-bottom: 96px;
  z-index: 2;
}
.tp-section-head {
  display: grid;
  grid-template-columns: 80px 1fr;
  gap: 24px 36px;
  align-items: baseline;
  margin-bottom: 36px;
  border-top: 1px dashed var(--paper-soft);
  padding-top: 24px;
}
.tp-section-num {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.16em;
  color: var(--chalk-bright);
}
.tp-section-title {
  font-family: 'Archivo Black', sans-serif;
  font-weight: 900;
  font-size: clamp(32px, 4.5vw, 56px);
  letter-spacing: -0.01em;
  margin: 0;
  font-stretch: 125%;
  text-transform: uppercase;
}
.tp-section-kicker {
  grid-column: 2;
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 16px;
  line-height: 1.55;
  max-width: 60ch;
  color: var(--paper-soft);
  margin: 0;
}

/* COURSES */
.tp-courses { list-style: none; margin: 0; padding: 0; }
.tp-courses > li {
  border-top: 1px solid var(--rule);
}
.tp-courses > li:last-child { border-bottom: 1px solid var(--rule); }
.tp-course {
  display: grid;
  grid-template-columns: 180px 1fr 32px;
  gap: 20px;
  align-items: baseline;
  width: 100%;
  background: transparent;
  border: 0;
  padding: 22px 0;
  text-align: left;
  cursor: pointer;
  font: inherit;
  color: var(--paper);
  transition: background 160ms;
}
.tp-course:hover, .tp-course:focus-visible {
  background: rgba(231,148,172,0.08);
  outline: none;
}
.tp-course-label {
  font-family: 'JetBrains Mono', monospace;
  font-weight: 700;
  font-size: 12px;
  letter-spacing: 0.18em;
  color: var(--chalk-bright);
}
.tp-course-head {
  font-family: 'Archivo Black', sans-serif;
  font-weight: 900;
  font-size: 26px;
  letter-spacing: -0.01em;
  text-transform: uppercase;
}
.tp-course-mark {
  font-family: 'Archivo Black', sans-serif;
  font-size: 22px;
  text-align: right;
  color: var(--pink);
}
.tp-course-body {
  display: grid;
  grid-template-columns: 180px 1fr 32px;
  gap: 20px;
  max-height: 0;
  overflow: hidden;
  transition: max-height 280ms cubic-bezier(.5,.1,.3,1), padding 200ms;
  padding: 0 0 0 0;
}
.tp-courses > li.is-open .tp-course-body {
  max-height: 320px;
  padding-bottom: 22px;
}
.tp-course-text {
  grid-column: 2;
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 17px;
  line-height: 1.5;
  margin: 0 0 12px;
  max-width: 60ch;
  color: var(--paper);
}
.tp-course-spec {
  grid-column: 2;
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  color: var(--paper-soft);
  margin: 0;
  line-height: 1.5;
}
.tp-course-spec-tag {
  display: inline-block;
  background: var(--chalk);
  color: var(--paper);
  font-weight: 700;
  font-size: 10px;
  letter-spacing: 0.16em;
  padding: 2px 6px;
  margin-right: 10px;
  vertical-align: middle;
}

/* BUNDLES */
.tp-bundles {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
}
@media (max-width: 880px) { .tp-bundles { grid-template-columns: repeat(2, 1fr); } }
.tp-bundle {
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: transparent;
  border: 1px solid var(--rule);
  padding: 0;
  cursor: pointer;
  text-align: left;
  font: inherit;
  color: var(--paper);
  transition: border-color 200ms, transform 200ms;
  overflow: hidden;
}
.tp-bundle:hover, .tp-bundle:focus-visible, .tp-bundle.is-active {
  border-color: var(--pink);
  outline: none;
  transform: translateY(-3px);
}
.tp-bundle-strip {
  display: block;
  width: 100%;
  height: 56px;
  border-bottom: 1px solid var(--rule);
}
.tp-bundle-name {
  font-family: 'Archivo Black', sans-serif;
  font-size: 16px;
  letter-spacing: 0.02em;
  padding: 12px 16px 0;
  text-transform: uppercase;
}
.tp-bundle-note {
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 13px;
  line-height: 1.45;
  color: var(--paper-soft);
  padding: 0 16px 14px;
}

/* RECENT ROOFS */
.tp-roofs {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px 24px;
}
@media (max-width: 720px) { .tp-roofs { grid-template-columns: 1fr; } }
.tp-roof {
  position: relative;
  isolation: isolate;
}
.tp-roof-deck {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(
      90deg,
      var(--decking) 0 36px,
      #2F231A 36px 38px,
      var(--decking) 38px 78px
    ),
    var(--decking);
  opacity: 0;
  transition: opacity 240ms;
  z-index: 0;
}
.tp-roof-card {
  position: relative;
  z-index: 1;
  background: var(--felt-2);
  border: 1px solid var(--rule);
  padding: 22px 26px;
  transition: transform 220ms, background 240ms, border-color 240ms;
}
.tp-roof:hover .tp-roof-deck, .tp-roof:focus-within .tp-roof-deck { opacity: 0.85; }
.tp-roof:hover .tp-roof-card, .tp-roof:focus-within .tp-roof-card {
  background: rgba(15,15,17,0.6);
  border-color: var(--pink);
  transform: translate(-4px, -4px);
}
.tp-roof-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 10px;
}
.tp-roof-addr {
  font-family: 'Archivo Black', sans-serif;
  font-size: 18px;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.tp-roof-pitch {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: var(--chalk-bright);
  background: rgba(79,135,176,0.18);
  padding: 2px 8px;
  font-weight: 700;
}
.tp-roof-bundles {
  font-family: 'JetBrains Mono', monospace;
  font-size: 13px;
  font-weight: 700;
  color: var(--pink);
  margin: 0 0 8px;
}
.tp-roof-note {
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 14px;
  line-height: 1.55;
  color: var(--paper-soft);
  margin: 0;
}

/* FOOTER */
.tp-foot {
  position: relative;
  border-top: 4px solid var(--paper);
  padding-top: 36px;
  margin-top: 24px;
  z-index: 2;
}
.tp-foot-snap {
  position: absolute;
  top: -2px;
  left: 0;
  right: 0;
  height: 12px;
  pointer-events: none;
}
.tp-foot-snap-line {
  position: absolute;
  top: 6px;
  left: -24px;
  right: -24px;
  height: 1px;
  background: var(--chalk);
  box-shadow: 0 0 6px rgba(79,135,176,0.4);
}
.tp-foot-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 24px;
  margin-bottom: 28px;
}
@media (max-width: 720px) { .tp-foot-grid { grid-template-columns: repeat(2, 1fr); } }
.tp-foot-label {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.16em;
  color: var(--chalk-bright);
  margin: 0 0 6px;
  font-weight: 700;
}
.tp-foot-value {
  font-family: 'Archivo Narrow', sans-serif;
  font-size: 14px;
  font-weight: 600;
  margin: 0;
  color: var(--paper);
}
.tp-foot-link {
  color: var(--pink);
  text-decoration: underline;
  text-decoration-thickness: 1.5px;
  text-underline-offset: 3px;
}
.tp-foot-link:hover, .tp-foot-link:focus-visible { color: var(--paper); outline: none; }
.tp-foot-rule {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  color: var(--paper-soft);
  border-top: 1px dashed var(--paper-soft);
  padding-top: 14px;
  margin: 0;
  letter-spacing: 0.06em;
}

@media (prefers-reduced-motion: reduce) {
  .tp-chalk-dust { animation: none !important; }
  .tp-bundle, .tp-cta, .tp-roof-card, .tp-roof-deck, .tp-course, .tp-nav-link {
    transition: none !important;
  }
}
`;
