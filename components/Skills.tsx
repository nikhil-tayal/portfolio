"use client";

import { SectionLabel } from "./SectionLabel";
import { skillGroups } from "@/lib/data";
import { Reveal, StaggerGroup, fadeChild, motion } from "./motion-primitives";

export function Skills() {
  return (
    <section id="skills" className="bg-paper-deep px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6">
        <Reveal className="col-span-12 md:col-span-2">
          <SectionLabel index="04" title="Toolkit" />
        </Reveal>

        <div className="col-span-12 md:col-span-10">
          <Reveal>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light leading-[0.98] tracking-[-0.02em] text-ink">
              Tools I reach for
              <br />
              <span className="italic text-ink-soft">on a given Tuesday.</span>
            </h2>
          </Reveal>

          <div className="mt-16 flex flex-col divide-y divide-rule border-y border-rule">
            {skillGroups.map((group, i) => (
              <StaggerGroup
                key={group.label}
                amount={0.3}
                className="grid grid-cols-12 gap-6 py-8"
              >
                <motion.div
                  variants={fadeChild}
                  className="col-span-12 md:col-span-3"
                >
                  <div className="flex items-baseline gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                    <span>0{i + 1}</span>
                    <span className="text-ink">{group.label}</span>
                  </div>
                </motion.div>
                <ul className="col-span-12 flex flex-wrap gap-x-5 gap-y-3 md:col-span-9">
                  {group.items.map((item) => (
                    <motion.li
                      key={item}
                      variants={fadeChild}
                      whileHover={{ y: -2, color: "var(--accent)" }}
                      transition={{ type: "spring", stiffness: 400, damping: 18 }}
                      className="font-serif text-lg font-light text-ink"
                    >
                      {item}
                    </motion.li>
                  ))}
                </ul>
              </StaggerGroup>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
