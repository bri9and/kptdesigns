"use client";

/**
 * PulpitEngine — V26 Pulpit
 *
 * One sentence per fold. 200pt display Caslon. Hymnal-cream paper, a
 * single carmine rule beneath each phrase. Massive negative space.
 * Authority through restraint.
 */

import { useEffect, useRef, useState } from "react";

const FOLDS = [
  { line: "We answer the RFI.", footnote: "Within 24 hours. Always with a number. Always with a name." },
  { line: "We sign the change order.", footnote: "Before the framers leave the slab. The owner hears it from us first." },
  { line: "We close the punch list.", footnote: "On the day we promise. Photographs filed. Substantial completion logged." },
];

const PROJECTS = [
  {
    name: "Beacon Hill Townhouse Restoration",
    addr: "92 Mt. Vernon Street &middot; Boston, MA",
    span: "Aug 2024 &mdash; Mar 2026",
    sf: "4,820 SF",
    note: "Full envelope, mechanical, and finish. Historic commission approved.",
  },
  {
    name: "Cambridge Lab Building T.I.",
    addr: "320 Bent Street &middot; Cambridge, MA",
    span: "Jan 2025 &mdash; Nov 2025",
    sf: "12,400 SF",
    note: "Class B-2 lab fit-out. Clean-room class 10,000 in two suites.",
  },
];

