import { PageApproach } from "../_lib/PageApproach";
import BubbleLevelEngine from "./_engine/BubbleLevelEngine";

export default function BubbleLevelPage() {
  return (
    <main style={{ background: "#13161A", color: "#ECECEA", minHeight: "100vh" }}>
      <PageApproach>
        <BubbleLevelEngine />
      </PageApproach>
    </main>
  );
}
