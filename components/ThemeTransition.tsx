"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";

type Burst = {
  id: number;
  to: "light" | "dark";
  x: number;
  y: number;
};

function readOrigin(theme: "light" | "dark") {
  const rootStyle = getComputedStyle(document.documentElement);
  const xRaw = rootStyle.getPropertyValue("--sun-x").trim();
  const yRaw = rootStyle.getPropertyValue("--sun-y").trim();
  if (xRaw && yRaw) return { x: parseFloat(xRaw), y: parseFloat(yRaw) };
  return {
    x: Math.round(window.innerWidth * 0.5),
    y: Math.round(window.innerHeight * (theme === "light" ? 0.3 : 0.3)),
  };
}

export function ThemeTransition() {
  const { theme } = useTheme();
  const [bursts, setBursts] = useState<Burst[]>([]);
  const mounted = useRef(false);
  const counter = useRef(0);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const { x, y } = readOrigin(theme);
    const id = ++counter.current;
    setBursts((prev) => [...prev, { id, to: theme, x, y }]);
    const t = window.setTimeout(() => {
      setBursts((prev) => prev.filter((b) => b.id !== id));
    }, 1600);
    return () => window.clearTimeout(t);
  }, [theme]);

  return (
    <div className="pointer-events-none fixed inset-0 z-[70]" aria-hidden>
      <AnimatePresence>
        {bursts.map((b) => (
          <motion.span
            key={b.id}
            initial={{ scale: 0, opacity: 1 }}
            animate={{ scale: 80, opacity: [1, 1, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
            className="absolute block rounded-full"
            style={{
              left: b.x,
              top: b.y,
              width: 40,
              height: 40,
              marginLeft: -20,
              marginTop: -20,
              background:
                b.to === "light"
                  ? "radial-gradient(circle, rgba(253, 233, 200, 0.95), rgba(224, 113, 73, 0.55) 42%, rgba(242, 237, 227, 0) 78%)"
                  : "radial-gradient(circle, rgba(30, 26, 22, 0.95), rgba(14, 12, 10, 0.7) 48%, rgba(14, 12, 10, 0) 80%)",
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
