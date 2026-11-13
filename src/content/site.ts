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
  outcome: string;
  modules: string[];
  previewType: "crm" | "erp" | "landing" | "booking";
}

export interface PackageItem {
  id: string;
  name: string;
  timeline: string;
  /** Leave empty to show "Quoted after a call" instead of a number. */
  price?: string;
  description: string;
  isPopular?: boolean;
  features: string[];
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

// Public contact details come from the environment (see .env.example) so they never live in source.
// Any value left blank hides the matching link across the site.
const EMAIL = process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() ?? "";
const WHATSAPP_DIGITS = (process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "").replace(/\D/g, "");
const WHATSAPP_LINK = WHATSAPP_DIGITS
  ? `https://wa.me/${WHATSAPP_DIGITS}?text=Hi%20Omtech%2C%20I%27d%20like%20to%20talk%20about%20a%20project`
  : "";
const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL?.trim() || "http://localhost:3000").replace(/\/$/, "");

export const siteConfig = {
  brand: {
    name: "Omtech Modern Solutions",
    shortName: "Omtech",
    monogram: "O",
    descriptor: "Websites & business software",
    tagline: "Websites and business software for companies that want to work better.",
    // Used for SEO metadata, sitemap and robots.txt.
    siteUrl: SITE_URL,
    founder: "Abhishek Farande",
    founderRole: "Founder",
    availability: "Taking on new projects",
    responseTime: "We reply within one working day",
    email: EMAIL,
    whatsappLink: WHATSAPP_LINK,
    calendlyLink: process.env.NEXT_PUBLIC_CALENDLY_URL?.trim() ?? "",
    location: "India · working with clients remotely",
  },

  navigation: [
    { label: "Services", href: "#services" },
    { label: "Solutions", href: "#solutions" },
    { label: "Process", href: "#process" },
    { label: "Examples", href: "#work" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ] as NavItem[],

  hero: {
    headline: "Websites and software that fit how you work.",
    subheading:
      "We design and build websites, landing pages and business tools like CRMs, ERPs and booking systems for small and growing companies.",
    beat1: "We plan it and build it with you.",
    beat1Sub: "From the first conversation to the database and screens your team will use every day.",
    beat2: "Your team runs the business on it.",
    beat2Sub: "Fewer spreadsheets, fewer missed follow-ups, and one place to see what is going on.",
    primaryCta: "Book a free call",
    secondaryCta: "See examples",
    metrics: [
      { label: "You talk to", value: "the people building it" },
      { label: "You own", value: "all the code" },
      { label: "You get", value: "a fixed scope and dates" },
    ],
  },

  services: {
    web: [
      {
        id: "web-landing",
        title: "Landing pages",
        outcome: "One page, one offer, one clear next step. Built to load fast and turn visitors into enquiries.",
        iconName: "Zap",
        mockUiType: "bars",
      },
      {
        id: "web-ads",
        title: "Pages for ad campaigns",
        outcome: "Pages made for Google and Meta ad traffic, with tracking set up so you can see what each click costs you.",
        iconName: "Target",
        mockUiType: "chart",
      },
      {
        id: "web-business",
        title: "Business websites",
        outcome: "A clear, well-written site that explains what you do and makes it easy for customers to get in touch.",
        iconName: "Globe",
        mockUiType: "toggle",
      },
      {
        id: "web-ecommerce",
        title: "Online stores",
        outcome: "A store with a simple checkout, stock that stays in sync, and no monthly platform fees you don't need.",
        iconName: "ShoppingBag",
        mockUiType: "table",
      },
      {
        id: "web-portals",
        title: "Customer portals",
        outcome: "A login area where your clients can download documents, raise requests and pay invoices themselves.",
        iconName: "ShieldCheck",
        mockUiType: "kanban",
      },
      {
        id: "web-seo-speed",
        title: "Speed and SEO fixes",
        outcome: "We find what's slowing your current site down and fix it, along with the basics of local search.",
        iconName: "Gauge",
        mockUiType: "metric",
      },
    ] as ServiceItem[],

    app: [
      {
        id: "app-crm",
        title: "CRM and sales pipeline",
        outcome: "Every lead in one place, with owners, follow-up dates and the full conversation history.",
        iconName: "Users",
        mockUiType: "kanban",
      },
      {
        id: "app-erp",
        title: "Inventory, purchasing and billing",
        outcome: "Stock across locations, purchase orders and GST invoices, all kept in step with each other.",
        iconName: "Boxes",
        mockUiType: "table",
      },
      {
        id: "app-booking",
        title: "Booking and appointments",
        outcome: "Customers pick a time online, pay a deposit if needed, and get a reminder on WhatsApp.",
        iconName: "CalendarClock",
        mockUiType: "bars",
      },
      {
        id: "app-hr-payroll",
        title: "Attendance, leave and payroll",
        outcome: "Staff check-ins, leave requests and monthly salary summaries without the paperwork.",
        iconName: "UserCheck",
        mockUiType: "toggle",
      },
      {
        id: "app-field-tracking",
        title: "Delivery and field-staff tracking",
        outcome: "See where jobs and deliveries are, and collect a signature or photo when they're done.",
        iconName: "Navigation",
        mockUiType: "metric",
      },
      {
        id: "app-dashboards",
        title: "Dashboards and reports",
        outcome: "Sales, collections and team workload on one screen, instead of rebuilt in Excel every month.",
        iconName: "LayoutDashboard",
        mockUiType: "chart",
      },
      {
        id: "app-automation",
        title: "Workflow automation",
        outcome: "Hand the repetitive copy-paste work between sheets, email and your systems to software.",
        iconName: "Workflow",
        mockUiType: "toggle",
      },
      {
        id: "app-integrations",
        title: "WhatsApp, payment and API integrations",
        outcome: "Connect Razorpay, Stripe, WhatsApp Business and the tools you already use.",
        iconName: "Webhook",
        mockUiType: "api",
      },
      {
        id: "app-pwa",
        title: "Installable web apps",
        outcome: "Apps your team can add to their phone's home screen, with no app store required.",
        iconName: "Smartphone",
        mockUiType: "pwa",
      },
    ] as ServiceItem[],
  },

  needsSolutions: [
    {
      id: "leads",
      chipLabel: "Get more leads",
      title: "A landing page that turns ad clicks into enquiries",
      description:
        "A fast, focused page for your offer. Every enquiry lands in your inbox and on WhatsApp so nothing gets missed.",
      included: [
        "Page structure and copy written around your offer",
        "Fast loading on mobile, where most ad traffic comes from",
        "WhatsApp button and email alert for every new enquiry",
        "Google Analytics and Meta Pixel set up to track enquiries",
      ],
      timeline: "About 1 week",
      servicePrefill: "Landing pages",
    },
    {
      id: "sales",
      chipLabel: "Track sales",
      title: "A simple CRM built around your sales process",
      description:
        "Your stages, your fields, your follow-up rules. Your team sees what needs doing today, and you see the whole pipeline.",
      included: [
        "Deal board with the stages your team already uses",
        "Notes, calls and messages saved against each lead",
        "Separate access for sales staff and managers",
        "Reminders for overdue follow-ups, and quotation export",
      ],
      timeline: "4 to 7 weeks",
      servicePrefill: "CRM and sales pipeline",
    },
    {
      id: "inventory",
      chipLabel: "Manage inventory",
      title: "Stock control across your warehouse and stores",
      description:
        "Replace the stock sheets that never match. Track items, transfers, purchase orders and supplier bills in one system.",
      included: [
        "Barcode and QR scanning with a phone camera",
        "Low-stock alerts and re-order levels",
        "Purchase orders and GST invoices",
        "A record of every stock transfer between locations",
      ],
      timeline: "6 to 10 weeks",
      servicePrefill: "Inventory, purchasing and billing",
    },
    {
      id: "bookings",
      chipLabel: "Take bookings",
      title: "Online booking that cuts down phone calls",
      description:
        "Customers choose a service, a staff member and a time slot. Deposits and reminders are handled automatically.",
      included: [
        "Two-way sync with Google Calendar or Outlook",
        "Working hours, breaks and buffer time between slots",
        "Advance payments through Razorpay or Stripe",
        "Booking confirmations and reminders on WhatsApp or SMS",
      ],
      timeline: "2 to 3 weeks",
      servicePrefill: "Booking and appointments",
    },
    {
      id: "team",
      chipLabel: "Manage my team",
      title: "Attendance, tasks and leave in one place",
      description:
        "Know who is in, what they are working on, and what is pending, without chasing people on WhatsApp groups.",
      included: [
        "Attendance by location check or biometric device",
        "Tasks with due dates, status and file uploads",
        "Monthly attendance sheets ready for payroll",
        "Role-based access and a log of who changed what",
      ],
      timeline: "4 to 8 weeks",
      servicePrefill: "Attendance, leave and payroll",
    },
    {
      id: "sell",
      chipLabel: "Sell online",
      title: "Your own online store",
      description:
        "A store you own outright, with a quick checkout and an admin panel your team can actually use.",
      included: [
        "Product catalogue with live stock levels",
        "Checkout with your preferred payment gateway",
        "Customer accounts with order history",
        "Order packing and shipping label screen",
      ],
      timeline: "3 to 5 weeks",
      servicePrefill: "Online stores",
    },
  ] as NeedSolution[],

  industries: [
    {
      id: "clinics",
      title: "Clinics & healthcare",
      iconName: "Stethoscope",
      description: "Doctors, dental clinics, labs and wellness centres.",
      exampleModule: {
        name: "Appointments and patient records",
        details: "Doctor-wise time slots, patient history and WhatsApp appointment reminders.",
      },
    },
    {
      id: "retail",
      title: "Retail & distribution",
      iconName: "Store",
      description: "Wholesalers, distributors and specialty shops.",
      exampleModule: {
        name: "Dealer ordering portal",
        details: "Dealer-specific prices, credit limits, dispatch slips and live stock.",
      },
    },
    {
      id: "realestate",
      title: "Real estate",
      iconName: "Building2",
      description: "Developers, brokers and rental agencies.",
      exampleModule: {
        name: "Property listings and leads",
        details: "Unit availability, brochure downloads, site-visit booking and broker commissions.",
      },
    },
    {
      id: "schools",
      title: "Schools & coaching",
      iconName: "GraduationCap",
      description: "Schools, coaching classes and training institutes.",
      exampleModule: {
        name: "Fees and parent updates",
        details: "Fee receipts, instalment reminders, attendance and report cards.",
      },
    },
    {
      id: "logistics",
      title: "Logistics & transport",
      iconName: "Truck",
      description: "Transporters, fleet owners and courier services.",
      exampleModule: {
        name: "Consignment tracking",
        details: "Trip logs for drivers, proof of delivery and a tracking page for customers.",
      },
    },
    {
      id: "restaurants",
      title: "Restaurants & cafés",
      iconName: "Utensils",
      description: "Restaurant groups, caterers and central kitchens.",
      exampleModule: {
        name: "Central kitchen orders",
        details: "Daily outlet requisitions, recipe costing and catering event schedules.",
      },
    },
    {
      id: "manufacturing",
      title: "Manufacturing",
      iconName: "Factory",
      description: "Workshops, packaging units and fabricators.",
      exampleModule: {
        name: "Job cards and production status",
        details: "Work order stages, machine downtime and raw material issue slips.",
      },
    },
    {
      id: "agencies",
      title: "Agencies & consultants",
      iconName: "Briefcase",
      description: "Design studios, CA firms and legal practices.",
      exampleModule: {
        name: "Client work and retainers",
        details: "Approvals, file sharing, time logs and monthly retainer invoices.",
      },
    },
  ] as IndustryItem[],

  process: [
    {
      step: "01",
      title: "Understand",
      duration: "Days 1–3",
      description:
        "We look at how you work today, including the sheets, the WhatsApp groups and the manual steps, and agree on what to build first.",
      deliverables: [
        "A written scope in plain language",
        "A map of the screens and data involved",
        "A fixed quote with milestone dates",
      ],
    },
    {
      step: "02",
      title: "Design",
      duration: "Week 1",
      description:
        "You see and click through the main screens before any code is written, so changes are cheap.",
      deliverables: [
        "Clickable design of the key screens",
        "Mobile and desktop layouts",
        "Your sign-off before we build",
      ],
    },
    {
      step: "03",
      title: "Build",
      duration: "Weeks 2–6",
      description:
        "We build in small pieces and share a working test link every week, so you're never waiting until the end to see progress.",
      deliverables: [
        "A test link updated every week",
        "Integrations with your payment, email or WhatsApp tools",
        "Testing of the important flows",
      ],
    },
    {
      step: "04",
      title: "Launch",
      duration: "Launch week",
      description:
        "We set up the domain, hosting, backups and analytics, then walk your team through the system.",
      deliverables: [
        "Live site or app on your domain",
        "Recorded walkthrough videos for your staff",
        "Backups and uptime alerts switched on",
      ],
    },
    {
      step: "05",
      title: "Support",
      duration: "30 days included",
      description:
        "For the first month after launch, we fix bugs and help your team settle in, at no extra cost.",
      deliverables: [
        "Direct WhatsApp and email support",
        "Full code and account handover",
        "Optional monthly plan for ongoing work",
      ],
    },
  ] as ProcessStep[],

  work: [
    {
      id: "work-crm",
      title: "Lead tracking for a property brokerage",
      industry: "Real estate",
      problem:
        "Enquiries come in from property portals, calls and WhatsApp. Each agent keeps their own notes, so leads go cold and nobody can see the full pipeline.",
      solution:
        "A shared CRM where portal leads are captured automatically, assigned to an agent, and followed up on a schedule. Agents can send a proposal PDF in a couple of clicks.",
      outcome: "Every lead has an owner and a next step, and the manager can see the pipeline without asking around.",
      modules: ["Lead capture", "Agent assignment", "Follow-up reminders", "Proposal PDFs"],
      previewType: "crm",
    },
    {
      id: "work-erp",
      title: "Stock and billing for a distributor",
      industry: "Wholesale & distribution",
      problem:
        "Three warehouses each keep their own stock sheets. Invoices are matched by hand at month end, which takes days and still leaves mismatches.",
      solution:
        "One system for stock, dispatch and GST billing, with barcode scanning on the warehouse floor and ledgers that update as invoices are raised.",
      outcome: "Stock and billing come from the same data, so month-end becomes a check rather than a rebuild.",
      modules: ["Multi-location stock", "Barcode scanning", "GST invoicing", "Party ledgers"],
      previewType: "erp",
    },
    {
      id: "work-landing",
      title: "Campaign page for an interior design studio",
      industry: "Interior design",
      problem:
        "Instagram and Google ads send people to a slow portfolio website with no clear next step, so most visitors leave before asking for a quote.",
      solution:
        "A single fast page for the campaign with the studio's best work, a short free-quote form and proper conversion tracking.",
      outcome: "The ads land on a page made for them, and you can see exactly which campaigns bring in quote requests.",
      modules: ["Campaign landing page", "Free-quote form", "WhatsApp alerts", "Ad conversion tracking"],
      previewType: "landing",
    },
    {
      id: "work-booking",
      title: "Online booking for a multi-doctor clinic",
      industry: "Healthcare",
      problem:
        "The front desk spends hours on the phone booking appointments, double bookings happen, and many patients forget to turn up.",
      solution:
        "A booking page where patients choose a doctor and a free slot, plus automatic WhatsApp reminders the day before.",
      outcome: "Fewer calls for reception, a calendar the doctors can trust, and patients reminded before they forget.",
      modules: ["Doctor-wise slots", "Online booking", "WhatsApp reminders", "Reception view"],
      previewType: "booking",
    },
  ] as CaseStudy[],

  packages: [
    {
      id: "pkg-landing",
      name: "Landing page",
      timeline: "About 1 week",
      price: "",
      description: "For a new offer, product or ad campaign that needs one focused page.",
      isPopular: false,
      features: [
        "Custom design and copy for your offer",
        "Fast loading on mobile",
        "Enquiry form with email and WhatsApp alerts",
        "Google Analytics and Meta Pixel set up",
        "14 days of fixes after launch",
      ],
      cta: "Ask about a landing page",
      servicePrefill: "Landing pages",
    },
    {
      id: "pkg-website",
      name: "Business website",
      timeline: "2 to 3 weeks",
      price: "",
      description: "For businesses that need a proper website that explains what they do.",
      isPopular: false,
      features: [
        "Up to 8 pages",
        "On-page SEO and Google Business basics",
        "Contact forms linked to email and WhatsApp",
        "Sections for testimonials and past work",
        "30 days of fixes and a handover session",
      ],
      cta: "Ask about a website",
      servicePrefill: "Business websites",
    },
    {
      id: "pkg-custom-app",
      name: "Custom CRM or ERP",
      timeline: "6 to 12 weeks",
      price: "",
      description: "For businesses that have outgrown spreadsheets and need software built around their own process.",
      isPopular: true,
      features: [
        "Logins with separate access for admin, managers and staff",
        "The modules you need: leads, stock, invoices, bookings",
        "WhatsApp, email and payment integrations",
        "Staff training and walkthrough videos",
        "60 days of support and full code handover",
      ],
      cta: "Ask about custom software",
      servicePrefill: "CRM and sales pipeline",
    },
    {
      id: "pkg-retainer",
      name: "Monthly support",
      timeline: "Ongoing",
      price: "",
      description: "For teams that want someone looking after their site or software every month.",
      isPopular: false,
      features: [
        "A set number of development hours each month",
        "New features and improvements as you need them",
        "Same-day response for anything urgent",
        "Updates, backups and monitoring",
        "Pause or stop with 15 days' notice",
      ],
      cta: "Ask about monthly support",
      servicePrefill: "Monthly support",
    },
  ] as PackageItem[],

  whyUs: [
    {
      id: "proof-direct",
      number: "01",
      title: "You talk to the people building it",
      description:
        "No account managers in between. The person you explain your problem to is the person writing the code.",
      iconName: "MessageSquare",
    },
    {
      id: "proof-scope",
      number: "02",
      title: "Fixed scope, fixed price",
      description:
        "We agree on what's being built, what it costs and when it's ready before we start. No surprise hourly bills.",
      iconName: "CheckCircle2",
    },
    {
      id: "proof-ownership",
      number: "03",
      title: "You own everything",
      description:
        "The code, the database, the domain and the hosting accounts are in your name. If you ever want to move on, you can.",
      iconName: "Shield",
    },
    {
      id: "proof-support",
      number: "04",
      title: "We stay after launch",
      description:
        "Every project includes a support period, staff training and written notes on how things work.",
      iconName: "HeartHandshake",
    },
    {
      id: "proof-fast",
      number: "05",
      title: "Small team, quick turnaround",
      description:
        "A small team means fewer meetings and shorter feedback loops. Most projects go live in weeks, not months.",
      iconName: "Rocket",
    },
  ] as ProofPoint[],

  techStack: [
    { name: "Next.js", category: "Web framework" },
    { name: "React", category: "User interface" },
    { name: "TypeScript", category: "Language" },
    { name: "Node.js", category: "Backend" },
    { name: "PostgreSQL", category: "Database" },
    { name: "Python", category: "Data & automation" },
    { name: "REST & GraphQL", category: "APIs" },
    { name: "Docker", category: "Deployment" },
    { name: "Vercel & Netlify", category: "Hosting" },
  ] as TechItem[],

  about: {
    title: "About Omtech",
    headline: "A small team that builds practical software.",
    paragraphs: [
      "Omtech Modern Solutions builds websites and internal tools for small and mid-sized businesses. We focus on the problems that hold small teams back: work stuck in spreadsheets and WhatsApp groups, and websites that don't bring in enquiries.",
      "We keep the team small on purpose. You deal directly with the people designing and building your project, from the first call through to launch and support afterwards.",
    ],
    principles: [
      { label: "Plain-language updates", value: "Weekly" },
      { label: "Code ownership", value: "Yours" },
      { label: "Support after launch", value: "Included" },
    ],
  },

  faq: [
    {
      id: "faq-pricing",
      question: "How does pricing and payment work?",
      answer:
        "After a short call, we send a fixed quote for the agreed scope. Payment is usually split into three parts: 40% to start, 30% when you approve the working test version, and 30% at launch. If the scope changes, we agree on the change in writing before doing the work.",
    },
    {
      id: "faq-timeline",
      question: "How long does a project take?",
      answer:
        "A landing page usually takes about a week. A business website takes 2 to 3 weeks. Custom software like a CRM or ERP usually takes 6 to 12 weeks, depending on how many modules and integrations it needs.",
    },
    {
      id: "faq-ownership",
      question: "Will I own the code?",
      answer:
        "Yes. Once the project is paid for, the source code, designs, database and hosting accounts are all yours. There are no licence fees, and you're free to have anyone else work on it later.",
    },
    {
      id: "faq-maintenance",
      question: "What happens after launch?",
      answer:
        "Every project includes a free support period (14 to 60 days depending on size) to fix bugs and help your team get used to the system. After that, you can manage it yourself or choose a monthly support plan.",
    },
    {
      id: "faq-revisions",
      question: "Can I ask for changes while it's being built?",
      answer:
        "Yes. You see the design before we build, then a working test link every week. Feedback goes in as we go, so there are no surprises at the end.",
    },
    {
      id: "faq-requirements",
      question: "What do you need from me to get started?",
      answer:
        "Just an idea of the problem you want to solve and how you handle it today, even if it's a messy spreadsheet. We'll work out the details together on the first call.",
    },
  ] as FaqItem[],

  contact: {
    headline: "Tell us what you need.",
    subheading:
      "Send a few lines about your business and what you want to build. We'll reply within one working day with questions or next steps.",
    serviceOptions: [
      "Landing pages",
      "Pages for ad campaigns",
      "Business websites",
      "Online stores",
      "CRM and sales pipeline",
      "Inventory, purchasing and billing",
      "Booking and appointments",
      "Attendance, leave and payroll",
      "Dashboards and reports",
      "Monthly support",
      "Something else",
    ],
    budgetRanges: [
      "Under ₹50,000",
      "₹50,000 – ₹1,50,000",
      "₹1,50,000 – ₹5,00,000",
      "Above ₹5,00,000",
      "Monthly support",
      "Not sure yet",
    ],
  },

  footer: {
    columns: [
      {
        title: "Services",
        links: [
          { label: "Websites", href: "#services" },
          { label: "Business software", href: "#services" },
          { label: "Solutions", href: "#solutions" },
          { label: "Industries", href: "#industries" },
          { label: "How we work", href: "#process" },
        ],
      },
      {
        title: "Company",
        links: [
          { label: "Example projects", href: "#work" },
          { label: "Pricing", href: "#pricing" },
          { label: "Why Omtech", href: "#why-us" },
          { label: "About", href: "#about" },
          { label: "FAQ", href: "#faq" },
        ],
      },
      {
        title: "Contact",
        links: [
          { label: "Send an enquiry", href: "#contact" },
          ...(WHATSAPP_DIGITS ? [{ label: "WhatsApp", href: `https://wa.me/${WHATSAPP_DIGITS}` }] : []),
          ...(EMAIL ? [{ label: "Email us", href: `mailto:${EMAIL}` }] : []),
        ],
      },
    ],
    copyright: `© ${new Date().getFullYear()} Omtech Modern Solutions. All rights reserved.`,
  },
};
