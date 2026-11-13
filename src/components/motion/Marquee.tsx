"use client";

import React, { useRef } from "react";
import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from "framer-motion";

const wrap = (min: number, max: number, v: number) => {
  const range = max - min;
  return ((((v - min) % range) + range) % range) + min;
};

/** Endless text band whose speed and direction follow the page scroll. */
function Track({ items, baseVelocity, className }: { items: string[]; baseVelocity: number; className: string }) {
  const reduce = useReducedMotion();
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const velocity = useSpring(useVelocity(scrollY), { damping: 50, stiffness: 400 });
  const factor = useTransform(velocity, [0, 1000], [0, 4], { clamp: false });
  const direction = useRef(1);
  const x = useTransform(baseX, (v) => `${wrap(-25, 0, v)}%`);

  useAnimationFrame((_, delta) => {
    if (reduce) return;
    let moveBy = direction.current * baseVelocity * (delta / 1000);
    const f = factor.get();
    if (f < 0) direction.current = -1;
    else if (f > 0) direction.current = 1;
    moveBy += direction.current * moveBy * f;
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div className={`overflow-hidden whitespace-nowrap ${className}`}>
      <motion.div className="flex w-max" style={{ x }}>
        {[0, 1, 2, 3].map((copy) => (
          <span key={copy} className="flex shrink-0 items-center">
            {items.map((item) => (
              <span key={item} className="flex items-center">
                <span className="px-6 sm:px-8">{item}</span>
                <span className="text-[0.55em] opacity-70" aria-hidden="true">
                  ✦
                </span>
              </span>
            ))}
          </span>
        ))}
      </motion.div>
    </div>
  );
}

/** Two crossing tapes of text that mark the switch between sections. */
export function MarqueeBand({ items, secondary }: { items: string[]; secondary: string[] }) {
  return (
    <div className="relative py-16 sm:py-24 select-none" aria-hidden="true">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[2.5deg] bg-[var(--terracotta)]/90 py-3 sm:py-4">
        <Track
          items={secondary}
          baseVelocity={2.2}
          className="font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-[var(--surface)]"
        />
      </div>
      <div className="relative -rotate-[2deg] bg-[var(--ink)] py-4 sm:py-6 shadow-[0_24px_48px_-24px_rgba(31,31,28,0.6)] mx-[-5%]">
        <Track
          items={items}
          baseVelocity={-3}
          className="font-serif italic text-3xl sm:text-5xl lg:text-6xl text-[var(--surface)]"
        />
      </div>
    </div>
  );
}
