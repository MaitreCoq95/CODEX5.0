# 📋 VYXO CODEX - ROADMAP PHASE 2 DÉTAILLÉE

> **Référence** : `vyxo_codex_visualisation_pages.md` + `vyxo_codex_refonte_complete.md`  
> **Estimation totale** : 20-30 jours

---

## 📊 Progression

```
PHASE 1 (Analytics Layer) : [████████████████████] 100% ✅
PHASE 2 (Core Features)   : [████████████████████] 100% ✅ (Prompts 7-16 TERMINÉ!)
```

---

# ✅ PROMPT 7 - Pages Publiques & Marketing (COMPLÉTÉ)

**Durée** : 2-3 jours | **Priorité** : Haute | **Status** : ✅ TERMINÉ

## Objectif

Créer toutes les pages marketing pour conversion visiteurs → utilisateurs

## Pages à Créer

### 1. Homepage (/)

**Sections requises :**

```
1. HEADER
   - Logo VYXO
   - Nav: Features | Pricing | Login
   - CTA: "Essai Gratuit"

2. HERO SECTION
   - Titre: "Transformez votre conformité opérationnelle en avantage compétitif"
   - Sous-titre: "Plateforme tout-en-un : Diagnostic, Formation, Pilotage"
   - 2 CTA: [Démarrer l'assessment gratuit] [Voir la démo]
   - Screenshot/Video dashboard

3. SOCIAL PROOF
   - Témoignage client (citation + nom + poste)
   - Logos clients partenaires
   - Stats: "87% de maturité GDP en 6 mois"

4. LES 3 PILIERS (cards)
   - 📊 DIAGNOSTIC : Assessment en 15min
   - 📚 FORMATION : Learning adaptatif
   - 📈 PILOTAGE : Dashboards temps réel

5. FEATURES CLÉS (icônes + texte)
   - Assessment automatisé avec rapport PDF
   - Parcours formation personnalisés
   - Certifications reconnues
   - Analytics prédictifs
   - Intégrations Google/Microsoft

6. CTA FINAL
   - "Prêt à transformer votre organisation ?"
   - [Commencer l'assessment gratuit]
   - "Aucune carte bancaire requise"

7. FOOTER
   - Logo + liens (Produit, Ressources, Entreprise, Légal)
   - © 2025 VYXO Consulting
```

**Fichier** : `app/(marketing)/page.tsx`

---

### 2. Pricing Page (/pricing)

**Structure :**

```typescript
interface PricingPlan {
  name: "Starter" | "Professional" | "Enterprise" | "Custom";
  price: string;
  description: string;
  features: string[];
  cta: string;
  highlighted?: boolean;
}

const plans: PricingPlan[] = [
  {
    name: "Starter",
    price: "Gratuit",
    features: [
      "1 utilisateur",
      "Assessments de base",
      "5 modules",
      "Rapports PDF",
    ],
    cta: "Commencer",
  },
  {
    name: "Professional",
    price: "49€/user/mois",
    features: [
      "Utilisateurs illimités",
      "Tous les modules",
      "Analytics complets",
      "API access",
      "Intégrations",
      "Support email",
    ],
    cta: "Essai 14 jours",
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Sur devis",
    features: [
      "Tout Professional +",
      "White-label",
      "SSO (SAML)",
      "Support prioritaire",
      "Contenu custom",
      "Compliance package",
    ],
    cta: "Démo privée",
  },
  {
    name: "Custom",
    price: "Sur devis",
    features: [
      "White-label complet",
      "Développement custom",
      "Support dédié",
      "SLA garantis",
    ],
    cta: "Nous contacter",
  },
];
```

**Éléments UI :**

- Toggle Mensuel/Annuel (-20%)
- FAQ accordion (Changement plan, Facturation, Frais cachés)
- Comparaison features (tableau)

**Fichier** : `app/(marketing)/pricing/page.tsx`

---

### 3. Demo Assessment (/demo)

**Flow multi-étapes :**

```typescript
// Étape 1: Info entreprise
interface Step1Data {
  companyName: string;
  industry: "pharma" | "logistics" | "food" | "manufacturing" | "other";
  employeeCount: "1-10" | "11-50" | "51-200" | "201-500" | "500+";
  targetCertification: "GDP" | "ISO9001" | "ISO27001" | "HACCP";
}

// Étapes 2-4: Questions assessment (simplifiées)
// 10-15 questions max pour démo

// Étape 5: Résultats
interface DemoResult {
  score: number; // 0-100
  maturityLevel: "Débutant" | "Intermédiaire" | "Avancé" | "Expert";
  percentile: number; // Position dans industrie
  estimatedTimeToReady: string; // "12-18 mois"
  criticalGaps: {
    title: string;
    severity: "minor" | "major" | "critical";
  }[];
}
```

**Lead Magnet :**

- Email requis pour PDF complet (15 pages)
- Auto-création compte freemium
- Email avec rapport + CTA signup

**Fichiers** :

- `app/(marketing)/demo/page.tsx`
- `components/demo/demo-wizard.tsx`
- `components/demo/result-gauge.tsx`

---

### 4. Pages Légales

```
/terms    → Conditions Générales d'Utilisation
/privacy  → Politique de Confidentialité
/gdpr     → Conformité RGPD + Droits utilisateurs
```

**Fichiers** :

- `app/(marketing)/terms/page.tsx`
- `app/(marketing)/privacy/page.tsx`
- `app/(marketing)/gdpr/page.tsx`

---

## Fichiers à Créer

```
app/(marketing)/
├── layout.tsx              # Layout marketing (header/footer différent)
├── page.tsx                # Homepage
├── pricing/page.tsx        # Pricing
├── demo/page.tsx           # Demo assessment
├── terms/page.tsx          # CGU
├── privacy/page.tsx        # Privacy
└── gdpr/page.tsx           # GDPR

components/marketing/
├── hero-section.tsx
├── pricing-card.tsx
├── pricing-toggle.tsx
├── feature-grid.tsx
├── testimonial-card.tsx
├── faq-accordion.tsx
└── cta-section.tsx
```

---

## Critères de Succès

- [ ] Homepage responsive avec animations
- [ ] Pricing avec toggle mensuel/annuel
- [ ] Demo assessment 5 étapes fonctionnel
- [ ] Lead capture avec email
- [ ] Pages légales complètes
- [ ] SEO meta tags sur chaque page

---

# ✅ PROMPT 8 - Team & Manager Features (COMPLÉTÉ)

**Durée** : 2-3 jours | **Priorité** : Haute | **Status** : ✅ TERMINÉ

## Objectif

Fonctionnalités complètes pour managers d'équipe

## Pages à Créer

### 1. Team Dashboard (/team)

**Wireframe :**

