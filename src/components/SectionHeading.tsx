import React from "react";

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
        <p className="text-sm font-medium text-[var(--terracotta)] mb-3">{eyebrow}</p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--ink)] tracking-tight leading-tight">
          {title}
        </h2>
        {intro && (
          <p className="mt-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed">{intro}</p>
        )}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-10 lg:items-end mb-12 sm:mb-16">
      <div className="lg:col-span-7">
        <p className="flex items-center gap-3 text-sm font-medium text-[var(--terracotta)] mb-3">
          <span className="h-px w-8 bg-[var(--terracotta)]" aria-hidden="true" />
          {eyebrow}
        </p>
        <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[var(--ink)] tracking-tight leading-tight">
          {title}
        </h2>
      </div>
      {intro && (
        <p className="lg:col-span-5 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          {intro}
        </p>
      )}
    </div>
  );
}
