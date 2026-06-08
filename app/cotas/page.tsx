"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { boats } from "@/lib/boats";

export default function CotasPage() {
  const [filter, setFilter] = useState<"all" | "lancha" | "jet">("all");

  const filtered = filter === "all" ? boats : boats.filter((b) => b.type === filter);

  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-4">
            Frota exclusiva
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-cream-100 mb-6">
            Cotas Disponíveis
          </h1>
          <p className="text-cream-400 text-lg max-w-2xl mx-auto">
            Escolha entre lanchas e jet skis de alto padrão. Cada embarcação
            cuidadosamente mantida para garantir a melhor experiência.
          </p>
        </div>
      </section>

      {/* Filter + Grid */}
      <section className="pb-28 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Filter tabs */}
          <div className="flex items-center justify-center gap-3 mb-12 pt-4">
            {(
              [
                { key: "all", label: "Todas" },
                { key: "lancha", label: "Lanchas" },
                { key: "jet", label: "Jet Skis" },
              ] as const
            ).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setFilter(tab.key)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                  filter === tab.key
                    ? "bg-gold-500 text-navy-950"
                    : "border border-navy-600 text-cream-400 hover:border-gold-500 hover:text-gold-400"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Boats grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((boat) => (
              <Link
                key={boat.slug}
                href={`/embarcacoes/${boat.slug}`}
                className="group bg-navy-900 rounded-2xl overflow-hidden border border-navy-700 hover:border-gold-500/40 transition-all duration-300"
              >
                <div className="relative h-60 overflow-hidden">
                  <Image
                    src={boat.images[0]}
                    alt={boat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                  <div className="absolute top-3 left-3 flex gap-2">
                    <span className="bg-gold-500/90 text-navy-950 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                      {boat.type === "lancha" ? "Lancha" : "Jet Ski"}
                    </span>
                    {boat.available && (
                      <span className="bg-emerald-500/90 text-white text-xs font-semibold px-3 py-1 rounded-full">
                        Disponível
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="font-display text-xl font-semibold text-cream-100 mb-1 group-hover:text-gold-400 transition-colors">
                    {boat.name}
                  </h3>
                  <p className="text-cream-500 text-xs mb-3">📍 {boat.location}</p>
                  <p className="text-cream-400 text-sm line-clamp-2 mb-5">
                    {boat.description}
                  </p>

                  {/* Specs */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {boat.specs.comprimento && (
                      <div className="bg-navy-800 rounded-lg px-3 py-2 text-center">
                        <p className="text-gold-500 text-xs font-semibold">{boat.specs.comprimento}</p>
                        <p className="text-cream-500 text-xs">Comprimento</p>
                      </div>
                    )}
                    {boat.specs.capacidade && (
                      <div className="bg-navy-800 rounded-lg px-3 py-2 text-center">
                        <p className="text-gold-500 text-xs font-semibold">{boat.specs.capacidade}</p>
                        <p className="text-cream-500 text-xs">Capacidade</p>
                      </div>
                    )}
                    {boat.specs.motor && (
                      <div className="bg-navy-800 rounded-lg px-3 py-2 text-center col-span-2">
                        <p className="text-gold-500 text-xs font-semibold">{boat.specs.motor}</p>
                        <p className="text-cream-500 text-xs">Motor</p>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-navy-700">
                    <a
                      href={`https://wa.me/5512996010000?text=Ol%C3%A1%2C+tenho+interesse+na+${encodeURIComponent(boat.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="inline-flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20b85a] text-white text-xs font-semibold px-4 py-2 rounded-full transition-colors"
                    >
                      <WaIcon />
                      Tenho interesse
                    </a>
                    <span className="text-gold-500 text-xs font-medium group-hover:translate-x-1 transition-transform inline-block">
                      Detalhes →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {filtered.length === 0 && (
            <div className="text-center py-20">
              <p className="text-cream-500">Nenhuma embarcação encontrada.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA bottom */}
      <section className="py-16 border-t border-navy-700">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <h2 className="font-display text-3xl font-bold text-cream-100">
            Não encontrou o que procura?
          </h2>
          <p className="text-cream-400">
            Fale com um especialista. Temos mais de 300 embarcações — com
            certeza temos a ideal para você.
          </p>
          <a
            href="https://wa.me/5512996010000?text=Ol%C3%A1%2C+gostaria+de+ver+mais+op%C3%A7%C3%B5es+de+embarca%C3%A7%C3%B5es."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-8 py-4 rounded-full text-sm transition-colors"
          >
            Falar com especialista
          </a>
        </div>
      </section>
    </>
  );
}

function WaIcon() {
  return (
    <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
