# 🎯 VYXO CODEX - AJOUT COUCHE DÉCISIONNELLE

**Stratégie** : Extension du Vyxo Codex existant  
**Focus** : Couche 3 - Pilotage & Décisionnel  
**Timeline** : 8-10 jours  
**Date** : Décembre 2025

---

## 📋 CONTEXTE & NOUVELLE STRATÉGIE

### Situation actuelle

```
✅ EXISTANT (À CONSERVER) :
- Vyxo CODEX fonctionnel et stable
- Interface utilisateur complète
- Modules de formation
- Évaluations/Quiz
- Certifications
- Auth système

❌ MANQUANT (À CRÉER) :
- Base de données (tout a été supprimé)
- Couche décisionnelle/analytics
- Dashboards dirigeants
- Reporting avancé
- KPIs temps réel
- Alerting intelligent
```

### Nouvelle approche

**Au lieu de** : Tout reconstruire from scratch  
**On va** : Ajouter une couche analytics/décisionnelle autour de l'existant

```
┌─────────────────────────────────────────────────────────┐
│         VYXO CODEX EXISTANT (Frontend)                  │
│    (Modules, Évaluations, Certifications)               │
└─────────────────────────────────────────────────────────┘
                      ↓ ↑
┌─────────────────────────────────────────────────────────┐
│         NOUVELLE COUCHE ANALYTICS API                    │
│    (To Build - Backend Analytics + Décisionnel)         │
└─────────────────────────────────────────────────────────┘
                      ↓ ↑
┌─────────────────────────────────────────────────────────┐
│         NOUVELLE BASE DE DONNÉES                         │
│    (PostgreSQL + Redis - Tracking & Analytics)          │
└─────────────────────────────────────────────────────────┘
```

---

## 🎯 OBJECTIFS CLAIRS

### Ce qu'on va construire

**1. Base de données Analytics**
- Tracking de toutes les actions utilisateurs
- Stockage des métriques de progression
- Historique des performances
- Data warehouse pour reporting

**2. Backend Analytics API**
- Endpoints pour collecter les données
- Agrégation des métriques
- Calculs de KPIs
- Export de rapports

**3. Dashboards Décisionnels**
- Dashboard Direction (Vue stratégique)
- Dashboard Manager (Vue opérationnelle)
- Dashboard Utilisateur (Vue personnelle)
- Widgets personnalisables

**4. Système d'Alerting**
- Détection anomalies
- Seuils personnalisables
- Notifications multi-canaux
- Escalade automatique

**5. Reporting Avancé**
- Rapports automatisés (PDF, Excel)
- Scheduling rapports
- Exports BI (Tableau, Power BI)
- Benchmark sectoriel

---

## 🏗️ ARCHITECTURE TECHNIQUE

### Stack Technology

```yaml
Backend Analytics:
  Framework: Fastify (léger, performant)
  Language: TypeScript
  Port: 3001 (séparé du Codex existant)

Database:
  Primary: PostgreSQL 15+ (Supabase)
  Cache: Redis 7+
  Search: Elasticsearch (optionnel)

Analytics:
  PostHog (product analytics)
  Custom metrics service

Hosting:
  Railway / Render (backend analytics)
  Supabase (database)

Integration avec Codex existant:
  - Injection tracking scripts
  - API calls depuis Codex
  - Webhooks pour événements
```

### Communication Codex ↔ Analytics

```typescript
// Dans le Vyxo Codex existant, on injecte :

// 1. Script de tracking
<script src="https://analytics.vyxo.com/tracker.js"></script>

// 2. Events tracking
vyxoAnalytics.track('module_started', {
  userId: currentUser.id,
  moduleId: module.id,
  timestamp: Date.now()
});

vyxoAnalytics.track('quiz_completed', {
  userId: currentUser.id,
  quizId: quiz.id,
  score: result.score,
  duration: result.duration
});

// 3. API calls pour dashboards
const metrics = await fetch('https://api-analytics.vyxo.com/metrics/user/{userId}')
```

---

## 📊 BASE DE DONNÉES - SCHÉMA COMPLET

### Tables Analytics

