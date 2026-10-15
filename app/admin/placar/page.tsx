import Link from "next/link";
import { createSupabaseAdmin } from "@/lib/supabase";
import AdminNav from "@/components/AdminNav";
import {
  SITUACAO_LABEL,
  formatDataHora,
  type Grupo,
} from "@/lib/dono-do-verao";

export const dynamic = "force-dynamic";

export default async function AdminPlacarPage() {
  const supabase = createSupabaseAdmin();
  const { data, error } = await supabase
    .from("placar_grupos")
    .select("*")
    .order("tamanho", { ascending: false })
    .order("display_order", { ascending: true })
    .order("regiao", { ascending: true });

  const grupos = (data ?? []) as Grupo[];
  const ultima = grupos.reduce<string | null>(
    (max, g) => (!max || g.updated_at > max ? g.updated_at : max),
    null
  );

  return (
    <>
      <AdminNav />
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center justify-between gap-3 mb-2">
          <h1 className="text-2xl font-bold text-white">Placar — Dono do Verão</h1>
          <Link
            href="/admin/placar/nova"
            className="bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors whitespace-nowrap"
          >
            + Novo grupo
          </Link>
        </div>
        <p className="text-gray-400 text-sm mb-1">
          {grupos.length} grupos
          {ultima && <> · última atualização em {formatDataHora(ultima)}</>}
        </p>
        <p className="text-gray-500 text-xs mb-8">
          A página pública atualiza em até 2 minutos após cada salvamento.{" "}
          <Link href="/dono-do-verao" target="_blank" className="text-yellow-500 hover:underline">
            Ver página →
          </Link>
        </p>

        {error && (
          <p className="text-red-400 text-sm mb-4">
            Não foi possível carregar o placar. A tabela placar_grupos já foi criada no Supabase?
          </p>
        )}

        <div className="space-y-3">
          {grupos.map((g) => (
            <Link
              key={g.id}
              href={`/admin/placar/${g.id}`}
              className="flex items-center justify-between gap-4 bg-gray-900 border border-gray-800 hover:border-gray-700 rounded-xl p-4 transition-colors"
            >
              <div>
                <p className="text-white font-semibold">
                  {g.regiao} · {g.moto_modelo} {g.moto_ano}
                </p>
                <p className="text-gray-400 text-xs mt-1">
                  Grupo de {g.tamanho} · {g.cotas_vendidas} vendidas · {g.tamanho - g.cotas_vendidas} restantes
                </p>
              </div>
              <span
                className={`text-xs px-2.5 py-1 rounded-full font-medium whitespace-nowrap ${
                  g.situacao === "aberto"
                    ? "bg-green-500/20 text-green-300"
                    : g.situacao === "em_destaque"
                    ? "bg-yellow-500/20 text-yellow-300"
                    : "bg-gray-700 text-gray-300"
                }`}
              >
                {SITUACAO_LABEL[g.situacao]}
              </span>
            </Link>
          ))}
          {!error && grupos.length === 0 && (
            <p className="text-center py-16 text-gray-500">
              Nenhum grupo cadastrado.{" "}
              <Link href="/admin/placar/nova" className="text-yellow-500 hover:underline">
                Adicionar o primeiro
              </Link>
            </p>
          )}
        </div>
      </main>
    </>
  );
}
