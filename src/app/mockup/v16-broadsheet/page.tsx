import HeroBroadsheet from "./_sections/HeroBroadsheet";
import PhilosophyBroadsheet from "./_sections/PhilosophyBroadsheet";
import StackBroadsheet from "./_sections/StackBroadsheet";
import PortfolioBroadsheet from "./_sections/PortfolioBroadsheet";
import ProcessBroadsheet from "./_sections/ProcessBroadsheet";
import CtaBroadsheet from "./_sections/CtaBroadsheet";

export default function BroadsheetPage() {
  return (
    <main style={{ background: "#F5F0E1", color: "#1A1A1A", minHeight: "100vh" }}>
      <HeroBroadsheet />
      <PhilosophyBroadsheet />
      <StackBroadsheet />
      <PortfolioBroadsheet />
      <ProcessBroadsheet />
      <CtaBroadsheet />
    </main>
  );
}
