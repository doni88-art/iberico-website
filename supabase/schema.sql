-- IBÉRICO website — bookings table
-- Run this once in the Supabase SQL editor (Dashboard → SQL Editor → New query).

create extension if not exists "pgcrypto";

create table if not exists bookings (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  name text not null,
  phone text not null,
  email text,
  party_size int not null default 2,
  booking_date date not null,
  booking_time text not null,
  -- booking_date + booking_time combined into a real timestamp (Asia/Ho_Chi_Minh,
  -- UTC+7) at insert time — this is what "3 hours after the visit" is measured from.
  reservation_at timestamptz not null,
  location text not null,
  notes text,
  channel text not null check (channel in ('whatsapp', 'zalo')),
  lang text not null default 'en',
  -- Sent ~10-15 min after created_at: "thanks, we've got your request" confirmation.
  confirmation_email_sent_at timestamptz,
  -- Sent 3h after reservation_at: post-visit satisfaction survey.
  survey_email_sent_at timestamptz
);

-- Speeds up the cron's "find bookings due for their confirmation email" query.
create index if not exists bookings_pending_confirmation_idx
  on bookings (created_at)
  where confirmation_email_sent_at is null;

-- Speeds up the cron's "find visits due for their satisfaction-survey email" query.
create index if not exists bookings_pending_survey_idx
  on bookings (reservation_at)
  where survey_email_sent_at is null;

-- Every booking is keyed on phone (and optionally email), which is enough to
-- later roll these rows up into a loyalty program (visit counts, spend, etc.)
-- without changing this table — no separate customer table needed yet.
create index if not exists bookings_phone_idx on bookings (phone);

-- Row Level Security is on with no policies: only the service_role key
-- (used server-side in the API routes) can read or write this table.
-- The anon/public key the browser would otherwise use has no access at all.
alter table bookings enable row level security;
