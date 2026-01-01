# 📋 PROMPT PLAN MVP - VYXO CODEX B2B SAAS

**Version :** 1.0  
**Date de création :** 28 Décembre 2025  
**Objectif :** Transformer Vyxo Codex en plateforme B2B SaaS Self-Serve Multi-Normes

---

## 📊 TABLEAU DE BORD

| Prompt | Nom                           | Statut        | Dépendances |
| ------ | ----------------------------- | ------------- | ----------- |
| #0     | Audit de l'Existant           | ✅ TERMINÉ    | -           |
| #1     | Schéma de Base de Données MVP | ✅ TERMINÉ    | #0          |
| #2     | Auth & Onboarding             | ✅ TERMINÉ    | #1          |
| #3     | Questionnaire Diagnostic      | ✅ TERMINÉ    | #2          |
| #4     | Générateur de Roadmap         | ✅ TERMINÉ    | #3          |
| #5     | Bibliothèque de Templates     | ✅ TERMINÉ    | #4          |
| #6     | Dashboard de Suivi            | ⏸️ EN ATTENTE | #5          |
| #7     | Système de Paiement Stripe    | ⏸️ EN ATTENTE | #1-#6       |
| #8     | Onboarding Self-Serve Complet | ⏸️ EN ATTENTE | #2-#7       |

**Progression globale :** 2/9 (22%)

---

## 🔍 PROMPT #0 : AUDIT DE L'EXISTANT

**Statut : ✅ TERMINÉ**  
**Date : 28/12/2025**

### Objectif

Cartographier l'architecture actuelle avant modifications.

### Livrables

- [x] Structure des dossiers documentée
- [x] Pages existantes identifiées
- [x] Composants réutilisables listés
- [x] Schéma DB analysé (Prisma 639 lignes)
- [x] Features existantes évaluées
- [x] Gaps identifiés
- [x] Rapport final créé

### Résultat

📄 **[AUDIT_VYXO_CODEX_MVP.md](./AUDIT_VYXO_CODEX_MVP.md)**

**Conclusion :** 60% réutilisable, 40% à créer

---

## 🗄️ PROMPT #1 : SCHÉMA DE BASE DE DONNÉES MVP

**Statut : ⏸️ EN ATTENTE**  
**Dépendance : Prompt #0**

### Objectif

Définir/adapter le schéma DB Supabase pour supporter toutes les features MVP.

### Tables à créer/modifier

| Table          | Action   | Description                                                                  |
| -------------- | -------- | ---------------------------------------------------------------------------- |
| `users`        | Modifier | Ajouter `company_size`, `industry_sector`, `subscription_status`, `stripe_*` |
| `assessments`  | Adapter  | Depuis `assessment_sessions`, ajouter `standard_type`                        |
| `roadmaps`     | Créer    | Roadmaps personnalisées par user                                             |
| `actions`      | Créer    | Référentiel actions par norme                                                |
| `user_actions` | Créer    | Progression utilisateur                                                      |
| `templates`    | Créer    | Bibliothèque templates par norme                                             |

### Livrables attendus

- [ ] Migrations Prisma
- [ ] Schema.prisma mis à jour
- [ ] Script de seed avec données de test
- [ ] RLS policies Supabase

---

## 🔐 PROMPT #2 : AUTH & ONBOARDING

**Statut : ⏸️ EN ATTENTE**  
**Dépendance : Prompt #1**

### Objectif

Créer un onboarding self-serve complet avec sélection de norme.

### Flow utilisateur

1. Landing Page → CTA "Évaluez votre maturité"
2. Sign Up multi-step (identité + entreprise + norme visée)
3. Email de confirmation
4. Redirection vers diagnostic

### Pages à créer

- [ ] `/signup` (form multi-step)
- [ ] Email templates (confirmation)

### Livrables attendus

- [ ] Page signup fonctionnelle
- [ ] Server Actions auth
- [ ] Sélection de norme à l'inscription

---

## 📝 PROMPT #3 : QUESTIONNAIRE DIAGNOSTIC

**Statut : ⏸️ EN ATTENTE**  
**Dépendance : Prompt #2**

### Objectif

Créer questionnaires intelligents par norme (25-30 questions chacun).

### Normes à couvrir

| Norme          | Questions | Chapitres    |
| -------------- | --------- | ------------ |
| ISO 9001       | ~30       | 10 chapitres |
| GDP (Pharma)   | ~25       | 9 chapitres  |
| ISO 27001      | ~30       | 14 domaines  |
| HACCP          | ~20       | 7 principes  |
| ISO 42001 (IA) | ~25       | 10 clauses   |
| Sûreté Aéro    | ~20       | 11.2.x       |

### Fonctionnalités

- [ ] Questions multi-types (choix, échelle, oui/non)
- [ ] Questions conditionnelles par secteur
- [ ] Auto-save progressif
- [ ] Algorithme de scoring pondéré

### Livrables attendus

- [ ] Page `/onboarding/assessment`
- [ ] JSON/DB questions par norme
- [ ] Page `/onboarding/results` avec visualisations

---

## 🗺️ PROMPT #4 : GÉNÉRATEUR DE ROADMAP

**Statut : ⏸️ EN ATTENTE**  
**Dépendance : Prompt #3**

### Objectif

Générer automatiquement un plan d'action personnalisé en sprints.

### Logique de génération

1. Identifier actions nécessaires selon gaps
2. Prioriser par criticité
3. Répartir sur 12 sprints (ou adapté selon norme)
4. Calculer estimation temps

