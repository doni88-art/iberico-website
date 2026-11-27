import { NextResponse } from "next/server";
import { getSupabaseAdmin, type Booking } from "@/lib/supabase";
import { sendReviewWhatsApp, whatsappConfigured } from "@/lib/whatsapp";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const THREE_HOURS_MS = 3 * 60 * 60 * 1000;
// Don't message guests about visits more than a day old (e.g. after the
// feature is first switched on, or after a long outage).
const MAX_AGE_MS = 24 * 60 * 60 * 1000;
const BATCH_SIZE = 50;

export async function GET(request: Request) {
  const secret = process.env.CRON_SECRET;
  if (secret) {
    const auth = request.headers.get("authorization");
    if (auth !== `Bearer ${secret}`) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
  }

  // Not set up yet: succeed quietly so the cron stays green.
  if (!whatsappConfigured()) {
    return NextResponse.json({ sent: 0, skipped: "WhatsApp not configured" });
  }

  const supabase = getSupabaseAdmin();
  const now = Date.now();
  const { data: due, error } = await supabase
    .from("bookings")
    .select("*")
    .is("whatsapp_review_sent_at", null)
    .eq("channel", "whatsapp")
    .lte("reservation_at", new Date(now - THREE_HOURS_MS).toISOString())
    .gte("reservation_at", new Date(now - MAX_AGE_MS).toISOString())
    .order("reservation_at", { ascending: true })
    .limit(BATCH_SIZE);

  if (error) {
    console.error("Failed to fetch due WhatsApp reviews:", error.message);
    return NextResponse.json({ error: "Query failed" }, { status: 500 });
  }

  let sent = 0;
  const failures: string[] = [];

  for (const booking of (due ?? []) as Booking[]) {
    const result = await sendReviewWhatsApp(booking);
    if (!result.ok) {
      failures.push(`${booking.id}: ${result.error}`);
      continue;
    }
    const { error: updateError } = await supabase
      .from("bookings")
      .update({ whatsapp_review_sent_at: new Date().toISOString() })
      .eq("id", booking.id);
    if (updateError) {
      failures.push(`${booking.id} (sent, mark failed): ${updateError.message}`);
      continue;
    }
    sent += 1;
  }

  if (failures.length > 0) {
    console.error("send-whatsapp-reviews failures:", failures);
    return NextResponse.json({ sent, failed: failures.length, errors: failures }, { status: 502 });
  }
  return NextResponse.json({ sent, failed: 0 });
}
