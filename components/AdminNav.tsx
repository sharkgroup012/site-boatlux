"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname, useRouter } from "next/navigation";
import { createSupabaseBrowser } from "@/lib/supabase";

export default function AdminNav() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createSupabaseBrowser();
    await supabase.auth.signOut();
    router.push("/admin/login");
    router.refresh();
  }

  const links = [
    { href: "/admin/leads", label: "Leads" },
    { href: "/admin/embarcacoes", label: "Embarcações" },
  ];

  return (
    <nav className="bg-gray-900 border-b border-gray-800 px-4 sm:px-6 py-3">
      {/* Row 1: logo + actions */}
      <div className="flex items-center justify-between">
        <Image src="/images/logo_white.png" alt="Boatlux" width={120} height={32} className="h-7 sm:h-8 w-auto" />
        <div className="flex items-center gap-3 sm:gap-4">
          <Link
            href="/"
            target="_blank"
            className="text-gray-400 hover:text-white text-xs transition-colors hidden sm:inline"
          >
            Ver site →
          </Link>
          <button
            onClick={handleLogout}
            className="text-gray-400 hover:text-red-400 text-xs transition-colors"
          >
            Sair
          </button>
        </div>
      </div>
      {/* Row 2: nav links */}
      <div className="flex gap-1 mt-3">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-colors ${
              pathname.startsWith(link.href)
                ? "bg-gray-800 text-white"
                : "text-gray-400 hover:text-white"
            }`}
          >
            {link.label}
          </Link>
        ))}
        <Link
          href="/"
          target="_blank"
          className="sm:hidden ml-auto px-3 py-1.5 text-xs text-gray-400 hover:text-white transition-colors"
        >
          Ver site →
        </Link>
      </div>
    </nav>
  );
}
