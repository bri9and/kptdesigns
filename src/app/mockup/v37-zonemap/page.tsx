import { PageApproach } from "../_lib/PageApproach";
import ZonemapEngine from "./_engine/ZonemapEngine";

export default function ZonemapPage() {
  return (
    <main style={{ background: "#0E1B26", color: "#F2F5EF", minHeight: "100vh" }}>
      <PageApproach>
        <ZonemapEngine />
      </PageApproach>
    </main>
  );
}
