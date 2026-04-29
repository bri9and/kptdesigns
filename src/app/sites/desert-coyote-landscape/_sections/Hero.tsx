"use client";

import { palette, fonts } from "../_lib/tokens";

// Full-bleed split hero. Left: huge condensed headline + mono eyebrow +
// two CTAs. Right: placeholder photo block with project caption pinned
// bottom-left. ~70vh, NOT 100vh — keeps the page feeling worked-on, not
// staged.

const PHONE = "(480) 936-0187";
const PHONE_HREF = "tel:+14809360187";

export function Hero() {
  return (
    <section className="dc2-hero" aria-labelledby="dc2-hero-title">
      <div className="dc2-hero__left">
        <p className="dc2-hero__eyebrow">
          MESA · GILBERT · CHANDLER · QUEEN CREEK · 14 YEARS
        </p>
        <h1 id="dc2-hero-title" className="dc2-hero__title">
          Yards built tough. Built fast. Built local.
        </h1>
        <p className="dc2-hero__lede">
          Family-run East Valley landscape contractor. Hardscape, sod, turf,
          irrigation, trees. Free estimates by appointment.
        </p>
        <div className="dc2-hero__ctas">
          <a href="#estimates" className="dc2-hero__cta dc2-hero__cta--primary">
            Get a free estimate <span aria-hidden="true">→</span>
          </a>
          <a href={PHONE_HREF} className="dc2-hero__cta dc2-hero__cta--ghost">
            Call {PHONE}
          </a>
        </div>
      </div>

      <div className="dc2-hero__right">
        <PlaceholderPhoto tag="PROJECT 01 · 1,800 SF PAVER COURTYARD" />
      </div>

      <style>{css}</style>
    </section>
  );
}

// Inline placeholder photo block — warm-tan noise gradient evoking gravel
// / pavers. Marked with data-placeholder-photo so QA can grep for swap
// targets when real images drop in.
function PlaceholderPhoto({ tag }: { tag: string }) {
  return (
    <div
      className="dc2-hero__photo"
      data-placeholder-photo="true"
      role="img"
      aria-label={tag}
    >
      <div className="dc2-hero__photo-grain" aria-hidden="true" />
      <span className="dc2-hero__photo-tag">{tag}</span>
    </div>
  );
}

const css = `
.dc2-hero {
  position: relative;
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 2.5rem;
  min-height: 70vh;
  padding: 4rem 5vw 5rem;
  background: ${palette.bg};
  font-family: ${fonts.body};
  color: ${palette.ink};
}
.dc2-hero__left {
  display: flex; flex-direction: column;
  justify-content: center;
  max-width: 720px;
}
.dc2-hero__eyebrow {
  font-family: ${fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  color: ${palette.dust};
  margin: 0 0 1.5rem;
  text-transform: uppercase;
}
.dc2-hero__title {
  font-family: ${fonts.display};
  font-weight: 700;
  font-stretch: 78%;
  font-size: clamp(2.6rem, 7vw, 5.8rem);
  line-height: 0.95;
  letter-spacing: -0.025em;
  color: ${palette.ink};
  margin: 0 0 1.75rem;
}
.dc2-hero__lede {
  font-family: ${fonts.body};
  font-size: 1.05rem;
  line-height: 1.55;
  color: ${palette.ink};
  opacity: 0.78;
  margin: 0 0 2.25rem;
  max-width: 50ch;
}
.dc2-hero__ctas {
  display: flex; flex-wrap: wrap; gap: 0.85rem;
}
.dc2-hero__cta {
  display: inline-flex; align-items: center; gap: 0.5rem;
  text-decoration: none;
  font-family: ${fonts.body};
  font-weight: 600;
  font-size: 0.95rem;
  padding: 1rem 1.5rem;
  border-radius: 999px;
  transition: transform 160ms ease, box-shadow 160ms ease, background 160ms ease;
}
.dc2-hero__cta--primary {
  background: ${palette.terra};
  color: ${palette.paper};
}
.dc2-hero__cta--primary:hover { transform: translateY(-1px); box-shadow: 0 10px 28px rgba(156,74,42,0.32); }
.dc2-hero__cta--ghost {
  background: transparent;
  color: ${palette.ink};
  border: 1px solid ${palette.ink};
}
.dc2-hero__cta--ghost:hover { background: ${palette.ink}; color: ${palette.paper}; }
.dc2-hero__cta:focus-visible { outline: 2px solid ${palette.terra}; outline-offset: 3px; }

.dc2-hero__right {
  position: relative;
  min-height: 60vh;
}
.dc2-hero__photo {
  position: relative;
  width: 100%; height: 100%;
  min-height: 60vh;
  border-radius: 4px;
  overflow: hidden;
  background:
    radial-gradient(ellipse at 25% 25%, rgba(244, 239, 227, 0.55), transparent 55%),
    radial-gradient(ellipse at 80% 75%, rgba(122, 117, 105, 0.35), transparent 60%),
    linear-gradient(135deg, ${palette.bgDeep} 0%, ${palette.clay} 55%, ${palette.dust} 100%);
}
.dc2-hero__photo-grain {
  position: absolute; inset: 0;
  background-image:
    repeating-radial-gradient(circle at 17% 31%, rgba(27,26,23,0.05) 0 1px, transparent 1px 4px),
    repeating-radial-gradient(circle at 73% 64%, rgba(244,239,227,0.06) 0 1px, transparent 1px 5px);
  mix-blend-mode: overlay;
  opacity: 0.85;
  pointer-events: none;
}
.dc2-hero__photo-tag {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  font-family: ${fonts.mono};
  font-size: 0.65rem;
  letter-spacing: 0.18em;
  background: rgba(16,16,18,0.78);
  color: ${palette.paper};
  padding: 0.4rem 0.7rem;
  border-radius: 2px;
}

@media (max-width: 880px) {
  .dc2-hero {
    grid-template-columns: 1fr;
    padding: 2.5rem 1.25rem 3rem;
    min-height: auto;
  }
  .dc2-hero__right { min-height: 44vh; }
  .dc2-hero__photo { min-height: 44vh; }
  .dc2-hero__title { font-size: clamp(2.4rem, 11vw, 3.6rem); }
}
`;
