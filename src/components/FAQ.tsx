"use client";

import React, { useState } from "react";
import { siteConfig } from "@/content/site";
import { Plus, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { GrowX, Reveal, SplitText, Stagger, StaggerItem } from "./motion/Reveal";

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(siteConfig.faq[0].id);
  const shouldReduceMotion = useReducedMotion();
  const { brand } = siteConfig;

  return (
    <section id="faq" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] gap-10 lg:gap-16 items-start">
        <div className="lg:sticky lg:top-28">
          <p className="flex items-center gap-3 text-sm font-medium text-[var(--terracotta)] mb-3">
            <GrowX className="block h-px w-8 bg-[var(--terracotta)]" aria-hidden="true" delay={0.1} />
            FAQ
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-[2.75rem] font-normal text-[var(--ink)] tracking-tight leading-[1.1]">
            <SplitText text="Questions people usually ask" delay={0.05} />
          </h2>
          <p className="mt-4 text-base text-[var(--muted)] leading-relaxed max-w-md">
            The practical things: money, timing, ownership and what happens once it&apos;s live.
          </p>

          <Reveal delay={0.3} className="hidden md:block mt-8 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-5 max-w-md">
            <p className="font-sans text-sm font-semibold text-[var(--ink)]">Still unsure about something?</p>
            <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">
              Ask us directly. {brand.responseTime}.
            </p>
            <a
              href={brand.email ? `mailto:${brand.email}` : "#contact"}
              className="mt-3 inline-flex items-center gap-1.5 text-sm font-medium text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors break-all"
            >
              {brand.email || "Send us a message"}
              <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={1.5} aria-hidden="true" />
            </a>
          </Reveal>
        </div>

        <Stagger as="ul" stagger={0.07} delay={0.2} className="border-t border-[var(--ink)]/80">
          {siteConfig.faq.map((item, idx) => {
            const isOpen = openId === item.id;
            return (
              <StaggerItem as="li" key={item.id} y={18} className="border-b border-[var(--line)]">
                <h3 className="font-sans">
                  <button
                    type="button"
                    id={`faq-q-${item.id}`}
                    onClick={() => setOpenId(isOpen ? null : item.id)}
                    aria-expanded={isOpen}
                    aria-controls={`faq-answer-${item.id}`}
                    className="group w-full py-5 sm:py-6 text-left grid grid-cols-[1fr_auto] md:grid-cols-[2.75rem_1fr_auto] items-start gap-3 md:gap-4 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] rounded-md"
                  >
                    <span className={`hidden md:inline font-mono text-xs pt-1.5 transition-colors ${isOpen ? "text-[var(--terracotta)]" : "text-[var(--muted)]"}`}>
                      Q{String(idx + 1).padStart(2, "0")}
                    </span>
                    <span className="font-serif text-lg sm:text-xl text-[var(--ink)] leading-snug group-hover:text-[var(--terracotta)] transition-colors">
                      {item.question}
                    </span>
                    <span
                      className={`mt-0.5 w-8 h-8 rounded-full border flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? "rotate-45 bg-[var(--ink)] border-[var(--ink)] text-[var(--surface)]"
                          : "border-[var(--line)] text-[var(--ink)] bg-[var(--surface)]"
                      }`}
                      aria-hidden="true"
                    >
                      <Plus className="w-4 h-4" strokeWidth={1.75} />
                    </span>
                  </button>
                </h3>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      role="region"
                      aria-labelledby={`faq-q-${item.id}`}
                      initial={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      animate={shouldReduceMotion ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                      exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                      className="overflow-hidden"
                    >
                      <p className="pb-6 md:pl-[3.75rem] pr-4 md:pr-10 text-sm sm:text-base text-[var(--muted)] leading-relaxed max-w-2xl">
                        {item.answer}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </StaggerItem>
            );
          })}
        </Stagger>

        <p className="md:hidden -mt-4 text-sm text-[var(--muted)] leading-relaxed">
          Still unsure about something?{" "}
          <a
            href={brand.email ? `mailto:${brand.email}` : "#contact"}
            className="font-medium text-[var(--ink)] underline underline-offset-4 decoration-[var(--terracotta)] break-all"
          >
            {brand.email ? "Email us" : "Send us a message"}
          </a>
          . {brand.responseTime}.
        </p>
      </div>
    </section>
  );
}
