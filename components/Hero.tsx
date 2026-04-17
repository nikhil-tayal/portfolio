"use client";

import { ArrowUpRight } from "lucide-react";
import { motion } from "framer-motion";
import { profile } from "@/lib/data";
import { ease } from "./motion-primitives";
import { AnimatedName } from "./AnimatedName";

const container = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.1, delayChildren: 0.05 },
  },
};

const item = {
  hidden: { opacity: 0, y: 22 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.85, ease },
  },
};

const titleLine = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 1.05, ease } },
};

export function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col items-start justify-center px-6 py-28 md:px-16"
    >
      <motion.div
        initial="hidden"
        animate="show"
        variants={container}
        className="mx-auto w-full max-w-[1320px]"
      >
        {/* Name */}
        <h1 className="text-[clamp(3.8rem,12vw,10.5rem)] font-light leading-[0.92] tracking-[-0.03em] text-ink">
          <span className="block">
            <motion.span variants={titleLine} className="inline-block">
              <AnimatedName />
            </motion.span>
          </span>
          <span className="block overflow-hidden pb-[0.15em]">
            <motion.span
              variants={titleLine}
              className="inline-block text-ink-soft"
            >
              Tayal.
            </motion.span>
          </span>
        </h1>

        {/* Description + CTA */}
        <motion.div variants={item} className="mt-12 max-w-2xl">
          <p className="mb-6 font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
            {profile.role} &middot; {profile.location}
          </p>
          <p className="text-[clamp(1rem,1.8vw,1.2rem)] leading-relaxed text-ink-soft">
            {profile.summary}
          </p>

          <p className="mt-5 text-[clamp(0.95rem,1.6vw,1.1rem)] leading-relaxed text-ink-soft">
            Lately, deep into generative AI — running Dockerized ComfyUI on
            serverless GPUs, building virtual try-on and image pipelines with
            custom Python handlers, wiring LLMs into product workflows, and
            automating real ops with computer vision.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <motion.a
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.97 }}
              transition={{ type: "spring", stiffness: 400, damping: 20 }}
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 font-mono text-[10px] uppercase tracking-[0.22em] text-paper"
            >
              See the work
              <ArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                strokeWidth={2}
              />
            </motion.a>
            <a
              href={`mailto:${profile.email}`}
              className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted transition-colors hover:text-ink"
            >
              <span className="link-underline-accent">{profile.email}</span>
            </a>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
