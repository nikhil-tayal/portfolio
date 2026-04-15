import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";

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

export const metadata: Metadata = {
  title: "Nikhil Tayal — Senior Full-Stack Developer",
  description:
    "Seven years shipping production web apps across fintech, aviation, edtech and e-commerce. Currently building AI-powered products with ComfyUI and serverless GPUs.",
  authors: [{ name: "Nikhil Tayal" }],
  keywords: [
    "Nikhil Tayal",
    "Full-Stack Developer",
    "React.js",
    "Next.js",
    "NestJS",
    "TypeScript",
    "Generative AI",
  ],
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
      <body className="min-h-full bg-paper text-ink">
        <ThemeProvider>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
