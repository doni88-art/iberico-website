# Hero logo refresh + Events popup — Design

**Date:** 2026-09-03
**Repo:** `iberico-website`
**Status:** Approved for planning

## Problem

1. The hero renders the IBÉRICO crest + wordmark inside a solid `bg-cream` rounded
   card floating on the dusk photo. It reads like a sticker and breaks the
   editorial tone of the rest of the site. (An unrelated, uncommitted local edit
   in `Hero.tsx` already gropes at a fix — it is superseded by this work.)
2. The restaurant runs headline events (Pinchos Night on 19 Sep, then the 5-Year
   Anniversary on 3 Oct). There is currently no way for a visitor to learn
   about them on arrival. Note: the existing `Events` section is *private venue
   hire* — unrelated, not touched by this work.

## Goals

- Replace the hero logo card with a restrained, on-brand lockup (chosen: "Option C").
- Show the next upcoming event in a dismissible popup on arrival.
- Let the popup's CTA drop the visitor into the booking form with the event's
  date + location pre-filled and a visible "you're booking for X" banner.
- The feature turns itself off once the last event has passed.

## Non-goals

- No CMS / admin UI. Events are edited in a source file.
- No backend/schema changes. The event context rides along in the existing
  reservation `notes` field.
- No changes to booking-number routing.
- No per-visitor suppression storage (user chose "show every visit").

---

## 1. Hero logo — Option C

**File:** `src/components/Hero.tsx`, `src/components/Logo.tsx`

Replace the `mb-7 flex items-center gap-4 rounded-2xl bg-cream px-7 py-4 shadow-xl`
block with a centered vertical lockup rendered directly on the photo:

- Crest, white knockout (`brightness-0 invert`), ~52px tall (`h-[52px]`; tune
  44–56px in preview), `drop-shadow-[0_2px_16px_rgba(0,0,0,0.5)]`.
- Hairline rule beneath: `h-px w-9 bg-cream/60`.
- `IBÉRICO` as **live text** (not `logo-wordmark.png`): `font-display`,
  `tracking-[0.34em]`, `text-cream`, ~`text-sm`/`text-base`, with a leading space
  hack or `pl-[0.34em]` to keep it optically centered.
- Keep the current entrance animation (opacity + scale 0.92→1, `y` 12→0),
  `useReducedMotion` respected.
- Eyebrow copy changes: `Vinos y Tapas · Saigon · Est. 2021` (from
  `Saigon · Est. 2021`). Update all three languages in `i18n.tsx` (`hero.eyebrow`).

**`Logo.tsx`:** add an optional `knockout?: boolean` prop to `LogoMark` that adds
`brightness-0 invert` and swaps the drop-shadow for the darker one, so the hero
and any future dark-context use share one component. `Wordmark` already renders
live text — reuse it for the hero wordmark with the wider tracking via `className`.

**Cleanup:** the uncommitted working-tree edit to `Hero.tsx` is folded into this
change (do not commit it separately).

---

## 2. Events data — `src/lib/events.ts` (new)

Plain module, no React, no dependency on `i18n.tsx`.

```ts
import type { Lang } from "@/lib/i18n";

export interface SiteEventCopy {
  eyebrow: string;
  title: string;        // first line
  titleEm: string;      // second line, italic gold
  description: string;
  when: string;
  where: string;
  price: string;
  cta: string;
  bookingNote: string;  // seeded into the reservation notes field + banner
}

export interface SiteEvent {
  id: string;
  /** Stop showing once now >= this instant. Vietnam offset (+07:00). */
  showUntilISO: string;
  /** Pre-fill value for the reservation <input type="date"> */
  bookingDate: string;          // "YYYY-MM-DD"
  /** Must exactly match a t.locations.items[].name key */
  locationName: string;
  copy: Partial<Record<Lang, SiteEventCopy>> & { en: SiteEventCopy };
}

export const SITE_EVENTS: SiteEvent[] = [PINCHOS_NIGHT, ANNIVERSARY_5YR];

/** Soonest still-upcoming event, or null when all have passed. */
export function currentEvent(now: Date = new Date()): SiteEvent | null {
  return (
    SITE_EVENTS
      .filter((e) => now.getTime() < new Date(e.showUntilISO).getTime())
      .sort(
        (a, b) =>
          new Date(a.showUntilISO).getTime() - new Date(b.showUntilISO).getTime(),
      )[0] ?? null
  );
}

export function eventCopy(event: SiteEvent, lang: Lang): SiteEventCopy {
  return event.copy[lang] ?? event.copy.en;
}
```

### Real content

**PINCHOS_NIGHT** — moved to Sat 19 Sep 2026 (was 26 Sep), one week earlier;
all other details unchanged. Note: the social captions in `iberico-promotions/`
still say 26 Sep — out of scope here but now stale.
- `id`: `"pinchos-night"`
- `showUntilISO`: `"2026-09-20T00:00:00+07:00"`
- `bookingDate`: `"2026-09-19"`
- `locationName`: `"IBÉRICO Thảo Điền"`
- `copy.en`:
  - eyebrow: `Pinchos Night · 1st Edition`
  - title: `20 pinchos,`
  - titleEm: `one night only`
  - description: `A Basque-style pintxo feast at IBÉRICO Thảo Điền — coming out of the kitchen non-stop, all you can eat.`
  - when: `Sat 19 Sep · 6:00–9:00 PM`
  - where: `IBÉRICO Thảo Điền · 33 Võ Trường Toản`
  - price: `490.000++ VND / person · drinks separate`
  - cta: `Reserve a table`
  - bookingNote: `Booking for Pinchos Night — Sat 19 Sep, 6 PM`
- `copy.vi`:
  - eyebrow: `Pinchos Night · Số đầu tiên`
  - title: `20 loại pinchos,`
  - titleEm: `một đêm duy nhất`
  - description: `Tiệc pincho kiểu Basque tại IBÉRICO Thảo Điền — ra liên tục từ bếp, ăn không giới hạn.`
  - when: `Thứ Bảy 19/9 · 18:00–21:00`
  - where: `IBÉRICO Thảo Điền · 33 Võ Trường Toản`
  - price: `490.000++ VND / người · đồ uống tính riêng`
  - cta: `Đặt bàn`
  - bookingNote: `Đặt bàn cho Pinchos Night — Thứ Bảy 19/9, 18:00`

**ANNIVERSARY_5YR**
- `id`: `"anniversary-5yr"`
- `showUntilISO`: `"2026-10-04T00:00:00+07:00"`
- `bookingDate`: `"2026-10-03"`
- `locationName`: `"IBÉRICO Thảo Điền"`
- `copy.en`:
  - eyebrow: `5 Years of IBÉRICO`
  - title: `The anniversary`
  - titleEm: `party`
  - description: `Five years in Thảo Điền — one big night. Paella cooked live, jamón carved by hand, a DJ till late, live flamenco, and fireworks after dark.`
  - when: `Sat 3 Oct · from 4:00 PM`
  - where: `IBÉRICO Thảo Điền · 33 Võ Trường Toản`
  - price: `Free entry · à la carte all night`
  - cta: `Reserve a table`
  - bookingNote: `Booking for the 5-Year Anniversary Party — Sat 3 Oct, from 4 PM`
- `copy.vi`:
  - eyebrow: `5 Năm IBÉRICO`
  - title: `Tiệc kỷ niệm`
  - titleEm: `năm năm`
  - description: `Năm năm ở Thảo Điền — một đêm thật đã. Paella nấu tại chỗ, jamón cắt tay, DJ tới khuya, flamenco sống, và pháo hoa khi trời tối.`
  - when: `Thứ Bảy 3/10 · từ 16:00`
  - where: `IBÉRICO Thảo Điền · 33 Võ Trường Toản`
  - price: `Vào cửa tự do · gọi món cả tối`
  - cta: `Đặt bàn`
  - bookingNote: `Đặt bàn cho Tiệc Kỷ Niệm 5 Năm — Thứ Bảy 3/10, từ 16:00`

`es` is intentionally omitted → falls back to `en` via `eventCopy()`.

---

## 3. `WhatsOnProvider` — `src/lib/whats-on.tsx` (new)

Client context. Wrap `{children}` in `src/app/layout.tsx` *inside* `LanguageProvider`
(needs `lang`).

State / value:

| field | type | notes |
|---|---|---|
| `event` | `SiteEvent \| null` | `null` on server + first client render; set in `useEffect` to `currentEvent()` — avoids hydration mismatch from clock/tz differences |
| `popupOpen` | `boolean` | starts `false` |
| `openPopup()` | `() => void` | navbar link |
| `closePopup()` | `() => void` | ✕ / Esc / backdrop / "Maybe later" |
| `bookingEventId` | `string \| null` | set by `startBooking`, read by `Reservation` |
| `startBooking()` | `() => void` | sets `bookingEventId = event.id`, closes popup; caller does the scroll |
| `clearBooking()` | `() => void` | banner "Clear" link |

`useWhatsOn()` hook throws if used outside the provider (same pattern as
`useLanguage`).

---

## 4. `EventPopup.tsx` (new)

Rendered once, at the end of `src/app/page.tsx` (sibling of `<Footer />`, outside
`<main>`).

- `const { event, popupOpen, openPopup, closePopup, startBooking } = useWhatsOn()`
- Returns `null` if `event === null`.
- **Auto-open:** on mount, `setTimeout(() => openPopup(), 900)`; clear on unmount.
  Runs on every fresh page load (no storage). Once `closePopup()` is called it
  stays closed for the session (state only).
- **Layout** (Option 1 — compact type-only card):
  - Backdrop: `fixed inset-0 z-[90] bg-ink/80 backdrop-blur-sm`, click closes.
  - Card: `max-w-md bg-ink text-cream border border-gold/20 rounded-sm`,
    `p-8 sm:p-10`, centered.
  - ✕ button top-right (`aria-label`, `t` string).
  - White knockout crest ~40px · gold eyebrow (`tracking-[0.3em] uppercase`) ·
    Playfair title with `titleEm` on its own italic gold line ·
    description · hairline (`w-9 h-px bg-gold/50`) ·
    When / Where / Price rows (small gold uppercase key + cream value) ·
    wine `Reserve a table` button + ghost `Maybe later`.
