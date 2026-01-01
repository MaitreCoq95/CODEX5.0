"use client"

import { 
  BarChart3, 
  BookOpen, 
  FileText, 
  Target,
  GraduationCap,
  FileEdit,
  Headphones,
  Presentation,
  Megaphone,
  CheckCircle
} from "lucide-react"

const platformFeatures = [
  {
    icon: BarChart3,
    title: "Dashboard de conformité",
    points: [
      "Vue temps réel de l'état client",
      "Scoring automatique par norme",
      "Identification écarts critiques",
      "Export PDF en 1 clic"
    ]
  },
  {
    icon: BookOpen,
    title: "Modules par norme",
    points: [
      "GDP (Pharma/Transport)",
      "ISO 9001, 45001, 14001",
      "HACCP / IFS / BRC",
      "EN 9100 (Aéro) + 15 autres"
    ]
  },
  {
    icon: GraduationCap,
    title: "LMS intégré",
    points: [
      "Parcours formation personnalisés",
      "Bibliothèque e-learning",
      "Tracking progression équipes",
      "Certifications générées"
    ]
  },
  {
    icon: FileText,
    title: "Générateur documents",
    points: [
      "Procédures auto-générées",
      "Plans d'action avec suivi",
      "Rapports d'audit formatés",
      "Templates personnalisables"
    ]
  }
]

const supportFeatures = [
  {
    icon: Target,
    title: "Formation initiale",
    points: [
      "Jour 1: Maîtrise plateforme",
      "Jour 2: Méthodologie vente",
      "Certification Vyxo Partner",
      "Support post-formation 30j"
    ]
  },
  {
    icon: FileEdit,
    title: "Templates métier",
    points: [
      "Procédures GDP/ISO par secteur",
      "Trames d'audit blanc",
      "Check-lists conformité",
      "Gain: 10-15h par mission"
    ]
  },
  {
    icon: Headphones,
    title: "Support dédié",
    points: [
      "Email (24-48h selon formule)",
      "Hotline (All-In)",
      "Base de connaissance",
      "Webinars mensuels"
    ]
  },
  {
    icon: Presentation,
    title: "Sales enablement",
    points: [
      "Pitch deck personnalisable",
      "Vidéos démo prospects",
      "Calculateur ROI client",
      "Arguments anti-objections"
    ]
  }
]

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gradient-to-b from-slate-900 to-slate-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-partner-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
            Ce qui est inclus
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Tout ce que tu obtiens en devenant <span className="text-partner-accent">partenaire</span>
          </h2>
        </div>

        {/* Two Column Grid */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          
          {/* Column 1: Platform */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-partner-accent/20 flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-partner-accent" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">LA PLATEFORME VYXO</h3>
                <p className="text-gray-400 text-sm">Technologie clé-en-main</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {platformFeatures.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-5 h-5 text-partner-accent" />
                      <h4 className="text-white font-medium">{feature.title}</h4>
                    </div>
                    <ul className="space-y-1">
                      {feature.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                          <CheckCircle className="w-3 h-3 text-partner-accent mt-1 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Column 2: Support */}
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 rounded-xl bg-partner-highlight/20 flex items-center justify-center">
                <Megaphone className="w-6 h-6 text-partner-highlight" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">L&apos;ACCOMPAGNEMENT</h3>
                <p className="text-gray-400 text-sm">Support et outils de vente</p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {supportFeatures.map((feature, i) => {
                const Icon = feature.icon
                return (
                  <div key={i}>
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="w-5 h-5 text-partner-highlight" />
                      <h4 className="text-white font-medium">{feature.title}</h4>
                    </div>
                    <ul className="space-y-1">
                      {feature.points.map((point, j) => (
                        <li key={j} className="flex items-start gap-2 text-sm text-gray-400">
                          <CheckCircle className="w-3 h-3 text-partner-highlight mt-1 flex-shrink-0" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Bonus All-In */}
        <div className="max-w-4xl mx-auto mt-8">
          <div className="bg-gradient-to-r from-partner-highlight/10 to-partner-accent/10 border border-partner-highlight/30 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-4">
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏆</span>
                <span className="text-white font-bold">BONUS Formule All-In:</span>
              </div>
              <div className="flex flex-wrap gap-3">
                <span className="bg-slate-800/50 text-gray-300 text-sm px-3 py-1 rounded-full">
                  Co-marketing Vyxo
                </span>
                <span className="bg-slate-800/50 text-gray-300 text-sm px-3 py-1 rounded-full">
                  Leads partagés (zone géo)
                </span>
                <span className="bg-slate-800/50 text-gray-300 text-sm px-3 py-1 rounded-full">
                  API access
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default FeaturesSection
