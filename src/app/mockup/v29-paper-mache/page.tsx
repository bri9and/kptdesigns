import { PageApproach } from "../_lib/PageApproach";
import PaperMacheEngine from "./_engine/PaperMacheEngine";

export default function PaperMachePage() {
  return (
    <main style={{ background: "#F4F1EB", color: "#241B14", minHeight: "100vh" }}>
      <PageApproach>
        <PaperMacheEngine />
      </PageApproach>
    </main>
  );
}
