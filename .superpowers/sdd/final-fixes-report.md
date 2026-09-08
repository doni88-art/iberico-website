# Final fixes — hero logo + events popup

Branch: `feat/hero-logo-events-popup`. Six polish/correctness fixes applied on top
of the 14-commit feature. `npx tsc --noEmit` and `npm run lint` both clean before
and after. Verified in the running dev server (`localhost:3000`) via DOM
inspection (browser pane throttles animation, so no screenshots).

---

## A — Reservation pre-fill reconciles the time slot when it overwrites location

**File:** `src/components/Reservation.tsx`

- New module-scope helper `reconcileTime(next: FormState): FormState`
  (`Reservation.tsx:84-93`) — applies the exact
  `LOCATION_HOURS` / `generateTimeSlots` / `if (!slots.includes(next.time)) next.time = ""`
  logic that was previously inline in `field()`.
- Used in **three** places:
  1. `field()` location branch (`Reservation.tsx:~155`) — inline logic replaced
     with `if (name === "location") return reconcileTime(next);`. Behavior
     identical to before.
  2. Event pre-fill / seed effect `setForm` updater (`Reservation.tsx:~121-131`) —
     the seeded `{ ...f, date, location, notes }` object is now passed through
     `reconcileTime(...)`.
  3. Banner `Clear` handler `setForm` updater (`Reservation.tsx:~289`) — the
     `{ ...f, date:"", location:"", notes:"" }` reset is passed through
     `reconcileTime(...)`.

**Verified:** loaded `/#reserve` (no auto-popup), set Location = `IBÉRICO Hội An`
+ Time = `11:00` (Hội An opens 11:00), opened the popup via the navbar link, clicked
"Reserve a table". Result: `location` → `IBÉRICO Thảo Điền`, **`time` field value = `""`**
(not the stale `11:00`). Filled name/phone, submitted via WhatsApp → submit blocked,
focus jumped to the `time` field, "required" error rendered under it, no success
state. Banner `Clear` afterwards → `date`, `location`, `notes`, `time` all `""`,
banner gone.

## B — Language toggle no longer wipes hand-edited date/location

**File:** `src/components/Reservation.tsx`

- The single `useEffect` with deps `[bookingForEvent, lang]` is split into two
  (`Reservation.tsx:~118-149`):
  - **Seed effect**, deps `[bookingForEvent]` (with
    `// eslint-disable-next-line react-hooks/exhaustive-deps` since `lang` is read
    for the initial note only) — seeds `date` + `location` + `notes` via
    `reconcileTime`, marks `date`/`location` touched. `setForm` keeps the
    `react-hooks/set-state-in-effect` disable; `setTouched` needs none (matches the
    original).
  - **Re-translate effect**, deps `[bookingForEvent, lang]` — re-translates
    **only** `notes`, and only when `f.notes` still equals one of
    `Object.values(bookingForEvent.copy).map(c => c.bookingNote)` (the seeded EN/VI
    strings). Otherwise returns `f` unchanged.
- Added a comment above `const bookingForEvent =` (`Reservation.tsx:~95-98`) noting
  it relies on `useWhatsOn().event` being referentially stable (held in `useState`).

**Verified:** started a booking, hand-edited `date` to `2026-09-25`, toggled
ES→VI → `date` still `2026-09-25`, `notes` re-translated to the VI seeded string
(`Đặt bàn cho Pinchos Night — Thứ Bảy 19/9, 18:00`). Then set `notes` to
`"Custom: window seat please, 8 guests"`, toggled VI→EN → `notes` unchanged,
`date` still `2026-09-25`.

## C — EventPopup focus restore

**File:** `src/components/EventPopup.tsx`

- New `skipRestore` ref (`EventPopup.tsx:~19-21`).
- Open-effect cleanup (`EventPopup.tsx:~66-80`) now guards the focus restore:
  `if (!skipRestore.current && lastFocused.current && document.contains(lastFocused.current)) lastFocused.current.focus();`
  then resets `skipRestore.current = false`. Fixes focus dropping to `<body>` when
  the mobile "What's On" trigger unmounts with the menu overlay.
- `onReserve` (`EventPopup.tsx:~90-98`) sets `skipRestore.current = true`, then
  after `startBooking()` + `scrollIntoView`, calls
  `document.getElementById("name")?.focus({ preventScroll: true })` so a keyboard
  user lands on the form's first field.

**Verified:** after clicking "Reserve a table",
`document.activeElement.id === "name"`. The cleanup's restore did not fire (no
focus fight).

## D — Hero crest double-announce (a11y)

**File:** `src/components/Hero.tsx`

- Hero crest `<Image>` `alt="IBÉRICO Vinos y Tapas"` → `alt=""`
  (`Hero.tsx:~60`). The crest is decorative; the adjacent live `IBÉRICO` wordmark
  + `t.hero.eyebrow` carry the text. Matches `EventPopup.tsx`, which already uses
  `alt=""`.

**Verified:** hero `<img src=".../brand/logo-mark.png">` now reports `alt=""`;
crest still loads (naturalWidth 224), wordmark live text present, `<h1>` renders.

## E — Deleted unreferenced asset

- `grep -rn "logo-wordmark" src/` → no matches (hero stopped using it in Task 4).
- `git rm public/brand/logo-wordmark.png`.

## F — Don't hijack deep-linked arrivals

**File:** `src/components/EventPopup.tsx`

- Auto-open effect (`EventPopup.tsx:~24-33`): added `if (window.location.hash) return;`
  before the 900ms `setTimeout`, so a visitor arriving at
  `weareiberico.com/#reserve` or `/#menu` (promo QR codes) is not pulled into the
  popup. The navbar "What's On" link is unaffected.

**Verified:** hard-reloaded `/?t=…#menu`, waited 2s → no `[role="dialog"]` in the
DOM. Hard-reloaded bare `/` → popup auto-opens after ~900ms as before.

---

## Notes / non-concerns

- The hero background photos (`real-patio-dusk.jpg` etc.) report `naturalWidth 0`
  in the browser pane, but the files exist and the `/_next/image` endpoint serves
  them `200 image/jpeg`. This is a browser-pane decode/priority artifact for
  offscreen `fill` images in dev, not a regression — no image-related code was
  touched.
- Untracked media (`*.MP4`, `*.HEIC`, `Iberico/`, `menu-extraction-notes.md`) and
  any `next dev`-regenerated `AGENTS.md` were left unstaged.

## Commits

See `git log` on `feat/hero-logo-events-popup` — subjects:
- `fix(reservation): reconcile time slot on event pre-fill + narrow lang re-translate`
- `fix(events): guard popup focus restore + skip auto-open on deep links`
- `fix(hero): mark decorative crest alt="" to stop double-announce`
- `chore: drop unreferenced logo-wordmark.png`
