"use client"

import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { type QuestionOption } from "@/lib/types/assessment.types"

interface MatrixQuestionProps {
  rows: string[]
  columns: QuestionOption[]
  value: Record<string, string>  // { rowId: selectedColumnValue }
  onChange: (value: Record<string, string>) => void
  disabled?: boolean
}

export function MatrixQuestion({ 
  rows, 
  columns, 
  value, 
  onChange, 
  disabled 
}: MatrixQuestionProps) {
  const handleChange = (rowIndex: number, columnLabel: string) => {
    const rowKey = `row-${rowIndex}`
    onChange({ ...value, [rowKey]: columnLabel })
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="text-left p-3 border-b border-slate-700 w-1/3"></th>
            {columns.map((col) => (
              <th 
                key={col.id} 
                className="text-center p-3 border-b border-slate-700 text-sm font-medium text-slate-400"
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => {
            const rowKey = `row-${rowIndex}`
            return (
              <tr 
                key={rowIndex}
                className="border-b border-slate-800 hover:bg-slate-800/50"
              >
                <td className="p-3 text-sm font-medium">{row}</td>
                {columns.map((col) => (
                  <td key={col.id} className="text-center p-3">
                    <div className="flex justify-center">
                      <button
                        onClick={() => !disabled && handleChange(rowIndex, col.label)}
                        disabled={disabled}
                        className={`
                          w-6 h-6 rounded-full border-2 
                          transition-all flex items-center justify-center
                          ${value[rowKey] === col.label 
                            ? "border-vyxo-gold bg-vyxo-gold" 
                            : "border-slate-600 hover:border-slate-400"
                          }
                          ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
                        `}
                      >
                        {value[rowKey] === col.label && (
                          <div className="w-2 h-2 rounded-full bg-vyxo-navy" />
                        )}
                      </button>
                    </div>
                  </td>
                ))}
              </tr>
            )
          })}
        </tbody>
      </table>

      {/* Progress indicator */}
      <div className="mt-4 text-xs text-slate-500 text-center">
        {Object.keys(value).length} / {rows.length} réponses
      </div>
    </div>
  )
}

export default MatrixQuestion
