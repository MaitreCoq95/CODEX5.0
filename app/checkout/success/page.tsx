"use client"

import { Suspense, useEffect, useState } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { CheckCircle2, PartyPopper, ArrowRight, Loader2, Download } from "lucide-react"
import Link from "next/link"
import Confetti from "react-confetti"

function SuccessContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const sessionId = searchParams.get("session_id")
  const [showConfetti, setShowConfetti] = useState(true)
  const [windowSize, setWindowSize] = useState({ width: 0, height: 0 })

  useEffect(() => {
    setWindowSize({ width: window.innerWidth, height: window.innerHeight })
    
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900 flex items-center justify-center p-4">
      {showConfetti && <Confetti width={windowSize.width} height={windowSize.height} recycle={false} numberOfPieces={200} />}

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="max-w-lg w-full"
      >
        <Card className="bg-white/5 border-white/10 text-center">
          <CardContent className="pt-12 pb-8 space-y-6">
            {/* Success Icon */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", delay: 0.2 }}
              className="w-20 h-20 mx-auto rounded-full bg-green-500/20 flex items-center justify-center"
            >
              <CheckCircle2 className="w-10 h-10 text-green-500" />
            </motion.div>

            {/* Title */}
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 flex items-center justify-center gap-2">
                Paiement réussi !
                <PartyPopper className="w-8 h-8 text-vyxo-gold" />
              </h1>
              <p className="text-gray-400">
                Bienvenue dans Vyxo Codex Premium
              </p>
            </div>

            {/* What's Next */}
            <div className="bg-white/5 rounded-lg p-4 text-left space-y-3">
              <p className="text-white font-medium">Prochaines étapes :</p>
              <ul className="space-y-2 text-sm text-gray-300">
                <li className="flex gap-2">
                  <span className="text-vyxo-gold">1.</span>
                  Accédez à votre dashboard personnalisé
                </li>
                <li className="flex gap-2">
                  <span className="text-vyxo-gold">2.</span>
                  Complétez votre diagnostic si pas déjà fait
                </li>
                <li className="flex gap-2">
                  <span className="text-vyxo-gold">3.</span>
                  Utilisez le générateur IA pour vos documents
                </li>
              </ul>
            </div>

            {/* CTA */}
            <div className="space-y-3 pt-4">
              <Button
                className="w-full bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90 h-12"
                asChild
              >
                <Link href="/dashboard?standard=ISO_9001">
                  Accéder au Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Link>
              </Button>
              
              <p className="text-gray-500 text-xs">
                Un email de confirmation a été envoyé
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-vyxo-navy flex items-center justify-center"><Loader2 className="w-8 h-8 text-vyxo-gold animate-spin" /></div>}>
      <SuccessContent />
    </Suspense>
  )
}
