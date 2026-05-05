"use client";

import { palette, fonts } from "../_lib/tokens";

// Combined visit + footer. Inverted dark surface. Service-area pills,
// big terra phone, email, Facebook link, hours, and the KPT site credit
// linking to the proposal.

const CITIES = [
  "Mesa",
  "Gilbert",
  "Chandler",
  "Queen Creek",
  "Tempe",
  "Apache Junction",
];

const PHONE = "(480) 936-0187";
const PHONE_HREF = "tel:+14809360187";
const EMAIL = "sales@desertcoyotelandscape.com";
const FACEBOOK = "https://www.facebook.com/desertcoyotelandscape";

export function Visit() {
  const year = new Date().getFullYear();

  return (
    <section id="contact" className="dc2-visit" aria-labelledby="dc2-visit-title">
      <div className="dc2-visit__inner">
        <div className="dc2-visit__head">
          <p className="dc2-visit__eyebrow">SERVICE AREA</p>
          <h2 id="dc2-visit-title" className="dc2-visit__title">
            East Valley, Arizona.
          </h2>
          <ul className="dc2-visit__cities" aria-label="Cities served">
            {CITIES.map((c) => (
              <li key={c}><span>{c}</span></li>
            ))}
          </ul>
        </div>

        <div className="dc2-visit__contact">
          <a href={PHONE_HREF} className="dc2-visit__phone" aria-label={`Call ${PHONE}`}>
            {PHONE}
          </a>
          <div className="dc2-visit__lines">
            <a href={`mailto:${EMAIL}`} className="dc2-visit__line">{EMAIL}</a>
            <a href={FACEBOOK} target="_blank" rel="noreferrer" className="dc2-visit__line">
              Facebook · @desertcoyotelandscape
            </a>
            <p className="dc2-visit__hours">
              Mon–Sat · 7 AM – 6 PM · Free estimates by appointment
            </p>
          </div>
        </div>

        <div className="dc2-visit__footer">
          <p>
            © {year} Desert Coyote Landscape · Site by{" "}
            <a href="/proposal/desert-coyote-landscape">KPT Designs</a>
          </p>
        </div>
      </div>

      <style>{css}</style>
    </section>
  );
}

const css = `
.dc2-visit {
  background: ${palette.dark};
  color: ${palette.paper};
  padding: 6rem 5vw 2.5rem;
  font-family: ${fonts.body};
}
.dc2-visit__inner {
  max-width: 1200px; margin: 0 auto;
  display: flex; flex-direction: column; gap: 4rem;
}
.dc2-visit__eyebrow {
  font-family: ${fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.22em;
  color: ${palette.clay};
  margin: 0 0 1.25rem;
  text-transform: uppercase;
}
.dc2-visit__title {
  font-family: ${fonts.display};
  font-weight: 700;
  font-stretch: 80%;
  font-size: clamp(2.4rem, 6vw, 4rem);
  line-height: 1;
  letter-spacing: -0.02em;
  color: ${palette.paper};
  margin: 0 0 1.75rem;
}
.dc2-visit__cities {
  list-style: none; padding: 0; margin: 0;
  display: flex; flex-wrap: wrap; gap: 0.6rem;
}
.dc2-visit__cities li span {
  display: inline-block;
  border: 1px solid rgba(244, 239, 227, 0.28);
  padding: 0.55rem 1rem;
  border-radius: 999px;
  font-family: ${fonts.mono};
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${palette.paper};
}
.dc2-visit__contact {
  display: grid;
  grid-template-columns: 1.2fr 1fr;
  gap: 3rem;
  align-items: end;
}
.dc2-visit__phone {
  font-family: ${fonts.display};
  font-weight: 700;
  font-stretch: 78%;
  font-size: clamp(2.6rem, 7.5vw, 5.4rem);
  line-height: 0.95;
  letter-spacing: -0.02em;
  color: ${palette.terra};
  text-decoration: none;
  display: inline-block;
}
.dc2-visit__phone:hover { color: ${palette.clay}; }
.dc2-visit__phone:focus-visible { outline: 2px solid ${palette.clay}; outline-offset: 4px; }
.dc2-visit__lines {
  display: flex; flex-direction: column; gap: 0.75rem;
  align-items: flex-start;
}
.dc2-visit__line {
  color: ${palette.paper};
  text-decoration: none;
  border-bottom: 1px solid rgba(244, 239, 227, 0.3);
  padding-bottom: 0.15rem;
  font-size: 0.98rem;
  transition: border-color 160ms ease, color 160ms ease;
}
.dc2-visit__line:hover { color: ${palette.clay}; border-bottom-color: ${palette.clay}; }
.dc2-visit__line:focus-visible { outline: 2px solid ${palette.clay}; outline-offset: 3px; }
.dc2-visit__hours {
  font-family: ${fonts.mono};
  font-size: 0.72rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${palette.dust};
  margin: 0.5rem 0 0;
}

.dc2-visit__footer {
  border-top: 1px solid rgba(244, 239, 227, 0.14);
  padding-top: 1.75rem;
  margin-top: 1.5rem;
}
.dc2-visit__footer p {
  font-family: ${fonts.mono};
  font-size: 0.7rem;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  color: ${palette.dust};
  margin: 0;
}
.dc2-visit__footer a {
  color: ${palette.paper};
  text-decoration: underline;
  text-underline-offset: 3px;
}
.dc2-visit__footer a:hover { color: ${palette.clay}; }

@media (max-width: 880px) {
  .dc2-visit { padding: 4rem 1.25rem 2rem; }
  .dc2-visit__inner { gap: 2.75rem; }
  .dc2-visit__contact { grid-template-columns: 1fr; gap: 1.75rem; align-items: start; }
}
`;
