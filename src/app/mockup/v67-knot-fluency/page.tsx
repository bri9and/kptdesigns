import { PageApproach } from "../_lib/PageApproach";
import KnotFluencyEngine from "./_engine/KnotFluencyEngine";

export default function KnotFluencyPage() {
  return (
    <main style={{ background: "#0E0E0E", color: "#C0E140", minHeight: "100vh" }}>
      <PageApproach>
        <KnotFluencyEngine />
      </PageApproach>
    </main>
  );
}
