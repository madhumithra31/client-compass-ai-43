

## Current state

The middle panel ("Cockpit de supervision") shows two things, neither tied to the selected client:
1. `DashboardKpis` — 4 generic KPIs aggregated from `otherLiveMeetings`
2. `LiveMeetingsTable` — static table of 4 OTHER advisors' meetings

Meanwhile the `Client` type in `mock-data.ts` carries a LOT of detail we never surface: full `positions[]` per contract, `totalAssets`/`totalDebt`/`netWorth`, `annualRevenue` + `tmi`, `equipmentScore`, `recentEvents[]`, `projects[]` with horizons, `family` with housing value, asset allocation per contract (`allocFondsEuro`/`allocUC`), credit details (`crd`, `monthly`, `rate`, `maturity`), etc.

The left `ClientCard` is already a dense vertical summary. The middle panel should be the **deep, visual, working view** of that same client — what the advisor actually looks at during the meeting.

## Proposal — replace the cockpit with a "Client 360°" workspace

Convert the middle panel into a tabbed dashboard for the **currently selected client**. Header keeps the live indicator. Body becomes:

**Top strip — Patrimoine en un coup d'œil (always visible)**
4 KPI tiles computed from the selected client:
- **Patrimoine net** — `netWorth` (with totalAssets / totalDebt breakdown underneath)
- **Revenus annuels** — `annualRevenue` + `TMI %` badge
- **Équipement** — `equipmentScore`/10 with progress bar (vs. segment average)
- **Ancienneté** — `seniorityYears` years + `clientSinceDate`

**Tabbed content below** (default = Patrimoine):

1. **Patrimoine** — Stacked horizontal bar of asset allocation across all contracts (Fonds €, UC, immobilier, dette), then a sortable table of contracts (label, family, balance, allocation €/UC %, maturity). Drill-in row expands to show top positions (`positions[]` with ISIN, valuation, weight).

2. **Projets & Vie** — Timeline of `projects[]` ordered by `horizonYears` with target amounts, plus a `family` card (spouse, children ages, housing, residence value). Highlights priority "Haute" projects.

3. **Activité récente** — Vertical timeline from `recentEvents[]` (date, type, channel, criticality color). Most recent on top. This is the "what's happened with this client" view the advisor needs going into the meeting.

4. **Risques & Opportunités** — Computed signals from the data:
   - Liquidity ratio (cash contracts vs. total)
   - Concentration risk (top 3 positions weight)
   - Tax optimization windows (high TMI + unused PER, livret saturation)
   - Maturity alerts (contracts maturing < 12 months)
   - Equipment gaps vs. segment

The tabs all switch in-place, no route change. When the advisor changes the client in the dropdown, the entire middle panel reactively re-renders for the new client (the data is already on `clients[selectedClientId]`).

## What happens to the old content

- `DashboardKpis` + `LiveMeetingsTable` + `MiniSentiment` + `Kpi` helpers — **deleted** (the supervisor view of "other RMs' meetings" doesn't fit a single-RM workflow). 
- `otherLiveMeetings` import — removed from `meeting.tsx`. Stays in `mock-data.ts` in case we re-introduce a supervisor route later.

If you want to **keep** the multi-meeting supervisor view, alternative: move it to a separate `/cockpit` route and make `/meeting` purely client-focused. Tell me and I'll do that instead.

## Files touched

- `src/routes/meeting.tsx` — replace the middle `<section>` body and its helper components with new ones (`ClientKpiStrip`, `ClientWorkspaceTabs`, `PatrimoineTab`, `ProjetsTab`, `ActiviteTab`, `RisquesTab`). ~250 lines net change in one file.

No new dependencies (we already have `framer-motion`, `lucide-react`, and SVG charts inline). No backend/data changes — all fields are already in the `Client` type and CSVs.

## Out of scope

- Editing contract/position values inline (read-only view).
- Real-time updates to client data during the meeting (the live stuff stays in left/right panels: sentiment, alerts, transcript-driven insights).
- Adding more CSV fields — using only what's already loaded.

