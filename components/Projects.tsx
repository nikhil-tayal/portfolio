"use client";

import { ArrowUpRight, Film, Globe } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
import { projects } from "@/lib/data";
import { Reveal, StaggerGroup, fadeChild, motion } from "./motion-primitives";

const statusLabel: Record<string, string> = {
  live: "Live",
  "in-development": "In development",
  archived: "Archived",
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
    <section id="projects" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6">
        <Reveal className="col-span-12 md:col-span-2">
          <SectionLabel index="03" title="Selected work" />
        </Reveal>

        <div className="col-span-12 md:col-span-10">
          <Reveal>
            <h2 className="font-serif text-[clamp(2.5rem,6vw,5rem)] font-light leading-[0.98] tracking-[-0.02em] text-ink">
              Things I've shipped
              <br />
              <span className="italic text-ink-soft">or still shipping.</span>
            </h2>
          </Reveal>
          <Reveal>
            <p className="mt-6 max-w-xl text-sm leading-relaxed text-ink-muted">
              Live links and walkthrough videos are being added. Drop me an email
              if you'd like a private demo of anything here.
            </p>
          </Reveal>

          <StaggerGroup
            amount={0.05}
            className="mt-16 flex flex-col gap-px bg-rule"
          >
            {projects.map((p, i) => (
              <motion.article
                key={p.name}
                variants={fadeChild}
                whileHover="hover"
                className="group relative grid grid-cols-12 gap-6 overflow-hidden bg-paper p-6 transition-colors hover:bg-paper-deep md:p-10"
              >
                <motion.span
                  aria-hidden
                  variants={{
                    hover: { scaleX: 1 },
                  }}
                  initial={{ scaleX: 0 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-accent"
                />

                <div className="col-span-12 flex items-start justify-between md:col-span-3">
                  <div>
                    <div className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                      {String(i + 1).padStart(2, "0")} / {p.period}
                    </div>
                    <div className="mt-4 inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em]">
                      <span
                        className={`h-1.5 w-1.5 rounded-full ${
                          p.status === "live"
                            ? "bg-accent"
                            : p.status === "in-development"
                              ? "bg-ink-soft"
                              : "bg-ink-muted/50"
                        }`}
                      />
                      <span className="text-ink-muted">
                        {statusLabel[p.status]}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="col-span-12 md:col-span-9">
                  <div className="flex flex-wrap items-baseline gap-x-5 gap-y-2">
                    <h3 className="font-serif text-[clamp(1.75rem,3vw,2.75rem)] font-light tracking-[-0.01em] text-ink">
                      {p.name}
                    </h3>
                    <p className="font-serif text-lg italic text-ink-muted">
                      — {p.tagline}
                    </p>
                  </div>

                  <p className="mt-5 max-w-3xl text-[15px] leading-relaxed text-ink-soft">
                    {p.description}
                  </p>

                  <div className="mt-6 flex flex-wrap gap-x-4 gap-y-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-ink-muted">
                    {p.tech.map((t) => (
                      <span key={t}>{t}</span>
                    ))}
                  </div>

                  <div className="mt-8 flex flex-wrap items-center gap-5">
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
                  transition={{ type: "spring", stiffness: 400, damping: 20 }}
                  className="absolute right-6 top-6 text-ink-muted/60 md:right-10 md:top-10"
                >
                  <ArrowUpRight className="h-5 w-5" strokeWidth={1.25} />
                </motion.div>
              </motion.article>
            ))}
          </StaggerGroup>
        </div>
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
        pending ? "text-ink-muted/60" : "text-ink"
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
