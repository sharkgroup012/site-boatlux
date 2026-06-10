import AdminNav from "@/components/AdminNav";
import BoatForm from "@/components/BoatForm";
import Link from "next/link";

export default function NovaEmbarcacaoPage() {
  return (
    <>
      <AdminNav />
      <main className="max-w-4xl mx-auto px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin/embarcacoes" className="text-gray-500 hover:text-white text-sm transition-colors">
            ← Embarcações
          </Link>
          <span className="text-gray-700">/</span>
          <h1 className="text-xl font-bold text-white">Nova embarcação</h1>
        </div>
        <BoatForm />
      </main>
    </>
  );
}
