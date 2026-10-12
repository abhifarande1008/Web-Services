export interface NavItem {
  label: string;
  href: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  outcome: string;
  iconName: string;
  mockUiType: "bars" | "toggle" | "chart" | "kanban" | "table" | "metric" | "pwa" | "api";
}

export interface NeedSolution {
  id: string;
  chipLabel: string;
  title: string;
  description: string;
  included: [string, string, string, string];
  timeline: string;
  servicePrefill: string;
}

export interface IndustryItem {
  id: string;
  title: string;
  iconName: string;
  description: string;
  exampleModule: {
    name: string;
    details: string;
  };
}

export interface ProcessStep {
  step: string;
  title: string;
  duration: string;
  description: string;
  deliverables: string[];
}

export interface CaseStudy {
  id: string;
  title: string;
  industry: string;
  problem: string;
  solution: string;
  result: string;
  metrics: [string, string];
  previewType: "crm" | "erp" | "landing" | "booking";
}

export interface PackageItem {
  id: string;
  name: string;
  timeline: string;
  price: string;
  description: string;
  isPopular?: boolean;
  features: [string, string, string, string, string];
  cta: string;
  servicePrefill: string;
}

export interface ProofPoint {
  id: string;
  number: string;
  title: string;
  description: string;
  iconName: string;
}

export interface TechItem {
  name: string;
  category: string;
}

export interface FaqItem {
  id: string;
  question: string;
  answer: string;
}

