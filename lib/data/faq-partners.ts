// FAQ Partenaires Vyxo - 10 questions essentielles

export interface FAQPartnerItem {
  id: string
  question: string
  answer: string
  category: "tech" | "business" | "contrat" | "support"
}

export const faqPartnersData: FAQPartnerItem[] = [
  {
    id: "not-tech",
    question: "Je ne suis pas tech, c'est compliqué à utiliser?",
    answer: "Vyxo est conçu PAR des consultants POUR des consultants. Si tu sais utiliser Excel et PowerPoint, tu sais utiliser Vyxo. Formation de 2 jours incluse + support continu. On a des partenaires de 55+ ans qui maîtrisent parfaitement l'outil.",
    category: "tech"
  },
  {
    id: "circumvention",
    question: "Mes clients vont-ils me virer pour garder juste Vyxo?",
    answer: "Non, pour 3 raisons: (1) Vyxo est un outil, pas un cabinet de conseil. On n'a pas de consultants internes. (2) Le contrat client stipule que Vyxo est fourni PAR toi. (3) Clause de non-circumvention: on ne démarche JAMAIS tes clients. Tu 'possèdes' le client.",
    category: "contrat"
  },
  {
    id: "sell-saas",
    question: "Comment je vends du SaaS si je suis consultant?",
    answer: "Tu ne vends PAS du SaaS. Tu vends ta mission de consulting, et Vyxo vient en complément naturel: 'En plus de mon accompagnement, vous aurez accès à un dashboard de suivi temps réel.' On te donne tout: pitch deck, vidéo démo, argumentaire. C'est fluide.",
    category: "business"
  },
  {
    id: "which-formula",
    question: "Quelle formule choisir?",
    answer: "Règle simple: Démarrage ou test → Revenue Share (0€ de risque). 3-5 clients actifs → Licence Pro. 10+ clients → All-In. Tu peux changer à tout moment. On te conseille lors de l'appel de qualification.",
    category: "business"
  },
  {
    id: "white-label",
    question: "Je peux utiliser Vyxo avec mon propre branding?",
    answer: "Revenue Share/Licence Pro: Co-branding (logo Vyxo + ton logo, c'est transparent). Formule All-In: White-label complet, 100% ta marque. Tes clients pensent que c'est ton outil.",
    category: "business"
  },
  {
    id: "time-to-mrr",
    question: "Combien de temps avant de générer du MRR?",
    answer: "Dès ton premier client équipé (typiquement Mois 1-2). Exemple concret: 1 client à 500€/mois en Revenue Share = 150€/mois pour toi dès le premier mois. La plupart des partenaires équipent leur premier client en moins de 6 semaines.",
    category: "business"
  },
  {
    id: "non-compete",
    question: "C'est quoi la clause de non-compete?",
    answer: "Le contrat partenaire inclut une clause de non-compete de 24 mois. Mais franchement: développer un SaaS coûte 100-200K€ et prend 2 ans. Vyxo est déjà là, mature, et évolue chaque mois. C'est ton avantage compétitif, pas ta contrainte.",
    category: "contrat"
  },
  {
    id: "pay-without-clients",
    question: "Je dois payer la licence même si je n'ai pas de clients?",
    answer: "Revenue Share: 0€ fixe, donc 0 risque. Licence Pro: 200€/mois, mais résiliable sans engagement à tout moment. On recommande d'avoir 2-3 clients avant de passer en Licence Pro. On ne te pousse pas, tu décides.",
    category: "business"
  },
  {
    id: "billing",
    question: "Comment se passe la facturation client?",
    answer: "Revenue Share/Licence Pro: Vyxo facture directement le client, tu reçois ta commission chaque mois. All-In: Tu factures toi-même tes clients au prix que tu veux, tu gardes 100% moins la licence de 500€/mois.",
    category: "business"
  },
  {
    id: "current-partners",
    question: "Combien de partenaires Vyxo a aujourd'hui?",
    answer: "On est en phase Founding Partners: 3 consultants actifs, 12 clients équipés. On recrute 10 nouveaux partenaires triés sur le volet en 2025. Tu seras parmi les premiers = avantages early adopters (tarifs préférentiels à vie, accès roadmap, co-marketing prioritaire).",
    category: "support"
  }
]
