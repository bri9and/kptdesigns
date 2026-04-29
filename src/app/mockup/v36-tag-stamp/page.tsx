import { PageApproach } from "../_lib/PageApproach";
import TagStampEngine from "./_engine/TagStampEngine";

export default function TagStampPage() {
  return (
    <main style={{ background: "#E8E3D6", color: "#26241D", minHeight: "100vh" }}>
      <PageApproach>
        <TagStampEngine />
      </PageApproach>
    </main>
  );
}
