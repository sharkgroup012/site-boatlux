import {
  PRECOS,
  SITUACAO_LABEL,
  formatBRL,
  formatDataHora,
  type Condicao,
  type Grupo,
  type Tamanho,
} from "@/lib/dono-do-verao";
import DvWhatsAppButton from "./DvWhatsAppButton";

type Props = {
  /** null = não foi possível ler o placar (não mostramos número nenhum). */
  grupos: Grupo[] | null;
};

export default function Placar({ grupos }: Props) {
  const ordenados = [...(grupos ?? [])].sort(
    (a, b) =>
      b.tamanho - a.tamanho ||
      a.display_order - b.display_order ||
      a.regiao.localeCompare(b.regiao, "pt-BR")
  );
  const atualizadoEm = ordenados.reduce<string | null>(
    (max, g) => (!max || g.updated_at > max ? g.updated_at : max),
    null
  );
  const temGrupoDe6 = ordenados.some((g) => g.tamanho === 6);

  return (
    <>
      {/* Hero */}
      <section className="px-4 pt-10 pb-8 text-center bg-gradient-to-b from-navy-950 to-navy-900">
        <p className="text-gold-400 text-xs font-semibold tracking-[0.25em] uppercase mb-3">
          Dono do Verão
        </p>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-cream-100 leading-tight max-w-xl mx-auto">
          Cotas de moto aquática no Litoral Norte
        </h1>
        <p className="text-cream-400 mt-4 max-w-md mx-auto text-sm sm:text-base">
          Grupos pequenos, com carreta incluída e curso de Motonauta incluído.
          Veja abaixo quantas cotas ainda restam em cada grupo.
        </p>
        <div className="gold-line mx-auto mt-6" />
      </section>

      {/* Placar */}
      <section className="px-4 py-8 max-w-3xl mx-auto" aria-labelledby="placar-titulo">
        <h2 id="placar-titulo" className="text-xl font-bold text-cream-100">
          Placar de cotas
        </h2>
        {atualizadoEm && (
          <p className="text-cream-500 text-xs mt-1">
            Atualizado em {formatDataHora(atualizadoEm)}
          </p>
        )}
        <p className="text-cream-500 text-xs mt-1">
          Contamos como vendida apenas a cota com entrada paga e confirmada.
        </p>

        {grupos === null && (
          <div className="mt-6 rounded-2xl border border-navy-600 bg-navy-800 p-5">
            <p className="text-cream-300 text-sm">
              O placar está sendo atualizado. Fale com a nossa equipe para saber
              quais cotas estão disponíveis agora.
            </p>
            <DvWhatsAppButton label="Consultar cotas disponíveis" local="placar-indisponivel" className="mt-4" />
          </div>
        )}

        {grupos !== null && ordenados.length === 0 && (
          <div className="mt-6 rounded-2xl border border-navy-600 bg-navy-800 p-5">
            <p className="text-cream-300 text-sm">
              Novos grupos em breve. Fale com a nossa equipe para ser avisado.
            </p>
            <DvWhatsAppButton label="Quero ser avisado" local="placar-vazio" className="mt-4" />
          </div>
        )}

        <ul className="mt-6 space-y-4">
          {ordenados.map((g) => (
            <GrupoCard key={g.id} grupo={g} />
          ))}
        </ul>
      </section>

      {/* Preços */}
      <section className="px-4 py-8 max-w-3xl mx-auto" aria-labelledby="precos-titulo">
        <h2 id="precos-titulo" className="text-xl font-bold text-cream-100">
          Valores e condições
        </h2>
        <p className="text-cream-400 text-sm mt-2">
          Carreta incluída no preço. Curso de Motonauta incluído.
        </p>

        <TabelaPrecos tamanho={8} destaque />
        {temGrupoDe6 && <TabelaPrecos tamanho={6} />}

        <p className="text-cream-500 text-xs mt-6">
          Os valores são os mesmos para todos os grupos do mesmo tamanho. Condições
          formalizadas em contrato. Fale com a nossa equipe para confirmar a
          disponibilidade da cota.
        </p>
      </section>

      <section className="px-4 pt-4 pb-28 text-center">
        <DvWhatsAppButton label="Falar com a equipe no WhatsApp" local="rodape" />
      </section>

      {/* Barra fixa no celular */}
      <div className="fixed bottom-0 inset-x-0 z-40 bg-navy-950/95 backdrop-blur-sm border-t border-navy-700 px-4 py-3 sm:hidden">
        <DvWhatsAppButton label="Falar no WhatsApp" local="barra-fixa" className="w-full" />
      </div>
    </>
  );
}

