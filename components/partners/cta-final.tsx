"use client"

import { ArrowRight, Calendar, Users, Award, CheckCircle, Shield } from "lucide-react"

interface CTAFinalProps {
  onScrollToForm?: () => void
  onBookDemo?: () => void
}

export function CTAFinalSection({ onScrollToForm, onBookDemo }: CTAFinalProps) {
  return (
    <>
      {/* Main CTA Section */}
      <section className="py-20 bg-gradient-to-b from-slate-950 to-partner-accent/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            {/* Header */}
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
              Prêt à passer au <span className="text-partner-accent">niveau supérieur</span>?
            </h2>
            <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
              Rejoins les consultants QHSE qui ont choisi d&apos;augmenter leur panier moyen 
              de 50% et de générer du MRR récurrent avec Vyxo.
            </p>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
              {[
                { icon: Users, value: "3", label: "partenaires actifs" },
                { icon: Award, value: "12", label: "clients équipés" },
                { icon: CheckCircle, value: "165K€", label: "CA moyen partenaire" },
                { icon: Shield, value: "95%", label: "satisfaction" }
              ].map((stat, i) => {
                const Icon = stat.icon
                return (
                  <div key={i} className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-4">
                    <Icon className="w-6 h-6 text-partner-accent mx-auto mb-2" />
                    <p className="text-2xl md:text-3xl font-bold text-white">{stat.value}</p>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                )
              })}
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button 
                onClick={onScrollToForm}
                className="bg-partner-accent hover:bg-partner-accent/90 text-slate-900 font-bold py-4 px-8 rounded-lg text-lg transition-all hover:scale-105 shadow-lg shadow-partner-accent/25 flex items-center justify-center gap-2"
              >
                Devenir partenaire maintenant
                <ArrowRight className="w-5 h-5" />
              </button>
              <button 
                onClick={onBookDemo}
                className="border-2 border-white/30 hover:border-white/50 text-white font-medium py-4 px-8 rounded-lg text-lg transition-all flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Réserver un appel découverte
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance Footer */}
      <section className="py-8 bg-slate-950 border-t border-slate-800">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="grid md:grid-cols-2 gap-6">
              {/* Certifications */}
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-partner-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-medium mb-2">Certifications Vyxo</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Fondateur certifié Lead Auditor ISO 9001/45001</li>
                    <li>• 15 ans d&apos;expertise terrain QHSE</li>
                    <li>• Clients dans pharma/transport/aéro</li>
                  </ul>
                </div>
              </div>

              {/* Engagement */}
              <div className="flex items-start gap-4">
                <CheckCircle className="w-6 h-6 text-partner-accent flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-medium mb-2">Engagement partenaire</h4>
                  <ul className="text-sm text-gray-400 space-y-1">
                    <li>• Contrat résiliable sans engagement (formules A et B)</li>
                    <li>• Support réactif 24-48h</li>
                    <li>• Formation incluse (valeur 1200€)</li>
                    <li>• Pas de frais cachés</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default CTAFinalSection
