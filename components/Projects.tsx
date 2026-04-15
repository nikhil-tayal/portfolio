import Image from "next/image";
import { ScrollReveal } from "./ScrollReveal";
import { VideoReveal } from "./VideoReveal";
import { projects, type Project } from "@/lib/data";

export function Projects() {
  const [featured, ...rest] = projects;

  return (
    <section
      id="projects"
      className="py-20 md:py-28"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="px-6 md:px-10 mx-auto w-full" style={{ maxWidth: "1040px" }}>
        <ScrollReveal>
          <p
            className="text-muted text-xs uppercase mb-10"
            style={{ letterSpacing: "0.1em" }}
          >
            Selected Work
          </p>
        </ScrollReveal>
      </div>

      {/* Featured card — full width */}
      <ScrollReveal className="mb-px">
        <FeaturedCard project={featured} />
      </ScrollReveal>

      {/* Grid of remaining cards */}
      <div
        className="grid grid-cols-1 md:grid-cols-2"
        style={{ gap: "1px", background: "var(--border)" }}
      >
        {rest.map((project, i) => (
          <ScrollReveal key={project.slug} delay={i % 2 === 0 ? 0 : 50}>
            <ProjectCard project={project} />
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}

function FeaturedCard({ project }: { project: Project }) {
  return (
    <article
      className="project-card"
      style={{ borderBottom: "1px solid var(--border)" }}
    >
      {/* Full-bleed image — taller ratio for the feature */}
      <div
        className="relative overflow-hidden w-full"
        style={{ aspectRatio: "21 / 9", background: "var(--bg-card-hover)", minHeight: "260px" }}
      >
        {!project.placeholder && (
          <Image
            src={project.image}
            alt={project.name}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        )}
      </div>

      {project.youtubeId && <VideoReveal youtubeId={project.youtubeId} />}

      {/* Body */}
      <div
        className="px-6 md:px-10 py-6 md:py-8 grid grid-cols-1 md:grid-cols-12 gap-6"
        style={{ maxWidth: "1040px", margin: "0 auto" }}
      >
        <div className="md:col-span-5">
          <h3
            className="text-text font-semibold"
            style={{ fontSize: "clamp(1.25rem, 3vw, 1.875rem)", letterSpacing: "-0.025em" }}
          >
            {project.name}
          </h3>
          <p className="text-dim mt-1.5 text-xs">{project.stack}</p>
        </div>

        <div className="md:col-span-7">
          <p className="text-muted text-sm leading-relaxed">{project.line1}</p>
          {project.line2 && (
            <p className="text-dim text-sm leading-relaxed mt-2">{project.line2}</p>
          )}
          <div className="flex gap-5 mt-5">
            {project.liveUrl ? (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted hover:text-text transition-colors duration-200 text-sm"
                style={{ textDecoration: "none" }}
              >
                Live →
              </a>
            ) : (
              <span className="text-dim text-sm">Live →</span>
            )}
            {project.githubUrl ? (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="text-muted hover:text-text transition-colors duration-200 text-sm"
                style={{ textDecoration: "none" }}
              >
                GitHub →
              </a>
            ) : (
              <span className="text-dim text-sm">GitHub →</span>
            )}
          </div>
        </div>
      </div>
    </article>
  );
}

function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card flex flex-col h-full">
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: "16 / 9", background: "var(--bg-card-hover)" }}
      >
        {!project.placeholder && (
          <Image
            src={project.image}
            alt={project.name}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        )}
      </div>

      {project.youtubeId && <VideoReveal youtubeId={project.youtubeId} />}

      <div className="flex flex-col flex-1 p-5 md:p-6">
        <h3
          className="text-text font-medium"
          style={{ fontSize: "1rem", letterSpacing: "-0.01em" }}
        >
          {project.name}
        </h3>
        <p className="text-dim mt-1 text-xs">{project.stack}</p>

        {!project.placeholder && (
          <div className="mt-4 flex-1">
            <p className="text-muted text-sm leading-relaxed">{project.line1}</p>
            {project.line2 && (
              <p className="text-dim text-sm leading-relaxed mt-2">{project.line2}</p>
            )}
          </div>
        )}

        <div
          className="flex gap-5 mt-5 pt-5"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          {project.liveUrl ? (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted hover:text-text transition-colors duration-200 text-sm"
              style={{ textDecoration: "none" }}
            >
              Live →
            </a>
          ) : (
            <span className="text-dim text-sm">Live →</span>
          )}
          {project.githubUrl ? (
            <a
              href={project.githubUrl}
              target="_blank"
              rel="noreferrer noopener"
              className="text-muted hover:text-text transition-colors duration-200 text-sm"
              style={{ textDecoration: "none" }}
            >
              GitHub →
            </a>
          ) : (
            <span className="text-dim text-sm">GitHub →</span>
          )}
        </div>
      </div>
    </article>
  );
}
