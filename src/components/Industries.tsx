"use client";

import React, { useState } from "react";
import { siteConfig, IndustryItem } from "@/content/site";
import { ClayCard } from "./ClayCard";
import { MotifDots } from "./MockUI";
import { motion, useReducedMotion } from "framer-motion";
import {
  Stethoscope,
  Store,
  Building2,
  GraduationCap,
  Truck,
  Utensils,
  Factory,
  Briefcase,
  LucideIcon,
  Sparkles,
} from "lucide-react";

const industryIconMap: Record<string, LucideIcon> = {
  Stethoscope,
  Store,
  Building2,
  GraduationCap,
  Truck,
  Utensils,
  Factory,
  Briefcase,
};

function IndustryTile({ industry, index }: { industry: IndustryItem; index: number }) {
  const [hovered, setHovered] = useState(false);
  const IconComponent = industryIconMap[industry.iconName] || Briefcase;
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
    >
      <ClayCard
        className="p-6 h-full flex flex-col justify-between cursor-pointer transition-all duration-300 relative overflow-hidden"
        enableTilt={true}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setHovered(!hovered)}
      >
        <div>
          {/* Top Bar */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--terracotta)]">
              <IconComponent className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <MotifDots />
          </div>

          <h3 className="font-serif text-xl font-semibold text-[var(--ink)] mb-2">
            {industry.title}
          </h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
            {industry.description}
          </p>
        </div>

        {/* Revealed Module on Hover / Tap */}
        <div
          className={`mt-4 pt-4 border-t border-[var(--line)] transition-all duration-300 ${
            hovered ? "opacity-100 translate-y-0" : "opacity-90 md:opacity-60"
          }`}
        >
          <div className="flex items-center gap-1.5 mb-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-[var(--sage)]" />
            <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--muted)] font-medium">
              Example Module:
            </span>
          </div>
          <div className="p-3 rounded-xl bg-[var(--bg)]/60 border border-[var(--line)]">
            <p className="text-xs font-semibold text-[var(--ink)] mb-1">
              {industry.exampleModule.name}
            </p>
            <p className="text-[11px] text-[var(--muted)] leading-relaxed">
              {industry.exampleModule.details}
            </p>
          </div>
        </div>
      </ClayCard>
    </motion.div>
  );
}

export function Industries() {
  return (
    <section id="industries" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] text-xs font-mono uppercase tracking-wider text-[var(--terracotta)] mb-4">
          Domain Experience
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--ink)] tracking-tight">
          Tailored across industries
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--muted)]">
          Every industry has distinct operational nuances. Here are proven modules I build for specific verticals.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {siteConfig.industries.map((ind, idx) => (
          <IndustryTile key={ind.id} industry={ind} index={idx} />
        ))}
      </div>
    </section>
  );
}
