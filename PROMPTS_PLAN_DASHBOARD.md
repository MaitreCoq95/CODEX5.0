# 🚀 PROMPTS PLAN - DASHBOARD VYXO CODEX

> **Phase 2 : Fonctionnalités Core**  
> **Timeline estimée** : 20 jours  
> **Statut** : 🆕 EN PLANIFICATION

---

## 📊 Progression Globale

```
DASHBOARD & OUTILS : [░░░░░░░░░░░░░░░░░░░░] 0% (Phase 2 - À démarrer)
```

---

## 🗂️ ÉTAT DES LIEUX

### ✅ Déjà Implémenté (Phase 1)

| Élément             | Status                             |
| ------------------- | ---------------------------------- |
| Structure Dashboard | `/app/(dashboard)/*` - 13 dossiers |
| Analytics Layer     | Backend API + Frontend dashboards  |
| Alerting System     | Z-score detection, notifications   |
| Reporting           | Excel export, templates            |
| Landing Pages       | V2 + Partenaires ✅                |

### ❌ Manquant (Phase 2)

| Élément                       | Priorité    |
| ----------------------------- | ----------- |
| Team & Manager Features       | 🔴 Haute    |
| Admin Organization            | 🔴 Haute    |
| Assessment Engine Complet     | 🔴 Critique |
| Learning Adaptatif            | 🟡 Moyenne  |
| Gamification & Certifications | 🟡 Moyenne  |
| Intégrations (SSO, Stripe)    | 🟢 Basse    |
| IA (Claude API)               | 🟢 Basse    |

---

## 📋 LISTE DES PROMPTS PHASE 2

### 🏠 PROMPT 8 - Team & Manager Dashboard (JOUR 1-2)

**Objectif:** Fonctionnalités manager pour gestion équipe

**Livrables:**

1. **Team Dashboard (`/team`)**

   - KPIs équipe (score moyen, modules complétés, streak)
   - Graphique progression 30 jours (Recharts)
   - Heatmap compétences équipe
   - Alertes équipe (inactivité, scores faibles)

2. **Team Members (`/team/members`)**

   - Liste membres avec scores/badges
   - Filtres (département, score, activité)
   - Export liste Excel

3. **Member Detail (`/team/members/[id]`)**

   - Profil apprenant complet
   - Historique progression
   - Notes manager privées

4. **Team Assignments (`/team/assignments`)**
   - Assigner modules à équipe/individus
   - Suivi deadlines avec alertes
   - Notifications automatiques

**Fichiers:**

```
app/(dashboard)/team/
├── page.tsx                    # Dashboard équipe
├── members/
│   ├── page.tsx               # Liste membres
│   └── [memberId]/page.tsx    # Détail membre
└── assignments/
    └── page.tsx               # Assignments

components/team/
├── team-kpis.tsx
├── team-chart.tsx
├── team-heatmap.tsx
├── member-card.tsx
├── member-detail.tsx
├── assignment-modal.tsx
└── manager-notes.tsx

lib/services/team.service.ts
app/api/team/route.ts
app/api/team/members/route.ts
app/api/team/assignments/route.ts
```

---

### 🏢 PROMPT 9 - Admin Organization (JOUR 3-5)

**Objectif:** Panel admin complet pour organisation

**Livrables:**

1. **Admin Dashboard (`/admin`)**

   - Score maturité global organisation
   - Maturité par département (bar chart)
   - Alertes critiques gaps
   - Timeline prochaines deadlines certif

2. **Users Management (`/admin/users`)**

   - CRUD utilisateurs complet
   - Import CSV/Excel (bulk)
   - Filtres avancés (rôle, département, score)
   - Invitation email automatique
   - Désactivation / suppression

3. **Departments (`/admin/departments`)**

   - Gestion départements
   - Assignment managers
   - Quotas et limites

4. **Content Management (`/admin/content`)**

   - Module builder (éditeur WYSIWYG)
   - Assessment creator (drag & drop)
   - Upload médias (S3/Supabase Storage)
   - Versioning contenu

5. **Organization Settings (`/admin/settings`)**
   - Profil organisation
   - Branding (logo, couleurs, domaine custom)
   - Intégrations (Stripe, Google, Microsoft)
   - Billing et factures

**Fichiers:**

