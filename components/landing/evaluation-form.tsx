"use client"

import { useState, useEffect, useMemo } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
  evaluationFormSchema, 
  type EvaluationFormData,
  functionOptions,
  companySizeOptions,
  qualityManagerOptions,
  certificationOptions,
  projectMaturityOptions,
  accompanimentOptions
} from "@/lib/schemas/evaluation-form.schema"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { CheckCircle2, AlertCircle, Building2, User, Phone, Mail, Loader2, BadgeCheck } from "lucide-react"
import { useSiretValidation } from "@/lib/hooks/use-siret-validation"
import { formatSiret } from "@/lib/services/siret-service"

interface EvaluationFormProps {
  selectedRole?: "dirigeant" | "manager" | null
  onSubmit: (data: EvaluationFormData) => void
}

export function EvaluationForm({ selectedRole, onSubmit }: EvaluationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showOtherFunction, setShowOtherFunction] = useState(false)
  const [showOtherCertification, setShowOtherCertification] = useState(false)
  
  // Hook de validation SIRET
  const { validateSiret, isValidating: isSiretValidating, result: siretResult } = useSiretValidation()

  const form = useForm<EvaluationFormData>({
    resolver: zodResolver(evaluationFormSchema),
    defaultValues: {
      company_name: "",
      siret: "",
      user_function: undefined,
      other_function: "",
      company_size: undefined,
      has_quality_manager: undefined,
      certifications: [],
      other_certification: "",
      email: "",
      phone: "",
      selected_role: selectedRole || undefined
    }
  })

  const { register, handleSubmit, watch, setValue, formState: { errors } } = form
  const watchedCertifications = watch("certifications")
  const selectedCertifications = useMemo(() => watchedCertifications || [], [watchedCertifications])
  const selectedFunction = watch("user_function")

  // Sauvegarde localStorage
  useEffect(() => {
    const savedData = localStorage.getItem("vyxo_evaluation_form")
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData)
        Object.keys(parsed).forEach((key) => {
          setValue(key as keyof EvaluationFormData, parsed[key])
        })
      } catch {
        // Ignore parse errors
      }
    }
  }, [setValue])

  useEffect(() => {
    const subscription = watch((data) => {
      localStorage.setItem("vyxo_evaluation_form", JSON.stringify(data))
    })
    return () => subscription.unsubscribe()
  }, [watch])

  // Afficher le champ "Autre" si sélectionné
  useEffect(() => {
    setShowOtherFunction(selectedFunction === "autre")
  }, [selectedFunction])

  useEffect(() => {
    setShowOtherCertification(selectedCertifications.includes("AUTRE"))
  }, [selectedCertifications])

  const toggleCertification = (value: string) => {
    const current = selectedCertifications
    const updated = current.includes(value)
      ? current.filter((c) => c !== value)
      : [...current, value]
    setValue("certifications", updated)
  }

  const handleFormSubmit = async (data: EvaluationFormData) => {
    setIsSubmitting(true)
    try {
      await onSubmit(data)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-8">
      {/* Section Entreprise */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-vyxo-gold mb-4">
          <Building2 className="w-5 h-5" />
          <h3 className="font-semibold">Votre entreprise</h3>
        </div>

        {/* Nom entreprise */}
        <div className="space-y-2">
          <Label htmlFor="company_name" className="text-white">
            Nom de l&apos;entreprise <span className="text-red-400">*</span>
          </Label>
          <Input
            id="company_name"
            {...register("company_name")}
            placeholder="Ex: Transport Express SAS"
            className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
          />
          {errors.company_name && (
            <p className="text-red-400 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {errors.company_name.message}
            </p>
          )}
        </div>

        {/* SIRET - avec validation temps réel */}
        <div className="space-y-2">
          <Label htmlFor="siret" className="text-white flex items-center gap-2">
            Numéro SIRET
            <span className="text-xs bg-vyxo-gold/20 text-vyxo-gold px-2 py-0.5 rounded-full">
              🔓 Débloquez l&apos;accès complet
            </span>
          </Label>
          <div className="relative">
            <Input
              id="siret"
              {...register("siret")}
              placeholder="123 456 789 00012"
              className={`bg-white/5 border-white/20 text-white placeholder:text-gray-500 pr-10 ${
                siretResult?.isValid ? "border-green-500" : ""
              } ${siretResult && !siretResult.isValid ? "border-red-500" : ""}`}
              onChange={async (e) => {
                const formatted = formatSiret(e.target.value)
                setValue("siret", formatted)
                // Valider quand on a 14 chiffres
                if (formatted.replace(/\s/g, "").length === 14) {
                  const result = await validateSiret(formatted)
                  // Auto-fill nom entreprise si trouvé
                  if (result?.isValid && result.companyName) {
                    setValue("company_name", result.companyName)
                  }
                }
              }}
            />
            {/* Indicateur de statut */}
            <div className="absolute right-3 top-1/2 -translate-y-1/2">
              {isSiretValidating && (
                <Loader2 className="w-5 h-5 text-vyxo-gold animate-spin" />
              )}
              {!isSiretValidating && siretResult?.isValid && (
                <BadgeCheck className="w-5 h-5 text-green-500" />
              )}
              {!isSiretValidating && siretResult && !siretResult.isValid && (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
            </div>
          </div>

          {/* Affichage entreprise validée */}
          {siretResult?.isValid && siretResult.companyName && (
            <div className="bg-green-500/10 border border-green-500/30 rounded-lg p-3 animate-slide-in-up">
              <div className="flex items-center gap-2 text-green-400 mb-1">
                <BadgeCheck className="w-4 h-4" />
                <span className="text-sm font-medium">Entreprise identifiée</span>
              </div>
              <p className="text-white text-sm font-medium">{siretResult.companyName}</p>
              {siretResult.address && (
                <p className="text-gray-400 text-xs mt-1">
                  {siretResult.address}, {siretResult.postalCode} {siretResult.city}
                </p>
              )}
              {siretResult.nafLabel && (
                <p className="text-gray-500 text-xs mt-1">
                  Activité: {siretResult.nafLabel}
                </p>
              )}
            </div>
          )}

          {/* Erreur SIRET */}
          {siretResult && !siretResult.isValid && siretResult.error && (
            <p className="text-red-400 text-sm flex items-center gap-1">
              <AlertCircle className="w-4 h-4" />
              {siretResult.error}
            </p>
          )}

          {/* Message d'incitation (quand pas encore de SIRET) */}
          {!siretResult && (
            <div className="bg-gradient-to-r from-vyxo-gold/10 to-transparent border border-vyxo-gold/20 rounded-lg p-3 mt-2">
              <p className="text-vyxo-gold text-sm font-medium mb-1">
                ✨ Avec le SIRET, vous débloquez :
              </p>
              <ul className="text-gray-400 text-xs space-y-1">
                <li>✓ Rapport d&apos;évaluation complet personnalisé</li>
                <li>✓ Benchmark comparatif de votre secteur</li>
                <li>✓ Contact prioritaire sous 24h avec un expert</li>
                <li>✓ Accès immédiat à tous les modules d&apos;évaluation</li>
              </ul>
              <p className="text-gray-500 text-xs mt-2 italic">
                Sans SIRET → Aperçu limité et délai de 48h
              </p>
            </div>
          )}
          {errors.siret && (
            <p className="text-red-400 text-sm">{errors.siret.message}</p>
          )}
        </div>

        {/* Taille entreprise */}
        <div className="space-y-2">
          <Label className="text-white">
            Taille de l&apos;entreprise <span className="text-red-400">*</span>
          </Label>
          <Select onValueChange={(val) => setValue("company_size", val as EvaluationFormData["company_size"])}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue placeholder="Sélectionnez la taille" />
            </SelectTrigger>
            <SelectContent>
              {companySizeOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.company_size && (
            <p className="text-red-400 text-sm">{errors.company_size.message}</p>
          )}
        </div>
      </div>

      {/* Section Profil */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-vyxo-gold mb-4">
          <User className="w-5 h-5" />
          <h3 className="font-semibold">Votre profil</h3>
        </div>

        {/* Fonction */}
        <div className="space-y-2">
          <Label className="text-white">
            Votre fonction <span className="text-red-400">*</span>
          </Label>
          <Select onValueChange={(val) => setValue("user_function", val as EvaluationFormData["user_function"])}>
            <SelectTrigger className="bg-white/5 border-white/20 text-white">
              <SelectValue placeholder="Sélectionnez votre fonction" />
            </SelectTrigger>
            <SelectContent>
              {functionOptions.map((opt) => (
                <SelectItem key={opt.value} value={opt.value}>
                  {opt.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {showOtherFunction && (
            <Input
              {...register("other_function")}
              placeholder="Précisez votre fonction"
              className="mt-2 bg-white/5 border-white/20 text-white"
            />
          )}
          {errors.user_function && (
            <p className="text-red-400 text-sm">{errors.user_function.message}</p>
          )}
        </div>

        {/* Responsable Qualité */}
        <div className="space-y-3">
          <Label className="text-white">
            Y a-t-il un responsable qualité dans votre entreprise ? <span className="text-red-400">*</span>
          </Label>
          <RadioGroup
            onValueChange={(val) => setValue("has_quality_manager", val as EvaluationFormData["has_quality_manager"])}
            className="flex flex-col gap-2"
          >
            {qualityManagerOptions.map((opt) => (
              <div key={opt.value} className="flex items-center space-x-3 p-3 rounded-lg hover:bg-white/5 transition-colors">
                <RadioGroupItem value={opt.value} id={opt.value} className="border-white/30" />
                <Label htmlFor={opt.value} className="text-gray-300 cursor-pointer">
                  {opt.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
          {errors.has_quality_manager && (
            <p className="text-red-400 text-sm">{errors.has_quality_manager.message}</p>
          )}
        </div>
      </div>

      {/* Section Normes */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-vyxo-gold mb-4">
          <CheckCircle2 className="w-5 h-5" />
          <h3 className="font-semibold">Normes & Certifications visées</h3>
        </div>
        <p className="text-gray-400 text-sm mb-4">
          Sélectionnez toutes les normes qui vous concernent
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {certificationOptions.map((cert) => (
            <button
              key={cert.value}
              type="button"
              onClick={() => toggleCertification(cert.value)}
              className={`p-4 rounded-xl border transition-all text-left ${
                selectedCertifications.includes(cert.value)
                  ? "bg-vyxo-gold/20 border-vyxo-gold text-white"
                  : "bg-white/5 border-white/10 text-gray-400 hover:border-white/30"
              }`}
            >
              <span className="text-2xl">{cert.icon}</span>
              <p className="font-medium mt-2 text-sm">{cert.label}</p>
              <p className="text-xs opacity-70">{cert.description}</p>
            </button>
          ))}
        </div>

        {showOtherCertification && (
          <Input
            {...register("other_certification")}
            placeholder="Précisez la norme ou certification"
            className="mt-3 bg-white/5 border-white/20 text-white"
          />
        )}

        {errors.certifications && (
          <p className="text-red-400 text-sm">{errors.certifications.message}</p>
        )}
      </div>

      {/* Section Contact */}
      <div className="space-y-4">
        <div className="flex items-center gap-2 text-vyxo-gold mb-4">
          <Mail className="w-5 h-5" />
          <h3 className="font-semibold">Vos coordonnées</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email professionnel <span className="text-red-400">*</span>
            </Label>
            <Input
              id="email"
              type="email"
              {...register("email")}
              placeholder="vous@entreprise.fr"
              className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
            />
            {errors.email && (
              <p className="text-red-400 text-sm">{errors.email.message}</p>
            )}
          </div>

          {/* Téléphone */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white flex items-center gap-2">
              <Phone className="w-4 h-4" />
              Téléphone <span className="text-gray-500">(recommandé)</span>
            </Label>
            <Input
              id="phone"
              type="tel"
              {...register("phone")}
              placeholder="+33 6 XX XX XX XX"
              className="bg-white/5 border-white/20 text-white placeholder:text-gray-500"
            />
            {errors.phone && (
              <p className="text-red-400 text-sm">{errors.phone.message}</p>
            )}
          </div>
        </div>
      </div>

      {/* LP-V2-04: Section Qualification du projet */}
      <div className="space-y-4 pt-4 border-t border-white/10">
        <div className="flex items-center gap-2 text-vyxo-gold mb-4">
          <span className="text-xl">🎯</span>
          <h3 className="font-semibold">Votre projet de conformité</h3>
        </div>

        {/* Maturité du projet */}
        <div className="space-y-3">
          <Label className="text-white">
            Où en êtes-vous dans votre démarche ?
          </Label>
          <div className="grid grid-cols-1 gap-2">
            {projectMaturityOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setValue("project_maturity", opt.value as EvaluationFormData["project_maturity"])}
                className={`flex items-center gap-3 p-3 rounded-lg border transition-all text-left ${
                  watch("project_maturity") === opt.value
                    ? "border-vyxo-gold bg-vyxo-gold/10 text-white"
                    : "border-white/10 hover:border-white/30 text-gray-300"
                }`}
              >
                <span className="text-lg">{opt.emoji}</span>
                <span className="text-sm">{opt.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Date audit si urgent */}
        {watch("project_maturity") === "urgent" && (
          <div className="space-y-2 animate-fade-in">
            <Label className="text-white">
              Date prévue de l&apos;audit <span className="text-red-400">*</span>
            </Label>
            <Input
              type="date"
              {...register("audit_date")}
              className="bg-white/5 border-white/20 text-white"
            />
          </div>
        )}

        {/* Type d'accompagnement */}
        <div className="space-y-3">
          <Label className="text-white">
            Quel type d&apos;accompagnement recherchez-vous ?
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {accompanimentOptions.map((opt) => (
              <button
                key={opt.value}
                type="button"
                onClick={() => setValue("accompaniment_type", opt.value as EvaluationFormData["accompaniment_type"])}
                className={`flex flex-col items-start p-3 rounded-lg border transition-all text-left ${
                  watch("accompaniment_type") === opt.value
                    ? "border-vyxo-gold bg-vyxo-gold/10 text-white"
                    : "border-white/10 hover:border-white/30 text-gray-300"
                }`}
              >
                <span className="text-sm font-medium">{opt.label}</span>
                <span className="text-xs text-gray-500">{opt.description}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Submit */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full h-14 bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy font-bold text-lg"
      >
        {isSubmitting ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            Traitement en cours...
          </>
        ) : (
          "COMMENCER MON ÉVALUATION →"
        )}
      </Button>

      <p className="text-center text-gray-500 text-xs">
        En soumettant ce formulaire, vous acceptez notre politique de confidentialité.
        <br />
        Vos données ne seront jamais partagées avec des tiers.
      </p>
    </form>
  )
}
