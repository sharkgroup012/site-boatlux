import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import SiteShell from "@/components/SiteShell";
import MetaPixel from "@/components/MetaPixel";
import { BASE_URL, OG_DEFAULT } from "@/lib/constants";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BOATLUX® | Cotas Náuticas | Litoral Norte SP",
  description:
    "A maior empresa de cotas náuticas do Brasil. Navegue com exclusividade em Ubatuba, Caraguatatuba, São Sebastião e Ilhabela sem os custos de ser dono.",
  keywords: "cotas náuticas, lancha, jet ski, litoral norte sp, ubatuba, boatlux",
  metadataBase: new URL(BASE_URL),
  openGraph: {
    title: "BOATLUX® | Cotas Náuticas | Litoral Norte SP",
    description:
      "A maior empresa de cotas náuticas do Brasil. Navegue com exclusividade no Litoral Norte Paulista sem os custos de ser dono.",
    url: BASE_URL,
    siteName: "BOATLUX®",
    type: "website",
    locale: "pt_BR",
    images: [OG_DEFAULT],
  },
  twitter: {
    card: "summary_large_image",
    title: "BOATLUX® | Cotas Náuticas | Litoral Norte SP",
    description:
      "A maior empresa de cotas náuticas do Brasil. Navegue com exclusividade no Litoral Norte Paulista.",
    images: [OG_DEFAULT.url],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={montserrat.variable}>
      <head>
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-5LGGXFS4');`,
          }}
        />
      </head>
      <body className="bg-navy-900 text-cream-200 font-sans antialiased">
        {/* GTM noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5LGGXFS4"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        <MetaPixel />
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
