import { DroneHero } from "./_sections/DroneHero";
import { CourseAtAGlance } from "./_sections/CourseAtAGlance";
import { FieldGuide } from "./_sections/FieldGuide";
import { BookTeeTime } from "./_sections/BookTeeTime";
import { Banquets } from "./_sections/Banquets";
import { Tournaments } from "./_sections/Tournaments";
import { Leagues } from "./_sections/Leagues";
import { ProShop } from "./_sections/ProShop";
import { Visit } from "./_sections/Visit";
import { Footer } from "./_sections/Footer";
import { palette, fonts } from "./_lib/tokens";

export function LakeArthurSite() {
  return (
    <>
      <main className="la-site">
        <DroneHero />
        <CourseAtAGlance />
        <FieldGuide />
        <BookTeeTime />
        <Banquets />
        <Tournaments />
        <Leagues />
        <ProShop />
        <Visit />
        <Footer />
      </main>
      <style>{`
        .la-site { background: ${palette.paper}; color: ${palette.charcoal}; font-family: ${fonts.body}; min-height: 100vh; }
        @media (prefers-reduced-motion: reduce) { .la-site * { animation-duration: 0.001ms !important; transition-duration: 0.001ms !important; } }
      `}</style>
    </>
  );
}
