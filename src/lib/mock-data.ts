// AUTO-GENERATED from src/data/*.csv (Excel workbook). Do NOT hand-edit.
// Regenerate with /tmp/gen_mock.py against the source workbook.

export type Position = {
  id: string;
  isin: string | null;
  label: string | null;
  assetClass: string | null;
  geo: string | null;
  sector: string | null;
  currency: string | null;
  valuation: number | null;
  weight: number | null;
};

export type Contract = {
  id: string;
  code: string;
  label: string;
  family: string | null;
  openingDate: string | null;
  status: string | null;
  balance: number | null;
  currency: string | null;
  rate: number | null;
  ceiling: number | null;
  maturity: string | null;
  monthly: number | null;
  crd: number | null;
  durationMonths: number | null;
  beneficiary: string | null;
  allocFondsEuro: number | null;
  allocUC: number | null;
  fiscalYears: number | null;
  cardLimit: number | null;
  guarantees: string | null;
  positions: Position[];
};

export type Project = {
  label: string;
  horizonYears: number | null;
  targetAmount: number | null;
  priority: string | null;
  declaredAt: string | null;
};

export type Family = {
  status: string | null;
  matrimonial: string | null;
  spouse: string | null;
  spouseAge: number | null;
  childrenAges: number[];
  dependents: number;
  housing: string | null;
  residenceYear: number | null;
  residenceValue: number | null;
};

export type ClientEvent = {
  date: string | null;
  type: string | null;
  category: string | null;
  description: string | null;
  channel: string | null;
  criticality: string | null;
};

export type Client = {
  id: string;
  name: string;
  firstName: string;
  lastName: string;
  initials: string;
  archetype: string | null;
  segment: string;
  segmentationRaw: string | null;
  aum: string;
  totalAssets: number;
  totalDebt: number;
  netWorth: number;
  riskProfile: "Conservative" | "Balanced" | "Dynamic" | "Aggressive";
  rm: string | null;
  agency: string | null;
  email: string | null;
  phone: string;
  age: number | null;
  birthDate: string | null;
  city: string | null;
  address: string | null;
  postalCode: string | null;
  profession: string | null;
  lifeStage: string | null;
  annualRevenue: number | null;
  tmi: number | null;
  marketSensitivity: string | null;
  seniorityYears: number | null;
  clientSinceDate: string | null;
  preferredChannel: string | null;
  equipmentScore: number | null;
  tags: string[];
  family: Family | null;
  projects: Project[];
  contracts: Contract[];
  recentEvents: ClientEvent[];
};

