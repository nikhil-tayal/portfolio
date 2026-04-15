import { ScrollReveal } from "./ScrollReveal";
import { profile } from "@/lib/data";

export function Contact() {
  return (
    <section
      id="contact"
      className="px-6 md:px-10 py-20 md:py-28"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: "1040px" }}>
        <ScrollReveal>
          <p
            className="text-muted text-xs uppercase mb-10"
            style={{ letterSpacing: "0.1em" }}
          >
            Contact
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          {/* Left */}
          <div className="md:col-span-6">
            <ScrollReveal delay={40}>
              <p
                className="text-text leading-relaxed"
                style={{ fontSize: "clamp(1rem, 1.8vw, 1.125rem)", lineHeight: 1.7 }}
              >
                Open to senior frontend / full-stack roles. Prefer startups
                with high ownership.
              </p>
            </ScrollReveal>

            <ScrollReveal delay={80}>
              <a
                href={`mailto:${profile.email}`}
                className="text-accent hover:text-text transition-colors duration-200 block mt-8"
                style={{
                  fontSize: "clamp(1.125rem, 2.5vw, 1.5rem)",
                  fontWeight: 500,
                  letterSpacing: "-0.02em",
                  textDecoration: "none",
                }}
              >
                {profile.email}
              </a>
            </ScrollReveal>
          </div>

          {/* Right: links */}
          <div className="md:col-span-6 md:flex md:items-end md:justify-end">
            <ScrollReveal delay={60}>
              <div className="flex flex-col gap-3">
                <a
                  href={profile.github}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-muted hover:text-text transition-colors duration-200"
                  style={{ fontSize: "0.9375rem", textDecoration: "none" }}
                >
                  GitHub →
                </a>
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-muted hover:text-text transition-colors duration-200"
                  style={{ fontSize: "0.9375rem", textDecoration: "none" }}
                >
                  LinkedIn →
                </a>
                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noreferrer noopener"
                  className="text-muted hover:text-text transition-colors duration-200"
                  style={{ fontSize: "0.9375rem", textDecoration: "none" }}
                >
                  X ({profile.twitterHandle}) →
                </a>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}
