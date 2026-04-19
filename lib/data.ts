export const profile = {
  name: "Nikhil Tayal",
  role: "Senior Full-Stack Developer",
  location: "Delhi, India",
  email: "nikhiltayal9211@gmail.com",
  phone: "+91 9873327914",
  linkedin: "https://linkedin.com/in/tayal-nikhil",
  github: "https://github.com/nikhil-tayal",
  available: true,
  summary:
    "Seven years shipping production web apps across fintech, aviation, edtech and e-commerce. I design end-to-end systems — interfaces, APIs, and everything between — and care a lot about the details nobody notices.",
  longSummary:
    "I've shipped 10+ React applications and REST APIs serving 2M monthly visitors, architected a booking platform handling 500+ reservations a month, and built fintech portals processing over $2M in transactions. Lately I've been obsessed with generative AI — running ComfyUI on serverless GPUs, wiring LLMs into products, and shipping a virtual try-on SaaS to real merchants.",
};

// ----- Showcase items per company -----
// Each showcase is routed at /showcase/[slug]. Detail pages render the
// workflow diagram, screenshots, and videos defined below.
//
// Drop media files under /public/showcases/<slug>/ and reference them as
// absolute paths here, e.g. "/showcases/helitaxii/workflow.svg".
//   screenshot  → card thumbnail on the home page
//   workflow    → draw.io / architecture diagram (prefer svg)
//   screenshots → gallery images for the detail page (optional `frame`
//                 can be "mobile" or "browser" for chrome wrapping)
//   loomUrl     → Loom share URL (embedded on the detail page)
//   liveUrl     → the live product URL

export type DeviceFrame = "mobile" | "browser" | "none";

export type ShowcaseMedia = {
  src: string;
  caption?: string;
  alt?: string;
  width?: number;
  height?: number;
  frame?: DeviceFrame;
  // "full" = spans both columns; "third" = 1/3 of a 3-up row (use 3 consecutive items)
  span?: "full" | "third";
};

export type ShowcaseItem = {
  slug: string;
  name: string;
  brief: string;
  overview?: string;
  screenshot?: string;
  workflow?: ShowcaseMedia;
  screenshots?: ShowcaseMedia[];
  loomUrl?: string;
  liveUrl?: string;
};

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  subtitle?: string;
  bullets: string[];
  tech: string[];
  showcase?: ShowcaseItem[];
};

