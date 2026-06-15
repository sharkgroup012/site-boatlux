import type { Metadata } from "next";
import Image from "next/image";
import LPLeadForm from "@/components/LPLeadForm";

export const metadata: Metadata = {
  title: "NX 340 Sport Coupé | Cota Náutica Exclusiva | BOATLUX®",
  description:
    "Sofisticação, liberdade e performance para viver Ubatuba de uma nova forma",
};

// ─── Dados da embarcação ─────────────────────────────────────────────────────
// TODO: substituir com informações reais da NX 340 Sport Coupé

const BOAT = {
  name: "NX 340 Sport Coupé",
  tagline: "Sofisticação, liberdade e performance para viver Ubatuba de uma nova forma",
  description:
    "Acesse uma embarcação de alto padrão sem lidar com burocracia, manutenção ou gestão operacional, com uma experiência pensada para quem valoriza tempo, conforto e exclusividade.",
  highlights: [
    { icon: "✦", title: "Motorização Premium", desc: "02 motores MerCruiser V6 250HP a gasolina com propulsão Bravo Three e duplo hélice contra rotantes." },
    { icon: "✦", title: "Tecnologia de Navegação", desc: "Sistema AXIUS com joystick, Skyhook, piloto automático e volante escamoteável para uma navegação mais precisa e sofisticada. " },
    { icon: "✦", title: "Conforto a Bordo", desc: "Ar-condicionado, boiler e ambientes pensados para proporcionar mais conforto em todas as experiências no mar." },
    { icon: "✦", title: "Autonomia e Performance", desc: "Gerador embarcado para maior autonomia e operação eficiente dos sistemas de conforto e conveniência a bordo. " },
  ],
  specs: [
    { label: "Comprimento", value: "10,15m" },
    { label: "Capacidade", value: "15 de dia/ 04 à noite" },
    { label: "Motor", value: "Parelha MerCruiser V6 250" },
    //{ label: "Potência", value: "TODO: XXX cv" },
    { label: "Tanque Água Doce", value: "150L" },
    { label: "Tanque Combustível", value: "150L" },
  ],
  images: {
    // TODO: substituir com imagens reais da NX 340 Sport Coupé
    hero: "/images/nx340/hero.jpg",
    gallery1: "/images/nx340/gallery1.jpg",
    gallery2: "https://images.unsplash.com/photo-1523496922380-91d5afba98a3?auto=format&fit=crop&w=1200&q=80",
    gallery3: "https://images.unsplash.com/photo-1615646194267-ecf4380ac001?auto=format&fit=crop&w=1200&q=80",
    interior: "/images/nx340/gallery2.jpg",
  },
};

const STATS = [
  { value: "+60", label: "embarcações administradas no modelo de propriedade compartilhada" },
  { value: "+800", label: "cotistas navegando no litoral norte paulista" },
  { value: "+6", label: "anos no Litoral Norte paulista com + de 450 cotas" },
  { value: "5★", label: "avaliação média" },
];

const INCLUDED = [
  "Manutenção preventiva e corretiva",
  "Limpeza completa antes e após cada uso",
  "Seguro total da embarcação",
  "Acesso exclusivo ao GIU, benefício exclusivo para cotistas Boatlux, para você navegar em mais de 80 marinas nacionais e internacionais",
  "Suporte 24h em casos de emergência",
  "App para agendamentos e reservas",
];

const HOW_IT_WORKS = [
  {
    step: "01",
    title: "Escolha sua cota",
    desc: "Entre em contato com nossa equipe e apresentamos as cotas disponíveis para a NX 340 Sport Coupé.",
  },
  {
    step: "02",
    title: "Reserve seus dias",
    desc: "Pelo nosso aplicativo, escolha as datas que desejar dentro do seu calendário de uso mensal.",
  },
  {
    step: "03",
    title: "Chegue e aproveite",
    desc: "A embarcação estará limpa, abastecida e pronta para zarpar. Apenas traga seus convidados.",
  },
  {
    step: "04",
    title: "Nós cuidamos do resto",
    desc: "Manutenção, seguro, limpeza e burocracia ficam por nossa conta. 100% sem preocupação.",
  },
];

