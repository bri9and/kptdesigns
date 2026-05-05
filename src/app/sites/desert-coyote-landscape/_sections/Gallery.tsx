import { gallery } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

const TAG_GRADIENTS: Record<string, string> = {
  Hardscape: `linear-gradient(135deg, ${palette.terraDeep} 0%, ${palette.terra} 60%, ${palette.sunGold} 100%)`,
  Softscape: `linear-gradient(135deg, ${palette.sage} 0%, ${palette.saguaro} 100%)`,
};

function gradientForSlug(slug: string, tag: string): string {
  // unique per-slug tints so the grid feels distinct
  const slugTint: Record<string, string> = {
    "courtyard-paver":   `linear-gradient(135deg, ${palette.terraDeep} 0%, ${palette.terra} 70%, ${palette.sunGold} 100%)`,
    "backyard-pet-turf": `linear-gradient(135deg, ${palette.saguaro} 0%, ${palette.sage} 80%, ${palette.sunGold} 100%)`,
    "pool-deck":         `linear-gradient(135deg, ${palette.sky} 0%, ${palette.sandDeep} 70%, ${palette.terra} 100%)`,
    "drought-yard":      `linear-gradient(135deg, ${palette.sage} 0%, ${palette.sandDeep} 70%, ${palette.terra} 100%)`,
    "drive-pavers":      `linear-gradient(135deg, ${palette.rock} 0%, ${palette.terra} 60%, ${palette.sandDeep} 100%)`,
    "outdoor-room":      `linear-gradient(135deg, ${palette.terraDeep} 0%, ${palette.rock} 50%, ${palette.sunGold} 100%)`,
  };
  return slugTint[slug] ?? TAG_GRADIENTS[tag] ?? `linear-gradient(135deg, ${palette.sage} 0%, ${palette.terra} 100%)`;
}

export function Gallery() {
  return (
    <section id="gallery" className="dc-gal" aria-labelledby="dc-gal-title">
      <div className="dc-gal__intro">
        <p className="dc-gal__eyebrow">Recent yards</p>
        <h2 id="dc-gal-title" className="dc-gal__title">Recent yards.</h2>
        <p className="dc-gal__lede">
          A field journal of finished projects across Mesa, Gilbert,
          Chandler, and Queen Creek. Hover for a closer read.
        </p>
        <blockquote className="dc-gal__pull">
          "Same site. Six months later. Photos worth more than copy."
        </blockquote>
      </div>
      <ul className="dc-gal__grid">
        {gallery.map((g) => (
          <li key={g.slug} className="dc-gal__card">
            <div
              className="dc-gal__art"
              style={{ background: gradientForSlug(g.slug, g.tag) }}
              role="img"
              aria-label={`Project image placeholder for ${g.title}`}
            >
              <span className="dc-gal__art-label">{g.slug}</span>
            </div>
            <p className="dc-gal__tag">{g.tag}</p>
            <h3 className="dc-gal__name">{g.title}</h3>
            <p className="dc-gal__brief">{g.brief}</p>
          </li>
        ))}
      </ul>
      <style>{css}</style>
    </section>
  );
}

const css = `
.dc-gal { padding: 7rem 5vw 8rem; background: ${palette.paper}; color: ${palette.charcoal}; display: grid; grid-template-columns: 320px 1fr; gap: 4rem; max-width: 1280px; margin: 0 auto; }
.dc-gal__intro { position: sticky; top: 5rem; align-self: start; }
.dc-gal__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.terra}; margin: 0 0 1.25rem; }
.dc-gal__title { font-family: ${fonts.display}; font-size: clamp(2.2rem, 4vw, 3rem); font-weight: 400; line-height: 1.1; color: ${palette.saguaro}; margin: 0 0 1.25rem; }
.dc-gal__lede { font-family: ${fonts.body}; font-size: 0.95rem; line-height: 1.7; color: ${palette.rock}; opacity: 0.85; margin: 0 0 2rem; }
.dc-gal__pull { font-family: ${fonts.display}; font-style: italic; font-size: 1.05rem; line-height: 1.5; color: ${palette.terra}; margin: 0; padding-left: 1rem; border-left: 2px solid ${palette.sunGold}; }
.dc-gal__grid { list-style: none; padding: 0; margin: 0; display: grid; grid-template-columns: repeat(2, 1fr); gap: 2.25rem 1.75rem; }
.dc-gal__card { display: flex; flex-direction: column; gap: 0.5rem; font-family: ${fonts.body}; transition: transform 220ms cubic-bezier(0.22,0.96,0.32,1), box-shadow 220ms; }
.dc-gal__card:hover { transform: scale(1.02); box-shadow: 0 12px 36px rgba(63,53,45,0.18); }
.dc-gal__art { aspect-ratio: 4 / 3; border-radius: 4px; display: flex; align-items: flex-end; justify-content: flex-start; padding: 1rem; color: ${palette.paper}; opacity: 0.95; margin-bottom: 0.85rem; }
.dc-gal__art-label { font-family: ${fonts.mono}; font-size: 0.68rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.85; }
.dc-gal__tag { font-size: 0.65rem; letter-spacing: 0.22em; text-transform: uppercase; color: ${palette.terra}; margin: 0; font-weight: 600; }
.dc-gal__name { font-family: ${fonts.display}; font-weight: 400; font-size: 1.35rem; line-height: 1.25; color: ${palette.saguaro}; margin: 0; }
.dc-gal__brief { font-family: ${fonts.body}; font-size: 0.92rem; line-height: 1.6; color: ${palette.rock}; opacity: 0.88; margin: 0; }
@media (prefers-reduced-motion: reduce) {
  .dc-gal__card { transition: none; }
  .dc-gal__card:hover { transform: none; }
}
@media (max-width: 920px) {
  .dc-gal { grid-template-columns: 1fr; gap: 2.5rem; }
  .dc-gal__intro { position: static; }
  .dc-gal__grid { grid-template-columns: 1fr; }
}
`;
