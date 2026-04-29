import { PageApproach } from "../_lib/PageApproach";
import GreenhouseEngine from "./_engine/GreenhouseEngine";

export default function GreenhousePage() {
  return (
    <main style={{ background: "#DCE6E1", color: "#1A201E", minHeight: "100vh" }}>
      <PageApproach>
        <GreenhouseEngine />
      </PageApproach>
    </main>
  );
}
