import { meta } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

export function Footer() {
  return (
    <footer id="footer" className="la-foot">
      <div className="la-foot__inner">
        <div className="la-foot__brand">
          <p className="la-foot__mark">Lake Arthur</p>
          <p className="la-foot__addr">{meta.address.value}</p>
          <p className="la-foot__phone">{meta.phone.value}</p>
        </div>
        <nav className="la-foot__nav" aria-label="Footer">
          <div>
            <h4>The course</h4>
            <a href="#course-at-a-glance">Course details</a>
            <a href="#field-guide">Field guide</a>
            <a href="#book">Book a tee time</a>
            <a href="#shop">Pro shop</a>
          </div>
          <div>
            <h4>Events</h4>
            <a href="#banquets">Banquets & weddings</a>
            <a href="#tournaments">Tournaments</a>
            <a href="#leagues">Leagues</a>
          </div>
          <div>
            <h4>Visit</h4>
            <a href="#visit">Directions</a>
            <a href={`tel:${meta.phone.value.replace(/\D/g, "")}`}>Call us</a>
          </div>
        </nav>
      </div>
      <div className="la-foot__rule" aria-hidden="true" />
      <p className="la-foot__credit">
        © {new Date().getFullYear()} Lake Arthur Golf Club · Site designed by{" "}
        <a href="/proposal/lake-arthur">KPT Designs</a>
      </p>
      <style>{css}</style>
    </footer>
  );
}

const css = `
.la-foot { background: ${palette.charcoal}; color: ${palette.cream}; padding: 5rem 5vw 2rem; font-family: ${fonts.body}; }
.la-foot__inner { display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; max-width: 1180px; margin: 0 auto 3rem; }
.la-foot__brand p { margin: 0 0 0.4rem; opacity: 0.85; font-size: 0.9rem; }
.la-foot__mark { font-family: ${fonts.display}; font-size: 1.6rem; font-weight: 400; opacity: 1 !important; color: ${palette.dawn}; }
.la-foot__addr { font-family: ${fonts.display}; font-style: italic; }
.la-foot__nav { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.la-foot__nav h4 { font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; color: ${palette.dawn}; margin: 0 0 1rem; }
.la-foot__nav a { display: block; color: ${palette.cream}; text-decoration: none; opacity: 0.78; font-size: 0.9rem; margin: 0 0 0.5rem; transition: opacity 180ms; }
.la-foot__nav a:hover { opacity: 1; color: ${palette.dawn}; }
.la-foot__rule { max-width: 1180px; margin: 0 auto; height: 1px; background: rgba(244,239,223,0.16); }
.la-foot__credit { max-width: 1180px; margin: 1.5rem auto 0; font-size: 0.78rem; opacity: 0.65; }
.la-foot__credit a { color: ${palette.dawn}; text-decoration: none; }
@media (max-width: 720px) { .la-foot__inner { grid-template-columns: 1fr; } .la-foot__nav { grid-template-columns: 1fr 1fr; } }
`;
