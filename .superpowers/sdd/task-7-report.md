# Task 7 report — Reservation form pre-fill + booking banner

## Edits made (`src/components/Reservation.tsx`)

1. Added `useEffect` to the `react` import; added `import { useWhatsOn } from "@/lib/whats-on";` and `import { eventCopy } from "@/lib/events";`.
2. Below `const { t, lang } = useLanguage();`:
   ```ts
   const { event, bookingEventId, clearBooking } = useWhatsOn();
   const bookingForEvent =
     bookingEventId && event && event.id === bookingEventId ? event : null;
   ```
3. Pre-fill `useEffect` after `const today = useMemo(...)`, deps `[bookingForEvent, lang]`, guarded with `if (!bookingForEvent) return;`. Sets `date` / `location` / `notes` via `setForm`, marks `date` + `location` touched via `setTouched`.
4. Gold banner inside `<Reveal delay={0.15} ...>` immediately before `<AnimatePresence mode="wait">`, rendered only when `bookingForEvent && status !== "success"`. `Clear` button calls `clearBooking()` then resets the 3 fields.

### Deviation from brief
The brief's Step 3 code failed `npm run lint` with `react-hooks/set-state-in-effect`
("Calling setState synchronously within an effect"). Resolved by adding
`// eslint-disable-next-line react-hooks/set-state-in-effect` on the `setForm` line —
this is the existing repo convention for the same situation (`src/lib/whats-on.tsx:34`,
`src/lib/i18n.tsx:4397`). Only the first `setState` in the effect is flagged, so no
directive was needed on `setTouched`. No logic change.

## Verification

### tsc + lint
- `npx tsc --noEmit` — clean (exit 0)
- `npm run lint` — clean (no output, exit 0)

### Dev server (http://localhost:3000, `npm run dev` already running on :3000)

Browser pane screenshots came back blank/stale — the pane renders incorrectly while
hidden (anticipated by the brief). All checks below are read directly from the live DOM
via `javascript_tool`.

**EN — after clicking popup "Reserve a table":**
- Rendered banner outerHTML:
  ```html
  <div class="mb-6 flex items-center justify-between gap-3 rounded-sm border border-gold/40 bg-gold/10 px-4 py-3 text-sm text-ink">
    <span>You're booking for <strong class="font-semibold">Pinchos Night · 1st Edition</strong> · Sat 19 Sep · 6:00–9:00 PM</span>
    <button type="button" class="shrink-0 cursor-pointer text-xs font-semibold uppercase tracking-wide text-wine hover:underline">Clear</button>
  </div>
  ```
  Banner text: `You're booking for Pinchos Night · 1st Edition · Sat 19 Sep · 6:00–9:00 PM  CLEAR` — matches expected string exactly.
- Form field values read from DOM:
  | field | value |
  |---|---|
  | `#date` | `2026-09-19` |
  | `#location` | `IBÉRICO Thảo Điền` |
  | `#notes` | `Booking for Pinchos Night — Sat 19 Sep, 6 PM` |
  | `#guests` | `2` |
- `#time` dropdown: 16 options, first `16:00`, last `23:30` (Thảo Điền hours 16:00 start) — populated.

**WhatsApp submit (name `Test Person`, phone `0900000000`, time `18:00`):**
- Intercepted `window.open` URL:
  `https://wa.me/84849000531?text=...`
- Decoded `text` param contains the line:
  `Notes: Booking for Pinchos Night — Sat 19 Sep, 6 PM`
  (full body: greeting / Name / Phone / Date: 2026-09-19 / Time: 18:00 / Guests: 2 / Location: IBÉRICO Thảo Điền / Notes: Booking for Pinchos Night …)

**Clear button (EN):**
- After click: gold banner element gone from DOM (`bannerGone: true`)
- `#date` = `""`, `#location` = `""`, `#notes` = `""`
- `#guests` = `2` (unchanged) ✓

**Banner hidden on success:** confirmed — when `status` reached `success`, no `bg-gold/10` element present in `#reserve`.

**VI — switched language to 🇻🇳VI, then opened popup:**
- Banner text: `Bạn đang đặt bàn cho Pinchos Night · Số đầu tiên · Thứ Bảy 19/9 · 18:00–21:00  XOÁ`
- `#notes` prefilled: `Đặt bàn cho Pinchos Night — Thứ Bảy 19/9, 18:00`
- `#date` = `2026-09-19`, `#location` = `IBÉRICO Thảo Điền` (locale-independent, correct)

### Screenshot note
Browser-pane screenshots returned a blank off-white frame on every attempt after the
first page load (pane is hidden; rendering stuck — matches the brief's warning). DOM
reads above are the source of truth. One early screenshot of the loaded homepage hero
saved successfully, confirming the dev server serves the updated bundle.

## Self-review
- Effect guarded by `if (!bookingForEvent) return;`; deps `[bookingForEvent, lang]`; `setForm`/`setTouched` updaters are stable → no infinite loop. Confirmed live: banner + values stayed stable across repeated 2s polls.
- Banner hidden when `status === "success"` — confirmed.
- `Clear` calls `clearBooking()` and resets `date`/`location`/`notes` — confirmed, `guests` untouched.
- No change to `buildMessageLines` / `buildWhatsAppUrl` / `buildZaloUrl` / `saveBooking` / `/api/reservations`. Event note flows into the WhatsApp body and the API payload through the existing `form.notes` plumbing.

## Commit
Only `src/components/Reservation.tsx` staged. Untracked media / `Iberico/` / `menu-extraction-notes.md` left alone. AGENTS.md not touched.

Commit `d4a8d75` — `feat(reservation): pre-fill + banner when arriving from the event popup`

## Follow-up (coordinator request) — clear touched flags on Clear

Minor UX: after `Clear`, `date`/`location` were emptied but their `touched` flags stayed
`true`, flashing "required" errors under the now-empty fields.

Change: in the banner `Clear` `onClick`, after the `setForm(... "" ...)` line, added
```ts
setTouched((tch) => ({ ...tch, date: false, location: false }));
```
Only change in the commit.

Re-verification:
- `npx tsc --noEmit` — clean
- `npm run lint` — clean
- Dev server DOM check: open popup → `Clear`. Before: date `2026-09-19`, location `IBÉRICO Thảo Điền`. After: banner gone, `#date`/`#location`/`#notes` empty, `#guests` still `2`, and **no `p[role="alert"]` under Date or Location, no "required" text anywhere in `#reserve`**. Confirmed fixed.

Commit `31aa4b7` — `fix(reservation): clear touched flags when clearing an event booking`
