"use client";

import { meta } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

export function DroneHero() {
  return (
    <section
      id="drone-hero"
      className="la-drone-hero"
      data-placeholder-video="true"
    >
      <div className="la-drone-hero__terrain" aria-hidden="true" />
      <div className="la-drone-hero__vignette" aria-hidden="true" />
      <div className="la-drone-hero__copy">
        <p className="la-drone-hero__eyebrow">Butler, PA</p>
        <h1 className="la-drone-hero__title">{meta.name.split(" ").slice(0, 2).join(" ")}</h1>
        <p className="la-drone-hero__tag">{meta.tagline}</p>
      </div>
      <p className="la-drone-hero__address">{meta.address.value}</p>
      <a href="#course-at-a-glance" className="la-drone-hero__cue" aria-label="Scroll to course details">
        <span aria-hidden="true">↓</span>
      </a>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-drone-hero { position: relative; height: 100vh; width: 100%; overflow: hidden; background: ${palette.waterDeep}; color: ${palette.cream}; }
.la-drone-hero__terrain {
  position: absolute;
  inset: -10%;
  background:
    radial-gradient(ellipse 60% 40% at 30% 35%, rgba(44,85,48,0.55) 0%, rgba(44,85,48,0) 60%),
    radial-gradient(ellipse 55% 45% at 75% 65%, rgba(14,42,63,0.6) 0%, rgba(14,42,63,0) 65%),
    radial-gradient(ellipse 35% 30% at 55% 50%, rgba(201,169,110,0.18) 0%, rgba(201,169,110,0) 70%),
    linear-gradient(135deg, ${palette.fairwayDeep} 0%, ${palette.fairway} 28%, ${palette.water} 62%, ${palette.waterDeep} 100%);
  background-size: 180% 180%, 200% 200%, 160% 160%, 140% 140%;
  background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%;
  filter: saturate(1.05) brightness(0.96);
  animation: la-drone-pan 30s ease-in-out infinite alternate;
  transform-origin: center;
}
@keyframes la-drone-pan {
  0%   { background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%; transform: scale(1.02); }
  50%  { background-position: 35% 25%, 65% 75%, 60% 45%, 30% 20%; transform: scale(1.06); }
  100% { background-position: 70% 50%, 30% 50%, 40% 60%, 60% 40%; transform: scale(1.02); }
}
.la-drone-hero__vignette { position: absolute; inset: 0; background: radial-gradient(ellipse at center, transparent 30%, rgba(8,24,42,0.55) 75%, rgba(8,24,42,0.85) 100%); }
.la-drone-hero__copy { position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%); text-align: center; padding: 0 5vw; }
.la-drone-hero__eyebrow { font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.32em; text-transform: uppercase; opacity: 0.85; margin: 0 0 1.25rem; }
.la-drone-hero__title { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(3rem, 9vw, 7.5rem); letter-spacing: -0.02em; line-height: 0.95; margin: 0; text-shadow: 0 2px 24px rgba(0,0,0,0.35); }
.la-drone-hero__tag { font-family: ${fonts.display}; font-style: italic; font-size: clamp(1.1rem, 2.4vw, 1.65rem); margin: 1.25rem 0 0; opacity: 0.92; }
.la-drone-hero__address { position: absolute; bottom: 2.5rem; left: 5vw; right: 5vw; text-align: center; font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.78; margin: 0; }
.la-drone-hero__cue { position: absolute; bottom: 6.5rem; left: 50%; transform: translateX(-50%); display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 999px; border: 1px solid rgba(244,239,223,0.55); color: ${palette.cream}; text-decoration: none; font-size: 1.1rem; opacity: 0.85; transition: opacity 220ms, transform 220ms; }
.la-drone-hero__cue:hover, .la-drone-hero__cue:focus-visible { opacity: 1; transform: translateX(-50%) translateY(2px); outline: none; }
.la-drone-hero__cue:focus-visible { box-shadow: 0 0 0 2px ${palette.dawn}; }
@media (prefers-reduced-motion: reduce) {
  .la-drone-hero__terrain { animation: none; transform: none; inset: 0; }
  .la-drone-hero__cue { transition: none; }
}
`;
