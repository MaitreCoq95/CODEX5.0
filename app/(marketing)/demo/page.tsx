"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"
import { Clock, FileText, Pill, Shield, Settings, Plane, Leaf } from "lucide-react"
import { useAnalytics } from "@/lib/analytics-tracker"

// Certifications par vertical
const verticals = {
  pharma: {
    icon: Pill,
    label: "💊 Pharma",
    name: "Transport Pharma & Cold Chain",
    color: "from-blue-500 to-cyan-500",
    certifications: [
      {
        id: "GDP",
        name: "GDP",
        fullName: "Good Distribution Practice",
        description: "Bonnes Pratiques de Distribution pharmaceutique",
        icon: "💊",
        questions: 10,
        duration: "12 min",
      },
      {
        id: "CEIV_PHARMA",
        name: "CEIV Pharma",
        fullName: "IATA Cold Chain Certification",
        description: "Certification transport aérien pharmaceutique",
        icon: "✈️",
        questions: 8,
        duration: "10 min",
      },
    ],
  },
  cyber: {
    icon: Shield,
    label: "🔒 Cybersécurité",
    name: "Sécurité de l'Information & IA",
    color: "from-purple-500 to-violet-500",
    certifications: [
      {
        id: "ISO27001",
        name: "ISO 27001",
        fullName: "Sécurité de l'Information",
        description: "Système de Management de la Sécurité",
        icon: "🔒",
        questions: 8,
        duration: "10 min",
      },
      {
        id: "ISO42001",
        name: "ISO 42001",
        fullName: "Management de l'IA",
        description: "Système de Management de l'Intelligence Artificielle",
        icon: "🤖",
        questions: 7,
        duration: "8 min",
      },
      {
        id: "ISO27701",
        name: "ISO 27701",
        fullName: "Protection des Données",
        description: "Extension RGPD pour ISO 27001",
        icon: "🛡️",
        questions: 6,
        duration: "8 min",
      },
      {
        id: "SOC2",
        name: "SOC 2 Type II",
        fullName: "Service Organization Control",
        description: "Contrôles de sécurité pour services Cloud",
        icon: "☁️",
        questions: 5,
        duration: "7 min",
      },
    ],
  },
  ops: {
    icon: Settings,
    label: "⚙️ Excellence Ops",
    name: "Excellence Opérationnelle",
    color: "from-yellow-500 to-amber-500",
    certifications: [
      {
        id: "YELLOW_BELT",
        name: "Yellow Belt",
        fullName: "Lean Six Sigma Yellow Belt",
        description: "Fondamentaux Lean Six Sigma",
        icon: "🟡",
        questions: 6,
        duration: "8 min",
      },
      {
        id: "GREEN_BELT",
        name: "Green Belt",
        fullName: "Lean Six Sigma Green Belt",
        description: "Lean Six Sigma niveau avancé",
        icon: "🟢",
        questions: 4,
        duration: "6 min",
      },
      {
        id: "LEAN_MANAGEMENT",
        name: "Lean Management",
        fullName: "Lean Management",
        description: "Principes d'élimination des gaspillages",
        icon: "📉",
        questions: 5,
        duration: "7 min",
      },
    ],
  },
  surete: {
    icon: Plane,
    label: "✈️ Sûreté",
    name: "Sûreté Aéroportuaire & Fret",
    color: "from-red-500 to-orange-500",
    certifications: [
      {
        id: "SURETE_11_2_1",
        name: "11.2.1",
        fullName: "Sensibilisation Générale",
        description: "Formation de base pour tout personnel aviation",
        icon: "🛡️",
        questions: 4,
        duration: "5 min",
      },
      {
        id: "SURETE_11_2_3_9",
        name: "11.2.3.9",
        fullName: "Acceptation Fret",
        description: "Personnel acceptant du fret aérien",
        icon: "📦",
        questions: 4,
        duration: "5 min",
      },
      {
        id: "SURETE_11_2_3_10",
        name: "11.2.3.10",
        fullName: "Manipulation Fret",
        description: "Personnel manipulant du fret sécurisé",
        icon: "✋",
        questions: 4,
        duration: "5 min",
      },
      {
        id: "SURETE_11_2_3_6",
        name: "11.2.3.6",
        fullName: "Contrôles RA/AH",
        description: "Agent Réglementé / Agent Habilité",
        icon: "🔍",
        questions: 4,
        duration: "5 min",
      },
      {
        id: "SURETE_11_2_5",
        name: "11.2.5",
        fullName: "Responsable Sûreté",
        description: "Formation Responsable Sûreté / Référent DGAC",
        icon: "👔",
        questions: 4,
        duration: "6 min",
      },
      {
        id: "OEA_AEOS",
        name: "OEA-AEOS",
        fullName: "Sûreté Supply Chain",
        description: "Opérateur Économique Agréé",
        icon: "🌐",
        questions: 3,
        duration: "4 min",
      },
    ],
  },
  food: {
    icon: Leaf,
    label: "🍽️ Agro",
    name: "Sécurité Alimentaire & Logistique",
    color: "from-green-500 to-emerald-500",
    certifications: [
      {
        id: "HACCP",
        name: "HACCP Codex",
        fullName: "HACCP Codex Alimentarius",
        description: "Analyse des dangers et points critiques (Fabrication)",
        icon: "🍽️",
        questions: 11,
        duration: "12 min",
      },
      {
        id: "HACCP_TRANSPORT",
        name: "HACCP Transport",
        fullName: "HACCP Logistique & Transport",
        description: "Maîtrise sanitaire transport et stockage",
        icon: "🚛",
        questions: 5,
        duration: "6 min",
      },
      {
        id: "ISO22000",
        name: "ISO 22000",
        fullName: "Sécurité des Denrées Alimentaires",
        description: "Système de Management de la Sécurité Alimentaire",
        icon: "🍏",
        questions: 6,
        duration: "8 min",
      },
    ],
  },
}