const TESTIMONIALS = [
  {
    name: "TODO: Nome do cliente",
    city: "TODO: Cidade, SP",
    text: "TODO: depoimento real de cliente. Ex: 'Ter a cota da NX 340 foi a melhor decisão que tomei. Uso todo fim de semana e não me preocupo com nada.'",
    initials: "TC",
  },
  {
    name: "TODO: Nome do cliente",
    city: "TODO: Cidade, SP",
    text: "TODO: depoimento real de cliente. Ex: 'A equipe da BOATLUX é incrível. Sempre que precisei de suporte, foram super rápidos e atenciosos.'",
    initials: "TC",
  },
  {
    name: "TODO: Nome do cliente",
    city: "TODO: Cidade, SP",
    text: "TODO: depoimento real de cliente. Ex: 'Pensei que seria mais complicado, mas o processo foi simples e transparente do início ao fim.'",
    initials: "TC",
  },
];

const FAQ = [
  {
    q: "O que é exatamente uma cota náutica?",
    a: "Uma cota náutica é a aquisição de uma fração de uma embarcação. Você tem direito de uso garantido por contrato, sem precisar arcar com todos os custos de propriedade integral: seguro, manutenção, marinheiro e guarda.",
  },
  {
    q: "Quantos dias por mês posso usar a embarcação?",
    a: "TODO: resposta real. Ex: 'Dependendo do modelo de cota escolhido, o uso varia de X a Y dias por mês, distribuídos conforme o calendário compartilhado entre os cotistas.'",
  },
  {
    q: "E se a embarcação precisar de manutenção no meu dia reservado?",
    a: "Nesse caso, remarcamos sua data sem qualquer custo adicional. Nossa equipe realiza manutenção preventiva regular justamente para evitar esse tipo de situação.",
  },
  {
    q: "Posso levar convidados a bordo?",
    a: "TODO: resposta real. Ex: 'Sim. A embarcação comporta até X pessoas. Você pode levar família e amigos normalmente dentro da capacidade máxima.'",
  },
  {
    q: "Como funciona o processo de compra da cota?",
    a: "É simples: você entra em contato com nossa equipe, apresentamos as condições disponíveis, você escolhe o plano que faz mais sentido e assinamos o contrato. Todo o processo é transparente e seguro.",
  },
  {
    q: "A cota é uma boa alternativa à compra do barco completo?",
    a: "Para quem usa o barco nos fins de semana e feriados, a cota costuma ser muito mais vantajosa. Você tem acesso a uma embarcação de alto padrão pagando uma fração do valor, com todos os custos fixos já incluídos.",
  },
];

// ─── Componentes internos ─────────────────────────────────────────────────────