```sql
-- ============================================
-- TRACKING & EVENTS
-- ============================================

CREATE TABLE analytics_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  event_type VARCHAR(100) NOT NULL, -- 'module_started', 'quiz_completed', etc.
  user_id VARCHAR(255) NOT NULL, -- ID du user dans Codex
  organization_id VARCHAR(255),
  
  properties JSONB, -- Propriétés flexibles de l'événement
  
  timestamp TIMESTAMP DEFAULT NOW(),
  session_id VARCHAR(255),
  ip_address INET,
  user_agent TEXT,
  
  INDEX idx_events_user (user_id),
  INDEX idx_events_org (organization_id),
  INDEX idx_events_type (event_type),
  INDEX idx_events_timestamp (timestamp)
);

-- Exemples d'events :
-- 'user_login', 'module_started', 'module_completed', 'quiz_attempted', 
-- 'quiz_completed', 'assessment_started', 'assessment_completed', 
-- 'certification_obtained', 'video_watched', 'page_viewed'

-- ============================================
-- AGGREGATED METRICS (Pré-calculées)
-- ============================================

CREATE TABLE daily_metrics (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  date DATE NOT NULL,
  organization_id VARCHAR(255),
  
  -- Engagement metrics
  dau INTEGER DEFAULT 0, -- Daily Active Users
  new_users INTEGER DEFAULT 0,
  sessions_count INTEGER DEFAULT 0,
  avg_session_duration INTEGER, -- secondes
  
  -- Learning metrics
  modules_started INTEGER DEFAULT 0,
  modules_completed INTEGER DEFAULT 0,
  quiz_attempts INTEGER DEFAULT 0,
  avg_quiz_score DECIMAL(5,2),
  
  -- Certifications
  certifications_obtained INTEGER DEFAULT 0,
  
  computed_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(date, organization_id),
  INDEX idx_daily_metrics_date (date),
  INDEX idx_daily_metrics_org (organization_id)
);

CREATE TABLE user_metrics_snapshot (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id VARCHAR(255) NOT NULL,
  organization_id VARCHAR(255),
  snapshot_date DATE NOT NULL,
  
  -- Progression
  modules_completed INTEGER DEFAULT 0,
  modules_in_progress INTEGER DEFAULT 0,
  total_modules_available INTEGER,
  
  -- Scores
  overall_score DECIMAL(5,2), -- Score moyen tous modules
  last_assessment_score DECIMAL(5,2),
  
  -- Time spent
  total_time_spent INTEGER, -- secondes
  avg_session_duration INTEGER,
  
  -- Engagement
  days_active_last_7d INTEGER,
  days_active_last_30d INTEGER,
  streak_days INTEGER, -- Jours consécutifs
  
  -- Certifications
  certifications_count INTEGER DEFAULT 0,
  
  computed_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(user_id, snapshot_date),
  INDEX idx_user_metrics_user (user_id),
  INDEX idx_user_metrics_date (snapshot_date)
);

-- ============================================
-- DASHBOARDS & WIDGETS
-- ============================================

CREATE TABLE dashboards (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  role VARCHAR(50), -- 'executive', 'manager', 'user'
  organization_id VARCHAR(255),
  
  layout JSONB, -- Configuration du layout des widgets
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE widgets (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  dashboard_id UUID REFERENCES dashboards(id) ON DELETE CASCADE,
  
  type VARCHAR(50), -- 'metric', 'chart', 'table', 'alert'
  title VARCHAR(255),
  description TEXT,
  
  data_source JSONB, -- Configuration de la source de données
  visualization JSONB, -- Configuration de la visualisation
  
  position JSONB, -- { x, y, w, h }
  
  refresh_interval INTEGER, -- secondes
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- ============================================
-- ALERTS & NOTIFICATIONS
-- ============================================

CREATE TABLE alert_rules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  organization_id VARCHAR(255),
  
  condition JSONB NOT NULL, -- { metric, operator, threshold, duration }
  severity VARCHAR(50), -- 'info', 'warning', 'critical'
  
  recipients JSONB, -- { roles: [], userIds: [] }
  notification_channels TEXT[], -- ['email', 'slack', 'in_app']
  
  enabled BOOLEAN DEFAULT true,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE alerts (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  rule_id UUID REFERENCES alert_rules(id),
  organization_id VARCHAR(255),
  
  type VARCHAR(100),
  severity VARCHAR(50),
  title VARCHAR(255),
  description TEXT,
  
  affected_entities JSONB, -- [{ type, id, name }]
  triggered_by JSONB, -- { metric, threshold, actualValue }
  
  recommended_actions TEXT[],
  
  status VARCHAR(50) DEFAULT 'open', -- 'open', 'acknowledged', 'resolved'
  
  created_at TIMESTAMP DEFAULT NOW(),
  acknowledged_at TIMESTAMP,
  acknowledged_by VARCHAR(255),
  resolved_at TIMESTAMP,
  
  INDEX idx_alerts_org (organization_id),
  INDEX idx_alerts_status (status),
  INDEX idx_alerts_severity (severity)
);

-- ============================================
-- REPORTS
-- ============================================

CREATE TABLE report_templates (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name VARCHAR(255) NOT NULL,
  description TEXT,
  type VARCHAR(50), -- 'compliance', 'performance', 'training'
  
  template JSONB NOT NULL, -- Configuration du template
  
  schedule JSONB, -- { frequency, recipients }
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE generated_reports (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  template_id UUID REFERENCES report_templates(id),
  organization_id VARCHAR(255),
  
  generated_at TIMESTAMP DEFAULT NOW(),
  period_start DATE,
  period_end DATE,
  
  format VARCHAR(20), -- 'pdf', 'excel', 'html'
  file_url TEXT, -- URL du fichier généré
  file_size INTEGER, -- bytes
  
  sent_to TEXT[], -- Liste emails destinataires
  
  INDEX idx_reports_org (organization_id),
  INDEX idx_reports_date (generated_at)
);

-- ============================================
-- BENCHMARKS
-- ============================================

CREATE TABLE benchmark_data (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  industry VARCHAR(100) NOT NULL,
  metric VARCHAR(100) NOT NULL,
  period DATE NOT NULL,
  
  sample_size INTEGER,
  avg_value DECIMAL(10,2),
  median_value DECIMAL(10,2),
  p25_value DECIMAL(10,2),
  p75_value DECIMAL(10,2),
  p90_value DECIMAL(10,2),
  
  computed_at TIMESTAMP DEFAULT NOW(),
  
  UNIQUE(industry, metric, period),
  INDEX idx_benchmark_industry (industry),
  INDEX idx_benchmark_metric (metric)
);

-- ============================================
-- GOALS & SCENARIOS
-- ============================================

CREATE TABLE organization_goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id VARCHAR(255) NOT NULL,
  
  goal_type VARCHAR(100), -- 'certification', 'score_target', 'completion_rate'
  target_value DECIMAL(10,2),
  target_date DATE,
  
  current_value DECIMAL(10,2),
  progress DECIMAL(5,2), -- 0-100
  
  status VARCHAR(50), -- 'on_track', 'at_risk', 'delayed', 'achieved'
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE scenarios (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  organization_id VARCHAR(255) NOT NULL,
  name VARCHAR(255),
  description TEXT,
  
  assumptions JSONB, -- { trainingBudget, hoursPerWeek, etc. }
  projected_outcomes JSONB, -- Résultats projetés
  
  created_at TIMESTAMP DEFAULT NOW(),
  created_by VARCHAR(255)
);
```

