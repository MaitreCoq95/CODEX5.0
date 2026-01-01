"use client"

import { 
  ClipboardCheck, 
  GraduationCap, 
  BarChart3, 
  BrainCircuit,
  Zap
} from "lucide-react"

const features = [
  {
    icon: ClipboardCheck,
    title: "1. Diagnostiquer",
    description: "Évaluez la maturité de vos processus par rapport aux standards (GDP, ISO, HACCP). Identifiez immédiatement les écarts.",
    color: "text-blue-500",
    bg: "bg-blue-500/10",
    border: "border-blue-500/20"
  },
  {
    icon: GraduationCap,
    title: "2. Former",
    description: "Générez des plans de formation personnalisés. Modules courts, interactifs et ciblés sur vos lacunes spécifiques.",
    color: "text-emerald-500",
    bg: "bg-emerald-500/10",
    border: "border-emerald-500/20"
  },
  {
    icon: BarChart3,
    title: "3. Piloter",
    description: "Suivez la progression de vos équipes et l'évolution de votre conformité grâce à des tableaux de bord dynamiques.",
    color: "text-purple-500",
    bg: "bg-purple-500/10",
    border: "border-purple-500/20"
  },
  {
    icon: BrainCircuit,
    title: "4. Optimiser (IA)",
    description: "Notre IA analyse vos performances et suggère des actions correctives pour viser l'excellence continue.",
    color: "text-vyxo-gold",
    bg: "bg-yellow-500/10",
    border: "border-yellow-500/20"
  }
]

export function FeatureGrid() {
  return (
    <section className="py-20 bg-white/5 border-y border-white/10">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <span className="text-vyxo-gold font-semibold tracking-wider text-sm uppercase">Méthodologie</span>
          <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-6">Le cercle vertueux de la performance</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f, i) => (
            <div 
              key={i} 
              className={`p-6 rounded-2xl border ${f.border} bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all group`}
            >
              <div className={`w-12 h-12 rounded-xl ${f.bg} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                <f.icon className={`w-6 h-6 ${f.color}`} />
              </div>
              <h3 className="text-lg font-bold mb-3">{f.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                {f.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