export default function DemoNormsPage() {
  const [selectedVertical, setSelectedVertical] = useState<string>("pharma")
  const analytics = useAnalytics()

  // Track page view on mount
  useEffect(() => {
    analytics.pageView('/demo')
  }, [analytics])

  // Handle vertical change with tracking
  const handleVerticalChange = (v: string) => {
    const vertical = verticals[v as keyof typeof verticals]
    analytics.demoVerticalSelected(v, vertical.name)
    setSelectedVertical(v)
  }

  // Handle certification click with tracking
  const handleCertificationClick = (certId: string, certName: string) => {
    analytics.demoCertificationSelected(certId, certName, selectedVertical)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-vyxo-navy via-vyxo-navy/95 to-vyxo-navy">
      {/* Header */}
      <header className="border-b border-white/10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-vyxo-gold flex items-center justify-center">
               <span className="text-vyxo-navy font-bold">V</span>
            </div>
            <span className="text-xl font-bold text-white">
              VYXO <span className="text-vyxo-gold">Codex</span>
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/" className="text-sm text-gray-300 hover:text-white transition-colors hidden md:block">
              Retour à l'accueil
            </Link>
            <Link href="/login">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10">
                Connexion
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8 md:py-12">
        {/* Hero */}
        <div className="text-center mb-8 md:mb-12 animate-slide-in-up">
          <Badge className="bg-vyxo-gold/20 text-vyxo-gold mb-4 text-sm px-3 py-1">
            Certification Hub
          </Badge>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4 md:mb-6">
            Quel <span className="text-vyxo-gold">assessment</span> voulez-vous lancer&nbsp;?
          </h1>
          <p className="text-lg md:text-xl text-gray-300 max-w-2xl mx-auto px-4">
            Accédez à plus de 20 questionnaires normatifs conçus par des experts.
            <br className="hidden md:block"/>
            Sélectionnez votre standard pour commencer l'évaluation.
          </p>
        </div>

        {/* Vertical Tabs */}
        <Tabs value={selectedVertical} onValueChange={handleVerticalChange} className="max-w-6xl mx-auto mb-8 animate-fade-in">
          <div className="flex justify-center mb-6 md:mb-8 overflow-x-auto pb-2">
            <TabsList className="bg-white/5 p-1 h-auto flex flex-wrap justify-center gap-1 sm:gap-2">
              {Object.entries(verticals).map(([key, vertical]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="px-3 py-2 sm:px-4 sm:py-2.5 md:px-6 md:py-3 text-xs sm:text-sm data-[state=active]:bg-vyxo-gold data-[state=active]:text-vyxo-navy transition-all"
                >
                  <span className="flex items-center gap-1.5 sm:gap-2">
                    <vertical.icon className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    <span className="hidden xs:inline sm:inline">{vertical.label}</span>
                    <span className="xs:hidden sm:hidden">{vertical.label.split(' ')[0]}</span>
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {Object.entries(verticals).map(([key, vertical]) => (
            <TabsContent key={key} value={key} className="mt-4 md:mt-6">
              <div className="text-center mb-6 md:mb-10 animate-fade-in">
                <h2 className="text-xl md:text-2xl font-bold text-white mb-2">{vertical.name}</h2>
                <div className="h-1 w-20 bg-gradient-to-r from-transparent via-vyxo-gold to-transparent mx-auto rounded-full" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                {vertical.certifications.map((cert, index) => (
                  <Link 
                    key={cert.id}
                    href={`/demo/${cert.id}`}
                    className={`block h-full animate-slide-in-up stagger-${Math.min(index + 1, 6)}`}
                    style={{ animationFillMode: 'both' }}
                    onClick={() => handleCertificationClick(cert.id, cert.name)}
                  >
                    <Card
                      className={`h-full relative overflow-hidden cursor-pointer transition-all duration-300 bg-white/5 border-white/10 hover:bg-white/10 hover:-translate-y-1 hover:border-vyxo-gold/30 group`}
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${vertical.color} opacity-0 group-hover:opacity-5 transition-opacity`} />
                      <CardContent className="p-6 relative flex flex-col h-full">
                        <div className="flex items-start justify-between mb-4">
                          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-white/10 to-white/5 flex items-center justify-center text-3xl group-hover:scale-110 transition-transform">
                            {cert.icon}
                          </div>
                          <Badge variant="secondary" className="bg-white/10 text-white group-hover:bg-vyxo-gold group-hover:text-vyxo-navy transition-colors">
                            Start
                          </Badge>
                        </div>
                        
                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-vyxo-gold transition-colors">{cert.name}</h3>
                        <p className="text-sm font-medium text-white/80 mb-2">{cert.fullName}</p>
                        <p className="text-sm text-gray-400 mb-6 flex-grow">{cert.description}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-gray-400 border-t border-white/10 pt-4 mt-auto">
                          <span className="flex items-center gap-1.5">
                            <FileText className="w-4 h-4 text-vyxo-gold" />
                            {cert.questions} questions
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4 text-vyxo-gold" />
                            {cert.duration}
                          </span>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>

        {/* Stats Footer */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-20 max-w-4xl mx-auto border-t border-white/10 pt-12">
          {[
            { value: "20+", label: "Certifications" },
            { value: "150+", label: "Points de contrôle" },
            { value: "5", label: "Verticaux Métier" },
            { value: "100%", label: "Gratuit & Sans CB" },
          ].map((stat, i) => (
            <div key={i} className="text-center group hover:bg-white/5 p-4 rounded-xl transition-colors">
              <span className="block text-3xl font-bold text-vyxo-gold mb-1 group-hover:scale-110 transition-transform inline-block">{stat.value}</span>
              <p className="text-sm text-gray-400">{stat.label}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  )
}
