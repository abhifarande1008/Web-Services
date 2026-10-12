"use client";

import React, { useState } from "react";
import { siteConfig } from "@/content/site";
import { ClayCard } from "./ClayCard";
import { MotifDots } from "./MockUI";
import { CheckCircle2, Clock, ArrowRight, Sparkles } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

export function InteractiveNeeds() {
  const [activeId, setActiveId] = useState(siteConfig.needsSolutions[0].id);
  const shouldReduceMotion = useReducedMotion();

  const activeSolution =
    siteConfig.needsSolutions.find((s) => s.id === activeId) ||
    siteConfig.needsSolutions[0];

  const handleDiscussClick = (servicePrefill: string) => {
    // Dispatch custom event to notify contact form
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("prefill-service", { detail: servicePrefill })
      );
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="solutions" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] text-xs font-mono uppercase tracking-wider text-[var(--terracotta)] mb-4">
          Tailored Blueprint
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--ink)] tracking-tight">
          What do you need?
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--muted)]">
          Select your primary business objective below to see the recommended architecture and delivery timeline.
        </p>
      </div>

      {/* Interactive Chips Bar */}
      <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-4xl mx-auto mb-12">
        {siteConfig.needsSolutions.map((item) => {
          const isActive = item.id === activeId;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => setActiveId(item.id)}
              className={`px-5 py-3 rounded-xl text-sm font-medium transition-all duration-200 border cursor-pointer focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)] ${
                isActive
                  ? "bg-[var(--surface)] text-[var(--ink)] border-[var(--terracotta)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_4px_12px_rgba(200,100,60,0.12)] -translate-y-0.5"
                  : "bg-[var(--surface)]/70 text-[var(--muted)] border-[var(--line)] hover:bg-[var(--surface)] hover:text-[var(--ink)]"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full transition-colors ${
                    isActive ? "bg-[var(--terracotta)]" : "bg-[var(--line)]"
                  }`}
                />
                {item.chipLabel}
              </span>
            </button>
          );
        })}
      </div>

      {/* Recommended Solution ClayCard */}
      <div className="max-w-4xl mx-auto">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeSolution.id}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          >
            <ClayCard className="p-8 sm:p-10" enableTilt={false}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[var(--line)]">
                <div>
                  <span className="text-xs font-mono uppercase tracking-wider text-[var(--terracotta)] font-semibold">
                    Recommended Solution
                  </span>
                  <h3 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--ink)] mt-1">
                    {activeSolution.title}
                  </h3>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-lg bg-[var(--bg)] border border-[var(--line)] text-xs font-medium text-[var(--ink)]">
                    <Clock className="w-3.5 h-3.5 text-[var(--muted)]" strokeWidth={1.5} />
                    <span>{activeSolution.timeline}</span>
                  </div>
                  <MotifDots />
                </div>
              </div>

              <p className="mt-6 text-base text-[var(--muted)] leading-relaxed">
                {activeSolution.description}
              </p>

              {/* What's Included */}
              <div className="mt-8">
                <h4 className="text-xs font-mono uppercase tracking-wider text-[var(--ink)] font-semibold mb-4">
                  What is included in this build:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {activeSolution.included.map((bullet, idx) => (
                    <div
                      key={idx}
                      className="flex items-start gap-3 p-3 rounded-xl bg-[var(--bg)]/40 border border-[var(--line)]/50"
                    >
                      <CheckCircle2
                        className="w-4 h-4 text-[var(--sage)] shrink-0 mt-0.5"
                        strokeWidth={1.5}
                      />
                      <span className="text-sm text-[var(--ink)] font-normal leading-snug">
                        {bullet}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Bottom */}
              <div className="mt-8 pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="text-xs text-[var(--muted)]">
                  <span>Pre-fills inquiry for: </span>
                  <strong className="text-[var(--ink)] font-medium">
                    {activeSolution.servicePrefill}
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={() => handleDiscussClick(activeSolution.servicePrefill)}
                  className="btn-primary w-full sm:w-auto text-sm py-2.5 px-6 font-medium cursor-pointer"
                >
                  <span>Discuss this solution</span>
                  <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                </button>
              </div>
            </ClayCard>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
