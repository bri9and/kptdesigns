"use client";

/**
 * PellucidEngine — V69 Pellucid
 *
 * Frosted glass plates over indigo depth. Plates respond to cursor:
 * the plate behind the cursor blurs deeper, the prism edge of the
 * front plate catches light along the cursor angle. Reduced-motion
 * locks plates to a static stack.
 *
 * Trade showcase: high-end residential / small-commercial electricians.
 */

import { useEffect, useRef, useState } from "react";

const PLATES = [
  {
    key: "panel",
    label: "Panel work",
    sub: "200A residential service · subpanels · gen-ready",
    body:
      "Square D QO upgrades, AFCI/GFCI by code, every breaker labeled in tight all-caps draftsman's hand. We pull the meter neat and we leave the directory legible.",
    detail: ["AFCI / GFCI per NEC 210.8/12", "Generator interlock options", "Whole-house surge at the panel"],
  },
  {
    key: "lighting",
    label: "Lighting",
    sub: "Architectural fixtures · low-voltage layouts",
    body:
      "Designer-spec fixtures hung dead-plumb. Low-voltage transformers tucked in mech rooms, dimmers on Lutron RA3, shadow-line bevels honored to the spec.",
    detail: ["Lutron RA3 / RadioRA programming", "Tape, linear, in-grade", "Dimmable LED driver matching"],
  },
  {
    key: "rough",
    label: "Rough-in",
    sub: "New construction & deep remodel",
    body:
      "12/2 Romex slung off the forearm and into staples, every home run labeled at the can. Clean panel pop, clean stub-outs, clean walk-throughs at trim-out.",
    detail: ["Home runs labeled at the can", "Box fill calculated, not eyeballed", "Inspector-ready in one pass"],
  },
  {
    key: "service",
    label: "Service",
    sub: "Calm calls · clean diagnostic notes",
    body:
      "Tripping breaker, dead outlet, hum in the gear room — we read the building before we read the meter. Diagnosis written down, photographed, e-mailed before the truck pulls away.",
    detail: ["Same-week response", "Written diagnostic notes", "Quote in writing or no charge"],
  },
];

const PANEL_DIRECTORY = [
  { num: "01", load: "RANGE", amp: "50A", phase: "DBL" },
  { num: "02", load: "DRYER", amp: "30A", phase: "DBL" },
  { num: "03", load: "HVAC — 1F", amp: "30A", phase: "DBL" },
  { num: "04", load: "HVAC — 2F", amp: "30A", phase: "DBL" },
  { num: "05", load: "WTR HEATER", amp: "30A", phase: "DBL" },
  { num: "06", load: "EV CHARGER", amp: "60A", phase: "DBL" },
  { num: "07", load: "KITCHEN A", amp: "20A", phase: "GFCI" },
  { num: "08", load: "KITCHEN B", amp: "20A", phase: "GFCI" },
  { num: "09", load: "BATHS", amp: "20A", phase: "GFCI" },
  { num: "10", load: "GARAGE", amp: "20A", phase: "GFCI" },
  { num: "11", load: "BR1 / BR2", amp: "15A", phase: "AFCI" },
  { num: "12", load: "BR3 / OFFICE", amp: "15A", phase: "AFCI" },
];

const STEPS = [
  { tag: "01 / WALK", title: "We walk the building", body: "Panel inspection, infrared gun on the legs, written notes. No quote without the walk." },
  { tag: "02 / QUOTE", title: "Quote in writing", body: "Itemized scope, parts list, schedule of values. No verbal-only ballparks." },
  { tag: "03 / INSTALL", title: "Clean install", body: "We tarp the floor. We label the panel. We hand you the meter seal photo when we're done." },
];

