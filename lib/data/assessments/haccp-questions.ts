// HACCP (Hazard Analysis Critical Control Points) - Diagnostic Questions
// Based on Codex Alimentarius HACCP principles

import { AssessmentTemplate } from "@/lib/types/assessment.types"

export const HACCP_TEMPLATE: AssessmentTemplate = {
  id: "haccp-diagnostic",
  name: "Diagnostic HACCP",
  description: "Évaluez votre système de maîtrise de la sécurité alimentaire selon les 7 principes HACCP",
  certification: "HACCP",
  version: "1.0",
  scoringMethod: "weighted",
  estimatedDuration: 20,
  questionsCount: 20,
  status: "published",
  isDemo: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  maturityLevels: [
    { level: 1, name: "Non conforme", description: "Système HACCP inexistant ou non fonctionnel", minScore: 0, maxScore: 20, color: "#ef4444" },
    { level: 2, name: "Basique", description: "Éléments de base en place", minScore: 21, maxScore: 40, color: "#f97316" },
    { level: 3, name: "Opérationnel", description: "Système HACCP fonctionnel", minScore: 41, maxScore: 60, color: "#eab308" },
    { level: 4, name: "Maîtrisé", description: "HACCP efficace et surveillé", minScore: 61, maxScore: 80, color: "#22c55e" },
    { level: 5, name: "Excellence", description: "Culture sécurité alimentaire", minScore: 81, maxScore: 100, color: "#10b981" },
  ],
  sections: [
    // Prerequisites (PRP)
    {
      id: "prerequisites",
      title: "Programmes prérequis (PRP)",
      description: "Bonnes pratiques d'hygiène de base",
      icon: "🧼",
      weight: 20,
      order: 1,
      questions: [
        {
          id: "haccp-prp-1",
          type: "scale",
          question: "Les locaux sont-ils conçus pour faciliter l'hygiène ?",
          description: "Marche en avant, séparation zones, surfaces lavables",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non conformes", max: "Conception optimale" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "haccp-prp-2",
          type: "scale",
          question: "Le plan de nettoyage et désinfection est-il appliqué ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Inexistant", max: "Plan validé + contrôles" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
        {
          id: "haccp-prp-3",
          type: "scale",
          question: "La gestion des nuisibles est-elle maîtrisée ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non gérée", max: "Contrat + suivi" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 3
        },
      ]
    },
    // Principle 1: Hazard Analysis
    {
      id: "hazard-analysis",
      title: "Principe 1 - Analyse des dangers",
      description: "Identification et évaluation des dangers",
      icon: "🔍",
      weight: 15,
      order: 2,
      questions: [
        {
          id: "haccp-1-1",
          type: "single_choice",
          question: "Une analyse des dangers a-t-elle été réalisée ?",
          required: true,
          options: [
            { id: "a", label: "Non réalisée", value: "0", score: 0 },
            { id: "b", label: "Analyse partielle", value: "1", score: 2 },
            { id: "c", label: "Analyse complète", value: "2", score: 4 },
            { id: "d", label: "Analyse + évaluation des risques", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 1
        },
        {
          id: "haccp-1-2",
          type: "scale",
          question: "Les dangers biologiques, chimiques et physiques sont-ils identifiés ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non identifiés", max: "Liste exhaustive" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
      ]
    },
    // Principle 2: CCPs
    {
      id: "ccps",
      title: "Principe 2 - Points critiques (CCP)",
      description: "Détermination des CCP",
      icon: "🎯",
      weight: 15,
      order: 3,
      questions: [
        {
          id: "haccp-2-1",
          type: "single_choice",
          question: "Les CCP ont-ils été déterminés par une méthode structurée ?",
          required: true,
          options: [
            { id: "a", label: "Pas de CCP identifiés", value: "0", score: 0 },
            { id: "b", label: "CCP identifiés intuitivement", value: "1", score: 2 },
            { id: "c", label: "Arbre de décision utilisé", value: "2", score: 4 },
            { id: "d", label: "Méthode + validation", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 1
        },
      ]
    },
    // Principle 3: Critical Limits
    {
      id: "limits",
      title: "Principe 3 - Limites critiques",
      description: "Définition des limites critiques",
      icon: "📏",
      weight: 10,
      order: 4,
      questions: [
        {
          id: "haccp-3-1",
          type: "scale",
          question: "Les limites critiques sont-elles définies pour chaque CCP ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non définies", max: "Limites validées scientifiquement" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "haccp-3-2",
          type: "scale",
          question: "Les limites sont-elles mesurables et vérifiables ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non mesurables", max: "Paramètres chiffrés" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 2
        },
      ]
    },
    // Principle 4: Monitoring
    {
      id: "monitoring",
      title: "Principe 4 - Surveillance",
      description: "Procédures de surveillance des CCP",
      icon: "👁️",
      weight: 15,
      order: 5,
      questions: [
        {
          id: "haccp-4-1",
          type: "single_choice",
          question: "La surveillance des CCP est-elle systématique ?",
          required: true,
          options: [
            { id: "a", label: "Pas de surveillance", value: "0", score: 0 },
            { id: "b", label: "Surveillance occasionnelle", value: "1", score: 2 },
            { id: "c", label: "Surveillance planifiée", value: "2", score: 4 },
            { id: "d", label: "Surveillance en temps réel + enregistrements", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 1
        },
        {
          id: "haccp-4-2",
          type: "scale",
          question: "Les enregistrements de surveillance sont-ils conservés ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non conservés", max: "Archivage conforme" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 2
        },
      ]
    },
    // Principle 5: Corrective Actions
    {
      id: "corrective",
      title: "Principe 5 - Actions correctives",
      description: "Mesures en cas de dépassement",
      icon: "🔧",
      weight: 10,
      order: 6,
      questions: [
        {
          id: "haccp-5-1",
          type: "scale",
          question: "Des actions correctives sont-elles définies pour chaque CCP ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non définies", max: "Procédures documentées" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "haccp-5-2",
          type: "scale",
          question: "Les déviations sont-elles tracées et analysées ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non tracées", max: "Analyse root cause" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 2
        },
      ]
    },
    // Principle 6 & 7: Verification & Documentation
    {
      id: "verification",
      title: "Principes 6-7 - Vérification et documentation",
      description: "Validation du système HACCP",
      icon: "✅",
      weight: 15,
      order: 7,
      questions: [
        {
          id: "haccp-6-1",
          type: "single_choice",
          question: "Le plan HACCP est-il vérifié périodiquement ?",
          required: true,
          options: [
            { id: "a", label: "Jamais vérifié", value: "0", score: 0 },
            { id: "b", label: "Vérification occasionnelle", value: "1", score: 2 },
            { id: "c", label: "Vérification annuelle", value: "2", score: 4 },
            { id: "d", label: "Vérification + validation régulières", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "haccp-7-1",
          type: "scale",
          question: "La documentation HACCP est-elle complète et à jour ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Inexistante", max: "Manuel HACCP complet" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
      ]
    },
  ]
}

export default HACCP_TEMPLATE
