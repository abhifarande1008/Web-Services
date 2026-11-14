"use client";

import React from "react";
import { Lock } from "lucide-react";
import { motion } from "framer-motion";
import { EASE } from "../motion/Reveal";

/** The dotted "workbench" surface that section compositions sit on. Rises and unclips into view. */
export function Workbench({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`workbench-surface md:p-6 lg:p-8 ${className}`}
      initial={{ opacity: 0, y: 64, clipPath: "inset(8% 4% 0% 4% round 28px)" }}
      whileInView={{
        opacity: 1,
        y: 0,
        clipPath: "inset(0% 0% 0% 0% round 28px)",
        transitionEnd: { clipPath: "none" },
      }}
      viewport={{ once: true, margin: "0px 0px -10% 0px" }}
      transition={{ duration: 1.1, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}

/** Browser/app window chrome. Pass `children` to replace the address pill (e.g. with tabs). */
export function WindowBar({ address, children }: { address?: string; children?: React.ReactNode }) {
  return (
    <div className="hidden md:flex items-center gap-3 px-4 py-3 border-b border-[var(--line)] bg-[var(--bg)]/45">
      <div className="flex gap-1.5 w-12 shrink-0" aria-hidden="true">
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--terracotta)]/70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--sage)]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[var(--line)]" />
      </div>
      {children ?? (
        <>
          <div className="flex-1 flex justify-center min-w-0" aria-hidden="true">
            <div className="flex items-center justify-center gap-1.5 w-full max-w-[15rem] px-3 py-1 rounded-md bg-[var(--surface)] border border-[var(--line)] text-[0.6875rem] text-[var(--muted)]">
              <Lock className="w-3 h-3 shrink-0" strokeWidth={1.75} />
              <span className="truncate">{address}</span>
            </div>
          </div>
          <span className="w-12 shrink-0" aria-hidden="true" />
        </>
      )}
    </div>
  );
}

const dotTone = {
  terracotta: "bg-[var(--terracotta)]",
  sage: "bg-[var(--sage)]",
  ink: "bg-[var(--ink)]",
};

/** Small uppercase label used for panel titles, column headers and metadata. */
export function MiniLabel({
  tone,
  className = "",
  children,
}: {
  tone?: keyof typeof dotTone;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <p
      className={`inline-flex items-center gap-2 font-sans text-[0.6875rem] font-semibold uppercase tracking-[0.14em] text-[var(--muted)] ${className}`}
    >
      {tone && <span className={`w-2 h-2 rounded-full ${dotTone[tone]}`} aria-hidden="true" />}
      {children}
    </p>
  );
}
