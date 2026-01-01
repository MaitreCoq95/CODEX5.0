# 📊 AUDIT VYXO CODEX - État Actuel

**Date :** 28 Décembre 2025  
**Objectif :** Cartographier l'existant avant pivot B2B SaaS Self-Serve

---

## 🏗️ Architecture Technique

### Stack Confirmé

| Technologie       | Version         | Usage                          |
| ----------------- | --------------- | ------------------------------ |
| **Next.js**       | 15+ (16.0.8)    | App Router, Server Components  |
| **React**         | 19.2.0          | UI Framework                   |
| **TypeScript**    | 5.x             | Full codebase typed            |
| **Tailwind CSS**  | 3.4.17          | Styling                        |
| **Shadcn/ui**     | Latest          | 27 composants UI               |
| **Supabase**      | 2.84.0          | Auth + PostgreSQL + Storage    |
| **Prisma**        | 5.22.0          | ORM (analytics-api uniquement) |
| **Fastify**       | 4.24.3          | Analytics API backend          |
| **Framer Motion** | 12.x            | Animations                     |
| **Recharts**      | 3.6.0           | Graphiques                     |
| **Resend**        | 6.5.2           | Emails transactionnels         |
| **AI SDKs**       | OpenAI + Google | Intégration IA                 |

### Structure des Dossiers

```
CODEX5.0/
├── app/
│   ├── (dashboard)/        # 14 sous-routes (dashboard, assessments, team, etc.)
│   ├── (marketing)/        # 8 sous-routes (landing, pricing, demo, etc.)
│   ├── api/                # 17 API routes
│   └── docs/               # Documentation
├── components/
│   ├── admin/              # 4 composants admin
│   ├── analytics/          # 7 composants analytics
│   ├── assessment/         # 21 composants (builder, runtime, results)
│   ├── codex/              # 7 composants quiz/knowledge
│   ├── gamification/       # 8 composants XP/badges
│   ├── landing/            # 19 composants landing page
│   ├── learning/           # 5 composants adaptatifs
│   ├── team/               # 4 composants équipe
│   └── ui/                 # 27 composants Shadcn
├── lib/
│   ├── services/           # 20 services métier
│   ├── codex/              # 11 fichiers quiz/questions
│   ├── data/               # 7 fichiers données
│   └── schemas/            # 2 schémas Zod
├── analytics-api/          # Backend Fastify séparé
│   ├── prisma/             # Schema Prisma (639 lignes!)
│   └── src/                # Routes, jobs, etc.
└── supabase/               # Scripts SQL
```

---

## ✅ Features Existantes (Réutilisables)

### 1. Auth & Users ✅ EXISTE

**Statut : 80% réutilisable**

| Feature            | Fichier                                         | Statut                            |
| ------------------ | ----------------------------------------------- | --------------------------------- |
| Supabase Auth      | `components/supabase-provider.tsx`              | ✅ Fonctionnel                    |
| User Model         | `analytics-api/prisma/schema.prisma` (L335-385) | ✅ Complet                        |
| Organization Model | `analytics-api/prisma/schema.prisma` (L281-310) | ✅ Complet                        |
| Department Model   | `analytics-api/prisma/schema.prisma` (L313-332) | ✅ Complet                        |
| Roles (RBAC)       | `lib/services/rbac-service.ts`                  | ✅ user/manager/admin/super_admin |
| Middleware         | `middleware.ts`                                 | ⚠️ Pass-through (à enrichir)      |

**Gaps pour MVP :**

- [ ] Ajouter champs `company_size`, `industry_sector`, `subscription_status`, `stripe_customer_id`
- [ ] Créer onboarding multi-step

---

### 2. Assessment/Diagnostic ✅ EXISTE (TRÈS COMPLET!)

**Statut : 90% réutilisable**