export const experience: Experience[] = [
  {
    company: "Lookify",
    role: "Founder & Full-Stack Developer",
    period: "2024 — Present",
    location: "Delhi, India · Personal SaaS",
    subtitle: "AI Virtual Try-On for Shopify — Shopify App & Super-Admin",
    bullets: [
      "Built an AI virtual try-on SaaS used by 20+ Shopify merchants, handling 1,000+ monthly sessions with 95%+ uptime.",
      "Dockerized ComfyUI on RunPod serverless GPUs, processing 500+ images/month through a custom Python handler with queuing and watermarking.",
      "Shipped a 4-step merchant onboarding flow and a full-featured admin app (product management, daily look limits, theme embed) embedded in Shopify admin.",
      "Implemented Razorpay subscription billing with HMAC webhook verification for automated plan gating.",
      "Built a super-admin dashboard to monitor all merchant stores, user activity, and try-on logs across the platform.",
    ],
    tech: ["Next.js", "NestJS", "TypeScript", "ComfyUI", "RunPod", "Docker", "MongoDB", "Shopify API", "Razorpay"],
    showcase: [
      {
        slug: "lookify-shopify-app",
        name: "Lookify — Shopify App",
        brief: "AI virtual try-on embedded app for Shopify merchants — onboarding, product management, theme extension, and Razorpay billing.",
        overview:
          "Lookify's Shopify embedded app is a Next.js 15 app (Pages Router) that lives inside the Shopify admin iframe. Merchants go through a 4-step onboarding: Welcome → Choose Category → Choose Package (Razorpay billing) → Theme Setup. Once live, the Dashboard shows KPI cards (total looks, conversion, top products), analytics charts, and a filterable results table. The Settings page lets merchants toggle products on/off, assign garment types (full/upper/lower body), mark mannequin products, and bulk-edit via filters. A Preact-based theme extension injects a try-on button on storefront product pages and opens a full-screen modal where shoppers upload a photo and get an AI-generated try-on result in seconds — powered by ComfyUI on RunPod serverless GPUs.",
        screenshot: "/showcases/lookify-shopify-app/shopify-admin.png",
        screenshots: [
          {
            src: "/showcases/lookify-shopify-app/shopify-admin.png",
            caption: "Merchant dashboard",
            alt: "Lookify Shopify admin — dashboard with KPI cards (total looks, conversion rate, top products), analytics charts and recent try-on results table",
            width: 1440,
            height: 900,
            frame: "browser",
          },
          {
            src: "/showcases/lookify-shopify-app/shopify-app-embed.png",
            caption: "Storefront try-on embed",
            alt: "Lookify theme extension — Try On button embedded on a Shopify product page, opening a full-screen modal for shoppers to upload a photo",
            width: 1440,
            height: 900,
            frame: "browser",
          },
          {
            src: "/showcases/lookify-shopify-app/runpod-model-run.png",
            caption: "RunPod GPU processing",
            alt: "Lookify — RunPod serverless GPU job executing the ComfyUI workflow; custom Python handler manages queuing, watermarking and result delivery",
            width: 1440,
            height: 800,
            frame: "browser",
          },
          {
            src: "/showcases/lookify-shopify-app/shopify-chatbot.png",
            caption: "AI chatbot assistant",
            alt: "Lookify — in-app AI chatbot helping merchants configure their try-on settings and troubleshoot issues",
            width: 1440,
            height: 900,
            frame: "browser",
          },
          // "third" span — these three sit side-by-side in one row (input → input → output); keep them last
          {
            src: "/showcases/lookify-shopify-app/input-garment.webp",
            caption: "Garment input",
            alt: "Lookify — garment product image used as input for the AI virtual try-on model",
            width: 800,
            height: 1000,
            frame: "none",
            span: "third",
          },
          {
            src: "/showcases/lookify-shopify-app/input-user.jpg",
            caption: "User photo input",
            alt: "Lookify — shopper photo uploaded for virtual try-on; the AI model composites the garment onto the person",
            width: 800,
            height: 1000,
            frame: "none",
            span: "third",
          },
          {
            src: "/showcases/lookify-shopify-app/output.png",
            caption: "AI try-on result",
            alt: "Lookify — AI-generated virtual try-on output showing the shopper wearing the selected garment",
            width: 800,
            height: 1000,
            frame: "none",
            span: "third",
          },
        ],
      },
      {
        slug: "lookify-superadmin",
        name: "Lookify — Super-Admin",
        brief: "Internal ops dashboard to monitor all merchant stores, user activity, and try-on logs across the platform.",
        overview:
          "The Lookify super-admin is a Next.js 15 (App Router) dashboard with a custom dark-themed design system. It gives the Lookify team full visibility across the entire merchant base: the Dashboard page shows aggregate metrics (total stores, active users, try-on volume, revenue); the Stores page lists every connected Shopify store with engagement metrics and a drill-down detail view; the Users page tracks individual shopper accounts and try-on history; the Try-On Logs and User Logs pages surface per-request AI job data for debugging and quality monitoring. All data is fetched from the vton-backend REST API with JWT auth.",
        screenshot: "/showcases/lookify-superadmin/dashboard.png",
        screenshots: [
          {
            src: "/showcases/lookify-superadmin/dashboard.png",
            caption: "Platform overview",
            alt: "Lookify super-admin dashboard — aggregate metrics: total stores, active users, try-on volume and revenue with top-stores table",
            width: 1440,
            height: 900,
            frame: "browser",
          },
          {
            src: "/showcases/lookify-superadmin/stores.png",
            caption: "All stores",
            alt: "Lookify super-admin stores page — list of all connected Shopify merchant stores with engagement metrics, plan type and last-active date",
            width: 1440,
            height: 900,
            frame: "browser",
          },
          {
            src: "/showcases/lookify-superadmin/users.png",
            caption: "Users",
            alt: "Lookify super-admin users page — shopper accounts with try-on count, last activity and store association",
            width: 1440,
            height: 900,
            frame: "browser",
          },
        ],
      },
    ],
  },
  {
    company: "Thumby Aviation",
    role: "Senior Full-Stack Developer",
    period: "Jun 2024 — Present",
    location: "Delhi, India · Contract",
    subtitle: "Helitaxii (Helicopter Booking) & CAMO Winglet (Aircraft Maintenance)",
    bullets: [
      "Designed a Central Reservation System serving 500+ monthly bookings with shared live inventory for 3 admin roles plus public customers.",
      "Engineered the end-to-end customer booking flow across 4 service types, integrating Razorpay for 200+ monthly transactions.",
      "Shipped a cross-platform React Native app used by 15+ ground staff at 5 helipads for QR check-ins and on-ground booking management.",
      "Built a digital technical logbook for 12+ aircraft, replacing 100% of paper-based maintenance records for DGCA compliance.",
      "Implemented inspection scheduling with template-driven forms and CSV bulk import, reducing data entry time by 70%.",
    ],
    tech: ["React.js", "Next.js", "React Native", "NestJS", "Node.js", "TypeScript", "MongoDB", "AWS S3", "Webpack"],
    showcase: [
      {
        slug: "helitaxii",
        name: "Helitaxii — Booking Platform",
        brief: "Central reservation system with live inventory, Razorpay payments, and B2B portal for 10+ travel agents.",
        overview:
          "Helitaxii is the booking backbone behind Thumby Aviation — a single system that serves the public booking site, a B2B travel-agent portal, an internal ops console, and a React Native ground app. One live inventory model keeps seats consistent across 4 channels and 3 admin roles, with Razorpay capturing payments and a webhook-driven state machine finalising bookings.",
        liveUrl: "https://helitaxii.com",
        loomUrl: "https://www.loom.com/share/bae6be68410541478c3ab5a83d82797c",
        screenshot: "/showcases/helitaxii/landing-page.png",
        workflow: {
          src: "/showcases/helitaxii/workflow.svg",
          caption: "Clients, API gateway and backing services",
          alt: "Helitaxii system architecture — customer web, admin portal, ground app and B2B portal talking to a NestJS API backed by MongoDB, Razorpay, S3, SES and Redis",
        },
        screenshots: [
          {
            src: "/showcases/helitaxii/landing-page.png",
            caption: "Landing page",
            alt: "Helitaxii public booking site — landing page with route selection",
            width: 1600,
            height: 1000,
            frame: "browser",
          },
          {
            src: "/showcases/helitaxii/route-selection.png",
            caption: "Route selection & schedule",
            alt: "Helitaxii public booking site — shuttle route selection with available time slots and pricing",
            width: 1600,
            height: 1000,
            frame: "browser",
          },
          {
            src: "/showcases/helitaxii/passengers-details.png",
            caption: "Passenger details form",
            alt: "Helitaxii booking — ticket details form with passenger info fields (name, age, weight, ID)",
            width: 1600,
            height: 1000,
            frame: "browser",
          },
          {
            src: "/showcases/helitaxii/price-breakdown.png",
            caption: "Review & price breakdown",
            alt: "Helitaxii booking — filled passenger details with GST price breakdown and Pay button",
            width: 1600,
            height: 1000,
            frame: "browser",
          },
          {
            src: "/showcases/helitaxii/razorpay-integration.png",
            caption: "Razorpay payment",
            alt: "Helitaxii booking — Razorpay modal showing UPI QR, Cards, EMI, Netbanking and Wallet options",
            width: 1600,
            height: 1000,
            frame: "browser",
          },
          {
            src: "/showcases/helitaxii/holding-tickets.png",
            caption: "Holding tickets",
            alt: "Helitaxii booking — holding tickets state while payment processes",
            width: 1600,
            height: 1000,
            frame: "browser",
          },
          {
            src: "/showcases/helitaxii/booking-confirmed.png",
            caption: "Booking confirmation",
            alt: "Helitaxii booking confirmation screen with reference number and passenger details",
            width: 1600,
            height: 1000,
            frame: "browser",
          },
        ],
      },
      {
        slug: "camo-winglet",
        name: "CAMO Winglet — Maintenance Logbook",
        brief: "DGCA-compliant digital logbook for 12+ aircraft, replacing 100% of paper-based records.",
        overview:
          "CAMO Winglet (winglet.app) is the digital airworthiness management system built end-to-end for Thumby Aviation's fleet of Bell 407s and Airbus A350s. Engineers create tech logs with DGCA-mandated fields — airframe hours, landing cycles, flight sector details, fuel and engine oil records — against each registered aircraft (VT-KSA, VT-QRC, VT-GRA and others). The Models module lets admins define aircraft model templates with ATA-chapter-mapped components that auto-bootstrap onto new aircraft. Inspections are split into Assembly (frequency-hour tracking with overdue alerts) and Component (SLL, Overhaul, and Regular Check tabs with remaining-life countdown). CSV bulk import migrated 100% of legacy paper records, cutting data entry by 70%.",
        workflow: {
          src: "/showcases/camo-winglet/workflow.svg",
          caption: "Role-based web app, NestJS API, and DGCA compliance layer",
          alt: "CAMO Winglet system architecture — Engineer, Inspector and Admin roles accessing a React Router v7 SSR app backed by MongoDB on EC2 with PM2",
        },
        screenshot: "/showcases/camo-winglet/aircafts.png",
        screenshots: [
          {
            src: "/showcases/camo-winglet/aircafts.png",
            caption: "Aircraft fleet",
            alt: "CAMO Winglet aircraft fleet — listing Bell 407s and Airbus A350s with registration, model, tech log type, manufacture date, operational status and current totals",
            width: 960,
            height: 480,
            frame: "browser",
          },
          {
            src: "/showcases/camo-winglet/components.png",
            caption: "Component registry",
            alt: "CAMO Winglet components page — VT-KSA airframe components with serial numbers, part numbers, ATA chapters, manufacturer and installed status",
            width: 960,
            height: 400,
            frame: "browser",
          },
          {
            src: "/showcases/camo-winglet/tech-logs.png",
            caption: "Create tech log",
            alt: "CAMO Winglet create tech log form — DGCA fields including airframe hours, landing cycles, flight sector details, fuel and engine oil for BELL 407",
            width: 960,
            height: 580,
            frame: "browser",
          },
          {
            src: "/showcases/camo-winglet/models.png",
            caption: "Aircraft model setup",
            alt: "CAMO Winglet Models page — create aircraft model with ATA chapters, nomenclature, part numbers and Mandatory For Tech Logs flag; components auto-bootstrap on aircraft creation",
            width: 1540,
            height: 600,
            frame: "browser",
          },
          {
            src: "/showcases/camo-winglet/inspections-assembly.png",
            caption: "Assembly inspections",
            alt: "CAMO Winglet assembly inspections — ASM-001 CPI entry showing frequency 12H, current 13.2H, due 12H, remaining −1.2H (overdue)",
            width: 1540,
            height: 540,
            frame: "browser",
          },
          {
            src: "/showcases/camo-winglet/inspections-component.png",
            caption: "Component SLL tracking",
            alt: "CAMO Winglet component inspections — SLL tab showing safe life limits for Cabin Fire Extinguisher (12Y), ELT Battery (5Y) and Airframe (15Y) with remaining life countdown",
            width: 1540,
            height: 450,
            frame: "browser",
          },
        ],
      },
      {
        slug: "ground-staff-app",
        name: "Ground Staff App",
        brief: "React Native app for QR check-ins and on-ground booking management at 5 helipads.",
        overview:
          "A cross-platform React Native app used by 15+ ground staff across 5 helipads. Staff log in with email/password via Firebase Auth, filter bookings by date and halt, scan passenger QR codes with expo-camera, and confirm boarding — syncing every check-in back to the Central Reservation System in real time. FCM push delivers new booking alerts instantly.",
        screenshot: "/showcases/ground-staff-app/bookig-details.png",
        workflow: {
          src: "/showcases/ground-staff-app/workflow.svg",
          caption: "React Native app, QR scanner module, NestJS API and CRS sync",
          alt: "Ground Staff App system architecture — React Native app with QR scanner and FCM push backed by NestJS API, MongoDB and live CRS integration",
        },
        screenshots: [
          {
            src: "/showcases/ground-staff-app/login-through-google-auth.png",
            caption: "Login",
            alt: "Ground Staff App — login screen with Google Auth",
            width: 390,
            height: 844,
            frame: "mobile",
          },
          {
            src: "/showcases/ground-staff-app/bookig-details.png",
            caption: "Booking details",
            alt: "Ground Staff App — booking details screen with passenger info",
            width: 390,
            height: 844,
            frame: "mobile",
          },
          {
            src: "/showcases/ground-staff-app/qr-scanning.png",
            caption: "QR scanning",
            alt: "Ground Staff App — QR code scanning screen for passenger check-in",
            width: 390,
            height: 844,
            frame: "mobile",
          },
          {
            src: "/showcases/ground-staff-app/scanned-ticket.png",
            caption: "Scanned ticket",
            alt: "Ground Staff App — scanned ticket details with passenger and flight info",
            width: 390,
            height: 844,
            frame: "mobile",
          },
          {
            src: "/showcases/ground-staff-app/ticket-scanning.png",
            caption: "Ticket scanning",
            alt: "Ground Staff App — active ticket scanning with camera viewfinder",
            width: 390,
            height: 844,
            frame: "mobile",
          },
        ],
      },
      {
        slug: "helitaxii-admin",
        name: "Helitaxii — Admin Dashboard",
        brief: "Internal ops console for Super Admin, Admin, and Agent roles — booking management, live inventory, schedules, and reports.",
        overview:
          "The admin dashboard (helitaxii-admin-dashboard-v2) is the operational backbone of the CRS, built with React 16, Material-UI, Ant Design, and RSuite. Role-based access is enforced via Firebase custom claims across three tiers: Super Admin, Admin, and Agent. Ops staff manage live schedules, approve bookings, configure charter and package pricing, upload payment proofs to Firebase Storage, and export day-wise booking reports — all from a single interface.",
        screenshot: "/showcases/helitaxii/admin-charter-bookings.png",
        screenshots: [
          {
            src: "/showcases/helitaxii/admin-shuttles-joyrides.png",
            caption: "Shuttles & joyrides",
            alt: "Helitaxii admin — shuttles and joyrides management with schedule and pricing",
            width: 1600,
            height: 1000,
            frame: "browser",
          },
          {
            src: "/showcases/helitaxii/admin-shuttles-joyride-bookings.png",
            caption: "Shuttle bookings",
            alt: "Helitaxii admin — shuttle and joyride bookings list with status and passenger details",
            width: 1600,
            height: 1000,
            frame: "browser",
          },
          {
            src: "/showcases/helitaxii/admin-charter-bookings.png",
            caption: "Charter bookings",
            alt: "Helitaxii admin — charter bookings management",
            width: 1600,
            height: 1000,
            frame: "browser",
          },
          {
            src: "/showcases/helitaxii/admin-charter-details.png",
            caption: "Charter details",
            alt: "Helitaxii admin — charter booking detail view with passenger and flight info",
            width: 1600,
            height: 1000,
            frame: "browser",
          },
          {
            src: "/showcases/helitaxii/admin-booking-details.png",
            caption: "Booking details",
            alt: "Helitaxii admin — booking detail view with passenger, payment and status info",
            width: 1600,
            height: 1000,
            frame: "browser",
          },
          {
            src: "/showcases/helitaxii/admin-cp-details.png",
            caption: "Channel partner details",
            alt: "Helitaxii admin — channel partner configuration and details",
            width: 1600,
            height: 1000,
            frame: "browser",
          },
          {
            src: "/showcases/helitaxii/admin-admins.png",
            caption: "Admin management",
            alt: "Helitaxii admin — user and role management for Super Admin, Admin and Agent roles",
            width: 1600,
            height: 1000,
            frame: "browser",
          },
        ],
      },
    ],
  },
  {
    company: "PhysicsWallah",
    role: "SDE-2",
    period: "May 2023 — Jun 2024",
    location: "Noida, India",
    bullets: [
      "Spearheaded PW Gulf regional edtech app, growing daily active users by 25% in 3 months across 8 modules.",
      "Drove a 40% increase in organic traffic through SEO and a Next.js frontend modernization serving 2M monthly visitors.",
      "Designed a centralized notification microservice (NestJS, MongoDB, Redis) cutting delivery time by 30% and server load by 40%.",
    ],
    tech: ["React.js", "Next.js", "NestJS", "MongoDB", "Redis", "TypeScript"],
    showcase: [
      {
        slug: "pw-gulf",
        name: "PW Gulf — Edtech App",
        brief: "Regional edtech platform with 8 modules, growing DAU by 25% in 3 months.",
        screenshot: "/showcases/pw-gulf/country-selection.png",
        workflow: {
          src: "/showcases/pw-gulf/workflow.svg",
          caption: "Next.js frontend, 8 feature modules, NestJS API and CDN-backed content delivery",
          alt: "PW Gulf system architecture — Next.js app with 8 modules backed by NestJS, MongoDB, Redis and CDN for video delivery",
        },
        screenshots: [
          {
            src: "/showcases/pw-gulf/landing.png",
            caption: "Landing page",
            alt: "PW Gulf landing page showing course catalogue and regional offerings",
            width: 1920,
            height: 7325,
            frame: "browser",
            span: "full",
          },
          {
            src: "/showcases/pw-gulf/country-selection.png",
            caption: "Country selection",
            alt: "PW Gulf country selection screen for regional routing",
            width: 1904,
            height: 885,
            frame: "browser",
          },
          {
            src: "/showcases/pw-gulf/login.png",
            caption: "Login",
            alt: "PW Gulf login screen",
            width: 1920,
            height: 887,
            frame: "browser",
          },
        ],
      },
      {
        slug: "notification-microservice",
        name: "Notification Microservice",
        brief: "Centralized NestJS + Redis service cutting notification delivery time by 30%.",
        overview:
          "Built for PhysicsWallah's ecosystem, this NestJS microservice acts as the single notification hub across email, push, and in-app channels. Upstream services emit events to Kafka topics; a typed consumer picks them up, loads EJS-rendered templates from MongoDB, checks Redis for rate-limit and deduplication, then dispatches via AWS SES or FCM. Exponential-backoff retry via `async-retry` handles transient failures. The result: a 30% drop in delivery latency and a 40% reduction in server load across the platform.",
        screenshot: "/showcases/notification-microservice/workflow.svg",
        workflow: {
          src: "/showcases/notification-microservice/workflow.svg",
          caption: "Producer services, Redis Bull queue, NestJS consumer and 4 delivery channels",
          alt: "Notification microservice architecture — producer services publish to Redis queue, NestJS consumer routes to FCM, SES, SMS and in-app channels with retry logic",
        },
      },
    ],
  },
  {
    company: "Drip Capital",
    role: "Software Engineer",
    period: "Apr 2021 — May 2023",
    location: "Mumbai, India",
    bullets: [
      "Built Trade360, a cross-border collaboration platform serving 200+ exporters and importers with 15+ API integrations.",
      "Initiated Drip Switch USD transaction portal, processing $2M+ in 2 months with a 40% lift in payment efficiency.",
      "Engineered a container tracking app handling 10,000+ monthly API requests with real-time updates across 3 shipping corridors.",
      "Hit 80% test coverage (Jest, Mocha), reducing production bugs by 35%; published a reusable UI library to npm adopted across 4 teams.",
    ],
    tech: ["React.js", "TypeScript", "Redux", "Jest", "Mocha", "Webpack"],
    showcase: [
      {
        slug: "trade360",
        name: "Trade360",
        brief: "Cross-border collaboration platform for 200+ exporters and importers with 15+ API integrations.",
        overview:
          "Trade360 is Drip Capital's collaboration portal for global trade — a Next.js 12 app connecting exporters, importers and Drip ops through a shared workspace. Auth0 SSO guards access. Exporters upload shipment documents, track containers in real time, and monitor financing status; importers confirm receipts and view network connections. The internal `@dripcapital/dripui` MUI 5 component library (Rollup-bundled, Storybook-documented) kept the UI consistent across 4 internal teams.",
        screenshot: "/showcases/trade360/network.png",
        workflow: {
          src: "/showcases/trade360/workflow.svg",
          caption: "Dual portals, REST API and 15+ logistics, banking and compliance integrations",
          alt: "Trade360 system architecture — exporter and importer portals backed by REST API integrating logistics, banking and compliance APIs with MongoDB and Redis",
        },
        screenshots: [
          {
            src: "/showcases/trade360/00-auth-login.png",
            caption: "Auth0 login",
            alt: "Trade360 login screen — email / phone auth flow with 'Global Trade Simplified' branding",
            width: 960,
            height: 620,
            frame: "browser",
          },
          {
            src: "/showcases/trade360/company-profile.png",
            caption: "Company profile",
            alt: "Trade360 company profile — create and edit company info, locations served, industries, contact details with visibility controls",
            width: 960,
            height: 1020,
            frame: "browser",
          },
          {
            src: "/showcases/trade360/network.png",
            caption: "Buyer discovery network",
            alt: "Trade360 network — discover 8 matching businesses with connect / approve actions, connection request states and company profile completion nudge",
            width: 960,
            height: 900,
            frame: "browser",
          },
          {
            src: "/showcases/trade360/connections.png",
            caption: "Your connections",
            alt: "Trade360 connections — pending connection request from Euro Commerce GmbH with approve / ignore actions, 2 existing company connections",
            width: 960,
            height: 620,
            frame: "browser",
          },
          {
            src: "/showcases/trade360/personal-profile.png",
            caption: "Personal profile",
            alt: "Trade360 personal profile — name, email, phone and communication preferences with notification channel toggles",
            width: 960,
            height: 600,
            frame: "browser",
          },
          {
            src: "/showcases/trade360/admin-settings.png",
            caption: "Admin settings",
            alt: "Trade360 admin settings — list of members and roles with invite member action and withdraw invite controls",
            width: 1440,
            height: 580,
            frame: "browser",
          },
        ],
      },
      {
        slug: "drip-website",
        name: "Drip Capital — Website",
        brief: "Marketing site for a global trade finance platform — landing pages serving 2M+ monthly visitors.",
        overview:
          "Built and maintained the public-facing marketing site for Drip Capital (dripcapital.com) — a trade finance company providing non-recourse export financing to SME exporters globally. Pages include the main conversion landing page ('Fuel Your Exports with Fast Non-Recourse Financing'), an About page with leadership profiles, a How We Work investor page, a utility HSN Code Finder with SEO-optimised content, and a Blogs hub. The stack is Next.js with SSR/SSG for SEO performance — a 40% organic traffic lift came largely from the Next.js modernisation and structured content strategy.",
        liveUrl: "https://dripcapital.com",
        screenshot: "/showcases/drip-website/landing.png",
        screenshots: [
          {
            src: "/showcases/drip-website/landing.png",
            caption: "Main landing page",
            alt: "Drip Capital landing page — 'Fuel Your Exports with Fast Non-Recourse Financing', product highlights ($3M finance, competitive pricing, no collateral), 4-step application flow, client testimonials, partner logos and certifications",
            width: 1440,
            height: 6200,
            frame: "browser",
            span: "full",
          },
          {
            src: "/showcases/drip-website/about-company.png",
            caption: "About — leadership",
            alt: "Drip Capital about page — mission 'to make global trade easy and accessible for small businesses', full leadership team grid with bios and world map showing global reach",
            width: 1440,
            height: 5800,
            frame: "browser",
            span: "full",
          },
          {
            src: "/showcases/drip-website/how-we-work.png",
            caption: "How we work — investor page",
            alt: "Drip Capital how we work — institutional-grade trade finance investments page: $3B+ facilitated, $350M assets, fixed income / short tenure / low volatility value props, resilient asset class explainer and equity investor logos",
            width: 1440,
            height: 5600,
            frame: "browser",
            span: "full",
          },
          {
            src: "/showcases/drip-website/hsn-finder.png",
            caption: "HSN Code Finder tool",
            alt: "Drip Capital HSN Code Finder — SEO-optimised utility page explaining what HSN codes are, how to find them, structure breakdown and embedded video guide",
            width: 1440,
            height: 7000,
            frame: "browser",
            span: "full",
          },
          {
            src: "/showcases/drip-website/blogs-page.png",
            caption: "Blog hub",
            alt: "Drip Capital blogs — trade finance articles, export guides and market insights with category filters",
            width: 1440,
            height: 3200,
            frame: "browser",
            span: "full",
          },
        ],
      },
      {
        slug: "drip-ui",
        name: "Drip UI — Component Library",
        brief: "Internal MUI 5 component library published to npm, adopted across 4 teams with Storybook docs.",
        overview:
          "The `@dripcapital/dripui` library is Drip Capital's internal React component system — MUI 5 under the hood, extended with Drip's design tokens and bundled via Rollup into CJS + ESM + TypeScript declarations. Every component ships with MDX stories in Storybook 6 (hosted on Netlify) for instant previews and copy-paste usage examples. Engineers pull it via npm or swap it locally with `yalc` for in-progress iteration. It became the shared foundation across Trade360, Drip Switch, and two other internal portals, eliminating duplicated UI logic and enforcing a consistent visual language.",
        screenshot: "/showcases/drip-ui/intro.png",
        screenshots: [
          {
            src: "/showcases/drip-ui/intro.png",
            caption: "Library overview",
            alt: "Drip UI Component Library Storybook intro — overview of the MUI 5 component system, tech stack, build pipeline and installation guide",
            width: 400,
            height: 2200,
            frame: "browser",
            span: "full",
          },
          {
            src: "/showcases/drip-ui/component-button.png",
            caption: "Button component",
            alt: "Drip UI Button component docs — Primary, Secondary, Tertiary variants with disabled, loading and icon states plus full props table",
            width: 400,
            height: 2800,
            frame: "browser",
          },
          {
            src: "/showcases/drip-ui/component-input.png",
            caption: "TextField component",
            alt: "Drip UI TextField component docs — normal, full-width, start/end icon, disabled, error, required and password variants with full props table",
            width: 400,
            height: 3200,
            frame: "browser",
          },
        ],
      },
      {
        slug: "container-tracker",
        name: "Container Tracker",
        brief: "Real-time tracking backend handling 10,000+ monthly API requests across 3 shipping corridors.",
        overview:
          "The container tracking service is the backend engine powering Trade360's shipments module. A Node.js REST API fans out to 3 carrier APIs (MSC, CMA CGM, Hapag-Lloyd) on each tracking request, normalises heterogeneous vessel-event formats into a single schema, and caches results in Redis to absorb the 10,000+ monthly calls without hammering upstream rate limits. A WebSocket layer pushes live status deltas to connected Trade360 clients — no polling. Users can subscribe team members to a shipment and toggle email notifications per container, all stored in MongoDB.",
        screenshot: "/showcases/container-tracker/tracking-list.png",
        workflow: {
          src: "/showcases/container-tracker/workflow.svg",
          caption: "REST API querying 3 carrier APIs, Redis cache and WebSocket server for real-time push",
          alt: "Container Tracker architecture — Node.js REST API fanning out to MSC, CMA CGM and Hapag-Lloyd carrier APIs, Redis cache and WebSocket server pushing status deltas to the Trade360 React frontend",
        },
        screenshots: [
          {
            src: "/showcases/container-tracker/container-tracking.png",
            caption: "Home dashboard",
            alt: "Trade360 home — recent shipments widget with container numbers, destinations and notification toggles; network discovery panel showing matched businesses",
            width: 960,
            height: 680,
            frame: "browser",
          },
          {
            src: "/showcases/container-tracker/tracking-list.png",
            caption: "Tracked shipments list",
            alt: "Trade360 shipments — list of tracked containers with tracking number, destination, expected arrival, shipment status, shared-with count and per-container notification toggle",
            width: 960,
            height: 500,
            frame: "browser",
          },
          {
            src: "/showcases/container-tracker/tracking-info.png",
            caption: "Real-time shipment detail",
            alt: "Trade360 shipment detail — MSCU7654321 port-by-port timeline: Mumbai Port India → Port Said Egypt → Rotterdam Netherlands with arrival and departure timestamps; shared notification recipients list",
            width: 960,
            height: 580,
            frame: "browser",
          },
        ],
      },
    ],
  },
  {
    company: "Credochain",
    role: "React.js Developer",
    period: "Jul 2019 — Apr 2021",
    location: "Delhi, India",
    bullets: [
      "Pioneered PEMANT, a digital credit line web app adopted by 7,000+ MSMEs across 3 user roles.",
      "Built an underwriter dashboard powering real-time credit decisions for 2,500+ active users with rich data visualization.",
    ],
    tech: ["React.js", "React Native", "Redux", "Highcharts"],
    showcase: [
      {
        slug: "pemant",
        name: "PEMANT",
        brief: "Digital credit line app adopted by 7,000+ MSMEs with 3 distinct user role flows.",
        workflow: {
          src: "/showcases/pemant/workflow.svg",
          caption: "MSME, underwriter and admin portals, credit engine, KYC module and S3 document store",
          alt: "PEMANT system architecture — three React portals backed by REST API with credit engine, KYC module, MongoDB and S3 for document storage",
        },
      },
      {
        slug: "underwriter-dashboard",
        name: "Underwriter Dashboard",
        brief: "Real-time credit decisions for 2,500+ active users with Highcharts data visualizations.",
        workflow: {
          src: "/showcases/underwriter-dashboard/workflow.svg",
          caption: "React + Highcharts frontend, REST API, credit engine and decision audit log",
          alt: "Underwriter Dashboard architecture — React app with Highcharts backed by REST API, credit scoring engine and MongoDB decision log",
        },
      },
    ],
  },
  {
    company: "Cyber Group",
    role: "Web & Mobile Developer Trainee",
    period: "Jan 2019 — Jul 2019",
    location: "Noida, India",
    bullets: [
      "Built an HRMS mobile app in React Native with push notifications and biometric auth for 50+ employees, collaborating with an 8-person cross-functional team.",
    ],
    tech: ["React Native"],
    showcase: [
      {
        slug: "hrms-mobile-app",
        name: "HRMS Mobile App",
        brief: "React Native app with push notifications and biometric auth for 50+ employees.",
        screenshot: "/showcases/hrms-mobile-app/lms.png",
        workflow: {
          src: "/showcases/hrms-mobile-app/workflow.svg",
          caption: "React Native app with biometric auth, FCM push and 4 HR modules",
          alt: "HRMS Mobile App architecture — React Native with biometric auth and 4 modules backed by REST API, MongoDB and FCM for push notifications",
        },
        screenshots: [
          {
            src: "/showcases/hrms-mobile-app/lms.png",
            caption: "Leave management",
            alt: "HRMS Mobile App — leave management system with leave balance and request form",
            width: 1220,
            height: 2712,
            frame: "mobile",
          },
          {
            src: "/showcases/hrms-mobile-app/achievements.png",
            caption: "Achievements",
            alt: "HRMS Mobile App — achievements screen showing employee recognition and badges",
            width: 1220,
            height: 2712,
            frame: "mobile",
          },
          {
            src: "/showcases/hrms-mobile-app/feedback.png",
            caption: "Feedback",
            alt: "HRMS Mobile App — feedback screen for peer and manager reviews",
            width: 1220,
            height: 2712,
            frame: "mobile",
          },
        ],
      },
    ],
  },
];

