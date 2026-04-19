"use client";

import { ArrowUpRight } from "lucide-react";
import { Reveal } from "./motion-primitives";

const works = [
  {
    label: "Lookify AI",
    company: "Lookify",
    year: "2024",
    anchor: "company-lookify",
    screenshot: "/showcases/lookify-shopify-app/shopify-admin.png",
  },
  {
    label: "Drip UI Theme",
    company: "Drip Capital",
    year: "2021",
    anchor: "company-drip-capital",
    screenshot: "/showcases/drip-ui/intro.png",
  },
  {
    label: "Notification System",
    company: "PhysicsWallah",
    year: "2023",
    anchor: "company-physicswallah",
    screenshot: "/showcases/notification-microservice/workflow.svg",
  },
  {
    label: "CAMO Winglet",
    company: "Thumby Aviation",
    year: "2024",
    anchor: "company-thumby-aviation",
    screenshot: "/showcases/camo-winglet/aircafts.png",
  },
  {
    label: "Booking System",
    company: "Thumby Aviation",
    year: "2024",
    anchor: "company-thumby-aviation",
    screenshot: "/showcases/helitaxii/landing-page.png",
  },
];

function scrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 96, behavior: "smooth" });
}

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
      <div className="relative mt-10">
        <div className="flex gap-4 overflow-x-auto px-6 pb-8 md:px-16 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {works.map((w) => (
            <button
              key={w.label}
              onClick={() => scrollTo(w.anchor)}
              className="group relative flex-shrink-0 overflow-hidden rounded-2xl focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              style={{ width: "clamp(220px, 26vw, 320px)" }}
            >
              <div className="aspect-[3/4] w-full overflow-hidden">
                <img
                  src={w.screenshot}
                  alt={w.label}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/0" />
              <div className="absolute bottom-0 left-0 right-0 p-5">
                <p className="font-mono text-[9px] uppercase tracking-[0.18em] text-paper/70">
                  {w.company} · {w.year}
                </p>
                <h3 className="mt-1 text-[1.1rem] font-medium tracking-tight text-paper drop-shadow-sm">{w.label}</h3>
                <span className="mt-3 inline-flex items-center gap-1 font-mono text-[8px] uppercase tracking-[0.2em] text-paper/60 transition-colors group-hover:text-paper">
                  View section <ArrowUpRight className="h-2.5 w-2.5" strokeWidth={2} />
                </span>
              </div>
            </button>
          ))}
        </div>
        <div
          className="pointer-events-none absolute right-0 top-0 h-full w-24 bg-gradient-to-l from-paper-deep to-transparent"
          aria-hidden
        />
      </div>
    </section>
  );
}
