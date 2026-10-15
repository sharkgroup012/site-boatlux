// Configuração e regras da página /dono-do-verao e do admin "Placar".

// Número do WhatsApp da campanha (formato internacional, só dígitos).
// ÚNICO lugar para trocar: variável NEXT_PUBLIC_DV_WHATSAPP_NUMBER na Vercel
// (ou o valor padrão abaixo). Provisório: o número atual do site.
export const DV_WHATSAPP_NUMBER =
  process.env.NEXT_PUBLIC_DV_WHATSAPP_NUMBER || "5512991198268";

export const DV_DEFAULT_REF = "DV-SITE";

export const REGIOES = [
  "São Sebastião",
  "Ubatuba",
  "Barra do Una",
  "Boiçucanga",
  "Ilhabela",
] as const;
export type Regiao = (typeof REGIOES)[number];

export const TAMANHOS = [8, 6] as const;
export type Tamanho = (typeof TAMANHOS)[number];

export const SITUACOES = ["aberto", "em_destaque", "fechado"] as const;
export type Situacao = (typeof SITUACOES)[number];

export const SITUACAO_LABEL: Record<Situacao, string> = {
  aberto: "Aberto",
  em_destaque: "Em destaque",
  fechado: "Fechado",
};

export type Grupo = {
  id: string;
  regiao: Regiao;
  moto_modelo: string;
  moto_ano: number;
  tamanho: Tamanho;
  cotas_vendidas: number;
  situacao: Situacao;
  display_order: number;
  updated_at: string;
};

export type GrupoInput = {
  regiao: string;
  moto_modelo: string;
  moto_ano: number;
  tamanho: number;
  cotas_vendidas: number;
  situacao: string;
  display_order: number;
};

/** Valida a entrada do admin. Retorna a mensagem de erro, ou null se válido. */
export function validarGrupo(g: GrupoInput): string | null {
  if (!(REGIOES as readonly string[]).includes(g.regiao)) return "Região inválida.";
  const modelo = (g.moto_modelo ?? "").trim();
  if (modelo.length < 2 || modelo.length > 60) return "Informe o modelo da moto (2 a 60 caracteres).";
  if (!Number.isInteger(g.moto_ano) || g.moto_ano < 2020 || g.moto_ano > 2035) return "Ano da moto inválido.";
  if (!(TAMANHOS as readonly number[]).includes(g.tamanho)) return "Tamanho do grupo deve ser 8 ou 6.";
  if (!Number.isInteger(g.cotas_vendidas) || g.cotas_vendidas < 0 || g.cotas_vendidas > g.tamanho)
    return `Cotas vendidas deve ser um número de 0 a ${g.tamanho}.`;
  if (!(SITUACOES as readonly string[]).includes(g.situacao)) return "Situação inválida.";
  if (!Number.isInteger(g.display_order)) return "Ordem inválida.";
  return null;
}

/** Código de origem vindo de ?ref=. Só letras, números, hífen e underscore. */
export function sanitizeRef(raw: string | null | undefined): string {
  const v = (raw ?? "").trim().toUpperCase();
  return /^[A-Z0-9_-]{1,24}$/.test(v) ? v : DV_DEFAULT_REF;
}

export function buildWhatsAppHref(ref: string, grupo?: string): string {
  const base = grupo
    ? `Olá! Vim pela página Dono do Verão e quero saber mais sobre o grupo: ${grupo}.`
    : "Olá! Vim pela página Dono do Verão e quero saber mais sobre as cotas.";
  const text = `${base} (ref: ${ref})`;
  return `https://wa.me/${DV_WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
}

// ─── Tabela de preços (igual para todos os anos de moto) ──────────────────────────
export type Condicao = {
  label: string;
  entrada?: number;
  parcelas?: number;
  valorParcela?: number;
  total: number;
};

export const PRECOS: Record<Tamanho, Condicao[]> = {
  8: [
    { label: "À vista", total: 25990 },
    { label: "50% de entrada + 6x", entrada: 13650, parcelas: 6, valorParcela: 2275, total: 27300 },
    { label: "50% de entrada + 10x", entrada: 14100, parcelas: 10, valorParcela: 1410, total: 28200 },
    { label: "Entrada + 24x", entrada: 10000, parcelas: 24, valorParcela: 933.33, total: 32400 },
  ],
  6: [
    { label: "À vista", total: 34600 },
    { label: "Entrada + 6x", entrada: 18200, parcelas: 6, valorParcela: 3033.33, total: 36400 },
    { label: "Entrada + 10x", entrada: 18750, parcelas: 10, valorParcela: 1875, total: 37500 },
    { label: "Entrada + 24x", entrada: 10000, parcelas: 24, valorParcela: 1437.5, total: 44500 },
  ],
};

export function formatBRL(v: number): string {
  const inteiro = Number.isInteger(v);
  return v.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: inteiro ? 0 : 2,
    maximumFractionDigits: 2,
  });
}

export function formatDataHora(iso: string): string {
  const d = new Date(iso);
  const data = d.toLocaleDateString("pt-BR", { timeZone: "America/Sao_Paulo" });
  const hora = d.toLocaleTimeString("pt-BR", {
    timeZone: "America/Sao_Paulo",
    hour: "2-digit",
    minute: "2-digit",
  });
  return `${data} às ${hora}`;
}
