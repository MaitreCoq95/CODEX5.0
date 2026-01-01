"use client"

import { useState } from "react"
import { RoleCard } from "./role-card"

interface RoleSelectorProps {
  onRoleSelect: (role: "dirigeant" | "manager") => void
}

export function RoleSelector({ onRoleSelect }: RoleSelectorProps) {
  const [selectedRole, setSelectedRole] = useState<"dirigeant" | "manager" | null>(null)

  const handleSelect = (role: "dirigeant" | "manager") => {
    setSelectedRole(role)
    onRoleSelect(role)
  }

  return (
    <section id="differentiation" className="py-20 bg-gradient-to-b from-vyxo-navy to-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Quel est votre rôle dans cette démarche ?
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto">
            Choisissez votre profil pour accéder à l&apos;évaluation adaptée à vos besoins
          </p>
        </div>

        {/* Role Cards Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="animate-slide-in-left" style={{ animationDelay: "0.1s", animationFillMode: "both" }}>
            <RoleCard 
              type="dirigeant" 
              onSelect={() => handleSelect("dirigeant")}
              isSelected={selectedRole === "dirigeant"}
            />
          </div>
          <div className="animate-slide-in-right" style={{ animationDelay: "0.2s", animationFillMode: "both" }}>
            <RoleCard 
              type="manager" 
              onSelect={() => handleSelect("manager")}
              isSelected={selectedRole === "manager"}
            />
          </div>
        </div>

        {/* Hint */}
        <p className="text-center text-gray-500 text-sm mt-8">
          💡 Vous pouvez tester les deux parcours. Le choix n&apos;est pas définitif.
        </p>
      </div>
    </section>
  )
}
