# 📋 VYXO CODEX - PROMPTS PLAN LANDING PAGE REFONTE

---

## 📊 Progression Globale

```
LANDING PAGE REFONTE : [████████████████████] 100% ✅ TERMINÉ
```

**Durée estimée totale:** 6 jours de développement  
**Basé sur:** Plan de refonte du 27/12/2025

---

## 🎯 PROMPT LP-01 : Hero Section Premium - ✅ TERMINÉ

**Objectif:** Créer la section hero avec hook dirigeant et dashboard mockup

**Fichiers à créer/modifier:**

- `app/(marketing)/landing/page.tsx` [NEW]
- `components/landing/hero-section.tsx` [NEW]
- `components/landing/dashboard-mockup.tsx` [NEW]

**Tâches:**

- [ ] Layout responsive mobile-first
- [ ] 3 variantes headline A/B testing
- [ ] Sous-headline avec proposition de valeur
- [ ] Dashboard mockup animé (jauges conformité)
- [ ] Scroll indicator vers différenciation
- [ ] Animations d'entrée (slide-in, fade)

**Durée estimée:** 0.5 jour

---

## 🎯 PROMPT LP-02 : Cartes Différenciation (Dirigeant vs Manager) - ✅ TERMINÉ

**Objectif:** Créer la section "Quel est votre rôle?" avec 2 cartes distinctes

**Fichiers à créer/modifier:**

- `components/landing/role-selector.tsx` [NEW]
- `components/landing/role-card.tsx` [NEW]

**Tâches:**

- [ ] Composant RoleCard réutilisable
- [ ] Carte Dirigeant (primaire, gold)
- [ ] Carte Manager (secondaire, outline)
- [ ] Copywriting complet (bénéfices)
- [ ] CTAs différenciés
- [ ] Hover effects et animations
- [ ] State management pour le choix

**Durée estimée:** 0.5 jour

---

## 🎯 PROMPT LP-03 : Formulaire Intelligent (Base) - ✅ TERMINÉ

**Objectif:** Implémenter le formulaire avec les 8 champs et validation

**Fichiers à créer/modifier:**

- `components/landing/evaluation-form.tsx` [NEW]
- `lib/schemas/evaluation-form.schema.ts` [NEW]
- `lib/hooks/use-evaluation-form.ts` [NEW]

**Tâches:**

- [ ] Setup React Hook Form + Zod
- [ ] Champ: Nom entreprise
- [ ] Champ: SIRET (format + masque)
- [ ] Champ: Fonction (dropdown)
- [ ] Champ: Taille entreprise (dropdown)
- [ ] Champ: Responsable qualité (radio)
- [ ] Champ: Email professionnel
- [ ] Champ: Téléphone (optionnel)
- [ ] Validation temps réel
- [ ] Messages d'erreur personnalisés
- [ ] Sauvegarde localStorage auto

**Durée estimée:** 1 jour

---

## 🎯 PROMPT LP-04 : Sélecteur de Normes Multi-Choix - ⏳ À FAIRE

**Objectif:** Créer le sélecteur interactif de normes/certifications

**Fichiers à créer/modifier:**

- `components/landing/norms-selector.tsx` [NEW]
- `components/landing/norm-card.tsx` [NEW]
- `lib/data/norms-catalog.ts` [NEW]

**Tâches:**

- [ ] Grid de cartes normes (checkboxes visuelles)
- [ ] 7 normes préconfigurées (GDP, ISO 9001, ISO 14001, ISO 45001, HACCP/IFS/BRC, EN 9100, Autre)
- [ ] Multi-sélection avec animations
- [ ] Compteur de normes sélectionnées
- [ ] Champ "Autre" avec input libre
- [ ] Style selected vs unselected
- [ ] Validation: minimum 1 norme

**Durée estimée:** 0.5 jour

---

## 🎯 PROMPT LP-05 : Validation SIRET (API INSEE/Pappers) - ⏳ À FAIRE

**Objectif:** Intégrer la validation automatique du SIRET via API

**Fichiers à créer/modifier:**

- `app/api/siret/validate/route.ts` [NEW]
- `lib/services/siret-service.ts` [NEW]
- `lib/hooks/use-siret-validation.ts` [NEW]

**Tâches:**

- [ ] Route API proxy pour SIRET
- [ ] Intégration API INSEE ou Pappers
- [ ] Validation format (14 chiffres)
- [ ] Vérification existence entreprise
- [ ] Récupération nom entreprise auto
- [ ] Gestion erreurs (SIRET invalide, non trouvé)
- [ ] Indicateur de chargement
- [ ] Badge "✅ Entreprise identifiée"

**Durée estimée:** 0.5 jour

---

## 🎯 PROMPT LP-06 : Système de Scoring Lead (100 pts) - ✅ TERMINÉ

**Objectif:** Implémenter le calcul automatique du score et tags CRM

