

## Goal

Replace the current Supabase edge function `copilot` with direct HTTP calls to your public Render service at `https://bnp-ai-copilot.onrender.com`. Both the free-form chat ("Demander" tab) and the auto-suggestions ("Suggestions" tab) will hit Render.

## How the two tabs map to Render endpoints

| Current behavior | New backend |
|---|---|
| **Demander** tab — user types a question | `POST /ask` with `{ prompt }` → render `response` as the assistant message |
| **Suggestions** tab — auto-fired every ~120 chars of new transcript | `POST /quick` with `{ keyword_id: "live_suggestions", client_id, client_name }` → parse `response` into suggestion cards |

Since `/quick` returns a single `response` string (not the structured array of `{type, priority, title, body}` the cards expect), we have two realistic paths for the Suggestions tab:

- **A. Single-card mode** — show the Render `response` as one "Suggestion live" card. Simplest, no parsing assumptions.
- **B. Parsed mode** — try to JSON.parse `response` first; if it's a JSON array of suggestions, render as multiple cards; otherwise fall back to a single card.

I'll go with **B** — it's only ~5 extra lines and survives both formats so you can later have your Render agent return JSON without a frontend change.

## Implementation

### 1. New file: `src/lib/copilot-api.ts`

Thin client for Render. Exposes `askAgent(prompt)` and `quickAgent({keyword_id, client_id?, client_name?})`. Handles errors, returns typed `{response}` or throws.

```ts
const BASE = "https://bnp-ai-copilot.onrender.com";
export async function askAgent(prompt: string): Promise<string> { ... POST /ask ... }
export async function quickAgent(input): Promise<string> { ... POST /quick ... }
```

### 2. Update `src/components/CopilotPanel.tsx`

- Remove `import { supabase } from "@/integrations/supabase/client"`.
- Add `selectedClientId` and `selectedClientName` props (passed from `meeting.tsx`) so `/quick` can include client context.
- `sendChat()` → call `askAgent(q)` instead of `supabase.functions.invoke("copilot", { mode: "chat" })`. The chat history we currently send is dropped (Render `/ask` only takes a single `prompt`); we'll prepend a short context block to the prompt:  
  `"Client: {clientName} (id: {clientId})\n\nTranscript récent:\n{last ~1500 chars}\n\nQuestion: {q}"` so the agent still has context.
- `fetchSuggestions()` → call `quickAgent({ keyword_id: "live_suggestions", client_id, client_name })`. Try `JSON.parse(response)`; if it's an array of `{type, priority, title, body}`, use as-is; otherwise wrap as a single `{type:"talking_point", priority:"medium", title:"Suggestion live", body: response}`.

### 3. Update `src/routes/meeting.tsx`

Pass `selectedClientId` and the resolved client name into `<CopilotPanel ... clientId={...} clientName={...} />`. One-line change.

### 4. Cleanup

- Delete `supabase/functions/copilot/` folder (and its `config.toml` entry if any). It's no longer called from anywhere.

## Notes & assumptions

- **CORS**: Render must allow your Lovable preview origin (`*.lovable.app`) and your custom domain. If you see CORS errors after deploy, you'll need to add the allowed origins on the Render service side — I can't change that from here. Easiest: enable `*` for now in the FastAPI app.
- **Cold starts**: Render free tier sleeps after inactivity → first request can take 30–60s. I'll bump the chat "thinking" timeout copy and keep the `Loader2` spinner; nothing else needed.
- **No keyword_id list provided** — I'll use `"live_suggestions"` as the default keyword for the auto-suggestions polling. If your Render agent expects a different one, tell me the value and I'll swap it (one-line change). The agent will return `{"error": "unknown keyword_id"}` with status 400 if mismatched, which we'll log to console and silently skip.
- **Client context for /quick**: you didn't answer — I'll default to **always sending** the selected client's id and name (it's free info and the agent can ignore it).
- **Quick-prompt presets in the chat tab** (the 3 example questions like "Quelle est l'exposition ESG…") still work — they just pre-fill the textarea, and the user submits to `/ask` like any other question. No change needed there.

## Files touched

- `src/lib/copilot-api.ts` — NEW
- `src/components/CopilotPanel.tsx` — edit (swap backend, add 2 props)
- `src/routes/meeting.tsx` — edit (pass 2 props)
- `supabase/functions/copilot/index.ts` — DELETE

No new dependencies, no DB changes, no secrets needed.

