import { createClient } from "@supabase/supabase-js";

// Server-only client — uses the service_role key, which bypasses Row Level
// Security. Never import this file from a "use client" component.
export function getSupabaseAdmin() {
  const url = process.env.SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error(
      "Supabase is not configured — set SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY."
    );
  }
  return createClient(url, key, {
    auth: { persistSession: false },
  });
}

export type Booking = {
  id: string;
  created_at: string;
  name: string;
  phone: string;
  email: string | null;
  party_size: number;
  booking_date: string;
  booking_time: string;
  reservation_at: string;
  location: string;
  notes: string | null;
  channel: "whatsapp" | "zalo";
  lang: "en" | "vi" | "es";
  confirmation_email_sent_at: string | null;
  survey_email_sent_at: string | null;
};
