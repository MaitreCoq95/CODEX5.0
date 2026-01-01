# Deployment Configuration for Railway/Render

## Railway

### Build Command

```
npm install && npx prisma generate
```

### Start Command

```
npm start
```

### Environment Variables

Add all variables from `.env.example` in the Railway dashboard.

## Render

### render.yaml (Optional - for Blueprint)

```yaml
services:
  - type: web
    name: codex-analytics-api
    env: node
    plan: starter
    buildCommand: npm install && npx prisma generate
    startCommand: npm start
    envVars:
      - key: NODE_ENV
        value: production
      - key: PORT
        value: 3005
```

## Vercel (for CODEX Frontend)

### Environment Variables

```
NEXT_PUBLIC_ANALYTICS_API_URL=https://your-analytics-api.railway.app
```

## Production Checklist

- [ ] Set NODE_ENV=production
- [ ] Update CORS_ORIGIN to production domain
- [ ] Verify DATABASE_URL uses pooled connection
- [ ] Add SUPABASE keys
- [ ] Test all endpoints after deploy
- [ ] Verify cron jobs are running