---

## 🔌 INTEGRATION AVEC CODEX EXISTANT

### Étape 1 : Injection Tracker

**Dans le Codex existant, ajouter dans `<head>` :**

```html
<!-- Analytics Tracker -->
<script>
  (function() {
    window.vyxoAnalytics = {
      track: function(eventName, properties) {
        fetch('https://api-analytics.vyxo.com/track', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'X-API-Key': 'VOTRE_CLE_API'
          },
          body: JSON.stringify({
            event: eventName,
            properties: properties,
            userId: window.currentUser?.id,
            organizationId: window.currentUser?.organizationId,
            timestamp: Date.now(),
            sessionId: getSessionId(),
            url: window.location.href
          })
        }).catch(err => console.error('Analytics error:', err));
      },
      
      pageView: function() {
        this.track('page_viewed', {
          path: window.location.pathname,
          title: document.title
        });
      }
    };
    
    // Auto track page views
    vyxoAnalytics.pageView();
    
    // Track on navigation (SPA)
    window.addEventListener('popstate', () => vyxoAnalytics.pageView());
  })();
</script>
```

### Étape 2 : Events à tracker

**Dans le code du Codex, ajouter tracking sur actions clés :**

```javascript
// Quand un module est démarré
function startModule(moduleId) {
  vyxoAnalytics.track('module_started', {
    moduleId: moduleId,
    moduleName: module.name,
    category: module.category
  });
  
  // ... logique existante
}

// Quand un module est complété
function completeModule(moduleId, score) {
  vyxoAnalytics.track('module_completed', {
    moduleId: moduleId,
    score: score,
    duration: calculateDuration(),
    attempts: getAttempts()
  });
  
  // ... logique existante
}

// Quand un quiz est tenté
function submitQuiz(quizId, answers) {
  vyxoAnalytics.track('quiz_completed', {
    quizId: quizId,
    score: calculateScore(answers),
    correctAnswers: countCorrect(answers),
    totalQuestions: quiz.questions.length,
    duration: getQuizDuration()
  });
  
  // ... logique existante
}

// Quand assessment complété
function submitAssessment(assessmentId, results) {
  vyxoAnalytics.track('assessment_completed', {
    assessmentId: assessmentId,
    overallScore: results.score,
    gapsIdentified: results.gaps.length,
    duration: getAssessmentDuration()
  });
  
  // ... logique existante
}

// Login/Logout
function onLogin(user) {
  vyxoAnalytics.track('user_login', {
    userId: user.id,
    role: user.role
  });
}
```

### Étape 3 : Afficher Dashboards dans Codex

**Ajouter une nouvelle page dans le Codex :**

```javascript
// Page: /analytics ou /dashboard-analytics

function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState(null);
  
  useEffect(() => {
    // Fetch depuis l'API Analytics
    fetch(`https://api-analytics.vyxo.com/dashboard/${currentUser.id}`, {
      headers: {
        'Authorization': `Bearer ${getToken()}`,
        'X-API-Key': API_KEY
      }
    })
      .then(res => res.json())
      .then(data => setMetrics(data));
  }, []);
  
  if (!metrics) return <Loading />;
  
  return (
    <div className="analytics-dashboard">
      <h1>Pilotage & Performance</h1>
      
      <div className="metrics-grid">
        <MetricCard 
          title="Score Global" 
          value={metrics.overallScore} 
          trend={metrics.scoreChange}
        />
        
        <MetricCard 
          title="Modules Complétés" 
          value={`${metrics.modulesCompleted}/${metrics.modulesTotal}`} 
        />
        
        <MetricCard 
          title="Temps Passé (7j)" 
          value={formatDuration(metrics.timeSpentLast7d)} 
        />
      </div>
      
      <Chart 
        data={metrics.progressHistory} 
        type="line"
        title="Évolution Score (6 mois)"
      />
      
      <AlertsList alerts={metrics.alerts} />
    </div>
  );
}
```

---

## 🚀 PLAN DE DÉVELOPPEMENT 8-10 JOURS

### JOUR 1-2 : Setup Infrastructure & DB

**Objectif** : Base analytics prête

```bash
Jour 1 Morning (4h):
□ Créer projet backend analytics
  - Init Fastify project (TypeScript)
  - Setup Supabase database
  - Configure .env

□ Schema database
  - Créer tables (SQL ci-dessus)
  - Indexes
  - Test connexion

Jour 1 Afternoon (4h):
□ API Setup
  - Endpoints de base
  - Auth middleware
  - CORS configuration
  
□ Tracker endpoint
  - POST /track (recevoir events)
  - Validation events
  - Store in analytics_events

Jour 2 (8h):
□ Aggregation Service
  - Cron job daily metrics
  - Calculate user_metrics_snapshot
  - Calculate daily_metrics

□ Test complet
  - Envoyer events test
  - Vérifier agrégation
  - Query metrics
```

**Deliverable** : Backend analytics opérationnel

---

### JOUR 3-4 : Dashboards API & Widgets

**Objectif** : API dashboards complète

```bash
Jour 3 (8h):
□ Endpoints Dashboards
  - GET /api/dashboards/:role
  - GET /api/metrics/user/:userId
  - GET /api/metrics/organization/:orgId
  - GET /api/metrics/aggregated

□ Calcul KPIs temps réel
  - Score global
  - Progression
  - Engagement (DAU, streak)
  - Completion rates

Jour 4 (8h):
□ Widgets Engine
  - Create dashboard template
  - Widget types (metric, chart, table)
  - Data transformation
  - Response formatting

□ Charts data
  - Line charts (time series)
  - Bar charts (comparisons)
  - Radar charts (competencies)
  - Heatmaps (department vs metrics)
