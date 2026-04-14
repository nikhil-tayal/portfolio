"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const links = [
  { href: "#about", label: "About" },
  { href: "#work", label: "Work" },
  { href: "#projects", label: "Projects" },
  { href: "#skills", label: "Skills" },
  { href: "#contact", label: "Contact" },
];

export function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-md bg-paper/75 border-b border-rule"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-4 md:px-12">
        <a
          href="#top"
          className="font-mono text-[11px] uppercase tracking-[0.22em] text-ink"
        >
          <span className="text-accent">N</span>T<span className="text-ink-muted">/</span>portfolio
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link, i) => (
            <a
              key={link.href}
              href={link.href}
              className="group flex items-baseline gap-1.5 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted transition-colors hover:text-ink"
            >
              <span className="text-[9px] text-accent/70">
                0{i + 1}
              </span>
              <span>{link.label}</span>
            </a>
          ))}
        </nav>

        <motion.button
          type="button"
          onClick={toggle}
          aria-label="Toggle theme"
          whileHover={{ rotate: theme === "light" ? -12 : 12 }}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 18 }}
          className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full border border-rule text-ink-muted hover:border-ink hover:text-ink"
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === "light" ? (
              <motion.span
                key="moon"
                initial={{ y: 18, opacity: 0, rotate: -90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: -18, opacity: 0, rotate: 90 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute"
              >
                <Moon className="h-3.5 w-3.5" strokeWidth={1.5} />
              </motion.span>
            ) : (
              <motion.span
                key="sun"
                initial={{ y: -18, opacity: 0, rotate: 90 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                exit={{ y: 18, opacity: 0, rotate: -90 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                className="absolute"
              >
                <Sun className="h-3.5 w-3.5" strokeWidth={1.5} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </header>
  );
}
