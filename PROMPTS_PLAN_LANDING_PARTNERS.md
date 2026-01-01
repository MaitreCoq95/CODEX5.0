# 🐓 PROMPTS PLAN - LANDING PAGE PARTENAIRES CONSULTANTS

> **Mission:** Créer une landing page pour recruter des consultants QHSE indépendants comme partenaires/distributeurs Vyxo
> **Objectif:** Transformer des consultants solo en distributeurs qui utilisent Vyxo pour augmenter leur CA

---

## 📊 Progression Globale

```
LANDING PARTENAIRES : [████████████████████] 100% (LP-PARTNER-01 à 12 TERMINÉS ✅)
```

**Durée estimée totale:** 2 semaines (10 jours dev)  
**Route:** `/partners` ou `/devenir-partenaire`

---

## 🎯 PERSONA CIBLE

| Critère         | Valeur                                   |
| --------------- | ---------------------------------------- |
| **Profil**      | Consultant QHSE indépendant              |
| **Expérience**  | 5-15 ans terrain                         |
| **Spécialités** | GDP, ISO 9001, ISO 45001, HACCP, EN 9100 |
| **Portfolio**   | 3-10 clients actifs                      |
| **CA annuel**   | 60-150K€                                 |
| **TJM**         | 800-1200€/jour                           |

---

## 📋 LISTE DES PROMPTS

### PHASE 1: STRUCTURE & CORE (40%)

#### LP-PARTNER-01: Hero Section

**Objectif:** Accrocher le consultant avec son problème principal

- 3 variantes headlines (Direct/Pain/Aspiration)
- Sous-headline axé MRR et panier moyen +50%
- CTA: "Devenir partenaire" + "Voir une démo"
- Visuel: Dashboard + consultant + overlay chiffres

**Fichiers:**

- `components/partners/hero-section.tsx`

---

#### LP-PARTNER-02: Section Constat Brutal

**Objectif:** Agiter les 4 problèmes du consultant solo

- Carte 1: Panier moyen limité (missions one-shot)
- Carte 2: Clients exigeants ("Tu peux me faire un dashboard?")
- Carte 3: Différenciation impossible (vs Bureau Veritas)
- Carte 4: Pas de récurrence (0€ MRR)
- Call-out rouge: "Bloqué à 80-120K€/an"

**Fichiers:**

- `components/partners/problem-section.tsx`

---

#### LP-PARTNER-03: Section Solution

**Objectif:** Présenter le Vyxo Partner Program

- Introduction Vivien (15 ans QHSE, fondateur)
- 3 étapes: Utiliser Vyxo → Clients adorent → MRR à vie
- Call-out vert: "Votre expertise + Notre techno"

**Fichiers:**

- `components/partners/solution-section.tsx`

---

#### LP-PARTNER-04: Tableau 3 Formules

**Objectif:** Présenter les 3 modèles de partenariat

- **Revenue Share:** 0€, 30% commission, 5 clients max
- **Licence Pro:** 200€/mois, marge client, 10 clients max ⭐
- **All-In:** 500€/mois, white-label, illimité

**Fichiers:**

- `components/partners/pricing-formulas.tsx`
- `lib/data/partner-formulas.ts`

---

### PHASE 2: SOCIAL PROOF & FEATURES (35%)

#### LP-PARTNER-05: Cas Concret Thomas

**Objectif:** Prouver avec un cas réel

- Profil: Thomas D., consultant GDP, 8 ans XP
- Avant: 90K€/an, missions 20-25K€
- Après: 165K€/an (+83%), MRR 400€/mois
- Citation testimonial + photo

**Fichiers:**

- `components/partners/case-study-thomas.tsx`
- `lib/data/partner-testimonials.ts`

---

#### LP-PARTNER-06: Features Incluses

**Objectif:** Montrer la valeur concrète

- Colonne 1: Plateforme (dashboard, modules, LMS, docs)
- Colonne 2: Accompagnement (formation 2j, templates, support, sales enablement)

**Fichiers:**

- `components/partners/features-section.tsx`

---

#### LP-PARTNER-07: Timeline Parcours

**Objectif:** Rassurer sur le processus