```
┌──────────────────────────────────────────────────────────────────┐
│  Mon Équipe                                                       │
│  Gérez et suivez la progression de votre équipe                  │
└──────────────────────────────────────────────────────────────────┘

┌────────────────┐  ┌────────────────┐  ┌────────────────┐
│ 👥 Équipe      │  │ 📊 Score Moyen │  │ 📚 Modules     │
│    12          │  │     68%        │  │   34/48        │
│   membres      │  │   (+3% 30j)    │  │  complétés     │
└────────────────┘  └────────────────┘  └────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  📈 PROGRESSION ÉQUIPE (30 derniers jours)                        │
│  [LineChart avec évolution score moyen]                          │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  👥 MEMBRES DE L'ÉQUIPE                          [+ Assigner]     │
│  [Table: Nom | Poste | Modules | Score | Dernier actif]          │
│  Avec status indicator: 🟢 Actif 🟡 Inactif 🔴 À risque          │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  ⚠️ ALERTES ÉQUIPE                                                │
│  - 🔴 Sophie M. : Aucune activité depuis 5 jours                 │
│  - 🟠 3 membres : Score inférieur à 60%                          │
│  Actions: [Envoyer message] [Assigner module]                    │
└──────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────┐
│  📊 HEATMAP COMPÉTENCES ÉQUIPE                                    │
│  [Heatmap: Membres vs Compétences (GDP, ISO, Sécu, Log, HACCP)]  │
│  🟢 Expert (80-100%)  🟡 Intermédiaire (60-79%)  🔴 Débutant (<60%)│
└──────────────────────────────────────────────────────────────────┘
```

**Composants requis :**

```typescript
interface TeamMember {
  id: string;
  name: string;
  email: string;
  position: string;
  department: string;
  avatar?: string;
  score: number;
  modulesCompleted: number;
  totalModules: number;
  lastActivity: Date;
  status: "active" | "inactive" | "at_risk";
}

interface TeamAlert {
  id: string;
  type: "inactivity" | "low_score" | "deadline_missed" | "gap_identified";
  severity: "warning" | "critical";
  memberId: string;
  memberName: string;
  message: string;
  actions: ("send_message" | "assign_module" | "schedule_meeting")[];
  createdAt: Date;
}

interface CompetencyHeatmapData {
  members: string[];
  competencies: string[];
  scores: number[][]; // [member][competency]
}
```

---

### 2. Team Member Detail (/team/members/[id])

**Sections :**

```
┌──────────────────────────────────────────────────────────────────┐
│  ← Retour à l'équipe                                             │
│                                                                   │
│  [Avatar]  Marie Laurent                                          │
│            Chauffeur-livreur • Équipe Logistique                  │
│            📧 marie.laurent@company.fr                            │
│                                                                   │
│  [📧 Envoyer message]  [📚 Assigner module]  [⚙️ Actions ▼]     │
└──────────────────────────────────────────────────────────────────┘

KPIs: Score Global (85%) | Progression (8/12 modules) | Temps passé (12h 34min)

📈 HISTORIQUE DE PROGRESSION (LineChart 6 mois)

📚 MODULES
  ✅ Complétés (8) - liste avec scores et dates
  🔄 En cours (2) - avec progression % et deadline
  📋 À faire (2) - assignés par manager

🎯 COMPÉTENCES (Radar Chart)
  Forces: Gestion chaîne du froid, Documentation, Sécurité routière
  À améliorer: HACCP, Procédures ISO

📝 NOTES MANAGER (éditeur privé)
```

---

### 3. Team Assignments (/team/assignments)

**Interface :**

```typescript
interface ModuleAssignment {
  id: string;
  moduleId: string;
  moduleName: string;
  assignedTo: string[];
  assignedBy: string;
  deadline?: Date;
  priority: "low" | "normal" | "high" | "urgent";
  message?: string;
  createdAt: Date;
  progress: {
    userId: string;
    userName: string;
    status: "not_started" | "in_progress" | "completed";
    progress: number;
    completedAt?: Date;
  }[];
}

// Modal création assignment
interface CreateAssignmentForm {
  moduleId: string;
  assignTo: "all" | "selected";
  selectedMembers?: string[];
  deadline?: Date;
  priority: "low" | "normal" | "high" | "urgent";
  message?: string;
  notifications: {
    notifyImmediately: boolean;
    reminderDaysBefore: number;
    alertIfNotStarted: number; // jours
  };
}
```

---

## Fichiers à Créer

```
app/(dashboard)/team/
├── page.tsx                    # Team dashboard
├── members/page.tsx            # Liste membres
├── members/[id]/page.tsx       # Détail membre
└── assignments/page.tsx        # Gestion assignments

components/team/
├── team-stats-cards.tsx
├── team-members-table.tsx
├── team-alerts-list.tsx
├── competency-heatmap.tsx
├── member-profile-card.tsx
├── member-progress-chart.tsx
├── member-modules-list.tsx
├── member-competencies-radar.tsx
├── manager-notes-editor.tsx
├── assignment-list.tsx
├── assignment-modal.tsx
└── assignment-progress-table.tsx
```

---

## API Routes

```typescript
// Routes pour équipe
GET    /api/team                     // Dashboard équipe
GET    /api/team/members             // Liste membres
GET    /api/team/members/:id         // Détail membre
POST   /api/team/members/:id/message // Envoyer message
GET    /api/team/assignments         // Liste assignments
POST   /api/team/assignments         // Créer assignment
PUT    /api/team/assignments/:id     // Modifier assignment
DELETE /api/team/assignments/:id     // Supprimer assignment
GET    /api/team/alerts              // Alertes équipe
POST   /api/team/alerts/:id/dismiss  // Ignorer alerte
```

---

## Critères de Succès

- [ ] Dashboard équipe avec KPIs temps réel
- [ ] Heatmap compétences interactif
- [ ] Système d'alertes automatiques
- [ ] Page détail membre complète
- [ ] Modal assignment avec notifications
- [ ] Suivi progression assignments

---

# ✅ PROMPT 9 - Admin Organization Panel (COMPLÉTÉ)

**Durée** : 3-4 jours | **Priorité** : Haute | **Status** : ✅ TERMINÉ

## Objectif

Panel administration complet pour gestionnaires d'organisation

## Pages à Créer

### 1. Admin Dashboard (/admin)

**KPIs globaux :**

- 👥 Utilisateurs actifs (142, +3 ce mois)
- 📊 Maturité Globale (67%, +12% 90j)
- 🏆 Certifications obtenues (28)

**Visualisations :**

- Bar chart horizontal: Maturité par département
- Line chart: Progression 12 mois
- Alertes critiques (gaps, utilisateurs inactifs)

---

### 2. Users Management (/admin/users)

**Interface CRUD complète :**

```typescript
interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: "user" | "manager" | "admin";
  department: string;
  manager?: string;
  score: number;
  status: "active" | "inactive" | "invited";
  createdAt: Date;
  lastLogin?: Date;
}

// Filtres sidebar
interface UserFilters {
  role: string[];
  department: string[];
  status: string[];
  scoreRange: [number, number];
}

// Modal ajout utilisateur
interface CreateUserForm {
  email: string;
  name: string;
  role: "user" | "manager" | "admin";
  department: string;
  manager?: string;
  assignedModules?: string[];
  sendInvitation: boolean;
}
```

**Fonctionnalités :**

- Tableau paginé avec tri/filtres
- Import CSV/Excel (bulk import)
- Actions: Éditer, Désactiver, Supprimer
- Historique activité utilisateur

---

### 3. Departments (/admin/departments)

