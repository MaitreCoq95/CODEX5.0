"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Check, X } from "lucide-react"

export function ProblemSolution() {
  return (
    <section className="py-20 bg-background overflow-hidden relative">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-4">
            Arrêtez de gérer votre conformité <br/>
            <span className="text-muted-foreground line-through decoration-red-500/50">sur Excel</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            L'excellence opérationnelle ne s'improvise pas. Passez du chaos à la maîtrise.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* AVANT / PROBLEME */}
          <Card className="border-red-200/20 bg-red-500/5 dark:bg-red-900/10">
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/30 text-red-600 flex items-center justify-center">
                  <X className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-red-600 dark:text-red-400">La "méthode" actuelle</h3>
              </div>
              
              <ul className="space-y-4">
                {[
                  "Fichiers Excel dispersés et non à jour",
                  "Formations 'papier' sans suivi réel",
                  "Stress panique avant chaque audit",
                  "Aucune visibilité sur les gaps critiques",
                  "Perte de temps en relances manuelles"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3 text-muted-foreground/80">
                    <X className="w-5 h-5 text-red-400 mt-0.5 shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* APRES / SOLUTION */}
          <Card className="border-vyxo-gold/30 bg-vyxo-gold/5 dark:bg-yellow-900/10 relative overflow-hidden">
            <div className="absolute top-0 right-0 px-3 py-1 bg-vyxo-gold text-vyxo-navy text-xs font-bold rounded-bl-lg">
              VYXO CODEX
            </div>
            <CardContent className="p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-vyxo-gold flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-vyxo-gold">L'Excellence Opérationnelle</h3>
              </div>
              
              <ul className="space-y-4">
                {[
                  "Tableaux de bord temps réel centralisés",
                  "Parcours d'apprentissage gamifiés",
                  "Sérénité totale lors des audits",
                  "Identification instantanée des risques",
                  "Automatisation des relances et certifications"
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <Check className="w-5 h-5 text-vyxo-gold mt-0.5 shrink-0" />
                    <span className="font-medium">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
