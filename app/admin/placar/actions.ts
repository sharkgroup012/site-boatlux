"use server";

import { revalidatePath } from "next/cache";
import { createSupabaseServer } from "@/lib/supabase-server";
import { createSupabaseAdmin } from "@/lib/supabase";
import { validarGrupo, type GrupoInput } from "@/lib/dono-do-verao";

async function usuarioLogado(): Promise<boolean> {
  const supabase = await createSupabaseServer();
  const { data } = await supabase.auth.getUser();
  return !!data.user;
}

function atualizarPaginaPublica() {
  revalidatePath("/dono-do-verao");
  revalidatePath("/admin/placar");
}

export async function salvarGrupo(
  id: string | null,
  input: GrupoInput
): Promise<{ error?: string }> {
  if (!(await usuarioLogado())) return { error: "Sessão expirada. Entre novamente." };

  const erro = validarGrupo(input);
  if (erro) return { error: erro };

  const payload = {
    regiao: input.regiao,
    moto_modelo: input.moto_modelo.trim(),
    moto_ano: input.moto_ano,
    tamanho: input.tamanho,
    cotas_vendidas: input.cotas_vendidas,
    situacao: input.situacao,
    display_order: input.display_order,
    updated_at: new Date().toISOString(),
  };

  const supabase = createSupabaseAdmin();
  const { error } = id
    ? await supabase.from("placar_grupos").update(payload).eq("id", id)
    : await supabase.from("placar_grupos").insert(payload);

  if (error) return { error: "Não foi possível salvar. Tente novamente." };

  atualizarPaginaPublica();
  return {};
}

export async function excluirGrupo(id: string): Promise<{ error?: string }> {
  if (!(await usuarioLogado())) return { error: "Sessão expirada. Entre novamente." };

  const supabase = createSupabaseAdmin();
  const { error } = await supabase.from("placar_grupos").delete().eq("id", id);
  if (error) return { error: "Não foi possível excluir. Tente novamente." };

  atualizarPaginaPublica();
  return {};
}
