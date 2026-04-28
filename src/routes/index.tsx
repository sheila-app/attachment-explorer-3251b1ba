import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";

export const Route = createFileRoute("/")({
  component: SplashPage,
});

function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/onboarding/welcome" }), 2400);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <DeviceFrame>
      <div className="relative h-screen w-full overflow-hidden bg-gradient-to-b from-primary-soft via-background to-background flex flex-col items-center justify-center">
        {/* Decorative blobs */}
        <div className="absolute -top-20 -right-20 w-64 h-64 rounded-full bg-primary/15 blur-3xl" />
        <div className="absolute -bottom-24 -left-20 w-72 h-72 rounded-full bg-phase-luteal/15 blur-3xl" />

        <div className="relative z-10 flex flex-col items-center">
          {/* Logo mark */}
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-primary to-primary-glow flex items-center justify-center shadow-lg shadow-primary/30">
            <svg viewBox="0 0 48 48" className="w-12 h-12 text-primary-foreground" fill="none">
              <path
                d="M24 6c-7 0-12 5-12 11 0 5 3 8 8 11 4 2 7 4 7 8 0 3-2 5-5 5"
                stroke="currentColor"
                strokeWidth="3"
                strokeLinecap="round"
              />
              <circle cx="24" cy="38" r="3" fill="currentColor" />
            </svg>
          </div>

          <h1 className="font-display text-5xl mt-6 text-primary">شيلا</h1>
          <p className="text-sm text-muted-foreground mt-2">رفيقتك في رحلة الصحّة واللّياقة</p>
        </div>

        <div className="absolute bottom-12">
          <Link to="/onboarding/welcome" className="text-xs text-muted-foreground underline">
            تخطّي
          </Link>
        </div>
      </div>
    </DeviceFrame>
  );
}
