# 📋 TODO CONFIGURATION - Actions Vivien

Ce fichier liste toutes les actions de configuration que Vivien doit effectuer.
Cocher au fur et à mesure de l'avancement.

---

## 🔐 CLÉS API & SERVICES

### Stripe (Prompt #7)

- [ ] Créer un compte Stripe (ou utiliser l'existant)
- [ ] Activer le mode Test
- [ ] Récupérer les clés :
  - [ ] `STRIPE_SECRET_KEY` (sk*test*...)
  - [ ] `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (pk*test*...)
- [ ] Créer les Products & Prices dans Stripe Dashboard :
  - [ ] Product "Vyxo Codex - Certification"
  - [ ] Price mensuel : €399/mois
  - [ ] Price one-time : €2990
- [ ] Configurer Webhook :
  - [ ] URL : `https://votre-domaine.com/api/webhooks/stripe`
  - [ ] Récupérer `STRIPE_WEBHOOK_SECRET` (whsec\_...)

### Supabase (Déjà configuré ?)

- [ ] Vérifier que les variables sont dans `.env.local` :
  - [ ] `NEXT_PUBLIC_SUPABASE_URL`
  - [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY`
  - [ ] `SUPABASE_SERVICE_ROLE_KEY`
- [ ] Vérifier que le Storage est activé (pour templates)

### Resend / Email (Déjà configuré ?)

- [ ] Vérifier `RESEND_API_KEY`
- [ ] Configurer domaine d'envoi (optionnel pour prod)

### Base de données

- [ ] Vérifier `DATABASE_URL` (connexion Supabase PostgreSQL)
- [ ] Vérifier `DIRECT_URL` (pour Prisma migrations)
- [x] **MIGRATION MVP** : Exécuter le script SQL dans Supabase
  - Fichier : `supabase/migrations/20241228_mvp_b2b_saas_schema.sql`
  - Aller dans Supabase Dashboard → SQL Editor → Coller le contenu → Run

---

## 📄 CONTENU À CRÉER

### Questions par Norme (Prompt #3)

- [ ] ISO 9001 : ~30 questions (10 chapitres)
- [ ] GDP : ~25 questions
- [ ] ISO 27001 : ~30 questions
- [ ] HACCP : ~20 questions
- [ ] ISO 42001 : ~25 questions
- [ ] Sûreté Aéro : ~20 questions

### Actions par Norme (Prompt #4)

- [ ] ISO 9001 : 50-80 actions
- [ ] GDP : 40-60 actions
- [ ] ISO 27001 : 50-70 actions
- [ ] HACCP : 30-50 actions
- [ ] ISO 42001 : 40-60 actions
- [ ] Sûreté Aéro : 30-50 actions

### Templates par Norme (Prompt #5)

- [ ] ISO 9001 : 25-30 templates Word/Excel
- [ ] GDP : 20-25 templates
- [ ] ISO 27001 : 25-30 templates
- [ ] HACCP : 15-20 templates
- [ ] ISO 42001 : 20-25 templates
- [ ] Sûreté Aéro : 15-20 templates

**Option :** Je peux générer ce contenu avec Claude si tu me donnes le feu vert.

---

## 🌐 DÉPLOIEMENT

### Vercel

- [ ] Créer projet Vercel (ou utiliser existant)
- [ ] Configurer variables d'environnement en production
- [ ] Configurer domaine personnalisé

### Stripe Production (après MVP validé)

- [ ] Passer en mode Live
- [ ] Mettre à jour les clés API
- [ ] Reconfigurer Webhook avec URL prod

---

## ✅ CHECKLIST PRÉ-LANCEMENT

- [ ] Toutes les variables d'environnement configurées
- [ ] Stripe en mode test fonctionnel
- [ ] Au moins 1 norme complète (questions + actions + templates)
- [ ] Flow complet testé (signup → assessment → checkout → dashboard)
- [ ] Emails transactionnels fonctionnels

---

_Fichier créé le 28/12/2025 - À mettre à jour au fil de l'avancement_
