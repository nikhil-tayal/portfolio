"use client";

import { ArrowUpRight, Film, Globe } from "lucide-react";
import { projects } from "@/lib/data";
import { Reveal, StaggerGroup, fadeChild, motion } from "./motion-primitives";

const statusLabel: Record<string, string> = {
  live: "Live",
  "in-development": "In development",
  archived: "Archived",
};

const statusColor: Record<string, string> = {
  live: "bg-accent",
  "in-development": "bg-ink-soft",
  archived: "bg-ink-muted/50",
};

function GithubMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
      className={className}
    >
      <path d="M12 .5C5.73.5.75 5.48.75 11.75c0 4.98 3.23 9.2 7.71 10.69.56.1.77-.24.77-.53v-1.87c-3.14.68-3.8-1.51-3.8-1.51-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.68.08-.68 1.13.08 1.72 1.16 1.72 1.16 1 1.72 2.64 1.22 3.28.93.1-.73.39-1.22.71-1.5-2.5-.29-5.14-1.25-5.14-5.55 0-1.23.44-2.23 1.16-3.02-.12-.29-.5-1.43.11-2.98 0 0 .94-.3 3.09 1.16a10.7 10.7 0 0 1 5.62 0c2.14-1.46 3.09-1.16 3.09-1.16.62 1.55.23 2.69.11 2.98.72.79 1.16 1.79 1.16 3.02 0 4.32-2.64 5.26-5.15 5.54.41.35.77 1.03.77 2.08v3.08c0 .3.2.64.78.53 4.47-1.5 7.69-5.71 7.69-10.69C23.25 5.48 18.27.5 12 .5Z" />
    </svg>
  );
}

export function Projects() {
  return (
    <section id="projects" className="px-6 py-28 md:px-16 md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Projects
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mt-4 text-[clamp(2rem,4.5vw,3.5rem)] font-light leading-tight tracking-[-0.02em] text-ink">
            Selected work
          </h2>
        </Reveal>

        <Reveal>
          <p className="mt-4 max-w-md text-[14px] leading-relaxed text-ink-muted">
            Live links and walkthroughs are being added. Email me for a
            private demo of anything here.
          </p>
        </Reveal>

        <StaggerGroup
          amount={0.05}
          className="mt-14 flex flex-col gap-px bg-rule"
        >
          {projects.map((p) => (
            <motion.article
              key={p.name}
              variants={fadeChild}
              className="group relative grid grid-cols-12 gap-6 overflow-hidden bg-paper p-6 transition-colors hover:bg-paper-deep md:p-10"
            >
              <div className="col-span-12 flex items-start justify-between md:col-span-3">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                    {p.period}
                  </div>
                  <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.18em]">
                    <span
                      className={`h-1.5 w-1.5 rounded-full ${statusColor[p.status]}`}
                    />
                    <span className="text-ink-muted">
                      {statusLabel[p.status]}
                    </span>
                  </div>
                </div>
              </div>

              <div className="col-span-12 md:col-span-9">
                <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1.5">
                  <h3 className="text-[clamp(1.4rem,2.5vw,2.2rem)] font-light tracking-[-0.02em] text-ink">
                    {p.name}
                  </h3>
                  <p className="text-base text-ink-muted">
                    — {p.tagline}
                  </p>
                </div>

                <p className="mt-4 max-w-3xl text-[14px] leading-relaxed text-ink-soft">
                  {p.description}
                </p>

                <div className="mt-5 flex flex-wrap gap-1.5">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full border border-rule px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-ink-muted"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="mt-7 flex flex-wrap items-center gap-5">
                  <ProjectLink
                    href={p.liveUrl}
                    icon={<Globe className="h-3.5 w-3.5" strokeWidth={1.5} />}
                    label="Live"
                  />
                  <ProjectLink
                    href={p.loomUrl}
                    icon={<Film className="h-3.5 w-3.5" strokeWidth={1.5} />}
                    label="Walkthrough"
                  />
                  <ProjectLink
                    href={p.githubUrl}
                    icon={<GithubMark className="h-3.5 w-3.5" />}
                    label="Code"
                  />
                </div>
              </div>

              <motion.div
                variants={{
                  hover: { x: 4, y: -4, color: "var(--accent)" },
                }}
                transition={{ type: "spring", stiffness: 380, damping: 20 }}
                className="absolute right-6 top-6 text-ink-muted/50 md:right-10 md:top-10"
              >
                <ArrowUpRight className="h-5 w-5" strokeWidth={1.25} />
              </motion.div>
            </motion.article>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}

function ProjectLink({
  href,
  icon,
  label,
}: {
  href?: string;
  icon: React.ReactNode;
  label: string;
}) {
  const pending = !href;
  const content = (
    <span
      className={`inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.22em] ${
        pending ? "text-ink-muted/50" : "text-ink"
      }`}
    >
      {icon}
      <span className={pending ? "" : "link-underline"}>
        {pending ? `${label} — soon` : label}
      </span>
    </span>
  );

  if (pending) return content;
  return (
    <motion.a
      whileHover={{ y: -1 }}
      href={href}
      target="_blank"
      rel="noreferrer noopener"
    >
      {content}
    </motion.a>
  );
}
