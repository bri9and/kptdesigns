"use client";

/**
 * RfpBinderEngine — V70 RFP Binder
 *
 * 3-ring binder open to a tab. Tabs flip between sections (with a
 * thunk). AIA-cream pages, Times-set body copy, redline annotations
 * in revision red, sticky-pink flags poking from the edge. Hover on
 * a redline reveals the original strikethrough text.
 *
 * Trade showcase: General Contractors (commercial fit-outs).
 */

import { useEffect, useRef, useState } from "react";

type TabKey = "precon" | "construction" | "punch" | "closeout";

const TABS: { key: TabKey; num: string; label: string; sub: string }[] = [
  { key: "precon",       num: "01", label: "Pre-Con",      sub: "estimating · permits · subs" },
  { key: "construction", num: "02", label: "Construction", sub: "schedule · field · QA" },
  { key: "punch",        num: "03", label: "Punch",        sub: "owner walk · subs back" },
  { key: "closeout",     num: "04", label: "Close-Out",    sub: "O&Ms · attic stock · warranty" },
];

const TAB_BODY: Record<
  TabKey,
  {
    section: string;
    title: string;
    body: { para: string; redlines?: { text: string; original: string; note: string }[] }[];
    log: { id: string; item: string; status: string; date: string; flag?: "pink" | "yellow" | "blue" }[];
  }
> = {
  precon: {
    section: "TAB 01 / PRE-CONSTRUCTION",
    title: "Estimating, permits, sub solicitation.",
    body: [
      {
        para:
          "Pre-construction begins with the schematic set in our hand and ends with the building permit on the trailer wall. We solicit three apples-to-apples bids per division, scrub each by line-item, and present the owner a clean budget reconciliation before the GMP is signed.",
      },
      {
        para:
          "Permit procurement is a contracted scope; we do not delegate it to subs. The permit clock starts the day the owner approves the GMP, and we provide weekly written status until issuance.",
        redlines: [
          {
            text: "issuance",
            original: "issuance or denial",
            note: "Owner asked us to commit to issuance, not just \"updates.\" Accepted.",
          },
        ],
      },
    ],
    log: [
      { id: "0103", item: "Schematic budget — Division 03", status: "Closed",  date: "03/14", flag: "pink" },
      { id: "0210", item: "Bid solicitation — Mechanical",   status: "In progress", date: "04/01" },
      { id: "0312", item: "Building permit application",     status: "Filed",   date: "04/14", flag: "yellow" },
      { id: "0418", item: "Sub pre-qualification packets",   status: "Closed",  date: "04/22" },
    ],
  },
  construction: {
    section: "TAB 02 / CONSTRUCTION",
    title: "Schedule, field supervision, weekly QA.",
    body: [
      {
        para:
          "Construction is run from the trailer with a critical-path schedule updated weekly. Our superintendent is on site full-time, walks the work twice daily, and posts a written log to the owner&rsquo;s portal by 5pm.",
        redlines: [
          {
            text: "twice daily",
            original: "once daily",
            note: "Owner requested two daily walks during MEP rough-in. Accepted at GMP.",
          },
        ],
      },
      {
        para:
          "Quality assurance is built into the schedule, not bolted on. Mechanical, electrical, and plumbing rough-ins are inspected by our QA lead before the AHJ inspection &mdash; we&rsquo;d rather catch it ourselves than hand it to the inspector.",
      },
    ],
    log: [
      { id: "0521", item: "RFI 044 — Slab depression at trench drain", status: "Answered", date: "05/04", flag: "pink" },
      { id: "0608", item: "Submittal — Storefront glazing",            status: "Approved",  date: "05/19", flag: "blue" },
      { id: "0702", item: "Change order CO-08 — Owner-added millwork", status: "Pending",   date: "05/28" },
      { id: "0815", item: "QA — MEP rough-in walk, Suite 200",         status: "Closed",    date: "06/04" },
    ],
  },
  punch: {
    section: "TAB 03 / PUNCH",
    title: "Owner walk. Subs back. We don&rsquo;t demobilize first.",
    body: [
      {
        para:
          "The punch list is generated jointly with the owner and architect on a single walk. We do not demobilize subs until each item is owner-signed. A sub who walks before sign-off does not bid the next job.",
      },
      {
        para:
          "Punch turnaround target: 14 calendar days from walk to closeout-ready. We&rsquo;ve held that on 23 of our last 24 fit-outs.",
        redlines: [
          {
            text: "14 calendar days",
            original: "21 calendar days",
            note: "Owner pushed for 14. We agreed and have held it on 23/24.",
          },
        ],
      },
    ],
    log: [
      { id: "0901", item: "Owner / architect walk scheduled", status: "Scheduled", date: "06/14" },
      { id: "0918", item: "Punch items issued — 47 items",     status: "Issued",    date: "06/15", flag: "pink" },
      { id: "1004", item: "Items signed at re-walk",            status: "32 of 47",  date: "06/22" },
      { id: "1102", item: "Subs released from the job",         status: "Pending",   date: "—" },
    ],
  },
  closeout: {
    section: "TAB 04 / CLOSE-OUT",
    title: "O&amp;Ms, attic stock, warranty handoff.",
    body: [
      {
        para:
          "Close-out is its own phase, not a leftover. Operations and maintenance manuals are bound and indexed, attic stock is delivered to the location the owner specifies (not stuffed in a janitor&rsquo;s closet), and the warranty period runs from substantial completion, not from ribbon-cutting.",
      },
      {
        para:
          "The warranty walk happens at month 11, not month 12. We address punch in writing before the clock runs out, with a copy to the owner&rsquo;s facilities lead.",
        redlines: [
          {
            text: "month 11",
            original: "month 12",
            note: "Industry standard is month 12; owner asked for month 11. Accepted.",
          },
        ],
      },
    ],
    log: [
      { id: "1205", item: "O&Ms bound — 4 binders delivered",   status: "Closed", date: "06/30", flag: "blue" },
      { id: "1308", item: "Attic stock — owner-specified room",  status: "Closed", date: "06/30" },
      { id: "1414", item: "Warranty walk — month 11 scheduled",  status: "On cal", date: "05/30" },
      { id: "1520", item: "Final pay app + retainage release",   status: "Issued", date: "07/05", flag: "yellow" },
    ],
  },
};

