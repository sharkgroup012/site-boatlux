"use client";
import Script from "next/script";
import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

const PIXEL_ID = "1036080068178830";

export default function MetaPixel() {
  const pathname = usePathname();
  // O snippet abaixo já dispara o PageView do primeiro carregamento.
  // Este efeito só dispara quando a rota muda depois disso (navegação interna).
  const lastPath = useRef(pathname);

  useEffect(() => {
    if (lastPath.current === pathname) return;
    lastPath.current = pathname;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (typeof window !== "undefined" && (window as any).fbq) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (window as any).fbq("track", "PageView");
    }
  }, [pathname]);

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `!function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,document,'script','https://connect.facebook.net/en_US/fbevents.js');fbq('init','${PIXEL_ID}');fbq('track','PageView');`,
      }}
    />
  );
}
