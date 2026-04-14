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

export type Experience = {
  company: string;
  role: string;
  period: string;
  location: string;
  subtitle?: string;
  bullets: string[];
  tech: string[];
};

export const experience: Experience[] = [
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
    name: "Growify",
    tagline: "AI virtual try-on for Shopify",
    period: "2024 — Present",
    description:
      "A SaaS virtual try-on platform used by 20+ Shopify merchants, handling 1,000+ monthly sessions. Dockerized ComfyUI runs on RunPod serverless GPUs, processing 500+ images a month with a custom Python handler for queuing and watermarking. Razorpay billing with HMAC webhook verification and 95%+ uptime.",
    tech: ["Next.js", "NestJS", "TypeScript", "ComfyUI", "RunPod", "Docker", "MongoDB", "Shopify API"],
    status: "live",
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
  {
    name: "Helitaxii",
    tagline: "Central reservation system for helicopter travel",
    period: "2024 — Present",
    description:
      "End-to-end booking platform built for Thumby Aviation. Shared live inventory for 3 admin roles and public customers, Razorpay payments, a B2B portal for 10+ travel agents, and a React Native ground app for 15+ staff across 5 helipads.",
    tech: ["Next.js", "React Native", "NestJS", "MongoDB", "AWS S3"],
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
    name: "Drip Switch",
    tagline: "USD cross-border transaction portal",
    period: "2022",
    description:
      "Fintech portal for cross-border USD transactions. Processed $2M+ in the first two months with a 40% improvement in payment efficiency across 500+ transactions.",
    tech: ["React.js", "TypeScript", "Redux"],
    status: "archived",
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
