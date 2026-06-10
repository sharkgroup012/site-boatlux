"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase";

const navLinks = [
  { href: "/", label: "Início" },
  { href: "/sobre", label: "Sobre" },
  { href: "/cotas", label: "Cotas Disponíveis" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const supabase = createSupabaseBrowser();
    supabase.auth.getUser().then(({ data }) => setIsAdmin(!!data.user));
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_, session) => {
      setIsAdmin(!!session?.user);
    });
    return () => subscription.unsubscribe();
  }, []);

  async function handleLogout() {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    setIsAdmin(false);
    router.refresh();
  }

  const isTransparent = isHome && !scrolled && !menuOpen;

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        isTransparent
          ? "bg-transparent"
          : "bg-navy-950/95 backdrop-blur-sm border-b border-navy-700"
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-18 py-3">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <Image
            src="/images/logo_white.png"
            alt="BOATLUX®"
            width={150}
            height={50}
            className="h-12 w-auto object-contain"
            priority
          />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                pathname === link.href
                  ? "text-gold-500"
                  : "text-cream-300 hover:text-gold-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* CTA + admin */}
        <div className="hidden md:flex items-center gap-3">
          {isAdmin ? (
            <>
              <Link
                href="/admin"
                className="text-xs text-gold-500 hover:text-gold-400 font-medium transition-colors"
              >
                Painel Admin
              </Link>
              <button
                onClick={handleLogout}
                className="text-xs text-cream-500 hover:text-red-400 transition-colors"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              href="/admin/login"
              className="inline-flex items-center gap-1.5 text-xs text-cream-400 hover:text-gold-400 border border-cream-400/20 hover:border-gold-400/40 px-3 py-1.5 rounded-full transition-colors"
            >
              <LockIcon />
              Área Restrita
            </Link>
          )}
          <a
            href="https://wa.me/5512996010000?text=Ol%C3%A1%2C+vim+do+site+e+gostaria+de+saber+mais+sobre+as+cotas."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 text-sm font-semibold px-5 py-2.5 rounded-full transition-colors duration-200"
          >
            <WhatsAppIcon className="w-4 h-4" />
            Falar com Especialista
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden p-2 text-cream-200 hover:text-gold-400 transition-colors"
          aria-label="Abrir menu"
        >
          {menuOpen ? <XIcon /> : <MenuIcon />}
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-navy-950 border-t border-navy-700 px-4 pb-6 pt-4 space-y-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={`block text-base font-medium py-2 border-b border-navy-700 transition-colors ${
                pathname === link.href ? "text-gold-500" : "text-cream-300 hover:text-gold-400"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <a
            href="https://wa.me/5512996010000?text=Ol%C3%A1%2C+vim+do+site+e+gostaria+de+saber+mais+sobre+as+cotas."
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-gold-500 hover:bg-gold-400 text-navy-950 font-semibold px-6 py-3 rounded-full transition-colors mt-4"
          >
            <WhatsAppIcon className="w-5 h-5" />
            Falar com Especialista
          </a>
          {isAdmin ? (
            <div className="flex items-center justify-between pt-2">
              <Link href="/admin" onClick={() => setMenuOpen(false)} className="text-xs text-gold-500 font-medium">
                Painel Admin
              </Link>
              <button onClick={handleLogout} className="text-xs text-cream-500 hover:text-red-400 transition-colors">
                Sair
              </button>
            </div>
          ) : (
            <Link
              href="/admin/login"
              onClick={() => setMenuOpen(false)}
              className="block text-center text-xs text-cream-600 hover:text-cream-400 pt-2 transition-colors"
            >
              Área Restrita
            </Link>
          )}
        </div>
      )}
    </header>
  );
}

function LockIcon() {
  return (
    <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  );
}
