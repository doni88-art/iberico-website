"use client";

import { useLanguage } from "@/lib/i18n";

export function Marquee() {
  const { t } = useLanguage();
  const loop = [...t.marquee, ...t.marquee];

  return (
    <div className="relative overflow-hidden border-y border-gold-light/20 bg-ink py-4">
      <div className="flex w-max animate-marquee items-center">
        {loop.map((item, i) => (
          <span key={i} className="flex shrink-0 items-center">
            <span className="whitespace-nowrap px-6 text-xs font-semibold uppercase tracking-[0.25em] text-cream/70">
              {item}
            </span>
            <span aria-hidden="true" className="text-gold-light">
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}
