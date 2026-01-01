// AI Service with OpenAI Integration
// Content generation, quiz generation, recommendations, and gap analysis

import OpenAI from "openai"

// Types
export interface QuizQuestion {
  id: string
  text: string
  type: "single_choice" | "multiple_choice" | "true_false"
  options: { label: string; value: string; isCorrect: boolean }[]
  difficulty: "easy" | "medium" | "hard"
  explanation: string
}

export interface IdentifiedGap {
  id: string
  category: string
  severity: "critical" | "high" | "medium" | "low"
  description: string
  impactedAreas: string[]
  suggestedModules: string[]
}

export interface PriorityAction {
  priority: number
  title: string
  description: string
  timeline: string
  resources: string[]
  expectedOutcome: string
}

export interface UserLearningProfile {
  userId: string
  level: number
  strengths: string[]
  weaknesses: string[]
  completedModules: string[]
  quizScores: { moduleId: string; score: number }[]
}

export interface AssessmentScore {
  overallScore: number
  categoryScores: { category: string; score: number }[]
  gaps: string[]
}

// OpenAI Client
const getOpenAIClient = () => {
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured")
  }
  return new OpenAI({ apiKey })
}

// AI Service
export class AIService {
  private model: string = "gpt-4o-mini"
  
  /**
   * Generate module content for a specific topic
   */
  async generateModuleContent(
    topic: string,
    difficulty: "beginner" | "intermediate" | "advanced",
    industry: string
  ): Promise<string> {
    const openai = getOpenAIClient()
    
    const systemPrompt = `Tu es un expert en création de contenu de formation professionnelle.
Tu génères du contenu pédagogique clair, structuré et engageant.
Le contenu doit être adapté à l'industrie ${industry} et au niveau ${difficulty}.
Utilise un langage professionnel mais accessible.`

    const userPrompt = `Génère un module de formation complet sur le sujet suivant: "${topic}"

Le module doit inclure:
1. Introduction et objectifs d'apprentissage
2. Concepts clés avec explications
3. Bonnes pratiques
4. Études de cas ou exemples concrets
5. Points de vigilance
6. Résumé et points clés à retenir

Format le contenu en markdown.`

    try {
      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 2000,
      })
      
