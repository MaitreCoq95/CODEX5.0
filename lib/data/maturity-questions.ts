// Questions de maturité par norme pour évaluation approfondie
// Chaque norme a ses propres questions spécifiques

export interface MaturityQuestion {
  id: string
  text: string
  category: string
  options: {
    value: number
    label: string
    tag?: string
  }[]
}

export interface NormMaturityQuestions {
  normId: string
  normName: string
  questions: MaturityQuestion[]
}

// Questions générales (posées à tous)
export const generalMaturityQuestions: MaturityQuestion[] = [
  {
    id: "G1",
    text: "Avez-vous déjà passé un audit de certification ?",
    category: "Expérience audit",
    options: [
      { value: 10, label: "Oui, avec succès", tag: "audit_success" },
      { value: 5, label: "Oui, avec des réserves", tag: "audit_reserves" },
      { value: 2, label: "En préparation", tag: "audit_prep" },
      { value: 0, label: "Non, jamais", tag: "first_audit" }
    ]
  },
  {
    id: "G2",
    text: "Vos procédures sont-elles documentées ?",
    category: "Documentation",
    options: [
      { value: 10, label: "Totalement documentées et à jour", tag: "docs_complete" },
      { value: 6, label: "Partiellement documentées", tag: "docs_partial" },
      { value: 2, label: "Peu documentées", tag: "docs_minimal" },
      { value: 0, label: "Non documentées", tag: "docs_none" }
    ]
  },
  {
    id: "G3",
    text: "À quand remonte votre dernier audit interne ?",
    category: "Audits internes",
    options: [
      { value: 10, label: "Moins de 6 mois", tag: "audit_recent" },
      { value: 6, label: "6 à 12 mois", tag: "audit_1y" },
      { value: 2, label: "Plus de 12 mois", tag: "audit_old" },
      { value: 0, label: "Jamais réalisé", tag: "no_internal_audit" }
    ]
  },
  {
    id: "G4",
    text: "Vos équipes sont-elles formées aux exigences réglementaires ?",
    category: "Formation",
    options: [
      { value: 10, label: "Formation continue et certifiée", tag: "training_certified" },
      { value: 6, label: "Formation initiale uniquement", tag: "training_initial" },
      { value: 2, label: "Formation informelle", tag: "training_informal" },
      { value: 0, label: "Pas de formation spécifique", tag: "no_training" }
    ]
  }
]

