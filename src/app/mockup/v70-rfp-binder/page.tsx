import { PageApproach } from "../_lib/PageApproach";
import RfpBinderEngine from "./_engine/RfpBinderEngine";

export default function RfpBinderPage() {
  return (
    <main style={{ background: "#1A1916", color: "#1A1916", minHeight: "100vh" }}>
      <PageApproach>
        <RfpBinderEngine />
      </PageApproach>
    </main>
  );
}
