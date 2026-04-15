"use client";

import { profile, education } from "@/lib/data";
import { Reveal, StaggerGroup, fadeChild, motion } from "./motion-primitives";

export function About() {
  return (
    <section id="about" className="px-6 py-28 md:px-16 md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            About
          </p>
        </Reveal>

        <Reveal>
          <p className="mt-6 max-w-2xl text-[clamp(1.4rem,2.4vw,2rem)] font-light leading-[1.3] tracking-[-0.01em] text-ink">
            {profile.summary}
          </p>
        </Reveal>

        <Reveal>
          <p className="mt-8 max-w-xl text-[15px] leading-relaxed text-ink-soft">
            {profile.longSummary}
          </p>
        </Reveal>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-8 border-t border-rule pt-10 md:grid-cols-2 lg:grid-cols-4">
          <motion.div variants={fadeChild}>
            <Detail label="Currently" value="Thumby Aviation · Growify · EasySupply.in" />
          </motion.div>
          <motion.div variants={fadeChild}>
            <Detail label="Focus areas" value="UI systems · microservices · GenAI products" />
          </motion.div>
          <motion.div variants={fadeChild}>
            <Detail
              label="Education"
              value={`${education.degree}, ${education.school.split(" (")[0]} — ${education.period}`}
            />
          </motion.div>
          <motion.div variants={fadeChild}>
            <Detail label="Based in" value={profile.location} />
          </motion.div>
        </StaggerGroup>
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
        {label}
      </div>
      <div className="mt-2 text-[14px] leading-relaxed text-ink">{value}</div>
    </div>
  );
}
