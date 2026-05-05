import { rateGroups } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

// Real 2026 rate card. Walking + riding, weekday + weekend + senior.
// All numbers confirmed from lakearthur.com/golf-course/rates.

export function Rates() {
  return (
    <section id="rates" className="la-rt" aria-labelledby="la-rt-title">
      <header className="la-rt__intro">
        <p className="la-rt__eyebrow">
          <span>RATES</span>
          <span className="la-rt__rule" aria-hidden="true" />
          <span>2026 SEASON</span>
        </p>
        <h2 id="la-rt-title" className="la-rt__title">
          Public course pricing. <em>No surprise fees.</em>
        </h2>
        <p className="la-rt__lede">
          Riding rate is greens-plus-cart, all-in. No add-ons at the turn.
          Walking welcome any day. Senior pricing Monday through Friday.
        </p>
      </header>

      <div className="la-rt__groups">
        {rateGroups.map((g) => (
          <div key={g.id} className="la-rt__group">
            <header className="la-rt__group-head">
              <h3 className="la-rt__group-title">{g.title}</h3>
              <p className="la-rt__group-sub">{g.sub}</p>
            </header>
            <table className="la-rt__table" aria-label={`${g.title} rates`}>
              <thead>
                <tr>
                  <th scope="col"></th>
                  <th scope="col">Walking 9</th>
                  <th scope="col">Walking 18</th>
                  <th scope="col">Riding 9</th>
                  <th scope="col">Riding 18</th>
                </tr>
              </thead>
              <tbody>
                {g.rows.map((row) => (
                  <tr key={row.label}>
                    <th scope="row">{row.label}</th>
                    <td className="la-rt__price">{row.walking9.value}</td>
                    <td className="la-rt__price">{row.walking18.value}</td>
                    <td className="la-rt__price">{row.riding9.value}</td>
                    <td className="la-rt__price la-rt__price--feature">{row.riding18.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ))}
      </div>

      <footer className="la-rt__foot">
        <a href="#book" className="la-rt__cta">
          <span>Book your tee time</span>
          <span aria-hidden="true">→</span>
        </a>
        <p className="la-rt__note">
          Rates current for 2026 · subject to change · group and league rates available
        </p>
      </footer>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-rt {
  background: ${palette.bone};
  color: ${palette.ink};
  padding: 6rem 2.5rem;
  font-family: ${fonts.body};
  border-top: 1px solid rgba(22,20,15,0.06);
}
.la-rt__intro { max-width: 1180px; margin: 0 auto 3rem; display: flex; flex-direction: column; gap: 1.1rem; }
.la-rt__eyebrow { display: inline-flex; align-items: center; gap: 0.65rem; font-family: ${fonts.mono}; font-size: 0.65rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.ash}; margin: 0; }
.la-rt__rule { display: inline-block; width: 22px; height: 1px; background: currentColor; opacity: 0.45; }
.la-rt__title { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(2rem, 4.6vw, 3rem); line-height: 1.05; letter-spacing: -0.018em; margin: 0; max-width: 22ch; }
.la-rt__title em { font-style: italic; color: ${palette.moss}; }
.la-rt__lede { font-family: ${fonts.body}; font-size: 1rem; line-height: 1.6; color: ${palette.ink}; opacity: 0.78; max-width: 56ch; margin: 0; }

.la-rt__groups {
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;
}
.la-rt__group {
  background: ${palette.paper};
  border: 1px solid rgba(22,20,15,0.1);
  border-radius: 6px;
  overflow: hidden;
}
.la-rt__group-head {
  padding: 1.5rem 1.75rem 1rem;
  border-bottom: 1px solid rgba(22,20,15,0.06);
}
.la-rt__group-title { font-family: ${fonts.display}; font-weight: 400; font-size: 1.6rem; line-height: 1; margin: 0; color: ${palette.moss}; }
.la-rt__group-sub { font-family: ${fonts.mono}; font-size: 0.68rem; letter-spacing: 0.22em; text-transform: uppercase; color: ${palette.ash}; margin: 0.4rem 0 0; }

.la-rt__table { width: 100%; border-collapse: collapse; font-family: ${fonts.mono}; font-size: 0.92rem; }
.la-rt__table thead th {
  font-family: ${fonts.mono};
  font-size: 0.6rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  text-align: right;
  color: ${palette.ash};
  font-weight: 500;
  padding: 0.85rem 1rem 0.7rem;
  border-bottom: 1px solid rgba(22,20,15,0.08);
}
.la-rt__table thead th:first-child { text-align: left; padding-left: 1.75rem; }
.la-rt__table tbody th {
  text-align: left;
  padding: 1.05rem 1.75rem;
  font-family: ${fonts.body};
  font-size: 0.8rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: ${palette.ash};
  font-weight: 500;
  border-bottom: 1px solid rgba(22,20,15,0.06);
}
.la-rt__table tbody td {
  padding: 1.05rem 1rem;
  text-align: right;
  border-bottom: 1px solid rgba(22,20,15,0.06);
  font-variant-numeric: tabular-nums;
}
.la-rt__table tbody tr:last-child th, .la-rt__table tbody tr:last-child td { border-bottom: none; }
.la-rt__table tbody tr:hover td { background: rgba(184,111,92,0.05); }
.la-rt__price { font-family: ${fonts.display}; font-size: 1.15rem; color: ${palette.ink}; font-weight: 400; }
.la-rt__price--feature { color: ${palette.moss}; font-weight: 500; }

.la-rt__foot {
  max-width: 1180px;
  margin: 2.5rem auto 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1.5rem;
  flex-wrap: wrap;
}
.la-rt__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  background: ${palette.moss};
  color: ${palette.bone};
  font-family: ${fonts.mono};
  font-size: 0.74rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  padding: 1rem 1.7rem;
  border-radius: 999px;
  text-decoration: none;
  transition: background 200ms, transform 200ms;
}
.la-rt__cta:hover { background: ${palette.mossDeep}; transform: translateY(-1px); }
.la-rt__cta:focus-visible { outline: 2px solid ${palette.brick}; outline-offset: 3px; }
.la-rt__note { font-family: ${fonts.mono}; font-size: 0.7rem; letter-spacing: 0.12em; color: ${palette.ash}; margin: 0; }

@media (prefers-reduced-motion: reduce) { .la-rt__cta { transition: none; } }
@media (max-width: 920px) {
  .la-rt { padding: 4rem 1rem 4.5rem; }
  .la-rt__groups { grid-template-columns: 1fr; }
  .la-rt__table { font-size: 0.78rem; }
  .la-rt__table thead th { padding: 0.7rem 0.55rem; }
  .la-rt__table thead th:first-child { padding-left: 1rem; }
  .la-rt__table tbody th { padding: 0.85rem 1rem; font-size: 0.7rem; }
  .la-rt__table tbody td { padding: 0.85rem 0.55rem; }
  .la-rt__price { font-size: 1rem; }
}
`;
