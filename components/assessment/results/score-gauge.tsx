"use client"

interface ScoreGaugeProps {
  score: number
  maturityLevel: {
    level: number
    name: string
    description: string
    color?: string
  }
  size?: "sm" | "md" | "lg"
}

export function ScoreGauge({ score, maturityLevel, size = "lg" }: ScoreGaugeProps) {
  // Calculate rotation for gauge needle
  // 0% = -90deg, 100% = 90deg
  const rotation = -90 + (score / 100) * 180

  // Size configurations
  const sizeConfig = {
    sm: { width: 150, height: 100, strokeWidth: 8, fontSize: "text-2xl" },
    md: { width: 200, height: 120, strokeWidth: 10, fontSize: "text-3xl" },
    lg: { width: 280, height: 160, strokeWidth: 12, fontSize: "text-5xl" },
  }

  const config = sizeConfig[size]
  const radius = (config.width - config.strokeWidth) / 2 - 10
  const circumference = Math.PI * radius

  // Get color based on score
  const getColor = (score: number): string => {
    if (maturityLevel.color) return maturityLevel.color
    if (score >= 80) return "#10b981"
    if (score >= 60) return "#22c55e"
    if (score >= 40) return "#eab308"
    if (score >= 20) return "#f97316"
    return "#ef4444"
  }

  const color = getColor(score)

  return (
    <div className="flex flex-col items-center">
      {/* Gauge */}
      <div className="relative" style={{ width: config.width, height: config.height }}>
        <svg 
          width={config.width} 
          height={config.height + 20} 
          viewBox={`0 0 ${config.width} ${config.height + 20}`}
        >
          {/* Background arc */}
          <path
            d={`
              M ${config.strokeWidth / 2 + 10} ${config.height}
              A ${radius} ${radius} 0 0 1 ${config.width - config.strokeWidth / 2 - 10} ${config.height}
            `}
            fill="none"
            stroke="#374151"
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
          />

          {/* Score arc */}
          <path
            d={`
              M ${config.strokeWidth / 2 + 10} ${config.height}
              A ${radius} ${radius} 0 0 1 ${config.width - config.strokeWidth / 2 - 10} ${config.height}
            `}
            fill="none"
            stroke={color}
            strokeWidth={config.strokeWidth}
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={circumference - (score / 100) * circumference}
            className="transition-all duration-1000 ease-out"
          />

          {/* Tick marks */}
          {[0, 25, 50, 75, 100].map((tick, i) => {
            const angle = -180 + (tick / 100) * 180
            const radian = (angle * Math.PI) / 180
            const x1 = config.width / 2 + (radius - 15) * Math.cos(radian)
            const y1 = config.height + (radius - 15) * Math.sin(radian)
            const x2 = config.width / 2 + (radius + 5) * Math.cos(radian)
            const y2 = config.height + (radius + 5) * Math.sin(radian)

            return (
              <g key={tick}>
                <line
                  x1={x1}
                  y1={y1}
                  x2={x2}
                  y2={y2}
                  stroke="#6b7280"
                  strokeWidth={2}
                />
                <text
                  x={config.width / 2 + (radius + 20) * Math.cos(radian)}
                  y={config.height + (radius + 20) * Math.sin(radian) + 4}
                  fill="#9ca3af"
                  fontSize="10"
                  textAnchor="middle"
                >
                  {tick}
                </text>
              </g>
            )
          })}
        </svg>

        {/* Center score */}
        <div 
          className="absolute inset-0 flex flex-col items-center justify-end pb-2"
        >
          <span 
            className={`${config.fontSize} font-bold`}
            style={{ color }}
          >
            {score}
          </span>
          <span className="text-slate-400 text-sm">/ 100</span>
        </div>
      </div>

      {/* Maturity Level */}
      <div 
        className="mt-4 text-center px-6 py-3 rounded-full"
        style={{ backgroundColor: `${color}20` }}
      >
        <p className="text-sm text-slate-400">Niveau de maturité</p>
        <p 
          className="text-lg font-bold"
          style={{ color }}
        >
          {maturityLevel.level}. {maturityLevel.name}
        </p>
        <p className="text-xs text-slate-500 mt-1">
          {maturityLevel.description}
        </p>
      </div>
    </div>
  )
}

export default ScoreGauge
