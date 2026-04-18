

The "Demander" tab in `CopilotPanel.tsx` shows 3 hardcoded French example questions when chat is empty. They currently just pre-fill the textarea (no auto-send). User wants 4 new English questions, and they should be tied to the selected client.

Looking at current code (lines ~165-180 of CopilotPanel.tsx):
- The 3 example buttons call `setChatInput(q)` — user still has to press send.
- `sendChat()` already auto-injects client name + id + transcript context into the prompt sent to Render `/ask`.

So "tied to the selected client" is mostly already handled — every `/ask` call prepends `Client: {clientName} (id: {clientId})`. I just need to:

## Plan

**1. Replace the 3 preset questions** in `src/components/CopilotPanel.tsx` (the `chat.length === 0` block) with the 4 new ones:
- "Did this client earn money last year?"
- "Is my client financially healthy?"
- "What should I know before this meeting?"
- "Which product might suit this client?"

**2. Make them one-click send (not just pre-fill)** — better UX for tied-to-client questions. Clicking a preset will immediately submit the question to `/ask` with the existing client+transcript context auto-prepended by `sendChat()`. Add a small helper `sendPreset(q)` that sets input then calls `sendChat()` directly, or just inline: set state and trigger send.

**3. Update the intro copy** above the buttons to match: change the French explainer to something like *"Ask a quick question about {clientName} — the co-pilot already has their full profile and live transcript."* Falls back gracefully if no client selected.

**4. No backend changes** — `clientId` and `clientName` are already passed into `CopilotPanel` and already injected into every `/ask` prompt via the context block in `sendChat()`. The 4 new questions will automatically be answered in the context of whichever client is selected in the dropdown.

## Files touched

- `src/components/CopilotPanel.tsx` — edit the `chat.length === 0` empty-state block only (~15 lines). No new imports, no new props, no new dependencies.

## Out of scope (not doing unless asked)

- Translating the rest of the panel UI to English (headers, labels, toasts are still French — only the 4 preset questions are changing per your request).
- Adding more preset categories or grouping the questions.

