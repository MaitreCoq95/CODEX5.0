# 🚀 LANDING PAGE PARTENAIRES CONSULTANTS - PLAN DE REFONTE

> **Date:** 27 Décembre 2025  
> **Route:** `/partners` ou `/devenir-partenaire`  
> **Objectif:** Recruter des consultants QHSE indépendants comme partenaires/distributeurs Vyxo

---

## 📊 ANALYSE DU BESOIN

### Persona Cible

| Attribut        | Valeur                                                     |
| --------------- | ---------------------------------------------------------- |
| **Profil**      | Consultant QHSE indépendant, 5-15 ans XP                   |
| **Spécialités** | GDP, ISO 9001/45001/14001, HACCP, EN 9100                  |
| **Portfolio**   | 3-10 clients actifs                                        |
| **CA annuel**   | 60-150K€                                                   |
| **TJM**         | 800-1200€/jour                                             |
| **Problèmes**   | Panier moyen limité, pas de MRR, différenciation difficile |

### Proposition de Valeur

```
SANS VYXO                      AVEC VYXO
─────────────────────          ─────────────────────
Mission GDP: 25K€      →       Mission + SaaS: 45K€
Fin mission = 0€       →       MRR 150€/mois à vie
Excel/PowerPoint       →       Dashboard pro
vs Bureau Veritas: ❌   →       Crédibilité: ✅
```

---

## 🏗️ ARCHITECTURE PROPOSÉE

### Structure des Pages

```
app/(marketing)/
└── partners/
    └── page.tsx              # Landing principale partenaires
```

### Nouveaux Composants (12)

```
components/partners/
├── hero-section.tsx          # LP-PARTNER-01
├── problem-section.tsx       # LP-PARTNER-02
├── solution-section.tsx      # LP-PARTNER-03
├── pricing-formulas.tsx      # LP-PARTNER-04
├── case-study-thomas.tsx     # LP-PARTNER-05
├── features-section.tsx      # LP-PARTNER-06
├── journey-timeline.tsx      # LP-PARTNER-07
├── faq-partners.tsx          # LP-PARTNER-08
├── criteria-section.tsx      # LP-PARTNER-09
├── application-form.tsx      # LP-PARTNER-10
├── cta-final.tsx             # LP-PARTNER-11
└── reassurance-footer.tsx    # LP-PARTNER-11
```

### Données

```
lib/data/
├── partner-formulas.ts       # 3 formules partenariat
├── partner-testimonials.ts   # Cas Thomas + Sophie
└── faq-partners.ts           # 10 questions FAQ
```

### Schémas & Services

```
lib/
├── schemas/
│   └── partner-application.schema.ts   # Validation formulaire
│
└── services/
    ├── partner-scoring.ts              # Scoring candidature
    └── partner-crm.ts                  # Tags et workflows
```

### API

```
app/api/partners/
└── apply/
    └── route.ts              # POST candidature
```

---

## 📝 SECTIONS DE LA LANDING

### Section 1: Hero (LP-PARTNER-01)

**Headlines (3 variantes A/B/C):**

- A: "Consultants QHSE: Et si vos missions généraient des revenus récurrents?"
- B: "Vos clients vous demandent un tableau de bord. Vous facturez quoi? 0€."
- C: "Passez de 25K€ à 45K€ par mission sans recruter ni développer d'outil"

**CTAs:**

- Primaire: "Devenir partenaire" (scroll formulaire)
- Secondaire: "Voir une démo" (Calendly)

---

### Section 2: Constat Brutal (LP-PARTNER-02)

**4 cartes problème:**

| #   | Titre                         | Message                                |
| --- | ----------------------------- | -------------------------------------- |
| 1   | 📉 Panier moyen limité        | Missions one-shot 20-30K€, fin = 0€    |
| 2   | 📊 Clients exigeants          | "Tu peux me faire un dashboard Excel?" |
| 3   | 🤷 Différenciation impossible | "Pourquoi vous vs Bureau Veritas?"     |
| 4   | 🔄 Pas de récurrence          | 0€ MRR, prospection non-stop           |

**Call-out rouge:** "Résultat: Bloqué à 80-120K€/an, 50h/semaine"

---

### Section 3: Solution (LP-PARTNER-03)

**Introduction fondateur:**

> "Je suis Vivien, fondateur de Vyxo. 15 ans de consulting QHSE. J'ai vécu ces problèmes. J'ai construit Vyxo pour les résoudre. Pas pour remplacer les consultants. Pour les **amplifier**."

**3 étapes:**

1. Vous utilisez Vyxo dans vos missions
2. Vos clients adorent (et paient plus)
3. Vous générez du MRR à vie

---

### Section 4: 3 Formules (LP-PARTNER-04)

| Formule            | Coût      | Commission            | Clients Max | Billing |
| ------------------ | --------- | --------------------- | ----------- | ------- |
| **Revenue Share**  | 0€        | 30% MRR               | 5           | Vyxo    |
| **Licence Pro** ⭐ | 200€/mois | Marge 100-200€/client | 10          | Partagé |
| **All-In**         | 500€/mois | 100% MRR              | Illimité    | Vous    |

---

### Section 5: Cas Thomas (LP-PARTNER-05)

