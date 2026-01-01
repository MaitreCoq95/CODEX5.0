"use client"

import { Send, GraduationCap, Rocket, TrendingUp, Trophy, CheckCircle } from "lucide-react"

const steps = [
  {
    number: "01",
    icon: Send,
    title: "Candidature",
    timing: "Aujourd'hui",
    description: "Tu remplis le formulaire ci-dessous. On analyse ton profil sous 48h.",
    action: "Appel de qualification (30min)",
    color: "partner-accent"
  },
  {
    number: "02",
    icon: GraduationCap,
    title: "Onboarding",
    timing: "Semaine 1",
    description: "Accès à la plateforme en mode test. Formation initiale de 2 jours (distanciel).",
    action: "Signature du contrat partenaire",
    color: "blue-400"
  },
  {
    number: "03",
    icon: Rocket,
    title: "Première mission",
    timing: "Mois 1-2",
    description: "Tu intègres Vyxo sur ta prochaine mission. Support rapproché Vyxo (coaching).",
    action: "Premier client équipé ✅",
    color: "purple-400"
  },
  {
    number: "04",
    icon: TrendingUp,
    title: "Montée en charge",
    timing: "Mois 3-6",
    description: "Tu équipes 3-5 clients. Tu maîtrises la plateforme à 100%. Ton MRR monte.",
    action: "Ajustement formule si besoin",
    color: "orange-400"
  },
  {
    number: "05",
    icon: Trophy,
    title: "Autonomie",
    timing: "Mois 6+",
    description: "Tu es 100% autonome. Ton offre Consulting + SaaS est rodée. MRR établi.",
    action: "Tu deviens success story Vyxo",
    color: "partner-highlight"
  }
]

export function JourneyTimeline() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-partner-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
            Le parcours
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Comment ça se passe <span className="text-partner-accent">concrètement</span>
          </h2>
          <p className="text-lg text-gray-400">
            De la candidature à l&apos;autonomie en 6 mois max.
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-partner-accent via-purple-400 to-partner-highlight transform md:-translate-x-1/2" />

            {/* Steps */}
            <div className="space-y-8">
              {steps.map((step, i) => {
                const Icon = step.icon
                const isEven = i % 2 === 0
                
                return (
                  <div key={i} className="relative">
                    {/* Mobile layout */}
                    <div className="md:hidden flex gap-4">
                      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center z-10">
                        <Icon className={`w-6 h-6 text-${step.color}`} />
                      </div>
                      <div className="flex-1 bg-slate-800/50 border border-slate-700/50 rounded-xl p-4">
                        <div className="flex items-center gap-2 mb-2">
                          <span className={`text-${step.color} text-sm font-bold`}>{step.number}</span>
                          <span className="text-gray-500 text-xs">{step.timing}</span>
                        </div>
                        <h4 className="text-white font-bold mb-2">{step.title}</h4>
                        <p className="text-gray-400 text-sm mb-3">{step.description}</p>
                        <div className="flex items-center gap-2 text-sm">
                          <CheckCircle className={`w-4 h-4 text-${step.color}`} />
                          <span className="text-gray-300">{step.action}</span>
                        </div>
                      </div>
                    </div>

                    {/* Desktop layout */}
                    <div className={`hidden md:flex items-center gap-8 ${isEven ? "" : "flex-row-reverse"}`}>
                      <div className={`flex-1 ${isEven ? "text-right" : "text-left"}`}>
                        <div className={`bg-slate-800/50 border border-slate-700/50 rounded-xl p-6 ${isEven ? "mr-4" : "ml-4"}`}>
                          <div className={`flex items-center gap-2 mb-2 ${isEven ? "justify-end" : ""}`}>
                            <span className={`text-${step.color} text-sm font-bold`}>{step.number}</span>
                            <span className="text-gray-500 text-xs">{step.timing}</span>
                          </div>
                          <h4 className="text-white font-bold text-lg mb-2">{step.title}</h4>
                          <p className="text-gray-400 text-sm mb-3">{step.description}</p>
                          <div className={`flex items-center gap-2 text-sm ${isEven ? "justify-end" : ""}`}>
                            <CheckCircle className={`w-4 h-4 text-${step.color}`} />
                            <span className="text-gray-300">{step.action}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Center icon */}
                      <div className="flex-shrink-0 w-16 h-16 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center z-10">
                        <Icon className={`w-6 h-6 text-${step.color}`} />
                      </div>
                      
                      <div className="flex-1" />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Note */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm">
            💡 Durée moyenne pour atteindre l&apos;autonomie : <strong className="text-white">4-6 mois</strong>
          </p>
        </div>
      </div>
    </section>
  )
}

export default JourneyTimeline