```

**Deliverable** : API retourne data prête pour dashboards

---

### JOUR 5-6 : Frontend Dashboards dans Codex

**Objectif** : Dashboards visibles dans Codex

```bash
Jour 5 (8h):
□ Page Analytics dans Codex
  - Nouvelle route /analytics
  - Fetch data depuis API
  - Loading states

□ Composants Dashboard
  - MetricCard
  - ChartComponent (Recharts)
  - ProgressBar
  - StatCard

Jour 6 (8h):
□ Dashboard utilisateur
  - Score overview
  - Progress chart
  - Recommendations
  - Recent activity

□ Dashboard manager (si applicable)
  - Team metrics
  - Team progress
  - Alerts team
```

**Deliverable** : Dashboards visibles et fonctionnels

---

### JOUR 7 : Alerting System

**Objectif** : Système d'alertes opérationnel

```bash
Jour 7 (8h):
□ Alert Rules Engine
  - Define default rules
  - Evaluation service
  - Trigger detection

□ Alerts API
  - GET /api/alerts
  - POST /api/alerts/acknowledge
  - POST /api/alerts/resolve

□ Notifications
  - In-app notifications
  - Email notifications (Resend)

□ Affichage alertes dans Codex
  - Alert widget
  - Notification bell
```

**Deliverable** : Alertes fonctionnelles

---

### JOUR 8 : Reporting

**Objectif** : Génération rapports auto

```bash
Jour 8 (8h):
□ Report Templates
  - Monthly compliance report
  - Training progress report
  - Performance report

□ Generation Engine
  - PDF avec Puppeteer
  - Excel avec ExcelJS
  - Scheduling (cron)

□ API Reports
  - POST /api/reports/generate
  - GET /api/reports/history
  - Download endpoint
```

**Deliverable** : Rapports générables

---

### JOUR 9-10 : Polish & Testing

**Objectif** : Production ready

```bash
Jour 9 (8h):
□ Optimizations
  - Query performance
  - Caching (Redis)
  - Response times

□ Error handling
  - Comprehensive error messages
  - Logging (Pino)
  - Monitoring setup

Jour 10 (8h):
□ Documentation
  - API docs (Swagger)
  - Integration guide
  - Admin guide

□ Testing end-to-end
  - Test tracking complet
  - Test dashboards
  - Test reports
  - Test alerts

□ Deploy
  - Backend sur Railway
  - Database migrations
  - Env vars production
```

**Deliverable** : Système en production

---

## 📝 PROMPTS ANTI GRAVITY

### [PROMPT 1] - Backend Analytics Setup

```markdown
# CONTEXT
I'm building an analytics and decision-making layer AROUND an existing Vyxo CODEX application. The Codex is a training/certification platform that works, but has no database or analytics tracking. I need to build a separate analytics backend that will collect events from the Codex and provide dashboards.

# YOUR TASK
Create a complete backend analytics API with Fastify and PostgreSQL.

# TECH STACK
- Fastify (Node.js TypeScript framework)
- PostgreSQL (Supabase)
- Prisma ORM
- Redis (caching)
- TypeScript 100%

# DELIVERABLES

1. **Project Structure**
```
analytics-backend/
├── src/
│   ├── server.ts (Fastify app)
│   ├── routes/
│   │   ├── tracking.ts
│   │   ├── metrics.ts
│   │   ├── dashboards.ts
│   │   └── alerts.ts
│   ├── services/
│   │   ├── aggregation.service.ts
│   │   ├── metrics.service.ts
│   │   └── alerting.service.ts
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── redis.ts
│   │   └── utils.ts
│   └── types/
│       └── analytics.ts
├── prisma/
│   └── schema.prisma
├── package.json
└── tsconfig.json
```

2. **Prisma Schema**
Create the complete database schema with these tables:
- analytics_events (event tracking)
- daily_metrics (aggregated daily data)
- user_metrics_snapshot (user stats snapshots)
- dashboards (dashboard configurations)
- widgets (dashboard widgets)
- alert_rules (alerting rules)
- alerts (triggered alerts)
- report_templates (report configs)
- generated_reports (report history)
- benchmark_data (industry benchmarks)

Include proper indexes, relations, and JSONB fields where needed.

3. **Tracking Endpoint**

POST /api/track
- Receives events from Vyxo CODEX frontend
- Validates event structure
- Stores in analytics_events table
- Returns 200 OK immediately (async processing)

Event structure:
```typescript
interface AnalyticsEvent {
  event: string; // 'module_started', 'quiz_completed', etc.
  userId: string;
  organizationId?: string;
  properties: Record<string, any>;
  timestamp: number;
  sessionId: string;
  url?: string;
}
```

4. **Metrics Endpoints**

GET /api/metrics/user/:userId
- Returns user metrics:
  - Overall score
  - Modules completed/in-progress/total
  - Time spent (total, last 7d, last 30d)
  - Streak days
  - Recent activity
  - Certifications count

GET /api/metrics/organization/:orgId
- Returns org metrics:
  - DAU, WAU, MAU
  - Average scores
  - Completion rates
  - Active users
  - Top performers

5. **Dashboards Endpoint**

GET /api/dashboards/:role
- Returns dashboard configuration for role (executive, manager, user)
- Includes widgets with data
- Cached for 5 minutes

6. **Aggregation Service**

Background service that runs every day (cron job) to:
- Calculate daily_metrics (DAU, completions, avg scores)
- Update user_metrics_snapshot
- Detect anomalies
- Trigger alerts if thresholds exceeded

7. **Auth & Security**

- API Key authentication via X-API-Key header
- Rate limiting (100 requests/min per IP)
- CORS configured for Codex domain
- Input validation (Zod schemas)

# REQUIREMENTS
- TypeScript strict mode
- All endpoints documented with JSDoc
- Error handling comprehensive
- Logging with Pino
- Health check endpoint: GET /health
- Graceful shutdown handling

