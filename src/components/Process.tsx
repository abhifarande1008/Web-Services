"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { ClayCard } from "./ClayCard";
import { MotifDots } from "./MockUI";
import { Check, ArrowRight } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function Process() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="process" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] text-xs font-mono uppercase tracking-wider text-[var(--terracotta)] mb-4">
          Structured Milestones
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--ink)] tracking-tight">
          How we build together
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--muted)]">
          Predictable execution from day one. You always know what is being built, when it will be ready, and what you receive at every step.
        </p>
      </div>

      {/* Process Timeline Grid (Horizontal on lg, Vertical on sm/md) */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 relative">
        {siteConfig.process.map((item, idx) => (
          <motion.div
            key={item.step}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
            className="flex flex-col"
          >
            <ClayCard className="p-6 h-full flex flex-col justify-between" enableTilt={true}>
              <div>
                {/* Step Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="font-serif font-bold text-2xl text-[var(--terracotta)]">
                    {item.step}
                  </span>
                  <MotifDots />
                </div>

                <div className="flex items-baseline justify-between gap-2 mb-2">
                  <h3 className="font-serif text-xl font-semibold text-[var(--ink)]">
                    {item.title}
                  </h3>
                </div>
                <div className="inline-block px-2.5 py-1 rounded-md bg-[var(--bg)] border border-[var(--line)] text-[11px] font-mono text-[var(--muted)] mb-3">
                  {item.duration}
                </div>

                <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
                  {item.description}
                </p>
              </div>

              {/* Deliverables */}
              <div className="pt-4 border-t border-[var(--line)]">
                <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--ink)] font-semibold block mb-2.5">
                  What you get:
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
