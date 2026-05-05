"use client";

import { meta } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

export function DesertHero() {
  return (
    <section
      id="desert-hero"
      className="dc-hero"
      data-placeholder-video="true"
    >
      <div className="dc-hero__terrain" aria-hidden="true" />
      <div className="dc-hero__vignette" aria-hidden="true" />
      <div className="dc-hero__copy">
        <p className="dc-hero__eyebrow">Mesa · Gilbert · Chandler · Queen Creek</p>
        <h1 className="dc-hero__title">{meta.short}</h1>
        <p className="dc-hero__tag">{meta.tagline}</p>
      </div>
      <p className="dc-hero__address">
        {meta.serviceArea.value} · <a href={`tel:${meta.phoneRaw.value}`}>{meta.phone.value}</a>
      </p>
      <a
        href="#about-at-a-glance"
        className="dc-hero__cue"
        aria-label="Scroll to about Desert Coyote"
      >
        <span aria-hidden="true">↓</span>
      </a>
      <style>{css}</style>
    </section>
  );
}

const css = `
.dc-hero { position: relative; height: 100vh; width: 100%; overflow: hidden; background: ${palette.terraDeep}; color: ${palette.paper}; }
.dc-hero__terrain {
  position: absolute;
  inset: -10%;
  background:
    radial-gradient(ellipse 60% 45% at 30% 35%, rgba(212,168,87,0.55) 0%, rgba(212,168,87,0) 60%),
    radial-gradient(ellipse 55% 40% at 75% 65%, rgba(168,90,60,0.55) 0%, rgba(168,90,60,0) 65%),
    radial-gradient(ellipse 35% 30% at 55% 50%, rgba(124,140,107,0.18) 0%, rgba(124,140,107,0) 70%),
    linear-gradient(135deg, ${palette.sand} 0%, ${palette.sandDeep} 25%, ${palette.sunGold} 60%, ${palette.terra} 100%);
  background-size: 180% 180%, 200% 200%, 160% 160%, 160% 160%;
  background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%;
  filter: saturate(1.05) brightness(0.98);
  animation: dc-hero-pan 32s ease-in-out infinite alternate;
  transform-origin: center;
}
@keyframes dc-hero-pan {
  0%   { background-position: 0% 0%, 100% 100%, 50% 50%, 0% 0%; transform: scale(1.02); }
  50%  { background-position: 35% 25%, 65% 75%, 60% 45%, 30% 20%; transform: scale(1.06); }
  100% { background-position: 70% 50%, 30% 50%, 40% 60%, 60% 40%; transform: scale(1.02); }
}
.dc-hero__vignette { position: absolute; inset: 0; background: radial-gradient(ellipse at center, transparent 30%, rgba(63,53,45,0.45) 75%, rgba(26,22,18,0.78) 100%); }
.dc-hero__copy { position: absolute; left: 0; right: 0; top: 50%; transform: translateY(-50%); text-align: center; padding: 0 5vw; }
.dc-hero__eyebrow { font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.32em; text-transform: uppercase; opacity: 0.92; margin: 0 0 1.25rem; color: ${palette.paper}; text-shadow: 0 1px 14px rgba(0,0,0,0.4); }
.dc-hero__title { font-family: ${fonts.display}; font-weight: 400; font-size: clamp(3rem, 9vw, 7.5rem); letter-spacing: -0.02em; line-height: 0.95; margin: 0; color: ${palette.paper}; text-shadow: 0 2px 24px rgba(0,0,0,0.4); }
.dc-hero__tag { font-family: ${fonts.display}; font-style: italic; font-size: clamp(1.1rem, 2.4vw, 1.65rem); margin: 1.25rem 0 0; opacity: 0.95; color: ${palette.paper}; text-shadow: 0 1px 14px rgba(0,0,0,0.35); }
.dc-hero__address { position: absolute; bottom: 2.5rem; left: 5vw; right: 5vw; text-align: center; font-family: ${fonts.body}; font-size: 0.78rem; letter-spacing: 0.18em; text-transform: uppercase; opacity: 0.85; margin: 0; color: ${palette.paper}; text-shadow: 0 1px 10px rgba(0,0,0,0.4); }
.dc-hero__address a { color: ${palette.paper}; text-decoration: none; border-bottom: 1px solid rgba(245,239,223,0.4); padding-bottom: 1px; }
.dc-hero__address a:hover, .dc-hero__address a:focus-visible { border-color: ${palette.sunGold}; outline: none; }
.dc-hero__cue { position: absolute; bottom: 6.5rem; left: 50%; transform: translateX(-50%); display: inline-flex; align-items: center; justify-content: center; width: 44px; height: 44px; border-radius: 999px; border: 1px solid rgba(245,239,223,0.6); color: ${palette.paper}; text-decoration: none; font-size: 1.1rem; opacity: 0.9; transition: opacity 220ms, transform 220ms; }
.dc-hero__cue:hover, .dc-hero__cue:focus-visible { opacity: 1; transform: translateX(-50%) translateY(2px); outline: none; }
.dc-hero__cue:focus-visible { box-shadow: 0 0 0 2px ${palette.sunGold}; }
@media (prefers-reduced-motion: reduce) {
  .dc-hero__terrain { animation: none; transform: none; inset: 0; }
  .dc-hero__cue { transition: none; }
}
`;
