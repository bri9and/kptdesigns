import { PageApproach } from "../_lib/PageApproach";
import ColorBlockEngine from "./_engine/ColorBlockEngine";

export default function ColorBlockPage() {
  return (
    <main style={{ background: "#F2EEE5", color: "#0A0A0A", minHeight: "100vh" }}>
      <PageApproach>
        <ColorBlockEngine />
      </PageApproach>
    </main>
  );
}
