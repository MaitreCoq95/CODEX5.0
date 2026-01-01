"use client"

import { Shield, Award, Users, Calendar, CheckCircle } from "lucide-react"

const stats = [
  { value: "15", label: "ans d'expertise QHSE", icon: Calendar },
  { value: "12", label: "certifications accompagnées", icon: Award },
  { value: "200+", label: "collaborateurs formés/an", icon: Users },
  { value: "95%", label: "taux de réussite audit", icon: CheckCircle },
]

const certifications = [
  { name: "Lead Auditor ISO 9001", org: "IRCA" },
  { name: "Lead Auditor ISO 14001", org: "IRCA" },
  { name: "Lead Auditor EN 9100", org: "Bureau Veritas" },
  { name: "Expert GDP/BPD", org: "ANSM" },
  { name: "Formateur QHSE", org: "Qualiopi" },
]

const partners = [
  "Bureau Veritas",
  "SGS",
  "LRQA",
  "AFNOR",
  "Intertek"
]

export function ReassuranceSection() {
  return (
    <section id="reassurance-section" className="py-16 bg-vyxo-navy border-t border-white/5">
      <div className="container mx-auto px-4">
        
        {/* Stats Banner */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, i) => {
            const Icon = stat.icon
            return (
              <div key={i} className="text-center">
                <div className="flex justify-center mb-3">
                  <div className="w-12 h-12 rounded-full bg-vyxo-gold/10 flex items-center justify-center">
                    <Icon className="w-6 h-6 text-vyxo-gold" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                <p className="text-sm text-gray-400">{stat.label}</p>
              </div>
            )
          })}
        </div>

        {/* Certifications & Partners */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          
          {/* Certifications des consultants */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-6 h-6 text-vyxo-gold" />
              <h3 className="text-lg font-bold text-white">Certifications de nos consultants</h3>
            </div>
            <ul className="space-y-3">
              {certifications.map((cert, i) => (
                <li key={i} className="flex items-center justify-between text-sm">
                  <span className="text-gray-300">{cert.name}</span>
                  <span className="text-gray-500 text-xs bg-white/5 px-2 py-1 rounded">{cert.org}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Partenaires */}
          <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
            <div className="flex items-center gap-3 mb-6">
              <Award className="w-6 h-6 text-vyxo-gold" />
              <h3 className="text-lg font-bold text-white">Organismes partenaires</h3>
            </div>
            <p className="text-gray-400 text-sm mb-4">
              Nous travaillons avec les principaux organismes de certification :
            </p>
            <div className="flex flex-wrap gap-2">
              {partners.map((partner, i) => (
                <span key={i} className="bg-white/10 text-gray-300 text-sm px-3 py-1.5 rounded-lg">
                  {partner}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Garantie */}
        <div className="text-center mt-12 max-w-2xl mx-auto">
          <div className="bg-gradient-to-r from-green-500/10 via-vyxo-gold/10 to-green-500/10 border border-green-500/20 rounded-2xl p-6">
            <p className="text-green-400 text-sm font-semibold mb-2">🛡️ GARANTIE RÉSULTAT</p>
            <p className="text-white text-lg font-medium mb-2">
              Avec la formule Full Accompagnement, nous vous garantissons l&apos;obtention de votre conformité.
            </p>
            <p className="text-gray-400 text-sm">
              En cas de non-conformité majeure détectée à l&apos;audit, nous continuons l&apos;accompagnement sans surcoût jusqu&apos;à l&apos;obtention.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ReassuranceSection
