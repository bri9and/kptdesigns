"use client";

import { useMemo, useState } from "react";
import { holes, courseStats } from "../_lib/content";
import { palette, fonts, photos } from "../_lib/tokens";

// Interactive scorecard — the centerpiece of the course story. Four tee
// boxes (Blue / White / Gold / Red), 18 holes, totals, course rating.
// Click a tee pill to flip the table; the totals + course rating update.
// All numbers come from the real scorecard data in content.ts (confirmed
// from lakearthur.com/images/SC-1.JPG).

type Tee = "blue" | "white" | "gold" | "red";

type TeeMeta = {
  id: Tee;
  label: string;
  swatch: string;          // visual swatch color
  rating: string;
  totalYards: string;
  par: string;
};

const TEES: TeeMeta[] = [
  { id: "blue",  label: "Blue · Championship", swatch: "#2C5575", rating: courseStats.ratingBlue.value,  totalYards: courseStats.yardageBlue.value,  par: "71" },
  { id: "white", label: "White · Regular",     swatch: "#F4EFDF", rating: courseStats.ratingWhite.value, totalYards: courseStats.yardageWhite.value, par: "71" },
  { id: "gold",  label: "Gold · Senior",       swatch: "#C9A96E", rating: courseStats.ratingGold.value,  totalYards: courseStats.yardageGold.value,  par: "71" },
  { id: "red",   label: "Red · Forward",       swatch: "#A85A3C", rating: courseStats.ratingRed.value,   totalYards: courseStats.yardageRed.value,   par: "72" },
];

function yardsForTee(h: typeof holes[number], tee: Tee): string {
  if (tee === "blue") return h.yardsBlue.value;
  if (tee === "white") return h.yards.value;
  if (tee === "red") return h.yardsRed.value;
  // Gold yardages aren't in the typed Hole shape — derived per hole from
  // the scorecard image. We mirror the row indices here so the toggle
  // stays accurate without changing the type. Source: SC-1.JPG.
  const goldYards = ["318","132","351","290","322","439","319","488","114","288","289","327","164","348","403","468","126","381"];
  return goldYards[h.number - 1];
}

function totalsFor(tee: Tee) {
  let out = 0, inn = 0;
  holes.forEach((h, i) => {
    const y = parseInt(yardsForTee(h, tee).replace(/,/g, ""), 10) || 0;
    if (i < 9) out += y;
    else inn += y;
  });
  return { out, inn, total: out + inn };
}

