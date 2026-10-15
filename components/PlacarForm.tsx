"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { salvarGrupo, excluirGrupo } from "@/app/admin/placar/actions";
import {
  REGIOES,
  SITUACOES,
  SITUACAO_LABEL,
  TAMANHOS,
  validarGrupo,
  type Grupo,
  type GrupoInput,
} from "@/lib/dono-do-verao";

const inputClass =
  "w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-yellow-500 transition-colors placeholder:text-gray-600";
const labelClass = "block text-xs text-gray-400 mb-1.5";

export default function PlacarForm({ grupo }: { grupo?: Grupo }) {
  const router = useRouter();
  const [form, setForm] = useState<GrupoInput>({
    regiao: grupo?.regiao ?? REGIOES[0],
    moto_modelo: grupo?.moto_modelo ?? "",
    moto_ano: grupo?.moto_ano ?? 2026,
    tamanho: grupo?.tamanho ?? 8,
    cotas_vendidas: grupo?.cotas_vendidas ?? 0,
    situacao: grupo?.situacao ?? "aberto",
    display_order: grupo?.display_order ?? 0,
  });
  const [saving, setSaving] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [error, setError] = useState("");

  function set<K extends keyof GrupoInput>(field: K, value: GrupoInput[K]) {
    setForm((prev) => ({ ...prev, [field]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    const erro = validarGrupo(form);
    if (erro) return setError(erro);

    setSaving(true);
    const res = await salvarGrupo(grupo?.id ?? null, form);
    if (res.error) {
      setError(res.error);
      setSaving(false);
      return;
    }
    router.push("/admin/placar");
    router.refresh();
  }

  async function handleDelete() {
    if (!grupo) return;
    if (!confirm("Tem certeza que quer excluir este grupo do placar?")) return;
    setDeleting(true);
    const res = await excluirGrupo(grupo.id);
    if (res.error) {
      setError(res.error);
      setDeleting(false);
      return;
    }
    router.push("/admin/placar");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <section className="bg-gray-900 border border-gray-800 rounded-2xl p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Região *</label>
            <select
              className={inputClass}
              value={form.regiao}
              onChange={(e) => set("regiao", e.target.value)}
            >
              {REGIOES.map((r) => (
                <option key={r} value={r}>{r}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Tamanho do grupo *</label>
            <select
              className={inputClass}
              value={form.tamanho}
              onChange={(e) => set("tamanho", Number(e.target.value))}
            >
              {TAMANHOS.map((t) => (
                <option key={t} value={t}>{t} cotas</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Modelo da moto *</label>
            <input
              className={inputClass}
              value={form.moto_modelo}
              onChange={(e) => set("moto_modelo", e.target.value)}
              placeholder="Ex.: Sea-Doo GTI 130"
              maxLength={60}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Ano da moto *</label>
            <input
              type="number"
              className={inputClass}
              value={form.moto_ano}
              onChange={(e) => set("moto_ano", Number(e.target.value))}
              min={2020}
              max={2035}
              required
            />
          </div>
          <div>
            <label className={labelClass}>Cotas vendidas * (de 0 a {form.tamanho})</label>
            <input
              type="number"
              className={inputClass}
              value={form.cotas_vendidas}
              onChange={(e) => set("cotas_vendidas", Number(e.target.value))}
              min={0}
              max={form.tamanho}
              required
            />
            <p className="text-xs text-gray-500 mt-1.5">
              Só conta como vendida quando a entrada está paga e confirmada pelo financeiro.
            </p>
          </div>
          <div>
            <label className={labelClass}>Situação *</label>
            <select
              className={inputClass}
              value={form.situacao}
              onChange={(e) => set("situacao", e.target.value)}
            >
              {SITUACOES.map((s) => (
                <option key={s} value={s}>{SITUACAO_LABEL[s]}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={labelClass}>Ordem de exibição</label>
            <input
              type="number"
              className={inputClass}
              value={form.display_order}
              onChange={(e) => set("display_order", Number(e.target.value))}
            />
            <p className="text-xs text-gray-500 mt-1.5">Menor número aparece primeiro.</p>
          </div>
        </div>
      </section>

      {error && <p className="text-red-400 text-sm">{error}</p>}

      <div className="flex items-center gap-3">
        <button
          type="submit"
          disabled={saving || deleting}
          className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-60 text-gray-950 font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
        >
          {saving ? "Salvando..." : "Salvar"}
        </button>
        {grupo && (
          <button
            type="button"
            onClick={handleDelete}
            disabled={saving || deleting}
            className="ml-auto text-red-400 hover:text-red-300 text-sm transition-colors"
          >
            {deleting ? "Excluindo..." : "Excluir grupo"}
          </button>
        )}
      </div>
    </form>
  );
}
