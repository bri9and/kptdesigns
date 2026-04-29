import { DesertHero } from "./_sections/DesertHero";
import { AboutAtAGlance } from "./_sections/AboutAtAGlance";
import { ServiceFieldGuide } from "./_sections/ServiceFieldGuide";
import { GetAQuote } from "./_sections/GetAQuote";
import { Gallery } from "./_sections/Gallery";
import { TrailerRental } from "./_sections/TrailerRental";
import { HowWeWork } from "./_sections/HowWeWork";
import { MaterialsLibrary } from "./_sections/MaterialsLibrary";
import { VisitDC } from "./_sections/VisitDC";
import { FooterDC } from "./_sections/FooterDC";
import { palette, fonts } from "./_lib/tokens";

export function DesertCoyoteSite() {
  return (
    <>
      <main className="dc-site">
        <DesertHero />
        <AboutAtAGlance />
        <ServiceFieldGuide />
        <GetAQuote />
        <Gallery />
        <TrailerRental />
        <HowWeWork />
        <MaterialsLibrary />
        <VisitDC />
        <FooterDC />
      </main>
      <style>{`
        .dc-site { background: ${palette.sand}; color: ${palette.charcoal}; font-family: ${fonts.body}; min-height: 100vh; }
        @media (prefers-reduced-motion: reduce) { .dc-site * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; } }
      `}</style>
    </>
  );
}
