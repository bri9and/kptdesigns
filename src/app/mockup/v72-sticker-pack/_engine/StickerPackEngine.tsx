"use client";

/**
 * StickerPackEngine — V72 Sticker Pack
 *
 * Hard-hat sticker layering as visual language. Stickers fan out
 * across the hero. Hover peels a corner. Click "claims" the sticker
 * (toggles a selected state with a subtle glow). Reduced-motion
 * presents a flat grid.
 *
 * Trade showcase: union-shop electricians (commercial / industrial,
 * IBEW Local 26 in the field since '99).
 */

import { useState } from "react";

type Sticker = {
  key: string;
  type: "service" | "credential" | "brand" | "flag";
  shape: "round" | "shield" | "rect" | "hex" | "octagon";
  // Layout & rotation per sticker.
  x: number; y: number; rot: number; z: number;
  // Visuals.
  bg: string;
  fg: string;
  border?: string;
  // Content.
  top?: string;
  big: string;
  bottom?: string;
  desc?: string; // for credential/info
  meta?: string;
};

const STICKERS: Sticker[] = [
  {
    key: "ibew",
    type: "credential",
    shape: "round",
    x: 24, y: 26, rot: -8, z: 6,
    bg: "#003B71", fg: "#F1EEE5", border: "#FFD432",
    top: "I.B.E.W.",
    big: "26",
    bottom: "LOCAL · ESTABLISHED",
    desc: "Brotherhood of Electrical Workers, Local 26. Every journeyman in the shop carries the card.",
  },
  {
    key: "panel-up",
    type: "service",
    shape: "rect",
    x: 60, y: 14, rot: 6, z: 5,
    bg: "#D52B1E", fg: "#F1EEE5",
    top: "WE DO",
    big: "PANEL UP",
    bottom: "service · gear · 480V",
    desc: "Switchgear up through 480V three-phase. Service entrance to MCC. We've stood the gear in 220 buildings.",
  },
  {
    key: "klein",
    type: "brand",
    shape: "shield",
    x: 8, y: 56, rot: -14, z: 4,
    bg: "#FFD432", fg: "#0A0E1A",
    top: "KLEIN TOOLS",
    big: "USA",
    bottom: "MADE IN ROCKFORD",
    desc: "Side-cutters in every belt. The yellow-and-red dipped grip is the union electrician's pen.",
  },
  {
    key: "pull-box",
    type: "service",
    shape: "octagon",
    x: 78, y: 42, rot: -4, z: 5,
    bg: "#0A0E1A", fg: "#FFD432",
    top: "WE PULL",
    big: "PULL BOXES",
    bottom: "12 pulls per shift",
    desc: "Greenlee 555 in the truck, fish-tape on every belt. We pull where the others sub it out.",
  },
  {
    key: "milwaukee",
    type: "brand",
    shape: "rect",
    x: 38, y: 64, rot: 9, z: 4,
    bg: "#D52B1E", fg: "#F1EEE5",
    top: "MILWAUKEE",
    big: "M18",
    bottom: "FUEL · PACKOUT · M-TRACK",
    desc: "Five M18 batteries on the charger by 6am. Packout stack stays in the truck.",
  },
  {
    key: "osha",
    type: "credential",
    shape: "hex",
    x: 54, y: 74, rot: -11, z: 4,
    bg: "#0A0E1A", fg: "#FFD432", border: "#FFD432",
    top: "OSHA-30",
    big: "30",
    bottom: "CONSTRUCTION CERT",
    desc: "Every hand on the job carries OSHA-30 construction. Foremen carry OSHA-510.",
  },
  {
    key: "flag",
    type: "flag",
    shape: "rect",
    x: 84, y: 8, rot: 12, z: 3,
    bg: "linear-gradient(180deg, #BB1133 0%, #BB1133 33%, #F1EEE5 33%, #F1EEE5 66%, #003B71 66%, #003B71 100%)",
    fg: "#F1EEE5",
    big: " ",
    desc: "Standard-issue.",
  },
  {
    key: "afci",
    type: "service",
    shape: "round",
    x: 16, y: 80, rot: 6, z: 3,
    bg: "#F1EEE5", fg: "#0A0E1A", border: "#0A0E1A",
    top: "WE WIRE",
    big: "AFCI / GFCI",
    bottom: "to NEC 2023",
    desc: "Branch circuit protection per NEC 210.8 / 210.12. We don't argue with inspectors; we read the code.",
  },
  {
    key: "gear-room",
    type: "service",
    shape: "rect",
    x: 70, y: 60, rot: 4, z: 3,
    bg: "#0A0E1A", fg: "#F1EEE5",
    top: "WE BUILD",
    big: "GEAR ROOMS",
    bottom: "60Hz hum, on the level",
    desc: "From the utility cutover to the busway. We hang it level; we label it twice; we date the directory.",
  },
];

const CRED_BLOCKS = [
  {
    title: "IBEW Local 26",
    sub: "Affiliated journeymen",
    body:
      "Every wireman on a crew is a card-carrying member, dispatched out of the hall. We don't run double-breasted shops. The hall sets the wage; we set the standard.",
    foot: "11 active journeymen · 4 apprentices in dispatch",
  },
  {
    title: "Union Standards",
    sub: "Code &amp; craft floor",
    body:
      "We follow NECA neutral standard installation practices. We pull NEC-compliant on every job, and we keep a copy of the most recent code book in every truck.",
    foot: "NECA member · NETA Level III techs available",
  },
  {
    title: "Insurance &amp; Bonding",
    sub: "Carried, not borrowed",
    body:
      "Two million general liability. EMR 0.84. Bonded to four million on a single project, twelve aggregate. Certs available before the contract is signed.",
    foot: "EMR 0.84 · MA HIC #B-6622-A",
  },
];

