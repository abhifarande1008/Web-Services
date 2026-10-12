"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { ClayCard } from "./ClayCard";
import { MotifDots } from "./MockUI";
import { User, MapPin, Sparkles, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function About() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ClayCard className="p-8 sm:p-12" enableTilt={false}>
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            {/* Placeholder Image Slot */}
            <div className="md:col-span-5 flex flex-col items-center">
              <div
                className="w-full max-w-[280px] aspect-[4/5] rounded-2xl bg-[var(--bg)] border border-[var(--line)] p-4 flex flex-col justify-between shadow-inner relative overflow-hidden"
                aria-label="Portrait of Abhishek Farande"
              >
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono uppercase text-[var(--muted)]">
                    [PORTRAIT SLOT]
                  </span>
                  <MotifDots />
                </div>

                {/* Stylized avatar geometry */}
                <div className="flex flex-col items-center justify-center flex-1 my-4">
                  <div className="w-20 h-20 rounded-full bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center text-[var(--terracotta)] shadow-sm mb-3">
                    <User className="w-10 h-10" strokeWidth={1.5} />
                  </div>
                  <span className="font-serif font-semibold text-base text-[var(--ink)]">
                    {siteConfig.brand.founder}
                  </span>
                  <span className="text-xs text-[var(--muted)] text-center mt-1">
                    {siteConfig.brand.role}
                  </span>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-[var(--line)] text-[11px] font-mono text-[var(--muted)]">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-[var(--terracotta)]" strokeWidth={1.5} />
                    {siteConfig.brand.location}
                  </span>
                  <span className="text-[var(--sage)] font-medium">Verified Builder</span>
                </div>
              </div>
            </div>

            {/* Bio Content */}
            <div className="md:col-span-7 flex flex-col justify-center">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg)] border border-[var(--line)] text-xs font-mono uppercase tracking-wider text-[var(--terracotta)] mb-4 w-fit">
                {siteConfig.about.title}
              </div>

              <h2 className="font-serif text-2xl sm:text-3xl font-semibold text-[var(--ink)] tracking-tight mb-4">
                {siteConfig.about.headline}
              </h2>

              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-4">
                {siteConfig.about.paragraph1}
              </p>

              <p className="text-sm sm:text-base text-[var(--muted)] leading-relaxed mb-6">
                {siteConfig.about.paragraph2}
              </p>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 pt-6 border-t border-[var(--line)]">
                {siteConfig.about.stats.map((stat, idx) => (
                  <div key={idx} className="p-3 rounded-xl bg-[var(--bg)]/50 border border-[var(--line)]/60 text-center">
                    <span className="font-serif font-bold text-base text-[var(--ink)] block">
                      {stat.value}
                    </span>
                    <span className="text-[11px] font-mono text-[var(--muted)]">
                      {stat.label}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ClayCard>
      </motion.div>
    </section>
  );
}