| Feature                  | Fichier                                          | Statut                            |
| ------------------------ | ------------------------------------------------ | --------------------------------- |
| AssessmentTemplate Model | `schema.prisma` (L532-565)                       | ✅ Multi-norme                    |
| AssessmentSession Model  | `schema.prisma` (L567-608)                       | ✅ Answers JSONB                  |
| Assessment Engine        | `lib/services/assessment-engine.ts` (328 lignes) | ✅ Scoring, gaps, recommandations |
| Question Types           | `components/assessment/runtime/`                 | ✅ 6 types supportés              |
| Builder Admin            | `components/assessment/builder/`                 | ✅ Drag & drop                    |
| Results Page             | `components/assessment/results/`                 | ✅ Radar chart, gaps              |
| Gap Analysis             | `assessment-engine.ts`                           | ✅ Severity levels                |

**Ce qui existe déjà :**

- Calcul de score pondéré par section ✅
- Niveaux de maturité (Initial → Optimisé) ✅
- Identification automatique des gaps ✅
- Actions prioritaires générées ✅
- Estimation temps certification ✅

**Gaps pour MVP :**

- [ ] Créer les questionnaires spécifiques par norme (ISO 9001, GDP, ISO 27001, HACCP, etc.)
- [ ] Ajouter questions conditionnelles par secteur

---

### 3. Learning/Formation ✅ EXISTE

**Statut : 70% réutilisable**

| Feature              | Fichier                                          | Statut                             |
| -------------------- | ------------------------------------------------ | ---------------------------------- |
| TrainingModule Model | `lib/services/learning-service.ts`               | ✅ HACCP, GDP, ISO                 |
| Module Progress      | `schema.prisma` (L497-529)                       | ✅ Tracking complet                |
| Adaptive Learning    | `lib/services/adaptive-learning-engine.ts` (16K) | ✅ Difficulté dynamique            |
| Competency Matrix    | `components/learning/competency-matrix.tsx`      | ✅ Visualisation forces/faiblesses |
| Personalized Paths   | `components/learning/personalized-path.tsx`      | ✅ Parcours personnalisés          |
| XP System            | `lib/services/gamification-engine.ts`            | ✅ XP, niveaux, badges             |

**Gaps pour MVP :**

- [ ] Remplacer "modules" par "actions du roadmap"
- [ ] Lier les templates à chaque action

---

### 4. Templates/Documents 🟡 PARTIEL

**Statut : 30% - Structure existe, contenu manquant**

| Feature           | Fichier     | Statut                           |
| ----------------- | ----------- | -------------------------------- |
| Reference PDFs    | `app/docs/` | ⚠️ Quelques PDFs (GDP, ISO42001) |
| Template System   | N/A         | ❌ À créer                       |
| Download Tracking | N/A         | ❌ À créer                       |

**Gaps pour MVP :**

- [ ] Créer table `templates` dans le schéma
- [ ] Créer templates Word/Excel par norme (ISO 9001, GDP, ISO 27001, HACCP, etc.)
- [ ] Uploader sur Supabase Storage
- [ ] Créer page `/dashboard/templates`

---

### 5. Dashboards ✅ EXISTE

**Statut : 85% réutilisable**

| Feature             | Fichier                              | Statut                  |
| ------------------- | ------------------------------------ | ----------------------- |
| Main Dashboard      | `app/(dashboard)/dashboard/page.tsx` | ✅ Gamification widgets |
| Analytics Dashboard | `app/(dashboard)/analytics/`         | ✅ Charts Recharts      |
| Team Dashboard      | `app/(dashboard)/team/`              | ✅ Manager view         |
| Admin Dashboard     | `app/(dashboard)/admin/`             | ✅ Stats, imports       |
| Reports             | `app/(dashboard)/reports/`           | ✅ PDF generation       |

**Gaps pour MVP :**

- [ ] Adapter pour afficher progression Roadmap (sprints)
- [ ] Ajouter widget "Score de maturité actuel"
- [ ] Ajouter widget "Temps restant estimé"

---

### 6. Paiement/Stripe 🟡 PARTIEL

**Statut : 60% - Service existe, intégration partielle**

| Feature            | Fichier                                       | Statut             |
| ------------------ | --------------------------------------------- | ------------------ |
| StripeService      | `lib/services/stripe-service.ts` (280 lignes) | ✅ Complet         |
| Subscription Plans | `stripe-service.ts` (L37-82)                  | ✅ 3 plans définis |
| Checkout Session   | `stripe-service.ts`                           | ✅ Méthode existe  |
| Customer Portal    | `stripe-service.ts`                           | ✅ Méthode existe  |
| Webhook Handler    | `stripe-service.ts`                           | ✅ Méthode existe  |
| Webhook Route      | N/A                                           | ❌ À créer         |
| Checkout Page      | N/A                                           | ❌ À créer         |

**Les plans actuels (à adapter pour MVP) :**

```typescript
// Existant - modèle consultant
{ name: "Starter", priceMonthly: 29, maxUsers: 10 }
{ name: "Professional", priceMonthly: 99, maxUsers: 50 }
{ name: "Enterprise", priceMonthly: 199, maxUsers: unlimited }

// À créer - modèle self-serve ISO
{ name: "Certification ISO", priceMonthly: 399, duration: 8 mois }
{ name: "One-time", priceOneTime: 2990 }
```

**Gaps pour MVP :**

- [ ] Créer page `/checkout`
- [ ] Créer route `/api/webhooks/stripe`
- [ ] Adapter les plans tarifaires
- [ ] Ajouter protection routes par subscription

---

### 7. Landing Page ✅ EXISTE

**Statut : 75% réutilisable**

| Feature         | Fichier                                  | Statut                          |
| --------------- | ---------------------------------------- | ------------------------------- |
| Hero Section    | `components/landing/hero-section.tsx`    | ✅                              |
| Pricing Section | `components/landing/pricing-section.tsx` | ⚠️ Plans consulting (à adapter) |
| Social Proof    | `components/landing/social-proof.tsx`    | ✅                              |
| FAQ             | `components/landing/faq-section.tsx`     | ✅                              |
| Evaluation Form | `components/landing/evaluation-form.tsx` | ✅ Mini-diagnostic              |

**Gaps pour MVP :**

- [ ] Adapter le Hero pour promesse "Réduisez votre temps de certification de 50%" (multi-normes)
- [ ] Refaire le pricing pour modèle self-serve
- [ ] CTA vers signup au lieu de contact

---

### 8. Emails 🟡 PARTIEL

**Statut : 50%**

| Feature       | Fichier                               | Statut                    |
| ------------- | ------------------------------------- | ------------------------- |
| Email Service | `lib/services/email-service.ts` (16K) | ✅ Resend intégré         |
| Templates     | email-service.ts                      | ⚠️ Quelques templates     |
| Transactional | email-service.ts                      | ⚠️ Welcome, notifications |

**Gaps pour MVP :**

- [ ] Créer templates spécifiques (confirmation, rappels sprint)

---

## 🔴 Gaps Critiques Identifiés

### Tables DB à Créer/Modifier

| Table           | Statut     | Action                                                  |
| --------------- | ---------- | ------------------------------------------------------- |
| `users`         | ⚠️ Adapter | Ajouter `company_size`, `industry_sector`, `stripe_*`   |
| `assessments`   | ⚠️ Adapter | Renommer `assessment_sessions`, ajouter `standard_type` |
| `roadmaps`      | ❌ À créer | Table nouvelle                                          |
| `actions`       | ❌ À créer | Référentiel actions par norme (ISO, GDP, HACCP, etc.)   |
| `user_actions`  | ❌ À créer | Progression utilisateur sur actions                     |
| `templates`     | ❌ À créer | Bibliothèque templates par norme                        |
| `notifications` | ✅ Existe  | Dans Prisma schema                                      |

### Pages/Routes à Créer

