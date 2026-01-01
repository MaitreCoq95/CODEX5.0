import { CERTIFICATIONS } from "./multi-norms-service"

export interface Lesson {
  id: string
  title: string
  duration: string // e.g. "10 min"
  type: "video" | "text" | "quiz"
  content?: string // Markdown content or video URL
  isCompleted?: boolean
}

export interface Chapter {
  id: string
  title: string
  lessons: Lesson[]
}

export interface TrainingModule {
  id: string
  title: string // e.g. "HACCP Expert"
  description: string
  icon: string
  level: "Beginner" | "Intermediate" | "Advanced"
  duration: string // Total duration
  vertical: "pharma" | "cyber" | "ops" | "surete" | "food" | "medtech"
  certificationId?: string // Link to an assessment
  referencePdf?: string // Filename in app/docs/references
  chapters: Chapter[]
}

export const TRAINING_MODULES: TrainingModule[] = [
  {
    id: "haccp-master",
    title: "HACCP Master Class",
    description: "Maîtrisez les 7 principes HACCP et la sécurité des denrées alimentaires.",
    icon: "🍽️",
    level: "Advanced",
    duration: "4h 30min",
    vertical: "food",
    certificationId: "HACCP",
    chapters: [
      {
        id: "chap-1",
        title: "Introduction et Contexte",
        lessons: [
          { id: "l1", title: "Les enjeux de la sécurité alimentaire", duration: "15 min", type: "text", content: "Contenu sur les enjeux sanitaires et économiques..." },
          { id: "l2", title: "Le Codex Alimentarius", duration: "20 min", type: "text", content: "Présentation du standard international..." }
        ]
      },
      {
        id: "chap-2",
        title: "Les 12 Étapes et 7 Principes",
        lessons: [
          { id: "l3", title: "Constitution de l'équipe HACCP", duration: "10 min", type: "text" },
          { id: "l4", title: "Analyse des dangers (Principe 1)", duration: "45 min", type: "text" },
          { id: "l5", title: "Détermination des CCP (Principe 2)", duration: "30 min", type: "text" }
        ]
      },
      {
        id: "chap-quiz",
        title: "Validation des Acquis",
        lessons: [
          { id: "qm1", title: "Quiz HACCP", duration: "15 min", type: "quiz" }
        ]
      }
    ]
  },
  {
    id: "gdp-pharma",
    title: "GDP Pharma (Bonnes Pratiques de Distribution)",
    description: "Formation conforme au B.O. 2014-9bis sur la distribution des médicaments.",
    icon: "💊",
    level: "Intermediate",
    duration: "3h 00min",
    vertical: "pharma",
    certificationId: "GDP",
    referencePdf: "GDP BO 2014-9bis du 17-06-2014.pdf",
    chapters: [
      {
        id: "gdp-1",
        title: "Système Qualité",
        lessons: [
           { id: "g1", title: "Responsabilités et Management", duration: "20 min", type: "text" }
        ]
      },
      {
        id: "gdp-2",
        title: "Opérations",
        lessons: [
           { id: "g2", title: "Réception et Stockage", duration: "25 min", type: "text" },
           { id: "g3", title: "Transport et Chaîne du Froid", duration: "30 min", type: "text" }
        ]
      }
    ]
  },
  {
    id: "iso-42001-ia",
    title: "Gouvernance IA (ISO 42001)",
    description: "Comprendre et implémenter un AIMS (AI Management System).",
    icon: "🤖",
    level: "Advanced",
    duration: "5h 00min",
    vertical: "cyber",
    certificationId: "ISO42001",
    referencePdf: "ISO42001 AI Bonne version.pdf",
    chapters: [
      {
        id: "ia-1",
        title: "Fondamentaux ISO 42001",
        lessons: [
          { id: "ia1", title: "Contexte et Enjeux de l'IA de confiance", duration: "20 min", type: "text" }
        ]
      },
      {
        id: "ia-2",
        title: "Gestion des Risques IA",
        lessons: [
          { id: "ia2", title: "Analyse d'impact algorithmique", duration: "40 min", type: "text" },
          { id: "ia3", title: "Biais et Éthique", duration: "30 min", type: "text" }
        ]
      }
    ]
  },
  {
    id: "surete-11-2-6",
    title: "Sûreté Aéroportuaire",
    description: "Formation générale à la sûreté (11.2.6) selon le règlement UE 2015/1998.",
    icon: "✈️",
    level: "Beginner",
    duration: "2h 30min",
    vertical: "surete",
    certificationId: "SURETE_11_2_1",
    referencePdf: "Sûreté aeroporturaire - CELEX_02015R1998-20230101_FR_TXT.pdf",
    chapters: [
       {
         id: "avsec-1",
         title: "Menace et Réglementation",
         lessons: [
           { id: "s1", title: "La menace terroriste", duration: "15 min", type: "text" },
           { id: "s2", title: "Cadre réglementaire UE", duration: "20 min", type: "text" }
         ]
       }
    ]
  },
  {
    id: "medtech-iso-13485",
    title: "Dispositifs Médicaux (ISO 13485)",
    description: "Système de management de la qualité pour les dispositifs médicaux.",
    icon: "🩺",
    level: "Advanced",
    duration: "6h 00min",
    vertical: "medtech", // Using custom vertical for mapping, fits in Ops/Pharma broadly
    referencePdf: "ISO-13485-2016F.pdf",
    chapters: [
      {
        id: "iso13-1",
        title: "Exigences SMQ",
        lessons: [
          { id: "m1", title: "Documentation et Enregistrements", duration: "30 min", type: "text" }
        ]
      },
      {
         id: "iso13-2",
         title: "Gestion des Risques (ISO 14971)",
         lessons: [
           { id: "m2", title: "Analyse des risques", duration: "45 min", type: "text" }
         ]
      }
    ]
  }
]

export function getModuleById(id: string): TrainingModule | undefined {
  return TRAINING_MODULES.find(m => m.id === id)
}

export function getModulesByVertical(vertical: string) {
  return TRAINING_MODULES.filter(m => m.vertical === vertical)
}
