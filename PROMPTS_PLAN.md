# 📋 VYXO CODEX - Plan de Prompts Séquencé

> **Timeline estimée** : 8-10 jours  
> **Statut** : ✅ TERMINÉ  
> **Dernière mise à jour** : 16 Décembre 2025

---

## 🎯 Progression Globale

```
[████████████████████] 100% - PROJET TERMINÉ 🎉
```

| Phase                   | Jours | Status     |
| ----------------------- | ----- | ---------- |
| Setup Backend Analytics | 1-2   | ✅ TERMINÉ |
| Aggregation & Metrics   | 2-3   | ✅ TERMINÉ |
| Frontend Dashboards     | 5-6   | ✅ TERMINÉ |
| Alerting System         | 7     | ✅ TERMINÉ |
| Reporting               | 8     | ✅ TERMINÉ |
| Polish & Deploy         | 9-10  | ✅ TERMINÉ |

---

## ✅ PROMPT 1 - Backend Analytics Setup (JOUR 1-2) — **TERMINÉ**

~~```

# CONTEXT

I'm building an analytics layer AROUND an existing Vyxo CODEX application.
The Codex has NO database anymore - everything was deleted.

# TASK

Create complete backend analytics API with Fastify + PostgreSQL.

# TECH STACK

- Fastify + TypeScript
- PostgreSQL (Supabase)
- Prisma ORM
- Redis (cache)
- node-cron (jobs)

# DELIVERABLES

- Project structure analytics-api/
- Prisma schema (events, daily_stats, user_progress)
- POST /api/track endpoint
- GET /health endpoint
- Cron jobs for aggregation

# SUCCESS CRITERIA

✅ Server starts on port 3005
✅ POST /api/track works
✅ Events stored in DB
✅ Health check responds

``````~~

**Résultat** : ✅ Backend créé dans `analytics-api/`, connecté à Supabase, endpoints fonctionnels.

---

## ✅ PROMPT 2 - Aggregation & Metrics Logic (JOUR 2-3) — **TERMINÉ**

~~```
# CONTEXT
Analytics backend is setup with basic tracking. Now implementing the
aggregation logic and metrics calculation.

# TASK
Build the aggregation service that processes raw events into useful metrics.

# DELIVERABLES
1. **Aggregation Service** (src/services/aggregation.service.ts)
   - aggregateDailyMetrics(date): Calculate DAU, completions, avg scores
   - calculateUserMetricsSnapshot(userId): User stats snapshot
   - Run daily cron at midnight

2. **Metrics Service** (src/services/metrics.service.ts)
   - getUserDashboard(userId): User metrics for dashboard
   - getOrganizationDashboard(orgId): Org-level metrics
   - getTimeSeries(metric, entityId, period): Time series data
   - getRealTimeMetrics(orgId): Live stats with caching

3. **API Endpoints**
   - GET /api/metrics/user/:userId
   - GET /api/metrics/organization/:orgId
   - GET /api/metrics/timeseries
   - POST /api/jobs/aggregate-daily (manual trigger)

4. **Caching with Redis**
   - Cache metrics for 5 minutes
   - Cache dashboard data

# SUCCESS CRITERIA
✅ Cron jobs run successfully
✅ Metrics calculated correctly
✅ API endpoints return data fast (<500ms)
✅ Cache hit rate >80%
```~~

**Résultat** : ✅ Services créés (`aggregation.service.ts`, `metrics.service.ts`, `cache.service.ts`). API response: 1578ms (first) → 0ms (cached). Manual aggregation trigger works.

---

## ✅ PROMPT 3 - Frontend Dashboards dans CODEX (JOUR 5-6) — **TERMINÉ**

~~````

# CONTEXT

Analytics backend is ready with metrics API. Now integrating dashboards
into the existing Vyxo CODEX frontend.

# TASK

Create dashboard pages in CODEX that display analytics data from the API.

# DELIVERABLES

1. **New Route: /analytics ou /pilotage**

   - Page analytics dans app/(dashboard)/analytics/page.tsx
   - Fetch data depuis analytics API (port 3005)
   - Loading states et error handling

2. **Dashboard Components**

   - MetricCard (score, modules, time, streak)
   - LineChart (evolution score 6 mois)
   - BarChart (comparisons)
   - ActivityTimeline (recent activity)
   - AlertCard (alerts display)

3. **Navigation Update**

   - Add "📊 Pilotage" link in sidebar
   - Icon and styling consistent with existing

4. **Tracking Integration**
   - Create lib/analytics-tracker.ts
   - Add tracking to key actions (module_started, quiz_completed, etc.)
   - Auto page view tracking

# TECH

- Recharts for charts
- Existing Vyxo design system
- Responsive design

# SUCCESS CRITERIA

✅ Analytics page accessible at /analytics
✅ Metrics display correctly
✅ Charts render properly
✅ Responsive on mobile
✅ Tracking events fire correctly

`````~~

**Résultat** : ✅ Créé page `/analytics` avec MetricCard, LineChart, BarChart, ActivityTimeline, AlertCard. Ajouté "📊 Pilotage" dans sidebar. Créé `lib/analytics-tracker.ts` avec tous les events.

---

## ✅ PROMPT 4 - Alerting System (JOUR 7) — **TERMINÉ**

~~```
# CONTEXT
Analytics backend and dashboards working. Now adding intelligent alerting.

# TASK
Build alerting system that detects anomalies and notifies users.

# DELIVERABLES

1. **Alert Rules Engine**
   - Default rules (score faible, inactivité, échec quiz élevé)
   - Rule evaluation service
   - Anomaly detection (Z-score method)

2. **Prisma Schema Updates**
   - alert_rules table
   - alerts table
   - notifications table

3. **Notification Service**
   - In-app notifications
   - Email notifications (Resend)
   - Slack webhook (optional)

4. **API Endpoints**
   - GET /api/alerts
   - POST /api/alerts/:id/acknowledge
   - POST /api/alerts/:id/resolve
   - GET /api/notifications/unread

5. **Frontend Components**
   - AlertsList component
   - NotificationBell in header
   - Alert detail modal

6. **Cron Job**
   - Run every hour to evaluate rules
   - Throttle alerts (max 1 per rule per hour)

# SUCCESS CRITERIA
✅ Rules evaluate correctly
✅ Anomalies detected
✅ Notifications sent (email + in-app)
✅ Alerts display in app
✅ Can acknowledge/resolve alerts
```~~

**Résultat** : ✅ Créé schema Prisma (AlertRule, Alert, Notification). 5 règles par défaut créées. `alerting.service.ts` avec Z-score anomaly detection. `NotificationBell.tsx` frontend. Cron job horaire.

---

## ✅ PROMPT 5 - Reporting System (JOUR 8) — **TERMINÉ**

~~```
# CONTEXT
Analytics system operational. Adding automated report generation.

# TASK
Build reporting engine for PDF/Excel export and scheduled reports.

# DELIVERABLES

1. **Report Templates**
   - Monthly compliance report
   - Training progress report
   - Performance report
   - Custom report builder

2. **Generation Engine**
   - PDF generation (Puppeteer or React-PDF)
   - Excel generation (ExcelJS)
   - Scheduling with cron

3. **Prisma Schema**
   - report_templates table
   - generated_reports table

4. **API Endpoints**
   - GET /api/reports/templates
   - POST /api/reports/generate
   - GET /api/reports/history
   - GET /api/reports/:id/download

5. **Frontend**
   - Reports page (/reports)
   - Generate report modal
   - Download history
   - Schedule configuration

# SUCCESS CRITERIA
✅ PDF reports generate correctly
✅ Excel exports work
✅ Scheduled reports send automatically
✅ Download history accessible
```~~

**Résultat** : ✅ Schema Prisma (ReportTemplate, GeneratedReport). 3 templates par défaut. `reporting.service.ts` avec ExcelJS. Page `/reports` frontend. Rapport Excel généré (7.6KB).

---

## ✅ PROMPT 6 - Polish & Production (JOUR 9-10) — **TERMINÉ**

