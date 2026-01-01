"use client"

import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowRight, Loader2, Mail, Lock, User } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { OnboardingProgress, ONBOARDING_STEPS } from "@/components/onboarding"

interface FormData {
  email: string
  password: string
  name: string
}

export function SignUpForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const targetStandard = searchParams.get("standard") || "ISO_9001"
  
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  
  const [formData, setFormData] = useState<FormData>({
    email: "",
    password: "",
    name: "",
  })

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    setError(null)
  }

  const validateForm = (): boolean => {
    if (!formData.email || !formData.password || !formData.name) {
      setError("Veuillez remplir tous les champs")
      return false
    }
    if (formData.password.length < 8) {
      setError("Le mot de passe doit contenir au moins 8 caractères")
      return false
    }
    if (!formData.email.includes("@")) {
      setError("Veuillez entrer un email valide")
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!validateForm()) return

    setIsLoading(true)
    setError(null)

    try {
      const { error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            name: formData.name,
            target_standard: targetStandard,
          },
          emailRedirectTo: `${window.location.origin}/onboarding/assessment?standard=${targetStandard}`,
        },
      })

      if (authError) {
        throw authError
      }

      // Redirect to assessment directly
      router.push(`/onboarding/assessment?standard=${targetStandard}`)
      
    } catch (err: unknown) {
      console.error("Signup error:", err)
      const error = err as { message?: string }
      if (error.message?.includes("already registered")) {
        setError("Cet email est déjà utilisé. Connectez-vous ou utilisez un autre email.")
      } else {
        setError(error.message || "Une erreur est survenue lors de l'inscription")
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900 p-4">
      {/* Progress Indicator */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md mb-8"
      >
        <OnboardingProgress steps={ONBOARDING_STEPS} currentStep={0} />
      </motion.div>
        <Card className="w-full max-w-md bg-white/5 backdrop-blur-xl border-white/10">
          <CardHeader className="text-center pb-2">
            <div className="mx-auto w-12 h-12 rounded-full bg-vyxo-gold/20 flex items-center justify-center mb-4">
              <User className="w-6 h-6 text-vyxo-gold" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              Créer votre compte
            </CardTitle>
            <CardDescription className="text-gray-400">
              Accédez à votre espace Vyxo Codex
            </CardDescription>
          </CardHeader>

          <CardContent className="pt-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Name */}
              <div className="space-y-2">
                <Label htmlFor="name" className="text-white">Nom complet</Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="name"
                    placeholder="Jean Dupont"
                    value={formData.name}
                    onChange={(e) => updateFormData("name", e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">Email professionnel</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="jean@entreprise.com"
                    value={formData.email}
                    onChange={(e) => updateFormData("email", e.target.value)}
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
                    placeholder="Minimum 8 caractères"
                    value={formData.password}
                    onChange={(e) => updateFormData("password", e.target.value)}
                    className="pl-10 bg-white/10 border-white/20 text-white placeholder:text-gray-500"
                  />
                </div>
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
                className="w-full bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90 font-semibold"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Création en cours...
                  </>
                ) : (
                  <>
                    Créer mon compte
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </>
                )}
              </Button>
            </form>

            {/* Login Link */}
            <p className="text-center text-gray-400 text-sm mt-6">
              Déjà un compte ?{" "}
              <a href="/login" className="text-vyxo-gold hover:underline">
                Se connecter
              </a>
            </p>
          </CardContent>
        </Card>
    </div>
  )
}
