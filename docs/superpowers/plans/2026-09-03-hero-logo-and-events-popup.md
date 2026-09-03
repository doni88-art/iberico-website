# Hero logo refresh + Events popup — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the hero's white logo card with a restrained crest + wordmark lockup, and add a dismissible "what's on" popup that surfaces the next upcoming event and drops the visitor into a pre-filled booking.

**Architecture:** A plain data module (`events.ts`) holds the event list and a `currentEvent()` selector. A small client context (`whats-on.tsx`) computes the active event after mount (avoiding hydration skew) and holds popup + booking-handoff state. `EventPopup.tsx` renders the modal; `Navbar` gains a conditional "What's On" button; `Reservation` consumes the context to pre-fill and show a booking banner. No backend, no new dependencies, no storage.

**Tech Stack:** Next.js 16 (App Router, RSC + client components), TypeScript, Tailwind v4, Framer Motion, lucide-react. Spanish/Vietnamese/English via the existing `src/lib/i18n.tsx` dictionary + `useLanguage()` hook.

## Global Constraints

- **This is NOT stock Next.js** — a modified canary. Per `AGENTS.md`, check `node_modules/next/dist/docs/` before using an unfamiliar API. Nothing in this plan needs a new Next API.
- **Do NOT run `next build`** as a check — per project notes it mutates `layout.tsx` / `package.json` / `next` version. Use `npx tsc --noEmit` and `npm run lint`.
- **No test runner in this repo** by deliberate convention (see spec). Each task is verified by typecheck + lint + a scripted preview check, then committed.
- **Commit identity:** this repo has no configured git identity. Run once before Task 1:
  `git config user.name "IBERICO CHEF" && git config user.email "admin@Admins-MBP-2.fpt"`
- **Every commit message** ends with a trailing:
  `Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>`
- **Brand tokens** (already in `globals.css`): `ink`, `ink-soft`, `cream`, `cream-deep`, `wine`, `wine-bright`, `gold`, `gold-light`, `gold-deep`, `border`, `charcoal`, `stone`. Use these — do not introduce raw hex.
- **Bilingual copy** is mandatory for every user-facing string (EN + VI + ES). ES may reuse EN wording where a translation adds nothing, but the key must exist.
- **Location name string** must be exactly `IBÉRICO Thảo Điền` (with the combining diacritics) — it is matched by identity against `t.locations.items[].name` in `Reservation.tsx`.
- **Reduced motion:** every animated surface checks `useReducedMotion()` from `framer-motion`.

---

## File Structure

**Create:**
- `src/lib/events.ts` — `SiteEvent` / `SiteEventCopy` types, the two event objects, `SITE_EVENTS`, `currentEvent(now?)`, `eventCopy(event, lang)`. Pure module, no React.
- `src/lib/whats-on.tsx` — `WhatsOnProvider`, `useWhatsOn()`. Client context.
- `src/components/EventPopup.tsx` — the modal dialog. Client component.

**Modify:**
- `src/lib/i18n.tsx` — add `whatsOn` block to the `Dict` interface and to all three dictionaries (`en` ~L161, `vi` ~L1551, `es` ~L2941); change `hero.eyebrow` in all three.
- `src/app/layout.tsx` — wrap `{children}` in `<WhatsOnProvider>` inside `<LanguageProvider>`.
- `src/app/page.tsx` — render `<EventPopup />` after `<Footer />`.
- `src/components/Hero.tsx` — replace the `bg-cream` logo card with the Option C lockup; drop the now-unused `LogoMark` import.
- `src/components/Navbar.tsx` — conditional "What's On" button in the desktop `<ul>` and the mobile menu `<ul>`.
- `src/components/Reservation.tsx` — consume `useWhatsOn()`, pre-fill on booking handoff, render the booking banner with a Clear action.

**Interfaces between tasks** are restated in each task's block so tasks can be implemented out of order.

---

### Task 1: Events data module

**Files:**
- Create: `src/lib/events.ts`
- (reads the `Lang` type from `src/lib/i18n.tsx` — type-only import)

**Interfaces:**
- Consumes: `type Lang = "en" | "vi" | "es"` from `@/lib/i18n`.
- Produces:
  - `interface SiteEventCopy { eyebrow: string; title: string; titleEm: string; description: string; when: string; where: string; price: string; cta: string; bookingNote: string }`
  - `interface SiteEvent { id: string; showUntilISO: string; bookingDate: string; locationName: string; copy: Partial<Record<Lang, SiteEventCopy>> & { en: SiteEventCopy } }`
  - `const SITE_EVENTS: SiteEvent[]`
  - `function currentEvent(now?: Date): SiteEvent | null`
  - `function eventCopy(event: SiteEvent, lang: Lang): SiteEventCopy`

- [ ] **Step 1: Write the module**

Create `src/lib/events.ts`:

```ts
import type { Lang } from "@/lib/i18n";

export interface SiteEventCopy {
  eyebrow: string;
  title: string; // first headline line
  titleEm: string; // second headline line, rendered italic + gold
  description: string;
  when: string;
  where: string;
  price: string;
  cta: string;
  bookingNote: string; // seeded into the reservation notes field + shown in the banner
}

export interface SiteEvent {
  id: string;
  /** Stop showing once now >= this instant. Vietnam offset (+07:00). */
  showUntilISO: string;
  /** Pre-fill value for the reservation <input type="date"> (YYYY-MM-DD). */
  bookingDate: string;
  /** Must exactly match a t.locations.items[].name key. */
  locationName: string;
  copy: Partial<Record<Lang, SiteEventCopy>> & { en: SiteEventCopy };
}

// Pinchos Night was moved from 26 Sep to Sat 19 Sep 2026; details otherwise
// unchanged. (Social captions in iberico-promotions/ still say 26 Sep — out of scope.)
const PINCHOS_NIGHT: SiteEvent = {
  id: "pinchos-night",
  showUntilISO: "2026-09-20T00:00:00+07:00",
  bookingDate: "2026-09-19",
  locationName: "IBÉRICO Thảo Điền",
  copy: {
    en: {
      eyebrow: "Pinchos Night · 1st Edition",
      title: "20 pinchos,",
      titleEm: "one night only",
      description:
        "A Basque-style pintxo feast at IBÉRICO Thảo Điền — coming out of the kitchen non-stop, all you can eat.",
      when: "Sat 19 Sep · 6:00–9:00 PM",
      where: "IBÉRICO Thảo Điền · 33 Võ Trường Toản",
      price: "490.000++ VND / person · drinks separate",
      cta: "Reserve a table",
      bookingNote: "Booking for Pinchos Night — Sat 19 Sep, 6 PM",
    },
    vi: {
      eyebrow: "Pinchos Night · Số đầu tiên",
      title: "20 loại pinchos,",
      titleEm: "một đêm duy nhất",
      description:
        "Tiệc pincho kiểu Basque tại IBÉRICO Thảo Điền — ra liên tục từ bếp, ăn không giới hạn.",
      when: "Thứ Bảy 19/9 · 18:00–21:00",
      where: "IBÉRICO Thảo Điền · 33 Võ Trường Toản",
      price: "490.000++ VND / người · đồ uống tính riêng",
      cta: "Đặt bàn",
      bookingNote: "Đặt bàn cho Pinchos Night — Thứ Bảy 19/9, 18:00",
    },
  },
};

const ANNIVERSARY_5YR: SiteEvent = {
  id: "anniversary-5yr",
  showUntilISO: "2026-10-04T00:00:00+07:00",
  bookingDate: "2026-10-03",
  locationName: "IBÉRICO Thảo Điền",
  copy: {
    en: {
      eyebrow: "5 Years of IBÉRICO",
      title: "The anniversary",
      titleEm: "party",
      description:
        "Five years in Thảo Điền — one big night. Paella cooked live, jamón carved by hand, a DJ till late, live flamenco, and fireworks after dark.",
      when: "Sat 3 Oct · from 4:00 PM",
      where: "IBÉRICO Thảo Điền · 33 Võ Trường Toản",
      price: "Free entry · à la carte all night",
      cta: "Reserve a table",
      bookingNote: "Booking for the 5-Year Anniversary Party — Sat 3 Oct, from 4 PM",
    },
    vi: {
      eyebrow: "5 Năm IBÉRICO",
      title: "Tiệc kỷ niệm",
      titleEm: "năm năm",
      description:
        "Năm năm ở Thảo Điền — một đêm thật đã. Paella nấu tại chỗ, jamón cắt tay, DJ tới khuya, flamenco sống, và pháo hoa khi trời tối.",
      when: "Thứ Bảy 3/10 · từ 16:00",
      where: "IBÉRICO Thảo Điền · 33 Võ Trường Toản",
      price: "Vào cửa tự do · gọi món cả tối",
      cta: "Đặt bàn",
      bookingNote: "Đặt bàn cho Tiệc Kỷ Niệm 5 Năm — Thứ Bảy 3/10, từ 16:00",
    },
  },
};

export const SITE_EVENTS: SiteEvent[] = [PINCHOS_NIGHT, ANNIVERSARY_5YR];

/** Soonest still-upcoming event, or null when all have passed. */
export function currentEvent(now: Date = new Date()): SiteEvent | null {
  return (
    SITE_EVENTS.filter(
      (e) => now.getTime() < new Date(e.showUntilISO).getTime(),
    ).sort(
      (a, b) =>
        new Date(a.showUntilISO).getTime() - new Date(b.showUntilISO).getTime(),
    )[0] ?? null
  );
}

export function eventCopy(event: SiteEvent, lang: Lang): SiteEventCopy {
  return event.copy[lang] ?? event.copy.en;
}
```

