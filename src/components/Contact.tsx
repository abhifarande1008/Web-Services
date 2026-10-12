"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/content/site";
import { ClayCard } from "./ClayCard";
import { MotifDots } from "./MockUI";
import {
  Mail,
  MessageCircle,
  Calendar,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
  Clock,
} from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

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
  const [errorMessage, setErrorMessage] = useState("");
  const shouldReduceMotion = useReducedMotion();

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMessage("");

    try {
      const response = await fetch(siteConfig.brand.formspreeEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus("success");
      } else {
        // Fallback for placeholder endpoint:
        // Even if the endpoint is a placeholder like [FORMSPREE_ENDPOINT], provide clear UX
        const data = await response.json().catch(() => null);
        if (siteConfig.brand.formspreeEndpoint.includes("[FORMSPREE_ENDPOINT]")) {
          // In development or demo mode with placeholder endpoint, simulate graceful submission
          setStatus("success");
        } else {
          setErrorMessage(data?.error || "Submission failed. Please email or WhatsApp directly.");
          setStatus("error");
        }
      }
    } catch (err) {
      if (siteConfig.brand.formspreeEndpoint.includes("[FORMSPREE_ENDPOINT]")) {
        // Handle mock placeholder cleanly
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMessage("Network error occurred. Please reach out via email or WhatsApp.");
      }
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Large Closing Headline */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--surface)] border border-[var(--line)] text-xs font-mono uppercase tracking-wider text-[var(--terracotta)] mb-4">
          Start a Conversation
        </div>
        <h2 className="font-serif text-3xl sm:text-5xl md:text-6xl font-normal text-[var(--ink)] tracking-tight leading-tight">
          {siteConfig.contact.headline}
        </h2>
        <p className="mt-6 text-base sm:text-lg text-[var(--muted)] leading-relaxed max-w-2xl mx-auto">
          {siteConfig.contact.subheading}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Contact Form ClayCard */}
        <div className="lg:col-span-7">
          <ClayCard className="p-8 sm:p-10" enableTilt={false}>
            <div className="flex items-center justify-between pb-6 border-b border-[var(--line)] mb-6">
              <div>
                <h3 className="font-serif text-2xl font-semibold text-[var(--ink)]">
                  Project Inquiry
                </h3>
                <p className="text-xs text-[var(--muted)] mt-1">
                  Fill in your project brief or selected service below.
                </p>
              </div>
              <MotifDots />
            </div>

            {status === "success" ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--sage)]/20 border border-[var(--sage)] flex items-center justify-center text-[var(--sage)] mb-4">
                  <CheckCircle2 className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h4 className="font-serif text-2xl font-semibold text-[var(--ink)] mb-2">
                  Inquiry Received!
                </h4>
                <p className="text-sm text-[var(--muted)] max-w-md leading-relaxed mb-6">
                  Thank you for reaching out. I review all project inquiries personally and will respond with thoughts and availability within 24 hours.
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
              <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                {status === "error" && (
                  <div className="p-4 rounded-xl bg-[var(--terracotta)]/10 border border-[var(--terracotta)]/30 flex items-start gap-3 text-xs text-[var(--terracotta)]">
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="name" className="text-xs font-mono uppercase tracking-wider text-[var(--ink)] font-medium">
                      Your Name *
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="e.g. Alex Henderson"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg)]/60 border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)]"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-xs font-mono uppercase tracking-wider text-[var(--ink)] font-medium">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="alex@company.com"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg)]/60 border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* WhatsApp */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="whatsapp" className="text-xs font-mono uppercase tracking-wider text-[var(--ink)] font-medium">
                      WhatsApp / Phone
                    </label>
                    <input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg)]/60 border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)]"
                    />
                  </div>

                  {/* Service Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="service" className="text-xs font-mono uppercase tracking-wider text-[var(--ink)] font-medium">
                      Service Needed *
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg)]/60 border border-[var(--line)] text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)] cursor-pointer"
                    >
                      {siteConfig.contact.serviceOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Budget Range Dropdown */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="budget" className="text-xs font-mono uppercase tracking-wider text-[var(--ink)] font-medium">
                    Target Budget Range *
                  </label>
                  <select
                    id="budget"
                    name="budget"
                    value={formData.budget}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg)]/60 border border-[var(--line)] text-sm text-[var(--ink)] focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)] cursor-pointer"
                  >
                    {siteConfig.contact.budgetRanges.map((b) => (
                      <option key={b} value={b}>
                        {b}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Message */}
                <div className="flex flex-col gap-1.5">
                  <label htmlFor="message" className="text-xs font-mono uppercase tracking-wider text-[var(--ink)] font-medium">
                    Project Details / Problem to Solve *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Briefly describe what your business does and the workflow or website you would like to build..."
                    className="w-full px-4 py-3 rounded-xl bg-[var(--bg)]/60 border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)] resize-y"
                  />
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="btn-primary w-full py-3.5 text-sm font-medium justify-center cursor-pointer disabled:opacity-50 mt-2"
                >
                  {status === "submitting" ? (
                    <span>Sending inquiry...</span>
                  ) : (
                    <>
                      <span>Send Project Inquiry</span>
                      <Send className="w-4 h-4" strokeWidth={1.5} />
                    </>
                  )}
                </button>
              </form>
            )}
          </ClayCard>
        </div>

        {/* Direct Channels / Calendly Placeholder */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          {/* Calendly Placeholder Card */}
          <ClayCard className="p-6 sm:p-7" enableTilt={true}>
            <div className="flex items-center justify-between mb-4">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--terracotta)]">
                <Calendar className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <MotifDots />
            </div>

            <h4 className="font-serif text-xl font-semibold text-[var(--ink)] mb-2">
              Book a 20-min Discovery Call
            </h4>
            <p className="text-xs text-[var(--muted)] leading-relaxed mb-6">
              Prefer a direct conversation? Schedule a quick video or audio discovery call to discuss your project requirements and technical feasibility.
            </p>

            <a
              href={siteConfig.brand.calendlyLink}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full text-xs py-3 justify-center font-medium"
            >
              <span>Schedule on Calendly</span>
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </a>
          </ClayCard>

          {/* WhatsApp Direct */}
          <ClayCard className="p-6" enableTilt={true}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--sage)]">
                <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <span className="text-[11px] font-mono text-[var(--sage)] font-medium">Quick Chat</span>
            </div>

            <h4 className="font-serif text-lg font-semibold text-[var(--ink)] mb-1">
              WhatsApp Direct
            </h4>
            <p className="text-xs text-[var(--muted)] mb-4">
              Have a quick question or want to share a voice note?
            </p>

            <a
              href={siteConfig.brand.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors"
            >
              <span>Message on WhatsApp ({siteConfig.brand.whatsappNumber})</span>
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </a>
          </ClayCard>

          {/* Email Direct */}
          <ClayCard className="p-6" enableTilt={true}>
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--ink)]">
                <Mail className="w-5 h-5" strokeWidth={1.5} />
              </div>
              <span className="text-[11px] font-mono text-[var(--muted)]">Direct Inbox</span>
            </div>

            <h4 className="font-serif text-lg font-semibold text-[var(--ink)] mb-1">
              Direct Email
            </h4>
            <p className="text-xs text-[var(--muted)] mb-4">
              Send documents, RFPs, or architectural briefs.
            </p>

            <a
              href={`mailto:${siteConfig.brand.email}`}
              className="inline-flex items-center gap-2 text-xs font-semibold text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors"
            >
              <span>{siteConfig.brand.email}</span>
              <ArrowUpRight className="w-3.5 h-3.5" strokeWidth={1.5} />
            </a>
          </ClayCard>
        </div>
      </div>
    </section>
  );
}
