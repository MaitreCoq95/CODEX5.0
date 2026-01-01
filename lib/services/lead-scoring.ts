import { EvaluationFormData } from "@/lib/schemas/evaluation-form.schema"

// Types pour le scoring
export interface LeadScore {
  total: number
  breakdown: {
    role: number
    companySize: number
    qualityManager: number
    certifications: number
    siret: number
  }
  level: "HOT" | "QUALIFIED" | "NURTURE" | "EARLY_STAGE"
  priority: "4h" | "24h" | "48h" | "7j"
  badge: string
}

export interface MaturityScore {
  score: number
  level: "AVANCEE" | "EN_DEVELOPPEMENT" | "FAIBLE"
  label: string
}

export interface LeadTags {
  role: string[]
  company: string[]
  opportunity: string[]
  priority: string[]
}

export interface LeadInsights {
  messages: string[]
  recommendations: string[]
  risks: string[]
}

export interface QualifiedLead {
  formData: EvaluationFormData
  leadScore: LeadScore
  maturityScore: MaturityScore
  tags: LeadTags
  insights: LeadInsights
  createdAt: string
}

// Barème de scoring (max 100 points)
const SCORING_RULES = {
  role: {
    "dirigeant_dg": 25,
    "directeur_ops": 20,
    "manager_operationnel": 12,
    "responsable_qualite": 10,
    "responsable_logistique": 8,
    "chef_equipe": 8,
    "autre": 5
  },
  companySize: {
    "plus_500": 20,
    "201_500": 15,
    "51_200": 10,
    "10_50": 5,
    "moins_10": 2
  },
  qualityManager: {
    "non": 25,        // Opportunité externalisation !
    "externalise": 15, // Upsell potentiel
    "oui_interne": 5
  },
  certificationsCount: {
    "4+": 20,
    "2-3": 10,
    "1": 5
  },
  siret: {
    provided: 10,
    missing: 0
  },
  // LP-V2-04: Nouveaux critères de scoring
  projectMaturity: {
    "urgent": 30,      // Hot lead! Audit prévu
    "validated": 20,   // Projet validé
    "renewal": 15,     // Déjà certifié
    "evaluation": 5,   // En réflexion
    "discovery": 0     // Découverte
  },
  accompanimentType: {
    "full": 25,        // Full accompagnement = deal potentiel élevé
    "hybrid": 15,      // Hybride = bon potentiel
    "platform_only": 5, // Plateforme seule
    "unknown": 8       // À explorer
  },
  budget: {
    "over_100k": 25,
    "50k_100k": 20,
    "30k_50k": 15,
    "10k_30k": 10,
    "under_10k": 5,
    "undefined": 0
  }
}

// Niveaux de qualification
const QUALIFICATION_LEVELS = {
  HOT: { min: 80, priority: "4h" as const, badge: "🔴 Prospect Prioritaire" },
  QUALIFIED: { min: 60, priority: "24h" as const, badge: "🟠 Prospect Qualifié" },
  NURTURE: { min: 40, priority: "48h" as const, badge: "🟡 Prospect à Nurturer" },
  EARLY_STAGE: { min: 0, priority: "7j" as const, badge: "⚪ Early Stage" }
}

/**
 * Calcule le score total du lead (0-100+)
 * Nouveaux critères V2 : maturité projet, accompagnement, budget
 */
export function calculateLeadScore(data: EvaluationFormData): LeadScore {
  const breakdown = {
    role: SCORING_RULES.role[data.user_function] || 5,
    companySize: SCORING_RULES.companySize[data.company_size] || 5,
    qualityManager: SCORING_RULES.qualityManager[data.has_quality_manager] || 5,
    certifications: getCertificationScore(data.certifications?.length || 0),
    siret: data.siret && data.siret.replace(/\s/g, "").length === 14 ? 10 : 0
  }

  // Base score
  let total = Object.values(breakdown).reduce((sum, val) => sum + val, 0)

  // LP-V2-04: Bonus scoring avec nouveaux champs (si remplis)
  if (data.project_maturity) {
    const maturityBonus = SCORING_RULES.projectMaturity[data.project_maturity] || 0
    total += maturityBonus
    
    // Super bonus si audit urgent + SIRET fourni
    if (data.project_maturity === "urgent" && data.siret && data.audit_date) {
      total += 15 // HOT LEAD GARANTIE
    }
  }

  if (data.accompaniment_type) {
    const accompBonus = SCORING_RULES.accompanimentType[data.accompaniment_type] || 0
    total += accompBonus
  }

  if (data.budget) {
    const budgetBonus = SCORING_RULES.budget[data.budget] || 0
    total += budgetBonus
  }

  // Normaliser sur 100 max (avec plafond flexible pour urgences)
  total = Math.min(total, 150) // Cap à 150 pour permettre distinction des super hot leads
  
  // Déterminer le niveau avec seuils ajustés pour V2
  let level: LeadScore["level"] = "EARLY_STAGE"
  let priority: LeadScore["priority"] = "7j"
  let badge = QUALIFICATION_LEVELS.EARLY_STAGE.badge

  // LP-V2-11: Seuils ajustés pour nouveaux critères
  if (total >= 100 || (data.project_maturity === "urgent" && data.siret)) {
    level = "HOT"
    priority = "4h"
    badge = "🔴 Prospect Prioritaire - Audit Urgent"
  } else if (total >= QUALIFICATION_LEVELS.HOT.min) {
    level = "HOT"
    priority = QUALIFICATION_LEVELS.HOT.priority
    badge = QUALIFICATION_LEVELS.HOT.badge
  } else if (total >= QUALIFICATION_LEVELS.QUALIFIED.min) {
    level = "QUALIFIED"
    priority = QUALIFICATION_LEVELS.QUALIFIED.priority
    badge = QUALIFICATION_LEVELS.QUALIFIED.badge
  } else if (total >= QUALIFICATION_LEVELS.NURTURE.min) {
    level = "NURTURE"
    priority = QUALIFICATION_LEVELS.NURTURE.priority
    badge = QUALIFICATION_LEVELS.NURTURE.badge
  }

  return { total, breakdown, level, priority, badge }
}

