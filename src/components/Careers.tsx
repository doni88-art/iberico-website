"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Reveal, RevealGroup, revealItem } from "./Reveal";
import { KineticText } from "./KineticText";

const CAREERS_EMAIL = "hola@weareiberico.com";

export function Careers() {
  const { t } = useLanguage();

  return (
    <section id="careers" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-wine">
            {t.careers.eyebrow}
          </span>
          <KineticText
            as="h2"
            className="font-display text-balance mt-4 text-4xl text-ink sm:text-5xl"
          >
            {t.careers.title}
          </KineticText>
          <p className="text-balance mx-auto mt-5 max-w-xl text-sm leading-relaxed text-charcoal/80 sm:text-base">
            {t.careers.subtitle}
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {t.careers.positions.map((pos) => (
            <motion.div
              key={pos.title}
              variants={revealItem}
              className="flex flex-col justify-between rounded-sm border border-border bg-white p-6 shadow-sm transition-shadow duration-300 hover:shadow-lg sm:p-8"
            >
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-wine px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-cream">
                    {pos.type}
                  </span>
                  <span className="rounded-full border border-border px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider text-stone">
                    {pos.department}
                  </span>
                </div>
                <h3 className="font-display mt-4 text-2xl text-ink">{pos.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-charcoal/80">
                  {pos.description}
                </p>
              </div>

              <a
                href={`mailto:${CAREERS_EMAIL}?subject=${encodeURIComponent(
                  `Application: ${pos.title}`
                )}`}
                className="mt-6 inline-flex w-fit cursor-pointer items-center gap-2 text-sm font-semibold text-wine transition-colors hover:text-wine-bright"
              >
                {t.careers.applyCta}
                <ArrowUpRight size={16} />
              </a>
            </motion.div>
          ))}
        </RevealGroup>

        <Reveal delay={0.2} className="mt-12 text-center">
          <p className="mx-auto max-w-md text-sm leading-relaxed text-charcoal/70">
            {t.careers.emailNote}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
