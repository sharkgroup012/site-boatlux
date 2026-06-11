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
    <nav className="bg-gray-900 border-b border-gray-800 px-6 py-4 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <Image src="/images/logo_white.png" alt="Boatlux" width={120} height={32} className="h-8 w-auto" />
        <div className="flex gap-1">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                pathname.startsWith(link.href)
                  ? "bg-gray-800 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-4">
        <Link
          href="/"
          target="_blank"
          className="text-gray-400 hover:text-white text-xs transition-colors"
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
    </nav>
  );
}
