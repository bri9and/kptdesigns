import { PageApproach } from "../_lib/PageApproach";
import PaintChipEngine from "./_engine/PaintChipEngine";

export default function PaintChipPage() {
  return (
    <main style={{ background: "#F0EBE2", color: "#0E0E0E", minHeight: "100vh" }}>
      <PageApproach>
        <PaintChipEngine />
      </PageApproach>
    </main>
  );
}
