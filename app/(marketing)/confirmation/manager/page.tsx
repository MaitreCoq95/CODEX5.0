"use client"

import { useSearchParams } from "next/navigation"
import { useState } from "react"
import { CheckCircle2, Share2, Copy, Mail, MessageSquare, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function ConfirmationManagerPage() {
  const searchParams = useSearchParams()
  const companyName = searchParams.get("company") || "Votre entreprise"
  const score = searchParams.get("score") || "0"
  
  const [copied, setCopied] = useState(false)
  const [emailSent, setEmailSent] = useState(false)
  const [directorEmail, setDirectorEmail] = useState("")

  // Générer un lien de partage unique basé sur les params (stable)
  const shareableLink = `https://vyxo-codex.fr/share/eval/${btoa(companyName + score).substring(0, 12)}`

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shareableLink)
    setCopied(true)
    setTimeout(() => setCopied(false), 3000)
  }

  const handleSendToDirector = () => {
    // Logique d'envoi email à implémenter
    setEmailSent(true)
  }

  return (
    <main className="min-h-screen bg-vyxo-navy">
      {/* Header */}
      <div className="bg-gradient-to-b from-blue-500/10 to-transparent py-20">
        <div className="container mx-auto px-4 text-center">
          {/* Success Icon */}
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-500/20 mb-6">
            <CheckCircle2 className="w-10 h-10 text-blue-500" />
          </div>
          
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Votre évaluation est enregistrée !
          </h1>
          
          <p className="text-xl text-gray-400 max-w-xl mx-auto">
            En tant que manager opérationnel, vous pouvez partager ce diagnostic 
            avec votre direction pour validation.
          </p>
        </div>
      </div>

      {/* Résumé du score */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto grid md:grid-cols-3 gap-6">
            {/* Score */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm mb-2">Score préliminaire</p>
              <p className="text-5xl font-bold text-blue-400">{score}</p>
              <p className="text-gray-500 text-sm">/100 points</p>
            </div>
            
            {/* Entreprise */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm mb-2">Entreprise</p>
              <p className="text-xl font-bold text-white truncate">{companyName}</p>
              <p className="text-gray-500 text-sm">Évaluation initiée</p>
            </div>
            
            {/* Statut */}
            <div className="bg-amber-500/10 border border-amber-500/30 rounded-2xl p-6 text-center">
              <p className="text-gray-400 text-sm mb-2">Votre statut</p>
              <div className="flex items-center justify-center gap-2">
                <Users className="w-6 h-6 text-amber-400" />
                <p className="text-lg font-bold text-amber-400">Prescripteur</p>
              </div>
              <p className="text-gray-500 text-sm">En attente validation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Partage */}
      <section className="py-12 bg-slate-900/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-8">
              <Share2 className="w-10 h-10 text-vyxo-gold mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-white mb-2">
                Partagez avec votre direction
              </h2>
              <p className="text-gray-400">
                Pour débloquer l&apos;accès complet, transmettez ce lien à votre dirigeant 
                afin qu&apos;il valide l&apos;inscription de l&apos;entreprise.
              </p>
            </div>

            {/* Lien de partage */}
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 space-y-4">
              <label className="text-white font-medium">Lien de partage unique</label>
              <div className="flex gap-2">
                <Input
                  value={shareableLink}
                  readOnly
                  className="bg-white/5 border-white/20 text-white"
                />
                <Button
                  onClick={copyToClipboard}
                  className={copied ? "bg-green-500" : "bg-vyxo-gold hover:bg-vyxo-gold/90"}
                >
                  {copied ? (
                    <>
                      <CheckCircle2 className="w-4 h-4 mr-2" />
                      Copié !
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copier
                    </>
                  )}
                </Button>
              </div>

              <div className="border-t border-white/10 pt-4 mt-4">
                <label className="text-white font-medium mb-2 block">
                  Ou envoyez directement par email
                </label>
                <div className="flex gap-2">
                  <Input
                    type="email"
                    placeholder="Email de votre dirigeant"
                    value={directorEmail}
                    onChange={(e) => setDirectorEmail(e.target.value)}
                    className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
                  />
                  <Button
                    onClick={handleSendToDirector}
                    disabled={!directorEmail || emailSent}
                    variant="outline"
                    className="border-white/20 text-white hover:bg-white/10"
                  >
                    {emailSent ? (
                      <>
                        <CheckCircle2 className="w-4 h-4 mr-2 text-green-500" />
                        Envoyé
                      </>
                    ) : (
                      <>
                        <Mail className="w-4 h-4 mr-2" />
                        Envoyer
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </div>

            {/* Message d'info */}
            <div className="bg-blue-500/10 border border-blue-500/30 rounded-xl p-4 mt-6">
              <div className="flex gap-3">
                <MessageSquare className="w-5 h-5 text-blue-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-blue-400 font-medium mb-1">
                    Que contient le lien partagé ?
                  </p>
                  <p className="text-gray-400 text-sm">
                    Votre dirigeant verra le résumé de l&apos;évaluation, le score obtenu, 
                    et pourra valider l&apos;inscription pour débloquer l&apos;accès complet à 
                    tous les modules.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ce qui se passe ensuite */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <h3 className="text-xl font-bold text-white mb-6 text-center">
              ⏳ Ce qui se passe ensuite
            </h3>
            
            <div className="space-y-4">
              <div className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                  1
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">
                    Votre dirigeant reçoit le lien
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Il pourra consulter le diagnostic et les modules disponibles.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start bg-white/5 border border-white/10 rounded-xl p-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gray-700 flex items-center justify-center text-white font-bold">
                  2
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">
                    Validation par le dirigeant
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Une fois son SIRET confirmé, l&apos;accès complet est débloqué pour toute l&apos;équipe.
                  </p>
                </div>
              </div>
              
              <div className="flex gap-4 items-start bg-vyxo-gold/10 border border-vyxo-gold/30 rounded-xl p-5">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-vyxo-gold flex items-center justify-center text-vyxo-navy font-bold">
                  3
                </div>
                <div>
                  <h4 className="text-white font-semibold mb-1">
                    Vous êtes notifié
                  </h4>
                  <p className="text-gray-400 text-sm">
                    Vous recevrez un email dès que l&apos;accès sera débloqué pour commencer vos évaluations.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-8">
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-500 text-sm">
            Besoin d&apos;aide ? Contactez-nous à{" "}
            <a href="mailto:support@vyxo-codex.fr" className="text-vyxo-gold hover:underline">
              support@vyxo-codex.fr
            </a>
          </p>
        </div>
      </section>
    </main>
  )
}
