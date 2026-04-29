import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";

export const Route = createFileRoute("/")({
  component: SplashPage,
});

function SplashPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const t = setTimeout(() => navigate({ to: "/onboarding/welcome" }), 2800);
    return () => clearTimeout(t);
  }, [navigate]);

  return (
    <DeviceFrame>
      <div className="relative h-full min-h-screen w-full overflow-hidden">
        <LiquidBackdrop variant="default" />

        {/* Concentric guide circles */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.08] z-[1]"
          viewBox="0 0 430 900"
          preserveAspectRatio="xMidYMid slice"
        >
          {[100, 180, 260, 340, 420].map((r) => (
            <circle
              key={r}
              cx="215"
              cy="380"
              r={r}
              fill="none"
              stroke="currentColor"
              strokeWidth="1"
              className="text-primary"
            />
          ))}
        </svg>

        <div className="relative z-10 h-full min-h-screen flex flex-col items-center justify-center px-8">
          <div className="relative animate-rise">
            {/* Orbital ring */}
            <svg width="180" height="180" className="absolute -inset-5 -rotate-90 opacity-70">
              <circle
                cx="90"
                cy="90"
                r="85"
                fill="none"
                stroke="var(--color-primary)"
                strokeWidth="0.5"
                strokeDasharray="3 6"
              />
            </svg>

            {/* Glass logo capsule */}
            <div
              className="glass-strong relative w-[150px] h-[150px] rounded-full flex items-center justify-center"
            >
              <div
                className="absolute inset-3 rounded-full"
                style={{
                  background: "var(--gradient-primary)",
                  boxShadow:
                    "inset 0 2px 8px oklch(1 0 0 / 0.4), 0 8px 24px -8px oklch(0.46 0.135 328 / 0.5)",
                }}
              />
              <svg
                viewBox="0 0 48 48"
                className="relative w-14 h-14 text-primary-foreground z-10"
                fill="none"
              >
                <path
                  d="M24 6c-7 0-12 5-12 11 0 5 3 8 8 11 4 2 7 4 7 8 0 3-2 5-5 5"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                />
                <circle cx="24" cy="38" r="2.5" fill="currentColor" />
              </svg>
            </div>
          </div>

          <div className="mt-10 text-center animate-rise" style={{ animationDelay: "0.3s" }}>
            <h1 className="font-display text-6xl text-primary-deep tracking-tight">شيلا</h1>
            <div className="mt-3 flex items-center justify-center gap-2">
              <span className="h-px w-8 bg-primary/40" />
              <p className="text-[11px] tracking-[0.4em] text-muted-foreground uppercase">SHEILA</p>
              <span className="h-px w-8 bg-primary/40" />
            </div>
            <p className="text-sm text-foreground/70 mt-5 leading-relaxed max-w-[260px] mx-auto">
              رفيقتكِ الذكيّة في رحلة الصحّة واللّياقة
            </p>
          </div>
        </div>

        <div className="absolute bottom-10 inset-x-0 flex flex-col items-center gap-3 z-10">
          <div className="flex gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-breathe" />
            <span
              className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-breathe"
              style={{ animationDelay: "0.4s" }}
            />
            <span
              className="w-1.5 h-1.5 rounded-full bg-primary/30 animate-breathe"
              style={{ animationDelay: "0.8s" }}
            />
          </div>
          <Link
            to="/onboarding/welcome"
            className="text-[10px] tracking-[0.3em] text-muted-foreground uppercase"
          >
            تخطّي
          </Link>
        </div>
      </div>
    </DeviceFrame>
  );
}

