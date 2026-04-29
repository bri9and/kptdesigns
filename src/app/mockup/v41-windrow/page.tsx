import { PageApproach } from "../_lib/PageApproach";
import WindrowEngine from "./_engine/WindrowEngine";

export default function WindrowPage() {
  return (
    <main style={{ background: "#0E0B09", color: "#DDD7CB", minHeight: "100vh" }}>
      <PageApproach>
        <WindrowEngine />
      </PageApproach>
    </main>
  );
}