**Fichiers à créer/modifier:**

- `lib/services/lead-scoring.ts` [NEW]
- `lib/types/lead.types.ts` [NEW]

**Tâches:**

- [ ] Fonction calculateLeadScore()
- [ ] Barème par critère (rôle, taille, resp. qualité, normes, SIRET)
- [ ] Génération automatique des tags CRM
- [ ] Détermination niveau (HOT/Qualified/Nurture/Early)
- [ ] Fonction calculateMaturityLevel()
- [ ] Calcul insights personnalisés
- [ ] Export structure JSON pour CRM

**Durée estimée:** 0.5 jour

---

## 🎯 PROMPT LP-07 : Questions Maturité Bonus (Optionnel) - ⏳ À FAIRE

**Objectif:** Ajouter les 3 questions bonus pour affiner le scoring

**Fichiers à créer/modifier:**

- `components/landing/maturity-questions.tsx` [NEW]

**Tâches:**

- [ ] Question: Audit certification passé?
- [ ] Question: Procédures documentées?
- [ ] Question: Dernier audit interne?
- [ ] Bouton "Passer cette étape"
- [ ] Ajout des points au score
- [ ] Tags supplémentaires générés
- [ ] Animation de transition

**Durée estimée:** 0.25 jour

---

## 🎯 PROMPT LP-08 : Aperçu Modules Dynamique - ⏳ À FAIRE

**Objectif:** Afficher les modules preview selon les normes sélectionnées

**Fichiers à créer/modifier:**

- `components/landing/modules-preview.tsx` [NEW]
- `components/landing/module-preview-card.tsx` [NEW]
- `lib/data/modules-by-norm.ts` [NEW]

**Tâches:**

- [ ] Mapping normes → modules
- [ ] 3 modules preview (gratuits) par norme
- [ ] Modules verrouillés (🔒)
- [ ] Animations d'apparition staggered
- [ ] Compteur "X modules correspondants"
- [ ] Message frustration: "15 autres modules après validation"
- [ ] Responsive grid

**Durée estimée:** 0.5 jour

---

## 🎯 PROMPT LP-09 : Messages Personnalisés Post-Form - ⏳ À FAIRE

**Objectif:** Afficher des insights contextuels selon le profil détecté

**Fichiers à créer/modifier:**

- `components/landing/profile-insights.tsx` [NEW]
- `lib/services/insights-generator.ts` [NEW]

**Tâches:**

- [ ] Message "Pas de resp. qualité + PME"
- [ ] Message "Resp. qualité externalisé + Grande entreprise"
- [ ] Message "Multi-normes + Dirigeant"
- [ ] Message "TPE + 1 norme (Démarrage)"
- [ ] Logique conditionnelle d'affichage
- [ ] Animations alert boxes
- [ ] Copywriting finalisé

**Durée estimée:** 0.25 jour

---

## 🎯 PROMPT LP-10 : Section CTA Final & Frustration - ⏳ À FAIRE

**Objectif:** Créer la section finale avec message de frustration et CTA

**Fichiers à créer/modifier:**

- `components/landing/cta-final.tsx` [NEW]

**Tâches:**

- [ ] Message "🔒 Accès complet réservé"
- [ ] "Rapport sous 48h"
- [ ] Bouton CTA "Finaliser mon évaluation"
- [ ] Animation pulse-glow sur CTA
- [ ] Tracking click CTA

**Durée estimée:** 0.25 jour

---

## 🎯 PROMPT LP-11 : Page Confirmation Dirigeant - ⏳ À FAIRE

**Objectif:** Créer la page de confirmation pour les dirigeants

**Fichiers à créer/modifier:**

- `app/(marketing)/landing/confirmation/page.tsx` [NEW]
- `components/landing/confirmation-dirigeant.tsx` [NEW]

**Tâches:**

- [ ] Message "✅ Demande enregistrée"
- [ ] Liste actions expert (24h)
- [ ] Récapitulatif email/téléphone
- [ ] CTA "Découvrir la plateforme"
- [ ] Animation confetti ou success
- [ ] Tracking page view

**Durée estimée:** 0.25 jour

---

## 🎯 PROMPT LP-12 : Page Confirmation Manager + Lien Partageable - ⏳ À FAIRE

**Objectif:** Créer la page de confirmation manager avec lien de partage

**Fichiers à créer/modifier:**

- `components/landing/confirmation-manager.tsx` [NEW]
- `lib/services/share-link-generator.ts` [NEW]
- `app/api/validate/[token]/route.ts` [NEW]

**Tâches:**

- [ ] Message "📝 Demande enregistrée"
- [ ] Génération lien unique partageable
- [ ] Bouton "Copier le lien"
- [ ] Explication "Pourquoi validation direction?"
- [ ] Page de validation pour dirigeant (lien)
- [ ] Tracking copy link

**Durée estimée:** 0.5 jour

