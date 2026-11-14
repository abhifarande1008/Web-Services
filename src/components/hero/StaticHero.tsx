"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { ClayCard } from "../ClayCard";
import { MockUI } from "../MockUI";
import { ArrowUpRight, ArrowDown, CheckCircle2 } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function StaticHero() {
  const shouldReduceMotion = useReducedMotion();
  const smoothEase = [0.22, 1, 0.36, 1] as const;

  const fadeIn = {
    initial: shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: smoothEase },
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen w-full flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 pt-28 pb-16 overflow-hidden bg-[var(--bg)]"
    >
      <div
        id="hero-scroll-background"
        className="absolute inset-0 pointer-events-none z-0"
        aria-hidden="true"
      >
        <div
          className="w-full h-full opacity-35"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, var(--line) 1px, transparent 0)`,
            backgroundSize: "32px 32px",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto flex flex-col items-center text-center">
        <motion.div
          {...fadeIn}
          className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--surface)] border border-[var(--line)] shadow-sm mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-[var(--sage)] animate-pulse" />
          <span className="text-xs font-medium text-[var(--muted)]">
            {siteConfig.brand.availability}
          </span>
        </motion.div>

        <motion.h1
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1, ease: smoothEase }}
          className="font-serif text-4xl sm:text-6xl md:text-7xl lg:text-[4.75rem] font-normal tracking-tight text-[var(--ink)] leading-[1.08] max-w-4xl"
        >
          {siteConfig.hero.headline}
        </motion.h1>

        <motion.p
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2, ease: smoothEase }}
          className="mt-6 text-lg sm:text-xl text-[var(--muted)] max-w-2xl font-normal leading-relaxed"
        >
          {siteConfig.hero.subheading}
        </motion.p>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3, ease: smoothEase }}
          className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto"
        >
          <a
            href="#contact"
            className="btn-primary w-full sm:w-auto px-8 py-3.5 text-base font-medium shadow-md"
          >
            <span>{siteConfig.hero.primaryCta}</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
          <a
            href="#work"
            className="btn-secondary w-full sm:w-auto px-8 py-3.5 text-base font-medium"
          >
            <span>{siteConfig.hero.secondaryCta}</span>
            <ArrowDown className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: smoothEase }}
          className="mt-16 w-full max-w-4xl grid grid-cols-1 sm:grid-cols-3 gap-4 text-left"
        >
          <ClayCard className="p-5">
            <span className="text-xs font-medium text-[var(--muted)] block mb-2">Websites</span>
            <p className="text-sm font-serif font-medium text-[var(--ink)] mb-3">
              Landing pages and company sites
            </p>
            <MockUI type="chart" />
          </ClayCard>

          <ClayCard className="p-5" highlightTop={true}>
            <span className="text-xs font-medium text-[var(--terracotta)] block mb-2">Business software</span>
            <p className="text-sm font-serif font-medium text-[var(--ink)] mb-3">
              CRM, billing and inventory
            </p>
            <MockUI type="kanban" />
          </ClayCard>

          <ClayCard className="p-5">
            <span className="text-xs font-medium text-[var(--muted)] block mb-2">Integrations</span>
            <p className="text-sm font-serif font-medium text-[var(--ink)] mb-3">
              WhatsApp, payments and APIs
            </p>
            <MockUI type="toggle" />
          </ClayCard>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-xs text-[var(--muted)] font-medium"
        >
          {siteConfig.hero.metrics.map((m, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-[var(--terracotta)]" strokeWidth={1.5} />
              <span>
                {m.label} <strong className="text-[var(--ink)] font-semibold">{m.value}</strong>
              </span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
