import { profile } from "@/lib/data";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="border-t border-rule px-6 py-8 md:px-16">
      <div className="mx-auto flex max-w-[1320px] flex-col items-start justify-between gap-3 font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted md:flex-row md:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <span>
            © {year}{" "}
            <span className="text-ink">{profile.name}</span>
          </span>
          <span className="hidden md:inline">·</span>
          <span>Built with Next.js + Tailwind</span>
        </div>
        <div className="flex items-center gap-5">
          <a
            href={profile.github}
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-ink"
          >
            GitHub
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noreferrer noopener"
            className="transition-colors hover:text-ink"
          >
            LinkedIn
          </a>
          <a href={`mailto:${profile.email}`} className="transition-colors hover:text-ink">
            Email
          </a>
        </div>
      </div>
    </footer>
  );
}
