"use client";

import React, { useEffect, useRef, useState, type CSSProperties } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { siteConfig } from "@/content/site";
import { HERO_PROGRESS_EVENT } from "@/lib/loader";
import { EASE } from "@/components/motion/Reveal";

const TICKS = 60;
const STAGES = ["Drafting the layout", "Rendering modules", "Wiring the data", "Preparing launch"];
const CHIPS = [
  { label: "Layout", at: 0.05, pos: "-left-[9.5rem] top-[12%]", dot: "bg-[var(--terracotta)]", bars: ["w-14", "w-9", "w-11"] },
  { label: "Modules", at: 0.3, pos: "-right-[9.5rem] top-[22%]", dot: "bg-[var(--sage)]", bars: ["w-10", "w-14", "w-8"] },
  { label: "Data", at: 0.55, pos: "-left-[8rem] bottom-[14%]", dot: "bg-[var(--sage)]", bars: ["w-12", "w-7", "w-13"] },
  { label: "Launch", at: 0.8, pos: "-right-[8rem] bottom-[8%]", dot: "bg-[var(--terracotta)]", bars: ["w-9", "w-12", "w-10"] },
];
// Never block the visitor longer than this, whatever is still loading.
const MAX_WAIT_MS = 8000;
const SEEN_KEY = "omtech-loader-seen";

