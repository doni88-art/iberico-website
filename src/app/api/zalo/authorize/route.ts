import { NextResponse } from "next/server";
import { createHash, randomBytes } from "node:crypto";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// One-time: open /api/zalo/authorize?key=<CRON_SECRET> while logged in to Zalo
// as the OA admin. PKCE verifier travels in an httpOnly cookie to /callback.
export async function GET(request: Request) {
  const url = new URL(request.url);
  const secret = process.env.CRON_SECRET;
  if (!secret || url.searchParams.get("key") !== secret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const appId = process.env.ZALO_APP_ID;
  const site = process.env.SITE_URL;
  if (!appId || !site) {
    return NextResponse.json({ error: "ZALO_APP_ID / SITE_URL not set" }, { status: 503 });
  }

  const verifier = randomBytes(32).toString("base64url");
  const challenge = createHash("sha256").update(verifier).digest("base64url");
  const state = randomBytes(16).toString("hex");

  const auth = new URL("https://oauth.zaloapp.com/v4/oa/permission");
  auth.searchParams.set("app_id", appId);
  auth.searchParams.set("redirect_uri", `${site}/api/zalo/callback`);
  auth.searchParams.set("code_challenge", challenge);
  auth.searchParams.set("state", state);

  const res = NextResponse.redirect(auth.toString());
  const opts = { httpOnly: true, secure: true, sameSite: "lax" as const, maxAge: 600, path: "/api/zalo" };
  res.cookies.set("zalo_verifier", verifier, opts);
  res.cookies.set("zalo_state", state, opts);
  return res;
}
