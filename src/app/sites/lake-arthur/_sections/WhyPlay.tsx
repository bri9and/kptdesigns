import { whyPlay } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

export function WhyPlay() {
  return (
    <section id="why-play" className="la-why" aria-labelledby="la-why-title">
      <header className="la-why__intro">
        <p className="la-why__eyebrow">WHY PLAY HERE · 03</p>
        <h2 id="la-why-title" className="la-why__title">
          Three reasons to <em>tee it up</em> on Isle Road.
        </h2>
      </header>
      <ul className="la-why__grid">
        {whyPlay.map((w, i) => (
          <li key={w.slug} className="la-why__card">
            <div className="la-why__photo-wrap">
              <img className="la-why__photo" src={w.photo} alt="" loading="lazy" decoding="async" />
              <span className="la-why__photo-tag">{String(i + 1).padStart(2, "0")}</span>
            </div>
            <h3 className="la-why__card-title">{w.title}</h3>
            <p className="la-why__card-body">{w.body}</p>
          </li>
        ))}
      </ul>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-why {
  background: ${palette.bone};
  color: ${palette.ink};
  padding: 6rem 2.5rem;
  font-family: ${fonts.body};
  border-top: 1px solid rgba(22,20,15,0.06);
}
.la-why__intro { max-width: 1180px; margin: 0 auto 3.5rem; display: flex; flex-direction: column; gap: 1.25rem; }
.la-why__eyebrow { font-family: ${fonts.mono}; font-size: 0.65rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.ash}; margin: 0; }
.la-why__title { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(2rem, 4.4vw, 3rem); line-height: 1.05; letter-spacing: -0.015em; margin: 0; max-width: 18ch; font-variation-settings: normal; }
.la-why__title em { font-style: italic; color: ${palette.moss}; font-variation-settings: normal; }
.la-why__grid { list-style: none; padding: 0; margin: 0 auto; max-width: 1180px; display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.la-why__card { display: flex; flex-direction: column; gap: 1rem; }
.la-why__photo-wrap { position: relative; aspect-ratio: 4/5; background: ${palette.paperDeep}; overflow: hidden; }
.la-why__photo { width: 100%; height: 100%; object-fit: cover; display: block; filter: saturate(1.04); transition: transform 600ms ${"cubic-bezier(0.22,0.96,0.32,1)"}; }
.la-why__card:hover .la-why__photo { transform: scale(1.03); }
.la-why__photo-tag { position: absolute; top: 1rem; left: 1rem; font-family: ${fonts.mono}; font-size: 0.62rem; letter-spacing: 0.24em; color: ${palette.bone}; background: rgba(22,20,15,0.5); padding: 0.3rem 0.55rem; border-radius: 1px; backdrop-filter: blur(6px); }
.la-why__card-title { font-family: ${fonts.display}; font-weight: 500; font-size: 1.55rem; line-height: 1.15; margin: 0.4rem 0 0; color: ${palette.moss}; font-variation-settings: normal; }
.la-why__card-body { font-family: ${fonts.body}; font-size: 0.96rem; line-height: 1.6; color: ${palette.ink}; opacity: 0.78; margin: 0; max-width: 36ch; }
@media (prefers-reduced-motion: reduce) { .la-why__photo { transition: none; transform: scale(1); } }
@media (max-width: 920px) { .la-why { padding: 4rem 1.25rem; } .la-why__grid { grid-template-columns: 1fr; gap: 2.5rem; } }
`;
