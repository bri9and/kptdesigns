import { PageApproach } from "../_lib/PageApproach";
import HerbariumEngine from "./_engine/HerbariumEngine";

export default function HerbariumPage() {
  return (
    <main style={{ background: "#EFE8DC", color: "#2A2418", minHeight: "100vh" }}>
      <PageApproach>
        <HerbariumEngine />
      </PageApproach>
    </main>
  );
}
