import { getLivePublications } from "@/lib/store";
import { THEMES } from "@/lib/content";
import { SITE, abs } from "@/lib/site";
import { typeLabel } from "@/lib/types";

export const dynamic = "force-dynamic";

// llms.txt (https://llmstxt.org): a plain-Markdown map of the site for AI assistants and answer engines.
export async function GET() {
  const pubs = (await getLivePublications()).filter((p) => !p.demo);
  const themes = Object.values(THEMES);

  const body = `# ${SITE.name} — ${SITE.tagline}

> ${SITE.description}

Hermann Hakapoka est un spécialiste camerounais de l'intelligence économique et de la stratégie. Formé à l'ENAM de Yaoundé (division des régies financières) et issu de l'administration financière publique (Inspecteur principal des régies financières), il est diplômé du MBA Stratégie et Intelligence économique de l'École de Guerre Économique (Paris) et préside 2H International Consulting Group. Ses analyses portent sur la souveraineté économique, l'Afrique centrale et la CEMAC, la géopolitique des ressources et la prospective.

## Pages principales

- [À propos](${abs("/a-propos")}): parcours, expertise et approche de Hermann Hakapoka
${themes.map((t) => `- [${t.eyebrow}](${abs(`/${t.slug}`)}): ${t.lead}`).join("\n")}
- [Publications](${abs("/publications")}): analyses, notes stratégiques, perspectives et rapports
- [Médias](${abs("/medias")}): interviews, podcasts, conférences et vidéos
- [Événements](${abs("/evenements")}): conférences et interventions
- [Lexique de l'intelligence économique](${abs("/lexique")}): définitions des notions clés (veille, OSINT, influence, prospective, souveraineté économique…)
- [Contact](${abs("/contact")}): consultations stratégiques, conférences, interviews, partenariats

## Publications
${pubs.length ? pubs.map((p) => `\n- [${p.title}](${abs(`/publications/${p.slug}`)}) (${typeLabel(p.type)}, ${p.category}): ${p.summary}`).join("") : "\n- Premières publications à paraître."}

## Optional

- [Flux RSS](${abs("/feed.xml")})
- [Plan du site](${abs("/sitemap.xml")})
`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=600" } });
}
