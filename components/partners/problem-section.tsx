"use client"

import { TrendingDown, BarChart2, HelpCircle, RefreshCcw } from "lucide-react"

const problems = [
  {
    icon: TrendingDown,
    emoji: "📉",
    title: "Panier moyen limité",
    subtitle: "Vos missions sont one-shot",
    points: [
      "Mission GDP = 20-30K€",
      "Fin de mission = 0€ de revenu",
      "Impossible de facturer le suivi",
      "Client content mais vous rapporte rien après"
    ],
    color: "red"
  },
  {
    icon: BarChart2,
    emoji: "📊",
    title: "Clients exigeants",
    subtitle: "\"Tu peux me faire un dashboard Excel?\"",
    points: [
      "Ils veulent du reporting temps réel",
      "Tu passes 10h/semaine sur Excel",
      "Tu factures pas ces heures",
      "Rendu pas pro vs les gros cabinets"
    ],
    color: "orange"
  },
  {
    icon: HelpCircle,
    emoji: "🤷",
    title: "Différenciation impossible",
    subtitle: "\"Pourquoi vous vs Bureau Veritas?\"",
    points: [
      "Seul argument = prix plus bas",
      "Course au moins-disant",
      "Crédibilité limitée face aux gros",
      "Aucun outil propriétaire"
    ],
    color: "yellow"
  },
  {
    icon: RefreshCcw,
    emoji: "🔄",
    title: "Pas de récurrence",
    subtitle: "Chaque mois, tu recommences à zéro",
    points: [
      "0€ de MRR",
      "Tout ton CA dépend de nouvelles missions",
      "Impossible de valoriser ton activité",
      "Burnout à prospecter en continu"
    ],
    color: "purple"
  }
]

const colorClasses = {
  red: {
    bg: "bg-red-500/10",
    border: "border-red-500/20",
    text: "text-red-400",
    icon: "text-red-400"
  },
  orange: {
    bg: "bg-orange-500/10",
    border: "border-orange-500/20",
    text: "text-orange-400",
    icon: "text-orange-400"
  },
  yellow: {
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20",
    text: "text-yellow-400",
    icon: "text-yellow-400"
  },
  purple: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/20",
    text: "text-purple-400",
    icon: "text-purple-400"
  }
}

export function ProblemSection() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Ton vrai problème <span className="text-red-400">(et tu le sais)</span>
          </h2>
          <p className="text-lg text-gray-400">
            Soyons honnêtes. Tu es bon dans ce que tu fais. 
            Mais ton modèle te limite.
          </p>
        </div>

        {/* Problem Cards Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto mb-12">
          {problems.map((problem, i) => {
            const colors = colorClasses[problem.color as keyof typeof colorClasses]
            const Icon = problem.icon
            
            return (
              <div
                key={i}
                className={`${colors.bg} ${colors.border} border rounded-2xl p-6 transition-all hover:scale-[1.02]`}
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className={`w-12 h-12 rounded-xl ${colors.bg} flex items-center justify-center text-2xl`}>
                    {problem.emoji}
                  </div>
                  <div>
                    <h3 className={`text-xl font-bold ${colors.text} mb-1`}>
                      {problem.title}
                    </h3>
                    <p className="text-gray-400 text-sm italic">
                      {problem.subtitle}
                    </p>
                  </div>
                </div>
                
                <ul className="space-y-2">
                  {problem.points.map((point, j) => (
                    <li key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                      <span className={`${colors.text} mt-1`}>•</span>
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            )
          })}
        </div>

        {/* Call-out box */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-500/10 border-2 border-red-500/30 rounded-2xl p-6 text-center">
            <p className="text-red-400 text-xl md:text-2xl font-bold mb-2">
              Résultat: Tu es bloqué à 80-120K€/an
            </p>
            <p className="text-gray-400">
              Et tu bosses 50h/semaine pour maintenir ce chiffre.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProblemSection
