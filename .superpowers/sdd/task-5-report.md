# Task 5 — EventPopup modal — Report

**Status:** Complete
**Branch:** `feat/hero-logo-events-popup`
**Commit:** `8261bc6` — feat(events): add EventPopup modal, shown once per visit
**Files committed:** `src/components/EventPopup.tsx` (new), `src/app/page.tsx` (import + `<EventPopup />` after `<Footer />`)

## Pre-flight checks (all held, no deviation needed)
- `page.tsx` was the documented `<Navbar/> <main>…</main> <Footer/>` fragment — added import + `<EventPopup />` as last child.
- `ShimmerButton` renders a `<button>` when no `href`; accepts `type="button"` / `variant="wine"` / `onClick` / `className`.
- Tokens `bg-ink`, `text-cream`, `text-gold-light`, `border-gold/20`, `bg-gold/50`, `bg-ink/80` present.
- `t.whatsOn.{close,maybeLater,whenLabel,whereLabel,priceLabel}` present in EN/VI/ES.
- `WhatsOnProvider` mounted in `layout.tsx`; `useLanguage` in `@/lib/i18n`; `/brand/logo-mark.png` exists.
- Reservation section id is `#reserve` (`src/components/Reservation.tsx:222`).

Component written verbatim from the brief's code block.

## Verification

### tsc + lint
- `npx tsc --noEmit` — clean (`TSC OK`).
- `npm run lint` — clean (no output).

### Dev server (http://localhost:3000, already running)
Note: the headless Browser pane reports `document.hidden === true`, which throttles
`requestAnimationFrame`. Consequence in-test only: Framer Motion exit animations freeze
mid-fade (DOM node lingers at partial opacity instead of unmounting) and
`scrollIntoView({behavior:"smooth"})` does not visibly advance. Both are environment
artifacts, not code issues — the React state transitions and side-effects (below) all
fire correctly and `document.body` scroll is unlocked on every close.

- **Auto-open:** popup fades/scales in ~0.9 s after load over a dimmed, blurred page. Confirmed by screenshot.
- **Body scroll lock while open:** `getComputedStyle(document.body).overflow === "hidden"` while open.
- **Content (current event = Pinchos Night, 19 Sep), verified on screen:**
  - crest (logo-mark, inverted)
  - eyebrow `PINCHOS NIGHT · 1ST EDITION`
  - headline `20 pinchos,` / *one night only* (2nd line italic gold)
  - description present
  - When `Sat 19 Sep · 6:00–9:00 PM`
  - Where `IBÉRICO Thảo Điền · 33 Võ Trường Toản`
  - Price `490.000++ VND / person · drinks separate`
  - `Reserve a table` (wine ShimmerButton) + `Maybe later`
- **a11y:** `role="dialog"`, `aria-modal="true"`, `aria-labelledby="event-popup-title-pinchos-night"` — matches the `<h2 id>` exactly. On open, `document.activeElement` is the dialog card.
- **Focus trap:** forward Tab from last focusable (`Maybe later`) wraps to first (`Close`); Shift+Tab from first (`Close`) wraps to last (`Maybe later`). Only 3 focusables inside the card (`Close`, `Reserve a table`, `Maybe later`); focus never left the card.

### Dismiss paths exercised (all restore `body` scroll + do not reappear without reload)
- **Esc** — `body.overflow` → `visible`, focus returns to `document.body`.
- **Backdrop click** (clicked empty overlay area bottom-left) — `body.overflow` → `visible`, `activeElement` → `BODY`.
- **✕ close button** (`aria-label="Close"`) — `document.body.style.overflow` cleared to `""`.
- **"Maybe later"** — same `onClick={closePopup}` handler as ✕ (identical code path).

### Reserve a table → scroll to #reserve
Clicking `Reserve a table` runs `startBooking()` (sets `popupOpen` false, restores body scroll)
then `document.getElementById("reserve").scrollIntoView({behavior:"smooth", block:"start"})`.
`#reserve` exists (`getBoundingClientRect().top ≈ 10200` from top). The smooth-scroll call
fires; visible scroll progress was RAF-throttled in the hidden test pane so `scrollY` stayed 0
in-test. Logic is correct.

### Screenshots
- **Desktop (~800×450 pane):** card centered on dimmed/blurred hero, `max-w-md`, generous padding, all rows and both CTAs visible, nothing clipped.
- **375 px (mobile preset):** card fits with side margins and `p-8` padding; crest, eyebrow, 2-line headline, wrapped description, When/Where/Price stack, full-width `Reserve a table`, `Maybe later` — all visible, no horizontal overflow, nothing clipped.
- **Reduced motion:** not emulated live (tool has no reduced-motion switch). Code gates the card's slide/scale on `useReducedMotion()` per the brief — kept as-is; when reduced, initial/exit collapse to `{opacity:0}` only.

## Self-review (checklist)
- `"use client"` present (line 1). ✓
- Auto-open effect cleans up its `setTimeout`. ✓
- Open effect cleanup removes the `keydown` listener, resets `document.body.style.overflow = ""`, and restores focus via `lastFocused.current?.focus?.()`. ✓
- Returns `null` when `event` is null (before any hook-free JSX). ✓
- No persistence / `localStorage` code — auto-opens every visit. ✓
- `aria-labelledby={titleId}` matches `<h2 id={titleId}>` (verified in DOM). ✓

## Concerns
None functional. Only the two in-test rendering artifacts noted above (hidden-pane RAF
throttling stalls exit animation + smooth scroll); neither affects real users with a
visible tab, and neither touches the correctness of state, scroll-lock, or focus handling.

## Follow-up — focus-trap guard (commit `126f7ca`)

Review raised one Minor a11y finding: the Tab handler only wrapped focus when
`document.activeElement` was exactly the first or last focusable, so focus could
escape the dialog on Shift+Tab while focus was still on the card container, or on
Tab after clicking non-interactive card text (`activeElement` → `<body>`).

Fix applied in `src/components/EventPopup.tsx`, inside the `popupOpen` keydown
handler, right after `first`/`last` are computed:

```js
if (!card.contains(document.activeElement)) {
  e.preventDefault();
  first.focus();
  return;
}
```

No other change; `card` was already in scope from `cardRef.current`, so no dep-array change.

Verification:
- `npx tsc --noEmit` — clean (`TSC OK`).
- `npm run lint` — clean (no output; exhaustive-deps unaffected).
- Code check: guard runs before the first/last branches; open/Esc/✕ paths untouched.

Committed file: `src/components/EventPopup.tsx` only. Commit `126f7ca` on `feat/hero-logo-events-popup`.
