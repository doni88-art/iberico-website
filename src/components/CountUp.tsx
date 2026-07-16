"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

// Parses "2021", "3", "4.5★" into a numeric target + prefix/suffix so the
// number can animate while the surrounding characters (★, decimals) stay put.
function parseValue(raw: string) {
  const match = raw.match(/-?\d+(\.\d+)?/);
  if (!match) return null;
  const numeric = parseFloat(match[0]);
  const decimals = match[1] ? match[1].length - 1 : 0;
  return {
    target: numeric,
    decimals,
    prefix: raw.slice(0, match.index),
    suffix: raw.slice((match.index ?? 0) + match[0].length),
  };
}

export function CountUp({ value, className }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-10% 0px -10% 0px" });
  const shouldReduceMotion = useReducedMotion();
  const parsed = parseValue(value);
  const [display, setDisplay] = useState(parsed ? "0" : value);

  useEffect(() => {
    if (!parsed || !inView) return;

    const finalValue =
      parsed.prefix + parsed.target.toFixed(parsed.decimals) + parsed.suffix;

    if (shouldReduceMotion) {
      const frame = requestAnimationFrame(() => setDisplay(finalValue));
      return () => cancelAnimationFrame(frame);
    }

    const duration = 1400;
    const start = performance.now();
    let frame: number;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = parsed.target * eased;
      setDisplay(
        parsed.prefix + current.toFixed(parsed.decimals) + parsed.suffix
      );
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [inView, shouldReduceMotion]);

  return (
    <motion.span ref={ref} className={className}>
      {parsed ? display : value}
    </motion.span>
  );
}
