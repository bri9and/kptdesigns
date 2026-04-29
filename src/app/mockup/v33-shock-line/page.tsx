import { PageApproach } from "../_lib/PageApproach";
import ShockLineEngine from "./_engine/ShockLineEngine";

export default function ShockLinePage() {
  return (
    <main style={{ background: "#F4F4EE", color: "#131313", minHeight: "100vh" }}>
      <PageApproach>
        <ShockLineEngine />
      </PageApproach>
    </main>
  );
}