```
app/(dashboard)/admin/
├── page.tsx                    # Dashboard admin
├── users/
│   ├── page.tsx               # Liste users
│   ├── [userId]/page.tsx      # Détail user
│   └── import/page.tsx        # Import bulk
├── departments/
│   └── page.tsx
├── content/
│   ├── page.tsx               # Library contenu
│   ├── modules/[id]/edit/page.tsx
│   └── assessments/[id]/edit/page.tsx
└── settings/
    ├── page.tsx               # Settings généraux
    ├── branding/page.tsx
    ├── integrations/page.tsx
    └── billing/page.tsx

components/admin/
├── admin-kpis.tsx
├── department-chart.tsx
├── user-table.tsx
├── user-form.tsx
├── import-wizard.tsx
├── module-editor.tsx
├── assessment-builder.tsx
└── branding-form.tsx

lib/services/admin.service.ts
app/api/admin/users/route.ts
app/api/admin/departments/route.ts
app/api/admin/content/route.ts
```

---

### 📊 PROMPT 10 - Assessment Engine Complet (JOUR 6-9)

**Objectif:** Moteur d'assessment intelligent avec scoring et rapports

**Livrables:**

1. **Assessment Builder (Admin)**

   - Interface drag & drop sections/questions
   - Types de questions (single, multi, scale, text, file)
   - Pondération par question et section
   - Logique conditionnelle (skip logic)
   - Scoring algorithmique configurable

2. **Assessment Engine (Runtime)**

   - Session management (save & resume)
   - Progress tracking temps réel
   - Calcul score automatique
   - Identification gaps critiques
   - Timer optionnel par section

3. **Assessment Results**

   - Score global avec gauge
   - Breakdown par section
   - Gaps identifiés avec priorité
   - Comparaison benchmark sectoriel

4. **Recommandations IA**

   - Plan d'action généré
   - Modules recommandés basés sur gaps
   - Priorités automatiques

5. **Rapport PDF Professionnel**
   - Cover page branded
   - Executive summary
   - Gap analysis détaillée
   - Plan d'action priorisé
   - QR code version digitale

**Fichiers:**

```
app/(dashboard)/assessments/
├── page.tsx                    # Liste assessments
├── [assessmentId]/
│   ├── page.tsx               # Intro + Start
│   ├── session/page.tsx       # Assessment en cours
│   └── results/page.tsx       # Résultats

components/assessment/
├── assessment-builder/
│   ├── builder-canvas.tsx
│   ├── section-editor.tsx
│   ├── question-types.tsx
│   ├── scoring-config.tsx
│   └── conditional-logic.tsx
├── assessment-runtime/
│   ├── assessment-session.tsx
│   ├── question-renderer.tsx
│   ├── progress-bar.tsx
│   └── timer.tsx
├── assessment-results/
│   ├── score-gauge.tsx
│   ├── section-breakdown.tsx
│   ├── gaps-list.tsx
│   └── benchmark-comparison.tsx
└── pdf-report/
    └── report-template.tsx

lib/services/assessment-engine.service.ts
lib/services/scoring.service.ts
lib/services/recommendations.service.ts
lib/services/pdf-generator.service.ts

app/api/assessments/route.ts
app/api/assessments/[id]/session/route.ts
app/api/assessments/[id]/results/route.ts
app/api/assessments/[id]/report/route.ts

prisma/schema.prisma (updates)
```

---

### 📚 PROMPT 11 - Learning Adaptatif (JOUR 10-12)

**Objectif:** Système d'apprentissage personnalisé

**Livrables:**

1. **Adaptive Learning Engine**

   - Profil apprenant dynamique
   - Recommandations personnalisées
   - Ajustement difficulté temps réel

2. **Learning Path Generator**

   - Parcours basé sur gaps assessment
   - Milestones et rewards
   - Projection date certification
   - Réordonnancement dynamique

3. **Quiz Engine Adaptatif**

   - Bank de questions par niveau
   - Sélection adaptative (IRT-like)
   - Feedback détaillé avec explications
   - Graphique compétences post-quiz

4. **Competency Matrix**
   - Radar chart compétences
   - Historique évolution
   - Objectifs next level
   - Gaps à combler

**Fichiers:**

```
app/(dashboard)/learning/
├── page.tsx                    # Hub learning
├── path/page.tsx              # Mon parcours
├── modules/
│   ├── page.tsx               # Catalogue
│   └── [moduleId]/
│       ├── page.tsx           # Détail module
│       └── lesson/[lessonId]/page.tsx
├── quiz/
│   ├── page.tsx
│   └── [quizId]/
│       ├── page.tsx           # Quiz session
│       └── results/page.tsx
└── competencies/page.tsx       # Matrice compétences

components/learning/
├── learning-path.tsx
├── module-card.tsx
├── lesson-player.tsx
├── quiz-engine.tsx
├── question-adaptive.tsx
├── competency-radar.tsx
└── progress-tracker.tsx

lib/services/adaptive-learning.service.ts
lib/services/quiz-engine.service.ts
lib/services/competency.service.ts
```

