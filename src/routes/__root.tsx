import { Outlet, Link, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";
import { SheilaV2Provider } from "@/components/sheila-v2/SheilaV2Store";

import appCss from "../styles.css?url";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">الصفحة غير موجودة</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          الرابط الذي تبحثين عنه غير متوفّر أو تمّ نقله.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            العودة للرئيسية
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
      { name: "viewport", content: "width=device-width, initial-scale=1, viewport-fit=cover" },
      { title: "شيلا — رفيقتك في رحلة الصحة والّلياقة" },
      { name: "description", content: "تطبيق شيلا للّياقة وتتبّع الدورة الشهرية، مصمّم خصّيصاً للمرأة العربية." },
      { name: "theme-color", content: "#8B4789" },
      { property: "og:title", content: "شيلا — رفيقتك في رحلة الصحة والّلياقة" },
      { property: "og:description", content: "تطبيق شيلا للّياقة وتتبّع الدورة الشهرية، مصمّم خصّيصاً للمرأة العربية." },
      { property: "og:type", content: "website" },
      { name: "twitter:title", content: "شيلا — رفيقتك في رحلة الصحة والّلياقة" },
      { name: "twitter:description", content: "تطبيق شيلا للّياقة وتتبّع الدورة الشهرية، مصمّم خصّيصاً للمرأة العربية." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6d5ba7d1-4ac7-4cbb-af04-7423bc4bdd57/id-preview-e1cb0f95--103f01ab-ba33-4bd9-86f7-1a721d5ca71d.lovable.app-1778750360688.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/6d5ba7d1-4ac7-4cbb-af04-7423bc4bdd57/id-preview-e1cb0f95--103f01ab-ba33-4bd9-86f7-1a721d5ca71d.lovable.app-1778750360688.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;900&family=Cairo:wght@500;600;700;800;900&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
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
  return <Outlet />;
}
