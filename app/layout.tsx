import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const SITE_URL = "https://www.nikhiltayal.info";
export const PERSON_IMAGE = `${SITE_URL}/nikhil-tayal.png`;

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const title = "Nikhil Tayal — Senior Full-Stack Developer · Portfolio";
const description =
  "Nikhil Tayal is a Senior Full-Stack Developer in Delhi, India with 7+ years shipping production React, Next.js and NestJS apps across fintech, aviation, edtech and e-commerce. Currently building AI-powered products with ComfyUI and serverless GPUs.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "Nikhil Tayal — Portfolio",
  title: {
    default: title,
    template: "%s · Nikhil Tayal",
  },
  description,
  authors: [{ name: "Nikhil Tayal", url: SITE_URL }],
  keywords: [
    "Nikhil Tayal",
    "Nikhil Tayal Developer",
    "Nikhil Tayal Delhi",
    "Nikhil Tayal portfolio",
    "Nikhil Tayal React",
    "Nikhil Tayal Next.js",
    "Nikhil Tayal NestJS",
    "Nikhil Tayal Full Stack",
    "Nikhil Tayal Senior Engineer",
    "Senior Full-Stack Developer Delhi",
    "React Developer India",
    "Next.js Developer India",
    "NestJS Developer",
    "TypeScript Developer Delhi",
    "Generative AI Developer",
    "ComfyUI Developer",
    "Fintech Developer India",
  ],
  creator: "Nikhil Tayal",
  publisher: "Nikhil Tayal",
  category: "technology",
  openGraph: {
    type: "profile",
    url: SITE_URL,
    title,
    description,
    siteName: "Nikhil Tayal",
    locale: "en_US",
    firstName: "Nikhil",
    lastName: "Tayal",
    username: "nikhil-tayal",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Nikhil Tayal — Senior Full-Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/twitter-image"],
    creator: "@nikhiltayal",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  verification: {
    // Add your Google Search Console verification token here once you set it up:
    // google: "your-token-here",
  },
};

const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${SITE_URL}/#person`,
  name: "Nikhil Tayal",
  givenName: "Nikhil",
  familyName: "Tayal",
  alternateName: ["Nikhil", "Tayal Nikhil"],
  url: SITE_URL,
  image: {
    "@type": "ImageObject",
    url: PERSON_IMAGE,
    width: 1024,
    height: 1024,
    caption: "Nikhil Tayal — Senior Full-Stack Developer",
  },
  jobTitle: "Senior Full-Stack Developer",
  description,
  email: "mailto:nikhiltayal9211@gmail.com",
  telephone: "+91-9873327914",
  gender: "Male",
  nationality: "Indian",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Delhi",
    addressRegion: "Delhi",
    addressCountry: "IN",
  },
  worksFor: [
    {
      "@type": "Organization",
      name: "Thumby Aviation",
      url: "https://thumbyaviation.com",
    },
    {
      "@type": "Organization",
      name: "Lookify",
    },
  ],
  alumniOf: {
    "@type": "CollegeOrUniversity",
    name: "Bhagwan Parshuram Institute of Technology (BPIT)",
    sameAs: "https://www.bpitindia.com/",
  },
  knowsAbout: [
    "React.js",
    "Next.js",
    "NestJS",
    "Node.js",
    "TypeScript",
    "React Native",
    "Generative AI",
    "ComfyUI",
    "RunPod",
    "MongoDB",
    "AWS",
    "Docker",
    "Shopify App Development",
  ],
  knowsLanguage: ["English", "Hindi"],
  sameAs: [
    "https://linkedin.com/in/tayal-nikhil",
    "https://github.com/nikhil-tayal",
    "https://twitter.com/nikhiltayal",
    "https://x.com/nikhiltayal",
  ],
};

const websiteJsonLd = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": `${SITE_URL}/#website`,
  url: SITE_URL,
  name: "Nikhil Tayal — Portfolio",
  description,
  inLanguage: "en-US",
  publisher: { "@id": `${SITE_URL}/#person` },
  author: { "@id": `${SITE_URL}/#person` },
};

const profilePageJsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": `${SITE_URL}/#profilepage`,
  url: SITE_URL,
  name: title,
  description,
  mainEntity: { "@id": `${SITE_URL}/#person` },
  about: { "@id": `${SITE_URL}/#person` },
  isPartOf: { "@id": `${SITE_URL}/#website` },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geist.variable} ${geistMono.variable} h-full antialiased`}
    >
      <head>
        <link rel="me" href="https://linkedin.com/in/tayal-nikhil" />
        <link rel="me" href="https://github.com/nikhil-tayal" />
        <link rel="author" href={SITE_URL} />
        <meta name="author" content="Nikhil Tayal" />
        <meta name="theme-color" content="#08080F" media="(prefers-color-scheme: dark)" />
        <meta name="theme-color" content="#F5F5FA" media="(prefers-color-scheme: light)" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageJsonLd) }}
        />
      </head>
      <body className="min-h-full bg-paper text-ink">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
