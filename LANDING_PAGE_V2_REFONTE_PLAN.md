# 🏗️ LANDING PAGE V2.0 - PLAN DE REFONTE COMPLET

> **Positionnement Hybride:** SaaS × Formation × Consulting
> **Objectif:** "De l'évaluation initiale à la certification obtenue"

---

## 📊 TABLE DES MATIÈRES

1. [Diagnostic de l'existant](#partie-1-diagnostic-existant)
2. [Architecture refonte](#partie-2-architecture-refonte)
3. [Copywriting complet](#partie-3-copywriting-complet)
4. [Spécifications techniques](#partie-4-specifications-techniques)
5. [Roadmap & Priorisation](#partie-5-roadmap)
6. [Métriques de succès](#partie-6-metriques)

---

## PARTIE 1: DIAGNOSTIC EXISTANT

### 1.1 ✅ Ce qui fonctionne

| Section             | Points forts                                                      |
| ------------------- | ----------------------------------------------------------------- |
| **Hero**            | Headline A/B testing, mockup dashboard impactant, design premium  |
| **RoleSelector**    | Différenciation Dirigeant/Manager claire, bénéfices listés        |
| **Formulaire**      | Validation SIRET API, sauvegarde localStorage, progression étapes |
| **Maturité**        | Questions par norme, scoring détaillé, tags automatiques          |
| **Modules Preview** | Effet "frustration" avec modules verrouillés/gratuits             |
| **Scoring**         | Lead qualification, messages personnalisés, insights contextuels  |
| **Emails/CRM**      | Webhooks configurables, templates HTML                            |

### 1.2 ❌ Ce qui manque (critique)

| Élément manquant                        | Impact conversion                                                          | Priorité |
| --------------------------------------- | -------------------------------------------------------------------------- | -------- |
| **Section "Notre Méthode" (3 piliers)** | Les visiteurs ne comprennent pas l'hybridité SaaS+Formation+Consulting     | 🔴 P1    |
| **Timeline "Comment ça marche"**        | Pas de visibilité sur le parcours vers certification (12-18 mois)          | 🔴 P1    |
| **Section Formules/Pricing**            | Pas de clarté sur les niveaux d'accompagnement                             | 🔴 P1    |
| **Social Proof**                        | Aucun cas client, aucun témoignage, aucune preuve de résultat              | 🔴 P1    |
| **Section Réassurance**                 | Pas de mention "15 ans d'expertise", taux de réussite, certifications VYXO | 🟡 P2    |
| **FAQ**                                 | Aucune réponse aux objections courantes                                    | 🟡 P2    |
| **Champs formulaire avancés**           | Pas de question maturité projet, budget, type d'accompagnement souhaité    | 🟡 P2    |
| **Modules 3 couches**                   | Modules affichent seulement évaluation, pas Formation ni Consulting        | 🟡 P2    |

### 1.3 Score de maturité actuel

| Pilier                   | Score | Analyse                                                         |
| ------------------------ | ----- | --------------------------------------------------------------- |
| **SaaS Positioning**     | 7/10  | Dashboard visible, fonctionnalités claires, mais manque pricing |
| **Formation Visibility** | 3/10  | ❌ Presque invisible - juste "Formations OK: 89%" dans mockup   |
| **Consulting Presence**  | 2/10  | ❌ Totalement absent - aucune mention expertise terrain         |

**Score global: 4/10** - La landing vend un outil, pas un écosystème d'accompagnement.

---

## PARTIE 2: ARCHITECTURE REFONTE

### 2.1 Nouvelle structure de page

```
┌─────────────────────────────────────────────────────────────┐
│ SECTION 1: HERO HYBRIDE                                     │
│ → Headline orientée "certification obtenue"                  │
│ → Sous-headline mentionnant les 3 piliers                    │
│ → Visuel: Dashboard + Humain + Timeline                      │
├─────────────────────────────────────────────────────────────┤
│ SECTION 2: NOTRE MÉTHODE (Les 3 Piliers) ⭐ NOUVEAU         │
│ → 3 cartes: Plateforme / Formation / Consulting              │
│ → Message: "C'est l'alliance des 3 qui garantit la certif"   │
├─────────────────────────────────────────────────────────────┤
│ SECTION 3: COMMENT ÇA MARCHE (Parcours) ⭐ NOUVEAU          │
│ → Timeline 4 étapes: Diagnostic → Formation → Conformité →   │
│   Certification                                              │
│ → Durées: 12-18 mois | Taux: 95%                             │
├─────────────────────────────────────────────────────────────┤
│ SECTION 4: DIFFÉRENCIATION DIRIGEANT/MANAGER                │
│ → Amélioration cartes existantes avec CTAs orientés résultat │
├─────────────────────────────────────────────────────────────┤
│ SECTION 5: FORMULES & ACCOMPAGNEMENT ⭐ NOUVEAU             │
│ → 3 colonnes: Plateforme / Hybride ⭐ / Full Accompagnement  │
│ → Clarifier ce qui est inclus dans chaque niveau             │
├─────────────────────────────────────────────────────────────┤
│ SECTION 6: FORMULAIRE QUALIFIANT                            │
│ → Ajouter: Maturité projet, Type accompagnement, Budget      │
│ → Logiques conditionnelles améliorées                        │
├─────────────────────────────────────────────────────────────┤
│ SECTION 7: MODULES PREVIEW (3 couches) ⭐ AMÉLIORÉ          │
│ → Chaque module affiche: Évaluation + Formation + Consulting │
├─────────────────────────────────────────────────────────────┤
│ SECTION 8: SOCIAL PROOF ⭐ NOUVEAU                          │
│ → 3 cas clients détaillés avec métriques                     │
├─────────────────────────────────────────────────────────────┤
│ SECTION 9: RÉASSURANCE ⭐ NOUVEAU                           │
│ → Chiffres clés + Certifications VYXO + Logos clients        │
├─────────────────────────────────────────────────────────────┤
│ SECTION 10: FAQ ⭐ NOUVEAU                                  │
│ → 10 questions/réponses anticipant les objections            │
├─────────────────────────────────────────────────────────────┤
│ SECTION 11: CTA FINAL                                       │
│ → Amélioration avec urgence et bénéfice clair                │
└─────────────────────────────────────────────────────────────┘
```

---

## PARTIE 3: COPYWRITING COMPLET

### 3.1 HERO SECTION REFONTE

#### Headline (3 variantes A/B)

| Variante | Headline                                                                                       | Angle                  |
| -------- | ---------------------------------------------------------------------------------------------- | ---------------------- |
| **A**    | "Certifié GDP en 12 mois, avec des équipes **formées et autonomes**"                           | Résultat + Durée       |
| **B**    | "Votre certification qualité ne s'improvise pas. Elle se **construit, se forme et se prouve**" | Triptyque              |
| **C**    | "95% de réussite à la certification. **L'accompagnement qui fait la différence**"              | Stat + Différenciation |

#### Sous-headline

> "Plateforme décisionnelle + Formation continue + Expertise terrain. Le seul écosystème qui vous accompagne de l'évaluation initiale jusqu'à la certification obtenue."

#### CTAs

- **Primaire:** "DÉMARRER MON PROJET DE CERTIFICATION →"
- **Secondaire:** "Découvrir notre méthode ↓"

#### Visuel suggéré

Dashboard avec 3 zones distinctes:

1. **Tableau de bord** (stats compliance)
2. **Avatar consultant** (avec badge "Expert GDP")
3. **Timeline verticale** "Road to Certification"

---

### 3.2 SECTION "NOTRE MÉTHODE" (NOUVEAU)

#### Introduction

> "Vyxo Codex n'est pas un logiciel. C'est un **programme de transformation** qui combine technologie, pédagogie et expertise terrain pour garantir votre certification."

#### 3 CARTES VISUELLES

**CARTE 1: PLATEFORME DÉCISIONNELLE 📊**

```
Titre: "Pilotez votre road to certification"
Description: Tableaux de bord temps réel, génération automatique
             de preuves auditables, suivi des écarts et plans d'action.

✅ Dashboard de conformité par norme
✅ Évaluations continues des équipes
✅ Documentation auto-générée pour audits
✅ Alertes sur points critiques

Icône: Écran avec graphiques
```

**CARTE 2: FORMATION CONTINUE 🎓**

```
Titre: "Formez et certifiez vos équipes"
Description: Modules e-learning par rôle et par norme, tracking
             de progression, attestations générées automatiquement.

✅ Parcours personnalisés par métier
✅ Bibliothèque 100+ modules QHSE
✅ Quiz de validation et certifications internes
✅ Rapports individuels et collectifs

Icône: Graduation cap / Livre ouvert
```

**CARTE 3: ACCOMPAGNEMENT EXPERT 👨‍💼**

```
Titre: "15 ans d'expertise à vos côtés"
Description: Consultants QHSE certifiés Lead Auditor, audits blancs
             sur site, production de procédures clé en main.

✅ Consultant dédié par projet
✅ Audits blancs trimestriels
✅ Production de procédures GDP/ISO
✅ Accompagnement jusqu'à certification

Icône: Badge expert / Poignée de main
```

#### Conclusion

> "**C'est l'alliance des trois qui garantit votre certification.** Pas de formation sans suivi terrain. Pas d'outil sans expertise. Pas d'accompagnement sans mesure."

---

### 3.3 SECTION "COMMENT ÇA MARCHE" (NOUVEAU)

#### Timeline visuelle 4 étapes

**ÉTAPE 1: DIAGNOSTIC | Semaine 1**

```
🎯 "Évaluez votre point de départ"

Nous réalisons un diagnostic complet de votre maturité actuelle
pour chaque norme visée. Où en êtes-vous vraiment?

Livrables:
→ Score de maturité par domaine
→ Cartographie des écarts
→ Rapport de priorisation
→ Plan d'action personnalisé

Durée: 1 semaine
Qui: Consultant senior + Plateforme
```

**ÉTAPE 2: FORMATION | Mois 1-6**

```
🎓 "Montez en compétences vos équipes"

Parcours de formation personnalisés pour chaque collaborateur
selon son rôle dans le système qualité.

Livrables:
→ Parcours e-learning assignés
→ Sessions terrain en option
→ Évaluations individuelles
→ Attestations de formation

Durée: 6 mois (parallèle à étape 3)
Qui: Vos équipes + LMS Vyxo
```

**ÉTAPE 3: MISE EN CONFORMITÉ | Mois 3-12**

```
📋 "Construisez votre système qualité"

Nos consultants vous accompagnent dans la production documentaire
et la mise en place des procédures terrain.

Livrables:
→ Procédures et modes opératoires
→ Audits blancs internes
→ Tableaux de suivi compliance
→ Préparation des preuves

Durée: 9 mois
Qui: Consultant dédié + Plateforme
```

**ÉTAPE 4: CERTIFICATION | Mois 12-18**

```
🏆 "Obtenez votre certification officielle"

Préparation finale à l'audit de certification,
répétition générale et support le jour J.

Livrables:
→ Simulation audit complet
→ Brief équipes pré-audit
→ Support pendant l'audit
→ Certification obtenue ✅

Durée: Variable selon OC
Qui: Vous + VYXO + Organisme certificateur
```

#### Call-out box

> **⏱️ Durée moyenne: 12-18 mois | 📊 Taux de réussite: 95% | 💰 Éligible OPCO**

---

### 3.4 SECTION FORMULES (NOUVEAU)

#### Tableau comparatif

|                            | **PLATEFORME**        | **HYBRIDE** ⭐          | **FULL ACCOMPAGNEMENT** |
| -------------------------- | --------------------- | ----------------------- | ----------------------- |
| **Pour qui**               | Équipes déjà expertes | Projet de certification | Transformation complète |
| **Prix indicatif**         | À partir de 490€/mois | Sur devis               | Sur devis               |
|                            |                       |                         |                         |
| **Accès plateforme SaaS**  | ✅ Illimité           | ✅ Illimité             | ✅ Illimité             |
| **Modules e-learning**     | ✅ Complet            | ✅ Complet              | ✅ Complet              |
| **Support email**          | ✅                    | ✅                      | ✅                      |
| **Documentation auto**     | ✅                    | ✅                      | ✅                      |
|                            |                       |                         |                         |
| **Jours consulting/an**    | ❌                    | ✅ 10 jours             | ✅ Illimité             |
| **Audits blancs**          | ❌                    | ✅ Trimestriel          | ✅ Mensuel              |
| **Consultant dédié**       | ❌                    | ✅ Partagé              | ✅ 0.5 ETP dédié        |
| **Formation sur site**     | ❌                    | ✅ 1 session            | ✅ Illimité             |
| **Garantie certification** | ❌                    | ❌                      | ✅ Engagement résultat  |
|                            |                       |                         |                         |
| **CTA**                    | Essayer gratuitement  | Demander un devis       | Parler à un expert      |

#### Note

> "Toutes nos formules incluent la plateforme SaaS, la formation et l'accès à l'expertise terrain. Seule l'intensité de l'accompagnement varie."

---

### 3.5 FORMULAIRE AMÉLIORÉ

#### Nouveaux champs à ajouter

**CHAMP: Maturité projet** (obligatoire)

```
"Où en êtes-vous dans votre démarche de certification?"

○ Pas encore démarré – je découvre
○ En réflexion – j'évalue les solutions
○ Projet validé – je cherche un accompagnement
○ Audit prévu – je dois être prêt rapidement | Date: [____]
○ Déjà certifié – je veux maintenir/élargir
```

**CHAMP: Type d'accompagnement** (obligatoire)

```
"Quel niveau d'accompagnement recherchez-vous?"

○ Plateforme seule – mon équipe gère
○ Hybride – plateforme + consulting ponctuel
○ Full accompagnement – je veux être accompagné jusqu'au bout
○ Je ne sais pas encore
```

**CHAMP: Budget estimé** (optionnel)

```
○ < 10K€
○ 10-30K€
○ 30-50K€
○ 50-100K€
○ > 100K€
○ Non défini
```

#### Logiques conditionnelles

```javascript
// HOT LEAD → Calendrier démo immédiat
if (role === "dirigeant" &&
    maturity === "audit_prevu" &&
    accompagnement === "full" &&
    hasSiret) {
  → Redirection calendrier consultant senior
  → Email urgent équipe commerciale
  → Tag CRM: "HOT_LEAD_URGENT"
}

// QUALIFIED → Nurturing rapide
if (role === "dirigeant" &&
    maturity === "projet_valide" &&
    budget >= "30K") {
  → Appel commercial sous 2h
  → Tag CRM: "QUALIFIED_LEAD"
}

// NURTURE → Séquence longue
if (role === "manager" &&
    maturity === "en_reflexion" &&
    !hasSiret) {
  → Accès limité aperçu
  → Email nurturing avec lien partage dirigeant
  → Tag CRM: "NURTURE_MANAGER"
}
```

---

### 3.6 MODULES PREVIEW (3 couches)

#### Format par module

Exemple: **"Qualification des fournisseurs"** (GDP)

```
┌─────────────────────────────────────────────────────────────┐
│ 📦 Qualification des fournisseurs                    [GDP] │
├─────────────────────────────────────────────────────────────┤
│ 📊 ÉVALUATION                                               │
│    → 25 questions de diagnostic                             │
│    → Scoring automatique avec écarts identifiés             │
│    → Rapport de conformité généré                           │
├─────────────────────────────────────────────────────────────┤
│ 🎓 FORMATION                                                │
│    → Parcours e-learning 2h                                 │
│    → Cas pratiques secteur pharma                           │
│    → Quiz de validation + attestation                       │
├─────────────────────────────────────────────────────────────┤
│ 👨‍💼 ACCOMPAGNEMENT                                          │
│    → Audit terrain par expert VYXO                          │
│    → Modèles de procédures GDP fournis                      │
│    → Suivi de mise en conformité (3 mois)                   │
└─────────────────────────────────────────────────────────────┘
```

---

### 3.7 SOCIAL PROOF (NOUVEAU)

#### Cas client 1: ALS Fresh Food

```
🏢 ALS FRESH FOOD | Transport pharmaceutique

CONTEXTE: PME logistique 45 salariés, aucune certification,
          audit ANSM prévu dans 18 mois.

OBJECTIF: Certification GDP + ISO 9001

RÉSULTATS:
✅ Certification GDP obtenue en 14 mois
✅ 32 collaborateurs formés
✅ Conformité: 45% → 98%
✅ 0 non-conformité majeure à l'audit ANSM

"Vyxo a transformé nos équipes. La plateforme combinée à
l'accompagnement terrain de Marc, c'est ce qui nous a permis
de décrocher la GDP en 14 mois au lieu des 24 prévus."

— Sophie M., Directrice Générale
```

#### Cas client 2: MedTrans Lyon

```
🏢 MEDTRANS LYON | Distribution BtoB pharma

CONTEXTE: ETI 120 salariés, certification ISO 9001 expirée,
          perte de clients majeurs.

OBJECTIF: Renouvellement ISO 9001 + GDP

RÉSULTATS:
✅ Double certification en 18 mois
✅ 89 collaborateurs formés sur parcours personnalisés
✅ Récupération de 3 clients perdus
✅ +22% de chiffre d'affaires année suivante

"L'approche hybride de Vyxo nous a permis de recertifier
tout en formant nos équipes. Le ROI est évident."

— Philippe D., PDG
```

#### Cas client 3: AeroParts Toulouse

```
🏢 AEROPARTS TOULOUSE | Sous-traitance aéronautique

CONTEXTE: PME 25 salariés, première certification EN 9100
          pour accéder aux marchés Airbus.

OBJECTIF: Certification EN 9100 (aéronautique)

RÉSULTATS:
✅ Certification EN 9100 obtenue en 16 mois
✅ 100% des opérateurs certifiés contrôle qualité
✅ Référencement Airbus obtenu
✅ Carnet de commandes +45%

"Sans Vyxo, on aurait mis 3 ans. Leur expertise EN 9100
combinée à la plateforme, c'est un game changer."

— Jean-Marc B., Dirigeant
```

---

### 3.8 SECTION RÉASSURANCE (NOUVEAU)

#### Bandeau chiffres clés

| 15 ans           | 12                              | 95%                    | 200+                  |
| ---------------- | ------------------------------- | ---------------------- | --------------------- |
| d'expertise QHSE | certifications obtenues en 2024 | de réussite aux audits | collaborateurs formés |

#### Certifications & agréments VYXO

- ✅ Consultants certifiés Lead Auditor ISO 9001 / 14001 / 45001
- ✅ Experts GDP agréés ANSM
- ✅ Organisme de formation déclaré (en cours Qualiopi)
- ✅ Partenaire des principaux organismes certificateurs

---

### 3.9 FAQ (NOUVEAU)

**1. Quelle est la différence entre Vyxo Codex et un logiciel de conformité classique?**

> Vyxo Codex combine une plateforme SaaS, des modules de formation intégrés ET un accompagnement terrain par des consultants certifiés. Ce n'est pas juste un outil, c'est un programme complet vers la certification.

**2. Combien de temps faut-il pour obtenir ma certification?**

> En moyenne 12 à 18 mois selon la norme visée et votre niveau de départ. Les projets urgents peuvent être accélérés avec notre formule Full Accompagnement.

**3. Mes équipes doivent-elles être formées avant de commencer?**

> Non, c'est justement l'intérêt de notre approche intégrée. La formation fait partie du parcours et se fait en parallèle de la mise en conformité.

**4. Puis-je utiliser uniquement la plateforme sans consulting?**

> Oui, notre formule "Plateforme" est disponible pour les équipes déjà expertes. Mais notre expérience montre que l'accompagnement augmente significativement le taux de réussite.

**5. Quels sont vos taux de réussite aux certifications?**

> 95% de nos clients accompagnés obtiennent leur certification du premier coup. Les 5% restants l'obtiennent à la seconde tentative avec notre support continu.

**6. Combien coûte un accompagnement complet?**

> Cela dépend de la norme, de la taille de votre organisation et du niveau d'accompagnement souhaité. Demandez un devis personnalisé, c'est gratuit et sans engagement.

**7. Êtes-vous certifiés/agréés en tant qu'organisme?**

> Nos consultants sont certifiés Lead Auditor par des organismes reconnus (IRCA, Exemplar Global). Nous sommes organisme de formation déclaré.

**8. Peut-on gérer plusieurs normes en même temps?**

> Oui, c'est même recommandé. Un système de management intégré (SMI) réduit la charge documentaire de 40% par rapport à des systèmes séparés.

**9. Que se passe-t-il si on n'obtient pas la certification?**

> Avec notre formule Full Accompagnement, nous nous engageons sur le résultat. En cas d'échec (rare), nous poursuivons l'accompagnement sans frais supplémentaires.

**10. Proposez-vous un suivi post-certification?**

> Oui, toutes nos formules incluent l'accès continu à la plateforme pour maintenir votre certification. Des formules de maintenance annuelle sont disponibles.

---

## PARTIE 4: SPÉCIFICATIONS TECHNIQUES

### 4.1 Nouveaux composants à créer

| Composant          | Fichier                                      | Priorité |
| ------------------ | -------------------------------------------- | -------- |
| MethodSection      | `components/landing/method-section.tsx`      | P1       |
| TimelineSection    | `components/landing/timeline-section.tsx`    | P1       |
| PricingSection     | `components/landing/pricing-section.tsx`     | P1       |
| CaseStudyCard      | `components/landing/case-study-card.tsx`     | P1       |
| ReassuranceSection | `components/landing/reassurance-section.tsx` | P2       |
| FAQSection         | `components/landing/faq-section.tsx`         | P2       |
| ModuleCard3Layers  | `components/landing/module-card-3layers.tsx` | P2       |

### 4.2 MAJ Schéma formulaire

```typescript
// lib/schemas/evaluation-form.schema.ts - nouveaux champs

projectMaturityOptions = [
  { value: "discovery", label: "Pas encore démarré" },
  { value: "evaluation", label: "En réflexion" },
  { value: "validated", label: "Projet validé" },
  { value: "urgent", label: "Audit prévu rapidement" },
  { value: "renewal", label: "Déjà certifié - maintien/élargissement" },
];

accompagnementOptions = [
  { value: "platform_only", label: "Plateforme seule" },
  { value: "hybrid", label: "Hybride" },
  { value: "full", label: "Full accompagnement" },
  { value: "unknown", label: "Je ne sais pas encore" },
];

budgetOptions = [
  { value: "under_10k", label: "< 10K€" },
  { value: "10k_30k", label: "10-30K€" },
  { value: "30k_50k", label: "30-50K€" },
  { value: "50k_100k", label: "50-100K€" },
  { value: "over_100k", label: "> 100K€" },
  { value: "undefined", label: "Non défini" },
];
```

### 4.3 Nouveaux services

```typescript
// lib/services/lead-scoring.ts - mise à jour scoring

// Nouveau scoring avec pondération accompagnement
function calculateLeadScore(data) {
  let score = baseScore;

  // Bonus accompagnement
  if (data.accompagnement === "full") score += 25;
  if (data.accompagnement === "hybrid") score += 15;

  // Bonus maturité
  if (data.project_maturity === "urgent") score += 30;
  if (data.project_maturity === "validated") score += 20;

  // Bonus budget
  if (data.budget === "over_100k") score += 20;
  if (data.budget === "50k_100k") score += 15;

  return score;
}
```

---

## PARTIE 5: ROADMAP

### Phase 1: MVP (Semaines 1-2) 🔴 Critique

| Tâche                                 | Effort | Fichiers                    |
| ------------------------------------- | ------ | --------------------------- |
| LP-V2-01: Hero refonte                | 0.5j   | hero-section.tsx            |
| LP-V2-02: Section Méthode (3 piliers) | 1j     | method-section.tsx          |
| LP-V2-03: Timeline Comment ça marche  | 1j     | timeline-section.tsx        |
| LP-V2-04: Amélioration formulaire     | 1j     | evaluation-form.tsx, schema |

**Livrable:** Landing avec positionnement hybride visible

### Phase 2: Conversion (Semaines 3-4)

| Tâche                              | Effort | Fichiers                |
| ---------------------------------- | ------ | ----------------------- |
| LP-V2-05: Section Formules/Pricing | 1j     | pricing-section.tsx     |
| LP-V2-06: Social Proof (3 cas)     | 1j     | case-study-card.tsx     |
| LP-V2-07: Réassurance              | 0.5j   | reassurance-section.tsx |
| LP-V2-08: FAQ                      | 0.5j   | faq-section.tsx         |

**Livrable:** Landing complète avec social proof

### Phase 3: Polish (Semaines 5-6)

| Tâche                                  | Effort | Fichiers                |
| -------------------------------------- | ------ | ----------------------- |
| LP-V2-09: Modules 3 couches            | 1j     | module-card-3layers.tsx |
| LP-V2-10: Animations + Responsive      | 0.5j   | CSS                     |
| LP-V2-11: Logiques conditionnelles CRM | 0.5j   | lead-scoring.ts         |
| LP-V2-12: A/B Tests headlines          | 0.5j   | hero-section.tsx        |

**Livrable:** Landing optimisée avec tracking complet

---

## PARTIE 6: MÉTRIQUES DE SUCCÈS

### KPIs principaux

| Métrique                                 | Actuel (estimé) | Objectif V2 |
| ---------------------------------------- | --------------- | ----------- |
| Taux de scroll jusqu'à CTA               | 40%             | 65%         |
| Taux complétion formulaire               | 15%             | 30%         |
| Ratio Dirigeant/Manager                  | 30/70           | 45/55       |
| Taux conversion form → démo              | 20%             | 35%         |
| % leads "Projet validé" ou "Audit prévu" | 25%             | 45%         |
| % demandes "Full accompagnement"         | 10%             | 30%         |

### Events analytics à ajouter

```javascript
// Nouveaux events
"method_pillar_viewed"; // + pillar_name
"timeline_step_expanded"; // + step_number
"pricing_formula_clicked"; // + formula_name
"case_study_expanded"; // + client_name
"faq_question_clicked"; // + question_id
"form_field_project_maturity"; // + value
"form_field_accompagnement"; // + value
"form_field_budget"; // + value
```

---

## ⚠️ RAPPELS CRITIQUES

### ❌ À éviter absolument

- "Plateforme tout-en-un" → Dire "Programme de transformation"
- "Solution complète" → Dire "Accompagnement jusqu'à certification"
- Logiciel suffisant seul → Toujours montrer triptyque
- Vente self-service → Objectif = déclencher une démo

### ✅ À respecter

- Chaque section doit montrer le lien SaaS + Formation + Consulting
- La certification est le RÉSULTAT, pas la plateforme
- Frustration volontaire → assez pour qualifier, pas tout pour convaincre

---

> **Question que doit se poser chaque visiteur:**
> "Comment ai-je pu envisager faire ma certification sans Vyxo?"
