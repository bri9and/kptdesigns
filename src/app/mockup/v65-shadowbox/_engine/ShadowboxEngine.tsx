"use client";

/**
 * ShadowboxEngine — V65 Shadowbox
 *
 * Museum-grade carpentry display. Each commission is a mounted artifact
 * in a shadowbox — archival linen ground, brass plate label, raking light
 * sweep on hover. Heirloom-grade carpentry showcase.
 */

import { useState } from "react";

const COMMISSIONS = [
  {
    id: "I",
    title: "Hand-cut dovetail — 8/4 white oak",
    series: "JOINERY · I",
    plate: "COMMISSION 412 · BACK BAY · 04 / 26 / 26",
    body: "Through-dovetail at the show face. Pins at 1:7 in oak, no jig. Scribe knife only.",
    artifact: "dovetail",
  },
  {
    id: "II",
    title: "Compound-mitered crown — 4 5/8 cove",
    series: "MILLWORK · II",
    plate: "COMMISSION 401 · BEACON HILL · 03 / 18 / 26",
    body: "Inside corner coped, outside compound-mitered. Proud 1/64 of the field, scribed to plaster.",
    artifact: "crown",
  },
  {
    id: "III",
    title: "Tapered sliding dovetail",
    series: "JOINERY · III",
    plate: "COMMISSION 388 · CAMBRIDGE · 02 / 09 / 26",
    body: "Drawer divider into a 5/4 stretcher. Hand-fit, glued at the front shoulder only.",
    artifact: "slider",
  },
  {
    id: "IV",
    title: "Raised-panel walnut door — 22 1/4",
    series: "DOORS · IV",
    plate: "COMMISSION 376 · NEWTON · 12 / 11 / 25",
    body: "Cope-and-stick frame in 8/4 walnut. Panel floats on space-balls, 1/8 reveal at the rail.",
    artifact: "panel",
  },
  {
    id: "V",
    title: "Mortise &amp; tenon — drawbore pinned",
    series: "JOINERY · V",
    plate: "COMMISSION 364 · BROOKLINE · 11 / 02 / 25",
    body: "Pegged 3/8 oak through-tenon, drawbored 1/16. Tightened on assembly, no clamp time required.",
    artifact: "tenon",
  },
  {
    id: "VI",
    title: "Hand-planed slab — figured maple",
    series: "SURFACES · VI",
    plate: "COMMISSION 351 · WESTON · 09 / 22 / 25",
    body: "Curly maple coffee table top. No sandpaper above 220 — finish is 80 shavings of a #4 1/2.",
    artifact: "slab",
  },
];

