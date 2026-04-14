"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

type Sweep = {
  id: number;
  to: "light" | "dark";
};

function readOrigin() {
  const s = getComputedStyle(document.documentElement);
  const x = parseFloat(s.getPropertyValue("--sun-x"));
  const y = parseFloat(s.getPropertyValue("--sun-y"));
  if (Number.isFinite(x) && Number.isFinite(y)) return { x, y };
  return { x: window.innerWidth * 0.5, y: window.innerHeight * 0.28 };
}

export function SkySweep() {
  const { theme } = useTheme();
  const [sweeps, setSweeps] = useState<Sweep[]>([]);
  const mounted = useRef(false);
  const counter = useRef(0);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const id = ++counter.current;
    setSweeps((prev) => [...prev, { id, to: theme }]);
    const t = window.setTimeout(() => {
      setSweeps((prev) => prev.filter((s) => s.id !== id));
    }, 1500);
    return () => window.clearTimeout(t);
  }, [theme]);

  return (
    <>
      {/* Persistent atmospheric wash tied to theme */}
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-0 z-0"
        animate={{ opacity: 1 }}
        style={{
          background:
            theme === "light"
              ? "radial-gradient(1000px 600px at 70% 10%, rgba(240,180,110,0.22), transparent 65%), radial-gradient(700px 500px at 30% 90%, rgba(255,220,180,0.18), transparent 70%)"
              : "radial-gradient(1000px 600px at 70% 10%, rgba(180,190,220,0.06), transparent 65%), radial-gradient(700px 500px at 25% 90%, rgba(120,130,170,0.05), transparent 75%)",
          transition: "background 1.2s cubic-bezier(0.22, 1, 0.36, 1)",
        }}
      />

      {/* Full-viewport burst that rides the swap — originates at the sun */}
      <div className="pointer-events-none fixed inset-0 z-[65]" aria-hidden>
        <AnimatePresence>
          {sweeps.map((s) => {
            const { x, y } = readOrigin();
            return (
              <motion.span
                key={s.id}
                initial={{ scale: 0, opacity: 0.95 }}
                animate={{ scale: 90, opacity: [0.95, 0.9, 0] }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
                className="absolute block rounded-full"
                style={{
                  left: x,
                  top: y,
                  width: 40,
                  height: 40,
                  marginLeft: -20,
                  marginTop: -20,
                  background:
                    s.to === "light"
                      ? "radial-gradient(circle, rgba(253,233,200,0.95), rgba(240,170,110,0.55) 38%, rgba(242,237,227,0) 72%)"
                      : "radial-gradient(circle, rgba(24,20,16,0.95), rgba(14,12,10,0.7) 45%, rgba(14,12,10,0) 78%)",
                }}
              />
            );
          })}
        </AnimatePresence>
      </div>

      {/* Twinkling stars — only in dark */}
      {theme === "dark" && <Stars />}
    </>
  );
}

function Stars() {
  const stars = [
    { top: "12%", left: "8%", delay: 0 },
    { top: "18%", left: "22%", delay: 0.5 },
    { top: "9%", left: "38%", delay: 1.1 },
    { top: "26%", left: "55%", delay: 0.8 },
    { top: "14%", left: "72%", delay: 0.3 },
    { top: "7%", left: "84%", delay: 1.4 },
    { top: "32%", left: "12%", delay: 1.7 },
    { top: "24%", left: "90%", delay: 0.9 },
    { top: "40%", left: "45%", delay: 2.1 },
    { top: "22%", left: "65%", delay: 1.6 },
  ];

  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden>
      {stars.map((s, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.85, 0.25, 0.95, 0.35] }}
          transition={{
            delay: s.delay,
            duration: 4 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute rounded-full bg-ink-soft"
          style={{
            top: s.top,
            left: s.left,
            width: i % 3 === 0 ? 3 : 2,
            height: i % 3 === 0 ? 3 : 2,
          }}
        />
      ))}
    </div>
  );
}
