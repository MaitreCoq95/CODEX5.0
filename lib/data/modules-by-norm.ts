// Catalogue des modules d'évaluation par norme/certification

export interface Module {
  id: string
  title: string
  description: string
  icon: string
  isFree: boolean  // Module accessible gratuitement ou verrouillé
  duration: string // Durée estimée
  topics: string[] // Sujets couverts
}

export interface NormModules {
  normId: string
  normName: string
  icon: string
  modules: Module[]
  totalModules: number
  freeModules: number
}

// Modules par certification
export const modulesByNorm: Record<string, NormModules> = {
  GDP: {
    normId: "GDP",
    normName: "GDP - Bonnes Pratiques Distribution",
    icon: "💊",
    totalModules: 12,
    freeModules: 3,
    modules: [
      { id: "GDP-01", title: "Chaîne du Froid", description: "Gestion température et traçabilité", icon: "🌡️", isFree: true, duration: "15 min", topics: ["Monitoring", "Alertes", "Enregistrements"] },
      { id: "GDP-02", title: "Qualification Fournisseurs", description: "Audit et homologation", icon: "🤝", isFree: true, duration: "20 min", topics: ["Questionnaires", "Audits", "Contrats"] },
      { id: "GDP-03", title: "Transport & Livraison", description: "Conditions de transport sécurisées", icon: "🚚", isFree: true, duration: "15 min", topics: ["Validation", "Routage", "Documentation"] },
      { id: "GDP-04", title: "Gestion des Retours", description: "Circuit retours et quarantaine", icon: "↩️", isFree: false, duration: "20 min", topics: ["Procédures", "Traçabilité", "Destruction"] },
      { id: "GDP-05", title: "Personnel & Formation", description: "Habilitations et compétences", icon: "👥", isFree: false, duration: "25 min", topics: ["Formations", "Évaluations", "Attestations"] },
      { id: "GDP-06", title: "Locaux & Équipements", description: "Qualification des installations", icon: "🏭", isFree: false, duration: "30 min", topics: ["Cartographie", "Maintenance", "Calibration"] }
    ]
  },

  BPF: {
    normId: "BPF",
    normName: "BPF - Bonnes Pratiques Fabrication",
    icon: "🏭",
    totalModules: 15,
    freeModules: 3,
    modules: [
      { id: "BPF-01", title: "Qualification Locaux", description: "QI, QO, QP des installations", icon: "🏢", isFree: true, duration: "25 min", topics: ["Protocoles", "Rapports", "Requalification"] },
      { id: "BPF-02", title: "Gestion des Changements", description: "Change Control", icon: "🔄", isFree: true, duration: "20 min", topics: ["Évaluation", "Validation", "Suivi"] },
      { id: "BPF-03", title: "Validation des Procédés", description: "Validation process et nettoyage", icon: "✅", isFree: true, duration: "30 min", topics: ["Protocoles", "Critères", "Rapports"] },
      { id: "BPF-04", title: "Dossier de Lot", description: "Constitution et revue", icon: "📁", isFree: false, duration: "20 min", topics: ["Enregistrements", "Libération", "Archivage"] },
      { id: "BPF-05", title: "Réclamations & Rappels", description: "Gestion des incidents", icon: "⚠️", isFree: false, duration: "25 min", topics: ["Processus", "Communication", "CAPA"] }
    ]
  },

  ISO9001: {
    normId: "ISO9001",
    normName: "ISO 9001 - Management Qualité",
    icon: "📋",
    totalModules: 10,
    freeModules: 3,
    modules: [
      { id: "ISO9001-01", title: "Contexte & Leadership", description: "Analyse contexte et engagement direction", icon: "🎯", isFree: true, duration: "20 min", topics: ["SWOT", "Parties prenantes", "Politique"] },
      { id: "ISO9001-02", title: "Approche Processus", description: "Cartographie et pilotage", icon: "🗺️", isFree: true, duration: "25 min", topics: ["Identification", "Interactions", "Indicateurs"] },
      { id: "ISO9001-03", title: "Risques & Opportunités", description: "Analyse et traitement", icon: "⚠️", isFree: true, duration: "20 min", topics: ["Identification", "Évaluation", "Actions"] },
      { id: "ISO9001-04", title: "Audits Internes", description: "Programme et réalisation", icon: "🔍", isFree: false, duration: "30 min", topics: ["Planification", "Conduite", "Synthèse"] },
      { id: "ISO9001-05", title: "Amélioration Continue", description: "Non-conformités et CAPA", icon: "📈", isFree: false, duration: "25 min", topics: ["Analyse causes", "Actions", "Efficacité"] }
    ]
  },

  ISO14001: {
    normId: "ISO14001",
    normName: "ISO 14001 - Environnement",
    icon: "🌿",
    totalModules: 8,
    freeModules: 2,
    modules: [
      { id: "ISO14001-01", title: "Aspects Environnementaux", description: "Identification et cotation", icon: "🌍", isFree: true, duration: "25 min", topics: ["Inventaire", "Cotation", "Significatifs"] },
      { id: "ISO14001-02", title: "Conformité Réglementaire", description: "Veille et évaluation", icon: "📜", isFree: true, duration: "20 min", topics: ["Veille", "Registre", "Audits"] },
      { id: "ISO14001-03", title: "Objectifs & Programmes", description: "Planification environnementale", icon: "🎯", isFree: false, duration: "20 min", topics: ["Objectifs", "Indicateurs", "Suivi"] },
      { id: "ISO14001-04", title: "Situations d'Urgence", description: "Plans d'urgence environnementale", icon: "🚨", isFree: false, duration: "25 min", topics: ["Identification", "Procédures", "Exercices"] }
    ]
  },

  ISO45001: {
    normId: "ISO45001",
    normName: "ISO 45001 - Santé & Sécurité",
    icon: "🦺",
    totalModules: 10,
    freeModules: 3,
    modules: [
      { id: "ISO45001-01", title: "Évaluation des Risques", description: "DUER et analyse", icon: "⚠️", isFree: true, duration: "30 min", topics: ["Identification", "Évaluation", "Hiérarchisation"] },
      { id: "ISO45001-02", title: "Consultation Travailleurs", description: "Participation et communication", icon: "💬", isFree: true, duration: "20 min", topics: ["CSE", "Remontées", "Information"] },
      { id: "ISO45001-03", title: "Situations d'Urgence", description: "Plans et exercices", icon: "🚨", isFree: true, duration: "25 min", topics: ["Scénarios", "POI", "Exercices"] },
      { id: "ISO45001-04", title: "Surveillance Santé", description: "Suivi médical et AT/MP", icon: "🏥", isFree: false, duration: "20 min", topics: ["Visites", "Aptitudes", "Analyse AT"] }
    ]
  },

  ISO27001: {
    normId: "ISO27001",
    normName: "ISO 27001 - Sécurité Information",
    icon: "🔐",
    totalModules: 12,
    freeModules: 3,
    modules: [
      { id: "ISO27001-01", title: "Inventaire des Actifs", description: "Classification de l'information", icon: "📊", isFree: true, duration: "25 min", topics: ["Inventaire", "Classification", "Propriétaires"] },
      { id: "ISO27001-02", title: "Analyse des Risques", description: "Risques SI et traitement", icon: "⚠️", isFree: true, duration: "30 min", topics: ["Menaces", "Vulnérabilités", "Plan traitement"] },
      { id: "ISO27001-03", title: "Contrôle d'Accès", description: "Gestion des habilitations", icon: "🔑", isFree: true, duration: "20 min", topics: ["Droits", "Revue", "Traçabilité"] },
      { id: "ISO27001-04", title: "Gestion des Incidents", description: "Détection et réponse", icon: "🚨", isFree: false, duration: "25 min", topics: ["Détection", "Qualification", "Réponse"] }
    ]
  },

  ISO50001: {
    normId: "ISO50001",
    normName: "ISO 50001 - Gestion Énergie",
    icon: "⚡",
    totalModules: 8,
    freeModules: 2,
    modules: [
      { id: "ISO50001-01", title: "Revue Énergétique", description: "Analyse des consommations", icon: "📊", isFree: true, duration: "25 min", topics: ["Bilan", "Usages significatifs", "Baseline"] },
      { id: "ISO50001-02", title: "Indicateurs Performance", description: "IPÉ et mesure", icon: "📈", isFree: true, duration: "20 min", topics: ["Définition", "Suivi", "Analyse"] },
      { id: "ISO50001-03", title: "Objectifs & Cibles", description: "Plan d'action énergie", icon: "🎯", isFree: false, duration: "20 min", topics: ["Objectifs", "Actions", "ROI"] }
    ]
  },

  HACCP: {
    normId: "HACCP",
    normName: "HACCP / IFS / BRC",
    icon: "🍽️",
    totalModules: 12,
    freeModules: 3,
    modules: [
      { id: "HACCP-01", title: "Analyse des Dangers", description: "Identification et évaluation", icon: "🔬", isFree: true, duration: "30 min", topics: ["Biologiques", "Chimiques", "Physiques"] },
      { id: "HACCP-02", title: "Points Critiques (CCP)", description: "Détermination et maîtrise", icon: "⚠️", isFree: true, duration: "25 min", topics: ["Arbre décision", "Limites critiques", "Surveillance"] },
      { id: "HACCP-03", title: "Traçabilité", description: "Système de traçabilité", icon: "🔗", isFree: true, duration: "20 min", topics: ["Lots", "Exercices", "Rappels"] },
      { id: "HACCP-04", title: "Programmes Prérequis", description: "PRP et PRPO", icon: "📋", isFree: false, duration: "25 min", topics: ["Hygiène", "Nettoyage", "Nuisibles"] }
    ]
  },

  ADR: {
    normId: "ADR",
    normName: "ADR - Marchandises Dangereuses",
    icon: "☢️",
    totalModules: 8,
    freeModules: 2,
    modules: [
      { id: "ADR-01", title: "Classification MD", description: "Classes et étiquetage", icon: "🏷️", isFree: true, duration: "25 min", topics: ["9 Classes", "UN", "Étiquettes"] },
      { id: "ADR-02", title: "Documents Transport", description: "Documentation réglementaire", icon: "📄", isFree: true, duration: "20 min", topics: ["Déclaration", "Consignes", "Certificats"] },
      { id: "ADR-03", title: "Formation Conducteurs", description: "Certificat ADR", icon: "🎓", isFree: false, duration: "30 min", topics: ["Formation base", "Spécialisations", "Renouvellement"] }
    ]
  },

  EN9100: {
    normId: "EN9100",
    normName: "EN 9100 - Aéronautique",
    icon: "✈️",
    totalModules: 10,
    freeModules: 2,
    modules: [
      { id: "EN9100-01", title: "Gestion de Configuration", description: "Maîtrise des configurations", icon: "⚙️", isFree: true, duration: "25 min", topics: ["Identification", "Maîtrise", "Suivi"] },
      { id: "EN9100-02", title: "Gestion des Risques", description: "AMDEC et analyse", icon: "⚠️", isFree: true, duration: "30 min", topics: ["AMDEC", "Cotation", "Actions"] },
      { id: "EN9100-03", title: "FOD - Corps Étrangers", description: "Prévention FOD", icon: "🔍", isFree: false, duration: "20 min", topics: ["Identification", "Prévention", "Contrôle"] }
    ]
  },

  AS9120B: {
    normId: "AS9120B",
    normName: "AS 9120B - Distribution Aéro",
    icon: "📦",
    totalModules: 8,
    freeModules: 2,
    modules: [
      { id: "AS9120-01", title: "Contrôle d'Entrée", description: "Réception et vérification", icon: "📥", isFree: true, duration: "20 min", topics: ["Inspection", "Certificats", "Traçabilité"] },
      { id: "AS9120-02", title: "Stockage", description: "Conditions et durée de vie", icon: "🏪", isFree: true, duration: "20 min", topics: ["Conditions", "FIFO", "Péremption"] },
      { id: "AS9120-03", title: "Counterfeit Prevention", description: "Prévention contrefaçon", icon: "🛡️", isFree: false, duration: "25 min", topics: ["Sources", "Vérification", "Signalement"] }
    ]
  },

  SURETE: {
    normId: "SURETE",
    normName: "Sûreté Aérienne 11.2.X",
    icon: "🛡️",
    totalModules: 8,
    freeModules: 2,
    modules: [
      { id: "SUR-01", title: "Formation Initiale", description: "Sensibilisation 11.2.7", icon: "🎓", isFree: true, duration: "30 min", topics: ["Règlementation", "Menaces", "Procédures"] },
      { id: "SUR-02", title: "Contrôle d'Accès", description: "Zones réservées", icon: "🚫", isFree: true, duration: "20 min", topics: ["Badges", "Zones", "Contrôles"] },
      { id: "SUR-03", title: "Inspection Filtrage", description: "Techniques d'inspection", icon: "🔍", isFree: false, duration: "35 min", topics: ["Équipements", "Techniques", "Tests"] }
    ]
  }
}

/**
 * Récupère les modules pour les normes sélectionnées
 */
export function getModulesForNorms(selectedNorms: string[]): NormModules[] {
  return selectedNorms
    .map(norm => modulesByNorm[norm])
    .filter(Boolean)
}

/**
 * Compte le total des modules disponibles
 */
export function getTotalModulesCount(selectedNorms: string[]): { total: number; free: number; locked: number } {
  const modules = getModulesForNorms(selectedNorms)
  const total = modules.reduce((sum, n) => sum + n.totalModules, 0)
  const free = modules.reduce((sum, n) => sum + n.freeModules, 0)
  return { total, free, locked: total - free }
}
