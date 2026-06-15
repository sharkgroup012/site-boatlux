import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

export default function LPLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* LP Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-navy-950/95 backdrop-blur-sm border-b border-navy-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Image
            src="/images/logo_white.png"
            alt="BOATLUX®"
            width={150}
            height={50}
            className="h-10 w-auto object-contain"
          />
          <a
            href="tel:+5512991198268"
            className="text-cream-300 hover:text-gold-400 text-sm transition-colors"
          >
            (12) 99119-8268
          </a>
        </div>
      </header>

      <main className="pt-16">{children}</main>

      {/* LP Footer */}
      <footer className="bg-navy-950 border-t border-navy-800 py-8 text-center">
        <p className="text-cream-600 text-xs">
          © {new Date().getFullYear()} BOATLUX® · Todos os direitos reservados ·{" "}
          <a href="/politica" className="hover:text-gold-400 transition-colors underline underline-offset-2">
            Política de Privacidade
          </a>
        </p>
      </footer>
    </>
  );
}
