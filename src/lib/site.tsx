// Absolute site URL — must be set to the real domain in production (build + runtime).
export const SITE_URL = (process.env.SITE_URL || "http://localhost:3457").replace(/\/$/, "");

export const SITE = {
  name: "Hermann Hakapoka",
  tagline: "Intelligence économique & stratégie",
  description:
    "Hermann Hakapoka — analyses en intelligence économique, économie stratégique et géopolitique africaine. Souveraineté économique, CEMAC, Afrique centrale, prospective et aide à la décision.",
  locale: "fr_FR",
};

export const abs = (path = "/") => `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;

/*
 * Structured data about Hermann. Only publicly verifiable facts (see README).
 * sameAs: profiles found online — TO CONFIRM with the client that these are his and he wants them linked.
 */
export const PERSON_ID = abs("/#hermann-hakapoka");

export const personJsonLd = {
  "@type": "Person",
  "@id": PERSON_ID,
  name: "Hermann Hakapoka",
  url: abs("/"),
  image: abs("/images/hermann-library.jpg"),
  description:
    "Spécialiste de l'intelligence économique et de la stratégie, issu de l'administration financière publique camerounaise. Ses analyses portent sur la souveraineté économique, l'Afrique centrale et la géopolitique des ressources.",
  jobTitle: "Expert en intelligence économique et stratégie",
  nationality: { "@type": "Country", name: "Cameroun" },
  homeLocation: { "@type": "Place", name: "Yaoundé, Cameroun" },
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "École nationale d'administration et de magistrature",
      alternateName: "ENAM",
      sameAs: "https://fr.wikipedia.org/wiki/École_nationale_d%27administration_et_de_magistrature_(Cameroun)",
      foundingDate: "1959",
      address: { "@type": "PostalAddress", addressLocality: "Yaoundé", addressCountry: "CM" },
    },
    {
    "@type": "CollegeOrUniversity",
    name: "École de Guerre Économique",
    alternateName: "EGE",
    url: "https://www.ege.fr",
    foundingDate: "1997",
    address: { "@type": "PostalAddress", addressLocality: "Paris", addressCountry: "FR" },
    },
  ],
  worksFor: { "@type": "Organization", name: "2H International Consulting Group" },
  knowsAbout: [
    "Intelligence économique",
    "Veille stratégique",
    "Guerre économique",
    "Guerre de l'information",
    "Stratégies d'influence",
    "Géopolitique",
    "Prospective",
    "Souveraineté économique",
    "CEMAC",
    "Afrique centrale",
    "Commerce international",
    "Finances publiques",
  ],
  knowsLanguage: ["fr"],
  sameAs: ["https://www.linkedin.com/in/hermann-hakapoka-151534388/", "https://x.com/hakapoka", "https://www.facebook.com/hermann.hakapoka/"],
};

export const websiteJsonLd = {
  "@type": "WebSite",
  "@id": abs("/#website"),
  url: abs("/"),
  name: SITE.name,
  description: SITE.description,
  inLanguage: "fr-FR",
  author: { "@id": PERSON_ID },
  publisher: { "@id": PERSON_ID },
};

export function JsonLd({ data }: { data: Record<string, unknown> | Record<string, unknown>[] }) {
  const graph = { "@context": "https://schema.org", "@graph": Array.isArray(data) ? data : [data] };
  // Escape "<" so content can never close the script tag.
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(graph).replace(/</g, "\\u003c") }} />;
}

export function breadcrumb(items: [string, string][]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: [["Accueil", "/"], ...items].map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: abs(path) })),
  };
}
