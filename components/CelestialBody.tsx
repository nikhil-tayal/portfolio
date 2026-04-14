"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useTheme } from "./ThemeProvider";

export function CelestialBody() {
  const { theme } = useTheme();

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
    >
      {/* Sky wash — warm glow in light, cool wash in dark */}
      <motion.div
        key={`sky-${theme}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
        className="absolute inset-0"
        style={{
          background:
            theme === "light"
              ? "radial-gradient(1200px 700px at 85% -10%, rgba(224, 113, 73, 0.22), transparent 60%), radial-gradient(800px 500px at 90% 5%, rgba(248, 215, 160, 0.35), transparent 70%)"
              : "radial-gradient(1200px 700px at 82% -10%, rgba(160, 175, 220, 0.08), transparent 60%), radial-gradient(600px 400px at 88% 8%, rgba(240, 235, 220, 0.04), transparent 70%)",
        }}
      />

      <AnimatePresence mode="wait" initial={false}>
        {theme === "light" ? <Sun key="sun" /> : <Moon key="moon" />}
      </AnimatePresence>

      {/* Horizon line — subtle */}
      <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.35 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        className="absolute left-0 right-0 top-[28vh] h-px origin-left"
        style={{
          background:
            theme === "light"
              ? "linear-gradient(to right, transparent, rgba(184, 73, 43, 0.18), transparent)"
              : "linear-gradient(to right, transparent, rgba(224, 113, 73, 0.22), transparent)",
        }}
      />
    </div>
  );
}

function Sun() {
  return (
    <motion.div
      initial={{ y: 320, opacity: 0, scale: 0.85 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: 320, opacity: 0, scale: 0.85 }}
      transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-[6%] top-[8vh] md:right-[10%] md:top-[12vh]"
    >
      {/* Outer bloom */}
      <motion.div
        animate={{
          scale: [1, 1.08, 1],
          opacity: [0.55, 0.75, 0.55],
        }}
        transition={{
          duration: 6,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute inset-0 -m-24 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(240, 180, 110, 0.55), transparent 65%)",
        }}
      />
      {/* Inner bloom */}
      <motion.div
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 4,
          ease: "easeInOut",
          repeat: Infinity,
        }}
        className="absolute inset-0 -m-8 rounded-full blur-xl"
        style={{
          background:
            "radial-gradient(circle, rgba(224, 113, 73, 0.7), transparent 70%)",
        }}
      />
      {/* Sun disc */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 90, ease: "linear", repeat: Infinity }}
        className="relative h-36 w-36 rounded-full md:h-44 md:w-44"
        style={{
          background:
            "radial-gradient(circle at 35% 35%, #fde9c8, #f4b87a 55%, #d9753d 100%)",
          boxShadow:
            "0 0 40px rgba(224, 113, 73, 0.45), inset 0 0 30px rgba(255, 220, 170, 0.5)",
        }}
      />
    </motion.div>
  );
}

function Moon() {
  return (
    <motion.div
      initial={{ y: -160, opacity: 0, scale: 0.9 }}
      animate={{ y: 0, opacity: 1, scale: 1 }}
      exit={{ y: -160, opacity: 0, scale: 0.9 }}
      transition={{ duration: 1.3, ease: [0.22, 1, 0.36, 1] }}
      className="absolute right-[8%] top-[10vh] md:right-[12%] md:top-[14vh]"
    >
      <motion.div
        animate={{ opacity: [0.35, 0.55, 0.35] }}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
        className="absolute inset-0 -m-16 rounded-full blur-3xl"
        style={{
          background:
            "radial-gradient(circle, rgba(220, 210, 190, 0.28), transparent 65%)",
        }}
      />
      <div
        className="relative h-24 w-24 rounded-full md:h-28 md:w-28"
        style={{
          background:
            "radial-gradient(circle at 35% 30%, #f5f1e4, #cfc7b2 60%, #8d8470 100%)",
          boxShadow:
            "inset -12px -6px 20px rgba(0,0,0,0.45), 0 0 30px rgba(240, 235, 220, 0.25)",
        }}
      />
      {/* Stars */}
      <Stars />
    </motion.div>
  );
}

function Stars() {
  const stars = [
    { top: "-40vh", left: "-30vw", delay: 0 },
    { top: "-20vh", left: "-55vw", delay: 0.4 },
    { top: "-60vh", left: "-18vw", delay: 0.8 },
    { top: "-15vh", left: "-75vw", delay: 1.2 },
    { top: "-50vh", left: "-62vw", delay: 0.6 },
    { top: "-35vh", left: "-88vw", delay: 1.6 },
    { top: "10vh", left: "-40vw", delay: 0.9 },
    { top: "-8vh", left: "-22vw", delay: 1.4 },
  ];
  return (
    <>
      {stars.map((s, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0 }}
          animate={{ opacity: [0, 0.8, 0.3, 0.9, 0.4] }}
          transition={{
            delay: s.delay,
            duration: 4 + (i % 3),
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute h-[2px] w-[2px] rounded-full bg-ink-soft"
          style={{ top: s.top, left: s.left }}
        />
      ))}
    </>
  );
}
