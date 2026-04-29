import { heritage } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

export function Heritage() {
  return (
    <section id="heritage" className="la-her" aria-labelledby="la-her-title">
      <div className="la-her__inner">
        <header className="la-her__intro">
          <p className="la-her__eyebrow">
            <span>HERITAGE</span>
            <span className="la-her__rule" aria-hidden="true" />
            <span>{heritage.era.value.toUpperCase()}</span>
          </p>
          <h2 id="la-her-title" className="la-her__title">
            Sixty seasons on <em>the same eighteen holes.</em>
          </h2>
          <p className="la-her__lede">{heritage.intro}</p>
        </header>

        <ol className="la-her__timeline" aria-label="Course milestones">
          {heritage.milestones.map((m) => (
            <li key={String(m.year.value)} className="la-her__milestone">
              <span className="la-her__year">{m.year.value}</span>
              <span className="la-her__bar" aria-hidden="true" />
              <span className="la-her__note">{m.note.value}</span>
            </li>
          ))}
        </ol>

        <figure className="la-her__art">
          <img
            className="la-her__photo"
            src={heritage.photo}
            alt="A view of the Lake Arthur course in season"
            loading="lazy"
            decoding="async"
          />
          <figcaption className="la-her__caption">
            <span className="la-her__caption-tag">FROM THE ARCHIVE</span>
            <blockquote className="la-her__pull">{heritage.pull}</blockquote>
          </figcaption>
        </figure>
      </div>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-her {
  background: ${palette.paper};
  color: ${palette.ink};
  padding: 6rem 2.5rem;
  font-family: ${fonts.body};
  border-top: 1px solid rgba(22,20,15,0.06);
}
.la-her__inner {
  max-width: 1180px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  grid-template-rows: auto auto;
  gap: 2.5rem 4rem;
  align-items: start;
}
.la-her__intro { grid-column: 1; grid-row: 1; display: flex; flex-direction: column; gap: 1.25rem; max-width: 36rem; }
.la-her__eyebrow {
  display: inline-flex; align-items: center; gap: 0.65rem;
  font-family: ${fonts.mono}; font-size: 0.65rem; letter-spacing: 0.32em; text-transform: uppercase;
  color: ${palette.ash}; margin: 0;
}
.la-her__rule { display: inline-block; width: 22px; height: 1px; background: currentColor; opacity: 0.45; }
.la-her__title {
  font-family: ${fonts.display};
  font-weight: 400;
  font-size: clamp(2rem, 4.4vw, 3rem);
  line-height: 1.06;
  letter-spacing: -0.018em;
  margin: 0;
  font-variation-settings: "opsz" 144, "SOFT" 30;
  max-width: 18ch;
}
.la-her__title em { font-style: italic; color: ${palette.moss}; font-variation-settings: "opsz" 96, "SOFT" 70; }
.la-her__lede { font-family: ${fonts.body}; font-size: 1rem; line-height: 1.6; color: ${palette.ink}; opacity: 0.78; margin: 0; max-width: 38ch; }

.la-her__timeline {
  grid-column: 1; grid-row: 2;
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-direction: column;
  border-top: 1px solid rgba(22,20,15,0.12);
}
.la-her__milestone {
  display: grid;
  grid-template-columns: 5rem 1fr;
  align-items: baseline;
  gap: 1.25rem;
  padding: 1rem 0;
  border-bottom: 1px solid rgba(22,20,15,0.08);
}
.la-her__year { font-family: ${fonts.mono}; font-size: 0.85rem; letter-spacing: 0.08em; color: ${palette.brick}; }
.la-her__bar { display: none; }
.la-her__note { font-family: ${fonts.display}; font-style: italic; font-size: 1.05rem; line-height: 1.5; color: ${palette.ink}; font-variation-settings: "opsz" 96, "SOFT" 50; }

.la-her__art {
  grid-column: 2; grid-row: 1 / span 2;
  margin: 0;
  position: relative;
  overflow: hidden;
}
.la-her__photo {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  display: block;
  filter: saturate(1.02) sepia(0.06);
}
.la-her__caption {
  margin: 1.25rem 0 0;
  display: flex;
  flex-direction: column;
  gap: 0.65rem;
}
.la-her__caption-tag { font-family: ${fonts.mono}; font-size: 0.6rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.ash}; }
.la-her__pull {
  font-family: ${fonts.display};
  font-style: italic;
  font-size: clamp(1.2rem, 2vw, 1.55rem);
  line-height: 1.3;
  margin: 0;
  color: ${palette.moss};
  border-left: 2px solid ${palette.brick};
  padding-left: 1rem;
  font-variation-settings: "opsz" 96, "SOFT" 80;
}

@media (max-width: 920px) {
  .la-her { padding: 4rem 1.25rem; }
  .la-her__inner { grid-template-columns: 1fr; }
  .la-her__intro { grid-column: 1; grid-row: 1; }
  .la-her__art { grid-column: 1; grid-row: 2; }
  .la-her__timeline { grid-column: 1; grid-row: 3; }
  .la-her__milestone { grid-template-columns: 4rem 1fr; }
}
`;
