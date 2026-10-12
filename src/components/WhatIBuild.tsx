"use client";

import React from "react";
import { siteConfig, ServiceItem } from "@/content/site";
import { ClayCard } from "./ClayCard";
import { MotifDots, MockUI } from "./MockUI";
import { motion, useReducedMotion } from "framer-motion";
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
  LucideIcon,
  ArrowRight,
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

function ServiceCard({ service, index }: { service: ServiceItem; index: number }) {
  const IconComponent = iconMap[service.iconName] || Globe;
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: index * 0.05, ease: "easeOut" }}
    >
      <ClayCard className="p-5 flex flex-col justify-between h-full group" enableTilt={true}>
        <div>
          {/* Card Top: Icon & Motif Dots */}
          <div className="flex items-center justify-between mb-4">
            <div className="w-10 h-10 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--terracotta)] group-hover:scale-105 transition-transform">
              <IconComponent className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <MotifDots />
          </div>

          {/* Card Content */}
          <h3 className="font-serif text-lg font-semibold text-[var(--ink)] leading-snug mb-2">
            {service.title}
          </h3>
          <p className="text-sm text-[var(--muted)] leading-relaxed mb-5">
            {service.outcome}
          </p>
        </div>

        {/* Mock UI Motif */}
        <div className="mt-auto">
          <MockUI type={service.mockUiType} />
        </div>
      </ClayCard>
    </motion.div>
  );
}

export function WhatIBuild() {
  return (
    <section id="services" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Section Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] text-xs font-mono uppercase tracking-wider text-[var(--terracotta)] mb-4">
          Capabilities & Deliverables
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl font-normal text-[var(--ink)] tracking-tight">
          What I build
        </h2>
        <p className="mt-4 text-base sm:text-lg text-[var(--muted)] leading-relaxed">
          Full-stack craftsmanship across modern web experiences and complex business applications.
          Engineered end-to-end with clean architectures that scale as you grow.
        </p>
      </div>

      {/* Two Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Column 1: Web Services */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[var(--terracotta)]" />
              <h3 className="font-serif text-2xl font-semibold text-[var(--ink)]">
                Web Services
              </h3>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] text-[var(--muted)]">
              {siteConfig.services.web.length} Offerings
            </span>
          </div>
          <p className="text-sm text-[var(--muted)] -mt-2">
            Client-facing conversion surfaces, high-authority brand websites, and interactive portals.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {siteConfig.services.web.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
          </div>
        </div>

        {/* Column 2: App Services */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[var(--sage)]" />
              <h3 className="font-serif text-2xl font-semibold text-[var(--ink)]">
                App Services
              </h3>
            </div>
            <span className="text-xs font-mono px-2.5 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] text-[var(--muted)]">
              {siteConfig.services.app.length} Offerings
            </span>
          </div>
          <p className="text-sm text-[var(--muted)] -mt-2">
            Mission-critical operations: pipelines, billing, inventory, bookings, and team automation.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {siteConfig.services.app.map((service, idx) => (
              <ServiceCard key={service.id} service={service} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
