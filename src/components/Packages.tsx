"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { Workbench } from "./ui/Workbench";
import { Stagger, StaggerItem } from "./motion/Reveal";
import { scrollToSection } from "@/lib/scroll";
import { Check, ArrowRight, FileSignature, Wallet, KeyRound } from "lucide-react";

const terms = [
  { icon: FileSignature, title: "Fixed quote first", text: "Agreed scope and price in writing before any work starts." },
  { icon: Wallet, title: "Pay in three parts", text: "40% to start, 30% on the approved test version, 30% at launch." },
  { icon: KeyRound, title: "Yours to keep", text: "Code, database, domain and hosting accounts in your name." },
];

export function Packages() {
  const handleSelectPackage = (servicePrefill: string) => {
    window.dispatchEvent(new CustomEvent("prefill-service", { detail: servicePrefill }));
    scrollToSection("contact");
  };

  return (
    <section id="pricing" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Pricing"
        title="Ways to work with us"
        intro="Every project gets a fixed quote after a short call, so you know the full cost before anything starts."
      />

      <Workbench>
        <div className="clay-card overflow-hidden">
          <Stagger stagger={0.1} delay={0.25} className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-px bg-[var(--line)]">
            {siteConfig.packages.map((pkg, i) => {
              const dark = pkg.isPopular;
              return (
                <StaggerItem
                  key={pkg.id}
                  y={40}
                  className={`group/plan relative flex flex-col p-6 sm:p-7 ${
                    dark ? "bg-[var(--ink)] text-[var(--surface)]" : "bg-[var(--surface)] text-[var(--ink)]"
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className={`font-mono text-xs tabular-nums ${dark ? "text-[#E8A27F]" : "text-[var(--terracotta)]"}`}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {dark ? (
                      <span className="relative overflow-hidden px-2.5 py-0.5 rounded-full bg-[var(--terracotta)] text-[var(--surface)] text-[11px] font-medium">
                        Most asked about
                        <span className="badge-shine" aria-hidden="true" />
                      </span>
                    ) : (
                      <span className="h-[22px]" aria-hidden="true" />
                    )}
                  </div>

                  <h3 className={`mt-4 font-serif text-2xl tracking-tight ${dark ? "text-[var(--surface)]" : "text-[var(--ink)]"}`}>
                    {pkg.name}
                  </h3>
                  <p className={`mt-2 text-sm leading-relaxed min-h-[3.75rem] ${dark ? "text-[var(--surface)]/70" : "text-[var(--muted)]"}`}>
                    {pkg.description}
                  </p>

                  <dl
                    className={`mt-5 grid gap-px rounded-lg overflow-hidden border ${pkg.price ? "grid-cols-2" : "grid-cols-1"} ${
                      dark ? "border-white/10 bg-white/10" : "border-[var(--line)] bg-[var(--line)]"
                    }`}
                  >
                    {[["Timeline", pkg.timeline], ...(pkg.price ? [["Price", pkg.price]] : [])].map(([k, v]) => (
                      <div key={k} className={`px-3 py-2.5 ${dark ? "bg-[#2A2A26]" : "bg-[var(--bg)]/50"}`}>
                        <dt className={`font-sans text-[10px] font-semibold uppercase tracking-[0.14em] ${dark ? "text-[var(--surface)]/55" : "text-[var(--muted)]"}`}>
                          {k}
                        </dt>
                        <dd className="mt-0.5 text-sm font-medium">{v}</dd>
                      </div>
                    ))}
                  </dl>

                  <ul className="mt-6 flex flex-col gap-2.5 flex-1">
                    {pkg.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5 text-sm leading-snug">
                        <Check
                          className={`w-4 h-4 mt-px shrink-0 ${dark ? "text-[var(--sage)]" : "text-[#5E7356]"}`}
                          strokeWidth={2.25}
                          aria-hidden="true"
                        />
                        <span className={dark ? "text-[var(--surface)]/90" : "text-[var(--ink)]"}>{feat}</span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => handleSelectPackage(pkg.servicePrefill)}
                    className={`mt-8 w-full text-sm py-3 px-4 font-medium justify-center cursor-pointer ${
                      dark ? "btn-primary" : "btn-secondary"
                    }`}
                  >
                    <span>{pkg.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover/plan:translate-x-1" strokeWidth={1.5} />
                  </button>
                </StaggerItem>
              );
            })}
          </Stagger>
        </div>

        <Stagger as="ul" stagger={0.1} className="mt-4 sm:mt-6 grid grid-cols-1 md:grid-cols-3 gap-3">
          {terms.map(({ icon: Icon, title, text }) => (
            <StaggerItem as="li" key={title} y={16} className="flex items-start gap-3 rounded-xl bg-[var(--surface)]/80 border border-[var(--line)] p-4">
              <span className="w-9 h-9 shrink-0 rounded-lg bg-[var(--terracotta)]/10 text-[var(--terracotta)] flex items-center justify-center">
                <Icon className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              </span>
              <div>
                <p className="text-sm font-semibold text-[var(--ink)]">{title}</p>
                <p className="mt-0.5 text-xs text-[var(--muted)] leading-relaxed">{text}</p>
              </div>
            </StaggerItem>
          ))}
        </Stagger>
      </Workbench>
    </section>
  );
}