- [ ] **Step 2: Typecheck**

Run: `npx tsc --noEmit`
Expected: no new errors.

- [ ] **Step 3: Verify the selector logic at three dates**

Run:
```bash
npx tsx --eval "import('./src/lib/events.ts').then(m => console.log([m.currentEvent(new Date('2026-09-10T12:00:00+07:00'))?.id, m.currentEvent(new Date('2026-09-25T12:00:00+07:00'))?.id, m.currentEvent(new Date('2026-10-10T12:00:00+07:00'))?.id]))"
```
Expected output: `[ 'pinchos-night', 'anniversary-5yr', undefined ]`
(Pinchos Night's `showUntilISO` is 20 Sep — sooner than the Anniversary's 4 Oct —
so it is the active event first, then the popup rolls to the Anniversary.)
(`npx tsx` is fetched on demand; the `import type` line is erased at runtime so the `@/` alias never resolves. If offline, skip this step — Task 8 re-verifies rollover in the browser.)

- [ ] **Step 4: Lint**

Run: `npm run lint`
Expected: no new errors for `src/lib/events.ts`.

- [ ] **Step 5: Commit**

```bash
git add src/lib/events.ts
git commit -m "$(cat <<'EOF'
feat(events): add site-events data module + currentEvent selector

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 2: i18n strings — `whatsOn` block + hero eyebrow

**Files:**
- Modify: `src/lib/i18n.tsx` — `Dict` interface (~L51, after the `hero` block); `en` dict (~L161); `vi` dict (~L1551); `es` dict (~L2941).

**Interfaces:**
- Produces on `t`: `t.whatsOn.{navLabel, close, maybeLater, whenLabel, whereLabel, priceLabel, bookingBannerPrefix, bookingClear}` (all `string`).
- Changes: `t.hero.eyebrow` value in all three languages.

- [ ] **Step 1: Add to the `Dict` interface**

In `src/lib/i18n.tsx`, immediately after the `hero: { ... }` block in `interface Dict` (the block ending `scroll: string; };` around L59), add:

```ts
  whatsOn: {
    navLabel: string;
    close: string;
    maybeLater: string;
    whenLabel: string;
    whereLabel: string;
    priceLabel: string;
    bookingBannerPrefix: string;
    bookingClear: string;
  };
```

- [ ] **Step 2: Add the `en` entry + change `en` hero eyebrow**

In `const en: Dict = { ... }`, change:
```ts
    eyebrow: "Saigon · Est. 2021",
