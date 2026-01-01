"use client"

import { CheckCircle, XCircle, AlertTriangle } from "lucide-react"

const idealProfile = [
  {
    category: "Expérience",
    items: [
      "Minimum 3 ans en consulting QHSE",
      "Au moins 5 missions de certification menées",
      "Spécialisation sur 1-3 normes (GDP, ISO, HACCP...)"
    ]
  },
  {
    category: "Portfolio",
    items: [
      "Minimum 2 clients actifs actuellement",
      "CA annuel > 60K€",
      "Capacité à absorber 2-3 nouveaux clients/an"
    ]
  },
  {
    category: "Mindset",
    items: [
      "Ouvert aux outils tech (pas allergique au digital)",
      "Envie de faire évoluer son modèle",
      "Prêt à former ses clients sur Vyxo",
      "Vision long terme (pas one-shot)"
    ]
  }
]

const notCompatible = [
  "Consultant en poste (pas indépendant)",
  "Salarié d'un cabinet qui veut utiliser Vyxo en cachette",
  "Débutant sans références client",
  "Cherche juste à revendre du SaaS sans expertise consulting",
  "Pas de portfolio client existant"
]

export function CriteriaSection() {
  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-partner-highlight text-sm font-semibold tracking-wider uppercase mb-4 block">
            Critères de sélection
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            On ne recrute <span className="text-partner-highlight">pas tout le monde</span>
          </h2>
          <p className="text-lg text-gray-400">
            Vyxo n&apos;est pas une marketplace. On construit un réseau de consultants d&apos;élite.
            Voici nos critères.
          </p>
        </div>

        {/* Two columns */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          
          {/* Profil idéal */}
          <div className="bg-partner-accent/5 border border-partner-accent/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-partner-accent/20 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-partner-accent" />
              </div>
              <h3 className="text-xl font-bold text-white">✅ Profil idéal</h3>
            </div>

            <div className="space-y-6">
              {idealProfile.map((section, i) => (
                <div key={i}>
                  <h4 className="text-partner-accent font-medium mb-3">{section.category}</h4>
                  <ul className="space-y-2">
                    {section.items.map((item, j) => (
                      <li key={j} className="flex items-start gap-2 text-gray-300 text-sm">
                        <CheckCircle className="w-4 h-4 text-partner-accent mt-0.5 flex-shrink-0" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Profil NON compatible */}
          <div className="bg-red-500/5 border border-red-500/20 rounded-2xl p-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-full bg-red-500/20 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-400" />
              </div>
              <h3 className="text-xl font-bold text-white">❌ Profil NON compatible</h3>
            </div>

            <ul className="space-y-3">
              {notCompatible.map((item, i) => (
                <li key={i} className="flex items-start gap-2 text-gray-400 text-sm">
                  <XCircle className="w-4 h-4 text-red-400 mt-0.5 flex-shrink-0" />
                  {item}
                </li>
              ))}
            </ul>

            <div className="mt-6 bg-red-500/10 rounded-lg p-4">
              <p className="text-red-400 text-sm">
                Si tu rentres dans ces catégories, on préfère être honnêtes: ce programme n&apos;est pas fait pour toi.
              </p>
            </div>
          </div>
        </div>

        {/* Call-out */}
        <div className="max-w-3xl mx-auto mt-12">
          <div className="bg-partner-highlight/10 border border-partner-highlight/30 rounded-xl p-6 flex flex-col md:flex-row items-center gap-6 text-center md:text-left">
            <AlertTriangle className="w-12 h-12 text-partner-highlight flex-shrink-0" />
            <div>
              <p className="text-white font-bold mb-1">
                Si ton profil correspond, postule maintenant.
              </p>
              <p className="text-gray-400 text-sm">
                On étudie chaque candidature sous 48h. Places limitées pour le programme 2025.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CriteriaSection
