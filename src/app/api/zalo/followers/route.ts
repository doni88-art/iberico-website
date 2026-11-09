import { NextResponse } from "next/server";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Lists who has messaged the OA (recorded by /api/zalo/webhook) so their
// user_id can be added to ZALO_NOTIFY_USER_IDS.
export async function GET(request: Request) {
  const secret = process.env.ZALO_SETUP_KEY;
  if (!secret || new URL(request.url).searchParams.get("key") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const { data, error } = await getSupabaseAdmin()
    .from("zalo_inbound")
    .select("created_at, event_name, sender_id, message_text")
    .order("created_at", { ascending: false })
    .limit(20);
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ inbound: data });
}
