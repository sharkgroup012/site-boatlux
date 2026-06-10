import { createSupabaseAdmin } from "@/lib/supabase";
import AdminNav from "@/components/AdminNav";
import Link from "next/link";
import type { Boat } from "@/lib/supabase";

export const dynamic = "force-dynamic";

export default async function AdminEmbarcacoesPage() {
  const supabase = createSupabaseAdmin();
  const { data: boats, error } = await supabase
    .from("boats")
    .select("*")
    .order("display_order", { ascending: true });

  return (
    <>
      <AdminNav />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Embarcações</h1>
            <p className="text-gray-400 text-sm mt-1">
              {boats?.length ?? 0} embarcações cadastradas
            </p>
          </div>
          <Link
            href="/admin/embarcacoes/nova"
            className="bg-yellow-500 hover:bg-yellow-400 text-gray-950 font-semibold px-5 py-2.5 rounded-lg text-sm transition-colors"
          >
            + Nova embarcação
          </Link>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-4">Erro: {error.message}</p>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {boats && boats.length > 0 ? (
            boats.map((boat: Boat) => (
              <div
                key={boat.id}
                className="bg-gray-900 border border-gray-800 rounded-xl p-5 hover:border-gray-700 transition-colors"
              >
                {boat.images && boat.images[0] && (
                  <div
                    className="h-40 rounded-lg mb-4 bg-cover bg-center"
                    style={{ backgroundImage: `url(${boat.images[0]})` }}
                  />
                )}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="text-white font-semibold">{boat.name}</h3>
                    <p className="text-gray-400 text-xs mt-0.5">{boat.location}</p>
                  </div>
                  <div className="flex flex-col gap-1 items-end">
                    <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                      boat.type === "lancha"
                        ? "bg-blue-500/20 text-blue-300"
                        : "bg-purple-500/20 text-purple-300"
                    }`}>
                      {boat.type === "lancha" ? "Lancha" : "Jet Ski"}
                    </span>
                    {!boat.active && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-red-500/20 text-red-300">
                        Inativo
                      </span>
                    )}
                    {boat.featured && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-yellow-500/20 text-yellow-300">
                        Destaque
                      </span>
                    )}
                  </div>
                </div>
                <div className="flex gap-2 pt-3 border-t border-gray-800">
                  <Link
                    href={`/admin/embarcacoes/${boat.id}`}
                    className="flex-1 text-center bg-gray-800 hover:bg-gray-700 text-white text-xs font-medium py-2 rounded-lg transition-colors"
                  >
                    Editar
                  </Link>
                  <Link
                    href={`/embarcacoes/${boat.slug}`}
                    target="_blank"
                    className="flex-1 text-center border border-gray-700 hover:border-gray-600 text-gray-400 hover:text-white text-xs font-medium py-2 rounded-lg transition-colors"
                  >
                    Ver no site →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-20 text-gray-500">
              Nenhuma embarcação cadastrada.{" "}
              <Link href="/admin/embarcacoes/nova" className="text-yellow-500 hover:underline">
                Adicionar a primeira
              </Link>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
