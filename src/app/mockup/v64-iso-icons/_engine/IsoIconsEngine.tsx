"use client";

/**
 * IsoIconsEngine — V64 ISO Icons
 *
 * Z535-yellow ground. ISO-7010 grammar throughout: blue mandatory circles,
 * yellow warning triangles, red prohibition slashes. Industrial / commercial
 * electric showcase. Hover swaps a pictogram between mandatory / warning /
 * prohibition variants.
 */

import { useState } from "react";

type Variant = "mandatory" | "warning" | "prohibition";

const NAV = [
  { id: "mandatory", label: "Mandatory", code: "M002" },
  { id: "warning", label: "Warning", code: "W012" },
  { id: "prohibited", label: "Prohibited", code: "P003" },
  { id: "procedures", label: "Procedures", code: "PR-70E" },
];

const MANDATORY = [
  { code: "M001", title: "PPE up", body: "Class 2 minimum on every energized task. Face-shield rated for the calculated incident energy. Cuffs out, sleeves down, no jewelry." },
  { code: "M002", title: "LOTO", body: "Lockout / tagout the disconnect, padlock with the tech&rsquo;s number. Verify dead with a meter we just verified live." },
  { code: "M003", title: "Verify dead", body: "Three-point check: live source, target conductor, live source again. Documented before the cover comes off." },
  { code: "M004", title: "Bond &amp; ground", body: "Redundant grounds at the gear, bonding jumpers across removable panels. Resistance tested under 1Ω." },
  { code: "M005", title: "Re-energize", body: "Energize when we say so. Two-person concurrence. AFCI / GFCI checked at the device, not the panel." },
  { code: "M006", title: "Permit close", body: "Hot-work permit signed off; arc-flash label updated if the calculation changed." },
];

const WARNINGS = [
  { code: "W012", title: "Knob-and-tube", body: "Pre-1950 wiring under blown-in. Splices in the cavity, no junction box. Plan the rewire before the panel swap." },
  { code: "W026", title: "Undersized neutrals", body: "Shared neutrals on a multi-wire branch carry harmonics; 14 AWG on a 20A circuit fails inspection and us." },
  { code: "W001", title: "Aluminum branch", body: "Bare aluminum to copper at devices. Rated lugs only. Anti-oxide on every termination, torque to spec." },
  { code: "W007", title: "Buried splices", body: "Behind drywall, no box. We open the wall, not the breaker. Eight in the last 90 days." },
];

const PROHIBITED = [
  { code: "P003", title: "No bootleg ground", body: "Tying neutral to ground at a receptacle to fool a tester. Dangerous. Failed inspection. Done." },
  { code: "P012", title: "No backstab on commercial", body: "Side-screw terminations on every commercial outlet. The backstab is for the home center." },
  { code: "P024", title: "No NM in conduit", body: "Romex is for stud bays, not raceway. THHN/THWN-2 in pipe; we keep both on the truck." },
  { code: "P031", title: "No working hot to save time", body: "If the gear can&rsquo;t LOTO, it gets shut down at the source. Schedule slips. Nobody dies." },
];

const PROCEDURES = [
  { step: "1", title: "Walk", body: "Assess the gear, label the disconnects, photograph the as-found." },
  { step: "2", title: "Calc", body: "Run NFPA 70E incident-energy calc. Update the arc-flash label." },
  { step: "3", title: "Permit", body: "Hot-work permit, JHA, two-person concurrence." },
  { step: "4", title: "Execute", body: "PPE, LOTO, verify dead, work the scope." },
  { step: "5", title: "Restore", body: "Re-energize per procedure. Update the directory in tight all-caps." },
];

