"use client";

import React from "react";
import { siteConfig, ProofPoint } from "@/content/site";
import { ClayCard } from "./ClayCard";
import { MotifDots } from "./MockUI";
import {
  MessageSquare,
  CheckCircle2,
  Shield,
  HeartHandshake,
  Rocket,
  LucideIcon,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

const proofIconMap: Record<string, LucideIcon> = {
  MessageSquare,
  CheckCircle2,
  Shield,
  HeartHandshake,
  Rocket,
};

export function WhyMe() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="why-me" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] text-xs font-mono uppercase tracking-wider text-[var(--terracotta)] mb-4">
          Partnership Advantage
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--ink)] tracking-tight">
          Why work with me
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--muted)]">
          The engineering caliber of a seasoned product team, with the speed, agility, and accountability of a solo partner.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {siteConfig.whyMe.map((item, idx) => {
          const IconComponent = proofIconMap[item.iconName] || CheckCircle2;

          return (
            <motion.div
              key={item.id}
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: idx * 0.08, ease: "easeOut" }}
            >
              <ClayCard className="p-7 h-full flex flex-col justify-between" enableTilt={true}>
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-serif text-2xl font-bold text-[var(--terracotta)]">
                      {item.number}
                    </span>
                    <MotifDots />
                  </div>

                  <div className="w-10 h-10 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--ink)] mb-4">
                    <IconComponent className="w-5 h-5" strokeWidth={1.5} />
                  </div>

                  <h3 className="font-serif text-xl font-semibold text-[var(--ink)] mb-2.5">
                    {item.title}
                  </h3>

                  <p className="text-sm text-[var(--muted)] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </ClayCard>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
