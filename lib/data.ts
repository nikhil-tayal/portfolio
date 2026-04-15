export const profile = {
  name: "Nikhil Sharma",
  role: "Senior Full-Stack Developer",
  location: "Delhi, India",
  email: "your@email.com",
  github: "https://github.com/nikhilsharma",
  linkedin: "https://linkedin.com/in/nikhilsharma",
  twitter: "https://x.com/MidnightDev",
  twitterHandle: "@MidnightDev",
};

export const skills =
  "React · Next.js · TypeScript · Node.js · NestJS · MongoDB · AWS · DigitalOcean · Tailwind";

export type Project = {
  slug: string;
  name: string;
  stack: string;
  line1: string;
  line2: string;
  liveUrl?: string;
  githubUrl?: string;
  image: string;
  youtubeId?: string;
  placeholder?: boolean;
};

export const projects: Project[] = [
  {
    slug: "lookify",
    name: "Lookify",
    stack: "React · NestJS · MongoDB · RunPod · ComfyUI",
    line1: "AI virtual try-on SaaS that lets Shopify merchants add AI fitting rooms without managing any infrastructure.",
    line2: "Dockerized ComfyUI on RunPod serverless GPUs — custom Python handler for queuing, watermarking, and webhook-verified Razorpay billing.",
    liveUrl: "https://lookify.app",
    githubUrl: undefined,
    image: "/images/lookify.png",
    youtubeId: "dQw4w9WgXcQ",
  },
  {
    slug: "easysupply",
    name: "EasySupply.in",
    stack: "Next.js · Node.js · Fastify · MongoDB",
    line1: "Meesho seller SaaS that automates shipping label generation and order management for D2C sellers.",
    line2: "Handles 50MB+ bulk uploads across 5 courier integrations; MongoDB aggregation pipelines power real-time order analytics.",
    liveUrl: "https://easysupply.in",
    githubUrl: undefined,
    image: "/images/easysupply.png",
  },
  {
    slug: "helitaxii",
    name: "Helitaxii",
    stack: "Next.js · React Native · NestJS · MongoDB · AWS S3",
    line1: "Central Reservation System for helicopter travel — 500+ monthly bookings across 4 service types.",
    line2: "Built as first engineering hire: shared live inventory for 3 admin tiers, Razorpay payments, ground-staff React Native app for 5 helipads.",
    liveUrl: "https://helitaxii.com",
    githubUrl: undefined,
    image: "/images/helitaxii.png",
  },
  {
    slug: "camo-winglet",
    name: "CAMO / Winglet",
    stack: "React · NestJS · TypeScript · MongoDB",
    line1: "Aircraft maintenance platform for Bell 407/412 fleets — replaces 100% of paper-based DGCA records.",
    line2: "Complex component hierarchy tracking, 300H/12M inspection scheduling with template-driven forms and CSV bulk import.",
    liveUrl: undefined,
    githubUrl: undefined,
    image: "/images/camo.png",
  },
  {
    slug: "project-5",
    name: "Project Five",
    stack: "Coming soon",
    line1: "Details coming soon.",
    line2: "",
    liveUrl: undefined,
    githubUrl: undefined,
    image: "/images/project5.png",
    placeholder: true,
  },
  {
    slug: "project-6",
    name: "Project Six",
    stack: "Coming soon",
    line1: "Details coming soon.",
    line2: "",
    liveUrl: undefined,
    githubUrl: undefined,
    image: "/images/project6.png",
    placeholder: true,
  },
];

export type Job = {
  company: string;
  role: string;
  period: string;
  description: string;
};

export const experience: Job[] = [
  {
    company: "Lookify / EasySupply.in",
    role: "Founder & Developer",
    period: "2022 – Present",
    description:
      "Building two SaaS products from zero — Lookify (AI virtual try-on for Shopify) and EasySupply.in (shipping automation for D2C sellers). Full ownership: architecture, product, infrastructure.",
  },
  {
    company: "Thumby Aviation",
    role: "First Engineering Hire (Contract)",
    period: "2023 – 2024",
    description:
      "Designed and built Helitaxii (helicopter CRS) and CAMO Winglet (aircraft maintenance platform) from scratch. End-to-end ownership across web, mobile, and backend.",
  },
  {
    company: "PhysicsWallah",
    role: "SDE-2",
    period: "2021 – 2022",
    description:
      "Led PW Gulf regional expansion app, drove 40% organic traffic growth via Next.js modernization (2M monthly visitors), and architected a centralized NestJS notification microservice.",
  },
  {
    company: "Drip Capital",
    role: "Software Engineer",
    period: "2020 – 2021",
    description:
      "Built Trade360 cross-border platform for 200+ exporters, shipped a USD transaction portal processing $2M+ in two months, and published an internal React component library adopted across 4 teams.",
  },
  {
    company: "Credochain",
    role: "React Developer",
    period: "2019 – 2020",
    description:
      "Pioneered PEMANT, a digital credit line adopted by 7,000+ MSMEs. Built the underwriter dashboard powering real-time credit decisions for 2,500+ active users.",
  },
];
