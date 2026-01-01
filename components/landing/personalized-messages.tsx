"use client"

import { PersonalizedMessage } from "@/lib/services/personalized-messages"
import { AlertTriangle, Lightbulb, TrendingUp, CheckCircle2, Sparkles } from "lucide-react"

interface PersonalizedMessagesProps {
  messages: PersonalizedMessage[]
}

const iconMap = {
  warning: AlertTriangle,
  insight: Lightbulb,
  opportunity: TrendingUp,
  recommendation: Sparkles,
  success: CheckCircle2
}

const colorMap = {
  warning: {
    bg: "bg-red-500/10",
    border: "border-red-500/30",
    icon: "text-red-400",
    title: "text-red-400"
  },
  insight: {
    bg: "bg-blue-500/10",
    border: "border-blue-500/30",
    icon: "text-blue-400",
    title: "text-blue-400"
  },
  opportunity: {
    bg: "bg-vyxo-gold/10",
    border: "border-vyxo-gold/30",
    icon: "text-vyxo-gold",
    title: "text-vyxo-gold"
  },
  recommendation: {
    bg: "bg-purple-500/10",
    border: "border-purple-500/30",
    icon: "text-purple-400",
    title: "text-purple-400"
  },
  success: {
    bg: "bg-green-500/10",
    border: "border-green-500/30",
    icon: "text-green-400",
    title: "text-green-400"
  }
}

export function PersonalizedMessagesDisplay({ messages }: PersonalizedMessagesProps) {
  if (messages.length === 0) return null

  return (
    <div className="space-y-3">
      {messages.map((msg, index) => {
        const Icon = iconMap[msg.type]
        const colors = colorMap[msg.type]

        return (
          <div
            key={index}
            className={`${colors.bg} ${colors.border} border rounded-xl p-4 animate-slide-in-up`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex gap-3">
              {/* Icon avec emoji */}
              <div className="flex-shrink-0 mt-0.5">
                <span className="text-xl">{msg.icon}</span>
              </div>
              
              {/* Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Icon className={`w-4 h-4 ${colors.icon}`} />
                  <h4 className={`font-semibold text-sm ${colors.title}`}>
                    {msg.title}
                  </h4>
                </div>
                <p className="text-gray-300 text-sm leading-relaxed">
                  {msg.message}
                </p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
