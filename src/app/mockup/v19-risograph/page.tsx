import HeroRisograph from "./_sections/HeroRisograph";
import PhilosophyRisograph from "./_sections/PhilosophyRisograph";
import StackRisograph from "./_sections/StackRisograph";
import PortfolioRisograph from "./_sections/PortfolioRisograph";
import ProcessRisograph from "./_sections/ProcessRisograph";
import CtaRisograph from "./_sections/CtaRisograph";

export default function RisographPage() {
  return (
    <main style={{ background: "#F5F0E1", color: "#1A1A1A", minHeight: "100vh" }}>
      <HeroRisograph />
      <PhilosophyRisograph />
      <StackRisograph />
      <PortfolioRisograph />
      <ProcessRisograph />
      <CtaRisograph />
    </main>
  );
}