# SUCCESS CRITERIA
✅ Server starts successfully
✅ Can receive tracking events
✅ Events stored in database
✅ Metrics endpoints return correct data
✅ Aggregation service runs
✅ API documented (Swagger)

Generate all files needed for a production-ready analytics backend.
```

**Checkpoint 1:**
```bash
npm run dev
# Server should start on port 3001
curl http://localhost:3001/health
# Should return { status: 'ok' }

# Test tracking
curl -X POST http://localhost:3001/api/track \
  -H "Content-Type: application/json" \
  -H "X-API-Key: test_key" \
  -d '{"event":"module_started","userId":"user123","properties":{},"timestamp":1234567890,"sessionId":"sess123"}'
# Should return 200 OK

# Check database
npx prisma studio
# Verify event stored in analytics_events
```

---

### [PROMPT 2] - Aggregation & Metrics Logic

```markdown
# CONTEXT
Analytics backend is setup. Now implementing the aggregation logic and metrics calculation.

# YOUR TASK
Build the aggregation service that processes raw events into useful metrics.

# DELIVERABLES

1. **Aggregation Service**

src/services/aggregation.service.ts

```typescript
class AggregationService {
  // Run daily at midnight
  async aggregateDailyMetrics(date: Date): Promise<void>
  
  // Calculate metrics for specific org
  async calculateOrganizationMetrics(
    organizationId: string,
    date: Date
  ): Promise<DailyMetrics>
  
  // Calculate metrics for specific user
  async calculateUserMetricsSnapshot(
    userId: string,
    date: Date
  ): Promise<UserMetricsSnapshot>
  
  // Calculate engagement metrics
  async calculateEngagementMetrics(
    organizationId: string,
    period: { start: Date; end: Date }
  ): Promise<EngagementMetrics>
}
```

**Calculations needed:**

Daily Metrics:
- DAU = count distinct users with events on date
- New users = count users with first event on date
- Sessions = count distinct session_ids
- Avg session duration = calculate from event timestamps
- Modules started/completed = count specific events
- Quiz attempts = count quiz_completed events
- Avg quiz score = average of scores in properties
- Certifications obtained = count certification_obtained events

User Metrics Snapshot:
- Modules completed = count module_completed events for user
- Modules in progress = count modules with started but not completed
- Overall score = weighted average of quiz scores
- Total time spent = sum of session durations
- Days active last 7d = count distinct dates with activity
- Days active last 30d = count distinct dates with activity
- Streak days = calculate consecutive days with activity
- Certifications count = count certifications

2. **Metrics Service**

src/services/metrics.service.ts

```typescript
class MetricsService {
  // Get user dashboard data
  async getUserDashboard(userId: string): Promise<UserDashboard>
  
  // Get organization dashboard data
  async getOrganizationDashboard(
    organizationId: string,
    role: 'executive' | 'manager'
  ): Promise<OrganizationDashboard>
  
  // Get time series data
  async getTimeSeries(
    metric: string,
    entityId: string,
    period: { start: Date; end: Date }
  ): Promise<TimeSeriesData[]>
  
  // Get real-time metrics (cached)
  async getRealTimeMetrics(
    organizationId: string
  ): Promise<RealTimeMetrics>
}
```

3. **Cron Jobs Setup**

Using node-cron:

```typescript
// src/jobs/aggregation.job.ts
import cron from 'node-cron';

// Run every day at 1 AM
cron.schedule('0 1 * * *', async () => {
  const yesterday = subDays(new Date(), 1);
  await aggregationService.aggregateDailyMetrics(yesterday);
});

// Run every hour for real-time metrics
cron.schedule('0 * * * *', async () => {
  await metricsService.refreshCache();
});
```

4. **Caching Strategy**

Using Redis:

```typescript
// Cache frequently accessed metrics
await redis.setex(
  `metrics:user:${userId}`,
  300, // 5 minutes TTL
  JSON.stringify(metrics)
);

// Cache dashboard data
await redis.setex(
  `dashboard:org:${organizationId}`,
  300,
  JSON.stringify(dashboard)
);
```

5. **API Endpoints Implementation**

```typescript
// GET /api/metrics/user/:userId
fastify.get('/api/metrics/user/:userId', async (request, reply) => {
  const { userId } = request.params;
  
  // Try cache first
  const cached = await redis.get(`metrics:user:${userId}`);
  if (cached) {
    return JSON.parse(cached);
  }
  
  // Calculate metrics
  const metrics = await metricsService.getUserDashboard(userId);
  
  // Cache result
  await redis.setex(
    `metrics:user:${userId}`,
    300,
    JSON.stringify(metrics)
  );
  
  return metrics;
});

// GET /api/metrics/timeseries
fastify.get('/api/metrics/timeseries', async (request, reply) => {
  const { metric, entityId, startDate, endDate } = request.query;
  
  const data = await metricsService.getTimeSeries(
    metric,
    entityId,
    { start: new Date(startDate), end: new Date(endDate) }
  );
  
  return data;
});
```

# REQUIREMENTS
- Efficient SQL queries (use indexes)
- Batch processing for large datasets
- Error handling and retries
- Logging of aggregation runs
- Monitoring of job duration

# SUCCESS CRITERIA
✅ Cron jobs run successfully
✅ Metrics calculated correctly
✅ API endpoints return data fast (<500ms)
✅ Cache hit rate >80%
✅ No data inconsistencies

Generate aggregation and metrics services with optimized queries.
```

**Checkpoint 2:**
```bash
# Manually trigger aggregation
curl -X POST http://localhost:3001/api/jobs/aggregate-daily \
  -H "X-API-Key: test_key"

# Check daily_metrics table
npx prisma studio
# Verify data

