"use client"

import { Quote, TrendingUp, Users, Award, Clock } from "lucide-react"
import { caseStudies, type CaseStudy } from "@/lib/data/case-studies"

function CaseStudyCard({ study }: { study: CaseStudy }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden hover:border-vyxo-gold/30 transition-all group">
      {/* Header */}
      <div className="bg-gradient-to-r from-vyxo-gold/10 to-transparent p-6">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{study.company}</h3>
            <p className="text-gray-400 text-sm">{study.sector}</p>
          </div>
          <div className="flex gap-1">
            {study.norms.map((norm) => (
              <span
                key={norm}
                className="bg-white/10 text-xs px-2 py-1 rounded text-gray-300"
              >
                {norm}
              </span>
            ))}
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm text-gray-500">
          <span className="flex items-center gap-1">
            <Users className="w-4 h-4" />
            {study.size}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            {study.duration}
          </span>
        </div>
      </div>

      {/* Results Grid */}
      <div className="grid grid-cols-2 gap-4 p-6 border-b border-white/5">
        {study.results.map((result, i) => (
          <div key={i} className="text-center">
            <p className="text-2xl font-bold text-vyxo-gold">{result.value}</p>
            <p className="text-xs text-gray-500">{result.label}</p>
            {result.improvement && (
              <p className="text-xs text-green-400 flex items-center justify-center gap-1 mt-1">
                <TrendingUp className="w-3 h-3" />
                {result.improvement}
              </p>
            )}
          </div>
        ))}
      </div>

      {/* Testimonial */}
      <div className="p-6">
        <div className="relative">
          <Quote className="w-8 h-8 text-vyxo-gold/20 absolute -top-2 -left-2" />
          <p className="text-gray-300 text-sm italic relative z-10 pl-4">
            &quot;{study.testimonial.quote}&quot;
          </p>
        </div>
        <div className="flex items-center gap-3 mt-4">
          <div className="w-10 h-10 rounded-full bg-vyxo-gold/20 flex items-center justify-center text-vyxo-gold font-bold">
            {study.testimonial.author.charAt(0)}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{study.testimonial.author}</p>
            <p className="text-gray-500 text-xs">{study.testimonial.role}, {study.company}</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function SocialProofSection() {
  return (
    <section id="social-proof-section" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-vyxo-gold text-sm font-semibold tracking-wider uppercase mb-4 block">
            Ils nous font confiance
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            <span className="text-vyxo-gold">100+</span> entreprises accompagnées vers la conformité
          </h2>
          <p className="text-lg text-gray-400">
            Découvrez comment nos clients ont transformé leur système qualité 
            et obtenu leurs certifications avec Vyxo Codex.
          </p>
        </div>

        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto mb-16">
          {[
            { value: "95%", label: "Taux de réussite audit" },
            { value: "14 mois", label: "Durée moyenne" },
            { value: "100+", label: "Entreprises" },
            { value: "4.8/5", label: "Satisfaction client" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 bg-white/5 rounded-xl border border-white/10">
              <p className="text-2xl md:text-3xl font-bold text-vyxo-gold">{stat.value}</p>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>

        {/* Case Studies Grid */}
        <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {caseStudies.map((study) => (
            <CaseStudyCard key={study.id} study={study} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">
            Vous aussi, rejoignez les entreprises qui ont fait le choix de la conformité structurée
          </p>
          <button className="inline-flex items-center gap-2 bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy font-bold py-3 px-6 rounded-lg transition-all hover:scale-105">
            <Award className="w-5 h-5" />
            Demander ma démo personnalisée
          </button>
        </div>
      </div>
    </section>
  )
}

export default SocialProofSection
