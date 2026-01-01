// HACCP Document Generators - Food Safety
import { DocumentGenerator } from "./types"

export const HACCP_GENERATORS: DocumentGenerator[] = [
  {
    id: "gen-haccp-plan",
    templateId: "haccp-manuel",
    name: "Générateur Plan HACCP",
    description: "Créez votre plan HACCP conforme aux 7 principes Codex.",
    standard: "HACCP",
    category: "manuel",
    isPremium: true,
    estimatedMinutes: 25,
    outputFormat: "docx",
    steps: [
      {
        id: "step-company",
        title: "Établissement",
        description: "Informations sur votre établissement alimentaire",
        icon: "🏭",
        fields: [
          { id: "company_name", label: "Nom de l'établissement", type: "company_name", required: true },
          { id: "activity", label: "Type d'activité", type: "select", required: true, options: [
            { value: "restaurant", label: "Restauration" },
            { value: "traiteur", label: "Traiteur" },
            { value: "production", label: "Production alimentaire" },
            { value: "distribution", label: "Distribution alimentaire" },
          ]},
        ],
      },
      {
        id: "step-products",
        title: "Produits",
        description: "Description des produits fabriqués",
        icon: "🍽️",
        fields: [
          {
            id: "products",
            label: "Types de produits",
            type: "ai_assisted",
            required: true,
            aiPrompt: "Liste les catégories de produits typiques pour un établissement de {activity}. Format: liste à puces avec dangers associés (B/C/P).",
          },
        ],
      },
      {
        id: "step-ccps",
        title: "CCP",
        description: "Points critiques de maîtrise",
        icon: "⚠️",
        fields: [
          {
            id: "ccps",
            label: "Points Critiques pour la Maîtrise (CCP)",
            type: "ai_assisted",
            required: true,
            aiPrompt: "Identifie 3-5 CCP typiques pour un établissement de {activity}. Pour chaque CCP: danger maîtrisé, limite critique, surveillance. Format tableau.",
          },
        ],
      },
    ],
  },
]

export default HACCP_GENERATORS