### Fonctionnalités

- [ ] Algo de priorisation
- [ ] Répartition équilibrée par sprint
- [ ] Estimation dynamique de durée
- [ ] Lien vers templates associés

### Livrables attendus

- [ ] Page `/dashboard/roadmap`
- [ ] Composant SprintTimeline
- [ ] Modale détail action
- [ ] Référentiel actions par norme (JSON/DB)

---

## 📂 PROMPT #5 : BIBLIOTHÈQUE DE TEMPLATES

**Statut : ⏸️ EN ATTENTE**  
**Dépendance : Prompt #4**

### Objectif

Créer bibliothèque de templates par norme, liés aux actions.

### Templates par norme

| Norme     | Manuels | Procédures | Formulaires | Outils |
| --------- | ------- | ---------- | ----------- | ------ |
| ISO 9001  | 3-4     | 10-12      | 8-10        | 3-4    |
| GDP       | 2-3     | 8-10       | 6-8         | 2-3    |
| ISO 27001 | 3-4     | 12-15      | 8-10        | 4-5    |
| HACCP     | 2-3     | 6-8        | 5-7         | 2-3    |
| ISO 42001 | 3-4     | 8-10       | 6-8         | 3-4    |
| Sûreté    | 2-3     | 6-8        | 5-7         | 2-3    |

### Livrables attendus

- [ ] Page `/dashboard/templates`
- [ ] Templates Word/Excel créés
- [ ] Upload Supabase Storage
- [ ] Tracking téléchargements

---

## 📊 PROMPT #6 : DASHBOARD DE SUIVI

**Statut : ⏸️ EN ATTENTE**  
**Dépendance : Prompt #5**

### Objectif

Dashboard principal avec vue d'ensemble de la progression.

### Widgets à créer/adapter

- [ ] Score de maturité actuel (circle progress)
- [ ] Progression sprints (progress bar)
- [ ] Temps restant estimé
- [ ] Actions en cours / à venir
- [ ] Alertes & notifications
- [ ] Templates populaires
- [ ] Stats rapides
- [ ] Graphique radar par chapitre
- [ ] Graphique évolution dans le temps

### Livrables attendus

- [ ] Page `/dashboard` mise à jour
- [ ] Tous les composants widgets
- [ ] Data aggregation optimisée

---

## 💳 PROMPT #7 : SYSTÈME DE PAIEMENT STRIPE

**Statut : ⏸️ EN ATTENTE**  
**Dépendance : Prompts #1-#6**

### Objectif

Intégrer Stripe pour abonnements.

### Configuration

| Plan     | Prix      | Récurrence |
| -------- | --------- | ---------- |
| Mensuel  | €399/mois | 8 mois     |
| One-time | €2990     | Unique     |

### Fonctionnalités

- [ ] Page `/checkout`
- [ ] Stripe Payment Element
- [ ] Webhooks (`/api/webhooks/stripe`)
- [ ] Customer Portal
- [ ] Protection routes par subscription
- [ ] Page `/dashboard/subscription`

### Livrables attendus

- [ ] Checkout fonctionnel
- [ ] Webhooks configurés
- [ ] Gestion subscriptions dans DB
- [ ] Section pricing sur landing

---

## 🚀 PROMPT #8 : ONBOARDING SELF-SERVE COMPLET

**Statut : ⏸️ EN ATTENTE**  
**Dépendance : Prompts #2-#7**

### Objectif

Flow complet de bout en bout sans intervention humaine.

### Flow final

```
Landing → SignUp → Assessment → Results → Checkout → Dashboard
```

### Fonctionnalités

- [ ] Progress indicator (4 étapes)
- [ ] Welcome modal (première connexion)
- [ ] Emails automatiques
  - [ ] Confirmation inscription
  - [ ] Rappel assessment incomplet
  - [ ] Welcome après paiement
  - [ ] Rappels sprint

### Tests E2E

- [ ] User peut s'inscrire
- [ ] User peut compléter assessment
- [ ] User reçoit score + résultats
- [ ] Roadmap générée automatiquement
- [ ] User peut payer
- [ ] User accède au dashboard
- [ ] Templates téléchargeables
- [ ] Actions marquables comme complétées

---

## 📅 TIMELINE ESTIMÉE

```
SEMAINE 1-2 : Prompts #0-#1 (Fondations)
├── ✅ Audit existant
└── ⏸️ Extension DB

SEMAINE 3-5 : Prompts #2-#4 (Core Product)
├── Auth & Onboarding
├── Questionnaire Diagnostic
└── Générateur Roadmap

SEMAINE 6-7 : Prompts #5-#7 (Dashboard & Paiement)
├── Bibliothèque Templates
├── Dashboard de suivi
└── Système Stripe

SEMAINE 8 : Prompt #8 (Polish & Launch)
├── Onboarding self-serve complet
├── Tests E2E
└── Déploiement production
```

**Objectif final :** MVP fonctionnel prêt pour les 10 premiers clients payants

---

## 📝 NOTES & DÉCISIONS

### Questions résolues

- ✅ Multi-normes (pas uniquement ISO 9001)
- ✅ Promesse "Réduisez votre temps de certification" (pas délai fixe)

### Questions en attente

- [ ] Qui crée le contenu (questions, actions, templates) ?
- [ ] Compte Stripe déjà configuré ?
- [ ] Deadline impérative ?

---

_Document de suivi - Mis à jour le 28/12/2025_
