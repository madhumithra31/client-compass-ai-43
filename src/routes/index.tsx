import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Logo } from "@/components/Logo";
import { ArrowRight, Mic, BarChart3, Bell, Sparkles } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "BNP Paribas — Wealth Intelligence Platform" },
      { name: "description", content: "AI co-pilot for private banking meetings: live transcription, sentiment timeline, key insights and client change alerts." },
      { property: "og:title", content: "BNP Paribas — Wealth Intelligence Platform" },
      { property: "og:description", content: "AI co-pilot for private banking meetings." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header removed — global AppNav is rendered in __root.tsx */}

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-hero text-primary-foreground">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: "radial-gradient(circle at 20% 30%, white 0%, transparent 40%), radial-gradient(circle at 80% 70%, white 0%, transparent 35%)",
        }} />
        <div className="relative mx-auto max-w-7xl px-6 py-24 md:py-32">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur">
              <Sparkles className="h-3 w-3" /> Wealth Intelligence — Pilot
            </span>
            <h1 className="mt-6 font-display text-5xl font-semibold leading-[1.05] text-balance md:text-6xl lg:text-7xl">
              Chaque conversation client,<br />
              <span className="italic text-primary-glow">augmentée.</span>
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-white/80 md:text-xl">
              Transcription live, analyse de sentiment, extraction d'insights et détection
              automatique des changements client — directement dans vos rendez-vous patrimoniaux.
            </p>
            <div className="mt-10 flex flex-wrap gap-3">
              <Link
                to="/meeting"
                className="group inline-flex items-center gap-2 rounded-md bg-white px-6 py-3 text-sm font-semibold text-primary shadow-elegant transition-all hover:shadow-glow"
              >
                Démarrer un rendez-vous
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                Cockpit Manager
              </Link>
              <Link
                to="/portfolio"
                className="inline-flex items-center gap-2 rounded-md border border-white/30 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/10"
              >
                Vue Portefeuille
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Roles */}
      <section className="mx-auto max-w-7xl px-6 py-20">
        <div className="mb-12 max-w-2xl">
          <p className="text-xs font-medium uppercase tracking-[0.2em] text-primary">Deux interfaces</p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-foreground md:text-4xl">
            Conçue pour les chargés d'affaires et leurs managers.
          </h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2">
          <RoleCard
            to="/meeting"
            label="Chargé d'affaires"
            title="Vue rendez-vous live"
            description="Transcription en temps réel, fiche client enrichie, insights AI et alertes lorsque le client mentionne un changement."
            icon={<Mic className="h-5 w-5" />}
          />
          <RoleCard
            to="/dashboard"
            label="Manager"
            title="Cockpit de supervision"
            description="Visualisez tous les rendez-vous en cours, leur sentiment, les alertes critiques et intervenez si nécessaire."
            icon={<BarChart3 className="h-5 w-5" />}
          />
        </div>
      </section>

      {/* Capabilities */}
      <section className="border-t border-border/60 bg-surface-elevated">
        <div className="mx-auto max-w-7xl px-6 py-20">
          <div className="grid gap-8 md:grid-cols-4">
            <Capability icon={<Mic />} title="Transcription live" body="Speech-to-text par locuteur, latence < 1s." />
            <Capability icon={<BarChart3 />} title="Sentiment timeline" body="Évolution émotionnelle minute par minute." />
            <Capability icon={<Sparkles />} title="Insights AI" body="Décisions, demandes et risques extraits automatiquement." />
            <Capability icon={<Bell />} title="Alertes client" body="Détection des changements de profil en temps réel." />
          </div>
        </div>
      </section>

      <footer className="border-t border-border/60 py-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-6 text-xs text-muted-foreground md:flex-row">
          <p>© BNP Paribas — Pilot internal use only.</p>
          <p>Wealth Intelligence v0.1 · Lovable AI</p>
        </div>
      </footer>
    </div>
  );
}

function RoleCard({ to, label, title, description, icon }: { to: string; label: string; title: string; description: string; icon: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="group relative overflow-hidden rounded-xl border border-border bg-card p-8 shadow-sm transition-all hover:-translate-y-1 hover:shadow-elegant"
    >
      <div className="absolute right-0 top-0 h-32 w-32 translate-x-12 -translate-y-12 rounded-full bg-gradient-primary opacity-10 transition-transform group-hover:translate-x-8 group-hover:-translate-y-8" />
      <div className="relative">
        <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-accent text-primary">
          {icon}
        </div>
        <p className="mt-6 text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">{label}</p>
        <h3 className="mt-2 font-display text-2xl font-semibold text-foreground">{title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
        <div className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-primary">
          Entrer
          <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
        </div>
      </div>
    </Link>
  );
}

function Capability({ icon, title, body }: { icon: React.ReactNode; title: string; body: string }) {
  return (
    <div>
      <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary/10 text-primary [&_svg]:h-5 [&_svg]:w-5">
        {icon}
      </div>
      <h4 className="mt-4 text-sm font-semibold text-foreground">{title}</h4>
      <p className="mt-1 text-sm text-muted-foreground">{body}</p>
    </div>
  );
}
