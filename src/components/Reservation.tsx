"use client";

import { useMemo, useRef, useState, type FormEvent } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle2, Loader2, Phone, Mail } from "lucide-react";
import { useLanguage } from "@/lib/i18n";
import { Reveal } from "./Reveal";
import { Magnetic } from "./Magnetic";
import { ShimmerButton } from "./ShimmerButton";
import { KineticText } from "./KineticText";
import { ZaloIcon, WhatsAppIcon } from "./SocialIcons";

// Central bookings line — every reservation is sent here via WhatsApp, plus email.
const BOOKINGS_NUMBER = "84849000531";
const BOOKINGS_EMAIL = "hola@weareiberico.com";

// Per-location service hours, keyed by the (untranslated) location name.
const LOCATION_HOURS: Record<
  string,
  { start: string; kitchenClose: string; lastBooking: string }
> = {
  "IBÉRICO Thảo Điền": { start: "16:00", kitchenClose: "22:30", lastBooking: "23:30" },
  "IBÉRICO Thị Sách": { start: "11:00", kitchenClose: "22:30", lastBooking: "23:30" },
  "IBÉRICO Hội An": { start: "11:00", kitchenClose: "22:30", lastBooking: "23:30" },
};
const DEFAULT_HOURS = { start: "11:00", kitchenClose: "22:30", lastBooking: "23:30" };

function generateTimeSlots(start: string, end: string): string[] {
  const [sh, sm] = start.split(":").map(Number);
  const [eh, em] = end.split(":").map(Number);
  const slots: string[] = [];
  let h = sh;
  let m = sm;
  while (h < eh || (h === eh && m <= em)) {
    slots.push(`${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}`);
    m += 30;
    if (m >= 60) {
      m -= 60;
      h += 1;
    }
  }
  return slots;
}

type FormState = {
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  location: string;
  notes: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  phone: "",
  date: "",
  time: "",
  guests: "2",
  location: "",
  notes: "",
};

const REQUIRED_FIELDS: (keyof FormState)[] = [
  "name",
  "phone",
  "date",
  "time",
  "location",
];