export const clients: Record<string, Client> = {
    "CLI00001": {
      "id": "CLI00001",
      "name": "M. Jean Lefèvre",
      "firstName": "Jean",
      "lastName": "Lefèvre",
      "initials": "JL",
      "archetype": "Jeune actif célibataire",
      "segment": "Banque de Détail",
      "segmentationRaw": "Particulier Standard",
      "aum": "€ 22 k",
      "totalAssets": 22630,
      "totalDebt": 0,
      "netWorth": 22630,
      "riskProfile": "Balanced",
      "rm": "Sophie MARTIN",
      "agency": "Paris Haussmann",
      "email": "jean.lefèvre@example.fr",
      "phone": "+33 6 83 19 78 57 ",
      "age": 28,
      "birthDate": "1998-04-08",
      "city": "Montpellier",
      "address": "23 rue Pasteur",
      "postalCode": "34000",
      "profession": "Cadre junior",
      "lifeStage": "Début de carrière",
      "annualRevenue": 37286.0,
      "tmi": 11,
      "marketSensitivity": "Moyenne",
      "seniorityYears": 4.2,
      "clientSinceDate": "2022-02-01",
      "preferredChannel": "App mobile",
      "equipmentScore": 5,
      "tags": [
        "Jeune actif célibataire"
      ],
      "family": {
        "status": "Célibataire",
        "matrimonial": null,
        "spouse": null,
        "spouseAge": null,
        "childrenAges": [],
        "dependents": 0,
        "housing": "Locataire",
        "residenceYear": null,
        "residenceValue": null
      },
      "projects": [
        {
          "label": "Constitution épargne de précaution",
          "horizonYears": 2,
          "targetAmount": 200000.0,
          "priority": "Haute",
          "declaredAt": "2024-10-22"
        },
        {
          "label": "Préparation achat immobilier",
          "horizonYears": 11,
          "targetAmount": 100000.0,
          "priority": "Haute",
          "declaredAt": "2023-12-27"
        }
      ],
      "contracts": [
        {
          "id": "CTR00001",
          "code": "CC",
          "label": "Compte courant",
          "family": "Compte",
          "openingDate": "2023-11-10",
          "status": "Actif",
          "balance": 10875.08,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00002",
          "code": "LivretA",
          "label": "Livret A",
          "family": "Épargne réglementée",
          "openingDate": "2023-07-20",
          "status": "Actif",
          "balance": 4955.1,
          "currency": "EUR",
          "rate": 3.0,
          "ceiling": 22950.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00003",
          "code": "LDDS",
          "label": "LDDS",
          "family": "Épargne réglementée",
          "openingDate": "2023-11-06",
          "status": "Actif",
          "balance": 3491.39,
          "currency": "EUR",
          "rate": 3.0,
          "ceiling": 12000.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00004",
          "code": "AV_debut",
          "label": "Assurance-vie débutant",
          "family": "Assurance-vie",
          "openingDate": "2024-04-21",
          "status": "Actif",
          "balance": 3308.78,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": "Mes enfants vivants ou représentés par parts égales à défaut mes héritiers légaux",
          "allocFondsEuro": 90.0,
          "allocUC": 10.0,
          "fiscalYears": 1.9,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00001",
              "isin": "FR0010000011",
              "label": "Fonds € Sécurité Plus",
              "assetClass": "Fonds €",
              "geo": "France",
              "sector": null,
              "currency": "EUR",
              "valuation": 2977.9,
              "weight": 90.0
            },
            {
              "id": "POS00002",
              "isin": "FR0010000022",
              "label": "Fonds Actions France Croissance",
              "assetClass": "Actions",
              "geo": "France",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 330.88,
              "weight": 10.0
            }
          ]
        }
      ],
      "recentEvents": [
        {
          "date": "2025-12-15",
          "type": "Interaction conseiller",
          "category": "Suivi investissement",
          "description": "Suivi investissement via Rendez-vous agence",
          "channel": "Rendez-vous agence",
          "criticality": "Info"
        },
        {
          "date": "2025-11-02",
          "type": "Événement de vie",
          "category": "Augmentation salaire",
          "description": "Augmentation salaire détecté(e)",
          "channel": "Déclaratif / Détection",
          "criticality": "Info"
        },
        {
          "date": "2025-06-25",
          "type": "Interaction conseiller",
          "category": "Envoi documentation",
          "description": "Envoi documentation via Appel téléphonique",
          "channel": "Appel téléphonique",
          "criticality": "Info"
        },
        {
          "date": "2025-02-05",
          "type": "Interaction conseiller",
          "category": "Réclamation",
          "description": "Réclamation via Messagerie app",
          "channel": "Messagerie app",
          "criticality": "Important"
        },
        {
          "date": "2024-10-05",
          "type": "Événement de vie",
          "category": "Déménagement",
          "description": "Déménagement détecté(e)",
          "channel": "Déclaratif / Détection",
          "criticality": "À suivre"
        },
        {
          "date": "2024-08-03",
          "type": "Interaction conseiller",
          "category": "Opération exceptionnelle",
          "description": "Opération exceptionnelle via Email",
          "channel": "Email",
          "criticality": "Info"
        },
        {
          "date": "2024-02-23",
          "type": "Interaction conseiller",
          "category": "Réclamation",
          "description": "Réclamation via Email",
          "channel": "Email",
          "criticality": "Important"
        },
        {
          "date": "2023-10-22",
          "type": "Interaction conseiller",
          "category": "Suivi investissement",
          "description": "Suivi investissement via Rendez-vous agence",
          "channel": "Rendez-vous agence",
          "criticality": "Info"
        }
      ]
    },
    "CLI00002": {
      "id": "CLI00002",
      "name": "M. Stéphane Petit",
      "firstName": "Stéphane",
      "lastName": "Petit",
      "initials": "SP",
      "archetype": "Famille avec enfants propriétaire",
      "segment": "Banque de Détail",
      "segmentationRaw": "Particulier Standard",
      "aum": "€ 169 k",
      "totalAssets": 169625,
      "totalDebt": 111166,
      "netWorth": 58459,
      "riskProfile": "Balanced",
      "rm": "Karim BENALI",
      "agency": "Lyon Part-Dieu",
      "email": "stéphane.petit@example.fr",
      "phone": "+33 6 31 42 91 10 ",
      "age": 46,
      "birthDate": "1980-04-15",
      "city": "Paris",
      "address": "109 rue Jean Jaurès",
      "postalCode": "75008",
      "profession": "Cadre",
      "lifeStage": "Vie de famille",
      "annualRevenue": 84309.0,
      "tmi": 30,
      "marketSensitivity": "Moyenne",
      "seniorityYears": 9.9,
      "clientSinceDate": "2016-06-01",
      "preferredChannel": "Web",
      "equipmentScore": 3,
      "tags": [
        "Famille avec enfants propriétaire",
        "2 enfants",
        "Crédit immo",
        "SCPI"
      ],
      "family": {
        "status": "Marié(e)",
        "matrimonial": "Communauté universelle",
        "spouse": "Caroline Petit",
        "spouseAge": 42,
        "childrenAges": [
          12,
          20
        ],
        "dependents": 2,
        "housing": "Propriétaire avec crédit",
        "residenceYear": 2020,
        "residenceValue": 245561.0
      },
      "projects": [
        {
          "label": "Études des enfants",
          "horizonYears": 12,
          "targetAmount": 200000.0,
          "priority": "Basse",
          "declaredAt": "2025-11-24"
        },
        {
          "label": "Renouvellement véhicule",
          "horizonYears": 2,
          "targetAmount": 10000.0,
          "priority": "Basse",
          "declaredAt": "2025-08-30"
        },
        {
          "label": "Investissement locatif",
          "horizonYears": 4,
          "targetAmount": 100000.0,
          "priority": "Moyenne",
          "declaredAt": "2024-04-24"
        }
      ],
      "contracts": [
        {
          "id": "CTR00005",
          "code": "CC",
          "label": "Compte courant",
          "family": "Compte",
          "openingDate": "2017-03-28",
          "status": "Actif",
          "balance": 14051.5,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00006",
          "code": "LivretA",
          "label": "Livret A",
          "family": "Épargne réglementée",
          "openingDate": "2022-06-12",
          "status": "Actif",
          "balance": 11361.68,
          "currency": "EUR",
          "rate": 3.0,
          "ceiling": 22950.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00007",
          "code": "LDDS",
          "label": "LDDS",
          "family": "Épargne réglementée",
          "openingDate": "2019-05-23",
          "status": "Actif",
          "balance": 2471.58,
          "currency": "EUR",
          "rate": 3.0,
          "ceiling": 12000.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00008",
          "code": "PEL",
          "label": "Plan Épargne Logement",
          "family": "Épargne réglementée",
          "openingDate": "2020-04-30",
          "status": "Actif",
          "balance": 49043.21,
          "currency": "EUR",
          "rate": 2.32,
          "ceiling": 61200.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": 5.9,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00009",
          "code": "AV",
          "label": "Assurance-vie multisupports",
          "family": "Assurance-vie",
          "openingDate": "2020-07-23",
          "status": "Actif",
          "balance": 92697.23,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": "Clause standard",
          "allocFondsEuro": 48.0,
          "allocUC": 52.0,
          "fiscalYears": 5.7,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00003",
              "isin": "FR0010000011",
              "label": "Fonds € Sécurité Plus",
              "assetClass": "Fonds €",
              "geo": "France",
              "sector": null,
              "currency": "EUR",
              "valuation": 44494.67,
              "weight": 48.0
            },
            {
              "id": "POS00004",
              "isin": "FR0010000132",
              "label": "Fonds Matières Premières",
              "assetClass": "Matières Prem.",
              "geo": "Monde",
              "sector": "Énergie/Or",
              "currency": "EUR",
              "valuation": 33533.63,
              "weight": 36.18
            },
            {
              "id": "POS00005",
              "isin": "FR0010000110",
              "label": "SCPI Pierre Rendement",
              "assetClass": "Immobilier",
              "geo": "France",
              "sector": "Immobilier",
              "currency": "EUR",
              "valuation": 14668.93,
              "weight": 15.82
            }
          ]
        },
        {
          "id": "CTR00010",
          "code": "CreditImmo",
          "label": "Crédit immobilier",
          "family": "Crédit",
          "openingDate": "2019-05-20",
          "status": "Actif",
          "balance": -111165.74,
          "currency": "EUR",
          "rate": 1.48,
          "ceiling": null,
          "maturity": "2044-05-20",
          "monthly": 1344.7,
          "crd": 111165.74,
          "durationMonths": 300,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": "Hypothèque",
          "positions": []
        },
        {
          "id": "CTR00011",
          "code": "CarteGold",
          "label": "Carte Visa Gold",
          "family": "Moyen de paiement",
          "openingDate": "2024-06-18",
          "status": "Actif",
          "balance": 0.0,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": 6000.0,
          "guarantees": null,
          "positions": []
        }
      ],
      "recentEvents": [
        {
          "date": "2025-08-11",
          "type": "Interaction conseiller",
          "category": "Question produit",
          "description": "Question produit via Appel téléphonique",
          "channel": "Appel téléphonique",
          "criticality": "Info"
        },
        {
          "date": "2024-10-16",
          "type": "Interaction conseiller",
          "category": "Entretien annuel",
          "description": "Entretien annuel via Messagerie app",
          "channel": "Messagerie app",
          "criticality": "Info"
        },
        {
          "date": "2024-07-29",
          "type": "Interaction conseiller",
          "category": "Question produit",
          "description": "Question produit via Messagerie app",
          "channel": "Messagerie app",
          "criticality": "Info"
        },
        {
          "date": "2023-05-23",
          "type": "Événement de vie",
          "category": "Changement d'employeur",
          "description": "Changement d'employeur détecté(e)",
          "channel": "Déclaratif / Détection",
          "criticality": "Important"
        },
        {
          "date": "2023-04-26",
          "type": "Interaction conseiller",
          "category": "Question produit",
          "description": "Question produit via Messagerie app",
          "channel": "Messagerie app",
          "criticality": "Info"
        },
        {
          "date": "2023-04-08",
          "type": "Événement de vie",
          "category": "Promotion",
          "description": "Promotion détecté(e)",
          "channel": "Déclaratif / Détection",
          "criticality": "Info"
        },
        {
          "date": "2023-03-07",
          "type": "Interaction conseiller",
          "category": "Réclamation",
          "description": "Réclamation via Rendez-vous agence",
          "channel": "Rendez-vous agence",
          "criticality": "Important"
        },
        {
          "date": "2022-07-17",
          "type": "Interaction conseiller",
          "category": "Point téléphonique",
          "description": "Point téléphonique via Rendez-vous agence",
          "channel": "Rendez-vous agence",
          "criticality": "Info"
        }
      ]
    },
    "CLI00003": {
      "id": "CLI00003",
      "name": "M. Mathieu Roux",
      "firstName": "Mathieu",
      "lastName": "Roux",
      "initials": "MR",
      "archetype": "Senior patrimonial TMI élevée",
      "segment": "Banque Privée",
      "segmentationRaw": "Premier",
      "aum": "€ 753 k",
      "totalAssets": 753869,
      "totalDebt": 0,
      "netWorth": 753869,
      "riskProfile": "Dynamic",
      "rm": "Sophie MARTIN",
      "agency": "Paris Haussmann",
      "email": "mathieu.roux@example.fr",
      "phone": "+33 6 58 53 78 31 ",
      "age": 58,
      "birthDate": "1968-07-03",
      "city": "Strasbourg",
      "address": "148 rue Victor Hugo",
      "postalCode": "67000",
      "profession": "Cadre supérieur",
      "lifeStage": "Préparation retraite",
      "annualRevenue": 148427.0,
      "tmi": 41,
      "marketSensitivity": "Forte",
      "seniorityYears": 23.8,
      "clientSinceDate": "2002-07-01",
      "preferredChannel": "Agence",
      "equipmentScore": 3,
      "tags": [
        "Senior patrimonial TMI élevée",
        "2 enfants",
        "PEA",
        "CTO",
        "Carte Infinite"
      ],
      "family": {
        "status": "Marié(e)",
        "matrimonial": "Participation aux acquêts",
        "spouse": "Isabelle Roux",
        "spouseAge": 54,
        "childrenAges": [
          9,
          15
        ],
        "dependents": 2,
        "housing": "Propriétaire",
        "residenceYear": 2014,
        "residenceValue": 582554.0
      },
      "projects": [
        {
          "label": "Résidence secondaire",
          "horizonYears": 1,
          "targetAmount": 100000.0,
          "priority": "Basse",
          "declaredAt": "2025-02-23"
        },
        {
          "label": "Transmission patrimoine",
          "horizonYears": 14,
          "targetAmount": 500000.0,
          "priority": "Haute",
          "declaredAt": "2023-10-19"
        },
        {
          "label": "Préparation retraite",
          "horizonYears": 6,
          "targetAmount": 100000.0,
          "priority": "Moyenne",
          "declaredAt": "2025-11-12"
        }
      ],
      "contracts": [
        {
          "id": "CTR00012",
          "code": "CC",
          "label": "Compte courant",
          "family": "Compte",
          "openingDate": "2017-11-16",
          "status": "Actif",
          "balance": 55660.12,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00013",
          "code": "LivretA",
          "label": "Livret A",
          "family": "Épargne réglementée",
          "openingDate": "2011-08-18",
          "status": "Actif",
          "balance": 22950.0,
          "currency": "EUR",
          "rate": 3.0,
          "ceiling": 22950.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00014",
          "code": "LDDS",
          "label": "LDDS",
          "family": "Épargne réglementée",
          "openingDate": "2014-05-04",
          "status": "Actif",
          "balance": 6051.93,
          "currency": "EUR",
          "rate": 3.0,
          "ceiling": 12000.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00015",
          "code": "AV",
          "label": "Assurance-vie multisupports",
          "family": "Assurance-vie",
          "openingDate": "2013-10-05",
          "status": "Actif",
          "balance": 229174.03,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": "Conjoint à défaut enfants vivants ou représentés à défaut héritiers légaux",
          "allocFondsEuro": 74.0,
          "allocUC": 26.0,
          "fiscalYears": 12.5,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00006",
              "isin": "FR0010000011",
              "label": "Fonds € Sécurité Plus",
              "assetClass": "Fonds €",
              "geo": "France",
              "sector": null,
              "currency": "EUR",
              "valuation": 169588.78,
              "weight": 74.0
            },
            {
              "id": "POS00007",
              "isin": "FR0010000165",
              "label": "Fonds Monétaire Euro",
              "assetClass": "Monétaire",
              "geo": "Europe",
              "sector": null,
              "currency": "EUR",
              "valuation": 16368.97,
              "weight": 7.14
            },
            {
              "id": "POS00008",
              "isin": "LU0010000066",
              "label": "Fonds Actions Tech USA",
              "assetClass": "Actions",
              "geo": "États-Unis",
              "sector": "Technologie",
              "currency": "USD",
              "valuation": 3041.36,
              "weight": 1.33
            },
            {
              "id": "POS00009",
              "isin": "FR0010000022",
              "label": "Fonds Actions France Croissance",
              "assetClass": "Actions",
              "geo": "France",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 3040.84,
              "weight": 1.33
            },
            {
              "id": "POS00010",
              "isin": "FR0010000143",
              "label": "Fonds Small Caps Europe",
              "assetClass": "Actions",
              "geo": "Europe",
              "sector": "Small Caps",
              "currency": "EUR",
              "valuation": 1072.9,
              "weight": 0.47
            },
            {
              "id": "POS00011",
              "isin": "FR0010000077",
              "label": "Fonds Actions Émergents",
              "assetClass": "Actions",
              "geo": "Émergents",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 36061.17,
              "weight": 15.74
            }
          ]
        },
        {
          "id": "CTR00016",
          "code": "AV2",
          "label": "Assurance-vie multisupports n°2",
          "family": "Assurance-vie",
          "openingDate": "2004-02-11",
          "status": "Actif",
          "balance": 213610.9,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": "Clause standard",
          "allocFondsEuro": 57.0,
          "allocUC": 43.0,
          "fiscalYears": 22.1,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00012",
              "isin": "FR0010000011",
              "label": "Fonds € Sécurité Plus",
              "assetClass": "Fonds €",
              "geo": "France",
              "sector": null,
              "currency": "EUR",
              "valuation": 121758.21,
              "weight": 57.0
            },
            {
              "id": "POS00013",
              "isin": "FR0010000022",
              "label": "Fonds Actions France Croissance",
              "assetClass": "Actions",
              "geo": "France",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 38883.03,
              "weight": 18.2
            },
            {
              "id": "POS00014",
              "isin": "LU0010000066",
              "label": "Fonds Actions Tech USA",
              "assetClass": "Actions",
              "geo": "États-Unis",
              "sector": "Technologie",
              "currency": "USD",
              "valuation": 52089.72,
              "weight": 24.39
            },
            {
              "id": "POS00015",
              "isin": "FR0010000077",
              "label": "Fonds Actions Émergents",
              "assetClass": "Actions",
              "geo": "Émergents",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 879.94,
              "weight": 0.41
            }
          ]
        },
        {
          "id": "CTR00017",
          "code": "PEA",
          "label": "Plan Épargne en Actions",
          "family": "Compte-titres",
          "openingDate": "2013-09-09",
          "status": "Actif",
          "balance": 105036.01,
          "currency": "EUR",
          "rate": null,
          "ceiling": 150000.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": 12.6,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00016",
              "isin": "FR0010000143",
              "label": "Fonds Small Caps Europe",
              "assetClass": "Actions",
              "geo": "Europe",
              "sector": "Small Caps",
              "currency": "EUR",
              "valuation": 64230.58,
              "weight": 61.15
            },
            {
              "id": "POS00017",
              "isin": "FR0010000077",
              "label": "Fonds Actions Émergents",
              "assetClass": "Actions",
              "geo": "Émergents",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 32750.54,
              "weight": 31.18
            },
            {
              "id": "POS00018",
              "isin": "FR0010000022",
              "label": "Fonds Actions France Croissance",
              "assetClass": "Actions",
              "geo": "France",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 4375.85,
              "weight": 4.17
            },
            {
              "id": "POS00019",
              "isin": "FR0010000033",
              "label": "Fonds Actions Europe Value",
              "assetClass": "Actions",
              "geo": "Europe",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 3679.04,
              "weight": 3.5
            }
          ]
        },
        {
          "id": "CTR00018",
          "code": "CIF",
          "label": "Compte-titres Ordinaire",
          "family": "Compte-titres",
          "openingDate": "2013-08-17",
          "status": "Actif",
          "balance": 121386.17,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00020",
              "isin": "FR0010000088",
              "label": "Fonds Obligations Euro IG",
              "assetClass": "Obligations",
              "geo": "Europe",
              "sector": "Investment Grade",
              "currency": "EUR",
              "valuation": 18784.36,
              "weight": 15.47
            },
            {
              "id": "POS00021",
              "isin": "FR0010000022",
              "label": "Fonds Actions France Croissance",
              "assetClass": "Actions",
              "geo": "France",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 33631.35,
              "weight": 27.71
            },
            {
              "id": "POS00022",
              "isin": "LU0010000099",
              "label": "Fonds Obligations High Yield",
              "assetClass": "Obligations",
              "geo": "Monde",
              "sector": "High Yield",
              "currency": "EUR",
              "valuation": 68970.47,
              "weight": 56.82
            }
          ]
        },
        {
          "id": "CTR00019",
          "code": "CarteInfinite",
          "label": "Carte Visa Infinite",
          "family": "Moyen de paiement",
          "openingDate": "2003-07-23",
          "status": "Actif",
          "balance": 0.0,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": 15000.0,
          "guarantees": null,
          "positions": []
        }
      ],
      "recentEvents": [
        {
          "date": "2026-01-22",
          "type": "Interaction conseiller",
          "category": "Point téléphonique",
          "description": "Point téléphonique via Email",
          "channel": "Email",
          "criticality": "Info"
        },
        {
          "date": "2025-11-02",
          "type": "Événement de vie",
          "category": "Promotion",
          "description": "Promotion détecté(e)",
          "channel": "Déclaratif / Détection",
          "criticality": "Info"
        },
        {
          "date": "2025-09-15",
          "type": "Interaction conseiller",
          "category": "Entretien annuel",
          "description": "Entretien annuel via Messagerie app",
          "channel": "Messagerie app",
          "criticality": "Info"
        },
        {
          "date": "2025-05-18",
          "type": "Événement de vie",
          "category": "Vente résidence secondaire",
          "description": "Vente résidence secondaire détecté(e)",
          "channel": "Déclaratif / Détection",
          "criticality": "Info"
        },
        {
          "date": "2024-08-26",
          "type": "Interaction conseiller",
          "category": "Point téléphonique",
          "description": "Point téléphonique via Email",
          "channel": "Email",
          "criticality": "Info"
        },
        {
          "date": "2024-04-08",
          "type": "Interaction conseiller",
          "category": "Envoi documentation",
          "description": "Envoi documentation via Email",
          "channel": "Email",
          "criticality": "Info"
        },
        {
          "date": "2023-09-22",
          "type": "Interaction conseiller",
          "category": "Opération exceptionnelle",
          "description": "Opération exceptionnelle via Email",
          "channel": "Email",
          "criticality": "Info"
        },
        {
          "date": "2022-04-03",
          "type": "Interaction conseiller",
          "category": "Entretien annuel",
          "description": "Entretien annuel via Email",
          "channel": "Email",
          "criticality": "Info"
        }
      ]
    },
    "CLI00004": {
      "id": "CLI00004",
      "name": "Mme Claire Laurent",
      "firstName": "Claire",
      "lastName": "Laurent",
      "initials": "CL",
      "archetype": "Retraité patrimonial transmission",
      "segment": "Banque de Détail",
      "segmentationRaw": "Particulier Standard",
      "aum": "€ 556 k",
      "totalAssets": 556334,
      "totalDebt": 0,
      "netWorth": 556334,
      "riskProfile": "Conservative",
      "rm": "Karim BENALI",
      "agency": "Nantes Centre",
      "email": "claire.laurent@example.fr",
      "phone": "+33 6 96 97 78 37 ",
      "age": 74,
      "birthDate": "1952-04-22",
      "city": "Montpellier",
      "address": "19 rue Pasteur",
      "postalCode": "34000",
      "profession": "Retraité",
      "lifeStage": "Retraite / Transmission",
      "annualRevenue": 46374.0,
      "tmi": 30,
      "marketSensitivity": "Forte",
      "seniorityYears": 27.6,
      "clientSinceDate": "1998-09-01",
      "preferredChannel": "Agence",
      "equipmentScore": 9,
      "tags": [
        "Retraité patrimonial transmission",
        "3 enfants",
        "PEA",
        "SCPI"
      ],
      "family": {
        "status": "Veuf(ve)",
        "matrimonial": null,
        "spouse": null,
        "spouseAge": null,
        "childrenAges": [
          13,
          9,
          21
        ],
        "dependents": 3,
        "housing": "Propriétaire",
        "residenceYear": 2013,
        "residenceValue": 784004.0
      },
      "projects": [
        {
          "label": "Transmission aux enfants",
          "horizonYears": 13,
          "targetAmount": 10000.0,
          "priority": "Haute",
          "declaredAt": "2024-04-27"
        },
        {
          "label": "Donation-partage",
          "horizonYears": 4,
          "targetAmount": 200000.0,
          "priority": "Moyenne",
          "declaredAt": "2024-01-13"
        },
        {
          "label": "Optimisation succession",
          "horizonYears": 7,
          "targetAmount": 25000.0,
          "priority": "Moyenne",
          "declaredAt": "2025-11-03"
        }
      ],
      "contracts": [
        {
          "id": "CTR00020",
          "code": "CC",
          "label": "Compte courant",
          "family": "Compte",
          "openingDate": "2007-05-01",
          "status": "Actif",
          "balance": 19322.5,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00021",
          "code": "LivretA",
          "label": "Livret A",
          "family": "Épargne réglementée",
          "openingDate": "2016-07-16",
          "status": "Actif",
          "balance": 7370.45,
          "currency": "EUR",
          "rate": 3.0,
          "ceiling": 22950.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00022",
          "code": "AV",
          "label": "Assurance-vie multisupports",
          "family": "Assurance-vie",
          "openingDate": "2001-10-12",
          "status": "Actif",
          "balance": 242715.6,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": "Mes enfants vivants ou représentés par parts égales à défaut mes héritiers légaux",
          "allocFondsEuro": 37.0,
          "allocUC": 63.0,
          "fiscalYears": 24.5,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00023",
              "isin": "FR0010000011",
              "label": "Fonds € Sécurité Plus",
              "assetClass": "Fonds €",
              "geo": "France",
              "sector": null,
              "currency": "EUR",
              "valuation": 89804.77,
              "weight": 37.0
            },
            {
              "id": "POS00024",
              "isin": "FR0010000132",
              "label": "Fonds Matières Premières",
              "assetClass": "Matières Prem.",
              "geo": "Monde",
              "sector": "Énergie/Or",
              "currency": "EUR",
              "valuation": 36769.18,
              "weight": 15.15
            },
            {
              "id": "POS00025",
              "isin": "FR0010000110",
              "label": "SCPI Pierre Rendement",
              "assetClass": "Immobilier",
              "geo": "France",
              "sector": "Immobilier",
              "currency": "EUR",
              "valuation": 22380.14,
              "weight": 9.22
            },
            {
              "id": "POS00026",
              "isin": "FR0010000077",
              "label": "Fonds Actions Émergents",
              "assetClass": "Actions",
              "geo": "Émergents",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 61529.62,
              "weight": 25.35
            },
            {
              "id": "POS00027",
              "isin": "FR0010000022",
              "label": "Fonds Actions France Croissance",
              "assetClass": "Actions",
              "geo": "France",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 9767.71,
              "weight": 4.02
            },
            {
              "id": "POS00028",
              "isin": "FR0010000033",
              "label": "Fonds Actions Europe Value",
              "assetClass": "Actions",
              "geo": "Europe",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 22464.17,
              "weight": 9.26
            }
          ]
        },
        {
          "id": "CTR00023",
          "code": "AV2",
          "label": "Assurance-vie multisupports n°2",
          "family": "Assurance-vie",
          "openingDate": "2015-12-12",
          "status": "Actif",
          "balance": 227891.04,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": "Mes enfants vivants ou représentés par parts égales à défaut mes héritiers légaux",
          "allocFondsEuro": 32.0,
          "allocUC": 68.0,
          "fiscalYears": 10.3,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00029",
              "isin": "FR0010000011",
              "label": "Fonds € Sécurité Plus",
              "assetClass": "Fonds €",
              "geo": "France",
              "sector": null,
              "currency": "EUR",
              "valuation": 72925.13,
              "weight": 32.0
            },
            {
              "id": "POS00030",
              "isin": "FR0010000022",
              "label": "Fonds Actions France Croissance",
              "assetClass": "Actions",
              "geo": "France",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 19929.3,
              "weight": 8.75
            },
            {
              "id": "POS00031",
              "isin": "FR0010000110",
              "label": "SCPI Pierre Rendement",
              "assetClass": "Immobilier",
              "geo": "France",
              "sector": "Immobilier",
              "currency": "EUR",
              "valuation": 26597.08,
              "weight": 11.67
            },
            {
              "id": "POS00032",
              "isin": "LU0010000154",
              "label": "Fonds Actions Santé Monde",
              "assetClass": "Actions",
              "geo": "Monde",
              "sector": "Santé",
              "currency": "EUR",
              "valuation": 67174.04,
              "weight": 29.48
            },
            {
              "id": "POS00033",
              "isin": "FR0010000132",
              "label": "Fonds Matières Premières",
              "assetClass": "Matières Prem.",
              "geo": "Monde",
              "sector": "Énergie/Or",
              "currency": "EUR",
              "valuation": 9728.67,
              "weight": 4.27
            },
            {
              "id": "POS00034",
              "isin": "IE0010000055",
              "label": "ETF Indiciel Monde Dist.",
              "assetClass": "Actions",
              "geo": "Monde",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 31536.82,
              "weight": 13.84
            }
          ]
        },
        {
          "id": "CTR00024",
          "code": "PEA",
          "label": "Plan Épargne en Actions",
          "family": "Compte-titres",
          "openingDate": "2016-12-26",
          "status": "Actif",
          "balance": 59034.69,
          "currency": "EUR",
          "rate": null,
          "ceiling": 150000.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": 9.3,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00035",
              "isin": "FR0010000033",
              "label": "Fonds Actions Europe Value",
              "assetClass": "Actions",
              "geo": "Europe",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 25628.74,
              "weight": 43.41
            },
            {
              "id": "POS00036",
              "isin": "FR0010000022",
              "label": "Fonds Actions France Croissance",
              "assetClass": "Actions",
              "geo": "France",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 1358.21,
              "weight": 2.3
            },
            {
              "id": "POS00037",
              "isin": "FR0010000143",
              "label": "Fonds Small Caps Europe",
              "assetClass": "Actions",
              "geo": "Europe",
              "sector": "Small Caps",
              "currency": "EUR",
              "valuation": 26708.95,
              "weight": 45.24
            },
            {
              "id": "POS00038",
              "isin": "FR0010000077",
              "label": "Fonds Actions Émergents",
              "assetClass": "Actions",
              "geo": "Émergents",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 5338.78,
              "weight": 9.04
            }
          ]
        }
      ],
      "recentEvents": [
        {
          "date": "2025-08-16",
          "type": "Interaction conseiller",
          "category": "Envoi documentation",
          "description": "Envoi documentation via Messagerie app",
          "channel": "Messagerie app",
          "criticality": "Info"
        },
        {
          "date": "2023-07-22",
          "type": "Événement de vie",
          "category": "Rachat partiel AV",
          "description": "Rachat partiel AV détecté(e)",
          "channel": "Déclaratif / Détection",
          "criticality": "À suivre"
        },
        {
          "date": "2022-08-16",
          "type": "Interaction conseiller",
          "category": "Opération exceptionnelle",
          "description": "Opération exceptionnelle via Appel téléphonique",
          "channel": "Appel téléphonique",
          "criticality": "Info"
        },
        {
          "date": "2022-06-10",
          "type": "Événement de vie",
          "category": "Décès conjoint",
          "description": "Décès conjoint détecté(e)",
          "channel": "Déclaratif / Détection",
          "criticality": "Info"
        },
        {
          "date": "2021-12-02",
          "type": "Événement de vie",
          "category": "Donation à enfant",
          "description": "Donation à enfant détecté(e)",
          "channel": "Déclaratif / Détection",
          "criticality": "Important"
        },
        {
          "date": "2021-08-08",
          "type": "Interaction conseiller",
          "category": "Réclamation",
          "description": "Réclamation via Appel téléphonique",
          "channel": "Appel téléphonique",
          "criticality": "Important"
        },
        {
          "date": "2021-05-29",
          "type": "Interaction conseiller",
          "category": "Réclamation",
          "description": "Réclamation via Rendez-vous agence",
          "channel": "Rendez-vous agence",
          "criticality": "Important"
        },
        {
          "date": "2020-12-13",
          "type": "Interaction conseiller",
          "category": "Envoi documentation",
          "description": "Envoi documentation via Email",
          "channel": "Email",
          "criticality": "Info"
        }
      ]
    },
    "CLI00005": {
      "id": "CLI00005",
      "name": "M. Marc Girard",
      "firstName": "Marc",
      "lastName": "Girard",
      "initials": "MG",
      "archetype": "Profession libérale établie",
      "segment": "Banque de Détail",
      "segmentationRaw": "Particulier Standard",
      "aum": "€ 477 k",
      "totalAssets": 477896,
      "totalDebt": 249222,
      "netWorth": 228674,
      "riskProfile": "Dynamic",
      "rm": "Nadia CHEVALIER",
      "agency": "Lille Grand Place",
      "email": "marc.girard@example.fr",
      "phone": "+33 6 63 84 34 26 ",
      "age": 49,
      "birthDate": "1977-01-08",
      "city": "Nantes",
      "address": "69 rue de la République",
      "postalCode": "44000",
      "profession": "Profession libérale",
      "lifeStage": "Consolidation patrimoniale",
      "annualRevenue": 138857.0,
      "tmi": 41,
      "marketSensitivity": "Faible",
      "seniorityYears": 10.3,
      "clientSinceDate": "2016-01-01",
      "preferredChannel": "Web",
      "equipmentScore": 9,
      "tags": [
        "Profession libérale établie",
        "2 enfants",
        "PER",
        "PEA",
        "CTO",
        "Crédit immo",
        "Carte Infinite",
        "SCPI",
        "ESG"
      ],
      "family": {
        "status": "Marié(e)",
        "matrimonial": "Participation aux acquêts",
        "spouse": "Caroline Girard",
        "spouseAge": 54,
        "childrenAges": [
          5,
          9
        ],
        "dependents": 2,
        "housing": "Propriétaire avec crédit",
        "residenceYear": 2022,
        "residenceValue": 458607.0
      },
      "projects": [
        {
          "label": "Investissement locatif",
          "horizonYears": 1,
          "targetAmount": 500000.0,
          "priority": "Basse",
          "declaredAt": "2023-05-01"
        },
        {
          "label": "Études des enfants",
          "horizonYears": 2,
          "targetAmount": 25000.0,
          "priority": "Haute",
          "declaredAt": "2025-07-11"
        },
        {
          "label": "Préparation retraite",
          "horizonYears": 4,
          "targetAmount": 10000.0,
          "priority": "Moyenne",
          "declaredAt": "2023-10-18"
        }
      ],
      "contracts": [
        {
          "id": "CTR00025",
          "code": "CC",
          "label": "Compte courant",
          "family": "Compte",
          "openingDate": "2018-05-10",
          "status": "Actif",
          "balance": 28928.54,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00026",
          "code": "LivretA",
          "label": "Livret A",
          "family": "Épargne réglementée",
          "openingDate": "2020-10-26",
          "status": "Actif",
          "balance": 22950.0,
          "currency": "EUR",
          "rate": 3.0,
          "ceiling": 22950.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00027",
          "code": "LDDS",
          "label": "LDDS",
          "family": "Épargne réglementée",
          "openingDate": "2022-10-20",
          "status": "Actif",
          "balance": 7485.17,
          "currency": "EUR",
          "rate": 3.0,
          "ceiling": 12000.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00028",
          "code": "AV",
          "label": "Assurance-vie multisupports",
          "family": "Assurance-vie",
          "openingDate": "2021-03-19",
          "status": "Actif",
          "balance": 127192.92,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": "Conjoint à défaut enfants vivants ou représentés à défaut héritiers légaux",
          "allocFondsEuro": 63.0,
          "allocUC": 37.0,
          "fiscalYears": 5.0,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00039",
              "isin": "FR0010000011",
              "label": "Fonds € Sécurité Plus",
              "assetClass": "Fonds €",
              "geo": "France",
              "sector": null,
              "currency": "EUR",
              "valuation": 80131.54,
              "weight": 63.0
            },
            {
              "id": "POS00040",
              "isin": "FR0010000132",
              "label": "Fonds Matières Premières",
              "assetClass": "Matières Prem.",
              "geo": "Monde",
              "sector": "Énergie/Or",
              "currency": "EUR",
              "valuation": 493.72,
              "weight": 0.39
            },
            {
              "id": "POS00041",
              "isin": "FR0010000033",
              "label": "Fonds Actions Europe Value",
              "assetClass": "Actions",
              "geo": "Europe",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 21827.04,
              "weight": 17.16
            },
            {
              "id": "POS00042",
              "isin": "LU0010000066",
              "label": "Fonds Actions Tech USA",
              "assetClass": "Actions",
              "geo": "États-Unis",
              "sector": "Technologie",
              "currency": "USD",
              "valuation": 24740.62,
              "weight": 19.45
            }
          ]
        },
        {
          "id": "CTR00029",
          "code": "PEA",
          "label": "Plan Épargne en Actions",
          "family": "Compte-titres",
          "openingDate": "2019-06-25",
          "status": "Actif",
          "balance": 45326.49,
          "currency": "EUR",
          "rate": null,
          "ceiling": 150000.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": 6.8,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00043",
              "isin": "FR0010000033",
              "label": "Fonds Actions Europe Value",
              "assetClass": "Actions",
              "geo": "Europe",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 35354.28,
              "weight": 78.0
            },
            {
              "id": "POS00044",
              "isin": "FR0010000022",
              "label": "Fonds Actions France Croissance",
              "assetClass": "Actions",
              "geo": "France",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 7773.13,
              "weight": 17.15
            },
            {
              "id": "POS00045",
              "isin": "FR0010000077",
              "label": "Fonds Actions Émergents",
              "assetClass": "Actions",
              "geo": "Émergents",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 2199.09,
              "weight": 4.85
            }
          ]
        },
        {
          "id": "CTR00030",
          "code": "PER",
          "label": "Plan Épargne Retraite Individuel",
          "family": "Retraite",
          "openingDate": "2023-01-23",
          "status": "Actif",
          "balance": 49448.3,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": "Conjoint à défaut héritiers légaux",
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": 3.2,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00046",
              "isin": "FR0010000088",
              "label": "Fonds Obligations Euro IG",
              "assetClass": "Obligations",
              "geo": "Europe",
              "sector": "Investment Grade",
              "currency": "EUR",
              "valuation": 11441.6,
              "weight": 23.14
            },
            {
              "id": "POS00047",
              "isin": "FR0010000077",
              "label": "Fonds Actions Émergents",
              "assetClass": "Actions",
              "geo": "Émergents",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 5757.68,
              "weight": 11.64
            },
            {
              "id": "POS00048",
              "isin": "LU0010000044",
              "label": "Fonds Actions Monde ESG",
              "assetClass": "Actions",
              "geo": "Monde",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 1291.82,
              "weight": 2.61
            },
            {
              "id": "POS00049",
              "isin": "FR0010000033",
              "label": "Fonds Actions Europe Value",
              "assetClass": "Actions",
              "geo": "Europe",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 6784.53,
              "weight": 13.72
            },
            {
              "id": "POS00050",
              "isin": "FR0010000011",
              "label": "Fonds € Sécurité Plus",
              "assetClass": "Fonds €",
              "geo": "France",
              "sector": null,
              "currency": "EUR",
              "valuation": 347.33,
              "weight": 0.7
            },
            {
              "id": "POS00051",
              "isin": "FR0010000143",
              "label": "Fonds Small Caps Europe",
              "assetClass": "Actions",
              "geo": "Europe",
              "sector": "Small Caps",
              "currency": "EUR",
              "valuation": 23825.34,
              "weight": 48.18
            }
          ]
        },
        {
          "id": "CTR00031",
          "code": "CIF",
          "label": "Compte-titres Ordinaire",
          "family": "Compte-titres",
          "openingDate": "2024-12-26",
          "status": "Actif",
          "balance": 196564.43,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00052",
              "isin": "LU0010000154",
              "label": "Fonds Actions Santé Monde",
              "assetClass": "Actions",
              "geo": "Monde",
              "sector": "Santé",
              "currency": "EUR",
              "valuation": 17920.85,
              "weight": 9.12
            },
            {
              "id": "POS00053",
              "isin": "LU0010000099",
              "label": "Fonds Obligations High Yield",
              "assetClass": "Obligations",
              "geo": "Monde",
              "sector": "High Yield",
              "currency": "EUR",
              "valuation": 65006.27,
              "weight": 33.07
            },
            {
              "id": "POS00054",
              "isin": "LU0010000121",
              "label": "Fonds Diversifié Flexible",
              "assetClass": "Diversifié",
              "geo": "Monde",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 22354.65,
              "weight": 11.37
            },
            {
              "id": "POS00055",
              "isin": "FR0010000110",
              "label": "SCPI Pierre Rendement",
              "assetClass": "Immobilier",
              "geo": "France",
              "sector": "Immobilier",
              "currency": "EUR",
              "valuation": 43932.39,
              "weight": 22.35
            },
            {
              "id": "POS00056",
              "isin": "FR0010000088",
              "label": "Fonds Obligations Euro IG",
              "assetClass": "Obligations",
              "geo": "Europe",
              "sector": "Investment Grade",
              "currency": "EUR",
              "valuation": 47350.27,
              "weight": 24.09
            }
          ]
        },
        {
          "id": "CTR00032",
          "code": "CreditImmo",
          "label": "Crédit immobilier",
          "family": "Crédit",
          "openingDate": "2021-06-07",
          "status": "Actif",
          "balance": -249222.08,
          "currency": "EUR",
          "rate": 1.91,
          "ceiling": null,
          "maturity": "2036-06-07",
          "monthly": 1268.99,
          "crd": 249222.08,
          "durationMonths": 180,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": "Caution Crédit Logement",
          "positions": []
        },
        {
          "id": "CTR00033",
          "code": "CarteInfinite",
          "label": "Carte Visa Infinite",
          "family": "Moyen de paiement",
          "openingDate": "2019-08-02",
          "status": "Actif",
          "balance": 0.0,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": 15000.0,
          "guarantees": null,
          "positions": []
        }
      ],
      "recentEvents": [
        {
          "date": "2025-10-15",
          "type": "Interaction conseiller",
          "category": "Réclamation",
          "description": "Réclamation via Messagerie app",
          "channel": "Messagerie app",
          "criticality": "Important"
        },
        {
          "date": "2025-05-12",
          "type": "Interaction conseiller",
          "category": "Envoi documentation",
          "description": "Envoi documentation via Email",
          "channel": "Email",
          "criticality": "Info"
        },
        {
          "date": "2024-09-28",
          "type": "Interaction conseiller",
          "category": "Entretien annuel",
          "description": "Entretien annuel via Rendez-vous agence",
          "channel": "Rendez-vous agence",
          "criticality": "Info"
        },
        {
          "date": "2023-07-23",
          "type": "Interaction conseiller",
          "category": "Demande de simulation",
          "description": "Demande de simulation via Messagerie app",
          "channel": "Messagerie app",
          "criticality": "Info"
        },
        {
          "date": "2023-06-10",
          "type": "Événement de vie",
          "category": "Investissement locatif",
          "description": "Investissement locatif détecté(e)",
          "channel": "Déclaratif / Détection",
          "criticality": "À suivre"
        },
        {
          "date": "2023-02-15",
          "type": "Interaction conseiller",
          "category": "Question produit",
          "description": "Question produit via Rendez-vous agence",
          "channel": "Rendez-vous agence",
          "criticality": "Info"
        },
        {
          "date": "2022-11-06",
          "type": "Interaction conseiller",
          "category": "Opération exceptionnelle",
          "description": "Opération exceptionnelle via Email",
          "channel": "Email",
          "criticality": "Info"
        },
        {
          "date": "2022-06-23",
          "type": "Interaction conseiller",
          "category": "Opération exceptionnelle",
          "description": "Opération exceptionnelle via Email",
          "channel": "Email",
          "criticality": "Info"
        }
      ]
    },
    "CLI00006": {
      "id": "CLI00006",
      "name": "Mme Catherine Roux",
      "firstName": "Catherine",
      "lastName": "Roux",
      "initials": "CR",
      "archetype": "Client financièrement fragile",
      "segment": "Banque de Détail",
      "segmentationRaw": "Particulier Standard",
      "aum": "€ 3 k",
      "totalAssets": 3629,
      "totalDebt": 6931,
      "netWorth": -3302,
      "riskProfile": "Conservative",
      "rm": "Thomas LEFEBVRE",
      "agency": "Paris Haussmann",
      "email": "catherine.roux@example.fr",
      "phone": "+33 6 58 58 63 40 ",
      "age": 38,
      "birthDate": "1988-12-19",
      "city": "Bordeaux",
      "address": "57 rue Victor Hugo",
      "postalCode": "33000",
      "profession": "Employée",
      "lifeStage": "Reconstruction",
      "annualRevenue": 27509.0,
      "tmi": 11,
      "marketSensitivity": "Forte",
      "seniorityYears": 11.4,
      "clientSinceDate": "2014-12-01",
      "preferredChannel": "App mobile",
      "equipmentScore": 4,
      "tags": [
        "Client financièrement fragile",
        "2 enfants"
      ],
      "family": {
        "status": "Divorcé(e)",
        "matrimonial": null,
        "spouse": null,
        "spouseAge": null,
        "childrenAges": [
          6,
          14
        ],
        "dependents": 2,
        "housing": "Locataire",
        "residenceYear": null,
        "residenceValue": null
      },
      "projects": [
        {
          "label": "Constitution épargne de précaution",
          "horizonYears": 8,
          "targetAmount": 100000.0,
          "priority": "Haute",
          "declaredAt": "2025-06-30"
        },
        {
          "label": "Stabilisation budgétaire",
          "horizonYears": 15,
          "targetAmount": 10000.0,
          "priority": "Haute",
          "declaredAt": "2025-05-16"
        }
      ],
      "contracts": [
        {
          "id": "CTR00034",
          "code": "CC",
          "label": "Compte courant",
          "family": "Compte",
          "openingDate": "2024-12-05",
          "status": "Actif",
          "balance": 687.72,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00035",
          "code": "LivretA",
          "label": "Livret A",
          "family": "Épargne réglementée",
          "openingDate": "2020-12-21",
          "status": "Actif",
          "balance": 2941.3,
          "currency": "EUR",
          "rate": 3.0,
          "ceiling": 22950.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00036",
          "code": "CreditConso",
          "label": "Crédit à la consommation",
          "family": "Crédit",
          "openingDate": "2016-08-09",
          "status": "Actif",
          "balance": -6931.45,
          "currency": "EUR",
          "rate": 6.28,
          "ceiling": null,
          "maturity": "2019-08-09",
          "monthly": 169.27,
          "crd": 6931.45,
          "durationMonths": 36,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00037",
          "code": "CarteClassic",
          "label": "Carte Visa Classic",
          "family": "Moyen de paiement",
          "openingDate": "2019-06-27",
          "status": "Actif",
          "balance": 0.0,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": 2000.0,
          "guarantees": null,
          "positions": []
        }
      ],
      "recentEvents": [
        {
          "date": "2025-02-16",
          "type": "Interaction conseiller",
          "category": "Envoi documentation",
          "description": "Envoi documentation via Rendez-vous agence",
          "channel": "Rendez-vous agence",
          "criticality": "Info"
        },
        {
          "date": "2024-10-26",
          "type": "Alerte",
          "category": "Découvert non autorisé",
          "description": "Dépassement du plafond de découvert autorisé",
          "channel": "Système",
          "criticality": "Important"
        },
        {
          "date": "2024-07-30",
          "type": "Interaction conseiller",
          "category": "Entretien annuel",
          "description": "Entretien annuel via Messagerie app",
          "channel": "Messagerie app",
          "criticality": "Info"
        },
        {
          "date": "2024-04-02",
          "type": "Alerte",
          "category": "Découvert non autorisé",
          "description": "Dépassement du plafond de découvert autorisé",
          "channel": "Système",
          "criticality": "Important"
        },
        {
          "date": "2024-03-13",
          "type": "Interaction conseiller",
          "category": "Opération exceptionnelle",
          "description": "Opération exceptionnelle via Email",
          "channel": "Email",
          "criticality": "Info"
        },
        {
          "date": "2023-08-31",
          "type": "Alerte",
          "category": "Découvert non autorisé",
          "description": "Dépassement du plafond de découvert autorisé",
          "channel": "Système",
          "criticality": "Important"
        },
        {
          "date": "2023-08-05",
          "type": "Interaction conseiller",
          "category": "Question produit",
          "description": "Question produit via Messagerie app",
          "channel": "Messagerie app",
          "criticality": "Info"
        },
        {
          "date": "2023-08-02",
          "type": "Interaction conseiller",
          "category": "Réclamation",
          "description": "Réclamation via Appel téléphonique",
          "channel": "Appel téléphonique",
          "criticality": "Important"
        }
      ]
    },
    "CLI00007": {
      "id": "CLI00007",
      "name": "M. Xavier Dubois",
      "firstName": "Xavier",
      "lastName": "Dubois",
      "initials": "XD",
      "archetype": "Jeune diplômé entrée banque",
      "segment": "Banque de Détail",
      "segmentationRaw": "Particulier Standard",
      "aum": "€ 19 k",
      "totalAssets": 19979,
      "totalDebt": 0,
      "netWorth": 19979,
      "riskProfile": "Balanced",
      "rm": "Émilie DUPONT",
      "agency": "Lille Grand Place",
      "email": "xavier.dubois@example.fr",
      "phone": "+33 6 11 54 09 56 ",
      "age": 26,
      "birthDate": "2000-07-20",
      "city": "Rennes",
      "address": "30 rue du Général de Gaulle",
      "postalCode": "35000",
      "profession": "Cadre débutant",
      "lifeStage": "Entrée dans la vie active",
      "annualRevenue": 35668.0,
      "tmi": 11,
      "marketSensitivity": "Forte",
      "seniorityYears": 1.3,
      "clientSinceDate": "2025-01-01",
      "preferredChannel": "Web",
      "equipmentScore": 6,
      "tags": [
        "Jeune diplômé entrée banque"
      ],
      "family": {
        "status": "Célibataire",
        "matrimonial": null,
        "spouse": null,
        "spouseAge": null,
        "childrenAges": [],
        "dependents": 0,
        "housing": "Locataire",
        "residenceYear": null,
        "residenceValue": null
      },
      "projects": [
        {
          "label": "Premier véhicule",
          "horizonYears": 5,
          "targetAmount": 100000.0,
          "priority": "Basse",
          "declaredAt": "2025-12-22"
        },
        {
          "label": "Constitution épargne de précaution",
          "horizonYears": 1,
          "targetAmount": 100000.0,
          "priority": "Moyenne",
          "declaredAt": "2025-10-18"
        }
      ],
      "contracts": [
        {
          "id": "CTR00038",
          "code": "CC",
          "label": "Compte courant",
          "family": "Compte",
          "openingDate": "2025-06-19",
          "status": "Actif",
          "balance": 4458.5,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00039",
          "code": "LivretA",
          "label": "Livret A",
          "family": "Épargne réglementée",
          "openingDate": "2025-08-27",
          "status": "Actif",
          "balance": 6324.39,
          "currency": "EUR",
          "rate": 3.0,
          "ceiling": 22950.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00040",
          "code": "LDDS",
          "label": "LDDS",
          "family": "Épargne réglementée",
          "openingDate": "2025-04-16",
          "status": "Actif",
          "balance": 9195.76,
          "currency": "EUR",
          "rate": 3.0,
          "ceiling": 12000.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        }
      ],
      "recentEvents": [
        {
          "date": "2026-03-06",
          "type": "Interaction conseiller",
          "category": "Point téléphonique",
          "description": "Point téléphonique via Rendez-vous agence",
          "channel": "Rendez-vous agence",
          "criticality": "Info"
        },
        {
          "date": "2026-02-13",
          "type": "Interaction conseiller",
          "category": "Question produit",
          "description": "Question produit via Appel téléphonique",
          "channel": "Appel téléphonique",
          "criticality": "Info"
        },
        {
          "date": "2026-02-09",
          "type": "Interaction conseiller",
          "category": "Question produit",
          "description": "Question produit via Messagerie app",
          "channel": "Messagerie app",
          "criticality": "Info"
        },
        {
          "date": "2026-02-06",
          "type": "Interaction conseiller",
          "category": "Envoi documentation",
          "description": "Envoi documentation via Messagerie app",
          "channel": "Messagerie app",
          "criticality": "Info"
        },
        {
          "date": "2026-02-01",
          "type": "Interaction conseiller",
          "category": "Suivi investissement",
          "description": "Suivi investissement via Appel téléphonique",
          "channel": "Appel téléphonique",
          "criticality": "Info"
        },
        {
          "date": "2026-01-21",
          "type": "Événement de vie",
          "category": "Déménagement",
          "description": "Déménagement détecté(e)",
          "channel": "Déclaratif / Détection",
          "criticality": "Important"
        },
        {
          "date": "2026-01-14",
          "type": "Interaction conseiller",
          "category": "Opération exceptionnelle",
          "description": "Opération exceptionnelle via Appel téléphonique",
          "channel": "Appel téléphonique",
          "criticality": "Info"
        },
        {
          "date": "2025-12-31",
          "type": "Interaction conseiller",
          "category": "Demande de simulation",
          "description": "Demande de simulation via Email",
          "channel": "Email",
          "criticality": "Info"
        }
      ]
    },
    "CLI00008": {
      "id": "CLI00008",
      "name": "Mme Claire Garcia",
      "firstName": "Claire",
      "lastName": "Garcia",
      "initials": "CG",
      "archetype": "Couple primo-accédant",
      "segment": "Banque de Détail",
      "segmentationRaw": "Particulier Standard",
      "aum": "€ 66 k",
      "totalAssets": 66343,
      "totalDebt": 184991,
      "netWorth": -118649,
      "riskProfile": "Balanced",
      "rm": "Laurent MOREAU",
      "agency": "Nantes Centre",
      "email": "claire.garcia@example.fr",
      "phone": "+33 6 78 13 98 80 ",
      "age": 30,
      "birthDate": "1996-12-24",
      "city": "Marseille",
      "address": "28 rue du Général de Gaulle",
      "postalCode": "13008",
      "profession": "Cadre",
      "lifeStage": "Installation",
      "annualRevenue": 63630.0,
      "tmi": 30,
      "marketSensitivity": "Moyenne",
      "seniorityYears": 8.9,
      "clientSinceDate": "2017-06-01",
      "preferredChannel": "Agence",
      "equipmentScore": 7,
      "tags": [
        "Couple primo-accédant",
        "1 enfant",
        "Crédit immo"
      ],
      "family": {
        "status": "Pacsé(e)",
        "matrimonial": null,
        "spouse": "Thomas Roux",
        "spouseAge": 33,
        "childrenAges": [
          1
        ],
        "dependents": 1,
        "housing": "Propriétaire avec crédit",
        "residenceYear": 2015,
        "residenceValue": 539902.0
      },
      "projects": [
        {
          "label": "Équipement logement",
          "horizonYears": 1,
          "targetAmount": 200000.0,
          "priority": "Basse",
          "declaredAt": "2023-08-03"
        },
        {
          "label": "Arrivée d'enfant",
          "horizonYears": 12,
          "targetAmount": 50000.0,
          "priority": "Haute",
          "declaredAt": "2023-07-12"
        },
        {
          "label": "Finalisation achat immobilier",
          "horizonYears": 3,
          "targetAmount": 25000.0,
          "priority": "Moyenne",
          "declaredAt": "2024-06-19"
        }
      ],
      "contracts": [
        {
          "id": "CTR00041",
          "code": "CC",
          "label": "Compte courant",
          "family": "Compte",
          "openingDate": "2021-10-13",
          "status": "Actif",
          "balance": 9544.5,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00042",
          "code": "LivretA",
          "label": "Livret A",
          "family": "Épargne réglementée",
          "openingDate": "2023-12-19",
          "status": "Actif",
          "balance": 18368.26,
          "currency": "EUR",
          "rate": 3.0,
          "ceiling": 22950.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00043",
          "code": "LDDS",
          "label": "LDDS",
          "family": "Épargne réglementée",
          "openingDate": "2017-08-20",
          "status": "Actif",
          "balance": 9424.63,
          "currency": "EUR",
          "rate": 3.0,
          "ceiling": 12000.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00044",
          "code": "PEL",
          "label": "Plan Épargne Logement",
          "family": "Épargne réglementée",
          "openingDate": "2023-11-15",
          "status": "Actif",
          "balance": 24019.05,
          "currency": "EUR",
          "rate": 1.01,
          "ceiling": 61200.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": 2.4,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00045",
          "code": "AV_debut",
          "label": "Assurance-vie débutant",
          "family": "Assurance-vie",
          "openingDate": "2021-05-11",
          "status": "Actif",
          "balance": 4986.13,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": "Mes enfants vivants ou représentés par parts égales à défaut mes héritiers légaux",
          "allocFondsEuro": 82.0,
          "allocUC": 18.0,
          "fiscalYears": 4.9,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00057",
              "isin": "FR0010000011",
              "label": "Fonds € Sécurité Plus",
              "assetClass": "Fonds €",
              "geo": "France",
              "sector": null,
              "currency": "EUR",
              "valuation": 4088.63,
              "weight": 82.0
            },
            {
              "id": "POS00058",
              "isin": "LU0010000099",
              "label": "Fonds Obligations High Yield",
              "assetClass": "Obligations",
              "geo": "Monde",
              "sector": "High Yield",
              "currency": "EUR",
              "valuation": 897.5,
              "weight": 18.0
            }
          ]
        },
        {
          "id": "CTR00046",
          "code": "CreditImmo",
          "label": "Crédit immobilier",
          "family": "Crédit",
          "openingDate": "2017-09-27",
          "status": "Actif",
          "balance": -184991.44,
          "currency": "EUR",
          "rate": 2.94,
          "ceiling": null,
          "maturity": "2037-09-27",
          "monthly": 1130.09,
          "crd": 184991.44,
          "durationMonths": 240,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": "Caution Crédit Logement",
          "positions": []
        },
        {
          "id": "CTR00047",
          "code": "CarteGold",
          "label": "Carte Visa Gold",
          "family": "Moyen de paiement",
          "openingDate": "2018-11-05",
          "status": "Actif",
          "balance": 0.0,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": 6000.0,
          "guarantees": null,
          "positions": []
        }
      ],
      "recentEvents": [
        {
          "date": "2023-10-30",
          "type": "Interaction conseiller",
          "category": "Point téléphonique",
          "description": "Point téléphonique via Email",
          "channel": "Email",
          "criticality": "Info"
        },
        {
          "date": "2023-08-19",
          "type": "Interaction conseiller",
          "category": "Opération exceptionnelle",
          "description": "Opération exceptionnelle via Rendez-vous agence",
          "channel": "Rendez-vous agence",
          "criticality": "Info"
        },
        {
          "date": "2022-06-13",
          "type": "Interaction conseiller",
          "category": "Point téléphonique",
          "description": "Point téléphonique via Email",
          "channel": "Email",
          "criticality": "Info"
        },
        {
          "date": "2021-10-06",
          "type": "Interaction conseiller",
          "category": "Réclamation",
          "description": "Réclamation via Email",
          "channel": "Email",
          "criticality": "Important"
        },
        {
          "date": "2021-09-25",
          "type": "Interaction conseiller",
          "category": "Point téléphonique",
          "description": "Point téléphonique via Rendez-vous agence",
          "channel": "Rendez-vous agence",
          "criticality": "Info"
        },
        {
          "date": "2021-06-14",
          "type": "Événement de vie",
          "category": "PACS",
          "description": "PACS détecté(e)",
          "channel": "Déclaratif / Détection",
          "criticality": "À suivre"
        },
        {
          "date": "2020-11-14",
          "type": "Événement de vie",
          "category": "Achat immobilier",
          "description": "Achat immobilier détecté(e)",
          "channel": "Déclaratif / Détection",
          "criticality": "À suivre"
        },
        {
          "date": "2019-04-26",
          "type": "Interaction conseiller",
          "category": "Suivi investissement",
          "description": "Suivi investissement via Rendez-vous agence",
          "channel": "Rendez-vous agence",
          "criticality": "Info"
        }
      ]
    },
    "CLI00009": {
      "id": "CLI00009",
      "name": "Mme Valérie Martin",
      "firstName": "Valérie",
      "lastName": "Martin",
      "initials": "VM",
      "archetype": "Famille recomposée aisée",
      "segment": "Banque de Détail",
      "segmentationRaw": "Particulier Standard",
      "aum": "€ 285 k",
      "totalAssets": 285162,
      "totalDebt": 125303,
      "netWorth": 159859,
      "riskProfile": "Balanced",
      "rm": "Thomas LEFEBVRE",
      "agency": "Paris Haussmann",
      "email": "valérie.martin@example.fr",
      "phone": "+33 6 86 14 93 59 ",
      "age": 46,
      "birthDate": "1980-06-27",
      "city": "Toulouse",
      "address": "21 rue de la République",
      "postalCode": "31000",
      "profession": "Cadre supérieure",
      "lifeStage": "Recomposition / Études enfants",
      "annualRevenue": 115153.0,
      "tmi": 41,
      "marketSensitivity": "Forte",
      "seniorityYears": 13.4,
      "clientSinceDate": "2012-12-01",
      "preferredChannel": "Agence",
      "equipmentScore": 9,
      "tags": [
        "Famille recomposée aisée",
        "3 enfants",
        "PEA",
        "Crédit immo",
        "Carte Infinite"
      ],
      "family": {
        "status": "Remarié(e)",
        "matrimonial": "Participation aux acquêts",
        "spouse": "Stéphane Richard",
        "spouseAge": 45,
        "childrenAges": [
          7,
          18,
          24
        ],
        "dependents": 3,
        "housing": "Propriétaire avec crédit",
        "residenceYear": 2013,
        "residenceValue": 410922.0
      },
      "projects": [
        {
          "label": "Études des enfants",
          "horizonYears": 10,
          "targetAmount": 100000.0,
          "priority": "Basse",
          "declaredAt": "2026-03-23"
        },
        {
          "label": "Travaux résidence",
          "horizonYears": 3,
          "targetAmount": 10000.0,
          "priority": "Basse",
          "declaredAt": "2023-09-12"
        },
        {
          "label": "Préparation retraite",
          "horizonYears": 14,
          "targetAmount": 25000.0,
          "priority": "Haute",
          "declaredAt": "2023-08-18"
        }
      ],
      "contracts": [
        {
          "id": "CTR00048",
          "code": "CC",
          "label": "Compte courant",
          "family": "Compte",
          "openingDate": "2024-11-23",
          "status": "Actif",
          "balance": 30707.47,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00049",
          "code": "LivretA",
          "label": "Livret A",
          "family": "Épargne réglementée",
          "openingDate": "2013-07-09",
          "status": "Actif",
          "balance": 22950.0,
          "currency": "EUR",
          "rate": 3.0,
          "ceiling": 22950.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00050",
          "code": "LDDS",
          "label": "LDDS",
          "family": "Épargne réglementée",
          "openingDate": "2025-07-29",
          "status": "Actif",
          "balance": 7564.8,
          "currency": "EUR",
          "rate": 3.0,
          "ceiling": 12000.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00051",
          "code": "PEL",
          "label": "Plan Épargne Logement",
          "family": "Épargne réglementée",
          "openingDate": "2014-10-19",
          "status": "Actif",
          "balance": 37137.48,
          "currency": "EUR",
          "rate": 1.2,
          "ceiling": 61200.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": 11.4,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00052",
          "code": "AV",
          "label": "Assurance-vie multisupports",
          "family": "Assurance-vie",
          "openingDate": "2023-04-10",
          "status": "Actif",
          "balance": 69980.39,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": "Mes enfants vivants ou représentés par parts égales à défaut mes héritiers légaux",
          "allocFondsEuro": 36.0,
          "allocUC": 64.0,
          "fiscalYears": 3.0,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00059",
              "isin": "FR0010000011",
              "label": "Fonds € Sécurité Plus",
              "assetClass": "Fonds €",
              "geo": "France",
              "sector": null,
              "currency": "EUR",
              "valuation": 25192.94,
              "weight": 36.0
            },
            {
              "id": "POS00060",
              "isin": "FR0010000077",
              "label": "Fonds Actions Émergents",
              "assetClass": "Actions",
              "geo": "Émergents",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 14281.83,
              "weight": 20.41
            },
            {
              "id": "POS00061",
              "isin": "FR0010000165",
              "label": "Fonds Monétaire Euro",
              "assetClass": "Monétaire",
              "geo": "Europe",
              "sector": null,
              "currency": "EUR",
              "valuation": 6101.68,
              "weight": 8.72
            },
            {
              "id": "POS00062",
              "isin": "FR0010000088",
              "label": "Fonds Obligations Euro IG",
              "assetClass": "Obligations",
              "geo": "Europe",
              "sector": "Investment Grade",
              "currency": "EUR",
              "valuation": 11469.82,
              "weight": 16.39
            },
            {
              "id": "POS00063",
              "isin": "LU0010000066",
              "label": "Fonds Actions Tech USA",
              "assetClass": "Actions",
              "geo": "États-Unis",
              "sector": "Technologie",
              "currency": "USD",
              "valuation": 9208.88,
              "weight": 13.16
            },
            {
              "id": "POS00064",
              "isin": "FR0010000143",
              "label": "Fonds Small Caps Europe",
              "assetClass": "Actions",
              "geo": "Europe",
              "sector": "Small Caps",
              "currency": "EUR",
              "valuation": 3725.23,
              "weight": 5.32
            }
          ]
        },
        {
          "id": "CTR00053",
          "code": "PEA",
          "label": "Plan Épargne en Actions",
          "family": "Compte-titres",
          "openingDate": "2013-10-26",
          "status": "Actif",
          "balance": 116821.48,
          "currency": "EUR",
          "rate": null,
          "ceiling": 150000.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": 12.4,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00065",
              "isin": "FR0010000033",
              "label": "Fonds Actions Europe Value",
              "assetClass": "Actions",
              "geo": "Europe",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 104127.74,
              "weight": 89.13
            },
            {
              "id": "POS00066",
              "isin": "FR0010000022",
              "label": "Fonds Actions France Croissance",
              "assetClass": "Actions",
              "geo": "France",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 3784.37,
              "weight": 3.24
            },
            {
              "id": "POS00067",
              "isin": "FR0010000077",
              "label": "Fonds Actions Émergents",
              "assetClass": "Actions",
              "geo": "Émergents",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 8909.37,
              "weight": 7.63
            }
          ]
        },
        {
          "id": "CTR00054",
          "code": "CreditImmo",
          "label": "Crédit immobilier",
          "family": "Crédit",
          "openingDate": "2021-03-10",
          "status": "Actif",
          "balance": -125303.07,
          "currency": "EUR",
          "rate": 2.78,
          "ceiling": null,
          "maturity": "2046-03-10",
          "monthly": 2355.58,
          "crd": 125303.07,
          "durationMonths": 300,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": "Hypothèque",
          "positions": []
        },
        {
          "id": "CTR00055",
          "code": "CarteInfinite",
          "label": "Carte Visa Infinite",
          "family": "Moyen de paiement",
          "openingDate": "2019-11-23",
          "status": "Actif",
          "balance": 0.0,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": 15000.0,
          "guarantees": null,
          "positions": []
        }
      ],
      "recentEvents": [
        {
          "date": "2025-05-01",
          "type": "Interaction conseiller",
          "category": "Réclamation",
          "description": "Réclamation via Email",
          "channel": "Email",
          "criticality": "Important"
        },
        {
          "date": "2024-03-15",
          "type": "Interaction conseiller",
          "category": "Opération exceptionnelle",
          "description": "Opération exceptionnelle via Appel téléphonique",
          "channel": "Appel téléphonique",
          "criticality": "Info"
        },
        {
          "date": "2022-05-20",
          "type": "Interaction conseiller",
          "category": "Suivi investissement",
          "description": "Suivi investissement via Rendez-vous agence",
          "channel": "Rendez-vous agence",
          "criticality": "Info"
        },
        {
          "date": "2022-03-09",
          "type": "Interaction conseiller",
          "category": "Demande de simulation",
          "description": "Demande de simulation via Appel téléphonique",
          "channel": "Appel téléphonique",
          "criticality": "Info"
        },
        {
          "date": "2021-04-19",
          "type": "Interaction conseiller",
          "category": "Réclamation",
          "description": "Réclamation via Appel téléphonique",
          "channel": "Appel téléphonique",
          "criticality": "Important"
        },
        {
          "date": "2020-08-13",
          "type": "Interaction conseiller",
          "category": "Réclamation",
          "description": "Réclamation via Appel téléphonique",
          "channel": "Appel téléphonique",
          "criticality": "Important"
        },
        {
          "date": "2020-08-10",
          "type": "Événement de vie",
          "category": "Rentrée études supérieures enfant",
          "description": "Rentrée études supérieures enfant détecté(e)",
          "channel": "Déclaratif / Détection",
          "criticality": "À suivre"
        },
        {
          "date": "2020-05-05",
          "type": "Événement de vie",
          "category": "Remariage",
          "description": "Remariage détecté(e)",
          "channel": "Déclaratif / Détection",
          "criticality": "À suivre"
        }
      ]
    },
    "CLI00010": {
      "id": "CLI00010",
      "name": "M. Laurent Lefèvre",
      "firstName": "Laurent",
      "lastName": "Lefèvre",
      "initials": "LL",
      "archetype": "Expatrié de retour en France",
      "segment": "Banque de Détail",
      "segmentationRaw": "Particulier Standard",
      "aum": "€ 716 k",
      "totalAssets": 716793,
      "totalDebt": 0,
      "netWorth": 716793,
      "riskProfile": "Dynamic",
      "rm": "Nadia CHEVALIER",
      "agency": "Lyon Part-Dieu",
      "email": "laurent.lefèvre@example.fr",
      "phone": "+33 6 18 59 34 10 ",
      "age": 43,
      "birthDate": "1983-08-17",
      "city": "Toulouse",
      "address": "87 rue de la République",
      "postalCode": "31000",
      "profession": "Cadre supérieur",
      "lifeStage": "Retour expatriation",
      "annualRevenue": 119588.0,
      "tmi": 41,
      "marketSensitivity": "Forte",
      "seniorityYears": 0.7,
      "clientSinceDate": "2025-08-01",
      "preferredChannel": "Agence",
      "equipmentScore": 3,
      "tags": [
        "Expatrié de retour en France",
        "2 enfants",
        "PEA",
        "CTO",
        "SCPI",
        "ESG"
      ],
      "family": {
        "status": "Marié(e)",
        "matrimonial": "Communauté réduite aux acquêts",
        "spouse": "Sophie Lefèvre",
        "spouseAge": 41,
        "childrenAges": [
          2,
          11
        ],
        "dependents": 2,
        "housing": "Locataire",
        "residenceYear": null,
        "residenceValue": null
      },
      "projects": [
        {
          "label": "Achat immobilier à terme",
          "horizonYears": 15,
          "targetAmount": 200000.0,
          "priority": "Haute",
          "declaredAt": "2023-06-21"
        },
        {
          "label": "Réinstallation France",
          "horizonYears": 11,
          "targetAmount": 25000.0,
          "priority": "Moyenne",
          "declaredAt": "2023-12-02"
        },
        {
          "label": "Scolarisation enfants",
          "horizonYears": 10,
          "targetAmount": 10000.0,
          "priority": "Moyenne",
          "declaredAt": "2026-03-06"
        }
      ],
      "contracts": [
        {
          "id": "CTR00056",
          "code": "CC",
          "label": "Compte courant",
          "family": "Compte",
          "openingDate": "2025-08-07",
          "status": "Actif",
          "balance": 64776.83,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00057",
          "code": "LivretA",
          "label": "Livret A",
          "family": "Épargne réglementée",
          "openingDate": "2025-09-07",
          "status": "Actif",
          "balance": 11407.79,
          "currency": "EUR",
          "rate": 3.0,
          "ceiling": 22950.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00058",
          "code": "LDDS",
          "label": "LDDS",
          "family": "Épargne réglementée",
          "openingDate": "2025-08-20",
          "status": "Actif",
          "balance": 6727.65,
          "currency": "EUR",
          "rate": 3.0,
          "ceiling": 12000.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": []
        },
        {
          "id": "CTR00059",
          "code": "AV",
          "label": "Assurance-vie multisupports",
          "family": "Assurance-vie",
          "openingDate": "2025-09-28",
          "status": "Actif",
          "balance": 240798.02,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": "Clause standard",
          "allocFondsEuro": 45.0,
          "allocUC": 55.0,
          "fiscalYears": 0.5,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00068",
              "isin": "FR0010000011",
              "label": "Fonds € Sécurité Plus",
              "assetClass": "Fonds €",
              "geo": "France",
              "sector": null,
              "currency": "EUR",
              "valuation": 108359.11,
              "weight": 45.0
            },
            {
              "id": "POS00069",
              "isin": "FR0010000033",
              "label": "Fonds Actions Europe Value",
              "assetClass": "Actions",
              "geo": "Europe",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 6577.15,
              "weight": 2.73
            },
            {
              "id": "POS00070",
              "isin": "FR0010000143",
              "label": "Fonds Small Caps Europe",
              "assetClass": "Actions",
              "geo": "Europe",
              "sector": "Small Caps",
              "currency": "EUR",
              "valuation": 55924.97,
              "weight": 23.22
            },
            {
              "id": "POS00071",
              "isin": "LU0010000066",
              "label": "Fonds Actions Tech USA",
              "assetClass": "Actions",
              "geo": "États-Unis",
              "sector": "Technologie",
              "currency": "USD",
              "valuation": 69936.79,
              "weight": 29.04
            }
          ]
        },
        {
          "id": "CTR00060",
          "code": "PEA",
          "label": "Plan Épargne en Actions",
          "family": "Compte-titres",
          "openingDate": "2025-08-28",
          "status": "Actif",
          "balance": 104305.38,
          "currency": "EUR",
          "rate": null,
          "ceiling": 150000.0,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": 0.6,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00072",
              "isin": "FR0010000077",
              "label": "Fonds Actions Émergents",
              "assetClass": "Actions",
              "geo": "Émergents",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 13090.58,
              "weight": 12.55
            },
            {
              "id": "POS00073",
              "isin": "FR0010000022",
              "label": "Fonds Actions France Croissance",
              "assetClass": "Actions",
              "geo": "France",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 72968.95,
              "weight": 69.96
            },
            {
              "id": "POS00074",
              "isin": "FR0010000033",
              "label": "Fonds Actions Europe Value",
              "assetClass": "Actions",
              "geo": "Europe",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 18245.86,
              "weight": 17.49
            }
          ]
        },
        {
          "id": "CTR00061",
          "code": "CIF",
          "label": "Compte-titres Ordinaire",
          "family": "Compte-titres",
          "openingDate": "2025-08-30",
          "status": "Actif",
          "balance": 288777.28,
          "currency": "EUR",
          "rate": null,
          "ceiling": null,
          "maturity": null,
          "monthly": null,
          "crd": null,
          "durationMonths": null,
          "beneficiary": null,
          "allocFondsEuro": null,
          "allocUC": null,
          "fiscalYears": null,
          "cardLimit": null,
          "guarantees": null,
          "positions": [
            {
              "id": "POS00075",
              "isin": "LU0010000044",
              "label": "Fonds Actions Monde ESG",
              "assetClass": "Actions",
              "geo": "Monde",
              "sector": "Diversifié",
              "currency": "EUR",
              "valuation": 13053.29,
              "weight": 4.52
            },
            {
              "id": "POS00076",
              "isin": "FR0010000143",
              "label": "Fonds Small Caps Europe",
              "assetClass": "Actions",
              "geo": "Europe",
              "sector": "Small Caps",
              "currency": "EUR",
              "valuation": 30966.94,
              "weight": 10.72
            },
            {
              "id": "POS00077",
              "isin": "FR0010000110",
              "label": "SCPI Pierre Rendement",
              "assetClass": "Immobilier",
              "geo": "France",
              "sector": "Immobilier",
              "currency": "EUR",
              "valuation": 6011.99,
              "weight": 2.08
            },
            {
              "id": "POS00078",
              "isin": "FR0010000132",
              "label": "Fonds Matières Premières",
              "assetClass": "Matières Prem.",
              "geo": "Monde",
              "sector": "Énergie/Or",
              "currency": "EUR",
              "valuation": 64137.22,
              "weight": 22.21
            },
            {
              "id": "POS00079",
              "isin": "LU0010000066",
              "label": "Fonds Actions Tech USA",
              "assetClass": "Actions",
              "geo": "États-Unis",
              "sector": "Technologie",
              "currency": "USD",
              "valuation": 3066.42,
              "weight": 1.06
            },
            {
              "id": "POS00080",
              "isin": "LU0010000154",
              "label": "Fonds Actions Santé Monde",
              "assetClass": "Actions",
              "geo": "Monde",
              "sector": "Santé",
              "currency": "EUR",
              "valuation": 171541.43,
              "weight": 59.4
            }
          ]
        }
      ],
      "recentEvents": [
        {
          "date": "2026-04-01",
          "type": "Interaction conseiller",
          "category": "Réclamation",
          "description": "Réclamation via Email",
          "channel": "Email",
          "criticality": "Important"
        },
        {
          "date": "2026-02-26",
          "type": "Interaction conseiller",
          "category": "Point téléphonique",
          "description": "Point téléphonique via Messagerie app",
          "channel": "Messagerie app",
          "criticality": "Info"
        },
        {
          "date": "2026-02-05",
          "type": "Événement de vie",
          "category": "Retour en France",
          "description": "Retour en France détecté(e)",
          "channel": "Déclaratif / Détection",
          "criticality": "Important"
        },
        {
          "date": "2026-01-31",
          "type": "Interaction conseiller",
          "category": "Point téléphonique",
          "description": "Point téléphonique via Appel téléphonique",
          "channel": "Appel téléphonique",
          "criticality": "Info"
        },
        {
          "date": "2026-01-27",
          "type": "Interaction conseiller",
          "category": "Question produit",
          "description": "Question produit via Messagerie app",
          "channel": "Messagerie app",
          "criticality": "Info"
        },
        {
          "date": "2026-01-22",
          "type": "Interaction conseiller",
          "category": "Entretien annuel",
          "description": "Entretien annuel via Email",
          "channel": "Email",
          "criticality": "Info"
        },
        {
          "date": "2026-01-20",
          "type": "Interaction conseiller",
          "category": "Suivi investissement",
          "description": "Suivi investissement via Appel téléphonique",
          "channel": "Appel téléphonique",
          "criticality": "Info"
        },
        {
          "date": "2026-01-10",
          "type": "Événement de vie",
          "category": "Vente bien à l'étranger",
          "description": "Vente bien à l'étranger détecté(e)",
          "channel": "Déclaratif / Détection",
          "criticality": "À suivre"
        }
      ]
    }
  };

