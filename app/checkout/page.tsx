"use client"

import { Suspense, useState, useEffect } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Loader2, Shield, Lock, CreditCard, Check, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { loadStripe } from "@stripe/stripe-js"

// Initialize Stripe
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || "pk_test_placeholder")

const plans: Record<string, { name: string; description: string }> = {
  monthly: { name: "Accompagnement Mensuel", description: "Accompagnement progressif" },
  onetime: { name: "Pack Complet", description: "Accès à vie" },
}

function CheckoutContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const planId = searchParams.get("plan") || "onetime"
  const standard = searchParams.get("standard") || "ISO_9001"
  
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const plan = plans[planId] || plans.onetime

  const handleCheckout = async () => {
    setLoading(true)
    setError(null)

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ planId, standard }),
      })

      const data = await response.json()

      if (data.error) {
        throw new Error(data.error)
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      } else {
        const stripe = await stripePromise
        if (stripe && data.sessionId) {
          await stripe.redirectToCheckout({ sessionId: data.sessionId })
        }
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900 py-12 px-4">
      <div className="max-w-xl mx-auto">
        {/* Back Link */}
        <Link href={`/pricing?standard=${standard}`} className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8">
          <ArrowLeft className="w-4 h-4" />
          Retour aux plans
        </Link>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <Card className="bg-white/5 border-white/10">
            <CardHeader className="text-center border-b border-white/10 pb-6">
              <Badge className="mx-auto mb-4 bg-vyxo-gold/20 text-vyxo-gold">
                <Lock className="w-3 h-3 mr-1" />
                Paiement sécurisé
              </Badge>
              <CardTitle className="text-white text-2xl">Finaliser votre commande</CardTitle>
            </CardHeader>

            <CardContent className="space-y-6 pt-6">
              {/* Order Summary */}
              <div className="bg-white/5 rounded-lg p-4 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Plan sélectionné</span>
                  <span className="text-white font-medium">{plan.name}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                  <span className="text-white font-medium">Total</span>
                  <span className="text-2xl font-bold text-vyxo-gold">
                    Sur demande
                  </span>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-2">
                {["Accès immédiat", "Toutes les fonctionnalités", "Support prioritaire"].map((feature, i) => (
                  <div key={i} className="flex items-center gap-2 text-gray-300 text-sm">
                    <Check className="w-4 h-4 text-green-500" />
                    {feature}
                  </div>
                ))}
              </div>

              {/* Error */}
              {error && (
                <div className="bg-red-500/20 border border-red-500/30 rounded-lg p-3 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Checkout Button */}
              <Button
                onClick={handleCheckout}
                disabled={loading}
                className="w-full bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90 h-12 text-lg"
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Redirection...
                  </>
                ) : (
                  <>
                    <CreditCard className="w-5 h-5 mr-2" />
                    Confirmer la demande
                  </>
                )}
              </Button>

              {/* Trust */}
              <div className="flex items-center justify-center gap-2 text-gray-500 text-xs">
                <Shield className="w-4 h-4" />
                Paiement sécurisé par Stripe • SSL 256-bit
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-vyxo-navy flex items-center justify-center"><Loader2 className="w-8 h-8 text-vyxo-gold animate-spin" /></div>}>
      <CheckoutContent />
    </Suspense>
  )
}
