"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/content/site";
import { SectionHeading } from "./SectionHeading";
import { Workbench, WindowBar, MiniLabel } from "./ui/Workbench";
import { motion } from "framer-motion";
import { EASE, Stagger, StaggerItem } from "./motion/Reveal";
import { Magnetic } from "./motion/Magnetic";
import {
  Mail,
  MessageCircle,
  Calendar,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

// Phones get stacked labels and boxed inputs; from md up the form reads like an email draft.
const rowClass =
  "grid grid-cols-1 md:grid-cols-[7rem_1fr] md:items-center pt-4 md:pt-0 md:px-6 md:border-b md:border-[var(--line)] md:transition-shadow md:focus-within:shadow-[inset_3px_0_0_var(--terracotta)] md:focus-within:bg-[var(--bg)]/30";
const labelClass = "text-xs font-medium md:font-normal md:text-[0.8125rem] text-[var(--muted)] pb-1.5 md:py-3.5";
// 16px text on phones stops iOS from zooming in when a field is focused.
const fieldClass =
  "w-full min-w-0 rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-3 text-base md:text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-[var(--terracotta)] md:rounded-none md:border-0 md:bg-transparent md:px-0 md:py-3.5";

const nextSteps = [
  { title: "We reply within one working day", text: "With a few questions, or a time for a call." },
  { title: "A free 30-minute call", text: "You walk us through how things work today." },
  { title: "A fixed quote in writing", text: "Scope, timeline and price, before anything starts." },
];

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    service: siteConfig.contact.serviceOptions[0],
    budget: siteConfig.contact.budgetRanges[1],
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [honeypot, setHoneypot] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  useEffect(() => {
    // Listen for prefill-service event from InteractiveNeeds and Packages sections
    const handlePrefill = (e: Event) => {
      const customEvent = e as CustomEvent<string>;
      if (customEvent.detail) {
        setFormData((prev) => ({
          ...prev,
          service: customEvent.detail,
        }));
      }
    };

    window.addEventListener("prefill-service", handlePrefill);
    return () => window.removeEventListener("prefill-service", handlePrefill);
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { brand } = siteConfig;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setStatus("submitting");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({ ...formData, company: honeypot }),
      });

      if (response.ok) {
        setStatus("success");
        setFormData((prev) => ({ ...prev, message: "" }));
      } else {
        const data = await response.json().catch(() => null);
        setErrorMessage(data?.error || "Your message couldn't be sent. Please try again in a minute.");
        setStatus("error");
      }
    } catch {
      setErrorMessage(
        brand.whatsappLink
          ? "Network error. Please try again, or message us on WhatsApp."
          : "Network error. Please check your connection and try again."
      );
      setStatus("error");
    }
  };

  const channels = [
    brand.email && {
      icon: Mail,
      title: "Email",
      text: "Longer briefs, documents or screenshots.",
      value: "Write to us",
      href: `mailto:${brand.email}`,
      external: false,
    },
    brand.whatsappLink && {
      icon: MessageCircle,
      title: "WhatsApp",
      text: "A quick question or a voice note.",
      value: "Message us",
      href: brand.whatsappLink,
      external: true,
    },
    brand.calendlyLink && {
      icon: Calendar,
      title: "Free 30-minute call",
      text: "Pick a time that suits you.",
      value: "Choose a time",
      href: brand.calendlyLink,
      external: true,
    },
  ].filter((c): c is Exclude<typeof c, "" | false | undefined> => Boolean(c));

  return (
    <section id="contact" className="py-16 md:py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <SectionHeading
        eyebrow="Contact"
        title={siteConfig.contact.headline}
        intro={siteConfig.contact.subheading}
      />

      <Workbench>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 md:gap-6 lg:gap-8 items-start">
          {/* Compose window */}
          <div className="lg:col-span-7 clay-card flat-mobile overflow-hidden">
            <WindowBar>
              <div className="flex-1 flex items-center justify-between min-w-0">
                <span className="text-sm font-medium text-[var(--ink)]">New enquiry</span>
                <div className="hidden sm:block">
                  <MiniLabel tone="sage">Draft</MiniLabel>
                </div>
              </div>
            </WindowBar>

            {status === "success" ? (
              <div className="px-6 py-16 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--sage)]/20 border border-[var(--sage)] flex items-center justify-center text-[#5E7356] mb-4">
                  <CheckCircle2 className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-2xl text-[var(--ink)] mb-2">
                  Thanks, we&apos;ve got your message
                </h3>
                <p className="text-sm text-[var(--muted)] max-w-md leading-relaxed mb-6">
                  We&apos;ll reply to{" "}
                  <span className="text-[var(--ink)] break-all">{formData.email}</span> within one
                  working day.
                </p>
                <button
                  type="button"
                  onClick={() => setStatus("idle")}
                  className="btn-secondary text-xs py-2 px-4"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="absolute -left-[624.9375rem] w-px h-px overflow-hidden" aria-hidden="true">
                  <label htmlFor="company">Company</label>
                  <input
                    id="company"
                    name="company"
                    type="text"
                    tabIndex={-1}
                    autoComplete="off"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                  />
                </div>
                {status === "error" && (
                  <div className="md:mx-6 mt-4 p-4 rounded-xl bg-[var(--terracotta)]/10 border border-[var(--terracotta)]/30 flex items-start gap-3 text-xs text-[var(--terracotta)]">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className={`${rowClass} max-md:hidden`}>
                  <span className={labelClass}>To</span>
                  <span className="py-3.5 min-w-0">
                    <span className="inline-flex max-w-full items-center gap-1.5 rounded-full bg-[var(--bg)] border border-[var(--line)] pl-1 pr-2.5 py-0.5 text-xs text-[var(--ink)]">
                      <span className="w-5 h-5 shrink-0 rounded-full bg-[var(--ink)] text-[var(--surface)] flex items-center justify-center font-serif text-[0.6875rem]" aria-hidden="true">
                        {brand.monogram}
                      </span>
                      <span className="truncate">{brand.name}</span>
                    </span>
                  </span>
                </div>

                <div className={`${rowClass} max-md:hidden`}>
                  <span className={labelClass}>Subject</span>
                  <span className="py-3.5 text-sm font-medium text-[var(--ink)] truncate" aria-live="polite">
                    Project enquiry: {formData.service}
                  </span>
                </div>

                <div className={rowClass}>
                  <label htmlFor="name" className={labelClass}>
                    Name *
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    autoComplete="name"
                    placeholder="Full name"
                    className={fieldClass}
                  />
                </div>

                <div className={rowClass}>
                  <label htmlFor="email" className={labelClass}>
                    Email *
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    autoComplete="email"
                    placeholder="you@company.com"
                    className={fieldClass}
                  />
                </div>

                <div className={rowClass}>
                  <label htmlFor="whatsapp" className={labelClass}>
                    Phone
                  </label>
                  <input
                    id="whatsapp"
                    name="whatsapp"
                    type="tel"
                    value={formData.whatsapp}
                    onChange={handleChange}
                    autoComplete="tel"
                    placeholder="Phone or WhatsApp, optional"
                    className={fieldClass}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2">
                  <div className={`${rowClass} md:border-r`}>
                    <label htmlFor="service" className={labelClass}>
                      Need *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className={`${fieldClass} cursor-pointer`}
                    >
                      {siteConfig.contact.serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className={rowClass}>
                    <label htmlFor="budget" className={labelClass}>
                      Budget *
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className={`${fieldClass} cursor-pointer`}
                    >
                      {siteConfig.contact.budgetRanges.map((b) => (
                        <option key={b} value={b}>
                          {b}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="md:px-6 pt-4 md:transition-shadow md:focus-within:shadow-[inset_3px_0_0_var(--terracotta)]">
                  <label htmlFor="message" className="block pb-1.5 text-xs font-medium text-[var(--muted)] md:sr-only">
                    Tell us about the project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What does your business do, and what would you like to build or fix? A few lines is enough."
                    className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3.5 py-3 text-base md:text-[0.9375rem] leading-relaxed text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:border-[var(--terracotta)] md:rounded-none md:border-0 md:bg-transparent md:p-0 resize-y"
                  />
                </div>

                <div className="flex flex-col-reverse md:flex-row md:items-center justify-between gap-3 pt-5 md:px-6 md:py-4 md:border-t md:border-[var(--line)] md:bg-[var(--bg)]/40">
                  <p className="text-xs text-[var(--muted)] text-center md:text-left">{brand.responseTime}.</p>
                  <Magnetic strength={0.2} className="w-full md:w-auto">
                  <button
                    type="submit"
                    disabled={status === "submitting"}
                    className="btn-primary w-full md:w-auto py-3.5 md:py-3 px-6 text-sm font-medium justify-center cursor-pointer disabled:opacity-50"
                  >
                    {status === "submitting" ? (
                      <span>Sending…</span>
                    ) : (
                      <>
                        <span>Send enquiry</span>
                        <Send className="w-4 h-4" strokeWidth={1.5} />
                      </>
                    )}
                  </button>
                  </Magnetic>
                </div>
              </form>
            )}
          </div>

          {/* What happens next + other channels */}
          <div className="lg:col-span-5 flex flex-col gap-10 md:gap-6">
            <div className="clay-card flat-mobile md:p-6">
              <MiniLabel tone="terracotta">What happens next</MiniLabel>
              <Stagger as="ol" stagger={0.2} delay={0.3} className="mt-5 relative">
                <motion.span
                  className="absolute left-[0.6875rem] top-3 bottom-3 w-px bg-[var(--line)] origin-top"
                  aria-hidden="true"
                  variants={{ hidden: { scaleY: 0 }, show: { scaleY: 1, transition: { duration: 1.2, ease: EASE } } }}
                />
                {nextSteps.map((step, i) => (
                  <StaggerItem as="li" key={step.title} y={0} x={-12} className="relative grid grid-cols-[1.5rem_1fr] gap-3 pb-5 last:pb-0">
                    <span
                      className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center font-mono text-[0.625rem] ${
                        i === 0
                          ? "bg-[var(--terracotta)] text-[var(--surface)]"
                          : "bg-[var(--surface)] border border-[var(--line)] text-[var(--muted)]"
                      }`}
                      aria-hidden="true"
                    >
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-semibold text-[var(--ink)] leading-6">{step.title}</p>
                      <p className="text-sm text-[var(--muted)] leading-relaxed">{step.text}</p>
                    </div>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>

            {channels.length > 0 && (
            <div className="clay-card overflow-hidden">
              <div className="px-5 sm:px-6 pt-5 pb-3">
                <MiniLabel tone="sage">Prefer another way?</MiniLabel>
              </div>
              <Stagger as="ul" stagger={0.1} delay={0.4} className="flex flex-col gap-px bg-[var(--line)] border-t border-[var(--line)]">
                {channels.map(({ icon: Icon, title, text, value, href, external }) => (
                  <StaggerItem as="li" key={title} y={12} className="bg-[var(--surface)]">
                    <a
                      href={href}
                      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                      className="group grid grid-cols-[2.25rem_1fr_auto] items-center gap-3 px-5 sm:px-6 py-4 hover:bg-[var(--bg)]/40 transition-colors"
                    >
                      <span className="w-9 h-9 rounded-lg bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--terracotta)]">
                        <Icon className="w-4 h-4" strokeWidth={1.75} aria-hidden="true" />
                      </span>
                      <span className="min-w-0">
                        <span className="block text-sm font-semibold text-[var(--ink)]">{title}</span>
                        <span className="block text-xs text-[var(--muted)] truncate">{text}</span>
                        <span className="block mt-0.5 text-[0.8125rem] text-[var(--ink)] group-hover:text-[var(--terracotta)] transition-colors break-all">
                          {value}
                        </span>
                      </span>
                      <ArrowUpRight
                        className="w-4 h-4 text-[var(--muted)] group-hover:text-[var(--terracotta)] group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
                        strokeWidth={1.5}
                        aria-hidden="true"
                      />
                    </a>
                  </StaggerItem>
                ))}
              </Stagger>
            </div>
            )}
          </div>
        </div>
      </Workbench>
    </section>
  );
}