export const currentClient: Client = clients["CLI00005"];

// Ordered list for client switchers / lookup tables.
export const clientList: Client[] = Object.values(clients).sort((a, b) =>
  a.lastName.localeCompare(b.lastName, "fr"),
);

export const defaultClientId = "CLI00005";

export const otherLiveMeetings = [
    {
      "id": "m1",
      "client": "M. Mathieu Roux",
      "rm": "Sophie MARTIN",
      "duration": "12:34",
      "sentiment": 0.62,
      "alerts": 1
    },
    {
      "id": "m2",
      "client": "M. Marc Girard",
      "rm": "Nadia CHEVALIER",
      "duration": "08:12",
      "sentiment": 0.74,
      "alerts": 2,
      "live": true
    },
    {
      "id": "m3",
      "client": "M. Laurent Lefèvre",
      "rm": "Nadia CHEVALIER",
      "duration": "21:05",
      "sentiment": 0.38,
      "alerts": 3
    },
    {
      "id": "m4",
      "client": "Mme Claire Laurent",
      "rm": "Karim BENALI",
      "duration": "03:48",
      "sentiment": 0.81,
      "alerts": 0
    }
  ];

export type TranscriptLine = {
  speaker: "RM" | "Client";
  text: string;
  sentiment: number;
};