```
to:
```ts
    eyebrow: "Vinos y Tapas · Saigon · Est. 2021",
```
and add a `whatsOn` block adjacent to the `hero` block:
```ts
  whatsOn: {
    navLabel: "What's On",
    close: "Close",
    maybeLater: "Maybe later",
    whenLabel: "When",
    whereLabel: "Where",
    priceLabel: "Price",
    bookingBannerPrefix: "You're booking for",
    bookingClear: "Clear",
  },
```

- [ ] **Step 3: Add the `vi` entry + change `vi` hero eyebrow**

In `const vi: Dict = { ... }`, change:
```ts
    eyebrow: "Sài Gòn · Thành lập 2021",
```
to:
```ts
    eyebrow: "Vinos y Tapas · Sài Gòn · Thành lập 2021",
```
and add:
```ts
  whatsOn: {
    navLabel: "Sự kiện",
    close: "Đóng",
    maybeLater: "Để sau",
    whenLabel: "Khi nào",
    whereLabel: "Ở đâu",
    priceLabel: "Giá",
    bookingBannerPrefix: "Bạn đang đặt bàn cho",
    bookingClear: "Xoá",
  },
```

- [ ] **Step 4: Add the `es` entry + change `es` hero eyebrow**

In `const es: Dict = { ... }`, change:
```ts
    eyebrow: "Saigón · Desde 2021",
```
to:
```ts
    eyebrow: "Vinos y Tapas · Saigón · Desde 2021",
```
and add:
```ts
  whatsOn: {
    navLabel: "Agenda",
    close: "Cerrar",
    maybeLater: "Quizás luego",
    whenLabel: "Cuándo",
    whereLabel: "Dónde",
    priceLabel: "Precio",
    bookingBannerPrefix: "Estás reservando para",
    bookingClear: "Borrar",
  },
```

- [ ] **Step 5: Typecheck**

Run: `npx tsc --noEmit`
Expected: PASS. (If a dict is missing the `whatsOn` key, `tsc` fails here with "Property 'whatsOn' is missing" — that is the test.)

- [ ] **Step 6: Lint + commit**

```bash
npm run lint
git add src/lib/i18n.tsx
git commit -m "$(cat <<'EOF'
feat(i18n): add whatsOn strings; widen hero eyebrow to "Vinos y Tapas"

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 3: `WhatsOnProvider` context + wire into layout

**Files:**
- Create: `src/lib/whats-on.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: `currentEvent`, `type SiteEvent` from `@/lib/events` (Task 1).
- Produces: `useWhatsOn()` returning
  ```ts
  {
    event: SiteEvent | null;
    popupOpen: boolean;
    bookingEventId: string | null;
    openPopup: () => void;
    closePopup: () => void;
    startBooking: () => void;   // sets bookingEventId = event.id, closes popup
    clearBooking: () => void;   // sets bookingEventId = null
  }
  ```
  and `<WhatsOnProvider>{children}</WhatsOnProvider>`.

- [ ] **Step 1: Write the provider**

Create `src/lib/whats-on.tsx`:

```tsx
"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { currentEvent, type SiteEvent } from "@/lib/events";

interface WhatsOnContextValue {
  event: SiteEvent | null;
  popupOpen: boolean;
  bookingEventId: string | null;
  openPopup: () => void;
  closePopup: () => void;
  startBooking: () => void;
  clearBooking: () => void;
}

const WhatsOnContext = createContext<WhatsOnContextValue | null>(null);

export function WhatsOnProvider({ children }: { children: ReactNode }) {
  const [event, setEvent] = useState<SiteEvent | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [bookingEventId, setBookingEventId] = useState<string | null>(null);

  // Resolve the active event only after mount so the server render and the
  // first client render agree (they would otherwise diverge on clock/timezone).
  useEffect(() => {
    setEvent(currentEvent());
  }, []);

  const openPopup = useCallback(() => setPopupOpen(true), []);
  const closePopup = useCallback(() => setPopupOpen(false), []);
  const startBooking = useCallback(() => {
    setBookingEventId((prev) => event?.id ?? prev);
    setPopupOpen(false);
  }, [event]);
  const clearBooking = useCallback(() => setBookingEventId(null), []);

  const value = useMemo(
    () => ({
      event,
      popupOpen,
      bookingEventId,
      openPopup,
      closePopup,
      startBooking,
      clearBooking,
    }),
    [
      event,
      popupOpen,
      bookingEventId,
      openPopup,
      closePopup,
      startBooking,
      clearBooking,
    ],
  );

  return (
    <WhatsOnContext.Provider value={value}>{children}</WhatsOnContext.Provider>
  );
}

