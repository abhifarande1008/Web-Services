"use client";

import React from "react";
import { siteConfig, ServiceItem } from "@/content/site";
import { ClayCard } from "./ClayCard";
import { MockUI } from "./MockUI";
import { SectionHeading } from "./SectionHeading";
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
      <ClayCard className="p-5 flex flex-col justify-between h-full">
        <div>
          <div className="w-10 h-10 mb-4 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--terracotta)]">
            <IconComponent className="w-5 h-5" strokeWidth={1.5} />
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
      <SectionHeading
        eyebrow="Services"
        title="What we build"
        intro="Two kinds of work: websites that bring customers to you, and software your team uses to run the business day to day."
      />

      {/* Two Columns Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Column 1: Web Services */}
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between pb-3 border-b border-[var(--line)]">
            <div className="flex items-center gap-3">
              <span className="w-3 h-3 rounded-full bg-[var(--terracotta)]" />
              <h3 className="font-serif text-2xl font-semibold text-[var(--ink)]">
                Websites
              </h3>
            </div>
            <span className="text-xs text-[var(--muted)]">
              {siteConfig.services.web.length} services
            </span>
          </div>
          <p className="text-sm text-[var(--muted)] -mt-2">
            What your customers see: pages that explain your business and get people to contact you.
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
                Business software
              </h3>
            </div>
            <span className="text-xs text-[var(--muted)]">
              {siteConfig.services.app.length} services
            </span>
          </div>
          <p className="text-sm text-[var(--muted)] -mt-2">
            What your team uses: tools for sales, stock, billing, bookings and staff.
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
