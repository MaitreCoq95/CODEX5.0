"use client"

import { Check, X, Star, ArrowRight } from "lucide-react"
import { partnerFormulas, formulaComparisonTable } from "@/lib/data/partner-formulas"

export function PricingFormulasSection() {
  return (
    <section id="pricing-formulas" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Choisis ton modèle de <span className="text-partner-accent">collaboration</span>
          </h2>
          <p className="text-lg text-gray-400">
            Chaque consultant est différent. On a créé 3 formules pour s&apos;adapter à ta situation. 
            Tu peux changer de formule à tout moment.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
          {partnerFormulas.map((formula) => (
            <div
              key={formula.id}
              className={`relative rounded-2xl p-6 transition-all duration-300 ${
                formula.recommended
                  ? "bg-gradient-to-b from-partner-accent/20 to-transparent border-2 border-partner-accent lg:scale-105 shadow-lg shadow-partner-accent/10"
                  : "bg-slate-800/50 border border-slate-700/50 hover:border-slate-600"
              }`}
            >
              {/* Recommended badge */}
              {formula.recommended && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-partner-accent text-slate-900 text-xs font-bold px-4 py-1 rounded-full flex items-center gap-1">
                    <Star className="w-3 h-3" />
                    LE PLUS POPULAIRE
                  </span>
                </div>
              )}

              {/* Header */}
              <div className="text-center mb-6">
                <span className="text-2xl">{formula.subtitle.split(" ")[0]}</span>
                <h3 className={`text-xl font-bold mb-1 ${formula.recommended ? "text-partner-accent" : "text-white"}`}>
                  {formula.name}
                </h3>
                <p className="text-sm text-gray-500">{formula.subtitle.split(" ").slice(1).join(" ")}</p>
              </div>

              {/* Price */}
              <div className="text-center mb-6">
                <div className="flex items-baseline justify-center gap-1">
                  <span className={`text-4xl font-bold ${formula.recommended ? "text-partner-accent" : "text-white"}`}>
                    {formula.price.amount}
                  </span>
                  <span className="text-gray-400">{formula.price.period}</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">{formula.description}</p>
              </div>

              {/* Earnings highlight */}
              <div className="bg-slate-700/30 rounded-lg p-4 mb-6">
                <p className="text-sm text-gray-400 mb-1">Ce que tu gagnes :</p>
                <p className="text-partner-accent font-medium text-sm mb-2">{formula.earnings.model}</p>
                <p className="text-xs text-gray-500 italic">{formula.earnings.example}</p>
              </div>

              {/* Features */}
              <ul className="space-y-2 mb-6">
                {formula.features.map((feature, i) => (
                  <li
                    key={i}
                    className={`flex items-center gap-2 text-sm ${
                      feature.included ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {feature.included ? (
                      <Check className={`w-4 h-4 flex-shrink-0 ${feature.highlight ? "text-partner-accent" : "text-green-400"}`} />
                    ) : (
                      <X className="w-4 h-4 text-gray-600 flex-shrink-0" />
                    )}
                    <span className={feature.highlight ? "text-partner-accent font-medium" : ""}>
                      {feature.name}
                    </span>
                  </li>
                ))}
              </ul>

              {/* Ideal for */}
              <div className="border-t border-slate-700/50 pt-4 mb-6">
                <p className="text-xs text-gray-500 mb-2">Idéal pour :</p>
                <ul className="space-y-1">
                  {formula.idealFor.map((item, i) => (
                    <li key={i} className="text-xs text-gray-400 flex items-start gap-1">
                      <span className="text-partner-accent">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA */}
              <button
                className={`w-full py-3 rounded-lg font-bold transition-all flex items-center justify-center gap-2 ${formula.ctaStyle}`}
              >
                {formula.cta}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        {/* Comparison Table */}
        <div className="max-w-4xl mx-auto">
          <h3 className="text-xl font-bold text-white text-center mb-6">Comparatif rapide</h3>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-slate-700">
                  <th className="text-left py-3 px-4 text-gray-400 font-medium">Critère</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">Revenue Share</th>
                  <th className="text-center py-3 px-4 text-partner-accent font-bold">Licence Pro ⭐</th>
                  <th className="text-center py-3 px-4 text-gray-400 font-medium">All-In</th>
                </tr>
              </thead>
              <tbody>
                {formulaComparisonTable.map((row, i) => (
                  <tr key={i} className="border-b border-slate-800">
                    <td className="py-3 px-4 text-gray-300 text-sm">{row.criteria}</td>
                    <td className="py-3 px-4 text-center text-gray-400 text-sm">{row.revshare}</td>
                    <td className="py-3 px-4 text-center text-white text-sm font-medium">{row.pro}</td>
                    <td className="py-3 px-4 text-center text-gray-400 text-sm">{row.allin}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <p className="text-center text-gray-500 text-sm mt-6">
            💡 Tu peux changer de formule à tout moment. Démarre en Revenue Share, passe en Licence Pro quand tu es prêt.
          </p>
        </div>
      </div>
    </section>
  )
}

export default PricingFormulasSection
