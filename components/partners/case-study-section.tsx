"use client"

import { Quote, TrendingUp, Calendar, Award, Users } from "lucide-react"
import { partnerTestimonials } from "@/lib/data/partner-testimonials"

export function CaseStudySection() {
  const thomas = partnerTestimonials[0]
  const sophie = partnerTestimonials[1]

  return (
    <section className="py-20 bg-slate-950">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-partner-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
            Cas Concret
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Comment Thomas est passé de <span className="text-red-400">90K€</span> à{" "}
            <span className="text-partner-accent">165K€</span> en 18 mois
          </h2>
        </div>

        {/* Main Case Study: Thomas */}
        <div className="max-w-5xl mx-auto mb-16">
          <div className="bg-slate-800/50 border border-slate-700/50 rounded-2xl overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-partner-accent/10 to-transparent p-6 border-b border-slate-700/50">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 rounded-2xl bg-partner-accent/20 flex items-center justify-center text-partner-accent text-2xl font-bold">
                    TD
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">{thomas.name}</h3>
                    <p className="text-gray-400">{thomas.role}</p>
                    <p className="text-sm text-gray-500">{thomas.location}</p>
                  </div>
                </div>
                <div className="flex gap-4 text-sm">
                  <div className="flex items-center gap-2 text-gray-400">
                    <Calendar className="w-4 h-4" />
                    {thomas.experience} d&apos;expérience
                  </div>
                  <div className="flex items-center gap-2 text-partner-accent">
                    <Award className="w-4 h-4" />
                    Formule Licence Pro
                  </div>
                </div>
              </div>
            </div>

            {/* Before/After Grid */}
            <div className="grid md:grid-cols-2">
              {/* Before */}
              <div className="p-6 border-r border-slate-700/50">
                <h4 className="text-red-400 font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-red-400" />
                  AVANT VYXO
                </h4>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">CA annuel</span>
                    <span className="text-white font-medium">{thomas.before.ca}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mission moyenne</span>
                    <span className="text-white font-medium">{thomas.before.missionAvg}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">MRR</span>
                    <span className="text-red-400 font-medium">{thomas.before.mrr}</span>
                  </div>
                </div>
                <p className="text-gray-500 text-sm italic">
                  &quot;{thomas.before.problem}&quot;
                </p>
              </div>

              {/* After */}
              <div className="p-6 bg-partner-accent/5">
                <h4 className="text-partner-accent font-bold mb-4 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-partner-accent" />
                  AVEC VYXO
                </h4>
                <div className="space-y-3 mb-6">
                  <div className="flex justify-between">
                    <span className="text-gray-400">CA annuel</span>
                    <span className="text-partner-accent font-bold">{thomas.after.ca}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Mission moyenne</span>
                    <span className="text-white font-medium">{thomas.after.missionAvg}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">MRR passif</span>
                    <span className="text-partner-accent font-bold">{thomas.after.mrr}</span>
                  </div>
                </div>
                <div className="bg-partner-accent/20 rounded-lg p-3 text-center">
                  <span className="text-partner-accent text-2xl font-bold">{thomas.after.growth}</span>
                  <span className="text-gray-400 ml-2">de croissance</span>
                </div>
              </div>
            </div>

            {/* Highlights */}
            <div className="p-6 border-t border-slate-700/50 bg-slate-800/30">
              <div className="grid md:grid-cols-3 gap-4">
                {thomas.highlights.map((h, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <TrendingUp className="w-4 h-4 text-partner-accent mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">{h}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="p-6 border-t border-slate-700/50">
              <div className="relative">
                <Quote className="w-10 h-10 text-partner-accent/20 absolute -top-2 -left-2" />
                <p className="text-white text-lg italic relative z-10 pl-6">
                  &quot;{thomas.quote}&quot;
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Mini Case: Sophie */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
            <div className="flex flex-col md:flex-row md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-xl bg-partner-highlight/20 flex items-center justify-center text-partner-highlight text-xl font-bold">
                  SL
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">{sophie.name}</h4>
                  <p className="text-gray-400 text-sm">{sophie.role} • Formule All-In</p>
                </div>
              </div>
              
              <div className="flex-1 grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-partner-highlight text-2xl font-bold">12</p>
                  <p className="text-gray-500 text-xs">clients actifs</p>
                </div>
                <div>
                  <p className="text-partner-highlight text-2xl font-bold">6 400€</p>
                  <p className="text-gray-500 text-xs">MRR/mois</p>
                </div>
                <div>
                  <p className="text-partner-highlight text-2xl font-bold">+62%</p>
                  <p className="text-gray-500 text-xs">CA</p>
                </div>
              </div>
              
              <p className="md:max-w-xs text-gray-400 text-sm italic">
                &quot;{sophie.quote.substring(0, 100)}...&quot;
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CaseStudySection
