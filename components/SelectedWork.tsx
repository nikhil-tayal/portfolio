"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./motion-primitives";

export const selectedWorks = [
  {
    label: "Lookify AI",
    company: "Lookify",
    year: "2024",
    anchor: "company-lookify",
    screenshot: "/showcases/lookify-shopify-app/shopify-admin.png",
    brief: "AI virtual try-on SaaS for 20+ Shopify merchants — ComfyUI on serverless GPUs.",
  },
  {
    label: "Drip UI Theme",
    company: "Drip Capital",
    year: "2021",
    anchor: "company-drip-capital",
    screenshot: "/showcases/drip-ui/intro.png",
    brief: "MUI 5 component library published to npm, adopted across 4 internal teams.",
  },
  {
    label: "Notification System",
    company: "PhysicsWallah",
    year: "2023",
    anchor: "company-physicswallah",
    screenshot: "/showcases/notification-microservice/workflow.svg",
    brief: "Centralized NestJS + Redis microservice cutting delivery latency by 30%.",
  },
  {
    label: "CAMO Winglet",
    company: "Thumby Aviation",
    year: "2024",
    anchor: "company-thumby-aviation",
    screenshot: "/showcases/camo-winglet/aircafts.png",
    brief: "DGCA-compliant digital logbook replacing 100% of paper records for 12+ aircraft.",
  },
  {
    label: "Booking System",
    company: "Thumby Aviation",
    year: "2024",
    anchor: "company-thumby-aviation",
    screenshot: "/showcases/helitaxii/landing-page.png",
    brief: "Central reservation system handling 500+ monthly bookings across 4 service types.",
  },
];

function scrollToAnchor(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
}

