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
        {/* LocalBusiness Schema */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "BOATLUX®",
              "description": "A maior empresa de cotas náuticas do Brasil. Lanchas e jet skis em sistema de cotas no Litoral Norte Paulista — Ubatuba, Caraguatatuba, São Sebastião e Ilhabela.",
              "url": "https://www.boatluxsp.com.br",
              "telephone": "+5512991198268",
              "email": "comercial@boatluxsp.com.br",
              "foundingDate": "2011",
              "taxID": "39.287.616/0001-20",
              "logo": "https://www.boatluxsp.com.br/images/logo_white.png",
              "image": "https://www.boatluxsp.com.br/images/og-default.jpg",
              "priceRange": "$$$$",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Av. Manoel Hipólito do Rêgo, 969",
                "addressLocality": "São Sebastião",
                "addressRegion": "SP",
                "postalCode": "11606-100",
                "addressCountry": "BR"
              },
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.4",
                "reviewCount": "19",
                "bestRating": "5",
                "worstRating": "1"
              },
              "openingHoursSpecification": [
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday"],
                  "opens": "09:00",
                  "closes": "18:00"
                },
                {
                  "@type": "OpeningHoursSpecification",
                  "dayOfWeek": "Friday",
                  "opens": "09:00",
                  "closes": "17:00"
                }
              ],
              "sameAs": [
                "https://www.instagram.com/boatlux.litoralnortesp",
                "https://www.facebook.com/boatlux.litoralnortesp",
                "https://www.youtube.com/@boatluxlitoralnortesp9068",
                "https://www.linkedin.com/company/boatlux-litoral-norte-sp"
              ]
            })
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
