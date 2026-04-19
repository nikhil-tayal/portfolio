import type { MetadataRoute } from "next";
import { getAllShowcases } from "@/lib/data";
import { SITE_URL } from "@/app/layout";

export default function sitemap(): MetadataRoute.Sitemap {
  const showcases = getAllShowcases().map(({ item }) => ({
    url: `${SITE_URL}/showcase/${item.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...showcases,
  ];
}
