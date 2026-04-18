import { useEffect, useMemo, useRef, useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
// HMR refresh trigger
import { motion, AnimatePresence } from "framer-motion";
import { Toaster } from "sonner";
import { CopilotPanel } from "@/components/CopilotPanel";
import { ClientMindmapModal } from "@/components/ClientMindmapModal";
import { clients, clientList, defaultClientId, scriptedTranscript, type TranscriptLine, type Client, type Contract, type Position, type Project, type ClientEvent } from "@/lib/mock-data";
import { supabase } from "@/integrations/supabase/client";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Mic, MicOff, Pause, Play, Sparkles, AlertTriangle, CheckCircle2, Mail,
  Phone, Briefcase, Calendar, Tag, Loader2, Users, Network,
  Wallet, TrendingUp, Award, Clock, ChevronDown, ChevronRight, Target, Home, Heart, Activity as ActivityIcon, Lightbulb,
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
  const [mindmapOpen, setMindmapOpen] = useState(false);
  const [selectedClientId, setSelectedClientId] = useState<string>(defaultClientId);
  const client = clients[selectedClientId] ?? clients[defaultClientId];

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
      if (next.text.includes("45 000") || next.text.toLowerCase().includes("complément de revenus")) {
        addAlert({
          id: crypto.randomUUID(),
          type: "change",
          title: "Revenus exceptionnels détectés",
          detail: "Complément d'honoraires +45 000 € — fenêtre d'optimisation fiscale (PER).",
        });
      }
      if (next.text.toLowerCase().includes("inquiet") || next.text.toLowerCase().includes("inquiète") || next.text.toLowerCase().includes("volatilité")) {
        addAlert({
          id: crypto.randomUUID(),
          type: "risk",
          title: "Signal d'inquiétude client",
          detail: "Volatilité marchés sur l'AV (37% UC). Proposer arbitrage progressif.",
        });
      }
      if (next.text.includes("marc.girard@me.com")) {
        addAlert({
          id: crypto.randomUUID(),
          type: "change",
          title: "Mise à jour de coordonnées",
          detail: "Nouvel e-mail principal : marc.girard@me.com — à confirmer dans le CRM.",
        });
      }
      if (next.text.toLowerCase().includes("locatif") || next.text.includes("500 000")) {
        addAlert({
          id: crypto.randomUUID(),
          type: "info",
          title: "Projet patrimonial actif",
          detail: "Investissement locatif 500 k€ Nantes — lancer simulation prêt in fine.",
        });
      }
      if (next.text.toLowerCase().includes("léa") || next.text.toLowerCase().includes("tom") || next.text.toLowerCase().includes("enfants")) {
        addAlert({
          id: crypto.randomUUID(),
          type: "info",
          title: "Transmission · enfants",
          detail: "Léa (9) & Tom (5) — donation 31 865 €/enfant en franchise de droits.",
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
          <div className="flex items-center gap-3">
            <span className="hidden text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground lg:inline">
              Rendez-vous live
            </span>
          </div>
          <div className="flex items-center gap-3">
            <Select
              value={selectedClientId}
              onValueChange={(id) => {
                setSelectedClientId(id);
                // Reset live meeting state when switching client
                setLines([]);
                setSentimentSeries([]);
                setAlerts([]);
                setInsights([]);
                setElapsed(0);
                setRecording(false);
                setPaused(false);
                idxRef.current = 0;
              }}
            >
              <SelectTrigger className="h-8 w-[220px] text-xs">
                <Users className="mr-1.5 h-3.5 w-3.5 text-muted-foreground" />
                <SelectValue placeholder="Choisir un client" />
              </SelectTrigger>
              <SelectContent>
                {clientList.map((cl) => (
                  <SelectItem key={cl.id} value={cl.id} className="text-xs">
                    <span className="font-medium">{cl.name}</span>
                    <span className="ml-2 text-muted-foreground">· {cl.aum}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
          <ClientCard client={client} onOpenMindmap={() => setMindmapOpen(true)} />
          <SentimentCard avg={avgSentiment} series={sentimentSeries} />
          <AlertsCard alerts={alerts} />
          <InsightsCard insights={insights} loading={analyzing && insights.length === 0} hasTranscript={lines.length > 0} />
        </aside>

        {/* CENTER — Client 360° workspace */}
        <section className="flex h-[calc(100vh-140px)] flex-col overflow-hidden rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border px-5 py-3">
            <div>
              <h2 className="font-display text-lg font-semibold text-foreground">Client 360° · {client.name}</h2>
              <p className="text-xs text-muted-foreground">
                Vue détaillée du patrimoine, des projets et de l'activité du client
              </p>
            </div>
            <span className="flex items-center gap-2 text-xs text-muted-foreground">
              <span className="h-2 w-2 rounded-full bg-success pulse-ring" />
              live
            </span>
          </div>
          <div className="flex-1 space-y-5 overflow-y-auto px-5 py-5">
            <ClientKpiStrip client={client} />
            <ClientWorkspaceTabs client={client} />
          </div>
        </section>

        {/* RIGHT — Proactive Co-pilot */}
        <aside>
          <CopilotPanel
            transcript={lines.map((l) => `${l.speaker === "RM" ? "Conseiller" : "Client"}: ${l.text}`).join("\n")}
            recording={recording && !paused}
            clientId={client.id}
            clientName={client.name}
          />
        </aside>
      </main>
      <Toaster position="bottom-right" richColors closeButton />
      <ClientMindmapModal
        open={mindmapOpen}
        onClose={() => setMindmapOpen(false)}
        client={client}
        transcript={lines.map((l) => `${l.speaker === "RM" ? "Conseiller" : "Client"}: ${l.text}`).join("\n")}
      />
    </div>
  );
}

function ClientCard({ client, onOpenMindmap }: { client: Client; onOpenMindmap: () => void }) {
  const c = client;
  const topProjects = c.projects.slice(0, 3);
  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary font-display text-lg font-semibold text-primary-foreground shadow-glow">
          {c.initials}
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-xl font-semibold leading-tight text-foreground">{c.name}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{c.id} · {c.segment}</p>
          {c.profession && c.city && (
            <p className="mt-0.5 text-xs text-muted-foreground">{c.profession} · {c.city}{c.age ? ` · ${c.age} ans` : ""}</p>
          )}
        </div>
      </div>

      <button
        onClick={onOpenMindmap}
        className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-medium text-primary transition-colors hover:bg-primary/10"
      >
        <Network className="h-4 w-4" /> Synthèse AI · Fiche 360°
      </button>

      <dl className="mt-6 space-y-3.5 text-sm">
        <Row icon={<Briefcase className="h-4 w-4" />} label="AUM" value={c.aum} />
        <Row icon={<Tag className="h-4 w-4" />} label="Profil de risque" value={c.riskProfile} />
        <Row icon={<Calendar className="h-4 w-4" />} label="Conseiller" value={c.rm ?? "—"} />
        <Row icon={<Mail className="h-4 w-4" />} label="Email" value={c.email ?? "—"} />
        <Row icon={<Phone className="h-4 w-4" />} label="Téléphone" value={c.phone || "—"} />
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        {c.tags.map((t) => (
          <span key={t} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">{t}</span>
        ))}
      </div>

      {c.family && (
        <div className="mt-5 border-t border-border pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Foyer</p>
          <p className="mt-2 text-sm text-foreground">
            {c.family.status}
            {c.family.spouse ? ` · avec ${c.family.spouse}` : ""}
            {c.family.childrenAges.length > 0 ? ` · ${c.family.childrenAges.length} enfant${c.family.childrenAges.length > 1 ? "s" : ""} (${c.family.childrenAges.join(", ")} ans)` : ""}
          </p>
          {c.family.housing && (
            <p className="mt-1 text-xs text-muted-foreground">{c.family.housing}{c.family.residenceValue ? ` · résidence estimée ${Math.round(c.family.residenceValue / 1000)} k€` : ""}</p>
          )}
        </div>
      )}

      {topProjects.length > 0 && (
        <div className="mt-5 border-t border-border pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Projets déclarés</p>
          <ul className="mt-3 space-y-2 text-sm">
            {topProjects.map((p, i) => (
              <li key={i} className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-foreground">{p.label}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {p.horizonYears != null ? `${p.horizonYears} an${p.horizonYears > 1 ? "s" : ""}` : ""}
                    {p.targetAmount ? ` · cible ${Math.round(p.targetAmount / 1000)} k€` : ""}
                  </p>
                </div>
                {p.priority && (
                  <span className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider ${
                    p.priority.toLowerCase() === "haute" ? "bg-destructive/15 text-destructive"
                    : p.priority.toLowerCase() === "moyenne" ? "bg-warning/15 text-warning-foreground"
                    : "bg-muted text-muted-foreground"
                  }`}>{p.priority}</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="mt-5 border-t border-border pt-4">
        <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">
          Portefeuille · {c.contracts.length} contrats
        </p>
        <ul className="mt-3 space-y-1.5 text-sm text-muted-foreground">
          {c.contracts.slice(0, 6).map((k) => (
            <li key={k.id} className="flex justify-between gap-2">
              <span className="truncate">· {k.label}</span>
              {k.balance != null && (
                <span className={`shrink-0 font-medium ${k.balance < 0 ? "text-destructive" : "text-foreground"}`}>
                  {Math.abs(k.balance) >= 1000 ? `${(k.balance / 1000).toFixed(0)} k€` : `${Math.round(k.balance)} €`}
                </span>
              )}
            </li>
          ))}
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

// =====================================================================
// CLIENT 360° WORKSPACE
// =====================================================================

function fmtEur(n: number | null | undefined, opts: { compact?: boolean } = {}) {
  if (n == null || isNaN(n)) return "—";
  const abs = Math.abs(n);
  if (opts.compact || abs >= 1000) {
    if (abs >= 1_000_000) return `${(n / 1_000_000).toFixed(abs >= 10_000_000 ? 1 : 2)} M€`;
    if (abs >= 1000) return `${Math.round(n / 1000)} k€`;
  }
  return `${Math.round(n)} €`;
}

function fmtDateFr(s: string | null | undefined) {
  if (!s) return "—";
  const d = new Date(s);
  if (isNaN(d.getTime())) return s;
  return d.toLocaleDateString("fr-FR", { day: "2-digit", month: "short", year: "numeric" });
}

function ClientKpiStrip({ client }: { client: Client }) {
  const tmiBadge = client.tmi != null ? `${client.tmi}%` : null;
  const equipPct = client.equipmentScore != null ? (client.equipmentScore / 10) * 100 : 0;
  return (
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
      <KpiTile
        icon={<Wallet />}
        label="Patrimoine net"
        value={fmtEur(client.netWorth, { compact: true })}
        hint={`Actifs ${fmtEur(client.totalAssets, { compact: true })} · Dette ${fmtEur(client.totalDebt, { compact: true })}`}
      />
      <KpiTile
        icon={<TrendingUp />}
        label="Revenus annuels"
        value={fmtEur(client.annualRevenue, { compact: true })}
        hint={tmiBadge ? `Tranche marginale ${tmiBadge}` : "TMI non renseignée"}
        tone="success"
      />
      <KpiTile
        icon={<Award />}
        label="Équipement"
        value={`${client.equipmentScore ?? "—"}/10`}
        hint={`${client.contracts.length} contrats actifs`}
        progress={equipPct}
      />
      <KpiTile
        icon={<Clock />}
        label="Ancienneté"
        value={client.seniorityYears != null ? `${client.seniorityYears.toFixed(1)} ans` : "—"}
        hint={`Client depuis ${fmtDateFr(client.clientSinceDate)}`}
      />
    </div>
  );
}

function KpiTile({ icon, label, value, hint, tone = "default", progress }: {
  icon: React.ReactNode; label: string; value: string; hint: string;
  tone?: "default" | "success" | "warning"; progress?: number;
}) {
  const toneClass = tone === "success" ? "text-success" : tone === "warning" ? "text-warning-foreground" : "text-primary";
  return (
    <div className="rounded-lg border border-border bg-surface-elevated p-3.5">
      <div className="flex items-start justify-between gap-2">
        <div className="min-w-0">
          <p className="text-[10px] font-medium uppercase tracking-wider text-muted-foreground">{label}</p>
          <p className="mt-1 font-display text-xl font-semibold leading-tight text-foreground whitespace-nowrap">{value}</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">{hint}</p>
        </div>
        <div className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-accent ${toneClass} [&_svg]:h-3.5 [&_svg]:w-3.5`}>
          {icon}
        </div>
      </div>
      {progress != null && (
        <div className="mt-2.5 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <div className="h-full bg-gradient-primary transition-all" style={{ width: `${Math.min(100, Math.max(0, progress))}%` }} />
        </div>
      )}
    </div>
  );
}

type TabKey = "patrimoine" | "projets" | "activite" | "risques";

function ClientWorkspaceTabs({ client }: { client: Client }) {
  const [tab, setTab] = useState<TabKey>("patrimoine");
  const tabs: { key: TabKey; label: string; icon: React.ReactNode }[] = [
    { key: "patrimoine", label: "Patrimoine", icon: <Wallet className="h-3.5 w-3.5" /> },
    { key: "projets", label: "Projets & Vie", icon: <Target className="h-3.5 w-3.5" /> },
    { key: "activite", label: "Activité récente", icon: <ActivityIcon className="h-3.5 w-3.5" /> },
    { key: "risques", label: "Risques & Opportunités", icon: <Lightbulb className="h-3.5 w-3.5" /> },
  ];
  return (
    <div>
      <div className="flex flex-wrap gap-1 rounded-lg bg-muted/60 p-1">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setTab(t.key)}
            className={`inline-flex flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-md px-3 py-1.5 text-xs font-medium transition-all ${
              tab === t.key ? "bg-background text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {tab === "patrimoine" && <PatrimoineTab client={client} />}
        {tab === "projets" && <ProjetsTab client={client} />}
        {tab === "activite" && <ActiviteTab client={client} />}
        {tab === "risques" && <RisquesTab client={client} />}
      </div>
    </div>
  );
}

// ----- Patrimoine -----

function PatrimoineTab({ client }: { client: Client }) {
  const buckets = useMemo(() => computeAssetBuckets(client), [client]);
  const total = buckets.reduce((s, b) => s + b.value, 0);
  const [openId, setOpenId] = useState<string | null>(null);

  const sortedContracts = [...client.contracts].sort((a, b) => (b.balance ?? 0) - (a.balance ?? 0));

  return (
    <div className="space-y-5">
      {/* Allocation bar */}
      <div className="rounded-lg border border-border bg-surface-elevated p-4">
        <div className="mb-3 flex items-center justify-between">
          <h3 className="text-sm font-semibold text-foreground">Allocation du patrimoine</h3>
          <span className="text-xs text-muted-foreground">{fmtEur(total, { compact: true })} brut</span>
        </div>
        <div className="flex h-3 w-full overflow-hidden rounded-full bg-muted">
          {buckets.map((b) => (
            <div key={b.label} className={b.color} style={{ width: `${total > 0 ? (b.value / total) * 100 : 0}%` }} title={`${b.label} · ${fmtEur(b.value)}`} />
          ))}
        </div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-xs sm:grid-cols-3 lg:grid-cols-5">
          {buckets.map((b) => (
            <div key={b.label} className="flex items-center gap-1.5">
              <span className={`h-2 w-2 rounded-full ${b.color}`} />
              <span className="text-muted-foreground">{b.label}</span>
              <span className="ml-auto font-medium text-foreground">{total > 0 ? Math.round((b.value / total) * 100) : 0}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Contracts table */}
      <div className="overflow-hidden rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-muted/50 text-[10px] uppercase tracking-wider text-muted-foreground">
            <tr>
              <th className="w-8 px-3 py-2.5" />
              <th className="px-3 py-2.5 text-left font-medium">Contrat</th>
              <th className="px-3 py-2.5 text-left font-medium">Famille</th>
              <th className="px-3 py-2.5 text-right font-medium">Encours</th>
              <th className="px-3 py-2.5 text-left font-medium">Allocation</th>
              <th className="px-3 py-2.5 text-left font-medium">Échéance</th>
            </tr>
          </thead>
          <tbody>
            {sortedContracts.map((c) => (
              <ContractRow
                key={c.id}
                contract={c}
                open={openId === c.id}
                onToggle={() => setOpenId(openId === c.id ? null : c.id)}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ContractRow({ contract, open, onToggle }: { contract: Contract; open: boolean; onToggle: () => void }) {
  const hasPositions = contract.positions && contract.positions.length > 0;
  const hasAlloc = contract.allocFondsEuro != null || contract.allocUC != null;
  const balance = contract.balance ?? 0;
  return (
    <>
      <tr className={`border-t border-border transition-colors ${hasPositions ? "cursor-pointer hover:bg-accent/30" : ""}`} onClick={hasPositions ? onToggle : undefined}>
        <td className="px-3 py-2.5">
          {hasPositions ? (
            open ? <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" /> : <ChevronRight className="h-3.5 w-3.5 text-muted-foreground" />
          ) : null}
        </td>
        <td className="px-3 py-2.5">
          <div className="font-medium text-foreground">{contract.label}</div>
          <div className="text-[10px] text-muted-foreground">{contract.id} · ouvert {fmtDateFr(contract.openingDate)}</div>
        </td>
        <td className="px-3 py-2.5 text-xs text-muted-foreground">{contract.family ?? "—"}</td>
        <td className={`px-3 py-2.5 text-right font-medium tabular-nums ${balance < 0 ? "text-destructive" : "text-foreground"}`}>
          {fmtEur(balance, { compact: true })}
        </td>
        <td className="px-3 py-2.5 text-xs text-muted-foreground">
          {hasAlloc ? (
            <div className="flex items-center gap-1.5">
              <div className="flex h-1.5 w-20 overflow-hidden rounded-full bg-muted">
                <div className="h-full bg-primary" style={{ width: `${contract.allocFondsEuro ?? 0}%` }} />
                <div className="h-full bg-warning" style={{ width: `${contract.allocUC ?? 0}%` }} />
              </div>
              <span className="text-[10px]">€{Math.round(contract.allocFondsEuro ?? 0)} / UC{Math.round(contract.allocUC ?? 0)}</span>
            </div>
          ) : contract.rate != null ? (
            <span>{contract.rate}% taux</span>
          ) : (
            <span>—</span>
          )}
        </td>
        <td className="px-3 py-2.5 text-xs text-muted-foreground">{fmtDateFr(contract.maturity)}</td>
      </tr>
      {open && hasPositions && (
        <tr className="border-t border-border bg-muted/20">
          <td />
          <td colSpan={5} className="px-3 py-3">
            <p className="mb-2 text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              {contract.positions.length} position{contract.positions.length > 1 ? "s" : ""}
            </p>
            <div className="space-y-1.5">
              {contract.positions.map((p: Position) => (
                <div key={p.id} className="flex items-center justify-between gap-3 rounded-md bg-card px-3 py-2 text-xs">
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-medium text-foreground">{p.label ?? p.isin}</div>
                    <div className="text-[10px] text-muted-foreground">{[p.isin, p.assetClass, p.geo].filter(Boolean).join(" · ")}</div>
                  </div>
                  <div className="text-right tabular-nums">
                    <div className="font-medium text-foreground">{fmtEur(p.valuation, { compact: true })}</div>
                    {p.weight != null && <div className="text-[10px] text-muted-foreground">{p.weight.toFixed(1)}%</div>}
                  </div>
                </div>
              ))}
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

function computeAssetBuckets(client: Client) {
  const buckets = [
    { label: "Liquidités", color: "bg-sky-400", value: 0 },
    { label: "Épargne réglementée", color: "bg-emerald-400", value: 0 },
    { label: "Assurance-vie", color: "bg-violet-400", value: 0 },
    { label: "Compte-titres / PEA", color: "bg-amber-400", value: 0 },
    { label: "Retraite", color: "bg-rose-400", value: 0 },
  ];
  for (const c of client.contracts) {
    const bal = c.balance ?? 0;
    if (bal <= 0) continue;
    const fam = (c.family ?? "").toLowerCase();
    if (fam.includes("compte") && !fam.includes("titres")) buckets[0].value += bal;
    else if (fam.includes("réglement")) buckets[1].value += bal;
    else if (fam.includes("assurance")) buckets[2].value += bal;
    else if (fam.includes("titres")) buckets[3].value += bal;
    else if (fam.includes("retraite")) buckets[4].value += bal;
    else buckets[0].value += bal;
  }
  return buckets;
}

// ----- Projets & Vie -----

function ProjetsTab({ client }: { client: Client }) {
  const sorted = [...client.projects].sort((a, b) => (a.horizonYears ?? 99) - (b.horizonYears ?? 99));
  return (
    <div className="space-y-5">
      {/* Family card */}
      {client.family && (
        <div className="rounded-lg border border-border bg-surface-elevated p-4">
          <div className="mb-3 flex items-center gap-2">
            <Heart className="h-4 w-4 text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Foyer</h3>
          </div>
          <div className="grid gap-3 text-xs sm:grid-cols-2">
            <FamilyRow label="Situation" value={client.family.status} />
            <FamilyRow label="Régime matrimonial" value={client.family.matrimonial} />
            <FamilyRow label="Conjoint" value={client.family.spouse ? `${client.family.spouse}${client.family.spouseAge ? ` (${client.family.spouseAge} ans)` : ""}` : null} />
            <FamilyRow label="Enfants" value={client.family.childrenAges.length > 0 ? `${client.family.childrenAges.length} (${client.family.childrenAges.join(", ")} ans)` : "Aucun"} />
            <FamilyRow label="Logement" value={client.family.housing} icon={<Home className="h-3 w-3" />} />
            <FamilyRow label="Résidence" value={client.family.residenceValue ? `${fmtEur(client.family.residenceValue, { compact: true })}${client.family.residenceYear ? ` (${client.family.residenceYear})` : ""}` : null} />
          </div>
        </div>
      )}

      {/* Projects timeline */}
      <div>
        <h3 className="mb-3 text-sm font-semibold text-foreground">Projets déclarés ({sorted.length})</h3>
        {sorted.length === 0 && (
          <p className="text-xs text-muted-foreground">Aucun projet déclaré.</p>
        )}
        <div className="space-y-2.5">
          {sorted.map((p, i) => <ProjectItem key={i} project={p} />)}
        </div>
      </div>
    </div>
  );
}

function FamilyRow({ label, value, icon }: { label: string; value: string | null; icon?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-2 border-b border-border/50 pb-1.5 last:border-0 last:pb-0">
      <span className="flex items-center gap-1.5 text-muted-foreground">{icon}{label}</span>
      <span className="font-medium text-foreground">{value ?? "—"}</span>
    </div>
  );
}

function ProjectItem({ project }: { project: Project }) {
  const priority = (project.priority ?? "").toLowerCase();
  const accent = priority === "haute" ? "border-l-destructive" : priority === "moyenne" ? "border-l-warning" : "border-l-muted";
  const horizonLabel = project.horizonYears != null ? `${project.horizonYears} an${project.horizonYears > 1 ? "s" : ""}` : "—";
  return (
    <div className={`flex items-center justify-between gap-3 rounded-lg border border-border border-l-4 bg-card px-4 py-3 ${accent}`}>
      <div className="min-w-0 flex-1">
        <p className="font-medium text-foreground">{project.label}</p>
        <p className="mt-0.5 text-[11px] text-muted-foreground">
          Horizon {horizonLabel}{project.declaredAt ? ` · déclaré le ${fmtDateFr(project.declaredAt)}` : ""}
        </p>
      </div>
      <div className="text-right">
        <p className="font-display text-base font-semibold text-foreground">{fmtEur(project.targetAmount, { compact: true })}</p>
        {project.priority && (
          <span className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
            priority === "haute" ? "bg-destructive/15 text-destructive"
            : priority === "moyenne" ? "bg-warning/15 text-warning-foreground"
            : "bg-muted text-muted-foreground"
          }`}>{project.priority}</span>
        )}
      </div>
    </div>
  );
}

// ----- Activité récente -----

function ActiviteTab({ client }: { client: Client }) {
  const sorted = [...client.recentEvents].sort((a, b) => {
    const da = a.date ? new Date(a.date).getTime() : 0;
    const db = b.date ? new Date(b.date).getTime() : 0;
    return db - da;
  });
  return (
    <div>
      <h3 className="mb-3 text-sm font-semibold text-foreground">Historique d'activité ({sorted.length})</h3>
      {sorted.length === 0 && <p className="text-xs text-muted-foreground">Aucun événement.</p>}
      <ol className="relative space-y-3 border-l border-border pl-5">
        {sorted.map((e, i) => <EventItem key={i} event={e} />)}
      </ol>
    </div>
  );
}

function EventItem({ event }: { event: ClientEvent }) {
  const crit = (event.criticality ?? "").toLowerCase();
  const dot = crit.includes("important") || crit.includes("critique") ? "bg-destructive"
    : crit.includes("suivre") ? "bg-warning"
    : "bg-primary";
  return (
    <li className="relative">
      <span className={`absolute -left-[26px] top-1.5 h-2.5 w-2.5 rounded-full ring-2 ring-card ${dot}`} />
      <div className="rounded-lg border border-border bg-card px-4 py-2.5">
        <div className="flex items-center justify-between gap-2">
          <p className="text-sm font-medium text-foreground">{event.category ?? event.type}</p>
          <span className="font-mono text-[10px] text-muted-foreground">{fmtDateFr(event.date)}</span>
        </div>
        <p className="mt-0.5 text-xs text-muted-foreground">
          {event.description ?? event.type}
          {event.channel ? ` · ${event.channel}` : ""}
        </p>
        {event.criticality && (
          <span className={`mt-1.5 inline-block rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
            crit.includes("important") || crit.includes("critique") ? "bg-destructive/15 text-destructive"
            : crit.includes("suivre") ? "bg-warning/15 text-warning-foreground"
            : "bg-muted text-muted-foreground"
          }`}>{event.criticality}</span>
        )}
      </div>
    </li>
  );
}

// ----- Risques & Opportunités -----

function RisquesTab({ client }: { client: Client }) {
  const signals = useMemo(() => computeSignals(client), [client]);
  return (
    <div className="space-y-3">
      {signals.length === 0 && (
        <p className="text-xs text-muted-foreground">Aucun signal détecté pour ce client.</p>
      )}
      {signals.map((s, i) => (
        <div key={i} className={`rounded-lg border p-4 ${
          s.tone === "risk" ? "border-destructive/30 bg-destructive/5"
          : s.tone === "opportunity" ? "border-success/30 bg-success/5"
          : "border-warning/40 bg-warning/5"
        }`}>
          <div className="flex items-start gap-2.5">
            {s.tone === "risk" ? <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-destructive" />
              : s.tone === "opportunity" ? <Lightbulb className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              : <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-warning-foreground" />}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold text-foreground">{s.title}</p>
                <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-wider ${
                  s.tone === "risk" ? "bg-destructive/15 text-destructive"
                  : s.tone === "opportunity" ? "bg-success/15 text-success"
                  : "bg-warning/15 text-warning-foreground"
                }`}>{s.tone === "risk" ? "Risque" : s.tone === "opportunity" ? "Opportunité" : "À suivre"}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground">{s.detail}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

type Signal = { title: string; detail: string; tone: "risk" | "opportunity" | "watch" };

function computeSignals(client: Client): Signal[] {
  const signals: Signal[] = [];
  const totalAssets = client.totalAssets || client.contracts.reduce((s, c) => s + Math.max(0, c.balance ?? 0), 0);

  // Liquidity
  const cash = client.contracts.filter((c) => (c.family ?? "").toLowerCase().includes("compte") && !(c.family ?? "").toLowerCase().includes("titres"))
    .reduce((s, c) => s + Math.max(0, c.balance ?? 0), 0);
  const cashRatio = totalAssets > 0 ? (cash / totalAssets) * 100 : 0;
  if (cashRatio > 25) {
    signals.push({
      title: `Liquidités élevées (${cashRatio.toFixed(0)}%)`,
      detail: `${fmtEur(cash, { compact: true })} dorment sur le compte courant. Opportunité d'arbitrage vers AV ou compte-titres.`,
      tone: "opportunity",
    });
  } else if (cashRatio < 5 && totalAssets > 50000) {
    signals.push({
      title: "Liquidités très faibles",
      detail: `Seulement ${cashRatio.toFixed(1)}% du patrimoine est disponible. Risque de tension de trésorerie.`,
      tone: "risk",
    });
  }

  // Concentration risk on top positions
  const allPositions = client.contracts.flatMap((c) => c.positions.map((p) => ({ ...p, contractValue: c.balance ?? 0 })));
  if (allPositions.length >= 3) {
    const sorted = [...allPositions].sort((a, b) => (b.valuation ?? 0) - (a.valuation ?? 0));
    const top3 = sorted.slice(0, 3).reduce((s, p) => s + (p.valuation ?? 0), 0);
    const totalPos = allPositions.reduce((s, p) => s + (p.valuation ?? 0), 0);
    if (totalPos > 0) {
      const top3Pct = (top3 / totalPos) * 100;
      if (top3Pct > 60) {
        signals.push({
          title: `Concentration top 3 positions (${top3Pct.toFixed(0)}%)`,
          detail: `${sorted.slice(0, 3).map((p) => p.label).filter(Boolean).join(", ")} concentrent l'essentiel des UC. Diversification à envisager.`,
          tone: "risk",
        });
      }
    }
  }

  // Tax optimization: high TMI without PER
  const hasPER = client.contracts.some((c) => (c.family ?? "").toLowerCase().includes("retraite"));
  if (client.tmi != null && client.tmi >= 30 && !hasPER) {
    signals.push({
      title: "Optimisation fiscale · PER non équipé",
      detail: `TMI à ${client.tmi}% sans PER. Versement déductible jusqu'à 10% des revenus → économie potentielle ~${fmtEur(((client.annualRevenue ?? 0) * 0.1 * client.tmi) / 100, { compact: true })}.`,
      tone: "opportunity",
    });
  }

  // Livret saturation
  for (const c of client.contracts) {
    if (c.ceiling && c.balance && c.balance / c.ceiling > 0.9) {
      signals.push({
        title: `${c.label} quasi saturé (${Math.round((c.balance / c.ceiling) * 100)}%)`,
        detail: `Plafond ${fmtEur(c.ceiling, { compact: true })} presque atteint. Réorienter les nouveaux versements vers AV ou PEA.`,
        tone: "watch",
      });
    }
  }

  // Maturity alerts (< 12 months)
  const now = Date.now();
  const oneYear = 365 * 24 * 3600 * 1000;
  for (const c of client.contracts) {
    if (!c.maturity) continue;
    const m = new Date(c.maturity).getTime();
    if (!isNaN(m) && m - now < oneYear && m - now > 0) {
      const months = Math.round((m - now) / (30 * 24 * 3600 * 1000));
      signals.push({
        title: `${c.label} arrive à échéance`,
        detail: `Échéance dans ${months} mois (${fmtDateFr(c.maturity)}). Anticiper la stratégie de réemploi.`,
        tone: "watch",
      });
    }
  }

  // Equipment gap
  if (client.equipmentScore != null && client.equipmentScore <= 4) {
    signals.push({
      title: `Score d'équipement faible (${client.equipmentScore}/10)`,
      detail: "Le client est sous-équipé par rapport à son segment. Opportunité de proposer AV, PEA ou carte premium selon le profil.",
      tone: "opportunity",
    });
  }

  return signals;
}
