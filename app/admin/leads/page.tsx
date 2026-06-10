import { createSupabaseAdmin } from "@/lib/supabase";
import AdminNav from "@/components/AdminNav";

export const dynamic = "force-dynamic";

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default async function LeadsPage() {
  const supabase = createSupabaseAdmin();
  const { data: leads, error } = await supabase
    .from("leads")
    .select("*")
    .order("created_at", { ascending: false });

  return (
    <>
      <AdminNav />
      <main className="max-w-7xl mx-auto px-6 py-10">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Leads</h1>
            <p className="text-gray-400 text-sm mt-1">
              {leads?.length ?? 0} leads capturados
            </p>
          </div>
        </div>

        {error && (
          <p className="text-red-400 text-sm mb-4">Erro ao carregar leads: {error.message}</p>
        )}

        <div className="bg-gray-900 border border-gray-800 rounded-2xl overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-800">
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Nome</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Telefone</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Email</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Mensagem</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Origem</th>
                <th className="text-left px-6 py-4 text-gray-400 font-medium">Data</th>
              </tr>
            </thead>
            <tbody>
              {leads && leads.length > 0 ? (
                leads.map((lead, i) => (
                  <tr
                    key={lead.id}
                    className={`border-b border-gray-800/50 hover:bg-gray-800/30 transition-colors ${
                      i === 0 ? "bg-yellow-500/5" : ""
                    }`}
                  >
                    <td className="px-6 py-4 text-white font-medium">{lead.name}</td>
                    <td className="px-6 py-4">
                      <a
                        href={`https://wa.me/55${lead.phone.replace(/\D/g, "")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-yellow-400 hover:text-yellow-300 transition-colors"
                      >
                        {lead.phone}
                      </a>
                    </td>
                    <td className="px-6 py-4 text-gray-300">
                      {lead.email ? (
                        <a href={`mailto:${lead.email}`} className="hover:text-white transition-colors">
                          {lead.email}
                        </a>
                      ) : (
                        <span className="text-gray-600">-</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-400 max-w-xs truncate">
                      {lead.message || <span className="text-gray-600">-</span>}
                    </td>
                    <td className="px-6 py-4">
                      <span className="bg-gray-800 text-gray-300 text-xs px-2.5 py-1 rounded-full">
                        {lead.source}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-400 whitespace-nowrap">
                      {formatDate(lead.created_at)}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-gray-500">
                    Nenhum lead ainda.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </main>
    </>
  );
}
