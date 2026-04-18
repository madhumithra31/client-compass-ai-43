import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { askAgent, quickAgent } from "@/lib/copilot-api";
import { toast } from "sonner";
import {
  Sparkles, Send, Loader2, Check, X, MessageSquare, Lightbulb,
  HelpCircle, MessageCircle, AlertOctagon, Package, ListTodo, Zap,
} from "lucide-react";

export type Suggestion = {
  id: string;
  type: "question" | "talking_point" | "objection" | "product" | "action";
  priority: "high" | "medium" | "low";
  title: string;
  body: string;
  status: "active" | "used" | "dismissed";
  ts: number;
};

type ChatMsg = { role: "user" | "assistant"; content: string };

const TYPE_META: Record<Suggestion["type"], { label: string; Icon: React.ComponentType<{ className?: string }> }> = {
  question:      { label: "Question à poser",     Icon: HelpCircle },
  talking_point: { label: "Point à aborder",      Icon: MessageCircle },
  objection:     { label: "Réponse à objection",  Icon: AlertOctagon },
  product:       { label: "Produit suggéré",      Icon: Package },
  action:        { label: "Action de suivi",      Icon: ListTodo },
};

export function CopilotPanel({ transcript, recording, clientId, clientName }: { transcript: string; recording: boolean; clientId?: string; clientName?: string }) {
  const [tab, setTab] = useState<"suggest" | "ask">("suggest");
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [loadingSuggest, setLoadingSuggest] = useState(false);
  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatBusy, setChatBusy] = useState(false);
  const lastSuggestLenRef = useRef(0);
  const chatEndRef = useRef<HTMLDivElement>(null);

  // Auto-fetch suggestions when transcript grows enough
  useEffect(() => {
    if (!transcript || transcript.length < 80) return;
    const grew = transcript.length - lastSuggestLenRef.current > 120;
    if (!grew) return;
    lastSuggestLenRef.current = transcript.length;
    void fetchSuggestions();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [transcript]);

  async function fetchSuggestions() {
    setLoadingSuggest(true);
    try {
      const raw = await quickAgent({
        keyword_id: "live_suggestions",
        client_id: clientId,
        client_name: clientName,
      });
      // Try to parse Render `response` as a JSON array of structured suggestions.
      // Fallback to a single "talking_point" card if it's plain text.
      let incoming: Array<Omit<Suggestion, "id" | "status" | "ts">> = [];
      try {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          incoming = parsed.filter(
            (s) => s && typeof s.title === "string" && typeof s.body === "string",
          );
        }
      } catch {
        // not JSON — treat as single suggestion
      }
      if (incoming.length === 0 && raw.trim()) {
        incoming = [{
          type: "talking_point",
          priority: "medium",
          title: "Suggestion live",
          body: raw.trim(),
        }];
      }
      setSuggestions((prev) => {
        const activeIds = new Set(prev.filter((s) => s.status !== "active").map((s) => `${s.type}:${s.title}`));
        const fresh: Suggestion[] = incoming
          .filter((s) => !activeIds.has(`${s.type}:${s.title}`))
          .map((s) => ({
            ...s,
            id: crypto.randomUUID(),
            status: "active" as const,
            ts: Date.now(),
          }));
        if (fresh.length > 0) {
          const high = fresh.find((f) => f.priority === "high");
          if (high) toast(`💡 ${high.title}`, { description: high.body });
        }
        // Keep only last 12, freshest first
        return [...fresh, ...prev].slice(0, 12);
      });
    } catch (e) {
      console.error("fetch suggestions failed", e);
    } finally {
      setLoadingSuggest(false);
    }
  }

  async function sendChat(override?: string) {
    const q = (override ?? chatInput).trim();
    if (!q || chatBusy) return;
    const newHistory = [...chat, { role: "user" as const, content: q }];
    setChat(newHistory);
    setChatInput("");
    setChatBusy(true);
    try {
      // Render `/ask` only takes a single `prompt` — we prepend client + transcript context.
      const ctxParts: string[] = [];
      if (clientName || clientId) {
        ctxParts.push(`Client: ${clientName ?? "(inconnu)"}${clientId ? ` (id: ${clientId})` : ""}`);
      }
      if (transcript) {
        const tail = transcript.slice(-1500);
        ctxParts.push(`Transcript récent:\n${tail}`);
      }
      ctxParts.push(`Question: ${q}`);
      const reply = await askAgent(ctxParts.join("\n\n"));
      setChat([...newHistory, { role: "assistant", content: reply || "(pas de réponse)" }]);
    } catch (e) {
      console.error(e);
      toast.error("Erreur du co-pilote", { description: e instanceof Error ? e.message : "Réessayez." });
      setChat(newHistory);
    } finally {
      setChatBusy(false);
    }
  }

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat.length, chatBusy]);

  function update(id: string, status: Suggestion["status"]) {
    setSuggestions((prev) => prev.map((s) => (s.id === id ? { ...s, status } : s)));
  }

  const active = suggestions.filter((s) => s.status === "active");
  const sortedActive = [...active].sort((a, b) => {
    const order = { high: 0, medium: 1, low: 2 };
    return order[a.priority] - order[b.priority] || b.ts - a.ts;
  });

  return (
    <div className="flex h-[calc(100vh-140px)] flex-col overflow-hidden rounded-xl border border-primary/30 bg-card shadow-elegant">
      {/* Header */}
      <div className="border-b border-border bg-gradient-to-br from-primary/8 to-transparent px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-md bg-gradient-primary shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" />
            </div>
            <div>
              <h3 className="font-display text-sm font-semibold text-foreground leading-tight">Co-pilote AI</h3>
              <p className="text-[10px] text-muted-foreground">Assistant proactif · contextuel</p>
            </div>
          </div>
          {recording && (
            <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
              <Zap className="h-3 w-3" /> Live
            </span>
          )}
        </div>

        {/* Tabs */}
        <div className="mt-3 flex gap-1 rounded-lg bg-muted p-1">
          <TabBtn active={tab === "suggest"} onClick={() => setTab("suggest")} icon={<Lightbulb className="h-3.5 w-3.5" />}>
            Suggestions {active.length > 0 && (
              <span className="ml-1 rounded-full bg-primary px-1.5 text-[9px] font-bold text-primary-foreground">
                {active.length}
              </span>
            )}
          </TabBtn>
          <TabBtn active={tab === "ask"} onClick={() => setTab("ask")} icon={<MessageSquare className="h-3.5 w-3.5" />}>
            Demander
          </TabBtn>
        </div>
      </div>

      {/* Body */}
      {tab === "suggest" ? (
        <div className="flex-1 overflow-y-auto px-3 py-3">
          {sortedActive.length === 0 && (
            <EmptyState
              loading={loadingSuggest}
              recording={recording}
              hasTranscript={transcript.length > 0}
            />
          )}
          <AnimatePresence initial={false}>
            {sortedActive.map((s) => (
              <SuggestionCard key={s.id} s={s} onUse={() => { update(s.id, "used"); toast.success("Suggestion adoptée"); }} onDismiss={() => update(s.id, "dismissed")} />
            ))}
          </AnimatePresence>
          {loadingSuggest && sortedActive.length > 0 && (
            <div className="flex items-center justify-center gap-1.5 py-2 text-[11px] text-muted-foreground">
              <Loader2 className="h-3 w-3 animate-spin" /> Mise à jour des suggestions…
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-1 flex-col overflow-hidden">
          <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {chat.length === 0 && (
              <div className="space-y-3">
                <p className="text-xs text-muted-foreground">
                  {clientName
                    ? `Ask a quick question about ${clientName} — the co-pilot already has their full profile and the live transcript.`
                    : "Select a client to ask context-aware questions. The co-pilot has access to their full profile and the live transcript."}
                </p>
                <div className="space-y-1.5">
                  {[
                    "Did this client earn money last year?",
                    "Is my client financially healthy?",
                    "What should I know before this meeting?",
                    "Which product might suit this client?",
                  ].map((q) => (
                    <button
                      key={q}
                      onClick={() => void sendChat(q)}
                      disabled={chatBusy}
                      className="block w-full rounded-md border border-border bg-surface-elevated px-3 py-2 text-left text-xs text-foreground transition-colors hover:border-primary/40 hover:bg-accent disabled:opacity-50"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {chat.map((m, i) => (
              <div key={i} className={`flex ${m.role === "user" ? "justify-end" : ""}`}>
                <div className={`max-w-[85%] rounded-2xl px-3.5 py-2 text-sm ${
                  m.role === "user"
                    ? "rounded-tr-sm bg-primary text-primary-foreground"
                    : "rounded-tl-sm bg-muted text-foreground"
                }`}>
                  <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>
                </div>
              </div>
            ))}
            {chatBusy && (
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" /> Le co-pilote réfléchit…
              </div>
            )}
            <div ref={chatEndRef} />
          </div>
          <form
            onSubmit={(e) => { e.preventDefault(); void sendChat(); }}
            className="flex items-end gap-2 border-t border-border bg-surface-elevated p-3"
          >
            <textarea
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  void sendChat();
                }
              }}
              rows={1}
              placeholder="Demandez quelque chose au co-pilote…"
              className="min-h-[38px] max-h-32 flex-1 resize-none rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
            />
            <button
              type="submit"
              disabled={chatBusy || !chatInput.trim()}
              className="flex h-9 w-9 items-center justify-center rounded-md bg-primary text-primary-foreground transition-opacity disabled:opacity-40"
            >
              <Send className="h-4 w-4" />
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function TabBtn({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-1 items-center justify-center gap-1.5 rounded-md px-2 py-1.5 text-xs font-medium transition-all ${
        active ? "bg-card text-foreground shadow-sm" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon}{children}
    </button>
  );
}

function SuggestionCard({ s, onUse, onDismiss }: { s: Suggestion; onUse: () => void; onDismiss: () => void }) {
  const meta = TYPE_META[s.type];
  const tone =
    s.priority === "high" ? "border-l-destructive bg-destructive/5"
    : s.priority === "medium" ? "border-l-primary bg-primary/5"
    : "border-l-muted-foreground/40 bg-surface-elevated";
  const priorityLabel = s.priority === "high" ? "Urgent" : s.priority === "medium" ? "Opportunité" : "Suggéré";
  const priorityColor =
    s.priority === "high" ? "bg-destructive text-destructive-foreground"
    : s.priority === "medium" ? "bg-primary text-primary-foreground"
    : "bg-muted text-muted-foreground";

  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: 20, scale: 0.97 }}
      animate={{ opacity: 1, x: 0, scale: 1 }}
      exit={{ opacity: 0, x: -20, height: 0, marginBottom: 0 }}
      transition={{ duration: 0.25 }}
      className={`mb-2.5 overflow-hidden rounded-lg border border-border border-l-[3px] ${tone} p-3`}
    >
      <div className="mb-1.5 flex items-center justify-between gap-2">
        <span className="inline-flex items-center gap-1 text-[10px] font-medium uppercase tracking-wider text-muted-foreground">
          <meta.Icon className="h-3 w-3" /> {meta.label}
        </span>
        <span className={`rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-wider ${priorityColor}`}>
          {priorityLabel}
        </span>
      </div>
      <p className="text-sm font-semibold leading-snug text-foreground">{s.title}</p>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{s.body}</p>
      <div className="mt-2.5 flex gap-1.5">
        <button
          onClick={onUse}
          className="inline-flex items-center gap-1 rounded-md bg-primary px-2.5 py-1 text-[11px] font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <Check className="h-3 w-3" /> Adopter
        </button>
        <button
          onClick={onDismiss}
          className="inline-flex items-center gap-1 rounded-md border border-border bg-card px-2.5 py-1 text-[11px] font-medium text-muted-foreground hover:bg-muted"
        >
          <X className="h-3 w-3" /> Ignorer
        </button>
      </div>
    </motion.div>
  );
}

function EmptyState({ loading, recording, hasTranscript }: { loading: boolean; recording: boolean; hasTranscript: boolean }) {
  return (
    <div className="flex h-full flex-col items-center justify-center px-4 py-8 text-center">
      <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent text-primary">
        {loading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Sparkles className="h-6 w-6" />}
      </div>
      <p className="mt-4 max-w-xs text-xs text-muted-foreground">
        {!recording && !hasTranscript && "Démarrez le rendez-vous : le co-pilote analysera la conversation et proposera des suggestions en temps réel."}
        {recording && !hasTranscript && "En attente de la première intervention…"}
        {hasTranscript && loading && "Génération des premières suggestions…"}
        {hasTranscript && !loading && "Aucune suggestion active. Le co-pilote suit la conversation."}
      </p>
    </div>
  );
}
