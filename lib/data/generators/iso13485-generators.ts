// ISO 13485 Document Generators - Medical Devices
import { DocumentGenerator } from "./types"

export const ISO13485_GENERATORS: DocumentGenerator[] = [
  {
    id: "gen-dm-manuel",
    templateId: "dm-manuel-qualite",
    name: "Générateur Manuel Qualité DM",
    description: "Créez votre manuel qualité conforme ISO 13485 et MDR.",
    standard: "ISO_13485",
    category: "manuel",
    isPremium: true,
    estimatedMinutes: 30,
    outputFormat: "docx",
    steps: [
      {
        id: "step-company",
        title: "Fabricant",
        description: "Informations sur votre organisation",
        icon: "🏭",
        fields: [
          { id: "company_name", label: "Raison sociale", type: "company_name", required: true },
          { id: "srn", label: "Numéro SRN (EUDAMED)", type: "text", placeholder: "FR-MF-XXXXXX" },
          { id: "notified_body", label: "Organisme Notifié", type: "text", placeholder: "Ex: BSI, TÜV, GMED" },
        ],
      },
      {
        id: "step-products",
        title: "Dispositifs",
        description: "Types de dispositifs médicaux",
        icon: "🩺",
        fields: [
          { id: "device_class", label: "Classe de risque", type: "select", required: true, options: [
            { value: "I", label: "Classe I" },
            { value: "IIa", label: "Classe IIa" },
            { value: "IIb", label: "Classe IIb" },
            { value: "III", label: "Classe III" },
          ]},
          {
            id: "devices",
            label: "Types de dispositifs",
            type: "ai_assisted",
            required: true,
            aiPrompt: "Décris les dispositifs médicaux de classe {device_class} typiques et leurs applications cliniques. 1 paragraphe.",
          },
        ],
      },
      {
        id: "step-scope",
        title: "Périmètre SMQ",
        description: "Scope du système qualité",
        icon: "🎯",
        fields: [
          {
            id: "scope",
            label: "Périmètre du SMQ",
            type: "ai_assisted",
            required: true,
            aiPrompt: "Rédige le périmètre SMQ ISO 13485 pour {company_name}, fabricant de dispositifs classe {device_class}. Inclure conception, production, distribution. 1 paragraphe.",
          },
        ],
      },
    ],
  },
]

export default ISO13485_GENERATORS
