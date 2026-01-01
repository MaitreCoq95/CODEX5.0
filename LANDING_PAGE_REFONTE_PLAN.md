# 🚀 VYXO CODEX - PLAN DE REFONTE LANDING PAGE

> **Date**: 27 Décembre 2025  
> **Basé sur**: Debrief stratégique du 16/12/2025  
> **Statut**: Plan actionnable prêt pour implémentation

---

## 📐 1. ARCHITECTURE DE LA PAGE

### Sitemap

```
/
├── HERO (Problème + Hook dirigeant)
├── DIFFÉRENCIATION (2 cartes: Dirigeant vs Manager)
├── FORMULAIRE INTELLIGENT (Adaptatif selon profil)
├── APERÇU MODULES (Preview dynamique selon normes)
├── FRUSTRATION & CTA FINAL
└── /confirmation
    ├── Version Dirigeant (accès complet)
    └── Version Manager (lien de partage)
```

### Flow User (Diagramme)

```
┌─────────────────────────────────────────────────────────────────┐
│                         LANDING PAGE                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  HERO: "Vos équipes sont-elles conformes?"                      │
│  └── Scroll naturel (pas de CTA agressif)                       │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  DIFFÉRENCIATION: "Quel est votre rôle?"                        │
│  ┌──────────────────┐    ┌──────────────────┐                   │
│  │   DIRIGEANT      │    │    MANAGER       │                   │
│  │  "Je pilote"     │    │  "Je gère"       │                   │
│  └────────┬─────────┘    └────────┬─────────┘                   │
└───────────┼───────────────────────┼─────────────────────────────┘
            │                       │
            └───────────┬───────────┘
                        ▼
┌─────────────────────────────────────────────────────────────────┐
│  FORMULAIRE UNIFIÉ (adaptatif)                                  │
│  - Entreprise, SIRET, Fonction, Taille                          │
│  - Resp. Qualité présent?                                       │
│  - Sélection normes (checkboxes)                                │
│  - Email, Téléphone                                             │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────────┐
│  APERÇU MODULES DYNAMIQUE                                       │
│  - Preview 3-5 modules selon normes sélectionnées               │
│  - "15 autres modules après validation"                         │
└─────────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌───────────────────────────────────────────────────────────────┐
│  FRUSTRATION & CTA FINAL                                       │
│  🔒 "Accès complet réservé aux comptes validés"                │
│  [Finaliser mon évaluation]                                    │
└───────────────────────────────────────────────────────────────┘
                              │
            ┌─────────────────┴─────────────────┐
            ▼                                   ▼
┌───────────────────────┐         ┌───────────────────────┐
│  CONFIRMATION         │         │  CONFIRMATION         │
│  (Dirigeant)          │         │  (Manager)            │
│  → Contact 24h        │         │  → Lien partage       │
│  → Accès complet      │         │  → Message direction  │
└───────────────────────┘         └───────────────────────┘
```

---

## 📝 2. SECTION PAR SECTION

### SECTION 1: HERO - LE PROBLÈME

**Structure HTML sémantique:**

```html
<section id="hero">
  <div class="hero-content">
    <span class="badge">Pilotage Conformité</span>
    <h1><!-- Headline --></h1>
    <p class="subtitle"><!-- Sous-headline --></p>
    <div class="hero-visual"><!-- Dashboard mockup --></div>
  </div>
</section>
```

**HEADLINE - 3 VARIANTES A/B TESTING:**

| Variante | Headline                                                                               | Angle        |
| -------- | -------------------------------------------------------------------------------------- | ------------ |
| **A**    | Vos équipes sont-elles **vraiment prêtes** pour votre prochain audit?                  | Risque/Doute |
| **B**    | **67% des PME** échouent leur premier audit GDP. Saurez-vous prouver votre conformité? | Statistique  |
| **C**    | Prouvez le niveau réel de vos équipes **avant que l'auditeur ne le fasse**             | Urgence      |

**SOUS-HEADLINE:**

> La conformité ne se devine pas. Elle se mesure, se forme, et se prouve.  
> Vyxo Codex vous donne les outils pour le faire.

**VISUEL:**

- Dashboard avec jauges de conformité (rouge/orange/vert)
- Indicateurs par équipe
- Badge "Dernière évaluation: il y a 3 jours"
- Style: glassmorphism, thème Vyxo Navy/Gold

**PAS DE CTA ICI** → Le scroll naturel fait découvrir la différenciation

