"use client";

import { motion, useReducedMotion } from "framer-motion";

const MOTION_TAGS = {
  span: motion.span,
  h2: motion.h2,
  h3: motion.h3,
} as const;

type TagName = keyof typeof MOTION_TAGS;

export function KineticText({
  children,
  as = "span",
  className,
  delay = 0,
  stagger = 0.045,
}: {
  children: string;
  as?: TagName;
  className?: string;
  delay?: number;
  stagger?: number;
}) {
  const shouldReduceMotion = useReducedMotion();
  const words = children.split(" ");

  if (shouldReduceMotion) {
    const Static = as;
    return <Static className={className}>{children}</Static>;
  }

  const MotionTag = MOTION_TAGS[as];

  return (
    <MotionTag
      className={className}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: stagger, delayChildren: delay } },
      }}
    >
      {words.map((word, i) => (
        <span
          key={i}
          className="inline-block overflow-hidden align-top"
        >
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "115%", rotate: 3 },
              show: {
                y: "0%",
                rotate: 0,
                transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
              },
            }}
          >
            {word}
            {i < words.length - 1 ? " " : ""}
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}
