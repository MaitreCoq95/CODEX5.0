"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft,
  Clock,
  Play,
  BookOpen,
  CheckCircle2,
  ChevronRight,
  FileText,
  Video,
  HelpCircle
} from "lucide-react"
import Link from "next/link"

// Mock module data
const mockModule = {
  id: "cold-chain",
  title: "Gestion de la Chaîne du Froid",
  description: "Apprenez les bonnes pratiques pour maintenir l'intégrité de la chaîne du froid dans la distribution pharmaceutique.",
  category: "GDP",
  difficulty: "intermediate",
  estimatedDuration: 50,
  xpReward: 150,
  progress: 35,
  sections: [
    { id: "intro", title: "Introduction", type: "text", duration: 5, completed: true },
    { id: "regulations", title: "Réglementations Applicables", type: "text", duration: 10, completed: true },
    { id: "equipment", title: "Équipements et Qualification", type: "video", duration: 15, completed: false },
    { id: "monitoring", title: "Monitoring de Température", type: "text", duration: 10, completed: false },
    { id: "excursions", title: "Gestion des Excursions", type: "interactive", duration: 10, completed: false },
  ],
  quiz: {
    id: "quiz-cold-chain",
    questionsCount: 10,
    passingScore: 70,
    estimatedDuration: 15,
  },
  prerequisites: [
    { id: "gdp-intro", title: "Introduction aux GDP", completed: true },
    { id: "quality-system", title: "Système Qualité", completed: true },
  ],
}

function getSectionIcon(type: string) {
  switch (type) {
    case "video":
      return <Video className="w-4 h-4" />
    case "interactive":
      return <HelpCircle className="w-4 h-4" />
    default:
      return <FileText className="w-4 h-4" />
  }
}

export default function ModulePage({ params }: { params: { id: string } }) {
  const [currentSectionIndex, setCurrentSectionIndex] = useState(
    mockModule.sections.findIndex(s => !s.completed) || 0
  )
  
  const module = mockModule
  const completedSections = module.sections.filter(s => s.completed).length
  const progress = Math.round((completedSections / module.sections.length) * 100)
  
  return (
    <div className="space-y-6 p-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <Link href="/learning/path">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="w-5 h-5" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Badge>{module.category}</Badge>
            <Badge variant="outline">{module.difficulty}</Badge>
          </div>
          <h1 className="text-3xl font-bold">{module.title}</h1>
          <p className="text-muted-foreground mt-2">{module.description}</p>
          
          <div className="flex items-center gap-6 mt-4 text-sm text-muted-foreground">
            <span className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              ~{module.estimatedDuration} min
            </span>
            <span className="flex items-center gap-1">
              <BookOpen className="w-4 h-4" />
              {module.sections.length} sections
            </span>
            <span className="flex items-center gap-1 text-vyxo-gold">
              ⚡ {module.xpReward} XP
            </span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <Card className="bento-card">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Progression du module</span>
            <span className="font-medium">{progress}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Current Section Content */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                {getSectionIcon(module.sections[currentSectionIndex].type)}
                {module.sections[currentSectionIndex].title}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Placeholder content */}
              <div className="aspect-video bg-gradient-to-br from-vyxo-navy/50 to-vyxo-navy/30 rounded-xl flex items-center justify-center">
                <div className="text-center">
                  {module.sections[currentSectionIndex].type === "video" ? (
                    <>
                      <Play className="w-16 h-16 text-white/50 mx-auto mb-4" />
                      <p className="text-white/70">Vidéo de formation</p>
                    </>
                  ) : (
                    <>
                      <BookOpen className="w-16 h-16 text-white/50 mx-auto mb-4" />
                      <p className="text-white/70">Contenu de la section</p>
                    </>
                  )}
                </div>
              </div>
              
              <div className="prose prose-invert max-w-none">
                <p className="text-muted-foreground">
                  Cette section couvre les aspects essentiels de {module.sections[currentSectionIndex].title.toLowerCase()}.
                  Le contenu détaillé sera affiché ici avec du texte, des images et des exemples pratiques.
                </p>
              </div>

              {/* Navigation */}
              <div className="flex items-center justify-between pt-4 border-t">
                <Button 
                  variant="outline"
                  onClick={() => setCurrentSectionIndex(Math.max(0, currentSectionIndex - 1))}
                  disabled={currentSectionIndex === 0}
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Section précédente
                </Button>
                
                {currentSectionIndex < module.sections.length - 1 ? (
                  <Button 
                    className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
                    onClick={() => setCurrentSectionIndex(currentSectionIndex + 1)}
                  >
                    Section suivante
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                ) : (
                  <Link href={`/learning/modules/${params.id}/quiz`}>
                    <Button className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy">
                      Passer le Quiz
                      <ChevronRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Sections List */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="text-sm">Table des matières</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {module.sections.map((section, index) => (
                <div
                  key={section.id}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors ${
                    index === currentSectionIndex 
                      ? "bg-vyxo-gold/10 border border-vyxo-gold" 
                      : "hover:bg-secondary"
                  }`}
                  onClick={() => setCurrentSectionIndex(index)}
                >
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
                    section.completed 
                      ? "bg-emerald-500/10 text-emerald-500" 
                      : index === currentSectionIndex
                        ? "bg-vyxo-gold/10 text-vyxo-gold"
                        : "bg-secondary text-muted-foreground"
                  }`}>
                    {section.completed ? (
                      <CheckCircle2 className="w-4 h-4" />
                    ) : (
                      <span className="text-xs">{index + 1}</span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{section.title}</p>
                    <p className="text-xs text-muted-foreground flex items-center gap-1">
                      {getSectionIcon(section.type)}
                      {section.duration} min
                    </p>
                  </div>
                </div>
              ))}
              
              {/* Quiz */}
              <div className="border-t pt-2 mt-4">
                <Link href={`/learning/modules/${params.id}/quiz`}>
                  <div className="flex items-center gap-3 p-3 rounded-lg hover:bg-secondary transition-colors">
                    <div className="w-6 h-6 rounded-full bg-purple-500/10 text-purple-500 flex items-center justify-center">
                      <HelpCircle className="w-4 h-4" />
                    </div>
                    <div>
                      <p className="text-sm font-medium">Quiz de validation</p>
                      <p className="text-xs text-muted-foreground">
                        {module.quiz.questionsCount} questions • {module.quiz.estimatedDuration} min
                      </p>
                    </div>
                  </div>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Prerequisites */}
          <Card className="bento-card">
            <CardHeader>
              <CardTitle className="text-sm">Prérequis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {module.prerequisites.map((prereq) => (
                <div key={prereq.id} className="flex items-center gap-2 text-sm">
                  <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                  <span>{prereq.title}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
