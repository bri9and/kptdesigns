import HeroCassette from "./_sections/HeroCassette";
import PhilosophyCassette from "./_sections/PhilosophyCassette";
import StackCassette from "./_sections/StackCassette";
import PortfolioCassette from "./_sections/PortfolioCassette";
import ProcessCassette from "./_sections/ProcessCassette";
import CtaCassette from "./_sections/CtaCassette";

export default function CassettePage() {
  return (
    <main style={{ background: "#3D2817", color: "#F5EBD0", minHeight: "100vh" }}>
      <HeroCassette />
      <PhilosophyCassette />
      <StackCassette />
      <PortfolioCassette />
      <ProcessCassette />
      <CtaCassette />
    </main>
  );
}
