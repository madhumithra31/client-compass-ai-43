

## Plan — Replace "Démarrer" with transcript ingestion (paste / upload / Fireflies)

### What changes

**1. New `src/lib/transcript-parser.ts`** (~80 lines, pure)
- `parseTranscript(raw: string): TranscriptLine[]`
- Heuristics: speaker prefixes (`RM:`, `Conseiller:`, `Advisor:`, `Client:`, `Name:`), VTT/SRT cleanup (strip cues + numeric IDs + timestamp lines), plain prose paragraphs → single `RM` notes.
- Default `sentiment: 0.6` (flat — honest, since no audio prosody).

**2. New edge function `supabase/functions/fireflies-list/index.ts`**
- GraphQL POST through the connector gateway (`https://connector-gateway.lovable.dev/fireflies/graphql`).
- Two modes:
  - `{ action: "list" }` → returns last 20 transcripts: `id`, `title`, `date`, `duration`, `participants`.
  - `{ action: "fetch", id }` → returns one transcript with `sentences[] { speaker_name, text }`.
- Headers: `Authorization: Bearer ${LOVABLE_API_KEY}`, `X-Connection-Api-Key: ${FIREFLIES_API_KEY}`.
- Standard CORS + 401/402/429 passthrough (same shape as `analyze-meeting`).
- Add `[functions.fireflies-list] verify_jwt = false` to `supabase/config.toml`.

**3. `src/routes/meeting.tsx`** — swap button + add modal
- Replace the `Démarrer` button with **"Importer un transcript"** (Lucide `Upload`).
- New `<Dialog>` with 3 tabs (`Tabs` from `@/components/ui/tabs`):
  - **Coller** — `Textarea`, "Importer" button.
  - **Téléverser** — `<input type="file" accept=".txt,.md,.vtt,.srt">`, reads with `FileReader`.
  - **Fireflies** — auto-fetches the meeting list on tab open (POST to `fireflies-list` with `action: "list"`); renders a list of recent meetings with title + date + a "Importer" button per row that calls `action: "fetch"` and converts `sentences[]` → `TranscriptLine[]`.
- On import (any source): reset state → `setLines(parsed)` in one shot → call existing `analyze()` once on the joined transcript → run existing keyword `addAlert()` loop over all lines.
- Keep a small **"Démo live"** secondary button in the modal footer that calls the old `setRecording(true)` flow so the canned demo isn't lost.
- For imported (non-live) transcripts the `Pause`/`Terminer` controls are replaced by a single **"Effacer"** button.
- Sentiment chart shows a small "Sentiment N/A — transcript importé" note when `recording === false && lines.length > 0`.

### Connector setup (will run during execution)

Before deploying the edge function, I'll call `standard_connectors--connect` with `connector_id: "fireflies"`. The user will be prompted to authorize Fireflies; once linked, `FIREFLIES_API_KEY` and `LOVABLE_API_KEY` are auto-injected as edge-function secrets.

### Files

- `src/lib/transcript-parser.ts` — NEW
- `src/routes/meeting.tsx` — replace button, add `ImportTranscriptDialog` subcomponent (~150 lines added inline)
- `supabase/functions/fireflies-list/index.ts` — NEW
- `supabase/config.toml` — add `[functions.fireflies-list]` block

### How it works (explanation for the user)

1. Click **"Importer un transcript"** in the meeting page header. A dialog opens with 3 tabs.
2. **Coller** — paste any meeting text (Teams/Zoom export, an email summary, raw notes). Click Importer.
3. **Téléverser** — drop a `.txt`, `.vtt` or `.srt` file from your computer.
4. **Fireflies** — shows your last 20 Fireflies meetings; click one to pull its transcript.
5. The parser turns the input into the same `TranscriptLine[]` shape the live demo uses. The transcript pane fills, then the existing AI analyzer runs once and produces the Insights cards. The "Ask AI" panel on the right gets the full transcript as context, so you can immediately ask client-specific questions.
6. The "Démo live" link in the dialog footer still triggers the canned scripted transcript if you need it for a demo.

### Out of scope

- Live audio capture (would need ElevenLabs Scribe — separate scope).
- Persisting imported transcripts to the database (state stays in component, matches rest of app).
- Per-line sentiment from text (would require an AI call per line — flat 0.6 for honesty).
- Speaker diarization beyond the simple `Name:` heuristic.

