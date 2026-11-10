"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServer } from "@/lib/supabase-server";
import { createSupabaseAdmin } from "@/lib/supabase";
import { ehCotasTema } from "@/lib/site-config";

export async function salvarCotasTema(tema: string): Promise<{ error?: string }> {
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();
  if (!data.user) return { error: "Sessão expirada. Entre novamente." };

  if (!ehCotasTema(tema)) return { error: "Tema inválido." };

  const { error } = await createSupabaseAdmin()
    .from("site_config")
    .upsert({ chave: "cotas_tema", valor: tema, updated_at: new Date().toISOString() });

  if (error) return { error: "Não foi possível salvar. A tabela site_config já foi criada no Supabase?" };

  revalidatePath("/cotas");
  revalidatePath("/admin/tema");
  return {};
}