export default function PulpitEngine() {
  const [activeFold, setActiveFold] = useState(0);
  const foldRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number(e.target.getAttribute("data-fold"));
          if (e.isIntersecting && e.intersectionRatio > 0.5) {
            setActiveFold(idx);
          }
        });
      },
      { threshold: [0.5, 0.75] }
    );
    foldRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <style>{css}</style>
      <div className="pp-shell">
        <div className="pp-paper" aria-hidden />

        {/* TOP MARQUE */}
        <header className="pp-top">
          <div className="pp-mark">
            <span className="pp-mark-rule" aria-hidden />
            <span className="pp-mark-name">Holloway &amp; Pratt</span>
            <span className="pp-mark-sub">general contractors &middot; est. 1962</span>
          </div>
          <nav className="pp-nav">
            <a href="#preface" className="pp-nav-link">Preface</a>
            <a href="#submittals" className="pp-nav-link">Submittals</a>
            <a href="#work" className="pp-nav-link">Recent work</a>
            <a href="#colophon" className="pp-nav-link">Colophon</a>
          </nav>
          <div className="pp-folio">
            <span>I.</span>
            <span>2026</span>
          </div>
        </header>

        {/* HERO */}
        <section className="pp-hero">
          <span className="pp-eyebrow">FOLIO I &middot; THE RULE OF THE HOUSE</span>
          <h1 className="pp-headline">
            <span className="pp-line">We hold</span>
            <span className="pp-line">the critical</span>
            <span className="pp-line pp-line-italic">path.</span>
            <span className="pp-rule" aria-hidden />
          </h1>
          <div className="pp-hero-foot">
            <p className="pp-hero-sub">
              General contracting for owners who&rsquo;d rather hear the change
              order before the framers leave the slab. We answer the RFI by
              dusk. We close the punch list on the day we promise.
            </p>
            <div className="pp-cta-row">
              <a href="#preface" className="pp-cta pp-cta-primary">Open a project</a>
              <a href="#submittals" className="pp-cta pp-cta-secondary">Read our submittals policy</a>
            </div>
          </div>
        </section>

        {/* FOLDS — One sentence per */}
        <div className="pp-folds">
          {FOLDS.map((f, i) => (
            <section
              key={f.line}
              ref={(el) => { foldRefs.current[i] = el; }}
              data-fold={i}
              className={`pp-fold${activeFold === i ? " pp-fold-active" : ""}`}
            >
              <div className="pp-fold-folio">
                <span>{romanize(i + 1)}</span>
                <span className="pp-fold-folio-rule" aria-hidden />
              </div>
              <h2 className="pp-fold-line">{f.line}</h2>
              <span className="pp-fold-rule" aria-hidden />
              <p className="pp-fold-footnote">{f.footnote}</p>
            </section>
          ))}
        </div>

        {/* THE LONG FOOTNOTE — submittals essay */}
        <section id="submittals" className="pp-essay">
          <div className="pp-essay-folio">
            <span>IV.</span>
            <span>The long footnote.</span>
          </div>
          <h3 className="pp-essay-head">On running the critical path.</h3>
          <span className="pp-essay-rule" aria-hidden />
          <div className="pp-essay-body">
            <p className="pp-drop">
              <span className="pp-drop-cap">A</span>n owner asked us, in 1987,
              what we did when a long-lead item slipped. We told him the
              truth. We told him on the day we found out. He hired us for
              twenty-two more buildings.
            </p>
            <p>
              Critical-path scheduling is not a Gantt chart. It is a posture.
              It is the posture of telling the owner before the framers leave
              the slab; of writing the change order in the trailer at 4:48 PM
              and walking it across to the AOR by close of business; of
              naming the long-lead item in the bid review, not the punch
              walk.
            </p>
            <p>
              We answer the RFI within twenty-four hours. We sign the change
              order before the trade leaves the site. We close the punch list
              on the day we promise. None of this is novel. All of it is rare.
            </p>
            <p className="pp-essay-attr">
              &mdash; J. Holloway, partner, in a 2018 letter to a client
            </p>
          </div>
        </section>

        {/* RECENT WORK */}
        <section id="work" className="pp-work">
          <div className="pp-work-head">
            <span className="pp-work-folio">V.</span>
            <h3 className="pp-work-title">Recent work.</h3>
            <span className="pp-work-rule" aria-hidden />
          </div>
          <div className="pp-work-grid">
            {PROJECTS.map((p, i) => (
              <article key={p.name} className="pp-project">
                <div className="pp-project-num">{romanize(i + 1)}.</div>
                <h4
                  className="pp-project-name"
                >
                  {p.name}
                </h4>
                <div
                  className="pp-project-addr"
                  dangerouslySetInnerHTML={{ __html: p.addr }}
                />
                <div className="pp-project-span">{p.span} &middot; {p.sf}</div>
                <p className="pp-project-note">{p.note}</p>
                <span className="pp-project-rule" aria-hidden />
              </article>
            ))}
          </div>
        </section>

        {/* PREFACE / OPEN A PROJECT */}
        <section id="preface" className="pp-preface">
          <div className="pp-preface-folio">
            <span>VI.</span>
            <span>The preface.</span>
          </div>
          <h3 className="pp-preface-head">
            Submit a project.
          </h3>
          <span className="pp-preface-rule" aria-hidden />
          <p className="pp-preface-body">
            We accept three new projects per quarter. Send the program, the
            address, the architect, and the target dry-in. We respond within
            five business days with a fit, a no, or a referral.
          </p>
          <div className="pp-preface-cta">
            <a href="mailto:office@holloway.example" className="pp-cta pp-cta-primary">
              office@holloway.example
            </a>
            <a href="tel:5551774422" className="pp-cta pp-cta-secondary">
              555 &middot; 177 &middot; 4422
            </a>
          </div>
        </section>

        {/* FOOTER */}
        <footer id="colophon" className="pp-footer">
          <div className="pp-colophon">
            <span className="pp-colophon-folio">VII.</span>
            <h4 className="pp-colophon-head">Colophon.</h4>
            <p className="pp-colophon-body">
              This folio set in Caslon Display at two hundred points and
              Caslon Pro Italic at sixteen, on hymnal-cream stock, pressed
              under a single carmine rule. AIA Member Firm. Massachusetts
              Construction Supervisor License #CSL-074110.
            </p>
            <div className="pp-colophon-row">
              <span>Holloway &amp; Pratt General Contractors</span>
              <span>1442 Mass. Ave. Suite 304</span>
              <span>Cambridge, Massachusetts 02138</span>
              <span>&copy; MMXXVI</span>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}

