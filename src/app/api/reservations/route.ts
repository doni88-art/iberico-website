import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin, type Booking } from "@/lib/supabase";
import { buildConfirmationEmail } from "@/lib/email";

export const runtime = "nodejs";

type ReservationPayload = {
  name?: string;
  phone?: string;
  email?: string;
  guests?: string | number;
  date?: string;
  time?: string;
  location?: string;
  notes?: string;
  channel?: string;
  lang?: string;
};

const REQUIRED: (keyof ReservationPayload)[] = [
  "name",
  "phone",
  "date",
  "time",
  "location",
];

async function sendConfirmationNow(
  supabase: ReturnType<typeof getSupabaseAdmin>,
  booking: Booking
) {
  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) return;

  try {
    const resend = new Resend(resendKey);
    const fromAddress = process.env.RESEND_FROM ?? "IBÉRICO <onboarding@resend.dev>";
    const { subject, html } = buildConfirmationEmail(booking);
    const { error: sendError } = await resend.emails.send({
      from: fromAddress,
      to: booking.email as string,
      subject,
      html,
    });

    if (sendError) {
      console.error("Immediate confirmation send failed, cron will retry:", sendError.message);
      return;
    }

    const { error: updateError } = await supabase
      .from("bookings")
      .update({ confirmation_email_sent_at: new Date().toISOString() })
      .eq("id", booking.id);

    if (updateError) {
      console.error("Confirmation sent but failed to mark as sent:", updateError.message);
    }
  } catch (err) {
    console.error("Immediate confirmation send threw, cron will retry:", err);
  }
}

export async function POST(request: Request) {
  let body: ReservationPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  for (const field of REQUIRED) {
    if (!body[field] || String(body[field]).trim() === "") {
      return NextResponse.json(
        { error: `Missing required field: ${field}` },
        { status: 400 }
      );
    }
  }

  const channel = body.channel === "zalo" ? "zalo" : "whatsapp";
  const lang = ["en", "vi", "es"].includes(body.lang ?? "") ? body.lang : "en";
  const partySize = Number(body.guests) > 0 ? Number(body.guests) : 2;

  // Vietnam is a fixed UTC+7 offset (no DST), so this is safe without a
  // timezone library — this timestamp is what "3 hours after the visit" is
  // measured from, so it must reflect the restaurant's local time, not the
  // server's.
  const reservationAt = new Date(`${body.date}T${body.time}:00+07:00`);
  if (Number.isNaN(reservationAt.getTime())) {
    return NextResponse.json({ error: "Invalid date/time" }, { status: 400 });
  }

  try {
    const supabase = getSupabaseAdmin();
    const { data: inserted, error } = await supabase
      .from("bookings")
      .insert({
        name: body.name,
        phone: body.phone,
        email: body.email || null,
        party_size: partySize,
        booking_date: body.date,
        booking_time: body.time,
        reservation_at: reservationAt.toISOString(),
        location: body.location,
        notes: body.notes || null,
        channel,
        lang,
      })
      .select()
      .single();

    if (error || !inserted) {
      console.error("Failed to save booking:", error?.message);
      return NextResponse.json({ error: "Could not save booking" }, { status: 500 });
    }

    // Send the confirmation right away instead of waiting on the cron sweep
    // in /api/send-confirmations — that cron (GitHub Actions schedule) isn't
    // guaranteed to fire on time, sometimes lagging an hour or more. It's
    // left in place as a retry safety net: it only picks up bookings where
    // confirmation_email_sent_at is still null, which is exactly what happens
    // here if this immediate send fails.
    if (inserted.email) {
      await sendConfirmationNow(supabase, inserted as Booking);
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Reservation route error:", err);
    return NextResponse.json({ error: "Server not configured" }, { status: 503 });
  }
}
