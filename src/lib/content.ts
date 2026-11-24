export type Theme = {
  slug: string;
  category: string; // matches Publication.category for related content
  eyebrow: string;
  title: string;
  lead: string;
  intro: string[];
  question: string;
  reperes?: { title: string; lead: string; items: { value: string; label: string }[]; source: string };
  doctrine?: { source: string; title: string; verbs: { verb: string; text: string }[] };
  topics: { title: string; text: string }[];
};

export const THEMES: Record<string, Theme> = {
  ie: {
    slug: "intelligence-economique",
    category: "Intelligence économique",
    eyebrow: "Intelligence économique",
    title: "L'information est devenue un rapport de force.",
    lead: "Collecter, analyser, protéger et influencer : l'intelligence économique organise la maîtrise de l'information au service de la décision et de la compétitivité.",
    intro: [
      "Dans une économie mondialisée, l'avantage ne se joue plus seulement sur les coûts ou les volumes. Il se joue sur la capacité à voir avant les autres, à comprendre plus vite et à protéger ce qui fait sa valeur.",
      "L'intelligence économique n'est ni de l'espionnage, ni une simple veille documentaire. C'est une discipline de la décision : elle relie l'information aux choix stratégiques des États, des territoires et des entreprises.",
      "Cette approche s'inscrit dans l'école française de l'intelligence économique, qui lit l'économie mondiale comme un espace d'affrontements — une guerre économique où l'information, l'influence et la capacité d'anticipation font la différence.",
    ],
    question: "Que savons-nous réellement de notre environnement — et que savent les autres de nous ?",
    reperes: {
      title: "Repères",
      lead: "En France, l'intelligence économique s'est structurée comme politique publique au milieu des années 1990.",
      items: [
        { value: "1994", label: "Rapport Martre, « Intelligence économique et stratégie des entreprises » (Commissariat général du Plan) : la définition fondatrice." },
        { value: "1997", label: "Création de l'École de Guerre Économique à Paris." },
        { value: "2003", label: "Rapport Carayon, « Intelligence économique, compétitivité et cohésion sociale », remis au Premier ministre." },
      ],
      source: "Sources : Commissariat général du Plan (1994) ; École de Guerre Économique ; rapport Carayon (2003).",
    },
    doctrine: {
      source: "Devise de l'École de Guerre Économique, Paris",
      title: "Quatre verbes pour une discipline",
      verbs: [
        { verb: "Surveiller", text: "Détecter les signaux faibles et suivre en continu marchés, acteurs, technologies et réglementations." },
        { verb: "Analyser", text: "Transformer l'information en compréhension des rapports de force et en options de décision." },
        { verb: "Protéger", text: "Sécuriser le patrimoine informationnel, les savoir-faire et les données stratégiques." },
        { verb: "Influencer", text: "Peser sur les normes, les perceptions et les débats qui conditionnent la compétition." },
      ],
    },
    topics: [
      { title: "Veille stratégique", text: "Organiser la détection des signaux faibles : marchés, technologies, réglementations, acteurs." },
      { title: "Analyse de l'information", text: "Transformer la donnée brute en connaissance utile, hiérarchisée et actionnable." },
      { title: "Anticipation", text: "Construire des hypothèses sur les mouvements à venir plutôt que réagir aux faits accomplis." },
      { title: "Intelligence territoriale", text: "Mobiliser l'information au service de l'attractivité et du développement des territoires." },
      { title: "Intelligence concurrentielle", text: "Comprendre les stratégies des concurrents, des partenaires et des nouveaux entrants." },
      { title: "Protection de l'information stratégique", text: "Sécuriser savoir-faire, données sensibles et patrimoine immatériel." },
      { title: "Influence et réputation", text: "Peser dans les débats, les normes et les perceptions qui conditionnent les marchés." },
      { title: "Risques économiques", text: "Identifier les vulnérabilités, les dépendances critiques et les menaces sur la chaîne de valeur." },
    ],
  },
  eco: {
    slug: "economie-strategique",
    category: "Économie stratégique",
    eyebrow: "Économie stratégique",
    title: "Penser l'économie comme un espace de puissance.",
    lead: "Souveraineté, compétitivité, industries stratégiques : lire les transformations économiques de l'Afrique à travers la question des choix et des rapports de force.",
    intro: [
      "Les chiffres décrivent une économie ; ils ne l'expliquent pas. Derrière chaque flux commercial, chaque investissement, chaque infrastructure, il y a des stratégies, des dépendances et des arbitrages.",
      "Cette rubrique propose des analyses de fond sur les leviers qui détermineront la place des économies africaines dans la décennie qui vient.",
    ],
    question: "Comment passer d'une économie de ressources à une économie de décisions ?",
    reperes: {
      title: "Repères — ZLECAf",
      lead: "La Zone de libre-échange continentale africaine est l'un des cadres majeurs de la transformation économique du continent.",
      items: [
        { value: "2018", label: "Signature de l'accord à Kigali, le 21 mars." },
        { value: "2019", label: "Entrée en vigueur, le 30 mai." },
        { value: "2021", label: "Début des échanges commerciaux, le 1er janvier." },
        { value: "54", label: "États signataires sur les 55 membres de l'Union africaine." },
      ],
      source: "Source : Secrétariat de la ZLECAf (Accra, Ghana) ; Union africaine.",
    },
    topics: [
      { title: "Afrique & transformation économique", text: "Diversification, industrialisation et montée en gamme des économies du continent." },
      { title: "Souveraineté économique", text: "Choisir ses dépendances plutôt que les subir." },
      { title: "Compétitivité", text: "Coûts, normes, logistique, capital humain : ce qui fait réellement la différence." },
      { title: "Investissement", text: "Attirer, orienter et sécuriser les capitaux productifs." },
      { title: "Industries stratégiques", text: "Énergie, agro-industrie, pharmacie, numérique : les secteurs qui conditionnent l'autonomie." },
      { title: "Ressources naturelles", text: "De la rente extractive à la transformation locale de la valeur." },
      { title: "Infrastructures", text: "Corridors, ports, énergie : la géographie physique de la compétitivité." },
      { title: "Commerce international", text: "Règles, accords, ZLECAf et recomposition des chaînes de valeur." },
      { title: "Économie numérique", text: "Données, plateformes et souveraineté technologique." },
      { title: "Transformation des États africains", text: "Administration, fiscalité et capacité de pilotage de l'économie." },
    ],
  },
  geo: {
    slug: "geopolitique-prospective",
    category: "Géopolitique & Prospective",
    eyebrow: "Géopolitique & Prospective",
    title: "Comprendre le présent. Anticiper le prochain mouvement.",
    lead: "Lecture des recompositions géoéconomiques qui touchent l'Afrique centrale et le continent, et exploration méthodique des futurs possibles.",
    intro: [
      "Le monde se fragmente en blocs, en corridors et en sphères d'influence. L'Afrique n'est plus une périphérie de cette recomposition : elle en est l'un des terrains principaux.",
      "La prospective n'est pas la prédiction. C'est l'art de préparer la décision en explorant plusieurs futurs plausibles, et en identifiant les signaux qui indiqueront lequel se dessine.",
    ],
    question: "Quelle place l'Afrique centrale choisira-t-elle d'occuper dans le monde qui vient ?",
    reperes: {
      title: "Repères — CEMAC",
      lead: "La Communauté économique et monétaire de l'Afrique centrale réunit Cameroun, Centrafrique, Congo, Gabon, Guinée équatoriale et Tchad.",
      items: [
        { value: "6", label: "États membres partageant une monnaie commune." },
        { value: "1994", label: "Traité instituant la CEMAC, signé le 16 mars à N'Djamena." },
        { value: "XAF", label: "Franc CFA d'Afrique centrale, émis par la BEAC, dont le siège est à Yaoundé." },
        { value: "Bangui", label: "Siège de la Commission de la CEMAC." },
      ],
      source: "Sources : Commission de la CEMAC ; Banque des États de l'Afrique centrale (BEAC).",
    },
    topics: [
      { title: "Afrique centrale", text: "Dynamiques régionales, interdépendances et trajectoires nationales." },
      { title: "CEMAC", text: "Intégration, monnaie, convergence et défis de la décennie." },
      { title: "Afrique et puissances mondiales", text: "Chine, États-Unis, Europe, Golfe, Turquie, Inde : un continent courtisé." },
      { title: "Relations économiques internationales", text: "Accords, partenariats et négociations commerciales." },
      { title: "Géopolitique des ressources", text: "Minerais critiques, énergie, terres et eau." },
      { title: "Nouvelles routes commerciales", text: "Corridors, ports et recomposition des flux mondiaux." },
      { title: "Influence économique", text: "Normes, récits et diplomatie économique." },
      { title: "Souveraineté", text: "Marges de manœuvre des États dans un monde multipolaire." },
      { title: "Risques géopolitiques", text: "Instabilités, sanctions, ruptures d'approvisionnement." },
      { title: "Futurs économiques africains", text: "Scénarios, tendances lourdes et ruptures possibles à l'horizon 2035-2050." },
    ],
  },
};