export type Project = {
  name: string;
  tagline: string;
  period: string;
  description: string;
  tech: string[];
  liveUrl?: string;
  loomUrl?: string;
  githubUrl?: string;
  status: "live" | "in-development" | "archived";
};

export const projects: Project[] = [
  {
    name: "Lookify",
    tagline: "AI virtual try-on for Shopify",
    period: "2024 — Present",
    description:
      "A SaaS virtual try-on platform used by 20+ Shopify merchants, handling 1,000+ monthly sessions. Dockerized ComfyUI runs on RunPod serverless GPUs, processing 500+ images a month with a custom Python handler for queuing and watermarking. Razorpay billing with HMAC webhook verification and 95%+ uptime.",
    tech: ["Next.js", "NestJS", "TypeScript", "ComfyUI", "RunPod", "Docker", "MongoDB", "Shopify API"],
    status: "live",
  },
  {
    name: "CAMO Winglet",
    tagline: "Digital technical logbook for aircraft maintenance",
    period: "2024 — Present",
    description:
      "Replaces paper-based maintenance records for 12+ aircraft with a DGCA-compliant digital logbook. Template-driven inspection forms, CSV bulk import, and a role-aware workflow cut data entry time by 70%.",
    tech: ["React.js", "NestJS", "TypeScript", "MongoDB", "Webpack"],
    status: "live",
  },
  {
    name: "Drip UI",
    tagline: "Internal component library published to npm, adopted across 4 teams",
    period: "2021 — 2023",
    description:
      "MUI 5–based React component library (`@dripcapital/dripui`) bundled with Rollup into CJS + ESM + TypeScript declarations, with MDX stories in Storybook 6 hosted on Netlify. Used as the shared UI foundation across Trade360, Drip Switch, and two other internal portals.",
    tech: ["React.js", "MUI 5", "Rollup", "Storybook", "TypeScript"],
    status: "archived",
  },
  {
    name: "Notification Microservice",
    tagline: "Centralized multi-channel notification service for PW",
    period: "2023 — 2024",
    description:
      "Centralized NestJS microservice handling email, push, and in-app notifications for PhysicsWallah. Kafka consumers ingest events from upstream services, Redis handles rate-limiting and deduplication, and AWS SES delivers at scale — cutting delivery latency by 30% and server load by 40%.",
    tech: ["NestJS", "Kafka", "Redis", "MongoDB", "AWS SES", "TypeScript"],
    status: "archived",
  },
  {
    name: "EasySupply.in",
    tagline: "Shipping automation for Indian D2C sellers",
    period: "2024 — Present",
    description:
      "SaaS for 50+ e-commerce sellers automating shipping label processing across 5 courier integrations, handling 50MB+ uploads. MongoDB aggregation pipelines power an analytics dashboard tracking 1,000+ daily orders by courier, state, and payment type.",
    tech: ["Node.js", "Fastify", "TypeScript", "React.js", "MongoDB"],
    status: "live",
  },
];

