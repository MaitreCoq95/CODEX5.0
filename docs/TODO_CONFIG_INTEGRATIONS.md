# 📋 TODO - Configuration des Intégrations

> Ce fichier regroupe toutes les configurations à faire après le déploiement.

---

## 🔧 1. Webhook CRM Personnalisé

### Variables d'environnement

Ajoute dans `.env.local` :

```env
# URL de ton endpoint webhook
CUSTOM_CRM_WEBHOOK_URL=https://ton-crm.com/api/leads/webhook

# Token d'authentification (optionnel)
CUSTOM_CRM_API_KEY=ton-token-secret

# Headers personnalisés en JSON (optionnel)
CUSTOM_CRM_HEADERS={"X-Source": "vyxo-codex"}
```

### Format du payload reçu

```json
{
  "lead": {
    "company_name": "Nom Entreprise",
    "siret": "12345678901234",
    "contact": {
      "email": "contact@entreprise.fr",
      "phone": "0600000000",
      "function": "dirigeant_dg"
    },
    "organization": {
      "size": "51_200",
      "certifications": ["GDP", "ISO9001"]
    },
    "scoring": {
      "lead_score": 85,
      "maturity_score": 72,
      "lead_level": "HOT",
      "lead_priority": "4h"
    },
    "tags": ["role:dirigeant", "priority:haute"]
  },
  "metadata": {
    "source": "vyxo-codex-landing",
    "timestamp": "2025-12-27T12:00:00.000Z"
  }
}
```

### Champs clés à mapper

| Champ      | JSON Path                    | Description           |
| ---------- | ---------------------------- | --------------------- |
| Entreprise | `lead.company_name`          | Raison sociale        |
| SIRET      | `lead.siret`                 | Validé via API        |
| Email      | `lead.contact.email`         | Email pro             |
| Score      | `lead.scoring.lead_score`    | 0-100                 |
| Niveau     | `lead.scoring.lead_level`    | HOT/QUALIFIED/NURTURE |
| Priorité   | `lead.scoring.lead_priority` | 4h/24h/48h/7j         |

---

## 📧 2. Service d'Emails (Resend/SendGrid)

### Variables d'environnement

```env
# Provider (resend ou sendgrid)
EMAIL_PROVIDER=resend

# Clé API
RESEND_API_KEY=re_xxxxxxxxxxxxxx
# ou
EMAIL_API_KEY=SG.xxxxxxxxxxxxxx

# Expéditeur
EMAIL_FROM=Vyxo Codex <noreply@vyxo-codex.fr>
EMAIL_REPLY_TO=contact@vyxo-codex.fr
```

### Créer un compte Resend (recommandé)

1. Aller sur https://resend.com
2. Créer un compte
3. Ajouter ton domaine `vyxo-codex.fr`
4. Configurer les DNS (DKIM, SPF)
5. Générer une API Key
6. Ajouter dans `.env.local`

### Templates disponibles

| Template                 | Quand                   | Destinataire |
| ------------------------ | ----------------------- | ------------ |
| `confirmation_dirigeant` | Form submit (dirigeant) | Lead         |
| `confirmation_manager`   | Form submit (manager)   | Lead         |
| `director_invite`        | Manager partage lien    | Dirigeant    |

---

## 📊 3. Analytics (GA4 + Mixpanel)

### Variables d'environnement

```env
# Google Analytics 4
NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX

# Mixpanel (optionnel)
NEXT_PUBLIC_MIXPANEL_TOKEN=xxxxxxxxxx
```

### Créer Google Analytics 4

1. Aller sur https://analytics.google.com
2. Créer une propriété GA4
3. Récupérer l'ID de mesure (G-XXXXXXXX)
4. Ajouter dans `.env.local`

### Créer Mixpanel (optionnel)

1. Aller sur https://mixpanel.com
2. Créer un projet
3. Récupérer le Token dans Settings
4. Ajouter dans `.env.local`

### Events trackés automatiquement

| Event                 | Quand                    | Données                            |
| --------------------- | ------------------------ | ---------------------------------- |
| `page_view`           | Page vue                 | variant, timestamp                 |
| `role_selected`       | Dirigeant/Manager choisi | role                               |
| `form_started`        | Premier champ rempli     | first_field                        |
| `form_field_filled`   | Champ rempli             | field, has_value                   |
| `form_submitted`      | Formulaire envoyé        | role, company_size, certifications |
| `maturity_started`    | Questions démarrées      | total_questions                    |
| `maturity_completed`  | Questions terminées      | score, completion_rate             |
| `maturity_skipped`    | Questions passées        | -                                  |
| `score_viewed`        | Score affiché            | lead_score, level, priority        |
| `modules_viewed`      | Modules vus              | free_modules, locked_modules       |
| `cta_clicked`         | CTA cliqué               | destination                        |
| `confirmation_viewed` | Page confirmation        | role, score                        |
| `share_link_copied`   | Lien copié               | -                                  |
| `director_invited`    | Dirigeant invité         | -                                  |

### Utilisation dans le code

```typescript
import {
  trackRoleSelected,
  trackFormSubmitted,
} from "@/lib/services/analytics-service";

// Exemple
trackRoleSelected("dirigeant");
trackFormSubmitted({
  role: "dirigeant",
  companySize: "51_200",
  certificationCount: 3,
  hasSiret: true,
});
```

---

## ✅ Checklist post-déploiement

- [ ] Configurer le webhook CRM
- [ ] Créer compte Resend et ajouter domaine
- [ ] Configurer les DNS email (DKIM, SPF)
- [ ] Ajouter API key email dans .env
- [ ] Tester l'envoi d'email depuis l'API
- [ ] Créer propriété Google Analytics 4
- [ ] Ajouter GA_ID dans .env
- [ ] (Optionnel) Créer compte Mixpanel
- [ ] Tester le flow complet (form → email → CRM)
- [ ] Vérifier les events dans GA4 Realtime

---

## 🧪 URLs de test

| Fonction        | URL                                                           |
| --------------- | ------------------------------------------------------------- |
| Landing Page    | http://localhost:3000/landing                                 |
| Test SIRET      | http://localhost:3000/api/siret/validate?siret=80295478500028 |
| Config webhooks | http://localhost:3000/api/leads/submit (GET)                  |
| Config emails   | http://localhost:3000/api/emails/send (GET)                   |

---

## 📁 Fichiers concernés

- `lib/services/webhook-service.ts` - Webhooks CRM
- `lib/services/email-service.ts` - Envoi emails
- `lib/services/analytics-service.ts` - Tracking events
- `components/analytics-provider.tsx` - Provider GA4/Mixpanel
- `app/api/leads/submit/route.ts` - Soumission leads
- `app/api/emails/send/route.ts` - Envoi emails
