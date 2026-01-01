"use client"

import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { type QuestionOption } from "@/lib/types/assessment.types"

interface MultiChoiceProps {
  options: QuestionOption[]
  value: string[]
  onChange: (value: string[]) => void
  disabled?: boolean
}

export function MultiChoice({ options, value, onChange, disabled }: MultiChoiceProps) {
  const toggleOption = (optionLabel: string) => {
    if (value.includes(optionLabel)) {
      onChange(value.filter(v => v !== optionLabel))
    } else {
      onChange([...value, optionLabel])
    }
  }

  return (
    <div className="space-y-3">
      {options.map((option) => {
        const isSelected = value.includes(option.label)
        return (
          <div
            key={option.id}
            className={`
              flex items-center space-x-3 rounded-lg border p-4 cursor-pointer
              transition-all duration-200
              ${isSelected 
                ? "border-vyxo-gold bg-vyxo-gold/10" 
                : "border-slate-700 hover:border-slate-500 bg-slate-800/50"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : ""}
            `}
            onClick={() => !disabled && toggleOption(option.label)}
          >
            <Checkbox 
              id={option.id}
              checked={isSelected}
              onCheckedChange={() => toggleOption(option.label)}
              disabled={disabled}
              className="border-slate-500 data-[state=checked]:bg-vyxo-gold data-[state=checked]:border-vyxo-gold"
            />
            <Label 
              htmlFor={option.id} 
              className="flex-1 cursor-pointer text-sm font-medium"
            >
              {option.label}
            </Label>
          </div>
        )
      })}
      <p className="text-xs text-slate-500 mt-2">
        Sélectionnez toutes les réponses applicables
      </p>
    </div>
  )
}

export default MultiChoice
