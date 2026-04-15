import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Nikhil Sharma — Senior Full-Stack Developer",
  description:
    "Senior full-stack developer with 7+ years building end-to-end products — from database schema to deployed UI. Based in Delhi, India.",
  authors: [{ name: "Nikhil Sharma" }],
  keywords: [
    "Nikhil Sharma",
    "Full-Stack Developer",
    "React",
    "Next.js",
    "NestJS",
    "TypeScript",
    "MongoDB",
    "Delhi",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={geist.variable}>
      <body className="bg-bg text-text min-h-screen">{children}</body>
    </html>
  );
}
