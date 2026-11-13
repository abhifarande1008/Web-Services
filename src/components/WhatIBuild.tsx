import React from "react";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { Workbench, WindowBar, MiniLabel } from "./ui/Workbench";
import { Stagger, StaggerItem } from "./motion/Reveal";
import {
  Zap,
  Target,
  Globe,
  ShoppingBag,
  ShieldCheck,
  Gauge,
  Users,
  Boxes,
  CalendarClock,
  UserCheck,
  Navigation,
  LayoutDashboard,
  Workflow,
  Webhook,
  Smartphone,
  ArrowDown,
  ArrowRight,
  Plus,
  LucideIcon,
} from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Zap,
  Target,
  Globe,
  ShoppingBag,
  ShieldCheck,
  Gauge,
  Users,
  Boxes,
  CalendarClock,
  UserCheck,
  Navigation,
  LayoutDashboard,
  Workflow,
  Webhook,
  Smartphone,
};

const flows = [
  { from: "Enquiry form", to: "CRM lead" },
  { from: "Online order", to: "Stock and invoice" },
  { from: "Booking page", to: "Calendar and reminder" },
];

function WebsitesPanel() {
  const items = siteConfig.services.web;
  return (
    <div className="clay-card overflow-hidden flex flex-col">
      <WindowBar address="yourbusiness.in" />
      <div className="px-5 sm:px-8 pt-6 pb-4 lg:flex lg:items-end lg:justify-between lg:gap-10">
        <div>
          <MiniLabel tone="terracotta">Front of house</MiniLabel>
          <h3 className="mt-2 font-serif text-2xl sm:text-3xl text-[var(--ink)] tracking-tight">Websites</h3>
        </div>
        <p className="mt-1.5 lg:mt-0 lg:max-w-sm text-sm text-[var(--muted)] leading-relaxed">
          What your customers see: pages that explain your business and get people to contact you.
        </p>
      </div>
      <Stagger as="ol" stagger={0.06} delay={0.3} className="px-5 sm:px-8 pb-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 sm:gap-x-8">
        {items.map((service, i) => {
          const Icon = iconMap[service.iconName] || Globe;
          return (
            <StaggerItem
              as="li"
              y={18}
              key={service.id}
              className="group grid grid-cols-[1.5rem_1fr] sm:grid-cols-[2rem_1fr_auto] gap-x-3 py-3.5 sm:py-4 border-t border-[var(--line)]"
            >
              <span className="font-mono text-xs text-[var(--terracotta)] pt-1.5 tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="min-w-0">
                <h4 className="font-serif text-lg text-[var(--ink)] leading-snug">{service.title}</h4>
                <p className="mt-1 text-sm text-[var(--muted)] leading-relaxed">{service.outcome}</p>
              </div>
              <Icon
                className="hidden sm:block w-5 h-5 mt-1 text-[var(--muted)]/70 transition-colors group-hover:text-[var(--terracotta)]"
                strokeWidth={1.5}
                aria-hidden="true"
              />
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}

function SoftwarePanel() {
  const items = siteConfig.services.app;
  return (
    <div className="clay-card overflow-hidden flex flex-col">
      <WindowBar address="app.yourbusiness.in" />
      <div className="flex flex-1 min-h-0">
        {/* Module sidebar, echoing the dashboard the hero animation ends on. */}
        <div className="hidden sm:flex flex-col items-center gap-1.5 w-14 shrink-0 py-4 bg-[var(--ink)]" aria-hidden="true">
          <span className="w-8 h-8 mb-2 rounded-lg bg-[var(--surface)] text-[var(--ink)] font-serif font-semibold text-sm flex items-center justify-center">
            {siteConfig.brand.monogram}
          </span>
          {items.map((service, i) => {
            const Icon = iconMap[service.iconName] || LayoutDashboard;
            return (
              <span
                key={service.id}
                className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                  i === 0 ? "bg-white/12 text-[var(--surface)]" : "text-[var(--surface)]/45"
                }`}
              >
                <Icon className="w-4 h-4" strokeWidth={1.5} />
              </span>
            );
          })}
        </div>

        <div className="flex-1 min-w-0 p-5 sm:p-6">
          <div className="flex items-end justify-between gap-6 mb-5">
            <div className="lg:flex lg:items-end lg:gap-10">
              <div className="shrink-0">
                <MiniLabel tone="sage">Back office</MiniLabel>
                <h3 className="mt-2 font-serif text-2xl sm:text-3xl text-[var(--ink)] tracking-tight">
                  Business software
                </h3>
              </div>
              <p className="mt-1.5 lg:mt-0 lg:max-w-sm text-sm text-[var(--muted)] leading-relaxed">
                What your team uses: tools for sales, stock, billing, bookings and staff.
              </p>
            </div>
            <div className="hidden md:flex items-end gap-1 h-10 shrink-0 pt-1" aria-hidden="true">
              {[40, 65, 50, 80, 60, 95].map((h, i) => (
                <span
                  key={i}
                  className={`w-1.5 rounded-sm ${i === 5 ? "bg-[var(--terracotta)]" : "bg-[var(--sage)]/70"}`}
                  style={{ height: `${h}%` }}
                />
              ))}
            </div>
          </div>

          <Stagger
            as="ul"
            stagger={0.05}
            delay={0.3}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px rounded-xl overflow-hidden border border-[var(--line)] bg-[var(--line)]"
          >
            {items.map((service) => {
              const Icon = iconMap[service.iconName] || LayoutDashboard;
              return (
                <StaggerItem as="li" y={14} key={service.id} className="group flex gap-3 p-3.5 sm:p-4 bg-[var(--surface)]">
                  <span className="w-9 h-9 shrink-0 rounded-lg bg-[var(--sage)]/20 text-[#5E7356] flex items-center justify-center transition-colors group-hover:bg-[var(--sage)]/35">
                    <Icon className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                  </span>
                  <div className="min-w-0">
                    <h4 className="text-sm font-semibold text-[var(--ink)] leading-snug">{service.title}</h4>
                    <p className="mt-1 text-xs text-[var(--muted)] leading-relaxed">{service.outcome}</p>
                  </div>
                </StaggerItem>
              );
            })}
            <StaggerItem as="li" y={14} className="flex md:col-span-1 lg:col-span-full bg-[var(--bg)]">
              <a
                href="#contact"
                className="group flex-1 flex items-center gap-3 p-4 text-sm font-medium text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors"
              >
                <span className="w-9 h-9 shrink-0 rounded-lg border border-dashed border-[var(--muted)]/50 flex items-center justify-center">
                  <Plus className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                </span>
                Need a module that isn&apos;t listed? Tell us.
              </a>
            </StaggerItem>
          </Stagger>
        </div>
      </div>
    </div>
  );
}

function FlowPill({ from, to }: { from: string; to: string }) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2 rounded-xl bg-[var(--surface)] border border-[var(--line)] shadow-[0_2px_6px_rgba(31,31,28,0.05)] px-3 py-2.5 text-xs">
      <span className="inline-flex items-center gap-1.5 text-[var(--ink)] font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--terracotta)]" />
        {from}
      </span>
      <ArrowRight className="w-3.5 h-3.5 text-[var(--muted)] shrink-0" strokeWidth={1.75} aria-hidden="true" />
      <span className="inline-flex items-center gap-1.5 text-[var(--ink)] font-medium">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--sage)]" />
        {to}
      </span>
    </div>
  );
}

export function WhatIBuild() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Services"
        title="Two sides of your business, built to work together"
        intro="Websites bring customers to you. Business software runs what happens next. We build both, and connect them so nothing gets typed in twice."
      />

      <Workbench>
        <WebsitesPanel />

        {/* The link between the two layers: what a customer does on the site lands in the software. */}
        <div className="relative flex flex-col items-center py-5 sm:py-6">
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2 border-l border-dashed border-[var(--muted)]/45"
            aria-hidden="true"
          />
          <p className="relative inline-flex items-center gap-1.5 mb-3 px-3 py-1 rounded-full bg-[var(--ink)] text-[var(--surface)] text-[10px] font-semibold uppercase tracking-[0.16em]">
            <ArrowDown className="w-3 h-3" strokeWidth={2} aria-hidden="true" />
            Connected
          </p>
          <div className="relative w-full max-w-md lg:max-w-4xl grid grid-cols-1 lg:grid-cols-3 gap-2.5">
            {flows.map((flow) => (
              <FlowPill key={flow.from} from={flow.from} to={flow.to} />
            ))}
          </div>
        </div>

        <SoftwarePanel />

        <p className="mt-5 sm:mt-6 text-center text-sm text-[var(--muted)]">
          Not sure which you need? Most projects start with one and grow into the other.{" "}
          <a href="#contact" className="font-medium text-[var(--ink)] underline underline-offset-4 decoration-[var(--terracotta)] hover:text-[var(--terracotta)]">
            Talk it through with us
          </a>
        </p>
      </Workbench>
    </section>
  );
}
