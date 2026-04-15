"use client";

import { skillGroups } from "@/lib/data";
import { Reveal, StaggerGroup, fadeChild, motion } from "./motion-primitives";

export function Skills() {
  return (
    <section id="skills" className="bg-paper-deep px-6 py-28 md:px-16 md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Skills
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-tight tracking-[-0.02em] text-ink">
            Toolkit
          </h2>
        </Reveal>

        <div className="mt-14 flex flex-col divide-y divide-rule border-y border-rule">
          {skillGroups.map((group) => (
            <StaggerGroup
              key={group.label}
              amount={0.25}
              className="grid grid-cols-12 gap-6 py-8"
            >
              <motion.div
                variants={fadeChild}
                className="col-span-12 md:col-span-3"
              >
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                  {group.label}
                </span>
              </motion.div>

              <motion.div
                variants={fadeChild}
                className="col-span-12 md:col-span-9"
              >
                <p className="text-[14px] leading-relaxed text-ink-soft">
                  {group.items.join(" · ")}
                </p>
              </motion.div>
            </StaggerGroup>
          ))}
        </div>
      </div>
    </section>
  );
}