function Pictogram({ variant }: { variant: Variant }) {
  return (
    <svg className={`iso-picto iso-picto-${variant}`} viewBox="0 0 100 100" aria-hidden>
      {variant === "mandatory" && (
        <>
          <circle cx="50" cy="50" r="44" fill="#005EB8" />
          <path d="M30 50 L50 30 L70 50 L60 50 L60 72 L40 72 L40 50 Z" fill="#FFFFFF" />
        </>
      )}
      {variant === "warning" && (
        <>
          <path d="M50 6 L96 90 L4 90 Z" fill="#FFC72C" stroke="#0E0E0E" strokeWidth="6" strokeLinejoin="round" />
          <rect x="46" y="38" width="8" height="28" fill="#0E0E0E" />
          <rect x="46" y="72" width="8" height="8" fill="#0E0E0E" />
        </>
      )}
      {variant === "prohibition" && (
        <>
          <circle cx="50" cy="50" r="40" fill="none" stroke="#D52B1E" strokeWidth="10" />
          <line x1="22" y1="22" x2="78" y2="78" stroke="#D52B1E" strokeWidth="10" strokeLinecap="round" />
          <rect x="32" y="44" width="36" height="12" fill="#0E0E0E" opacity="0.15" />
        </>
      )}
    </svg>
  );
}

const VARIANTS: Variant[] = ["mandatory", "warning", "prohibition"];

