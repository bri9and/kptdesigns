import { meta } from "../_lib/content";
import { palette, fonts } from "../_lib/tokens";

export function FooterDC() {
  return (
    <footer id="footer" className="dc-foot">
      <div className="dc-foot__inner">
        <div className="dc-foot__brand">
          <p className="dc-foot__mark">Desert Coyote</p>
          <p className="dc-foot__addr">{meta.serviceArea.value}</p>
          <p className="dc-foot__phone">
            <a href={`tel:${meta.phoneRaw.value}`}>{meta.phone.value}</a>
          </p>
          <p className="dc-foot__email">
            <a href={`mailto:${meta.email.value}`}>{meta.email.value}</a>
          </p>
          <p className="dc-foot__social">
            <a href={meta.facebook.value} target="_blank" rel="noreferrer">Facebook ↗</a>
          </p>
        </div>
        <nav className="dc-foot__nav" aria-label="Footer">
          <div>
            <h4>Services</h4>
            <a href="#service-guide">Field guide</a>
            <a href="#materials">Materials</a>
            <a href="#trailer">Trailer rental</a>
          </div>
          <div>
            <h4>Project</h4>
            <a href="#quote">Get a quote</a>
            <a href="#process">How we work</a>
            <a href="#gallery">Recent yards</a>
          </div>
          <div>
            <h4>Company</h4>
            <a href="#about-at-a-glance">About</a>
            <a href="#visit">Visit / contact</a>
            <a href={`tel:${meta.phoneRaw.value}`}>Call us</a>
          </div>
        </nav>
      </div>
      <div className="dc-foot__rule" aria-hidden="true" />
      <p className="dc-foot__credit">
        © {new Date().getFullYear()} Desert Coyote Landscape · Site by{" "}
        <a href="/proposal/desert-coyote-landscape">KPT Designs</a>
      </p>
      <style>{css}</style>
    </footer>
  );
}

const css = `
.dc-foot { background: ${palette.charcoal}; color: ${palette.paper}; padding: 5rem 5vw 2rem; font-family: ${fonts.body}; }
.dc-foot__inner { display: grid; grid-template-columns: 1fr 2fr; gap: 4rem; max-width: 1180px; margin: 0 auto 3rem; }
.dc-foot__brand p { margin: 0 0 0.4rem; opacity: 0.85; font-size: 0.9rem; }
.dc-foot__mark { font-family: ${fonts.display}; font-size: 1.6rem; font-weight: 400; opacity: 1 !important; color: ${palette.sunGold}; }
.dc-foot__addr { font-family: ${fonts.display}; font-style: italic; line-height: 1.5; }
.dc-foot__phone a, .dc-foot__email a, .dc-foot__social a { color: ${palette.paper}; text-decoration: none; opacity: 0.85; transition: color 180ms, opacity 180ms; }
.dc-foot__phone a:hover, .dc-foot__email a:hover, .dc-foot__social a:hover, .dc-foot__phone a:focus-visible, .dc-foot__email a:focus-visible, .dc-foot__social a:focus-visible { color: ${palette.sunGold}; opacity: 1; outline: none; }
.dc-foot__nav { display: grid; grid-template-columns: repeat(3, 1fr); gap: 2rem; }
.dc-foot__nav h4 { font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; color: ${palette.sunGold}; margin: 0 0 1rem; }
.dc-foot__nav a { display: block; color: ${palette.paper}; text-decoration: none; opacity: 0.78; font-size: 0.9rem; margin: 0 0 0.5rem; transition: opacity 180ms, color 180ms; }
.dc-foot__nav a:hover, .dc-foot__nav a:focus-visible { opacity: 1; color: ${palette.sunGold}; outline: none; }
.dc-foot__rule { max-width: 1180px; margin: 0 auto; height: 1px; background: rgba(245,239,223,0.16); }
.dc-foot__credit { max-width: 1180px; margin: 1.5rem auto 0; font-size: 0.78rem; opacity: 0.65; }
.dc-foot__credit a { color: ${palette.sunGold}; text-decoration: none; }
.dc-foot__credit a:hover, .dc-foot__credit a:focus-visible { text-decoration: underline; outline: none; }
@media (max-width: 720px) {
  .dc-foot__inner { grid-template-columns: 1fr; gap: 2.5rem; }
  .dc-foot__nav { grid-template-columns: 1fr 1fr; }
}
`;
