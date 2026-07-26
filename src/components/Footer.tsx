"use client";

import { Mail, ArrowUp } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { LogoMark } from "./Logo";
import { InstagramIcon, FacebookIcon, ZaloIcon, WhatsAppIcon } from "./SocialIcons";

const BOOKINGS_NUMBER = "84849000531";

export function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();

  return (
    <footer className="relative bg-ink pt-20 text-cream/80">
      <div className="divider-wine absolute inset-x-0 top-0 w-full" aria-hidden="true" />
      <div className="mx-auto max-w-7xl px-6 sm:px-8">
        <div className="grid grid-cols-1 gap-12 border-b border-cream/10 pb-14 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2.5 text-cream">
              <LogoMark className="h-9 w-9" />
              <span className="font-display text-lg tracking-[0.12em]">
                IBÉRICO
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-cream/60">
              {t.footer.tagline}
            </p>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              {t.footer.visit}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              {t.locations.items.map((loc) => (
                <li key={loc.name}>
                  <span className="text-cream/90">{loc.area}</span>
                  <br />
                  {loc.address}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              {t.nav.menu}
            </h4>
            <ul className="mt-4 space-y-2.5 text-sm text-cream/70">
              <li><a href="#story" className="cursor-pointer transition-colors hover:text-gold-light">{t.nav.story}</a></li>
              <li><a href="#menu" className="cursor-pointer transition-colors hover:text-gold-light">{t.nav.menu}</a></li>
              <li><a href="#gallery" className="cursor-pointer transition-colors hover:text-gold-light">{t.nav.gallery}</a></li>
              <li><a href="#locations" className="cursor-pointer transition-colors hover:text-gold-light">{t.nav.locations}</a></li>
              <li><a href="#events" className="cursor-pointer transition-colors hover:text-gold-light">{t.nav.events}</a></li>
              <li><a href="#careers" className="cursor-pointer transition-colors hover:text-gold-light">{t.nav.careers}</a></li>
              <li><a href="#reserve" className="cursor-pointer transition-colors hover:text-gold-light">{t.nav.reserve}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xs font-semibold uppercase tracking-[0.2em] text-gold-light">
              {t.footer.connect}
            </h4>
            <div className="mt-4 flex items-center gap-3">
              <a
                href="https://www.instagram.com/iberico_tapas_vino/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-wine-bright hover:text-wine-bright"
              >
                <InstagramIcon size={18} />
              </a>
              <a
                href="https://www.facebook.com/Ibericosaigon/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-wine-bright hover:text-wine-bright"
              >
                <FacebookIcon size={18} />
              </a>
              <a
                href="mailto:hola@weareiberico.com"
                aria-label="Email"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-wine-bright hover:text-wine-bright"
              >
                <Mail size={18} />
              </a>
              <a
                href={`https://wa.me/${BOOKINGS_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-wine-bright hover:text-wine-bright"
              >
                <WhatsAppIcon size={18} />
              </a>
              <a
                href={`https://zalo.me/${BOOKINGS_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Zalo"
                className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-cream/20 transition-colors hover:border-wine-bright hover:text-wine-bright"
              >
                <ZaloIcon size={18} />
              </a>
            </div>
            <a
              href={`tel:+${BOOKINGS_NUMBER}`}
              className="mt-5 inline-block cursor-pointer text-sm text-cream/70 transition-colors hover:text-gold-light"
            >
              +84 849 000 531
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-4 py-8 text-xs text-cream/40 sm:flex-row">
          <p>
            © {year} IBÉRICO Tapas y Vino — {t.footer.madeWith}. {t.footer.rights}
          </p>
          <a
            href="#main"
            className="flex cursor-pointer items-center gap-1.5 transition-colors hover:text-gold-light"
          >
            <ArrowUp size={14} />
            {t.hero.scroll}
          </a>
        </div>
      </div>
    </footer>
  );
}
