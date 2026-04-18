

## Two small fixes

### 1. KPI cards — reduce bold value size to prevent wrapping

In the screenshot, "229 k€", "139 k€" and "10.3 ans" wrap onto 2 lines because `text-2xl` + the icon column leaves too little room at the current panel width (~430px column → ~200px per tile in 2-col layout).

**Change in `src/routes/meeting.tsx` (`KpiTile`, line 586):**
- Value: `text-2xl` → `text-xl`
- Add `whitespace-nowrap` to keep the number + unit on one line
- Add `leading-tight` so spacing doesn't feel cramped after shrinking
- Tighten the icon box from `h-8 w-8` → `h-7 w-7` to claw back a bit of horizontal room

That's all that's needed visually — the labels and hints already fit fine.

### 2. CopilotPanel — remove Suggestions tab, rename "Co-pilote AI"

In `src/components/CopilotPanel.tsx`:

- **Remove the Suggestions tab entirely**: delete the `tab` state, both `TabBtn`s, and the entire `tab === "suggest" ? (...) : (...)` ternary — keep only the "Demander" (chat) view as the panel's sole content.
- **Remove all suggestion plumbing** since it's no longer used: `suggestions` state, `loadingSuggest`, `lastSuggestLenRef`, the auto-fetch `useEffect` on transcript, `fetchSuggestions()`, `update()`, `active`/`sortedActive`, plus the now-unused components `SuggestionCard`, `EmptyState`, and `TYPE_META`. Drop the `Suggestion` type export, and the unused lucide imports (`Lightbulb`, `HelpCircle`, `MessageCircle`, `AlertOctagon`, `Package`, `ListTodo`, `Check`, `X`, `Lightbulb`) and `quickAgent` from `@/lib/copilot-api` — keep only `askAgent`.
- **Rename "Co-pilote AI" → "Ask AI"** in the header. Subtitle update: "Questions contextuelles sur le client" (keeps tone consistent with the rest of the French UI but flags the action). Also drop the now-meaningless `<TabBtn>` row since there's only one view.
- Keep the live indicator badge, the chat scroll fix, markdown rendering, preset questions, and the textarea/send form — all unchanged.

### Naming options for the rename

I'll go with **"Ask AI"** unless you prefer another. Quick alternatives if you want to swap:
- "Ask AI" (recommended — short, matches the only remaining action)
- "Client Assistant"
- "AI Advisor"
- "Smart Assist"

If you want a different name, tell me in your next message and I'll use that instead of "Ask AI".

## Files touched

- `src/routes/meeting.tsx` — `KpiTile` styling only (~3 line changes)
- `src/components/CopilotPanel.tsx` — strip out suggestions logic + UI, rename header (~150 lines deleted, ~5 changed)

No new dependencies. No backend changes. The `Suggestion` type isn't imported anywhere else so removing it is safe.

## Out of scope

- Re-adding suggestions later (we can bring them back from git history if needed).
- Restyling the chat bubbles or preset buttons.
- Translating the panel header to English beyond the title rename.