# Test user metrics endpoint
curl http://localhost:3001/api/metrics/user/user123 \
  -H "X-API-Key: test_key"
# Should return metrics

# Check Redis cache
redis-cli
> KEYS metrics:*
# Should see cached keys
```

---

### [PROMPT 3] - Frontend Dashboard in Codex

```markdown
# CONTEXT
Analytics backend is ready with metrics API. Now integrating dashboards into the existing Vyxo CODEX frontend.

# YOUR TASK
Create dashboard pages in the Codex that display analytics data from the analytics API.

# DELIVERABLES

1. **New Page: Analytics Dashboard**

Create new route in Codex: `/analytics` or `/pilotage`

```javascript
// pages/analytics.js or components/AnalyticsDashboard.jsx

import { useState, useEffect } from 'react';
import { MetricCard, LineChart, BarChart, AlertCard } from '@/components';

const API_BASE = 'https://api-analytics.vyxo.com';
const API_KEY = process.env.NEXT_PUBLIC_ANALYTICS_API_KEY;

export default function AnalyticsDashboard() {
  const [metrics, setMetrics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const currentUser = getCurrentUser(); // Function from your Codex
  
  useEffect(() => {
    fetchDashboardData();
  }, []);
  
  async function fetchDashboardData() {
    try {
      const response = await fetch(
        `${API_BASE}/api/metrics/user/${currentUser.id}`,
        {
          headers: {
            'X-API-Key': API_KEY,
            'Authorization': `Bearer ${getToken()}`
          }
        }
      );
      
      if (!response.ok) throw new Error('Failed to fetch metrics');
      
      const data = await response.json();
      setMetrics(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  if (!metrics) return null;
  
  return (
    <div className="analytics-dashboard">
      <h1>Pilotage & Performance</h1>
      
      {/* Metrics Overview */}
      <div className="metrics-grid">
        <MetricCard 
          title="Score Global"
          value={`${metrics.overallScore}%`}
          change={metrics.scoreChange}
          trend={metrics.scoreChange > 0 ? 'up' : 'down'}
          icon="📊"
        />
        
        <MetricCard 
          title="Modules Complétés"
          value={`${metrics.modulesCompleted}/${metrics.modulesTotal}`}
          percentage={(metrics.modulesCompleted / metrics.modulesTotal) * 100}
          icon="📚"
        />
        
        <MetricCard 
          title="Temps Passé (7j)"
          value={formatDuration(metrics.timeSpentLast7d)}
          change={calculateChange(metrics.timeSpentLast7d, metrics.timeSpentPrevious7d)}
          icon="⏱️"
        />
        
        <MetricCard 
          title="Streak"
          value={`${metrics.streakDays} jours`}
          subtitle="Jours consécutifs d'activité"
          icon="🔥"
        />
      </div>
      
      {/* Progress Chart */}
      <div className="chart-section">
        <h2>Évolution Score (6 mois)</h2>
        <LineChart 
          data={metrics.progressHistory}
          xKey="date"
          yKey="score"
          color="#4F46E5"
        />
      </div>
      
      {/* Recent Activity */}
      <div className="activity-section">
        <h2>Activité Récente</h2>
        <ActivityTimeline events={metrics.recentActivity} />
      </div>
      
      {/* Alerts */}
      {metrics.alerts && metrics.alerts.length > 0 && (
        <div className="alerts-section">
          <h2>Alertes</h2>
          {metrics.alerts.map(alert => (
            <AlertCard key={alert.id} alert={alert} />
          ))}
        </div>
      )}
    </div>
  );
}
```

2. **Chart Components**

Using Recharts library:

```javascript
// components/LineChart.jsx
import { LineChart as RechartsLine, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function LineChart({ data, xKey, yKey, color = '#4F46E5' }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsLine data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Line type="monotone" dataKey={yKey} stroke={color} />
      </RechartsLine>
    </ResponsiveContainer>
  );
}

// components/BarChart.jsx
import { BarChart as RechartsBar, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export function BarChart({ data, xKey, yKey, color = '#10B981' }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <RechartsBar data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey={xKey} />
        <YAxis />
        <Tooltip />
        <Bar dataKey={yKey} fill={color} />
      </RechartsBar>
    </ResponsiveContainer>
  );
}
```

3. **Metric Card Component**

```javascript
// components/MetricCard.jsx
export function MetricCard({ 
  title, 
  value, 
  change, 
  trend, 
  icon, 
  subtitle,
  percentage 
}) {
  const trendColor = trend === 'up' ? 'text-green-600' : 'text-red-600';
  const trendIcon = trend === 'up' ? '↗' : '↘';
  
  return (
    <div className="metric-card bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm text-gray-600 mb-1">{title}</p>
          <p className="text-3xl font-bold">{value}</p>
          {subtitle && <p className="text-xs text-gray-500 mt-1">{subtitle}</p>}
          {percentage !== undefined && (
            <div className="mt-2">
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full" 
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          )}
        </div>
        
        {icon && (
          <div className="text-4xl ml-4">{icon}</div>
        )}
      </div>
      
      {change !== undefined && (
        <div className={`mt-2 text-sm ${trendColor}`}>
          {trendIcon} {Math.abs(change)}%
        </div>
      )}
    </div>
  );
}
```

4. **Navigation Update**

Add link to analytics in Codex navigation:

```javascript
// components/Navigation.jsx
<nav>
  <a href="/accueil">Accueil</a>
  <a href="/codex">CODEX</a>
  <a href="/modules">Modules</a>
  <a href="/analytics">📊 Pilotage</a> {/* NEW */}
  <a href="/parametres">Paramètres</a>
</nav>
```

5. **Tracking Integration**

Add tracker script to Codex:

```html
<!-- In <head> of Codex -->
<script src="https://api-analytics.vyxo.com/tracker.js"></script>
<script>
  vyxoAnalytics.init({
    apiKey: 'YOUR_API_KEY',
    userId: window.currentUser?.id,
    organizationId: window.currentUser?.organizationId
  });
</script>
```

Add tracking calls to existing Codex functions:

```javascript
// In your existing module completion function
function onModuleComplete(moduleId, score) {
  // Existing logic...
  
  // NEW: Track event
  vyxoAnalytics.track('module_completed', {
    moduleId: moduleId,
    score: score,
    duration: getDuration()
  });
}

// In quiz submission
function onQuizSubmit(quizId, answers) {
  // Existing logic...
  
  // NEW: Track event
  vyxoAnalytics.track('quiz_completed', {
    quizId: quizId,
    score: calculateScore(answers),
    correctAnswers: countCorrect(answers)
  });
}
```

# REQUIREMENTS
- Mobile responsive
- Loading states
- Error handling
- Real-time updates (optional: use WebSockets or polling)
- Accessible (WCAG AA)

# SUCCESS CRITERIA
✅ Analytics page accessible in Codex
✅ Metrics display correctly
✅ Charts render properly
✅ Responsive on mobile
✅ Tracking events fire correctly
✅ No console errors

Generate analytics dashboard integration into Vyxo CODEX.
```

**Checkpoint 3:**
```bash
# 1. Add analytics page to Codex
# 2. Navigate to /analytics
# 3. Check metrics display
# 4. Perform actions (complete module, quiz)
# 5. Verify events tracked
# 6. Refresh analytics page
# 7. Verify metrics updated
```

---

### [PROMPT 4] - Alerting System

```markdown
# CONTEXT
Analytics backend and dashboards working. Now adding intelligent alerting system.

# YOUR TASK
Build alerting system that detects anomalies and notifies users.

# DELIVERABLES

1. **Alert Rules Service**

src/services/alerting.service.ts

```typescript
class AlertingService {
  // Evaluate all rules for an organization
  async evaluateRules(organizationId: string): Promise<Alert[]>
  
  // Check specific metric against threshold
  async checkThreshold(
    rule: AlertRule,
    currentValue: number
  ): Promise<boolean>
  
  // Detect statistical anomalies
  async detectAnomalies(
    metric: string,
    organizationId: string
  ): Promise<Alert[]>
  
  // Send notifications
  async sendNotifications(alert: Alert): Promise<void>
  
  // Acknowledge alert
  async acknowledgeAlert(alertId: string, userId: string): Promise<void>
  
  // Resolve alert
  async resolveAlert(alertId: string): Promise<void>
}
```

2. **Default Alert Rules**

Pre-configured rules to create on organization setup:

```typescript
const defaultAlertRules: AlertRule[] = [
  {
    name: 'Score Global Faible',
    condition: {
      metric: 'overall_score',
      operator: '<',
      threshold: 60,
      duration: 7 * 24 * 60 // 7 days
    },
    severity: 'warning',
    recipients: { roles: ['user', 'manager'] },
    notificationChannels: ['email', 'in_app']
  },
  
  {
    name: 'Inactivité Prolongée',
    condition: {
      metric: 'days_since_last_activity',
      operator: '>',
      threshold: 14
    },
    severity: 'warning',
    recipients: { roles: ['user', 'manager'] },
    notificationChannels: ['email']
  },
  
  {
    name: 'Taux Échec Quiz Élevé',
    condition: {
      metric: 'quiz_failure_rate',
      operator: '>',
      threshold: 50, // 50%
      duration: 3 * 24 * 60 // 3 days
    },
    severity: 'warning',
    recipients: { roles: ['user'] },
    notificationChannels: ['in_app', 'email']
  },
  
  {
    name: 'Baisse Performance Équipe',
    condition: {
      metric: 'team_avg_score',
      operator: '<',
      threshold: 70,
      duration: 7 * 24 * 60
    },
    severity: 'critical',
    recipients: { roles: ['manager'] },
    notificationChannels: ['email', 'slack']
  }
];
```

3. **Anomaly Detection**

Statistical anomaly detection using Z-score:

```typescript
async function detectAnomalies(
  metric: string,
  organizationId: string
): Promise<Alert[]> {
  // Get historical data (last 90 days)
  const history = await getMetricHistory(metric, organizationId, 90);
  
  // Calculate mean and standard deviation
  const mean = calculateMean(history);
  const stdDev = calculateStdDev(history);
  const currentValue = history[history.length - 1];
  
  const alerts: Alert[] = [];
  
  // Z-score method: value > mean + 2*stdDev is anomaly
  const zScore = Math.abs((currentValue - mean) / stdDev);
  
  if (zScore > 2) {
    alerts.push({
      type: 'anomaly_detected',
      severity: zScore > 3 ? 'critical' : 'warning',
      title: `Anomalie détectée: ${metric}`,
      description: `Valeur actuelle (${currentValue}) s'écarte significativement de la normale (${mean.toFixed(2)} ± ${stdDev.toFixed(2)})`,
      triggeredBy: {
        metric: metric,
        threshold: mean + 2 * stdDev,
        actualValue: currentValue
      },
      recommendedActions: [
        'Vérifier les données sources',
        'Investiguer les causes',
        'Consulter l\'équipe concernée'
      ]
    });
  }
  
  return alerts;
}
```

4. **Notification Service**

Send notifications via multiple channels:

```typescript
// src/services/notification.service.ts
class NotificationService {
  async send(alert: Alert, channel: NotificationChannel): Promise<void> {
    switch (channel) {
      case 'email':
        await this.sendEmail(alert);
        break;
      case 'slack':
        await this.sendSlack(alert);
        break;
      case 'in_app':
        await this.sendInApp(alert);
        break;
    }
  }
  
