import React from "react";
import { siteConfig } from "@/content/site";
import { ArrowUp, GitBranch, Globe, Share2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] pt-16 pb-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-16 border-b border-[var(--line)]">
          {/* Brand info */}
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center shadow-sm">
                  <span className="font-serif font-bold text-sm text-[var(--terracotta)]">F</span>
                </div>
                <span className="font-serif text-xl font-semibold text-[var(--ink)]">
                  {siteConfig.brand.name}
                </span>
              </div>
              <p className="text-sm text-[var(--muted)] max-w-sm leading-relaxed mb-6">
                &ldquo;{siteConfig.brand.tagline}&rdquo;
              </p>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[var(--bg)] border border-[var(--line)] text-xs text-[var(--ink)]">
                <span className="w-2 h-2 rounded-full bg-[var(--sage)]" />
                <span>{siteConfig.brand.availability}</span>
              </div>
            </div>

            <div className="mt-8 flex items-center gap-3">
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub code repository"
                className="w-9 h-9 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors"
              >
                <GitBranch className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Professional network"
                className="w-9 h-9 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors"
              >
                <Globe className="w-4 h-4" strokeWidth={1.5} />
              </a>
              <a
                href="https://x.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Social updates"
                className="w-9 h-9 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors"
              >
                <Share2 className="w-4 h-4" strokeWidth={1.5} />
              </a>
            </div>
          </div>

          {/* Navigation Columns */}
          {siteConfig.footer.columns.map((col, idx) => (
            <div key={idx} className="flex flex-col gap-3">
              <span className="text-xs font-mono uppercase tracking-wider text-[var(--ink)] font-semibold mb-1">
                {col.title}
              </span>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <a
                      href={link.href}
                      className="text-xs text-[var(--muted)] hover:text-[var(--terracotta)] transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--muted)]">
          <p>{siteConfig.footer.copyright}</p>
          <a
            href="#"
            className="flex items-center gap-1.5 text-xs text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" strokeWidth={1.5} />
          </a>
        </div>
      </div>
    </footer>
  );
}
