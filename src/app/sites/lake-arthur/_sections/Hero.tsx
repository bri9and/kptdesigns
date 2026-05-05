import { meta } from "../_lib/content";
import { palette, fonts, photos } from "../_lib/tokens";

// Cinematic full-bleed hero. Photo fills the viewport. Soft dark gradient
// from bottom for type readability; vignette in corners. Headline overlays
// the lower-left, mono metadata strip pinned to the bottom edge. Drone
// callout demoted to a small pulsing pill upper-right.

export function Hero() {
  return (
    <section id="hero" className="la-hero" aria-labelledby="la-hero-title">
      <div className="la-hero__media" aria-hidden="true">
        <img
          className="la-hero__photo"
          src={photos.hero}
          alt=""
          loading="eager"
          decoding="async"
          fetchPriority="high"
        />
        <div className="la-hero__scrim" />
        <div className="la-hero__vignette" />
        <div className="la-hero__grain" />
      </div>

      <aside className="la-hero__drone" aria-label="Drone footage in production">
        <span className="la-hero__drone-dot" aria-hidden="true" />
        <span className="la-hero__drone-line">
          Drone reel <em>in production</em>
        </span>
      </aside>

      <div className="la-hero__copy">
        <p className="la-hero__eyebrow">
          <span>BUTLER, PA</span>
          <span className="la-hero__rule" aria-hidden="true" />
          <span>SINCE 1965</span>
        </p>
        <h1 id="la-hero-title" className="la-hero__title">
          Championship golf,<br /><em>perched above the lake.</em>
        </h1>
        <p className="la-hero__lede">
          Forty-five minutes north of Pittsburgh. A hundred yards from the water.
          Eighteen honest holes that read different every season.
        </p>
        <div className="la-hero__cta-row">
          <a href="#book" className="la-hero__cta la-hero__cta--primary">
            Book a tee time<span aria-hidden="true">→</span>
          </a>
          <a href={`tel:${meta.phone.value.replace(/\D/g, "")}`} className="la-hero__cta la-hero__cta--ghost">
            {meta.phone.value}
          </a>
        </div>
      </div>

      <ul className="la-hero__strip" aria-label="Course at a glance">
        <li><span className="la-hero__strip-k">PAR</span><span className="la-hero__strip-v">72</span></li>
        <li><span className="la-hero__strip-k">YARDAGE</span><span className="la-hero__strip-v">6,412</span></li>
        <li><span className="la-hero__strip-k">RATING</span><span className="la-hero__strip-v">70.8 / 124</span></li>
        <li><span className="la-hero__strip-k">HOLES</span><span className="la-hero__strip-v">18</span></li>
        <li><span className="la-hero__strip-k">SEASON</span><span className="la-hero__strip-v">APR — NOV</span></li>
      </ul>

      <a href="#why-play" className="la-hero__scroll" aria-label="Scroll to course story">
        <span className="la-hero__scroll-line" aria-hidden="true" />
        <span className="la-hero__scroll-label">Scroll</span>
      </a>

      <style>{css}</style>
    </section>
  );
}

