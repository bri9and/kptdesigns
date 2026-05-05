"use client";

import { useState } from "react";
import { Intro } from "./Intro";
import { AnnotationRail } from "./AnnotationRail";
import { BeforeAfter } from "./BeforeAfter";
import { ScopeDrawer } from "./ScopeDrawer";
import { DesertCoyoteSite } from "@/app/sites/desert-coyote-landscape/DesertCoyoteSite";

export function ProposalShell() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="dc-shell">
      <Intro onDone={() => setIntroDone(true)} />
      <div aria-hidden={!introDone} style={{ visibility: introDone ? "visible" : "hidden" }}>
        <DesertCoyoteSite />
      </div>
      {introDone && (
        <>
          <AnnotationRail />
          <BeforeAfter />
          <ScopeDrawer />
        </>
      )}
    </div>
  );
}
