"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { useWhatsOn } from "@/lib/whats-on";
import { eventCopy } from "@/lib/events";
import { ShimmerButton } from "./ShimmerButton";

export function EventPopup() {
  const { t, lang } = useLanguage();
  const { event, popupOpen, openPopup, closePopup, startBooking } = useWhatsOn();
  const shouldReduceMotion = useReducedMotion();
  const cardRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Auto-open ~900ms after mount, every visit (no persistence).
  useEffect(() => {
    if (!event) return;
    const id = window.setTimeout(() => openPopup(), 900);
    return () => window.clearTimeout(id);
  }, [event, openPopup]);

  // While open: lock body scroll, trap focus, restore focus on close, Esc closes.
  useEffect(() => {
    if (!popupOpen) return;
    lastFocused.current = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    const card = cardRef.current;
    card?.focus();

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        closePopup();
        return;
      }
      if (e.key !== "Tab" || !card) return;
      const focusables = card.querySelectorAll<HTMLElement>(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
      );
      if (focusables.length === 0) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (!card.contains(document.activeElement)) {
        e.preventDefault();
        first.focus();
        return;
      }
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = "";
      lastFocused.current?.focus?.();
    };
  }, [popupOpen, closePopup]);

  if (!event) return null;

  const c = eventCopy(event, lang);
  const titleId = `event-popup-title-${event.id}`;

  const onReserve = () => {
    startBooking();
    document
      .getElementById("reserve")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <AnimatePresence>
      {popupOpen && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center bg-ink/80 p-5 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          onClick={closePopup}
        >
          <motion.div
            ref={cardRef}
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            initial={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, scale: 0.96 }
            }
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={
              shouldReduceMotion
                ? { opacity: 0 }
                : { opacity: 0, y: 12, scale: 0.96 }
            }
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-md rounded-sm border border-gold/20 bg-ink p-8 text-center text-cream shadow-2xl outline-none sm:p-10"
          >
            <button
              type="button"
              onClick={closePopup}
              aria-label={t.whatsOn.close}
              className="absolute right-3 top-3 flex h-9 w-9 cursor-pointer items-center justify-center text-cream/55 transition-colors hover:text-cream"
            >
              <X size={20} />
            </button>

            <Image
              src="/brand/logo-mark.png"
              alt=""
              width={462}
              height={601}
              className="mx-auto h-10 w-auto brightness-0 invert"
            />

            <p className="mt-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-gold-light">
              {c.eyebrow}
            </p>

            <h2 id={titleId} className="font-display mt-3 text-3xl leading-tight">
              {c.title}
              <span className="block italic text-gold-light">{c.titleEm}</span>
            </h2>

            <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-cream/80">
              {c.description}
            </p>

            <span className="mx-auto my-5 block h-px w-9 bg-gold/50" />

            <dl className="space-y-2 text-sm">
              {[
                [t.whatsOn.whenLabel, c.when],
                [t.whatsOn.whereLabel, c.where],
                [t.whatsOn.priceLabel, c.price],
              ].map(([k, v]) => (
                <div key={k} className="flex flex-col items-center">
                  <dt className="text-[10px] uppercase tracking-[0.14em] text-gold-light">
                    {k}
                  </dt>
                  <dd className="text-cream/90">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-7 flex flex-col items-center gap-3">
              <ShimmerButton
                type="button"
                variant="wine"
                onClick={onReserve}
                className="min-w-[200px]"
              >
                {c.cta}
              </ShimmerButton>
              <button
                type="button"
                onClick={closePopup}
                className="cursor-pointer text-[11px] uppercase tracking-[0.1em] text-cream/55 transition-colors hover:text-cream/90"
              >
                {t.whatsOn.maybeLater}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
