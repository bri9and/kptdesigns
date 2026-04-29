import { PageApproach } from "../_lib/PageApproach";
import RoadsideNeonEngine from "./_engine/RoadsideNeonEngine";

export default function RoadsideNeonPage() {
  return (
    <main style={{ background: "#15161B", color: "#F5E6C8", minHeight: "100vh" }}>
      <PageApproach>
        <RoadsideNeonEngine />
      </PageApproach>
    </main>
  );
}
