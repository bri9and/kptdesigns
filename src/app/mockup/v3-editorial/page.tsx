import HeroEditorial from "./_sections/HeroEditorial";
import PhilosophyEditorial from "./_sections/PhilosophyEditorial";
import StackEditorial from "./_sections/StackEditorial";
import PortfolioEditorial from "./_sections/PortfolioEditorial";
import ProcessEditorial from "./_sections/ProcessEditorial";
import CtaEditorial from "./_sections/CtaEditorial";

export default function EditorialPage() {
  return (
    <main style={{ background: "#F5F1EA", color: "#0F0F0F", minHeight: "100vh" }}>
      <HeroEditorial />
      <PhilosophyEditorial />
      <StackEditorial />
      <PortfolioEditorial />
      <ProcessEditorial />
      <CtaEditorial />
    </main>
  );
}
