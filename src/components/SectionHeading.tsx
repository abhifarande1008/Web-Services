"use client";

import React from "react";
import { Reveal, SplitText, GrowX } from "./motion/Reveal";

interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  intro?: string;
  align?: "split" | "center";
}

export function SectionHeading({ eyebrow, title, intro, align = "split" }: SectionHeadingProps) {
  if (align === "center") {
    return (
      <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
        <Reveal y={12}>
          <p className="text-sm font-medium text-[var(--terracotta)] mb-3">{eyebrow}</p>
        </Reveal>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--ink)] tracking-tight leading-tight">
          <SplitText text={title} />
        </h2>
        {intro && (
          <Reveal delay={0.25} y={16}>
            <p className="mt-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed">{intro}</p>
          </Reveal>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 lg:items-end mb-12 sm:mb-16">
      <div className="lg:col-span-7">
        <Reveal y={12}>
          <p className="flex items-center gap-3 text-sm font-medium text-[var(--terracotta)] mb-3">
            <GrowX className="block h-px w-8 bg-[var(--terracotta)]" aria-hidden="true" delay={0.1} />
            {eyebrow}
          </p>
        </Reveal>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--ink)] tracking-tight leading-tight">
          <SplitText text={title} delay={0.05} />
        </h2>
      </div>
      {intro && (
        <Reveal delay={0.3} y={20} blur className="lg:col-span-5">
          <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed">{intro}</p>
        </Reveal>
      )}
    </div>
  );
}
