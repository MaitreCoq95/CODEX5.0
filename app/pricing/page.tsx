"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Check, Sparkles, Shield, Clock, Star, ArrowRight } from "lucide-react"
import Link from "next/link"
import { useSearchParams } from "next/navigation"
import { Suspense } from "react"

const plans = [
  {
    id: "monthly",
    name: "Accompagnement Mensuel",
    priceLabel: "Sur demande",
    description: "Accompagnement progressif",
    features: [
      "Diagnostic complet multi-normes",
      "Roadmap personnalisée",
      "Générateur de documents IA",
      "Bibliothèque 90+ templates",
      "Support prioritaire",
      "Mises à jour incluses",
    ],
    cta: "Nous contacter",
    popular: false,
  },
  {
    id: "onetime",
    name: "Pack Complet",
    priceLabel: "Sur demande",
    description: "Accès à vie",
    features: [
      "Tout le plan mensuel",
      "Accès à vie sans limite",
      "Toutes les normes incluses",
      "Exports illimités",
      "Formation offerte (1h)",
      "Accompagnement prioritaire",
    ],
    cta: "Nous contacter",
    popular: true,
  },
]

function PricingContent() {
  const searchParams = useSearchParams()
  const standard = searchParams.get("standard") || "ISO_9001"

  return (
    <div className="min-h-screen bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900 py-16 px-4">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="bg-vyxo-gold/20 text-vyxo-gold mb-4">
            <Sparkles className="w-3 h-3 mr-1" />
            Premium
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Choisissez votre plan
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Accédez à tous les outils pour obtenir votre certification rapidement et efficacement.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 mb-12">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card
                className={`relative h-full ${
                  plan.popular
                    ? "bg-gradient-to-br from-vyxo-gold/20 to-vyxo-gold/5 border-vyxo-gold/40"
                    : "bg-white/5 border-white/10"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-vyxo-gold text-vyxo-navy">
                      <Star className="w-3 h-3 mr-1" />
                      Plus populaire
                    </Badge>
                  </div>
                )}

                <CardHeader className="text-center pb-4 pt-8">
                  <CardTitle className="text-white text-xl mb-2">{plan.name}</CardTitle>
                  <div className="flex items-baseline justify-center gap-1">
                    <span className="text-3xl font-bold text-vyxo-gold">{plan.priceLabel}</span>
                  </div>
                  <p className="text-gray-400 text-sm mt-2">{plan.description}</p>
                </CardHeader>

                <CardContent className="space-y-6">
                  <ul className="space-y-3">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-center gap-3 text-gray-300">
                        <Check className="w-5 h-5 text-vyxo-gold shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  <Button
                    className={`w-full ${
                      plan.popular
                        ? "bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90"
                        : "bg-white/10 text-white hover:bg-white/20"
                    }`}
                    size="lg"
                    asChild
                  >
                    <Link href={`/checkout?plan=${plan.id}&standard=${standard}`}>
                      {plan.cta}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Trust Badges */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="flex flex-wrap justify-center gap-6 text-gray-400 text-sm"
        >
          <div className="flex items-center gap-2">
            <Shield className="w-4 h-4 text-green-500" />
            Paiement sécurisé Stripe
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-500" />
            Accès immédiat
          </div>
          <div className="flex items-center gap-2">
            <Check className="w-4 h-4 text-vyxo-gold" />
            Satisfait ou remboursé 14j
          </div>
        </motion.div>
      </div>
    </div>
  )
}

export default function PricingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-vyxo-navy" />}>
      <PricingContent />
    </Suspense>
  )
}
