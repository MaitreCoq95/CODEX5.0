"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import {  Truck, Warehouse, Settings, Building2, Users, ClipboardCheck, ArrowRight, ShieldCheck } from "lucide-react"

export type ClassificationData = {
  sector: string
  size: string
  fieldRatio: string
  organizationType: string
  controlFrequency: string
  companyName?: string // Optional, collected at end or inferred
}

interface SmartClassificationFormProps {
  onComplete: (data: ClassificationData) => void
  initialVertical?: string
}

export function SmartClassificationForm({ onComplete, initialVertical }: SmartClassificationFormProps) {
  const [step, setStep] = useState(1)
  const [data, setData] = useState<ClassificationData>({
    sector: initialVertical || "",
    size: "",
    fieldRatio: "",
    organizationType: "",
    controlFrequency: ""
  })

  const totalSteps = 5

  const handleSelection = (key: keyof ClassificationData, value: string) => {
    setData((prev) => ({ ...prev, [key]: value }))
    // Auto-advance after short delay for better UX
    setTimeout(() => {
      if (step < totalSteps) {
        setStep(step + 1)
      } else {
        onComplete({ ...data, [key]: value })
      }
    }, 400)
  }

  const steps = [
    {
      id: 1,
      title: "Cœur de Métier",
      description: "Pour calibrer les normes applicables",
      key: "sector",
      options: [
        { value: "transport_pharma", label: "Transport Pharma / Santé", icon: Truck },
        { value: "agro", label: "Agroalimentaire", icon: Warehouse },
        { value: "logistique", label: "Logistique & Fret", icon: Building2 },
        { value: "services", label: "Services / Tertiaire", icon: Settings },
      ]
    },
    {
      id: 2,
      title: "Taille de la Structure",
      description: "Pour adapter l'exigence des processus",
      key: "size",
      options: [
        { value: "1-10", label: "1 - 10 employés" },
        { value: "11-50", label: "11 - 50 employés" },
        { value: "51-200", label: "51 - 200 employés" },
        { value: "200+", label: "200+ employés" },
      ]
    },
    {
      id: 3,
      title: "Intensité Terrain",
      description: "Quelle part de vos équipes opère sans bureau ?",
      key: "fieldRatio",
      options: [
        { value: "low", label: "Moins de 25%", description: "Majorité bureau" },
        { value: "medium", label: "25% - 50%", description: "Équilibre" },
        { value: "high", label: "50% - 75%", description: "Forte présence terrain" },
        { value: "very_high", label: "Plus de 75%", description: "Essentiellement mobile" },
      ]
    },
    {
      id: 4,
      title: "Maturité Organisationnelle",
      description: "Comment vos processus sont-ils gérés ?",
      key: "organizationType",
      options: [
        { value: "informal", label: "Pratiques Informelles", description: "Basé sur l'expérience des équipes" },
        { value: "hybrid", label: "Hybride / En construction", description: "Quelques procédures écrites" },
        { value: "formal", label: "Système Formel", description: "Système Qualité documenté" },
      ]
    },
    {
      id: 5,
      title: "Fréquence des Contrôles",
      description: "À quelle fréquence auditez-vous vos opérations ?",
      key: "controlFrequency",
      options: [
        { value: "never", label: "Jamais / Rarement" },
        { value: "annual", label: "Annuellement" },
        { value: "quarterly", label: "Trimestriellement" },
        { value: "monthly", label: "Mensuellement ou +" },
      ]
    }
  ]

  const currentStepData = steps[step - 1]

  return (
    <div className="w-full max-w-2xl mx-auto p-4">
      <div className="mb-8 space-y-2">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>Qualification du profil</span>
          <span>Étape {step} / {totalSteps}</span>
        </div>
        <Progress value={(step / totalSteps) * 100} className="h-2 bg-slate-100" />
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-vyxo-navy mb-2">{currentStepData.title}</h2>
            <p className="text-gray-500">{currentStepData.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentStepData.options.map((option) => (
              <motion.div
                key={option.value}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <Card 
                  className={`cursor-pointer hover:border-vyxo-gold hover:shadow-md transition-all h-full ${
                    // @ts-ignore
                    data[currentStepData.key] === option.value ? 'border-2 border-vyxo-gold bg-vyxo-gold/5' : 'border-slate-200'
                  }`}
                  onClick={() => handleSelection(currentStepData.key as keyof ClassificationData, option.value)}
                >
                  <CardContent className="p-6 flex flex-col items-center justify-center text-center h-full">
                    {/* @ts-ignore */}
                    {option.icon && (
                      // @ts-ignore
                      <option.icon className="w-8 h-8 text-vyxo-navy mb-4" />
                    )}
                    <h3 className="font-semibold text-lg text-vyxo-navy mb-1">{option.label}</h3>
                    {/* @ts-ignore */}
                    {option.description && (
                      // @ts-ignore
                      <p className="text-sm text-gray-500 mt-2">{option.description}</p>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}
