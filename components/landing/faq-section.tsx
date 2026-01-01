"use client"

import { useState } from "react"
import { ChevronDown, HelpCircle } from "lucide-react"
import { faqData, type FAQItem } from "@/lib/data/faq-data"

function FAQAccordionItem({ item, isOpen, onToggle }: { item: FAQItem; isOpen: boolean; onToggle: () => void }) {
  return (
    <div className="border-b border-white/10 last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full py-5 flex items-center justify-between text-left group"
      >
        <span className={`text-base font-medium transition-colors ${isOpen ? "text-vyxo-gold" : "text-white group-hover:text-gray-300"}`}>
          {item.question}
        </span>
        <ChevronDown className={`w-5 h-5 text-gray-400 transition-transform ${isOpen ? "rotate-180 text-vyxo-gold" : ""}`} />
      </button>
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? "max-h-96 pb-5" : "max-h-0"}`}>
        <p className="text-gray-400 text-sm leading-relaxed">
          {item.answer}
        </p>
      </div>
    </div>
  )
}

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>("difference-logiciel")

  const handleToggle = (id: string) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section id="faq-section" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="text-vyxo-gold text-sm font-semibold tracking-wider uppercase mb-4 block">
            Questions fréquentes
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Une question ? <span className="text-vyxo-gold">Nous avons la réponse</span>
          </h2>
          <p className="text-lg text-gray-400">
            Tout ce que vous devez savoir sur notre méthode et notre accompagnement.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
            {faqData.map((item) => (
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
            Vous ne trouvez pas la réponse à votre question ?
          </p>
          <button className="inline-flex items-center gap-2 border-2 border-vyxo-gold text-vyxo-gold hover:bg-vyxo-gold/10 font-bold py-3 px-6 rounded-lg transition-all">
            <HelpCircle className="w-5 h-5" />
            Contactez notre équipe
          </button>
        </div>
      </div>
    </section>
  )
}

export default FAQSection
