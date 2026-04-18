"use client";

import { motion, useMotionValue, animate } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "./ThemeProvider";
import { OwlDisc } from "./Owl";

const ease = [0.22, 1, 0.36, 1] as const;

export function AnimatedName() {
  const { theme } = useTheme();
  const [visualTheme, setVisualTheme] = useState<"light" | "dark">(theme);
  const [isResting, setIsResting] = useState(false);
  const isReady = useRef(false);
  const firstIRef = useRef<HTMLSpanElement>(null);
  const secondIRef = useRef<HTMLSpanElement>(null);
  const sunRef = useRef<HTMLSpanElement>(null);

  // x = horizontal offset from the second i's centre (negative = left = first i)
  // y = vertical offset from the tittle's natural position
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Distance (px) between centres of the two i letters.
  // Returns a negative number because the first i is to the left of the second.
  const getDx = () => {
    if (!firstIRef.current || !secondIRef.current) return 0;
    const a = firstIRef.current.getBoundingClientRect();
    const b = secondIRef.current.getBoundingClientRect();
    return a.left + a.width / 2 - (b.left + b.width / 2);
  };

  // ── Initial rise ────────────────────────────────────────────────────────────
  useEffect(() => {
    // ThemeProvider's effect already ran (parent effects run first), so the
    // dark class on <html> reflects the real starting theme.
    const actual: "light" | "dark" = document.documentElement.classList.contains("dark")
      ? "dark"
      : "light";
    setVisualTheme(actual);

    // Park the sun at the correct i for the starting theme.
    // Light = day = sun rests at first i (sunrise side, left).
    // Dark  = night = moon rests at second i (sunset side, right).
    x.set(actual === "light" ? getDx() : 0);

    // Rise from ~70 % down the viewport up to resting position.
    y.set(window.innerHeight * 0.7);
    const ctrl = animate(y, 0, { duration: 1.95, ease });

    const t = setTimeout(() => {
      setIsResting(true);
      isReady.current = true;
    }, 1950);

    return () => {
      ctrl.stop();
      clearTimeout(t);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // ── Track sun position for any CSS-var-driven glow effects ──────────────────
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
    const t = setTimeout(track, 2000);
    window.addEventListener("scroll", track, { passive: true });
    window.addEventListener("resize", track);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", track);
      window.removeEventListener("resize", track);
    };
  }, []);

  // ── Arc animation on theme change ───────────────────────────────────────────
  useEffect(() => {
    // Skip the very first run (initial mount / ThemeProvider hydration).
    if (!isReady.current) return;

    const dx = getDx();
    // Arc height scales with distance between the two i's.
    const arcH = Math.min(Math.max(Math.abs(dx) * 0.45, 40), 100);

    setIsResting(false);

    // Day → Night  (light→dark): sun travels left→right, sunrise to sunset.
    // Night → Day  (dark→light): moon travels right→left, sunset to sunrise.
    const targetX = theme === "dark" ? 0 : dx;
    const ctrl1 = animate(x, targetX, { duration: 1.4, ease: "linear" });
    // y arcs above the text and returns to 0 — easeInOut per segment gives a
    // smooth parabolic feel.
    const ctrl2 = animate(y, [0, -arcH, 0], {
      duration: 1.4,
      ease: "easeInOut",
    });

    // Switch sun ↔ moon appearance at the arc's peak.
    const mid = setTimeout(() => setVisualTheme(theme), 700);
    const done = setTimeout(() => setIsResting(true), 1450);

    return () => {
      ctrl1.stop();
      ctrl2.stop();
      clearTimeout(mid);
      clearTimeout(done);
    };
  }, [theme]); // eslint-disable-line react-hooks/exhaustive-deps

  const isDark = visualTheme === "dark";

  return (
    <span className="relative inline-block">
      <span>N</span>
      {/* First i — no separate dot; the owl perches here in dark/night mode */}
      <span className="relative inline-block" ref={firstIRef}>
        ı
      </span>
      <span>k</span>
      <span>h</span>
      {/* Second i — the owl lives here and travels via the x motion value */}
      <span className="relative inline-block" ref={secondIRef}>
        ı
        {/* The animated owl + halo.
            `left: 50%` centres it on the second i; `x` then moves it
            to whichever i it should rest at. */}
        <motion.span
          ref={sunRef}
          aria-hidden
          style={{
            x,
            y,
            position: "absolute",
            top: "-0.08em",
            left: "50%",
            marginLeft: "-0.12em",
            width: "0.24em",
            height: "0.24em",
            pointerEvents: "none",
          }}
        >
          {/* Halo glow — warm amber when awake (night), cool/soft when sleeping (day) */}
          <span
            style={{
              display: "block",
              position: "absolute",
              top: "50%",
              left: "50%",
              width: "0.7em",
              height: "0.7em",
              marginTop: "-0.35em",
              marginLeft: "-0.35em",
            }}
          >
            <motion.span
              animate={{
                opacity: isResting ? (isDark ? [0.45, 0.75, 0.45] : [0.12, 0.22, 0.12]) : 0,
                scale: isResting ? [1, 1.15, 1] : 1,
              }}
              transition={{ duration: 4.5, ease: "easeInOut", repeat: Infinity }}
              style={{
                display: "block",
                width: "100%",
                height: "100%",
                borderRadius: "50%",
                filter: "blur(5px)",
                background: isDark
                  ? "radial-gradient(circle, rgba(245,180,90,0.85), transparent 65%)"
                  : "radial-gradient(circle, rgba(18,18,30,0.35), transparent 70%)",
              }}
            />
          </span>

          {/* Owl silhouette */}
          <OwlDisc awake={isDark} tone={isDark ? "dark" : "light"} />
        </motion.span>
      </span>
      <span>l</span>
    </span>
  );
}
