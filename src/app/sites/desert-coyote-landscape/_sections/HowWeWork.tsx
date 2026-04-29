import { process } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

export function HowWeWork() {
  return (
    <section id="process" className="dc-proc" aria-labelledby="dc-proc-title">
      <header className="dc-proc__intro">
        <p className="dc-proc__eyebrow">How we work</p>
        <h2 id="dc-proc-title" className="dc-proc__title">Four steps. Plain English.</h2>
        <p className="dc-proc__lede">
          From the first walk-around to the last sprinkler tune. Same crew,
          same standard, every step.
        </p>
      </header>
      <ol className="dc-proc__grid">
        {process.map((p, idx) => (
          <li key={p.slug} className="dc-proc__step">
            <span className="dc-proc__num">{String(p.n).padStart(2, "0")}</span>
            <h3 className="dc-proc__step-title">{p.title}</h3>
            <p className="dc-proc__body">{p.body}</p>
            {idx < process.length - 1 && (
              <span className="dc-proc__rule" aria-hidden="true" />
            )}
          </li>
        ))}
      </ol>
      <p className="dc-proc__cta-line">
        <a href="#quote" className="dc-proc__cta">Start with a free estimate →</a>
      </p>
      <style>{css}</style>
    </section>
  );
}

const css = `
.dc-proc { padding: 7rem 5vw; background: ${palette.sand}; color: ${palette.charcoal}; }
.dc-proc__intro { max-width: 720px; margin: 0 auto 4rem; text-align: center; }
.dc-proc__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.terra}; margin: 0 0 1.25rem; }
.dc-proc__title { font-family: ${fonts.display}; font-size: clamp(2.2rem, 5vw, 3.4rem); font-weight: 400; line-height: 1.1; color: ${palette.saguaro}; margin: 0 0 1.25rem; }
.dc-proc__lede { font-family: ${fonts.display}; font-style: italic; font-size: 1.05rem; line-height: 1.65; color: ${palette.rock}; opacity: 0.85; margin: 0; }
.dc-proc__grid { list-style: none; padding: 0; margin: 0 auto; max-width: 1180px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 0; position: relative; }
.dc-proc__step { padding: 2rem 1.5rem; display: flex; flex-direction: column; gap: 0.75rem; font-family: ${fonts.body}; position: relative; }
.dc-proc__num { font-family: ${fonts.display}; font-size: 3.5rem; font-weight: 400; line-height: 1; color: ${palette.sunGold}; letter-spacing: -0.04em; margin: 0 0 0.5rem; }
.dc-proc__step-title { font-family: ${fonts.display}; font-size: 1.5rem; font-weight: 400; color: ${palette.saguaro}; margin: 0; line-height: 1.2; }
.dc-proc__body { font-family: ${fonts.body}; font-size: 0.95rem; line-height: 1.65; color: ${palette.rock}; opacity: 0.9; margin: 0; }
.dc-proc__rule { position: absolute; right: -0.5px; top: 2.25rem; bottom: 2.25rem; width: 1px; background: rgba(63,53,45,0.18); }
.dc-proc__cta-line { text-align: center; margin: 4rem 0 0; font-family: ${fonts.body}; }
.dc-proc__cta { display: inline-block; padding: 0.95rem 1.75rem; background: ${palette.sunGold}; color: ${palette.charcoal}; text-decoration: none; border-radius: 999px; font-size: 0.85rem; letter-spacing: 0.16em; text-transform: uppercase; font-weight: 600; transition: transform 180ms, box-shadow 180ms; }
.dc-proc__cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px rgba(212,168,87,0.45); }
.dc-proc__cta:focus-visible { outline: 2px solid ${palette.terra}; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .dc-proc__cta { transition: none; }
  .dc-proc__cta:hover { transform: none; }
}
@media (max-width: 920px) {
  .dc-proc__grid { grid-template-columns: 1fr; }
  .dc-proc__step { padding: 1.5rem 0; border-bottom: 1px solid rgba(63,53,45,0.14); }
  .dc-proc__step:last-child { border-bottom: none; }
  .dc-proc__rule { display: none; }
}
`;
