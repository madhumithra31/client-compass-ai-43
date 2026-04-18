import { Link } from "@tanstack/react-router";
import { Logo } from "@/components/Logo";
import { Home, Mic, BarChart3, PieChart } from "lucide-react";

const items = [
  { to: "/", label: "Accueil", icon: Home, exact: true },
  { to: "/meeting", label: "Rendez-vous", icon: Mic, exact: false },
  { to: "/dashboard", label: "Cockpit", icon: BarChart3, exact: false },
  { to: "/portfolio", label: "Portefeuille", icon: PieChart, exact: false },
] as const;

export function AppNav() {
  return (
    <header className="sticky top-0 z-40 border-b border-border/70 bg-surface/85 backdrop-blur supports-[backdrop-filter]:bg-surface/70">
      <div className="mx-auto flex h-14 max-w-[1400px] items-center justify-between gap-6 px-6">
        <Link to="/" className="flex shrink-0 items-center" aria-label="Accueil">
          <Logo />
        </Link>

        <nav className="flex items-center gap-1 sm:gap-2">
          {items.map(({ to, label, icon: Icon, exact }) => (
            <Link
              key={to}
              to={to}
              activeOptions={{ exact }}
              activeProps={{
                className:
                  "text-primary bg-accent/60 font-semibold",
              }}
              inactiveProps={{
                className: "text-muted-foreground hover:text-foreground hover:bg-accent/40",
              }}
              className="inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-xs font-medium transition-colors"
            >
              <Icon className="h-3.5 w-3.5" />
              <span className="hidden md:inline">{label}</span>
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-2 text-[11px] text-muted-foreground md:flex">
          <span className="h-2 w-2 rounded-full bg-success pulse-ring" />
          Live
        </div>
      </div>
    </header>
  );
}
