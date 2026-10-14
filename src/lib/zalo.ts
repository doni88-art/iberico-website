import { getSupabaseAdmin, type Booking } from "@/lib/supabase";

const OAUTH_TOKEN_URL = "https://oauth.zaloapp.com/v4/oa/access_token";
const OA_API = "https://openapi.zalo.me/v3.0/oa";

type TokenResponse = {
  access_token?: string;
  refresh_token?: string;
  expires_in?: string | number;
  error?: number;
  error_name?: string;
  error_reason?: string;
};

function appCreds() {
  const appId = process.env.ZALO_APP_ID;
  const secret = process.env.ZALO_APP_SECRET;
  if (!appId || !secret) throw new Error("ZALO_APP_ID / ZALO_APP_SECRET not set");
  return { appId, secret };
}

async function requestTokens(params: Record<string, string>): Promise<TokenResponse> {
  const { appId, secret } = appCreds();
  const res = await fetch(OAUTH_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded", secret_key: secret },
    body: new URLSearchParams({ app_id: appId, ...params }),
  });
  return (await res.json()) as TokenResponse;
}

async function saveTokens(t: TokenResponse, oaId?: string | null) {
  if (!t.access_token || !t.refresh_token) {
    throw new Error(`Zalo token error: ${t.error_name ?? ""} ${t.error_reason ?? JSON.stringify(t)}`);
  }
  const expiresAt = new Date(Date.now() + Number(t.expires_in ?? 3600) * 1000).toISOString();
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("zalo_oa_tokens").upsert({
    id: 1,
    ...(oaId ? { oa_id: oaId } : {}),
    access_token: t.access_token,
    refresh_token: t.refresh_token,
    expires_at: expiresAt,
    updated_at: new Date().toISOString(),
  });
  if (error) throw new Error(`Could not store Zalo tokens: ${error.message}`);
  return t.access_token;
}

export async function exchangeAuthCode(code: string, codeVerifier: string, oaId?: string | null) {
  const t = await requestTokens({ code, grant_type: "authorization_code", code_verifier: codeVerifier });
  return saveTokens(t, oaId);
}

// Refresh tokens are single-use, so a refreshed pair is persisted immediately.
export async function getAccessToken(): Promise<string> {
  const supabase = getSupabaseAdmin();
  const { data, error } = await supabase.from("zalo_oa_tokens").select("*").eq("id", 1).maybeSingle();
  if (error || !data) throw new Error("Zalo OA not authorized yet — visit /api/zalo/authorize");
  if (new Date(data.expires_at).getTime() - Date.now() > 60_000) return data.access_token as string;
  const t = await requestTokens({ refresh_token: data.refresh_token, grant_type: "refresh_token" });
  return saveTokens(t);
}

export async function listFollowers(count = 50) {
  const token = await getAccessToken();
  const res = await fetch(
    `https://openapi.zalo.me/v2.0/oa/getfollowers?data=${encodeURIComponent(
      JSON.stringify({ offset: 0, count })
    )}`,
    { headers: { access_token: token } }
  );
  return res.json();
}

export async function listRecentChats(count = 10) {
  const token = await getAccessToken();
  const res = await fetch(
    `https://openapi.zalo.me/v2.0/oa/listrecentchat?data=${encodeURIComponent(
      JSON.stringify({ offset: 0, count })
    )}`,
    { headers: { access_token: token } }
  );
  return res.json();
}

async function sendText(userId: string, text: string) {
  const token = await getAccessToken();
  const res = await fetch(`${OA_API}/message/cs`, {
    method: "POST",
    headers: { "Content-Type": "application/json", access_token: token },
    body: JSON.stringify({ recipient: { user_id: userId }, message: { text } }),
  });
  const json = (await res.json()) as { error?: number; message?: string };
  if (json.error) throw new Error(`Zalo send failed (${json.error}): ${json.message}`);
}

// Mirrors buildMessageLines() in components/Reservation.tsx (the WhatsApp text).
export function bookingText(b: Booking) {
  return [
    `Hi IBÉRICO! I'd like to reserve a table.`,
    `Name: ${b.name}`,
    `Phone: ${b.phone}`,
    b.email ? `Email: ${b.email}` : null,
    `Date: ${b.booking_date}`,
    `Time: ${b.booking_time}`,
    `Guests: ${b.party_size}`,
    `Location: ${b.location}`,
    b.notes ? `Notes: ${b.notes}` : null,
  ]
    .filter(Boolean)
    .join("\n");
}

// Never throws: a Zalo hiccup must not fail the booking itself.
export async function notifyBookingOnZalo(b: Booking) {
  const ids = (process.env.ZALO_NOTIFY_USER_IDS ?? "").split(",").map((s) => s.trim()).filter(Boolean);
  if (!ids.length || !process.env.ZALO_APP_ID) return;
  const text = bookingText(b);
  await Promise.all(
    ids.map((id) =>
      sendText(id, text).catch((err) => console.error("Zalo notify failed:", id, err))
    )
  );
}
