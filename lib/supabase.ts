import { createClient } from "@supabase/supabase-js";
import { createBrowserClient } from "@supabase/ssr";

// Shared types
export type Lead = {
  id?: string;
  name: string;
  phone: string;
  email?: string;
  message?: string;
  source: string;
  experiencia?: string;
  conhece_cotas?: string;
  created_at?: string;
};

export type Boat = {
  id?: string;
  name: string;
  slug: string;
  type: "lancha" | "jet";
  brand?: string;
  model?: string;
  year?: number;
  length?: string;
  capacity?: string;
  engine?: string;
  power?: string;
  max_speed?: string;
  fuel?: "gasolina" | "diesel" | "flex";
  quota_price?: number;
  quota_available?: number;
  location?: string;
  description?: string;
  images?: string[];
  available?: boolean;
  featured?: boolean;
  display_order?: number;
  active?: boolean;
  created_at?: string;
  updated_at?: string;
};

// Browser client — safe for client components
export function createSupabaseBrowser() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

// Admin client with service role — server only
export function createSupabaseAdmin() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    { auth: { autoRefreshToken: false, persistSession: false } }
  );
}

// Legacy browser client (usado em lib/boats.ts e api/contato)
export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
