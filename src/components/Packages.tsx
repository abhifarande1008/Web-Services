"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { ClayCard } from "./ClayCard";
import { SectionHeading } from "./SectionHeading";
import { Check, ArrowRight } from "lucide-react";
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
      <SectionHeading
        eyebrow="Pricing"
        title="Ways to work with us"
        intro="Every project gets a fixed quote after a short call, so you know the full cost before anything starts."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
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
                highlightTop={isHighlighted}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span className="text-xs text-[var(--muted)]">{pkg.timeline}</span>
                    {isHighlighted && (
                      <span className="px-2.5 py-0.5 rounded-full bg-[var(--terracotta)]/10 text-[var(--terracotta)] text-[11px] font-medium">
                        Most asked about
                      </span>
                    )}
                  </div>

                  <h3 className="font-serif text-2xl font-semibold text-[var(--ink)] mb-2">
                    {pkg.name}
                  </h3>

                  <div className="flex items-baseline gap-1 mt-1 mb-4">
                    {pkg.price ? (
                      <>
                        <span className="font-serif text-3xl font-bold text-[var(--ink)]">
                          {pkg.price}
                        </span>
                        <span className="text-xs text-[var(--muted)]">/ project</span>
                      </>
                    ) : (
                      <span className="text-sm font-medium text-[var(--terracotta)]">
                        Fixed price, quoted after a free call
                      </span>
                    )}
                  </div>

                  <p className="text-sm text-[var(--muted)] leading-relaxed mb-6">
                    {pkg.description}
                  </p>

                  <div className="pt-4 border-t border-[var(--line)]">
                    <span className="text-xs font-semibold text-[var(--ink)] block mb-3">
                      What&apos;s included
                    </span>
                    <ul className="flex flex-col gap-2.5">
                      {pkg.features.map((feat, fIdx) => (
                        <li key={fIdx} className="flex items-start gap-2 text-sm text-[var(--ink)] leading-snug">
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
                    className={`w-full text-sm py-3 px-4 font-medium justify-center cursor-pointer ${
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
