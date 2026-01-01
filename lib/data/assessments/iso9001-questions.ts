// ISO 9001:2015 Quality Management System - Diagnostic Questions
// Based on ISO 9001:2015 requirements structure

import { AssessmentTemplate } from "@/lib/types/assessment.types"

export const ISO9001_TEMPLATE: AssessmentTemplate = {
  id: "iso-9001-diagnostic",
  name: "Diagnostic ISO 9001:2015",
  description: "Évaluez votre maturité en management de la qualité selon la norme ISO 9001:2015",
  certification: "ISO_9001",
  version: "1.0",
  scoringMethod: "weighted",
  estimatedDuration: 30,
  questionsCount: 30,
  status: "published",
  isDemo: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  maturityLevels: [
    { level: 1, name: "Initial", description: "Processus ad-hoc, non documentés", minScore: 0, maxScore: 20, color: "#ef4444" },
    { level: 2, name: "Défini", description: "Processus documentés mais pas toujours suivis", minScore: 21, maxScore: 40, color: "#f97316" },
    { level: 3, name: "Maîtrisé", description: "Processus appliqués de manière cohérente", minScore: 41, maxScore: 60, color: "#eab308" },
    { level: 4, name: "Optimisé", description: "Processus mesurés et améliorés", minScore: 61, maxScore: 80, color: "#22c55e" },
    { level: 5, name: "Excellence", description: "Amélioration continue systématique", minScore: 81, maxScore: 100, color: "#10b981" },
  ],
  sections: [
    // Section 4: Contexte de l'organisation
    {
      id: "context",
      title: "Contexte de l'organisation",
      description: "Compréhension de l'organisation et de son contexte",
      icon: "🏢",
      weight: 10,
      order: 1,
      questions: [
        {
          id: "q4-1",
          type: "scale",
          question: "Avez-vous identifié les enjeux internes et externes pertinents pour votre SMQ ?",
          description: "Facteurs économiques, concurrentiels, technologiques, réglementaires...",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Pas du tout", max: "Complètement" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 1
        },
        {
          id: "q4-2",
          type: "scale",
          question: "Les besoins et attentes des parties intéressées sont-ils identifiés ?",
          description: "Clients, fournisseurs, employés, actionnaires, régulateurs...",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Pas du tout", max: "Complètement" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 2
        },
        {
          id: "q4-3",
          type: "single_choice",
          question: "Le périmètre du SMQ est-il défini et documenté ?",
          required: true,
          options: [
            { id: "q4-3-a", label: "Non défini", value: "0", score: 0 },
            { id: "q4-3-b", label: "Défini oralement", value: "1", score: 2 },
            { id: "q4-3-c", label: "Documenté mais incomplet", value: "2", score: 3 },
            { id: "q4-3-d", label: "Documenté et complet", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1, critical: true },
          order: 3
        },
      ]
    },
    // Section 5: Leadership
    {
      id: "leadership",
      title: "Leadership",
      description: "Engagement de la direction et politique qualité",
      icon: "👑",
      weight: 15,
      order: 2,
      questions: [
        {
          id: "q5-1",
          type: "scale",
          question: "La direction démontre-t-elle un leadership actif pour le SMQ ?",
          description: "Implication visible, ressources allouées, communication régulière",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Jamais", max: "Toujours" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "q5-2",
          type: "single_choice",
          question: "Existe-t-il une politique qualité documentée et communiquée ?",
          required: true,
          options: [
            { id: "q5-2-a", label: "Aucune politique", value: "0", score: 0 },
            { id: "q5-2-b", label: "Politique informelle", value: "1", score: 2 },
            { id: "q5-2-c", label: "Documentée mais peu diffusée", value: "2", score: 3 },
            { id: "q5-2-d", label: "Documentée et largement communiquée", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
        {
          id: "q5-3",
          type: "scale",
          question: "Les rôles et responsabilités qualité sont-ils clairement définis ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Pas du tout", max: "Parfaitement" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 3
        },
      ]
    },
    // Section 6: Planification
    {
      id: "planning",
      title: "Planification",
      description: "Risques, opportunités et objectifs qualité",
      icon: "📋",
      weight: 10,
      order: 3,
      questions: [
        {
          id: "q6-1",
          type: "single_choice",
          question: "Les risques et opportunités liés au SMQ sont-ils identifiés ?",
          required: true,
          options: [
            { id: "q6-1-a", label: "Non identifiés", value: "0", score: 0 },
            { id: "q6-1-b", label: "Partiellement identifiés", value: "1", score: 2 },
            { id: "q6-1-c", label: "Identifiés mais non traités", value: "2", score: 3 },
            { id: "q6-1-d", label: "Identifiés et plans d'action définis", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1, critical: true },
          order: 1
        },
        {
          id: "q6-2",
          type: "scale",
          question: "Des objectifs qualité mesurables sont-ils définis ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Aucun objectif", max: "Objectifs SMART" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 2
        },
        {
          id: "q6-3",
          type: "scale",
          question: "Les changements du SMQ sont-ils planifiés et maîtrisés ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Jamais", max: "Systématiquement" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 3
        },
      ]
    },
    // Section 7: Support
    {
      id: "support",
      title: "Support",
      description: "Ressources, compétences et informations documentées",
      icon: "🛠️",
      weight: 15,
      order: 4,
      questions: [
        {
          id: "q7-1",
          type: "scale",
          question: "Les ressources nécessaires au SMQ sont-elles disponibles ?",
          description: "Personnel, infrastructure, environnement de travail",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Insuffisantes", max: "Optimales" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 1
        },
        {
          id: "q7-2",
          type: "single_choice",
          question: "Comment gérez-vous les compétences du personnel ?",
          required: true,
          options: [
            { id: "q7-2-a", label: "Pas de gestion formelle", value: "0", score: 0 },
            { id: "q7-2-b", label: "Formations ponctuelles", value: "1", score: 2 },
            { id: "q7-2-c", label: "Plan de formation annuel", value: "2", score: 4 },
            { id: "q7-2-d", label: "Matrice de compétences et plan de développement", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
        {
          id: "q7-3",
          type: "scale",
          question: "Les informations documentées sont-elles maîtrisées ?",
          description: "Création, mise à jour, conservation, diffusion",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Pas du tout", max: "Parfaitement" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 3
        },
        {
          id: "q7-4",
          type: "scale",
          question: "La communication interne sur la qualité est-elle efficace ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Inexistante", max: "Excellente" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 4
        },
      ]
    },
    // Section 8: Réalisation des activités opérationnelles
    {
      id: "operations",
      title: "Réalisation opérationnelle",
      description: "Planification et maîtrise des processus",
      icon: "⚙️",
      weight: 25,
      order: 5,
      questions: [
        {
          id: "q8-1",
          type: "scale",
          question: "Les exigences clients sont-elles systématiquement identifiées et revues ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Jamais", max: "Systématiquement" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "q8-2",
          type: "single_choice",
          question: "Comment gérez-vous la conception et développement de vos produits/services ?",
          required: true,
          options: [
            { id: "q8-2-a", label: "Pas de processus formel", value: "0", score: 0 },
            { id: "q8-2-b", label: "Processus informel", value: "1", score: 2 },
            { id: "q8-2-c", label: "Processus documenté", value: "2", score: 4 },
            { id: "q8-2-d", label: "Processus avec jalons et validations", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: false },
          order: 2
        },
        {
          id: "q8-3",
          type: "scale",
          question: "Les fournisseurs sont-ils évalués et suivis ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Jamais", max: "Systématiquement" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 3
        },
        {
          id: "q8-4",
          type: "scale",
          question: "La production/prestation est-elle réalisée dans des conditions maîtrisées ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Peu maîtrisées", max: "Parfaitement maîtrisées" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 4
        },
        {
          id: "q8-5",
          type: "single_choice",
          question: "Comment gérez-vous les produits/services non conformes ?",
          required: true,
          options: [
            { id: "q8-5-a", label: "Pas de processus", value: "0", score: 0 },
            { id: "q8-5-b", label: "Traitement au cas par cas", value: "1", score: 2 },
            { id: "q8-5-c", label: "Procédure documentée", value: "2", score: 4 },
            { id: "q8-5-d", label: "Procédure avec analyse et prévention", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 5
        },
      ]
    },
    // Section 9: Évaluation des performances
    {
      id: "performance",
      title: "Évaluation des performances",
      description: "Surveillance, mesure, analyse et évaluation",
      icon: "📊",
      weight: 15,
      order: 6,
      questions: [
        {
          id: "q9-1",
          type: "scale",
          question: "Mesurez-vous la satisfaction client ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Jamais", max: "Systématiquement" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "q9-2",
          type: "single_choice",
          question: "Réalisez-vous des audits internes du SMQ ?",
          required: true,
          options: [
            { id: "q9-2-a", label: "Aucun audit", value: "0", score: 0 },
            { id: "q9-2-b", label: "Audits occasionnels", value: "1", score: 2 },
            { id: "q9-2-c", label: "Programme d'audit annuel", value: "2", score: 4 },
            { id: "q9-2-d", label: "Programme d'audit avec suivi des actions", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
        {
          id: "q9-3",
          type: "scale",
          question: "La direction réalise-t-elle des revues régulières du SMQ ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Jamais", max: "Régulièrement" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 3
        },
        {
          id: "q9-4",
          type: "scale",
          question: "Des indicateurs de performance qualité sont-ils suivis ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Aucun", max: "Tableaux de bord complets" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 4
        },
      ]
    },
    // Section 10: Amélioration
    {
      id: "improvement",
      title: "Amélioration",
      description: "Amélioration continue et actions correctives",
      icon: "🚀",
      weight: 10,
      order: 7,
      questions: [
        {
          id: "q10-1",
          type: "single_choice",
          question: "Comment gérez-vous les non-conformités et réclamations ?",
          required: true,
          options: [
            { id: "q10-1-a", label: "Traitement informel", value: "0", score: 0 },
            { id: "q10-1-b", label: "Enregistrement basique", value: "1", score: 2 },
            { id: "q10-1-c", label: "Analyse des causes", value: "2", score: 4 },
            { id: "q10-1-d", label: "Analyse + actions correctives systématiques", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "q10-2",
          type: "scale",
          question: "Mettez-vous en œuvre des démarches d'amélioration continue ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Jamais", max: "Culture d'amélioration" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 2
        },
        {
          id: "q10-3",
          type: "scale",
          question: "Les opportunités d'amélioration sont-elles identifiées et exploitées ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Rarement", max: "Systématiquement" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 3
        },
      ]
    },
  ]
}

export default ISO9001_TEMPLATE
