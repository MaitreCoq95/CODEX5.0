"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, Briefcase, ClipboardList } from "lucide-react"

interface RoleCardProps {
  type: "dirigeant" | "manager"
  onSelect: () => void
  isSelected?: boolean
}

const roleData = {
  dirigeant: {
    icon: Briefcase,
    emoji: "👔",
    title: "Je pilote l'organisation",
    subtitle: "Dirigeant, DG, Directeur Opérations",
    benefits: [
      "Visibilité complète sur le niveau réel de chaque équipe",
      "Preuves auditables générées automatiquement",
      "Risques critiques identifiés avant l'audit",
      "Certification facilitée grâce au suivi continu"
    ],
    cta: "ÉVALUER MON ORGANISATION",
    ctaStyle: "bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy font-bold",
    cardStyle: "border-vyxo-gold/30 hover:border-vyxo-gold/60",
    glowColor: "from-vyxo-gold/20"
  },
  manager: {
    icon: ClipboardList,
    emoji: "📋",
    title: "Je gère des équipes terrain",
    subtitle: "Manager Opérationnel, Chef d'équipe, Responsable de site",
    benefits: [
      "Évaluez le niveau de vos équipes en quelques clics",
      "Identifiez les besoins de formation prioritaires",
      "Suivez la montée en compétences de chacun",
      "Transmettez des rapports clairs à votre direction"
    ],
    cta: "TESTER UN PRÉ-DIAGNOSTIC",
    ctaStyle: "bg-transparent border-2 border-white/30 hover:bg-white/10 text-white font-medium",
    cardStyle: "border-white/10 hover:border-white/30",
    glowColor: "from-blue-500/10"
  }
}

export function RoleCard({ type, onSelect, isSelected }: RoleCardProps) {
  const data = roleData[type]

  return (
    <Card 
      className={`relative overflow-hidden cursor-pointer transition-all duration-300 bg-white/5 ${data.cardStyle} ${isSelected ? 'ring-2 ring-vyxo-gold' : ''} hover:-translate-y-1 group`}
      onClick={onSelect}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-px bg-gradient-to-r ${data.glowColor} to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-xl blur-xl`} />
      
      <CardContent className="relative p-8">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-5xl group-hover:scale-110 transition-transform">
            {data.emoji}
          </div>
        </div>

        {/* Title */}
        <h3 className="text-2xl font-bold text-white text-center mb-2">
          {data.title}
        </h3>
        <p className="text-gray-400 text-center mb-6">
          {data.subtitle}
        </p>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-white/20 to-transparent mb-6" />

        {/* Benefits */}
        <ul className="space-y-3 mb-8">
          {data.benefits.map((benefit, i) => (
            <li key={i} className="flex items-start gap-3 text-gray-300">
              <CheckCircle2 className="w-5 h-5 text-vyxo-gold flex-shrink-0 mt-0.5" />
              <span className="text-sm">{benefit}</span>
            </li>
          ))}
        </ul>

        {/* CTA Button */}
        <Button 
          className={`w-full h-12 text-base ${data.ctaStyle} transition-all`}
          onClick={(e) => {
            e.stopPropagation()
            onSelect()
          }}
        >
          {data.cta} →
        </Button>

        {/* Selected indicator */}
        {isSelected && (
          <div className="absolute top-4 right-4">
            <div className="w-8 h-8 rounded-full bg-vyxo-gold flex items-center justify-center">
              <CheckCircle2 className="w-5 h-5 text-vyxo-navy" />
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
