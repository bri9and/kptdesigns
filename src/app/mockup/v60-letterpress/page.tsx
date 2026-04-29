import { PageApproach } from "../_lib/PageApproach";
import LetterpressEngine from "./_engine/LetterpressEngine";

export default function LetterpressPage() {
  return (
    <main style={{ background: "#F2EBDC", color: "#131312", minHeight: "100vh" }}>
      <PageApproach>
        <LetterpressEngine />
      </PageApproach>
    </main>
  );
}