function getCertificationScore(count: number): number {
  if (count >= 4) return 20
  if (count >= 2) return 10
  return 5
}

/**
 * Calcule le score de maturité organisationnelle
 */
export function calculateMaturityScore(data: EvaluationFormData): MaturityScore {
  let score = 50 // Base

  // Facteurs positifs
  if (data.has_quality_manager === "oui_interne") score += 20
  if ((data.certifications?.length || 0) >= 3) score += 15
  if (["plus_500", "201_500", "51_200"].includes(data.company_size)) score += 10
  if (["dirigeant_dg", "directeur_ops"].includes(data.user_function)) score += 5

  // Facteurs négatifs
  if (data.has_quality_manager === "non") score -= 25
  if (data.company_size === "moins_10") score -= 15
  if ((data.certifications?.length || 0) === 1) score -= 10

  // Clamping 0-100
  score = Math.max(0, Math.min(100, score))

  // Déterminer le niveau
  let level: MaturityScore["level"]
  let label: string

  if (score >= 70) {
    level = "AVANCEE"
    label = "🟢 Maturité Avancée"
  } else if (score >= 40) {
    level = "EN_DEVELOPPEMENT"
    label = "🟡 En Développement"
  } else {
    level = "FAIBLE"
    label = "🔴 Maturité Faible"
  }

  return { score, level, label }
}

/**
 * Génère les tags CRM automatiques
 */
export function generateLeadTags(data: EvaluationFormData, leadScore: LeadScore): LeadTags {
  const tags: LeadTags = {
    role: [],
    company: [],
    opportunity: [],
    priority: []
  }

  // Tags de rôle
  if (["dirigeant_dg", "directeur_ops"].includes(data.user_function)) {
    tags.role.push("decision_maker")
  } else {
    tags.role.push("prescriber")
  }

  if (data.user_function === "manager_operationnel" || data.user_function === "chef_equipe") {
    tags.role.push("operational_manager")
  }

  // Tags entreprise
  if (data.company_size === "plus_500") tags.company.push("enterprise")
  else if (data.company_size === "201_500") tags.company.push("mid_market")
  else if (data.company_size === "51_200") tags.company.push("smb_large")
  else if (data.company_size === "10_50") tags.company.push("smb")
  else tags.company.push("tpe")

  if (data.siret && data.siret.replace(/\s/g, "").length === 14) {
    tags.company.push("verified_company")
  } else {
    tags.company.push("unverified")
  }

  // Tags opportunité
  if (data.has_quality_manager === "non") {
    tags.opportunity.push("no_quality_mgr", "opportunity_externalisation")
  }
  if (data.has_quality_manager === "externalise") {
    tags.opportunity.push("externalized_quality", "upsell_potential")
  }
  if ((data.certifications?.length || 0) >= 3) {
    tags.opportunity.push("multi_norm", "complex_needs")
  }

  // LP-V2-11: Tags pour nouveaux champs de qualification
  if (data.project_maturity) {
    tags.opportunity.push(`maturity_${data.project_maturity}`)
    if (data.project_maturity === "urgent") {
      tags.priority.push("audit_urgent", "high_priority")
    }
    if (data.project_maturity === "validated") {
      tags.opportunity.push("project_ready")
    }
  }

  if (data.accompaniment_type) {
    tags.opportunity.push(`accomp_${data.accompaniment_type}`)
    if (data.accompaniment_type === "full") {
      tags.opportunity.push("high_value_deal", "full_service")
    }
    if (data.accompaniment_type === "hybrid") {
      tags.opportunity.push("recommended_formula")
    }
  }

  if (data.budget) {
    tags.opportunity.push(`budget_${data.budget}`)
    if (["over_100k", "50k_100k"].includes(data.budget)) {
      tags.opportunity.push("high_budget")
    }
  }

  // Tags priorité
  tags.priority.push(`priority_${leadScore.priority}`)
  tags.priority.push(`score_${leadScore.level.toLowerCase()}`)

  return tags
}

