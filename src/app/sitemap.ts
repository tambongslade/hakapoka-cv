import type { MetadataRoute } from "next";
import { getLivePublications, liveDate } from "@/lib/store";
import { abs } from "@/lib/site";

export const dynamic = "force-dynamic";

const PAGES: [string, number][] = [
  ["/", 1],
  ["/publications", 0.9],
  ["/a-propos", 0.8],
  ["/intelligence-economique", 0.8],
  ["/economie-strategique", 0.8],
  ["/geopolitique-prospective", 0.8],
  ["/medias", 0.6],
  ["/evenements", 0.6],
  ["/lexique", 0.7],
  ["/contact", 0.5],
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const pubs = (await getLivePublications()).filter((p) => !p.demo);
  const latest = pubs[0] ? new Date(liveDate(pubs[0])) : new Date();
  return [
    ...PAGES.map(([path, priority]) => ({ url: abs(path), lastModified: latest, changeFrequency: "weekly" as const, priority })),
    ...pubs.map((p) => ({
      url: abs(`/publications/${p.slug}`),
      lastModified: new Date(p.updatedAt),
      changeFrequency: "monthly" as const,
      priority: 0.7,
      ...(p.cover ? { images: [p.cover.startsWith("http") ? p.cover : abs(p.cover)] } : {}),
    })),
  ];
}
