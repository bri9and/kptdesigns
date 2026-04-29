import { proShop, meta } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

export function ProShop() {
  return (
    <section id="shop" className="la-shop" aria-labelledby="la-shop-title">
      <header className="la-shop__intro">
        <p className="la-shop__eyebrow">Pro shop</p>
        <h2 id="la-shop-title" className="la-shop__title">Take a piece of the lake home.</h2>
        <p className="la-shop__lede">A small selection of our most-loved gear. Full shop arriving with the new build.</p>
      </header>
      <ul className="la-shop__grid">
        {proShop.map((p) => (
          <li key={p.slug} className="la-shop__card">
            <div className="la-shop__art" aria-hidden="true">
              <span>{p.title.split(" ").map(w => w[0]).slice(0, 2).join("")}</span>
            </div>
            <p className="la-shop__tag">{p.tag}</p>
            <h3 className="la-shop__name">{p.title}</h3>
            <p className="la-shop__price">{p.price.value}</p>
            <button type="button" className="la-shop__cta" disabled aria-disabled="true">
              Coming with new shop
            </button>
          </li>
        ))}
      </ul>
      <p className="la-shop__footer">
        Need something now?{" "}
        <a href={meta.bookingUrlExternal.value} target="_blank" rel="noreferrer">Visit the current shop ↗</a>
      </p>
      <style>{css}</style>
    </section>
  );
}

const css = `
.la-shop { padding: 7rem 5vw; background: ${palette.paper}; color: ${palette.charcoal}; }
.la-shop__intro { max-width: 720px; margin: 0 auto 4rem; text-align: center; }
.la-shop__eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.fairway}; margin: 0 0 1.25rem; }
.la-shop__title { font-family: ${fonts.display}; font-size: clamp(2rem, 4.5vw, 3rem); font-weight: 400; line-height: 1.1; color: ${palette.water}; margin: 0 0 1.25rem; }
.la-shop__lede { font-family: ${fonts.display}; font-style: italic; font-size: 1rem; line-height: 1.6; color: ${palette.smoke}; margin: 0; }
.la-shop__grid { list-style: none; padding: 0; margin: 0 auto; max-width: 1180px; display: grid; grid-template-columns: repeat(4, 1fr); gap: 2rem 1.5rem; }
.la-shop__card { display: flex; flex-direction: column; gap: 0.4rem; font-family: ${fonts.body}; }
.la-shop__art { aspect-ratio: 4/5; background: linear-gradient(135deg, ${palette.fog} 0%, ${palette.cream} 100%); border-radius: 3px; display: flex; align-items: center; justify-content: center; margin: 0 0 0.85rem; color: ${palette.fairwayDeep}; font-family: ${fonts.display}; font-size: 2.6rem; letter-spacing: -0.03em; opacity: 0.55; }
.la-shop__tag { font-size: 0.65rem; letter-spacing: 0.22em; text-transform: uppercase; color: ${palette.fairway}; margin: 0; }
.la-shop__name { font-family: ${fonts.display}; font-weight: 400; font-size: 1.05rem; line-height: 1.3; color: ${palette.water}; margin: 0; }
.la-shop__price { font-family: ${fonts.display}; font-size: 1.05rem; margin: 0; color: ${palette.charcoal}; }
.la-shop__cta { background: transparent; color: ${palette.smoke}; border: 1px solid rgba(26,26,26,0.18); padding: 0.55rem 0.9rem; border-radius: 999px; font-size: 0.7rem; letter-spacing: 0.16em; text-transform: uppercase; margin-top: 0.4rem; align-self: flex-start; cursor: not-allowed; opacity: 0.7; }
.la-shop__footer { text-align: center; margin: 3.5rem 0 0; font-family: ${fonts.body}; font-size: 0.92rem; color: ${palette.smoke}; }
.la-shop__footer a { color: ${palette.fairway}; text-decoration: none; border-bottom: 1px solid currentColor; padding-bottom: 1px; }
.la-shop__footer a:hover { color: ${palette.water}; }
@media (max-width: 920px) { .la-shop__grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 480px) { .la-shop__grid { grid-template-columns: 1fr; } }
`;