function romanize(n: number): string {
  const map: [number, string][] = [
    [10, "X"], [9, "IX"], [5, "V"], [4, "IV"], [1, "I"],
  ];
  let out = "";
  let v = n;
  for (const [num, sym] of map) {
    while (v >= num) {
      out += sym;
      v -= num;
    }
  }
  return out;
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500;1,600&family=DM+Serif+Display:ital@0;1&family=Inter:wght@400;500;600&display=swap');

.pp-shell {
  position: relative;
  min-height: 100vh;
  background: #F6F0E4;
  color: #08080A;
  font-family: 'Cormorant Garamond', 'Times New Roman', serif;
  padding: 32px 32px 64px;
  overflow-x: hidden;
}

.pp-paper {
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(circle at 18% 22%, rgba(8, 8, 10, 0.025) 0px, transparent 320px),
    radial-gradient(circle at 78% 76%, rgba(182, 34, 39, 0.025) 0px, transparent 280px),
    repeating-linear-gradient(94deg, rgba(8, 8, 10, 0.012) 0px, rgba(8, 8, 10, 0.012) 1px, transparent 1px, transparent 5px);
  pointer-events: none;
  z-index: 0;
}

.pp-top {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  padding: 8px 0 24px;
  border-bottom: 0.5px solid #08080A;
  margin-bottom: 96px;
  font-family: 'Inter', sans-serif;
}

.pp-mark {
  display: flex;
  flex-direction: column;
  gap: 2px;
  align-items: flex-start;
}
.pp-mark-rule {
  width: 32px;
  height: 1.5px;
  background: #B62227;
  margin-bottom: 6px;
}
.pp-mark-name {
  font-family: 'Cormorant Garamond', serif;
  font-weight: 600;
  font-size: 24px;
  letter-spacing: 0.01em;
  color: #08080A;
  line-height: 1;
}
.pp-mark-sub {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  letter-spacing: 0.32em;
  color: #4A4A4A;
  text-transform: uppercase;
  margin-top: 4px;
}

.pp-nav {
  display: flex;
  gap: 32px;
  justify-content: center;
}
.pp-nav-link {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 17px;
  color: #08080A;
  text-decoration: none;
  position: relative;
  padding: 4px 0;
  transition: color 220ms ease;
}
.pp-nav-link::after {
  content: '';
  position: absolute;
  left: 0; bottom: 0;
  width: 100%; height: 1.5px;
  background: #B62227;
  transform: scaleX(0);
  transform-origin: left center;
  transition: transform 360ms cubic-bezier(0.7, 0, 0.3, 1);
}
.pp-nav-link:hover, .pp-nav-link:focus-visible {
  color: #B62227;
  outline: none;
}
.pp-nav-link:hover::after, .pp-nav-link:focus-visible::after { transform: scaleX(1); }
@media (prefers-reduced-motion: reduce) {
  .pp-nav-link::after { transition: none; }
}

.pp-folio {
  font-family: 'Cormorant Garamond', serif;
  font-size: 14px;
  letter-spacing: 0.16em;
  color: #4A4A4A;
  text-align: right;
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.pp-hero {
  position: relative;
  z-index: 2;
  min-height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 64px 12px 96px;
}
.pp-eyebrow {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  letter-spacing: 0.36em;
  color: #4A4A4A;
  margin-bottom: 32px;
  text-transform: uppercase;
}

.pp-headline {
  font-family: 'DM Serif Display', 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(80px, 14vw, 220px);
  line-height: 0.92;
  letter-spacing: -0.02em;
  color: #08080A;
  margin: 0 0 56px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}
.pp-line { display: block; }
.pp-line-italic { font-style: italic; color: #08080A; }

.pp-rule {
  display: block;
  width: clamp(80px, 12vw, 180px);
  height: 5px;
  background: #B62227;
  margin: 36px auto 0;
  transform: scaleX(0.05);
  transform-origin: center;
  animation: pp-rule-draw 1400ms cubic-bezier(0.4, 0, 0.2, 1) 400ms forwards;
}
@keyframes pp-rule-draw {
  to { transform: scaleX(1); }
}
@media (prefers-reduced-motion: reduce) {
  .pp-rule { animation: none; transform: scaleX(1); }
}

.pp-hero-foot {
  max-width: 600px;
  margin-top: 24px;
}
.pp-hero-sub {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 22px;
  line-height: 1.5;
  color: #1A1A1C;
  margin: 0 0 36px;
  text-align: center;
}

.pp-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  justify-content: center;
}
.pp-cta {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: 13px;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  padding: 14px 28px;
  text-decoration: none;
  border: 1px solid #08080A;
  display: inline-block;
  transition: all 240ms cubic-bezier(0.4, 0, 0.2, 1);
}
.pp-cta-primary {
  background: #08080A;
  color: #F6F0E4;
}
.pp-cta-primary:hover, .pp-cta-primary:focus-visible {
  outline: none;
  background: #B62227;
  border-color: #B62227;
  color: #F6F0E4;
}
.pp-cta-secondary {
  background: transparent;
  color: #08080A;
}
.pp-cta-secondary:hover, .pp-cta-secondary:focus-visible {
  outline: none;
  background: #08080A;
  color: #F6F0E4;
}
@media (prefers-reduced-motion: reduce) {
  .pp-cta { transition: none; }
}

.pp-folds {
  position: relative;
  z-index: 2;
  display: flex;
  flex-direction: column;
}

.pp-fold {
  scroll-snap-align: start;
  min-height: 90vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 80px 24px;
  border-top: 0.5px solid rgba(8, 8, 10, 0.16);
  position: relative;
}

.pp-fold-folio {
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 16px;
  color: #B62227;
  margin-bottom: 36px;
  letter-spacing: 0.18em;
}
.pp-fold-folio-rule {
  display: inline-block;
  width: 64px;
  height: 1px;
  background: #B62227;
}

.pp-fold-line {
  font-family: 'DM Serif Display', 'Cormorant Garamond', serif;
  font-weight: 400;
  font-size: clamp(64px, 11vw, 160px);
  line-height: 0.96;
  letter-spacing: -0.018em;
  color: #08080A;
  margin: 0 0 28px;
  max-width: 1200px;
  position: relative;
  cursor: default;
  transition: opacity 800ms cubic-bezier(0.4, 0, 0.2, 1);
  opacity: 0.18;
}
.pp-fold-active .pp-fold-line { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .pp-fold-line { opacity: 1; transition: none; }
}

.pp-fold-rule {
  display: block;
  width: 0;
  height: 4px;
  background: #B62227;
  margin: 0 auto 28px;
  transition: width 700ms cubic-bezier(0.4, 0, 0.2, 1) 200ms;
}
.pp-fold-active .pp-fold-rule { width: clamp(80px, 14vw, 200px); }
.pp-fold-line:hover ~ .pp-fold-rule {
  width: clamp(140px, 20vw, 280px) !important;
  background: #B62227;
}
@media (prefers-reduced-motion: reduce) {
  .pp-fold-rule { transition: none; }
  .pp-fold-active .pp-fold-rule { width: clamp(80px, 14vw, 200px); }
}

.pp-fold-footnote {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 18px;
  line-height: 1.5;
  color: #4A4A4A;
  max-width: 540px;
  margin: 0;
  opacity: 0;
  transition: opacity 800ms cubic-bezier(0.4, 0, 0.2, 1) 400ms;
}
.pp-fold-active .pp-fold-footnote { opacity: 1; }
@media (prefers-reduced-motion: reduce) {
  .pp-fold-footnote { opacity: 1; transition: none; }
}

.pp-essay {
  position: relative;
  z-index: 2;
  max-width: 720px;
  margin: 96px auto;
  padding: 0 24px;
}
.pp-essay-folio {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 14px;
  color: #B62227;
  letter-spacing: 0.18em;
  margin-bottom: 24px;
  display: flex;
  gap: 14px;
}
.pp-essay-head {
  font-family: 'DM Serif Display', serif;
  font-weight: 400;
  font-style: italic;
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1;
  letter-spacing: -0.01em;
  margin: 0 0 28px;
  color: #08080A;
}
.pp-essay-rule {
  display: block;
  width: 80px;
  height: 3px;
  background: #B62227;
  margin-bottom: 36px;
}
.pp-essay-body {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 19px;
  line-height: 1.65;
  text-align: justify;
  color: #1A1A1C;
}
.pp-essay-body p { margin: 0 0 18px; text-indent: 1.6em; }
.pp-essay-body p:first-child { text-indent: 0; }
.pp-drop-cap {
  font-family: 'DM Serif Display', serif;
  font-style: normal;
  font-size: 64px;
  line-height: 0.86;
  float: left;
  padding: 4px 8px 0 0;
  color: #B62227;
}
.pp-essay-attr {
  font-style: italic;
  font-size: 15px;
  text-indent: 0;
  text-align: right;
  margin-top: 14px;
  color: #4A4A4A;
  font-family: 'Cormorant Garamond', serif;
}

.pp-work {
  position: relative;
  z-index: 2;
  max-width: 1080px;
  margin: 96px auto;
  padding: 0 24px;
}
.pp-work-head {
  display: grid;
  grid-template-columns: auto auto 1fr;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 56px;
}
.pp-work-folio {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 16px;
  color: #B62227;
  letter-spacing: 0.18em;
}
.pp-work-title {
  font-family: 'DM Serif Display', serif;
  font-weight: 400;
  font-style: italic;
  font-size: clamp(36px, 5vw, 56px);
  margin: 0;
  color: #08080A;
  line-height: 1;
}
.pp-work-rule {
  height: 1px;
  background: rgba(8, 8, 10, 0.4);
  align-self: center;
}

.pp-work-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
}
.pp-project { position: relative; }
.pp-project-num {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  color: #B62227;
  font-size: 16px;
  letter-spacing: 0.16em;
  margin-bottom: 12px;
}
.pp-project-name {
  font-family: 'DM Serif Display', serif;
  font-weight: 400;
  font-size: 28px;
  line-height: 1.1;
  margin: 0 0 10px;
  color: #08080A;
}
.pp-project-addr {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 16px;
  color: #4A4A4A;
  margin-bottom: 6px;
}
.pp-project-span {
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: #1A1A1C;
  text-transform: uppercase;
  margin-bottom: 14px;
}
.pp-project-note {
  font-family: 'Cormorant Garamond', serif;
  font-size: 17px;
  line-height: 1.55;
  color: #1A1A1C;
  margin: 0 0 16px;
}
.pp-project-rule {
  display: block;
  height: 1px;
  background: rgba(8, 8, 10, 0.2);
  width: 100%;
  transform: scaleX(0.4);
  transform-origin: left;
  transition: transform 600ms cubic-bezier(0.4, 0, 0.2, 1);
}
.pp-project:hover .pp-project-rule { transform: scaleX(1); background: #B62227; }
.pp-project:focus-within .pp-project-rule { transform: scaleX(1); background: #B62227; }
@media (prefers-reduced-motion: reduce) {
  .pp-project-rule { transition: none; transform: scaleX(1); }
}

.pp-preface {
  position: relative;
  z-index: 2;
  max-width: 720px;
  margin: 96px auto;
  text-align: center;
  padding: 0 24px;
}
.pp-preface-folio {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  color: #B62227;
  font-size: 14px;
  letter-spacing: 0.18em;
  margin-bottom: 18px;
}
.pp-preface-head {
  font-family: 'DM Serif Display', serif;
  font-weight: 400;
  font-style: italic;
  font-size: clamp(40px, 6vw, 80px);
  line-height: 1;
  margin: 0 0 24px;
  color: #08080A;
}
.pp-preface-rule {
  display: block;
  width: 100px;
  height: 4px;
  background: #B62227;
  margin: 0 auto 32px;
}
.pp-preface-body {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 19px;
  line-height: 1.6;
  color: #1A1A1C;
  margin: 0 auto 32px;
  max-width: 540px;
}
.pp-preface-cta {
  display: flex;
  justify-content: center;
  gap: 16px;
  flex-wrap: wrap;
}

.pp-footer {
  position: relative;
  z-index: 2;
  border-top: 0.5px solid #08080A;
  padding: 64px 24px 16px;
  margin-top: 96px;
}
.pp-colophon {
  max-width: 720px;
  margin: 0 auto;
  text-align: center;
}
.pp-colophon-folio {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  color: #B62227;
  font-size: 14px;
  letter-spacing: 0.18em;
  margin-bottom: 12px;
  display: block;
}
.pp-colophon-head {
  font-family: 'DM Serif Display', serif;
  font-weight: 400;
  font-style: italic;
  font-size: 28px;
  margin: 0 0 18px;
  color: #08080A;
}
.pp-colophon-body {
  font-family: 'Cormorant Garamond', serif;
  font-style: italic;
  font-size: 16px;
  line-height: 1.55;
  color: #4A4A4A;
  margin: 0 auto 32px;
  max-width: 480px;
}
.pp-colophon-row {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 18px;
  font-family: 'Inter', sans-serif;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: #1A1A1C;
  text-transform: uppercase;
}

@media (max-width: 880px) {
  .pp-top { grid-template-columns: 1fr; gap: 12px; text-align: left; }
  .pp-nav { justify-content: flex-start; }
  .pp-folio { text-align: left; }
  .pp-work-grid { grid-template-columns: 1fr; gap: 32px; }
}
`;
