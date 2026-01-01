// Stripe Configuration
import Stripe from "stripe"

if (!process.env.STRIPE_SECRET_KEY) {
  console.warn("⚠️ STRIPE_SECRET_KEY not set - using test mode")
}

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "sk_test_placeholder", {
  apiVersion: "2023-10-16",
  typescript: true,
})

// Pricing Plans
export const PRICING_PLANS = {
  monthly: {
    id: "monthly",
    name: "Mensuel",
    price: 399,
    currency: "EUR",
    interval: "month" as const,
    description: "Abonnement mensuel - Engagement 8 mois",
    features: [
      "Diagnostic complet multi-normes",
      "Roadmap personnalisée",
      "Générateur de documents IA",
      "Bibliothèque 90+ templates",
      "Support prioritaire",
      "Mises à jour incluses",
    ],
    stripePriceId: process.env.STRIPE_PRICE_MONTHLY || "price_monthly_placeholder",
  },
  onetime: {
    id: "onetime",
    name: "Pack Complet",
    price: 2990,
    currency: "EUR",
    interval: "one_time" as const,
    description: "Paiement unique - Accès à vie",
    features: [
      "Tout le plan mensuel",
      "Accès à vie sans limite",
      "Toutes les normes incluses",
      "Exports illimités",
      "Formation offerte (1h)",
      "Accompagnement prioritaire",
    ],
    stripePriceId: process.env.STRIPE_PRICE_ONETIME || "price_onetime_placeholder",
    popular: true,
  },
}

export type PlanId = keyof typeof PRICING_PLANS
