import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

export const SITE_URL = "https://www.nikhiltayal.info";

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

const title = "Nikhil Tayal — Senior Full-Stack Developer";
const description =
  "Seven years shipping production web apps across fintech, aviation, edtech and e-commerce. Currently building AI-powered products with ComfyUI and serverless GPUs.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: title,
    template: "%s · Nikhil Tayal",
  },
  description,
  authors: [{ name: "Nikhil Tayal", url: SITE_URL }],
  keywords: [
    "Nikhil Tayal",
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "NestJS",
    "TypeScript",
    "Generative AI",
    "Delhi",
    "India",
    "Fintech",
    "Edtech",
  ],
  creator: "Nikhil Tayal",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title,
    description,
    siteName: "Nikhil Tayal",
    images: [
      {
        url: "/og-image.png",
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
    images: ["/og-image.png"],
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
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Nikhil Tayal",
  url: SITE_URL,
  jobTitle: "Senior Full-Stack Developer",
  description,
  address: { "@type": "PostalAddress", addressLocality: "Delhi", addressCountry: "IN" },
  sameAs: [
    "https://linkedin.com/in/tayal-nikhil",
    "https://github.com/nikhil-tayal",
  ],
  knowsAbout: ["React.js", "Next.js", "NestJS", "TypeScript", "Generative AI", "Node.js"],
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
