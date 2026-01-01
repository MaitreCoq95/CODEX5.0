"use client"

import { useRef, useState } from "react"
import { HeroSection } from "@/components/landing/hero-section"
import { MethodSection } from "@/components/landing/method-section"
import { TimelineSection } from "@/components/landing/timeline-section"
import { PricingSection } from "@/components/landing/pricing-section"
import { SocialProofSection } from "@/components/landing/social-proof-section"
import { ReassuranceSection } from "@/components/landing/reassurance-section"
import { FAQSection } from "@/components/landing/faq-section"
import { RoleSelector } from "@/components/landing/role-selector"
import { EvaluationForm } from "@/components/landing/evaluation-form"
import { MaturityQuestions } from "@/components/landing/maturity-questions"
import { LeadScoreResult } from "@/components/landing/lead-score-result"
import { ModulesPreview } from "@/components/landing/modules-preview"
import { PersonalizedMessagesDisplay } from "@/components/landing/personalized-messages"
import { EvaluationFormData } from "@/lib/schemas/evaluation-form.schema"
import { qualifyLead, QualifiedLead } from "@/lib/services/lead-scoring"
import { getTopMessages } from "@/lib/services/personalized-messages"
import { calculateMaturityFromAnswers } from "@/lib/data/maturity-questions"

// Variante A/B/C - peut être changée dynamiquement ou via cookie
const CURRENT_VARIANT = "A" as const

type Step = "form" | "maturity" | "result"

