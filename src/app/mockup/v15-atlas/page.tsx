import HeroAtlas from "./_sections/HeroAtlas";
import PhilosophyAtlas from "./_sections/PhilosophyAtlas";
import StackAtlas from "./_sections/StackAtlas";
import PortfolioAtlas from "./_sections/PortfolioAtlas";
import ProcessAtlas from "./_sections/ProcessAtlas";
import CtaAtlas from "./_sections/CtaAtlas";

export default function AtlasPage() {
  return (
    <main style={{ background: "#F4EFE3", color: "#3D2817", minHeight: "100vh" }}>
      <HeroAtlas />
      <PhilosophyAtlas />
      <StackAtlas />
      <PortfolioAtlas />
      <ProcessAtlas />
      <CtaAtlas />
    </main>
  );
}
