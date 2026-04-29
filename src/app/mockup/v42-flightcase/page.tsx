import { PageApproach } from "../_lib/PageApproach";
import FlightcaseEngine from "./_engine/FlightcaseEngine";

export default function FlightcasePage() {
  return (
    <main style={{ background: "#18181B", color: "#E6E6E8", minHeight: "100vh" }}>
      <PageApproach>
        <FlightcaseEngine />
      </PageApproach>
    </main>
  );
}
