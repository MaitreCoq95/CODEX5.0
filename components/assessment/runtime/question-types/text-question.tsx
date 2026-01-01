"use client"

import { Textarea } from "@/components/ui/textarea"

interface TextQuestionProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  maxLength?: number
  disabled?: boolean
}

export function TextQuestion({ 
  value, 
  onChange, 
  placeholder = "Entrez votre réponse ici...",
  maxLength = 2000,
  disabled 
}: TextQuestionProps) {
  return (
    <div className="space-y-2">
      <Textarea
        value={value}
        onChange={e => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        maxLength={maxLength}
        className="min-h-[150px] bg-slate-800 border-slate-700 focus:border-vyxo-gold resize-y"
      />
      <div className="flex justify-between text-xs text-slate-500">
        <span>Réponse libre</span>
        <span>{value.length} / {maxLength} caractères</span>
      </div>
    </div>
  )
}

export default TextQuestion
