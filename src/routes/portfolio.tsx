import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo } from "react";
import { Logo } from "@/components/Logo";
import { clientList, type Client } from "@/lib/mock-data";
import {
  ArrowLeft, Wallet, TrendingUp, Users, Award, AlertTriangle,
  Target, Briefcase, MapPin, Activity, Sparkles, ArrowRight,
  PiggyBank, ShieldAlert, Calendar,
} from "lucide-react";

export const Route = createFileRoute("/portfolio")({
  head: () => ({
    meta: [
      { title: "Portfolio Overview — BNP Paribas Wealth Intelligence" },
      { name: "description", content: "Vue agrégée du portefeuille clients : AUM, allocation, segments, opportunités et activité." },
      { property: "og:title", content: "Portfolio Overview — BNP Paribas Wealth Intelligence" },
      { property: "og:description", content: "Analytics consolidés sur l'ensemble des clients patrimoniaux." },
    ],
  }),
  component: Portfolio,
});

// ============= Helpers =============
function sumBy<T>(arr: T[], pick: (x: T) => number | null | undefined): number {
  return arr.reduce((s, x) => s + (pick(x) ?? 0), 0);
}
function groupBy<T, K extends string>(arr: T[], key: (x: T) => K): Record<K, T[]> {
  return arr.reduce((acc, x) => {
    const k = key(x);
    (acc[k] ||= []).push(x);
    return acc;
  }, {} as Record<K, T[]>);
}
function fmtEur(n: number): string {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)} Md€`;
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)} M€`;
  if (n >= 1e3) return `${Math.round(n / 1e3)} k€`;
  return `${Math.round(n)} €`;
}

// Donut color palette (semantic tokens)
const PALETTE = [
  "hsl(var(--chart-1, 220 70% 50%))",
  "hsl(var(--chart-2, 160 60% 45%))",
  "hsl(var(--chart-3, 30 80% 55%))",
  "hsl(var(--chart-4, 280 65% 60%))",
  "hsl(var(--chart-5, 340 75% 55%))",
  "hsl(var(--chart-6, 190 70% 50%))",
  "hsl(var(--chart-7, 50 90% 55%))",
];
const FALLBACK = ["#1e3a8a", "#0d9488", "#ea580c", "#7c3aed", "#db2777", "#0891b2", "#ca8a04", "#65a30d"];
const color = (i: number) => FALLBACK[i % FALLBACK.length];

