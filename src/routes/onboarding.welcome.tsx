import { createFileRoute, Link } from "@tanstack/react-router";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { LiquidBackdrop } from "@/components/sheila/LiquidBackdrop";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/onboarding/welcome")({
  component: WelcomePage,
});

function WelcomePage() {
  return (
    <DeviceFrame>
      <div className="relative h-full min-h-screen flex flex-col overflow-hidden">
        <LiquidBackdrop variant="default" />

        {/* Hero illustration zone */}
        <div className="relative z-10 flex-1 flex items-center justify-center px-6 pt-16">
          <div className="relative w-[300px] h-[300px] animate-rise">
            <svg className="absolute inset-0 -rotate-12" viewBox="0 0 300 300">
              <defs>
                <linearGradient id="orbit-1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--phase-menstrual)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--phase-menstrual)" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="orbit-2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--phase-follicular)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--phase-follicular)" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="orbit-3" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--phase-ovulation)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--phase-ovulation)" stopOpacity="1" />
                </linearGradient>
                <linearGradient id="orbit-4" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="var(--phase-luteal)" stopOpacity="0.4" />
                  <stop offset="100%" stopColor="var(--phase-luteal)" stopOpacity="1" />
                </linearGradient>
              </defs>

              <g transform="translate(150 150)">
                {[0, 90, 180, 270].map((deg, i) => {
                  const colors = [
                    "url(#orbit-1)",
                    "url(#orbit-2)",
                    "url(#orbit-3)",
                    "url(#orbit-4)",
                  ];
                  return (
                    <ellipse
                      key={deg}
                      cx="0"
                      cy="-60"
                      rx="48"
                      ry="90"
                      fill={colors[i]}
                      opacity="0.55"
                      transform={`rotate(${deg})`}
                    />
                  );
                })}
              </g>

              <circle cx="150" cy="150" r="40" fill="oklch(1 0 0 / 0.5)" />
              <circle
                cx="150"
                cy="150"
                r="40"
                fill="none"
                stroke="oklch(1 0 0 / 0.7)"
                strokeWidth="1"
              />
              <circle
                cx="150"
                cy="150"
                r="6"
                fill="var(--color-primary)"
                className="animate-breathe"
                style={{ transformOrigin: "150px 150px" }}
              />
            </svg>

            {/* Glass phase labels */}
            <GlassChip
              className="absolute -top-2 left-1/2 -translate-x-1/2"
              color="var(--phase-ovulation-deep)"
            >
              الإباضة
            </GlassChip>
            <GlassChip
              className="absolute top-1/2 -right-2 -translate-y-1/2"
              color="var(--phase-follicular-deep)"
            >
              الجريبية
            </GlassChip>
            <GlassChip
              className="absolute -bottom-2 left-1/2 -translate-x-1/2"
              color="var(--phase-menstrual-deep)"
            >
              الطمث
            </GlassChip>
            <GlassChip
              className="absolute top-1/2 -left-2 -translate-y-1/2"
              color="var(--phase-luteal-deep)"
            >
              الأصفرية
            </GlassChip>
          </div>
        </div>

        {/* Content */}
        <div
          className="relative z-10 px-7 pb-10 animate-rise"
          style={{ animationDelay: "0.3s" }}
        >
          <div className="text-center">
            <p className="text-[11px] tracking-[0.4em] text-primary/70 uppercase mb-3">مرحباً</p>
            <h1 className="font-display text-[34px] leading-tight text-foreground">
              جسمكِ يتحدّث،
              <br />
              <span className="text-primary">ونحن نُصغي</span>
            </h1>
            <p className="text-sm text-foreground/70 mt-4 leading-relaxed max-w-[300px] mx-auto">
              تمارين، تغذية، وعناية تتكيّف مع كل مرحلة من دورتكِ — بذكاء يفهمكِ.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <Link
              to="/onboarding/dob"
              className="group relative flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-primary-foreground font-medium text-sm transition-transform active:scale-[0.98] overflow-hidden"
              style={{
                background: "var(--gradient-primary)",
                boxShadow:
                  "0 12px 32px -8px oklch(0.46 0.135 328 / 0.5), inset 0 1px 0 0 oklch(1 0 0 / 0.4)",
              }}
            >
              <span
                className="absolute inset-x-0 top-0 h-1/2 rounded-t-2xl pointer-events-none"
                style={{
                  background:
                    "linear-gradient(180deg, oklch(1 0 0 / 0.25), transparent)",
                }}
              />
              <span className="relative">ابدئي رحلتكِ</span>
              <ArrowLeft
                size={18}
                strokeWidth={2}
                className="relative transition-transform group-hover:-translate-x-1"
              />
            </Link>
            <Link
              to="/auth/login"
              className="block w-full text-center text-sm text-foreground/70 py-2"
            >
              لديّ حساب بالفعل
            </Link>
          </div>

          <div className="mt-6 flex justify-center gap-1.5">
            <span className="w-6 h-1 rounded-full bg-primary" />
            <span className="w-1 h-1 rounded-full bg-primary/30" />
            <span className="w-1 h-1 rounded-full bg-primary/30" />
          </div>
        </div>
      </div>
    </DeviceFrame>
  );
}

function GlassChip({
  children,
  className,
  color,
}: {
  children: React.ReactNode;
  className?: string;
  color: string;
}) {
  return (
    <div
      className={`glass px-3 py-1 rounded-full text-[10px] font-medium ${className}`}
      style={{ color }}
    >
      <span className="relative z-10">{children}</span>
    </div>
  );
}
