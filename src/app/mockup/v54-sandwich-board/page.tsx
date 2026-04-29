import { PageApproach } from "../_lib/PageApproach";
import SandwichBoardEngine from "./_engine/SandwichBoardEngine";

export default function SandwichBoardPage() {
  return (
    <main style={{ background: "#1B1F1D", color: "#F0EBDC", minHeight: "100vh" }}>
      <PageApproach>
        <SandwichBoardEngine />
      </PageApproach>
    </main>
  );
}
