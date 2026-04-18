import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import { Logo } from "@/components/Logo";
import { CopilotPanel } from "@/components/CopilotPanel";
import { currentClient, scriptedTranscript, otherLiveMeetings, type TranscriptLine } from "@/lib/mock-data";
import { supabase } from "@/integrations/supabase/client";
import {
  Mic, MicOff, Pause, Play, Sparkles, AlertTriangle, CheckCircle2, Mail,
  Phone, Briefcase, Calendar, Tag, ArrowLeft, Loader2, ArrowRight, Activity, Bell, TrendingUp, TrendingDown, Users,
} from "lucide-react";

export const Route = createFileRoute("/meeting")({
  head: () => ({
    meta: [
      { title: "Rendez-vous live — BNP Paribas Wealth Intelligence" },
      { name: "description", content: "Vue live d'un rendez-vous patrimonial : transcription, sentiment, insights AI et alertes client." },
      { property: "og:title", content: "Rendez-vous live — BNP Paribas Wealth Intelligence" },
      { property: "og:description", content: "Vue live d'un rendez-vous patrimonial." },
    ],
  }),
  component: Meeting,
});

type AlertSeed = { id: string; type: "info" | "change" | "risk"; title: string; detail: string };
type AlertItem = AlertSeed & { time: string };
type Insight = { id: string; category: "Decision" | "Request" | "Risk" | "Follow-up"; text: string };

