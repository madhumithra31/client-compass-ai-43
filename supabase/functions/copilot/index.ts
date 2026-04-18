// Proactive AI co-pilot — generates priority-ranked nudges from live transcript
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const CLIENT_CONTEXT = `Client: Dr. Hélène Dufour (CLI00005)
Segment: Wealth Management · Profil: Dynamique
Profession libérale (médecin), patrimoine diversifié, intérêt ESG, projet immobilier locatif
Portefeuille: AV multisupports, PEA, PER, CTO, crédit immo en cours, Carte Visa Infinite
Conseiller: Karim Haddad`;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { transcript, mode = "suggest", question, history } = await req.json();

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY not configured");

    if (mode === "chat") {
      return await handleChat({ LOVABLE_API_KEY, transcript, question, history });
    }
    return await handleSuggest({ LOVABLE_API_KEY, transcript });
  } catch (e) {
    console.error("copilot error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});

async function handleSuggest({ LOVABLE_API_KEY, transcript }: { LOVABLE_API_KEY: string; transcript: string }) {
  if (!transcript || typeof transcript !== "string" || transcript.length < 30) {
    return new Response(JSON.stringify({ suggestions: [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const systemPrompt = `Tu es un co-pilote AI proactif pour un conseiller en banque privée BNP Paribas, en plein rendez-vous client.

${CLIENT_CONTEXT}

Mission: à partir des dernières minutes de la conversation, génère 3 à 5 suggestions courtes, immédiatement actionnables que le conseiller peut utiliser MAINTENANT (dans la prochaine minute).

Types de suggestions:
- "question" : une question précise à poser au client pour creuser un sujet
- "talking_point" : un argument/élément de réponse à donner au client
- "objection" : une réponse à une objection ou inquiétude exprimée
- "product" : une recommandation de produit/service BNP pertinente
- "action" : une action concrète à faire après le rendez-vous (créer une tâche, envoyer un doc...)

Priorité:
- "high" : urgent — le client vient de soulever un point clé qui demande une réaction immédiate
- "medium" : opportunité claire à saisir dans la conversation
- "low" : utile mais peut attendre

Règles:
- Français uniquement, ton professionnel et précis (banque privée)
- Chaque suggestion: titre (5-8 mots) + corps (max 22 mots)
- Privilégie les suggestions liées au DERNIER échange du transcript
- Évite les généralités — sois spécifique au contexte de Mme Laurent`;

  const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: `Transcription du rendez-vous en cours:\n\n${transcript}\n\nGénère les suggestions pour le conseiller.` },
      ],
      tools: [{
        type: "function",
        function: {
          name: "emit_suggestions",
          description: "Émet une liste de suggestions priorisées pour le conseiller.",
          parameters: {
            type: "object",
            properties: {
              suggestions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    type: { type: "string", enum: ["question", "talking_point", "objection", "product", "action"] },
                    priority: { type: "string", enum: ["high", "medium", "low"] },
                    title: { type: "string" },
                    body: { type: "string" },
                  },
                  required: ["type", "priority", "title", "body"],
                  additionalProperties: false,
                },
              },
            },
            required: ["suggestions"],
            additionalProperties: false,
          },
        },
      }],
      tool_choice: { type: "function", function: { name: "emit_suggestions" } },
    }),
  });

  if (!resp.ok) return aiError(resp);
  const data = await resp.json();
  const args = data?.choices?.[0]?.message?.tool_calls?.[0]?.function?.arguments;
  let suggestions: Array<Record<string, string>> = [];
  if (args) {
    try { suggestions = JSON.parse(args).suggestions ?? []; } catch (e) { console.error("parse", e); }
  }

  return new Response(JSON.stringify({ suggestions }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function handleChat({ LOVABLE_API_KEY, transcript, question, history }: {
  LOVABLE_API_KEY: string; transcript: string; question: string; history?: Array<{ role: string; content: string }>;
}) {
  if (!question) {
    return new Response(JSON.stringify({ error: "question required" }), {
      status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  const systemPrompt = `Tu es un co-pilote AI pour un conseiller BNP Paribas Banque Privée, accessible pendant le rendez-vous client. Tu réponds vite, en français, de façon concise et actionnable (max 5 phrases sauf si on te demande un draft).

${CLIENT_CONTEXT}

Tu peux:
- Répondre à une question sur le client ou la conversation en cours
- Proposer une formulation ("comment dire ça?")
- Rédiger un brouillon d'email ou de note de suivi
- Suggérer un produit BNP pertinent

Si on te demande des données chiffrées que tu ne connais pas, dis-le clairement.`;

  const messages = [
    { role: "system", content: systemPrompt },
    {
      role: "system",
      content: `Transcription du rendez-vous en cours (extrait):\n${transcript || "(rendez-vous pas encore commencé)"}`,
    },
    ...(history ?? []).slice(-8),
    { role: "user", content: question },
  ];

  const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
    method: "POST",
    headers: { Authorization: `Bearer ${LOVABLE_API_KEY}`, "Content-Type": "application/json" },
    body: JSON.stringify({ model: "google/gemini-3-flash-preview", messages }),
  });

  if (!resp.ok) return aiError(resp);
  const data = await resp.json();
  const reply = data?.choices?.[0]?.message?.content ?? "";
  return new Response(JSON.stringify({ reply }), {
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

async function aiError(resp: Response) {
  const t = await resp.text();
  console.error("AI gateway error", resp.status, t);
  if (resp.status === 429) {
    return new Response(JSON.stringify({ error: "Limite de requêtes atteinte, réessayez dans un instant." }), {
      status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  if (resp.status === 402) {
    return new Response(JSON.stringify({ error: "Crédits AI épuisés." }), {
      status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
  return new Response(JSON.stringify({ error: "Erreur AI gateway" }), {
    status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}
