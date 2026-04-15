import { ScrollReveal } from "./ScrollReveal";
import { experience } from "@/lib/data";

export function Experience() {
  return (
    <section
      id="experience"
      className="px-6 md:px-10 py-20 md:py-28"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: "1040px" }}>
        <ScrollReveal>
          <p
            className="text-muted text-xs uppercase mb-10"
            style={{ letterSpacing: "0.1em" }}
          >
            Experience
          </p>
        </ScrollReveal>

        <div>
          {experience.map((job, i) => (
            <ScrollReveal key={job.company} delay={i * 30}>
              <div
                className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-8 py-7"
                style={{
                  borderTop: "1px solid var(--border)",
                }}
              >
                {/* Left: company + period */}
                <div className="md:col-span-4">
                  <p
                    className="text-text font-medium leading-tight"
                    style={{ fontSize: "1.0625rem", letterSpacing: "-0.02em" }}
                  >
                    {job.company}
                  </p>
                  <p className="text-dim text-xs mt-1" style={{ letterSpacing: "0.01em" }}>
                    {job.period}
                  </p>
                </div>

                {/* Right: role + description */}
                <div className="md:col-span-8">
                  <p
                    className="text-muted text-xs uppercase mb-3"
                    style={{ letterSpacing: "0.08em" }}
                  >
                    {job.role}
                  </p>
                  <p className="text-muted text-sm leading-relaxed" style={{ lineHeight: 1.75 }}>
                    {job.description}
                  </p>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
