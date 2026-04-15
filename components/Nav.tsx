"use client";

import { useEffect, useState } from "react";

const links = [
  { href: "#about", label: "About" },
  { href: "#projects", label: "Work" },
  { href: "#experience", label: "Experience" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className="fixed inset-x-0 top-0 z-50 transition-all duration-300"
      style={{
        backgroundColor: scrolled ? "rgba(15,15,15,0.9)" : "transparent",
        borderBottom: scrolled ? "1px solid var(--border)" : "1px solid transparent",
        backdropFilter: scrolled ? "blur(14px)" : "none",
        WebkitBackdropFilter: scrolled ? "blur(14px)" : "none",
      }}
    >
      <div
        className="mx-auto flex items-center justify-between px-6 md:px-10"
        style={{ height: "52px" }}
      >
        <a
          href="#"
          className="text-text font-medium hover:text-muted transition-colors duration-200"
          style={{ fontSize: "0.875rem", letterSpacing: "-0.01em", textDecoration: "none" }}
        >
          NS
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-muted hover:text-text transition-colors duration-200"
              style={{ fontSize: "0.8125rem", textDecoration: "none" }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="text-accent hover:text-text transition-colors duration-200"
          style={{ fontSize: "0.8125rem", textDecoration: "none" }}
        >
          Get in touch →
        </a>
      </div>
    </header>
  );
}