export function useWhatsOn() {
  const ctx = useContext(WhatsOnContext);
  if (!ctx) throw new Error("useWhatsOn must be used within WhatsOnProvider");
  return ctx;
}
```

- [ ] **Step 2: Wire into `layout.tsx`**

In `src/app/layout.tsx`, add the import near the `LanguageProvider` import:
```ts
import { WhatsOnProvider } from "@/lib/whats-on";
```
and change:
```tsx
        <LanguageProvider>{children}</LanguageProvider>
```
to:
```tsx
        <LanguageProvider>
          <WhatsOnProvider>{children}</WhatsOnProvider>
        </LanguageProvider>
```

- [ ] **Step 3: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS.

- [ ] **Step 4: Preview smoke test**

Run: `npm run dev` (leave running for Tasks 3–8).
Open `http://localhost:3000`.
- Page renders normally.
- Browser devtools console: no errors, no hydration warnings.

- [ ] **Step 5: Commit**

```bash
git add src/lib/whats-on.tsx src/app/layout.tsx
git commit -m "$(cat <<'EOF'
feat(events): add WhatsOnProvider context and mount it in layout

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 4: Hero logo lockup (Option C)

**Files:**
- Modify: `src/components/Hero.tsx`

**Interfaces:**
- Consumes: `t.hero.eyebrow` (already widened in Task 2), `/brand/logo-mark.png` (existing asset).
- Produces: nothing consumed by other tasks.

- [ ] **Step 1: Discard the stale uncommitted edit**

The working tree has an abandoned edit to `Hero.tsx` from a prior session. Reset to the committed version first:
```bash
git checkout -- src/components/Hero.tsx
```

- [ ] **Step 2: Remove the unused import**

In `src/components/Hero.tsx`, delete the line:
```ts
import { LogoMark } from "./Logo";
```

- [ ] **Step 3: Replace the logo card block**

Replace this block:
```tsx
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.05, ease }}
          className="mb-7 flex items-center gap-4 rounded-2xl bg-cream px-7 py-4 shadow-xl"
        >
          <LogoMark className="h-12 w-12 shrink-0" />
          <Image
            src="/brand/logo-wordmark.png"
            alt="IBÉRICO Vinos y Tapas"
            width={908}
            height={530}
            className="h-12 w-auto sm:h-14"
            priority
          />
        </motion.div>
```
with:
```tsx
        <motion.div
          initial={{ opacity: 0, scale: 0.92, y: shouldReduceMotion ? 0 : 12 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.05, ease }}
          className="mb-8 flex flex-col items-center gap-2.5"
        >
          <Image
            src="/brand/logo-mark.png"
            alt="IBÉRICO Vinos y Tapas"
            width={462}
            height={601}
            priority
            className="h-[52px] w-auto brightness-0 invert drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]"
          />
          <span className="h-px w-9 bg-cream/50" />
          <span className="font-display text-sm tracking-[0.34em] text-cream sm:text-base">
            <span className="pl-[0.34em]">IBÉRICO</span>
          </span>
        </motion.div>
```

(Note: this plan renders the crest with a direct `<Image>` for aspect-ratio
correctness rather than adding a `knockout` prop to `LogoMark` as the spec
sketched — `LogoMark` uses `fill` and would distort the portrait crest. `Logo.tsx`
is left untouched.)

- [ ] **Step 4: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS (no "LogoMark is not defined", no unused-import error).

- [ ] **Step 5: Preview check**

With `npm run dev` running, open `http://localhost:3000`:
- Hero shows: white crest → short hairline → letter-spaced `IBÉRICO`, all centered, **no white box**.
- The lockup sits above the eyebrow pill, which now reads `Vinos y Tapas · Saigon · Est. 2021`.
- Entrance animation plays (fade + slight scale).
- Resize to 375px wide: lockup still centered, crest not oversized, nothing clipped.
- DevTools → Rendering → emulate `prefers-reduced-motion: reduce`, reload: no scale/slide on the lockup, it just appears.

