import { PageApproach } from "../_lib/PageApproach";
import CanopyLiftEngine from "./_engine/CanopyLiftEngine";

export default function CanopyLiftPage() {
  return (
    <main style={{ background: "#1F2A1B", color: "#E8E4CB", minHeight: "100vh" }}>
      <PageApproach>
        <CanopyLiftEngine />
      </PageApproach>
    </main>
  );
}
