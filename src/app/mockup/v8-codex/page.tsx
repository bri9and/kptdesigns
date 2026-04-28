import HeroCodex from "./_sections/HeroCodex";
import PhilosophyCodex from "./_sections/PhilosophyCodex";
import StackCodex from "./_sections/StackCodex";
import PortfolioCodex from "./_sections/PortfolioCodex";
import ProcessCodex from "./_sections/ProcessCodex";
import CtaCodex from "./_sections/CtaCodex";

export default function CodexPage() {
  return (
    <main style={{ background: "#F2E8D5", color: "#1B1410", minHeight: "100vh" }}>
      <HeroCodex />
      <PhilosophyCodex />
      <StackCodex />
      <PortfolioCodex />
      <ProcessCodex />
      <CtaCodex />
    </main>
  );
}
