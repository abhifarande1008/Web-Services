"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/content/site";
import { Workbench, MiniLabel } from "./ui/Workbench";
import { GrowX, Reveal, SplitText, Stagger, StaggerItem } from "./motion/Reveal";
import { Tilt } from "./motion/Tilt";
import { Mail, MapPin } from "lucide-react";

export function About() {
  const { brand, about } = siteConfig;

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] gap-10 lg:gap-16 items-center">
        <div>
          <Reveal y={12}>
            <p className="flex items-center gap-3 text-sm font-medium text-[var(--terracotta)] mb-3">
              <GrowX className="block h-px w-8 bg-[var(--terracotta)]" aria-hidden="true" delay={0.1} />
              {about.title}
            </p>
          </Reveal>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal text-[var(--ink)] tracking-tight leading-[1.1]">
            <SplitText text={about.headline} delay={0.05} />
          </h2>

          <div className="mt-6 flex flex-col gap-4 max-w-xl">
            {about.paragraphs.map((paragraph, i) => (
              <Reveal key={paragraph.slice(0, 24)} delay={0.25 + i * 0.12} y={20} blur>
                <p className={`leading-relaxed ${i === 0 ? "text-lg text-[var(--ink)]" : "text-base text-[var(--muted)]"}`}>
                  {paragraph}
                </p>
              </Reveal>
            ))}
          </div>

          <Stagger
            as="dl"
            stagger={0.1}
            delay={0.4}
            className="mt-8 grid grid-cols-3 gap-px rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--line)] max-w-xl"
          >
            {about.principles.map((item) => (
              <StaggerItem key={item.label} y={16} className="bg-[var(--surface)] px-4 py-4 flex flex-col-reverse">
                <dt className="mt-1 text-xs leading-snug text-[var(--muted)]">{item.label}</dt>
                <dd className="font-serif text-xl sm:text-2xl text-[var(--ink)] leading-none">{item.value}</dd>
              </StaggerItem>
            ))}
          </Stagger>
        </div>

        <Workbench className="min-h-[360px] sm:min-h-[420px] flex items-center justify-center">
          <Tilt max={8} className="relative w-[84%] sm:w-full max-w-[400px] my-10 sm:my-12">
            {/* Back of the card */}
            <motion.div
              className="absolute inset-0 rounded-2xl bg-[var(--surface)] border border-[var(--line)] shadow-[0_16px_32px_-18px_rgba(31,31,28,0.35)] flex items-center justify-center"
              aria-hidden="true"
              initial={{ rotate: -3, x: 0, y: 0 }}
              whileInView={{ rotate: 6, x: 12, y: -20 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ type: "spring", stiffness: 90, damping: 14, delay: 0.6 }}
            >
              <span className="font-serif text-[5.5rem] leading-none text-[var(--terracotta)]/90">{brand.monogram}</span>
              <span className="absolute bottom-4 right-5 font-mono text-[10px] uppercase tracking-[0.18em] text-[var(--muted)]">
                {brand.descriptor}
              </span>
            </motion.div>

            {/* Front of the card */}
            <motion.div
              className="relative min-h-[13rem] sm:aspect-[1.75/1] rounded-2xl bg-[var(--ink)] text-[var(--surface)] shadow-[0_24px_48px_-20px_rgba(31,31,28,0.6)] p-5 sm:p-6 flex flex-col"
              initial={{ rotate: 0, y: 40, opacity: 0 }}
              whileInView={{ rotate: -3, y: 0, opacity: 1 }}
              viewport={{ once: true, margin: "0px 0px -20% 0px" }}
              transition={{ type: "spring", stiffness: 80, damping: 15, delay: 0.35 }}
            >
              <div className="flex items-start justify-between gap-3">
                <span className="w-9 h-9 rounded-lg bg-[var(--terracotta)] text-[var(--surface)] flex items-center justify-center font-serif text-lg" aria-hidden="true">
                  {brand.monogram}
                </span>
                <MiniLabel className="!text-[var(--surface)]/55 text-right">{brand.name}</MiniLabel>
              </div>

              <div className="mt-auto">
                <p className="font-serif text-2xl sm:text-[1.75rem] leading-tight">{brand.founder}</p>
                <p className="text-xs text-[var(--surface)]/60 mt-0.5">{brand.founderRole}</p>
                <ul className="mt-4 pt-3 border-t border-white/10 flex flex-col gap-1.5 text-[11.5px] sm:text-xs">
                  {brand.email && (
                    <li>
                      <a
                        href={`mailto:${brand.email}`}
                        className="inline-flex items-center gap-2 text-[var(--surface)]/90 hover:text-[#E8A27F] transition-colors break-all"
                      >
                        <Mail className="w-3.5 h-3.5 shrink-0 text-[#E8A27F]" strokeWidth={1.75} aria-hidden="true" />
                        {brand.email}
                      </a>
                    </li>
                  )}
                  <li className="flex items-center gap-2 text-[var(--surface)]/60">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-[#E8A27F]" strokeWidth={1.75} aria-hidden="true" />
                    {brand.location}
                  </li>
                </ul>
              </div>
            </motion.div>
          </Tilt>
        </Workbench>
      </div>
    </section>
  );
}
