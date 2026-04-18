// Thin client for the BNP AI Copilot service hosted on Render.
// Public, no auth. Note: free-tier cold starts may take 30–60s on first call.
const BASE = "https://bnp-ai-copilot.onrender.com";

type ApiOk = { response: string };
type ApiErr = { error: string };

async function postJson<T>(path: string, body: unknown, timeoutMs = 90_000): Promise<T> {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), timeoutMs);
  let res: Response;
  try {
    res = await fetch(`${BASE}${path}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
      signal: ctrl.signal,
    });
  } catch (e) {
    clearTimeout(timer);
    if (e instanceof DOMException && e.name === "AbortError") {
      throw new Error(
        "Le service n'a pas répondu à temps (cold start Render ~30-60s). Réessayez.",
      );
    }
    throw new Error(
      `Impossible de joindre le co-pilote: ${e instanceof Error ? e.message : "erreur réseau"}`,
    );
  }
  clearTimeout(timer);

  let payload: ApiOk | ApiErr | null = null;
  try {
    payload = (await res.json()) as ApiOk | ApiErr;
  } catch {
    // fall through to status-based error below
  }

  if (!res.ok || (payload && "error" in payload)) {
    const msg = payload && "error" in payload ? payload.error : `HTTP ${res.status}`;
    throw new Error(msg);
  }
  return payload as T;
}

export async function askAgent(prompt: string): Promise<string> {
  const data = await postJson<ApiOk>("/ask", { prompt });
  return data.response;
}

export async function quickAgent(input: {
  keyword_id: string;
  client_id?: string;
  client_name?: string;
}): Promise<string> {
  const data = await postJson<ApiOk>("/quick", {
    keyword_id: input.keyword_id,
    client_id: input.client_id ?? "",
    client_name: input.client_name ?? "",
  });
  return data.response;
}
