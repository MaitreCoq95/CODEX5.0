"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { 
  Pill, 
  Shield, 
  Settings, 
  Plane, 
  Leaf,
  ArrowRight,
  CheckCircle2,
  FileText,
  Clock
} from "lucide-react"
import Link from "next/link"

// Vertical Data Configuration
const verticals = {
  quality: {
    icon: Settings,
    label: "🏭 Qualité",
    name: "Qualité & Dispositifs Médicaux",
    description: "Standards internationaux de management de la qualité.",
    color: "from-blue-500 to-cyan-500",
    certifications: [
      { id: "ISO_9001", name: "ISO 9001", fullName: "Système de Management Qualité", questions: 30, duration: "15 min" },
      { id: "ISO_13485", name: "ISO 13485", fullName: "Dispositifs Médicaux", questions: 25, duration: "12 min" },
    ],
  },
  pharma: {
    icon: Pill,
    label: "💊 Pharma",
    name: "Transport Pharma & GDP",
    description: "Bonnes Pratiques de Distribution des médicaments.",
    color: "from-purple-500 to-pink-500",
    certifications: [
      { id: "GDP", name: "GDP / BPD", fullName: "Bonnes Pratiques de Distribution", questions: 20, duration: "10 min" },
    ],
  },
  cyber: {
    icon: Shield,
    label: "🔒 Cyber & IA",
    name: "Sécurité de l'Information & IA",
    description: "Défense des actifs et gouvernance de l'IA.",
    color: "from-indigo-500 to-violet-500",
    certifications: [
      { id: "ISO_27001", name: "ISO 27001", fullName: "Sécurité de l'Information", questions: 25, duration: "12 min" },
      { id: "ISO_42001", name: "ISO 42001", fullName: "Système de Management IA", questions: 20, duration: "10 min" },
    ],
  },
  surete: {
    icon: Plane,
    label: "✈️ Sûreté",
    name: "Sûreté Aéroportuaire",
    description: "Conformité aux règlements européens de sûreté.",
    color: "from-orange-500 to-red-500",
    certifications: [
      { id: "SURETE", name: "Sûreté", fullName: "Sûreté Aéroportuaire", questions: 15, duration: "8 min" },
    ],
  },
  food: {
    icon: Leaf,
    label: "🍽️ Agro",
    name: "Sécurité Alimentaire",
    description: "Maîtrise de l'hygiène et des points critiques.",
    color: "from-green-500 to-emerald-500",
    certifications: [
      { id: "HACCP", name: "HACCP", fullName: "Hazard Analysis Critical Control Point", questions: 20, duration: "10 min" },
    ],
  },
}

export function VerticalTabs() {
  const [selectedVertical, setSelectedVertical] = useState("quality")

  return (
    <section className="py-20 bg-gradient-to-b from-vyxo-navy to-background text-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 border-white/20 text-white/80">Couverture Multi-Normes</Badge>
          <h2 className="text-3xl md:text-5xl font-bold mb-6">Expertise sectorielle <span className="text-vyxo-gold">ciblée</span></h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            7 normes supportées. Des parcours sur mesure pour chaque industrie critique.
          </p>
        </div>

        <Tabs 
          value={selectedVertical} 
          onValueChange={setSelectedVertical}
          className="max-w-6xl mx-auto"
        >
          {/* Scrollable Tabs List for Mobile */}
          <div className="overflow-x-auto pb-4 mb-8 -mx-4 px-4 scrollbar-hide flex justify-center">
            <TabsList className="bg-white/5 h-auto p-2 inline-flex">
              {Object.entries(verticals).map(([key, vertical]) => (
                <TabsTrigger
                  key={key}
                  value={key}
                  className="px-6 py-3 rounded-md data-[state=active]:bg-vyxo-gold data-[state=active]:text-vyxo-navy transition-all flex items-center gap-2 group min-w-[120px]"
                >
                  <vertical.icon className="w-5 h-5 group-data-[state=active]:scale-110 transition-transform" />
                  <span className="font-semibold">{vertical.label}</span>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {Object.entries(verticals).map(([key, vertical]) => (
            <TabsContent key={key} value={key} className="animate-fade-in relative">
              
              {/* Vertical Header */}
              <div className="text-center mb-12">
                 <div className={`w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br ${vertical.color} flex items-center justify-center mb-6 shadow-lg shadow-black/20`}>
                   <vertical.icon className="w-8 h-8 text-white" />
                 </div>
                 <h3 className="text-2xl font-bold mb-2">{vertical.name}</h3>
                 <p className="text-gray-400">{vertical.description}</p>
              </div>

              {/* Cards Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {vertical.certifications.map((cert) => (
                  <Link key={cert.id} href={`/signup?standard=${cert.id}`}>
                    <Card className="h-full bg-white/5 border-white/10 hover:bg-white/10 transition-all hover:-translate-y-1 group cursor-pointer overflow-hidden">
                      <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <Badge variant="secondary" className="bg-white/10 text-white hover:bg-white/20">
                            {cert.name}
                          </Badge>
                          <ArrowRight className="w-5 h-5 text-gray-500 group-hover:text-vyxo-gold transition-colors" />
                        </div>
                        
                        <h4 className="text-lg font-bold mb-1 group-hover:text-vyxo-gold transition-colors">{cert.fullName}</h4>
                        
                        <div className="flex items-center gap-4 mt-6 text-sm text-gray-400">
                          <div className="flex items-center gap-1.5">
                            <FileText className="w-4 h-4" />
                            <span>{cert.questions} questions</span>
                          </div>
                          <div className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            <span>{cert.duration}</span>
                          </div>
                        </div>

                        <div className={`h-1 w-0 group-hover:w-full bg-gradient-to-r ${vertical.color} absolute bottom-0 left-0 transition-all duration-300`} />
                      </CardContent>
                    </Card>
                  </Link>
                ))}
                
                {/* CTA Card for Vertical */}
                <Card className="bg-gradient-to-br from-white/5 to-white/0 border-dashed border-white/20 hover:border-vyxo-gold/50 transition-all group flex flex-col justify-center items-center text-center p-6 grayscale hover:grayscale-0">
                  <div className="w-12 h-12 rounded-full bg-vyxo-gold/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <CheckCircle2 className="w-6 h-6 text-vyxo-gold" />
                  </div>
                  <h4 className="font-bold mb-2">Prêt à évaluer ?</h4>
                  <Link href={`/signup?standard=${vertical.certifications[0].id}`}>
                    <Button variant="link" className="text-vyxo-gold p-0 h-auto font-semibold group-hover:underline">
                      Lancer l&apos;assessment {vertical.label}
                    </Button>
                  </Link>
                </Card>
              </div>

            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  )
}