// Questions spécifiques par norme
export const normSpecificQuestions: Record<string, MaturityQuestion[]> = {
  GDP: [
    {
      id: "GDP1",
      text: "Comment gérez-vous la chaîne du froid ?",
      category: "Chaîne du froid",
      options: [
        { value: 10, label: "Monitoring IoT temps réel + alertes", tag: "cold_chain_iot" },
        { value: 6, label: "Enregistreurs avec relevé quotidien", tag: "cold_chain_manual" },
        { value: 2, label: "Contrôles ponctuels", tag: "cold_chain_spot" },
        { value: 0, label: "Pas de suivi formalisé", tag: "cold_chain_none" }
      ]
    },
    {
      id: "GDP2",
      text: "Avez-vous un processus de qualification des fournisseurs ?",
      category: "Fournisseurs",
      options: [
        { value: 10, label: "Oui, avec audits réguliers", tag: "supplier_audited" },
        { value: 6, label: "Oui, questionnaire initial", tag: "supplier_questionnaire" },
        { value: 2, label: "Évaluation informelle", tag: "supplier_informal" },
        { value: 0, label: "Non", tag: "supplier_none" }
      ]
    },
    {
      id: "GDP3",
      text: "Comment gérez-vous les non-conformités ?",
      category: "Non-conformités",
      options: [
        { value: 10, label: "Système CAPA formalisé", tag: "capa_full" },
        { value: 6, label: "Enregistrement et suivi", tag: "capa_partial" },
        { value: 2, label: "Traitement au cas par cas", tag: "capa_informal" },
        { value: 0, label: "Pas de processus défini", tag: "capa_none" }
      ]
    }
  ],

  BPF: [
    {
      id: "BPF1",
      text: "Vos locaux sont-ils qualifiés ?",
      category: "Locaux",
      options: [
        { value: 10, label: "Qualifiés et requalifiés périodiquement", tag: "premises_qualified" },
        { value: 6, label: "Qualifiés à l'installation", tag: "premises_initial" },
        { value: 2, label: "Conformes mais non qualifiés", tag: "premises_compliant" },
        { value: 0, label: "Non qualifiés", tag: "premises_none" }
      ]
    },
    {
      id: "BPF2",
      text: "Avez-vous un système de gestion des changements ?",
      category: "Change Control",
      options: [
        { value: 10, label: "Processus formalisé et documenté", tag: "change_control_full" },
        { value: 6, label: "Processus en place mais informel", tag: "change_control_partial" },
        { value: 2, label: "Suivi minimal", tag: "change_control_minimal" },
        { value: 0, label: "Pas de suivi", tag: "change_control_none" }
      ]
    }
  ],

  ISO9001: [
    {
      id: "ISO9001_1",
      text: "Avez-vous défini le contexte de votre organisme ?",
      category: "Contexte",
      options: [
        { value: 10, label: "Analyse SWOT + parties prenantes documentées", tag: "context_complete" },
        { value: 6, label: "Partiellement défini", tag: "context_partial" },
        { value: 2, label: "En cours de définition", tag: "context_wip" },
        { value: 0, label: "Non défini", tag: "context_none" }
      ]
    },
    {
      id: "ISO9001_2",
      text: "Vos processus sont-ils cartographiés ?",
      category: "Processus",
      options: [
        { value: 10, label: "Cartographie complète + indicateurs", tag: "process_mapped_kpi" },
        { value: 6, label: "Cartographie des processus clés", tag: "process_mapped" },
        { value: 2, label: "Liste des processus", tag: "process_list" },
        { value: 0, label: "Non cartographiés", tag: "process_none" }
      ]
    },
    {
      id: "ISO9001_3",
      text: "Réalisez-vous des revues de direction ?",
      category: "Revue de direction",
      options: [
        { value: 10, label: "Annuelles avec plan d'action suivi", tag: "mgmt_review_full" },
        { value: 6, label: "Ponctuelles", tag: "mgmt_review_occasional" },
        { value: 2, label: "Réunions informelles", tag: "mgmt_review_informal" },
        { value: 0, label: "Non réalisées", tag: "mgmt_review_none" }
      ]
    }
  ],

  ISO14001: [
    {
      id: "ISO14001_1",
      text: "Avez-vous identifié vos aspects environnementaux ?",
      category: "Aspects environnementaux",
      options: [
        { value: 10, label: "Analyse complète + cotation des risques", tag: "env_aspects_full" },
        { value: 6, label: "Identification des principaux aspects", tag: "env_aspects_main" },
        { value: 2, label: "Liste informelle", tag: "env_aspects_informal" },
        { value: 0, label: "Non identifiés", tag: "env_aspects_none" }
      ]
    }
  ],

  ISO45001: [
    {
      id: "ISO45001_1",
      text: "Avez-vous un Document Unique d'Évaluation des Risques (DUER) ?",
      category: "Évaluation des risques",
      options: [
        { value: 10, label: "DUER à jour + plan d'action suivi", tag: "duer_complete" },
        { value: 6, label: "DUER existant mais non à jour", tag: "duer_outdated" },
        { value: 2, label: "En cours d'élaboration", tag: "duer_wip" },
        { value: 0, label: "Non réalisé", tag: "duer_none" }
      ]
    },
    {
      id: "ISO45001_2",
      text: "Comment gérez-vous les situations d'urgence ?",
      category: "Urgences",
      options: [
        { value: 10, label: "Plans d'urgence + exercices réguliers", tag: "emergency_full" },
        { value: 6, label: "Plans définis mais peu testés", tag: "emergency_defined" },
        { value: 2, label: "Consignes basiques", tag: "emergency_basic" },
        { value: 0, label: "Pas de plan formalisé", tag: "emergency_none" }
      ]
    }
  ],

  ISO27001: [
    {
      id: "ISO27001_1",
      text: "Avez-vous identifié vos actifs informationnels ?",
      category: "Actifs",
      options: [
        { value: 10, label: "Inventaire complet + classification", tag: "assets_classified" },
        { value: 6, label: "Inventaire partiel", tag: "assets_partial" },
        { value: 2, label: "Liste informelle", tag: "assets_informal" },
        { value: 0, label: "Non inventoriés", tag: "assets_none" }
      ]
    },
    {
      id: "ISO27001_2",
      text: "Avez-vous une politique de sécurité de l'information ?",
      category: "Politique",
      options: [
        { value: 10, label: "Politique complète + sensibilisation", tag: "security_policy_full" },
        { value: 6, label: "Politique définie", tag: "security_policy_defined" },
        { value: 2, label: "Règles informelles", tag: "security_policy_informal" },
        { value: 0, label: "Pas de politique", tag: "security_policy_none" }
      ]
    }
  ],

  HACCP: [
    {
      id: "HACCP1",
      text: "Avez-vous identifié vos CCP (Points Critiques de Contrôle) ?",
      category: "CCP",
      options: [
        { value: 10, label: "CCP identifiés et surveillés", tag: "ccp_monitored" },
        { value: 6, label: "CCP identifiés", tag: "ccp_identified" },
        { value: 2, label: "Analyse en cours", tag: "ccp_wip" },
        { value: 0, label: "Non identifiés", tag: "ccp_none" }
      ]
    },
    {
      id: "HACCP2",
      text: "Effectuez-vous des analyses microbiologiques ?",
      category: "Analyses",
      options: [
        { value: 10, label: "Plan d'analyse complet + suivi", tag: "micro_full" },
        { value: 6, label: "Analyses ponctuelles", tag: "micro_occasional" },
        { value: 2, label: "Rarement", tag: "micro_rare" },
        { value: 0, label: "Jamais", tag: "micro_none" }
      ]
    }
  ],

  ADR: [
    {
      id: "ADR1",
      text: "Vos conducteurs ont-ils le certificat ADR ?",
      category: "Formation conducteurs",
      options: [
        { value: 10, label: "Tous formés et certifiés", tag: "adr_cert_all" },
        { value: 6, label: "Majorité formée", tag: "adr_cert_most" },
        { value: 2, label: "Quelques-uns formés", tag: "adr_cert_few" },
        { value: 0, label: "Aucun certificat", tag: "adr_cert_none" }
      ]
    },
    {
      id: "ADR2",
      text: "Vos véhicules sont-ils équipés selon l'ADR ?",
      category: "Équipements",
      options: [
        { value: 10, label: "Équipement complet + contrôles réguliers", tag: "adr_equip_full" },
        { value: 6, label: "Équipement de base", tag: "adr_equip_basic" },
        { value: 2, label: "Équipement partiel", tag: "adr_equip_partial" },
        { value: 0, label: "Non équipés", tag: "adr_equip_none" }
      ]
    }
  ],

  EN9100: [
    {
      id: "EN9100_1",
      text: "Gérez-vous les risques projet (AMDEC, arbre des causes...) ?",
      category: "Gestion des risques",
      options: [
        { value: 10, label: "AMDEC systématique + suivi", tag: "risk_fmea_full" },
        { value: 6, label: "Analyse ponctuelle", tag: "risk_fmea_occasional" },
        { value: 2, label: "Informelle", tag: "risk_informal" },
        { value: 0, label: "Non réalisée", tag: "risk_none" }
      ]
    }
  ],

  SURETE: [
    {
      id: "SUR1",
      text: "Vos agents de sûreté sont-ils certifiés 11.2.X ?",
      category: "Certification agents",
      options: [
        { value: 10, label: "Tous certifiés + renouvellements suivis", tag: "security_cert_all" },
        { value: 6, label: "Majorité certifiée", tag: "security_cert_most" },
        { value: 2, label: "En cours de certification", tag: "security_cert_wip" },
        { value: 0, label: "Non certifiés", tag: "security_cert_none" }
      ]
    }
  ]
}

