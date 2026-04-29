"use client";

import { useState } from "react";
import { palette, fonts } from "../_lib/tokens";

// Five working categories, vertical stack of horizontal "service cards".
// Mono number, big Bricolage title, 2-line body, "What's included →"
// expand pattern (visual only — toggles a list of bullets).

type Service = {
  n: string;
  title: string;
  body: string;
  includes: string[];
};

const SERVICES: Service[] = [
  {
    n: "01",
    title: "Hardscape",
    body:
      "Pavers, travertine, walkways, driveways, walls, curbing. Cut crisp, set on a base built for monsoon and Phoenix heat.",
    includes: [
      "Travertine, paver, and stamped-concrete patios",
      "Walkways, sidewalks, driveways",
      "Block walls (property, retaining, garden)",
      "Continuous-pour concrete curbing",
    ],
  },
  {
    n: "02",
    title: "Softscape",
    body:
      "Sod, artificial turf, rock, gravel, decomposed granite. Graded right, edged right, sized to the architecture.",
    includes: [
      "Tifway hybrid Bermuda sod (winter overseed available)",
      "Premium pet-friendly artificial turf",
      "Decomposed granite, river rock, rip-rap",
      "Color-matched aggregate to the house",
    ],
  },
  {
    n: "03",
    title: "Irrigation",
    body:
      "Drip, bubbler, smart Wi-Fi controllers, full retrofits. Zoned by water need — saves up to 40% over old systems.",
    includes: [
      "New drip and rotor system installs",
      "Smart-controller retrofits (Rachio, Hunter)",
      "Annual valve checks and seasonal tuning",
      "Repair work — mainline, valves, heads",
    ],
  },
  {
    n: "04",
    title: "Trees & Yard",
    body:
      "Mesquite, palo verde, ironwood, citrus. ISA-certified pruning. Weekly to one-time cleanups when you need it gone now.",
    includes: [
      "Tree planting, staking, first-18-month watering plan",
      "ISA-certified pruning and shaping",
      "Weekly, biweekly, monthly yard service",
      "One-time deep cleanups and brush hauling",
    ],
  },
  {
    n: "05",
    title: "Trailer Rental",
    body:
      "16-ft enclosed or 12-ft open utility. Hitch and lights checked before pickup. Half-day, full-day, weekend, and weekly rates.",
    includes: [
      "Half day · 4 hrs",
      "Full day · 8 hrs",
      "Weekend · Fri–Mon",
      "Per-week rate available — ask for pricing",
    ],
  },
];