// Realistic private banking conversation tailored to Marc Girard (Profession libérale, Nantes, 2 enfants).
export const scriptedTranscript: TranscriptLine[] = [
  { speaker: "RM", text: "Bonjour Marc, ravi de vous retrouver. Comment se porte le cabinet ces derniers mois ?", sentiment: 0.7 },
  { speaker: "Client", text: "Bonjour Nadia. Très bien, on a eu un trimestre exceptionnel — j'ai dégagé un complément de revenus de 45 000 euros sur les honoraires.", sentiment: 0.75 },
  { speaker: "RM", text: "Excellente nouvelle. Avec votre TMI à 41%, c'est typiquement le moment de saturer le PER pour optimiser fiscalement.", sentiment: 0.78 },
  { speaker: "Client", text: "C'est exactement ce que je voulais aborder. Mon PER est à 49 000 euros, on peut aller plus loin ?", sentiment: 0.7 },
  { speaker: "RM", text: "Oui, votre plafond annuel disponible doit avoisiner 14 000 euros. Versement avant le 31 décembre pour défiscaliser sur cette année.", sentiment: 0.78 },
  { speaker: "Client", text: "Parfait. Autre sujet — l'investissement locatif à 500 000 euros qu'on évoque depuis 2023, j'aimerais relancer le dossier sur Nantes.", sentiment: 0.7 },
  { speaker: "RM", text: "Très bien. Avec votre crédit immo en cours à 1,91%, on peut étudier un montage in fine adossé à votre CTO de 196 000 euros.", sentiment: 0.75 },
  { speaker: "Client", text: "Le in fine m'intéresse, oui. Mais je suis un peu inquiet de la volatilité des marchés en ce moment, surtout sur la part actions de mon AV.", sentiment: 0.35 },
  { speaker: "RM", text: "C'est légitime. Sur votre AV, vous êtes à 37% UC dont du Tech US et de l'Europe Value — on peut sécuriser via un arbitrage progressif vers le fonds euro sur 6 mois.", sentiment: 0.6 },
  { speaker: "Client", text: "Cela me rassurerait. Et pour les enfants, Léa a 9 ans et Tom va rentrer en CP, j'aimerais ouvrir quelque chose pour eux.", sentiment: 0.7 },
  { speaker: "RM", text: "Une AV par enfant avec donation de 31 865 euros chacun en franchise de droits, c'est l'instrument idéal pour les études dans 10-15 ans.", sentiment: 0.78 },
  { speaker: "Client", text: "Excellent. Ah, j'oubliais — j'ai changé d'adresse mail principale, c'est désormais marc.girard@me.com.", sentiment: 0.6 },
];