```typescript
interface Department {
  id: string;
  name: string;
  managerId?: string;
  managerName?: string;
  memberCount: number;
  avgScore: number;
  createdAt: Date;
}
```

---

### 4. Content Management (/admin/content)

#### 4.1 Module Builder (/admin/content/modules/new)

**Éditeur complet :**

```typescript
interface ModuleForm {
  // Informations générales
  title: string;
  description: string;
  coverImage?: string;
  category: string;
  targetCertifications: string[];
  difficulty: "beginner" | "intermediate" | "advanced" | "expert";
  estimatedDuration: number; // minutes
  language: string;

  // Prérequis
  prerequisites: {
    moduleIds?: string[];
    competencyIds?: string[];
    minAssessmentScore?: number;
  };

  // Contenu
  sections: {
    title: string;
    order: number;
    blocks: ContentBlock[];
  }[];

  // Objectifs & Compétences
  learningObjectives: string[];
  competenciesGained: string[];

  // Gamification
  xpReward: number;
  badge?: string;
  unlocksModules?: string[];

  // Publication
  status: "draft" | "published" | "archived";
  visibility: "all" | "departments";
  visibleToDepartments?: string[];
}

type ContentBlock =
  | { type: "text"; content: string }
  | { type: "video"; url: string; duration: number; subtitles?: boolean }
  | { type: "image"; url: string; caption?: string }
  | { type: "quiz"; questions: Question[]; passingScore: number }
  | { type: "pdf"; url: string }
  | {
      type: "interactive";
      interactionType: "simulation" | "drag_drop" | "flowchart";
    };
```

**Features UI :**

- Éditeur WYSIWYG (TipTap/Lexical)
- Drag & drop sections et blocs
- Upload vidéos avec traitement
- Preview multi-devices
- Historique versions

---

#### 4.2 Assessment Builder (/admin/content/assessments/new)

```typescript
interface AssessmentTemplateForm {
  name: string;
  description: string;
  targetCertifications: string[];
  industry: string[];
  estimatedDuration: number;

  sections: {
    title: string;
    description: string;
    weight: number; // 0-100 pour scoring
    order: number;
    questions: AssessmentQuestion[];
  }[];

  scoringMethod: "weighted" | "simple" | "custom";
  maturityLevels: {
    name: string;
    minScore: number;
    maxScore: number;
    description: string;
  }[];
}

interface AssessmentQuestion {
  type: "single_choice" | "multiple_choice" | "scale" | "text" | "file_upload";
  question: string;
  helpText?: string;
  required: boolean;
  options?: { label: string; value: number }[];
  scoring: {
    maxPoints: number;
    weightInSection: number;
    criticalQuestion: boolean;
    gapMapping: {
      minScore: number;
      maxScore: number;
      gapLevel: "none" | "minor" | "major" | "critical";
      recommendation: string;
    }[];
  };
  linkedCompetencies?: string[];
  conditionalDisplay?: {
    dependsOnQuestion: string;
    showIfAnswer: string;
  };
}
```

---

### 5. Analytics (/admin/analytics)

**Tabs :**

- Vue Globale
- Formation
- Compliance
- Compétences
- Custom

**Visualisations :**

- Tendances 90j (multi-line chart)
- Top modules (complétion, temps moyen)
- Funnel certifications (inscrits → modules → quiz → certifiés)
- Heatmap compétences par département
- Utilisateurs à risque (liste)

**Export :**

- PDF rapport complet
- Excel données brutes
- Période personnalisable

---

### 6. Settings (/admin/settings)

**Sous-pages :**

```
/admin/settings/organization  # Profil organisation
/admin/settings/branding      # Logo, couleurs, white-label
/admin/settings/integrations  # Google, Microsoft, Stripe, Slack
/admin/settings/billing       # Abonnement, factures
/admin/settings/security      # Politiques, SSO, 2FA
```

```typescript
interface OrganizationSettings {
  name: string;
  industry: string;
  employeeCount: number;
  logo?: string;
  primaryColor?: string;
  timezone: string;
  language: string;
}

interface BrandingSettings {
  logoUrl?: string;
  primaryColor: string;
  secondaryColor: string;
  favicon?: string;
  customCSS?: string;
  emailFooter?: string;
}

interface IntegrationSettings {
  google: {
    enabled: boolean;
    clientId?: string;
    clientSecret?: string;
    scopes: string[];
  };
  microsoft: {
    enabled: boolean;
    tenantId?: string;
    clientId?: string;
  };
  slack: {
    enabled: boolean;
    webhookUrl?: string;
    botToken?: string;
  };
  stripe: {
    enabled: boolean;
    customerId?: string;
  };
}
```

---

## Fichiers à Créer

```
app/(dashboard)/admin/
├── page.tsx                           # Dashboard admin
├── users/
│   ├── page.tsx                       # Liste users
│   ├── new/page.tsx                   # Créer user
│   └── [id]/page.tsx                  # Détail user
├── departments/page.tsx               # Départements
├── content/
│   ├── page.tsx                       # Overview content
│   ├── modules/
│   │   ├── page.tsx                   # Liste modules
│   │   ├── new/page.tsx               # Créer module
│   │   └── [id]/edit/page.tsx         # Éditer module
│   └── assessments/
│       ├── page.tsx                   # Liste assessments
│       ├── new/page.tsx               # Créer assessment
│       └── [id]/edit/page.tsx         # Éditer assessment
├── analytics/
│   ├── page.tsx                       # Vue globale
│   ├── training/page.tsx              # Rapports formation
│   ├── compliance/page.tsx            # Rapports compliance
│   └── custom/page.tsx                # Rapports custom
├── settings/
│   ├── page.tsx                       # Redirect
│   ├── organization/page.tsx          # Profil org
│   ├── branding/page.tsx              # Branding
│   ├── integrations/page.tsx          # Intégrations
│   ├── billing/page.tsx               # Facturation
│   └── security/page.tsx              # Sécurité
└── alerts/page.tsx                    # Centre alertes

components/admin/
├── admin-stats-cards.tsx
├── department-chart.tsx
├── users-table.tsx
├── user-create-modal.tsx
├── user-import-modal.tsx
├── department-list.tsx
├── module-builder/
│   ├── module-form.tsx
│   ├── section-editor.tsx
│   ├── block-editor.tsx
│   ├── content-block-text.tsx
│   ├── content-block-video.tsx
│   ├── content-block-quiz.tsx
│   └── module-preview.tsx
├── assessment-builder/
│   ├── assessment-form.tsx
│   ├── section-builder.tsx
│   ├── question-editor.tsx
│   └── scoring-config.tsx
├── analytics/
│   ├── trend-chart.tsx
│   ├── certification-funnel.tsx
│   ├── competency-heatmap.tsx
│   └── at-risk-users.tsx
└── settings/
    ├── org-settings-form.tsx
    ├── branding-form.tsx
    ├── integration-card.tsx
    └── billing-info.tsx
```

---

## Critères de Succès

- [ ] Dashboard admin avec métriques globales
- [ ] CRUD utilisateurs complet avec import
- [ ] Module builder avec preview
- [ ] Assessment builder avec scoring
- [ ] Analytics avec exports
- [ ] Settings avec intégrations

