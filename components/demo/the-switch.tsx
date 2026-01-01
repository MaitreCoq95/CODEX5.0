"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Progress } from "@/components/ui/progress"
import { ShieldCheck, Brain, Lock } from "lucide-react"

interface TheSwitchProps {
  sector: string
  onComplete: () => void
}

export function TheSwitch({ sector, onComplete }: TheSwitchProps) {
  const [progress, setProgress] = useState(0)
  const [status, setStatus] = useState("Connexion au noyau d'analyse...")

  const sectorLabels: Record<string, string> = {
    "transport_pharma": "Transport Pharma & Santé",
    "agro": "Agroalimentaire",
    "logistique": "Logistique Supply Chain",
    "services": "Services",
  }

  useEffect(() => {
    const duration = 3500 // 3.5 seconds total
    const interval = 50
    const steps = duration / interval
    let currentStep = 0

    const timer = setInterval(() => {
      currentStep++
      const newProgress = Math.min((currentStep / steps) * 100, 100)
      setProgress(newProgress)

      // Dynamic Status Updates
      if (newProgress > 20 && newProgress < 50) {
        setStatus(`Analyse du profil ${sectorLabels[sector] || sector}...`)
      } else if (newProgress >= 50 && newProgress < 80) {
        setStatus("Identification des risques critiques...")
      } else if (newProgress >= 80) {
        setStatus("Génération de la matrice d'évaluation...")
      }

      if (currentStep >= steps) {
        clearInterval(timer)
        setTimeout(onComplete, 500) // Small delay at 100%
      }
    }, interval)

    return () => clearInterval(timer)
  }, [sector, onComplete])

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-full max-w-xl mx-auto p-8">
      
      {/* Central Pulsing Icon */}
      <motion.div
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="mb-8 relative"
      >
        <div className="w-24 h-24 bg-vyxo-navy rounded-full flex items-center justify-center shadow-lg shadow-vyxo-navy/30">
          <Brain className="w-12 h-12 text-vyxo-gold" />
        </div>
        <div className="absolute inset-0 border-4 border-vyxo-gold/20 rounded-full animate-ping" />
      </motion.div>

      {/* Status Text */}
      <motion.h2 
        key={status} // Animate on change
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-xl font-medium text-vyxo-navy mb-6 text-center h-8"
      >
        {status}
      </motion.h2>

      {/* Progress Bar */}
      <div className="w-full space-y-2">
        <Progress value={progress} className="h-2 bg-slate-100" />
        <div className="flex justify-between text-xs text-gray-400">
          <span>Initialisation</span>
          <span>{Math.round(progress)}%</span>
        </div>
      </div>

      {/* Security Reassurance */}
      <div className="mt-12 flex items-center justify-center gap-2 text-xs text-gray-400 bg-gray-50 px-4 py-2 rounded-full border border-gray-100">
        <Lock className="w-3 h-3" />
        <span>Données anonymisées et sécurisées par Vyxo Codex</span>
      </div>

    </div>
  )
}