function GrupoCard({ grupo: g }: { grupo: Grupo }) {
  const restantes = g.tamanho - g.cotas_vendidas;
  const fechado = g.situacao === "fechado";
  const esgotado = restantes <= 0;
  const destaque = g.situacao === "em_destaque";
  const titulo = `${g.regiao} · ${g.moto_modelo} ${g.moto_ano}`;

  return (
    <li
      className={`rounded-2xl border p-5 ${
        destaque ? "border-gold-500 bg-navy-700" : "border-navy-600 bg-navy-800"
      } ${fechado ? "opacity-75" : ""}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-cream-100 font-bold">{g.regiao}</h3>
          <p className="text-cream-400 text-sm mt-0.5">
            {g.moto_modelo} {g.moto_ano} · Grupo de {g.tamanho} cotas
          </p>
        </div>
        <span
          className={`shrink-0 text-xs font-semibold px-3 py-1 rounded-full ${
            destaque
              ? "bg-gold-500 text-navy-950"
              : fechado
              ? "bg-navy-600 text-cream-400"
              : "border border-cream-500 text-cream-300"
          }`}
        >
          {SITUACAO_LABEL[g.situacao]}
        </span>
      </div>

      <div
        className="flex gap-1.5 mt-4"
        role="img"
        aria-label={`${g.cotas_vendidas} de ${g.tamanho} cotas vendidas`}
      >
        {Array.from({ length: g.tamanho }, (_, i) => (
          <span
            key={i}
            className={`h-2.5 flex-1 rounded-full ${
              i < g.cotas_vendidas ? "bg-gold-500" : "bg-navy-500"
            }`}
          />
        ))}
      </div>

      <p className="text-cream-300 text-sm mt-3">
        <strong className="text-cream-100">{g.cotas_vendidas}</strong> de {g.tamanho} vendidas ·{" "}
        {fechado ? (
          <span>grupo fechado</span>
        ) : esgotado ? (
          <span>sem cotas restantes</span>
        ) : (
          <span>
            <strong className="text-gold-400">
              {restantes} {restantes === 1 ? "restante" : "restantes"}
            </strong>
          </span>
        )}
      </p>

      {!fechado && !esgotado && (
        <DvWhatsAppButton
          label="Quero uma cota deste grupo"
          grupo={`${titulo} (${g.tamanho} cotas)`}
          local={`grupo-${g.id}`}
          variant={destaque ? "primary" : "outline"}
          className="mt-4 w-full sm:w-auto"
        />
      )}
    </li>
  );
}

function TabelaPrecos({ tamanho, destaque }: { tamanho: Tamanho; destaque?: boolean }) {
  const condicoes = PRECOS[tamanho];
  const avista = condicoes.find((c) => c.entrada === undefined);
  const maisLongo = condicoes[condicoes.length - 1];
  const economia = avista ? maisLongo.total - avista.total : 0;

  return (
    <div className="mt-6">
      <h3 className={`font-bold ${destaque ? "text-gold-400 text-lg" : "text-cream-200"}`}>
        Cota de {tamanho}
      </h3>
      <ul className="mt-3 space-y-2">
        {condicoes.map((c) => (
          <LinhaPreco key={c.label} c={c} avista={c.entrada === undefined} />
        ))}
      </ul>
      {avista && economia > 0 && (
        <p className="text-cream-400 text-xs mt-3">
          À vista: {formatBRL(economia)} a menos que o total em {maisLongo.parcelas}x.
        </p>
      )}
    </div>
  );
}

function LinhaPreco({ c, avista }: { c: Condicao; avista: boolean }) {
  return (
    <li
      className={`rounded-xl border px-4 py-3 ${
        avista ? "border-gold-500 bg-navy-700" : "border-navy-600 bg-navy-800"
      }`}
    >
      <div className="flex items-baseline justify-between gap-3">
        <span className="text-cream-200 text-sm font-semibold">{c.label}</span>
        <span className="text-cream-100 font-bold">{formatBRL(c.total)}</span>
      </div>
      {!avista && c.entrada !== undefined && c.parcelas && c.valorParcela !== undefined && (
        <p className="text-cream-400 text-xs mt-1">
          Entrada de {formatBRL(c.entrada)} + {c.parcelas}x de {formatBRL(c.valorParcela)}
        </p>
      )}
    </li>
  );
}