---

# ✅ PROMPT 10 - Assessment Engine Complet (COMPLÉTÉ)

**Durée** : 3-4 jours | **Priorité** : Critique | **Status** : ✅ TERMINÉ

## Objectif

Moteur d'assessment intelligent avec scoring algorithmique et rapport PDF

## Backend Services

### 1. Assessment Engine Service

```typescript
// services/assessment-engine.service.ts

interface AssessmentSession {
  id: string;
  templateId: string;
  organizationId: string;
  userId: string;
  startedAt: Date;
  completedAt?: Date;
  currentSectionId: string;
  progress: number; // 0-100
  answers: AssessmentAnswer[];
  computedScore?: AssessmentScore;
  status: "in_progress" | "completed" | "abandoned";
}

interface AssessmentAnswer {
  questionId: string;
  value: string | string[] | number;
  answeredAt: Date;
  timeSpent: number; // secondes
  confidence?: number;
  attachments?: string[];
}

interface AssessmentScore {
  overallScore: number; // 0-100
  maturityLevel: MaturityLevel;
  sectionScores: {
    sectionId: string;
    score: number;
    maxScore: number;
    percentage: number;
  }[];
  gaps: IdentifiedGap[];
  strengths: string[];
  priorityActions: PriorityAction[];
  certificationReadiness: {
    certification: string;
    readinessPercentage: number;
    estimatedTimeToReady: string;
    blockers: string[];
  }[];
}

interface IdentifiedGap {
  id: string;
  severity: "low" | "medium" | "high" | "critical";
  category: string;
  title: string;
  description: string;
  affectedSections: string[];
  impactScore: number;
  recommendedActions: string[];
  estimatedEffort: string;
  relatedModules?: string[];
}

interface PriorityAction {
  rank: number;
  action: string;
  rationale: string;
  quickWin: boolean;
  estimatedImpact: "low" | "medium" | "high";
  resources: string[];
}

class AssessmentEngineService {
  // Calculer score de maturité
  calculateMaturityScore(
    answers: AssessmentAnswer[],
    template: AssessmentTemplate
  ): AssessmentScore;

  // Identifier gaps critiques
  identifyGaps(
    sectionScores: SectionScore[],
    answers: AssessmentAnswer[],
    template: AssessmentTemplate
  ): IdentifiedGap[];

  // Générer recommandations IA
  async generatePersonalizedRecommendations(
    score: AssessmentScore,
    organizationContext: Organization
  ): Promise<string[]>;

  // Calculer benchmark sectoriel
  async calculateBenchmark(
    organization: Organization,
    currentScore: AssessmentScore
  ): Promise<BenchmarkData>;
}
```

### 2. Benchmark Service

```typescript
interface BenchmarkData {
  industry: string;
  sampleSize: number;
  averageScores: {
    overall: number;
    bySections: { sectionId: string; avgScore: number }[];
  };
  percentilePosition: number; // 0-100
  topPerformers: {
    anonymizedName: string;
    score: number;
    keyStrengths: string[];
  }[];
}
```

### 3. PDF Report Generator

```typescript
interface AssessmentReport {
  coverPage: {
    organizationName: string;
    assessmentDate: Date;
    certificationType: string;
    overallScore: number;
    maturityLevel: string;
    vyxoLogo: string;
    clientLogo?: string;
  };

  executiveSummary: {
    keyFindings: string[];
    criticalGaps: number;
    readinessLevel: string;
    recommendedTimeline: string;
  };

  detailedAnalysis: {
    sections: {
      name: string;
      score: number;
      maxScore: number;
      findings: string[];
      recommendations: string[];
    }[];
    gapAnalysis: {
      gap: IdentifiedGap;
      visualSeverity: "red" | "orange" | "yellow";
    }[];
    benchmarkComparison: {
      spiderChart: any; // Data pour radar chart
      industryAverage: number;
      percentile: number;
    };
  };

  actionPlan: {
    quickWins: { action: string; impact: string; effort: string }[];
    mediumTerm: { action: string; impact: string; effort: string }[];
    longTerm: { action: string; impact: string; effort: string }[];
    estimatedInvestment: string;
    roiProjection: string;
  };

  appendices: {
    methodology: string;
    rawScores: any;
    glossary: { term: string; definition: string }[];
  };
}

// Génération avec Puppeteer
async function generatePDFReport(
  score: AssessmentScore,
  session: AssessmentSession,
  template: AssessmentTemplate
): Promise<Buffer>;
```

---

## Pages Frontend

### 1. Take Assessment (/assessments/[id]/take)

**Interface progressive :**

- Barre de progression globale
- Navigation sections (sidebar)
- Questions avec types variés
- Sauvegarde automatique
- Timer optionnel
- Boutons: Précédent / Suivant / Terminer

### 2. Results Page (/assessments/[id]/results)

**Sections :**

- Score global avec gauge animée
- Niveau de maturité
- Comparaison benchmark industrie
- Gaps critiques identifiés
- Actions prioritaires
- Boutons: [Télécharger PDF] [Voir parcours recommandé]

---

## Critères de Succès

- [ ] Scoring algorithmique pondéré
- [ ] Identification gaps avec sévérité
- [ ] Génération recommandations IA
- [ ] Benchmark sectoriel temps réel
- [ ] Rapport PDF professionnel 15+ pages
- [ ] Timeline évolution dans le temps

---

# ✅ PROMPT 11 - Learning Adaptatif (COMPLÉTÉ)

**Durée** : 3-4 jours | **Priorité** : Critique | **Status** : ✅ TERMINÉ

## Objectif

Système d'apprentissage personnalisé avec recommandations intelligentes

## Backend Services

### 1. Adaptive Learning Engine

```typescript
interface UserLearningProfile {
  userId: string;
  currentLevel: {
    overall: number;
    byCategory: { categoryId: string; level: number }[];
  };

  learningStyle: {
    preferredContentType: ("text" | "video" | "interactive")[];
    avgSessionDuration: number;
    bestTimeOfDay?: "morning" | "afternoon" | "evening";
    pace: "slow" | "medium" | "fast";
  };

  competencyMatrix: UserCompetency[];
  recommendedPath: LearningPath;
  strengths: string[];
  weaknesses: string[];

  lastAssessment: {
    date: Date;
    score: number;
    gaps: string[];
  };
}

interface LearningPath {
  id: string;
  userId: string;
  goal: string; // "Obtenir certification GDP"
  targetDate?: Date;

  modules: {
    moduleId: string;
    order: number;
    status: "locked" | "available" | "in_progress" | "completed";
    startedAt?: Date;
    completedAt?: Date;
    score?: number;
    mandatory: boolean;
  }[];

  milestones: {
    order: number;
    title: string;
    requiredModules: string[];
    assessment?: string;
    reward?: Badge;
  }[];

  progress: {
    overallProgress: number;
    modulesCompleted: number;
    totalModules: number;
    estimatedTimeRemaining: number; // heures
    onTrack: boolean;
  };
}

// Algorithme génération parcours
async function generatePersonalizedPath(
  userId: string,
  targetCertification: string,
  assessmentResults: AssessmentScore
): Promise<LearningPath>;

// Adaptation dynamique
async function adaptLearningPath(
  userId: string,
  pathId: string,
  recentActivity: UserActivity[]
): Promise<PathAdjustment>;
```

