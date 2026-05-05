import HeroReceipt from "./_sections/HeroReceipt";
import PhilosophyReceipt from "./_sections/PhilosophyReceipt";
import StackReceipt from "./_sections/StackReceipt";
import PortfolioReceipt from "./_sections/PortfolioReceipt";
import ProcessReceipt from "./_sections/ProcessReceipt";
import CtaReceipt from "./_sections/CtaReceipt";

export default function ReceiptPage() {
  return (
    <main style={{ background: "#FBFBFB", color: "#1A1A1A", minHeight: "100vh" }}>
      <HeroReceipt />
      <PhilosophyReceipt />
      <StackReceipt />
      <PortfolioReceipt />
      <ProcessReceipt />
      <CtaReceipt />
    </main>
  );
}
