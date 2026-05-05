import { meta, stats } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

export function AboutAtAGlance() {
  return (
    <section id="about-at-a-glance" className="dc-glance" aria-labelledby="dc-glance-title">
      <p className="dc-glance__eyebrow">The shop</p>
      <h2 id="dc-glance-title" className="dc-glance__pull">"{meta.pitch}"</h2>
      <ul className="dc-glance__stats">
        {stats.map((s) => (
          <li key={s.label} className={s.accent ? "is-accent" : ""}>
            <span className="dc-glance__stat-value">
              {s.value.value}
              {s.value.isPlaceholder && (
                <sup className="dc-glance__placeholder" title="Placeholder — owner to confirm">*</sup>
              )}
            </span>
            <span className="dc-glance__stat-label">{s.label}</span>
          </li>
        ))}
      </ul>
      <p className="dc-glance__sig">Family run · East Valley · 2012 →</p>
      <style>{css}</style>
    </section>
  );
}

const css = `
.dc-glance { padding: 8rem 5vw 7rem; background: ${palette.sand}; color: ${palette.charcoal}; text-align: center; }
.dc-glance__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.terra}; margin: 0 0 2.5rem; }
.dc-glance__pull { font-family: ${fonts.display}; font-style: italic; font-weight: 400; font-size: clamp(1.4rem, 3.4vw, 2.4rem); line-height: 1.4; max-width: 30ch; margin: 0 auto 4rem; color: ${palette.rock}; }
.dc-glance__stats { list-style: none; padding: 2.75rem 0; margin: 0 auto 3rem; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2.5rem 2rem; max-width: 920px; border-top: 1px solid rgba(63,53,45,0.22); border-bottom: 1px solid rgba(63,53,45,0.22); }
.dc-glance__stats li { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
.dc-glance__stats li.is-accent .dc-glance__stat-value { color: ${palette.terra}; }
.dc-glance__stat-value { font-family: ${fonts.display}; font-size: clamp(2rem, 4vw, 2.8rem); font-weight: 400; color: ${palette.saguaro}; position: relative; line-height: 1.05; }
.dc-glance__placeholder { color: ${palette.sunGold}; font-family: ${fonts.body}; font-size: 0.6em; vertical-align: super; padding-left: 0.15rem; }
.dc-glance__stat-label { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.24em; text-transform: uppercase; color: ${palette.rock}; opacity: 0.78; max-width: 18ch; line-height: 1.4; }
.dc-glance__sig { font-family: ${fonts.body}; font-size: 0.85rem; letter-spacing: 0.16em; text-transform: uppercase; color: ${palette.terra}; margin: 0; }
@media (max-width: 720px) { .dc-glance__stats { grid-template-columns: repeat(2, 1fr); } }
`;
