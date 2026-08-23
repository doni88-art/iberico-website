import type { Booking } from "./supabase";

const CONFIRMATION_COPY = {
  en: {
    subject: "Thank you for your reservation — IBÉRICO",
    heading: "Thank you, {name}!",
    intro:
      "We've received your reservation request and our team will confirm it with you shortly by phone or WhatsApp.",
    details: "Your details",
    location: "Location",
    date: "Date",
    time: "Time",
    guests: "Guests",
    notes: "Notes",
    outro:
      "If anything about your booking changes, just reply to this email or message us on WhatsApp.",
    signoff: "See you soon,\nIBÉRICO Tapas y Vino",
  },
  vi: {
    subject: "Cảm ơn bạn đã đặt bàn — IBÉRICO",
    heading: "Cảm ơn {name}!",
    intro:
      "Chúng tôi đã nhận được yêu cầu đặt bàn của bạn và đội ngũ sẽ sớm xác nhận qua điện thoại hoặc WhatsApp.",
    details: "Thông tin đặt bàn",
    location: "Chi nhánh",
    date: "Ngày",
    time: "Giờ",
    guests: "Số khách",
    notes: "Ghi chú",
    outro:
      "Nếu có bất kỳ thay đổi nào, vui lòng trả lời email này hoặc nhắn tin cho chúng tôi qua WhatsApp.",
    signoff: "Hẹn gặp bạn sớm,\nIBÉRICO Tapas y Vino",
  },
  es: {
    subject: "Gracias por tu reserva — IBÉRICO",
    heading: "¡Gracias, {name}!",
    intro:
      "Hemos recibido tu solicitud de reserva y nuestro equipo la confirmará contigo por teléfono o WhatsApp en breve.",
    details: "Detalles de tu reserva",
    location: "Local",
    date: "Fecha",
    time: "Hora",
    guests: "Comensales",
    notes: "Notas",
    outro:
      "Si algo cambia sobre tu reserva, responde a este correo o escríbenos por WhatsApp.",
    signoff: "Nos vemos pronto,\nIBÉRICO Tapas y Vino",
  },
} as const;

const SURVEY_COPY = {
  en: {
    subject: "How was your visit to IBÉRICO?",
    heading: "Thanks for visiting, {name}!",
    intro:
      "We hope you had a wonderful time with us today. Your feedback helps us keep every visit as good as the last — it only takes a moment.",
    questionLabel: "How would you rate your experience?",
    reviewCta: "Leave us a Google review",
    replyNote: "Prefer to tell us directly? Just reply to this email.",
    outro: "Thank you for choosing IBÉRICO — we hope to welcome you back soon.",
    signoff: "Un abrazo,\nIBÉRICO Tapas y Vino",
  },
  vi: {
    subject: "Bạn cảm thấy thế nào về IBÉRICO?",
    heading: "Cảm ơn {name} đã ghé thăm!",
    intro:
      "Chúng tôi hy vọng bạn đã có khoảng thời gian tuyệt vời cùng chúng tôi hôm nay. Ý kiến của bạn giúp chúng tôi giữ vững chất lượng ở mỗi lần ghé thăm — chỉ mất một chút thời gian thôi.",
    questionLabel: "Bạn đánh giá trải nghiệm của mình như thế nào?",
    reviewCta: "Đánh giá chúng tôi trên Google",
    replyNote: "Muốn góp ý trực tiếp? Chỉ cần trả lời email này.",
    outro: "Cảm ơn bạn đã chọn IBÉRICO — hẹn sớm được đón tiếp bạn trở lại.",
    signoff: "Thân mến,\nIBÉRICO Tapas y Vino",
  },
  es: {
    subject: "¿Qué tal tu visita a IBÉRICO?",
    heading: "¡Gracias por venir, {name}!",
    intro:
      "Esperamos que hayas pasado un momento estupendo con nosotros hoy. Tu opinión nos ayuda a mantener cada visita tan buena como la anterior — solo toma un momento.",
    questionLabel: "¿Cómo calificarías tu experiencia?",
    reviewCta: "Déjanos una reseña en Google",
    replyNote: "¿Prefieres contárnoslo directamente? Solo responde a este correo.",
    outro: "Gracias por elegir IBÉRICO — esperamos verte pronto de nuevo.",
    signoff: "Un abrazo,\nIBÉRICO Tapas y Vino",
  },
} as const;

