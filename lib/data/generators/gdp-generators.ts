// GDP Document Generators - Pharma Distribution
import { DocumentGenerator } from "./types"

export const GDP_GENERATORS: DocumentGenerator[] = [
  {
    id: "gen-gdp-manuel",
    templateId: "gdp-manuel-qualite",
    name: "Générateur Manuel Qualité GDP",
    description: "Créez votre manuel qualité GDP conforme aux BPD européennes.",
    standard: "GDP",
    category: "manuel",
    isPremium: true,
    estimatedMinutes: 25,
    outputFormat: "docx",
    steps: [
      {
        id: "step-company",
        title: "Établissement",
        description: "Informations sur votre établissement pharmaceutique",
        icon: "🏥",
        fields: [
          { id: "company_name", label: "Raison sociale", type: "company_name", required: true },
          { id: "license_number", label: "N° d'autorisation ANSM", type: "text", required: true, placeholder: "Ex: 2024-XXXX" },
          { id: "pr_name", label: "Nom du Pharmacien Responsable", type: "text", required: true },
        ],
      },
      {
        id: "step-activities",
        title: "Activités",
        description: "Types d'activités couvertes",
        icon: "📦",
        fields: [
          {
            id: "activities",
            label: "Activités de distribution",
            type: "ai_assisted",
            required: true,
            aiPrompt: "Liste les activités de distribution pharmaceutique typiques pour un grossiste-répartiteur. Format: liste à puces, 5-6 activités principales.",
          },
          {
            id: "product_types",
            label: "Types de produits distribués",
            type: "select",
            required: true,
            options: [
              { value: "all", label: "Tous médicaments" },
              { value: "generics", label: "Génériques uniquement" },
              { value: "cold_chain", label: "Produits thermosensibles" },
              { value: "controlled", label: "Stupéfiants/Psychotropes" },
            ],
          },
        ],
      },
      {
        id: "step-premises",
        title: "Locaux",
        description: "Description des installations",
        icon: "🏢",
        fields: [
          {
            id: "premises_description",
            label: "Description des locaux",
            type: "ai_assisted",
            required: true,
            aiPrompt: "Rédige une description type des locaux d'un établissement GDP avec zones de réception, stockage (+15/+25°C), chambre froide (+2/+8°C), expédition. 1 paragraphe professionnel.",
          },
        ],
      },
    ],
  },
]

export default GDP_GENERATORS
