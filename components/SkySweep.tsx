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
    <div className="pointer-events-none fixed inset-0 z-[65]" aria-hidden>
      <AnimatePresence>
        {sweeps.map((s) => {
          const { x, y } = readOrigin();
          return (
            <motion.span
              key={s.id}
              initial={{ scale: 0, opacity: 0.95 }}
              animate={{ scale: 90, opacity: [0.95, 0.85, 0] }}
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
                    ? "radial-gradient(circle, rgba(245,245,250,0.97), rgba(220,220,240,0.6) 40%, rgba(245,245,250,0) 72%)"
                    : "radial-gradient(circle, rgba(8,8,15,0.97), rgba(10,10,20,0.75) 45%, rgba(8,8,15,0) 78%)",
              }}
            />
          );
        })}
      </AnimatePresence>
    </div>
  );
}
