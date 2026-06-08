"use client";

import { useState } from "react";

type FormState = "idle" | "loading" | "success" | "error";

export default function LeadForm({ source = "homepage" }: { source?: string }) {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
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
        body: JSON.stringify({ ...form, source }),
      });
      if (!res.ok) throw new Error();
      setState("success");
      setForm({ name: "", phone: "", email: "", message: "" });
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
          Nossa equipe entrará em contato em breve. Ou, se preferir, fale agora
          pelo WhatsApp.
        </p>
        <a
          href="https://wa.me/5512996010000"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 bg-[#25D366] text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-[#20b85a] transition-colors"
        >
          Abrir WhatsApp
        </a>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
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

      <div>
        <label className="block text-xs text-cream-400 uppercase tracking-wide mb-1.5">
          E-mail
        </label>
        <input
          type="email"
          name="email"
          value={form.email}
          onChange={handleChange}
          placeholder="seu@email.com.br"
          className="w-full bg-navy-700 border border-navy-600 text-cream-200 placeholder-cream-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-colors"
        />
      </div>

      <div>
        <label className="block text-xs text-cream-400 uppercase tracking-wide mb-1.5">
          Mensagem
        </label>
        <textarea
          name="message"
          rows={3}
          value={form.message}
          onChange={handleChange}
          placeholder="Qual embarcação te interessa? Qual cidade?"
          className="w-full bg-navy-700 border border-navy-600 text-cream-200 placeholder-cream-500 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-gold-500 focus:ring-1 focus:ring-gold-500/30 transition-colors resize-none"
        />
      </div>

      {state === "error" && (
        <p className="text-red-400 text-sm">
          Erro ao enviar. Tente pelo WhatsApp:{" "}
          <a href="https://wa.me/5512996010000" className="underline">
            (12) 99601-0000
          </a>
        </p>
      )}

      <button
        type="submit"
        disabled={state === "loading"}
        className="w-full bg-gold-500 hover:bg-gold-400 disabled:opacity-60 text-navy-950 font-semibold py-3.5 rounded-lg transition-colors text-sm tracking-wide"
      >
        {state === "loading" ? "Enviando..." : "Quero ser contatado →"}
      </button>

      <p className="text-center text-xs text-cream-500">
        Seus dados estão seguros. Não enviamos spam.
      </p>
    </form>
  );
}
