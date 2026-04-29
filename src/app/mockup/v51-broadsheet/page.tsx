import { PageApproach } from "../_lib/PageApproach";
import BroadsheetEngine from "./_engine/BroadsheetEngine";

export default function BroadsheetPage() {
  return (
    <main style={{ background: "#E9E2D2", color: "#0F0F0E", minHeight: "100vh" }}>
      <PageApproach>
        <BroadsheetEngine />
      </PageApproach>
    </main>
  );
}
