import { materials } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

const TAG_GRADIENTS: Record<string, string> = {
  Stone: `linear-gradient(135deg, ${palette.sandDeep} 0%, ${palette.terra} 100%)`,
  Paver: `linear-gradient(135deg, ${palette.terraDeep} 0%, ${palette.sunGold} 100%)`,
  Turf:  `linear-gradient(135deg, ${palette.sage} 0%, ${palette.saguaro} 100%)`,
  Rock:  `linear-gradient(135deg, ${palette.sandDeep} 0%, ${palette.rock} 100%)`,
  Wall:  `linear-gradient(135deg, ${palette.rock} 0%, ${palette.terraDeep} 100%)`,
};

export function MaterialsLibrary() {
  return (
    <section id="materials" className="dc-mat" aria-labelledby="dc-mat-title">
      <header className="dc-mat__intro">
        <p className="dc-mat__eyebrow">Materials library</p>
        <h2 id="dc-mat-title" className="dc-mat__title">A swatch book of finishes.</h2>
        <p className="dc-mat__lede">
          A small selection of the stones, pavers, and turf we install most.
          Bring an idea, we'll match a finish.
        </p>
      </header>
      <ul className="dc-mat__grid">
        {materials.map((m) => (
          <li key={m.slug} className="dc-mat__card">
            <div
              className="dc-mat__art"
              style={{ background: TAG_GRADIENTS[m.tag] ?? TAG_GRADIENTS.Stone }}
              aria-hidden="true"
            >
              <span className="dc-mat__art-mark">
                {m.title.split(" ").map((w) => w[0]).slice(0, 2).join("")}
              </span>
            </div>
            <p className="dc-mat__tag">{m.tag}</p>
            <h3 className="dc-mat__name">{m.title}</h3>
            <p className="dc-mat__notes">{m.notes}</p>
          </li>
        ))}
      </ul>
      <p className="dc-mat__footer">
        Visit our showroom for full samples — by appointment.
      </p>
      <style>{css}</style>
    </section>
  );
}

const css = `
.dc-mat { padding: 7rem 5vw; background: ${palette.paper}; color: ${palette.charcoal}; }
.dc-mat__intro { max-width: 720px; margin: 0 auto 4rem; text-align: center; }
.dc-mat__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.terra}; margin: 0 0 1.25rem; }
.dc-mat__title { font-family: ${fonts.display}; font-size: clamp(2rem, 4.5vw, 3rem); font-weight: 400; line-height: 1.1; color: ${palette.saguaro}; margin: 0 0 1.25rem; }
.dc-mat__lede { font-family: ${fonts.display}; font-style: italic; font-size: 1rem; line-height: 1.65; color: ${palette.rock}; opacity: 0.85; margin: 0; }
.dc-mat__grid { list-style: none; padding: 0; margin: 0 auto; max-width: 1180px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2.25rem 1.5rem; }
.dc-mat__card { display: flex; flex-direction: column; gap: 0.4rem; font-family: ${fonts.body}; }
.dc-mat__art { aspect-ratio: 4/5; border-radius: 4px; display: flex; align-items: center; justify-content: center; margin: 0 0 0.85rem; color: ${palette.paper}; font-family: ${fonts.display}; font-size: 2.6rem; letter-spacing: -0.03em; opacity: 0.9; }
.dc-mat__art-mark { font-weight: 400; opacity: 0.75; }
.dc-mat__tag { font-size: 0.65rem; letter-spacing: 0.22em; text-transform: uppercase; color: ${palette.terra}; margin: 0; font-weight: 600; }
.dc-mat__name { font-family: ${fonts.display}; font-weight: 400; font-size: 1.1rem; line-height: 1.3; color: ${palette.saguaro}; margin: 0; }
.dc-mat__notes { font-family: ${fonts.body}; font-size: 0.85rem; line-height: 1.55; color: ${palette.rock}; opacity: 0.85; margin: 0; }
.dc-mat__footer { text-align: center; margin: 3.5rem 0 0; font-family: ${fonts.display}; font-style: italic; font-size: 1rem; color: ${palette.terra}; }
@media (max-width: 920px) { .dc-mat__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .dc-mat__grid { grid-template-columns: 1fr; } }
`;
