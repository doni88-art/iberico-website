import { NextResponse } from "next/server";
import { Resend } from "resend";
import { getSupabaseAdmin, type Booking } from "@/lib/supabase";
import { buildSurveyEmail } from "@/lib/email";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const THREE_HOURS_MS = 3 * 60 * 60 * 1000;
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
  // Due when the visit itself (not the booking submission) was 3+ hours ago.
  const cutoff = new Date(Date.now() - THREE_HOURS_MS).toISOString();

  const { data: due, error } = await supabase
    .from("bookings")
    .select("*")
    .is("survey_email_sent_at", null)
    .not("email", "is", null)
    .lte("reservation_at", cutoff)
    .order("reservation_at", { ascending: true })
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
    const { subject, html } = buildSurveyEmail(booking);
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
      .update({ survey_email_sent_at: new Date().toISOString() })
      .eq("id", booking.id);

    if (updateError) {
      failures.push(`${booking.id} (sent, mark failed): ${updateError.message}`);
      continue;
    }

    sent += 1;
  }

  if (failures.length > 0) {
    console.error("send-survey-emails failures:", failures);
    // Return 5xx so the GitHub Actions cron run goes red and we get notified
    // instead of a broken sender hiding behind a green {sent:0} 200.
    return NextResponse.json(
      { sent, failed: failures.length, errors: failures },
      { status: 502 }
    );
  }

  return NextResponse.json({ sent, failed: 0 });
}
