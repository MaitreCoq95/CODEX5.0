"use client"

import React, { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, ArrowRight, CheckCircle2, Lock, Award, Target } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CERTIFICATIONS } from "@/lib/services/multi-norms-service"
import { SmartClassificationForm } from "@/components/demo/smart-classification-form"
import { TheSwitch } from "@/components/demo/the-switch"

export default function CertificationIntroPage({ params }: { params: Promise<{ certificationId: string }> }) {
  const { certificationId } = React.use(params)
  const [flowState, setFlowState] = useState<'intro' | 'classification' | 'switch'>('intro')
  const [userProfile, setUserProfile] = useState<any>(null)
  const router = useRouter()

  // Find the selected certification details
  const certification = CERTIFICATIONS.find(c => c.id === params.certificationId) || CERTIFICATIONS[0]

  const handleStart = () => {
    setFlowState('classification')
  }

  const handleClassificationComplete = (data: any) => {
    setUserProfile(data)
    // Save minimal data to localStorage for the session
    localStorage.setItem('vyxo_user_profile', JSON.stringify(data))
    setFlowState('switch')
  }

  const handleSwitchComplete = () => {
    router.push(`/demo/${params.certificationId}/assessment`)
  }

  if (!certification) {
    return <div>Certification non trouvée</div>
  }

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-8">
        
        {/* Header - Always visible unless in Switch mode to keep context */}
        {flowState !== 'switch' && (
          <div className="mb-8">
            <Link href="/demo" className="text-sm text-gray-500 hover:text-vyxo-navy flex items-center gap-1 mb-4">
              <ArrowLeft className="w-4 h-4" /> Retour aux choix
            </Link>
            <div className="flex items-center gap-3">
              <Badge variant="outline" className="text-vyxo-navy border-vyxo-navy">
                {certification.vertical}
              </Badge>
              <h1 className="text-3xl font-bold text-vyxo-navy">{certification.name}</h1>
            </div>
            <p className="text-gray-600 mt-2 max-w-2xl">{certification.description}</p>
          </div>
        )}

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden min-h-[600px] flex flex-col">
          
          {flowState === 'intro' && (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <div className="w-20 h-20 bg-vyxo-gold/10 rounded-full flex items-center justify-center mb-6">
                <Target className="w-10 h-10 text-vyxo-gold" />
              </div>
              <h2 className="text-2xl font-bold text-vyxo-navy mb-4">
                Évaluation de Maturité {certification.name}
              </h2>
              <p className="text-gray-600 max-w-md mb-8">
                Cette évaluation professionnelle vous donnera une lecture claire de votre exposition aux risques et de votre niveau de conformité en moins de 10 minutes.
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 w-full max-w-3xl">
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-bold text-vyxo-navy text-lg mb-1">10 min</div>
                  <div className="text-sm text-gray-500">Durée estimée</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-bold text-vyxo-navy text-lg mb-1">100%</div>
                  <div className="text-sm text-gray-500">Confidentiel</div>
                </div>
                <div className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="font-bold text-vyxo-navy text-lg mb-1">PDF</div>
                  <div className="text-sm text-gray-500">Rapport inclus</div>
                </div>
              </div>

              <Button 
                size="lg" 
                onClick={handleStart}
                className="bg-vyxo-navy hover:bg-vyxo-navy/90 text-white px-8 py-6 text-lg rounded-xl shadow-lg shadow-vyxo-navy/20"
              >
                Commencer l'évaluation <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <p className="text-xs text-gray-400 mt-4">Aucune inscription requise pour démarrer</p>
            </div>
          )}

          {flowState === 'classification' && (
            <div className="flex-1 flex flex-col justify-center">
              <SmartClassificationForm 
                initialVertical={certification.vertical === 'pharma' ? 'transport_pharma' : undefined}
                onComplete={handleClassificationComplete} 
              />
            </div>
          )}

          {flowState === 'switch' && (
            <div className="flex-1 flex flex-col justify-center">
              <TheSwitch 
                sector={userProfile?.sector || 'transport_pharma'} 
                onComplete={handleSwitchComplete} 
              />
            </div>
          )}

        </div>
      </main>
    </div>
  )
}
