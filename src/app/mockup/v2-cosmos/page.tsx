import { PageApproach } from "../_lib/PageApproach";
import CosmosEngine from "./_engine/CosmosEngine";

export default function CosmosPage() {
  return (
    <main style={{ background: "#02030A", color: "#F8F8FF", minHeight: "100vh" }}>
      <PageApproach>
        <CosmosEngine />
      </PageApproach>
    </main>
  );
}
