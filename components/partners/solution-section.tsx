"use client"

import { Monitor, Heart, Repeat, CheckCircle, ArrowRight } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Monitor,
    title: "Utilise Vyxo dans tes missions",
    description: "Tu gardes ta méthodo, tu ajoutes juste l'outil. Dashboard temps réel, modules d'évaluation, génération de rapports automatique.",
    highlights: ["Dashboard conformité", "Modules par norme", "Rapports auto-générés", "Brandé à ton nom"]
  },
  {
    number: "02",
    icon: Heart,
    title: "Tes clients adorent (et paient plus)",
    description: "Ils voient un outil pro digne des gros cabinets. Tu factures la mission + le SaaS. Panier moyen +50% minimum.",
    highlights: ["Crédibilité accrue", "Prix justifié", "Différenciation", "Valeur perçue x2"]
  },
  {
    number: "03",
    icon: Repeat,
    title: "Tu génères du MRR à vie",
    description: "Après ta mission, le client continue à utiliser Vyxo. Tu touches une commission récurrente. 10 clients = 1500€/mois passif.",
    highlights: ["Commission à vie", "Revenus récurrents", "Valorisation x10", "Liberté financière"]
  }
]

export function SolutionSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="container mx-auto px-4">
        {/* Header avec intro Vivien */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row items-start gap-6">
              {/* Avatar */}
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-partner-accent/20 flex items-center justify-center text-partner-accent text-3xl font-bold">
                  VC
                </div>
              </div>
              
              {/* Message */}
              <div>
                <p className="text-white text-lg leading-relaxed mb-4">
                  <span className="text-partner-accent font-bold">&quot;Je suis Vivien, fondateur de Vyxo.</span>{" "}
                  J&apos;ai fait 15 ans de consulting QHSE (GDP, ISO 9001, aéro, pharma). J&apos;ai vécu exactement ces problèmes. 
                  J&apos;ai construit Vyxo pour les résoudre.&quot;
                </p>
                <p className="text-gray-400">
                  Pas pour remplacer les consultants. Pour les <strong className="text-white">amplifier</strong>.
                </p>
                <div className="mt-4 flex flex-wrap gap-3 text-sm">
                  <span className="bg-slate-700/50 px-3 py-1 rounded-full text-gray-300">Lead Auditor ISO 9001</span>
                  <span className="bg-slate-700/50 px-3 py-1 rounded-full text-gray-300">Expert GDP</span>
                  <span className="bg-slate-700/50 px-3 py-1 rounded-full text-gray-300">15 ans terrain</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Title */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Vyxo résout ces <span className="text-partner-accent">4 problèmes</span> en une solution
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Comment ça marche concrètement :
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
            {steps.map((step, i) => {
              const Icon = step.icon
              return (
                <div key={i} className="relative">
                  {/* Connector line */}
                  {i < steps.length - 1 && (
                    <div className="absolute left-10 top-24 bottom-0 w-0.5 bg-gradient-to-b from-partner-accent/50 to-transparent hidden md:block" />
                  )}
                  
                  <div className="flex flex-col md:flex-row gap-6 items-start">
                    {/* Number/Icon */}
                    <div className="flex-shrink-0 w-20 h-20 rounded-2xl bg-partner-accent/10 border border-partner-accent/30 flex items-center justify-center">
                      <div className="text-center">
                        <span className="text-partner-accent text-2xl font-bold">{step.number}</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="flex-1 bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
                      <div className="flex items-center gap-3 mb-3">
                        <Icon className="w-6 h-6 text-partner-accent" />
                        <h3 className="text-xl font-bold text-white">{step.title}</h3>
                      </div>
                      <p className="text-gray-400 mb-4">{step.description}</p>
                      
                      {/* Highlights */}
                      <div className="flex flex-wrap gap-2">
                        {step.highlights.map((h, j) => (
                          <span key={j} className="flex items-center gap-1 text-sm text-gray-300 bg-slate-700/30 px-3 py-1 rounded-full">
                            <CheckCircle className="w-3 h-3 text-partner-accent" />
                            {h}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Call-out box vert */}
        <div className="max-w-3xl mx-auto mt-16">
          <div className="bg-partner-accent/10 border-2 border-partner-accent/30 rounded-2xl p-6 text-center">
            <p className="text-partner-accent text-xl md:text-2xl font-bold mb-2">
              Ton expertise + Notre technologie = Offre imbattable
            </p>
            <p className="text-gray-400 mb-4">
              Tu gardes ton indépendance. Tu multiplies ton impact.
            </p>
            <button className="inline-flex items-center gap-2 bg-partner-accent hover:bg-partner-accent/90 text-slate-900 font-bold py-3 px-6 rounded-lg transition-all">
              Voir les formules
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SolutionSection
