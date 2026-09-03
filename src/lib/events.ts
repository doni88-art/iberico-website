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
