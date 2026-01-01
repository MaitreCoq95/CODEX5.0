// Sûreté Aéroportuaire - Diagnostic Questions
// Based on EU Regulation 2015/1998 (11.2.x requirements)

import { AssessmentTemplate } from "@/lib/types/assessment.types"

export const SURETE_TEMPLATE: AssessmentTemplate = {
  id: "surete-aero-diagnostic",
  name: "Diagnostic Sûreté Aéroportuaire",
  description: "Évaluez votre conformité aux exigences de sûreté aérienne (Règlement UE 2015/1998)",
  certification: "SURETE",
  version: "1.0",
  scoringMethod: "weighted",
  estimatedDuration: 20,
  questionsCount: 20,
  status: "published",
  isDemo: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  maturityLevels: [
    { level: 1, name: "Non conforme", description: "Risques majeurs de non-conformité", minScore: 0, maxScore: 20, color: "#ef4444" },
    { level: 2, name: "Insuffisant", description: "Lacunes importantes", minScore: 21, maxScore: 40, color: "#f97316" },
    { level: 3, name: "Acceptable", description: "Conformité de base", minScore: 41, maxScore: 60, color: "#eab308" },
    { level: 4, name: "Conforme", description: "Exigences respectées", minScore: 61, maxScore: 80, color: "#22c55e" },
    { level: 5, name: "Exemplaire", description: "Best practices sûreté", minScore: 81, maxScore: 100, color: "#10b981" },
  ],
  sections: [
    // 11.2.2 - Designation & Organization
    {
      id: "organization",
      title: "11.2.2 - Désignation et organisation",
      description: "Statut EU ACC3/RA3/KC3 et organisation",
      icon: "🏢",
      weight: 20,
      order: 1,
      questions: [
        {
          id: "sur-2-1",
          type: "single_choice",
          question: "Disposez-vous d'un statut ACC3/RA3/KC3 valide ?",
          required: true,
          options: [
            { id: "a", label: "Non désigné", value: "0", score: 0 },
            { id: "b", label: "En cours de désignation", value: "1", score: 2 },
            { id: "c", label: "Désigné mais expirant", value: "2", score: 3 },
            { id: "d", label: "Désigné et valide", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 1
        },
        {
          id: "sur-2-2",
          type: "scale",
          question: "Un responsable sûreté est-il désigné avec autorité suffisante ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non désigné", max: "Désigné + formation + autorité" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
      ]
    },
    // 11.2.3 - Security Program
    {
      id: "program",
      title: "11.2.3 - Programme de sûreté",
      description: "Documentation et programme de sûreté",
      icon: "📋",
      weight: 20,
      order: 2,
      questions: [
        {
          id: "sur-3-1",
          type: "single_choice",
          question: "Un programme de sûreté documenté existe-t-il ?",
          required: true,
          options: [
            { id: "a", label: "Non", value: "0", score: 0 },
            { id: "b", label: "En cours de rédaction", value: "1", score: 2 },
            { id: "c", label: "Programme existant mais incomplet", value: "2", score: 3 },
            { id: "d", label: "Programme complet et approuvé", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 1
        },
        {
          id: "sur-3-2",
          type: "scale",
          question: "Le programme est-il révisé régulièrement ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Jamais révisé", max: "Révision annuelle documentée" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 2
        },
      ]
    },
    // 11.2.4 - Recruitment & Training
    {
      id: "training",
      title: "11.2.4 - Recrutement et formation",
      description: "Vérification des antécédents et formation",
      icon: "👥",
      weight: 20,
      order: 3,
      questions: [
        {
          id: "sur-4-1",
          type: "single_choice",
          question: "Les vérifications d'antécédents sont-elles systématiques ?",
          required: true,
          options: [
            { id: "a", label: "Non réalisées", value: "0", score: 0 },
            { id: "b", label: "Vérifications partielles", value: "1", score: 2 },
            { id: "c", label: "Vérifications standard", value: "2", score: 4 },
            { id: "d", label: "Background check + extrait casier", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 1
        },
        {
          id: "sur-4-2",
          type: "scale",
          question: "Le personnel reçoit-il une formation sûreté initiale et récurrente ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Aucune formation", max: "Formation 11.2.7 + recyclage" },
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 2
        },
        {
          id: "sur-4-3",
          type: "scale",
          question: "Les dossiers de formation sont-ils conservés et à jour ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non conservés", max: "Archivage conforme 5 ans" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 3
        },
      ]
    },
    // 11.2.5 - Physical Security
    {
      id: "physical",
      title: "11.2.5 - Sécurité physique",
      description: "Protection des locaux et contrôle d'accès",
      icon: "🔐",
      weight: 20,
      order: 4,
      questions: [
        {
          id: "sur-5-1",
          type: "scale",
          question: "Les zones sécurisées sont-elles protégées contre les accès non autorisés ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non protégées", max: "Contrôle d'accès + CCTV + alarmes" },
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 1
        },
        {
          id: "sur-5-2",
          type: "scale",
          question: "Les véhicules et équipements sont-ils sécurisés ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non sécurisés", max: "Scellés + procédures" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
      ]
    },
    // 11.2.6 - Cargo Screening
    {
      id: "screening",
      title: "11.2.6 - Contrôle du fret",
      description: "Inspection et sûreté du fret",
      icon: "📦",
      weight: 15,
      order: 5,
      questions: [
        {
          id: "sur-6-1",
          type: "single_choice",
          question: "Les méthodes d'inspection du fret sont-elles conformes aux exigences ?",
          required: true,
          options: [
            { id: "a", label: "Pas d'inspection", value: "0", score: 0 },
            { id: "b", label: "Inspection visuelle uniquement", value: "1", score: 2 },
            { id: "c", label: "Méthodes approuvées", value: "2", score: 4 },
            { id: "d", label: "Multi-méthodes + équipements homologués", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 1
        },
        {
          id: "sur-6-2",
          type: "scale",
          question: "La chaîne de sûreté est-elle maintenue jusqu'au chargement ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non maîtrisée", max: "Procédures + traçabilité" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
      ]
    },
    // Internal Audit & Continuous Improvement
    {
      id: "audit",
      title: "Audits et amélioration",
      description: "Auto-évaluation et amélioration continue",
      icon: "✅",
      weight: 5,
      order: 6,
      questions: [
        {
          id: "sur-7-1",
          type: "single_choice",
          question: "Réalisez-vous des auto-évaluations sûreté régulières ?",
          required: true,
          options: [
            { id: "a", label: "Jamais", value: "0", score: 0 },
            { id: "b", label: "Occasionnellement", value: "1", score: 2 },
            { id: "c", label: "Annuellement", value: "2", score: 4 },
            { id: "d", label: "Semestriellement + actions correctives", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 1
        },
      ]
    },
  ]
}

export default SURETE_TEMPLATE
