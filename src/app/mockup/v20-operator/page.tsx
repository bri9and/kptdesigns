import HeroOperator from "./_sections/HeroOperator";
import PhilosophyOperator from "./_sections/PhilosophyOperator";
import StackOperator from "./_sections/StackOperator";
import PortfolioOperator from "./_sections/PortfolioOperator";
import ProcessOperator from "./_sections/ProcessOperator";
import CtaOperator from "./_sections/CtaOperator";

export default function OperatorPage() {
  return (
    <main style={{ background: "#F4EFE0", color: "#1A1A1A", minHeight: "100vh" }}>
      <HeroOperator />
      <PhilosophyOperator />
      <StackOperator />
      <PortfolioOperator />
      <ProcessOperator />
      <CtaOperator />
    </main>
  );
}