function Meeting() {
  const [recording, setRecording] = useState(false);
  const [paused, setPaused] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [lines, setLines] = useState<TranscriptLine[]>([]);
  const [sentimentSeries, setSentimentSeries] = useState<{ t: number; v: number }[]>([]);
  const [alerts, setAlerts] = useState<AlertItem[]>([]);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [analyzing, setAnalyzing] = useState(false);

  const idxRef = useRef(0);
  const transcriptEndRef = useRef<HTMLDivElement>(null);

  // Timer
  useEffect(() => {
    if (!recording || paused) return;
    const t = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(t);
  }, [recording, paused]);

  // Drip-feed transcript
  useEffect(() => {
    if (!recording || paused) return;
    if (idxRef.current >= scriptedTranscript.length) return;
    const next = scriptedTranscript[idxRef.current];
    const delay = 2400 + Math.random() * 1500;
    const t = setTimeout(() => {
      setLines((l) => [...l, next]);
      setSentimentSeries((s) => [...s, { t: elapsed, v: next.sentiment }]);

      // Trigger alerts based on content
      if (next.text.includes("680 000")) {
        addAlert({
          id: crypto.randomUUID(),
          type: "change",
          title: "Liquidité disponible détectée",
          detail: "Cession immobilière Lyon — €680 000 nets à allouer.",
        });
      }
      if (next.text.toLowerCase().includes("inquiète") || next.text.toLowerCase().includes("peur")) {
        addAlert({
          id: crypto.randomUUID(),
          type: "risk",
          title: "Signal d'inquiétude client",
          detail: "Sentiment négatif sur volatilité marchés. Adapter le discours.",
        });
      }
      if (next.text.includes("camille.laurent@me.com")) {
        addAlert({
          id: crypto.randomUUID(),
          type: "change",
          title: "Mise à jour de coordonnées",
          detail: "Nouvel e-mail principal : camille.laurent@me.com — à confirmer dans le CRM.",
        });
      }
      if (next.text.toLowerCase().includes("mariage") || next.text.toLowerCase().includes("transmission")) {
        addAlert({
          id: crypto.randomUUID(),
          type: "info",
          title: "Évènement de vie",
          detail: "Mariage de Léa en septembre — opportunité donation-partage.",
        });
      }
      idxRef.current += 1;
    }, delay);
    return () => clearTimeout(t);
  }, [recording, paused, lines.length, elapsed]);

  // Auto-scroll transcript
  useEffect(() => {
    transcriptEndRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [lines.length]);

  // Re-analyze insights periodically as transcript grows
  useEffect(() => {
    if (lines.length === 0 || lines.length % 3 !== 0) return;
    void analyze();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lines.length]);

  function addAlert(a: AlertSeed) {
    setAlerts((prev) => [{ ...a, time: formatTime(elapsed) }, ...prev]);
  }

  async function analyze() {
    if (lines.length === 0) return;
    setAnalyzing(true);
    try {
      const transcript = lines.map((l) => `${l.speaker === "RM" ? "Conseiller" : "Client"}: ${l.text}`).join("\n");
      const { data, error } = await supabase.functions.invoke("analyze-meeting", {
        body: { transcript },
      });
      if (error) throw error;
      if (data?.insights && Array.isArray(data.insights)) {
        setInsights(
          data.insights.slice(0, 8).map((it: { category: string; text: string }, i: number) => ({
            id: `${i}-${it.text.slice(0, 20)}`,
            category: (["Decision", "Request", "Risk", "Follow-up"].includes(it.category) ? it.category : "Follow-up") as Insight["category"],
            text: it.text,
          })),
        );
      }
    } catch (e) {
      console.error("analyze failed", e);
    } finally {
      setAnalyzing(false);
    }
  }

  const avgSentiment = useMemo(() => {
    if (sentimentSeries.length === 0) return 0.6;
    return sentimentSeries.reduce((a, b) => a + b.v, 0) / sentimentSeries.length;
  }, [sentimentSeries]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-border bg-surface/85 backdrop-blur">
        <div className="mx-auto flex max-w-[1400px] items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-4">
            <Link to="/" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="h-4 w-4" />
            </Link>
            <Logo />
            <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground lg:inline">
              · Rendez-vous live
            </span>
          </div>
          <div className="flex items-center gap-3">
            <div className="hidden items-center gap-2 rounded-full border border-border px-3 py-1.5 text-xs md:flex">
              {recording && !paused && <span className="h-2 w-2 rounded-full bg-destructive pulse-ring" />}
              <span className="font-mono text-foreground">{formatTime(elapsed)}</span>
            </div>
            {!recording ? (
              <button
                onClick={() => setRecording(true)}
                className="inline-flex items-center gap-2 rounded-md bg-gradient-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-sm transition-all hover:shadow-glow"
              >
                <Mic className="h-4 w-4" /> Démarrer
              </button>
            ) : (
              <>
                <button
                  onClick={() => setPaused((p) => !p)}
                  className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm font-medium text-foreground hover:bg-accent"
                >
                  {paused ? <Play className="h-4 w-4" /> : <Pause className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => { setRecording(false); setPaused(false); }}
                  className="inline-flex items-center gap-2 rounded-md bg-destructive px-4 py-2 text-sm font-semibold text-destructive-foreground"
                >
                  <MicOff className="h-4 w-4" /> Terminer
                </button>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1500px] gap-5 px-6 py-6 lg:grid-cols-[280px_minmax(0,1fr)_380px]">
        {/* LEFT — Client + Sentiment + Alerts + Insights */}
        <aside className="space-y-4">
          <ClientCard />
          <SentimentCard avg={avgSentiment} series={sentimentSeries} />
          <AlertsCard alerts={alerts} />
          <InsightsCard insights={insights} loading={analyzing && insights.length === 0} hasTranscript={lines.length > 0} />
        </aside>

        {/* CENTER — Cockpit dashboard (replaces transcription) */}
        <section className="flex h-[calc(100vh-140px)] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Cockpit de supervision</h2>
              <p className="text-xs text-muted-foreground">
                Vue temps réel des rendez-vous patrimoniaux en cours
              </p>
            </div>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-success pulse-ring" />
              live
            </span>
          </div>
          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
            <DashboardKpis />
            <LiveMeetingsTable />
          </div>
        </section>

        {/* RIGHT — Proactive Co-pilot */}
        <aside>
          <CopilotPanel
            transcript={lines.map((l) => `${l.speaker === "RM" ? "Conseiller" : "Client"}: ${l.text}`).join("\n")}
            recording={recording && !paused}
          />
        </aside>
      </main>
      <Toaster position="bottom-right" richColors closeButton />
    </div>
  );
}

function ClientCard() {
  const c = currentClient;
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-primary font-display text-base font-semibold text-primary-foreground shadow-glow">
          {c.initials}
        </div>
        <div>
          <h3 className="font-display text-lg font-semibold leading-tight text-foreground">{c.name}</h3>
          <p className="text-xs text-muted-foreground">{c.id} · {c.segment}</p>
        </div>
      </div>
      <dl className="mt-5 space-y-2.5 text-xs">
        <Row icon={<Briefcase className="h-3.5 w-3.5" />} label="AUM" value={c.aum} />
        <Row icon={<Tag className="h-3.5 w-3.5" />} label="Profil de risque" value={c.riskProfile} />
        <Row icon={<Calendar className="h-3.5 w-3.5" />} label="Client depuis" value={c.joined} />
        <Row icon={<Mail className="h-3.5 w-3.5" />} label="Email" value={c.email} />
        <Row icon={<Phone className="h-3.5 w-3.5" />} label="Téléphone" value={c.phone} />
      </dl>
      <div className="mt-4 flex flex-wrap gap-1.5">
        {c.tags.map((t) => (
          <span key={t} className="rounded-full bg-accent px-2 py-0.5 text-[10px] font-medium text-accent-foreground">{t}</span>
        ))}
      </div>
      <div className="mt-4 border-t border-border pt-3">
        <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">Notes existantes</p>
        <ul className="mt-2 space-y-1.5 text-xs text-muted-foreground">
          {c.notes.map((n, i) => (<li key={i}>· {n}</li>))}
        </ul>
      </div>
    </div>
  );
}

function Row({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
  return (
    <div className="flex items-center justify-between gap-2">
      <span className="flex items-center gap-1.5 text-muted-foreground">{icon}{label}</span>
      <span className="font-medium text-foreground">{value}</span>
    </div>
  );
}

function SentimentCard({ avg, series }: { avg: number; series: { t: number; v: number }[] }) {
  const w = 260, h = 70, pad = 4;
  const points = series.length > 1
    ? series.map((p, i) => {
        const x = pad + (i / (series.length - 1)) * (w - pad * 2);
        const y = h - pad - p.v * (h - pad * 2);
        return `${x},${y}`;
      }).join(" ")
    : "";
  const tone = avg > 0.6 ? "success" : avg > 0.4 ? "warning" : "destructive";
  const toneText = avg > 0.6 ? "Positif" : avg > 0.4 ? "Neutre" : "Tendu";
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Sentiment client</h3>
        <span className={`rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
          tone === "success" ? "bg-success/15 text-success" : tone === "warning" ? "bg-warning/15 text-warning-foreground" : "bg-destructive/15 text-destructive"
        }`}>{toneText}</span>
      </div>
      <p className="mt-1 font-display text-3xl font-semibold text-foreground">{Math.round(avg * 100)}%</p>
      <svg viewBox={`0 0 ${w} ${h}`} className="mt-2 w-full">
        <defs>
          <linearGradient id="g1" x1="0" x2="0" y1="0" y2="1">
            <stop offset="0%" stopColor="oklch(0.62 0.14 158)" stopOpacity="0.4" />
            <stop offset="100%" stopColor="oklch(0.62 0.14 158)" stopOpacity="0" />
          </linearGradient>
        </defs>
        {points && (
          <>
            <polyline fill="none" stroke="oklch(0.55 0.13 158)" strokeWidth="2" strokeLinecap="round" points={points} />
            <polygon fill="url(#g1)" points={`${pad},${h - pad} ${points} ${w - pad},${h - pad}`} />
          </>
        )}
        {!points && (
          <line x1={pad} y1={h / 2} x2={w - pad} y2={h / 2} stroke="oklch(0.9 0.01 150)" strokeDasharray="3 3" />
        )}
      </svg>
      <p className="mt-2 text-[11px] text-muted-foreground">{series.length} mesures · évolution depuis le début</p>
    </div>
  );
}

function AlertsCard({ alerts }: { alerts: AlertItem[] }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-foreground">Alertes client</h3>
        <span className="rounded-full bg-warning/15 px-2 py-0.5 text-[10px] font-semibold text-warning-foreground">
          {alerts.length}
        </span>
      </div>
      {alerts.length === 0 && (
        <p className="text-xs text-muted-foreground">Aucune alerte pour le moment.</p>
      )}
      <div className="space-y-2.5">
        <AnimatePresence initial={false}>
          {alerts.map((a) => {
            const tone = a.type === "risk" ? "destructive" : a.type === "change" ? "warning" : "primary";
            const Icon = a.type === "info" ? CheckCircle2 : AlertTriangle;
            return (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, x: 12 }}
                animate={{ opacity: 1, x: 0 }}
                className={`rounded-lg border p-3 text-xs ${
                  tone === "destructive" ? "border-destructive/30 bg-destructive/5"
                  : tone === "warning" ? "border-warning/40 bg-warning/5"
                  : "border-primary/30 bg-primary/5"
                }`}
              >
                <div className="flex items-start gap-2">
                  <Icon className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${
                    tone === "destructive" ? "text-destructive" : tone === "warning" ? "text-warning-foreground" : "text-primary"
                  }`} />
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-foreground">{a.title}</p>
                    <p className="mt-0.5 text-muted-foreground">{a.detail}</p>
                    <p className="mt-1 font-mono text-[10px] text-muted-foreground">{a.time}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
}

function InsightsCard({ insights, loading, hasTranscript }: { insights: Insight[]; loading: boolean; hasTranscript: boolean }) {
  return (
    <div className="rounded-xl border border-border bg-card p-5 shadow-sm">
      <div className="mb-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Sparkles className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-semibold text-foreground">Insights AI</h3>
        </div>
        {loading && <Loader2 className="h-3 w-3 animate-spin text-muted-foreground" />}
      </div>
      {!hasTranscript && (
        <p className="text-xs text-muted-foreground">Les insights seront générés au fur et à mesure de la conversation.</p>
      )}
      {hasTranscript && insights.length === 0 && !loading && (
        <p className="text-xs text-muted-foreground">Analyse en attente de plus de contexte…</p>
      )}
      <ul className="space-y-2">
        {insights.map((i) => (
          <li key={i.id} className="rounded-lg border border-border bg-surface-elevated p-2.5 text-xs">
            <span className={`mb-1 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
              i.category === "Decision" ? "bg-success/15 text-success"
              : i.category === "Request" ? "bg-primary/15 text-primary"
              : i.category === "Risk" ? "bg-destructive/15 text-destructive"
              : "bg-warning/15 text-warning-foreground"
            }`}>{i.category}</span>
            <p className="text-foreground">{i.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

function formatTime(s: number) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

function DashboardKpis() {
  const totalAlerts = otherLiveMeetings.reduce((s, m) => s + m.alerts, 0);
  const avg = otherLiveMeetings.reduce((s, m) => s + m.sentiment, 0) / otherLiveMeetings.length;
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <Kpi icon={<Activity />} label="Live" value={String(otherLiveMeetings.length)} hint="rendez-vous" />
      <Kpi icon={<Bell />} label="Alertes" value={String(totalAlerts)} hint="à surveiller" tone="warning" />
      <Kpi icon={avg > 0.5 ? <TrendingUp /> : <TrendingDown />} label="Sentiment" value={`${Math.round(avg * 100)}%`} hint={avg > 0.5 ? "positif" : "tendu"} tone={avg > 0.5 ? "success" : "warning"} />
      <Kpi icon={<Users />} label="Clients" value="184" hint="ce mois" />
    </div>
  );
}

function Kpi({ icon, label, value, hint, tone = "default" }: { icon: React.ReactNode; label: string; value: string; hint: string; tone?: "default" | "success" | "warning" }) {
  const toneClass = tone === "success" ? "text-success" : tone === "warning" ? "text-warning-foreground" : "text-primary";
  return (
    <div className="rounded-lg border border-border bg-surface-elevated p-3.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-1 font-display text-2xl font-semibold text-foreground">{value}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>
        </div>
        <div className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-accent ${toneClass} [&_svg]:h-3.5 [&_svg]:w-3.5`}>
          {icon}
        </div>
      </div>
    </div>
  );
}

