"use client";

import React, { useRef, useState } from "react";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { ArrowRight, Check } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const TIMELINE_WEEKS = 10;

/** "About 1 week" -> [1, 1], "4 to 7 weeks" -> [4, 7]. */
function parseWeeks(timeline: string): [number, number] {
  const nums = (timeline.match(/\d+/g) || []).map(Number);
  if (nums.length === 0) return [1, 1];
  return [nums[0], nums[nums.length - 1]];
}

function TimelineBar({ timeline }: { timeline: string }) {
  const [min, max] = parseWeeks(timeline);
  const pct = (w: number) => `${(Math.min(w, TIMELINE_WEEKS) / TIMELINE_WEEKS) * 100}%`;
  return (
    <div>
      <div className="flex items-baseline justify-between mb-3">
        <h4 className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
          Typical timeline
        </h4>
        <span className="text-sm font-semibold text-[var(--ink)]">{timeline}</span>
      </div>
      <div className="relative h-3 rounded-full bg-[var(--bg)] border border-[var(--line)] overflow-hidden" aria-hidden="true">
        <div className="absolute inset-y-0 left-0 bg-[var(--terracotta)] rounded-full" style={{ width: pct(min) }} />
        {max > min && (
          <div
            className="absolute inset-y-0 rounded-r-full"
            style={{
              left: pct(min),
              width: `calc(${pct(max)} - ${pct(min)})`,
              backgroundImage:
                "repeating-linear-gradient(135deg, rgba(200,100,60,0.45) 0 4px, rgba(200,100,60,0.12) 4px 8px)",
            }}
          />
        )}
      </div>
      <div className="mt-2 grid text-[10px] text-[var(--muted)] tabular-nums" style={{ gridTemplateColumns: `repeat(${TIMELINE_WEEKS}, 1fr)` }} aria-hidden="true">
        {Array.from({ length: TIMELINE_WEEKS }, (_, i) => (
          <span key={i} className="text-right">
            {i + 1 === 1 || (i + 1) % 2 === 0 ? `W${i + 1}` : ""}
          </span>
        ))}
      </div>
      {max > min && (
        <p className="mt-2 text-xs text-[var(--muted)]">
          The striped part depends on how many screens and integrations you need.
        </p>
      )}
    </div>
  );
}

