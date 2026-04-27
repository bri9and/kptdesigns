import AudienceSection from "@/components/landman/audience-section";
import FinalCta from "@/components/landman/final-cta";
import GrainOverlay from "@/components/landman/grain-overlay";
import Hero from "@/components/landman/hero";
import HowItWorks from "@/components/landman/how-it-works";
import ProblemSection from "@/components/landman/problem-section";
import SiteFooter from "@/components/landman/site-footer";
import SiteNav from "@/components/landman/site-nav";
import SourcesSection from "@/components/landman/sources-section";
import TopoBackground from "@/components/landman/topo-background";

export default function LandmanPage() {
  return (
    <>
      <TopoBackground />
      <GrainOverlay />

      <div className="relative">
        <SiteNav />
        <main>
          <Hero />
          <ProblemSection />
          <HowItWorks />
          <AudienceSection />
          <SourcesSection />
          <FinalCta />
        </main>
        <SiteFooter />
      </div>
    </>
  );
}
