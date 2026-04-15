"use client";

import { ArrowUpRight } from "lucide-react";
import { profile } from "@/lib/data";
import { Reveal, StaggerGroup, fadeChild, motion } from "./motion-primitives";

const channels = [
  { label: "Email", value: profile.email, href: `mailto:${profile.email}` },
  { label: "LinkedIn", value: "in/tayal-nikhil", href: profile.linkedin },
  { label: "GitHub", value: "nikhil-tayal", href: profile.github },
  {
    label: "Phone",
    value: profile.phone,
    href: `tel:${profile.phone.replace(/\s/g, "")}`,
  },
];

export function Contact() {
  return (
    <section id="contact" className="px-6 py-28 md:px-16 md:py-36">
      <div className="mx-auto max-w-[1320px]">
        <Reveal>
          <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
            Contact
          </p>
        </Reveal>

        <Reveal>
          <h2 className="mt-4 text-[clamp(2.5rem,7vw,6rem)] font-light leading-[0.95] tracking-[-0.03em] text-ink">
            Let&rsquo;s work together.
          </h2>
        </Reveal>

        <Reveal>
          <p className="mt-8 max-w-lg text-[15px] leading-relaxed text-ink-soft">
            Open to senior full-stack contracts, founding-engineer roles, and
            AI product work. The fastest way to reach me is email.
          </p>
        </Reveal>

        <Reveal>
          <motion.a
            whileHover={{ x: 4 }}
            transition={{ type: "spring", stiffness: 380, damping: 22 }}
            href={`mailto:${profile.email}`}
            className="group mt-10 inline-flex items-center gap-3 text-[1.5rem] font-light text-ink md:text-[2rem]"
          >
            <span className="link-underline-accent">{profile.email}</span>
            <motion.span
              initial={{ x: 0, y: 0 }}
              whileHover={{ x: 4, y: -4 }}
              className="text-accent"
            >
              <ArrowUpRight className="h-5 w-5" strokeWidth={1.5} />
            </motion.span>
          </motion.a>
        </Reveal>

        <StaggerGroup
          amount={0.15}
          className="mt-14 grid grid-cols-1 gap-6 border-t border-rule pt-10 sm:grid-cols-2 lg:grid-cols-4"
        >
          {channels.map((c) => (
            <motion.div key={c.label} variants={fadeChild}>
              <dt className="font-mono text-[10px] uppercase tracking-[0.24em] text-ink-muted">
                {c.label}
              </dt>
              <dd className="mt-2">
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer noopener"
                  className="text-[13px] text-ink transition-colors hover:text-accent"
                >
                  {c.value}
                </a>
              </dd>
            </motion.div>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