const css = `
.la-hero {
  position: relative;
  height: 100vh;
  min-height: 640px;
  width: 100%;
  overflow: hidden;
  background: ${palette.ink};
  color: ${palette.bone};
  font-family: ${fonts.body};
  isolation: isolate;
}

.la-hero__media {
  position: absolute;
  inset: 0;
  z-index: 0;
}
.la-hero__photo {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  filter: saturate(1.08) contrast(1.04);
  transform: scale(1.04);
  animation: la-hero-kenburns 24s ease-in-out infinite alternate;
}
@keyframes la-hero-kenburns {
  0%   { transform: scale(1.04) translate3d(-1%, 0, 0); }
  100% { transform: scale(1.1) translate3d(1%, -1%, 0); }
}
.la-hero__scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(180deg, rgba(22,20,15,0) 0%, rgba(22,20,15,0) 35%, rgba(22,20,15,0.55) 78%, rgba(22,20,15,0.92) 100%),
    linear-gradient(90deg, rgba(22,20,15,0.45) 0%, rgba(22,20,15,0) 55%);
}
.la-hero__vignette {
  position: absolute; inset: 0;
  background: radial-gradient(ellipse at 50% 30%, rgba(0,0,0,0) 35%, rgba(0,0,0,0.32) 100%);
  pointer-events: none;
}
.la-hero__grain {
  position: absolute; inset: 0;
  background-image:
    repeating-radial-gradient(circle at 23% 17%, rgba(244,239,223,0.04) 0 1px, transparent 1px 4px),
    repeating-radial-gradient(circle at 71% 64%, rgba(0,0,0,0.05) 0 1px, transparent 1px 5px);
  mix-blend-mode: overlay;
  opacity: 0.6;
  pointer-events: none;
}

.la-hero__drone {
  position: absolute;
  top: 6.5rem;
  right: 2.5rem;
  z-index: 4;
  display: inline-flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0.55rem 0.95rem 0.55rem 0.85rem;
  background: rgba(22,20,15,0.55);
  border: 1px solid rgba(244,239,223,0.18);
  border-radius: 999px;
  backdrop-filter: blur(8px);
  font-family: ${fonts.mono};
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${palette.bone};
}
.la-hero__drone-dot {
  width: 7px; height: 7px;
  border-radius: 999px;
  background: ${palette.brick};
  flex-shrink: 0;
  box-shadow: 0 0 0 0 rgba(184,111,92,0.55);
  animation: la-hero-pulse 2400ms ease-in-out infinite;
}
.la-hero__drone-line em { font-style: italic; text-transform: none; letter-spacing: 0; opacity: 0.85; }
@keyframes la-hero-pulse {
  0%, 100% { box-shadow: 0 0 0 0 rgba(184,111,92,0.55); }
  50%      { box-shadow: 0 0 0 8px rgba(184,111,92,0); }
}

.la-hero__copy {
  position: absolute;
  left: 4.5vw;
  right: 4.5vw;
  bottom: clamp(8rem, 16vh, 11rem);
  z-index: 3;
  max-width: min(90vw, 1100px);
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
.la-hero__eyebrow {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-family: ${fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.34em;
  text-transform: uppercase;
  color: ${palette.brickPale};
  margin: 0;
  text-shadow: 0 1px 18px rgba(0,0,0,0.4);
}
.la-hero__rule { display: inline-block; width: 26px; height: 1px; background: currentColor; opacity: 0.6; }
.la-hero__title {
  font-family: ${fonts.display};
  font-weight: 400;
  font-size: clamp(3.2rem, 9vw, 7.4rem);
  line-height: 0.96;
  letter-spacing: -0.022em;
  margin: 0;
  color: ${palette.bone};
  text-shadow: 0 4px 38px rgba(0,0,0,0.55), 0 1px 2px rgba(0,0,0,0.55);
  max-width: 16ch;
}
.la-hero__title em {
  font-style: italic;
  color: ${palette.brickPale};
  display: inline-block;
}
.la-hero__lede {
  font-family: ${fonts.body};
  font-size: clamp(1rem, 1.3vw, 1.15rem);
  line-height: 1.55;
  color: rgba(244,239,223,0.92);
  margin: 0.4rem 0 0;
  max-width: 48ch;
  text-shadow: 0 1px 14px rgba(0,0,0,0.45);
}
.la-hero__cta-row {
  display: flex;
  gap: 0.85rem;
  margin-top: 1.4rem;
  flex-wrap: wrap;
}
.la-hero__cta {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  font-family: ${fonts.mono};
  font-size: 0.74rem;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  padding: 1.05rem 1.7rem;
  border-radius: 999px;
  text-decoration: none;
  transition: transform 200ms ease, background 200ms ease, color 200ms ease, box-shadow 240ms ease;
}
.la-hero__cta--primary {
  background: ${palette.bone};
  color: ${palette.ink};
  box-shadow: 0 12px 36px rgba(0,0,0,0.32);
}
.la-hero__cta--primary:hover {
  background: ${palette.brick};
  color: ${palette.bone};
  transform: translateY(-2px);
  box-shadow: 0 14px 42px rgba(0,0,0,0.4);
}
.la-hero__cta--ghost {
  background: rgba(22,20,15,0.35);
  color: ${palette.bone};
  border: 1px solid rgba(244,239,223,0.4);
  backdrop-filter: blur(6px);
}
.la-hero__cta--ghost:hover {
  background: rgba(22,20,15,0.55);
  border-color: ${palette.bone};
  transform: translateY(-1px);
}
.la-hero__cta:focus-visible {
  outline: 2px solid ${palette.brickPale};
  outline-offset: 3px;
}

.la-hero__strip {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 2;
  list-style: none;
  margin: 0;
  padding: 1.1rem 4.5vw;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
  background: rgba(22,20,15,0.78);
  border-top: 1px solid rgba(244,239,223,0.18);
  backdrop-filter: blur(10px);
  font-family: ${fonts.mono};
  color: ${palette.bone};
}
.la-hero__strip li {
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
}
.la-hero__strip-k { font-size: 0.6rem; letter-spacing: 0.32em; color: ${palette.brickPale}; opacity: 0.85; }
.la-hero__strip-v { font-family: ${fonts.display}; font-size: 1.35rem; letter-spacing: -0.01em; color: ${palette.bone}; line-height: 1; }

.la-hero__scroll {
  position: absolute;
  left: 50%;
  bottom: 5.5rem;
  z-index: 3;
  transform: translateX(-50%);
  display: inline-flex;
  flex-direction: column;
  align-items: center;
  gap: 0.6rem;
  text-decoration: none;
  color: ${palette.bone};
  opacity: 0.85;
}
.la-hero__scroll-line {
  width: 1px;
  height: 36px;
  background: linear-gradient(to bottom, transparent, ${palette.bone});
  animation: la-hero-scroll 2200ms ease-in-out infinite;
  transform-origin: top;
}
@keyframes la-hero-scroll {
  0%   { transform: scaleY(0); transform-origin: top; }
  50%  { transform: scaleY(1); transform-origin: top; }
  51%  { transform: scaleY(1); transform-origin: bottom; }
  100% { transform: scaleY(0); transform-origin: bottom; }
}
.la-hero__scroll-label { font-family: ${fonts.mono}; font-size: 0.62rem; letter-spacing: 0.32em; text-transform: uppercase; }

@media (prefers-reduced-motion: reduce) {
  .la-hero__photo { animation: none; transform: scale(1); }
  .la-hero__drone-dot { animation: none; }
  .la-hero__scroll-line { animation: none; transform: scaleY(0.6); }
  .la-hero__cta { transition: none; }
}

@media (max-width: 920px) {
  .la-hero { height: auto; min-height: 0; padding-bottom: 8.5rem; }
  .la-hero__media, .la-hero__photo { position: absolute; }
  .la-hero { display: flex; flex-direction: column; }
  .la-hero__copy { position: relative; left: auto; right: auto; bottom: auto; padding: 38vh 1.25rem 0; }
  .la-hero__title { font-size: clamp(2.6rem, 12vw, 4rem); }
  .la-hero__strip { grid-template-columns: repeat(2, 1fr); padding: 0.9rem 1.25rem; gap: 0.75rem 1.5rem; }
  .la-hero__scroll { display: none; }
  .la-hero__drone { top: 5.5rem; right: 1rem; }
}
`;
