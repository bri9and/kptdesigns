import HeroSpecimen from "./_sections/HeroSpecimen";
import PhilosophySpecimen from "./_sections/PhilosophySpecimen";
import StackSpecimen from "./_sections/StackSpecimen";
import PortfolioSpecimen from "./_sections/PortfolioSpecimen";
import ProcessSpecimen from "./_sections/ProcessSpecimen";
import CtaSpecimen from "./_sections/CtaSpecimen";

export default function SpecimenPage() {
  return (
    <main style={{ background: "#FAFAFA", color: "#0A0A0A", minHeight: "100vh" }}>
      <HeroSpecimen />
      <PhilosophySpecimen />
      <StackSpecimen />
      <PortfolioSpecimen />
      <ProcessSpecimen />
      <CtaSpecimen />
    </main>
  );
}
