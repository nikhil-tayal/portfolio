"use client";

import { useEffect, useRef } from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  group?: boolean;
}

export function ScrollReveal({
  children,
  className = "",
  delay = 0,
  group = false,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          const apply = () => el.classList.add("visible");
          if (delay > 0) {
            setTimeout(apply, delay);
          } else {
            apply();
          }
          observer.unobserve(el);
        }
      },
      { threshold: 0.08, rootMargin: "0px 0px -40px 0px" },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`${group ? "reveal-group" : "reveal"} ${className}`}
    >
      {children}
    </div>
  );
}
