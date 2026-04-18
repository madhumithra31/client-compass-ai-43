

## Workbook structure (11 sheets discovered)

The .xlsx contains **11 sheets**, each adding a layer of richness for the demo:

1. **Identity** — name, age, address, CSP, revenue, TMI, risk profile, RM (`conseiller_attitre`), agency, segmentation. Real names (Marc Girard, Mathieu Roux, Claire Laurent…) replace the synthesized ones.
2. **Family** — marital status, spouse, children ages, home ownership, residence value.
3. **Projects/Goals** — declared life projects with horizon, target amount, priority, declared date (huge for AI relevance).
4. **Contracts (overview)** — every contract with **real balances** (`encours_eur`), opening date, status. This is what was missing from sheet 5.
5. **Contract characteristics** (already wired) — rates, ceilings, AV allocations, loan terms.
6. **Positions** — line-by-line holdings inside each AV/PEA/CTO with ISIN, asset class, geography, sector, EUR valuation.
7–11. (not inspected) — likely transactions, meetings/RDV history, interactions/canal, alerts, transcripts.

## Revised plan

Replace the previous synthesized data with the real workbook. Keep the same convert-once approach (no runtime parsing).

### Step 1 — Commit the workbook + 6 source CSVs
- `src/data/01_identity.csv`, `02_family.csv`, `03_projects.csv`, `04_contracts.csv`, `05_caracteristiques.csv` (already present), `06_positions.csv`. I'll inspect sheets 7–11 during build and commit any that map to existing UI (meetings → cockpit, transactions → spending insights, transcripts → replace `scriptedTranscript`).

### Step 2 — Extend types in `src/lib/mock-data.ts`
- `Client` gains: real `name/email/phone/age/city/profession/lifeStage/revenue/tmi/seniority/agency/rm`, `family { status, spouse, children[], homeOwnership, residenceValue }`, `projects: Project[]` (label, horizon, target, priority).
- `Contract` gains: `balance` (real `encours_eur`), `openingDate`, `family`, `positions: Position[]` (when applicable).
- `Position` type added (ISIN, label, asset class, geo, sector, weight, valuation).

### Step 3 — Regenerate `src/lib/mock-data.ts` from the real CSVs
- Compute real **AUM** = sum of positive `encours_eur` (contracts), real **liabilities** = sum of negative.
- All 10 clients populated end-to-end. **Featured client auto-pick**: based on the real data, **CLI00005 Marc Girard** (Profession libérale, AUM ≈ 478k€ + crédit immo, 7 contrats incl. AV/PEA/PER/CTO, ESG fund in PER) is the richest "wealth-management story" — replaces the previously synthesized "Dr. Hélène Dufour".
- `otherLiveMeetings` populated from CLI00003 (senior patrimonial), CLI00009 (famille recomposée aisée), CLI00010 (expat retour).

### Step 4 — Update UI to surface the new data
- **Client card** (`meeting.tsx`): show real name/age/city/profession/RM, declared projects with priority badges, family snapshot.
- **Mindmap modal** (`ClientMindmapModal.tsx`): the static "Portefeuille" section becomes contracts grouped by family with real balances; add "Projets déclarés" cluster.
- No new components/deps.

### Step 5 — Feed real data to AI prompts
- `copilot/index.ts`: `CLIENT_CONTEXT` rebuilt from the real Marc Girard profile (projects + family + portfolio + positions summary).
- `client-mindmap/index.ts`: pass full client object incl. projects and top positions so the AI cites real funds, real allocations, real life projects.

### Step 6 — Inspect sheets 7–11 during build
If a meetings/transcript sheet exists, wire it into `otherLiveMeetings` and replace `scriptedTranscript` with a real conversation. If a transactions sheet exists, expose the last 5 in the client card. I'll report what I found before finalizing.

### Out of scope
- No DB, no runtime parsing, no new dependencies.
- The featured client changes from Hélène Dufour → Marc Girard (real CLI00005). If you'd rather keep a different client featured, tell me which `client_id` and I'll swap.

