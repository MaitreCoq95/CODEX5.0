// GDP (Good Distribution Practice) - Diagnostic Questions
// Based on EU GDP Guidelines 2013/C 343/01 for pharmaceutical distribution

import { AssessmentTemplate } from "@/lib/types/assessment.types"

export const GDP_TEMPLATE: AssessmentTemplate = {
  id: "gdp-diagnostic",
  name: "Diagnostic GDP / BPD",
  description: "Évaluez votre conformité aux Bonnes Pratiques de Distribution pharmaceutique",
  certification: "GDP",
  version: "1.0",
  scoringMethod: "weighted",
  estimatedDuration: 25,
  questionsCount: 25,
  status: "published",
  isDemo: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  maturityLevels: [
    { level: 1, name: "Non conforme", description: "Risques majeurs de non-conformité", minScore: 0, maxScore: 20, color: "#ef4444" },
    { level: 2, name: "Partiel", description: "Conformité partielle, lacunes importantes", minScore: 21, maxScore: 40, color: "#f97316" },
    { level: 3, name: "Acceptable", description: "Conformité de base atteinte", minScore: 41, maxScore: 60, color: "#eab308" },
    { level: 4, name: "Conforme", description: "Bonne conformité aux exigences", minScore: 61, maxScore: 80, color: "#22c55e" },
    { level: 5, name: "Exemplaire", description: "Excellence en distribution pharmaceutique", minScore: 81, maxScore: 100, color: "#10b981" },
  ],
  sections: [
    // Chapter 1: Quality Management
    {
      id: "quality-system",
      title: "Système Qualité",
      description: "Organisation et gestion de la qualité",
      icon: "🏥",
      weight: 15,
      order: 1,
      questions: [
        {
          id: "gdp1-1",
          type: "single_choice",
          question: "Disposez-vous d'un système qualité documenté pour la distribution ?",
          required: true,
          options: [
            { id: "gdp1-1-a", label: "Non", value: "0", score: 0 },
            { id: "gdp1-1-b", label: "En cours de création", value: "1", score: 2 },
            { id: "gdp1-1-c", label: "Oui, basique", value: "2", score: 3 },
            { id: "gdp1-1-d", label: "Oui, complet et approuvé", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "gdp1-2",
          type: "scale",
          question: "Un Pharmacien Responsable (PR) est-il désigné et disponible ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non désigné", max: "Désigné et présent" },
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 2
        },
        {
          id: "gdp1-3",
          type: "scale",
          question: "Les procédures sont-elles régulièrement révisées et approuvées ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Jamais", max: "Systématiquement" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 3
        },
      ]
    },
    // Chapter 2: Personnel
    {
      id: "personnel",
      title: "Personnel",
      description: "Formation et qualification du personnel",
      icon: "👥",
      weight: 15,
      order: 2,
      questions: [
        {
          id: "gdp2-1",
          type: "single_choice",
          question: "Le personnel reçoit-il une formation GDP initiale et continue ?",
          required: true,
          options: [
            { id: "gdp2-1-a", label: "Aucune formation", value: "0", score: 0 },
            { id: "gdp2-1-b", label: "Formation initiale uniquement", value: "1", score: 2 },
            { id: "gdp2-1-c", label: "Formations régulières", value: "2", score: 4 },
            { id: "gdp2-1-d", label: "Programme complet avec évaluation", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "gdp2-2",
          type: "scale",
          question: "Les dossiers de formation sont-ils conservés et à jour ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non conservés", max: "Parfaitement documentés" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 2
        },
        {
          id: "gdp2-3",
          type: "scale",
          question: "Les responsabilités sont-elles clairement définies par écrit ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non définies", max: "Fiches de poste complètes" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 3
        },
      ]
    },
    // Chapter 3: Premises and Equipment
    {
      id: "premises",
      title: "Locaux et Équipements",
      description: "Infrastructure de stockage et équipements",
      icon: "🏭",
      weight: 20,
      order: 3,
      questions: [
        {
          id: "gdp3-1",
          type: "single_choice",
          question: "Les zones de stockage sont-elles qualifiées (mapping thermique) ?",
          required: true,
          options: [
            { id: "gdp3-1-a", label: "Non qualifiées", value: "0", score: 0 },
            { id: "gdp3-1-b", label: "Qualification ancienne (>3 ans)", value: "1", score: 2 },
            { id: "gdp3-1-c", label: "Qualification récente", value: "2", score: 4 },
            { id: "gdp3-1-d", label: "Qualification + requalification périodique", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 1
        },
        {
          id: "gdp3-2",
          type: "scale",
          question: "La température est-elle surveillée en continu (enregistreurs calibrés) ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non surveillée", max: "Monitoring 24/7 avec alertes" },
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 2
        },
        {
          id: "gdp3-3",
          type: "scale",
          question: "Les équipements de manutention sont-ils qualifiés et entretenus ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non entretenus", max: "Maintenance préventive" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 3
        },
        {
          id: "gdp3-4",
          type: "scale",
          question: "Les accès aux zones de stockage sont-ils sécurisés ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non sécurisés", max: "Contrôle d'accès strict" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 4
        },
      ]
    },
    // Chapter 4: Documentation
    {
      id: "documentation",
      title: "Documentation",
      description: "Gestion documentaire et traçabilité",
      icon: "📄",
      weight: 10,
      order: 4,
      questions: [
        {
          id: "gdp4-1",
          type: "scale",
          question: "Les documents sont-ils maîtrisés (version, approbation, diffusion) ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non maîtrisés", max: "GED complète" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "gdp4-2",
          type: "scale",
          question: "Les enregistrements sont-ils conservés selon les délais réglementaires ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non conservés", max: "Archivage conforme" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 2
        },
      ]
    },
    // Chapter 5: Operations
    {
      id: "operations",
      title: "Opérations",
      description: "Réception, stockage, préparation, expédition",
      icon: "📦",
      weight: 20,
      order: 5,
      questions: [
        {
          id: "gdp5-1",
          type: "single_choice",
          question: "Comment vérifiez-vous l'authenticité des fournisseurs ?",
          required: true,
          options: [
            { id: "gdp5-1-a", label: "Pas de vérification", value: "0", score: 0 },
            { id: "gdp5-1-b", label: "Vérification basique", value: "1", score: 2 },
            { id: "gdp5-1-c", label: "Audit documentaire", value: "2", score: 4 },
            { id: "gdp5-1-d", label: "Qualification complète + audits", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "gdp5-2",
          type: "scale",
          question: "Les contrôles à réception sont-ils systématiques ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non réalisés", max: "Procédure complète" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
        {
          id: "gdp5-3",
          type: "scale",
          question: "Le principe FEFO/FIFO est-il appliqué ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non appliqué", max: "Géré par WMS" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 3
        },
        {
          id: "gdp5-4",
          type: "scale",
          question: "Les retours clients sont-ils gérés selon une procédure définie ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Pas de procédure", max: "Procédure complète" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 4
        },
      ]
    },
    // Chapter 6: Complaints, Returns, Falsified Products
    {
      id: "complaints",
      title: "Réclamations et Produits Falsifiés",
      description: "Gestion des réclamations et sécurité supply chain",
      icon: "⚠️",
      weight: 10,
      order: 6,
      questions: [
        {
          id: "gdp6-1",
          type: "single_choice",
          question: "Avez-vous une procédure de gestion des réclamations ?",
          required: true,
          options: [
            { id: "gdp6-1-a", label: "Non", value: "0", score: 0 },
            { id: "gdp6-1-b", label: "Traitement informel", value: "1", score: 2 },
            { id: "gdp6-1-c", label: "Procédure documentée", value: "2", score: 4 },
            { id: "gdp6-1-d", label: "Procédure avec analyse root cause", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 1
        },
        {
          id: "gdp6-2",
          type: "scale",
          question: "Êtes-vous préparé à détecter des produits falsifiés ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non préparé", max: "Formation + procédure + outils" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
      ]
    },
    // Chapter 7: Outsourced Activities & Transport
    {
      id: "transport",
      title: "Transport et Sous-traitance",
      description: "Maîtrise du transport et des prestataires",
      icon: "🚚",
      weight: 10,
      order: 7,
      questions: [
        {
          id: "gdp7-1",
          type: "single_choice",
          question: "Les transporteurs sont-ils qualifiés GDP ?",
          required: true,
          options: [
            { id: "gdp7-1-a", label: "Non qualifiés", value: "0", score: 0 },
            { id: "gdp7-1-b", label: "Contrats basiques", value: "1", score: 2 },
            { id: "gdp7-1-c", label: "Accord qualité", value: "2", score: 4 },
            { id: "gdp7-1-d", label: "Qualification + audits", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "gdp7-2",
          type: "scale",
          question: "La chaîne du froid est-elle maîtrisée pendant le transport ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non maîtrisée", max: "Emballages qualifiés + monitoring" },
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 2
        },
        {
          id: "gdp7-3",
          type: "scale",
          question: "Les contrats avec sous-traitants incluent-ils des exigences GDP ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non incluses", max: "Annexe qualité complète" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 3
        },
      ]
    },
  ]
}

export default GDP_TEMPLATE
