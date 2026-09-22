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
  /** Set only for the automatic pop-up: ms after which it should self-dismiss
   * unless the visitor is interacting with it. null for a manually opened popup. */
  autoCloseMs: number | null;
  openPopup: () => void;
  closePopup: () => void;
  startBooking: () => void;
  clearBooking: () => void;
}

const WhatsOnContext = createContext<WhatsOnContextValue | null>(null);

// How long the auto-triggered popup stays up before it dismisses itself —
// it's a heads-up, not a form to fill in, so it shouldn't linger.
const AUTO_POPUP_DISMISS_MS = 6000;

export function WhatsOnProvider({ children }: { children: ReactNode }) {
  const [event, setEvent] = useState<SiteEvent | null>(null);
  const [popupOpen, setPopupOpen] = useState(false);
  const [bookingEventId, setBookingEventId] = useState<string | null>(null);
  const [autoCloseMs, setAutoCloseMs] = useState<number | null>(null);

  // Resolve the active event only after mount so the server render and the
  // first client render agree (they would otherwise diverge on clock/timezone).
  useEffect(() => {
    const current = currentEvent();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEvent(current);
    if (!current?.autoOpen) return;
    // Auto-open at most once every 12 hours per visitor; `?popup` forces it (for testing).
    // A blocked/failed localStorage just means it opens every visit.
    const key = `iberico:popup-seen:${current.id}`;
    const forced = new URLSearchParams(window.location.search).has("popup");
    try {
      const last = Number(window.localStorage.getItem(key) ?? 0);
      if (!forced && Date.now() - last < 12 * 60 * 60 * 1000) return;
    } catch {}
    // Wait long enough for the hero to land and be read before interrupting.
    const timer = window.setTimeout(() => {
      setPopupOpen(true);
      setAutoCloseMs(AUTO_POPUP_DISMISS_MS);
      try {
        window.localStorage.setItem(key, String(Date.now()));
      } catch {}
    }, 7000);
    return () => window.clearTimeout(timer);
  }, []);

  const openPopup = useCallback(() => {
    setAutoCloseMs(null);
    setPopupOpen(true);
  }, []);
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
      autoCloseMs,
      openPopup,
      closePopup,
      startBooking,
      clearBooking,
    }),
    [
      event,
      popupOpen,
      bookingEventId,
      autoCloseMs,
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
