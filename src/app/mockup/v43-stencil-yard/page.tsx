import { PageApproach } from "../_lib/PageApproach";
import StencilYardEngine from "./_engine/StencilYardEngine";

export default function StencilYardPage() {
  return (
    <main style={{ background: "#B8B5AC", color: "#181612", minHeight: "100vh" }}>
      <PageApproach>
        <StencilYardEngine />
      </PageApproach>
    </main>
  );
}
