"use client"

import { useState, useRef, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { 
  MessageSquare, 
  X, 
  Send, 
  Bot, 
  User,
  Loader2,
  Sparkles,
  MinusIcon
} from "lucide-react"

interface Message {
  role: "user" | "assistant"
  content: string
}

export default function AIAssistant() {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: "assistant", 
      content: "Bonjour ! Je suis VYXO Assistant. Comment puis-je vous aider avec votre formation ou vos questions sur les GDP ?" 
    }
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }
  
  useEffect(() => {
    scrollToBottom()
  }, [messages])
  
  const sendMessage = async () => {
    if (!input.trim() || isLoading) return
    
    const userMessage = input.trim()
    setInput("")
    setMessages(prev => [...prev, { role: "user", content: userMessage }])
    setIsLoading(true)
    
    try {
      const response = await fetch("/api/ai/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, { role: "user", content: userMessage }].slice(-10),
        }),
      })
      
      const data = await response.json()
      
      if (data.response) {
        setMessages(prev => [...prev, { role: "assistant", content: data.response }])
      } else {
        setMessages(prev => [...prev, { 
          role: "assistant", 
          content: "Désolé, je n'ai pas pu traiter votre demande. Veuillez réessayer." 
        }])
      }
    } catch (error) {
      setMessages(prev => [...prev, { 
        role: "assistant", 
        content: "Erreur de connexion. Veuillez vérifier votre connexion internet." 
      }])
    } finally {
      setIsLoading(false)
    }
  }
  
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      sendMessage()
    }
  }
  
  const suggestedQuestions = [
    "Qu'est-ce que les GDP ?",
    "Comment améliorer mon score ?",
    "Expliquer la chaîne du froid",
  ]
  
  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-gradient-to-br from-vyxo-gold to-amber-500 rounded-full shadow-lg flex items-center justify-center hover:scale-105 transition-transform z-50"
      >
        <MessageSquare className="w-6 h-6 text-vyxo-navy" />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-emerald-500 rounded-full flex items-center justify-center">
          <Sparkles className="w-2.5 h-2.5 text-white" />
        </span>
      </button>
    )
  }
  
  return (
    <div 
      className={`fixed bottom-6 right-6 w-96 bg-background border rounded-2xl shadow-2xl z-50 flex flex-col overflow-hidden transition-all ${
        isMinimized ? "h-14" : "h-[500px]"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b bg-gradient-to-r from-vyxo-navy to-vyxo-navy/90">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-vyxo-gold/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-vyxo-gold" />
          </div>
          <div>
            <h3 className="font-semibold text-white">VYXO Assistant</h3>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-xs text-white/70">En ligne</span>
            </div>
          </div>
        </div>
        <div className="flex gap-1">
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => setIsMinimized(!isMinimized)}
          >
            <MinusIcon className="w-4 h-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 text-white/70 hover:text-white hover:bg-white/10"
            onClick={() => setIsOpen(false)}
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {!isMinimized && (
        <>
          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message, i) => (
              <div 
                key={i}
                className={`flex gap-3 ${message.role === "user" ? "flex-row-reverse" : ""}`}
              >
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                  message.role === "user" 
                    ? "bg-vyxo-gold/10" 
                    : "bg-vyxo-navy/10"
                }`}>
                  {message.role === "user" ? (
                    <User className="w-4 h-4 text-vyxo-gold" />
                  ) : (
                    <Bot className="w-4 h-4 text-vyxo-navy" />
                  )}
                </div>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                  message.role === "user"
                    ? "bg-vyxo-gold text-vyxo-navy"
                    : "bg-secondary"
                }`}>
                  <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                </div>
              </div>
            ))}
            
            {isLoading && (
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-vyxo-navy/10 flex items-center justify-center">
                  <Bot className="w-4 h-4 text-vyxo-navy" />
                </div>
                <div className="bg-secondary rounded-2xl px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin" />
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>
          
          {/* Suggested questions */}
          {messages.length === 1 && (
            <div className="px-4 pb-2">
              <p className="text-xs text-muted-foreground mb-2">Suggestions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.map((q, i) => (
                  <Badge 
                    key={i}
                    variant="outline"
                    className="cursor-pointer hover:bg-secondary text-xs"
                    onClick={() => {
                      setInput(q)
                    }}
                  >
                    {q}
                  </Badge>
                ))}
              </div>
            </div>
          )}
          
          {/* Input */}
          <div className="p-4 border-t">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Posez votre question..."
                disabled={isLoading}
                className="flex-1"
              />
              <Button 
                onClick={sendMessage}
                disabled={!input.trim() || isLoading}
                className="bg-vyxo-gold hover:bg-vyxo-gold/90 text-vyxo-navy"
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground text-center mt-2">
              Propulsé par OpenAI GPT-4
            </p>
          </div>
        </>
      )}
    </div>
  )
}