export function Scorecard() {
  const [tee, setTee] = useState<Tee>("white");
  const meta = TEES.find((t) => t.id === tee)!;
  const totals = useMemo(() => totalsFor(tee), [tee]);

  const out = holes.slice(0, 9);
  const back = holes.slice(9);

  const sumPar = (set: typeof holes) => set.reduce((s, h) => s + h.par, 0);

  return (
    <section id="scorecard" className="la-sc" aria-labelledby="la-sc-title">
      <header className="la-sc__intro">
        <p className="la-sc__eyebrow">
          <span>THE FULL EIGHTEEN</span>
          <span className="la-sc__rule" aria-hidden="true" />
          <span>OFFICIAL SCORECARD</span>
        </p>
        <h2 id="la-sc__title" className="la-sc__title">
          Pick your <em>tees.</em>
        </h2>
        <p className="la-sc__lede">
          Every hole, every yardage, every handicap. Switch between tee boxes
          and the course tells a different story.
        </p>
      </header>

      <div className="la-sc__tees" role="tablist" aria-label="Tee box">
        {TEES.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={t.id === tee}
            className={`la-sc__tee${t.id === tee ? " is-active" : ""}`}
            onClick={() => setTee(t.id)}
          >
            <span className="la-sc__tee-swatch" style={{ background: t.swatch }} aria-hidden="true" />
            <span className="la-sc__tee-label">{t.label}</span>
            <span className="la-sc__tee-meta">{t.totalYards} · {t.rating}</span>
          </button>
        ))}
      </div>

      <div className="la-sc__panel" key={tee}>
        <div className="la-sc__nines">
          {/* Front nine */}
          <table className="la-sc__table" aria-label={`Front nine — ${meta.label} tees`}>
            <thead>
              <tr>
                <th scope="col">Hole</th>
                {out.map((h) => <th key={h.number} scope="col">{h.number}</th>)}
                <th scope="col" className="la-sc__sum">Out</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Yards</th>
                {out.map((h) => <td key={h.number} className="la-sc__yards">{yardsForTee(h, tee)}</td>)}
                <td className="la-sc__sum">{totals.out.toLocaleString()}</td>
              </tr>
              <tr>
                <th scope="row">Par</th>
                {out.map((h) => <td key={h.number}>{h.par}</td>)}
                <td className="la-sc__sum">{sumPar(out)}</td>
              </tr>
              <tr>
                <th scope="row">Hcp</th>
                {out.map((h) => <td key={h.number} className="la-sc__hcp">{h.handicap.value}</td>)}
                <td className="la-sc__sum la-sc__sum--mute">—</td>
              </tr>
            </tbody>
          </table>

          {/* Back nine */}
          <table className="la-sc__table" aria-label={`Back nine — ${meta.label} tees`}>
            <thead>
              <tr>
                <th scope="col">Hole</th>
                {back.map((h) => <th key={h.number} scope="col">{h.number}</th>)}
                <th scope="col" className="la-sc__sum">In</th>
                <th scope="col" className="la-sc__sum la-sc__sum--total">Tot</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row">Yards</th>
                {back.map((h) => <td key={h.number} className="la-sc__yards">{yardsForTee(h, tee)}</td>)}
                <td className="la-sc__sum">{totals.inn.toLocaleString()}</td>
                <td className="la-sc__sum la-sc__sum--total">{totals.total.toLocaleString()}</td>
              </tr>
              <tr>
                <th scope="row">Par</th>
                {back.map((h) => <td key={h.number}>{h.par}</td>)}
                <td className="la-sc__sum">{sumPar(back)}</td>
                <td className="la-sc__sum la-sc__sum--total">{sumPar(holes)}</td>
              </tr>
              <tr>
                <th scope="row">Hcp</th>
                {back.map((h) => <td key={h.number} className="la-sc__hcp">{h.handicap.value}</td>)}
                <td className="la-sc__sum la-sc__sum--mute">—</td>
                <td className="la-sc__sum la-sc__sum--mute">—</td>
              </tr>
            </tbody>
          </table>
        </div>

        <footer className="la-sc__footer">
          <dl className="la-sc__totals">
            <div>
              <dt>Course rating</dt>
              <dd>{meta.rating}</dd>
            </div>
            <div>
              <dt>Total yardage</dt>
              <dd>{meta.totalYards}</dd>
            </div>
            <div>
              <dt>Par</dt>
              <dd>{meta.par}</dd>
            </div>
            <div>
              <dt>Hardest hole</dt>
              <dd>#8 · Hcp 1</dd>
            </div>
          </dl>
          <a className="la-sc__official" href={photos.scorecard} target="_blank" rel="noreferrer">
            <span>View official scorecard image</span>
            <span aria-hidden="true">↗</span>
          </a>
        </footer>
      </div>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-sc {
  background: ${palette.bone};
  color: ${palette.ink};
  padding: 6rem 2.5rem 7rem;
  font-family: ${fonts.body};
  border-top: 1px solid rgba(22,20,15,0.06);
}
.la-sc__intro { max-width: 1180px; margin: 0 auto 2.5rem; display: flex; flex-direction: column; gap: 1rem; }
.la-sc__eyebrow { display: inline-flex; align-items: center; gap: 0.65rem; font-family: ${fonts.mono}; font-size: 0.65rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.ash}; margin: 0; }
.la-sc__rule { display: inline-block; width: 22px; height: 1px; background: currentColor; opacity: 0.45; }
.la-sc__title { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(2rem, 4.6vw, 3.2rem); line-height: 1.05; letter-spacing: -0.018em; margin: 0; max-width: 18ch; }
.la-sc__title em { font-style: italic; color: ${palette.moss}; }
.la-sc__lede { font-family: ${fonts.body}; font-size: 1rem; line-height: 1.6; color: ${palette.ink}; opacity: 0.78; max-width: 50ch; margin: 0; }

.la-sc__tees {
  max-width: 1180px;
  margin: 0 auto 1.5rem;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 0.75rem;
}
.la-sc__tee {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  align-items: flex-start;
  padding: 1rem 1.1rem 1.05rem;
  background: ${palette.paper};
  border: 1px solid rgba(22,20,15,0.12);
  border-radius: 6px;
  cursor: pointer;
  text-align: left;
  font-family: ${fonts.body};
  transition: border-color 200ms ease, transform 220ms ${"cubic-bezier(0.22,0.96,0.32,1)"}, box-shadow 220ms ease;
}
.la-sc__tee:hover { border-color: ${palette.ink}; transform: translateY(-1px); }
.la-sc__tee:focus-visible { outline: 2px solid ${palette.brick}; outline-offset: 2px; }
.la-sc__tee.is-active {
  border-color: ${palette.moss};
  box-shadow: 0 0 0 1px ${palette.moss}, 0 12px 28px rgba(31,55,37,0.12);
  transform: translateY(-1px);
}
.la-sc__tee-swatch {
  width: 36px; height: 6px;
  border-radius: 999px;
  border: 1px solid rgba(22,20,15,0.18);
  display: block;
}
.la-sc__tee-label { font-family: ${fonts.mono}; font-size: 0.7rem; letter-spacing: 0.2em; text-transform: uppercase; color: ${palette.ink}; }
.la-sc__tee-meta { font-family: ${fonts.body}; font-size: 0.85rem; color: ${palette.ash}; letter-spacing: 0; }
.la-sc__tee.is-active .la-sc__tee-meta { color: ${palette.moss}; font-weight: 500; }

