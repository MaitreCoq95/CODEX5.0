// ISO 13485 Medical Devices QMS - Diagnostic Questions
// Based on ISO 13485:2016 requirements

import { AssessmentTemplate } from "@/lib/types/assessment.types"

export const ISO13485_TEMPLATE: AssessmentTemplate = {
  id: "iso-13485-diagnostic",
  name: "Diagnostic ISO 13485",
  description: "Évaluez votre système qualité dispositifs médicaux selon ISO 13485",
  certification: "ISO_13485",
  version: "1.0",
  scoringMethod: "weighted",
  estimatedDuration: 25,
  questionsCount: 25,
  status: "published",
  isDemo: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  maturityLevels: [
    { level: 1, name: "Non conforme", description: "SMQ inexistant ou inadapté", minScore: 0, maxScore: 20, color: "#ef4444" },
    { level: 2, name: "Partiel", description: "Éléments de base en place", minScore: 21, maxScore: 40, color: "#f97316" },
    { level: 3, name: "Fonctionnel", description: "SMQ opérationnel", minScore: 41, maxScore: 60, color: "#eab308" },
    { level: 4, name: "Conforme", description: "Prêt pour certification", minScore: 61, maxScore: 80, color: "#22c55e" },
    { level: 5, name: "Excellence", description: "Best practices DM", minScore: 81, maxScore: 100, color: "#10b981" },
  ],
  sections: [
    // Context & QMS
    {
      id: "qms",
      title: "Système de Management Qualité",
      description: "Exigences générales du SMQ",
      icon: "🏥",
      weight: 15,
      order: 1,
      questions: [
        {
          id: "dm-1-1",
          type: "single_choice",
          question: "Disposez-vous d'un manuel qualité adapté aux DM ?",
          required: true,
          options: [
            { id: "a", label: "Non", value: "0", score: 0 },
            { id: "b", label: "Manuel générique", value: "1", score: 2 },
            { id: "c", label: "Manuel ISO 13485", value: "2", score: 4 },
            { id: "d", label: "Manuel + annexes réglementaires", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "dm-1-2",
          type: "scale",
          question: "Les processus sont-ils définis avec approche risque ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non définis", max: "Approche risque systématique" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 2
        },
        {
          id: "dm-1-3",
          type: "scale",
          question: "Les dossiers d'enregistrement sont-ils conservés selon les exigences ?",
          description: "Durée de vie du DM + 2 ans minimum",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non conformes", max: "Archivage conforme" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 3
        },
      ]
    },
    // Management Responsibility
    {
      id: "management",
      title: "Responsabilité de la direction",
      description: "Engagement et représentant de la direction",
      icon: "👔",
      weight: 10,
      order: 2,
      questions: [
        {
          id: "dm-2-1",
          type: "scale",
          question: "La direction s'engage-t-elle activement sur la qualité et la conformité ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Pas d'engagement", max: "Leadership visible" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 1
        },
        {
          id: "dm-2-2",
          type: "scale",
          question: "Un représentant de la direction pour le SMQ est-il désigné ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non", max: "Désigné + autorité" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 2
        },
      ]
    },
    // Resource Management
    {
      id: "resources",
      title: "Gestion des ressources",
      description: "Personnel, infrastructure, environnement",
      icon: "👥",
      weight: 15,
      order: 3,
      questions: [
        {
          id: "dm-3-1",
          type: "single_choice",
          question: "Le personnel est-il formé aux exigences réglementaires DM ?",
          required: true,
          options: [
            { id: "a", label: "Pas de formation", value: "0", score: 0 },
            { id: "b", label: "Formation initiale", value: "1", score: 2 },
            { id: "c", label: "Plan de formation", value: "2", score: 4 },
            { id: "d", label: "Formation + qualification documentée", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "dm-3-2",
          type: "scale",
          question: "Les salles propres/zones contrôlées sont-elles qualifiées ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non applicables/Non qualifiées", max: "Qualification + monitoring" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
      ]
    },
    // Product Realization
    {
      id: "product",
      title: "Réalisation du produit",
      description: "Conception, production, traçabilité",
      icon: "⚙️",
      weight: 30,
      order: 4,
      questions: [
        {
          id: "dm-4-1",
          type: "single_choice",
          question: "Un dossier de conception (Design History File) est-il tenu ?",
          required: true,
          options: [
            { id: "a", label: "Non", value: "0", score: 0 },
            { id: "b", label: "Documentation partielle", value: "1", score: 2 },
            { id: "c", label: "DHF structuré", value: "2", score: 4 },
            { id: "d", label: "DHF complet + revues de conception", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 1
        },
        {
          id: "dm-4-2",
          type: "scale",
          question: "La gestion des risques produit suit-elle EN ISO 14971 ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non", max: "Dossier de gestion des risques complet" },
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 2
        },
        {
          id: "dm-4-3",
          type: "scale",
          question: "Les fournisseurs critiques sont-ils qualifiés et surveillés ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non qualifiés", max: "Audits + accords qualité" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 3
        },
        {
          id: "dm-4-4",
          type: "scale",
          question: "La traçabilité lot/patient est-elle assurée ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Traçabilité insuffisante", max: "UDI implémenté" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 4
        },
        {
          id: "dm-4-5",
          type: "scale",
          question: "La validation des processus de production est-elle réalisée ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non validés", max: "IQ/OQ/PQ documentés" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 5
        },
      ]
    },
    // Measurement & Improvement
    {
      id: "measurement",
      title: "Mesure et amélioration",
      description: "Surveillance, CAPA, vigilance",
      icon: "📊",
      weight: 20,
      order: 5,
      questions: [
        {
          id: "dm-5-1",
          type: "single_choice",
          question: "Un système de matériovigilance est-il en place ?",
          required: true,
          options: [
            { id: "a", label: "Non", value: "0", score: 0 },
            { id: "b", label: "Processus informel", value: "1", score: 2 },
            { id: "c", label: "Procédure documentée", value: "2", score: 4 },
            { id: "d", label: "Système + personne responsable désignée", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 1
        },
        {
          id: "dm-5-2",
          type: "scale",
          question: "Le système CAPA est-il efficace ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Inexistant", max: "CAPA systématique + efficacité vérifiée" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
        {
          id: "dm-5-3",
          type: "scale",
          question: "Les audits internes couvrent-ils toutes les exigences ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Pas d'audits", max: "Programme complet + suivi" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 3
        },
      ]
    },
    // Regulatory
    {
      id: "regulatory",
      title: "Affaires réglementaires",
      description: "Marquage CE, dossiers techniques",
      icon: "📋",
      weight: 10,
      order: 6,
      questions: [
        {
          id: "dm-6-1",
          type: "single_choice",
          question: "Les dossiers techniques (MDR) sont-ils à jour ?",
          required: true,
          options: [
            { id: "a", label: "Non constitués", value: "0", score: 0 },
            { id: "b", label: "Dossiers MDD", value: "1", score: 2 },
            { id: "c", label: "Transition MDR en cours", value: "2", score: 4 },
            { id: "d", label: "Conformes MDR", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "dm-6-2",
          type: "scale",
          question: "Une veille réglementaire DM est-elle en place ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non", max: "Veille + impact assessment" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 2
        },
      ]
    },
  ]
}

export default ISO13485_TEMPLATE
