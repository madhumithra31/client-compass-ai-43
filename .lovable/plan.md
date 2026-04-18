
## Current state

4 routes (`/`, `/meeting`, `/dashboard`, `/portfolio`), but no global nav. Each page has ad-hoc "← Accueil" / "Portfolio" header links added piecemeal. The user has to hand-edit the URL.

## Proposal — global top navigation bar

Add a single shared `AppNav` component rendered in `__root.tsx` so it appears on every route automatically. Horizontal top bar — fits the existing dashboard aesthetic better than a sidebar (which would compete with the meeting page's already-dense 3-column layout).

### Design

A slim sticky header (h-14) at the top of every page:

```text
[Logo BNP]   Accueil · Rendez-vous · Cockpit Manager · Portefeuille      [● Live]
```

- Left: the existing `Logo` component, clickable → `/`
- Center/left: 4 `<Link>` items using TanStack `activeProps` for the highlighted state (underline + bold + primary color)
- Right: the small "All systems operational" pulse dot already used on the home page

Sticky (`sticky top-0 z-40`), `backdrop-blur`, `border-b` — matches the existing surface look.

### Implementation

1. **New `src/components/AppNav.tsx`** — the bar described above, ~50 lines, uses `Link` from `@tanstack/react-router` with `activeProps={{ className: "text-primary font-semibold" }}` and `activeOptions={{ exact: true }}` for `/`.

2. **`src/routes/__root.tsx`** — render `<AppNav />` above `<Outlet />` in `RootComponent`. That's it for global wiring.

3. **Per-page header cleanup** — remove the now-duplicate top headers from:
   - `src/routes/index.tsx` — drop the small `<header>` (Logo + status pill); keep the hero section.
   - `src/routes/meeting.tsx` — drop the `← Accueil` / Portfolio link bar at the top.
   - `src/routes/dashboard.tsx` — same cleanup.
   - `src/routes/portfolio.tsx` — same cleanup.

   This avoids two stacked headers and gives every page back ~60px of vertical room.

4. **Hide on the meeting "live" view? — No.** Keeping it visible everywhere is simpler and more useful (advisor can jump back to portfolio mid-meeting). The bar is only 56px tall.

### Naming on the nav

- "Accueil" → `/`
- "Rendez-vous" → `/meeting`
- "Cockpit" → `/dashboard`
- "Portefeuille" → `/portfolio`

(Short French labels to match the rest of the UI.)

### Mobile

Below `md` the link row collapses to an icon-only row (Home / Mic / BarChart3 / PieChart icons from lucide), still horizontal — no hamburger needed for 4 items.

## Files

- `src/components/AppNav.tsx` — NEW
- `src/routes/__root.tsx` — add `<AppNav />` in `RootComponent`
- `src/routes/index.tsx` — remove old header
- `src/routes/meeting.tsx` — remove old header link bar
- `src/routes/dashboard.tsx` — remove old header link bar
- `src/routes/portfolio.tsx` — remove old header link bar

## Out of scope

- Sidebar layout (rejected — meeting page is already 3 columns wide).
- Auth/user menu, notifications, search — none exist yet.
- Breadcrumbs — overkill for 4 flat routes.
