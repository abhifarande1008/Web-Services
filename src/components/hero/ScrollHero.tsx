"use client";

import React, { useRef, useEffect, useState } from "react";
import { useScroll, useReducedMotion } from "framer-motion";
import { BG_HEX, HERO_END_RATIO, frameStep } from "@/lib/hero-config";
import { reportHeroProgress } from "@/lib/loader";
import { createHeroRenderer, type HeroLayout } from "@/lib/hero-renderer";
import { HeroTextOverlays } from "./HeroTextOverlays";

interface ScrollHeroProps {
  frames: string[];
}

// The frames are soft renders, so extra canvas pixels only cost fill rate on weak GPUs.
const MAX_DPR = 1.5;
const MAX_CANVAS_PIXELS = 1600 * 900;

export function ScrollHero({ frames }: ScrollHeroProps) {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);

  const shouldReduceMotion = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ["start start", "end end"],
  });

  const lastIndex = Math.max(0, Math.floor((frames.length - 1) * HERO_END_RATIO));

  const [isReady, setIsReady] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    const sticky = stickyRef.current;
    const wrapper = wrapperRef.current;
    if (!canvas || !sticky || !wrapper || frames.length === 0) return;

    const step = frameStep(window.innerWidth < 768);
    const urls: string[] = [];
    for (let i = 0; i <= lastIndex; i += step) urls.push(frames[i]);

    const measure = (): HeroLayout => {
      const rect = sticky.getBoundingClientRect();
      const c = sticky.querySelector<HTMLElement>("[data-hero-copy]")?.getBoundingClientRect();
      let dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);
      const pixels = rect.width * rect.height * dpr * dpr;
      if (pixels > MAX_CANVAS_PIXELS) dpr *= Math.sqrt(MAX_CANVAS_PIXELS / pixels);
      return {
        width: rect.width,
        height: rect.height,
        dpr,
        copy: c
          ? { top: c.top - rect.top, bottom: c.bottom - rect.top, left: c.left - rect.left, right: c.right - rect.left }
          : { top: 0, bottom: 0, left: 0, right: 0 },
      };
    };

    const renderer = createHeroRenderer({
      canvas,
      urls,
      reduce: !!shouldReduceMotion,
      progress: scrollYProgress.get(),
      layout: measure(),
      onLoad: ({ fetched, heroProgress, done }) => {
        reportHeroProgress(heroProgress);
        if (progressBarRef.current) progressBarRef.current.style.width = `${Math.round(fetched * 100)}%`;
        if (done) setIsLoading(false);
      },
      onFirstPaint: () => setIsReady(true),
    });

    let lastLayoutKey = "";
    const relayout = () => {
      const layout = measure();
      const key = JSON.stringify(layout);
      if (key === lastLayoutKey) return;
      lastLayoutKey = key;
      renderer.setLayout(layout);
    };
    window.addEventListener("resize", relayout, { passive: true });
    // Web fonts change the text height after first paint; re-measure once they're in.
    document.fonts?.ready.then(relayout);

    const observer = new IntersectionObserver(([entry]) => renderer.setInView(entry.isIntersecting));
    observer.observe(wrapper);

    const unsubscribeScroll = scrollYProgress.on("change", (p) => renderer.setProgress(p));

    return () => {
      unsubscribeScroll();
      observer.disconnect();
      window.removeEventListener("resize", relayout);
      renderer.dispose();
    };
  }, [frames, lastIndex, scrollYProgress, shouldReduceMotion]);

  return (
    <section
      ref={wrapperRef}
      id="hero-scroll"
      className="relative w-full h-[200vh] md:h-[250vh] bg-[#EAE1D2]"
    >
      {/* 2px Terracotta Loading Progress Bar */}
      {isLoading && (
        <div
          ref={progressBarRef}
          className="fixed top-0 left-0 h-[0.125rem] w-0 bg-[var(--terracotta)] z-50 transition-[width] duration-150 pointer-events-none"
          aria-hidden="true"
        />
      )}

      {/* Sticky viewport container */}
      <div
        ref={stickyRef}
        className="sticky top-0 h-[100svh] w-full overflow-hidden bg-[#EAE1D2] flex items-center justify-center"
      >
        {/* Canvas for sequence scrub animation with 300ms fade-in */}
        <canvas
          ref={canvasRef}
          className={`absolute inset-0 w-full h-full block transition-opacity duration-300 ${
            isReady ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundColor: BG_HEX }}
        />

        {/* Text Overlays driven by scroll progress (always visible) */}
        <HeroTextOverlays progress={scrollYProgress} />

        {/* 120px Bottom Gradient for seamless section blend */}
        <div
          className="absolute bottom-0 left-0 right-0 h-[7.5rem] pointer-events-none z-15"
          style={{
            background: `linear-gradient(to bottom, rgba(234, 225, 210, 0) 0%, ${BG_HEX} 100%)`,
          }}
          aria-hidden="true"
        />
      </div>
    </section>
  );
}
