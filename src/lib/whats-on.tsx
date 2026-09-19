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
    const timer = window.setTimeout(() => {
      setPopupOpen(true);
      try {
        window.localStorage.setItem(key, String(Date.now()));
      } catch {}
    }, 1500);
    return () => window.clearTimeout(timer);
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
