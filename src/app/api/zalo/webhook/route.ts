import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Zalo posts OA events here. We only record who messaged the OA, so their
// user_id can be added to ZALO_NOTIFY_USER_IDS (the OA API hides it from
// non-Vietnam server IPs).
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const senderId = body?.sender?.id ?? body?.user_id_by_app ?? null;
    if (senderId) {
      await getSupabaseAdmin().from("zalo_inbound").insert({
        event_name: body.event_name ?? null,
        sender_id: String(senderId),
        message_text: body?.message?.text ?? null,
      });
    }
  } catch (err) {
    console.error("Zalo webhook error:", err);
  }
  return NextResponse.json({ ok: true });
}

export async function GET() {
  return NextResponse.json({ ok: true });
}
