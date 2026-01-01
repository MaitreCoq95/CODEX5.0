"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { faqPartnersData, type FAQPartnerItem } from "@/lib/data/faq-partners"

function FAQAccordionItem({ item, isOpen, onToggle }: { item: FAQPartnerItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-slate-700/50 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className={`text-base font-medium transition-colors ${isOpen ? "text-partner-accent" : "text-white group-hover:text-gray-300"}`}>
          {item.question}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform flex-shrink-0 ml-4 ${isOpen ? "rotate-180 text-partner-accent" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-5" : "max-h-0"}`}>
        <p className="text-gray-400 text-sm leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  )
}

export function FAQPartnersSection() {
  const [openId, setOpenId] = useState<string | null>("circumvention")

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-partner-accent text-sm font-semibold tracking-wider uppercase mb-4 block">
            Questions fréquentes
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Tes questions, nos <span className="text-partner-accent">réponses cash</span>
          </h2>
          <p className="text-lg text-gray-400">
            On sait que tu as des doutes. C&apos;est normal. Voici les réponses honnêtes.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-slate-800/30 border border-slate-700/50 rounded-2xl p-6">
            {faqPartnersData.map((item) => (
              <FAQAccordionItem
                key={item.id}
                item={item}
                isOpen={openId === item.id}
                onToggle={() => handleToggle(item.id)}
              />
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-500 text-sm mb-4">
            Tu as une question qui n&apos;est pas ici?
          </p>
          <button className="inline-flex items-center gap-2 border-2 border-partner-accent text-partner-accent hover:bg-partner-accent/10 font-bold py-3 px-6 rounded-lg transition-all">
            <HelpCircle className="w-5 h-5" />
            Discuter avec Vivien
          </button>
        </div>
      </div>
    </section>
  )
}

export default FAQPartnersSection
