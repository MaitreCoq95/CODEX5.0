// ISO 27001 Information Security Management System - Diagnostic Questions
// Based on ISO 27001:2022 requirements

import { AssessmentTemplate } from "@/lib/types/assessment.types"

export const ISO27001_TEMPLATE: AssessmentTemplate = {
  id: "iso-27001-diagnostic",
  name: "Diagnostic ISO 27001:2022",
  description: "Évaluez votre maturité en sécurité de l'information selon ISO 27001",
  certification: "ISO_27001",
  version: "1.0",
  scoringMethod: "weighted",
  estimatedDuration: 30,
  questionsCount: 30,
  status: "published",
  isDemo: false,
  createdAt: new Date(),
  updatedAt: new Date(),
  maturityLevels: [
    { level: 1, name: "Initial", description: "Sécurité réactive et ad-hoc", minScore: 0, maxScore: 20, color: "#ef4444" },
    { level: 2, name: "Géré", description: "Processus de base en place", minScore: 21, maxScore: 40, color: "#f97316" },
    { level: 3, name: "Défini", description: "SMSI documenté et appliqué", minScore: 41, maxScore: 60, color: "#eab308" },
    { level: 4, name: "Maîtrisé", description: "Mesures et améliorations actives", minScore: 61, maxScore: 80, color: "#22c55e" },
    { level: 5, name: "Optimisé", description: "Excellence en cybersécurité", minScore: 81, maxScore: 100, color: "#10b981" },
  ],
  sections: [
    // A.5 Organizational Controls
    {
      id: "organizational",
      title: "Mesures organisationnelles",
      description: "Politiques, rôles et responsabilités",
      icon: "🏛️",
      weight: 15,
      order: 1,
      questions: [
        {
          id: "iso27-5-1",
          type: "single_choice",
          question: "Disposez-vous d'une politique de sécurité de l'information approuvée ?",
          required: true,
          options: [
            { id: "a", label: "Aucune politique", value: "0", score: 0 },
            { id: "b", label: "Politique informelle", value: "1", score: 2 },
            { id: "c", label: "Politique documentée mais ancienne", value: "2", score: 3 },
            { id: "d", label: "Politique à jour et communiquée", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "iso27-5-2",
          type: "scale",
          question: "Les rôles et responsabilités sécurité sont-ils clairement définis ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non définis", max: "Matrice RACI complète" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 2
        },
        {
          id: "iso27-5-3",
          type: "scale",
          question: "Un inventaire des actifs informationnels existe-t-il ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non", max: "Inventaire classifié à jour" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 3
        },
      ]
    },
    // A.6 People Controls
    {
      id: "people",
      title: "Mesures liées aux personnes",
      description: "RH, sensibilisation, formation",
      icon: "👥",
      weight: 15,
      order: 2,
      questions: [
        {
          id: "iso27-6-1",
          type: "single_choice",
          question: "Des vérifications sont-elles effectuées avant embauche ?",
          required: true,
          options: [
            { id: "a", label: "Aucune vérification", value: "0", score: 0 },
            { id: "b", label: "Vérification basique CV", value: "1", score: 2 },
            { id: "c", label: "Background check", value: "2", score: 4 },
            { id: "d", label: "Vérifications selon niveau d'accès", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 1
        },
        {
          id: "iso27-6-2",
          type: "scale",
          question: "La sensibilisation à la sécurité est-elle régulière ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Aucune", max: "Programme continu + tests" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
        {
          id: "iso27-6-3",
          type: "scale",
          question: "Les accès sont-ils révoqués lors des départs ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non systématique", max: "Processus automatisé" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 3
        },
      ]
    },
    // A.7 Physical Controls
    {
      id: "physical",
      title: "Mesures physiques",
      description: "Sécurité des locaux et équipements",
      icon: "🔐",
      weight: 10,
      order: 3,
      questions: [
        {
          id: "iso27-7-1",
          type: "scale",
          question: "Les locaux sensibles sont-ils protégés par contrôle d'accès ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Aucun contrôle", max: "Biométrie + logs" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 1
        },
        {
          id: "iso27-7-2",
          type: "scale",
          question: "Les équipements sont-ils protégés contre les risques environnementaux ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non protégés", max: "Datacenter sécurisé" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 2
        },
      ]
    },
    // A.8 Technological Controls
    {
      id: "technical",
      title: "Mesures technologiques",
      description: "Contrôles d'accès, cryptographie, sécurité réseau",
      icon: "💻",
      weight: 25,
      order: 4,
      questions: [
        {
          id: "iso27-8-1",
          type: "single_choice",
          question: "Comment gérez-vous les droits d'accès aux systèmes ?",
          required: true,
          options: [
            { id: "a", label: "Pas de gestion formelle", value: "0", score: 0 },
            { id: "b", label: "Gestion manuelle", value: "1", score: 2 },
            { id: "c", label: "Processus documenté", value: "2", score: 4 },
            { id: "d", label: "IAM centralisé + revues périodiques", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "iso27-8-2",
          type: "scale",
          question: "L'authentification forte (MFA) est-elle déployée ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non", max: "MFA généralisé" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
        {
          id: "iso27-8-3",
          type: "scale",
          question: "Les données sensibles sont-elles chiffrées (repos + transit) ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non chiffrées", max: "Chiffrement complet" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 3
        },
        {
          id: "iso27-8-4",
          type: "scale",
          question: "Un antimalware est-il déployé et maintenu à jour ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non", max: "EDR/XDR managé" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 4
        },
        {
          id: "iso27-8-5",
          type: "scale",
          question: "Les sauvegardes sont-elles régulières et testées ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non", max: "Backup 3-2-1 + tests" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 5
        },
        {
          id: "iso27-8-6",
          type: "scale",
          question: "Les vulnérabilités sont-elles scannées et corrigées ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Jamais", max: "Scans continus + patch management" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 6
        },
      ]
    },
    // Risk Management & Incident
    {
      id: "risk",
      title: "Gestion des risques et incidents",
      description: "Analyse de risques et gestion des incidents",
      icon: "⚠️",
      weight: 20,
      order: 5,
      questions: [
        {
          id: "iso27-risk-1",
          type: "single_choice",
          question: "Une analyse de risques sécurité a-t-elle été réalisée ?",
          required: true,
          options: [
            { id: "a", label: "Non", value: "0", score: 0 },
            { id: "b", label: "Analyse informelle", value: "1", score: 2 },
            { id: "c", label: "Analyse documentée mais ancienne", value: "2", score: 3 },
            { id: "d", label: "Analyse méthodologique régulière", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 2, critical: true },
          order: 1
        },
        {
          id: "iso27-risk-2",
          type: "scale",
          question: "Un processus de gestion des incidents sécurité existe-t-il ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non", max: "SIEM + SOC + procédures" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 2
        },
        {
          id: "iso27-risk-3",
          type: "scale",
          question: "Un plan de continuité d'activité (PCA/PRA) existe-t-il ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non", max: "PCA testé annuellement" },
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 3
        },
      ]
    },
    // Compliance & Audit
    {
      id: "compliance",
      title: "Conformité et audit",
      description: "Audits internes et conformité",
      icon: "✅",
      weight: 15,
      order: 6,
      questions: [
        {
          id: "iso27-comp-1",
          type: "single_choice",
          question: "Des audits internes sécurité sont-ils réalisés ?",
          required: true,
          options: [
            { id: "a", label: "Aucun audit", value: "0", score: 0 },
            { id: "b", label: "Audits occasionnels", value: "1", score: 2 },
            { id: "c", label: "Programme d'audit annuel", value: "2", score: 4 },
            { id: "d", label: "Audits + pentests réguliers", value: "3", score: 5 },
          ],
          scoring: { maxPoints: 5, weight: 1.5, critical: true },
          order: 1
        },
        {
          id: "iso27-comp-2",
          type: "scale",
          question: "Les exigences légales (RGPD, etc.) sont-elles identifiées et suivies ?",
          required: true,
          scaleMin: 1,
          scaleMax: 5,
          scaleLabels: { min: "Non identifiées", max: "Veille + conformité" },
          scoring: { maxPoints: 5, weight: 1, critical: false },
          order: 2
        },
      ]
    },
  ]
}

export default ISO27001_TEMPLATE
