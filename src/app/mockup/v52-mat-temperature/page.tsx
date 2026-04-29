import { PageApproach } from "../_lib/PageApproach";
import MatTemperatureEngine from "./_engine/MatTemperatureEngine";

export default function MatTemperaturePage() {
  return (
    <main style={{ background: "#161A1F", color: "#F2EFE9", minHeight: "100vh" }}>
      <PageApproach>
        <MatTemperatureEngine />
      </PageApproach>
    </main>
  );
}
