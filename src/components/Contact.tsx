"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/content/site";
import { ClayCard } from "./ClayCard";
import { SectionHeading } from "./SectionHeading";
import {
  Mail,
  MessageCircle,
  Calendar,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowUpRight,
} from "lucide-react";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    whatsapp: "",
    service: siteConfig.contact.serviceOptions[0],
    budget: siteConfig.contact.budgetRanges[1],
    message: "",
  });

  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "emailed" | "error">("idle");
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

  const openEmailDraft = () => {
    const subject = `Project enquiry: ${formData.service}`;
    const body = [
      `Name: ${formData.name}`,
      `Email: ${formData.email}`,
      `Phone / WhatsApp: ${formData.whatsapp || "-"}`,
      `Service: ${formData.service}`,
      `Budget: ${formData.budget}`,
      "",
      formData.message,
    ].join("\n");
    window.location.href = `mailto:${siteConfig.brand.email}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    // Without a real Formspree form ID there is nowhere to POST, so hand the
    // enquiry to the visitor's email app instead of pretending it was sent.
    if (siteConfig.brand.formspreeEndpoint.includes("[FORMSPREE_ENDPOINT]")) {
      openEmailDraft();
      setStatus("emailed");
      return;
    }

    setStatus("submitting");
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
        const data = await response.json().catch(() => null);
        setErrorMessage(
          data?.error || `Your message couldn't be sent. Please email us at ${siteConfig.brand.email}.`
        );
        setStatus("error");
      }
    } catch {
      setErrorMessage(`Network error. Please email us at ${siteConfig.brand.email} or message us on WhatsApp.`);
      setStatus("error");
    }
  };

  return (
    <section id="contact" className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Large Closing Headline */}
      <SectionHeading
        align="center"
        eyebrow="Contact"
        title={siteConfig.contact.headline}
        intro={siteConfig.contact.subheading}
      />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
        <div className="lg:col-span-7">
          <ClayCard className="p-5 sm:p-10">
            <div className="pb-6 border-b border-[var(--line)] mb-6">
              <h3 className="font-serif text-2xl font-semibold text-[var(--ink)]">
                Project enquiry
              </h3>
              <p className="text-sm text-[var(--muted)] mt-1">
                A few lines is enough. We&apos;ll ask follow-up questions if we need to.
              </p>
            </div>

            {status === "success" || status === "emailed" ? (
              <div className="py-12 flex flex-col items-center text-center">
                <div className="w-14 h-14 rounded-full bg-[var(--sage)]/20 border border-[var(--sage)] flex items-center justify-center text-[var(--sage)] mb-4">
                  <CheckCircle2 className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h4 className="font-serif text-2xl font-semibold text-[var(--ink)] mb-2">
                  {status === "success" ? "Thanks, we've got your message" : "Almost done"}
                </h4>
                <p className="text-sm text-[var(--muted)] max-w-md leading-relaxed mb-6">
                  {status === "success" ? (
                    <>We&apos;ll get back to you within one working day.</>
                  ) : (
                    <>
                      Your email app should have opened with your message filled in. Press send and
                      we&apos;ll reply within one working day. If nothing opened, write to us at{" "}
                      <a
                        href={`mailto:${siteConfig.brand.email}`}
                        className="text-[var(--ink)] underline underline-offset-2 break-all"
                      >
                        {siteConfig.brand.email}
                      </a>
                      .
                    </>
                  )}
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
                    <label htmlFor="name" className="text-sm text-[var(--ink)] font-medium">
                      Your name *
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
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg)]/60 border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)]"
                    />
                  </div>

                  {/* Email */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="email" className="text-sm text-[var(--ink)] font-medium">
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
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg)]/60 border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* WhatsApp */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="whatsapp" className="text-sm text-[var(--ink)] font-medium">
                      Phone or WhatsApp
                    </label>
                    <input
                      id="whatsapp"
                      name="whatsapp"
                      type="tel"
                      value={formData.whatsapp}
                      onChange={handleChange}
                      autoComplete="tel"
                      placeholder="+91"
                      className="w-full px-4 py-3 rounded-xl bg-[var(--bg)]/60 border border-[var(--line)] text-sm text-[var(--ink)] placeholder:text-[var(--muted)]/60 focus:outline-none focus:ring-2 focus:ring-[var(--terracotta)]"
                    />
                  </div>

                  {/* Service Dropdown */}
                  <div className="flex flex-col gap-1.5">
                    <label htmlFor="service" className="text-sm text-[var(--ink)] font-medium">
                      What do you need? *
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
                  <label htmlFor="budget" className="text-sm text-[var(--ink)] font-medium">
                    Rough budget *
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
                  <label htmlFor="message" className="text-sm text-[var(--ink)] font-medium">
                    Tell us about the project *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={4}
                    required
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="What does your business do, and what would you like to build or fix?"
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
                    <span>Sending…</span>
                  ) : (
                    <>
                      <span>Send enquiry</span>
                      <Send className="w-4 h-4" strokeWidth={1.5} />
                    </>
                  )}
                </button>
              </form>
            )}
          </ClayCard>
        </div>

        <div className="lg:col-span-5 flex flex-col gap-5">
          <ClayCard className="p-6">
            <div className="w-10 h-10 mb-4 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--terracotta)]">
              <Mail className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h4 className="font-serif text-lg font-semibold text-[var(--ink)] mb-1">Email us</h4>
            <p className="text-sm text-[var(--muted)] mb-4">
              Good for longer briefs, documents or screenshots of what you use today.
            </p>
            <a
              href={`mailto:${siteConfig.brand.email}`}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors break-all"
            >
              <span>{siteConfig.brand.email}</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={1.5} />
            </a>
          </ClayCard>

          <ClayCard className="p-6">
            <div className="w-10 h-10 mb-4 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--sage)]">
              <MessageCircle className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h4 className="font-serif text-lg font-semibold text-[var(--ink)] mb-1">WhatsApp</h4>
            <p className="text-sm text-[var(--muted)] mb-4">
              For a quick question, or if you&apos;d rather send a voice note.
            </p>
            <a
              href={siteConfig.brand.whatsappLink}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[var(--ink)] hover:text-[var(--terracotta)] transition-colors"
            >
              <span>{siteConfig.brand.whatsappNumber}</span>
              <ArrowUpRight className="w-4 h-4 shrink-0" strokeWidth={1.5} />
            </a>
          </ClayCard>

          <ClayCard className="p-6">
            <div className="w-10 h-10 mb-4 rounded-xl bg-[var(--bg)] border border-[var(--line)] flex items-center justify-center text-[var(--ink)]">
              <Calendar className="w-5 h-5" strokeWidth={1.5} />
            </div>
            <h4 className="font-serif text-lg font-semibold text-[var(--ink)] mb-1">
              Book a free 20-minute call
            </h4>
            <p className="text-sm text-[var(--muted)] mb-4">
              {siteConfig.brand.calendlyLink
                ? "Pick a time that suits you and we'll talk through what you need."
                : "Email us two or three times that suit you and we'll send a meeting invite."}
            </p>
            <a
              href={
                siteConfig.brand.calendlyLink ||
                `mailto:${siteConfig.brand.email}?subject=${encodeURIComponent("Call request")}`
              }
              {...(siteConfig.brand.calendlyLink
                ? { target: "_blank", rel: "noopener noreferrer" }
                : {})}
              className="btn-secondary w-full text-sm py-3 justify-center font-medium"
            >
              <span>{siteConfig.brand.calendlyLink ? "Choose a time" : "Request a call"}</span>
              <ArrowUpRight className="w-4 h-4" strokeWidth={1.5} />
            </a>
          </ClayCard>
        </div>
      </div>
    </section>
  );
}
