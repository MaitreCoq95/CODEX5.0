// Phase 3 - Additional Certification Question Banks
// CEIV Pharma, ISO 42001, Excellence Ops, Sûreté

import { NormCategory, MaturityLevel } from "./multi-norms-service"

// Shared maturity levels
export const MATURITY_LEVELS: MaturityLevel[] = [
  { level: 1, name: "Initial", minScore: 0, maxScore: 20, description: "Processus ad hoc", certificationReadiness: "Non prêt", color: "#EF4444" },
  { level: 2, name: "Émergent", minScore: 21, maxScore: 40, description: "Début de formalisation", certificationReadiness: "6-12 mois", color: "#F97316" },
  { level: 3, name: "Défini", minScore: 41, maxScore: 60, description: "Processus documentés", certificationReadiness: "3-6 mois", color: "#EAB308" },
  { level: 4, name: "Maîtrisé", minScore: 61, maxScore: 80, description: "Processus mesurés", certificationReadiness: "1-3 mois", color: "#22C55E" },
  { level: 5, name: "Optimisé", minScore: 81, maxScore: 100, description: "Amélioration continue", certificationReadiness: "Prêt", color: "#10B981" },
]

// ═══════════════════════════════════════════════════════════════════════════════
// 💊 CEIV PHARMA - IATA Cold Chain
// ═══════════════════════════════════════════════════════════════════════════════

