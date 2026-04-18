import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Loader2, RefreshCw, Briefcase, Tag, Calendar, Mail, Phone, Network } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { type Client } from "@/lib/mock-data";

type Branch = {
  title: string;
  tone: "positive" | "neutral" | "warning" | "risk" | "opportunity";
  points: string[];
};
type MindmapData = { summary: string; branches: Branch[] };

const TONE_STYLES: Record<Branch["tone"], { bg: string; border: string; dot: string; label: string }> = {
  positive:    { bg: "bg-success/10",     border: "border-success/40",     dot: "bg-success",          label: "text-success" },
  opportunity: { bg: "bg-primary/10",     border: "border-primary/40",     dot: "bg-primary",          label: "text-primary" },
  neutral:     { bg: "bg-muted",          border: "border-border",         dot: "bg-muted-foreground", label: "text-foreground" },
  warning:     { bg: "bg-warning/10",     border: "border-warning/50",     dot: "bg-warning",          label: "text-warning-foreground" },
  risk:        { bg: "bg-destructive/10", border: "border-destructive/40", dot: "bg-destructive",      label: "text-destructive" },
};

function ClientCardFull({ client }: { client: Client }) {
  const contractsByFamily = client.contracts.reduce<Record<string, typeof client.contracts>>((acc, c) => {
    const k = c.family || "Autres";
    (acc[k] ||= []).push(c);
    return acc;
  }, {});

  return (
    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
      <div className="flex items-center gap-4">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-gradient-primary font-display text-lg font-semibold text-primary-foreground shadow-glow">
          {client.initials}
        </div>
        <div className="min-w-0">
          <h3 className="font-display text-xl font-semibold leading-tight text-foreground">{client.name}</h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{client.id} · {client.segment}</p>
          {client.profession && client.city && (
            <p className="mt-0.5 text-xs text-muted-foreground">{client.profession} · {client.city}{client.age ? ` · ${client.age} ans` : ""}</p>
          )}
        </div>
      </div>

      <div className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-lg border border-primary/30 bg-primary/5 px-4 py-3 text-sm font-medium text-primary">
        <Network className="h-4 w-4" /> Synthèse AI · Fiche 360°
      </div>

      <dl className="mt-6 space-y-3.5 text-sm">
        <Row icon={<Briefcase className="h-4 w-4" />} label="AUM" value={client.aum} />
        <Row icon={<Tag className="h-4 w-4" />} label="Profil de risque" value={client.riskProfile} />
        <Row icon={<Calendar className="h-4 w-4" />} label="Conseiller" value={client.rm ?? "—"} />
        <Row icon={<Mail className="h-4 w-4" />} label="Email" value={client.email ?? "—"} />
        <Row icon={<Phone className="h-4 w-4" />} label="Téléphone" value={client.phone || "—"} />
      </dl>

      <div className="mt-5 flex flex-wrap gap-2">
        {client.tags.map((t) => (
          <span key={t} className="rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">{t}</span>
        ))}
      </div>

      {client.family && (
        <div className="mt-5 border-t border-border pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Foyer</p>
          <p className="mt-2 text-sm text-foreground">
            {client.family.status}
            {client.family.spouse ? ` · avec ${client.family.spouse}` : ""}
            {client.family.childrenAges.length > 0 ? ` · ${client.family.childrenAges.length} enfant${client.family.childrenAges.length > 1 ? "s" : ""} (${client.family.childrenAges.join(", ")} ans)` : ""}
          </p>
          {client.family.housing && (
            <p className="mt-1 text-xs text-muted-foreground">{client.family.housing}{client.family.residenceValue ? ` · résidence ~ ${Math.round(client.family.residenceValue / 1000)} k€` : ""}</p>
          )}
        </div>
      )}

      {client.projects.length > 0 && (
        <div className="mt-5 border-t border-border pt-4">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground">Projets déclarés</p>
          <ul className="mt-3 space-y-2 text-sm">
            {client.projects.map((p, i) => (
              <li key={i} className="flex items-start justify-between gap-2">
                <div className="min-w-0">
                  <p className="truncate text-foreground">{p.label}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {p.horizonYears != null ? `${p.horizonYears} an${p.horizonYears > 1 ? "s" : ""}` : ""}
                    {p.targetAmount ? ` · ${Math.round(p.targetAmount / 1000)} k€` : ""}
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
          Portefeuille · {client.contracts.length} contrats
        </p>
        {Object.entries(contractsByFamily).map(([fam, list]) => (
          <div key={fam} className="mt-3">
            <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">{fam}</p>
            <ul className="mt-1.5 space-y-1 text-sm text-muted-foreground">
              {list.map((k) => (
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
        ))}
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

function BranchCard({ branch, index }: { branch: Branch; index: number }) {
  const s = TONE_STYLES[branch.tone];
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay: index * 0.06, duration: 0.3 }}
      className={`rounded-xl border ${s.border} ${s.bg} p-4 shadow-sm`}
    >
      <div className="mb-2.5 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${s.dot}`} />
        <h4 className={`text-[11px] font-semibold uppercase tracking-wider ${s.label}`}>{branch.title}</h4>
      </div>
      <ul className="space-y-1.5">
        {branch.points.map((p, i) => (
          <li key={i} className="flex gap-1.5 text-xs leading-snug text-foreground">
            <span className="text-muted-foreground">·</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </motion.div>
  );
}

export function ClientMindmapModal({
  open,
  onClose,
  client,
  transcript,
}: {
  open: boolean;
  onClose: () => void;
  client: Client;
  transcript: string;
}) {
  const [data, setData] = useState<MindmapData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const { data: res, error: err } = await supabase.functions.invoke("client-mindmap", {
        body: { client, transcript },
      });
      if (err) throw err;
      if (res?.error) throw new Error(res.error);
      setData(res as MindmapData);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Erreur génération mind map");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (open && !data && !loading) void generate();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-foreground/40 p-4 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.96, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="relative flex h-[88vh] w-full max-w-6xl flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between border-b border-border bg-surface/80 px-5 py-3 backdrop-blur">
              <div className="flex items-center gap-2.5">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary/15 text-primary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="font-display text-base font-semibold text-foreground">
                    Synthèse AI · Fiche 360° client
                  </h2>
                  <p className="text-[11px] text-muted-foreground">
                    Carte mentale générée à partir des données client et de la conversation
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={generate}
                  disabled={loading}
                  className="inline-flex items-center gap-1.5 rounded-md border border-border bg-surface px-3 py-1.5 text-xs font-medium text-foreground hover:bg-accent disabled:opacity-50"
                >
                  {loading ? <Loader2 className="h-3 w-3 animate-spin" /> : <RefreshCw className="h-3 w-3" />}
                  Régénérer
                </button>
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground hover:bg-accent hover:text-foreground"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>

            {/* Body — dotted bg, two columns: client card | mindmap word cluster */}
            <div
              className="relative flex-1 overflow-y-auto"
              style={{
                backgroundImage: "radial-gradient(circle, hsl(var(--border) / 0.6) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
                backgroundColor: "hsl(var(--background))",
              }}
            >
              {loading && !data && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur">
                  <Loader2 className="h-6 w-6 animate-spin text-primary" />
                  <p className="text-sm text-muted-foreground">L'IA construit la carte mentale du client…</p>
                </div>
              )}
              {error && (
                <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/90 px-6 text-center">
                  <p className="text-sm text-destructive">{error}</p>
                  <button onClick={generate} className="rounded-md bg-primary px-4 py-2 text-xs font-medium text-primary-foreground">
                    Réessayer
                  </button>
                </div>
              )}

              <div className="grid gap-6 p-6 lg:grid-cols-[360px_minmax(0,1fr)]">
                {/* Left — Client card */}
                <div>
                  <ClientCardFull client={client} />
                </div>

                {/* Right — Mindmap as floating word-clusters (no lines) */}
                <div className="min-h-full">
                  {data && (
                    <>
                      {data.summary && (
                        <motion.p
                          initial={{ opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="mb-5 rounded-xl border border-primary/20 bg-primary/5 p-4 text-sm italic leading-relaxed text-foreground"
                        >
                          « {data.summary} »
                        </motion.p>
                      )}
                      <div className="grid gap-4 sm:grid-cols-2">
                        {data.branches.map((b, i) => (
                          <BranchCard key={`${b.title}-${i}`} branch={b} index={i} />
                        ))}
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
