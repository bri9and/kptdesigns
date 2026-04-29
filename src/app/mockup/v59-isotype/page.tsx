import { PageApproach } from "../_lib/PageApproach";
import IsotypeEngine from "./_engine/IsotypeEngine";

export default function IsotypePage() {
  return (
    <main style={{ background: "#EDE7D9", color: "#0E0E0E", minHeight: "100vh" }}>
      <PageApproach>
        <IsotypeEngine />
      </PageApproach>
    </main>
  );
}
