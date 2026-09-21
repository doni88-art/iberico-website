"use client";

import Image from "next/image";
import { Check, ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Reveal, RevealGroup, revealItem } from "./Reveal";
import { motion } from "framer-motion";
import { ShimmerButton } from "./ShimmerButton";

export function Events() {
  const { t } = useLanguage();

  return (
    <section id="events" className="relative overflow-hidden bg-ink-soft py-24 text-cream sm:py-32">
      <div className="mx-auto grid max-w-7xl grid-cols-1 items-center gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-20">
        <div>
          <Reveal>
            <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
              {t.events.eyebrow}
            </span>
            <h2 className="font-display text-balance mt-4 text-4xl leading-[1.05] sm:text-5xl">
              {t.events.title}
            </h2>
          </Reveal>

          <Reveal delay={0.1} className="mt-6 text-[15px] leading-relaxed text-cream/70 sm:text-base">
            <p>{t.events.body}</p>
          </Reveal>

          <RevealGroup className="mt-8 space-y-3">
            {t.events.bullets.map((b) => (
              <motion.div
                key={b}
                variants={revealItem}
                className="flex items-start gap-3 text-sm text-cream/85 sm:text-[15px]"
              >
                <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gold-light/15 text-gold-light">
                  <Check size={12} strokeWidth={3} />
                </span>
                {b}
              </motion.div>
            ))}
          </RevealGroup>

          <Reveal delay={0.2}>
            <ShimmerButton
              href="mailto:hola@weareiberico.com?subject=Private%20Event%20Enquiry"
              variant="wine"
              className="mt-10"
            >
              {t.events.cta}
              <ArrowUpRight size={16} />
            </ShimmerButton>
          </Reveal>
        </div>

        <div className="relative">
          <div className="relative aspect-[4/5] w-full max-w-md overflow-hidden rounded-sm mx-auto shadow-2xl lg:max-w-none">
            <Image
                src="/images/real-glass-door-logo.jpg"
                alt="Guests celebrating at IBÉRICO, seen through the etched glass door"
                fill
                sizes="(max-width: 1024px) 90vw, 45vw"
                className="object-cover"
            />
            <div className="absolute inset-0 z-10 ring-1 ring-inset ring-gold-light/20" />
          </div>
        </div>
      </div>
    </section>
  );
}
