import { PageApproach } from "../_lib/PageApproach";
import RecursiveEngine from "./_engine/RecursiveEngine";

export default function RecursivePage() {
  return (
    <main style={{ background: "#FCFCFA", color: "#0A0A0A", minHeight: "100vh" }}>
      <PageApproach>
        <RecursiveEngine />
      </PageApproach>
    </main>
  );
}
