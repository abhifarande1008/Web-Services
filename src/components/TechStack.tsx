"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { ClayCard } from "./ClayCard";
import { Code2, Server, Database, Layers } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function TechStack() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="tech-stack" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] text-xs font-mono uppercase tracking-wider text-[var(--terracotta)] mb-4">
          Robust Foundation
        </div>
        <h2 className="font-serif text-3xl sm:text-4xl font-normal text-[var(--ink)] tracking-tight">
          Modern, battle-tested stack
        </h2>
        <p className="mt-3 text-sm sm:text-base text-[var(--muted)]">
          Built with dependable technologies chosen for longevity, performance, and maintainability.
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3.5 max-w-5xl mx-auto">
        {siteConfig.techStack.map((tech, idx) => (
          <motion.div
            key={tech.name}
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: idx * 0.04 }}
          >
            <div className="clay-card p-4 flex flex-col items-center text-center justify-center h-full hover:-translate-y-1 transition-transform">
              <span className="font-serif font-semibold text-base text-[var(--ink)]">
                {tech.name}
              </span>
              <span className="text-[11px] font-mono text-[var(--muted)] mt-1">
                {tech.category}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
