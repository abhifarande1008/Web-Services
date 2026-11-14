import React from "react";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { Workbench, WindowBar, MiniLabel } from "./ui/Workbench";
import { Check } from "lucide-react";
import { GrowX, Stagger, StaggerItem } from "./motion/Reveal";

const WEEKS = 11;

// Start and end week of each step for a typical custom software project, matching the
// durations in siteConfig.process (Days 1–3, Week 1, Weeks 2–6, Launch week, 30 days).
const SPANS: [number, number][] = [
  [0, 0.5],
  [0.5, 1.5],
  [1.5, 6],
  [6, 7],
  [7, 11],
];

const pct = (w: number) => `${(w / WEEKS) * 100}%`;

const gridLines = {
  backgroundImage: `repeating-linear-gradient(to right, rgba(31,31,28,0.07) 0 1px, transparent 1px calc(100% / ${WEEKS}))`,
};

export function Process() {
  const steps = siteConfig.process;

  return (
    <section id="process" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="How we work"
        title="Five steps, no surprises"
        intro="You know what's being built, when it will be ready and what you get at each step. Here's how a typical custom software project runs."
      />

      <Workbench>
        {/* Phones: one vertical timeline instead of the chart and the deliverables grid. */}
        <Stagger as="ol" stagger={0.1} className="md:hidden relative">
          {steps.map((step, i) => {
            const isSupport = i === steps.length - 1;
            return (
              <StaggerItem as="li" key={step.step} y={16} className="relative grid grid-cols-[2.25rem_1fr] gap-x-4 pb-8 last:pb-0">
                {!isSupport && (
                  <span className="absolute left-[1.125rem] top-10 bottom-1 w-px bg-[var(--line)]" aria-hidden="true" />
                )}
                <span
                  className={`w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs ${
                    isSupport ? "bg-[var(--sage)]/30 text-[#5E7356]" : "bg-[var(--ink)] text-[var(--surface)]"
                  }`}
                  aria-hidden="true"
                >
                  {step.step}
                </span>
                <div className="min-w-0 pt-1">
                  <div className="flex items-baseline justify-between gap-3">
                    <h3 className="font-serif text-xl text-[var(--ink)]">{step.title}</h3>
                    <span className="shrink-0 text-xs font-medium text-[var(--terracotta)]">{step.duration}</span>
                  </div>
                  <p className="mt-1.5 text-sm text-[var(--muted)] leading-relaxed">{step.description}</p>
                  <ul className="mt-3 flex flex-col gap-1.5">
                    {step.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-sm text-[var(--ink)] leading-snug">
                        <Check className="w-4 h-4 mt-px text-[#5E7356] shrink-0" strokeWidth={2.25} aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </div>
              </StaggerItem>
            );
          })}
        </Stagger>
        <p className="md:hidden mt-8 text-sm text-[var(--muted)]">
          Landing pages and websites move faster: about 1 to 3 weeks from first call to launch.
        </p>

        <div className="hidden md:block clay-card overflow-hidden">
          <WindowBar address="project-plan" />

          {/* Gantt chart */}
          <div className="px-4 sm:px-6 pt-5 pb-6">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <MiniLabel tone="terracotta">Typical custom software project</MiniLabel>
              <div className="flex items-center gap-4 text-[0.6875rem] text-[var(--muted)]">
                <span className="inline-flex items-center gap-1.5">
                  <span className="w-3 h-2 rounded-sm bg-[var(--terracotta)]" aria-hidden="true" /> Work
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <span
                    className="w-3 h-2 rounded-sm"
                    style={{ backgroundImage: "repeating-linear-gradient(135deg, #A9B8A0 0 2px, rgba(169,184,160,0.35) 2px 4px)" }}
                    aria-hidden="true"
                  />{" "}
                  Included support
                </span>
              </div>
            </div>

            {/* Week scale */}
            <div className="hidden md:grid grid-cols-[13rem_1fr] gap-4 mb-1" aria-hidden="true">
              <span />
              <div className="grid font-mono text-[0.625rem] text-[var(--muted)]" style={{ gridTemplateColumns: `repeat(${WEEKS}, 1fr)` }}>
                {Array.from({ length: WEEKS }, (_, i) => (
                  <span key={i} className="pl-1">W{i + 1}</span>
                ))}
              </div>
            </div>

            <ol className="flex flex-col">
              {steps.map((step, i) => {
                const [start, end] = SPANS[i] ?? [0, 1];
                const isSupport = i === steps.length - 1;
                return (
                  <li
                    key={step.step}
                    className="grid grid-cols-1 md:grid-cols-[13rem_1fr] gap-x-4 gap-y-2 py-3 border-t border-[var(--line)] first:border-t-0 md:first:border-t"
                  >
                    <div className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-[var(--terracotta)] tabular-nums">{step.step}</span>
                      <span className="font-serif text-lg text-[var(--ink)]">{step.title}</span>
                      <span className="ml-auto md:ml-0 text-xs text-[var(--muted)] whitespace-nowrap">{step.duration}</span>
                    </div>
                    <div className="relative h-7 rounded-md bg-[var(--bg)]/50" style={gridLines} aria-hidden="true">
                      <GrowX
                        delay={0.35 + start * 0.12}
                        duration={0.9}
                        className={`absolute top-1.5 bottom-1.5 rounded ${isSupport ? "" : "bg-[var(--terracotta)] shadow-[inset_0_1px_0_rgba(255,255,255,0.3)]"}`}
                        style={{
                          left: pct(start),
                          width: `max(6px, calc(${pct(end)} - ${pct(start)}))`,
                          ...(isSupport
                            ? { backgroundImage: "repeating-linear-gradient(135deg, #A9B8A0 0 4px, rgba(169,184,160,0.35) 4px 8px)" }
                            : {}),
                        }}
                      />
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className="mt-3 text-xs text-[var(--muted)]">
              Landing pages and websites move faster: about 1 to 3 weeks from first call to launch.
            </p>
          </div>

          {/* What you get at each step */}
          <div className="border-t border-[var(--line)] bg-[var(--bg)]/35 px-4 sm:px-6 py-5">
            <MiniLabel className="mb-4">What you get at each step</MiniLabel>
            <Stagger
              as="ol"
              stagger={0.08}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-px rounded-xl overflow-hidden border border-[var(--line)] bg-[var(--line)]"
            >
              {steps.map((step) => (
                <StaggerItem
                  as="li"
                  key={step.step}
                  y={16}
                  className="bg-[var(--surface)] p-4 flex flex-col sm:last:col-span-2 lg:last:col-span-1 transition-colors hover:bg-[#FDFBF8]"
                >
                  <div className="flex items-baseline gap-2">
                    <span className="font-mono text-[0.6875rem] text-[var(--terracotta)]">{step.step}</span>
                    <h3 className="font-serif text-base text-[var(--ink)]">{step.title}</h3>
                  </div>
                  <p className="mt-2 text-xs text-[var(--muted)] leading-relaxed">{step.description}</p>
                  <ul className="mt-3 pt-3 border-t border-[var(--line)] flex flex-col gap-1.5">
                    {step.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2 text-xs text-[var(--ink)] leading-snug">
                        <Check className="w-3.5 h-3.5 mt-px text-[#5E7356] shrink-0" strokeWidth={2.25} aria-hidden="true" />
                        {d}
                      </li>
                    ))}
                  </ul>
                </StaggerItem>
              ))}
            </Stagger>
          </div>
        </div>
      </Workbench>
    </section>
  );
}
