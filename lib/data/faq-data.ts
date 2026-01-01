// Données FAQ pour la landing page

export interface FAQItem {
  id: string
  question: string
  answer: string
  category: "general" | "pricing" | "methodology" | "support"
}

export const faqData: FAQItem[] = [
  {
    id: "difference-logiciel",
    question: "Quelle différence avec un logiciel qualité classique ?",
    answer: "Un logiciel classique vous donne des outils. Vyxo Codex vous accompagne vers un résultat : la conformité. En plus de la plateforme SaaS, vous bénéficiez de la formation continue de vos équipes et de l'expertise terrain de nos consultants. C'est l'alliance des trois qui garantit votre réussite.",
    category: "general"
  },
  {
    id: "duree-conformite",
    question: "Combien de temps faut-il pour obtenir ma conformité ?",
    answer: "En moyenne 12 à 18 mois selon votre point de départ et la complexité de la norme visée. Les projets urgents (audit proche) peuvent être accélérés avec une formule Full Accompagnement. Notre évaluation initiale gratuite vous donne une estimation précise.",
    category: "methodology"
  },
  {
    id: "formation-equipes",
    question: "Mes équipes doivent-elles être formées avant de commencer ?",
    answer: "Non, c'est justement l'un des piliers de notre méthode. La formation fait partie intégrante du programme. Vos équipes apprennent en même temps que vous construisez votre système qualité. C'est plus efficace et moins coûteux qu'une formation séparée.",
    category: "methodology"
  },
  {
    id: "plateforme-seule",
    question: "Puis-je utiliser la plateforme seule sans accompagnement ?",
    answer: "Oui, la formule 'Plateforme' à 490€/mois donne accès à l'intégralité de la plateforme SaaS et des modules e-learning. Elle convient aux équipes déjà expertes qui recherchent un outil de pilotage. Pour les projets complexes, nous recommandons une formule avec accompagnement.",
    category: "pricing"
  },
  {
    id: "taux-reussite",
    question: "Quel est votre taux de réussite à la certification ?",
    answer: "95% de nos clients obtiennent leur certification ou conformité dès le premier audit. Les 5% restants obtiennent généralement leur certification à la deuxième tentative, toujours accompagnés par nos équipes sans surcoût (garantie Full).",
    category: "general"
  },
  {
    id: "cout-accompagnement",
    question: "Combien coûte un accompagnement complet ?",
    answer: "Le coût dépend de nombreux facteurs : taille de l'entreprise, nombre de collaborateurs à former, normes visées, maturité actuelle. Nous proposons des devis personnalisés après notre évaluation gratuite. Le ROI est généralement atteint en 18-24 mois grâce aux gains opérationnels.",
    category: "pricing"
  },
  {
    id: "certifications-consultants",
    question: "Vos consultants sont-ils certifiés/agréés ?",
    answer: "Tous nos consultants sont certifiés Lead Auditor IRCA dans leurs domaines d'expertise. Ils ont en moyenne 12 ans d'expérience terrain et ont accompagné plus de 50 entreprises chacun. Nous travaillons avec les principaux organismes de certification (Bureau Veritas, SGS, AFNOR...).",
    category: "support"
  },
  {
    id: "multi-normes",
    question: "Peut-on viser plusieurs normes en même temps ?",
    answer: "Absolument, et c'est même souvent plus efficace. Notre plateforme gère nativement le multi-référentiel avec des synergies automatiques entre normes (ex: ISO 9001 + ISO 14001 + ISO 45001). Le système intégré réduit les doublons et accélère la mise en conformité.",
    category: "methodology"
  },
  {
    id: "echec-audit",
    question: "Que se passe-t-il si je rate mon audit ?",
    answer: "Avec la formule Full Accompagnement, nous garantissons le résultat. En cas d'échec, nous continuons l'accompagnement sans surcoût jusqu'à l'obtention de votre conformité. C'est notre engagement de résultat, pas seulement de moyens.",
    category: "support"
  },
  {
    id: "post-certification",
    question: "Et après la certification, vous assurez le suivi ?",
    answer: "Oui, le maintien est aussi important que l'obtention. Nous proposons des contrats de maintenance incluant les audits de surveillance, la mise à jour des formations et l'accompagnement aux évolutions normatives. La plateforme reste accessible pour le pilotage quotidien.",
    category: "support"
  }
]
