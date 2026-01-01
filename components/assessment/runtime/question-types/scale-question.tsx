"use client"

import { useState } from "react"
import { Slider } from "@/components/ui/slider"

interface ScaleQuestionProps {
  min: number
  max: number
  labels?: { min: string; max: string }
  value: number | null
  onChange: (value: number) => void
  disabled?: boolean
}

export function ScaleQuestion({ 
  min = 1, 
  max = 5, 
  labels,
  value, 
  onChange, 
  disabled 
}: ScaleQuestionProps) {
  const [localValue, setLocalValue] = useState(value || Math.floor((min + max) / 2))
  
  const handleChange = (newValue: number[]) => {
    setLocalValue(newValue[0])
    onChange(newValue[0])
  }

  // Generate scale points
  const scalePoints = Array.from({ length: max - min + 1 }, (_, i) => min + i)

  return (
    <div className="space-y-6 py-4">
      {/* Scale labels */}
      {labels && (
        <div className="flex justify-between text-sm text-slate-400">
          <span>{labels.min}</span>
          <span>{labels.max}</span>
        </div>
      )}

      {/* Slider */}
      <div className="px-2">
        <Slider
          value={[localValue]}
          onValueChange={handleChange}
          min={min}
          max={max}
          step={1}
          disabled={disabled}
          className="[&_[role=slider]]:bg-vyxo-gold [&_[role=slider]]:border-vyxo-gold [&_[role=slider]]:h-5 [&_[role=slider]]:w-5"
        />
      </div>

      {/* Scale points */}
      <div className="flex justify-between px-2">
        {scalePoints.map(point => (
          <button
            key={point}
            onClick={() => !disabled && handleChange([point])}
            disabled={disabled}
            className={`
              w-10 h-10 rounded-full flex items-center justify-center
              font-medium text-sm transition-all
              ${localValue === point 
                ? "bg-vyxo-gold text-vyxo-navy scale-110" 
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
              }
              ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
            `}
          >
            {point}
          </button>
        ))}
      </div>

      {/* Current value display */}
      <div className="text-center">
        <span className="text-3xl font-bold text-vyxo-gold">{localValue}</span>
        <span className="text-slate-500 text-sm ml-2">/ {max}</span>
      </div>
    </div>
  )
}

export default ScaleQuestion
