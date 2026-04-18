
The user picked Option 1 (convert CSV → TS once, commit it). They uploaded `05_Caracteristiques.csv` — banking products/contracts per client. Filename "05_" suggests it's sheet 5 of a multi-sheet workbook, so other sheets (client identity, meetings, transcripts) likely exist. The CSV has rich product data but no names/segments/RMs.

## Where mock data currently lives

`src/lib/mock-data.ts` is the single source. It exports `currentClient`, `otherLiveMeetings`, `scriptedTranscript` — consumed by `meeting.tsx`, `CopilotPanel.tsx`, `ClientMindmapModal.tsx` and forwarded to the AI edge functions.

## What I'll do

1. Commit the CSV at `src/data/caracteristiques.csv`.
2. Extend types in `mock-data.ts` with a `Contract` type and add `contracts: Contract[]` to `Client`, so each client carries their real portfolio (CC, Livret A, AV, PEA, crédit immo, cartes…).
3. Generate `mock-data.ts` from the CSV:
   - Group rows by `client_id`, parse French decimals (`"1,9"` → `1.9`).
   - Compute AUM = sum of savings ceilings + AV/PEA balance proxies − loan CRD; format as `€ X.XX M`.
   - Pick one client as `currentClient`, populate the cockpit (`otherLiveMeetings`) with the next 3–4.
   - Keep `scriptedTranscript` unchanged unless you upload one.
4. Pass `contracts` into the prompts in `client-mindmap/index.ts` and `copilot/index.ts` so AI suggestions cite real products (AV allocations, mortgage rate, PEA, etc.) — this is the big quality boost.
5. No new dependencies, no runtime parsing — pure compile-time data.

## Two things I need from you

**A. Other sheets?** The "05_" prefix suggests sheets 01–04 hold client identity, meetings, transcripts. Pick one:
- **Upload the rest** — I'll wait and wire everything in one pass (best result).
- **Use this sheet only** — I'll synthesize plausible names/RM/segment for the demo.
- **Paste identity inline** — you drop a few rows of `client_id, name, segment, rm, email` in chat.

**B. Which client should be "current" on /meeting?**
- **CLI00003** — AV, AV2, PEA, CTO, Carte Infinite (wealthy private-banking profile).
- **CLI00002** — PEL, AV, crédit immo, Carte Gold (classic family with mortgage).
- **Auto-pick** — I choose the richest, most diverse portfolio.

Reply with your choice for A and B and I'll build it.
