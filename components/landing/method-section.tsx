"use client"

import { Layers, GraduationCap, Users, ArrowRight, CheckCircle2 } from "lucide-react"

const pillars = [
  {
    id: "plateforme",
    icon: Layers,
    emoji: "📊",
    title: "Plateforme d'évaluation",
    subtitle: "Mesurez votre conformité en temps réel",
    description: "Tableaux de bord intelligents, évaluations continues et génération automatique de preuves auditables.",
    features: [
      "Dashboard de conformité par norme",
      "Évaluations par équipe et par processus",
      "Génération de rapports et preuves",
      "Alertes sur points critiques"
    ],
    color: "blue",
    bgClass: "bg-blue-500/10 border-blue-500/20",
    iconBgClass: "bg-blue-500/20",
    iconClass: "text-blue-400",
    hoverClass: "hover:border-blue-500/50"
  },
  {
    id: "formation",
    icon: GraduationCap,
    emoji: "🎓",
    title: "Formation continue",
    subtitle: "Formez vos équipes aux exigences",
    description: "Modules e-learning par rôle et par norme, tracking de progression et attestations automatiques.",
    features: [
      "Parcours personnalisés par métier",
      "Bibliothèque 100+ modules QHSE",
      "Quiz et certifications internes",
      "Suivi individuel et collectif"
    ],
    color: "green",
    bgClass: "bg-green-500/10 border-green-500/20",
    iconBgClass: "bg-green-500/20",
    iconClass: "text-green-400",
    hoverClass: "hover:border-green-500/50"
  },
  {
    id: "consulting",
    icon: Users,
    emoji: "👨‍💼",
    title: "Expertise terrain",
    subtitle: "15 ans d'expérience QHSE",
    description: "Consultants certifiés, audits blancs sur site et production de documentation conforme.",
    features: [
      "Consultant dédié par projet",
      "Audits blancs trimestriels",
      "Procédures et modes opératoires",
      "Accompagnement jusqu'à l'audit"
    ],
    color: "gold",
    bgClass: "bg-vyxo-gold/10 border-vyxo-gold/20",
    iconBgClass: "bg-vyxo-gold/20",
    iconClass: "text-vyxo-gold",
    hoverClass: "hover:border-vyxo-gold/50"
  }
]

export function MethodSection() {
  return (
    <section id="method-section" className="py-20 bg-gradient-to-b from-vyxo-navy to-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-vyxo-gold text-sm font-semibold tracking-wider uppercase mb-4 block">
            Notre approche hybride
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Vyxo Codex n&apos;est <span className="text-vyxo-gold">pas un logiciel</span>.
            <br />
            C&apos;est un programme de transformation.
          </h2>
          <p className="text-lg text-gray-400">
            L&apos;alliance unique de la technologie, de la pédagogie et de l&apos;expertise terrain 
            pour garantir votre conformité et préparer vos équipes aux audits.
          </p>
        </div>

        {/* 3 Piliers */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon
            return (
              <div
                key={pillar.id}
                className={`relative rounded-2xl border p-8 transition-all duration-300 ${pillar.bgClass} ${pillar.hoverClass} group hover:-translate-y-2`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {/* Icon */}
                <div className={`w-16 h-16 rounded-2xl ${pillar.iconBgClass} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 ${pillar.iconClass}`} />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className={`text-sm ${pillar.iconClass} mb-4`}>
                  {pillar.subtitle}
                </p>

                {/* Description */}
                <p className="text-gray-400 text-sm mb-6">
                  {pillar.description}
                </p>

                {/* Features */}
                <ul className="space-y-3">
                  {pillar.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-gray-300">
                      <CheckCircle2 className={`w-4 h-4 ${pillar.iconClass} flex-shrink-0 mt-0.5`} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* Decorative number */}
                <div className={`absolute top-4 right-4 text-6xl font-bold ${pillar.iconClass} opacity-10`}>
                  {index + 1}
                </div>
              </div>
            )
          })}
        </div>

        {/* Conclusion */}
        <div className="text-center max-w-2xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
            <div className="flex justify-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-blue-500/20 flex items-center justify-center">
                <Layers className="w-5 h-5 text-blue-400" />
              </div>
              <div className="text-2xl text-white">+</div>
              <div className="w-10 h-10 rounded-full bg-green-500/20 flex items-center justify-center">
                <GraduationCap className="w-5 h-5 text-green-400" />
              </div>
              <div className="text-2xl text-white">+</div>
              <div className="w-10 h-10 rounded-full bg-vyxo-gold/20 flex items-center justify-center">
                <Users className="w-5 h-5 text-vyxo-gold" />
              </div>
            </div>
            
            <h3 className="text-xl md:text-2xl font-bold text-white mb-4">
              C&apos;est l&apos;alliance des <span className="text-vyxo-gold">trois</span> qui fait la différence.
            </h3>
            <p className="text-gray-400 mb-6">
              Pas de formation sans suivi terrain. Pas d&apos;outil sans expertise. 
              Pas d&apos;accompagnement sans mesure.
            </p>
            
            <button className="inline-flex items-center gap-2 bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy font-bold py-3 px-6 rounded-lg transition-all hover:scale-105">
              Découvrir comment ça marche
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default MethodSection
