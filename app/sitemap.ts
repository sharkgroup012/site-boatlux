import type { MetadataRoute } from "next";
import { getBoatSlugs } from "@/lib/boats";

const BASE_URL = "https://www.boatluxsp.com.br";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getBoatSlugs();

  const boatUrls: MetadataRoute.Sitemap = slugs.map((slug) => ({
    url: `${BASE_URL}/embarcacoes/${slug}`,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [
    {
      url: BASE_URL,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/cotas`,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/contato`,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/sobre`,
      changeFrequency: "yearly",
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/politica`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    ...boatUrls,
  ];
}
