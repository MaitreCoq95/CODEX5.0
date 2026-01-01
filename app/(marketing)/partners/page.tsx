"use client"

import { useRef } from "react"
import { PartnerHeroSection } from "@/components/partners/hero-section"
import { ProblemSection } from "@/components/partners/problem-section"
import { SolutionSection } from "@/components/partners/solution-section"
import { PricingFormulasSection } from "@/components/partners/pricing-formulas"
import { CaseStudySection } from "@/components/partners/case-study-section"
import { FeaturesSection } from "@/components/partners/features-section"
import { JourneyTimeline } from "@/components/partners/journey-timeline"
import { FAQPartnersSection } from "@/components/partners/faq-partners"
import { CriteriaSection } from "@/components/partners/criteria-section"
import { ApplicationForm } from "@/components/partners/application-form"
import { CTAFinalSection } from "@/components/partners/cta-final"

export default function PartnersPage() {
  const formRef = useRef<HTMLDivElement>(null)

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const openCalendly = () => {
    // TODO: Remplacer par le vrai lien Calendly
    window.open("https://calendly.com/vyxo/partenaire", "_blank")
  }

  return (
    <main className="min-h-screen bg-slate-950">
      {/* LP-PARTNER-01: Hero Section */}
      <PartnerHeroSection 
        variant="A" 
        onScrollToForm={scrollToForm}
        onBookDemo={openCalendly}
      />

      {/* LP-PARTNER-02: Problem Section */}
      <ProblemSection />

      {/* LP-PARTNER-03: Solution Section */}
      <SolutionSection />

      {/* LP-PARTNER-04: Pricing Formulas */}
      <PricingFormulasSection />

      {/* LP-PARTNER-05: Case Study Thomas */}
      <CaseStudySection />

      {/* LP-PARTNER-06: Features */}
      <FeaturesSection />

      {/* LP-PARTNER-07: Journey Timeline */}
      <JourneyTimeline />

      {/* LP-PARTNER-08: FAQ */}
      <FAQPartnersSection />

      {/* LP-PARTNER-09: Criteria */}
      <CriteriaSection />

      {/* LP-PARTNER-10: Application Form */}
      <section id="application-form" className="py-20 bg-slate-900" ref={formRef}>
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <span className="text-partner-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
                Candidature
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Postule pour devenir <span className="text-partner-accent">Vyxo Partner</span>
              </h2>
              <p className="text-lg text-gray-400">
                Remplis ce formulaire, on revient vers toi sous 48h pour un appel de qualification.
              </p>
            </div>

            <ApplicationForm />
          </div>
        </div>
      </section>

      {/* LP-PARTNER-11: CTA Final + Reassurance */}
      <CTAFinalSection 
        onScrollToForm={scrollToForm}
        onBookDemo={openCalendly}
      />
    </main>
  )
}
