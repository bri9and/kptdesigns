import { services, type Service } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

function gradientFor(category: Service["category"]): string {
  switch (category) {
    case "Hardscape":
      return `linear-gradient(135deg, ${palette.terraDeep} 0%, ${palette.terra} 60%, ${palette.saguaro} 100%)`;
    case "Softscape":
      return `linear-gradient(135deg, ${palette.sage} 0%, ${palette.saguaro} 100%)`;
    case "Systems":
      return `linear-gradient(135deg, ${palette.sandDeep} 0%, ${palette.sky} 60%, ${palette.rock} 100%)`;
    case "Yard Care":
      return `linear-gradient(135deg, ${palette.saguaro} 0%, ${palette.sage} 50%, ${palette.sunGold} 100%)`;
  }
}

export function ServiceFieldGuide() {
  return (
    <section id="service-guide" className="dc-fg" aria-labelledby="dc-fg-title">
      <header className="dc-fg__intro">
        <p className="dc-fg__eyebrow">The field guide</p>
        <h2 id="dc-fg-title" className="dc-fg__title">Ten services, walked.</h2>
        <p className="dc-fg__lede">
          A chapter for every line on the estimate. Read the full set, or
          scroll to the one that lives in your yard.
        </p>
      </header>
      <ol className="dc-fg__list">
        {services.map((s) => (
          <li key={s.slug} className="dc-fg__row">
            <div className="dc-fg__numerals">
              <span className="dc-fg__num">{String(s.number).padStart(2, "0")}</span>
              <span className="dc-fg__cat">{s.category}</span>
            </div>
            <div className="dc-fg__copy">
              <h3 className="dc-fg__title-row">{s.title}</h3>
              <p className="dc-fg__note">{s.note}</p>
              {s.tip && <p className="dc-fg__tip">— {s.tip}</p>}
            </div>
            <div
              className="dc-fg__clip"
              style={{ background: gradientFor(s.category) }}
              role="img"
              aria-label={`Project image placeholder for ${s.title}`}
            >
              <span className="dc-fg__clip-label">Project image · {s.slug}</span>
            </div>
          </li>
        ))}
      </ol>
      <style>{css}</style>
    </section>
  );
}

const css = `
.dc-fg { padding: 7rem 5vw 8rem; background: ${palette.paper}; color: ${palette.charcoal}; }
.dc-fg__intro { max-width: 720px; margin: 0 auto 5rem; text-align: center; }
.dc-fg__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.terra}; margin: 0 0 1.5rem; }
.dc-fg__title { font-family: ${fonts.display}; font-size: clamp(2.2rem, 5vw, 3.4rem); font-weight: 400; letter-spacing: -0.01em; line-height: 1.1; color: ${palette.saguaro}; margin: 0 0 1.25rem; }
.dc-fg__lede { font-family: ${fonts.display}; font-style: italic; color: ${palette.rock}; opacity: 0.82; font-size: 1.1rem; line-height: 1.6; margin: 0; }
.dc-fg__list { list-style: none; padding: 0; max-width: 1140px; margin: 0 auto; display: flex; flex-direction: column; gap: 4rem; }
.dc-fg__row { display: grid; grid-template-columns: 200px 1fr 320px; gap: 3.5rem; align-items: start; padding-bottom: 4rem; border-bottom: 1px solid rgba(63,53,45,0.14); }
.dc-fg__row:last-child { border-bottom: none; }
.dc-fg__numerals { display: flex; flex-direction: column; gap: 0.5rem; align-items: flex-start; }
.dc-fg__num { font-family: ${fonts.display}; font-size: 5rem; font-weight: 400; line-height: 1; color: ${palette.sunGold}; letter-spacing: -0.04em; }
.dc-fg__cat { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.24em; text-transform: uppercase; color: ${palette.terra}; font-weight: 600; }
.dc-fg__copy { font-family: ${fonts.body}; }
.dc-fg__title-row { font-family: ${fonts.display}; font-size: 1.85rem; font-weight: 400; color: ${palette.saguaro}; margin: 0.25rem 0 1rem; line-height: 1.2; }
.dc-fg__note { font-size: 1rem; line-height: 1.7; margin: 0 0 1rem; color: ${palette.charcoal}; }
.dc-fg__tip { font-family: ${fonts.display}; font-style: italic; font-size: 0.95rem; color: ${palette.terra}; margin: 0; }
.dc-fg__clip { width: 100%; aspect-ratio: 4 / 3; border-radius: 4px; display: flex; align-items: flex-end; justify-content: flex-start; padding: 1rem; color: ${palette.paper}; opacity: 0.95; }
.dc-fg__clip-label { font-family: ${fonts.body}; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.92; }
@media (max-width: 920px) {
  .dc-fg__row { grid-template-columns: 1fr; gap: 1.5rem; }
  .dc-fg__numerals { flex-direction: row; align-items: baseline; gap: 1.25rem; }
  .dc-fg__num { font-size: 3.5rem; }
}
`;
