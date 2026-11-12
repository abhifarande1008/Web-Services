"use client";

import React from "react";
import { siteConfig, IndustryItem } from "@/content/site";
import { ClayCard } from "./ClayCard";
import { SectionHeading } from "./SectionHeading";
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
  const IconComponent = industryIconMap[industry.iconName] || Briefcase;
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
      className="h-full"
    >
      <ClayCard className="p-6 h-full flex flex-col justify-between">
        <div>
          <div className="w-10 h-10 mb-4 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--terracotta)]">
            <IconComponent className="w-5 h-5" strokeWidth={1.5} />
          </div>

          <h3 className="font-serif text-xl font-semibold text-[var(--ink)] mb-2">
            {industry.title}
          </h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-4">
            {industry.description}
          </p>
        </div>

        <div className="mt-2 pt-4 border-t border-[var(--line)]">
          <span className="block text-xs font-medium text-[var(--muted)] mb-1.5">
            For example
          </span>
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
      <SectionHeading
        eyebrow="Industries"
        title="Who we work with"
        intro="Every business runs a little differently. Here are a few examples of what we build for different kinds of businesses."
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {siteConfig.industries.map((ind, idx) => (
          <IndustryTile key={ind.id} industry={ind} index={idx} />
        ))}
      </div>
    </section>
  );
}
