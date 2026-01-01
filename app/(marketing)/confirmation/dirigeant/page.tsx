"use client"

import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { CheckCircle2, Clock, Mail, Phone, ArrowRight, Download, Calendar, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ConfirmationDirigeantPage() {
  const searchParams = useSearchParams()
  const companyName = searchParams.get("company") || "Votre entreprise"
  const score = searchParams.get("score") || "0"
  const priority = searchParams.get("priority") || "48h"

  return (
    <main className="min-h-screen bg-vyxo-navy">
      {/* Header */}
      <div className="bg-gradient-to-b from-green-500/10 to-transparent py-20">
        <div className="container mx-auto px-4 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500/20 mb-6 animate-bounce-slow">
            <CheckCircle2 className="w-10 h-10 text-green-500" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Félicitations, votre évaluation est confirmée !
          </h1>
          
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            <span className="text-vyxo-gold font-semibold">{companyName}</span> est maintenant 
            enregistrée pour l&apos;évaluation Vyxo Codex
          </p>
        </div>
      </div>

      {/* Résumé du score */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {/* Score */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm mb-2">Votre score</p>
              <p className="text-5xl font-bold text-vyxo-gold">{score}</p>
              <p className="text-gray-500 text-sm">/100 points</p>
            </div>
            
            {/* Priorité */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm mb-2">Contact prioritaire</p>
              <div className="flex items-center justify-center gap-2">
                <Clock className="w-6 h-6 text-green-400" />
                <p className="text-3xl font-bold text-green-400">{priority}</p>
              </div>
              <p className="text-gray-500 text-sm">maximum</p>
            </div>
            
            {/* Accès */}
            <div className="bg-vyxo-gold/10 border border-vyxo-gold/30 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm mb-2">Votre statut</p>
              <div className="flex items-center justify-center gap-2">
                <Shield className="w-6 h-6 text-vyxo-gold" />
                <p className="text-xl font-bold text-vyxo-gold">Accès Complet</p>
              </div>
              <p className="text-gray-500 text-sm">Tous modules débloqués</p>
            </div>
          </div>
        </div>
      </section>

      {/* Prochaines étapes */}
      <section className="py-12 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-white mb-8 text-center">
              📋 Prochaines étapes
            </h2>
            
            <div className="space-y-4">
              {/* Étape 1 */}
              <div className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-vyxo-gold flex items-center justify-center text-vyxo-navy font-bold">
                  1
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-vyxo-gold" />
                    Vérifiez votre email
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Un email de confirmation avec vos accès vous a été envoyé. 
                    Vérifiez vos spams si nécessaire.
                  </p>
                </div>
              </div>
              
              {/* Étape 2 */}
              <div className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-vyxo-gold flex items-center justify-center text-vyxo-navy font-bold">
                  2
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                    <Phone className="w-4 h-4 text-vyxo-gold" />
                    Appel découverte ({priority})
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Un expert Vyxo vous contactera sous {priority} pour un appel 
                    découverte de 30 minutes afin de personnaliser votre parcours.
                  </p>
                </div>
              </div>
              
              {/* Étape 3 */}
              <div className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-vyxo-gold flex items-center justify-center text-vyxo-navy font-bold">
                  3
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1 flex items-center gap-2">
                    <Download className="w-4 h-4 text-vyxo-gold" />
                    Recevez votre rapport
                  </h3>
                  <p className="text-gray-400 text-sm">
                    Après l&apos;appel, vous recevrez un rapport d&apos;évaluation personnalisé 
                    avec vos axes d&apos;amélioration prioritaires.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Actions */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-xl mx-auto space-y-4">
            {/* CTA Principal */}
            <Button
              className="w-full bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy font-bold py-6 text-lg"
              asChild
            >
              <Link href="/codex">
                <ArrowRight className="w-5 h-5 mr-2" />
                Accéder à mes modules d&apos;évaluation
              </Link>
            </Button>
            
            {/* CTA Secondaire */}
            <Button
              variant="outline"
              className="w-full border-white/20 text-white hover:bg-white/10 py-6"
              asChild
            >
              <Link href="https://calendly.com/vyxo-codex" target="_blank">
                <Calendar className="w-5 h-5 mr-2" />
                Réserver un créneau d&apos;appel maintenant
              </Link>
            </Button>
            
            <p className="text-center text-gray-500 text-sm">
              Besoin d&apos;aide ? Contactez-nous à{" "}
              <a href="mailto:support@vyxo-codex.fr" className="text-vyxo-gold hover:underline">
                support@vyxo-codex.fr
              </a>
            </p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-12 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-lg font-medium text-white mb-6">
              Ils nous font confiance
            </h3>
            <div className="flex flex-wrap justify-center gap-8 opacity-50">
              {/* Placeholder logos - à remplacer par de vrais logos */}
              <div className="text-gray-400 text-sm">Logo Client 1</div>
              <div className="text-gray-400 text-sm">Logo Client 2</div>
              <div className="text-gray-400 text-sm">Logo Client 3</div>
              <div className="text-gray-400 text-sm">Logo Client 4</div>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
