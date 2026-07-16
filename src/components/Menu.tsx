"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { KineticText } from "./KineticText";

// Real photography from IBÉRICO's own menu, indexed to match
// menu.categories order (same order across every language dictionary).
const CATEGORY_IMAGES = [
  "/images/menu-jamon-handcarved.jpg",
  "/images/real-scallops-jamon.jpg",
  "/images/real-tiered-board.jpg",
  "/images/menu-gambas-ajillo.jpg",
  "/images/menu-cheese-board.jpg",
  "/images/menu-paella-split.jpg",
  "/images/menu-churros.jpg",
  "/images/menu-sangria-pour.jpg",
];

export function Menu() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const category = t.menu.categories[active];
  const image = CATEGORY_IMAGES[active % CATEGORY_IMAGES.length];

  return (
    <section id="menu" className="relative bg-ink py-24 text-cream sm:py-32">
      <div className="mx-auto max-w-6xl px-6 sm:px-8">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-gold-light">
            {t.menu.eyebrow}
          </span>
          <KineticText as="h2" className="font-display text-balance mt-4 text-4xl sm:text-5xl">
            {t.menu.title}
          </KineticText>
          <p className="text-balance mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/70 sm:text-base">
            {t.menu.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12">
          <div className="flex flex-wrap justify-center gap-2 sm:gap-3">
            {t.menu.categories.map((cat, i) => (
              <button
                key={cat.label}
                type="button"
                onClick={() => setActive(i)}
                className={`relative cursor-pointer rounded-full px-4 py-2 text-xs font-semibold tracking-wide transition-colors duration-300 sm:px-5 sm:text-sm ${
                  active === i
                    ? "text-cream"
                    : "text-cream/70 hover:text-cream"
                }`}
              >
                {active === i && (
                  <motion.span
                    layoutId="menu-pill"
                    className="absolute inset-0 rounded-full bg-wine"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative z-10">{cat.label}</span>
              </button>
            ))}
          </div>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,320px)_1fr] lg:gap-14">
          <AnimatePresence mode="wait">
            <motion.div
              key={image}
              initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
              animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="relative order-1 hidden aspect-[4/5] w-full overflow-hidden rounded-sm shadow-2xl sm:block lg:order-none"
            >
              <Image
                src={image}
                alt={category.label}
                fill
                sizes="(max-width: 1024px) 90vw, 320px"
                className="object-cover"
              />
              <div className="absolute inset-0 ring-1 ring-inset ring-gold-light/15" />
            </motion.div>
          </AnimatePresence>

          <div className="min-h-[420px]">
            <AnimatePresence mode="wait">
              <motion.div
                key={category.label}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 gap-x-10 gap-y-7 sm:grid-cols-2"
              >
                {category.items.map((item) => (
                  <div
                    key={item.name}
                    className="group flex items-start justify-between gap-4 border-b border-cream/10 pb-4"
                  >
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-baseline gap-x-2">
                        <h3 className="font-display text-lg text-cream sm:text-xl">
                          {item.name}
                        </h3>
                        {item.tag && (
                          <span className="rounded-full bg-wine px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-cream">
                            {item.tag}
                          </span>
                        )}
                      </div>
                      <p className="mt-1.5 text-sm leading-relaxed text-cream/60">
                        {item.desc}
                      </p>
                    </div>
                    <span className="shrink-0 whitespace-nowrap font-display text-base text-gold-light sm:text-lg">
                      {item.price}
                    </span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <p className="mt-14 text-center text-xs text-cream/40">
          {t.menu.note}
        </p>
      </div>
    </section>
  );
}
