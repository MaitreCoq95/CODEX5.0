import { z } from "zod"

// Schema de validation du formulaire d'évaluation
export const evaluationFormSchema = z.object({
  // Informations entreprise
  company_name: z
    .string()
    .min(2, "Le nom de l'entreprise doit contenir au moins 2 caractères")
    .max(100, "Le nom de l'entreprise est trop long"),
  
  siret: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^\d{14}$/.test(val.replace(/\s/g, "")),
      "Le SIRET doit contenir 14 chiffres"
    ),
  
  // Profil utilisateur
  user_function: z.enum([
    "dirigeant_dg",
    "directeur_ops",
    "manager_operationnel",
    "responsable_qualite",
    "responsable_logistique",
    "chef_equipe",
    "autre"
  ], { message: "Veuillez sélectionner votre fonction" }),
  
  other_function: z
    .string()
    .optional(),
  
  // Taille entreprise
  company_size: z.enum([
    "moins_10",
    "10_50",
    "51_200",
    "201_500",
    "plus_500"
  ], { message: "Veuillez sélectionner la taille de votre entreprise" }),
  
  // Responsable qualité
  has_quality_manager: z.enum([
    "oui_interne",
    "non",
    "externalise"
  ], { message: "Veuillez indiquer si vous avez un responsable qualité" }),
  
  // Normes/Certifications (au moins une)
  certifications: z
    .array(z.string())
    .min(1, "Veuillez sélectionner au moins une norme ou certification"),
  
  other_certification: z
    .string()
    .optional(),

  // LP-V2-04: Nouveaux champs de qualification
  
  // Maturité du projet
  project_maturity: z.enum([
    "discovery",
    "evaluation",
    "validated",
    "urgent",
    "renewal"
  ]).optional(),

  // Date audit prévu (si urgent)
  audit_date: z
    .string()
    .optional(),

  // Type d'accompagnement souhaité
  accompaniment_type: z.enum([
    "platform_only",
    "hybrid",
    "full",
    "unknown"
  ]).optional(),

  // Budget estimé
  budget: z.enum([
    "under_10k",
    "10k_30k",
    "30k_50k",
    "50k_100k",
    "over_100k",
    "undefined"
  ]).optional(),
  
  // Contact
  email: z
    .string()
    .email("Veuillez entrer une adresse email valide")
    .refine(
      (val) => !val.endsWith("@gmail.com") && !val.endsWith("@yahoo.fr") && !val.endsWith("@hotmail.com"),
      "Veuillez utiliser votre adresse email professionnelle"
    ),
  
  phone: z
    .string()
    .optional()
    .refine(
      (val) => !val || /^(\+33|0)[1-9](\d{8}|\s?\d{2}\s?\d{2}\s?\d{2}\s?\d{2})$/.test(val.replace(/\s/g, "")),
      "Format de téléphone invalide"
    ),
  
  // Rôle sélectionné (dirigeant ou manager)
  selected_role: z.enum(["dirigeant", "manager"]).optional()
})

export type EvaluationFormData = z.infer<typeof evaluationFormSchema>

// Options pour les dropdowns
export const functionOptions = [
  { value: "dirigeant_dg", label: "Dirigeant / DG / CEO" },
  { value: "directeur_ops", label: "Directeur des Opérations" },
  { value: "manager_operationnel", label: "Manager Opérationnel / Chef de service" },
  { value: "responsable_qualite", label: "Responsable Qualité / QHSE" },
  { value: "responsable_logistique", label: "Responsable Logistique / Transport" },
  { value: "chef_equipe", label: "Chef d'équipe / Responsable de site" },
  { value: "autre", label: "Autre (préciser)" }
]

export const companySizeOptions = [
  { value: "moins_10", label: "Moins de 10 salariés" },
  { value: "10_50", label: "10 à 50 salariés" },
  { value: "51_200", label: "51 à 200 salariés" },
  { value: "201_500", label: "201 à 500 salariés" },
  { value: "plus_500", label: "Plus de 500 salariés" }
]

export const qualityManagerOptions = [
  { value: "oui_interne", label: "Oui, en interne" },
  { value: "non", label: "Non, personne dédié" },
  { value: "externalise", label: "Externalisé (prestataire)" }
]

export const certificationOptions = [
  { value: "GDP", label: "GDP", description: "Bonnes Pratiques Distribution Pharma", icon: "💊" },
  { value: "BPF", label: "BPF", description: "Bonnes Pratiques de Fabrication", icon: "🏭" },
  { value: "ISO9001", label: "ISO 9001", description: "Management Qualité", icon: "📋" },
  { value: "ISO14001", label: "ISO 14001", description: "Environnement", icon: "🌿" },
  { value: "ISO45001", label: "ISO 45001", description: "Santé & Sécurité", icon: "🦺" },
  { value: "ISO27001", label: "ISO 27001", description: "Sécurité de l'information", icon: "🔐" },
  { value: "ISO50001", label: "ISO 50001", description: "Gestion de l'énergie", icon: "⚡" },
  { value: "HACCP", label: "HACCP / IFS / BRC", description: "Agroalimentaire", icon: "🍽️" },
  { value: "EN9100", label: "EN 9100", description: "Aéronautique", icon: "✈️" },
  { value: "AS9120B", label: "AS 9120B", description: "Distribution Aéronautique", icon: "📦" },
  { value: "ADR", label: "ADR", description: "Transport Marchandises Dangereuses", icon: "☢️" },
  { value: "SURETE", label: "Sûreté Aérienne", description: "11.2.X / DGAC", icon: "🛡️" },
  { value: "AUTRE", label: "Autre", description: "Préciser ci-dessous", icon: "➕" }
]

// LP-V2-04: Nouvelles options

export const projectMaturityOptions = [
  { value: "discovery", label: "Pas encore démarré – je découvre", emoji: "🔍" },
  { value: "evaluation", label: "En réflexion – j'évalue les solutions", emoji: "🤔" },
  { value: "validated", label: "Projet validé – je cherche un accompagnement", emoji: "✅" },
  { value: "urgent", label: "Audit prévu – je dois être prêt rapidement", emoji: "⏰" },
  { value: "renewal", label: "Déjà certifié – maintien/élargissement", emoji: "🔄" }
]

export const accompanimentOptions = [
  { value: "platform_only", label: "Plateforme seule – mon équipe gère", description: "Accès SaaS uniquement" },
  { value: "hybrid", label: "Hybride – plateforme + consulting ponctuel", description: "Le plus populaire" },
  { value: "full", label: "Full accompagnement – jusqu'au bout", description: "Accompagnement complet" },
  { value: "unknown", label: "Je ne sais pas encore", description: "À définir ensemble" }
]

export const budgetOptions = [
  { value: "under_10k", label: "< 10K€" },
  { value: "10k_30k", label: "10 - 30K€" },
  { value: "30k_50k", label: "30 - 50K€" },
  { value: "50k_100k", label: "50 - 100K€" },
  { value: "over_100k", label: "> 100K€" },
  { value: "undefined", label: "Non défini" }
]

