import HeroNostromo from "./_sections/HeroNostromo";
import PhilosophyNostromo from "./_sections/PhilosophyNostromo";
import StackNostromo from "./_sections/StackNostromo";
import PortfolioNostromo from "./_sections/PortfolioNostromo";
import ProcessNostromo from "./_sections/ProcessNostromo";
import CtaNostromo from "./_sections/CtaNostromo";

export default function NostromoPage() {
  return (
    <main style={{ background: "#0A0A0F", color: "#FFB000", minHeight: "100vh" }}>
      <HeroNostromo />
      <PhilosophyNostromo />
      <StackNostromo />
      <PortfolioNostromo />
      <ProcessNostromo />
      <CtaNostromo />
    </main>
  );
}
