"use client";

import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

const ease = [0.22, 1, 0.36, 1] as const;

type Phase = "rising" | "resting" | "swapping";

export function AnimatedName() {
  const { theme } = useTheme();
  const [phase, setPhase] = useState<Phase>("rising");
  const [visualTheme, setVisualTheme] = useState(theme);
  const mounted = useRef(false);
  const sunRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const t = window.setTimeout(() => setPhase("resting"), 1950);
    return () => window.clearTimeout(t);
  }, []);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    setPhase("swapping");
    const midway = window.setTimeout(() => setVisualTheme(theme), 600);
    const done = window.setTimeout(() => setPhase("resting"), 1350);
    return () => {
      window.clearTimeout(midway);
      window.clearTimeout(done);
    };
  }, [theme]);

  useEffect(() => {
    const track = () => {
      if (!sunRef.current) return;
      const r = sunRef.current.getBoundingClientRect();
      document.documentElement.style.setProperty(
        "--sun-x",
        `${Math.round(r.left + r.width / 2)}px`,
      );
      document.documentElement.style.setProperty(
        "--sun-y",
        `${Math.round(r.top + r.height / 2)}px`,
      );
    };
    track();
    const t = window.setTimeout(track, 2000);
    window.addEventListener("scroll", track, { passive: true });
    window.addEventListener("resize", track);
    return () => {
      window.clearTimeout(t);
      window.removeEventListener("scroll", track);
      window.removeEventListener("resize", track);
    };
  }, []);

  return (
    <span className="relative inline-block">
      <span>N</span>
      <LetterI dot={<PlainTittle />} />
      <span>k</span>
      <span>h</span>
      <LetterI dot={<SunMoonTittle ref={sunRef} phase={phase} visualTheme={visualTheme} />} />
      <span>l</span>
    </span>
  );
}

function LetterI({ dot }: { dot: React.ReactNode }) {
  return (
    <span className="relative inline-block">
      <span>ı</span>
      <span
        className="pointer-events-none absolute left-1/2 -translate-x-1/2"
        style={{ top: "0.1em" }}
      >
        {dot}
      </span>
    </span>
  );
}

function PlainTittle() {
  return (
    <span
      aria-hidden
      className="block rounded-full bg-current"
      style={{ width: "0.14em", height: "0.14em" }}
    />
  );
}

type SunMoonProps = {
  ref: React.Ref<HTMLSpanElement>;
  phase: Phase;
  visualTheme: "light" | "dark";
};

function SunMoonTittle({ ref, phase, visualTheme }: SunMoonProps) {
  const isDark = visualTheme === "dark";

  const sunBg =
    "radial-gradient(circle at 35% 35%, #fff0c8, #f5b45a 52%, #c85020 100%)";
  const moonBg =
    "radial-gradient(circle at 38% 30%, #EEF2FF, #C7D4F8 55%, #7890D0 100%)";

  const variants = {
    rising: {
      scale: [26, 26, 1],
      y: ["72vh", "0vh", "0vh"],
      opacity: [0, 1, 1],
      transition: {
        duration: 1.95,
        ease,
        times: [0, 0.78, 1],
      },
    },
    resting: {
      scale: 1,
      y: 0,
      opacity: 1,
      transition: { duration: 0.4, ease },
    },
    swapping: {
      scale: [1, 24, 24, 1],
      y: 0,
      opacity: 1,
      transition: {
        duration: 1.35,
        ease,
        times: [0, 0.45, 0.55, 1],
      },
    },
  };

  return (
    <span
      aria-hidden
      className="relative block"
      style={{ width: "0.14em", height: "0.14em" }}
    >
      {/* Halo glow */}
      <motion.span
        aria-hidden
        animate={{
          opacity:
            phase === "resting"
              ? isDark
                ? [0.25, 0.5, 0.25]
                : [0.5, 0.85, 0.5]
              : 0,
          scale: [1, 1.2, 1],
        }}
        transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full blur-md"
        style={{
          width: "0.55em",
          height: "0.55em",
          background: isDark
            ? "radial-gradient(circle, rgba(160,180,255,0.5), transparent 70%)"
            : "radial-gradient(circle, rgba(245,160,80,0.85), transparent 65%)",
        }}
      />

      {/* The disc */}
      <motion.span
        ref={ref}
        initial={
          phase === "rising" ? { scale: 26, y: "72vh", opacity: 0 } : false
        }
        animate={phase}
        variants={variants}
        className="relative block h-full w-full rounded-full"
        style={{
          background: isDark ? moonBg : sunBg,
          boxShadow: isDark
            ? "inset -0.05em -0.02em 0.06em rgba(0,0,0,0.45), 0 0 0.18em rgba(160,180,255,0.35)"
            : "0 0 0.22em 0.02em rgba(200,100,40,0.65), 0 0 0.08em rgba(255,230,160,0.9)",
          transformOrigin: "center",
        }}
      />
    </span>
  );
}
