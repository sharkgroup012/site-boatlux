import Image from "next/image";
import Link from "next/link";
import LeadForm from "@/components/LeadForm";
import { getFeaturedBoats } from "@/lib/boats";

const stats = [
  { value: "300+", label: "Embarcações", sub: "Lanchas e jet skis de alto padrão" },
  { value: "2.000+", label: "Cotistas", sub: "Voando regularmente pelo litoral" },
  { value: "15+", label: "Anos", sub: "Liderando o mercado náutico nacional" },
  { value: "4", label: "Cidades", sub: "Ubatuba, Caraguatatuba, São Sebastião, Ilhabela" },
];

const benefits = [
  {
    number: "01",
    title: "GNU: Use em todo o Brasil",
    desc: "Navegue em qualquer lugar do país. O Grupo Nacional de Utilização é exclusividade BOATLUX®.",
  },
  {
    number: "02",
    title: "Manutenção incluída",
    desc: "Todos os custos de manutenção preventiva e corretiva estão cobertos na sua cota.",
  },
  {
    number: "03",
    title: "Limpeza completa",
    desc: "Checkup e limpeza profissional antes e depois de cada uso. Embarcação sempre perfeita.",
  },
  {
    number: "04",
    title: "Seguro total",
    desc: "Cobertura completa de seguro para a embarcação e tripulantes inclusa.",
  },
  {
    number: "05",
    title: "Sem custos fixos",
    desc: "Pague somente pela cota. Sem IPVA náutico, vaga de marina ou outros custos ocultos.",
  },
  {
    number: "06",
    title: "Reserva pelo app",
    desc: "Agendamento simples e rápido pelo aplicativo. Disponibilidade em tempo real.",
  },
];

const steps = [
  {
    number: "01",
    title: "Escolha sua embarcação",
    desc: "Explore nosso catálogo de lanchas e jet skis. Nossa equipe te ajuda a escolher a ideal para seu perfil.",
  },
  {
    number: "02",
    title: "Adquira sua cota",
    desc: "Processo 100% transparente. Você recebe toda a documentação e garantias legais da sua cota.",
  },
  {
    number: "03",
    title: "Navegue quando quiser",
    desc: "Faça sua reserva pelo app e aproveite o mar com toda a família. Sem estresse, sem burocracia.",
  },
];

const testimonials = [
  {
    name: "Roberto M.",
    since: "Cotista BOATLUX® desde 2019",
    text: "Antes de conhecer a BOATLUX®, passei anos pensando em comprar uma lancha própria. Quando calculei os custos reais de manutenção, seguro, marinheiro e vaga de marina, percebi que nunca valia a pena. Hoje tenho minha cota há cinco anos, navego todos os fins de semana em Ubatuba e não me preocupo com absolutamente nada. A equipe cuida de tudo.",
  },
  {
    name: "Ana C.",
    since: "Cotista BOATLUX® desde 2021",
    text: "Meu marido e eu compramos uma cota como presente de aniversário de casamento. Em dois anos, já levamos nossa família para Ilhabela mais de quarenta vezes. A lancha está sempre impecável, a reserva é simples pelo aplicativo e o atendimento é excelente. Difícil imaginar os verões sem a BOATLUX®.",
  },
  {
    name: "Carlos F.",
    since: "Cotista BOATLUX® desde 2020",
    text: "Pesquisei muito antes de fechar. Cheguei a dar entrada em uma lancha própria e desisti quando vi os custos anuais. Com a cota, pago uma fração disso e tenho disponibilidade real nos fins de semana. O sistema GNU também foi decisivo: já usei embarcações em outros estados durante viagens.",
  },
];

