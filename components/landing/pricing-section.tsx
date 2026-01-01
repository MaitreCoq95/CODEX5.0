"use client"

import { Check, X, Star, ArrowRight } from "lucide-react"

import Link from "next/link"

const formulas = [
  {
    id: "monthly",
    name: "Accompagnement Mensuel",
    subtitle: "Flexibilité maximale",
    price: "Sur demande",
    priceSuffix: "",
    description: "Accompagnement progressif avec engagement 8 mois",
    recommended: false,
    features: [
      { name: "Diagnostic complet multi-normes", included: true },
      { name: "Roadmap personnalisée", included: true },
      { name: "Générateur de documents IA", included: true },
      { name: "Bibliothèque 90+ templates", included: true },
      { name: "Support prioritaire", included: true },
      { name: "Mises à jour incluses", included: true },
      { name: "Accompagnement prioritaire", included: false },
      { name: "Formation offerte (1h)", included: false }
    ],
    cta: "Nous contacter",
    ctaStyle: "border-2 border-white/30 hover:border-white/50 text-white"
  },
  {
    id: "onetime",
    name: "Pack Complet",
    subtitle: "Le plus populaire",
    price: "Sur demande",
    priceSuffix: "",
    description: "Accès à vie et accompagnement premium",
    recommended: true,
    features: [
      { name: "Diagnostic complet multi-normes", included: true },
      { name: "Roadmap personnalisée", included: true },
      { name: "Générateur de documents IA", included: true },
      { name: "Bibliothèque 90+ templates", included: true },
      { name: "Support prioritaire", included: true },
      { name: "Mises à jour incluses", included: true },
      { name: "Accompagnement prioritaire", included: true, highlight: true },
      { name: "Formation offerte (1h)", included: true, highlight: true }
    ],
    cta: "Nous contacter",
    ctaStyle: "bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
  }
]

export function PricingSection() {
  return (
    <section id="pricing-section" className="py-20 bg-vyxo-navy">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-vyxo-gold text-sm font-semibold tracking-wider uppercase mb-4 block">
            Formules & Accompagnement
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Choisissez le niveau d&apos;accompagnement <span className="text-vyxo-gold">adapté à votre projet</span>
          </h2>
          <p className="text-lg text-gray-400">
            Toutes nos formules incluent la plateforme SaaS et la formation. 
            Seule l&apos;intensité de l&apos;accompagnement terrain varie.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {formulas.map((formula) => (
            <div
              key={formula.id}
              className={`relative rounded-2xl p-6 transition-all duration-300 ${
                formula.recommended
                  ? "bg-gradient-to-b from-vyxo-gold/20 to-transparent border-2 border-vyxo-gold scale-105 shadow-lg shadow-vyxo-gold/10"
                  : "bg-white/5 border border-white/10 hover:border-white/30"
              }`}
            >
              {/* Recommended badge */}
              {formula.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-vyxo-gold text-vyxo-navy text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    RECOMMANDÉ
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <h3 className={`text-xl font-bold mb-1 ${formula.recommended ? "text-vyxo-gold" : "text-white"}`}>
                  {formula.name}
                </h3>
                <p className="text-sm text-gray-400">{formula.subtitle}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className="text-2xl font-bold text-white">{formula.price}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{formula.description}</p>
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {formula.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-3 text-sm ${
                      feature.included ? "text-gray-300" : "text-gray-500"
                    }`}
                  >
                    {feature.included ? (
                      <Check className={`w-4 h-4 flex-shrink-0 ${feature.highlight ? "text-vyxo-gold" : "text-green-400"}`} />
                    ) : (
                      <X className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    )}
                    <span className={feature.highlight ? "text-vyxo-gold font-medium" : ""}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              {/* CTA */}
              <Link href={`/checkout?plan=${formula.id}&standard=ISO_9001`} className="block w-full">
                <button
                  className={`w-full py-3 rounded-lg font-bold transition-all ${formula.ctaStyle}`}
                >
                  {formula.cta}
                  <ArrowRight className="w-4 h-4 inline-block ml-2" />
                </button>
              </Link>
            </div>
          ))}
        </div>

        {/* Note */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm max-w-2xl mx-auto">
            💡 <strong className="text-gray-400">Éligible financement OPCO</strong> pour la formation. 
            Nos équipes vous accompagnent dans le montage du dossier.
          </p>
        </div>
      </div>
    </section>
  )
}

export default PricingSection
