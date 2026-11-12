"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { motion, useReducedMotion } from "framer-motion";

export function TechStack() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="tech-stack" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        align="center"
        eyebrow="Technology"
        title="What we build with"
        intro="Widely used, well-supported tools, so any good developer can pick up the code later if they need to."
      />

      <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
        {siteConfig.techStack.map((tech, idx) => (
          <motion.div
            key={tech.name}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.04 }}
          >
            <div className="px-4 py-2.5 rounded-xl bg-[var(--surface)] border border-[var(--line)] flex items-baseline gap-2">
              <span className="font-medium text-sm text-[var(--ink)]">{tech.name}</span>
              <span className="text-xs text-[var(--muted)]">{tech.category}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
