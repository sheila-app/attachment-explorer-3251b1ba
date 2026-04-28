import { createFileRoute, Link } from "@tanstack/react-router";
import { DeviceFrame } from "@/components/sheila/DeviceFrame";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/onboarding/welcome")({
  component: WelcomePage,
});

function WelcomePage() {
  return (
    <DeviceFrame>
      <div className="relative h-full min-h-screen flex flex-col grain" style={{ background: "var(--gradient-porcelain)" }}>
        {/* Aurora */}
        <div className="absolute inset-0" style={{ background: "var(--gradient-aurora)" }} />

        {/* Hero illustration zone */}
        <div className="relative flex-1 flex items-center justify-center px-6 pt-16">
          <div className="relative w-[300px] h-[300px] animate-rise">
            {/* Orbital rings */}
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

              {/* Four phase petals — flower of life inspired */}
              <g transform="translate(150 150)">
                {[0, 90, 180, 270].map((deg, i) => {
                  const colors = ["url(#orbit-1)", "url(#orbit-2)", "url(#orbit-3)", "url(#orbit-4)"];
                  return (
                    <ellipse
                      key={deg}
                      cx="0"
                      cy="-60"
                      rx="48"
                      ry="90"
                      fill={colors[i]}
                      opacity="0.45"
                      transform={`rotate(${deg})`}
                    />
                  );
                })}
              </g>

              {/* Center circle */}
              <circle cx="150" cy="150" r="36" fill="var(--color-surface)" />
              <circle cx="150" cy="150" r="36" fill="none" stroke="var(--color-primary)" strokeWidth="0.8" opacity="0.5" />
              <circle cx="150" cy="150" r="6" fill="var(--color-primary)" className="animate-breathe" style={{ transformOrigin: "150px 150px" }} />
            </svg>

            {/* Floating phase labels */}
            <div className="absolute -top-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-surface shadow-sm border border-border/60 text-[10px] font-medium" style={{ color: "var(--phase-ovulation-deep)" }}>
              الإباضة
            </div>
            <div className="absolute top-1/2 -right-2 -translate-y-1/2 px-3 py-1 rounded-full bg-surface shadow-sm border border-border/60 text-[10px] font-medium" style={{ color: "var(--phase-follicular-deep)" }}>
              الجريبية
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-surface shadow-sm border border-border/60 text-[10px] font-medium" style={{ color: "var(--phase-menstrual-deep)" }}>
              الطمث
            </div>
            <div className="absolute top-1/2 -left-2 -translate-y-1/2 px-3 py-1 rounded-full bg-surface shadow-sm border border-border/60 text-[10px] font-medium" style={{ color: "var(--phase-luteal-deep)" }}>
              الأصفرية
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="relative px-7 pb-10 animate-rise" style={{ animationDelay: "0.3s" }}>
          <div className="text-center">
            <p className="text-[11px] tracking-[0.4em] text-primary/70 uppercase mb-3">مرحباً</p>
            <h1 className="font-display text-[34px] leading-tight text-foreground">
              جسمكِ يتحدّث،
              <br />
              <span className="text-primary">ونحن نُصغي</span>
            </h1>
            <p className="text-sm text-muted-foreground mt-4 leading-relaxed max-w-[300px] mx-auto">
              تمارين، تغذية، وعناية تتكيّف مع كل مرحلة من دورتكِ — بذكاء يفهمكِ.
            </p>
          </div>

          <div className="mt-8 space-y-3">
            <Link
              to="/onboarding/auth"
              className="group flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-primary-foreground font-medium text-sm transition-transform active:scale-[0.98]"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
            >
              ابدئي رحلتكِ
              <ArrowLeft size={18} strokeWidth={2} className="transition-transform group-hover:-translate-x-1" />
            </Link>
            <Link to="/onboarding/auth" className="block w-full text-center text-sm text-muted-foreground py-2">
              لديّ حساب بالفعل
            </Link>
          </div>

          {/* Page indicator */}
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
