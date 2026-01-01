"use client"

import { useState, useCallback } from "react"
import { SiretValidationResult } from "@/lib/services/siret-service"

export function useSiretValidation() {
  const [isValidating, setIsValidating] = useState(false)
  const [result, setResult] = useState<SiretValidationResult | null>(null)
  const [error, setError] = useState<string | null>(null)

  const validateSiret = useCallback(async (siret: string) => {
    // Nettoyer le SIRET
    const cleanSiret = siret.replace(/\s/g, "")
    
    // Ne pas valider si moins de 14 chiffres
    if (cleanSiret.length < 14) {
      setResult(null)
      setError(null)
      return null
    }

    setIsValidating(true)
    setError(null)

    try {
      const response = await fetch(`/api/siret/validate?siret=${cleanSiret}`)
      const data: SiretValidationResult = await response.json()

      setResult(data)
      
      if (!data.isValid) {
        setError(data.error || "SIRET invalide")
      }

      return data
    } catch (_err) {
      const errorMessage = "Impossible de valider le SIRET"
      setError(errorMessage)
      setResult({ isValid: false, error: errorMessage })
      return null
    } finally {
      setIsValidating(false)
    }
  }, [])

  const reset = useCallback(() => {
    setResult(null)
    setError(null)
  }, [])

  return {
    validateSiret,
    isValidating,
    result,
    error,
    reset
  }
}
