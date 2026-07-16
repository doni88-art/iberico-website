"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";

export function Parallax({
  children,
  className,
  strength = 12,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [`-${strength}%`, `${strength}%`]);

  return (
    <div ref={ref} className={`relative h-full w-full overflow-hidden ${className ?? ""}`}>
      <motion.div
        style={shouldReduceMotion ? undefined : { y }}
        className="absolute inset-x-0 -top-[15%] h-[130%]"
      >
        {children}
      </motion.div>
    </div>
  );
}
