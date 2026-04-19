"use client";

import Link from "next/link";
import { ArrowUpRight, Play, ExternalLink } from "lucide-react";
import { experience, type ShowcaseItem } from "@/lib/data";
import { Reveal, StaggerGroup, fadeChild, motion } from "./motion-primitives";

const placeholderGradients = [
  "linear-gradient(135deg, rgba(37,99,235,0.10) 0%, rgba(79,129,245,0.05) 100%)",
  "linear-gradient(135deg, rgba(79,129,245,0.11) 0%, rgba(99,102,241,0.06) 100%)",
  "linear-gradient(135deg, rgba(56,189,248,0.09) 0%, rgba(37,99,235,0.05) 100%)",
  "linear-gradient(135deg, rgba(99,102,241,0.09) 0%, rgba(37,99,235,0.06) 100%)",
];

export function Experience() {
  return (
    <section id="work" className="bg-paper-deep px-6 py-28 md:px-16 md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Experience
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-tight tracking-[-0.02em] text-ink">
            Work history
          </h2>
        </Reveal>

        <StaggerGroup
          amount={0.05}
          className="mt-14 divide-y divide-rule border-y border-rule"
        >
          {experience.map((job) => (
            <motion.article
              key={job.company}
              id={`company-${job.company.toLowerCase().replace(/\s+/g, "-")}`}
              variants={fadeChild}
              className="grid grid-cols-12 gap-6 py-10"
            >
              {/* Left: company meta */}
              <div className="col-span-12 md:col-span-3">
                <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                  {job.period}
                </div>
                <div className="mt-3 text-[1.1rem] font-medium tracking-tight text-ink">
                  {job.company}
                </div>
                <div className="mt-1 text-[12px] text-ink-muted">{job.location}</div>
              </div>

              {/* Right: role, bullets, tech, showcase */}
              <div className="col-span-12 md:col-span-9">
                <div className="flex flex-wrap items-baseline gap-2.5">
                  <h3 className="text-[15px] font-medium text-ink">{job.role}</h3>
                  {job.subtitle && (
                    <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-ink-muted">
                      · {job.subtitle}
                    </span>
                  )}
                </div>

                <ul className="mt-4 space-y-2 text-[14px] leading-relaxed text-ink-soft">
                  {job.bullets.map((b, bi) => (
                    <li
                      key={bi}
                      className="relative pl-4 before:absolute before:left-0 before:top-[0.72em] before:h-px before:w-2 before:bg-ink-muted/50"
                    >
                      {b}
                    </li>
                  ))}
                </ul>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {job.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-rule bg-paper px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                {job.showcase && job.showcase.length > 0 && (
                  <ShowcaseGrid items={job.showcase} />
                )}
              </div>
            </motion.article>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function ShowcaseGrid({ items }: { items: ShowcaseItem[] }) {
  return (
    <div className="mt-8 border-t border-rule pt-8">
      <div className="mb-5 flex items-center gap-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
          Showcase
        </span>
        <span className="h-px flex-1 bg-rule" aria-hidden />
      </div>

      <StaggerGroup
        amount={0.1}
        className={`grid gap-4 ${
          items.length === 1
            ? "grid-cols-1 max-w-xs"
            : items.length === 2
              ? "grid-cols-1 sm:grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        }`}
      >
        {items.map((item, i) => (
          <motion.div key={item.name} variants={fadeChild}>
            <ShowcaseCard item={item} index={i} />
          </motion.div>
        ))}
      </StaggerGroup>
    </div>
  );
}

function ShowcaseCard({ item, index }: { item: ShowcaseItem; index: number }) {
  const hasScreenshot = !!item.screenshot;
  const hasLoom = !!item.loomUrl;
  const hasLive = !!item.liveUrl;
  const gradient = placeholderGradients[index % placeholderGradients.length];

  return (
    <motion.div
      whileHover={{ y: -3 }}
      transition={{ type: "spring", stiffness: 380, damping: 24 }}
      className="group overflow-hidden rounded-xl border border-rule bg-paper transition-shadow hover:shadow-[0_8px_28px_-4px_rgba(0,0,0,0.1)]"
    >
      <Link
        href={`/showcase/${item.slug}`}
        aria-label={`Open ${item.name} showcase`}
        className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div className="relative aspect-video w-full overflow-hidden bg-paper-deep">
          {hasScreenshot ? (
            <img
              src={item.screenshot}
              alt={item.name}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          ) : (
            <>
              <div
                className="absolute inset-0"
                style={{ background: gradient }}
                aria-hidden
              />
              <svg className="absolute inset-0 h-full w-full opacity-[0.04]" aria-hidden>
                <pattern
                  id={`dots-${index}`}
                  x="0"
                  y="0"
                  width="20"
                  height="20"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1.5" fill="currentColor" />
                </pattern>
                <rect width="100%" height="100%" fill={`url(#dots-${index})`} />
              </svg>
              <span
                className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[5rem] font-light leading-none text-ink opacity-[0.06]"
                aria-hidden
              >
                {item.name[0]}
              </span>
            </>
          )}

          {hasLoom && (
            <span
              aria-hidden
              className={`absolute inset-0 flex items-center justify-center transition-opacity ${
                hasScreenshot
                  ? "bg-ink/0 opacity-0 group-hover:bg-ink/20 group-hover:opacity-100"
                  : "opacity-100"
              }`}
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-paper shadow-md transition-transform group-hover:scale-[1.05]">
                <Play
                  className="h-4 w-4 translate-x-0.5 text-accent"
                  fill="currentColor"
                  strokeWidth={0}
                />
              </span>
            </span>
          )}
        </div>

        <div className="p-4">
          <h4 className="flex items-center justify-between gap-3 text-[13px] font-medium leading-snug text-ink">
            <span className="min-w-0 flex-1 truncate" title={item.name}>
              {item.name}
            </span>
            <ArrowUpRight
              className="h-3.5 w-3.5 flex-shrink-0 text-ink-muted transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
              strokeWidth={2}
            />
          </h4>
          <p className="mt-1 text-[12px] leading-relaxed text-ink-muted">
            {item.brief}
          </p>

          <div className="mt-3 flex items-center gap-3">
            <span className="font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
              View showcase
            </span>
            {hasLoom && (
              <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                <Play className="h-2.5 w-2.5" fill="currentColor" strokeWidth={0} />
                Walkthrough
              </span>
            )}
            {hasLive && (
              <span className="inline-flex items-center gap-1 font-mono text-[9px] uppercase tracking-[0.18em] text-ink-muted">
                <ExternalLink className="h-2.5 w-2.5" strokeWidth={2} />
                Live
              </span>
            )}
          </div>
        </div>
      </Link>
    </motion.div>
  );
}
