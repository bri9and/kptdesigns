import HeroArchitectural from "./_sections/HeroArchitectural";
import PhilosophyArchitectural from "./_sections/PhilosophyArchitectural";
import StackArchitectural from "./_sections/StackArchitectural";
import PortfolioArchitectural from "./_sections/PortfolioArchitectural";
import ProcessArchitectural from "./_sections/ProcessArchitectural";
import CtaArchitectural from "./_sections/CtaArchitectural";

export default function ArchitecturalPage() {
  return (
    <main style={{ background: "#0E1E2E", color: "#E8EAEC", minHeight: "100vh" }}>
      <HeroArchitectural />
      <PhilosophyArchitectural />
      <StackArchitectural />
      <PortfolioArchitectural />
      <ProcessArchitectural />
      <CtaArchitectural />
    </main>
  );
}
