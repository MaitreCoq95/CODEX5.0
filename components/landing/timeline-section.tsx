"use client"

import { ClipboardCheck, GraduationCap, Settings, Award, ArrowRight } from "lucide-react"

const steps = [
  {
    id: 1,
    icon: ClipboardCheck,
    title: "Évaluation initiale",
    subtitle: "Semaine 1-2",
    description: "Diagnostic complet de votre maturité actuelle pour chaque norme visée. Où en êtes-vous vraiment ?",
    deliverables: [
      "Score de maturité par domaine",
      "Cartographie des écarts",
      "Rapport de priorisation",
      "Plan d&apos;action personnalisé"
    ],
    who: "Consultant VYXO + Plateforme",
    color: "blue",
    bgClass: "bg-blue-500",
    borderClass: "border-blue-500"
  },
  {
    id: 2,
    icon: GraduationCap,
    title: "Formation des équipes",
    subtitle: "Mois 1-6",
    description: "Parcours de formation personnalisés pour chaque collaborateur selon son rôle dans le système qualité.",
    deliverables: [
      "Parcours e-learning assignés",
      "Sessions terrain en option",
      "Évaluations individuelles",
      "Attestations de formation"
    ],
    who: "Vos équipes + LMS Vyxo",
    color: "green",
    bgClass: "bg-green-500",
    borderClass: "border-green-500"
  },
  {
    id: 3,
    icon: Settings,
    title: "Mise en conformité",
    subtitle: "Mois 3-12",
    description: "Accompagnement dans la production documentaire et la mise en place des procédures terrain.",
    deliverables: [
      "Procédures et modes opératoires",
      "Audits blancs internes",
      "Tableaux de suivi compliance",
      "Préparation des preuves"
    ],
    who: "Consultant dédié + Plateforme",
    color: "amber",
    bgClass: "bg-amber-500",
    borderClass: "border-amber-500"
  },
  {
    id: 4,
    icon: Award,
    title: "Audit & Validation",
    subtitle: "Mois 12-18",
    description: "Préparation finale à l&apos;audit, répétition générale et support le jour J.",
    deliverables: [
      "Simulation audit complet",
      "Brief équipes pré-audit",
      "Support pendant l&apos;audit",
      "Conformité validée ✅"
    ],
    who: "Vous + VYXO + Auditeur",
    color: "vyxo-gold",
    bgClass: "bg-vyxo-gold",
    borderClass: "border-vyxo-gold"
  }
]

export function TimelineSection() {
  return (
    <section id="timeline-section" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-vyxo-gold text-sm font-semibold tracking-wider uppercase mb-4 block">
            Comment ça marche
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Votre parcours vers la <span className="text-vyxo-gold">conformité</span>
          </h2>
          <p className="text-lg text-gray-400">
            De l&apos;évaluation initiale jusqu&apos;à l&apos;audit validé, 
            nous vous accompagnons à chaque étape.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative max-w-5xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-amber-500 to-vyxo-gold transform md:-translate-x-1/2" />

          {/* Steps */}
          <div className="space-y-12">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isEven = index % 2 === 0
              
              return (
                <div
                  key={step.id}
                  className={`relative flex flex-col md:flex-row items-start gap-8 ${
                    isEven ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Icon circle */}
                  <div className="absolute left-8 md:left-1/2 transform -translate-x-1/2 z-10">
                    <div className={`w-16 h-16 rounded-full ${step.bgClass} flex items-center justify-center shadow-lg`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                  </div>

                  {/* Content card */}
                  <div className={`ml-24 md:ml-0 md:w-[calc(50%-4rem)] ${isEven ? "md:pr-8" : "md:pl-8"}`}>
                    <div className={`bg-white/5 border ${step.borderClass}/30 rounded-2xl p-6 hover:border-${step.color}/50 transition-all hover:-translate-y-1`}>
                      {/* Header */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className={`text-sm font-semibold px-3 py-1 rounded-full ${step.bgClass}/20 text-${step.color === "vyxo-gold" ? "vyxo-gold" : step.color + "-400"}`}>
                          {step.subtitle}
                        </span>
                        <span className="text-xs text-gray-500">Étape {step.id}/4</span>
                      </div>

                      {/* Title */}
                      <h3 className="text-xl font-bold text-white mb-2">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm mb-4">
                        {step.description}
                      </p>

                      {/* Deliverables */}
                      <div className="space-y-2 mb-4">
                        <p className="text-xs text-gray-500 uppercase tracking-wider">Livrables :</p>
                        <ul className="grid grid-cols-2 gap-1">
                          {step.deliverables.map((item, i) => (
                            <li key={i} className="text-xs text-gray-300 flex items-center gap-1">
                              <span className={`w-1.5 h-1.5 rounded-full ${step.bgClass}`} />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Who */}
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span>👥</span>
                        <span>{step.who}</span>
                      </div>
                    </div>
                  </div>

                  {/* Empty space for alternating layout */}
                  <div className="hidden md:block md:w-[calc(50%-4rem)]" />
                </div>
              )
            })}
          </div>
        </div>

        {/* Stats banner */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-vyxo-gold/10 via-green-500/10 to-blue-500/10 border border-white/10 rounded-2xl p-6 md:p-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-vyxo-gold">12-18</p>
                <p className="text-sm text-gray-400">mois en moyenne</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-green-400">95%</p>
                <p className="text-sm text-gray-400">taux de réussite</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-blue-400">100+</p>
                <p className="text-sm text-gray-400">entreprises accompagnées</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-amber-400">15</p>
                <p className="text-sm text-gray-400">ans d&apos;expertise</p>
              </div>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="inline-flex items-center gap-2 bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy font-bold py-4 px-8 rounded-lg transition-all hover:scale-105">
            Évaluer ma conformité maintenant
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

export default TimelineSection
