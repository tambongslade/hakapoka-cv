// Resets data/db.json with Hermann Hakapoka's real, verified publications only (no demo content).
// Each entry is a summary written for this site, with a link to the full original article.
// Usage: node scripts/seed.mjs   (overwrites publications; media, events and messages start empty)
import fs from "fs";

const now = new Date().toISOString();
const INFOGUERRE = "Infoguerre (École de Guerre Économique)";

const pubs = [
  {
    slug: "contre-attaque-informationnelle-etats-unis-sommet-russie-afrique-sotchi",
    title: "La contre-attaque informationnelle des États-Unis après le sommet Russie-Afrique de Sotchi",
    summary:
      "Quelques jours après le sommet de Sotchi, Facebook supprime un réseau de comptes liés à la Russie et actifs en Afrique. Une lecture de l'épisode comme une riposte américaine dans la guerre de l'information.",
    type: "analyse",
    category: "Géopolitique & Prospective",
    tags: ["Guerre de l'information", "Russie", "Afrique", "Influence", "Cyber"],
    publishedAt: "2019-11-05T09:00:00.000Z",
    sourceUrl: "https://www.ege.fr/infoguerre/2019/11/contre-attaque-informationnelle-etats-unis-damerique-apres-sommet-russie-afrique-de-sotchi",
    content: `Le 23 octobre 2019, Vladimir Poutine réunit à Sotchi plus de quarante dirigeants africains et de nombreux chefs d'entreprise. Les secteurs représentés et les accords signés dessinent les priorités de Moscou sur le continent : matières premières, nucléaire civil, coopération militaire et vente d'armes, communication.

## Les jeux d'influence

Une semaine plus tard, le 30 octobre, Facebook annonce la suppression de 35 comptes, 73 pages et sept groupes pilotés depuis la Russie. Ils visaient huit pays africains, dont le **Cameroun**, la Côte d'Ivoire, la RDC et la Centrafrique, et étaient suivis par environ 1,7 million de comptes.

L'annonce s'appuie sur un rapport du Stanford Internet Observatory publié la veille. Compte tenu du profil de ses auteurs, proches de l'appareil d'État américain, l'article lit cette opération comme la phase opérationnelle d'une **contre-attaque informationnelle** : elle agit à la fois sur le contenant, en coupant l'accès aux comptes, et sur le contenu, en médiatisant l'affaire.

## La machine de guerre économique du Kremlin

L'analyse replace l'épisode dans la doctrine russe, qui accorde une place croissante aux outils non militaires, et dans la conception russe du *smart power* : obtenir un avantage sur l'adversaire par les technologies de l'information. Avant même le sommet, les agences TASS et RIA Novosti avaient rencontré des agences de presse africaines pour bâtir une stratégie d'influence, avec des partenariats prévus avec Sputnik et RT.

> En Afrique, la compétition économique entre puissances se joue aussi sur le terrain de l'information.`,
  },
  {
    slug: "strategies-encerclement-cognitif-laboratoires-americains-france",
    title: "Détection de stratégies d'encerclement cognitif des laboratoires américains en France",
    summary:
      "Lobbying, financement d'associations et prolongation de brevet : comment le laboratoire Gilead a défendu le monopole du Truvada en France, et ce que cela révèle des vulnérabilités de la Sécurité sociale.",
    type: "analyse",
    category: "Intelligence économique",
    tags: ["Encerclement cognitif", "Influence", "Santé", "Lobbying", "Souveraineté"],
    publishedAt: "2019-09-12T09:00:00.000Z",
    sourceUrl: "https://www.ege.fr/infoguerre/2019/09/detection-de-strategies-dencerclement-cognitif-laboratoires-americains-france",
    content: `Le Truvada, antirétroviral du laboratoire américain Gilead, est prescrit aux personnes séropositives et en prévention du VIH. Remboursé par la Sécurité sociale depuis 2016, il a représenté pour le laboratoire plus de 705 millions d'euros de remboursements à fin 2017, selon les Pharma Papers cités dans l'article.

## Le dessous des cartes des jeux d'influence

Pour prolonger son monopole jusqu'en 2020, Gilead sollicite un certificat complémentaire de protection. Des associations comme AIDES et Coalition PLUS dénoncent la manœuvre, et le monopole prend fin le 5 septembre 2017 sur décision du tribunal de grande instance de Paris.

## La machine de guerre économique du laboratoire

L'article décrit une stratégie d'**encerclement cognitif** : lobbying, influence médiatique, financement d'ONG, d'associations et de chercheurs. Il relève qu'un schéma comparable avait été suivi pour un autre traitement du laboratoire, le sofosbuvir.

## Conclusion

Si la justice a mis fin à ces pertes pour les finances publiques, l'épisode montre que le système français de Sécurité sociale constitue un « eldorado » pour les laboratoires étrangers. L'auteur suggère au législateur de **donner la priorité au remboursement des médicaments fabriqués en France** dans les lois de financement de la Sécurité sociale.`,
  },
];

const db = {
  publications: pubs.map((p, i) => ({
    id: `pub${i + 1}`,
    ...p,
    sourceName: INFOGUERRE,
    seoTitle: p.title,
    seoDescription: p.summary,
    status: "published",
    createdAt: now,
    updatedAt: now,
  })),
  media: [],
  events: [],
  messages: [],
};

fs.writeFileSync(new URL("../data/db.json", import.meta.url), JSON.stringify(db, null, 2));
console.log(`Seeded ${db.publications.length} real publications.`);
