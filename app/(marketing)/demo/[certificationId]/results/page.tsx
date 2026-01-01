"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { CERTIFICATIONS } from "@/lib/services/multi-norms-service"
import { ArrowRight, BarChart3, CheckCircle, Download, AlertTriangle, FileText, Share2 } from "lucide-react"
import Link from "next/link"

// Helper to calculate score
function calculateScore(answers: Record<string, number>, questions: any[]) {
  if (!answers || Object.keys(answers).length === 0) return { total: 0, percentage: 0, gaps: [] }

  let totalMaxScore = 0
  let totalUserScore = 0
  const gaps: any[] = []

  questions.forEach(q => {
    // Assuming max score per question is 100 based on our data structure
    const maxQ = 100 
    const userQ = answers[q.id] || 0
    
    totalMaxScore += maxQ
    totalUserScore += userQ

    if (userQ < 50) {
      gaps.push({
        question: q.text,
        score: userQ,
        severity: userQ === 0 ? "Critique" : "Majeur",
        category: q.categoryName
      })
    }
  })

  return {
    total: totalUserScore,
    max: totalMaxScore,
    percentage: Math.round((totalUserScore / totalMaxScore) * 100),
    gaps: gaps.sort((a, b) => a.score - b.score).slice(0, 3) // Top 3 gaps
  }
}

// Flatten questions helper (duplicated from assessment page, ideally shared util)
function flattenQuestions(categories: any[]) {
  const flatQuestions: any[] = []
  categories.forEach(cat => {
    cat.questions.forEach((q: any) => {
      flatQuestions.push({
        ...q,
        categoryName: cat.name,
        categoryId: cat.id
      })
    })
  })
  return flatQuestions
}

