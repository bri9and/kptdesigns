import { PageApproach } from "../_lib/PageApproach";
import RivetworkEngine from "./_engine/RivetworkEngine";

export default function RivetworkPage() {
  return (
    <main style={{ background: "#1B1B1B", color: "#E8E5DD", minHeight: "100vh" }}>
      <PageApproach>
        <RivetworkEngine />
      </PageApproach>
    </main>
  );
}
