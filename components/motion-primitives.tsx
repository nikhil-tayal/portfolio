"use client";

import { motion, useInView, type HTMLMotionProps, type Variants } from "framer-motion";
import { useRef } from "react";

export const ease = [0.22, 1, 0.36, 1] as const;

export const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.75, ease },
  },
};

export const stagger: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.08, delayChildren: 0.05 },
  },
};

export const fadeChild: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease } },
};

export const drawLine: Variants = {
  hidden: { scaleX: 0, transformOrigin: "left" },
  show: {
    scaleX: 1,
    transition: { duration: 1.1, ease },
  },
};

type RevealProps = HTMLMotionProps<"div"> & {
  as?: keyof typeof motion;
  amount?: number;
  once?: boolean;
};

export function Reveal({
  children,
  variants = fadeUp,
  amount = 0.2,
  once = true,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount, once });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={variants}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export function StaggerGroup({
  children,
  amount = 0.15,
  once = true,
  ...rest
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount, once });
  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "show" : "hidden"}
      variants={stagger}
      {...rest}
    >
      {children}
    </motion.div>
  );
}

export { motion };
