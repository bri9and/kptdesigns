"use client";

import { useState } from "react";
import { Intro } from "./Intro";
import { AnnotationRail } from "./AnnotationRail";
import { BeforeAfter } from "./BeforeAfter";
import { ScopeDrawer } from "./ScopeDrawer";
import { LakeArthurSite } from "@/app/sites/lake-arthur/LakeArthurSite";

export function ProposalShell() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <div className="la-shell">
      <Intro onDone={() => setIntroDone(true)} />
      <div aria-hidden={!introDone} style={{ visibility: introDone ? "visible" : "hidden" }}>
        <LakeArthurSite />
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
