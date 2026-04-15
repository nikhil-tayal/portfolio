export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex flex-col justify-between px-6 md:px-10"
      style={{ minHeight: "100svh", paddingTop: "120px", paddingBottom: "32px" }}
    >
      {/* Top: Name block */}
      <div>
        <p
          className="hero-enter hero-enter-1 text-muted mb-6"
          style={{ fontSize: "0.75rem", letterSpacing: "0.1em", textTransform: "uppercase" }}
        >
          Senior Full-Stack Developer · Delhi, India
        </p>

        <h1
          className="hero-enter hero-enter-2 text-text font-semibold leading-none"
          style={{
            fontSize: "clamp(4.5rem, 14vw, 10rem)",
            letterSpacing: "-0.04em",
            lineHeight: 0.92,
          }}
        >
          Nikhil
          <br />
          Sharma
        </h1>
      </div>

      {/* Bottom: rule + meta row */}
      <div
        className="hero-enter hero-enter-3"
        style={{ borderTop: "1px solid var(--border)", paddingTop: "20px" }}
      >
        <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
          <p
            className="text-muted leading-relaxed"
            style={{ fontSize: "0.9375rem", maxWidth: "420px" }}
          >
            I build products end-to-end —{" "}
            <span className="text-text">from database schema to deployed UI.</span>
          </p>

          <div className="flex items-center gap-6 flex-shrink-0">
            <a
              href="#projects"
              className="text-text hover:text-muted transition-colors duration-200 text-sm font-medium"
              style={{ textDecoration: "none" }}
            >
              Selected work ↓
            </a>
            <a
              href="#contact"
              className="text-accent hover:text-text transition-colors duration-200 text-sm font-medium"
              style={{ textDecoration: "none" }}
            >
              Get in touch →
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
