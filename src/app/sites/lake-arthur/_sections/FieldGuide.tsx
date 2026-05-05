import { holes } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

export function FieldGuide() {
  return (
    <section id="field-guide" className="la-fg" aria-labelledby="la-fg-title">
      <header className="la-fg__intro">
        <p className="la-fg__eyebrow">The field guide</p>
        <h2 id="la-fg-title" className="la-fg__title">Eighteen holes, walked.</h2>
        <p className="la-fg__lede">
          A hole-by-hole companion. Each note is a quiet word from the course
          itself — read on the porch the night before, or pulled up on the
          cart path between shots.
        </p>
      </header>
      <ol className="la-fg__list">
        {holes.map((h) => (
          <li key={h.number} className="la-fg__hole">
            <div className="la-fg__numerals">
              <span className="la-fg__num">{String(h.number).padStart(2, "0")}</span>
              <span className="la-fg__par">Par {h.par}</span>
              <span className="la-fg__yards">
                {h.yards.value} yd
                {h.yards.isPlaceholder && <sup title="Placeholder — owner to confirm" className="la-fg__star">*</sup>}
              </span>
            </div>
            <div className="la-fg__copy">
              <h3 className="la-fg__hole-title">{h.title}</h3>
              <p className="la-fg__note">{h.note}</p>
              {h.tip && <p className="la-fg__tip">— {h.tip}</p>}
            </div>
            <div
              className="la-fg__clip"
              data-placeholder-video="true"
              role="img"
              aria-label={`Drone footage placeholder for hole ${h.number}`}
            >
              <span className="la-fg__clip-label">Drone clip · hole {h.number}</span>
            </div>
          </li>
        ))}
      </ol>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-fg { padding: 7rem 5vw 8rem; background: ${palette.paper}; color: ${palette.charcoal}; }
.la-fg__intro { max-width: 720px; margin: 0 auto 5rem; text-align: center; }
.la-fg__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.fairway}; margin: 0 0 1.5rem; }
.la-fg__title { font-family: ${fonts.display}; font-size: clamp(2.2rem, 5vw, 3.4rem); font-weight: 400; letter-spacing: -0.01em; line-height: 1.1; color: ${palette.water}; margin: 0 0 1.25rem; }
.la-fg__lede { font-family: ${fonts.display}; font-style: italic; color: ${palette.smoke}; font-size: 1.1rem; line-height: 1.6; margin: 0; }
.la-fg__list { list-style: none; padding: 0; margin: 0; max-width: 1100px; margin: 0 auto; display: flex; flex-direction: column; gap: 4rem; }
.la-fg__hole { display: grid; grid-template-columns: 200px 1fr 280px; gap: 3.5rem; align-items: start; padding-bottom: 4rem; border-bottom: 1px solid rgba(26,26,26,0.1); }
.la-fg__hole:last-child { border-bottom: none; }
.la-fg__numerals { display: flex; flex-direction: column; gap: 0.4rem; align-items: flex-start; }
.la-fg__num { font-family: ${fonts.display}; font-size: 5rem; font-weight: 400; line-height: 1; color: ${palette.dawn}; letter-spacing: -0.04em; }
.la-fg__par { font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.24em; text-transform: uppercase; color: ${palette.fairway}; font-weight: 600; }
.la-fg__yards { font-family: ${fonts.body}; font-size: 0.85rem; color: ${palette.smoke}; }
.la-fg__star { color: ${palette.dawn}; }
.la-fg__copy { font-family: ${fonts.body}; }
.la-fg__hole-title { font-family: ${fonts.display}; font-size: 1.85rem; font-weight: 400; color: ${palette.water}; margin: 0.25rem 0 1rem; line-height: 1.15; }
.la-fg__note { font-size: 1rem; line-height: 1.65; margin: 0 0 1rem; color: ${palette.charcoal}; }
.la-fg__tip { font-family: ${fonts.display}; font-style: italic; font-size: 0.92rem; color: ${palette.fairway}; margin: 0; }
.la-fg__clip { width: 100%; aspect-ratio: 16 / 10; background: linear-gradient(135deg, ${palette.fairwayDeep} 0%, ${palette.water} 100%); border-radius: 4px; display: flex; align-items: flex-end; justify-content: flex-start; padding: 1rem; color: ${palette.cream}; opacity: 0.92; }
.la-fg__clip-label { font-family: ${fonts.body}; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.85; }
@media (max-width: 920px) {
  .la-fg__hole { grid-template-columns: 1fr; gap: 1.5rem; }
  .la-fg__numerals { flex-direction: row; align-items: baseline; gap: 1.25rem; }
  .la-fg__num { font-size: 3.5rem; }
}
`;