function Artifact({ id }: { id: string }) {
  if (id === "dovetail") {
    return (
      <svg viewBox="0 0 200 200" aria-hidden>
        <rect x="20" y="40" width="160" height="120" fill="#7A5C3A" stroke="#3E2C18" strokeWidth="2" />
        <path d="M40 40 L60 80 L80 40 M80 40 L100 80 L120 40 M120 40 L140 80 L160 40" stroke="#3E2C18" strokeWidth="2" fill="#5A4226" />
        <path d="M40 160 L40 120 L60 120 L60 160 M80 160 L80 120 L100 120 L100 160 M120 160 L120 120 L140 120 L140 160" stroke="#3E2C18" strokeWidth="2" fill="#5A4226" />
      </svg>
    );
  }
  if (id === "crown") {
    return (
      <svg viewBox="0 0 200 200" aria-hidden>
        <path d="M20 160 L20 140 Q60 80 100 80 Q140 80 180 140 L180 160 Z" fill="#9A7448" stroke="#3E2C18" strokeWidth="2" />
        <path d="M20 140 L180 140" stroke="#3E2C18" strokeWidth="1" />
        <path d="M40 100 Q100 60 160 100" stroke="#3E2C18" strokeWidth="1" fill="none" />
      </svg>
    );
  }
  if (id === "slider") {
    return (
      <svg viewBox="0 0 200 200" aria-hidden>
        <rect x="20" y="60" width="160" height="40" fill="#8A6238" stroke="#3E2C18" strokeWidth="2" />
        <rect x="20" y="100" width="160" height="40" fill="#7A5C3A" stroke="#3E2C18" strokeWidth="2" />
        <path d="M70 100 L90 60 L130 60 L150 100 Z" fill="#5A4226" stroke="#3E2C18" strokeWidth="2" />
      </svg>
    );
  }
  if (id === "panel") {
    return (
      <svg viewBox="0 0 200 200" aria-hidden>
        <rect x="20" y="20" width="160" height="160" fill="#3E2820" stroke="#1A1816" strokeWidth="2" />
        <path d="M44 44 L156 44 L140 60 L60 60 Z" fill="#5A3826" />
        <path d="M156 44 L156 156 L140 140 L140 60 Z" fill="#4A2E20" />
        <path d="M156 156 L44 156 L60 140 L140 140 Z" fill="#33201A" />
        <path d="M44 44 L44 156 L60 140 L60 60 Z" fill="#5A3826" />
        <rect x="60" y="60" width="80" height="80" fill="#7A4E32" stroke="#1A1816" strokeWidth="1" />
      </svg>
    );
  }
  if (id === "tenon") {
    return (
      <svg viewBox="0 0 200 200" aria-hidden>
        <rect x="40" y="40" width="50" height="120" fill="#7A5C3A" stroke="#3E2C18" strokeWidth="2" />
        <rect x="90" y="80" width="80" height="40" fill="#8A6238" stroke="#3E2C18" strokeWidth="2" />
        <rect x="40" y="80" width="50" height="40" fill="#5A4226" stroke="#3E2C18" strokeWidth="2" />
        <circle cx="65" cy="100" r="5" fill="#3E2C18" />
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 200 200" aria-hidden>
      <rect x="20" y="50" width="160" height="100" fill="#A88054" stroke="#3E2C18" strokeWidth="2" />
      <path d="M20 60 Q60 65 100 60 T180 65" stroke="#7A5C3A" strokeWidth="2" fill="none" />
      <path d="M20 90 Q60 95 100 90 T180 95" stroke="#7A5C3A" strokeWidth="2" fill="none" />
      <path d="M20 120 Q60 125 100 120 T180 125" stroke="#7A5C3A" strokeWidth="2" fill="none" />
    </svg>
  );
}

const JOINTS = [
  { name: "Through-dovetail", grade: "1:7 in oak / 1:8 in walnut" },
  { name: "Half-blind dovetail", grade: "drawer fronts only" },
  { name: "Mortise &amp; tenon", grade: "drawbored, 3/8 oak peg" },
  { name: "Sliding dovetail (tapered)", grade: "stretchers, dividers" },
  { name: "Cope &amp; stick", grade: "frame &amp; panel doors" },
  { name: "Bridle joint", grade: "show-frame mitered cases" },
];

export default function ShadowboxEngine() {
  const [active, setActive] = useState<string>("I");

  return (
    <>
      <style>{css}</style>
      <div className="sb-shell">
        <div className="sb-vignette" aria-hidden />

        {/* TOP BAR */}
        <header className="sb-top">
          <div className="sb-mark">
            <span className="sb-mark-name">KPT &middot; HEIRLOOM CARPENTRY</span>
            <span className="sb-mark-sub">A WORKING ARCHIVE OF COMMISSIONS — VOL. IV</span>
          </div>
          <nav className="sb-nav">
            <a href="#wall" className="sb-nav-link">The Wall</a>
            <a href="#brass" className="sb-nav-link">The Brass</a>
            <a href="#joints" className="sb-nav-link">Joint Library</a>
            <a href="#visit" className="sb-nav-link">Visit</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="sb-hero">
          <div className="sb-hero-shadowbox">
            <div className="sb-hero-mat">
              <div className="sb-hero-art">
                <Artifact id="dovetail" />
              </div>
              <div className="sb-hero-rake" aria-hidden />
            </div>
            <div className="sb-hero-brass">
              <span className="sb-brass-rule" aria-hidden />
              <p className="sb-brass-name">KPT</p>
              <p className="sb-brass-title">HEIRLOOM CARPENTRY &amp; MILLWORK</p>
              <p className="sb-brass-meta">FOUNDED 2018 &middot; BOSTON, MA</p>
            </div>
          </div>
          <div className="sb-hero-text">
            <span className="sb-eyebrow">Vol. IV — Spring Walk</span>
            <h1 className="sb-headline">
              Plumb. Square.
              <br />
              <em>Held in raking light.</em>
            </h1>
            <p className="sb-sub">
              Heirloom-grade carpentry and millwork — every commission catalogued,
              brass-plated, archived. The wall is the work; the work is the wall.
            </p>
            <div className="sb-cta-row">
              <a className="sb-cta sb-cta-primary" href="#wall">Visit the wall</a>
              <a className="sb-cta sb-cta-secondary" href="#brass">See the brass</a>
            </div>
          </div>
        </section>

        {/* THE WALL */}
        <section id="wall" className="sb-section">
          <header className="sb-section-head">
            <span className="sb-section-tag">I.</span>
            <h2 className="sb-section-title">The Wall</h2>
            <p className="sb-section-aside">Hover an artifact to light a raking spot across the joinery.</p>
          </header>
          <div className="sb-wall">
            {COMMISSIONS.map((c) => (
              <article
                key={c.id}
                className={`sb-box${active === c.id ? " on" : ""}`}
                tabIndex={0}
                onMouseEnter={() => setActive(c.id)}
                onFocus={() => setActive(c.id)}
              >
                <div className="sb-box-mat">
                  <div className="sb-box-art">
                    <Artifact id={c.artifact} />
                  </div>
                  <div className="sb-box-rake" aria-hidden />
                </div>
                <div className="sb-box-brass">
                  <span className="sb-box-series">{c.series}</span>
                  <p className="sb-box-title" dangerouslySetInnerHTML={{ __html: c.title }} />
                  <p className="sb-box-plate">{c.plate}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* THE BRASS */}
        <section id="brass" className="sb-section">
          <header className="sb-section-head">
            <span className="sb-section-tag">II.</span>
            <h2 className="sb-section-title">The Brass</h2>
            <p className="sb-section-aside">Each plate engraved at the bench. The cut, in copper-color.</p>
          </header>
          <div className="sb-brass-row">
            {COMMISSIONS.slice(0, 3).map((c) => (
              <figure key={c.id} className="sb-brass-card" tabIndex={0}>
                <div className="sb-brass-engrave">
                  <span className="sb-brass-rule" aria-hidden />
                  <p className="sb-brass-eyebrow">{c.series}</p>
                  <p className="sb-brass-cut" dangerouslySetInnerHTML={{ __html: c.title }} />
                  <p className="sb-brass-foot">{c.plate}</p>
                </div>
                <figcaption>{c.body}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* JOINT LIBRARY */}
        <section id="joints" className="sb-section">
          <header className="sb-section-head">
            <span className="sb-section-tag">III.</span>
            <h2 className="sb-section-title">The Joint Library</h2>
            <p className="sb-section-aside">A working set of joints, graded by where they earn their keep.</p>
          </header>
          <ol className="sb-joints">
            {JOINTS.map((j, i) => (
              <li key={j.name} className="sb-joint" tabIndex={0}>
                <span className="sb-joint-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="sb-joint-name" dangerouslySetInnerHTML={{ __html: j.name }} />
                <span className="sb-joint-grade" dangerouslySetInnerHTML={{ __html: j.grade }} />
              </li>
            ))}
          </ol>
        </section>

        {/* VISIT CTA */}
        <section id="visit" className="sb-section sb-section-visit">
          <div className="sb-visit-card">
            <span className="sb-eyebrow">Visit the shop</span>
            <h2 className="sb-visit-headline">Bring a drawing. Or a problem.</h2>
            <p className="sb-visit-body">
              The shop is on Chickering Lane. Coffee is on. We&rsquo;ll set the
              piece on the bench in raking light and you&rsquo;ll see what&rsquo;s
              wrong before we say a word.
            </p>
            <div className="sb-cta-row">
              <a className="sb-cta sb-cta-primary" href="#">Schedule a visit</a>
              <a className="sb-cta sb-cta-secondary" href="#">Read the warranty</a>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="sb-footer">
          <div className="sb-footer-row">
            <span>112 CHICKERING LN · BOSTON, MA</span>
            <span>WARRANTY: TWO YEAR ON JOINTS · LIFETIME ON THE FINISH</span>
            <span>&copy; 04 / 26 / 26 KPT HEIRLOOM CARPENTRY</span>
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;1,300;1,500&family=EB+Garamond:ital,wght@0,400;0,500;1,400&family=Inter:wght@400;500;600&display=swap');

.sb-shell {
  min-height: 100vh;
  background:
    radial-gradient(ellipse at 50% 0%, #2A2622 0%, #1A1816 60%, #0E0C0A 100%);
  color: #E5DDC9;
  font-family: 'Inter', system-ui, sans-serif;
  padding: 28px 24px 64px;
  position: relative;
  overflow-x: hidden;
}
.sb-vignette {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background: radial-gradient(ellipse at center, transparent 30%, rgba(14, 12, 10, 0.6) 100%);
}
.sb-shell > * { position: relative; z-index: 1; }

.sb-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  border-bottom: 1px solid rgba(182, 151, 83, 0.4);
  padding-bottom: 18px;
  margin-bottom: 36px;
}
.sb-mark { display: flex; flex-direction: column; gap: 4px; }
.sb-mark-name {
  font-family: 'Cormorant Garamond', serif;
  font-size: 22px;
  letter-spacing: 0.06em;
  color: #B69753;
}
.sb-mark-sub {
  font-family: 'EB Garamond', serif;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(229, 221, 201, 0.6);
}
.sb-nav { display: flex; gap: 22px; flex-wrap: wrap; }
.sb-nav-link {
  font-family: 'EB Garamond', serif;
  font-size: 14px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: #E5DDC9;
  text-decoration: none;
  padding-bottom: 4px;
  position: relative;
  transition: color 220ms ease;
}
.sb-nav-link::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: 0;
  height: 1px;
  background: #B69753;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 280ms cubic-bezier(0.7, 0, 0.3, 1);
}
.sb-nav-link:hover, .sb-nav-link:focus-visible {
  outline: none;
  color: #B69753;
}
.sb-nav-link:hover::after, .sb-nav-link:focus-visible::after { transform: scaleX(1); }
@media (prefers-reduced-motion: reduce) { .sb-nav-link::after { transition: none; } }

.sb-hero {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 72px;
  align-items: center;
  padding: 32px 0 80px;
  border-bottom: 1px solid rgba(182, 151, 83, 0.3);
  margin-bottom: 64px;
}
.sb-hero-shadowbox {
  background: linear-gradient(135deg, #2A2622 0%, #1A1612 100%);
  border: 1px solid rgba(182, 151, 83, 0.55);
  padding: 36px 36px 22px;
  position: relative;
  box-shadow:
    inset 0 0 0 6px rgba(14, 12, 10, 0.7),
    inset 0 0 0 7px rgba(182, 151, 83, 0.4),
    0 30px 60px rgba(0, 0, 0, 0.5);
}
.sb-hero-mat {
  background:
    repeating-linear-gradient(45deg, rgba(229, 221, 201, 0.04) 0px, rgba(229, 221, 201, 0.04) 2px, transparent 2px, transparent 5px),
    linear-gradient(180deg, #DDD3BA 0%, #C9BEA0 100%);
  padding: 28px;
  position: relative;
  overflow: hidden;
  box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.3);
}
.sb-hero-art {
  display: grid;
  place-items: center;
  height: 220px;
}
.sb-hero-art svg { width: 220px; height: 220px; filter: drop-shadow(4px 6px 8px rgba(14, 12, 10, 0.5)); }
.sb-hero-rake {
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, transparent 35%, rgba(255, 240, 200, 0.18) 50%, transparent 65%);
  pointer-events: none;
  animation: sb-rake 7s ease-in-out infinite;
}
@keyframes sb-rake {
  0%, 100% { transform: translateX(-30%); opacity: 0.4; }
  50% { transform: translateX(30%); opacity: 0.85; }
}
@media (prefers-reduced-motion: reduce) { .sb-hero-rake { animation: none; } }

.sb-hero-brass {
  margin-top: 18px;
  background: linear-gradient(180deg, #B69753 0%, #8B6F36 100%);
  padding: 14px 22px 16px;
  text-align: center;
  border: 1px solid rgba(14, 12, 10, 0.6);
  box-shadow: inset 0 1px 0 rgba(255, 220, 150, 0.5), 0 2px 4px rgba(0, 0, 0, 0.4);
  position: relative;
}
.sb-hero-brass::after {
  content: '';
  position: absolute;
  inset: 4px;
  border: 1px solid rgba(14, 12, 10, 0.4);
  pointer-events: none;
}
.sb-brass-rule { display: block; height: 1px; background: rgba(14, 12, 10, 0.4); margin: 0 0 10px; }
.sb-brass-name {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-weight: 500;
  font-size: 32px;
  letter-spacing: 0.08em;
  color: #1A1612;
  margin: 0 0 4px;
  text-shadow: 0 1px 0 rgba(255, 230, 170, 0.5);
}
.sb-brass-title {
  font-family: 'EB Garamond', serif;
  font-size: 11px;
  letter-spacing: 0.32em;
  color: #1A1612;
  margin: 0 0 4px;
}
.sb-brass-meta {
  font-family: 'EB Garamond', serif;
  font-size: 10px;
  letter-spacing: 0.2em;
  color: rgba(26, 22, 18, 0.7);
  margin: 0;
}

.sb-eyebrow {
  display: inline-block;
  font-family: 'EB Garamond', serif;
  font-size: 12px;
  letter-spacing: 0.32em;
  text-transform: uppercase;
  color: #B69753;
  margin-bottom: 18px;
  border-bottom: 1px solid rgba(182, 151, 83, 0.5);
  padding-bottom: 4px;
}
.sb-headline {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(48px, 7vw, 96px);
  line-height: 1;
  margin: 0 0 22px;
  color: #E5DDC9;
  letter-spacing: -0.005em;
}
.sb-headline em {
  font-style: italic;
  color: #B69753;
  font-weight: 300;
}
.sb-sub {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 21px;
  line-height: 1.55;
  color: rgba(229, 221, 201, 0.85);
  max-width: 520px;
  margin: 0 0 32px;
}

.sb-cta-row { display: flex; gap: 14px; flex-wrap: wrap; }
.sb-cta {
  font-family: 'EB Garamond', serif;
  font-size: 13px;
  letter-spacing: 0.28em;
  text-transform: uppercase;
  padding: 14px 24px;
  text-decoration: none;
  border: 1px solid #B69753;
  transition: background 220ms ease, color 220ms ease, transform 220ms ease;
}
.sb-cta-primary { background: #B69753; color: #1A1612; }
.sb-cta-primary:hover, .sb-cta-primary:focus-visible {
  outline: none;
  background: #E5DDC9;
  border-color: #E5DDC9;
  color: #1A1612;
  transform: translateY(-2px);
}
.sb-cta-secondary { background: transparent; color: #E5DDC9; }
.sb-cta-secondary:hover, .sb-cta-secondary:focus-visible {
  outline: none;
  background: rgba(182, 151, 83, 0.12);
  color: #B69753;
  transform: translateY(-2px);
}
@media (prefers-reduced-motion: reduce) { .sb-cta { transition: none; } }

.sb-section { padding: 48px 0; }
.sb-section-head {
  display: grid;
  grid-template-columns: 60px 1fr;
  gap: 16px;
  align-items: baseline;
  margin-bottom: 36px;
  border-bottom: 1px solid rgba(182, 151, 83, 0.35);
  padding-bottom: 18px;
}
.sb-section-tag {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 36px;
  color: #B69753;
}
.sb-section-title {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(36px, 5vw, 56px);
  margin: 0;
  color: #E5DDC9;
  letter-spacing: -0.005em;
}
.sb-section-aside {
  grid-column: 2;
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 16px;
  color: rgba(229, 221, 201, 0.6);
  margin: 4px 0 0;
}

.sb-wall {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 28px;
}
.sb-box {
  background: linear-gradient(135deg, #2A2622 0%, #1A1612 100%);
  border: 1px solid rgba(182, 151, 83, 0.4);
  padding: 22px 22px 16px;
  box-shadow:
    inset 0 0 0 4px rgba(14, 12, 10, 0.7),
    inset 0 0 0 5px rgba(182, 151, 83, 0.3),
    0 12px 24px rgba(0, 0, 0, 0.4);
  outline: none;
  transition: transform 360ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 360ms ease;
  animation: sb-drop 0.5s cubic-bezier(0.4, 0, 0.2, 1) both;
}
.sb-box:nth-child(2) { animation-delay: 80ms; }
.sb-box:nth-child(3) { animation-delay: 160ms; }
.sb-box:nth-child(4) { animation-delay: 240ms; }
.sb-box:nth-child(5) { animation-delay: 320ms; }
.sb-box:nth-child(6) { animation-delay: 400ms; }
@keyframes sb-drop {
  0% { transform: translateY(-12px); opacity: 0; }
  100% { transform: translateY(0); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) { .sb-box { animation: none; } }

.sb-box-mat {
  background:
    repeating-linear-gradient(45deg, rgba(229, 221, 201, 0.04) 0px, rgba(229, 221, 201, 0.04) 2px, transparent 2px, transparent 5px),
    linear-gradient(180deg, #DDD3BA 0%, #C9BEA0 100%);
  padding: 18px;
  height: 180px;
  position: relative;
  overflow: hidden;
  display: grid;
  place-items: center;
  box-shadow: inset 0 4px 12px rgba(0, 0, 0, 0.3);
}
.sb-box-art svg { width: 140px; height: 140px; filter: drop-shadow(2px 4px 4px rgba(14, 12, 10, 0.4)); }
.sb-box-rake {
  position: absolute;
  inset: 0;
  background: linear-gradient(115deg, transparent 35%, rgba(255, 240, 200, 0) 50%, transparent 65%);
  pointer-events: none;
  transition: background 600ms ease;
}
.sb-box.on .sb-box-rake,
.sb-box:hover .sb-box-rake,
.sb-box:focus-visible .sb-box-rake {
  background: linear-gradient(115deg, transparent 30%, rgba(255, 240, 200, 0.45) 50%, transparent 70%);
  animation: sb-rake-card 1.4s ease-in-out infinite;
}
@keyframes sb-rake-card {
  0%, 100% { transform: translateX(-30%); }
  50% { transform: translateX(30%); }
}
@media (prefers-reduced-motion: reduce) {
  .sb-box .sb-box-rake { transition: none; }
  .sb-box.on .sb-box-rake, .sb-box:hover .sb-box-rake, .sb-box:focus-visible .sb-box-rake { animation: none; }
}

.sb-box-brass {
  margin-top: 14px;
  background: linear-gradient(180deg, #B69753 0%, #8B6F36 100%);
  padding: 10px 14px 12px;
  border: 1px solid rgba(14, 12, 10, 0.6);
  box-shadow: inset 0 1px 0 rgba(255, 220, 150, 0.45);
}
.sb-box-series {
  display: block;
  font-family: 'EB Garamond', serif;
  font-size: 9px;
  letter-spacing: 0.32em;
  color: rgba(26, 22, 18, 0.85);
  margin-bottom: 4px;
}
.sb-box-title {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 17px;
  font-weight: 500;
  margin: 0 0 4px;
  color: #1A1612;
  line-height: 1.2;
}
.sb-box-plate {
  font-family: 'EB Garamond', serif;
  font-size: 9px;
  letter-spacing: 0.22em;
  color: rgba(26, 22, 18, 0.7);
  margin: 0;
  text-transform: uppercase;
}

.sb-box:hover, .sb-box:focus-visible {
  transform: translateY(-4px);
  box-shadow:
    inset 0 0 0 4px rgba(14, 12, 10, 0.7),
    inset 0 0 0 5px rgba(182, 151, 83, 0.6),
    0 18px 36px rgba(0, 0, 0, 0.55);
}
@media (prefers-reduced-motion: reduce) {
  .sb-box { transition: none; }
  .sb-box:hover, .sb-box:focus-visible { transform: none; }
}

.sb-brass-row {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}
.sb-brass-card {
  margin: 0;
  outline: none;
  transition: transform 280ms ease;
}
.sb-brass-engrave {
  background: linear-gradient(180deg, #C8A562 0%, #8B6F36 100%);
  padding: 22px 22px 24px;
  border: 1px solid rgba(14, 12, 10, 0.7);
  box-shadow: inset 0 1px 0 rgba(255, 220, 150, 0.55), 0 4px 8px rgba(0, 0, 0, 0.4);
  position: relative;
  text-align: center;
  margin-bottom: 14px;
}
.sb-brass-engrave::after {
  content: '';
  position: absolute;
  inset: 6px;
  border: 1px solid rgba(14, 12, 10, 0.45);
  pointer-events: none;
}
.sb-brass-eyebrow {
  font-family: 'EB Garamond', serif;
  font-size: 10px;
  letter-spacing: 0.32em;
  color: rgba(26, 22, 18, 0.8);
  margin: 0 0 8px;
}
.sb-brass-cut {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 22px;
  color: #1A1612;
  margin: 0 0 8px;
  line-height: 1.15;
  position: relative;
}
.sb-brass-foot {
  font-family: 'EB Garamond', serif;
  font-size: 9px;
  letter-spacing: 0.22em;
  color: rgba(26, 22, 18, 0.75);
  margin: 0;
  text-transform: uppercase;
}
.sb-brass-card figcaption {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 15px;
  line-height: 1.55;
  color: rgba(229, 221, 201, 0.78);
}
.sb-brass-card:hover, .sb-brass-card:focus-visible {
  transform: translateY(-3px);
}
.sb-brass-card:hover .sb-brass-engrave, .sb-brass-card:focus-visible .sb-brass-engrave {
  box-shadow: inset 0 1px 0 rgba(255, 240, 180, 0.7), 0 8px 16px rgba(0, 0, 0, 0.55);
}
@media (prefers-reduced-motion: reduce) {
  .sb-brass-card { transition: none; }
  .sb-brass-card:hover, .sb-brass-card:focus-visible { transform: none; }
}

.sb-joints { list-style: none; margin: 0; padding: 0; display: grid; gap: 0; }
.sb-joint {
  display: grid;
  grid-template-columns: 60px 1fr 1fr;
  gap: 18px;
  padding: 18px 0;
  border-bottom: 1px solid rgba(182, 151, 83, 0.25);
  font-family: 'Cormorant Garamond', serif;
  outline: none;
  transition: padding-left 240ms ease, color 240ms ease;
}
.sb-joint:last-child { border-bottom: 0; }
.sb-joint-num {
  font-style: italic;
  font-size: 22px;
  color: #B69753;
}
.sb-joint-name {
  font-style: italic;
  font-size: 26px;
  color: #E5DDC9;
}
.sb-joint-grade {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 16px;
  color: rgba(229, 221, 201, 0.65);
  align-self: center;
}
.sb-joint:hover, .sb-joint:focus-visible {
  padding-left: 14px;
  background: linear-gradient(90deg, rgba(182, 151, 83, 0.1) 0%, transparent 100%);
}
.sb-joint:hover .sb-joint-name, .sb-joint:focus-visible .sb-joint-name { color: #B69753; }
@media (prefers-reduced-motion: reduce) { .sb-joint { transition: none; } }

.sb-section-visit { padding: 64px 0 80px; }
.sb-visit-card {
  border: 1px solid rgba(182, 151, 83, 0.5);
  background: linear-gradient(180deg, rgba(42, 38, 34, 0.7) 0%, rgba(26, 22, 18, 0.9) 100%);
  padding: 56px 56px 64px;
  text-align: center;
  box-shadow: inset 0 0 0 5px rgba(14, 12, 10, 0.7), inset 0 0 0 6px rgba(182, 151, 83, 0.3);
}
.sb-visit-headline {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(36px, 5vw, 64px);
  margin: 0 0 18px;
  color: #E5DDC9;
}
.sb-visit-body {
  font-family: 'EB Garamond', serif;
  font-style: italic;
  font-size: 19px;
  line-height: 1.55;
  color: rgba(229, 221, 201, 0.8);
  max-width: 520px;
  margin: 0 auto 28px;
}
.sb-visit-card .sb-cta-row { justify-content: center; }

.sb-footer {
  border-top: 1px solid rgba(182, 151, 83, 0.4);
  padding-top: 18px;
  font-family: 'EB Garamond', serif;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(229, 221, 201, 0.6);
}
.sb-footer-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
}

@media (max-width: 880px) {
  .sb-hero { grid-template-columns: 1fr; gap: 36px; }
  .sb-section-head { grid-template-columns: 40px 1fr; }
  .sb-section-aside { grid-column: 1 / -1; }
  .sb-joint { grid-template-columns: 40px 1fr; }
  .sb-joint-grade { grid-column: 1 / -1; padding-left: 58px; }
  .sb-visit-card { padding: 36px 28px; }
}
`;
