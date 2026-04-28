import HeroAtelier from "./_sections/HeroAtelier";
import PhilosophyAtelier from "./_sections/PhilosophyAtelier";
import StackAtelier from "./_sections/StackAtelier";
import PortfolioAtelier from "./_sections/PortfolioAtelier";
import ProcessAtelier from "./_sections/ProcessAtelier";
import CtaAtelier from "./_sections/CtaAtelier";

export default function AtelierPage() {
  return (
    <main style={{ background: "#F4E4DC", color: "#1A1612", minHeight: "100vh" }}>
      <HeroAtelier />
      <PhilosophyAtelier />
      <StackAtelier />
      <PortfolioAtelier />
      <ProcessAtelier />
      <CtaAtelier />
    </main>
  );
}
