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

