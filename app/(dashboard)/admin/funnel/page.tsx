"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  TrendingUp, 
  TrendingDown,
  Users,
  Target,
  FileText,
  UserPlus,
  ArrowRight,
  Filter,
  Download,
  Eye,
  MousePointer,
  CheckCircle2,
  ClipboardList
} from "lucide-react"

// Types
interface FunnelStep {
  id: string
  name: string
  icon: React.ReactNode
  count: number
  percentage: number
  dropOff: number
  color: string
}

interface ConversionMetric {
  label: string
  value: string
  change: number
  trend: 'up' | 'down'
}

interface RecentLead {
  id: string
  name: string
  company: string
  certification: string
  score: number
  qualityScore: 'hot' | 'warm' | 'cold'
  createdAt: Date
}

// Mock data - replace with real API calls
const funnelData: FunnelStep[] = [
  { id: 'visits', name: 'Visiteurs', icon: <Eye className="h-4 w-4" />, count: 2840, percentage: 100, dropOff: 0, color: 'bg-blue-500' },
  { id: 'demo_started', name: 'Demo Démarrée', icon: <MousePointer className="h-4 w-4" />, count: 1420, percentage: 50, dropOff: 50, color: 'bg-purple-500' },
  { id: 'vertical_selected', name: 'Vertical Sélectionné', icon: <Target className="h-4 w-4" />, count: 1136, percentage: 40, dropOff: 20, color: 'bg-indigo-500' },
  { id: 'certification_selected', name: 'Certification Choisie', icon: <ClipboardList className="h-4 w-4" />, count: 852, percentage: 30, dropOff: 25, color: 'bg-cyan-500' },
  { id: 'assessment_completed', name: 'Assessment Terminé', icon: <CheckCircle2 className="h-4 w-4" />, count: 568, percentage: 20, dropOff: 33, color: 'bg-green-500' },
  { id: 'pdf_downloaded', name: 'PDF Téléchargé', icon: <FileText className="h-4 w-4" />, count: 426, percentage: 15, dropOff: 25, color: 'bg-amber-500' },
  { id: 'account_created', name: 'Compte Créé', icon: <UserPlus className="h-4 w-4" />, count: 284, percentage: 10, dropOff: 33, color: 'bg-rose-500' },
]

const conversionMetrics: ConversionMetric[] = [
  { label: 'Taux de conversion global', value: '10.0%', change: 2.3, trend: 'up' },
  { label: 'Visiteurs → Demo', value: '50.0%', change: 5.2, trend: 'up' },
  { label: 'Demo → Assessment', value: '40.0%', change: -1.5, trend: 'down' },
  { label: 'Assessment → Lead', value: '50.0%', change: 3.8, trend: 'up' },
]

const recentLeads: RecentLead[] = [
  { id: '1', name: 'Jean Dupont', company: 'PharmaLogistics SA', certification: 'GDP', score: 72, qualityScore: 'hot', createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000) },
  { id: '2', name: 'Marie Laurent', company: 'SecureTech SARL', certification: 'ISO 27001', score: 58, qualityScore: 'warm', createdAt: new Date(Date.now() - 5 * 60 * 60 * 1000) },
  { id: '3', name: 'Pierre Martin', company: 'FoodSafe Corp', certification: 'HACCP', score: 85, qualityScore: 'hot', createdAt: new Date(Date.now() - 8 * 60 * 60 * 1000) },
  { id: '4', name: 'Sophie Bernard', company: 'AeroSecurity', certification: '11.2.5', score: 45, qualityScore: 'cold', createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000) },
  { id: '5', name: 'Luc Moreau', company: 'LeanPro Industries', certification: 'Green Belt', score: 67, qualityScore: 'warm', createdAt: new Date(Date.now() - 48 * 60 * 60 * 1000) },
]

