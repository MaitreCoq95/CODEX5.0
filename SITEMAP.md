# 🗺️ VYXO CODEX - SITEMAP & USER FLOW

> Document mis à jour : 28/12/2024 23:15

---

## 📍 ARBORESCENCE DES PAGES

```
🏠 VYXO CODEX
│
├── 🌐 PUBLIC (Non authentifié)
│   ├── /                        → Landing Page (à créer)
│   ├── /login                   → Connexion
│   ├── /signup                  → Inscription + Progress Step 1
│   │   └── ?standard=ISO_9001   → Pré-sélection norme
│   └── /pricing                 → Page tarifs
│
├── 💳 CHECKOUT (Paiement Stripe)
│   ├── /checkout                → Récap + Redirection Stripe
│   │   └── ?plan=monthly|onetime
│   └── /checkout/success        → Confirmation + Confetti
│
├── 🔄 ONBOARDING (4 étapes)
│   ├── /onboarding/assessment   → Questionnaire + Progress Step 2
│   │   └── ?standard=XXX        → 7 normes, ~170 questions
│   └── /onboarding/results      → Résultats + Progress Step 3
│       └── ?standard=XXX        → Score + Radar + Gaps
│
└── 📊 DASHBOARD (Authentifié) + Progress Step 4
    ├── /dashboard               → Vue d'ensemble + Welcome Modal
    ├── /dashboard/roadmap       → Plan d'action par sprints
    ├── /dashboard/templates     → Bibliothèque Templates [FREE]
    ├── /dashboard/generator     → Générateur IA [PREMIUM]
    └── /dashboard/subscription  → Gestion abonnement
```

---

## 🔀 USER FLOW COMPLET

```mermaid
flowchart TD
    A[🌐 Landing Page] --> B[/signup?standard=XXX]
    B --> C{Compte créé}

    C --> D[/onboarding/assessment]
    D --> E[20-30 questions]
    E --> F[/onboarding/results]

    F --> G{Score + Gaps}
    G --> H[/pricing]
    H --> I[/checkout?plan=X]
    I --> J[Stripe]
    J --> K[/checkout/success]

    K --> L[/dashboard + Welcome Modal]
    L --> M[Roadmap]
    L --> N[Templates]
    L --> O[Générateur IA]

    style A fill:#D4AF37,color:#0A1628
    style K fill:#22C55E,color:#fff
    style O fill:#D4AF37,color:#0A1628
```

---

## ✅ PAGES IMPLÉMENTÉES

| Page         | Route                     | Description                     |
| ------------ | ------------------------- | ------------------------------- |
| Inscription  | `/signup`                 | Form + Progress Bar             |
| Diagnostic   | `/onboarding/assessment`  | 7 normes, question par question |
| Résultats    | `/onboarding/results`     | Score + Radar + Gaps            |
| Dashboard    | `/dashboard`              | Widgets + Welcome Modal         |
| Roadmap      | `/dashboard/roadmap`      | Sprints + Actions               |
| Templates    | `/dashboard/templates`    | ~91 templates FREE              |
| Générateur   | `/dashboard/generator`    | 9 générateurs PREMIUM           |
| Pricing      | `/pricing`                | 2 plans (399€/mois, 2990€)      |
| Checkout     | `/checkout`               | Récap + Stripe redirect         |
| Success      | `/checkout/success`       | Confirmation + Confetti         |
| Subscription | `/dashboard/subscription` | Gestion abo                     |

## ⏳ À CRÉER

| Page    | Route | Description              |
| ------- | ----- | ------------------------ |
| Landing | `/`   | Page d'accueil marketing |

---

## 🎯 7 NORMES SUPPORTÉES

| Code        | Norme     | Diagnostic | Roadmap | Templates | Générateur |
| ----------- | --------- | :--------: | :-----: | :-------: | :--------: |
| `ISO_9001`  | ISO 9001  |     ✅     |   ✅    |    ✅     |     ✅     |
| `GDP`       | GDP/BPD   |     ✅     |   ✅    |    ✅     |     ✅     |
| `ISO_27001` | ISO 27001 |     ✅     |   ✅    |    ✅     |     ✅     |
| `HACCP`     | HACCP     |     ✅     |   ✅    |    ✅     |     ✅     |
| `ISO_42001` | ISO 42001 |     ✅     |   ✅    |    ✅     |     ✅     |
| `ISO_13485` | ISO 13485 |     ✅     |   ✅    |    ✅     |     ✅     |
| `SURETE`    | Sûreté    |     ✅     |   ✅    |    ✅     |     ✅     |

---

## � COMPOSANTS CRÉÉS

```
components/
├── onboarding/
│   ├── progress.tsx        # Barre 4 étapes avec animations
│   ├── welcome-modal.tsx   # Modal 1ère connexion
│   └── index.ts
└── auth/
    └── SignUpForm.tsx      # Form + Progress intégré
```

---

_Dernière mise à jour: 28/12/2024 23:15_
