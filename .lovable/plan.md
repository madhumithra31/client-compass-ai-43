
The user is asking a Lovable platform question, not a code change. They want to take this project and run it locally on their machine.

Lovable projects can be exported via GitHub integration — the standard path is: connect to GitHub from the project, which creates/pushes a repo, then clone locally and run `npm install` + `npm run dev`.

Key things they need to know:
1. How to get the code (GitHub connect, or download as ZIP from GitHub once connected)
2. Local setup: Node.js + bun/npm, install deps, run dev server
3. Env vars: this project uses Lovable Cloud (Supabase). The `.env` is auto-generated and contains `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, `VITE_SUPABASE_PROJECT_ID`. They'll need to copy these locally since `.env` is in `.gitignore`.
4. Edge functions (copilot, analyze-meeting, client-mindmap) live on Lovable Cloud — they'll keep working from local dev because the frontend calls the hosted Supabase project.
5. Lovable AI gateway (`LOVABLE_API_KEY`) only works inside Lovable Cloud edge functions, not from local code calling AI directly. But since AI is called from edge functions (already deployed), local frontend dev still works.

This is a Q&A — no plan tag actually needed per instructions ("Skip for research"). But the user did ask "how can I" which is borderline. I'll give a concise answer without a presentation-plan since no implementation is happening.

Actually re-reading: "Present plans for implementation tasks (add feature, refactor). Skip for research ('how does X work?')." — this is research/how-to. No plan needed. Just answer directly.
