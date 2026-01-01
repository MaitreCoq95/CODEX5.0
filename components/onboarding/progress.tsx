"use client"

import { motion } from "framer-motion"
import { Check } from "lucide-react"

export interface OnboardingStep {
  id: string
  label: string
  icon?: React.ReactNode
}

interface OnboardingProgressProps {
  steps: OnboardingStep[]
  currentStep: number
  className?: string
}

export function OnboardingProgress({ steps, currentStep, className = "" }: OnboardingProgressProps) {
  return (
    <div className={`w-full ${className}`}>
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep
          const isLast = index === steps.length - 1

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: index * 0.1 }}
                className={`
                  relative flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all
                  ${isCompleted 
                    ? "bg-vyxo-gold border-vyxo-gold" 
                    : isCurrent 
                    ? "bg-vyxo-gold/20 border-vyxo-gold" 
                    : "bg-white/5 border-white/20"
                  }
                `}
              >
                {isCompleted ? (
                  <Check className="w-5 h-5 text-vyxo-navy" />
                ) : (
                  <span className={`text-sm font-bold ${isCurrent ? "text-vyxo-gold" : "text-gray-500"}`}>
                    {index + 1}
                  </span>
                )}
              </motion.div>

              {/* Line Connector */}
              {!isLast && (
                <div className="flex-1 h-0.5 mx-2">
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isCompleted ? 1 : 0 }}
                    transition={{ delay: index * 0.1 + 0.2, duration: 0.3 }}
                    className="h-full bg-vyxo-gold origin-left"
                  />
                  <div className={`h-full -mt-0.5 ${isCompleted ? "bg-vyxo-gold" : "bg-white/10"}`} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Labels */}
      <div className="flex justify-between mt-2">
        {steps.map((step, index) => {
          const isCompleted = index < currentStep
          const isCurrent = index === currentStep

          return (
            <div 
              key={`label-${step.id}`} 
              className="flex-1 text-center first:text-left last:text-right"
            >
              <span 
                className={`text-xs ${
                  isCompleted || isCurrent ? "text-white" : "text-gray-500"
                }`}
              >
                {step.label}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// Default onboarding steps
export const ONBOARDING_STEPS: OnboardingStep[] = [
  { id: "signup", label: "Inscription" },
  { id: "assessment", label: "Diagnostic" },
  { id: "results", label: "Résultats" },
  { id: "dashboard", label: "Dashboard" },
]

// Step index helper
export function getStepIndex(stepId: string): number {
  return ONBOARDING_STEPS.findIndex((s) => s.id === stepId)
}
