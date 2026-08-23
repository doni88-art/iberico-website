"use client";

import Image from "next/image";
import { useLanguage } from "@/lib/i18n";
import { Reveal, RevealGroup, revealItem } from "./Reveal";
import { motion } from "framer-motion";
import { CountUp } from "./CountUp";
import { ImageReveal } from "./ImageReveal";
import { KineticText } from "./KineticText";
import { Parallax } from "./Parallax";

export function Story() {
  const { t } = useLanguage();

  return (
    <section id="story" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 sm:px-8 lg:grid-cols-2 lg:items-center lg:gap-20">
        <div className="relative order-2 lg:order-1">
          <ImageReveal className="relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm shadow-2xl">
            <Parallax strength={10}>
              <Image
                src="/images/real-jamon-board.jpg"
                alt="Jamón Ibérico de Bellota carved tableside with pan con tomate at IBÉRICO"
                fill
                sizes="(max-width: 1024px) 90vw, 480px"
                className="object-cover"
              />
            </Parallax>
          </ImageReveal>
          <div
            aria-hidden="true"
            className="absolute -bottom-6 -right-4 hidden h-40 w-40 -translate-y-6 rounded-sm border border-gold/50 sm:block lg:-right-8"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="absolute -left-4 top-6 hidden max-w-[220px] rounded-sm bg-ink px-6 py-5 text-cream shadow-xl sm:block lg:-left-10"
          >
            <p className="font-display text-lg italic leading-snug text-gold-light">
              &ldquo;{t.story.quote}&rdquo;
            </p>
            <p className="mt-3 text-[11px] uppercase tracking-[0.2em] text-cream/60">
              {t.story.quoteAuthor}
            </p>
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-wine">
              {t.story.eyebrow}
            </span>
            <KineticText as="h2" className="font-display text-balance mt-4 text-4xl leading-[1.05] text-ink sm:text-5xl">
              {t.story.title}
            </KineticText>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="divider-gold my-7 w-24" />
          </Reveal>

          <Reveal delay={0.15} className="text-[15px] leading-relaxed text-charcoal sm:text-base">
            <p>{t.story.body}</p>
          </Reveal>

          <RevealGroup className="mt-10 grid grid-cols-2 gap-x-4 gap-y-7 border-t border-border pt-8 sm:grid-cols-4 sm:gap-8">
            {t.story.stats.map((stat) => (
              <motion.div key={stat.label} variants={revealItem}>
                <p className="font-display text-2xl text-wine tabular-nums sm:text-3xl lg:text-4xl">
                  <CountUp value={stat.value} />
                </p>
                <p className="mt-1 text-[11px] uppercase leading-tight tracking-[0.12em] text-stone sm:text-xs">
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </RevealGroup>
        </div>
      </div>
    </section>
  );
}
