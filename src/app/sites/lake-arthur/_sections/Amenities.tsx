import { amenities } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

// Four amenities — Grille Room, practice green, pro shop, affordable
// carts. All facts confirmed from lakearthur.com/facilities; voice is
// editorial. Sits between the Scorecard and the Rates sections.

export function Amenities() {
  return (
    <section id="amenities" className="la-am" aria-labelledby="la-am-title">
      <header className="la-am__intro">
        <p className="la-am__eyebrow">
          <span>BEYOND THE GREEN</span>
          <span className="la-am__rule" aria-hidden="true" />
          <span>FOUR · OF · FOUR</span>
        </p>
        <h2 id="la-am-title" className="la-am__title">
          The clubhouse <em>does its share</em> of the work.
        </h2>
      </header>
      <ul className="la-am__grid">
        {amenities.map((a) => (
          <li key={a.slug} className="la-am__card">
            <p className="la-am__card-eyebrow">{a.eyebrow}</p>
            <h3 className="la-am__card-title">{a.title}</h3>
            <p className="la-am__card-body">{a.body}</p>
            <p className="la-am__card-extra">{a.extra}</p>
          </li>
        ))}
      </ul>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-am {
  background: ${palette.paper};
  color: ${palette.ink};
  padding: 6rem 2.5rem 6.5rem;
  font-family: ${fonts.body};
  border-top: 1px solid rgba(22,20,15,0.06);
}
.la-am__intro { max-width: 1180px; margin: 0 auto 3.5rem; display: flex; flex-direction: column; gap: 1.25rem; }
.la-am__eyebrow { display: inline-flex; align-items: center; gap: 0.65rem; font-family: ${fonts.mono}; font-size: 0.65rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.ash}; margin: 0; }
.la-am__rule { display: inline-block; width: 22px; height: 1px; background: currentColor; opacity: 0.45; }
.la-am__title { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(2rem, 4.6vw, 3rem); line-height: 1.05; letter-spacing: -0.018em; margin: 0; max-width: 22ch; }
.la-am__title em { font-style: italic; color: ${palette.moss}; }

.la-am__grid {
  list-style: none; padding: 0; margin: 0 auto;
  max-width: 1180px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
}
.la-am__card {
  display: flex; flex-direction: column; gap: 0.75rem;
  padding: 2.25rem 2rem 2.5rem;
  background: ${palette.bone};
  border: 1px solid rgba(22,20,15,0.08);
  border-radius: 4px;
  transition: border-color 200ms, transform 220ms ${"cubic-bezier(0.22,0.96,0.32,1)"};
}
.la-am__card:hover {
  border-color: ${palette.moss};
  transform: translateY(-2px);
}
.la-am__card-eyebrow { font-family: ${fonts.mono}; font-size: 0.62rem; letter-spacing: 0.28em; text-transform: uppercase; color: ${palette.brick}; margin: 0; }
.la-am__card-title { font-family: ${fonts.display}; font-weight: 400; font-size: 1.7rem; line-height: 1.1; color: ${palette.ink}; margin: 0; max-width: 22ch; }
.la-am__card-body { font-family: ${fonts.body}; font-size: 1rem; line-height: 1.6; color: ${palette.ink}; opacity: 0.85; margin: 0; max-width: 50ch; }
.la-am__card-extra { font-family: ${fonts.display}; font-style: italic; font-size: 0.95rem; line-height: 1.5; color: ${palette.moss}; margin: 0.4rem 0 0; max-width: 50ch; }

@media (prefers-reduced-motion: reduce) { .la-am__card { transition: none; } }
@media (max-width: 920px) {
  .la-am { padding: 4rem 1.25rem 4.5rem; }
  .la-am__grid { grid-template-columns: 1fr; }
  .la-am__card { padding: 1.75rem 1.5rem 2rem; }
}
`;
