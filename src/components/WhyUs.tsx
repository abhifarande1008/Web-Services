"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { ClayCard } from "./ClayCard";
import { SectionHeading } from "./SectionHeading";
import {
  MessageSquare,
  CheckCircle2,
  Shield,
  HeartHandshake,
  Rocket,
  LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const proofIconMap: Record<string, LucideIcon> = {
  MessageSquare,
  CheckCircle2,
  Shield,
  HeartHandshake,
  Rocket,
};

export function WhyUs() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="why-us" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow={`Why ${siteConfig.brand.shortName}`}
        title="Why businesses work with us"
        intro="The care of a small team, with the process and accountability you'd expect from a proper company."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {siteConfig.whyUs.map((item, idx) => {
          const IconComponent = proofIconMap[item.iconName] || CheckCircle2;

          return (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
            >
              <ClayCard className="p-7 h-full">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--terracotta)]">
                    <IconComponent className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  <span className="font-serif text-sm text-[var(--muted)]">{item.number}</span>
                </div>

                <h3 className="font-serif text-xl font-semibold text-[var(--ink)] mb-2.5">
                  {item.title}
                </h3>

                <p className="text-sm text-[var(--muted)] leading-relaxed">
                  {item.description}
                </p>
              </ClayCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
