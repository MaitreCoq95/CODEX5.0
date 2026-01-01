// Données fictives pour les cas clients
// À remplacer par de vrais témoignages quand disponibles

export interface CaseStudy {
  id: string
  company: string
  logo?: string
  sector: string
  size: string
  norms: string[]
  context: string
  challenge: string
  solution: string
  results: {
    label: string
    value: string
    improvement?: string
  }[]
  duration: string
  testimonial: {
    quote: string
    author: string
    role: string
    avatar?: string
  }
}

export const caseStudies: CaseStudy[] = [
  {
    id: "als-fresh-food",
    company: "ALS Fresh Food",
    sector: "Distribution Pharmaceutique",
    size: "120 collaborateurs",
    norms: ["GDP", "ISO 9001"],
    context: "Distributeur de produits thermosensibles en pleine croissance, souhaitant structurer sa démarche qualité avant l'audit ANSM.",
    challenge: "Équipes terrain non formées aux exigences GDP, documentation qualité dispersée, 3 non-conformités critiques lors du pré-audit interne.",
    solution: "Déploiement de la plateforme Vyxo Codex + accompagnement consultant dédié pendant 14 mois. Formation de 45 collaborateurs via les modules e-learning.",
    results: [
      { label: "Conformité GDP", value: "94%", improvement: "+47%" },
      { label: "Non-conformités", value: "0", improvement: "-3" },
      { label: "Collaborateurs formés", value: "45/45", improvement: "100%" },
      { label: "Durée du projet", value: "14 mois", improvement: "" }
    ],
    duration: "14 mois",
    testimonial: {
      quote: "Sans Vyxo, on serait passés à côté de points critiques. Le consultant nous a challengés, et la plateforme a structuré notre approche. Audit réussi du premier coup.",
      author: "Sophie M.",
      role: "Responsable Qualité"
    }
  },
  {
    id: "medtrans-lyon",
    company: "MedTrans Lyon",
    sector: "Transport Médical",
    size: "85 collaborateurs",
    norms: ["GDP", "ISO 9001", "ISO 45001"],
    context: "Société de transport de produits de santé, besoin de double certification pour répondre aux exigences de nouveaux donneurs d'ordre.",
    challenge: "Aucun système qualité structuré, turnover élevé des chauffeurs, pression des délais ne permettant pas de former correctement.",
    solution: "Formule Full Accompagnement avec consultant 0.5 ETP sur site. Modules e-learning accessibles sur tablettes pour les chauffeurs.",
    results: [
      { label: "Certifications obtenues", value: "3", improvement: "" },
      { label: "Maturité qualité", value: "87%", improvement: "+62%" },
      { label: "Turnover", value: "-35%", improvement: "" },
      { label: "Nouveaux clients", value: "+4", improvement: "" }
    ],
    duration: "16 mois",
    testimonial: {
      quote: "L'approche hybride a tout changé. Mes chauffeurs se forment sur leur tablette entre deux courses, et le consultant gère le fond. On a gagné 4 nouveaux clients grâce aux certifications.",
      author: "Marc D.",
      role: "Directeur Général"
    }
  },
  {
    id: "aeroparts-toulouse",
    company: "AeroParts Toulouse",
    sector: "Aéronautique",
    size: "210 collaborateurs",
    norms: ["EN 9100", "AS 9120B"],
    context: "Sous-traitant aéronautique de rang 2 en préparation d'audit Nadcap, avec exigence de certification EN 9100 pour maintenir ses clients.",
    challenge: "Processus documentaires complexes, exigences aéronautiques strictes, équipes qualité sous-dimensionnées pour le volume.",
    solution: "Plateforme de pilotage EN 9100 + production documentaire par nos consultants. Audits blancs mensuels pendant 6 mois avant l'audit officiel.",
    results: [
      { label: "Score audit EN 9100", value: "98%", improvement: "" },
      { label: "Documents produits", value: "127", improvement: "" },
      { label: "Écarts audit", value: "2", improvement: "mineurs" },
      { label: "Maintien contrat", value: "Airbus", improvement: "" }
    ],
    duration: "18 mois",
    testimonial: {
      quote: "Le niveau d'exigence de l'aéronautique est tel qu'on ne pouvait pas se permettre d'improviser. Vyxo nous a donné la structure et la rigueur nécessaires. 98% au premier passage.",
      author: "Antoine B.",
      role: "Directeur Qualité"
    }
  }
]
