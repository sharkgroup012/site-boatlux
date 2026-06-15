import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getBoatBySlug, getBoatSlugs } from "@/lib/boats";
import { BASE_URL } from "@/lib/constants";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  const slugs = await getBoatSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const boat = await getBoatBySlug(slug);
  if (!boat) return { title: "Embarcação não encontrada | BOATLUX®" };

  const pageUrl = `${BASE_URL}/embarcacoes/${slug}`;
  const ogImage = boat.images[0]
    ? { url: boat.images[0], width: 1200, height: 630, alt: boat.name }
    : undefined;

  return {
    title: `${boat.name} | BOATLUX® Cotas Náuticas`,
    description: boat.description,
    openGraph: {
      title: `${boat.name} | Cota Náutica`,
      description: boat.description,
      url: pageUrl,
      type: "website",
      images: ogImage ? [ogImage] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: `${boat.name} | BOATLUX®`,
      description: boat.description,
      images: ogImage ? [ogImage.url] : undefined,
    },
  };
}

export default async function EmbarcacaoPage({ params }: Props) {
  const { slug } = await params;
  const boat = await getBoatBySlug(slug);
  if (!boat) notFound();

  const specEntries = Object.entries(boat.specs).filter(([, v]) => v);

  const specLabels: Record<string, string> = {
    comprimento: "Comprimento",
    motor: "Motor",
    capacidade: "Capacidade",
    ano: "Ano",
    potencia: "Potência",
  };

  return (
    <>
      {/* Hero image */}
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <Image
          src={boat.images[0]}
          alt={boat.name}
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-navy-950 via-navy-950/40 to-navy-950/20" />

        {/* Breadcrumb */}
        <div className="absolute top-24 left-0 right-0 px-4">
          <div className="max-w-7xl mx-auto">
            <nav className="flex items-center gap-2 text-xs text-cream-500">
              <Link href="/" className="hover:text-gold-400 transition-colors">
                Início
              </Link>
              <span>/</span>
              <Link href="/cotas" className="hover:text-gold-400 transition-colors">
                Cotas
              </Link>
              <span>/</span>
              <span className="text-cream-300">{boat.name}</span>
            </nav>
          </div>
        </div>

        {/* Title overlay */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-10">
          <div className="max-w-7xl mx-auto">
            <span className="inline-block bg-gold-500/90 text-navy-950 text-xs font-semibold px-3 py-1 rounded-full mb-3 capitalize">
              {boat.type === "lancha" ? "Lancha" : "Jet Ski"}
            </span>
            <h1 className="font-display text-4xl md:text-6xl font-bold text-cream-100">
              {boat.name}
            </h1>
            <p className="text-cream-400 mt-1">{boat.location}</p>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 lg:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Left: details */}
            <div className="lg:col-span-2 space-y-10">
              {/* Description */}
              <div>
                <h2 className="font-display text-2xl font-semibold text-cream-100 mb-4">
                  Sobre esta embarcação
                </h2>
                <div className="gold-line mb-5" />
                <p className="text-cream-400 leading-relaxed text-base">{boat.description}</p>
              </div>

              {/* Specs */}
              <div>
                <h2 className="font-display text-2xl font-semibold text-cream-100 mb-5">
                  Especificações
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {specEntries.map(([key, value]) => (
                    <div
                      key={key}
                      className="bg-navy-800 border border-navy-700 rounded-xl p-4 text-center"
                    >
                      <p className="text-gold-500 font-semibold text-lg mb-1">{value}</p>
                      <p className="text-cream-500 text-xs uppercase tracking-wide">
                        {specLabels[key] ?? key}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Image gallery */}
              {boat.images.length > 1 && (
                <div>
                  <h2 className="font-display text-2xl font-semibold text-cream-100 mb-5">
                    Galeria
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {boat.images.slice(1).map((img, i) => (
                      <div
                        key={i}
                        className="relative aspect-video rounded-xl overflow-hidden"
                      >
                        <Image
                          src={img}
                          alt={`${boat.name} foto ${i + 2}`}
                          fill
                          className="object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Included */}
              <div>
                <h2 className="font-display text-2xl font-semibold text-cream-100 mb-5">
                  O que está incluído na cota
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {[
                    "Manutenção preventiva e corretiva",
                    "Limpeza completa antes e após cada uso",
                    "Seguro total da embarcação",
                    "Cobertura pelo sistema GNU em todo o Brasil",
                    "Suporte 24h em casos de emergência",
                    "App para agendamentos e reservas",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-3">
                      <span className="text-gold-500 mt-0.5 flex-shrink-0">✓</span>
                      <span className="text-cream-400 text-sm">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: CTA sticky sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-28 bg-navy-800 border border-navy-700 rounded-2xl p-6 space-y-5">
                <div>
                  <p className="text-gold-500 text-xs font-semibold uppercase tracking-widest mb-2">
                    Cota disponível
                  </p>
                  <h3 className="font-display text-2xl font-semibold text-cream-100">
                    {boat.name}
                  </h3>
                  <p className="text-cream-500 text-sm mt-1">{boat.location}</p>
                </div>

                <div className="gold-line" />

                {boat.quota_price ? (
                  <div>
                    <p className="text-cream-500 text-xs uppercase tracking-wide mb-1">
                      Valor da cota
                    </p>
                    <p className="font-display text-3xl font-bold text-gold-400">
                      {boat.quota_price.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                        maximumFractionDigits: 0,
                      })}
                    </p>
                    {boat.quota_available !== undefined && boat.quota_available > 0 && (
                      <p className="text-cream-500 text-xs mt-1">
                        {boat.quota_available} {boat.quota_available === 1 ? "cota disponível" : "cotas disponíveis"}
                      </p>
                    )}
                  </div>
                ) : (
                  <p className="text-cream-400 text-sm leading-relaxed">
                    Consulte-nos sobre valores e disponibilidade desta embarcação.
                  </p>
                )}

                <a
                  href={`https://wa.me/5512991198268?text=Ol%C3%A1%2C+gostaria+de+saber+mais+sobre+a+cota+da+${encodeURIComponent(boat.name)}.+Pode+me+passar+mais+detalhes%3F`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2.5 w-full bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-6 py-3.5 rounded-xl text-sm transition-colors"
                >
                  <WaIcon />
                  Saber mais sobre esta cota
                </a>

                <Link
                  href="/cotas"
                  className="block text-center text-cream-500 hover:text-cream-300 text-xs transition-colors"
                >
                  ← Ver outras embarcações
                </Link>
              </div>
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
