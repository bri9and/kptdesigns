"use client";

/**
 * HoneyDoEngine — V68 Honey-Do
 *
 * Refrigerator-magnet ruled checklist. As the user scrolls, the next
 * unchecked item gets a hand-drawn ballpoint check. Hover on a list
 * item briefly reveals its receipt photo. Reduced-motion checks all
 * items immediately.
 *
 * Avoids handyman cliché: no thumbs-up, no smiley mascot, no
 * "we do it all" multi-tool icon. Utilitarian, ruled, plain.
 */

import { useEffect, useState } from "react";

type Job = {
  id: string;
  task: string;
  detail: string;
  flat: string;
  unit: string;
  receipt: string;
};

const TODAYS_LIST: Job[] = [
  {
    id: "fan",
    task: "Hang the bedroom ceiling fan",
    detail: "5-blade, downrod, light kit. Remote balance after install.",
    flat: "$210",
    unit: "flat",
    receipt: "Hampton Bay 52in. Brace box swapped. 3-speed remote paired.",
  },
  {
    id: "tub",
    task: "Caulk the upstairs tub",
    detail: "Old silicone razor-cleared. New mildew-resist run all four sides.",
    flat: "$95",
    unit: "flat",
    receipt: "GE Supreme silicone. 24-hr cure. No bath until Sunday.",
  },
  {
    id: "gate",
    task: "Re-hang the side gate",
    detail: "New self-closing hinges. Latch realigned. Plane the binding edge.",
    flat: "$165",
    unit: "flat",
    receipt: "Two D&D Kwik-Fit hinges. 1/8\" planed off the strike side.",
  },
  {
    id: "blinds",
    task: "Mount the kitchen blinds",
    detail: "Inside-mount on the bay. Cord cleat for code on each window.",
    flat: "$140",
    unit: "flat",
    receipt: "Two 2in faux-wood, brackets shimmed level, cleats mounted at 60in.",
  },
  {
    id: "drywall",
    task: "Patch the hallway drywall",
    detail: "Two doorknob holes. California patch, prime, sand, repaint.",
    flat: "$185",
    unit: "flat",
    receipt: "Two 5x5 patches. SW Eggshell to existing color. Two coats.",
  },
];

const FLAT_RATES = [
  { task: "Caulk a tub or shower (perimeter)", price: "$95" },
  { task: "Hang a TV (up to 65in, on a stud wall)", price: "$140" },
  { task: "Replace a toilet (you supply)", price: "$220" },
  { task: "Swap a kitchen faucet (you supply)", price: "$160" },
  { task: "Hang a ceiling fan (replace, no rewire)", price: "$210" },
  { task: "Patch a doorknob hole + paint to match", price: "$95" },
  { task: "Re-hang a sagging interior door", price: "$120" },
  { task: "Replace a garbage disposal (you supply)", price: "$180" },
  { task: "Re-key 4 exterior locks (Kwikset SmartKey)", price: "$85" },
  { task: "Mount a curtain rod (per window)", price: "$45" },
];

const RECEIPTS = [
  { addr: "Apt 4B — Westgate Pl.", date: "04/22", note: "Turnover. Patch + paint, two doorknobs, faucet aerators. Ready by 4pm." },
  { addr: "Apt 12 — Lakeshore Ct.", date: "04/19", note: "Turnover. Caulk tub, blind cord cleats, GFI swap, smoke alarm batteries." },
  { addr: "Apt 7 — Lakeshore Ct.", date: "04/16", note: "Turnover. Three closet doors re-hung, hallway patch, full repaint of bathroom." },
  { addr: "House — Maple St.", date: "04/13", note: "Honey-do day. Ceiling fan, toilet seat, gate hinge, two blinds. 6.5hr." },
  { addr: "Apt 22 — Cedarwood", date: "04/10", note: "Turnover. Disposal swap, P-trap re-cut, dishwasher level, oven push-back." },
  { addr: "House — Pine Hill Rd.", date: "04/06", note: "Mailbox post replaced. Frost-line dig. New 4x4 cedar, set in dry-pak concrete." },
];

const PROPERTY_MGRS = [
  "Westgate Property Group — 14-day turnovers, 22 doors",
  "Lakeshore Apartments — month-end punch lists, 41 doors",
  "Cedarwood Residences — vendor since 2019, 18 doors",
  "Pine Hill Realty — owner-occupied work-orders, on call",
];

