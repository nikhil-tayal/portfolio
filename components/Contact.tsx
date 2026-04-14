"use client";

import { ArrowUpRight } from "lucide-react";
import { SectionLabel } from "./SectionLabel";
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
    <section id="contact" className="px-6 py-28 md:px-12 md:py-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-12 gap-6">
        <Reveal className="col-span-12 md:col-span-2">
          <SectionLabel index="05" title="Contact" />
        </Reveal>

        <div className="col-span-12 md:col-span-10">
          <Reveal>
            <h2 className="font-serif text-[clamp(3rem,9vw,8rem)] font-light leading-[0.95] tracking-[-0.025em] text-ink">
              Let's build
              <br />
              <span className="italic text-ink-soft">something good.</span>
            </h2>
          </Reveal>

          <Reveal>
            <p className="mt-10 max-w-xl text-lg leading-relaxed text-ink-soft">
              I'm open to senior full-stack contracts, founding-engineer roles,
              and AI product work. The fastest way to reach me is email.
            </p>
          </Reveal>

          <Reveal>
            <motion.a
              whileHover={{ x: 4 }}
              transition={{ type: "spring", stiffness: 400, damping: 22 }}
              href={`mailto:${profile.email}`}
              className="group mt-10 inline-flex items-center gap-3 font-serif text-2xl font-light text-ink md:text-3xl"
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
            amount={0.2}
            className="mt-16 grid grid-cols-1 gap-6 border-t border-rule pt-10 sm:grid-cols-2 lg:grid-cols-4"
          >
            {channels.map((c) => (
              <motion.div key={c.label} variants={fadeChild}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.22em] text-ink-muted">
                  {c.label}
                </dt>
                <dd className="mt-2">
                  <a
                    href={c.href}
                    target={c.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer noopener"
                    className="text-sm text-ink transition-colors hover:text-accent"
                  >
                    {c.value}
                  </a>
                </dd>
              </motion.div>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
