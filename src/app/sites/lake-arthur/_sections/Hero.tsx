import { meta } from "../_lib/content";
import { palette, fonts, photos } from "../_lib/tokens";

// Photographic hero — split layout. Copy left, big bleeding photo right.
// Drone footage demoted to a small "Currently filming" callout in the
// upper-right of the photo. Replaces the v1 fullscreen drone gradient.

export function Hero() {
  return (
    <section id="hero" className="la-hero" aria-labelledby="la-hero-title">
      <div className="la-hero__copy">
        <p className="la-hero__eyebrow">
          <span>BUTLER, PA</span>
          <span className="la-hero__rule" aria-hidden="true" />
          <span>EST. 1965</span>
          <span className="la-hero__rule" aria-hidden="true" />
          <span>18 HOLES · PAR 72</span>
        </p>
        <h1 id="la-hero-title" className="la-hero__title">
          Championship golf, <em>perched above the lake.</em>
        </h1>
        <p className="la-hero__lede">
          A public 18-hole layout on the shoulder of Lake Arthur — wide enough for
          the weekend crowd, demanding enough for the regulars. Forty-five minutes
          north of Pittsburgh; a hundred yards from the water.
        </p>
        <div className="la-hero__cta-row">
          <a href="#book" className="la-hero__cta la-hero__cta--primary">Book a tee time</a>
          <a href="#why-play" className="la-hero__cta la-hero__cta--ghost">Why play here</a>
        </div>
        <p className="la-hero__phone">
          Or call <a href={`tel:${meta.phone.value.replace(/\D/g, "")}`}>{meta.phone.value}</a>
        </p>
      </div>
      <div className="la-hero__art">
        <img
          className="la-hero__photo"
          src={photos.hero}
          alt="Lake Arthur Golf Club — fairway view"
          loading="eager"
          decoding="async"
        />
        <span className="la-hero__photo-tag">PHOTO · BANNER 01</span>
        <aside className="la-hero__drone" aria-label="Drone footage callout">
          <span className="la-hero__drone-dot" aria-hidden="true" />
          <span className="la-hero__drone-line">
            Drone reel <em>in production</em> — hole-by-hole flythrough this season.
          </span>
        </aside>
      </div>
      <span className="la-hero__corner-mark" aria-hidden="true">LA · GC</span>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-hero {
  position: relative;
  display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: 4rem;
  align-items: center;
  padding: 5rem 2.5rem 6rem;
  background: ${palette.paper};
  color: ${palette.ink};
  min-height: calc(100vh - 70px);
  font-family: ${fonts.body};
}
.la-hero__copy { display: flex; flex-direction: column; gap: 1.5rem; max-width: 540px; }
.la-hero__eyebrow {
  display: inline-flex; flex-wrap: wrap; align-items: center; gap: 0.65rem;
  font-family: ${fonts.mono};
  font-size: 0.65rem; letter-spacing: 0.32em; text-transform: uppercase;
  color: ${palette.ash}; margin: 0;
}
.la-hero__rule { display: inline-block; width: 22px; height: 1px; background: currentColor; opacity: 0.45; }
.la-hero__title {
  font-family: ${fonts.display};
  font-weight: 400;
  font-size: clamp(2.6rem, 5.4vw, 4.6rem);
  line-height: 1.02;
  letter-spacing: -0.018em;
  margin: 0;
  font-variation-settings: normal;
}
.la-hero__title em { font-style: italic; color: ${palette.moss}; font-variation-settings: normal; }
.la-hero__lede {
  font-family: ${fonts.body};
  font-size: 1.05rem;
  line-height: 1.55;
  color: ${palette.ink};
  opacity: 0.82;
  margin: 0.25rem 0 0;
  max-width: 44ch;
}
.la-hero__cta-row { display: flex; gap: 0.75rem; margin-top: 0.6rem; flex-wrap: wrap; }
.la-hero__cta {
  font-family: ${fonts.mono};
  font-size: 0.72rem; letter-spacing: 0.2em; text-transform: uppercase;
  padding: 0.95rem 1.6rem; border-radius: 999px; text-decoration: none;
  transition: transform 180ms, background 180ms, color 180ms;
}
.la-hero__cta--primary { background: ${palette.moss}; color: ${palette.bone}; }
.la-hero__cta--primary:hover { background: ${palette.mossDeep}; transform: translateY(-1px); }
.la-hero__cta--ghost { background: transparent; color: ${palette.ink}; border: 1px solid rgba(22,20,15,0.28); }
.la-hero__cta--ghost:hover { border-color: ${palette.ink}; background: rgba(22,20,15,0.04); }
.la-hero__cta:focus-visible { outline: 2px solid ${palette.brick}; outline-offset: 2px; }
.la-hero__phone { font-family: ${fonts.mono}; font-size: 0.78rem; letter-spacing: 0.08em; color: ${palette.ash}; margin: 0.5rem 0 0; }
.la-hero__phone a { color: ${palette.moss}; text-decoration: none; border-bottom: 1px solid currentColor; }
.la-hero__phone a:hover { color: ${palette.ink}; }

.la-hero__art {
  position: relative;
  height: clamp(420px, 70vh, 720px);
  background: ${palette.paperDeep};
  overflow: hidden;
  border-radius: 2px;
}
.la-hero__photo { width: 100%; height: 100%; object-fit: cover; display: block; transform: scale(1.02); transition: transform 800ms ${"cubic-bezier(0.22,0.96,0.32,1)"}; filter: saturate(1.05); }
.la-hero__art:hover .la-hero__photo { transform: scale(1); }
.la-hero__photo-tag {
  position: absolute; top: 1rem; left: 1rem;
  font-family: ${fonts.mono}; font-size: 0.62rem; letter-spacing: 0.22em; text-transform: uppercase;
  color: ${palette.bone}; background: rgba(22,20,15,0.55); padding: 0.35rem 0.6rem; border-radius: 2px;
  backdrop-filter: blur(6px);
}
.la-hero__drone {
  position: absolute; top: 1rem; right: 1rem;
  display: inline-flex; align-items: center; gap: 0.5rem;
  background: rgba(22,20,15,0.75);
  color: ${palette.bone};
  padding: 0.55rem 0.85rem;
  border-radius: 999px;
  backdrop-filter: blur(8px);
  font-family: ${fonts.mono};
  font-size: 0.65rem; letter-spacing: 0.16em; text-transform: uppercase;
  max-width: 320px;
}
.la-hero__drone-dot { width: 7px; height: 7px; border-radius: 999px; background: ${palette.brick}; box-shadow: 0 0 0 0 rgba(184,111,92,0.6); animation: la-hero-pulse 2400ms ease-in-out infinite; flex-shrink: 0; }
.la-hero__drone-line { white-space: normal; line-height: 1.4; }
.la-hero__drone-line em { font-style: italic; text-transform: none; letter-spacing: 0; opacity: 0.8; }
@keyframes la-hero-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(184,111,92,0.55); }
  50%      { box-shadow: 0 0 0 8px rgba(184,111,92,0); }
}
.la-hero__corner-mark {
  position: absolute; bottom: 1.5rem; right: 2.5rem;
  font-family: ${fonts.mono}; font-size: 0.62rem; letter-spacing: 0.32em; color: ${palette.ash};
  pointer-events: none;
}
@media (prefers-reduced-motion: reduce) {
  .la-hero__drone-dot { animation: none; }
  .la-hero__photo { transition: none; transform: scale(1); }
}
@media (max-width: 920px) {
  .la-hero { grid-template-columns: 1fr; gap: 2.5rem; padding: 2.5rem 1.25rem 3.5rem; min-height: 0; }
  .la-hero__art { height: 60vh; }
  .la-hero__corner-mark { display: none; }
}
`;
