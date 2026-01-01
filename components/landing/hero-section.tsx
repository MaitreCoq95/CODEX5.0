"use client"

import { Badge } from "@/components/ui/badge"
import { ChevronDown, AlertTriangle, Users, BookOpen } from "lucide-react"
import Link from "next/link"

// Variantes A/B/C pour les headlines - CHOC / COMPLIANCE MULTI-NORME
const headlines = {
  A: {
    text: "Votre entreprise est-elle vraiment en conformité ? Ou vous le croyez juste ?",
    highlight: "vraiment en conformité",
    angle: "Doute / Risque"
  },
  B: {
    text: "Non-conformité = perte de clients, sanctions, audits ratés. Êtes-vous prêt ?",
    highlight: "perte de clients, sanctions, audits ratés",
    angle: "CA / Risque business"
  },
  C: {
    text: "67% des entreprises découvrent leurs écarts le jour de l'audit. Pas vous.",
    highlight: "67% des entreprises",
    angle: "Statistique choc"
  }
}

type HeadlineVariant = keyof typeof headlines

interface HeroSectionProps {
  variant?: HeadlineVariant
  onScrollToForm?: () => void
  onScrollToMethod?: () => void
}

export function HeroSection({ variant = "A", onScrollToForm, onScrollToMethod }: HeroSectionProps) {
  const headline = headlines[variant]

  // Fonction pour mettre en évidence le texte
  const renderHeadline = () => {
    const parts = headline.text.split(headline.highlight)
    return (
      <>
        {parts[0]}
        <span className="text-vyxo-gold">{headline.highlight}</span>
        {parts[1]}
      </>
    )
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-br from-vyxo-navy via-vyxo-navy/95 to-vyxo-navy">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(198, 156, 109, 0.3) 0%, transparent 50%),
                           radial-gradient(circle at 75% 75%, rgba(198, 156, 109, 0.2) 0%, transparent 50%)`
        }} />
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge Alerte + Positionnement */}
          <div className="animate-slide-in-up flex flex-col sm:flex-row gap-2 justify-center items-center" style={{ animationFillMode: 'both' }}>
            <Badge className="bg-vyxo-gold/20 text-vyxo-gold border-vyxo-gold/30 text-sm px-4 py-1.5">
              🥇 1ère plateforme hybride de mise en conformité
            </Badge>
            <Badge className="bg-red-500/20 text-red-400 border-red-500/30 text-sm px-4 py-1.5">
              <AlertTriangle className="w-4 h-4 mr-2" />
              ISO • GDP • QHSE • Multi-normes
            </Badge>
          </div>
          <div className="h-4" />

          {/* Headline */}
          <h1 
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-tight mb-6 animate-slide-in-up"
            style={{ animationDelay: '0.1s', animationFillMode: 'both' }}
          >
            {renderHeadline()}
          </h1>

          {/* Sous-headline - Les 3 piliers */}
          <p 
            className="text-lg md:text-xl lg:text-2xl text-gray-300 max-w-4xl mx-auto mb-8 animate-slide-in-up"
            style={{ animationDelay: '0.2s', animationFillMode: 'both' }}
          >
            <span className="text-white font-semibold">Plateforme d&apos;évaluation</span> +{" "}
            <span className="text-white font-semibold">Formation continue</span> +{" "}
            <span className="text-white font-semibold">Expertise terrain</span>.
            <br className="hidden md:block" />
            <span className="text-gray-400">L&apos;écosystème complet pour piloter votre conformité et préparer vos équipes aux audits.</span>
          </p>

          {/* CTAs */}
          <div 
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-slide-in-up"
            style={{ animationDelay: '0.25s', animationFillMode: 'both' }}
          >
            <Link href="/signup?standard=ISO_9001">
              <button 
                className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy font-bold py-4 px-8 rounded-lg transition-all hover:scale-105 hover:shadow-lg hover:shadow-vyxo-gold/20"
              >
                ÉVALUER MA CONFORMITÉ →
              </button>
            </Link>
            <Link href="/pricing">
              <button 
                className="border-2 border-white/30 hover:border-white/50 text-white font-medium py-4 px-8 rounded-lg transition-all hover:bg-white/5"
              >
                Voir les tarifs ↓
              </button>
            </Link>
          </div>

          {/* Dashboard Mockup Preview - Version Hybride */}
          <div 
            className="relative max-w-4xl mx-auto mb-12 animate-slide-in-up"
            style={{ animationDelay: '0.3s', animationFillMode: 'both' }}
          >
            <div className="relative rounded-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-sm p-1">
              {/* Mockup Header */}
              <div className="bg-vyxo-navy/80 rounded-t-xl px-4 py-3 flex items-center gap-2">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500/80" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                  <div className="w-3 h-3 rounded-full bg-green-500/80" />
                </div>
                <span className="text-xs text-gray-400 ml-2">codex.vyxo.fr/road-to-certification</span>
              </div>
              
              {/* Mockup Content - 3 colonnes hybrides */}
              <div className="bg-gradient-to-br from-slate-900 to-slate-800 p-6 rounded-b-xl">
                {/* 3 Zones hybrides */}
                <div className="grid grid-cols-3 gap-4 mb-6">
                  {/* Zone PLATEFORME */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-blue-500/20 flex items-center justify-center">
                        <span className="text-lg">📊</span>
                      </div>
                      <span className="text-white font-medium text-sm">Plateforme</span>
                    </div>
                    <p className="text-3xl font-bold text-blue-400 mb-1">72%</p>
                    <p className="text-xs text-gray-500">Conformité globale</p>
                    <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: '72%' }} />
                    </div>
                  </div>

                  {/* Zone FORMATION */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-green-500/20 flex items-center justify-center">
                        <BookOpen className="w-4 h-4 text-green-400" />
                      </div>
                      <span className="text-white font-medium text-sm">Formation</span>
                    </div>
                    <p className="text-3xl font-bold text-green-400 mb-1">89%</p>
                    <p className="text-xs text-gray-500">Équipes formées</p>
                    <div className="mt-2 h-1.5 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-green-500 rounded-full" style={{ width: '89%' }} />
                    </div>
                  </div>

                  {/* Zone CONSULTING */}
                  <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-8 h-8 rounded-lg bg-vyxo-gold/20 flex items-center justify-center">
                        <Users className="w-4 h-4 text-vyxo-gold" />
                      </div>
                      <span className="text-white font-medium text-sm">Consulting</span>
                    </div>
                    <div className="flex items-center gap-2 mb-1">
                      <div className="w-6 h-6 rounded-full bg-vyxo-gold/30 flex items-center justify-center text-xs">👨‍💼</div>
                      <span className="text-vyxo-gold font-medium text-sm">Marc D.</span>
                    </div>
                    <p className="text-xs text-gray-500">Expert QHSE dédié</p>
                  </div>
                </div>

                {/* Timeline Road to Certification */}
                <div className="bg-white/[0.03] rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-white font-medium text-sm">🎯 Suivi de Conformité Multi-Normes</span>
                    <span className="text-xs text-vyxo-gold">Mois 8/14</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex-1 h-2 bg-white/10 rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-vyxo-gold via-green-500 to-blue-500 rounded-full animate-progress-fill" style={{ width: '60%' }} />
                    </div>
                    <span className="text-white font-bold text-sm">60%</span>
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] text-gray-500">
                    <span className="text-green-400">✓ Évaluation</span>
                    <span className="text-green-400">✓ Formation</span>
                    <span className="text-vyxo-gold">⏳ Actions</span>
                    <span className="text-gray-600">○ Audit</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Glow effect */}
            <div className="absolute -inset-4 bg-gradient-to-r from-vyxo-gold/20 via-transparent to-vyxo-gold/20 rounded-3xl blur-3xl -z-10" />
          </div>

          {/* Scroll indicator */}
          <button 
            onClick={onScrollToMethod || onScrollToForm}
            className="group flex flex-col items-center gap-2 mx-auto hover:translate-y-1 transition-transform animate-fade-in"
            style={{ animationDelay: '0.5s', animationFillMode: 'both' }}
          >
            <span className="text-sm text-gray-400 group-hover:text-vyxo-gold transition-colors">
              Découvrir notre méthode
            </span>
            <ChevronDown className="w-6 h-6 text-vyxo-gold animate-bounce" />
          </button>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-vyxo-navy to-transparent" />
    </section>
  )
}

// Export legacy pour compatibilité
export default HeroSection
