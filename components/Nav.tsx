"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";
import { OwlGlyph, OwlEyes } from "./Owl";

const links = [
  { href: "/#about", label: "About" },
  { href: "/#work", label: "Work" },
  { href: "/#projects", label: "Projects" },
  { href: "/#skills", label: "Skills" },
  { href: "/#contact", label: "Contact" },
];

export function Nav() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "backdrop-blur-xl bg-paper/80 border-b border-rule"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-[1320px] items-center justify-between px-6 py-4 md:px-16">
        <a
          href="/#top"
          className="group inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.24em] text-ink"
          aria-label="Home"
        >
          <span className="flex h-6 w-6 items-center justify-center rounded-full border border-rule text-ink transition-colors group-hover:border-ink-soft">
            <OwlGlyph size={13} />
          </span>
          <span>
            <span className="text-accent">N</span>T
            <span className="text-ink-muted mx-1">/</span>
            <span className="text-ink-muted">portfolio</span>
          </span>
        </a>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <motion.button
          type="button"
          onClick={toggle}
          aria-label={theme === "light" ? "Wake the owl" : "Let the owl rest"}
          title={theme === "light" ? "Wake the owl" : "Let the owl rest"}
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 380, damping: 18 }}
          className="relative flex h-8 w-8 items-center justify-center rounded-full border border-rule text-ink-muted transition-colors hover:border-ink-soft hover:text-ink"
        >
          <AnimatePresence mode="wait" initial={false}>
            {theme === "light" ? (
              <motion.span
                key="eyes-closed"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute"
              >
                <OwlEyes closed size={15} />
              </motion.span>
            ) : (
              <motion.span
                key="eyes-open"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                className="absolute text-accent"
              >
                <OwlEyes size={15} />
              </motion.span>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </header>
  );
}
