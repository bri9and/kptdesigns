import { PageApproach } from "../_lib/PageApproach";
import StorypoleEngine from "./_engine/StorypoleEngine";

export default function StorypolePage() {
  return (
    <main style={{ background: "#181816", color: "#E5CDA0", minHeight: "100vh" }}>
      <PageApproach>
        <StorypoleEngine />
      </PageApproach>
    </main>
  );
}
