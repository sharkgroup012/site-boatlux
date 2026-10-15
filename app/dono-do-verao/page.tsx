import { createSupabaseAdmin } from "@/lib/supabase";
import Placar from "@/components/dono-do-verao/Placar";
import type { Grupo } from "@/lib/dono-do-verao";

// Página estática com atualização a cada 2 minutos (não consulta o banco a cada visita).
// Salvar no admin também força a atualização imediata (revalidatePath).
export const revalidate = 120;

async function carregarGrupos(): Promise<Grupo[] | null> {
  const { data, error } = await createSupabaseAdmin()
    .from("placar_grupos")
    .select("id, regiao, moto_modelo, moto_ano, tamanho, cotas_vendidas, situacao, display_order, updated_at");
  if (error) return null;
  return data as Grupo[];
}

export default async function DonoDoVeraoPage() {
  const grupos = await carregarGrupos();
  return <Placar grupos={grupos} />;
}
