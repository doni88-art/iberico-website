import { NextResponse } from "next/server";
import { listFollowers } from "@/lib/zalo";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET(request: Request) {
  const secret = process.env.ZALO_SETUP_KEY;
  if (!secret || new URL(request.url).searchParams.get("key") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  try {
    return NextResponse.json(await listFollowers());
  } catch (err) {
    return NextResponse.json({ error: String(err) }, { status: 502 });
  }
}
