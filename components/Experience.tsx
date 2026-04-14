"use client";

import { SectionLabel } from "./SectionLabel";
import { experience } from "@/lib/data";
import { Reveal, StaggerGroup, fadeChild, motion } from "./motion-primitives";

export function Experience() {
  return (
    <section id="work" className="bg-paper-deep px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6">
        <Reveal className="col-span-12 md:col-span-2">
          <SectionLabel index="02" title="Experience" />
        </Reveal>

        <div className="col-span-12 md:col-span-10">
          <Reveal>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light leading-[0.98] tracking-[-0.02em] text-ink">
              Seven years,
              <br />
              <span className="italic text-ink-soft">ten + ships.</span>
            </h2>
          </Reveal>

          <StaggerGroup
            amount={0.08}
            className="mt-16 divide-y divide-rule border-y border-rule"
          >
            {experience.map((job) => (
              <motion.article
                key={job.company}
                variants={fadeChild}
                whileHover={{ backgroundColor: "var(--paper)" }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="group grid grid-cols-12 gap-6 py-10"
              >
                <div className="col-span-12 md:col-span-3">
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                    {job.period}
                  </div>
                  <div className="mt-3 font-serif text-2xl font-light text-ink transition-colors group-hover:text-accent">
                    {job.company}
                  </div>
                  <div className="mt-1 text-xs text-ink-muted">{job.location}</div>
                </div>

                <div className="col-span-12 md:col-span-9">
                  <div className="flex flex-wrap items-baseline gap-3">
                    <h3 className="text-base font-medium text-ink">{job.role}</h3>
                    {job.subtitle && (
                      <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                        · {job.subtitle}
                      </span>
                    )}
                  </div>

                  <ul className="mt-5 space-y-2.5 text-[15px] leading-relaxed text-ink-soft">
                    {job.bullets.map((b, bi) => (
                      <li
                        key={bi}
                        className="relative pl-5 before:absolute before:left-0 before:top-[0.7em] before:h-px before:w-2.5 before:bg-ink-muted"
                      >
                        {b}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    {job.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.article>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
