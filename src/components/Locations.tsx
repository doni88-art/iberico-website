"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Clock, Phone, Users, ArrowUpRight } from "lucide-react";
import { useLanguage, type LocationInfo } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { KineticText } from "./KineticText";

const LOCATION_PHOTOS: Record<string, string> = {
  "IBÉRICO Thảo Điền": "/images/real-location-thaodien.jpg",
  "IBÉRICO Thị Sách": "/images/real-location-thisach.jpg",
  "IBÉRICO Hội An": "/images/real-location-hoian.jpg",
};

export function Locations() {
  const { t } = useLanguage();
  const [active, setActive] = useState(0);
  const loc = t.locations.items[active];

  return (
    <section id="locations" className="relative overflow-hidden bg-cream-deep py-24 sm:py-32">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/real-exterior-night-2.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.22]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-deep via-cream-deep/55 to-cream-deep" />
      </div>
      <div className="relative mx-auto max-w-7xl px-6 sm:px-8">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-wine">
            {t.locations.eyebrow}
          </span>
          <KineticText as="h2" className="font-display text-balance mt-4 text-4xl text-ink sm:text-5xl">
            {t.locations.title}
          </KineticText>
          <p className="text-balance mx-auto mt-5 max-w-xl text-sm leading-relaxed text-charcoal/80 sm:text-base">
            {t.locations.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 flex flex-wrap justify-center gap-2 sm:gap-3">
          {t.locations.items.map((item, i) => (
            <button
              key={item.name}
              type="button"
              onClick={() => setActive(i)}
              className={`relative cursor-pointer rounded-full border px-5 py-2.5 text-sm font-semibold tracking-wide transition-colors duration-300 ${
                active === i
                  ? "border-wine text-cream"
                  : "border-border text-charcoal hover:border-wine/50"
              }`}
            >
              {active === i && (
                <motion.span
                  layoutId="location-pill"
                  className="absolute inset-0 rounded-full bg-wine"
                  transition={{ type: "spring", stiffness: 350, damping: 30 }}
                />
              )}
              <span className="relative z-10">{item.area}</span>
            </button>
          ))}
        </Reveal>

        <div className="mt-12 overflow-hidden rounded-sm border border-border bg-white shadow-xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={loc.name}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="relative h-72 sm:h-80 lg:h-[26rem]">
                <Image
                  src={LOCATION_PHOTOS[loc.name]}
                  alt={`${loc.name} storefront`}
                  fill
                  sizes="100vw"
                  className="object-cover object-[50%_22%]"
                  priority={active === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-6 sm:p-10">
                  <h3 className="font-display text-3xl text-cream sm:text-4xl">
                    {loc.name}
                  </h3>
                  <div className="mt-2 flex items-center gap-2 text-sm text-cream/85 sm:text-base">
                    <MapPin size={16} className="shrink-0 text-gold-light" />
                    {loc.address}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2">
                <div className="flex flex-col justify-center p-8 sm:p-12">
                  <p className="text-sm italic text-stone">{loc.blurb}</p>

                  <div className="mt-6 space-y-4 text-sm text-charcoal">
                    <div className="flex items-start gap-3">
                      <Clock size={18} className="mt-0.5 shrink-0 text-gold-deep" />
                      <span>{loc.hours}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Users size={18} className="mt-0.5 shrink-0 text-gold-deep" />
                      <span>{loc.capacity}</span>
                    </div>
                    <div className="flex items-start gap-3">
                      <Phone size={18} className="mt-0.5 shrink-0 text-gold-deep" />
                      <a
                        href={`tel:${loc.phone.replace(/\s+/g, "")}`}
                        className="cursor-pointer hover:text-wine"
                      >
                        {loc.phone}
                      </a>
                    </div>
                  </div>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
                      loc.mapQuery
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-8 inline-flex w-fit cursor-pointer items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-cream transition-all duration-300 hover:bg-wine"
                  >
                    {t.locations.directions}
                    <ArrowUpRight size={16} />
                  </a>
                </div>

                <LocationMap key={loc.name} loc={loc} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

function LocationMap({ loc }: { loc: LocationInfo }) {
  const [failed, setFailed] = useState(false);
  const timerRef = useRef<number | null>(null);

  const pad = 0.008;
  const bbox = [
    loc.lng - pad,
    loc.lat - pad,
    loc.lng + pad,
    loc.lat + pad,
  ].join(",");
  const mapSrc = `https://www.openstreetmap.org/export/embed.html?bbox=${bbox}&layer=mapnik&marker=${loc.lat},${loc.lng}`;

  useEffect(() => {
    timerRef.current = window.setTimeout(() => setFailed(true), 4000);
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, []);

  const clearFailTimer = () => {
    if (timerRef.current) {
      window.clearTimeout(timerRef.current);
      timerRef.current = null;
    }
  };

  return (
    <div className="relative h-72 bg-ink lg:h-auto">
      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-gradient-to-br from-ink to-charcoal px-6 text-center text-cream/50">
        <MapPin size={28} className="text-gold-light/70" />
        <p className="max-w-[220px] text-xs leading-relaxed">{loc.address}</p>
      </div>
      {!failed && (
        <AnimatePresence mode="wait">
          <motion.iframe
            key={loc.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            src={mapSrc}
            title={`Map to ${loc.name}`}
            onLoad={() => {
              clearFailTimer();
              setFailed(false);
            }}
            onError={() => {
              clearFailTimer();
              setFailed(true);
            }}
            className="absolute inset-0 h-full w-full grayscale-[35%] contrast-[1.05] sepia-[0.08]"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </AnimatePresence>
      )}
    </div>
  );
}