/** Full-screen boot sequence shown until fonts, the page and the first hero frames are ready. */
export function SiteLoader({ waitForHero }: { waitForHero: boolean }) {
  const reduce = useReducedMotion();
  const [visible, setVisible] = useState(true);
  const rootRef = useRef<HTMLDivElement>(null);
  const counterRef = useRef<HTMLSpanElement>(null);
  const stageRef = useRef<HTMLSpanElement>(null);
  const stepRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const html = document.documentElement;
    html.style.overflow = "hidden";
    // Lenis is created by MotionProvider after this effect runs.
    const lockTimer = window.setTimeout(() => window.__lenis?.stop(), 0);
    const unlock = () => {
      html.style.overflow = "";
      window.__lenis?.start();
    };

    const seen = sessionStorage.getItem(SEEN_KEY) === "1";
    const minDuration = seen ? 700 : 2000;
    const start = performance.now();

    let fonts = !document.fonts;
    let page = document.readyState === "complete";
    let hero = waitForHero ? (window.__heroProgress ?? 0) : 1;
    let forced = false;
    let shown = 0;
    let stage = -1;
    let raf = 0;
    let finished = false;
    let hideTimer = 0;

    document.fonts?.ready.then(() => (fonts = true));
    const onLoad = () => (page = true);
    const onHero = (e: Event) => (hero = (e as CustomEvent<number>).detail);
    window.addEventListener("load", onLoad);
    window.addEventListener(HERO_PROGRESS_EVENT, onHero);
    const forceTimer = window.setTimeout(() => (forced = true), MAX_WAIT_MS);

    const setStage = (i: number) => {
      if (i === stage) return;
      stage = i;
      if (stageRef.current) stageRef.current.textContent = i < STAGES.length ? STAGES[i] : "Ready";
      if (stepRef.current) stepRef.current.textContent = `${String(Math.min(i + 1, STAGES.length)).padStart(2, "0")}/${String(STAGES.length).padStart(2, "0")}`;
    };

    const tick = (now: number) => {
      const target = forced ? 1 : (fonts ? 0.15 : 0) + (page ? 0.15 : 0) + hero * 0.7;
      // The counter can't outrun the clock, so fast connections still see the sequence play out.
      const goal = Math.min(target, (now - start) / minDuration);
      shown += (goal - shown) * 0.1;
      if (goal - shown < 0.002) shown = goal;

      root.style.setProperty("--p", shown.toFixed(4));
      if (counterRef.current) counterRef.current.textContent = String(Math.round(shown * 100)).padStart(3, "0");
      setStage(shown >= 1 ? STAGES.length : Math.min(STAGES.length - 1, Math.floor(shown * STAGES.length)));

      if (shown >= 1 && !finished) {
        finished = true;
        sessionStorage.setItem(SEEN_KEY, "1");
        hideTimer = window.setTimeout(() => {
          unlock();
          setVisible(false);
        }, 420);
        return;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      window.clearTimeout(lockTimer);
      window.clearTimeout(forceTimer);
      window.clearTimeout(hideTimer);
      window.removeEventListener("load", onLoad);
      window.removeEventListener(HERO_PROGRESS_EVENT, onHero);
      unlock();
    };
  }, [waitForHero]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="site-loader"
          ref={rootRef}
          role="status"
          aria-live="polite"
          className="site-loader fixed inset-0 z-[200] overflow-hidden bg-[var(--bg)] text-[var(--ink)]"
          style={{ "--p": 0 } as CSSProperties}
          exit={
            reduce
              ? { opacity: 0, transition: { duration: 0.4 } }
              : {
                  y: "-100%",
                  borderBottomLeftRadius: "3rem",
                  borderBottomRightRadius: "3rem",
                  transition: { duration: 1.05, ease: [0.76, 0, 0.24, 1], delay: 0.2 },
                }
          }
        >
          <span className="sr-only">Loading {siteConfig.brand.name}</span>

          <div className="loader-grid absolute inset-0" aria-hidden="true" />
          <div className="loader-scan" aria-hidden="true" />

          <motion.div
            aria-hidden="true"
            exit={reduce ? undefined : { opacity: 0, y: -48, transition: { duration: 0.5, ease: EASE } }}
            className="relative flex h-full w-full flex-col px-5 py-6 sm:px-10 sm:py-8"
          >
            {/* Top bar */}
            <div className="flex items-start justify-between gap-6 text-[0.6875rem] uppercase tracking-[0.22em] text-[var(--muted)]">
              <span className="font-serif text-sm normal-case tracking-normal text-[var(--ink)] sm:text-base">
                {siteConfig.brand.name}
              </span>
              <span className="hidden sm:block">{siteConfig.brand.descriptor}</span>
            </div>

            {/* Centre: calibration ring assembling the monogram */}
            <div className="grid flex-1 place-items-center">
              <div className="relative h-[15rem] w-[15rem] sm:h-[19rem] sm:w-[19rem]">
                <svg viewBox="0 0 200 200" className="absolute inset-0 h-full w-full -rotate-90 overflow-visible">
                  <circle
                    cx="100"
                    cy="100"
                    r="98"
                    fill="none"
                    stroke="var(--ink)"
                    strokeOpacity="0.25"
                    strokeWidth="0.6"
                    strokeDasharray="0.6 5"
                    className="loader-spin"
                  />
                  {Array.from({ length: TICKS }, (_, i) => (
                    <g key={i} transform={`rotate(${(i * 360) / TICKS} 100 100)`}>
                      <line x1="184" y1="100" x2={i % 5 === 0 ? 192 : 189} y2="100" stroke="var(--line)" strokeWidth="1" />
                      <line
                        x1="184"
                        y1="100"
                        x2={i % 5 === 0 ? 192 : 189}
                        y2="100"
                        stroke="var(--terracotta)"
                        strokeWidth="1.2"
                        className="loader-tick"
                        style={{ "--i": i / TICKS } as CSSProperties}
                      />
                    </g>
                  ))}
                  <circle cx="100" cy="100" r="74" fill="none" stroke="var(--line)" strokeWidth="1" />
                  <circle
                    cx="100"
                    cy="100"
                    r="74"
                    fill="none"
                    stroke="var(--terracotta)"
                    strokeWidth="1.8"
                    pathLength={1}
                    strokeDasharray="1 1"
                    className="loader-arc"
                  />
                  <g className="loader-orbit">
                    <circle cx="100" cy="100" r="56" fill="none" stroke="var(--sage)" strokeWidth="0.8" strokeDasharray="2 4" />
                    <circle cx="156" cy="100" r="2.8" fill="var(--terracotta)" />
                  </g>
                </svg>

                {/* Viewfinder corners */}
                <div className="absolute inset-[34%]">
                  <span className="absolute left-0 top-0 h-3 w-3 border-l border-t border-[var(--ink)]/50" />
                  <span className="absolute right-0 top-0 h-3 w-3 border-r border-t border-[var(--ink)]/50" />
                  <span className="absolute bottom-0 left-0 h-3 w-3 border-b border-l border-[var(--ink)]/50" />
                  <span className="absolute bottom-0 right-0 h-3 w-3 border-b border-r border-[var(--ink)]/50" />
                </div>

                <div className="absolute inset-0 grid place-items-center">
                  <div className="loader-breathe grid h-16 w-16 place-items-center rounded-2xl bg-[var(--ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.15),0_18px_36px_-12px_rgba(31,31,28,0.55)] sm:h-20 sm:w-20">
                    <span className="font-serif text-3xl font-semibold text-[var(--surface)] sm:text-4xl">
                      {siteConfig.brand.monogram}
                    </span>
                  </div>
                </div>

                {/* Modules clicking into place around the ring */}
                {CHIPS.map((chip, i) => (
                  <div
                    key={chip.label}
                    className={`loader-chip clay-card absolute hidden w-32 rounded-xl px-3 py-2.5 md:block ${chip.pos}`}
                    style={{ "--t": chip.at } as CSSProperties}
                  >
                    <div className="mb-2 flex items-center justify-between">
                      <span className="text-[0.625rem] font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        {String(i + 1).padStart(2, "0")} · {chip.label}
                      </span>
                      <span className={`h-1.5 w-1.5 rounded-full ${chip.dot}`} />
                    </div>
                    <div className="space-y-1.5">
                      {chip.bars.map((w, b) => (
                        <span key={b} className={`block h-1 rounded-full bg-[var(--line)] ${w}`} />
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Bottom: counter and status readout */}
            <div className="flex items-end justify-between gap-6">
              <div className="font-serif leading-[0.8] tracking-tight [font-variant-numeric:tabular-nums]">
                <span ref={counterRef} className="text-[5.5rem] sm:text-[8rem] lg:text-[10rem]">
                  000
                </span>
                <span className="ml-1 align-top text-2xl text-[var(--terracotta)] sm:text-4xl">%</span>
              </div>

              <div className="flex flex-col items-end gap-2 pb-2 text-right text-[0.6875rem] uppercase tracking-[0.22em]">
                <span className="text-[var(--muted)]">
                  [<span ref={stepRef}>01/04</span>]
                </span>
                <span ref={stageRef} className="font-medium text-[var(--ink)]">
                  {STAGES[0]}
                </span>
                <span className="mt-1 hidden items-center gap-2 normal-case tracking-normal text-[var(--muted)] sm:inline-flex">
                  <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[var(--sage)]" />
                  {siteConfig.brand.availability}
                </span>
              </div>
            </div>

            <div className="relative mt-5 h-px w-full bg-[var(--line)]">
              <span className="loader-bar absolute inset-0 bg-[var(--terracotta)]" />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