/**
 * Génère les insights personnalisés
 */
export function generateLeadInsights(
  data: EvaluationFormData, 
  leadScore: LeadScore,
  maturityScore: MaturityScore
): LeadInsights {
  const insights: LeadInsights = {
    messages: [],
    recommendations: [],
    risks: []
  }

  // Messages contextuels
  if (data.has_quality_manager === "non") {
    if (["51_200", "201_500", "plus_500"].includes(data.company_size)) {
      insights.messages.push(
        "⚠️ Pas de responsable qualité dédié pour une entreprise de cette taille - risque élevé"
      )
      insights.risks.push("Non-conformité potentielle sans ressource dédiée")
      insights.recommendations.push("Évaluer l'option d'externalisation de la fonction qualité")
    }
  }

  if (data.has_quality_manager === "externalise" && ["201_500", "plus_500"].includes(data.company_size)) {
    insights.messages.push(
      "📊 Configuration atypique : responsable qualité externalisé pour une grande structure"
    )
    insights.recommendations.push("Audit de structure pour optimisation potentielle")
  }

  if ((data.certifications?.length || 0) >= 3 && ["dirigeant_dg", "directeur_ops"].includes(data.user_function)) {
    insights.messages.push(
      "🏆 Profil multi-conformité détecté - besoins complexes identifiés"
    )
    insights.recommendations.push("Accès prioritaire au module Pilotage Multi-Référentiels")
  }

  if (data.company_size === "moins_10" && (data.certifications?.length || 0) === 1) {
    insights.messages.push(
      "🚀 Démarrage conformité - parcours First Certification recommandé"
    )
    insights.recommendations.push("Accompagnement progressif adapté aux petites structures")
  }

  // Score insights
  if (leadScore.level === "HOT") {
    insights.messages.push(`Score élevé (${leadScore.total}/100) - Contact prioritaire requis`)
  }

  if (maturityScore.level === "FAIBLE") {
    insights.risks.push("Maturité organisationnelle faible - risque d'échec audit")
  }

  return insights
}

/**
 * Qualifie complètement un lead à partir des données du formulaire
 */
export function qualifyLead(data: EvaluationFormData): QualifiedLead {
  const leadScore = calculateLeadScore(data)
  const maturityScore = calculateMaturityScore(data)
  const tags = generateLeadTags(data, leadScore)
  const insights = generateLeadInsights(data, leadScore, maturityScore)

  return {
    formData: data,
    leadScore,
    maturityScore,
    tags,
    insights,
    createdAt: new Date().toISOString()
  }
}

/**
 * Génère le JSON pour envoi au CRM
 * LP-V2-11: Ajout des champs de qualification projet
 */
export function generateCRMPayload(qualifiedLead: QualifiedLead) {
  const { formData, leadScore, maturityScore, tags, insights } = qualifiedLead

  return {
    lead: {
      company_name: formData.company_name,
      siret: formData.siret || null,
      contact: {
        email: formData.email,
        phone: formData.phone || null,
        function: formData.user_function,
        other_function: formData.other_function || null
      },
      organization: {
        size: formData.company_size,
        has_quality_manager: formData.has_quality_manager,
        certifications: formData.certifications
      },
      // LP-V2-11: Qualification projet
      project: {
        maturity: formData.project_maturity || null,
        audit_date: formData.audit_date || null,
        accompaniment_type: formData.accompaniment_type || null,
        budget: formData.budget || null,
        is_urgent: formData.project_maturity === "urgent"
      },
      scoring: {
        lead_score: leadScore.total,
        lead_level: leadScore.level,
        lead_priority: leadScore.priority,
        maturity_score: maturityScore.score,
        maturity_level: maturityScore.level,
        breakdown: leadScore.breakdown,
        // Flags V2
        is_super_hot: leadScore.total >= 100,
        is_high_value: ["full", "hybrid"].includes(formData.accompaniment_type || "")
      },
      tags: [
        ...tags.role,
        ...tags.company,
        ...tags.opportunity,
        ...tags.priority
      ],
      insights: insights.messages,
      recommendations: insights.recommendations,
      risks: insights.risks,
      created_at: qualifiedLead.createdAt
    }
  }
}

