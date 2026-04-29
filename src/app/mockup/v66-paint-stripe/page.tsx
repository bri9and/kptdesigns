import { PageApproach } from "../_lib/PageApproach";
import PaintStripeEngine from "./_engine/PaintStripeEngine";

export default function PaintStripePage() {
  return (
    <main style={{ background: "#131211", color: "#FAD230", minHeight: "100vh" }}>
      <PageApproach>
        <PaintStripeEngine />
      </PageApproach>
    </main>
  );
}