---

## 🎯 PROMPT LP-13 : Intégration CRM (Webhook + Tags) - ⏳ À FAIRE

**Objectif:** Envoyer les leads qualifiés au CRM avec tous les tags

**Fichiers à créer/modifier:**

- `app/api/leads/create/route.ts` [NEW]
- `lib/services/crm-integration.ts` [NEW]

**Tâches:**

- [ ] Route API création lead
- [ ] Webhook vers HubSpot/Pipedrive
- [ ] Envoi score + niveau + priority
- [ ] Envoi tous les tags
- [ ] Envoi insights générés
- [ ] Gestion erreurs webhook
- [ ] Retry logic

**Durée estimée:** 0.5 jour

---

## 🎯 PROMPT LP-14 : Emails Transactionnels - ⏳ À FAIRE

**Objectif:** Envoyer les emails de confirmation adaptés au profil

**Fichiers à créer/modifier:**

- `lib/emails/confirmation-dirigeant.tsx` [NEW]
- `lib/emails/confirmation-manager.tsx` [NEW]
- `app/api/emails/send-confirmation/route.ts` [NEW]

**Tâches:**

- [ ] Template email Dirigeant
- [ ] Template email Manager (avec lien)
- [ ] Intégration Resend
- [ ] Personnalisation (nom, entreprise, normes)
- [ ] Récapitulatif formulaire
- [ ] Design responsive

**Durée estimée:** 0.5 jour

---

## 🎯 PROMPT LP-15 : Analytics & Event Tracking - ⏳ À FAIRE

**Objectif:** Implémenter le tracking complet du funnel landing

**Fichiers à créer/modifier:**

- Mise à jour `lib/analytics-tracker.ts`

**Tâches:**

- [ ] Event: landing_hero_viewed
- [ ] Event: role_selected (dirigeant/manager)
- [ ] Event: form_started
- [ ] Event: form_field_completed
- [ ] Event: certifications_selected
- [ ] Event: maturity_questions_answered
- [ ] Event: modules_preview_viewed
- [ ] Event: form_submitted
- [ ] Event: confirmation_page_viewed
- [ ] Event: share_link_copied

**Durée estimée:** 0.25 jour

---

## 🎯 PROMPT LP-16 : Polish & Responsive Final - ⏳ À FAIRE

**Objectif:** Finitions visuelles et tests responsive

**Fichiers à créer/modifier:**

- Tous les composants landing

**Tâches:**

- [ ] Test mobile (375px, 414px)
- [ ] Test tablet (768px, 1024px)
- [ ] Animations micro-interactions
- [ ] Transitions fluides
- [ ] Dark mode support
- [ ] Lighthouse audit (perf > 90)
- [ ] Accessibilité (a11y)
- [ ] Tests A/B headlines actifs

**Durée estimée:** 0.5 jour

---

## 📊 Résumé Estimation

| Prompt                       | Durée | Dépendances  |
| ---------------------------- | ----- | ------------ |
| LP-01 Hero                   | 0.5j  | -            |
| LP-02 Cartes Rôle            | 0.5j  | LP-01        |
| LP-03 Formulaire Base        | 1j    | LP-02        |
| LP-04 Sélecteur Normes       | 0.5j  | LP-03        |
| LP-05 Validation SIRET       | 0.5j  | LP-03        |
| LP-06 Scoring Lead           | 0.5j  | LP-03, LP-04 |
| LP-07 Questions Maturité     | 0.25j | LP-06        |
| LP-08 Aperçu Modules         | 0.5j  | LP-04        |
| LP-09 Messages Personnalisés | 0.25j | LP-06        |
| LP-10 CTA Final              | 0.25j | LP-08, LP-09 |
| LP-11 Confirmation Dirigeant | 0.25j | LP-10        |
| LP-12 Confirmation Manager   | 0.5j  | LP-10        |
| LP-13 Intégration CRM        | 0.5j  | LP-06        |
| LP-14 Emails Transactionnels | 0.5j  | LP-11, LP-12 |
| LP-15 Analytics Tracking     | 0.25j | Tous         |
| LP-16 Polish Final           | 0.5j  | Tous         |

**TOTAL:** ~7 jours de développement

---

## 🔄 Ordre d'Exécution Recommandé

```
Jour 1: LP-01 + LP-02 (Structure de base)
Jour 2: LP-03 (Formulaire complet)
Jour 3: LP-04 + LP-05 (Normes + SIRET)
Jour 4: LP-06 + LP-07 + LP-09 (Scoring + Maturité)
Jour 5: LP-08 + LP-10 (Modules + CTA)
Jour 6: LP-11 + LP-12 + LP-14 (Confirmations + Emails)
Jour 7: LP-13 + LP-15 + LP-16 (CRM + Analytics + Polish)
```

---

_Généré le 27/12/2025 - VYXO Codex Landing Page Prompts Plan_
