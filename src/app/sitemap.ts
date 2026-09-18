import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/site";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return [
    {
      url: `${SITE_URL}/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 1,
      alternates: { languages: { en: `${SITE_URL}/`, fa: `${SITE_URL}/fa/` } },
    },
    {
      url: `${SITE_URL}/fa/`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.9,
      alternates: { languages: { en: `${SITE_URL}/`, fa: `${SITE_URL}/fa/` } },
    },
    { url: `${SITE_URL}/cv/`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