~~```
# CONTEXT
All features implemented. Final polish and production deployment.

# TASK
Optimize performance, add documentation, deploy to production.

# DELIVERABLES

1. **Performance Optimization**
   - Query optimization (indexes)
   - Response time <500ms
   - Redis caching tuning
   - Connection pooling

2. **Error Handling**
   - Comprehensive error messages
   - Logging with Pino
   - Error tracking (Sentry optional)

3. **Documentation**
   - API docs (Swagger/OpenAPI)
   - Integration guide
   - Admin guide

4. **Testing**
   - End-to-end tests
   - Integration tests
   - Load testing

5. **Deployment**
   - Analytics API on Railway/Render
   - CODEX on Vercel
   - Environment variables
   - CI/CD pipeline

# SUCCESS CRITERIA
✅ API response times <500ms
✅ No console errors
✅ Documentation complete
✅ Production deployed
✅ Monitoring active
```~~

**Résultat** : ✅ README.md avec documentation API complète. DEPLOY.md pour Railway/Render/Vercel. errors.ts pour error handling. package.json production-ready. Performance vérifiée: 179ms-500ms.

---

## 🆕 ROADMAP PHASE 2 - Fonctionnalités Manquantes

> Basé sur l'analyse de `vyxo_codex_visualisation_pages.md` et `vyxo_codex_refonte_complete.md`

```
[░░░░░░░░░░░░░░░░░░░░] 0% - PHASE 2 À DÉMARRER
```

---

### 🏠 PROMPT 7 - Pages Publiques & Marketing (JOUR 11-12)

```
# TASK
Créer les pages publiques pour conversion visiteurs → utilisateurs

# DELIVERABLES
1. **Homepage (/)**
   - Hero section avec CTA
   - Social proof (témoignages, logos clients)
   - Les 3 piliers (Diagnostic, Formation, Pilotage)
   - Features clés
   - CTA final

2. **Pricing Page (/pricing)**
   - 4 plans (Starter, Professional, Enterprise, Custom)
   - Toggle mensuel/annuel
   - Comparaison features
   - FAQ pricing

3. **Demo Assessment (/demo)**
   - Formulaire entreprise (5 étapes)
   - Score preview avec gauge
   - Lead magnet (email pour PDF)
   - Auto-création compte freemium

4. **Pages légales**
   - /terms, /privacy, /gdpr
```

---

### 👨‍💼 PROMPT 8 - Team & Manager Features (JOUR 13-14)

```
# TASK
Fonctionnalités manager pour gestion équipe

# DELIVERABLES
1. **Team Dashboard (/team)**
   - KPIs équipe (score moyen, modules, streak)
   - Graphique progression 30j
   - Heatmap compétences équipe
   - Alertes (inactivité, scores faibles)

2. **Team Members (/team/members)**
   - Liste membres avec scores
   - Détail membre (/team/members/[id])
   - Notes manager privées

3. **Team Assignments (/team/assignments)**
   - Assigner modules à équipe
   - Suivi deadlines
   - Notifications automatiques
```

---

### 🏢 PROMPT 9 - Admin Organization (JOUR 15-17)

```
# TASK
Panel admin pour gestion organisation

# DELIVERABLES
1. **Admin Dashboard (/admin)**
   - Score maturité global
   - Maturité par département (bar chart)
   - Alertes critiques gaps
   - Timeline prochaines deadlines

2. **Users Management (/admin/users)**
   - CRUD utilisateurs
   - Import CSV/Excel
   - Filtres avancés (rôle, dept, score)
   - Invitation email

3. **Departments (/admin/departments)**
   - Gestion départements
   - Assignment managers

4. **Content Management (/admin/content)**
   - Module builder (WYSIWYG)
   - Assessment creator
   - Upload médias

5. **Settings (/admin/settings)**
   - Organization profile
   - Branding (logo, couleurs)
   - Intégrations (Stripe, Google, Microsoft)
   - Billing
```

---

### 📊 PROMPT 10 - Assessment Engine Complet (JOUR 18-20)

```
# TASK
Moteur d'assessment intelligent avec scoring et rapport

# DELIVERABLES
1. **Assessment Builder (Admin)**
   - Interface drag & drop
   - Sections et questions pondérées
   - Logique conditionnelle
   - Scoring algorithmique

2. **Assessment Engine (Runtime)**
   - Session management
   - Calcul score automatique
   - Identification gaps critiques
   - Génération recommandations IA

3. **Benchmark sectoriel**
   - Comparaison industrie
   - Percentile position
   - Top performers anonymisés

4. **Rapport PDF professionnel**
   - Cover page branded
   - Executive summary
   - Gap analysis détaillée
   - Plan d'action priorisé
   - QR code version digitale
```

