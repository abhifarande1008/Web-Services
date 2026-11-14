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

  // The beats share one position, so each fully fades out before the next fades in.
  const introOpacity = useTransform(progress, [0, 0.14, 0.26], [1, 1, 0]);
  const introY = useTransform(progress, [0, 0.14, 0.26], [0, 0, -24]);

  const beat1Opacity = useTransform(progress, [0.28, 0.36, 0.56, 0.64], [0, 1, 1, 0]);
  const beat1Y = useTransform(progress, [0.28, 0.36, 0.56, 0.64], [16, 0, 0, -16]);

  const beat2Opacity = useTransform(progress, [0.66, 0.74, 1], [0, 1, 1]);
  const beat2Y = useTransform(progress, [0.66, 0.74, 1], [16, 0, 0]);

  // Faded-out beats must not catch clicks or keyboard focus.
  const toVisibility = (v: number) => (v > 0.05 ? "visible" : "hidden");
  const introVisibility = useTransform(introOpacity, toVisibility);
  const beat1Visibility = useTransform(beat1Opacity, toVisibility);
  const beat2Visibility = useTransform(beat2Opacity, toVisibility);

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

  // Copy sits on top of the full-bleed animation, so it uses near-black text with a light halo.
  const halo = "[text-shadow:0_0_18px_rgba(234,225,210,0.95),0_1px_2px_rgba(234,225,210,0.9)]";
  const headingClass = `font-serif text-3xl sm:text-5xl lg:text-5xl xl:text-6xl font-normal text-[#141412] tracking-tight leading-[1.08] mb-3 ${halo}`;
  const bodyClass = `text-sm sm:text-base xl:text-lg font-medium text-[#2E2B26] leading-relaxed ${halo}`;
  // Own compositor layers, so fading the shadowed text doesn't repaint it on every scroll frame.
  const beatClass = "col-start-1 row-start-1 will-change-[opacity,transform]";

  // All three beats share one grid cell, so the wrapper is as tall as the tallest beat.
  // ScrollHero measures that wrapper ([data-hero-copy]) to keep the animation clear of the text.
  return (
    <div className="absolute inset-x-0 top-20 bottom-0 z-20 pointer-events-none flex items-start lg:items-center pt-6 sm:pt-10 lg:pt-0 lg:pb-12">
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-8 lg:px-12">
        <div
          data-hero-copy
          className="grid max-w-xl lg:max-w-md xl:max-w-xl mx-auto lg:mx-0 text-center lg:text-left"
        >
          <motion.div
            style={{ opacity: introOpacity, y: introY, visibility: introVisibility }}
            className={beatClass}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)]/90 border border-[var(--line)] shadow-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-[var(--sage)]" />
              <span className="text-xs text-[var(--muted)] font-medium">
                {siteConfig.brand.availability}
              </span>
            </div>
            <h1 className={headingClass}>{siteConfig.hero.headline}</h1>
            <p className={bodyClass}>{siteConfig.hero.subheading}</p>
          </motion.div>

          <motion.div
            style={{ opacity: beat1Opacity, y: beat1Y, visibility: beat1Visibility }}
            className={beatClass}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)]/90 border border-[var(--line)] shadow-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-[var(--terracotta)]" />
              <span className="text-xs text-[var(--terracotta)] font-medium">How it starts</span>
            </div>
            <h2 className={headingClass}>{siteConfig.hero.beat1}</h2>
            <p className={bodyClass}>{siteConfig.hero.beat1Sub}</p>
          </motion.div>

          <motion.div
            style={{ opacity: beat2Opacity, y: beat2Y, visibility: beat2Visibility }}
            className={`${beatClass} pointer-events-auto`}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)]/90 border border-[var(--line)] shadow-xs mb-4">
              <span className="w-2 h-2 rounded-full bg-[var(--sage)]" />
              <span className="text-xs text-[var(--ink)] font-medium">Where it ends up</span>
            </div>
            <h2 className={headingClass}>{siteConfig.hero.beat2}</h2>
            <p className={`${bodyClass} mb-6`}>{siteConfig.hero.beat2Sub}</p>
            <div className="flex flex-row items-center justify-center lg:justify-start gap-3">
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
      </div>

      <motion.div
        style={{ opacity: introOpacity }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs text-[var(--muted)]"
        aria-hidden="true"
      >
        <span>Scroll</span>
        <ArrowDown className="w-4 h-4 animate-bounce" strokeWidth={1.5} />
      </motion.div>
    </div>
  );
}
