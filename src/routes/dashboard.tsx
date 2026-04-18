import { createFileRoute, Link } from "@tanstack/react-router";

import { otherLiveMeetings } from "@/lib/mock-data";
import { motion } from "framer-motion";
import { ArrowRight, AlertTriangle, TrendingUp, TrendingDown, Users, Activity, Bell } from "lucide-react";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Cockpit Manager — BNP Paribas Wealth Intelligence" },
      { name: "description", content: "Visualisation en temps réel des rendez-vous patrimoniaux en cours, sentiment client et alertes critiques." },
      { property: "og:title", content: "Cockpit Manager — BNP Paribas Wealth Intelligence" },
      { property: "og:description", content: "Supervision live des rendez-vous patrimoniaux." },
    ],
  }),
  component: Dashboard,
});

function Dashboard() {
  const totalAlerts = otherLiveMeetings.reduce((s, m) => s + m.alerts, 0);
  const avgSentiment = otherLiveMeetings.reduce((s, m) => s + m.sentiment, 0) / otherLiveMeetings.length;

  return (
    <div className="min-h-screen bg-background">
      {/* Header removed — global AppNav is rendered in __root.tsx */}

      <main className="mx-auto max-w-7xl px-6 py-10">
        <div className="mb-10">
          <h1 className="font-display text-4xl font-semibold text-foreground">Bonjour, Sylvie.</h1>
          <p className="mt-2 text-muted-foreground">
            Vous supervisez {otherLiveMeetings.length} rendez-vous en cours · {totalAlerts} alertes actives.
          </p>
        </div>

        {/* KPIs */}
        <div className="grid gap-4 md:grid-cols-4">
          <Kpi icon={<Activity />} label="Rendez-vous live" value={String(otherLiveMeetings.length)} hint="en cours" />
          <Kpi icon={<Bell />} label="Alertes" value={String(totalAlerts)} hint="à surveiller" tone="warning" />
          <Kpi icon={avgSentiment > 0.5 ? <TrendingUp /> : <TrendingDown />} label="Sentiment moyen" value={`${Math.round(avgSentiment * 100)}%`} hint={avgSentiment > 0.5 ? "positif" : "à surveiller"} tone={avgSentiment > 0.5 ? "success" : "warning"} />
          <Kpi icon={<Users />} label="Clients couverts" value="184" hint="ce mois" />
        </div>

        {/* Live meetings list */}
        <div className="mt-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="font-display text-2xl font-semibold text-foreground">Rendez-vous en cours</h2>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-success pulse-ring" />
              mise à jour temps réel
            </span>
          </div>
          <div className="overflow-hidden rounded-xl border border-border bg-card shadow-sm">
            <table className="w-full text-sm">
              <thead className="bg-muted/50 text-xs uppercase tracking-wider text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 text-left font-medium">Client</th>
                  <th className="px-5 py-3 text-left font-medium">Chargé d'affaires</th>
                  <th className="px-5 py-3 text-left font-medium">Durée</th>
                  <th className="px-5 py-3 text-left font-medium">Sentiment</th>
                  <th className="px-5 py-3 text-left font-medium">Alertes</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody>
                {otherLiveMeetings.map((m, i) => (
                  <motion.tr
                    key={m.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="border-t border-border hover:bg-accent/30"
                  >
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-primary text-xs font-semibold text-primary-foreground">
                          {m.client.split(" ").slice(-1)[0][0]}
                        </div>
                        <div>
                          <div className="font-medium text-foreground">{m.client}</div>
                          {m.live && <div className="text-[11px] text-success">● Suivi par vous</div>}
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{m.rm}</td>
                    <td className="px-5 py-4 font-mono text-xs text-foreground">{m.duration}</td>
                    <td className="px-5 py-4">
                      <SentimentBar value={m.sentiment} />
                    </td>
                    <td className="px-5 py-4">
                      {m.alerts > 0 ? (
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-warning/15 px-2.5 py-1 text-xs font-medium text-warning-foreground">
                          <AlertTriangle className="h-3 w-3" /> {m.alerts}
                        </span>
                      ) : (
                        <span className="text-xs text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-5 py-4 text-right">
                      <Link
                        to="/meeting"
                        className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        Rejoindre <ArrowRight className="h-3 w-3" />
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function Kpi({ icon, label, value, hint, tone = "default" }: { icon: React.ReactNode; label: string; value: string; hint: string; tone?: "default" | "success" | "warning" }) {
  const toneClass = tone === "success" ? "text-success" : tone === "warning" ? "text-warning-foreground" : "text-primary";
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-2 font-display text-3xl font-semibold text-foreground">{value}</p>
          <p className="mt-1 text-xs text-muted-foreground">{hint}</p>
        </div>
        <div className={`flex h-9 w-9 items-center justify-center rounded-md bg-accent ${toneClass} [&_svg]:h-4 [&_svg]:w-4`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function SentimentBar({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color = value > 0.6 ? "bg-success" : value > 0.4 ? "bg-warning" : "bg-destructive";
  return (
    <div className="flex items-center gap-3">
      <div className="h-1.5 w-24 overflow-hidden rounded-full bg-muted">
        <div className={`h-full ${color} transition-all`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-xs font-medium text-foreground">{pct}%</span>
    </div>
  );
}
