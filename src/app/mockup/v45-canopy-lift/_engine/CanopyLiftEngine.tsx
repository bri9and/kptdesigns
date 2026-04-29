"use client";

/**
 * CanopyLiftEngine — V45 Canopy Lift
 *
 * Three layered canopy silhouettes parallax-lift on scroll. Bark-grain ground,
 * filtered light. Hero on landscape arboriculture (canopy lifts, crotch
 * reductions). Hover on a project reveals rope-and-saddle TIP icon.
 */

import { useEffect, useRef, useState } from "react";

const CLIMBS = [
  {
    code: "TIP-A12",
    species: "Quercus rubra · 78 ft",
    title: "Crotch reduction over a slate pool deck",
    body:
      "Three-anchor SRT, redirect at 42 ft to clear the cabana ridge. Drop zone signed and roped. Crown thinned 12% to lift sun load off the espalier behind the kitchen wing.",
    tip: "redirect / SRT",
  },
  {
    code: "TIP-B07",
    species: "Acer saccharum · 64 ft",
    title: "Lift over a kitchen-garden wall",
    body:
      "Four-cut crown raise to 14-foot ground clearance for the new pollinator garden. Heavy lateral over the herb beds reduced to a lateral one-third its diameter. ANSI A300 cuts only.",
    tip: "double-tie / DRT",
  },
  {
    code: "TIP-C03",
    species: "Tilia americana · 90 ft",
    title: "Storm-shed limb removal, drop zone over a koi pond",
    body:
      "Half-ton limb skidded with a Port-a-Wrap on a 12,000-lb sling. Pond skimmer covered, koi netted to the deep end before the first cut. No splash on the lily pads.",
    tip: "Port-a-Wrap",
  },
  {
    code: "TIP-D14",
    species: "Fagus sylvatica · 72 ft",
    title: "Carpenter-ant cavity audit + cabling",
    body:
      "Cavity bored at the union, fungal sample collected. Two static cables run between primary co-dominant leads at the upper third. ISA-certified arborist on tree.",
    tip: "static cable",
  },
];

const STANDARDS = [
  {
    ref: "ANSI A300 Pt. 1 — 2017",
    title: "Pruning Operations",
    plain:
      "We never remove more than 25% of a tree's living crown in a single visit, and we cut to a lateral at least one-third the diameter of the parent stem. Heading cuts are not pruning.",
  },
  {
    ref: "ANSI Z133 — 2017",
    title: "Safety on the Climb",
    plain:
      "Every climb has a written work plan: tie-in point, redirect, drop zone, traffic plan. Two-rope climbing system on every job. Ground crew in line-of-sight at every cut.",
  },
  {
    ref: "ISA Best Mgmt — Cabling",
    title: "Static Cable Spec",
    plain:
      "Static cables sized two-thirds of trunk diameter at the union, installed on co-dominant stems or weak attachments. Annual visual inspection, hardware replaced every 8 years.",
  },
];

const CREW = [
  { name: "Mateo R.", role: "ISA Certified Arborist · TRAQ", saddle: "Petzl Sequoia + Edelrid Tomcat", climbs: "1,840 ascents" },
  { name: "Hana K.", role: "Crew Lead · CTSP", saddle: "Notch SAKA + ZigZag", climbs: "1,210 ascents" },
  { name: "Devin O.", role: "Climber · A.A.S. Arboriculture", saddle: "Treemotion Evo + Rope-Runner Pro", climbs: "640 ascents" },
];

const FOOTER_FACTS = [
  { k: "ISA-certified", v: "MA-6118A · TRAQ #18221" },
  { k: "Insurance", v: "$2M GL · $5M umbrella · WC on file" },
  { k: "Storm line", v: "(978) 555-0190 · 24 hr after-hours" },
];