- Étape 1: Candidature (Aujourd'hui)
- Étape 2: Onboarding (Semaine 1)
- Étape 3: Première mission (Mois 1-2)
- Étape 4: Montée en charge (Mois 3-6)
- Étape 5: Autonomie (Mois 6+)

**Fichiers:**

- `components/partners/journey-timeline.tsx`

---

#### LP-PARTNER-08: FAQ Partenaires

**Objectif:** Lever les objections

- 10 questions clés (tech, circumvention, vente SaaS, formules, branding, MRR, contrat, billing, etc.)

**Fichiers:**

- `components/partners/faq-partners.tsx`
- `lib/data/faq-partners.ts`

---

### PHASE 3: CONVERSION & CRM (25%)

#### LP-PARTNER-09: Critères de Sélection

**Objectif:** Filtrer et valoriser l'exclusivité

- Profil idéal (XP, CA, clients, mindset)
- Profil NON compatible
- Call-out: "On ne recrute pas tout le monde"

**Fichiers:**

- `components/partners/criteria-section.tsx`

---

#### LP-PARTNER-10: Formulaire Candidature

**Objectif:** Qualifier les prospects

- Section 1: Infos de base
- Section 2: Votre activité (statut, XP, spécialisations)
- Section 3: Portfolio (clients, missions, CA)
- Section 4: Projet (formule, motivation, volume)
- Section 5: Disponibilité

**Fichiers:**

- `components/partners/application-form.tsx`
- `lib/schemas/partner-application.schema.ts`
- `app/api/partners/apply/route.ts`

---

#### LP-PARTNER-11: CTA Final + Réassurance

**Objectif:** Dernière conversion

- Stats: 3 partenaires, 12 clients, 165K€ CA moyen
- CTA primaire + CTA Calendly
- Bandeau certifications et engagements

**Fichiers:**

- `components/partners/cta-final.tsx`
- `components/partners/reassurance-footer.tsx`

---

#### LP-PARTNER-12: Logiques CRM & Analytics

**Objectif:** Tracking et automation

- Tags CRM par formule
- Scoring candidature (profil idéal vs non)
- Workflows email (confirmation, relance, nurturing)
- Events analytics (scroll, hover formules, FAQ, abandon)

**Fichiers:**

- `lib/services/partner-scoring.ts`
- `lib/services/partner-crm.ts`

---

## 🏗️ ARCHITECTURE TECHNIQUE

```
app/
├── (marketing)/
│   └── partners/
│       └── page.tsx          # Landing partenaires
│
components/
├── partners/
│   ├── hero-section.tsx
│   ├── problem-section.tsx
│   ├── solution-section.tsx
│   ├── pricing-formulas.tsx
│   ├── case-study-thomas.tsx
│   ├── features-section.tsx
│   ├── journey-timeline.tsx
│   ├── faq-partners.tsx
│   ├── criteria-section.tsx
│   ├── application-form.tsx
│   ├── cta-final.tsx
│   └── reassurance-footer.tsx
│
lib/
├── data/
│   ├── partner-formulas.ts
│   ├── partner-testimonials.ts
│   └── faq-partners.ts
│
├── schemas/
│   └── partner-application.schema.ts
│
├── services/
│   ├── partner-scoring.ts
│   └── partner-crm.ts
│
app/api/
└── partners/
    └── apply/
        └── route.ts
```

---

## 📝 NOTES IMPORTANTES

### Ton & Voice

- **Pair à pair** (consultant → consultant)
- **Tutoiement** entre professionnels
- **Transparence totale** (pas de bullshit)
- **Pragmatique et cash**

### Copywriting Guidelines

- ❌ Éviter: "Revenus passifs", "Devenez riche", hype MLM
- ✅ Utiliser: "Soyons honnêtes...", "Concrètement...", chiffres réels

### Métriques Cibles

- 100 visites/mois
- 15% conversion formulaire
- 3-5 partenaires validés/trimestre
- Profil idéal: XP >5 ans, CA >80K€, 3+ clients

---

## 🚀 PRÊT À DÉMARRER ?

Une fois ce plan validé, on attaque LP-PARTNER-01 !

🐓
