import { PageApproach } from "../_lib/PageApproach";
import GalaxyBrainEngine from "./_engine/GalaxyBrainEngine";

export default function GalaxyBrainPage() {
  return (
    <main style={{ background: "#06070C", color: "#E9F2F6", minHeight: "100vh" }}>
      <PageApproach>
        <GalaxyBrainEngine />
      </PageApproach>
    </main>
  );
}
