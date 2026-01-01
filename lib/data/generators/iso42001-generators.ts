// ISO 42001 Document Generators - AI Governance
import { DocumentGenerator } from "./types"

export const ISO42001_GENERATORS: DocumentGenerator[] = [
  {
    id: "gen-ai-charte",
    templateId: "ai-charte-ethique",
    name: "Générateur Charte Éthique IA",
    description: "Créez votre charte éthique pour l'utilisation de l'IA.",
    standard: "ISO_42001",
    category: "manuel",
    isPremium: true,
    estimatedMinutes: 15,
    outputFormat: "docx",
    steps: [
      {
        id: "step-org",
        title: "Organisation",
        description: "Contexte de votre entreprise",
        icon: "🏢",
        fields: [
          { id: "company_name", label: "Nom de l'entreprise", type: "company_name", required: true },
          { id: "ai_usage", label: "Usage principal de l'IA", type: "select", required: true, options: [
            { value: "automation", label: "Automatisation de processus" },
            { value: "analytics", label: "Analyse de données" },
            { value: "customer", label: "Relation client (chatbots)" },
            { value: "product", label: "Produit/Service IA" },
          ]},
        ],
      },
      {
        id: "step-principles",
        title: "Principes",
        description: "Principes éthiques fondamentaux",
        icon: "⚖️",
        fields: [
          {
            id: "principles",
            label: "Principes éthiques IA",
            type: "ai_assisted",
            required: true,
            aiPrompt: "Rédige 6 principes éthiques pour l'utilisation de l'IA chez {company_name}. Inclure: transparence, équité, respect vie privée, responsabilité humaine. Format: liste avec description.",
          },
        ],
      },
      {
        id: "step-governance",
        title: "Gouvernance",
        description: "Structure de gouvernance IA",
        icon: "👥",
        fields: [
          {
            id: "governance",
            label: "Gouvernance IA",
            type: "ai_assisted",
            required: true,
            aiPrompt: "Décris une structure de gouvernance IA pour {company_name}: comité éthique, rôles (AI Officer, DPO), processus de validation. 2-3 paragraphes.",
          },
        ],
      },
    ],
  },
]

export default ISO42001_GENERATORS
