import Link from "next/link";
import { notFound } from "next/navigation";
import { createSupabaseAdmin } from "@/lib/supabase";
import AdminNav from "@/components/AdminNav";
import PlacarForm from "@/components/PlacarForm";
import type { Grupo } from "@/lib/dono-do-verao";

export const dynamic = "force-dynamic";

type Props = { params: Promise<{ id: string }> };

export default async function EditarGrupoPage({ params }: Props) {
  const { id } = await params;
  const supabase = createSupabaseAdmin();
  const { data } = await supabase.from("placar_grupos").select("*").eq("id", id).maybeSingle();

  if (!data) notFound();
  const grupo = data as Grupo;

  return (
    <>
      <AdminNav />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin/placar" className="text-gray-500 hover:text-white text-sm transition-colors">
            ← Placar
          </Link>
          <span className="text-gray-700">/</span>
          <h1 className="text-xl font-bold text-white">
            {grupo.regiao} · {grupo.moto_modelo} {grupo.moto_ano}
          </h1>
        </div>
        <PlacarForm grupo={grupo} />
      </main>
    </>
  );
}
