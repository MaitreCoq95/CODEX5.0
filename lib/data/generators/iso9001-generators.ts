// ISO 9001 Document Generators - Wizard configurations
import { DocumentGenerator } from "./types"

export const ISO9001_GENERATORS: DocumentGenerator[] = [
  {
    id: "gen-politique-qualite",
    templateId: "tpl-politique-qualite",
    name: "Générateur Politique Qualité",
    description: "Créez votre politique qualité personnalisée en 5 minutes avec l'aide de l'IA.",
    standard: "ISO_9001",
    category: "manuel",
    isPremium: true,
    estimatedMinutes: 5,
    outputFormat: "docx",
    steps: [
      {
        id: "step-company",
        title: "Votre Entreprise",
        description: "Informations générales sur votre organisation",
        icon: "🏢",
        fields: [
          {
            id: "company_name",
            label: "Nom de l'entreprise",
            type: "company_name",
            required: true,
            placeholder: "Ex: Acme Industries SAS",
          },
          {
            id: "activity",
            label: "Activité principale",
            type: "text",
            required: true,
            placeholder: "Ex: Fabrication de composants électroniques",
          },
          {
            id: "sector",
            label: "Secteur d'activité",
            type: "select",
            required: true,
            options: [
              { value: "manufacturing", label: "Industrie / Fabrication" },
              { value: "services", label: "Services" },
              { value: "distribution", label: "Distribution / Logistique" },
              { value: "tech", label: "Technologies / IT" },
              { value: "healthcare", label: "Santé" },
              { value: "other", label: "Autre" },
            ],
          },
        ],
      },
      {
        id: "step-scope",
        title: "Périmètre du SMQ",
        description: "Définissez le scope de votre système qualité",
        icon: "🎯",
        fields: [
          {
            id: "scope",
            label: "Périmètre du système de management",
            type: "ai_assisted",
            required: true,
            placeholder: "Décrivez les activités couvertes par votre SMQ...",
            aiPrompt: "Génère un paragraphe de périmètre SMQ ISO 9001 pour une entreprise de {sector} spécialisée dans {activity}. Maximum 3 phrases, style professionnel.",
            helpText: "L'IA peut vous aider à rédiger ce paragraphe",
          },
          {
            id: "sites",
            label: "Sites concernés",
            type: "textarea",
            placeholder: "Siège social: ...\nSite de production: ...",
          },
        ],
      },
      {
        id: "step-commitment",
        title: "Engagements Direction",
        description: "Les engagements de la direction envers la qualité",
        icon: "✍️",
        fields: [
          {
            id: "commitment",
            label: "Engagement de la direction",
            type: "ai_assisted",
            required: true,
            placeholder: "La direction de [entreprise] s'engage à...",
            aiPrompt: "Rédige un paragraphe d'engagement de la direction pour la politique qualité ISO 9001 de {company_name}, entreprise de {activity}. Mentionne: satisfaction client, amélioration continue, conformité réglementaire. 4-5 phrases, ton formel.",
          },
        ],
      },
      {
        id: "step-objectives",
        title: "Axes Stratégiques",
        description: "Les orientations qualité de votre entreprise",
        icon: "📈",
        fields: [
          {
            id: "objectives",
            label: "Axes stratégiques qualité",
            type: "ai_assisted",
            required: true,
            placeholder: "1. Satisfaction client\n2. Excellence opérationnelle\n3. ...",
            aiPrompt: "Propose 4-5 axes stratégiques qualité pour {company_name}, une entreprise de {sector} dans {activity}. Format: liste numérotée avec un titre et une phrase d'explication pour chaque axe.",
          },
        ],
      },
      {
        id: "step-signature",
        title: "Validation",
        description: "Signature et date d'application",
        icon: "✅",
        fields: [
          {
            id: "director_name",
            label: "Nom du Directeur Général",
            type: "text",
            required: true,
            placeholder: "Ex: Jean Dupont",
          },
          {
            id: "director_title",
            label: "Fonction",
            type: "text",
            defaultValue: "Directeur Général",
          },
          {
            id: "effective_date",
            label: "Date d'application",
            type: "date",
            required: true,
          },
          {
            id: "version",
            label: "Version du document",
            type: "text",
            defaultValue: "1.0",
          },
        ],
      },
    ],
  },
  {
    id: "gen-manuel-qualite",
    templateId: "tpl-manuel-qualite",
    name: "Générateur Manuel Qualité",
    description: "Générez votre manuel qualité complet avec l'assistance IA.",
    standard: "ISO_9001",
    category: "manuel",
    isPremium: true,
    estimatedMinutes: 30,
    outputFormat: "docx",
    steps: [
      {
        id: "step-intro",
        title: "Présentation",
        description: "Introduction et contexte de l'entreprise",
        icon: "📖",
        fields: [
          {
            id: "company_name",
            label: "Nom de l'entreprise",
            type: "company_name",
            required: true,
          },
          {
            id: "presentation",
            label: "Présentation de l'entreprise",
            type: "ai_assisted",
            required: true,
            placeholder: "Historique, activités, valeurs...",
            aiPrompt: "Rédige une présentation d'entreprise pour le Manuel Qualité ISO 9001 de {company_name}. Inclure: historique succinct, activités principales, effectif, valeurs. 1 paragraphe professionnel.",
          },
        ],
      },
      {
        id: "step-context",
        title: "Contexte",
        description: "Enjeux internes et externes",
        icon: "🌐",
        fields: [
          {
            id: "internal_issues",
            label: "Enjeux internes",
            type: "ai_assisted",
            required: true,
            aiPrompt: "Liste 5 enjeux internes typiques pour une entreprise de {sector} dans le cadre ISO 9001. Format: liste à puces, une phrase par enjeu.",
          },
          {
            id: "external_issues",
            label: "Enjeux externes",
            type: "ai_assisted",
            required: true,
            aiPrompt: "Liste 5 enjeux externes typiques pour une entreprise de {sector} dans le cadre ISO 9001. Format: liste à puces, une phrase par enjeu.",
          },
        ],
      },
      {
        id: "step-parties",
        title: "Parties Intéressées",
        description: "Identification des parties prenantes",
        icon: "👥",
        fields: [
          {
            id: "stakeholders",
            label: "Parties intéressées et leurs attentes",
            type: "ai_assisted",
            required: true,
            aiPrompt: "Génère un tableau des parties intéressées pour {company_name} (secteur {sector}). Format: pour chaque partie (clients, employés, fournisseurs, actionnaires, autorités), lister 2-3 attentes clés.",
          },
        ],
      },
    ],
  },
  {
    id: "gen-procedure-capa",
    templateId: "tpl-procedure-capa",
    name: "Générateur Procédure CAPA",
    description: "Créez votre procédure d'actions correctives personnalisée.",
    standard: "ISO_9001",
    category: "procedure",
    isPremium: true,
    estimatedMinutes: 15,
    outputFormat: "docx",
    steps: [
      {
        id: "step-info",
        title: "Informations Générales",
        description: "Contexte de la procédure",
        icon: "📋",
        fields: [
          {
            id: "company_name",
            label: "Nom de l'entreprise",
            type: "company_name",
            required: true,
          },
          {
            id: "process_owner",
            label: "Responsable du processus",
            type: "text",
            required: true,
            placeholder: "Ex: Responsable Qualité",
          },
        ],
      },
      {
        id: "step-sources",
        title: "Sources de Détection",
        description: "D'où proviennent les non-conformités",
        icon: "🔍",
        fields: [
          {
            id: "detection_sources",
            label: "Sources de détection des NC",
            type: "ai_assisted",
            required: true,
            aiPrompt: "Liste les sources typiques de détection de non-conformités pour une entreprise de {sector}. Format: liste à puces avec 6-8 sources (audits, réclamations, contrôles, etc.)",
          },
        ],
      },
      {
        id: "step-analysis",
        title: "Méthodes d'Analyse",
        description: "Outils d'analyse des causes",
        icon: "🧠",
        fields: [
          {
            id: "analysis_methods",
            label: "Méthodes d'analyse des causes",
            type: "select",
            required: true,
            options: [
              { value: "5whys", label: "5 Pourquoi" },
              { value: "ishikawa", label: "Diagramme d'Ishikawa" },
              { value: "pareto", label: "Analyse Pareto" },
              { value: "brainstorming", label: "Brainstorming" },
              { value: "all", label: "Toutes les méthodes" },
            ],
          },
          {
            id: "analysis_guidance",
            label: "Guide d'utilisation des méthodes",
            type: "ai_assisted",
            aiPrompt: "Explique brièvement comment utiliser la méthode {analysis_methods} pour analyser les causes d'une non-conformité. 3-4 phrases pratiques.",
          },
        ],
      },
    ],
  },
]

export default ISO9001_GENERATORS
