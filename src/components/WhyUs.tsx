"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { Workbench } from "./ui/Workbench";
import { GrowX, Stagger, StaggerItem } from "./motion/Reveal";

const VIEWPORT = { once: true, margin: "0px 0px -15% 0px" } as const;

export function WhyUs() {
  const { brand, whyUs } = siteConfig;

  return (
    <section id="why-us" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow={`Why ${brand.shortName}`}
        title="Why businesses work with us"
        intro="The care of a small team, with the process and accountability you'd expect from a proper company. These are the terms every project runs on."
      />

      <Workbench>
        <article className="relative max-w-5xl mx-auto bg-[#FCFAF6] rounded-2xl border border-[var(--line)] shadow-[0_1px_0_rgba(255,255,255,0.9)_inset,0_24px_48px_-20px_rgba(31,31,28,0.25)] px-6 py-8 sm:px-12 sm:py-12">
          {/* Paper stack edge */}
          <span className="absolute inset-x-4 -bottom-2 h-2 rounded-b-2xl bg-[#F3EDE3] border border-t-0 border-[var(--line)] -z-10" aria-hidden="true" />

          <header className="relative flex flex-wrap items-baseline justify-between gap-3 pb-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-[var(--ink)]">
              {brand.shortName} · Working agreement
            </p>
            <p className="font-mono text-[11px] text-[var(--muted)]">Applies to every project</p>
            <GrowX className="absolute left-0 right-0 bottom-0 h-[3px] border-y border-[var(--ink)]/70" duration={1.4} delay={0.4} aria-hidden="true" />
          </header>

          <h3 className="mt-8 font-serif text-2xl sm:text-3xl text-[var(--ink)] tracking-tight max-w-xl">
            What you can hold us to.
          </h3>

          <Stagger as="ol" stagger={0.12} delay={0.2} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8">
            {whyUs.map((item) => (
              <StaggerItem as="li" key={item.id} y={20} className="group grid grid-cols-[2.5rem_1fr] gap-x-2">
                <span className="font-mono text-sm text-[var(--terracotta)] pt-0.5 transition-transform duration-500 group-hover:-translate-y-0.5">
                  §{item.number}
                </span>
                <div>
                  <h4 className="font-serif text-lg text-[var(--ink)] leading-snug">{item.title}</h4>
                  <p className="mt-1.5 text-sm text-[var(--muted)] leading-relaxed">{item.description}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <footer className="mt-12 pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <motion.p
                className="font-serif italic text-3xl text-[var(--ink)] leading-none -rotate-2 origin-left pb-1"
                aria-hidden="true"
                initial={{ clipPath: "inset(-20% 100% -20% 0%)" }}
                whileInView={{ clipPath: "inset(-20% 0% -20% 0%)" }}
                viewport={VIEWPORT}
                transition={{ duration: 1.6, ease: [0.65, 0, 0.35, 1], delay: 0.2 }}
              >
                {brand.founder}
              </motion.p>
              <GrowX className="mt-2 block w-56 border-t border-[var(--ink)]/40" delay={0.1} duration={0.8} aria-hidden="true" />
              <p className="mt-2 text-xs text-[var(--muted)]">
                {brand.founder}, {brand.founderRole}, {brand.name}
              </p>
            </div>
            <motion.span
              className="self-start sm:self-auto w-20 h-20 rounded-full border-2 border-[var(--terracotta)]/60 text-[var(--terracotta)] flex flex-col items-center justify-center font-mono text-[9px] uppercase tracking-[0.14em] leading-tight text-center"
              aria-hidden="true"
              initial={{ opacity: 0, scale: 1.8, rotate: -40 }}
              whileInView={{ opacity: 1, scale: 1, rotate: -12 }}
              viewport={VIEWPORT}
              transition={{ type: "spring", stiffness: 260, damping: 14, delay: 1.5 }}
            >
              <span className="font-serif text-xl normal-case tracking-normal leading-none">{brand.monogram}</span>
              In writing
            </motion.span>
          </footer>
        </article>
      </Workbench>
    </section>
  );
}