const HARD_HATS = [
  { name: "MIKE B.", role: "Foreman, gear room", years: "since '99", stickers: ["IBEW 26", "Klein", "OSHA-30", "American flag", "Local hockey"] },
  { name: "KENJI O.", role: "Journeyman, panel work", years: "since '04", stickers: ["IBEW 26", "Milwaukee", "OSHA-30", "NECA", "Marathon 2018"] },
  { name: "ALICIA R.", role: "Journeywoman, lighting", years: "since '11", stickers: ["IBEW 26", "USA flag", "Klein", "Lutron-cert", "Boston FD-aux"] },
  { name: "DEREK W.", role: "Apprentice, year 4", years: "since '22", stickers: ["IBEW 26 (apprentice)", "OSHA-10", "Milwaukee", "Marine vet"] },
];

export default function StickerPackEngine() {
  const [claimed, setClaimed] = useState<Set<string>>(new Set());
  const [hover, setHover] = useState<string | null>(null);

  const toggle = (key: string) => {
    setClaimed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <>
      <style>{css}</style>
      <div className="sp-shell">
        <div className="sp-bg-grid" aria-hidden />
        <div className="sp-bg-flecks" aria-hidden />

        {/* TOP NAV */}
        <header className="sp-top">
          <div className="sp-brand">
            <div className="sp-brand-bolt" aria-hidden>
              <span /><span />
            </div>
            <div className="sp-brand-stack">
              <span className="sp-brand-name">CONLAN ELECTRIC, INC.</span>
              <span className="sp-brand-meta">UNION SHOP &middot; IBEW LOCAL 26 &middot; SINCE '99</span>
            </div>
          </div>
          <nav className="sp-nav">
            <a href="#stack" className="sp-link">The stack</a>
            <a href="#local" className="sp-link">The local</a>
            <a href="#wall" className="sp-link">Hard-hat wall</a>
            <a href="#contact" className="sp-link sp-link-cta">Call dispatch</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="sp-hero">
          <div className="sp-hero-text">
            <div className="sp-eyebrow">UNION-SHOP COMMERCIAL &amp; INDUSTRIAL ELECTRIC</div>
            <h1 className="sp-headline">
              <span>Pull box.</span>
              <span>Pigtail.</span>
              <span>Panel up.</span>
              <span className="sp-headline-em">Local 26 in the field since &rsquo;99.</span>
            </h1>
            <p className="sp-sub">
              Twenty-seven years dispatched out of the hall, three Greenlee 555s in the
              truck rotation, eight journeymen on the active roster. Industrial gear
              rooms, multifamily roughs, hospital MOPs. We pull where the rest sub it.
            </p>
            <div className="sp-cta-row">
              <a href="#contact" className="sp-cta sp-cta-primary">Call dispatch</a>
              <a href="#stack" className="sp-cta sp-cta-ghost">Claim a sticker</a>
            </div>
          </div>

          {/* HARD HAT SHELL */}
          <div className="sp-hardhat" aria-label="Hard hat with sticker stack">
            <div className="sp-hardhat-shell">
              <div className="sp-hardhat-brim" aria-hidden />
              <div className="sp-hardhat-suspension" aria-hidden>
                <span /><span /><span /><span />
              </div>

              {STICKERS.map((s) => {
                const isClaimed = claimed.has(s.key);
                const isHover = hover === s.key;
                return (
                  <button
                    type="button"
                    key={s.key}
                    className={[
                      "sp-sticker",
                      `sp-sticker-${s.shape}`,
                      `sp-sticker-${s.type}`,
                      isClaimed ? "sp-sticker-claimed" : "",
                      isHover ? "sp-sticker-hover" : "",
                    ].filter(Boolean).join(" ")}
                    style={{
                      ["--x" as string]: `${s.x}%`,
                      ["--y" as string]: `${s.y}%`,
                      ["--r" as string]: `${s.rot}deg`,
                      ["--z" as string]: s.z,
                      ["--bg" as string]: s.bg,
                      ["--fg" as string]: s.fg,
                      ["--bd" as string]: s.border ?? "transparent",
                    }}
                    onMouseEnter={() => setHover(s.key)}
                    onMouseLeave={() => setHover((h) => (h === s.key ? null : h))}
                    onFocus={() => setHover(s.key)}
                    onBlur={() => setHover((h) => (h === s.key ? null : h))}
                    onClick={() => toggle(s.key)}
                    aria-pressed={isClaimed}
                    aria-label={`${s.big.trim() || s.key} sticker — ${isClaimed ? "claimed" : "click to claim"}`}
                  >
                    <span className="sp-sticker-corner" aria-hidden />
                    <span className="sp-sticker-inner">
                      {s.top && <span className="sp-sticker-top">{s.top}</span>}
                      <span className="sp-sticker-big">{s.big}</span>
                      {s.bottom && <span className="sp-sticker-bottom">{s.bottom}</span>}
                    </span>
                    {isClaimed && <span className="sp-sticker-claim-tag" aria-hidden>CLAIMED</span>}
                  </button>
                );
              })}
            </div>

            <div className="sp-hardhat-caption">
              {claimed.size > 0
                ? `Claimed: ${claimed.size} sticker${claimed.size === 1 ? "" : "s"} — we'll add 'em to the bid sheet.`
                : "Hover a sticker to peel a corner. Click to claim it for your bid."}
            </div>
          </div>
        </section>

        {/* THE STACK — DETAILED LIST */}
        <section id="stack" className="sp-section">
          <header className="sp-section-head">
            <div className="sp-section-tag">THE STACK / 09 STICKERS</div>
            <h2 className="sp-section-title">Each sticker is a service or a credential.</h2>
            <p className="sp-section-lead">
              Same nine on the lid. Click any one above to claim it for your scope.
              Below: the receipt &mdash; what the sticker actually means on a job.
            </p>
          </header>

          <ul className="sp-stack-list">
            {STICKERS.filter((s) => s.desc).map((s) => {
              const isClaimed = claimed.has(s.key);
              return (
                <li
                  key={s.key}
                  className={`sp-stack-item${isClaimed ? " sp-stack-claimed" : ""}`}
                  tabIndex={0}
                  onMouseEnter={() => setHover(s.key)}
                  onMouseLeave={() => setHover((h) => (h === s.key ? null : h))}
                  onFocus={() => setHover(s.key)}
                  onBlur={() => setHover((h) => (h === s.key ? null : h))}
                >
                  <div className="sp-stack-chip" style={{ background: s.bg, color: s.fg, border: `1.5px solid ${s.border ?? "transparent"}` }}>
                    {s.big}
                  </div>
                  <div className="sp-stack-body">
                    <div className="sp-stack-meta">
                      <span className="sp-stack-type">{s.type.toUpperCase()}</span>
                      <span className="sp-stack-key">{s.top ?? s.bottom ?? ""}</span>
                    </div>
                    <p className="sp-stack-desc">{s.desc}</p>
                  </div>
                  <button
                    type="button"
                    className="sp-stack-claim"
                    onClick={() => toggle(s.key)}
                    aria-pressed={isClaimed}
                  >
                    {isClaimed ? "Unclaim" : "Claim"}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>

        {/* THE LOCAL */}
        <section id="local" className="sp-section sp-section-local">
          <header className="sp-section-head sp-section-head-light">
            <div className="sp-section-tag sp-section-tag-light">THE LOCAL / IBEW 26</div>
            <h2 className="sp-section-title sp-section-title-light">
              Dispatched out of the hall.
            </h2>
            <p className="sp-section-lead sp-section-lead-light">
              We are a union shop. The hall sets the wage; we set the standard. Every
              hand on a job is a journeyman or a registered apprentice in good standing.
            </p>
          </header>

          <div className="sp-creds">
            {CRED_BLOCKS.map((c) => (
              <article key={c.title} className="sp-cred" tabIndex={0}>
                <div className="sp-cred-marker" aria-hidden>
                  <span />
                  <span />
                </div>
                <header className="sp-cred-head">
                  <h3
                    className="sp-cred-title"
                    dangerouslySetInnerHTML={{ __html: c.title }}
                  />
                  <div
                    className="sp-cred-sub"
                    dangerouslySetInnerHTML={{ __html: c.sub }}
                  />
                </header>
                <p className="sp-cred-body">{c.body}</p>
                <footer className="sp-cred-foot">{c.foot}</footer>
              </article>
            ))}
          </div>
        </section>

        {/* HARD HAT WALL */}
        <section id="wall" className="sp-section sp-section-wall">
          <header className="sp-section-head">
            <div className="sp-section-tag">THE HARD-HAT WALL / 04 HANDS</div>
            <h2 className="sp-section-title">The crew, by the lids.</h2>
            <p className="sp-section-lead">
              You hire us, you hire these people. The lids tell their work history
              before they open their mouths. Each card lists the actual stickers
              on the actual hat.
            </p>
          </header>

          <div className="sp-wall">
            {HARD_HATS.map((h, i) => (
              <article key={h.name} className="sp-lid" tabIndex={0} style={{ ["--li" as string]: i }}>
                <div className="sp-lid-shell" aria-hidden>
                  <div className="sp-lid-dome" />
                  <div className="sp-lid-brim" />
                  <span className="sp-lid-sticker sp-lid-sticker-1" />
                  <span className="sp-lid-sticker sp-lid-sticker-2" />
                  <span className="sp-lid-sticker sp-lid-sticker-3" />
                  <span className="sp-lid-sticker sp-lid-sticker-4" />
                </div>
                <div className="sp-lid-body">
                  <div className="sp-lid-name">{h.name}</div>
                  <div className="sp-lid-role">{h.role} <span>· {h.years}</span></div>
                  <ul className="sp-lid-stickers">
                    {h.stickers.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="sp-section sp-section-contact">
          <div className="sp-contact">
            <div className="sp-contact-stripe" aria-hidden />
            <div className="sp-contact-body">
              <div className="sp-section-tag">DISPATCH &middot; CONLAN ELECTRIC</div>
              <h2 className="sp-contact-title">
                Call the hall.
                <br />
                <span>We&rsquo;ll roll a truck.</span>
              </h2>
              <p className="sp-contact-text">
                Commercial &amp; industrial only &mdash; no residential service work. Bonded
                jobs, prevailing-wage jobs, and union signatory generals welcome.
                Estimating returns in five business days.
              </p>
              <div className="sp-contact-row">
                <a href="tel:5552267822" className="sp-contact-phone">
                  555 . 226 . 7822
                </a>
                <span className="sp-contact-sep" aria-hidden />
                <a href="mailto:bid@conlan.example" className="sp-contact-mail">
                  bid@conlan.example
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="sp-footer">
          <div className="sp-footer-row">
            <span className="sp-footer-stub">IBEW LOCAL 26</span>
            <span className="sp-footer-stub">NECA SIGNATORY</span>
            <span className="sp-footer-stub">EMR 0.84 · OSHA-30</span>
            <span className="sp-footer-stub">MA HIC #B-6622-A</span>
          </div>
          <p className="sp-footer-credit">
            Stuck on the lid in the gear-room shack, 60Hz hum, three batteries on the
            charger. &copy; 2026 Conlan Electric, Inc.
          </p>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@500;600;700&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

.sp-shell {
  position: relative;
  min-height: 100vh;
  background: #F1EEE5;
  color: #0A0E1A;
  font-family: 'Inter', system-ui, sans-serif;
  padding: 28px 28px 56px;
  isolation: isolate;
  overflow: hidden;
}

.sp-bg-grid {
  position: fixed;
  inset: 0;
  background-image:
    linear-gradient(rgba(10, 14, 26, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(10, 14, 26, 0.05) 1px, transparent 1px);
  background-size: 32px 32px;
  z-index: -2;
  pointer-events: none;
  mask-image: radial-gradient(ellipse 80% 70% at 50% 30%, black 50%, transparent 100%);
}
.sp-bg-flecks {
  position: fixed;
  inset: 0;
  background-image:
    radial-gradient(0.6px 0.6px at 12% 22%, rgba(10,14,26,0.4), transparent),
    radial-gradient(0.5px 0.5px at 86% 18%, rgba(213,43,30,0.3), transparent),
    radial-gradient(0.6px 0.6px at 38% 64%, rgba(10,14,26,0.4), transparent),
    radial-gradient(0.5px 0.5px at 70% 82%, rgba(0,59,113,0.3), transparent),
    radial-gradient(0.6px 0.6px at 92% 92%, rgba(10,14,26,0.3), transparent);
  z-index: -2;
  pointer-events: none;
}

/* TOP NAV */
.sp-top {
  position: relative;
  z-index: 4;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 14px 18px;
  border: 2px solid #0A0E1A;
  background: #FFFAEC;
  margin-bottom: 32px;
  flex-wrap: wrap;
  gap: 16px;
  box-shadow: 4px 4px 0 #0A0E1A;
}
.sp-brand { display: flex; align-items: center; gap: 14px; }
.sp-brand-bolt {
  position: relative;
  width: 32px; height: 32px;
  background: #FFD432;
  border: 2px solid #0A0E1A;
  display: grid;
  place-items: center;
}
.sp-brand-bolt span {
  position: absolute;
  width: 4px;
  height: 22px;
  background: #0A0E1A;
}
.sp-brand-bolt span:nth-child(1) { transform: rotate(20deg) translate(2px, 0); }
.sp-brand-bolt span:nth-child(2) { transform: rotate(-20deg) translate(-2px, 0); }
.sp-brand-stack { display: flex; flex-direction: column; line-height: 1.05; }
.sp-brand-name {
  font-family: 'Oswald', 'Inter', sans-serif;
  font-weight: 700;
  font-size: 18px;
  letter-spacing: 0.04em;
  color: #0A0E1A;
}
.sp-brand-meta {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  color: rgba(10, 14, 26, 0.7);
  margin-top: 4px;
}
.sp-nav { display: flex; gap: 22px; align-items: center; flex-wrap: wrap; }
.sp-link {
  font-family: 'Oswald', 'Inter', sans-serif;
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 0.14em;
  text-transform: uppercase;
  text-decoration: none;
  color: #0A0E1A;
  padding: 4px 2px;
  position: relative;
  transition: color 200ms ease;
}
.sp-link::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -3px;
  height: 3px;
  background: #FFD432;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms cubic-bezier(0.7, 0, 0.3, 1);
}
.sp-link:hover, .sp-link:focus-visible {
  outline: none;
  color: #D52B1E;
}
.sp-link:hover::after, .sp-link:focus-visible::after { transform: scaleX(1); }
.sp-link-cta {
  background: #D52B1E;
  color: #F1EEE5;
  padding: 8px 14px;
  border: 2px solid #0A0E1A;
  font-weight: 700;
  box-shadow: 3px 3px 0 #0A0E1A;
}
.sp-link-cta::after { display: none; }
.sp-link-cta:hover, .sp-link-cta:focus-visible {
  background: #FFD432;
  color: #0A0E1A;
  transform: translate(-2px, -2px);
  box-shadow: 5px 5px 0 #0A0E1A;
}
@media (prefers-reduced-motion: reduce) {
  .sp-link::after { transition: none; }
  .sp-link-cta { transition: none; }
}

/* HERO */
.sp-hero {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 48px;
  padding: 32px 12px 80px;
  align-items: center;
}
.sp-hero-text { max-width: 600px; }
.sp-eyebrow {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  color: #003B71;
  background: #FFD432;
  padding: 6px 12px;
  border: 2px solid #0A0E1A;
  margin-bottom: 28px;
  font-weight: 700;
  box-shadow: 3px 3px 0 #0A0E1A;
}
.sp-headline {
  font-family: 'Oswald', 'Inter', sans-serif;
  font-weight: 700;
  font-size: clamp(48px, 7vw, 92px);
  line-height: 0.95;
  letter-spacing: -0.005em;
  margin: 0 0 28px;
  color: #0A0E1A;
  display: flex;
  flex-direction: column;
  text-transform: uppercase;
}
.sp-headline span { display: block; }
.sp-headline-em {
  font-family: 'Oswald', sans-serif;
  font-style: italic;
  font-weight: 600;
  font-size: 0.6em;
  text-transform: none;
  color: #D52B1E;
  margin-top: 14px;
  letter-spacing: 0.005em;
}
.sp-sub {
  font-family: 'Inter', sans-serif;
  font-size: 17px;
  line-height: 1.6;
  color: rgba(10, 14, 26, 0.85);
  margin: 0 0 32px;
  max-width: 540px;
}
.sp-cta-row { display: flex; gap: 14px; flex-wrap: wrap; }
.sp-cta {
  font-family: 'Oswald', 'Inter', sans-serif;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 14px 28px;
  border: 2.5px solid #0A0E1A;
  display: inline-block;
  transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease;
}
.sp-cta-primary {
  background: #D52B1E;
  color: #F1EEE5;
  box-shadow: 5px 5px 0 #0A0E1A;
}
.sp-cta-primary:hover, .sp-cta-primary:focus-visible {
  outline: none;
  background: #FFD432;
  color: #0A0E1A;
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 #0A0E1A;
}
.sp-cta-ghost {
  background: #F1EEE5;
  color: #0A0E1A;
  box-shadow: 5px 5px 0 #0A0E1A;
}
.sp-cta-ghost:hover, .sp-cta-ghost:focus-visible {
  outline: none;
  background: #003B71;
  color: #F1EEE5;
  transform: translate(-2px, -2px);
  box-shadow: 7px 7px 0 #0A0E1A;
}
@media (prefers-reduced-motion: reduce) {
  .sp-cta { transition: background 220ms ease; }
  .sp-cta:hover, .sp-cta:focus-visible { transform: none; box-shadow: 5px 5px 0 #0A0E1A; }
}

/* HARD HAT */
.sp-hardhat {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.sp-hardhat-shell {
  position: relative;
  width: 100%;
  max-width: 520px;
  height: 460px;
  margin: 0 auto;
  background:
    radial-gradient(ellipse 90% 65% at 50% 70%, #FFD432 0%, #E0AC18 60%, #B5870C 100%);
  border-radius: 50% 50% 18% 18% / 60% 60% 18% 18%;
  border: 3px solid #0A0E1A;
  box-shadow:
    8px 8px 0 #0A0E1A,
    inset 0 -20px 30px rgba(0,0,0,0.18),
    inset 0 20px 30px rgba(255,255,255,0.18);
  overflow: visible;
}
.sp-hardhat-brim {
  position: absolute;
  bottom: -16px;
  left: -8%;
  right: -8%;
  height: 36px;
  background: linear-gradient(180deg, #FFD432 0%, #B5870C 60%, #8a6608 100%);
  border-radius: 50%;
  border: 3px solid #0A0E1A;
  z-index: 1;
}
.sp-hardhat-suspension {
  position: absolute;
  inset: 12% 12% 16% 12%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  pointer-events: none;
  opacity: 0.18;
}
.sp-hardhat-suspension span {
  border: 1px dashed rgba(10, 14, 26, 0.6);
}

.sp-sticker {
  position: absolute;
  top: var(--y);
  left: var(--x);
  z-index: var(--z);
  transform: translate(-50%, -50%) rotate(var(--r));
  background: var(--bg);
  color: var(--fg);
  border: 2px solid var(--bd);
  appearance: none;
  font-family: 'Oswald', 'Inter', sans-serif;
  cursor: pointer;
  outline: none;
  padding: 0;
  box-shadow:
    0 4px 0 rgba(0, 0, 0, 0.32),
    0 6px 14px rgba(0, 0, 0, 0.22);
  transition:
    transform 320ms cubic-bezier(0.34, 1.36, 0.5, 1),
    box-shadow 280ms ease,
    z-index 0ms 280ms;
}
.sp-sticker:hover, .sp-sticker:focus-visible, .sp-sticker-hover {
  transform: translate(-50%, -56%) rotate(calc(var(--r) - 4deg)) scale(1.06);
  z-index: 9;
  transition-delay: 0ms;
  box-shadow:
    0 8px 0 rgba(0, 0, 0, 0.32),
    0 14px 28px rgba(0, 0, 0, 0.32);
}

.sp-sticker-inner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  text-align: center;
  padding: 8px 10px;
  pointer-events: none;
}
.sp-sticker-top, .sp-sticker-bottom {
  font-family: 'JetBrains Mono', monospace;
  font-size: 9px;
  letter-spacing: 0.14em;
  font-weight: 700;
  line-height: 1.1;
  text-transform: uppercase;
}
.sp-sticker-big {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: clamp(18px, 1.6vw, 24px);
  letter-spacing: 0.02em;
  margin: 4px 0;
  line-height: 0.96;
  text-transform: uppercase;
  white-space: nowrap;
}

/* shapes */
.sp-sticker-round { width: 110px; height: 110px; border-radius: 50%; }
.sp-sticker-rect { width: 130px; height: 80px; border-radius: 6px; }
.sp-sticker-shield { width: 110px; height: 124px; border-radius: 50% 50% 8px 8px / 36% 36% 8px 8px; }
.sp-sticker-octagon { width: 110px; height: 110px; clip-path: polygon(30% 0, 70% 0, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0 70%, 0 30%); }
.sp-sticker-hex { width: 110px; height: 100px; clip-path: polygon(25% 0, 75% 0, 100% 50%, 75% 100%, 25% 100%, 0 50%); }

/* peel corner */
.sp-sticker-corner {
  position: absolute;
  bottom: -1px;
  right: -1px;
  width: 0;
  height: 0;
  border-left: 18px solid transparent;
  border-bottom: 18px solid rgba(255,255,255,0.4);
  filter: drop-shadow(-1px -1px 1px rgba(0,0,0,0.25));
  opacity: 0;
  transform: translate(8px, 8px) rotate(-2deg);
  transition: opacity 260ms ease, transform 320ms ease;
  pointer-events: none;
}
.sp-sticker:hover .sp-sticker-corner,
.sp-sticker:focus-visible .sp-sticker-corner,
.sp-sticker-hover .sp-sticker-corner {
  opacity: 1;
  transform: translate(0, 0) rotate(-12deg);
}

.sp-sticker-octagon .sp-sticker-corner,
.sp-sticker-hex .sp-sticker-corner { display: none; }

.sp-sticker-claimed {
  filter: drop-shadow(0 0 0 #FFD432) drop-shadow(0 0 8px rgba(255, 212, 50, 0.7));
  outline: 3px solid #FFD432;
  outline-offset: 2px;
}
.sp-sticker-claim-tag {
  position: absolute;
  top: -10px; right: -10px;
  background: #0A0E1A;
  color: #FFD432;
  font-family: 'Oswald', sans-serif;
  font-size: 10px;
  letter-spacing: 0.12em;
  padding: 3px 8px;
  border: 2px solid #FFD432;
  font-weight: 700;
  pointer-events: none;
  z-index: 2;
}

@media (prefers-reduced-motion: reduce) {
  .sp-sticker { transition: none; transform: translate(-50%, -50%) rotate(0deg); }
  .sp-sticker:hover, .sp-sticker:focus-visible, .sp-sticker-hover {
    transform: translate(-50%, -50%) rotate(0deg) scale(1);
  }
  .sp-sticker-corner { display: none; }
  .sp-hardhat-shell {
    /* still readable, just less hat-like */
    border-radius: 12px;
    background: #FFD432;
    height: auto;
    min-height: 460px;
    padding: 12px;
  }
}

.sp-hardhat-caption {
  margin-top: 32px;
  font-family: 'JetBrains Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.06em;
  color: rgba(10, 14, 26, 0.7);
  text-align: center;
  font-style: italic;
}

/* SECTIONS */
.sp-section {
  position: relative;
  z-index: 2;
  padding: 64px 12px 80px;
}
.sp-section-head { max-width: 720px; margin-bottom: 40px; }
.sp-section-head-light { color: #F1EEE5; }
.sp-section-tag {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  color: #003B71;
  border: 1.5px solid #003B71;
  padding: 4px 10px;
  margin-bottom: 16px;
  font-weight: 700;
}
.sp-section-tag-light { color: #FFD432; border-color: #FFD432; }
.sp-section-title {
  font-family: 'Oswald', 'Inter', sans-serif;
  font-weight: 700;
  font-size: clamp(32px, 4.6vw, 56px);
  line-height: 1.05;
  letter-spacing: -0.005em;
  color: #0A0E1A;
  margin: 0 0 14px;
  text-transform: uppercase;
}
.sp-section-title-light { color: #FFFAEC; }
.sp-section-lead {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(10, 14, 26, 0.78);
  max-width: 600px;
  margin: 0;
}
.sp-section-lead-light { color: rgba(241, 238, 229, 0.85); }

/* THE STACK LIST */
.sp-stack-list {
  list-style: none;
  margin: 0;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 6px;
}
.sp-stack-item {
  display: grid;
  grid-template-columns: 110px 1fr auto;
  gap: 22px;
  align-items: center;
  background: #FFFAEC;
  border: 2px solid #0A0E1A;
  padding: 14px 18px;
  outline: none;
  transition: transform 220ms ease, box-shadow 220ms ease, background 220ms ease;
  box-shadow: 4px 4px 0 #0A0E1A;
}
.sp-stack-item:hover, .sp-stack-item:focus-visible {
  transform: translate(-2px, -2px);
  box-shadow: 6px 6px 0 #0A0E1A;
}
.sp-stack-claimed {
  background: #FFF3CC;
  outline: 2px solid #FFD432;
  outline-offset: 0;
}
@media (prefers-reduced-motion: reduce) {
  .sp-stack-item { transition: background 220ms ease; }
  .sp-stack-item:hover, .sp-stack-item:focus-visible { transform: none; box-shadow: 4px 4px 0 #0A0E1A; }
}
.sp-stack-chip {
  width: 90px; height: 90px;
  display: grid;
  place-items: center;
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.04em;
  text-align: center;
  padding: 6px;
  text-transform: uppercase;
  flex-shrink: 0;
  line-height: 1;
}
.sp-stack-meta {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 6px;
  flex-wrap: wrap;
}
.sp-stack-type {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.22em;
  color: #D52B1E;
  border: 1.5px solid #D52B1E;
  padding: 3px 8px;
  font-weight: 700;
}
.sp-stack-key {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.14em;
  color: rgba(10, 14, 26, 0.55);
  text-transform: uppercase;
}
.sp-stack-desc {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.55;
  color: rgba(10, 14, 26, 0.85);
  margin: 0;
}
.sp-stack-claim {
  appearance: none;
  background: #0A0E1A;
  color: #FFD432;
  border: 2px solid #0A0E1A;
  padding: 10px 18px;
  font-family: 'Oswald', sans-serif;
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-weight: 700;
  cursor: pointer;
  transition: background 220ms ease, color 220ms ease;
}
.sp-stack-claim:hover, .sp-stack-claim:focus-visible {
  outline: none;
  background: #FFD432;
  color: #0A0E1A;
}
.sp-stack-claimed .sp-stack-claim { background: #D52B1E; color: #F1EEE5; }

/* THE LOCAL */
.sp-section-local {
  background: #003B71;
  margin: 0 -28px;
  padding: 80px 40px 96px;
  position: relative;
}
.sp-section-local::before {
  content: '';
  position: absolute;
  inset: 8px;
  border: 1.5px dashed rgba(255, 212, 50, 0.4);
  pointer-events: none;
}
.sp-creds {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: 22px;
  position: relative;
  z-index: 2;
}
.sp-cred {
  position: relative;
  background: #FFFAEC;
  border: 2.5px solid #0A0E1A;
  padding: 28px 24px 22px;
  outline: none;
  transition: transform 220ms ease, box-shadow 220ms ease;
  box-shadow: 5px 5px 0 #FFD432, 5px 5px 0 2px #0A0E1A;
}
.sp-cred:hover, .sp-cred:focus-visible {
  transform: translate(-3px, -3px);
  box-shadow: 8px 8px 0 #FFD432, 8px 8px 0 2px #0A0E1A;
}
@media (prefers-reduced-motion: reduce) {
  .sp-cred { transition: none; }
  .sp-cred:hover, .sp-cred:focus-visible { transform: none; box-shadow: 5px 5px 0 #FFD432, 5px 5px 0 2px #0A0E1A; }
}
.sp-cred-marker {
  position: absolute;
  top: 14px; right: 14px;
  display: flex;
  gap: 4px;
}
.sp-cred-marker span {
  width: 10px; height: 10px;
  background: #D52B1E;
  border-radius: 50%;
  border: 1.5px solid #0A0E1A;
}
.sp-cred-marker span:nth-child(2) { background: #FFD432; }
.sp-cred-head { margin-bottom: 14px; padding-bottom: 12px; border-bottom: 2px solid #0A0E1A; }
.sp-cred-title {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 22px;
  color: #0A0E1A;
  margin: 0 0 4px;
  letter-spacing: 0.02em;
}
.sp-cred-sub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: #D52B1E;
  text-transform: uppercase;
  font-weight: 700;
}
.sp-cred-body {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(10, 14, 26, 0.85);
  margin: 0 0 18px;
}
.sp-cred-foot {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.08em;
  color: #003B71;
  border-top: 1px dashed rgba(10, 14, 26, 0.3);
  padding-top: 10px;
}

/* HARD-HAT WALL */
.sp-section-wall {
  padding-top: 64px;
}
.sp-wall {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 22px;
}
.sp-lid {
  --li: 0;
  background: #FFFAEC;
  border: 2.5px solid #0A0E1A;
  padding: 0;
  outline: none;
  display: flex;
  flex-direction: column;
  transition: transform 220ms ease, box-shadow 220ms ease;
  box-shadow: 5px 5px 0 #003B71;
}
.sp-lid:hover, .sp-lid:focus-visible {
  transform: translate(-3px, -3px);
  box-shadow: 8px 8px 0 #D52B1E;
}
@media (prefers-reduced-motion: reduce) {
  .sp-lid { transition: none; }
  .sp-lid:hover, .sp-lid:focus-visible { transform: none; box-shadow: 5px 5px 0 #003B71; }
}

.sp-lid-shell {
  position: relative;
  background:
    radial-gradient(ellipse 90% 70% at 50% 70%, #FFD432 0%, #E0AC18 60%, #B5870C 100%);
  border-bottom: 2.5px solid #0A0E1A;
  height: 130px;
  overflow: hidden;
}
.sp-lid-dome {
  position: absolute;
  left: 50%;
  top: 12px;
  transform: translateX(-50%);
  width: 70%;
  height: 110px;
  background: radial-gradient(ellipse 70% 50% at 50% 70%, #FFD432, #B5870C);
  border-radius: 50% 50% 8% 8% / 80% 80% 8% 8%;
  border: 2px solid #0A0E1A;
}
.sp-lid-brim {
  position: absolute;
  left: 6%;
  right: 6%;
  bottom: -8px;
  height: 18px;
  background: linear-gradient(180deg, #B5870C, #8a6608);
  border-radius: 50%;
  border: 2px solid #0A0E1A;
}
.sp-lid-sticker {
  position: absolute;
  border: 1.5px solid #0A0E1A;
  z-index: 2;
}
.sp-lid-sticker-1 {
  width: 22px; height: 22px;
  border-radius: 50%;
  background: #003B71;
  top: 36px; left: 36%;
  transform: rotate(-8deg);
}
.sp-lid-sticker-2 {
  width: 28px; height: 18px;
  background: #D52B1E;
  top: 26px; left: 52%;
  transform: rotate(6deg);
}
.sp-lid-sticker-3 {
  width: 22px; height: 22px;
  background: #FFFAEC;
  top: 60px; left: 30%;
  transform: rotate(12deg);
}
.sp-lid-sticker-4 {
  width: 26px; height: 16px;
  background: linear-gradient(180deg, #BB1133 0%, #BB1133 33%, #FFFAEC 33%, #FFFAEC 66%, #003B71 66%, #003B71 100%);
  top: 56px; left: 56%;
  transform: rotate(-9deg);
}

.sp-lid-body { padding: 18px 18px 20px; }
.sp-lid-name {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: 22px;
  letter-spacing: 0.04em;
  color: #0A0E1A;
}
.sp-lid-role {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  color: rgba(10, 14, 26, 0.75);
  margin-bottom: 12px;
}
.sp-lid-role span { color: #D52B1E; font-weight: 700; }
.sp-lid-stickers {
  list-style: none;
  margin: 0;
  padding: 12px 0 0;
  border-top: 1.5px dashed rgba(10, 14, 26, 0.3);
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}
.sp-lid-stickers li {
  font-family: 'JetBrains Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.06em;
  background: #003B71;
  color: #FFFAEC;
  padding: 3px 8px;
  border: 1.5px solid #0A0E1A;
}

/* CONTACT */
.sp-section-contact {
  padding: 80px 12px 96px;
}
.sp-contact {
  position: relative;
  max-width: 880px;
  margin: 0 auto;
  background: #0A0E1A;
  color: #FFFAEC;
  border: 3px solid #FFD432;
  padding: 56px 56px;
  box-shadow: 8px 8px 0 #FFD432;
  overflow: hidden;
}
.sp-contact-stripe {
  position: absolute;
  inset: 0;
  background:
    repeating-linear-gradient(135deg,
      rgba(255, 212, 50, 0.08) 0px, rgba(255, 212, 50, 0.08) 8px,
      transparent 8px, transparent 18px);
  pointer-events: none;
}
.sp-contact-body { position: relative; z-index: 2; }
.sp-contact .sp-section-tag {
  background: #FFD432;
  color: #0A0E1A;
  border-color: #FFD432;
}
.sp-contact-title {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: clamp(36px, 5vw, 56px);
  line-height: 1.05;
  letter-spacing: 0.005em;
  color: #FFFAEC;
  margin: 16px 0;
  text-transform: uppercase;
}
.sp-contact-title span {
  color: #FFD432;
  font-style: italic;
  font-weight: 600;
  text-transform: none;
}
.sp-contact-text {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(255, 250, 236, 0.85);
  max-width: 580px;
  margin: 0 0 32px;
}
.sp-contact-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 22px;
}
.sp-contact-phone {
  font-family: 'Oswald', sans-serif;
  font-weight: 700;
  font-size: clamp(28px, 4vw, 40px);
  letter-spacing: 0.04em;
  color: #FFD432;
  text-decoration: none;
  transition: color 220ms ease;
}
.sp-contact-phone:hover, .sp-contact-phone:focus-visible {
  outline: none;
  color: #D52B1E;
}
.sp-contact-sep {
  width: 1px; height: 32px;
  background: rgba(255, 250, 236, 0.4);
}
.sp-contact-mail {
  font-family: 'JetBrains Mono', monospace;
  font-size: 14px;
  color: rgba(255, 250, 236, 0.85);
  text-decoration: none;
  letter-spacing: 0.04em;
  border-bottom: 1.5px solid rgba(255, 212, 50, 0.5);
  padding-bottom: 2px;
  transition: color 220ms ease, border-color 220ms ease;
}
.sp-contact-mail:hover, .sp-contact-mail:focus-visible {
  outline: none;
  color: #FFD432;
  border-bottom-color: #FFD432;
}

/* FOOTER */
.sp-footer {
  position: relative;
  z-index: 2;
  border-top: 2px solid #0A0E1A;
  padding: 22px 4px 4px;
  margin-top: 36px;
}
.sp-footer-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 14px;
}
.sp-footer-stub {
  font-family: 'JetBrains Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: #003B71;
  border: 1.5px solid #003B71;
  padding: 4px 10px;
  font-weight: 700;
}
.sp-footer-credit {
  font-family: 'Inter', sans-serif;
  font-style: italic;
  font-size: 13px;
  color: rgba(10, 14, 26, 0.65);
  margin: 0;
}

/* RESPONSIVE */
@media (max-width: 980px) {
  .sp-hero { grid-template-columns: 1fr; gap: 64px; padding: 32px 12px 56px; }
  .sp-hardhat-shell { max-width: 420px; height: 380px; }
  .sp-stack-item { grid-template-columns: 80px 1fr; }
  .sp-stack-chip { width: 70px; height: 70px; font-size: 12px; }
  .sp-stack-claim { grid-column: 1 / -1; justify-self: start; margin-top: 8px; }
  .sp-contact { padding: 36px 24px; box-shadow: 4px 4px 0 #FFD432; }
}
@media (max-width: 600px) {
  .sp-hardhat-shell { height: 320px; }
  .sp-sticker-round, .sp-sticker-octagon, .sp-sticker-hex { width: 84px; height: 84px; }
  .sp-sticker-rect { width: 100px; height: 60px; }
  .sp-sticker-shield { width: 84px; height: 96px; }
  .sp-sticker-big { font-size: 14px; }
}
`;
