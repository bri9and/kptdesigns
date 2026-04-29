import { PageApproach } from "../_lib/PageApproach";
import PipeStackEngine from "./_engine/PipeStackEngine";

export default function PipeStackPage() {
  return (
    <main style={{ background: "#ECEAE2", color: "#1B1B1B", minHeight: "100vh" }}>
      <PageApproach>
        <PipeStackEngine />
      </PageApproach>
    </main>
  );
}