- [ ] **Step 6: Commit**

```bash
git add src/components/Hero.tsx
git commit -m "$(cat <<'EOF'
feat(hero): replace white logo card with crest + wordmark lockup

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

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

### Task 6: Navbar "What's On" link

**Files:**
- Modify: `src/components/Navbar.tsx`

**Interfaces:**
- Consumes: `useWhatsOn()` → `{ event, openPopup }` (Task 3); `t.whatsOn.navLabel` (Task 2).
- Produces: nothing consumed by other tasks.

- [ ] **Step 1: Import and read the context**

In `src/components/Navbar.tsx`, add the import beside the other `@/lib` import:
```ts
import { useWhatsOn } from "@/lib/whats-on";
```
Inside `export function Navbar()`, just below `const { lang, setLang, t } = useLanguage();`, add:
```ts
  const { event, openPopup } = useWhatsOn();
```

- [ ] **Step 2: Add the desktop link**

In the desktop `<ul className="hidden lg:flex ...">`, immediately after the `{SECTIONS.map((s) => ( ... ))}` block and before `</ul>`, add:
```tsx
            {event && (
              <li>
                <button
                  type="button"
                  onClick={openPopup}
                  className={`relative cursor-pointer transition-colors after:absolute after:-bottom-1 after:left-0 after:h-px after:w-0 after:transition-all after:duration-300 hover:after:w-full ${
                    scrolled
                      ? "hover:text-gold-deep after:bg-gold-deep"
                      : "hover:text-gold-light after:bg-gold-light"
                  }`}
                >
                  {t.whatsOn.navLabel}
                </button>
              </li>
            )}
```

- [ ] **Step 3: Add the mobile-menu link**

In the mobile `<ul className="flex flex-col gap-1 text-2xl font-display">`, immediately after the `{SECTIONS.map((s, i) => ( ... ))}` block and before `</ul>`, add:
```tsx
              {event && (
                <motion.li
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.05 * SECTIONS.length + 0.1,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="border-b border-border py-4"
                >
                  <button
                    type="button"
                    onClick={() => {
                      setOpen(false);
                      openPopup();
                    }}
                    className="cursor-pointer text-left"
                  >
                    {t.whatsOn.navLabel}
                  </button>
                </motion.li>
              )}
```

- [ ] **Step 4: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS.

- [ ] **Step 5: Preview check**

With `npm run dev`, open `http://localhost:3000`:
- Desktop nav shows `What's On` after `Careers`. Dismiss the popup, click `What's On` → popup reopens.
- Shrink to mobile, open the hamburger menu: `Sự kiện`/`What's On` is the last item; tapping it closes the menu and opens the popup.
- Temporarily edit `src/lib/whats-on.tsx` `setEvent(currentEvent())` → `setEvent(currentEvent(new Date("2026-10-10")))`, reload: no popup auto-opens **and** the nav link is gone. Revert the edit.

- [ ] **Step 6: Commit**

```bash
git add src/components/Navbar.tsx
git commit -m "$(cat <<'EOF'
feat(nav): add conditional "What's On" link that reopens the event popup

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 7: Reservation form — pre-fill + booking banner

**Files:**
- Modify: `src/components/Reservation.tsx`

**Interfaces:**
- Consumes: `useWhatsOn()` → `{ event, bookingEventId, clearBooking }` (Task 3); `eventCopy` from `@/lib/events` (Task 1); `t.whatsOn.{bookingBannerPrefix, bookingClear}` (Task 2).
- Produces: nothing consumed by other tasks.

- [ ] **Step 1: Imports + `useEffect`**

In `src/components/Reservation.tsx`:
- Change `import { useMemo, useRef, useState, type FormEvent } from "react";` to include `useEffect`:
  ```ts
  import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
  ```
- Add beside the `@/lib/i18n` import:
  ```ts
  import { useWhatsOn } from "@/lib/whats-on";
  import { eventCopy } from "@/lib/events";
  ```

- [ ] **Step 2: Read the context**

Just below `const { t, lang } = useLanguage();` inside `export function Reservation()`, add:
```ts
  const { event, bookingEventId, clearBooking } = useWhatsOn();
  const bookingForEvent =
    bookingEventId && event && event.id === bookingEventId ? event : null;
