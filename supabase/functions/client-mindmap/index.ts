import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
};

serve(async (req) => {
  if (req.method === "OPTIONS") return new Response(null, { headers: corsHeaders });

  try {
    const { client, transcript } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) throw new Error("LOVABLE_API_KEY missing");

    const systemPrompt = `Tu es un analyste senior en banque privée BNP Paribas. À partir de la fiche client et de la transcription du rendez-vous, génère une carte mentale (mind map) synthétique pour le chargé d'affaires. Choisis dynamiquement entre 5 et 7 catégories les PLUS PERTINENTES pour CE client précis (ex: Objectifs patrimoniaux, Risques, Famille & transmission, Actifs, Sentiment, Opportunités, Fiscalité, ESG, Liquidité, Événements de vie, etc.). Pour chaque catégorie, fournis 2 à 4 points concis (max 90 caractères chacun). Réponds en français. Sois factuel, exploitable, basé uniquement sur les données fournies.`;

    const userPrompt = `FICHE CLIENT:\n${JSON.stringify(client, null, 2)}\n\nTRANSCRIPTION (peut être vide ou partielle):\n${transcript || "(aucune transcription pour le moment)"}`;

    const body = {
      model: "google/gemini-3-flash-preview",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: userPrompt },
      ],
      tools: [
        {
          type: "function",
          function: {
            name: "build_mindmap",
            description: "Construit la carte mentale du client.",
            parameters: {
              type: "object",
              properties: {
                summary: {
                  type: "string",
                  description: "Résumé en 1 phrase (max 140 caractères) de la situation client.",
                },
                branches: {
                  type: "array",
                  minItems: 5,
                  maxItems: 7,
                  items: {
                    type: "object",
                    properties: {
                      title: { type: "string", description: "Nom court de la catégorie (1-3 mots)." },
                      tone: {
                        type: "string",
                        enum: ["positive", "neutral", "warning", "risk", "opportunity"],
                        description: "Tonalité visuelle.",
                      },
                      points: {
                        type: "array",
                        minItems: 2,
                        maxItems: 4,
                        items: { type: "string" },
                      },
                    },
                    required: ["title", "tone", "points"],
                    additionalProperties: false,
                  },
                },
              },
              required: ["summary", "branches"],
              additionalProperties: false,
            },
          },
        },
      ],
      tool_choice: { type: "function", function: { name: "build_mindmap" } },
    };

    const resp = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!resp.ok) {
      const t = await resp.text();
      console.error("AI error", resp.status, t);
      if (resp.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit atteint, réessayez bientôt." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (resp.status === 402) {
        return new Response(JSON.stringify({ error: "Crédits AI épuisés." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      return new Response(JSON.stringify({ error: "AI gateway error" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const data = await resp.json();
    const toolCall = data?.choices?.[0]?.message?.tool_calls?.[0];
    const args = toolCall?.function?.arguments;
    const parsed = typeof args === "string" ? JSON.parse(args) : args;

    return new Response(JSON.stringify(parsed ?? { summary: "", branches: [] }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    console.error("client-mindmap error", e);
    return new Response(JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