export function InteractiveNeeds() {
  const items = siteConfig.needsSolutions;
  const [activeId, setActiveId] = useState(items[0].id);
  const shouldReduceMotion = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  const activeIndex = Math.max(0, items.findIndex((s) => s.id === activeId));
  const active = items[activeIndex];

  const handleDiscussClick = (servicePrefill: string) => {
    window.dispatchEvent(new CustomEvent("prefill-service", { detail: servicePrefill }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    const keys = ["ArrowDown", "ArrowRight", "ArrowUp", "ArrowLeft", "Home", "End"];
    if (!keys.includes(e.key)) return;
    e.preventDefault();
    let next = index;
    if (e.key === "ArrowDown" || e.key === "ArrowRight") next = (index + 1) % items.length;
    if (e.key === "ArrowUp" || e.key === "ArrowLeft") next = (index - 1 + items.length) % items.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = items.length - 1;
    setActiveId(items[next].id);
    tabRefs.current[next]?.focus();
  };

  return (
    <section id="solutions" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Solutions"
        title="Start with the problem, not the technology"
        intro="Pick what you're trying to fix. We'll show you what we'd typically build, what's included and how long it takes."
      />

      <div
        className="rounded-[28px] border border-[var(--line)] bg-[#E3D9C8]/55 p-3 sm:p-6 lg:p-8"
        style={{
          backgroundImage: "radial-gradient(rgba(31,31,28,0.09) 1px, transparent 1px)",
          backgroundSize: "18px 18px",
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,19rem)_1fr] gap-4 sm:gap-6">
          {/* Problem picker */}
          <div>
            <p className="px-1 mb-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
              I want to&hellip;
            </p>
            <div
              role="tablist"
              aria-label="What do you need help with?"
              aria-orientation="vertical"
              className="grid grid-cols-2 lg:grid-cols-1 gap-2"
            >
              {items.map((item, i) => {
                const isActive = item.id === activeId;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`need-tab-${item.id}`}
                    aria-selected={isActive}
                    aria-controls="need-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveId(item.id)}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    className={`group relative text-left rounded-xl border px-3.5 py-3 lg:px-4 lg:py-3.5 transition-all duration-200 cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] ${
                      isActive
                        ? "bg-[var(--surface)] border-[var(--line)] shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_6px_16px_rgba(31,31,28,0.08)]"
                        : "bg-[var(--surface)]/45 border-transparent hover:bg-[var(--surface)]/80"
                    }`}
                  >
                    <span
                      className={`absolute left-0 top-3 bottom-3 w-[3px] rounded-r-full transition-colors ${
                        isActive ? "bg-[var(--terracotta)]" : "bg-transparent"
                      }`}
                      aria-hidden="true"
                    />
                    <span className="flex items-center gap-3">
                      <span
                        className={`hidden sm:inline font-mono text-[11px] tabular-nums ${
                          isActive ? "text-[var(--terracotta)]" : "text-[var(--muted)]/70"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="flex-1 min-w-0">
                        <span
                          className={`block text-sm lg:text-[15px] font-semibold leading-snug ${
                            isActive ? "text-[var(--ink)]" : "text-[var(--ink)]/75"
                          }`}
                        >
                          {item.chipLabel}
                        </span>
                        <span className="hidden lg:flex items-center gap-1.5 mt-0.5 text-xs text-[var(--muted)]">
                          <ArrowRight className="w-3 h-3" strokeWidth={1.75} aria-hidden="true" />
                          {item.servicePrefill}
                        </span>
                      </span>
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Project brief */}
          <div
            id="need-panel"
            role="tabpanel"
            aria-labelledby={`need-tab-${active.id}`}
            className="clay-card overflow-hidden flex flex-col"
          >
            <div className="flex items-center justify-between gap-3 px-5 sm:px-8 py-3 border-b border-[var(--line)] bg-[var(--bg)]/45">
              <span className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                <span className="w-2 h-2 rounded-full bg-[var(--terracotta)]" aria-hidden="true" />
                Project brief
              </span>
              <span className="font-mono text-[11px] text-[var(--muted)] tabular-nums">
                No. {String(activeIndex + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")}
              </span>
            </div>

            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -8 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className="flex-1 flex flex-col px-5 sm:px-8 pt-6 sm:pt-7 pb-6"
              >
                <p className="text-sm text-[var(--muted)]">
                  You want to <span className="font-medium text-[var(--ink)]">{active.chipLabel.toLowerCase()}</span>. We&apos;d build:
                </p>
                <h3 className="mt-2 font-serif text-2xl sm:text-3xl text-[var(--ink)] tracking-tight leading-tight">
                  {active.title}
                </h3>
                <p className="mt-3 text-base text-[var(--muted)] leading-relaxed max-w-2xl">{active.description}</p>

                <h4 className="mt-7 mb-3 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">
                  Usually included
                </h4>
                <ol className="grid grid-cols-1 sm:grid-cols-2 gap-px rounded-xl overflow-hidden border border-[var(--line)] bg-[var(--line)]">
                  {active.included.map((bullet, idx) => (
                    <li key={bullet} className="flex items-start gap-3 p-3.5 sm:p-4 bg-[var(--surface)]">
                      <span className="w-6 h-6 shrink-0 rounded-md bg-[var(--sage)]/25 text-[#5E7356] flex items-center justify-center">
                        <Check className="w-3.5 h-3.5" strokeWidth={2.25} aria-hidden="true" />
                      </span>
                      <span className="text-sm text-[var(--ink)] leading-snug">
                        <span className="sr-only">{idx + 1}. </span>
                        {bullet}
                      </span>
                    </li>
                  ))}
                </ol>

                <div className="mt-7">
                  <TimelineBar timeline={active.timeline} />
                </div>

                <div className="mt-auto pt-7">
                  <div className="pt-5 border-t border-[var(--line)] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <p className="text-xs text-[var(--muted)] max-w-sm">
                      A starting point, not a fixed package. We scope every project to your business on a free call.
                    </p>
                    <button
                      type="button"
                      onClick={() => handleDiscussClick(active.servicePrefill)}
                      className="btn-primary w-full sm:w-auto shrink-0 text-sm py-2.5 px-6 font-medium cursor-pointer"
                    >
                      <span>Talk to us about this</span>
                      <ArrowRight className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