export default function CanopyLiftEngine() {
  const [scroll, setScroll] = useState(0);
  const [reveal, setReveal] = useState<Set<number>>(new Set());
  const climbRefs = useRef<(HTMLElement | null)[]>([]);

  useEffect(() => {
    const onScroll = () => setScroll(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          const idx = Number(e.target.getAttribute("data-climb-idx"));
          if (e.isIntersecting) {
            setReveal((prev) => {
              if (prev.has(idx)) return prev;
              const next = new Set(prev);
              next.add(idx);
              return next;
            });
          }
        });
      },
      { threshold: 0.2 }
    );
    climbRefs.current.forEach((el) => el && obs.observe(el));
    return () => obs.disconnect();
  }, []);

  // Parallax offsets
  const offset = (rate: number) => `translateY(${-(scroll * rate)}px)`;

  return (
    <>
      <style>{css}</style>
      <div className="cl-shell">
        <div className="cl-bark" aria-hidden />

        <div className="cl-hero" id="top">
          {/* Three parallax canopy layers */}
          <svg
            className="cl-canopy cl-canopy-back"
            viewBox="0 0 1600 600"
            preserveAspectRatio="none"
            aria-hidden
            style={{ transform: offset(0.08) }}
          >
            <path
              d="M0 380 C 80 240 160 220 240 280 S 360 220 440 260 S 600 200 720 250 S 880 200 980 270 S 1140 220 1240 260 S 1420 220 1600 280 L 1600 600 L 0 600 Z"
              fill="#3F4B33"
            />
          </svg>
          <svg
            className="cl-canopy cl-canopy-mid"
            viewBox="0 0 1600 600"
            preserveAspectRatio="none"
            aria-hidden
            style={{ transform: offset(0.18) }}
          >
            <path
              d="M0 460 C 100 340 220 320 320 380 S 460 320 580 360 S 760 320 880 380 S 1080 320 1200 380 S 1420 340 1600 380 L 1600 600 L 0 600 Z"
              fill="#2A331F"
            />
          </svg>
          <svg
            className="cl-canopy cl-canopy-front"
            viewBox="0 0 1600 600"
            preserveAspectRatio="none"
            aria-hidden
            style={{ transform: offset(0.32) }}
          >
            <path
              d="M0 540 C 140 460 300 440 440 480 S 660 440 820 480 S 1080 460 1240 480 S 1460 460 1600 500 L 1600 600 L 0 600 Z"
              fill="#181F12"
            />
          </svg>

          <div className="cl-light" aria-hidden style={{ transform: `translate(${scroll * 0.05}px, ${scroll * 0.04}px)` }} />

          <div className="cl-hero-content">
            <div className="cl-hero-tag">
              <svg className="cl-tag-icon" viewBox="0 0 24 24" aria-hidden>
                <circle cx="12" cy="12" r="10" stroke="#D8D2A6" strokeWidth="1.4" fill="none" />
                <path d="M12 2 L12 22 M2 12 L22 12" stroke="#D8D2A6" strokeWidth="1" />
              </svg>
              <span>ANSI Z133 PLAN ON EVERY CLIMB</span>
            </div>
            <h1 className="cl-hero-h1">
              Lift the canopy.<br />
              Crotch reductions.<br />
              <em>Drop zone signed and clear.</em>
            </h1>
            <p className="cl-hero-sub">
              Tree work for properties where the right tree, pruned right, is the
              design feature. ISA-certified climbers, ANSI A300 cuts only, written
              work plan filed for every ascent.
            </p>
            <div className="cl-cta-row">
              <a href="#climbs" className="cl-cta cl-cta-primary">
                CLIMB A PROPERTY
              </a>
              <a href="#climbs" className="cl-cta cl-cta-ghost">
                See the lift work →
              </a>
            </div>
          </div>

          <div className="cl-floor" aria-hidden />
        </div>

        <section id="climbs" className="cl-climbs">
          <header className="cl-section-head">
            <span className="cl-eyebrow">THE CLIMB · 2026 PROPERTIES</span>
            <h2 className="cl-h2">Recent canopy-lift work</h2>
            <p className="cl-section-sub">
              Each entry pulled from the climb log — tie-in point recorded, ground
              crew on the page, ANSI A300 cut spec filed before the saw fires.
            </p>
          </header>
          <div className="cl-climb-list">
            {CLIMBS.map((c, i) => (
              <article
                key={c.code}
                ref={(el) => {
                  climbRefs.current[i] = el;
                }}
                data-climb-idx={i}
                className={`cl-climb${reveal.has(i) ? " in" : ""}`}
                tabIndex={0}
                aria-label={`Climb ${c.code}: ${c.title}`}
              >
                <div className="cl-climb-num">{String(i + 1).padStart(2, "0")}</div>
                <div className="cl-climb-text">
                  <div className="cl-climb-meta">
                    <span className="cl-climb-code">{c.code}</span>
                    <span className="cl-climb-species">{c.species}</span>
                  </div>
                  <h3 className="cl-climb-title">{c.title}</h3>
                  <p className="cl-climb-body">{c.body}</p>
                </div>
                <div className="cl-tip" aria-hidden>
                  <span className="cl-tip-label">TIE-IN</span>
                  <svg className="cl-tip-icon" viewBox="0 0 64 64">
                    <circle cx="32" cy="20" r="11" fill="none" stroke="#D8D2A6" strokeWidth="2" />
                    <path d="M22 26 Q 32 38 42 26 M32 31 L32 56 M22 56 L42 56" stroke="#D8D2A6" strokeWidth="2" fill="none" />
                    <circle cx="32" cy="20" r="3" fill="#D8D2A6" />
                  </svg>
                  <span className="cl-tip-spec">{c.tip}</span>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="cl-standards">
          <header className="cl-section-head">
            <span className="cl-eyebrow">PRUNING STANDARDS · PLAIN LANGUAGE</span>
            <h2 className="cl-h2">What ANSI says, what we actually do</h2>
          </header>
          <div className="cl-std-grid">
            {STANDARDS.map((s) => (
              <article key={s.ref} className="cl-std">
                <div className="cl-std-ref">{s.ref}</div>
                <h3 className="cl-std-title">{s.title}</h3>
                <p className="cl-std-plain">{s.plain}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="cl-crew">
          <header className="cl-section-head">
            <span className="cl-eyebrow">THE CREW · BY SADDLE</span>
            <h2 className="cl-h2">Climbers introduced by their setup</h2>
            <p className="cl-section-sub">
              We let the gear speak. Saddle and primary friction system tell you
              more about an arborist than any headshot.
            </p>
          </header>
          <div className="cl-crew-grid">
            {CREW.map((p) => (
              <article key={p.name} className="cl-crew-card">
                <div className="cl-crew-name">{p.name}</div>
                <div className="cl-crew-role">{p.role}</div>
                <div className="cl-crew-saddle-label">SADDLE + FRICTION</div>
                <div className="cl-crew-saddle">{p.saddle}</div>
                <div className="cl-crew-climbs">{p.climbs}</div>
              </article>
            ))}
          </div>
        </section>

        <footer className="cl-footer">
          <svg className="cl-foot-stamp" viewBox="0 0 200 60" aria-hidden>
            <rect x="2" y="2" width="196" height="56" fill="none" stroke="#D8D2A6" strokeWidth="1.5" strokeDasharray="4 3" />
            <text x="100" y="26" textAnchor="middle" fontFamily="serif" fontSize="14" fill="#D8D2A6" letterSpacing="2">UNDERSTORY</text>
            <text x="100" y="44" textAnchor="middle" fontFamily="serif" fontStyle="italic" fontSize="11" fill="#A89B6A">arboricultural design · est. 2014</text>
          </svg>
          <div className="cl-foot-grid">
            {FOOTER_FACTS.map((f) => (
              <div key={f.k}>
                <div className="cl-foot-k">{f.k}</div>
                <div className="cl-foot-v">{f.v}</div>
              </div>
            ))}
          </div>
          <p className="cl-foot-disclaimer">
            Drop-zone disclaimer: every property is walked before the chainsaw clears
            the truck. We sign the zone, we move the lawn furniture, and we pick up
            every chip before we leave.
          </p>
        </footer>
      </div>
    </>
  );
}

const css = `
  @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,500;9..144,800&family=Inter:wght@400;500;600&display=swap');

  .cl-shell {
    --floor: #1F2A1B;
    --bark: #4A3424;
    --light: #D8D2A6;
    --moss: #6B7A4F;
    --cream: #E8E4CB;
    position: relative; min-height: 100vh; overflow: hidden;
    font-family: 'Inter', system-ui, sans-serif;
    background: var(--floor); color: var(--cream);
  }
  .cl-bark {
    position: fixed; inset: 0; z-index: 0; pointer-events: none; opacity: 0.18;
    background-image:
      repeating-linear-gradient(
        92deg,
        rgba(74,52,36,0.55) 0 1px,
        transparent 1px 7px,
        rgba(74,52,36,0.35) 7px 8px,
        transparent 8px 14px
      ),
      radial-gradient(circle at 20% 30%, rgba(216,210,166,0.05), transparent 60%);
  }

  .cl-hero {
    position: relative; min-height: 720px;
    background: linear-gradient(180deg, #6E7C4F 0%, #3F4B33 35%, #1F2A1B 100%);
    overflow: hidden;
  }
  .cl-canopy {
    position: absolute; left: 0; right: 0; top: 0;
    width: 100%; height: 600px;
    will-change: transform;
  }
  .cl-canopy-back { top: -20px; opacity: 0.95; }
  .cl-canopy-mid { top: 40px; }
  .cl-canopy-front { top: 80px; }
  .cl-light {
    position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(circle at 28% 22%, rgba(216,210,166,0.55) 0%, transparent 28%),
      radial-gradient(circle at 76% 14%, rgba(216,210,166,0.32) 0%, transparent 22%);
    mix-blend-mode: screen;
    will-change: transform;
  }
  .cl-floor {
    position: absolute; bottom: 0; left: 0; right: 0; height: 100px;
    background: linear-gradient(180deg, transparent, rgba(74,52,36,0.7), #2A1B0F);
    z-index: 4;
  }

  .cl-hero-content {
    position: relative; z-index: 5;
    max-width: 1180px; margin: 0 auto;
    padding: 140px 48px 200px;
  }
  .cl-hero-tag {
    display: inline-flex; align-items: center; gap: 12px;
    padding: 8px 14px;
    border: 1px solid rgba(216,210,166,0.4);
    border-radius: 999px;
    font-size: 11px; letter-spacing: 0.24em; color: var(--light);
    margin-bottom: 28px;
  }
  .cl-tag-icon { width: 16px; height: 16px; }
  .cl-hero-h1 {
    font-family: 'Fraunces', serif;
    font-weight: 800; font-size: clamp(48px, 7vw, 96px);
    line-height: 1; letter-spacing: -0.02em;
    margin: 0 0 28px;
    color: var(--cream);
    text-shadow: 0 4px 24px rgba(0,0,0,0.5);
  }
  .cl-hero-h1 em {
    font-style: italic; font-weight: 500;
    color: var(--light);
  }
  .cl-hero-sub {
    font-size: 19px; line-height: 1.65; max-width: 540px;
    color: rgba(232,228,203,0.92);
    margin: 0 0 36px;
  }
  .cl-cta-row { display: flex; gap: 16px; flex-wrap: wrap; }
  .cl-cta {
    display: inline-flex; align-items: center;
    padding: 14px 24px;
    text-decoration: none;
    font-family: 'Inter', sans-serif; font-weight: 600;
    letter-spacing: 0.18em; font-size: 13px;
    transition: transform 200ms ease, background 200ms ease, color 200ms ease;
  }
  .cl-cta-primary {
    background: var(--light); color: #1F2A1B;
  }
  .cl-cta-primary:hover, .cl-cta-primary:focus-visible {
    background: var(--cream); transform: translateY(-2px);
    outline: none;
  }
  .cl-cta-ghost {
    color: var(--cream); border: 1px solid rgba(216,210,166,0.5);
  }
  .cl-cta-ghost:hover, .cl-cta-ghost:focus-visible {
    background: rgba(216,210,166,0.12); border-color: var(--light);
    transform: translateY(-2px);
    outline: none;
  }

  .cl-section-head {
    max-width: 1180px; margin: 0 auto 40px;
    padding: 0 48px;
  }
  .cl-eyebrow {
    font-family: 'Inter', sans-serif; font-weight: 600;
    font-size: 11px; letter-spacing: 0.32em;
    color: var(--light); display: block; margin-bottom: 16px;
  }
  .cl-h2 {
    font-family: 'Fraunces', serif; font-weight: 800;
    font-size: clamp(32px, 5vw, 56px); letter-spacing: -0.01em;
    line-height: 1.05; margin: 0 0 18px; color: var(--cream);
  }
  .cl-section-sub {
    font-size: 17px; line-height: 1.6; max-width: 580px;
    color: rgba(232,228,203,0.78); margin: 0;
  }

  .cl-climbs { padding: 100px 0; position: relative; z-index: 5; background: var(--floor); }
  .cl-climb-list { max-width: 1180px; margin: 0 auto; padding: 0 48px; }
  .cl-climb {
    position: relative;
    display: grid; grid-template-columns: 80px 1fr 160px;
    gap: 32px; align-items: center;
    padding: 36px 0;
    border-bottom: 1px solid rgba(216,210,166,0.18);
    opacity: 0; transform: translateY(20px);
    transition: opacity 700ms ease, transform 700ms ease, background 220ms ease;
    outline: none;
  }
  .cl-climb.in { opacity: 1; transform: translateY(0); }
  .cl-climb:hover, .cl-climb:focus-visible {
    background: rgba(216,210,166,0.05);
  }
  .cl-climb:hover .cl-tip-icon,
  .cl-climb:focus-visible .cl-tip-icon {
    transform: scale(1.05) rotate(-4deg);
  }
  .cl-climb-num {
    font-family: 'Fraunces', serif; font-style: italic;
    font-size: 56px; line-height: 1;
    color: var(--moss);
    font-weight: 500;
  }
  .cl-climb-text { max-width: 64ch; }
  .cl-climb-meta {
    display: flex; gap: 18px; align-items: baseline;
    margin-bottom: 10px;
  }
  .cl-climb-code {
    font-family: 'Inter', sans-serif; font-weight: 600;
    font-size: 11px; letter-spacing: 0.24em; color: var(--light);
    border: 1px solid rgba(216,210,166,0.4);
    padding: 3px 8px;
  }
  .cl-climb-species {
    font-family: 'Fraunces', serif; font-style: italic;
    font-size: 14px; color: rgba(232,228,203,0.7);
  }
  .cl-climb-title {
    font-family: 'Fraunces', serif; font-weight: 500;
    font-size: 26px; line-height: 1.2; margin: 0 0 12px;
    color: var(--cream);
  }
  .cl-climb-body {
    font-size: 15px; line-height: 1.65;
    color: rgba(232,228,203,0.78); margin: 0;
  }
  .cl-tip {
    display: flex; flex-direction: column; align-items: center; gap: 6px;
    color: var(--light);
    opacity: 0;
    transition: opacity 220ms ease;
  }
  .cl-climb:hover .cl-tip,
  .cl-climb:focus-visible .cl-tip { opacity: 1; }
  .cl-tip-label {
    font-family: 'Inter', sans-serif; font-size: 10px;
    letter-spacing: 0.32em; color: rgba(216,210,166,0.7);
  }
  .cl-tip-icon {
    width: 64px; height: 64px;
    transition: transform 220ms ease;
  }
  .cl-tip-spec {
    font-family: 'Fraunces', serif; font-style: italic; font-size: 13px;
  }

  .cl-standards { padding: 100px 0; background: linear-gradient(180deg, #1F2A1B, #28341F 60%, #1F2A1B); position: relative; z-index: 5; }
  .cl-std-grid {
    max-width: 1180px; margin: 0 auto;
    padding: 0 48px;
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 28px;
  }
  .cl-std {
    background: rgba(216,210,166,0.04);
    border: 1px solid rgba(216,210,166,0.18);
    padding: 28px 26px;
    transition: border-color 200ms ease, transform 200ms ease;
  }
  .cl-std:hover, .cl-std:focus-within {
    border-color: var(--light); transform: translateY(-3px);
  }
  .cl-std-ref {
    font-family: 'Inter', sans-serif; font-weight: 600;
    font-size: 11px; letter-spacing: 0.24em; color: var(--light);
    margin-bottom: 16px;
  }
  .cl-std-title {
    font-family: 'Fraunces', serif; font-weight: 800; font-size: 22px;
    margin: 0 0 14px; color: var(--cream);
  }
  .cl-std-plain {
    font-size: 15px; line-height: 1.65;
    color: rgba(232,228,203,0.82); margin: 0;
  }

  .cl-crew { padding: 100px 0; position: relative; z-index: 5; }
  .cl-crew-grid {
    max-width: 1180px; margin: 0 auto;
    padding: 0 48px;
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 24px;
  }
  .cl-crew-card {
    background: linear-gradient(180deg, rgba(216,210,166,0.06), rgba(216,210,166,0.02));
    border-left: 3px solid var(--moss);
    padding: 26px 24px;
    transition: border-color 200ms ease, transform 200ms ease;
  }
  .cl-crew-card:hover, .cl-crew-card:focus-within {
    border-left-color: var(--light); transform: translateX(4px);
  }
  .cl-crew-name {
    font-family: 'Fraunces', serif; font-weight: 800; font-size: 24px;
    color: var(--cream); margin-bottom: 4px;
  }
  .cl-crew-role {
    font-size: 13px; color: var(--light); letter-spacing: 0.06em;
    margin-bottom: 18px;
  }
  .cl-crew-saddle-label {
    font-family: 'Inter', sans-serif; font-size: 10px; letter-spacing: 0.32em;
    color: rgba(216,210,166,0.6); margin-bottom: 4px;
  }
  .cl-crew-saddle {
    font-family: 'Fraunces', serif; font-style: italic; font-size: 16px;
    color: rgba(232,228,203,0.92); margin-bottom: 16px; line-height: 1.4;
  }
  .cl-crew-climbs {
    font-size: 13px; letter-spacing: 0.06em; color: var(--moss);
    border-top: 1px dashed rgba(216,210,166,0.18); padding-top: 12px;
  }

  .cl-footer {
    padding: 80px 48px 48px;
    background: linear-gradient(180deg, #1F2A1B, #14190F);
    border-top: 1px solid rgba(216,210,166,0.18);
    position: relative; z-index: 5;
  }
  .cl-foot-stamp {
    width: 200px; height: 60px; display: block;
    margin: 0 auto 32px;
  }
  .cl-foot-grid {
    max-width: 1080px; margin: 0 auto 32px;
    display: grid; grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 28px; text-align: center;
  }
  .cl-foot-k {
    font-size: 11px; letter-spacing: 0.28em; color: var(--light);
    margin-bottom: 6px;
  }
  .cl-foot-v {
    font-family: 'Fraunces', serif; font-style: italic; font-size: 16px;
    color: rgba(232,228,203,0.9);
  }
  .cl-foot-disclaimer {
    max-width: 720px; margin: 0 auto;
    text-align: center; font-size: 13px; line-height: 1.65;
    color: rgba(216,210,166,0.55);
  }

  @media (max-width: 880px) {
    .cl-climb { grid-template-columns: 60px 1fr; gap: 18px; }
    .cl-tip { display: none; }
    .cl-std-grid, .cl-crew-grid, .cl-foot-grid { grid-template-columns: 1fr; }
    .cl-hero-content { padding: 80px 24px 140px; }
    .cl-section-head, .cl-climb-list, .cl-std-grid, .cl-crew-grid { padding-left: 24px; padding-right: 24px; }
  }

  @media (prefers-reduced-motion: reduce) {
    .cl-canopy, .cl-light { transform: none !important; }
    .cl-climb { opacity: 1; transform: none; transition: none; }
    .cl-climb:hover, .cl-climb:focus-visible { background: rgba(216,210,166,0.05); }
    .cl-tip { opacity: 1; }
    .cl-cta:hover, .cl-cta:focus-visible { transform: none; }
    .cl-std:hover, .cl-crew-card:hover { transform: none; }
  }
`;
