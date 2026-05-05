import HeroTerminal from "./_sections/HeroTerminal";
import PhilosophyTerminal from "./_sections/PhilosophyTerminal";
import StackTerminal from "./_sections/StackTerminal";
import PortfolioTerminal from "./_sections/PortfolioTerminal";
import ProcessTerminal from "./_sections/ProcessTerminal";
import CtaTerminal from "./_sections/CtaTerminal";

export default function TerminalPage() {
  return (
    <main style={{ background: "#000", color: "#33FF66", minHeight: "100vh", fontFamily: "var(--font-jetbrains-mono, monospace)" }}>
      <HeroTerminal />
      <PhilosophyTerminal />
      <StackTerminal />
      <PortfolioTerminal />
      <ProcessTerminal />
      <CtaTerminal />
    </main>
  );
}
