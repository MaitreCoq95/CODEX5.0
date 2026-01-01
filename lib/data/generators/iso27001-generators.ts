// ISO 27001 Document Generators - Cybersecurity
import { DocumentGenerator } from "./types"

export const ISO27001_GENERATORS: DocumentGenerator[] = [
  {
    id: "gen-iso27-pssi",
    templateId: "iso27-pssi",
    name: "Générateur PSSI",
    description: "Créez votre Politique de Sécurité des Systèmes d'Information personnalisée.",
    standard: "ISO_27001",
    category: "manuel",
    isPremium: true,
    estimatedMinutes: 20,
    outputFormat: "docx",
    steps: [
      {
        id: "step-org",
        title: "Organisation",
        description: "Contexte de votre organisation",
        icon: "🏢",
        fields: [
          { id: "company_name", label: "Nom de l'organisation", type: "company_name", required: true },
          { id: "sector", label: "Secteur d'activité", type: "select", required: true, options: [
            { value: "finance", label: "Finance / Banque" },
            { value: "sante", label: "Santé" },
            { value: "industrie", label: "Industrie" },
            { value: "services", label: "Services" },
            { value: "tech", label: "Tech / SaaS" },
          ]},
          { id: "rssi_name", label: "Nom du RSSI", type: "text", required: true },
        ],
      },
      {
        id: "step-scope",
        title: "Périmètre",
        description: "Définition du périmètre du SMSI",
        icon: "🎯",
        fields: [
          {
            id: "scope",
            label: "Périmètre du SMSI",
            type: "ai_assisted",
            required: true,
            aiPrompt: "Rédige le périmètre d'un SMSI ISO 27001 pour {company_name} dans le secteur {sector}. Inclure: activités couvertes, sites, systèmes d'information. 1 paragraphe.",
          },
          {
            id: "exclusions",
            label: "Exclusions",
            type: "textarea",
            placeholder: "Systèmes ou activités exclus du périmètre...",
          },
        ],
      },
      {
        id: "step-principles",
        title: "Principes",
        description: "Principes de sécurité fondamentaux",
        icon: "🔒",
        fields: [
          {
            id: "principles",
            label: "Principes de sécurité",
            type: "ai_assisted",
            required: true,
            aiPrompt: "Liste 6-8 principes fondamentaux de sécurité de l'information pour une PSSI. Format: liste numérotée avec titre et description courte.",
          },
        ],
      },
    ],
  },
]

export default ISO27001_GENERATORS