| Route                     | Priorité   | Description                |
| ------------------------- | ---------- | -------------------------- |
| `/signup`                 | 🔴 HAUTE   | Onboarding multi-step      |
| `/onboarding/assessment`  | 🔴 HAUTE   | Questionnaire 30 questions |
| `/onboarding/results`     | 🔴 HAUTE   | Score + teaser roadmap     |
| `/checkout`               | 🔴 HAUTE   | Stripe checkout            |
| `/dashboard/roadmap`      | 🔴 HAUTE   | Timeline sprints           |
| `/dashboard/templates`    | 🟡 MOYENNE | Bibliothèque templates     |
| `/dashboard/subscription` | 🟡 MOYENNE | Gestion abonnement         |

### Contenu à Créer (Multi-Normes)

| Norme                | Questions | Actions | Templates |
| -------------------- | --------- | ------- | --------- |
| ISO 9001             | ~30       | 50-80   | 25-30     |
| GDP (Pharma)         | ~25       | 40-60   | 20-25     |
| ISO 27001 (Cyber)    | ~30       | 50-70   | 25-30     |
| HACCP (Food)         | ~20       | 30-50   | 15-20     |
| ISO 42001 (IA)       | ~25       | 40-60   | 20-25     |
| Sûreté Aéroportuaire | ~20       | 30-50   | 15-20     |

**Responsable :** Vivien ou Claude (génération assistée)

---

## 📋 Recommandations d'Intégration

### Ce qu'il NE FAUT PAS refaire (réutiliser tel quel)

1. **AssessmentEngine** (`lib/services/assessment-engine.ts`) - Scoring parfait
2. **Prisma Schema Core** - Users, Organizations, Progress
3. **Shadcn/ui Components** - 27 composants prêts
4. **StripeService** - API complète
5. **Gamification** - XP, badges, leaderboard
6. **Email Service** - Resend intégré

### Ce qu'il FAUT adapter

1. **Landing Page** - Nouvelle promesse, nouveau pricing
2. **Assessment Questions** - Questionnaires par norme (JSON multi-normes)
3. **Auth Flow** - Ajouter multi-step signup avec sélection de norme
4. **Dashboard** - Widgets roadmap/sprints

### Ce qu'il FAUT créer de zéro

1. **Roadmap Generator** - Algo répartition sprints
2. **Templates Library** - Page + Supabase Storage
3. **Checkout Flow** - Page + Webhooks
4. **Sprint Timeline** - Composant visuel

---

## 🚀 Plan de Migration Recommandé

```
PHASE 1 (Prompt #1) : Extension DB
├── Ajouter champs users
├── Créer tables roadmaps, actions, user_actions, templates
└── Migrations Prisma

PHASE 2 (Prompt #2-3) : Auth + Assessment
├── Créer pages /signup multi-step (avec sélection norme)
├── Créer questionnaires par norme (ISO 9001, GDP, etc.)
└── Adapter page résultats

PHASE 3 (Prompt #4-5) : Roadmap + Templates
├── Créer algo génération roadmap
├── Créer page /dashboard/roadmap
└── Créer bibliothèque templates

PHASE 4 (Prompt #6-7) : Dashboard + Paiement
├── Adapter dashboard existant
├── Créer page /checkout
└── Configurer webhooks Stripe

PHASE 5 (Prompt #8) : Polish & Launch
├── Flow onboarding complet
├── Emails automatiques
└── Tests E2E
```

---

## ✅ Conclusion

**L'existant est TRÈS solide.** Le pivot vers B2B self-serve est réaliste car :

1. ✅ L'architecture technique (Next.js 15, Supabase, Prisma) est moderne et adaptée
2. ✅ Le moteur d'assessment existe et fonctionne (scoring, gaps, recommandations)
3. ✅ Le service Stripe est complet (checkout, webhooks, portal)
4. ✅ Les composants UI sont prêts (27 Shadcn + custom)
5. ⚠️ Les principales créations sont : **Roadmap Generator** + **Templates Library**

**Estimation effort :** 60% réutilisation / 40% création

**Timeline réaliste :** 6-8 semaines pour MVP complet

---

_Rapport généré le 28/12/2025 - Prompt #0 TERMINÉ ✅_
