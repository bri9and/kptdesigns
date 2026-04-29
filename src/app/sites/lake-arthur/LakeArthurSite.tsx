import { LakeArthurFonts } from "./_lib/Fonts";
import { Header } from "./_sections/Header";
import { Hero } from "./_sections/Hero";
import { WhyPlay } from "./_sections/WhyPlay";
import { CourseAtAGlance } from "./_sections/CourseAtAGlance";
import { SignatureHoles } from "./_sections/SignatureHoles";
import { Scorecard } from "./_sections/Scorecard";
import { BookTeeTime } from "./_sections/BookTeeTime";
import { Events } from "./_sections/Events";
import { Visit } from "./_sections/Visit";
import { Footer } from "./_sections/Footer";
import { palette, fonts } from "./_lib/tokens";

// v2 composition — photographic editorial. Drone footage demoted to a
// callout inside the Hero photo. v1 sections (DroneHero / FieldGuide /
// Banquets / Tournaments / Leagues / ProShop) remain on disk for
// reference but are not imported here.

export function LakeArthurSite() {
  return (
    <>
      <LakeArthurFonts />
      <main className="la-site">
        <Header />
        <Hero />
        <WhyPlay />
        <CourseAtAGlance />
        <SignatureHoles />
        <Scorecard />
        <BookTeeTime />
        <Events />
        <Visit />
        <Footer />
      </main>
      <style>{`
        .la-site {
          background: ${palette.paper};
          color: ${palette.ink};
          font-family: ${fonts.body};
          min-height: 100vh;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
          font-synthesis: none;
        }
        .la-site * { font-variation-settings: normal; }
        @media (prefers-reduced-motion: reduce) { .la-site * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; } }
      `}</style>
    </>
  );
}
