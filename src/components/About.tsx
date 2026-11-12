"use client";

import React from "react";
import { siteConfig } from "@/content/site";
import { ClayCard } from "./ClayCard";
import { Mail, MapPin } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function About() {
  const shouldReduceMotion = useReducedMotion();
  const { brand, about } = siteConfig;

  return (
    <section id="about" className="py-24 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      <motion.div
        initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <ClayCard className="p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            <div className="md:col-span-7 flex flex-col">
              <p className="flex items-center gap-3 text-sm font-medium text-[var(--terracotta)] mb-3">
                <span className="h-px w-8 bg-[var(--terracotta)]" aria-hidden="true" />
                {about.title}
              </p>

              <h2 className="font-serif text-2xl sm:text-3xl lg:text-4xl font-normal text-[var(--ink)] tracking-tight leading-tight mb-5">
                {about.headline}
              </h2>

              {about.paragraphs.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 24)}
                  className="text-base text-[var(--muted)] leading-relaxed mb-4 last:mb-0"
                >
                  {paragraph}
                </p>
              ))}
            </div>

            <div className="md:col-span-5 flex flex-col gap-4">
              <div className="rounded-2xl bg-[var(--bg)] border border-[var(--line)] p-5 sm:p-6">
                <div className="flex items-center gap-4">
                  <div
                    className="w-14 h-14 shrink-0 rounded-full bg-[var(--ink)] text-[var(--surface)] flex items-center justify-center font-serif text-lg"
                    aria-hidden="true"
                  >
                    {initials(brand.founder)}
                  </div>
                  <div className="min-w-0">
                    <p className="font-serif font-semibold text-lg text-[var(--ink)] leading-tight">
                      {brand.founder}
                    </p>
                    <p className="text-sm text-[var(--muted)]">
                      {brand.founderRole}, {brand.name}
                    </p>
                  </div>
                </div>

                <ul className="mt-5 pt-5 border-t border-[var(--line)] flex flex-col gap-2.5 text-sm">
                  <li>
                    <a
                      href={`mailto:${brand.email}`}
                      className="inline-flex items-center gap-2 text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors break-all"
                    >
                      <Mail className="w-4 h-4 shrink-0 text-[var(--terracotta)]" strokeWidth={1.5} />
                      {brand.email}
                    </a>
                  </li>
                  <li className="inline-flex items-center gap-2 text-[var(--muted)]">
                    <MapPin className="w-4 h-4 shrink-0 text-[var(--terracotta)]" strokeWidth={1.5} />
                    {brand.location}
                  </li>
                </ul>
              </div>

              <dl className="grid grid-cols-3 gap-3">
                {about.principles.map((item) => (
                  <div
                    key={item.label}
                    className="p-3 rounded-xl bg-[var(--bg)]/50 border border-[var(--line)]/60 text-center flex flex-col-reverse"
                  >
                    <dt className="text-[11px] leading-snug text-[var(--muted)] mt-0.5">
                      {item.label}
                    </dt>
                    <dd className="font-serif font-semibold text-base text-[var(--ink)]">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </ClayCard>
      </motion.div>
    </section>
  );
}
