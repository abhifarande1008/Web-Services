"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { motion, MotionValue, useTransform, useReducedMotion } from "framer-motion";
import { ArrowUpRight, ArrowDown } from "lucide-react";

interface HeroTextOverlaysProps {
  progress: MotionValue<number>;
}

export function HeroTextOverlays({ progress }: HeroTextOverlaysProps) {
  const shouldReduceMotion = useReducedMotion();

  // Intro: fully visible from 0 to 0.12, fades out and moves up 24px by 0.3
  const introOpacity = useTransform(progress, [0, 0.12, 0.3], [1, 1, 0]);
  const introY = useTransform(progress, [0, 0.12, 0.3], [0, 0, -24]);

  // Beat 1: "I design and build the system." fades in at 0.35, holds to 0.55, fades out by 0.65
  const beat1Opacity = useTransform(progress, [0.3, 0.35, 0.55, 0.65], [0, 1, 1, 0]);
  const beat1Y = useTransform(progress, [0.3, 0.35, 0.55, 0.65], [16, 0, 0, -16]);

  // Beat 2: "You run your business on it." fades in at 0.7 and holds to the end
  const beat2Opacity = useTransform(progress, [0.65, 0.7, 1], [0, 1, 1]);
  const beat2Y = useTransform(progress, [0.65, 0.7, 1], [16, 0, 0]);

  if (shouldReduceMotion) {
    return (
      <div className="absolute inset-0 z-20 flex flex-col justify-start pt-24 sm:pt-28 md:pt-32 px-4 sm:px-8 lg:px-16 pointer-events-auto max-w-7xl mx-auto w-full">
        <div className="max-w-xl text-center md:text-left mx-auto md:mx-0">
          <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[var(--ink)] tracking-tight leading-[1.1] mb-4">
            {siteConfig.hero.headline}
          </h1>
          <p className="text-base sm:text-lg text-[var(--muted)] leading-relaxed mb-8">
            {siteConfig.hero.subheading}
          </p>
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <a href="#contact" className="btn-primary w-full sm:w-auto px-7 py-3 text-sm font-medium">
              <span>{siteConfig.hero.primaryCta}</span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
            <a href="#work" className="btn-secondary w-full sm:w-auto px-7 py-3 text-sm font-medium">
              <span>{siteConfig.hero.secondaryCta}</span>
              <ArrowDown className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 z-20 pointer-events-none flex flex-col justify-start pt-20 sm:pt-24 md:pt-28 px-4 sm:px-8 lg:px-16 max-w-7xl mx-auto w-full">
      {/* Intro Overlay */}
      <motion.div
        data-hero-copy
        style={{ opacity: introOpacity, y: introY }}
        className="absolute top-20 sm:top-24 md:top-28 left-4 sm:left-8 lg:left-16 right-4 sm:right-auto max-w-xl text-center md:text-left mx-auto md:mx-0"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)]/90 border border-[var(--line)] shadow-xs mb-4">
          <span className="w-2 h-2 rounded-full bg-[var(--sage)]" />
          <span className="text-xs text-[var(--muted)] font-medium">
            {siteConfig.brand.availability}
          </span>
        </div>
        <h1 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[var(--ink)] tracking-tight leading-[1.08] mb-3">
          {siteConfig.hero.headline}
        </h1>
        <p className="text-sm sm:text-base md:text-lg text-[var(--muted)] leading-relaxed max-w-lg">
          {siteConfig.hero.subheading}
        </p>
      </motion.div>

      {/* Beat 1 Overlay */}
      <motion.div
        data-hero-copy
        style={{ opacity: beat1Opacity, y: beat1Y }}
        className="absolute top-20 sm:top-24 md:top-28 left-4 sm:left-8 lg:left-16 right-4 sm:right-auto max-w-xl text-center md:text-left mx-auto md:mx-0"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)]/90 border border-[var(--line)] shadow-xs mb-4">
          <span className="w-2 h-2 rounded-full bg-[var(--terracotta)]" />
          <span className="text-xs text-[var(--terracotta)] font-medium">
            How it starts
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[var(--ink)] tracking-tight leading-[1.08] mb-3">
          {siteConfig.hero.beat1}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-[var(--muted)] leading-relaxed max-w-lg">
          {siteConfig.hero.beat1Sub}
        </p>
      </motion.div>

      {/* Beat 2 Overlay */}
      <motion.div
        data-hero-copy
        style={{ opacity: beat2Opacity, y: beat2Y }}
        className="absolute top-20 sm:top-24 md:top-28 left-4 sm:left-8 lg:left-16 right-4 sm:right-auto max-w-xl text-center md:text-left mx-auto md:mx-0 pointer-events-auto"
      >
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)]/90 border border-[var(--line)] shadow-xs mb-4">
          <span className="w-2 h-2 rounded-full bg-[var(--sage)]" />
          <span className="text-xs text-[var(--ink)] font-medium">
            Where it ends up
          </span>
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[var(--ink)] tracking-tight leading-[1.08] mb-3">
          {siteConfig.hero.beat2}
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-[var(--muted)] leading-relaxed max-w-lg mb-6">
          {siteConfig.hero.beat2Sub}
        </p>
        <div className="flex flex-row items-center justify-center md:justify-start gap-3">
          <a
            href="#contact"
            className="btn-primary flex-1 sm:flex-none px-4 sm:px-6 py-3 text-sm font-medium shadow-md whitespace-nowrap"
          >
            <span>{siteConfig.hero.primaryCta}</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
          <a
            href="#work"
            className="btn-secondary flex-1 sm:flex-none px-4 sm:px-6 py-3 text-sm font-medium whitespace-nowrap bg-[var(--bg)]/80"
          >
            <span>{siteConfig.hero.secondaryCta}</span>
            <ArrowDown className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>
      </motion.div>
    </div>
  );
}
