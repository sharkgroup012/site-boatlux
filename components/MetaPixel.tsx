"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

// Pixel do site (lanchas). Dispara em todas as páginas, EXCETO em /dono-do-verao.
const PIXEL_ID = "1036080068178830";

// Pixel exclusivo do Dono do Verão (conta de anúncios separada).
// Se a variável não existir, /dono-do-verao não dispara pixel nenhum.
const DV_PIXEL_ID = process.env.NEXT_PUBLIC_DV_PIXEL_ID || "";
const DV_PATH = "/dono-do-verao";

function pixelParaRota(pathname: string): string {
  const isDV = pathname === DV_PATH || pathname.startsWith(DV_PATH + "/");
  return isDV ? DV_PIXEL_ID : PIXEL_ID;
}

export default function MetaPixel() {
  const pathname = usePathname();
  // O snippet abaixo já dispara o PageView do primeiro carregamento.
  // Este efeito só dispara quando a rota muda depois disso (navegação interna).
  const lastPath = useRef(pathname);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;

    const id = pixelParaRota(pathname);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const w = window as any;
    if (!id || typeof w.fbq !== "function") return;

    // Inicia o pixel da rota só quando for usado; trackSingle fala só com ele.
    w.__mpInit = w.__mpInit || {};
    if (!w.__mpInit[id]) {
      w.fbq("init", id);
      w.__mpInit[id] = true;
    }
    w.fbq("trackSingle", id, "PageView");
  }, [pathname]);

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');
var __p=location.pathname,__dv=__p==='${DV_PATH}'||__p.indexOf('${DV_PATH}/')===0,__id=__dv?${JSON.stringify(DV_PIXEL_ID)}:${JSON.stringify(PIXEL_ID)};
if(__id){window.__mpInit=window.__mpInit||{};window.__mpInit[__id]=true;fbq('init',__id);fbq('trackSingle',__id,'PageView');}`,
      }}
    />
  );
}
