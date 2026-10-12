"use client";

import React, { useState } from "react";
import { siteConfig } from "@/content/site";
import { ClayCard } from "./ClayCard";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function FAQ() {
  const [openId, setOpenId] = useState<string | null>(siteConfig.faq[0].id);
  const shouldReduceMotion = useReducedMotion();

  const toggle = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <section id="faq" className="py-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] text-xs font-mono uppercase tracking-wider text-[var(--terracotta)] mb-4">
          Answers & Clarity
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--ink)] tracking-tight">
          Frequently asked questions
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--muted)]">
          Everything you need to know about working together, intellectual property, timelines, and deliverables.
        </p>
      </div>

      <div className="flex flex-col gap-4">
        {siteConfig.faq.map((item, idx) => {
          const isOpen = openId === item.id;

          return (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
            >
              <ClayCard className="overflow-hidden" enableTilt={false}>
                <button
                  type="button"
                  onClick={() => toggle(item.id)}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${item.id}`}
                  className="w-full p-6 text-left flex items-center justify-between gap-4 focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)] rounded-2xl cursor-pointer"
                >
                  <span className="font-serif text-lg sm:text-xl font-semibold text-[var(--ink)]">
                    {item.question}
                  </span>
                  <div
                    className={`w-8 h-8 rounded-lg bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[var(--terracotta)]" : "text-[var(--muted)]"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" strokeWidth={1.5} />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={`faq-answer-${item.id}`}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeOut" }}
                    >
                      <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-[var(--muted)] leading-relaxed border-t border-[var(--line)]/50">
                        {item.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </ClayCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
