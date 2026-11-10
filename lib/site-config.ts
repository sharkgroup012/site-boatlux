import { createSupabaseAdmin } from "@/lib/supabase";

export const COTAS_TEMAS = ["padrao", "black-november"] as const;
export type CotasTema = (typeof COTAS_TEMAS)[number];

export const COTAS_TEMA_LABEL: Record<CotasTema, string> = {
  padrao: "Padrão",
  "black-november": "Black November",
};

export function ehCotasTema(v: unknown): v is CotasTema {
  return typeof v === "string" && (COTAS_TEMAS as readonly string[]).includes(v);
}

// Qualquer falha (tabela inexistente, rede) cai no tema padrão: o site nunca quebra por causa do tema.
export async function getCotasTema(): Promise<CotasTema> {
  try {
    const { data } = await createSupabaseAdmin()
      .from("site_config")
      .select("valor")
      .eq("chave", "cotas_tema")
      .maybeSingle();
    return ehCotasTema(data?.valor) ? data.valor : "padrao";
  } catch {
    return "padrao";
  }
}