```

- [ ] **Step 3: Pre-fill effect**

Add after the `const today = useMemo(...)` line:
```ts
  useEffect(() => {
    if (!bookingForEvent) return;
    setForm((f) => ({
      ...f,
      date: bookingForEvent.bookingDate,
      location: bookingForEvent.locationName,
      notes: eventCopy(bookingForEvent, lang).bookingNote,
    }));
    setTouched((tch) => ({ ...tch, date: true, location: true }));
  }, [bookingForEvent, lang]);
```

- [ ] **Step 4: Render the banner**

In the JSX, inside `<Reveal delay={0.15} className="mt-12 rounded-sm border border-border bg-white p-6 shadow-xl sm:p-10">`, immediately before `<AnimatePresence mode="wait">`, add:
```tsx
            {bookingForEvent && status !== "success" && (
              <div className="mb-6 flex items-center justify-between gap-3 rounded-sm border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-ink">
                <span>
                  {t.whatsOn.bookingBannerPrefix}{" "}
                  <strong className="font-semibold">
                    {eventCopy(bookingForEvent, lang).eyebrow}
                  </strong>
                  {" · "}
                  {eventCopy(bookingForEvent, lang).when}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    clearBooking();
                    setForm((f) => ({ ...f, date: "", location: "", notes: "" }));
                  }}
                  className="shrink-0 cursor-pointer text-xs font-semibold uppercase tracking-wide text-wine hover:underline"
                >
                  {t.whatsOn.bookingClear}
                </button>
              </div>
            )}
```

- [ ] **Step 5: Typecheck + lint**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS.

- [ ] **Step 6: Preview check**

With `npm run dev`, open `http://localhost:3000`:
- Let the popup appear, click `Reserve a table`. Page scrolls to the form. The gold banner reads **"You're booking for Pinchos Night · 1st Edition · Sat 19 Sep · 6:00–9:00 PM"**.
- Form is pre-filled: Date = `2026-09-19`, Location = `IBÉRICO Thảo Điền`, Notes = `Booking for Pinchos Night — Sat 19 Sep, 6 PM`. Time slots populated for Thảo Điền hours.
- Fill Name + Phone + Time, click the WhatsApp button: the opened `wa.me` message body contains a `Notes: Booking for Pinchos Night …` line.
- Click `Clear` in the banner: banner disappears, Date/Location/Notes reset to empty, `guests` still `2`.
- Toggle language to `VI` before clearing: banner text and the pre-filled note are Vietnamese.

- [ ] **Step 7: Commit**

