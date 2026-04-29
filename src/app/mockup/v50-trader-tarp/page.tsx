import { PageApproach } from "../_lib/PageApproach";
import TraderTarpEngine from "./_engine/TraderTarpEngine";

export default function TraderTarpPage() {
  return (
    <main style={{ background: "#1A1916", color: "#F2C400", minHeight: "100vh" }}>
      <PageApproach>
        <TraderTarpEngine />
      </PageApproach>
    </main>
  );
}
