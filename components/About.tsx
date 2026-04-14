"use client";

import { SectionLabel } from "./SectionLabel";
import { profile, education } from "@/lib/data";
import { Reveal, StaggerGroup, fadeChild, motion } from "./motion-primitives";

export function About() {
  return (
    <section id="about" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6">
        <Reveal className="col-span-12 md:col-span-2">
          <SectionLabel index="01" title="About" />
        </Reveal>

        <div className="col-span-12 md:col-span-7 md:col-start-4">
          <Reveal>
            <p className="font-serif text-[clamp(1.75rem,3vw,2.6rem)] font-light leading-[1.2] tracking-[-0.01em] text-ink">
              {profile.summary}
            </p>
          </Reveal>

          <Reveal>
            <p className="mt-10 max-w-2xl text-base leading-relaxed text-ink-soft">
              {profile.longSummary}
            </p>
          </Reveal>

          <StaggerGroup className="mt-14 grid grid-cols-1 gap-10 border-t border-rule pt-10 md:grid-cols-2">
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
      </div>
    </section>
  );
}

function Detail({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
        {label}
      </div>
      <div className="mt-2 text-sm leading-relaxed text-ink">{value}</div>
    </div>
  );
}
