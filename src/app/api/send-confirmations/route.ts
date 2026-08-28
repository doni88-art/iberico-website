import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin, type Booking } from "@/lib/supabase";
import { buildConfirmationEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const CONFIRMATION_DELAY_MS = 3 * 60 * 1000;
const BATCH_SIZE = 50;

export async function GET(request: Request) {
  // Vercel Cron sends this header automatically when CRON_SECRET is set.
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  const resendKey = process.env.RESEND_API_KEY;
  if (!resendKey) {
    return NextResponse.json({ error: "Resend is not configured" }, { status: 503 });
  }

  const supabase = getSupabaseAdmin();
  // Due 3+ minutes after the booking was *submitted* (not the visit itself —
  // see /api/send-survey-emails for the post-visit satisfaction email). The
  // GitHub Actions cron runs every 10 min, so actual delivery lands ~3-13 min after submit.
  const cutoff = new Date(Date.now() - CONFIRMATION_DELAY_MS).toISOString();

  const { data: due, error } = await supabase
    .from("bookings")
    .select("*")
    .is("confirmation_email_sent_at", null)
    .not("email", "is", null)
    .lte("created_at", cutoff)
    .order("created_at", { ascending: true })
    .limit(BATCH_SIZE);

  if (error) {
    console.error("Failed to fetch due bookings:", error.message);
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }

  const bookings = (due ?? []) as Booking[];
  if (bookings.length === 0) {
    return NextResponse.json({ sent: 0 });
  }

  const resend = new Resend(resendKey);
  const fromAddress = process.env.RESEND_FROM ?? "IBÉRICO <onboarding@resend.dev>";

  let sent = 0;
  const failures: string[] = [];

  for (const booking of bookings) {
    if (!booking.email) continue;
    const { subject, html } = buildConfirmationEmail(booking);
    const { error: sendError } = await resend.emails.send({
      from: fromAddress,
      to: booking.email,
      subject,
      html,
    });

    if (sendError) {
      failures.push(`${booking.id}: ${sendError.message}`);
      continue;
    }

    const { error: updateError } = await supabase
      .from("bookings")
      .update({ confirmation_email_sent_at: new Date().toISOString() })
      .eq("id", booking.id);

    if (updateError) {
      failures.push(`${booking.id} (sent, mark failed): ${updateError.message}`);
      continue;
    }

    sent += 1;
  }

  if (failures.length > 0) {
    console.error("send-confirmations failures:", failures);
    // Return 5xx so the GitHub Actions cron run goes red and we get notified.
    // A silent {sent:0} 200 previously hid a fully-broken sender (e.g. an
    // unverified RESEND_FROM domain) behind a green checkmark for days.
    return NextResponse.json(
      { sent, failed: failures.length, errors: failures },
      { status: 502 }
    );
  }

  return NextResponse.json({ sent, failed: 0 });
}
