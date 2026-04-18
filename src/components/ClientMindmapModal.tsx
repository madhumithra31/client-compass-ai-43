import { useEffect, useMemo, useState } from "react";
import { ReactFlow, Background, Controls, type Node, type Edge, MarkerType } from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { motion, AnimatePresence } from "framer-motion";
import { X, Sparkles, Loader2, RefreshCw } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { type Client } from "@/lib/mock-data";

type Branch = {
  title: string;
  tone: "positive" | "neutral" | "warning" | "risk" | "opportunity";
  points: string[];
};
type MindmapData = { summary: string; branches: Branch[] };

const TONE_STYLES: Record<Branch["tone"], { bg: string; border: string; dot: string; label: string }> = {
  positive:    { bg: "bg-success/10",     border: "border-success/40",     dot: "bg-success",     label: "text-success" },
  opportunity: { bg: "bg-primary/10",     border: "border-primary/40",     dot: "bg-primary",     label: "text-primary" },
  neutral:     { bg: "bg-muted",          border: "border-border",         dot: "bg-muted-foreground", label: "text-foreground" },
  warning:     { bg: "bg-warning/10",     border: "border-warning/50",     dot: "bg-warning",     label: "text-warning-foreground" },
  risk:        { bg: "bg-destructive/10", border: "border-destructive/40", dot: "bg-destructive", label: "text-destructive" },
};

function ClientNode({ data }: { data: { name: string; segment: string; initials: string; summary: string } }) {
  return (
    <div className="w-[260px] rounded-2xl border border-primary/40 bg-gradient-primary p-5 text-primary-foreground shadow-glow">
      <div className="flex items-center gap-3">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary-foreground/15 backdrop-blur font-display text-base font-semibold">
          {data.initials}
        </div>
        <div className="min-w-0">
          <div className="font-display text-base font-semibold leading-tight">{data.name}</div>
          <div className="text-[11px] opacity-80">{data.segment}</div>
        </div>
      </div>
      {data.summary && (
        <p className="mt-3 border-t border-primary-foreground/20 pt-3 text-[11px] leading-relaxed opacity-90">
          {data.summary}
        </p>
      )}
    </div>
  );
}

function BranchNode({ data }: { data: { branch: Branch } }) {
  const s = TONE_STYLES[data.branch.tone];
  return (
    <div className={`w-[230px] rounded-xl border ${s.border} ${s.bg} p-3.5 shadow-sm backdrop-blur`}>
      <div className="mb-2 flex items-center gap-2">
        <span className={`h-2 w-2 rounded-full ${s.dot}`} />
        <h4 className={`text-[11px] font-semibold uppercase tracking-wider ${s.label}`}>{data.branch.title}</h4>
      </div>
      <ul className="space-y-1.5">
        {data.branch.points.map((p, i) => (
          <li key={i} className="flex gap-1.5 text-[11px] leading-snug text-foreground">
            <span className="text-muted-foreground">·</span>
            <span>{p}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

const nodeTypes = { client: ClientNode, branch: BranchNode };

function buildGraph(client: Client, mindmap: MindmapData): { nodes: Node[]; edges: Edge[] } {
  const cx = 0, cy = 0;
  const nodes: Node[] = [
    {
      id: "client",
      type: "client",
      position: { x: cx, y: cy },
      data: { name: client.name, segment: client.segment, initials: client.initials, summary: mindmap.summary },
      draggable: true,
    },
  ];
  const edges: Edge[] = [];
  const n = mindmap.branches.length;
  const radius = 360;

  mindmap.branches.forEach((b, i) => {
    const angle = (i / n) * Math.PI * 2 - Math.PI / 2;
    const x = cx + Math.cos(angle) * radius;
    const y = cy + Math.sin(angle) * radius;
    const id = `b-${i}`;
    nodes.push({
      id,
      type: "branch",
      position: { x, y },
      data: { branch: b },
      draggable: true,
    });
    const tone = TONE_STYLES[b.tone].dot.replace("bg-", "");
    const colorMap: Record<string, string> = {
      success: "hsl(var(--success, 142 71% 45%))",
      primary: "hsl(var(--primary))",
      "muted-foreground": "hsl(var(--muted-foreground))",
      warning: "hsl(var(--warning, 38 92% 50%))",
      destructive: "hsl(var(--destructive))",
    };
    edges.push({
      id: `e-${i}`,
      source: "client",
      target: id,
      type: "smoothstep",
      animated: b.tone === "risk" || b.tone === "warning",
      style: { stroke: colorMap[tone] ?? "hsl(var(--border))", strokeWidth: 1.5 },
      markerEnd: { type: MarkerType.ArrowClosed },
    });
  });

  return { nodes, edges };
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

  const graph = useMemo(() => (data ? buildGraph(client, data) : { nodes: [], edges: [] }), [data, client]);

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

            <div className="relative flex-1 bg-background">
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
              {data && (
                <ReactFlow
                  nodes={graph.nodes}
                  edges={graph.edges}
                  nodeTypes={nodeTypes}
                  fitView
                  fitViewOptions={{ padding: 0.2 }}
                  minZoom={0.3}
                  maxZoom={1.5}
                  proOptions={{ hideAttribution: true }}
                >
                  <Background gap={24} size={1} color="hsl(var(--border))" />
                  <Controls showInteractive={false} className="!border-border !bg-card !shadow-sm" />
                </ReactFlow>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
