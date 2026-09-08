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

