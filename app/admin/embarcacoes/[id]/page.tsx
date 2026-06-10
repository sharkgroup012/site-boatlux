import { createSupabaseAdmin } from "@/lib/supabase";
import AdminNav from "@/components/AdminNav";
import BoatForm from "@/components/BoatForm";
import Link from "next/link";
import { notFound } from "next/navigation";

type Props = { params: Promise<{ id: string }> };

export default async function EditarEmbarcacaoPage({ params }: Props) {
  const { id } = await params;
  const supabase = createSupabaseAdmin();
  const { data: boat } = await supabase.from("boats").select("*").eq("id", id).single();

  if (!boat) notFound();

  return (
    <>
      <AdminNav />
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin/embarcacoes" className="text-gray-500 hover:text-white text-sm transition-colors">
            ← Embarcações
          </Link>
          <span className="text-gray-700">/</span>
          <h1 className="text-xl font-bold text-white">{boat.name}</h1>
        </div>
        <BoatForm initialData={boat} boatId={id} />
      </main>
    </>
  );
}