export const skillGroups = [
  {
    label: "Frontend",
    items: [
      "React.js",
      "Next.js",
      "React Native",
      "TypeScript",
      "Redux",
      "Tailwind CSS",
      "Webpack",
      "Rollup",
    ],
  },
  {
    label: "Backend",
    items: [
      "Node.js",
      "NestJS",
      "Express",
      "Fastify",
      "GraphQL",
      "MongoDB",
      "PostgreSQL",
      "Redis",
      "Kafka",
      "WebSockets",
    ],
  },
  {
    label: "Cloud & DevOps",
    items: [
      "AWS (EC2, S3, SES, Lambda)",
      "DigitalOcean",
      "Docker",
      "Nginx",
      "PM2",
      "GitHub Actions",
      "CI/CD",
    ],
  },
  {
    label: "AI & Automation",
    items: [
      "ComfyUI",
      "RunPod",
      "Computer Vision",
      "Generative AI",
      "LLM Integration",
      "Puppeteer",
      "n8n",
      "Make.com",
    ],
  },
  {
    label: "Testing",
    items: ["Jest", "Mocha", "React Testing Library", "Zod", "TDD"],
  },
];

export const education = {
  school: "Bhagwan Parshuram Institute of Technology (BPIT)",
  degree: "B.Tech, Electronics & Communication Engineering",
  period: "2015 — 2019",
  location: "Delhi, India",
};

export const stats = [
  { value: "7+", label: "Years shipping" },
  { value: "2M", label: "Monthly visitors served" },
  { value: "$2M+", label: "Transactions processed" },
  { value: "10+", label: "Production apps" },
];

export type ShowcaseWithContext = {
  item: ShowcaseItem;
  company: string;
  role: string;
  period: string;
};

export function getAllShowcases(): ShowcaseWithContext[] {
  return experience.flatMap((job) =>
    (job.showcase ?? []).map((item) => ({
      item,
      company: job.company,
      role: job.role,
      period: job.period,
    }))
  );
}

export function getShowcaseBySlug(slug: string): ShowcaseWithContext | null {
  return getAllShowcases().find((s) => s.item.slug === slug) ?? null;
}
