import { PageApproach } from "../_lib/PageApproach";
import ZincRoofEngine from "./_engine/ZincRoofEngine";

export default function ZincRoofPage() {
  return (
    <main style={{ background: "#2A2F30", color: "#E8ECEC", minHeight: "100vh" }}>
      <PageApproach>
        <ZincRoofEngine />
      </PageApproach>
    </main>
  );
}