export const siteConfig = {
  brand: {
    name: "Farande Studio",
    tagline: "I turn your idea into a platform your business runs on.",
    founder: "Abhishek Farande",
    role: "Senior Full-Stack Engineer & Product Designer",
    availability: "Available for select projects",
    responseTime: "Guaranteed reply within 24 hours",
    formspreeEndpoint: "https://formspree.io/f/[FORMSPREE_ENDPOINT]",
    email: "abhishek@farandestudio.com",
    whatsappNumber: "+91 98765 43210",
    whatsappLink: "https://wa.me/919876543210?text=Hi%20Abhishek%2C%20I%20would%20like%20to%20discuss%20a%20project",
    calendlyLink: "https://calendly.com/[YOUR-CALENDLY-LINK]",
    location: "Global Remote",
  },

  navigation: [
    { label: "Services", href: "#services" },
    { label: "Solutions", href: "#solutions" },
    { label: "Process", href: "#process" },
    { label: "Work", href: "#work" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ] as NavItem[],

  hero: {
    headline: "Your idea, built into a platform.",
    subheading:
      "Websites, landing pages and business software (CRM, ERP and custom tools), designed and built end to end by one developer.",
    beat1: "I design and build the system.",
    beat1Sub: "Architecture, database models, and tactile interfaces engineered directly with you.",
    beat2: "You run your business on it.",
    beat2Sub: "Operational software and conversion platforms that streamline your daily workflows.",
    primaryCta: "Book a free call",
    secondaryCta: "See my work",
    metrics: [
      { label: "Direct Access", value: "1:1 with builder" },
      { label: "Ownership", value: "100% code IP" },
      { label: "Deliveries", value: "Fixed scope & timeline" },
    ],
  },

  services: {
    web: [
      {
        id: "web-landing",
        title: "Conversion-Focused Landing Pages",
        outcome: "Turn cold visitors into paying buyers with high-converting structural copy and fast layouts.",
        iconName: "Zap",
        mockUiType: "bars",
      },
      {
        id: "web-ads",
        title: "Advertising & Campaign Pages",
        outcome: "Engineered specifically for Google & Meta ad traffic with sub-second loads and A/B test splits.",
        iconName: "Target",
        mockUiType: "chart",
      },
      {
        id: "web-business",
        title: "Modern Business Websites",
        outcome: "Position your company as an undisputed market authority with bespoke typography and layout.",
        iconName: "Globe",
        mockUiType: "toggle",
      },
      {
        id: "web-ecommerce",
        title: "E-Commerce Storefronts",
        outcome: "Headless, lightning-fast storefronts tailored for frictionless checkout and high average cart sizes.",
        iconName: "ShoppingBag",
        mockUiType: "table",
      },
      {
        id: "web-portals",
        title: "Customer & Client Portals",
        outcome: "Secure self-serve hubs where your clients access documents, track tickets, and pay invoices.",
        iconName: "ShieldCheck",
        mockUiType: "kanban",
      },
      {
        id: "web-seo-speed",
        title: "Speed & SEO Makeovers",
        outcome: "Diagnose Core Web Vitals, slash load times under 800ms, and climb local Google rankings.",
        iconName: "Gauge",
        mockUiType: "metric",
      },
    ] as ServiceItem[],

    app: [
      {
        id: "app-crm",
        title: "Custom CRM & Lead Pipeline",
        outcome: "Track leads, auto-assign agents, record touchpoints, and prevent high-value deals slipping away.",
        iconName: "Users",
        mockUiType: "kanban",
      },
      {
        id: "app-erp",
        title: "ERP: Inventory, Purchasing & Billing",
        outcome: "Unify warehouse stock, generate GST/VAT invoices, and track purchase orders in real time.",
        iconName: "Boxes",
        mockUiType: "table",
      },
      {
        id: "app-booking",
        title: "Booking & Appointment Systems",
        outcome: "Automated multi-staff scheduling, calendar sync, deposits, and WhatsApp appointment reminders.",
        iconName: "CalendarClock",
        mockUiType: "bars",
      },
      {
        id: "app-hr-payroll",
        title: "HR, Attendance & Payroll",
        outcome: "Digitize daily staff check-ins, leave approvals, salary slips, and biometric sync effortlessly.",
        iconName: "UserCheck",
        mockUiType: "toggle",
      },
      {
        id: "app-field-tracking",
        title: "Field-Service & Delivery Tracking",
        outcome: "Live GPS trip updates, digital proof-of-delivery signatures, and dispatch coordination.",
        iconName: "Navigation",
        mockUiType: "metric",
      },
      {
        id: "app-dashboards",
        title: "Admin Dashboards & Reporting",
        outcome: "Actionable executive views aggregating revenues, team velocity, and margins without spreadsheets.",
        iconName: "LayoutDashboard",
        mockUiType: "chart",
      },
      {
        id: "app-automation",
        title: "Workflow Automation",
        outcome: "Eliminate repetitive manual busywork by connecting your internal databases, spreadsheets, and emails.",
        iconName: "Workflow",
        mockUiType: "toggle",
      },
      {
        id: "app-integrations",
        title: "API, WhatsApp & Payment Integrations",
        outcome: "Reliable webhook pipes for Stripe, Razorpay, WhatsApp Business API, and legacy databases.",
        iconName: "Webhook",
        mockUiType: "api",
      },
      {
        id: "app-pwa",
        title: "Installable Web Apps (PWA)",
        outcome: "Mobile-responsive platforms that install directly to phones and desktops with offline support.",
        iconName: "Smartphone",
        mockUiType: "pwa",
      },
    ] as ServiceItem[],
  },

  needsSolutions: [
    {
      id: "leads",
      chipLabel: "Get more leads",
      title: "High-Converting Ad Landing Page & Automated Capture System",
      description:
        "Replace slow, generic websites with a focused landing experience that captures verified leads and syncs directly to your WhatsApp and email.",
      included: [
        "Tailored value-proposition copy and conversion architecture",
        "Sub-800ms load time score optimized for Google & Meta Ads",
        "WhatsApp click-to-chat + automated email lead notification",
        "Analytics instrumentation with custom conversion event tracking",
      ],
      timeline: "3 to 5 business days",
      servicePrefill: "Conversion-Focused Landing Pages",
    },
    {
      id: "sales",
      chipLabel: "Track sales",
      title: "Bespoke Sales CRM & Pipeline Tracker",
      description:
        "A customized deal-flow dashboard built around your exact qualification steps, automated follow-ups, and quotation generator.",
      included: [
        "Kanban visual deal stages tailored to your sales process",
        "WhatsApp & email one-click conversation history",
        "Role-based permissions (sales reps vs. managers)",
        "Automated overdue follow-up alerts and quotation export",
      ],
      timeline: "4 to 7 weeks",
      servicePrefill: "Custom CRM & Lead Pipeline",
    },
    {
      id: "inventory",
      chipLabel: "Manage inventory",
      title: "Real-Time Inventory & Multi-Branch Stock Control",
      description:
        "Say goodbye to out-of-sync Excel sheets. Track SKU levels, warehouse movements, purchase orders, and supplier invoices in one place.",
      included: [
        "Barcode/QR code scanning support via mobile camera",
        "Low-stock automated alerts and re-order thresholds",
        "Supplier purchase orders and GST invoice generation",
        "Audit trail for transfers between warehouse and stores",
      ],
      timeline: "6 to 10 weeks",
      servicePrefill: "ERP: Inventory, Purchasing & Billing",
    },
    {
      id: "bookings",
      chipLabel: "Take bookings",
      title: "Self-Service Scheduling & Calendar Engine",
      description:
        "Empower clients to book available slots, pick practitioners, pay advance deposits, and receive automatic reminder notifications.",
      included: [
        "Google Calendar / Outlook bi-directional synchronization",
        "Buffer times between appointments and custom operating hours",
        "Upfront token payments via Stripe / Razorpay",
        "Automated WhatsApp & SMS appointment confirmation links",
      ],
      timeline: "2 to 3 weeks",
      servicePrefill: "Booking & Appointment Systems",
    },
    {
      id: "team",
      chipLabel: "Manage my team",
      title: "Internal Operations, Attendance & Task Management",
      description:
        "A streamlined operational hub for employee check-ins, project milestones, leave approvals, and client deliverables.",
      included: [
        "Geofenced or biometric staff attendance capture",
        "Task assignments with status milestones and document uploads",
        "One-click monthly attendance sheets and payroll summaries",
        "Granular team access controls and security audit log",
      ],
      timeline: "4 to 8 weeks",
      servicePrefill: "HR, Attendance & Payroll",
    },
    {
      id: "sell",
      chipLabel: "Sell online",
      title: "Bespoke Direct-to-Consumer Storefront",
      description:
        "A bespoke e-commerce experience engineered for speed, custom product builders, frictionless payments, and zero monthly SaaS bloat.",
      included: [
        "Lightning-fast product catalog with real-time stock sync",
        "Custom checkout flow with native payment gateway integration",
        "Customer account portal with order tracking history",
        "Order packaging and shipping label generation panel",
      ],
      timeline: "3 to 5 weeks",
      servicePrefill: "E-Commerce Storefronts",
    },
  ] as NeedSolution[],

  industries: [
    {
      id: "clinics",
      title: "Clinics & Healthcare",
      iconName: "Stethoscope",
      description: "Doctors, dental chains, diagnostic labs, and wellness centers.",
      exampleModule: {
        name: "Patient E-Prescription & Slot Booking",
        details: "Secure digital patient history, doctor time-slots, and automated WhatsApp appointment confirmations.",
      },
    },
    {
      id: "retail",
      title: "Retail & Distributors",
      iconName: "Store",
      description: "Wholesale dealers, regional distributors, and specialty retailers.",
      exampleModule: {
        name: "Dealer B2B Ordering Portal",
        details: "Bulk pricing tiers, credit limit checks, order dispatch slips, and live inventory sync.",
      },
    },
    {
      id: "realestate",
      title: "Real Estate & Brokerages",
      iconName: "Building2",
      description: "Property developers, commercial brokers, and rental agencies.",
      exampleModule: {
        name: "Property Inventory & Lead Pipeline",
        details: "Unit availability matrix, floorplan downloads, site-visit scheduler, and broker commission ledger.",
      },
    },
    {
      id: "schools",
      title: "Schools & Coaching",
      iconName: "GraduationCap",
      description: "Private schools, test-prep academies, and training institutes.",
      exampleModule: {
        name: "Fee Management & Parent Hub",
        details: "Automated fee receipts, installment reminders, student attendance, and exam marks report cards.",
      },
    },
    {
      id: "logistics",
      title: "Logistics & Transport",
      iconName: "Truck",
      description: "Freight forwarders, fleet operators, and courier networks.",
      exampleModule: {
        name: "Waybill & Consignment Tracking",
        details: "Driver trip logs, electronic proof of delivery with signature, and customer tracking portals.",
      },
    },
    {
      id: "restaurants",
      title: "Restaurants & Cafes",
      iconName: "Utensils",
      description: "Multi-outlet brands, catering firms, and central kitchens.",
      exampleModule: {
        name: "Central Kitchen Order Manager",
        details: "Daily ingredient requisition from outlets, recipe costing, and catering event timelines.",
      },
    },
    {
      id: "manufacturing",
      title: "Manufacturing Units",
      iconName: "Factory",
      description: "Machining shops, packaging plants, and industrial fabricators.",
      exampleModule: {
        name: "Job Card & Production Status",
        details: "Stage-by-stage work order tracking, machine downtime logs, and raw material issue notes.",
      },
    },
    {
      id: "agencies",
      title: "Agencies & Consultants",
      iconName: "Briefcase",
      description: "Creative studios, legal practices, and accounting advisors.",
      exampleModule: {
        name: "Client Deliverable & Retainer Portal",
        details: "Milestone approvals, client file uploads, time logging, and automated monthly retainer invoices.",
      },
    },
  ] as IndustryItem[],

  process: [
    {
      step: "01",
      title: "Discover",
      duration: "Days 1–3",
      description:
        "We dissect your existing business bottlenecks, manual spreadsheets, and customer journey to define exact scope.",
      deliverables: [
        "Clear functional specification document",
        "Database entity schema and workflow map",
        "Fixed-price quote with agreed milestone dates",
      ],
    },
    {
      step: "02",
      title: "Design",
      duration: "Week 1",
      description:
        "Wireframes and tactile UI prototypes built around the clay design system, tested for intuitive daily team usage.",
      deliverables: [
        "Full interactive Figma prototype",
        "Design tokens & custom typography system",
        "Mobile and desktop responsive layouts",
      ],
    },
    {
      step: "03",
      title: "Build",
      duration: "Weeks 2–6",
      description:
        "Clean, typed code written in Next.js, React, and robust backend services. No bloated templates or unmaintained plugins.",
      deliverables: [
        "Weekly working staging link for you to test",
        "Automated validation and test suites",
        "Secure database & third-party API integration",
      ],
    },
    {
      step: "04",
      title: "Launch",
      duration: "Launch Day",
      description:
        "Domain configuration, production database deployment, SSL certificates, analytics tagging, and staff onboarding.",
      deliverables: [
        "Live production deployment with zero downtime",
        "Custom Loom video walkthroughs for your staff",
        "Backup protocol and uptime monitoring configured",
      ],
    },
    {
      step: "05",
      title: "Support",
      duration: "30 Days Included",
      description:
        "A 30-day warranty period for bug fixes, performance tuning, and hands-on assistance as your team uses the system.",
      deliverables: [
        "Direct WhatsApp & email emergency channel",
        "Complete Git repository transfer & ownership",
        "Optional low-cost monthly evolution retainer",
      ],
    },
  ] as ProcessStep[],

  work: [
    {
      id: "work-crm",
      title: "Custom CRM for Commercial Real Estate",
      industry: "Real Estate & Brokerage",
      problem:
        "A 14-agent property firm was losing high-ticket leasing deals because inquiries were scattered across personal WhatsApp chats and unorganized Excel sheets.",
      solution:
        "Built a central web app featuring a visual property inventory grid, auto-capture of portal leads, agent assignments, and auto-generated PDF proposals.",
      result:
        "Team response time dropped from 8 hours to 9 minutes. The firm closed 42 additional deals within the first quarter of deployment.",
      metrics: ["[42 New Deals Closed]", "[-85% Lead Response Time]"],
      previewType: "crm",
    },
    {
      id: "work-erp",
      title: "ERP for Wholesale FMCG Distribution",
      industry: "Wholesale & Distribution",
      problem:
        "Manual invoice reconciliation between 3 warehouses and 250 retailer accounts caused severe stock discrepancies and delayed billing cycles by days.",
      solution:
        "Engineered a unified inventory, billing, and dispatch ERP with offline barcode scanning, GST compliance, and real-time ledger accounting.",
      result:
        "Eliminated inventory reconciliation errors entirely. Reduced month-end accounts closure time from 6 business days to under 4 hours.",
      metrics: ["[-94% Billing Delays]", "[Zero Stock Discrepancy]"],
      previewType: "erp",
    },
    {
      id: "work-landing",
      title: "High-Ticket Campaign Landing Page",
      industry: "Industrial Tech & Equipment",
      problem:
        "Paid ad campaigns on Google were burning budget with a 1.2% inquiry rate because their legacy corporate website took 4.5 seconds to load on mobile.",
      solution:
        "Rebuilt the campaign experience as an ultra-fast, single-purpose landing page with interactive ROI calculator and friction-free inquiry capture.",
      result:
        "Lighthouse performance hit 99. Cost per qualified acquisition fell by 58%, while qualified inbound leads more than doubled.",
      metrics: ["[-58% Cost Per Lead]", "[+130% Qualified Inquiries]"],
      previewType: "landing",
    },
    {
      id: "work-booking",
      title: "Multi-Specialty Clinic Booking System",
      industry: "Healthcare & Dental Care",
      problem:
        "Front-desk staff spent 4 hours every day on telephone bookings, with frequent double-bookings and a 22% patient no-show rate.",
      solution:
        "Created an intuitive booking portal allowing patients to select specific doctors, pick real-time slots, and receive automated WhatsApp reminders.",
      result:
        "Patient no-show rate plummeted to under 4%. Front-desk call volume halved, freeing staff to focus on patient hospital care.",
      metrics: ["[-80% Patient No-Shows]", "[4hrs/day Saved Staff Time]"],
      previewType: "booking",
    },
  ] as CaseStudy[],

  packages: [
    {
      id: "pkg-landing",
      name: "Landing Page Sprint",
      timeline: "3 to 5 business days",
      price: "[PRICE]",
      description: "For founders and businesses launching a new campaign, offer, or product that needs immediate conversions.",
      isPopular: false,
      features: [
        "Custom design in the warm Clay design system",
        "Sub-second loading speed score (95+ Core Web Vitals)",
        "Mobile-first responsive layout with lead capture",
        "Google Analytics 4 & Meta Pixel setup",
        "14-day post-launch warranty and bug fixes",
      ],
      cta: "Choose Landing Page",
      servicePrefill: "Conversion-Focused Landing Pages",
    },
    {
      id: "pkg-website",
      name: "Business Website",
      timeline: "2 to 3 weeks",
      price: "[PRICE]",
      description: "For established businesses needing a modern, authoritative digital footprint to attract corporate clients.",
      isPopular: false,
      features: [
        "Up to 8 custom-designed pages & service showcases",
        "Technical SEO optimization & schema markup",
        "Interactive contact & inquiry forms with WhatsApp hooks",
        "Customer testimonial & case study modules",
        "30-day post-launch warranty & staff walkthrough",
      ],
      cta: "Choose Business Website",
      servicePrefill: "Modern Business Websites",
    },
    {
      id: "pkg-custom-app",
      name: "Custom CRM or ERP",
      timeline: "6 to 12 weeks",
      price: "[PRICE]",
      description: "For growing businesses wanting bespoke operational software built specifically around their real workflows.",
      isPopular: true,
      features: [
        "Full relational database schema & authentication system",
        "Custom modules (Inventory, Lead Pipeline, Invoicing, Billing)",
        "Role-based access control (Admin, Manager, Staff)",
        "WhatsApp, Email, & Payment Gateway integrations",
        "60-day warranty, full source code ownership & training",
      ],
      cta: "Choose Custom Software",
      servicePrefill: "Custom CRM & Lead Pipeline",
    },
    {
      id: "pkg-retainer",
      name: "Monthly Retainer",
      timeline: "Ongoing partnership",
      price: "[PRICE]",
      description: "For companies that need a dedicated senior full-stack engineer on call to continuously iterate and support their software.",
      isPopular: false,
      features: [
        "Dedicated development hours every month",
        "Continuous feature builds & database optimizations",
        "Priority 4-hour response time for critical issues",
        "Automated weekly security updates & server backups",
        "Cancel or pause anytime with 15 days notice",
      ],
      cta: "Discuss Retainer",
      servicePrefill: "Monthly Retainer",
    },
  ] as PackageItem[],

  whyMe: [
    {
      id: "proof-direct",
      number: "01",
      title: "Direct communication with the person building it",
      description:
        "No account managers, no junior handoffs, and no telephone game. Every design decision and line of code is handled directly with you.",
      iconName: "MessageSquare",
    },
    {
      id: "proof-scope",
      number: "02",
      title: "Fixed scope and clear milestones",
      description:
        "We agree on exact deliverables and delivery dates before starting. No surprise hourly invoices, no scope creep, and no budget overruns.",
      iconName: "CheckCircle2",
    },
    {
      id: "proof-ownership",
      number: "03",
      title: "You own 100% of the source code",
      description:
        "Zero platform lock-in. Full repository rights, intellectual property ownership, and database credentials belong exclusively to your company.",
      iconName: "Shield",
    },
    {
      id: "proof-support",
      number: "04",
      title: "Dedicated post-launch warranty",
      description:
        "I don't disappear after deployment. Every project includes an agreed post-launch warranty period, live video staff training, and thorough documentation.",
      iconName: "HeartHandshake",
    },
    {
      id: "proof-fast",
      number: "05",
      title: "Rapid, production-ready delivery",
      description:
        "By leveraging battle-tested architecture, typed code, and modern tools, I ship high-performance software in weeks rather than agency quarters.",
      iconName: "Rocket",
    },
  ] as ProofPoint[],

  techStack: [
    { name: "Next.js", category: "Full-Stack Framework" },
    { name: "React", category: "Frontend UI" },
    { name: "TypeScript", category: "Type Safety" },
    { name: "Node.js", category: "Backend Runtime" },
    { name: "PostgreSQL", category: "Relational Database" },
    { name: "Python", category: "Data & Automation" },
    { name: "REST & GraphQL", category: "API Architecture" },
    { name: "Docker", category: "Containerization" },
    { name: "Vercel & Netlify", category: "Cloud Deployment" },
  ] as TechItem[],

  about: {
    title: "About the Builder",
    headline: "Senior engineering meets product intuition.",
    paragraph1:
      "I am a senior full-stack developer and product designer who partners with ambitious business owners. Over years of building web applications and business systems, I observed that agencies overcharge for bloated teams, while freelancers often lack the architectural rigor to build reliable software.",
    paragraph2:
      "I operate as your personal engineering arm. From initial architecture diagrams to production database migrations and pixel-perfect interfaces, I take complete responsibility for your technical roadmap so you can focus on growing your business.",
    stats: [
      { label: "Code Quality", value: "100% Typed" },
      { label: "Architecture", value: "Zero Bloat" },
      { label: "IP Ownership", value: "100% Yours" },
    ],
  },

  faq: [
    {
      id: "faq-pricing",
      question: "How do your fixed prices and payments work?",
      answer:
        "Every project is scoped with a clear, fixed price quote before work begins. Payments are structured across verifiable milestones (typically 40% upfront deposit, 30% upon approval of working staging preview, and 30% upon successful final deployment). No unexpected hourly overages ever.",
    },
    {
      id: "faq-timeline",
      question: "How fast can my project go live?",
      answer:
        "Landing page sprints launch in 3 to 5 business days. Complete business websites take 2 to 3 weeks. Custom CRMs, ERPs, and internal business platforms take between 6 to 12 weeks depending on database complexity and custom integrations.",
    },
    {
      id: "faq-ownership",
      question: "Do I truly own 100% of the code and intellectual property?",
      answer:
        "Yes, absolutely. Upon final payment, full intellectual property and ownership rights of all source code, database schemas, Figma designs, and deployment configurations are transferred to you. There are zero ongoing licensing fees or proprietary locks.",
    },
    {
      id: "faq-maintenance",
      question: "What happens after the site or app launches?",
      answer:
        "Every build includes a complimentary post-launch support and warranty window (14 to 60 days depending on project size) to resolve any edge-case bugs and ensure smooth team adoption. After that, you can either manage it independently or retain me on a monthly retainer for ongoing evolution.",
    },
    {
      id: "faq-revisions",
      question: "How do revisions work during the build process?",
      answer:
        "You receive interactive staging previews at every major stage (wireframe, UI prototype, functional staging build). Feedback is incorporated iteratively throughout the process so there are never surprises on delivery day.",
    },
    {
      id: "faq-requirements",
      question: "What do you need from me before we can start?",
      answer:
        "Just a clear explanation of what problem you are solving, your current process (spreadsheets or existing tools), and your business objectives. We will walk through everything step by step on our initial discovery call.",
    },
  ] as FaqItem[],

  contact: {
    headline: "Have an idea or a workflow that needs building? Let's talk.",
    subheading:
      "Direct answers within 24 hours. No sales reps, no agency markups — speak directly with the developer who will build your platform.",
    serviceOptions: [
      "Conversion-Focused Landing Pages",
      "Advertising & Campaign Pages",
      "Modern Business Websites",
      "E-Commerce Storefronts",
      "Custom CRM & Lead Pipeline",
      "ERP: Inventory, Purchasing & Billing",
      "Booking & Appointment Systems",
      "HR, Attendance & Payroll",
      "Admin Dashboards & Reporting",
      "Monthly Retainer",
      "Other Custom Project",
    ],
    budgetRanges: [
      "Under $1,500 (Landing Page Sprint)",
      "$1,500 – $4,000 (Website / Mini Tool)",
      "$4,000 – $10,000 (Custom CRM / App)",
      "$10,000+ (Comprehensive Enterprise ERP)",
      "Ongoing Monthly Retainer",
    ],
  },

  footer: {
    columns: [
      {
        title: "Navigation",
        links: [
          { label: "Web Services", href: "#services" },
          { label: "App Services", href: "#services" },
          { label: "Solutions", href: "#solutions" },
          { label: "Industries", href: "#industries" },
          { label: "Process", href: "#process" },
        ],
      },
      {
        title: "Offerings",
        links: [
          { label: "Selected Work", href: "#work" },
          { label: "Packages & Pricing", href: "#pricing" },
          { label: "Why Work With Me", href: "#why-me" },
          { label: "Technology Stack", href: "#tech-stack" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        title: "Direct Contact",
        links: [
          { label: "Book a Discovery Call", href: "#contact" },
          { label: "WhatsApp Chat", href: "https://wa.me/919876543210" },
          { label: "Email Directly", href: "mailto:abhishek@farandestudio.com" },
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} Farande Studio. All rights reserved. Designed & built with care.`,
  },
};
