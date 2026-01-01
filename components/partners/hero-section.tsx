"use client"

import { TrendingUp, Calendar } from "lucide-react"

// Variantes A/B/C pour les headlines
const headlines = {
  A: {
    text: "Consultants QHSE: Et si vos missions généraient des revenus récurrents?",
    highlight: "revenus récurrents",
    angle: "Aspiration MRR"
  },
  B: {
    text: "Vos clients vous demandent un tableau de bord de conformité. Vous facturez quoi? 0€.",
    highlight: "0€",
    angle: "Pain point"
  },
  C: {
    text: "Passez de 25K€ à 45K€ par mission sans recruter ni développer d'outil",
    highlight: "25K€ à 45K€",
    angle: "Résultat chiffré"
  }
}

type HeadlineVariant = keyof typeof headlines

interface PartnerHeroProps {
  variant?: HeadlineVariant
  onScrollToForm?: () => void
  onBookDemo?: () => void
}

export function PartnerHeroSection({ variant = "A", onScrollToForm, onBookDemo }: PartnerHeroProps) {
  const headline = headlines[variant]

  // Mise en évidence du texte
  const renderHeadline = () => {
    const parts = headline.text.split(headline.highlight)
    return (
      <>
        {parts[0]}
        <span className="text-partner-accent">{headline.highlight}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section className="relative min-h-[90vh] flex items-center bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{ 
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` 
        }} />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          
          {/* Left: Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-partner-accent/10 border border-partner-accent/30 rounded-full px-4 py-2 mb-6">
              <TrendingUp className="w-4 h-4 text-partner-accent" />
              <span className="text-partner-accent text-sm font-medium">
                Programme Partenaires Vyxo 2025
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
              {renderHeadline()}
            </h1>

            {/* Sub-headline */}
            <p className="text-lg md:text-xl text-gray-300 mb-8 leading-relaxed">
              Vyxo Codex est la seule plateforme SaaS conçue <strong className="text-white">PAR des consultants QHSE</strong>{" "}
              <strong className="text-white">POUR des consultants QHSE</strong>. 
              Utilisez-la pour vos missions, augmentez votre panier moyen de <span className="text-partner-accent font-bold">50%</span>, 
              et générez du <span className="text-partner-accent font-bold">MRR à vie</span>.
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button 
                onClick={onScrollToForm}
                className="bg-partner-accent hover:bg-partner-accent/90 text-slate-900 font-bold py-4 px-8 rounded-lg text-lg transition-all hover:scale-105 shadow-lg shadow-partner-accent/25"
              >
                Devenir partenaire →
              </button>
              <button 
                onClick={onBookDemo}
                className="border-2 border-white/30 hover:border-white/50 text-white font-medium py-4 px-8 rounded-lg text-lg transition-all flex items-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Voir une démo
              </button>
            </div>

            {/* Trust indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <span className="text-partner-accent text-xl">3</span>
                <span>partenaires actifs</span>
              </div>
              <div className="w-px h-4 bg-gray-600" />
              <div className="flex items-center gap-2">
                <span className="text-partner-accent text-xl">12</span>
                <span>clients équipés</span>
              </div>
              <div className="w-px h-4 bg-gray-600" />
              <div className="flex items-center gap-2">
                <span className="text-partner-accent text-xl">+83%</span>
                <span>CA moyen</span>
              </div>
            </div>
          </div>

          {/* Right: Visual */}
          <div className="relative hidden lg:block">
            <div className="relative bg-slate-800/50 border border-slate-700/50 rounded-2xl p-6 backdrop-blur-sm">
              {/* Mock comparison card */}
              <div className="space-y-6">
                {/* Before */}
                <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-red-400 text-sm font-medium">SANS VYXO</span>
                    <span className="text-red-400 text-xs">Aujourd&apos;hui</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-400 text-sm">
                      <span>Mission GDP</span>
                      <span className="text-white">25 000€</span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-sm">
                      <span>Fin de mission</span>
                      <span className="text-red-400">0€ / mois</span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-sm">
                      <span>Outil de suivi</span>
                      <span className="text-red-400">Excel 😅</span>
                    </div>
                    <div className="pt-2 border-t border-red-500/20 flex justify-between">
                      <span className="text-gray-300 font-medium">Total sur 18 mois</span>
                      <span className="text-white font-bold">25 000€</span>
                    </div>
                  </div>
                </div>

                {/* After */}
                <div className="bg-partner-accent/10 border border-partner-accent/30 rounded-xl p-5">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-partner-accent text-sm font-medium">AVEC VYXO</span>
                    <span className="text-partner-accent text-xs">Partenaire</span>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-gray-400 text-sm">
                      <span>Mission GDP + SaaS</span>
                      <span className="text-white">32 000€</span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-sm">
                      <span>Commission MRR (18 mois)</span>
                      <span className="text-partner-accent">+ 2 700€</span>
                    </div>
                    <div className="flex justify-between text-gray-400 text-sm">
                      <span>Outil de suivi</span>
                      <span className="text-partner-accent">Dashboard Pro ✨</span>
                    </div>
                    <div className="pt-2 border-t border-partner-accent/30 flex justify-between">
                      <span className="text-gray-300 font-medium">Total sur 18 mois</span>
                      <span className="text-partner-accent font-bold">34 700€</span>
                    </div>
                  </div>
                </div>

                {/* Difference highlight */}
                <div className="bg-partner-highlight/10 border border-partner-highlight/30 rounded-lg p-4 text-center">
                  <p className="text-partner-highlight text-2xl font-bold mb-1">+39% de revenus</p>
                  <p className="text-gray-400 text-sm">+ MRR récurrent après la mission</p>
                </div>
              </div>
            </div>

            {/* Floating element */}
            <div className="absolute -bottom-4 -left-4 bg-slate-800 border border-slate-700 rounded-xl p-4 shadow-xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-partner-accent/20 flex items-center justify-center">
                  <TrendingUp className="w-5 h-5 text-partner-accent" />
                </div>
                <div>
                  <p className="text-white text-sm font-medium">MRR mensuel</p>
                  <p className="text-partner-accent text-lg font-bold">150€/mois à vie</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center">
          <div className="w-1.5 h-3 bg-white/50 rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}

export default PartnerHeroSection
