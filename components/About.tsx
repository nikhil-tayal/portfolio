import { ScrollReveal } from "./ScrollReveal";
import { skills } from "@/lib/data";

export function About() {
  return (
    <section
      id="about"
      className="px-6 md:px-10 py-20 md:py-28"
      style={{ borderTop: "1px solid var(--border)" }}
    >
      <div className="mx-auto w-full" style={{ maxWidth: "1040px" }}>
        {/* Two-column layout on desktop */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 md:gap-16">

          {/* Left: Bio */}
          <div className="md:col-span-7">
            <ScrollReveal>
              <p
                className="text-muted text-xs uppercase mb-7"
                style={{ letterSpacing: "0.1em" }}
              >
                About
              </p>
            </ScrollReveal>

            <ScrollReveal delay={50}>
              <p
                className="text-text leading-relaxed"
                style={{ fontSize: "clamp(1rem, 1.8vw, 1.125rem)", lineHeight: 1.8 }}
              >
                Seven years building production web apps across fintech,
                aviation, edtech, and e-commerce. Currently building{" "}
                <span style={{ fontWeight: 500 }}>Lookify</span> (AI virtual
                try-on SaaS for Shopify) and{" "}
                <span style={{ fontWeight: 500 }}>EasySupply.in</span> (Meesho
                seller automation). Previously SDE-2 at PhysicsWallah, and
                software engineer at Drip Capital and Credochain. Available for
                senior frontend or full-stack roles with high ownership close to
                founders.
              </p>
            </ScrollReveal>
          </div>

          {/* Right: Detail sidebar */}
          <div className="md:col-span-5">
            <ScrollReveal delay={100} group>
              <div
                className="py-5"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <p
                  className="text-dim text-xs uppercase mb-2"
                  style={{ letterSpacing: "0.1em" }}
                >
                  Currently
                </p>
                <p className="text-text text-sm leading-relaxed">
                  Lookify · EasySupply.in
                </p>
              </div>

              <div
                className="py-5"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <p
                  className="text-dim text-xs uppercase mb-2"
                  style={{ letterSpacing: "0.1em" }}
                >
                  Looking for
                </p>
                <p className="text-text text-sm leading-relaxed">
                  Senior frontend / full-stack · High ownership
                </p>
              </div>

              <div
                className="py-5"
                style={{ borderTop: "1px solid var(--border)" }}
              >
                <p
                  className="text-dim text-xs uppercase mb-2"
                  style={{ letterSpacing: "0.1em" }}
                >
                  Stack
                </p>
                <p
                  className="text-muted text-sm leading-loose"
                  style={{ wordBreak: "break-word" }}
                >
                  {skills}
                </p>
              </div>

              <div
                className="py-5"
                style={{ borderTop: "1px solid var(--border)", borderBottom: "1px solid var(--border)" }}
              >
                <p
                  className="text-dim text-xs uppercase mb-2"
                  style={{ letterSpacing: "0.1em" }}
                >
                  Based in
                </p>
                <p className="text-text text-sm">Delhi, India</p>
              </div>
            </ScrollReveal>
          </div>

        </div>
      </div>
    </section>
  );
}
