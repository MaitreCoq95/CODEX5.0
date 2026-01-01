"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Loader2, Mail, Lock, Users, Briefcase } from "lucide-react"
import { supabase } from "@/lib/supabase"

function LoginContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const role = searchParams.get("role")
  const isConsultant = role === "consultant"
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!email || !password) {
      setError("Veuillez remplir tous les champs")
      return
    }

    setIsLoading(true)
    setError(null)

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (authError) {
        throw authError
      }

      // Redirect based on role
      if (isConsultant) {
        router.push("/admin")
      } else {
        router.push("/dashboard")
      }
      
    } catch (err: unknown) {
      console.error("Login error:", err)
      const error = err as { message?: string }
      if (error.message?.includes("Invalid login credentials")) {
        setError("Email ou mot de passe incorrect")
      } else {
        setError(error.message || "Une erreur est survenue lors de la connexion")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md"
      >
        {/* Role indicator for consultant */}
        {isConsultant && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mb-6 p-4 bg-vyxo-gold/10 border border-vyxo-gold/30 rounded-xl text-center"
          >
            <div className="flex items-center justify-center gap-2 text-vyxo-gold mb-2">
              <Briefcase className="w-5 h-5" />
              <span className="font-semibold">Espace Consultant</span>
            </div>
            <p className="text-sm text-gray-400">
              Accédez à votre tableau de bord consultant et gérez vos clients
            </p>
          </motion.div>
        )}

        <Card className="bg-white/5 backdrop-blur-xl border-white/10">
          <CardHeader className="text-center pb-2">
            <div className={`mx-auto w-12 h-12 rounded-full flex items-center justify-center mb-4 ${isConsultant ? 'bg-vyxo-gold/20' : 'bg-blue-500/20'}`}>
              {isConsultant ? (
                <Briefcase className="w-6 h-6 text-vyxo-gold" />
              ) : (
                <Users className="w-6 h-6 text-blue-400" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              {isConsultant ? "Connexion Consultant" : "Connexion"}
            </CardTitle>
            <CardDescription className="text-gray-400">
              {isConsultant 
                ? "Accédez à votre espace consultant Vyxo"
                : "Accédez à votre espace Vyxo Codex"
              }
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder={isConsultant ? "consultant@vyxo.fr" : "vous@entreprise.com"}
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setError(null) }}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Password */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Votre mot de passe"
                    value={password}
                    onChange={(e) => { setPassword(e.target.value); setError(null) }}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Forgot password */}
              <div className="text-right">
                <Link href="/forgot-password" className="text-sm text-vyxo-gold hover:underline">
                  Mot de passe oublié ?
                </Link>
              </div>

              {/* Error Message */}
              {error && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm"
                >
                  {error}
                </motion.div>
              )}

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isLoading}
                className={`w-full font-semibold ${
                  isConsultant 
                    ? 'bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90' 
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Connexion en cours...
                  </>
                ) : (
                  <>
                    Se connecter
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Links */}
            <div className="mt-6 space-y-3 text-center">
              {!isConsultant && (
                <p className="text-gray-400 text-sm">
                  Pas encore de compte ?{" "}
                  <Link href="/signup" className="text-vyxo-gold hover:underline">
                    Créer un compte
                  </Link>
                </p>
              )}
              
              {isConsultant ? (
                <p className="text-gray-400 text-sm">
                  Vous êtes un client ?{" "}
                  <Link href="/login" className="text-blue-400 hover:underline">
                    Connexion client
                  </Link>
                </p>
              ) : (
                <p className="text-gray-400 text-sm">
                  Vous êtes consultant ?{" "}
                  <Link href="/login?role=consultant" className="text-vyxo-gold hover:underline">
                    Espace consultant
                  </Link>
                </p>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Back to home */}
        <div className="text-center mt-6">
          <Link href="/landing" className="text-gray-500 text-sm hover:text-gray-300 transition-colors">
            ← Retour à l&apos;accueil
          </Link>
        </div>
      </motion.div>
    </div>
  )
}

// Loading fallback
function LoginLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900">
      <Loader2 className="w-8 h-8 text-vyxo-gold animate-spin" />
    </div>
  )
}

// Export with Suspense for useSearchParams
export default function LoginPage() {
  return (
    <Suspense fallback={<LoginLoading />}>
      <LoginContent />
    </Suspense>
  )
}
