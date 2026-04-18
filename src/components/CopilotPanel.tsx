import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { askAgent } from "@/lib/copilot-api";
import { toast } from "sonner";
import { Sparkles, Send, Loader2, Zap } from "lucide-react";

type ChatMsg = { role: "user" | "assistant"; content: string };

export function CopilotPanel({ transcript, recording, clientId, clientName }: { transcript: string; recording: boolean; clientId?: string; clientName?: string }) {
  const [chat, setChat] = useState<ChatMsg[]>([]);
  const [chatInput, setChatInput] = useState("");
  const [chatBusy, setChatBusy] = useState(false);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  async function sendChat(override?: string) {
    const q = (override ?? chatInput).trim();
    if (!q || chatBusy) return;
    const newHistory = [...chat, { role: "user" as const, content: q }];
    setChat(newHistory);
    setChatInput("");
    setChatBusy(true);
    try {
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
      toast.error("Erreur de l'assistant", { description: e instanceof Error ? e.message : "Réessayez." });
      setChat(newHistory);
    } finally {
      setChatBusy(false);
    }
  }

  useEffect(() => {
    const el = chatScrollRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [chat.length, chatBusy]);

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
              <h3 className="font-display text-sm font-semibold text-foreground leading-tight">Ask AI</h3>
              <p className="text-[10px] text-muted-foreground">Questions contextuelles sur le client</p>
            </div>
          </div>
          {recording && (
            <span className="inline-flex items-center gap-1 rounded-full bg-success/15 px-2 py-0.5 text-[10px] font-semibold text-success">
              <Zap className="h-3 w-3" /> Live
            </span>
          )}
        </div>
      </div>

      {/* Body — chat only */}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div ref={chatScrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
          {chat.length === 0 && (
            <div className="space-y-3">
              <p className="text-xs text-muted-foreground">
                {clientName
                  ? `Ask a quick question about ${clientName} — the assistant already has their full profile and the live transcript.`
                  : "Select a client to ask context-aware questions. The assistant has access to their full profile and the live transcript."}
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
                {m.role === "assistant"
                  ? <MarkdownMessage>{m.content}</MarkdownMessage>
                  : <p className="whitespace-pre-wrap leading-relaxed">{m.content}</p>}
              </div>
            </div>
          ))}
          {chatBusy && (
            <ChatThinking />
          )}
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
            placeholder="Posez une question à l'assistant…"
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
    </div>
  );
}

function ChatThinking() {
  const [slow, setSlow] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setSlow(true), 5000);
    return () => clearTimeout(t);
  }, []);
  return (
    <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
      <Loader2 className="h-3 w-3 animate-spin" />
      {slow
        ? "Réveil du service en cours (cold start, ~30-60s)…"
        : "L'assistant réfléchit…"}
    </div>
  );
}

function MarkdownMessage({ children }: { children: string }) {
  return (
    <div className="text-sm leading-relaxed">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          p: ({ children }) => <p className="mb-2 last:mb-0 leading-relaxed">{children}</p>,
          ul: ({ children }) => <ul className="mb-2 last:mb-0 list-disc pl-4 space-y-0.5">{children}</ul>,
          ol: ({ children }) => <ol className="mb-2 last:mb-0 list-decimal pl-4 space-y-0.5">{children}</ol>,
          li: ({ children }) => <li className="leading-snug">{children}</li>,
          strong: ({ children }) => <strong className="font-semibold text-foreground">{children}</strong>,
          em: ({ children }) => <em className="italic">{children}</em>,
          a: ({ children, href }) => (
            <a href={href} target="_blank" rel="noreferrer" className="text-primary underline underline-offset-2 hover:opacity-80">
              {children}
            </a>
          ),
          code: ({ children }) => (
            <code className="rounded bg-background/60 px-1 py-0.5 font-mono text-[11px]">{children}</code>
          ),
          pre: ({ children }) => (
            <pre className="my-2 overflow-x-auto rounded-md bg-background/60 p-2 font-mono text-[11px]">{children}</pre>
          ),
          h1: ({ children }) => <h1 className="mb-1.5 mt-2 text-base font-semibold">{children}</h1>,
          h2: ({ children }) => <h2 className="mb-1.5 mt-2 text-sm font-semibold">{children}</h2>,
          h3: ({ children }) => <h3 className="mb-1 mt-2 text-sm font-semibold">{children}</h3>,
          blockquote: ({ children }) => (
            <blockquote className="my-2 border-l-2 border-border pl-2 italic text-muted-foreground">{children}</blockquote>
          ),
          hr: () => <hr className="my-2 border-border" />,
          table: ({ children }) => (
            <div className="my-2 overflow-x-auto">
              <table className="w-full border-collapse text-[11px]">{children}</table>
            </div>
          ),
          th: ({ children }) => <th className="border border-border bg-muted/50 px-1.5 py-1 text-left font-semibold">{children}</th>,
          td: ({ children }) => <td className="border border-border px-1.5 py-1">{children}</td>,
        }}
      >
        {children}
      </ReactMarkdown>
    </div>
  );
}