export default function LandingPage() {
  const formRef = useRef<HTMLDivElement>(null)
  const methodRef = useRef<HTMLDivElement>(null)
  const [selectedRole, setSelectedRole] = useState<"dirigeant" | "manager" | null>(null)
  const [currentStep, setCurrentStep] = useState<Step>("form")
  const [formData, setFormData] = useState<EvaluationFormData | null>(null)
  const [qualifiedLead, setQualifiedLead] = useState<QualifiedLead | null>(null)
  const [maturityResult, setMaturityResult] = useState<{
    score: number
    maxScore: number
    percentage: number
    level: string
    label: string
    tags: string[]
  } | null>(null)

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const scrollToMethod = () => {
    methodRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const handleRoleSelect = (role: "dirigeant" | "manager") => {
    setSelectedRole(role)
    setTimeout(() => {
      document.getElementById("form-section")?.scrollIntoView({ behavior: "smooth" })
    }, 300)
  }

  const handleFormSubmit = async (data: EvaluationFormData) => {
    setFormData(data)
    setCurrentStep("maturity")
    
    // Scroll vers les questions de maturité
    setTimeout(() => {
      document.getElementById("maturity-section")?.scrollIntoView({ behavior: "smooth" })
    }, 300)
  }

  const handleMaturityComplete = (answers: Record<string, number>, tags: string[]) => {
    const maturity = calculateMaturityFromAnswers(answers)
    setMaturityResult({ ...maturity, tags })
    
    if (formData) {
      // Qualifier le lead avec le score de maturité amélioré
      const qualified = qualifyLead(formData)
      // Mettre à jour avec le vrai score de maturité
      qualified.maturityScore = {
        score: maturity.percentage,
        level: maturity.level as "AVANCEE" | "EN_DEVELOPPEMENT" | "FAIBLE",
        label: maturity.label
      }
      // Ajouter les tags de maturité
      qualified.tags.opportunity.push(...tags)
      
      setQualifiedLead(qualified)
    }
    
    setCurrentStep("result")
    setTimeout(() => {
      document.getElementById("score-result")?.scrollIntoView({ behavior: "smooth" })
    }, 300)
  }

  const handleSkipMaturity = () => {
    if (formData) {
      const qualified = qualifyLead(formData)
      setQualifiedLead(qualified)
    }
    setCurrentStep("result")
    setTimeout(() => {
      document.getElementById("score-result")?.scrollIntoView({ behavior: "smooth" })
    }, 300)
  }

  return (
    <main className="min-h-screen bg-vyxo-navy">
      {/* LP-V2-01: Hero Section Hybride */}
      <HeroSection 
        variant={CURRENT_VARIANT} 
        onScrollToForm={scrollToForm}
        onScrollToMethod={scrollToMethod}
      />

      {/* LP-V2-02: Section Notre Méthode */}
      <div ref={methodRef}>
        <MethodSection />
      </div>

      {/* LP-V2-03: Timeline - Comment ça marche */}
      <TimelineSection />

      {/* LP-V2-05: Section Pricing */}
      <PricingSection />

      {/* LP-V2-06: Social Proof */}
      <SocialProofSection />

      {/* LP-V2-07: Réassurance */}
      <ReassuranceSection />

      {/* LP-V2-08: FAQ */}
      <FAQSection />

      {/* LP-02: Section Différenciation */}
      <div ref={formRef}>
        <RoleSelector onRoleSelect={handleRoleSelect} />
      </div>

      {/* LP-03: Section Formulaire */}
      {currentStep === "form" && (
        <section id="form-section" className="py-20 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Commençons par quelques informations
              </h2>
              <p className="text-gray-400">
                Étape 1/2 • 2 minutes pour commencer
              </p>
              {selectedRole && (
                <p className="text-vyxo-gold text-sm mt-2">
                  Profil: {selectedRole === "dirigeant" ? "👔 Dirigeant" : "📋 Manager Opérationnel"}
                </p>
              )}
            </div>
            <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
              <EvaluationForm 
                selectedRole={selectedRole} 
                onSubmit={handleFormSubmit}
              />
            </div>
          </div>
        </section>
      )}

      {/* LP-07: Questionnaire de Maturité */}
      {currentStep === "maturity" && formData && (
        <section id="maturity-section" className="py-20 bg-slate-900">
          <div className="container mx-auto px-4">
            <div className="text-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                Évaluons votre maturité organisationnelle
              </h2>
              <p className="text-gray-400">
                Étape 2/2 • Questions adaptées à vos certifications ({formData.certifications?.length || 0} sélectionnées)
              </p>
            </div>
            <div className="max-w-2xl mx-auto bg-white/5 border border-white/10 rounded-2xl p-6 md:p-8">
              <MaturityQuestions
                selectedNorms={formData.certifications || []}
                onComplete={handleMaturityComplete}
                onSkip={handleSkipMaturity}
              />
            </div>
          </div>
        </section>
      )}

      {/* LP-06: Score Result */}
      {currentStep === "result" && qualifiedLead && (
        <>
          <section id="score-result" className="py-20 bg-gradient-to-b from-slate-900 to-vyxo-navy">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  🎯 Votre profil a été analysé
                </h2>
                <p className="text-gray-400">
                  Score basé sur vos informations et vos réponses
                  {maturityResult && ` • Maturité: ${maturityResult.percentage}%`}
                </p>
              </div>
              <div className="max-w-2xl mx-auto">
                <LeadScoreResult qualifiedLead={qualifiedLead} />
                
                {/* LP-09: Messages Personnalisés */}
                <div className="mt-8">
                  <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                    💡 Insights personnalisés
                  </h3>
                  <PersonalizedMessagesDisplay messages={getTopMessages(qualifiedLead.formData, 4)} />
                </div>
              </div>
            </div>
          </section>

          {/* LP-08: Modules Preview */}
          <section id="modules-preview" className="py-20 bg-vyxo-navy">
            <div className="container mx-auto px-4">
              <div className="text-center mb-8">
                <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
                  📚 Modules d&apos;évaluation disponibles
                </h2>
                <p className="text-gray-400">
                  {qualifiedLead.formData.certifications?.length || 0} certification(s) sélectionnée(s)
                </p>
              </div>
              <div className="max-w-5xl mx-auto">
                <ModulesPreview selectedNorms={qualifiedLead.formData.certifications || []} />
              </div>
            </div>
          </section>

          {/* LP-10: Section CTA Final */}
          <section id="cta-final" className="py-20 bg-vyxo-navy">
            <div className="container mx-auto px-4">
              <div className="max-w-xl mx-auto text-center">
                <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                  <div className="text-5xl mb-4">🔒</div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    Accès complet réservé aux comptes validés
                  </h3>
                  <p className="text-gray-400 mb-2">
                    Score: <span className="text-vyxo-gold font-bold">{qualifiedLead.leadScore.total}/100</span> • 
                    Priorité: <span className="text-vyxo-gold">{qualifiedLead.leadScore.priority}</span>
                  </p>
                  <p className="text-gray-500 text-sm mb-6">
                    Votre rapport préliminaire sera disponible sous 48h
                  </p>
                  <a 
                    href={`/confirmation/${selectedRole === "manager" ? "manager" : "dirigeant"}?company=${encodeURIComponent(qualifiedLead.formData.company_name)}&score=${qualifiedLead.leadScore.total}&priority=${qualifiedLead.leadScore.priority}`}
                    className="block w-full bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy font-bold py-4 px-8 rounded-lg transition-all text-center"
                  >
                    FINALISER MON ÉVALUATION →
                  </a>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </main>
  )
}
