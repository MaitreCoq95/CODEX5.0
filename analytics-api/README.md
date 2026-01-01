# 📊 VYXO CODEX Analytics API

API d'analytics pour la plateforme de formation VYXO CODEX.

## 🚀 Quick Start

```bash
# Installation
npm install

# Configuration
cp .env.example .env
# Éditer .env avec vos credentials Supabase

# Migrations
npx prisma db push

# Développement
npm run dev

# Production
npm run build && npm start
```

## 📡 Endpoints API

### Health Check

| Method | Endpoint  | Description       |
| ------ | --------- | ----------------- |
| GET    | `/health` | Status du serveur |

### Tracking

| Method | Endpoint     | Description                        |
| ------ | ------------ | ---------------------------------- |
| POST   | `/api/track` | Enregistrer un événement analytics |

**Body POST /api/track:**

```json
{
  "eventType": "page_view",
  "sessionId": "session-uuid",
  "userId": "user-id",
  "page": "/modules/1",
  "eventData": { "moduleId": "1" }
}
```

### Metrics

| Method | Endpoint                           | Description             |
| ------ | ---------------------------------- | ----------------------- |
| GET    | `/api/metrics/user/:userId`        | Dashboard utilisateur   |
| GET    | `/api/metrics/organization/:orgId` | Dashboard organisation  |
| GET    | `/api/metrics/timeseries`          | Données temporelles     |
| GET    | `/api/metrics/realtime`            | Statistiques temps réel |

### Alertes

| Method | Endpoint                      | Description          |
| ------ | ----------------------------- | -------------------- |
| GET    | `/api/alerts`                 | Liste des alertes    |
| GET    | `/api/alerts/:id`             | Détail d'une alerte  |
| POST   | `/api/alerts/:id/acknowledge` | Acquitter une alerte |
| POST   | `/api/alerts/:id/resolve`     | Résoudre une alerte  |
| GET    | `/api/alert-rules`            | Liste des règles     |

### Notifications

| Method | Endpoint                               | Description               |
| ------ | -------------------------------------- | ------------------------- |
| GET    | `/api/notifications?userId=xxx`        | Notifications utilisateur |
| GET    | `/api/notifications/unread?userId=xxx` | Non lues                  |
| POST   | `/api/notifications/:id/read`          | Marquer comme lue         |
| POST   | `/api/notifications/mark-all-read`     | Tout marquer lu           |

### Rapports

| Method | Endpoint                    | Description             |
| ------ | --------------------------- | ----------------------- |
| GET    | `/api/reports/templates`    | Templates disponibles   |
| POST   | `/api/reports/generate`     | Générer un rapport      |
| GET    | `/api/reports/history`      | Historique des rapports |
| GET    | `/api/reports/:id`          | Détail d'un rapport     |
| GET    | `/api/reports/:id/download` | Télécharger le fichier  |

**Body POST /api/reports/generate:**

```json
{
  "type": "progress",
  "format": "excel",
  "periodStart": "2025-01-01",
  "periodEnd": "2025-01-31",
  "userId": "requester-id"
}
```

### Jobs Manuels

| Method | Endpoint                    | Description               |
| ------ | --------------------------- | ------------------------- |
| POST   | `/api/jobs/aggregate-daily` | Agréger stats aujourd'hui |
| POST   | `/api/jobs/evaluate-rules`  | Évaluer règles d'alerte   |
| POST   | `/api/jobs/seed-rules`      | Seed règles par défaut    |
| POST   | `/api/jobs/seed-templates`  | Seed templates rapports   |

## 🗄️ Modèles de Données

### Event

```
- id, userId, sessionId, eventType
- eventData (JSON), page, timestamp
```

### DailyStat

```
- date, totalEvents, uniqueUsers
- quizCompleted, modulesViewed, lessonsCompleted
```

### UserProgress

```
- userId, totalXp, currentLevel
- modulesStarted[], modulesCompleted[]
- avgScore, currentStreak
```

### AlertRule

```
- name, metric, operator, threshold
- severity, notifyChannels[], cooldownMinutes
```

### Alert

```
- ruleId, severity, title
- affectedUserId, triggerValue
- status (open/acknowledged/resolved)
```

### Notification

```
- userId, type, title, message
- read, alertId
```

### ReportTemplate & GeneratedReport

```
- type, format, periodStart, periodEnd
- status, filePath, downloadCount
```

## ⚙️ Variables d'Environnement

```env
# Database (Supabase)
DATABASE_URL=postgresql://...
DIRECT_URL=postgresql://...

# Supabase
SUPABASE_URL=https://xxx.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_KEY=eyJ...

# Server
PORT=3005
NODE_ENV=production
CORS_ORIGIN=https://your-codex-app.vercel.app
```

## 📅 Cron Jobs

| Schedule     | Job               | Description               |
| ------------ | ----------------- | ------------------------- |
| `0 1 * * *`  | Daily Aggregation | Agrège stats de la veille |
| `0 * * * *`  | Cleanup           | Supprime events >30 jours |
| `30 * * * *` | Alert Evaluation  | Évalue règles d'alerte    |

## 🚀 Déploiement

### Railway

1. Créer nouveau projet Railway
2. Connecter repo GitHub
3. Ajouter variables d'environnement
4. Deploy automatique

### Render

1. New Web Service
2. Connecter repo
3. Build Command: `npm install && npx prisma generate`
4. Start Command: `npm start`

## 📊 Métriques de Performance

- **Objectif response time**: < 500ms
- **Cache TTL**: 5 minutes (dashboard)
- **Events retention**: 30 jours
- **Report retention**: 30 jours
