import { PageApproach } from "../_lib/PageApproach";
import SnapLineEngine from "./_engine/SnapLineEngine";

export default function SnapLinePage() {
  return (
    <main style={{ background: "#0F0F12", color: "#E5E2DA", minHeight: "100vh" }}>
      <PageApproach>
        <SnapLineEngine />
      </PageApproach>
    </main>
  );
}
