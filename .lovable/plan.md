
## Diagnosis

The app isn't actually broken — the code is correct. Here's what happened:

When I added the `<Select>` client switcher, it pulled in a new dependency (`@radix-ui/react-select`). On the very first SSR render, Vite hadn't optimized that dep yet and threw a single SSR error at 12:31:08. **27 seconds later (12:31:35) Vite finished optimizing it and triggered a full reload — with zero errors since.**

The "currentClient is not defined" message in your overlay is **stale** from that one-time SSR failure. The trace points to line 244 of `meeting.tsx`, which is just the `<h2>Cockpit de supervision</h2>` heading — nothing references `currentClient` anywhere in the route. I grep-checked the whole `src/` tree:

- `meeting.tsx` → 0 references ✅
- `ClientMindmapModal.tsx` → 0 references ✅
- `CopilotPanel.tsx` → 0 references ✅
- `mock-data.ts` → 1 (legacy export `export const currentClient`, harmless, still a valid binding)

The client switcher itself is wired correctly: `selectedClientId` state, `clients[selectedClientId]` lookup, `<Select>` in the header populated from `clientList`, and a reset of transcript/alerts/insights on change.

## Fix

Just one tiny step needed:

**Force a clean reload** so the stale error overlay clears and the now-optimized Radix Select bundle is picked up. I'll do this by touching `meeting.tsx` (a no-op edit — adding/removing a blank line) which triggers HMR and clears the overlay.

If after that you still see anything off, the fallback is:
- Remove the unused legacy `export const currentClient` line from `mock-data.ts` (it's referenced nowhere but adds noise).

That's it — no logic changes, no new files. The switcher is already built and working; you just need a fresh render to see it.
