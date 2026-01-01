"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { type QuestionOption } from "@/lib/types/assessment.types"

interface SingleChoiceProps {
  options: QuestionOption[]
  value: string | null
  onChange: (value: string) => void
  disabled?: boolean
}

export function SingleChoice({ options, value, onChange, disabled }: SingleChoiceProps) {
  return (
    <RadioGroup
      value={value || ""}
      onValueChange={onChange}
      disabled={disabled}
      className="space-y-3"
    >
      {options.map((option, index) => (
        <div
          key={option.id}
          className={`
            flex items-center space-x-3 rounded-lg border p-4 cursor-pointer
            transition-all duration-200
            ${value === option.label 
              ? "border-vyxo-gold bg-vyxo-gold/10" 
              : "border-slate-700 hover:border-slate-500 bg-slate-800/50"
            }
            ${disabled ? "opacity-50 cursor-not-allowed" : ""}
          `}
          onClick={() => !disabled && onChange(option.label)}
        >
          <RadioGroupItem 
            value={option.label} 
            id={option.id}
            className="border-slate-500 text-vyxo-gold"
          />
          <Label 
            htmlFor={option.id} 
            className="flex-1 cursor-pointer text-sm font-medium"
          >
            {option.label}
          </Label>
        </div>
      ))}
    </RadioGroup>
  )
}

export default SingleChoice
