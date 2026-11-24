// Educational glossary — general definitions of the discipline, not claims about the author.
export type Term = { slug: string; term: string; definition: string; related?: string[] };

export const LEXIQUE: Term[] = [
  {
    slug: "intelligence-economique",
    term: "Intelligence économique",
    definition:
      "Ensemble des actions coordonnées de recherche, de traitement, de protection et de diffusion de l'information utile aux acteurs économiques, afin d'éclairer leurs décisions et de renforcer leur position concurrentielle. Elle se distingue de la simple documentation par sa finalité : l'action.",
    related: ["veille-strategique", "influence", "protection-du-patrimoine-informationnel"],
  },
  {
    slug: "guerre-economique",
    term: "Guerre économique",
    definition:
      "Lecture de la compétition internationale comme un affrontement durable entre États et entreprises pour la conquête des marchés, des technologies et des ressources, où l'information, les normes et l'influence sont des armes à part entière.",
    related: ["guerre-de-l-information", "rapport-de-force"],
  },
  {
    slug: "veille-strategique",
    term: "Veille stratégique",
    definition:
      "Surveillance organisée et continue de l'environnement — concurrents, marchés, technologies, réglementations, acteurs politiques — pour détecter les opportunités et les menaces avant qu'elles ne se matérialisent.",
    related: ["signal-faible", "osint"],
  },
  {
    slug: "signal-faible",
    term: "Signal faible",
    definition:
      "Information fragmentaire, ambiguë et souvent isolée qui, correctement interprétée, annonce une évolution importante. Tout l'art de l'analyste est de le repérer dans le bruit et de le relier à d'autres indices.",
    related: ["veille-strategique", "prospective"],
  },
  {
    slug: "osint",
    term: "OSINT (renseignement d'origine sources ouvertes)",
    definition:
      "Collecte et analyse d'informations librement accessibles — publications officielles, presse, registres, réseaux sociaux, données satellitaires — pour produire du renseignement exploitable. L'essentiel de l'intelligence économique repose sur ces sources légales.",
    related: ["veille-strategique", "due-diligence"],
  },
  {
    slug: "analyse-strategique",
    term: "Analyse stratégique",
    definition:
      "Transformation de l'information brute en compréhension : hiérarchiser les faits, identifier les acteurs et leurs intérêts, mesurer les rapports de force et formuler des options de décision.",
    related: ["rapport-de-force", "prospective"],
  },
  {
    slug: "rapport-de-force",
    term: "Rapport de force",
    definition:
      "Équilibre des capacités — économiques, politiques, informationnelles, normatives — entre acteurs en compétition. L'analyser permet de comprendre qui peut imposer ses choix, et à quelles conditions.",
    related: ["guerre-economique", "analyse-strategique"],
  },
  {
    slug: "prospective",
    term: "Prospective",
    definition:
      "Démarche qui explore plusieurs futurs plausibles à partir des tendances lourdes, des incertitudes et des ruptures possibles, pour préparer la décision présente. Elle ne prédit pas : elle prépare.",
    related: ["scenario", "signal-faible"],
  },
  {
    slug: "scenario",
    term: "Scénario prospectif",
    definition:
      "Récit cohérent d'une évolution possible, construit à partir de variables clés et d'hypothèses explicites. On en élabore généralement plusieurs — tendanciel, de rupture, contrasté — pour tester la robustesse d'une stratégie.",
    related: ["prospective"],
  },
  {
    slug: "influence",
    term: "Influence",
    definition:
      "Capacité à orienter les perceptions, les normes et les décisions d'autres acteurs sans recourir à la contrainte : production de contenus, participation aux instances de normalisation, réseaux, diplomatie économique.",
    related: ["guerre-de-l-information", "diplomatie-economique"],
  },
  {
    slug: "guerre-de-l-information",
    term: "Guerre de l'information",
    definition:
      "Usage offensif ou défensif de l'information pour affaiblir un adversaire ou protéger ses intérêts : déstabilisation par la rumeur, campagnes de dénigrement, manipulation des perceptions, mais aussi riposte et contre-argumentation.",
    related: ["influence", "reputation"],
  },
  {
    slug: "protection-du-patrimoine-informationnel",
    term: "Protection du patrimoine informationnel",
    definition:
      "Ensemble des mesures — organisationnelles, juridiques, techniques et humaines — visant à protéger les informations sensibles d'une organisation : savoir-faire, données, secrets d'affaires, projets stratégiques.",
    related: ["intelligence-economique"],
  },
  {
    slug: "reputation",
    term: "Risque réputationnel",
    definition:
      "Exposition d'une organisation ou d'un État à une dégradation de son image, susceptible d'affecter sa capacité à investir, commercer ou négocier. Il se gère par l'anticipation et la veille d'opinion.",
    related: ["guerre-de-l-information", "influence"],
  },
  {
    slug: "due-diligence",
    term: "Due diligence",
    definition:
      "Vérification approfondie d'un partenaire, d'une cible d'acquisition ou d'un investissement : structure de propriété, réputation, litiges, exposition aux sanctions, intégrité des dirigeants.",
    related: ["osint", "reputation"],
  },
  {
    slug: "intelligence-territoriale",
    term: "Intelligence territoriale",
    definition:
      "Application de l'intelligence économique à un territoire — ville, région, pays — pour en renforcer l'attractivité, identifier ses filières d'avenir et coordonner les acteurs publics et privés qui le font vivre.",
    related: ["intelligence-economique"],
  },
  {
    slug: "souverainete-economique",
    term: "Souveraineté économique",
    definition:
      "Capacité d'un État à maîtriser ses choix économiques essentiels : choisir ses dépendances plutôt que les subir, sécuriser ses approvisionnements critiques et peser dans les règles qui s'imposent à lui.",
    related: ["rapport-de-force", "diplomatie-economique"],
  },
  {
    slug: "diplomatie-economique",
    term: "Diplomatie économique",
    definition:
      "Mobilisation des outils de l'État — réseau diplomatique, négociations commerciales, financement, promotion — au service de ses intérêts économiques et de ceux de ses entreprises à l'étranger.",
    related: ["influence", "souverainete-economique"],
  },
];
