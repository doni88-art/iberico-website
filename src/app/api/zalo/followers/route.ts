import { NextResponse } from "next/server";
import { listFollowers, listRecentChats } from "@/lib/zalo";
import { getSupabaseAdmin } from "@/lib/supabase";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.ZALO_SETUP_KEY;
  if (!secret || new URL(request.url).searchParams.get("key") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    const [followers, recent] = await Promise.all([listFollowers(), listRecentChats()]);
    const { data: inbound } = await getSupabaseAdmin()
      .from("zalo_inbound")
      .select("created_at, event_name, sender_id, message_text")
      .order("created_at", { ascending: false })
      .limit(20);
    return NextResponse.json({ inbound, followers, recent });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 502 });
  }
}
