import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Sobre a BOATLUX® | A Maior Empresa de Cotas Náuticas do Brasil",
  description:
    "Conheça a história, missão e valores da BOATLUX®. 15 anos transformando o lazer náutico no Litoral Norte Paulista.",
  openGraph: {
    title: "Sobre a BOATLUX®",
    description: "Conheça a empresa que transforma o lazer náutico no Litoral Norte Paulista há mais de 15 anos.",
    url: "https://www.boatluxsp.com.br/sobre",
    type: "website",
  },
};

const values = [
  {
    numeral: "I",
    title: "Excelência",
    desc: "Frota premium sempre mantida com os mais altos padrões de qualidade e segurança.",
  },
  {
    numeral: "II",
    title: "Transparência",
    desc: "Contratos claros, sem letras miúdas. Você sabe exatamente o que está adquirindo.",
  },
  {
    numeral: "III",
    title: "Paixão pelo mar",
    desc: "Cada detalhe pensado para que sua experiência náutica seja inesquecível.",
  },
  {
    numeral: "IV",
    title: "Inovação",
    desc: "Sistema de reservas digital, app próprio e tecnologia a favor do seu lazer.",
  },
];

const locations = [
  { city: "Ubatuba", desc: "Praias paradisíacas e ilhas preservadas" },
  { city: "Caraguatatuba", desc: "Baías tranquilas e enseadas deslumbrantes" },
  { city: "São Sebastião", desc: "Canal histórico e mar aberto" },
  { city: "Ilhabela", desc: "Arquipélago único com cachoeiras e trilhas" },
];

export default function SobrePage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-4">
            Nossa história
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-cream-100 mb-6">
            Sobre a BOATLUX®
          </h1>
          <p className="text-cream-400 text-lg max-w-2xl mx-auto">
            15 anos transformando o sonho de navegar em realidade para milhares
            de famílias no Litoral Norte Paulista.
          </p>
        </div>
      </section>

      {/* Mission + Video */}
      <section className="py-20 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="space-y-6">
              <h2 className="font-display text-4xl font-bold text-cream-100">
                A missão que nos move
              </h2>
              <div className="gold-line" />
              <p className="text-cream-400 leading-relaxed">
                A BOATLUX® nasceu da crença de que o lazer náutico de qualidade
                não precisa ser inacessível. Criamos um modelo de negócio que
                permite a qualquer família realizar o sonho de ter uma
                embarcação, com segurança jurídica e sem os custos absurdos da
                propriedade individual.
              </p>
              <p className="text-cream-400 leading-relaxed">
                Hoje somos a maior empresa de cotas náuticas do Brasil, com mais
                de <strong className="text-cream-200">300 embarcações</strong>,{" "}
                <strong className="text-cream-200">2.000 cotistas</strong> e
                presença em quatro cidades do Litoral Norte Paulista: Ubatuba,
                Caraguatatuba, São Sebastião e Ilhabela.
              </p>
              <p className="text-cream-400 leading-relaxed">
                Nosso sistema GNU (Grupo Nacional de Utilização) é exclusivo e
                permite que cotistas naveguem em qualquer ponto do Brasil, sem
                custo adicional.
              </p>
            </div>
            <div className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-navy-700 shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/jk1ZqiTvHoo?si=t72OxfzuhMW69vVI"
                title="BOATLUX® Nossa História"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-3">
              O que nos guia
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream-100">
              Nossos Valores
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {values.map((v) => (
              <div
                key={v.title}
                className="bg-navy-800 border border-navy-700 rounded-xl p-6 hover:border-gold-500/30 transition-colors group"
              >
                <p className="font-display text-2xl font-bold text-gold-600 mb-3">{v.numeral}</p>
                <div className="w-6 h-px bg-gold-600 mb-4" />
                <h3 className="font-display text-lg font-semibold text-cream-100 mb-2 group-hover:text-gold-400 transition-colors">
                  {v.title}
                </h3>
                <p className="text-cream-500 text-sm leading-relaxed">{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="py-20 lg:py-28 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Onde você pode navegar
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream-100">
              Litoral Norte Paulista
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {locations.map((loc) => (
              <div
                key={loc.city}
                className="bg-navy-900 border border-navy-700 rounded-xl p-6 hover:border-gold-500/30 transition-colors"
              >
                <div className="w-5 h-px bg-gold-600 mb-3" />
                <h3 className="font-display text-xl font-semibold text-cream-100 mb-2">
                  {loc.city}
                </h3>
                <p className="text-cream-500 text-sm">{loc.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.06)_0%,_transparent_70%)]" />
        <div className="relative max-w-3xl mx-auto px-4 text-center space-y-6">
          <h2 className="font-display text-4xl md:text-5xl font-bold text-cream-100">
            Pronto para fazer parte da família{" "}
            <span className="text-gold-400">BOATLUX®</span>?
          </h2>
          <p className="text-cream-400 text-lg">
            Converse com um especialista e descubra a embarcação ideal para você
            e sua família.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
            <a
              href="https://wa.me/5512991198268?text=Ol%C3%A1%2C+vim+do+site+e+gostaria+de+saber+mais+sobre+as+cotas."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-8 py-4 rounded-full text-base transition-colors"
            >
              Falar com especialista
            </a>
            <Link
              href="/cotas"
              className="inline-flex items-center border border-navy-600 text-cream-300 hover:text-gold-400 hover:border-gold-500 font-medium px-8 py-4 rounded-full text-base transition-colors"
            >
              Ver embarcações →
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