**Avant Vyxo:**

- CA 2023: 90K€
- Missions: 20-25K€
- MRR: 0€

**Après Vyxo (Licence Pro):**

- CA 2024: 165K€ (+83%)
- Mission moyenne: 53,6K€
- MRR: 400€/mois passif

---

### Section 6: Features (LP-PARTNER-06)

**Plateforme:**

- Dashboard conformité temps réel
- Modules par norme (GDP, ISO, HACCP...)
- LMS intégré (formation équipes)
- Générateur documents/procédures

**Accompagnement:**

- Formation 2 jours incluse
- Templates métier prêts
- Support dédié (24-48h)
- Sales enablement (pitch, démo, ROI)

---

### Section 7: Timeline (LP-PARTNER-07)

```
1. CANDIDATURE     → Appel 30min sous 48h
   ↓
2. ONBOARDING      → Formation 2 jours, accès plateforme
   ↓
3. PREMIÈRE MISSION → Mois 1-2, coaching Vyxo
   ↓
4. MONTÉE EN CHARGE → 3-5 clients, MRR qui monte
   ↓
5. AUTONOMIE       → 100% rodé, success story
```

---

### Section 8: FAQ (LP-PARTNER-08)

**10 questions essentielles:**

1. Je ne suis pas tech, c'est compliqué?
2. Mes clients vont me virer pour garder Vyxo?
3. Comment je vends du SaaS?
4. Quelle formule choisir?
5. White-label possible?
6. Combien de temps avant MRR?
7. Non-compete clause?
8. Payer sans clients?
9. Comment fonctionne le billing?
10. Combien de partenaires actuels?

---

### Section 9: Critères (LP-PARTNER-09)

**✅ Profil idéal:**

- 3+ ans consulting QHSE
- 5+ certifications menées
- 2+ clients actifs
- CA > 60K€
- Ouvert aux outils tech

**❌ NON compatible:**

- Salarié en poste
- Débutant sans références
- Pas de portfolio existant

---

### Section 10: Formulaire (LP-PARTNER-10)

**5 sections:**

1. Infos de base (nom, email, téléphone, localisation)
2. Activité (statut, ancienneté, spécialisations)
3. Portfolio (clients actifs, missions, CA)
4. Projet (formule, motivation, volume)
5. Disponibilité

**Validation Zod + envoi API**

---

### Section 11: CTA Final (LP-PARTNER-11)

**Stats:**

- 3 partenaires actifs
- 12 clients équipés
- 165K€ CA moyen
- 95% satisfaction

**CTAs:** Formulaire + Calendly

---

### Section 12: CRM & Analytics (LP-PARTNER-12)

**Tags auto:**

- `partner_formula_revshare` / `partner_formula_pro` / `partner_formula_allin`
- `partner_xp_5plus` / `partner_ca_100k`
- `partner_hot` (CA >100K + 5+ clients)

**Scoring candidature:**

- Profil idéal: 80+ points
- Qualification call: 50-79 points
- Nurturing: <50 points

---

## 🎨 DESIGN SYSTEM

### Couleurs spécifiques

```scss
// Thème partenaires (variante du thème principal)
$partner-primary: #1e40af; // Bleu confiance
$partner-accent: #10b981; // Vert croissance
$partner-highlight: #f59e0b; // Doré premium
$partner-warning: #ef4444; // Rouge problèmes
```

### Ton & Voice

- **Pair à pair** (consultant → consultant)
- **Tutoiement** (entre pros)
- **Cash et transparent** (pas de bullshit)
- **Pragmatique** (chiffres concrets)

---

## 📅 ROADMAP

### Phase 1: Structure (3 jours)

- [ ] LP-PARTNER-01: Hero
- [ ] LP-PARTNER-02: Problem cards
- [ ] LP-PARTNER-03: Solution
- [ ] LP-PARTNER-04: Pricing formulas

### Phase 2: Social Proof (3 jours)

- [ ] LP-PARTNER-05: Cas Thomas
- [ ] LP-PARTNER-06: Features
- [ ] LP-PARTNER-07: Timeline
- [ ] LP-PARTNER-08: FAQ

### Phase 3: Conversion (4 jours)

- [ ] LP-PARTNER-09: Critères
- [ ] LP-PARTNER-10: Formulaire
- [ ] LP-PARTNER-11: CTA + Reassurance
- [ ] LP-PARTNER-12: CRM + Analytics

---

## ✅ MÉTRIQUES DE SUCCÈS

| Métrique                      | Objectif             |
| ----------------------------- | -------------------- |
| Visites/mois                  | 100                  |
| Taux conversion formulaire    | 15%                  |
| Candidatures/mois             | 15                   |
| Partenaires validés/trimestre | 3-5                  |
| Profil idéal (%)              | 40% des candidatures |

---

## 🚀 PRÊT POUR VALIDATION

Ce plan couvre:

- ✅ Architecture complète (12 composants)
- ✅ Copywriting par section
- ✅ Formulaire détaillé (5 sections)
- ✅ Logiques CRM/scoring
- ✅ Roadmap 10 jours

**Une fois validé, on attaque LP-PARTNER-01 (Hero Section)!**

🐓