---

### SECTION 2: DIFFÉRENCIATION

**Structure HTML:**

```html
<section id="differentiation">
  <h2>Quel est votre rôle dans cette démarche?</h2>
  <div class="role-cards">
    <article class="role-card role-card--dirigeant">...</article>
    <article class="role-card role-card--manager">...</article>
  </div>
</section>
```

#### CARTE DIRIGEANT (Primary)

```
┌────────────────────────────────────────────┐
│  👔                                         │
│                                             │
│  JE PILOTE L'ORGANISATION                   │
│                                             │
│  Dirigeant, DG, Directeur Opérations        │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  ✓ Visibilité complète sur vos équipes      │
│  ✓ Preuves auditables en temps réel         │
│  ✓ Identification des risques critiques     │
│  ✓ Certification facilitée                  │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │   ÉVALUER MON ORGANISATION   →      │    │
│  └─────────────────────────────────────┘    │
│           (Bouton primaire gold)            │
└────────────────────────────────────────────┘
```

**Copywriting complet:**

**Titre:** Je pilote l'organisation  
**Sous-titre:** Dirigeant, DG, Directeur Opérations

**Bénéfices:**

- ✓ **Visibilité complète** sur le niveau réel de chaque équipe
- ✓ **Preuves auditables** générées automatiquement
- ✓ **Risques critiques** identifiés avant l'audit
- ✓ **Certification facilitée** grâce au suivi continu

