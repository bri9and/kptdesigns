import { PageApproach } from "../_lib/PageApproach";
import BenchGrainEngine from "./_engine/BenchGrainEngine";

export default function BenchGrainPage() {
  return (
    <main style={{ background: "#E0CFA1", color: "#2A1A0E", minHeight: "100vh" }}>
      <PageApproach>
        <BenchGrainEngine />
      </PageApproach>
    </main>
  );
}
