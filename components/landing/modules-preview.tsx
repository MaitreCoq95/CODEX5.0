"use client"

import { useMemo } from "react"
import { getModulesForNorms, getTotalModulesCount, Module } from "@/lib/data/modules-by-norm"
import { Lock, CheckCircle2, Clock, ChevronRight } from "lucide-react"

interface ModulesPreviewProps {
  selectedNorms: string[]
}

function ModuleCard({ module }: { module: Module }) {
  return (
    <div 
      className={`relative rounded-xl border p-4 transition-all ${
        module.isFree 
          ? "bg-white/5 border-white/10 hover:border-vyxo-gold/50 cursor-pointer group" 
          : "bg-white/[0.02] border-white/5"
      }`}
    >
      {/* Overlay blur pour modules verrouillés */}
      {!module.isFree && (
        <div className="absolute inset-0 backdrop-blur-sm bg-white/5 rounded-xl z-10 flex items-center justify-center">
          <div className="bg-vyxo-navy/80 rounded-full p-3">
            <Lock className="w-5 h-5 text-gray-400" />
          </div>
        </div>
      )}
      
      {/* Badge gratuit */}
      {module.isFree && (
        <div className="absolute top-3 right-3">
          <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded-full">
            GRATUIT
          </span>
        </div>
      )}

      {/* Icon */}
      <div className="text-2xl mb-3">{module.icon}</div>

      {/* Title */}
      <h4 className={`font-semibold mb-1 ${module.isFree ? "text-white" : "text-gray-400"}`}>
        {module.title}
      </h4>

      {/* Description */}
      <p className="text-gray-500 text-sm mb-3 line-clamp-2">
        {module.description}
      </p>

      {/* Meta */}
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1 text-gray-500">
          <Clock className="w-3 h-3" />
          {module.duration}
        </div>
        {module.isFree && (
          <div className="flex items-center gap-1 text-vyxo-gold opacity-0 group-hover:opacity-100 transition-opacity">
            <span>Commencer</span>
            <ChevronRight className="w-3 h-3" />
          </div>
        )}
      </div>

      {/* Topics (visible on hover for free modules) */}
      {module.isFree && (
        <div className="mt-3 pt-3 border-t border-white/5 opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="flex flex-wrap gap-1">
            {module.topics.map((topic, i) => (
              <span key={i} className="text-[10px] bg-white/5 text-gray-400 px-2 py-0.5 rounded-full">
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function ModulesPreview({ selectedNorms }: ModulesPreviewProps) {
  const normModules = useMemo(() => getModulesForNorms(selectedNorms), [selectedNorms])
  const totals = useMemo(() => getTotalModulesCount(selectedNorms), [selectedNorms])

  if (normModules.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        Sélectionnez des certifications pour voir les modules disponibles
      </div>
    )
  }

  return (
    <div className="space-y-8">
      {/* Stats globales */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-white">{totals.total}</p>
          <p className="text-gray-400 text-sm">Modules totaux</p>
        </div>
        <div className="bg-green-500/10 border border-green-500/20 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-green-400">{totals.free}</p>
          <p className="text-gray-400 text-sm">Accès gratuit</p>
        </div>
        <div className="bg-white/5 rounded-xl p-4 text-center">
          <p className="text-3xl font-bold text-gray-400">{totals.locked}</p>
          <p className="text-gray-400 text-sm flex items-center justify-center gap-1">
            <Lock className="w-3 h-3" /> Après validation
          </p>
        </div>
      </div>

      {/* Modules par norme */}
      {normModules.map((norm) => (
        <div key={norm.normId} className="space-y-4">
          {/* Norme header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl">{norm.icon}</span>
              <div>
                <h3 className="text-white font-semibold">{norm.normName}</h3>
                <p className="text-gray-500 text-sm">
                  {norm.freeModules} gratuit{norm.freeModules > 1 ? 's' : ''} sur {norm.totalModules} modules
                </p>
              </div>
            </div>
            <div className="text-vyxo-gold text-sm flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" />
              Sélectionné
            </div>
          </div>

          {/* Modules grid */}
          <div className="grid md:grid-cols-3 gap-4">
            {norm.modules.slice(0, 6).map((module) => (
              <ModuleCard key={module.id} module={module} />
            ))}
          </div>

          {/* More modules message */}
          {norm.totalModules > 6 && (
            <p className="text-center text-gray-500 text-sm">
              + {norm.totalModules - 6} autres modules disponibles après validation
            </p>
          )}
        </div>
      ))}

      {/* Message de frustration */}
      <div className="bg-gradient-to-r from-vyxo-gold/10 to-transparent border border-vyxo-gold/20 rounded-xl p-6 text-center">
        <Lock className="w-8 h-8 text-vyxo-gold mx-auto mb-3" />
        <h4 className="text-white font-semibold mb-2">
          🔒 {totals.locked} modules supplémentaires après validation
        </h4>
        <p className="text-gray-400 text-sm max-w-md mx-auto">
          Finalisez votre inscription pour débloquer l&apos;accès complet à tous les modules 
          d&apos;évaluation et recevoir votre rapport personnalisé.
        </p>
      </div>
    </div>
  )
}
