// Messages personnalisés selon le profil et les réponses
import { EvaluationFormData } from "@/lib/schemas/evaluation-form.schema"

export interface PersonalizedMessage {
  type: "warning" | "insight" | "opportunity" | "recommendation" | "success"
  icon: string
  title: string
  message: string
  priority: number // 1 = haute, 3 = basse
}

interface ProfileContext {
  isDecisionMaker: boolean
  isOperational: boolean
  hasQualityManager: boolean
  isExternalized: boolean
  companySize: "tpe" | "pme" | "eti" | "ge"
  certificationCount: number
  hasSiret: boolean
  norms: string[]
}

/**
 * Analyse le profil à partir des données du formulaire
 */
function analyzeProfile(data: EvaluationFormData): ProfileContext {
  const isDecisionMaker = ["dirigeant_dg", "directeur_ops"].includes(data.user_function)
  const isOperational = ["manager_operationnel", "chef_equipe", "responsable_logistique"].includes(data.user_function)
  const hasQualityManager = data.has_quality_manager === "oui_interne"
  const isExternalized = data.has_quality_manager === "externalise"
  
  let companySize: ProfileContext["companySize"] = "tpe"
  if (data.company_size === "plus_500") companySize = "ge"
  else if (data.company_size === "201_500") companySize = "eti"
  else if (["51_200", "10_50"].includes(data.company_size)) companySize = "pme"
  
  return {
    isDecisionMaker,
    isOperational,
    hasQualityManager,
    isExternalized,
    companySize,
    certificationCount: data.certifications?.length || 0,
    hasSiret: !!(data.siret && data.siret.replace(/\s/g, "").length === 14),
    norms: data.certifications || []
  }
}

/**
 * Génère les messages personnalisés selon le profil
 */
export function generatePersonalizedMessages(data: EvaluationFormData): PersonalizedMessage[] {
  const profile = analyzeProfile(data)
  const messages: PersonalizedMessage[] = []

  // ---------- ALERTES CRITIQUES ----------

  // Pas de responsable qualité pour une grande structure
  if (!profile.hasQualityManager && ["eti", "ge"].includes(profile.companySize)) {
    messages.push({
      type: "warning",
      icon: "⚠️",
      title: "Risque conformité identifié",
      message: `Une entreprise de votre taille (${profile.companySize === "ge" ? "+500" : "200-500"} salariés) sans responsable qualité dédié représente un risque élevé en cas d'audit.`,
      priority: 1
    })
  }

  // Multi-certifications sans ressource dédiée
  if (profile.certificationCount >= 3 && !profile.hasQualityManager) {
    messages.push({
      type: "warning",
      icon: "🎯",
      title: "Charge de travail sous-estimée",
      message: `Gérer ${profile.certificationCount} certifications sans responsable qualité dédié est risqué. Chaque norme nécessite un suivi régulier.`,
      priority: 1
    })
  }

  // ---------- OPPORTUNITÉS ----------

  // Décideur sans SIRET
  if (profile.isDecisionMaker && !profile.hasSiret) {
    messages.push({
      type: "opportunity",
      icon: "🔓",
      title: "Débloquez l'accès complet",
      message: "En tant que décideur, ajoutez votre SIRET pour accéder immédiatement à tous les modules et à votre benchmark sectoriel.",
      priority: 1
    })
  }

  // Externalisation existante = upsell
  if (profile.isExternalized) {
    messages.push({
      type: "opportunity",
      icon: "💡",
      title: "Optimisation possible",
      message: "Vous externalisez déjà votre qualité. Vyxo Codex peut compléter ou remplacer cette prestation avec un meilleur rapport coût/valeur.",
      priority: 2
    })
  }

  // ---------- INSIGHTS PAR NORME ----------

  // GDP spécifique
  if (profile.norms.includes("GDP")) {
    messages.push({
      type: "insight",
      icon: "💊",
      title: "Focus GDP détecté",
      message: "La distribution pharmaceutique nécessite une traçabilité sans faille. Nos modules GDP couvrent la chaîne du froid, les fournisseurs et les non-conformités.",
      priority: 2
    })
  }

  // Multi-ISO
  if (profile.norms.filter(n => n.startsWith("ISO")).length >= 2) {
    messages.push({
      type: "insight",
      icon: "📊",
      title: "Système intégré recommandé",
      message: "Plusieurs normes ISO sélectionnées. Un système de management intégré (SMI) réduirait votre charge documentaire de 40%.",
      priority: 2
    })
  }

  // Aéronautique
  if (profile.norms.includes("EN9100") || profile.norms.includes("AS9120B")) {
    messages.push({
      type: "insight",
      icon: "✈️",
      title: "Exigences aéronautiques",
      message: "Le secteur aéronautique impose des audits plus stricts. Nos modules incluent l'AMDEC, la gestion de configuration et la prévention FOD.",
      priority: 2
    })
  }

  // Sécurité info
  if (profile.norms.includes("ISO27001")) {
    messages.push({
      type: "insight",
      icon: "🔐",
      title: "Cybersécurité",
      message: "L'ISO 27001 nécessite une analyse de risques SI et un SMSI documenté. Notre plateforme inclut les 114 contrôles Annexe A.",
      priority: 2
    })
  }

  // ADR
  if (profile.norms.includes("ADR")) {
    messages.push({
      type: "insight",
      icon: "☢️",
      title: "Transport MD",
      message: "L'ADR impose des formations spécifiques pour tous les conducteurs. Nous traçons les certificats et les dates de renouvellement.",
      priority: 2
    })
  }

  // ---------- RECOMMANDATIONS ----------

  // TPE avec certification
  if (profile.companySize === "tpe" && profile.certificationCount >= 1) {
    messages.push({
      type: "recommendation",
      icon: "🚀",
      title: "Parcours First Certification",
      message: "Pour les petites structures, nous recommandons notre parcours progressif adapté à vos ressources limitées.",
      priority: 3
    })
  }

  // Manager opérationnel
  if (profile.isOperational) {
    messages.push({
      type: "recommendation",
      icon: "📋",
      title: "Partagez avec votre direction",
      message: "En tant que manager opérationnel, vous pouvez générer un lien de partage pour présenter ce diagnostic à votre direction.",
      priority: 2
    })
  }

  // ---------- SUCCÈS ----------

  // SIRET validé
  if (profile.hasSiret) {
    messages.push({
      type: "success",
      icon: "✅",
      title: "Entreprise identifiée",
      message: "Votre SIRET est validé. Vous bénéficiez d'un accès prioritaire et d'un rapport personnalisé.",
      priority: 3
    })
  }

  // Profil complet
  if (profile.hasSiret && profile.certificationCount >= 2 && profile.isDecisionMaker) {
    messages.push({
      type: "success",
      icon: "🏆",
      title: "Profil complet",
      message: "Votre profil est complet. Vous êtes éligible à un appel découverte gratuit de 30 minutes avec un expert.",
      priority: 1
    })
  }

  // Trier par priorité
  return messages.sort((a, b) => a.priority - b.priority)
}

/**
 * Récupère les messages les plus importants (max 3)
 */
export function getTopMessages(data: EvaluationFormData, max: number = 3): PersonalizedMessage[] {
  return generatePersonalizedMessages(data).slice(0, max)
}
