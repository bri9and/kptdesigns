"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { palette, fonts } from "@/app/sites/lake-arthur/_lib/tokens";
import { PasswordGate } from "./PasswordGate";
import { IntakeForm, type IntakePayload } from "./IntakeForm";
import { PipelineStage } from "./PipelineStage";
import { ProposalCard } from "./ProposalCard";
import {
  ARCHITECTURE_SECTIONS,
  CONCEPT_DIRECTIONS,
  PALETTES,
  TYPEFACE_PAIRS,
  VOICE_TAGS,
  pickByName,
  pickNByName,
  locationGuess,
  siteAgeGuess,
  slugify,
  type ConceptDirection,
  type Palette as PaletteType,
  type TypefacePair,
} from "./staged-data";

type Stage = "locked" | "intake" | "pipeline" | "ready";

const PIPELINE_STEP_COUNT = 5;
const SUBSTAGE_DURATION_MS = 2400;

// Lazy initial state — read the unlock flag once during the first render
// instead of in an effect. SSR-safe (typeof window check).
function readInitialStage(): Stage {
  if (typeof window === "undefined") return "locked";
  try {
    return localStorage.getItem("kpt:pitch:unlocked") === "1" ? "intake" : "locked";
  } catch {
    return "locked";
  }
}

export function PitchShell() {
  const [stage, setStage] = useState<Stage>(readInitialStage);
  const [intake, setIntake] = useState<IntakePayload | null>(null);
  const [pipelineStep, setPipelineStep] = useState(0); // 0..PIPELINE_STEP_COUNT
  const [pipelineStartedAt, setPipelineStartedAt] = useState<number | null>(null);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Drive the pipeline auto-advance.
  useEffect(() => {
    if (stage !== "pipeline") return;
    if (pipelineStep >= PIPELINE_STEP_COUNT) {
      // small delay before moving to "ready" to let the final card breathe.
      timerRef.current = setTimeout(() => {
        if (pipelineStartedAt) {
          setElapsedSeconds(Math.max(1, Math.round((Date.now() - pipelineStartedAt) / 1000)));
        }
        setStage("ready");
      }, 700);
      return () => {
        if (timerRef.current) clearTimeout(timerRef.current);
      };
    }
    timerRef.current = setTimeout(() => {
      setPipelineStep((s) => s + 1);
    }, SUBSTAGE_DURATION_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [stage, pipelineStep, pipelineStartedAt]);

  function onUnlock() {
    setStage("intake");
  }

  function onIntake(payload: IntakePayload) {
    setIntake(payload);
    setPipelineStep(0);
    setPipelineStartedAt(Date.now());
    setStage("pipeline");
  }

  function skipStage() {
    if (stage !== "pipeline") return;
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }
    setPipelineStep((s) => s + 1);
  }

  function startOver() {
    setIntake(null);
    setPipelineStep(0);
    setPipelineStartedAt(null);
    setElapsedSeconds(0);
    setStage("intake");
  }

  return (
    <main className="pitch-shell">
      <AnimatePresence mode="wait">
        {stage === "locked" && (
          <motion.div key="locked" exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <PasswordGate onUnlock={onUnlock} />
          </motion.div>
        )}

        {stage === "intake" && (
          <motion.div key="intake" exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <IntakeForm onSubmit={onIntake} />
          </motion.div>
        )}

        {stage === "pipeline" && intake && (
          <motion.div key="pipeline" exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <PipelineView
              intake={intake}
              currentStep={pipelineStep}
              onSkip={skipStage}
            />
          </motion.div>
        )}

        {stage === "ready" && intake && (
          <motion.div key="ready" exit={{ opacity: 0 }} transition={{ duration: 0.35 }}>
            <ReadyView
              intake={intake}
              elapsedSeconds={elapsedSeconds}
              onStartOver={startOver}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}

// ---------------- pipeline view ----------------

function PipelineView({
  intake,
  currentStep,
  onSkip,
}: {
  intake: IntakePayload;
  currentStep: number;
  onSkip: () => void;
}) {
  const { businessName, industry, websiteUrl } = intake;
  const slug = slugify(businessName);

  const palette5 = useMemo<PaletteType>(() => pickByName(businessName, PALETTES, "palette"), [businessName]);
  const typePair = useMemo<TypefacePair>(() => pickByName(businessName, TYPEFACE_PAIRS, "typeface"), [businessName]);
  const voiceTags = useMemo<string[]>(
    () => pickNByName(businessName, VOICE_TAGS, 3, "voice"),
    [businessName],
  );
  const concepts = useMemo<ConceptDirection[]>(
    () => pickNByName(businessName, CONCEPT_DIRECTIONS, 3, "concepts"),
    [businessName],
  );
  const sections = ARCHITECTURE_SECTIONS[industry];

  const isRevealed = (i: number) => currentStep > i;
  const isActive   = (i: number) => currentStep === i;

  return (
    <div className="pv-canvas">
      <header className="pv-head">
        <p className="pv-eyebrow">Generating proposal · {businessName}</p>
        <p className="pv-meta">{websiteUrl || `${slug}.com`} · {industry}</p>
      </header>

      <div className="pv-stages">
        <PipelineStage
          stepNumber="01"
          eyebrow="Fingerprint"
          workingLabel={`Reading ${websiteUrl || `${slug}.com`}`}
          isActive={isActive(0)}
          hasRevealed={isRevealed(0)}
        >
          <Fingerprint intake={intake} />
        </PipelineStage>

        <PipelineStage
          stepNumber="02"
          eyebrow="Brand DNA"
          workingLabel="Capturing brand DNA"
          isActive={isActive(1)}
          hasRevealed={isRevealed(1)}
        >
          <BrandDna palette5={palette5} typePair={typePair} voiceTags={voiceTags} />
        </PipelineStage>

        <PipelineStage
          stepNumber="03"
          eyebrow="Concept directions"
          workingLabel="Generating concept directions"
          isActive={isActive(2)}
          hasRevealed={isRevealed(2)}
        >
          <Concepts concepts={concepts} />
        </PipelineStage>

        <PipelineStage
          stepNumber="04"
          eyebrow="Architecture"
          workingLabel="Compiling site architecture"
          isActive={isActive(3)}
          hasRevealed={isRevealed(3)}
        >
          <Architecture sections={sections} />
        </PipelineStage>

        <PipelineStage
          stepNumber="05"
          eyebrow="Proposal"
          workingLabel="Composing proposal"
          isActive={isActive(4)}
          hasRevealed={isRevealed(4)}
        >
          <p className="pv-proposal-stub">
            Proposal compiled — finishing the cover…
          </p>
        </PipelineStage>
      </div>

      <button type="button" className="pv-skip" onClick={onSkip} aria-label="Skip current stage">
        → skip stage
      </button>

      <style>{css}</style>
    </div>
  );
}

function Fingerprint({ intake }: { intake: IntakePayload }) {
  const { businessName, industry } = intake;
  return (
    <div className="pv-chips">
      <Chip label="Industry" value={industry} />
      <Chip label="Location" value={locationGuess(businessName)} />
      <Chip label="Site age" value={siteAgeGuess(businessName)} />
    </div>
  );
}

function Chip({ label, value }: { label: string; value: string }) {
  return (
    <motion.div
      className="pv-chip"
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <span>{label}</span>
      <strong>{value}</strong>
    </motion.div>
  );
}

function BrandDna({
  palette5,
  typePair,
  voiceTags,
}: {
  palette5: PaletteType;
  typePair: TypefacePair;
  voiceTags: string[];
}) {
  return (
    <div className="pv-dna">
      <div className="pv-dna-block">
        <p className="pv-dna-label">Palette · {palette5.name}</p>
        <div className="pv-swatches">
          {palette5.swatches.map((s, i) => (
            <motion.div
              key={s + i}
              className="pv-sw"
              style={{ background: s }}
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.06, duration: 0.35 }}
              title={s}
            />
          ))}
        </div>
      </div>

      <div className="pv-dna-block">
        <p className="pv-dna-label">Typography · {typePair.vibe}</p>
        <p className="pv-typo-display">{typePair.display}</p>
        <p className="pv-typo-body">paired with {typePair.body}</p>
      </div>

      <div className="pv-dna-block">
        <p className="pv-dna-label">Voice</p>
        <div className="pv-tags">
          {voiceTags.map((t, i) => (
            <motion.span
              key={t}
              className="pv-tag"
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.3 }}
            >
              {t}
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

function Concepts({ concepts }: { concepts: ConceptDirection[] }) {
  return (
    <div className="pv-concepts">
      {concepts.map((c, i) => (
        <motion.div
          key={c.title}
          className="pv-concept"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: i * 0.12, duration: 0.45 }}
        >
          <div
            className="pv-concept-tile"
            style={{ background: `linear-gradient(135deg, ${c.gradient[0]}, ${c.gradient[1]})` }}
            aria-hidden="true"
          >
            <span className="pv-concept-mono">{c.inspiration}</span>
          </div>
          <h4>{c.title}</h4>
          <p>{c.teaser}</p>
        </motion.div>
      ))}
    </div>
  );
}

function Architecture({ sections }: { sections: string[] }) {
  return (
    <ul className="pv-arch">
      {sections.map((s, i) => (
        <motion.li
          key={s}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.07, duration: 0.3 }}
        >
          <span className="pv-arch-check" aria-hidden="true">✓</span>
          <span>{s}</span>
        </motion.li>
      ))}
    </ul>
  );
}

// ---------------- ready view ----------------

function ReadyView({
  intake,
  elapsedSeconds,
  onStartOver,
}: {
  intake: IntakePayload;
  elapsedSeconds: number;
  onStartOver: () => void;
}) {
  return (
    <div className="rv-canvas">
      <ProposalCard
        businessName={intake.businessName}
        industry={intake.industry}
        customerEmail={intake.customerEmail}
        elapsedSeconds={elapsedSeconds}
      />
      <div className="rv-foot">
        <button type="button" className="rv-restart" onClick={onStartOver}>
          ← Pitch another business
        </button>
      </div>
      <style>{rvCss}</style>
    </div>
  );
}

// ---------------- styles ----------------

const css = `
.pv-canvas { min-height: 100vh; background: ${palette.charcoal}; color: ${palette.cream}; padding: 4rem 2rem 8rem; }
.pv-head { max-width: 760px; margin: 0 auto 3rem; }
.pv-eyebrow { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.32em; text-transform: uppercase; color: ${palette.dawn}; margin: 0 0 0.5rem; }
.pv-meta { font-family: ${fonts.display}; font-style: italic; font-size: 1.1rem; opacity: 0.78; margin: 0; }
.pv-stages { max-width: 760px; margin: 0 auto; }

.pv-chips { display: grid; grid-template-columns: repeat(auto-fit, minmax(180px, 1fr)); gap: 0.75rem; }
.pv-chip { background: rgba(244,239,223,0.05); border: 1px solid rgba(244,239,223,0.14); border-radius: 4px; padding: 1rem 1.1rem; display: flex; flex-direction: column; gap: 0.35rem; }
.pv-chip span { font-family: ${fonts.body}; font-size: 0.65rem; letter-spacing: 0.28em; text-transform: uppercase; opacity: 0.65; }
.pv-chip strong { font-family: ${fonts.display}; font-style: italic; font-weight: 400; font-size: 1.1rem; color: ${palette.cream}; }

.pv-dna { display: flex; flex-direction: column; gap: 1.5rem; }
.pv-dna-block { background: rgba(244,239,223,0.04); border: 1px solid rgba(244,239,223,0.12); border-radius: 4px; padding: 1.25rem 1.5rem; }
.pv-dna-label { font-family: ${fonts.body}; font-size: 0.7rem; letter-spacing: 0.28em; text-transform: uppercase; color: ${palette.dawn}; margin: 0 0 1rem; }
.pv-swatches { display: grid; grid-template-columns: repeat(5, 1fr); gap: 0.4rem; height: 64px; transform-origin: bottom center; }
.pv-sw { border-radius: 3px; transform-origin: bottom center; }
.pv-typo-display { font-family: ${fonts.display}; font-style: italic; font-weight: 400; font-size: 1.85rem; margin: 0 0 0.25rem; color: ${palette.cream}; }
.pv-typo-body { font-family: ${fonts.body}; font-size: 0.95rem; opacity: 0.78; margin: 0; }
.pv-tags { display: flex; flex-wrap: wrap; gap: 0.5rem; }
.pv-tag { font-family: ${fonts.body}; font-size: 0.72rem; letter-spacing: 0.18em; text-transform: uppercase; color: ${palette.cream}; background: rgba(201,169,110,0.15); border: 1px solid rgba(201,169,110,0.35); border-radius: 999px; padding: 0.45rem 0.95rem; }

.pv-concepts { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; }
.pv-concept { display: flex; flex-direction: column; gap: 0.6rem; }
.pv-concept-tile { aspect-ratio: 4/3; border-radius: 4px; position: relative; overflow: hidden; box-shadow: 0 14px 40px rgba(0,0,0,0.4); display: flex; align-items: flex-end; justify-content: flex-start; padding: 0.85rem; }
.pv-concept-mono { font-family: ${fonts.mono}; font-size: 0.7rem; letter-spacing: 0.12em; color: rgba(244,239,223,0.85); background: rgba(0,0,0,0.35); padding: 0.2rem 0.5rem; border-radius: 3px; }
.pv-concept h4 { font-family: ${fonts.display}; font-style: italic; font-weight: 400; font-size: 1.1rem; margin: 0; color: ${palette.cream}; }
.pv-concept p { font-family: ${fonts.body}; font-size: 0.85rem; line-height: 1.5; opacity: 0.78; margin: 0; }

.pv-arch { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 0.6rem; }
.pv-arch li { display: flex; align-items: center; gap: 0.85rem; font-family: ${fonts.body}; font-size: 0.95rem; padding: 0.7rem 0.85rem; background: rgba(244,239,223,0.03); border-left: 2px solid ${palette.fairway}; border-radius: 0 3px 3px 0; }
.pv-arch-check { width: 22px; height: 22px; border-radius: 999px; background: ${palette.fairway}; color: ${palette.cream}; display: inline-flex; align-items: center; justify-content: center; font-size: 0.78rem; flex-shrink: 0; }

.pv-proposal-stub { font-family: ${fonts.display}; font-style: italic; font-size: 1.05rem; opacity: 0.78; margin: 0; }

.pv-skip { position: fixed; left: 1.25rem; bottom: 1.25rem; background: rgba(244,239,223,0.06); color: ${palette.cream}; border: 1px solid rgba(244,239,223,0.18); padding: 0.65rem 1.1rem; border-radius: 999px; font-family: ${fonts.body}; font-size: 0.7rem; letter-spacing: 0.22em; text-transform: uppercase; cursor: pointer; transition: background 180ms; z-index: 30; }
.pv-skip:hover { background: rgba(244,239,223,0.12); }
.pv-skip:focus-visible { outline: 2px solid ${palette.dawn}; outline-offset: 2px; }

@media (prefers-reduced-motion: reduce) {
  .pv-skip { transition: none; }
}
@media (max-width: 720px) {
  .pv-skip { left: 0.75rem; bottom: 0.75rem; padding: 0.55rem 0.95rem; font-size: 0.65rem; }
}
`;

const rvCss = `
.rv-canvas { min-height: 100vh; background: ${palette.charcoal}; color: ${palette.cream}; padding: 5rem 2rem 6rem; display: flex; flex-direction: column; gap: 2.5rem; }
.rv-foot { display: flex; justify-content: center; }
.rv-restart { background: transparent; color: ${palette.cream}; border: 1px solid rgba(244,239,223,0.32); padding: 0.85rem 1.5rem; border-radius: 999px; font-family: ${fonts.body}; font-size: 0.75rem; letter-spacing: 0.18em; text-transform: uppercase; cursor: pointer; transition: background 180ms, color 180ms; }
.rv-restart:hover { background: ${palette.dawn}; color: ${palette.charcoal}; border-color: ${palette.dawn}; }
.rv-restart:focus-visible { outline: 2px solid ${palette.dawn}; outline-offset: 2px; }
@media (prefers-reduced-motion: reduce) {
  .rv-restart { transition: none; }
}
`;