/**
 * Récupère les questions de maturité pour les normes sélectionnées
 * Retourne minimum 7 questions (4 générales + au moins 3 spécifiques)
 */
export function getMaturityQuestionsForNorms(selectedNorms: string[]): MaturityQuestion[] {
  const questions: MaturityQuestion[] = [...generalMaturityQuestions]
  
  // Ajouter les questions spécifiques pour chaque norme sélectionnée
  selectedNorms.forEach(norm => {
    const normQuestions = normSpecificQuestions[norm]
    if (normQuestions) {
      questions.push(...normQuestions)
    }
  })

  return questions
}

/**
 * Calcule le score de maturité basé sur les réponses aux questions
 */
export function calculateMaturityFromAnswers(answers: Record<string, number>): {
  score: number
  maxScore: number
  percentage: number
  level: "AVANCEE" | "EN_DEVELOPPEMENT" | "FAIBLE"
  label: string
} {
  const values = Object.values(answers)
  const totalScore = values.reduce((sum, val) => sum + val, 0)
  const maxPossible = values.length * 10 // Chaque question a un max de 10 points
  const percentage = Math.round((totalScore / maxPossible) * 100)

  let level: "AVANCEE" | "EN_DEVELOPPEMENT" | "FAIBLE"
  let label: string

  if (percentage >= 70) {
    level = "AVANCEE"
    label = "🟢 Maturité Avancée"
  } else if (percentage >= 40) {
    level = "EN_DEVELOPPEMENT"
    label = "🟡 En Développement"
  } else {
    level = "FAIBLE"
    label = "🔴 Maturité Faible"
  }

  return {
    score: totalScore,
    maxScore: maxPossible,
    percentage,
    level,
    label
  }
}
