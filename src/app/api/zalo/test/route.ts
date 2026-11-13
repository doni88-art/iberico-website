import { NextResponse } from "next/server";
import { getAccessToken } from "@/lib/zalo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Sends a test message to ZALO_NOTIFY_USER_IDS and returns Zalo's raw reply.
export async function GET(request: Request) {
  const secret = process.env.ZALO_SETUP_KEY;
  if (!secret || new URL(request.url).searchParams.get("key") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const ids = (process.env.ZALO_NOTIFY_USER_IDS ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  try {
    const token = await getAccessToken();
    const results = [];
    for (const id of ids) {
      const res = await fetch("https://openapi.zalo.me/v3.0/oa/message/cs", {
        method: "POST",
        headers: { "Content-Type": "application/json", access_token: token },
        body: JSON.stringify({
          recipient: { user_id: id },
          message: { text: "Test from weareiberico.com: Zalo booking alerts are working." },
        }),
      });
      results.push({ id, status: res.status, body: await res.json() });
    }
    return NextResponse.json({ ids, results });
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 502 });
  }
}
