import { PageApproach } from "../_lib/PageApproach";
import PellucidEngine from "./_engine/PellucidEngine";

export default function PellucidPage() {
  return (
    <main style={{ background: "#0F1130", color: "#E6EAEF", minHeight: "100vh" }}>
      <PageApproach>
        <PellucidEngine />
      </PageApproach>
    </main>
  );
}
