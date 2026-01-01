"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { X, PartyPopper, Sparkles, Target, FileText, BookOpen, ArrowRight } from "lucide-react"

interface WelcomeModalProps {
  userName?: string
  standard?: string
  onClose: () => void
}

export function WelcomeModal({ userName = "là", standard = "ISO_9001", onClose }: WelcomeModalProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    // Check if user has seen welcome modal
    const hasSeenWelcome = localStorage.getItem("vyxo_welcome_seen")
    if (!hasSeenWelcome) {
      setTimeout(() => setIsOpen(true), 500)
    }
  }, [])

  const handleClose = () => {
    localStorage.setItem("vyxo_welcome_seen", "true")
    setIsOpen(false)
    onClose()
  }

  const standardNames: Record<string, string> = {
    ISO_9001: "ISO 9001:2015",
    GDP: "GDP / BPD",
    ISO_27001: "ISO 27001:2022",
    HACCP: "HACCP",
    ISO_42001: "ISO 42001",
    ISO_13485: "ISO 13485:2016",
    SURETE: "Sûreté Aéroportuaire",
  }

  const features = [
    { icon: <Target className="w-5 h-5" />, title: "Roadmap personnalisée", desc: "Plan d'action sur mesure" },
    { icon: <FileText className="w-5 h-5" />, title: "Templates prêts", desc: "90+ documents à télécharger" },
    { icon: <Sparkles className="w-5 h-5" />, title: "Générateur IA", desc: "Documents sur mesure" },
  ]

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
          >
            <div className="bg-gradient-to-br from-vyxo-navy to-slate-900 border border-white/10 rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden">
              {/* Header */}
              <div className="relative p-6 pb-0">
                <button
                  onClick={handleClose}
                  className="absolute top-4 right-4 text-gray-500 hover:text-white"
                >
                  <X className="w-5 h-5" />
                </button>

                <div className="text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring" }}
                    className="w-16 h-16 mx-auto mb-4 rounded-full bg-vyxo-gold/20 flex items-center justify-center"
                  >
                    <PartyPopper className="w-8 h-8 text-vyxo-gold" />
                  </motion.div>

                  <h2 className="text-2xl font-bold text-white mb-2">
                    Bienvenue {userName} ! 🎉
                  </h2>
                  <Badge className="bg-vyxo-gold/20 text-vyxo-gold">
                    {standardNames[standard] || standard}
                  </Badge>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                <p className="text-gray-400 text-center text-sm">
                  Votre diagnostic est terminé. Voici ce que vous pouvez faire maintenant :
                </p>

                {/* Features */}
                <div className="space-y-3">
                  {features.map((feature, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-4 p-3 rounded-lg bg-white/5"
                    >
                      <div className="text-vyxo-gold">{feature.icon}</div>
                      <div>
                        <p className="text-white font-medium text-sm">{feature.title}</p>
                        <p className="text-gray-500 text-xs">{feature.desc}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 pt-0">
                <Button
                  onClick={handleClose}
                  className="w-full bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90 h-12"
                >
                  C'est parti !
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}

// Hook to show welcome modal
export function useWelcomeModal() {
  const [showWelcome, setShowWelcome] = useState(false)

  useEffect(() => {
    const hasSeenWelcome = localStorage.getItem("vyxo_welcome_seen")
    if (!hasSeenWelcome) {
      setShowWelcome(true)
    }
  }, [])

  const markAsSeen = () => {
    localStorage.setItem("vyxo_welcome_seen", "true")
    setShowWelcome(false)
  }

  return { showWelcome, markAsSeen }
}
