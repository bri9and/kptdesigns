"use client";

/**
 * PermitBoardEngine — V32 Permit Board
 *
 * Coroplast jobsite sign zip-tied to a steel rail. Project name in 200pt
 * Roboto Condensed Black; GC name medium beneath; sub-trades stenciled small
 * along the lower band. One edge sun-faded cyan. The hero IS the sign.
 */

import { useState } from "react";

const PROJECTS = [
  {
    no: "14-237",
    name: "MILL ST. — RETAIL FIT-OUT",
    addr: "188 Mill St, Cambridge MA",
    dryIn: "DRY-IN BY OCT 30",
    punch: "PUNCHLIST 11/14",
    status: "ACTIVE",
    permit: "BLDG-2026-04-188",
  },
  {
    no: "14-241",
    name: "BEACON — TWO-FAMILY ADDITION",
    addr: "44 Beacon St, Brookline MA",
    dryIn: "DRY-IN BY DEC 18",
    punch: "PUNCHLIST 02/06",
    status: "ROUGH-IN",
    permit: "BLDG-2026-08-044",
  },
  {
    no: "14-244",
    name: "WASHINGTON — TENANT IMPROVEMENT",
    addr: "1108 Washington St, Boston MA",
    dryIn: "WEATHER-TIGHT 09/22",
    punch: "PUNCHLIST 10/30",
    status: "FRAMING",
    permit: "BLDG-2026-09-110",
  },
];

const SUBS = [
  { trade: "ELECTRICAL", name: "Coppola & Sons", lic: "EL-A12871", est: "1971" },
  { trade: "PLUMBING", name: "Lyons Plumbing & Heating", lic: "ML-014823", est: "1988" },
  { trade: "HVAC", name: "Northstar Mechanical", lic: "HV-09921", est: "2002" },
  { trade: "MASONRY", name: "Reilly Stone", lic: "—", est: "1953" },
  { trade: "ROOFING", name: "Dorchester Roofing", lic: "RC-44781", est: "1996" },
  { trade: "CONCRETE", name: "Foundation Pros", lic: "—", est: "2008" },
  { trade: "DRYWALL", name: "Dale Drywall", lic: "—", est: "1999" },
  { trade: "INSULATION", name: "Tight House Co.", lic: "—", est: "2014" },
  { trade: "FLOORING", name: "Mass. Hardwood", lic: "—", est: "1982" },
  { trade: "PAINT", name: "First Coat Painters", lic: "—", est: "2004" },
];

const SUBMITTALS = [
  { rfi: "RFI-018", sub: "ELEC", date: "04/22", body: "Receptacle layout — kitchen island. Two GFCI to add per NEC 210.52(C).", rev: "△2", status: "ANSWERED" },
  { rfi: "RFI-019", sub: "PLUMB", date: "04/23", body: "WC rough — flange height confirm. Reset 12-3/4\" off finish wall.", rev: "△1", status: "ANSWERED" },
  { rfi: "SUB-014", sub: "HVAC", date: "04/24", body: "Ductwork shop drawings — 2nd-floor riser. Coordination with framing.", rev: "△3", status: "PENDING" },
  { rfi: "ASI-007", sub: "ARCH", date: "04/25", body: "Window schedule revision — change Andersen 400 to E-Series at front elevation.", rev: "—", status: "ISSUED" },
  { rfi: "RFI-021", sub: "MASON", date: "04/26", body: "Stone veneer ledge — confirm 2\" overhang allowance per detail 6/A4.2.", rev: "△2", status: "ANSWERED" },
];

