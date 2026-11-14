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
import { WhyUs } from "@/components/WhyUs";
import { TechStack } from "@/components/TechStack";
import { About } from "@/components/About";
import { FAQ } from "@/components/FAQ";
import { Contact } from "@/components/Contact";
import { Footer } from "@/components/Footer";
import { MarqueeBand } from "@/components/motion/Marquee";
import { SiteLoader } from "@/components/SiteLoader";

export default function Home() {
  const frames = getFrames();

  return (
    <div className="min-h-screen bg-[var(--bg)] text-[var(--ink)] flex flex-col overflow-x-clip">
      <SiteLoader waitForHero={frames.length > 0} />

      {/* 1. Navbar (stays above hero with z-50, transparent at top, solid on scroll) */}
      <Navbar />

      <main id="main" className="page-curtain flex-1 w-full overflow-x-clip bg-[var(--bg)]">
        {/* 2. Hero: Scroll-scrubbed frame sequence if frames available, else static hero */}
        {frames.length > 0 ? (
          <ScrollHero frames={frames} />
        ) : (
          <StaticHero />
        )}

        {/* 3. What we build (Websites & Business software columns) */}
        <div className="bg-[var(--bg)]">
          <WhatIBuild />
        </div>

        {/* 4. Interactive "What do you need?" */}
        <div className="bg-[var(--bg)]">
          <InteractiveNeeds />
        </div>

        {/* 5. Industries (Hover reveal modules) */}
        <div className="bg-[var(--bg)]">
          <Industries />
        </div>

        {/* 6. Process (Discover, Design, Build, Launch, Support) */}
        <div className="bg-[var(--bg)]">
          <Process />
        </div>

        <MarqueeBand
          items={["Websites", "Landing pages", "CRMs", "Stock & billing", "Booking systems", "Dashboards", "Automation"]}
          secondary={["Fixed quotes", "Weekly demos", "You own the code", "Support included", "Built in India"]}
        />

        {/* 7. Example projects (4 illustrative projects, no client metrics) */}
        <div className="bg-[var(--bg)]">
          <SelectedWork />
        </div>

        {/* 8. Packages & Pricing */}
        <div className="bg-[var(--bg)]">
          <Packages />
        </div>

        {/* 9. Why work with us (5 proof points) */}
        <div className="bg-[var(--bg)]">
          <WhyUs />
        </div>

        {/* 10. Tech stack row */}
        <div className="bg-[var(--bg)]">
          <TechStack />
        </div>

        {/* 11. About (company + founder card) */}
        <div className="bg-[var(--bg)]">
          <About />
        </div>

        {/* 12. FAQ accordion (6 questions) */}
        <div className="bg-[var(--bg)]">
          <FAQ />
        </div>

        {/* 13. Contact (form, email, WhatsApp, call request) */}
        <div>
          <Contact />
        </div>
      </main>

      {/* 14. Footer */}
      <Footer />
    </div>
  );
}
