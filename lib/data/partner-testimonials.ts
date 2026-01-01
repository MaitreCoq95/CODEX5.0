// Données témoignages partenaires Vyxo
// Cas fictifs mais réalistes basés sur le brief

export interface PartnerTestimonial {
  id: string
  name: string
  role: string
  location: string
  formula: "revenue-share" | "licence-pro" | "all-in"
  experience: string
  specializations: string[]
  before: {
    ca: string
    missionAvg: string
    mrr: string
    problem: string
  }
  after: {
    ca: string
    missionAvg: string
    mrr: string
    growth: string
  }
  timeline: string
  quote: string
  highlights: string[]
}

export const partnerTestimonials: PartnerTestimonial[] = [
  {
    id: "thomas-d",
    name: "Thomas D.",
    role: "Consultant GDP indépendant",
    location: "Région Auvergne-Rhône-Alpes",
    formula: "licence-pro",
    experience: "8 ans",
    specializations: ["GDP", "Transport Pharma"],
    before: {
      ca: "90K€/an",
      missionAvg: "20-25K€",
      mrr: "0€",
      problem: "Je facturais mes missions GDP entre 20 et 25K€. Les clients étaient contents mais une fois la certif obtenue, je n'avais plus de revenus. Je passais un temps fou sur Excel pour faire des tableaux de bord. Certains prospects me disaient 'Bureau Veritas nous propose un outil de suivi, vous avez quoi?'. Je répondais rien."
    },
    after: {
      ca: "165K€/an",
      missionAvg: "53,6K€",
      mrr: "400€/mois",
      growth: "+83%"
    },
    timeline: "18 mois",
    quote: "Vyxo m'a donné la crédibilité des gros cabinets avec l'agilité du consultant indé. Mes clients adorent le dashboard temps réel. Et surtout, je touche enfin du MRR même après la mission. Game changer.",
    highlights: [
      "Mission pharma: 32K€ consulting + 21,6K€ marge SaaS = 53,6K€",
      "4 clients équipés Vyxo",
      "MRR passif: 400€/mois (net après licence)"
    ]
  },
  {
    id: "sophie-l",
    name: "Sophie L.",
    role: "Consultante ISO 9001/45001",
    location: "Bretagne",
    formula: "all-in",
    experience: "12 ans",
    specializations: ["ISO 9001", "ISO 45001", "MASE"],
    before: {
      ca: "130K€/an",
      missionAvg: "35K€",
      mrr: "0€",
      problem: "J'avais trop de clients pour tout gérer avec mes méthodes artisanales. Je voulais scaler mais pas recruter. Et je rêvais d'avoir mon propre outil SaaS sans les 200K€ de développement."
    },
    after: {
      ca: "210K€/an",
      missionAvg: "45K€",
      mrr: "6 400€/mois",
      growth: "+62%"
    },
    timeline: "14 mois",
    quote: "J'ai mon propre SaaS sans avoir codé une ligne. Mes clients pensent que c'est mon outil. Et je touche 6400€ de MRR chaque mois. Meilleure décision business de ma carrière.",
    highlights: [
      "12 clients actifs sur la plateforme",
      "White-label complet à son branding",
      "MRR: 6 400€/mois (12 × 550€ marge - 500€ licence)"
    ]
  }
]

// Mini cas pour affichage compact
export const miniCases = [
  {
    name: "Marc R.",
    formula: "revenue-share",
    result: "Premier client en 3 semaines, 150€/mois de MRR sans risque"
  },
  {
    name: "Émilie P.",
    formula: "licence-pro",
    result: "Passée de 75K€ à 120K€ CA en 12 mois"
  }
]