export default async function HomePage() {
  const featuredBoats = await getFeaturedBoats();

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <Image
          src="/images/carousel-1.jpg"
          alt="Lancha Boatlux no Litoral Norte SP"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950/80 via-navy-950/60 to-navy-950/90" />

        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <p className="inline-block text-gold-500 text-xs font-semibold uppercase tracking-[0.25em] mb-6 border border-gold-500/30 px-4 py-1.5 rounded-full bg-gold-500/10 backdrop-blur-sm">
            Maior empresa de cotas náuticas do Brasil
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-cream-100 leading-tight mb-6">
            O mar te espera.
            <br />
            <span className="text-gold-400">Navegue agora.</span>
          </h1>
          <p className="text-cream-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
            A maior empresa de cotas náuticas do Brasil. Mais de 300
            embarcações disponíveis no Litoral Norte Paulista.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://wa.me/5512996010000?text=Ol%C3%A1%2C+vim+do+site+e+gostaria+de+saber+mais+sobre+as+cotas."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-8 py-4 rounded-full text-base transition-all duration-200 hover:shadow-lg"
            >
              <WhatsAppIcon className="w-5 h-5" />
              Quero minha cota agora
            </a>
            <Link
              href="/cotas"
              className="inline-flex items-center gap-2 border border-cream-300/40 text-cream-200 hover:border-gold-500 hover:text-gold-400 font-medium px-8 py-4 rounded-full text-base transition-all duration-200 backdrop-blur-sm"
            >
              Ver embarcações →
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 opacity-60">
          <div className="w-px h-8 bg-gradient-to-b from-transparent to-cream-400" />
          <p className="text-cream-400 text-xs uppercase tracking-widest">Scroll</p>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="bg-navy-800 border-y border-navy-700">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-navy-700">
            {stats.map((stat) => (
              <div key={stat.label} className="py-10 text-center px-4">
                <p className="font-display text-3xl md:text-4xl font-bold text-gold-500 mb-1">
                  {stat.value}
                </p>
                <p className="text-cream-200 text-sm font-medium mb-1">{stat.label}</p>
                <div className="w-8 h-px bg-gold-700 mx-auto mb-2" />
                <p className="text-cream-500 text-xs leading-relaxed">{stat.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT / VIDEO ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative aspect-video rounded-2xl overflow-hidden ring-1 ring-navy-700 shadow-2xl">
              <iframe
                src="https://www.youtube.com/embed/jk1ZqiTvHoo?si=t72OxfzuhMW69vVI"
                title="BOATLUX® O que é uma Cota Náutica?"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </div>
            <div className="space-y-6">
              <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest">
                Compartilhar é inteligente
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-cream-100 leading-tight">
                Por que a Cota
                <br />
                Náutica?
              </h2>
              <div className="gold-line" />
              <p className="text-cream-400 leading-relaxed">
                O sistema de cotas permite que você tenha todos os benefícios de
                possuir uma lancha ou jet ski, pagando apenas uma fração do
                valor. A BOATLUX® cuida de tudo: manutenção, limpeza, seguro e
                documentação.
              </p>
              <p className="text-cream-400 leading-relaxed">
                Somos a maior empresa de cotas náuticas do país, com mais de{" "}
                <strong className="text-cream-200">300 embarcações</strong> e{" "}
                <strong className="text-cream-200">2.000 cotistas</strong> no
                Litoral Norte Paulista.
              </p>
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href="https://wa.me/5512996010000?text=Ol%C3%A1%2C+vim+do+site+e+gostaria+de+saber+mais+sobre+as+cotas."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-6 py-3 rounded-full text-sm transition-colors"
                >
                  <WhatsAppIcon className="w-4 h-4" />
                  Quero saber mais
                </a>
                <Link
                  href="/sobre"
                  className="inline-flex items-center gap-2 border border-navy-600 text-cream-300 hover:text-gold-400 hover:border-gold-500 font-medium px-6 py-3 rounded-full text-sm transition-colors"
                >
                  Conheça a BOATLUX®
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED BOATS ── */}
      <section className="py-20 lg:py-28 bg-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Frota exclusiva
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream-100">
              Embarcações em Destaque
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredBoats.map((boat) => (
              <Link
                key={boat.slug}
                href={`/embarcacoes/${boat.slug}`}
                className="group bg-navy-900 rounded-2xl overflow-hidden border border-navy-700 hover:border-gold-500/40 transition-all duration-300"
              >
                <div className="relative h-56 overflow-hidden">
                  <Image
                    src={boat.images[0]}
                    alt={boat.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy-900/80 to-transparent" />
                  <span className="absolute top-3 left-3 bg-gold-500/90 text-navy-950 text-xs font-semibold px-3 py-1 rounded-full capitalize">
                    {boat.type === "lancha" ? "Lancha" : "Jet Ski"}
                  </span>
                </div>
                <div className="p-5">
                  <h3 className="font-display text-xl font-semibold text-cream-100 mb-1 group-hover:text-gold-400 transition-colors">
                    {boat.name}
                  </h3>
                  <p className="text-cream-500 text-xs mb-3">{boat.location}</p>
                  <p className="text-cream-400 text-sm line-clamp-2 mb-4">{boat.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex gap-3 text-xs text-cream-500">
                      {boat.specs.comprimento && <span>{boat.specs.comprimento}</span>}
                      {boat.specs.capacidade && <span>{boat.specs.capacidade}</span>}
                    </div>
                    <span className="text-gold-500 text-xs font-medium group-hover:translate-x-1 transition-transform inline-block">
                      Ver detalhes →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/cotas"
              className="inline-flex items-center gap-2 border border-gold-500 text-gold-500 hover:bg-gold-500 hover:text-navy-950 font-semibold px-8 py-3.5 rounded-full text-sm transition-all duration-200"
            >
              Ver todas as embarcações →
            </Link>
          </div>
        </div>
      </section>

      {/* ── BENEFITS ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Diferenciais exclusivos
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream-100">
              Por que a BOATLUX®?
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {benefits.map((b) => (
              <div
                key={b.title}
                className="bg-navy-800 border border-navy-700 hover:border-gold-500/30 rounded-xl p-6 transition-all duration-300 group"
              >
                <p className="text-gold-600 text-xs font-semibold tracking-widest mb-3">{b.number}</p>
                <div className="w-6 h-px bg-gold-600 mb-4" />
                <h3 className="font-display text-lg font-semibold text-cream-100 mb-2 group-hover:text-gold-400 transition-colors">
                  {b.title}
                </h3>
                <p className="text-cream-500 text-sm leading-relaxed">{b.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="py-20 lg:py-28 bg-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.06)_0%,_transparent_70%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Simples e seguro
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream-100">
              Como Funciona
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, i) => (
              <div key={step.number} className="text-center relative">
                <div className="w-20 h-20 rounded-full border-2 border-gold-500 flex items-center justify-center mx-auto mb-6 bg-navy-900">
                  <span className="font-display text-2xl font-bold text-gold-500">
                    {step.number}
                  </span>
                </div>
                <h3 className="font-display text-xl font-semibold text-cream-100 mb-3">
                  {step.title}
                </h3>
                <p className="text-cream-500 text-sm leading-relaxed max-w-xs mx-auto">
                  {step.desc}
                </p>
                {i < steps.length - 1 && (
                  <div className="md:hidden w-px h-8 bg-gold-500/30 mx-auto mt-6" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-20 lg:py-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Quem já navega com a gente
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-cream-100">
              O que nossos cotistas dizem
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {testimonials.map((t) => (
              <div
                key={t.name}
                className="bg-navy-800 border border-navy-700 rounded-2xl p-7 flex flex-col justify-between gap-6"
              >
                <p className="text-cream-300 text-sm leading-relaxed">
                  "{t.text}"
                </p>
                <div className="border-t border-navy-700 pt-4">
                  <p className="text-cream-200 font-semibold text-sm">{t.name}</p>
                  <p className="text-gold-600 text-xs mt-0.5">{t.since}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA / LEAD FORM ── */}
      <section className="py-20 lg:py-28 bg-navy-800 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
            <div className="space-y-6">
              <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest">
                Pronto para navegar?
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-cream-100 leading-tight">
                Fale com um
                <br />
                <span className="text-gold-400">Especialista</span>
              </h2>
              <div className="gold-line" />
              <p className="text-cream-400 leading-relaxed">
                Preencha o formulário e um consultor BOATLUX® entrará em contato
                para apresentar as opções ideais para seu perfil e orçamento.
              </p>
              <div className="space-y-2 pt-2">
                {["Atendimento personalizado", "Resposta em até 1 hora", "Sem compromisso"].map((item) => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-4 h-px bg-gold-600 flex-shrink-0" />
                    <span className="text-cream-400 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <div className="pt-4 border-t border-navy-700">
                <p className="text-cream-400 text-sm mb-3">Prefere falar agora?</p>
                <a
                  href="https://wa.me/5512996010000?text=Ol%C3%A1%2C+vim+do+site+e+gostaria+de+saber+mais+sobre+as+cotas."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20b85a] text-white font-semibold px-7 py-3.5 rounded-full text-sm transition-colors"
                >
                  <WhatsAppIcon className="w-5 h-5" />
                  Abrir WhatsApp
                </a>
              </div>
            </div>
            <div className="bg-navy-900 rounded-2xl border border-navy-700 p-8">
              <h3 className="font-display text-xl font-semibold text-cream-100 mb-6">
                Solicite sua consultoria gratuita
              </h3>
              <LeadForm source="homepage" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
