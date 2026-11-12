import React from "react";
import { siteConfig } from "@/content/site";
import { ArrowUp, Mail, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[var(--line)] bg-[var(--surface)] text-[var(--ink)] pt-16 pb-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[var(--line)]">
          {/* Brand info */}
          <div className="sm:col-span-2 flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-9 h-9 shrink-0 rounded-lg bg-[var(--ink)] flex items-center justify-center">
                <span className="font-serif font-semibold text-base text-[var(--surface)]">
                  {siteConfig.brand.monogram}
                </span>
              </div>
              <span className="font-serif text-xl font-semibold text-[var(--ink)]">
                {siteConfig.brand.name}
              </span>
            </div>
            <p className="text-sm text-[var(--muted)] max-w-sm leading-relaxed mb-6">
              {siteConfig.brand.tagline}
            </p>
            <ul className="flex flex-col gap-2.5 text-sm">
              <li>
                <a
                  href={`mailto:${siteConfig.brand.email}`}
                  className="inline-flex items-center gap-2 text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors break-all"
                >
                  <Mail className="w-4 h-4 shrink-0 text-[var(--terracotta)]" strokeWidth={1.5} />
                  {siteConfig.brand.email}
                </a>
              </li>
              <li className="inline-flex items-center gap-2 text-[var(--muted)]">
                <MapPin className="w-4 h-4 shrink-0 text-[var(--terracotta)]" strokeWidth={1.5} />
                {siteConfig.brand.location}
              </li>
            </ul>
          </div>

          {/* Navigation Columns */}
          {siteConfig.footer.columns.map((col) => (
            <div key={col.title} className="flex flex-col gap-3">
              <span className="text-sm font-semibold text-[var(--ink)] mb-1">{col.title}</span>
              <ul className="flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-[var(--muted)] hover:text-[var(--terracotta)] transition-colors break-all"
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
