import type { Booking } from "@/lib/supabase";
import { googleReviewUrl } from "@/lib/email";

// WhatsApp Business Platform (Meta Cloud API). Outside the 24h customer
// window only pre-approved templates can be sent, so the review request is a
// template per language named `${WHATSAPP_TEMPLATE_PREFIX}_en|vi|es`
// (default prefix "iberico_review"). Each template has two body variables:
//   {{1}} guest first name, {{2}} Google review link for their location.

export function whatsappConfigured() {
  return Boolean(process.env.WHATSAPP_TOKEN && process.env.WHATSAPP_PHONE_NUMBER_ID);
}

/** Guest-typed phone -> digits with country code (Vietnam default). */
export function toWhatsAppNumber(raw: string): string | null {
  const trimmed = raw.trim();
  let digits = trimmed.replace(/\D/g, "");
  if (!digits) return null;
  if (trimmed.startsWith("+")) {
    // already international
  } else if (digits.startsWith("00")) {
    digits = digits.slice(2);
  } else if (digits.startsWith("0")) {
    digits = `84${digits.slice(1)}`;
  } else if (!digits.startsWith("84") && digits.length <= 10) {
    digits = `84${digits}`;
  }
  return digits.length >= 9 && digits.length <= 15 ? digits : null;
}

export async function sendReviewWhatsApp(
  booking: Booking
): Promise<{ ok: true } | { ok: false; error: string }> {
  const token = process.env.WHATSAPP_TOKEN;
  const phoneId = process.env.WHATSAPP_PHONE_NUMBER_ID;
  if (!token || !phoneId) return { ok: false, error: "WhatsApp is not configured" };

  const to = toWhatsAppNumber(booking.phone);
  if (!to) return { ok: false, error: `Invalid phone: ${booking.phone}` };

  const lang = booking.lang ?? "en";
  const prefix = process.env.WHATSAPP_TEMPLATE_PREFIX ?? "iberico_review";
  const firstName = booking.name.trim().split(/\s+/)[0] || booking.name;

  const res = await fetch(`https://graph.facebook.com/v21.0/${phoneId}/messages`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      messaging_product: "whatsapp",
      to,
      type: "template",
      template: {
        name: `${prefix}_${lang}`,
        language: { code: lang },
        components: [
          {
            type: "body",
            parameters: [
              { type: "text", text: firstName },
              { type: "text", text: googleReviewUrl(booking.location) },
            ],
          },
        ],
      },
    }),
  });

  if (!res.ok) {
    const detail = await res.text().catch(() => "");
    return { ok: false, error: `${res.status} ${detail.slice(0, 300)}` };
  }
  return { ok: true };
}