### 2. Quiz Engine Adaptatif

```typescript
class AdaptiveQuizEngine {
  // Générer quiz adapté au niveau
  async generateQuiz(
    moduleId: string,
    userId: string,
    targetDifficulty?: "easy" | "medium" | "hard"
  ): Promise<Quiz>;

  // Ajuster difficulté temps réel
  async adjustDifficultyInRealTime(
    quizSessionId: string,
    currentQuestionIndex: number,
    previousAnswers: UserAnswer[]
  ): Promise<Question>;

  // Feedback détaillé
  generateDetailedFeedback(userAnswers: UserAnswer[], quiz: Quiz): QuizFeedback;
}

interface QuizFeedback {
  score: number;
  passed: boolean;

  questionFeedback: {
    questionId: string;
    isCorrect: boolean;
    userAnswer: string[];
    correctAnswer: string[];
    explanation: string;
    linkedContent: string;
    recommendedReview: boolean;
  }[];

  overallAnalysis: {
    strengths: string[];
    weaknesses: string[];
    recommendedModules: string[];
  };

  nextSteps: string[];
}
```

### 3. Competency Matrix

```typescript
interface Competency {
  id: string;
  name: string;
  category: string;
  description: string;
  linkedCertifications: string[];
  linkedModules: string[];

  levels: {
    level: number; // 1-5
    name: string; // Novice, Compétent, Proficient, Expert, Master
    description: string;
    requirements: string[];
  }[];

  evaluationCriteria: {
    knowledge: string[];
    skills: string[];
    behaviors: string[];
  };
}

interface UserCompetency {
  userId: string;
  competencyId: string;
  currentLevel: number; // 0-100
  lastAssessed: Date;

  history: {
    date: Date;
    level: number;
    assessmentType: "quiz" | "practical" | "peer_review" | "manager_eval";
  }[];

  certifications: {
    certificationType: string;
    obtainedAt: Date;
    expiresAt?: Date;
  }[];

  nextMilestone: {
    targetLevel: number;
    estimatedDate: Date;
    requiredActions: string[];
  };
}
```

---

## Pages Frontend

### 1. My Competencies (/learning/competencies)

**Visualisations :**

- Score global (72/100)
- Radar chart 360° compétences
- Barres progression par catégorie
- Recommandations modules pour progresser
- Certifications obtenues (wallet)

### 2. Learning Path (/learning/path)

**Interface :**

- Timeline visuelle avec milestones
- Modules verrouillés/disponibles/complétés
- Estimation temps restant
- Badge et récompenses à débloquer

### 3. Quiz Results (/learning/modules/[id]/quiz/[quizId]/results)

**Feedback détaillé :**

- Score avec étoiles
- Détails par question
- Explications des erreurs
- Liens vers sections à réviser
- Comparaison moyenne

---

## Critères de Succès

- [ ] Profil apprenant dynamique
- [ ] Génération parcours personnalisé
- [ ] Quiz adaptatif temps réel
- [ ] Radar chart compétences
- [ ] Recommandations intelligentes
- [ ] Historique progression

---

# ✅ PROMPT 12 - Gamification & Certifications (COMPLÉTÉ)

**Durée** : 2-3 jours | **Priorité** : Moyenne | **Status** : ✅ TERMINÉ

## Objectif

Système de gamification complet et gestion certifications

## Gamification

```typescript
interface GamificationProfile {
  userId: string;
  totalXp: number;
  currentLevel: number;
  levelProgress: number; // % vers prochain niveau

  badges: Badge[];
  achievements: Achievement[];

  streak: {
    current: number;
    longest: number;
    lastActivity: Date;
  };

  leaderboardPosition: {
    team?: number;
    organization?: number;
  };
}

interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  rarity: "common" | "rare" | "epic" | "legendary";
  obtainedAt?: Date;
  criteria: string;
}

interface Achievement {
  id: string;
  name: string;
  description: string;
  category: string;
  xpReward: number;
  unlockedAt?: Date;
}

interface Leaderboard {
  scope: "team" | "organization";
  period: "week" | "month" | "all_time";
  entries: {
    rank: number;
    userId: string;
    userName: string;
    avatar?: string;
    xp: number;
    modulesCompleted: number;
  }[];
}
```

## Certifications

```typescript
interface CertificationRecord {
  id: string;
  userId: string;
  certificationType: string;

  obtainedAt: Date;
  expiresAt?: Date;
  certificateNumber: string;

  issuingOrganization: string;
  verificationUrl?: string;

  certificatePDF: string;
  digitalBadge?: string; // URL Credly-style

  prerequisites: {
    modulesCompleted: string[];
    finalAssessmentScore: number;
    practicalExamsCompleted: string[];
  };

  renewalRequirements?: {
    requiredCPD: number;
    renewalModules: string[];
    renewalDeadline: Date;
  };
}

// Génération certificat
async function generateCertificate(
  userId: string,
  certificationType: string
): Promise<CertificationRecord>;

// Vérification éligibilité
function isCertificationEligible(
  completedModules: Module[],
  finalAssessment: Assessment
): boolean;
```

## Social Learning

```typescript
interface Discussion {
  id: string;
  moduleId: string;
  userId: string;
  title: string;
  content: string;
  createdAt: Date;

  replies: Reply[];
  likes: number;
  views: number;

  tags: string[];
  resolved: boolean;

  expertAnswer?: {
    userId: string;
    content: string;
    createdAt: Date;
  };
}

interface PeerReview {
  id: string;
  submissionId: string;
  reviewerId: string;

  criteria: {
    criterionId: string;
    score: number; // 1-5
    feedback: string;
  }[];

  overallScore: number;
  generalFeedback: string;
  createdAt: Date;
}
```

---

## Pages Frontend

### 1. Certifications Wallet (/learning/certifications)

- Grid de certificats obtenus
- Boutons: Télécharger PDF, Partager LinkedIn
- Expiration et renouvellement

### 2. Leaderboard (/leaderboard)

- Tabs: Équipe / Organisation
- Filtres: Semaine / Mois / Tout temps
- Podium animé top 3

### 3. Achievements (/achievements)

- Liste badges avec progression
- Achievements débloqués/verrouillés
- Total XP et niveau

---

## Critères de Succès

- [ ] Système XP et niveaux
- [ ] Badges avec rareté
- [ ] Leaderboards temps réel
- [ ] Streaks avec récompenses
- [ ] Génération certificats PDF
- [ ] Badge digital partageable
- [ ] Forums discussion modules

---

# ✅ PROMPT 13 - Intégrations & API (COMPLÉTÉ)

**Durée** : 2-3 jours | **Priorité** : Haute | **Status** : ✅ TERMINÉ

## Intégrations OAuth