export default function IsoIconsEngine() {
  const [activeNav, setActiveNav] = useState("mandatory");
  const [heroVariant, setHeroVariant] = useState<Variant>("mandatory");

  return (
    <>
      <style>{css}</style>
      <div className="iso-shell">
        <div className="iso-stripes" aria-hidden />

        {/* TOP BAR */}
        <header className="iso-top">
          <div className="iso-mark">
            <Pictogram variant="mandatory" />
            <div>
              <span className="iso-mark-name">KPT &middot; INDUSTRIAL ELECTRIC</span>
              <span className="iso-mark-sub">QUALIFIED PERSON ON DUTY · NFPA 70E COMPLIANT</span>
            </div>
          </div>
          <nav className="iso-nav">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`iso-nav-link${activeNav === n.id ? " on" : ""}`}
                onMouseEnter={() => setActiveNav(n.id)}
                onFocus={() => setActiveNav(n.id)}
              >
                <span className="iso-nav-code">{n.code}</span>
                <span>{n.label}</span>
              </a>
            ))}
          </nav>
        </header>

        {/* HERO */}
        <section className="iso-hero">
          <div className="iso-hero-grid">
            <button
              className="iso-hero-picto"
              onMouseEnter={() => setHeroVariant(VARIANTS[(VARIANTS.indexOf(heroVariant) + 1) % VARIANTS.length])}
              onFocus={() => setHeroVariant(VARIANTS[(VARIANTS.indexOf(heroVariant) + 1) % VARIANTS.length])}
              onClick={() => setHeroVariant(VARIANTS[(VARIANTS.indexOf(heroVariant) + 1) % VARIANTS.length])}
              aria-label={`Pictogram: ${heroVariant}. Hover to cycle variants.`}
            >
              <Pictogram variant={heroVariant} />
              <span className="iso-hero-picto-label">
                {heroVariant === "mandatory" && "M002 — QUALIFIED PERSON ON DUTY"}
                {heroVariant === "warning" && "W012 — ENERGIZED WORK IN PROGRESS"}
                {heroVariant === "prohibition" && "P003 — NO UNAUTHORIZED ENTRY"}
              </span>
            </button>
            <div className="iso-hero-text">
              <span className="iso-tag">REF Z535 · ISO 7010</span>
              <h1 className="iso-headline">
                Qualified persons only.
                <br />
                Locked-out. Tagged-out.
                <br />
                <span className="iso-headline-em">Energized when we say so.</span>
              </h1>
              <p className="iso-sub">
                Industrial and commercial electric — arc-flash labeling, NFPA 70E
                procedures, ampacity verified before energization. We don&rsquo;t
                pull a cover on gear we haven&rsquo;t calculated.
              </p>
              <div className="iso-cta-row">
                <a className="iso-cta iso-cta-primary" href="#mandatory">Schedule a walk</a>
                <a className="iso-cta iso-cta-secondary" href="#procedures">Read the procedures</a>
              </div>
            </div>
          </div>
        </section>

        {/* MANDATORY */}
        <section id="mandatory" className="iso-section iso-section-mandatory">
          <div className="iso-section-head">
            <Pictogram variant="mandatory" />
            <div>
              <span className="iso-section-code">SECTION M · MANDATORY</span>
              <h2 className="iso-section-title">What we always do.</h2>
            </div>
          </div>
          <div className="iso-grid">
            {MANDATORY.map((m) => (
              <article key={m.code} className="iso-card iso-card-mandatory" tabIndex={0}>
                <Pictogram variant="mandatory" />
                <span className="iso-card-code">{m.code}</span>
                <h3>{m.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: m.body }} />
              </article>
            ))}
          </div>
        </section>

        {/* WARNING */}
        <section id="warning" className="iso-section iso-section-warning">
          <div className="iso-section-head">
            <Pictogram variant="warning" />
            <div>
              <span className="iso-section-code">SECTION W · WARNING</span>
              <h2 className="iso-section-title">What older buildings hide.</h2>
            </div>
          </div>
          <div className="iso-grid">
            {WARNINGS.map((w) => (
              <article key={w.code} className="iso-card iso-card-warning" tabIndex={0}>
                <Pictogram variant="warning" />
                <span className="iso-card-code">{w.code}</span>
                <h3>{w.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: w.body }} />
              </article>
            ))}
          </div>
        </section>

        {/* PROHIBITED */}
        <section id="prohibited" className="iso-section iso-section-prohibition">
          <div className="iso-section-head">
            <Pictogram variant="prohibition" />
            <div>
              <span className="iso-section-code">SECTION P · PROHIBITED</span>
              <h2 className="iso-section-title">What we will not do.</h2>
            </div>
          </div>
          <div className="iso-grid">
            {PROHIBITED.map((p) => (
              <article key={p.code} className="iso-card iso-card-prohibition" tabIndex={0}>
                <Pictogram variant="prohibition" />
                <span className="iso-card-code">{p.code}</span>
                <h3>{p.title}</h3>
                <p dangerouslySetInnerHTML={{ __html: p.body }} />
              </article>
            ))}
          </div>
        </section>

        {/* PROCEDURES */}
        <section id="procedures" className="iso-section iso-section-procedures">
          <div className="iso-section-head">
            <Pictogram variant="mandatory" />
            <div>
              <span className="iso-section-code">PR · NFPA 70E PROCEDURE</span>
              <h2 className="iso-section-title">Five steps before the cover comes off.</h2>
            </div>
          </div>
          <ol className="iso-steps">
            {PROCEDURES.map((p) => (
              <li key={p.step} className="iso-step" tabIndex={0}>
                <span className="iso-step-num">{p.step}</span>
                <div>
                  <h3>{p.title}</h3>
                  <p>{p.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>

        {/* FOOTER */}
        <footer className="iso-footer">
          <div className="iso-footer-row">
            <span className="iso-footer-stamp">Z535 · ANSI · NFPA 70E</span>
            <span>MASTER ELECTRICIAN LICENSE NO. ME-04812</span>
            <span>04 / 26 / 26 · KPT INDUSTRIAL ELECTRIC</span>
          </div>
          <p className="iso-footer-note">
            All gear posted with arc-flash labels in the calculated incident-energy
            range. Directory printed in tight all-caps draftsman&rsquo;s hand.
          </p>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@500;600;800&family=IBM+Plex+Sans:wght@400;500;700&family=IBM+Plex+Mono:wght@500&display=swap');

.iso-shell {
  min-height: 100vh;
  background: #FFC72C;
  color: #0E0E0E;
  font-family: 'IBM Plex Sans', system-ui, sans-serif;
  position: relative;
  padding: 24px 24px 64px;
  overflow-x: hidden;
}
.iso-stripes {
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 0;
  background-image: repeating-linear-gradient(
    -45deg,
    transparent 0px,
    transparent 20px,
    rgba(14, 14, 14, 0.05) 20px,
    rgba(14, 14, 14, 0.05) 40px
  );
}
.iso-shell > * { position: relative; z-index: 1; }

.iso-picto { width: 60px; height: 60px; flex-shrink: 0; transition: transform 220ms cubic-bezier(0.4, 0, 0.2, 1); }
@media (prefers-reduced-motion: reduce) { .iso-picto { transition: none; } }

.iso-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  border: 4px solid #0E0E0E;
  padding: 14px 18px;
  background: #FFC72C;
  margin-bottom: 32px;
}
.iso-mark { display: flex; align-items: center; gap: 14px; }
.iso-mark .iso-picto { width: 48px; height: 48px; }
.iso-mark-name {
  display: block;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 20px;
  letter-spacing: 0.04em;
  color: #0E0E0E;
}
.iso-mark-sub {
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  color: #0E0E0E;
}

.iso-nav { display: flex; gap: 4px; flex-wrap: wrap; }
.iso-nav-link {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  text-decoration: none;
  color: #0E0E0E;
  border: 2px solid #0E0E0E;
  padding: 8px 14px;
  background: #FFC72C;
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 600;
  letter-spacing: 0.05em;
  transition: background 180ms ease, color 180ms ease, transform 180ms ease;
}
.iso-nav-code {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.18em;
  color: #005EB8;
  margin-bottom: 1px;
}
.iso-nav-link:hover, .iso-nav-link:focus-visible, .iso-nav-link.on {
  outline: none;
  background: #0E0E0E;
  color: #FFC72C;
  transform: translate(-1px, -1px);
}
.iso-nav-link:hover .iso-nav-code, .iso-nav-link:focus-visible .iso-nav-code, .iso-nav-link.on .iso-nav-code {
  color: #FFC72C;
}
@media (prefers-reduced-motion: reduce) { .iso-nav-link { transition: none; } }

.iso-hero {
  border: 6px solid #0E0E0E;
  background: #0E0E0E;
  color: #FFC72C;
  padding: 48px;
  margin-bottom: 32px;
}
.iso-hero-grid {
  display: grid;
  grid-template-columns: 280px 1fr;
  gap: 48px;
  align-items: center;
}
.iso-hero-picto {
  background: transparent;
  border: 0;
  padding: 0;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 14px;
  outline: none;
}
.iso-hero-picto .iso-picto {
  width: 240px;
  height: 240px;
  filter: drop-shadow(6px 6px 0 #FFC72C);
}
.iso-hero-picto:hover .iso-picto, .iso-hero-picto:focus-visible .iso-picto {
  transform: scale(1.04) rotate(-2deg);
}
.iso-hero-picto-label {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: #FFC72C;
  text-align: center;
  border: 1px solid #FFC72C;
  padding: 4px 8px;
}

.iso-tag {
  display: inline-block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  border: 1.5px solid #FFC72C;
  padding: 5px 10px;
  margin-bottom: 18px;
  color: #FFC72C;
}

.iso-headline {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: clamp(40px, 6vw, 88px);
  line-height: 0.96;
  margin: 0 0 22px;
  text-transform: uppercase;
  letter-spacing: -0.005em;
}
.iso-headline-em {
  background: #FFC72C;
  color: #0E0E0E;
  padding: 0 8px;
  display: inline-block;
}
.iso-sub {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 18px;
  line-height: 1.55;
  color: #FFC72C;
  max-width: 560px;
  margin: 0 0 28px;
}

.iso-cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
.iso-cta {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  letter-spacing: 0.1em;
  font-size: 14px;
  padding: 14px 22px;
  text-decoration: none;
  border: 2px solid #FFC72C;
  transition: transform 180ms ease, background 180ms ease, color 180ms ease;
}
.iso-cta-primary { background: #FFC72C; color: #0E0E0E; }
.iso-cta-primary:hover, .iso-cta-primary:focus-visible {
  outline: none;
  background: #005EB8;
  color: #FFC72C;
  border-color: #005EB8;
  transform: translate(-1px, -1px);
}
.iso-cta-secondary { background: transparent; color: #FFC72C; }
.iso-cta-secondary:hover, .iso-cta-secondary:focus-visible {
  outline: none;
  background: #FFC72C;
  color: #0E0E0E;
  transform: translate(-1px, -1px);
}
@media (prefers-reduced-motion: reduce) { .iso-cta { transition: none; } }

.iso-section { padding: 36px 0 28px; }
.iso-section-head {
  display: flex;
  align-items: center;
  gap: 18px;
  margin-bottom: 28px;
  border-bottom: 4px solid #0E0E0E;
  padding-bottom: 14px;
}
.iso-section-head .iso-picto { width: 56px; height: 56px; }
.iso-section-code {
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  color: #0E0E0E;
}
.iso-section-title {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: clamp(28px, 4vw, 48px);
  margin: 2px 0 0;
  line-height: 1;
}

.iso-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 14px;
}
.iso-card {
  background: #FFFFFF;
  border: 3px solid #0E0E0E;
  padding: 22px 22px 26px;
  position: relative;
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
  outline: none;
}
.iso-card .iso-picto { width: 48px; height: 48px; margin-bottom: 12px; }
.iso-card-code {
  display: inline-block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.2em;
  background: #0E0E0E;
  color: #FFC72C;
  padding: 3px 8px;
  margin-bottom: 10px;
}
.iso-card h3 {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 22px;
  margin: 0 0 8px;
  letter-spacing: 0.02em;
}
.iso-card p {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 14px;
  line-height: 1.5;
  margin: 0;
  color: #2C2C2A;
}
.iso-card:hover, .iso-card:focus-visible {
  transform: translate(-2px, -3px);
  box-shadow: 6px 8px 0 #0E0E0E;
}
.iso-card-mandatory:hover, .iso-card-mandatory:focus-visible { border-color: #005EB8; }
.iso-card-mandatory:hover .iso-picto, .iso-card-mandatory:focus-visible .iso-picto { transform: rotate(-6deg); }
.iso-card-warning:hover, .iso-card-warning:focus-visible {
  border-color: #FFC72C;
  background: #FFC72C;
}
.iso-card-warning:hover .iso-picto, .iso-card-warning:focus-visible .iso-picto { transform: scale(1.1); }
.iso-card-prohibition:hover, .iso-card-prohibition:focus-visible { border-color: #D52B1E; }
.iso-card-prohibition:hover .iso-picto, .iso-card-prohibition:focus-visible .iso-picto { transform: rotate(6deg); }
@media (prefers-reduced-motion: reduce) {
  .iso-card { transition: none; }
  .iso-card:hover, .iso-card:focus-visible { transform: none; }
  .iso-card .iso-picto { transition: none; }
}

.iso-section-procedures { background: #0E0E0E; color: #FFC72C; padding: 32px 32px 36px; border: 4px solid #0E0E0E; }
.iso-section-procedures .iso-section-head { border-color: #FFC72C; color: #FFC72C; }
.iso-section-procedures .iso-section-code { color: #FFC72C; }
.iso-section-procedures .iso-section-title { color: #FFC72C; }

.iso-steps {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  gap: 12px;
}
.iso-step {
  display: grid;
  grid-template-columns: 70px 1fr;
  gap: 18px;
  align-items: center;
  border: 2px solid #FFC72C;
  padding: 16px 20px;
  outline: none;
  transition: background 220ms ease, transform 220ms ease;
}
.iso-step-num {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  font-size: 56px;
  color: #FFC72C;
  line-height: 1;
}
.iso-step h3 {
  font-family: 'Barlow Condensed', sans-serif;
  font-weight: 800;
  text-transform: uppercase;
  font-size: 22px;
  letter-spacing: 0.04em;
  margin: 0 0 4px;
  color: #FFC72C;
}
.iso-step p {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 15px;
  line-height: 1.5;
  margin: 0;
  color: #FFC72C;
  opacity: 0.86;
}
.iso-step:hover, .iso-step:focus-visible {
  background: #FFC72C;
  transform: translateX(6px);
}
.iso-step:hover .iso-step-num, .iso-step:hover h3, .iso-step:hover p,
.iso-step:focus-visible .iso-step-num, .iso-step:focus-visible h3, .iso-step:focus-visible p {
  color: #0E0E0E;
  opacity: 1;
}
@media (prefers-reduced-motion: reduce) { .iso-step { transition: none; } .iso-step:hover, .iso-step:focus-visible { transform: none; } }

.iso-footer {
  border-top: 4px solid #0E0E0E;
  padding-top: 18px;
  margin-top: 32px;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.16em;
  color: #0E0E0E;
}
.iso-footer-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 10px;
}
.iso-footer-stamp {
  border: 2px solid #0E0E0E;
  padding: 4px 8px;
  background: #0E0E0E;
  color: #FFC72C;
}
.iso-footer-note {
  font-family: 'IBM Plex Sans', sans-serif;
  font-size: 13px;
  letter-spacing: 0;
  color: #0E0E0E;
  margin: 0;
}

@media (max-width: 800px) {
  .iso-hero { padding: 28px; }
  .iso-hero-grid { grid-template-columns: 1fr; gap: 28px; }
  .iso-hero-picto .iso-picto { width: 180px; height: 180px; }
  .iso-section-procedures { padding: 24px; }
}
`;
