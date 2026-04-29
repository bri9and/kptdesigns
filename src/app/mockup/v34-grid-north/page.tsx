import { PageApproach } from "../_lib/PageApproach";
import GridNorthEngine from "./_engine/GridNorthEngine";

export default function GridNorthPage() {
  return (
    <main style={{ background: "#F8F5EE", color: "#0B0D10", minHeight: "100vh" }}>
      <PageApproach>
        <GridNorthEngine />
      </PageApproach>
    </main>
  );
}
