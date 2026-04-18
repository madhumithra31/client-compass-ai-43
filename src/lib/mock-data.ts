export type Client = {
  id: string;
  name: string;
  initials: string;
  segment: string;
  aum: string;
  riskProfile: "Conservative" | "Balanced" | "Dynamic" | "Aggressive";
  joined: string;
  rm: string;
  email: string;
  phone: string;
  notes: string[];
  tags: string[];
};

export const currentClient: Client = {
  id: "CL-2024-0481",
  name: "Mme Camille Laurent",
  initials: "CL",
  segment: "Banque Privée",
  aum: "€ 4.82 M",
  riskProfile: "Balanced",
  joined: "March 2017",
  rm: "Antoine Mercier",
  email: "c.laurent@protonmail.com",
  phone: "+33 6 12 ** ** 47",
  tags: ["ESG-focused", "Real estate", "Cross-border (CH)"],
  notes: [
    "Préférence forte pour les fonds ISR.",
    "Résidence secondaire à Genève — fiscalité bilatérale revue 2024.",
    "Souhaite préparer la transmission patrimoniale (2 enfants).",
  ],
};

export const otherLiveMeetings = [
  { id: "m1", client: "M. Étienne Roche", rm: "Sophie Vidal", duration: "12:34", sentiment: 0.62, alerts: 1 },
  { id: "m2", client: "Mme Camille Laurent", rm: "Antoine Mercier", duration: "08:12", sentiment: 0.74, alerts: 2, live: true },
  { id: "m3", client: "Famille Bertin (SCI)", rm: "Karim Haddad", duration: "21:05", sentiment: 0.38, alerts: 3 },
  { id: "m4", client: "M. Olivier Dax", rm: "Élise Faure", duration: "03:48", sentiment: 0.81, alerts: 0 },
];

export type TranscriptLine = {
  speaker: "RM" | "Client";
  text: string;
  // approximate sentiment hint to seed the timeline
  sentiment: number;
};

// Realistic private banking conversation (FR/EN mix) — drip-fed to simulate live STT
export const scriptedTranscript: TranscriptLine[] = [
  { speaker: "RM", text: "Bonjour Madame Laurent, ravi de vous revoir. Comment allez-vous depuis notre dernier point en janvier ?", sentiment: 0.7 },
  { speaker: "Client", text: "Bonjour Antoine. Très bien merci. Beaucoup de choses ont bougé — j'ai vendu l'appartement de Lyon finalement.", sentiment: 0.65 },
  { speaker: "RM", text: "Excellente nouvelle. Pouvez-vous me confirmer le montant net réalisé ?", sentiment: 0.7 },
  { speaker: "Client", text: "Environ 680 000 euros nets après les frais. Je voudrais qu'on les place intelligemment, pas juste en monétaire.", sentiment: 0.6 },
  { speaker: "RM", text: "Compris. Sur votre profil équilibré, on pourrait répartir entre fonds ISR actions et obligations corporate investment grade.", sentiment: 0.7 },
  { speaker: "Client", text: "Honnêtement je suis un peu inquiète des marchés en ce moment. La volatilité me fait peur.", sentiment: 0.25 },
  { speaker: "RM", text: "C'est légitime. On peut envisager un déploiement progressif sur 6 mois pour lisser le point d'entrée.", sentiment: 0.55 },
  { speaker: "Client", text: "Cela me rassurerait davantage oui. Autre point — ma fille Léa va se marier en septembre.", sentiment: 0.75 },
  { speaker: "RM", text: "Félicitations ! C'est aussi l'occasion de revoir la planification de la transmission, notamment via une donation-partage.", sentiment: 0.8 },
  { speaker: "Client", text: "Justement, j'aimerais qu'on en parle sérieusement. Et qu'on intègre aussi mon fils Théo qui démarre une activité.", sentiment: 0.7 },
  { speaker: "RM", text: "Parfait. Je vous propose qu'on bloque une session dédiée avec notre ingénieur patrimonial la semaine prochaine.", sentiment: 0.75 },
  { speaker: "Client", text: "Très bien. Ah, j'oubliais — j'ai changé d'adresse mail principale, c'est désormais camille.laurent@me.com.", sentiment: 0.6 },
];