.la-sc__panel {
  max-width: 1180px;
  margin: 0 auto;
  background: ${palette.paper};
  border: 1px solid rgba(22,20,15,0.1);
  border-radius: 6px;
  overflow: hidden;
  animation: la-sc-fade 320ms ${"cubic-bezier(0.22,0.96,0.32,1)"};
}
@keyframes la-sc-fade {
  from { opacity: 0; transform: translateY(4px); }
  to   { opacity: 1; transform: translateY(0); }
}

.la-sc__nines { display: grid; grid-template-columns: 1fr; gap: 0; }
.la-sc__table {
  width: 100%;
  border-collapse: collapse;
  font-family: ${fonts.mono};
  font-size: 0.95rem;
}
.la-sc__table:first-child { border-bottom: 1px solid rgba(22,20,15,0.08); }
.la-sc__table thead th {
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${palette.ash};
  padding: 0.95rem 0.55rem;
  text-align: center;
  background: ${palette.bone};
  border-bottom: 1px solid rgba(22,20,15,0.12);
  font-weight: 500;
}
.la-sc__table thead th:first-child { text-align: left; padding-left: 1.5rem; min-width: 80px; }
.la-sc__table tbody th {
  text-align: left;
  padding: 0.85rem 1.5rem;
  font-family: ${fonts.body};
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${palette.ash};
  font-weight: 500;
  background: ${palette.bone};
  border-bottom: 1px solid rgba(22,20,15,0.06);
}
.la-sc__table tbody td {
  padding: 0.85rem 0.55rem;
  text-align: center;
  border-bottom: 1px solid rgba(22,20,15,0.06);
  color: ${palette.ink};
  font-variant-numeric: tabular-nums;
}
.la-sc__table tbody tr:last-child td,
.la-sc__table tbody tr:last-child th { border-bottom: none; }
.la-sc__table tbody tr:hover td { background: rgba(184,111,92,0.06); }
.la-sc__yards { font-family: ${fonts.display}; font-size: 1.05rem; color: ${palette.moss}; }
.la-sc__hcp { color: ${palette.brick}; font-weight: 500; }
.la-sc__sum {
  font-family: ${fonts.display};
  font-size: 1.05rem;
  background: rgba(31,55,37,0.06);
  color: ${palette.moss};
  font-weight: 500;
}
.la-sc__sum--total {
  background: ${palette.moss};
  color: ${palette.bone};
}
.la-sc__sum--mute { color: ${palette.ash}; background: rgba(22,20,15,0.04); font-weight: 400; }

.la-sc__footer {
  display: grid;
  grid-template-columns: 1fr auto;
  align-items: end;
  gap: 1.5rem;
  padding: 1.5rem 1.5rem 1.75rem;
  background: ${palette.bone};
  border-top: 1px solid rgba(22,20,15,0.08);
}
.la-sc__totals {
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 1.5rem 2.5rem;
  margin: 0;
}
.la-sc__totals dt { font-family: ${fonts.mono}; font-size: 0.62rem; letter-spacing: 0.22em; text-transform: uppercase; color: ${palette.ash}; margin-bottom: 0.3rem; }
.la-sc__totals dd { font-family: ${fonts.display}; font-size: 1.35rem; letter-spacing: -0.01em; color: ${palette.ink}; margin: 0; }
.la-sc__official {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  font-family: ${fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${palette.moss};
  text-decoration: none;
  padding: 0.65rem 1rem;
  border: 1px solid rgba(31,55,37,0.3);
  border-radius: 999px;
  transition: background 200ms ease, color 200ms ease;
}
.la-sc__official:hover { background: ${palette.moss}; color: ${palette.bone}; border-color: ${palette.moss}; }

@media (prefers-reduced-motion: reduce) {
  .la-sc__panel { animation: none; }
  .la-sc__tee { transition: none; }
}

@media (max-width: 920px) {
  .la-sc { padding: 4rem 1rem 5rem; }
  .la-sc__tees { grid-template-columns: repeat(2, 1fr); }
  .la-sc__table { font-size: 0.78rem; }
  .la-sc__table thead th { padding: 0.7rem 0.3rem; }
  .la-sc__table thead th:first-child { padding-left: 0.85rem; min-width: 60px; }
  .la-sc__table tbody th { padding: 0.65rem 0.85rem; font-size: 0.65rem; }
  .la-sc__table tbody td { padding: 0.65rem 0.3rem; }
  .la-sc__footer { grid-template-columns: 1fr; }
  .la-sc__totals { grid-template-columns: repeat(2, auto); gap: 1rem 2rem; }
}
`;