export function Services() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="services" className="dc2-services" aria-labelledby="dc2-services-title">
      <header className="dc2-services__head">
        <p className="dc2-services__eyebrow">WHAT WE DO</p>
        <h2 id="dc2-services-title" className="dc2-services__title">
          Five things, done right.
        </h2>
        <p className="dc2-services__lede">
          We don't do everything. We do these, and we do them like our name's
          on the truck — because it is.
        </p>
      </header>

      <ol className="dc2-services__list">
        {SERVICES.map((s, i) => {
          const open = openIndex === i;
          return (
            <li key={s.n} className={`dc2-services__item ${open ? "is-open" : ""}`}>
              <button
                type="button"
                className="dc2-services__row"
                aria-expanded={open}
                onClick={() => setOpenIndex(open ? null : i)}
              >
                <span className="dc2-services__num">{s.n}</span>
                <span className="dc2-services__title-row">{s.title}</span>
                <span className="dc2-services__body">{s.body}</span>
                <span className="dc2-services__expand">
                  {open ? "Hide" : "What's included"} <span aria-hidden="true">{open ? "↑" : "→"}</span>
                </span>
              </button>
              {open && (
                <ul className="dc2-services__includes">
                  {s.includes.map((line) => (
                    <li key={line}>{line}</li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ol>

      <style>{css}</style>
    </section>
  );
}

const css = `
.dc2-services {
  padding: 6rem 5vw 7rem;
  background: ${palette.bg};
  color: ${palette.ink};
  font-family: ${fonts.body};
}
.dc2-services__head {
  max-width: 760px;
  margin: 0 auto 4rem;
  text-align: left;
}
.dc2-services__eyebrow {
  font-family: ${fonts.mono};
  font-size: 0.72rem;
  letter-spacing: 0.22em;
  color: ${palette.terra};
  margin: 0 0 1.25rem;
  text-transform: uppercase;
}
.dc2-services__title {
  font-family: ${fonts.display};
  font-weight: 700;
  font-stretch: 80%;
  font-size: clamp(2.4rem, 6vw, 4.2rem);
  line-height: 1;
  letter-spacing: -0.02em;
  margin: 0 0 1.25rem;
  color: ${palette.ink};
}
.dc2-services__lede {
  font-size: 1.05rem;
  line-height: 1.55;
  color: ${palette.ink};
  opacity: 0.78;
  max-width: 56ch;
  margin: 0;
}
.dc2-services__list {
  list-style: none;
  padding: 0;
  margin: 0 auto;
  max-width: 1080px;
  border-top: 1px solid rgba(27,26,23,0.16);
}
.dc2-services__item {
  border-bottom: 1px solid rgba(27,26,23,0.16);
}
.dc2-services__row {
  width: 100%;
  background: transparent;
  border: none;
  text-align: left;
  cursor: pointer;
  display: grid;
  grid-template-columns: 64px minmax(220px, 1.1fr) 2fr auto;
  gap: 2rem;
  align-items: baseline;
  padding: 2rem 0;
  font-family: inherit;
  color: inherit;
  transition: background 160ms ease;
}
.dc2-services__row:hover { background: ${palette.paper}; }
.dc2-services__row:focus-visible { outline: 2px solid ${palette.terra}; outline-offset: -2px; }
.dc2-services__num {
  font-family: ${fonts.mono};
  font-size: 0.85rem;
  letter-spacing: 0.18em;
  color: ${palette.dust};
}
.dc2-services__title-row {
  font-family: ${fonts.display};
  font-weight: 700;
  font-stretch: 80%;
  font-size: clamp(1.6rem, 3.4vw, 2.6rem);
  line-height: 1;
  letter-spacing: -0.015em;
  color: ${palette.ink};
}
.dc2-services__body {
  font-size: 0.98rem;
  line-height: 1.55;
  color: ${palette.ink};
  opacity: 0.78;
  max-width: 60ch;
}
.dc2-services__expand {
  font-family: ${fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${palette.terra};
  white-space: nowrap;
  align-self: center;
}
.dc2-services__includes {
  list-style: none;
  padding: 0 0 2rem 96px;
  margin: 0;
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.6rem 2rem;
}
.dc2-services__includes li {
  font-size: 0.92rem;
  line-height: 1.45;
  color: ${palette.ink};
  opacity: 0.82;
  padding-left: 1rem;
  position: relative;
}
.dc2-services__includes li::before {
  content: "";
  position: absolute; left: 0; top: 0.55em;
  width: 6px; height: 6px;
  background: ${palette.clay};
  border-radius: 1px;
}

@media (max-width: 880px) {
  .dc2-services { padding: 4rem 1.25rem 4.5rem; }
  .dc2-services__row {
    grid-template-columns: 48px 1fr;
    gap: 0.6rem 1rem;
    padding: 1.5rem 0;
  }
  .dc2-services__title-row { grid-column: 2; }
  .dc2-services__body { grid-column: 1 / -1; padding-left: 0; margin-top: 0.4rem; }
  .dc2-services__expand { grid-column: 1 / -1; padding-left: 0; margin-top: 0.6rem; }
  .dc2-services__includes {
    grid-template-columns: 1fr;
    padding: 0 0 1.5rem 0;
  }
}
`;