      return response.choices[0]?.message?.content || ""
    } catch (error) {
      console.error("Error generating module content:", error)
      throw error
    }
  }
  
  /**
   * Generate quiz questions based on module content
   */
  async generateQuizQuestions(
    moduleContent: string,
    numQuestions: number = 5,
    difficulty: "easy" | "medium" | "hard"
  ): Promise<QuizQuestion[]> {
    const openai = getOpenAIClient()
    
    const systemPrompt = `Tu es un expert en création de quiz d'évaluation.
Tu génères des questions pertinentes et bien formulées.
Les questions doivent tester la compréhension et non juste la mémorisation.`

    const userPrompt = `Basé sur ce contenu de formation:

${moduleContent.substring(0, 3000)}

Génère ${numQuestions} questions de quiz de difficulté "${difficulty}".

Retourne les questions au format JSON suivant:
[
  {
    "id": "q1",
    "text": "Question ici?",
    "type": "single_choice",
    "options": [
      { "label": "Option A", "value": "a", "isCorrect": false },
      { "label": "Option B", "value": "b", "isCorrect": true },
      { "label": "Option C", "value": "c", "isCorrect": false },
      { "label": "Option D", "value": "d", "isCorrect": false }
    ],
    "difficulty": "${difficulty}",
    "explanation": "Explication de la bonne réponse."
  }
]

Retourne UNIQUEMENT le JSON, sans texte avant ou après.`

    try {
      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.5,
        max_tokens: 2000,
      })
      
      const content = response.choices[0]?.message?.content || "[]"
      // Extract JSON from the response
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      return []
    } catch (error) {
      console.error("Error generating quiz questions:", error)
      throw error
    }
  }
  
  /**
   * Provide feedback on a practical exercise
   */
  async provideFeedbackOnExercise(
    exercisePrompt: string,
    userSubmission: string,
    rubric: string
  ): Promise<string> {
    const openai = getOpenAIClient()
    
    const systemPrompt = `Tu es un formateur expert qui donne des feedbacks constructifs et encourageants.
Tu évalues les soumissions selon les critères fournis et donnes des conseils d'amélioration.`

    const userPrompt = `Exercice demandé:
${exercisePrompt}

Critères d'évaluation:
${rubric}

Soumission de l'apprenant:
${userSubmission}

Donne un feedback détaillé incluant:
1. Score global (sur 100)
2. Points forts
3. Points à améliorer
4. Conseils spécifiques
5. Encouragements`

    try {
      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.6,
        max_tokens: 1000,
      })
      
      return response.choices[0]?.message?.content || ""
    } catch (error) {
      console.error("Error providing feedback:", error)
      throw error
    }
  }
  
  /**
   * Generate personalized learning recommendations
   */
  async generatePersonalizedRecommendations(
    userProfile: UserLearningProfile,
    assessmentResults: AssessmentScore
  ): Promise<string[]> {
    const openai = getOpenAIClient()
    
    const systemPrompt = `Tu es un conseiller en apprentissage personnalisé.
Tu analyses le profil des apprenants et génères des recommandations ciblées et actionnables.`

    const userPrompt = `Profil de l'apprenant:
- Niveau: ${userProfile.level}
- Forces: ${userProfile.strengths.join(", ") || "Non identifiées"}
- Faiblesses: ${userProfile.weaknesses.join(", ") || "Non identifiées"}
- Modules complétés: ${userProfile.completedModules.length}
- Score moyen aux quiz: ${Math.round(userProfile.quizScores.reduce((a, b) => a + b.score, 0) / (userProfile.quizScores.length || 1))}%

Résultats d'assessment:
- Score global: ${assessmentResults.overallScore}%
- Gaps identifiés: ${assessmentResults.gaps.join(", ")}

Génère 5 recommandations personnalisées pour cet apprenant.
Retourne UNIQUEMENT un tableau JSON de strings, sans texte avant ou après.
Exemple: ["Recommandation 1", "Recommandation 2", ...]`

    try {
      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.7,
        max_tokens: 500,
      })
      
      const content = response.choices[0]?.message?.content || "[]"
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      return []
    } catch (error) {
      console.error("Error generating recommendations:", error)
      throw error
    }
  }
  
  /**
   * Analyze gaps from assessment answers
   */
  async analyzeGaps(
    assessmentAnswers: { questionId: string; category: string; isCorrect: boolean }[],
    organizationContext: { industry: string; regulations: string[] }
  ): Promise<IdentifiedGap[]> {
    const openai = getOpenAIClient()
    
    // Group by category
    const categoryResults: Record<string, { correct: number; total: number }> = {}
    assessmentAnswers.forEach(a => {
      if (!categoryResults[a.category]) {
        categoryResults[a.category] = { correct: 0, total: 0 }
      }
      categoryResults[a.category].total++
      if (a.isCorrect) categoryResults[a.category].correct++
    })
    
    const categoryScores = Object.entries(categoryResults).map(([cat, data]) => ({
      category: cat,
      score: Math.round((data.correct / data.total) * 100),
    }))
    
    const systemPrompt = `Tu es un expert en analyse de gaps de conformité.
Tu identifies les lacunes critiques et proposes des actions correctives.`

    const userPrompt = `Contexte organisation:
- Industrie: ${organizationContext.industry}
- Réglementations: ${organizationContext.regulations.join(", ")}

Résultats par catégorie:
${categoryScores.map(c => `- ${c.category}: ${c.score}%`).join("\n")}

Identifie les gaps critiques (score < 70%) et génère une analyse détaillée.
Retourne au format JSON:
[
  {
    "id": "gap-1",
    "category": "Catégorie",
    "severity": "critical|high|medium|low",
    "description": "Description du gap",
    "impactedAreas": ["Area 1", "Area 2"],
    "suggestedModules": ["module-id-1", "module-id-2"]
  }
]

Retourne UNIQUEMENT le JSON.`

    try {
      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.5,
        max_tokens: 1000,
      })
      
      const content = response.choices[0]?.message?.content || "[]"
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      return []
    } catch (error) {
      console.error("Error analyzing gaps:", error)
      throw error
    }
  }
  
  /**
   * Generate action plan based on identified gaps
   */
  async generateActionPlan(
    gaps: IdentifiedGap[],
    targetCertification: string,
    timeline: string
  ): Promise<PriorityAction[]> {
    const openai = getOpenAIClient()
    
    const systemPrompt = `Tu es un consultant en stratégie de formation et conformité.
Tu génères des plans d'action réalistes et priorisés.`

    const userPrompt = `Gaps identifiés:
${gaps.map((g, i) => `${i + 1}. ${g.category} (${g.severity}): ${g.description}`).join("\n")}

Objectif: Obtenir la certification "${targetCertification}"
Timeline: ${timeline}

Génère un plan d'action priorisé pour adresser ces gaps.
Retourne au format JSON:
[
  {
    "priority": 1,
    "title": "Titre de l'action",
    "description": "Description détaillée",
    "timeline": "Durée estimée",
    "resources": ["Ressource 1", "Ressource 2"],
    "expectedOutcome": "Résultat attendu"
  }
]

Retourne UNIQUEMENT le JSON.`

    try {
      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt },
        ],
        temperature: 0.6,
        max_tokens: 1500,
      })
      
      const content = response.choices[0]?.message?.content || "[]"
      const jsonMatch = content.match(/\[[\s\S]*\]/)
      if (jsonMatch) {
        return JSON.parse(jsonMatch[0])
      }
      return []
    } catch (error) {
      console.error("Error generating action plan:", error)
      throw error
    }
  }
  
  /**
   * Chat with AI assistant
   */
  async chat(
    messages: { role: "user" | "assistant"; content: string }[],
    context?: string
  ): Promise<string> {
    const openai = getOpenAIClient()
    
    const systemPrompt = `Tu es VYXO Assistant, un assistant IA spécialisé en conformité réglementaire, GDP, ISO, et formation professionnelle.
Tu aides les utilisateurs avec leurs questions sur la plateforme VYXO Codex et les bonnes pratiques de distribution pharmaceutique.
Sois concis, précis et professionnel. Réponds en français.
${context ? `\nContexte supplémentaire:\n${context}` : ""}`

    try {
      const response = await openai.chat.completions.create({
        model: this.model,
        messages: [
          { role: "system", content: systemPrompt },
          ...messages.map(m => ({ role: m.role as "user" | "assistant", content: m.content })),
        ],
        temperature: 0.7,
        max_tokens: 1000,
      })
      
      return response.choices[0]?.message?.content || ""
    } catch (error) {
      console.error("Error in AI chat:", error)
      throw error
    }
  }
}

// Export singleton
export const aiService = new AIService()