function CheckIcon() {
  return (
    <svg className="w-5 h-5 text-gold-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
    </svg>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function LPNx340Page() {
  return (
    <>
      {/* ── 1. HERO ─────────────────────────────────────────────────────────── */}
      <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-navy-950">
        {/* Background image */}
        <div className="absolute inset-0">
          <Image
            src={BOAT.images.hero}
            alt={BOAT.name}
            fill
            className="object-cover object-center opacity-75"
            priority
          />
          {/* Overlay uniforme leve para contraste do texto */}
          <div className="absolute inset-0 bg-navy-950/45" />
          {/* Gradiente suave só no rodapé para transição de seção */}
          <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-navy-950 to-transparent" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full text-center">
          <span className="inline-block bg-gold-500/20 text-gold-400 text-xs font-semibold uppercase tracking-widest px-4 py-1.5 rounded-full border border-gold-500/30 mb-6">
            Cota Exclusiva · Litoral Norte Paulista
          </span>
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-cream-100 leading-tight mb-4 drop-shadow-[0_2px_12px_rgba(0,0,0,0.8)]">
            {BOAT.name}
          </h1>
          <p className="text-gold-400 font-display text-xl md:text-2xl italic mb-6 drop-shadow-[0_1px_8px_rgba(0,0,0,0.9)]">
            {BOAT.tagline}
          </p>
          <p className="text-cream-400 text-lg leading-relaxed mb-10 max-w-2xl mx-auto drop-shadow-[0_1px_6px_rgba(0,0,0,0.9)]">
            A NX 340 Sport Coupé combina sofisticação, performance e conforto em uma embarcação pensada para transformar cada saída no mar em uma experiência 
            exclusiva. Com design imponente, espaços amplos e acabamento premium, ela entrega o equilíbrio perfeito entre lazer, elegância e liberdade para aproveitar 
            o melhor de Ubatuba. 
          </p>

          <div className="flex flex-wrap justify-center gap-4 text-sm text-cream-500 mb-10">
            {["Sem compromisso", "Resposta em até 1h", "Processo 100% transparente"].map((t) => (
              <span key={t} className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-gold-500 flex-shrink-0" />
                {t}
              </span>
            ))}
          </div>

          <a
            href="#formulario"
            className="inline-block bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-8 py-4 rounded-xl text-sm transition-colors"
          >
            Quero saber mais sobre a cota
          </a>
        </div>
      </section>

      {/* ── 2. NÚMEROS ──────────────────────────────────────────────────────── */}
      <section className="bg-navy-900 border-y border-navy-800 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {STATS.map((s) => (
              <div key={s.label}>
                <p className="font-display text-4xl font-bold text-gold-400 mb-1">{s.value}</p>
                <p className="text-cream-500 text-sm uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 3. APRESENTAÇÃO DA EMBARCAÇÃO ───────────────────────────────────── */}
      <section className="py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Image */}
            <div className="relative">
              <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
                <Image
                  src={BOAT.images.gallery1}
                  alt={`${BOAT.name} visão lateral`}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Accent image */}
              <div className="absolute -bottom-6 -right-6 w-48 h-32 rounded-xl overflow-hidden border-2 border-navy-700 hidden md:block">
                <Image
                  src={BOAT.images.interior}
                  alt={`${BOAT.name} interior`}
                  fill
                  className="object-cover"
                />
              </div>
            </div>

            {/* Copy */}
            <div>
              <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-4">
                A embarcação
              </p>
              <h2 className="font-display text-4xl font-bold text-cream-100 mb-4">
                Conheça a {BOAT.name}
              </h2>
              <div className="w-12 h-0.5 bg-gold-500 mb-6" />
              <p className="text-cream-400 leading-relaxed mb-8">
                {BOAT.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {BOAT.highlights.map((h) => (
                  <div key={h.title} className="flex gap-3">
                    <span className="text-gold-500 font-bold text-lg flex-shrink-0">{h.icon}</span>
                    <div>
                      <p className="text-cream-200 font-semibold text-sm mb-0.5">{h.title}</p>
                      <p className="text-cream-500 text-xs leading-relaxed">{h.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 4. ESPECIFICAÇÕES ───────────────────────────────────────────────── */}
      <section className="py-20 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Ficha técnica
            </p>
            <h2 className="font-display text-4xl font-bold text-cream-100">
              Especificações
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
            {BOAT.specs.map((s) => (
              <div
                key={s.label}
                className="bg-navy-800 border border-navy-700 rounded-xl p-7 text-center"
              >
                <p className="font-display text-2xl font-bold text-gold-400 mb-2">{s.value}</p>
                <p className="text-cream-500 text-sm uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Galeria adicional */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-10">
            {[BOAT.images.gallery2, BOAT.images.gallery3, BOAT.images.gallery1].map((src, i) => (
              <div key={i} className="relative aspect-video rounded-xl overflow-hidden">
                <Image
                  src={src}
                  alt={`${BOAT.name} foto ${i + 1}`}
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. O QUE ESTÁ INCLUÍDO ──────────────────────────────────────────── */}
      <section className="py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-4">
                Tudo incluído
              </p>
              <h2 className="font-display text-4xl font-bold text-cream-100 mb-4">
                Zero preocupação
              </h2>
              <div className="w-12 h-0.5 bg-gold-500 mb-6" />
              <p className="text-cream-400 leading-relaxed mb-8">
                Com a Boatlux, você tem o serviço de gestão completa da embarcação, 
                com a economia do seu tempo na rotina de manutenções, limpeza e organização. 
                Sua única preocupação é curtir o seu bem.
              </p>

              <ul className="space-y-3">
                {INCLUDED.map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckIcon />
                    <span className="text-cream-300 text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-[4/5] rounded-2xl overflow-hidden">
              <Image
                src={BOAT.images.interior}
                alt={`${BOAT.name} interior luxuoso`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-950/60 to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. COMO FUNCIONA ────────────────────────────────────────────────── */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Simples assim
            </p>
            <h2 className="font-display text-4xl font-bold text-cream-100">
              Como funciona
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {HOW_IT_WORKS.map((step, i) => (
              <div key={step.step} className="relative">
                {/* Connector line */}
                {i < HOW_IT_WORKS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(100%_-_16px)] w-8 h-px bg-navy-700 z-10" />
                )}
                <div className="bg-navy-800 border border-navy-700 rounded-2xl p-6 h-full">
                  <span className="font-display text-5xl font-bold text-gold-500/20 leading-none block mb-4">
                    {step.step}
                  </span>
                  <h3 className="font-display text-lg font-semibold text-cream-100 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-cream-500 text-sm leading-relaxed">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. DEPOIMENTOS ──────────────────────────────────────────────────── */}
      <section className="py-24 bg-navy-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Quem já navega com a gente
            </p>
            <h2 className="font-display text-4xl font-bold text-cream-100">
              O que dizem nossos cotistas
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t) => (
              <div
                key={t.name}
                className="bg-navy-800 border border-navy-700 rounded-2xl p-7 flex flex-col gap-5"
              >
                {/* Stars */}
                <div className="flex gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <span key={i} className="text-gold-500 text-sm">★</span>
                  ))}
                </div>
                <p className="text-cream-400 text-sm leading-relaxed flex-1">&ldquo;{t.text}&rdquo;</p>
                <div className="flex items-center gap-3 pt-2 border-t border-navy-700">
                  <div className="w-10 h-10 rounded-full bg-gold-500/20 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-gold-400 font-semibold text-xs">{t.initials}</span>
                  </div>
                  <div>
                    <p className="text-cream-200 font-semibold text-sm">{t.name}</p>
                    <p className="text-cream-600 text-xs">{t.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 8. FAQ ──────────────────────────────────────────────────────────── */}
      <section className="py-24 bg-navy-900">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-3">
              Tire suas dúvidas
            </p>
            <h2 className="font-display text-4xl font-bold text-cream-100">
              Perguntas frequentes
            </h2>
          </div>

          <div className="space-y-4">
            {FAQ.map((item) => (
              <details
                key={item.q}
                className="group bg-navy-800 border border-navy-700 rounded-xl overflow-hidden"
              >
                <summary className="flex items-center justify-between gap-4 p-6 cursor-pointer list-none">
                  <span className="text-cream-200 font-semibold text-sm">{item.q}</span>
                  <span className="text-gold-500 flex-shrink-0 text-lg group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-6 text-cream-400 text-sm leading-relaxed border-t border-navy-700 pt-4">
                  {item.a}
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ── 9. CTA FINAL ────────────────────────────────────────────────────── */}
      <section id="formulario" className="py-24 bg-navy-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(201,168,76,0.06)_0%,_transparent_70%)]" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            {/* Copy */}
            <div>
              <span className="inline-flex items-center gap-2 bg-red-500/10 text-red-400 border border-red-500/20 text-xs font-semibold px-4 py-1.5 rounded-full mb-6">
                <span className="w-2 h-2 rounded-full bg-red-400 animate-pulse" />
                TODO: últimas X cotas disponíveis
              </span>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-cream-100 mb-6 leading-tight">
                Sua cota na{" "}
                <span className="text-gold-400">{BOAT.name}</span>{" "}
                pode ser a última disponível
              </h2>
              <p className="text-cream-400 leading-relaxed mb-8">
                Preencha o formulário ao lado e um especialista da BOATLUX entrará
                em contato para apresentar todas as condições. É gratuito e sem
                compromisso.
              </p>

            </div>

            {/* Form */}
            <div className="bg-navy-800 border border-navy-700 rounded-2xl p-8 shadow-2xl">
              <h3 className="font-display text-2xl font-semibold text-cream-100 mb-1">
                Quero saber mais
              </h3>
              <p className="text-cream-500 text-sm mb-6">
                Respondemos em até 1 hora nos dias úteis.
              </p>
              <LPLeadForm />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
