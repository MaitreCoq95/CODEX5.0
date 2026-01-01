"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { 
  Send, 
  User, 
  Briefcase, 
  FolderKanban, 
  Target, 
  Calendar,
  CheckCircle,
  Loader2
} from "lucide-react"
import { 
  partnerApplicationSchema, 
  type PartnerApplicationData,
  statutJuridiqueOptions,
  experienceOptions,
  clientsActifsOptions,
  missionsOptions,
  caAnnuelOptions,
  formuleOptions,
  newClientsPerYearOptions,
  disponibiliteOptions,
  specializationOptions
} from "@/lib/schemas/partner-application.schema"

interface ApplicationFormProps {
  onSubmitSuccess?: () => void
}

export function ApplicationForm({ onSubmitSuccess }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors }
  } = useForm<PartnerApplicationData>({
    resolver: zodResolver(partnerApplicationSchema),
    defaultValues: {
      specializations: []
    }
  })

  const selectedSpecs = watch("specializations") || []

  const toggleSpecialization = (value: string) => {
    if (selectedSpecs.includes(value)) {
      setValue("specializations", selectedSpecs.filter(s => s !== value))
    } else {
      setValue("specializations", [...selectedSpecs, value])
    }
  }

  const onSubmit = async (data: PartnerApplicationData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/partners/apply", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      })

      if (response.ok) {
        setSubmitSuccess(true)
        onSubmitSuccess?.()
      }
    } catch (error) {
      console.error("Error submitting application:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  if (submitSuccess) {
    return (
      <div className="bg-partner-accent/10 border border-partner-accent/30 rounded-2xl p-8 text-center">
        <div className="w-16 h-16 rounded-full bg-partner-accent/20 flex items-center justify-center mx-auto mb-6">
          <CheckCircle className="w-8 h-8 text-partner-accent" />
        </div>
        <h3 className="text-2xl font-bold text-white mb-4">
          ✅ Candidature reçue !
        </h3>
        <p className="text-gray-400 mb-6">
          On analyse ton profil et on revient vers toi sous 48h par email.
          <br />
          Pense à vérifier tes spams si tu ne vois rien.
        </p>
        <p className="text-partner-accent font-medium">
          À très vite, futur partenaire Vyxo ! 🐓
        </p>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Section 1: Infos de base */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <User className="w-5 h-5 text-partner-accent" />
          <h3 className="text-lg font-bold text-white">1. Informations de base</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Prénom *</label>
            <input
              {...register("first_name")}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-partner-accent focus:outline-none"
              placeholder="Vivien"
            />
            {errors.first_name && <p className="text-red-400 text-xs mt-1">{errors.first_name.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Nom *</label>
            <input
              {...register("last_name")}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-partner-accent focus:outline-none"
              placeholder="MaitreCoq"
            />
            {errors.last_name && <p className="text-red-400 text-xs mt-1">{errors.last_name.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Email professionnel *</label>
            <input
              {...register("email")}
              type="email"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-partner-accent focus:outline-none"
              placeholder="vivien@consulting.fr"
            />
            {errors.email && <p className="text-red-400 text-xs mt-1">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Téléphone *</label>
            <input
              {...register("phone")}
              type="tel"
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-partner-accent focus:outline-none"
              placeholder="06 12 34 56 78"
            />
            {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm text-gray-400 mb-2">Localisation (Ville/Région) *</label>
            <input
              {...register("location")}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-partner-accent focus:outline-none"
              placeholder="Lyon, Auvergne-Rhône-Alpes"
            />
            {errors.location && <p className="text-red-400 text-xs mt-1">{errors.location.message}</p>}
          </div>
        </div>
      </div>

      {/* Section 2: Activité */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Briefcase className="w-5 h-5 text-partner-accent" />
          <h3 className="text-lg font-bold text-white">2. Ton activité</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Statut juridique *</label>
            <select
              {...register("statut_juridique")}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-partner-accent focus:outline-none"
            >
              <option value="">Sélectionner...</option>
              {statutJuridiqueOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.statut_juridique && <p className="text-red-400 text-xs mt-1">{errors.statut_juridique.message}</p>}
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Années d&apos;expérience *</label>
            <select
              {...register("experience")}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-partner-accent focus:outline-none"
            >
              <option value="">Sélectionner...</option>
              {experienceOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
            {errors.experience && <p className="text-red-400 text-xs mt-1">{errors.experience.message}</p>}
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-3">Spécialisation(s) *</label>
          <div className="flex flex-wrap gap-2">
            {specializationOptions.map(opt => (
              <button
                key={opt.value}
                type="button"
                onClick={() => toggleSpecialization(opt.value)}
                className={`px-4 py-2 rounded-lg text-sm transition-all ${
                  selectedSpecs.includes(opt.value)
                    ? "bg-partner-accent text-slate-900 font-medium"
                    : "bg-slate-700 text-gray-300 hover:bg-slate-600"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          {errors.specializations && <p className="text-red-400 text-xs mt-2">{errors.specializations.message}</p>}
        </div>
      </div>

      {/* Section 3: Portfolio */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <FolderKanban className="w-5 h-5 text-partner-accent" />
          <h3 className="text-lg font-bold text-white">3. Ton portfolio</h3>
        </div>

        <div className="grid md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Clients actifs *</label>
            <select
              {...register("clients_actifs")}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-partner-accent focus:outline-none"
            >
              <option value="">Sélectionner...</option>
              {clientsActifsOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Missions réalisées *</label>
            <select
              {...register("missions_completed")}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-partner-accent focus:outline-none"
            >
              <option value="">Sélectionner...</option>
              {missionsOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">CA annuel *</label>
            <select
              {...register("ca_annuel")}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-partner-accent focus:outline-none"
            >
              <option value="">Sélectionner...</option>
              {caAnnuelOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Section 4: Projet */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Target className="w-5 h-5 text-partner-accent" />
          <h3 className="text-lg font-bold text-white">4. Ton projet</h3>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Formule qui t&apos;intéresse *</label>
            <select
              {...register("formule_souhaitee")}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-partner-accent focus:outline-none"
            >
              <option value="">Sélectionner...</option>
              {formuleOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Nouveaux clients/an *</label>
            <select
              {...register("new_clients_per_year")}
              className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-partner-accent focus:outline-none"
            >
              <option value="">Sélectionner...</option>
              {newClientsPerYearOptions.map(opt => (
                <option key={opt.value} value={opt.value}>{opt.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div>
          <label className="block text-sm text-gray-400 mb-2">Pourquoi veux-tu devenir partenaire Vyxo? * (min 50 caractères)</label>
          <textarea
            {...register("motivation")}
            rows={4}
            className="w-full bg-slate-800 border border-slate-700 rounded-lg px-4 py-3 text-white focus:border-partner-accent focus:outline-none resize-none"
            placeholder="Je souhaite augmenter mon panier moyen, générer du MRR, me différencier..."
          />
          {errors.motivation && <p className="text-red-400 text-xs mt-1">{errors.motivation.message}</p>}
        </div>
      </div>

      {/* Section 5: Disponibilité */}
      <div className="bg-slate-800/30 border border-slate-700/50 rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <Calendar className="w-5 h-5 text-partner-accent" />
          <h3 className="text-lg font-bold text-white">5. Disponibilité</h3>
        </div>

        <div className="flex flex-wrap gap-3">
          {disponibiliteOptions.map(opt => (
            <label key={opt.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                {...register("disponibilite")}
                value={opt.value}
                className="w-4 h-4 text-partner-accent focus:ring-partner-accent"
              />
              <span className="text-gray-300">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Consent & Submit */}
      <div className="space-y-4">
        <label className="flex items-start gap-3 cursor-pointer">
          <input
            type="checkbox"
            {...register("accept_terms")}
            className="w-5 h-5 mt-0.5 text-partner-accent focus:ring-partner-accent rounded"
          />
          <span className="text-sm text-gray-400">
            J&apos;ai lu et j&apos;accepte les conditions du programme partenaire Vyxo *
          </span>
        </label>
        {errors.accept_terms && <p className="text-red-400 text-xs">{errors.accept_terms.message}</p>}

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full bg-partner-accent hover:bg-partner-accent/90 text-slate-900 font-bold py-4 px-8 rounded-lg text-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-5 h-5 animate-spin" />
              Envoi en cours...
            </>
          ) : (
            <>
              <Send className="w-5 h-5" />
              Envoyer ma candidature
            </>
          )}
        </button>
      </div>
    </form>
  )
}

export default ApplicationForm