export default function ResultsPage({ params }: { params: { certificationId: string } }) {
  const router = useRouter()
  const certConfig = CERTIFICATIONS.find(c => c.id === params.certificationId)
  
  const [result, setResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (certConfig) {
      const saved = localStorage.getItem(`assessment_${params.certificationId}`)
      if (saved) {
        try {
          const answers = JSON.parse(saved)
          const questions = flattenQuestions(certConfig.categories)
          const calc = calculateScore(answers, questions)
          setResult(calc)
        } catch (e) {
          console.error("Error calculating results", e)
        }
      }
    }
    setLoading(false)
  }, [certConfig, params.certificationId])

  if (loading) return <div className="min-h-screen flex items-center justify-center">Calcul des résultats...</div>
  
  if (!result || !certConfig) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">Aucun résultat trouvé</h1>
        <Button onClick={() => router.push(`/demo/${params.certificationId}`)}>
          Recommencer l'évaluation
        </Button>
      </div>
    )
  }

  // Determine Maturity Level
  let maturityLevel = "Initial"
  let maturityColor = "text-red-500"
  if (result.percentage >= 80) { maturityLevel = "Optimisé"; maturityColor = "text-green-500"; }
  else if (result.percentage >= 60) { maturityLevel = "Maîtrisé"; maturityColor = "text-emerald-500"; }
  else if (result.percentage >= 40) { maturityLevel = "Défini"; maturityColor = "text-yellow-500"; }
  else if (result.percentage >= 20) { maturityLevel = "Reproductible"; maturityColor = "text-orange-500"; }

  return (
    <div className="min-h-screen bg-background pb-20">
      
      {/* Hero Header */}
      <div className="bg-vyxo-navy text-white py-12 border-b border-white/10">
        <div className="container mx-auto px-4 text-center">
          <Badge variant="outline" className="text-vyxo-gold border-vyxo-gold/50 mb-4 px-3 py-1">
            Rapport d'Assessment
          </Badge>
          <h1 className="text-3xl md:text-5xl font-bold mb-4">
            Votre niveau de maturité {certConfig.name}
          </h1>
          <p className="text-gray-400">Basé sur vos réponses au questionnaire normatif</p>
        </div>
      </div>

      <div className="container mx-auto px-4 -mt-8">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-8">
          
          {/* Main Score Card */}
          <div className="md:col-span-2 space-y-6">
            <Card className="bento-card relative overflow-hidden">
               <div className="absolute top-0 right-0 p-32 bg-vyxo-gold/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
               <CardContent className="p-8 text-center md:text-left flex flex-col md:flex-row items-center gap-8">
                 {/* Gauge Circle (CSS only) */}
                 <div className="relative w-40 h-40 flex-shrink-0">
                    <svg className="w-full h-full -rotate-90">
                      <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="12" className="text-secondary" />
                      <circle cx="80" cy="80" r="70" fill="none" stroke="currentColor" strokeWidth="12" 
                        strokeDasharray={`${(result.percentage / 100) * 440} 440`} 
                        strokeLinecap="round" 
                        className="text-vyxo-gold transition-all duration-1000 ease-out" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-4xl font-bold">{result.percentage}%</span>
                    </div>
                 </div>

                 <div className="space-y-2">
                    <h2 className="text-2xl font-bold">Niveau : <span className={maturityColor}>{maturityLevel}</span></h2>
                    <p className="text-muted-foreground">
                      Vous avez complété {flattenQuestions(certConfig.categories).length} points de contrôle. 
                      Votre organisation montre des signes de maturité {maturityLevel.toLowerCase()}, 
                      mais il reste des zones critiques à renforcer avant une certification.
                    </p>
                    <div className="pt-4 flex gap-3 justify-center md:justify-start">
                      <Button className="bg-vyxo-gold text-vyxo-navy hover:bg-vyxo-gold/90">
                        <Download className="mr-2 w-4 h-4" />
                        Télécharger le PDF complet
                      </Button>
                      <Button variant="outline">
                        <Share2 className="mr-2 w-4 h-4" />
                        Partager
                      </Button>
                    </div>
                 </div>
               </CardContent>
            </Card>

            {/* Critical Gaps */}
            {result.gaps.length > 0 && (
              <Card className="bento-card border-l-4 border-l-red-500">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <AlertTriangle className="text-red-500 w-5 h-5" />
                    Priorités d'action ({result.gaps.length})
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {result.gaps.map((gap: any, i: number) => (
                    <div key={i} className="flex items-start gap-4 p-4 rounded-lg bg-red-500/5 hover:bg-red-500/10 transition-colors">
                      <div className="w-8 h-8 rounded-full bg-red-500/20 text-red-500 flex items-center justify-center flex-shrink-0 font-bold text-sm">
                        {i + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-bold text-base">{gap.category}</span>
                          <Badge variant="outline" className="border-red-500/50 text-red-500 text-[10px] h-5 px-1.5 uppercase tracking-wide">
                            {gap.severity}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{gap.question}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar CTA */}
          <div className="md:col-span-1 space-y-6">
            <Card className="bg-gradient-to-br from-vyxo-navy to-black text-white border-0 shadow-xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-32 h-32 bg-vyxo-gold/20 rounded-full blur-3xl" />
              <CardHeader>
                <CardTitle className="text-xl">Passez à l'étape suivante</CardTitle>
                <CardDescription className="text-gray-400">
                  Transformez ce diagnostic en plan d'action concret.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4 relative z-10">
                <p className="text-sm text-gray-300">
                  Créez votre compte gratuit pour accéder à :
                </p>
                <ul className="space-y-2 text-sm">
                   {[
                     "Plan d'action détaillé",
                     "Recommandations de formation",
                     "Benchmarks sectoriels",
                     "Suivi d'avancement"
                   ].map((item, i) => (
                     <li key={i} className="flex items-center gap-2">
                       <CheckCircle className="w-4 h-4 text-vyxo-gold" />
                       <span>{item}</span>
                     </li>
                   ))}
                </ul>
                <Link href="/signup?source=demo_result" className="block mt-6">
                  <Button className="w-full bg-white text-vyxo-navy hover:bg-gray-100 font-bold h-12">
                    Créer mon compte
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
                <p className="text-xs text-center text-gray-500 pt-2">
                  Aucune carte bancaire requise.
                </p>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  )
}
