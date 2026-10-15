import type { Metadata } from "next";
import Image from "next/image";
import { BASE_URL, OG_DEFAULT } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Dono do Verão | BOATLUX®",
  description:
    "Placar de cotas de moto aquática no Litoral Norte: veja as cotas restantes por grupo, valores e condições.",
  robots: { index: false, follow: false },
  openGraph: {
    title: "Dono do Verão | BOATLUX®",
    description:
      "Veja as cotas restantes por grupo, valores e condições. Curso de Motonauta incluído.",
    url: `${BASE_URL}/dono-do-verao`,
    siteName: "BOATLUX®",
    type: "website",
    locale: "pt_BR",
    images: [OG_DEFAULT],
  },
};

export default function DonoDoVeraoLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy-950/95 backdrop-blur-sm border-b border-navy-800">
        <div className="max-w-3xl mx-auto px-4 h-14 flex items-center justify-center">
          <Image
            src="/images/logo_white.png"
            alt="BOATLUX®"
            width={150}
            height={50}
            priority
            className="h-9 w-auto object-contain"
          />
        </div>
      </header>

      <main className="pt-14 min-h-screen">{children}</main>

      <footer className="bg-navy-950 border-t border-navy-800 py-6 text-center">
        <p className="text-cream-500 text-xs px-4">
          © {new Date().getFullYear()} BOATLUX® · Todos os direitos reservados ·{" "}
          <a href="/politica" className="hover:text-gold-400 transition-colors underline underline-offset-2">
            Política de Privacidade
          </a>
        </p>
      </footer>
    </>
  );
}