export default function PermitBoardEngine() {
  const [hoveredSub, setHoveredSub] = useState<number | null>(null);
  const [hoveredProject, setHoveredProject] = useState<number | null>(null);

  return (
    <>
      <style>{css}</style>
      <div className="pb-shell">
        <div className="pb-bg" aria-hidden />

        <header className="pb-nav">
          <div className="pb-mark">
            <div className="pb-mark-stamp">KPT</div>
            <div>
              <div className="pb-mark-name">KPT GENERAL CONTRACTING</div>
              <div className="pb-mark-sub">COMM. FIT-OUT &middot; RES. ADDITION &middot; LIC. CSL-091873</div>
            </div>
          </div>
          <nav aria-label="Primary">
            <a href="#board">The Board</a>
            <a href="#subs">Subs on the Board</a>
            <a href="#submittals">Submittals</a>
            <a href="#contact">Open the permit</a>
          </nav>
        </header>

        <section className="pb-hero">
          <div className="pb-rail" aria-hidden>
            <div className="pb-rail-post pb-rail-post-l" />
            <div className="pb-rail-post pb-rail-post-r" />
            <div className="pb-rail-bar" />
          </div>

          <div className="pb-sign">
            <div className="pb-sign-tie pb-tie-tl" aria-hidden />
            <div className="pb-sign-tie pb-tie-tr" aria-hidden />
            <div className="pb-sign-tie pb-tie-bl" aria-hidden />
            <div className="pb-sign-tie pb-tie-br" aria-hidden />
            <div className="pb-sign-flute" aria-hidden />
            <div className="pb-sign-fade" aria-hidden />

            <div className="pb-sign-top">
              <div className="pb-sign-toprow">
                <span>PROJECT</span>
                <span>NO. 14-237</span>
              </div>
              <h1 className="pb-sign-headline">
                MILL ST.<br />RETAIL FIT-OUT
              </h1>
              <div className="pb-sign-sub">GC &middot; KPT GENERAL CONTRACTING</div>
            </div>

            <div className="pb-sign-mid">
              <div className="pb-sign-tagline">DRY-IN BY OCT 30. PUNCHLIST 11/14.</div>
              <div className="pb-sign-meta">
                <div><span>PERMIT</span><strong>BLDG-2026-04-188</strong></div>
                <div><span>OWNER</span><strong>188 MILL ST. LLC</strong></div>
                <div><span>ARCH</span><strong>STUDIO IRON & OAK</strong></div>
              </div>
            </div>

            <div className="pb-sign-band">
              <div className="pb-sign-band-label">SUBS ON THE BOARD</div>
              <div className="pb-sign-band-list">
                ELEC &middot; PLUMB &middot; HVAC &middot; MASON &middot; ROOF &middot; CONCRETE &middot; DRYWALL &middot; INSUL &middot; FLOOR &middot; PAINT
              </div>
            </div>

            <div className="pb-sign-tape" aria-hidden>POSTED 04 / 28 / 2026</div>
          </div>

          <div className="pb-hero-copy">
            <p className="pb-hero-sub">
              General contracting on commercial fit-outs and residential additions — every sub on the board,
              every change order signed.
            </p>
            <div className="pb-hero-ctas">
              <a className="pb-cta pb-cta-primary" href="#submittals">Open the permit &rarr;</a>
              <a className="pb-cta pb-cta-ghost" href="#board">Read the schedule</a>
            </div>
          </div>
        </section>

        <section id="board" className="pb-board">
          <div className="pb-section-head">
            <div className="pb-section-num">01</div>
            <div>
              <h2>The Board</h2>
              <p>Every active project gets a sign. Hover one — its permit status flips up.</p>
            </div>
          </div>

          <div className="pb-board-grid">
            {PROJECTS.map((p, i) => (
              <article
                key={p.no}
                className={`pb-mini${hoveredProject === i ? " pb-mini-on" : ""}`}
                onMouseEnter={() => setHoveredProject(i)}
                onMouseLeave={() => setHoveredProject(null)}
                onFocus={() => setHoveredProject(i)}
                onBlur={() => setHoveredProject(null)}
                tabIndex={0}
                aria-label={`Project ${p.no} — ${p.name} — ${p.status}`}
              >
                <div className="pb-mini-tie pb-mini-tie-l" aria-hidden />
                <div className="pb-mini-tie pb-mini-tie-r" aria-hidden />
                <div className="pb-mini-no">{p.no}</div>
                <div className="pb-mini-name">{p.name}</div>
                <div className="pb-mini-addr">{p.addr}</div>
                <div className="pb-mini-rule" aria-hidden />
                <div className="pb-mini-rows">
                  <div><span>DRY-IN</span><strong>{p.dryIn}</strong></div>
                  <div><span>PUNCH</span><strong>{p.punch}</strong></div>
                </div>
                <div className="pb-mini-stamp">
                  <div className="pb-mini-stamp-row">PERMIT</div>
                  <div className="pb-mini-stamp-num">{p.permit}</div>
                  <div className={`pb-mini-status pb-status-${p.status.toLowerCase()}`}>{p.status}</div>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section id="subs" className="pb-subs">
          <div className="pb-section-head">
            <div className="pb-section-num">02</div>
            <div>
              <h2>Subs on the Board</h2>
              <p>The trade contractors we run with. Hover a row — their stamp surfaces.</p>
            </div>
          </div>

          <div className="pb-subs-grid">
            {SUBS.map((s, i) => (
              <div
                key={s.name}
                className={`pb-sub${hoveredSub === i ? " pb-sub-on" : ""}`}
                onMouseEnter={() => setHoveredSub(i)}
                onMouseLeave={() => setHoveredSub(null)}
                onFocus={() => setHoveredSub(i)}
                onBlur={() => setHoveredSub(null)}
                tabIndex={0}
              >
                <div className="pb-sub-trade">{s.trade}</div>
                <div className="pb-sub-name">{s.name}</div>
                <div className="pb-sub-meta">
                  <span>{s.lic}</span>
                  <span>EST. {s.est}</span>
                </div>
                <div className="pb-sub-stamp" aria-hidden>
                  <div className="pb-sub-stamp-arc">{s.trade} &middot; SUB OF RECORD</div>
                  <div className="pb-sub-stamp-mid">{s.lic}</div>
                  <div className="pb-sub-stamp-arc pb-sub-stamp-arc-bottom">EST. {s.est}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="submittals" className="pb-submittals">
          <div className="pb-section-head">
            <div className="pb-section-num">03</div>
            <div>
              <h2>Submittals</h2>
              <p>Recent RFIs and submittal log entries with revision triangles.</p>
            </div>
          </div>

          <div className="pb-log">
            <div className="pb-log-head">
              <span>NO.</span>
              <span>SUB</span>
              <span>DATE</span>
              <span>ITEM</span>
              <span>REV</span>
              <span>STATUS</span>
            </div>
            {SUBMITTALS.map((s) => (
              <div key={s.rfi} className="pb-log-row">
                <span className="pb-log-no">{s.rfi}</span>
                <span className="pb-log-sub">{s.sub}</span>
                <span className="pb-log-date">{s.date}</span>
                <span className="pb-log-body">{s.body}</span>
                <span className="pb-log-rev">{s.rev}</span>
                <span className={`pb-log-status pb-log-status-${s.status.toLowerCase()}`}>{s.status}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="contact" className="pb-cta-band">
          <div className="pb-cta-band-inner">
            <div>
              <div className="pb-cta-band-eyebrow">REQUEST FOR PROPOSAL</div>
              <h3>Got a project? Get on the board.</h3>
              <p>
                We bid commercial fit-outs from 2,000 SF and residential additions from $250k. Every job
                permitted, every sub vetted, every change order signed before we cut.
              </p>
            </div>
            <a className="pb-cta pb-cta-primary" href="mailto:bid@kptgc.com">Open the permit &rarr;</a>
          </div>
        </section>

        <footer className="pb-footer">
          <div className="pb-footer-cols">
            <div className="pb-footer-mark-col">
              <div className="pb-footer-mark">KPT GENERAL CONTRACTING</div>
              <div className="pb-footer-tag">CIVIC-GRADE BUILD &middot; EVERY SUB ON THE BOARD</div>
            </div>
            <div className="pb-footer-stamp">
              <div className="pb-footer-stamp-name">CONTRACTOR LIC.</div>
              <div className="pb-footer-stamp-num">CSL-091873</div>
              <div className="pb-footer-stamp-state">Commonwealth of Massachusetts</div>
            </div>
            <div className="pb-footer-osha">
              <div className="pb-footer-osha-h">OSHA NOTICE</div>
              <ul>
                <li>Hard-hat &amp; high-vis required past this sign.</li>
                <li>Authorized personnel only.</li>
                <li>Site office at the trailer; sign in.</li>
              </ul>
            </div>
          </div>
          <div className="pb-footer-line" aria-hidden />
          <div className="pb-footer-tiny">
            &copy; KPT GC. Insured to $2M general / $5M umbrella. Bonded by Hartford. EEO compliant.
          </div>
        </footer>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Roboto+Condensed:wght@400;500;700;900&family=Roboto:wght@400;500;700&display=swap');

  .pb-shell {
    --coroplast: #F0EFE9;
    --coroplast-deep: #DAD9D2;
    --permit: #1B4F8B;
    --permit-deep: #103962;
    --sun: #79A6C7;
    --steel: #4F555C;
    --ink: #0E1F2E;
    --ink-soft: #455260;
    font-family: 'Roboto', 'Roboto Condensed', system-ui, sans-serif;
    color: var(--ink);
    background: var(--coroplast);
    position: relative;
    overflow-x: hidden;
  }
  .pb-shell h1, .pb-shell h2, .pb-shell h3 {
    font-family: 'Roboto Condensed', 'Roboto', system-ui, sans-serif;
    font-weight: 900;
    letter-spacing: 0;
  }

  .pb-bg {
    position: absolute; inset: 0; pointer-events: none;
    background-image:
      linear-gradient(0deg, rgba(27,79,139,0.06) 0 1px, transparent 1px 40px);
    background-size: 100% 40px;
    z-index: 1;
  }
  .pb-shell > *:not(.pb-bg) { position: relative; z-index: 2; }

  /* NAV */
  .pb-nav {
    display: flex; align-items: center; justify-content: space-between;
    padding: 18px 56px 14px;
    background: var(--coroplast); border-bottom: 3px solid var(--permit);
  }
  .pb-mark { display: flex; align-items: center; gap: 14px; }
  .pb-mark-stamp {
    width: 48px; height: 48px;
    background: var(--permit); color: #FFF;
    display: grid; place-items: center;
    font-family: 'Roboto Condensed', sans-serif; font-weight: 900; font-size: 22px;
    letter-spacing: -0.02em;
  }
  .pb-mark-name { font-family: 'Roboto Condensed', sans-serif; font-weight: 900; font-size: 18px; letter-spacing: 0.02em; }
  .pb-mark-sub { font-size: 11px; letter-spacing: 0.14em; color: var(--ink-soft); margin-top: 2px; font-weight: 500; }
  .pb-nav nav { display: flex; gap: 24px; }
  .pb-nav nav a {
    color: var(--ink); text-decoration: none; font-size: 13px;
    font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase;
    padding-bottom: 2px; border-bottom: 2px solid transparent;
    transition: border-color 200ms, color 200ms;
  }
  .pb-nav nav a:hover, .pb-nav nav a:focus-visible { color: var(--permit); border-bottom-color: var(--permit); outline: none; }

  /* HERO */
  .pb-hero {
    padding: 56px 56px 72px;
    position: relative;
  }
  .pb-rail {
    position: absolute; top: 24px; left: 56px; right: 56px; height: 18px; pointer-events: none;
  }
  .pb-rail-bar {
    position: absolute; left: 0; right: 0; top: 7px; height: 4px;
    background: linear-gradient(180deg, #B5BAC0 0 1px, var(--steel) 1px 3px, #2C3239 3px 4px);
  }
  .pb-rail-post { position: absolute; top: 0; width: 14px; height: 60px; background: linear-gradient(180deg, var(--steel) 0 70%, #2C3239 100%); }
  .pb-rail-post-l { left: 6%; }
  .pb-rail-post-r { right: 6%; }

  .pb-sign {
    position: relative;
    margin: 36px auto 0; max-width: 1080px;
    background: var(--coroplast);
    border: 4px solid var(--permit);
    box-shadow: 0 32px 48px -28px rgba(14,31,46,0.5);
    padding: 56px 56px 32px;
    animation: pb-sway 4800ms ease-in-out infinite;
    transform-origin: top center;
  }
  @keyframes pb-sway {
    0%, 100% { transform: rotate(-0.8deg); }
    50% { transform: rotate(0.8deg); }
  }
  .pb-sign-flute {
    position: absolute; inset: 4px; pointer-events: none;
    background-image: repeating-linear-gradient(
      90deg,
      transparent 0 7px,
      rgba(14,31,46,0.04) 7px 8px
    );
  }
  .pb-sign-fade {
    position: absolute; inset: 4px; pointer-events: none;
    background: linear-gradient(180deg, rgba(121,166,199,0.22) 0%, transparent 28%);
  }
  .pb-sign-tie {
    position: absolute; width: 26px; height: 12px;
    background: #DAD9D2; border: 1px solid var(--ink); border-radius: 4px;
    box-shadow: 0 2px 4px -2px rgba(14,31,46,0.4);
    z-index: 5;
    animation: pb-tie-pop 220ms ease-out backwards;
  }
  @keyframes pb-tie-pop { 0% { opacity: 0; transform: scale(0.4); } 100% { opacity: 1; transform: scale(1); } }
  .pb-tie-tl { top: -8px; left: 16px; animation-delay: 200ms; }
  .pb-tie-tr { top: -8px; right: 16px; animation-delay: 280ms; }
  .pb-tie-bl { bottom: -8px; left: 16px; animation-delay: 360ms; }
  .pb-tie-br { bottom: -8px; right: 16px; animation-delay: 440ms; }

  .pb-sign-top { position: relative; z-index: 2; padding-bottom: 20px; border-bottom: 3px solid var(--permit); }
  .pb-sign-toprow { display: flex; justify-content: space-between; font-size: 12px; letter-spacing: 0.22em; font-weight: 700; color: var(--permit); margin-bottom: 8px; }
  .pb-sign-headline {
    font-size: clamp(64px, 11vw, 168px); line-height: 0.9; margin: 0 0 12px;
    font-weight: 900;
    color: var(--permit);
    text-transform: uppercase;
    letter-spacing: -0.02em;
  }
  .pb-sign-sub { font-family: 'Roboto Condensed', sans-serif; font-weight: 500; font-size: 22px; letter-spacing: 0.06em; color: var(--ink); }

  .pb-sign-mid { padding: 22px 0; position: relative; z-index: 2; }
  .pb-sign-tagline { font-family: 'Roboto Condensed', sans-serif; font-weight: 700; font-size: clamp(20px, 2.4vw, 30px); margin-bottom: 18px; color: var(--ink); }
  .pb-sign-meta { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
  .pb-sign-meta div { display: flex; flex-direction: column; gap: 2px; padding: 10px 14px; background: rgba(27,79,139,0.06); border-left: 3px solid var(--permit); }
  .pb-sign-meta span { font-size: 10px; letter-spacing: 0.18em; color: var(--ink-soft); font-weight: 700; }
  .pb-sign-meta strong { font-family: 'Roboto Condensed', sans-serif; font-weight: 700; font-size: 15px; letter-spacing: 0.02em; }

  .pb-sign-band {
    margin-top: 16px; padding: 14px 0 4px;
    border-top: 2px solid var(--ink); position: relative; z-index: 2;
  }
  .pb-sign-band-label { font-size: 11px; letter-spacing: 0.22em; color: var(--ink-soft); margin-bottom: 6px; font-weight: 700; }
  .pb-sign-band-list { font-family: 'Roboto Condensed', sans-serif; font-weight: 700; font-size: 14px; letter-spacing: 0.04em; color: var(--ink); }
  .pb-sign-tape {
    position: absolute; top: 12px; right: 12px;
    background: var(--sun); padding: 4px 10px;
    font-size: 10px; font-weight: 700; letter-spacing: 0.18em;
    transform: rotate(2deg); z-index: 3;
  }

  .pb-hero-copy {
    max-width: 720px; margin: 36px auto 0; text-align: center;
  }
  .pb-hero-sub {
    font-family: 'Roboto Condensed', sans-serif; font-weight: 400;
    font-size: 18px; line-height: 1.55; color: var(--ink); margin: 0 0 22px;
  }
  .pb-hero-ctas { display: flex; gap: 14px; flex-wrap: wrap; justify-content: center; }

  /* CTAs */
  .pb-cta {
    display: inline-block; padding: 14px 22px; font-size: 13px;
    text-decoration: none; letter-spacing: 0.16em; text-transform: uppercase;
    font-weight: 700;
    border: 2.5px solid; transition: background 200ms, color 200ms, transform 200ms;
    font-family: 'Roboto Condensed', sans-serif;
  }
  .pb-cta-primary { background: var(--permit); color: #FFF; border-color: var(--permit); }
  .pb-cta-primary:hover, .pb-cta-primary:focus-visible { background: var(--permit-deep); border-color: var(--permit-deep); outline: none; transform: translateY(-1px); }
  .pb-cta-ghost { background: transparent; color: var(--ink); border-color: var(--ink); }
  .pb-cta-ghost:hover, .pb-cta-ghost:focus-visible { background: var(--ink); color: var(--coroplast); outline: none; }

  /* SECTIONS */
  .pb-board, .pb-subs, .pb-submittals { padding: 56px 56px 72px; }
  .pb-section-head { display: grid; grid-template-columns: 80px 1fr; gap: 20px; align-items: start; margin-bottom: 32px; }
  .pb-section-num { font-family: 'Roboto Condensed', sans-serif; font-size: 56px; font-weight: 900; color: var(--permit); line-height: 1; }
  .pb-section-head h2 { font-size: 36px; margin: 0 0 6px; letter-spacing: -0.01em; text-transform: uppercase; }
  .pb-section-head p { font-size: 15px; color: var(--ink-soft); margin: 0; max-width: 560px; }

  /* MINI BOARDS */
  .pb-board-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; }
  .pb-mini {
    position: relative;
    background: var(--coroplast);
    border: 3px solid var(--permit);
    padding: 24px 20px 18px;
    box-shadow: 0 14px 22px -22px rgba(14,31,46,0.4);
    transition: transform 220ms ease, box-shadow 220ms ease;
    outline: none;
  }
  .pb-mini:focus-visible { box-shadow: 0 0 0 3px var(--sun), 0 14px 22px -22px rgba(14,31,46,0.4); }
  .pb-mini-on { transform: translateY(-3px); box-shadow: 0 22px 30px -22px rgba(14,31,46,0.5); }
  .pb-mini-tie { position: absolute; width: 18px; height: 8px; background: #DAD9D2; border: 1px solid var(--ink); border-radius: 3px; top: -6px; }
  .pb-mini-tie-l { left: 16px; }
  .pb-mini-tie-r { right: 16px; }
  .pb-mini-no { font-family: 'Roboto Condensed', sans-serif; font-weight: 700; font-size: 12px; letter-spacing: 0.22em; color: var(--permit); margin-bottom: 6px; }
  .pb-mini-name { font-family: 'Roboto Condensed', sans-serif; font-weight: 900; font-size: 22px; line-height: 1.05; color: var(--ink); margin-bottom: 6px; text-transform: uppercase; }
  .pb-mini-addr { font-size: 13px; color: var(--ink-soft); margin-bottom: 12px; }
  .pb-mini-rule { height: 2px; background: var(--permit); margin-bottom: 14px; }
  .pb-mini-rows { display: grid; gap: 6px; margin-bottom: 14px; }
  .pb-mini-rows div { display: grid; grid-template-columns: 60px 1fr; gap: 12px; font-size: 12px; }
  .pb-mini-rows span { font-size: 10px; letter-spacing: 0.18em; color: var(--ink-soft); padding-top: 1px; font-weight: 700; }
  .pb-mini-rows strong { font-family: 'Roboto Condensed', sans-serif; font-weight: 700; font-size: 13px; letter-spacing: 0.04em; }
  .pb-mini-stamp {
    border: 2px solid var(--permit); padding: 10px 12px;
    color: var(--permit);
    transition: opacity 220ms, transform 220ms;
    transform: rotate(-1deg);
    opacity: 0.55;
  }
  .pb-mini-on .pb-mini-stamp { opacity: 1; transform: rotate(-2deg); }
  .pb-mini-stamp-row { font-size: 10px; letter-spacing: 0.22em; font-weight: 700; }
  .pb-mini-stamp-num { font-family: 'Roboto Condensed', sans-serif; font-weight: 900; font-size: 18px; margin: 2px 0 4px; }
  .pb-mini-status {
    display: inline-block; padding: 2px 8px; font-size: 11px; letter-spacing: 0.18em; font-weight: 700;
    background: var(--sun); color: var(--permit-deep);
  }
  .pb-status-active { background: #5C8A3A; color: #FFF; }
  .pb-status-rough-in { background: var(--sun); color: var(--permit-deep); }
  .pb-status-framing { background: #C8A557; color: var(--ink); }

  /* SUBS */
  .pb-subs-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 14px; }
  .pb-sub {
    position: relative;
    background: rgba(255,255,255,0.5);
    border: 2px solid var(--ink);
    padding: 16px 16px 14px;
    cursor: default; outline: none;
    transition: background 200ms;
    overflow: visible;
  }
  .pb-sub:focus-visible { box-shadow: 0 0 0 2px var(--permit); }
  .pb-sub-on { background: rgba(27,79,139,0.06); }
  .pb-sub-trade { font-family: 'Roboto Condensed', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.22em; color: var(--permit); margin-bottom: 6px; }
  .pb-sub-name { font-family: 'Roboto Condensed', sans-serif; font-weight: 700; font-size: 14px; line-height: 1.25; margin-bottom: 6px; }
  .pb-sub-meta { display: flex; justify-content: space-between; font-size: 10px; letter-spacing: 0.1em; color: var(--ink-soft); font-weight: 500; }
  .pb-sub-stamp {
    position: absolute; top: 50%; right: -36px; transform: translate(0, -50%) rotate(-12deg) scale(0.6);
    width: 110px; height: 110px; border-radius: 50%;
    border: 2.5px solid var(--permit); color: var(--permit);
    background: rgba(240,239,233,0.9);
    display: grid; place-items: center;
    text-align: center;
    opacity: 0;
    transition: opacity 240ms ease, transform 240ms ease;
    pointer-events: none;
    z-index: 4;
  }
  .pb-sub-on .pb-sub-stamp { opacity: 1; transform: translate(0, -50%) rotate(-8deg) scale(0.85); }
  .pb-sub-stamp-arc { position: absolute; top: 12px; font-size: 8px; letter-spacing: 0.16em; font-weight: 700; }
  .pb-sub-stamp-arc-bottom { top: auto; bottom: 12px; }
  .pb-sub-stamp-mid { font-family: 'Roboto Condensed', sans-serif; font-weight: 900; font-size: 13px; letter-spacing: 0.04em; }

  /* SUBMITTALS */
  .pb-submittals { background: var(--coroplast-deep); border-top: 2px solid var(--permit); border-bottom: 2px solid var(--permit); }
  .pb-log { border: 2px solid var(--ink); background: var(--coroplast); }
  .pb-log-head, .pb-log-row {
    display: grid; grid-template-columns: 90px 80px 70px 1fr 50px 110px;
    gap: 16px; padding: 10px 18px; align-items: center;
  }
  .pb-log-head {
    background: var(--permit); color: #FFF;
    font-family: 'Roboto Condensed', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.16em;
  }
  .pb-log-row { border-bottom: 1px dashed rgba(14,31,46,0.2); font-size: 13px; }
  .pb-log-row:last-child { border-bottom: 0; }
  .pb-log-no { font-family: 'Roboto Condensed', sans-serif; font-weight: 700; color: var(--permit); }
  .pb-log-sub { font-size: 11px; letter-spacing: 0.14em; color: var(--ink-soft); font-weight: 700; }
  .pb-log-date { font-size: 12px; color: var(--ink-soft); }
  .pb-log-body { font-size: 13px; line-height: 1.45; }
  .pb-log-rev {
    display: inline-block; padding: 2px 8px; background: var(--sun); color: var(--permit-deep);
    font-family: 'Roboto Condensed', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.06em;
    text-align: center;
    width: max-content;
  }
  .pb-log-status {
    font-family: 'Roboto Condensed', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.16em;
    padding: 4px 10px; text-align: center; width: max-content;
  }
  .pb-log-status-answered { background: #5C8A3A; color: #FFF; }
  .pb-log-status-pending { background: #C8A557; color: var(--ink); }
  .pb-log-status-issued { background: var(--permit); color: #FFF; }

  /* CTA BAND */
  .pb-cta-band {
    padding: 56px 56px 64px;
    background: var(--permit); color: #FFF;
    border-top: 6px solid var(--ink);
    border-bottom: 6px solid var(--ink);
    background-image: linear-gradient(135deg, var(--permit) 0%, var(--permit-deep) 100%);
  }
  .pb-cta-band-inner { display: grid; grid-template-columns: 1fr auto; gap: 32px; align-items: end; }
  .pb-cta-band-eyebrow { font-size: 11px; letter-spacing: 0.22em; color: var(--sun); margin-bottom: 14px; font-weight: 700; }
  .pb-cta-band h3 { font-size: clamp(30px, 4vw, 48px); margin: 0 0 12px; letter-spacing: -0.01em; text-transform: uppercase; }
  .pb-cta-band p { font-size: 16px; color: rgba(240,239,233,0.85); margin: 0; max-width: 540px; line-height: 1.55; }
  .pb-cta-band .pb-cta-primary { background: #FFF; color: var(--permit-deep); border-color: #FFF; }
  .pb-cta-band .pb-cta-primary:hover, .pb-cta-band .pb-cta-primary:focus-visible { background: var(--sun); border-color: var(--sun); color: var(--permit-deep); }

  /* FOOTER */
  .pb-footer { padding: 40px 56px 30px; background: var(--ink); color: var(--coroplast); }
  .pb-footer-cols { display: grid; grid-template-columns: 1.4fr 1fr 1fr; gap: 32px; padding-bottom: 22px; align-items: start; }
  .pb-footer-mark-col { display: grid; gap: 4px; }
  .pb-footer-mark { font-family: 'Roboto Condensed', sans-serif; font-weight: 900; font-size: 26px; letter-spacing: -0.01em; text-transform: uppercase; }
  .pb-footer-tag { font-size: 11px; letter-spacing: 0.18em; color: var(--sun); }
  .pb-footer-stamp { padding: 10px 14px; border: 2px solid var(--sun); color: var(--sun); width: max-content; transform: rotate(-1deg); }
  .pb-footer-stamp-name { font-size: 10px; letter-spacing: 0.18em; font-weight: 700; }
  .pb-footer-stamp-num { font-family: 'Roboto Condensed', sans-serif; font-weight: 900; font-size: 18px; }
  .pb-footer-stamp-state { font-size: 10px; font-style: italic; }
  .pb-footer-osha-h { font-family: 'Roboto Condensed', sans-serif; font-weight: 700; font-size: 11px; letter-spacing: 0.18em; color: var(--sun); margin-bottom: 6px; }
  .pb-footer-osha ul { list-style: none; padding: 0; margin: 0; font-size: 12px; line-height: 1.6; color: rgba(240,239,233,0.78); }
  .pb-footer-line { height: 2px; background: var(--sun); opacity: 0.5; margin-bottom: 12px; }
  .pb-footer-tiny { font-size: 11px; color: rgba(240,239,233,0.6); letter-spacing: 0.04em; }

  @media (max-width: 1080px) {
    .pb-nav { padding: 16px 24px; flex-wrap: wrap; gap: 12px; }
    .pb-hero { padding: 40px 16px 56px; }
    .pb-rail { left: 16px; right: 16px; }
    .pb-sign { padding: 36px 24px 24px; }
    .pb-sign-meta { grid-template-columns: 1fr; gap: 10px; }
    .pb-board, .pb-subs, .pb-submittals, .pb-cta-band, .pb-footer { padding-left: 24px; padding-right: 24px; }
    .pb-board-grid { grid-template-columns: 1fr; }
    .pb-subs-grid { grid-template-columns: repeat(2, 1fr); }
    .pb-sub-stamp { display: none; }
    .pb-log-head, .pb-log-row { grid-template-columns: 1fr; gap: 4px; padding: 12px 16px; }
    .pb-log-head { display: none; }
    .pb-cta-band-inner { grid-template-columns: 1fr; }
    .pb-footer-cols { grid-template-columns: 1fr; }
  }

  @media (prefers-reduced-motion: reduce) {
    .pb-sign { animation: none; transform: none; }
    .pb-sign-tie { animation: none; opacity: 1; transform: none; }
    .pb-mini, .pb-cta, .pb-sub, .pb-mini-stamp, .pb-sub-stamp, .pb-nav nav a {
      transition: none !important;
    }
    .pb-mini-on { transform: none; }
  }
`;
