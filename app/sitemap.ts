import type { MetadataRoute } from "next";
import { site } from "@/data/content";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: `${site.url}/`, lastModified: site.lastUpdated, changeFrequency: "monthly", priority: 1 },
    { url: `${site.url}/research/`, lastModified: site.lastUpdated, changeFrequency: "monthly", priority: 0.8 },
    { url: `${site.url}/dashboard/`, lastModified: site.lastUpdated, changeFrequency: "monthly", priority: 0.7 },
  ];
}
