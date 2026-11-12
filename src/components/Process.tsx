"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { ClayCard } from "./ClayCard";
import { SectionHeading } from "./SectionHeading";
import { Check } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function Process() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <SectionHeading
        eyebrow="How we work"
        title="Five steps, no surprises"
        intro="You know what's being built, when it will be ready and what you get at each step."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5 relative">
        {siteConfig.process.map((item, idx) => (
          <motion.div
            key={item.step}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
            className="flex flex-col"
          >
            <ClayCard className="p-6 h-full flex flex-col justify-between">
              <div>
                <span className="block font-serif font-bold text-2xl text-[var(--terracotta)] mb-4">
                  {item.step}
                </span>

                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">
                    {item.title}
                  </h3>
                </div>
                <div className="inline-block px-2.5 py-1 rounded-md bg-[var(--bg)] border border-[var(--line)] text-xs text-[var(--muted)] mb-3">
                  {item.duration}
                </div>

                <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Deliverables */}
              <div className="pt-4 border-t border-[var(--line)]">
                <span className="text-xs font-semibold text-[var(--ink)] block mb-2.5">
                  What you get
                </span>
                <ul className="flex flex-col gap-2">
                  {item.deliverables.map((del, dIdx) => (
                    <li key={dIdx} className="flex items-start gap-2 text-xs text-[var(--ink)] leading-snug">
                      <Check className="w-3.5 h-3.5 text-[var(--sage)] shrink-0 mt-0.5" strokeWidth={2} />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ClayCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