```typescript
// Google Workspace
interface GoogleWorkspaceIntegration {
  syncUsers: () => Promise<void>;
  exportCertificateToDrive: (
    certId: string,
    folderId: string
  ) => Promise<string>;
  createCalendarEvent: (event: CalendarEvent) => Promise<string>;
}

// Microsoft 365
interface Microsoft365Integration {
  authenticateWithAzureAD: (token: string) => Promise<User>;
  sendTeamsNotification: (channel: string, message: string) => Promise<void>;
  uploadToSharePoint: (file: Buffer, path: string) => Promise<string>;
}

// Slack
interface SlackIntegration {
  sendChannelMessage: (channel: string, message: string) => Promise<void>;
  setupSlackBot: () => Promise<void>;
  handleSlackCommand: (command: string, args: string[]) => Promise<string>;
  // Commandes: /vyxo-status, /vyxo-team, /vyxo-alerts
}
```

## Stripe Payments

```typescript
// Gestion abonnements
interface SubscriptionService {
  createCustomer: (org: Organization) => Promise<string>;
  createSubscription: (
    customerId: string,
    planId: string
  ) => Promise<Subscription>;
  updateSubscription: (
    subscriptionId: string,
    newPlanId: string
  ) => Promise<Subscription>;
  cancelSubscription: (subscriptionId: string) => Promise<void>;
  generateInvoice: (customerId: string) => Promise<Invoice>;
}

// Webhooks Stripe
const stripeWebhooks = {
  "invoice.paid": handleInvoicePaid,
  "invoice.payment_failed": handlePaymentFailed,
  "customer.subscription.updated": handleSubscriptionUpdated,
  "customer.subscription.deleted": handleSubscriptionCanceled,
};
```

## API Publique

```typescript
// Routes REST
const apiRoutes = {
  // Auth
  "POST /api/v1/auth/login": authenticateUser,
  "POST /api/v1/auth/refresh": refreshToken,

  // Assessments
  "GET /api/v1/assessments": listAssessments,
  "POST /api/v1/assessments": createAssessment,
  "GET /api/v1/assessments/:id": getAssessment,
  "POST /api/v1/assessments/:id/submit": submitAssessment,
  "GET /api/v1/assessments/:id/report": getAssessmentReport,

  // Learning
  "GET /api/v1/modules": listModules,
  "GET /api/v1/modules/:id": getModule,
  "POST /api/v1/modules/:id/enroll": enrollInModule,
  "GET /api/v1/modules/:id/progress": getModuleProgress,
  "POST /api/v1/modules/:id/complete": completeModule,

  // Users
  "GET /api/v1/users": listUsers,
  "GET /api/v1/users/:id": getUser,
  "GET /api/v1/users/:id/competencies": getUserCompetencies,
  "GET /api/v1/users/:id/certifications": getUserCertifications,

  // Analytics
  "GET /api/v1/analytics/organization": getOrganizationAnalytics,
  "GET /api/v1/analytics/dashboard": getDashboardData,
  "POST /api/v1/analytics/export": exportAnalytics,

  // Webhooks
  "POST /api/v1/webhooks/subscribe": subscribeWebhook,
  "DELETE /api/v1/webhooks/:id": unsubscribeWebhook,
};

// Événements webhooks
type WebhookEvent =
  | "assessment.completed"
  | "module.completed"
  | "certification.obtained"
  | "gap.identified"
  | "alert.triggered"
  | "user.created";
```

## Notifications

```typescript
// Email (Resend)
interface EmailService {
  sendWelcomeEmail: (user: User) => Promise<void>;
  sendAssessmentResult: (user: User, score: AssessmentScore) => Promise<void>;
  sendCertificate: (user: User, cert: CertificationRecord) => Promise<void>;
  sendReminder: (
    user: User,
    type: "inactivity" | "deadline" | "renewal"
  ) => Promise<void>;
}

// Push (optionnel)
interface PushNotificationService {
  subscribe: (userId: string, subscription: PushSubscription) => Promise<void>;
  send: (userId: string, notification: Notification) => Promise<void>;
}
```

---

## Critères de Succès

- [ ] SSO Google Workspace
- [ ] SSO Microsoft 365
- [ ] Notifications Slack/Teams
- [ ] Stripe subscriptions
- [ ] API REST documentée (Swagger)
- [ ] Webhooks événements
- [ ] Rate limiting

---

# ✅ PROMPT 14 - Intelligence Artificielle (COMPLÉTÉ)

**Durée** : 3-4 jours | **Priorité** : Moyenne | **Status** : ✅ TERMINÉ

## OpenAI API Integration (modifié de Claude vers OpenAI)

```typescript
class AIService {
  private claudeClient: Anthropic;

  // Génération contenu formation
  async generateModuleContent(
    topic: string,
    difficulty: string,
    industry: string
  ): Promise<string>;

  // Génération questions quiz
  async generateQuizQuestions(
    moduleContent: string,
    numQuestions: number,
    difficulty: string
  ): Promise<Question[]>;

  // Feedback exercice pratique
  async provideFeedbackOnExercise(
    exercisePrompt: string,
    userSubmission: string,
    rubric: string
  ): Promise<string>;

  // Recommandations personnalisées
  async generatePersonalizedRecommendations(
    userProfile: UserLearningProfile,
    assessmentResults: AssessmentScore
  ): Promise<string[]>;

  // Analyse gaps automatique
  async analyzeGaps(
    assessmentAnswers: AssessmentAnswer[],
    organizationContext: Organization
  ): Promise<IdentifiedGap[]>;

  // Génération plan d'action
  async generateActionPlan(
    gaps: IdentifiedGap[],
    targetCertification: string,
    timeline: string
  ): Promise<PriorityAction[]>;
}
```

## Predictive Analytics

```typescript
class PredictiveAnalyticsService {
  // Prédiction risque certification
  async predictCertificationRisk(
    userId: string,
    certificationId: string
  ): Promise<{
    riskLevel: "low" | "medium" | "high";
    probability: number;
    factors: string[];
    recommendations: string[];
  }>;

  // Détection utilisateurs à risque
  async detectAtRiskUsers(organizationId: string): Promise<
    {
      userId: string;
      userName: string;
      riskScore: number;
      riskFactors: string[];
      suggestedActions: string[];
    }[]
  >;

  // Projection maturité
  async projectMaturityScore(
    organizationId: string,
    monthsAhead: number
  ): Promise<{
    projectedScore: number;
    confidence: number;
    assumptions: string[];
  }>;
}
```

## Automatisations n8n

```typescript
const n8nWorkflows = {
  // Onboarding automatique
  new_user_onboarding: {
    trigger: "user.created",
    steps: [
      { action: "send_welcome_email", template: "welcome" },
      { action: "create_default_learning_path" },
      { action: "schedule_initial_assessment", delay: "24h" },
      { action: "notify_manager" },
    ],
  },

  // Rappels automatiques
  training_reminders: {
    trigger: "schedule.daily",
    steps: [
      { action: "find_inactive_users", criteria: "no_activity_7_days" },
      { action: "send_reminder_email", template: "comeback" },
      { action: "send_slack_dm" },
    ],
  },

  // Escalade gaps critiques
  critical_gap_escalation: {
    trigger: "gap.identified AND gap.severity == critical",
    steps: [
      { action: "create_jira_ticket", project: "COMPLIANCE" },
      { action: "notify_compliance_officer" },
      { action: "schedule_followup", delay: "7d" },
    ],
  },

  // Rapports mensuels
  monthly_reporting: {
    trigger: "schedule.monthly",
    steps: [
      { action: "generate_compliance_report" },
      { action: "generate_training_report" },
      { action: "send_to_executives" },
      { action: "archive_to_drive" },
    ],
  },

  // Renouvellement certifications
  certification_renewal: {
    trigger: "certification.expires_in_60_days",
    steps: [
      { action: "notify_user", channel: "email" },
      { action: "create_renewal_path" },
      { action: "schedule_renewal_assessment" },
      { action: "notify_manager" },
    ],
  },
};
```

