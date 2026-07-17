"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export default function LPLeadForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    experiencia: "",
    conheceCotas: "",
    prazoDecisao: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/contato", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          phone: form.phone,
          email: form.email,
          source: "lp-nx340",
          experiencia: form.experiencia,
          conhece_cotas: form.conheceCotas,
          prazo_decisao: form.prazoDecisao,
        }),
      });
      if (!res.ok) throw new Error();
      setState("success");
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== "undefined" && (window as any).fbq) {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).fbq("track", "Lead");
      }
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (typeof window !== "undefined") {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).dataLayer = (window as any).dataLayer || [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).dataLayer.push({ event: "lead_lp_nx340" });
      }
      const waText = encodeURIComponent(
        `Olá! Me chamo ${form.name} e acabei de preencher o formulário sobre a NX 340. Gostaria de saber mais sobre a cota.`
      );
      setTimeout(() => {
        window.location.href = `https://wa.me/5512991198268?text=${waText}`;
      }, 500);
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="text-center py-10 space-y-3">
        <div className="w-14 h-14 rounded-full bg-gold-500/20 flex items-center justify-center mx-auto">
          <svg className="w-7 h-7 text-gold-500" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className="font-display text-xl text-cream-200">Mensagem enviada!</h3>
        <p className="text-cream-400 text-sm">
          Nossa equipe entrará em contato em breve.
        </p>
      </div>
    );
  }

  const selectClass =
    "w-full bg-navy-700 border border-navy-600 text-cream-200 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-colors appearance-none cursor-pointer";

  const emptyOptionClass = "text-cream-500 bg-navy-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Nome + Telefone */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs text-cream-400 uppercase tracking-wide mb-1.5">
            Nome *
          </label>
          <input
            type="text"
            name="name"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Seu nome completo"
            className="w-full bg-navy-700 border border-navy-600 text-cream-200 placeholder-cream-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-colors"
          />
        </div>
        <div>
          <label className="block text-xs text-cream-400 uppercase tracking-wide mb-1.5">
            Telefone / WhatsApp *
          </label>
          <input
            type="tel"
            name="phone"
            required
            value={form.phone}
            onChange={handleChange}
            placeholder="(12) 99999-9999"
            className="w-full bg-navy-700 border border-navy-600 text-cream-200 placeholder-cream-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-colors"
          />
        </div>
      </div>

      {/* E-mail */}
      <div>
        <label className="block text-xs text-cream-400 uppercase tracking-wide mb-1.5">
          E-mail *
        </label>
        <input
          type="email"
          name="email"
          required
          value={form.email}
          onChange={handleChange}
          placeholder="seu@email.com.br"
          className="w-full bg-navy-700 border border-navy-600 text-cream-200 placeholder-cream-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-colors"
        />
      </div>

      {/* Select 1 */}
      <div>
        <label className="block text-xs text-cream-400 uppercase tracking-wide mb-1.5">
          Qual a sua experiência náutica? *
        </label>
        <div className="relative">
          <select
            name="experiencia"
            required
            value={form.experiencia}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="" disabled className={emptyOptionClass}>
              Selecione uma opção
            </option>
            <option value="Iniciante. Começando agora." className="bg-navy-800">
              Iniciante. Começando agora.
            </option>
            <option value="Navego ocasionalmente" className="bg-navy-800">
              Navego ocasionalmente
            </option>
            <option value="Não tenho habilitação mas sempre navego" className="bg-navy-800">
              Não tenho habilitação mas sempre navego
            </option>
            <option value="Já navego e tenho habilitação" className="bg-navy-800">
              Já navego e tenho habilitação
            </option>
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold-500 text-xs">▼</span>
        </div>
      </div>

      {/* Select 2 */}
      <div>
        <label className="block text-xs text-cream-400 uppercase tracking-wide mb-1.5">
          Conhece o modelo de cotas náuticas? *
        </label>
        <div className="relative">
          <select
            name="conheceCotas"
            required
            value={form.conheceCotas}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="" disabled className={emptyOptionClass}>
              Selecione uma opção
            </option>
            <option value="Não conheço" className="bg-navy-800">
              Não conheço
            </option>
            <option value="Estou conhecendo agora" className="bg-navy-800">
              Estou conhecendo agora
            </option>
            <option value="Conheço muito" className="bg-navy-800">
              Conheço muito
            </option>
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold-500 text-xs">▼</span>
        </div>
      </div>

      {/* Select 3 */}
      <div>
        <label className="block text-xs text-cream-400 uppercase tracking-wide mb-1.5">
          Quando pretende tomar a decisão? *
        </label>
        <div className="relative">
          <select
            name="prazoDecisao"
            required
            value={form.prazoDecisao}
            onChange={handleChange}
            className={selectClass}
          >
            <option value="" disabled className={emptyOptionClass}>
              Selecione uma opção
            </option>
            <option value="Ainda estou pesquisando, sem prazo definido" className="bg-navy-800">
              Ainda estou pesquisando, sem prazo definido
            </option>
            <option value="Nos próximos 3 meses" className="bg-navy-800">
              Nos próximos 3 meses
            </option>
            <option value="Nos próximos 30 dias" className="bg-navy-800">
              Nos próximos 30 dias
            </option>
            <option value="Já decidi, só preciso escolher a embarcação" className="bg-navy-800">
              Já decidi, só preciso escolher a embarcação
            </option>
          </select>
          <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-gold-500 text-xs">▼</span>
        </div>
      </div>

      {state === "error" && (
        <p className="text-red-400 text-sm">
          Erro ao enviar. Tente novamente ou ligue para{" "}
          <a href="tel:+5512991198268" className="underline">
            (12) 99119-8268
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-navy-950 font-semibold py-3.5 rounded-lg transition-colors text-sm tracking-wide"
      >
        {state === "loading" ? "Enviando..." : "Quero saber mais sobre a cota"}
      </button>

      <p className="text-center text-xs text-cream-500">
        Seus dados estão seguros. Não enviamos spam.
      </p>
    </form>
  );
}
