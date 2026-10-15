import Link from "next/link";
import AdminNav from "@/components/AdminNav";
import PlacarForm from "@/components/PlacarForm";

export default function NovoGrupoPage() {
  return (
    <>
      <AdminNav />
      <main className="max-w-3xl mx-auto px-4 sm:px-6 py-10">
        <div className="flex items-center gap-3 mb-8">
          <Link href="/admin/placar" className="text-gray-500 hover:text-white text-sm transition-colors">
            ← Placar
          </Link>
          <span className="text-gray-700">/</span>
          <h1 className="text-xl font-bold text-white">Novo grupo</h1>
        </div>
        <PlacarForm />
      </main>
    </>
  );
}
