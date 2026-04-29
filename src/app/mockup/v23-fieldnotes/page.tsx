import { PageApproach } from "../_lib/PageApproach";
import FieldnotesEngine from "./_engine/FieldnotesEngine";

export default function FieldnotesPage() {
  return (
    <main style={{ background: "#C7B58B", color: "#1A1A14", minHeight: "100vh" }}>
      <PageApproach>
        <FieldnotesEngine />
      </PageApproach>
    </main>
  );
}
