"use client";

import { useState, useTransition } from "react";
import { salvarCotasTema } from "@/app/admin/tema/actions";
import { COTAS_TEMAS, COTAS_TEMA_LABEL, type CotasTema } from "@/lib/site-config";

const DESCRICAO: Record<CotasTema, string> = {
  padrao: "Visual azul-marinho e dourado de sempre.",
  "black-november":
    "Fundo preto com dourado, selo BLACK NOVEMBER e faixa “Condições especiais até 30 de novembro”.",
};

export default function TemaForm({ atual }: { atual: CotasTema }) {
  const [tema, setTema] = useState<CotasTema>(atual);
  const [salvo, setSalvo] = useState<CotasTema>(atual);
  const [erro, setErro] = useState<string | null>(null);
  const [ok, setOk] = useState(false);
  const [pending, start] = useTransition();

  function salvar() {
    setErro(null);
    setOk(false);
    start(async () => {
      const r = await salvarCotasTema(tema);
      if (r.error) setErro(r.error);
      else {
        setSalvo(tema);
        setOk(true);
      }
    });
  }

  return (
    <div className="space-y-4">
      {COTAS_TEMAS.map((t) => (
        <label
          key={t}
          className={`flex items-start gap-3 bg-gray-900 border rounded-xl p-4 cursor-pointer transition-colors ${
            tema === t ? "border-yellow-500" : "border-gray-800 hover:border-gray-700"
          }`}
        >
          <input
            type="radio"
            name="tema"
            checked={tema === t}
            onChange={() => setTema(t)}
            className="mt-1 accent-yellow-500"
          />
          <span>
            <span className="block text-white font-semibold">
              {COTAS_TEMA_LABEL[t]}
              {salvo === t && <span className="ml-2 text-xs text-green-300">no ar agora</span>}
            </span>
            <span className="block text-gray-400 text-sm mt-1">{DESCRICAO[t]}</span>
          </span>
        </label>
      ))}

      {erro && <p className="text-red-400 text-sm">{erro}</p>}
      {ok && <p className="text-green-300 text-sm">Tema salvo. A página /cotas já está atualizada.</p>}

      <button
        onClick={salvar}
        disabled={pending || tema === salvo}
        className="bg-yellow-500 hover:bg-yellow-400 disabled:opacity-50 text-gray-950 font-semibold px-6 py-2.5 rounded-lg text-sm transition-colors"
      >
        {pending ? "Salvando..." : "Salvar tema"}
      </button>
    </div>
  );
}
