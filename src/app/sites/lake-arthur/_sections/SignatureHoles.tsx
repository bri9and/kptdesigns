import { signatureHoles } from "../_lib/content";
import { palette, fonts, photos } from "../_lib/tokens";

// Four signature holes — replaces the v1 18-hole field guide.
// 2x2 grid on desktop. Cards rotate through real course photos.

const PHOTOS = [photos.course1, photos.course2, photos.thumbCourse, photos.thumbBook];

export function SignatureHoles() {
  return (
    <section id="signature-holes" className="la-sig" aria-labelledby="la-sig-title">
      <header className="la-sig__intro">
        <p className="la-sig__eyebrow">
          <span>SIGNATURE</span>
          <span className="la-sig__rule" aria-hidden="true" />
          <span>HOLES 03 · 07 · 12 · 18</span>
        </p>
        <h2 id="la-sig-title" className="la-sig__title">
          Four holes that <em>set the round.</em>
        </h2>
      </header>
      <ul className="la-sig__grid">
        {signatureHoles.map((h, i) => (
          <li key={h.number} className="la-sig__card">
            <div className="la-sig__photo-wrap">
              <img
                className="la-sig__photo"
                src={PHOTOS[i % PHOTOS.length]}
                alt={`Hole ${h.number} — ${h.title}`}
                loading="lazy"
                decoding="async"
              />
              <span className="la-sig__num" aria-hidden="true">
                {String(h.number).padStart(2, "0")}
              </span>
            </div>
            <div className="la-sig__body">
              <p className="la-sig__meta">
                <span>PAR {h.par}</span>
                <span className="la-sig__meta-rule" aria-hidden="true" />
                <span>{h.yards.value} YD</span>
              </p>
              <h3 className="la-sig__card-title">{h.title}</h3>
              <p className="la-sig__note">{h.note}</p>
            </div>
          </li>
        ))}
      </ul>
      <p className="la-sig__cta-row">
        <a href="#book" className="la-sig__cta">View the full scorecard →</a>
      </p>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-sig {
  background: ${palette.bone};
  color: ${palette.ink};
  padding: 6rem 2.5rem;
  font-family: ${fonts.body};
  border-top: 1px solid rgba(22,20,15,0.06);
}
.la-sig__intro {
  max-width: 1180px; margin: 0 auto 3rem;
  display: flex; flex-direction: column; gap: 1.25rem;
}
.la-sig__eyebrow {
  display: inline-flex; align-items: center; flex-wrap: wrap; gap: 0.65rem;
  font-family: ${fonts.mono}; font-size: 0.65rem; letter-spacing: 0.32em; text-transform: uppercase;
  color: ${palette.ash}; margin: 0;
}
.la-sig__rule { display: inline-block; width: 22px; height: 1px; background: currentColor; opacity: 0.45; }
.la-sig__title {
  font-family: ${fonts.display}; font-weight: 400;
  font-size: clamp(2rem, 4.4vw, 3rem); line-height: 1.05;
  letter-spacing: -0.015em; margin: 0; max-width: 18ch;
  font-variation-settings: normal;
}
.la-sig__title em {
  font-style: italic; color: ${palette.moss};
  font-variation-settings: normal;
}
.la-sig__grid {
  list-style: none; padding: 0; margin: 0 auto;
  max-width: 1180px;
  display: grid; grid-template-columns: repeat(2, 1fr); gap: 2.5rem 2rem;
}
.la-sig__card { display: flex; flex-direction: column; gap: 1.25rem; }
.la-sig__photo-wrap {
  position: relative; aspect-ratio: 4/3;
  background: ${palette.paperDeep}; overflow: hidden; border-radius: 2px;
}
.la-sig__photo {
  width: 100%; height: 100%; object-fit: cover; display: block;
  filter: saturate(1.04);
  transition: transform 700ms ${"cubic-bezier(0.22,0.96,0.32,1)"};
}
.la-sig__card:hover .la-sig__photo { transform: scale(1.03); }
.la-sig__num {
  position: absolute; left: 1rem; bottom: 1rem;
  font-family: ${fonts.mono}; font-weight: 500;
  font-size: clamp(2.4rem, 5vw, 3.6rem); line-height: 1;
  color: ${palette.bone};
  text-shadow: 0 2px 18px rgba(22,20,15,0.45);
  letter-spacing: -0.02em;
}
.la-sig__body { display: flex; flex-direction: column; gap: 0.6rem; }
.la-sig__meta {
  display: inline-flex; align-items: center; gap: 0.65rem;
  font-family: ${fonts.mono}; font-size: 0.62rem; letter-spacing: 0.24em; text-transform: uppercase;
  color: ${palette.ash}; margin: 0;
}
.la-sig__meta-rule { display: inline-block; width: 18px; height: 1px; background: currentColor; opacity: 0.45; }
.la-sig__card-title {
  font-family: ${fonts.display}; font-weight: 500;
  font-size: 1.55rem; line-height: 1.15; margin: 0;
  color: ${palette.moss};
  font-variation-settings: normal;
}
.la-sig__note {
  font-family: ${fonts.body}; font-size: 0.96rem; line-height: 1.6;
  color: ${palette.ink}; opacity: 0.78; margin: 0; max-width: 46ch;
}
.la-sig__cta-row {
  max-width: 1180px; margin: 3rem auto 0;
  text-align: center;
}
.la-sig__cta {
  font-family: ${fonts.mono}; font-size: 0.72rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: ${palette.moss}; text-decoration: none;
  border-bottom: 1px solid currentColor; padding-bottom: 0.2rem;
  transition: color 180ms;
}
.la-sig__cta:hover { color: ${palette.ink}; }
.la-sig__cta:focus-visible { outline: 2px solid ${palette.brick}; outline-offset: 4px; }
@media (prefers-reduced-motion: reduce) {
  .la-sig__photo { transition: none; transform: none; }
}
@media (max-width: 920px) {
  .la-sig { padding: 4rem 1.25rem; }
  .la-sig__grid { grid-template-columns: 1fr; gap: 2.5rem; }
}
`;
