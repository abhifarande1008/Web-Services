"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { siteConfig } from "@/content/site";
import { ArrowUp, ArrowRight, Mail, MapPin } from "lucide-react";
import { SplitText, Stagger, StaggerItem } from "./motion/Reveal";
import { Magnetic } from "./motion/Magnetic";

export function Footer() {
  const { brand, footer } = siteConfig;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end end"] });
  const watermarkX = useTransform(scrollYProgress, [0, 1], ["-58%", "-50%"]);
  const watermarkOpacity = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <footer ref={ref} className="footer-reveal relative overflow-hidden bg-[var(--ink)] text-[var(--surface)] px-4 sm:px-6 lg:px-8 pt-20 pb-10">
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Closing call to action */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 pb-14 border-b border-white/10">
          <div>
            <p className="flex items-center gap-2 font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--sage)]">
              <span className="w-2 h-2 rounded-full bg-[var(--sage)]" aria-hidden="true" />
              {brand.availability}
            </p>
            <p className="mt-4 font-serif text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight max-w-3xl">
              <SplitText text="Have something you'd like to build?" />
            </p>
          </div>
          <Magnetic strength={0.35} className="self-start lg:self-auto">
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 rounded-full bg-[var(--terracotta)] text-[var(--surface)] pl-6 pr-2 py-2 text-sm font-medium hover:bg-[#B5582F] transition-colors"
            >
              Start a conversation
              <span className="w-9 h-9 rounded-full bg-[var(--surface)] text-[var(--ink)] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[-45deg]">
                <ArrowRight className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
              </span>
            </a>
          </Magnetic>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 py-14">
          <div className="sm:col-span-2 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <span className="w-9 h-9 shrink-0 rounded-lg bg-[var(--surface)] text-[var(--ink)] flex items-center justify-center font-serif text-base" aria-hidden="true">
                {brand.monogram}
              </span>
              <span className="font-serif text-xl">{brand.name}</span>
            </div>
            <p className="text-sm text-[var(--surface)]/60 max-w-sm leading-relaxed mb-6">{brand.tagline}</p>
            <ul className="flex flex-col gap-2.5 text-sm">
              {brand.email && (
                <li>
                  <a
                    href={`mailto:${brand.email}`}
                    className="inline-flex items-center gap-2 text-[var(--surface)]/90 hover:text-[#E8A27F] transition-colors break-all"
                  >
                    <Mail className="w-4 h-4 shrink-0 text-[#E8A27F]" strokeWidth={1.5} aria-hidden="true" />
                    {brand.email}
                  </a>
                </li>
              )}
              <li className="inline-flex items-center gap-2 text-[var(--surface)]/60">
                <MapPin className="w-4 h-4 shrink-0 text-[#E8A27F]" strokeWidth={1.5} aria-hidden="true" />
                {brand.location}
              </li>
            </ul>
          </div>

          {footer.columns.map((col) => (
            <nav key={col.title} aria-label={col.title} className="flex flex-col gap-3">
              <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.14em] text-[var(--surface)]/45 mb-1">
                {col.title}
              </span>
              <Stagger as="ul" stagger={0.05} className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <StaggerItem as="li" key={link.label} y={10}>
                    <a
                      href={link.href}
                      {...(link.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="footer-link text-sm text-[var(--surface)]/80 hover:text-[#E8A27F] transition-colors break-all"
                    >
                      {link.label}
                    </a>
                  </StaggerItem>
                ))}
              </Stagger>
            </nav>
          ))}
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--surface)]/50">
          <p>{footer.copyright}</p>
          <a
            href="#main"
            className="flex items-center gap-1.5 text-[var(--surface)]/80 hover:text-[#E8A27F] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" strokeWidth={1.5} aria-hidden="true" />
          </a>
        </div>
      </div>

      <motion.p
        className="pointer-events-none select-none absolute left-1/2 -bottom-[0.22em] font-serif text-[22vw] lg:text-[17rem] leading-none text-white/[0.035] whitespace-nowrap"
        style={{ x: watermarkX, opacity: watermarkOpacity }}
        aria-hidden="true"
      >
        {brand.shortName}
      </motion.p>
    </footer>
  );
}
