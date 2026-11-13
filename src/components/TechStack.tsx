"use client";

import React from "react";
import { motion } from "framer-motion";
import { siteConfig } from "@/content/site";
import { Stagger, StaggerItem } from "./motion/Reveal";
import { Tilt } from "./motion/Tilt";
import { SectionHeading } from "./SectionHeading";
import { Workbench } from "./ui/Workbench";

const points = [
  { title: "Mainstream tools", text: "Widely used and well documented, so hiring help later is easy." },
  { title: "Readable code", text: "Typed, organised and handed over with notes on how it fits together." },
  { title: "No lock-in", text: "Hosted on accounts you own. Move or extend it whenever you like." },
];

function key(name: string) {
  return name
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+(.)?/g, (_, c: string | undefined) => (c ? c.toUpperCase() : ""));
}

export function TechStack() {
  const items = siteConfig.techStack;

  const lines: React.ReactNode[] = [
    <span key="open" className="text-[#D8D2C6]">{"{"}</span>,
    <span key="stack">
      <span className="pl-4 text-[#E8A27F]">&quot;stack&quot;</span>
      <span className="text-[#D8D2C6]">: {"{"}</span>
    </span>,
    ...items.map((tech, i) => (
      <span key={tech.name}>
        <span className="pl-8 text-[#E8A27F]">&quot;{key(tech.category)}&quot;</span>
        <span className="text-[#D8D2C6]">: </span>
        <span className="text-[#B9C9AF]">&quot;{tech.name}&quot;</span>
        <span className="text-[#D8D2C6]">{i < items.length - 1 ? "," : ""}</span>
      </span>
    )),
    <span key="close-stack" className="pl-4 text-[#D8D2C6]">{"},"}</span>,
    <span key="owner">
      <span className="pl-4 text-[#E8A27F]">&quot;owner&quot;</span>
      <span className="text-[#D8D2C6]">: </span>
      <span className="text-[#B9C9AF]">&quot;you&quot;</span>
      <span className="text-[#D8D2C6]">,</span>
    </span>,
    <span key="lock">
      <span className="pl-4 text-[#E8A27F]">&quot;lockIn&quot;</span>
      <span className="text-[#D8D2C6]">: </span>
      <span className="text-[#9DB8D9]">false</span>
    </span>,
    <span key="close" className="text-[#D8D2C6]">{"}"}</span>,
  ];

  return (
    <section id="tech-stack" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Technology"
        title="What we build with"
        intro="Widely used, well-supported tools, so any good developer can pick up the code later if they need to."
      />

      <Workbench>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.5fr)] gap-6 lg:gap-10 items-center">
          <Stagger
            as="ul"
            stagger={0.12}
            delay={0.3}
            className="flex flex-col gap-px rounded-2xl overflow-hidden border border-[var(--line)] bg-[var(--line)] order-2 lg:order-1"
          >
            {points.map((p, i) => (
              <StaggerItem as="li" key={p.title} y={0} x={-24} className="bg-[var(--surface)] p-5 grid grid-cols-[2rem_1fr] gap-2">
                <span className="font-mono text-xs text-[var(--terracotta)] pt-0.5">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="font-sans text-sm font-semibold text-[var(--ink)]">{p.title}</h3>
                  <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">{p.text}</p>
                </div>
              </StaggerItem>
            ))}
          </Stagger>

          <Tilt max={4} className="order-1 lg:order-2 min-w-0">
          <div className="rounded-2xl overflow-hidden bg-[#1F1F1C] border border-black/40 shadow-[0_24px_48px_-20px_rgba(31,31,28,0.55)]">
            <div className="flex items-center gap-2 px-4 h-10 border-b border-white/10 bg-[#262622]">
              <span className="flex gap-1.5" aria-hidden="true">
                <span className="w-2.5 h-2.5 rounded-full bg-[#E36A5C]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#E3B45C]/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-[#7FB069]/80" />
              </span>
              <span className="ml-3 px-3 py-1 rounded-t-md bg-[#1F1F1C] text-[11px] font-mono text-[#D8D2C6] border border-b-0 border-white/10 -mb-[9px]">
                stack.json
              </span>
              <span className="ml-auto hidden sm:inline-flex items-center gap-2 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-[#B9C9AF]">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--sage)]" aria-hidden="true" />
                Read only
              </span>
            </div>

            <ul className="sr-only">
              {items.map((t) => (
                <li key={t.name}>
                  {t.name}: {t.category}
                </li>
              ))}
            </ul>
            <pre className="overflow-x-auto py-4 text-[12.5px] sm:text-[13px] leading-6 font-mono" aria-hidden="true">
              <motion.code
                className="grid grid-cols-[2.75rem_1fr]"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, margin: "0px 0px -15% 0px" }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.05, delayChildren: 0.5 } } }}
              >
                {lines.map((line, i) => (
                  <React.Fragment key={i}>
                    <motion.span
                      className="select-none text-right pr-4 text-[#5F5B53]"
                      variants={{ hidden: { opacity: 0 }, show: { opacity: 1, transition: { duration: 0.2 } } }}
                    >
                      {i + 1}
                    </motion.span>
                    <motion.span
                      className="whitespace-pre pr-4"
                      variants={{
                        hidden: { opacity: 0, clipPath: "inset(0 100% 0 0)" },
                        show: { opacity: 1, clipPath: "inset(0 0% 0 0)", transition: { duration: 0.35, ease: "easeOut" } },
                      }}
                    >
                      {line}
                      {i === lines.length - 1 && (
                        <span className="caret-blink inline-block w-[7px] h-[1.1em] ml-1 align-[-0.2em] bg-[#E8A27F]" />
                      )}
                    </motion.span>
                  </React.Fragment>
                ))}
              </motion.code>
            </pre>

            <div className="flex items-center justify-between px-4 h-7 bg-[var(--terracotta)] text-[var(--surface)] font-mono text-[10.5px]">
              <span>main</span>
              <span>JSON · UTF-8</span>
            </div>
          </div>
          </Tilt>
        </div>
      </Workbench>
    </section>
  );
}