```bash
git add src/components/Reservation.tsx
git commit -m "$(cat <<'EOF'
feat(reservation): pre-fill + banner when arriving from the event popup

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

---

### Task 8: Integration verification pass

**Files:** none changed unless a defect is found (then fix in the owning file + amend that task's commit or add a `fix:` commit).

**Interfaces:** none.

- [ ] **Step 1: Clean typecheck + lint on the whole tree**

Run: `npx tsc --noEmit && npm run lint`
Expected: PASS, zero warnings introduced by this feature.

- [ ] **Step 2: Event rollover**

Default (no arg, real date ≈ early Sep 2026): popup + navbar link show
**Pinchos Night** (`20 pinchos,` / *one night only*, `Sat 19 Sep · 6:00–9:00 PM`,
`490.000++ VND / person · drinks separate`); `Reserve a table` pre-fills Date
`2026-09-19`, note `Booking for Pinchos Night — Sat 19 Sep, 6 PM`.

Then temporarily edit `src/lib/whats-on.tsx`: `setEvent(currentEvent())` →
`setEvent(currentEvent(new Date("2026-09-25T12:00:00+07:00")))`. Reload:
- Popup + navbar link now show the **5-Year Anniversary** (`The anniversary` /
  *party*, `Sat 3 Oct · from 4:00 PM`, `Free entry · à la carte all night`).
- Click `Reserve a table`: Date pre-fills `2026-10-03`, note =
  `Booking for the 5-Year Anniversary Party — Sat 3 Oct, from 4 PM`.
Then try `new Date("2026-10-10T12:00:00+07:00")`: no popup, no navbar link, no console errors.
**Revert the edit** and confirm Pinchos Night is back.

- [ ] **Step 3: Language sweep**

Cycle EN → VI → ES with the popup open and again with the booking banner shown:
- EN/VI have bespoke copy; ES shows the English event copy (fallback) but ES chrome (`Agenda`, `Cerrar`, `Cuándo`…). No missing-string blanks anywhere.

- [ ] **Step 4: Hero + popup coexistence**

- Hero lockup renders correctly with no white box (desktop + 375px).
- Popup still appears above the navbar (z-order) and above the hero.
- `prefers-reduced-motion: reduce`: hero lockup, popup, and banner all animate by opacity only.

- [ ] **Step 5: Final commit (only if Steps 1–4 required fixes)**

```bash
git add -A
git commit -m "$(cat <<'EOF'
fix(events): address integration-pass findings

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
EOF
)"
```

Otherwise, stop `npm run dev` and report the feature complete.

---

## Self-Review

**Spec coverage:**

| Spec section | Task |
|---|---|
| §1 Hero Option C lockup, eyebrow change | Task 4 (+ eyebrow strings Task 2) |
| §1 `Logo.tsx` `knockout` prop | Deliberately dropped — Task 4 note explains (direct `<Image>` avoids `fill` distortion of the portrait crest) |
| §2 `events.ts` data + `currentEvent` + `eventCopy` + real EN/VI copy | Task 1 |
| §3 `WhatsOnProvider` (event/popupOpen/bookingEventId/actions), mount in layout inside LanguageProvider | Task 3 |
| §4 `EventPopup` — Option 1 layout, 900ms auto-open every visit, all dismiss paths, a11y (dialog/trap/Esc/scroll-lock/focus restore), reduced motion, CTA → startBooking + scroll | Task 5 |
| §4 new i18n strings | Task 2 |
| §5 Navbar conditional "What's On" (desktop + mobile), reopens popup | Task 6 |
| §6 Reservation prefill (date/location/notes), banner with Clear, note flows to WhatsApp + Supabase unchanged, routing unchanged | Task 7 |
| §Error handling — all-passed → nothing; hydration; language switch; scrollIntoView; reduced motion; double-open | Tasks 3 (hydration, idempotent open), 5 (reduced motion, scroll), 8 (all-passed, language) |
| §Verification — eslint, tsc, preview pass, date-fake rollover | Per-task + Task 8 |
| §Open items — anniversary phone number; crest px size | Left as-is (routing via central line); crest tuned in Task 4 Step 5 |

**Placeholder scan:** No TBD/TODO/"handle edge cases" — every step has literal code or literal commands.

**Type consistency:** `SiteEvent` / `SiteEventCopy` fields (`id`, `showUntilISO`, `bookingDate`, `locationName`, `copy`, `eyebrow`, `title`, `titleEm`, `description`, `when`, `where`, `price`, `cta`, `bookingNote`) are identical across Tasks 1, 5, 7. `useWhatsOn()` shape (`event`, `popupOpen`, `bookingEventId`, `openPopup`, `closePopup`, `startBooking`, `clearBooking`) is identical across Tasks 3, 5, 6, 7. `t.whatsOn.*` keys defined in Task 2 match every consumption in Tasks 5/6/7. `eventCopy(event, lang)` signature consistent. `ShimmerButton` props used (`type`, `variant`, `onClick`, `className`) verified against `src/components/ShimmerButton.tsx`.
