"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { getModuleById, Chapter, Lesson } from "@/lib/services/learning-service"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ChevronLeft, ChevronRight, CheckCircle, PlayCircle, Lock, Download, FileText, Trophy } from "lucide-react"
import Link from "next/link"

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const router = useRouter()
  const module = getModuleById(params.courseId)
  
  const [activeChapterIndex, setActiveChapterIndex] = useState(0)
  const [activeLessonIndex, setActiveLessonIndex] = useState(0)
  const [showCertificate, setShowCertificate] = useState(false)

  if (!module) {
    return <div className="p-8">Course not found</div>
  }

  const activeChapter = module.chapters[activeChapterIndex]
  const activeLesson = activeChapter?.lessons[activeLessonIndex]
  
  // Flatten lessons for easier navigation
  const allLessons: { cIdx: number, lIdx: number, lesson: Lesson }[] = []
  module.chapters.forEach((c, cIdx) => {
    c.lessons.forEach((l, lIdx) => {
      allLessons.push({ cIdx, lIdx, lesson: l })
    })
  })

  const currentGlobalIndex = allLessons.findIndex(
    item => item.cIdx === activeChapterIndex && item.lIdx === activeLessonIndex
  )

  const handleNext = () => {
    if (currentGlobalIndex < allLessons.length - 1) {
      const next = allLessons[currentGlobalIndex + 1]
      setActiveChapterIndex(next.cIdx)
      setActiveLessonIndex(next.lIdx)
    } else {
      setShowCertificate(true)
    }
  }

  const handlePrev = () => {
    if (currentGlobalIndex > 0) {
      const prev = allLessons[currentGlobalIndex - 1]
      setActiveChapterIndex(prev.cIdx)
      setActiveLessonIndex(prev.lIdx)
    }
  }

  return (
    <div className="flex flex-col h-[calc(100vh-theme(spacing.20))]">
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b pb-4 mb-4">
        <div className="flex items-center gap-4">
          <Link href="/academy">
            <Button variant="ghost" size="icon">
              <ArrowLeft className="w-4 h-4" />
            </Button>
          </Link>
          <div>
            <h1 className="text-lg font-bold flex items-center gap-2">
              {module.title}
              {module.referencePdf && (
                <Badge variant="outline" className="text-blue-500 border-blue-500/30 text-[10px]">
                  Ref: Officielle
                </Badge>
              )}
            </h1>
            <p className="text-xs text-muted-foreground">{module.duration} • {module.level}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {module.referencePdf && (
            <Button variant="outline" size="sm" className="hidden md:flex">
              <Download className="mr-2 w-4 h-4" />
              Source PDF
            </Button>
          )}
          <div className="text-sm font-medium mr-2">
            {Math.round(((currentGlobalIndex) / allLessons.length) * 100)}%
          </div>
          <div className="w-20 h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              className="h-full bg-vyxo-gold transition-all duration-300"
              style={{ width: `${((currentGlobalIndex) / allLessons.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      <div className="flex flex-1 gap-6 overflow-hidden">
        
        {/* Sidebar: Syllabus */}
        <Card className="w-80 flex-shrink-0 hidden md:flex flex-col border-0 bg-secondary/10">
          <div className="p-4 font-semibold border-b">Programme</div>
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-6">
              {module.chapters.map((chapter, cIdx) => (
                <div key={chapter.id}>
                  <h3 className="text-sm font-medium text-muted-foreground mb-2 px-2 uppercase tracking-wider text-[10px]">
                    {chapter.title}
                  </h3>
                  <div className="space-y-1">
                    {chapter.lessons.map((lesson, lIdx) => {
                      const isActive = cIdx === activeChapterIndex && lIdx === activeLessonIndex
                      const isPast = cIdx < activeChapterIndex || (cIdx === activeChapterIndex && lIdx < activeLessonIndex)
                      
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            setActiveChapterIndex(cIdx)
                            setActiveLessonIndex(lIdx)
                          }}
                          className={`
                            w-full text-left flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors
                            ${isActive ? "bg-vyxo-gold/10 text-vyxo-gold font-medium" : "hover:bg-secondary/50 text-muted-foreground"}
                          `}
                        >
                          {isPast ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : isActive ? (
                            <PlayCircle className="w-4 h-4" />
                          ) : (
                            <Lock className="w-3 h-3 opacity-30" />
                          )}
                          <span className="truncate">{lesson.title}</span>
                          <span className="ml-auto text-xs opacity-50">{lesson.duration}</span>
                        </button>
                      )
                    })}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>

        {/* Main Content */}
        <div className="flex-1 flex flex-col min-w-0">
          <Card className="flex-1 mb-4 overflow-hidden border-vyxo-gold/10 flex flex-col">
            <div className="bg-secondary/20 p-6 border-b">
               <span className="text-xs text-vyxo-gold uppercase tracking-widest font-bold mb-2 block">
                 Chapitre {activeChapterIndex + 1} : {activeChapter.title}
               </span>
               <h2 className="text-2xl font-bold">{activeLesson.title}</h2>
            </div>
            <ScrollArea className="flex-1 p-8">
               <div className="prose dark:prose-invert max-w-none">
                 <p className="lead">
                   Bienvenue dans cette leçon. Ici sera affiché le contenu pédagogique extrait des documents de référence.
                 </p>
                 <div className="my-8 aspect-video bg-black/50 rounded-xl flex items-center justify-center border border-white/10">
                    <PlayCircle className="w-16 h-16 text-white/50" />
                 </div>
                 <h3>Points Clés</h3>
                 <ul>
                   <li>Principe fondamental abordé dans le module {module.title}.</li>
                   <li>Conformité avec la norme {module.vertical.toUpperCase()}.</li>
                   <li>Mise en application pratique.</li>
                 </ul>
                 {module.referencePdf && (
                   <div className="bg-blue-500/5 border border-blue-500/20 p-4 rounded-lg mt-8 flex gap-4 items-start">
                     <FileText className="w-6 h-6 text-blue-500 flex-shrink-0" />
                     <div>
                       <h4 className="text-sm font-bold text-blue-500 mt-0">Source Officielle</h4>
                       <p className="text-xs text-muted-foreground m-0">
                         Ce contenu est basé sur le document <code>{module.referencePdf}</code>. 
                         Consultez la page 12-15 pour les détails techniques.
                       </p>
                     </div>
                   </div>
                 )}
               </div>
            </ScrollArea>
          </Card>

          {/* Navigation Footer */}
          <div className="flex justify-between items-center py-2">
            <Button variant="outline" onClick={handlePrev} disabled={currentGlobalIndex === 0}>
              <ChevronLeft className="mr-2 w-4 h-4" />
              Précédent
            </Button>
            <Button 
               onClick={handleNext} 
               className="bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90"
            >
              {currentGlobalIndex === allLessons.length - 1 ? "Terminer le cours" : "Suivant"}
              {currentGlobalIndex < allLessons.length - 1 && <ChevronRight className="ml-2 w-4 h-4" />}
            </Button>
          </div>
        </div>
      </div>

      {/* Certificate Modal */}
      {showCertificate && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 animate-in fade-in duration-300">
           <Card className="max-w-md w-full relative overflow-hidden text-center bg-white text-black">
             <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-vyxo-navy to-vyxo-gold" />
             <CardContent className="pt-12 pb-8 px-8 space-y-6">
               <div className="w-20 h-20 bg-vyxo-gold/20 text-vyxo-gold rounded-full flex items-center justify-center mx-auto mb-4">
                 <Trophy className="w-10 h-10" />
               </div>
               <div>
                 <h2 className="text-2xl font-bold font-serif mb-1">Certificat de Réussite</h2>
                 <p className="text-sm text-gray-500">Délivré par Vyxo Codex Academy</p>
               </div>
               
               <div className="py-6 border-y border-gray-100">
                 <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Décerné à</p>
                 <p className="text-xl font-bold text-vyxo-navy">Utilisateur Démo</p>
               </div>

               <div>
                 <p className="text-sm text-gray-600 mb-1">Pour la complétion du module</p>
                 <p className="font-bold text-vyxo-gold">{module.title}</p>
                 <p className="text-xs text-gray-400 mt-2">{new Date().toLocaleDateString()}</p>
               </div>

               <Button className="w-full bg-vyxo-navy hover:bg-vyxo-navy/90 text-white mt-4" onClick={() => router.push("/academy")}>
                 <Download className="mr-2 w-4 h-4" />
                 Télécharger (PDF)
               </Button>
             </CardContent>
           </Card>
        </div>
      )}
    </div>
  )
}
