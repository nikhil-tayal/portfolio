"use client";

import { ArrowUpRight, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { profile, stats } from "@/lib/data";
import { ease } from "./motion-primitives";
import { AnimatedName } from "./AnimatedName";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.09, delayChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease },
  },
};

const titleLine = {
  hidden: { opacity: 0, y: 80 },
  show: { opacity: 1, y: 0, transition: { duration: 1, ease } },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col justify-between px-6 pb-12 pt-32 md:px-12 md:pt-36"
    >
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="mx-auto grid w-full max-w-[1400px] flex-1 grid-cols-12 gap-6"
      >
        <motion.aside
          variants={item}
          className="col-span-12 flex items-end md:col-span-2 md:items-start md:pt-4"
        >
          <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.22em] text-ink-muted">
            <span className="relative inline-flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full rounded-full bg-accent opacity-70 pulse-dot" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
            </span>
            <span>Available · Q2 2026</span>
          </div>
        </motion.aside>

        <div className="col-span-12 flex flex-col justify-center md:col-span-10">
          <motion.p
            variants={item}
            className="font-mono text-[11px] uppercase tracking-[0.28em] text-ink-muted"
          >
            [ portfolio · 2026 ]
          </motion.p>

          <h1 className="font-serif mt-6 text-[clamp(3rem,10vw,9.5rem)] font-light leading-[0.95] tracking-[-0.03em] text-ink">
            <span className="block overflow-visible">
              <motion.span variants={titleLine} className="inline-block">
                <AnimatedName />
              </motion.span>
            </span>
            <span className="block overflow-hidden">
              <motion.span
                variants={titleLine}
                className="inline-block italic text-ink-soft"
              >
                Tayal.
              </motion.span>
            </span>
          </h1>

          <motion.div
            variants={item}
            className="mt-10 grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12"
          >
            <div className="md:col-span-7">
              <p className="font-serif text-[clamp(1.25rem,2.2vw,1.75rem)] font-light leading-snug text-ink-soft">
                Senior full-stack developer shipping production web apps across{" "}
                <span className="italic text-ink">fintech</span>,{" "}
                <span className="italic text-ink">aviation</span>,{" "}
                <span className="italic text-ink">edtech</span> and{" "}
                <span className="italic text-ink">e-commerce</span> — currently
                building AI-powered products on serverless GPUs.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-4">
                <motion.a
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.97 }}
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  href="#projects"
                  className="group inline-flex items-center gap-2 rounded-full bg-ink px-5 py-2.5 font-mono text-[11px] uppercase tracking-[0.2em] text-paper"
                >
                  See the work
                  <ArrowUpRight
                    className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    strokeWidth={1.75}
                  />
                </motion.a>
                <a
                  href={`mailto:${profile.email}`}
                  className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted transition-colors hover:text-ink"
                >
                  <span className="link-underline-accent">{profile.email}</span>
                </a>
              </div>
            </div>

            <div className="md:col-span-5 md:border-l md:border-rule md:pl-8">
              <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                <MapPin className="h-3 w-3" strokeWidth={1.5} />
                {profile.location}
              </div>
              <dl className="mt-6 grid grid-cols-2 gap-x-6 gap-y-6">
                {stats.map((s, i) => (
                  <motion.div
                    key={s.label}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 + i * 0.08, duration: 0.6, ease }}
                  >
                    <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                      {s.label}
                    </dt>
                    <dd className="font-serif mt-1 text-3xl font-light tracking-tight text-ink">
                      {s.value}
                    </dd>
                  </motion.div>
                ))}
              </dl>
            </div>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.3, duration: 0.8 }}
        className="mx-auto mt-12 flex w-full max-w-[1400px] items-end justify-between border-t border-rule pt-4 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted"
      >
        <motion.span
          animate={{ y: [0, 4, 0] }}
          transition={{ duration: 2.2, ease: "easeInOut", repeat: Infinity }}
        >
          ↓ Scroll
        </motion.span>
        <span className="hidden md:inline">
          ———————————————————————————————————————
        </span>
        <span>01 / 05</span>
      </motion.div>
    </section>
  );
}

