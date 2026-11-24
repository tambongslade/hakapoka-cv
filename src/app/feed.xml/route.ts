import { getLivePublications, liveDate } from "@/lib/store";
import { SITE, abs } from "@/lib/site";

export const dynamic = "force-dynamic";

const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export async function GET() {
  const pubs = (await getLivePublications()).filter((p) => !p.demo).slice(0, 50);
  const items = pubs
    .map(
      (p) => `    <item>
      <title>${esc(p.title)}</title>
      <link>${abs(`/publications/${p.slug}`)}</link>
      <guid isPermaLink="true">${abs(`/publications/${p.slug}`)}</guid>
      <pubDate>${new Date(liveDate(p)).toUTCString()}</pubDate>
      <dc:creator>Hermann Hakapoka</dc:creator>
      <category>${esc(p.category)}</category>
      <description>${esc(p.summary)}</description>
    </item>`,
    )
    .join("\n");

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/">
  <channel>
    <title>${esc(`Publications — ${SITE.name}`)}</title>
    <link>${abs("/publications")}</link>
    <atom:link href="${abs("/feed.xml")}" rel="self" type="application/rss+xml" />
    <description>${esc(SITE.description)}</description>
    <language>fr-FR</language>
${items}
  </channel>
</rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=600" } });
}