---

## Critères de Succès

- [ ] Claude API intégré
- [ ] Génération contenu modules
- [ ] Génération questions quiz
- [ ] Recommandations personnalisées
- [ ] Prédiction risques
- [ ] Workflows n8n configurés

---

# ✅ PROMPT 15 - Sécurité & RGPD (COMPLÉTÉ)

**Durée** : 2 jours | **Priorité** : Critique | **Status** : ✅ TERMINÉ

## RBAC (Role-Based Access Control)

```typescript
const rolePermissions = {
  super_admin: ["*"],

  organization_admin: [
    "users.create",
    "users.read",
    "users.update",
    "users.delete",
    "modules.read",
    "modules.assign",
    "assessments.read",
    "assessments.create",
    "reports.read",
    "reports.create",
    "alerts.read",
    "alerts.manage",
    "integrations.manage",
  ],

  manager: [
    "users.read.team",
    "modules.read",
    "modules.assign.team",
    "assessments.read.team",
    "reports.read.team",
    "alerts.read.team",
  ],

  user: [
    "modules.read",
    "modules.enroll",
    "assessments.take",
    "profile.read",
    "profile.update",
    "certifications.read.own",
  ],

  auditor: [
    "users.read",
    "assessments.read",
    "reports.read",
    "audit_logs.read",
  ],
};

function authorize(requiredPermissions: string[]);
```

## Audit Logging

```typescript
interface AuditLog {
  id: string;
  timestamp: Date;
  userId: string;
  action: string;
  resource: string;
  resourceId: string;
  changes?: { before: any; after: any };
  ipAddress: string;
  userAgent: string;
  result: "success" | "failure";
  errorMessage?: string;
}

const auditableActions = [
  "user.login",
  "user.logout",
  "user.created",
  "user.deleted",
  "assessment.completed",
  "certification.issued",
  "report.generated",
  "settings.updated",
  "data.exported",
  "permission.changed",
];
```

## RGPD

```typescript
// Gestion consentements
interface DataProcessingConsent {
  userId: string;
  purposes: {
    essential: boolean;
    analytics: boolean;
    marketing: boolean;
    thirdPartySharing: boolean;
  };
  grantedAt: Date;
  revokedAt?: Date;
}

// Droit à l'oubli
async function handleDataDeletionRequest(userId: string): Promise<void>;

// Export données (portabilité)
async function exportUserData(userId: string): Promise<Buffer>;
```

## MFA

```typescript
interface MFAConfig {
  enabled: boolean;
  methods: ("totp" | "sms" | "email")[];
  requiredForRoles: string[];
}
```

---

## Critères de Succès

- [ ] RBAC configuré tous rôles
- [ ] Audit logs complets
- [ ] Consentements RGPD
- [ ] Droit à l'oubli
- [ ] Export données
- [ ] MFA optionnel

---

# 📊 RÉSUMÉ GLOBAL

| #         | Prompt                        | Jours     | Priorité           |
| --------- | ----------------------------- | --------- | ------------------ |
| 7         | Pages Publiques & Marketing   | 2-3       | ✅ Terminé         |
| 8         | Team & Manager Features       | 2-3       | 🔴 Haute           |
| 9         | Admin Organization            | 3-4       | 🔴 Haute           |
| 10        | Assessment Engine Complet     | 3-4       | 🔴 Critique        |
| 11        | Learning Adaptatif            | 3-4       | 🔴 Critique        |
| 12        | Gamification & Certifications | 2-3       | 🟡 Moyenne         |
| 13        | Intégrations & API            | 2-3       | 🔴 Haute           |
| 14        | Intelligence Artificielle     | 3-4       | 🟡 Moyenne         |
| 15        | Sécurité & RGPD               | 2         | 🔴 Critique        |
| 16        | Demo Assessment Multi-Normes  | 3-4       | ⚪ Non-Prioritaire |
| **TOTAL** |                               | **25-34** |                    |

---

## 🚀 Prochaine Action

**PROMPT 8** : Team & Manager Features

Tu veux lancer le **PROMPT 8** ?

---

# ⚪ PROMPTS NON-PRIORITAIRES

---

# ✅ PROMPT 16 - Demo Assessment Multi-Normes (COMPLÉTÉ)

**Durée** : 3-4 jours | **Priorité** : Non-Prioritaire | **Status** : ✅ TERMINÉ

## Objectif

Refonte complète du Demo Assessment public (/demo) pour supporter tous les référentiels normatifs avec questions spécifiques à chaque norme.

## Contexte

Le demo assessment actuel est basique avec des questions génériques. Il doit être amélioré pour :

- S'adapter dynamiquement à la certification choisie (GDP, ISO 9001, ISO 27001, HACCP, etc.)
- Proposer des questions issues du vrai référentiel normatif
- Générer un rapport de maturité pertinent selon la norme visée

## Normes à Supporter

```typescript
type SupportedCertification =
  | "GDP" // Good Distribution Practice
  | "ISO9001" // Qualité
  | "ISO27001" // Sécurité de l'information
  | "ISO14001" // Environnement
  | "ISO45001" // Santé et sécurité au travail
  | "HACCP" // Sécurité alimentaire
  | "ISO22000" // Sécurité des denrées alimentaires
  | "AS9100" // Aéronautique
  | "IATF16949" // Automobile
  | "ISO13485"; // Dispositifs médicaux
```

## Architecture

### 1. Base de Questions par Norme

```typescript
interface NormativeQuestionBank {
  certificationId: string;
  version: string;
  lastUpdated: Date;

  categories: {
    id: string;
    name: string; // Ex: "Chapitre 4 - Contexte de l'organisation"
    weight: number; // Pondération dans le score final

    questions: {
      id: string;
      text: string;
      clause?: string; // Référence clause ISO (ex: "4.1")
      type: "single_choice" | "multiple_choice" | "scale" | "yes_no";
      options: {
        label: string;
        score: number; // 0-100
        gapLevel: "none" | "minor" | "major" | "critical";
      }[];
      helpText?: string;
      evidenceRequired?: string[];
    }[];
  }[];

  maturityLevels: {
    level: number;
    name: string;
    minScore: number;
    maxScore: number;
    description: string;
    certificationReadiness: string;
  }[];
}
```

### 2. Exemples Questions par Norme

#### GDP (Good Distribution Practice)

