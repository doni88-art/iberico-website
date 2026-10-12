import { NextResponse } from "next/server";
import { exchangeAuthCode } from "@/lib/zalo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  const cookies = request.headers.get("cookie") ?? "";
  const get = (n: string) => cookies.match(new RegExp(`(?:^|; )${n}=([^;]*)`))?.[1];
  const verifier = get("zalo_verifier");

  if (!code || !verifier || !state || state !== get("zalo_state")) {
    return NextResponse.json({ error: "Invalid or expired authorization" }, { status: 400 });
  }
  try {
    await exchangeAuthCode(code, verifier, url.searchParams.get("oa_id"));
  } catch (err) {
    console.error("Zalo authorize failed:", err);
    return NextResponse.json({ error: "Token exchange failed" }, { status: 502 });
  }
  return new NextResponse(
    "Zalo OA connected. Next: follow the OA from your personal Zalo, send it any message, then open /api/zalo/followers?key=<CRON_SECRET> to get your user_id.",
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
}
