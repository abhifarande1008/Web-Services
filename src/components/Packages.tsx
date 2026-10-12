"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { ClayCard } from "./ClayCard";
import { MotifDots } from "./MockUI";
import { Check, ArrowRight, Sparkles } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export function Packages() {
  const shouldReduceMotion = useReducedMotion();

  const handleSelectPackage = (servicePrefill: string) => {
    if (typeof window !== "undefined") {
      window.dispatchEvent(
        new CustomEvent("prefill-service", { detail: servicePrefill })
      );
      const contactSection = document.getElementById("contact");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] text-xs font-mono uppercase tracking-wider text-[var(--terracotta)] mb-4">
          Transparent Scope
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--ink)] tracking-tight">
          Packages & engagement
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--muted)]">
          Predictable flat-fee packages. No unexpected hourly bills, no bloated retainers.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {siteConfig.packages.map((pkg, idx) => {
          const isHighlighted = pkg.isPopular;

          return (
            <motion.div
              key={pkg.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.1, ease: "easeOut" }}
            >
              <ClayCard
                className={`p-6 sm:p-7 flex flex-col justify-between h-full ${
                  isHighlighted ? "ring-1 ring-[var(--terracotta)]/40" : ""
                }`}
                enableTilt={true}
                highlightTop={isHighlighted}
              >
                <div>
                  {/* Top Bar */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-mono uppercase tracking-wider text-[var(--muted)]">
                      {pkg.timeline}
                    </span>
                    <MotifDots />
                  </div>

                  {isHighlighted && (
                    <div className="mb-2">
                      <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[var(--terracotta)]/10 text-[var(--terracotta)] text-[11px] font-mono font-medium">
                        Flagship Architecture
                      </span>
                    </div>
                  )}

                  <h3 className="font-serif text-2xl font-semibold text-[var(--ink)] mb-2">
                    {pkg.name}
                  </h3>

                  {/* Price */}
                  <div className="flex items-baseline gap-1 my-4">
                    <span className="font-serif text-3xl font-bold text-[var(--ink)]">
                      {pkg.price}
                    </span>
                    <span className="text-xs text-[var(--muted)]">/ project</span>
                  </div>

                  <p className="text-xs text-[var(--muted)] leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  {/* 5 Features */}
                  <div className="pt-4 border-t border-[var(--line)]">
                    <span className="text-[11px] font-mono uppercase tracking-wider text-[var(--ink)] font-semibold block mb-3">
                      Included in this package:
                    </span>
                    <ul className="flex flex-col gap-2.5">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-xs text-[var(--ink)] leading-snug">
                          <Check className="w-3.5 h-3.5 text-[var(--sage)] shrink-0 mt-0.5" strokeWidth={2} />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Button */}
                <div className="mt-8 pt-4 border-t border-[var(--line)]">
                  <button
                    type="button"
                    onClick={() => handleSelectPackage(pkg.servicePrefill)}
                    className={`w-full text-xs py-3 px-4 font-medium justify-center cursor-pointer ${
                      isHighlighted ? "btn-primary" : "btn-secondary"
                    }`}
                  >
                    <span>{pkg.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5" strokeWidth={1.5} />
                  </button>
                </div>
              </ClayCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