export default function PellucidEngine() {
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [activeBreaker, setActiveBreaker] = useState<number | null>(null);
  const [cursor, setCursor] = useState<{ x: number; y: number }>({ x: 50, y: 50 });
  const shellRef = useRef<HTMLDivElement | null>(null);
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 100;
      const y = (e.clientY / window.innerHeight) * 100;
      setCursor({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  return (
    <>
      <style>{css}</style>
      <div
        className="pl-shell"
        ref={shellRef}
        style={{
          ["--cx" as string]: `${cursor.x}%`,
          ["--cy" as string]: `${cursor.y}%`,
        }}
      >
        {/* DEEP BACKDROP */}
        <div className="pl-backdrop" aria-hidden />
        <div className="pl-aurora" aria-hidden />
        <div className="pl-grid" aria-hidden />

        {/* TOP NAV */}
        <header className="pl-top">
          <div className="pl-brand">
            <div className="pl-brand-prism" aria-hidden>
              <span /><span /><span />
            </div>
            <div className="pl-brand-stack">
              <span className="pl-brand-name">Pellucid Electric</span>
              <span className="pl-brand-meta">Master · License #E-21884 · Insured to $2M</span>
            </div>
          </div>
          <nav className="pl-nav">
            <a href="#plates" className="pl-link">The plates</a>
            <a href="#panel" className="pl-link">The panel</a>
            <a href="#walk" className="pl-link">The walk</a>
            <a href="#contact" className="pl-link pl-link-cta">Schedule a walk</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="pl-hero">
          <div className="pl-hero-stack" aria-hidden>
            <div className="pl-hero-card pl-hero-card-3" />
            <div className="pl-hero-card pl-hero-card-2" />
            <div className="pl-hero-card pl-hero-card-1" />
          </div>

          <div className="pl-hero-text">
            <div className="pl-eyebrow">RESIDENTIAL · LIGHT-COMMERCIAL · CALM</div>
            <h1 className="pl-headline">
              Service that&rsquo;s <em>clear</em> before it&rsquo;s energized.
            </h1>
            <p className="pl-sub">
              High-end residential and small-commercial electric &mdash; clean
              panel work, clean labeling, clean walk-throughs. We measure the
              building before we measure the meter.
            </p>
            <div className="pl-cta-row">
              <a href="#contact" className="pl-cta pl-cta-primary">Schedule a walk</a>
              <a href="#plates" className="pl-cta pl-cta-ghost">See the work</a>
            </div>
            <div className="pl-stats">
              <div>
                <span className="pl-stat-num">22</span>
                <span className="pl-stat-lbl">years in the trade</span>
              </div>
              <div>
                <span className="pl-stat-num">200A</span>
                <span className="pl-stat-lbl">standard residential service</span>
              </div>
              <div>
                <span className="pl-stat-num">$2M</span>
                <span className="pl-stat-lbl">general liability</span>
              </div>
            </div>
          </div>
        </section>

        {/* THE PLATES */}
        <section id="plates" className="pl-section">
          <header className="pl-section-head">
            <div className="pl-section-tag">04 PLATES</div>
            <h2 className="pl-section-title">The work, by depth.</h2>
            <p className="pl-section-lead">
              Four service plates layered front-to-back. Hover &mdash; the rest fall
              behind. Whatever you point at sharpens; everything else softens.
            </p>
          </header>

          <div
            className={`pl-plates${hoverIdx !== null ? " pl-plates-active" : ""}`}
            role="list"
          >
            {PLATES.map((plate, i) => (
              <article
                key={plate.key}
                role="listitem"
                className="pl-plate"
                style={{ ["--i" as string]: i }}
                onMouseEnter={() => setHoverIdx(i)}
                onMouseLeave={() => setHoverIdx((h) => (h === i ? null : h))}
                onFocus={() => setHoverIdx(i)}
                onBlur={() => setHoverIdx((h) => (h === i ? null : h))}
                tabIndex={0}
                aria-label={`${plate.label} — ${plate.sub}`}
                data-active={hoverIdx === i ? "true" : "false"}
                data-dimmed={hoverIdx !== null && hoverIdx !== i ? "true" : "false"}
              >
                <div className="pl-plate-edge" aria-hidden />
                <div className="pl-plate-glow" aria-hidden />
                <div className="pl-plate-body">
                  <div className="pl-plate-label">{plate.label}</div>
                  <div className="pl-plate-sub">{plate.sub}</div>
                  <p className="pl-plate-text">{plate.body}</p>
                  <ul className="pl-plate-detail">
                    {plate.detail.map((d) => (
                      <li key={d}>{d}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* THE PANEL */}
        <section id="panel" className="pl-section pl-section-panel">
          <div className="pl-panel-grid">
            <header className="pl-panel-text">
              <div className="pl-section-tag">12 BREAKERS</div>
              <h2 className="pl-section-title">A directory you can read in the dark.</h2>
              <p className="pl-section-lead">
                A finished panel is a love letter to the next electrician.
                Hover a breaker &mdash; the load and circuit ID surfaces.
                Every job ends with the directory typed, not Sharpied.
              </p>
              <ul className="pl-panel-bullets">
                <li>Square D QO trim-and-finish standard</li>
                <li>Whole-house surge protection at the bus</li>
                <li>Generator interlock cabin-ready before utility cutover</li>
                <li>Photographs of the meter seal e-mailed at close</li>
              </ul>
            </header>

            <div
              className="pl-panel"
              role="list"
              aria-label="Sample panel directory"
            >
              <div className="pl-panel-frame" aria-hidden />
              <div className="pl-panel-header">
                <span>BREAKER</span>
                <span>LOAD</span>
                <span>AMP</span>
                <span>TYPE</span>
              </div>
              {PANEL_DIRECTORY.map((b, i) => (
                <div
                  key={b.num}
                  role="listitem"
                  className={`pl-breaker${activeBreaker === i ? " pl-breaker-on" : ""}`}
                  onMouseEnter={() => setActiveBreaker(i)}
                  onMouseLeave={() => setActiveBreaker((a) => (a === i ? null : a))}
                  onFocus={() => setActiveBreaker(i)}
                  onBlur={() => setActiveBreaker((a) => (a === i ? null : a))}
                  tabIndex={0}
                >
                  <span className="pl-breaker-num">{b.num}</span>
                  <span className="pl-breaker-load">{b.load}</span>
                  <span className="pl-breaker-amp">{b.amp}</span>
                  <span className="pl-breaker-type">{b.phase}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* THE WALK */}
        <section id="walk" className="pl-section">
          <header className="pl-section-head">
            <div className="pl-section-tag">03 STEPS</div>
            <h2 className="pl-section-title">No verbal ballparks.</h2>
            <p className="pl-section-lead">
              Three plates from walk to install. We don&rsquo;t pretend to know
              the building before we&rsquo;ve seen it &mdash; and we don&rsquo;t
              quote until we&rsquo;ve walked it.
            </p>
          </header>

          <div className="pl-steps">
            {STEPS.map((s) => (
              <article key={s.tag} className="pl-step" tabIndex={0}>
                <div className="pl-step-edge" aria-hidden />
                <div className="pl-step-tag">{s.tag}</div>
                <h3 className="pl-step-title">{s.title}</h3>
                <p className="pl-step-body">{s.body}</p>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="pl-section pl-section-contact">
          <div className="pl-contact-card">
            <div className="pl-contact-edge" aria-hidden />
            <div className="pl-contact-body">
              <div className="pl-section-tag">SCHEDULE</div>
              <h2 className="pl-contact-title">
                Walk first.
                <br />
                <span>Then we plug numbers in.</span>
              </h2>
              <p className="pl-contact-text">
                Same-week response on residential. Two-week typical lead time
                on full panel-and-service upgrades. We do not subcontract panel
                work; the master sets every breaker himself.
              </p>
              <div className="pl-contact-row">
                <a href="tel:5552108844" className="pl-contact-phone">
                  555 &middot; 210 &middot; 8844
                </a>
                <span className="pl-contact-sep" aria-hidden />
                <a href="mailto:walks@pellucid.example" className="pl-contact-mail">
                  walks@pellucid.example
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="pl-footer">
          <div className="pl-footer-row">
            <span className="pl-footer-stub">MASTER · LICENSE E-21884</span>
            <span className="pl-footer-stub">NECA MEMBER · NETA RATED</span>
            <span className="pl-footer-stub">NEC 2023 EDITION</span>
            <span className="pl-footer-stub">$2M GENERAL LIABILITY</span>
          </div>
          <p className="pl-footer-credit">
            Drafted in the back of the gear room, 60Hz hum on the panel,
            inspector signed at 4:14 pm. &copy; 2026 Pellucid Electric.
          </p>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

.pl-shell {
  --cx: 50%;
  --cy: 50%;
  position: relative;
  min-height: 100vh;
  background: #0F1130;
  color: #E6EAEF;
  font-family: 'Inter', system-ui, sans-serif;
  padding: 28px 28px 56px;
  isolation: isolate;
  overflow: hidden;
}

.pl-backdrop {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 40% at var(--cx) var(--cy), rgba(111, 207, 224, 0.18) 0%, transparent 70%),
    radial-gradient(ellipse 80% 60% at 80% 20%, rgba(80, 100, 200, 0.25) 0%, transparent 70%),
    radial-gradient(ellipse 70% 50% at 20% 80%, rgba(180, 120, 220, 0.18) 0%, transparent 70%),
    linear-gradient(180deg, #0F1130 0%, #1A1747 50%, #2D2A57 100%);
  z-index: -3;
  transition: background 800ms ease;
}
.pl-aurora {
  position: fixed;
  inset: 0;
  background:
    radial-gradient(ellipse 30% 100% at var(--cx) 0%, rgba(111, 207, 224, 0.12), transparent 70%);
  z-index: -2;
  pointer-events: none;
  filter: blur(40px);
  mix-blend-mode: screen;
  animation: pl-aurora-drift 14s ease-in-out infinite;
}
@keyframes pl-aurora-drift {
  0%, 100% { transform: translateY(0); opacity: 0.9; }
  50% { transform: translateY(-30px); opacity: 1; }
}
@media (prefers-reduced-motion: reduce) {
  .pl-aurora { animation: none; }
}

.pl-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(230, 234, 239, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(230, 234, 239, 0.05) 1px, transparent 1px);
  background-size: 80px 80px;
  z-index: -2;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 70% 60% at 50% 50%, black 30%, transparent 80%);
}

/* TOP NAV */
.pl-top {
  position: relative;
  z-index: 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 22px;
  border: 1px solid rgba(230, 234, 239, 0.18);
  background: rgba(15, 17, 48, 0.5);
  backdrop-filter: blur(18px) saturate(120%);
  -webkit-backdrop-filter: blur(18px) saturate(120%);
  flex-wrap: wrap;
  gap: 18px;
  border-radius: 18px;
}
.pl-brand { display: flex; align-items: center; gap: 16px; }
.pl-brand-prism {
  position: relative;
  width: 36px; height: 36px;
  display: grid;
  place-items: center;
}
.pl-brand-prism span {
  position: absolute;
  width: 2px;
  height: 36px;
  border-radius: 1px;
  transform-origin: 50% 50%;
}
.pl-brand-prism span:nth-child(1) { background: #6FCFE0; box-shadow: 0 0 8px rgba(111, 207, 224, 0.7); }
.pl-brand-prism span:nth-child(2) { background: #B080F0; transform: rotate(60deg); box-shadow: 0 0 8px rgba(176, 128, 240, 0.6); }
.pl-brand-prism span:nth-child(3) { background: #F08080; transform: rotate(-60deg); box-shadow: 0 0 8px rgba(240, 128, 128, 0.5); }

.pl-brand-stack { display: flex; flex-direction: column; line-height: 1.05; }
.pl-brand-name {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 18px;
  letter-spacing: -0.01em;
  color: #F2F4F8;
}
.pl-brand-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  color: rgba(230, 234, 239, 0.6);
  margin-top: 4px;
}
.pl-nav { display: flex; align-items: center; gap: 22px; flex-wrap: wrap; }
.pl-link {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 500;
  letter-spacing: 0.04em;
  color: rgba(230, 234, 239, 0.78);
  text-decoration: none;
  position: relative;
  padding: 6px 4px;
  transition: color 200ms ease;
}
.pl-link:hover, .pl-link:focus-visible { color: #6FCFE0; outline: none; }
.pl-link::after {
  content: '';
  position: absolute;
  inset: auto 0 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, #6FCFE0, transparent);
  opacity: 0;
  transition: opacity 220ms ease;
}
.pl-link:hover::after, .pl-link:focus-visible::after { opacity: 1; }
.pl-link-cta {
  border: 1px solid rgba(111, 207, 224, 0.5);
  padding: 8px 16px;
  border-radius: 999px;
  background: rgba(111, 207, 224, 0.08);
  color: #6FCFE0;
}
.pl-link-cta::after { display: none; }
.pl-link-cta:hover, .pl-link-cta:focus-visible {
  background: rgba(111, 207, 224, 0.2);
  border-color: #6FCFE0;
  color: #F2F4F8;
}

/* HERO */
.pl-hero {
  position: relative;
  z-index: 2;
  padding: 80px 12px 96px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
  gap: 56px;
}
.pl-hero-stack {
  position: relative;
  height: 460px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.pl-hero-card {
  position: absolute;
  width: 80%;
  height: 75%;
  border-radius: 32px;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.04) 50%, rgba(255,255,255,0.16) 100%),
    rgba(45, 42, 87, 0.5);
  backdrop-filter: blur(24px) saturate(150%);
  -webkit-backdrop-filter: blur(24px) saturate(150%);
  border: 1px solid rgba(255,255,255,0.25);
  box-shadow:
    0 24px 60px rgba(15, 17, 48, 0.6),
    inset 0 1px 0 rgba(255,255,255,0.4),
    inset 0 -2px 0 rgba(255,255,255,0.06);
  transition: transform 600ms cubic-bezier(0.2, 0.8, 0.2, 1);
}
.pl-hero-card-1 {
  transform: translate(20px, -40px) rotate(-4deg);
  z-index: 3;
}
.pl-hero-card-2 {
  transform: translate(-30px, 10px) rotate(2deg);
  z-index: 2;
  background:
    linear-gradient(135deg, rgba(111, 207, 224, 0.18) 0%, rgba(255,255,255,0.04) 50%, rgba(176, 128, 240, 0.18) 100%),
    rgba(45, 42, 87, 0.45);
  filter: blur(0.5px);
}
.pl-hero-card-3 {
  transform: translate(60px, 60px) rotate(6deg);
  z-index: 1;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(176, 128, 240, 0.18) 100%),
    rgba(45, 42, 87, 0.4);
  filter: blur(1.5px);
  opacity: 0.86;
}
@media (prefers-reduced-motion: reduce) {
  .pl-hero-card { transition: none; }
}

.pl-hero-text { max-width: 560px; }
.pl-eyebrow {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  color: #6FCFE0;
  border: 1px solid rgba(111, 207, 224, 0.45);
  padding: 6px 12px;
  border-radius: 999px;
  margin-bottom: 24px;
  background: rgba(111, 207, 224, 0.06);
}
.pl-headline {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: clamp(40px, 5.6vw, 72px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 0 0 20px;
  color: #F2F4F8;
}
.pl-headline em {
  font-style: italic;
  font-weight: 500;
  background: linear-gradient(120deg, #6FCFE0 0%, #B080F0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.pl-sub {
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  line-height: 1.6;
  color: rgba(230, 234, 239, 0.82);
  margin: 0 0 28px;
  max-width: 480px;
}
.pl-cta-row { display: flex; flex-wrap: wrap; gap: 12px; margin-bottom: 36px; }
.pl-cta {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 500;
  letter-spacing: 0.02em;
  text-decoration: none;
  padding: 14px 24px;
  border-radius: 999px;
  display: inline-block;
  transition: transform 220ms ease, background 220ms ease, border-color 220ms ease, box-shadow 220ms ease;
}
.pl-cta-primary {
  background: linear-gradient(120deg, #6FCFE0 0%, #B080F0 100%);
  color: #0F1130;
  border: 1px solid rgba(255,255,255,0.4);
  box-shadow: 0 0 24px rgba(111, 207, 224, 0.45);
  font-weight: 600;
}
.pl-cta-primary:hover, .pl-cta-primary:focus-visible {
  outline: none;
  transform: translateY(-2px);
  box-shadow: 0 0 36px rgba(111, 207, 224, 0.7);
}
.pl-cta-ghost {
  background: rgba(255,255,255,0.08);
  color: #F2F4F8;
  border: 1px solid rgba(230, 234, 239, 0.4);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
}
.pl-cta-ghost:hover, .pl-cta-ghost:focus-visible {
  outline: none;
  background: rgba(255,255,255,0.16);
  border-color: rgba(230, 234, 239, 0.7);
  transform: translateY(-2px);
}
@media (prefers-reduced-motion: reduce) {
  .pl-cta { transition: background 220ms ease, border-color 220ms ease; }
}

.pl-stats {
  display: flex;
  gap: 40px;
  flex-wrap: wrap;
  padding-top: 28px;
  border-top: 1px solid rgba(230, 234, 239, 0.18);
}
.pl-stats > div { display: flex; flex-direction: column; }
.pl-stat-num {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 32px;
  color: #F2F4F8;
  letter-spacing: -0.02em;
  line-height: 1;
}
.pl-stat-lbl {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: rgba(230, 234, 239, 0.6);
  margin-top: 6px;
}

/* SECTIONS */
.pl-section {
  position: relative;
  z-index: 2;
  padding: 64px 12px 80px;
}
.pl-section-head { max-width: 720px; margin-bottom: 44px; }
.pl-section-tag {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  color: rgba(111, 207, 224, 0.85);
  border: 1px solid rgba(111, 207, 224, 0.35);
  border-radius: 999px;
  padding: 4px 10px;
  margin-bottom: 18px;
}
.pl-section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: clamp(32px, 4.4vw, 52px);
  line-height: 1.1;
  letter-spacing: -0.02em;
  margin: 0 0 14px;
  color: #F2F4F8;
}
.pl-section-lead {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(230, 234, 239, 0.78);
  max-width: 600px;
  margin: 0;
}

/* PLATES */
.pl-plates {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}
.pl-plate {
  --i: 0;
  position: relative;
  border-radius: 28px;
  padding: 32px 28px;
  min-height: 360px;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.16) 0%, rgba(255,255,255,0.02) 60%, rgba(255,255,255,0.12) 100%),
    rgba(45, 42, 87, 0.4);
  border: 1px solid rgba(255,255,255,0.22);
  backdrop-filter: blur(22px) saturate(140%);
  -webkit-backdrop-filter: blur(22px) saturate(140%);
  box-shadow:
    0 20px 50px rgba(15, 17, 48, 0.55),
    inset 0 1px 0 rgba(255,255,255,0.35);
  outline: none;
  transition: transform 360ms cubic-bezier(0.2, 0.8, 0.2, 1), filter 320ms ease, opacity 320ms ease, box-shadow 320ms ease;
  cursor: default;
  overflow: hidden;
}
.pl-plate[data-active="true"] {
  transform: translateY(-10px) rotate(0deg);
  box-shadow:
    0 28px 64px rgba(15, 17, 48, 0.75),
    0 0 0 1px rgba(111, 207, 224, 0.5),
    inset 0 1px 0 rgba(255,255,255,0.5);
  z-index: 4;
}
.pl-plate[data-dimmed="true"] {
  filter: blur(2.5px) saturate(60%);
  opacity: 0.55;
  transform: scale(0.98);
}
@media (prefers-reduced-motion: reduce) {
  .pl-plate { transition: none; }
  .pl-plate[data-active="true"], .pl-plate[data-dimmed="true"] { transform: none; filter: none; opacity: 1; }
}

.pl-plate-edge {
  position: absolute;
  inset: -1px;
  border-radius: inherit;
  background: linear-gradient(120deg, rgba(111, 207, 224, 0.6), rgba(176, 128, 240, 0.6) 40%, transparent 60%, rgba(255,255,255,0.5));
  opacity: 0.35;
  pointer-events: none;
  -webkit-mask:
    linear-gradient(#000, #000) content-box,
    linear-gradient(#000, #000);
  -webkit-mask-composite: xor;
  mask-composite: exclude;
  padding: 1.5px;
}
.pl-plate-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--cx) var(--cy), rgba(255,255,255,0.18), transparent 40%);
  opacity: 0;
  pointer-events: none;
  border-radius: inherit;
  transition: opacity 280ms ease;
}
.pl-plate[data-active="true"] .pl-plate-glow { opacity: 1; }

.pl-plate-body { position: relative; z-index: 2; }
.pl-plate-label {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 26px;
  color: #F2F4F8;
  letter-spacing: -0.01em;
  margin-bottom: 4px;
}
.pl-plate-sub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.12em;
  color: rgba(111, 207, 224, 0.85);
  margin-bottom: 20px;
}
.pl-plate-text {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(230, 234, 239, 0.85);
  margin: 0 0 18px;
}
.pl-plate-detail {
  list-style: none;
  margin: 0;
  padding: 16px 0 0;
  border-top: 1px solid rgba(230, 234, 239, 0.16);
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.pl-plate-detail li {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: rgba(230, 234, 239, 0.78);
}
.pl-plate-detail li::before { content: '→ '; color: #6FCFE0; }

/* PANEL */
.pl-section-panel {
  background: rgba(15, 17, 48, 0.4);
  margin: 0 -28px;
  padding: 80px 40px 96px;
}
.pl-panel-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 56px;
  align-items: center;
  max-width: 1240px;
  margin: 0 auto;
}
.pl-panel-text { max-width: 480px; }
.pl-panel-bullets {
  list-style: none;
  margin: 28px 0 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 10px;
}
.pl-panel-bullets li {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: rgba(230, 234, 239, 0.85);
  padding-left: 22px;
  position: relative;
  line-height: 1.5;
}
.pl-panel-bullets li::before {
  content: '';
  position: absolute;
  left: 0; top: 7px;
  width: 12px; height: 12px;
  background: linear-gradient(135deg, #6FCFE0, #B080F0);
  border-radius: 2px;
  box-shadow: 0 0 8px rgba(111, 207, 224, 0.5);
}

.pl-panel {
  position: relative;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.02) 60%, rgba(255,255,255,0.08) 100%),
    rgba(45, 42, 87, 0.45);
  border: 1px solid rgba(255,255,255,0.22);
  backdrop-filter: blur(22px) saturate(140%);
  -webkit-backdrop-filter: blur(22px) saturate(140%);
  border-radius: 24px;
  padding: 28px;
  box-shadow: 0 20px 50px rgba(15, 17, 48, 0.55), inset 0 1px 0 rgba(255,255,255,0.35);
}
.pl-panel-frame {
  position: absolute;
  inset: 12px;
  border: 1.5px dashed rgba(230, 234, 239, 0.18);
  border-radius: 16px;
  pointer-events: none;
}
.pl-panel-header,
.pl-breaker {
  display: grid;
  grid-template-columns: 50px 1fr 60px 60px;
  gap: 8px;
  align-items: center;
  padding: 8px 14px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  border-bottom: 1px solid rgba(230, 234, 239, 0.1);
}
.pl-panel-header {
  color: rgba(111, 207, 224, 0.85);
  border-bottom-color: rgba(111, 207, 224, 0.35);
  margin-bottom: 4px;
}
.pl-breaker {
  color: rgba(230, 234, 239, 0.85);
  outline: none;
  cursor: default;
  position: relative;
  transition: background 220ms ease, color 220ms ease;
}
.pl-breaker::before {
  content: '';
  position: absolute;
  left: 0; top: 8px; bottom: 8px;
  width: 3px;
  background: rgba(111, 207, 224, 0.25);
  border-radius: 2px;
  transition: background 220ms ease, box-shadow 220ms ease;
}
.pl-breaker:hover, .pl-breaker:focus-visible, .pl-breaker-on {
  background: rgba(111, 207, 224, 0.08);
  color: #F2F4F8;
}
.pl-breaker:hover::before, .pl-breaker:focus-visible::before, .pl-breaker-on::before {
  background: #6FCFE0;
  box-shadow: 0 0 8px #6FCFE0;
}
.pl-breaker-num { color: rgba(176, 128, 240, 0.85); font-weight: 500; }
.pl-breaker-amp { color: #6FCFE0; }
.pl-breaker-type { color: rgba(230, 234, 239, 0.7); font-size: 10px; }

/* STEPS */
.pl-steps {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 24px;
}
.pl-step {
  position: relative;
  border-radius: 24px;
  padding: 32px 28px;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.02) 60%, rgba(255,255,255,0.1) 100%),
    rgba(45, 42, 87, 0.4);
  border: 1px solid rgba(255,255,255,0.2);
  backdrop-filter: blur(20px) saturate(140%);
  -webkit-backdrop-filter: blur(20px) saturate(140%);
  box-shadow: 0 16px 40px rgba(15, 17, 48, 0.5), inset 0 1px 0 rgba(255,255,255,0.3);
  outline: none;
  transition: transform 280ms ease, box-shadow 280ms ease;
}
.pl-step:hover, .pl-step:focus-visible {
  transform: translateY(-6px);
  box-shadow: 0 24px 56px rgba(15, 17, 48, 0.7), 0 0 0 1px rgba(111, 207, 224, 0.5), inset 0 1px 0 rgba(255,255,255,0.5);
}
@media (prefers-reduced-motion: reduce) {
  .pl-step { transition: none; }
  .pl-step:hover, .pl-step:focus-visible { transform: none; }
}
.pl-step-edge {
  position: absolute;
  inset: 0;
  border-radius: inherit;
  background: linear-gradient(120deg, rgba(111, 207, 224, 0.4), transparent 50%);
  opacity: 0.5;
  pointer-events: none;
  mix-blend-mode: screen;
}
.pl-step-tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: #6FCFE0;
  margin-bottom: 12px;
}
.pl-step-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 22px;
  color: #F2F4F8;
  margin: 0 0 10px;
  letter-spacing: -0.01em;
}
.pl-step-body {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(230, 234, 239, 0.82);
  margin: 0;
}

/* CONTACT */
.pl-section-contact { padding-top: 64px; padding-bottom: 80px; }
.pl-contact-card {
  position: relative;
  max-width: 880px;
  margin: 0 auto;
  border-radius: 32px;
  padding: 56px 48px;
  background:
    linear-gradient(135deg, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0.02) 50%, rgba(176,128,240,0.16) 100%),
    rgba(45, 42, 87, 0.5);
  border: 1px solid rgba(255,255,255,0.25);
  backdrop-filter: blur(28px) saturate(150%);
  -webkit-backdrop-filter: blur(28px) saturate(150%);
  box-shadow: 0 28px 72px rgba(15, 17, 48, 0.7), inset 0 1px 0 rgba(255,255,255,0.4);
  overflow: hidden;
}
.pl-contact-edge {
  position: absolute;
  inset: 0;
  background:
    radial-gradient(ellipse 60% 40% at 80% 20%, rgba(111, 207, 224, 0.22), transparent 70%),
    radial-gradient(ellipse 50% 50% at 20% 80%, rgba(176, 128, 240, 0.18), transparent 70%);
  pointer-events: none;
  border-radius: inherit;
}
.pl-contact-body { position: relative; z-index: 2; }
.pl-contact-title {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.02em;
  margin: 16px 0;
  color: #F2F4F8;
}
.pl-contact-title span {
  background: linear-gradient(120deg, #6FCFE0 0%, #B080F0 100%);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  font-style: italic;
  font-weight: 500;
}
.pl-contact-text {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(230, 234, 239, 0.85);
  max-width: 580px;
  margin: 0 0 32px;
}
.pl-contact-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 22px;
}
.pl-contact-phone {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: clamp(28px, 4vw, 40px);
  letter-spacing: -0.01em;
  color: #F2F4F8;
  text-decoration: none;
  transition: color 220ms ease;
}
.pl-contact-phone:hover, .pl-contact-phone:focus-visible {
  outline: none;
  background: linear-gradient(120deg, #6FCFE0, #B080F0);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
}
.pl-contact-sep {
  width: 1px; height: 32px;
  background: rgba(230, 234, 239, 0.3);
}
.pl-contact-mail {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: rgba(230, 234, 239, 0.82);
  text-decoration: none;
  letter-spacing: 0.04em;
  transition: color 220ms ease;
}
.pl-contact-mail:hover, .pl-contact-mail:focus-visible {
  outline: none;
  color: #6FCFE0;
}

/* FOOTER */
.pl-footer {
  position: relative;
  z-index: 2;
  border-top: 1px solid rgba(230, 234, 239, 0.18);
  padding: 22px 4px 4px;
  margin-top: 36px;
}
.pl-footer-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 14px;
}
.pl-footer-stub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  color: rgba(230, 234, 239, 0.7);
  border: 1px solid rgba(230, 234, 239, 0.22);
  border-radius: 999px;
  padding: 4px 10px;
}
.pl-footer-credit {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  font-style: italic;
  color: rgba(230, 234, 239, 0.6);
  margin: 0;
}

/* RESPONSIVE */
@media (max-width: 980px) {
  .pl-hero { grid-template-columns: 1fr; }
  .pl-hero-stack { display: none; }
  .pl-panel-grid { grid-template-columns: 1fr; }
  .pl-top { border-radius: 14px; }
}
`;
