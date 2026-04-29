import { meta } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

// v2 footer — charcoal ink background, bone text, restrained type-only.
// No big gradient art; the brand mark is set in Fraunces large italic.

export function Footer() {
  const phoneHref = `tel:${meta.phone.value.replace(/\D/g, "")}`;

  return (
    <footer id="footer" className="la-foot">
      <div className="la-foot__inner">
        <div className="la-foot__brand">
          <p className="la-foot__mark">
            Lake <em>Arthur</em>
          </p>
          <p className="la-foot__addr">{meta.address.value}</p>
          <p className="la-foot__phone">
            <a href={phoneHref}>{meta.phone.value}</a>
          </p>
        </div>
        <nav className="la-foot__nav" aria-label="Footer">
          <div>
            <h4>Course</h4>
            <a href="#course">Course at a glance</a>
            <a href="#signature-holes">Signature holes</a>
            <a href="#book">Book a tee time</a>
          </div>
          <div>
            <h4>Events</h4>
            <a href="#banquets">Banquets &amp; weddings</a>
            <a href="#tournaments">Tournaments</a>
            <a href="#leagues">Leagues</a>
          </div>
          <div>
            <h4>Visit</h4>
            <a href="#visit">Directions</a>
            <a href={phoneHref}>Call us</a>
            <a href="#why-play">About</a>
          </div>
        </nav>
      </div>
      <div className="la-foot__rule" aria-hidden="true" />
      <p className="la-foot__credit">
        © {new Date().getFullYear()} Lake Arthur Golf Club{" "}
        <span className="la-foot__credit-sep" aria-hidden="true">·</span>{" "}
        Site designed by <a href="/proposal/lake-arthur">KPT Designs</a>
      </p>
      <style>{css}</style>
    </footer>
  );
}

const css = `
.la-foot {
  background: ${palette.ink};
  color: ${palette.bone};
  padding: 5rem 2.5rem 2.5rem;
  font-family: ${fonts.body};
}
.la-foot__inner {
  display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr);
  gap: 4rem;
  max-width: 1180px; margin: 0 auto 3rem;
}
.la-foot__brand { display: flex; flex-direction: column; gap: 0.6rem; }
.la-foot__mark {
  font-family: ${fonts.display}; font-weight: 400;
  font-size: clamp(2.4rem, 5vw, 3.4rem);
  line-height: 1; letter-spacing: -0.018em;
  margin: 0; color: ${palette.bone};
  font-variation-settings: "opsz" 144, "SOFT" 30;
}
.la-foot__mark em {
  font-style: italic; color: ${palette.brick};
  font-variation-settings: "opsz" 96, "SOFT" 70;
}
.la-foot__addr {
  font-family: ${fonts.mono}; font-size: 0.7rem; letter-spacing: 0.18em; text-transform: uppercase;
  color: ${palette.ash}; margin: 0.5rem 0 0;
}
.la-foot__phone { margin: 0.25rem 0 0; }
.la-foot__phone a {
  font-family: ${fonts.mono}; font-size: 0.85rem; letter-spacing: 0.08em;
  color: ${palette.bone}; text-decoration: none;
  border-bottom: 1px solid rgba(250,246,234,0.3); padding-bottom: 1px;
  transition: border-color 180ms;
}
.la-foot__phone a:hover { border-bottom-color: ${palette.brick}; }
.la-foot__nav {
  display: grid; grid-template-columns: repeat(3, 1fr); gap: 2.5rem;
}
.la-foot__nav h4 {
  font-family: ${fonts.mono}; font-size: 0.65rem; letter-spacing: 0.32em; text-transform: uppercase;
  color: ${palette.ash}; margin: 0 0 1rem; font-weight: 500;
}
.la-foot__nav a {
  display: block;
  font-family: ${fonts.body}; font-size: 0.95rem;
  color: ${palette.bone}; opacity: 0.8;
  text-decoration: none;
  margin: 0 0 0.55rem;
  transition: opacity 180ms, color 180ms;
}
.la-foot__nav a:hover { opacity: 1; color: ${palette.brick}; }
.la-foot__nav a:focus-visible { outline: 2px solid ${palette.brick}; outline-offset: 2px; opacity: 1; }
.la-foot__rule {
  max-width: 1180px; margin: 0 auto;
  height: 1px; background: rgba(250,246,234,0.14);
}
.la-foot__credit {
  max-width: 1180px; margin: 1.5rem auto 0;
  font-family: ${fonts.mono}; font-size: 0.65rem; letter-spacing: 0.18em; text-transform: uppercase;
  color: ${palette.ash};
}
.la-foot__credit a {
  color: ${palette.bone}; text-decoration: none;
  border-bottom: 1px solid rgba(250,246,234,0.3); padding-bottom: 1px;
  transition: border-color 180ms;
}
.la-foot__credit a:hover { border-bottom-color: ${palette.brick}; }
.la-foot__credit-sep { padding: 0 0.4em; }
@media (max-width: 720px) {
  .la-foot { padding: 4rem 1.25rem 2rem; }
  .la-foot__inner { grid-template-columns: 1fr; gap: 3rem; }
  .la-foot__nav { grid-template-columns: 1fr 1fr; gap: 2rem; }
}
`;
