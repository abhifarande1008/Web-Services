"use client";

import React, { useRef, useState } from "react";
import Image from "next/image";
import { siteConfig, CaseStudy } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { Workbench, MiniLabel } from "./ui/Workbench";
import { EASE } from "./motion/Reveal";
import { Lock } from "lucide-react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

const TAB_META: Record<
  CaseStudy["previewType"],
  { tab: string; address: string; image: string; alt: string }
> = {
  crm: {
    tab: "Lead CRM",
    address: "crm.brokerage.in/pipeline",
    image: "/work/crm.jpg",
    alt: "Sales pipeline board with leads sorted into New, Contacted, Site visit and Proposal columns",
  },
  erp: {
    tab: "Stock & billing",
    address: "erp.distributor.in/stock",
    image: "/work/erp.jpg",
    alt: "Inventory dashboard with stock levels for three warehouses, a product stock table and a GST invoice preview",
  },
  landing: {
    tab: "Campaign page",
    address: "offer.studio-interiors.in",
    image: "/work/landing.jpg",
    alt: "Interior design campaign page with a headline, benefits and a free-quote form",
  },
  booking: {
    tab: "Clinic booking",
    address: "book.clinic.in",
    image: "/work/booking.jpg",
    alt: "Clinic booking page with a choice of doctors, a weekly time-slot calendar and a WhatsApp reminder notice",
  },
};

export function SelectedWork() {
  const items = siteConfig.work;
  const [activeIndex, setActiveIndex] = useState(0);
  const shouldReduceMotion = useReducedMotion();
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const active = items[activeIndex];
  const meta = TAB_META[active.previewType];

  const onKeyDown = (e: React.KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
    e.preventDefault();
    const next = (i + (e.key === "ArrowRight" ? 1 : items.length - 1)) % items.length;
    setActiveIndex(next);
    tabRefs.current[next]?.focus();
  };

  const story = [
    { label: "Before", text: active.problem, tone: "bg-[var(--terracotta)]" },
    { label: "What we build", text: active.solution, tone: "bg-[var(--ink)]" },
    { label: "After", text: active.outcome, tone: "bg-[var(--sage)]" },
  ];

  return (
    <section id="work" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Example projects"
        title="The kind of work we do"
        intro="These are sample projects based on common business problems. They show how we approach the work. They are not client case studies."
      />

      <Workbench>
        <div className="clay-card overflow-hidden">
          {/* Browser tabs */}
          <div className="flex items-end gap-1 px-3 pt-2.5 bg-[var(--bg)]/60 border-b border-[var(--line)] overflow-x-auto">
            <div className="hidden sm:flex gap-1.5 pl-1 pr-3 pb-3 self-center" aria-hidden="true">
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--terracotta)]/70" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--sage)]" />
              <span className="w-2.5 h-2.5 rounded-full bg-[var(--line)]" />
            </div>
            <div role="tablist" aria-label="Example projects" className="flex items-end gap-1">
              {items.map((item, i) => {
                const isActive = i === activeIndex;
                return (
                  <button
                    key={item.id}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    type="button"
                    role="tab"
                    id={`work-tab-${item.id}`}
                    aria-selected={isActive}
                    aria-controls="work-panel"
                    tabIndex={isActive ? 0 : -1}
                    onClick={() => setActiveIndex(i)}
                    onKeyDown={(e) => onKeyDown(e, i)}
                    className={`relative -mb-px flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-t-lg text-xs sm:text-sm whitespace-nowrap border transition-colors cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] ${
                      isActive
                        ? "bg-[var(--surface)] border-[var(--line)] border-b-[var(--surface)] text-[var(--ink)] font-medium"
                        : "border-transparent text-[var(--muted)] hover:text-[var(--ink)] hover:bg-[var(--surface)]/50"
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-sm ${isActive ? "bg-[var(--terracotta)]" : "bg-[var(--line)]"}`} aria-hidden="true" />
                    {TAB_META[item.previewType].tab}
                  </button>
                );
              })}
            </div>
          </div>

          <div id="work-panel" role="tabpanel" aria-labelledby={`work-tab-${active.id}`}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={active.id}
                initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={shouldReduceMotion ? { opacity: 1 } : { opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="grid grid-cols-1 lg:grid-cols-[1.15fr_1fr]"
              >
                {/* Screen */}
                <div className="p-4 sm:p-6 lg:border-r border-[var(--line)] bg-[var(--bg)]/30">
                  <div className="flex items-center gap-1.5 px-3 py-1.5 mb-3 rounded-md bg-[var(--surface)] border border-[var(--line)] text-[11px] text-[var(--muted)]" aria-hidden="true">
                    <Lock className="w-3 h-3" strokeWidth={1.75} />
                    <span className="truncate">{meta.address}</span>
                  </div>
                  <div className="group/shot relative aspect-[16/9] rounded-xl bg-[var(--surface)] border border-[var(--line)] overflow-hidden shadow-[0_12px_28px_-16px_rgba(31,31,28,0.35)]">
                    <motion.div
                      className="absolute inset-0"
                      initial={{ scale: 1.08, filter: "blur(6px)" }}
                      animate={{ scale: 1, filter: "blur(0px)" }}
                      transition={{ duration: 0.9, ease: EASE }}
                    >
                      <Image
                        src={meta.image}
                        alt={meta.alt}
                        fill
                        sizes="(min-width: 1024px) 640px, 100vw"
                        className="object-cover object-left-top transition-transform duration-[1.2s] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover/shot:scale-[1.04]"
                      />
                    </motion.div>
                  </div>
                  <p className="mt-2 text-[10px] text-[var(--muted)]">Illustration of the kind of screen we&apos;d build.</p>
                </div>

                {/* Story */}
                <div className="p-5 sm:p-8 flex flex-col">
                  <div className="flex flex-wrap items-center gap-2">
                    <MiniLabel tone="terracotta">{active.industry}</MiniLabel>
                    <span className="ml-auto text-[11px] px-2 py-0.5 rounded-md bg-[var(--bg)] border border-[var(--line)] text-[var(--muted)]">
                      Example project
                    </span>
                  </div>
                  <h3 className="mt-3 font-serif text-2xl sm:text-3xl text-[var(--ink)] tracking-tight leading-tight">{active.title}</h3>

                  <ol className="mt-6 relative flex flex-col gap-5">
                    <span className="absolute left-[5px] top-2 bottom-2 w-px bg-[var(--line)]" aria-hidden="true" />
                    {story.map((s, i) => (
                      <motion.li
                        key={s.label}
                        className="relative pl-6"
                        initial={{ opacity: 0, x: 16 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, ease: EASE, delay: 0.15 + i * 0.1 }}
                      >
                        <span className={`absolute left-0 top-1.5 w-[11px] h-[11px] rounded-full ring-4 ring-[var(--surface)] ${s.tone}`} aria-hidden="true" />
                        <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--muted)]">{s.label}</p>
                        <p className={`mt-1 text-sm leading-relaxed ${s.label === "After" ? "text-[var(--ink)] font-medium" : "text-[var(--muted)]"}`}>{s.text}</p>
                      </motion.li>
                    ))}
                  </ol>

                  <ul className="mt-auto pt-6 flex flex-wrap gap-2">
                    {active.modules.map((m) => (
                      <li key={m} className="px-2.5 py-1 rounded-lg bg-[var(--bg)] border border-[var(--line)] text-xs text-[var(--ink)]">
                        {m}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Workbench>
    </section>
  );
}