function LiveMeetingsTable() {
  return (
    <div className="overflow-hidden rounded-lg border border-border">
      <table className="w-full text-sm">
        <thead className="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground">
          <tr>
            <th className="px-4 py-2.5 text-left font-medium">Client</th>
            <th className="px-4 py-2.5 text-left font-medium">Chargé d'affaires</th>
            <th className="px-4 py-2.5 text-left font-medium">Durée</th>
            <th className="px-4 py-2.5 text-left font-medium">Sentiment</th>
            <th className="px-4 py-2.5 text-left font-medium">Alertes</th>
            <th className="px-4 py-2.5" />
          </tr>
        </thead>
        <tbody>
          {otherLiveMeetings.map((m, i) => (
            <motion.tr
              key={m.id}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className="border-t border-border hover:bg-accent/30"
            >
              <td className="px-4 py-3">
                <div className="flex items-center gap-2.5">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-primary text-[11px] font-semibold text-primary-foreground">
                    {m.client.split(" ").slice(-1)[0][0]}
                  </div>
                  <div className="min-w-0">
                    <div className="truncate font-medium text-foreground">{m.client}</div>
                    {m.live && <div className="text-[10px] text-success">● Suivi par vous</div>}
                  </div>
                </div>
              </td>
              <td className="px-4 py-3 text-muted-foreground">{m.rm}</td>
              <td className="px-4 py-3 font-mono text-xs text-foreground">{m.duration}</td>
              <td className="px-4 py-3">
                <MiniSentiment value={m.sentiment} />
              </td>
              <td className="px-4 py-3">
                {m.alerts > 0 ? (
                  <span className="inline-flex items-center gap-1 rounded-full bg-warning/15 px-2 py-0.5 text-[11px] font-medium text-warning-foreground">
                    <AlertTriangle className="h-3 w-3" /> {m.alerts}
                  </span>
                ) : (
                  <span className="text-xs text-muted-foreground">—</span>
                )}
              </td>
              <td className="px-4 py-3 text-right">
                <button className="inline-flex items-center gap-1 text-[11px] font-medium text-primary hover:underline">
                  Rejoindre <ArrowRight className="h-3 w-3" />
                </button>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function MiniSentiment({ value }: { value: number }) {
  const pct = Math.round(value * 100);
  const color = value > 0.6 ? "bg-success" : value > 0.4 ? "bg-warning" : "bg-destructive";
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
        <div className={`h-full ${color}`} style={{ width: `${pct}%` }} />
      </div>
      <span className="text-[11px] font-medium text-foreground">{pct}%</span>
    </div>
  );
}
