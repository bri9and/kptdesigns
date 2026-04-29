import { PageApproach } from "../_lib/PageApproach";
import PipeCamEngine from "./_engine/PipeCamEngine";

export default function PipeCamPage() {
  return (
    <main style={{ background: "#0E1011", color: "#E5E9EC", minHeight: "100vh" }}>
      <PageApproach>
        <PipeCamEngine />
      </PageApproach>
    </main>
  );
}
