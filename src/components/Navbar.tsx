"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/content/site";
import { Menu, X, ArrowUpRight } from "lucide-react";

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#EAE1D2]/95 backdrop-blur-none border-b border-[var(--line)] shadow-[0_2px_8px_rgba(31,31,28,0.04)]"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Brand Name */}
        <a
          href="#"
          className="group flex items-center gap-3 font-semibold text-lg tracking-tight text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)] rounded-lg p-1"
        >
          <div className="w-8 h-8 rounded-lg bg-[var(--surface)] border border-[var(--line)] flex items-center justify-center shadow-[inset_0_1px_0_rgba(255,255,255,0.9),0_2px_4px_rgba(31,31,28,0.06)] group-hover:scale-105 transition-transform">
            <span className="font-serif font-bold text-sm text-[var(--terracotta)]">F</span>
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-base leading-tight font-semibold tracking-normal text-[var(--ink)]">
              {siteConfig.brand.name}
            </span>
            <span className="text-[11px] font-mono tracking-wider uppercase text-[var(--muted)]">
              Web & App Studio
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-1 lg:gap-2">
          {siteConfig.navigation.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="px-3.5 py-2 text-sm font-medium text-[var(--ink)] hover:text-[var(--terracotta)] rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)]"
            >
              {item.label}
            </a>
          ))}
        </nav>

        {/* Right CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="#contact"
            className="btn-primary text-sm py-2.5 px-5 font-medium"
          >
            <span>Book a free call</span>
            <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
          </a>
        </div>

        {/* Mobile menu button */}
        <div className="flex md:hidden items-center">
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
            className="p-2 rounded-xl border border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] hover:bg-[var(--line)]/30 focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)]"
          >
            {mobileMenuOpen ? (
              <X className="w-5 h-5" strokeWidth={1.5} />
            ) : (
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--surface)] border-b border-[var(--line)] px-4 pt-2 pb-6 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
          <nav className="flex flex-col gap-1.5 pt-2">
            {siteConfig.navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-base font-medium text-[var(--ink)] hover:bg-[var(--bg)]/60 rounded-xl transition-colors"
              >
                {item.label}
              </a>
            ))}
            <div className="pt-3 border-t border-[var(--line)]/60">
              <a
                href="#contact"
                onClick={() => setMobileMenuOpen(false)}
                className="btn-primary w-full py-3 justify-center text-sm font-medium"
              >
                <span>Book a free call</span>
                <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
