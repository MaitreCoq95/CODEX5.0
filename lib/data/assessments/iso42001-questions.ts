// ISO 42001 AI Management System - Diagnostic Questions
// Based on ISO/IEC 42001:2023 requirements for AI governance

import { AssessmentTemplate } from "@/lib/types/assessment.types"

export const ISO42001_TEMPLATE: AssessmentTemplate = {
  id: "iso-42001-diagnostic",
  name: "Diagnostic ISO 42001",
  description: "Évaluez votre gouvernance de l'IA selon la norme ISO 42001",
  certification: "ISO_42001",
  version: "1.0",
  scoringMethod: "weighted",
  estimatedDuration: 25,
  questionsCount: 25,
  status: "published",
  isDemo: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  maturityLevels: [
    { level: 1, name: "Initial", description: "IA utilisée sans gouvernance", minScore: 0, maxScore: 20, color: "#ef4444" },
    { level: 2, name: "Émergent", description: "Premiers éléments de gouvernance", minScore: 21, maxScore: 40, color: "#f97316" },
    { level: 3, name: "Structuré", description: "SMIA documenté", minScore: 41, maxScore: 60, color: "#eab308" },
    { level: 4, name: "Maîtrisé", description: "Gouvernance IA effective", minScore: 61, maxScore: 80, color: "#22c55e" },
    { level: 5, name: "Leader", description: "IA responsable et innovante", minScore: 81, maxScore: 100, color: "#10b981" },
  ],
  sections: [
    // Context & Leadership
    {
      id: "context",
      title: "Contexte et Leadership IA",
      description: "Stratégie et engagement de la direction sur l'IA",
      icon: "🎯",
      weight: 15,
      order: 1,
      questions: [
        {
          id: "ai-1-1",
          type: "single_choice",
          question: "Existe-t-il une stratégie IA formalisée dans votre organisation ?",
          required: true,
          options: [
            { id: "a", label: "Aucune stratégie", value: "0", score: 0 },
            { id: "b", label: "Réflexions en cours", value: "1", score: 2 },
            { id: "c", label: "Stratégie documentée", value: "2", score: 4 },
            { id: "d", label: "Stratégie + feuille de route", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "ai-1-2",
          type: "scale",
          question: "La direction est-elle engagée sur les enjeux éthiques de l'IA ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Pas du tout", max: "Sponsor actif" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 2
        },
        {
          id: "ai-1-3",
          type: "scale",
          question: "Les cas d'usage IA sont-ils inventoriés ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non inventoriés", max: "Registre complet" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 3
        },
      ]
    },
    // Risk Management for AI
    {
      id: "risk",
      title: "Gestion des risques IA",
      description: "Identification et traitement des risques liés à l'IA",
      icon: "⚠️",
      weight: 20,
      order: 2,
      questions: [
        {
          id: "ai-2-1",
          type: "single_choice",
          question: "Les risques spécifiques à l'IA sont-ils évalués ?",
          description: "Biais, explicabilité, sécurité, vie privée...",
          required: true,
          options: [
            { id: "a", label: "Non évalués", value: "0", score: 0 },
            { id: "b", label: "Évaluation informelle", value: "1", score: 2 },
            { id: "c", label: "Analyse de risques documentée", value: "2", score: 4 },
            { id: "d", label: "Framework de risques IA", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 1
        },
        {
          id: "ai-2-2",
          type: "scale",
          question: "Les impacts potentiels sur les droits humains sont-ils considérés ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non considérés", max: "Étude d'impact systématique" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
        {
          id: "ai-2-3",
          type: "scale",
          question: "Les systèmes IA sont-ils classifiés par niveau de risque ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non classifiés", max: "Classification selon AI Act" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 3
        },
      ]
    },
    // Data Governance
    {
      id: "data",
      title: "Gouvernance des données",
      description: "Qualité et gestion des données pour l'IA",
      icon: "📊",
      weight: 20,
      order: 3,
      questions: [
        {
          id: "ai-3-1",
          type: "scale",
          question: "La qualité des données d'entraînement est-elle contrôlée ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non contrôlée", max: "Data quality management" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "ai-3-2",
          type: "scale",
          question: "Les biais potentiels dans les données sont-ils détectés ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non détectés", max: "Bias detection + mitigation" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
        {
          id: "ai-3-3",
          type: "scale",
          question: "La traçabilité des données est-elle assurée ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Aucune traçabilité", max: "Data lineage complet" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 3
        },
      ]
    },
    // AI System Development
    {
      id: "development",
      title: "Développement des systèmes IA",
      description: "Cycle de vie et robustesse des modèles",
      icon: "🔧",
      weight: 20,
      order: 4,
      questions: [
        {
          id: "ai-4-1",
          type: "single_choice",
          question: "Suivez-vous un processus MLOps structuré ?",
          required: true,
          options: [
            { id: "a", label: "Non", value: "0", score: 0 },
            { id: "b", label: "Processus informel", value: "1", score: 2 },
            { id: "c", label: "CI/CD pour ML", value: "2", score: 4 },
            { id: "d", label: "MLOps mature + monitoring", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "ai-4-2",
          type: "scale",
          question: "Les modèles sont-ils testés et validés avant déploiement ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non testés", max: "Tests exhaustifs + validation" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
        {
          id: "ai-4-3",
          type: "scale",
          question: "L'explicabilité des décisions IA est-elle assurée ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Boîte noire", max: "XAI implémenté" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 3
        },
        {
          id: "ai-4-4",
          type: "scale",
          question: "Les modèles en production sont-ils surveillés (drift) ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non surveillés", max: "Monitoring continu" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 4
        },
      ]
    },
    // Compliance & Ethics
    {
      id: "ethics",
      title: "Conformité et Éthique IA",
      description: "Respect réglementaire et principes éthiques",
      icon: "⚖️",
      weight: 25,
      order: 5,
      questions: [
        {
          id: "ai-5-1",
          type: "single_choice",
          question: "Êtes-vous préparé pour l'AI Act européen ?",
          required: true,
          options: [
            { id: "a", label: "Pas informé", value: "0", score: 0 },
            { id: "b", label: "En veille", value: "1", score: 2 },
            { id: "c", label: "Gap analysis réalisée", value: "2", score: 4 },
            { id: "d", label: "Plan de conformité en cours", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 1
        },
        {
          id: "ai-5-2",
          type: "scale",
          question: "Des principes éthiques IA sont-ils définis et appliqués ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non définis", max: "Charte + comité éthique" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
        {
          id: "ai-5-3",
          type: "scale",
          question: "Les utilisateurs sont-ils informés qu'ils interagissent avec une IA ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Jamais", max: "Transparence systématique" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 3
        },
        {
          id: "ai-5-4",
          type: "scale",
          question: "Un mécanisme de recours humain existe-t-il pour les décisions IA ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non", max: "Human-in-the-loop systématique" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 4
        },
      ]
    },
  ]
}

export default ISO42001_TEMPLATE