```typescript
const gdpQuestions = [
  {
    category: "Système Qualité",
    clause: "Chapter 1",
    questions: [
      {
        text: "Disposez-vous d'un système qualité pharmaceutique documenté conforme aux BPD ?",
        options: [
          { label: "Non", score: 0, gapLevel: "critical" },
          { label: "En cours de mise en place", score: 25, gapLevel: "major" },
          {
            label: "Oui, partiellement documenté",
            score: 60,
            gapLevel: "minor",
          },
          {
            label: "Oui, complet et revu périodiquement",
            score: 100,
            gapLevel: "none",
          },
        ],
      },
      {
        text: "Comment gérez-vous la qualification de vos équipements de transport ?",
        clause: "Chapter 9",
        options: [
          { label: "Pas de qualification", score: 0, gapLevel: "critical" },
          {
            label: "Qualification initiale uniquement",
            score: 40,
            gapLevel: "major",
          },
          {
            label: "Qualification et maintenance préventive",
            score: 70,
            gapLevel: "minor",
          },
          {
            label: "Qualification complète avec requalification périodique",
            score: 100,
            gapLevel: "none",
          },
        ],
      },
    ],
  },
  {
    category: "Chaîne du Froid",
    clause: "Chapter 9.4",
    questions: [
      {
        text: "Comment surveillez-vous la température pendant le transport ?",
        options: [
          { label: "Pas de surveillance", score: 0, gapLevel: "critical" },
          {
            label: "Surveillance manuelle ponctuelle",
            score: 30,
            gapLevel: "major",
          },
          {
            label: "Enregistreurs de température passifs",
            score: 60,
            gapLevel: "minor",
          },
          {
            label: "Monitoring temps réel avec alertes",
            score: 100,
            gapLevel: "none",
          },
        ],
      },
    ],
  },
];
```

#### ISO 27001 (Sécurité de l'Information)

```typescript
const iso27001Questions = [
  {
    category: "Contexte de l'organisation",
    clause: "4",
    questions: [
      {
        text: "Avez-vous défini le périmètre de votre SMSI ?",
        clause: "4.3",
        options: [
          { label: "Non défini", score: 0, gapLevel: "critical" },
          { label: "Défini informellement", score: 40, gapLevel: "major" },
          { label: "Documenté mais non validé", score: 70, gapLevel: "minor" },
          {
            label: "Documenté, validé et communiqué",
            score: 100,
            gapLevel: "none",
          },
        ],
      },
    ],
  },
  {
    category: "Gestion des risques",
    clause: "6.1",
    questions: [
      {
        text: "Comment identifiez-vous les risques de sécurité de l'information ?",
        clause: "6.1.2",
        options: [
          {
            label: "Pas d'identification formelle",
            score: 0,
            gapLevel: "critical",
          },
          { label: "Identification ponctuelle", score: 35, gapLevel: "major" },
          {
            label: "Analyse de risques annuelle",
            score: 65,
            gapLevel: "minor",
          },
          {
            label: "Processus continu avec registre des risques",
            score: 100,
            gapLevel: "none",
          },
        ],
      },
    ],
  },
  {
    category: "Contrôle d'accès",
    clause: "A.9",
    questions: [
      {
        text: "Comment gérez-vous les accès aux systèmes d'information ?",
        clause: "A.9.2",
        options: [
          { label: "Pas de gestion formelle", score: 0, gapLevel: "critical" },
          {
            label: "Gestion manuelle des comptes",
            score: 40,
            gapLevel: "major",
          },
          {
            label: "Processus documenté avec revues périodiques",
            score: 70,
            gapLevel: "minor",
          },
          {
            label: "IAM automatisé avec revues et audit trail",
            score: 100,
            gapLevel: "none",
          },
        ],
      },
    ],
  },
];
```

### 3. Rapport de Maturité par Norme

```typescript
interface NormativeMaturityReport {
  certification: string;
  assessmentDate: Date;
  organization: {
    name: string;
    industry: string;
    size: string;
  };

  overallScore: number;
  maturityLevel: MaturityLevel;

  categoryScores: {
    categoryId: string;
    categoryName: string;
    clause: string;
    score: number;
    maxScore: number;
    gapsCount: {
      critical: number;
      major: number;
      minor: number;
    };
  }[];

  gapAnalysis: {
    clause: string;
    requirement: string;
    currentState: string;
    gap: string;
    severity: "critical" | "major" | "minor";
    recommendation: string;
    estimatedEffort: string;
    linkedModules: string[];
  }[];

  certificationReadiness: {
    readinessPercentage: number;
    estimatedTimeToReady: string;
    requiredActions: string[];
    blockers: string[];
  };

  benchmark?: {
    industryAverage: number;
    percentile: number;
    topPerformersScore: number;
  };
}
```

### 4. Flow Utilisateur Amélioré

```
1. Choix de la norme visée (avec description)
2. Profil entreprise (secteur, taille, contexte)
3. Questions adaptées à la norme (15-25 questions)
4. Résultats avec :
   - Score global
   - Niveau de maturité selon référentiel
   - Gaps par chapitre/clause
   - Comparaison benchmark sectoriel
5. Capture email pour rapport PDF complet
6. Redirection signup avec parcours pré-généré
```

## Fichiers à Créer/Modifier

```
app/(marketing)/demo/
├── page.tsx                          # Refactoriser
└── [certification]/page.tsx          # Route dynamique par norme

lib/demo/
├── question-banks/
│   ├── gdp.ts
│   ├── iso9001.ts
│   ├── iso27001.ts
│   ├── iso14001.ts
│   ├── haccp.ts
│   └── index.ts
├── scoring.ts                        # Calcul scores par norme
├── report-generator.ts               # Génération rapport maturité
└── benchmark.ts                      # Comparaison benchmark

components/demo/
├── certification-selector.tsx        # Choix norme avec descriptions
├── normative-question.tsx            # Question avec clause ISO
├── maturity-gauge.tsx                # Gauge avec niveaux norme
├── gap-analysis-table.tsx            # Table gaps par clause
└── certification-readiness.tsx       # Estimation readiness
```

## Base de Données

```sql
-- Banque de questions par norme
CREATE TABLE demo_question_banks (
  id UUID PRIMARY KEY,
  certification VARCHAR(50) NOT NULL,
  version VARCHAR(20) NOT NULL,
  questions JSONB NOT NULL,
  maturity_levels JSONB NOT NULL,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Sessions demo (pour analytics)
CREATE TABLE demo_sessions (
  id UUID PRIMARY KEY,
  certification VARCHAR(50) NOT NULL,
  company_name VARCHAR(255),
  industry VARCHAR(100),
  employee_count VARCHAR(50),
  email VARCHAR(255),
  answers JSONB,
  score INTEGER,
  maturity_level VARCHAR(50),
  completed_at TIMESTAMP,
  converted_to_signup BOOLEAN DEFAULT false
);
```

## Critères de Succès

- [ ] Support de 5+ normes avec questions spécifiques
- [ ] Score de maturité aligné aux référentiels normatifs
- [ ] Analyse gaps par chapitre/clause
- [ ] Rapport PDF avec terminologie normative
- [ ] Benchmark sectoriel par norme
- [ ] Taux de conversion demo → signup > 15%

---

> **Note** : Ce prompt est intentionnellement placé en dernier car il nécessite une base solide de données sur les normes et peut être développé progressivement après les fonctionnalités core.