- **CTA:** `Reserve a table` → `startBooking()` then
  `document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth", block: "start" })`.
  `Maybe later` and ✕ → `closePopup()`.
- **Animation:** `AnimatePresence`; backdrop fade, card fade + `y: 12 → 0` +
  `scale: 0.96 → 1`, ~0.3s `[0.22,1,0.36,1]`. `useReducedMotion` → opacity only.
- **a11y:**
  - `role="dialog"` `aria-modal="true"` `aria-labelledby` (title id).
  - Focus moves to the card (or ✕) on open; focus is restored to
    `document.activeElement` snapshot on close.
  - Focus trap within the card (Tab / Shift+Tab wrap).
  - `Escape` closes.
  - `document.body` scroll locked while open (`overflow: hidden`), restored on close.

New `i18n.tsx` strings under a `whatsOn` key: `navLabel`, `close`, `maybeLater`,
`whenLabel`, `whereLabel`, `priceLabel` (EN / VI / ES).

---

## 5. Navbar — "What's On" link

**File:** `src/components/Navbar.tsx`

- `const { event, openPopup } = useWhatsOn()`
- Render the link only when `event !== null`.
- Desktop nav + mobile menu, consistent with existing nav items.
- Label from `t.whatsOn.navLabel`: `What's On` / `Sự kiện` / `Agenda`.
- `onClick` → `openPopup()` (and close the mobile menu if open). Not an anchor
  jump — it reopens the dialog.

---

## 6. Reservation form — event context

**File:** `src/components/Reservation.tsx`

- `const { event, bookingEventId, clearBooking } = useWhatsOn()`
- `useEffect` on `bookingEventId`: when it becomes non-null and matches an event,
  set form fields:
  - `date = event.bookingDate`
  - `location = event.locationName`
  - `notes = eventCopy(event, lang).bookingNote`
  - mark those `touched` so validation/time-slots recompute.
- **Banner** above the `<form>` (only when `bookingEventId` is set): a
  `border-gold/40 bg-gold/10` strip —
  **"You're booking for {eyebrow} · {when}"** + a `Clear` text button →
  `clearBooking()` and reset `date`/`location`/`notes` to `initialState` values.
- The note flows through `buildMessageLines()` (already appends
  `Notes: …`) into WhatsApp/Zalo and through `saveBooking()` into Supabase. No
  API change.
- Booking-number routing unchanged (both events are Thảo Điền → central line).

---

## Error handling / edge cases

- **All events passed:** `currentEvent()` → `null` → `EventPopup` renders
  nothing, navbar link hidden. No dead UI.
- **Hydration:** `event` is `null` until `useEffect` runs, so server and first
  client render match. Popup can only appear post-hydration anyway (900ms timer).
- **User switches language while popup open:** copy is read from `eventCopy(event,
  lang)` on each render — updates live.
- **User switches language after prefill:** `notes` keeps the language it was
  filled in; acceptable (staff read both). Optional nicety: re-fill `notes` on
  `lang` change while `bookingEventId` is set.
- **`scrollIntoView` before form is mounted:** the form is always in the DOM
  (same page), so `#reserve` always resolves.
- **Reduced motion:** all three animated surfaces (hero lockup, popup, banner)
  check `useReducedMotion`.
- **Double-open:** `openPopup()` is idempotent (`popupOpen` already `true`).

## Open items (confirm during implementation, not blockers)

- The anniversary promo lists booking number **079 318 99 39**, which differs
  from the site's central Saigon line. This design routes anniversary bookings
  through the on-site form → central line (consistent with the rest of the site).
  If Donato wants that specific number surfaced, it's a follow-up.
- Exact crest pixel size in the hero (44–56px) — tune visually in preview.

## Verification

No test infra in this repo (matches project convention). Verify via:

1. `npx eslint` — clean.
2. `npx tsc --noEmit` — clean. (Do **not** use `next build` for the check — per
   project notes it mutates `layout.tsx` / `package.json`.)
3. Preview (`next dev`) manual pass:
   - Hero: lockup renders on photo, no card, centered, animates, looks right at
     375px and desktop.
   - Popup appears ~900ms after load; ✕ / Esc / backdrop / "Maybe later" all
     close it; reload → reappears.
   - `Reserve a table` → smooth scroll to form, `date` = 2026-09-19 (Pinchos
     Night, the current event), `location` = Thảo Điền, banner shown, note
     present; submitting WhatsApp shows the note in the message body.
   - Banner `Clear` resets the three fields and hides the banner.
   - Navbar "What's On" reopens the popup (desktop + mobile menu).
   - Toggle VI: popup + banner + nav label all translate.
   - Temporarily set `currentEvent(new Date("2026-09-25"))` → Anniversary content
     shows (`date` prefill 2026-10-03); set `"2026-10-10"` → no popup, no nav link.
   - `prefers-reduced-motion` → surfaces fade only, no slide/scale.
