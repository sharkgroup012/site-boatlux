import type { Metadata } from "next";
import Link from "next/link";
import { getAllBoats } from "@/lib/boats";
import BoatsGrid from "@/components/BoatsGrid";

export const metadata: Metadata = {
  title: "Cotas Disponíveis | BOATLUX® | Lanchas e Jet Skis",
  description: "Confira as cotas náuticas disponíveis na BOATLUX®. Lanchas e jet skis de alto padrão no Litoral Norte Paulista.",
};

export const dynamic = "force-dynamic";

export default async function CotasPage() {
  const boats = await getAllBoats();

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
          <BoatsGrid boats={boats} />
        </div>
      </section>

      {/* CTA bottom */}
      <section className="py-16 border-t border-navy-700">
        <div className="max-w-3xl mx-auto px-4 text-center space-y-4">
          <h2 className="font-display text-3xl font-bold text-cream-100">
            Não encontrou o que procura?
          </h2>
          <p className="text-cream-400">
            Fale com um especialista. Temos mais de 300 embarcações, com
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
