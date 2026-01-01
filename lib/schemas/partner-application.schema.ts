import { z } from "zod"

// Schéma de validation pour le formulaire de candidature partenaire

// Options pour les champs dropdown
export const statutJuridiqueOptions = [
  { value: "auto_entrepreneur", label: "Auto-entrepreneur" },
  { value: "sasu", label: "SASU" },
  { value: "eurl", label: "EURL" },
  { value: "sas", label: "SAS" },
  { value: "autre", label: "Autre" }
] as const

export const experienceOptions = [
  { value: "less_1", label: "Moins d'1 an" },
  { value: "1_3", label: "1-3 ans" },
  { value: "3_5", label: "3-5 ans" },
  { value: "5_10", label: "5-10 ans" },
  { value: "10_plus", label: "10+ ans" }
] as const

export const clientsActifsOptions = [
  { value: "0", label: "0" },
  { value: "1_2", label: "1-2" },
  { value: "3_5", label: "3-5" },
  { value: "6_10", label: "6-10" },
  { value: "10_plus", label: "10+" }
] as const

export const missionsOptions = [
  { value: "0_5", label: "0-5" },
  { value: "5_10", label: "5-10" },
  { value: "10_20", label: "10-20" },
  { value: "20_plus", label: "20+" }
] as const

export const caAnnuelOptions = [
  { value: "less_30k", label: "< 30K€" },
  { value: "30_60k", label: "30-60K€" },
  { value: "60_100k", label: "60-100K€" },
  { value: "100_150k", label: "100-150K€" },
  { value: "150k_plus", label: "150K€+" }
] as const

export const formuleOptions = [
  { value: "revenue_share", label: "Revenue Share (0€, commission 30%)" },
  { value: "licence_pro", label: "Licence Pro (200€/mois, marge client)" },
  { value: "all_in", label: "All-In (500€/mois, white-label)" },
  { value: "unknown", label: "Je ne sais pas encore" }
] as const

export const newClientsPerYearOptions = [
  { value: "1_2", label: "1-2" },
  { value: "3_5", label: "3-5" },
  { value: "6_10", label: "6-10" },
  { value: "10_plus", label: "10+" }
] as const

export const disponibiliteOptions = [
  { value: "immediate", label: "Immédiatement" },
  { value: "1_month", label: "Dans 1 mois" },
  { value: "2_3_months", label: "Dans 2-3 mois" },
  { value: "no_date", label: "Pas de date précise" }
] as const

export const specializationOptions = [
  { value: "gdp", label: "GDP (Pharma/Transport)" },
  { value: "iso_9001", label: "ISO 9001" },
  { value: "iso_45001", label: "ISO 45001" },
  { value: "iso_14001", label: "ISO 14001" },
  { value: "haccp", label: "HACCP / IFS / BRC" },
  { value: "en_9100", label: "EN 9100 (Aéro)" },
  { value: "mase", label: "MASE" },
  { value: "other", label: "Autre" }
] as const

// Schéma Zod
export const partnerApplicationSchema = z.object({
  // Section 1: Infos de base
  first_name: z.string().min(2, "Prénom requis (min 2 caractères)"),
  last_name: z.string().min(2, "Nom requis (min 2 caractères)"),
  email: z.string().email("Email invalide"),
  phone: z.string().min(10, "Téléphone requis"),
  location: z.string().min(2, "Localisation requise"),

  // Section 2: Activité
  statut_juridique: z.enum(["auto_entrepreneur", "sasu", "eurl", "sas", "autre"]),
  experience: z.enum(["less_1", "1_3", "3_5", "5_10", "10_plus"]),
  specializations: z.array(z.string()).min(1, "Sélectionne au moins une spécialisation"),
  other_specialization: z.string().optional(),

  // Section 3: Portfolio
  clients_actifs: z.enum(["0", "1_2", "3_5", "6_10", "10_plus"]),
  missions_completed: z.enum(["0_5", "5_10", "10_20", "20_plus"]),
  ca_annuel: z.enum(["less_30k", "30_60k", "60_100k", "100_150k", "150k_plus"]),

  // Section 4: Projet
  formule_souhaitee: z.enum(["revenue_share", "licence_pro", "all_in", "unknown"]),
  motivation: z.string().min(50, "Minimum 50 caractères requis"),
  new_clients_per_year: z.enum(["1_2", "3_5", "6_10", "10_plus"]),

  // Section 5: Disponibilité
  disponibilite: z.enum(["immediate", "1_month", "2_3_months", "no_date"]),

  // Consentement
  accept_terms: z.literal(true, { message: "Tu dois accepter les conditions" })
})

export type PartnerApplicationData = z.infer<typeof partnerApplicationSchema>
