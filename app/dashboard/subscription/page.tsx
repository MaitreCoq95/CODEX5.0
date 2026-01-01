"use client"

import { Suspense, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Loader2,
  CreditCard,
  Calendar,
  CheckCircle2,
  ExternalLink,
  AlertCircle,
  RefreshCw,
  Crown,
} from "lucide-react"
import Link from "next/link"

// Mock subscription data (would come from API/DB)
const mockSubscription = {
  status: "active",
  plan: "Pack Complet",
  price: 2990,
  startDate: "2024-12-28",
  nextBilling: null, // one-time payment
  paymentMethod: "**** **** **** 4242",
}

function SubscriptionContent() {
  const searchParams = useSearchParams()
  const standard = searchParams.get("standard") || "ISO_9001"
  const [loading, setLoading] = useState(false)

  const subscription = mockSubscription

  const handleManageSubscription = async () => {
    setLoading(true)
    try {
      // TODO: Create Stripe Customer Portal session
      const response = await fetch("/api/stripe/portal", { method: "POST" })
      const data = await response.json()
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      console.error("Portal error:", err)
    }
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900 p-4 py-8">
      <div className="max-w-3xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <h1 className="text-3xl font-bold text-white mb-2">Mon Abonnement</h1>
          <p className="text-gray-400">Gérez votre abonnement Vyxo Codex</p>
        </motion.div>

        <div className="space-y-6">
          {/* Current Plan */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="bg-gradient-to-br from-vyxo-gold/20 to-vyxo-gold/5 border-vyxo-gold/30">
              <CardHeader className="flex flex-row items-center justify-between">
                <div className="flex items-center gap-3">
                  <Crown className="w-6 h-6 text-vyxo-gold" />
                  <div>
                    <CardTitle className="text-white">{subscription.plan}</CardTitle>
                    <p className="text-gray-400 text-sm">Plan Premium actif</p>
                  </div>
                </div>
                <Badge className="bg-green-500/20 text-green-400 border-green-500/30">
                  <CheckCircle2 className="w-3 h-3 mr-1" />
                  Actif
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">Montant payé</p>
                    <p className="text-white font-bold text-lg">{subscription.price}€</p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">Date d'achat</p>
                    <p className="text-white font-medium">
                      {new Date(subscription.startDate).toLocaleDateString("fr-FR")}
                    </p>
                  </div>
                  <div className="bg-white/5 rounded-lg p-3">
                    <p className="text-gray-400 text-xs mb-1">Accès</p>
                    <p className="text-white font-medium">À vie</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Payment Method */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2 text-lg">
                  <CreditCard className="w-5 h-5 text-vyxo-gold" />
                  Moyen de paiement
                </CardTitle>
              </CardHeader>
              <CardContent className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="bg-white/10 rounded px-3 py-2">
                    <span className="text-white font-mono">{subscription.paymentMethod}</span>
                  </div>
                  <Badge variant="outline" className="border-white/20 text-gray-400">Visa</Badge>
                </div>
                <Button variant="outline" className="border-white/20 text-white" size="sm" disabled>
                  Modifier
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Actions */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="text-white text-lg">Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-between border-white/20 text-white"
                  onClick={handleManageSubscription}
                  disabled={loading}
                >
                  <span className="flex items-center gap-2">
                    <ExternalLink className="w-4 h-4" />
                    Portail client Stripe
                  </span>
                  {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                </Button>
                <Button variant="outline" className="w-full justify-start border-white/20 text-white" asChild>
                  <Link href={`/dashboard?standard=${standard}`}>
                    <RefreshCw className="w-4 h-4 mr-2" />
                    Retour au dashboard
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Help */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-blue-400 mt-0.5" />
                <div>
                  <p className="text-blue-400 font-medium text-sm">Besoin d'aide ?</p>
                  <p className="text-gray-400 text-xs mt-1">
                    Contactez notre support à{" "}
                    <a href="mailto:support@vyxo.io" className="text-blue-400 hover:underline">
                      support@vyxo.io
                    </a>
                  </p>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default function SubscriptionPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-vyxo-navy flex items-center justify-center"><Loader2 className="w-8 h-8 text-vyxo-gold animate-spin" /></div>}>
      <SubscriptionContent />
    </Suspense>
  )
}
