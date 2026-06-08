import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Lead = {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source: string;
  created_at?: string;
};

/* SQL schema to run in Supabase:

create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  email text,
  message text,
  source text default 'website',
  created_at timestamptz default now()
);

alter table leads enable row level security;

create policy "Service role can manage leads"
  on leads for all
  using (auth.role() = 'service_role');
*/
