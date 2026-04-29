import { DCFonts } from "./_lib/DCFonts";
import { Header } from "./_sections/Header";
import { Hero } from "./_sections/Hero";
import { Services } from "./_sections/Services";
import { EstimateRequest } from "./_sections/EstimateRequest";
import { Visit } from "./_sections/Visit";
import { palette, fonts } from "./_lib/tokens";

// v2 — simpler-but-better. Five sections, concrete + dust aesthetic.
// Family-run East Valley landscape contractor; the customer asked us to
// match their actual operational simplicity.

export function DesertCoyoteSite() {
  return (
    <>
      <DCFonts />
      <main id="top" className="dc2-site">
        <Header />
        <Hero />
        <Services />
        <EstimateRequest />
        <Visit />
      </main>
      <style>{`
        .dc2-site {
          background: ${palette.bg};
          color: ${palette.ink};
          font-family: ${fonts.body};
          min-height: 100vh;
        }
        .dc2-site :focus-visible { outline-color: ${palette.terra}; }
        @media (prefers-reduced-motion: reduce) {
          .dc2-site * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; }
        }
      `}</style>
    </>
  );
}