function Portfolio() {
  const data = useMemo(() => computeAggregates(clientList), []);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-surface/85 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Logo />
            <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground md:inline">
              · Portfolio Overview
            </span>
          </div>
          <nav className="flex items-center gap-4 text-xs">
            <Link to="/dashboard" className="text-muted-foreground hover:text-foreground">Cockpit Manager</Link>
            <Link to="/meeting" className="text-muted-foreground hover:text-foreground">Rendez-vous</Link>
          </nav>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-6 py-10">
        {/* Title */}
        <div className="mb-8">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Vue consolidée</p>
          <h1 className="mt-2 font-display text-4xl font-semibold text-foreground">Portefeuille clients</h1>
          <p className="mt-2 text-muted-foreground">
            Analyse agrégée sur {data.totalClients} clients · {fmtEur(data.totalAUM)} sous gestion · {data.totalRMs} chargés d'affaires.
          </p>
        </div>

        {/* 1. Hero KPIs */}
        <section className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
          <KpiCard icon={<Wallet />} label="AUM total" value={fmtEur(data.totalAUM)} hint="actifs sous gestion" tone="primary" />
          <KpiCard icon={<TrendingUp />} label="Patrimoine net" value={fmtEur(data.totalNetWorth)} hint="net of debt" tone="success" />
          <KpiCard icon={<Users />} label="Clients actifs" value={String(data.totalClients)} hint={`${data.avgSeniority.toFixed(1)} ans en moyenne`} />
          <KpiCard icon={<Award />} label="Équipement moyen" value={`${data.avgEquipment.toFixed(1)}/10`} hint="score produits" progress={data.avgEquipment * 10} />
          <KpiCard icon={<ShieldAlert />} label="Dette gérée" value={fmtEur(data.totalDebt)} hint="encours crédits" tone="warning" />
          <KpiCard icon={<Target />} label="Projets prioritaires" value={String(data.highPriorityProjects)} hint={`${fmtEur(data.highPriorityTarget)} cible`} />
        </section>

        {/* 2. Segmentation */}
        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <ChartCard title="Clients par segment" subtitle="Répartition + part d'AUM">
            <DonutBreakdown items={data.bySegment} />
          </ChartCard>
          <ChartCard title="Profil de risque" subtitle="Tolérance déclarée">
            <DonutBreakdown items={data.byRisk} />
          </ChartCard>
        </section>

        {/* 3. Asset allocation */}
        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <ChartCard title="Allocation par famille de produit" subtitle="Solde agrégé toutes contrats">
            <StackedBar items={data.byFamily} />
          </ChartCard>
          <ChartCard title="Classes d'actifs" subtitle="Sur lignes investies">
            <DonutBreakdown items={data.byAssetClass} />
          </ChartCard>
        </section>

        {/* 4. Top tables */}
        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <ChartCard title="Top clients" subtitle="Par AUM total">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="py-2 text-left font-medium">Client</th>
                  <th className="py-2 text-left font-medium">Segment</th>
                  <th className="py-2 text-right font-medium">AUM</th>
                  <th className="py-2 text-right font-medium">Équip.</th>
                  <th />
                </tr>
              </thead>
              <tbody>
                {data.topClients.map((c) => (
                  <tr key={c.id} className="border-b border-border/50 last:border-0 hover:bg-accent/30">
                    <td className="py-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-[10px] font-semibold text-primary-foreground">
                          {c.initials}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{c.name}</div>
                          <div className="text-[11px] text-muted-foreground">{c.rm}</div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 text-muted-foreground">{c.segment}</td>
                    <td className="py-3 text-right font-mono text-foreground">{fmtEur(c.totalAssets)}</td>
                    <td className="py-3 text-right text-muted-foreground">{c.equipmentScore ?? "—"}</td>
                    <td className="py-3 text-right">
                      <Link to="/meeting" className="text-primary hover:underline">
                        <ArrowRight className="inline h-3.5 w-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ChartCard>

          <ChartCard title="Top chargés d'affaires" subtitle="AUM sous gestion">
            <table className="w-full text-sm">
              <thead className="text-xs uppercase tracking-wider text-muted-foreground">
                <tr className="border-b border-border">
                  <th className="py-2 text-left font-medium">RM</th>
                  <th className="py-2 text-right font-medium">Clients</th>
                  <th className="py-2 text-right font-medium">AUM</th>
                  <th className="py-2 text-right font-medium">Équip. moy.</th>
                </tr>
              </thead>
              <tbody>
                {data.topRMs.map((r) => (
                  <tr key={r.rm} className="border-b border-border/50 last:border-0 hover:bg-accent/30">
                    <td className="py-3 font-medium text-foreground">{r.rm}</td>
                    <td className="py-3 text-right text-muted-foreground">{r.count}</td>
                    <td className="py-3 text-right font-mono text-foreground">{fmtEur(r.aum)}</td>
                    <td className="py-3 text-right text-muted-foreground">{r.avgEquip.toFixed(1)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </ChartCard>
        </section>

        {/* 5. Geographic & life stage */}
        <section className="mt-10 grid gap-6 lg:grid-cols-2">
          <ChartCard title="Agences" subtitle="Répartition géographique" icon={<MapPin className="h-4 w-4" />}>
            <BarList items={data.byAgency} />
          </ChartCard>
          <ChartCard title="Étapes de vie" subtitle="Cycle patrimonial" icon={<Activity className="h-4 w-4" />}>
            <BarList items={data.byLifeStage} />
          </ChartCard>
        </section>

        {/* 6. Activity & opportunities */}
        <section className="mt-10 grid gap-6 lg:grid-cols-3">
          <ChartCard title="Activité récente" subtitle="8 derniers événements" icon={<Calendar className="h-4 w-4" />} className="lg:col-span-2">
            <ul className="divide-y divide-border">
              {data.recentEvents.map((e, i) => (
                <li key={i} className="flex items-start gap-3 py-3">
                  <div className={`mt-1 h-2 w-2 shrink-0 rounded-full ${critDot(e.criticality)}`} />
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-2">
                      <p className="truncate text-sm font-medium text-foreground">{e.clientName}</p>
                      <span className="shrink-0 text-[11px] text-muted-foreground">{e.date}</span>
                    </div>
                    <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">{e.description}</p>
                    {e.type && <span className="mt-1 inline-block rounded bg-accent px-1.5 py-0.5 text-[10px] text-muted-foreground">{e.type}</span>}
                  </div>
                </li>
              ))}
            </ul>
          </ChartCard>

          <ChartCard title="Opportunités" subtitle="Signaux portefeuille" icon={<Sparkles className="h-4 w-4" />}>
            <ul className="space-y-3">
              <OpportunityRow icon={<PiggyBank />} label="PER manquants (TMI ≥ 30%)" value={data.opp.taxOptimCandidates} hint="optimisation fiscale" />
              <OpportunityRow icon={<Award />} label="Sous-équipés (score ≤ 4)" value={data.opp.underEquipped} hint="cross-sell" />
              <OpportunityRow icon={<Briefcase />} label="Échéances < 12 mois" value={data.opp.maturingCount} hint={fmtEur(data.opp.maturingValue)} />
              <OpportunityRow icon={<AlertTriangle />} label="Livret A saturé (>85%)" value={data.opp.livretSaturated} hint="réorienter" />
            </ul>
          </ChartCard>
        </section>

        <footer className="mt-16 border-t border-border/60 py-6 text-center text-xs text-muted-foreground">
          Snapshot au {new Date().toLocaleDateString("fr-FR", { day: "numeric", month: "long", year: "numeric" })} · données simulées
        </footer>
      </main>
    </div>
  );
}

// ============= Aggregation =============
function computeAggregates(list: Client[]) {
  const totalClients = list.length;
  const totalAUM = sumBy(list, (c) => c.totalAssets);
  const totalNetWorth = sumBy(list, (c) => c.netWorth);
  const totalDebt = sumBy(list, (c) => c.totalDebt);
  const avgSeniority = sumBy(list, (c) => c.seniorityYears) / Math.max(1, totalClients);
  const avgEquipment = sumBy(list, (c) => c.equipmentScore) / Math.max(1, totalClients);

  const allProjects = list.flatMap((c) => c.projects);
  const highPri = allProjects.filter((p) => p.priority === "Haute");
  const highPriorityProjects = highPri.length;
  const highPriorityTarget = sumBy(highPri, (p) => p.targetAmount);

  // By segment (count + AUM share)
  const segGroups = groupBy(list, (c) => c.segment || "—");
  const bySegment = Object.entries(segGroups)
    .map(([k, v], i) => ({ label: k, value: sumBy(v, (c) => c.totalAssets), count: v.length, color: color(i) }))
    .sort((a, b) => b.value - a.value);

  // By risk profile
  const riskGroups = groupBy(list, (c) => c.riskProfile);
  const byRisk = Object.entries(riskGroups)
    .map(([k, v], i) => ({ label: k, value: sumBy(v, (c) => c.totalAssets), count: v.length, color: color(i + 2) }))
    .sort((a, b) => b.value - a.value);

  // By contract family
  const allContracts = list.flatMap((c) => c.contracts);
  const famGroups = groupBy(allContracts, (k) => (k.family || "Autre"));
  const byFamily = Object.entries(famGroups)
    .map(([k, v], i) => ({ label: k, value: sumBy(v, (c) => c.balance), count: v.length, color: color(i) }))
    .filter((x) => x.value > 0)
    .sort((a, b) => b.value - a.value);

  // By asset class (positions)
  const allPositions = allContracts.flatMap((c) => c.positions);
  const acGroups = groupBy(allPositions, (p) => p.assetClass || "Non classé");
  const byAssetClass = Object.entries(acGroups)
    .map(([k, v], i) => ({ label: k, value: sumBy(v, (p) => p.valuation), count: v.length, color: color(i + 1) }))
    .filter((x) => x.value > 0)
    .sort((a, b) => b.value - a.value);

  // Top clients
  const topClients = [...list].sort((a, b) => b.totalAssets - a.totalAssets).slice(0, 5);

  // Top RMs
  const rmGroups = groupBy(list.filter((c) => c.rm), (c) => c.rm as string);
  const totalRMs = Object.keys(rmGroups).length;
  const topRMs = Object.entries(rmGroups)
    .map(([rm, v]) => ({
      rm,
      count: v.length,
      aum: sumBy(v, (c) => c.totalAssets),
      avgEquip: sumBy(v, (c) => c.equipmentScore) / v.length,
    }))
    .sort((a, b) => b.aum - a.aum)
    .slice(0, 5);

  // Agencies
  const agGroups = groupBy(list.filter((c) => c.agency), (c) => c.agency as string);
  const byAgency = Object.entries(agGroups)
    .map(([k, v], i) => ({ label: k, value: v.length, count: v.length, color: color(i) }))
    .sort((a, b) => b.value - a.value);

  // Life stages
  const lsGroups = groupBy(list.filter((c) => c.lifeStage), (c) => c.lifeStage as string);
  const byLifeStage = Object.entries(lsGroups)
    .map(([k, v], i) => ({ label: k, value: v.length, count: v.length, color: color(i + 3) }))
    .sort((a, b) => b.value - a.value);

  // Recent events
  const recentEvents = list
    .flatMap((c) => c.recentEvents.map((e) => ({ ...e, clientName: c.name, clientId: c.id })))
    .filter((e) => e.date)
    .sort((a, b) => (b.date || "").localeCompare(a.date || ""))
    .slice(0, 8);

  // Opportunities
  const taxOptimCandidates = list.filter(
    (c) => (c.tmi ?? 0) >= 30 && !c.contracts.some((k) => (k.family || "").toLowerCase().includes("per")),
  ).length;
  const underEquipped = list.filter((c) => (c.equipmentScore ?? 10) <= 4).length;

  const now = new Date();
  const in12 = new Date(now.getFullYear() + 1, now.getMonth(), now.getDate());
  const maturing = allContracts.filter((k) => {
    if (!k.maturity) return false;
    const m = new Date(k.maturity);
    return !isNaN(m.getTime()) && m > now && m <= in12;
  });
  const maturingCount = maturing.length;
  const maturingValue = sumBy(maturing, (k) => k.balance);

  const livretSaturated = allContracts.filter(
    (k) => (k.label || "").toLowerCase().includes("livret a") && k.ceiling && k.balance && k.balance / k.ceiling > 0.85,
  ).length;

  return {
    totalClients, totalAUM, totalNetWorth, totalDebt, avgSeniority, avgEquipment,
    highPriorityProjects, highPriorityTarget,
    bySegment, byRisk, byFamily, byAssetClass,
    topClients, topRMs, totalRMs,
    byAgency, byLifeStage,
    recentEvents,
    opp: { taxOptimCandidates, underEquipped, maturingCount, maturingValue, livretSaturated },
  };
}

// ============= Sub-components =============

function KpiCard({ icon, label, value, hint, tone = "default", progress }: {
  icon: React.ReactNode; label: string; value: string; hint: string;
  tone?: "default" | "primary" | "success" | "warning"; progress?: number;
}) {
  const toneClass = tone === "primary" ? "text-primary bg-primary/10"
    : tone === "success" ? "text-success bg-success/10"
    : tone === "warning" ? "text-warning-foreground bg-warning/15"
    : "text-foreground bg-accent";
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-xl border border-border bg-card p-4 shadow-sm"
    >
      <div className="flex items-start justify-between">
        <p className="text-[11px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
        <div className={`flex h-7 w-7 items-center justify-center rounded-md ${toneClass} [&_svg]:h-3.5 [&_svg]:w-3.5`}>{icon}</div>
      </div>
      <p className="mt-2 font-display text-xl font-semibold leading-tight text-foreground whitespace-nowrap">{value}</p>
      <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>
      {progress !== undefined && (
        <div className="mt-2 h-1 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-gradient-primary transition-all" style={{ width: `${Math.min(100, progress)}%` }} />
        </div>
      )}
    </motion.div>
  );
}

function ChartCard({ title, subtitle, icon, children, className = "" }: {
  title: string; subtitle?: string; icon?: React.ReactNode; children: React.ReactNode; className?: string;
}) {
  return (
    <div className={`rounded-xl border border-border bg-card p-5 shadow-sm ${className}`}>
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="font-display text-base font-semibold text-foreground">{title}</h3>
          {subtitle && <p className="text-xs text-muted-foreground">{subtitle}</p>}
        </div>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      {children}
    </div>
  );
}

type BreakdownItem = { label: string; value: number; count: number; color: string };

function DonutBreakdown({ items }: { items: BreakdownItem[] }) {
  const total = items.reduce((s, i) => s + i.value, 0) || 1;
  const totalCount = items.reduce((s, i) => s + i.count, 0);
  const radius = 60;
  const circ = 2 * Math.PI * radius;
  let offset = 0;

  return (
    <div className="flex flex-col items-center gap-5 md:flex-row md:items-center">
      <svg viewBox="0 0 160 160" className="h-40 w-40 shrink-0 -rotate-90">
        <circle cx="80" cy="80" r={radius} fill="none" stroke="hsl(var(--muted))" strokeWidth="20" />
        {items.map((it, i) => {
          const len = (it.value / total) * circ;
          const seg = (
            <circle
              key={i}
              cx="80" cy="80" r={radius}
              fill="none"
              stroke={it.color}
              strokeWidth="20"
              strokeDasharray={`${len} ${circ - len}`}
              strokeDashoffset={-offset}
            />
          );
          offset += len;
          return seg;
        })}
        <text x="80" y="78" textAnchor="middle" className="rotate-90 fill-foreground font-display text-xl font-semibold" transform="rotate(90 80 80)">
          {totalCount}
        </text>
      </svg>
      <ul className="flex-1 space-y-1.5 text-sm">
        {items.map((it, i) => (
          <li key={i} className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: it.color }} />
              <span className="truncate text-foreground">{it.label}</span>
            </div>
            <div className="shrink-0 text-right">
              <span className="font-mono text-xs text-foreground">{Math.round((it.value / total) * 100)}%</span>
              <span className="ml-2 text-[11px] text-muted-foreground">({it.count})</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function StackedBar({ items }: { items: BreakdownItem[] }) {
  const total = items.reduce((s, i) => s + i.value, 0) || 1;
  return (
    <div>
      <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
        {items.map((it, i) => (
          <div key={i} style={{ width: `${(it.value / total) * 100}%`, background: it.color }} title={`${it.label}: ${fmtEur(it.value)}`} />
        ))}
      </div>
      <ul className="mt-4 space-y-2 text-sm">
        {items.map((it, i) => (
          <li key={i} className="flex items-center justify-between gap-3">
            <div className="flex min-w-0 items-center gap-2">
              <span className="h-2.5 w-2.5 shrink-0 rounded-sm" style={{ background: it.color }} />
              <span className="truncate text-foreground">{it.label}</span>
              <span className="shrink-0 text-[11px] text-muted-foreground">({it.count})</span>
            </div>
            <div className="shrink-0 text-right">
              <span className="font-mono text-xs text-foreground">{fmtEur(it.value)}</span>
              <span className="ml-2 text-[11px] text-muted-foreground">{Math.round((it.value / total) * 100)}%</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

function BarList({ items }: { items: BreakdownItem[] }) {
  const max = Math.max(...items.map((i) => i.value), 1);
  return (
    <ul className="space-y-2.5">
      {items.map((it, i) => (
        <li key={i}>
          <div className="mb-1 flex items-center justify-between text-xs">
            <span className="truncate text-foreground">{it.label}</span>
            <span className="ml-2 shrink-0 font-mono text-muted-foreground">{it.count}</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
            <div className="h-full transition-all" style={{ width: `${(it.value / max) * 100}%`, background: it.color }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function OpportunityRow({ icon, label, value, hint }: { icon: React.ReactNode; label: string; value: number; hint: string }) {
  return (
    <li className="flex items-center gap-3 rounded-lg border border-border bg-surface p-3">
      <div className="flex h-9 w-9 items-center justify-center rounded-md bg-primary/10 text-primary [&_svg]:h-4 [&_svg]:w-4">{icon}</div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-xs font-medium text-foreground">{label}</p>
        <p className="text-[11px] text-muted-foreground">{hint}</p>
      </div>
      <span className="font-display text-2xl font-semibold text-foreground">{value}</span>
    </li>
  );
}

function critDot(criticality: string | null): string {
  const c = (criticality || "").toLowerCase();
  if (c.includes("haut") || c.includes("crit")) return "bg-destructive";
  if (c.includes("moy") || c.includes("med")) return "bg-warning";
  return "bg-success";
}