const SHELL_OPEN = `
  <div style="background:#f7f1e8;padding:32px 16px;font-family:Georgia,'Times New Roman',serif;">
    <div style="max-width:480px;margin:0 auto;background:#ffffff;border-radius:4px;overflow:hidden;border:1px solid #e7ddcd;">
      <div style="background:#1c1310;padding:28px 32px;text-align:center;">
        <span style="color:#faca3c;font-size:20px;letter-spacing:2px;">IBÉRICO</span>
        <div style="color:#f7f1e8;font-size:10px;letter-spacing:3px;text-transform:uppercase;margin-top:4px;">Tapas y Vino</div>
      </div>`;
const SHELL_CLOSE = `
    </div>
  </div>`;

/** Sent ~3h after a reservation is submitted: "we've got your request." */
export function buildConfirmationEmail(booking: Booking) {
  const lang = (booking.lang in CONFIRMATION_COPY ? booking.lang : "en") as keyof typeof CONFIRMATION_COPY;
  const c = CONFIRMATION_COPY[lang];
  const heading = c.heading.replace("{name}", booking.name);

  const row = (label: string, value: string | null) =>
    value
      ? `<tr><td style="padding:4px 0;color:#8a7a6a;font-size:13px;">${label}</td><td style="padding:4px 0;color:#1c1310;font-size:13px;text-align:right;">${value}</td></tr>`
      : "";

  const html = `${SHELL_OPEN}
      <div style="padding:32px;">
        <h1 style="margin:0 0 12px;font-size:22px;color:#1c1310;">${heading}</h1>
        <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#4a3f36;">${c.intro}</p>
        <table style="width:100%;border-collapse:collapse;border-top:1px solid #e7ddcd;border-bottom:1px solid #e7ddcd;padding:8px 0;margin-bottom:24px;">
          ${row(c.location, booking.location)}
          ${row(c.date, booking.booking_date)}
          ${row(c.time, booking.booking_time)}
          ${row(c.guests, String(booking.party_size))}
          ${row(c.notes, booking.notes)}
        </table>
        <p style="margin:0 0 24px;font-size:13px;line-height:1.6;color:#8a7a6a;">${c.outro}</p>
        <p style="margin:0;font-size:13px;line-height:1.6;color:#1c1310;white-space:pre-line;">${c.signoff}</p>
      </div>${SHELL_CLOSE}`;

  return { subject: c.subject, html };
}

// Sends the guest to a Google Maps search for their specific location, where
// the review composer is one click away — avoids needing each location's
// exact Google Place ID hardcoded here.
function googleReviewUrl(location: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(location)}`;
}

/** Sent ~3h after the visit itself (reservation_at): post-visit satisfaction survey. */
export function buildSurveyEmail(booking: Booking) {
  const lang = (booking.lang in SURVEY_COPY ? booking.lang : "en") as keyof typeof SURVEY_COPY;
  const c = SURVEY_COPY[lang];
  const heading = c.heading.replace("{name}", booking.name);
  const stars = Array.from({ length: 5 })
    .map(
      () =>
        `<span style="font-size:22px;color:#faca3c;letter-spacing:2px;">&#9733;</span>`
    )
    .join("");

  const html = `${SHELL_OPEN}
      <div style="padding:32px;text-align:center;">
        <h1 style="margin:0 0 12px;font-size:22px;color:#1c1310;">${heading}</h1>
        <p style="margin:0 0 24px;font-size:14px;line-height:1.6;color:#4a3f36;text-align:left;">${c.intro}</p>
        <p style="margin:0 0 8px;font-size:12px;text-transform:uppercase;letter-spacing:1px;color:#8a7a6a;">${c.questionLabel}</p>
        <div style="margin:0 0 24px;">${stars}</div>
        <a href="${googleReviewUrl(booking.location)}" style="display:inline-block;background:#9a2423;color:#f7f1e8;text-decoration:none;font-size:13px;font-weight:bold;letter-spacing:0.5px;padding:12px 28px;border-radius:999px;">${c.reviewCta}</a>
        <p style="margin:20px 0 0;font-size:12px;line-height:1.6;color:#8a7a6a;">${c.replyNote}</p>
        <p style="margin:24px 0 0;font-size:13px;line-height:1.6;color:#4a3f36;text-align:left;">${c.outro}</p>
        <p style="margin:16px 0 0;font-size:13px;line-height:1.6;color:#1c1310;white-space:pre-line;text-align:left;">${c.signoff}</p>
      </div>${SHELL_CLOSE}`;

  return { subject: c.subject, html };
}