export default function HoneyDoEngine() {
  // How many items are checked off based on scroll progress.
  const [checkedCount, setCheckedCount] = useState<number>(0);
  const [hoverIdx, setHoverIdx] = useState<number | null>(null);
  const [reduced, setReduced] = useState<boolean>(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const apply = () => setReduced(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  useEffect(() => {
    if (reduced) {
      setCheckedCount(TODAYS_LIST.length);
      return;
    }
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const t = max > 0 ? Math.min(1, Math.max(0, window.scrollY / max)) : 0;
      // Fill across 0% → 70% scroll so user sees checks accumulate as they
      // make their way down the page.
      const filled = Math.min(
        TODAYS_LIST.length,
        Math.floor((t / 0.7) * TODAYS_LIST.length + 0.0001)
      );
      setCheckedCount(filled);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [reduced]);

  return (
    <>
      <style>{css}</style>
      <div className="hd-shell">
        <div className="hd-fridge-grain" aria-hidden />

        {/* TOP MAGNETS / BRAND */}
        <header className="hd-top">
          <div className="hd-magnet hd-magnet-veg" aria-hidden>
            <span className="hd-magnet-label">PRODUCE</span>
          </div>
          <div className="hd-brand">
            <div className="hd-brand-inner">
              <div className="hd-brand-row">
                <span className="hd-brand-mark" aria-hidden>✓</span>
                <div>
                  <div className="hd-brand-name">DAN PRESCOTT &amp; CO.</div>
                  <div className="hd-brand-meta">
                    HOME REPAIR &middot; SMALL JOBS &middot; LIC. #HM-44721
                  </div>
                </div>
              </div>
            </div>
            <div className="hd-tape hd-tape-tl" aria-hidden />
            <div className="hd-tape hd-tape-tr" aria-hidden />
          </div>
          <nav className="hd-nav">
            <a href="#today" className="hd-link">Today&rsquo;s list</a>
            <a href="#receipts" className="hd-link">Receipts</a>
            <a href="#rates" className="hd-link">Flat rates</a>
            <a href="#turnover" className="hd-link">Turnovers</a>
            <a href="#dispatch" className="hd-link hd-link-call">555&middot;772&middot;1144</a>
          </nav>
        </header>

        {/* HERO — RULED LIST PINNED TO FRIDGE */}
        <section id="today" className="hd-hero">
          <div className="hd-pad-magnet" aria-hidden>
            <span />
          </div>

          <div className="hd-pad">
            <div className="hd-pad-header">
              <div className="hd-pad-stub">SAT, APR 28</div>
              <div className="hd-pad-title">HONEY-DO LIST</div>
              <div className="hd-pad-sub">to do before the in-laws come</div>
            </div>

            <div className="hd-pad-rule" aria-hidden />

            <ol className="hd-pad-list">
              {TODAYS_LIST.map((job, i) => {
                const checked = i < checkedCount;
                return (
                  <li
                    key={job.id}
                    className={`hd-pad-item${checked ? " hd-checked" : ""}`}
                    onMouseEnter={() => setHoverIdx(i)}
                    onMouseLeave={() => setHoverIdx((h) => (h === i ? null : h))}
                    onFocus={() => setHoverIdx(i)}
                    onBlur={() => setHoverIdx((h) => (h === i ? null : h))}
                    tabIndex={0}
                    aria-label={`${job.task} — ${checked ? "done" : "open"}`}
                  >
                    <span className="hd-box" aria-hidden>
                      <svg
                        viewBox="0 0 36 36"
                        className="hd-check-svg"
                        aria-hidden
                      >
                        <path
                          d="M5 19 L14 28 L31 8"
                          fill="none"
                          stroke="#1B3A8A"
                          strokeWidth="3.6"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span className="hd-pad-task">{job.task}</span>
                    <span className="hd-pad-flat">{job.flat}</span>

                    <div className="hd-receipt" role="figure" aria-hidden={hoverIdx !== i}>
                      <div className="hd-receipt-frame">
                        <div className="hd-receipt-tape hd-receipt-tape-l" />
                        <div className="hd-receipt-tape hd-receipt-tape-r" />
                        <div className="hd-receipt-header">
                          {job.detail}
                        </div>
                        <div className="hd-receipt-note">
                          <span className="hd-receipt-stamp">PAID</span>
                          {job.receipt}
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
            </ol>

            <div className="hd-pad-foot">
              <div className="hd-pad-foot-row">
                <span>SUBTOTAL (4 ITEMS)</span>
                <span className="hd-pad-num">$610</span>
              </div>
              <div className="hd-pad-foot-row">
                <span>TRIP CHARGE</span>
                <span className="hd-pad-num">$0 (in route)</span>
              </div>
              <div className="hd-pad-foot-row hd-pad-foot-tot">
                <span>DUE SAT</span>
                <span className="hd-pad-num">$610</span>
              </div>
            </div>

            <div className="hd-pad-cta-row">
              <a href="#dispatch" className="hd-cta hd-cta-primary">Add to my list</a>
              <a href="#receipts" className="hd-cta hd-cta-ghost">See the receipts</a>
            </div>

            <div className="hd-pad-tape hd-pad-tape-tl" aria-hidden />
            <div className="hd-pad-tape hd-pad-tape-tr" aria-hidden />
          </div>

          {/* photo magnet — kitchen install */}
          <div className="hd-photo-magnet" aria-hidden>
            <div className="hd-photo">
              <div className="hd-photo-frame">
                <div className="hd-photo-grid">
                  <span /><span /><span /><span /><span /><span />
                </div>
                <div className="hd-photo-caption">
                  Apt 4B turnover &middot; 04/22 &middot; ready by 4pm
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* RECEIPTS */}
        <section id="receipts" className="hd-section">
          <div className="hd-section-head">
            <div className="hd-section-stub">RECEIPTS</div>
            <h2 className="hd-section-title">Last two weeks. No shortcut sentences.</h2>
            <p className="hd-section-lead">
              Every line is a job that closed. Address, date, what we touched.
              The list is short on purpose &mdash; small jobs, done right, paid in 14
              days.
            </p>
          </div>

          <ul className="hd-receipts">
            {RECEIPTS.map((r) => (
              <li key={r.addr + r.date} className="hd-receipt-card" tabIndex={0}>
                <div className="hd-receipt-card-row">
                  <span className="hd-receipt-card-addr">{r.addr}</span>
                  <span className="hd-receipt-card-date">{r.date}</span>
                </div>
                <div className="hd-receipt-card-rule" aria-hidden />
                <div className="hd-receipt-card-note">{r.note}</div>
                <div className="hd-receipt-card-stamp" aria-hidden>PAID 14D</div>
              </li>
            ))}
          </ul>
        </section>

        {/* FLAT RATES */}
        <section id="rates" className="hd-section hd-section-rates">
          <div className="hd-section-head">
            <div className="hd-section-stub">FLAT RATES</div>
            <h2 className="hd-section-title">Common jobs, posted prices.</h2>
            <p className="hd-section-lead">
              No hourly rate creep. If your job is on this list, the price is on
              this list. Off-list work gets a written estimate before we start.
            </p>
          </div>

          <ul className="hd-rates">
            {FLAT_RATES.map((rate, i) => (
              <li key={rate.task} className="hd-rate" tabIndex={0}>
                <span className="hd-rate-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="hd-rate-task">{rate.task}</span>
                <span className="hd-rate-leader" aria-hidden />
                <span className="hd-rate-price">{rate.price}</span>
              </li>
            ))}
          </ul>

          <p className="hd-rates-note">
            Materials at receipt cost. We supply the run-to-the-store time at
            no charge if the run is under 20 minutes from the job.
          </p>
        </section>

        {/* TURNOVERS — PROPERTY MANAGER LIST */}
        <section id="turnover" className="hd-section hd-section-pm">
          <div className="hd-pm-grid">
            <div>
              <div className="hd-section-stub">TURNOVERS</div>
              <h2 className="hd-section-title">
                Where most of the work comes from.
              </h2>
              <p className="hd-section-lead">
                Property managers know what we know: the cheapest unit is one
                that turns in 14 days. We&rsquo;re on the standing list for
                four mid-size PMs. New PM accounts taken when capacity allows.
              </p>
              <ul className="hd-pm-list">
                {PROPERTY_MGRS.map((p) => (
                  <li key={p}>
                    <span className="hd-pm-bullet" aria-hidden />
                    {p}
                  </li>
                ))}
              </ul>
            </div>

            <aside className="hd-pm-card">
              <div className="hd-pm-card-tab">PM PUNCH-LIST RATE</div>
              <div className="hd-pm-card-num">$78<span>/door</span></div>
              <p className="hd-pm-card-note">
                Caulk-and-call standard turn: kitchen + bath caulk lines, two
                blind cord cleats, smoke alarm batteries, every door re-hung
                that sags. Patch &amp; paint billed at flat rate.
              </p>
              <div className="hd-pm-card-rule" aria-hidden />
              <div className="hd-pm-card-foot">
                14-day Net &middot; carbonless invoice book &middot; W-9 on file
              </div>
            </aside>
          </div>
        </section>

        {/* DISPATCH */}
        <section id="dispatch" className="hd-section hd-section-dispatch">
          <div className="hd-card-magnet">
            <div className="hd-card-tape hd-card-tape-l" aria-hidden />
            <div className="hd-card-tape hd-card-tape-r" aria-hidden />
            <div className="hd-card-photo">
              <div className="hd-card-photo-grid">
                <span /><span /><span /><span />
              </div>
            </div>
            <div className="hd-card-body">
              <div className="hd-card-name">DAN PRESCOTT</div>
              <div className="hd-card-role">handyman, lic. HM-44721</div>
              <div className="hd-card-rule" aria-hidden />
              <a href="tel:5557721144" className="hd-card-phone">555&middot;772&middot;1144</a>
              <div className="hd-card-meta">
                Mon&ndash;Fri 7a&ndash;5p &middot; small-job mode &middot; weekend windows by request
              </div>
              <div className="hd-card-meta hd-card-meta-faded">
                stick this one to the fridge
              </div>
            </div>
          </div>
        </section>

        {/* FOOTER */}
        <footer className="hd-footer">
          <div className="hd-footer-row">
            <span className="hd-footer-stub">LIC. HM-44721</span>
            <span className="hd-footer-stub">INS. — STATE FARM HM-2208</span>
            <span className="hd-footer-stub">EPA RRP CERTIFIED FOR PRE-1978</span>
            <span className="hd-footer-stub">W-9 ON FILE</span>
          </div>
          <p className="hd-footer-credit">
            Written on the back of a yellow-copy invoice book at the kitchen
            table, 7:14 pm, dog asleep on the linoleum. &copy; 2026 Dan Prescott
            &amp; Co.
          </p>
        </footer>
      </div>
    </>
  );
}

const css = `
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Caveat:wght@500;700&family=Special+Elite&display=swap');

.hd-shell {
  position: relative;
  min-height: 100vh;
  background: #F5F2EA;
  color: #1B1B1B;
  font-family: 'Inter', system-ui, sans-serif;
  padding: 28px 28px 56px;
  isolation: isolate;
  overflow: hidden;
}

.hd-fridge-grain {
  position: fixed;
  inset: 0;
  background:
    repeating-linear-gradient(0deg, rgba(0,0,0,0.012) 0 1px, transparent 1px 4px),
    repeating-linear-gradient(90deg, rgba(0,0,0,0.018) 0 1px, transparent 1px 6px),
    radial-gradient(ellipse 80% 50% at 30% 20%, rgba(255,255,255,0.6) 0%, transparent 70%),
    radial-gradient(ellipse 60% 40% at 80% 80%, rgba(0,0,0,0.04) 0%, transparent 70%);
  z-index: -2;
  pointer-events: none;
}

/* TOP NAV */
.hd-top {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 100px 1fr auto;
  align-items: center;
  gap: 22px;
  padding-bottom: 22px;
  border-bottom: 1.5px dashed rgba(27,27,27,0.18);
  margin-bottom: 32px;
}

.hd-magnet {
  width: 84px; height: 84px;
  background: #C32921;
  color: #F5F2EA;
  display: grid;
  place-items: center;
  position: relative;
  transform: rotate(-7deg);
  box-shadow:
    0 1px 0 rgba(0,0,0,0.08),
    0 6px 14px rgba(0,0,0,0.18),
    inset 0 -3px 0 rgba(0,0,0,0.18);
  border-radius: 4px;
}
.hd-magnet::before {
  content: '';
  position: absolute;
  inset: 4px;
  border: 1px dashed rgba(245,242,234,0.5);
  border-radius: 2px;
  pointer-events: none;
}
.hd-magnet-label {
  font-family: 'Special Elite', 'Inter', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  font-weight: 700;
  text-align: center;
}

.hd-brand {
  position: relative;
  background: #FBFAF6;
  border: 1px solid rgba(0,0,0,0.12);
  padding: 14px 18px;
  box-shadow:
    0 1px 0 rgba(0,0,0,0.04),
    0 6px 14px rgba(0,0,0,0.08);
  transform: rotate(-0.3deg);
  max-width: 480px;
  justify-self: start;
}
.hd-brand-inner { position: relative; z-index: 2; }
.hd-brand-row { display: flex; align-items: center; gap: 12px; }
.hd-brand-mark {
  width: 30px; height: 30px;
  border: 2px solid #1B3A8A;
  display: grid; place-items: center;
  font-family: 'Caveat', cursive;
  font-weight: 700;
  font-size: 28px;
  color: #1B3A8A;
  line-height: 1;
}
.hd-brand-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 14px;
  letter-spacing: 0.16em;
  color: #1B1B1B;
}
.hd-brand-meta {
  font-family: 'Inter', sans-serif;
  font-size: 10px;
  letter-spacing: 0.18em;
  color: rgba(27,27,27,0.6);
  margin-top: 2px;
}
.hd-tape {
  position: absolute;
  width: 56px; height: 18px;
  background: rgba(255, 240, 170, 0.55);
  border: 1px solid rgba(180, 150, 60, 0.35);
  z-index: 1;
}
.hd-tape-tl { top: -8px; left: 12px; transform: rotate(-8deg); }
.hd-tape-tr { top: -8px; right: 12px; transform: rotate(7deg); }

.hd-nav {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 18px;
  justify-self: end;
}
.hd-link {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: rgba(27,27,27,0.78);
  text-decoration: none;
  font-weight: 600;
  position: relative;
  padding: 4px 2px;
  transition: color 200ms ease;
}
.hd-link::after {
  content: '';
  position: absolute;
  left: 0; right: 0; bottom: -2px;
  height: 2px;
  background: #C32921;
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 220ms ease;
}
.hd-link:hover, .hd-link:focus-visible {
  color: #C32921;
  outline: none;
}
.hd-link:hover::after, .hd-link:focus-visible::after { transform: scaleX(1); }
.hd-link-call {
  font-family: 'Special Elite', 'Inter', monospace;
  font-size: 14px;
  letter-spacing: 0.06em;
  border: 1.5px solid #1B3A8A;
  color: #1B3A8A;
  padding: 6px 10px;
}
.hd-link-call::after { display: none; }
.hd-link-call:hover, .hd-link-call:focus-visible {
  background: #1B3A8A;
  color: #F5F2EA;
}
@media (prefers-reduced-motion: reduce) {
  .hd-link::after { transition: none; }
}

/* HERO PAD */
.hd-hero {
  position: relative;
  z-index: 2;
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 56px;
  padding: 32px 12px 80px;
}
.hd-pad-magnet {
  position: absolute;
  top: 8px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 4;
}
.hd-pad-magnet span {
  display: block;
  width: 36px; height: 36px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #f7f7f7, #b8b8b8 70%, #6a6a6a);
  box-shadow: 0 4px 8px rgba(0,0,0,0.25), inset 0 -2px 0 rgba(0,0,0,0.15);
}

.hd-pad {
  position: relative;
  background: #FCFAF1;
  background-image:
    repeating-linear-gradient(180deg, transparent 0 39px, #B8C7D9 39px 40px);
  background-position: 0 64px;
  border: 1px solid rgba(0,0,0,0.14);
  padding: 32px 36px 28px;
  box-shadow:
    0 1px 0 rgba(0,0,0,0.05),
    0 16px 32px rgba(0,0,0,0.18);
  transform: rotate(-0.4deg);
}
.hd-pad::before {
  /* red margin line */
  content: '';
  position: absolute;
  left: 64px; top: 0; bottom: 0;
  width: 1.5px;
  background: rgba(195, 41, 33, 0.65);
}
.hd-pad-tape {
  position: absolute;
  width: 96px; height: 22px;
  background: rgba(255, 240, 160, 0.55);
  border: 1px solid rgba(180, 150, 60, 0.3);
  z-index: 5;
}
.hd-pad-tape-tl { top: -10px; left: 18%; transform: rotate(-6deg); }
.hd-pad-tape-tr { top: -10px; right: 18%; transform: rotate(6deg); }

.hd-pad-header {
  display: flex;
  align-items: baseline;
  gap: 18px;
  margin-bottom: 14px;
  padding-left: 18px;
  flex-wrap: wrap;
}
.hd-pad-stub {
  font-family: 'Special Elite', 'Inter', monospace;
  font-size: 12px;
  letter-spacing: 0.18em;
  color: #C32921;
  border: 1px solid rgba(195, 41, 33, 0.45);
  padding: 3px 8px;
}
.hd-pad-title {
  font-family: 'Caveat', cursive;
  font-weight: 700;
  font-size: clamp(40px, 5.6vw, 64px);
  color: #C32921;
  line-height: 1;
  letter-spacing: 0.01em;
}
.hd-pad-sub {
  font-family: 'Caveat', cursive;
  font-weight: 500;
  font-size: 22px;
  color: rgba(27,27,27,0.7);
  font-style: italic;
}
.hd-pad-rule {
  height: 0;
  border-top: 2px solid rgba(27,27,27,0.85);
  margin: 6px 0 14px;
}

/* LIST */
.hd-pad-list {
  list-style: none;
  margin: 0;
  padding: 0 0 0 18px;
  counter-reset: hd 0;
}
.hd-pad-item {
  position: relative;
  display: grid;
  grid-template-columns: 36px 1fr auto;
  align-items: end;
  gap: 12px;
  height: 80px;
  padding-bottom: 6px;
  cursor: default;
  outline: none;
  transition: background 220ms ease;
}
.hd-pad-item:focus-visible {
  background: rgba(27,58,138,0.06);
}
.hd-box {
  width: 30px; height: 30px;
  border: 2.4px solid #1B1B1B;
  position: relative;
  flex-shrink: 0;
  align-self: end;
  margin-bottom: 8px;
  background: rgba(255,255,255,0.6);
}
.hd-check-svg {
  position: absolute;
  inset: -6px;
  width: calc(100% + 12px);
  height: calc(100% + 12px);
  opacity: 0;
  transform: scale(0.8) rotate(-6deg);
  transform-origin: 35% 75%;
  transition: opacity 320ms ease, transform 380ms cubic-bezier(0.34, 1.56, 0.64, 1);
}
.hd-check-svg path {
  stroke-dasharray: 60;
  stroke-dashoffset: 60;
  transition: stroke-dashoffset 460ms cubic-bezier(0.4, 0.7, 0.3, 1);
}
.hd-checked .hd-check-svg {
  opacity: 1;
  transform: scale(1) rotate(-4deg);
}
.hd-checked .hd-check-svg path {
  stroke-dashoffset: 0;
}
@media (prefers-reduced-motion: reduce) {
  .hd-check-svg { transition: none; }
  .hd-check-svg path { transition: none; stroke-dashoffset: 0; }
}
.hd-pad-task {
  font-family: 'Inter', sans-serif;
  font-weight: 500;
  font-size: clamp(20px, 2.4vw, 28px);
  color: #1B1B1B;
  align-self: end;
  position: relative;
  margin-bottom: 8px;
  letter-spacing: -0.005em;
}
.hd-checked .hd-pad-task {
  color: rgba(27,27,27,0.55);
}
.hd-checked .hd-pad-task::after {
  content: '';
  position: absolute;
  left: -2px; right: -4px;
  top: 52%;
  height: 2px;
  background: #1B3A8A;
  transform: scaleX(1);
  transform-origin: left;
  animation: hd-strike 380ms ease-out 80ms both;
}
@keyframes hd-strike {
  from { transform: scaleX(0); }
  to { transform: scaleX(1); }
}
@media (prefers-reduced-motion: reduce) {
  .hd-checked .hd-pad-task::after { animation: none; }
}
.hd-pad-flat {
  font-family: 'Special Elite', 'Inter', monospace;
  font-size: 16px;
  color: #C32921;
  align-self: end;
  margin-bottom: 8px;
  letter-spacing: 0.04em;
}

/* RECEIPT REVEAL ON HOVER */
.hd-receipt {
  position: absolute;
  top: -8px;
  right: -16px;
  z-index: 8;
  width: 280px;
  pointer-events: none;
  opacity: 0;
  transform: rotate(2deg) translateY(8px);
  transition: opacity 220ms ease, transform 280ms ease;
}
.hd-pad-item:hover .hd-receipt,
.hd-pad-item:focus-visible .hd-receipt {
  opacity: 1;
  transform: rotate(2deg) translateY(0);
}
.hd-receipt-frame {
  position: relative;
  background: #FFFEF6;
  padding: 14px 16px 16px;
  border: 1px solid rgba(0,0,0,0.18);
  box-shadow: 0 8px 22px rgba(0,0,0,0.22);
  font-family: 'Special Elite', 'Inter', monospace;
}
.hd-receipt-tape {
  position: absolute;
  top: -8px;
  width: 44px; height: 14px;
  background: rgba(255, 240, 160, 0.6);
  border: 1px solid rgba(180,150,60,0.3);
}
.hd-receipt-tape-l { left: 14px; transform: rotate(-6deg); }
.hd-receipt-tape-r { right: 14px; transform: rotate(6deg); }
.hd-receipt-header {
  font-size: 11px;
  letter-spacing: 0.06em;
  color: #1B1B1B;
  margin-bottom: 8px;
  line-height: 1.4;
}
.hd-receipt-note {
  font-size: 11px;
  line-height: 1.4;
  color: rgba(27,27,27,0.78);
  position: relative;
  padding-top: 6px;
  border-top: 1px dashed rgba(27,27,27,0.25);
}
.hd-receipt-stamp {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 9px;
  letter-spacing: 0.22em;
  color: #1B3A8A;
  border: 1.5px solid #1B3A8A;
  padding: 2px 6px;
  margin-right: 8px;
  transform: rotate(-3deg);
  vertical-align: middle;
}
@media (prefers-reduced-motion: reduce) {
  .hd-receipt { transition: none; }
}

/* PAD FOOTER (sub-totals) */
.hd-pad-foot {
  margin-top: 18px;
  padding: 14px 18px 8px;
  border-top: 2px solid rgba(27,27,27,0.85);
}
.hd-pad-foot-row {
  display: flex;
  justify-content: space-between;
  font-family: 'Special Elite', 'Inter', monospace;
  font-size: 13px;
  letter-spacing: 0.06em;
  padding: 4px 0;
  border-bottom: 1px dashed rgba(27,27,27,0.2);
  color: rgba(27,27,27,0.78);
}
.hd-pad-foot-tot {
  font-size: 17px;
  color: #1B1B1B;
  font-weight: 700;
  border-bottom: none;
  padding-top: 8px;
}
.hd-pad-num { color: #C32921; }

.hd-pad-cta-row {
  display: flex;
  flex-wrap: wrap;
  gap: 14px;
  margin-top: 22px;
  padding-left: 18px;
}
.hd-cta {
  font-family: 'Inter', sans-serif;
  font-weight: 600;
  font-size: 13px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-decoration: none;
  padding: 12px 22px;
  border: 2px solid #1B1B1B;
  display: inline-block;
  transition: transform 180ms ease, background 220ms ease, color 220ms ease;
}
.hd-cta-primary {
  background: #1B1B1B;
  color: #F5F2EA;
}
.hd-cta-primary:hover, .hd-cta-primary:focus-visible {
  outline: none;
  background: #C32921;
  border-color: #C32921;
  transform: translateY(-2px);
}
.hd-cta-ghost {
  background: transparent;
  color: #1B1B1B;
}
.hd-cta-ghost:hover, .hd-cta-ghost:focus-visible {
  outline: none;
  background: #1B1B1B;
  color: #F5F2EA;
  transform: translateY(-2px);
}
@media (prefers-reduced-motion: reduce) {
  .hd-cta { transition: background 220ms ease, color 220ms ease; }
}

/* PHOTO MAGNET */
.hd-photo-magnet {
  align-self: start;
  margin-top: 60px;
  transform: rotate(3deg);
  position: relative;
}
.hd-photo {
  position: relative;
  background: #FBFAF6;
  border: 1px solid rgba(0,0,0,0.16);
  padding: 16px 16px 24px;
  box-shadow: 0 14px 28px rgba(0,0,0,0.18);
}
.hd-photo::before {
  content: '';
  position: absolute;
  top: -10px; left: 50%;
  transform: translateX(-50%);
  width: 28px; height: 28px;
  border-radius: 50%;
  background: radial-gradient(circle at 30% 30%, #f3f3f3, #aaa 70%, #555);
  box-shadow: 0 3px 6px rgba(0,0,0,0.25);
}
.hd-photo-frame {
  position: relative;
  height: 280px;
  background:
    linear-gradient(180deg, #d8c8a8 0%, #a89876 50%, #6a5e44 100%);
  display: grid;
  grid-template-rows: 1fr auto;
  overflow: hidden;
}
.hd-photo-grid {
  position: absolute;
  inset: 0;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  background: rgba(0,0,0,0.06);
  gap: 1px;
}
.hd-photo-grid span {
  background:
    radial-gradient(circle at 50% 35%, rgba(255,255,255,0.18), transparent 70%),
    linear-gradient(180deg, rgba(0,0,0,0.05), rgba(0,0,0,0.18));
}
.hd-photo-grid span:nth-child(1) { background-color: #94715a; }
.hd-photo-grid span:nth-child(2) { background-color: #b58e6e; }
.hd-photo-grid span:nth-child(3) { background-color: #6a5034; }
.hd-photo-grid span:nth-child(4) { background-color: #d4b48e; }
.hd-photo-grid span:nth-child(5) { background-color: #50402c; }
.hd-photo-grid span:nth-child(6) { background-color: #8c6f50; }
.hd-photo-caption {
  position: relative;
  z-index: 2;
  align-self: end;
  background: #FBFAF6;
  font-family: 'Caveat', cursive;
  font-size: 18px;
  text-align: center;
  padding: 6px 8px;
  margin: 0 -16px -24px;
  color: #1B1B1B;
}

/* SECTIONS */
.hd-section {
  position: relative;
  z-index: 2;
  padding: 64px 12px 80px;
  border-top: 1.5px dashed rgba(27,27,27,0.18);
}
.hd-section-head { max-width: 720px; margin-bottom: 36px; }
.hd-section-stub {
  display: inline-block;
  font-family: 'Special Elite', 'Inter', monospace;
  font-size: 12px;
  letter-spacing: 0.22em;
  color: #C32921;
  border: 1px solid rgba(195,41,33,0.45);
  padding: 3px 8px;
  margin-bottom: 16px;
}
.hd-section-title {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: clamp(32px, 4.4vw, 52px);
  line-height: 1.05;
  letter-spacing: -0.015em;
  color: #1B1B1B;
  margin: 0 0 14px;
}
.hd-section-lead {
  font-family: 'Inter', sans-serif;
  font-size: 16px;
  line-height: 1.55;
  color: rgba(27,27,27,0.78);
  max-width: 600px;
  margin: 0;
}

/* RECEIPT CARDS GRID */
.hd-receipts {
  list-style: none;
  margin: 0;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 22px;
}
.hd-receipt-card {
  position: relative;
  background: #FFFEF6;
  border: 1px solid rgba(0,0,0,0.16);
  padding: 18px 18px 36px;
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
  outline: none;
  font-family: 'Special Elite', 'Inter', monospace;
  transition: transform 220ms ease, box-shadow 220ms ease;
}
.hd-receipt-card:hover, .hd-receipt-card:focus-visible {
  transform: translateY(-3px) rotate(-0.3deg);
  box-shadow: 0 12px 24px rgba(0,0,0,0.12);
}
.hd-receipt-card-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
}
.hd-receipt-card-addr {
  font-size: 14px;
  color: #1B1B1B;
  letter-spacing: 0.04em;
  font-weight: 700;
}
.hd-receipt-card-date {
  font-size: 12px;
  letter-spacing: 0.16em;
  color: rgba(27,27,27,0.6);
}
.hd-receipt-card-rule {
  border-top: 1px dashed rgba(27,27,27,0.25);
  margin: 10px 0 12px;
}
.hd-receipt-card-note {
  font-family: 'Inter', sans-serif;
  font-size: 13px;
  line-height: 1.55;
  color: rgba(27,27,27,0.85);
}
.hd-receipt-card-stamp {
  position: absolute;
  bottom: 10px;
  right: 12px;
  font-family: 'Inter', sans-serif;
  font-size: 9px;
  letter-spacing: 0.22em;
  color: #1B3A8A;
  border: 1.5px solid #1B3A8A;
  padding: 2px 6px;
  transform: rotate(-3deg);
  font-weight: 700;
}
@media (prefers-reduced-motion: reduce) {
  .hd-receipt-card { transition: none; }
}

/* RATES */
.hd-section-rates {
  background:
    repeating-linear-gradient(180deg, transparent 0 31px, rgba(184, 199, 217, 0.55) 31px 32px);
  background-position: 0 36px;
  margin: 0 -28px;
  padding: 64px 40px 80px;
}
.hd-rates {
  list-style: none;
  margin: 0;
  padding: 0;
  max-width: 880px;
}
.hd-rate {
  display: grid;
  grid-template-columns: 36px 1fr auto auto;
  gap: 12px;
  align-items: end;
  height: 32px;
  padding: 0 4px 4px;
  outline: none;
  transition: background 200ms ease;
  font-family: 'Special Elite', 'Inter', monospace;
}
.hd-rate:hover, .hd-rate:focus-visible {
  background: rgba(195, 41, 33, 0.06);
}
.hd-rate-num {
  font-size: 13px;
  letter-spacing: 0.06em;
  color: rgba(27,27,27,0.5);
}
.hd-rate-task {
  font-size: 14px;
  letter-spacing: 0.02em;
  color: #1B1B1B;
}
.hd-rate-leader {
  border-bottom: 1.5px dotted rgba(27,27,27,0.35);
  height: 1px;
  align-self: end;
  margin-bottom: 6px;
  min-width: 60px;
}
.hd-rate-price {
  font-size: 15px;
  letter-spacing: 0.06em;
  color: #C32921;
  font-weight: 700;
}
.hd-rates-note {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  color: rgba(27,27,27,0.7);
  margin-top: 28px;
  max-width: 720px;
  font-style: italic;
}

/* PROPERTY MANAGER */
.hd-section-pm {
  background: rgba(27,58,138,0.04);
  margin: 0 -28px;
  padding: 64px 40px 80px;
}
.hd-pm-grid {
  display: grid;
  grid-template-columns: 1fr 360px;
  gap: 56px;
  max-width: 1240px;
  margin: 0 auto;
  align-items: start;
}
.hd-pm-list {
  list-style: none;
  margin: 24px 0 0;
  padding: 18px 22px;
  background: #FBFAF6;
  border: 1px solid rgba(0,0,0,0.14);
  box-shadow: 0 4px 12px rgba(0,0,0,0.06);
}
.hd-pm-list li {
  display: flex;
  align-items: center;
  gap: 14px;
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  letter-spacing: 0.02em;
  padding: 10px 0;
  border-bottom: 1px dashed rgba(27,27,27,0.2);
  color: #1B1B1B;
}
.hd-pm-list li:last-child { border-bottom: none; }
.hd-pm-bullet {
  flex-shrink: 0;
  width: 12px; height: 12px;
  background: #1B3A8A;
  border: 1.5px solid #0F2462;
}
.hd-pm-card {
  background: #1B3A8A;
  color: #F5F2EA;
  padding: 28px 26px;
  position: relative;
  transform: rotate(0.5deg);
  box-shadow: 0 14px 28px rgba(0,0,0,0.2);
}
.hd-pm-card-tab {
  display: inline-block;
  font-family: 'Special Elite', 'Inter', monospace;
  font-size: 11px;
  letter-spacing: 0.22em;
  border: 1px solid rgba(245,242,234,0.5);
  padding: 4px 8px;
  margin-bottom: 18px;
}
.hd-pm-card-num {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 64px;
  line-height: 1;
  letter-spacing: -0.02em;
  margin-bottom: 18px;
}
.hd-pm-card-num span {
  font-size: 22px;
  color: rgba(245,242,234,0.7);
  font-weight: 500;
}
.hd-pm-card-note {
  font-family: 'Inter', sans-serif;
  font-size: 14px;
  line-height: 1.55;
  margin: 0 0 18px;
  color: rgba(245,242,234,0.92);
}
.hd-pm-card-rule {
  border-top: 1px dashed rgba(245,242,234,0.4);
  margin: 18px 0 12px;
}
.hd-pm-card-foot {
  font-family: 'Special Elite', 'Inter', monospace;
  font-size: 12px;
  letter-spacing: 0.12em;
  color: rgba(245,242,234,0.85);
}

/* DISPATCH BUSINESS CARD */
.hd-section-dispatch { padding-top: 80px; padding-bottom: 96px; }
.hd-card-magnet {
  position: relative;
  max-width: 540px;
  margin: 0 auto;
  background: #FBFAF6;
  border: 1px solid rgba(0,0,0,0.16);
  padding: 32px 36px 36px;
  box-shadow: 0 18px 36px rgba(0,0,0,0.22);
  transform: rotate(-1deg);
  display: grid;
  grid-template-columns: 120px 1fr;
  gap: 24px;
  align-items: center;
}
.hd-card-tape {
  position: absolute;
  top: -10px;
  width: 96px; height: 22px;
  background: rgba(255, 240, 160, 0.6);
  border: 1px solid rgba(180,150,60,0.3);
  z-index: 1;
}
.hd-card-tape-l { left: 14%; transform: rotate(-7deg); }
.hd-card-tape-r { right: 14%; transform: rotate(7deg); }
.hd-card-photo {
  width: 110px; height: 130px;
  background: linear-gradient(180deg, #d8c8a8, #6a5e44);
  border: 1px solid rgba(0,0,0,0.18);
  position: relative;
  overflow: hidden;
}
.hd-card-photo-grid {
  position: absolute; inset: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  gap: 1px;
}
.hd-card-photo-grid span:nth-child(1) { background: #6a5034; }
.hd-card-photo-grid span:nth-child(2) { background: #94715a; }
.hd-card-photo-grid span:nth-child(3) { background: #b58e6e; }
.hd-card-photo-grid span:nth-child(4) { background: #50402c; }
.hd-card-name {
  font-family: 'Inter', sans-serif;
  font-weight: 700;
  font-size: 22px;
  letter-spacing: 0.04em;
  color: #1B1B1B;
}
.hd-card-role {
  font-family: 'Caveat', cursive;
  font-size: 18px;
  color: rgba(27,27,27,0.7);
  margin-top: 2px;
}
.hd-card-rule {
  border-top: 2px solid rgba(27,27,27,0.85);
  margin: 12px 0;
}
.hd-card-phone {
  font-family: 'Special Elite', 'Inter', monospace;
  font-size: clamp(28px, 4vw, 42px);
  letter-spacing: 0.04em;
  color: #C32921;
  text-decoration: none;
  display: block;
  line-height: 1;
  transition: color 220ms ease, transform 220ms ease;
}
.hd-card-phone:hover, .hd-card-phone:focus-visible {
  outline: none;
  color: #1B3A8A;
  transform: translateX(2px);
}
@media (prefers-reduced-motion: reduce) {
  .hd-card-phone { transition: none; }
}
.hd-card-meta {
  font-family: 'Inter', sans-serif;
  font-size: 12px;
  letter-spacing: 0.12em;
  color: rgba(27,27,27,0.7);
  margin-top: 8px;
}
.hd-card-meta-faded {
  font-family: 'Caveat', cursive;
  font-size: 16px;
  letter-spacing: 0.02em;
  color: rgba(27,27,27,0.5);
  font-style: italic;
  margin-top: 4px;
}

/* FOOTER */
.hd-footer {
  position: relative;
  z-index: 2;
  border-top: 1.5px dashed rgba(27,27,27,0.2);
  padding: 22px 4px 4px;
  margin-top: 56px;
}
.hd-footer-row {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 16px;
}
.hd-footer-stub {
  font-family: 'Special Elite', 'Inter', monospace;
  font-size: 11px;
  letter-spacing: 0.18em;
  color: rgba(27,27,27,0.7);
  border: 1px solid rgba(27,27,27,0.25);
  padding: 4px 8px;
}
.hd-footer-credit {
  font-family: 'Caveat', cursive;
  font-size: 17px;
  color: rgba(27,27,27,0.7);
  margin: 0;
  font-style: italic;
}

/* RESPONSIVE */
@media (max-width: 980px) {
  .hd-hero { grid-template-columns: 1fr; }
  .hd-photo-magnet { transform: rotate(0deg); }
  .hd-pm-grid { grid-template-columns: 1fr; }
  .hd-top { grid-template-columns: 1fr; gap: 14px; }
  .hd-magnet { display: none; }
  .hd-nav { justify-self: start; }
  .hd-card-magnet { grid-template-columns: 1fr; text-align: center; }
  .hd-card-photo { margin: 0 auto; }
}
@media (max-width: 600px) {
  .hd-pad { padding: 24px 22px 22px; }
  .hd-pad::before { left: 38px; }
  .hd-pad-list { padding-left: 0; }
  .hd-pad-item { grid-template-columns: 32px 1fr; }
  .hd-pad-flat { grid-column: 2; justify-self: end; }
  .hd-receipt { display: none; }
}
`;