---

### 🏆 PROMPT 12 - Gamification & Certifications (JOUR 13-14)

**Objectif:** Système de gamification et certifications

**Livrables:**

1. **Gamification Core**

   - Système XP et niveaux
   - Badges et achievements (50+)
   - Streaks avec récompenses
   - Daily/Weekly challenges

2. **Leaderboards**

   - Leaderboard équipe
   - Leaderboard organisation
   - Leaderboard global (opt-in)
   - Filtres (période, département)

3. **Certifications**

   - Génération certificat PDF
   - Badge digital (Credly-style)
   - Wallet de certifications
   - Partage LinkedIn
   - Expiration et renouvellement

4. **Achievements Page**
   - Galerie badges
   - Progression unlock
   - Historique gains XP

**Fichiers:**

```
app/(dashboard)/
├── achievements/page.tsx
├── leaderboard/page.tsx
└── certifications/
    ├── page.tsx               # Wallet
    └── [certId]/page.tsx      # Détail certif

components/gamification/
├── xp-bar.tsx
├── level-badge.tsx
├── achievement-card.tsx
├── streak-counter.tsx
├── leaderboard-table.tsx
├── certification-card.tsx
└── share-linkedin.tsx

lib/services/gamification.service.ts
lib/services/certification.service.ts
```

---

### 🔗 PROMPT 13 - Intégrations & API (JOUR 15-16)

**Objectif:** Intégrations tierces et API publique

**Livrables:**

1. **OAuth Providers**

   - Google Workspace SSO
   - Microsoft 365 SSO
   - Intégration calendrier

2. **Paiements Stripe**

   - Subscription management
   - Webhook handlers
   - Invoice generation
   - Customer portal

3. **Notifications**

   - Email transactionnel (Resend)
   - Slack/Teams webhooks
   - Push notifications

4. **API Publique**
   - Documentation OpenAPI/Swagger
   - Rate limiting
   - API keys management

**Fichiers:**

```
app/api/
├── auth/[...nextauth]/route.ts
├── webhooks/stripe/route.ts
├── webhooks/slack/route.ts
└── public/
    ├── docs/route.ts
    └── v1/[...path]/route.ts

lib/integrations/
├── google.ts
├── microsoft.ts
├── stripe.ts
├── slack.ts
└── resend.ts
```

---

### 🤖 PROMPT 14 - Intelligence Artificielle (JOUR 17-20)

**Objectif:** Couche IA pour recommandations et génération

**Livrables:**

1. **Recommandations Claude API**

   - Recommandations formation personnalisées
   - Génération plan d'action
   - Analyse gaps automatique
   - Chatbot assistant

2. **Content Generation**

   - Génération questions quiz
   - Résumés modules
   - Explications personnalisées

3. **Predictive Analytics**
   - Prédiction risque certification
   - Détection utilisateurs à risque
   - Recommandations proactives

**Fichiers:**

```
lib/ai/
├── claude-client.ts
├── recommendations.ts
├── content-generator.ts
├── risk-predictor.ts
└── chatbot.ts

components/ai/
├── ai-assistant.tsx
├── recommendation-card.tsx
└── risk-alert.tsx

app/api/ai/
├── recommend/route.ts
├── generate/route.ts
├── predict/route.ts
└── chat/route.ts
```

---

## 📅 ROADMAP RECOMMANDÉE

| Semaine | Prompts | Focus                   |
| ------- | ------- | ----------------------- |
| **S1**  | 8 + 9   | Team Dashboard + Admin  |
| **S2**  | 10      | Assessment Engine       |
| **S3**  | 11 + 12 | Learning + Gamification |
| **S4**  | 13 + 14 | Intégrations + IA       |

---

## 🎯 PROCHAINE ACTION

**Par où veux-tu commencer ?**

1. **PROMPT 8** : Team & Manager Dashboard (gestion équipe)
2. **PROMPT 9** : Admin Organization (panel admin)
3. **PROMPT 10** : Assessment Engine (évaluations avancées) ← **RECOMMANDÉ** (valeur business max)
4. Autre priorité ?

🐓
