// Sûreté Aéroportuaire Document Generators
import { DocumentGenerator } from "./types"

export const SURETE_GENERATORS: DocumentGenerator[] = [
  {
    id: "gen-sur-programme",
    templateId: "sur-programme",
    name: "Générateur Programme de Sûreté",
    description: "Créez votre programme de sûreté ACC3/RA3/KC3.",
    standard: "SURETE",
    category: "manuel",
    isPremium: true,
    estimatedMinutes: 30,
    outputFormat: "docx",
    steps: [
      {
        id: "step-company",
        title: "Établissement",
        description: "Informations sur votre entité",
        icon: "✈️",
        fields: [
          { id: "company_name", label: "Raison sociale", type: "company_name", required: true },
          { id: "status", label: "Statut visé", type: "select", required: true, options: [
            { value: "ACC3", label: "ACC3 (Transporteur aérien cargo)" },
            { value: "RA3", label: "RA3 (Agent habilité)" },
            { value: "KC3", label: "KC3 (Chargeur connu)" },
          ]},
          { id: "authority", label: "Autorité compétente", type: "text", defaultValue: "DGAC" },
        ],
      },
      {
        id: "step-organization",
        title: "Organisation",
        description: "Structure de sûreté",
        icon: "👥",
        fields: [
          { id: "security_manager", label: "Responsable sûreté", type: "text", required: true },
          {
            id: "organization",
            label: "Organisation sûreté",
            type: "ai_assisted",
            required: true,
            aiPrompt: "Décris l'organisation type de la fonction sûreté pour un {status}. Inclure: responsable, suppléant, comité. 1-2 paragraphes.",
          },
        ],
      },
      {
        id: "step-measures",
        title: "Mesures",
        description: "Mesures de sûreté",
        icon: "🔐",
        fields: [
          {
            id: "measures",
            label: "Mesures de sûreté",
            type: "ai_assisted",
            required: true,
            aiPrompt: "Liste les mesures de sûreté obligatoires pour un {status} selon le règlement UE 2015/1998. Format: liste structurée par catégorie (accès, formation, inspection).",
          },
        ],
      },
    ],
  },
]

export default SURETE_GENERATORS
