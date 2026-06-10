import { createClient } from "@supabase/supabase-js";
import type { Boat as SupabaseBoat } from "./supabase";

// Legacy type used by existing pages
export type Boat = {
  slug: string;
  name: string;
  type: "lancha" | "jet";
  location: string;
  specs: {
    comprimento?: string;
    motor?: string;
    capacidade?: string;
    ano?: string;
    potencia?: string;
  };
  description: string;
  images: string[];
  featured: boolean;
  available: boolean;
  id?: string;
};

function mapBoat(b: SupabaseBoat): Boat {
  return {
    id: b.id,
    slug: b.slug,
    name: b.name,
    type: b.type,
    location: b.location ?? "",
    description: b.description ?? "",
    images: b.images ?? [],
    featured: b.featured ?? false,
    available: b.available ?? true,
    specs: {
      comprimento: b.length ?? undefined,
      motor: b.engine ?? undefined,
      capacidade: b.capacity ?? undefined,
      ano: b.year ? String(b.year) : undefined,
      potencia: b.power ?? undefined,
    },
  };
}

function getSupabaseClient() {
  return createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}

export async function getAllBoats(): Promise<Boat[]> {
  const { data, error } = await getSupabaseClient()
    .from("boats")
    .select("*")
    .eq("active", true)
    .order("display_order", { ascending: true });

  if (error || !data) return [];
  return data.map(mapBoat);
}

export async function getFeaturedBoats(): Promise<Boat[]> {
  const { data, error } = await getSupabaseClient()
    .from("boats")
    .select("*")
    .eq("active", true)
    .eq("featured", true)
    .order("display_order", { ascending: true });

  if (error || !data) return [];
  return data.map(mapBoat);
}

export async function getBoatBySlug(slug: string): Promise<Boat | null> {
  const { data, error } = await getSupabaseClient()
    .from("boats")
    .select("*")
    .eq("slug", slug)
    .eq("active", true)
    .single();

  if (error || !data) return null;
  return mapBoat(data);
}

export async function getBoatSlugs(): Promise<string[]> {
  const { data, error } = await getSupabaseClient()
    .from("boats")
    .select("slug")
    .eq("active", true);

  if (error || !data) return [];
  return data.map((b: { slug: string }) => b.slug);
}