**CTA:** `ÉVALUER MON ORGANISATION →`  
**Style:** Bouton plein, couleur gold (#C69C6D), large

---

#### CARTE MANAGER (Secondary)

```
┌────────────────────────────────────────────┐
│  📋                                         │
│                                             │
│  JE GÈRE LA CONFORMITÉ AU QUOTIDIEN         │
│                                             │
│  Responsable Qualité, HSE, Conformité       │
│                                             │
│  ─────────────────────────────────────────  │
│                                             │
│  ✓ Outils terrain prêts à l'emploi          │
│  ✓ Gain de temps sur les audits internes    │
│  ✓ Suivi simplifié des formations           │
│  ✓ Rapports automatisés                     │
│                                             │
│  ┌─────────────────────────────────────┐    │
│  │   TESTER UN PRÉ-DIAGNOSTIC          │    │
│  └─────────────────────────────────────┘    │
│           (Bouton outline navy)             │
└────────────────────────────────────────────┘
```

**Copywriting complet:**

**Titre:** Je gère la conformité au quotidien  
**Sous-titre:** Responsable Qualité, HSE, Conformité

**Bénéfices:**

- ✓ **Outils terrain** prêts à l'emploi
- ✓ **Gain de temps** sur vos audits internes
- ✓ **Suivi simplifié** des formations équipes
- ✓ **Rapports automatisés** pour votre direction

**CTA:** `TESTER UN PRÉ-DIAGNOSTIC`  
**Style:** Bouton outline, couleur navy (#0F2339)

---

### SECTION 3: FORMULAIRE INTELLIGENT

**Structure HTML:**

```html
<section id="form-section">
  <h2>Commençons par quelques informations</h2>
  <p class="form-subtitle">
    2 minutes pour débloquer votre évaluation personnalisée
  </p>
  <form id="evaluation-form">
    <!-- Champs -->
  </form>
</section>
```

#### CHAMPS DU FORMULAIRE

| #   | Champ                 | Type       | Label                        | Placeholder/Options         | Obligatoire | Validation         |
| --- | --------------------- | ---------- | ---------------------------- | --------------------------- | ----------- | ------------------ |
| 1   | `company_name`        | text       | Nom de l'entreprise          | "Ex: Transport Express SAS" | ✅          | min 2 chars        |
| 2   | `siret`               | text       | Numéro SIRET                 | "123 456 789 00012"         | ✅\*        | Format SIRET + API |
| 3   | `function`            | select     | Votre fonction               | Dropdown (voir ci-dessous)  | ✅          | -                  |
| 4   | `company_size`        | select     | Taille de l'entreprise       | Dropdown (voir ci-dessous)  | ✅          | -                  |
| 5   | `has_quality_manager` | radio      | Responsable qualité dédié?   | Oui / Non / Externalisé     | ✅          | -                  |
| 6   | `certifications`      | checkbox[] | Normes/Certifications visées | Multi-select (voir tableau) | ✅          | min 1              |
| 7   | `email`               | email      | Email professionnel          | "vous@entreprise.fr"        | ✅          | Format email       |
| 8   | `phone`               | tel        | Téléphone                    | "+33 6 XX XX XX XX"         | ❌          | Format FR          |

**\*** Si SIRET absent → tag CRM "manager_no_siret"

---

#### OPTIONS DROPDOWNS

**Fonction (`function`):**

```
- Dirigeant / DG / CEO
- Directeur des Opérations
- Responsable Qualité / QHSE
- Responsable Logistique / Transport
- Responsable Formation
- Autre (préciser)
```

**Taille entreprise (`company_size`):**

```
- Moins de 10 salariés
- 10 à 50 salariés
- 51 à 200 salariés
- 201 à 500 salariés
- Plus de 500 salariés
```

**Responsable Qualité (`has_quality_manager`):**

```
○ Oui, en interne
○ Non, personne dédié
○ Externalisé (prestataire)
```

---

#### SÉLECTEUR DE NORMES

```
┌─────────────────────────────────────────────────────────────────┐
│  Quelles certifications ou normes vous concernent?              │
│  (Sélectionnez toutes celles qui s'appliquent)                  │
│                                                                  │
│  ┌─────────────────────────┐  ┌─────────────────────────┐       │
│  │ ☐ GDP                   │  │ ☐ ISO 9001              │       │
│  │   Bonnes Pratiques      │  │   Management Qualité    │       │
│  │   Distribution Pharma   │  │                         │       │
│  └─────────────────────────┘  └─────────────────────────┘       │
│                                                                  │
│  ┌─────────────────────────┐  ┌─────────────────────────┐       │
│  │ ☐ ISO 14001             │  │ ☐ ISO 45001             │       │
│  │   Environnement         │  │   Santé & Sécurité      │       │
│  └─────────────────────────┘  └─────────────────────────┘       │
│                                                                  │
│  ┌─────────────────────────┐  ┌─────────────────────────┐       │
│  │ ☐ HACCP / IFS / BRC     │  │ ☐ EN 9100               │       │
│  │   Agroalimentaire       │  │   Aéronautique          │       │
│  └─────────────────────────┘  └─────────────────────────┘       │
│                                                                  │
│  ┌──────────────────────────────────────────────────────┐       │
│  │ ☐ Autre: ___________________________________________ │       │
│  └──────────────────────────────────────────────────────┘       │
└─────────────────────────────────────────────────────────────────┘
```

---

#### MESSAGES DE VALIDATION

| Champ  | Succès                     | Erreur                               |
| ------ | -------------------------- | ------------------------------------ |
| SIRET  | ✅ "Entreprise identifiée" | ❌ "SIRET invalide ou introuvable"   |
| Email  | ✅ "Email valide"          | ❌ "Format email incorrect"          |
| Normes | -                          | ❌ "Sélectionnez au moins une norme" |

---

#### LOGIQUE CONDITIONNELLE

```javascript
// Tags CRM automatiques selon réponses

if (function === "Dirigeant" && siret.isValid) {
  tags.push("decision_maker", "full_access");
  accessLevel = "COMPLET";
}

if (function.includes("Responsable") || !siret.isValid) {
  tags.push("prescriber", "limited_access");
  accessLevel = "LIMITÉ";
  showMessage("Pour accès complet, faites valider par votre direction");
}

if (has_quality_manager === "Non") {
  tags.push("opportunity_externalisation");
}

if (has_quality_manager === "Externalisé") {
  tags.push("hot_lead_externalisation", "priority_high");
}

if (company_size === "Plus de 500 salariés") {
  tags.push("enterprise_lead");
}
```

---

### SECTION 4: APERÇU MODULES DYNAMIQUE

**Déclenchement:** Après sélection d'au moins 1 norme

**Structure:**

```html
<section id="modules-preview">
  <h2>
    Voici ce que nous allons évaluer pour <span class="norm-name">GDP</span>
  </h2>
  <div class="modules-grid">
    <!-- Modules cards -->
  </div>
  <p class="modules-more">🔒 15 autres modules disponibles après validation</p>
</section>
```

---

## 📊 3. MATRICE DE MODULES PAR NORME

### GDP (Good Distribution Practice) - Pharma

| #   | Module Preview (Gratuit)      | Description                                       | Modules Complets (Payant)   |
| --- | ----------------------------- | ------------------------------------------------- | --------------------------- |
| 1   | ✅ Qualification Fournisseurs | Évaluation des critères de sélection fournisseurs | Audit complet fournisseurs  |
| 2   | ✅ Chaîne du Froid            | Maîtrise températures transport & stockage        | Monitoring IoT intégré      |
| 3   | ✅ Gestion Non-Conformités    | Processus de traitement des écarts                | CAPA management             |
| 4   | 🔒 Procédures Stockage        | -                                                 | Cartographie zones + flux   |
| 5   | 🔒 Formation Personnel        | -                                                 | E-learning + certifications |
| 6   | 🔒 Traçabilité Lots           | -                                                 | Tracking temps réel         |
| 7   | 🔒 Transport & Distribution   | -                                                 | Qualification véhicules     |
| 8   | 🔒 Retours & Rappels          | -                                                 | Gestion de crise            |

### ISO 9001 (Management de la Qualité)

| #   | Module Preview (Gratuit)   | Description                               | Modules Complets (Payant) |
| --- | -------------------------- | ----------------------------------------- | ------------------------- |
| 1   | ✅ Contexte Organisme      | Analyse parties prenantes et enjeux       | Matrice SWOT avancée      |
| 2   | ✅ Leadership              | Engagement direction et politique qualité | Revues de direction       |
| 3   | ✅ Planification SMQ       | Objectifs qualité et risques              | Tableau de bord KPIs      |
| 4   | 🔒 Support & Ressources    | -                                         | Gestion compétences       |
| 5   | 🔒 Maîtrise Opérationnelle | -                                         | Processus mapping         |
| 6   | 🔒 Évaluation Performance  | -                                         | Audits internes           |
| 7   | 🔒 Amélioration Continue   | -                                         | Actions correctives       |

### ISO 45001 (Santé & Sécurité au Travail)

| #   | Module Preview (Gratuit)     | Description                  | Modules Complets (Payant) |
| --- | ---------------------------- | ---------------------------- | ------------------------- |
| 1   | ✅ Identification Dangers    | Cartographie des risques SST | Évaluation exhaustive     |
| 2   | ✅ Consultation Travailleurs | Participation et engagement  | Comités SST               |
| 3   | ✅ Préparation Urgences      | Plans d'intervention         | Exercices & simulations   |
| 4   | 🔒 Maîtrise Opérationnelle   | -                            | Procédures terrain        |
| 5   | 🔒 Gestion Changements       | -                            | Impact assessment         |
| 6   | 🔒 Incidents & Enquêtes      | -                            | Root cause analysis       |
| 7   | 🔒 Surveillance Santé        | -                            | Suivi médical             |

---

### Affichage Preview Module

```
┌─────────────────────────────────────────────────────────────────┐
│  📦 Qualification Fournisseurs                                   │
│  ─────────────────────────────────────────────────────────────  │
│  Évaluation des critères de sélection et suivi fournisseurs     │
│                                                                  │
│  ┌──────────────────────────────────────────┐                   │
│  │  ✅ Inclus dans l'évaluation gratuite    │                   │
│  └──────────────────────────────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│  🔒 Formation Personnel                                          │
│  ─────────────────────────────────────────────────────────────  │
│  E-learning et certifications des équipes terrain               │
│                                                                  │
│  ┌──────────────────────────────────────────┐                   │
│  │  🔒 Disponible après validation          │                   │
│  └──────────────────────────────────────────┘                   │
└─────────────────────────────────────────────────────────────────┘
```

---

### SECTION 5: FRUSTRATION & CTA FINAL

**Structure:**

```html
<section id="cta-final">
  <div class="frustration-message">
    <span class="lock-icon">🔒</span>
    <h3>Accès complet réservé aux comptes validés</h3>
    <p>Votre rapport préliminaire sera disponible sous 48h</p>
  </div>
  <button class="cta-primary">Finaliser mon évaluation →</button>
</section>
```

**Copywriting:**

> 🔒 **Accès complet réservé aux comptes validés**
>
> Vous avez vu un aperçu de ce que Vyxo Codex peut évaluer.  
> Pour recevoir votre rapport complet avec les écarts identifiés et le plan d'action recommandé, finalisez votre demande.
>
> 📊 **Votre rapport préliminaire sera disponible sous 48h**

**CTA:** `FINALISER MON ÉVALUATION →`

---

## 💬 4. COPYWRITING DIFFÉRENCIÉ

### Version Dirigeant

**Page confirmation:**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│  ✅ Demande enregistrée                                          │
│                                                                  │
│  ═══════════════════════════════════════════════════════════    │
│                                                                  │
│  Votre évaluation est en cours de préparation.                   │
│                                                                  │
│  Un expert conformité vous contactera sous 24h pour:             │
│                                                                  │
│  • Finaliser le périmètre d'évaluation                           │
│  • Calibrer les modules selon votre contexte                     │
│  • Planifier l'accès aux équipes                                 │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  📧 Vérifiez votre boîte mail pour le récapitulatif              │
│  📞 Nous vous appellerons au [numéro fourni]                     │
│                                                                  │
│  ┌─────────────────────────────────────────────────────────┐    │
│  │         DÉCOUVRIR LA PLATEFORME EN ATTENDANT            │    │
│  └─────────────────────────────────────────────────────────┘    │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

### Version Manager

**Page confirmation:**

```
┌─────────────────────────────────────────────────────────────────┐
│                                                                  │
│  📝 Demande enregistrée                                          │
│                                                                  │
│  ═══════════════════════════════════════════════════════════    │
│                                                                  │
│  Votre pré-diagnostic est en cours de préparation.               │
│                                                                  │
│  Pour débloquer l'évaluation complète de votre organisation,     │
│  partagez ce lien avec votre direction:                          │
│                                                                  │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │  🔗 https://codex.vyxo.fr/validate/abc123xyz             │   │
│  │                                      [Copier le lien]    │   │
│  └──────────────────────────────────────────────────────────┘   │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  💡 Pourquoi la validation direction?                            │
│                                                                  │
│  L'évaluation complète nécessite l'accès aux données             │
│  organisationnelles (organigramme, processus, documentation).    │
│  Seul un décisionnaire peut autoriser cet accès.                 │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  📧 Email de récapitulatif envoyé                                │
│  📊 Aperçu limité disponible sous 48h                            │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

### Messages de Frustration Intelligente

| Contexte                | Message                                                                                   |
| ----------------------- | ----------------------------------------------------------------------------------------- |
| Après sélection normes  | "Vous avez sélectionné 3 normes. Nous avons 47 modules d'évaluation correspondants."      |
| Sur modules verrouillés | "🔒 Ce module est disponible dans l'évaluation complète"                                  |
| Si manager sans SIRET   | "Pour une évaluation complète, la validation par votre direction est requise"             |
| Après soumission        | "Votre aperçu préliminaire sera prêt sous 48h. L'accès complet nécessite une validation." |

---

## 🎯 5. SYSTÈME DE QUALIFICATION INTELLIGENTE

### 5.1 Matrice de Scoring Lead (100 points max)

Le score est calculé automatiquement à partir des réponses du formulaire pour qualifier chaque lead.

#### Barème de Points par Critère

| Critère                               | Réponse                      | Points | Tag CRM Automatique                        |
| ------------------------------------- | ---------------------------- | ------ | ------------------------------------------ |
| **RÔLE (max 25 pts)**                 |                              |        |                                            |
|                                       | Dirigeant / DG / CEO         | +25    | `decision_maker`                           |
|                                       | Directeur des Opérations     | +20    | `decision_influencer`                      |
|                                       | Responsable Qualité / QHSE   | +10    | `prescriber`                               |
|                                       | Responsable Logistique       | +8     | `prescriber`                               |
|                                       | Autre                        | +5     | `other_role`                               |
| **TAILLE ENTREPRISE (max 20 pts)**    |                              |        |                                            |
|                                       | Plus de 500 salariés         | +20    | `enterprise`                               |
|                                       | 201 à 500 salariés           | +15    | `mid_market`                               |
|                                       | 51 à 200 salariés            | +10    | `smb_large`                                |
|                                       | 10 à 50 salariés             | +5     | `smb`                                      |
|                                       | Moins de 10 salariés         | +2     | `tpe`                                      |
| **RESPONSABLE QUALITÉ (max 25 pts)**  |                              |        |                                            |
|                                       | ❌ Non, personne dédié       | +25 ⚠️ | `no_quality_mgr`, `opportunity_external`   |
|                                       | 🔄 Externalisé (prestataire) | +15    | `externalized_quality`, `upsell_potential` |
|                                       | ✅ Oui, en interne           | +5     | `has_quality_mgr`                          |
| **NORMES SÉLECTIONNÉES (max 20 pts)** |                              |        |                                            |
|                                       | 4+ normes                    | +20    | `multi_norm`, `complex_needs`              |
|                                       | 2-3 normes                   | +10    | `standard_scope`                           |
|                                       | 1 norme                      | +5     | `single_focus`                             |
| **SIRET (max 10 pts)**                |                              |        |                                            |
|                                       | Fourni et valide             | +10    | `verified_company`                         |
|                                       | Non fourni                   | +0     | `unverified`, `manager_likely`             |

---

### 5.2 Niveaux de Qualification Lead

| Score Total | Niveau             | Badge                  | Priorité Sales   | Délai Contact |
| ----------- | ------------------ | ---------------------- | ---------------- | ------------- |
| **80-100**  | 🔴 **HOT LEAD**    | "Prospect Prioritaire" | Contact immédiat | < 4h          |
| **60-79**   | � **Qualified**    | "Prospect Qualifié"    | Contact rapide   | < 24h         |
| **40-59**   | 🟡 **Nurture**     | "Prospect à Nurturer"  | Séquence email   | < 48h         |
| **0-39**    | ⚪ **Early Stage** | "Prospect Early Stage" | Marketing auto   | Séquence 7j   |

---

### 5.3 Niveaux de Maturité Organisationnelle

En plus du score de qualification, on évalue la **maturité conformité** de l'organisation :

#### Indicateurs de Maturité

| Signal                            | Interprétation                         | Score Maturité      |
| --------------------------------- | -------------------------------------- | ------------------- |
| Pas de resp. qualité + PME 50-200 | Risque élevé de non-conformité         | 🔴 Faible           |
| Resp. qualité externalisé         | Structure en transition                | 🟡 En développement |
| Multi-normes (3+) + Dirigeant     | Organisation mature, besoins complexes | 🟢 Avancée          |
| 1 norme + TPE (<10)               | Débutant, besoin d'accompagnement      | 🔴 Faible           |
| Enterprise (500+) + 2+ normes     | Gros compte, enjeux stratégiques       | 🟢 Avancée          |

#### Calcul Automatique

```javascript
function calculateMaturityLevel(formData) {
  let maturityScore = 50; // Base

  // Facteurs positifs
  if (formData.has_quality_manager === "Oui") maturityScore += 20;
  if (formData.certifications.length >= 3) maturityScore += 15;
  if (formData.company_size >= "51-200") maturityScore += 10;
  if (formData.function.includes("Dirigeant")) maturityScore += 5;

  // Facteurs négatifs
  if (formData.has_quality_manager === "Non") maturityScore -= 25;
  if (formData.company_size === "Moins de 10") maturityScore -= 15;
  if (formData.certifications.length === 1) maturityScore -= 10;

  // Clamping
  return Math.max(0, Math.min(100, maturityScore));
}
```

---

### 5.4 Messages Personnalisés Post-Formulaire

#### Messages selon Profil

**🔴 Pas de Responsable Qualité + PME (50-200):**

```
┌─────────────────────────────────────────────────────────────────┐
│  ⚠️ POINT D'ATTENTION IDENTIFIÉ                                  │
│                                                                  │
│  Sans responsable qualité dédié, vous êtes exposé à des         │
│  risques de non-conformité silencieux.                          │
│                                                                  │
│  📊 93% des PME sans ressource qualité dédiée échouent          │
│  leur premier audit de certification.                           │
│                                                                  │
│  → Un expert vous contactera pour évaluer vos options           │
│    d'accompagnement externalisé.                                │
└─────────────────────────────────────────────────────────────────┘
```

**🟠 Responsable Qualité Externalisé + Taille > 200:**

```
┌─────────────────────────────────────────────────────────────────┐
│  📊 CONFIGURATION ATYPIQUE DÉTECTÉE                              │
│                                                                  │
│  Les organisations de votre taille internalisent généralement   │
│  la fonction qualité. Cela peut révéler:                        │
│                                                                  │
│  • Une croissance récente non accompagnée                       │
│  • Un besoin de structuration documentaire                      │
│  • Des opportunités d'optimisation des coûts                    │
│                                                                  │
│  → Un audit de structure peut révéler des optimisations         │
│    significatives.                                              │
└─────────────────────────────────────────────────────────────────┘
```

**🟢 Multi-Normes (3+) + Dirigeant:**

```
┌─────────────────────────────────────────────────────────────────┐
│  🏆 PROFIL MULTI-CONFORMITÉ DÉTECTÉ                              │
│                                                                  │
│  Gérer plusieurs référentiels simultanément nécessite une       │
│  vue consolidée pour éviter les redondances.                    │
│                                                                  │
│  Votre tableau de bord personnalisé regroupera vos 3 normes:    │
│  ✓ GDP - Bonnes Pratiques Distribution                          │
│  ✓ ISO 9001 - Management Qualité                                │
│  ✓ ISO 45001 - Santé & Sécurité                                 │
│                                                                  │
│  → Accès prioritaire au module "Pilotage Multi-Référentiels"    │
└─────────────────────────────────────────────────────────────────┘
```

**🔵 TPE (<10) + 1 Norme:**

```
┌─────────────────────────────────────────────────────────────────┐
│  🚀 DÉMARRAGE CONFORMITÉ                                         │
│                                                                  │
│  Vous êtes au début de votre parcours de certification.         │
│  C'est le moment idéal pour poser les bonnes bases.             │
│                                                                  │
│  Pour les petites structures, nous recommandons:                 │
│  1. Commencer par l'évaluation de maturité                      │
│  2. Identifier les 5 priorités critiques                        │
│  3. Construire progressivement votre documentation              │
│                                                                  │
│  → Parcours "First Certification" adapté à votre taille         │
└─────────────────────────────────────────────────────────────────┘
```

---

### 5.5 Questions de Maturité Rapide (Optionnel)

Après la sélection des normes, afficher 3 questions bonus pour affiner le score de maturité:

```
┌─────────────────────────────────────────────────────────────────┐
│  📋 Affinez votre profil (optionnel - 30 secondes)               │
│                                                                  │
│  ─────────────────────────────────────────────────────────────  │
│                                                                  │
│  1. Avez-vous déjà passé un audit de certification?              │
│     ○ Oui, avec succès (+10 pts, tag: audit_success)            │
│     ○ Oui, avec réserves (+5 pts, tag: audit_reserves)          │
│     ○ Non, jamais (0 pts, tag: first_audit)                     │
│     ○ En préparation (+8 pts, tag: audit_prep)                  │
│                                                                  │
│  2. Vos procédures sont-elles documentées?                       │
│     ○ Totalement (+10 pts, tag: docs_complete)                  │
│     ○ Partiellement (+5 pts, tag: docs_partial)                 │
│     ○ Peu (-5 pts, tag: docs_minimal)                           │
│     ○ Non (-10 pts, tag: docs_none)                             │
│                                                                  │
│  3. À quand remonte votre dernier audit interne?                 │
│     ○ Moins de 6 mois (+5 pts, tag: audit_recent)               │
│     ○ 6 à 12 mois (0 pts, tag: audit_1y)                        │
│     ○ Plus de 12 mois (-5 pts, tag: audit_old)                  │
│     ○ Jamais réalisé (-10 pts, tag: no_internal_audit)          │
│                                                                  │
│  ┌───────────────────────────────────────────────────────┐      │
│  │            PASSER CETTE ÉTAPE                         │      │
│  └───────────────────────────────────────────────────────┘      │
└─────────────────────────────────────────────────────────────────┘
```

---

### 5.6 Déclencheurs Automatiques CRM

#### Workflows Automatisés selon Score

| Condition                     | Action CRM                     | Workflow                         |
| ----------------------------- | ------------------------------ | -------------------------------- |
| Score ≥ 80 (HOT)              | Création tâche urgente         | Notif Slack sales + assign owner |
| `no_quality_mgr` + score ≥ 60 | Séquence "Externalisation"     | Email J+1, J+3, appel J+5        |
| `externalized_quality`        | Séquence "Internalisation"     | Case study + ROI calculator      |
| `multi_norm` (3+)             | Flag "Multi-Référentiels"      | Assign senior consultant         |
| `enterprise` (500+)           | Tag "Compte Clé"               | AE dédié + meeting booking       |
| `first_audit`                 | Séquence "First Certification" | Parcours éducatif 30 jours       |
| Manager + score < 40          | Séquence "Activation Manager"  | Contenu à partager direction     |

#### Structure JSON pour CRM

```json
{
  "lead": {
    "company_name": "Transport Express SAS",
    "siret": "12345678900012",
    "contact": {
      "email": "jean.dupont@transport-express.fr",
      "phone": "+33612345678",
      "function": "Directeur des Opérations"
    },
    "organization": {
      "size": "51-200",
      "has_quality_manager": "Non",
      "certifications": ["GDP", "ISO9001"]
    },
    "scoring": {
      "lead_score": 75,
      "maturity_score": 35,
      "level": "Qualified",
      "priority": "24h"
    },
    "tags": [
      "decision_influencer",
      "smb_large",
      "no_quality_mgr",
      "opportunity_external",
      "standard_scope",
      "verified_company"
    ],
    "insights": [
      "Pas de responsable qualité dédié - opportunité externalisation",
      "2 normes sélectionnées - scope standard",
      "PME 51-200 - segment cible prioritaire"
    ]
  }
}
```

---

## �🔧 6. RECOMMANDATIONS TECHNIQUES

### Stack Suggéré

| Couche     | Technologie           | Justification                   |
| ---------- | --------------------- | ------------------------------- |
| Frontend   | Next.js 16 (existant) | SSR, performance, SEO           |
| Formulaire | React Hook Form + Zod | Validation robuste, UX fluide   |
| State      | Zustand ou Context    | État formulaire cross-sections  |
| Analytics  | Mixpanel ou Segment   | Event tracking granulaire       |
| CRM        | HubSpot ou Pipedrive  | Tags automatiques, lead scoring |
| Email      | Resend (existant)     | Transactionnel, templates       |
| Stockage   | localStorage          | Sauvegarde auto formulaire      |

### Intégrations Nécessaires

| Intégration               | Usage                    | Priorité        |
| ------------------------- | ------------------------ | --------------- |
| API SIRET (INSEE/Pappers) | Validation entreprise    | 🔴 Critique     |
| CRM Webhook               | Création lead + tags     | 🔴 Critique     |
| Email transactionnel      | Confirmations            | 🔴 Critique     |
| Analytics events          | Conversion tracking      | 🟡 Haute        |
| Calendly                  | Booking démo (optionnel) | 🟢 Nice-to-have |

### Événements Analytics à Tracker

```javascript
// Funnel events
track('landing_hero_viewed');
track('role_selected', { role: 'dirigeant' | 'manager' });
track('form_started');
track('form_field_completed', { field: 'siret' | 'function' | ... });
track('certifications_selected', { certifications: ['GDP', 'ISO9001'] });
track('modules_preview_viewed', { norms_count: 2 });
track('form_submitted', { access_level: 'full' | 'limited' });
track('confirmation_page_viewed', { type: 'dirigeant' | 'manager' });
track('share_link_copied'); // Manager only
track('cta_clicked', { cta_id: 'evaluate_org' | 'test_diagnostic' });
```

---

## ✅ 7. CHECKLIST IMPLÉMENTATION

### Phase 1: Structure (1 jour)

- [ ] Créer layout landing page responsive
- [ ] Implémenter section Hero avec variantes A/B
- [ ] Créer composants cartes Dirigeant/Manager

### Phase 2: Formulaire (2 jours)

- [ ] Implémenter formulaire avec React Hook Form
- [ ] Intégrer validation SIRET via API
- [ ] Créer sélecteur de normes interactif
- [ ] Ajouter logique conditionnelle (tags, access level)
- [ ] Implémenter sauvegarde localStorage

### Phase 3: Modules Preview (1 jour)

- [ ] Créer composant ModulePreviewCard
- [ ] Implémenter affichage dynamique selon normes
- [ ] Ajouter états locked/unlocked

### Phase 4: Confirmation (0.5 jour)

- [ ] Page confirmation Dirigeant
- [ ] Page confirmation Manager avec lien partageable
- [ ] Génération liens uniques

### Phase 5: Intégrations (1 jour)

- [ ] Webhook CRM pour création leads
- [ ] Email transactionnel confirmation
- [ ] Event tracking analytics

### Phase 6: Polish (0.5 jour)

- [ ] Animations et micro-interactions
- [ ] Tests responsive mobile/tablet
- [ ] Tests A/B headlines

---

## 📈 8. MÉTRIQUES CIBLES

| Métrique                           | Cible     | Mesure                 |
| ---------------------------------- | --------- | ---------------------- |
| Taux scroll Hero → Différenciation | > 70%     | Analytics scroll depth |
| Taux clic carte Dirigeant          | > 40%     | CTR tracking           |
| Taux complétion formulaire         | > 60%     | Form abandonment       |
| Ratio Dirigeant / Manager          | 40% / 60% | Tag CRM                |
| Taux conversion → Démo             | > 30%     | Pipeline CRM           |

---

**Document prêt pour implémentation. 🚀**

_Généré le 27/12/2025 - VYXO Codex Landing Page Refonte_
