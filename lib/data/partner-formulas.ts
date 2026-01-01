// Données des formules de partenariat Vyxo

export interface PartnerFormula {
  id: string
  name: string
  subtitle: string
  recommended: boolean
  price: {
    amount: string
    period: string
  }
  description: string
  earnings: {
    model: string
    example: string
  }
  features: {
    name: string
    included: boolean
    highlight?: boolean
  }[]
  limits: string[]
  idealFor: string[]
  cta: string
  ctaStyle: string
}

export const partnerFormulas: PartnerFormula[] = [
  {
    id: "revenue-share",
    name: "Revenue Share",
    subtitle: "💰 Fondateur",
    recommended: false,
    price: {
      amount: "0€",
      period: "fixe"
    },
    description: "Idéal pour consultants qui démarrent ou testent",
    earnings: {
      model: "30% du MRR client à vie",
      example: "Client à 500€/mois → Toi: 150€/mois"
    },
    features: [
      { name: "Accès complet plateforme", included: true },
      { name: "Formation initiale (2 jours)", included: true },
      { name: "Support email standard", included: true },
      { name: "Jusqu'à 5 clients simultanés", included: true },
      { name: "Co-branding", included: false },
      { name: "White-label complet", included: false },
      { name: "Billing autonome", included: false },
      { name: "Support prioritaire", included: false }
    ],
    limits: [
      "Pas de white-label",
      "Billing géré par Vyxo",
      "Support standard (48h)"
    ],
    idealFor: [
      "Consultant avec 1-5 clients",
      "Veut tester sans risque",
      "Pas de tréso pour licence"
    ],
    cta: "Démarrer en Revenue Share",
    ctaStyle: "border-2 border-white/30 hover:border-white/50 text-white"
  },
  {
    id: "licence-pro",
    name: "Licence Pro",
    subtitle: "🚀 Revendeur",
    recommended: true,
    price: {
      amount: "200€",
      period: "/mois"
    },
    description: "Idéal pour consultants établis qui veulent scaler",
    earnings: {
      model: "Marge de 100-200€/client/mois",
      example: "5 clients × 150€ marge = 750€ - 200€ = +550€/mois net"
    },
    features: [
      { name: "Accès complet plateforme", included: true },
      { name: "Formation initiale (2 jours)", included: true },
      { name: "Support prioritaire (24h)", included: true },
      { name: "Jusqu'à 10 clients simultanés", included: true },
      { name: "Prix réduit clients (300€ vs 500€)", included: true, highlight: true },
      { name: "Co-branding possible", included: true },
      { name: "Templates personnalisables", included: true },
      { name: "White-label complet", included: false }
    ],
    limits: [
      "10 clients max",
      "Billing partagé (Vyxo facture)"
    ],
    idealFor: [
      "Consultant avec 3-10 clients",
      "CA > 80K€/an",
      "Veut du MRR significatif"
    ],
    cta: "Passer en Licence Pro",
    ctaStyle: "bg-partner-accent hover:bg-partner-accent/90 text-slate-900"
  },
  {
    id: "all-in",
    name: "All-In",
    subtitle: "🏆 Intégrateur",
    recommended: false,
    price: {
      amount: "500€",
      period: "/mois"
    },
    description: "Idéal pour consultants à forte volumétrie",
    earnings: {
      model: "100% du MRR client (tu gères le pricing)",
      example: "15 clients × 500€ = 7500€ - 500€ = +7000€/mois MRR"
    },
    features: [
      { name: "Accès complet plateforme", included: true },
      { name: "Formation initiale (2 jours)", included: true },
      { name: "Support premium (4h + hotline)", included: true },
      { name: "Clients illimités inclus", included: true, highlight: true },
      { name: "White-label complet (ta marque)", included: true, highlight: true },
      { name: "Tu gères 100% du billing", included: true },
      { name: "Roadmap produit prioritaire", included: true },
      { name: "Co-marketing Vyxo", included: true }
    ],
    limits: [
      "Engagement 12 mois",
      "Volume min: 10 clients actifs"
    ],
    idealFor: [
      "Consultant avec 10+ clients",
      "CA > 150K€/an",
      "Veut son propre SaaS"
    ],
    cta: "Passer en All-In",
    ctaStyle: "border-2 border-partner-highlight hover:bg-partner-highlight/10 text-partner-highlight"
  }
]

// Comparateur rapide pour tableau
export const formulaComparisonTable = [
  { criteria: "Coût mensuel", revshare: "0€", pro: "200€", allin: "500€" },
  { criteria: "Clients max", revshare: "5", pro: "10", allin: "Illimité" },
  { criteria: "Commission", revshare: "30% MRR", pro: "100-200€/client", allin: "Total MRR" },
  { criteria: "White-label", revshare: "❌", pro: "Co-branding", allin: "✅ Complet" },
  { criteria: "Billing", revshare: "Vyxo", pro: "Partagé", allin: "Toi" },
  { criteria: "Support", revshare: "Standard", pro: "Prioritaire", allin: "Premium" },
  { criteria: "Engagement", revshare: "Aucun", pro: "Aucun", allin: "12 mois" }
]
