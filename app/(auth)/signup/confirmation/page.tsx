"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Mail, CheckCircle2, ArrowRight } from "lucide-react"
import Link from "next/link"

export default function SignUpConfirmationPage() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="w-full max-w-md bg-white/5 backdrop-blur-xl border-white/10 text-center">
          <CardHeader className="pb-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mb-4"
            >
              <CheckCircle2 className="w-10 h-10 text-green-400" />
            </motion.div>
            <CardTitle className="text-2xl font-bold text-white">
              Vérifiez votre email
            </CardTitle>
            <CardDescription className="text-gray-400">
              Un email de confirmation vous a été envoyé
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="p-4 rounded-lg bg-white/5 border border-white/10">
              <div className="flex items-center gap-3 text-left">
                <div className="w-10 h-10 bg-vyxo-gold/20 rounded-full flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-vyxo-gold" />
                </div>
                <div>
                  <p className="text-white font-medium">
                    Cliquez sur le lien dans l'email
                  </p>
                  <p className="text-sm text-gray-400">
                    pour confirmer votre compte et commencer le diagnostic
                  </p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-500">
                Vous n'avez pas reçu l'email ?
              </p>
              <Button
                variant="outline"
                className="w-full border-white/20 text-white hover:bg-white/10"
              >
                Renvoyer l'email
              </Button>
            </div>

            <div className="pt-4 border-t border-white/10">
              <p className="text-xs text-gray-500 mb-4">
                💡 Pensez à vérifier vos spams si vous ne voyez pas l'email
              </p>
              <Link href="/">
                <Button
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                >
                  Retour à l'accueil
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  )
}
