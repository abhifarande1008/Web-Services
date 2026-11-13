"use client";

import React from "react";
import { motion, type Variants } from "framer-motion";

export const EASE = [0.22, 1, 0.36, 1] as const;

const VIEWPORT = { once: true, margin: "0px 0px -12% 0px" } as const;

type MotionDivProps = React.ComponentProps<typeof motion.div>;

/** Fades and lifts its content into place the first time it scrolls into view. */
export function Reveal({
  children,
  delay = 0,
  y = 28,
  blur = false,
  ...rest
}: MotionDivProps & { delay?: number; y?: number; blur?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y, ...(blur ? { filter: "blur(10px)" } : {}) }}
      whileInView={{ opacity: 1, y: 0, ...(blur ? { filter: "blur(0px)" } : {}) }}
      viewport={VIEWPORT}
      transition={{ duration: 0.9, ease: EASE, delay }}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

const tags = {
  div: motion.div,
  ul: motion.ul,
  ol: motion.ol,
  dl: motion.dl,
} as const;

/** Parent that reveals its `StaggerItem` children one after another. */
export function Stagger({
  as = "div",
  stagger = 0.08,
  delay = 0,
  children,
  ...rest
}: MotionDivProps & { as?: keyof typeof tags; stagger?: number; delay?: number }) {
  const Comp = tags[as] as unknown as typeof motion.div;
  const variants: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  };
  return (
    <Comp variants={variants} initial="hidden" whileInView="show" viewport={VIEWPORT} {...rest}>
      {children}
    </Comp>
  );
}

const itemTags = {
  div: motion.div,
  li: motion.li,
  span: motion.span,
} as const;

export function StaggerItem({
  as = "div",
  y = 24,
  x = 0,
  children,
  ...rest
}: MotionDivProps & { as?: keyof typeof itemTags; y?: number; x?: number }) {
  const Comp = itemTags[as] as unknown as typeof motion.div;
  const variants: Variants = {
    hidden: { opacity: 0, y, x },
    show: { opacity: 1, y: 0, x: 0, transition: { duration: 0.8, ease: EASE } },
  };
  return (
    <Comp variants={variants} {...rest}>
      {children}
    </Comp>
  );
}

/** Headline that rises word by word from behind a mask. Screen readers get the plain text. */
export function SplitText({ text, delay = 0, className = "" }: { text: string; delay?: number; className?: string }) {
  const words = text.split(" ");
  return (
    <>
      <span className="sr-only">{text}</span>
      <motion.span
        aria-hidden="true"
        className={className}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        variants={{ hidden: {}, show: { transition: { staggerChildren: 0.06, delayChildren: delay } } }}
      >
        {words.map((word, i) => (
          <span key={i} className="inline-block overflow-hidden align-bottom pb-[0.14em] -mb-[0.14em]">
            <motion.span
              className="inline-block will-change-transform"
              variants={{
                hidden: { y: "110%", rotate: 4 },
                show: { y: "0%", rotate: 0, transition: { duration: 0.95, ease: EASE } },
              }}
            >
              {word}
            </motion.span>
            {i < words.length - 1 && "\u00A0"}
          </span>
        ))}
      </motion.span>
    </>
  );
}

/** A bar or rule that draws itself from the left when it scrolls into view. */
export function GrowX({
  delay = 0,
  duration = 1.1,
  style,
  ...rest
}: React.ComponentProps<typeof motion.span> & { delay?: number; duration?: number }) {
  return (
    <motion.span
      initial={{ scaleX: 0 }}
      whileInView={{ scaleX: 1 }}
      viewport={VIEWPORT}
      transition={{ duration, ease: EASE, delay }}
      style={{ originX: 0, ...style }}
      {...rest}
    />
  );
}
