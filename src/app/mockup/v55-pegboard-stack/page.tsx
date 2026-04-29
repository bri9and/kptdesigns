import { PageApproach } from "../_lib/PageApproach";
import PegboardStackEngine from "./_engine/PegboardStackEngine";

export default function PegboardStackPage() {
  return (
    <main style={{ background: "#1A1A1A", color: "#F1EFEC", minHeight: "100vh" }}>
      <PageApproach>
        <PegboardStackEngine />
      </PageApproach>
    </main>
  );
}
