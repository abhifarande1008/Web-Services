import React from "react";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { Workbench, WindowBar } from "./ui/Workbench";
import { Stagger, StaggerItem } from "./motion/Reveal";
import {
  Stethoscope,
  Store,
  Building2,
  GraduationCap,
  Truck,
  Utensils,
  Factory,
  Briefcase,
  LucideIcon,
} from "lucide-react";

const industryIconMap: Record<string, LucideIcon> = {
  Stethoscope,
  Store,
  Building2,
  GraduationCap,
  Truck,
  Utensils,
  Factory,
  Briefcase,
};

// Row number, industry, who it's for, typical first build.
const ROW_GRID = "grid grid-cols-1 md:grid-cols-[2.75rem_minmax(0,1.1fr)_minmax(0,1fr)_minmax(0,1.5fr)]";
const CELL = "md:px-4 md:py-3.5 md:border-r border-[var(--line)] last:border-r-0";
// On phones the text cells line up under the industry name, past the 2rem icon.
const INDENT = "pl-[3.75rem] pr-4";

export function Industries() {
  const industries = siteConfig.industries;

  return (
    <section id="industries" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Industries"
        title="Who we work with"
        intro="Most of the businesses we help run on spreadsheets today, so here they are in one. Each row shows what we'd typically build first."
      />

      <Workbench>
        <div className="clay-card overflow-hidden">
          <WindowBar address="industries.xlsx" />

          {/* Formula bar */}
          <div className="hidden md:flex items-center border-b border-[var(--line)] text-xs" aria-hidden="true">
            <span className="w-[2.75rem] shrink-0 py-2 text-center font-mono text-[var(--muted)] border-r border-[var(--line)] bg-[var(--bg)]/50">
              C1
            </span>
            <span className="px-3 py-2 font-mono italic text-[var(--terracotta)] border-r border-[var(--line)]">fx</span>
            <span className="px-3 py-2 text-[var(--ink)]">Typical first build</span>
          </div>

          <div role="table" aria-label="Industries and what we typically build first" className="text-sm">
            {/* Column letters */}
            <div className={`${ROW_GRID} hidden md:grid bg-[var(--bg)]/50 border-b border-[var(--line)]`} aria-hidden="true">
              {["", "A", "B", "C"].map((letter) => (
                <span key={letter || "corner"} className="py-1 text-center font-mono text-[0.625rem] text-[var(--muted)] border-r border-[var(--line)] last:border-r-0">
                  {letter}
                </span>
              ))}
            </div>

            {/* Header row */}
            <div role="row" className={`${ROW_GRID} hidden md:grid border-b border-[var(--line)] bg-[var(--surface)]`}>
              <span role="columnheader" className="py-3 text-center font-mono text-[0.6875rem] text-[var(--muted)] bg-[var(--bg)]/50 border-r border-[var(--line)]">
                <span className="sr-only">Row</span>1
              </span>
              {["Industry", "Who it's for", "Typical first build"].map((h) => (
                <span key={h} role="columnheader" className={`${CELL} font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]`}>
                  {h}
                </span>
              ))}
            </div>

            <Stagger role="rowgroup" stagger={0.07} delay={0.3}>
            {industries.map((industry, i) => {
              const Icon = industryIconMap[industry.iconName] || Briefcase;
              return (
                <StaggerItem
                  key={industry.id}
                  role="row"
                  y={0}
                  x={-20}
                  className={`${ROW_GRID} group border-b border-[var(--line)] last:border-b-0 bg-[var(--surface)] transition-colors hover:bg-[#F6EFE4]`}
                >
                  <span
                    role="cell"
                    className="hidden md:block md:py-3.5 text-center font-mono text-[0.6875rem] text-[var(--muted)] bg-[var(--bg)]/50 border-r border-[var(--line)] transition-colors group-hover:text-[var(--terracotta)] group-hover:bg-[var(--terracotta)]/10"
                  >
                    {i + 2}
                  </span>
                  <div role="cell" className={`${CELL} px-4 pt-4 pb-1 flex items-center gap-3`}>
                    <span className="w-8 h-8 shrink-0 rounded-lg bg-[var(--terracotta)]/10 text-[var(--terracotta)] flex items-center justify-center transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:bg-[var(--terracotta)] group-hover:text-[var(--surface)] group-hover:-rotate-6">
                      <Icon className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                    </span>
                    <span className="font-serif text-base text-[var(--ink)] leading-snug">{industry.title}</span>
                  </div>
                  <div role="cell" className={`${CELL} ${INDENT} pb-2 text-[var(--muted)] leading-relaxed flex items-center`}>
                    {industry.description}
                  </div>
                  <div role="cell" className={`${CELL} ${INDENT} pb-4`}>
                    <p className="md:hidden mb-0.5 font-sans text-[0.625rem] font-semibold uppercase tracking-[0.14em] text-[var(--terracotta)]">
                      Typical first build
                    </p>
                    <p className="font-medium text-[var(--ink)] leading-snug">{industry.exampleModule.name}</p>
                    <p className="mt-0.5 text-xs text-[var(--muted)] leading-relaxed">{industry.exampleModule.details}</p>
                  </div>
                </StaggerItem>
              );
            })}
            </Stagger>
          </div>

          {/* Sheet tabs */}
          <div className="hidden md:flex items-center gap-1 px-3 py-2 border-t border-[var(--line)] bg-[var(--bg)]/45 text-xs" aria-hidden="true">
            <span className="px-3 py-1 rounded-md bg-[var(--surface)] border border-[var(--line)] text-[var(--ink)] font-medium">Industries</span>
            <span className="px-3 py-1 text-[var(--muted)]">Your business</span>
            <span className="ml-auto font-mono text-[0.625rem] text-[var(--muted)]">{industries.length} rows</span>
          </div>
        </div>

        <p className="mt-5 sm:mt-6 text-center text-sm text-[var(--muted)]">
          Don&apos;t see your industry? The same building blocks fit most businesses.{" "}
          <a href="#contact" className="font-medium text-[var(--ink)] underline underline-offset-4 decoration-[var(--terracotta)] hover:text-[var(--terracotta)]">
            Tell us how you work
          </a>
        </p>
      </Workbench>
    </section>
  );
}
