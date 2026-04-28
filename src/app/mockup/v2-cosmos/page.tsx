import HeroCosmos from "./_sections/HeroCosmos";
import PhilosophyCosmos from "./_sections/PhilosophyCosmos";
import StackCosmos from "./_sections/StackCosmos";
import PortfolioCosmos from "./_sections/PortfolioCosmos";
import ProcessCosmos from "./_sections/ProcessCosmos";
import CtaCosmos from "./_sections/CtaCosmos";

export default function CosmosPage() {
  return (
    <main style={{ background: "#02030A", color: "#F8F8FF", minHeight: "100vh" }}>
      <HeroCosmos />
      <PhilosophyCosmos />
      <StackCosmos />
      <PortfolioCosmos />
      <ProcessCosmos />
      <CtaCosmos />
    </main>
  );
}
