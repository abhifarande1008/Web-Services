"use client";

import React, { useState, useEffect, useRef } from "react";
import { siteConfig } from "@/content/site";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { motion, AnimatePresence, useScroll, useSpring, useMotionValueEvent } from "framer-motion";
import { Magnetic } from "./motion/Magnetic";
import { EASE } from "./motion/Reveal";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const lastY = useRef(0);

  const { scrollY, scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.3 });

  useMotionValueEvent(scrollY, "change", (y) => {
    setIsScrolled(y > 40);
    const goingDown = y > lastY.current;
    // Tuck the bar away while reading downwards; bring it back on any upward scroll.
    if (Math.abs(y - lastY.current) > 6) setHidden(goingDown && y > 640);
    lastY.current = y;
  });

  // Highlight the navigation item for the section in the middle of the screen.
  useEffect(() => {
    const ids = siteConfig.navigation.map((n) => n.href.replace("#", ""));
    const sections = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const href = `#${entry.target.id}`;
          if (entry.isIntersecting) setActive(href);
          else setActive((current) => (current === href ? null : current));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [mobileMenuOpen]);

  return (
    <motion.header
      animate={{ y: hidden && !mobileMenuOpen ? "-100%" : "0%" }}
      transition={{ duration: 0.45, ease: EASE }}
      className={`fixed top-0 left-0 right-0 z-50 transition-[background-color,border-color,box-shadow] duration-300 ${
        isScrolled
          ? "bg-[#EAE1D2]/95 border-b border-[var(--line)] shadow-[0_2px_8px_rgba(31,31,28,0.04)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-6">
        {/* Brand Name */}
        <a
          href="#"
          className="group flex items-center gap-3 min-w-0 font-semibold text-lg tracking-tight text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)] rounded-lg p-1"
        >
          <div className="w-9 h-9 shrink-0 rounded-lg bg-[var(--ink)] flex items-center justify-center transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:rotate-[-8deg] group-hover:scale-105">
            <span className="font-serif font-semibold text-base text-[var(--surface)]">
              {siteConfig.brand.monogram}
            </span>
          </div>
          <div className="flex flex-col min-w-0">
            <span className="font-serif text-[0.9375rem] sm:text-base leading-tight font-semibold tracking-normal text-[var(--ink)] truncate">
              {siteConfig.brand.name}
            </span>
            <span className="text-xs text-[var(--muted)] truncate">
              {siteConfig.brand.descriptor}
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {siteConfig.navigation.map((item) => {
            const isActive = active === item.href;
            return (
              <a
                key={item.href}
                href={item.href}
                aria-current={isActive ? "true" : undefined}
                className={`relative px-2.5 xl:px-3.5 py-2 text-sm font-medium rounded-lg transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--terracotta)] ${
                  isActive ? "text-[var(--ink)]" : "text-[var(--ink)]/75 hover:text-[var(--terracotta)]"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active"
                    className="absolute inset-0 rounded-lg bg-[var(--surface)] border border-[var(--line)] shadow-[0_1px_2px_rgba(31,31,28,0.06)]"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    aria-hidden="true"
                  />
                )}
                <span className="relative">{item.label}</span>
              </a>
            );
          })}
        </nav>

        {/* Right CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <Magnetic strength={0.25}>
            <a
              href="#contact"
              className="btn-primary text-sm py-2.5 px-4 xl:px-5 font-medium whitespace-nowrap group"
            >
              <span>Book a free call</span>
              <ArrowUpRight
                className="w-4 h-4 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                strokeWidth={1.5}
              />
            </a>
          </Magnetic>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--line)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)]"
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.span
                key={mobileMenuOpen ? "close" : "open"}
                className="block"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
                transition={{ duration: 0.2 }}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" strokeWidth={1.5} />
                ) : (
                  <Menu className="w-5 h-5" strokeWidth={1.5} />
                )}
              </motion.span>
            </AnimatePresence>
          </button>
        </div>
      </div>

      {/* Reading progress */}
      <motion.span
        className="absolute left-0 right-0 bottom-0 h-[0.125rem] bg-[var(--terracotta)] origin-left"
        style={{ scaleX: progress, opacity: isScrolled ? 1 : 0 }}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="lg:hidden overflow-hidden bg-[var(--surface)] border-b border-[var(--line)] shadow-lg"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.4, ease: EASE }}
          >
            <motion.nav
              className="flex flex-col gap-1.5 px-4 pt-4 pb-6"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.04, delayChildren: 0.08 } } }}
            >
              {siteConfig.navigation.map((item) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  variants={{ hidden: { opacity: 0, x: -16 }, show: { opacity: 1, x: 0 } }}
                  className={`px-4 py-3 text-base font-medium rounded-xl transition-colors ${
                    active === item.href
                      ? "bg-[var(--bg)] text-[var(--ink)]"
                      : "text-[var(--ink)] hover:bg-[var(--bg)]/60"
                  }`}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.div
                className="pt-3 border-t border-[var(--line)]/60"
                variants={{ hidden: { opacity: 0, y: 10 }, show: { opacity: 1, y: 0 } }}
              >
                <a
                  href="#contact"
                  onClick={() => setMobileMenuOpen(false)}
                  className="btn-primary w-full py-3 justify-center text-sm font-medium"
                >
                  <span>Book a free call</span>
                  <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
                </a>
              </motion.div>
            </motion.nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
