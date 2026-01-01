"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"

export function CTASection() {
  return (
    <section className="py-24 bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-black border-t border-white/10 relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-full bg-[url('/grid.svg')] opacity-10" />
      
      <div className="container px-4 mx-auto relative z-10 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
          Prêt à élever vos standards ?
        </h2>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            Rejoignez les entreprises qui visent l&apos;excellence opérationnelle. 
            Commencez par un diagnostic gratuit.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/signup?standard=ISO_9001">
              <Button size="lg" className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy font-bold h-14 px-10 text-lg shadow-lg shadow-vyxo-gold/20">
                Commencer l&apos;Assessment
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          <Link href="mailto:contact@vyxo.fr">
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/10 h-14 px-10 text-lg">
              Contacter les ventes
            </Button>
          </Link>
        </div>
        
        <p className="mt-8 text-sm text-gray-500">
          Sans engagement • Carte de crédit non requise • RGPD Compliant
        </p>
      </div>
    </section>
  )
}
