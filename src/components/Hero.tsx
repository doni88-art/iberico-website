"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { ChevronDown } from "lucide-react";
import { Magnetic } from "./Magnetic";
import { ShimmerButton } from "./ShimmerButton";

export function Hero() {
  const { t } = useLanguage();
  const shouldReduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", shouldReduceMotion ? "0%" : "22%"]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", shouldReduceMotion ? "0%" : "18%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  const ease = [0.22, 1, 0.36, 1] as const;

  return (
    <section ref={sectionRef} className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-ink">
      <motion.div className="absolute inset-0" style={{ y: imageY }}>
        <motion.div
          className="absolute inset-0"
          initial={{ scale: 1.12 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.2, ease }}
        >
          <Image
            src="/images/real-patio-dusk.jpg"
            alt="IBÉRICO — Vinos Tapas terrace at dusk, guests on the patio"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/55 to-ink/90" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      </motion.div>

      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        className="relative z-10 mx-auto flex max-w-4xl flex-col items-center px-6 text-center text-cream"
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05, ease }}
          className="mb-8 flex flex-col items-center gap-2.5"
        >
          <Image
            src="/brand/logo-mark.png"
            alt=""
            width={462}
            height={601}
            priority
            className="h-[52px] w-auto brightness-0 invert drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]"
          />
          <span className="h-px w-9 bg-cream/50" />
          <span className="font-display text-sm tracking-[0.34em] text-cream sm:text-base">
            <span className="pl-[0.34em]">IBÉRICO</span>
          </span>
        </motion.div>

        <motion.span
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15, ease }}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-gold-light/40 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-light"
        >
          {t.hero.eyebrow}
        </motion.span>

        <h1 className="font-display text-balance leading-[0.95]">
          <motion.span
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.2, ease }}
            className="block text-[15vw] sm:text-8xl md:text-9xl"
          >
            {t.hero.title1}
          </motion.span>
          <motion.span
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 32 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.3, ease }}
            className="block text-[15vw] italic text-gold-light sm:text-8xl md:text-9xl"
          >
            {t.hero.title2}
          </motion.span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.45, ease }}
          className="text-balance mt-7 max-w-xl text-base leading-relaxed text-cream/85 sm:text-lg"
        >
          {t.hero.subtitle}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="mt-10 flex flex-col items-center gap-4 sm:flex-row"
        >
          <Magnetic range={70} strength={0.3}>
            <ShimmerButton href="#reserve" variant="wine" className="min-w-[200px]">
              {t.hero.cta1}
            </ShimmerButton>
          </Magnetic>
          <ShimmerButton href="#menu" variant="outline" className="min-w-[200px]">
            {t.hero.cta2}
          </ShimmerButton>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 flex-col items-center gap-2 text-cream/70"
      >
        <span className="text-[10px] uppercase tracking-[0.3em]">
          {t.hero.scroll}
        </span>
        <motion.div
          animate={shouldReduceMotion ? {} : { y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown size={18} />
        </motion.div>
      </motion.div>
    </section>
  );
}
