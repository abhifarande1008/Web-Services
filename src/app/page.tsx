import React from "react";
import { getFrames } from "@/lib/get-frames";
import { ScrollHero } from "@/components/hero/ScrollHero";
import { StaticHero } from "@/components/hero/StaticHero";
import { Navbar } from "@/components/Navbar";
import { WhatIBuild } from "@/components/WhatIBuild";
import { InteractiveNeeds } from "@/components/InteractiveNeeds";
import { Industries } from "@/components/Industries";
import { Process } from "@/components/Process";
import { SelectedWork } from "@/components/SelectedWork";
import { Packages } from "@/components/Packages";
import { WhyMe } from "@/components/WhyMe";
import { TechStack } from "@/components/TechStack";
import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";

export default function Home() {
  const frames = getFrames();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col overflow-x-clip">
      {/* 1. Navbar (stays above hero with z-50, transparent at top, solid on scroll) */}
      <Navbar />

      <main className="flex-1 w-full overflow-x-clip">
        {/* 2. Hero: Scroll-scrubbed frame sequence if frames available, else static hero */}
        {frames.length > 0 ? (
          <ScrollHero frames={frames} />
        ) : (
          <StaticHero />
        )}

        {/* 3. What I build (Web Services & App Services columns) */}
        <div className="bg-[var(--bg)] section-deferred">
          <WhatIBuild />
        </div>

        {/* 4. Interactive "What do you need?" */}
        <div className="bg-[var(--bg)] section-deferred">
          <InteractiveNeeds />
        </div>

        {/* 5. Industries (Hover reveal modules) */}
        <div className="bg-[var(--bg)] section-deferred">
          <Industries />
        </div>

        {/* 6. Process (Discover, Design, Build, Launch, Support) */}
        <div className="bg-[var(--bg)] section-deferred">
          <Process />
        </div>

        {/* 7. Selected work (4 case studies with screenshot frames & metrics) */}
        <div className="bg-[var(--bg)] section-deferred">
          <SelectedWork />
        </div>

        {/* 8. Packages & Pricing */}
        <div className="bg-[var(--bg)] section-deferred">
          <Packages />
        </div>

        {/* 9. Why work with me (5 proof points) */}
        <div className="bg-[var(--bg)] section-deferred">
          <WhyMe />
        </div>

        {/* 10. Tech stack row */}
        <div className="bg-[var(--bg)] section-deferred">
          <TechStack />
        </div>

        {/* 11. About (bio with image placeholder slot) */}
        <div className="bg-[var(--bg)] section-deferred">
          <About />
        </div>

        {/* 12. FAQ accordion (6 questions) */}
        <div className="bg-[var(--bg)] section-deferred">
          <FAQ />
        </div>

        {/* 13. Contact (form, WhatsApp, email, Calendly) */}
        <div className="bg-[var(--bg)] section-deferred">
          <Contact />
        </div>
      </main>

      {/* 14. Footer */}
      <Footer />
    </div>
  );
}