export const CEIV_PHARMA_CATEGORIES: NormCategory[] = [
  {
    id: "ceiv-governance",
    name: "Gouvernance & Organisation",
    clause: "Chapter 1",
    weight: 20,
    questions: [
      {
        id: "ceiv-q1",
        text: "Avez-vous un responsable dédié à la qualité pharma?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partiellement dédié", score: 50, gapLevel: "major" },
          { label: "Oui, avec suppléances", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "ceiv-q2",
        text: "Disposez-vous d'un programme de sûreté pour les produits pharmaceutiques?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Basique", score: 40, gapLevel: "major" },
          { label: "Complet et audité", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "ceiv-infrastructure",
    name: "Infrastructure & Équipements",
    clause: "Chapter 2",
    weight: 25,
    questions: [
      {
        id: "ceiv-q3",
        text: "Vos zones de stockage sont-elles qualifiées pour les produits thermosensibles?",
        type: "single_choice",
        options: [
          { label: "Non qualifiées", score: 0, gapLevel: "critical" },
          { label: "Qualification initiale", score: 40, gapLevel: "major" },
          { label: "Qualification avec requalification", score: 70, gapLevel: "minor" },
          { label: "Qualification complète avec cartographie", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "ceiv-q4",
        text: "Disposez-vous de chambres froides dédiées pharma?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partagées avec autres produits", score: 30, gapLevel: "major" },
          { label: "Dédiées sans backup", score: 70, gapLevel: "minor" },
          { label: "Dédiées avec backup et alarmes", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "ceiv-temperature",
    name: "Gestion Température",
    clause: "Chapter 3",
    weight: 30,
    questions: [
      {
        id: "ceiv-q5",
        text: "Comment surveillez-vous la température en entrepôt?",
        type: "single_choice",
        options: [
          { label: "Pas de surveillance", score: 0, gapLevel: "critical" },
          { label: "Relevés manuels", score: 25, gapLevel: "major" },
          { label: "Monitoring automatique", score: 70, gapLevel: "minor" },
          { label: "Monitoring temps réel avec alertes 24/7", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "ceiv-q6",
        text: "Gérez-vous les excursions de température selon un processus documenté?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Au cas par cas", score: 40, gapLevel: "major" },
          { label: "Procédure documentée", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "ceiv-packaging",
    name: "Emballages & Conteneurs",
    clause: "Chapter 4",
    weight: 15,
    questions: [
      {
        id: "ceiv-q7",
        text: "Utilisez-vous des conteneurs passifs qualifiés?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Sans qualification formelle", score: 35, gapLevel: "major" },
          { label: "Qualifiés avec profil validé", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "ceiv-training",
    name: "Formation Personnel",
    clause: "Chapter 5",
    weight: 10,
    questions: [
      {
        id: "ceiv-q8",
        text: "Le personnel reçoit-il une formation spécifique pharma cold chain?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Formation initiale", score: 50, gapLevel: "major" },
          { label: "Formation initiale + recyclage", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// 🔒 ISO 42001 - IA MANAGEMENT SYSTEM
// ═══════════════════════════════════════════════════════════════════════════════

export const ISO42001_CATEGORIES: NormCategory[] = [
  {
    id: "iso42-governance",
    name: "Gouvernance IA",
    clause: "4-5",
    weight: 20,
    questions: [
      {
        id: "iso42-q1",
        text: "Avez-vous défini une politique d'utilisation de l'IA au sein de votre organisation?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Informelle", score: 35, gapLevel: "major" },
          { label: "Documentée", score: 70, gapLevel: "minor" },
          { label: "Documentée et communiquée", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "iso42-q2",
        text: "Disposez-vous d'un comité ou d'un responsable IA?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "major" },
          { label: "Rôle partagé", score: 50, gapLevel: "minor" },
          { label: "Rôle dédié avec gouvernance", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "iso42-risk",
    name: "Gestion des Risques IA",
    clause: "6",
    weight: 25,
    questions: [
      {
        id: "iso42-q3",
        text: "Réalisez-vous une analyse des risques spécifiques aux systèmes IA?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Occasionnellement", score: 40, gapLevel: "major" },
          { label: "Systématiquement", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "iso42-q4",
        text: "Avez-vous identifié les impacts potentiels de vos systèmes IA sur les parties prenantes?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partiellement", score: 50, gapLevel: "major" },
          { label: "Oui, documenté", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "iso42-data",
    name: "Données & Qualité",
    clause: "7",
    weight: 20,
    questions: [
      {
        id: "iso42-q5",
        text: "Comment gérez-vous la qualité des données d'entraînement?",
        type: "single_choice",
        options: [
          { label: "Pas de gestion", score: 0, gapLevel: "critical" },
          { label: "Contrôles basiques", score: 40, gapLevel: "major" },
          { label: "Processus de validation documenté", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "iso42-transparency",
    name: "Transparence & Explicabilité",
    clause: "8",
    weight: 20,
    questions: [
      {
        id: "iso42-q6",
        text: "Vos décisions IA sont-elles explicables aux utilisateurs?",
        type: "single_choice",
        options: [
          { label: "Non (boîte noire)", score: 0, gapLevel: "major" },
          { label: "Partiellement", score: 50, gapLevel: "minor" },
          { label: "Oui, avec documentation", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "iso42-ethics",
    name: "Éthique & Biais",
    clause: "9",
    weight: 15,
    questions: [
      {
        id: "iso42-q7",
        text: "Testez-vous vos modèles pour détecter les biais?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "major" },
          { label: "Occasionnellement", score: 50, gapLevel: "minor" },
          { label: "Systématiquement avant déploiement", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// ⚙️ YELLOW BELT - LEAN SIX SIGMA
// ═══════════════════════════════════════════════════════════════════════════════

export const YELLOW_BELT_CATEGORIES: NormCategory[] = [
  {
    id: "yb-define",
    name: "Define - Définir le problème",
    clause: "DMAIC",
    weight: 20,
    questions: [
      {
        id: "yb-q1",
        text: "Savez-vous formuler un problème avec la méthode QQOQCP?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Théoriquement", score: 50, gapLevel: "major" },
          { label: "Oui, pratique régulière", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "yb-q2",
        text: "Utilisez-vous des chartes projet pour définir le périmètre?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "major" },
          { label: "Parfois", score: 50, gapLevel: "minor" },
          { label: "Systématiquement", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "yb-measure",
    name: "Measure - Mesurer",
    clause: "DMAIC",
    weight: 20,
    questions: [
      {
        id: "yb-q3",
        text: "Collectez-vous des données pour objectiver les problèmes?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Occasionnellement", score: 40, gapLevel: "major" },
          { label: "Systématiquement", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "yb-analyze",
    name: "Analyze - Analyser",
    clause: "DMAIC",
    weight: 20,
    questions: [
      {
        id: "yb-q4",
        text: "Utilisez-vous des outils d'analyse des causes (Ishikawa, 5 Pourquoi)?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "major" },
          { label: "Connaissance théorique", score: 40, gapLevel: "minor" },
          { label: "Utilisation régulière", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "yb-improve",
    name: "Improve - Améliorer",
    clause: "DMAIC",
    weight: 20,
    questions: [
      {
        id: "yb-q5",
        text: "Savez-vous prioriser les solutions avec une matrice effort/impact?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "major" },
          { label: "Théoriquement", score: 50, gapLevel: "minor" },
          { label: "Pratique maîtrisée", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "yb-control",
    name: "Control - Contrôler",
    clause: "DMAIC",
    weight: 20,
    questions: [
      {
        id: "yb-q6",
        text: "Mettez-vous en place des indicateurs pour pérenniser les améliorations?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "major" },
          { label: "Parfois", score: 50, gapLevel: "minor" },
          { label: "Systématiquement", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// ⚙️ GREEN BELT - LEAN SIX SIGMA (niveau avancé)
// ═══════════════════════════════════════════════════════════════════════════════

export const GREEN_BELT_CATEGORIES: NormCategory[] = [
  {
    id: "gb-stats",
    name: "Statistiques & Analyse de données",
    weight: 25,
    questions: [
      {
        id: "gb-q1",
        text: "Maîtrisez-vous les outils statistiques (écart-type, Cp/Cpk)?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Notions de base", score: 40, gapLevel: "major" },
          { label: "Maîtrise opérationnelle", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "gb-project",
    name: "Gestion de projet amélioration",
    weight: 25,
    questions: [
      {
        id: "gb-q2",
        text: "Avez-vous mené des projets d'amélioration avec résultats mesurables?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "1-2 projets", score: 50, gapLevel: "major" },
          { label: "3+ projets documentés", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "gb-tools",
    name: "Outils avancés",
    weight: 25,
    questions: [
      {
        id: "gb-q3",
        text: "Utilisez-vous des outils comme AMDEC, VSM, ou DOE?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "major" },
          { label: "Connaissance théorique", score: 40, gapLevel: "minor" },
          { label: "Application pratique", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "gb-leadership",
    name: "Leadership & Animation",
    weight: 25,
    questions: [
      {
        id: "gb-q4",
        text: "Savez-vous animer des chantiers Kaizen ou ateliers de résolution?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "major" },
          { label: "Participant", score: 40, gapLevel: "minor" },
          { label: "Animateur expérimenté", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// ✈️ SÛRETÉ 11.2.1 - SENSIBILISATION GÉNÉRALE
// ═══════════════════════════════════════════════════════════════════════════════

export const SURETE_11_2_1_CATEGORIES: NormCategory[] = [
  {
    id: "s1-threats",
    name: "Menaces et risques",
    weight: 30,
    questions: [
      {
        id: "s1-q1",
        text: "Connaissez-vous les principales menaces à l'aviation civile?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Notions générales", score: 50, gapLevel: "major" },
          { label: "Connaissance détaillée", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "s1-regulation",
    name: "Réglementation applicable",
    weight: 25,
    questions: [
      {
        id: "s1-q2",
        text: "Connaissez-vous les textes réglementaires UE applicables au fret?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Notions", score: 40, gapLevel: "major" },
          { label: "Bonne connaissance", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "s1-reporting",
    name: "Procédures de signalement",
    weight: 25,
    questions: [
      {
        id: "s1-q3",
        text: "Savez-vous comment signaler un comportement ou objet suspect?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Vaguement", score: 40, gapLevel: "major" },
          { label: "Procédure connue", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "s1-reaction",
    name: "Réaction face à un incident",
    weight: 20,
    questions: [
      {
        id: "s1-q4",
        text: "Connaissez-vous les gestes à adopter en cas de découverte d'un colis suspect?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partiellement", score: 50, gapLevel: "major" },
          { label: "Oui, entraîné", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// ✈️ SÛRETÉ 11.2.3.9 - ACCEPTATION FRET
// ═══════════════════════════════════════════════════════════════════════════════

export const SURETE_11_2_3_9_CATEGORIES: NormCategory[] = [
  {
    id: "s9-accept",
    name: "Principes d'acceptation",
    weight: 35,
    questions: [
      {
        id: "s9-q1",
        text: "Savez-vous différencier un fret sécurisé d'un fret non sécurisé?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "En théorie", score: 50, gapLevel: "major" },
          { label: "Maîtrise opérationnelle", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "s9-q2",
        text: "Connaissez-vous les critères d'un expéditeur connu?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partiellement", score: 50, gapLevel: "major" },
          { label: "Oui, maîtrisé", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "s9-anomalies",
    name: "Reconnaissance d'anomalies",
    weight: 35,
    questions: [
      {
        id: "s9-q3",
        text: "Savez-vous identifier un colis présentant des signes de manipulation?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Notions", score: 50, gapLevel: "major" },
          { label: "Oui, formé", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "s9-integrity",
    name: "Intégrité des colis",
    weight: 30,
    questions: [
      {
        id: "s9-q4",
        text: "Appliquez-vous les contrôles de sûreté à l'acceptation?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Parfois", score: 40, gapLevel: "major" },
          { label: "Systématiquement", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// ✈️ SÛRETÉ 11.2.3.10 - MANIPULATION FRET SÉCURISÉ
// ═══════════════════════════════════════════════════════════════════════════════

export const SURETE_11_2_3_10_CATEGORIES: NormCategory[] = [
  {
    id: "s10-chain",
    name: "Chaîne sécurisée",
    weight: 40,
    questions: [
      {
        id: "s10-q1",
        text: "Comprenez-vous le concept de chaîne d'approvisionnement sécurisée?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partiellement", score: 50, gapLevel: "major" },
          { label: "Oui, maîtrisé", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "s10-protection",
    name: "Protection contre interférences",
    weight: 30,
    questions: [
      {
        id: "s10-q2",
        text: "Connaissez-vous les mesures de protection du fret sécurisé?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Notions", score: 50, gapLevel: "major" },
          { label: "Maîtrise complète", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "s10-integrity",
    name: "Maintien de l'intégrité",
    weight: 30,
    questions: [
      {
        id: "s10-q3",
        text: "Savez-vous réagir si l'intégrité d'un envoi est compromise?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Vaguement", score: 40, gapLevel: "major" },
          { label: "Procédure connue et appliquée", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// ✈️ SÛRETÉ 11.2.3.6 - CONTRÔLES RA/AH
// ═══════════════════════════════════════════════════════════════════════════════

export const SURETE_11_2_3_6_CATEGORIES: NormCategory[] = [
  {
    id: "s6-procedures",
    name: "Procédures RA",
    weight: 30,
    questions: [
      {
        id: "s6-q1",
        text: "Connaissez-vous les obligations d'un Agent Réglementé?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partiellement", score: 50, gapLevel: "major" },
          { label: "Maîtrise complète", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "s6-screening",
    name: "Méthodes de sécurisation",
    weight: 30,
    questions: [
      {
        id: "s6-q2",
        text: "Connaissez-vous les 6 méthodes de sécurisation du fret?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Quelques-unes", score: 40, gapLevel: "major" },
          { label: "Toutes les 6", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "s6-seals",
    name: "Scellés & Traçabilité",
    weight: 20,
    questions: [
      {
        id: "s6-q3",
        text: "Maîtrisez-vous l'utilisation des scellés de sûreté?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "major" },
          { label: "Basique", score: 50, gapLevel: "minor" },
          { label: "Complet", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "s6-records",
    name: "Enregistrements",
    weight: 20,
    questions: [
      {
        id: "s6-q4",
        text: "Savez-vous quels enregistrements conserver et pendant combien de temps?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partiellement", score: 50, gapLevel: "major" },
          { label: "Oui, conforme réglementation", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// ✈️ SÛRETÉ 11.2.3.8 - SUPERVISION
// ═══════════════════════════════════════════════════════════════════════════════

export const SURETE_11_2_3_8_CATEGORIES: NormCategory[] = [
  {
    id: "s8-supervision",
    name: "Supervision des opérations",
    weight: 35,
    questions: [
      {
        id: "s8-q1",
        text: "Savez-vous superviser l'application des mesures de sûreté?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partiellement", score: 50, gapLevel: "major" },
          { label: "Oui, expérience terrain", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "s8-deviations",
    name: "Traitement des écarts",
    weight: 35,
    questions: [
      {
        id: "s8-q2",
        text: "Savez-vous traiter un écart de sûreté?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Notions", score: 50, gapLevel: "major" },
          { label: "Processus maîtrisé", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "s8-authorities",
    name: "Interface autorités",
    weight: 30,
    questions: [
      {
        id: "s8-q3",
        text: "Connaissez-vous les procédures de communication avec la DGAC/autorités?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "major" },
          { label: "Partiellement", score: 50, gapLevel: "minor" },
          { label: "Oui", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// ✈️ SÛRETÉ 11.2.5 - RESPONSABLE SÛRETÉ
// ═══════════════════════════════════════════════════════════════════════════════

export const SURETE_11_2_5_CATEGORIES: NormCategory[] = [
  {
    id: "s5-regulation",
    name: "Réglementation UE & nationale",
    weight: 25,
    questions: [
      {
        id: "s5-q1",
        text: "Maîtrisez-vous le règlement UE 2015/1998 et ses amendements?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Notions", score: 40, gapLevel: "major" },
          { label: "Maîtrise opérationnelle", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "s5-program",
    name: "Programme de Sûreté",
    weight: 25,
    questions: [
      {
        id: "s5-q2",
        text: "Savez-vous rédiger et maintenir un Programme de Sûreté?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Avec aide", score: 50, gapLevel: "major" },
          { label: "Autonome", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "s5-audit",
    name: "Audits & Inspections",
    weight: 25,
    questions: [
      {
        id: "s5-q3",
        text: "Êtes-vous préparé à une inspection DGAC/Préfecture?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partiellement", score: 50, gapLevel: "major" },
          { label: "Oui, exercices réguliers", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "s5-crisis",
    name: "Gestion de crise",
    weight: 25,
    questions: [
      {
        id: "s5-q4",
        text: "Disposez-vous d'un plan de gestion de crise sûreté?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "En cours de rédaction", score: 40, gapLevel: "major" },
          { label: "Oui, testé", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// ✈️ OEA-AEOS - SÛRETÉ SUPPLY CHAIN
// ═══════════════════════════════════════════════════════════════════════════════

export const OEA_AEOS_CATEGORIES: NormCategory[] = [
  {
    id: "oea-security",
    name: "Sûreté supply chain",
    weight: 40,
    questions: [
      {
        id: "oea-q1",
        text: "Avez-vous évalué les risques sûreté de votre chaîne logistique?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partiellement", score: 50, gapLevel: "major" },
          { label: "Oui, documenté", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "oea-training",
    name: "Formation continue",
    weight: 30,
    questions: [
      {
        id: "oea-q2",
        text: "Le personnel clé reçoit-il une formation sûreté régulière?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Initiale uniquement", score: 40, gapLevel: "major" },
          { label: "Initiale + recyclage", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "oea-traceability",
    name: "Traçabilité formations",
    weight: 30,
    questions: [
      {
        id: "oea-q3",
        text: "Tenez-vous un registre des formations sûreté?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "major" },
          { label: "Incomplet", score: 50, gapLevel: "minor" },
          { label: "Complet et à jour", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// 🍽️ HACCP - HAZARD ANALYSIS CRITICAL CONTROL POINTS
// Basé sur: Codex Alimentarius + CE 852/2004
// ═══════════════════════════════════════════════════════════════════════════════

export const HACCP_CATEGORIES: NormCategory[] = [
  {
    id: "haccp-team",
    name: "Équipe HACCP",
    clause: "Étape 1",
    weight: 10,
    questions: [
      {
        id: "haccp-q1",
        text: "Avez-vous constitué une équipe HACCP pluridisciplinaire?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Équipe partielle", score: 50, gapLevel: "major" },
          { label: "Équipe complète et formée", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "haccp-q2",
        text: "L'équipe dispose-t-elle des compétences en dangers biologiques, chimiques et physiques?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partiellement", score: 50, gapLevel: "major" },
          { label: "Oui, toutes les compétences", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "haccp-product",
    name: "Description produit & usage",
    clause: "Étapes 2-4",
    weight: 10,
    questions: [
      {
        id: "haccp-q3",
        text: "Avez-vous décrit vos produits avec leurs caractéristiques de sécurité?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partiellement documenté", score: 50, gapLevel: "major" },
          { label: "Fiches produits complètes", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "haccp-hazards",
    name: "Analyse des dangers (Principe 1)",
    clause: "Étape 6",
    weight: 25,
    questions: [
      {
        id: "haccp-q4",
        text: "Avez-vous identifié TOUS les dangers potentiels (biologiques, chimiques, physiques)?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partiellement", score: 40, gapLevel: "major" },
          { label: "Oui, les 3 types de dangers", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "haccp-q5",
        text: "Évaluez-vous la sévérité et la probabilité de chaque danger?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Pour certains dangers", score: 50, gapLevel: "major" },
          { label: "Matrice risque pour tous", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "haccp-ccp",
    name: "Points Critiques CCP (Principe 2)",
    clause: "Étape 7",
    weight: 20,
    questions: [
      {
        id: "haccp-q6",
        text: "Utilisez-vous l'arbre de décision pour identifier les CCP?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Identification informelle", score: 40, gapLevel: "major" },
          { label: "Arbre de décision documenté", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "haccp-q7",
        text: "Les limites critiques sont-elles définies et validées scientifiquement?",
        clause: "Principe 3",
        type: "single_choice",
        options: [
          { label: "Non définies", score: 0, gapLevel: "critical" },
          { label: "Définies sans validation", score: 50, gapLevel: "major" },
          { label: "Validées scientifiquement", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "haccp-monitoring",
    name: "Surveillance (Principe 4)",
    clause: "Étape 9",
    weight: 15,
    questions: [
      {
        id: "haccp-q8",
        text: "Les CCP sont-ils surveillés en continu ou selon une fréquence définie?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Surveillance occasionnelle", score: 40, gapLevel: "major" },
          { label: "Surveillance documentée avec enregistrements", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "haccp-corrective",
    name: "Actions correctives (Principe 5)",
    clause: "Étape 10",
    weight: 10,
    questions: [
      {
        id: "haccp-q9",
        text: "Les actions correctives sont-elles prédéfinies pour chaque CCP?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partiellement", score: 50, gapLevel: "major" },
          { label: "Oui, documentées et testées", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "haccp-verification",
    name: "Vérification & Documentation (Principes 6-7)",
    clause: "Étapes 11-12",
    weight: 10,
    questions: [
      {
        id: "haccp-q10",
        text: "Réalisez-vous des vérifications régulières du plan HACCP?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Occasionnellement", score: 50, gapLevel: "major" },
          { label: "Audits internes réguliers", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "haccp-q11",
        text: "Conservez-vous tous les enregistrements HACCP?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partiellement", score: 50, gapLevel: "major" },
          { label: "Oui, archivage conforme", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// 🚛 HACCP TRANSPORT - Spécifique logistique et transport
// Basé sur: CE 852/2004 + ISO/TS 22002-5
// ═══════════════════════════════════════════════════════════════════════════════

export const HACCP_TRANSPORT_CATEGORIES: NormCategory[] = [
  {
    id: "haccp-t-temp",
    name: "Maîtrise de la température",
    weight: 35,
    questions: [
      {
        id: "haccp-t-q1",
        text: "Comment surveillez-vous la température pendant le transport?",
        type: "single_choice",
        options: [
          { label: "Pas de surveillance", score: 0, gapLevel: "critical" },
          { label: "Relevés manuels ponctuels", score: 30, gapLevel: "major" },
          { label: "Enregistreurs embarqués", score: 70, gapLevel: "minor" },
          { label: "Monitoring temps réel + alertes", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "haccp-t-q2",
        text: "Comment gérez-vous une rupture de chaîne du froid?",
        type: "single_choice",
        options: [
          { label: "Pas de procédure", score: 0, gapLevel: "critical" },
          { label: "Au cas par cas", score: 40, gapLevel: "major" },
          { label: "Procédure documentée", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "haccp-t-hygiene",
    name: "Hygiène des véhicules",
    weight: 25,
    questions: [
      {
        id: "haccp-t-q3",
        text: "Les véhicules sont-ils nettoyés et désinfectés selon un plan défini?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Nettoyage occasionnel", score: 40, gapLevel: "major" },
          { label: "Plan de nettoyage documenté", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "haccp-t-contamination",
    name: "Prévention contamination croisée",
    weight: 20,
    questions: [
      {
        id: "haccp-t-q4",
        text: "Séparez-vous les produits alimentaires des autres marchandises?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Parfois", score: 40, gapLevel: "major" },
          { label: "Toujours, véhicules dédiés ou séparation", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "haccp-t-traceability",
    name: "Traçabilité transport",
    weight: 20,
    questions: [
      {
        id: "haccp-t-q5",
        text: "Tracez-vous les conditions de transport de chaque lot?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partiellement", score: 50, gapLevel: "major" },
          { label: "Traçabilité complète", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
]

// ═══════════════════════════════════════════════════════════════════════════════
// 🧪 ISO 22000 - SYSTÈME DE MANAGEMENT SÉCURITÉ ALIMENTAIRE
// ═══════════════════════════════════════════════════════════════════════════════

export const ISO22000_CATEGORIES: NormCategory[] = [
  {
    id: "iso22-context",
    name: "Contexte & Leadership",
    clause: "4-5",
    weight: 15,
    questions: [
      {
        id: "iso22-q1",
        text: "La direction est-elle engagée dans le système de management de la sécurité alimentaire?",
        type: "single_choice",
        options: [
          { label: "Non impliquée", score: 0, gapLevel: "critical" },
          { label: "Engagement verbal", score: 40, gapLevel: "major" },
          { label: "Engagement documenté et revues régulières", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "iso22-prp",
    name: "Programmes Prérequis (PRP)",
    clause: "8.2",
    weight: 25,
    questions: [
      {
        id: "iso22-q2",
        text: "Avez-vous mis en place des PRP selon ISO/TS 22002?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "PRP partiels", score: 50, gapLevel: "major" },
          { label: "PRP complets documentés", score: 100, gapLevel: "none" },
        ],
      },
      {
        id: "iso22-q3",
        text: "Les PRP sont-ils vérifiés régulièrement?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Occasionnellement", score: 50, gapLevel: "major" },
          { label: "Vérification planifiée", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "iso22-haccp",
    name: "Plan HACCP intégré",
    clause: "8.5",
    weight: 25,
    questions: [
      {
        id: "iso22-q4",
        text: "Votre plan HACCP est-il intégré au système de management?",
        type: "single_choice",
        options: [
          { label: "Pas de plan HACCP", score: 0, gapLevel: "critical" },
          { label: "HACCP isolé", score: 40, gapLevel: "major" },
          { label: "HACCP intégré au SMSDA", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "iso22-validation",
    name: "Validation & Vérification",
    clause: "8.8",
    weight: 20,
    questions: [
      {
        id: "iso22-q5",
        text: "Validez-vous l'efficacité des mesures de maîtrise?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Partiellement", score: 50, gapLevel: "major" },
          { label: "Validation scientifique", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
  {
    id: "iso22-improvement",
    name: "Amélioration continue",
    clause: "10",
    weight: 15,
    questions: [
      {
        id: "iso22-q6",
        text: "Réalisez-vous des audits internes du SMSDA?",
        type: "single_choice",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "Occasionnellement", score: 50, gapLevel: "major" },
          { label: "Programme d'audit annuel", score: 100, gapLevel: "none" },
        ],
      },
    ],
  },
]

