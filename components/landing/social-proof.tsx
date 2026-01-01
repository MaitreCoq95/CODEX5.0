"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"

export function SocialProof() {
  return (
    <section className="py-20 bg-background">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Ils nous font confiance</h2>
          <p className="text-muted-foreground">Rejoignez les leaders de l'industrie qui utilisent VYXO Codex.</p>
        </div>

        {/* LOGOS STRIP */}
        <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 mb-20 grayscale hover:grayscale-0 transition-all duration-500">
          {["Sanofi", "AirFrance", "DHL", "Kuehne+Nagel", "L'Oréal"].map((brand, i) => (
            <span key={i} className="text-2xl font-bold text-muted-foreground/50">{brand}</span>
          ))}
        </div>

        {/* TESTIMONIALS */}
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              text: "Nous avons réduit nos temps de préparation d'audit de 50%. La centralisation des certifications change tout.",
              author: "Thomas B.",
              role: "Directeur Qualité, TransPharma",
              rating: 5
            },
            {
              text: "L'approche par vertical métier est pertinente. Nos équipes logistiques ont adoré le module HACCP Transport.",
              author: "Sarah L.",
              role: "Responsable Ops, LogiFroid",
              rating: 5
            },
            {
              text: "Enfin un outil qui parle le même langage que nous. ISO 27001 n'a jamais été aussi clair.",
              author: "Marc D.",
              role: "RSSI, TechSecure",
              rating: 5
            }
          ].map((t, i) => (
            <Card key={i} className="bg-white/5 border-white/10 hover:border-vyxo-gold/30 transition-colors">
              <CardContent className="p-8">
                <div className="flex text-vyxo-gold mb-4">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <blockquote className="text-lg italic mb-6 text-gray-300">"{t.text}"</blockquote>
                <div>
                  <div className="font-bold text-white">{t.author}</div>
                  <div className="text-sm text-muted-foreground">{t.role}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
