import { PageApproach } from "../_lib/PageApproach";
import SolderingEngine from "./_engine/SolderingEngine";

export default function SolderingPage() {
  return (
    <main style={{ background: "#2A1A0F", color: "#F0EAD8", minHeight: "100vh" }}>
      <PageApproach>
        <SolderingEngine />
      </PageApproach>
    </main>
  );
}
