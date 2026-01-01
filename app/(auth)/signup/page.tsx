import { Suspense } from "react"
import { SignUpForm } from "@/components/auth/SignUpForm"
import { Loader2 } from "lucide-react"

export const metadata = {
  title: "Inscription - Vyxo Codex",
  description: "Créez votre compte Vyxo Codex",
}

function SignUpLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-vyxo-navy via-vyxo-navy to-slate-900">
      <Loader2 className="w-8 h-8 text-vyxo-gold animate-spin" />
    </div>
  )
}

export default function SignUpPage() {
  return (
    <Suspense fallback={<SignUpLoading />}>
      <SignUpForm />
    </Suspense>
  )
}
