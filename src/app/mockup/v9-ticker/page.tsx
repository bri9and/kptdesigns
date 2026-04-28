import HeroTicker from "./_sections/HeroTicker";
import PhilosophyTicker from "./_sections/PhilosophyTicker";
import StackTicker from "./_sections/StackTicker";
import PortfolioTicker from "./_sections/PortfolioTicker";
import ProcessTicker from "./_sections/ProcessTicker";
import CtaTicker from "./_sections/CtaTicker";

export default function TickerPage() {
  return (
    <main style={{ background: "#000", color: "#E8E8E8", minHeight: "100vh" }}>
      <HeroTicker />
      <PhilosophyTicker />
      <StackTicker />
      <PortfolioTicker />
      <ProcessTicker />
      <CtaTicker />
    </main>
  );
}
