### Task 5: EventPopup component

**Files:**
- Create: `src/components/EventPopup.tsx`
- Modify: `src/app/page.tsx`

**Interfaces:**
- Consumes:
  - `useWhatsOn()` → `{ event, popupOpen, openPopup, closePopup, startBooking }` (Task 3).
  - `useLanguage()` → `{ t, lang }` from `@/lib/i18n`.
  - `eventCopy(event, lang)` from `@/lib/events` (Task 1).
  - `t.whatsOn.{close, maybeLater, whenLabel, whereLabel, priceLabel}` (Task 2).
  - `ShimmerButton` from `./ShimmerButton` — props used: `type="button"`, `variant="wine"`, `onClick`, `className`.
- Produces: `<EventPopup />` (no props).

- [ ] **Step 1: Write the component**

Create `src/components/EventPopup.tsx`:

```tsx
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
```

- [ ] **Step 2: Render it in `page.tsx`**

In `src/app/page.tsx`, add the import:
```ts
import { EventPopup } from "@/components/EventPopup";
```
and add `<EventPopup />` as the last child of the fragment, after `<Footer />`:
```tsx
      <Footer />
      <EventPopup />
    </>
```

- [ ] **Step 3: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS.

- [ ] **Step 4: Preview check**

With `npm run dev`, open `http://localhost:3000`:
- ~0.9s after load the popup fades/scales in over a dimmed page. Body scroll is locked.
- Content (the current event is Pinchos Night, 19 Sep): crest,
  `PINCHOS NIGHT · 1ST EDITION`, `20 pinchos,` / *one night only*, description,
  When/Where/Price rows (`Sat 19 Sep · 6:00–9:00 PM` /
  `IBÉRICO Thảo Điền · 33 Võ Trường Toản` /
  `490.000++ VND / person · drinks separate`), `Reserve a table` + `Maybe later`.
- Close paths all work: `✕`, `Maybe later`, click the dim backdrop, `Esc`. After closing, scroll is restored and it does not reappear until reload.
- Tab key cycles focus **within** the card only; Shift+Tab wraps backwards.
- Click `Reserve a table`: popup closes, page smooth-scrolls to the reservation section.
- Emulate `prefers-reduced-motion: reduce`, reload: popup fades only (no slide/scale).
- 375px width: card fits with padding, nothing clipped.

- [ ] **Step 5: Commit**

```bash
git add src/components/EventPopup.tsx src/app/page.tsx
git commit -m "$(cat <<'EOF'
feat(events): add EventPopup modal, shown once per visit

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