const OWNER_NOTES = [
  {
    project: "Stonecreek Plaza — Tenant fit-out, 14,000 sf",
    body:
      "Their punch list closed in eleven days. Two of those days were us waiting on a doorstop the architect specified by hand. They didn&rsquo;t leave the job until our facilities team had keys.",
    sig: "— Allison Reyes, Director of Real Estate, Stonecreek REIT",
  },
  {
    project: "Hawthorne Medical — Specialty clinic, 22,000 sf",
    body:
      "We were a difficult owner. We changed the program three times after GMP. Pratt &amp; Whitcomb wrote every change as a CO without grumbling and held the schedule by re-baselining once. Hire them.",
    sig: "— Dr. K. Mendez, MD, Practice Owner",
  },
  {
    project: "City Hall Annex — Public works, 9,800 sf",
    body:
      "Two-year prevailing-wage job with weekly council scrutiny. Pratt&rsquo;s super filed certified payroll on time every week and walked us through every change order before it hit the agenda.",
    sig: "— J. Coleman, City Engineer",
  },
];

export default function RfpBinderEngine() {
  const [tab, setTab] = useState<TabKey>("precon");
  const [hoverRedline, setHoverRedline] = useState<string | null>(null);
  const flipRef = useRef<HTMLDivElement | null>(null);
  const [flipKey, setFlipKey] = useState<number>(0);

  // re-trigger page-flip animation when tab changes
  useEffect(() => {
    setFlipKey((k) => k + 1);
  }, [tab]);

  const data = TAB_BODY[tab];

  return (
    <>
      <style>{css}</style>
      <div className="rb-shell">
        <div className="rb-grain" aria-hidden />

        {/* TOP NAV */}
        <header className="rb-top">
          <div className="rb-brand">
            <div className="rb-spine">
              <span className="rb-spine-rivet" />
              <span className="rb-spine-rivet" />
              <span className="rb-spine-rivet" />
              <span className="rb-spine-text">PRATT &amp; WHITCOMB GENERAL CONTRACTORS &middot; PROJECT BINDER</span>
            </div>
          </div>
          <nav className="rb-nav">
            <a href="#binder" className="rb-link">The Binder</a>
            <a href="#log" className="rb-link">Submittal Log</a>
            <a href="#notes" className="rb-link">Owner Notes</a>
            <a href="#contact" className="rb-link rb-link-cta">Open the binder</a>
          </nav>
        </header>

        {/* HERO */}
        <section className="rb-hero">
          <div className="rb-hero-meta">
            <div className="rb-hero-stub">REQUEST FOR PROPOSAL &middot; CONFIDENTIAL</div>
            <h1 className="rb-headline">
              RFP. Submittals.
              <br />
              Change orders.
              <br />
              <em>Closed-out clean.</em>
            </h1>
            <p className="rb-sub">
              General contracting on commercial fit-outs &mdash; every project a
              complete binder, every redline addressed before we sign. Owners
              know where to look because everything we do has a tab.
            </p>
            <div className="rb-cta-row">
              <a href="#binder" className="rb-cta rb-cta-primary">Open the binder</a>
              <a href="#log" className="rb-cta rb-cta-ghost">See the redlines</a>
            </div>
          </div>

          <aside className="rb-hero-block">
            <div className="rb-hero-block-tab">PROJECT FACTS</div>
            <dl className="rb-hero-facts">
              <div><dt>Founded</dt><dd>1987</dd></div>
              <div><dt>License</dt><dd>GC #B-114882-A</dd></div>
              <div><dt>Bonding</dt><dd>$22M single / $48M aggregate</dd></div>
              <div><dt>Fit-outs in 5 yrs</dt><dd>184</dd></div>
              <div><dt>On-time close-out</dt><dd>96.4%</dd></div>
              <div><dt>EMR</dt><dd>0.71</dd></div>
            </dl>
            <div className="rb-hero-stamp" aria-hidden>
              <div className="rb-stamp-text">RFP&nbsp;ISSUED<br/>04 / 28 / 2026</div>
            </div>
          </aside>
        </section>

        {/* BINDER */}
        <section id="binder" className="rb-section rb-section-binder">
          <div className="rb-binder">
            {/* TABS */}
            <div className="rb-tabs" role="tablist">
              {TABS.map((t) => (
                <button
                  key={t.key}
                  role="tab"
                  aria-selected={tab === t.key}
                  className={`rb-tab${tab === t.key ? " rb-tab-active" : ""}`}
                  onClick={() => setTab(t.key)}
                  type="button"
                >
                  <span className="rb-tab-num">{t.num}</span>
                  <span className="rb-tab-label">{t.label}</span>
                  <span className="rb-tab-sub">{t.sub}</span>
                </button>
              ))}
            </div>

            {/* PAGE */}
            <div className="rb-page-wrap">
              {/* RING HOLES */}
              <div className="rb-rings" aria-hidden>
                <span /><span /><span /><span /><span /><span /><span />
              </div>

              <article
                key={flipKey}
                ref={flipRef}
                className="rb-page"
                aria-live="polite"
              >
                <header className="rb-page-head">
                  <div className="rb-page-section">{data.section}</div>
                  <div className="rb-page-rev">REV B &middot; OWNER MARKUP</div>
                </header>

                <h2
                  className="rb-page-title"
                  dangerouslySetInnerHTML={{ __html: data.title }}
                />

                <div className="rb-page-body">
                  {data.body.map((b, i) => (
                    <p key={i} className="rb-para">
                      {!b.redlines &&
                        <span dangerouslySetInnerHTML={{ __html: b.para }} />
                      }
                      {b.redlines && renderRedlinedPara(b.para, b.redlines, hoverRedline, setHoverRedline)}
                    </p>
                  ))}
                </div>

                <div className="rb-flag" aria-hidden />
                <div className="rb-watermark" aria-hidden>
                  PRATT &amp; WHITCOMB
                  <br />
                  PROJECT BINDER
                </div>
              </article>
            </div>
          </div>

          <p className="rb-binder-hint">
            Click a tab. The binder thunks. Hover any <span className="rb-hint-redline">redline</span> to see what was originally written.
          </p>
        </section>

        {/* SUBMITTAL LOG */}
        <section id="log" className="rb-section rb-section-log">
          <header className="rb-section-head">
            <div className="rb-section-stub">SUBMITTAL LOG / TAB {tab === "precon" ? "01" : tab === "construction" ? "02" : tab === "punch" ? "03" : "04"}</div>
            <h2 className="rb-section-title">A submittal log you can read at a glance.</h2>
            <p className="rb-section-lead">
              Owners trust binders more than slides. We hand you one for every
              project, indexed, tabbed, and redlined where it matters. Sticky
              flags mark what&rsquo;s open.
            </p>
          </header>

          <div className="rb-log">
            <div className="rb-log-head">
              <span>ID</span>
              <span>ITEM</span>
              <span>STATUS</span>
              <span>DATE</span>
            </div>
            {data.log.map((entry) => (
              <div key={entry.id} className={`rb-log-row${entry.flag ? ` rb-log-flag-${entry.flag}` : ""}`}>
                <span className="rb-log-id">{entry.id}</span>
                <span className="rb-log-item">{entry.item}</span>
                <span className="rb-log-status">{entry.status}</span>
                <span className="rb-log-date">{entry.date}</span>
                {entry.flag && <span className="rb-log-flag-tab" aria-label="flagged" />}
              </div>
            ))}
          </div>
        </section>

        {/* OWNER NOTES — TESTIMONIALS AS MARGINALIA */}
        <section id="notes" className="rb-section rb-section-notes">
          <header className="rb-section-head">
            <div className="rb-section-stub">OWNER NOTES &middot; MARGINALIA</div>
            <h2 className="rb-section-title">What owners wrote in the margins.</h2>
            <p className="rb-section-lead">
              No five-star quotes. We pulled three notes from owner-architect
              correspondence and we&rsquo;re showing them with the markup ink.
            </p>
          </header>

          <div className="rb-notes">
            {OWNER_NOTES.map((n) => (
              <article key={n.project} className="rb-note" tabIndex={0}>
                <div className="rb-note-tab">CC: OWNER FILE</div>
                <header className="rb-note-head">{n.project}</header>
                <blockquote
                  className="rb-note-body"
                  dangerouslySetInnerHTML={{ __html: n.body }}
                />
                <footer className="rb-note-sig">{n.sig}</footer>
              </article>
            ))}
          </div>
        </section>

        {/* CONTACT */}
        <section id="contact" className="rb-section rb-section-contact">
          <div className="rb-contact">
            <div className="rb-contact-stamp" aria-hidden>
              <div className="rb-contact-stamp-text">RFP&nbsp;DUE<br/>FRIDAY 5PM</div>
            </div>
            <div className="rb-contact-body">
              <div className="rb-section-stub">CONTACT &middot; ESTIMATING</div>
              <h2 className="rb-contact-title">Send the RFP. We&rsquo;ll start a binder.</h2>
              <p className="rb-contact-text">
                Walk-throughs scheduled within 5 business days. GMP-style
                estimates returned in 14. Lump-sum on commercial fit-outs only.
              </p>
              <div className="rb-contact-row">
                <a href="mailto:rfps@prattwhitcomb.example" className="rb-contact-mail">
                  rfps@prattwhitcomb.example
                </a>
                <span className="rb-contact-sep">&middot;</span>
                <a href="tel:5552147700" className="rb-contact-phone">
                  555 . 214 . 7700
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="rb-footer">
          <div className="rb-footer-row">
            <span className="rb-footer-stub">GC LIC. #B-114882-A</span>
            <span className="rb-footer-stub">AIA MEMBER FIRM</span>
            <span className="rb-footer-stub">CSI MASTERFORMAT 2020</span>
            <span className="rb-footer-stub">ENR TOP-400 CONTRACTOR</span>
          </div>
          <p className="rb-footer-credit">
            Bound at the trailer, 4:48 pm, mud the color of local soil on the
            boot scrape. &copy; 2026 Pratt &amp; Whitcomb General Contractors,
            Inc.
          </p>
        </footer>
      </div>
    </>
  );
}

