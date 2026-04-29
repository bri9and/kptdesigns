import { PageApproach } from "../_lib/PageApproach";
import SoundStageEngine from "./_engine/SoundStageEngine";

export default function SoundStagePage() {
  return (
    <main style={{ background: "#131214", color: "#F4EDD8", minHeight: "100vh" }}>
      <PageApproach>
        <SoundStageEngine />
      </PageApproach>
    </main>
  );
}