export function Reservation() {
  const { t } = useLanguage();
  const [form, setForm] = useState<FormState>(initialState);
  const [touched, setTouched] = useState<Partial<Record<keyof FormState, boolean>>>({});
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const formRef = useRef<HTMLFormElement>(null);

  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  const errors = useMemo(() => {
    const e: Partial<Record<keyof FormState, string>> = {};
    for (const field of REQUIRED_FIELDS) {
      if (!form[field].trim()) e[field] = t.reservation.required;
    }
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      e.email = t.reservation.required;
    }
    return e;
  }, [form, t]);

  const locationHours = LOCATION_HOURS[form.location] ?? DEFAULT_HOURS;
  const timeSlots = useMemo(
    () => generateTimeSlots(locationHours.start, locationHours.lastBooking),
    [locationHours]
  );
  const isLateBooking = form.time >= locationHours.kitchenClose;

  const field = (name: keyof FormState) => ({
    value: form[name],
    onChange: (
      e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
    ) => {
      const value = e.target.value;
      setForm((f) => {
        const next = { ...f, [name]: value };
        if (name === "location") {
          const hours = LOCATION_HOURS[value] ?? DEFAULT_HOURS;
          const slots = generateTimeSlots(hours.start, hours.lastBooking);
          if (!slots.includes(next.time)) next.time = "";
        }
        return next;
      });
    },
    onBlur: () => setTouched((tch) => ({ ...tch, [name]: true })),
  });

  const showError = (name: keyof FormState) => touched[name] && errors[name];

  const buildMessageLines = () => {
    const loc = t.locations.items.find((l) => l.name === form.location);
    return [
      `Hi IBÉRICO! I'd like to reserve a table.`,
      `Name: ${form.name}`,
      `Phone: ${form.phone}`,
      form.email ? `Email: ${form.email}` : null,
      `Date: ${form.date}`,
      `Time: ${form.time}`,
      `Guests: ${form.guests}`,
      `Location: ${loc?.name ?? form.location}`,
      form.notes ? `Notes: ${form.notes}` : null,
    ].filter(Boolean) as string[];
  };

  const buildWhatsAppUrl = () =>
    `https://wa.me/${BOOKINGS_NUMBER}?text=${encodeURIComponent(buildMessageLines().join("\n"))}`;

  const buildZaloUrl = () => `https://zalo.me/${BOOKINGS_NUMBER}`;

  const validate = () => {
    if (Object.keys(errors).length > 0) {
      setTouched(
        REQUIRED_FIELDS.reduce((acc, k) => ({ ...acc, [k]: true }), { email: true })
      );
      const firstInvalid = REQUIRED_FIELDS.find((k) => errors[k]);
      if (firstInvalid) {
        formRef.current
          ?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)
          ?.focus();
      }
      return false;
    }
    return true;
  };

  const [channel, setChannel] = useState<"whatsapp" | "zalo" | null>(null);

  const sendVia = (via: "whatsapp" | "zalo") => {
    if (!validate()) return;
    setChannel(via);
    setStatus("submitting");
    window.setTimeout(() => {
      if (via === "whatsapp") {
        window.open(buildWhatsAppUrl(), "_blank", "noopener,noreferrer");
      } else {
        navigator.clipboard?.writeText(buildMessageLines().join("\n")).catch(() => {});
        window.open(buildZaloUrl(), "_blank", "noopener,noreferrer");
      }
      setStatus("success");
    }, 700);
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    sendVia("whatsapp");
  };

  return (
    <section id="reserve" className="relative overflow-hidden bg-cream-deep py-24 sm:py-32">
      <div className="absolute inset-0" aria-hidden="true">
        <Image
          src="/images/real-bar-interior.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover opacity-[0.22]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-cream-deep via-cream-deep/55 to-cream-deep" />
      </div>
      <div className="relative mx-auto max-w-2xl px-6 sm:px-8">
        <Reveal className="text-center">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-wine">
            {t.reservation.eyebrow}
          </span>
          <KineticText as="h2" className="font-display text-balance mt-4 text-4xl text-ink sm:text-5xl">
            {t.reservation.title}
          </KineticText>
          <p className="text-balance mx-auto mt-4 max-w-md text-sm leading-relaxed text-charcoal/80 sm:text-base">
            {t.reservation.subtitle}
          </p>
        </Reveal>

        <Reveal delay={0.15} className="mt-12 rounded-sm border border-border bg-white p-6 shadow-xl sm:p-10">
          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                role="status"
                aria-live="polite"
                className="flex flex-col items-center py-8 text-center"
              >
                <CheckCircle2 size={48} className="text-wine-bright" strokeWidth={1.3} />
                <h3 className="font-display mt-5 text-2xl text-ink">
                  {t.reservation.success}
                </h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-charcoal/80">
                  {t.reservation.successBody}
                </p>
                {channel === "zalo" && (
                  <p className="mt-3 max-w-sm text-sm leading-relaxed text-wine">
                    {t.reservation.zaloCopied}
                  </p>
                )}
                <button
                  type="button"
                  onClick={() => {
                    setForm(initialState);
                    setTouched({});
                    setStatus("idle");
                    setChannel(null);
                  }}
                  className="mt-7 cursor-pointer rounded-full border border-ink px-6 py-2.5 text-sm font-semibold text-ink transition-colors hover:bg-ink hover:text-cream"
                >
                  {t.reservation.another}
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                ref={formRef}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={onSubmit}
                noValidate
                className="grid grid-cols-1 gap-5 sm:grid-cols-2"
              >
                <Field
                  label={t.reservation.name}
                  name="name"
                  required
                  error={showError("name")}
                  className="sm:col-span-2"
                >
                  <input
                    id="name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    className={inputClass(!!showError("name"))}
                    {...field("name")}
                  />
                </Field>

                <Field label={t.reservation.phone} name="phone" required error={showError("phone")}>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    autoComplete="tel"
                    className={inputClass(!!showError("phone"))}
                    {...field("phone")}
                  />
                </Field>

                <Field label={t.reservation.email} name="email" error={showError("email")}>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    className={inputClass(!!showError("email"))}
                    {...field("email")}
                  />
                </Field>

                <Field
                  label={t.reservation.location}
                  name="location"
                  required
                  error={showError("location")}
                  className="sm:col-span-2"
                >
                  <select
                    id="location"
                    name="location"
                    className={inputClass(!!showError("location"))}
                    {...field("location")}
                  >
                    <option value="" disabled>
                      —
                    </option>
                    {t.locations.items.map((loc) => (
                      <option key={loc.name} value={loc.name}>
                        {loc.name}
                      </option>
                    ))}
                  </select>
                </Field>

                <Field label={t.reservation.date} name="date" required error={showError("date")}>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    min={today}
                    className={inputClass(!!showError("date"))}
                    {...field("date")}
                  />
                </Field>

                <Field label={t.reservation.time} name="time" required error={showError("time")}>
                  <select
                    id="time"
                    name="time"
                    className={inputClass(!!showError("time"))}
                    {...field("time")}
                  >
                    <option value="" disabled>
                      —
                    </option>
                    {timeSlots.map((slot) => (
                      <option key={slot} value={slot}>
                        {slot}
                      </option>
                    ))}
                  </select>
                  {isLateBooking && (
                    <p className="mt-1.5 text-xs leading-relaxed text-stone">
                      {t.reservation.lateNote}
                    </p>
                  )}
                </Field>

                <Field label={t.reservation.guests} name="guests" required>
                  <input
                    id="guests"
                    name="guests"
                    type="number"
                    min={1}
                    max={20}
                    className={inputClass(false)}
                    {...field("guests")}
                  />
                </Field>

                <Field label={t.reservation.notes} name="notes" className="sm:col-span-2">
                  <textarea
                    id="notes"
                    name="notes"
                    rows={3}
                    placeholder={t.reservation.notesPlaceholder}
                    className={inputClass(false) + " resize-none"}
                    {...field("notes")}
                  />
                </Field>

                <div className="sm:col-span-2 mt-2 flex flex-col items-center gap-5">
                  <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                    <Magnetic range={70} strength={0.2} className="w-full sm:w-auto">
                      <ShimmerButton
                        type="submit"
                        variant="wine"
                        disabled={status === "submitting"}
                        className="w-full sm:min-w-[220px]"
                      >
                        {status === "submitting" && channel === "whatsapp" && (
                          <Loader2 size={16} className="animate-spin" />
                        )}
                        {!(status === "submitting" && channel === "whatsapp") && (
                          <WhatsAppIcon size={16} />
                        )}
                        {status === "submitting" && channel === "whatsapp"
                          ? t.reservation.submitting
                          : t.reservation.submitWhatsApp}
                      </ShimmerButton>
                    </Magnetic>

                    <Magnetic range={70} strength={0.2} className="w-full sm:w-auto">
                      <ShimmerButton
                        type="button"
                        variant="outlineDark"
                        disabled={status === "submitting"}
                        onClick={() => sendVia("zalo")}
                        className="w-full sm:min-w-[220px]"
                      >
                        {status === "submitting" && channel === "zalo" && (
                          <Loader2 size={16} className="animate-spin" />
                        )}
                        {!(status === "submitting" && channel === "zalo") && (
                          <ZaloIcon size={16} />
                        )}
                        {status === "submitting" && channel === "zalo"
                          ? t.reservation.submitting
                          : t.reservation.submitZalo}
                      </ShimmerButton>
                    </Magnetic>
                  </div>

                  <div className="flex flex-col items-center gap-3">
                    <span className="text-xs uppercase tracking-[0.15em] text-stone/70">
                      {t.reservation.orContact}
                    </span>
                    <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
                      <a
                        href={`tel:+${BOOKINGS_NUMBER}`}
                        className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-stone transition-colors hover:text-wine"
                      >
                        <Phone size={16} />
                        {t.reservation.call}
                      </a>
                      <a
                        href={`mailto:${BOOKINGS_EMAIL}?subject=Reservation%20Request`}
                        className="inline-flex cursor-pointer items-center gap-2 text-sm font-medium text-stone transition-colors hover:text-wine"
                      >
                        <Mail size={16} />
                        {t.reservation.emailUs}
                      </a>
                    </div>
                  </div>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </Reveal>
      </div>
    </section>
  );
}

function inputClass(invalid: boolean) {
  return [
    "w-full rounded-md border bg-cream px-4 py-3 text-[15px] text-ink transition-colors duration-200",
    "focus:outline-none focus:ring-2 focus:ring-gold/60",
    "min-h-[44px]",
    invalid ? "border-wine" : "border-border",
  ].join(" ");
}

function Field({
  label,
  name,
  required,
  error,
  className,
  children,
}: {
  label: string;
  name: string;
  required?: boolean;
  error?: string | boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={name} className="mb-1.5 block text-xs font-semibold uppercase tracking-wide text-charcoal">
        {label}
        {required && <span className="ml-0.5 text-wine">*</span>}
      </label>
      {children}
      {error && (
        <p role="alert" className="mt-1.5 text-xs text-wine">
          {typeof error === "string" ? error : null}
        </p>
      )}
    </div>
  );
}
