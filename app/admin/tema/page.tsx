import Link from "next/link";
import AdminNav from "@/components/AdminNav";
import TemaForm from "@/components/TemaForm";
import { getCotasTema } from "@/lib/site-config";

export const dynamic = "force-dynamic";

export default async function AdminTemaPage() {
  const atual = await getCotasTema();

  return (
    <>
      <AdminNav />
      <main className="max-w-2xl mx-auto px-4 sm:px-6 py-10">
        <h1 className="text-2xl font-bold text-white mb-2">Tema — Cotas Disponíveis</h1>
        <p className="text-gray-400 text-sm mb-8">
          Escolha o visual da página de cotas. A troca vale na hora e pode ser desfeita quando quiser.{" "}
          <Link href="/cotas" target="_blank" className="text-yellow-500 hover:underline">
            Ver página →
          </Link>
        </p>
        <TemaForm atual={atual} />
      </main>
    </>
  );
}
