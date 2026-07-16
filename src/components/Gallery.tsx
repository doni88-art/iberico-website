"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Reveal, RevealGroup, revealItem } from "./Reveal";
import { KineticText } from "./KineticText";

const IMAGES = [
  { src: "/images/real-bar-interior.jpg", alt: "IBÉRICO bar interior with wine wall", span: "row-span-2 sm:col-span-1" },
  { src: "/images/real-jamon-carving.jpg", alt: "Jamón Ibérico de Bellota, hand-carved at IBÉRICO", span: "sm:col-span-2" },
  { src: "/images/menu-croquetas.jpg", alt: "Croquetas de Jamón at IBÉRICO", span: "" },
  { src: "/images/real-manchego-board.jpg", alt: "Manchego cheese, hand-cut at IBÉRICO", span: "" },
  { src: "/images/real-charcuterie-board.jpg", alt: "Chorizo, salchichón, olives and manchego spread", span: "sm:col-span-2" },
  { src: "/images/real-exterior-night.jpg", alt: "IBÉRICO storefront lit up at night", span: "" },
  { src: "/images/real-exterior-night-2.jpg", alt: "IBÉRICO signage and terrace after dark", span: "" },
  { src: "/images/real-sangria.jpg", alt: "Sangría poured on the terrace at IBÉRICO", span: "" },
  { src: "/images/real-dessert-tart.jpg", alt: "House dessert tart at IBÉRICO", span: "" },
];

const galleryItem = {
  hidden: { opacity: 0, y: 28, filter: "blur(10px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] as const },
  },
};

export function Gallery() {
  const { t } = useLanguage();
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const close = () => setOpenIndex(null);
  const next = () =>
    setOpenIndex((i) => (i === null ? null : (i + 1) % IMAGES.length));
  const prev = () =>
    setOpenIndex((i) =>
      i === null ? null : (i - 1 + IMAGES.length) % IMAGES.length
    );

  useEffect(() => {
    if (openIndex === null) return;
    document.body.style.overflow = "hidden";
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [openIndex]);

  return (
    <section id="gallery" className="relative bg-cream py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-wine">
            {t.gallery.eyebrow}
          </span>
          <KineticText as="h2" className="font-display text-balance mt-4 text-4xl text-ink sm:text-5xl">
            {t.gallery.title}
          </KineticText>
          <p className="text-balance mx-auto mt-5 max-w-xl text-sm leading-relaxed text-charcoal/80 sm:text-base">
            {t.gallery.subtitle}
          </p>
        </Reveal>

        <RevealGroup className="mt-14 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
          {IMAGES.map((img, i) => (
            <motion.button
              key={img.src}
              type="button"
              variants={galleryItem}
              onClick={() => setOpenIndex(i)}
              className={`group relative cursor-pointer overflow-hidden rounded-sm bg-ink/5 ${
                img.span
              } ${img.span.includes("row-span-2") ? "aspect-[3/5] sm:aspect-auto" : "aspect-square"}`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-ink/0 transition-colors duration-500 group-hover:bg-ink/20" />
            </motion.button>
          ))}
        </RevealGroup>

        <Press />
      </div>

      <AnimatePresence>
        {openIndex !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/95 p-4 sm:p-10"
            onClick={close}
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close"
              className="absolute right-3 top-3 flex h-11 w-11 cursor-pointer items-center justify-center text-cream/80 transition-colors hover:text-cream sm:right-4 sm:top-4"
            >
              <X size={28} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                prev();
              }}
              aria-label="Previous image"
              className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer p-2 text-cream/70 transition-colors hover:text-cream sm:left-6"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                next();
              }}
              aria-label="Next image"
              className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer p-2 text-cream/70 transition-colors hover:text-cream sm:right-6"
            >
              <ChevronRight size={32} />
            </button>
            <motion.div
              key={openIndex}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="relative h-[70vh] w-full max-w-3xl"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={IMAGES[openIndex].src}
                alt={IMAGES[openIndex].alt}
                fill
                sizes="100vw"
                className="object-contain"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function Press() {
  const { t } = useLanguage();

  return (
    <div className="mt-24 border-t border-border pt-16 sm:mt-32">
      <Reveal className="text-center">
        <span className="text-xs font-semibold uppercase tracking-[0.3em] text-wine">
          {t.press.eyebrow}
        </span>
        <KineticText as="h3" className="font-display text-balance mt-4 text-3xl text-ink sm:text-4xl">
          {t.press.title}
        </KineticText>
        <div className="mt-4 flex items-center justify-center gap-1.5 text-gold-deep">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={16}
              fill={i < 4 ? "currentColor" : "none"}
              strokeWidth={1.5}
            />
          ))}
          <span className="ml-2 text-xs font-medium uppercase tracking-wide text-stone">
            {t.press.ratingLabel}
          </span>
        </div>
      </Reveal>

      <RevealGroup className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {t.press.items.map((item) => (
          <motion.figure
            key={item.source}
            variants={revealItem}
            className="flex h-full flex-col justify-between rounded-sm border border-border bg-white/50 p-6"
          >
            <blockquote className="font-display text-base italic leading-relaxed text-charcoal">
              &ldquo;{item.quote}&rdquo;
            </blockquote>
            <figcaption className="mt-5 text-xs font-semibold uppercase tracking-wide text-wine">
              {item.source}
            </figcaption>
          </motion.figure>
        ))}
      </RevealGroup>
    </div>
  );
}
