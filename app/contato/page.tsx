import type { Metadata } from "next";
import LeadForm from "@/components/LeadForm";

export const metadata: Metadata = {
  title: "Contato | BOATLUX® — Fale com um Especialista",
  description:
    "Entre em contato com a equipe BOATLUX®. Estamos prontos para apresentar as melhores opções de cotas náuticas para você.",
};

const contactInfo = [
  {
    icon: "📱",
    label: "WhatsApp",
    value: "(12) 99601-0000",
    href: "https://wa.me/5512996010000",
  },
  {
    icon: "✉️",
    label: "E-mail",
    value: "comercial@boatluxsp.com.br",
    href: "mailto:comercial@boatluxsp.com.br",
  },
  {
    icon: "📍",
    label: "Região de atuação",
    value: "Litoral Norte Paulista — SP",
    href: null,
  },
];

export default function ContatoPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_rgba(201,168,76,0.08)_0%,_transparent_60%)]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-4">
            Estamos aqui
          </p>
          <h1 className="font-display text-5xl md:text-6xl font-bold text-cream-100 mb-6">
            Fale com a BOATLUX®
          </h1>
          <p className="text-cream-400 text-lg max-w-2xl mx-auto">
            Nossa equipe de especialistas está pronta para apresentar as melhores
            opções de cotas náuticas para seu perfil e orçamento.
          </p>
        </div>
      </section>

      {/* Contact section */}
      <section className="pb-28">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
            {/* Left: info */}
            <div className="space-y-8">
              <div>
                <h2 className="font-display text-3xl font-bold text-cream-100 mb-4">
                  Como podemos ajudar?
                </h2>
                <div className="gold-line mb-6" />
                <p className="text-cream-400 leading-relaxed mb-6">
                  Seja para tirar dúvidas sobre o funcionamento das cotas,
                  escolher a embarcação ideal ou iniciar o processo de compra —
                  estamos à disposição. O primeiro contato é sempre gratuito e
                  sem compromisso.
                </p>
              </div>

              {/* Contact cards */}
              <div className="space-y-3">
                {contactInfo.map((c) =>
                  c.href ? (
                    <a
                      key={c.label}
                      href={c.href}
                      target={c.href.startsWith("http") ? "_blank" : undefined}
                      rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-4 bg-navy-800 border border-navy-700 hover:border-gold-500/40 rounded-xl p-4 transition-colors group"
                    >
                      <span className="text-2xl">{c.icon}</span>
                      <div>
                        <p className="text-cream-500 text-xs uppercase tracking-wide mb-0.5">
                          {c.label}
                        </p>
                        <p className="text-cream-200 font-medium group-hover:text-gold-400 transition-colors">
                          {c.value}
                        </p>
                      </div>
                    </a>
                  ) : (
                    <div
                      key={c.label}
                      className="flex items-center gap-4 bg-navy-800 border border-navy-700 rounded-xl p-4"
                    >
                      <span className="text-2xl">{c.icon}</span>
                      <div>
                        <p className="text-cream-500 text-xs uppercase tracking-wide mb-0.5">
                          {c.label}
                        </p>
                        <p className="text-cream-200 font-medium">{c.value}</p>
                      </div>
                    </div>
                  )
                )}
              </div>

              {/* WhatsApp CTA */}
              <div className="bg-navy-800 border border-navy-700 rounded-xl p-6 space-y-3">
                <h3 className="font-display text-xl font-semibold text-cream-100">
                  Prefere falar agora?
                </h3>
                <p className="text-cream-400 text-sm">
                  Nosso WhatsApp costuma ter resposta imediata em horário
                  comercial.
                </p>
                <a
                  href="https://wa.me/5512996010000?text=Ol%C3%A1%2C+vim+do+site+e+gostaria+de+saber+mais+sobre+as+cotas."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 bg-[#25D366] hover:bg-[#20b85a] text-white font-semibold px-6 py-3 rounded-full text-sm transition-colors"
                >
                  <WaIcon />
                  Abrir WhatsApp
                </a>
              </div>

              {/* Redes sociais */}
              <div>
                <p className="text-cream-500 text-xs uppercase tracking-widest mb-3">
                  Redes sociais
                </p>
                <div className="flex gap-3">
                  {[
                    { label: "Instagram", href: "https://www.instagram.com/boatlux.litoralnortesp" },
                    { label: "Facebook", href: "https://www.facebook.com/boatlux.litoralnortesp" },
                    { label: "YouTube", href: "https://www.youtube.com/@boatluxlitoralnortesp9068" },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-2 border border-navy-600 text-cream-400 hover:text-gold-400 hover:border-gold-500 rounded-full text-xs transition-colors"
                    >
                      {s.label}
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: form */}
            <div className="bg-navy-800 rounded-2xl border border-navy-700 p-8">
              <h3 className="font-display text-2xl font-semibold text-cream-100 mb-2">
                Solicite uma consultoria
              </h3>
              <p className="text-cream-400 text-sm mb-6">
                Gratuita e sem compromisso. Respondemos em até 1 hora.
              </p>
              <LeadForm source="contato" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function WaIcon() {
  return (
    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}