function renderRedlinedPara(
  para: string,
  redlines: { text: string; original: string; note: string }[],
  hover: string | null,
  setHover: (k: string | null) => void
) {
  // Replace each redline target word in the paragraph with a marked-up span.
  // We split repeatedly. Simple approach: assume text is unique.
  const parts: (string | { redline: typeof redlines[number]; key: string })[] = [];
  let remaining = para;
  redlines.forEach((rl, i) => {
    const idx = remaining.indexOf(rl.text);
    if (idx === -1) return;
    parts.push(remaining.slice(0, idx));
    parts.push({ redline: rl, key: `${i}-${rl.text}` });
    remaining = remaining.slice(idx + rl.text.length);
  });
  parts.push(remaining);

  return parts.map((p, i) => {
    if (typeof p === "string") {
      return <span key={i} dangerouslySetInnerHTML={{ __html: p }} />;
    }
    const active = hover === p.key;
    return (
      <span
        key={p.key}
        className="rb-redline"
        tabIndex={0}
        onMouseEnter={() => setHover(p.key)}
        onMouseLeave={() => setHover(null)}
        onFocus={() => setHover(p.key)}
        onBlur={() => setHover(null)}
        aria-describedby={`rb-rd-${p.key}`}
      >
        <span className="rb-redline-text">{p.redline.text}</span>
        <span
          id={`rb-rd-${p.key}`}
          className={`rb-redline-pop${active ? " rb-redline-pop-on" : ""}`}
          role="tooltip"
        >
          <span className="rb-redline-was">was: <s>{p.redline.original}</s></span>
          <span className="rb-redline-note">{p.redline.note}</span>
        </span>
      </span>
    );
  });
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=PT+Serif:ital,wght@0,400;0,700;1,400;1,700&family=IBM+Plex+Mono:wght@400;500;700&family=Inter:wght@400;500;600&display=swap');

.rb-shell {
  position: relative;
  min-height: 100vh;
  background: #1A1916;
  color: #1A1916;
  font-family: 'PT Serif', Georgia, serif;
  padding: 28px 28px 56px;
  isolation: isolate;
  overflow: hidden;
}

.rb-grain {
  position: fixed;
  inset: 0;
  background:
    repeating-linear-gradient(0deg, rgba(255,255,255,0.012) 0 1px, transparent 1px 4px),
    radial-gradient(ellipse 80% 50% at 50% 0%, rgba(255,255,255,0.04), transparent 70%);
  z-index: -2;
  pointer-events: none;
}

/* TOP NAV */
.rb-top {
  position: relative;
  z-index: 3;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 20px;
  margin-bottom: 22px;
  border-bottom: 1.5px solid rgba(239, 232, 214, 0.2);
  flex-wrap: wrap;
  gap: 20px;
}
.rb-brand { display: flex; align-items: center; }
.rb-spine {
  position: relative;
  height: 56px;
  display: flex;
  align-items: center;
  background: linear-gradient(90deg, #2B2924 0%, #1A1916 50%, #2B2924 100%);
  border: 1.5px solid #0A0908;
  padding: 0 80px 0 60px;
  box-shadow: inset 0 1px 0 rgba(239, 232, 214, 0.08), 0 4px 10px rgba(0,0,0,0.4);
  border-radius: 4px;
}
.rb-spine-rivet {
  position: absolute;
  width: 14px; height: 14px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #B0A998 0%, #5C5547 70%, #2A2521 100%);
  box-shadow: inset 0 -2px 2px rgba(0,0,0,0.5);
  top: 50%; transform: translateY(-50%);
}
.rb-spine-rivet:nth-of-type(1) { left: 14px; }
.rb-spine-rivet:nth-of-type(2) { left: 32px; }
.rb-spine-rivet:nth-of-type(3) { right: 18px; }
.rb-spine-text {
  font-family: 'PT Serif', serif;
  font-weight: 700;
  font-style: italic;
  font-size: 15px;
  letter-spacing: 0.18em;
  color: #EFE8D6;
  text-shadow: 0 -1px 0 rgba(0,0,0,0.5);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.rb-nav {
  display: flex;
  align-items: center;
  gap: 22px;
  flex-wrap: wrap;
}
.rb-link {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  color: rgba(239, 232, 214, 0.78);
  font-weight: 500;
  padding: 5px 4px;
  position: relative;
  transition: color 200ms ease;
}
.rb-link::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -2px;
  height: 2px;
  background: #F47CA0;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms ease;
}
.rb-link:hover, .rb-link:focus-visible {
  color: #F47CA0;
  outline: none;
}
.rb-link:hover::after, .rb-link:focus-visible::after { transform: scaleX(1); }
.rb-link-cta {
  background: #F47CA0;
  color: #1A1916;
  padding: 8px 14px;
  font-weight: 700;
  border-radius: 2px;
  box-shadow: 0 2px 0 rgba(0,0,0,0.4);
}
.rb-link-cta::after { display: none; }
.rb-link-cta:hover, .rb-link-cta:focus-visible {
  background: #EFE8D6;
  color: #1A1916;
  transform: translateY(-1px);
}

/* HERO */
.rb-hero {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.4fr 1fr;
  gap: 56px;
  padding: 32px 12px 56px;
  align-items: stretch;
  background: #EFE8D6;
  border: 1px solid rgba(0,0,0,0.18);
  margin: 0 -28px 0;
  padding: 56px 56px;
  box-shadow: 0 12px 28px rgba(0,0,0,0.4);
}
.rb-hero-stub {
  display: inline-block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.32em;
  color: #1A1916;
  border: 1px solid rgba(26, 25, 22, 0.45);
  padding: 4px 10px;
  margin-bottom: 24px;
  background: rgba(244, 124, 160, 0.08);
}
.rb-headline {
  font-family: 'PT Serif', serif;
  font-weight: 700;
  font-size: clamp(48px, 6.4vw, 88px);
  line-height: 1;
  margin: 0 0 24px;
  color: #1A1916;
  letter-spacing: -0.015em;
}
.rb-headline em {
  font-style: italic;
  font-weight: 700;
  color: #C04668;
}
.rb-sub {
  font-family: 'PT Serif', serif;
  font-size: 18px;
  line-height: 1.6;
  color: rgba(26, 25, 22, 0.82);
  margin: 0 0 32px;
  max-width: 560px;
}
.rb-cta-row { display: flex; gap: 14px; flex-wrap: wrap; }
.rb-cta {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 14px 24px;
  border: 2px solid #1A1916;
  display: inline-block;
  transition: transform 200ms ease, background 220ms ease, color 220ms ease;
}
.rb-cta-primary { background: #1A1916; color: #EFE8D6; }
.rb-cta-primary:hover, .rb-cta-primary:focus-visible {
  outline: none;
  background: #F47CA0;
  border-color: #F47CA0;
  color: #1A1916;
  transform: translateY(-2px);
}
.rb-cta-ghost { background: transparent; color: #1A1916; }
.rb-cta-ghost:hover, .rb-cta-ghost:focus-visible {
  outline: none;
  background: #1A1916;
  color: #EFE8D6;
  transform: translateY(-2px);
}

.rb-hero-block {
  position: relative;
  background: #FBF7E9;
  border: 1px solid rgba(26, 25, 22, 0.22);
  padding: 26px 26px 22px;
  box-shadow: 0 6px 16px rgba(0,0,0,0.12);
}
.rb-hero-block-tab {
  position: absolute;
  top: 0; left: -1px;
  transform: translateY(-100%);
  background: #1A1916;
  color: #EFE8D6;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.22em;
  padding: 5px 12px;
}
.rb-hero-facts {
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 0;
}
.rb-hero-facts > div {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 12px;
  padding: 10px 0;
  border-bottom: 1px dashed rgba(26, 25, 22, 0.25);
  font-family: 'PT Serif', serif;
}
.rb-hero-facts > div:last-child { border-bottom: none; }
.rb-hero-facts dt {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.14em;
  color: rgba(26, 25, 22, 0.65);
  text-transform: uppercase;
  margin: 0;
}
.rb-hero-facts dd {
  font-family: 'PT Serif', serif;
  font-size: 16px;
  font-weight: 700;
  color: #1A1916;
  margin: 0;
  text-align: right;
}
.rb-hero-stamp {
  position: absolute;
  bottom: 18px;
  right: -28px;
  width: 110px;
  height: 110px;
  border: 3px solid #C04668;
  color: #C04668;
  border-radius: 50%;
  display: grid;
  place-items: center;
  text-align: center;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  font-size: 13px;
  letter-spacing: 0.14em;
  line-height: 1.2;
  transform: rotate(-12deg);
  background: rgba(255, 240, 240, 0.4);
  opacity: 0.85;
  pointer-events: none;
}
.rb-stamp-text { padding: 10px; }

/* BINDER */
.rb-section {
  position: relative;
  z-index: 2;
  padding: 64px 12px 80px;
}
.rb-section-binder { padding: 80px 12px 56px; }

.rb-section-head { max-width: 720px; margin-bottom: 28px; }
.rb-section-stub {
  display: inline-block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.28em;
  color: #EFE8D6;
  border: 1px solid rgba(239, 232, 214, 0.35);
  padding: 4px 10px;
  margin-bottom: 16px;
}
.rb-section-title {
  font-family: 'PT Serif', serif;
  font-weight: 700;
  font-size: clamp(28px, 3.8vw, 44px);
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: #EFE8D6;
  margin: 0 0 12px;
}
.rb-section-lead {
  font-family: 'PT Serif', serif;
  font-style: italic;
  font-size: 16px;
  line-height: 1.55;
  color: rgba(239, 232, 214, 0.78);
  max-width: 600px;
  margin: 0;
}

.rb-binder {
  display: grid;
  grid-template-columns: 220px 1fr;
  gap: 0;
  align-items: start;
  max-width: 1240px;
  margin: 0 auto;
  background: #2B2924;
  border: 1px solid #0A0908;
  padding: 22px 22px 22px 0;
  box-shadow: 0 16px 40px rgba(0,0,0,0.5), inset 0 1px 0 rgba(239,232,214,0.06);
  border-radius: 4px;
}

.rb-tabs {
  display: flex;
  flex-direction: column;
  gap: 6px;
  padding: 22px 0 22px 22px;
}
.rb-tab {
  appearance: none;
  background: #FBF7E9;
  border: 1px solid #0A0908;
  border-right: none;
  text-align: left;
  padding: 14px 14px 14px 18px;
  font-family: 'PT Serif', serif;
  cursor: pointer;
  position: relative;
  transition: transform 200ms ease, background 220ms ease, color 220ms ease;
  width: calc(100% + 12px);
  border-radius: 4px 0 0 4px;
}
.rb-tab::before {
  /* tab pull */
  content: '';
  position: absolute;
  top: 4px; right: -10px; width: 10px; bottom: 4px;
  background: linear-gradient(90deg, #FBF7E9, #D8D0B8);
  border: 1px solid rgba(0,0,0,0.18);
  border-left: none;
  border-radius: 0 6px 6px 0;
}
.rb-tab-num {
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.22em;
  color: rgba(26, 25, 22, 0.6);
}
.rb-tab-label {
  display: block;
  font-family: 'PT Serif', serif;
  font-weight: 700;
  font-size: 18px;
  color: #1A1916;
  letter-spacing: -0.01em;
  margin-top: 2px;
}
.rb-tab-sub {
  display: block;
  font-family: 'PT Serif', serif;
  font-style: italic;
  font-size: 11px;
  color: rgba(26, 25, 22, 0.65);
  margin-top: 2px;
  line-height: 1.3;
}
.rb-tab:hover, .rb-tab:focus-visible {
  outline: none;
  transform: translateX(6px);
  background: #FFF8DD;
}
.rb-tab-active {
  background: #C04668 !important;
  transform: translateX(8px);
  box-shadow: 0 4px 10px rgba(0,0,0,0.3);
}
.rb-tab-active::before {
  background: linear-gradient(90deg, #C04668, #8C2C48);
}
.rb-tab-active .rb-tab-num,
.rb-tab-active .rb-tab-label,
.rb-tab-active .rb-tab-sub { color: #FBF7E9; }
@media (prefers-reduced-motion: reduce) {
  .rb-tab { transition: background 220ms ease, color 220ms ease; }
  .rb-tab:hover, .rb-tab:focus-visible, .rb-tab-active { transform: none; }
}

/* PAGE */
.rb-page-wrap {
  position: relative;
  display: grid;
  grid-template-columns: 36px 1fr;
  background: #FBF7E9;
  border: 1px solid rgba(0,0,0,0.18);
  border-radius: 0 4px 4px 0;
  box-shadow: inset 4px 0 8px rgba(0,0,0,0.18);
}
.rb-rings {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  padding: 14px 0;
  background:
    linear-gradient(90deg, rgba(0,0,0,0.18) 0%, rgba(0,0,0,0.02) 80%, transparent 100%);
  border-right: 1.5px dashed rgba(26, 25, 22, 0.18);
}
.rb-rings span {
  width: 18px; height: 18px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #FBF7E9 30%, #ddd5c0 60%, #1A1916 80%);
  box-shadow: inset 0 0 0 2.5px #1A1916, 0 1px 1px rgba(0,0,0,0.3);
}

.rb-page {
  position: relative;
  padding: 44px 56px 60px;
  min-height: 600px;
  animation: rb-page-thunk 460ms cubic-bezier(0.25, 1.2, 0.5, 1);
  transform-origin: left center;
}
@keyframes rb-page-thunk {
  0% { opacity: 0.4; transform: rotateY(-22deg) translateX(-6px); filter: blur(2px); }
  60% { opacity: 1; transform: rotateY(2deg) translateX(0); filter: blur(0); }
  100% { transform: rotateY(0) translateX(0); }
}
@media (prefers-reduced-motion: reduce) {
  .rb-page { animation: none; }
}

.rb-page-head {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  border-bottom: 2px solid #1A1916;
  padding-bottom: 12px;
  margin-bottom: 18px;
}
.rb-page-section {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  color: #1A1916;
}
.rb-page-rev {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.18em;
  color: #C04668;
}

.rb-page-title {
  font-family: 'PT Serif', serif;
  font-weight: 700;
  font-size: clamp(28px, 3.4vw, 36px);
  line-height: 1.1;
  letter-spacing: -0.01em;
  color: #1A1916;
  margin: 0 0 24px;
  max-width: 600px;
}

.rb-page-body {
  display: flex;
  flex-direction: column;
  gap: 18px;
}
.rb-para {
  font-family: 'PT Serif', serif;
  font-size: 16px;
  line-height: 1.7;
  color: #1A1916;
  margin: 0;
  max-width: 660px;
}

/* REDLINE */
.rb-redline {
  position: relative;
  display: inline;
  cursor: help;
  outline: none;
  color: #C04668;
  font-style: italic;
  font-weight: 700;
}
.rb-redline-text {
  border-bottom: 2px wavy #C04668;
  text-decoration-thickness: 1px;
}
.rb-redline-pop {
  position: absolute;
  left: 50%;
  bottom: calc(100% + 10px);
  transform: translate(-50%, 6px);
  background: #FFF8DD;
  border: 1.5px solid #C04668;
  padding: 10px 14px;
  width: 280px;
  font-family: 'PT Serif', serif;
  font-style: normal;
  font-weight: 400;
  color: #1A1916;
  font-size: 13px;
  line-height: 1.45;
  text-align: left;
  box-shadow: 0 8px 18px rgba(0,0,0,0.25);
  opacity: 0;
  pointer-events: none;
  transition: opacity 200ms ease, transform 220ms ease;
  z-index: 5;
}
.rb-redline-pop::after {
  content: '';
  position: absolute;
  left: 50%; top: 100%;
  transform: translateX(-50%);
  width: 12px; height: 12px;
  background: #FFF8DD;
  border-right: 1.5px solid #C04668;
  border-bottom: 1.5px solid #C04668;
  rotate: 45deg;
  margin-top: -6px;
}
.rb-redline-pop-on {
  opacity: 1;
  transform: translate(-50%, 0);
}
.rb-redline-was {
  display: block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 11px;
  letter-spacing: 0.06em;
  color: rgba(26, 25, 22, 0.6);
  margin-bottom: 6px;
}
.rb-redline-note { display: block; font-style: italic; }
@media (prefers-reduced-motion: reduce) {
  .rb-redline-pop { transition: none; }
}

.rb-flag {
  position: absolute;
  top: -2px;
  right: 32px;
  width: 36px;
  height: 84px;
  background: #F47CA0;
  border: 1px solid #C04668;
  box-shadow: 0 4px 8px rgba(0,0,0,0.18);
  animation: rb-flag-wave 5s ease-in-out infinite;
  transform-origin: top center;
}
.rb-flag::after {
  content: '';
  position: absolute;
  inset: auto 0 0 0;
  height: 14px;
  background: #C04668;
  clip-path: polygon(0 0, 100% 0, 50% 100%);
  bottom: -14px;
}
@keyframes rb-flag-wave {
  0%, 100% { transform: rotate(0deg); }
  50% { transform: rotate(1.4deg); }
}
@media (prefers-reduced-motion: reduce) {
  .rb-flag { animation: none; }
}

.rb-watermark {
  position: absolute;
  bottom: 36px;
  right: 56px;
  font-family: 'PT Serif', serif;
  font-style: italic;
  font-size: 11px;
  letter-spacing: 0.22em;
  text-align: right;
  color: rgba(26, 25, 22, 0.18);
  text-transform: uppercase;
}

.rb-binder-hint {
  margin-top: 22px;
  font-family: 'PT Serif', serif;
  font-style: italic;
  font-size: 13px;
  color: rgba(239, 232, 214, 0.6);
  text-align: center;
}
.rb-hint-redline {
  color: #F47CA0;
  font-weight: 700;
  text-decoration: underline wavy;
}

/* SUBMITTAL LOG */
.rb-section-log {
  background: #EFE8D6;
  margin: 0 -28px;
  padding: 64px 40px 80px;
  color: #1A1916;
}
.rb-section-log .rb-section-stub {
  color: #1A1916;
  border-color: rgba(26, 25, 22, 0.4);
}
.rb-section-log .rb-section-title { color: #1A1916; }
.rb-section-log .rb-section-lead { color: rgba(26, 25, 22, 0.7); }

.rb-log {
  background: #FBF7E9;
  border: 1.5px solid rgba(26, 25, 22, 0.4);
  max-width: 1080px;
  font-family: 'IBM Plex Mono', monospace;
  position: relative;
}
.rb-log-head, .rb-log-row {
  display: grid;
  grid-template-columns: 90px 1fr 160px 90px;
  gap: 14px;
  padding: 12px 18px;
  align-items: center;
  position: relative;
}
.rb-log-head {
  background: #1A1916;
  color: #FBF7E9;
  font-size: 10px;
  letter-spacing: 0.22em;
  font-weight: 700;
}
.rb-log-row {
  font-size: 12px;
  letter-spacing: 0.04em;
  border-bottom: 1px dashed rgba(26, 25, 22, 0.18);
  color: #1A1916;
}
.rb-log-row:last-child { border-bottom: none; }
.rb-log-id { color: rgba(26, 25, 22, 0.55); font-size: 11px; }
.rb-log-item { color: #1A1916; font-family: 'PT Serif', serif; font-size: 14px; }
.rb-log-status { color: #C04668; font-weight: 700; }
.rb-log-date { color: rgba(26, 25, 22, 0.65); font-size: 11px; text-align: right; }

.rb-log-flag-tab {
  position: absolute;
  right: -18px;
  top: 50%;
  transform: translateY(-50%);
  width: 32px;
  height: 18px;
  display: block;
  border-left: 0;
  box-shadow: 0 2px 4px rgba(0,0,0,0.25);
}
.rb-log-flag-pink .rb-log-flag-tab { background: #F47CA0; border: 1px solid #C04668; }
.rb-log-flag-yellow .rb-log-flag-tab { background: #F4D060; border: 1px solid #B58D2A; }
.rb-log-flag-blue .rb-log-flag-tab { background: #6FA0D0; border: 1px solid #324E70; }

/* OWNER NOTES */
.rb-section-notes {
  padding-top: 80px;
}
.rb-notes {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 22px;
}
.rb-note {
  position: relative;
  background: #FBF7E9;
  color: #1A1916;
  padding: 28px 26px 26px;
  border: 1px solid rgba(26, 25, 22, 0.25);
  box-shadow: 0 6px 14px rgba(0,0,0,0.2);
  outline: none;
  transition: transform 220ms ease, box-shadow 220ms ease;
}
.rb-note:hover, .rb-note:focus-visible {
  transform: translateY(-4px) rotate(-0.4deg);
  box-shadow: 0 12px 24px rgba(0,0,0,0.32);
}
@media (prefers-reduced-motion: reduce) {
  .rb-note { transition: none; }
  .rb-note:hover, .rb-note:focus-visible { transform: none; }
}
.rb-note-tab {
  display: inline-block;
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.22em;
  color: #C04668;
  border: 1px solid rgba(192, 70, 104, 0.5);
  padding: 3px 8px;
  margin-bottom: 14px;
}
.rb-note-head {
  font-family: 'PT Serif', serif;
  font-weight: 700;
  font-size: 16px;
  color: #1A1916;
  margin-bottom: 12px;
  border-bottom: 1px dashed rgba(26, 25, 22, 0.3);
  padding-bottom: 8px;
  letter-spacing: -0.005em;
}
.rb-note-body {
  font-family: 'PT Serif', serif;
  font-size: 14px;
  line-height: 1.6;
  color: rgba(26, 25, 22, 0.85);
  margin: 0 0 14px;
  position: relative;
  font-style: italic;
}
.rb-note-body::before, .rb-note-body::after {
  font-family: 'PT Serif', serif;
  color: #C04668;
  font-size: 22px;
  line-height: 0;
  position: relative;
  font-style: normal;
}
.rb-note-body::before { content: '“'; margin-right: 4px; top: 6px; }
.rb-note-body::after { content: '”'; margin-left: 2px; top: 6px; }
.rb-note-sig {
  font-family: 'PT Serif', serif;
  font-size: 12px;
  color: rgba(26, 25, 22, 0.7);
  font-style: italic;
}

/* CONTACT */
.rb-section-contact {
  padding: 80px 12px 96px;
  background: #EFE8D6;
  margin: 0 -28px;
}
.rb-contact {
  position: relative;
  max-width: 880px;
  margin: 0 auto;
  background: #FBF7E9;
  border: 2px solid #1A1916;
  padding: 56px 56px;
  box-shadow: 0 8px 22px rgba(0,0,0,0.25);
}
.rb-contact-stamp {
  position: absolute;
  top: -28px;
  right: 32px;
  width: 130px;
  height: 130px;
  border: 4px solid #C04668;
  color: #C04668;
  background: rgba(255, 240, 240, 0.5);
  border-radius: 50%;
  display: grid;
  place-items: center;
  text-align: center;
  font-family: 'IBM Plex Mono', monospace;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.14em;
  line-height: 1.2;
  transform: rotate(-12deg);
  pointer-events: none;
}
.rb-contact-stamp-text { padding: 12px; }

.rb-contact-title {
  font-family: 'PT Serif', serif;
  font-weight: 700;
  font-size: clamp(32px, 4.2vw, 48px);
  line-height: 1.1;
  letter-spacing: -0.01em;
  margin: 16px 0;
  color: #1A1916;
}
.rb-contact-text {
  font-family: 'PT Serif', serif;
  font-size: 16px;
  line-height: 1.6;
  color: rgba(26, 25, 22, 0.78);
  max-width: 580px;
  margin: 0 0 28px;
}
.rb-contact-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 18px;
}
.rb-contact-mail {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 16px;
  letter-spacing: 0.04em;
  color: #1A1916;
  text-decoration: none;
  border-bottom: 2px solid #C04668;
  padding-bottom: 2px;
  transition: color 220ms ease, border-color 220ms ease;
}
.rb-contact-mail:hover, .rb-contact-mail:focus-visible {
  outline: none;
  color: #C04668;
  border-bottom-color: #1A1916;
}
.rb-contact-sep { color: rgba(26, 25, 22, 0.4); }
.rb-contact-phone {
  font-family: 'PT Serif', serif;
  font-weight: 700;
  font-size: clamp(28px, 4vw, 40px);
  letter-spacing: 0.04em;
  color: #1A1916;
  text-decoration: none;
  transition: color 220ms ease;
}
.rb-contact-phone:hover, .rb-contact-phone:focus-visible {
  outline: none;
  color: #C04668;
}

/* FOOTER */
.rb-footer {
  position: relative;
  z-index: 2;
  border-top: 1px solid rgba(239, 232, 214, 0.2);
  padding: 22px 4px 4px;
  margin-top: 36px;
}
.rb-footer-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 14px;
}
.rb-footer-stub {
  font-family: 'IBM Plex Mono', monospace;
  font-size: 10px;
  letter-spacing: 0.22em;
  color: rgba(239, 232, 214, 0.78);
  border: 1px solid rgba(239, 232, 214, 0.25);
  padding: 4px 10px;
}
.rb-footer-credit {
  font-family: 'PT Serif', serif;
  font-style: italic;
  font-size: 13px;
  color: rgba(239, 232, 214, 0.55);
  margin: 0;
}

/* RESPONSIVE */
@media (max-width: 980px) {
  .rb-hero { grid-template-columns: 1fr; padding: 40px 22px; }
  .rb-binder { grid-template-columns: 1fr; padding: 14px; }
  .rb-tabs { flex-direction: row; flex-wrap: wrap; padding: 14px; }
  .rb-tab { width: auto; }
  .rb-tab::before { display: none; }
  .rb-rings { display: none; }
  .rb-page-wrap { grid-template-columns: 1fr; }
  .rb-page { padding: 28px; }
  .rb-flag { display: none; }
  .rb-hero-stamp { right: 8px; bottom: -22px; }
  .rb-contact { padding: 40px 24px; }
  .rb-contact-stamp { width: 90px; height: 90px; font-size: 11px; right: 16px; top: -18px; }
}
`;
