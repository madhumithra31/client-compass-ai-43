import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { AppNav } from "@/components/AppNav";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="font-display text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BNP Paribas — Wealth Intelligence" },
      { name: "description", content: "Plateforme d'intelligence client pour les rendez-vous patrimoniaux : transcription live, sentiment, alertes." },
      { name: "author", content: "BNP Paribas" },
      { property: "og:title", content: "BNP Paribas — Wealth Intelligence" },
      { property: "og:description", content: "Plateforme d'intelligence client pour les rendez-vous patrimoniaux : transcription live, sentiment, alertes." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "BNP Paribas — Wealth Intelligence" },
      { name: "twitter:description", content: "Plateforme d'intelligence client pour les rendez-vous patrimoniaux : transcription live, sentiment, alertes." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ca71dad1-42ba-45c0-9b10-a9adc54a177d/id-preview-ee84f841--cc737f65-c0ed-4cd9-8a45-1c12fc3beb3a.lovable.app-1776521133371.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/ca71dad1-42ba-45c0-9b10-a9adc54a177d/id-preview-ee84f841--cc737f65-c0ed-4cd9-8a45-1c12fc3beb3a.lovable.app-1776521133371.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Fraunces:wght@500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <>
      <AppNav />
      <Outlet />
    </>
  );
}