/* ─── Option A: Bento Grid ─────────────────────────────────────────────── */
export function SelectedWorkA() {
  return (
    <section className="bg-paper-deep px-6 pb-0 pt-28 md:px-16 md:pt-36">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Selected Work
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-2 gap-3 md:grid-cols-3 md:gap-4">
          {selectedWorks.map((w, i) => {
            const isFeatured = i === 0;
            return (
              <Reveal key={w.label}>
                <button
                  onClick={() => scrollToAnchor(w.anchor)}
                  className={`group relative overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                    isFeatured ? "col-span-2 aspect-[16/7]" : "col-span-1 aspect-[4/3]"
                  }`}
                >
                  <img
                    src={w.screenshot}
                    alt={w.label}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-4 md:p-5">
                    <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/60">
                      {w.company} · {w.year}
                    </p>
                    <h3
                      className={`mt-1 font-light leading-tight tracking-tight text-paper ${
                        isFeatured ? "text-[1.6rem] md:text-[2.2rem]" : "text-[1.1rem] md:text-[1.3rem]"
                      }`}
                    >
                      {w.label}
                    </h3>
                  </div>
                  <ArrowUpRight className="absolute right-4 top-4 h-4 w-4 text-paper/40 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:text-paper" strokeWidth={1.5} />
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Option B: Full-bleed overlay grid ────────────────────────────────── */
export function SelectedWorkB() {
  return (
    <section className="bg-paper-deep px-6 pb-0 pt-28 md:px-16 md:pt-36">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Selected Work
          </p>
        </Reveal>
        <div className="mt-10 grid grid-cols-1 gap-px bg-rule sm:grid-cols-2 lg:grid-cols-3">
          {selectedWorks.map((w) => (
            <Reveal key={w.label}>
              <button
                onClick={() => scrollToAnchor(w.anchor)}
                className="group relative aspect-[4/3] w-full overflow-hidden bg-paper focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <img
                  src={w.screenshot}
                  alt={w.label}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                />
                <div className="absolute inset-0 bg-ink/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-8 w-8 text-paper" strokeWidth={1.2} />
                  <span className="mt-2 font-mono text-[9px] uppercase tracking-[0.2em] text-paper/80">
                    View in work history
                  </span>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-ink/90 to-transparent px-5 pb-5 pt-10 transition-opacity duration-300 group-hover:opacity-0">
                  <p className="font-mono text-[9px] uppercase tracking-[0.16em] text-paper/50">
                    {w.company} · {w.year}
                  </p>
                  <h3 className="mt-1 text-[1.15rem] font-light tracking-tight text-paper">
                    {w.label}
                  </h3>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Option C: Split alternating rows ─────────────────────────────────── */
export function SelectedWorkC() {
  return (
    <section className="bg-paper-deep px-6 pb-0 pt-28 md:px-16 md:pt-36">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Selected Work
          </p>
        </Reveal>
        <div className="mt-10 divide-y divide-rule border-y border-rule">
          {selectedWorks.map((w, i) => {
            const imageLeft = i % 2 === 0;
            return (
              <Reveal key={w.label}>
                <button
                  onClick={() => scrollToAnchor(w.anchor)}
                  className={`group grid w-full grid-cols-1 gap-0 focus:outline-none md:grid-cols-2 ${
                    imageLeft ? "" : "md:[&>*:first-child]:order-last"
                  }`}
                >
                  {/* Image */}
                  <div className="relative aspect-[16/9] overflow-hidden md:aspect-auto md:min-h-[220px]">
                    <img
                      src={w.screenshot}
                      alt={w.label}
                      className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                    />
                  </div>
                  {/* Text */}
                  <div
                    className={`flex flex-col justify-center px-8 py-8 text-left transition-colors duration-150 group-hover:bg-accent/[0.04] md:px-12 md:py-10 ${
                      imageLeft ? "border-l-0 md:border-l border-rule" : "border-r-0 md:border-r border-rule"
                    }`}
                  >
                    <p className="font-mono text-[9px] uppercase tracking-[0.22em] text-ink-muted">
                      {w.company} · {w.year}
                    </p>
                    <h3 className="mt-3 text-[clamp(1.4rem,3vw,2rem)] font-light leading-tight tracking-[-0.02em] text-ink transition-colors group-hover:text-accent">
                      {w.label}
                    </h3>
                    <p className="mt-3 text-[13px] leading-relaxed text-ink-soft">
                      {w.brief}
                    </p>
                    <span className="mt-5 inline-flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-ink-muted transition-colors group-hover:text-accent">
                      View in work history
                      <ArrowUpRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={2} />
                    </span>
                  </div>
                </button>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

/* ─── Option D: Horizontal scroll strip ────────────────────────────────── */
export function SelectedWorkD() {
  return (
    <section className="bg-paper-deep pb-0 pt-28 md:pt-36">
      <div className="mx-auto max-w-[1320px] px-6 md:px-16">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Selected Work
          </p>
        </Reveal>
      </div>
      <div className="mt-10 flex gap-4 overflow-x-auto px-6 pb-6 md:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {selectedWorks.map((w) => (
          <button
            key={w.label}
            onClick={() => scrollToAnchor(w.anchor)}
            className="group relative flex-shrink-0 overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            style={{ width: "clamp(240px, 28vw, 360px)" }}
          >
            <div className="aspect-[3/4] w-full overflow-hidden">
              <img
                src={w.screenshot}
                alt={w.label}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-5">
              <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/50">
                {w.company} · {w.year}
              </p>
              <h3 className="mt-1 text-[1.1rem] font-light tracking-tight text-paper">
                {w.label}
              </h3>
              <span className="mt-3 inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.2em] text-paper/40 transition-colors group-hover:text-paper/70">
                Scroll to section
                <ArrowUpRight className="h-2.5 w-2.5" strokeWidth={2} />
              </span>
            </div>
          </button>
        ))}
        {/* Right fade hint */}
        <div className="pointer-events-none absolute right-0 top-0 hidden h-full w-20 bg-gradient-to-l from-paper-deep md:block" aria-hidden />
      </div>
    </section>
  );
}
