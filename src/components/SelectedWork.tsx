"use client";

import React from "react";
import { siteConfig, CaseStudy } from "@/content/site";
import { ClayCard } from "./ClayCard";
import { MotifDots } from "./MockUI";
import { TrendingUp, Layers, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

function ScreenshotFrame({ type }: { type: CaseStudy["previewType"] }) {
  return (
    <div
      className="w-full h-48 rounded-xl bg-[var(--bg)] border border-[var(--line)] p-3 flex flex-col justify-between overflow-hidden shadow-inner select-none"
      aria-hidden="true"
    >
      {/* Browser Bar */}
      <div className="flex items-center justify-between pb-2 border-b border-[var(--line)]">
        <div className="flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-[var(--line)]" />
          <span className="w-2 h-2 rounded-full bg-[var(--line)]" />
          <span className="w-2 h-2 rounded-full bg-[var(--line)]" />
        </div>
        <div className="h-3 w-32 rounded bg-[var(--surface)] border border-[var(--line)]/60" />
        <div className="w-3" />
      </div>

      {/* Screen Mock Body based on type */}
      {type === "crm" && (
        <div className="flex-1 pt-2 flex flex-col gap-2 justify-center">
          <div className="flex items-center justify-between">
            <div className="h-3 w-24 rounded bg-[var(--ink)]/20" />
            <div className="h-4 w-12 rounded bg-[var(--sage)]/50" />
          </div>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-2 rounded bg-[var(--surface)] border border-[var(--line)] flex flex-col gap-1">
              <div className="h-2 w-10 rounded bg-[var(--terracotta)]/50" />
              <div className="h-2 w-full rounded bg-[var(--line)]" />
            </div>
            <div className="p-2 rounded bg-[var(--surface)] border border-[var(--line)] flex flex-col gap-1">
              <div className="h-2 w-12 rounded bg-[var(--sage)]/60" />
              <div className="h-2 w-full rounded bg-[var(--line)]" />
            </div>
            <div className="p-2 rounded bg-[var(--surface)] border border-[var(--line)] flex flex-col gap-1">
              <div className="h-2 w-8 rounded bg-[var(--line)]" />
              <div className="h-2 w-full rounded bg-[var(--line)]" />
            </div>
          </div>
        </div>
      )}

      {type === "erp" && (
        <div className="flex-1 pt-2 flex flex-col gap-1.5 justify-center">
          <div className="flex items-center justify-between pb-1 border-b border-[var(--line)]/50">
            <div className="h-2 w-16 rounded bg-[var(--line)]" />
            <div className="h-2 w-10 rounded bg-[var(--line)]" />
            <div className="h-2 w-12 rounded bg-[var(--line)]" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-2.5 w-20 rounded bg-[var(--surface)] border border-[var(--line)]" />
            <div className="h-2.5 w-8 rounded bg-[var(--surface)]" />
            <div className="h-2.5 w-12 rounded bg-[var(--terracotta)]/40" />
          </div>
          <div className="flex items-center justify-between">
            <div className="h-2.5 w-24 rounded bg-[var(--surface)] border border-[var(--line)]" />
            <div className="h-2.5 w-8 rounded bg-[var(--surface)]" />
            <div className="h-2.5 w-12 rounded bg-[var(--sage)]/50" />
          </div>
        </div>
      )}

      {type === "landing" && (
        <div className="flex-1 pt-2 flex flex-col items-center justify-center gap-2">
          <div className="h-3 w-36 rounded bg-[var(--ink)]/30" />
          <div className="h-2 w-48 rounded bg-[var(--line)]" />
          <div className="h-5 w-24 rounded-lg bg-[var(--terracotta)]/70 shadow-sm mt-1" />
        </div>
      )}

      {type === "booking" && (
        <div className="flex-1 pt-2 flex flex-col gap-1.5 justify-center">
          <div className="flex items-center justify-between">
            <div className="h-2.5 w-20 rounded bg-[var(--line)]" />
            <div className="h-2.5 w-12 rounded bg-[var(--sage)]/40" />
          </div>
          <div className="grid grid-cols-4 gap-1.5">
            <div className="h-6 rounded bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[var(--line)]" />
            </div>
            <div className="h-6 rounded bg-[var(--sage)]/30 border border-[var(--sage)]/60 flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[var(--sage)]" />
            </div>
            <div className="h-6 rounded bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[var(--line)]" />
            </div>
            <div className="h-6 rounded bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center">
              <div className="w-2 h-2 rounded-full bg-[var(--line)]" />
            </div>
          </div>
        </div>
      )}

      {/* Frame Bottom status */}
      <div className="flex items-center justify-between pt-1 border-t border-[var(--line)] text-[10px] text-[var(--muted)] font-mono">
        <span>[FRAME PREVIEW]</span>
        <span className="text-[var(--terracotta)]">Active Production</span>
      </div>
    </div>
  );
}

export function SelectedWork() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] text-xs font-mono uppercase tracking-wider text-[var(--terracotta)] mb-4">
          Case Studies & Proof
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--ink)] tracking-tight">
          Selected work
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--muted)]">
          Real business problems solved with bespoke software architecture. Here is how tangible outcomes were delivered.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {siteConfig.work.map((item, idx) => (
          <motion.div
            key={item.id}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
          >
            <ClayCard className="p-6 sm:p-8 flex flex-col justify-between h-full" enableTilt={true}>
              <div>
                {/* Header */}
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--terracotta)] font-semibold">
                    {item.industry}
                  </span>
                  <MotifDots />
                </div>

                <h3 className="font-serif text-2xl font-semibold text-[var(--ink)] mb-4">
                  {item.title}
                </h3>

                {/* Screenshot Frame */}
                <div className="mb-6">
                  <ScreenshotFrame type={item.previewType} />
                </div>

                {/* Problem, Solution, Result breakdown */}
                <div className="space-y-4 text-sm leading-relaxed mb-6">
                  <div>
                    <span className="font-semibold text-[var(--ink)] block mb-1">
                      Problem:
                    </span>
                    <p className="text-[var(--muted)]">{item.problem}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[var(--ink)] block mb-1">
                      Solution:
                    </span>
                    <p className="text-[var(--muted)]">{item.solution}</p>
                  </div>
                  <div>
                    <span className="font-semibold text-[var(--ink)] block mb-1">
                      Result:
                    </span>
                    <p className="text-[var(--ink)] font-medium">{item.result}</p>
                  </div>
                </div>
              </div>

              {/* Metric Chips with [PLACEHOLDER] values */}
              <div className="pt-4 border-t border-[var(--line)] flex flex-wrap items-center gap-3">
                {item.metrics.map((metric, mIdx) => (
                  <span
                    key={mIdx}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--bg)] border border-[var(--line)] text-xs font-mono font-medium text-[var(--ink)]"
                  >
                    <TrendingUp className="w-3.5 h-3.5 text-[var(--terracotta)]" strokeWidth={1.5} />
                    {metric}
                  </span>
                ))}
              </div>
            </ClayCard>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