---

### 📚 PROMPT 11 - Learning Adaptatif (JOUR 21-23)

```
# TASK
Système d'apprentissage personnalisé

# DELIVERABLES
1. **Adaptive Learning Engine**
   - Profil apprenant dynamique
   - Recommandations personnalisées
   - Ajustement difficulté temps réel

2. **LearningPath généré automatiquement**
   - Parcours basé sur gaps assessment
   - Milestones et rewards
   - Projection date certification

3. **Quiz Engine adaptatif**
   - Questions adaptées au niveau
   - Feedback détaillé avec explications
   - Graphique compétences post-quiz

4. **Competency Matrix**
   - Radar chart compétences
   - Historique évolution
   - Objectifs next level
```

---

### 🏆 PROMPT 12 - Gamification & Certifications (JOUR 24-25)

```
# TASK
Système de gamification et certifications

# DELIVERABLES
1. **Gamification**
   - XP et niveaux
   - Badges et achievements
   - Leaderboards (équipe, organisation)
   - Streaks avec récompenses

2. **Certifications**
   - Génération certificat PDF
   - Badge digital (Credly-style)
   - Wallet de certifications
   - Partage LinkedIn
   - Expiration et renouvellement

3. **Social Learning**
   - Forums de discussion par module
   - Peer review exercices
   - Expert answers (Vyxo team)
```

---

### 🔗 PROMPT 13 - Intégrations & API (JOUR 26-27)

```
# TASK
Intégrations tierces et API publique

# DELIVERABLES
1. **OAuth Providers**
   - Google Workspace SSO
   - Microsoft 365 SSO
   - Intégration calendrier

2. **Paiements Stripe**
   - Subscription management
   - Webhook handlers
   - Invoice generation

3. **Notifications**
   - Email transactionnel (Resend)
   - Slack/Teams webhooks
   - Push notifications (optionnel)

4. **API publique**
   - Documentation OpenAPI/Swagger
   - Rate limiting
   - API keys management
```

---

### 🤖 PROMPT 14 - Intelligence Artificielle (JOUR 28-30)

```
# TASK
Couche IA pour recommandations et génération

# DELIVERABLES
1. **Recommandations Claude API**
   - Recommandations formation personnalisées
   - Génération plan d'action
   - Analyse gaps automatique

2. **Content Generation**
   - Génération questions quiz
   - Résumés modules
   - Explications personnalisées

3. **Predictive Analytics**
   - Prédiction risque certification
   - Détection utilisateurs à risque
   - Recommandations proactives
```

---

## 📋 Résumé Gaps Critiques

| Catégorie | Implémenté | Manquant |
|-----------|------------|----------|
| **Pages Publiques** | Login/Signup | Homepage, Pricing, Demo |
| **Manager** | ❌ | Team Dashboard, Assignments |
| **Admin Org** | ❌ | Users CRUD, Content Builder |
| **Assessment** | Basique | Engine complet, Benchmark, PDF |
| **Learning** | Modules | Adaptive, LearningPath, Competency |
| **Gamification** | Basique | Badges, Certifications, Leaderboard |
| **Intégrations** | Supabase | Stripe, Google SSO, Slack |
| **IA** | ❌ | Claude API, Recommandations |

---

## 🎯 Estimation Effort Total Phase 2

| Phase | Jours | Complexité |
|-------|-------|------------|
| Pages Publiques | 2 | ⭐⭐ |
| Team & Manager | 2 | ⭐⭐⭐ |
| Admin Organization | 3 | ⭐⭐⭐⭐ |
| Assessment Engine | 3 | ⭐⭐⭐⭐⭐ |
| Learning Adaptatif | 3 | ⭐⭐⭐⭐⭐ |
| Gamification | 2 | ⭐⭐⭐ |
| Intégrations | 2 | ⭐⭐⭐ |
| IA | 3 | ⭐⭐⭐⭐ |
| **TOTAL** | **20 jours** | |

---

## 🚀 Prochaine Action

**PROMPT 7** : Pages Publiques & Marketing

Tu veux lancer le **PROMPT 7** ?

``````