  async sendEmail(alert: Alert): Promise<void> {
    const recipients = await this.getRecipients(alert);
    
    await emailService.send({
      to: recipients.map(r => r.email),
      subject: `[${alert.severity.toUpperCase()}] ${alert.title}`,
      html: renderAlertEmail(alert)
    });
  }
  
  async sendInApp(alert: Alert): Promise<void> {
    const recipients = await this.getRecipients(alert);
    
    for (const recipient of recipients) {
      await database.notifications.create({
        data: {
          userId: recipient.id,
          type: 'alert',
          title: alert.title,
          message: alert.description,
          link: `/analytics/alerts/${alert.id}`,
          read: false
        }
      });
    }
  }
}
```

5. **API Endpoints**

```typescript
// GET /api/alerts
fastify.get('/api/alerts', async (request, reply) => {
  const { organizationId } = request.query;
  
  const alerts = await database.alerts.findMany({
    where: {
      organizationId,
      status: 'open'
    },
    orderBy: { createdAt: 'desc' }
  });
  
  return alerts;
});

// POST /api/alerts/:id/acknowledge
fastify.post('/api/alerts/:id/acknowledge', async (request, reply) => {
  const { id } = request.params;
  const { userId } = request.body;
  
  await alertingService.acknowledgeAlert(id, userId);
  
  return { success: true };
});

// POST /api/alerts/:id/resolve
fastify.post('/api/alerts/:id/resolve', async (request, reply) => {
  const { id } = request.params;
  
  await alertingService.resolveAlert(id);
  
  return { success: true };
});
```

6. **Cron Job for Alerts**

Run every hour to check rules:

```typescript
import cron from 'node-cron';

// Every hour
cron.schedule('0 * * * *', async () => {
  const organizations = await getAllOrganizations();
  
  for (const org of organizations) {
    const alerts = await alertingService.evaluateRules(org.id);
    
    for (const alert of alerts) {
      await alertingService.sendNotifications(alert);
    }
  }
});
```

7. **Frontend: Alerts Display**

```javascript
// components/AlertsList.jsx
export function AlertsList({ alerts }) {
  const [localAlerts, setLocalAlerts] = useState(alerts);
  
  async function acknowledgeAlert(alertId) {
    await fetch(`${API_BASE}/api/alerts/${alertId}/acknowledge`, {
      method: 'POST',
      headers: {
        'X-API-Key': API_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ userId: currentUser.id })
    });
    
    setLocalAlerts(localAlerts.filter(a => a.id !== alertId));
  }
  
  return (
    <div className="alerts-list">
      {localAlerts.map(alert => (
        <div 
          key={alert.id} 
          className={`alert alert-${alert.severity}`}
        >
          <div className="alert-header">
            <span className="alert-icon">
              {alert.severity === 'critical' ? '🔴' : '🟠'}
            </span>
            <h3>{alert.title}</h3>
          </div>
          
          <p>{alert.description}</p>
          
          {alert.recommendedActions && (
            <ul className="actions-list">
              {alert.recommendedActions.map((action, i) => (
                <li key={i}>{action}</li>
              ))}
            </ul>
          )}
          
          <button onClick={() => acknowledgeAlert(alert.id)}>
            Prendre en compte
          </button>
        </div>
      ))}
    </div>
  );
}
```

# REQUIREMENTS
- Efficient rule evaluation
- Throttling (max 1 alert per hour per rule)
- Email templates professional
- Notification preferences per user
- Alert history retention (90 days)

# SUCCESS CRITERIA
✅ Rules evaluate correctly
✅ Anomalies detected
✅ Notifications sent
✅ Alerts display in app
✅ Can acknowledge/resolve alerts

Generate complete alerting system.
```

**Checkpoint 4:**
```bash
# Trigger alert conditions manually
# 1. Create test data with low scores
# 2. Wait for cron or trigger manually
# 3. Check alerts table in database
# 4. Verify email sent
# 5. Check in-app notifications
# 6. Acknowledge alert from UI
```

---

## 📚 GUIDES ADDITIONNELS

### Guide d'intégration rapide

**Pour intégrer la couche analytics dans votre Codex existant en 1 heure :**

1. **Ajouter le tracker** (10 min)
```html
<script src="https://api-analytics.vyxo.com/tracker.js"></script>
```

2. **Tracker les événements** (20 min)
```javascript
vyxoAnalytics.track('module_completed', {...});
vyxoAnalytics.track('quiz_completed', {...});
```

3. **Créer page analytics** (20 min)
```javascript
// /pages/analytics.js
// Fetch depuis API analytics
// Display metrics
```

4. **Tester** (10 min)
- Effectuer actions dans Codex
- Vérifier events tracked
- Voir métriques dans analytics page

---

## 🎯 RÉSUMÉ STRATÉGIE

```
AVANT (❌ Trop complexe):
└─ Reconstruire tout le Vyxo Codex from scratch
   └─ 14 jours minimum
   └─ Risque de bugs
   └─ Perdre l'existant qui marche

MAINTENANT (✅ Smart & Rapide):
└─ Garder Vyxo Codex existant
└─ Ajouter couche analytics AUTOUR
   ├─ Backend analytics séparé (3-4 jours)
   ├─ Tracking dans Codex (1 jour)
   ├─ Dashboards analytics (2-3 jours)
   └─ Alerting + Reports (2-3 jours)
   └─ TOTAL: 8-10 jours max

RÉSULTAT:
✅ Vyxo Codex reste stable
✅ Ajout décisionnel/analytics puissant
✅ Dashboards pro pour dirigeants
✅ Alerting intelligent
✅ Rapports automatisés
✅ Foundation pour scaling futur
```

---

**Tu veux que je commence par quel prompt ? 🚀**

1. Backend Analytics Setup ?
2. Integration Tracking ?
3. Frontend Dashboards ?

Dis-moi et on lance ! 💪