function getQualityBadge(quality: 'hot' | 'warm' | 'cold') {
  switch (quality) {
    case 'hot':
      return <Badge className="bg-red-500 hover:bg-red-600">🔥 Hot</Badge>
    case 'warm':
      return <Badge className="bg-amber-500 hover:bg-amber-600">☀️ Warm</Badge>
    case 'cold':
      return <Badge className="bg-blue-500 hover:bg-blue-600">❄️ Cold</Badge>
  }
}

function formatTimeAgo(date: Date): string {
  const hours = Math.floor((Date.now() - date.getTime()) / (1000 * 60 * 60))
  if (hours < 1) return "Il y a moins d'1h"
  if (hours < 24) return `Il y a ${hours}h`
  const days = Math.floor(hours / 24)
  return `Il y a ${days}j`
}

export default function FunnelDashboardPage() {
  const [period, setPeriod] = useState<'7d' | '30d' | '90d'>('30d')

  return (
    <div className="container-vyxo py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight animate-slide-in-left">
            📊 Funnel de Conversion
          </h1>
          <p className="text-muted-foreground mt-1">
            Analysez le parcours de vos visiteurs vers la conversion
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Tabs value={period} onValueChange={(v) => setPeriod(v as '7d' | '30d' | '90d')}>
            <TabsList>
              <TabsTrigger value="7d">7 jours</TabsTrigger>
              <TabsTrigger value="30d">30 jours</TabsTrigger>
              <TabsTrigger value="90d">90 jours</TabsTrigger>
            </TabsList>
          </Tabs>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon">
            <Download className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Conversion Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {conversionMetrics.map((metric, index) => (
          <Card key={metric.label} className={`bento-card animate-slide-in-up stagger-${index + 1}`} style={{ animationFillMode: 'both' }}>
            <CardContent className="pt-6">
              <p className="text-sm text-muted-foreground">{metric.label}</p>
              <div className="flex items-end gap-2 mt-2">
                <span className="text-3xl font-bold">{metric.value}</span>
                <div className={`flex items-center text-sm ${metric.trend === 'up' ? 'text-green-500' : 'text-red-500'}`}>
                  {metric.trend === 'up' ? (
                    <TrendingUp className="h-4 w-4 mr-1" />
                  ) : (
                    <TrendingDown className="h-4 w-4 mr-1" />
                  )}
                  {metric.change > 0 ? '+' : ''}{metric.change}%
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Funnel Visualization */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-vyxo-gold" />
            Funnel Demo → Lead
          </CardTitle>
          <CardDescription>
            Visualisez les étapes de conversion et identifiez les points de friction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {funnelData.map((step, index) => (
              <div key={step.id} className="relative">
                <div className="flex items-center gap-4">
                  {/* Step indicator */}
                  <div className={`flex-shrink-0 w-10 h-10 rounded-full ${step.color} flex items-center justify-center text-white animate-bounce-in`} style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}>
                    {step.icon}
                  </div>
                  
                  {/* Step content */}
                  <div className="flex-grow">
                    <div className="flex items-center justify-between mb-1">
                      <span className="font-medium">{step.name}</span>
                      <div className="flex items-center gap-4">
                        <span className="text-lg font-bold">{step.count.toLocaleString()}</span>
                        <Badge variant="outline">{step.percentage}%</Badge>
                        {step.dropOff > 0 && (
                          <span className="text-sm text-red-500">-{step.dropOff}%</span>
                        )}
                      </div>
                    </div>
                    {/* Progress bar */}
                    <div className="h-3 bg-muted rounded-full overflow-hidden">
                      <div 
                        className={`h-full ${step.color} transition-all duration-1000 ease-out animate-progress-fill`}
                        style={{ width: `${step.percentage}%` }}
                      />
                    </div>
                  </div>
                </div>
                
                {/* Connector arrow */}
                {index < funnelData.length - 1 && (
                  <div className="absolute left-5 top-12 bottom-0 w-px bg-border">
                    <ArrowRight className="absolute -bottom-1 -left-1.5 h-4 w-4 text-muted-foreground" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Bottom row: Leads Table + Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Leads Table */}
        <Card className="bento-card lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-vyxo-gold" />
              Leads Récents
            </CardTitle>
            <CardDescription>
              Les derniers prospects qualifiés via le funnel demo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Contact</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Certification</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Score</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Qualité</th>
                    <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {recentLeads.map((lead, index) => (
                    <tr key={lead.id} className={`border-b last:border-0 hover:bg-muted/50 transition-colors animate-slide-in-right`} style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}>
                      <td className="py-3 px-2">
                        <div>
                          <p className="font-medium">{lead.name}</p>
                          <p className="text-sm text-muted-foreground">{lead.company}</p>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        <Badge variant="outline">{lead.certification}</Badge>
                      </td>
                      <td className="py-3 px-2">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{lead.score}%</span>
                          <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className={`h-full rounded-full ${lead.score >= 70 ? 'bg-green-500' : lead.score >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                              style={{ width: `${lead.score}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="py-3 px-2">
                        {getQualityBadge(lead.qualityScore)}
                      </td>
                      <td className="py-3 px-2 text-sm text-muted-foreground">
                        {formatTimeAgo(lead.createdAt)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Button variant="ghost" className="w-full mt-4">
              Voir tous les leads →
            </Button>
          </CardContent>
        </Card>

        {/* Insights Card */}
        <Card className="bento-card">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              💡 Insights
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 bg-green-500/10 dark:bg-green-500/20 rounded-lg border border-green-500/20">
              <p className="text-sm font-medium text-green-600 dark:text-green-400">
                🎉 Top Performer
              </p>
              <p className="text-sm mt-1">
                Le vertical <strong>Pharma</strong> a le meilleur taux de conversion (15%)
              </p>
            </div>
            
            <div className="p-4 bg-amber-500/10 dark:bg-amber-500/20 rounded-lg border border-amber-500/20">
              <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                ⚠️ Point de friction
              </p>
              <p className="text-sm mt-1">
                33% de drop-off entre Assessment et PDF - améliorer le rapport
              </p>
            </div>
            
            <div className="p-4 bg-blue-500/10 dark:bg-blue-500/20 rounded-lg border border-blue-500/20">
              <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                📈 Tendance
              </p>
              <p className="text-sm mt-1">
                Le volume de leads a augmenté de <strong>+23%</strong> ce mois
              </p>
            </div>

            <div className="p-4 bg-purple-500/10 dark:bg-purple-500/20 rounded-lg border border-purple-500/20">
              <p className="text-sm font-medium text-purple-600 dark:text-purple-400">
                🎯 Recommandation
              </p>
              <p className="text-sm mt-1">
                Ajouter un CTA intermédiaire après le score pour booster les conversions
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Vertical Performance */}
      <Card className="bento-card">
        <CardHeader>
          <CardTitle>Performance par Vertical</CardTitle>
          <CardDescription>Comparaison des taux de conversion par secteur</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {[
              { name: '💊 Pharma', visitors: 680, leads: 102, rate: 15 },
              { name: '🔒 Cyber', visitors: 520, leads: 62, rate: 12 },
              { name: '⚙️ Ops', visitors: 440, leads: 44, rate: 10 },
              { name: '✈️ Sûreté', visitors: 380, leads: 34, rate: 9 },
              { name: '🍽️ Agro', visitors: 820, leads: 42, rate: 5 },
            ].map((vertical, index) => (
              <div key={vertical.name} className={`p-4 bg-muted/50 rounded-lg text-center hover-lift animate-fade-in`} style={{ animationDelay: `${index * 0.1}s`, animationFillMode: 'both' }}>
                <p className="text-2xl mb-2">{vertical.name.split(' ')[0]}</p>
                <p className="font-medium">{vertical.name.split(' ').slice(1).join(' ')}</p>
                <div className="mt-3 space-y-1">
                  <p className="text-2xl font-bold">{vertical.rate}%</p>
                  <p className="text-xs text-muted-foreground">
                    {vertical.leads} / {vertical.visitors} visiteurs
                  </p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
