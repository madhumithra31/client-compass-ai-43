

## Current state

- `/dashboard` already exists but is the "Cockpit Manager" — it shows live meetings from `otherLiveMeetings` (4 fake parallel sessions). It is NOT analytics over the client portfolio.
- We have 10 fully-modeled clients in `clients` (`src/lib/mock-data.ts`), each with: `aum`, `netWorth`, `totalAssets`, `totalDebt`, `annualRevenue`, `tmi`, `equipmentScore`, `segment`, `archetype`, `rm`, `agency`, `riskProfile`, `lifeStage`, `age`, `contracts[]` (with `family` + `balance` + `allocFondsEuro`/`allocUC` + `positions[]` carrying `assetClass`/`geo`/`sector`), `projects[]`, `recentEvents[]`.
- That's plenty for a real portfolio-level dashboard — no backend, no new data needed.

## Proposal — new `/portfolio` route: "Portfolio Overview"

A separate route (keeps `/dashboard` live-meeting cockpit intact). New file `src/routes/portfolio.tsx`. Add a third entry on the home page next to "Démarrer un rendez-vous" / "Cockpit Manager".

### Layout (single scrollable page, max-w-7xl)

**1. Hero KPI strip (6 tiles)** — aggregate across all clients
- Total AUM (sum `totalAssets`)
- Total Net Worth (sum `netWorth`)
- Active Clients (count) + avg seniority
- Avg Equipment Score /10 (with progress bar)
- Total Debt under management (sum `totalDebt`)
- High-priority projects in pipeline (count where `priority === "Haute"`) + total target €

**2. Two-column row — segmentation**
- **Donut: Clients by Segment** (Banque de Détail vs Premier vs ...) — count + % AUM share
- **Donut: Clients by Risk Profile** (Conservative / Balanced / Dynamic / Aggressive)

**3. Asset allocation aggregated**
- **Stacked horizontal bar**: aggregate balance by contract `family` (Compte, Épargne réglementée, Assurance-vie, PER, Crédit, etc.) with €amount + % labels
- **Donut: Aggregate position breakdown** by `assetClass` (Fonds €, Actions, Obligations, Immobilier...) computed from all `positions[]`

**4. Top tables (two side-by-side)**
- **Top 5 clients by AUM** — name, segment, RM, AUM, equipment score, link to `/meeting?client=...`
- **Top RMs by AUM under management** — RM name, # clients, total AUM, avg equipment score

**5. Geographic & demographic breakdown**
- Bar chart: clients by `agency`
- Bar chart: clients by `lifeStage` (Début de carrière, Vie de famille, Préparation retraite, Retraite, …)

**6. Activity & opportunity signals (computed across portfolio)**
- Recent activity feed: last 8 events across ALL clients (sorted by date desc), color-coded by `criticality`, with client avatar + link
- Opportunity panel — counts of:
  - Clients with `tmi >= 30` and no PER contract (tax optimization candidates)
  - Clients with `equipmentScore <= 4` (under-equipped)
  - Contracts maturing within 12 months (sum balance)
  - Saturated Livret A holders (`balance / ceiling > 0.85`)

All charts are **inline SVG / divs with Tailwind** (donuts as SVG arcs, bars as flex divs) — same pattern as the existing meeting page, no new charting library. We already have `framer-motion` and `lucide-react`.

### Computation

A single `useMemo` at the top of the component computes all aggregates from `clientList` once. Pure helpers (`groupBy`, `sumBy`, `topN`) defined locally in the file. ~150 lines of helpers, ~400 lines of JSX.

### Navigation wiring

- Add `/portfolio` link in `src/routes/index.tsx` hero section as a third button "Vue Portefeuille".
- Add a "Portfolio" link in the `/meeting` and `/dashboard` headers next to "← Accueil" so the manager can hop between live cockpit and aggregate view.
- Each client row in the Top Clients table links to `/meeting` (we already do that pattern in `dashboard.tsx`).

### Naming

I'll call the route **"Portfolio Overview"** in English to match "Ask AI" / your recent direction, with French sub-labels for tile copy to stay consistent with the rest of the app. Tell me if you'd rather it be fully French ("Vue Portefeuille") — easy swap.

## Files

- `src/routes/portfolio.tsx` — NEW (~550 lines, single file, no new deps)
- `src/routes/index.tsx` — add a third CTA button to the hero
- `src/routes/meeting.tsx` + `src/routes/dashboard.tsx` — add a header link to `/portfolio`

## Out of scope

- Filters / date range pickers (read-only snapshot for now — can add a "by RM" filter later if you want).
- Drill-down pages per segment / per RM (would be a follow-up).
- Real backend aggregation (everything reads from the in-memory mock — same model as the rest of the app).
- Touching the existing `/dashboard` live-meeting cockpit — kept as-is so we don't lose the supervisor flow.

