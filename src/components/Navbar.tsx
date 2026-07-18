"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu as MenuIcon, X } from "lucide-react";
import { useLanguage, languageLabels, languageFlags, type Lang } from "@/lib/i18n";
import { LogoMark } from "./Logo";
import { ShimmerButton } from "./ShimmerButton";

const SECTIONS: { key: "story" | "menu" | "gallery" | "locations" | "events"; href: string }[] = [
  { key: "story", href: "#story" },
  { key: "menu", href: "#menu" },
  { key: "gallery", href: "#gallery" },
  { key: "locations", href: "#locations" },
  { key: "events", href: "#events" },
];

export function Navbar() {
  const { lang, setLang, t } = useLanguage();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 32);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:bg-cream focus:text-ink focus:px-4 focus:py-2 focus:rounded"
      >
        {t.meta.skipToContent}
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
          scrolled || open
            ? "bg-cream/90 backdrop-blur-md border-b border-border shadow-[0_1px_0_rgba(0,0,0,0.02)]"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <nav className="mx-auto flex max-w-7xl items-center justify-between px-5 sm:px-8 py-4">
          <a
            href="#main"
            className={`flex items-center gap-2.5 cursor-pointer transition-colors ${
              scrolled || open ? "text-ink" : "text-cream"
            }`}
          >
            <LogoMark className="h-9 w-9" />
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg tracking-[0.12em]">
                IBÉRICO
              </span>
              <span
                className={`text-[10px] tracking-[0.25em] uppercase ${
                  scrolled || open ? "text-gold-deep" : "text-gold-light"
                }`}
              >
                Tapas y Vino
              </span>
            </span>
          </a>

          <ul
            className={`hidden lg:flex items-center gap-9 text-sm font-medium tracking-wide ${
              scrolled ? "text-charcoal" : "text-cream/90"
            }`}
          >
            {SECTIONS.map((s) => (
              <li key={s.key}>
                <a
                  href={s.href}
                  className={`relative cursor-pointer transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
                    scrolled
                      ? "hover:text-gold-deep after:bg-gold-deep"
                      : "hover:text-gold-light after:bg-gold-light"
                  }`}
                >
                  {t.nav[s.key]}
                </a>
              </li>
            ))}
          </ul>

          <div className="hidden lg:flex items-center gap-4">
            <LangSwitcher
              lang={lang}
              setLang={setLang}
              light={!scrolled}
            />
            <ShimmerButton href="#reserve" variant="wine" size="sm" className="hover:scale-[1.03]">
              {t.nav.reserve}
            </ShimmerButton>
          </div>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className={`lg:hidden cursor-pointer flex items-center justify-center h-11 w-11 -mr-2 rounded-md transition-colors ${
              scrolled || open ? "text-ink" : "text-cream"
            }`}
          >
            {open ? <X size={26} /> : <MenuIcon size={26} />}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 flex flex-col bg-cream pt-24 px-6 lg:hidden"
          >
            <ul className="flex flex-col gap-1 text-2xl font-display">
              {SECTIONS.map((s, i) => (
                <motion.li
                  key={s.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i + 0.1, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  className="border-b border-border py-4"
                >
                  <a href={s.href} onClick={() => setOpen(false)} className="cursor-pointer">
                    {t.nav[s.key]}
                  </a>
                </motion.li>
              ))}
            </ul>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.4 }}
              className="mt-8 flex flex-col gap-6"
            >
              <ShimmerButton
                href="#reserve"
                onClick={() => setOpen(false)}
                variant="wine"
                size="lg"
              >
                {t.nav.reserve}
              </ShimmerButton>
              <LangSwitcher lang={lang} setLang={setLang} light={false} />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function LangSwitcher({
  lang,
  setLang,
  light,
}: {
  lang: Lang;
  setLang: (l: Lang) => void;
  light: boolean;
}) {
  return (
    <div
      className={`flex items-center gap-1 rounded-full border p-1 text-xs font-semibold tracking-wide ${
        light ? "border-cream/30" : "border-border"
      }`}
    >
      {(Object.keys(languageLabels) as Lang[]).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLang(code)}
          className={`flex cursor-pointer items-center gap-1.5 rounded-full px-3 py-2 transition-colors ${
            lang === code
              ? "bg-gold text-ink"
              : light
              ? "text-cream/80 hover:text-cream"
              : "text-charcoal/70 hover:text-ink"
          }`}
          aria-pressed={lang === code}
        >
          <span aria-hidden="true">{languageFlags[code]}</span>
          {languageLabels[code]}
        </button>
      ))}
    </div>
  );
}
